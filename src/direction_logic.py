try:
    from .config import LINE_POSITION, MARGIN
except ImportError:
    from config import LINE_POSITION, MARGIN

count = 0
zone_state = {}
crossed = {}

def update_direction(center_x, track_id):
    global count, zone_state, crossed

    
    if center_x < LINE_POSITION - MARGIN:
        current_zone = "left"
    elif center_x > LINE_POSITION + MARGIN:
        current_zone = "right"
    else:
        current_zone = "middle"

    
    if track_id not in zone_state:
        zone_state[track_id] = current_zone
        crossed[track_id] = False
        return None, count

    prev_zone = zone_state[track_id]

    
    if prev_zone in ["left", "right"] and current_zone == "middle":
        crossed[track_id] = True

    
    elif prev_zone == "left" and crossed[track_id] and current_zone == "right":
        count += 1
        print(f"IN (+1) | Count: {count}")
        zone_state.pop(track_id)
        crossed.pop(track_id)
        return "IN", count

    
    elif prev_zone == "right" and crossed[track_id] and current_zone == "left":
        count -= 1
        print(f"OUT (-1) | Count: {count}")
        zone_state.pop(track_id)
        crossed.pop(track_id)
        return "OUT", count

    
    zone_state[track_id] = current_zone

    return None, count


def get_count():
    return count

# def update_direction(center_x):
#     global count, zone_state, crossed

#     if center_x < LINE_POSITION - MARGIN:
#         current_zone = "left"
#     elif center_x > LINE_POSITION + MARGIN:
#         current_zone = "right"
#     else:
#         current_zone = "middle"

#     if zone_state is None and current_zone == "left":
#         zone_state = "left"
#         crossed = False

#     elif zone_state is None and current_zone == "right":
#         zone_state = "right"
#         crossed = False

#     elif zone_state == "left" and current_zone == "middle":
#         crossed = True

#     elif zone_state == "right" and current_zone == "middle":
#         crossed = True

#     elif zone_state == "left" and crossed and current_zone == "right":
#         count += 1
#         print(f"IN (+1) | Count: {count}")
#         zone_state = None
#         crossed = False
#         return "IN", count

#     elif zone_state == "right" and crossed and current_zone == "left":
#         count -= 1
#         print(f"OUT (-1) | Count: {count}")
#         zone_state = None
#         crossed = False
#         return "OUT", count

    
#     return None, count


# def get_count():
#     return count