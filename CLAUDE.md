# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Simple Health Monitor** is a single-page web application for tracking daily health activities (walking steps and sleep hours). It's built with vanilla HTML, CSS, and JavaScript with no external dependencies or build process. Data is persisted locally using browser localStorage.

**See also**: `PRD.md` for detailed product requirements and feature scope.

## Quick Start

### Running the App
The app is a static web application with no build process. Simply open `index.html` in a browser:

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use a local server (recommended for testing)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Testing
There are no automated tests in this project. Manual testing is performed directly in the browser:
- Open the app in a modern browser (Chrome, Firefox, Safari, Edge)
- Test data entry: Submit the form with various step and sleep values
- Verify persistence: Refresh the page and confirm data loads
- Test progress visualization: Confirm progress bars animate smoothly and update correctly
- Test responsiveness: Test on mobile browsers and resize desktop browser

## Architecture

### File Structure
- `index.html` — Single page containing dashboard and form structure
- `script.js` — Application logic for data persistence, dashboard updates, and form handling
- `styles.css` — Styling for responsive layout and animations
- `PRD.md` — Product requirements document

### Data Model
- **Storage**: Browser localStorage with key `healthData`
- **Schema**: Object keyed by date string (from `new Date().toDateString()`), each containing `{ steps: number, sleep: number }`
- **Example**: `{ "Sat Apr 26 2026": { steps: 5000, sleep: 7.5 } }`
- **Daily Scope**: Data is loaded/saved per day; only today's data is displayed

### Key Functions (script.js)
- `loadData()` — Retrieves today's data from localStorage or returns defaults (0 steps, 0 sleep)
- `saveData(steps, sleep)` — Persists user input to localStorage and triggers dashboard update
- `updateDashboard()` — Renders progress bars and text labels based on current data
- Form submission handler — Validates input, saves data, clears form

### Progress Calculation
Progress bars are capped at 100% even if the user exceeds daily goals:
- Steps: `Math.min((steps / 10000) * 100, 100)`
- Sleep: `Math.min((sleep / 8) * 100, 100)`

## Development Notes

### Adding Features
- **Customizable goals**: Modify hardcoded values (10000 steps, 8 hours) in script.js and update HTML labels
- **Additional metrics**: Add new `.metric` divs to the dashboard in HTML; add corresponding data fields to the storage schema; extend `updateDashboard()` and form handling
- **Styling changes**: Update `styles.css` directly; the color scheme uses `#4caf50` (green) for progress and `#e0e0e0` (gray) for backgrounds

### Data Persistence
- localStorage is key-value and persists across sessions in the same browser
- Data is not synced across devices or browsers
- Clearing browser data will erase the health records
- No backup or export mechanism currently exists

### Browser Compatibility
The app uses only standard DOM APIs and does not require polyfills:
- localStorage API
- Event listeners
- CSS Flexbox

## Current Limitations & Future Enhancements
- **Fixed daily goals**: Hard-coded at 10,000 steps and 8 hours sleep
- **No historical trends**: Only today's data is displayed and accessible
- **No data export**: Records exist only in localStorage
- **No multi-device sync**: Each browser/device has its own data store

See `PRD.md` section 9 for planned enhancements (API integration, trends, customizable goals, data export).
