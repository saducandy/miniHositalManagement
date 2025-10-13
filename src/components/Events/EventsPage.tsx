import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Heart, Activity } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/dateUtils';

type ApiEvent = {
  id: number;
  documentId: string;
  category: string;
  title: string;
  descreption: string;
  date: string;
  location: string;
  learnMore: string;
  ec_event_registered_customers: any[];
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
    url: string;
  };
};

type Event = {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  learnMore: string;
  imageUrl: string;
};

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Registration form state
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  
  // Learn More modal state
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState<boolean>(false);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState<Event | null>(null);
  
  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('https://strapi.hielav.com/api/ec-events?populate=*', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load events: ${res.status}`);
        const json: { data: ApiEvent[] } = await res.json();

        const mapped: Event[] = (json.data || []).map((event) => {
          const imagePath = event?.image?.url || '';
          const absoluteUrl = imagePath
            ? imagePath.startsWith('http')
              ? imagePath
              : `https://strapi.hielav.com${imagePath}`
            : '';
          return {
            id: event.id,
            category: event.category.toLowerCase(),
            title: event.title,
            description: event.descreption,
            date: event.date,
            location: event.location,
            learnMore: event.learnMore,
            imageUrl: absoluteUrl,
          };
        });
        setEvents(mapped);
      } catch (err: any) {
        if (err?.name !== 'AbortError') setError(err?.message || 'Failed to load events');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
    return () => controller.abort();
  }, []);

  // Registration handlers
  const handleRegisterClick = (eventId: number) => {
    setSelectedEventId(eventId);
    setIsRegistrationModalOpen(true);
    setRegistrationError(null);
    setRegistrationSuccess(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegistrationError(null);

    try {
      const response = await fetch('https://strapi.hielav.com/api/ec-event-registered-customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            fullName: registrationForm.fullName,
            email: registrationForm.email,
            phoneNumber: registrationForm.phoneNumber,
            ec_event: selectedEventId
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.status}`);
      }

      setRegistrationSuccess(true);
      setRegistrationForm({ fullName: '', email: '', phoneNumber: '' });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsRegistrationModalOpen(false);
        setRegistrationSuccess(false);
      }, 2000);

    } catch (err: any) {
      setRegistrationError(err.message || 'Failed to register for event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsRegistrationModalOpen(false);
    setRegistrationForm({ fullName: '', email: '', phoneNumber: '' });
    setRegistrationError(null);
    setRegistrationSuccess(false);
  };

  // Learn More handlers
  const handleLearnMoreClick = (event: Event) => {
    setSelectedEventForDetails(event);
    setIsLearnMoreModalOpen(true);
  };

  const closeLearnMoreModal = () => {
    setIsLearnMoreModalOpen(false);
    setSelectedEventForDetails(null);
  };

  // Newsletter subscription handlers
  const handleNewsletterEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletterEmail(e.target.value);
    setSubscriptionError(null);
  };

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubscribing(true);
    setSubscriptionError(null);

    try {
      const response = await fetch('https://strapi.hielav.com/api/ec-email-subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            email: newsletterEmail.trim()
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.message === 'This attribute must be unique') {
          setSubscriptionError('This email is already subscribed to our newsletter.');
        } else {
          throw new Error(`Subscription failed: ${response.status}`);
        }
        return;
      }

      setSubscriptionSuccess(true);
      setNewsletterEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubscriptionSuccess(false);
      }, 3000);

    } catch (err: any) {
      setSubscriptionError(err.message || 'Failed to subscribe to newsletter');
    } finally {
      setIsSubscribing(false);
    }
  };

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
            {isLoading && (
              <div className="col-span-full text-center text-gray-600">Loading events...</div>
            )}
            {error && (
              <div className="col-span-full text-center text-red-600">{error}</div>
            )}
            {!isLoading && !error && events.map((event) => {
              const EventIcon = getEventIcon(event.category);
              return (
                <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={event.imageUrl || '/logo.png'}
                      alt={event.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(event.category)}`}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <EventIcon className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {event.category.replace('-', ' ').toUpperCase()}
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
                        <span>{formatTime(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-3 text-emerald-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleRegisterClick(event.id)}
                        className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      >
                        Register Now
                      </button>
                      <button 
                        onClick={() => handleLearnMoreClick(event)}
                        className="flex-1 border border-emerald-600 text-emerald-600 py-3 px-6 rounded-lg font-semibold hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      >
                        {event.learnMore}
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
            <form onSubmit={handleNewsletterSubscription} className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={handleNewsletterEmailChange}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              
              {/* Success Message */}
              {subscriptionSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-600 text-sm text-center">
                    ✅ Successfully subscribed to our newsletter!
                  </p>
                </div>
              )}
              
              {/* Error Message */}
              {subscriptionError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm text-center">
                    {subscriptionError}
                  </p>
                </div>
              )}
            </form>
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

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Register for Event</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {registrationSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Registration Successful!</h3>
                  <p className="text-gray-600">You have been successfully registered for the event.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitRegistration} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={registrationForm.fullName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={registrationForm.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={registrationForm.phoneNumber}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {registrationError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{registrationError}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Learn More Modal */}
      {isLearnMoreModalOpen && selectedEventForDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Event Image */}
              <div className="relative h-64">
                <img
                  src={selectedEventForDetails.imageUrl || '/logo.png'}
                  alt={selectedEventForDetails.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(selectedEventForDetails.category)}`}>
                    {selectedEventForDetails.category.charAt(0).toUpperCase() + selectedEventForDetails.category.slice(1).replace('-', ' ')}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    {React.createElement(getEventIcon(selectedEventForDetails.category), { className: "h-5 w-5 text-emerald-600" })}
                    <span className="text-sm font-medium text-gray-900">
                      {selectedEventForDetails.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeLearnMoreModal}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Event Details */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedEventForDetails.title}</h2>
                
                <div className="prose prose-gray max-w-none mb-8">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {selectedEventForDetails.description}
                  </p>
                </div>

                {/* Learn More Section */}
                {selectedEventForDetails.learnMore && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-emerald-800 mb-3">Detail</h3>
                    <p className="text-emerald-700 leading-relaxed">
                      {selectedEventForDetails.learnMore}
                    </p>
                  </div>
                )}

                {/* Event Information */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Date:</span>
                        <span className="ml-2">{formatDate(selectedEventForDetails.date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Time:</span>
                        <span className="ml-2">{formatTime(selectedEventForDetails.date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-3 text-emerald-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">{selectedEventForDetails.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      {React.createElement(getEventIcon(selectedEventForDetails.category), { className: "h-5 w-5 mr-3 text-emerald-600 flex-shrink-0" })}
                      <div>
                        <span className="font-medium">Category:</span>
                        <span className="ml-2 capitalize">{selectedEventForDetails.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      closeLearnMoreModal();
                      handleRegisterClick(selectedEventForDetails.id);
                    }}
                    className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Register Now
                  </button>
                  <button
                    onClick={closeLearnMoreModal}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};