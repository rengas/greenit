import { ItemView, WorkspaceLeaf } from 'obsidian';
import type HabitTrackerPlugin from './main';

export const VIEW_TYPE_HABIT_TRACKER = 'habit-tracker-view';

export class HabitTrackerView extends ItemView {
  plugin: HabitTrackerPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: HabitTrackerPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_HABIT_TRACKER;
  }

  getDisplayText(): string {
    return 'Habit Tracker';
  }

  getIcon(): string {
    return 'calendar-check';
  }

  async onOpen(): Promise<void> {
    await this.render();
  }

  async render(): Promise<void> {
    const container = this.containerEl.children[1] as HTMLElement;
    container.empty();
    container.addClass('habit-tracker-container');

    const habits = await this.plugin.habitParser.parseHabitsFromFile(
      this.plugin.settings.habitsFilePath
    );

    if (habits.length === 0) {
      container.createEl('div', {
        text: 'No habits found. Create a markdown file with a list of habits and configure the path in settings.',
        cls: 'no-habits-message'
      });
      return;
    }

    for (const habit of habits) {
      this.renderHabitSection(container, habit);
    }
  }

  private renderHabitSection(container: HTMLElement, habitName: string): void {
    const section = container.createEl('div', { cls: 'habit-section' });

    section.createEl('div', { text: habitName, cls: 'habit-name' });

    const grid = section.createEl('div', { cls: 'contribution-grid' });

    // Generate cells for the last 365 days (52 weeks)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start from 364 days ago to include today as the last cell
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateStr = this.formatDate(currentDate);

      const cell = grid.createEl('div', { cls: 'contribution-cell' });

      const isCompleted = this.plugin.dataStore.isHabitCompleted(habitName, dateStr);
      if (isCompleted) {
        cell.addClass('completed');
      }

      // Highlight today
      if (this.isSameDay(currentDate, today)) {
        cell.addClass('today');
      }

      cell.setAttribute('data-date', dateStr);
      cell.setAttribute('title', `${habitName} - ${dateStr}`);

      cell.addEventListener('click', () => {
        const newState = this.plugin.dataStore.toggleHabit(habitName, dateStr);
        if (newState) {
          cell.addClass('completed');
        } else {
          cell.removeClass('completed');
        }
      });
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  async onClose(): Promise<void> {
    // Cleanup if needed
  }
}
