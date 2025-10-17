import { HabitData } from './types';

export class HabitDataStore {
  private data: HabitData = {};
  private saveCallback: () => Promise<void>;

  constructor(saveCallback: () => Promise<void>) {
    this.saveCallback = saveCallback;
  }

  loadData(data: HabitData): void {
    this.data = data || {};
  }

  getData(): HabitData {
    return this.data;
  }

  toggleHabit(habitName: string, date: string): boolean {
    if (!this.data[habitName]) {
      this.data[habitName] = {};
    }

    const currentValue = this.data[habitName][date] || false;
    this.data[habitName][date] = !currentValue;

    this.saveCallback();

    return this.data[habitName][date];
  }

  isHabitCompleted(habitName: string, date: string): boolean {
    return this.data[habitName]?.[date] || false;
  }

  getHabitStreak(habitName: string): number {
    if (!this.data[habitName]) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = this.formatDate(checkDate);

      if (this.data[habitName][dateStr]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
