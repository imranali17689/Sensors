# region imports
# Standard library imports
import os
os.environ["GST_PLUGIN_FEATURE_RANK"] = "vaapidecodebin:NONE"

# Third-party imports
import gi

gi.require_version("Gst", "1.0")
import cv2

# Local application-specific imports
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
    from .config import PERSON_LABEL
    from .direction_logic import update_direction, get_count
    from .tracker import get_bbox_x_positions, get_center_x, get_track_id
    from .backend_post import post_event
except ImportError:
    from config import PERSON_LABEL
    from direction_logic import update_direction, get_count
    from tracker import get_bbox_x_positions, get_center_x, get_track_id
    from backend_post import post_event

hailo_logger = get_logger(__name__)
# endregion imports


# -----------------------------------------------------------------------------------------------
# User-defined class to be used in the callback function
# -----------------------------------------------------------------------------------------------
class user_app_callback_class(app_callback_class):
    def __init__(self):
        super().__init__()
        self.new_variable = 42

    def new_function(self):
        return "The meaning of life is: "


# -----------------------------------------------------------------------------------------------
# User-defined callback function
# -----------------------------------------------------------------------------------------------
def app_callback(element, buffer, user_data):
    if buffer is None:
        hailo_logger.warning("Received None buffer.")
        return

    frame_idx = user_data.get_count()

    pad = element.get_static_pad("src")
    format, width, height = get_caps_from_pad(pad)

    frame = None
    if user_data.use_frame and format is not None and width is not None and height is not None:
        frame = get_numpy_from_buffer(buffer, format, width, height)

    roi = hailo.get_roi_from_buffer(buffer)
    detections = roi.get_objects_typed(hailo.HAILO_DETECTION)

    detection_count = 0

    for detection in detections:
        label = detection.get_label()
        confidence = detection.get_confidence()

        print(f"label={label}, confidence={confidence}")

        if label != PERSON_LABEL:
            continue

        track_id = get_track_id(detection)
        print(f"track_id={track_id}")

        x1, x2 = get_bbox_x_positions(detection)
        center_x = get_center_x(x1, x2)
        print(f"center_x={center_x}")

        if not hasattr(user_data, "posted_tracks"):
            user_data.posted_tracks = set()

        if track_id not in user_data.posted_tracks:
            user_data.posted_tracks.add(track_id)
            print(f"DEMO EVENT -> detected person, sending as car, direction=IN, track_id={track_id}")
            post_event(
                direction="IN",
                track_id=track_id,
                object_type="car",
                confidence=confidence,
            )

        detection_count += 1

    # for detection in detections:
    #     label = detection.get_label()
    #     confidence = detection.get_confidence()

    #     print(f"label={label}, confidence={confidence}")

    #     # if label != "car":
    #     #     continue

    #     if label != PERSON_LABEL:
    #         continue

    #     track_id = get_track_id(detection)

    #     print(f"track_id={track_id}")

    #     x1, x2 = get_bbox_x_positions(detection)
    #     center_x = get_center_x(x1, x2)

    #     print(f"center_x={center_x}")

    #     direction, count = update_direction(center_x, track_id)

    #     print(f"direction={direction}, count={count}")

    #     if direction is not None:
    #         print(f"DEMO EVENT -> detected person, sending as car, direction={direction}, track_id={track_id}")
    #         post_event(
    #             direction=direction,
    #             track_id=track_id,
    #             object_type="car",   # pretend person is a car
    #             confidence=confidence,
    #         )

    #     detection_count += 1

        # if label == PERSON_LABEL:
        #     x1, x2 = get_bbox_x_positions(detection)
        #     center_x = get_center_x(x1, x2)

        #     direction, count = update_direction(center_x, track_id)

        #     track_id = get_track_id(detection)

        #     if direction is not None:
        #         post_event(
        #             direction=direction,
        #             track_id=track_id,
        #             object_type=label,
        #             confidence=confidence,
        #         )

        #     detection_count += 1

    if user_data.use_frame:
        cv2.putText(
            frame,
            f"Detections: {detection_count}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )
        cv2.putText(
            frame,
            f"{user_data.new_function()} {user_data.new_variable}",
            (10, 60),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )
        cv2.putText(
            frame,
            f"Count: {get_count()}",
            (10, 90),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 255),
            2,
        )

        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        user_data.set_frame(frame)

    return


def main():
    hailo_logger.info("Starting Detection App.")
    user_data = user_app_callback_class()
    app = GStreamerDetectionApp(app_callback, user_data)
    app.run()


if __name__ == "__main__":
    main()



