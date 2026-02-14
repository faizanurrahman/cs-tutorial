import javaArrayCode from '../../assets/code/ArrayDeclaration.java?raw';
import pythonArrayCode from '../../assets/code/ArrayBasics.py?raw';
import { TutorialPage } from '../models/tutorial.schema';

export const DsaArraysIntroPage: TutorialPage = {
  id: 'dsa-arrays-intro',
  title: 'What is an Array? Understanding Memory Architecture',
  metaDescription:
    'Arrays store data in contiguous memory locations, enabling O(1) access by index.',
  blocks: [
    {
      type: 'hero-header',
      data: {
        badge: 'Theory Foundation',
        title: 'What is an Array? Understanding Memory Architecture',
        subtitle:
          'An array is a collection of items stored at contiguous memory locations. This property makes direct access remarkably fast.',
        tags: ['Arrays', 'Memory', 'O(1)'],
      },
    },
    {
      type: 'text',
      data: {
        html: "<p>Here's a simple declaration:</p>",
      },
    },
    {
      type: 'code',
      data: {
        language: 'java',
        filename: 'ArrayDeclaration.java',
        code: javaArrayCode,
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Memory Layout',
        subtitle: 'Contiguous blocks: address, value, index',
      },
    },
    {
      type: 'memory-viz',
      data: {
        data: [10, 20, 30, 40, 50],
        label: 'Array in memory: each integer 4 bytes',
        showIndices: true,
      },
    },
    {
      type: 'text',
      data: {
        html:
          '<p class="text-center text-sm">Each integer takes 4 bytes. Address = Base + (Index × Size)</p>',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'The Mathematics of Instant Access',
        subtitle: 'Why index access is O(1)',
      },
    },
    {
      type: 'text',
      data: {
        html:
          '<p>To retrieve the element at index 2, the CPU does a direct calculation:</p><ol><li>Array start address (e.g. 1000)</li><li>Integer size: 4 bytes</li><li>Target address = 1000 + (2 × 4) = 1008</li><li>Direct jump and read the value (30)</li></ol><p><strong>O(1) time complexity</strong>—constant time, independent of array size.</p>',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Why This Property Matters',
        subtitle: 'Contiguous memory and direct access',
      },
    },
    {
      type: 'text',
      data: {
        html:
          '<p>Because array elements are in <strong>contiguous memory locations</strong>, the CPU can compute any cell’s address in constant time. This is why array access is O(1), unlike linked lists where you must follow pointers.</p>',
      },
    },
    {
      type: 'callout',
      data: {
        variant: 'tip',
        title: 'Mental Model',
        content:
          'Think of an array as a row of post office boxes: you know the address of the first box, and each box is the same size, so you can go directly to box number N. A linked list is like a scavenger hunt—you must follow each clue in order.',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Time Complexity at a Glance',
        subtitle: 'Best, average, and worst case',
      },
    },
    {
      type: 'time-complexity',
      data: {
        cases: [
          {
            value: '1',
            label: 'Best Case',
            description: 'Access by index: one calculation, one memory read.',
          },
          {
            value: 'N/2',
            label: 'Average Case',
            description: 'Search (unsorted): check about half the elements.',
          },
          {
            value: 'N',
            label: 'Worst Case',
            description: 'Search, insert, or delete may touch every element.',
          },
        ],
      },
    },
    {
      type: 'callout',
      data: {
        variant: 'warning',
        title: 'Common Pitfall',
        content: 'Array indices start at 0, not 1.',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Declaration and Initialization',
        subtitle: 'Python example',
      },
    },
    {
      type: 'code',
      data: {
        language: 'python',
        filename: 'ArrayBasics.py',
        code: pythonArrayCode,
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Next Topics',
        subtitle: 'Continue learning',
      },
    },
    {
      type: 'text',
      data: {
        html: '<ul><li>Two Pointers Technique</li></ul>',
      },
    },
  ],
};
