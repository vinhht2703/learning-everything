#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    s.push(1);
    s.push(2);
    s.push(3);

    cout << s.top() << endl;  // peek
    s.pop();                  // pop removes the top (returns nothing)
    cout << "size after pop: " << s.size() << endl;
}
