import { Doctor, Department, FAQ, Testimonial, Event } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    image: 'https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
    qualifications: ['MD - Harvard Medical School', 'Fellowship - Johns Hopkins', 'Board Certified Cardiologist'],
    experience: 15,
    availableSlots: []
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedics',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specializing in sports medicine and joint replacement surgery with over 12 years of experience.',
    qualifications: ['MD - Stanford University', 'Orthopedic Surgery Residency', 'Sports Medicine Fellowship'],
    experience: 12,
    availableSlots: []
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    specialty: 'Pediatrics',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Dedicated pediatrician focused on providing comprehensive care for children from birth to adolescence.',
    qualifications: ['MD - Yale School of Medicine', 'Pediatric Residency - Children\'s Hospital', 'Board Certified Pediatrician'],
    experience: 10,
    availableSlots: []
  }
];

export const departments: Department[] = [
  {
    id: '1',
    name: 'Emergency Medicine',
    description: '24/7 emergency care with state-of-the-art trauma center and life support systems.',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Trauma Care', 'Emergency Surgery', 'Critical Care', 'Ambulance Services'],
    head: 'Dr. Robert Martinez'
  },
  {
    id: '2',
    name: 'Cardiology',
    description: 'Comprehensive heart care including diagnostics, treatment, and preventive cardiology.',
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Cardiac Catheterization', 'Echocardiography', 'Stress Testing', 'Pacemaker Implantation'],
    head: 'Dr. Sarah Johnson'
  },
  {
    id: '3',
    name: 'Orthopedics',
    description: 'Expert care for bone, joint, and muscle conditions with advanced surgical techniques.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Physical Therapy'],
    head: 'Dr. Michael Chen'
  },
  {
    id: '4',
    name: 'Pediatrics',
    description: 'Specialized care for infants, children, and adolescents in a child-friendly environment.',
    image: 'https://images.pexels.com/photos/4269698/pexels-photo-4269698.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Well-Child Visits', 'Vaccinations', 'Developmental Assessments', 'Pediatric Emergency Care'],
    head: 'Dr. Emily Davis'
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment through our online booking system, by calling our main number, or by visiting our reception desk. Our online system is available 24/7 for your convenience.',
    category: 'Appointments'
  },
  {
    id: '2',
    question: 'What should I bring to my appointment?',
    answer: 'Please bring a valid photo ID, your insurance card, any relevant medical records, and a list of current medications. If this is your first visit, please arrive 15 minutes early to complete registration.',
    category: 'Appointments'
  },
  {
    id: '3',
    question: 'What are your visiting hours?',
    answer: 'General visiting hours are from 8:00 AM to 8:00 PM daily. ICU visiting hours are 10:00 AM to 12:00 PM and 4:00 PM to 6:00 PM. Some departments may have different hours.',
    category: 'General'
  },
  {
    id: '4',
    question: 'Do you accept my insurance?',
    answer: 'We accept most major insurance plans. Please contact our billing department or check with your insurance provider to verify coverage. We also offer payment plans for uninsured patients.',
    category: 'Billing'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    patientName: 'John Smith',
    rating: 5,
    review: 'Outstanding care from Dr. Johnson and her team. The heart surgery went perfectly and the recovery was smooth thanks to their excellent follow-up care.',
    date: '2024-01-15',
    treatment: 'Cardiac Surgery'
  },
  {
    id: '2',
    patientName: 'Maria Garcia',
    rating: 5,
    review: 'Dr. Chen performed my knee replacement surgery with incredible skill. I\'m back to playing tennis just 6 months later!',
    date: '2024-01-10',
    treatment: 'Knee Replacement'
  },
  {
    id: '3',
    patientName: 'Lisa Thompson',
    rating: 5,
    review: 'The pediatric team is amazing with children. Dr. Davis made my son feel comfortable during his entire treatment.',
    date: '2024-01-05',
    treatment: 'Pediatric Care'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Heart Health Awareness Week',
    description: 'Free heart health screenings, educational seminars, and consultations with our cardiology team.',
    date: '2024-02-14',
    time: '09:00',
    type: 'awareness',
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Main Hospital Lobby'
  },
  {
    id: '2',
    title: 'Diabetes Prevention Workshop',
    description: 'Learn about diabetes prevention, healthy eating, and lifestyle changes with our endocrinology experts.',
    date: '2024-02-20',
    time: '14:00',
    type: 'campaign',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Conference Room A'
  },
  {
    id: '3',
    title: 'Women\'s Health Check-up Day',
    description: 'Comprehensive health screenings for women including mammography, bone density, and wellness consultations.',
    date: '2024-02-25',
    time: '08:00',
    type: 'health-check',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Women\'s Health Center'
  }
];