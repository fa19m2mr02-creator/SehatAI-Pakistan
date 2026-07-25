import React, { useState } from 'react';
import { PhoneCall, X, ShieldAlert, HeartPulse, MapPin, AlertTriangle, Send, Share2, Check, Activity, Zap, FileText, ChevronRight, ArrowLeft } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PAKISTAN_EMERGENCY_CITIES = [
  'All Cities (National)',
  'Karachi',
  'Lahore',
  'Islamabad & Rawalpindi',
  'Peshawar',
  'Quetta',
  'Multan',
  'Faisalabad',
  'Sialkot',
  'Hyderabad'
];

const NATIONAL_HOTLINES = [
  {
    id: '1122',
    name: 'Rescue 1122 (Govt Paramedics & Fire)',
    number: '1122',
    desc: 'Free 24/7 Medical Rescue, Cardiac Ambulances & Disaster Management in Punjab, KP, GB & Balochistan.',
    bg: 'bg-red-600 hover:bg-red-500',
    type: 'Primary Ambulance'
  },
  {
    id: '115',
    name: 'Edhi Foundation Emergency Service',
    number: '115',
    desc: 'Pakistan’s largest nationwide volunteer ambulance network.',
    bg: 'bg-emerald-700 hover:bg-emerald-600',
    type: 'Nationwide Network'
  },
  {
    id: '1020',
    name: 'Chhipa Welfare Emergency Hotline',
    number: '1020',
    desc: '24/7 Ambulance hotline operating across Karachi & urban Sindh.',
    bg: 'bg-amber-600 hover:bg-amber-500',
    type: 'Sindh & Karachi'
  },
  {
    id: '1021',
    name: 'Aman Health Advanced ICU Ambulance',
    number: '1021',
    desc: 'Advanced Life Support (ALS) ambulances equipped with ventilators & ECG.',
    bg: 'bg-blue-700 hover:bg-blue-600',
    type: 'ICU Ambulance'
  },
  {
    id: '15',
    name: 'Police Emergency Helpline',
    number: '15',
    desc: 'National Police assistance for road accidents, assault, or crime scenes.',
    bg: 'bg-slate-800 hover:bg-slate-700',
    type: 'Police & Security'
  },
  {
    id: '130',
    name: 'National Highways & Motorway Police',
    number: '130',
    desc: 'Emergency rescue on Motorways (M-1, M-2, M-3, M-4, M-5, M-9, N-5).',
    bg: 'bg-indigo-700 hover:bg-indigo-600',
    type: 'Motorway Rescue'
  }
];

