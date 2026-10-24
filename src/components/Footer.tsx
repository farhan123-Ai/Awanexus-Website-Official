import React from 'react';
import {
  Phone,
  Mail,
  ExternalLink,
  Clock,
  Shield,
  ArrowUpRight,
} from 'lucide-react';
import { FOUNDER_NAME, DEFAULT_SETTINGS } from '../data/initialData';

interface FooterProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-100 border-t border-slate-200 pt-16 pb-12 text-slate-600 relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Dual Wing Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Think & Design Card */}
          <div className="rounded-3xl p-6 bg-white border border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all flex items-start space-x-4">
            <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 shrink-0">
              <img
                src="/assets/logos/think-and-design-emblem.png"
                alt="Think & Design Emblem"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-base font-bold text-slate-900">Think & Design</h4>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  Creative & Tech Wing
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 mb-3">
                AI websites, apps & agents, graphic design, promotional video editing, and advanced Excel management.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${DEFAULT_SETTINGS.creativeEmail}`}
                  className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 mr-1" />
                  <span>{DEFAULT_SETTINGS.creativeEmail}</span>
                </a>
                <button
                  onClick={() => handleNav('think-design')}
                  className="text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center"
                >
                  <span>Explore Wing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Awan Academy Card */}
          <div className="rounded-3xl p-6 bg-white border border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all flex items-start space-x-4">
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 shrink-0">
              <img
                src="/assets/logos/awan-academy-emblem.png"
                alt="Awan Academy Emblem"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-base font-bold text-slate-900">Awan Academy</h4>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                  Educational Wing
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 mb-3">
                Guess papers, exam creation, subject notes, quizzes, and ethical academic learning guidance.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${DEFAULT_SETTINGS.educationEmail}`}
                  className="inline-flex items-center text-xs font-semibold text-emerald-600 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 mr-1" />
                  <span>{DEFAULT_SETTINGS.educationEmail}</span>
                </a>
                <a
                  href={DEFAULT_SETTINGS.academyPlatformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-white px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 inline-flex items-center space-x-1"
                >
                  <span>Visit Awan Academy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Col 1: Brand & Founder */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                <img
                  src="/assets/logos/awanexus-emblem.png"
                  alt="AwaNexus Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Awa<span className="text-sky-600">Nexus</span>
                </span>
                <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">
                  Innovation & Connectivity
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Founded by <span className="text-slate-900 font-bold">{FOUNDER_NAME}</span>. Unifying cutting-edge artificial intelligence, digital design, multimedia technologies, and academic educational coaching under one professional organization.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <a
                href="https://wa.me/923277993368"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-700 hover:text-emerald-600 font-medium transition-colors"
              >
                <Phone className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Phone / WhatsApp: +92 327-7993368</span>
              </a>
              <div className="flex items-center text-slate-500">
                <Clock className="w-4 h-4 mr-2 text-sky-600" />
                <span>Mon – Sat: 09:00 AM – 09:00 PM PKT</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Quick Navigation
            </h5>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-blue-600 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-600 transition-colors">
                  About Malik Farhan
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-blue-600 transition-colors">
                  Portfolio & Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-600 transition-colors">
                  Packages & Pricing (PKR)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('client-portal')} className="hover:text-blue-600 transition-colors">
                  Client Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-blue-600 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Wings */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Wings & Offerings
            </h5>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleNav('think-design')} className="hover:text-blue-600 transition-colors">
                  Think & Design Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai-tech')} className="hover:text-blue-600 transition-colors">
                  AI & Web Development
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-600 transition-colors">
                  Graphic Design & Video Editing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('awan-academy')} className="hover:text-emerald-600 transition-colors">
                  Awan Academy (Education)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('awan-academy')} className="hover:text-emerald-600 transition-colors">
                  Guess Papers & Exam Making
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('book-consultation')} className="hover:text-sky-600 transition-colors">
                  Book a Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Legal & Admin */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Governance & Policies
            </h5>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-slate-900 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('refunds')} className="hover:text-slate-900 transition-colors">
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-amber-700 hover:text-amber-800 transition-colors flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-1" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>
            © {new Date().getFullYear()} <span className="text-slate-800 font-bold">AwaNexus</span>. All rights reserved. Founded by Malik Muhammad Farhan Wajid.
          </p>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-700">Available for Consultations & Orders (PKR)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
