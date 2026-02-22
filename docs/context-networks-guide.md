# CONTEXT NETWORKS

## From Zettelkasten to AI-Traversable Knowledge Systems

### A Comprehensive Guide to Building and Implementing Your Personal Context Network

*The intellectual lineage of linked knowledge — from a German sociologist's index cards to frontier AI models that think in graphs — plus a practical framework for implementation.*

---

## PART I: THE INTELLECTUAL FOUNDATION

### Introduction: The Thread That Connects Them All

The history of human knowledge management is, at its core, a history of linking. Every major leap — from Niklas Luhmann's paper slipbox to Roam Research to today's frontier AI models — represents a more sophisticated answer to the same fundamental question: how do we capture what we know, connect it to what else we know, and then navigate that web when we need it?

This guide traces that lineage in sequence, then shows you how to build a context network of your own. Understanding each historical step illuminates why modern AI systems are being architected the way they are, and why context networks may be the most consequential development in knowledge infrastructure since the relational database.

---

### Chapter 1 — 1952 to 1997: Niklas Luhmann and the Zettelkasten

Niklas Luhmann was a German sociologist who published an almost absurd volume of work over his career — roughly 70 books and over 400 scholarly articles across four decades. When asked about his productivity, he was disarmingly honest: he did not work especially hard. His system did the work.

That system was the Zettelkasten, German for "slip box." Luhmann maintained a physical cabinet of approximately 90,000 index cards, each containing a single discrete idea. What made the Zettelkasten extraordinary was not the volume of cards but the structure of the links between them. Each card was assigned a unique alphanumeric identifier. When a new idea related to an existing one, Luhmann did not file it nearby — he linked it by reference, creating a web of connections that grew more valuable the denser it became.

> "I do not think, my notecard box thinks for me." — Niklas Luhmann

The insight embedded in this practice was radical for its time: knowledge is not hierarchical, it is associative. A good idea does not belong in a single folder. It belongs everywhere it connects. Luhmann's slipbox was, in effect, an analog graph database — with nodes (notes) and edges (links) — built and traversed by hand.

Luhmann died in 1998. His Zettelkasten survived him and is now digitized and maintained by the University of Bielefeld. For decades the system remained a niche curiosity among German academics. Then the internet happened, and suddenly everyone had the infrastructure to build one.

---

### Chapter 2 — The Concept: The Hyperlink as Cognitive Architecture

The hyperlink is so ubiquitous today that it is easy to forget it was a philosophical proposition before it was a technical implementation. Ted Nelson coined the term "hypertext" in 1963, envisioning a global system of non-linear, bidirectional linked documents he called Xanadu. Tim Berners-Lee built a simpler, unidirectional version of this into the World Wide Web in 1989.

The core idea in both was the same as Luhmann's: meaning is relational. A document's value is not contained entirely within itself — it is also a function of what it points to and what points back at it. PageRank, the algorithm that made Google, is essentially a mathematical formalization of this principle applied to the web.

What neither the web nor early note-taking software captured was the bidirectional link — the backlink. In a true knowledge graph, if Note A links to Note B, Note B should know about Note A. This seemingly small addition changes everything. It means that every time you create a connection, both nodes in that connection gain context. You can navigate from any idea to every idea that has ever referenced it. The graph becomes explorable in all directions.

This was the missing feature that a generation of knowledge workers would spend the 2010s waiting for someone to build.

---

### Chapter 3 — The Movement: The Second Brain Movement

By the mid-2010s, a loose but energetic community had formed around the concept of "personal knowledge management" — PKM for short. The premise was that the human brain, powerful as it is, was never designed to store and retrieve the volume of information a modern knowledge worker encounters daily. The solution was to offload that storage to a trusted external system: a second brain.

