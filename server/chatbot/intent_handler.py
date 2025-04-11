from dotenv import load_dotenv
import os, json, csv
from openai import OpenAI
from pathlib import Path
from .session_memory import init_session, update_session, get_session_history
from .prompt_utils import build_data_description
from .reasoning import save_reasoning_log
from .prompt_utils import build_data_description, build_input_prompt

# Load .env and OpenAI client
load_dotenv()
client = OpenAI(api_key=os.getenv("API_KEY"))

def get_intent_output(user_input: str, current_merchant_id: str) -> dict:
    # Load headers from CSV
    folder_path = Path('data')
    csv_headers = {}
    for csv_file in folder_path.glob('*.csv'):
        table_name = csv_file.stem
        with open(csv_file, newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            header = next(reader, None)
            if header:
                cleaned = [col if col.strip() else f"{table_name}_id" for col in header]
                csv_headers[table_name] = cleaned

    # Start session memory if it's empty
    if not get_session_history():
        init_session(current_merchant_id)



    # Build structured prompt from utils
    data_description = build_data_description(csv_headers)
    system_prompt = build_input_prompt(current_merchant_id, data_description,mode="2")


    # Update session — block if memory is full
    if not update_session("system", system_prompt) or not update_session("user", user_input):
        return {
            "context": "Session history limit reached. Please refresh to start a new session.",
            "panda_query": None,
            "reasoning": "User interaction was blocked due to max session cap."
        }


    # Call GPT
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=get_session_history(),
        temperature=0.2
    )

    gpt_output = response.choices[0].message.content.strip()
    update_session("assistant", gpt_output)
    save_reasoning_log(gpt_output, current_merchant_id)

    try:
        parsed = json.loads(gpt_output)
        intent = parsed[1]  # skip the first []
        return intent
    except json.JSONDecodeError:
        return {
            "context": "Unable to parse GPT response.",
            "panda_query": None,
            "reasoning": f"Raw response: {gpt_output}"
        }

