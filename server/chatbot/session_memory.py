MAX_HISTORY = 20

session_history = []

def init_session(merchant_id: str):
    global session_history
    session_history = [{
        "role": "system",
        "content": f"You are an intent recognition engine. The current user is merchant_id = '{merchant_id}'. Only return data relevant to this merchant."
    }]

def update_session(role: str, content: str) -> bool:
    global session_history
    if len(session_history) >= MAX_HISTORY:
        print("⚠️ Max session history reached. No further updates.")
        return False  # blocked
    session_history.append({"role": role, "content": content})
    return True  # accepted


def get_session_history():
    return session_history


def force_session_termination():
    global session_history
    session_history = []