const CITY_EMERGENCY_HOSPITALS: Record<string, { hospital: string; erNumber: string; area: string }[]> = {
  Karachi: [
    { hospital: 'Aga Khan University Hospital ER', erNumber: '021-111-911-911', area: 'Stadium Road' },
    { hospital: 'Jinnah Postgraduate Medical Centre (JPMC ER)', erNumber: '021-99201300', area: 'Rafiqui Shaheed Road' },
    { hospital: 'Civil Hospital Trauma Centre (CHK)', erNumber: '021-99215740', area: 'Baba-e-Urdu Road' },
    { hospital: 'South City Hospital ER', erNumber: '021-35862301', area: 'Clifton Block 3' },
    { hospital: 'Liaquat National Hospital ER', erNumber: '021-34412000', area: 'Stadium Road' }
  ],
  Lahore: [
    { hospital: 'Mayo Hospital Emergency Block', erNumber: '042-99211100', area: 'Nishtar Road' },
    { hospital: 'Services Hospital ER', erNumber: '042-99203402', area: 'Jail Road' },
    { hospital: 'Jinnah Hospital Lahore ER', erNumber: '042-99231400', area: 'Faisal Town' },
    { hospital: 'Shaukat Khanum Emergency', erNumber: '042-35905000', area: 'Johar Town' },
    { hospital: 'Doctors Hospital Trauma Center', erNumber: '042-35302701', area: 'Johar Town' }
  ],
  'Islamabad & Rawalpindi': [
    { hospital: 'PIMS Hospital ER (Islamabad)', erNumber: '051-9261170', area: 'G-8/3, Islamabad' },
    { hospital: 'Shifa International Hospital ER', erNumber: '051-8463000', area: 'H-8/4, Islamabad' },
    { hospital: 'Combined Military Hospital (CMH Rawalpindi ER)', erNumber: '051-5183001', area: 'Mall Road, Rawalpindi' },
    { hospital: 'Holy Family Hospital ER', erNumber: '051-9290321', area: 'Satellite Town, Rawalpindi' }
  ],
  Peshawar: [
    { hospital: 'Lady Reading Hospital (LRH ER)', erNumber: '091-9211430', area: 'City Peshawar' },
    { hospital: 'Khyber Teaching Hospital (KTH ER)', erNumber: '091-9216340', area: 'University Road' },
    { hospital: 'Hayatabad Medical Complex (HMC ER)', erNumber: '091-9217140', area: 'Hayatabad' }
  ],
  Quetta: [
    { hospital: 'Civil Hospital Quetta ER', erNumber: '081-9202017', area: 'Jinnah Road' },
    { hospital: 'CMH Quetta Emergency', erNumber: '081-2882200', area: 'Cantonment' }
  ],
  Multan: [
    { hospital: 'Nishtar Hospital ER', erNumber: '061-9200231', area: 'Nishtar Road' },
    { hospital: 'Chiniot General Hospital ER', erNumber: '061-6511111', area: 'Northern Bypass' }
  ],
  Faisalabad: [
    { hospital: 'Allied Hospital ER', erNumber: '041-9210080', area: 'Jail Road' },
    { hospital: 'Faisalabad Institute of Cardiology (FIC)', erNumber: '041-9201550', area: 'Sargodha Road' }
  ],
  Sialkot: [
    { hospital: 'Allama Iqbal Memorial Hospital ER', erNumber: '052-9250020', area: 'Kutchery Road' }
  ],
  Hyderabad: [
    { hospital: 'Liaquat University Hospital (LUHM ER)', erNumber: '022-9210207', area: 'Hospital Road' }
  ]
};

