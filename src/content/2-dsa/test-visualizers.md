---
title: DSA Visualizers Showcase
description: Testing all data structure visualizations
order: 0
---

# Data Structures Visualizers

This page demonstrates all DSA visualization components.

## Array / Memory Visualizer

### Basic Array

<app-memory-viz
[data]="[5, 12, 7, 23, 9, 15]"
label="Basic Integer Array"
[showIndices]="true">
</app-memory-viz>

### Array with Highlighting

<app-memory-viz
[data]="[10, 20, 30, 40, 50]"
[highlightIndices]="[1, 3]"
label="Highlighted Elements at Index 1 and 3"
[showLegend]="true">
</app-memory-viz>

### Array with Pointers

<app-memory-viz
[data]="[3, 7, 2, 9, 1, 6]"
[pointers]="[
{ name: 'left', index: 0, color: '#3b82f6' },
{ name: 'right', index: 5, color: '#ef4444' }
]"
label="Two Pointer Technique"
description="Left pointer at index 0, Right pointer at index 5">
</app-memory-viz>

### Array with Memory Addresses

<app-memory-viz
[data]="[100, 200, 300, 400]"
[showAddresses]="true"
[baseAddress]="4096"
label="Array with Memory Addresses"
description="Base address: 0x1000 (4096 in decimal), 4 bytes per element">
</app-memory-viz>

---

## Linked List Visualizer

### Basic Singly Linked List

<app-linked-list
[values]="[10, 20, 30, 40, 50]"
label="Singly Linked List"
description="Each node contains data and a pointer to the next node">
</app-linked-list>

### Linked List with Highlighting

<app-linked-list
[values]="[5, 15, 25, 35]"
[highlightIndex]="2"
label="Linked List - Current Node Highlighted"
[showStats]="true"
description="Highlighting node at position 2 (value: 25)">
</app-linked-list>

---

## Binary Tree Visualizer

### Basic Binary Search Tree

<app-tree-viz
[root]="{
value: 50,
left: {
value: 30,
left: { value: 20 },
right: { value: 40 }
},
right: {
value: 70,
left: { value: 60 },
right: { value: 80 }
}
}"
label="Binary Search Tree"
[showStats]="true"
description="A balanced BST with 7 nodes">
</app-tree-viz>

### Smaller Tree

<app-tree-viz
[root]="{
value: 10,
left: { value: 5 },
right: { value: 15 }
}"
label="Simple Binary Tree"
description="Root with two children">
</app-tree-viz>

---

## Stack Visualizer

### Basic Stack (LIFO)

<app-stack-viz
[items]="[10, 20, 30, 40, 50]"
label="Stack - Last In, First Out"
description="Push adds to top, Pop removes from top">
</app-stack-viz>

### Smaller Stack

<app-stack-viz
[items]="['A', 'B', 'C']"
label="Stack of Characters"
[maxSize]="10"
description="Character stack with capacity of 10">
</app-stack-viz>

### Empty Stack

<app-stack-viz
[items]="[]"
label="Empty Stack"
description="No elements in stack">
</app-stack-viz>

---

## Queue Visualizer

### Basic Queue (FIFO)

<app-queue-viz
[items]="[10, 20, 30, 40, 50]"
label="Queue - First In, First Out"
description="Enqueue adds to rear, Dequeue removes from front">
</app-queue-viz>

### Shorter Queue

<app-queue-viz
[items]="['Task 1', 'Task 2', 'Task 3']"
label="Task Queue"
description="Processing tasks in order">
</app-queue-viz>

### Empty Queue

<app-queue-viz
[items]="[]"
label="Empty Queue"
description="No tasks in queue">
</app-queue-viz>

---

## Time Complexity Reference

| Operation | Array | Linked List | Stack | Queue | BST (Balanced) |
| --------- | ----- | ----------- | ----- | ----- | -------------- |
| Access    | O(1)  | O(n)        | O(n)  | O(n)  | O(log n)       |
| Search    | O(n)  | O(n)        | O(n)  | O(n)  | O(log n)       |
| Insert    | O(n)  | O(1)\*      | O(1)  | O(1)  | O(log n)       |
| Delete    | O(n)  | O(1)\*      | O(1)  | O(1)  | O(log n)       |

\*at known position

:::tip[Performance Tip]
Choose the right data structure based on your use case:

- **Array**: Fast access by index
- **Linked List**: Fast insertion/deletion at head
- **Stack**: LIFO operations (undo/redo, backtracking)
- **Queue**: FIFO operations (task scheduling, BFS)
- **BST**: Sorted data with fast search
  :::
