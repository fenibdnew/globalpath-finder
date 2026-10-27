import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Landmark, 
  AlertCircle,
  Sparkles,
  Calendar,
  User,
  CreditCard
} from 'lucide-react';
import { ChecklistItem } from '../types';
import { generateEmbassyChecklistPdf, PdfExportOptions } from '../services/pdfGenerator';
import { CURRENT_DATE_STRING } from '../data/mockData';

interface ChecklistPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklist: ChecklistItem[];
}

export const ChecklistPdfModal: React.FC<ChecklistPdfModalProps> = ({
  isOpen,
  onClose,
  checklist
}) => {
  const [applicantName, setApplicantName] = useState('Principal Applicant');
  const [passportNumber, setPassportNumber] = useState('A-88291034');
  const [targetCountry, setTargetCountry] = useState('Germany');
  const [visaType, setVisaType] = useState('Chancenkarte (Opportunity Card 2026/2027)');
  const [appointmentDate, setAppointmentDate] = useState('November 04, 2026');
  const [intakeCenter, setIntakeCenter] = useState('German Embassy / VFS Global');
  const [dossierNumber] = useState(() => `EPF-2026-VFS-${Math.floor(1000 + Math.random() * 9000)}`);

  const [filterMode, setFilterMode] = useState<'all' | 'verified' | 'pending'>('all');

  if (!isOpen) return null;

  const filteredItems = checklist.filter(item => {
    if (filterMode === 'verified') return item.isCompleted;
    if (filterMode === 'pending') return !item.isCompleted;
    return true;
  });

  const completedCount = checklist.filter(i => i.isCompleted).length;
  const totalCount = checklist.length;
  const completionPercent = Math.round((completedCount / (totalCount || 1)) * 100);

  const exportOptions: PdfExportOptions = {
    applicantName,
    passportNumber,
    targetCountry,
    visaType,
    appointmentDate,
    intakeCenter,
    dossierNumber
  };

  const handleDownloadPdf = () => {
    generateEmbassyChecklistPdf(filteredItems, exportOptions);
  };

  const handleBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-100 text-base">
                Consolidated Embassy Document Checklist
              </h3>
              <p className="text-xs text-slate-400">
                Official print-ready dossier checklist for VFS Global & Schengen consular intake
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleBrowserPrint}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              title="Print via browser dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dialog</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
              title="Download official vector PDF document"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF (.pdf)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Controls & Document Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Customization Parameters Grid */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
                Customize Consular Dossier Header Details:
              </span>
              <span className="text-[11px] font-mono text-blue-400">Ref: {dossierNumber}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Applicant Full Legal Name</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Passport Number</label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={e => setPassportNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Target European Nation</label>
                <select
                  value={targetCountry}
                  onChange={e => setTargetCountry(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="Germany">Germany (Federal Republic)</option>
                  <option value="Netherlands">Netherlands (Kingdom)</option>
                  <option value="Spain">Spain (Kingdom)</option>
                  <option value="Portugal">Portugal (Republic)</option>
                  <option value="Romania">Romania</option>
                  <option value="France">France (Republic)</option>
                  <option value="Italy">Italy (Republic)</option>
                  <option value="Ireland">Ireland</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Visa / Permit Category</label>
                <input
                  type="text"
                  value={visaType}
                  onChange={e => setVisaType(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Appointment Date</label>
                <input
                  type="text"
                  value={appointmentDate}
                  onChange={e => setAppointmentDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Intake Center / Mission</label>
                <input
                  type="text"
                  value={intakeCenter}
                  onChange={e => setIntakeCenter(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Item Filter Switcher */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Include in Checklist:</span>
              <div className="flex items-center space-x-1">
                {(['all', 'verified', 'pending'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setFilterMode(mode)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors capitalize ${
                      filterMode === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {mode === 'all' ? `All (${checklist.length})` : mode === 'verified' ? `Verified (${completedCount})` : `Pending (${totalCount - completedCount})`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Printable Sheet Preview (White A4 Look with Consular Styling) */}
          <div className="border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300 font-semibold">
              <span className="flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Live Document Sheet Preview (Standard ISO A4)</span>
              </span>
              <span className="text-[11px] text-slate-400">Ready for Consular Signature & Stamp</span>
            </div>

            <div id="printable-embassy-checklist" className="bg-white text-slate-900 p-6 sm:p-10 font-sans text-xs space-y-5">
              
              {/* Official Header */}
              <div className="border-b-2 border-blue-900 pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-base sm:text-lg font-black text-blue-900 tracking-tight">
                      EUROPEAN UNION IMMIGRATION & CONSULAR SERVICES
                    </h1>
                    <h2 className="text-xs sm:text-sm font-extrabold text-slate-800 mt-0.5">
                      OFFICIAL DOSSIER DOCUMENT CHECKLIST & INTAKE PROTOCOL
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Regulation (EU) 2016/1191 Standard • Generated: {CURRENT_DATE_STRING}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-blue-100 text-blue-900 font-mono font-bold text-[10px] border border-blue-300">
                      {dossierNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dossier Information Grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded border border-slate-200 text-[11px]">
                <div>
                  <span className="text-[9px] text-slate-500 block font-bold">APPLICANT NAME:</span>
                  <strong className="text-slate-900">{applicantName}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block font-bold">TARGET MEMBER STATE:</span>
                  <strong className="text-blue-900">{targetCountry}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block font-bold">PASSPORT NUMBER:</span>
                  <strong className="font-mono text-slate-900">{passportNumber}</strong>
                </div>
                <div className="pt-1.5">
                  <span className="text-[9px] text-slate-500 block font-bold">VISA / PERMIT CATEGORY:</span>
                  <span className="text-slate-800 font-medium">{visaType}</span>
                </div>
                <div className="pt-1.5">
                  <span className="text-[9px] text-slate-500 block font-bold">APPOINTMENT INTAKE DATE:</span>
                  <span className="text-slate-800 font-medium">{appointmentDate}</span>
                </div>
                <div className="pt-1.5">
                  <span className="text-[9px] text-slate-500 block font-bold">INTAKE CENTER:</span>
                  <span className="text-slate-800 font-medium">{intakeCenter}</span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="bg-blue-900 text-white px-3 py-1.5 rounded flex items-center justify-between text-[11px] font-bold">
                <span>
                  DOCUMENT READINESS: {completedCount} OF {totalCount} INSTRUMENTS PREPARED ({completionPercent}%)
                </span>
                <span className="text-[10px] text-blue-200">
                  {completedCount === totalCount ? '✓ ALL MANDATORY INSTRUMENTS FULFILLED' : '⚠️ PROCEED WITH PENDING INSTRUMENTS'}
                </span>
              </div>

              {/* Checklist Table */}
              <table className="w-full border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 border-y border-slate-300 text-left text-slate-700">
                    <th className="py-2 px-2.5 w-16">STATUS</th>
                    <th className="py-2 px-2.5 w-24">CATEGORY</th>
                    <th className="py-2 px-2.5">DOCUMENT INSTRUMENT & LEGAL SPECIFICATION</th>
                    <th className="py-2 px-2.5 w-24 text-center">OFFICER CHECK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredItems.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-2.5">
                        <span className={`inline-flex items-center space-x-1 font-bold text-[10px] px-1.5 py-0.5 rounded ${
                          item.isCompleted 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {item.isCompleted ? '✓ VERIFIED' : 'PENDING'}
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5 font-bold text-blue-900 text-[10px]">
                        {item.category.toUpperCase()}
                      </td>
                      <td className="py-2.5 px-2.5">
                        <div className="font-bold text-slate-900">{item.title}</div>
                        {item.description && (
                          <div className="text-[10px] text-slate-500 mt-0.5">{item.description}</div>
                        )}
                      </td>
                      <td className="py-2.5 px-2.5 text-center">
                        <div className="w-8 h-4 border border-slate-300 rounded mx-auto"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Consular Warning Note */}
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded text-[10px] text-amber-900 leading-relaxed">
                <strong>Statutory Notice to Visa Applicant:</strong> All academic diplomas, police certificates, and civil status instruments must carry the 1961 Hague Apostille seal and sworn translation. Arrange two complete physical dossier sets in identical sequence. Consular officers verify financial liquidity directly via digital banking portals.
              </div>

              {/* Consular Officer Verification Sign-off Box */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-300 text-[10px]">
                <div className="border border-slate-300 p-2.5 rounded space-y-6">
                  <div>
                    <span className="font-bold text-slate-900 block">APPLICANT DECLARATION & SIGNATURE</span>
                    <span className="text-slate-500">I declare that all submitted instruments are genuine and accurate.</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 text-slate-400">
                    Signature & Date (DD/MM/YYYY)
                  </div>
                </div>

                <div className="border border-slate-300 p-2.5 rounded space-y-6">
                  <div>
                    <span className="font-bold text-slate-900 block">VFS / CONSULAR INTAKE OFFICER VERIFICATION</span>
                    <span className="text-slate-500">Physical seal, biometric stamp, and dossier intake authorization:</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 text-slate-400">
                    Officer Signature, Mission Code & Official Stamp
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Formatted to DIN A4 / ISO 216 standard for high-resolution laser printing</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save & Download PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
