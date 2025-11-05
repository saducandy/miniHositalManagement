import React from "react";
import { Calendar, Award, Clock, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { I18nContext } from "../../context/I18nContext";

type ApiDoctor = {
  id: number;
  name: string;
  speciality: string;
  description: string;
  exprience: string | number;
  availability: boolean;
  qualification: string;
  rating: number;
  doctorsImage?: { url?: string } | null;
};

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  description: string;
  experienceYears: string;
  availability: boolean;
  qualification: string;
  rating: number;
  imageUrl: string;
};

export const DoctorsPage: React.FC = () => {
  const { t } = React.useContext(I18nContext);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          "https://strapi.hielav.com/api/ec-doctors?populate=*",
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error(`Failed to load doctors: ${res.status}`);
        const json: { data: ApiDoctor[] } = await res.json();

        const mapped: Doctor[] = (json.data || []).map((d) => {
          const imagePath = d?.doctorsImage?.url || "";
          const absoluteUrl = imagePath
            ? imagePath.startsWith("http")
              ? imagePath
              : `https://strapi.hielav.com${imagePath}`
            : "";
          return {
            id: d.id,
            name: d.name,
            speciality: d.speciality,
            description: d.description,
            experienceYears: `${d.exprience} Years of Experience`,
            availability: Boolean(d.availability),
            qualification: d.qualification,
            rating: Number(d.rating ?? 0),
            imageUrl: absoluteUrl,
          };
        });
        setDoctors(mapped);
      } catch (err: any) {
        if (err?.name !== "AbortError")
          setError(err?.message || "Failed to load doctors");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="text-white py-16"
        style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {t("doctors.hero.heading")}
          </h1>
          <p
            className="text-xl lg:text-2xl max-w-3xl mx-auto"
            style={{ color: "#f0f8f4" }}
          >
            {t("doctors.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && (
              <div className="col-span-full text-center text-gray-600">
                {t("doctors.loading")}
              </div>
            )}
            {error && (
              <div className="col-span-full text-center text-red-600">
                {t("doctors.error")}
              </div>
            )}
            {!isLoading &&
              !error &&
              doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative w-full h-64 overflow-hidden flex items-center justify-center">
                    <div
                      className="absolute inset-0 bg-center bg-cover transform scale-110 filter blur-lg opacity-40"
                      style={{
                        backgroundImage: `url(${
                          doctor.imageUrl || "/logo.png"
                        })`,
                      }}
                    />
                    <img
                      src={doctor.imageUrl || "/logo.png"}
                      alt={doctor.name}
                      className="relative z-10 max-h-full w-auto object-contain"
                    />
                    <div className="absolute top-2 right-2 z-20 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <Star
                          className="h-3 w-3 fill-current"
                          style={{ color: "#fbce6e" }}
                        />
                        <span className="text-xs font-medium">
                          {doctor.rating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p
                        className="font-semibold text-base"
                        style={{ color: "#77a867" }}
                      >
                        {doctor.speciality}
                      </p>
                    </div>

                    <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-3">
                      {doctor.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-600">
                        <Award
                          className="h-3 w-3 mr-2"
                          style={{ color: "#77a867" }}
                        />
                        <span>
                          {doctor.experienceYears.replace(
                            "Years of Experience",
                            t("doctors.years")
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock
                          className="h-3 w-3 mr-2"
                          style={{ color: "#77a867" }}
                        />
                        <span>
                          {doctor.availability
                            ? t("doctors.available")
                            : t("doctors.unavailable")}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        {t("doctors.qualifications")}
                      </h4>
                      <ul className="space-y-1">
                        <li className="text-xs text-gray-600 flex items-start">
                          <div
                            className="w-1 h-1 rounded-full mr-2 mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: "#77a867" }}
                          ></div>
                          {doctor.qualification}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <button
                        className="w-full text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={
                          {
                            backgroundColor: "#77a867",
                            "--tw-ring-color": "#77a867",
                          } as React.CSSProperties & {
                            "--tw-ring-color": string;
                          }
                        }
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#32705a")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#77a867")
                        }
                      >
                        <Calendar className="h-3 w-3 inline mr-2" />
                        {t("doctors.book")}
                      </button>
                      {/* <button className="w-full border border-emerald-600 text-emerald-600 py-3 px-6 rounded-lg font-semibold hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                      View Profile
                    </button> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("doctors.why.heading")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("doctors.hero.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#f0f8f4" }}
              >
                <Award className="h-6 w-6" style={{ color: "#77a867" }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("doctors.why.card1.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("doctors.why.card1.desc")}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#fef7e8" }}
              >
                <Clock className="h-6 w-6" style={{ color: "#fbce6e" }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("doctors.why.card2.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("doctors.why.card2.desc")}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#f0f8f4" }}
              >
                <Star className="h-6 w-6" style={{ color: "#32705a" }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("doctors.why.card3.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("doctors.why.card3.desc")}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#fef7e8" }}
              >
                <Calendar className="h-6 w-6" style={{ color: "#77a867" }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("doctors.why.card4.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("doctors.why.card4.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
