import React, { useState } from 'react';
import {
  DEFAULT_SETTINGS,
} from '../data/initialData';
import { getServices } from '../services/storage';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem, ServicePackage } from '../types';
import {
  Sparkles,
  Cpu,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  AlertCircle,
} from 'lucide-react';

interface ThinkDesignPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectPackageForOrder: (service: ServiceItem, pkg: ServicePackage) => void;
}

export const ThinkDesignPage: React.FC<ThinkDesignPageProps> = ({
  onNavigate,
  onSelectPackageForOrder,
}) => {
  const allServices = getServices();
  const creativeServices = allServices.filter((s) => s.wing === 'creative');

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const categories = [
    'All',
    'AI & Web Development',
    'AI Applications & Tools',
    'AI Agent Development',
    'Graphic Design & Brand Identity',
    'Video Editing & Multimedia',
    'Microsoft Office & Excel Management',
    'Prompt Engineering & AI Workflows',
  ];

  const filteredServices =
    activeCategoryFilter === 'All'
      ? creativeServices
      : creativeServices.filter((s) => s.category.includes(activeCategoryFilter));

  return (
    <div className="w-full text-slate-800 text-left">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-sky-50 via-blue-50/40 to-white border-b border-blue-200 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-blue-800 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>AwaNexus Creative & Technology Wing</span>
              </div>

              <div className="flex items-center space-x-5">
                <div className="p-3 rounded-3xl bg-white border-2 border-blue-200 shadow-md shrink-0">
                  <img
                    src="/assets/logos/think-and-design-emblem.png"
                    alt="Think & Design Emblem"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Think & Design
                  </h1>
                  <p className="text-sm sm:text-base font-bold text-blue-700 mt-1">
                    Creative Services & Technology Development
                  </p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Delivering advanced digital craft across 8 core categories: from AI web applications and autonomous AI agents to brand identity, high-retention video editing, automated Excel dashboards, and prompt engineering.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('place-order', { wing: 'creative' })}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/25"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Start Creative / Tech Order</span>
                </button>

                <button
                  onClick={() => onNavigate('book-consultation', { category: 'AI and Technology Consultation' })}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-sky-800 bg-white border border-sky-300 hover:bg-sky-50 transition-all flex items-center space-x-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span>Schedule Discovery Call</span>
                </button>
              </div>

              {/* Direct Creative Contacts */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600">
                <a
                  href={`mailto:${DEFAULT_SETTINGS.creativeEmail}`}
                  className="flex items-center space-x-1.5 text-blue-700 font-bold hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{DEFAULT_SETTINGS.creativeEmail}</span>
                </a>
                <span className="text-slate-400">|</span>
                <a
                  href="https://wa.me/923277993368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-blue-700 font-bold hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp: +92 327-7993368</span>
                </a>
              </div>
            </div>

            {/* Right Emblem Showcase Card */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-blue-200 shadow-lg space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-blue-100 flex items-center justify-center">
                <img
                  src="/assets/logos/think-and-design-logo.png"
                  alt="Think & Design Full Logo"
                  className="h-20 object-contain"
                />
              </div>

              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-sky-600" />
                <span>Wing Capabilities (A–H)</span>
              </h3>

              <div className="space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">A</span>
                  <span>AI & Web Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">B</span>
                  <span>AI Applications & Chatbots</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">C</span>
                  <span>Autonomous AI Agent Dev</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">D</span>
                  <span>Brand Identity & Graphic Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">E</span>
                  <span>AI-Assisted Design & Concepts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">F</span>
                  <span>Video Editing & Multimedia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">G</span>
                  <span>Excel Management & Dashboards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">H</span>
                  <span>Prompt Engineering & Tuning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRANSPARENCY NOTICE ON API USAGE ===================== */}
      <section className="py-4 bg-sky-50 border-b border-sky-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3 text-xs text-sky-900 bg-white p-3.5 rounded-2xl border border-sky-300 shadow-xs">
            <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Transparent Service Architecture: </span>
              For AI agent and application development, external LLM API usage costs (e.g. OpenAI, Anthropic, Gemini), third-party subscriptions, hosting fees, and custom domain registrations are billed separately based on actual client usage.
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CATEGORY FILTERS & SERVICES ===================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                Service Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Think & Design Service Catalog
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 max-w-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeCategoryFilter === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectPackage={onSelectPackageForOrder}
                onBookConsultation={() =>
                  onNavigate('book-consultation', { category: 'AI and Technology Consultation' })
                }
                onCustomQuote={() =>
                  onNavigate('place-order', { serviceId: service.id, packageTier: 'Custom Quote' })
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
