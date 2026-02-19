import React from "react";
import { I18nContext } from "../../context/I18nContext";

const OurStory: React.FC = () => {
  const { t } = React.useContext(I18nContext) as any;

  return (
    <section className="min-h-screen">
      <div className="relative bg-gradient-to-br from-[#77a867]/25 via-[#fbce6e]/25 to-[#32705a]/25">
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-40 w-40 rounded-full bg-[#77a867]/30 blur-2xl absolute -top-10 -left-10" />
          <div className="h-48 w-48 rounded-full bg-[#fbce6e]/40 blur-2xl absolute top-16 right-10" />
          <div className="h-32 w-32 rounded-full bg-[#32705a]/30 blur-xl absolute bottom-10 left-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* BDSEC intro (EN/AM) */}
          <div className="mb-10">
            <div className="rounded-2xl bg-white/95 shadow-xl ring-1 ring-white/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(251, 206, 110, 0.25)" }}
                >
                  <span className="text-[#32705a] font-extrabold">BD</span>
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#32705a]">
                    {t("story.intro.title")}
                  </h2>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {t("story.intro.body")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white/95 shadow-xl ring-1 ring-white/40 p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#32705a]">
                  👁️ Our Story
                </h1>
                <div className="mt-5 space-y-5 text-gray-700 leading-relaxed">
                  <p>
                    It is established by strong partnership between the
                    Himalayan Cataract Project (HCP), the Federal Ministry of
                    Health (FMoH), and the Amhara National Regional State Health
                    Bureau.
                  </p>
                  <p>
                    At BDSEC, we believe that high-quality eye care should not be
                    a luxury. Our strategic objective is:
                  </p>
                  <p>
                    <strong>Clinical Impact:</strong> Eradicating avoidable
                    blindness across the Amhara region by providing affordable,
                    high-standard surgical and clinical services to those in
                    need.
                  </p>
                  <p>
                    <strong>Professional Growth:</strong> Strengthening the
                    national healthcare system through structured, high-tier
                    training programs for the next generation of ophthalmic
                    personnel.
                  </p>
                  <p>
                    Beyond the walls of our clinic, BDSEC is envisioned as a
                    Sub-Saharan center of excellence. We don't just treat
                    patients; we set the benchmark for best practices. By serving
                    as a premier site for professional development and ophthalmic
                    training, we empower healthcare providers from across the
                    continent to replicate our success in their own communities.
                  </p>
                  <p>
                    Our specialized services do more than restore sight—they
                    ensure the center's long-term sustainability, allowing us to
                    reinvest in the latest technology and continue our mission
                    of providing compassionate, low-cost care for all.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 aspect-[16/10] rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/50">
                  <img
                    src="https://cdn.pixabay.com/photo/2013/03/09/04/09/optometrist-91750_1280.jpg"
                    alt="Eye examination"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/50">
                  <img
                    src="https://cdn.pixabay.com/photo/2025/06/26/09/51/doctor-9681592_1280.png"
                    alt="Ophthalmology equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/50">
                  <img
                    src="https://cdn.pixabay.com/photo/2020/04/08/07/23/eye-care-5016078_1280.jpg"
                    alt="Care for patients"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#77a867]/20 via-[#fbce6e]/20 to-[#32705a]/20 h-2" />
    </section>
  );
};

export default OurStory;
