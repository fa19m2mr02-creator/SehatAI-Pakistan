import { Doctor, Hospital } from '../types';

export const PAKISTAN_CITIES = [
  'All Cities',
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Faisalabad',
  'Multan',
  'Quetta',
  'Gilgit'
];

export const SPECIALTIES = [
  'All Specialties',
  'General Physician',
  'Pediatrician (Child Specialist)',
  'Gynecologist',
  'Cardiologist (Heart)',
  'Dermatologist (Skin)',
  'Pulmonologist (Chest/Lung)',
  'Neurologist',
  'Psychiatrist / Mental Health',
  'Gastroenterologist'
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Fatima Zahra',
    pmdcNo: 'PMDC-68923-S',
    specialty: 'General Physician',
    qualification: 'MBBS (AKU), FCPS (Internal Medicine)',
    experienceYears: 12,
    city: 'Karachi',
    hospital: 'Aga Khan University Hospital, Clifton Clinic',
    feePkr: 1500,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1594824813566-78a032d84955?auto=format&fit=crop&q=80&w=400',
    acceptsSehatCard: true,
    availableSlot: 'Today at 04:30 PM',
    languages: ['English', 'Urdu', 'Sindhi']
  },
  {
    id: 'doc-2',
    name: 'Dr. Tariq Mahmood Chaudhry',
    pmdcNo: 'PMDC-54120-P',
    specialty: 'Cardiologist (Heart)',
    qualification: 'MBBS (KEMU), MRCP (UK), FCPS Cardiology',
    experienceYears: 18,
    city: 'Lahore',
    hospital: 'Punjab Institute of Cardiology & Hameed Latif Hospital',
    feePkr: 2000,
    rating: 4.95,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    acceptsSehatCard: true,
    availableSlot: 'Today at 06:00 PM',
    languages: ['English', 'Urdu', 'Punjabi']
  },
  {
    id: 'doc-3',
    name: 'Dr. Ayesha Rehman Siddiqui',
    pmdcNo: 'PMDC-72109-I',
    specialty: 'Gynecologist',
    qualification: 'MBBS (RMC), FCPS (O&G), Fellowship Maternal Medicine',
    experienceYears: 14,
    city: 'Islamabad',
    hospital: 'Shifa International Hospital & Maroof International',
    feePkr: 1800,
    rating: 4.88,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    acceptsSehatCard: true,
    availableSlot: 'Tomorrow at 11:00 AM',
    languages: ['English', 'Urdu', 'Pashto']
  },
  {
    id: 'doc-4',
    name: 'Dr. Bilal Ahmed Khan',
    pmdcNo: 'PMDC-81045-KP',
    specialty: 'Pediatrician (Child Specialist)',
    qualification: 'MBBS (KMC Peshawar), DCH, FCPS Pediatrics',
    experienceYears: 10,
    city: 'Peshawar',
    hospital: 'Lady Reading Hospital & Northwest General Hospital',
    feePkr: 1200,
    rating: 4.92,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    acceptsSehatCard: true,
    availableSlot: 'Today at 07:15 PM',
    languages: ['English', 'Urdu', 'Pashto']
  },
  {
    id: 'doc-5',
    name: 'Dr. Usman Ghani Baloch',
    pmdcNo: 'PMDC-61290-B',
    specialty: 'Pulmonologist (Chest/Lung)',
    qualification: 'MBBS (Bolan Med College), DTCD, FCPS Pulmonology',
    experienceYears: 15,
    city: 'Quetta',
    hospital: 'Civil Hospital Quetta & BMC Medical Complex',
    feePkr: 1000,
    rating: 4.85,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    acceptsSehatCard: true,
    availableSlot: 'Tomorrow at 03:00 PM',
    languages: ['English', 'Urdu', 'Balochi', 'Brahui']
  },
  {
    id: 'doc-6',
    name: 'Dr. Sadia Malik',
    pmdcNo: 'PMDC-79341-S',
    specialty: 'Dermatologist (Skin)',
    qualification: 'MBBS (DOW), MCPS, FCPS Dermatology',
    experienceYears: 9,
    city: 'Karachi',
    hospital: 'South City Hospital & Liaquat National',
    feePkr: 1600,
    rating: 4.91,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400',
    acceptsSehatCard: false,
    availableSlot: 'Today at 05:00 PM',
    languages: ['English', 'Urdu']
  }
];

