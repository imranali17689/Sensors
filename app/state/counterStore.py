
current_count = 0
capacity = 150


def applyEvent(event):
    global current_count

    
    if event.object_type != "car":
        return getStatus()

  
    if event.direction == "IN":
        current_count = min(capacity, current_count + 1)
    elif event.direction == "OUT":
        current_count = max(0, current_count - 1)

    return getStatus()
    


def getStatus():
  return {
    "occupied": current_count,
    "available": capacity - current_count,
    "capacity": capacity
  }
  