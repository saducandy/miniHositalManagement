import React from 'react';
import { events } from '../../data/mockData';
import { Calendar, Clock, MapPin, Users, Heart, Activity } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/dateUtils';

export const EventsPage: React.FC = () => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'awareness': return Heart;
      case 'campaign': return Users;
      case 'health-check': return Activity;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'awareness': return 'bg-red-100 text-red-800';
      case 'campaign': return 'bg-blue-100 text-blue-800';
      case 'health-check': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Eye Health Events & Programs</h1>
          <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
            Join our community eye health initiatives, educational workshops, and vision wellness programs 
            designed to promote better eye health for everyone
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => {
              const EventIcon = getEventIcon(event.type);
              return (
                <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <EventIcon className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {event.type.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {event.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-3 text-emerald-600" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-3 text-emerald-600" />
                        <span>{formatTime(event.time)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-3 text-emerald-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                        Register Now
                      </button>
                      <button className="flex-1 border border-emerald-600 text-emerald-600 py-3 px-6 rounded-lg font-semibold hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated on Eye Health Events
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Subscribe to our newsletter to receive updates on upcoming eye health events, workshops, and community programs
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
              />
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Events We Offer</h2>
            <p className="text-xl text-gray-600">Various programs designed to meet different eye health and vision wellness needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-red-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Awareness Campaigns</h3>
              <p className="text-gray-600">
                Educational programs focused on specific eye conditions and vision prevention strategies
              </p>
            </div>

            <div className="text-center p-8 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Campaigns</h3>
              <p className="text-gray-600">
                Community-wide eye health initiatives and workshops promoting vision wellness and eye care
              </p>
            </div>

            <div className="text-center p-8 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Check-ups</h3>
              <p className="text-gray-600">
                Free and discounted eye screenings and preventive vision care services for the community
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};