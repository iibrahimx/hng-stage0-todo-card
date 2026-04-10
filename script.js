const todoCard = document.getElementById("todo-card");
const completeToggle = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]',
);
const tosoStat = document.querySelector('[data-testid="test-todo-status"]');
const dueDateElem = document.querySelector(
  '[data-testid="test-todo-due-date"]',
);
const timeRemainingElem = document.querySelector(
  '[data-testid="test-todo-time-remaining"]',
);
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector(
  '[data-testid="test-todo-delete-button"]',
);

const initialStatTxt = tosoStat.textContent.trim();
const dueDate = new Date(dueDateElem.getAttribute("datetime"));

function updateCompletionState() {
  if (completeToggle.checked) {
    todoCard.classList.add("completed");
    tosoStat.textContent = "Done";
  } else {
    todoCard.classList.remove("completed");
    tosoStat.textContent = initialStatTxt;
  }
}

function getTimeRemainingText(targetDate) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (Math.abs(difference) < minute) {
    return "Due now!";
  }

  if (difference > 0) {
    const daysLeft = Math.ceil(difference / day);
    const hoursLeft = Math.ceil(difference / hour);

    if (daysLeft === 1) {
      return "Due tomorrow";
    }

    if (daysLeft > 1) {
      return `Due in ${daysLeft} days`;
    }

    return `Due in ${hoursLeft} hours`;
  }

  const overdueDifference = Math.abs(difference);
  const overdueDays = Math.floor(overdueDifference / day);
  const overdueHours = Math.floor(overdueDifference / hour);

  if (overdueDays >= 1) {
    return `Overdue by ${overdueDays} day${overdueDays > 1 ? "s" : ""}`;
  }

  return `Overdue by ${overdueHours} hour${overdueHours > 1 ? "s" : ""}`;
}

function updateTimeRemaining() {
  timeRemainingElem.textContent = getTimeRemainingText(dueDate);
}

completeToggle.addEventListener("change", updateCompletionState);

editBtn.addEventListener("click", () => {
  console.log("Edit clicked");
});

deleteBtn.addEventListener("click", () => {
  alert("Delete clicked");
});

updateCompletionState();
updateTimeRemaining();

setInterval(updateTimeRemaining, 30000);
