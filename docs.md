# UM-HACKATHON-2025-BENINGING


## Table of Contents

- [Solution architecture](#solution-architecture)
- [Data utilization](#data-utilization)
- [Personalization strategies](#personalization-strategies)


## Solution architecture





## Data utilization
Our solution goes beyond typical query handling — it transforms raw CSV data into **merchant-specific insights**, acting like a personalized **Data Storyteller**. Here's how we bring that to life:

---

### 1. Data Ingestion
We integrate merchant-related CSVs:

- `merchant.csv`  
- `items.csv`  
- `keywords.csv`  
- `transaction_data.csv`  
- `transaction_items.csv`  

These are dynamically parsed at runtime. Headers are auto-cleaned and standardized, enabling structured referencing across the pipeline.

---

### 2. Data Mapping & Schema Awareness
We use a dynamic function:
```python
build_data_description()
```
to generate a real-time schema snapshot:

```
transaction_data:
- order_id
- order_time
- merchant_id
...
```

This lets the AI **speak the language of the merchant’s data**, reducing hallucination and ensuring precise understanding.

---

### 3. Intent Translation: From Language to Logic
We convert user input into two synchronized outputs:
- **Pandas query** — used for actual data computation
- **Metropolib logic query** — expressing the same logic semantically

Generated using `build_input_prompt()` under **Dual Query Mode**, this structure ensures:
- Query clarity  
- Explainable logic  
- Interoperability with future API/data warehouse integrations

---

### 4. Reasoning Logs = Transparent AI
Each AI interaction is logged via:
```python
save_reasoning_log(gpt_output, merchant_id)
```

This creates a **timestamped audit trail**, allowing:
- Debugging of data behavior
- Review of AI decision-making
- Trust-building for merchant empowerment

---

### 5. Contextual Memory = Chat That Feels Smart
With up to 20-turn contextual memory, our AI:
- Understands follow-ups like “What about last week?”  
- Remembers prior queries  
- Provides continuity in conversations

Making it feel more like a **data-literate teammate** than a one-off chatbot.

---

### 6. Merchant Isolation by Design
All queries are **scoped to the current `merchant_id`**, enforced in:
- Prompt generation  
- Query filtering  
- Session initialization

This guarantees **data privacy**, avoiding cross-merchant leakage while enabling real personalization.

---

### 7. *Data Storyteller Mode*
We don’t just return raw outputs — we **explain the “why”** behind every suggestion:

> “We noticed your snack items peak around 3 PM — perhaps offer a tea-time combo?”

The reasoning field tells a **mini story**, helping non-technical merchants understand what’s happening behind the scenes.

---

### 8. Bias Awareness & Fairness *(Future Scope)*
As we scale, we aim to flag:
- Biased sales trends (e.g., under-promotion of certain categories)  
- Outliers that may skew insights  
- Representation gaps in merchant or item data

This ensures our AI promotes **inclusive economic empowerment**, not just data-driven optimization.

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