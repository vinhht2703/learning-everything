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
