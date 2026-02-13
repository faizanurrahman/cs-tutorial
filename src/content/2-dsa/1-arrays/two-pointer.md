---
title: Two Pointer Technique
description: Master the two-pointer pattern for efficient array and string problems
order: 2
date: 2024-01-20
---

# Two Pointer Technique

The **two-pointer technique** is a common algorithmic pattern used to solve array and string problems efficiently by using two pointers that traverse the data structure.

## 🎯 When to Use

- Finding pairs with a specific sum
- Removing duplicates from sorted arrays
- Reversing arrays/strings
- Container with most water problems
- Merging sorted arrays

---

## 📊 Visual Representation

### Example: Finding Pair Sum in Sorted Array

<app-memory-viz
[data]="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
[pointers]="[
{ name: 'left', index: 0, color: '#3b82f6' },
{ name: 'right', index: 8, color: '#ef4444' }
]"
label="Two Pointer - Finding Pair with Target Sum = 10"
[showIndices]="true"
[showLegend]="true"
description="Left pointer at start, right pointer at end">
</app-memory-viz>

**Algorithm:**

1. Initialize `left = 0` and `right = n-1`
2. Calculate `sum = arr[left] + arr[right]`
3. If `sum == target`: Found the pair!
4. If `sum < target`: Move `left` pointer right (`left++`)
5. If `sum > target`: Move `right` pointer left (`right--`)
6. Repeat until pointers meet

---

## 💻 Implementation

<app-code-playground
language="python"
title="Two Sum - Two Pointer Solution"
code="def two_sum_sorted(arr, target):
'''
Find two numbers that add up to target in sorted array.
Time: O(n), Space: O(1)
'''
left = 0
right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum

    return None

# Test cases

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
target = 10

result = two_sum_sorted(arr, target)
if result:
print(f'Found pair at indices {result[0]} and {result[1]}')
print(f'Values: {arr[result[0]]} + {arr[result[1]]} = {target}')
else:
print('No pair found')

# More tests

print('\\nAdditional tests:')
print(two_sum_sorted([2, 7, 11, 15], 9)) # [0, 1]
print(two_sum_sorted([1, 3, 5, 7], 10)) # [1, 3]
print(two_sum_sorted([1, 2, 3, 4], 10)) # None">
</app-code-playground>

---

## 🔄 Common Patterns

### Pattern 1: Opposite Ends

Start from both ends and move towards center.

```python
left, right = 0, len(arr) - 1
while left < right:
    # Process
    left += 1
    right -= 1
```
