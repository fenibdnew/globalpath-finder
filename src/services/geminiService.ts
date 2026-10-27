export interface GeminiQueryResult {
  text: string;
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

export async function askGeminiAssistant(userPrompt: string): Promise<GeminiQueryResult> {
  const query = userPrompt.trim();
  if (!query) {
    return {
      text: "Please enter a question regarding European visas, recruitment opportunities, or relocation procedures."
    };
  }

  // Attempt server-side Gemini call first
  try {
    const res = await fetch('/api/gemini/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: query })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.text) {
        return {
          text: data.text
        };
      }
    }
  } catch {
    // Continue to local intelligent relocation engine
  }

  // Simulated / Offline Knowledge Engine for EuroPath 2026/2027
  const lower = query.toLowerCase();

  if (lower.includes('chancenkarte') || (lower.includes('opportunity') && lower.includes('card')) || (lower.includes('germany') && lower.includes('job'))) {
    return {
      text: `🇩🇪 **Germany Chancenkarte (Opportunity Card 2026/2027)**:
The points-based Opportunity Card allows qualified third-country nationals to enter Germany for up to 1 year to search for employment, with secondary rights to work part-time up to 20 hours per week.

• **Eligibility**: Recognized degree/vocational training + A1 German or B2 English; minimum score of 6 points on the statutory grid (age, qualification, language, previous German stay).
• **Cost Breakdown (USD)**: Embassy application fee ~$85, VFS handling charge ~$38, Sperrkonto blocked account deposit ~$12,850 (€1,027/mo), Document translations ~$160.
• **Key Documents**: Valid passport, ZAB Statement of Comparability, Language certificate, Europass CV, Blocked account confirmation, Schengen insurance.
• **Easiness Tip**: Do not pay agents. Apply directly via the German Consular Services Portal (Auswärtiges Amt). Pre-verify your university on Anabin.`,
      structuredData: {
        targetCountry: 'Germany',
        visaType: 'Chancenkarte (Opportunity Card 2026/2027)',
        eligibility: 'Score 6+ points under the federal points grid, or possess full German degree comparability plus basic language skills.',
        documentsRequired: [
          'Valid National Biometric Passport',
          'ZAB Statement of Comparability for university degree',
          'Proof of German (A1) or English (B2) language proficiency',
          'Blocked Account (Sperrkonto) with €12,850 balance',
          'Detailed Europass CV and motivational statement',
          'Schengen Health Insurance with €30,000 minimum limit'
        ],
        costUsd: {
          embassyFee: 85,
          vfsFee: 38,
          blockedAccount: 12850,
          translation: 160
        },
        easinessTips: 'Book appointment early via official Auswärtiges Amt portal. Never buy fake blocked account letters; embassies cross-verify with Fintiba/Coracle directly.'
      }
    };
  }

  if (lower.includes('blue card') || lower.includes('salary')) {
    return {
      text: `🇪🇺 **EU Blue Card (2026 Regulations)**:
The EU Blue Card provides high-skilled professionals with an expedited route to European residence and permanent settlement.

• **Germany 2026 Threshold**: Gross minimum annual salary is ~€45,300 for bottleneck fields (IT, engineering, medicine, natural sciences) and ~€50,000 for standard occupations.
• **Fast-Track PR**: You can achieve permanent residency (Niederlassungserlaubnis) in only 21 months with B1 German certification, or 27 months with basic A1 German.
• **Family Benefits**: Spouses obtain unrestricted full-time work authorization immediately without requiring initial German language certificates.
• **Costs in USD**: Embassy fee $85, VFS processing $38, Sworn document translations $140. No blocked account deposit required since you have an active salary contract.`,
      structuredData: {
        targetCountry: 'Germany / EU-Wide',
        visaType: 'EU Blue Card (Blaue Karte)',
        eligibility: 'Binding job contract of >= 6 months with accredited EU employer meeting salary thresholds.',
        documentsRequired: [
          'Biometric Passport',
          'Signed Employment Contract & Job Description (Erklärung zum Beschäftigungsverhältnis)',
          'Recognized University Degree Certificate with German sworn translation',
          'Curriculum Vitae',
          'Proof of German statutory health insurance (Krankenkasse confirmation)'
        ],
        costUsd: {
          embassyFee: 85,
          vfsFee: 38,
          blockedAccount: 0,
          translation: 140
        },
        easinessTips: 'Ask your employer to initiate the Fast-Track Procedure for Skilled Workers (Beschleunigtes Fachkräfteverfahren) with the local immigration office for faster visa clearing.'
      }
    };
  }

  if (lower.includes('schengen') || lower.includes('90/180') || lower.includes('90 day') || lower.includes('buffer')) {
    return {
      text: `📅 **Schengen 90/180-Day Rolling Compliance Rule**:
Non-EEA citizens visiting the Schengen zone for tourism, business meetings, or short visits can stay for a maximum of **90 days within any 180-day rolling window**.

• **How the Calculation Works**: On every single day you are inside the Schengen Area, count backwards exactly 180 calendar days. If the cumulative sum of days spent equals or exceeds 90, you are not allowed to be present.
• **National D Visas Exception**: Time spent under a national Long-Stay Visa (Type D) or residence permit issued by a specific member state does NOT consume your 90 tourist days for that host nation, though intra-Schengen travel still adheres to short-stay caps.
• **Penalties**: Overstaying can trigger Schengen Information System (SIS) bans ranging from 1 to 3 years and heavy fines upon border exit. Use EuroPath's Smart Calendar tracker to stay safe!`,
      structuredData: {
        targetCountry: '29 Schengen Member States',
        visaType: 'Schengen Short-Stay Uniform Visa (Type C)',
        eligibility: 'Tourist, business traveler, conference attendee, or visiting family.',
        documentsRequired: [
          'Passport with at least 3 months validity beyond intended exit date',
          'Flight itinerary with return ticket confirmation',
          'Proof of accommodation reservation',
          'Bank statement showing minimum €45–€75 per day of intended stay',
          'Travel medical insurance (€30,000 coverage)'
        ],
        costUsd: {
          embassyFee: 95,
          vfsFee: 35,
          blockedAccount: 0,
          translation: 60
        },
        easinessTips: 'Always check entry and exit stamps at border control to prevent discrepancies in the rolling 180-day log.'
      }
    };
  }

  if (lower.includes('nomad') || lower.includes('spain') || lower.includes('remote') || lower.includes('portugal')) {
    return {
      text: `🏝️ **European Digital Nomad Visas (2026/2027)**:
Top destinations for remote tech talent and teleworkers:

• **Spain (Ley de Startups)**:
  - Minimum monthly earnings: ~€2,646 (200% Spanish minimum wage).
  - Tax advantage: Beckham Law election provides a flat 24% rate on income up to €600k.
  - Can apply as a tourist inside Spain for an immediate 3-year residency authorization!

• **Portugal (D8 Digital Nomad)**:
  - Minimum monthly earnings: ~€3,280 (4x national minimum wage).
  - Requires registered Portuguese lease agreement and active NIF / Portuguese bank account.

• **Estonia**: Digital nomad visa allows 1-year residency for employees of companies registered abroad.`,
      structuredData: {
        targetCountry: 'Spain / Portugal',
        visaType: 'Digital Nomad Residence Permit (Ley de Startups / D8)',
        eligibility: 'Remote contracts with companies situated outside the host country; minimum 1 year professional experience or relevant degree.',
        documentsRequired: [
          'Biometric Passport',
          'Remote employment contract or freelance client retainers',
          'Proof of required monthly income over last 3–6 months',
          'Apostilled criminal record check (PCC)',
          'Private comprehensive health insurance policy with no copay'
        ],
        costUsd: {
          embassyFee: 95,
          vfsFee: 35,
          blockedAccount: 32000,
          translation: 180
        },
        easinessTips: 'Ensure remote employer explicitly states in writing that you are authorized to telework from European territory without establishing a permanent corporate branch.'
      }
    };
  }

  if (lower.includes('hiring') || lower.includes('job') || lower.includes('recruitment') || lower.includes('headline')) {
    return {
      text: `💼 **2026/2027 European Recruitment & Hiring Outlook**:
Key highlights across active markets:

1. **Germany**: 2026/2027 accelerated Chancenkarte fast-track quotas for software engineers, cloud architects, industrial automation, and civil engineers.
2. **Romania & Croatia**: Massive expansion in online Work Notice (Aviz de Angajare) allocations across logistics, hospitality, culinary arts, and transport sectors.
3. **Portugal**: Newly digitized Expression of Interest platform expedites technical work permit conversion for non-EU university graduates.
4. **Netherlands**: High demand for semiconductor lithography, green tech, and financial data specialists under the 30% tax ruling scheme.
5. **Italy**: Decreta Flussi 2027 opens over 150,000 labor slots prioritizing healthcare workers, logistics operators, and technical mechanics.`,
      structuredData: {
        targetCountry: 'Germany, Romania, Croatia, Portugal, Netherlands',
        visaType: 'EU Employment / Fast-Track Work Notice',
        eligibility: 'Recognized professional credentials or verifiable trade experience in listed shortage occupations.',
        documentsRequired: [
          'Valid Passport',
          'Verified Employer Job Offer / Contract',
          'Educational Diplomas with Hague Apostille',
          'Police Clearance Certificate',
          'Medical clearance certificate'
        ],
        costUsd: {
          embassyFee: 110,
          vfsFee: 40,
          blockedAccount: 0,
          translation: 150
        },
        easinessTips: 'Check whether your prospective employer is registered with government talent sponsorship lists to bypass standard labor market testing.'
      }
    };
  }

  if (lower.includes('cost') || lower.includes('fee') || lower.includes('usd') || lower.includes('blocked account')) {
    return {
      text: `💰 **European Relocation Cost Breakdown in USD (2026 Guide)**:
Here is what you must budget for realistic embassy and arrival procedures:

1. **Embassy Visa Fees**:
   - Germany National Visa (Type D): ~$85 (approx. €75)
   - Netherlands Long-Stay Entry (MVV): ~$220
   - Spain / Portugal National Visa: ~$95–$98
2. **VFS Global / TLScontact Handling Charges**:
   - Biometric processing, document intake, and courier return: ~$35 to ~$45.
3. **Financial Proof / Blocked Accounts**:
   - Germany Sperrkonto: ~$12,850 (€1,027/month for 12 months).
   - Netherlands Zoekjaar subsistence: ~$14,000.
   - Spain Nomad: ~$32,000 annual equivalent.
4. **Legalization, Apostille & Translations**:
   - Sworn court translation per document: ~$30–$50.
   - Hague Apostille verification per certificate: ~$25–$40.
   - PCC (Police Certificate): ~$20–$50 depending on home jurisdiction.
5. **Incoming Schengen Insurance**:
   - 1-Year incoming policy meeting €30k requirements: ~$180 to ~$350.`,
      structuredData: {
        targetCountry: 'Schengen & Western Europe',
        visaType: 'Standard National Long-Stay (Type D)',
        eligibility: 'All work, study, and job seeker applicants.',
        documentsRequired: [
          'Passport',
          'Official application forms',
          'Financial solvency receipts',
          'Apostilled civil status documents'
        ],
        costUsd: {
          embassyFee: 85,
          vfsFee: 38,
          blockedAccount: 12850,
          translation: 160
        },
        easinessTips: 'Never pay intermediary agency packages charging $3,000–$5,000 for standard form submissions. Consulates operate open appointments.'
      }
    };
  }

  // General European immigration response
  return {
    text: `🌍 **EuroPath Immigration Advisory**:
For legal relocation to European Union member states in 2026/2027:

• **Direct Consular Submission**: Always submit visa files through official portals (such as the German Auswärtiges Amt portal, French France-Visas, or Dutch IND system) or authorized contractors (VFS Global / BLS / TLScontact).
• **Legalization Rules**: Ensure degrees and police clearances feature the 1961 Hague Convention Apostille seal, paired with certified translations from a sworn translator.
• **Financial Sufficiency**: Prepare 6 months of certified bank statements showing consistent cash flow or establish a regulated blocked account (Sperrkonto).
• **Travel Medical Coverage**: Secure incoming health insurance with a minimum €30,000 guarantee covering hospital admission and emergency medical repatriation across all 29 Schengen states.`,
    structuredData: {
      targetCountry: 'European Union / Schengen',
      visaType: 'National Long-Stay Residence Visa (Type D)',
      eligibility: 'Skilled professionals, university graduates, remote workers, and job seekers meeting respective national criteria.',
      documentsRequired: [
        'Biometric Passport with at least 12 months validity',
        'Academic or Vocational Credentials with Apostille',
        'Certified Police Clearance Certificate (PCC)',
        'Incoming Travel Medical Insurance (€30,000 limit)',
        'Verifiable Proof of Financial Means / Blocked Account'
      ],
      costUsd: {
        embassyFee: 85,
        vfsFee: 38,
        blockedAccount: 12850,
        translation: 160
      },
      easinessTips: 'Avoid agents who guarantee visas. Only accredited consular officers have statutory authority to approve visa issuances.'
    }
  };
}
