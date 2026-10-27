import {
  ChecklistItem,
  VisaRequirement,
  JobOpening,
  RecruitmentHeadline,
  PublicHoliday,
  CalendarTask,
  TripPlan,
  CoreJsonOutput
} from '../types';

export const CURRENT_DATE_STRING = "Tuesday, October 27, 2026";

export const CANONICAL_CORE_JSON: CoreJsonOutput = {
  status: "success",
  current_date: "Tuesday, October 27, 2026",
  ui_layout_config: {
    phone_view_ratio: {
      layout_mode: "single_column_vertical",
      card_width_percentage: "100%",
      font_scale_multiplier: 1.0,
      padding_density: "compact"
    },
    desktop_view_ratio: {
      layout_mode: "multi_column_grid_dashboard",
      card_width_percentage: "33.3%",
      font_scale_multiplier: 1.2,
      padding_density: "spacious"
    }
  },
  global_visa_engine: {
    origin: "Bangladesh",
    destination: "Germany",
    visa_category: "Work / Chancenkarte Opportunity Card",
    required_documents: [
      "Valid National Biometric Passport (minimum 12 months validity)",
      "Proof of academic qualification with ZAB Statement of Comparability",
      "Language proficiency certificate (Goethe A1+ or IELTS 6.0+)",
      "German Blocked Account (Sperrkonto) funded with €12,850",
      "Europass Standard CV and Career Search Motivational Letter",
      "Incoming Schengen Health Insurance (€30,000 regulatory coverage)"
    ],
    estimated_costs: {
      embassy_fee_usd: 85,
      vfs_processing_fee_usd: 38,
      financial_proof_required_usd: 12850
    },
    application_tips: "Submit your digital dossier directly through the official German Federal Foreign Office Consular Services Portal (Auswärtiges Amt). Pre-verify university degree status on the official Anabin database to bypass delays at VFS Global Dhaka intake."
  },
  recruitment_headlines: {
    currently_hiring_regions: [
      "Germany (Chancenkarte Fast-Track for IT, AI, and Engineering)",
      "Romania & Croatia (Q4 2026 Accelerated Work Authorization Drives for Logistics & Hospitality)",
      "Portugal (Digitalized Expression of Interest System for Tech Graduates)",
      "Poland (Logistics & Industrial Corridor Work Authorizations)",
      "Netherlands (Semiconductor & Green Energy Talent Sponsorship)"
    ],
    upcoming_immigration_quotas: "Germany expands 2027 Chancenkarte quotas for non-EU STEM cadres, while Italy Decreta Flussi 2027 allocates over 150,000 work permits across healthcare and engineering sectors.",
    in_demand_sectors: [
      "IT & Software Engineering",
      "Healthcare & Nursing Support",
      "Civil & Structural Engineering",
      "Heavy Transport & Regional Logistics",
      "Hospitality & Gastronomy Services",
      "Skilled Trades"
    ]
  },
  universal_calendar: {
    upcoming_embassy_closures: [
      "Saturday, October 31, 2026: Reformation Day (German consulates closed in northern/eastern Bundesländer)",
      "Sunday, November 1, 2026: All Saints' Day (Pan-European diplomatic and Schengen intake centers closed)",
      "Wednesday, November 11, 2026: Armistice Day (French consular missions and clearing platforms closed)",
      "Wednesday, December 16, 2026: Victory Day (Bijoy Dibosh) (All European embassies, VFS Global Dhaka, and banks in Bangladesh fully closed)",
      "Friday, December 25, 2026: Christmas Day (Pan-European and Bangladesh missions fully closed)"
    ]
  },
  developer_tribute: {
    acknowledgement: "Thank you for using this system! If this application or browser extension has helped you succeed or eased your journey even a little bit, please show your gratitude to our creator.",
    creator_credit: "Developed by ARIFUZZAMAN from East Bijoy Singh, Feni, Bangladesh.",
    hire_invitation: "If you love using this tool and want to hire ARIFUZZAMAN to travel, explore, or guide you on your international journeys, please connect with him via the app's Hire & Travel Portal!"
  }
};

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    title: 'Valid Biometric Passport (>= 12 mo validity remaining)',
    category: 'Identity',
    description: 'Ensure passport has at least 3 blank pages and no structural damage.',
    isCompleted: true,
    priority: 'High'
  },
  {
    id: 'chk-2',
    title: 'University Degree Apostille & ZAB Statement of Comparability',
    category: 'Legalization',
    description: 'State education ministry legalization followed by foreign affairs apostille stamp.',
    isCompleted: true,
    priority: 'High'
  },
  {
    id: 'chk-3',
    title: 'German Blocked Account (Sperrkonto) funded (€12,850)',
    category: 'Finance',
    description: 'Official confirmation letter from Fintiba, Coracle, or Deutsche Bank.',
    isCompleted: false,
    priority: 'High'
  },
  {
    id: 'chk-4',
    title: 'Schengen Compliant Health Insurance (€30,000 Coverage)',
    category: 'Insurance',
    description: 'Must explicitly cover emergency repatriation across all Schengen states.',
    isCompleted: true,
    priority: 'High'
  },
  {
    id: 'chk-5',
    title: 'Certified Police Clearance Certificate (PCC) with Hague Apostille',
    category: 'Legalization',
    description: 'Must be issued within 90 days of the embassy visa appointment.',
    isCompleted: false,
    priority: 'Medium'
  },
  {
    id: 'chk-6',
    title: 'English (IELTS/PTE) or German (Goethe/Telc) Language Certificate',
    category: 'Language',
    description: 'B2 English or A1/B1 German depending on specific pathway rules.',
    isCompleted: false,
    priority: 'Medium'
  },
  {
    id: 'chk-7',
    title: 'Proof of Temporary Accommodation (Initial 30 Days)',
    category: 'Housing',
    description: 'Verifiable hotel/Wunderflats/Airbnb reservation matching travel dates.',
    isCompleted: false,
    priority: 'Low'
  },
  {
    id: 'chk-8',
    title: 'Europass Standard CV & Professional Motivational Letter',
    category: 'Identity',
    description: 'Tailored career roadmap highlighting shortage occupation qualifications.',
    isCompleted: false,
    priority: 'Medium'
  }
];

