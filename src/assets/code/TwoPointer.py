def two_sum_sorted(arr, target):
  """Find two numbers that add up to target in sorted array. Time: O(n), Space: O(1)"""
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

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
target = 10
result = two_sum_sorted(arr, target)
if result:
  print(f"Found pair at indices {result[0]} and {result[1]}")
else:
  print("No pair found")
