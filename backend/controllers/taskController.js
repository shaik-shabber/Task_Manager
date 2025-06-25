const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('Create Task error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error('Get Tasks error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get task by ID (only if it belongs to the user)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error('Get Task by ID error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update task (only if it belongs to the user)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error('Update Task error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete task (only if it belongs to the user)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete Task error:', err);
    res.status(500).json({ message: err.message });
  }
};
