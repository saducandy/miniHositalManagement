import React from 'react';
import { HeroSection } from '../components/Home/HeroSection';
import { ServicesPreview } from '../components/Home/ServicesPreview';
import { testimonials, faqs } from '../data/mockData';
import { Star, Quote, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export const HomePage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div>
      <HeroSection />
      <ServicesPreview />
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">Real stories from real patients about their eye care experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-emerald-200 mb-4" />
                  <p className="text-gray-600 leading-relaxed">{testimonial.review}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.patientName}</p>
                  <p className="text-sm text-gray-600">{testimonial.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about our services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                  aria-expanded={expandedFaq === faq.id}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {expandedFaq === faq.id ? (
                      <Minus className="h-5 w-5 text-gray-600" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Vision?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Schedule your eye exam today and experience the difference quality eye care makes
          </p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 transform hover:scale-105">
            Book Your Appointment Now
          </button>
        </div>
      </section>
    </div>
  );
};