# # region imports
# # Standard library imports
# import os
# os.environ["GST_PLUGIN_FEATURE_RANK"] = "vaapidecodebin:NONE"
# 
# # Third-party imports
# import gi
# 
# gi.require_version("Gst", "1.0")
# import cv2
# 
# # Local application-specific imports
# import hailo
# from gi.repository import Gst
# 
# from hailo_apps.python.pipeline_apps.detection.detection_pipeline import GStreamerDetectionApp
# from hailo_apps.python.core.common.buffer_utils import (
#     get_caps_from_pad,
#     get_numpy_from_buffer,
# )
# 
# from hailo_apps.python.core.common.hailo_logger import get_logger
# from hailo_apps.python.core.gstreamer.gstreamer_app import app_callback_class
# 
# hailo_logger = get_logger(__name__)
# # endregion imports
# 
# #Detection Varaibles
# prev_x = None
# count = 0
# 
# line_position = 320
# margin = 60
# 
# zone_state = None
# crossed = False
# 
# 
# # -----------------------------------------------------------------------------------------------
# # User-defined class to be used in the callback function
# # -----------------------------------------------------------------------------------------------
# class user_app_callback_class(app_callback_class):
#     def __init__(self):
#         super().__init__()
#         self.new_variable = 42
# 
#     def new_function(self):
#         return "The meaning of life is: "
# 
# 
# # -----------------------------------------------------------------------------------------------
# # User-defined callback function
# # -----------------------------------------------------------------------------------------------
# 
# 
# def app_callback(element, buffer, user_data):
#     if buffer is None:
#         hailo_logger.warning("Received None buffer.")
#         return
# 
#     # Note: Frame counting is handled automatically by the framework wrapper
#     frame_idx = user_data.get_count()
#     #string_to_print = f"Frame count: {user_data.get_count()}\n"
# 
#     pad = element.get_static_pad("src")
#     format, width, height = get_caps_from_pad(pad)
# 
#     frame = None
#     if user_data.use_frame and format is not None and width is not None and height is not None:
#         frame = get_numpy_from_buffer(buffer, format, width, height)
# 
#     roi = hailo.get_roi_from_buffer(buffer)
#     detections = roi.get_objects_typed(hailo.HAILO_DETECTION)
# 
#     detection_count = 0
#     for detection in detections:
#         label = detection.get_label()
#         confidence = detection.get_confidence()
#         if label == "person":
#             bbox = detection.get_bbox()
#             frame_width = 640
#             x1 = int(bbox.xmin() * frame_width)
#             x2 = int(bbox.xmax() * frame_width)
#             
#             #center of bounding Box
#             center_x = int((x1+x2) /2)
#             
#             global count, zone_state, crossed
#             
#             if center_x < line_position - margin:
#                 current_zone ="left"
#             elif center_x > line_position + margin:
#                 current_zone = "right"
#             else:
#                 current_zone = "middle"
#                 
#             if zone_state is None and current_zone == "left":
#                 zone_state = "left"
#                 crossed = False
#                 
#             elif zone_state  is None and current_zone == "right":
#                 zone_state = "right"
#                 crossed = False
#                 
#             elif zone_state == "left" and current_zone == "middle":
#                 crossed = True
#              
#             elif zone_state == "right" and current_zone == "middle":
#                 crossed = True
#                 
#             elif zone_state == "left" and crossed and current_zone == "right":
#                     count += 1
#                     print(f"In (+1) | Count: {count}")
#                     zone_state = None
#                     crossed = False
#                     
#             elif zone_state == "right" and crossed and current_zone == "left":
#                     count -= 1
#                     print(f"OUT (-1) | Count: {count}")
#                     zone_state = None
#                     crossed = False
#                     
#                 
#             # Get track ID
#             track_id = 0
#             track = detection.get_objects_typed(hailo.HAILO_UNIQUE_ID)
#             if len(track) == 1:
#                 track_id = track[0].get_id()
#             #string_to_print += (
#               #  f"Detection: ID: {track_id} Label: {label} Confidence: {confidence:.2f}\n"
#             #)
#             detection_count += 1
#     if user_data.use_frame:
#         cv2.putText(
#             frame,
#             f"Detections: {detection_count}",
#             (10, 30),
#             cv2.FONT_HERSHEY_SIMPLEX,
#             1,
#             (0, 255, 0),
#             2,
#         )
#         cv2.putText(
#             frame,
#             f"{user_data.new_function()} {user_data.new_variable}",
#             (10, 60),
#             cv2.FONT_HERSHEY_SIMPLEX,
#             1,
#             (0, 255, 0),
#             2,
#         )
#         frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
#         user_data.set_frame(frame)
# 
#     #print(string_to_print)
#     return
# 
# 
# def main():
#     hailo_logger.info("Starting Detection App.")
#     user_data = user_app_callback_class()
#     app = GStreamerDetectionApp(app_callback, user_data)
#     app.run()
# 
# 
# if __name__ == "__main__":
#     main()
# 
# 