import requests
from datetime import datetime
try:
    from .config import BACKEND_URL, ENABLE_POSTS, POST_TIMEOUT
except ImportError:
    from config import BACKEND_URL, ENABLE_POSTS, POST_TIMEOUT


def post_event(direction, track_id=None, object_type="car", confidence=0.0):
    if not ENABLE_POSTS:
        print(
            f"[POST DISABLED] direction={direction}, track_id={track_id}, "
            f"object_type={object_type}, confidence={confidence}"
        )
        return

    payload = {
        "object_type": object_type,
        "direction": direction,
        "confidence": float(confidence),
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "track_id": str(track_id) if track_id is not None else None,
    }

    try:
        response = requests.post(BACKEND_URL, json=payload, timeout=POST_TIMEOUT)
        print(f"[POST] {response.status_code} | {payload}")
        print(f"[RESPONSE] {response.text}")
    except Exception as e:
        print(f"[POST FAILED] {e}")