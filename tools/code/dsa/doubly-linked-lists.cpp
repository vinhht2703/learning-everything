#include <iostream>
using namespace std;

struct Node {
    int val;
    Node* prev = nullptr;
    Node* next = nullptr;
    Node(int val) : val(val) {}
};

class DoublyLinkedList {
    Node* head = new Node(0);  // left dummy
    Node* tail = new Node(0);  // right dummy

public:
    DoublyLinkedList() { head->next = tail; tail->prev = head; }
    ~DoublyLinkedList() {
        while (head) { Node* next = head->next; delete head; head = next; }
    }

    void addBack(int val) {
        Node* node = new Node(val);
        Node* last = tail->prev;
        last->next = node; node->prev = last;
        node->next = tail; tail->prev = node;
    }

    int removeBack() {
        Node* last = tail->prev;
        last->prev->next = tail;
        tail->prev = last->prev;
        int val = last->val;
        delete last;
        return val;
    }
};

int main() {
    DoublyLinkedList dll;
    for (int v : {1, 2, 3}) dll.addBack(v);
    cout << dll.removeBack() << endl;
}
