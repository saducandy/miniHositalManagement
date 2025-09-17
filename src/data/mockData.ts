import { Doctor, Department, FAQ, Testimonial, Event } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Retinal Specialist',
    image: 'https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Dr. Mitchell is a board-certified ophthalmologist specializing in retinal diseases and vitreoretinal surgery with over 15 years of experience.',
    qualifications: ['MD - Johns Hopkins School of Medicine', 'Ophthalmology Residency - Wills Eye Hospital', 'Vitreoretinal Surgery Fellowship'],
    experience: 15,
    availableSlots: []
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Corneal Specialist',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specializing in corneal transplants, LASIK surgery, and anterior segment disorders with over 12 years of experience.',
    qualifications: ['MD - Stanford University', 'Ophthalmology Residency - UCSF', 'Corneal Fellowship - Bascom Palmer Eye Institute'],
    experience: 12,
    availableSlots: []
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatric Ophthalmologist',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Dedicated pediatric eye specialist focused on treating eye conditions in children from infancy through adolescence.',
    qualifications: ['MD - Harvard Medical School', 'Ophthalmology Residency - Massachusetts Eye and Ear', 'Pediatric Ophthalmology Fellowship'],
    experience: 10,
    availableSlots: []
  },
  {
    id: '4',
    name: 'Dr. James Thompson',
    specialty: 'Glaucoma Specialist',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Expert in glaucoma diagnosis, treatment, and surgical management with advanced training in minimally invasive procedures.',
    qualifications: ['MD - University of Pennsylvania', 'Ophthalmology Residency - Duke Eye Center', 'Glaucoma Fellowship - Bascom Palmer'],
    experience: 14,
    availableSlots: []
  }
];

