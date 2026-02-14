public class BankAccount {
  // Private fields (encapsulated data)
  private String accountNumber;
  private double balance;
  private String ownerName;

  // Constructor
  public BankAccount(String accountNumber, String ownerName) {
    this.accountNumber = accountNumber;
    this.ownerName = ownerName;
    this.balance = 0.0;
  }

  // Public method to deposit money
  public void deposit(double amount) {
    if (validateAmount(amount)) {
      balance += amount;
      System.out.println("Deposited: $" + amount);
    }
  }

  // Public method to withdraw money
  public boolean withdraw(double amount) {
    if (validateAmount(amount) && balance >= amount) {
      balance -= amount;
      System.out.println("Withdrawn: $" + amount);
      return true;
    }
    System.out.println("Insufficient funds");
    return false;
  }

  // Public getter for balance
  public double getBalance() {
    return balance;
  }

  // Private validation method (internal logic)
  private boolean validateAmount(double amount) {
    return amount > 0;
  }

  public static void main(String[] args) {
    BankAccount account = new BankAccount("ACC001", "John Doe");
    account.deposit(1000);
    account.withdraw(500);
    System.out.println("Current Balance: $" + account.getBalance());
  }
}
