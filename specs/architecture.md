# PromptJoy Architecture

**Status:** Draft
**Version:** 1.0
**Last Updated:** 2026-02-17

---

## 1. Overview

PromptJoy is a white-labeled AI enablement platform deployed at `{company}.promptjoy.co`.

### 1.1 Purpose

Provide enterprises with a turnkey AI adoption platform including surveys, learning, Q&A, and integrations — without building from scratch.

### 1.2 Goals

- Single codebase serving multiple tenants
- 15-minute setup for new customers
- Isolated data per tenant
- Customizable branding per tenant
- Scalable on Cloudflare infrastructure

### 1.3 Core Features

| Feature | Description |
|---------|-------------|
| AI Readiness Survey | Assess team AI comfort + use cases |
| Learning System | Conversational competency-based training |
| Q&A Chat | Claude-powered assistant with company knowledge |
| Admin Portal | Progress tracking, team dashboards |
| Integrations | Teams, Outlook, OpenClaw assistant |
| PARAT Knowledge | Structured knowledge base for AI retrieval |

---

## 2. System Architecture

### 2.1 High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                              Clients                                 │
├─────────────────────────────────────────────────────────────────────┤
│  ennoble.promptjoy.co    acme.promptjoy.co    demo.promptjoy.co     │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Cloudflare Edge                              │
├─────────────────────────────────────────────────────────────────────┤
│  DNS: *.promptjoy.co → Cloudflare Pages                             │
│  SSL: Automatic wildcard certificate                                 │
│  CDN: Static assets cached at edge                                  │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Cloudflare Pages + Workers                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐        │
│  │   Frontend   │     │  Worker API  │     │   Workers AI  │        │
│  │  (React SPA) │────▶│  (Handlers)  │────▶│  (Embeddings) │        │
│  └──────────────┘     └──────┬───────┘     └──────────────┘        │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Data Layer                                   │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐        │
│  │  Cloudflare  │     │  Cloudflare  │     │  Cloudflare  │        │
│  │      D1      │     │   Vectorize  │     │      KV      │        │
│  │  (Database)  │     │  (Embeddings)│     │   (Config)   │        │
│  └──────────────┘     └──────────────┘     └──────────────┘        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      External Services                               │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐        │
│  │  Anthropic   │     │    Stripe    │     │  Auth Providers│       │
│  │  Claude API  │     │   Billing    │     │ (Azure/Google) │       │
│  └──────────────┘     └──────────────┘     └──────────────┘        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Directory Structure

```
promptjoy/
├── src/                      # React frontend
│   ├── components/
│   │   ├── Branding/         # Dynamic logo, colors
│   │   ├── Survey/           # AI readiness survey
│   │   ├── Learning/         # Competency training
│   │   ├── Chat/             # Q&A interface
│   │   └── Dashboard/        # Admin views
│   ├── hooks/
│   │   ├── useTenant.ts      # Tenant context
│   │   └── useAuth.ts        # Auth state
│   └── pages/
│       ├── index.tsx
│       ├── survey.tsx
│       ├── learn.tsx
│       ├── chat.tsx
│       └── admin/
│
├── worker/                   # Cloudflare Worker API
│   ├── handlers/
│   │   ├── auth.ts
│   │   ├── survey.ts
│   │   ├── learning.ts
│   │   ├── chat.ts
│   │   └── admin.ts
│   ├── utils/
│   │   ├── tenant.ts         # Tenant resolution
│   │   └── claude.ts         # Claude API wrapper
│   └── index.ts
│
├── specs/                    # This folder
├── schema/                   # D1 migrations
└── scripts/                  # CLI tools
```

---

## 3. Request Flow

### 3.1 Tenant Resolution

```
Request: https://ennoble.promptjoy.co/api/chat
                        │
                        ▼
┌───────────────────────────────────────────────┐
│  1. Extract subdomain from Host header        │
│     "ennoble.promptjoy.co" → "ennoble"        │
└───────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│  2. Load tenant config from KV                │
│     TENANTS.get("ennoble") → TenantConfig     │
└───────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│  3. Validate tenant status                    │
│     status === 'active' ? continue : 403      │
└───────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│  4. Scope all DB queries to tenant_id         │
│     WHERE tenant_id = 'ennoble'               │
└───────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│  5. Execute handler with tenant context       │
└───────────────────────────────────────────────┘
```

---

## 4. Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + Vite + TypeScript | SPA |
| Styling | TailwindCSS | Utility-first CSS + theming |
| Hosting | Cloudflare Pages | Static + edge rendering |
| API | Cloudflare Workers | Serverless handlers |
| Database | Cloudflare D1 | SQLite at edge |
| Vector Store | Cloudflare Vectorize | Semantic search |
| Config | Cloudflare KV | Tenant configs |
| AI | Anthropic Claude API | Chat + learning |
| Embeddings | Workers AI / OpenAI | Vector generation |
| Auth | Azure AD / Google / Email | Per-tenant config |
| Billing | Stripe | Subscriptions |

---

## 5. Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Production | `*.promptjoy.co` | Live customer instances |
| Staging | `*.staging.promptjoy.co` | Pre-release testing |
| Development | `localhost:5173` | Local dev |
| Demo | `demo.promptjoy.co` | Sales demos |

---

## 6. Security

- **Data Isolation:** All queries scoped by `tenant_id`
- **Auth Boundaries:** Users authenticate only to their tenant
- **Secrets:** Per-tenant API keys in KV (encrypted)
- **HTTPS:** Enforced via Cloudflare
- **HIPAA:** No PHI stored; guidelines provided per tenant

---

## 7. Related Specs

- [Multi-Tenant](./multi-tenant.md) - Tenant isolation details
- [Branding](./branding.md) - Theming system
- [Integrations](./integrations.md) - Teams, Outlook, OpenClaw
