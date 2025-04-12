---
title: Personalization strategies
layout: default
---
[🏠 Home](./index.md) | [🧱 Solution Architecture](./solution_architecture.md) | [📊 Data Utilization](./data_utilization.md) | [🎯 Personalization](./personalization_strategies.md)

---

## Personalization strategies
Our system is designed to tailor the chat experience uniquely to each merchant, ensuring that insights, recommendations, and interactions are **contextually relevant**, **data-safe**, and **user-aware**. Below are the personalization strategies we employ:

---

### 1. Merchant-Centric Session Context
Each session is initialized with a `merchant_id`, ensuring:
- Queries are automatically scoped to the relevant merchant.
- Models understand the business context, preventing cross-merchant data leakage.
- Follow-up questions are intelligently grounded in prior conversations.

---

### 2. Memory-Aware Interactions (Conversational Personalization)
We support up to 20 turns of contextual memory per session:

```python
session_history = [...]
```

This enables:
- Smart follow-ups, e.g. “What about last week?” or “Show me the best item from that chart.”
- Personalized dialogue flow that adapts to user behavior and language over time.

---

## Making AI Feel Like a Business Partner
Beyond just answering questions, our system acts like a smart assistant that understands the merchant’s world, adapting suggestions and insights based on their data and local context.

---

### 3. Context-Aware Smart Suggestions
Our system doesn't wait for merchants to ask — it proactively suggests actions like:
- “Want to promote your best-selling item for Ramadan?”
- “You sold 25% more snacks last weekend — try bundling them for the next one?”
- “It’s nearing payday — want to run a discount on high-ticket items?”

These are derived from temporal data (`order_time`), item category trends, and cultural calendars.

---

### 4. Festival-Aware Recommendations
We can integrate with a regional calendar of major events (Hari Raya, Chinese New Year, Merdeka Day, etc.) to trigger:
- Personalized sales insights (e.g., “Your kuih lapis sells well during Hari Raya — promote it now?”)
- Inventory tips (e.g., “Stock up on drinks — demand spikes 3 days before Chinese New Year!”)

This empowers merchants to make **data-backed festive strategies**, not just guesswork.

---

### 5. “Things You Might Like to Promote” Section
Based on:
- Item popularity
- Profit margin
- Keywords from customer reviews

We generate a carousel of suggestions, such as:
> “Customers are loving your Matcha Latte — want to feature it on your homepage?”

This is not static — it **adapts in real-time** based on current sales patterns.

---

### 6. Personalized Trend Spotting
The system learns merchant-specific trends:
- “You usually get a spike on Fridays — want to prep a promo banner?”
- “Your ‘Budget Meals’ sell better at month-end — push them this weekend?”

By mirroring **merchant rhythm**, it builds trust and habit.

---

### 7. Tailored Keyword Recommendations
Using data from `keywords.csv`, the AI can suggest:
- Better search tags
- Trending food terms
- Local lingo optimization (e.g., "nasi bungkus" vs "packed rice")

Helping merchants **appear in more searches** and connect with customers in their language.

---

### 8. Smart Notifications *(Future Scope)*
Imagine a merchant dashboard with:
> **“Your top item from last month is trending again. Boost it?”**

Or app notifications like:
> “Need more eyes on your weekend deals? Try offering 10% off via Grab app.”




---

[← Back to Home](./index.md)
