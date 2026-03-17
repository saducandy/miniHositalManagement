import React from "react";
import { Target, Eye, Heart, Lightbulb, GraduationCap } from "lucide-react";

export const VisionAndMission: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="text-white py-16"
        style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Vision & Mission
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#f0f8f4" }}
            >
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
                <Target
                  className="h-10 w-10 mr-4"
                  style={{ color: "#77a867" }}
                />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Mission
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
              To provide affordable, high-quality, and compassionate eye care service to all in the 
              region.
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
                src="https://cdn.pixabay.com/photo/2015/05/13/23/40/eye-766166_1280.jpg"
                alt="Vision and leadership in eye care"
                className="rounded-2xl shadow-xl w-full lg:w-[800px] h-[300px] object-cover"
              />
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Eye className="h-10 w-10 mr-4" style={{ color: "#77a867" }} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Vision
                </h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our commitment to excellence in eye care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Value */}
            <div
              className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              style={{
                background: `linear-gradient(to bottom right, #f0f8f4, #fef7e8)`,
              }}
            >
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
                style={{ backgroundColor: "#77a867" }}
              >
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Service Excellence
              </h3>
              <p className="text-gray-700 leading-relaxed text-center flex-grow">
                We are committed to comprehensive care delivered with empathy.
                Our goal is to provide the highest quality medical outcomes at
                the lowest possible cost to the patient.
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
            <div
              className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              style={{
                background: `linear-gradient(to bottom right, #fef7e8, #f0f8f4)`,
              }}
            >
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
                style={{ backgroundColor: "#fbce6e" }}
              >
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Pioneering Innovation
              </h3>
              <p className="text-gray-700 leading-relaxed text-center flex-grow">
                By leveraging state-of-the-art medical equipment and modern
                clinical approaches, we serve as a national model of excellence,
                elevating the standard of eye care across Ethiopia.
              </p>
              <div className="mt-auto pt-6">
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/18/17/27/eye-4559763_1280.jpg"
                  alt="Modern medical equipment and innovation"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Training Value */}
            <div
              className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              style={{
                background: `linear-gradient(to bottom right, #f0f8f4, #fef7e8)`,
              }}
            >
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
                style={{ backgroundColor: "#32705a" }}
              >
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Empowerment through Training
              </h3>
              <p className="text-gray-700 leading-relaxed text-center flex-grow">
                We believe in the power of education. By offering world-class
                training to ophthalmic staff, we expand the reach of quality
                eye care and improve patient outcomes far beyond our own doors.
              </p>
              <div className="mt-auto pt-6">
                <img
                  src="https://cdn.pixabay.com/photo/2024/12/28/01/27/ai-generated-9295105_1280.jpg"
                  alt="Medical training and education"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-16 text-white"
        style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Our Mission
          </h2>
          <p className="text-xl mb-8" style={{ color: "#f0f8f4" }}>
            Together, we can make quality eye care accessible to everyone in
            Sub-Saharan Africa.
          </p>
        </div>
      </section>
    </div>
  );
};
