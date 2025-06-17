
import React from 'react';
import ChatWithFile from '@/components/ChatWithFile';

const ChatPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chat with Your Data</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ask questions and get insights about your uploaded files
        </p>
      </div>
      <ChatWithFile />
    </div>
  );
};

export default ChatPage;
