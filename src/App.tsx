/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AiTriageSection } from './components/AiTriageSection';
import { AiLabAnalyzer } from './components/AiLabAnalyzer';
import { DoctorDirectory } from './components/DoctorDirectory';
import { HospitalDirectory } from './components/HospitalDirectory';
import { SehatCardSection } from './components/SehatCardSection';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { Language } from './types';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [initialSymptom, setInitialSymptom] = useState('');
  const [preselectedSpecialty, setPreselectedSpecialty] = useState('All Specialties');
  const [planToast, setPlanToast] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'emergency') {
      setIsEmergencyOpen(true);
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickStartTriage = (symptomText: string) => {
    setInitialSymptom(symptomText);
    scrollToSection('triage');
  };

  const handleBookDoctorBySpecialty = (specialty: string) => {
    setPreselectedSpecialty(specialty);
    scrollToSection('doctors');
  };

  const handleSelectPlan = (planName: string) => {
    setPlanToast(`Selected ${planName}! Redirecting to JazzCash/EasyPaisa checkout...`);
    setTimeout(() => {
      setPlanToast(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-900 selection:text-cyan-200">
      
      {/* Toast Notification */}
      {planToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-teal-500/50 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="text-xs sm:text-sm font-bold">{planToast}</span>
        </div>
      )}

      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          language={language}
          onQuickStartTriage={handleQuickStartTriage}
          onNavigateToDoctors={() => scrollToSection('doctors')}
        />

        {/* AI Symptom Triage Section */}
        <AiTriageSection
          language={language}
          initialSymptom={initialSymptom}
          onBookDoctorBySpecialty={handleBookDoctorBySpecialty}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
        />

        {/* AI Lab Report Explainer */}
        <AiLabAnalyzer
          language={language}
          onBookDoctor={() => scrollToSection('doctors')}
        />

        {/* PMDC Doctor Directory */}
        <DoctorDirectory
          language={language}
          preselectedSpecialty={preselectedSpecialty}
        />

        {/* Hospital & ICU Directory */}
        <HospitalDirectory
          language={language}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
        />

        {/* Sehat Card & Zakat Info Section */}
        <SehatCardSection
          language={language}
          onNavigateToHospitals={() => scrollToSection('hospitals')}
        />

        {/* Pricing Section */}
        <PricingSection
          language={language}
          onSelectPlan={handleSelectPlan}
        />

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Emergency Hotline Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

    </div>
  );
}
