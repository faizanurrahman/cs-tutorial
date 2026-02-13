
import {
  AfterContentInit,
  Component,
  contentChildren
} from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [],
  template: `
    <div
      class="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
    >
      <!-- Tab Headers -->
      <div
        class="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
      >
        @for (tab of tabComponents(); track tab.label()) {
          <button
            (click)="selectTab(tab)"
            [class.border-b-2]="tab.active()"
            [class.border-brand-500]="tab.active()"
            [class.text-brand-600]="tab.active()"
            [class.dark:text-brand-400]="tab.active()"
            [class.text-gray-600]="!tab.active()"
            [class.dark:text-gray-400]="!tab.active()"
            class="px-4 py-2 text-sm font-medium transition-colors
                   hover:text-brand-600 dark:hover:text-brand-400
                   hover:bg-gray-100 dark:hover:bg-gray-700/50
                   -mb-px relative"
          >
            {{ tab.label() }}
          </button>
        }
      </div>

      <!-- Tab Content -->
      <div class="p-4 bg-white dark:bg-gray-800">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TabGroupComponent implements AfterContentInit {
  readonly tabComponents = contentChildren(TabComponent);

  ngAfterContentInit() {
    const tabs = this.tabComponents();
    if (tabs.length > 0) {
      this.selectTab(tabs[0]);
    }
  }

  selectTab(selectedTab: TabComponent) {
    this.tabComponents().forEach((tab) => tab.active.set(tab === selectedTab));
  }
}
