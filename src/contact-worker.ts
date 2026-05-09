interface Env {
  PROMPTJOY_DB: D1Database;
}

type ContactPayload = {
  email?: unknown;
  website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGINS = new Set([
  "https://promptjoy.co",
  "https://www.promptjoy.co",
  "http://localhost:8787",
  "http://localhost:8888",
]);

function jsonResponse(
  request: Request,
  body: Record<string, unknown>,
  status = 200,
): Response {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });

  const origin = request.headers.get("Origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }

  return new Response(JSON.stringify(body), { status, headers });
}

function optionsResponse(request: Request): Response {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  });

  const origin = request.headers.get("Origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }

  return new Response(null, { status: 204, headers });
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const email = value.trim().toLowerCase();
  if (email.length === 0 || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return null;
  }

  return email;
}

async function readPayload(request: Request): Promise<ContactPayload | null> {
  const contentType = request.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as ContactPayload;
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    return {
      email: form.get("email"),
      website: form.get("website"),
    };
  }

  return null;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method === "OPTIONS") {
    return optionsResponse(request);
  }

  if (request.method !== "POST") {
    return jsonResponse(request, { error: "method_not_allowed" }, 405);
  }

  const payload = await readPayload(request).catch(() => null);
  if (!payload) {
    return jsonResponse(request, { error: "unsupported_payload" }, 415);
  }

  if (typeof payload.website === "string" && payload.website.trim().length > 0) {
    return jsonResponse(request, { ok: true });
  }

  const email = normalizeEmail(payload.email);
  if (!email) {
    return jsonResponse(request, { error: "invalid_email" }, 400);
  }

  const id = crypto.randomUUID();
  const userAgent = request.headers.get("User-Agent")?.slice(0, 500) || null;
  const cfRay = request.headers.get("CF-Ray") || null;
  const country = request.cf?.country ? String(request.cf.country) : null;

  await env.PROMPTJOY_DB.prepare(`
    INSERT INTO contact_leads (
      id,
      email,
      source,
      user_agent,
      cf_ray,
      country,
      created_at,
      updated_at,
      submission_count
    )
    VALUES (?, ?, 'promptjoy-homepage', ?, ?, ?, datetime('now'), datetime('now'), 1)
    ON CONFLICT(email) DO UPDATE SET
      user_agent = excluded.user_agent,
      cf_ray = excluded.cf_ray,
      country = excluded.country,
      updated_at = datetime('now'),
      submission_count = contact_leads.submission_count + 1
  `)
    .bind(id, email, userAgent, cfRay, country)
    .run();

  return jsonResponse(request, { ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env).catch((error) => {
        console.error("contact submission failed", error);
        return jsonResponse(request, { error: "server_error" }, 500);
      });
    }

    return jsonResponse(request, { error: "not_found" }, 404);
  },
};
