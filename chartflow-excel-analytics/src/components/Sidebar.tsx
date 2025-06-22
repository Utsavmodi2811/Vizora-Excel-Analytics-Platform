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
    ...(user?.role === 'admin' ? [{ name: 'Admin', href: '/admin', icon: Users }] : []),
  ];

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 shadow-xl transition-all duration-700 ease-in-out flex flex-col border-r border-gray-200 dark:border-gray-700",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "border-b border-gray-200 dark:border-gray-700 transition-all duration-700 ease-in-out",
        isCollapsed ? "p-3" : "p-4"
      )}>
        {!isCollapsed ? (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Enhanced Logo - Excel Analytics Theme */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  <div className="flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="transition-all duration-700 ease-in-out">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Vizora
            </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Analytics</p>
              </div>
            </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
          >
              <div className="transition-transform duration-500 ease-in-out">
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* Enhanced Logo - Centered with better spacing */}
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <div className="flex items-center justify-center">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              {/* Tooltip for collapsed state */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                Vizora Analytics
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group hover:scale-110"
            >
              <div className="transition-transform duration-500 ease-in-out group-hover:scale-110">
                <ArrowRight size={18} className="text-gray-600 dark:text-gray-300" />
              </div>
          </button>
        </div>
        )}
      </div>

      <nav className={cn(
        "flex-1 transition-all duration-700 ease-in-out",
        isCollapsed ? "p-2" : "p-4"
      )}>
        <ul className={cn(
          "transition-all duration-700 ease-in-out",
          isCollapsed ? "space-y-2" : "space-y-2"
        )}>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href === '/dashboard' && location.pathname === '/');
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center transition-all duration-500 ease-in-out group relative overflow-hidden",
                    isCollapsed 
                      ? "px-2 py-3 rounded-lg justify-center" 
                      : "px-3 py-3 rounded-xl",
                    isActive
                      ? isCollapsed 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                        : "bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <div className={cn(
                    "transition-all duration-300 ease-in-out",
                    isActive ? "scale-110" : "group-hover:scale-105"
                  )}>
                  <item.icon 
                      size={isCollapsed ? 20 : 22} 
                    className={cn(
                        "transition-all duration-300 flex-shrink-0",
                        isActive 
                          ? isCollapsed 
                            ? "text-white" 
                            : "text-blue-600 dark:text-blue-400" 
                          : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    )} 
                  />
                  </div>
                  
                  {!isCollapsed && (
                    <span className={cn(
                      "ml-3 font-medium truncate transition-all duration-500 ease-in-out",
                      isActive ? "text-blue-700 dark:text-blue-300" : ""
                    )}>
                      {item.name}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 transition-all duration-700 ease-in-out">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Vizora Analytics v1.0
          </div>
        </div>
      )}

      {/* Collapsed footer */}
      {isCollapsed && (
        <div className="p-2 border-t border-gray-200 dark:border-gray-700 transition-all duration-700 ease-in-out">
          <div className="flex justify-center">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
              <span className="text-xs font-bold text-white">V</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