export const VISA_REQUIREMENTS_DIRECTORY: VisaRequirement[] = [
  {
    id: 'visa-de-chancen',
    country: 'Germany',
    flag: '🇩🇪',
    visaType: 'Chancenkarte (Opportunity Card 2026/2027)',
    category: 'Job Seeker',
    processingTime: '4–8 weeks',
    minIncome: '€1,027/mo (or €12,850 blocked)',
    costUsd: {
      embassyFee: 85,
      vfsFee: 38,
      blockedAccountOrProof: 12850,
      translationApostille: 160
    },
    keyEligibility: [
      'Score 6+ points on points matrix (qualification, age < 35, German/English skills)',
      'Or hold recognized fully equivalent vocational/tertiary degree',
      'Allows 20h/week part-time employment during the 1-year job search'
    ],
    documentsRequired: [
      'Biometric Passport (>= 12mo validity)',
      'ZAB comparability certificate',
      'Language certificate (Goethe A1+ or IELTS 6.0+)',
      'Proof of €12,850 funds in blocked account',
      'Schengen incoming health insurance'
    ],
    easinessTips: 'Apply directly through Auswärtiges Amt Consular Portal. Pre-check Anabin database status H+ to skip extra verification delays.',
    officialPortal: 'https://www.make-it-in-germany.com'
  },
  {
    id: 'visa-de-bluecard',
    country: 'Germany',
    flag: '🇩🇪',
    visaType: 'EU Blue Card (Blaue Karte)',
    category: 'Work',
    processingTime: '3–6 weeks',
    minIncome: '€45,300 (Bottleneck) / €50,000 (General)',
    costUsd: {
      embassyFee: 85,
      vfsFee: 38,
      blockedAccountOrProof: 0,
      translationApostille: 140
    },
    keyEligibility: [
      'Binding employment contract of at least 6 months with German entity',
      'University degree or 3+ years verified IT specialist experience',
      'Permanent residency (Niederlassungserlaubnis) fast-tracked to 21 months with B1 German'
    ],
    documentsRequired: [
      'Signed German Employment Contract & Job Description form (Erklärung zum Beschäftigungsverhältnis)',
      'Degree certificate with sworn German translation',
      'Curriculum Vitae',
      'Proof of statutory German health insurance coverage (Krankenkasse confirmation)'
    ],
    easinessTips: 'Ensure your employer registers with the Fast-Track Procedure for Skilled Workers (Beschleunigtes Fachkräfteverfahren) via local Ausländerbehörde.',
    officialPortal: 'https://service.berlin.de/dienstleistung/324659/'
  },
  {
    id: 'visa-nl-search',
    country: 'Netherlands',
    flag: '🇳🇱',
    visaType: 'Orientation Year (Zoekjaar) High Education',
    category: 'Job Seeker',
    processingTime: '4–6 weeks',
    minIncome: 'Proof of subsistence (~€1,500/mo)',
    costUsd: {
      embassyFee: 220,
      vfsFee: 42,
      blockedAccountOrProof: 14000,
      translationApostille: 150
    },
    keyEligibility: [
      'Graduated within the past 3 years from a top 200 global university (THE/QS/ARWU)',
      'Or completed Master/PhD in the Netherlands',
      'Complete freedom of work in the Dutch labor market without IND work permit requirement'
    ],
    documentsRequired: [
      'Valid passport',
      'Certified degree certificate & Nuffic statement of equivalence',
      'English proficiency proof (IELTS 6.0+)',
      'IND application form 7525'
    ],
    easinessTips: 'Transition to Highly Skilled Migrant status before the Zoekjaar expires; reduced salary criterion applies (€2,801 gross/mo in 2026).',
    officialPortal: 'https://ind.nl/en/residence-permits/work/orientation-year-highly-educated-persons'
  },
  {
    id: 'visa-es-nomad',
    country: 'Spain',
    flag: '🇪🇸',
    visaType: 'Digital Nomad Visa (Ley de Startups)',
    category: 'Digital Nomad',
    processingTime: '3–6 weeks',
    minIncome: '€2,646/mo (~200% Spanish minimum wage)',
    costUsd: {
      embassyFee: 95,
      vfsFee: 35,
      blockedAccountOrProof: 32000,
      translationApostille: 180
    },
    keyEligibility: [
      'Work remotely for clients or employers located outside Spain',
      'Minimum 1 year remote work experience or relevant university degree',
      'Eligible for Beckham Law flat 24% tax rate up to €600,000 for 6 tax years'
    ],
    documentsRequired: [
      'Passport (1 year validity)',
      'Remote employment contract or freelance retainer contracts (3+ months old)',
      'Employer letter permitting 100% remote telework in Spain',
      'Bank statements proving 3x minimum wage',
      'Private Spanish healthcare policy (no copayments)',
      'Apostilled criminal record certificate (last 2 years)'
    ],
    easinessTips: 'Applying as a tourist directly inside Spain grants a 3-year residency authorization directly via UGE-CE, saving embassy waiting times.',
    officialPortal: 'https://prie.comercio.gob.es/'
  },
  {
    id: 'visa-pt-d8',
    country: 'Portugal',
    flag: '🇵🇹',
    visaType: 'D8 Digital Nomad Visa & Tech Visa',
    category: 'Digital Nomad',
    processingTime: '8–12 weeks',
    minIncome: '€3,280/mo (4x Portuguese national minimum wage)',
    costUsd: {
      embassyFee: 98,
      vfsFee: 32,
      blockedAccountOrProof: 39500,
      translationApostille: 150
    },
    keyEligibility: [
      'Subordinated employment contract or independent service contract with foreign company',
      'Fiscal domicile and bank account in Portugal (NIF + Portuguese IBAN)',
      'Proof of 1-year residential lease agreement in Portugal'
    ],
    documentsRequired: [
      'Biometric Passport',
      'Proof of NIF and active Portuguese bank account with deposit',
      'Registered rental contract (Contrato de Arrendamento with Finanças stamp)',
      'Remote employment contracts & 6 months pay stubs',
      'Apostilled police clearance with certified translation'
    ],
    easinessTips: 'Secure your NIF (tax number) and virtual IBAN remotely via certified Portuguese fiscal representatives before booking your consulate slot.',
    officialPortal: 'https://vistos.mne.gov.pt/'
  },
  {
    id: 'visa-ro-work',
    country: 'Romania',
    flag: '🇷🇴',
    visaType: 'Long-Stay Employment Visa (Type D/AM 2026 Drive)',
    category: 'Work',
    processingTime: '6–10 weeks',
    minIncome: 'Minimum statutory wage (~€850/mo)',
    costUsd: {
      embassyFee: 120,
      vfsFee: 40,
      blockedAccountOrProof: 0,
      translationApostille: 130
    },
    keyEligibility: [
      'Approved Work Notice (Aviz de Angajare) issued by General Inspectorate for Immigration (IGI)',
      'Direct employer sponsorship with paid accommodation and flight subsidy',
      'Mass quota expansion for non-EU workers in construction, logistics, and tourism'
    ],
    documentsRequired: [
      'Original Work Notice issued by IGI Romania',
      'Individual employment contract registered with REVISAL',
      'Criminal record check certified and apostilled',
      'Medical certificate clearing infectious diseases',
      'Travel medical insurance for 90 days validity'
    ],
    easinessTips: 'Work notices must be validated via the IGI online portal by your Romanian employer. Avoid unauthorized middlemen who promise work notices without verifiable IGI registration codes.',
    officialPortal: 'https://igi.mai.gov.ro/'
  }
];

