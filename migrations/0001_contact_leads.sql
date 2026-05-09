CREATE TABLE IF NOT EXISTS contact_leads (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'promptjoy-homepage',
  user_agent TEXT,
  cf_ray TEXT,
  country TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  submission_count INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at
ON contact_leads(created_at);
