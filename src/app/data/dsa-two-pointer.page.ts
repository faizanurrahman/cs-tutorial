import twoPointerCode from '../../assets/code/TwoPointer.py?raw';
import { TutorialPage } from '../models/tutorial.schema';

export const DsaTwoPointerPage: TutorialPage = {
  id: 'dsa-two-pointer',
  title: 'Two Pointer Technique',
  metaDescription:
    'Two pointers solve array and string problems efficiently by shrinking the search space.',
  blocks: [
    {
      type: 'hero-header',
      data: {
        badge: 'Theory Foundation',
        title: 'Two Pointer Technique',
        subtitle:
          'Two pointers traverse a data structure from different directions to solve problems in linear time without extra memory.',
        tags: ['Arrays', 'O(n)', 'Patterns'],
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'When to Use',
        subtitle: 'Problems suited for two pointers',
      },
    },
    {
      type: 'text',
      data: {
        html:
          '<ul><li>Finding pairs with a specific sum</li><li>Removing duplicates from sorted arrays</li><li>Reversing arrays/strings</li><li>Container with most water problems</li><li>Merging sorted arrays</li></ul>',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Visual Representation',
        subtitle: 'Finding pair sum in sorted array',
      },
    },
    {
      type: 'memory-viz',
      data: {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        pointers: [
          { name: 'left', index: 0, color: '#3b82f6' },
          { name: 'right', index: 8, color: '#ef4444' },
        ],
        label: 'Two Pointer - Finding Pair with Target Sum = 10',
        showIndices: true,
        showLegend: true,
        description: 'Left pointer at start, right pointer at end',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Algorithm',
        subtitle: 'Step-by-step logic',
      },
    },
    {
      type: 'text',
      data: {
        html:
          '<ol><li>Initialize <code>left = 0</code> and <code>right = n-1</code></li><li>Calculate <code>sum = arr[left] + arr[right]</code></li><li>If <code>sum == target</code>: Found the pair!</li><li>If <code>sum &lt; target</code>: Move <code>left</code> pointer right</li><li>If <code>sum &gt; target</code>: Move <code>right</code> pointer left</li><li>Repeat until pointers meet</li></ol>',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Implementation',
        subtitle: 'Two sum in Python',
      },
    },
    {
      type: 'code-playground',
      data: {
        language: 'python',
        title: 'Two Sum - Two Pointer Solution',
        filename: 'TwoPointer.py',
        code: twoPointerCode,
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Common Patterns',
        subtitle: 'Opposite ends',
      },
    },
    {
      type: 'code',
      data: {
        language: 'python',
        filename: 'TwoPointerPattern.py',
        code: 'left, right = 0, len(arr) - 1\nwhile left < right:\n    # Process\n    left += 1\n    right -= 1',
      },
    },
  ],
};
