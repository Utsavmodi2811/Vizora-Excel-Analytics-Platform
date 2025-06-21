import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../components/ui/use-toast';
import { Loader2, Users, UserCheck, Shield, AlertTriangle, BarChart2, FileUp, BarChart3, PieChart, LineChart, ScatterChart, AreaChart, Radar, Circle, Layers3, TrendingUp, Activity, Database, User, Crown, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ChartContainer, ChartTooltip, ChartLegend } from '../components/ui/chart';
import * as RechartsPrimitive from 'recharts';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { ResponsiveContainer } from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
  lastActive: string;
  isCurrentlyActive: boolean;
  createdAt: string;
  registrationDate: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    blockedUsers: 0
  });
  const { toast } = useToast();
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [chartView, setChartView] = useState<'pie' | 'bar' | 'scroll'>('pie');
  const [activePie, setActivePie] = useState<number | null>(null);
  const [animateStats, setAnimateStats] = useState(false);
  
  // New state for user management
  const [userListTab, setUserListTab] = useState<'admin' | 'user'>('user');
  const [showAllUsers, setShowAllUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        console.log('Users data:', data);
        
        const usersArray = Array.isArray(data.users) ? data.users : [];
        setUsers(usersArray);
        
        const totalUsers = usersArray.length;
        const activeUsers = usersArray.filter(u => u.isCurrentlyActive).length;
        const adminUsers = usersArray.filter(u => u.role === 'admin').length;
        const blockedUsers = usersArray.filter(u => u.isBlocked).length;
        
        setStats({
          totalUsers,
          activeUsers,
          adminUsers,
          blockedUsers
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive"
        });
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch dashboard stats');
        const data = await response.json();
        setDashboardStats(data.stats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard stats",
          variant: "destructive"
        });
      } finally {
        setDashboardLoading(false);
      }
    };
    fetchDashboardStats();
  }, [toast]);

  useEffect(() => {
    // Trigger stats animation after data loads
    if (!loading && !dashboardLoading) {
      const timer = setTimeout(() => setAnimateStats(true), 300);
      return () => clearTimeout(timer);
    }
  }, [loading, dashboardLoading]);

  const toggleUserBlock = async (userId: string, isBlocked: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/block`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ isBlocked })
      });

      if (!response.ok) throw new Error('Failed to update user');
      
      setUsers(users.map(u => 
        u.id === userId ? { ...u, isBlocked } : u
      ));

      toast({
        title: "Success",
        description: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive"
      });
    }
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) throw new Error('Failed to update role');
      
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));

      // Auto-switch to the appropriate tab when role changes
      setUserListTab(newRole);
      
      // Reset view all state when switching tabs
      setShowAllUsers(false);

      toast({
        title: "Success",
        description: `User role updated to ${newRole}. Switched to ${newRole} list.`
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-[400px] transform animate-in fade-in-0 zoom-in-95 duration-500">
          <CardHeader>
            <CardTitle className="text-center text-red-500 flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You don't have permission to access the admin dashboard.
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading || dashboardLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: UserCheck,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      title: "Admin Users",
      value: stats.adminUsers,
      icon: Shield,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      title: "Blocked Users",
      value: stats.blockedUsers,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard 🛡️</h1>
              <p className="text-blue-100">Manage users, monitor analytics, and oversee platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <Users className="w-3 h-3 inline mr-1" />
              {stats.totalUsers} users
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <Activity className="w-3 h-3 inline mr-1" />
              {stats.activeUsers} active
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <UserCheck className="w-3 h-3 inline mr-1" />
              {stats.adminUsers} admins
            </div>
          </div>
        </div>
        {/* Simple decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-8 text-3xl opacity-20">⚙️</div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="transform animate-in fade-in-0 slide-in-from-left-4 duration-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Type Usage Analytics */}
      {dashboardStats && dashboardStats.analysisTypes && (
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-200/50 dark:border-gray-800/50 w-full min-h-[420px] flex flex-col justify-between transform animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Chart Type Usage Analytics
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Shows how many times each chart type has been used by users in their data analyses. 
                This helps understand which visualization tools are most popular.
              </div>
            </div>
            <ToggleGroup type="single" value={chartView} onValueChange={v => v && setChartView(v as any)} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <ToggleGroupItem 
                value="pie" 
                aria-label="Pie Chart" 
                className={`rounded-md transition-all duration-200 ${
                  chartView === 'pie' 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <PieChart className="w-4 h-4 mr-1" /> Pie
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="bar" 
                aria-label="Bar Chart" 
                className={`rounded-md transition-all duration-200 ${
                  chartView === 'bar' 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 scale-105' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-1" /> Bar
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="scroll" 
                aria-label="Usage Cards" 
                className={`rounded-md transition-all duration-200 ${
                  chartView === 'scroll' 
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart2 className="w-4 h-4 mr-1" /> Usage Cards
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
          <div className="flex-1 flex items-center justify-center w-full">
            {(() => {
              const chartTypes = [
                { id: 'bar', label: 'Bar Chart', icon: BarChart3 },
                { id: 'line', label: 'Line Chart', icon: LineChart },
                { id: 'area', label: 'Area Chart', icon: AreaChart },
                { id: 'pie', label: 'Pie Chart', icon: PieChart },
                { id: 'scatter', label: 'Scatter Plot', icon: ScatterChart },
                { id: 'radar', label: 'Radar/Spider', icon: Radar },
                { id: 'bubble', label: 'Bubble Chart', icon: Circle },
                { id: 'histogram', label: 'Histogram', icon: BarChart2 },
                { id: '3d-bar', label: '3D Bar', icon: BarChart3 },
                { id: '3d-scatter', label: '3D Scatter', icon: ScatterChart },
                { id: '3d-surface', label: '3D Surface', icon: Layers3 },
                { id: '3d-line', label: '3D Line', icon: LineChart },
                { id: '3d-pie', label: '3D Pie', icon: PieChart }
              ];
              const colors = ['#2563eb', '#10b981', '#f59e42', '#ef4444', '#a21caf', '#06b6d4', '#fbbf24', '#eab308', '#84cc16', '#6366f1', '#f472b6', '#f87171', '#818cf8'];
              const backendMap = Object.fromEntries(dashboardStats.analysisTypes.map((at: any) => [at._id, at.count]));
              const totalAnalyses = dashboardStats.totalAnalyses;
              let data = chartTypes.map((ct) => ({ ...ct, value: backendMap[ct.id] || 0 }));
              const hasData = data.some(d => d.value > 0);
              if (!hasData) return (
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-2">No chart usage data yet.</div>
                  <div className="text-xs text-gray-500">When users create charts from their uploaded files, usage statistics will appear here.</div>
                </div>
              );
              const sortedData = [...data].sort((a, b) => b.value - a.value);
              if (chartView === 'pie') {
                return (
                  <div className="w-full flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={320} minWidth={320} minHeight={320}>
                      <RechartsPrimitive.PieChart>
                        <RechartsPrimitive.Pie
                          data={data}
                          dataKey="value"
                          nameKey="label"
                          cx="50%"
                          cy="50%"
                          outerRadius={140}
                          innerRadius={80}
                          isAnimationActive={true}
                          stroke="#fff"
                          strokeWidth={2}
                          onMouseEnter={(_, i) => setActivePie(i)}
                          onMouseLeave={() => setActivePie(null)}
                        >
                          {data.map((_, i) => (
                            <RechartsPrimitive.Cell
                              key={i}
                              fill={colors[i % colors.length]}
                              style={{
                                transition: 'all 0.3s ease-in-out',
                                filter: activePie === i ? 'drop-shadow(0 0 12px rgba(0,0,0,0.25)) brightness(1.1)' : undefined,
                                transform: activePie === i ? 'scale(1.15)' : 'scale(1)',
                                transformOrigin: 'center'
                              }}
                            />
                          ))}
                        </RechartsPrimitive.Pie>
                        <ChartTooltip />
                      </RechartsPrimitive.PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 w-full">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                        Chart Type Distribution (Total: {totalAnalyses} analyses)
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                        {data.map((item, i) => (
                          <div key={item.id} className="flex items-center gap-2 text-xs bg-gray-50 dark:bg-gray-800 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                            <div 
                              className="w-3 h-3 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: colors[i % colors.length] }}
                            />
                            <span className="text-gray-700 dark:text-gray-300 truncate">{item.label}</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100 ml-auto">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              if (chartView === 'bar') {
                return (
                  <div className="w-full flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={320} minWidth={320} minHeight={320}>
                      <RechartsPrimitive.BarChart data={data} barCategoryGap={10}>
                        <RechartsPrimitive.XAxis dataKey="label" fontSize={13} tick={{ fill: '#64748b' }} interval={0} angle={-18} textAnchor="end" height={70} />
                        <RechartsPrimitive.YAxis allowDecimals={false} fontSize={13} tick={{ fill: '#64748b' }} width={40} />
                        <RechartsPrimitive.Bar dataKey="value" radius={[10, 10, 0, 0]} isAnimationActive={true}>
                          {data.map((_, i) => (
                            <RechartsPrimitive.Cell key={i} fill={colors[i % colors.length]} style={{ transition: 'filter 0.2s, transform 0.2s' }} />
                          ))}
                        </RechartsPrimitive.Bar>
                        <ChartTooltip />
                      </RechartsPrimitive.BarChart>
                    </ResponsiveContainer>
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      Y-axis shows number of times each chart type was used
                    </div>
                  </div>
                );
              }
              if (chartView === 'scroll') {
                return (
                  <div className="w-full flex flex-col items-center">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                      Chart Usage Overview (Sorted by popularity)
                    </div>
                    <div className="overflow-x-auto w-full">
                      <div className="flex gap-4 min-w-max pb-2">
                        {sortedData.map((ct, index) => {
                          const count = ct.value;
                          const percentage = totalAnalyses > 0 ? Math.round((count / totalAnalyses) * 100) : 0;
                          const Icon = ct.icon;
                          const color = colors[index % colors.length];
                          return (
                            <div 
                              key={ct.id} 
                              className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center gap-2 min-w-[120px] transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-y-1"
                              style={{ borderLeft: `4px solid ${color}` }}
                            >
                              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12" style={{ backgroundColor: color }}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white text-xs text-center">{ct.label}</span>
                              <span className="text-xl font-bold text-gray-700 dark:text-gray-200">{count}</span>
                              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      Cards show usage count and percentage of total analyses
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}

      {/* User Management */}
      <Card className="transform animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500 shadow-xl border-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="w-6 h-6 text-blue-600" />
              User Management
            </CardTitle>
            
            {/* Tab Toggle */}
            <ToggleGroup type="single" value={userListTab} onValueChange={v => v && setUserListTab(v as 'admin' | 'user')} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <ToggleGroupItem 
                value="user" 
                aria-label="Users" 
                className={`rounded-md transition-all duration-200 flex items-center gap-2 ${
                  userListTab === 'user' 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="w-4 h-4" /> Users
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="admin" 
                aria-label="Admins" 
                className={`rounded-md transition-all duration-200 flex items-center gap-2 ${
                  userListTab === 'admin' 
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Crown className="w-4 h-4" /> Admins
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div>
              {/* Filter users based on selected tab */}
              {(() => {
                const filteredUsers = users.filter(u => u.role === userListTab);
                const displayUsers = showAllUsers ? filteredUsers : filteredUsers.slice(0, 4);
                const hasMoreUsers = filteredUsers.length > 4;
                
                return (
                  <>
                    <div className="w-full max-w-full">
                      <Table className="w-full">
                        <TableHeader>
                          <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                            <TableHead className="font-semibold w-[20%]">Name</TableHead>
                            <TableHead className="font-semibold w-[25%]">Email</TableHead>
                            <TableHead className="font-semibold w-[15%]">Role</TableHead>
                            <TableHead className="font-semibold w-[15%]">Join Date</TableHead>
                            <TableHead className="font-semibold w-[10%]">Status</TableHead>
                            <TableHead className="font-semibold w-[15%]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {displayUsers.map((user, index) => (
                            <TableRow 
                              key={user.id} 
                              className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.01] animate-in fade-in-0 slide-in-from-left-4 duration-500`}
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <TableCell className="font-medium truncate max-w-0">{user.name || 'Unnamed User'}</TableCell>
                              <TableCell className="text-gray-600 dark:text-gray-400 truncate max-w-0">{user.email || 'No email'}</TableCell>
                              <TableCell>
                                <Select
                                  defaultValue={user.role}
                                  onValueChange={(value: 'user' | 'admin') => updateUserRole(user.id, value)}
                                >
                                  <SelectTrigger className="w-full max-w-[80px] transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${user.isCurrentlyActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                  <span className="text-xs text-gray-600 dark:text-gray-300 hidden sm:inline">
                                    {user.isCurrentlyActive ? 'Online' : 'Offline'}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant={user.isBlocked ? "default" : "destructive"}
                                  size="sm"
                                  onClick={() => toggleUserBlock(user.id, !user.isBlocked)}
                                  className="transition-all duration-200 hover:scale-105 text-xs px-2 py-1"
                                >
                                  {user.isBlocked ? "Unblock" : "Block"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {/* View All / Show Less Button */}
                    {hasMoreUsers && (
                      <div className="flex justify-center mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setShowAllUsers(!showAllUsers)}
                          className="transition-all duration-200 hover:scale-105 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          {showAllUsers ? `Show Less (${filteredUsers.length} total)` : `View All (${filteredUsers.length} total)`}
                        </Button>
                      </div>
                    )}
                    
                    {/* Summary Info */}
                    <div className="mt-4 text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {displayUsers.length} of {filteredUsers.length} {userListTab === 'admin' ? 'administrators' : 'users'}
                        {!showAllUsers && hasMoreUsers && ` (${filteredUsers.length - 4} more hidden)`}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
