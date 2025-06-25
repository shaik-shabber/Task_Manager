import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, CheckSquare } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <CheckSquare className="h-8 w-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {user?.name || user?.email}
              </span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;