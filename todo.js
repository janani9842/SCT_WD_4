const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for tasks
let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push(task);
    res.status(201).send('Task added');
  } else {
    res.status(400).send('Task is required');
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  if (taskId >= 0 && taskId < tasks.length) {
    tasks.splice(taskId, 1);
    res.status(200).send('Task deleted');
  } else {
    res.status(404).send('Task not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
