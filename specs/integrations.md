# Enterprise Integrations

**Status:** Draft
**Version:** 1.0
**Last Updated:** 2026-02-17

---

## 1. Overview

Connect PromptJoy to enterprise tools — Teams, Outlook, and custom systems via OpenClaw assistant.

### 1.1 Integration Types

| Type | Description | Example |
|------|-------------|---------|
| **Chat** | AI assistant in messaging apps | Teams bot, Slack |
| **Email** | AI-assisted email drafting | Outlook add-in |
| **Knowledge** | Sync docs from external sources | SharePoint, Notion |
| **Workflow** | Trigger automations | n8n, Zapier webhooks |
| **OpenClaw** | Custom AI assistant | Standalone deployment |

---

## 2. Microsoft Teams

### 2.1 Capabilities

- **Direct chat** with AI assistant
- **@mention** in channels for help
- **Proactive notifications** (learning reminders, etc.)
- **Adaptive cards** for rich responses

### 2.2 Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Teams Client   │────▶│  Azure Bot Svc  │────▶│  PromptJoy API  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                                ┌─────────────────┐
                                                │   Claude API    │
                                                └─────────────────┘
```

### 2.3 Setup Per Tenant

1. Register bot in Azure (per tenant or shared)
2. Configure bot endpoint → `https://{tenant}.promptjoy.co/api/teams`
3. Install app in Teams admin center
4. Map Teams user IDs to PromptJoy users

### 2.4 Message Flow

```typescript
// worker/handlers/teams.ts

export async function handleTeamsMessage(
  request: Request,
  env: Env,
  tenant: TenantConfig
) {
  const activity = await request.json();
  
  // Extract message
  const userMessage = activity.text;
  const teamsUserId = activity.from.id;
  
  // Map to PromptJoy user
  const user = await getUserByTeamsId(env, tenant.id, teamsUserId);
  
  // Process through chat handler
  const response = await processChat(env, tenant, user, userMessage);
  
  // Return as Teams activity
  return {
    type: 'message',
    text: response.answer,
    // Optional: Adaptive card for rich content
  };
}
```

---

## 3. Microsoft Outlook

### 3.1 Capabilities

- **Compose assist** — AI helps draft emails
- **Reply suggestions** — Generate response options
- **Summarize thread** — Condense long email chains
- **Knowledge lookup** — Pull relevant docs into drafts

### 3.2 Implementation Options

| Option | Pros | Cons |
|--------|------|------|
| **Outlook Add-in** | Native UI, offline hints | Complex deployment |
| **Copilot Plugin** | Integrated with M365 Copilot | Requires Copilot license |
| **Browser Extension** | Easy deploy, works with web | Only web Outlook |

### 3.3 Add-in Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Outlook Client │────▶│  Add-in (SPA)   │────▶│  PromptJoy API  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 3.4 Compose Assist Flow

```typescript
// User highlights email text, clicks "AI Assist"

// 1. Send context to PromptJoy
POST /api/outlook/assist
{
  "action": "compose",
  "context": {
    "subject": "Re: Q1 Budget Review",
    "thread": "Previous email content...",
    "selectedText": "Text user wants help with",
    "intent": "reply"  // compose | reply | forward
  }
}

// 2. Return suggestions
{
  "suggestions": [
    {
      "label": "Professional response",
      "content": "Thank you for sharing the Q1 budget..."
    },
    {
      "label": "Request clarification",
      "content": "I have a few questions about..."
    }
  ]
}
```

---

## 4. OpenClaw Assistant

### 4.1 What is OpenClaw?

Standalone AI assistant deployed for enterprise use:
- Runs on customer infrastructure or PromptJoy cloud
- Connects to multiple tools (Teams, Slack, email, etc.)
- Full access to PARAT knowledge base
- Custom tools and integrations

### 4.2 Deployment Options

| Option | Description | Best For |
|--------|-------------|----------|
| **Cloud** | Hosted on PromptJoy infra | Quick start, managed |
| **On-prem** | Docker on customer servers | Data residency, compliance |
| **Hybrid** | Split components | Flexibility |

### 4.3 Capabilities

```yaml
# openclaw.config.yaml

name: ennoble-assistant
tenant: ennoble

channels:
  - type: teams
    enabled: true
  - type: slack
    enabled: false
  - type: email
    enabled: true
    address: ai@ennoblecare.com

knowledge:
  sources:
    - type: parat
      sync: true
    - type: sharepoint
      site: https://ennoble.sharepoint.com
      folders: [policies, procedures]

tools:
  - name: calendar
    type: microsoft-graph
  - name: ticket-lookup
    type: webhook
    endpoint: https://ennoble.zendesk.com/api/...

features:
  learning: true
  proactive: true
  scheduling: true
```

### 4.4 OpenClaw Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         OpenClaw Core                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐ │
│  │  Channel  │   │  Channel  │   │  Channel  │   │   Cron    │ │
│  │  (Teams)  │   │  (Email)  │   │  (Slack)  │   │  (Proactive)│
│  └─────┬─────┘   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘ │
│        │               │               │               │        │
│        └───────────────┼───────────────┼───────────────┘        │
│                        ▼                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Message Router                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                        │                                         │
│        ┌───────────────┼───────────────┐                        │
│        ▼               ▼               ▼                        │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐                 │
│  │  Claude   │   │ Knowledge │   │   Tools   │                 │
│  │  (Brain)  │   │  (PARAT)  │   │ (Actions) │                 │
│  └───────────┘   └───────────┘   └───────────┘                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Webhook / n8n Integration

### 5.1 Outbound Webhooks

PromptJoy sends events to external systems:

```typescript
// Events
interface WebhookEvent {
  type: 'survey.completed' | 'learning.signal_completed' | 'chat.message';
  tenantId: string;
  userId: string;
  data: Record<string, any>;
  timestamp: string;
}

// Configured per tenant
tenant.webhooks = [
  {
    url: 'https://n8n.ennoble.com/webhook/promptjoy',
    events: ['survey.completed', 'learning.signal_completed'],
    secret: 'webhook-signing-secret'
  }
];
```

### 5.2 Inbound Triggers

External systems trigger PromptJoy actions:

```
POST /api/webhooks/trigger
{
  "action": "send_reminder",
  "userId": "user-123",
  "message": "Time for your daily AI learning!"
}
```

---

## 6. Implementation Priority

| Phase | Integration | Effort | Impact |
|-------|-------------|--------|--------|
| 1 | Teams bot | Medium | High |
| 2 | OpenClaw (cloud) | High | High |
| 3 | Outlook add-in | Medium | Medium |
| 4 | Webhooks | Low | Medium |
| 5 | OpenClaw (on-prem) | High | Medium |
