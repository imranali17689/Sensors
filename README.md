@reboot sleep 30 && /bin/bash -lc 'source /home/capstone/hailo-apps/venv_hailo_apps/bin/activate && cd /home/capstone/OpenSpot && python -m src.main --input rpi' >> /home/capstone/openspot.log 2>&1
@reboot sleep 30 && /bin/bash -lc 'source /home/capstone/hailo-apps/venv_hailo_apps/bin/activate && python /home/capstone/OpenSpot/src/temperature_monitor.py' >> /home/capstone/temperature.log 2>&1
