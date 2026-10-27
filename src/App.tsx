import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  FileText, 
  Briefcase, 
  CalendarDays, 
  Plane, 
  Wifi, 
  Battery, 
  Signal, 
  Layers
} from 'lucide-react';
import { 
  NavTab, 
  ChecklistItem, 
  JobOpening, 
  CalendarTask, 
  TripPlan, 
  ApplicationStage 
} from './types';
import { 
  INITIAL_CHECKLIST, 
  INITIAL_JOBS, 
  INITIAL_TASKS, 
  INITIAL_TRIPS 
} from './data/mockData';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { VisaAssistant } from './components/VisaAssistant';
import { JobTracker } from './components/JobTracker';
import { SmartCalendar } from './components/SmartCalendar';
import { TravelPlanner } from './components/TravelPlanner';
import { JsonModal } from './components/JsonModal';
import { HireTravelModal } from './components/HireTravelModal';

const STORAGE_KEYS = {
  CHECKLIST: 'europath_checklist_v1',
  JOBS: 'europath_jobs_v1',
  TASKS: 'europath_tasks_v1',
  TRIPS: 'europath_trips_v1',
  SCHENGEN: 'europath_schengen_v1',
  DARK_MODE: 'europath_darkmode_v1',
  PHONE_FRAME: 'europath_phoneframe_v1'
};

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // JSON Modal state
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);

  // Hire & Travel Portal modal state
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Phone Frame Emulator
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PHONE_FRAME);
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Checklist State
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });

  // Jobs State
  const [jobs, setJobs] = useState<JobOpening[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  // Tasks State
  const [tasks, setTasks] = useState<CalendarTask[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Trips State
  const [trips, setTrips] = useState<TripPlan[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRIPS);
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  // Schengen Days Spent
  const [schengenDaysSpent, setSchengenDaysSpent] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHENGEN);
    return saved ? JSON.parse(saved) : 38;
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHENGEN, JSON.stringify(schengenDaysSpent));
  }, [schengenDaysSpent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PHONE_FRAME, JSON.stringify(isPhoneFrame));
  }, [isPhoneFrame]);

  // Handlers
  const handleToggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const handleAddChecklist = (title: string, category: ChecklistItem['category']) => {
    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      title,
      category,
      isCompleted: false,
      priority: 'Medium'
    };
    setChecklist(prev => [newItem, ...prev]);
  };

  const handleDeleteChecklist = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const handleAddJob = (job: JobOpening) => {
    setJobs(prev => [job, ...prev]);
  };

  const handleUpdateJobStage = (id: string, stage: ApplicationStage) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, stage } : job
    ));
  };

  const handleDeleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const handleAddTask = (task: CalendarTask) => {
    setTasks(prev => [task, ...prev]);
  };

  const handleUpdateTask = (task: CalendarTask) => {
    setTasks(prev => prev.map(t => t.id === task.id ? task : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleTaskComplete = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    ));
  };

  const handleAddTrip = (trip: TripPlan) => {
    setTrips(prev => [trip, ...prev]);
  };

  const handleDeleteTrip = (id: string) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  // Main Core Screen Content
  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={tab => setActiveTab(tab)}
            checklist={checklist}
            jobs={jobs}
            tasks={tasks}
            trips={trips}
            schengenDaysSpent={schengenDaysSpent}
          />
        );
      case 'visa':
        return (
          <VisaAssistant
            checklist={checklist}
            onToggleChecklist={handleToggleChecklist}
            onAddChecklist={handleAddChecklist}
            onDeleteChecklist={handleDeleteChecklist}
          />
        );
      case 'jobs':
        return (
          <JobTracker
            jobs={jobs}
            onAddJob={handleAddJob}
            onUpdateJobStage={handleUpdateJobStage}
            onDeleteJob={handleDeleteJob}
          />
        );
      case 'calendar':
        return (
          <SmartCalendar
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleTaskComplete={handleToggleTaskComplete}
            schengenDaysSpent={schengenDaysSpent}
            onUpdateSchengenDays={setSchengenDaysSpent}
          />
        );
      case 'travel':
        return (
          <TravelPlanner
            trips={trips}
            onAddTrip={handleAddTrip}
            onDeleteTrip={handleDeleteTrip}
          />
        );
      default:
        return null;
    }
  };

  // Nav Items
  const navTabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Overview', icon: <Compass className="w-5 h-5" /> },
    { id: 'visa', label: 'Euro Visa', icon: <FileText className="w-5 h-5" />, badge: checklist.filter(c => !c.isCompleted).length },
    { id: 'jobs', label: 'Jobs EU', icon: <Briefcase className="w-5 h-5" />, badge: jobs.filter(j => j.stage === 'interview').length },
    { id: 'calendar', label: 'Smart Cal', icon: <CalendarDays className="w-5 h-5" />, badge: tasks.filter(t => !t.isCompleted).length },
    { id: 'travel', label: 'Travel Hub', icon: <Plane className="w-5 h-5" /> }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col font-sans transition-colors duration-200`}>
      
      {/* Top Universal App Bar */}
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(prev => !prev)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenHireModal={() => setIsHireModalOpen(true)}
        schengenDaysSpent={schengenDaysSpent}
        onNavigateToCalendar={() => setActiveTab('calendar')}
      />

      {/* Main Container - Supports Simulated Android Device Frame or Responsive Desktop Layout */}
      <div className={`flex-1 flex justify-center ${isPhoneFrame ? 'py-6 px-4 bg-slate-900/40' : 'py-6 px-4 sm:px-6'}`}>
        
        {isPhoneFrame ? (
          /* ANDROID PHONE FRAME VIEWPORT */
          <div className="relative w-full max-w-[420px] h-[860px] bg-slate-950 border-[10px] border-slate-800 rounded-[48px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-slate-700/50">
            
            {/* Simulated Android Status Bar */}
            <div className="h-8 bg-slate-950 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-400 select-none z-30">
              <span>09:41</span>
              {/* Dynamic Camera Punch Hole */}
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800"></div>
              <div className="flex items-center space-x-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Android Screen Header */}
            <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {navTabs.find(t => t.id === activeTab)?.label}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Pixel 7 • API 34</span>
            </div>

            {/* Android Scrollable Viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {renderScreen()}
            </div>

            {/* Android Bottom Navigation Bar */}
            <nav className="h-16 bg-slate-900/95 border-t border-slate-800 flex items-center justify-around px-2 z-20">
              {navTabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
                      isActive 
                        ? 'text-blue-400 font-bold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-500/15' : ''}`}>
                      {tab.icon}
                    </div>
                    <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
                    {Boolean(tab.badge && tab.badge > 0) && (
                      <span className="absolute top-0.5 right-3 w-4 h-4 rounded-full bg-blue-600 text-[9px] text-white font-black flex items-center justify-center">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Android Navigation Pill Indicator */}
            <div className="h-4 bg-slate-900 flex items-center justify-center pb-1">
              <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
            </div>

          </div>
        ) : (
          /* RESPONSIVE FULLSCREEN DASHBOARD VIEW */
          <div className="w-full max-w-7xl mx-auto flex flex-col">
            
            {/* Desktop Navigation Tabs */}
            <div className="mb-6 flex border-b border-slate-800 overflow-x-auto scrollbar-none">
              {navTabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-all relative ${
                      isActive
                        ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-xl'
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {Boolean(tab.badge && tab.badge > 0) && (
                      <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs font-black bg-blue-600/30 text-blue-300 border border-blue-500/30">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Screen Content */}
            <div className="flex-1 pb-16">
              {renderScreen()}
            </div>

          </div>
        )}

      </div>

      {/* Synchronized Core JSON Modal */}
      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
      />

      {/* Creator Tribute & Hire Portal Modal */}
      <HireTravelModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />

    </div>
  );
}
