---
id: classes
section: FOUNDATIONS
title: Classes & objects
summary: Build a simple animal model
duration: 8 min
description: Use a familiar animal example to see how a class defines shared structure and objects hold their own data.
goal: Create different animal objects, give each one a name, and call a shared method.
takeaways:
  - label: Class
    text: A definition for shared data and behavior.
  - label: Instance
    text: A specific object created from a class.
  - label: Method
    text: A function that belongs to an object’s class.
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
