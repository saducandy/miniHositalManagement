import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Language = "en" | "am";

type TranslationValue = string | string[];
type Translations = Record<string, Record<Language, TranslationValue>>;

const translations: Translations = {
  "brand.name": {
    en: "Bahir Dar Specality Eye Care Center",
    am: "ባሕር ዳር ልዩ የዓይን ህክምና ማዕከል",
  },
  "brand.tagline": { en: "Vision Excellence", am: "የእይታ ብቃት" },
  "nav.home": { en: "Home", am: "መነሻ" },
  "nav.services": { en: "Services", am: "አገልግሎቶች" },
  "nav.doctors": { en: "Doctors", am: "ዶክተሮች" },
  "nav.appointments": { en: "Appointments", am: "ቀጠሮዎች" },
  "nav.events": { en: "Events", am: "ክስተቶች" },
  "nav.contact": { en: "Contact", am: "አግኙን" },
  "nav.admin": { en: "Admin", am: "አስተዳዳሪ" },
  "cta.book": { en: "Book Appointment", am: "ቀጠሮ ይያዙ" },
  "accessibility.fontSize": { en: "Font Size:", am: "የፊደል መጠን:" },
  "accessibility.contrast": { en: "Contrast", am: "ኮንትራስት" },
  // About Us - Our Story
  "story.intro.title": { en: "About BDSEC", am: "ስለ BDSEC" },
  "story.intro.body": {
    en: "BDSEC is a newly opened, state-of-the-art specialty eye hospital located in Bahir Dar. We offer a full range of advanced and affordable eye care services for all age groups, from children to seniors, delivered by a team of expert ophthalmologists, optometrists, ophthalmic nurses, and trained eye care professionals.",
    am: "BDSEC በባህር ዳር የሚገኝ አዲስ የተከፈተ እና ዘመናዊ የሆነ የልዩ የአይን ህክምና ሆስፒታል ነው። ከልጆች እስከ አረጋውያን ድረስ ለሁሉም የዕድሜ ክልሎች የተሟላ እና ተመጣጣኝ የአይን ህክምና አገልግሎቶችን እናቀርባለን፤ ይህም በባለሙያ የዓይን ህክምና ባለሙያዎች፣ ኦፕቶሜትሪስቶች፣ የዓይን ነርሶች እና የሰለጠኑ የአይን እንክብካቤ ባለሙያዎች ቡድን ይሰጣል።",
  },
  // About Us - Staff
  "staff.hero.heading": { en: "Our Staff", am: "ሰራተኞቻችን" },
  "staff.hero.subtitle": {
    en: "Meet the dedicated team behind BDSEC — committed to quality eye care.",
    am: "በBDSEC የጥራት የዓይን እንክብካቤ አገልግሎት ለመስጠት የተሰማሩ ባለሙያዎችን ይወቁ።",
  },
  "staff.loading": { en: "Loading staff...", am: "ሰራተኞችን በመጫን ላይ..." },
  "staff.error": { en: "Failed to load staff", am: "ሰራተኞችን መጫን አልተሳካም" },
  "staff.empty": { en: "No staff information found.", am: "የሰራተኞች መረጃ አልተገኘም።" },
  "staff.category.staffCount": { en: "Staff", am: "ሰራተኞች" },
  "staff.category.untitled": { en: "Staff Category", am: "የሰራተኞች ምድብ" },
  "staff.member.unknown": { en: "Unknown", am: "ያልታወቀ" },
  // Hero
  "hero.title1": { en: "Your Vision, Our", am: "ለእርስዎ እይታ ፣ የእኛ" },
  "hero.title2": { en: "Excellence", am: "ከፍተኛ ብቃት" },
  "hero.subtitle": {
    en: "Experience exceptional eye care with our team of specialized ophthalmologists. Book appointments online, access your vision records, and get the expert care your eyes deserve.",
    am: "በልምድ ያለ የዓይን ሐኪሞች ቡድን ጋር ልዩ የዓይን እንክብካቤን ያግኙ። ቀጠሮ በመጀመር እና የእይታ መዝገቦትን በመዳሰስ ባለሙያ እንክብካቤ ይቀበሉ።",
  },
  "hero.learnMore": { en: "Learn More", am: "ተጨማሪ ይመልከቱ" },
  "hero.stats.patientsServed": { en: "Patients Served", am: "የተስተናገዱ ታካሚዎች" },
  "hero.stats.yearsExperience": { en: "Years Experience", am: "የልምድ ዓመታት" },
  "hero.stats.successRate": { en: "Success Rate", am: "የስኬት መጠን" },
  "hero.stats.surgeriesPerformed": {
    en: "Surgeries Performed",
    am: "የተከናወኑ ቀዶ ጥገናዎች",
  },
  // Home services preview
  "home.services.heading": {
    en: "Our Eye Care Services",
    am: "የእኛ የዓይን እንክብካቤ አገልግሎቶች",
  },
  "home.services.subtitle": {
    en: "We provide comprehensive eye care services with state-of-the-art technology and experienced ophthalmologists dedicated to your vision health.",
    am: "ለእይታዎ ጤና የተሟላ እንክብካቤን በዘመናዊ ቴክኖሎጂ እና በልምድ ያላቸው የዓይን ሐኪሞች እናቀርባለን።",
  },
  "home.services.viewAll": {
    en: "View All Services",
    am: "ሁሉንም አገልግሎቶች ይመልከቱ",
  },
  // Home testimonials
  "home.testimonials.heading": {
    en: "What Our Patients Say",
    am: "የታካሚዎቻችን ማስታወሻ",
  },
  "home.testimonials.subtitle": {
    en: "Real stories from real patients about their eye care experience",
    am: "ስለ የዓይን እንክብካቤ ልምዳቸው ከእውነተኛ ታካሚዎች የሚነገሩ ታሪኮች",
  },
  // Home FAQ
  "home.faq.heading": { en: "Frequently Asked Questions", am: "ተደጋጋሚ ጥያቄዎች" },
  "home.faq.subtitle": {
    en: "Find answers to common questions about our services",
    am: "ስለ አገልግሎቶቻችን የተለመዱ ጥያቄዎችን መልስ ያግኙ",
  },
  // Home CTA
  "home.cta.heading": {
    en: "Ready to Take Control of Your Vision?",
    am: "የእይታዎን ጥራት ለመሻሻል ዝግጁ ነዎት?",
  },
  "home.cta.subtitle": {
    en: "Please contact us using the contact form from the contact page.",
    am: "እኛን ለማግኘት እባካችሁ የግንኙነት ገፁን ተጠቀሙ!",
  },
  "home.cta.button": { en: "To Contact Page", am: "ወደ የግንኙነት ገፅ" },
  // Doctors page
  "doctors.hero.heading": {
    en: "Meet Our Expert Ophthalmologists",
    am: "ከባለሙያ የዓይን ሐኪሞቻችን ጋር ይገናኙ",
  },
  "doctors.hero.subtitle": {
    en: "Our team of board-certified ophthalmologists and eye care specialists are dedicated to providing exceptional vision care with compassion and expertise",
    am: "የቦርድ የተረጋገጡ የዓይን ሐኪሞች እና የዓይን እንክብካቤ ባለሙያዎች ቡድናችን በሩህነት እና በብልጥነት ልዩ የእይታ እንክብካቤ ለመስጠት ተሰናክሏል",
  },
  "doctors.loading": { en: "Loading doctors...", am: "ዶክተሮችን በመጫን ላይ..." },
  "doctors.error": { en: "Failed to load doctors", am: "ዶክተሮችን መጫን አልተሳካም" },
  "doctors.available": { en: "Available for appointments", am: "ለቀጠሮ ይገኛሉ" },
  "doctors.unavailable": { en: "Currently unavailable", am: "በአሁኑ ጊዜ አይገኙም" },
  "doctors.qualifications": { en: "Qualifications:", am: "ብቃት ማረጋገጫዎች፦" },
  "doctors.book": { en: "Book Appointment", am: "ቀጠሮ ይያዙ" },
  "doctors.years": { en: "Years of Experience", am: "የሥራ ልምድ ዓመታት" },
  "doctors.why.heading": {
    en: "Why Choose Our Ophthalmologists?",
    am: "ለምን የእኛን የዓይን ሐኪሞች ይምረጡ?",
  },
  "doctors.why.card1.title": { en: "Board Certified", am: "በቦርድ የተረጋገጡ" },
  "doctors.why.card1.desc": {
    en: "All our doctors are board-certified ophthalmologists",
    am: "ሁሉም ዶክተሮቻችን በቦርድ የተረጋገጡ የዓይን ሐኪሞች ናቸው",
  },
  "doctors.why.card2.title": { en: "Flexible Hours", am: "ተስማሚ ሰዓታት" },
  "doctors.why.card2.desc": {
    en: "Extended hours including evenings and weekends",
    am: "ከማታ እና ከሳምንት መጨረሻ ጨምሮ የተራዘመ ሰዓት",
  },
  "doctors.why.card3.title": { en: "Patient Focused", am: "ታካሚ መመሪያ" },
  "doctors.why.card3.desc": {
    en: "Personalized eye care tailored to your unique vision needs",
    am: "ለልዩ የእይታ ፍላጎቶችዎ የተስተካከለ የዓይን እንክብካቤ",
  },
  "doctors.why.card4.title": { en: "Easy Scheduling", am: "ቀላል መያዣ" },
  "doctors.why.card4.desc": {
    en: "Online booking system available 24/7",
    am: "24/7 የመስመር ላይ የቀጠሮ ስርዓት ዝግጁ ነው",
  },
  // Home services items
  "home.services.item.exam.title": {
    en: "Comprehensive Eye Exams",
    am: "በሙሉ የዓይን ምርመራ",
  },
  "home.services.item.exam.desc": {
    en: "Complete eye health evaluations with advanced diagnostic technology.",
    am: "በዘመናዊ መመርመሪያ ቴክኖሎጂ ሙሉ የዓይን ጤና ግምገማዎች።",
  },
  "home.services.item.lasik.title": { en: "LASIK Surgery", am: "ሌዚክ ቀዶ ጥገና" },
  "home.services.item.lasik.desc": {
    en: "Advanced laser vision correction for freedom from glasses and contacts.",
    am: "ከመነጽር እና ከኮንታክት ሌንስ ነፃነት የሚሰጥ የሌዘር እይታ ማስተካከያ።",
  },
  "home.services.item.retina.title": { en: "Retinal Care", am: "የሬቲና እንክብካቤ" },
  "home.services.item.retina.desc": {
    en: "Specialized treatment for diabetic retinopathy and macular degeneration.",
    am: "ለድድብ ስኳር ሬቲኖፓቲ እና ማኩላር እንጥረት ልዩ ሕክምና።",
  },
  "home.services.item.pediatric.title": {
    en: "Pediatric Eye Care",
    am: "የህፃናት የዓይን እንክብካቤ",
  },
  "home.services.item.pediatric.desc": {
    en: "Specialized eye care for children from infancy through adolescence.",
    am: "ከሕፃናትነት እስከ ወጣትነት ልጆች ልዩ የዓይን እንክብካቤ።",
  },
  // Appointment booking
  "appt.title": { en: "Book an Appointment", am: "ቀጠሮ ይያዙ" },
  "appt.subtitle": {
    en: "Schedule your visit with our healthcare professionals",
    am: "ጉብኝትዎን ከየጤና ባለሙያዎቻችን ጋር ያቀናብሩ",
  },
  "appt.step1": { en: "Select Doctor", am: "ዶክተር ይምረጡ" },
  "appt.step2": { en: "Choose Date & Time", am: "ቀን እና ሰዓት ይምረጡ" },
  "appt.step3": { en: "Personal Details", am: "የግል ዝርዝሮች" },
  "appt.step4": { en: "Confirmation", am: "ማረጋገጫ" },
  "appt.selectDoctorHeading": { en: "Select a Doctor", am: "ዶክተር ይምረጡ" },
  "appt.chooseDateTimeHeading": {
    en: "Choose Date & Time",
    am: "ቀን እና ሰዓት ይምረጡ",
  },
  "appt.selectDate": { en: "Select Date", am: "ቀን ይምረጡ" },
  "appt.selectTime": { en: "Select Time", am: "ሰዓት ይምረጡ" },
  "appt.personalDetails": { en: "Personal Details", am: "የግል መረጃ" },
  "appt.fullName": { en: "Full Name", am: "ሙሉ ስም" },
  "appt.email": { en: "Email Address", am: "ኢሜይል አድራሻ" },
  "appt.phone": { en: "Phone Number", am: "ስልክ ቁጥር" },
  "appt.reason": { en: "Reason for Visit", am: "ምክንያት" },
  "appt.notes": { en: "Additional Notes (Optional)", am: "ተጨማሪ ማስታወሻ (አማራጭ)" },
  "appt.prev": { en: "Previous", am: "ከዚህ በፊት" },
  "appt.next": { en: "Next", am: "ቀጣይ" },
  "appt.review": { en: "Review", am: "እይታ" },
  "appt.confirm": { en: "Confirm Appointment", am: "ቀጠሮውን ያረጋግጡ" },
  "appt.available": { en: "Available for appointments", am: "ለቀጠሮ ተዘጋጅቷል" },
  "appt.unavailable": { en: "Currently unavailable", am: "በአሁኑ ጊዜ አይገኝም" },
  "appt.qualifications": { en: "Qualifications:", am: "ብቃት ማረጋገጫዎች:" },
  "appt.selectReason": { en: "Select reason", am: "ምክንያት ይምረጡ" },
  // Services
  "services.bookConsult": { en: "contact us", am: "ያግኙን" },
  // Services page
  "services.hero.heading": {
    en: "Our Eye Care Services",
    am: "የእኛ የዓይን እንክብካቤ አገልግሎቶች",
  },
  "services.hero.subtitle": {
    en: "Comprehensive eye care services delivered by our expert ophthalmologists using state-of-the-art technology",
    am: "በዘመናዊ ቴክኖሎጂ እና በባለሙያ የዓይን ሐኪሞች የሚሰጡ ሙሉ የዓይን እንክብካቤ አገልግሎቶች",
  },
  "services.include": { en: "Services Include:", am: "አገልግሎቶች የሚካተቱት፦" },
  "services.seeMore": { en: "See more", am: "ተጨማሪ ይመልከቱ" },
  "services.seeLess": { en: "See less", am: "ያስደብሩ" },
  "services.headLabel": { en: "Department Head:", am: "የክፍሉ ሃላፊ፦" },
  "services.cta.heading": {
    en: "Come and experience the difference in quality eye care at BDSEC!",
    am: "በBDSEC የአይን እንክብካቤ ጥራት ያለውን ልዩነት ይምጡና ይመልከቱ!",
  },
  "services.cta.subtitle": {
    en: "Book your eye exam today and take the first step towards better vision",
    am: "ዛሬ የዓይን ምርመራዎን ያስይዙ እና ወደ የተሻለ እይታ ጀርባ የመጀመሪያውን እርምጃ ውሰዱ",
  },
  "services.cta.bookAppt": { en: "Book Appointment", am: "ቀጠሮ ይያዙ" },
  "services.cta.contact": { en: "Contact Us", am: "ያግኙን" },
  // Services additional features
  "services.features.heading": {
    en: "Why Choose Our Services?",
    am: "አገልግሎቶቻችንን ለምን መምረጥ አለብዎት?",
  },
  "services.features.subheading": {
    en: "Why Choose BDSEC?",
    am: "BDSECን ለምን መምረጥ አለብዎት?",
  },
  "services.features.tech.title": {
    en: "Advanced technology at affordable prices;",
    am: "በተመጣጣኝ ዋጋ የላቀ ቴክኖሎጂ፤",
  },
  "services.features.tech.items": {
    en: [
      "Advanced operating microscope",
      "OCT",
      "Laser",
      "Ocular ultrasound (A-B scan ultrasound)",
      "Humphrey Visual field analyzer",
      "Autorefractor",
      "IOL Master, and",
      "phacoemulsification machine.",
    ],
    am: [
      "የላቀ የአሠራር ማይክሮስኮፕ",
      "ኦክቶበር፣",
      "ሌዘር፣",
      "የአይን አልትራሳውንድ (ኤ-ቢ ስካን አልትራሳውንድ)፣",
      "ሃምፍሬይ ቪዥዋል ፊልድ ተንታኝ፣",
      "አውቶሪፍራክተር",
      "IOL ማስተር፣ እና",
      "ፋኮኢሙልሲፊኬሽን ማሽን።",
    ],
  },
  "services.features.optical": {
    en: "Optical shop with high-quality and affordable glasses",
    am: "ከፍተኛ ጥራት ያለው እና ተመጣጣኝ መነጽር ያለው የኦፕቲካል ሱቅ",
  },
  "services.features.environment": {
    en: "A clean, welcoming, and safe environment, and Patient-centered care with dignity and respect",
    am: "ንጹህ፣ እንግዳ ተቀባይ እና ደህንነቱ የተጠበቀ አካባቢ፣ እና በታካሚ ላይ ያተኮረ እንክብካቤ በክብር እና በአክብሮት",
  },
  "services.features.vip": {
    en: "VIP rooms with your families",
    am: "ከቤተሰቦችዎ ጋር የቪአይፒ ክፍሎች",
  },
  "services.features.professionals": {
    en: "Experienced eye care professionals and advanced diagnostic techniques",
    am: "ልምድ ያላቸው የአይን እንክብካቤ ባለሙያዎች እና የላቁ የምርመራ ቴክኒኮች",
  },
  "services.features.expert.title": { en: "Expert Care", am: "ባለሙያ እንክብካቤ" },
  "services.features.expert.desc": {
    en: "Experienced eye care professionals with years of experience in specialized eye care",
    am: "በልዩ የዓይን እንክብካቤ ልምድ ያላቸው የቦርድ የተረጋገጡ የዓይን ሐኪሞች",
  },
  "services.features.expert.items": {
    en: [
      "Skilled ophthalmologists with years of clinical and surgical experience",
      "Dedicated optometrists for accurate refraction and follow-up",
      "Compassionate nursing and support staff",
    ],
    am: [
      "በክሊኒካል እና በቀዶ ጥገና ልምድ ያላቸው ባለሙያ የዓይን ሐኪሞች",
      "ለትክክለኛ ሪፍራክሽን እና ክትትል የተመደቡ ኦፕቶሜትሪስቶች",
      "ርኅራኄ ያላቸው ነርስ እና የድጋፍ ሰራተኞች",
    ],
  },
  "services.features.hours.title": { en: "Extended Hours", am: "የተራዘመ ሰዓት" },
  "services.features.hours.desc": {
    en: "Extended hours including evenings and weekends for your convenience",
    am: "ለእርስዎ ምቹነት የሚያመቻች ከማታና ከሳምንት መጨረሻዎች ጨምሮ የተራዘመ ሰዓት",
  },
  "services.features.hours.items": {
    en: [
      "Working Hours: Monday to Friday | (8:00 AM – 5:00 PM)",
      "For emergencies 7 days / 24 hours",
    ],
    am: ["የስራ ሰዓት: ከሰኞ እስከ ዓርብ ከ2፡00 እስከ 11፡00", "ለድንገተኛ 7 ቀን 24 ሰዓት"],
  },
  "services.features.location.title": {
    en: "Convenient Location",
    am: "ምቹ ቦታ",
  },
  "services.features.location.desc": {
    en: "Easily accessible location with ample parking and public transportation options",
    am: "በቀላሉ ሊደረስ የሚችል ቦታ በበቂ የመኪና ማቆሚያ እና የመንገድ አገልግሎት አማራጮች",
  },
  "services.features.location.items": {
    en: [
      "Visit Us at: Bahir Dar Specialty Eye Center",
      'Located in between Bahir Dar airline station and "Geter Menged"',
      "Call: Insert Phone Number",
      "Email: Insert Email Address",
    ],
    am: [
      "ይጎብኙን: ባሕር ዳር ልዩ የዓይን ህክምና ማዕከል",
      "በባሕር ዳር አየር ማረፊያ እና በገጠር መንገድ መካከል እንገኛለን",
      "ይደውሉ: Insert Phone Number",
      "ኢሜል: Insert Email Address",
    ],
  },
  // Services: who can benefit
  "services.benefit.heading": {
    en: "Who Can Benefit Our Services?",
    am: "አገልግሎታችንን ማን ሊጠቅም ይችላል?",
  },
  // Events page
  "events.hero.title": {
    en: "Eye Health Events & Programs",
    am: "የዓይን ጤና ክስተቶች እና ፕሮግራሞች",
  },
  "events.hero.subtitle": {
    en: "Join our community eye health initiatives, educational workshops, and vision wellness programs designed to promote better eye health for everyone",
    am: "ለሁሉም የተሻለ የዓይን ጤና ለማበረታታት የሚያገለግሉ የማህበረሰብ የዓይን ጤና የተነሳ ተግባራት፣ የትምህርት ስልጠናዎች እና የእይታ ደህንነት ፕሮግራሞች ይተባበሩ",
  },
  "events.loading": { en: "Loading events...", am: "ክስተቶችን በመጫን ላይ..." },
  "events.error": { en: "Failed to load events", am: "ክስተቶችን መጫን አልተሳካም" },
  "events.card.register": { en: "Register Now", am: "አሁን ይመዝገቡ" },
  "events.card.learnMore": { en: "Learn More", am: "ዝርዝር ይመልከቱ" },
  // Newsletter
  "events.newsletter.title": {
    en: "Stay Updated on Eye Health Events",
    am: "ስለ የዓይን ጤና ክስተቶች ዘመናዊ ይሁኑ",
  },
  "events.newsletter.subtitle": {
    en: "Subscribe to our newsletter to receive updates on upcoming eye health events, workshops, and community programs",
    am: "ስለ የሚመጡ የዓይን ጤና ክስተቶች፣ የስልጠና ድርሰቶች እና የማህበረሰብ ፕሮግራሞች እዘል ለመቀበል ወረቀት መልዕክታችንን ይመዝገቡ",
  },
  "events.newsletter.placeholder": {
    en: "Enter your email address",
    am: "ኢሜይል አድራሻዎን ያስገቡ",
  },
  "events.newsletter.subscribe": { en: "Subscribe", am: "ይመዝገቡ" },
  "events.newsletter.subscribing": { en: "Subscribing...", am: "በመመዝገብ ላይ..." },
  "events.newsletter.success": {
    en: "Successfully subscribed to our newsletter!",
    am: "ወደ ወረቀት መልዕክታችን በሚገባ ተመዝግበዋል!",
  },
  "events.newsletter.alreadySubscribed": {
    en: "This email is already subscribed to our newsletter.",
    am: "ይህ ኢሜይል አስቀድሞ ተመዝግቧል።",
  },
  // Categories showcase
  "events.categories.heading": {
    en: "Types of Events We Offer",
    am: "የምንሰጣቸው የክስተት አይነቶች",
  },
  "events.categories.subheading": {
    en: "Various programs designed to meet different eye health and vision wellness needs",
    am: "ለተለያዩ የዓይን ጤና እና የእይታ ደህንነት ፍላጎቶች የተዘጋጀ ተለያዩ ፕሮግራሞች",
  },
  "events.categories.awareness.title": {
    en: "Awareness Campaigns",
    am: "የእውቀት ዘመቻዎች",
  },
  "events.categories.awareness.desc": {
    en: "Educational programs focused on specific eye conditions and vision prevention strategies",
    am: "በተወሰኑ የዓይን ህመሞች እና በመከላከል ስትራቴጂዎች ላይ የተመረኮዘ የትምህርት ፕሮግራሞች",
  },
  "events.categories.community.title": {
    en: "Community Campaigns",
    am: "የማህበረሰብ ዘመቻዎች",
  },
  "events.categories.community.desc": {
    en: "Community-wide eye health initiatives and workshops promoting vision wellness and eye care",
    am: "የእይታ ደህንነትን እና የዓይን እንክብካቤን የሚያበረታቱ የማህበረሰብ ተግባራት እና የስልጠና ድርሰቶች",
  },
  "events.categories.health.title": {
    en: "Health Check-ups",
    am: "የጤና ምርመራዎች",
  },
  "events.categories.health.desc": {
    en: "Free and discounted eye screenings and preventive vision care services for the community",
    am: "ለማህበረሰቡ ነፃ እና ቅናሽ ያላቸው የዓይን ምርመራዎች እና የመከላከያ እንክብካቤ",
  },
  // Registration modal
  "events.register.title": { en: "Register for Event", am: "ለክስተት ይመዝገቡ" },
  "events.register.fullName": { en: "Full Name *", am: "ሙሉ ስም *" },
  "events.register.fullName.placeholder": {
    en: "Enter your full name",
    am: "ሙሉ ስምዎን ያስገቡ",
  },
  "events.register.email": { en: "Email Address *", am: "ኢሜይል አድራሻ *" },
  "events.register.email.placeholder": {
    en: "Enter your email address",
    am: "ኢሜይል አድራሻዎን ያስገቡ",
  },
  "events.register.phone": { en: "Phone Number *", am: "ስልክ ቁጥር *" },
  "events.register.phone.placeholder": {
    en: "Enter your phone number",
    am: "ስልክ ቁጥርዎን ያስገቡ",
  },
  "events.register.cancel": { en: "Cancel", am: "ሰርዝ" },
  "events.register.submit": { en: "Submit Registration", am: "መመዝገብ ያስገቡ" },
  "events.register.submitting": { en: "Submitting...", am: "በመላክ ላይ..." },
  "events.register.success.title": {
    en: "Registration Successful!",
    am: "መመዝገብ ተሳክቷል!",
  },
  "events.register.success.msg": {
    en: "You have been successfully registered for the event.",
    am: "ለክስተቱ በተሳካ ሁኔታ ተመዝግበዋል።",
  },
  "events.register.error": {
    en: "Failed to register for event",
    am: "ለክስተቱ መመዝገብ አልተሳካም",
  },
  // Learn more modal
  "events.learn.title": { en: "Detail", am: "ዝርዝር" },
  "events.details.title": { en: "Event Details", am: "የክስተት ዝርዝሮች" },
  "events.details.date": { en: "Date:", am: "ቀን፦" },
  "events.details.time": { en: "Time:", am: "ሰዓት፦" },
  "events.details.location": { en: "Location:", am: "አካባቢ፦" },
  "events.details.category": { en: "Category:", am: "ክፍል፦" },
  "events.learn.register": { en: "Register Now", am: "አሁን ይመዝገቡ" },
  "events.learn.close": { en: "Close", am: "ዝጋ" },
  // Category labels
  "events.category.awareness": { en: "Awareness", am: "እውቀት" },
  "events.category.campaign": { en: "Community", am: "ማህበረሰብ" },
  "events.category.health-check": { en: "Health Check", am: "የጤና ምርመራ" },
  // Contact page
  "contact.hero.title": { en: "Contact Us", am: "አግኙን" },
  "contact.hero.subtitle": {
    en: "We're here to help you with any questions or concerns. Reach out to us anytime.",
    am: "ስለ ማንኛውም ጥያቄ ወይም ጭንቀት ለመርዳት እንዘጋጅ ነን። በማንኛውም ጊዜ ይነጋገሩን።",
  },
  "contact.info.phone.title": { en: "Phone", am: "ስልክ" },
  "contact.info.phone.main": {
    en: "Main: (+251)921577368",
    am: "ዋና: (+251)921577368",
  },
  "contact.info.phone.emergency": {
    en: "Emergency: (555) 911-HELP",
    am: "ድንገተኛ: (555) 911-HELP",
  },
  "contact.info.email.title": { en: "Email", am: "ኢሜይል" },
  "contact.info.email.main": {
    en: "info@bdsec.org",
    am: "info@bdsec.org",
  },
  "contact.info.email.appt": {
    en: "tgashaw@bdsec.org",
    am: "tgashaw@bdsec.org",
  },
  "contact.info.address.title": { en: "Address", am: "አድራሻ" },
  "contact.info.address.line1": {
    en: "Bahir Dar Speciality Eye Care Center (BDSEC)- Bahir Dar",
    am: "ባሕር ዳር ስፔሻሊቲ የዓይን ማእከል (BDSEC)- ባሕር ዳር",
  },
  "contact.info.address.line2": {
    en: "Eye Care City, EC 12345",
    am: "አይኬር ከተማ, EC 12345",
  },
  "contact.info.hours.title": { en: "Hours", am: "ሰዓታት" },
  "contact.info.hours.weekday": {
    en: "24 hours a day",
    am: "24 ሰዓት",
  },
  "contact.info.hours.sat": {
    en: "7 days a week",
    am: "7 ቀናት በሳምንት",
  },
  "contact.form.title": { en: "Send Us a Message", am: "መልዕክት ይላኩልን" },
  "contact.form.name": { en: "Full Name *", am: "ሙሉ ስም *" },
  "contact.form.name.placeholder": {
    en: "Enter your full name",
    am: "ሙሉ ስምዎን ያስገቡ",
  },
  "contact.form.email": { en: "Email Address *", am: "ኢሜይል አድራሻ *" },
  "contact.form.email.placeholder": {
    en: "Enter your email address",
    am: "ኢሜይል አድራሻዎን ያስገቡ",
  },
  "contact.form.phone": { en: "Phone Number *", am: "ስልክ ቁጥር *" },
  "contact.form.phone.placeholder": {
    en: "Enter your phone number",
    am: "ስልክ ቁጥርዎን ያስገቡ",
  },
  "contact.form.subject": { en: "Subject *", am: "ርዕስ *" },
  "contact.form.subject.placeholder": { en: "Select subject", am: "ርዕስ ይምረጡ" },
  "contact.form.subject.appointment": {
    en: "Appointment Inquiry",
    am: "ስለ ቀጠሮ ጥያቄ",
  },
  "contact.form.subject.insurance": {
    en: "Insurance Question",
    am: "ስለ ኢንሹራንስ ጥያቄ",
  },
  "contact.form.subject.vision": { en: "Vision Inquiry", am: "ስለ እይታ ጥያቄ" },
  "contact.form.subject.surgery": {
    en: "Surgery Consultation",
    am: "ስለ ቀዶ ጥገና ምክክር",
  },
  "contact.form.subject.complaint": { en: "Complaint", am: "ቅሬታ" },
  "contact.form.subject.general": { en: "General Question", am: "አጠቃላይ ጥያቄ" },
  "contact.form.message": { en: "Message *", am: "መልዕክት *" },
  "contact.form.message.placeholder": {
    en: "Type your message here...",
    am: "መልዕክትዎን እዚህ ይጻፉ...",
  },
  "contact.form.submit": { en: "Send Message", am: "መልዕክት ላክ" },
  "contact.findUs.title": { en: "Find Us", am: "ያግኙን" },
  "contact.map.title": {
    en: "Map - Bahir Dar Specialty Eye Center",
    am: "ካርታ - ባሕር ዳር ስፔሻሊቲ የዓይን ማእከል",
  },
  "contact.emergency.title": { en: "Emergency Information", am: "የድንገተኛ መረጃ" },
  "contact.emergency.desc": {
    en: "For medical emergencies, please call 911 or visit our Emergency Department immediately.",
    am: "ለድንገተኛ ጤና ጉዳዮች እባክዎን 911 ይደውሉ ወይም ወዲያውኑ ወደ ድንገተኛ ክፍላችን ይመጡ።",
  },
  "contact.emergency.line": { en: "Emergency Line:", am: "ድንገተኛ ስልክ፦" },
  "contact.emergency.available": { en: "Available:", am: "ዝግጁ፦" },
  "contact.emergency.available.value": {
    en: "24 hours a day, 7 days a week",
    am: "በቀን 24 ሰዓት፣ በሳምንት 7 ቀናት",
  },
  "contact.urgent.title": { en: "Urgent Eye Care", am: "አስቸኳይ የዓይን እንክብካቤ" },
  "contact.urgent.desc": {
    en: "For urgent eye problems like sudden vision loss, severe eye pain, or eye injuries, please call us immediately or visit the nearest emergency room.",
    am: "እንደ አፋጣኝ የእይታ መታጠፍ፣ ጥቃቅን የዓይን ህመም ወይም የዓይን ጉዳት ያሉ አስቸኳይ ችግኝ ሲኖር እባክዎ ወዲያውኑ ይደውሉልን ወይም በአቅራቢያዎ ያለውን ድንገተኛ ክፍል ይጎብኙ።",
  },
  "contact.urgent.portal": {
    en: "Patient Portal: Access your vision records online",
    am: "የታካሚ ፖርታል፦ የእይታ መዝገቦትን በመጀመሪያ ይመልከቱ",
  },
  "contact.urgent.insurance": {
    en: "Insurance Questions: Call (555) 123-INS",
    am: "የኢንሹራንስ ጥያቄዎች፦ ይደውሉ (555) 123-INS",
  },
  "contact.urgent.lasik": {
    en: "LASIK Consultations: Call (555) 123-LASIK",
    am: "የሌዚክ ምክክሮች፦ ይደውሉ (555) 123-LASIK",
  },
  "contact.urgent.optical": {
    en: "Optical Shop: Call (555) 123-LENS",
    am: "ኦፕቲካል መደብር፦ ይደውሉ (555) 123-LENS",
  },
  // Contact validation and alerts
  "contact.validation.nameRequired": {
    en: "Name is required",
    am: "ስም አስፈላጊ ነው",
  },
  "contact.validation.emailInvalid": { en: "Invalid email", am: "የተሳሳተ ኢሜይል" },
  "contact.validation.emailRequired": {
    en: "Email is required",
    am: "ኢሜይል አስፈላጊ ነው",
  },
  "contact.validation.phoneRequired": {
    en: "Phone number is required",
    am: "ስልክ ቁጥር አስፈላጊ ነው",
  },
  "contact.validation.subjectRequired": {
    en: "Subject is required",
    am: "ርዕስ አስፈላጊ ነው",
  },
  "contact.validation.messageRequired": {
    en: "Message is required",
    am: "መልዕክት አስፈላጊ ነው",
  },
  "contact.alert.success.title": { en: "Success", am: "ተሳክቷል" },
  "contact.alert.success.msg": {
    en: "Your message has been sent successfully.",
    am: "መልዕክትዎ በተሳካ ሁኔታ ተልኳል።",
  },
  "contact.alert.error.title": { en: "Error", am: "ስህተት" },
  "contact.alert.error.msg": {
    en: "Failed to send your message.",
    am: "መልዕክትዎን መላክ አልተሳካም።",
  },
  // Admin Dashboard
  "admin.title": { en: "Admin Dashboard", am: "የአስተዳዳሪ ዳሽቦርድ" },
  "admin.subtitle": {
    en: "Manage your hospital operations efficiently",
    am: "የሆስፒታሉን ስራዎች በብቃት ያስተዳድሩ",
  },
  "admin.tabs.overview": { en: "Overview", am: "እይታ" },
  "admin.tabs.appointments": { en: "Appointments", am: "ቀጠሮዎች" },
  "admin.tabs.events": { en: "Events", am: "ክስተቶች" },
  "admin.tabs.patients": { en: "Patients", am: "ታካሚዎች" },
  "admin.tabs.messages": { en: "Messages", am: "መልዕክቶች" },
  "admin.tabs.settings": { en: "Settings", am: "ቅንብሮች" },
  "admin.bell.pending": {
    en: "Pending Appointments",
    am: "በመጠባበቅ ላይ ያሉ ቀጠሮዎች",
  },
  "admin.bell.viewAll": { en: "View all", am: "ሁሉንም ይመልከቱ" },
  "admin.bell.none": {
    en: "No pending appointments",
    am: "በመጠባበቅ ላይ ያለ ቀጠሮ የለም",
  },
  "admin.bell.detail": { en: "Detail", am: "ዝርዝር" },
  "admin.stats.totalAppointments": {
    en: "Total Appointments",
    am: "ጠቅላላ ቀጠሮዎች",
  },
  "admin.stats.activePatients": { en: "Active Patients", am: "ንቁ ታካሚዎች" },
  "admin.stats.pendingRequests": {
    en: "Pending Requests",
    am: "በመጠባበቅ ላይ ጥያቄዎች",
  },
  "admin.stats.completedToday": { en: "Completed Today", am: "ዛሬ የተጠናቀቁ" },
  "admin.stats.vsLastMonth": { en: "vs last month", am: "ከያለፈው ወር ጋር" },
  "admin.overview.recent": { en: "Recent Appointments", am: "የቅርብ ጊዜ ቀጠሮዎች" },
  "admin.overview.loadingAppointments": {
    en: "Loading appointments...",
    am: "ቀጠሮዎችን በመጫን ላይ...",
  },
  "admin.overview.noAppointments": {
    en: "No appointments found",
    am: "ምንም ቀጠሮ አልተገኘም",
  },
  "admin.table.patient": { en: "Patient", am: "ታካሚ" },
  "admin.table.doctor": { en: "Doctor", am: "ዶክተር" },
  "admin.table.time": { en: "Time", am: "ሰዓት" },
  "admin.table.status": { en: "Status", am: "ሁኔታ" },
  "admin.table.actions": { en: "Actions", am: "እርምጃዎች" },
  "admin.view": { en: "View", am: "ተመልከት" },
  "admin.quick.title": { en: "Quick Actions", am: "ፈጣን እርምጃዎች" },
  "admin.quick.addAppointment": {
    en: "Add New Appointment",
    am: "አዲስ ቀጠሮ ያክሉ",
  },
  "admin.quick.registerPatient": {
    en: "Register New Patient",
    am: "አዲስ ታካሚ ይመዝገቡ",
  },
  "admin.quick.scheduleEvent": { en: "Schedule Event", am: "ክስተት ያቀናብሩ" },
  "admin.system.title": { en: "System Status", am: "የስርዓት ሁኔታ" },
  "admin.system.refresh": { en: "Refresh", am: "አድስ" },
  "admin.system.checking": { en: "Checking...", am: "በመመርመር ላይ..." },
  "admin.system.server": { en: "Server Status", am: "የአገልጋይ ሁኔታ" },
  "admin.system.database": { en: "Database", am: "የውሂብ ጎታ" },
  "admin.system.api": { en: "API Status", am: "የAPI ሁኔታ" },
  "admin.activity.title": { en: "Recent Activity", am: "የቅርብ ተግባር" },
  "admin.activity.newPatient": {
    en: "New patient registered",
    am: "አዲስ ታካሚ ተመዝግቧል",
  },
  "admin.activity.apptConfirmed": {
    en: "Appointment confirmed",
    am: "ቀጠሮ ተረጋግጧል",
  },
  "admin.activity.eventScheduled": { en: "Event scheduled", am: "ክስተት ታቅዷል" },
  "admin.activity.contentUpdated": { en: "Content updated", am: "ይዘት ታድሷል" },
  "admin.appts.title": { en: "All Appointments", am: "ሁሉም ቀጠሮዎች" },
  "admin.label.patient": { en: "Patient", am: "ታካሚ" },
  "admin.label.doctor": { en: "Doctor", am: "ዶክተር" },
  "admin.label.speciality": { en: "Speciality", am: "ስፔሻሊቲ" },
  "admin.label.email": { en: "Email", am: "ኢሜይል" },
  "admin.label.phone": { en: "Phone", am: "ስልክ" },
  "admin.label.date": { en: "Date", am: "ቀን" },
  "admin.label.time": { en: "Time", am: "ሰዓት" },
  "admin.label.reason": { en: "Reason", am: "ምክንያት" },
  "admin.label.notes": { en: "Notes", am: "ማስታወሻ" },
  "admin.label.subject": { en: "Subject", am: "ርዕስ" },
  "admin.label.message": { en: "Message", am: "መልዕክት" },
  "admin.status": { en: "Status", am: "ሁኔታ" },
  "admin.status.pending": { en: "Pending", am: "በመጠባበቅ ላይ" },
  "admin.status.confirmed": { en: "Confirmed", am: "ተረጋግጧል" },
  "admin.status.cancelled": { en: "Cancelled", am: "ተሰርዟል" },
  "admin.status.completed": { en: "Completed", am: "ተጠናቋል" },
  "admin.messages.title": { en: "Message From Customers", am: "መልዕክት ከደንበኞች" },
  "admin.messages.loading": {
    en: "Loading messages...",
    am: "መልዕክቶችን በመጫን ላይ...",
  },
  "admin.messages.from": { en: "From", am: "ከ" },
  "admin.messages.received": { en: "Received", am: "የተቀበለ" },
  "admin.events.title": { en: "Events Management", am: "የክስተቶች አስተዳደር" },
  "admin.events.add": { en: "Add New Event", am: "አዲስ ክስተት ያክሉ" },
  "admin.events.loading": { en: "Loading events...", am: "ክስተቶችን በመጫን ላይ..." },
  "admin.events.category": { en: "Category", am: "ምድብ" },
  "admin.events.location": { en: "Location", am: "አካባቢ" },
  "admin.events.description": { en: "Description", am: "መግለጫ" },
  "admin.events.learnMore": { en: "Learn More", am: "ዝርዝር" },
  "admin.addEvent.title": { en: "Add New Event", am: "አዲስ ክስተት ያክሉ" },
  "admin.addEvent.category": { en: "Category *", am: "ምድብ *" },
  "admin.addEvent.dateTime": {
    en: "Event Date & Time *",
    am: "የክስተት ቀን እና ሰዓት *",
  },
  "admin.addEvent.titleLabel": { en: "Event Title *", am: "የክስተት ርዕስ *" },
  "admin.addEvent.titlePlaceholder": {
    en: "Enter event title",
    am: "የክስተት ርዕስ ያስገቡ",
  },
  "admin.addEvent.location": { en: "Location *", am: "አካባቢ *" },
  "admin.addEvent.locationPlaceholder": {
    en: "Enter event location",
    am: "የክስተት አካባቢ ያስገቡ",
  },
  "admin.addEvent.description": { en: "Description *", am: "መግለጫ *" },
  "admin.addEvent.descriptionPlaceholder": {
    en: "Enter event description",
    am: "የክስተት መግለጫ ያስገቡ",
  },
  "admin.addEvent.learnMore": { en: "Learn More Text", am: "ዝርዝር ጽሑፍ" },
  "admin.addEvent.learnMorePlaceholder": { en: "Learn More", am: "ዝርዝር" },
  "admin.addEvent.image": { en: "Event Image *", am: "የክስተት ምስል *" },
  "admin.addEvent.upload": { en: "Upload an image", am: "ምስል ይስቀሉ" },
  "admin.addEvent.orDrag": { en: "or drag and drop", am: "ወይም ጎትተው ይጣሉ" },
  "admin.addEvent.types": {
    en: "PNG, JPG, GIF up to 10MB",
    am: "PNG, JPG, GIF እስከ 10MB",
  },
  "admin.addEvent.cancel": { en: "Cancel", am: "ሰርዝ" },
  "admin.addEvent.create": { en: "Create Event", am: "ክስተት ይፍጠሩ" },
  "admin.addEvent.creating": { en: "Creating...", am: "በመፍጠር ላይ..." },
  "admin.addEvent.uploading": {
    en: "Uploading Image...",
    am: "ምስል በመስቀል ላይ...",
  },
  "admin.patients.title": { en: "Patients", am: "ታካሚዎች" },
  "admin.patients.search": {
    en: "Search patients by name, email, ID...",
    am: "ታካሚዎችን በስም፣ ኢሜይል፣ መታወቂያ ይፈልጉ...",
  },
  "admin.patients.add": { en: "Add Patient", am: "ታካሚ ያክሉ" },
  "admin.patients.loading": {
    en: "Loading patients...",
    am: "ታካሚዎችን በመጫን ላይ...",
  },
  "admin.patients.none": {
    en: "No patients match your search.",
    am: "ምንም ታካሚ ከፍለጋዎ ጋር አይስማማም።",
  },
  "admin.patients.patientId": { en: "Patient ID", am: "የታካሚ መታወቂያ" },
  "admin.patients.lastVisit": { en: "Last Visit:", am: "መጨረሻ ጉብኝት፦" },
  "admin.patients.name": { en: "Name", am: "ስም" },
  "admin.edit": { en: "Edit", am: "አስተካክል" },
  "admin.newAppointment": { en: "New Appointment", am: "አዲስ ቀጠሮ" },
  "admin.addPatient.title": { en: "Add New Patient", am: "አዲስ ታካሚ ያክሉ" },
  "admin.editPatient.title": { en: "Edit Patient", am: "ታካሚ አስተካክል" },
  "admin.form.fullName": { en: "Full Name *", am: "ሙሉ ስም *" },
  "admin.form.fullName.placeholder": {
    en: "Enter patient's full name",
    am: "የታካሚውን ሙሉ ስም ያስገቡ",
  },
  "admin.form.email": { en: "Email Address *", am: "ኢሜይል አድራሻ *" },
  "admin.form.email.placeholder": {
    en: "Enter patient's email",
    am: "የታካሚው ኢሜይል ያስገቡ",
  },
  "admin.form.phone": { en: "Phone Number *", am: "ስልክ ቁጥር *" },
  "admin.form.phone.placeholder": {
    en: "Enter patient's phone number",
    am: "የታካሚው ስልክ ቁጥር ያስገቡ",
  },
  "admin.form.lastVisit": { en: "Last Visit Date *", am: "የመጨረሻ ጉብኝት ቀን *" },
  "admin.btn.cancel": { en: "Cancel", am: "ሰርዝ" },
  "admin.btn.createPatient": { en: "Create Patient", am: "ታካሚ ይፍጠሩ" },
  "admin.btn.creating": { en: "Creating...", am: "በመፍጠር ላይ..." },
  "admin.btn.updatePatient": { en: "Update Patient", am: "ታካሚ አዘምን" },
  "admin.btn.updating": { en: "Updating...", am: "በመነቃቃት ላይ..." },
  "admin.toast.newAppointment.title": { en: "New Appointment", am: "አዲስ ቀጠሮ" },
  "admin.toast.newAppointment.msg": {
    en: "{name} booked an appointment",
    am: "{name} ቀጠሮ ሰጥቷል",
  },
  "admin.toast.stateUpdated.title": { en: "Success", am: "ተሳክቷል" },
  "admin.toast.stateUpdated.msg": {
    en: "Appointment state updated to {state}",
    am: "የቀጠሮ ሁኔታ ወደ {state} ተዘምኗል",
  },
  "admin.toast.stateUpdated.errorTitle": { en: "Error", am: "ስህተት" },
  "admin.toast.stateUpdated.errorMsg": {
    en: "Failed to update appointment state",
    am: "የቀጠሮ ሁኔታን ማዘመን አልተሳካም",
  },
  // Header quick actions
  "header.bookAppointment": { en: "Book Appointment", am: "ቀጠሮ ይያዙ" },
  "header.admin": { en: "Admin", am: "አስተዳዳሪ" },
  // Footer
  "footer.brand.name": {
    en: "Bahir Dar Eye Care Center",
    am: "ባሕር ዳር የዓይን እንክብካቤ ማእከል",
  },
  "footer.brand.tagline": { en: "Vision Excellence", am: "በእይታ ልምድ ብርታት" },
  "footer.desc": {
    en: "Providing exceptional eye care services with advanced technology and compassionate care. Your vision is our priority.",
    am: "በዘመናዊ ቴክኖሎጂ እና በአስተናጋጅ እንክብካቤ ልዩ የዓይን እንክብካቤ አገልግሎት እናቀርባለን። እይታዎ ቀዳሚ ነው።",
  },
  "footer.quickLinks.title": { en: "Quick Links", am: "ፈጣን ማገናኛዎች" },
  "footer.quickLinks.home": { en: "Home", am: "መነሻ" },
  "footer.quickLinks.services": { en: "Services", am: "አገልግሎቶች" },
  "footer.quickLinks.doctors": { en: "Doctors", am: "ዶክተሮች" },
  "footer.quickLinks.appointments": { en: "Appointments", am: "ቀጠሮዎች" },
  "footer.quickLinks.events": { en: "Events", am: "ክስተቶች" },
  "footer.quickLinks.contact": { en: "Contact", am: "አግኙን" },
  "footer.services.title": { en: "Services", am: "አገልግሎቶች" },
  "footer.services.exam": {
    en: "Comprehensive Eye Exams",
    am: "የሙሉ የዓይን ምርመራዎች",
  },
  "footer.services.lasik": { en: "LASIK Surgery", am: "የሌዚክ ቀዶ ጥገና" },
  "footer.services.retinal": { en: "Retinal Care", am: "የሬቲና እንክብካቤ" },
  "footer.services.pediatric": {
    en: "Pediatric Eye Care",
    am: "የህፃናት ዓይን እንክብካቤ",
  },
  "footer.services.glaucoma": { en: "Glaucoma Treatment", am: "የግላኮማ ሕክምና" },
  "footer.services.cataract": { en: "Cataract Surgery", am: "የካታራክት ቀዶ ጥገና" },
  "footer.contact.title": { en: "Contact Info", am: "የመገኛ መረጃ" },
  "footer.contact.phone": { en: "(555) 123-4567", am: "(555) 123-4567" },
  "footer.contact.email": {
    en: "info@eyecarecenter.com",
    am: "info@eyecarecenter.com",
  },
  "footer.contact.address.line1": {
    en: "123 Vision Boulevard",
    am: "123 ቪዥን ቡሊቫርድ",
  },
  "footer.contact.address.line2": {
    en: "Eye Care City, EC 12345",
    am: "አይኬር ከተማ, EC 12345",
  },
  "footer.contact.hours": {
    en: "Mon-Fri: 8AM-6PM",
    am: "ሰኞ-አርብ: 2:00-12:00 (LT)",
  },
  "footer.copy": {
    en: "© 2024 Bahir Dar Specality Eye Care Center. All rights reserved.",
    am: "© 2024 ባሕር ዳር ልዩ የዓይን ህክምና ማዕከል። መብቶች ሁሉ ተጠብቀዋል።",
  },
  "footer.links.privacy": { en: "Privacy Policy", am: "የግላዊነት መመሪያ" },
  "footer.links.terms": { en: "Terms of Service", am: "የአገልግሎት ውሎች" },
  "footer.links.accessibility": { en: "Accessibility", am: "ተደራሽነት" },
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

export const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = (localStorage.getItem("lang") as Language) || "en";
    setLanguageState(saved);
    document.documentElement.lang = saved;
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "am" : "en");
  }, [language, setLanguage]);

  const t = useCallback(
    (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      const value = entry[language] ?? entry["en"] ?? key;
      if (Array.isArray(value)) return value.join("\n");
      return value;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
