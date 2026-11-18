---
id: encapsulation
section: NGUYÊN LÝ CỐT LÕI
title: Tính đóng gói
summary: Kiểm soát trạng thái
duration: 6 phút
description: Giữ trạng thái cùng các phương thức quản lý nó, và cập nhật thông qua giao diện rõ ràng.
goal: Cập nhật số dư qua deposit(), nơi lớp có thể áp dụng quy tắc.
takeaways:
  - label: Trạng thái
    text: Số dư thuộc về đối tượng tài khoản.
  - label: Giao diện
    text: Gọi deposit() thay vì sửa số dư trực tiếp.
  - label: Bất biến
    text: Chỉ khoản nạp dương mới làm thay đổi số dư.
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
