import React, { useContext } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { I18nContext } from '../../context/I18nContext';

export const Footer: React.FC = () => {
  const { t } = useContext(I18nContext);
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="Bahir Dar Eye Care Center logo" className="h-8 w-8 rounded-full object-cover" />
              <div>
                <h3 className="text-xl font-bold">{t('footer.brand.name')}</h3>
                <p className="text-sm text-gray-400">{t('footer.brand.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-6">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2">
              {[t('footer.quickLinks.home'), t('footer.quickLinks.services'), t('footer.quickLinks.doctors'), t('footer.quickLinks.appointments'), t('footer.quickLinks.events'), t('footer.quickLinks.contact')].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link === t('footer.quickLinks.home') ? '/' : `/${(t('footer.quickLinks.home') === 'Home' ? link.toLowerCase() : link).toLowerCase()}`}
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
            <h4 className="text-lg font-semibold mb-4">{t('footer.services.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">{t('footer.services.exam')}</li>
              <li className="text-gray-400">{t('footer.services.lasik')}</li>
              <li className="text-gray-400">{t('footer.services.retinal')}</li>
              <li className="text-gray-400">{t('footer.services.pediatric')}</li>
              <li className="text-gray-400">{t('footer.services.glaucoma')}</li>
              <li className="text-gray-400">{t('footer.services.cataract')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{t('footer.contact.phone')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{t('footer.contact.email')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{t('footer.contact.address.line1')}<br />{t('footer.contact.address.line2')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{t('footer.contact.hours')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('footer.copy')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors focus:outline-none focus:text-emerald-400">
                {t('footer.links.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors focus:outline-none focus:text-emerald-400">
                {t('footer.links.terms')}
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors focus:outline-none focus:text-emerald-400">
                {t('footer.links.accessibility')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};