import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Zap, Shield, Baby, ArrowRight } from 'lucide-react';

export const ServicesPreview: React.FC = () => {
  const services = [
    {
      icon: Eye,
      title: 'Comprehensive Eye Exams',
      description: 'Complete eye health evaluations with advanced diagnostic technology.',
      image: 'https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Zap,
      title: 'LASIK Surgery',
      description: 'Advanced laser vision correction for freedom from glasses and contacts.',
      image: 'https://images.pexels.com/photos/5752270/pexels-photo-5752270.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Shield,
      title: 'Retinal Care',
      description: 'Specialized treatment for diabetic retinopathy and macular degeneration.',
      image: 'https://images.pexels.com/photos/5752251/pexels-photo-5752251.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Baby,
      title: 'Pediatric Eye Care',
      description: 'Specialized eye care for children from infancy through adolescence.',
      image: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Eye Care Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive eye care services with state-of-the-art technology 
            and experienced ophthalmologists dedicated to your vision health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-emerald-600 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <service.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-4 py-2"
          >
            <span>View All Services</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};