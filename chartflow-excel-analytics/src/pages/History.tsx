
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const History = () => {
  const { excelFiles, charts, deleteFile, deleteChart, setCurrentData } = useData();
  const { toast } = useToast();

  const handleDeleteFile = (id: string, fileName: string) => {
    deleteFile(id);
    toast({
      title: 'File Deleted',
      description: `${fileName} has been removed`,
    });
  };

  const handleDeleteChart = (id: string) => {
    deleteChart(id);
    toast({
      title: 'Chart Deleted',
      description: 'Chart has been removed from history',
    });
  };

  const handleViewFile = (file: any) => {
    setCurrentData(file);
    toast({
      title: 'File Selected',
      description: `${file.fileName} is now active for analysis`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">History</h1>
        <p className="text-gray-600">
          View and manage your uploaded files and created charts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files ({excelFiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {excelFiles.length > 0 ? (
              <div className="space-y-4">
                {excelFiles.map((file) => (
                  <div key={file.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{file.fileName}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>{file.data.length} rows</span>
                          <span>{file.columns.length} columns</span>
                          <span>{file.uploadDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {file.columns.slice(0, 3).map((column) => (
                            <Badge key={column} variant="secondary" className="text-xs">
                              {column}
                            </Badge>
                          ))}
                          {file.columns.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{file.columns.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewFile(file)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteFile(file.id, file.fileName)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
            <CardTitle>Created Charts ({charts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {charts.length > 0 ? (
              <div className="space-y-4">
                {charts.map((chart) => (
                  <div key={chart.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="capitalize">
                            {chart.chartType}
                          </Badge>
                          <h3 className="font-semibold text-gray-900">
                            {chart.xAxis} vs {chart.yAxis}
                          </h3>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>File: {chart.fileName}</p>
                          <p>Created: {chart.createdDate.toLocaleDateString()}</p>
                          <p>Data points: {chart.data.length}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteChart(chart.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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

export default History;
