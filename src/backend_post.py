import requests
from datetime import datetime

try:
    from .config import BACKEND_URL, DEVICE_NAME, ENABLE_POSTS, POST_TIMEOUT
except ImportError:
    from config import BACKEND_URL, DEVICE_NAME, ENABLE_POSTS, POST_TIMEOUT


def post_event(direction, track_id=None):
    """
    Send a crossing event to the backend.

    The backend's SensorEvent model only cares about side_id, direction,
    and timestamp. We always report whatever crossed as a vehicle event;
    DETECTION_LABEL in config controls *what* the camera looks for, not
    what we tell the backend.
    """
    if not ENABLE_POSTS:
        print(f"[POST DISABLED] direction={direction} track_id={track_id}")
        return

    payload = {
        "side_id": DEVICE_NAME,
        "direction": direction,
        "timestamp": datetime.utcnow().isoformat(),
    }

    try:
        response = requests.post(BACKEND_URL, json=payload, timeout=POST_TIMEOUT)
        print(f"[POST] {response.status_code} | {payload}")
    except Exception as e:
        print(f"[POST FAILED] {e}")
