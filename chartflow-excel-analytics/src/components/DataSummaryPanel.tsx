
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart, Users, Calendar } from 'lucide-react';

interface DataSummaryPanelProps {
  data: any[];
  fileName: string;
}

const DataSummaryPanel: React.FC<DataSummaryPanelProps> = ({ data, fileName }) => {
  const summary = useMemo(() => {
    if (!data || data.length === 0) return null;

    const columns = Object.keys(data[0]);
    const numericColumns = columns.filter(col => 
      data.some(row => typeof row[col] === 'number' && !isNaN(row[col]))
    );
    
    const insights = numericColumns.map(col => {
      const values = data.map(row => Number(row[col])).filter(val => !isNaN(val));
      if (values.length === 0) return null;
      
      const max = Math.max(...values);
      const min = Math.min(...values);
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const trend = values.length > 1 ? (values[values.length - 1] > values[0] ? 'up' : 'down') : 'neutral';
      
      return { column: col, max, min, avg, trend, count: values.length };
    }).filter(Boolean);

    return {
      totalRows: data.length,
      totalColumns: columns.length,
      numericColumns: numericColumns.length,
      insights,
      completeness: Math.round((data.filter(row => 
        columns.every(col => row[col] !== null && row[col] !== undefined && row[col] !== '')
      ).length / data.length) * 100)
    };
  }, [data]);

  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            AI Data Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Upload data to see AI-powered insights</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          AI Data Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{summary.totalRows}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Users className="w-3 h-3" />
              Rows
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{summary.totalColumns}</div>
            <div className="text-sm text-muted-foreground">Columns</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{summary.numericColumns}</div>
            <div className="text-sm text-muted-foreground">Numeric</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{summary.completeness}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Key Insights</h4>
          {summary.insights.slice(0, 3).map((insight, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{insight.column}</Badge>
                {insight.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {insight.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Avg: {insight.avg.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">
                  {insight.min} - {insight.max}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Last updated: {new Date().toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSummaryPanel;
