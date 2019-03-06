class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    if (this.transactions.length !== 0) {
      const reducer = (acc, currVal) => acc + currVal;
      return this.transactions.reduce(reducer);

    } else {
      return 0;
    }

  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account) {
    this.account = account;
    this.amount = amount;
  }
  isAllowed() {
    if ((this.account.balance <= 0) && this.value <= 0) {
      return false;
    } else {
      return true;
    }

  }
  commit() {
    this.time = new Date();
    if (this.isAllowed()) {
      this.account.addTransaction(this.value);
      console.log(`Transaction of $${this.value} complete.`)
    } else {
      console.log(`Transaction of $${this.value} declined. Insufficient funds.`)
    }
    //this.account.balance += this.value; // value's amount is decided by the sub
  }
}

class Withdrawal extends Transaction {

  get value() {   // remember, getters and setters can be defined in js as such... by saying get function() and set function()
    return -this.amount;

  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t0 = new Withdrawal(100, myAccount);
t0.commit();

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:$', myAccount.balance);
