import React, { useState } from "react";

type NewsItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  content?: string;
};

const newsItems: NewsItem[] = [
  {
    id: "1",
    date: "Oct 20, 2025",
    title: "New Retina Imaging System Commissioned",
    description:
      "We have deployed a state-of-the-art OCT system to enhance precision diagnostics for retinal conditions.",
    image:
      "https://cdn.pixabay.com/photo/2020/02/04/16/50/lens-4818786_640.jpg",
    content:
      "We proudly announce the commissioning of a next-generation OCT (Optical Coherence Tomography) system. This upgrade enhances early detection and monitoring of retinal diseases, allowing for more precise treatment planning and better patient outcomes. Our team has completed hands-on training to ensure seamless integration into daily clinical workflows.",
  },
  {
    id: "2",
    date: "Sep 12, 2025",
    title: "Community Outreach: Vision Screening in Rural Kebeles",
    description:
      "Our team completed a week-long outreach, screening 2,300+ residents and referring patients for timely care.",
    image:
      "https://cdn.pixabay.com/photo/2021/08/20/18/00/shaving-6560988_640.jpg",
    content:
      "In partnership with local health posts, our mobile eye team screened over two thousand residents, with on-site refraction, distribution of reading glasses, and referrals for cataract and glaucoma care. Follow-up clinics were scheduled to ensure continuity of care.",
  },
  {
    id: "3",
    date: "Aug 03, 2025",
    title: "Pediatric Eye Care Initiative Launched",
    description:
      "A new clinic day dedicated to pediatric patients with specialized assessments and child-friendly services.",
    image:
      "https://cdn.pixabay.com/photo/2020/04/08/07/19/eye-care-5016057_640.jpg",
    content:
      "The pediatric initiative introduces dedicated clinic sessions with age-appropriate visual acuity testing, strabismus evaluation, amblyopia management, and parent counseling. Our goal is to identify and treat childhood eye problems early.",
  },
  {
    id: "4",
    date: "Jul 18, 2025",
    title: "Tele‑Ophthalmology Triage Expanded",
    description:
      "Remote consultations now available for more districts, improving access and reducing travel burdens.",
    image: "https://cdn.pixabay.com/photo/2014/08/16/21/43/eye-419646_640.jpg",
    content:
      "By expanding secure tele-consultations, we offer faster triage, guidance, and referrals. This program reduces travel costs and enables timely decisions for urgent conditions while maintaining data privacy and quality of care.",
  },
  {
    id: "5",
    date: "Jun 02, 2025",
    title: "Surgical Capacity Upgrade",
    description:
      "Additional operating room hours and staffing have reduced wait times for cataract surgery appointments.",
    image:
      "https://cdn.pixabay.com/photo/2018/08/17/20/01/eyes-3613710_640.jpg",
    content:
      "Extended OR hours and streamlined pre-op assessments have meaningfully shortened surgical waitlists. Our perioperative team is focused on safety, efficiency, and a compassionate experience throughout the surgical journey.",
  },
  {
    id: "6",
    date: "May 10, 2025",
    title: "Glaucoma Awareness Campaign",
    description:
      "Public education sessions and free screening vouchers were distributed during Glaucoma Awareness Month.",
    image:
      "https://cdn.pixabay.com/photo/2020/04/10/23/10/visual-5028083_640.jpg",
    content:
      "Educational talks, radio segments, and community screenings helped raise awareness about the ‘silent thief of sight’. At‑risk individuals received vouchers for comprehensive testing and follow-up care.",
  },
];

const News: React.FC = () => {
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const close = () => setSelected(null);
  return (
    <section className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#32705A] to-[#77A867]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight transition-opacity duration-700 ease-out opacity-100">
              News & Updates
            </h1>
            <p className="mt-4 text-base sm:text-lg font-medium text-white/90">
              Stay informed with the latest from Bahir Dar Specialty Eye Care
              Center.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-white/10" />
          <div className="absolute bottom-6 right-10 h-24 w-24 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Intro Paragraph */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#32705A]">
            Latest at a glance
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#444]">
            From medical breakthroughs to community outreach, Bahir Dar
            Specialty Eye Care Center remains at the forefront of innovation and
            service. Explore our latest updates and see how we’re making a
            difference.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FBCE6E]"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-[#77A867]">
                  {item.date}
                </div>
                <h3 className="mt-2 text-lg font-bold text-[#32705A] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setSelected(item)}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 text-center">
          <button className="px-5 py-2 rounded-full text-sm font-semibold bg-[#32705A] text-white hover:bg-[#FBCE6E] hover:text-[#1f2937] transition-colors">
            Load More
          </button>
        </div>
      </div>

      {/* Closing Banner */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-white text-lg sm:text-xl font-semibold">
            “Sharing our milestones. Inspiring better vision for tomorrow.”
          </p>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#32705A] leading-snug">
                    {selected.title}
                  </h3>
                  <div className="mt-1 text-xs font-medium text-[#77A867]">
                    {selected.date}
                  </div>
                </div>
                <button
                  onClick={close}
                  className="shrink-0 h-9 w-9 rounded-full bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 flex items-center justify-center"
                  aria-label="Close"
                  title="Close"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4 max-h-[50vh] overflow-y-auto text-sm leading-relaxed text-gray-700">
                <p>{selected.content || selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
