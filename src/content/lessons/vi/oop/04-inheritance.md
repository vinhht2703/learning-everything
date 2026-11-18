---
id: inheritance
section: NGUYÊN LÝ CỐT LÕI
title: Tính kế thừa
summary: Tái sử dụng hành vi chung
duration: 7 phút
description: Tạo lớp chuyên biệt bằng cách mở rộng lớp cơ sở có hành vi dùng chung.
goal: Tìm hiểu cách Dog kế thừa phần thiết lập tên từ Animal rồi bổ sung hành vi riêng.
takeaways:
  - label: Lớp cơ sở
    text: Animal chứa hành vi được các lớp con dùng chung.
  - label: Lớp con
    text: Dog mở rộng Animal bằng fetch().
  - label: Tái sử dụng
    text: Dog nhận __init__() mà không cần định nghĩa lại.
code:
  file: animals.py
  lang: python
  source: |-
    class Animal:
        def __init__(self, name):
            self.name = name

        def describe(self):
            return f"{self.name} is an animal"

    class Dog(Animal):
        def fetch(self):
            return f"{self.name} brings back the ball"

    pet = Dog("Milo")
    print(pet.describe())
    print(pet.fetch())
  output: |-
    Milo is an animal
    Milo brings back the ball
  variants:
    - lang: javascript
      file: animals.js
      source: |-
        class Animal {
          constructor(name) {
            this.name = name;
          }
          describe() {
            return `${this.name} is an animal`;
          }
        }

        class Dog extends Animal {
          fetch() {
            return `${this.name} brings back the ball`;
          }
        }

        const pet = new Dog("Milo");
        console.log(pet.describe());
        console.log(pet.fetch());
      output: |-
        Milo is an animal
        Milo brings back the ball
    - lang: cpp
      file: animals.cpp
      source: |-
        #include <iostream>
        #include <string>
        using namespace std;

        class Animal {
        public:
            string name;
            Animal(string name) : name(name) {}
            string describe() { return name + " is an animal"; }
        };

        class Dog : public Animal {
        public:
            using Animal::Animal;  // reuse the Animal constructor
            string fetch() { return name + " brings back the ball"; }
        };

        int main() {
            Dog pet("Milo");
            cout << pet.describe() << endl;
            cout << pet.fetch() << endl;
        }
      output: |-
        Milo is an animal
        Milo brings back the ball
order: 4
---
