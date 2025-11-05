import React from "react";

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  {
    name: "Dr. Meron T.",
    title: "Chief Medical Director",
    bio: "Oversees clinical excellence across subspecialties with a focus on safety, outcomes, and patient-centered care.",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=640&q=80",
    linkedin: "#",
  },
  {
    name: "Temesgen G.",
    title: "Chief Operating Officer",
    bio: "Leads operations, people, and performance to ensure reliable access and a seamless patient experience.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=640&q=80",
    linkedin: "#",
  },
  {
    name: "Selam A.",
    title: "Head of Outreach & Tele-Ophthalmology",
    bio: "Expands equitable vision care through community screening, referrals, and digital services.",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=640&q=80",
    linkedin: "#",
  },
  {
    name: "Mulu H.",
    title: "Nursing & Patient Experience Director",
    bio: "Drives compassionate practice standards and continuous improvement in bedside care.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80",
    linkedin: "#",
  },
  {
    name: "Dagmawi K.",
    title: "Finance & Compliance Lead",
    bio: "Ensures sustainable growth with transparent governance and responsible stewardship.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=640&q=80",
    linkedin: "#",
  },
  {
    name: "Hanna Y.",
    title: "Education & Training Coordinator",
    bio: "Leads skill-building and research partnerships to advance eye care standards.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=640&q=80",
    linkedin: "#",
  },
];

const ManagementTeam: React.FC = () => {
  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867] to-[#32705A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight transition-opacity duration-700 ease-out opacity-100">
              Meet Our Management Team
            </h1>
            <p
              className="mt-4 text-base sm:text-lg font-medium"
              style={{ color: "#FBCE6E" }}
            >
              The guiding eyes behind our vision of excellence.
            </p>
            <p className="mt-2 italic text-white/90">
              Your vision inspires ours.
            </p>
          </div>
        </div>
        {/* subtle floating accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-white/10" />
          <div className="absolute bottom-6 right-10 h-24 w-24 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Intro Paragraph */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#32705A]">
            Leadership with Purpose
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#444]">
            At Bahir Dar Specialty Eye Care Center, our management team is built
            on experience, compassion, and innovation — leading with a shared
            commitment to providing world-class eye care for our community.
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-28 w-28 rounded-full object-cover ring-4 ring-[#FBCE6E]"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#32705A]">
                  {member.name}
                </h3>
                <p className="text-sm italic" style={{ color: "#77A867" }}>
                  {member.title}
                </p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
                {member.linkedin && (
                  <div className="mt-3">
                    <a
                      href={member.linkedin}
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors"
                      style={{ color: "#FBCE6E" }}
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 group-hover:scale-110 transition-transform"
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 5-2.7 5.4 0 6.4 3.6 6.4 8.2V24h-5V17c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.8-2.8 3.8V24h-5V8z" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Banner */}
      <div className="bg-gradient-to-r from-[#32705A] to-[#77A867]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <blockquote className="text-white text-xl sm:text-2xl font-semibold">
            “Together, we see a brighter future.”
          </blockquote>
          <div
            className="mx-auto mt-3 h-1 w-24 rounded-full"
            style={{ backgroundColor: "#FBCE6E" }}
          />
        </div>
      </div>
    </section>
  );
};

export default ManagementTeam;
