export interface ScoreDetail {
  score: number;
  explanation: string;
}

export interface ATSAnalysis {
  overallScore: ScoreDetail;
  readabilityScore: ScoreDetail;
  keywordScore: ScoreDetail;
  formattingScore: ScoreDetail;
  organizationScore: ScoreDetail;
}

export interface GapItem {
  item: string;
  whyItMatters: string;
}

export interface GapAnalysis {
  missingKeywords: GapItem[];
  missingTechnicalSkills: GapItem[];
  missingSoftSkills: GapItem[];
  missingActionVerbs: GapItem[];
  missingATSSections: GapItem[];
  missingRecruiterExpectations: GapItem[];
}

export interface OpportunityItem {
  recommendation: string;
  impact: string;
}

export interface ImprovementOpportunities {
  highPriority: OpportunityItem[];
  mediumPriority: OpportunityItem[];
  lowPriority: OpportunityItem[];
}

export interface KeywordDetail {
  keyword: string;
  present: boolean;
  recommendedPlacement: string;
}

export interface OptimizedResume {
  contactInfo: string;
  summary: string;
  skillsSection: string;
  experienceSection: string;
  educationSection: string;
  projectsSection: string;
  rawFullMarkdown: string;
}

export interface OptimizationResponse {
  atsAnalysis: ATSAnalysis;
  gapAnalysis: GapAnalysis;
  opportunities: ImprovementOpportunities;
  keywords: KeywordDetail[];
  optimizedResume: OptimizedResume;
}
