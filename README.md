# Habit Tracker Plugin for Obsidian

A plugin for Obsidian that helps you track your habits with a beautiful GitHub-style contribution tracker.

## Features

- **GitHub-style tracker**: Visualize your habit progress with a familiar contribution grid
- **Multiple habits**: Track as many habits as you want
- **Simple configuration**: Define your habits in a markdown file
- **Click to toggle**: Click any day to mark it as complete or incomplete
- **Persistent data**: Your habit data is saved automatically

## How to Use

### 1. Create a Habits File

Create a markdown file (e.g., `habits.md`) in your vault with a list of habits you want to track. You can use any of these formats:

```markdown
- Exercise
- Read for 30 minutes
- Meditate
- Drink 8 glasses of water
```

Or with checkboxes:

```markdown
- [ ] Exercise
- [ ] Read for 30 minutes
- [ ] Meditate
```

Or numbered lists:

```markdown
1. Exercise
2. Read for 30 minutes
3. Meditate
```

### 2. Configure the Plugin

1. Open the plugin settings
2. Set the path to your habits file (e.g., `habits.md`)

### 3. Open the Habit Tracker

Click the calendar icon in the left ribbon, or use the command palette to open "Open Habit Tracker".

### 4. Track Your Habits

- The tracker shows the last 365 days for each habit
- Click on any day to toggle it between complete (green) and incomplete (gray)
- Today's date is highlighted with a border

## Installation

### Manual Installation

1. Download `main.js`, `manifest.json`, and `styles.css`
2. Create a folder called `habit-tracker` in your vault's `.obsidian/plugins/` directory
3. Copy the downloaded files into that folder
4. Reload Obsidian
5. Enable the plugin in Settings → Community Plugins

## Development

To build the plugin:

```bash
npm install
npm run build
```

To watch for changes during development:

```bash
npm run dev
```

## License

MIT
