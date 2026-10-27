import React from 'react';
import { 
  FileText, 
  Briefcase, 
  CalendarDays, 
  Plane, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Landmark,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { NavTab, ChecklistItem, JobOpening, CalendarTask, TripPlan } from '../types';
import { CURRENT_DATE_STRING, RECRUITMENT_HEADLINES, UPCOMING_HOLIDAYS_DIRECTORY } from '../data/mockData';

interface DashboardProps {
  onNavigate: (tab: NavTab) => void;
  checklist: ChecklistItem[];
  jobs: JobOpening[];
  tasks: CalendarTask[];
  trips: TripPlan[];
  schengenDaysSpent: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  checklist,
  jobs,
  tasks,
  trips,
  schengenDaysSpent
}) => {
  const completedDocs = checklist.filter(c => c.isCompleted).length;
  const activeInterviews = jobs.filter(j => j.stage === 'interview').length;
  const pendingTasks = tasks.filter(t => !t.isCompleted).length;
  const totalBudget = trips.reduce((sum, t) => sum + t.budgetEur, 0);

  const remainingSchengen = 90 - schengenDaysSpent;
  const isOverstay = schengenDaysSpent > 90;
  const schengenPercent = Math.min(Math.round((schengenDaysSpent / 90) * 100), 100);

  const nextHoliday = UPCOMING_HOLIDAYS_DIRECTORY[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 border border-blue-700/50 p-6 sm:p-8 shadow-xl text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>EU Relocation Protocol • Active Synchronized Hub</span>
            </span>
            <span className="text-xs font-medium text-blue-200 bg-slate-900/60 px-3 py-1 rounded-full border border-blue-800">
              {CURRENT_DATE_STRING}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Welcome to <span className="bg-gradient-to-r from-blue-200 via-white to-amber-200 bg-clip-text text-transparent">GlobalPath Finder</span>
          </h2>
          <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl leading-relaxed">
            Architected by Visionary Developer <strong>ARIFUZZAMAN</strong> (East Bijoy Singh, Feni, Bangladesh). Your worldwide command center for global visas, verified 2026/2027 job recruitment quotas, Schengen compliance, and international travel planning.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-slate-950/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="text-xs text-blue-200">Documents Fulfilled</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {completedDocs}<span className="text-xs font-normal text-blue-300">/{checklist.length}</span>
              </div>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="text-xs text-blue-200">Job Pipeline</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {jobs.length}<span className="text-xs font-normal text-emerald-300"> ({activeInterviews} Interv.)</span>
              </div>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="text-xs text-blue-200">Upcoming Tasks</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {pendingTasks}<span className="text-xs font-normal text-amber-300"> Due</span>
              </div>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <div className="text-xs text-blue-200">Trip Budget</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                €{Math.round(totalBudget)}<span className="text-xs font-normal text-blue-300"> ({trips.length} Trips)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schengen 90/180-Day Rolling Buffer Widget (Tappable Banner) */}
      <div 
        onClick={() => onNavigate('calendar')}
        className={`group cursor-pointer rounded-2xl p-5 border transition-all transform hover:-translate-y-0.5 shadow-md ${
          isOverstay
            ? 'bg-rose-950/30 border-rose-800/80 hover:border-rose-600'
            : schengenDaysSpent > 75
            ? 'bg-amber-950/30 border-amber-800/80 hover:border-amber-600'
            : 'bg-slate-900 border-slate-800 hover:border-blue-600'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${
              isOverstay ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/10 text-blue-400'
            }`}>
              {isOverstay ? <AlertTriangle className="w-5 h-5 text-rose-400" /> : <ShieldCheck className="w-5 h-5 text-blue-400" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                  Schengen 90/180-Day Rolling Compliance Engine
                </h3>
                {isOverstay && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                    VIOLATION RISK
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Non-EEA tourist/business allowance: Maximum 90 days stay in any 180-day window.
              </p>
            </div>
          </div>

          <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
            <span className="text-xs text-slate-400">Status Balance</span>
            <span className={`text-base font-extrabold ${isOverstay ? 'text-rose-400' : 'text-emerald-400'}`}>
              {isOverstay ? `${schengenDaysSpent - 90} Days Exceeded!` : `${remainingSchengen} Days Remaining`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isOverstay 
                ? 'bg-rose-500' 
                : schengenDaysSpent > 75 
                ? 'bg-amber-500' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`}
            style={{ width: `${schengenPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
          <span>{schengenDaysSpent} days consumed</span>
          <span className="flex items-center text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
            Open Interactive Calculator <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </span>
        </div>
      </div>

      {/* Core 4 Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-200">Four Core System Modules</h3>
          <span className="text-xs text-slate-400">Instant Navigation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Module 1: Euro Visa */}
          <div 
            onClick={() => onNavigate('visa')}
            className="group cursor-pointer rounded-2xl p-5 bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  GEMINI AI
                </span>
              </div>
              <h4 className="font-bold text-slate-100 text-base mb-1 group-hover:text-blue-300 transition-colors">
                Euro Visa & Documents
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Chancenkarte & Blue Card advisory, official document checklist, USD cost breakdown, and consular portal tips.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400">
              <span>{completedDocs}/{checklist.length} Verified Docs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Job Tracker */}
          <div 
            onClick={() => onNavigate('jobs')}
            className="group cursor-pointer rounded-2xl p-5 bg-slate-900 border border-slate-800 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  2026/2027
                </span>
              </div>
              <h4 className="font-bold text-slate-100 text-base mb-1 group-hover:text-emerald-300 transition-colors">
                Recruitment Tracker
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Real-time government quotas, bilateral drives (Germany, Romania, Croatia), and active job application pipeline.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>{jobs.length} Positions Tracked</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Smart Calendar */}
          <div 
            onClick={() => onNavigate('calendar')}
            className="group cursor-pointer rounded-2xl p-5 bg-slate-900 border border-slate-800 hover:border-amber-500 transition-all hover:shadow-lg hover:shadow-amber-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  HOLIDAYS
                </span>
              </div>
              <h4 className="font-bold text-slate-100 text-base mb-1 group-hover:text-amber-300 transition-colors">
                Universal Calendar
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Bangladesh & European consular bank holidays, biometric appointment scheduler, and Schengen counter.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>{pendingTasks} Due Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 4: Travel Planner */}
          <div 
            onClick={() => onNavigate('travel')}
            className="group cursor-pointer rounded-2xl p-5 bg-slate-900 border border-slate-800 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Plane className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  TICKETING
                </span>
              </div>
              <h4 className="font-bold text-slate-100 text-base mb-1 group-hover:text-purple-300 transition-colors">
                Travel & Ticket Planner
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                European rail booking guides (DB/SNCF), 12h Type D single-entry layover advice, and scouting trip budgets.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-400">
              <span>{trips.length} Scouting Trips</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Section: Live Headlines & Embassy Closures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Dynamic Headlines Preview */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-slate-200 text-sm">2026/2027 Recruitment & Quota Bulletins</h4>
            </div>
            <button
              onClick={() => onNavigate('jobs')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              View All ({RECRUITMENT_HEADLINES.length})
            </button>
          </div>

          <div className="space-y-3">
            {RECRUITMENT_HEADLINES.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                onClick={() => onNavigate('jobs')}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.tag}
                  </span>
                  <span className="text-[11px] text-slate-500">{item.date}</span>
                </div>
                <h5 className="font-semibold text-xs sm:text-sm text-slate-200 line-clamp-1">
                  {item.title}
                </h5>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Consular & Bank Holiday Impact */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Landmark className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-slate-200 text-sm">Next Diplomatic & Intake Closure</h4>
            </div>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              View Calendar
            </button>
          </div>

          {nextHoliday && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-300">
                  {nextHoliday.flag} {nextHoliday.country}
                </span>
                <span className="text-xs font-bold text-slate-300">{nextHoliday.date}</span>
              </div>
              <h5 className="font-bold text-sm text-slate-100">{nextHoliday.name}</h5>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                {nextHoliday.officeImpact}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 mb-1">Subsequent Closures:</div>
            {UPCOMING_HOLIDAYS_DIRECTORY.slice(1, 3).map((hol) => (
              <div 
                key={hol.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs"
              >
                <div className="flex items-center space-x-2">
                  <span>{hol.flag}</span>
                  <span className="font-medium text-slate-200">{hol.name}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">{hol.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
