#include <cstdint>
#include <iostream>
using namespace std;

int main() {
    int32_t nums[] = {7, 3, 9, 4};
    // Real addresses: each int32 is 4 bytes after the previous one.
    for (int i = 0; i < 4; i++) {
        intptr_t offset = (char*)&nums[i] - (char*)&nums[0];
        cout << "nums[" << i << "] = " << nums[i]
             << " at base + " << offset << endl;
    }
}
