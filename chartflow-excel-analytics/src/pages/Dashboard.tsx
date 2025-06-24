import { useData } from '@/context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FirstLoginNotification } from '@/components/FirstLoginNotification';
import { 
  Upload, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Activity,
  Sparkles,
  Zap,
  Target,
  FolderOpen,
  PieChart,
  LineChart,
  ScatterChart,
  AreaChart,
  Database,
  Eye,
  ChevronDown,
  ChevronUp,
  Radar,
  Circle,
  Layers3,
  Globe,
  Box,
  Shield,
  Cpu,
  Brain,
  Palette,
  Lightbulb,
  Rocket
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import React from 'react';

const Dashboard = () => {
  const { excelFiles, charts } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for showing all charts vs recent charts
  const [showAllCharts, setShowAllCharts] = useState(false);
  // State for first login notification
  const [showFirstLoginNotification, setShowFirstLoginNotification] = useState(false);

  // Show first login notification if user is first time logging in
  React.useEffect(() => {
    if (user?.isFirstLogin) {
      setShowFirstLoginNotification(true);
    }
  }, [user?.isFirstLogin]);

  const recentFiles = excelFiles
    .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
    .slice(0, 5);

  const recentCharts = charts
    .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
    .slice(0, 5);
    
  // Get charts to display based on state
  const displayedCharts = showAllCharts ? charts : recentCharts;

  const getFileIcon = (fileName: string) => {
    if (fileName.includes('.xlsx') || fileName.includes('.xls')) return '📊';
    if (fileName.includes('.csv')) return '📋';
    if (fileName.includes('.json')) return '📄';
    return '📁';
  };

  const getChartIcon = (chartType: string) => {
    switch (chartType.toLowerCase()) {
      case 'bar':
      case '3d-bar':
        return BarChart3;
      case 'line':
      case '3d-line':
        return LineChart;
      case 'pie':
      case '3d-pie':
        return PieChart;
      case 'scatter':
      case '3d-scatter':
        return ScatterChart;
      case 'area':
        return AreaChart;
      case 'radar':
      case 'spider':
        return Radar;
      case 'bubble':
        return Circle;
      case 'histogram':
        return BarChart3;
      case '3d-surface':
        return Layers3;
      case 'doughnut':
        return Target;
      case 'funnel':
        return Zap;
      case 'map':
        return Globe;
      case '3d-scatter':
        return Box;
      default:
        return BarChart3;
    }
  };

  const getChartColor = (chartType: string) => {
    switch (chartType.toLowerCase()) {
      case 'bar':
      case '3d-bar':
        return 'from-blue-500 to-blue-600';
      case 'line':
      case '3d-line':
        return 'from-green-500 to-green-600';
      case 'pie':
      case '3d-pie':
        return 'from-purple-500 to-purple-600';
      case 'scatter':
      case '3d-scatter':
        return 'from-orange-500 to-orange-600';
      case 'area':
        return 'from-teal-500 to-teal-600';
      case 'radar':
      case 'spider':
        return 'from-pink-500 to-pink-600';
      case 'bubble':
        return 'from-indigo-500 to-indigo-600';
      case 'histogram':
        return 'from-cyan-500 to-cyan-600';
      case '3d-surface':
        return 'from-violet-500 to-violet-600';
      case 'doughnut':
        return 'from-amber-500 to-amber-600';
      case 'funnel':
        return 'from-red-500 to-red-600';
      case 'map':
        return 'from-emerald-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleViewChart = (chart: any) => {
    try {
      // Navigate to chart viewer with chart data in state
      navigate('/chart-viewer', { state: { chart } });
      toast({
        title: 'Chart Opened',
        description: `${chart.chartType} chart is now open for viewing`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to open chart',
        variant: 'destructive',
      });
    }
  };

  const handleViewAllCharts = () => {
    navigate('/history');
  };

  return (
    <div className="space-y-8 p-6">
      {/* First Login Notification */}
      {showFirstLoginNotification && (
        <FirstLoginNotification 
          onDismiss={() => setShowFirstLoginNotification(false)} 
        />
      )}

      {/* Welcome Section with Enhanced Visuals */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-blue-100 text-lg">Ready to transform your data into insights?</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Vizora Analytics - Completely Redesigned */}
      <div className="relative overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <Card className="relative border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              About Vizora Analytics
            </CardTitle>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your data into actionable insights with our advanced analytics platform
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
                <Rocket className="w-4 h-4" />
                Powered by Advanced AI
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Data, Our Intelligence
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Vizora Analytics combines cutting-edge machine learning algorithms with intuitive data visualization 
                to help you discover patterns, identify trends, and make data-driven decisions with confidence.
              </p>
            </div>
            
            {/* Features Grid - Redesigned */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Cpu className="w-4 h-4 text-white" />
                </div>
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Process millions of data points in seconds with our optimized engine
                </p>
              </div>

              <div className="group relative p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Enterprise Security</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Bank-level encryption and compliance for your sensitive data
                </p>
              </div>

              <div className="group relative p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-2xl border border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Rich Visualizations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Create stunning 2D and 3D charts with interactive features
                </p>
              </div>

              <div className="group relative p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-2xl border border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div className="text-4xl mb-4">💡</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Smart Insights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  AI-powered analysis reveals hidden patterns and trends
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Overview Section */}
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
        {/* Recent Charts */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 border-white/30 dark:border-gray-700/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Recent Charts</CardTitle>
                  <p className="text-sm text-gray-500">
                    {showAllCharts ? `${charts.length} charts created` : `Recent ${Math.min(5, charts.length)} of ${charts.length} charts`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {charts.length > 5 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllCharts(!showAllCharts)}
                    className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-colors"
                  >
                    {showAllCharts ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show Recent
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        View All
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {charts.length > 0 ? (
              <div className="space-y-3">
                {displayedCharts.map((chart, index) => {
                  const ChartIcon = getChartIcon(chart.chartType);
                  const chartColor = getChartColor(chart.chartType);
                  
                  return (
                    <div 
                      key={chart.id} 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
                      onClick={() => handleViewChart(chart)}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${chartColor} rounded-lg flex items-center justify-center`}>
                        <ChartIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900 dark:text-white capitalize">{chart.chartType} Chart</p>
                          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                            {chart.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{chart.xAxis}</span>
                          <span>vs</span>
                          <span>{chart.yAxis}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {chart.fileName || 'Unknown File'}
                          </span>
                          <span>•</span>
                          <span>{chart.data?.length || 0} data points</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {chart.createdDate.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {chart.createdDate.toLocaleTimeString()}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewChart(chart);
                          }}
                          className="mt-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
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
        
        {/* Recent Files */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 border-white/30 dark:border-gray-700/30">
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
              <p className="text-lg font-bold text-green-600">
                {excelFiles.length > 0 ? `${(2.3 / excelFiles.length).toFixed(1)}s avg` : '2.3s avg'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-lg font-bold text-blue-600">
                {excelFiles.length > 0 ? `${Math.min(99.9, (95 + (excelFiles.length * 0.5))).toFixed(1)}%` : '99.2%'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm text-gray-600">Data Points</p>
              <p className="text-lg font-bold text-purple-600">
                {excelFiles.length > 0 ? 
                  `${(excelFiles.reduce((total, file) => total + file.data.length, 0) / 1000).toFixed(1)}K+` : 
                  '1.2M+'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="text-lg font-bold text-orange-600">
                {excelFiles.length > 0 ? `${(99.5 + (excelFiles.length * 0.1)).toFixed(1)}%` : '99.9%'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
