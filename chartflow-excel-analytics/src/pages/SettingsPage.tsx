import React from 'react';
import Settings from '@/components/Settings';
import { Settings as SettingsIcon, User, Shield } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <p className="text-blue-100">Manage your profile, notifications, and security preferences</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <User className="w-3 h-3" />
              Profile Management
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Security Settings
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-8 text-3xl opacity-20">⚙️</div>
      </div>

      {/* Settings Component */}
      <Settings />
    </div>
  );
};

export default SettingsPage;
