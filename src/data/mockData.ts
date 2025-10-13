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
    name: { en: 'Comprehensive Eye Exams', am: 'በሙሉ የዓይን ምርመራ' } as any,
    description: { en: 'Complete eye health evaluations including vision testing, eye pressure checks, and retinal examinations.', am: 'የእይታ መርማሪያ፣ የዓይን ጫና ምርመራ እና የሬቲና ምርመራ ጨምሮ ሙሉ የዓይን ጤና ግምገማዎች።' } as any,
    image: 'https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      { en: 'Vision Testing', am: 'የእይታ ሙከራ' },
      { en: 'Dilated Eye Exams', am: 'የተስፋፋ የዓይን ምርመራ' },
      { en: 'Eye Pressure Screening', am: 'የዓይን ጫና ምርመራ' },
      { en: 'Retinal Photography', am: 'የሬቲና ፎቶግራፊ' }
    ] as any,
    head: { en: 'Dr. Sarah Mitchell', am: 'ዶ/ር ሳራ ሚቺል' } as any
  },
  {
    id: '2',
    name: { en: 'LASIK & Refractive Surgery', am: 'ሌዚክ እና ሪፍራክቲቭ ቀዶ ጥገና' } as any,
    description: { en: 'Advanced laser vision correction procedures to reduce dependence on glasses and contact lenses.', am: 'ከመነጽር እና ከኮንታክት ሌንስ ጥገኝነት ለመቀነስ የሌዘር እይታ ማስተካከያ ሂደቶች።' } as any,
    image: 'https://images.pexels.com/photos/5752270/pexels-photo-5752270.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      { en: 'LASIK Surgery', am: 'ሌዚክ ቀዶ ጥገና' },
      { en: 'PRK Surgery', am: 'ፒአርኬ ቀዶ ጥገና' },
      { en: 'ICL Implants', am: 'ICL ኢምፕላንት' },
      { en: 'Astigmatism Correction', am: 'አስቲግማቲዝም ማስተካከያ' }
    ] as any,
    head: { en: 'Dr. Michael Chen', am: 'ዶ/ር ማይክል ቼን' } as any
  },
  {
    id: '3',
    name: { en: 'Retinal Services', am: 'የሬቲና አገልግሎቶች' } as any,
    description: { en: 'Specialized care for retinal conditions including diabetic retinopathy, macular degeneration, and retinal detachment.', am: 'ለሬቲና ህመሞች የተለየ እንክብካቤ፣ ድድብ ስኳር ሬቲኖፓቲ፣ ማኩላር እንጥረት እና ሬቲና መለያየት ጨምሮ።' } as any,
    image: 'https://images.pexels.com/photos/5752251/pexels-photo-5752251.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      { en: 'Diabetic Eye Care', am: 'የድድብ ስኳር የዓይን እንክብካቤ' },
      { en: 'Macular Degeneration Treatment', am: 'የማኩላር እንጥረት ሕክምና' },
      { en: 'Retinal Injections', am: 'የሬቲና ኢንጀክሽኖች' },
      { en: 'Vitrectomy Surgery', am: 'ቪትሬክቶሚ ቀዶ ጥገና' }
    ] as any,
    head: { en: 'Dr. Sarah Mitchell', am: 'ዶ/ር ሳራ ሚቺል' } as any
  },
  {
    id: '4',
    name: { en: 'Pediatric Eye Care', am: 'የህፃናት የዓይን እንክብካቤ' } as any,
    description: { en: 'Comprehensive eye care for children including vision screening, amblyopia treatment, and pediatric eye surgery.', am: 'ለህፃናት የሙሉ የዓይን እንክብካቤ፣ የእይታ ስክሪኒንግ፣ አምብሊዮፒያ ሕክምና እና የህፃናት የዓይን ቀዶ ጥገና ጨምሮ።' } as any,
    image: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      { en: "Children's Eye Exams", am: 'የህፃናት የዓይን ምርመራ' },
      { en: 'Amblyopia Treatment', am: 'አምብሊዮፒያ ሕክምና' },
      { en: 'Strabismus Surgery', am: 'ስትራቢስሙስ ቀዶ ጥገና' },
      { en: 'Vision Therapy', am: 'የእይታ ሕክምና' }
    ] as any,
    head: { en: 'Dr. Emily Rodriguez', am: 'ዶ/ር ኤሚሊ ሮድሪጌዝ' } as any
  },
  {
    id: '5',
    name: { en: 'Glaucoma Treatment', am: 'የግላኮማ ሕክምና' } as any,
    description: { en: 'Advanced glaucoma diagnosis and treatment including medical therapy and minimally invasive surgical options.', am: 'የግላኮማ ምርመራ እና ሕክምና ፣ መድሃኒት ሕክምና እና በትንሽ መግባት የሚፈጽሙ ቀዶ ጥገናዎች ጨምሮ።' } as any,
    image: 'https://images.pexels.com/photos/5752265/pexels-photo-5752265.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      { en: 'Glaucoma Screening', am: 'የግላኮማ ስክሪኒንግ' },
      { en: 'Visual Field Testing', am: 'የእይታ መስክ ሙከራ' },
      { en: 'MIGS Procedures', am: 'MIGS ሂደቶች' },
      { en: 'Trabeculectomy', am: 'ትራቤኩሌክቶሚ' }
    ] as any,
    head: { en: 'Dr. James Thompson', am: 'ዶ/ር ጄምስ ቶምፕሰን' } as any
  },
  {
    id: '6',
    name: { en: 'Comprehensive Eye Exams', am: 'በሙሉ የዓይን ምርመራ' } as any,
    description: { en: 'Complete eye health evaluations including vision testing, eye pressure checks, and retinal examinations.', am: 'የእይታ መርማሪያ፣ የዓይን ጫና ምርመራ እና የሬቲና ምርመራ ጨምሮ ሙሉ የዓይን ጤና ግምገማዎች።' } as any,
    image: 'https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      { en: 'Vision Testing', am: 'የእይታ ሙከራ' },
      { en: 'Dilated Eye Exams', am: 'የተስፋፋ የዓይን ምርመራ' },
      { en: 'Eye Pressure Screening', am: 'የዓይን ጫና ምርመራ' },
      { en: 'Retinal Photography', am: 'የሬቲና ፎቶግራፊ' }
    ] as any,
    head: { en: 'Dr. Sarah Mitchell', am: 'ዶ/ር ሳራ ሚቺል' } as any
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: { en: 'How often should I have an eye exam?', am: 'ምን ያህል በየጊዜው የዓይን ምርመራ ልላቀር?' } as any,
    answer: { en: 'Adults should have comprehensive eye exams every 1-2 years, or annually if you have risk factors like diabetes, high blood pressure, or family history of eye disease. Children should have their first eye exam by age 1, then at age 3, and before starting school.', am: 'ወደ አንድ እስከ ሁለት ዓመት ድረስ አንድ ጊዜ የሚደረጉ ሙሉ የዓይን ምርመራዎች ይኖሩት። የስኳር በሽታ፣ ከፍተኛ የደም ግፊት ወይም በቤተሰብ የዓይን ችግኝ ተሞክሮ ካለ በየአመቱ ይመረመሩ። ህፃናት የመጀመሪያ ምርመራቸውን በ1 ዓመት፣ ከዚያም በ3 ዓመት እና ት/ቤት ከጀመሩ በፊት ያድርጉ።' } as any,
    category: 'General'
  },
  {
    id: '2',
    question: { en: 'Am I a candidate for LASIK surgery?', am: 'ለሌዚክ ቀዶ ጥገና ተስማሚ ነኝ?' } as any,
    answer: { en: 'LASIK candidacy depends on several factors including age (18+), stable prescription for at least one year, adequate corneal thickness, and overall eye health. We offer free LASIK consultations to determine if you\'re a good candidate.', am: 'ለሌዚክ ቀዶ ጥገና መቀበል በእድሜ (18+)፣ ቢያንስ ለአንድ ዓመት የቆመ መድሀኒት መጠቀም፣ በቂ የኮርኒያ ብዛት እና ጠቃሚ የዓይን ጤና ይወሰናል። ተስማሚ መሆንዎን ለመወሰን ነጻ የሌዚክ ምክር እናቀርባለን።' } as any,
    category: 'LASIK'
  },
  {
    id: '3',
    question: { en: 'What should I expect during a comprehensive eye exam?', am: 'በሙሉ የዓይን ምርመራ ጊዜ ምን እጠብቃለሁ?' } as any,
    answer: { en: 'A comprehensive eye exam includes vision testing, eye pressure measurement, pupil dilation, and examination of the retina and optic nerve. The exam typically takes 60-90 minutes, and you may experience blurred vision for 2-4 hours after dilation.', am: 'ሙሉ የዓይን ምርመራ የእይታ መርማሪያ፣ የዓይን ጫና መለኪያ፣ ተማሪ ተስፋፋ እና የሬቲና እና የኦፕቲክ ነርቭ ምርመራን ያካትታል። እንደ መደበኛ ምርመራው 60-90 ደቂቃ ይፈጅማል እና ከመስፋፋት በኋላ ለ2-4 ሰዓታት የተዳከመ እይታ ሊኖርዎ ይችላል።' } as any,
    category: 'Exams'
  },
  {
    id: '4',
    question: { en: 'Do you accept my insurance?', am: 'የእኔን ኢንሹራንስ ታቀበላችሁ?' } as any,
    answer: { en: 'We accept most major vision and medical insurance plans including VSP, EyeMed, Davis Vision, and Medicare. Please contact our office to verify your specific coverage and benefits.', am: 'VSP፣ EyeMed፣ Davis Vision እና Medicare ጨምሮ አብዛኛውን የእይታ እና የሕክምና ኢንሹራንስ ዕቅዶችን እንቀበላለን። ልዩ ጥቅሞችዎን ለማረጋገጥ እባኮትን ከቢሮአችን ያግኙን።' } as any,
    category: 'Insurance'
  },
  {
    id: '5',
    question: { en: 'What are the symptoms of glaucoma?', am: 'የግላኮማ ምልክቶች ምንድናቸው?' } as any,
    answer: { en: 'Early glaucoma often has no symptoms, which is why regular eye exams are crucial. Advanced glaucoma may cause peripheral vision loss, tunnel vision, eye pain, headaches, or seeing halos around lights.', am: 'ግላኮማ በመጀመሪያ ደረጃ ምንም ምልክት አይኖረውም ስለዚህ መደበኛ የዓይን ምርመራ አስፈላጊ ነው። የተራቀቀ ግላኮማ የጎን እይታ መቀነስ፣ ቱናል እይታ፣ የዓይን ህመም፣ ራስ ምታት ወይም ከመብራቶች ላይ ሄሎዎች ማየት ሊያስከትል ይችላል።' } as any,
    category: 'Conditions'
  },
  {
    id: '6',
    question: { en: 'How do I prepare for cataract surgery?', am: 'ለካታራክት ቀዶ ጥገና እንዴት እገናኛለሁ?' } as any,
    answer: { en: 'Before cataract surgery, you\'ll need a pre-operative exam, measurements for your intraocular lens, and instructions about medications. Arrange for transportation as you cannot drive immediately after surgery.', am: 'ከካታራክት ቀዶ ጥገና በፊት የቀዶ ጥገና ቅድመ ምርመራ፣ ለውስጣዊ ዓይን ሌንስዎ መለኪያዎች እና ስለመድሃኒቶች መመሪያዎች ያስፈልግዎታል። ከቀዶ ጥገና በኋላ ወዲያውኑ መንዳት አልችሉም ስለዚህ መጓጓዣ ያዘጋጁ።' } as any,
    category: 'Surgery'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    patientName: { en: 'Jennifer Adams', am: 'ጀኒፈር አዳምስ' } as any,
    rating: 5,
    review: {
      en: 'Dr. Mitchell performed my retinal surgery with incredible skill. My vision has improved dramatically, and the care I received was exceptional throughout the entire process.',
      am: 'ዶ/ር ሚቺል የሬቲና ቀዶ ጥገናዬን በግልጽ ችሎታ አከናወነልኝ። እይታዬ በእጅጉ ተሻሽሏል እና በመርሀ ግብሩ ሙሉ የተቀበልኩት እንክብካቤ ልዩ ነበር።'
    } as any,
    date: '2024-01-15',
    treatment: { en: 'Retinal Surgery', am: 'የሬቲና ቀዶ ጥገና' } as any
  },
  {
    id: '2',
    patientName: { en: 'Robert Kim', am: 'ሮበርት ኪም' } as any,
    rating: 5,
    review: {
      en: 'LASIK with Dr. Chen was life-changing! I went from thick glasses to 20/20 vision. The procedure was quick and painless, and the results exceeded my expectations.',
      am: 'ከዶ/ር ቼን ጋር LASIK ህይወቴን ቀየረ! ከወፍራም መነጽር ወደ 20/20 እይታ ሄጥሁ። ሂደቱ ፈጣን እና ያልተሠቃየ ነበር፣ ውጤቱም ከምኞቴ ይልቅ ነበር።'
    } as any,
    date: '2024-01-10',
    treatment: { en: 'LASIK Surgery', am: 'ሌዚክ ቀዶ ጥገና' } as any
  },
  {
    id: '3',
    patientName: { en: 'Maria Santos', am: 'ማሪያ ሳንቶስ' } as any,
    rating: 5,
    review: {
      en: 'Dr. Rodriguez is wonderful with children. My daughter was nervous about her eye exam, but Dr. Rodriguez made her feel comfortable and explained everything in kid-friendly terms.',
      am: 'ዶ/ር ሮድሪጌዝ ከህፃናት ጋር በጣም ጥሩ ነው። ልጄ ስለ ዓይን ምርመራዋ ተጨንቃ ነበር፣ ነገር ግን ዶ/ር ሮድሪጌዝ እርግጠኛ አደረጋት እና ሁሉንም በልጆች የሚገባ መንገድ ተረዳታት።'
    } as any,
    date: '2024-01-05',
    treatment: { en: 'Pediatric Eye Care', am: 'የህፃናት የዓይን እንክብካቤ' } as any
  },
  {
    id: '4',
    patientName: { en: 'Jennifer Adams', am: 'ጀኒፈር አዳምስ' } as any,
    rating: 5,
    review: {
      en: 'Dr. Mitchell performed my retinal surgery with incredible skill. My vision has improved dramatically, and the care I received was exceptional throughout the entire process.',
      am: 'ዶ/ር ሚቺል የሬቲና ቀዶ ጥገናዬን በግልጽ ችሎታ አከናወነልኝ። እይታዬ በእጅጉ ተሻሽሏል እና በመርሀ ግብሩ ሙሉ የተቀበልኩት እንክብካቤ ልዩ ነበር።'
    } as any,
    date: '2024-01-15',
    treatment: { en: 'Retinal Surgery', am: 'የሬቲና ቀዶ ጥገና' } as any
  },
  {
    id: '5',
    patientName: { en: 'Robert Kim', am: 'ሮበርት ኪም' } as any,
    rating: 5,
    review: {
      en: 'LASIK with Dr. Chen was life-changing! I went from thick glasses to 20/20 vision. The procedure was quick and painless, and the results exceeded my expectations.',
      am: 'ከዶ/ር ቼን ጋር LASIK ህይወቴን ቀየረ! ከወፍራም መነጽር ወደ 20/20 እይታ ሄጥሁ። ሂደቱ ፈጣን እና ያልተሠቃየ ነበር፣ ውጤቱም ከምኞቴ ይልቅ ነበር።'
    } as any,
    date: '2024-01-10',
    treatment: { en: 'LASIK Surgery', am: 'ሌዚክ ቀዶ ጥገና' } as any
  },
  {
    id: '6',
    patientName: { en: 'Maria Santos', am: 'ማሪያ ሳንቶስ' } as any,
    rating: 5,
    review: {
      en: 'Dr. Rodriguez is wonderful with children. My daughter was nervous about her eye exam, but Dr. Rodriguez made her feel comfortable and explained everything in kid-friendly terms.',
      am: 'ዶ/ር ሮድሪጌዝ ከህፃናት ጋር በጣም ጥሩ ነው። ልጄ ስለ ዓይን ምርመራዋ ተጨንቃ ነበር፣ ነገር ግን ዶ/ር ሮድሪጌዝ እርግጠኛ አደረጋት እና ሁሉንም በልጆች የሚገባ መንገድ ተረዳታት።'
    } as any,
    date: '2024-01-05',
    treatment: { en: 'Pediatric Eye Care', am: 'የህፃናት የዓይን እንክብካቤ' } as any
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
  },
  {
    id: '6',
    title: 'Diabetic Eye Disease Awareness Month',
    description: 'Free diabetic eye screenings and educational seminars about preventing vision loss from diabetes.',
    date: '2024-02-14',
    time: '09:00',
    type: 'awareness',
    image: 'https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Main Eye Care Center'
  }
];