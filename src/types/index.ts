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
  name: string | { en: string; am: string };
  description: string | { en: string; am: string };
  image: string;
  services: Array<string | { en: string; am: string }>;
  head: string | { en: string; am: string };
}

export interface FAQ {
  id: string;
  question: string | { en: string; am: string };
  answer: string | { en: string; am: string };
  category: string;
}

export interface Testimonial {
  id: string;
  patientName: string | { en: string; am: string };
  rating: number;
  review: string | { en: string; am: string };
  date: string;
  treatment: string | { en: string; am: string };
}