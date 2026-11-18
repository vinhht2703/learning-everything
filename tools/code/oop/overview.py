class Lamp:
    def __init__(self, color):
        self.color = color
        self.is_on = False

    def switch_on(self):
        self.is_on = True
        return f"{self.color} lamp is on"

desk_lamp = Lamp("blue")
print(desk_lamp.switch_on())
