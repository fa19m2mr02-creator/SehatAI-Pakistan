import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Search,
  Building2,
  Sparkles,
  PhoneCall,
  Download,
  RefreshCw,
  AlertCircle,
  MapPin,
  HeartHandshake,
  Printer,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';

interface SehatCardSectionProps {
  language: Language;
  onNavigateToHospitals?: () => void;
}

interface VerificationResult {
  cnic: string;
  province: string;
  programName: string;
  status: string;
  statusUrdu: string;
  annualLimit: string;
  coverageType: string;
  cardType: string;
  familyHeadRegistered: boolean;
  coveredServices: string[];
  smsInstruction: string;
  paneledHospitalsCount: number;
  verifiedDate: string;
}

export const SehatCardSection: React.FC<SehatCardSectionProps> = ({
  language,
  onNavigateToHospitals
}) => {
  const [cnicInput, setCnicInput] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Punjab');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);

  // Helper to format CNIC as 55555-5555555-5 as user types
  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 13);
    let formatted = raw;
    if (raw.length > 5 && raw.length <= 12) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    } else if (raw.length > 12) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5, 12)}-${raw.slice(12)}`;
    }
    setCnicInput(formatted);
    if (errorMsg) setErrorMsg(null);
  };

  const handleQuickSampleCnic = (sample: string, prov: string) => {
    setCnicInput(sample);
    setSelectedProvince(prov);
    setErrorMsg(null);
  };

  const handleCheckOnline = async (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = cnicInput.replace(/\D/g, '');

    if (digitsOnly.length !== 13) {
      setErrorMsg('Please enter a valid 13-digit Pakistani CNIC (e.g. 35202-1234567-1)');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const res = await fetch('/api/sehatcard/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cnic: cnicInput, province: selectedProvince })
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Verification failed. Please check CNIC format.');
      }

      setResult(json.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error verifying CNIC. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintVerification = () => {
    window.print();
  };

  return (
    <section id="sehatcard" className="py-16 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Section Header */}
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>Govt Sehat Sahulat Program & Qaumi Sehat Card</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Sehat Card Online Verification with CNIC
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Enter your 13-digit Pakistani National ID (CNIC) to verify instant eligibility for up to <strong className="text-white">PKR 1,000,000</strong> annual cashless inpatient medical coverage per family across 1,200+ paneled tertiary care hospitals in Pakistan.
              </p>

              {/* Sample Quick Buttons */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] text-teal-300 font-semibold">Try sample Pakistani CNICs:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickSampleCnic('35202-1234567-1', 'Punjab')}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    35202-1234567-1 (Lahore)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickSampleCnic('17301-9876543-2', 'Khyber Pakhtunkhwa')}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    17301-9876543-2 (Peshawar)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickSampleCnic('61101-5544332-9', 'Islamabad')}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    61101-5544332-9 (Islamabad)
                  </button>
                </div>
              </div>

            </div>

            {/* Right CNIC Form Box */}
            <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Check Sehat Card Online</h3>
                  <p className="text-xs text-slate-400">Official National CNIC Eligibility Portal</p>
                </div>
                <div className="w-10 h-10 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-2xl flex items-center justify-center font-bold text-xs font-mono">
                  8500
                </div>
              </div>

              <form onSubmit={handleCheckOnline} className="space-y-4">
                
                {/* CNIC Input */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-200 mb-1">
                    Enter 13-Digit CNIC Number (شناختی کارڈ نمبر) *
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={cnicInput}
                      onChange={handleCnicChange}
                      placeholder="e.g. 35202-1234567-1"
                      maxLength={15}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm font-mono font-extrabold text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Format: 5 digits - 7 digits - 1 digit (without dashes or with dashes)
                  </span>
                </div>

                {/* Province Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-200 mb-1">
                    Select Resident Province / Territory *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
                    <select
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                    >
                      <option value="Punjab" className="bg-slate-900 text-white">Punjab (Qaumi Sehat Card)</option>
                      <option value="Khyber Pakhtunkhwa" className="bg-slate-900 text-white">Khyber Pakhtunkhwa (Sehat Card Plus)</option>
                      <option value="Islamabad" className="bg-slate-900 text-white">Islamabad Capital Territory (ICT)</option>
                      <option value="Balochistan" className="bg-slate-900 text-white">Balochistan Sehat Sahulat</option>
                      <option value="Gilgit-Baltistan" className="bg-slate-900 text-white">Gilgit-Baltistan</option>
                      <option value="Azad Jammu & Kashmir" className="bg-slate-900 text-white">Azad Jammu & Kashmir (AJK)</option>
                      <option value="Sindh" className="bg-slate-900 text-white">Sindh Panel Program / Ehsaas</option>
                    </select>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="bg-rose-950/80 border border-rose-500 text-rose-200 p-3 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Verifying NADRA & Sehat Database...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-slate-950" />
                      <span>Verify CNIC Sehat Card Online</span>
                    </>
                  )}
                </button>

              </form>

              <div className="pt-2 text-center border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Encrypted NADRA/Govt Verification Protocol</span>
              </div>

            </div>

          </div>

        </div>

        {/* CNIC Verification Result Display */}
        {result && (
          <div className="bg-slate-950 text-white rounded-3xl p-8 border-2 border-teal-500/50 shadow-2xl space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-extrabold shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/40 font-extrabold px-2 py-0.5 rounded uppercase">
                    Official Verification Result
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">{result.programName}</h3>
                  <p className="text-xs text-slate-400 font-mono">CNIC: {result.cnic} • Checked: {result.verifiedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrintVerification}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                {onNavigateToHospitals && (
                  <button
                    onClick={onNavigateToHospitals}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Find Paneled Hospitals</span>
                  </button>
                )}
              </div>
            </div>

            {/* Urdu Status Banner */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
              <div className="text-lg font-bold text-amber-300 dir-rtl font-serif">
                {result.statusUrdu}
              </div>
              <p className="text-xs text-slate-300">
                You and your family are entitled to 100% cashless treatment at all government & paneled private hospitals.
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-cyan-400 font-bold uppercase">Annual Family Limit</div>
                <div className="text-base font-extrabold text-white mt-1">{result.annualLimit}</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-cyan-400 font-bold uppercase">Coverage Type</div>
                <div className="text-xs font-bold text-slate-200 mt-1">{result.coverageType}</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-cyan-400 font-bold uppercase">Paneled Hospitals Nearby</div>
                <div className="text-base font-extrabold text-amber-400 mt-1">{result.paneledHospitalsCount}+ Hospitals</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-cyan-400 font-bold uppercase">Required ID for Admission</div>
                <div className="text-xs font-bold text-white mt-1">Original CNIC or B-Form (Children)</div>
              </div>

            </div>

            {/* Covered Services List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase text-cyan-400 tracking-wider">
                100% Free Covered Medical & Surgical Treatments:
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                {result.coveredServices.map((srv, idx) => (
                  <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="text-slate-200 font-medium">{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Tip */}
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{result.smsInstruction}</span>
            </div>

          </div>
        )}

        {/* Standard Info Steps below */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 text-cyan-300 flex items-center justify-center font-bold text-xs font-mono">
              01
            </div>
            <h4 className="font-extrabold text-sm text-white">Check CNIC Online or SMS 8500</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use the online CNIC form above or text your 13-digit CNIC to 8500 to confirm family coverage status.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 text-cyan-300 flex items-center justify-center font-bold text-xs font-mono">
              02
            </div>
            <h4 className="font-extrabold text-sm text-white">Visit Sehat Card Counter at Hospital</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Show your original CNIC or child’s NADRA B-Form at the dedicated Sehat Sahulat Desk in any paneled hospital.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 text-cyan-300 flex items-center justify-center font-bold text-xs font-mono">
              03
            </div>
            <h4 className="font-extrabold text-sm text-white">100% Cashless Medical Admission</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Surgeries, room charges, diagnostic tests, and discharge medications are directly billed to State Life / Government.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

