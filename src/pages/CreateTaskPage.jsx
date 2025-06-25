import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import TaskForm from '../components/Tasks/TaskForm';
import { ArrowLeft } from 'lucide-react';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { createTask } = useTask();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createTask(formData);
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Tasks</span>
        </button>
      </div>

      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Task
        </h1>
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreateTaskPage;