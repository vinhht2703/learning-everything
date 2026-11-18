---
id: overview
section: FOUNDATIONS
title: OOP overview
summary: Objects, state, and behavior
duration: 5 min
description: Object-oriented programming organizes code around objects that combine state with behavior.
goal: Recognize an object’s data (attributes), its actions (methods), and the class that defines both.
takeaways:
  - label: Object
    text: A value with its own state and behavior.
  - label: Attribute
    text: Data stored on an object, such as color.
  - label: Method
    text: An action defined on a class.
code:
  file: overview.py
  lang: python
  source: |-
    class Lamp:
        def __init__(self, color):
            self.color = color
            self.is_on = False

        def switch_on(self):
            self.is_on = True
            return f"{self.color} lamp is on"

    desk_lamp = Lamp("blue")
    print(desk_lamp.switch_on())
  output: blue lamp is on
  variants:
    - lang: javascript
      file: overview.js
      source: |-
        class Lamp {
          constructor(color) {
            this.color = color;
            this.isOn = false;
          }

          switchOn() {
            this.isOn = true;
            return `${this.color} lamp is on`;
          }
        }

        const deskLamp = new Lamp("blue");
        console.log(deskLamp.switchOn());
      output: blue lamp is on
    - lang: cpp
      file: overview.cpp
      source: |-
        #include <iostream>
        #include <string>
        using namespace std;

        class Lamp {
        public:
            string color;
            bool isOn = false;

            Lamp(string color) : color(color) {}

            string switchOn() {
                isOn = true;
                return color + " lamp is on";
            }
        };

        int main() {
            Lamp deskLamp("blue");
            cout << deskLamp.switchOn() << endl;
        }
      output: blue lamp is on
order: 1
---
