import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Upload, 
  ChartBar, 
  Menu,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Home,
  History,
  Shield,
  Settings,
  Users,
  BarChart3,
  PieChart,
  TrendingUp,
  Crown,
  Database,
  FileText,
  BarChart,
  Sparkles,
  BarChart2,
  FileSpreadsheet
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload', href: '/upload', icon: Upload },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'History', href: '/history', icon: History },
    ...(user?.role === 'admin' ? [{ name: 'Admin', href: '/admin', icon: Crown }] : []),
  ];

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 shadow-xl transition-all duration-500 ease-in-out flex flex-col border-r border-gray-200 dark:border-gray-700",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Enhanced Logo - Excel Analytics Theme */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Vizora
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Analytics</p>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <div className="transition-transform duration-300 ease-in-out">
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Enhanced Logo - Centered */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="flex items-center justify-center">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <div className="transition-transform duration-300 ease-in-out">
                <ArrowRight size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href === '/dashboard' && location.pathname === '/');
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-xl transition-all duration-300 ease-in-out group relative overflow-hidden",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <div className={cn(
                    "transition-all duration-300 ease-in-out",
                    isActive ? "scale-110" : "group-hover:scale-105"
                  )}>
                    <item.icon 
                      size={22} 
                      className={cn(
                        "transition-all duration-300 flex-shrink-0",
                        isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      )} 
                    />
                  </div>
                  
                  {!isCollapsed && (
                    <span className={cn(
                      "ml-3 font-medium truncate transition-all duration-300",
                      isActive ? "text-blue-700 dark:text-blue-300" : ""
                    )}>
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Vizora Analytics v1.0
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
