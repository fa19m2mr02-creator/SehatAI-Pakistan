import React, { useState } from 'react';
import { Stethoscope, PhoneCall, ShieldCheck, HeartPulse, Globe, Menu, X, Sparkles, Building2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/pakistanData';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenEmergency: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  onOpenEmergency,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg text-white">
      {/* Top Pakistan Emergency Alert Bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-slate-300 px-4 py-1.5 text-xs sm:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Pakistan Healthcare AI
            </span>
            <span className="hidden sm:inline text-slate-400">
              PMDC Verified Doctors & AI Triage Ecosystem
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-0.5 rounded-full font-semibold transition-all shadow-sm animate-pulse cursor-pointer"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Rescue 1122 / Edhi 115</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2.5 py-0.5 rounded-full border border-slate-700 transition-colors cursor-pointer font-mono"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{language === 'en' ? 'اردو (Urdu)' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('hero')}>
            <div className="relative w-11 h-11 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-slate-950 shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-[8px] font-bold">
                🇵🇰
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white">Sehat<span className="text-cyan-400">AI</span></span>
                <span className="bg-teal-900/80 text-teal-300 border border-teal-700/60 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">PK</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Smart Healthcare & PMDC Telemedicine
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <button 
              onClick={onOpenEmergency}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer bg-rose-950/60 border border-rose-800/80 px-3 py-1 rounded-xl"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>Emergency Portal</span>
            </button>

            <button 
              onClick={() => handleNavClick('triage')}
              className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Symptom Triage</span>
            </button>

            <button 
              onClick={() => handleNavClick('lab')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Lab Reader
            </button>

            <button 
              onClick={() => handleNavClick('doctors')}
              className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>PMDC Doctors</span>
            </button>

            <button 
              onClick={() => handleNavClick('hospitals')}
              className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Hospitals & ICU</span>
            </button>

            <button 
              onClick={() => handleNavClick('sehatcard')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Sehat Card
            </button>

            <button 
              onClick={() => handleNavClick('pricing')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('doctors')}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Book Doctor (PKR 500+)</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <button
            onClick={() => {
              onOpenEmergency();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 font-bold flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>🚨 Immediate Emergency Portal</span>
          </button>
          <button
            onClick={() => handleNavClick('triage')}
            className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-800 text-cyan-300 font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI Symptom Triage</span>
          </button>
          <button
            onClick={() => handleNavClick('lab')}
            className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200 font-medium"
          >
            AI Lab Report Reader
          </button>
          <button
            onClick={() => handleNavClick('doctors')}
            className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4 text-teal-400" />
            <span>PMDC Verified Doctors</span>
          </button>
          <button
            onClick={() => handleNavClick('hospitals')}
            className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200 font-medium flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Hospitals & ICU Directory</span>
          </button>
          <button
            onClick={() => handleNavClick('sehatcard')}
            className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200 font-medium"
          >
            Sehat Sahulat Program
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-800 text-slate-200 font-medium"
          >
            Pricing & Packages
          </button>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('doctors')}
              className="w-full bg-teal-500 text-slate-950 text-center py-2.5 rounded-xl font-extrabold text-sm"
            >
              Book PMDC Doctor
            </button>
            <button
              onClick={onOpenEmergency}
              className="w-full bg-rose-600 text-white text-center py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Emergency 1122 / 115</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

