import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart, Users, Calendar, Target, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DataSummaryPanelProps {
  data: any[];
  fileName: string;
}

const DataSummaryPanel: React.FC<DataSummaryPanelProps> = ({ data, fileName }) => {
  const calculateSlope = (x: number[], y: number[]) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  };

  const summary = useMemo(() => {
    if (!data || data.length === 0) return null;

    const columns = Object.keys(data[0]);
    const numericColumns = columns.filter(col => 
      data.some(row => typeof row[col] === 'number' && !isNaN(row[col]))
    );
    
    // Enhanced insights with pattern detection
    const insights = numericColumns.map(col => {
      const values = data.map(row => Number(row[col])).filter(val => !isNaN(val));
      if (values.length === 0) return null;
      
      const max = Math.max(...values);
      const min = Math.min(...values);
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const sortedValues = [...values].sort((a, b) => a - b);
      const median = sortedValues[Math.floor(sortedValues.length / 2)];
      
      // Calculate variance and standard deviation
      const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);
      
      // Detect trends and patterns
      let trend = 'neutral';
      let trendStrength = 0;
      let pattern = '';
      
      if (values.length > 1) {
        // Linear trend analysis
        const xValues = Array.from({ length: values.length }, (_, i) => i);
        const slope = calculateSlope(xValues, values);
        trendStrength = Math.abs(slope);
        
        if (slope > 0.1) trend = 'up';
        else if (slope < -0.1) trend = 'down';
        else trend = 'stable';
        
        // Pattern detection
        if (stdDev / avg < 0.1) pattern = 'Consistent';
        else if (stdDev / avg > 0.5) pattern = 'Volatile';
        else pattern = 'Moderate';
      }
      
      // Outlier detection
      const outliers = values.filter(val => Math.abs(val - avg) > 2 * stdDev);
      
      return { 
        column: col, 
        max, 
        min, 
        avg, 
        median,
        stdDev,
        trend, 
        trendStrength,
        pattern,
        outliers: outliers.length,
        count: values.length 
      };
    }).filter(Boolean);

    // Data quality assessment
    const missingData = data.filter(row => 
      columns.some(col => row[col] === null || row[col] === undefined || row[col] === '')
    ).length;
    
    const completeness = Math.round(((data.length - missingData) / data.length) * 100);
    
    // Generate AI recommendations
    const recommendations = [];
    if (completeness < 90) {
      recommendations.push({
        type: 'warning',
        message: `${100 - completeness}% of data has missing values`,
        icon: AlertTriangle
      });
    }
    
    if (numericColumns.length >= 2) {
      recommendations.push({
        type: 'info',
        message: 'Multiple numeric columns detected - consider correlation analysis',
        icon: Target
      });
    }
    
    if (data.length > 100) {
      recommendations.push({
        type: 'success',
        message: 'Large dataset - statistical analysis recommended',
        icon: CheckCircle
      });
    }
    
    // Find best chart recommendations
    const chartRecommendations = [];
    if (numericColumns.length === 1) {
      chartRecommendations.push('Histogram or Box Plot');
    } else if (numericColumns.length >= 2) {
      chartRecommendations.push('Scatter Plot or Line Chart');
    }
    
    if (data.length <= 20) {
      chartRecommendations.push('Bar Chart or Pie Chart');
    }

    return {
      totalRows: data.length,
      totalColumns: columns.length,
      numericColumns: numericColumns.length,
      insights,
      completeness,
      missingData,
      recommendations,
      chartRecommendations
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
    <Card className="shadow-xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-indigo-700 dark:text-indigo-200">AI Insights</span>
          <Badge className="ml-2 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs font-semibold">AI</Badge>
        </CardTitle>
        <div className="text-xs text-muted-foreground mt-1 ml-7">Smart analysis, data quality, and chart suggestions</div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Data Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{summary.totalRows}</div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Users className="w-3 h-3" />
              Rows
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{summary.totalColumns}</div>
            <div className="text-xs text-muted-foreground">Columns</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{summary.numericColumns}</div>
            <div className="text-xs text-muted-foreground">Numeric</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{summary.completeness}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>

        {/* Data Quality */}
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            <AlertTriangle className="w-3 h-3 mr-1" /> Missing: {summary.missingData}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
            <Users className="w-3 h-3 mr-1" /> Duplicates: {new Set(data.map(row => JSON.stringify(row))).size !== data.length ? (data.length - new Set(data.map(row => JSON.stringify(row))).size) : 0}
          </Badge>
        </div>

        {/* Numeric Columns Stats */}
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4" />
            Descriptive Stats
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border rounded-lg">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-2 py-1">Column</th>
                  <th className="px-2 py-1">Mean</th>
                  <th className="px-2 py-1">Median</th>
                  <th className="px-2 py-1">Min</th>
                  <th className="px-2 py-1">Max</th>
                  <th className="px-2 py-1">Std</th>
                  <th className="px-2 py-1">Trend</th>
                  <th className="px-2 py-1">Pattern</th>
                  <th className="px-2 py-1">Outliers</th>
                </tr>
              </thead>
              <tbody>
                {summary.insights.map((insight, idx) => (
                  <tr key={insight.column} className="border-t">
                    <td className="px-2 py-1 font-semibold">{insight.column}</td>
                    <td className="px-2 py-1">{insight.avg.toFixed(2)}</td>
                    <td className="px-2 py-1">{insight.median}</td>
                    <td className="px-2 py-1">{insight.min}</td>
                    <td className="px-2 py-1">{insight.max}</td>
                    <td className="px-2 py-1">{insight.stdDev.toFixed(2)}</td>
                    <td className="px-2 py-1">
                      {insight.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500 inline" />}
                      {insight.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500 inline" />}
                      {insight.trend === 'stable' && <BarChart className="w-3 h-3 text-gray-500 inline" />}
                      <span className="ml-1">{insight.trend.charAt(0).toUpperCase() + insight.trend.slice(1)}</span>
                    </td>
                    <td className="px-2 py-1">{insight.pattern}</td>
                    <td className="px-2 py-1">{insight.outliers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Recommendations */}
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2 text-sm">
            <Target className="w-4 h-4" />
            Chart Suggestions
          </h4>
          <div className="flex flex-wrap gap-2">
            {summary.chartRecommendations.map((rec, i) => (
              <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                {rec}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Actionable Insights
          </h4>
          <ul className="list-disc pl-5 text-xs space-y-1">
            {summary.recommendations.length === 0 && (
              <li className="text-muted-foreground">No major issues detected. Data looks good!</li>
            )}
            {summary.recommendations.map((rec, i) => (
              <li key={i} className="flex items-center gap-2">
                <rec.icon className="w-3 h-3" />
                {rec.message}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSummaryPanel;
