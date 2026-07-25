import React, { useState } from 'react';
import { Building2, PhoneCall, MapPin, Activity, CheckCircle, ShieldAlert, Search } from 'lucide-react';
import { Language, Hospital } from '../types';
import { HOSPITALS_DATA, PAKISTAN_CITIES } from '../data/pakistanData';

interface HospitalDirectoryProps {
  language: Language;
  onOpenEmergency: () => void;
}

export const HospitalDirectory: React.FC<HospitalDirectoryProps> = ({
  language,
  onOpenEmergency
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const filteredHospitals = HOSPITALS_DATA.filter((hosp) => {
    const matchCity = selectedCity === 'All Cities' || hosp.city === selectedCity;
    const matchSearch =
      hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <section id="hospitals" className="py-16 bg-slate-950 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-rose-300 text-xs font-bold px-3.5 py-1 rounded-full">
            <Building2 className="w-3.5 h-3.5 text-rose-400" />
            <span>24/7 Pakistan Emergency Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pakistan Hospital & ICU Bed Finder
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Locate 24/7 tertiary care hospitals, verify ICU bed & oxygen availability, and dial emergency rooms directly across Pakistan.
          </p>
        </div>

        {/* Emergency Hotline Alert Banner */}
        <div className="bg-gradient-to-r from-rose-900 via-red-800 to-rose-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl mb-10 border border-rose-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-500/40 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-rose-200">
              🚨 Immediate Life Emergency
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Call Rescue 1122 or Edhi Ambulance 115</h3>
            <p className="text-xs sm:text-sm text-rose-200/90 max-w-xl">
              In case of heart attack, stroke, severe traffic trauma, or breathing distress, do not wait for online appointments. Call national rescue hotlines immediately.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={onOpenEmergency}
              className="bg-white text-rose-900 hover:bg-rose-100 font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 animate-bounce text-rose-700" />
              <span>Dial 1122 Hotline</span>
            </button>
          </div>
        </div>

        {/* Search & City Filter Bar */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospital name or locality (e.g. Aga Khan, Shaukat Khanum, Johar Town)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-hidden w-full sm:w-auto cursor-pointer"
            >
              {PAKISTAN_CITIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Hospitals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl hover:border-cyan-500/50 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 font-extrabold px-2 py-0.5 rounded uppercase">
                      {hosp.city}
                    </span>
                    <h3 className="font-extrabold text-base text-white mt-1">{hosp.name}</h3>
                    <p className="text-xs text-slate-400">{hosp.area} • {hosp.address}</p>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">ICU Beds</div>
                    <div className="text-teal-300 font-extrabold flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-teal-400" />
                      <span>{hosp.availableICUBeds} Beds Open</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Oxygen Supply</div>
                    <div className="text-cyan-300 font-extrabold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>100% Available</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">ER Contact</div>
                  <div className="text-xs font-mono font-extrabold text-white">{hosp.emergencyNum}</div>
                </div>

                <a
                  href={`tel:${hosp.emergencyNum}`}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call ER</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
