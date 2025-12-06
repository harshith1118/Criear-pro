export interface UserProfile {
  name: string;
  educationLevel: string;
  major: string;
  interests: string[];
  skills: string[];
  preferredWorkStyle: string; // Remote, Hybrid, On-site
  careerGoals: string;
}

export interface SkillGap {
  skillName: string;
  currentLevel: number; // 1-10 (estimated)
  requiredLevel: number; // 1-10
  description: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  matchScore: number; // 0-100
  salaryRange: string;
  growthOutlook: string; // "High", "Stable", "Decline"
  missingSkills: SkillGap[];
  roadmapSteps: string[];
  reasoning: string;
}

export interface AdvisorResponse {
  analysis: string;
  careerPaths: CareerPath[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}