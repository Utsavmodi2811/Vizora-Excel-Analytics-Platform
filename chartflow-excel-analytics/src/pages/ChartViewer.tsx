import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Calendar, 
  FileText, 
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  AreaChart,
  Radar,
  Circle,
  Layers3,
  Target,
  Zap,
  Globe,
  Box,
  Clock,
  HardDrive
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResponsiveContainer } from 'recharts';
import * as RechartsPrimitive from 'recharts';

const ChartViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [chart, setChart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get chart data from location state or localStorage
    const chartData = location.state?.chart || JSON.parse(localStorage.getItem('viewChart') || 'null');
    
    if (chartData) {
      setChart(chartData);
    } else {
      toast({
        title: 'Error',
        description: 'No chart data found',
        variant: 'destructive',
      });
      navigate('/history');
    }
    setLoading(false);
  }, [location, navigate, toast]);

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

  const renderChart = () => {
    if (!chart || !chart.data) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">No chart data available</p>
        </div>
      );
    }

    const ChartIcon = getChartIcon(chart.chartType);
    const chartColor = getChartColor(chart.chartType);

    switch (chart.chartType.toLowerCase()) {
      case 'bar':
      case '3d-bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.BarChart data={chart.data}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey={chart.xAxis} />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Bar dataKey={chart.yAxis} fill="#3b82f6" />
            </RechartsPrimitive.BarChart>
          </ResponsiveContainer>
        );

      case 'line':
      case '3d-line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.LineChart data={chart.data}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey={chart.xAxis} />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Line type="monotone" dataKey={chart.yAxis} stroke="#10b981" strokeWidth={2} />
            </RechartsPrimitive.LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
      case '3d-pie':
      case 'doughnut':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.PieChart>
              <RechartsPrimitive.Pie
                data={chart.data}
                dataKey={chart.yAxis}
                nameKey={chart.xAxis}
                cx="50%"
                cy="50%"
                outerRadius={chart.chartType.toLowerCase() === 'doughnut' ? 150 : 150}
                innerRadius={chart.chartType.toLowerCase() === 'doughnut' ? 80 : 0}
                fill="#8b5cf6"
                label
              />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.PieChart>
          </ResponsiveContainer>
        );

      case 'scatter':
      case '3d-scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.ScatterChart>
              <RechartsPrimitive.CartesianGrid />
              <RechartsPrimitive.XAxis type="number" dataKey={chart.xAxis} />
              <RechartsPrimitive.YAxis type="number" dataKey={chart.yAxis} />
              <RechartsPrimitive.Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <RechartsPrimitive.Scatter data={chart.data} fill="#f59e0b" />
            </RechartsPrimitive.ScatterChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.AreaChart data={chart.data}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey={chart.xAxis} />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Area type="monotone" dataKey={chart.yAxis} stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} />
            </RechartsPrimitive.AreaChart>
          </ResponsiveContainer>
        );

      case 'radar':
      case 'spider':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.RadarChart data={chart.data}>
              <RechartsPrimitive.PolarGrid />
              <RechartsPrimitive.PolarAngleAxis dataKey={chart.xAxis} />
              <RechartsPrimitive.PolarRadiusAxis />
              <RechartsPrimitive.Radar dataKey={chart.yAxis} stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
              <RechartsPrimitive.Tooltip />
            </RechartsPrimitive.RadarChart>
          </ResponsiveContainer>
        );

      case 'bubble':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.ScatterChart>
              <RechartsPrimitive.CartesianGrid />
              <RechartsPrimitive.XAxis type="number" dataKey={chart.xAxis} />
              <RechartsPrimitive.YAxis type="number" dataKey={chart.yAxis} />
              <RechartsPrimitive.Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <RechartsPrimitive.Scatter data={chart.data} fill="#6366f1" />
            </RechartsPrimitive.ScatterChart>
          </ResponsiveContainer>
        );

      case 'histogram':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.BarChart data={chart.data}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey={chart.xAxis} />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Bar dataKey={chart.yAxis} fill="#06b6d4" />
            </RechartsPrimitive.BarChart>
          </ResponsiveContainer>
        );

      case 'funnel':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPrimitive.FunnelChart>
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Funnel dataKey={chart.yAxis} data={chart.data} />
            </RechartsPrimitive.FunnelChart>
          </ResponsiveContainer>
        );

      case '3d-surface':
      case '3d-scatter':
      case 'map':
      default:
        // For unsupported chart types, show a generic bar chart as fallback
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <ChartIcon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {chart.chartType} chart type - showing as bar chart
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <RechartsPrimitive.BarChart data={chart.data}>
                <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                <RechartsPrimitive.XAxis dataKey={chart.xAxis} />
                <RechartsPrimitive.YAxis />
                <RechartsPrimitive.Tooltip />
                <RechartsPrimitive.Bar dataKey={chart.yAxis} fill="#3b82f6" />
              </RechartsPrimitive.BarChart>
            </ResponsiveContainer>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <BarChart3 className="h-8 w-8 animate-spin text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (!chart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">Chart not found</p>
          <Button onClick={() => navigate('/history')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to History
          </Button>
        </div>
      </div>
    );
  }

  const ChartIcon = getChartIcon(chart.chartType);
  const chartColor = getChartColor(chart.chartType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/history')}
              className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${chartColor} rounded-xl flex items-center justify-center`}>
                <ChartIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {chart.chartType} Chart
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {chart.xAxis} vs {chart.yAxis}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart Display */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartIcon className="w-5 h-5" />
                  Chart Visualization
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {renderChart()}
              </CardContent>
            </Card>
          </div>

          {/* Chart Details */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Chart Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">File:</span>
                    <span className="font-medium">{chart.fileName || 'Unknown File'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Created:</span>
                    <span className="font-medium">{chart.createdDate.toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Data Points:</span>
                    <span className="font-medium">{chart.data?.length || 0}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <Badge variant={chart.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {chart.status}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-2">Chart Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">X-Axis:</span>
                      <span className="font-medium">{chart.xAxis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Y-Axis:</span>
                      <span className="font-medium">{chart.yAxis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Type:</span>
                      <Badge variant="outline" className="capitalize text-xs">
                        {chart.chartType}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartViewer; 