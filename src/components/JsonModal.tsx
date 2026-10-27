import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, Award } from 'lucide-react';
import { CANONICAL_CORE_JSON } from '../data/mockData';

interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JsonModal: React.FC<JsonModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(CANONICAL_CORE_JSON, null, 2);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">GlobalPath Finder Core JSON Output</h3>
              <p className="text-xs text-slate-400">Strict JSON architecture created by Arifuzzaman (Feni, Bangladesh)</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON!' : 'Copy Raw JSON'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Syntax Highlighted JSON container */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300">
          <pre className="whitespace-pre-wrap selection:bg-indigo-500 selection:text-white">
            {jsonString}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Origin: East Bijoy Singh, Feni, Bangladesh • October 27, 2026</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
