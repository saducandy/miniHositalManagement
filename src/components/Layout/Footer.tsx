import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-full">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">HealthCare+</h3>
                <p className="text-sm text-gray-400">Caring for Your Health</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-6">
              Providing exceptional healthcare services with compassion, innovation, and excellence. Your health is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Doctors', 'Appointments', 'Events', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm focus:outline-none focus:text-emerald-400"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Emergency Care</li>
              <li className="text-gray-400">Cardiology</li>
              <li className="text-gray-400">Orthopedics</li>
              <li className="text-gray-400">Pediatrics</li>
              <li className="text-gray-400">Surgery</li>
              <li className="text-gray-400">Diagnostics</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@healthcareplus.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">123 Healthcare Ave<br />Medical City, MC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">24/7 Emergency</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 HealthCare+. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors focus:outline-none focus:text-emerald-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors focus:outline-none focus:text-emerald-400">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors focus:outline-none focus:text-emerald-400">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};