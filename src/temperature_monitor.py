import subprocess
import time
import requests
from datetime import datetime

BACKEND_URL = "https://openspot-backend-a433.onrender.com/temperature"
DEVICE_NAME = "garagecam-rpi"


def get_cpu_temp():
    try:
        output = subprocess.check_output(["vcgencmd", "measure_temp"]).decode()
        temp_str = output.replace("temp=", "").replace("'C\n", "")
        return float(temp_str)
    except Exception:
        return None


def send_temp():
    temp = get_cpu_temp()

    if temp is None:
        print("Failed to read temp")
        return

    data = {
        "name": DEVICE_NAME,
        "temperature": temp,
        "timestamp": datetime.utcnow().isoformat(),
    }

    try:
        res = requests.post(BACKEND_URL, json=data, timeout=10)
        print("Sent:", data, "Status:", res.status_code)
    except Exception as e:
        print("Error sending:", e)


def main():
    # Initial burst of 3 readings so we know the service started OK on boot.
    for _ in range(3):
        send_temp()
        time.sleep(5)

    # Then once per hour forever.
    while True:
        send_temp()
        time.sleep(3600)


if __name__ == "__main__":
    main()
