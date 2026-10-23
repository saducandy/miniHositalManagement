/**
 * Generates BDSEC technical handover Word document (extended edition).
 * Run: npm run handover:docx
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  PageBreak,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(
  __dirname,
  "..",
  "BDSEC_Website_Technical_Handover.docx",
);
const outPathFallback = path.join(
  __dirname,
  "..",
  "BDSEC_Website_Technical_Handover_NEW.docx",
);

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 140, line: 276 },
    children: [new TextRun({ text, size: 22, ...opts })],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 180, line: 276 },
    children: [new TextRun({ text, bold: true, size: 32 })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 140, line: 276 },
    children: [new TextRun({ text, bold: true, size: 26 })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 120, line: 276 },
    children: [new TextRun({ text, bold: true, size: 24 })],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: { after: 100, line: 276 },
    children: [new TextRun({ text, size: 22 })],
  });
}

/** Two-column table: label | value paragraphs */
function table2Col(headerLeft, headerRight, rows) {
  const hdr = new TableRow({
    children: [
      new TableCell({
        shading: { fill: "E7E6E6" },
        children: [
          new Paragraph({
            children: [new TextRun({ text: headerLeft, bold: true, size: 22 })],
          }),
        ],
      }),
      new TableCell({
        shading: { fill: "E7E6E6" },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: headerRight, bold: true, size: 22 }),
            ],
          }),
        ],
      }),
    ],
  });
  const body = rows.map(
    ([left, right]) =>
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({ text: left, size: 22 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({ text: right, size: 22 })],
              }),
            ],
          }),
        ],
      }),
  );
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [hdr, ...body],
  });
}

/** Full path relative to API_BASE_URL (see src/config/api.ts — _health has no /api/ prefix) */
const API_CATALOG = [
  ["api/ec-hero-carosels?populate=*", "GET", "Home hero carousel slides"],
  [
    "api/ec-doctors?populate=*",
    "GET",
    "Doctors directory & appointment picker",
  ],
  ["api/ec-appointments", "POST", "Public appointment booking"],
  ["api/ec-appointments?populate=*", "GET", "Admin: list with relations"],
  [
    "api/ec-appointments/{documentId}",
    "PUT",
    "Admin: update appointment state",
  ],
  ["api/ec-events?populate=*", "GET", "Public events list & admin list"],
  ["api/ec-events", "POST", "Admin: create event (often after upload)"],
  ["api/ec-event-registered-customers", "POST", "Event registration form"],
  ["api/ec-email-subscriptions", "POST", "Newsletter subscription"],
  ["api/ec-contact-uses", "GET", "Contact page metadata"],
  ["api/ec-message-from-customers", "POST", "Contact form submission"],
  ["api/ec-message-from-customers", "GET", "Admin: list messages"],
  ["api/ec-staff-infos?populate=*", "GET", "Our Staff page"],
  ["api/ec-resources-publications?populate=*", "GET", "Publications"],
  [
    "api/ec-our-service-eye-cares?populate=*",
    "GET",
    "Eye care center services",
  ],
  [
    "api/ec-our-service-resarches?populate=*",
    "GET",
    "Research (spelling matches API)",
  ],
  [
    "api/ec-our-service-resarch-journeys?populate=*",
    "GET",
    "Research journey items",
  ],
  [
    "api/ec-our-service-featured-publications?populate=*",
    "GET",
    "Featured publications",
  ],
  [
    "api/ec-our-service-education-and-trainings?populate=*",
    "GET",
    "Education programs",
  ],
  [
    "api/ec-our-service-education-and-training-course-structures",
    "GET",
    "Course structure",
  ],
  [
    "api/ec-about-us-management-team-cards?populate=*",
    "GET",
    "Management team",
  ],
  ["api/ec-about-us-news-cards?populate=*", "GET", "News cards"],
  ["api/ec-about-us-annual-activity-cards?populate=*", "GET", "Annual reports"],
  ["api/ec-about-us-award-cards?populate=*", "GET", "Awards"],
  [
    "api/ec-noitice-vacancies",
    "GET/POST",
    "Vacancy notices (UID spelling as in app)",
  ],
  ["api/ec-vacancy-bids", "GET/POST", "Bid notices"],
  ["api/ec-patients", "GET/POST", "Admin patients"],
  ["api/ec-patients/{documentId}", "PUT", "Admin: update patient"],
  ["api/auth/local/", "POST", "Strapi JWT login (admin upload flow)"],
  ["api/upload/", "POST", "Media upload (Bearer JWT)"],
  [
    "_health",
    "GET",
    "At API origin root (not under /api/); admin UI expects HTTP 204",
  ],
];

