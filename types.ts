
export enum View {
  Home = 'home',
  Tests = 'tests',
  Sectors = 'sectors',
  SectorDetail = 'sector-detail',
  Universities = 'universities',
  Reviews = 'reviews',
  Resources = 'resources',
  Profile = 'profile',
  Premium = 'premium'
}

export type Grade = 'Hazırlık' | '1. Sınıf' | '2. Sınıf' | '3. Sınıf' | '4. Sınıf' | 'Mezun';

export interface Comment {
  id: string;
  userName: string;
  text: string;
  date: string;
  isAnonymous: boolean;
}

export interface DormInfo {
  type: 'KYK' | 'Vakıf' | 'Özel' | 'Üniversite';
  capacity: string;
  amenities: string[];
}

export interface ClubCategory {
  category: string;
  clubs: string[];
}

export interface ScholarshipInfo {
  name: string;
  coverage: string;
  description: string;
}

export interface University {
  id: string;
  name: string;
  logo: string;
  location: string;
  researchScore: number;
  description: string;
  followers: number;
  studentCount?: number;
  faculties?: string[];
  campusSize?: string;
  clubCount?: number;
  activityLevel?: string;
  dorms?: DormInfo[];
  activeClubs?: ClubCategory[];
  majorEvents?: string[];
  worldRanking?: string;
  strongestAreas?: string[];
  scholarships?: ScholarshipInfo[];
}

export interface AcademicMember {
  id: string;
  name: string;
  title: string;
  faculty: string;
  department: string;
  avatar: string;
  videoUrl: string;
  publications: number;
  citations: number;
  hIndex: number;
  bio: string;
}

export interface StudentVlog {
  id: string;
  name: string;
  universityId: string;
  faculty: string;
  department: string;
  grade: Grade;
  avatar: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description: string;
}

export interface CampusVlog {
  id: string;
  universityId: string;
  category: 'yurt' | 'kampus' | 'sosyal';
  studentName: string;
  avatar: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description: string;
}

export interface ExpertInsight {
  id: string;
  name: string;
  title: string;
  avatar: string;
  comment: string;
  fieldOfWork: string;
  experienceYears: number;
  bio: string;
  linkedIn?: string;
  videoUrl?: string;
  scoringSummary?: {
    label: string;
    score: number;
  }[];
}

export interface WorkplaceCategory {
  category: string;
  percentage: number;
  companies: string[];
}

export interface Specialization {
  title: string;
  description: string;
  workplace: string;
  jobFindingEase: number; // 1-10
  growthPotential: number; // 1-10
  internationalOpportunities: number; // 1-10
  workplaceDistribution?: WorkplaceCategory[];
}

export interface Sector {
  id: string;
  name: string;
  category: 'Teknoloji' | 'Sağlık' | 'Finans' | 'Yaratıcı' | 'Sosyal' | 'Mühendislik';
  growth: string;
  difficulty: string;
  salary: string;
  icon: string;
  description?: string;
  skills?: string[];
  softSkills?: string[];
  hardSkills?: string[];
  trends?: string[];
  expertInsights?: ExpertInsight[];
  specializations?: Specialization[];
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  style: string;
  rating: number;
  difficulty: number;
  reviewCount: number;
  comments: Comment[];
}
