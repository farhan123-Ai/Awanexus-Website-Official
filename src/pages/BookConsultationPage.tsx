import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CONSULTATION_CATEGORIES,
  AVAILABLE_TIME_SLOTS,
} from '../data/initialData';
import { createBooking, getBookings } from '../services/storage';
import { BookingItem } from '../types';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  ArrowRight,
  Copy,
} from 'lucide-react';

interface BookConsultationPageProps {
  initialCategory?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const BookConsultationPage: React.FC<BookConsultationPageProps> = ({
  initialCategory,
  onNavigate,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [category, setCategory] = useState<string>(
    initialCategory || CONSULTATION_CATEGORIES[0]
  );
  const [preferredDate, setPreferredDate] = useState<string>(minDateStr);
  const [selectedSlot, setSelectedSlot] = useState<string>(AVAILABLE_TIME_SLOTS[0]);
  const [meetingType, setMeetingType] = useState<'Google Meet / Zoom' | 'WhatsApp Call' | 'Direct Phone Call'>(
    'Google Meet / Zoom'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [briefRequirements, setBriefRequirements] = useState('');
  const [referenceLinks, setReferenceLinks] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const isEducation = category.toLowerCase().includes('educational') || category.toLowerCase().includes('teacher');
  const wing = isEducation ? 'education' : 'creative';

  const existingBookings = getBookings();
  const bookedSlotsForDate = existingBookings
    .filter((b) => b.preferredDate === preferredDate && b.status !== 'Cancelled')
    .map((b) => b.timeSlot);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address for the meeting invite.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide your WhatsApp or phone number for meeting reminders.');
      return;
    }
    if (!topic.trim()) {
      setErrorMessage('Please provide a brief topic for the consultation.');
      return;
    }

    const result = createBooking({
      fullName,
      email,
      phone,
      wing,
      category,
      preferredDate,
      timeSlot: selectedSlot,
      timeZone: 'Asia/Karachi (PKT)',
      meetingType,
      topic,
      briefRequirements,
      referenceLinks: referenceLinks || undefined,
    });

    if (!result.success || !result.booking) {
      setErrorMessage(result.message || 'Selected slot is unavailable. Please choose another.');
      return;
    }

    setConfirmedBooking(result.booking);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // SUCCESS CONFIRMATION VIEW
  if (confirmedBooking) {
    const waText = `Hello Malik Muhammad Farhan Wajid, I have booked Consultation #${confirmedBooking.id} (${confirmedBooking.category}) on ${confirmedBooking.preferredDate} at ${confirmedBooking.timeSlot} via ${confirmedBooking.meetingType}. Looking forward to speaking!`;
    const waUrl = `https://wa.me/923277993368?text=${encodeURIComponent(waText)}`;

    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-left">
        <div className="rounded-3xl p-8 sm:p-10 bg-white border-2 border-sky-300 shadow-xl">
          <div className="flex items-center space-x-3 text-sky-700 mb-4">
            <CheckCircle2 className="w-8 h-8 text-sky-600" />
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-100 border border-sky-300">
              Consultation Appointment Confirmed
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Appointment Booked, {confirmedBooking.fullName}!
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Your appointment has been registered and verified to avoid conflicting reservations.
          </p>

          {/* Reference Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
              Booking Confirmation Number
            </span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono font-extrabold text-blue-700">
                {confirmedBooking.id}
              </span>
              <button
                onClick={() => handleCopy(confirmedBooking.id)}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                title="Copy Number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {copiedCode && (
            <p className="text-xs text-emerald-600 mb-4 font-bold">
              ✓ Confirmation code copied!
            </p>
          )}

          {/* Appointment Details Grid */}
          <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 space-y-3 text-xs mb-8">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
              Appointment Schedule & Platform
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-slate-500 block">Category:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Date:</span>
                <span className="font-bold text-blue-700">{confirmedBooking.preferredDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Time Slot:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Meeting Channel:</span>
                <span className="font-bold text-emerald-700">{confirmedBooking.meetingType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Topic:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.topic}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status:</span>
                <span className="font-bold text-emerald-700">{confirmedBooking.status}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center space-x-2 shadow-md shadow-emerald-600/20"
            >
              <Phone className="w-4 h-4" />
              <span>Send WhatsApp Confirmation</span>
            </a>

            <button
              onClick={() => onNavigate('client-portal', { query: confirmedBooking.id })}
              className="px-6 py-3 rounded-xl font-bold text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center space-x-2"
            >
              <span>View in Client Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                setTopic('');
                setBriefRequirements('');
              }}
              className="px-4 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              Book Another Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // BOOKING FORM VIEW
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
          Consultation Scheduling
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
          Book a Professional Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Schedule a 45-minute strategic session directly with Malik Muhammad Farhan Wajid for AI development, graphic design, video editing, Excel automation, or educational curriculum planning.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmitBooking} className="space-y-8">
        {/* Step 1: Category & Channel */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-bold text-slate-900">Consultation Category & Meeting Channel</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Consultation Domain / Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-500"
              >
                {CONSULTATION_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Meeting Type / Platform:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Google Meet / Zoom', 'WhatsApp Call', 'Direct Phone Call'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMeetingType(type)}
                    className={`p-2.5 rounded-xl text-center text-[11px] font-bold border transition-all ${
                      meetingType === type
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Date & Slot (with Double-Booking Prevention) */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="text-base font-bold text-slate-900">Date & Real-Time Slot Availability</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Select Date (Mon–Sat):
              </label>
              <input
                type="date"
                min={minDateStr}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
              <p className="text-[11px] text-slate-500 mt-2">
                Time Zone: <span className="text-slate-800 font-mono font-bold">Asia/Karachi (PKT, UTC+5)</span>
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Available Time Slots for {preferredDate}:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_TIME_SLOTS.map((slot) => {
                  const isBooked = bookedSlotsForDate.includes(slot);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        isBooked
                          ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed text-slate-400 line-through'
                          : isSelected
                          ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {isBooked ? (
                          <span className="text-[9px] font-bold text-rose-600">Booked</span>
                        ) : isSelected ? (
                          <span className="text-[9px] font-bold text-blue-700">Selected</span>
                        ) : (
                          <span className="text-[9px] text-emerald-600 font-bold">Available</span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold">{slot}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Client Details & Brief */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="text-base font-bold text-slate-900">Your Contact Details & Topic</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">WhatsApp / Phone *</label>
              <input
                type="tel"
                required
                placeholder="+92 300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Consultation Topic *</label>
            <input
              type="text"
              required
              placeholder="e.g. Planning autonomous AI agent for support / Guess paper strategy for Grade 10"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Brief Requirements / Specific Questions</label>
            <textarea
              rows={3}
              placeholder="What questions or goals would you like to cover during this 45-minute session?"
              value={briefRequirements}
              onChange={(e) => setBriefRequirements(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Optional Reference Links</label>
            <input
              type="url"
              placeholder="https://..."
              value={referenceLinks}
              onChange={(e) => setReferenceLinks(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-center pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-extrabold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95"
          >
            Confirm & Reserve Time Slot →
          </button>
        </div>
      </form>
    </div>
  );
};
