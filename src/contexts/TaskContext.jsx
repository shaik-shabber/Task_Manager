import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get auth headers with token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  // Load tasks when user changes
  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  // Fetch tasks from backend
  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        console.error('Failed to load tasks:', data.message);
      }
    } catch (err) {
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });
      const newTask = await res.json();
      if (res.ok) {
        setTasks((prev) => [...prev, newTask]);
        return newTask;
      } else {
        throw new Error(newTask.message || 'Failed to create task');
      }
    } catch (err) {
      console.error('Create task error:', err);
      return null;
    }
  };

  // Update existing task
  const updateTask = async (taskId, updates) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      const updatedTask = await res.json();
      if (res.ok) {
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? updatedTask : task))
        );
        return updatedTask;
      } else {
        throw new Error(updatedTask.message || 'Failed to update task');
      }
    } catch (err) {
      console.error('Update task error:', err);
      return null;
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
        return true;
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete task');
      }
    } catch (err) {
      console.error('Delete task error:', err);
      return false;
    }
  };

  // Helper functions
  const getTaskById = (taskId) =>
    tasks.find((task) => task._id === taskId);

  const getTasksByPriority = (priority) =>
    tasks.filter((task) => task.priority === priority);

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  const value = {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getTasksByPriority,
    getTasksByStatus,
    loadTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
