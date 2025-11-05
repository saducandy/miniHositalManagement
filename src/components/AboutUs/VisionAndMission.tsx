import React from 'react';
import { Target, Eye, Heart, Lightbulb, GraduationCap } from 'lucide-react';

export const VisionAndMission: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-white py-16" style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vision & Mission</h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#f0f8f4' }}>
              Our commitment to excellence in eye care across Sub-Saharan Africa
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <Target className="h-10 w-10 mr-4" style={{ color: '#77a867' }} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To provide affordable, high-quality, and compassionate eye care service to all in the region.
              </p>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
              <img
                src="https://images.pexels.com/photos/5128234/pexels-photo-5128234.jpeg"
                alt="Healthcare professionals providing compassionate care"
                className="rounded-2xl shadow-xl w-full lg:w-[800px] h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
                alt="Vision and leadership in eye care"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Eye className="h-10 w-10 mr-4" style={{ color: '#77a867' }} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be Sub-Saharan Africa's leader in specialty eye care, making high-quality eye care accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our commitment to excellence in eye care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Value */}
            <div className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col" style={{ background: `linear-gradient(to bottom right, #f0f8f4, #fef7e8)` }}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#77a867' }}>
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Service</h3>
              <p className="text-gray-700 leading-relaxed text-center flex-grow">
                We provide comprehensive eye care service with compassion, seeking to deliver the highest quality at the lowest cost.
              </p>
              <div className="mt-auto pt-6">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
                  alt="Compassionate healthcare service"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Innovation Value */}
            <div className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col" style={{ background: `linear-gradient(to bottom right, #fef7e8, #f0f8f4)` }}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#fbce6e' }}>
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Innovation</h3>
              <p className="text-gray-700 leading-relaxed text-center flex-grow">
                We leverage state-of-the-art approaches and equipment to treat patients at the highest standards and serve as a center of excellence to elevate eye care across Ethiopia.
              </p>
              <div className="mt-auto pt-6">
                <img
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80"
                  alt="Modern medical equipment and innovation"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Training Value */}
            <div className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col" style={{ background: `linear-gradient(to bottom right, #f0f8f4, #fef7e8)` }}>
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#32705a' }}>
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Training</h3>
              <p className="text-gray-700 leading-relaxed text-center flex-grow">
                We offer training to ophthalmic personnel to expand access to quality eye care and improve outcomes across Ethiopia and beyond.
              </p>
              <div className="mt-auto pt-6">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80"
                  alt="Medical training and education"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us in Our Mission</h2>
          <p className="text-xl mb-8" style={{ color: '#f0f8f4' }}>
            Together, we can make quality eye care accessible to everyone in Sub-Saharan Africa.
          </p>
        </div>
      </section>
    </div>
  );
};

