import React, { useEffect, useMemo, useState } from "react";
import { I18nContext } from "../../context/I18nContext";
import { getApiUrl, getImageUrl } from "../../config/api";
import { MapPin, Users2 } from "lucide-react";

type ApiStaffImageFormat = {
  url?: string;
};

type ApiStaffImage = {
  url?: string;
  formats?: {
    medium?: ApiStaffImageFormat;
  };
} | null;

type ApiStaffInfo = {
  id: number;
  heading?: string | null;
  heading_AM?: string | null;
  description?: string | null;
  description_AM?: string | null;
  name?: string | null;
  name_AM?: string | null;
  position?: string | null;
  position_AM?: string | null;
  country?: string | null;
  country_AM?: string | null;
  image?: ApiStaffImage;
};

type StaffMember = {
  id: number;
  name: string;
  name_AM: string;
  position: string;
  position_AM: string;
  country: string;
  country_AM: string;
  imageUrl: string;
};

type StaffCategory = {
  key: string;
  heading: string;
  heading_AM: string;
  description: string;
  description_AM: string;
  members: StaffMember[];
};

const OurStaff: React.FC = () => {
  const { language, t } = React.useContext(I18nContext) as any;
  const [categories, setCategories] = useState<StaffCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStaff = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(getApiUrl("api/ec-staff-infos?populate=*"), {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load staff: ${res.status}`);

        const json: { data: ApiStaffInfo[] } = await res.json();
        const items = json?.data || [];

        const groups = new Map<string, StaffCategory>();

        for (const item of items) {
          const heading = (item.heading || "").trim();
          const heading_AM = (item.heading_AM || "").trim();
          const description = (item.description || "").trim();
          const description_AM = (item.description_AM || "").trim();

          const key = [heading, description, heading_AM, description_AM].join("||");
          if (!groups.has(key)) {
            groups.set(key, {
              key,
              heading,
              heading_AM,
              description,
              description_AM,
              members: [],
            });
          }

          const mediumPath = item?.image?.formats?.medium?.url;
          const fallbackPath = item?.image?.url;
          const imageUrl = getImageUrl(mediumPath || fallbackPath || "");

          const member: StaffMember = {
            id: item.id,
            name: (item.name || "").trim(),
            name_AM: (item.name_AM || "").trim(),
            position: (item.position || "").trim(),
            position_AM: (item.position_AM || "").trim(),
            country: (item.country || "").trim(),
            country_AM: (item.country_AM || "").trim(),
            imageUrl,
          };

          groups.get(key)!.members.push(member);
        }

        const grouped = Array.from(groups.values())
          .map((c) => ({
            ...c,
            members: [...c.members].sort((a, b) => a.id - b.id),
          }))
          .sort((a, b) => a.key.localeCompare(b.key));

        setCategories(grouped);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err?.message || "Failed to load staff");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
    return () => controller.abort();
  }, []);

  const ui = useMemo(() => {
    const isAm = language === "am";
    const pick = (en: string, am: string) => (isAm ? am || en : en || am);
    return { isAm, pick };
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brandGreen to-brandDeep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t("staff.hero.heading")}
          </h1>
          <p className="text-xl lg:text-2xl text-brandYellow max-w-3xl mx-auto">
            {t("staff.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="text-center text-gray-600">{t("staff.loading")}</div>
          )}
          {error && (
            <div className="text-center text-red-600">{t("staff.error")}</div>
          )}

          {!isLoading && !error && categories.length === 0 && (
            <div className="text-center text-gray-600">{t("staff.empty")}</div>
          )}

          <div className="space-y-10">
            {categories.map((cat) => {
              const heading = ui.pick(cat.heading, cat.heading_AM);
              const description = ui.pick(cat.description, cat.description_AM);

              return (
                <div
                  key={cat.key}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="p-6 md:p-8 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {heading || t("staff.category.untitled")}
                        </h2>
                        {description && (
                          <p className="mt-2 text-gray-600 leading-relaxed">
                            {description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0 text-brandDeep bg-brandYellow/20 px-3 py-1.5 rounded-full text-sm font-semibold">
                        <Users2 className="h-4 w-4" />
                        <span>
                          {cat.members.length} {t("staff.category.staffCount")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cat.members.map((m) => {
                        const name = ui.pick(m.name, m.name_AM);
                        const position = ui.pick(m.position, m.position_AM);
                        const country = ui.pick(m.country, m.country_AM);

                        return (
                          <div
                            key={m.id}
                            className="rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-md transition-shadow"
                          >
                            {/* Image */}
                            <div className="w-full aspect-[4/3] bg-gray-100 relative overflow-hidden">
                              {m.imageUrl ? (
                                <>
                                  {/* Blurred background fill */}
                                  <img
                                    src={m.imageUrl}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 h-full w-full object-cover blur-xl scale-110"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-white/10" />

                                  {/* Fully shown image */}
                                  <img
                                    src={m.imageUrl}
                                    alt={name}
                                    className="relative z-10 h-full w-full object-contain"
                                    loading="lazy"
                                  />
                                </>
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                                  N/A
                                </div>
                              )}
                            </div>

                            {/* Details */}
                            <div className="p-5">
                              <p className="font-semibold text-gray-900">
                                {name || t("staff.member.unknown")}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {position}
                              </p>
                              {country && (
                                <div className="mt-3 flex items-center text-xs text-gray-500 gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{country}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStaff;

