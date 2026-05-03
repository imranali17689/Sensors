import time

try:
    from .config import LINE_POSITION, MARGIN, TRACK_STATE_TTL
except ImportError:
    from config import LINE_POSITION, MARGIN, TRACK_STATE_TTL


# Per-track state instead of module-level globals so multiple objects
# in frame at once don't corrupt each other's crossing detection.
# Shape: { track_id: {"zone": "left"|"right"|None, "crossed": bool, "ts": float} }
_track_states = {}


def _zone_for(center_x):
    if center_x < LINE_POSITION - MARGIN:
        return "left"
    if center_x > LINE_POSITION + MARGIN:
        return "right"
    return "middle"


def _prune_stale(now):
    """Drop track IDs we haven't seen in TRACK_STATE_TTL seconds."""
    stale = [tid for tid, s in _track_states.items()
             if now - s["ts"] > TRACK_STATE_TTL]
    for tid in stale:
        _track_states.pop(tid, None)


def update_direction(track_id, center_x):
    """
    Returns "IN", "OUT", or None.

    Each track_id gets its own zone-state machine:
      None -> left/right (object enters frame on one side)
      left/right -> middle (object reaches the line, "crossed" latches)
      left + crossed -> right => IN
      right + crossed -> left => OUT
    """
    if track_id is None or track_id == 0:
        # Tracker didn't assign a stable ID; skip rather than corrupt
        # shared state by lumping unrelated detections together.
        return None

    now = time.monotonic()
    _prune_stale(now)

    current_zone = _zone_for(center_x)
    state = _track_states.get(track_id, {"zone": None, "crossed": False, "ts": now})
    state["ts"] = now

    direction = None

    if state["zone"] is None and current_zone in ("left", "right"):
        state["zone"] = current_zone
        state["crossed"] = False

    elif state["zone"] in ("left", "right") and current_zone == "middle":
        state["crossed"] = True

    elif state["zone"] == "left" and state["crossed"] and current_zone == "right":
        direction = "IN"
        _track_states.pop(track_id, None)
        print(f"IN  | track_id={track_id}")
        return direction

    elif state["zone"] == "right" and state["crossed"] and current_zone == "left":
        direction = "OUT"
        _track_states.pop(track_id, None)
        print(f"OUT | track_id={track_id}")
        return direction

    _track_states[track_id] = state
    return direction


def active_track_count():
    """For the on-screen overlay: how many objects are mid-crossing right now."""
    return len(_track_states)
