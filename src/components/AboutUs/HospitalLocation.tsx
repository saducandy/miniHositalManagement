import React from "react";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15A2.25 2.25 0 012.25 17.25V6.75zm2.88-.75a.75.75 0 00-.63 1.17l6.37 4.96a1.5 1.5 0 001.86 0l6.37-4.96a.75.75 0 10-.94-1.17L12 11.06 5.75 6z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M2.25 5.25A3.75 3.75 0 016 1.5h1.06a2.25 2.25 0 012.12 1.47l.82 2.19a2.25 2.25 0 01-.54 2.37l-1.1 1.1a12.75 12.75 0 006.53 6.53l1.1-1.1a2.25 2.25 0 012.37-.54l2.19.82A2.25 2.25 0 0122.5 18.94V20A3.75 3.75 0 0118.75 23.75h-.5C9.6 23.75 2.25 16.4 2.25 7.75v-.5z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M12 1.5a10.5 10.5 0 110 21 10.5 10.5 0 010-21zm.75 5.25a.75.75 0 10-1.5 0v5.06c0 .2.08.39.22.53l3.19 3.19a.75.75 0 101.06-1.06l-2.97-2.97V6.75z" />
  </svg>
);

const LocationPin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M12 2.25a7.5 7.5 0 00-7.5 7.5c0 4.72 5.23 10.46 6.87 12.1a1 1 0 001.26 0C14.27 20.21 19.5 14.47 19.5 9.75a7.5 7.5 0 00-7.5-7.5zm0 10.5a3 3 0 110-6 3 3 0 010 6z" />
  </svg>
);

const HospitalLocation: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#32705A] tracking-tight">
            Our Location
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Visit Bahir Dar Specialty Eye Care Center
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <div className="text-[#FBCE6E] mt-1">
                  <LocationPin />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#32705A]">Address</h2>
                  <p className="mt-1 text-sm text-gray-700">
                    Bahir Dar Speciality Eye Care Center (BDSEC) - Bahir Dar
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=11.5943593,37.340867"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-xs font-semibold text-[#32705A] underline hover:text-[#FBCE6E]"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Email (General) */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <div className="text-[#FBCE6E] mt-1">
                  <MailIcon />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#32705A]">
                    General Email
                  </h2>
                  <a
                    href="mailto:mtarekegn@bdsec.org"
                    className="mt-1 inline-flex text-sm text-gray-700 hover:text-[#FBCE6E]"
                  >
                    info@bdsec.org
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <div className="text-[#FBCE6E] mt-1">
                  <ClockIcon />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#32705A]">
                    Working Hours
                  </h2>
                  <ul className="mt-2 text-sm text-gray-700 space-y-1">
                    <li>Monday to Sunday</li>
                    <li>8:00 AM to 12:30 AM</li>
                    <li>1:30 PM to 5:00 PM</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Patient Enquiries */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <div className="text-[#FBCE6E] mt-1">
                  <PhoneIcon />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#32705A]">
                    Patient Enquiries
                  </h2>
                  <div className="mt-2 space-y-1">
                    <a
                      href="tel:+251921577368"
                      className="block text-sm text-gray-700 hover:text-[#FBCE6E]"
                    >
                      (+251) 921577368
                    </a>
                    <a
                      href="mailto:tgashaw@bdsec.org"
                      className="block text-sm text-gray-700 hover:text-[#FBCE6E]"
                    >
                      tgashaw@bdsec.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-[#32705A]">
                    Get Directions
                  </h3>
                  <p className="text-xs text-gray-600">
                    Open the route in Google Maps
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=11.5943593,37.340867"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-[#32705A] text-white hover:bg-[#FBCE6E] hover:text-[#1f2937] transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-white/40 bg-white">
              <iframe
                title="Bahir Dar Specialty Eye Care Center Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.644982450842!2d37.340867!3d11.5943593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1644d3000ed84847%3A0xd3ca252bbba86b86!2sBahir%20Dar%20Specialty%20Eye%20Center!5e0!3m2!1sen!2set!4v1709610000000!5m2!1sen!2set"
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[420px]"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalLocation;
