import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Type, Contrast, Plus, Minus } from 'lucide-react';
import { useAccessibility } from '../../hooks/useAccessibility';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const { fontSize, highContrast, increaseFontSize, decreaseFontSize, toggleHighContrast } = useAccessibility();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Appointments', href: '/appointments' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Accessibility Bar */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-2 space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Font Size:</span>
              <button
                onClick={decreaseFontSize}
                className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Decrease font size"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600 min-w-[2rem] text-center">{fontSize}px</span>
              <button
                onClick={increaseFontSize}
                className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Increase font size"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                highContrast
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-600 hover:text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              aria-label="Toggle high contrast mode"
            >
              <Contrast className="h-4 w-4" />
              <span>High Contrast</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded">
            <div className="p-2 bg-emerald-100 rounded-full">
              <Heart className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Eye Care Center</h1>
              <p className="text-sm text-gray-600">Vision Excellence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isActive(item.href)
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/appointments"
              className="bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Book Appointment
            </Link>
            <Link
              to="/admin"
              className="text-emerald-600 border border-emerald-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="py-4 space-y-2" role="navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isActive(item.href)
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/appointments"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-emerald-600 text-white px-3 py-2 rounded text-base font-medium text-center hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-emerald-600 border border-emerald-600 px-3 py-2 rounded text-base font-medium text-center hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Admin Panel
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};