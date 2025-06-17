import { useAuth } from '../context/AuthContext';
import UserDropdown from './UserDropdown';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome back, {user?.name || 'User'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Transform your Excel data into beautiful visualizations
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
