import React from "react";
import { Sun, Apple, Glasses, Calendar } from "lucide-react";

const AboutTheEye: React.FC = () => {
  return (
    <section className="min-h-screen">
      {/* Header / Hero */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/20 via-white to-[#FBCE6E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              About the Eye
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
              Understanding your eyes for better vision and health
            </p>
          </div>
        </div>
      </div>

      {/* Anatomy Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 md:items-center">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-[#FBCE6E]/40">
                <img
                  src="https://cdn.pixabay.com/photo/2024/12/13/21/21/eye-9266169_640.jpg"
                  alt="Human eye illustration"
                  className="w-full h-72 md:h-[22rem] object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#32705A]">
                Anatomy of the Eye
              </h2>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                The eye is a complex organ that captures light and converts it
                into signals the brain can understand. Key parts work together
                to provide clear vision.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Cornea",
                    desc: "Clear front window that focuses incoming light.",
                  },
                  {
                    name: "Lens",
                    desc: "Adjusts focus for near and far objects (accommodation).",
                  },
                  {
                    name: "Retina",
                    desc: "Light‑sensitive layer that converts light into signals.",
                  },
                  {
                    name: "Macula",
                    desc: "Central area responsible for detailed, sharp vision.",
                  },
                  {
                    name: "Optic Nerve",
                    desc: "Carries visual signals from the eye to the brain.",
                  },
                  {
                    name: "Iris & Pupil",
                    desc: "Control how much light enters the eye.",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="rounded-xl border border-gray-100 p-4 bg-white shadow-sm"
                  >
                    <h3 className="text-sm font-bold text-[#32705A]">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Eye Conditions */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#32705A]">
              Common Eye Conditions
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Learn about frequent eye concerns, their causes, and symptoms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Cataract",
                desc: "Clouding of the lens causing blurry vision, glare, and faded colors; often age‑related.",
                img: "https://cdn.pixabay.com/photo/2014/12/10/20/48/medic-563425_640.jpg",
              },
              {
                name: "Glaucoma",
                desc: "Group of conditions damaging the optic nerve, commonly linked to high eye pressure.",
                img: "https://cdn.pixabay.com/photo/2017/09/20/20/59/eye-2769921_640.jpg",
              },
              {
                name: "Myopia (Nearsighted)",
                desc: "Distant objects appear blurry; light focuses in front of the retina.",
                img: "https://cdn.pixabay.com/photo/2018/11/18/10/19/doctor-3822863_640.jpg",
              },
              {
                name: "Hyperopia (Farsighted)",
                desc: "Near objects are hard to focus; light focuses behind the retina.",
                img: "https://cdn.pixabay.com/photo/2020/12/18/00/43/doctor-5840874_640.png",
              },
            ].map((c) => (
              <article
                key={c.name}
                className="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#32705A]">{c.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Eye Health Tips */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#32705A]">
              Eye Health Tips
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Simple habits to keep your eyes healthy and your vision clear.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: "Regular Eye Exams",
                desc: "Schedule routine exams to detect issues early and update prescriptions.",
              },
              {
                icon: Sun,
                title: "Protect from UV",
                desc: "Wear sunglasses with UV protection and wide‑brim hats outdoors.",
              },
              {
                icon: Apple,
                title: "Balanced Diet",
                desc: "Eat leafy greens, fish rich in omega‑3, and colorful vegetables.",
              },
              {
                icon: Glasses,
                title: "Screen Breaks",
                desc: "Use the 20‑20‑20 rule and maintain proper screen distance.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="text-center p-8 bg-[#F9FAFB] rounded-2xl border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#FBCE6E] rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(t.icon, {
                    className: "h-7 w-7 text-[#1f2937]",
                  })}
                </div>
                <h3 className="text-base font-semibold text-[#32705A]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Keep your vision at its best — book an eye check‑up
          </h3>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTheEye;
