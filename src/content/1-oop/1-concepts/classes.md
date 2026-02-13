---
title: Classes and Objects
description: Understanding the fundamental building blocks of Object-Oriented Programming
order: 1
date: 2026-02-13
author: CS Tutorial Platform
---

# Classes and Objects

A **class** is a blueprint for creating objects. It defines the structure (fields) and behavior (methods) that objects of that class will have.

## Basic Class Structure

Here's a simple class definition:

\`\`\`java
public class Car {
// Fields (attributes)
private String brand;
private int speed;

    // Constructor
    public Car(String brand) {
        this.brand = brand;
        this.speed = 0;
    }

    // Methods (behavior)
    public void accelerate() {
        speed += 10;
    }

    public void brake() {
        speed = Math.max(0, speed - 10);
    }

}
\`\`\`

:::tip[Design Principle]
Keep your classes focused on a single responsibility (Single Responsibility Principle).
:::

## Creating Objects

When you instantiate a class, you create an object:

\`\`\`java
Car myCar = new Car("Toyota");
myCar.accelerate();
\`\`\`

:::note[Memory Allocation]
Objects are stored in the heap memory, while references are stored in the stack.
:::

## Next Steps

- Learn about [Inheritance](/oop/concepts/inheritance)
- Explore [Polymorphism](/oop/concepts/polymorphism)
