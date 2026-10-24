import React, { useState } from 'react';
import {
  DEFAULT_SETTINGS,
  SAMPLE_EDUCATIONAL_RESOURCES,
} from '../data/initialData';
import { getServices, incrementResourceDownloads } from '../services/storage';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem, ServicePackage, EducationalResource } from '../types';
import {
  GraduationCap,
  ExternalLink,
  BookOpen,
  FileCheck,
  HelpCircle,
  FileSpreadsheet,
  Layers,
  Download,
  Calendar,
  ShoppingBag,
  Mail,
  Phone,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface AwanAcademyPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectPackageForOrder: (service: ServiceItem, pkg: ServicePackage) => void;
}

export const AwanAcademyPage: React.FC<AwanAcademyPageProps> = ({
  onNavigate,
  onSelectPackageForOrder,
}) => {
  const allServices = getServices();
  const educationalServices = allServices.filter((s) => s.wing === 'education');

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [downloadModalResource, setDownloadModalResource] = useState<EducationalResource | null>(null);

  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'English', 'Biology', 'Computer Science'];
  const targetAudiences = [
    { title: 'For Students', desc: 'Conceptual chapter notes, high-yield guess papers, solved exercises, and study outlines to excel in board examinations.' },
    { title: 'For School & College Teachers', desc: 'Custom midterm, final, and class test papers formatted to board patterns with complete answer keys.' },
    { title: 'For Private Tutors & Academies', desc: 'Customized educational materials, test session series, and worksheets printed with your academy branding.' },
    { title: 'For Educational Institutions', desc: 'Complete session question banks, institutional assessment rubrics, and structured curriculum modules.' },
  ];

  const handleDownload = (res: EducationalResource) => {
    incrementResourceDownloads(res.id);
    setDownloadModalResource(res);
  };

  return (
    <div className="w-full text-slate-800 text-left">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-emerald-50 via-teal-50/40 to-white border-b border-emerald-200 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-emerald-300 text-emerald-800 text-xs font-bold shadow-xs">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>AwaNexus Educational Wing</span>
              </div>

              {/* Logo & Headline */}
              <div className="flex items-center space-x-5">
                <div className="p-3 rounded-3xl bg-white border-2 border-emerald-300 shadow-md shrink-0">
                  <img
                    src="/assets/logos/awan-academy-emblem.png"
                    alt="Awan Academy Emblem"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Awan Academy
                  </h1>
                  <p className="text-sm sm:text-base font-bold text-emerald-700 mt-1">
                    Education & Learning Platform
                  </p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Led by <strong className="text-slate-900">{DEFAULT_SETTINGS.contactPhone ? 'Malik Muhammad Farhan Wajid' : 'Farhan Wajid'}</strong> with 4+ years of dedicated teaching and curriculum development experience. Delivering academic guess papers, chapter-wise notes, examination design, and ethical learning assistance.
              </p>

              {/* Prominent External Platform Button & Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={DEFAULT_SETTINGS.academyPlatformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-600/25 transform hover:-translate-y-0.5"
                >
                  <span>Visit Awan Academy Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onNavigate('place-order', { wing: 'education' })}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-800 bg-white border border-emerald-300 hover:bg-emerald-50 transition-all flex items-center space-x-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  <span>Custom Education Order</span>
                </button>

                <button
                  onClick={() => onNavigate('book-consultation', { category: 'Teacher & Academy Partnership Consultation' })}
                  className="px-5 py-3.5 rounded-xl text-xs font-bold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 transition-all flex items-center space-x-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Teacher & Academy Consultation</span>
                </button>
              </div>

              {/* Direct Educational Contacts */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600">
                <a
                  href={`mailto:${DEFAULT_SETTINGS.educationEmail}`}
                  className="flex items-center space-x-1.5 text-emerald-700 font-bold hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{DEFAULT_SETTINGS.educationEmail}</span>
                </a>
                <span className="text-slate-400">|</span>
                <a
                  href="https://wa.me/923277993368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-emerald-700 font-bold hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp: +92 327-7993368</span>
                </a>
              </div>
            </div>

            {/* Right Emblem Showcase Card */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-emerald-200 shadow-lg space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-emerald-100 flex items-center justify-center">
                <img
                  src="/assets/logos/awan-academy-logo.png"
                  alt="Awan Academy Full Logo"
                  className="h-20 object-contain"
                />
              </div>

              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Our Educational Mission</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                "To democratize high-yield academic excellence, empower teachers with professional testing materials, and guide students with conceptual clarity and ethical academic assistance."
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Board-Standard Question Blueprints</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Matric, F.Sc, O/A Levels & Intermediate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Custom Academy Watermarks Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ETHICAL ACADEMIC INTEGRITY NOTICE ===================== */}
      <section className="py-5 bg-emerald-50 border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3 text-xs text-emerald-900 bg-white p-4 rounded-2xl border border-emerald-300 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-800">Ethical Educational Commitment: </span>
              Awan Academy provides legitimate educational support. For assignment services, our role focuses on tutoring, proofreading, structure guidance, research methodologies, and formatting to style standards (APA, MLA, Harvard). We do not engage in deceptive exam fraud or unfair academic submissions.
            </div>
          </div>
        </div>
      </section>

      {/* ===================== AUDIENCE SEGMENTS ===================== */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Serving the Entire Educational Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tailored academic services for individual students, private tutors, academies, and schools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudiences.map((aud, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3">
                  0{i + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{aud.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICES CATALOG ===================== */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
              Educational Catalog
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-3">
              Comprehensive Academic Offerings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Explore our tiered academic packages with transparent PKR pricing and custom quotation capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectPackage={onSelectPackageForOrder}
                onBookConsultation={(category) =>
                  onNavigate('book-consultation', { category: 'Awan Academy Educational Consultation' })
                }
                onCustomQuote={() =>
                  onNavigate('place-order', { serviceId: service.id, packageTier: 'Custom Quote' })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SAMPLE EDUCATIONAL RESOURCES ===================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
                Study Material Previews
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Sample Notes & Guess Paper Downloads
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Preview sample material created by Awan Academy for secondary and higher-secondary examinations.
              </p>
            </div>

            {/* Subject Filter Pills */}
            <div className="mt-4 md:mt-0 flex flex-wrap gap-1.5">
              {subjects.map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedSubject === subj
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAMPLE_EDUCATIONAL_RESOURCES.filter(
              (r) => selectedSubject === 'All' || r.subject === selectedSubject
            ).map((res) => (
              <div
                key={res.id}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {res.category}
                    </span>
                    <span className="text-xs font-bold text-slate-600">{res.classLevel}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">{res.title}</h3>
                  <p className="text-xs text-slate-600 mb-3">{res.description}</p>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200 mb-4 shadow-xs">
                    <p className="text-[11px] font-mono text-emerald-800 line-clamp-2">
                      {res.previewSnippet}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {res.downloadsCount} educators & students accessed
                  </span>
                  <button
                    onClick={() => handleDownload(res)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center space-x-1.5 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View / Download Preview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SAMPLE DOWNLOAD MODAL ===================== */}
      {downloadModalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-3xl bg-white border border-emerald-300 p-6 sm:p-8 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Educational Resource Preview</h3>
              </div>
              <button
                onClick={() => setDownloadModalResource(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {downloadModalResource.category} · {downloadModalResource.classLevel}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">
                  {downloadModalResource.title}
                </h4>
              </div>

              <p className="text-xs text-slate-600">
                {downloadModalResource.description}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Content Sample</p>
                <p className="text-xs text-slate-800 font-mono leading-relaxed">
                  {downloadModalResource.previewSnippet}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                Complete printable versions with answers, solved marking rubrics, and editable Word files are delivered upon ordering or consulting with Awan Academy.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={DEFAULT_SETTINGS.academyPlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1"
              >
                <span>Open in Official Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setDownloadModalResource(null);
                  onNavigate('place-order', { wing: 'education', serviceCategory: 'Awan Academy Educational Services' });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500"
              >
                Order Full Subject Pack
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