export const RECRUITMENT_HEADLINES: RecruitmentHeadline[] = [
  {
    id: 'head-1',
    title: 'Germany Expands 2027 Chancenkarte Fast-Track Quota for Non-EU Engineering & AI Specialists',
    source: 'Federal Ministry of the Interior (BMI) Berlin',
    date: 'October 24, 2026',
    countries: ['Germany', 'EU-Wide'],
    sectors: ['IT & Software', 'Civil & Mechanical Engineering', 'Green Energy'],
    summary: 'The German Federal Government has approved a 30% expansion in consular interview allotments for skilled tech professionals, lowering language barriers for verified shortage fields.',
    tag: 'Government Quota'
  },
  {
    id: 'head-2',
    title: 'Romania and Croatia Open Q4 2026 Accelerated Work Authorization Drives for Logistics and Hospitality',
    source: 'European Labor Authority (ELA) Bulletin',
    date: 'October 21, 2026',
    countries: ['Romania', 'Croatia'],
    sectors: ['Logistics & Warehousing', 'Hospitality & Gastronomy', 'Construction'],
    summary: 'Bilateral agreements allow pre-vetted employers to issue online Work Notices (Aviz) in under 21 calendar days to counter winter and spring labor deficits.',
    tag: 'Fast-Track'
  },
  {
    id: 'head-3',
    title: 'Portugal Implements Fully Digitalized Expression of Interest Successor System for Skilled Talent',
    source: 'AIMA (Agency for Integration, Migration and Asylum) Lisbon',
    date: 'October 18, 2026',
    countries: ['Portugal'],
    sectors: ['IT', 'Financial Services', 'Renewable Tech'],
    summary: 'The new streamlined digital workflow replaces backlog-prone manual queues, giving university graduates with confirmed job contracts an automated 60-day visa path.',
    tag: 'Breaking'
  },
  {
    id: 'head-4',
    title: 'Italy Prepares Decreta Flussi 2027 Non-EU Labor Quota Release for Healthcare and Technical Cadres',
    source: 'Ministry of Labour and Social Policies Rome',
    date: 'October 15, 2026',
    countries: ['Italy'],
    sectors: ['Healthcare & Nursing', 'Agriculture', 'Industrial Manufacturing'],
    summary: 'Over 150,000 non-EU work visas will be apportioned starting January 2027, with priority click-days earmarked for certified nursing aides and mechanical technicians.',
    tag: 'Bilateral Accord'
  },
  {
    id: 'head-5',
    title: 'Poland Industrial & Logistics Corridor Opens 45,000 Dedicated Work Permits for Qualified Technicians',
    source: 'Ministry of Family and Social Policy Warsaw',
    date: 'October 10, 2026',
    countries: ['Poland'],
    sectors: ['Automotive', 'Electronics Assembly', 'Cross-Border Supply Chain'],
    summary: 'Streamlined voivodeship processing allows international workers to receive Type A work authorizations with standardized multilingual documentation.',
    tag: 'Fast-Track'
  }
];

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Android / Kotlin Engineer (Relocation)',
    company: 'N26 Mobile Banking',
    location: 'Berlin, Germany',
    country: 'Germany',
    salaryEstimate: '€88,000 - €96,000',
    providesRelocation: true,
    blueCardEligible: true,
    postedAgo: '3h ago',
    stage: 'interview',
    sector: 'FinTech / Software',
    notes: 'Stage 2 Technical screen completed. Relocation package includes €4,000 settling-in grant and 1 month temporary flat.'
  },
  {
    id: 'job-2',
    title: 'Cloud DevOps Platform Specialist',
    company: 'Booking Holdings Inc.',
    location: 'Amsterdam, Netherlands',
    country: 'Netherlands',
    salaryEstimate: '€92,000 - €104,000',
    providesRelocation: true,
    blueCardEligible: true,
    postedAgo: '1d ago',
    stage: 'applied',
    sector: 'Travel Tech',
    notes: 'Eligible for Dutch 30% ruling tax benefit. Application submitted via direct referral.'
  },
  {
    id: 'job-3',
    title: 'Full Stack TypeScript & AI Systems Developer',
    company: 'Bolt Technology',
    location: 'Tallinn, Estonia',
    country: 'Estonia',
    salaryEstimate: '€70,000 - €82,000',
    providesRelocation: true,
    blueCardEligible: true,
    postedAgo: '2d ago',
    stage: 'wishlist',
    sector: 'Mobility & AI',
    notes: 'Estonian digital residence friendly. Fast-track start-up visa sponsorship.'
  },
  {
    id: 'job-4',
    title: 'Backend Go Specialist (Core Banking)',
    company: 'Revolut Europe',
    location: 'Dublin, Ireland',
    country: 'Ireland',
    salaryEstimate: '€85,000 - €95,000',
    providesRelocation: false,
    blueCardEligible: true,
    postedAgo: '3d ago',
    stage: 'offer',
    sector: 'Banking & Payments',
    notes: 'Critical Skills Employment Permit documents received from HR. Offer letter signed!'
  },
  {
    id: 'job-5',
    title: 'Hospitality Operations & Guest Services Lead',
    company: 'Kempinski Grand Hotel',
    location: 'Brasov, Romania',
    country: 'Romania',
    salaryEstimate: '€32,000 - €38,000 (All meals & accommodation included)',
    providesRelocation: true,
    blueCardEligible: false,
    postedAgo: '4d ago',
    stage: 'wishlist',
    sector: 'Hospitality & Tourism',
    notes: 'Direct employer sponsorship through Q4 2026 hospitality quota drive.'
  },
  {
    id: 'job-6',
    title: 'Semiconductor Lithography System Engineer',
    company: 'ASML Europe',
    location: 'Veldhoven, Netherlands',
    country: 'Netherlands',
    salaryEstimate: '€95,000 - €112,000',
    providesRelocation: true,
    blueCardEligible: true,
    postedAgo: '5d ago',
    stage: 'applied',
    sector: 'Semiconductors',
    notes: 'High-tech campus sponsor. IND fast-track processing within 2 weeks of visa interview.'
  }
];

