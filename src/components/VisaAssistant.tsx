import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckSquare, 
  Globe2, 
  Plus, 
  Trash2, 
  Search, 
  CheckCircle2, 
  DollarSign, 
  ExternalLink, 
  Loader2, 
  Printer, 
  FileDown, 
  FileCheck2,
  FileSpreadsheet
} from 'lucide-react';
import { ChecklistItem, AiChatMessage } from '../types';
import { VISA_REQUIREMENTS_DIRECTORY } from '../data/mockData';
import { askGeminiAssistant } from '../services/geminiService';
import { ChecklistPdfModal } from './ChecklistPdfModal';
import { generateEmbassyChecklistPdf } from '../services/pdfGenerator';
import { PrintableChecklist } from './PrintableChecklist';

interface VisaAssistantProps {
  checklist: ChecklistItem[];
  onToggleChecklist: (id: string) => void;
  onAddChecklist: (title: string, category: ChecklistItem['category']) => void;
  onDeleteChecklist: (id: string) => void;
}

export const VisaAssistant: React.FC<VisaAssistantProps> = ({
  checklist,
  onToggleChecklist,
  onAddChecklist,
  onDeleteChecklist
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'checklist' | 'ai' | 'directory'>('checklist');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  
  // Gemini Chat state
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'gemini',
      text: "Hello! I am your EuroPath Gemini Relocation Assistant (Synced to October 27, 2026). Ask me about European work permits, EU Blue Card thresholds, Chancenkarte points, digital nomad paths, or consular costs in USD.",
      timestamp: '10:00 AM'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Checklist state
  const [checklistSearch, setChecklistSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<ChecklistItem['category']>('Legalization');

  // Country Directory search
  const [countrySearch, setCountrySearch] = useState('');

  const quickChips = [
    "Germany Chancenkarte 2026/2027 requirements",
    "EU Blue Card minimum salary thresholds",
    "Spain Digital Nomad Visa (Ley de Startups)",
    "Schengen 90/180-Day Rule calculation",
    "Full breakdown of consular costs in USD",
    "How to apostille documents & avoid fraudulent agents"
  ];

  const handleSendPrompt = async (promptText: string) => {
    const textToSend = promptText.trim();
    if (!textToSend || isAiThinking) return;

    const userMsg: AiChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsAiThinking(true);

    try {
      const result = await askGeminiAssistant(textToSend);
      const botMsg: AiChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'gemini',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structuredData: result.structuredData
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'gemini',
          text: "I experienced a temporary network latency. Please query again or review the Country Rules tab.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  // Filtered Checklist
  const filteredChecklist = checklist.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(checklistSearch.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(checklistSearch.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const completedCount = checklist.filter(c => c.isCompleted).length;
  const completionPercentage = Math.round((completedCount / (checklist.length || 1)) * 100);

  // Quick direct 1-click vector PDF export
  const handleQuickPdfDownload = () => {
    generateEmbassyChecklistPdf(checklist, {
      applicantName: 'Principal Applicant',
      passportNumber: 'A-88291034',
      targetCountry: 'Germany',
      visaType: 'Chancenkarte (Opportunity Card 2026/2027)',
      appointmentDate: 'November 04, 2026',
      intakeCenter: 'German Embassy / VFS Global Dhaka',
      dossierNumber: `EPF-2026-VFS-${Math.floor(1000 + Math.random() * 9000)}`
    });
  };

  // Direct window.print() trigger targeting 'printable-embassy-checklist' element
  const handleDirectPrint = () => {
    const printableElement = document.getElementById('printable-embassy-checklist');
    if (printableElement) {
      printableElement.setAttribute('data-print-ready', 'true');
    }
    window.print();
  };

  // Filtered Countries
  const filteredCountries = VISA_REQUIREMENTS_DIRECTORY.filter(item => 
    item.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
    item.visaType.toLowerCase().includes(countrySearch.toLowerCase()) ||
    item.category.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      
      {/* Hidden container dedicated to window.print() media query */}
      <PrintableChecklist checklist={checklist} />

      {/* Floating Action Button (FAB) on Euro Visa screen specifically triggering window.print() targeting '#printable-embassy-checklist' */}
      <div className="fixed bottom-24 sm:bottom-8 right-5 sm:right-8 z-50 no-print">
        <button
          id="euro-visa-floating-print-fab"
          data-target="#printable-embassy-checklist"
          onClick={handleDirectPrint}
          aria-label="Print Document Checklist targeting #printable-embassy-checklist"
          title="Print official document checklist to clean PDF (targets #printable-embassy-checklist)"
          className="relative flex items-center space-x-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-2xl shadow-blue-500/50 border border-blue-400/40 transition-all transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-blue-500/30 cursor-pointer"
        >
          {/* Live radar ping indicator */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>

          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-inner">
            <Printer className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="leading-tight font-black tracking-wide">Print Checklist</span>
            <span className="text-[10px] text-blue-200 font-semibold leading-none">PDF Print Ready</span>
          </div>
        </button>
      </div>

      {/* Sub-tab Navigation with Consolidated PDF Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-px gap-3">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
              activeSubTab === 'checklist'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Document Checklist ({completedCount}/{checklist.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ai')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
              activeSubTab === 'ai'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Gemini Visa AI</span>
          </button>

          <button
            onClick={() => setActiveSubTab('directory')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
              activeSubTab === 'directory'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>Country Rules ({VISA_REQUIREMENTS_DIRECTORY.length})</span>
          </button>
        </div>

        {/* Embassy PDF Checklist Generator Action Buttons Toolbar */}
        <div className="flex items-center space-x-2 pb-2 sm:pb-1 no-print">
          {/* Printer Icon Button in Toolbar calling window.print() targeting #printable-embassy-checklist */}
          <button
            id="euro-visa-toolbar-print-btn"
            onClick={handleDirectPrint}
            data-target="#printable-embassy-checklist"
            aria-label="Print Embassy Document Checklist targeting #printable-embassy-checklist"
            title="Print Embassy Document Checklist (#printable-embassy-checklist)"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 hover:border-blue-500 transition-all shadow-sm flex items-center space-x-1.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Printer className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Print Checklist</span>
            <span className="sm:hidden">Print</span>
          </button>

          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all transform hover:-translate-y-0.5"
            title="Generate consolidated printable PDF document checklist for embassy appointments"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Consular Dossier PDF</span>
            <span className="md:hidden">Dossier PDF</span>
          </button>

          <button
            onClick={handleQuickPdfDownload}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="1-Click Instant Download (.pdf)"
          >
            <FileDown className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: DOCUMENT CHECKLIST */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-5">
          
          {/* Progress Bar & Embassy PDF Callout Header */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-100 text-base">Relocation Document Dossier</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    EMBASSY DOSSIER READY
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fulfill all required identity, legal, financial, and insurance instruments for official consular appointment intake.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400">Readiness</span>
                  <div className="text-lg font-black text-blue-400">{completionPercentage}% ({completedCount}/{checklist.length})</div>
                </div>

                <button
                  onClick={handleDirectPrint}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-600/20 transition-all no-print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print Checklist PDF</span>
                  <span className="sm:hidden">Print PDF</span>
                </button>
              </div>
            </div>

            {/* Progress Meter */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-2 flex-1">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={checklistSearch}
                    onChange={e => setChecklistSearch(e.target.value)}
                    placeholder="Filter documents (e.g. Passport, Apostille, Insurance, Blocked Account)..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleDirectPrint}
                  aria-label="Print Document Checklist"
                  title="Print Embassy Document Checklist (#printable-embassy-checklist)"
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-950 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 transition-colors flex items-center space-x-1.5 no-print"
                >
                  <Printer className="w-4 h-4 text-blue-400 hover:text-white" />
                  <span className="hidden sm:inline text-xs font-bold">Print</span>
                </button>
              </div>

              <div className="flex items-center space-x-1 overflow-x-auto pb-1">
                {['All', 'Identity', 'Legalization', 'Finance', 'Housing', 'Insurance'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                      selectedCategory === cat 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add Custom Document Requirement Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <span className="text-xs font-bold text-slate-300 block mb-2">Add Custom Document / Requirement:</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newDocTitle}
                onChange={e => setNewDocTitle(e.target.value)}
                placeholder="Requirement title (e.g., Sworn German translation of university transcript)..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <select
                value={newDocCategory}
                onChange={e => setNewDocCategory(e.target.value as any)}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Legalization">Legalization</option>
                <option value="Identity">Identity</option>
                <option value="Finance">Finance</option>
                <option value="Housing">Housing</option>
                <option value="Insurance">Insurance</option>
                <option value="Custom">Custom</option>
              </select>
              <button
                onClick={() => {
                  if (newDocTitle.trim()) {
                    onAddChecklist(newDocTitle.trim(), newDocCategory);
                    setNewDocTitle('');
                  }
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {/* Document Checklist Items */}
          <div className="space-y-2.5">
            {filteredChecklist.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No checklist documents match your search criteria.
              </div>
            ) : (
              filteredChecklist.map(item => (
                <div
                  key={item.id}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    item.isCompleted 
                      ? 'bg-slate-950/60 border-slate-800/80 opacity-75' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => onToggleChecklist(item.id)}
                      className="mt-0.5"
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <div className="w-5 h-5 rounded border border-slate-600 hover:border-blue-400 transition-colors" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs sm:text-sm font-semibold ${
                          item.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
                        }`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteChecklist(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Consolidated Print Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-blue-300 flex items-center">
                <FileCheck2 className="w-4 h-4 mr-1.5 text-blue-400" />
                Consular Appointment Document Dossier
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Generate the consolidated physical document checklist with statutory signature boxes, Hague apostille verification column, and consular stamp grid.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDirectPrint}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20 whitespace-nowrap"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document (PDF)</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: GEMINI VISA AI */}
      {activeSubTab === 'ai' && (
        <div className="space-y-4">
          
          {/* Quick Suggestion Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap flex items-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1" /> Quick Queries:
            </span>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(chip)}
                disabled={isAiThinking}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white whitespace-nowrap transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 min-h-[420px] max-h-[560px] overflow-y-auto space-y-4">
            {messages.map(msg => {
              const isBot = msg.sender === 'gemini';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                >
                  <div className={`max-w-[88%] sm:max-w-2xl rounded-2xl p-4 sm:p-5 ${
                    isBot 
                      ? 'bg-slate-950/80 border border-slate-800 text-slate-200' 
                      : 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  }`}>
                    
                    {/* Message Header */}
                    <div className="flex items-center justify-between space-x-4 mb-2 pb-2 border-b border-white/10 text-xs">
                      <span className="font-bold flex items-center space-x-1.5">
                        {isBot ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-blue-300 font-extrabold">Gemini Visa Advisor</span>
                          </>
                        ) : (
                          <span>You</span>
                        )}
                      </span>
                      <span className="text-slate-400 text-[10px]">{msg.timestamp}</span>
                    </div>

                    {/* Main Text Content */}
                    <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed space-y-2">
                      {msg.text}
                    </div>

                    {/* Structured Cards (If available) */}
                    {msg.structuredData && (
                      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 bg-slate-900/60 -mx-2 -mb-2 p-3 rounded-xl border">
                        
                        {/* Visa Type & Country */}
                        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                          <span>{msg.structuredData.targetCountry}</span>
                          <span className="text-blue-400">{msg.structuredData.visaType}</span>
                        </div>

                        {/* Cost in USD Table */}
                        {msg.structuredData.costUsd && (
                          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                            <div className="font-semibold text-amber-300 mb-1 flex items-center">
                              <DollarSign className="w-3 h-3 mr-1" /> Estimated Cost Breakdown (USD):
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                              <div>Embassy Fee: <strong>${msg.structuredData.costUsd.embassyFee}</strong></div>
                              <div>VFS Service Fee: <strong>${msg.structuredData.costUsd.vfsFee}</strong></div>
                              <div>Translations / Apostille: <strong>${msg.structuredData.costUsd.translation}</strong></div>
                              {msg.structuredData.costUsd.blockedAccount > 0 && (
                                <div className="text-blue-400">Blocked Account: <strong>${msg.structuredData.costUsd.blockedAccount.toLocaleString()}</strong></div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Documents required array */}
                        {msg.structuredData.documentsRequired && (
                          <div className="text-xs">
                            <span className="font-semibold text-slate-300 block mb-1">Required Documents:</span>
                            <div className="flex flex-wrap gap-1">
                              {msg.structuredData.documentsRequired.map((doc, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                                  {doc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Easiness Tips */}
                        {msg.structuredData.easinessTips && (
                          <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300">
                            <strong>Official Tip:</strong> {msg.structuredData.easinessTips}
                          </div>
                        )}

                        {/* Quick Print Checklist trigger from AI response */}
                        <div className="pt-1 flex justify-end space-x-2">
                          <button
                            onClick={handleDirectPrint}
                            className="text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                          >
                            <Printer className="w-3 h-3" />
                            <span>Print Checklist PDF</span>
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {isAiThinking && (
              <div className="flex items-center space-x-2 text-xs text-blue-400 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gemini is cross-referencing European immigration statutory codes for 2026/2027...</span>
              </div>
            )}
          </div>

          {/* Query Input Bar */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendPrompt(inputPrompt)}
              placeholder="Ask about visas (e.g. Chancenkarte, Blue Card salaries, PCC, Sperrkonto)..."
              className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSendPrompt(inputPrompt)}
              disabled={isAiThinking || !inputPrompt.trim()}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm flex items-center space-x-1.5 transition-colors shadow-md shadow-blue-500/20"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* SUB-TAB 3: COUNTRY FAST-TRACKS DIRECTORY */}
      {activeSubTab === 'directory' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={countrySearch}
              onChange={e => setCountrySearch(e.target.value)}
              placeholder="Search country or permit (e.g. Germany, Chancenkarte, Nomad, Blue Card)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCountries.map(req => (
              <div 
                key={req.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{req.flag}</span>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm sm:text-base">{req.country}</h4>
                      <span className="text-xs text-blue-400 font-semibold">{req.visaType}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {req.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <div>Processing: <strong className="text-white">{req.processingTime}</strong></div>
                  <div>Income Req: <strong className="text-emerald-400">{req.minIncome}</strong></div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <span className="font-semibold text-slate-200">Key Criteria:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                    {req.keyEligibility.map((el, i) => (
                      <li key={i}>{el}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-800/30 text-[11px] text-blue-200">
                  <strong>Easiness Advice:</strong> {req.easinessTips}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Embassy Fee: <strong>${req.costUsd.embassyFee}</strong></span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleDirectPrint}
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print Checklist</span>
                    </button>
                    <a
                      href={req.officialPortal}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-1 text-slate-400 hover:text-white font-semibold"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Embassy Checklist PDF Modal */}
      <ChecklistPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        checklist={checklist}
      />

    </div>
  );
};
