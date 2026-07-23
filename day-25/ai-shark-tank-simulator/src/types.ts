export type JudgeId = 'vc' | 'founder' | 'customer' | 'angel';

export type JudgeEmotion = 'neutral' | 'curious' | 'skeptical' | 'impressed' | 'tough' | 'cash_ready' | 'excited';

export type DecisionOutcome = 'invest' | 'reject' | 'acquire' | 'come_back_later';

export interface StartupPitch {
  startupName: string;
  founderName: string;
  problemStatement: string;
  solution: string;
  revenueModel: string;
  targetAudience: string;
  fundingAskAmount: number;
  equityOffered: number;
  valuation: number;
}

export interface JudgeProfile {
  id: JudgeId;
  name: string;
  title: string;
  roleTitle: string;
  focusArea: string;
  avatar: string;
  badgeColor: string;
  accentColor: string;
  tagline: string;
  bio: string;
  personality: string;
}

export interface QnAItem {
  id: string;
  judgeId: JudgeId;
  round: number;
  question: string;
  userAnswer?: string;
  judgeReactionText?: string;
  judgeReactionEmotion?: JudgeEmotion;
  isAnswered: boolean;
}

export interface CategoryScores {
  marketPotential: number; // 0 - 20
  innovation: number; // 0 - 20
  businessModel: number; // 0 - 20
  execution: number; // 0 - 20
  investmentWorthiness: number; // 0 - 20
  totalScore: number; // 0 - 100
}

export interface JudgeScoreBreakdown {
  judgeId: JudgeId;
  scores: CategoryScores;
  commentary: string;
  pros: string[];
  cons: string[];
}

export interface IndividualJudgeOffer {
  judgeId: JudgeId;
  outcome: DecisionOutcome;
  offerText: string;
  fundingAmount?: number;
  equityPercent?: number;
  valuation?: number;
  reasoning: string;
  sharkQuote: string;
}

export interface InvestmentDecision {
  overallOutcome: DecisionOutcome;
  suggestedValuation: number;
  finalFundingAmount: number;
  finalEquityPercent: number;
  royaltyTerms?: string;
  primaryReasoning: string;
  overallScore: number;
  categoryScores: CategoryScores;
  judgeOffers: Record<JudgeId, IndividualJudgeOffer>;
  judgeBreakdowns: Record<JudgeId, JudgeScoreBreakdown>;
}

export interface LeaderboardEntry {
  id: string;
  startupName: string;
  founderName: string;
  date: string;
  score: number;
  outcome: DecisionOutcome;
  fundingAmount: number;
  equityPercent: number;
  valuation: number;
  summary: string;
}