export const HOSPITALS_DATA: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Aga Khan University Hospital',
    city: 'Karachi',
    area: 'Stadium Road',
    emergencyNum: '021-111-911-911',
    totalBeds: 700,
    availableICUBeds: 14,
    oxygenAvailable: true,
    has247Emergency: true,
    address: 'National Stadium Rd, Karachi, Sindh',
    rating: 4.9
  },
  {
    id: 'hosp-2',
    name: 'Shaukat Khanum Memorial Hospital',
    city: 'Lahore',
    area: 'Johar Town',
    emergencyNum: '042-35905000',
    totalBeds: 450,
    availableICUBeds: 8,
    oxygenAvailable: true,
    has247Emergency: true,
    address: '7A Block R-3 Johar Town, Lahore, Punjab',
    rating: 4.95
  },
  {
    id: 'hosp-3',
    name: 'Shifa International Hospital',
    city: 'Islamabad',
    area: 'H-8/4',
    emergencyNum: '051-8463666',
    totalBeds: 550,
    availableICUBeds: 12,
    oxygenAvailable: true,
    has247Emergency: true,
    address: 'Pitras Bukhari Rd, H-8/4, Islamabad',
    rating: 4.8
  },
  {
    id: 'hosp-4',
    name: 'Lady Reading Hospital (LRH)',
    city: 'Peshawar',
    area: 'Soekarno Chowk',
    emergencyNum: '091-9211430',
    totalBeds: 1200,
    availableICUBeds: 22,
    oxygenAvailable: true,
    has247Emergency: true,
    address: 'Soekarno Chowk, Peshawar, Khyber Pakhtunkhwa',
    rating: 4.7
  },
  {
    id: 'hosp-5',
    name: 'Combined Military Hospital (CMH)',
    city: 'Rawalpindi',
    area: 'Mall Road Cantt',
    emergencyNum: '051-5503020',
    totalBeds: 900,
    availableICUBeds: 18,
    oxygenAvailable: true,
    has247Emergency: true,
    address: 'Tamizuddin Road, Rawalpindi Cantt',
    rating: 4.85
  },
  {
    id: 'hosp-6',
    name: 'Bolan Medical Complex Hospital',
    city: 'Quetta',
    area: 'Brewery Road',
    emergencyNum: '081-9213082',
    totalBeds: 600,
    availableICUBeds: 6,
    oxygenAvailable: true,
    has247Emergency: true,
    address: 'Brewery Road, Quetta, Balochistan',
    rating: 4.5
  }
];

export const SAMPLE_SYMPTOMS_PAKISTAN = [
  {
    title: 'Dengue Warning Symptoms',
    text: 'Do din se teez bukhar 103F, aankhon ke peeche dard, jism aur jorron mein shadeed dard, aur jild par surkh dhabay.'
  },
  {
    title: 'Seasonal Flu & Sore Throat',
    text: 'Gala kharab hai, halki khansi, naak behna aur sar mein dard pichle 2 din se.'
  },
  {
    title: 'Typhoid / Gastric Fever',
    text: 'Continuous fever for 5 days, abdominal pain, loss of appetite, extreme fatigue and nausea after eating local food.'
  },
  {
    title: 'Child High Fever & Vomiting',
    text: '3 saal ke bachay ko 102F bukhar hai, vomit kar raha hai aur sust parh gaya hai.'
  },
  {
    title: 'Chest Tightness & Shortness of Breath',
    text: 'Seene mein bojh aur saans lene mein dushwari, pashina aa raha hai jab se chalkar aaya hun.'
  }
];

