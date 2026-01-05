import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { departments } from "../../data/mockData";
import { ArrowRight, Users, Clock, Award, MapPin } from "lucide-react";
import { I18nContext } from "../../context/I18nContext";

export const ServicesPage: React.FC = () => {
  const { t, language } = React.useContext(I18nContext) as any;
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/contact");
  };

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
            {departments.map((department: any, index) => {
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
                typeof s === "string" ? s : s?.[language] || s?.en || ""
              );
              return (
                <div
                  key={department.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={department.image}
                        alt={name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {name}
                        </h3>
                        <ArrowRight className="h-6 w-6 text-brandDeep" />
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {description}
                      </p>
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {t("services.include")}
                        </h4>
                        <ul className="space-y-2">
                          {services.map(
                            (service: string, serviceIndex: number) => (
                              <li
                                key={serviceIndex}
                                className="flex items-center text-sm text-gray-600"
                              >
                                <div className="w-2 h-2 bg-brandYellow rounded-full mr-3"></div>
                                {service}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Users className="h-4 w-4 mr-2 text-brandDeep" />
                        <span>
                          {t("services.headLabel")} {head}
                        </span>
                      </div>
                      <Link
                        to="/contact"
                        className="w-full inline-block text-center bg-brandYellow text-brandDeep py-3 px-6 rounded-lg font-semibold hover:bg-brandDeep hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2"
                      >
                        {t("services.bookConsult")}
                      </Link>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("services.features.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("services.features.expert.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <p className="text-gray-600">
                {t("services.features.expert.desc")}
              </p>
            </div>

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
              <p className="text-gray-600">
                {t("services.features.hours.desc")}
              </p>
            </div>

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
              <p className="text-gray-600">
                {t("services.features.location.desc")}
              </p>
            </div>
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
    </div>
  );
};
