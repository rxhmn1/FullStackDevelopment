/* ==========================================================
   FOCUSTRACK - TASK MANAGEMENT WITH DUE DATES
   Features:
   - Add Task
   - Edit Task
   - Delete Task
   - Complete / Undo
   - Search Tasks
   - Due Dates
   - Overdue Detection
   - Local Storage Persistence
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ================= ELEMENTS =================
    const taskList = document.querySelector('.task-list');
const searchInput = document.getElementById('searchInput');

// Task Form Elements
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskDueDateInput = document.getElementById('taskDueDate');
    // Statistics cards
    const statValues = document.querySelectorAll('.stat-card h2');
    const totalTasksEl = statValues[0];
    const completedTasksEl = statValues[1];
    const pendingTasksEl = statValues[2];
    const productivityEl = statValues[3];

    // ================= DATA =================
    let tasks = JSON.parse(localStorage.getItem('focusTrackTasks')) || [];

    // ================= INITIALIZE =================
    renderTasks();
    updateStats();

    // ================= SEARCH =================
    if (searchInput) {
        searchInput.addEventListener('input', renderTasks);
    }
// ================= ADD TASK FORM =================
if (taskForm) {
    // Set today's date as default
    taskDueDateInput.value = getTodayDate();

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();
        const dueDate = taskDueDateInput.value;

        if (!title || !dueDate) return;

        const task = {
            id: Date.now(),
            title,
            description,
            dueDate,
            completed: false
        };

        // Add new task at the top
        tasks.unshift(task);

        // Save and refresh UI
        saveTasks();
        renderTasks();
        updateStats();

        // Reset form
        taskForm.reset();
        taskDueDateInput.value = getTodayDate();
    });
}
    // ================= RENDER TASKS =================
    function renderTasks() {
        taskList.innerHTML = '';

        const searchTerm = searchInput
            ? searchInput.value.toLowerCase()
            : '';

        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)
        );

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="task-item glass">
                    <h3>No Matching Tasks</h3>
                    <p>No tasks match your current search.</p>
                </div>
            `;
            return;
        }

        filteredTasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-item glass';

            if (task.completed) {
                taskCard.style.opacity = '0.75';
            }

            const overdue = isOverdue(task.dueDate) && !task.completed;

            taskCard.innerHTML = `
                <h3 style="${task.completed ? 'text-decoration: line-through;' : ''}">
                    ${escapeHTML(task.title)}
                </h3>

                <p>
                    ${escapeHTML(task.description || 'No description provided.')}
                </p>

                <div style="margin: 0.75rem 0;">
                    <span class="text-muted">
                        📅 Due: ${escapeHTML(task.dueDate)}
                    </span>
                    ${
                        overdue
                            ? '<span style="color: #ef4444; font-weight: 600; margin-left: 1rem;">Overdue</span>'
                            : ''
                    }
                </div>

                <div style="margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <button class="btn btn-secondary complete-btn">
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>

                    <button class="btn btn-primary edit-btn">
                        Edit
                    </button>

                    <button class="btn btn-secondary delete-btn">
                        Delete
                    </button>
                </div>
            `;

            // Complete / Undo
            taskCard.querySelector('.complete-btn')
                .addEventListener('click', () => {
                    task.completed = !task.completed;
                    saveTasks();
                    renderTasks();
                    updateStats();
                });

            // Edit
            taskCard.querySelector('.edit-btn')
                .addEventListener('click', () => {
                    const newTitle = prompt(
                        'Edit task title:',
                        task.title
                    );
                    if (!newTitle || !newTitle.trim()) return;

                    const newDescription = prompt(
                        'Edit task description:',
                        task.description
                    );

                    const newDueDate = prompt(
                        'Edit due date (YYYY-MM-DD):',
                        task.dueDate
                    );
                    if (!newDueDate || !newDueDate.trim()) return;

                    task.title = newTitle.trim();
                    task.description = (newDescription || '').trim();
                    task.dueDate = newDueDate.trim();

                    saveTasks();
                    renderTasks();
                    updateStats();
                });

            // Delete
            taskCard.querySelector('.delete-btn')
                .addEventListener('click', () => {
                    if (!confirm(`Delete "${task.title}"?`)) return;

                    tasks = tasks.filter(
                        t => t.id !== task.id
                    );

                    saveTasks();
                    renderTasks();
                    updateStats();
                });

            taskList.appendChild(taskCard);
        });
    }

    // ================= UPDATE STATISTICS =================
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const productivity =
            total === 0
                ? 0
                : Math.round((completed / total) * 100);

        totalTasksEl.textContent = total;
        completedTasksEl.textContent = completed;
        pendingTasksEl.textContent = pending;
        productivityEl.textContent = `${productivity}%`;
    }

    // ================= OVERDUE CHECK =================
    function isOverdue(dateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dueDate = new Date(dateString);
        dueDate.setHours(0, 0, 0, 0);

        return dueDate < today;
    }

    // ================= TODAY DATE =================
    function getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    // ================= SAVE TASKS =================
    function saveTasks() {
        localStorage.setItem(
            'focusTrackTasks',
            JSON.stringify(tasks)
        );
    }

    // ================= ESCAPE HTML =================
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});