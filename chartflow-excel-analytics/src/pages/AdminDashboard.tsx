import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../components/ui/use-toast';
import { Loader2, Users, UserCheck, Shield, AlertTriangle, BarChart2, FileUp } from 'lucide-react';
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
        
        // Access the users array from the response
        const usersArray = Array.isArray(data.users) ? data.users : [];
        setUsers(usersArray);
        
        // Calculate stats using the users array
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

      toast({
        title: "Success",
        description: `User role updated to ${newRole}`
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
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">You do not have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (dashboardLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: UserCheck,
      color: "text-green-500"
    },
    {
      title: "Admin Users",
      value: stats.adminUsers,
      icon: Shield,
      color: "text-purple-500"
    },
    {
      title: "Blocked Users",
      value: stats.blockedUsers,
      icon: AlertTriangle,
      color: "text-red-500"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* --- Admin Stats Cards --- */}
      {dashboardStats && (
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Total Files</div>
              <div className="text-2xl font-bold">{dashboardStats.totalFiles}</div>
            </div>
            <FileUp className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Total Analyses</div>
              <div className="text-2xl font-bold">{dashboardStats.totalAnalyses}</div>
            </div>
            <BarChart2 className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex items-center justify-between">
            <div>
              <div className="text-gray-500 text-sm">Total Users</div>
              <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      )}

      {/* --- Analysis Type Statistics --- */}
      {dashboardStats && dashboardStats.analysisTypes && dashboardStats.analysisTypes.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
          <div className="mb-6">
            <div className="text-lg font-semibold">Analysis Type Statistics</div>
            <div className="text-sm text-gray-500">Distribution of analysis types performed</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardStats.analysisTypes.map((at: any, index: number) => {
              const totalAnalyses = dashboardStats.totalAnalyses;
              const percentage = totalAnalyses > 0 ? Math.round((at.count / totalAnalyses) * 100) : 0;
              const colors = ['bg-emerald-500', 'bg-cyan-500', 'bg-pink-500', 'bg-yellow-500', 'bg-lime-500', 'bg-rose-500'];
              const color = colors[index % colors.length];
              
              return (
                <div key={at._id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${color}`}></div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {at._id ? at._id.charAt(0).toUpperCase() + at._id.slice(1) : 'Unknown'}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {at.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${color}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{percentage}%</span>
                    <span className="text-xs text-gray-500">of total analyses</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
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

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-center text-gray-500">No users found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Active Sessions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name || 'Unnamed User'}</TableCell>
                    <TableCell>{user.email || 'No email'}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={user.role}
                        onValueChange={(value: 'user' | 'admin') => updateUserRole(user.id, value)}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.isCurrentlyActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {user.isCurrentlyActive ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant={user.isBlocked ? "default" : "destructive"}
                          size="sm"
                          onClick={() => toggleUserBlock(user.id, !user.isBlocked)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
