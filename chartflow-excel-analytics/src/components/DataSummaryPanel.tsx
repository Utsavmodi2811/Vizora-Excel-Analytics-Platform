import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart, Users, Calendar, Target, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          AI Data Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
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

        {/* AI Insights */}
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4" />
            AI Insights
          </h4>
          {summary.insights.slice(0, 2).map((insight, index) => (
            <div key={index} className="p-2 bg-muted/50 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{insight.column}</Badge>
                <div className="flex items-center gap-1">
                  {insight.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                  {insight.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                  {insight.trend === 'stable' && <div className="w-3 h-3 text-blue-500">—</div>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>
                  <span className="text-muted-foreground">Avg:</span> {insight.avg.toFixed(1)}
                </div>
                <div>
                  <span className="text-muted-foreground">Pattern:</span> {insight.pattern}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        {summary.recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">AI Recommendations</h4>
            {summary.recommendations.slice(0, 2).map((rec, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg">
                <rec.icon className={`w-3 h-3 mt-0.5 ${
                  rec.type === 'warning' ? 'text-yellow-500' :
                  rec.type === 'success' ? 'text-green-500' : 'text-blue-500'
                }`} />
                <span className="text-xs">{rec.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Chart Recommendations */}
        {summary.chartRecommendations.length > 0 && (
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">Recommended Charts</h4>
            <div className="flex flex-wrap gap-1">
              {summary.chartRecommendations.slice(0, 2).map((chart, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {chart}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground flex items-center gap-1 pt-2 border-t">
          <Calendar className="w-3 h-3" />
          Last updated: {new Date().toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSummaryPanel;
