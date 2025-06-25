import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard'; 
import TasksPage from './pages/TasksPage';
import CreateTaskPage from './pages/CreateTaskPage';
import TaskDetailPage from './pages/TaskDetailPage';
import PriorityBoardPage from './pages/PriorityBoardPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/auth" />;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <AuthPage />;
  }

  return (
    <TaskProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/new" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/priorities" element={<PriorityBoardPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </TaskProvider>
  );
};

function App() {
  // Initialize demo user and tasks
  const initializeDemoData = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    // Add demo user if not exists
    if (!users.find(u => u.email === 'demo@taskflow.com')) {
      const demoUser = {
        id: 'demo-user-1',
        name: 'Demo User',
        email: 'demo@taskflow.com',
        password: 'demo123',
        role: 'user',
        createdAt: new Date().toISOString()
      };
      users.push(demoUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Add demo tasks
      const demoTasks = [
        {
          id: 'task-1',
          title: 'Complete project proposal',
          description: 'Draft and finalize the project proposal for the new client. Include timeline, budget, and deliverables.',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          priority: 'high',
          status: 'pending',
          assignedTo: 'demo-user-1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'task-2',
          title: 'Review team performance',
          description: 'Conduct quarterly performance reviews for all team members and provide feedback.',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          priority: 'medium',
          status: 'pending',
          assignedTo: 'demo-user-1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'task-3',
          title: 'Update website content',
          description: 'Refresh the homepage content and update the about us section with new team photos.',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          priority: 'low',
          status: 'completed',
          assignedTo: 'demo-user-1',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'task-4',
          title: 'Prepare monthly report',
          description: 'Compile monthly analytics and prepare comprehensive report for stakeholders.',
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          priority: 'high',
          status: 'pending',
          assignedTo: 'demo-user-1',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem('tasks', JSON.stringify([...tasks, ...demoTasks]));
    }
  };

  // Initialize demo data on app start
  initializeDemoData();

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;