export const SAMPLE_LAB_REPORTS = [
  {
    title: 'Chughtai Lab - CBC (Dengue Suspect)',
    reportType: 'Complete Blood Count (CBC)',
    text: `Chughtai Lab Report:
Hemoglobin: 13.5 g/dL (Normal)
Total Leucocyte Count (TLC): 2,800 / μL (LOW - Normal 4,000-11,000)
Platelet Count: 78,000 / μL (CRITICAL LOW - Normal 150,000-450,000)
Hematocrit (HCT): 46% (High normal)
Patient note: High fever, joint pain, retro-orbital headache.`
  },
  {
    title: 'Shaukat Khanum - Diabetes HbA1c',
    reportType: 'Glycated Hemoglobin (HbA1c)',
    text: `Shaukat Khanum Lab Test:
HbA1c: 8.4% (HIGH - Diabetes Indicator > 6.5%)
Fasting Blood Glucose: 168 mg/dL (Normal < 100 mg/dL)
Random Blood Sugar: 245 mg/dL`
  },
  {
    title: 'Islamabad Diagnostic - Typhidot Test',
    reportType: 'Typhidot Typhoid Serology',
    text: `IDC Diagnostic Report:
Typhidot IgM: POSITIVE (High antibody response - Active Salmonella Typhi Infection)
Typhidot IgG: POSITIVE
Widal Test Anti-O: 1:320 (Elevated)`
  }
];

export const TRANSLATIONS = {
  en: {
    heroTitle: "Pakistan's 1st AI Healthcare & PMDC Doctor Platform",
    heroSubtitle: "Get instant Urdu & English AI symptom triage, verified PMDC teleconsultations, smart lab report analysis, and Sehat Card guidance within seconds.",
    startTriage: "Start Free AI Health Assessment",
    findDoctor: "Find PMDC Doctor",
    emergencyNum: "Emergency Hotline: 1122",
    aiTriageHeader: "AI Doctor Symptom Triage",
    aiTriageSub: "Describe symptoms in Urdu, English, or Roman Urdu (e.g. 'Mujhe do din se bukhar hai')",
    doctorsHeader: "PMDC Verified Doctors in Pakistan",
    doctorsSub: "Consult top specialists online via video or visit partner clinics",
    hospitalsHeader: "24/7 Pakistan Emergency & Hospital Directory",
    hospitalsSub: "Real-time bed availability & direct emergency contacts across major cities",
    labHeader: "AI Lab Report & Prescription Explainer",
    labSub: "Paste your CBC, HbA1c, LFT or Typhoid report to get plain language Urdu & English breakdown",
    sehatCardHeader: "Sehat Sahulat Program & Zakat Subsidies",
    pricingHeader: "Simple & Affordable PKR Healthcare Plans"
  },
  ur: {
    heroTitle: "پاکستان کا پہلا مصنوعی ذہانت پر مبنی ہیلتھ کیئر پلیٹ فارم",
    heroSubtitle: "اردو اور انگریزی میں فوری AI علامت کا معائنہ، PMDC تصدیق شدہ ڈاکٹرز سے آن لائن مشورہ اور لیب رپورٹ کا آسان تجزیہ۔",
    startTriage: "مفت AI صحت کا معائنہ شروع کریں",
    findDoctor: "PMDC ڈاکٹر تلاش کریں",
    emergencyNum: "ہنگامی مدد: 1122",
    aiTriageHeader: "مصنوعی ذہانت سے علامت کا معائنہ",
    aiTriageSub: "اپنی بیماری کی علامات اردو یا انگریزی میں بتائیں",
    doctorsHeader: "پاکستان کے تصدیق شدہ PMDC ماہر ڈاکٹرز",
    doctorsSub: "ویڈیو کال پر گھر بیٹھے یا کلینک میں بہترین اسپیشلسٹ سے مشورہ کریں",
    hospitalsHeader: "24/7 پاکستان ہسپتال اور ایمرجنسی ڈائرکٹری",
    hospitalsSub: "تمام بڑے شہروں کے ہسپتالوں اور 1122 ریسکیو کے رابطے",
    labHeader: "AI لیب رپورٹ اور نسخہ سمجھنے کا آلہ",
    labSub: "اپنی ٹیسٹ رپورٹ (CBC, HbA1c, ٹائیفائڈ) لکھیں اور آسان زبان میں وضاحت حاصل کریں",
    sehatCardHeader: "صحت سہولت پروگرام اور زکوٰۃ سبسڈیز",
    pricingHeader: "مناسب ترین روپوں میں بہترین ہیلتھ پیکجز"
  }
};
