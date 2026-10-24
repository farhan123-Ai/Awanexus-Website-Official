import React, { useState } from 'react';
import { Phone, MessageCircle, X, ChevronRight, Sparkles, GraduationCap, Clock } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneDisplay = '+92 327-7993368';
  const whatsappNumber = '923277993368';

  const quickMessages = [
    {
      title: 'General Inquiries',
      text: 'Hello Malik Farhan, I would like to inquire about AwaNexus services.',
      wing: 'General',
    },
    {
      title: 'Think & Design (Creative / AI)',
      text: 'Hello, I am interested in Think & Design services (AI web/app development, design, video editing, or Excel).',
      wing: 'Creative',
    },
    {
      title: 'Awan Academy (Educational Services)',
      text: 'Hello, I want to inquire about Awan Academy educational services (guess papers, notes, or exam creation).',
      wing: 'Education',
    },
    {
      title: 'Consultation Appointment',
      text: 'Hello, I would like to schedule a consultation appointment.',
      wing: 'Booking',
    },
  ];

  const openWhatsApp = (customText: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Quick Message Menu */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-emerald-500/40 shadow-2xl backdrop-blur-2xl p-4 text-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Chat on WhatsApp</h4>
                <p className="text-[11px] text-emerald-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                  Online | Quick Response
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-2.5 text-xs text-slate-300">
            <p>
              Direct contact with <span className="font-semibold text-white">Malik Muhammad Farhan Wajid</span> at AwaNexus.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Phone / WhatsApp: <span className="text-emerald-300 font-mono font-medium">{phoneDisplay}</span>
            </p>
          </div>

          <div className="space-y-1.5 my-2">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Choose Quick Conversation Starter:
            </p>
            {quickMessages.map((msg, i) => (
              <button
                key={i}
                onClick={() => {
                  openWhatsApp(msg.text);
                  setIsOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-xl bg-slate-800/70 hover:bg-emerald-950/40 hover:border-emerald-500/40 border border-transparent transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                    {msg.title}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {msg.text}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <a
              href={`tel:${phoneDisplay.replace(/[\s-]/g, '')}`}
              className="text-slate-300 hover:text-white flex items-center"
            >
              <Phone className="w-3 h-3 mr-1 text-slate-400" />
              <span>Direct Call</span>
            </a>
            <button
              onClick={() => {
                openWhatsApp('Hello Malik Farhan, I would like to connect with you regarding AwaNexus.');
                setIsOpen(false);
              }}
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Open Direct Chat →
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.6)] transition-all transform hover:scale-105 active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white"></span>
        </div>
        <span className="hidden sm:inline font-bold">Chat on WhatsApp</span>
      </button>
    </div>
  );
};
