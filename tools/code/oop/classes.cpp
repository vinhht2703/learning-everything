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
