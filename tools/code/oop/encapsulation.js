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
