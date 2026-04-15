const todoMain = document.querySelector(".todo-main");
const todoFooter = document.querySelector(".todo-footer");
const todoCard = document.getElementById("todo-card");
const completeToggle = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]',
);
const todoTitle = document.querySelector('[data-testid="test-todo-title"]');
const todoDescription = document.querySelector(
  '[data-testid="test-todo-description"]',
);
const todoPriority = document.querySelector(
  '[data-testid="test-todo-priority"]',
);
const todoPriorityIndicator = document.querySelector(
  '[data-testid="test-todo-priority-indicator"]',
);
const todoStatus = document.querySelector('[data-testid="test-todo-status"]');
const statusControl = document.querySelector(
  '[data-testid="test-todo-status-control"]',
);
const dueDateElem = document.querySelector(
  '[data-testid="test-todo-due-date"]',
);
const timeRemainingElem = document.querySelector(
  '[data-testid="test-todo-time-remaining"]',
);
const overdueIndicator = document.querySelector(
  '[data-testid="test-todo-overdue-indicator"]',
);
const collapsibleSection = document.querySelector(
  '[data-testid="test-todo-collapsible-section"]',
);
const expandToggle = document.querySelector(
  '[data-testid="test-todo-expand-toggle"]',
);
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector(
  '[data-testid="test-todo-delete-button"]',
);
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
const editTitleInput = document.querySelector(
  '[data-testid="test-todo-edit-title-input"]',
);
const editDescriptionInput = document.querySelector(
  '[data-testid="test-todo-edit-description-input"]',
);
const editPrioritySelect = document.querySelector(
  '[data-testid="test-todo-edit-priority-select"]',
);
const editDueDateInput = document.querySelector(
  '[data-testid="test-todo-edit-due-date-input"]',
);
const cancelBtn = document.querySelector(
  '[data-testid="test-todo-cancel-button"]',
);

// Create state object
const todoState = {
  title: todoTitle.textContent.trim(),
  description: todoDescription.textContent.trim(),
  priority: todoPriority.textContent.trim(),
  status: todoStatus.textContent.trim(),
  dueDate: dueDateElem.getAttribute("datetime"),
  isEditing: false,
  isExpanded: false,
};

const DESCRIPTION_PREVIEW_LENGTH = 120;