export const departments: Department[] = [
  {
    id: '1',
    name: 'Comprehensive Eye Exams',
    description: 'Complete eye health evaluations including vision testing, eye pressure checks, and retinal examinations.',
    image: 'https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Vision Testing', 'Dilated Eye Exams', 'Eye Pressure Screening', 'Retinal Photography'],
    head: 'Dr. Sarah Mitchell'
  },
  {
    id: '2',
    name: 'LASIK & Refractive Surgery',
    description: 'Advanced laser vision correction procedures to reduce dependence on glasses and contact lenses.',
    image: 'https://images.pexels.com/photos/5752270/pexels-photo-5752270.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['LASIK Surgery', 'PRK Surgery', 'ICL Implants', 'Astigmatism Correction'],
    head: 'Dr. Michael Chen'
  },
  {
    id: '3',
    name: 'Retinal Services',
    description: 'Specialized care for retinal conditions including diabetic retinopathy, macular degeneration, and retinal detachment.',
    image: 'https://images.pexels.com/photos/5752251/pexels-photo-5752251.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Diabetic Eye Care', 'Macular Degeneration Treatment', 'Retinal Injections', 'Vitrectomy Surgery'],
    head: 'Dr. Sarah Mitchell'
  },
  {
    id: '4',
    name: 'Pediatric Eye Care',
    description: 'Comprehensive eye care for children including vision screening, amblyopia treatment, and pediatric eye surgery.',
    image: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Children\'s Eye Exams', 'Amblyopia Treatment', 'Strabismus Surgery', 'Vision Therapy'],
    head: 'Dr. Emily Rodriguez'
  },
  {
    id: '5',
    name: 'Glaucoma Treatment',
    description: 'Advanced glaucoma diagnosis and treatment including medical therapy and minimally invasive surgical options.',
    image: 'https://images.pexels.com/photos/5752265/pexels-photo-5752265.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: ['Glaucoma Screening', 'Visual Field Testing', 'MIGS Procedures', 'Trabeculectomy'],
    head: 'Dr. James Thompson'
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How often should I have an eye exam?',
    answer: 'Adults should have comprehensive eye exams every 1-2 years, or annually if you have risk factors like diabetes, high blood pressure, or family history of eye disease. Children should have their first eye exam by age 1, then at age 3, and before starting school.',
    category: 'General'
  },
  {
    id: '2',
    question: 'Am I a candidate for LASIK surgery?',
    answer: 'LASIK candidacy depends on several factors including age (18+), stable prescription for at least one year, adequate corneal thickness, and overall eye health. We offer free LASIK consultations to determine if you\'re a good candidate.',
    category: 'LASIK'
  },
  {
    id: '3',
    question: 'What should I expect during a comprehensive eye exam?',
    answer: 'A comprehensive eye exam includes vision testing, eye pressure measurement, pupil dilation, and examination of the retina and optic nerve. The exam typically takes 60-90 minutes, and you may experience blurred vision for 2-4 hours after dilation.',
    category: 'Exams'
  },
  {
    id: '4',
    question: 'Do you accept my insurance?',
    answer: 'We accept most major vision and medical insurance plans including VSP, EyeMed, Davis Vision, and Medicare. Please contact our office to verify your specific coverage and benefits.',
    category: 'Insurance'
  },
  {
    id: '5',
    question: 'What are the symptoms of glaucoma?',
    answer: 'Early glaucoma often has no symptoms, which is why regular eye exams are crucial. Advanced glaucoma may cause peripheral vision loss, tunnel vision, eye pain, headaches, or seeing halos around lights.',
    category: 'Conditions'
  },
  {
    id: '6',
    question: 'How do I prepare for cataract surgery?',
    answer: 'Before cataract surgery, you\'ll need a pre-operative exam, measurements for your intraocular lens, and instructions about medications. Arrange for transportation as you cannot drive immediately after surgery.',
    category: 'Surgery'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    patientName: 'Jennifer Adams',
    rating: 5,
    review: 'Dr. Mitchell performed my retinal surgery with incredible skill. My vision has improved dramatically, and the care I received was exceptional throughout the entire process.',
    date: '2024-01-15',
    treatment: 'Retinal Surgery'
  },
  {
    id: '2',
    patientName: 'Robert Kim',
    rating: 5,
    review: 'LASIK with Dr. Chen was life-changing! I went from thick glasses to 20/20 vision. The procedure was quick and painless, and the results exceeded my expectations.',
    date: '2024-01-10',
    treatment: 'LASIK Surgery'
  },
  {
    id: '3',
    patientName: 'Maria Santos',
    rating: 5,
    review: 'Dr. Rodriguez is wonderful with children. My daughter was nervous about her eye exam, but Dr. Rodriguez made her feel comfortable and explained everything in kid-friendly terms.',
    date: '2024-01-05',
    treatment: 'Pediatric Eye Care'
  },
  {
    id: '4',
    patientName: 'David Wilson',
    rating: 5,
    review: 'The glaucoma treatment I received from Dr. Thompson has preserved my vision. The staff is knowledgeable, and the technology is state-of-the-art.',
    date: '2023-12-28',
    treatment: 'Glaucoma Treatment'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Diabetic Eye Disease Awareness Month',
    description: 'Free diabetic eye screenings and educational seminars about preventing vision loss from diabetes.',
    date: '2024-02-14',
    time: '09:00',
    type: 'awareness',
    image: 'https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Main Eye Care Center'
  },
  {
    id: '2',
    title: 'LASIK Information Seminar',
    description: 'Learn about LASIK and other refractive surgery options. Meet our surgeons and get your questions answered.',
    date: '2024-02-20',
    time: '18:00',
    type: 'campaign',
    image: 'https://images.pexels.com/photos/5752270/pexels-photo-5752270.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Conference Room A'
  },
  {
    id: '3',
    title: 'Children\'s Vision Screening Day',
    description: 'Free vision screenings for children ages 3-12. Early detection of vision problems is crucial for learning and development.',
    date: '2024-02-25',
    time: '10:00',
    type: 'health-check',
    image: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Pediatric Eye Care Department'
  },
  {
    id: '4',
    title: 'Glaucoma Awareness Week',
    description: 'Free glaucoma screenings and education about the "silent thief of sight." Learn about risk factors and prevention.',
    date: '2024-03-10',
    time: '08:00',
    type: 'awareness',
    image: 'https://images.pexels.com/photos/5752265/pexels-photo-5752265.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Main Eye Care Center'
  },
  {
    id: '5',
    title: 'Macular Degeneration Support Group',
    description: 'Monthly support group meeting for patients with macular degeneration and their families. Share experiences and learn coping strategies.',
    date: '2024-03-15',
    time: '14:00',
    type: 'campaign',
    image: 'https://images.pexels.com/photos/5752251/pexels-photo-5752251.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Community Room'
  }
];