import React, { useEffect, useState } from 'react';
import { Calendar, Users, FileText, Settings, Activity, Clock, CheckCircle, Mail, Search, Edit, Save, Bell, Moon, Sun, Globe, Shield } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState<Array<{
    dateAndTime: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    resonForVisit: string;
    additionalNotes?: string | null;
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
  const mockPatients = [
    { id: 'P-1001', name: 'John Doe', email: 'john@example.com', phone: '(555) 101-2020', lastVisit: '2025-09-01' },
    { id: 'P-1002', name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 303-4040', lastVisit: '2025-09-10' },
    { id: 'P-1003', name: 'Michael Chen', email: 'michael@example.com', phone: '(555) 505-6060', lastVisit: '2025-09-15' },
    { id: 'P-1004', name: 'Emily Davis', email: 'emily@example.com', phone: '(555) 707-8080', lastVisit: '2025-09-20' },
    { id: 'P-1003', name: 'Michael Chen', email: 'michael@example.com', phone: '(555) 505-6060', lastVisit: '2025-09-15' },
    { id: 'P-1004', name: 'Emily Davis', email: 'emily@example.com', phone: '(555) 707-8080', lastVisit: '2025-09-20' },
  ];
  const filteredPatients = mockPatients.filter(p =>
    [p.name, p.email, p.phone, p.id].some(v => v.toLowerCase().includes(patientSearch.toLowerCase()))
  );

  // Local content settings (client-side only)
  const [contentForm, setContentForm] = useState({
    heroHeadline: 'Your Vision, Our Excellence',
    heroSubtext: 'Experience exceptional eye care with our specialists.',
    contactEmail: 'info@eyecarecenter.com',
    footerNote: '© 2025 Eye Care Center. All rights reserved.',
  });

  const [settingsForm, setSettingsForm] = useState({
    theme: 'light' as 'light' | 'dark' | 'system',
    timeZone: 'UTC',
    emailNotifications: true,
    maintenanceMode: false,
  });

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

  const recentAppointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', time: '10:00 AM', status: 'confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', time: '11:30 AM', status: 'pending' },
    { id: 3, patient: 'Bob Wilson', doctor: 'Dr. Emily Davis', time: '2:00 PM', status: 'completed' },
    { id: 4, patient: 'Alice Brown', doctor: 'Dr. Sarah Johnson', time: '3:30 PM', status: 'confirmed' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Fetch appointments when Appointments tab is active
  useEffect(() => {
    if (activeTab !== 'appointments') return;
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
          dateAndTime: a.dateAndTime,
          fullName: a.fullName,
          email: a.email,
          phoneNumber: a.phoneNumber,
          resonForVisit: a.resonForVisit,
          additionalNotes: a.additionalNotes,
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your hospital operations efficiently</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white p-1 rounded-lg shadow">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
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
                          <button className="text-emerald-600 hover:text-emerald-700 font-medium focus:outline-none focus:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    Add New Appointment
                  </button>
                  <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Register New Patient
                  </button>
                  <button className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                    Schedule Event
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Server Status</span>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="text-sm font-medium text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Status</span>
                    <span className="text-sm font-medium text-green-600">Active</span>
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

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((p) => (
                <div key={p.id} className="rounded-xl border border-emerald-200 shadow-sm hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-blue-50">
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-xl" />
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-emerald-700">Patient ID</p>
                        <h3 className="text-lg font-semibold text-emerald-900">{p.id}</h3>
                      </div>
                      <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-blue-100 text-blue-700">Last Visit: {new Date(p.lastVisit).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-blue-700">Name</p>
                      <p className="text-sm font-semibold text-blue-900">{p.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-emerald-700">Email</p>
                        <p className="text-sm text-emerald-900 break-all">{p.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Phone</p>
                        <p className="text-sm text-blue-900">{p.phone}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
                      <button className="inline-flex items-center px-3 py-2 text-sm rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 w-full sm:w-auto">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </button>
                      <button className="inline-flex items-center px-3 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto">
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
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-emerald-50">
                <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-blue-900 flex items-center"><FileText className="h-5 w-5 mr-2" /> Homepage Hero</h3>
                  <label className="text-sm text-blue-700">Headline</label>
                  <input
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={contentForm.heroHeadline}
                    onChange={(e) => setContentForm({ ...contentForm, heroHeadline: e.target.value })}
                  />
                  <label className="text-sm text-blue-700">Subtext</label>
                  <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={contentForm.heroSubtext}
                    onChange={(e) => setContentForm({ ...contentForm, heroSubtext: e.target.value })}
                  />
                </div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50">
                <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-900 flex items-center"><Mail className="h-5 w-5 mr-2" /> Contact</h3>
                  <label className="text-sm text-emerald-700">Public Contact Email</label>
                  <input
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={contentForm.contactEmail}
                    onChange={(e) => setContentForm({ ...contentForm, contactEmail: e.target.value })}
                  />
                  <label className="text-sm text-emerald-700">Footer Note</label>
                  <input
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={contentForm.footerNote}
                    onChange={(e) => setContentForm({ ...contentForm, footerNote: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={async () => (await getSwal()).fire('Saved', 'Content changes saved locally.', 'success')}
                className="inline-flex items-center px-5 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto"
              >
                <Save className="h-5 w-5 mr-2" /> Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50">
                <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-900 flex items-center"><Sun className="h-5 w-5 mr-2" /> Theme</h3>
                  <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={settingsForm.theme}
                    onChange={(e) => setSettingsForm({ ...settingsForm, theme: e.target.value as any })}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
              <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-emerald-50">
                <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-blue-900 flex items-center"><Globe className="h-5 w-5 mr-2" /> Time Zone</h3>
                  <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={settingsForm.timeZone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, timeZone: e.target.value })}
                  >
                    <option value="UTC">UTC</option>
                    <option value="Africa/Addis_Ababa">Africa/Addis_Ababa</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                  </select>
                </div>
              </div>
              <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-purple-900 flex items-center"><Bell className="h-5 w-5 mr-2" /> Notifications</h3>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={settingsForm.emailNotifications} onChange={(e) => setSettingsForm({ ...settingsForm, emailNotifications: e.target.checked })} />
                    <span className="text-sm text-purple-900">Email Notifications</span>
                  </label>
                  <h3 className="text-lg font-semibold text-red-900 flex items-center mt-4"><Shield className="h-5 w-5 mr-2" /> Maintenance</h3>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={settingsForm.maintenanceMode} onChange={(e) => setSettingsForm({ ...settingsForm, maintenanceMode: e.target.checked })} />
                    <span className="text-sm text-red-900">Enable Maintenance Mode</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={async () => (await getSwal()).fire('Saved', 'Settings saved locally.', 'success')}
                className="inline-flex items-center px-5 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto"
              >
                <Save className="h-5 w-5 mr-2" /> Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'overview' && activeTab !== 'appointments' && activeTab !== 'messages' && activeTab !== 'patients' && activeTab !== 'content' && activeTab !== 'settings' && (
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