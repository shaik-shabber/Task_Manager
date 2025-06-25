import { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import DeleteConfirmModal from '../components/Tasks/DeleteConfirmModal';
import { Plus, Search, Filter } from 'lucide-react';

const TasksPage = () => {
  const { tasks, createTask, updateTask, deleteTask } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editingTask) {
        // Use _id here
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (task) => {
    setDeletingTask(task);
  };

  const confirmDelete = async () => {
    if (deletingTask) {
      setLoading(true);
      try {
        // Use _id here
        await deleteTask(deletingTask._id);
        setDeletingTask(null);
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h1>
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field pl-10"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="input-field pl-10"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {(searchTerm || filterStatus !== 'all' || filterPriority !== 'all') && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterPriority('all');
              }}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Delete Confirmation Modal */}
      {deletingTask && (
        <DeleteConfirmModal
          task={deletingTask}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingTask(null)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default TasksPage;
