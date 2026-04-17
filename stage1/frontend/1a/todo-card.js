document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let state = {
        title: "Architect Frontend Architecture",
        description: "Design and implement a testable, accessible, and responsive todo card component that captures the energy of a high-growth startup.",
        priority: "High",
        status: "Pending", // Pending, In Progress, Done
        dueDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // Default 2 days from now
        isExpanded: false,
        isEditing: false
    };

    // Store original state for cancel functionality
    let originalState = { ...state };

    // --- DOM Elements ---
    const elements = {
        card: document.querySelector('[data-testid="test-todo-card"]'),
        title: document.querySelector('[data-testid="test-todo-title"]'),
        description: document.querySelector('[data-testid="test-todo-description"]'),
        priorityBadge: document.querySelector('[data-testid="test-todo-priority"]'),
        priorityIndicator: document.querySelector('[data-testid="test-todo-priority-indicator"]'),
        statusDisplay: document.querySelector('[data-testid="test-todo-status"]'),
        statusControl: document.querySelector('[data-testid="test-todo-status-control"]'),
        completeToggle: document.querySelector('[data-testid="test-todo-complete-toggle"]'),
        dueDateDisplay: document.querySelector('[data-testid="test-todo-due-date"]'),
        timeRemaining: document.querySelector('[data-testid="test-todo-time-remaining"]'),
        overdueIndicator: document.querySelector('[data-testid="test-todo-overdue-indicator"]'),
        collapsibleSection: document.querySelector('[data-testid="test-todo-collapsible-section"]'),
        expandToggle: document.querySelector('[data-testid="test-todo-expand-toggle"]'),
        
        // Edit Mode Elements
        editBtn: document.querySelector('[data-testid="test-todo-edit-button"]'),
        editFormContainer: document.querySelector('[data-testid="test-todo-edit-form"]'),
        editTitleInput: document.querySelector('[data-testid="test-todo-edit-title-input"]'),
        editDescInput: document.querySelector('[data-testid="test-todo-edit-description-input"]'),
        editPrioritySelect: document.querySelector('[data-testid="test-todo-edit-priority-select"]'),
        editDueDateInput: document.querySelector('[data-testid="test-todo-edit-due-date-input"]'),
        saveBtn: document.querySelector('[data-testid="test-todo-save-button"]'),
        cancelBtn: document.querySelector('[data-testid="test-todo-cancel-button"]'),
        deleteBtn: document.querySelector('[data-testid="test-todo-delete-button"]')
    };

    // --- Core Functions ---

    function render() {
        // Update basic content
        elements.title.textContent = state.title;
        elements.description.textContent = state.description;
        elements.card.setAttribute('data-priority', state.priority);
        elements.priorityBadge.querySelector('.priority-text').textContent = state.priority;
        
        // Update Status
        elements.statusDisplay.textContent = state.status;
        elements.statusControl.value = state.status;
        elements.completeToggle.checked = state.status === 'Done';

        // Update Visual Classes
        elements.card.classList.toggle('completed', state.status === 'Done');
        elements.card.classList.toggle('in-progress', state.status === 'In Progress');
        
        // Update Due Date Display
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        elements.dueDateDisplay.textContent = `Due ${state.dueDate.toLocaleString('en-US', options)}`;
        elements.dueDateDisplay.setAttribute('datetime', state.dueDate.toISOString());

        // Update Expand/Collapse
        if (state.isExpanded) {
            elements.collapsibleSection.classList.remove('collapsed');
            elements.collapsibleSection.style.maxHeight = elements.collapsibleSection.scrollHeight + "px";
            elements.expandToggle.setAttribute('aria-expanded', 'true');
            elements.expandToggle.querySelector('span').textContent = 'Show Less';
        } else {
            elements.collapsibleSection.classList.add('collapsed');
            elements.collapsibleSection.style.maxHeight = '3rem';
            elements.expandToggle.setAttribute('aria-expanded', 'false');
            elements.expandToggle.querySelector('span').textContent = 'Show More';
        }

        // Update Edit Mode visibility
        if (state.isEditing) {
            elements.editFormContainer.classList.remove('hidden');
            elements.editTitleInput.value = state.title;
            elements.editDescInput.value = state.description;
            elements.editPrioritySelect.value = state.priority;
            
            // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
            const localDate = new Date(state.dueDate.getTime() - state.dueDate.getTimezoneOffset() * 60000);
            elements.editDueDateInput.value = localDate.toISOString().slice(0, 16);
            
            elements.editTitleInput.focus();
        } else {
            elements.editFormContainer.classList.add('hidden');
        }

        updateTimeRemaining();
    }

    function updateTimeRemaining() {
        if (state.status === 'Done') {
            elements.timeRemaining.textContent = "Completed";
            elements.overdueIndicator.classList.add('hidden');
            elements.card.classList.remove('overdue');
            return;
        }

        const now = new Date();
        const diffInMs = state.dueDate - now;
        const isOverdue = diffInMs < 0;
        const absDiff = Math.abs(diffInMs);

        // Granular time calculations
        const seconds = Math.floor(absDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let timeText = "";
        if (isOverdue) {
            if (days > 0) timeText = `Overdue by ${days} day${days === 1 ? '' : 's'}`;
            else if (hours > 0) timeText = `Overdue by ${hours} hour${hours === 1 ? '' : 's'}`;
            else timeText = `Overdue by ${minutes} minute${minutes === 1 ? '' : 's'}`;
            
            elements.overdueIndicator.classList.remove('hidden');
            elements.card.classList.add('overdue');
        } else {
            if (days > 0) timeText = `Due in ${days} day${days === 1 ? '' : 's'}`;
            else if (hours > 0) timeText = `Due in ${hours} hour${hours === 1 ? '' : 's'}`;
            else timeText = `Due in ${minutes} minute${minutes === 1 ? '' : 's'}`;
            
            elements.overdueIndicator.classList.add('hidden');
            elements.card.classList.remove('overdue');
        }

        elements.timeRemaining.textContent = timeText;
    }

    // --- Event Listeners ---

    // Expand / Collapse
    elements.expandToggle.addEventListener('click', () => {
        state.isExpanded = !state.isExpanded;
        render();
    });

    // Status Control (Dropdown)
    elements.statusControl.addEventListener('change', (e) => {
        state.status = e.target.value;
        render();
    });

    // Checkbox Toggle
    elements.completeToggle.addEventListener('change', (e) => {
        state.status = e.target.checked ? 'Done' : 'Pending';
        render();
    });

    // Edit Button
    elements.editBtn.addEventListener('click', () => {
        originalState = { ...state }; // Backup current state
        state.isEditing = true;
        render();
    });

    // Cancel Button
    elements.cancelBtn.addEventListener('click', () => {
        state = { ...originalState };
        state.isEditing = false;
        render();
        elements.editBtn.focus(); // Return focus
    });

    // Save Button / Form Submit
    document.getElementById('todo-edit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        state.title = elements.editTitleInput.value;
        state.description = elements.editDescInput.value;
        state.priority = elements.editPrioritySelect.value;
        state.dueDate = new Date(elements.editDueDateInput.value);
        state.isEditing = false;
        render();
        elements.editBtn.focus(); // Return focus
    });

    // Delete (Mock)
    elements.deleteBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this task?")) {
            elements.card.style.opacity = '0';
            elements.card.style.transform = 'translateY(20px)';
            setTimeout(() => alert("Task deleted (simulated)"), 300);
        }
    });

    // --- Initial Setup ---
    
    // Check if description is long enough to be collapsible
    if (state.description.length < 100) {
        elements.expandToggle.classList.add('hidden');
        elements.collapsibleSection.classList.remove('collapsed');
    }

    render();

    // Update every 30 seconds
    setInterval(updateTimeRemaining, 30000);
});
