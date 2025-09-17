import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { AppointmentBooking } from './components/Appointments/AppointmentBooking';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { ServicesPage } from './components/Services/ServicesPage';
import { DoctorsPage } from './components/Doctors/DoctorsPage';
import { EventsPage } from './components/Events/EventsPage';
import { ContactPage } from './components/Contact/ContactPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/appointments" element={<AppointmentBooking />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;