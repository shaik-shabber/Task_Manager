import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import TaskForm from '../components/Tasks/TaskForm';
import DeleteConfirmModal from '../components/Tasks/DeleteConfirmModal';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  Flag, 
  Clock, 
  CheckCircle, 
  Circle 
} from 'lucide-react';

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Task Not Found</h2>
        <p className="text-gray-600 mb-6">The task you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/tasks')}
          className="btn-primary"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  const handleEdit = async (formData) => {
    setLoading(true);
    try {
      // Use _id here
      await updateTask(task._id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Use _id here
      await deleteTask(task._id);
      navigate('/tasks');
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    setLoading(true);
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await updateTask(task._id, { status: newStatus });
    } catch (error) {
      console.error('Error toggling status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Task</span>
          </button>
        </div>

        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Task
          </h1>
          <TaskForm
            task={task}
            onSubmit={handleEdit}
            onCancel={() => setIsEditing(false)}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Tasks</span>
        </button>
      </div>

      {/* Task Details */}
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className={`text-3xl font-bold ${
                task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
                {task.priority} priority
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleStatusToggle}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                task.status === 'completed'
                  ? 'text-green-700 bg-green-50 hover:bg-green-100'
                  : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {task.status === 'completed' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
              <span>{task.status === 'completed' ? 'Completed' : 'Mark Complete'}</span>
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              <Edit className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Task Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">Due Date</p>
              <p className={`text-lg ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                {isOverdue && <span className="text-sm ml-2">(Overdue)</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Flag className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">Priority</p>
              <p className="text-lg text-gray-900 capitalize">{task.priority}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Clock className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">Status</p>
              <p className={`text-lg font-medium ${
                task.status === 'completed' ? 'text-green-600' : 
                isOverdue ? 'text-red-600' : 'text-blue-600'
              }`}>
                {task.status === 'completed' ? 'Completed' : 
                 isOverdue ? 'Overdue' : 'Pending'}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <span className="font-medium">Created:</span>{' '}
              {format(new Date(task.createdAt), 'MMM dd, yyyy at h:mm a')}
            </div>
            <div>
              <span className="font-medium">Last updated:</span>{' '}
              {format(new Date(task.updatedAt), 'MMM dd, yyyy at h:mm a')}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          task={task}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default TaskDetailPage;
