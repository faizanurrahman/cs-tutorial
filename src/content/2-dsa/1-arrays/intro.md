---
title: Introduction to Arrays
description: Learn about the most fundamental data structure in programming
order: 1
---

# Introduction to Arrays

An **array** is a contiguous block of memory that stores elements of the same type.

## Characteristics

- **Fixed size** (in most languages)
- **Contiguous memory** allocation
- **O(1) access time** using index
- **O(n) insertion/deletion** in worst case

:::warning[Common Pitfall]
Array indices start at 0, not 1!
:::

## Declaration and Initialization

\`\`\`python

# Python

numbers = [1, 2, 3, 4, 5]

# Access element

print(numbers[0]) # Output: 1
\`\`\`

## Time Complexity

| Operation | Time Complexity |
| --------- | --------------- |
| Access    | $O(1)$          |
| Search    | $O(n)$          |
| Insert    | $O(n)$          |
| Delete    | $O(n)$          |

## Next Topics

- [Array Traversal](/dsa/arrays/traversal)
- [Two Pointers Technique](/dsa/arrays/two-pointers)
