# Job Tracker (Vanilla JavaScript)

## Overview

Job Tracker is a simple job application tracking web app built with **vanilla JavaScript**, without frameworks.

The project is part of a study path focused on strengthening core JavaScript skills (state management, DOM manipulation, event handling) while producing a **clean, portfolio-ready application**.
The goal is not only to build a working app, but to design it with clear structure, predictable behavior, and documented decisions.

---

## Features

**Currently implemented (V1):**

* Create, read, update and delete job applications
* Edit applications via HTML modal form (no `prompt()`)
* Filter applications by search term and status
* Sort applications by company, status, or date (ascending / descending)
* Global “reset view” to restore default UI state
* Persistent storage using `localStorage`
* UI states for loading, ready, and empty results
* Client-side input validation using HTML constraints and JavaScript
* Defensive handling of edge cases (empty results, corrupted data)

---

## Architecture

The application follows a **simple state-driven architecture** implemented in plain JavaScript.

* **Application state** is stored as an array of objects representing job applications.
* A single **render function** is responsible for updating the DOM based on the current view.
* **Derived views** (filtered or sorted lists) are computed without mutating the base state.
* User interactions (add, edit, delete, filter, sort, reset) update the state and trigger a re-render.
* **Persistence** is handled via `localStorage`, keeping the application fully client-side.
* Dates are normalized to ISO format (`YYYY-MM-DD`) to ensure reliable sorting and consistency.

The project intentionally avoids frameworks to keep the focus on JavaScript fundamentals and explicit control over state and UI flow.

---

## Design decisions

Key design choices were made consciously to support learning and maintainability:

* **No frameworks**: to focus on core JavaScript concepts instead of abstractions.
* **Single source of truth**: application state is never mutated during rendering or filtering.
* **Derived views for filtering and sorting**: avoids hidden side effects and keeps logic predictable.
* **Single global reset**: simplifies the UI in V1, with a documented UX trade-off.
* **HTML modal instead of `prompt()`**: improves user experience and allows structured validation.
* **ISO date format**: ensures correct comparisons and future backend compatibility.
* **Progressive versions (V1 → V2 → V3)**: features first, architecture later, backend last.
* **Validation** is handled entirely in JavaScript to ensure UX consistency and control flow.

---

## Security notes (planned / learning goals)

This project is also used as a learning ground for client-side security concepts:

* Input validation (length limits, required fields, date sanity checks)
* Whitelist for status values (reject values outside allowed options)
* Normalize and trim user input (e.g. company and role fields)
* Safe rendering: never inject user input via `innerHTML` (use `textContent`)
* Defensive programming: handle corrupted `localStorage` and unexpected data shapes
* Basic anti-abuse UX (prevent duplicate submissions / repeated clicks)
* Learn and document advanced web security concepts (XSS risks, DOM-based injection patterns)
* Explore Content Security Policy (CSP): document how it works and how to test it locally

---

## Todo / Roadmap

### Planned next steps (V1)

* ✅ Replace `alert()` with inline form feedback (non-blocking, accessible messages)
* ✅ Refactor edit modal event handling (remove `once: true`, use persistent handlers and explicit dialog control)
* ✅ Export and import applications as JSON

* UX review: clarify reset behavior (currently a single global “Reset view” button resets filters and sorting)
* UI states: loading and empty states refinement
* Minor code cleanup (naming consistency, smaller functions, clearer variable scope)
* Extract constants (storage key, status list)
* Improve UI and styling (responsive layout, accessibility, visual hierarchy)
* Add favicon

### Potential extensions (post-V1 ideas)

* Dashboard with charts (e.g. Chart.js)
* PDF / CSV export
* Advanced search (tags, multiple criteria)
* Application timeline view
* Follow-up reminders

### V2 – Technical evolution (planned)

* Refactor JavaScript architecture into ES modules (`ui.js`, `filters.js`, `storage.js`)
* Improve separation of concerns and state handling
* Introduce basic automated testing for critical pure functions
* Explore more robust input validation strategies (custom validation or libraries such as Zod)
* Improve error handling and resilience
* Optional performance optimizations (debounce / throttle)

### V3 – Full-stack version (planned)

* Backend implementation using PHP and MySQL
* REST-style API for CRUD operations
* Replace `localStorage` with server-side persistence
* Database schema design and migrations
* Server-side validation and sanitization
* Basic authentication (optional, learning-oriented)
* Standardized API error handling
* Reuse the same frontend logic with a different data layer


## License

This project is publicly available for **portfolio and educational purposes only**.

The source code may be viewed and studied, but **may not be used, copied, modified, or
redistributed** without explicit permission from the author.

See the `LICENSE` file for full details.