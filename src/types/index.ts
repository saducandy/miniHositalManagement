export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
  qualifications: string[];
  experience: number;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'awareness' | 'campaign' | 'health-check';
  image: string;
  location: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  image: string;
  services: string[];
  head: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  rating: number;
  review: string;
  date: string;
  treatment: string;
}