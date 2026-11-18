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
