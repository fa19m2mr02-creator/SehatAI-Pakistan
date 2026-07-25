import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Muhammad Imran Raza',
      city: 'Lahore, Punjab',
      role: 'Family Patient',
      comment: 'When my 4-year-old son had high fever late at night in Lahore, SehatAI immediately checked his symptoms, translated the care steps into Roman Urdu, and warned us about dengue red flags. Connected with a child specialist within 10 minutes!',
      rating: 5
    },
    {
      name: 'Dr. Kamran Siddiqui',
      city: 'Karachi, Sindh',
      role: 'Consultant Cardiologist (PMDC)',
      comment: 'SehatAI provides structured medical triage that streamlines my online telemedicine clinic. Patients come with clear AI symptom histories and lab values already parsed, saving vital minutes during consultations.',
      rating: 5
    },
    {
      name: 'Gul Bano',
      city: 'Peshawar, KP',
      role: 'Sehat Card Beneficiary',
      comment: 'I checked my Sehat Card eligibility and booked a free consultation for my mother’s gallbladder checkup. Extremely helpful platform for families in KP.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
            <Quote className="w-3.5 h-3.5 text-cyan-400" />
            <span>Trusted Across Pakistan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Loved by Patients & PMDC Doctors Nationwide
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real stories from families in Karachi, Lahore, Islamabad, Peshawar & rural districts benefiting from AI healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-white">{rev.name}</h4>
                  <p className="text-[11px] text-teal-400 font-semibold">{rev.role}</p>
                </div>
                <span className="text-[10px] text-slate-300 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{rev.city}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
