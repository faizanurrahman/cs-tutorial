import carClassCode from '../../assets/code/Car.java?raw';
import carUsageCode from '../../assets/code/CarUsage.java?raw';
import { TutorialPage } from '../models/tutorial.schema';

export const OopClassesPage: TutorialPage = {
  id: 'oop-classes',
  title: 'Classes and Objects',
  metaDescription:
    'Classes are blueprints and objects are instances. Learn structure, behavior, and instantiation.',
  blocks: [
    {
      type: 'hero-header',
      data: {
        badge: 'Theory Foundation',
        title: 'Classes and Objects',
        subtitle:
          'A class defines structure (fields) and behavior (methods). An object is a concrete instance of a class in memory.',
        tags: ['OOP', 'Classes', 'Objects'],
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Basic Class Structure',
        subtitle: 'Fields, constructor, and methods',
      },
    },
    {
      type: 'text',
      data: {
        html: "<p>Here's a simple class definition:</p>",
      },
    },
    {
      type: 'code',
      data: {
        language: 'java',
        filename: 'Car.java',
        code: carClassCode,
      },
    },
    {
      type: 'callout',
      data: {
        variant: 'tip',
        title: 'Design Principle',
        content:
          'Keep your classes focused on a single responsibility (Single Responsibility Principle).',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Creating Objects',
        subtitle: 'Instantiation and references',
      },
    },
    {
      type: 'text',
      data: {
        html: '<p>When you instantiate a class, you create an object:</p>',
      },
    },
    {
      type: 'code',
      data: {
        language: 'java',
        filename: 'CarUsage.java',
        code: carUsageCode,
      },
    },
    {
      type: 'callout',
      data: {
        variant: 'note',
        title: 'Memory Allocation',
        content:
          'Objects live in heap memory, while references are stored in the stack.',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Next Steps',
        subtitle: 'Continue to encapsulation',
      },
    },
    {
      type: 'text',
      data: {
        html: '<ul><li>Encapsulation</li></ul>',
      },
    },
  ],
};
