---
id: polymorphism
section: NGUYÊN LÝ CỐT LÕI
title: Tính đa hình
summary: Một giao diện, nhiều cách thể hiện
duration: 7 phút
description: Dùng cùng một lời gọi phương thức cho nhiều kiểu, trong khi mỗi kiểu cung cấp hành vi phù hợp.
goal: Gọi speak() trên danh sách động vật và quan sát các cách triển khai khác nhau.
takeaways:
  - label: Giao diện chung
    text: Mỗi kiểu đều cung cấp speak().
  - label: Hành vi khác nhau
    text: Phương thức trả về kết quả riêng cho từng kiểu.
  - label: Nơi gọi linh hoạt
    text: Vòng lặp không cần kiểm tra theo từng kiểu.
code:
  file: shelter.py
  lang: python
  source: |-
    class Dog:
        def speak(self):
            return "Woof!"

    class Cat:
        def speak(self):
            return "Meow!"

    class Bird:
        def speak(self):
            return "Tweet!"

    for animal in [Dog(), Cat(), Bird()]:
        print(animal.speak())
  output: |-
    Woof!
    Meow!
    Tweet!
  variants:
    - lang: javascript
      file: shelter.js
      source: |-
        class Dog {
          speak() { return "Woof!"; }
        }

        class Cat {
          speak() { return "Meow!"; }
        }

        class Bird {
          speak() { return "Tweet!"; }
        }

        for (const animal of [new Dog(), new Cat(), new Bird()]) {
          console.log(animal.speak());
        }
      output: |-
        Woof!
        Meow!
        Tweet!
    - lang: cpp
      file: shelter.cpp
      source: |-
        #include <iostream>
        #include <memory>
        #include <string>
        #include <vector>
        using namespace std;

        struct Animal {
            virtual ~Animal() = default;
            virtual string speak() = 0;  // shared interface
        };
        struct Dog : Animal { string speak() override { return "Woof!"; } };
        struct Cat : Animal { string speak() override { return "Meow!"; } };
        struct Bird : Animal { string speak() override { return "Tweet!"; } };

        int main() {
            vector<unique_ptr<Animal>> animals;
            animals.push_back(make_unique<Dog>());
            animals.push_back(make_unique<Cat>());
            animals.push_back(make_unique<Bird>());
            for (auto& animal : animals) {
                cout << animal->speak() << endl;
            }
        }
      output: |-
        Woof!
        Meow!
        Tweet!
order: 5
---
