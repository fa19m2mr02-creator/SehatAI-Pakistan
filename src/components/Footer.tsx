import React from 'react';
import { HeartPulse, ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenEmergency: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmergency, onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-md">
                <HeartPulse className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Sehat<span className="text-cyan-400">AI</span> <span className="text-xs bg-slate-800 text-teal-300 border border-slate-700 px-2 py-0.5 rounded ml-1 font-mono font-bold">PK</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pakistan’s premier AI-powered healthcare landing page and tele-triage platform. Connecting Pakistani patients with PMDC-verified doctors, Sehat Card paneled hospitals, and smart Urdu health insights.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Compliant with WHO & Ministry of Health Guidelines</span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">AI Services</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => onNavigate('triage')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Urdu AI Symptom Triage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lab')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Lab Report & Prescription Reader
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  PMDC Teleconsultation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sehatcard')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Sehat Card Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Cities Covered</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>Karachi (Aga Khan, South City)</li>
              <li>Lahore (Shaukat Khanum, Mayo)</li>
              <li>Islamabad & Rawalpindi (Shifa, CMH)</li>
              <li>Peshawar (Lady Reading, LRH)</li>
              <li>Quetta, Multan, Faisalabad</li>
            </ul>
          </div>

          {/* Emergency Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-rose-400 uppercase tracking-wider">National Emergency</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>Rescue 1122</span>
              </div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>Edhi Ambulance 115</span>
              </div>
              <button
                onClick={onOpenEmergency}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Open Emergency Modal
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-slate-200">Medical Disclaimer:</p>
          <p className="leading-relaxed">
            SehatAI is an artificial intelligence triage and educational information tool designed for preliminary guidance in Pakistan. It is not a substitute for professional medical diagnosis, prescription, or emergency room care. In any life-threatening situation, immediately call Rescue 1122 or visit the nearest hospital emergency department.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SehatAI Pakistan. Made with care for every Pakistani home.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">PMDC Verification</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
