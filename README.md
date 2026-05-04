[Unit]
Description=OpenSpot
After=network.target

[Service]
User=capstone
WorkingDirectory=/home/capstone/OpenSpot
ExecStart=/bin/bash -lc 'source /home/capstone/hailo-apps/venv_hailo_apps/bin/activate && cd /home/capstone/OpenSpot && python -m src.main --input rpi'
Restart=always
RestartSec=5
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
