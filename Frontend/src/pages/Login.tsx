import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AppLayout } from '@/layouts/AppLayout';
import heroImage from '@/assets/hero-bg.jpg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/chat');
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex">
        {/* Left side - Hero */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            <div className="text-center max-w-md">
              <Brain className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">AI Interview Coach</h1>
              <p className="text-xl opacity-90">
                Master your interviews with AI-powered practice sessions and real-time feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-8">
              <div className="lg:hidden flex items-center space-x-2">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Interview
                </span>
              </div>
              <ThemeToggle />
            </div>

            <Card className="shadow-medium animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                <CardDescription>
                  Sign in to your account to continue your interview preparation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-11 w-11"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" className="text-white" />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};