function formatDisplayDate(dateString) {
  const date = new Date(dateString);

  return `🗓 Due ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

function formatDateTimeLocal(dateString) {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

function isDescriptionLong(description) {
  return description.trim().length > DESCRIPTION_PREVIEW_LENGTH;
}

function getTimeRemainingData(dateString) {
  const now = new Date();
  const targetDate = new Date(dateString);
  const difference = targetDate.getTime() - now.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (difference >= 0) {
    if (difference >= day) {
      const daysLeft = Math.ceil(difference / day);
      return {
        text: `Due in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`,
        overdue: false,
      };
    }

    if (difference >= hour) {
      const hoursLeft = Math.ceil(difference / hour);
      return {
        text: `Due in ${hoursLeft} hour${hoursLeft > 1 ? "s" : ""}`,
        overdue: false,
      };
    }

    const minutesLeft = Math.max(1, Math.ceil(difference / minute));
    return {
      text: `Due in ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}`,
      overdue: false,
    };
  }

  const overdueDifference = Math.abs(difference);

  if (overdueDifference >= day) {
    const overdueDays = Math.floor(overdueDifference / day);
    return {
      text: `Overdue by ${overdueDays} day${overdueDays > 1 ? "s" : ""}`,
      overdue: true,
    };
  }

  if (overdueDifference >= hour) {
    const overdueHours = Math.floor(overdueDifference / hour);
    return {
      text: `Overdue by ${overdueHours} hour${overdueHours > 1 ? "s" : ""}`,
      overdue: true,
    };
  }

  const overdueMinutes = Math.max(1, Math.floor(overdueDifference / minute));
  return {
    text: `Overdue by ${overdueMinutes} minute${overdueMinutes > 1 ? "s" : ""}`,
    overdue: true,
  };
}

function renderContent() {
  todoTitle.textContent = todoState.title;
  todoDescription.textContent = todoState.description;
  todoPriority.textContent = todoState.priority;
  todoStatus.textContent = todoState.status;
  statusControl.value = todoState.status;

  dueDateElem.setAttribute("datetime", todoState.dueDate);
  dueDateElem.textContent = formatDisplayDate(todoState.dueDate);

  completeToggle.checked = todoState.status === "Done";
}

function renderTime() {
  if (todoState.status === "Done") {
    timeRemainingElem.textContent = "Completed";
    overdueIndicator.textContent = "";
    overdueIndicator.classList.remove("visible");
    todoCard.classList.remove("overdue");
    return;
  }

  const timeData = getTimeRemainingData(todoState.dueDate);

  timeRemainingElem.textContent = timeData.text;
}

function renderDescription() {
  const longDescription = isDescriptionLong(todoState.description);

  if (!longDescription) {
    collapsibleSection.classList.remove("collapsed");
    expandToggle.classList.add("hidden");
    expandToggle.setAttribute("aria-expanded", "false");
    return;
  }

  expandToggle.classList.remove("hidden");

  if (todoState.isExpanded) {
    collapsibleSection.classList.remove("collapsed");
    expandToggle.textContent = "Show less";
    expandToggle.setAttribute("aria-expanded", "true");
  } else {
    collapsibleSection.classList.add("collapsed");
    expandToggle.textContent = "Show more";
    expandToggle.setAttribute("aria-expanded", "false");
  }
}

function renderEditForm() {
  if (todoState.isEditing) {
    editForm.classList.remove("hidden");
    todoMain.classList.add("hidden");
    todoFooter.classList.add("hidden");
    editBtn.setAttribute("aria-expanded", "true");
  } else {
    editForm.classList.add("hidden");
    todoMain.classList.remove("hidden");
    todoFooter.classList.remove("hidden");
    editBtn.setAttribute("aria-expanded", "false");
  }

  editTitleInput.value = todoState.title;
  editDescriptionInput.value = todoState.description;
  editPrioritySelect.value = todoState.priority;
  editDueDateInput.value = formatDateTimeLocal(todoState.dueDate);
}

function renderCardState() {
  todoCard.classList.toggle("completed", todoState.status === "Done");
  todoCard.classList.toggle("in-progress", todoState.status === "In Progress");

  todoCard.classList.remove("low-priority", "medium-priority", "high-priority");

  const priorityClass = `${todoState.priority.toLowerCase()}-priority`;
  todoCard.classList.add(priorityClass);
}

function renderTodo() {
  renderContent();
  renderDescription();
  renderEditForm();
  renderCardState();
  renderTime();
}

completeToggle.addEventListener("change", handleCheckboxChange);
statusControl.addEventListener("change", handleStatusChange);
expandToggle.addEventListener("click", handleExpandToggle);
editBtn.addEventListener("click", handleEditClick);
cancelBtn.addEventListener("click", handleCancelClick);
editForm.addEventListener("submit", handleEditFormSubmit);
deleteBtn.addEventListener("click", handleDeleteClick);

function handleCheckboxChange() {
  if (completeToggle.checked) {
    todoState.status = "Done";
  } else if (todoState.status === "Done") {
    todoState.status = "Pending";
  }

  renderTodo();
}

function handleStatusChange() {
  todoState.status = statusControl.value;
  renderTodo();
}

function handleExpandToggle() {
  todoState.isExpanded = !todoState.isExpanded;
  renderTodo();
}

function handleEditClick() {
  todoState.isEditing = true;
  renderTodo();
  editTitleInput.focus();
}

function handleCancelClick() {
  todoState.isEditing = false;
  renderTodo();
  editBtn.focus();
}

function handleEditFormSubmit(event) {
  event.preventDefault();

  todoState.title = editTitleInput.value.trim();
  todoState.description = editDescriptionInput.value.trim();
  todoState.priority = editPrioritySelect.value;
  todoState.dueDate = new Date(editDueDateInput.value).toISOString();
  todoState.isEditing = false;
  todoState.isExpanded = false;

  renderTodo();
  editBtn.focus();
}

function handleDeleteClick() {
  const shouldDelete = window.confirm(
    "Are you sure you want to delete this todo card?",
  );

  if (!shouldDelete) {
    return;
  }

  // todoCard.remove();
  window.alert("Todo Card deleted");
}

setInterval(() => {
  renderTime();
}, 30000);

renderTodo();
