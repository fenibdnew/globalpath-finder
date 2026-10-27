import React from 'react';
import { 
  Compass, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  Code, 
  Calendar, 
  ShieldAlert,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { CURRENT_DATE_STRING } from '../data/mockData';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onOpenJsonModal: () => void;
  onOpenHireModal: () => void;
  schengenDaysSpent: number;
  onNavigateToCalendar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleDarkMode,
  isPhoneFrame,
  onTogglePhoneFrame,
  onOpenJsonModal,
  onOpenHireModal,
  schengenDaysSpent,
  onNavigateToCalendar
}) => {
  const remainingSchengen = 90 - schengenDaysSpent;
  const isOverstay = schengenDaysSpent > 90;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        
        {/* Brand & Date */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Compass className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                GlobalPath Finder
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                GLOBAL VISA HUB 2026
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-blue-400" />
                <span className="font-medium text-slate-300">{CURRENT_DATE_STRING}</span>
              </span>
              <span className="hidden md:inline text-slate-600">•</span>
              <span className="hidden md:flex items-center space-x-1 text-slate-400">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>By Arifuzzaman (Feni, BD)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Tools */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Hire & Travel Portal Trigger */}
          <button
            onClick={onOpenHireModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
            title="Hire & Travel Portal: Connect with Creator Arifuzzaman"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hire & Travel Portal</span>
            <span className="sm:hidden">Hire</span>
          </button>

          {/* Schengen Quick Meter Pill */}
          <button
            onClick={onNavigateToCalendar}
            className={`hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              isOverstay
                ? 'bg-rose-950/60 border-rose-700 text-rose-300 animate-pulse'
                : schengenDaysSpent > 75
                ? 'bg-amber-950/60 border-amber-700 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-blue-500'
            }`}
            title="Click to view Schengen 90/180 compliance engine"
          >
            {isOverstay ? (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
            <span>
              Schengen: <strong className={isOverstay ? 'text-rose-200' : 'text-blue-300'}>
                {isOverstay ? `${schengenDaysSpent - 90}d Overstay!` : `${remainingSchengen}d Left`}
              </strong>
            </span>
          </button>

          {/* JSON Output Modal Trigger */}
          <button
            onClick={onOpenJsonModal}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-950/70 text-indigo-300 border border-indigo-700/60 hover:bg-indigo-900/60 transition-colors"
            title="Inspect clean JSON data matching GlobalPath Finder Core specification"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Core JSON</span>
          </button>

          {/* Phone Frame Toggle */}
          <button
            onClick={onTogglePhoneFrame}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              isPhoneFrame
                ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title={isPhoneFrame ? "Switch to Fullscreen Dashboard" : "Switch to Android Phone View"}
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Phone View</span>
              </>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>
        </div>

      </div>
    </header>
  );
};
