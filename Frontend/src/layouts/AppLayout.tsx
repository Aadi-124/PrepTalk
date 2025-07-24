import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, User, LogOut, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface AppLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, showNavigation = false }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Chat', href: '/chat', icon: MessageCircle },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {showNavigation && (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/chat" className="flex items-center space-x-2">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Interview
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  window.location.href = '/login';
                }}
                className="h-9 w-9"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </header>
      )}
      
      <main className={showNavigation ? '' : 'h-screen'}>
        {children}
      </main>
    </div>
  );
};