export const UPCOMING_HOLIDAYS_DIRECTORY: PublicHoliday[] = [
  {
    id: 'hol-1',
    name: 'Reformation Day (Reformationstag)',
    date: 'Saturday, October 31, 2026',
    country: 'Germany (Selected States)',
    flag: '🇩🇪',
    isDomestic: false,
    officeImpact: 'German consular missions and administrative state offices closed in Northern and Eastern Bundesländer (Hamburg, Berlin, Saxony).'
  },
  {
    id: 'hol-2',
    name: "All Saints' Day (Allerheiligen / Toussaint / Ognissanti)",
    date: 'Sunday, November 1, 2026',
    country: 'Pan-European (France, Italy, Germany, Spain)',
    flag: '🇪🇺',
    isDomestic: false,
    officeImpact: 'Pan-European public holiday; diplomatic services and Schengen consular intake centers operate on holiday schedules.'
  },
  {
    id: 'hol-3',
    name: 'Armistice Day (Jour de l\'Armistice / WWI Peace)',
    date: 'Wednesday, November 11, 2026',
    country: 'France & Belgium',
    flag: '🇫🇷',
    isDomestic: false,
    officeImpact: 'French Embassy, VFS France, and French foreign ministry visa clearing platforms closed nationwide.'
  },
  {
    id: 'hol-4',
    name: 'Constitution Day (Día de la Constitución)',
    date: 'Sunday, December 6, 2026',
    country: 'Spain',
    flag: '🇪🇸',
    isDomestic: false,
    officeImpact: 'Spanish consulates, BLS visa intake centers, and ministry offices closed.'
  },
  {
    id: 'hol-5',
    name: 'Victory Day (Bijoy Dibosh)',
    date: 'Wednesday, December 16, 2026',
    country: 'Bangladesh (Domestic)',
    flag: '🇧🇩',
    isDomestic: true,
    officeImpact: 'All European Embassies and High Commissions based in Dhaka, VFS Global processing centers, and commercial banks fully closed.'
  },
  {
    id: 'hol-6',
    name: 'Christmas Eve & Christmas Day',
    date: 'December 24–25, 2026',
    country: 'EU-Wide & Global',
    flag: '🇪🇺',
    isDomestic: false,
    officeImpact: 'Total closure across all Schengen diplomatic missions, apostille ministries, and global application centers.'
  },
  {
    id: 'hol-7',
    name: 'New Year\'s Eve & New Year\'s Day',
    date: 'December 31, 2026 – January 1, 2027',
    country: 'Pan-European & Global',
    flag: '🌍',
    isDomestic: false,
    officeImpact: 'Diplomatic consular missions, border processing units, and VFS/TLS global intake counters completely closed.'
  }
];

