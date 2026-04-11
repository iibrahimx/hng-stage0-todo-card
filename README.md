# HNG Stage 0 Todo Card

A simple, responsive, and accessible todo item card built with HTML, CSS, and JavaScript for the HNG Frontend Stage 0 task.

---

## Live Demo

[Live Demo](https://iibrahimx.github.io/hng-stage0-todo-card/)

---

## Repository

[GitHub Repository](https://github.com/iibrahimx/hng-stage0-todo-card)

---

## Features

- Semantic HTML structure
- Responsive layout for mobile and desktop
- Accessible checkbox, buttons, and keyboard focus states
- Dynamic time remaining updates every 30 seconds
- Status update when task is marked complete
- Edit and delete action buttons
- Required data-testid attributes for automated testing

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

## Decisions Made

- Used plain HTML, CSS, and JavaScript because the task is small and does not require a framework.
- Used semantic HTML elements such as `<article>`, `<time>`, `<button>`, `<label>`, and `<ul>` for accessibility and structure.
- Added `data-testid` attributes exactly as required for automated testing.
- Used a fixed due date and JavaScript to calculate the time remaining dynamically.
- Kept the design clean and responsive without overcomplicating the layout.

---

## Trade-offs

- The edit and delete buttons use simple placeholder actions instead of full functionality because this was acceptable in the task instructions.
- Basic tests were not added in order to keep the project lightweight and focused on the main requirements.

---

## Author

Ibrahim
