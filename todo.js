const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const prioritySelect = document.getElementById('priority');
const themeToggle = document.getElementById('theme-toggle');
const taskProgress = document.getElementById('task-progress');

let tasks = [];

// Load tasks from localStorage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

// Add task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (taskText) {
    tasks.push({ text: taskText, priority, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span>${task.text} (${task.priority})</span>
      <button class="delete-btn" data-id="${index}">Delete</button>
    `;
    taskList.appendChild(li);
  });
  updateProgress();
}

// Delete task
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const taskId = e.target.getAttribute('data-id');
    tasks.splice(taskId, 1);
    saveTasks();
    renderTasks();
  }
});

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update progress bar
function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100 || 0;
  taskProgress.value = progress;
}

// Dark mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});
