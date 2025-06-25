import { useTask } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';

const Dashboard = () => {
  const { tasks } = useTask();
  const { user } = useAuth();

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const overdueTasks = tasks.filter(task => 
    task.status === 'pending' && isPast(new Date(task.dueDate))
  );
  const todayTasks = tasks.filter(task => 
    isToday(new Date(task.dueDate)) && task.status === 'pending'
  );
  const tomorrowTasks = tasks.filter(task => 
    isTomorrow(new Date(task.dueDate)) && task.status === 'pending'
  );

  const stats = [
    {
      title: 'Total Tasks',
      value: tasks.length,
      icon: Calendar,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Completed',
      value: completedTasks.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Pending',
      value: pendingTasks.length,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Overdue',
      value: overdueTasks.length,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  const upcomingTasks = [...todayTasks, ...tomorrowTasks].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-primary-100">
          Here's an overview of your tasks and productivity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className={`card ${stat.bgColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.textColor}`}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upcoming Tasks */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Upcoming Tasks
          </h2>
          
          {upcomingTasks.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming tasks</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isToday(new Date(task.dueDate)) ? 'Today' : 
                       isTomorrow(new Date(task.dueDate)) ? 'Tomorrow' :
                       format(new Date(task.dueDate), 'MMM dd')}
                    </p>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Priority Distribution
          </h2>
          
          <div className="space-y-4">
            {['high', 'medium', 'low'].map((priority) => {
              const priorityTasks = tasks.filter(task => task.priority === priority);
              const percentage = tasks.length > 0 ? (priorityTasks.length / tasks.length) * 100 : 0;
              
              return (
                <div key={priority} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {priority} Priority
                    </span>
                    <span className="text-sm text-gray-500">
                      {priorityTasks.length} tasks
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        priority === 'high' ? 'bg-red-500' :
                        priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
