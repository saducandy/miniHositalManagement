import React, { useEffect, useState } from 'react';
import { Calendar, Users, FileText, Settings, Activity, Clock, CheckCircle } from 'lucide-react';

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((a, idx) => {
                  const { date, time } = formatFancyDate(a.dateAndTime);
                  return (
                    <div key={idx} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs uppercase text-gray-500">Patient</p>
                            <h3 className="text-lg font-semibold text-gray-900">{a.fullName}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-xs uppercase text-gray-500">Doctor</p>
                            <p className="text-sm font-medium text-emerald-700">{a.ec_doctor?.name || '-'}</p>
                            <p className="text-xs text-gray-600">{a.ec_doctor?.speciality || '-'}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-emerald-600" />
                            <div>
                              <p className="text-xs text-gray-500">Date</p>
                              <p className="text-sm font-medium">{date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock className="h-5 w-5 text-emerald-600" />
                            <div>
                              <p className="text-xs text-gray-500">Time</p>
                              <p className="text-sm font-medium">{time}</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm text-gray-700 break-all">{a.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm text-gray-700">{a.phoneNumber}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Reason</p>
                          <p className="text-sm text-gray-700">{a.resonForVisit}</p>
                        </div>
                        {a.additionalNotes ? (
                          <div>
                            <p className="text-xs text-gray-500">Notes</p>
                            <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-3">{a.additionalNotes}</p>
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

        {/* Other tabs placeholder */}
        {activeTab !== 'overview' && activeTab !== 'appointments' && (
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