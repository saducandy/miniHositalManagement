import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Settings, Activity, Clock, CheckCircle, Mail, Search, Edit, Sun, Plus, Upload, X } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState<Array<{
    id: number;
    documentId: string;
    dateAndTime: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    resonForVisit: string;
    additionalNotes?: string | null;
    state?: string;
    ec_doctor?: { name?: string; speciality?: string } | null;
  }>>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
    createdAt: string;
  }>>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [patientSearch, setPatientSearch] = useState('');
  
  // Patients state
  const [patients, setPatients] = useState<Array<{
    id: number;
    documentId: string;
    patientId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    lastVisit: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [patientsError, setPatientsError] = useState<string | null>(null);
  
  // Patient form state
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [showEditPatientForm, setShowEditPatientForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patientForm, setPatientForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    lastVisit: ''
  });
  const [creatingPatient, setCreatingPatient] = useState(false);
  const [updatingPatient, setUpdatingPatient] = useState(false);
  const [patientFormError, setPatientFormError] = useState<string | null>(null);
  
  // Events state
  const [events, setEvents] = useState<Array<{
    id: number;
    documentId: string;
    category: string;
    title: string;
    descreption: string;
    date: string;
    location: string;
    learnMore: string;
    image?: { url: string };
  }>>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);
  
  // Authentication state
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  
  // Add event form state
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({
    category: 'AWARENESS',
    title: '',
    descreption: '',
    date: '',
    location: '',
    learnMore: 'Learn More',
    image: null as File | null
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [eventFormError, setEventFormError] = useState<string | null>(null);
  
  // Server status state
  const [serverStatus, setServerStatus] = useState({
    server: 'Online',
    database: 'Connected',
    api: 'Active'
  });
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const filteredPatients = patients.filter(p =>
    [p.fullName, p.email, p.phoneNumber, p.patientId].some(v => v.toLowerCase().includes(patientSearch.toLowerCase()))
  );

  const [settingsForm, setSettingsForm] = useState({
    theme: 'light' as 'light' | 'dark' | 'system',
  });

  // Apply theme changes
  useEffect(() => {
    const applyTheme = (theme: string) => {
      const root = document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else if (theme === 'light') {
        root.classList.add('light');
        root.classList.remove('dark');
      } else if (theme === 'system') {
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemPrefersDark) {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
      }
    };

    applyTheme(settingsForm.theme);
    
    // Listen for system theme changes when using 'system' theme
    if (settingsForm.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settingsForm.theme]);

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme') as 'light' | 'dark' | 'system' || 'light';
    setSettingsForm(prev => ({ ...prev, theme: savedTheme }));
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('admin-theme', settingsForm.theme);
  }, [settingsForm.theme]);

  let SwalRef: any = null;
  async function getSwal() {
    if (SwalRef) return SwalRef;
    try {
      const mod = await import('sweetalert2');
      SwalRef = mod.default || mod;
    } catch {
      SwalRef = { fire: (t: string, m: string, _i?: string) => alert(`${t}: ${m}`) };
    }
    return SwalRef;
  }

  const stats = [
    { label: 'Total Appointments', value: '1,234', change: '+12%', icon: Calendar, color: 'emerald' },
    { label: 'Active Patients', value: '856', change: '+8%', icon: Users, color: 'blue' },
    { label: 'Pending Requests', value: '23', change: '-5%', icon: Clock, color: 'yellow' },
    { label: 'Completed Today', value: '47', change: '+15%', icon: CheckCircle, color: 'green' },
  ];

  // Get recent appointments from the fetched data (limit to 5 most recent)
  const recentAppointments = appointments
    .sort((a, b) => new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime())
    .slice(0, 5)
    .map(appointment => {
      const appointmentDate = new Date(appointment.dateAndTime);
      const time = appointmentDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
      return {
        id: appointment.id,
        patient: appointment.fullName,
        doctor: appointment.ec_doctor?.name || 'Not Assigned',
        time: time,
        status: appointment.state || 'pending',
        documentId: appointment.documentId
      };
    });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Fetch appointments on component mount and when Appointments tab is active
  useEffect(() => {
    // Always fetch appointments for the overview tab, or when appointments tab is active
    if (activeTab !== 'appointments' && activeTab !== 'overview') return;
    const controller = new AbortController();
    const fetchAppointments = async () => {
      try {
        setLoadingAppointments(true);
        setAppointmentsError(null);
        const res = await fetch('https://strapi.hielav.com/api/ec-appointments?populate=*', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load appointments: ${res.status}`);
        const json: { data: Array<any> } = await res.json();
        const mapped = (json.data || []).map((a) => ({
          id: a.id,
          documentId: a.documentId,
          dateAndTime: a.dateAndTime,
          fullName: a.fullName,
          email: a.email,
          phoneNumber: a.phoneNumber,
          resonForVisit: a.resonForVisit,
          additionalNotes: a.additionalNotes,
          state: a.state || 'pending',
          ec_doctor: a.ec_doctor ? { name: a.ec_doctor.name, speciality: a.ec_doctor.speciality } : null,
        }));
        setAppointments(mapped);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setAppointmentsError(e?.message || 'Failed to load appointments');
      } finally {
        setLoadingAppointments(false);
      }
    };
    fetchAppointments();
    return () => controller.abort();
  }, [activeTab]);

  // Fetch messages when Messages tab is active
  useEffect(() => {
    if (activeTab !== 'messages') return;
    const controller = new AbortController();
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        setMessagesError(null);
        const res = await fetch('https://strapi.hielav.com/api/ec-message-from-customers', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load messages: ${res.status}`);
        const json: { data: Array<any> } = await res.json();
        const mapped = (json.data || []).map((m) => ({
          fullName: m.fullName,
          email: m.email,
          phoneNumber: m.phoneNumber,
          subject: m.subject,
          message: m.message,
          createdAt: m.createdAt,
        }));
        setMessages(mapped);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setMessagesError(e?.message || 'Failed to load messages');
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
    return () => controller.abort();
  }, [activeTab]);

  // Fetch events when Events tab is active
  useEffect(() => {
    if (activeTab !== 'events') return;
    const controller = new AbortController();
    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);
        setEventsError(null);
        const res = await fetch('https://strapi.hielav.com/api/ec-events?populate=*', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load events: ${res.status}`);
        const json: { data: Array<any> } = await res.json();
        const mapped = (json.data || []).map((event) => ({
          id: event.id,
          documentId: event.documentId,
          category: event.category,
          title: event.title,
          descreption: event.descreption,
          date: event.date,
          location: event.location,
          learnMore: event.learnMore,
          image: event.image ? { url: event.image.url } : undefined,
        }));
        setEvents(mapped);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setEventsError(e?.message || 'Failed to load events');
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
    return () => controller.abort();
  }, [activeTab]);

  // Fetch patients when Patients tab is active
  useEffect(() => {
    if (activeTab !== 'patients') return;
    const controller = new AbortController();
    const fetchPatients = async () => {
      try {
        setLoadingPatients(true);
        setPatientsError(null);
        const res = await fetch('https://strapi.hielav.com/api/ec-patients', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load patients: ${res.status}`);
        const json: { data: Array<any> } = await res.json();
        const mapped = (json.data || []).map((patient) => ({
          id: patient.id,
          documentId: patient.documentId,
          patientId: patient.patientId,
          fullName: patient.fullName,
          email: patient.email,
          phoneNumber: patient.phoneNumber,
          lastVisit: patient.lastVisit,
          createdAt: patient.createdAt,
          updatedAt: patient.updatedAt,
          publishedAt: patient.publishedAt,
        }));
        setPatients(mapped);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setPatientsError(e?.message || 'Failed to load patients');
      } finally {
        setLoadingPatients(false);
      }
    };
    fetchPatients();
    return () => controller.abort();
  }, [activeTab]);

  // Authenticate admin user
  const authenticateAdmin = async () => {
    try {
      const response = await fetch('https://strapi.hielav.com/api/auth/local/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: 'sarah.yirga@gmail.com',
          password: '123456'
        })
      });
      
      if (!response.ok) throw new Error('Authentication failed');
      
      const data = await response.json();
      setJwtToken(data.jwt);
      return data.jwt;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };

  // Upload image to Strapi
  const uploadImage = async (file: File, token: string): Promise<number> => {
    const formData = new FormData();
    formData.append('files', file);

    const response = await fetch('https://strapi.hielav.com/api/upload/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Image upload failed');
    
    const data = await response.json();
    return data[0].id; // Return the image ID
  };

  // Create new event
  const createEvent = async (eventData: any, imageId: number) => {
    const response = await fetch('https://strapi.hielav.com/api/ec-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          ...eventData,
          image: imageId
        }
      })
    });

    if (!response.ok) throw new Error('Event creation failed');
    return await response.json();
  };

  // Handle add event form submission
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventFormError(null);
    
    if (!eventForm.image) {
      setEventFormError('Please select an image');
      return;
    }

    try {
      setCreatingEvent(true);
      
      // Authenticate first
      const token = jwtToken || await authenticateAdmin();
      
      // Upload image
      setUploadingImage(true);
      const imageId = await uploadImage(eventForm.image, token);
      setUploadingImage(false);
      
      // Create event
      const eventData = {
        category: eventForm.category,
        title: eventForm.title,
        descreption: eventForm.descreption,
        date: eventForm.date,
        location: eventForm.location,
        learnMore: eventForm.learnMore,
      };
      
      await createEvent(eventData, imageId);
      
      // Reset form and close modal
      setEventForm({
        category: 'AWARENESS',
        title: '',
        descreption: '',
        date: '',
        location: '',
        learnMore: 'Learn More',
        image: null
      });
      setShowAddEventForm(false);
      
      // Refresh events list
      if (activeTab === 'events') {
        // Trigger events refetch by updating activeTab briefly
        const currentTab = activeTab;
        setActiveTab('overview');
        setTimeout(() => setActiveTab(currentTab), 100);
      }
      
      (await getSwal()).fire('Success', 'Event created successfully!', 'success');
      
    } catch (error: any) {
      setEventFormError(error.message || 'Failed to create event');
    } finally {
      setCreatingEvent(false);
      setUploadingImage(false);
    }
  };

  // Handle form input changes
  const handleEventFormChange = (field: string, value: any) => {
    setEventForm(prev => ({ ...prev, [field]: value }));
  };

  // Check server health status
  const checkServerHealth = async () => {
    try {
      setIsCheckingStatus(true);
      const response = await fetch('https://strapi.hielav.com/_health', {
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (response.status === 204) {
        // Server is healthy
        setServerStatus({
          server: 'Online',
          database: 'Connected',
          api: 'Active'
        });
      } else {
        // Server is not healthy
        setServerStatus({
          server: 'Offline',
          database: 'Disconnected',
          api: 'Inactive'
        });
      }
    } catch (error) {
      // Network error or timeout
      setServerStatus({
        server: 'Offline',
        database: 'Disconnected',
        api: 'Inactive'
      });
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // Periodic health check
  useEffect(() => {
    // Initial check
    checkServerHealth();
    
    // Set up interval for periodic checks (every 30 seconds)
    const interval = setInterval(checkServerHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Update appointment state
  const updateAppointmentState = async (documentId: string, newState: string) => {
    try {
      const response = await fetch(`https://strapi.hielav.com/api/ec-appointments/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            state: newState
          }
        })
      });

      if (!response.ok) throw new Error('Failed to update appointment state');
      
      // Update the local state
      setAppointments(prev => prev.map(appointment => 
        appointment.documentId === documentId 
          ? { ...appointment, state: newState }
          : appointment
      ));
      
      (await getSwal()).fire('Success', `Appointment state updated to ${newState}`, 'success');
      
    } catch (error: any) {
      (await getSwal()).fire('Error', error.message || 'Failed to update appointment state', 'error');
    }
  };

  // Generate patient ID
  const generatePatientId = () => {
    const existingIds = patients.map(p => p.patientId);
    let counter = 1;
    let newId = `P-${counter.toString().padStart(4, '0')}`;
    
    while (existingIds.includes(newId)) {
      counter++;
      newId = `P-${counter.toString().padStart(4, '0')}`;
    }
    
    return newId;
  };

  // Create new patient
  const createPatient = async (patientData: any) => {
    const response = await fetch('https://strapi.hielav.com/api/ec-patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          ...patientData,
          patientId: generatePatientId()
        }
      })
    });

    if (!response.ok) throw new Error('Patient creation failed');
    return await response.json();
  };

  // Update patient
  const updatePatient = async (documentId: string, patientData: any) => {
    const response = await fetch(`https://strapi.hielav.com/api/ec-patients/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: patientData
      })
    });

    if (!response.ok) throw new Error('Patient update failed');
    return await response.json();
  };

  // Handle add patient form submission
  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setPatientFormError(null);

    try {
      setCreatingPatient(true);
      
      await createPatient(patientForm);
      
      // Reset form and close modal
      setPatientForm({
        fullName: '',
        email: '',
        phoneNumber: '',
        lastVisit: ''
      });
      setShowAddPatientForm(false);
      
      // Refresh patients list
      if (activeTab === 'patients') {
        const currentTab = activeTab;
        setActiveTab('overview');
        setTimeout(() => setActiveTab(currentTab), 100);
      }
      
      (await getSwal()).fire('Success', 'Patient created successfully!', 'success');
      
    } catch (error: any) {
      setPatientFormError(error.message || 'Failed to create patient');
    } finally {
      setCreatingPatient(false);
    }
  };

  // Handle edit patient form submission
  const handleEditPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setPatientFormError(null);

    try {
      setUpdatingPatient(true);
      
      await updatePatient(selectedPatient.documentId, patientForm);
      
      // Update local state
      setPatients(prev => prev.map(patient => 
        patient.documentId === selectedPatient.documentId 
          ? { ...patient, ...patientForm }
          : patient
      ));
      
      // Reset form and close modal
      setPatientForm({
        fullName: '',
        email: '',
        phoneNumber: '',
        lastVisit: ''
      });
      setShowEditPatientForm(false);
      setSelectedPatient(null);
      
      (await getSwal()).fire('Success', 'Patient updated successfully!', 'success');
      
    } catch (error: any) {
      setPatientFormError(error.message || 'Failed to update patient');
    } finally {
      setUpdatingPatient(false);
    }
  };

  // Handle form input changes
  const handlePatientFormChange = (field: string, value: any) => {
    setPatientForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle edit button click
  const handleEditClick = (patient: any) => {
    setSelectedPatient(patient);
    setPatientForm({
      fullName: patient.fullName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      lastVisit: patient.lastVisit
    });
    setShowEditPatientForm(true);
  };

  const formatFancyDate = (iso: string) => {
    try {
      const d = new Date(iso);
      const date = d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      return { date, time };
    } catch {
      return { date: iso, time: '' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your hospital operations efficiently</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-lg shadow">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} vs last month
                      </p>
                    </div>
                    <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
              </div>
              <div className="overflow-x-auto">
                {loadingAppointments ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-600">Loading appointments...</p>
                  </div>
                ) : appointmentsError ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-red-600">{appointmentsError}</p>
                  </div>
                ) : recentAppointments.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-600">No appointments found</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentAppointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{appointment.patient}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{appointment.doctor}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{appointment.time}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button 
                              onClick={() => setActiveTab('appointments')}
                              className="text-emerald-600 hover:text-emerald-700 font-medium focus:outline-none focus:underline"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                  onClick={() => navigate('/appointments')}
                  className="w-full text-left p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    Add New Appointment
                  </button>
                  <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Register New Patient
                  </button>
                  <button 
                    onClick={() => setShowAddEventForm(true)}
                    className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Schedule Event
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                  <button
                    onClick={checkServerHealth}
                    disabled={isCheckingStatus}
                    className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors disabled:opacity-50"
                  >
                    {isCheckingStatus ? 'Checking...' : 'Refresh'}
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Server Status</span>
                    <span className={`text-sm font-medium ${
                      serverStatus.server === 'Online' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {serverStatus.server}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className={`text-sm font-medium ${
                      serverStatus.database === 'Connected' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {serverStatus.database}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Status</span>
                    <span className={`text-sm font-medium ${
                      serverStatus.api === 'Active' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {serverStatus.api}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-600">New patient registered</p>
                  <p className="text-gray-600">Appointment confirmed</p>
                  <p className="text-gray-600">Event scheduled</p>
                  <p className="text-gray-600">Content updated</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Appointments</h2>
            {loadingAppointments && (
              <p className="text-gray-600">Loading appointments...</p>
            )}
            {appointmentsError && (
              <p className="text-red-600">{appointmentsError}</p>
            )}
            {!loadingAppointments && !appointmentsError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((a, idx) => {
                  const { date, time } = formatFancyDate(a.dateAndTime);
                  return (
                    <div key={idx} className="rounded-xl border border-emerald-200 shadow-sm hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-blue-50">
                      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-xl" />
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-wide text-emerald-700">Patient</p>
                            <h3 className="text-lg font-semibold text-emerald-900">{a.fullName}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] uppercase tracking-wide text-blue-700">Doctor</p>
                            <p className="text-sm font-semibold text-blue-900">{a.ec_doctor?.name || '-'}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-[11px] rounded-full bg-blue-100 text-blue-700">{a.ec_doctor?.speciality || '-'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-wide text-purple-700">Status</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                              a.state === 'confirmed' ? 'bg-green-100 text-green-800' :
                              a.state === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              a.state === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {(a.state || 'pending').charAt(0).toUpperCase() + (a.state || 'pending').slice(1)}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <select
                              value={a.state || 'pending'}
                              onChange={(e) => updateAppointmentState(a.documentId, e.target.value)}
                              className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-emerald-600" />
                            <div>
                              <p className="text-xs text-emerald-700">Date</p>
                              <p className="text-sm font-semibold text-emerald-900">{date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-xs text-blue-700">Time</p>
                              <p className="text-sm font-semibold text-blue-900">{time}</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-emerald-700">Email</p>
                            <p className="text-sm text-emerald-900 break-all">{a.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-blue-700">Phone</p>
                            <p className="text-sm text-blue-900">{a.phoneNumber}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-purple-700">Reason</p>
                          <p className="text-sm text-purple-900">{a.resonForVisit}</p>
                        </div>
                        {a.additionalNotes ? (
                          <div>
                            <p className="text-xs text-pink-700">Notes</p>
                            <p className="text-sm text-pink-900 whitespace-pre-line line-clamp-3">{a.additionalNotes}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Message From Customers</h2>
            {loadingMessages && (
              <p className="text-gray-600">Loading messages...</p>
            )}
            {messagesError && (
              <p className="text-red-600">{messagesError}</p>
            )}
            {!loadingMessages && !messagesError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages.map((m, idx) => {
                  const created = new Date(m.createdAt);
                  const createdDate = created.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                  const createdTime = created.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
                  return (
                    <div key={idx} className="rounded-xl border border-blue-200 shadow-sm hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-emerald-50">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-t-xl" />
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-wide text-blue-700">From</p>
                            <h3 className="text-lg font-semibold text-blue-900">{m.fullName}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] uppercase tracking-wide text-emerald-700">Received</p>
                            <p className="text-sm font-semibold text-emerald-900">{createdDate}</p>
                            <p className="text-xs text-emerald-700">{createdTime}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-blue-700">Email</p>
                            <p className="text-sm text-blue-900 break-all">{m.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-emerald-700">Phone</p>
                            <p className="text-sm text-emerald-900">{m.phoneNumber}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-purple-700">Subject</p>
                          <p className="text-sm text-purple-900 font-semibold">{m.subject}</p>
                        </div>
                        <div>
                          <p className="text-xs text-pink-700">Message</p>
                          <p className="text-sm text-pink-900 whitespace-pre-line line-clamp-5">{m.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
              <button
                onClick={() => setShowAddEventForm(true)}
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Event
              </button>
            </div>
            
            {loadingEvents && (
              <p className="text-gray-600">Loading events...</p>
            )}
            {eventsError && (
              <p className="text-red-600">{eventsError}</p>
            )}
            {!loadingEvents && !eventsError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, idx) => {
                  const { date, time } = formatFancyDate(event.date);
                  return (
                    <div key={idx} className="rounded-xl border border-purple-200 shadow-sm hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-emerald-50">
                      <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-emerald-400 rounded-t-xl" />
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-wide text-purple-700">Event</p>
                            <h3 className="text-lg font-semibold text-purple-900">{event.title}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] uppercase tracking-wide text-emerald-700">Category</p>
                            <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-emerald-100 text-emerald-700">{event.category}</span>
                          </div>
                        </div>
                        
                        {event.image && (
                          <div className="w-full h-32 rounded-lg overflow-hidden">
                            <img
                              src={event.image.url.startsWith('http') ? event.image.url : `https://strapi.hielav.com${event.image.url}`}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-purple-600" />
                            <div>
                              <p className="text-xs text-purple-700">Date</p>
                              <p className="text-sm font-semibold text-purple-900">{date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock className="h-5 w-5 text-emerald-600" />
                            <div>
                              <p className="text-xs text-emerald-700">Time</p>
                              <p className="text-sm font-semibold text-emerald-900">{time}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-blue-700">Location</p>
                          <p className="text-sm text-blue-900">{event.location}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-700">Description</p>
                          <p className="text-sm text-gray-900 line-clamp-3">{event.descreption}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-pink-700">Learn More</p>
                          <p className="text-sm text-pink-900">{event.learnMore}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Add Event Modal */}
        {showAddEventForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Event</h2>
                  <button
                    onClick={() => setShowAddEventForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={eventForm.category}
                        onChange={(e) => handleEventFormChange('category', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="AWARENESS">Awareness</option>
                        <option value="CAMPAIGN">Campaign</option>
                        <option value="HEALTH CHECK">Health Check</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        value={eventForm.date}
                        onChange={(e) => handleEventFormChange('date', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => handleEventFormChange('title', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={eventForm.location}
                      onChange={(e) => handleEventFormChange('location', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter event location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={eventForm.descreption}
                      onChange={(e) => handleEventFormChange('descreption', e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter event description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learn More Text
                    </label>
                    <input
                      type="text"
                      value={eventForm.learnMore}
                      onChange={(e) => handleEventFormChange('learnMore', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Learn More"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Image *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-emerald-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="event-image" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                            <span>Upload an image</span>
                            <input
                              id="event-image"
                              name="event-image"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => handleEventFormChange('image', e.target.files?.[0] || null)}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        {eventForm.image && (
                          <p className="text-sm text-emerald-600 font-medium">
                            Selected: {eventForm.image.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {eventFormError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{eventFormError}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddEventForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creatingEvent || uploadingImage}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {creatingEvent ? 'Creating...' : uploadingImage ? 'Uploading Image...' : 'Create Event'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
              <div className="flex items-center space-x-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name, email, ID..."
                    className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowAddPatientForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </button>
              </div>
            </div>
            
            {loadingPatients && (
              <p className="text-gray-600">Loading patients...</p>
            )}
            {patientsError && (
              <p className="text-red-600">{patientsError}</p>
            )}
            {!loadingPatients && !patientsError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((p) => (
                <div key={p.id} className="rounded-xl border border-emerald-200 shadow-sm hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-blue-50">
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-xl" />
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-emerald-700">Patient ID</p>
                        <h3 className="text-lg font-semibold text-emerald-900">{p.patientId}</h3>
                      </div>
                      <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-blue-100 text-blue-700">Last Visit: {new Date(p.lastVisit).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-blue-700">Name</p>
                      <p className="text-sm font-semibold text-blue-900">{p.fullName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-emerald-700">Email</p>
                        <p className="text-sm text-emerald-900 break-all">{p.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Phone</p>
                        <p className="text-sm text-blue-900">{p.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
                      <button 
                        onClick={() => handleEditClick(p)}
                        className="inline-flex items-center px-3 py-2 text-sm rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 w-full sm:w-auto"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </button>
                      <button 
                        onClick={() => navigate('/appointments', { 
                          state: { 
                            patientData: {
                              fullName: p.fullName,
                              email: p.email,
                              phoneNumber: p.phoneNumber
                            }
                          }
                        })}
                        className="inline-flex items-center px-3 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto"
                      >
                        <Calendar className="h-4 w-4 mr-1" /> New Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPatients.length === 0 && (
                <p className="text-gray-600">No patients match your search.</p>
              )}
            </div>
            )}
          </div>
        )}

        {/* Add Patient Modal */}
        {showAddPatientForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
                  <button
                    onClick={() => setShowAddPatientForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddPatient} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={patientForm.fullName}
                      onChange={(e) => handlePatientFormChange('fullName', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter patient's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={patientForm.email}
                      onChange={(e) => handlePatientFormChange('email', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter patient's email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={patientForm.phoneNumber}
                      onChange={(e) => handlePatientFormChange('phoneNumber', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter patient's phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Visit Date *
                    </label>
                    <input
                      type="date"
                      value={patientForm.lastVisit}
                      onChange={(e) => handlePatientFormChange('lastVisit', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {patientFormError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{patientFormError}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddPatientForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creatingPatient}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {creatingPatient ? 'Creating...' : 'Create Patient'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Patient Modal */}
        {showEditPatientForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Patient</h2>
                  <button
                    onClick={() => setShowEditPatientForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleEditPatient} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={patientForm.fullName}
                      onChange={(e) => handlePatientFormChange('fullName', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter patient's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={patientForm.email}
                      onChange={(e) => handlePatientFormChange('email', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter patient's email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={patientForm.phoneNumber}
                      onChange={(e) => handlePatientFormChange('phoneNumber', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter patient's phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Visit Date *
                    </label>
                    <input
                      type="date"
                      value={patientForm.lastVisit}
                      onChange={(e) => handlePatientFormChange('lastVisit', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {patientFormError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{patientFormError}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditPatientForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updatingPatient}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updatingPatient ? 'Updating...' : 'Update Patient'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">System Settings</h2>
            <div className="max-w-md">
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
                <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 flex items-center">
                    <Sun className="h-5 w-5 mr-2" /> Theme
                  </h3>
                  <select
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={settingsForm.theme}
                    onChange={(e) => setSettingsForm({ ...settingsForm, theme: e.target.value as any })}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {settingsForm.theme === 'system' 
                      ? `System preference: ${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'}`
                      : `Current theme: ${settingsForm.theme.charAt(0).toUpperCase() + settingsForm.theme.slice(1)}`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'overview' && activeTab !== 'appointments' && activeTab !== 'events' && activeTab !== 'messages' && activeTab !== 'patients' && activeTab !== 'settings' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {tabs.find(t => t.id === activeTab)?.label} Management
            </h2>
            <p className="text-gray-600">
              This section would contain the management interface for {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.
              Implementation would include forms, tables, and controls specific to each section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};