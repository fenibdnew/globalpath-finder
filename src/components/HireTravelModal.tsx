import React from 'react';
import { X, Heart, MapPin, Compass, Mail, Sparkles, Award, Globe, ExternalLink, MessageCircle } from 'lucide-react';
import { CANONICAL_CORE_JSON } from '../data/mockData';

interface HireTravelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireTravelModal: React.FC<HireTravelModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tribute = CANONICAL_CORE_JSON.developer_tribute;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Banner with gradient */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-emerald-900 via-indigo-950 to-slate-950 text-white border-b border-emerald-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950/40 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-3">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Award className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Official Creator & Visionary Architect
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            ARIFUZZAMAN
          </h2>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-emerald-200 mt-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>East Bijoy Singh, Feni, Bangladesh</span>
          </div>
        </div>

        {/* Tribute & Invitation Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed overflow-y-auto max-h-[60vh]">
          
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-emerald-300">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Developer Acknowledgement:</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              "{tribute.acknowledgement}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-slate-100 flex items-center space-x-1.5 text-xs">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Hire & International Travel Guide Invitation:</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              "{tribute.hire_invitation}"
            </p>
          </div>

          {/* Quick Connect Options */}
          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-bold text-slate-200 block">Direct Inquiries & Travel Collaboration:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="mailto:arifuzzamanfenibdnew2@gmail.com"
                className="flex items-center space-x-2 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400">Direct Email</span>
                  <span className="text-xs font-semibold truncate block max-w-[180px]">arifuzzamanfenibdnew2@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center space-x-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200">
                <Globe className="w-4 h-4 text-blue-400" />
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400">Location Origin</span>
                  <span className="text-xs font-semibold">Feni, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>GlobalPath Finder • Protected Origin Credit</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
