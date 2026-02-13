---
title: Component Showcase
description: Testing all UI components
---

# Component Showcase

This page demonstrates all available UI components.

## Callouts

:::tip[Performance Tip]
Use memoization to optimize expensive calculations.
:::

:::note[Important Information]
Always validate user input before processing.
:::

:::warning[Common Pitfall]
Don't forget to unsubscribe from observables!
:::

:::danger[Critical Error]
Never store sensitive data in localStorage.
:::

---

## Code Blocks

### Basic Code Block

\`\`\`javascript
function fibonacci(n) {
if (n <= 1) return n;
return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // Output: 55
\`\`\`

### With File Name

\`\`\`python

# fibonacci.py

def fibonacci(n):
if n <= 1:
return n
return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10)) # Output: 55
\`\`\`

---

## Bento Grid

<app-bento-grid columns="2">
  <app-bento-card 
    title="OOP Concepts"
    description="Learn about classes, inheritance, and polymorphism"
    icon="code"
    href="/oop">
  </app-bento-card>

<app-bento-card 
    title="Data Structures"
    description="Arrays, linked lists, trees, and graphs"
    icon="database"
    href="/dsa">
</app-bento-card>

<app-bento-card 
    title="Algorithms"
    description="Sorting, searching, and dynamic programming"
    icon="lightning"
    href="/algorithms">
</app-bento-card>

<app-bento-card 
    title="System Design"
    description="Scalability, caching, and load balancing"
    icon="chart"
    href="/system-design">
</app-bento-card>
</app-bento-grid>

---

## Tabs

<app-tab-group>
  <app-tab label="JavaScript">
    \`\`\`javascript
    const greeting = "Hello, World!";
    console.log(greeting);
    \`\`\`
  </app-tab>

  <app-tab label="Python">
    \`\`\`python
    greeting = "Hello, World!"
    print(greeting)
    \`\`\`
  </app-tab>

  <app-tab label="Java">
    \`\`\`java
    public class Main {
        public static void main(String[] args) {
            String greeting = "Hello, World!";
            System.out.println(greeting);
        }
    }
    \`\`\`
  </app-tab>
</app-tab-group>

---

## Badges

<div class="flex gap-2 flex-wrap my-4">
  <app-badge>Default</app-badge>
  <app-badge variant="success">Success</app-badge>
  <app-badge variant="warning">Warning</app-badge>
  <app-badge variant="danger">Danger</app-badge>
  <app-badge variant="info">Info</app-badge>
  <app-badge variant="purple">Purple</app-badge>
  <app-badge variant="outline">Outline</app-badge>
</div>

---

## Alerts

<app-alert variant="info" title="Information">
  This is an informational alert with useful details.
</app-alert>

<app-alert variant="success" title="Success!" dismissible="true">
  Your changes have been saved successfully.
</app-alert>

<app-alert variant="warning" title="Warning">
  Please review the following issues before proceeding.
</app-alert>

<app-alert variant="danger" title="Error" dismissible="true">
  An error occurred while processing your request.
</app-alert>

---

## Buttons

<div class="flex gap-3 flex-wrap my-4">
  <app-button>Primary Button</app-button>
  <app-button variant="secondary">Secondary</app-button>
  <app-button variant="outline">Outline</app-button>
  <app-button variant="ghost">Ghost</app-button>
  <app-button variant="danger">Danger</app-button>
</div>

### Button Sizes

<div class="flex gap-3 items-center flex-wrap my-4">
  <app-button size="sm">Small</app-button>
  <app-button size="md">Medium</app-button>
  <app-button size="lg">Large</app-button>
</div>

### Button States

<div class="flex gap-3 flex-wrap my-4">
  <app-button disabled="true">Disabled</app-button>
  <app-button loading="true">Loading...</app-button>
</div>
