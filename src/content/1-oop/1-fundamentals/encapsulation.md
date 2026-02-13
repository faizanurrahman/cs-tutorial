---
title: Encapsulation in OOP
description: Learn about encapsulation, data hiding, and access modifiers
order: 3
date: 2024-01-15
author: DevMastery Team
---

# Encapsulation

**Encapsulation** is the bundling of data (attributes) and methods (functions) that operate on that data within a single unit (class), while restricting direct access to some of the object's components.

## 🎯 Key Concepts

### 1. Data Hiding

Encapsulation protects the internal state of an object by making fields private and providing public methods to access and modify them.

### 2. Access Modifiers

- **Public (+)**: Accessible from anywhere
- **Private (-)**: Accessible only within the class
- **Protected (#)**: Accessible within the class and subclasses
- **Package (~)**: Accessible within the same package

---

## 📊 UML Representation

<app-uml-card
name="BankAccount"
[fields]="[
'- accountNumber: string',
'- balance: double',
'- ownerName: string'
]"
[methods]="[
'+ deposit(amount: double): void',
'+ withdraw(amount: double): boolean',
'+ getBalance(): double',
'- validateAmount(amount: double): boolean'
]">
</app-uml-card>

---

## 💻 Implementation

<app-code-playground
language="java"
title="BankAccount.java - Encapsulation Example"
fileName="BankAccount.java"
code="public class BankAccount {
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
            System.out.println('Deposited: $' + amount);
        }
    }

    // Public method to withdraw money
    public boolean withdraw(double amount) {
        if (validateAmount(amount) && balance >= amount) {
            balance -= amount;
            System.out.println('Withdrawn: $' + amount);
            return true;
        }
        System.out.println('Insufficient funds');
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
        BankAccount account = new BankAccount('ACC001', 'John Doe');

        account.deposit(1000);
        account.withdraw(500);

        System.out.println('Current Balance: $' + account.getBalance());
    }

}">
</app-code-playground>

---

## ✅ Benefits of Encapsulation

:::tip[Data Protection]
Private fields prevent unauthorized access and modification, ensuring data integrity.
:::

:::success[Flexibility]
You can change internal implementation without affecting external code that uses the class.
:::

:::info[Maintainability]
Encapsulation makes code easier to maintain and debug by localizing changes.
:::

:::note[Validation]
You can add validation logic in setter methods to ensure data consistency.
:::

---

## 🔄 Python Example

<app-code-playground
language="python"
title="Encapsulation in Python"
code="class BankAccount:
def **init**(self, account_number, owner_name):
self.**account_number = account_number # Private (name mangling)
self.**balance = 0.0 # Private
self.\_\_owner_name = owner_name # Private

    def deposit(self, amount):
        if self.__validate_amount(amount):
            self.__balance += amount
            print(f'Deposited: ${amount}')

    def withdraw(self, amount):
        if self.__validate_amount(amount) and self.__balance >= amount:
            self.__balance -= amount
            print(f'Withdrawn: ${amount}')
            return True
        print('Insufficient funds')
        return False

    def get_balance(self):
        return self.__balance

    def __validate_amount(self, amount):
        return amount > 0

# Usage

account = BankAccount('ACC001', 'John Doe')
account.deposit(1000)
account.withdraw(500)
print(f'Current Balance: ${account.get_balance()}')">
</app-code-playground>

---

## 🎓 Best Practices

1. **Make fields private by default**
2. **Provide public getters and setters only when necessary**
3. **Add validation logic in setters**
4. **Keep internal methods private**
5. **Use meaningful names for methods**

---

## 🔗 Related Topics

- [Classes and Objects](/oop/fundamentals/classes-objects)
- [Abstraction](/oop/fundamentals/abstraction)
- [Single Responsibility Principle](/oop/solid-principles/single-responsibility)

---

## 📝 Practice Exercise

Try implementing a `Person` class with:

- Private fields: `name`, `age`, `email`
- Public methods: `setAge()`, `getAge()`, `setEmail()`, `getEmail()`
- Validation: Age must be positive, email must contain `@`

<app-code-playground
language="java"
title="Exercise: Person Class"
code="public class Person {
// TODO: Add private fields

    // TODO: Add constructor

    // TODO: Add getters and setters with validation

    public static void main(String[] args) {
        // Test your implementation
    }

}">
</app-code-playground>
