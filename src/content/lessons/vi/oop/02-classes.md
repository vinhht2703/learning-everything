---
id: classes
section: NỀN TẢNG
title: Lớp và đối tượng
summary: Tạo mô hình động vật đơn giản
duration: 8 phút
description: Dùng ví dụ động vật quen thuộc để thấy lớp định nghĩa cấu trúc chung còn đối tượng lưu dữ liệu riêng.
goal: Tạo các đối tượng động vật khác nhau, đặt tên cho từng con và gọi phương thức dùng chung.
takeaways:
  - label: Lớp
    text: Bản định nghĩa cho dữ liệu và hành vi dùng chung.
  - label: Thể hiện
    text: Một đối tượng cụ thể được tạo từ một lớp.
  - label: Phương thức
    text: Một hàm thuộc về lớp của đối tượng.
code:
  file: animals.py
  lang: python
  source: |-
    class Animal:
        def __init__(self, name):
            self.name = name

        def speak(self):
            return "..."

    class Dog(Animal):
        def speak(self):
            return "Woof!"

    class Cat(Animal):
        def speak(self):
            return "Meow!"

    pets = [Dog("Milo"), Cat("Nori")]
    for pet in pets:
        print(f"{pet.name}: {pet.speak()}")
  output: |-
    Milo: Woof!
    Nori: Meow!
  variants:
    - lang: javascript
      file: animals.js
      source: |-
        class Animal {
          constructor(name) {
            this.name = name;
          }
          speak() {
            return "...";
          }
        }

        class Dog extends Animal {
          speak() {
            return "Woof!";
          }
        }

        class Cat extends Animal {
          speak() {
            return "Meow!";
          }
        }

        const pets = [new Dog("Milo"), new Cat("Nori")];
        for (const pet of pets) {
          console.log(`${pet.name}: ${pet.speak()}`);
        }
      output: |-
        Milo: Woof!
        Nori: Meow!
    - lang: cpp
      file: animals.cpp
      source: |-
        #include <iostream>
        #include <memory>
        #include <string>
        #include <vector>
        using namespace std;

        class Animal {
        public:
            string name;
            Animal(string name) : name(name) {}
            virtual ~Animal() = default;
            virtual string speak() { return "..."; }
        };

        class Dog : public Animal {
        public:
            using Animal::Animal;
            string speak() override { return "Woof!"; }
        };

        class Cat : public Animal {
        public:
            using Animal::Animal;
            string speak() override { return "Meow!"; }
        };

        int main() {
            vector<unique_ptr<Animal>> pets;
            pets.push_back(make_unique<Dog>("Milo"));
            pets.push_back(make_unique<Cat>("Nori"));
            for (auto& pet : pets) {
                cout << pet->name << ": " << pet->speak() << endl;
            }
        }
      output: |-
        Milo: Woof!
        Nori: Meow!
order: 2
---
