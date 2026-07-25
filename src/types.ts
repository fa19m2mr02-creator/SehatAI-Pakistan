export type Language = 'en' | 'ur';

export type UrgencyLevel = 'EMERGENCY' | 'URGENT' | 'MODERATE' | 'LOW';

export interface Doctor {
  id: string;
  name: string;
  pmdcNo: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  city: string;
  hospital: string;
  feePkr: number;
  rating: number;
  reviewsCount: number;
  image: string;
  acceptsSehatCard: boolean;
  availableSlot: string;
  languages: string[];
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  area: string;
  emergencyNum: string;
  totalBeds: number;
  availableICUBeds: number;
  oxygenAvailable: boolean;
  has247Emergency: boolean;
  address: string;
  rating: number;
}

export interface AiTriageResponse {
  urgency: UrgencyLevel;
  urgencyColor: string;
  summaryEn: string;
  summaryUr: string;
  recommendedSpecialist: string;
  keySymptomsIdentified: string[];
  potentialCauses: string[];
  immediateActions: string[];
  redFlags: string[];
  questionsForDoctor: string[];
  emergencyHotlineNeeded: boolean;
  disclaimer: string;
}

export interface LabFinding {
  parameter: string;
  value: string;
  status: 'NORMAL' | 'HIGH' | 'LOW' | 'ATTENTION';
  explanation: string;
}

export interface AiLabResponse {
  reportName: string;
  keyFindings: LabFinding[];
  summaryEnglish: string;
  summaryUrdu: string;
  dietaryAndLifestyleAdvice: string[];
  recommendedNextStep: string;
  disclaimer: string;
}

export interface AppointmentBooking {
  doctorId: string;
  doctorName: string;
  patientName: string;
  phone: string;
  city: string;
  date: string;
  timeSlot: string;
  consultationType: 'VIDEO' | 'CLINIC';
  paymentMethod: 'SEHAT_CARD' | 'JAZZCASH' | 'EASYPAISA' | 'CREDIT_CARD';
  feePkr: number;
}
