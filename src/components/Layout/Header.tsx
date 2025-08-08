import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Car, Menu, X, Moon, Sun, User } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header = ({ currentPage, onPageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // const handleScroll = () => {
    //   setIsScrolled(window.scrollY > 50);
    // };

    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }

    // window.addEventListener('scroll', handleScroll);
    // return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Cars', id: 'cars' },
    { name: 'Book', id: 'booking' },
    { name: 'Owner', id: 'owner' },
    { name: 'Profile', id: 'profile' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-blur shadow-lg`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <div className="p-2 bg-gradient-accent rounded-lg">
              <Car className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">
              DriveEase
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-accent'
                    : 'text-foreground hover:text-accent'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => onPageChange('profile')}
              className="btn-outline"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button 
              className="btn-hero"
              onClick={() => onPageChange('cars')}
            >
              Rent Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-accent'
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 space-y-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    onPageChange('profile');
                    setIsMenuOpen(false);
                  }}
                  className="w-full btn-outline"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  className="w-full btn-hero"
                  onClick={() => {
                    onPageChange('cars');
                    setIsMenuOpen(false);
                  }}
                >
                  Rent Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
