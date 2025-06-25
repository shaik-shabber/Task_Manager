import { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import PriorityBoard from '../components/Tasks/PriorityBoard';
import TaskForm from '../components/Tasks/TaskForm';
import DeleteConfirmModal from '../components/Tasks/DeleteConfirmModal';
import { Plus } from 'lucide-react';

const PriorityBoardPage = () => {
  const { createTask, updateTask, deleteTask } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
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
        await deleteTask(deletingTask.id);
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
          <h1 className="text-3xl font-bold text-gray-900">Priority Board</h1>
          <p className="text-gray-600 mt-1">
            Organize tasks by priority and drag them between columns
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

      {/* Priority Board */}
      <PriorityBoard
        onEdit={handleEdit}
        onDelete={handleDelete}
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

export default PriorityBoardPage;