const FIRST_AID_GUIDES = [
  {
    titleEn: 'Heart Attack / Chest Pain',
    titleUr: 'دل کا دورہ / سینے میں شدید درد',
    stepsEn: [
      'Call 1122 or 115 immediately.',
      'Keep patient seated upright and relaxed.',
      'Give 1 Disprin / Aspirin tablet (chewed) if conscious & not allergic.',
      'Loosen tight clothing around neck and waist.'
    ],
    stepsUr: [
      'فوری طور پر 1122 یا 115 کو کال کریں۔',
      'مریض کو سستائے بغیر ٹیک لگا کر بٹھا دیں۔',
      'اگر الرجی نہ ہو تو 1 ڈسپرین گولی چبا کر دیں۔',
      'کپڑے (کالر اور بیلٹ) ڈھیلے کر دیں۔'
    ]
  },
  {
    titleEn: 'Stroke / Paralysis Warning',
    titleUr: 'فالج کا حملہ (FAST علامتیں)',
    stepsEn: [
      'Look for FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 1122.',
      'Do not give food, water, or medication by mouth.',
      'Note exact time symptoms started for hospital ER.'
    ],
    stepsUr: [
      'علامتیں دیکھیں: چہرہ ٹیڑھا ہونا، بازو سن ہونا، بولنے میں دشواری۔',
      'مریض کو منہ کے ذریعے پانی، کھانا یا دوائی ہرگز نہ دیں۔',
      'علامات شروع ہونے کا وقت نوٹ کریں اور 1122 پر فوری کال کریں۔'
    ]
  },
  {
    titleEn: 'Severe Bleeding & Trauma',
    titleUr: 'شدید خون بہنا اور زخم',
    stepsEn: [
      'Apply direct firm pressure on wound using clean cloth or bandage.',
      'Elevate injured limb above heart level if possible.',
      'Do not remove objects deeply embedded in wound.'
    ],
    stepsUr: [
      'کسی صاف کپڑے سے زخم پر براہِ راست مضبوط دباؤ ڈالیں۔',
      'اگر ممکن ہو تو متاثرہ عضو کو دل کی سطح سے اونچا اٹھائیں۔',
      'اگر زخم میں کوئی چیز پیوست ہو تو اسے خود سے نہ نکالیں۔'
    ]
  },
  {
    titleEn: 'Heatstroke / Dehydration',
    titleUr: 'لو لگنا / شدید گرمی کا اثر',
    stepsEn: [
      'Move patient to cool, shaded or air-conditioned area immediately.',
      'Apply cold wet cloths to neck, armpits, and groin.',
      'Sip ORS or cold water if conscious.'
    ],
    stepsUr: [
      'مریض کو فوری طور پر ٹھنڈی یا سائے دار جگہ منتقل کریں۔',
      'گردن، بغلوں اور رانوں پر ٹھنڈی پٹیاں رکھیں۔',
      'اگر مریض ہوش میں ہو تو او آر ایس (ORS) کا شربت دیں۔'
    ]
  }
];

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hotlines' | 'hospitals' | 'firstaid' | 'sos'>('hotlines');
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [sosLocation, setSosLocation] = useState('');
  const [sosPatient, setSosPatient] = useState('');
  const [sosCopied, setSosCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerateSos = (platform: 'whatsapp' | 'sms') => {
    const text = `🚨 IMMEDIATE LIFE EMERGENCY ALERT 🚨\n\nPatient Name: ${sosPatient || 'Family Member'}\nLocation: ${sosLocation || 'Location details pending'}\n\nPlease dispatch medical assistance or call Rescue 1122 immediately! Shared via SehatAI Emergency Portal.`;
    const encoded = encodeURIComponent(text);

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    } else {
      window.open(`sms:?body=${encoded}`, '_self');
    }
  };

  const handleCopySosText = () => {
    const text = `🚨 IMMEDIATE LIFE EMERGENCY ALERT 🚨\nPatient Name: ${sosPatient || 'Family Member'}\nLocation: ${sosLocation || 'Location details pending'}\nPlease dispatch medical assistance or call Rescue 1122 immediately!`;
    navigator.clipboard.writeText(text);
    setSosCopied(true);
    setTimeout(() => setSosCopied(false), 3000);
  };

  const currentCityHospitals = CITY_EMERGENCY_HOSPITALS[selectedCity] || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-2 border-rose-600/40 space-y-5 relative my-8 animate-fadeIn text-white">
        
        {/* Modal Top Bar Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs transition-all cursor-pointer group shadow-sm"
            title="Go back to main application"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Page</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold bg-slate-950 border border-slate-800"
            title="Close Emergency Portal"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse text-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                Emergency Medical Portal Pakistan
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Immediate Life Emergency Response
            </h3>
          </div>
        </div>

        {/* Rapid One-Tap Hotbar */}
        <div className="bg-gradient-to-r from-rose-950 via-red-900 to-slate-950 p-4 rounded-2xl border border-rose-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-rose-400 animate-bounce" />
            <div>
              <span className="text-xs font-black text-white block">CRITICAL MEDICAL EMERGENCY?</span>
              <span className="text-[11px] text-rose-200">Tap below to initiate emergency dial</span>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href="tel:1122"
              className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Rescue 1122</span>
            </a>
            <a
              href="tel:115"
              className="flex-1 sm:flex-initial bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Edhi 115</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('hotlines')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hotlines'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>National Rescue Hotlines</span>
          </button>

          <button
            onClick={() => setActiveTab('hospitals')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hospitals'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Hospital ERs by City</span>
          </button>

          <button
            onClick={() => setActiveTab('firstaid')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'firstaid'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>First Aid & CPR Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('sos')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sos'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Family SOS Dispatch</span>
          </button>
        </div>

        {/* Tab 1: National Hotlines */}
        {activeTab === 'hotlines' && (
          <div className="space-y-3 animate-fadeIn">
            <p className="text-xs text-slate-300">
              Select any verified national emergency dispatch line below for immediate ambulance or paramedic arrival:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
              {NATIONAL_HOTLINES.map((h) => (
                <div
                  key={h.id}
                  className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2.5 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] bg-slate-900 text-cyan-300 border border-slate-800 font-extrabold px-2 py-0.5 rounded">
                        {h.type}
                      </span>
                      <span className="text-xs font-mono font-black text-rose-400">Dial {h.number}</span>
                    </div>
                    <h4 className="font-bold text-xs text-white leading-tight">{h.name}</h4>
                    <p className="text-[10px] text-slate-400 leading-tight mt-1">{h.desc}</p>
                  </div>

                  <a
                    href={`tel:${h.number}`}
                    className={`${h.bg} text-white font-extrabold text-xs py-2 px-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 w-full text-center`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call {h.number} Now</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Hospital ER by City */}
        {activeTab === 'hospitals' && (
          <div className="space-y-3.5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-200">
                Select Your Pakistani City for Hospital ER Direct Lines:
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-cyan-300 focus:outline-hidden cursor-pointer"
              >
                {PAKISTAN_EMERGENCY_CITIES.filter(c => c !== 'All Cities (National)').map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {currentCityHospitals.length > 0 ? (
                currentCityHospitals.map((h, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-white">{h.hospital}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{h.area}, {selectedCity}</span>
                      </p>
                    </div>

                    <a
                      href={`tel:${h.erNumber}`}
                      className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{h.erNumber}</span>
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Select a city above to view 24/7 Trauma Centers & ER contacts.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: First Aid & CPR */}
        {activeTab === 'firstaid' && (
          <div className="space-y-3 animate-fadeIn max-h-[340px] overflow-y-auto pr-1">
            <p className="text-xs text-slate-300">
              Basic Life Support (BLS) guidance while awaiting ambulance arrival:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {FIRST_AID_GUIDES.map((g, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-black text-rose-300 flex items-center justify-between border-b border-slate-800 pb-2">
                    <span>{g.titleEn}</span>
                    <span className="text-[11px] font-bold text-cyan-400 font-mono">{g.titleUr}</span>
                  </h4>
                  <div className="space-y-2">
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      {g.stepsEn.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-1 border-t border-slate-800/80 text-[11px] text-teal-300 font-medium dir-rtl" style={{ direction: 'rtl' }}>
                      {g.stepsUr.join(' ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Family SOS Dispatcher */}
        {activeTab === 'sos' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-slate-300">
              Send an automated instant Emergency SOS message with location details to family members via WhatsApp or SMS:
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Patient / Family Name:</label>
                <input
                  type="text"
                  value={sosPatient}
                  onChange={(e) => setSosPatient(e.target.value)}
                  placeholder="e.g. Ali Ahmed"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Current Location / Address:</label>
                <input
                  type="text"
                  value={sosLocation}
                  onChange={(e) => setSosLocation(e.target.value)}
                  placeholder="e.g. House 45, Street 12, Gulberg Lahore"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Generated Emergency Message Preview:</span>
              <p className="text-slate-300 font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed text-[11px]">
                🚨 IMMEDIATE LIFE EMERGENCY ALERT 🚨<br/>
                Patient Name: {sosPatient || 'Family Member'}<br/>
                Location: {sosLocation || 'Location details pending'}<br/>
                Please dispatch medical assistance or call Rescue 1122 immediately!
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleGenerateSos('whatsapp')}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleGenerateSos('sms')}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send via SMS</span>
              </button>

              <button
                type="button"
                onClick={handleCopySosText}
                className="bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {sosCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4" />}
                <span>{sosCopied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Disclaimer & Back Button */}
        <div className="border-t border-slate-800 pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-4 py-2 rounded-xl transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Main Healthcare Portal</span>
          </button>
          <p className="text-[10px] text-slate-500 italic text-center sm:text-right">
            In life-threatening situations, dial 1122 directly from any mobile phone or landline in Pakistan.
          </p>
        </div>

      </div>
    </div>
  );
};
