import { useState, useRef } from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, FileImage, BarChart3, Box } from 'lucide-react';
import Chart3D from '@/components/Chart3D';
import DataSummaryPanel from '@/components/DataSummaryPanel';
import ChartCustomization from '@/components/ChartCustomization';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

const Analytics = () => {
  const { currentData, fileName, createChart } = useData();
  const { toast } = useToast();
  const chartRef = useRef<HTMLDivElement>(null);
  
  const [selectedXAxis, setSelectedXAxis] = useState('');
  const [selectedYAxis, setSelectedYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [isExporting, setIsExporting] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [chart3DType, setChart3DType] = useState<'3d-bar' | '3d-scatter' | '3d-surface'>('3d-bar');
  const [chartStyle, setChartStyle] = useState({
    color: '#8884d8',
    fontSize: '12',
    fontFamily: 'Arial',
    gridLines: true,
    legend: true,
    animation: true
  });
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [enableAnimation, setEnableAnimation] = useState(true);

  if (!currentData || !fileName) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Vizora Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Please upload an Excel file first to start creating charts.</p>
        </div>
        <DataSummaryPanel data={[]} fileName="" />
      </div>
    );
  }

  const columns = currentData.length > 0 ? Object.keys(currentData[0]) : [];

  const processChartData = () => {
    if (!selectedXAxis || !selectedYAxis) return [];
    
    return currentData.map((row: any) => ({
      name: String(row[selectedXAxis]),
      value: Number(row[selectedYAxis]) || 0,
    }));
  };

  const chartData = processChartData();

  const handleCreateChart = async () => {
    if (!selectedXAxis || !selectedYAxis) {
      toast({
        title: 'Missing Selection',
        description: 'Please select both X and Y axes',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createChart({
        fileName: fileName,
        chartType,
        xAxis: selectedXAxis,
        yAxis: selectedYAxis,
        data: chartData,
      });

      toast({
        title: 'Chart Created Successfully! 🎉',
        description: 'Your chart has been saved to history',
      });
    } catch (error) {
      toast({
        title: 'Error Creating Chart',
        description: 'Failed to save chart to history',
        variant: 'destructive',
      });
    }
  };

  const handleExport = async (format: string) => {
    if (!chartRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(chartRef.current);
      
      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `vizora-chart-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } else if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`vizora-chart-${Date.now()}.pdf`);
      }
      
      toast({
        title: 'Export Successful! 📁',
        description: `Chart exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: `Failed to export chart as ${format.toUpperCase()}`,
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const renderChart = () => {
    if (chartData.length === 0) return null;

    if (show3D) {
      return <Chart3D data={chartData} type={chart3DType} color={chartStyle.color} />;
    }

    const chartProps = {
      style: { fontFamily: chartStyle.fontFamily, fontSize: chartStyle.fontSize }
    };

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} {...chartProps} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              {chartStyle.gridLines && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill={chartStyle.color} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} {...chartProps} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              {chartStyle.gridLines && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={chartStyle.color} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} {...chartProps} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              {chartStyle.gridLines && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke={chartStyle.color} fill={chartStyle.color} />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart {...chartProps}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill={chartStyle.color}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      <div className="text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Vizora Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-words">
          Create beautiful charts from your Excel data: <span className="font-medium">{fileName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Chart Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chart Type</label>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">X Axis</label>
                  <Select value={selectedXAxis} onValueChange={setSelectedXAxis}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select X axis" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Y Axis</label>
                  <Select value={selectedYAxis} onValueChange={setSelectedYAxis}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select Y axis" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    onClick={handleCreateChart}
                    className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
                    disabled={!selectedXAxis || !selectedYAxis}
                  >
                    Create Chart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {chartData.length > 0 && (
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    {show3D ? <Box className="h-5 w-5 text-purple-600" /> : <BarChart3 className="h-5 w-5 text-blue-600" />}
                    {show3D ? `3D ${chart3DType.replace('3d-', '').replace('-', ' ')} Chart` : 
                    `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={show3D ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShow3D(!show3D)}
                      className="text-xs sm:text-sm"
                    >
                      {show3D ? '2D View' : '3D View'}
                    </Button>
                    {show3D && (
                      <Select value={chart3DType} onValueChange={(value: '3d-bar' | '3d-scatter' | '3d-surface') => setChart3DType(value)}>
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3d-bar">3D Bar</SelectItem>
                          <SelectItem value="3d-scatter">3D Scatter</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div ref={chartRef} className="w-full bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  {renderChart()}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <DataSummaryPanel data={currentData} fileName={fileName} />
          <ChartCustomization 
            onStyleChange={setChartStyle}
            onExport={handleExport}
            showGrid={showGrid}
            showLegend={showLegend}
            enableAnimation={enableAnimation}
            onShowGridChange={setShowGrid}
            onShowLegendChange={setShowLegend}
            onEnableAnimationChange={setEnableAnimation}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
