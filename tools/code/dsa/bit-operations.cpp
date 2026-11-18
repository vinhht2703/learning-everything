#include <bitset>
#include <iostream>
using namespace std;

int countOnes(unsigned n) {
    int count = 0;
    while (n) {
        count += n & 1;          // look at the lowest bit
        n >>= 1;                 // drop it
    }
    return count;
}

int main() {
    unsigned a = 12, b = 10;     // 1100 and 1010 in binary
    cout << "a & b  = " << bitset<4>(a & b) << " " << (a & b) << endl;    // AND
    cout << "a | b  = " << bitset<4>(a | b) << " " << (a | b) << endl;    // OR
    cout << "a ^ b  = " << bitset<4>(a ^ b) << " " << (a ^ b) << endl;    // XOR
    cout << "a << 1 = " << bitset<5>(a << 1) << " " << (a << 1) << endl;  // multiply by 2
    cout << "a >> 2 = " << bitset<4>(a >> 2) << " " << (a >> 2) << endl;  // divide by 4
    cout << "ones in 13: " << countOnes(13) << " | 13 is odd: " << boolalpha << ((13 & 1) == 1) << endl;
    cout << "single number: " << (4 ^ 1 ^ 2 ^ 1 ^ 2) << endl;               // x ^ x = 0
}
