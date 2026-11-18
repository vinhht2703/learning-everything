---
id: encapsulation
section: CORE PRINCIPLES
title: Encapsulation
summary: Keep state under control
duration: 6 min
description: Keep an object’s state with the methods that manage it, and route updates through a clear interface.
goal: Update an account balance through deposit(), where the class can enforce a rule.
takeaways:
  - label: State
    text: The balance belongs to the account object.
  - label: Interface
    text: Call deposit() instead of editing the balance directly.
  - label: Invariant
    text: Only positive deposits change the balance.
code:
  file: account.py
  lang: python
  source: |-
    class Account:
        def __init__(self, balance=0):
            self.__balance = balance

        def deposit(self, amount):
            if amount > 0:
                self.__balance += amount

        def get_balance(self):
            return self.__balance

    account = Account(100)
    account.deposit(50)
    print(account.get_balance())
  output: "150"
  variants:
    - lang: javascript
      file: account.js
      source: |-
        class Account {
          #balance; // private field

          constructor(balance = 0) {
            this.#balance = balance;
          }

          deposit(amount) {
            if (amount > 0) {
              this.#balance += amount;
            }
          }

          getBalance() {
            return this.#balance;
          }
        }

        const account = new Account(100);
        account.deposit(50);
        console.log(account.getBalance());
      output: "150"
    - lang: cpp
      file: account.cpp
      source: |-
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
      output: "150"
order: 3
---
