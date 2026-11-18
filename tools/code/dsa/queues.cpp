#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    queue<string> q;
    q.push("A");   // enqueue at the back
    q.push("B");
    q.push("C");

    cout << q.front() << endl;  // front of the queue
    q.pop();                    // dequeue
    cout << "next: " << q.front() << ", size: " << q.size() << endl;
}
