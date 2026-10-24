import React, { useState } from 'react';
import { createInquiry } from '../services/storage';
import { DEFAULT_SETTINGS } from '../data/initialData';
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  GraduationCap,
  MessageSquare,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWing, setSelectedWing] = useState<'creative' | 'education' | 'general'>('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const phoneDisplay = '+92 327-7993368';
  const whatsappUrl = 'https://wa.me/923277993368';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!subject.trim()) {
      setErrorMessage('Please provide a subject for your inquiry.');
      return;
    }
    if (!message.trim() || message.length < 15) {
      setErrorMessage('Please provide a descriptive message (at least 15 characters).');
      return;
    }

    createInquiry({
      name,
      email,
      phone: phone || undefined,
      wing: selectedWing,
      subject,
      message,
    });

    setSubmitted(true);
  };

  return (
    <div className="w-full text-left">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#060c1d] via-[#08122a]/40 to-[#060913] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
              Direct Communication Channels
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Get in Touch with Farhan Wajid
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Have a project inquiry, educational requirement, or custom quotation question? Connect directly through WhatsApp, phone, or our dedicated wing email inboxes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Card */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/40 backdrop-blur-xl shadow-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Direct WhatsApp</h3>
                    <p className="text-xs text-emerald-400 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                      Fastest response channel
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Start an instant conversation with Malik Muhammad Farhan Wajid for quick estimates, consultation scheduling, or urgent questions.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-200">{phoneDisplay}</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors inline-flex items-center space-x-1"
                  >
                    <span>Open WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Dedicated Wing Inboxes */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Wing-Specific Email Routing
                </h3>

                {/* Think & Design Email */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center space-x-2 mb-1">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-white">Think & Design (Creative & Tech)</span>
                  </div>
                  <a
                    href={`mailto:${DEFAULT_SETTINGS.creativeEmail}`}
                    className="text-xs font-mono text-blue-300 hover:underline block"
                  >
                    {DEFAULT_SETTINGS.creativeEmail}
                  </a>
                </div>

                {/* Awan Academy Email */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center space-x-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Awan Academy (Educational)</span>
                  </div>
                  <a
                    href={`mailto:${DEFAULT_SETTINGS.educationEmail}`}
                    className="text-xs font-mono text-emerald-300 hover:underline block"
                  >
                    {DEFAULT_SETTINGS.educationEmail}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3 text-xs text-slate-400">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">Availability Hours</h4>
                  <p>Monday – Saturday: 09:00 AM – 09:00 PM PKT (UTC+5)</p>
                  <p className="text-[11px] text-slate-500 mt-1">Inquiries submitted outside hours are replied to on the next business morning.</p>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-6 sm:p-10 bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-2">
                  Send an Inquiry or Message
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Messages are verified, routed to the appropriate wing inbox, and saved directly to the AwaNexus administrative inquiry repository.
                </p>

                {errorMessage && (
                  <div className="mb-6 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Message Stored Successfully</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Thank you, <span className="font-semibold text-white">{name}</span>. Your message has been saved into our system and routed to the <span className="text-cyan-300 font-semibold">{selectedWing.toUpperCase()}</span> wing inbox. Farhan will reach out to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setSubject('');
                        setMessage('');
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-slate-800 hover:bg-slate-700"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          WhatsApp / Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="+92 300 1234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Inquiry Wing Destination
                        </label>
                        <select
                          value={selectedWing}
                          onChange={(e) => setSelectedWing(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="general">General AwaNexus Inquiry</option>
                          <option value="creative">Think & Design (Creative / AI)</option>
                          <option value="education">Awan Academy (Education)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Inquiry regarding AI Agent Development / Custom Guess Papers"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Your Detailed Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your project, timeline, target audience, or specific questions..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center space-x-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message & Save to Database</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