export const SAMPLE_PITCHES: StartupPitch[] = [
  {
    startupName: 'EcoCharge AI',
    founderName: 'Alex Rivera',
    problemStatement: 'EV drivers suffer from severe range anxiety and long charging station queues during peak highway travel.',
    solution: 'Piezoelectric and solar embedded pavement panels that charge electric vehicles wirelessly while driving on highways.',
    revenueModel: 'B2B government infrastructure licensing & per-kWh micro-billing to EV network apps.',
    targetAudience: 'EV owners, state departments of transportation, and private highway operators.',
    fundingAskAmount: 500000,
    equityOffered: 10,
    valuation: 5000000,
  },
  {
    startupName: 'NutriPrint',
    founderName: 'Maya Lin',
    problemStatement: 'Mass-produced meal delivery kits lack personalized micronutrient tailoring based on real-time biometric blood markers.',
    solution: '3D food printer counter device with precision nutrient cartridges synced to smart wearable biometric health data.',
    revenueModel: 'Hardware sales ($299 device) plus recurring monthly nutrient pod subscriptions ($89/mo).',
    targetAudience: 'Biohackers, endurance athletes, and patients managing specialized dietary conditions.',
    fundingAskAmount: 300000,
    equityOffered: 12,
    valuation: 2500000,
  },
  {
    startupName: 'PetPulse Health',
    founderName: 'Liam Carter',
    problemStatement: 'Pet owners discover critical veterinary illnesses too late when subtle animal behavioral changes go unnoticed.',
    solution: 'Smart collar sensor powered by audio/vibration AI to track early signs of canine pain, cardiac arrhythmia, and anxiety.',
    revenueModel: '$49 collar purchase + $9.99/mo AI health monitoring subscription.',
    targetAudience: '70M+ dog owners in the USA and pet insurance carriers looking to cut claims.',
    fundingAskAmount: 200000,
    equityOffered: 15,
    valuation: 1333333,
  },
  {
    startupName: 'CodeFlow Hardware',
    founderName: 'Samantha Chen',
    problemStatement: 'Firmware & hardware engineers waste 40% of development cycles debugging complex microcontroller register bugs manually.',
    solution: 'Generative AI copilot explicitly trained on hardware schematics, Datasheets, and Verilog/C firmware codebases.',
    revenueModel: '$79/seat/month SaaS subscription for semiconductor & IoT enterprise teams.',
    targetAudience: 'Hardware startups, IoT manufacturers, automotive firmware labs, and university robotics departments.',
    fundingAskAmount: 750000,
    equityOffered: 8,
    valuation: 9375000,
  },
];

export const JUDGES: JudgeProfile[] = [
  {
    id: 'vc',
    name: "Mark 'The Titan' Sterling",
    title: 'Managing Partner, HyperScale Capital',
    roleTitle: 'Venture Capitalist',
    focusArea: 'Market Size ($10B+ TAM), Hyper-Scalability & 10x ROI',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    accentColor: '#06b6d4',
    tagline: 'Is this a $10 Billion dollar market, or just a nice hobby business?',
    bio: 'Billionaire venture capitalist who has backed 14 tech unicorns. He cares about massive market potential, viral network effects, and aggressive expansion speed.',
    personality: 'Relentless, bold, energetic, laser-focused on total addressable market size.',
  },
  {
    id: 'founder',
    name: "Elena 'The Operator' Vance",
    title: '3x Exit Founder & Tech Builder',
    roleTitle: 'Serial Founder',
    focusArea: 'Execution, CAC/LTV Unit Economics & Founder Grit',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    accentColor: '#10b981',
    tagline: 'Ideas are cheap. Execution, unit CAC, and founder grit are everything.',
    bio: 'Built and sold three software enterprises for over $400M combined. She dissects operational hurdles, customer acquisition costs, and team endurance.',
    personality: 'Pragmatic, sharp, empathetic to founder struggles, zero patience for fluff.',
  },
  {
    id: 'customer',
    name: "David 'The End-User' Miller",
    title: 'Consumer Product Expert & Advocate',
    roleTitle: 'Target Customer',
    focusArea: 'Product Usability, Frictionless Value & Daily Adoption',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentColor: '#f59e0b',
    tagline: 'Will real human beings actually pull out their credit card for this tomorrow?',
    bio: 'Veteran consumer advocate and product tester who evaluates pitches strictly from the end user perspective: convenience, delight, affordability, and necessity.',
    personality: 'Candid, relatable, intuitive, keeps founders grounded in user reality.',
  },
  {
    id: 'angel',
    name: "Victoria 'The Treasury' Chen",
    title: 'Fintech Titan & Angel Syndicate Lead',
    roleTitle: 'Angel Investor',
    focusArea: 'Profitability, Cash Flow Margins & Defensible Moats',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    accentColor: '#a855f7',
    tagline: 'Show me high margins and a clear path to cash flow positivity.',
    bio: 'Former CFO and wall street strategist turned angel investor in over 80 early stage startups. She demands high margins, low burn rates, and financial moats.',
    personality: 'Analytical, calm, financially rigorous, hawk-eyed on profit margins.',
  },
];
