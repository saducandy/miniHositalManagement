import React from "react";

type Feature = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const VideoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M3.75 6A2.25 2.25 0 016 3.75h7.5A2.25 2.25 0 0115.75 6v.94l2.95-1.97A1.5 1.5 0 0121 6.3v11.4a1.5 1.5 0 01-2.3 1.33l-2.95-1.97v.96A2.25 2.25 0 0113.5 20.25H6A2.25 2.25 0 013.75 18V6z" />
  </svg>
);

const DiagnoseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M12 1.5a10.5 10.5 0 110 21 10.5 10.5 0 010-21zm0 4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM9.75 12a2.25 2.25 0 114.5 0v5.25a2.25 2.25 0 11-4.5 0V12z" />
  </svg>
);

const RxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M6 3.75A2.25 2.25 0 018.25 1.5h7.5A2.25 2.25 0 0118 3.75V12a6 6 0 11-12 0V3.75zM7.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const features: Feature[] = [
  {
    title: "Secure Video Consultations",
    desc: "Connect with our ophthalmologists for remote assessments and follow‑ups.",
    icon: <VideoIcon />,
  },
  {
    title: "Remote Diagnosis",
    desc: "Upload images and history for expert review and timely guidance.",
    icon: <DiagnoseIcon />,
  },
  {
    title: "E‑Prescriptions",
    desc: "Receive prescriptions and care plans without traveling to the hospital.",
    icon: <RxIcon />,
  },
];

const TeleOphtalmology: React.FC = () => {
  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867] to-[#FBCE6E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              Tele-Ophthalmology Services
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
              Quality eye care, wherever you are
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <p className="text-[15px] sm:text-base leading-relaxed text-[#444]">
            Bahir Dar Specialty Eye Care Center brings eye care to your
            fingertips. Our tele‑ophthalmology services allow patients in remote
            areas to consult our specialists, receive diagnosis, and manage eye
            conditions without traveling to the hospital.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl bg-white shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FBCE6E]"
            >
              <div className="h-11 w-11 rounded-full bg-[#FBCE6E]/20 ring-2 ring-[#FBCE6E] flex items-center justify-center text-[#32705A]">
                {f.icon}
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#32705A]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-extrabold text-[#32705A] text-center">
          How it works
        </h2>
        <div className="mt-6 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: 1, t: "Book an online consultation" },
            { n: 2, t: "Upload medical history or images" },
            { n: 3, t: "Meet your specialist via video" },
            { n: 4, t: "Receive diagnosis and care plan" },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-xl bg-white shadow-sm border border-gray-100 p-6"
            >
              <div className="h-8 w-8 rounded-full bg-[#FBCE6E] text-[#1f2937] font-bold flex items-center justify-center">
                {s.n}
              </div>
              <div className="mt-2 text-sm text-gray-800">{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <a
            href="/appointments"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold bg-[#32705A] text-white hover:bg-[#FBCE6E] hover:text-[#1f2937] transition-colors"
          >
            Book Online Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeleOphtalmology;
