document.addEventListener('DOMContentLoaded', () => {
    const todoCard = document.querySelector('[data-testid="test-todo-card"]');
    const statusElement = document.querySelector('[data-testid="test-todo-status"]');
    const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
    const timeRemainingElement = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const dueDateElement = document.querySelector('[data-testid="test-todo-due-date"]');
    const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
    const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 2);
    dueDate.setHours(14, 0, 0, 0);

    // Update Due Date Display to match the dynamic date
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    dueDateElement.textContent = `Due ${dueDate.toLocaleDateString('en-US', options)}`;
    dueDateElement.setAttribute('datetime', dueDate.toISOString());

    /**
     * Calculates and updates the human-readable time remaining.
     */
    function updateTimeRemaining() {
        const now = new Date();
        const diffInMs = dueDate - now;

        let timeText = "";

        if (diffInMs <= 0) {
            const absDiff = Math.abs(diffInMs);
            const overdueSeconds = Math.floor(absDiff / 1000);
            const overdueMinutes = Math.floor(overdueSeconds / 60);
            const overdueHours = Math.floor(overdueMinutes / 60);
            const overdueDays = Math.floor(overdueHours / 24);

            if (overdueMinutes < 2) {
                timeText = "Due now!";
            } else if (overdueHours < 1) {
                timeText = `Overdue by ${overdueMinutes} minutes`;
            } else if (overdueHours < 24) {
                timeText = `Overdue by ${overdueHours} hour${overdueHours === 1 ? '' : 's'}`;
            } else {
                timeText = `Overdue by ${overdueDays} day${overdueDays === 1 ? '' : 's'}`;
            }
        } else {
            const diffInSeconds = Math.floor(diffInMs / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);

            if (diffInDays > 1) {
                timeText = `Due in ${diffInDays} days`;
            } else if (diffInDays === 1) {
                timeText = "Due tomorrow";
            } else if (diffInHours >= 1) {
                timeText = `Due in ${diffInHours} hour${diffInHours === 1 ? '' : 's'}`;
            } else if (diffInMinutes >= 1) {
                timeText = `Due in ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'}`;
            } else {
                timeText = "Due now!";
            }
        }

        timeRemainingElement.textContent = timeText;
    }

    /**
     * Handles the completion toggle.
     */
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            todoCard.classList.add('completed');
            statusElement.textContent = 'Done';
            statusElement.style.color = '#10b981'; // Success Green
        } else {
            todoCard.classList.remove('completed');
            statusElement.textContent = 'Pending';
            statusElement.style.color = 'var(--accent)';
        }
    });

    // Action Handlers
    editBtn.addEventListener('click', () => {
        console.log("Edit requested for task:", document.querySelector('[data-testid="test-todo-title"]').textContent);
    });

    deleteBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this task?")) {
            console.log("Delete confirmed");
            todoCard.style.opacity = '0';
            todoCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                alert("Task deleted (simulated)");
                todoCard.style.opacity = '1';
                todoCard.style.transform = 'scale(1)';
            }, 300);
        }
    });

    // Initial updates
    updateTimeRemaining();

    // Update every 30 seconds for a more responsive feel
    setInterval(updateTimeRemaining, 30000);
});
