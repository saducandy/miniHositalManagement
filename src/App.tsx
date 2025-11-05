import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { AppointmentBooking } from './components/Appointments/AppointmentBooking';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { ServicesPage } from './components/Services/ServicesPage';
import { DoctorsPage } from './components/Doctors/DoctorsPage';
import { EventsPage } from './components/Events/EventsPage';
import { ContactPage } from './components/Contact/ContactPage';
import { VisionAndMission } from './components/AboutUs/VisionAndMission';
import { OurEyeCareCenterServices } from './components/AboutUs/OurEyeCareCenterServices';
import { I18nProvider } from './context/I18nContext';

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
            <Route path="/about/vision-mission" element={<VisionAndMission />} />
            <Route path="/services/eye-care" element={<OurEyeCareCenterServices />} />
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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export default App;