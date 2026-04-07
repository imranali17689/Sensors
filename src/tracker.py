import hailo

try:
    from .config import FRAME_WIDTH
except ImportError:
    from config import FRAME_WIDTH


def get_bbox_x_positions(detection):
    bbox = detection.get_bbox()
    x1 = int(bbox.xmin() * FRAME_WIDTH)
    x2 = int(bbox.xmax() * FRAME_WIDTH)
    return x1, x2


def get_center_x(x1, x2):
    return int((x1 + x2) / 2)


def get_track_id(detection):
    track_id = 0
    track = detection.get_objects_typed(hailo.HAILO_UNIQUE_ID)
    if len(track) == 1:
        track_id = track[0].get_id()
    return track_id