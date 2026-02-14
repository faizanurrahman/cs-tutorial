class BankAccount:
  def __init__(self, account_number, owner_name):
    self.__account_number = account_number
    self.__balance = 0.0
    self.__owner_name = owner_name

  def deposit(self, amount):
    if self.__validate_amount(amount):
      self.__balance += amount
      print(f"Deposited: ${amount}")

  def withdraw(self, amount):
    if self.__validate_amount(amount) and self.__balance >= amount:
      self.__balance -= amount
      print(f"Withdrawn: ${amount}")
      return True
    print("Insufficient funds")
    return False

  def get_balance(self):
    return self.__balance

  def __validate_amount(self, amount):
    return amount > 0

account = BankAccount("ACC001", "John Doe")
account.deposit(1000)
account.withdraw(500)
print(f"Current Balance: ${account.get_balance()}")
