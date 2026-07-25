import React, { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, ShieldAlert, CheckCircle, Stethoscope, PhoneCall, ArrowRight, RefreshCw, User, HelpCircle, FileText } from 'lucide-react';
import { Language, AiTriageResponse, UrgencyLevel } from '../types';
import { SAMPLE_SYMPTOMS_PAKISTAN } from '../data/pakistanData';

interface AiTriageSectionProps {
  language: Language;
  initialSymptom?: string;
  onBookDoctorBySpecialty?: (specialty: string) => void;
  onOpenEmergency: () => void;
}

export const AiTriageSection: React.FC<AiTriageSectionProps> = ({
  language,
  initialSymptom = '',
  onBookDoctorBySpecialty,
  onOpenEmergency
}) => {
  const [symptomsText, setSymptomsText] = useState(initialSymptom);
  const [age, setAge] = useState<string>('28');
  const [gender, setGender] = useState<string>('Male');
  const [loading, setLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<AiTriageResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialSymptom) {
      setSymptomsText(initialSymptom);
      handleRunTriage(initialSymptom);
    }
  }, [initialSymptom]);

  const handleRunTriage = async (textToSubmit?: string) => {
    const text = textToSubmit || symptomsText;
    if (!text || text.trim().length === 0) {
      setErrorMsg('Please describe your symptoms before running AI triage.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: text,
          language,
          age: parseInt(age) || undefined,
          gender
        })
      });

      const json = await response.json();

      if (json.success && json.data) {
        setTriageResult(json.data);
      } else {
        throw new Error(json.error || 'Failed to get AI triage evaluation');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Server error while running AI Triage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'EMERGENCY':
        return (
          <div className="bg-red-600 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 animate-pulse shadow-md shadow-red-600/30">
            <AlertTriangle className="w-4 h-4" />
            <span>CRITICAL EMERGENCY (فوری ایمرجنسی)</span>
          </div>
        );
      case 'URGENT':
        return (
          <div className="bg-orange-500 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md">
            <ShieldAlert className="w-4 h-4" />
            <span>URGENT CARE NEEDED (جلد ڈاکٹر کو دکھائیں)</span>
          </div>
        );
      case 'MODERATE':
        return (
          <div className="bg-amber-500 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>MODERATE RISK (ڈاکٹر سے مشورہ کریں)</span>
          </div>
        );
      default:
        return (
          <div className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm">
            <CheckCircle className="w-4 h-4" />
            <span>LOW RISK / HOME CARE (معمولی خطرہ)</span>
          </div>
        );
    }
  };

  return (
    <section id="triage" className="py-16 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-bold px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Smart AI Symptom Checker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AI Health Triage & Urdu Symptom Evaluator
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Describe your health symptoms in Roman Urdu or English. Get instant risk level, home advice, and PMDC doctor recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Form Box */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Symptom Assessment</h3>
                  <p className="text-xs text-cyan-400">Powered by Gemini AI</p>
                </div>
              </div>
              <span className="text-[10px] bg-teal-900/80 text-teal-300 border border-teal-700/60 font-bold px-2 py-1 rounded font-mono">
                FREE 24/7
              </span>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Quick Sample Conditions in Pakistan:
              </label>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_SYMPTOMS_PAKISTAN.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSymptomsText(sample.text);
                      handleRunTriage(sample.text);
                    }}
                    className="text-xs bg-slate-900 hover:bg-slate-800 text-teal-300 border border-slate-800 px-2.5 py-1 rounded-lg transition-all text-left cursor-pointer"
                  >
                    ⚡ {sample.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Describe your symptoms in detail:</span>
                <span className="text-cyan-400 font-normal">Roman Urdu or English</span>
              </label>
              <textarea
                rows={5}
                value={symptomsText}
                onChange={(e) => setSymptomsText(e.target.value)}
                placeholder="e.g. Mujhe do din se bukhar hai, 102F temperature hai, gale mein kharash aur jism mein dard..."
                className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl p-4 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Age (Years):
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Gender:
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  <option value="Male" className="bg-slate-900 text-white">Male</option>
                  <option value="Female" className="bg-slate-900 text-white">Female</option>
                  <option value="Child" className="bg-slate-900 text-white">Child (Pediatric)</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-950/80 border border-rose-500 rounded-xl text-xs text-rose-200 font-medium">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={() => handleRunTriage()}
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-sm py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>AI Analyzing Symptoms...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Instant AI Evaluation</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              🔒 Confidential & Secure • Verified against WHO & Ministry of Health Guidelines
            </p>
          </div>

          {/* Output Assessment Panel */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            {!triageResult && !loading && (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Your AI Triage Result Will Appear Here</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Enter your symptoms on the left or select a sample condition to see instant urgency classification, Urdu translation, and recommended PMDC specialist.
                </p>
              </div>
            )}

            {loading && (
              <div className="text-center py-16 space-y-4">
                <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
                <h3 className="text-base font-bold text-white">SehatAI is analyzing your symptoms...</h3>
                <p className="text-xs text-slate-400">Checking against clinical algorithms, Dengue/Typhoid indicators & emergency red flags.</p>
              </div>
            )}

            {triageResult && !loading && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Top Status Header */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {getUrgencyBadge(triageResult.urgency)}
                    <span className="text-xs text-slate-300 font-semibold">
                      Specialist: <strong className="text-cyan-300">{triageResult.recommendedSpecialist}</strong>
                    </span>
                  </div>

                  {/* Summary in English & Urdu */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Clinical Summary (English)</span>
                      <p className="text-sm font-semibold text-white leading-relaxed">{triageResult.summaryEn}</p>
                    </div>
                    <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">خلاصہ (Urdu Translation)</span>
                      <p className="text-sm font-medium text-slate-200 leading-relaxed dir-rtl" style={{ direction: 'rtl' }}>
                        {triageResult.summaryUr}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Immediate Actions & Red Flags */}
                <div className="grid sm:grid-cols-2 gap-4">
                  
                  {/* Immediate Actions */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm space-y-2">
                    <h4 className="text-xs font-extrabold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-teal-400" />
                      Immediate Home Advice (گھریلو تدابیر)
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {triageResult.immediateActions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-teal-400 font-bold">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Emergency Red Flags */}
                  <div className="bg-rose-950/40 p-4 rounded-2xl border border-rose-900/60 shadow-sm space-y-2">
                    <h4 className="text-xs font-extrabold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      Red Flags (فوری ایمرجنسی علامتیں)
                    </h4>
                    <ul className="space-y-1.5 text-xs text-rose-200 font-medium">
                      {triageResult.redFlags?.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Questions for Doctor */}
                {triageResult.questionsForDoctor && triageResult.questionsForDoctor.length > 0 && (
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      Questions to Ask Your Doctor During Consultation:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {triageResult.questionsForDoctor.map((q, idx) => (
                        <li key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">{idx + 1}.</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => onBookDoctorBySpecialty?.(triageResult.recommendedSpecialist)}
                    className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-sm py-3.5 px-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>Book PMDC Doctor for {triageResult.recommendedSpecialist}</span>
                  </button>

                  {triageResult.urgency === 'EMERGENCY' && (
                    <button
                      onClick={onOpenEmergency}
                      className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm py-3.5 px-5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 animate-pulse cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call Rescue 1122 Hotline</span>
                    </button>
                  )}
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-slate-500 italic text-center pt-2 border-t border-slate-800">
                  {triageResult.disclaimer || "Disclaimer: SehatAI is an educational triage tool and does not provide formal medical diagnoses or prescriptions. In case of critical emergency, visit the nearest emergency room."}
                </p>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
