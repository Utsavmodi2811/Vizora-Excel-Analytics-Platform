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
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const { excelFiles, charts, deleteFile, deleteChart, loadFileData, loading } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const getChartIcon = (chartType: string) => {
    switch (chartType.toLowerCase()) {
      case 'bar':
        return BarChart3;
      case 'line':
        return TrendingUp;
      case 'pie':
        return PieChart;
      default:
        return BarChart3;
    }
  };

  const getChartColor = (chartType: string) => {
    switch (chartType.toLowerCase()) {
      case 'bar':
        return 'from-blue-500 to-blue-600';
      case 'line':
        return 'from-green-500 to-green-600';
      case 'pie':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <HistoryIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Your History
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage your uploaded files and created charts
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Database className="w-3 h-3 mr-1" />
            {excelFiles.length} Files
          </Badge>
          <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            <BarChart3 className="w-3 h-3 mr-1" />
            {charts.length} Charts
          </Badge>
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            <Activity className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Uploaded Files */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Uploaded Files</CardTitle>
                <p className="text-sm text-gray-500">{excelFiles.length} files uploaded</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {excelFiles.length > 0 ? (
              <div className="space-y-4">
                {excelFiles.map((file, index) => (
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Created Charts</CardTitle>
                <p className="text-sm text-gray-500">{charts.length} charts created</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {charts.length > 0 ? (
              <div className="space-y-4">
                {charts.map((chart, index) => {
                  const ChartIcon = getChartIcon(chart.chartType);
                  const chartColor = getChartColor(chart.chartType);
                  
                  return (
                    <div 
                      key={chart.id} 
                      className="bg-white dark:bg-gray-800 border-0 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
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
                              {chart.fileName}
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
                            onClick={() => handleDeleteChart(chart.id)}
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

      {/* Quick Actions */}
      {excelFiles.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <p className="text-sm text-gray-500">Get started with your data</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/upload')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Upload New File
                </span>
              </Button>
              <Button 
                onClick={() => navigate('/analytics')}
                variant="outline"
                className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Create New Chart
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default History;
