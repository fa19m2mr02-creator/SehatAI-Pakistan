import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Stethoscope, ArrowRight, Activity, CheckCircle2, Users, MapPin } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, SAMPLE_SYMPTOMS_PAKISTAN } from '../data/pakistanData';
import heroBannerImg from '../assets/images/hero_pakistan_ai_health_1784971261099.jpg';
import aiDoctorAvatar from '../assets/images/ai_doctor_avatar_1784971310688.jpg';
import { getDoctorAvatarFallback } from '../utils/imageUtils';

interface HeroProps {
  language: Language;
  onQuickStartTriage: (symptomText: string) => void;
  onNavigateToDoctors?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onQuickStartTriage, onNavigateToDoctors }) => {
  const [quickInput, setQuickInput] = useState('');
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onQuickStartTriage(quickInput.trim());
    }
  };

  const handlePresetClick = (text: string) => {
    setQuickInput(text);
    onQuickStartTriage(text);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-16 lg:py-24 border-b border-slate-800">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Interactive Quick Triage Bar */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* National Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-teal-500/30 text-teal-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>🇵🇰 Designed for Pakistan • Urdu & English AI Health Assessment</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t.heroTitle}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Quick Interactive Symptom Input Box */}
            <div className="bg-slate-900/90 p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-800 space-y-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Instant AI Health Assessment
                </span>
                <span className="font-mono text-teal-400">Type in Roman Urdu or English</span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="e.g. Do din se bukhar aur sar dard hai, gale mein jalan..."
                  className="flex-1 bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3.5 text-sm sm:text-base text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Check with AI</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>

              {/* Preset Symptom Chips for quick testing */}
              <div className="pt-1">
                <p className="text-[11px] text-slate-400 font-medium mb-1.5">Tap sample symptom to test:</p>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_SYMPTOMS_PAKISTAN.slice(0, 3).map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetClick(s.text)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700/80 px-3 py-1.5 rounded-xl transition-all text-left truncate max-w-xs cursor-pointer"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigateToDoctors?.()}
                className="flex items-center gap-3 cursor-pointer text-left hover:bg-slate-900/60 p-1.5 rounded-xl transition-all"
                title="View PMDC Verified Doctors"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">PMDC Aligned</div>
                  <div className="text-[11px] text-slate-400">Verified Doctors</div>
                </div>
              </button>

              <div className="flex items-center gap-3 p-1.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">24/7 AI Care</div>
                  <div className="text-[11px] text-slate-400">Urdu & English</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-1.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sehat Card</div>
                  <div className="text-[11px] text-slate-400">100% Free Info</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-1.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Pakistani Cities</div>
                  <div className="text-[11px] text-slate-400">KHI, LHR, ISL...</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-slate-900">
              <img
                src={heroBannerImg}
                alt="Pakistani Doctor with AI Diagnostic Device"
                className="w-full h-[400px] sm:h-[460px] object-cover opacity-90"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = heroBannerImg;
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Badge 1: Live Consultation Stat */}
              <button
                type="button"
                onClick={() => onNavigateToDoctors?.()}
                className="absolute top-4 left-4 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-teal-500/50 flex items-center gap-3 cursor-pointer hover:scale-102 transition-all text-left group"
                title="Click to consult PMDC Specialists"
              >
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping shrink-0" />
                <div>
                  <div className="text-xs font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                    <span>2,500+ PMDC Specialists</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-[10px] text-cyan-300 font-medium">Available for Video Calls (Click to Book)</div>
                </div>
              </button>

              {/* Floating Badge 2: AI Triage Counter */}
              <button
                type="button"
                onClick={() => onQuickStartTriage('')}
                className="absolute bottom-4 left-4 right-4 bg-slate-950/95 hover:bg-slate-900 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-white flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all text-left group"
                title="Click to open AI Symptom Triage"
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={aiDoctorAvatar}
                      alt="National Health Triage Profile"
                      className="w-10 h-10 rounded-xl object-cover border border-teal-500/50 group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getDoctorAvatarFallback('Dr. Sehat AI');
                      }}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-300">National Health Triage</div>
                    <div className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                      <span>Free Instant Symptom Scan</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-teal-400">99.2%</div>
                  <div className="text-[10px] text-slate-400">Triage Accuracy</div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
