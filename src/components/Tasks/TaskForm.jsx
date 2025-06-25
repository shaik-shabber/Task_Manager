import { useState, useEffect } from 'react';
import { Calendar, FileText, Flag, Type } from 'lucide-react';

const TaskForm = ({ task, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        priority: task.priority || 'medium'
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Include _id during edit for clarity
    const payload = task?._id ? { ...formData, _id: task._id } : formData;
    onSubmit(payload);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Task Title
        </label>
        <div className="relative">
          <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field pl-10"
            placeholder="Enter task title"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field pl-10 resize-none"
            placeholder="Enter task description"
            required
          />
        </div>
      </div>

      {/* Due Date & Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <div className="relative">
            <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="input-field pl-10"
              required
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </button>
      </div>

    </form>
  );
};

export default TaskForm;
