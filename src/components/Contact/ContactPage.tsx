import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { I18nContext } from "../../context/I18nContext";
import { getApiUrl } from "../../config/api";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ApiContactData {
  id: number;
  documentId: string;
  phoneNumber: string;
  phoneNumber_AM: string;
  email: string;
  email_AM: string;
  address: string;
  address_AM: string;
  hours: string;
  hours_AM: string;
}

let SwalRef: any = null;
async function getSwal() {
  if (SwalRef) return SwalRef;
  try {
    const mod = await import("sweetalert2");
    SwalRef = mod.default || mod;
  } catch {
    SwalRef = {
      fire: (t: string, m: string, _i?: string) => alert(`${t}: ${m}`),
    };
  }
  return SwalRef;
}

export const ContactPage: React.FC = () => {
  const { t, language } = useContext(I18nContext);
  const [contactData, setContactData] = useState<ApiContactData | null>(null);

  // Fetch contact data from API
  useEffect(() => {
    const controller = new AbortController();

    const fetchContactData = async () => {
      try {
        const res = await fetch(getApiUrl("api/ec-contact-uses"), {
          signal: controller.signal,
        });
        if (!res.ok)
          throw new Error(`Failed to load contact data: ${res.status}`);
        const json: { data: ApiContactData[] } = await res.json();

        if (json.data && json.data.length > 0) {
          setContactData(json.data[0]);
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("Failed to load contact data:", err);
        }
      }
    };

    fetchContactData();
    return () => controller.abort();
  }, []);

  // Smooth-scroll to the contact form if navigated with #contact-form
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash === "#contact-form"
    ) {
      const el = document.getElementById("contact-form");
      if (el) {
        // slight timeout to ensure layout is painted
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          50
        );
      }
    }
  }, []);

  const schema = yup.object({
    name: yup.string().required(t("contact.validation.nameRequired")),
    email: yup
      .string()
      .email(t("contact.validation.emailInvalid"))
      .required(t("contact.validation.emailRequired")),
    phone: yup.string().required(t("contact.validation.phoneRequired")),
    subject: yup.string().required(t("contact.validation.subjectRequired")),
    message: yup.string().required(t("contact.validation.messageRequired")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch(getApiUrl("api/ec-message-from-customers"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            fullName: data.name,
            email: data.email,
            phoneNumber: data.phone,
            subject: data.subject,
            message: data.message,
          },
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed with status ${res.status}`);
      }
      (await getSwal()).fire(
        t("contact.alert.success.title"),
        t("contact.alert.success.msg"),
        "success"
      );
      reset();
    } catch (e: any) {
      (await getSwal()).fire(
        t("contact.alert.error.title"),
        e?.message || t("contact.alert.error.msg"),
        "error"
      );
    }
  };

  const contactInfo = contactData
    ? [
        {
          icon: Phone,
          title: t("contact.info.phone.title"),
          details: [
            language === "am"
              ? contactData.phoneNumber_AM
              : contactData.phoneNumber,
          ],
          color: "emerald",
        },
        {
          icon: Mail,
          title: t("contact.info.email.title"),
          details: [
            language === "am" ? contactData.email_AM : contactData.email,
          ],
          color: "blue",
        },
        {
          icon: MapPin,
          title: t("contact.info.address.title"),
          details: [
            language === "am" ? contactData.address_AM : contactData.address,
          ],
          color: "purple",
        },
        {
          icon: Clock,
          title: t("contact.info.hours.title"),
          details: [
            language === "am" ? contactData.hours_AM : contactData.hours,
          ],
          color: "orange",
        },
      ]
    : [
        {
          icon: Phone,
          title: t("contact.info.phone.title"),
          details: [t("contact.info.phone.main")],
          color: "emerald",
        },
        {
          icon: Mail,
          title: t("contact.info.email.title"),
          details: [t("contact.info.email.main"), t("contact.info.email.appt")],
          color: "blue",
        },
        {
          icon: MapPin,
          title: t("contact.info.address.title"),
          details: [
            t("contact.info.address.line1"),
            t("contact.info.address.line2"),
          ],
          color: "purple",
        },
        {
          icon: Clock,
          title: t("contact.info.hours.title"),
          details: [
            t("contact.info.hours.weekday"),
            t("contact.info.hours.sat"),
          ],
          color: "orange",
        },
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brandGreen to-brandDeep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {t("contact.hero.title")}
          </h1>
          <p className="text-xl lg:text-2xl text-brandYellow max-w-3xl mx-auto">
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-brandYellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-brandDeep" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              id="contact-form"
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("contact.form.title")}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.form.name")}
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t("contact.form.name.placeholder")}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.form.email")}
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t("contact.form.email.placeholder")}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.form.phone")}
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      id="phone"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t("contact.form.phone.placeholder")}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.form.subject")}
                    </label>
                    <select
                      {...register("subject")}
                      id="subject"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">
                        {t("contact.form.subject.placeholder")}
                      </option>
                      <option value="appointment">
                        {t("contact.form.subject.appointment")}
                      </option>
                      <option value="insurance">
                        {t("contact.form.subject.insurance")}
                      </option>
                      <option value="vision">
                        {t("contact.form.subject.vision")}
                      </option>
                      <option value="surgery">
                        {t("contact.form.subject.surgery")}
                      </option>
                      <option value="complaint">
                        {t("contact.form.subject.complaint")}
                      </option>
                      <option value="general">
                        {t("contact.form.subject.general")}
                      </option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={6}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandDeep ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t("contact.form.message.placeholder")}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-brandYellow text-brandDeep py-3 px-6 rounded-lg font-semibold hover:bg-brandDeep hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{t("contact.form.submit")}</span>
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("contact.findUs.title")}
                </h3>
                <div className="rounded-lg overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1954.2031200102515!2d37.340867!3d11.5943593!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1644d3000ed84847%3A0xd3ca252bbba86b86!2sBahir%20Dar%20Specialty%20Eye%20Center!5e0!3m2!1sen!2set!4v1762296731145!5m2!1sen!2set"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Bahir Dar Specialty Eye Center Location"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Information */}
              {/*   <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-900 mb-3">
                  {t("contact.emergency.title")}
                </h3>
                <p className="text-red-800 mb-4">
                  {t("contact.emergency.desc")}
                </p>
                <div className="space-y-2 text-sm text-red-700">
                  <p>
                    <strong>{t("contact.emergency.line")}</strong> (555)
                    911-HELP
                  </p>
                  <p>
                    <strong>{t("contact.emergency.available")}</strong>{" "}
                    {t("contact.emergency.available.value")}
                  </p>
                </div>
              </div>
              */}

              {/* Additional Information */}
              {/*} <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-red-900 mb-3">
                  {t("contact.urgent.title")}
                </h3>
                <p className="text-blue-800 mb-4">{t("contact.urgent.desc")}</p>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• {t("contact.urgent.portal")}</li>
                  <li>• {t("contact.urgent.insurance")}</li>
                  <li>• {t("contact.urgent.lasik")}</li>
                  <li>• {t("contact.urgent.optical")}</li>
                </ul>
                </div>
                */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
