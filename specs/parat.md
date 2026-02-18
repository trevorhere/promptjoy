# PARAT Knowledge System

**Status:** Draft
**Version:** 1.0
**Last Updated:** 2026-02-17

---

## 1. Overview

PARAT is a structured knowledge organization system that makes AI assistants actually useful by providing clear context hierarchy.

### 1.1 What is PARAT?

| Letter | Category | Description | Example |
|--------|----------|-------------|---------|
| **P** | Projects | Active work with deadlines | Q1 Product Launch |
| **A** | Areas | Ongoing responsibilities | Customer Support, Finance |
| **R** | Resources | Reference material | Policies, Templates, Guides |
| **A** | Archive | Completed/inactive items | 2025 Projects |
| **T** | Time | Time-based tracking | Daily logs, Meeting notes |

### 1.2 Why PARAT?

Without structure, AI assistants:
- Don't know what's current vs. archived
- Can't prioritize relevant information
- Return stale or irrelevant context

With PARAT:
- AI knows what's active and important
- Context retrieval is targeted
- Responses are relevant to current work

---

## 2. Structure

### 2.1 Directory Layout

```
knowledge/
├── projects/
│   ├── q1-product-launch/
│   │   ├── README.md
│   │   ├── timeline.md
│   │   └── decisions.md
│   └── hipaa-compliance/
│       └── ...
│
├── areas/
│   ├── customer-support/
│   │   ├── README.md
│   │   ├── playbooks/
│   │   └── escalation.md
│   └── finance/
│       └── ...
│
├── resources/
│   ├── policies/
│   │   ├── ai-usage.md
│   │   ├── data-security.md
│   │   └── hipaa.md
│   ├── templates/
│   └── tools/
│
├── archive/
│   └── 2025/
│       └── ...
│
└── time/
    ├── 2026/
    │   ├── 02/
    │   │   ├── 17.md
    │   │   └── ...
    │   └── ...
    └── meetings/
```

### 2.2 Metadata

Each document includes frontmatter:

```markdown
---
title: Q1 Product Launch
type: project
status: active
owner: product-team
created: 2026-01-15
updated: 2026-02-17
tags: [launch, product, q1]
---

# Q1 Product Launch

Project overview and status...
```

---

## 3. AI Integration

### 3.1 Context Building

When user asks a question:

```typescript
async function buildContext(query: string, tenant: TenantConfig) {
  // 1. Identify relevant categories
  const categories = classifyQuery(query);
  // → ["areas/customer-support", "resources/policies"]
  
  // 2. Retrieve from each category (prioritized)
  const contexts = await Promise.all([
    // Active projects first
    searchCategory('projects', query, { status: 'active' }),
    // Then relevant areas
    searchCategory('areas', query),
    // Then resources
    searchCategory('resources', query),
    // Recent time entries (last 7 days)
    searchCategory('time', query, { days: 7 }),
    // Archive only if explicitly asked
    // searchCategory('archive', query),
  ]);
  
  // 3. Combine and truncate to token limit
  return combineContexts(contexts, maxTokens);
}
```

### 3.2 Category Priorities

| Priority | Category | When to Include |
|----------|----------|-----------------|
| 1 | Projects (active) | Always for work questions |
| 2 | Areas (relevant) | When matches user's department |
| 3 | Resources | Policy/procedure questions |
| 4 | Time (recent) | "What did we discuss..." questions |
| 5 | Archive | Only when explicitly requested |

### 3.3 Embedding Strategy

```typescript
// Embed at document level for efficient retrieval
interface KnowledgeDocument {
  id: string;
  tenantId: string;
  category: 'projects' | 'areas' | 'resources' | 'archive' | 'time';
  path: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
  embedding: number[];
  updatedAt: string;
}

// Search flow
const results = await env.VECTORIZE.query(queryEmbedding, {
  topK: 10,
  filter: { 
    tenantId: tenant.id,
    category: { $in: ['projects', 'areas', 'resources'] }
  }
});
```

---

## 4. Tenant Setup

### 4.1 Onboarding Flow

1. **Import existing docs** — Upload from Google Drive, Notion, SharePoint
2. **Classify into PARAT** — AI-assisted categorization
3. **Generate embeddings** — Vectorize all documents
4. **Validate retrieval** — Test queries to verify context quality

### 4.2 Sync Options

| Source | Method | Frequency |
|--------|--------|-----------|
| Manual upload | Web UI | On-demand |
| Google Drive | OAuth + API | Hourly |
| SharePoint | Graph API | Hourly |
| Notion | API | Hourly |
| Git repo | Webhook | On push |

---

## 5. Database Schema

```sql
CREATE TABLE knowledge_documents (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  category TEXT NOT NULL,        -- projects/areas/resources/archive/time
  path TEXT NOT NULL,            -- Full path within category
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT,                 -- JSON
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(tenant_id, path)
);

CREATE INDEX idx_knowledge_tenant ON knowledge_documents(tenant_id);
CREATE INDEX idx_knowledge_category ON knowledge_documents(tenant_id, category);
```

---

## 6. API

### 6.1 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/knowledge` | List documents (paginated) |
| GET | `/api/knowledge/:id` | Get document |
| POST | `/api/knowledge` | Create document |
| PUT | `/api/knowledge/:id` | Update document |
| DELETE | `/api/knowledge/:id` | Delete document |
| POST | `/api/knowledge/search` | Semantic search |
| POST | `/api/knowledge/import` | Bulk import |

### 6.2 Search Request

```json
{
  "query": "What's our refund policy?",
  "categories": ["resources", "areas"],
  "limit": 5
}
```

### 6.3 Search Response

```json
{
  "results": [
    {
      "id": "doc-123",
      "title": "Refund Policy",
      "path": "resources/policies/refunds.md",
      "snippet": "Customers may request a refund within 30 days...",
      "score": 0.92
    }
  ]
}
```
