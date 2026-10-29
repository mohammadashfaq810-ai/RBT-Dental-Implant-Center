export type PageRoute = 'home' | 'about' | 'services' | 'contact' | 'admin';

export interface ThemeColors {
  canvasBg: string;
  surfaceBg: string;
  tintBg: string;
  headingColor: string;
  bodyColor: string;
  accentColor: string;
  accentDarkColor: string;
}

export interface ProcedureStep {
  stepNumber: string;
  title: string;
  detail: string;
}

export type ProcedureColorScheme = 'emerald' | 'sky' | 'amber' | 'indigo' | 'teal' | 'rose';

export interface DentistProcedure {
  id: string;
  indexLabel: string;
  category: 'implants' | 'cosmetic' | 'restorative' | 'orthodontics';
  departmentLabel: string;
  title: string;
  dentistCredit: string;
  duration: string;
  comfortNote: string;
  imageUrl: string;
  imageAlt: string;
  colorScheme: ProcedureColorScheme;
  seoSummary: string;
  dentistExecutionNarrative: string;
  steps: ProcedureStep[];
  keywords: string[];
}

export interface TreatmentCatalogItem {
  id: string;
  category: 'implants' | 'cosmetic' | 'restorative' | 'orthodontics';
  name: string;
  shortDescription: string;
  idealFor: string;
  visitEstimate: string;
}

export interface PatientReview {
  id: string;
  authorLabel: string;
  treatmentMentioned: string;
  timeAgo: string;
  rating: number;
  quote: string;
}

export interface DaySchedule {
  day: string;
  hours: string;
}

export interface SiteConfig {
  clinicName: string;
  leadDentist: string;
  leadTitle: string;
  phoneDisplay: string;
  whatsappDigits: string;
  addressFull: string;
  plusCode: string;
  ratingScore: string;
  reviewCount: number;
  heroHeadline: string;
  heroSubheadline: string;
  heroImageUrl: string;
  clinicFacadeImageUrl: string;
  aboutHeadline: string;
  aboutStoryParagraph1: string;
  aboutStoryParagraph2: string;
  adminPasscode: string;
  theme: ThemeColors;
  procedures: DentistProcedure[];
  schedule: DaySchedule[];
}

export interface AppointmentRecord {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}
