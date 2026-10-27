export type NavTab = 'dashboard' | 'visa' | 'jobs' | 'calendar' | 'travel';

export type ApplicationStage = 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected';

export interface VisaRequirement {
  id: string;
  country: string;
  flag: string;
  visaType: string;
  category: 'Work' | 'Job Seeker' | 'Digital Nomad' | 'Study' | 'Permanent Residency';
  processingTime: string;
  minIncome: string;
  costUsd: {
    embassyFee: number;
    vfsFee: number;
    blockedAccountOrProof: number;
    translationApostille: number;
  };
  keyEligibility: string[];
  documentsRequired: string[];
  easinessTips: string;
  officialPortal: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: 'Identity' | 'Legalization' | 'Finance' | 'Housing' | 'Language' | 'Insurance' | 'Custom';
  description?: string;
  isCompleted: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
  structuredData?: {
    targetCountry?: string;
    visaType?: string;
    eligibility?: string;
    documentsRequired?: string[];
    costUsd?: {
      embassyFee: number;
      vfsFee: number;
      blockedAccount: number;
      translation: number;
    };
    easinessTips?: string;
  };
}

export interface JobOpening {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  salaryEstimate: string;
  providesRelocation: boolean;
  blueCardEligible: boolean;
  postedAgo: string;
  stage: ApplicationStage;
  sector: string;
  notes?: string;
}

export interface RecruitmentHeadline {
  id: string;
  title: string;
  source: string;
  date: string;
  countries: string[];
  sectors: string[];
  summary: string;
  tag: 'Breaking' | 'Government Quota' | 'Bilateral Accord' | 'Fast-Track';
}

export interface PublicHoliday {
  id: string;
  name: string;
  date: string;
  country: string;
  flag: string;
  isDomestic: boolean;
  officeImpact: string;
}

export interface CalendarTask {
  id: string;
  title: string;
  dateIso: string;
  time: string;
  category: 'embassy' | 'interview' | 'flight' | 'document';
  notes: string;
  isCompleted: boolean;
}

export interface TripPlan {
  id: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  budgetEur: number;
  transportMode: 'High-speed Rail (ICE/TGV)' | 'Flight' | 'Regional Rail' | 'Bus';
  bookingRef?: string;
  notes: string;
}

export interface CoreJsonOutput {
  status: "success";
  current_date: "Tuesday, October 27, 2026";
  ui_layout_config: {
    phone_view_ratio: {
      layout_mode: "single_column_vertical";
      ticker_placement?: string;
      card_width_percentage: "100%";
      font_scale_multiplier: number;
      padding_density: "compact";
    };
    desktop_view_ratio?: {
      layout_mode: "multi_column_grid_dashboard";
      card_width_percentage: "33.3%";
      font_scale_multiplier: number;
      padding_density: "spacious";
    };
    desktop_and_web_view_ratio?: {
      layout_mode: "multi_column_dashboard_with_right_sidebar";
      ticker_placement: string;
      card_width_percentage: "25.0%";
      font_scale_multiplier: number;
      padding_density: "spacious";
    };
  };
  live_ticket_price_ticker?: {
    headline: string;
    last_updated: string;
    trends: {
      minute_by_minute_trend: string;
      hourly_projection: string;
      daily_recommendation: string;
      cheapest_route_alternative: string;
    };
  };
  global_visa_engine: {
    origin: string;
    destination: string;
    visa_category?: string;
    required_documents?: string[];
    estimated_costs?: {
      embassy_fee_usd: number;
      vfs_processing_fee_usd: number;
      financial_proof_required_usd: number;
    };
    visa_categories_available?: {
      seasonal_visas?: {
        status: string;
        duration: string;
        documents_required: string[];
      };
      work_permit?: { documents: string[]; cost_usd: number };
      study?: { documents: string[]; blocked_account_usd: number };
      business?: { documents: string[]; cost_usd: number };
      family?: { documents: string[]; cost_usd: number };
    };
    application_tips: string;
  };
  recruitment_headlines?: {
    currently_hiring_regions: string[];
    upcoming_immigration_quotas: string;
    in_demand_sectors: string[];
  };
  live_employer_recruitment_directory?: {
    headline: string;
    listings: Array<{
      company_name: string;
      industry_sector: string;
      job_title: string;
      verified_contact_email: string;
      official_career_apply_url: string;
      map_coordinates: string;
    }>;
    upcoming_government_quotas_2027: string;
  };
  universal_calendar: {
    upcoming_embassy_closures: string[];
  };
  developer_tribute: {
    acknowledgement: string;
    creator_credit: string;
    hire_invitation: string;
  };
}