export const INITIAL_TASKS: CalendarTask[] = [
  {
    id: 'task-1',
    title: 'German Embassy Biometrics & Document Intake',
    dateIso: '2026-11-04',
    time: '09:30 AM',
    category: 'embassy',
    notes: 'Bring 2 sets of certified copies, original passport, and printed Sperrkonto confirmation.',
    isCompleted: false
  },
  {
    id: 'task-2',
    title: 'Technical System Design Interview with N26 Berlin',
    dateIso: '2026-11-06',
    time: '02:00 PM',
    category: 'interview',
    notes: 'Focus on distributed ledger architecture, Kotlin Coroutines, and relocation timeline expectations.',
    isCompleted: false
  },
  {
    id: 'task-3',
    title: 'Pick up Apostilled Police Clearance Certificate (PCC)',
    dateIso: '2026-10-29',
    time: '11:00 AM',
    category: 'document',
    notes: 'Verify Hague seal sticker is completely legible and no spelling variance in full legal name.',
    isCompleted: true
  },
  {
    id: 'task-4',
    title: 'Orientation Scouting Flight to Frankfurt & Berlin',
    dateIso: '2026-11-18',
    time: '07:45 AM',
    category: 'flight',
    notes: 'LH 765 ticket reserved. Verify Schengen visa validity dates against 90-day rolling tracker.',
    isCompleted: false
  }
];

export const INITIAL_TRIPS: TripPlan[] = [
  {
    id: 'trip-1',
    destination: 'Frankfurt to Berlin (ICE 792 High-Speed Rail)',
    departureDate: '2026-11-19',
    returnDate: '2026-11-24',
    budgetEur: 480.0,
    transportMode: 'High-speed Rail (ICE/TGV)',
    bookingRef: 'DB-PNR-883921',
    notes: 'Apartment viewings scheduled in Prenzlauer Berg and Charlottenburg. Germany-Ticket utilized for S-Bahn.'
  },
  {
    id: 'trip-2',
    destination: 'Amsterdam Centraal to Brussels Midi (Eurostar)',
    departureDate: '2026-12-02',
    returnDate: '2026-12-05',
    budgetEur: 320.0,
    transportMode: 'High-speed Rail (ICE/TGV)',
    bookingRef: 'ESTAR-552190',
    notes: 'Attending European Skilled Migration Summit & IND consular consultations.'
  }
];
