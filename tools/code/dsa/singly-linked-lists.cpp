#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next = nullptr;
    ListNode(int val) : val(val) {}
};

class LinkedList {
    ListNode* head = new ListNode(-1);  // dummy node
    ListNode* tail = head;

public:
    ~LinkedList() {
        while (head) { ListNode* next = head->next; delete head; head = next; }
    }

    void append(int val) {
        tail->next = new ListNode(val);
        tail = tail->next;
    }

    void print() {
        for (ListNode* cur = head->next; cur; cur = cur->next) cout << cur->val << " -> ";
        cout << "null" << endl;
    }
};

int main() {
    LinkedList lst;
    for (int v : {1, 2, 3}) lst.append(v);
    lst.print();
}