const ROUTES = [
  ["/", "HomePage — hero (API), services preview"],
  ["/services", "ServicesPage — largely mockData departments"],
  ["/about/doctors", "DoctorsPage — Strapi doctors"],
  ["/appointments", "AppointmentBooking — Strapi doctors + POST appointments"],
  ["/events", "EventsPage — events, registration, newsletter"],
  ["/contact", "ContactPage — messages + contact metadata"],
  ["/about/vision-mission", "VisionAndMission"],
  ["/about/story", "OurStory"],
  ["/about/management", "ManagementTeam — API cards"],
  ["/about/staff", "OurStaff — API"],
  ["/about/awards", "AwardsAndRecognitions — API"],
  ["/about/reports", "AnualActivityReports — API"],
  ["/about/news", "News — API"],
  ["/about/location", "HospitalLocation"],
  ["/services/eye-care", "OurEyeCareCenterServices — API"],
  ["/services/outreach", "Outreach"],
  ["/services/tele-ophthalmology", "TeleOphtalmology"],
  ["/services/education", "EducationAndTraining — API"],
  ["/services/research", "Research — API"],
  ["/resources/publications", "Publications — API"],
  ["/patients/about-eye", "AboutTheEye"],
  ["/patients/diseases", "EyeDiseaseTreatment"],
  ["/patients/what-to-expect", "WhatToExpect"],
  ["/patients/insurance", "Insurance"],
  ["/get-involved/donate", "Donate"],
  ["/get-involved/organize-outreach", "OrganizeOutreach"],
  ["/notice/vacancy", "Vacancy — API"],
  ["/notice/bid", "Bid — API"],
  ["/admin", "AdminDashboard — operational UI"],
];

function buildApiTable() {
  const hdr = new TableRow({
    children: [
      new TableCell({
        shading: { fill: "E7E6E6" },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "REST path (under API origin)",
                bold: true,
                size: 20,
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        shading: { fill: "E7E6E6" },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Method(s)", bold: true, size: 20 }),
            ],
          }),
        ],
      }),
      new TableCell({
        shading: { fill: "E7E6E6" },
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Purpose", bold: true, size: 20 })],
          }),
        ],
      }),
    ],
  });
  const rows = API_CATALOG.map(
    ([path, method, purpose]) =>
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: path, size: 20 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: method, size: 20 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: purpose, size: 20 })],
              }),
            ],
          }),
        ],
      }),
  );
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [hdr, ...rows],
  });
}

function buildRoutesTable() {
  const hdr = new TableRow({
    children: [
      new TableCell({
        shading: { fill: "E7E6E6" },
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Route", bold: true, size: 20 })],
          }),
        ],
      }),
      new TableCell({
        shading: { fill: "E7E6E6" },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Description", bold: true, size: 20 }),
            ],
          }),
        ],
      }),
    ],
  });
  const rows = ROUTES.map(
    ([route, desc]) =>
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: route, size: 20 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: desc, size: 20 })],
              }),
            ],
          }),
        ],
      }),
  );
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [hdr, ...rows],
  });
}

