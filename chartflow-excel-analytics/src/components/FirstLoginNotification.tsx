import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, Sparkles, BarChart3, Upload, MessageSquare } from 'lucide-react';

interface FirstLoginNotificationProps {
  onDismiss: () => void;
}

export const FirstLoginNotification: React.FC<FirstLoginNotificationProps> = ({ onDismiss }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-xl text-blue-800">Welcome to Vizora Analytics! 🎉</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          You're all set to start analyzing your data! Here's what you can do:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100">
            <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">Upload Files</h4>
              <p className="text-sm text-gray-600">Upload Excel files to analyze your data</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100">
            <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">Create Charts</h4>
              <p className="text-sm text-gray-600">Generate beautiful visualizations</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100">
            <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">Chat with Data</h4>
              <p className="text-sm text-gray-600">Ask questions about your data</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Pro tip:</strong> Start by uploading an Excel file and let our AI analyze it for you. 
            You'll get instant insights and chart recommendations!
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onDismiss} className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 