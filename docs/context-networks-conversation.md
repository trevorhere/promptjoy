# Building a Second Brain with Context Networks

**Source:** [Claude conversation shared by Trevor](https://claude.ai/share/0c7db60d-3798-4109-83e2-260c835cd4b5)  
**Date:** February 21, 2026

---

## Conversation

### Trevor:
> Create a primer, or executive brief starting with Nikolas Lumen, his Zettelkasten, the concept of links, the Second Brain movement, Connor White, Roam Research, Tiago Forte, Evernote, Obsidian, markdown links, context networks, AI traversal of context networks, and frontier models using context networks

### Claude:
Here's your executive primer — ten chapters that trace the full lineage from Luhmann's slipbox to frontier AI.

The document covers:

**The intellectual chain** — Luhmann's Zettelkasten → the philosophical case for the hyperlink as cognitive architecture → the Second Brain movement → Forte/Evernote → White-Sullivan/Roam → Obsidian and the open Markdown standard

**The architecture** — what a context network actually is and why it differs structurally from a flat document store or RAG system

**The AI inflection** — how graph-aware retrieval differs from basic RAG, how agentic traversal mimics Luhmann's manual reasoning at machine speed, and why MCP matters

**The strategic point** — context quality, not model access, will be the competitive differentiator. The organizations building rich, linked knowledge graphs now are building the infrastructure that frontier models will leverage most.

One note: the correct spellings are **Niklas Luhmann** (German sociologist) and **Conor White-Sullivan** (Roam founder) — I used those throughout the document.

---

### Trevor:
> That's good thanks. Is there any empirical data on how this kind of context network better enables frontier AI models to accomplish work?

### Claude:
There's actually a solid and growing body of empirical work on this. Here's what the research shows:

#### The Microsoft GraphRAG Paper (2024) — the foundational study

The most cited work is Microsoft Research's "From Local to Global: A Graph RAG Approach to Query-Focused Summarization" (Edge et al., April 2024). Their core finding was that standard RAG fails on global questions directed at an entire text corpus — things like "What are the main themes in the dataset?" — because those are summarization tasks, not retrieval tasks. Their GraphRAG system leads to substantial improvements over a conventional RAG baseline for both the comprehensiveness and diversity of generated answers on datasets in the million-token range. Critically, baseline RAG struggles with queries that require aggregation of information across the dataset — queries such as "What are the top 5 themes in the data?" perform terribly because baseline RAG relies on a vector search of semantically similar text content.

#### The "Lost in the Middle" problem — context quality matters as much as context size

Microsoft's follow-up work (BenchmarkQED, 2025) directly tested whether larger context windows could substitute for graph structure. Even against a 1M-token context window, LazyGraphRAG achieved higher win rates across all comparisons — meaning throwing more raw text at a model doesn't compensate for the structural relationships a graph provides. This is a significant finding for Breeze's infrastructure thinking: raw context size is not the variable that matters most.

#### The Diffbot KG-LM Benchmark — where vector RAG scores zero

Diffbot's KG-LM Benchmark showed GraphRAG outperforming vector RAG 3.4x. Both the Metrics & KPIs and Strategic Planning categories saw zero accuracy from traditional vector RAG. Accuracy degrades to 0% as the number of entities per query increases beyond five without knowledge graph support. This is the most practically alarming finding — for exactly the kinds of cross-domain, multi-entity questions that executives ask, flat vector retrieval simply stops working.

#### The RobustQA Benchmark — production-scale comparison

Writer's Knowledge Graph scored 86.31% on the RobustQA benchmark — evaluated on 50,000 questions across eight domains and over 32 million documents. The next best implementation, using LlamaIndex with Weaviate Vector Store's hybrid search, scored 75.89%, while Azure Cognitive Search Retriever with GPT-4 scored 72.36%. That's a meaningful gap at scale.

#### Biomedical domain (high-stakes relationship reasoning)

A Capgemini study on the STaRK-Prime biomedical dataset found that in-context answer retrieval was significantly higher for GraphRAG (70%) compared to RAG (43%). The domain is relevant because biomedical queries — like enterprise aviation queries — involve complex relationship chains where getting the wrong answer has real consequences.

#### What the research doesn't yet show cleanly

The honest caveat is that most of this work measures graph-based retrieval against flat vector retrieval in controlled settings. There isn't yet a large body of peer-reviewed research specifically measuring the productivity lift for knowledge workers using personal context networks (Obsidian-style vaults) fed to frontier models. That research is probably 2-3 years away. What does exist is strong evidence that the underlying architecture — graph-structured context — produces meaningfully better model outputs on complex, multi-hop, relationship-dense queries, which is precisely the category that high-value knowledge work falls into.

#### Practical Summary

The performance gap between structured context networks and flat document retrieval is largest exactly where enterprise AI needs to be most reliable — strategic planning, cross-domain synthesis, and queries that span multiple entities and time horizons. Vector search works fine for "find me the document about X." It fails for "tell me how X, Y, and Z interact across our operational history."

---

## Key References

- Microsoft Research: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization" (Edge et al., April 2024) — [arXiv:2404.16130](https://arxiv.org/abs/2404.16130)
- Microsoft Research: BenchmarkQED (2025)
- Diffbot KG-LM Benchmark
- Writer RobustQA Benchmark (86.31% on 50K questions, 32M documents)
- Capgemini STaRK-Prime biomedical study
