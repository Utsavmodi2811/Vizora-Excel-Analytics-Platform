import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 animate-gradient"></div>
      
      {/* More subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating circles - more subtle */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-float-fast"></div>
        
        {/* Additional floating elements for better coverage */}
        <div className="absolute top-1/6 right-1/6 w-64 h-64 bg-gradient-to-r from-green-400/8 to-blue-400/8 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/6 right-1/6 w-56 h-56 bg-gradient-to-r from-yellow-400/8 to-orange-400/8 rounded-full blur-3xl animate-float-medium"></div>
        
        {/* Subtle floating dots */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-purple-400/25 rounded-full animate-bounce-medium"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-indigo-400/20 rounded-full animate-bounce-fast"></div>
        <div className="absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-pink-400/25 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-1/2 left-1/2 w-2 h-2 bg-blue-400/20 rounded-full animate-bounce-medium"></div>
        
        {/* Additional subtle dots */}
        <div className="absolute top-1/5 left-1/5 w-1 h-1 bg-green-400/20 rounded-full animate-bounce-fast"></div>
        <div className="absolute top-4/5 right-1/5 w-1.5 h-1.5 bg-yellow-400/15 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-1/5 left-3/4 w-1 h-1 bg-cyan-400/20 rounded-full animate-bounce-medium"></div>
        
        {/* Enhanced grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Subtle floating geometric shapes */}
        <div className="absolute top-1/4 right-1/3 w-6 h-6 border border-blue-400/10 rounded-lg rotate-45 animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 border border-purple-400/10 rounded-full animate-float-medium"></div>
        <div className="absolute top-3/4 left-1/4 w-3 h-3 border border-indigo-400/10 rotate-45 animate-float-fast"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground; 