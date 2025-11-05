import React from "react";

type Report = {
  year: string;
  summary: string;
  href: string;
};

const reports: Report[] = [
  {
    year: "2024",
    summary:
      "Expanded outreach programs, increased cataract surgical volume, and advanced tele‑ophthalmology triage.",
    href: "/reports/BDSEC-Annual-Report-2024.pdf",
  },
  {
    year: "2023",
    summary:
      "Strengthened subspecialty clinics, improved patient experience, and launched new training initiatives.",
    href: "/reports/BDSEC-Annual-Report-2023.pdf",
  },
  {
    year: "2022",
    summary:
      "Scaled community screening, enhanced diagnostics (OCT, VF, biometry), and streamlined post‑op care.",
    href: "/reports/BDSEC-Annual-Report-2022.pdf",
  },
  {
    year: "2021",
    summary:
      "Built clinical governance framework, standardized safety protocols, and deepened regional partnerships.",
    href: "/reports/BDSEC-Annual-Report-2021.pdf",
  },
  {
    year: "2020",
    summary:
      "Established tele‑consultation pathways and ensured uninterrupted essential services during disruptions.",
    href: "/reports/BDSEC-Annual-Report-2020.pdf",
  },
  {
    year: "2019",
    summary:
      "Expanded surgical capacity, increased staff development, and improved patient education resources.",
    href: "/reports/BDSEC-Annual-Report-2019.pdf",
  },
];

const AnualActivityReports: React.FC = () => {
  return (
    <section className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#32705A] to-[#77A867]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight transition-opacity duration-700 ease-out opacity-100">
              Annual Activity Reports
            </h1>
            <p className="mt-4 text-base sm:text-lg font-medium text-white/90">
              A transparent journey of our growth, service, and impact.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-white/10" />
          <div className="absolute bottom-6 right-10 h-24 w-24 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#32705A]">
            Committed to transparency
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#444]">
            At Bahir Dar Specialty Eye Care Center, we take pride in sharing our
            yearly progress with our community. Our annual activity reports
            highlight our achievements, innovations, and dedication to advancing
            eye health across Ethiopia.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <div
              key={r.year}
              className="group rounded-xl bg-white shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FBCE6E]"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#FBCE6E]/20 flex items-center justify-center ring-2 ring-[#FBCE6E]">
                    <span className="text-sm" aria-hidden>
                      📄
                    </span>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-[#32705A] leading-tight">
                      {r.year}
                    </div>
                    <div className="text-xs text-gray-500">Annual Report</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {r.summary}
                </p>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <a
                    href={r.href}
                    download
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-white text-lg sm:text-xl font-semibold">
            Our commitment to transparency and excellence continues — year after
            year.
          </p>
          <div className="mt-5">
            <a
              href="/reports/BDSEC-Annual-Reports-Archive.zip"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 transition-colors"
            >
              Download Archive
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnualActivityReports;
