import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Mail, Lock, BarChart2, User, ArrowRight, Shield, Database, TrendingUp, CheckCircle, Sparkles, Zap, Star, Heart, Target, Zap as Lightning, MousePointer, Wifi, Cpu, Zap as Bolt, Rocket, Zap as Thunder } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setAnimateElements(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      toast({
        title: "Success",
        description: "Your account has been created successfully.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-green-600/10 via-yellow-600/10 to-orange-600/10 animate-pulse delay-1000"></div>
      </div>

      {/* Mouse Tracking Light Effect */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transform: `scale(${isHovering ? 1.5 : 1})`
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Data Points with more variety */}
        <div className={`absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse transition-all duration-1000 ${animateElements ? 'translate-y-20' : ''}`}></div>
        <div className={`absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-40 animate-pulse transition-all duration-1000 delay-300 ${animateElements ? 'translate-y-32' : ''}`}></div>
        <div className={`absolute bottom-40 left-20 w-3 h-3 bg-pink-400 rounded-full opacity-50 animate-pulse transition-all duration-1000 delay-500 ${animateElements ? 'translate-y-16' : ''}`}></div>
        <div className={`absolute bottom-20 right-10 w-5 h-5 bg-green-400 rounded-full opacity-30 animate-pulse transition-all duration-1000 delay-700 ${animateElements ? 'translate-y-24' : ''}`}></div>
        
        {/* Additional floating elements */}
        <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-40 animate-bounce transition-all duration-1500 delay-200 ${animateElements ? 'translate-x-16' : ''}`}></div>
        <div className={`absolute top-3/4 right-1/3 w-3 h-3 bg-cyan-400 rounded-full opacity-35 animate-pulse transition-all duration-1200 delay-400 ${animateElements ? 'translate-y-12' : ''}`}></div>
        <div className={`absolute bottom-1/3 left-1/2 w-4 h-4 bg-orange-400 rounded-full opacity-25 animate-ping transition-all duration-1800 delay-600 ${animateElements ? 'translate-x-8' : ''}`}></div>
        
        {/* Moving Lines with more variety */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 transition-all duration-2000 ${animateElements ? 'translate-x-full' : '-translate-x-full'}`}></div>
        <div className={`absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30 transition-all duration-2000 delay-1000 ${animateElements ? '-translate-x-full' : 'translate-x-full'}`}></div>
        <div className={`absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-20 transition-all duration-3000 delay-500 ${animateElements ? 'translate-x-full' : '-translate-x-full'}`}></div>
        
        {/* Diagonal moving lines */}
        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-25 transition-all duration-2500 delay-300 ${animateElements ? 'translate-y-full' : '-translate-y-full'}`}></div>
        <div className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-25 transition-all duration-2500 delay-800 ${animateElements ? 'translate-y-full' : '-translate-y-full'}`}></div>
        
        {/* Grid Pattern with animation */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute inset-0 transition-all duration-5000 ${animateElements ? 'scale-110' : 'scale-100'}`} style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Icons */}
        <div className={`absolute top-1/4 right-1/4 text-2xl opacity-20 transition-all duration-2000 delay-300 ${animateElements ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
          📈
        </div>
        <div className={`absolute bottom-1/4 left-1/4 text-xl opacity-15 transition-all duration-2000 delay-600 ${animateElements ? '-rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
          🚀
        </div>
        <div className={`absolute top-1/2 right-1/3 text-lg opacity-25 transition-all duration-2000 delay-900 ${animateElements ? 'rotate-6 scale-110' : 'rotate-0 scale-100'}`}>
          💎
        </div>

        {/* Animated Tech Icons */}
        <div className={`absolute top-1/6 left-1/6 text-lg opacity-15 transition-all duration-3000 delay-400 ${animateElements ? 'rotate-45 scale-125' : 'rotate-0 scale-100'}`}>
          <Rocket className="w-6 h-6 text-blue-400" />
        </div>
        <div className={`absolute bottom-1/6 right-1/6 text-lg opacity-15 transition-all duration-3000 delay-600 ${animateElements ? '-rotate-45 scale-125' : 'rotate-0 scale-100'}`}>
          <Thunder className="w-6 h-6 text-green-400" />
        </div>
        <div className={`absolute top-2/3 left-1/3 text-lg opacity-15 transition-all duration-3000 delay-800 ${animateElements ? 'rotate-90 scale-125' : 'rotate-0 scale-100'}`}>
          <Cpu className="w-6 h-6 text-yellow-400" />
        </div>
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full opacity-30 transition-all duration-3000 delay-${i * 100}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Animated Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-blue-400/30 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-purple-400/30 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-pink-400/30 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-green-400/30 rounded-br-lg"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo Section with enhanced animation */}
          <div className={`text-center mb-8 transition-all duration-1000 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-4 shadow-2xl transition-all duration-1000 delay-200 ${animateElements ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              <BarChart2 className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 transition-all duration-1000 delay-400 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Vizora Analytics
            </h1>
            <p className={`text-gray-300 text-sm transition-all duration-1000 delay-600 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Join the data revolution
            </p>
          </div>

          {/* Register Card with enhanced animations */}
          <Card 
            className={`backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl transition-all duration-1000 delay-300 ${animateElements ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
                <User className="w-6 h-6 text-blue-400 animate-pulse" />
                Create Account
              </CardTitle>
              <CardDescription className="text-center text-gray-300">
                Start your analytics journey today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`space-y-2 transition-all duration-700 delay-400 ${animateElements ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <Label htmlFor="name" className="text-gray-200 flex items-center gap-2">
                    <User className="w-4 h-4 animate-bounce" />
                    Full Name
                  </Label>
                  <div className="relative group">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 group-hover:border-blue-300"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <User className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </div>
                <div className={`space-y-2 transition-all duration-700 delay-500 ${animateElements ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <Label htmlFor="email" className="text-gray-200 flex items-center gap-2">
                    <Mail className="w-4 h-4 animate-bounce" />
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 group-hover:border-blue-300"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Mail className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </div>
                <div className={`space-y-2 transition-all duration-700 delay-600 ${animateElements ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <Label htmlFor="password" className="text-gray-200 flex items-center gap-2">
                    <Lock className="w-4 h-4 animate-bounce" />
                    Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 pr-10 group-hover:border-blue-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className={`space-y-2 transition-all duration-700 delay-700 ${animateElements ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <Label htmlFor="confirmPassword" className="text-gray-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 animate-bounce" />
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 pr-10 group-hover:border-blue-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className={`transition-all duration-700 delay-800 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Account
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <div className={`text-sm text-center text-gray-300 transition-all duration-700 delay-1000 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline">
                  Sign in here
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Feature Highlights with enhanced animations */}
          <div className={`mt-8 grid grid-cols-3 gap-4 transition-all duration-1000 delay-500 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-500 delay-600 hover:scale-105 hover:bg-white/10 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <Database className="w-6 h-6 text-blue-400 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-gray-300">Upload & Analyze</p>
            </div>
            <div className={`text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-500 delay-700 hover:scale-105 hover:bg-white/10 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-gray-300">Smart Insights</p>
            </div>
            <div className={`text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-500 delay-800 hover:scale-105 hover:bg-white/10 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-gray-300">Secure & Private</p>
            </div>
          </div>

          {/* Interactive Status Bar */}
          <div className={`mt-6 text-center transition-all duration-1000 delay-1200 ${animateElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Ready to Launch</span>
              <Rocket className="w-3 h-3 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce">📈</div>
      <div className="absolute bottom-10 left-10 text-4xl opacity-20 animate-pulse">🚀</div>
      <div className="absolute top-1/2 left-5 text-3xl opacity-30 animate-spin" style={{animationDuration: '20s'}}>✨</div>
      <div className="absolute top-1/3 right-5 text-2xl opacity-25 animate-pulse delay-1000">💎</div>
      <div className="absolute bottom-1/3 left-5 text-xl opacity-20 animate-bounce delay-500">⚡</div>
      <div className="absolute top-3/4 right-5 text-lg opacity-15 animate-ping delay-700">⭐</div>
      <div className="absolute bottom-1/4 right-5 text-sm opacity-20 animate-pulse delay-300">🎯</div>
      <div className="absolute top-1/4 left-5 text-lg opacity-15 animate-bounce delay-400">💫</div>
      <div className="absolute bottom-1/6 left-5 text-sm opacity-20 animate-pulse delay-600">🔥</div>
    </div>
  );
};

export default Register; 