---
id: polymorphism
section: CORE PRINCIPLES
title: Polymorphism
summary: One interface, many forms
duration: 7 min
description: Use one method call across different types, while each type supplies the behavior that fits.
goal: Call speak() on a list of animals and observe the different implementations.
takeaways:
  - label: Shared interface
    text: Each type provides speak().
  - label: Different behavior
    text: The method returns a type-specific result.
  - label: Flexible caller
    text: The loop does not need type-specific checks.
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
