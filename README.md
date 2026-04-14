# HNG Stage 1A Todo Card

A responsive and accessible todo item card built with HTML, CSS, and JavaScript for the HNG Frontend Stage 1A task.

---

## Live Demo

[Live Demo](https://iibrahimx.github.io/hng-stage0-todo-card/)

---

## Repository

[GitHub Repository](https://github.com/iibrahimx/hng-stage0-todo-card)

---

## Features

- Semantic and accessible HTML structure
- Responsive layout for mobile and desktop
- Dynamic time remaining updates every 30 seconds
- Overdue state handling
- Expand and collapse for long descriptions
- Task status dropdown with Pending, In Progress, and Done states
- Checkbox synced with task status
- Edit form with Save and Cancel actions
- Delete action with confirmation prompt
- Priority badge and visual indicator
- Keyboard focus states for interactive elements
- Required `data-testid` attributes for automated testing

---

## Technologies Used

- HTML
- CSS
- JavaScript

---

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/iibrahimx/hng-stage0-todo-card.git
```

2. Open the project folder:

```bash
cd hng-stage0-todo-card
```

3. Open the `index.html` file in your browser.

---

## What Changed From Stage 0

- Added a task status dropdown
- Added support for Pending, In Progress, and Done states
- Synced the checkbox with task status
- Added an edit form with title, description, priority, and due date fields
- Added Save and Cancel functionality
- Added delete confirmation before removing the card
- Added expand and collapse for long descriptions
- Added overdue handling and completed state text
- Added more visual feedback for priority and task states

---

## Accessibility Notes

- Used semantic HTML elements such as `<article>`, `<time>`, `<button>`, `<form>`, `<label>`, and `<select>`
- Added visible keyboard focus states for buttons, inputs, and select fields
- Kept labels connected to form inputs
- Used `aria-expanded` for edit and expand toggle states
- Preserved all required `data-testid` attributes from Stage 0 and Stage 1A

---

## Decisions Made

- Used plain HTML, CSS, and JavaScript because the task is still small enough not to require a framework
- Used a shared JavaScript state object to keep the card content and UI in sync
- Kept the edit form hidden until needed to prevent the UI from being jumbled
- Hid the normal card content while editing to make the form easier to use
- Used small helper functions for rendering and event handling to keep the code easier to follow
- Kept the design simple and close to the task requirements

---

## Trade-offs

- The project still uses a single todo card instead of multiple cards because that is what the task required
- Delete removes the card immediately after confirmation instead of storing it elsewhere
- Data is not saved after page refresh because local storage was not required
- The project does not include automated tests in order to stay focused on the main task requirements

---

## Author

Ibrahim
