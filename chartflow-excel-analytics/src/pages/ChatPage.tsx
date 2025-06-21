import React from 'react';
import ChatWithFile from '@/components/ChatWithFile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Sparkles, Brain } from 'lucide-react';

const ChatPage = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Simple Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Chat with Your Data 🤖</h1>
              <p className="text-purple-100">AI-powered insights and analysis</p>
            </div>
          </div>
        </div>
        {/* Simple decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-8 text-3xl opacity-20">💬</div>
      </div>

      {/* Chat Interface */}
      <div className="animate-in fade-in duration-500">
        <ChatWithFile />
      </div>
    </div>
  );
};

export default ChatPage;
