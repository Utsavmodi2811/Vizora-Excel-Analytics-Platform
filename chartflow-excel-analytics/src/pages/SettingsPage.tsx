
import React from 'react';
import Settings from '@/components/Settings';

const SettingsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account settings and preferences
        </p>
      </div>
      <Settings />
    </div>
  );
};

export default SettingsPage;
