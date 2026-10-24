import React from 'react';
import {
  FOUNDER_NAME,
  ORG_NAME,
  ORG_TAGLINE,
  INTRO_TITLE,
  INTRO_DESCRIPTION,
  PROFESSIONAL_ROLES,
  DEFAULT_SETTINGS,
} from '../data/initialData';
import { ExperienceCounter } from '../components/ExperienceCounter';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  Code2,
  Cpu,
  Bot,
  Palette,
  Video,
  Table,
  Terminal,
  FileText,
  Database,
  Layers,
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Briefcase,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const roleIconMap: Record<string, React.ReactNode> = {
  Code: <Code2 className="w-5 h-5 text-blue-600" />,
  Cpu: <Cpu className="w-5 h-5 text-sky-600" />,
  Bot: <Bot className="w-5 h-5 text-indigo-600" />,
  Palette: <Palette className="w-5 h-5 text-pink-600" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-600" />,
  Layers: <Layers className="w-5 h-5 text-purple-600" />,
  Video: <Video className="w-5 h-5 text-rose-600" />,
  Terminal: <Terminal className="w-5 h-5 text-emerald-600" />,
  FileText: <FileText className="w-5 h-5 text-blue-600" />,
  Table: <Table className="w-5 h-5 text-teal-600" />,
  Database: <Database className="w-5 h-5 text-violet-600" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-emerald-600" />,
};

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full text-slate-800">
      {/* ===================== HERO PROFILE SECTION WITH UPLOADED PHOTO ===================== */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-sky-50 via-slate-50 to-white border-b border-slate-200 overflow-hidden">
        {/* Soft background radial glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Founder Portrait Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                {/* Decorative background glow & accent ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 rounded-3xl blur-md opacity-60 group-hover:opacity-90 transition duration-500"></div>

                <div className="relative rounded-3xl bg-white p-3 shadow-2xl border border-slate-100">
                  <div className="relative overflow-hidden rounded-2xl w-72 sm:w-84 h-88 sm:h-100 bg-slate-100">
                    <img
                      src="/assets/images/farhan-wajid.jpg"
                      alt={FOUNDER_NAME}
                      className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for subtle text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Badge at Bottom of Photo */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span>Founder & Leader</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-white leading-tight">
                        {FOUNDER_NAME}
                      </h3>
                      <p className="text-xs text-sky-200">
                        AwaNexus · Think & Design · Awan Academy
                      </p>
                    </div>
                  </div>

                  {/* Verification Pill beneath photo */}
                  <div className="pt-3 pb-1 px-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center text-slate-600 font-medium">
                      <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600" />
                      Verified Identity
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      PK · Active Practice
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Biography & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-blue-700 font-semibold shadow-sm">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>Professional Biography & Vision</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering Digital Innovation & <span className="text-gradient-cyan-blue">Educational Mastery</span>
              </h1>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  I'm <strong className="text-slate-900 font-bold">{FOUNDER_NAME}</strong>, a multidisciplinary professional and technology architect based in Pakistan. My career bridges cutting-edge artificial intelligence, digital design, full-stack web engineering, multimedia production, and educational content authoring.
                </p>
                <p>
                  Through <strong className="text-blue-700 font-bold">{ORG_NAME}</strong>, I unify two specialized divisions: <strong className="text-slate-900 font-semibold">Think & Design</strong> (catering to non-teaching digital craft, AI applications, autonomous agents, graphic design, promotional video editing, and Excel automation) and <strong className="text-emerald-700 font-semibold">Awan Academy</strong> (dedicated to exam guess papers, subject-wise notes, test series, and legitimate academic tutoring).
                </p>
                <p className="text-xs sm:text-sm text-slate-500 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm leading-relaxed">
                  "My mission is simple: to make modern technology and educational excellence accessible, reliable, and results-driven for businesses, students, and educators alike."
                </p>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/25"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Consultation with Farhan</span>
                </button>

                <a
                  href="https://wa.me/923277993368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl font-semibold text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all flex items-center space-x-1.5"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp: +92 327-7993368</span>
                </a>

                <button
                  onClick={() => onNavigate('portfolio')}
                  className="px-5 py-3 rounded-xl font-semibold text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center space-x-1.5"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== INDEPENDENT EXPERIENCE RECORD ===================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              Verified Experience Metrics
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-3">
              Independent Professional Track Record
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each duration represents dedicated individual professional work and academic coaching, presented transparently without misleading cumulative totals.
            </p>
          </div>

          <ExperienceCounter />
        </div>
      </section>

      {/* ===================== 12 PROFESSIONAL ROLES ===================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              Multidisciplinary Versatility
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-3">
              12 Core Professional Roles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Spanning artificial intelligence, creative design, video editing, data management, and education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFESSIONAL_ROLES.map((role, idx) => (
              <div
                key={role.title}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                    {roleIconMap[role.iconName] || <Sparkles className="w-5 h-5 text-blue-600" />}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Role #{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{role.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{role.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-700 font-semibold">
                  <span>Domain Practice</span>
                  <span className="text-emerald-600">✓ Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== LOGO & BRAND HARMONY SECTION ===================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="rounded-3xl p-8 sm:p-12 bg-white border border-slate-200 shadow-lg">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                Visual Identity Showcase
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-2">
                Official Emblems & Visual Design System
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Presented on clear, high-contrast luminous backgrounds to ensure every detail of the ribbon circuit knot, the book circuit, and the lightbulb circuit remains razor-sharp and readable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Emblem 1: AwaNexus */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-200 mb-4">
                  <img
                    src="/assets/logos/awanexus-logo.png"
                    alt="AwaNexus Logo"
                    className="h-14 object-contain"
                  />
                </div>
                <h4 className="text-sm font-bold text-slate-900">AwaNexus (Main Identity)</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Ribbon circuit knot symbolizing innovation, full-stack intelligence, and organizational connectivity.
                </p>
              </div>

              {/* Emblem 2: Awan Academy */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-emerald-200 flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-white shadow-sm border border-emerald-200 mb-4">
                  <img
                    src="/assets/logos/awan-academy-logo.png"
                    alt="Awan Academy Logo"
                    className="h-14 object-contain"
                  />
                </div>
                <h4 className="text-sm font-bold text-emerald-900">Awan Academy (Educational)</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Hexagon book circuit emblem symbolizing academic coaching, guess papers, and conceptual learning.
                </p>
              </div>

              {/* Emblem 3: Think & Design */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-blue-200 flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-white shadow-sm border border-blue-200 mb-4">
                  <img
                    src="/assets/logos/think-and-design-logo.png"
                    alt="Think & Design Logo"
                    className="h-14 object-contain"
                  />
                </div>
                <h4 className="text-sm font-bold text-blue-900">Think & Design (Creative & Tech)</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Hexagon lightbulb circuit emblem symbolizing AI web apps, creative visual branding, and Excel automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
