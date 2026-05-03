capstone@GarageCam:~/hailo-apps/hailo_apps/python/pipeline_apps/detection $ sudo systemctl restart openspot.service
capstone@GarageCam:~/hailo-apps/hailo_apps/python/pipeline_apps/detection $ journalctl -u openspot.service -f
May 03 14:10:27 GarageCam bash[2423]: [0:08:31.277671886] [2453]  INFO RPI pisp.cpp:720 libpisp version 1.3.0
May 03 14:10:27 GarageCam bash[2423]: [0:08:31.278487021] [2453] ERROR V4L2 v4l2_device.cpp:411 'imx708_noir': Unable to set controls: Device or resource busy
May 03 14:10:27 GarageCam bash[2423]: [0:08:31.278826653] [2453]  WARN CameraSensorProperties camera_sensor_properties.cpp:548 No static properties available for 'imx708_noir'
May 03 14:10:27 GarageCam bash[2423]: [0:08:31.278836838] [2453]  WARN CameraSensorProperties camera_sensor_properties.cpp:550 Please consider updating the camera sensor properties database
May 03 14:10:27 GarageCam bash[2423]: [0:08:31.295628455] [2453]  INFO IPAProxy ipa_proxy.cpp:180 Using tuning file /usr/share/libcamera/ipa/rpi/pisp/imx708_noir.json
May 03 14:10:27 GarageCam bash[2423]: [0:08:31.306070249] [2453]  WARN CameraSensor camera_sensor_legacy.cpp:502 'imx708_noir': No sensor delays found in static properties. Assuming unverified defaults.
May 03 14:10:27 GarageCam bash[2423]: [0:08:31.306685957] [2453]  INFO Camera camera_manager.cpp:223 Adding camera '/base/axi/pcie@1000120000/rp1/i2c@80000/imx708@1a' for pipeline handler rpi/pisp
May 03 14:10:27 GarageCam bash[2423]: [0:08:31.306705439] [2453]  INFO RPI pisp.cpp:1181 Registered camera /base/axi/pcie@1000120000/rp1/i2c@80000/imx708@1a to CFE device /dev/media0 and ISP device /dev/media1 using PiSP variant BCM2712_C0
May 03 14:10:27 GarageCam systemd[1]: openspot.service: Main process exited, code=killed, status=11/SEGV
May 03 14:10:27 GarageCam systemd[1]: openspot.service: Failed with result 'signal'.
May 03 14:10:32 GarageCam systemd[1]: openspot.service: Scheduled restart job, restart counter is at 3.
May 03 14:10:32 GarageCam systemd[1]: Started openspot.service - OpenSpot.
May 03 14:10:33 GarageCam bash[2468]: INFO | common.core | All required environment variables loaded successfully.
May 03 14:10:33 GarageCam bash[2468]: INFO | common.core | Using default model: yolov8s
May 03 14:10:33 GarageCam bash[2468]: INFO | common.core | Found HEF in resources: /usr/local/hailo/resources/models/hailo8l/yolov8s.hef
May 03 14:10:33 GarageCam bash[2468]: INFO | detection.detection_pipeline | Resources | hef=/usr/local/hailo/resources/models/hailo8l/yolov8s.hef | post_so=/usr/local/hailo/resources/so/libyolo_hailortpp_postprocess.so | post_fn=filter_letterbox | labels_json=None
May 03 14:10:33 GarageCam bash[2468]: [HailoRT] [error] CHECK failed - Failed to create vdevice. there are not enough free devices. requested: 1, found: 0
May 03 14:10:33 GarageCam bash[2468]: [HailoRT] [error] CHECK_SUCCESS failed with status=HAILO_OUT_OF_PHYSICAL_DEVICES(74)
May 03 14:10:33 GarageCam bash[2468]: [HailoRT] [error] CHECK_SUCCESS failed with status=HAILO_OUT_OF_PHYSICAL_DEVICES(74)
May 03 14:10:33 GarageCam bash[2468]: [HailoRT] [error] CHECK_SUCCESS failed with status=HAILO_OUT_OF_PHYSICAL_DEVICES(74)
May 03 14:10:33 GarageCam bash[2468]: [HailoRT] [error] CHECK_SUCCESS failed with status=HAILO_OUT_OF_PHYSICAL_DEVICES(74)
May 03 14:10:33 GarageCam bash[2468]: CHECK_EXPECTED failed with status=74
May 03 14:10:33 GarageCam bash[2468]: WARNING | gstreamer.gstreamer_app | hailo_display not found in pipeline
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.361032494] [2492]  INFO Camera camera_manager.cpp:340 libcamera v0.7.0+rpt20260205
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.379395710] [2504]  INFO RPI pisp.cpp:720 libpisp version 1.3.0
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.380292459] [2504] ERROR V4L2 v4l2_device.cpp:411 'imx708_noir': Unable to set controls: Device or resource busy
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.380613894] [2504]  WARN CameraSensorProperties camera_sensor_properties.cpp:548 No static properties available for 'imx708_noir'
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.380621264] [2504]  WARN CameraSensorProperties camera_sensor_properties.cpp:550 Please consider updating the camera sensor properties database
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.394281832] [2504]  INFO IPAProxy ipa_proxy.cpp:180 Using tuning file /usr/share/libcamera/ipa/rpi/pisp/imx708_noir.json
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.401693301] [2504]  WARN CameraSensor camera_sensor_legacy.cpp:502 'imx708_noir': No sensor delays found in static properties. Assuming unverified defaults.
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.402118121] [2504]  INFO Camera camera_manager.cpp:223 Adding camera '/base/axi/pcie@1000120000/rp1/i2c@80000/imx708@1a' for pipeline handler rpi/pisp
May 03 14:10:33 GarageCam bash[2468]: [0:08:37.402129140] [2504]  INFO RPI pisp.cpp:1181 Registered camera /base/axi/pcie@1000120000/rp1/i2c@80000/imx708@1a to CFE device /dev/media0 and ISP device /dev/media1 using PiSP variant BCM2712_C0
May 03 14:10:33 GarageCam systemd[1]: openspot.service: Main process exited, code=killed, status=11/SEGV
May 03 14:10:33 GarageCam systemd[1]: openspot.service: Failed with result 'signal'.
