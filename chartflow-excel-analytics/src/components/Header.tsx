import { useAuth } from '../context/AuthContext';
import UserDropdown from './UserDropdown';
import ThemeToggle from './ThemeToggle';
import { BarChart2, FileSpreadsheet } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Enhanced Logo - Excel Analytics Theme */}
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="flex items-center justify-center">
                <BarChart2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Vizora Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Excel Data Visualization Platform
            </p>
          </div>
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
