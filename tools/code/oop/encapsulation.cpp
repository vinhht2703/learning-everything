#include <iostream>
using namespace std;

class Account {
private:
    int balance;

public:
    Account(int balance = 0) : balance(balance) {}

    void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    int getBalance() const { return balance; }
};

int main() {
    Account account(100);
    account.deposit(50);
    cout << account.getBalance() << endl;
}
