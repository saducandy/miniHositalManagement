import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { HomePage } from "./pages/HomePage";
import { AppointmentBooking } from "./components/Appointments/AppointmentBooking";
import { AdminDashboard } from "./components/Admin/AdminDashboard";
import { ServicesPage } from "./components/Services/ServicesPage";
import { DoctorsPage } from "./components/Doctors/DoctorsPage";
import { EventsPage } from "./components/Events/EventsPage";
import { ContactPage } from "./components/Contact/ContactPage";
import { VisionAndMission } from "./components/AboutUs/VisionAndMission";
import { OurEyeCareCenterServices } from "./components/AboutUs/OurEyeCareCenterServices";
import OurStory from "./components/AboutUs/OurStory";
import ManagementTeam from "./components/AboutUs/ManagementTeam";
import OurStaff from "./components/AboutUs/OurStaff.tsx";
import AwardsAndRecognitions from "./components/AboutUs/AwardsAndRecognitions";
import AnualActivityReports from "./components/AboutUs/AnualActivityReports";
import News from "./components/AboutUs/News";
import HospitalLocation from "./components/AboutUs/HospitalLocation";
import { I18nProvider } from "./context/I18nContext";
import Outreach from "./components/OurServices/Outreach";
import TeleOphtalmology from "./components/OurServices/TeleOphtalmology";
import EducationAndTraining from "./components/OurServices/EducationAndTraining";
import Research from "./components/OurServices/Research";
import Publications from "./components/Resources/Publication";
import AboutTheEye from "./components/ForPatients/AboutTheEye";
import EyeDiseaseTreatment from "./components/ForPatients/EyeDeseaseAndTratment";
import WhatToExpect from "./components/ForPatients/WhatToExpect";
import Insurance from "./components/ForPatients/Insurance";
import Donate from "./components/GetInvolved/Donate";
import OrganizeOutreach from "./components/GetInvolved/OrganizeOutReach";
import Vacancy from "./components/Notice/Vacancy";

function App() {
  return (
    <I18nProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about/doctors" element={<DoctorsPage />} />
            <Route path="/appointments" element={<AppointmentBooking />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/about/vision-mission"
              element={<VisionAndMission />}
            />
            <Route path="/about/story" element={<OurStory />} />
            <Route path="/about/management" element={<ManagementTeam />} />
            <Route path="/about/staff" element={<OurStaff />} />
            <Route path="/about/awards" element={<AwardsAndRecognitions />} />
            <Route path="/about/reports" element={<AnualActivityReports />} />
            <Route path="/about/news" element={<News />} />
            <Route path="/about/location" element={<HospitalLocation />} />
            <Route
              path="/services/eye-care"
              element={<OurEyeCareCenterServices />}
            />
            <Route path="/services/outreach" element={<Outreach />} />
            <Route
              path="/services/tele-ophthalmology"
              element={<TeleOphtalmology />}
            />
            <Route
              path="/services/education"
              element={<EducationAndTraining />}
            />
            <Route path="/services/research" element={<Research />} />
            <Route path="/resources/publications" element={<Publications />} />
            {/* <Route path="/resources/sops" element={<StaffSOPs />} /> */}
            <Route path="/patients/about-eye" element={<AboutTheEye />} />
            <Route
              path="/patients/diseases"
              element={<EyeDiseaseTreatment />}
            />
            <Route path="/patients/what-to-expect" element={<WhatToExpect />} />
            <Route path="/patients/insurance" element={<Insurance />} />
            <Route path="/get-involved/donate" element={<Donate />} />
            <Route
              path="/get-involved/organize-outreach"
              element={<OrganizeOutreach />}
            />
            <Route path="/notice/vacancy" element={<Vacancy />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </I18nProvider>
  );
}

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

export default App;
