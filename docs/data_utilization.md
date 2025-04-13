---
title: Data Utilization
layout: default
---
[🏠 Home](./index.md) | [🧱 Solution Architecture](./solution_architecture.md) | [📊 Data Utilization](./data_utilization.md) | [🎯 Personalization](./personalization_strategies.md)

---

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


---

[← Back to Home](./index.md)
