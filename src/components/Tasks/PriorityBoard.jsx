import { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import TaskCard from './TaskCard';
import { ArrowUpCircle, ArrowRightCircle, ArrowDownCircle } from 'lucide-react';

const PriorityBoard = ({ onEdit, onDelete }) => {
  const { tasks, updateTask } = useTask();
  const [draggedTask, setDraggedTask] = useState(null);

  const priorities = [
    { 
      key: 'high', 
      label: 'High Priority', 
      color: 'bg-red-50 border-red-200', 
      icon: ArrowUpCircle,
      iconColor: 'text-red-600'
    },
    { 
      key: 'medium', 
      label: 'Medium Priority', 
      color: 'bg-yellow-50 border-yellow-200', 
      icon: ArrowRightCircle,
      iconColor: 'text-yellow-600'
    },
    { 
      key: 'low', 
      label: 'Low Priority', 
      color: 'bg-green-50 border-green-200', 
      icon: ArrowDownCircle,
      iconColor: 'text-green-600'
    }
  ];

  const getTasksByPriority = (priority) => {
    return tasks.filter(task => task.priority === priority);
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newPriority) => {
    e.preventDefault();
    if (draggedTask && draggedTask.priority !== newPriority) {
      updateTask(draggedTask._id, { priority: newPriority });
    }
    setDraggedTask(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {priorities.map((priority) => {
        const priorityTasks = getTasksByPriority(priority.key);
        const Icon = priority.icon;
        
        return (
          <div
            key={priority.key}
            className={`rounded-xl border-2 border-dashed p-6 min-h-96 ${priority.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, priority.key)}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Icon className={`h-6 w-6 ${priority.iconColor}`} />
              <h3 className="text-lg font-semibold text-gray-900">{priority.label}</h3>
              <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                {priorityTasks.length}
              </span>
            </div>

            <div className="space-y-4">
              {priorityTasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <Icon className="h-8 w-8 mx-auto opacity-50" />
                  </div>
                  <p className="text-gray-500 text-sm">No {priority.key} priority tasks</p>
                </div>
              ) : (
                priorityTasks.map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="cursor-move"
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PriorityBoard;
