
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../components/layout/main-layout/main-layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MainLayoutComponent],
  template: `
    <app-main-layout>
      <!-- Hero Section -->
      <div class="text-center py-16">
        <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Master Computer Science Fundamentals
        </h1>
        <p
          class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Interactive tutorials covering OOP, Data Structures, Algorithms, and
          System Design with visualizations and live code examples.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <a
            routerLink="/1-oop/index"
            class="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white
                    rounded-lg font-medium transition-colors"
          >
            Start Learning
          </a>
          <a
            href="https://github.com/yourusername/cs-tutorial-platform"
            target="_blank"
            class="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300
                    dark:hover:bg-gray-600 text-gray-900 dark:text-white
                    rounded-lg font-medium transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <div
          class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div
            class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">OOP Concepts</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Classes, inheritance, polymorphism, and design patterns.
          </p>
        </div>

        <div
          class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div
            class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Data Structures</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Arrays, linked lists, trees, graphs, and hash tables.
          </p>
        </div>

        <div
          class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div
            class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Algorithms</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Sorting, searching, dynamic programming, and greedy algorithms.
          </p>
        </div>

        <div
          class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div
            class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-orange-600 dark:text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">System Design</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Scalability, load balancing, caching, and databases.
          </p>
        </div>
      </div>
    </app-main-layout>
  `,
})
export default class HomePageComponent {}
