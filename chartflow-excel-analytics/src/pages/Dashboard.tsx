import { useData } from '@/context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, ChartBar, Menu, ArrowUp } from 'lucide-react';

const Dashboard = () => {
  const { excelFiles, charts } = useData();
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Files',
      value: excelFiles.length,
      icon: Upload,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      title: 'Charts Created',
      value: charts.length,
      icon: ChartBar,
      color: 'from-green-500 to-green-600',
      change: '+8%',
    },
    {
      title: 'Recent Activity',
      value: excelFiles.length + charts.length,
      icon: Menu,
      color: 'from-purple-500 to-purple-600',
      change: '+23%',
    },
  ];

  const recentFiles = excelFiles
    .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
    .slice(0, 5);

  const recentCharts = charts
    .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 ml-1">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
          </CardHeader>
          <CardContent>
            {recentFiles.length > 0 ? (
              <div className="space-y-3">
                {recentFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{file.fileName}</p>
                      <p className="text-sm text-gray-500">
                        {file.data.length} rows • {file.columns.length} columns
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {file.uploadDate.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No files uploaded yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Charts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentCharts.length > 0 ? (
              <div className="space-y-3">
                {recentCharts.map((chart) => (
                  <div key={chart.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{chart.chartType}</p>
                      <p className="text-sm text-gray-500">
                        {chart.xAxis} vs {chart.yAxis}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {chart.createdDate.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No charts created yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
