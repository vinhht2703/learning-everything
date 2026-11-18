---
id: overview
section: NỀN TẢNG
title: Tổng quan OOP
summary: Đối tượng, trạng thái và hành vi
duration: 5 phút
description: Lập trình hướng đối tượng tổ chức mã xoay quanh các đối tượng kết hợp trạng thái với hành vi.
goal: Nhận biết dữ liệu của đối tượng (thuộc tính), hành động (phương thức) và lớp định nghĩa cả hai.
takeaways:
  - label: Đối tượng
    text: Một giá trị có trạng thái và hành vi riêng.
  - label: Thuộc tính
    text: Dữ liệu được lưu trên một đối tượng, chẳng hạn như màu sắc.
  - label: Phương thức
    text: Một hành động được định nghĩa trong lớp.
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
