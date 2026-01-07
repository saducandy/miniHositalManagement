import React, { useContext, useEffect, useMemo, useState } from "react";
import { I18nContext } from "../../context/I18nContext";
import { getApiUrl, getImageUrl } from "../../config/api";

type ApiTeamMember = {
  id: number;
  name: string;
  name_AM?: string | null;
  position: string;
  position_AM?: string | null;
  descreption: string;
  descreption_AM?: string | null;
  linkName?: string | null;
  linkName_AM?: string | null;
  image?: { url?: string | null } | null;
};

type TeamMember = {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
};

const ManagementTeam: React.FC = () => {
  const { language } = useContext(I18nContext);
  const [team, setTeam] = useState<ApiTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTeam = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          getApiUrl("api/ec-about-us-management-team-cards?populate=*"),
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error(`Failed to load management team: ${res.status}`);

        const json: { data: ApiTeamMember[] } = await res.json();
        setTeam(json.data || []);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err?.message || "Failed to load management team");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
    return () => controller.abort();
  }, []);

  const normalizeLink = (link?: string | null) => {
    if (!link) return undefined;
    return link.startsWith("http") ? link : `https://${link}`;
  };

  const localizedTeam: TeamMember[] = useMemo(() => {
    const pick = (en: string, am?: string | null) =>
      language === "am" && am ? am : en;

    return (team || []).map((member) => ({
      id: member.id,
      name: pick(member.name, member.name_AM),
      title: pick(member.position, member.position_AM),
      bio: pick(member.descreption, member.descreption_AM),
      image: getImageUrl(member.image?.url || "") || "/logo.png",
      linkedin: normalizeLink(pick(member.linkName || "", member.linkName_AM)),
    }));
  }, [language, team]);

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
          {isLoading && (
            <div className="col-span-full text-center text-gray-600">
              Loading management team...
            </div>
          )}
          {error && (
            <div className="col-span-full text-center text-red-600">{error}</div>
          )}
          {!isLoading && !error && localizedTeam.length === 0 && (
            <div className="col-span-full text-center text-gray-600">
              No team members found.
            </div>
          )}
          {!isLoading &&
            !error &&
            localizedTeam.map((member) => (
              <div
                key={member.id || member.name}
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
                        target="_blank"
                        rel="noopener noreferrer"
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
