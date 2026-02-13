---
title: Interactive Components Showcase
description: Testing Mermaid, Monaco Code Playground, and System Design components
order: 0
---

# Interactive Components Showcase

This page demonstrates all interactive components including Mermaid diagrams, live code execution, and system design visualizers.

---

## Mermaid Diagrams

### Flowchart

\`\`\`mermaid
graph TD
A[Start] --> B{Is it valid?}
B -->|Yes| C[Process Data]
B -->|No| D[Show Error]
C --> E[Save to Database]
D --> F[End]
E --> F
\`\`\`

### Sequence Diagram

\`\`\`mermaid
sequenceDiagram
participant Client
participant Server
participant Database

    Client->>Server: HTTP Request
    Server->>Database: Query Data
    Database-->>Server: Return Results
    Server-->>Client: HTTP Response

\`\`\`

### Class Diagram

\`\`\`mermaid
classDiagram
class Animal {
+String name
+int age
+makeSound()
}
class Dog {
+String breed
+bark()
}
class Cat {
+String color
+meow()
}

    Animal <|-- Dog
    Animal <|-- Cat

\`\`\`

### State Diagram

\`\`\`mermaid
stateDiagram-v2
[*] --> Idle
Idle --> Processing: Start
Processing --> Success: Complete
Processing --> Error: Fail
Success --> [*]
Error --> Idle: Retry
\`\`\`

---

## Live Code Playground

### Python Example

<app-code-playground
language="python"
title="Binary Search Implementation"
code="def binary_search(arr, target):
left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# Test the function

arr = [1, 3, 5, 7, 9, 11, 13, 15]
target = 7

result = binary_search(arr, target)
print(f'Target {target} found at index: {result}')">
</app-code-playground>

### JavaScript Example

<app-code-playground
language="javascript"
title="Palindrome Checker"
code="function isPalindrome(str) {
// Remove non-alphanumeric characters and convert to lowercase
const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Check if string equals its reverse
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;

}

// Test cases
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car')); // false
console.log(isPalindrome('Was it a rat I saw?')); // true">
</app-code-playground>

### Java Example

<app-code-playground
language="java"
title="Fibonacci Sequence"
fileName="Fibonacci.java"
code="public class Fibonacci {
public static int fibonacci(int n) {
if (n <= 1) {
return n;
}
return fibonacci(n - 1) + fibonacci(n - 2);
}

    public static void main(String[] args) {
        System.out.println('Fibonacci sequence (first 10 numbers):');
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + ' ');
        }
        System.out.println();
    }

}">
</app-code-playground>

---

## OOP Components

### UML Class Diagram

<app-uml-card
name="User"
[fields]="[
'- id: int',
'- email: string',
'- password: string',
'- createdAt: Date'
]"
[methods]="[
'+ login(): boolean',
'+ logout(): void',
'+ resetPassword(email: string): void',
'+ updateProfile(data: object): void'
]">
</app-uml-card>

### Abstract Class

<app-uml-card
name="Shape"
stereotype="abstract"
[abstract]="true"
[fields]="[
'# color: string',
'# x: number',
'# y: number'
]"
[methods]="[
'+ getArea(): double',
'+ getPerimeter(): double',
'+ draw(): void'
]">
</app-uml-card>

---

## System Design Components

### Basic System Architecture

<app-architecture-diagram
title="Three-Tier Web Architecture"
description="Standard web application architecture with load balancing"
[showLegend]="true">

  <div class="flex flex-col items-center gap-8">
    <!-- Tier 1: Client -->
    <div class="flex gap-4">
      <app-system-node type="client" label="Web Browser" status="active"></app-system-node>
      <app-system-node type="client" label="Mobile App" status="active"></app-system-node>
    </div>

    <app-data-flow direction="down" label="HTTP/HTTPS" [animated]="true"></app-data-flow>

    <!-- Tier 2: Application Layer -->
    <div class="flex flex-col items-center gap-4">
      <app-system-node type="loadbalancer" label="Load Balancer" status="active"></app-system-node>

      <app-data-flow direction="down" label="Distribute Requests" [animated]="true"></app-data-flow>

      <div class="flex gap-4">
        <app-system-node type="server" label="App Server 1" sublabel="Node.js" status="active"></app-system-node>
        <app-system-node type="server" label="App Server 2" sublabel="Node.js" status="active"></app-system-node>
        <app-system-node type="server" label="App Server 3" sublabel="Node.js" status="inactive"></app-system-node>
      </div>
    </div>

    <app-data-flow direction="down" label="Database Queries" [animated]="true"></app-data-flow>

    <!-- Tier 3: Data Layer -->
    <div class="flex gap-6">
      <app-system-node type="cache" label="Redis Cache" sublabel="In-Memory" status="active"></app-system-node>
      <app-system-node type="database" label="PostgreSQL" sublabel="Primary DB" status="active" badge="Master"></app-system-node>
      <app-system-node type="database" label="PostgreSQL" sublabel="Replica" status="active" badge="Replica"></app-system-node>
    </div>

  </div>
</app-architecture-diagram>

### Microservices Architecture

<app-architecture-diagram 
  title="Microservices with Message Queue"
  description="Event-driven architecture using message queues for inter-service communication">

  <div class="flex flex-col items-center gap-8">
    <!-- API Gateway -->
    <app-system-node type="api" label="API Gateway" status="active" [highlighted]="true"></app-system-node>

    <app-data-flow direction="down" [animated]="true"></app-data-flow>

    <!-- Services Layer -->
    <div class="flex gap-6 items-start">
      <div class="flex flex-col items-center gap-3">
        <app-system-node type="server" label="User Service" sublabel="Port 3001" status="active"></app-system-node>
        <app-system-node type="database" label="Users DB" status="active"></app-system-node>
      </div>

      <div class="flex flex-col items-center gap-3">
        <app-system-node type="server" label="Order Service" sublabel="Port 3002" status="active"></app-system-node>
        <app-system-node type="database" label="Orders DB" status="active"></app-system-node>
      </div>

      <div class="flex flex-col items-center gap-3">
        <app-system-node type="server" label="Payment Service" sublabel="Port 3003" status="error"></app-system-node>
        <app-system-node type="database" label="Payments DB" status="error"></app-system-node>
      </div>
    </div>

    <app-data-flow direction="down" label="Async Events" [animated]="true"></app-data-flow>

    <!-- Message Queue -->
    <app-system-node type="queue" label="RabbitMQ" sublabel="Message Broker" status="active"></app-system-node>

  </div>
</app-architecture-diagram>

---

## Combined Examples

### Algorithm with Visualization and Code

#### Two Pointer Technique

The two-pointer technique is commonly used for array/string problems where you need to find pairs or check conditions.

**Visual Representation:**

<app-memory-viz
[data]="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
[pointers]="[
{ name: 'left', index: 0, color: '#3b82f6' },
{ name: 'right', index: 8, color: '#ef4444' }
]"
label="Two Pointer Technique - Finding Pair Sum"
description="Left pointer starts at beginning, right pointer at end">
</app-memory-viz>

**Implementation:**

<app-code-playground
language="python"
title="Two Sum - Two Pointer Solution"
code="def two_sum_sorted(arr, target):
left = 0
right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return None

# Test

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
target = 10

result = two_sum_sorted(arr, target)
if result:
print(f'Found pair at indices {result[0]} and {result[1]}')
print(f'Values: {arr[result[0]]} + {arr[result[1]]} = {target}')
else:
print('No pair found')">
</app-code-playground>

:::tip[Time Complexity]
The two-pointer approach runs in **O(n)** time and uses **O(1)** space, making it very efficient for sorted arrays.
:::

---

## Performance Notes

:::warning[Rate Limiting]
The code playground is rate-limited to **5 executions per minute** to prevent abuse. Please use it responsibly.
:::

:::note[Monaco Editor Loading]
The Monaco editor is lazy-loaded on first use (~3-5MB). Subsequent uses will be instant.
:::