const children = [
  new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 240, line: 276 },
    children: [
      new TextRun({
        text: "WEBSITE TECHNICAL HANDOVER DOCUMENT",
        bold: true,
        size: 36,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: "(Extended edition — operations & integration detail)",
        italics: true,
        size: 22,
      }),
    ],
  }),
  p("Prepared for: Bahir Dar Specialty Eye Care Center (BDSEC)"),
  p("Systems: Public website (React/Vite) + Headless CMS/API (Strapi 5)"),
  p(
    "Primary hosting: Plesk — Frontend domain bdsec.org; Backend domain back.bdsec.org",
  ),
  p(
    "Document version: 2.1 (expanded — target 10+ printed pages with appendices) | Generated from scripts/generate-handover-docx.mjs",
  ),

  h1("1. Executive Summary"),
  h2("1.1 Purpose of this document"),
  p(
    "This document provides a comprehensive technical handover for the BDSEC digital platform. Its purpose is to enable the client’s technical staff, hosting partners, and future vendors to understand how the system is structured, how it is deployed on Plesk, how the frontend communicates with Strapi, and how day-to-day operations (backups, logs, updates) should be performed without dependency on the original developer.",
  ),
  h2("1.2 Scope of handover"),
  bullet(
    "Source code: React/TypeScript SPA (repository folder miniHositalManagement) and Strapi 5 application (latestBackEnd/latestBackEnd).",
  ),
  bullet(
    "Runtime configuration: environment variables, API base URL rules, SQLite default database path, optional PostgreSQL/MySQL configuration via Strapi env.",
  ),
  bullet(
    "Hosting topology: production public site at https://bdsec.org; Strapi API and Admin at https://back.bdsec.org (API at origin root, Admin at /admin). Development reference host bdsec.org:8081.",
  ),
  bullet(
    "Operational tooling: Node.js process management with pm2; log inspection via pm2 logs; Plesk for SSL, domains, and Node hosting features.",
  ),
  bullet(
    "Explicit non-goals in this document: legal data-processing agreements, clinical compliance beyond generic security guidance, and commercial support terms (see Section 15).",
  ),
  h2("1.3 Intended audience"),
  bullet(
    "System administrators responsible for Plesk, SSL certificates, and Node processes.",
  ),
  bullet("Developers extending React pages or Strapi content types."),
  bullet(
    "Content editors using Strapi Admin for doctors, events, carousel, and editorial entries.",
  ),
  bullet(
    "IT managers planning backup, recovery, and environment separation (dev/staging/prod).",
  ),
  h2("1.4 How to read this document"),
  p(
    "Sections 2–4 describe architecture, stack, and environments. Sections 5–6 cover deployment and access. Sections 7–9 describe features, database concepts, and integrations. Sections 10–14 cover security, backup, monitoring, known issues, and maintenance. Appendices list every frontend route and Strapi endpoint referenced by the SPA for traceability.",
  ),

  h1("2. System Overview"),
  h2("2.1 Business purpose"),
  p(
    "The platform supports BDSEC’s public communication and light operational workflows: bilingual information about the center, services and outreach, staff and leadership, patient education, vacancy and bid notices, online appointment requests stored in Strapi, marketing events with optional registration, contact messages from the public, and an internal-style dashboard in the SPA (route /admin) for viewing appointments, messages, events, and patients.",
  ),
  h2("2.2 High-level architecture"),
  p(
    "The system follows a decoupled pattern. The browser loads a static or CDN-served SPA from bdsec.org. All dynamic data and form submissions are sent to the Strapi REST API on back.bdsec.org (or the development host). Strapi persists data in SQLite by default (file .tmp/data.db) or in a server database when DATABASE_CLIENT is configured for postgres or mysql. Media files uploaded through Strapi are stored according to Strapi upload settings (typically under public/uploads).",
  ),
  h2("2.3 Request flow (typical)"),
  bullet(
    "User opens https://bdsec.org → HTML shell loads → React Router renders a page.",
  ),
  bullet(
    "Page components call fetch() to https://back.bdsec.org/api/... with JSON bodies or query strings such as populate=* for relations.",
  ),
  bullet(
    "Strapi validates the request against Users & Permissions, executes controllers, reads/writes the database, returns JSON.",
  ),
  bullet(
    "Images referenced by relative paths are resolved by the frontend helper getImageUrl() prepending the same API origin as VITE_API_BASE_URL.",
  ),
  h2("2.4 Environments"),
  p(
    "At minimum, separate development and production are recommended. Development may use bdsec.org:8081 for Strapi while the SPA runs on localhost or a preview URL with VITE_API_BASE_URL pointing at the dev API. Production must set VITE_API_BASE_URL=https://back.bdsec.org (no trailing path, no /admin) so that all API calls and uploaded media URLs resolve correctly behind HTTPS.",
  ),
  h2("2.5 Real-time behavior (browser only)"),
  p(
    "Appointment booking posts a message on BroadcastChannel('appointments') so another open tab running the admin dashboard can show a toast. This is not server push; it only works for same-origin tabs in the same browser.",
  ),
  h2("2.6 Trust boundaries"),
  p(
    "The browser and Strapi API form the primary trust boundary. End users are unauthenticated for most flows; Strapi’s Public role defines what anonymous clients may read or create. The Strapi Admin UI is a separate authenticated surface for staff. Server filesystem access (SQLite file, uploads) is trusted to the hosting account only. No server-side rendering of user HTML is performed by the SPA host, which reduces certain classes of injection risk but places greater emphasis on correct API permissions and HTTPS.",
  ),

  h1("3. Technology Stack"),
  h2("3.1 Frontend — detailed"),
  table2Col("Component", "Version / role", [
    ["Runtime", "Modern evergreen browsers (ES modules)"],
    ["Framework", "React 18"],
    ["Language", "TypeScript 5.x"],
    ["Bundler", "Vite 5 with @vitejs/plugin-react"],
    ["Routing", "react-router-dom 7 (BrowserRouter, client-side routes)"],
    ["Styling", "Tailwind CSS 3, PostCSS, Autoprefixer"],
    ["Forms", "react-hook-form + yup + @hookform/resolvers"],
    ["UI primitives", "@headlessui/react, lucide-react, clsx"],
    ["Alerts", "sweetalert2 (including dynamic import in some flows)"],
    ["Dates", "date-fns + local helpers in src/utils/dateUtils.ts"],
    ["i18n", "Custom React context (English + Amharic), localStorage key lang"],
  ]),
  p(
    "The frontend repository name in package.json may still read vite-react-typescript-starter; operationally treat the project as the BDSEC website. The dependency @supabase/supabase-js is present but unused in src and may be removed in a cleanup pass.",
  ),
  h2("3.2 Backend — detailed (Strapi 5.8)"),
  table2Col("Item", "Detail", [
    ["Core", "@strapi/strapi 5.8.0"],
    ["Auth plugin", "@strapi/plugin-users-permissions 5.8.0"],
    ["Cloud plugin", "@strapi/plugin-cloud 5.8.0"],
    ["SQLite", "better-sqlite3 — default local DB"],
    ["PostgreSQL client", "pg — used when DATABASE_CLIENT=postgres"],
    ["Node", "Engines: >=18 <=22.x per package.json"],
    ["Scripts", "develop, build, start, strapi, deploy (Strapi Cloud)"],
  ]),
  p(
    "Strapi 5 uses documentId for REST document operations in several frontend calls (e.g. appointment and patient updates). When debugging, distinguish numeric id from documentId in API responses.",
  ),
  h2("3.3 Database layer"),
  p(
    "Default configuration (config/database.js) uses DATABASE_CLIENT defaulting to sqlite with filename .tmp/data.db under the application root. The same file path is suitable for small deployments; for concurrent writes and easier backup integration on Plesk, PostgreSQL or MySQL is recommended for production with credentials supplied only via environment variables.",
  ),
  h2("3.4 Hosting and edge"),
  p(
    "Plesk manages DNS, SSL certificates, and often reverse proxy rules from the public hostname to the Node process port. Nginx (commonly used by Plesk) terminates TLS and forwards to localhost. Exact port numbers are environment-specific and should be recorded in the server runbook.",
  ),

  h1("4. Environment Details"),
  h2("4.1 Production URLs"),
  table2Col("Role", "URL / configuration", [
    ["Public website", "https://bdsec.org"],
    [
      "Strapi API base",
      "https://back.bdsec.org — used as VITE_API_BASE_URL in frontend build",
    ],
    ["Strapi Admin UI", "https://back.bdsec.org/admin"],
    [
      "API path prefix",
      "All REST resources under /api/ except upload and auth paths as used by the app",
    ],
  ]),
  h2("4.2 Development / staging reference"),
  table2Col("Role", "URL", [
    ["Strapi API (example)", "https://bdsec.org:8081"],
    ["Strapi Admin (example)", "https://bdsec.org:8081/admin"],
    [
      "Frontend .env (when using dev API)",
      "VITE_API_BASE_URL=https://bdsec.org:8081",
    ],
  ]),
  h2("4.3 Frontend environment variables"),
  bullet(
    "VITE_API_BASE_URL — required for production builds; must be the Strapi origin only (scheme + host + optional port).",
  ),
  bullet(
    "Do not append /admin or /api to VITE_API_BASE_URL; the code already prefixes endpoints such as api/ec-doctors.",
  ),
  bullet(
    "Fallback in src/config/api.ts if unset: https://bdsec.org:8081 — replace by explicit .env on production to avoid accidental misrouting.",
  ),
  p("See ENV_SETUP.md in the frontend repository for a short setup guide."),
  h2("4.4 Strapi environment variables (checklist)"),
  bullet(
    "APP_KEYS, API_TOKEN_SALT, ADMIN_JWT_SECRET, JWT_SECRET, TRANSFER_TOKEN_SALT — required secrets.",
  ),
  bullet(
    "DATABASE_CLIENT, DATABASE_FILENAME (sqlite) or full postgres/mysql connection envs.",
  ),
  bullet(
    "HOST, PORT, and public URL settings as required by Strapi 5 behind a reverse proxy.",
  ),
  bullet(
    "CORS — allow https://bdsec.org (and dev origins) for browser requests from the SPA.",
  ),
  h2("4.5 Plesk-specific notes"),
  bullet(
    "Enable HTTPS (Let’s Encrypt or purchased cert) for both bdsec.org and back.bdsec.org.",
  ),
  bullet(
    "For the SPA: configure fallback to index.html for client-side routes.",
  ),
  bullet(
    "For Strapi: run Node 18–22; use pm2 or Plesk Node.js extension to keep the process alive and restart on reboot.",
  ),

  h1("5. Deployment Process"),
  h2("5.1 Frontend deployment (bdsec.org)"),
  p("Recommended sequence for a production release:"),
  bullet("Pull the desired Git tag or commit from the frontend repository."),
  bullet("Run npm ci or npm install for reproducible dependencies."),
  bullet(
    "Create or update .env in the build environment: VITE_API_BASE_URL=https://back.bdsec.org",
  ),
  bullet("Run npm run build. Output is written to dist/."),
  bullet(
    "Upload dist/ contents to the website document root in Plesk (or sync via CI/CD).",
  ),
  bullet(
    "Verify index.html loads, assets return 200, and deep links (e.g. /appointments) resolve via SPA fallback.",
  ),
  bullet(
    "Smoke-test in browser: home, doctors, booking, events, contact, and admin route.",
  ),
  h2("5.2 Backend deployment (back.bdsec.org)"),
  p("Recommended sequence:"),
  bullet("Pull the Strapi repository on the server."),
  bullet(
    "Install dependencies with the same major Node version as development.",
  ),
  bullet("Set production .env; never commit secrets."),
  bullet(
    "Run npm run build then npm run start, or the equivalent documented for Strapi 5 in production.",
  ),
  bullet("Start or restart the pm2 process (e.g. pm2 restart <name>)."),
  bullet(
    "Confirm https://back.bdsec.org/api returns expected Strapi behavior and Admin login works at /admin.",
  ),
  h2("5.3 Database and media during deploy"),
  p(
    "If upgrading Strapi versions, read Strapi migration guides and back up the database before applying schema changes. For SQLite, stop the process or use a verified snapshot copy of .tmp/data.db. Copy public/uploads if the server path changes.",
  ),
  h2("5.4 Rollback strategy"),
  bullet("Frontend: redeploy previous dist/ from a tagged commit."),
  bullet(
    "Backend: redeploy previous Strapi build; restore database from backup if migrations ran.",
  ),
  bullet(
    "Document the Git tag and backup identifier for each production release in a change log.",
  ),
  h2("5.5 Post-deployment smoke test checklist"),
  bullet(
    "HTTPS: no mixed-content warnings; certificate valid for bdsec.org and back.bdsec.org.",
  ),
  bullet(
    "Homepage loads; hero carousel requests succeed (200) if content is published.",
  ),
  bullet("Doctors page lists entries from Strapi; images load."),
  bullet(
    "Complete a test appointment with a non-production email/phone; verify entry in Strapi Admin.",
  ),
  bullet(
    "Events page loads; registration and newsletter forms return success or expected validation.",
  ),
  bullet(
    "Contact form submits; message visible in Admin dashboard Messages tab.",
  ),
  bullet(
    "Admin /admin opens; appointments and messages tabs fetch without CORS errors.",
  ),
  bullet(
    "If using event creation with image: upload succeeds and new event appears on public Events page.",
  ),
  bullet(
    "Health indicator in admin reflects _health response (or adjust expectation).",
  ),
  bullet(
    "Mobile viewport: spot-check navigation, booking steps, and contact form layout.",
  ),
  bullet(
    "Language toggle: switch EN/AM and confirm key navigation labels update.",
  ),
  bullet(
    "Deep link: open /appointments directly (refresh) — should not 404 on static host.",
  ),

  h1("6. Access Management"),
  h2("6.1 Systems and responsibilities"),
  table2Col("System", "Typical access holder", [
    ["Git hosting", "Dev lead + backup maintainer"],
    ["Plesk", "Hosting administrator"],
    ["Strapi Admin", "Content managers + super admin"],
    ["SSH / pm2", "Backend operator"],
    ["DNS", "Whoever controls domain bdsec.org"],
  ]),
  h2("6.2 Credential hygiene"),
  bullet(
    "Share production secrets through a password manager or encrypted channel.",
  ),
  bullet(
    "Rotate Strapi admin and database passwords periodically and after staff changes.",
  ),
  bullet(
    "Remove any hardcoded Strapi user credentials from frontend source (AdminDashboard) and rotate the affected Strapi user password immediately.",
  ),
  h2("6.3 API tokens (optional hardening)"),
  p(
    "Strapi supports API tokens for server-to-server use. Public forms currently rely on Users & Permissions rules for anonymous create. Review each content type: public create should be limited to the minimum fields required, and list/find operations on sensitive collections should be disabled for the Public role.",
  ),

  h1("7. Application Features"),
  h2("7.1 Global UX"),
  bullet(
    "Bilingual interface: English and Amharic with persistence in localStorage.",
  ),
  bullet(
    "Layout: shared Header and Footer; navigation includes nested menus (About, Services, Resources, For Patients, Notice). Some menu items may be commented out while routes still exist.",
  ),
  bullet(
    "Accessibility toolbar: font size increase/decrease, high contrast mode, screen reader announcements in appointment steps.",
  ),
  h2("7.2 Home and marketing"),
  p(
    "HomePage composes HeroSection (carousel from Strapi), ServicesPreview, and optional sections; some blocks such as testimonials may be commented out in source but data remains in mockData for future use.",
  ),
  h2("7.3 Services"),
  p(
    "The top-level /services page primarily renders department-style content from src/data/mockData.ts. Sub-routes under /services/... load long-form and structured content from Strapi for eye care, education, research, outreach, and tele-ophthalmology as implemented in respective components.",
  ),
  h2("7.4 About and trust content"),
  p(
    "About pages combine static narrative (e.g. story, vision) with API-driven cards for management team, news, annual activity, and awards. Hospital location is presented as a static page component.",
  ),
  h2("7.5 Clinical-facing public information"),
  p(
    "For Patients section includes educational pages (about the eye, diseases, expectations, insurance). These are largely static React content suitable for editorial review in code or future CMS migration.",
  ),
  h2("7.6 Appointments"),
  p(
    "Users select a doctor from Strapi, pick date and time from client-generated slots, enter contact details and reason, then POST ec-appointments with relation ec_doctor. Validation uses yup and react-hook-form. Success triggers BroadcastChannel notification for open admin tabs.",
  ),
  h2("7.7 Events and engagement"),
  p(
    "Events list uses Strapi ec-events. Users may register via ec-event-registered-customers and subscribe via ec-email-subscriptions. Admin can create events with images: authenticate, upload file, POST ec-events.",
  ),
  h2("7.8 Contact"),
  p(
    "Contact page may load ec-contact-uses for display configuration and posts ec-message-from-customers for inquiries.",
  ),
  h2("7.9 Notices"),
  p(
    "Vacancy and bid flows use ec-noitice-vacancies and ec-vacancy-bids; confirm Strapi UID spelling matches production.",
  ),
  h2("7.10 Admin dashboard (SPA route /admin)"),
  p(
    "Tabs include overview, appointments, events, patients, messages, and settings. Appointments can change state via PUT. Patients support add/edit with generated patientId pattern. System status polls _health every 30 seconds expecting 204. Theme toggle manipulates document root classes.",
  ),
  p("Full route catalog appears in Appendix B."),

  h1("8. Database Overview"),
  h2("8.1 Engine and file location"),
  p(
    "Default: SQLite database file at latestBackEnd/latestBackEnd/.tmp/data.db (relative to Strapi project root). The path is configurable via DATABASE_FILENAME. SQLite is file-based; permissions must allow the Node process to read and write the file and the containing directory.",
  ),
  h2("8.2 Conceptual entities"),
  p(
    "Strapi stores each content type in generated tables. Names map to collection types such as ec-doctors, ec-appointments, ec-events, ec-patients, ec-message-from-customers, and the many ec-* marketing collections. Exact table names depend on Strapi version and internal naming; use Strapi Admin or a DB browser for inspection.",
  ),
  h2("8.3 Relationships"),
  p(
    "Appointments relate to doctors (ec_doctor). Events relate to uploaded media. Editors should maintain referential integrity by not deleting doctors who are still referenced by historical appointments without a data policy.",
  ),
  h2("8.4 Growth and migration"),
  p(
    "When traffic or editorial concurrency increases, plan migration to PostgreSQL: provision database in Plesk, set DATABASE_CLIENT and connection envs, run Strapi in maintenance mode, migrate data using a documented procedure, and validate all ec-* endpoints from the SPA.",
  ),

  h1("9. Integrations"),
  h2("9.1 Strapi REST (primary)"),
  p(
    "All integrations in the current SPA are HTTP JSON calls to Strapi. No GraphQL endpoint is required by the frontend. Populate=* is used heavily to return nested media and relations in one round trip.",
  ),
  h2("9.2 Authentication endpoints"),
  p(
    "The SPA admin event-creation path uses POST /api/auth/local/ to obtain a JWT, then POST /api/upload/ with Authorization Bearer for the image, then POST /api/ec-events. This pattern should be replaced long term with a secure login form and environment-based configuration, not embedded credentials.",
  ),
  h2("9.3 Payment, SMS, email, third-party APIs"),
  p(
    "No payment gateway (e.g. Chapa) is wired in the frontend. No automated SMS or Telegram notifications are implemented. Email sending may be added via Strapi email plugin or external providers; contact forms currently persist records in Strapi only.",
  ),
  h2("9.4 External maps or embeds"),
  p(
    "Contact or location pages may embed maps or iframes per component implementation; ensure CSP and privacy policies align with organizational standards.",
  ),

  h1("10. Security"),
  h2("10.1 Transport and headers"),
  bullet("Enforce HTTPS on bdsec.org and back.bdsec.org."),
  bullet("Consider HSTS at the proxy for production domains."),
  bullet("Review Content-Security-Policy if adding third-party scripts."),
  h2("10.2 Strapi hardening"),
  bullet("Use strong, unique secrets in .env."),
  bullet(
    "Limit Public role permissions to the minimum required for anonymous POST.",
  ),
  bullet("Disable open access to admin-only collections."),
  bullet(
    "Keep Strapi and Node patched; monitor security advisories for Strapi 5.",
  ),
  h2("10.3 Frontend considerations"),
  bullet(
    "Never store secrets in VITE_* variables; they are visible in the built bundle.",
  ),
  bullet(
    "Protect /admin with organizational policy; consider adding SPA auth or IP restriction at the proxy.",
  ),
  h2("10.4 Data protection"),
  p(
    "Personal data in appointments and messages is subject to organizational privacy obligations. Restrict database backups, limit access to SQLite files or DB credentials, and define retention policies with clinical and legal stakeholders.",
  ),

  h1("11. Backup & Recovery"),
  h2("11.1 What to back up"),
  bullet("SQLite: .tmp/data.db (or full dump if using PostgreSQL/MySQL)."),
  bullet("Uploads: Strapi public/uploads or object storage."),
  bullet(
    "Configuration: sanitized copies of .env (secrets stored separately in a vault).",
  ),
  bullet(
    "Frontend: Git repository; production is reproducible from source + env.",
  ),
  h2("11.2 Frequency and retention"),
  p(
    "Recommend at least daily automated backups for production database and weekly verification restores in a non-production environment. Retention (e.g. 30 daily, 12 monthly) should match organizational policy.",
  ),
  h2("11.3 Recovery objectives"),
  p(
    "Define RTO (how fast service must return) and RPO (how much data loss is acceptable) with management. SQLite file restore is fast but requires brief downtime; larger databases need rehearsed restore playbooks.",
  ),
  h2("11.4 Restore outline"),
  bullet("Stop Strapi."),
  bullet("Restore database file or import SQL dump."),
  bullet("Restore uploads directory if needed."),
  bullet("Start Strapi; verify Admin and a sample API call from the SPA."),

  h1("12. Monitoring & Logging"),
  h2("12.1 pm2"),
  p(
    "Strapi is started under pm2 in the current operations model. Use pm2 list to see process status, pm2 logs <name> for streaming logs, and pm2 restart <name> after deployments. Log files are typically stored under ~/.pm2/logs with separate stdout and stderr files.",
  ),
  h2("12.2 Plesk and web server"),
  p(
    "Review domain access logs and error logs in Plesk for 4xx/5xx spikes, especially after deployments or certificate renewals.",
  ),
  h2("12.3 Application-level health"),
  p(
    "The admin dashboard polls GET _health and treats HTTP 204 as healthy. If your Strapi deployment uses a different health route or status code, update the frontend or proxy accordingly.",
  ),
  h2("12.4 Future improvements"),
  bullet("Centralized logging (e.g. forwarded to a log host)."),
  bullet(
    "Uptime checks from an external monitor hitting https://bdsec.org and https://back.bdsec.org/api.",
  ),

  h1("13. Known Issues & Technical Debt"),
  bullet(
    "Hardcoded Strapi credentials in AdminDashboard authenticateAdmin — critical security debt; remove and rotate password.",
  ),
  bullet(
    "VITE_API_BASE_URL must not include /admin; some documentation historically confused API origin with Admin URL.",
  ),
  bullet(
    "Typo-dependent API UIDs: ec-noitice-vacancies, ec-our-service-resarches; field resonForVisit on appointments — align Strapi schema and frontend deliberately.",
  ),
  bullet(
    "Mixed content strategy: /services uses mockData while other service pages use Strapi — risk of inconsistent messaging.",
  ),
  bullet("Unused @supabase/supabase-js dependency."),
  bullet(
    "Optional strapi v3 package entry in backend package.json alongside Strapi 5 — verify and remove if unused.",
  ),
  bullet(
    "SQLite on production may limit concurrency; plan PostgreSQL for growth.",
  ),
  bullet(
    "Several admin API calls may lack JWT where Strapi permissions require it — verify each endpoint under Public vs Authenticated roles.",
  ),
  bullet(
    "Navigation: some Header links commented out while App.tsx routes remain — users can still deep-link.",
  ),

  h1("14. Maintenance Guidelines"),
  h2("14.1 Regular tasks (monthly)"),
  bullet("Review npm audit for frontend and backend; patch after testing."),
  bullet("Check disk usage for SQLite, uploads, and pm2 logs."),
  bullet("Confirm SSL auto-renewal succeeded in Plesk."),
  h2("14.2 Quarterly"),
  bullet("Restore a backup to a staging environment and run smoke tests."),
  bullet("Review Strapi Users & Permissions for new content types."),
  h2("14.3 Dependency upgrades"),
  p(
    "Upgrade Strapi minor versions after reading release notes. Major upgrades may require codemods or manual migration. Upgrade React/Vite stack in a branch with full regression testing of booking, events, and admin flows.",
  ),

  h1("15. Support"),
  p(
    "Post-handover support duration, channels (email, ticketing), and response times should be defined in the commercial agreement between BDSEC and the service provider. This technical document does not replace that contract. For internal IT, designate a primary and secondary owner for Plesk, Strapi, and repository access.",
  ),

  h1("16. Handover Acceptance"),
  p(
    "By signing below, the parties acknowledge receipt of the technical documentation, repository access as applicable, and hosting credentials according to organizational policy. Outstanding items (e.g. removal of hardcoded credentials) may be listed as conditional acceptance with a remediation date.",
  ),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: "E7E6E6" },
            children: [
              new Paragraph({
                children: [new TextRun({ text: "Role", bold: true, size: 22 })],
              }),
            ],
          }),
          new TableCell({
            shading: { fill: "E7E6E6" },
            children: [
              new Paragraph({
                children: [new TextRun({ text: "Name", bold: true, size: 22 })],
              }),
            ],
          }),
          new TableCell({
            shading: { fill: "E7E6E6" },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "Signature", bold: true, size: 22 }),
                ],
              }),
            ],
          }),
          new TableCell({
            shading: { fill: "E7E6E6" },
            children: [
              new Paragraph({
                children: [new TextRun({ text: "Date", bold: true, size: 22 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "Client representative", size: 22 }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "", size: 22 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "", size: 22 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "", size: 22 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "Service provider", size: 22 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "", size: 22 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "", size: 22 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "", size: 22 })],
              }),
            ],
          }),
        ],
      }),
    ],
  }),

  new Paragraph({ children: [new PageBreak()] }),
  h1("Appendix A — Strapi REST endpoints used by the SPA"),
  p(
    "Base URL = value of VITE_API_BASE_URL. Paths below are relative to that origin (e.g. https://back.bdsec.org/api/ec-doctors). Health check is special-cased as _health at origin in the admin code.",
  ),
  buildApiTable(),

  new Paragraph({ children: [new PageBreak()] }),
  h1("Appendix B — Frontend routes (React Router)"),
  p(
    "Route definitions are in src/App.tsx. Deep links require SPA hosting fallback to index.html.",
  ),
  buildRoutesTable(),

  new Paragraph({ children: [new PageBreak()] }),
  h1("Appendix C — Quick reference card"),
  table2Col("Item", "Value", [
    ["Public site", "https://bdsec.org"],
    ["Strapi API (prod)", "https://back.bdsec.org"],
    ["Strapi Admin (prod)", "https://back.bdsec.org/admin"],
    ["Strapi API (dev example)", "https://bdsec.org:8081"],
    ["Strapi Admin (dev example)", "https://bdsec.org:8081/admin"],
    ["Frontend env", "VITE_API_BASE_URL=https://back.bdsec.org (production)"],
    ["SQLite file (default)", "latestBackEnd/latestBackEnd/.tmp/data.db"],
    ["Strapi version", "5.8.0 (per backend package.json)"],
    ["Node range", "18.x – 22.x"],
    ["Process manager", "pm2 — pm2 logs"],
    ["Hosting control", "Plesk"],
    ["Regenerate this file", "npm run handover:docx in miniHositalManagement"],
  ]),

  h1("Appendix D — Troubleshooting"),
  h2("D.1 Blank doctors or events"),
  p(
    "Verify VITE_API_BASE_URL, CORS, and Strapi publication state (draft vs published). Open browser devtools Network tab and confirm GET returns 200 with a data array.",
  ),
  h2("D.2 CORS errors"),
  p(
    "Strapi must include the SPA origin in allowed origins. After changing CORS, restart Strapi.",
  ),
  h2("D.3 403 on POST forms"),
  p(
    "Adjust Users & Permissions for the Public role on the relevant collection type (create permission).",
  ),
  h2("D.4 Admin upload fails"),
  p(
    "Confirm JWT from auth/local is valid, upload permission is granted, and body uses multipart form field name expected by Strapi (files).",
  ),
  h2("D.5 Health always offline in dashboard"),
  p(
    "Confirm _health exists and returns 204 as expected, or change the frontend check to match your deployment.",
  ),

  h1("Appendix E — Glossary"),
  table2Col("Term", "Meaning", [
    ["SPA", "Single Page Application — React app with client-side routing"],
    ["Strapi", "Headless CMS providing REST API and Admin UI"],
    ["documentId", "Strapi 5 document identifier used in some PUT URLs"],
    [
      "populate=*",
      "Query parameter to include relations and media in Strapi responses",
    ],
    ["pm2", "Process manager for Node.js applications"],
    ["Plesk", "Web hosting control panel used for domains and SSL"],
    [
      "VITE_",
      "Prefix for environment variables exposed to browser code in Vite",
    ],
    [
      "CORS",
      "Cross-Origin Resource Sharing — browser security; Strapi must allow bdsec.org",
    ],
    [
      "JWT",
      "JSON Web Token — bearer token from Strapi auth for authenticated API calls",
    ],
    [
      "Content-Type Builder",
      "Strapi Admin section where collection types and fields are defined",
    ],
    [
      "Draft & Publish",
      "Strapi workflow; unpublished content may be invisible to Public API",
    ],
    [
      "RTO / RPO",
      "Recovery Time Objective / Recovery Point Objective — backup planning targets",
    ],
  ]),

  new Paragraph({ children: [new PageBreak()] }),
  h1("Appendix F — Frontend repository structure (miniHositalManagement)"),
  p(
    "High-level map for developers locating features. Paths are relative to the repository root.",
  ),
  bullet("package.json — scripts: dev, build, preview, lint, handover:docx"),
  bullet("vite.config.ts — Vite + React plugin"),
  bullet(
    "tailwind.config.js, postcss.config.js, index.html — styling and HTML shell",
  ),
  bullet("ENV_SETUP.md — documents VITE_API_BASE_URL"),
  bullet("src/main.tsx — React root mount"),
  bullet("src/App.tsx — Router, all Route paths, I18nProvider, ScrollToTop"),
  bullet("src/index.css — global styles"),
  bullet("src/config/api.ts — API_BASE_URL, getApiUrl(), getImageUrl()"),
  bullet("src/context/I18nContext.tsx — bilingual strings and language state"),
  bullet("src/types/index.ts — shared TypeScript interfaces"),
  bullet(
    "src/data/mockData.ts — static doctors/departments/testimonials used on some pages",
  ),
  bullet("src/utils/dateUtils.ts — appointment date/slot helpers"),
  bullet("src/utils/accessibility.ts — AccessibilityManager singleton"),
  bullet("src/hooks/useAccessibility.ts — font size and contrast hook"),
  bullet("src/pages/HomePage.tsx — home composition"),
  bullet("src/components/Layout/ — Layout.tsx, Header.tsx, Footer.tsx"),
  bullet(
    "src/components/Home/ — HeroSection, ServicesPreview, CaroselComponent, etc.",
  ),
  bullet(
    "src/components/Appointments/AppointmentBooking.tsx — booking wizard + POST",
  ),
  bullet("src/components/Admin/AdminDashboard.tsx — operational dashboard"),
  bullet(
    "src/components/Doctors/, Events/, Contact/, Services/ — major public modules",
  ),
  bullet(
    "src/components/AboutUs/, OurServices/, ForPatients/, Resources/, Notice/, GetInvolved/ — content sections",
  ),

  new Paragraph({ children: [new PageBreak()] }),
  h1(
    "Appendix G — Strapi backend repository structure (latestBackEnd/latestBackEnd)",
  ),
  p(
    "Typical Strapi 5 layout. Exact content-type folders live under src/api/ with schema.json per collection.",
  ),
  bullet("package.json — Strapi 5.8.0, scripts develop/build/start"),
  bullet(
    "config/database.js — sqlite (default .tmp/data.db) or postgres/mysql via env",
  ),
  bullet("config/ — server, admin, middleware, plugins (per project)"),
  bullet(".tmp/data.db — SQLite database file when using sqlite client"),
  bullet("public/uploads/ — uploaded media (when using local upload provider)"),
  bullet(
    "src/api/<collection-name>/ — content-types, controllers, routes, services",
  ),
  bullet("Strapi Admin — content editing at {API_ORIGIN}/admin"),

  new Paragraph({ children: [new PageBreak()] }),
  h1("Appendix H — Appointment payload reference (frontend → Strapi)"),
  p(
    "The public booking flow POSTs to api/ec-appointments with a JSON body shaped as { data: { ... } }. Field names must match the Strapi schema.",
  ),
  table2Col("Field (conceptual)", "Description", [
    [
      "dateAndTime",
      "ISO datetime combining selected date and time from the wizard",
    ],
    ["fullName", "Patient or contact full name"],
    ["email", "Contact email"],
    ["phoneNumber", "Contact phone"],
    ["resonForVisit", "Reason for visit (spelling as implemented in frontend)"],
    ["additionalNotes", "Optional free text"],
    [
      "ec_doctor",
      "Relation: numeric id of selected doctor from ec-doctors list",
    ],
  ]),
  p(
    "Admin updates use PUT api/ec-appointments/{documentId} with data.state for workflow status. Patient admin CRUD uses api/ec-patients with fields such as fullName, email, phoneNumber, lastVisit, patientId (generated in UI for new patients).",
  ),
];

const doc = new Document({
  sections: [
    {
      properties: {},
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
try {
  fs.writeFileSync(outPath, buffer);
  console.log("Written:", outPath);
} catch (e) {
  if (e && e.code === "EBUSY") {
    fs.writeFileSync(outPathFallback, buffer);
    console.log("Primary file locked (close Word). Written:", outPathFallback);
  } else {
    throw e;
  }
}
