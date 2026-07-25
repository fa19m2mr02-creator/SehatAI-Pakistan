import React from 'react';
import { Check, Sparkles, Stethoscope, ShieldCheck, HeartPulse } from 'lucide-react';
import { Language } from '../types';

interface PricingSectionProps {
  language: Language;
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ language, onSelectPlan }) => {
  return (
    <section id="pricing" className="py-16 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
            <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
            <span>Affordable PKR Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Healthcare Plans Built for Every Pakistani Home
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            No hidden fees or unexpected charges. Pay easily via JazzCash, EasyPaisa, Sehat Card, or Debit Card.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          
          {/* Plan 1: Basic Awam Plan */}
          <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Forever</span>
              <h3 className="text-xl font-black text-white">Basic Awam Plan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ideal for quick symptom checking and locating local emergency hospitals in Pakistan.
              </p>

              <div className="text-3xl font-extrabold text-white pt-2">
                PKR 0 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>24/7 AI Urdu & English Symptom Triage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Pakistan Hospital & ICU Directory</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Emergency 1122 & Edhi Hotline Directory</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Sehat Card Status Verification Info</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Basic Awam Plan')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              Start Free AI Triage
            </button>
          </div>

          {/* Plan 2: Family Sehat Plan (Featured) */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 border-2 border-teal-500 shadow-2xl relative flex flex-col justify-between space-y-6 transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              Most Popular in Pakistan
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Family Coverage</span>
              <h3 className="text-xl font-black text-white">Family Sehat Package</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete health protection for up to 5 family members with included doctor consultations.
              </p>

              <div className="text-3xl font-black text-white pt-2">
                PKR 999 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span><strong>3 Included Video Consultations</strong> / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Unlimited AI Symptom & Lab Report Explainer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Priority Booking with Top PMDC Specialists</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>JazzCash & EasyPaisa Auto-Debit Available</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Family Sehat Package')}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Subscribe for PKR 999
            </button>
          </div>

          {/* Plan 3: Sehat Card / Zakat Plan */}
          <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Government & Zakat</span>
              <h3 className="text-xl font-black text-white">Sehat Card Holder</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                For eligible Sehat Sahulat Card families and deserving Zakat-eligible patients.
              </p>

              <div className="text-3xl font-extrabold text-white pt-2">
                PKR 0 <span className="text-xs text-teal-400 font-bold">(100% Subsidized)</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Free Cashless Surgery at Paneled Hospitals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Zakat-Funded Teleconsultations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>SMS Eligibility Check Guidance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Dedicated Patient Care Coordinator</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('Sehat Card Holder Plan')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              Verify Sehat Card Status
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
