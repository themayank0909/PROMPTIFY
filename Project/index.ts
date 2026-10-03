export type YearId = 1 | 2 | 3 | 4;

export type RoadmapStatus = 'not_started' | 'in_progress' | 'completed';

export interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
}

export interface MonthData {
  month: number;
  title: string;
  subtitle: string;
  objectives: string[];
  deliverable: string;
  skills: string[];
}

export interface YearPlan {
  id: YearId;
  yearNumber: string;
  name: string;
  tagline: string;
  objective: string;
  primarySkills: string[];
  recommendedTech: string[];
  keyMilestones: MilestoneItem[];
  months: MonthData[];
  projects: string[];
  practiceTargets: string[];
  recommendedResources: { name: string; type: string; url?: string; note?: string }[];
}

export interface DSATopic {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalProblems: number;
  patterns: string[];
  easyCount: number;
  medCount: number;
  hardCount: number;
  keyConcepts: string[];
  practiceLinks: { name: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
}

export interface CSCoreTopic {
  id: string;
  subject: 'OOP' | 'DBMS' | 'OS' | 'CN';
  title: string;
  keyPoints: string[];
  practicalInsight: string;
  frequentInterviewQuestions: { question: string; answerSummary: string }[];
}

export interface ProjectSpec {
  id: string;
  level: 'Level 1: Small' | 'Level 2: Full-Stack' | 'Level 3: Production-Style' | 'Level 4: Large-Scale Engineering';
  title: string;
  tagline: string;
  problemStatement: string;
  techStack: string[];
  keyFeatures: string[];
  developmentSteps: string[];
  githubRequirements: string[];
  readmeRequirements: string[];
  deployment: string;
  resumeBulletPoints: string[];
}

export interface InternshipApplication {
  id: string;
  company: string;
  role: string;
  dateApplied: string;
  status: 'Wishlist' | 'Applied' | 'OA' | 'Interview' | 'Offer' | 'Rejected';
  notes: string;
  location?: string;
  link?: string;
}

export type ReadinessLevel = 'dont_know' | 'learning' | 'can_explain' | 'interview_ready';

export interface InterviewQuestion {
  id: string;
  category: 'DSA' | 'OOP' | 'DBMS' | 'OS' | 'CN' | 'System Design' | 'Behavioral';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  keyAnswer: string;
  starTip?: string;
}
