# region imports
import os
os.environ["GST_PLUGIN_FEATURE_RANK"] = "vaapidecodebin:NONE"

import gi
gi.require_version("Gst", "1.0")
import cv2

import hailo
from gi.repository import Gst

from hailo_apps.python.pipeline_apps.detection.detection_pipeline import GStreamerDetectionApp
from hailo_apps.python.core.common.buffer_utils import (
    get_caps_from_pad,
    get_numpy_from_buffer,
)

from hailo_apps.python.core.common.hailo_logger import get_logger
from hailo_apps.python.core.gstreamer.gstreamer_app import app_callback_class

try:
    from .config import DETECTION_LABEL
    from .direction_logic import update_direction, active_track_count
    from .tracker import get_bbox_x_positions, get_center_x, get_track_id
    from .backend_post import post_event
except ImportError:
    from config import DETECTION_LABEL
    from direction_logic import update_direction, active_track_count
    from tracker import get_bbox_x_positions, get_center_x, get_track_id
    from backend_post import post_event

hailo_logger = get_logger(__name__)
# endregion imports


class user_app_callback_class(app_callback_class):
    def __init__(self):
        super().__init__()
        self.new_variable = 42

    def new_function(self):
        return "The meaning of life is: "


def app_callback(element, buffer, user_data):
    if buffer is None:
        return

    pad = element.get_static_pad("src")
    format, width, height = get_caps_from_pad(pad)

    frame = None
    if user_data.use_frame and format and width and height:
        frame = get_numpy_from_buffer(buffer, format, width, height)

    roi = hailo.get_roi_from_buffer(buffer)
    detections = roi.get_objects_typed(hailo.HAILO_DETECTION)

    detection_count = 0

    for detection in detections:
        label = detection.get_label()

        if label == DETECTION_LABEL:
            track_id = get_track_id(detection)
            x1, x2 = get_bbox_x_positions(detection)
            center_x = get_center_x(x1, x2)

            direction = update_direction(track_id, center_x)

            if direction is not None:
                post_event(direction, track_id)

            detection_count += 1

    if user_data.use_frame and frame is not None:
        cv2.putText(frame, f"Detections: {detection_count}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Local debug overlay only — the real garage count lives on the backend.
        cv2.putText(frame, f"Active tracks: {active_track_count()}", (10, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        user_data.set_frame(frame)


def main():
    hailo_logger.info("Starting Detection App.")
    user_data = user_app_callback_class()
    app = GStreamerDetectionApp(app_callback, user_data)
    app.run()


if __name__ == "__main__":
    main()
