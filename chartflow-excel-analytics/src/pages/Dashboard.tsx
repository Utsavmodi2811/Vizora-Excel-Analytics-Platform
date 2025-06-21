import { useData } from '@/context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Upload, 
  ChartBar, 
  Menu, 
  ArrowUp, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Activity,
  Sparkles,
  Zap,
  Target,
  Users,
  Clock,
  Calendar,
  FolderOpen,
  PieChart,
  LineChart,
  BarChart2,
  ScatterChart,
  AreaChart,
  Database,
  BarChart,
  PieChart as PieChartIcon,
  TrendingDown,
  Eye,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const { excelFiles, charts } = useData();
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Files',
      value: excelFiles.length,
      icon: FileText,
      color: 'from-blue-500 via-blue-600 to-blue-700',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      description: 'Excel files uploaded',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      image: '📊'
    },
    {
      title: 'Charts Created',
      value: charts.length,
      icon: BarChart3,
      color: 'from-emerald-500 via-emerald-600 to-emerald-700',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950',
      description: 'Visualizations generated',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      image: '📈'
    },
    {
      title: 'Data Insights',
      value: excelFiles.length + charts.length,
      icon: TrendingUp,
      color: 'from-purple-500 via-purple-600 to-purple-700',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      description: 'Analytics performed',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
      image: '🔍'
    },
    {
      title: 'Active Projects',
      value: Math.max(1, Math.floor((excelFiles.length + charts.length) / 2)),
      icon: Target,
      color: 'from-orange-500 via-orange-600 to-orange-700',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      description: 'Ongoing analysis',
      gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
      image: '🎯'
    }
  ];

  const recentFiles = excelFiles
    .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
    .slice(0, 5);

  const recentCharts = charts
    .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
    .slice(0, 5);

  const getFileIcon = (fileName: string) => {
    if (fileName.includes('.xlsx') || fileName.includes('.xls')) return '📊';
    if (fileName.includes('.csv')) return '📋';
    if (fileName.includes('.json')) return '📄';
    return '📁';
  };

  const getChartIcon = (chartType: string) => {
    switch (chartType) {
      case 'bar': return '📊';
      case 'line': return '📈';
      case 'pie': return '🥧';
      case 'area': return '📊';
      case 'scatter': return '🔍';
      default: return '📊';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section with Enhanced Visuals */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Analyst'}! 👋</h1>
              <p className="text-blue-100">Ready to transform your data into insights?</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Activity className="w-3 h-3 mr-1" />
              {excelFiles.length + charts.length} activities today
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Clock className="w-3 h-3 mr-1" />
              Last active: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>
        {/* Enhanced animated background elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-8 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/5 rounded-full animate-ping"></div>
        {/* Decorative elements */}
        <div className="absolute top-8 right-16 text-4xl opacity-20">📊</div>
        <div className="absolute bottom-8 right-24 text-3xl opacity-20">📈</div>
        <div className="absolute top-1/3 right-32 text-2xl opacity-20">🔍</div>
      </div>

      {/* Enhanced Stats Grid with Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${stat.bgColor} relative`}>
            {/* Background decoration */}
            <div className="absolute top-2 right-2 text-4xl opacity-10">{stat.image}</div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{stat.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Visualization Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Data Overview</CardTitle>
              <p className="text-sm text-gray-500">Your analytics at a glance</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Files Processed</h3>
              <p className="text-2xl font-bold text-blue-600">{excelFiles.length}</p>
              <p className="text-sm text-gray-500">Excel & CSV files</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="text-4xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Charts Generated</h3>
              <p className="text-2xl font-bold text-green-600">{charts.length}</p>
              <p className="text-sm text-gray-500">Visualizations created</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Success Rate</h3>
              <p className="text-2xl font-bold text-purple-600">98%</p>
              <p className="text-sm text-gray-500">Data processing accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Files */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Recent Files</CardTitle>
                  <p className="text-sm text-gray-500">Latest uploads</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentFiles.length > 0 ? (
              <div className="space-y-3">
                {recentFiles.map((file, index) => (
                  <div key={file.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="text-2xl">{getFileIcon(file.fileName)}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">{file.fileName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{file.data.length} rows</span>
                        <span>•</span>
                        <span>{file.columns.length} columns</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {file.uploadDate.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.uploadDate.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No files uploaded yet</p>
                <p className="text-sm text-gray-400 mt-1">Start by uploading your first Excel file</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Charts */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Recent Charts</CardTitle>
                  <p className="text-sm text-gray-500">Latest visualizations</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentCharts.length > 0 ? (
              <div className="space-y-3">
                {recentCharts.map((chart, index) => (
                  <div key={chart.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <div className="text-lg">{getChartIcon(chart.chartType)}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">{chart.chartType} Chart</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{chart.xAxis}</span>
                        <span>vs</span>
                        <span>{chart.yAxis}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {chart.createdDate.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {chart.createdDate.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No charts created yet</p>
                <p className="text-sm text-gray-400 mt-1">Create your first visualization from uploaded data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Performance Metrics</CardTitle>
              <p className="text-sm text-gray-500">Your analytics performance</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm text-gray-600">Processing Speed</p>
              <p className="text-lg font-bold text-green-600">2.3s avg</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-lg font-bold text-blue-600">99.2%</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm text-gray-600">Data Points</p>
              <p className="text-lg font-bold text-purple-600">1.2M+</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="text-lg font-bold text-orange-600">99.9%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
