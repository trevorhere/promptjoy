# Multi-Tenant System

**Status:** Draft
**Version:** 1.0
**Last Updated:** 2026-02-17

---

## 1. Overview

Deploy isolated instances at `{company}.promptjoy.co` from a single codebase.

### 1.1 Goals

- One deployment serves all tenants
- Complete data isolation
- Per-tenant branding + auth
- 15-minute onboarding for new customers

---

## 2. Tenant Configuration

### 2.1 Schema

```typescript
interface TenantConfig {
  id: string;                    // "ennoble"
  name: string;                  // "Ennoble Care"
  subdomain: string;             // "ennoble"
  
  branding: {
    logoUrl: string;
    primaryColor: string;        // "#4F46E5"
    secondaryColor: string;
    faviconUrl?: string;
  };
  
  auth: {
    provider: 'azure-ad' | 'google' | 'email';
    azureTenantId?: string;
    azureClientId?: string;
    googleClientId?: string;
    allowedDomains?: string[];   // ["ennoblecare.com"]
  };
  
  features: {
    survey: boolean;
    learning: boolean;
    chat: boolean;
    adminPortal: boolean;
    integrations: boolean;
  };
  
  limits: {
    maxUsers: number;
    maxStorageMb: number;
  };
  
  billing: {
    stripeCustomerId?: string;
    plan: 'starter' | 'team' | 'enterprise';
    status: 'active' | 'trial' | 'suspended';
  };
  
  createdAt: string;
}
```

### 2.2 Storage

Tenant configs stored in Cloudflare KV:

```typescript
// Key: tenant:{subdomain}
// Value: JSON TenantConfig

await env.TENANTS.put("tenant:ennoble", JSON.stringify(config));
const config = await env.TENANTS.get("tenant:ennoble", "json");
```

---

## 3. Data Isolation

### 3.1 Database Schema

All tables include `tenant_id`:

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(tenant_id, email)
);

CREATE TABLE survey_responses (
  id INTEGER PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT,
  -- ... other fields
);

CREATE TABLE learning_progress (
  id INTEGER PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  signal_id TEXT NOT NULL,
  -- ... other fields
);

-- Indexes for performance
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_survey_tenant ON survey_responses(tenant_id);
CREATE INDEX idx_learning_tenant ON learning_progress(tenant_id);
```

### 3.2 Query Scoping

All queries must include tenant filter:

```typescript
// worker/utils/db.ts

export function scopedDB(env: Env, tenantId: string) {
  return {
    async query<T>(sql: string, ...bindings: any[]): Promise<T[]> {
      // Inject tenant_id check
      const result = await env.DB.prepare(sql)
        .bind(tenantId, ...bindings)
        .all<T>();
      return result.results || [];
    }
  };
}

// Usage
const db = scopedDB(env, tenant.id);
const users = await db.query<User>(
  `SELECT * FROM users WHERE tenant_id = ?`
);
```

---

## 4. Subdomain Routing

### 4.1 DNS Setup

```
# Cloudflare DNS
*.promptjoy.co  →  CNAME  →  promptjoy.pages.dev
```

### 4.2 Tenant Resolution Middleware

```typescript
// worker/middleware/tenant.ts

export async function resolveTenant(
  request: Request,
  env: Env
): Promise<TenantConfig | null> {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];
  
  if (subdomain === 'www' || subdomain === 'promptjoy') {
    return null; // Marketing site, no tenant
  }
  
  const config = await env.TENANTS.get(`tenant:${subdomain}`, 'json');
  return config as TenantConfig | null;
}

export async function withTenant(
  request: Request,
  env: Env,
  handler: (req: Request, env: Env, tenant: TenantConfig) => Promise<Response>
): Promise<Response> {
  const tenant = await resolveTenant(request, env);
  
  if (!tenant) {
    return new Response('Tenant not found', { status: 404 });
  }
  
  if (tenant.billing.status === 'suspended') {
    return new Response('Account suspended', { status: 403 });
  }
  
  return handler(request, env, tenant);
}
```

---

## 5. Onboarding Flow

### 5.1 New Tenant Checklist

```markdown
## New Tenant: {company_name}

### Setup
- [ ] Create tenant config in KV
- [ ] Configure auth provider
- [ ] Upload branding assets
- [ ] Create Stripe customer + subscription

### Data
- [ ] Seed admin user
- [ ] Import knowledge base (if provided)
- [ ] Configure learning modules

### Testing
- [ ] Verify subdomain resolves
- [ ] Test auth flow
- [ ] Test survey submission
- [ ] Test chat functionality

### Launch
- [ ] Send welcome email
- [ ] Schedule onboarding call
```

### 5.2 CLI Tool

```bash
# Create tenant
promptjoy tenant create \
  --name "Ennoble Care" \
  --subdomain ennoble \
  --auth azure-ad \
  --plan team

# Output:
# ✓ Created tenant config
# ✓ Subdomain: ennoble.promptjoy.co
# ✓ Status: trial (14 days)
# → Next: Configure auth at https://admin.promptjoy.co/tenants/ennoble
```

---

## 6. Tenant Admin

### 6.1 Super Admin Portal

PromptJoy admins access all tenants at `admin.promptjoy.co`:

- List all tenants
- View tenant health/usage
- Suspend/activate tenants
- Access billing dashboard
- Impersonate users (audit logged)

### 6.2 Tenant Admin

Each tenant has their own admin at `{tenant}.promptjoy.co/admin`:

- Manage users
- View learning progress
- Configure branding
- Download reports
