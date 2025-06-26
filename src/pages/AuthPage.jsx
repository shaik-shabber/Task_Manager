import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import { CheckSquare } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const handleDemoLogin = async () => {
    await login('demo@taskflow.com', 'demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CheckSquare className="h-12 w-12 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          <p className="text-gray-600">
            Streamline your productivity with intelligent task management
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {isLogin ? (
            <LoginForm
              onToggleForm={() => setIsLogin(false)}
              onDemoLogin={handleDemoLogin}
            />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>

        {/* Demo Credentials Display */}
        <div className="mt-6 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-gray-600 text-center mb-2">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="text-xs text-gray-500 text-center">
            Email: demo@taskflow.com | Password: demo@123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
