import React, { useState } from 'react';
import { 
  Calendar, 
  CalendarDays, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Search, 
  AlertTriangle, 
  Landmark, 
  ShieldCheck, 
  X,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import { CalendarTask, PublicHoliday } from '../types';
import { CURRENT_DATE_STRING, UPCOMING_HOLIDAYS_DIRECTORY } from '../data/mockData';

interface SmartCalendarProps {
  tasks: CalendarTask[];
  onAddTask: (task: CalendarTask) => void;
  onUpdateTask: (task: CalendarTask) => void;
  onDeleteTask: (id: string) => void;
  onToggleTaskComplete: (id: string) => void;
  schengenDaysSpent: number;
  onUpdateSchengenDays: (days: number) => void;
}

export const SmartCalendar: React.FC<SmartCalendarProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTaskComplete,
  schengenDaysSpent,
  onUpdateSchengenDays
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'schengen' | 'holidays'>('tasks');
  
  // Tasks state
  const [taskSearch, setTaskSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<CalendarTask | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('2026-11-05');
  const [formTime, setFormTime] = useState('10:00 AM');
  const [formCategory, setFormCategory] = useState<CalendarTask['category']>('embassy');
  const [formNotes, setFormNotes] = useState('');

  // Holidays search
  const [holidaySearch, setHolidaySearch] = useState('');

  const categoryConfig: Record<CalendarTask['category'], { label: string; icon: string; color: string }> = {
    embassy: { label: 'Embassy / Visa', icon: '🏛️', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    interview: { label: 'Job Interview', icon: '💼', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    flight: { label: 'Travel / Flight', icon: '✈️', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    document: { label: 'Legal / Translation', icon: '📄', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
                          task.notes.toLowerCase().includes(taskSearch.toLowerCase());
    const matchesCat = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const openNewTaskModal = () => {
    setEditingTask(null);
    setFormTitle('');
    setFormDate('2026-11-05');
    setFormTime('10:00 AM');
    setFormCategory('embassy');
    setFormNotes('');
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task: CalendarTask) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormDate(task.dateIso);
    setFormTime(task.time);
    setFormCategory(task.category);
    setFormNotes(task.notes);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title: formTitle.trim(),
        dateIso: formDate,
        time: formTime.trim(),
        category: formCategory,
        notes: formNotes.trim()
      });
    } else {
      onAddTask({
        id: `task-${Date.now()}`,
        title: formTitle.trim(),
        dateIso: formDate,
        time: formTime.trim(),
        category: formCategory,
        notes: formNotes.trim(),
        isCompleted: false
      });
    }
    setIsTaskModalOpen(false);
  };

  // Schengen calculations
  const remainingDays = 90 - schengenDaysSpent;
  const isOverstay = schengenDaysSpent > 90;
  const isWarning = schengenDaysSpent >= 75 && !isOverstay;
  const progressRatio = Math.min((schengenDaysSpent / 90) * 100, 100);

  const filteredHolidays = UPCOMING_HOLIDAYS_DIRECTORY.filter(h => 
    h.name.toLowerCase().includes(holidaySearch.toLowerCase()) ||
    h.country.toLowerCase().includes(holidaySearch.toLowerCase()) ||
    h.officeImpact.toLowerCase().includes(holidaySearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Live Date Synced Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-amber-400 font-bold tracking-wider">LIVE TEMPORAL ANCHOR</div>
            <h3 className="font-extrabold text-slate-100 text-base sm:text-lg">{CURRENT_DATE_STRING}</h3>
            <span className="text-xs text-slate-400">Central European Time (CET / UTC+1) Reference</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">Embassies & Consular Platforms Synced</span>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-800 space-x-1 sm:space-x-2 pb-px overflow-x-auto">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'tasks'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Scheduled Tasks ({tasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('schengen')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'schengen'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Schengen 90/180 Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('holidays')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'holidays'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Diplomatic Holidays ({UPCOMING_HOLIDAYS_DIRECTORY.length})</span>
        </button>
      </div>

      {/* SUB-TAB 1: TASKS */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={taskSearch}
                  onChange={e => setTaskSearch(e.target.value)}
                  placeholder="Search tasks, biometrics, flight dates..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={openNewTaskModal}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-md shadow-amber-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule Event</span>
              </button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Events ({tasks.length})
              </button>
              {(Object.keys(categoryConfig) as Array<CalendarTask['category']>).map(cat => {
                const count = tasks.filter(t => t.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors whitespace-nowrap flex items-center space-x-1 ${
                      selectedCategory === cat
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{categoryConfig[cat].icon}</span>
                    <span>{categoryConfig[cat].label} ({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center text-xs text-slate-400">
                No scheduled tasks or appointments found.
              </div>
            ) : (
              filteredTasks.map(task => {
                const cat = categoryConfig[task.category];
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      task.isCompleted
                        ? 'bg-slate-950/60 border-slate-800/80 opacity-70'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => onToggleTaskComplete(task.id)}
                        className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <div className="w-5 h-5 rounded border border-slate-600 hover:border-amber-400 transition-colors" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs sm:text-sm font-bold ${
                            task.isCompleted ? 'line-through text-slate-500' : 'text-slate-100'
                          }`}>
                            {task.title}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cat.color}`}>
                            {cat.icon} {cat.label}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-xs text-amber-400/90 font-medium mt-1">
                          <span>📅 {task.dateIso}</span>
                          <span>•</span>
                          <span>⏰ {task.time}</span>
                        </div>

                        {task.notes && (
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                            {task.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openEditTaskModal(task)}
                        className="p-1.5 text-slate-500 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
                        title="Edit task"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* SUB-TAB 2: SCHENGEN ENGINE */}
      {activeTab === 'schengen' && (
        <div className="space-y-6">
          
          <div className={`p-6 rounded-2xl border ${
            isOverstay 
              ? 'bg-rose-950/30 border-rose-800' 
              : isWarning
              ? 'bg-amber-950/30 border-amber-800'
              : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-slate-100 text-lg">
                    Schengen 90/180-Day Rolling Compliance Calculator
                  </h3>
                  {isOverstay && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white animate-pulse">
                      OVERSTAY DETECTED
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Valid across all 29 member states (including Germany, France, Italy, Spain, Switzerland, etc.).
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Compliance Limit</span>
                <div className="text-xl font-black text-slate-200">90 Days / 180-Day Window</div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800 mb-4">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isOverstay 
                    ? 'bg-rose-500' 
                    : isWarning 
                    ? 'bg-amber-500' 
                    : 'bg-gradient-to-r from-blue-500 to-emerald-400'
                }`}
                style={{ width: `${progressRatio}%` }}
              />
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Days Consumed</span>
                <div className="text-2xl font-black text-white">{schengenDaysSpent} Days</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Remaining Buffer</span>
                <div className={`text-2xl font-black ${
                  isOverstay ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {isOverstay ? `${schengenDaysSpent - 90}d EXCEEDED` : `${remainingDays} Days Allowed`}
                </div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400">Status Assessment</span>
                <div className={`text-sm font-bold mt-1 ${
                  isOverstay ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {isOverstay ? '🚨 Risk of Travel Ban' : isWarning ? '⚠️ Low Buffer (<15d)' : '✅ Fully Compliant'}
                </div>
              </div>
            </div>

            {/* Interactive Day Adjustment Controls */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-300 block mb-3">
                Adjust Logged Days Inside Schengen Area:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => onUpdateSchengenDays(Math.max(0, schengenDaysSpent - 7))}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                >
                  -7 Days
                </button>
                <button
                  onClick={() => onUpdateSchengenDays(Math.max(0, schengenDaysSpent - 1))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                  title="Decrement 1 day"
                >
                  <MinusCircle className="w-5 h-5" />
                </button>

                <div className="px-6 py-2 bg-slate-950 border border-slate-700 rounded-xl text-center">
                  <span className="text-2xl font-black text-amber-400">{schengenDaysSpent}</span>
                  <span className="text-xs text-slate-400 block">Logged Days</span>
                </div>

                <button
                  onClick={() => onUpdateSchengenDays(schengenDaysSpent + 1)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                  title="Increment 1 day"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onUpdateSchengenDays(schengenDaysSpent + 7)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                >
                  +7 Days
                </button>
              </div>
            </div>

          </div>

          {/* Statutory Explainer */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-2 text-xs text-slate-300 leading-relaxed">
            <h4 className="font-bold text-slate-100 text-sm">Understanding the 180-Day Rolling Window in 2026:</h4>
            <p>
              • The Schengen rule states: On every single date of stay in the Schengen Area, look back exactly 180 calendar days. The total days present must never exceed 90.
            </p>
            <p>
              • Entry and exit days are both counted as full days spent inside the area.
            </p>
            <p>
              • If holding a national Long-Stay Visa (Type D) or residence permit issued by one member state (e.g. Germany Chancenkarte), your stay in your host state is not limited by the 90-day rule, but trips to other Schengen nations remain restricted to 90 days per 180-day cycle.
            </p>
          </div>

        </div>
      )}

      {/* SUB-TAB 3: HOLIDAYS */}
      {activeTab === 'holidays' && (
        <div className="space-y-4">
          
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={holidaySearch}
                onChange={e => setHolidaySearch(e.target.value)}
                placeholder="Search holiday name, country (Bangladesh, Germany, France), or office impact..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <p className="text-xs text-slate-400">
              Diplomatic consular missions, VFS Global processing centers, and ministry certification desks close on both domestic host-country holidays and sending-country national holidays.
            </p>
          </div>

          <div className="space-y-3">
            {filteredHolidays.map(hol => (
              <div
                key={hol.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 hover:border-slate-700 transition-colors space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{hol.flag}</span>
                    <h4 className="font-bold text-slate-100 text-sm sm:text-base">{hol.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                      {hol.date}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      hol.isDomestic ? 'bg-emerald-500/10 text-emerald-300' : 'bg-blue-500/10 text-blue-300'
                    }`}>
                      {hol.country}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-300">Office & Consular Impact:</strong> {hol.officeImpact}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Task Modal Dialog */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <h3 className="font-bold text-slate-100 text-base">
                {editingTask ? 'Edit Scheduled Event' : 'Schedule New Event'}
              </h3>
              <button 
                onClick={() => setIsTaskModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="e.g. VFS Biometrics Appointment"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Date (YYYY-MM-DD) *</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Time</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={e => setFormTime(e.target.value)}
                    placeholder="e.g. 10:30 AM"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                <select
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="embassy">🏛️ Embassy / Visa Appointment</option>
                  <option value="interview">💼 Job Interview / Technical Screen</option>
                  <option value="flight">✈️ Flight / Relocation Travel</option>
                  <option value="document">📄 Paperwork / Translation / Apostille</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Notes / Checklist</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  placeholder="Required documents to carry, address, appointment confirmation code..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
                >
                  {editingTask ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
