import { Heart, Github, Mail, BarChart3 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Compact Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Section */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
              <BarChart3 className="w-3 h-3 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Vizora
              </h3>
              <p className="text-xs text-gray-300">Excel Analytics Platform</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">API</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Help</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-6 h-6 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition-colors"
            >
              <Github className="w-3 h-3" />
            </a>
            <a 
              href="mailto:contact@vizora.com" 
              className="w-6 h-6 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition-colors"
            >
              <Mail className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-3 pt-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <span>© {currentYear} Vizora. Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current" />
              <span>for data enthusiasts</span>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 