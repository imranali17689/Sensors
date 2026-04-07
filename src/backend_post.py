import requests
from datetime import datetime
try:
    from .config import BACKEND_URL, DEVICE_NAME, ENABLE_POSTS, POST_TIMEOUT
except ImportError:
    from config import BACKEND_URL, DEVICE_NAME, ENABLE_POSTS, POST_TIMEOUT


def post_event(direction, track_id=None, object_type="person", count=None):
    if not ENABLE_POSTS:
        print(f"[POST DISABLED] direction={direction}, track_id={track_id}, count={count}")
        return

    payload = {
        "device_name": DEVICE_NAME,
        "direction": direction,
        "track_id": track_id,
        "object_type": object_type,
        "count": count
    }

    try:
        response = requests.post(BACKEND_URL, json=payload, timeout=POST_TIMEOUT)
        print(f"[POST] {response.status_code} | {payload}")
    except Exception as e:
        print(f"[POST FAILED] {e}")