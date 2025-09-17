import React from 'react';
import { doctors } from '../../data/mockData';
import { Calendar, Award, Clock, Star } from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Meet Our Expert Ophthalmologists</h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
            Our team of board-certified ophthalmologists and eye care specialists are dedicated to providing 
            exceptional vision care with compassion and expertise
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                    <p className="text-emerald-600 font-semibold text-lg">{doctor.specialty}</p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {doctor.bio}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>Available for appointments</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Qualifications:</h4>
                    <ul className="space-y-1">
                      {doctor.qualifications.slice(0, 2).map((qual, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                          {qual}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Book Appointment
                    </button>
                    <button className="w-full border border-emerald-600 text-emerald-600 py-3 px-6 rounded-lg font-semibold hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Ophthalmologists?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our ophthalmologists are not just experts in their fields, but compassionate caregivers 
              committed to your vision health and well-being
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Board Certified</h3>
              <p className="text-gray-600 text-sm">All our doctors are board-certified ophthalmologists</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Hours</h3>
              <p className="text-gray-600 text-sm">Extended hours including evenings and weekends</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Focused</h3>
              <p className="text-gray-600 text-sm">Personalized eye care tailored to your unique vision needs</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Scheduling</h3>
              <p className="text-gray-600 text-sm">Online booking system available 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};