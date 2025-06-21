import { useData } from '@/context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Box
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const Dashboard = () => {
  const { excelFiles, charts } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for showing all charts vs recent charts
  const [showAllCharts, setShowAllCharts] = useState(false);

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

      {/* About Vizora Analytics - Enhanced with Theory */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-500 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">About Vizora Analytics</CardTitle>
              <p className="text-sm text-gray-500">Understanding Data Visualization & Analytics</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Theory Section */}
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              Data Analytics Theory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">📊 Data Visualization Principles</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Effective data visualization follows key principles: <strong>Clarity</strong> (clear, readable charts), 
                  <strong> Accuracy</strong> (truthful representation), <strong>Efficiency</strong> (convey maximum information with minimum effort), 
                  and <strong>Beauty</strong> (aesthetically pleasing design).
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The right chart type depends on your data structure and the story you want to tell. 
                  Bar charts for comparisons, line charts for trends, pie charts for proportions, 
                  and scatter plots for correlations.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">🔍 Statistical Analysis</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Our platform uses advanced statistical methods including <strong>Descriptive Statistics</strong> 
                  (mean, median, standard deviation), <strong>Correlation Analysis</strong> (relationships between variables), 
                  and <strong>Trend Analysis</strong> (pattern identification over time).
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We also implement <strong>Data Quality Checks</strong> to ensure accuracy, 
                  <strong> Outlier Detection</strong> for identifying anomalies, and 
                  <strong> Predictive Analytics</strong> for forecasting trends.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Fast Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Lightning-fast data analysis using optimized algorithms</p>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                • Parallel processing<br/>
                • Memory optimization<br/>
                • Caching strategies
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Secure & Private</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Enterprise-grade security for your sensitive data</p>
              <div className="text-xs text-green-600 dark:text-green-400">
                • End-to-end encryption<br/>
                • GDPR compliance<br/>
                • Secure data centers
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Multiple Charts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Comprehensive visualization library for all data types</p>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                • 2D & 3D visualizations<br/>
                • Interactive charts<br/>
                • Custom styling
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Smart Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">AI-powered analytics for deeper understanding</p>
              <div className="text-xs text-orange-600 dark:text-orange-400">
                • Pattern recognition<br/>
                • Anomaly detection<br/>
                • Predictive modeling
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
