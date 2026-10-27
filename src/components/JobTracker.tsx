import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Building2, 
  MapPin, 
  CheckCircle, 
  Trash2, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  X,
  Filter
} from 'lucide-react';
import { JobOpening, ApplicationStage, RecruitmentHeadline } from '../types';
import { RECRUITMENT_HEADLINES } from '../data/mockData';

interface JobTrackerProps {
  jobs: JobOpening[];
  onAddJob: (job: JobOpening) => void;
  onUpdateJobStage: (id: string, stage: ApplicationStage) => void;
  onDeleteJob: (id: string) => void;
}

export const JobTracker: React.FC<JobTrackerProps> = ({
  jobs,
  onAddJob,
  onUpdateJobStage,
  onDeleteJob
}) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'headlines'>('pipeline');
  
  // Pipeline Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  // Add Job Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSalary, setNewSalary] = useState('€75,000 - €90,000');
  const [newSector, setNewSector] = useState('IT & Software');
  const [newRelocation, setNewRelocation] = useState(true);
  const [newBlueCard, setNewBlueCard] = useState(true);
  const [newNotes, setNewNotes] = useState('');

  const stageOptions: { value: ApplicationStage; label: string; color: string }[] = [
    { value: 'wishlist', label: 'Wishlist / Bookmarked', color: 'bg-slate-700 text-slate-200' },
    { value: 'applied', label: 'Applied', color: 'bg-blue-600 text-white' },
    { value: 'interview', label: 'Interviewing', color: 'bg-amber-600 text-white' },
    { value: 'offer', label: 'Job Offer Received', color: 'bg-emerald-600 text-white' },
    { value: 'rejected', label: 'Closed / Rejected', color: 'bg-rose-900 text-rose-200' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === 'all' || job.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const newJob: JobOpening = {
      id: `job-${Date.now()}`,
      title: newTitle.trim(),
      company: newCompany.trim(),
      location: newLocation.trim() || 'European Union',
      country: newLocation.split(',').pop()?.trim() || 'Germany',
      salaryEstimate: newSalary.trim(),
      providesRelocation: newRelocation,
      blueCardEligible: newBlueCard,
      postedAgo: 'Just now',
      stage: 'wishlist',
      sector: newSector.trim(),
      notes: newNotes.trim()
    };

    onAddJob(newJob);
    setIsAddModalOpen(false);
    // Reset Form
    setNewTitle('');
    setNewCompany('');
    setNewLocation('');
    setNewNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-800 space-x-1 sm:space-x-2 pb-px">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'pipeline'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Applications Pipeline ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('headlines')}
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'headlines'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>2026/2027 Recruitment & Quotas ({RECRUITMENT_HEADLINES.length})</span>
        </button>
      </div>

      {/* PIPELINE TAB */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          
          {/* Controls Bar: Search, Filters, Add Button */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search job title, employer, or EU city..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-md shadow-emerald-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Track New Job</span>
              </button>
            </div>

            {/* Stage Filter Chips */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap flex items-center mr-1">
                <Filter className="w-3 h-3 mr-1" /> Filter:
              </span>
              <button
                onClick={() => setSelectedStage('all')}
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  selectedStage === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All ({jobs.length})
              </button>
              {stageOptions.map(st => {
                const count = jobs.filter(j => j.stage === st.value).length;
                return (
                  <button
                    key={st.value}
                    onClick={() => setSelectedStage(st.value)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                      selectedStage === st.value
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job List Cards */}
          <div className="space-y-3">
            {filteredJobs.length === 0 ? (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center text-xs text-slate-400">
                No job postings found for this search criteria.
              </div>
            ) : (
              filteredJobs.map(job => (
                <div 
                  key={job.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 hover:border-slate-700 transition-all shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-slate-100 text-sm sm:text-base">{job.title}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {job.sector}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center space-x-1 text-slate-300">
                          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{job.company}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-blue-400" />
                          <span>{job.location}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-500 font-mono">{job.postedAgo}</span>
                      <button
                        onClick={() => onDeleteJob(job.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                        title="Delete application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Compensation & Relocation Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-800/40">
                      Est. {job.salaryEstimate}
                    </span>
                    {job.blueCardEligible && (
                      <span className="text-xs font-semibold text-blue-300 bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-800/40">
                        ✓ Blue Card Eligible
                      </span>
                    )}
                    {job.providesRelocation && (
                      <span className="text-xs font-semibold text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-800/40">
                        ✓ Relocation Package
                      </span>
                    )}
                  </div>

                  {job.notes && (
                    <p className="text-xs text-slate-400 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                      {job.notes}
                    </p>
                  )}

                  {/* Pipeline Stage Updater */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Pipeline Status:</span>
                    <select
                      value={job.stage}
                      onChange={e => onUpdateJobStage(job.id, e.target.value as ApplicationStage)}
                      className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="wishlist">Wishlist / Bookmarked</option>
                      <option value="applied">Applied</option>
                      <option value="interview">Interviewing</option>
                      <option value="offer">Job Offer Received</option>
                      <option value="rejected">Closed / Rejected</option>
                    </select>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* HEADLINES TAB */}
      {activeTab === 'headlines' && (
        <div className="space-y-4">
          
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-5 rounded-2xl border border-emerald-800/30">
            <h3 className="font-extrabold text-slate-100 text-base mb-1">
              European Labor Authority & National Quota Bulletins (2026/2027)
            </h3>
            <p className="text-xs text-slate-400">
              Verified statutory updates regarding bilateral migration accords, shortage lists, and work permit allocations across Schengen & EU members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RECRUITMENT_HEADLINES.map(headline => (
              <div 
                key={headline.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {headline.tag}
                    </span>
                    <span className="text-slate-500">{headline.date}</span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-sm sm:text-base leading-snug">
                    {headline.title}
                  </h4>

                  <div className="text-[11px] text-emerald-400 font-medium mt-1">
                    Source: {headline.source}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {headline.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-1 text-[11px] text-slate-400">
                    <span>Active Markets:</span>
                    <strong className="text-slate-200">{headline.countries.join(', ')}</strong>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {headline.sectors.map((sec, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* Add Job Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <h3 className="font-bold text-slate-100 text-base">Track New European Opportunity</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={e => setNewCompany(e.target.value)}
                    placeholder="e.g. Siemens or N26"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    placeholder="e.g. Munich, Germany"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Salary Estimate</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={e => setNewSalary(e.target.value)}
                    placeholder="e.g. €80,000 - €95,000"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Sector</label>
                  <input
                    type="text"
                    value={newSector}
                    onChange={e => setNewSector(e.target.value)}
                    placeholder="e.g. IT & Software"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6 py-1">
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newRelocation}
                    onChange={e => setNewRelocation(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-emerald-500"
                  />
                  <span>Offers Relocation Paid</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newBlueCard}
                    onChange={e => setNewBlueCard(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-emerald-500"
                  />
                  <span>Blue Card Eligible</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  placeholder="Interview dates, recruiter contacts, visa filing details..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
