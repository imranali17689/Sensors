BACKEND_URL = "https://openspot-backend-a433.onrender.com/event"
DEVICE_NAME = "garagecam-rpi"
ENABLE_POSTS = True
POST_TIMEOUT = 60

FRAME_WIDTH = 640
LINE_POSITION = 320
MARGIN = 20

# What the camera looks for. Set to "person" for walk-testing,
# change to "car" when mounted in the garage.
DETECTION_LABEL = "person"

# How long (seconds) to keep state for a track_id we haven't seen.
# Prevents the per-track state dict from growing forever.
TRACK_STATE_TTL = 30
