import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { departments } from "../../data/mockData";
import { ArrowRight, Users, X, Award, Clock, MapPin } from "lucide-react";
import { I18nContext } from "../../context/I18nContext";

const INITIAL_SERVICES_COUNT = 4;

export const ServicesPage: React.FC = () => {
  const { t, language } = React.useContext(I18nContext) as any;
  const navigate = useNavigate();
  const [servicesModal, setServicesModal] = React.useState<{
    name: string;
    services: string[];
  } | null>(null);

  // Helper to get array translations
  const getArrayTranslation = (key: string): string[] => {
    const translations: any = {
      "services.features.tech.items": {
        en: [
          "Advanced operating microscope",
          "OCT",
          "Laser",
          "Ocular ultrasound (A-B scan ultrasound)",
          "Humphrey Visual field analyzer",
          "Autorefractor",
          "IOL Master, and",
          "phacoemulsification machine.",
        ],
        am: [
          "የላቀ የአሠራር ማይክሮስኮፕ",
          "ኦክቶበር፣",
          "ሌዘር፣",
          "የአይን አልትራሳውንድ (ኤ-ቢ ስካን አልትራሳውንድ)፣",
          "ሃምፍሬይ ቪዥዋል ፊልድ ተንታኝ፣",
          "አውቶሪፍራክተር",
          "IOL ማስተር፣ እና",
          "ፋኮኢሙልሲፊኬሽን ማሽን።",
        ],
      },
      "services.features.expert.items": {
        en: [
          "Skilled ophthalmologists with years of clinical and surgical experience",
          "Dedicated optometrists for accurate refraction and follow-up",
          "Compassionate nursing and support staff",
        ],
        am: [
          "በክሊኒካል እና በቀዶ ጥገና ልምድ ያላቸው ባለሙያ የዓይን ሐኪሞች",
          "ለትክክለኛ ሪፍራክሽን እና ክትትል የተመደቡ ኦፕቶሜትሪስቶች",
          "ርኅራኄ ያላቸው ነርስ እና የድጋፍ ሰራተኞች",
        ],
      },
      "services.features.hours.items": {
        en: [
          "Working Hours: Monday to Friday | (8:00 AM – 5:00 PM)",
          "For emergencies 7 days / 24 hours",
        ],
        am: ["የስራ ሰዓት: ከሰኞ እስከ ዓርብ ከ2፡00 እስከ 11፡00", "ለድንገተኛ 7 ቀን 24 ሰዓት"],
      },
      "services.features.location.items": {
        en: [
          "Visit Us at: Bahir Dar Specialty Eye Center",
          'Located in between Bahir Dar airline station and "Geter Menged"',
          "Call: Insert Phone Number",
          "Email: Insert Email Address",
        ],
        am: [
          "ይጎብኙን: ባሕር ዳር ልዩ የዓይን ህክምና ማዕከል",
          "በባሕር ዳር አየር ማረፊያ እና በገጠር መንገድ መካከል እንገኛለን",
          "ይደውሉ: Insert Phone Number",
          "ኢሜል: Insert Email Address",
        ],
      },
      "services.benefit.items": {
        en: [
          "Elderly people experiencing vision loss or cataract",
          "Diabetic or hypertensive patients with eye problems",
          "Children with squint, lazy eyes, or poor school performance",
          "Anyone with blurred vision, red eyes, eye pain, or injury",
          "Patients referred from primary hospitals and health centers",
          "Computer and smart phone users",
        ],
        am: [
          "የአይን ችግር ያለባቸው አረጋውያን ወይም የዓይን ሞራ ግርዶሽ ያለባቸው",
          "የስኳር ህመምተኞች ወይም የደም ግፊት ያለባቸው ታካሚዎች የአይን ችግር ያለባቸው",
          "የዓይን መነፅር፣ የሰነፍ አይኖች ወይም የትምህርት ቤት አፈፃፀም ደካማ የሆኑ ልጆች",
          "የዓይን ብዥታ፣ የቀይ አይኖች፣ የአይን ህመም ወይም ጉዳት ያለበት ማንኛውም ሰው",
          "ከዋና ዋና ሆስፒታሎች እና የጤና ማዕከላት የተላኩ ታካሚዎች",
          "የኮምፒውተር እና የስማርት ስልክ ተጠቃሚዎች",
        ],
      },
    };
    return translations[key]?.[language] || [];
  };

  const openServicesModal = (name: string, services: string[]) => {
    setServicesModal({ name, services });
  };

  const closeServicesModal = () => setServicesModal(null);

  const handleContactUs = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brandGreen to-brandDeep text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {t("services.hero.heading")}
            </h1>
            <p className="text-xl lg:text-2xl text-brandYellow max-w-3xl mx-auto">
              {t("services.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {departments.map((department: any) => {
              const name =
                typeof department.name === "string"
                  ? department.name
                  : department.name?.[language] || department.name?.en || "";
              const description =
                typeof department.description === "string"
                  ? department.description
                  : department.description?.[language] ||
                    department.description?.en ||
                    "";
              const head =
                typeof department.head === "string"
                  ? department.head
                  : department.head?.[language] || department.head?.en || "";
              const services = (department.services || []).map((s: any) =>
                typeof s === "string" ? s : s?.[language] || s?.en || "",
              );
              const displayedServices =
                services.length > INITIAL_SERVICES_COUNT
                  ? services.slice(0, INITIAL_SERVICES_COUNT)
                  : services;
              return (
                <div
                  key={department.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Top: image */}
                  <div className="w-full aspect-video md:aspect-[2/1]">
                    <img
                      src={department.image}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Below: two columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* Column 1: title, description, contact button */}
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {name}
                        </h3>
                        <ArrowRight className="h-5 w-5 text-brandDeep shrink-0 mt-0.5" />
                      </div>
                      <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                        {description}
                      </p>
                      <Link
                        to="/contact"
                        className="mt-4 w-full inline-block text-center bg-brandYellow text-brandDeep py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-brandDeep hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2"
                      >
                        {t("services.bookConsult")}
                      </Link>
                    </div>
                    {/* Column 2: services included, see more, department head */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        {t("services.include")}
                      </h4>
                      <ul className="space-y-1.5">
                        {displayedServices.map(
                          (service: string, serviceIndex: number) => (
                            <li
                              key={serviceIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 bg-brandYellow rounded-full mr-2 shrink-0"></div>
                              <span className="line-clamp-2">{service}</span>
                            </li>
                          ),
                        )}
                      </ul>
                      {services.length > INITIAL_SERVICES_COUNT && (
                        <button
                          type="button"
                          onClick={() => openServicesModal(name, services)}
                          className="mt-2 text-sm font-medium text-brandDeep hover:text-brandGreen focus:outline-none focus:underline"
                        >
                          {t("services.seeMore")}
                        </button>
                      )}
                      <div className="flex items-center text-sm text-gray-600 mt-4">
                        <Users className="h-4 w-4 mr-2 text-brandDeep shrink-0" />
                        <span>
                          {t("services.headLabel")} {head}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t("services.features.heading")}
            </h2>
            <h3 className="text-2xl font-semibold text-brandDeep mb-8">
              {t("services.features.subheading")}
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Advanced Technology */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {t("services.features.tech.title")}
              </h4>
              <ul className="space-y-2 ml-4">
                {getArrayTranslation("services.features.tech.items").map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-brandYellow mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Optical Shop */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start">
                <span className="text-brandYellow mr-2 mt-1">○</span>
                <p className="text-gray-700">
                  {t("services.features.optical")}
                </p>
              </div>
            </div>

            {/* Environment */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start">
                <span className="text-brandYellow mr-2 mt-1">○</span>
                <p className="text-gray-700">
                  {t("services.features.environment")}
                </p>
              </div>
            </div>

            {/* VIP Rooms */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start">
                <span className="text-brandYellow mr-2 mt-1">○</span>
                <p className="text-gray-700">{t("services.features.vip")}</p>
              </div>
            </div>

            {/* Professionals */}
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700">
                {t("services.features.professionals")}
              </p>
            </div>
          </div>

          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Expert Care Card */}
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "rgba(251, 206, 110, 0.2)" }}
              >
                <Award className="h-8 w-8 text-brandDeep" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("services.features.expert.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("services.features.expert.desc")}
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                {getArrayTranslation("services.features.expert.items").map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brandYellow mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Extended Hours Card */}
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "rgba(251, 206, 110, 0.2)" }}
              >
                <Clock className="h-8 w-8 text-brandDeep" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("services.features.hours.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("services.features.hours.desc")}
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                {getArrayTranslation("services.features.hours.items").map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brandYellow mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Convenient Location Card */}
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "rgba(251, 206, 110, 0.2)" }}
              >
                <MapPin className="h-8 w-8 text-brandDeep" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("services.features.location.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("services.features.location.desc")}
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                {getArrayTranslation("services.features.location.items").map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brandYellow mr-2 mt-0.5">○</span>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {t("services.benefit.heading")}
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <ul className="space-y-3 text-sm md:text-base text-gray-700">
              {getArrayTranslation("services.benefit.items").map(
                (item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-brandYellow mr-2 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brandGreen to-brandYellow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brandDeep mb-4">
            {t("services.cta.heading")}
          </h2>
          <p className="text-xl text-brandDeep mb-8">
            {t("services.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button
              onClick={handleBookAppointment}
              className="bg-white text-brandDeep px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brandDeep hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2 focus:ring-offset-brandYellow"
            >
              {t("services.cta.bookAppt")}
            </button> */}
            <button
              onClick={handleContactUs}
              className="border-2 border-brandDeep text-brandDeep px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brandDeep hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2 focus:ring-offset-brandYellow"
            >
              {t("services.cta.contact")}
            </button>
          </div>
        </div>
      </section>

      {/* Services list popup */}
      {servicesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeServicesModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="services-modal-title"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h2
                  id="services-modal-title"
                  className="text-lg font-bold text-gray-900"
                >
                  {servicesModal.name}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {t("services.include")}
                </p>
              </div>
              <button
                type="button"
                onClick={closeServicesModal}
                className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brandDeep"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="overflow-y-auto p-4 space-y-2">
              {servicesModal.services.map((service: string, i: number) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <div className="w-2 h-2 bg-brandYellow rounded-full mr-3 mt-1.5 shrink-0"></div>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
