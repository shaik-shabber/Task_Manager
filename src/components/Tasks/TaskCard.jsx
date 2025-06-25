import { format } from 'date-fns';
import { Calendar, Clock, Edit, Trash2, CheckCircle, Circle } from 'lucide-react';
import { useTask } from '../../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { updateTask } = useTask();
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleStatusToggle = () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    updateTask(task._id, { status: newStatus });
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on action buttons
    if (e.target.closest('button')) return;
    navigate(`/tasks/${task._id}`);
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div 
      className="card cursor-pointer hover:shadow-lg transition-all duration-200 animate-fade-in"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : isOverdue 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {task.status === 'completed' ? 'Completed' : isOverdue ? 'Overdue' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStatusToggle();
          }}
          className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
            task.status === 'completed'
              ? 'text-green-700 bg-green-50 hover:bg-green-100'
              : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          {task.status === 'completed' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
          <span>{task.status === 'completed' ? 'Completed' : 'Mark Complete'}</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
          >
            <Edit className="h-4 w-4" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
