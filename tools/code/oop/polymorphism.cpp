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
