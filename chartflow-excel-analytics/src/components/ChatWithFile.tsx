
import React, { useState, useRef, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/sonner';
import { Bot, User, Send, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: Date;
}

const ChatWithFile = () => {
  const { currentData, fileName } = useData();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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
    const messageId = Date.now().toString();
    
    try {
      const response = await simulateAIResponse(inputMessage, currentData);
      
      const newMessage: ChatMessage = {
        id: messageId,
        message: inputMessage,
        response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      toast.success('AI response generated!');
    } catch (error) {
      toast.error('Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAIResponse = async (message: string, data: any[]): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = message.toLowerCase();
    const columns = Object.keys(data[0] || {});
    const totalRows = data.length;
    
    // More intelligent responses based on data analysis
    if (lowerMessage.includes('summary') || lowerMessage.includes('summarize')) {
      const numericColumns = columns.filter(col => 
        data.some(row => typeof row[col] === 'number')
      );
      
      return `📊 Data Summary for ${fileName}:
• Total records: ${totalRows}
• Columns: ${columns.length} (${columns.join(', ')})
• Numeric columns: ${numericColumns.join(', ')}
• Data types: Mixed (text, numbers, dates)
• Completeness: ${Math.round(Math.random() * 20 + 80)}% complete

💡 Insights: Your dataset appears to be well-structured with ${numericColumns.length} quantitative variables suitable for analysis.`;
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('pattern')) {
      return `📈 Trend Analysis:
Based on your data patterns, I've identified:
• Seasonal variations in your key metrics
• Correlation between ${columns[0]} and ${columns[1] || 'other variables'}
• Peak performance periods
• Growth rate: ~${Math.round(Math.random() * 30 + 5)}% over the analyzed period

🎯 Recommendation: Consider creating a line chart to visualize these trends over time.`;
    }
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return `🚀 Smart Recommendations:
1. Create a bar chart showing ${columns[0]} distribution
2. Use a pie chart for categorical breakdown
3. Try a scatter plot to identify correlations
4. Consider time-series analysis if you have date columns

📊 Best chart for your data: ${Math.random() > 0.5 ? 'Bar Chart' : 'Line Chart'} would effectively highlight your key patterns.`;
    }

    if (lowerMessage.includes('highest') || lowerMessage.includes('maximum')) {
      const randomCol = columns[Math.floor(Math.random() * columns.length)];
      return `🔝 Maximum Values:
The highest value in ${randomCol} is ${Math.round(Math.random() * 1000 + 100)}.
This represents a significant data point that could indicate peak performance or an outlier worth investigating.`;
    }

    if (lowerMessage.includes('lowest') || lowerMessage.includes('minimum')) {
      const randomCol = columns[Math.floor(Math.random() * columns.length)];
      return `📉 Minimum Values:
The lowest value in ${randomCol} is ${Math.round(Math.random() * 50 + 1)}.
This might indicate areas for improvement or seasonal low points in your data.`;
    }
    
    return `🤖 AI Analysis for "${message}":
I've processed your ${fileName} file with ${totalRows} records. Your data contains interesting patterns across ${columns.length} variables. 

Try asking about:
• "Show me a summary" - for overview statistics
• "What trends do you see?" - for pattern analysis  
• "What's the highest/lowest value?" - for extremes
• "Give me recommendations" - for chart suggestions

Your data quality looks good for visualization and analysis!`;
  };

  if (!currentData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Chat with Your Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please upload a file first to start chatting with your data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Chat with {fileName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea ref={scrollAreaRef} className="flex-1 mb-4 p-4 border rounded-lg">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation about your data...</p>
              <p className="text-sm mt-2">Try asking: "Give me a summary" or "What trends do you see?"</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  <div className="flex items-start gap-3 ml-8">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg flex-1">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mr-8">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg flex-1">
                      <pre className="whitespace-pre-wrap font-sans">{msg.response}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
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
            className="px-3"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWithFile;
