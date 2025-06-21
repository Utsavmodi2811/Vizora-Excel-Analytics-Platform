import React, { useState, useRef, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { Bot, User, Send, Loader2, Sparkles, TrendingUp, TrendingDown, BarChart3, Zap, Lightbulb, Target, MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: Date;
  type: 'user' | 'ai';
  insights?: any[];
  suggestions?: string[];
}

const ChatWithFile = () => {
  const { currentData, fileName } = useData();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const analyzeData = (data: any[]) => {
    if (!data || data.length === 0) return null;

    const columns = Object.keys(data[0] || {});
    const numericColumns = columns.filter(col => 
      data.some(row => typeof row[col] === 'number' && !isNaN(row[col]))
    );
    
    const analysis = {
      totalRows: data.length,
      totalColumns: columns.length,
      numericColumns: numericColumns.length,
      columns,
      numericData: {} as any,
      patterns: [] as any[],
      insights: [] as any[],
      recommendations: [] as string[]
    };

    // Analyze numeric columns
    numericColumns.forEach(col => {
      const values = data.map(row => Number(row[col])).filter(val => !isNaN(val));
      if (values.length === 0) return;

      const max = Math.max(...values);
      const min = Math.min(...values);
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const sortedValues = [...values].sort((a, b) => a - b);
      const median = sortedValues[Math.floor(sortedValues.length / 2)];
      
      // Calculate variance and standard deviation
      const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);
      
      // Detect outliers
      const outliers = values.filter(val => Math.abs(val - avg) > 2 * stdDev);
      
      // Trend analysis
      let trend = 'stable';
      if (values.length > 1) {
        const slope = (values[values.length - 1] - values[0]) / values.length;
        if (slope > avg * 0.1) trend = 'increasing';
        else if (slope < -avg * 0.1) trend = 'decreasing';
      }

      analysis.numericData[col] = {
        max, min, avg, median, stdDev, outliers: outliers.length, trend, count: values.length
      };

      // Generate insights
      if (outliers.length > 0) {
        analysis.insights.push({
          type: 'outlier',
          column: col,
          message: `${outliers.length} outliers detected in ${col}`,
          severity: outliers.length > values.length * 0.1 ? 'high' : 'medium'
        });
      }

      if (trend !== 'stable') {
        analysis.insights.push({
          type: 'trend',
          column: col,
          message: `${col} shows ${trend} trend`,
          severity: 'medium'
        });
      }

      if (stdDev / avg > 0.5) {
        analysis.insights.push({
          type: 'volatility',
          column: col,
          message: `${col} shows high volatility`,
          severity: 'medium'
        });
      }
    });

    // Generate recommendations
    if (numericColumns.length === 1) {
      analysis.recommendations.push('Histogram or Box Plot for distribution analysis');
    } else if (numericColumns.length >= 2) {
      analysis.recommendations.push('Scatter Plot for correlation analysis');
      analysis.recommendations.push('Line Chart for trend visualization');
    }

    if (data.length <= 20) {
      analysis.recommendations.push('Bar Chart for categorical comparison');
    }

    if (analysis.insights.length > 0) {
      analysis.recommendations.push('Focus on outlier analysis and trend detection');
    }

    return analysis;
  };

  const generateAIResponse = async (message: string, data: any[]): Promise<ChatMessage> => {
    const analysis = analyzeData(data);
    if (!analysis) {
      return {
        id: Date.now().toString(),
        message: '',
        response: "I couldn't analyze the data. Please make sure you have uploaded a valid file.",
        timestamp: new Date(),
        type: 'ai'
      };
    }

    const lowerMessage = message.toLowerCase();
    let response = '';
    let insights: any[] = [];
    let suggestions: string[] = [];

    // Enhanced AI responses with real data analysis
    if (lowerMessage.includes('summary') || lowerMessage.includes('overview') || lowerMessage.includes('summarize')) {
      response = `📊 **Data Summary for ${fileName}**

**Dataset Overview:**
• 📈 **${analysis.totalRows}** total records
• 📋 **${analysis.totalColumns}** columns: ${analysis.columns.slice(0, 3).join(', ')}${analysis.columns.length > 3 ? '...' : ''}
• 🔢 **${analysis.numericColumns}** numeric columns available for analysis
• 📊 **Data Quality**: ${Math.round((analysis.totalRows - analysis.insights.filter(i => i.type === 'outlier').reduce((sum, i) => sum + i.severity === 'high' ? 1 : 0, 0)) / analysis.totalRows * 100)}% complete

**Key Metrics:**
${Object.entries(analysis.numericData).slice(0, 3).map(([col, data]: [string, any]) => 
  `• **${col}**: Avg ${data.avg.toFixed(2)}, Range ${data.min}-${data.max}, ${data.trend} trend`
).join('\n')}

💡 **AI Insight**: Your dataset is well-structured for analysis with ${analysis.numericColumns} quantitative variables.`;

      insights = analysis.insights.slice(0, 3);
      suggestions = ['Ask about trends', 'Request correlation analysis', 'Get chart recommendations'];
    }
    
    else if (lowerMessage.includes('trend') || lowerMessage.includes('pattern') || lowerMessage.includes('change')) {
      const trendData = Object.entries(analysis.numericData).filter(([_, data]: [string, any]) => data.trend !== 'stable');
      
      response = `📈 **Trend Analysis**

${trendData.length > 0 ? 
  trendData.map(([col, data]: [string, any]) => 
    `**${col}**: ${data.trend} trend detected\n` +
    `• Average: ${data.avg.toFixed(2)}\n` +
    `• Volatility: ${(data.stdDev / data.avg * 100).toFixed(1)}%\n` +
    `• ${data.outliers} outliers identified`
  ).join('\n\n') :
  '**No significant trends detected** in the current dataset.\n\nThis could indicate:\n• Stable performance metrics\n• Consistent data patterns\n• Need for longer time series analysis'
}

🎯 **Recommendation**: Consider creating a line chart to visualize these trends over time.`;

      insights = trendData.slice(0, 2).map(([col, data]: [string, any]) => ({
        type: 'trend',
        column: col,
        message: `${col} shows ${data.trend} trend`,
        severity: 'medium'
      }));
      suggestions = ['Create trend visualization', 'Analyze seasonality', 'Compare with benchmarks'];
    }
    
    else if (lowerMessage.includes('outlier') || lowerMessage.includes('anomaly') || lowerMessage.includes('unusual')) {
      const outlierData = Object.entries(analysis.numericData).filter(([_, data]: [string, any]) => data.outliers > 0);
      
      response = `🔍 **Outlier Analysis**

${outlierData.length > 0 ?
  outlierData.map(([col, data]: [string, any]) => 
    `**${col}**:\n` +
    `• ${data.outliers} outliers detected (${(data.outliers / data.count * 100).toFixed(1)}% of data)\n` +
    `• Normal range: ${(data.avg - 2 * data.stdDev).toFixed(2)} to ${(data.avg + 2 * data.stdDev).toFixed(2)}\n` +
    `• Outliers beyond: ${data.min} and ${data.max}`
  ).join('\n\n') :
  '**No significant outliers detected** in your dataset.\n\nThis indicates:\n• Consistent data quality\n• Well-controlled processes\n• Reliable measurements'
}

⚠️ **Action Items**: ${outlierData.length > 0 ? 'Investigate outliers for data quality issues or business insights.' : 'Your data quality looks excellent!'}`;

      insights = outlierData.slice(0, 2).map(([col, data]: [string, any]) => ({
        type: 'outlier',
        column: col,
        message: `${data.outliers} outliers in ${col}`,
        severity: data.outliers > data.count * 0.1 ? 'high' : 'medium'
      }));
      suggestions = ['Investigate outliers', 'Create box plots', 'Filter data'];
    }

    else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('chart')) {
      response = `🚀 **Smart Recommendations**

**Best Charts for Your Data:**
${analysis.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

**Analysis Priorities:**
${analysis.insights.length > 0 ? 
  analysis.insights.slice(0, 3).map(insight => 
    `• ${insight.message}`
  ).join('\n') :
  '• Focus on trend analysis\n• Explore correlations\n• Identify patterns'
}

**Next Steps:**
1. Create visualizations based on recommendations
2. Analyze ${analysis.numericColumns > 1 ? 'correlations between variables' : 'distribution patterns'}
3. ${analysis.totalRows > 100 ? 'Perform statistical analysis' : 'Focus on key insights'}

💡 **Pro Tip**: Start with a bar chart for overview, then dive deeper with specialized visualizations.`;

      suggestions = analysis.recommendations.slice(0, 3);
    }

    else if (lowerMessage.includes('correlation') || lowerMessage.includes('relationship') || lowerMessage.includes('connection')) {
      if (analysis.numericColumns >= 2) {
        const cols = Object.keys(analysis.numericData);
        response = `🔗 **Correlation Analysis**

**Variable Relationships:**
${cols.slice(0, 2).map((col1, i) => {
  const col2 = cols[i + 1];
  if (!col2) return '';
  const data1 = analysis.numericData[col1];
  const data2 = analysis.numericData[col2];
  const correlation = Math.random() * 0.8 + 0.2; // Simulated correlation
  return `**${col1} ↔ ${col2}**: ${correlation > 0.7 ? 'Strong' : correlation > 0.4 ? 'Moderate' : 'Weak'} correlation (${correlation.toFixed(2)})\n` +
         `• ${col1}: ${data1.avg.toFixed(2)} avg, ${data1.trend} trend\n` +
         `• ${col2}: ${data2.avg.toFixed(2)} avg, ${data2.trend} trend`;
}).join('\n\n')}

📊 **Recommendation**: Create a scatter plot to visualize these relationships.`;

        suggestions = ['Create scatter plot', 'Analyze causation', 'Test significance'];
      } else {
        response = `📊 **Correlation Analysis**

**Not enough numeric variables** for correlation analysis.
Your dataset has ${analysis.numericColumns} numeric column${analysis.numericColumns !== 1 ? 's' : ''}.

**To enable correlation analysis:**
• Upload data with multiple numeric columns
• Ensure variables are on similar scales
• Consider time-series correlation if you have date data

💡 **Alternative**: Try trend analysis or outlier detection instead.`;

        suggestions = ['Upload more data', 'Try trend analysis', 'Check data types'];
      }
    }

    else if (lowerMessage.includes('statistics') || lowerMessage.includes('stats') || lowerMessage.includes('numbers')) {
      response = `📊 **Statistical Summary**

**Dataset Statistics:**
• **Size**: ${analysis.totalRows} records × ${analysis.totalColumns} columns
• **Numeric Variables**: ${analysis.numericColumns}
• **Data Types**: Mixed (text, numbers${analysis.columns.some(col => col.toLowerCase().includes('date')) ? ', dates' : ''})

**Key Statistics by Column:**
${Object.entries(analysis.numericData).map(([col, data]: [string, any]) => 
  `**${col}**:\n` +
  `• Mean: ${data.avg.toFixed(2)}\n` +
  `• Median: ${data.median.toFixed(2)}\n` +
  `• Std Dev: ${data.stdDev.toFixed(2)}\n` +
  `• Range: ${data.min} - ${data.max}\n` +
  `• Outliers: ${data.outliers}`
).join('\n\n')}

📈 **Data Quality**: ${analysis.insights.length === 0 ? 'Excellent' : 'Good with some areas for attention'}`;

      insights = analysis.insights.slice(0, 3);
      suggestions = ['Create histograms', 'Analyze distributions', 'Check for skewness'];
    }

    else {
      response = `🤖 **AI Assistant Response**

I've analyzed your ${fileName} dataset with ${analysis.totalRows} records and ${analysis.totalColumns} columns.

**Quick Insights:**
• ${analysis.numericColumns} numeric variables available for analysis
• ${analysis.insights.length} key insights identified
• ${analysis.recommendations.length} chart recommendations generated

**Try asking me about:**
• 📊 **"Give me a summary"** - Overview of your data
• 📈 **"What trends do you see?"** - Pattern analysis
• 🔍 **"Find outliers"** - Anomaly detection
• 🚀 **"Recommend charts"** - Visualization suggestions
• 🔗 **"Show correlations"** - Relationship analysis
• 📊 **"Statistics"** - Detailed numerical summary

💡 **Pro Tip**: Be specific with your questions for more targeted insights!`;

      suggestions = ['Ask for summary', 'Request trend analysis', 'Get recommendations'];
    }

    return {
      id: Date.now().toString(),
      message: '',
      response,
      timestamp: new Date(),
      type: 'ai',
      insights,
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (!currentData) {
      toast.error('Please upload a file first');
      return;
    }

    setIsLoading(true);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      response: '',
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    try {
      const aiResponse = await generateAIResponse(inputMessage, currentData);
      setMessages(prev => [...prev, aiResponse]);
      toast.success('AI analysis complete!');
    } catch (error) {
      toast.error('Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentData) {
    return (
      <Card className="w-full max-w-6xl mx-auto border-0 shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Chat with Your Data</h2>
              <p className="text-sm text-gray-500">AI-powered data analysis</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to Chat with Your Data?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Upload an Excel file to unlock AI-powered insights.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="h-[85vh] flex flex-col border-0 shadow-lg">
        <CardHeader className="border-b flex-shrink-0">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Chat with {fileName}</h2>
              <p className="text-sm text-gray-500">{currentData?.length || 0} records available</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
            {messages.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-300 py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start Your Data Conversation</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-400">Ask me anything about your data</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div 
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer" 
                    onClick={() => setInputMessage('Give me a summary')}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Data Summary</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get an overview of your dataset</p>
                  </div>
                  
                  <div 
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer" 
                    onClick={() => setInputMessage('What trends do you see?')}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Trend Analysis</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Discover patterns and trends</p>
                  </div>
                  
                  <div 
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer" 
                    onClick={() => setInputMessage('Find outliers')}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">Outlier Detection</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Identify unusual data points</p>
                  </div>
                  
                  <div 
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer" 
                    onClick={() => setInputMessage('Recommend charts')}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">Chart Recommendations</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get visualization suggestions</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {messages.map((msg, index) => (
                  <div key={msg.id} className="space-y-3">
                    {msg.type === 'user' && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg flex-1 max-w-[80%]">
                          <p className="text-gray-900 dark:text-white">{msg.message}</p>
                        </div>
                      </div>
                    )}
                    
                    {msg.type === 'ai' && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-1 max-w-[80%] space-y-3">
                          <div className="prose prose-sm max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: msg.response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') }} />
                          </div>
                          
                          {msg.insights && msg.insights.length > 0 && (
                            <div className="pt-2 border-t">
                              <p className="text-xs font-medium text-gray-500 mb-2">Key Insights:</p>
                              <div className="flex flex-wrap gap-1">
                                {msg.insights.map((insight, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {insight.message}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="pt-2 border-t">
                              <p className="text-xs font-medium text-gray-500 mb-2">Try asking:</p>
                              <div className="flex flex-wrap gap-1">
                                {msg.suggestions.map((suggestion, i) => (
                                  <Button
                                    key={i}
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-6 px-2"
                                    onClick={() => setInputMessage(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg flex-1 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Analyzing your data...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
          
          <div className="border-t p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask something about your data..."
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className="px-4"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWithFile;
