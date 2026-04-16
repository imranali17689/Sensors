import requests
from datetime import datetime

try:
    from .config import BACKEND_URL, DEVICE_NAME, ENABLE_POSTS, POST_TIMEOUT
except ImportError:
    from config import BACKEND_URL, DEVICE_NAME, ENABLE_POSTS, POST_TIMEOUT


def post_event(direction, track_id=None, object_type="person", count=None):
    if not ENABLE_POSTS:
        print(f"[POST DISABLED] direction={direction}, count={count}")
        return

    payload = {
        "side_id": DEVICE_NAME,
        "direction": direction,
        "object_type": "car",  # always sent as car regardless of what camera detects
        "timestamp": datetime.utcnow().isoformat()
    }

    try:
        response = requests.post(BACKEND_URL, json=payload, timeout=POST_TIMEOUT)
        print(f"[POST] {response.status_code} | {payload}")
    except Exception as e:
        print(f"[POST FAILED] {e}")
