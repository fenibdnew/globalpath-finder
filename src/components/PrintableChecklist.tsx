import React from 'react';
import { ChecklistItem } from '../types';
import { CURRENT_DATE_STRING } from '../data/mockData';

interface PrintableChecklistProps {
  checklist: ChecklistItem[];
  applicantName?: string;
  targetCountry?: string;
  visaType?: string;
  dossierNumber?: string;
  intakeCenter?: string;
  appointmentDate?: string;
}

export const PrintableChecklist: React.FC<PrintableChecklistProps> = ({
  checklist,
  applicantName = 'Principal Applicant',
  targetCountry = 'Germany (Federal Republic)',
  visaType = 'Chancenkarte (Opportunity Card 2026/2027)',
  dossierNumber = 'EPF-2026-VFS-7892',
  intakeCenter = 'German Embassy / VFS Global Intake Mission',
  appointmentDate = 'November 04, 2026'
}) => {
  const completedCount = checklist.filter(c => c.isCompleted).length;
  const totalCount = checklist.length;
  const percent = Math.round((completedCount / (totalCount || 1)) * 100);

  return (
    <div
      id="printable-embassy-checklist"
      className="hidden print:block bg-white text-slate-900 font-sans text-xs p-6 space-y-4"
    >
      {/* Top Consular Header */}
      <div className="border-b-2 border-blue-900 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-black text-blue-900 tracking-tight">
              EUROPEAN UNION IMMIGRATION & CONSULAR SERVICES
            </h1>
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-800 mt-0.5">
              OFFICIAL DOSSIER DOCUMENT CHECKLIST & INTAKE PROTOCOL
            </h2>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Statutory Standard Regulation (EU) 2016/1191 • Generated: {CURRENT_DATE_STRING}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-900 font-mono font-bold text-xs border border-blue-300">
              {dossierNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Dossier Information Grid */}
      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded border border-slate-300 text-[11px]">
        <div>
          <span className="text-[9px] text-slate-500 block font-bold">APPLICANT LEGAL NAME:</span>
          <strong className="text-slate-900">{applicantName}</strong>
        </div>
        <div>
          <span className="text-[9px] text-slate-500 block font-bold">TARGET MEMBER STATE:</span>
          <strong className="text-blue-900">{targetCountry}</strong>
        </div>
        <div>
          <span className="text-[9px] text-slate-500 block font-bold">PASSPORT / IDENTIFIER:</span>
          <strong className="font-mono text-slate-900">A-88291034</strong>
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
          <span className="text-[9px] text-slate-500 block font-bold">INTAKE MISSION:</span>
          <span className="text-slate-800 font-medium">{intakeCenter}</span>
        </div>
      </div>

      {/* Status Readiness Banner */}
      <div className="bg-blue-900 text-white px-3 py-1.5 rounded flex items-center justify-between text-[11px] font-bold">
        <span>
          DOCUMENT READINESS: {completedCount} OF {totalCount} INSTRUMENTS PREPARED ({percent}% COMPLIANCE)
        </span>
        <span className="text-[10px] text-blue-200">
          {completedCount === totalCount ? '✓ ALL MANDATORY INSTRUMENTS FULFILLED' : '⚠️ PROCEED WITH PENDING INSTRUMENTS'}
        </span>
      </div>

      {/* Checklist Table */}
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr className="bg-slate-100 border-y border-slate-300 text-left text-slate-700">
            <th className="py-2 px-2.5 w-20">STATUS</th>
            <th className="py-2 px-2.5 w-24">CATEGORY</th>
            <th className="py-2 px-2.5">DOCUMENT INSTRUMENT & LEGAL SPECIFICATION</th>
            <th className="py-2 px-2.5 w-24 text-center">OFFICER CHECK</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {checklist.map(item => (
            <tr key={item.id}>
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
                <div className="w-10 h-4 border border-slate-400 rounded mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Consular Warning Note */}
      <div className="bg-amber-50 border border-amber-200 p-2.5 rounded text-[10px] text-amber-900 leading-relaxed">
        <strong>Statutory Notice to Visa Applicant:</strong> All academic diplomas, police clearances, and civil status instruments must carry the 1961 Hague Apostille seal and certified sworn translation. Arrange two complete physical dossier sets in identical sequence. Consular officers verify financial liquidity directly via digital banking portals.
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

      {/* Bottom Footer */}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-500">
        <span>EuroPath Finder • Official European Consular Dossier System</span>
        <span>Valid for Consular Intake in 2026/2027 • DIN A4 / ISO 216</span>
      </div>
    </div>
  );
};
