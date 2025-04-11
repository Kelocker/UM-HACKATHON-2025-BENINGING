import os
from pathlib import Path
from datetime import datetime

def save_reasoning_log(gpt_output: str, merchant_id: str):
    log_folder = Path(f"../server/reasoning_logs/{merchant_id}")
    log_folder.mkdir(parents=True, exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_path = log_folder / f"intent_reasoning_{timestamp}.json"

    with open(log_path, 'w', encoding='utf-8') as f:
        f.write(gpt_output)

    print(f"Reasoning saved to: {log_path}")
