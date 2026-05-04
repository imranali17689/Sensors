try:
    from .config import LINE_POSITION, MARGIN
except ImportError:
    from config import LINE_POSITION, MARGIN

count = 0
zone_state = None
crossed = False


def update_direction(track_id, center_x):
    global count, zone_state, crossed

    if center_x < LINE_POSITION - MARGIN:
        current_zone = "left"
    elif center_x > LINE_POSITION + MARGIN:
        current_zone = "right"
    else:
        current_zone = "middle"

    if zone_state is None and current_zone == "left":
        zone_state = "left"
        crossed = False

    elif zone_state is None and current_zone == "right":
        zone_state = "right"
        crossed = False

    elif zone_state == "left" and current_zone == "middle":
        crossed = True

    elif zone_state == "right" and current_zone == "middle":
        crossed = True

    elif zone_state == "left" and crossed and current_zone == "right":
        count += 1
        print(f"IN (+1) | Count: {count}")
        zone_state = None
        crossed = False
        return "IN"

    elif zone_state == "right" and crossed and current_zone == "left":
        count -= 1
        print(f"OUT (-1) | Count: {count}")
        zone_state = None
        crossed = False
        return "OUT"

    return None


def get_count():
    return count


def active_track_count():
    return 1 if zone_state else 0
