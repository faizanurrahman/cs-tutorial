import { TutorialPage } from '../models/tutorial.schema';

export const OopIndexPage: TutorialPage = {
  id: 'oop-index',
  title: 'Preparing for Your OOP Journey',
  metaDescription: 'Before diving into OOP, set up your environment and mindset for success.',
  blocks: [
    {
      type: 'hero-header',
      data: {
        badge: 'Pre-Class Setup',
        title: 'Preparing for Your OOP Journey',
        subtitle:
          'Before diving into Object-Oriented Programming, get your environment ready and understand the path ahead. These steps keep your learning focused and intentional.',
        tags: ['OOP', 'Foundation', 'Setup'],
      },
    },
    {
      type: 'steps-list',
      data: {
        steps: [
          {
            title: 'Development Environment',
            content:
              'Have a code editor ready (VS Code, IntelliJ, or similar) and a working Java or Python setup. Test that you can compile and run a simple program.',
          },
          {
            title: "Topics We'll Cover",
            content:
              '<strong>Fundamentals:</strong> Encapsulation, Classes & Objects. <strong>Patterns:</strong> Singleton, Factory, Observer, Strategy (coming soon). <strong>SOLID:</strong> SRP, OCP, LSP, ISP, DIP (coming soon).',
          },
          {
            title: 'Mindset',
            content:
              'OOP is about managing complexity. Focus on why classes and access modifiers exist—not just how to use them.',
          },
          {
            title: 'Analogue Tools',
            content:
              'Keep a notebook for diagrams and definitions. Sketching object relationships makes the concepts stick.',
          },
          {
            title: 'Ready to Start',
            content:
              'Begin with Classes & Objects, then move to Encapsulation to learn how to protect and structure data.',
          },
        ],
      },
    },
  ],
};
