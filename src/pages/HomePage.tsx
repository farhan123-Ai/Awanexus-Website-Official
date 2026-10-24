import React from 'react';
import {
  FOUNDER_NAME,
  ORG_NAME,
  ORG_TAGLINE,
  INTRO_TITLE,
  INTRO_DESCRIPTION,
  PROFESSIONAL_ROLES,
  SAMPLE_PROJECTS,
  DEFAULT_SETTINGS,
} from '../data/initialData';
import { ThreeHeroScene } from '../components/ThreeHeroScene';
import { ExperienceCounter } from '../components/ExperienceCounter';
import { ServiceCard } from '../components/ServiceCard';
import { getServices } from '../services/storage';
import {
  Sparkles,
  GraduationCap,
  Calendar,
  ShoppingBag,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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
  Star,
  Quote,
  Clock,
  Phone,
  Mail,
  Award,
} from 'lucide-react';
import { ServiceItem, ServicePackage } from '../types';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectPackageForOrder: (service: ServiceItem, pkg: ServicePackage) => void;
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

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectPackageForOrder,
}) => {
  const services = getServices();
  const featuredServices = services.slice(0, 4);

  return (
    <div className="w-full text-slate-800">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-8 pb-16 bg-gradient-to-b from-sky-50/70 via-slate-50 to-white border-b border-slate-200">
        {/* Soft background radial glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-sky-200/35 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge: Founder & Org */}
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-bold text-slate-700">
                  {FOUNDER_NAME} · <span className="text-sky-600">{ORG_NAME}</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Dual Wings Active
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Building <span className="text-gradient-cyan-blue">Intelligent Digital</span> Experiences, Creative Solutions & Educational Excellence.
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {INTRO_DESCRIPTION}
              </p>

              {/* Key Highlights Quick Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600 font-medium">
                <span className="flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mr-1.5" />
                  AI Apps & 3D Web
                </span>
                <span className="flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mr-1.5" />
                  Graphic Design & Video Editing
                </span>
                <span className="flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                  Awan Academy Education
                </span>
                <span className="flex items-center px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mr-1.5" />
                  Excel & Data Management
                </span>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate('place-order')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Place an Order</span>
                </button>

                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-sky-800 bg-white border border-sky-300 hover:bg-sky-50 transition-all shadow-sm flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span>Book Consultation</span>
                </button>

                <a
                  href="https://wa.me/923277993368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl font-bold text-xs text-emerald-800 hover:text-emerald-900 bg-emerald-50 border border-emerald-300 transition-all flex items-center space-x-1.5 shadow-xs"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp: +92 327-7993368</span>
                </a>
              </div>
            </div>

            {/* Right 3D Visual & Founder Spotlight */}
            <div className="lg:col-span-5 h-[420px] sm:h-[480px] w-full relative rounded-3xl p-3 bg-white border border-slate-200 shadow-xl overflow-hidden flex items-center justify-center">
              <ThreeHeroScene />

              {/* Floating 3D Badge 1: AwaNexus Emblem */}
              <div className="absolute top-5 left-5 p-2.5 rounded-2xl bg-white/95 border border-slate-200 shadow-md backdrop-blur-md flex items-center space-x-3 pointer-events-none">
                <img
                  src="/assets/logos/awanexus-emblem.png"
                  alt="AwaNexus Logo"
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">AwaNexus</p>
                  <p className="text-[10px] text-sky-600 font-semibold">Interactive 3D Sphere</p>
                </div>
              </div>

              {/* Floating 3D Badge 2: Founder Snapshot Preview */}
              <div
                onClick={() => onNavigate('about')}
                className="absolute bottom-5 right-5 p-2 rounded-2xl bg-white/95 border border-slate-200 shadow-md backdrop-blur-md flex items-center space-x-3 cursor-pointer hover:border-blue-400 transition-all"
              >
                <img
                  src="/assets/images/farhan-wajid.jpg"
                  alt={FOUNDER_NAME}
                  className="w-10 h-10 rounded-xl object-cover object-top border border-slate-200"
                />
                <div className="text-left pr-1">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {FOUNDER_NAME}
                  </p>
                  <p className="text-[10px] text-blue-600 font-semibold flex items-center">
                    <span>Founder Profile</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DUAL ORGANIZATIONAL WINGS ===================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              Organizational Structure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Two Specialized Wings Under <span className="text-gradient-cyan-blue">AwaNexus</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Unifying professional technology development and academic educational support, delivering focused excellence through two dedicated wings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Wing 1: Awan Academy */}
            <div className="rounded-3xl p-8 bg-white border-2 border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-2xl bg-white border border-emerald-200 shadow-xs group-hover:scale-105 transition-transform">
                      <img
                        src="/assets/logos/awan-academy-emblem.png"
                        alt="Awan Academy Emblem"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        Wing 1 · Educational Wing
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-900">
                        Awan Academy
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Education & Learning Platform
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Providing verified educational resources, guess papers, exam paper creation, conceptual study notes, quizzes, and ethical academic learning guidance for students, teachers, and academies.
                </p>

                {/* Educational Services Bullet Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs text-slate-700 font-medium">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Guess Paper Making</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Subject Notes Preparation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exam & Quiz Creation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ethical Assignment Guidance</span>
                  </div>
                </div>

                {/* Direct Educational Contact Destination */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-600">Wing Email:</span>
                    <a href={`mailto:${DEFAULT_SETTINGS.educationEmail}`} className="font-bold text-emerald-800 hover:underline">
                      {DEFAULT_SETTINGS.educationEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <a
                  href={DEFAULT_SETTINGS.academyPlatformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Visit Awan Academy</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onNavigate('awan-academy')}
                  className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Wing Landing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Wing 2: Think & Design */}
            <div className="rounded-3xl p-8 bg-white border-2 border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-2xl bg-white border border-blue-200 shadow-xs group-hover:scale-105 transition-transform">
                      <img
                        src="/assets/logos/think-and-design-emblem.png"
                        alt="Think & Design Emblem"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                        Wing 2 · Creative & Tech Wing
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-900">
                        Think & Design
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Creative Services & Development
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Delivering non-teaching digital craft: AI web apps, autonomous agents, graphic design, promotional video editing, multimedia, Microsoft Office, Excel management, and prompt engineering.
                </p>

                {/* Creative Services Bullet Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs text-slate-700 font-medium">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>AI Websites & Applications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Autonomous AI Agents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Branding & Graphic Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Video Editing & Excel Dashboards</span>
                  </div>
                </div>

                {/* Direct Creative Contact Destination */}
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 mb-6 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-600">Wing Email:</span>
                    <a href={`mailto:${DEFAULT_SETTINGS.creativeEmail}`} className="font-bold text-blue-800 hover:underline">
                      {DEFAULT_SETTINGS.creativeEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('think-design')}
                  className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Explore Think & Design</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('book-consultation', { category: 'AI and Technology Consultation' })}
                  className="py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span>Book Tech Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PROFESSIONAL EXPERIENCE COUNTERS ===================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              Verified Experience Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Proven Track Record Across Multiple Disciplines
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Accurate, transparent presentation of professional experience across education, design, video editing, data management, and artificial intelligence.
            </p>
          </div>

          <ExperienceCounter />
        </div>
      </section>

      {/* ===================== FEATURED SERVICES & PACKAGES ===================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                Service Catalog Preview
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-2">
                Popular Services & Editable Packages
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Every service features Basic, Standard, and Premium tiers with transparent Pakistani Rupee (PKR) pricing and custom quote options.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="mt-4 md:mt-0 text-sm font-bold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1"
            >
              <span>View All 15+ Services</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectPackage={onSelectPackageForOrder}
                onBookConsultation={(category) => onNavigate('book-consultation', { category })}
                onCustomQuote={() => onNavigate('place-order', { serviceId: service.id, packageTier: 'Custom Quote' })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PORTFOLIO SHOWCASE ===================== */}
      <section className="py-20 bg-white border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                Portfolio & Projects
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-2">
                Selected Work & Case Studies
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Real platforms and demonstrations representing AI applications, modern web architectures, branding suites, and educational materials.
              </p>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="mt-4 md:mt-0 text-sm font-bold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1"
            >
              <span>Explore Full Portfolio</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl p-6 bg-white border border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {proj.category}
                    </span>
                    {proj.wing === 'education' ? (
                      <span className="text-[10px] font-bold text-emerald-700">Awan Academy</span>
                    ) : (
                      <span className="text-[10px] font-bold text-sky-700">Think & Design</span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 italic">
                    {proj.metrics}
                  </span>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      <span>Live Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CALL TO ACTION BANNER ===================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white shadow-xl text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-200 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                Ready to Collaborate?
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Let's Build Your Next Digital Project or Educational Solution
              </h2>

              <p className="text-sm sm:text-base text-sky-100 leading-relaxed">
                Whether you need an AI web application, bespoke branding, video editing, Excel automation, or verified Awan Academy educational materials, we are ready to assist.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('place-order')}
                  className="px-8 py-3.5 rounded-xl font-bold text-sm text-blue-900 bg-white hover:bg-slate-100 transition-all shadow-md flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 text-blue-700" />
                  <span>Place Your Order Now</span>
                </button>

                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-800/80 hover:bg-blue-800 border border-blue-400 transition-all flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-sky-300" />
                  <span>Schedule Consultation</span>
                </button>

                <a
                  href="https://wa.me/923277993368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center space-x-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp: +92 327-7993368</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