The second brain concept drew explicitly on Luhmann, on Getting Things Done (David Allen's 1991 methodology), and on the emerging literature around cognitive load and extended mind theory. The philosopher Andy Clark and David Chalmers had argued in a 1998 paper that the mind is not bounded by the skull — that a notebook, properly used, is not just a tool for the mind but a part of the mind. Second brain practitioners took this seriously.

The movement coalesced around a few key ideas: capture everything worth capturing, process it deliberately, link it to what you already know, and review it regularly. Different practitioners developed different workflows, but the common thread was that the system should be navigable by association, not just by hierarchy. You should be able to wander through your notes the way you wander through thoughts — following threads wherever they lead.

---

### Chapter 4 — Tiago Forte: Building a Second Brain

Tiago Forte is perhaps the most influential figure in systematizing and popularizing second brain thinking for a mainstream audience. A productivity consultant and writer, Forte developed a framework called PARA — Projects, Areas, Resources, Archives — as an organizational structure for personal knowledge systems. He taught it first as an online course and later as a 2022 book titled *Building a Second Brain*.

Forte's contribution was crucial because it was accessible. He translated the abstract philosophy of Luhmann and the extended mind theorists into concrete workflows that ordinary knowledge workers could adopt. His framework emphasized progressive summarization — the practice of distilling notes over multiple passes so that the most important ideas become quickly retrievable — and the concept of "intermediate packets," reusable chunks of captured thinking that could be composed into finished work.

Forte built his system primarily on Evernote, which was for much of the 2010s the dominant tool for personal knowledge management. Evernote's strength was capture: it could receive content from anywhere and make it searchable. Its weakness, which would eventually become critical, was that it organized by folder rather than by link. Notes existed in isolation. They did not know about each other.

---

### Chapter 5 — Evernote: The Limits of the Folder

Evernote launched in 2008 and became, for a decade, the default answer to the question of where knowledge workers should store their notes. At its peak it claimed over 200 million users. It offered cross-platform sync, robust search, web clipping, and a clean organization system built around notebooks and tags.

The product's fundamental architecture, however, was hierarchical. Notes lived in notebooks. Notebooks lived in stacks. Tags could approximate some associative navigation, but there was no native concept of a link between notes, and certainly no backlink. If you wrote about a topic in ten different notes over three years, there was no mechanism by which those notes knew about each other except your own memory and manual curation.

Evernote also suffered a turbulent decade of leadership changes, feature bloat, and pricing controversies. But the structural critique was more fundamental than the business problems. As the second brain community matured, users began to understand that what they actually wanted was not a better folder system — they wanted a graph. Evernote was eventually pushed aside not by a better version of itself, but by a categorically different type of tool.

---

### Chapter 6 — Conor White-Sullivan: The Birth of Roam

Conor White-Sullivan is the founder of Roam Research and, in the PKM community, something of a cult figure. His intellectual biography before Roam reads like a prerequisite: he studied philosophy, became obsessed with Luhmann, read extensively in cognitive science and information theory, and concluded that the tools available for knowledge management were architecturally wrong.

White-Sullivan's central insight was that the unit of knowledge should not be the document — it should be the block. A block is a single paragraph, a single thought. Blocks could be embedded in multiple contexts simultaneously, linked bidirectionally, and queried. The result was a note-taking system that behaved less like a filing cabinet and more like a relational database overlaid with a graph.

Roam Research launched in 2020 and immediately generated intense enthusiasm among a specific kind of early adopter: researchers, writers, and builders who had been waiting for exactly this. The defining feature was the double-bracket link syntax — typing `[[any concept]]` would create a link to a page for that concept, and that page would automatically display a list of every note that had ever linked to it. Backlinks were native, automatic, and central to the experience.

Roam did not invent the backlink. It made backlinks the primary unit of navigation.

The community that formed around Roam was unusually intellectual and evangelistic. Users developed elaborate methodologies for Roam-native thinking, gave their practices names, and wrote extensively about how bidirectional linking had changed not just their note-taking but their actual cognition. Whether or not those claims were fully warranted, the enthusiasm was real and consequential — it demonstrated a genuine market for graph-native knowledge tools.

---

### Chapter 7 — Obsidian and Markdown: The Open Standard

Roam's success spawned a generation of competitors and alternatives. The most significant of them was Obsidian, launched in 2020 by Erica Xu and Shida Li. Where Roam was a hosted web application with a subscription model, Obsidian was local-first: your notes were stored as plain Markdown files on your own machine. The application was free for personal use.

Markdown is a lightweight plain-text formatting syntax created by John Gruber in 2004. It uses simple conventions — asterisks for bold, hashtags for headings, square brackets for links — to produce formatted text that remains readable in its raw form. Critically, Markdown files are just text files. They can be read by any application, version-controlled with git, and processed programmatically.

Obsidian adopted the `[[wikilink]]` syntax from Roam and layered it onto plain Markdown files. The result was a system where every link was a text string in an open format. Your knowledge graph was not locked inside a proprietary database — it was a directory of .md files on your hard drive, with the links embedded directly in the text. The graph visualization in Obsidian rendered those links as a network, letting you see the structure of your knowledge at a glance.

This architectural choice — links as plain text in open files — turned out to be enormously consequential for what came next. A graph stored in plain text files is trivially parseable by software. Any program that can read text files can read your knowledge graph, traverse its links, and reason about its structure. Obsidian vaults, as it turned out, were ideal inputs for AI systems.

---

### Chapter 8 — The Architecture: Context Networks as Cognitive Infrastructure

The term "context network" refers to a knowledge graph in which nodes contain not just information but the contextual relationships that give that information meaning. It is a generalization of the Zettelkasten principle to digital infrastructure: a system where every piece of knowledge is enriched by its connections to every related piece of knowledge.

A context network is distinguished from a simple database or document store by several properties. First, it is associative — navigation is by link, not by search query alone. Second, it is bidirectional — every connection is visible from both ends. Third, it accumulates context over time — the more you add, the richer the connections become, and the more each individual node gains meaning from its position in the larger graph.

Context networks encode something that flat databases cannot: the texture of understanding. A fact stored in isolation is data. A fact stored with its provenance, its related concepts, its contradictions, its applications, and its history is something closer to knowledge. Context networks are designed to store the second thing.

The practical implementation of context networks today ranges from personal Obsidian vaults to enterprise knowledge graphs built on graph databases like Neo4j, to the internal representations that large AI systems construct of their training data. The form varies. The underlying structure — nodes, edges, bidirectional context — is consistent.

---

### Chapter 9 — AI and Context: AI Traversal of Context Networks

The convergence of graph-based knowledge systems with large language models represents a genuinely new capability. Early LLMs were powerful at generation but episodic in memory — each conversation began from scratch, drawing only on the model's training weights. What they could not do was navigate a specific, personalized, evolving knowledge graph. They had general knowledge but not your knowledge.

Retrieval-Augmented Generation (RAG) was the first serious attempt to address this. In a RAG system, a user's query is used to retrieve relevant documents from a vector database, which are then provided to the LLM as context. The model generates its response informed by those retrieved documents. This was a significant improvement over pure generation, but it treated the knowledge base as a bag of chunks rather than a graph. Each retrieval operation pulled isolated fragments without necessarily preserving the relational structure between them.

Graph-aware retrieval goes further. Rather than retrieving flat document chunks, it traverses the context network — following links, aggregating related nodes, and assembling a structured subgraph that represents everything the system knows about the relevant topic and its neighbors. The LLM then reasons over this subgraph rather than a collection of disconnected passages.

The difference between RAG and graph traversal is the difference between looking up a word in a dictionary and navigating a conversation with someone who has thought deeply about everything related to that word.

Agentic AI systems take this further still. An agent traversing a context network can follow links dynamically, deciding at each node whether to go deeper or broader, accumulating context in a way that mirrors the associative reasoning process Luhmann performed manually with his slipbox. The agent does not just retrieve — it reasons about the structure of the graph itself, identifying gaps, contradictions, and unexpected connections.

---

### Chapter 10 — The Frontier: Context as Competitive Advantage

The most capable AI systems in production today — from Anthropic, OpenAI, Google, and others — are not just large language models. They are language models with increasingly sophisticated architectures for managing context: what they know, what they have access to, and how those two things interact at inference time.

Context windows have grown from 4,000 tokens in GPT-3 to over a million tokens in some current systems. But raw context window size is not the whole story. A model with a one-million-token context window that receives poorly structured, unlinked information will underperform a model with a smaller window that receives a well-structured context network. The quality of the graph matters as much as the model's capacity to process it.

Several developments at the frontier point toward context networks as a core architectural primitive. OpenAI's deep research capabilities, Anthropic's Claude with extended tool use and memory, and Google's Gemini with its document-level reasoning all represent attempts to give frontier models the ability to navigate structured knowledge rather than simply process text. The technical implementations differ, but the underlying goal is consistent: build systems that can reason over graphs, not just generate from text.

The Model Context Protocol (MCP), introduced by Anthropic in late 2024, is a standardized interface for connecting AI models to external context sources. It is, in effect, a protocol for AI traversal of context networks — a common language by which models can request, receive, and navigate structured knowledge from any compliant system. Its rapid adoption across the ecosystem signals that the industry has converged on context network traversal as a foundational capability.

There is a deeper point here that applies directly to how organizations should think about their AI investments. The competitive advantage in the AI era will not come primarily from model access — the frontier models are widely available and roughly comparable in capability. It will come from context. Organizations that have invested in structured, linked, high-quality knowledge graphs will be able to give their AI systems dramatically better inputs. The organization that has built the richest context network will extract the most value from the most capable models.

---

### Synthesis: The Through-Line

Luhmann built a system of 90,000 cards because he understood, before the language existed to describe it, that knowledge is a network and that a network becomes more valuable as it becomes more connected. The second brain movement translated that insight into digital practice for individual knowledge workers. Roam Research proved that bidirectional linking could change how people think. Obsidian proved that open formats and local ownership could scale that practice to millions. And now frontier AI models are building the infrastructure to traverse those networks at machine speed, with machine comprehension.

The thread from the Zettelkasten to the context network is direct and unbroken. Every step along it was made by people who believed that the structure of knowledge matters — that how you connect ideas is as important as what you know. That belief has now been encoded into the architecture of the most powerful AI systems in the world.

The question is no longer whether to build a context network. It is how rich, how linked, and how well-maintained yours will be when the models arrive to traverse it.

---

## PART II: IMPLEMENTATION

### Implementing Your Context Network with PARAT

The intellectual foundation is clear: context networks are the future of knowledge infrastructure, and the organizations and individuals who build them now will have a structural advantage when AI systems arrive to traverse them. But how do you actually build one?

This section introduces **PARAT** — an extension of Tiago Forte's PARA method that adds the critical dimension of time. PARAT provides a practical, implementable framework for building a context network that is both human-navigable and AI-traversable.

---

### The PARAT Framework

PARAT extends PARA by adding a fifth component that changes everything:

| Component | Description | Examples |
|-----------|-------------|----------|
| **P**rojects | Active work with defined outcomes and deadlines | "Q2 Product Launch," "Website Redesign," "Annual Report" |
| **A**reas | Ongoing domains of responsibility with standards to maintain | "Health," "Finance," "Team Management," "Client Relationships" |
| **R**esources | Reference material and knowledge on topics of interest | "Machine Learning," "Sales Techniques," "Industry Research" |
| **A**rchives | Completed or inactive items from the above categories | Past projects, deprecated resources, historical records |
| **T**ime | Chronological capture of what you're working on and when | Daily notes, weekly reviews, meeting logs, decision records |

The **Time** component is the key innovation. While PARA organizes knowledge spatially — by what it is — the Time component organizes knowledge temporally — by when it happened. This temporal thread provides something crucial that pure topical organization cannot: a narrative. It captures not just what you know, but how your understanding evolved, what decisions you made, and the context in which those decisions occurred.

For AI systems, this temporal dimension is transformative. An AI traversing your context network can now understand not just the current state of a project, but its history. It can see which resources were consulted during which phases of work. It can identify patterns in how you approach problems over time. The Time component turns your knowledge graph from a static map into a dynamic record of your thinking.

---

### Setting Up the Folder Structure

The PARAT folder structure is designed to be simple enough to maintain manually while being structured enough for AI traversal. Here is the recommended layout:

```
vault/
├── 0-Time/
│   ├── Daily/
│   │   ├── 2025-02-22.md
│   │   ├── 2025-02-21.md
│   │   └── ...
│   ├── Weekly/
│   │   ├── 2025-W08.md
│   │   ├── 2025-W07.md
│   │   └── ...
│   └── Meetings/
│       ├── 2025-02-22 Client Sync.md
│       └── ...
├── 1-Projects/
│   ├── Website Redesign/
│   │   ├── _index.md
│   │   ├── Requirements.md
│   │   ├── Design Decisions.md
│   │   └── ...
│   └── Q2 Product Launch/
│       └── ...
├── 2-Areas/
│   ├── Health/
│   ├── Finance/
│   ├── Team Management/
│   └── ...
├── 3-Resources/
│   ├── Machine Learning/
│   ├── Industry Research/
│   ├── Sales Techniques/
│   └── ...
├── 4-Archives/
│   ├── Completed Projects/
│   ├── Deprecated Resources/
│   └── ...
└── _System/
    ├── Templates/
    │   ├── daily-note.md
    │   ├── weekly-review.md
    │   ├── project-index.md
    │   └── meeting-note.md
    └── Maps/
        ├── Projects MOC.md
        ├── Areas MOC.md
        └── Resources MOC.md
```

**Key structural principles:**

1. **Numeric prefixes** ensure consistent sort order across any file system or application
2. **The Time folder comes first** (0-Time) because it's where daily work begins
3. **Each project has an `_index.md`** that serves as an entry point and summary
4. **The `_System` folder** contains templates and Maps of Content (MOCs) that help navigate the graph
5. **Archives preserve structure** — completed projects move to Archives with their folder structure intact

---

### Templates: The Building Blocks

Templates ensure consistent structure, which enables consistent traversal. Here are the essential templates for a PARAT system:

#### Daily Note Template (`_System/Templates/daily-note.md`)

```markdown
# {{date:YYYY-MM-DD}}

## Focus
What's the one thing that would make today successful?
- 

## Working On
### Morning
- 

### Afternoon
- 

## Notes & Thoughts
<!-- Capture fleeting ideas, observations, things to process later -->

## Links Created Today
<!-- Track new connections you've made in your graph -->
- [[]]

## End of Day
### Accomplished
- 

### Carry Forward
- 

### Gratitude
- 

---
**Previous:** [[{{date-1d:YYYY-MM-DD}}]] | **Next:** [[{{date+1d:YYYY-MM-DD}}]]
```

#### Weekly Review Template (`_System/Templates/weekly-review.md`)

```markdown
# Week {{date:YYYY-[W]WW}}

**Dates:** {{monday:YYYY-MM-DD}} → {{sunday:YYYY-MM-DD}}

## Review

### Projects Touched
<!-- Which projects did you work on this week? -->
- [[]]

### Key Decisions Made
<!-- What did you decide, and why? -->
- 

### New Connections
<!-- What new links did you create? What patterns emerged? -->
- 

### What Worked
- 

### What Didn't
- 

## Planning

### Next Week's Focus
- 

### Projects Requiring Attention
- [[]]

### Blocked Items
- 

---
**Previous:** [[{{week-1:YYYY-[W]WW}}]] | **Next:** [[{{week+1:YYYY-[W]WW}}]]
```

#### Project Index Template (`_System/Templates/project-index.md`)

```markdown
# {{title}}

**Status:** Active | On Hold | Completed
**Area:** [[]]
**Started:** {{date}}
**Target Completion:** 
**Actual Completion:** 

## Objective
What does success look like for this project?

## Key Resources
<!-- Link to resources being used -->
- [[]]

## Decision Log
<!-- Major decisions with dates and rationale -->
| Date | Decision | Rationale |
|------|----------|-----------|
| | | |

## Progress Log
<!-- Link to relevant daily notes -->
- [[2025-02-22]] — 

## Related
<!-- Other projects, areas, or resources this connects to -->
- [[]]

## Notes
```

---

### Linking Between PARAT Components

The power of a context network comes from its links. In a PARAT system, links flow in predictable patterns that create a navigable graph:

#### Link Patterns

**Time → Projects (most common)**
Daily notes link to the projects you worked on that day:
```markdown
## Working On
- Continuing work on [[Website Redesign]] — finalized the navigation structure
- [[Q2 Product Launch]] — reviewed timeline with stakeholders
```

**Projects → Areas**
Every project belongs to an area of responsibility:
```markdown
**Area:** [[Team Management]]
```

**Projects → Resources**
Projects reference the knowledge they draw on:
```markdown
## Key Resources
- [[User Research Methods]]
- [[Competitor Analysis Framework]]
- [[Brand Guidelines]]
```

**Time → Decisions**
Daily notes capture decisions as they happen, with links to the affected entities:
```markdown
Decided to delay the [[Website Redesign]] launch by two weeks. See [[2025-02-22 Client Sync]] for discussion. Updated timeline in [[Q2 Product Launch]] accordingly.
```

**Resources ↔ Resources**
Resources link to related resources:
```markdown
This framework builds on [[Jobs to Be Done Theory]] and complements [[Customer Journey Mapping]].
```

#### The Two-Way Street

Remember: in a properly linked system, every link is bidirectional. When you write `[[Website Redesign]]` in your daily note, the Website Redesign page automatically shows a backlink to that daily note. This means:

- Projects accumulate a complete history of when they were worked on
- Resources show everywhere they've been applied
- Areas reveal all the projects that have contributed to them
- Time provides a navigable thread through everything

This bidirectionality is what transforms a folder of notes into a graph. An AI traversing the graph can start anywhere — a project, a date, a concept — and navigate to everything related.

---

### Daily and Weekly Workflow with the Time Component

The Time component isn't just a folder — it's a workflow. Here's how to use it:

#### Daily Workflow (10-15 minutes total)

**Morning (5 minutes)**
1. Create today's daily note from the template
2. Review yesterday's note — anything to carry forward?
3. Set your focus for the day
4. Check your weekly note for planned priorities

**Throughout the Day**
1. Log what you're working on in short bullets
2. Link liberally — every project, person, or concept mentioned gets a `[[link]]`
3. Capture fleeting thoughts in the Notes section
4. When you make a decision, write it down with context

**End of Day (5 minutes)**
1. Fill in what you accomplished
2. Note what carries forward to tomorrow
3. Scan for links you should have made but didn't
4. One gratitude (optional but valuable for pattern recognition)

#### Weekly Workflow (30 minutes)

**Weekly Review (end of week)**
1. Create the weekly note from the template
2. Scan all daily notes from the week
3. Identify projects touched and progress made
4. Extract key decisions and their rationale
5. Note new connections discovered
6. Reflect on what worked and what didn't

**Weekly Planning (start of week)**
1. Set the week's focus
2. Identify projects requiring attention
3. Note any blocked items
4. Link to relevant daily notes from planning sessions

#### The Compounding Effect

This workflow creates a compounding asset. After one week, you have a complete record of your work. After one month, patterns emerge — which projects consume your time, which areas need attention, which resources you return to repeatedly. After one year, you have a navigable history of your professional thinking that no other system can replicate.

More importantly for the AI era: you have a traversable graph. An AI assistant with access to your PARAT system can answer questions like:

- "What did we decide about the navigation structure for the website redesign?"
- "Show me everything I worked on related to client relationships last quarter"
- "What resources have I used most when starting new projects?"
- "Trace the history of decisions that led to the current product strategy"

These queries are impossible with flat document storage. They're trivial with a properly linked context network.

---

### How PARAT Enables AI Traversal

The PARAT structure is designed with AI traversal in mind. Here's how each component contributes:

#### Predictable Entry Points

AI systems need to know where to start. PARAT provides clear entry points:

- **Need recent context?** Start at `0-Time/Daily/` and traverse backward
- **Need project status?** Start at `1-Projects/[Name]/_index.md`
- **Need domain knowledge?** Start at `3-Resources/[Topic]/`
- **Need historical context?** Start at `4-Archives/`

The `_System/Maps/` folder provides additional high-level entry points — Maps of Content that list all active projects, areas, and major resources.

#### Temporal Threading

The Time component provides what AI systems crave: chronological context. When an AI needs to understand the history of a project, it can:

1. Start at the project's `_index.md`
2. Follow backlinks to every daily note that mentions the project
3. Traverse those daily notes in chronological order
4. Extract the narrative of how the project evolved

This is dramatically more useful than searching a document store. The AI isn't finding relevant documents — it's reconstructing the actual history of your work.

#### Decision Provenance

Because daily notes capture decisions in context, an AI can trace any current state back to the decision that created it. This is invaluable for:

- Understanding why something is the way it is
- Identifying who was involved in a decision
- Finding the resources that informed a choice
- Detecting patterns in decision-making over time

#### Explicit Relationships

The linking conventions in PARAT make relationships explicit:

- Projects → Areas (ownership)
- Projects → Resources (dependency)
- Time → Projects (activity)
- Time → Decisions (provenance)

An AI doesn't have to infer these relationships from text — they're encoded directly in the graph structure.

#### Progressive Context Building

When you ask an AI a complex question, it can progressively build context by traversing the graph:

1. Start with the direct query match
2. Follow links to immediate neighbors
3. Identify relevant temporal context
4. Pull in resource references
5. Check for related decisions

Each traversal step adds relevant context while maintaining structure. This is graph-aware retrieval in practice.

---

### Getting Started Checklist

Ready to build your PARAT system? Follow this checklist:

#### Week 1: Foundation

- [ ] **Choose your tool** — Obsidian is recommended for its local-first, Markdown-based architecture
- [ ] **Create the folder structure** — Set up the five PARAT folders plus `_System`
- [ ] **Install essential templates** — Daily note, weekly review, project index, meeting note
- [ ] **Create your first daily note** — Start the habit today
- [ ] **Index existing projects** — Create an `_index.md` for each active project

#### Week 2: Linking Habits

- [ ] **Link as you write** — Use `[[double brackets]]` liberally
- [ ] **Create your first weekly review** — Reflect on week 1
- [ ] **Connect projects to areas** — Every project should link to its parent area
- [ ] **Start a Resources folder** — Begin capturing reference material
- [ ] **Review your backlinks** — Explore what's connecting organically

#### Week 3: Workflow Integration

- [ ] **Morning routine** — Daily note creation becomes automatic
- [ ] **End-of-day routine** — Capture accomplishments and carry-forward items
- [ ] **Meeting notes** — Start capturing meetings with links to relevant projects/people
- [ ] **Decision logging** — When you decide something significant, write it down

#### Week 4: Graph Cultivation

- [ ] **Full weekly review** — Complete the full template
- [ ] **Graph visualization** — Look at your graph; identify clusters and gaps
- [ ] **Maps of Content** — Create MOCs for your major project and area categories
- [ ] **Prune and organize** — Move completed projects to Archives; clean up orphan notes

#### Ongoing: Maintenance & Growth

- [ ] **Weekly reviews** — Non-negotiable; this is where patterns emerge
- [ ] **Monthly graph review** — Visualize your graph; look for interesting structures
- [ ] **Quarterly archives** — Move completed work to Archives; keep active folders clean
- [ ] **Annual synthesis** — What did you learn? What patterns emerged? What should change?

---

### Beyond the Basics

This guide provides the foundation for building a personal context network with PARAT. But implementation is just the beginning. The real value emerges from:

- **Customizing the system** to your specific work patterns and domains
- **Integrating external tools** — calendars, task managers, email, CRM systems
- **Building AI workflows** that traverse your graph for specific use cases
- **Scaling to teams** — extending personal knowledge management to organizational knowledge
- **Measuring and improving** — tracking graph density, traversal patterns, and knowledge ROI

The context network you build today will be the foundation for your AI-augmented work tomorrow. The question isn't whether to start — it's how sophisticated you want your system to be when the frontier models arrive to traverse it.

---

## About PromptJoy

PromptJoy helps organizations build the context infrastructure that makes AI actually useful. We specialize in:

- **Context Network Design** — Architecture and implementation of knowledge graphs optimized for AI traversal
- **AI Workflow Development** — Building systems that leverage your organizational knowledge
- **Team Enablement** — Training and tooling to scale personal knowledge management across organizations

The competitive advantage in the AI era will come from context, not from model access. Let's build your context network.

**[Contact PromptJoy →](https://promptjoy.com/contact)**

---

*This guide is part of PromptJoy's Context Networks series. For updates and additional resources, visit [promptjoy.com](https://promptjoy.com).*
