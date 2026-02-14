import bankAccountJava from '../../assets/code/BankAccount.java?raw';
import bankAccountPython from '../../assets/code/BankAccount.py?raw';
import personExercise from '../../assets/code/PersonExercise.java?raw';
import { TutorialPage } from '../models/tutorial.schema';

export const OopEncapsulationPage: TutorialPage = {
  id: 'oop-encapsulation',
  title: 'Encapsulation',
  metaDescription:
    'Encapsulation bundles data and behavior while restricting direct access to an object’s internals.',
  blocks: [
    {
      type: 'hero-header',
      data: {
        badge: 'Theory Foundation',
        title: 'Encapsulation',
        subtitle:
          'Encapsulation bundles data and behavior into a single unit while restricting direct access to internal details.',
        tags: ['OOP', 'Fundamentals', 'Data Protection'],
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Key Concepts',
        subtitle: 'Data hiding and access modifiers',
      },
    },
    {
      type: 'text',
      data: {
        html:
          '<h3>1. Data Hiding</h3><p>Encapsulation protects the internal state of an object by making fields private and providing public methods to access and modify them.</p><h3>2. Access Modifiers</h3><ul><li><strong>Public (+)</strong>: Accessible from anywhere</li><li><strong>Private (-)</strong>: Accessible only within the class</li><li><strong>Protected (#)</strong>: Accessible within the class and subclasses</li><li><strong>Package (~)</strong>: Accessible within the same package</li></ul>',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'UML Representation',
        subtitle: 'BankAccount class structure',
      },
    },
    {
      type: 'uml-card',
      data: {
        name: 'BankAccount',
        fields: ['- accountNumber: string', '- balance: double', '- ownerName: string'],
        methods: [
          '+ deposit(amount: double): void',
          '+ withdraw(amount: double): boolean',
          '+ getBalance(): double',
          '- validateAmount(amount: double): boolean',
        ],
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Implementation',
        subtitle: 'Java and Python examples',
      },
    },
    {
      type: 'code-playground',
      data: {
        language: 'java',
        title: 'BankAccount.java - Encapsulation Example',
        filename: 'BankAccount.java',
        code: bankAccountJava,
      },
    },
    {
      type: 'code-playground',
      data: {
        language: 'python',
        title: 'Encapsulation in Python',
        filename: 'BankAccount.py',
        code: bankAccountPython,
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Benefits of Encapsulation',
        subtitle: 'Why it matters',
      },
    },
    {
      type: 'callout',
      data: {
        variant: 'tip',
        title: 'Data Protection',
        content:
          'Private fields prevent unauthorized access and modification, ensuring data integrity.',
      },
    },
    {
      type: 'callout',
      data: {
        variant: 'success',
        title: 'Flexibility',
        content:
          'You can change internal implementation without affecting external code that uses the class.',
      },
    },
    {
      type: 'callout',
      data: {
        variant: 'info',
        title: 'Maintainability',
        content:
          'Encapsulation makes code easier to maintain and debug by localizing changes.',
      },
    },
    {
      type: 'callout',
      data: {
        variant: 'note',
        title: 'Validation',
        content:
          'Add validation logic in setter methods to ensure data consistency.',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Best Practices',
        subtitle: 'Guidelines for clean design',
      },
    },
    {
      type: 'text',
      data: {
        html:
          '<ol><li><strong>Make fields private by default</strong></li><li><strong>Provide public getters and setters only when necessary</strong></li><li><strong>Add validation logic in setters</strong></li><li><strong>Keep internal methods private</strong></li><li><strong>Use meaningful names for methods</strong></li></ol>',
      },
    },
    {
      type: 'section-header',
      data: {
        title: 'Practice Exercise',
        subtitle: 'Build a Person class',
      },
    },
    {
      type: 'text',
      data: {
        html:
          '<p>Try implementing a <code>Person</code> class with:</p><ul><li>Private fields: <code>name</code>, <code>age</code>, <code>email</code></li><li>Public methods: <code>setAge()</code>, <code>getAge()</code>, <code>setEmail()</code>, <code>getEmail()</code></li><li>Validation: Age must be positive, email must contain <code>@</code></li></ul>',
      },
    },
    {
      type: 'code-playground',
      data: {
        language: 'java',
        title: 'Exercise: Person Class',
        filename: 'PersonExercise.java',
        code: personExercise,
      },
    },
  ],
};
