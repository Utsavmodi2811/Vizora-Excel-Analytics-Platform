import React from 'react';
import ChatWithFile from '@/components/ChatWithFile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Sparkles, TrendingUp, Target, Lightbulb } from 'lucide-react';

const ChatPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bot className="w-8 h-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Chat with Your Data
          </h1>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Ask questions and get AI-powered insights about your uploaded files. 
          Discover patterns, trends, and recommendations instantly.
        </p>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="text-center p-4">
          <CardContent className="p-4">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold mb-1">Trend Analysis</h3>
            <p className="text-sm text-muted-foreground">Discover patterns and trends in your data</p>
          </CardContent>
        </Card>
        
        <Card className="text-center p-4">
          <CardContent className="p-4">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold mb-1">Outlier Detection</h3>
            <p className="text-sm text-muted-foreground">Identify unusual data points and anomalies</p>
          </CardContent>
        </Card>
        
        <Card className="text-center p-4">
          <CardContent className="p-4">
            <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <h3 className="font-semibold mb-1">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground">Get chart and analysis suggestions</p>
          </CardContent>
        </Card>
      </div>

      <ChatWithFile />
    </div>
  );
};

export default ChatPage;
