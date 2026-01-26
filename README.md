# Job Tracker

A simple job application tracker built with vanilla JavaScript.

This project is part of a study path focused on improving JavaScript fundamentals and building a clean, portfolio-ready application without frameworks.

---

## Features

- Display a list of job applications
- Add new applications via a form
- Client-side validation of user input
- Dynamic UI updates based on application state

---

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom reset, minimal styling)
- Vanilla JavaScript (ES6+)
- Git & GitHub

---

## Key Concepts

- Application state managed as an array of objects
- Single render function to keep UI in sync with state
- Event-driven updates (form submission handling)
- Defensive validation in JavaScript, in addition to HTML validation

---

## How to run

Open `index.html` in a browser or serve the project through a local server (e.g. XAMPP).

---

## Project status

Work in progress.

Planned next steps:
- Replace prompt() editing with an HTML modal form (validated inputs for status/date)
- UX review: clarify reset behavior (currently a single global "Reset view" button resets filters and sorting; consider separating filter reset and sort reset or improving visual hierarchy)
- UI states: loading and empty states refinement
- Export and import applications as JSON

Security (planned):
- Input validation (length limits, required fields, date sanity checks)
- Whitelist for status values (reject anything outside allowed list)
- Normalize and trim user input (e.g. company/role)
- Safe rendering: never inject user input via innerHTML (use textContent)
- Defensive programming: handle corrupted localStorage / unexpected data shapes
- Basic anti-abuse: prevent duplicate submissions / double clicks
- Add a Content Security Policy (CSP) header (document how to test locally)
- Review for XSS risks and DOM-based injection patterns

- Minor code cleanup (naming consistency, smaller functions, where declare variables, etc)
- Extract constants (storage key, status list)
- Improve UI and styling
- Favicon