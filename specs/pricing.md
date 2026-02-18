# Pricing & Billing

**Status:** Draft
**Version:** 1.0
**Last Updated:** 2026-02-17

---

## 1. Overview

Stripe-based billing with tiered pricing per tenant.

### 1.1 Purpose

Monetize the platform with transparent, scalable pricing.

### 1.2 Goals

- Simple per-seat or flat-rate pricing
- Self-serve upgrades
- Usage tracking for AI costs
- Dunning and churn management

---

## 2. Pricing Tiers

| Tier | Price | Seats | Features |
|------|-------|-------|----------|
| **Starter** | $500/mo | Up to 25 | Survey, Learning, Basic Q&A |
| **Growth** | $1,000/mo | Up to 100 | + Integrations, PARAT, Custom Branding |
| **Enterprise** | Custom | Unlimited | + SSO, Dedicated Support, SLA |

### 2.1 Add-Ons

| Add-On | Price | Description |
|--------|-------|-------------|
| Setup & Onboarding | $2,500 one-time | White-glove deployment |
| PARAT Knowledge Setup | $1,500 one-time | Custom knowledge base build |
| OpenClaw Assistant | $3,000 one-time | Teams/Outlook integration |
| Additional Seats | $10/seat/mo | Beyond tier limit |

---

## 3. Stripe Integration

### 3.1 Products & Prices

```typescript
// Stripe product IDs (stored in env)
const PRODUCTS = {
  starter: 'prod_starter_xxx',
  growth: 'prod_growth_xxx',
  enterprise: 'prod_enterprise_xxx',
};

const PRICES = {
  starter_monthly: 'price_starter_monthly_xxx',
  growth_monthly: 'price_growth_monthly_xxx',
};
```

### 3.2 Subscription Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Select Plan    │────▶│  Stripe Checkout │────▶│  Webhook        │
│  (Admin Portal) │     │  (hosted page)   │     │  (activate)     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  Update tenant  │
                                                 │  status: active │
                                                 └─────────────────┘
```

---

## 4. Tenant Billing State

```typescript
interface TenantBilling {
  stripeCustomerId: string;
  subscriptionId: string;
  plan: 'starter' | 'growth' | 'enterprise' | 'trial';
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  seatLimit: number;
  currentSeats: number;
  trialEndsAt?: string;      // ISO date
  currentPeriodEnd: string;  // ISO date
}
```

---

## 5. Webhooks

Handle these Stripe events:

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Activate tenant |
| `customer.subscription.updated` | Update plan/seats |
| `customer.subscription.deleted` | Deactivate tenant |
| `invoice.payment_failed` | Mark past_due, notify |
| `invoice.paid` | Clear past_due status |

---

## 6. Usage Tracking

Track AI usage for potential overage billing:

```sql
CREATE TABLE usage (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  date TEXT NOT NULL,           -- YYYY-MM-DD
  chat_messages INTEGER DEFAULT 0,
  learning_sessions INTEGER DEFAULT 0,
  embedding_tokens INTEGER DEFAULT 0,
  UNIQUE(tenant_id, date)
);
```

### 6.1 Usage Limits by Tier

| Tier | Chat Messages/mo | Learning Sessions/mo |
|------|------------------|----------------------|
| Starter | 1,000 | 500 |
| Growth | 5,000 | 2,500 |
| Enterprise | Unlimited | Unlimited |

---

## 7. Trial Flow

New tenants get 14-day trial:

1. Sign up → `status: 'trialing'`
2. Full Growth features during trial
3. Day 12: Email reminder
4. Day 14: Require payment or downgrade
5. Day 21: Deactivate if no payment

---

## 8. Admin Billing UI

```
┌─────────────────────────────────────────────┐
│  Billing & Subscription                     │
├─────────────────────────────────────────────┤
│                                             │
│  Current Plan: Growth ($1,000/mo)           │
│  Status: Active                             │
│  Seats: 45 / 100                            │
│  Next billing: March 17, 2026               │
│                                             │
│  [Manage Subscription] [View Invoices]      │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  Usage This Month:                          │
│  • Chat messages: 2,340 / 5,000             │
│  • Learning sessions: 890 / 2,500           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 9. Implementation Checklist

- [ ] Stripe products/prices setup
- [ ] Checkout session endpoint
- [ ] Webhook handler
- [ ] TenantBilling schema
- [ ] Usage tracking table + worker
- [ ] Admin billing page
- [ ] Trial logic
- [ ] Dunning emails

---

## 10. Related Specs

- [Multi-Tenant](./multi-tenant.md) — Tenant status management
- [Architecture](./architecture.md) — System overview
