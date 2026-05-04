arageCam:~ $ journalctl -u openspot.service -n 30 --no-pager
May 03 23:13:30 GarageCam systemd[1]: Started openspot.service - OpenSpot.
May 03 23:13:33 GarageCam bash[1342]: INFO | common.core | All required environment variables loaded successfully.
May 03 23:13:33 GarageCam bash[1342]: INFO | common.core | Using default model: yolov8s
May 03 23:13:33 GarageCam bash[1342]: INFO | common.core | Found HEF in resources: /usr/local/hailo/resources/models/hailo8l/yolov8s.hef
May 03 23:13:33 GarageCam bash[1342]: INFO | detection.detection_pipeline | Resources | hef=/usr/local/hailo/resources/models/hailo8l/yolov8s.hef | post_so=/usr/local/hailo/resources/so/libyolo_hailortpp_postprocess.so | post_fn=filter_letterbox | labels_json=None
May 03 23:13:37 GarageCam bash[1342]: WARNING | gstreamer.gstreamer_app | hailo_display not found in pipeline
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.364705620] [1643]  INFO Camera camera_manager.cpp:340 libcamera v0.7.0+rpt20260205
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.378068749] [1658]  INFO RPI pisp.cpp:720 libpisp version 1.3.0
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.407507434] [1658]  WARN CameraSensorProperties camera_sensor_properties.cpp:548 No static properties available for 'imx708_noir'
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.407532657] [1658]  WARN CameraSensorProperties camera_sensor_properties.cpp:550 Please consider updating the camera sensor properties database
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.787597416] [1658]  INFO IPAProxy ipa_proxy.cpp:180 Using tuning file /usr/share/libcamera/ipa/rpi/pisp/imx708_noir.json
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.799838730] [1658]  WARN CameraSensor camera_sensor_legacy.cpp:502 'imx708_noir': No sensor delays found in static properties. Assuming unverified defaults.
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.800382638] [1658]  INFO Camera camera_manager.cpp:223 Adding camera '/base/axi/pcie@1000120000/rp1/i2c@80000/imx708@1a' for pipeline handler rpi/pisp
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.800406267] [1658]  INFO RPI pisp.cpp:1181 Registered camera /base/axi/pcie@1000120000/rp1/i2c@80000/imx708@1a to CFE device /dev/media0 and ISP device /dev/media2 using PiSP variant BCM2712_C0
May 03 23:13:37 GarageCam bash[1342]: INFO | picamera2.picamera2 | Initialization successful.
May 03 23:13:37 GarageCam bash[1342]: INFO | picamera2.picamera2 | Camera now open.
May 03 23:13:37 GarageCam bash[1342]: INFO | picamera2.picamera2 | Camera configuration has been adjusted!
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.810213230] [1643]  INFO Camera camera.cpp:1215 configuring streams: (0) 1280x720-RGB888/sRGB (1) 1536x864-BGGR_PISP_COMP1/RAW
May 03 23:13:37 GarageCam bash[1342]: [0:00:15.810585360] [1658]  INFO RPI pisp.cpp:1485 Sensor: /base/axi/pcie@1000120000/rp1/i2c@80000/imx708@1a - Selected sensor format: 1536x864-SBGGR10_1X10/RAW - Selected CFE format: 1536x864-PC1B/RAW
May 03 23:13:37 GarageCam bash[1342]: INFO | picamera2.picamera2 | Configuration successful!
May 03 23:13:37 GarageCam bash[1342]: INFO | picamera2.picamera2 | Camera started
May 03 23:13:37 GarageCam bash[1342]: INFO | gstreamer.gstreamer_app | picamera_process started
capstone@GarageCam:~ $ 

