import { NavLink, useLocation } from 'react-router-dom';
import { Home, Plus, List, BarChart3 } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard', exact: true },
    { to: '/tasks', icon: List, label: 'All Tasks', exact: true },
    { to: '/tasks/new', icon: Plus, label: 'Create Task' },
    { to: '/priorities', icon: BarChart3, label: 'Priority Board' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);

            const Icon = item.icon;

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
