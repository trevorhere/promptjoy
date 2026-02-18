# White-Label Branding System

**Status:** Draft
**Version:** 1.0
**Last Updated:** 2026-02-17

---

## 1. Overview

Dynamic theming system that customizes the UI per tenant via CSS variables and config.

### 1.1 Purpose

Allow each customer to see their branding (logo, colors, fonts) without code changes.

### 1.2 Goals

- Zero-code branding updates
- Instant preview in admin portal
- Consistent look across all pages
- Support dark/light mode per tenant

---

## 2. Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Admin Portal   │────▶│   KV Config      │────▶│  CSS Variables  │
│  (upload logo,  │     │   (branding obj) │     │  (injected at   │
│   pick colors)  │     │                  │     │   page load)    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

---

## 3. Tenant Branding Config

Stored in KV under tenant key:

```typescript
interface TenantBranding {
  // Identity
  companyName: string;
  logoUrl: string;        // R2 bucket URL
  faviconUrl?: string;
  
  // Colors
  primaryColor: string;   // hex, e.g. "#2563eb"
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  
  // Typography
  fontFamily?: string;    // Google Font name
  headingFont?: string;
  
  // Mode
  defaultTheme: 'light' | 'dark' | 'system';
  
  // Custom
  customCss?: string;     // Advanced overrides
}
```

---

## 4. CSS Variable Injection

On page load, inject variables from config:

```typescript
// useTenant.ts
useEffect(() => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', branding.primaryColor);
  root.style.setProperty('--color-accent', branding.accentColor);
  root.style.setProperty('--color-bg', branding.backgroundColor);
  root.style.setProperty('--color-text', branding.textColor);
}, [branding]);
```

Tailwind config maps these:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      accent: 'var(--color-accent)',
    }
  }
}
```

---

## 5. Logo Storage

Logos uploaded to Cloudflare R2:

```
r2://promptjoy-assets/
├── ennoble/
│   ├── logo.png
│   └── favicon.ico
├── acme/
│   └── logo.svg
```

**Upload flow:**
1. Admin uploads image in portal
2. Worker resizes/optimizes via Sharp
3. Stored in R2 under tenant folder
4. URL saved to KV config

---

## 6. Admin Portal UI

```
┌─────────────────────────────────────────────┐
│  Branding Settings                          │
├─────────────────────────────────────────────┤
│                                             │
│  Logo: [Upload] [Preview: ○ logo.png]       │
│                                             │
│  Primary Color:   [#2563eb] [██]            │
│  Accent Color:    [#10b981] [██]            │
│  Background:      [#ffffff] [██]            │
│  Text Color:      [#1f2937] [██]            │
│                                             │
│  Font: [Inter ▼]                            │
│  Theme: (○) Light  (○) Dark  (●) System     │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │         Live Preview                │    │
│  │   [Logo]  Welcome to Ennoble AI     │    │
│  │   ────────────────────────────      │    │
│  │   [ Start Survey ]                  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [Save Changes]                             │
└─────────────────────────────────────────────┘
```

---

## 7. Default Theme

New tenants get PromptJoy defaults:

```typescript
const DEFAULT_BRANDING: TenantBranding = {
  companyName: 'PromptJoy',
  logoUrl: '/assets/promptjoy-logo.svg',
  primaryColor: '#6366f1',    // Indigo
  accentColor: '#10b981',     // Emerald
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  defaultTheme: 'system',
};
```

---

## 8. Implementation Checklist

- [ ] TenantBranding type definition
- [ ] KV schema for branding
- [ ] useBranding hook (load + apply CSS vars)
- [ ] Logo upload endpoint
- [ ] R2 bucket setup
- [ ] Admin branding page
- [ ] Live preview component
- [ ] Default theme fallback

---

## 9. Related Specs

- [Multi-Tenant](./multi-tenant.md) — Tenant config structure
- [Architecture](./architecture.md) — System overview
