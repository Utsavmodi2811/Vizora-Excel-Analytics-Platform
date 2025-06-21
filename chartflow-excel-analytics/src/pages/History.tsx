import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  Download, 
  Eye, 
  Loader2, 
  BarChart3, 
  History as HistoryIcon,
  FileText,
  PieChart,
  TrendingUp,
  Calendar,
  HardDrive,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Clock,
  Database,
  Activity,
  ChevronDown,
  ChevronUp,
  LineChart,
  ScatterChart,
  AreaChart,
  Radar,
  Circle,
  Layers3,
  Target,
  Zap,
  Globe,
  Box
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const History = () => {
  const { excelFiles, charts, deleteFile, deleteChart, loadFileData, loading } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for showing all items vs recent items
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [showAllCharts, setShowAllCharts] = useState(false);

  // Get recent items (5 most recent)
  const recentFiles = excelFiles.slice(0, 5);
  const recentCharts = charts.slice(0, 5);
  
  // Get items to display based on state
  const displayedFiles = showAllFiles ? excelFiles : recentFiles;
  const displayedCharts = showAllCharts ? charts : recentCharts;

  const handleDeleteFile = async (id: string, fileName: string) => {
    try {
      await deleteFile(id);
    toast({
      title: 'File Deleted',
      description: `${fileName} has been removed`,
    });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete file',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteChart = async (id: string) => {
    try {
      await deleteChart(id);
    toast({
      title: 'Chart Deleted',
      description: 'Chart has been removed from history',
    });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete chart',
        variant: 'destructive',
      });
    }
  };

  const handleReAnalyzeFile = async (fileId: string, fileName: string) => {
    try {
      await loadFileData(fileId);
      toast({
        title: 'File Loaded',
        description: `${fileName} is now active for analysis`,
      });
      // Navigate to Analytics page
      navigate('/analytics');
    } catch (error) {
    toast({
        title: 'Error',
        description: 'Failed to load file for analysis',
        variant: 'destructive',
      });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">History & Analytics 📊</h1>
              <p className="text-blue-100">View your uploaded files and created charts</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <FileText className="w-3 h-3 inline mr-1" />
              {excelFiles.length} files
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <BarChart3 className="w-3 h-3 inline mr-1" />
              {charts.length} charts
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <Activity className="w-3 h-3 inline mr-1" />
              Recent activity
            </div>
          </div>
        </div>
        {/* Simple decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-8 text-3xl opacity-20">📈</div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uploaded Files */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Uploaded Files</CardTitle>
                  <p className="text-sm text-gray-500">
                    {showAllFiles ? `${excelFiles.length} files uploaded` : `Recent ${Math.min(5, excelFiles.length)} of ${excelFiles.length} files`}
                  </p>
                </div>
              </div>
              {excelFiles.length > 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllFiles(!showAllFiles)}
                  className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  {showAllFiles ? (
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
          </CardHeader>
          <CardContent>
            {excelFiles.length > 0 ? (
              <div className="space-y-4">
                {displayedFiles.map((file, index) => (
                  <div 
                    key={file.id} 
                    className="bg-white dark:bg-gray-800 border-0 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{file.fileName}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                              <span className="flex items-center gap-1">
                                <HardDrive className="w-3 h-3" />
                                {(file.fileSize / 1024).toFixed(1)} KB
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {file.uploadDate.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            {file.fileType}
                            </Badge>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                            Ready
                            </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReAnalyzeFile(file.id, file.fileName)}
                          className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteFile(file.id, file.fileName)}
                          className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No files uploaded yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Upload your first Excel file to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Created Charts */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Created Charts</CardTitle>
                  <p className="text-sm text-gray-500">
                    {showAllCharts ? `${charts.length} charts created` : `Recent ${Math.min(5, charts.length)} of ${charts.length} charts`}
                  </p>
                </div>
              </div>
              {charts.length > 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllCharts(!showAllCharts)}
                  className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-colors"
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
          </CardHeader>
          <CardContent>
            {charts.length > 0 ? (
              <div className="space-y-4">
                {displayedCharts.map((chart, index) => {
                  const ChartIcon = getChartIcon(chart.chartType);
                  const chartColor = getChartColor(chart.chartType);
                  
                  return (
                    <div 
                      key={chart.id} 
                      className="bg-white dark:bg-gray-800 border-0 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => handleViewChart(chart)}
                    >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 bg-gradient-to-r ${chartColor} rounded-lg flex items-center justify-center`}>
                              <ChartIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="capitalize text-xs bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                            {chart.chartType}
                          </Badge>
                                <Badge variant={chart.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                                  {chart.status}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                            {chart.xAxis} vs {chart.yAxis}
                          </h3>
                        </div>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            <p className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {chart.fileName || 'Unknown File'}
                            </p>
                            <p className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {chart.createdDate.toLocaleDateString()}
                            </p>
                            <p className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              {chart.data.length} data points
                            </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewChart(chart);
                          }}
                          className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChart(chart.id);
                          }}
                            className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No charts created yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Create your first chart to see it here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;