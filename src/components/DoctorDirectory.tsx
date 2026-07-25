import React, { useState } from 'react';
import { Stethoscope, Star, CheckCircle, Video, MapPin, Calendar, Clock, CreditCard, ShieldCheck, X, Phone, User, Check, Building } from 'lucide-react';
import { Doctor, Language, AppointmentBooking } from '../types';
import { DOCTORS_DATA, PAKISTAN_CITIES, SPECIALTIES } from '../data/pakistanData';

interface DoctorDirectoryProps {
  language: Language;
  preselectedSpecialty?: string;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({
  language,
  preselectedSpecialty = 'All Specialties'
}) => {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedSpecialty, setSelectedSpecialty] = useState(preselectedSpecialty);
  const [sehatCardOnly, setSehatCardOnly] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  
  // Booking Form State
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('0300-1234567');
  const [consultType, setConsultType] = useState<'VIDEO' | 'CLINIC'>('VIDEO');
  const [paymentMethod, setPaymentMethod] = useState<'SEHAT_CARD' | 'JAZZCASH' | 'EASYPAISA' | 'CREDIT_CARD'>('JAZZCASH');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [bookingSuccess, setBookingSuccess] = useState<AppointmentBooking | null>(null);

  // Sync preselected specialty if passed from triage
  React.useEffect(() => {
    if (preselectedSpecialty && preselectedSpecialty !== 'All Specialties') {
      // Find matching specialty
      const match = SPECIALTIES.find(s => s.toLowerCase().includes(preselectedSpecialty.toLowerCase()));
      if (match) setSelectedSpecialty(match);
    }
  }, [preselectedSpecialty]);

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchCity = selectedCity === 'All Cities' || doc.city === selectedCity;
    const matchSpecialty = selectedSpecialty === 'All Specialties' || doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchSehat = !sehatCardOnly || doc.acceptsSehatCard;
    return matchCity && matchSpecialty && matchSehat;
  });

  const handleOpenBooking = (doc: Doctor) => {
    setBookingDoctor(doc);
    setBookingSuccess(null);
    setPatientName('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoctor || !patientName.trim()) return;

    const newBooking: AppointmentBooking = {
      doctorId: bookingDoctor.id,
      doctorName: bookingDoctor.name,
      patientName,
      phone: patientPhone,
      city: bookingDoctor.city,
      date: selectedDate,
      timeSlot: bookingDoctor.availableSlot,
      consultationType: consultType,
      paymentMethod,
      feePkr: paymentMethod === 'SEHAT_CARD' ? 0 : bookingDoctor.feePkr
    };

    setBookingSuccess(newBooking);
  };

  return (
    <section id="doctors" className="py-16 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-bold px-3.5 py-1 rounded-full">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
            <span>PMDC Verified Telemedicine Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Consult Top PMDC Doctors in Pakistan
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Book instant HD video consultations or clinic visits with board-certified specialists in Karachi, Lahore, Islamabad & across Pakistan.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            
            {/* City Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent focus:outline-hidden font-semibold cursor-pointer text-white"
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                ))}
              </select>
            </div>

            {/* Specialty Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200">
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="bg-transparent focus:outline-hidden font-semibold cursor-pointer text-white"
              >
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
                ))}
              </select>
            </div>

            {/* Sehat Card Checkbox */}
            <label className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-teal-300 cursor-pointer">
              <input
                type="checkbox"
                checked={sehatCardOnly}
                onChange={(e) => setSehatCardOnly(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-teal-400 focus:ring-teal-400"
              />
              <span>Sehat Card Accepted Only 💳</span>
            </label>

          </div>

          <div className="text-xs font-bold text-slate-400">
            Showing <span className="text-cyan-400 font-extrabold">{filteredDoctors.length}</span> PMDC Specialists
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl hover:border-cyan-500/50 transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Doctor Avatar + Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/30 shadow-xs"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=0f766e&color=fff&size=128`;
                      }}
                    />
                    <div>
                      <h3 className="font-extrabold text-base text-white">{doc.name}</h3>
                      <div className="text-xs text-cyan-300 font-semibold">{doc.specialty}</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3 text-teal-400" />
                        <span>{doc.pmdcNo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Qualification & Experience */}
                <div className="space-y-1.5 text-xs text-slate-300 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <div className="font-medium text-slate-200">{doc.qualification}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>{doc.experienceYears}+ Yrs Experience</span>
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {doc.rating} ({doc.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Hospital & Location */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{doc.city} • {doc.hospital}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-teal-300 font-medium text-[11px]">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Slot: {doc.availableSlot}</span>
                  </div>
                </div>

                {/* Sehat Card Acceptance */}
                {doc.acceptsSehatCard && (
                  <div className="inline-flex items-center gap-1 bg-teal-500/10 text-teal-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-teal-500/30">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                    <span>Accepts Sehat Card Plus (Free)</span>
                  </div>
                )}

              </div>

              {/* Price & Booking Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Consultation Fee</div>
                  <div className="text-base font-extrabold text-cyan-300">
                    PKR {doc.feePkr.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(doc)}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Book Slot</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-800 space-y-5 relative max-h-[90vh] overflow-y-auto text-white">
            
            <button
              onClick={() => setBookingDoctor(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSuccess ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <img
                    src={bookingDoctor.image}
                    alt={bookingDoctor.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-teal-500/30"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(bookingDoctor.name)}&background=0f766e&color=fff&size=128`;
                    }}
                  />
                  <div>
                    <span className="text-[10px] bg-teal-900/80 text-teal-300 border border-teal-700/60 font-bold px-2 py-0.5 rounded font-mono">
                      PMDC: {bookingDoctor.pmdcNo}
                    </span>
                    <h3 className="font-extrabold text-base text-white">{bookingDoctor.name}</h3>
                    <p className="text-xs text-slate-400">{bookingDoctor.specialty} • {bookingDoctor.city}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Patient Full Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Muhammad Ali Shah"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      WhatsApp / Mobile Number (Pakistan):
                    </label>
                    <input
                      type="text"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Consultation Type */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultType('VIDEO')}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex flex-col gap-1 cursor-pointer ${
                        consultType === 'VIDEO'
                          ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                          : 'border-slate-800 text-slate-400 bg-slate-950/40'
                      }`}
                    >
                      <Video className="w-4 h-4 text-cyan-400" />
                      <span>HD Video Consultation</span>
                      <span className="text-[10px] text-slate-400 font-normal">Online via App</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultType('CLINIC')}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex flex-col gap-1 cursor-pointer ${
                        consultType === 'CLINIC'
                          ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                          : 'border-slate-800 text-slate-400 bg-slate-950/40'
                      }`}
                    >
                      <Building className="w-4 h-4 text-cyan-400" />
                      <span>In-Person Clinic Visit</span>
                      <span className="text-[10px] text-slate-400 font-normal">{bookingDoctor.hospital}</span>
                    </button>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">
                      Select Payment Method:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('JAZZCASH')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer ${
                          paymentMethod === 'JAZZCASH'
                            ? 'border-teal-400 bg-teal-500 text-slate-950'
                            : 'border-slate-800 bg-slate-950 text-slate-300'
                        }`}
                      >
                        JazzCash
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('EASYPAISA')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer ${
                          paymentMethod === 'EASYPAISA'
                            ? 'border-teal-400 bg-teal-500 text-slate-950'
                            : 'border-slate-800 bg-slate-950 text-slate-300'
                        }`}
                      >
                        EasyPaisa
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('SEHAT_CARD')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer ${
                          paymentMethod === 'SEHAT_CARD'
                            ? 'border-teal-400 bg-teal-500 text-slate-950'
                            : 'border-slate-800 bg-slate-950 text-slate-300'
                        }`}
                      >
                        Sehat Card
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('CREDIT_CARD')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer ${
                          paymentMethod === 'CREDIT_CARD'
                            ? 'border-teal-400 bg-teal-500 text-slate-950'
                            : 'border-slate-800 bg-slate-950 text-slate-300'
                        }`}
                      >
                        Card / ATM
                      </button>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Doctor Consultation Fee:</span>
                      <span>PKR {bookingDoctor.feePkr.toLocaleString()}</span>
                    </div>
                    {paymentMethod === 'SEHAT_CARD' && (
                      <div className="flex justify-between text-teal-300 font-bold">
                        <span>Govt Sehat Card Discount:</span>
                        <span>- PKR {bookingDoctor.feePkr.toLocaleString()} (100% Free)</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-extrabold pt-1 border-t border-slate-800">
                      <span>Total Payable:</span>
                      <span className="text-cyan-300 font-extrabold text-sm">
                        {paymentMethod === 'SEHAT_CARD' ? 'PKR 0 (Free)' : `PKR ${bookingDoctor.feePkr.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black text-sm py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer"
                >
                  Confirm Appointment Booking
                </button>

              </form>
            ) : (
              /* Success Receipt */
              <div className="text-center space-y-4 py-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">Appointment Confirmed!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Confirmation SMS & Video Link sent to <strong className="text-slate-200">{bookingSuccess.phone}</strong>
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Doctor Name:</span>
                    <span className="font-bold text-white">{bookingSuccess.doctorName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Patient Name:</span>
                    <span className="font-bold text-white">{bookingSuccess.patientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Slot & Date:</span>
                    <span className="font-bold text-cyan-300">{bookingSuccess.date} • {bookingSuccess.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Status:</span>
                    <span className="font-bold text-teal-300">{bookingSuccess.paymentMethod} (COMPLETED)</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingDoctor(null)}
                  className="w-full bg-teal-500 text-slate-950 font-bold text-sm py-3 rounded-xl shadow-md cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
