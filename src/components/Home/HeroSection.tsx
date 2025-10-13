import React from 'react';
import { I18nContext } from '../../context/I18nContext';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = React.useContext(I18nContext);
  return (
    <section className="relative h-screen bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t('hero.title1')}
                <span className="text-emerald-600 block">{t('hero.title2')}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/appointments"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full text-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-full text-lg hover:bg-emerald-600 hover:text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {t('hero.learnMore')}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {[
                { icon: Users, value: '15K+', label: 'Patients Served' },
                { icon: Award, value: '25+', label: 'Years Experience' },
                { icon: Clock, value: '98%', label: 'Success Rate' },
                { icon: Calendar, value: '5000+', label: 'Surgeries Performed' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Eye care professionals providing vision care"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh]"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-emerald-100 rounded-full opacity-20"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};