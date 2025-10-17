export interface HabitTrackerSettings {
  habitsFilePath: string;
}

export interface HabitData {
  [habitName: string]: {
    [date: string]: boolean;
  };
}

export const DEFAULT_SETTINGS: HabitTrackerSettings = {
  habitsFilePath: 'habits.md'
};
