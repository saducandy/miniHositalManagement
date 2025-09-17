import React from 'react';
import { departments } from '../../data/mockData';
import { ArrowRight, Users, Clock, Award, MapPin } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Eye Care Services</h1>
            <p className="text-xl lg:text-2xl text-emerald-100 max-w-3xl mx-auto">
              Comprehensive eye care services delivered by our expert ophthalmologists using state-of-the-art technology
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {departments.map((department, index) => (
              <div key={department.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={department.image}
                      alt={department.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{department.name}</h3>
                      <ArrowRight className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {department.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Services Include:</h4>
                      <ul className="space-y-2">
                        {department.services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Users className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>Department Head: {department.head}</span>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600">Excellence in eye care through innovation and compassion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Care</h3>
              <p className="text-gray-600">
                Board-certified ophthalmologists with years of experience in specialized eye care
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Extended Hours</h3>
              <p className="text-gray-600">
                Extended hours including evenings and weekends for your convenience
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Convenient Location</h3>
              <p className="text-gray-600">
                Easily accessible location with ample parking and public transportation options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Quality Eye Care?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Book your eye exam today and take the first step towards better vision
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
              Book Appointment
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};