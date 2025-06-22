import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import ThemeToggle from './ThemeToggle';
import { BarChart3, Sparkles } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-white/30 dark:border-gray-700/30 shadow-lg transition-all duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-1 h-full bg-gradient-to-b from-transparent via-indigo-400/20 to-transparent animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-0 w-1 h-full bg-gradient-to-b from-transparent via-pink-400/20 to-transparent animate-pulse delay-1500"></div>
      </div>

      <div className="relative px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center gap-6">
            {/* Enhanced Logo - Clickable */}
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={handleLogoClick}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Vizora Analytics
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Excel Data Visualization Platform
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Theme Toggle and User */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-sm"></div>
              <div className="relative">
                <ThemeToggle />
              </div>
            </div>

            {/* User Info */}
            <div className="hidden sm:block">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  {user?.role}
                </p>
              </div>
            </div>

            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50"></div>
      </div>
    </header>
  );
};

export default Header;
