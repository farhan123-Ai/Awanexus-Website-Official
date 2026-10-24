import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Calendar,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface FaqPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

interface FaqItem {
  category: 'Wings & Structure' | 'Orders & Tracking' | 'Pricing & Quotes' | 'Awan Academy Education' | 'Consultations';
  question: string;
  answer: string;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const faqs: FaqItem[] = [
    {
      category: 'Wings & Structure',
      question: 'What is AwaNexus and how does its organization operate?',
      answer:
        'AwaNexus is the parent organization founded by Malik Muhammad Farhan Wajid. It unifies two distinct wings: Wing 1 (Awan Academy) provides academic and educational services including notes, guess papers, and exam creation; Wing 2 (Think & Design) provides creative and technology services including AI web/app/agent development, graphic design, video editing, and Excel management.',
    },
    {
      category: 'Wings & Structure',
      question: 'How do I access the official Awan Academy educational platform?',
      answer:
        'You can visit the dedicated Awan Academy platform directly at https://awan-academy-edueducation.base44.app. It opens in a new browser tab and houses notes, quizzes, and digital educational resources.',
    },
    {
      category: 'Orders & Tracking',
      question: 'How does the order workflow function on AwaNexus?',
      answer:
        'When you select a service and package tier on the "Place an Order" page, our system validates your requirements, creates a record in our database, and generates a unique Order ID (e.g. AWN-ORD-2026-1042) along with an unguessable Tracking Code. You can then view live progress milestones and submit revisions anytime in the Client Portal.',
    },
    {
      category: 'Orders & Tracking',
      question: 'Can I track my order as a guest without creating a login password?',
      answer:
        'Yes! The Client Portal features secure reference tracking. By entering your unique Order ID or Tracking Code and verified email, you can check progress, review deliverables, and submit revision requests without mandatory password hurdles.',
    },
    {
      category: 'Pricing & Quotes',
      question: 'Why are package rates quoted in Pakistani Rupees (PKR) and how are custom quotes handled?',
      answer:
        'All baseline packages are denominated in Pakistani Rupees (PKR) across Basic, Standard, and Premium tiers. If your project has bespoke requirements or enterprise scope, you can choose "Request a Quote" or input your custom budget. The administrator can update approved rates without code changes.',
    },
    {
      category: 'Pricing & Quotes',
      question: 'Are external AI API fees and hosting costs included in AI Agent packages?',
      answer:
        'External third-party usage costs (such as OpenAI/Anthropic/Gemini LLM API tokens, Pinecone vector storage, or dedicated cloud servers) are billed directly based on actual client runtime usage. Our packages cover system prompt engineering, architecture, code development, and integration testing.',
    },
    {
      category: 'Awan Academy Education',
      question: 'What is Awan Academy’s policy on academic integrity and assignment services?',
      answer:
        'Awan Academy strictly adheres to legitimate educational support. Our services for assignments are focused on 1-on-1 concept tutoring, grammar and structural proofreading, research methodology guidance, and style formatting (APA, MLA, Harvard). We do not promote cheating or unfair academic submissions.',
    },
    {
      category: 'Awan Academy Education',
      question: 'Can schools, academies, or tutors get custom-branded exam papers?',
      answer:
        'Yes! Through the Standard and Premium packages, Awan Academy formats midterm, final, and test-session series papers with your school or academy logo, custom watermark, and answer key rubrics.',
    },
    {
      category: 'Consultations',
      question: 'How does the consultation booking calendar prevent double bookings?',
      answer:
        'Our booking engine cross-references all active appointments in the database. When a time slot is reserved for a specific date, it is automatically locked and disabled on the calendar for subsequent visitors, preventing scheduling conflicts.',
    },
  ];

  const categories = ['All', 'Wings & Structure', 'Orders & Tracking', 'Pricing & Quotes', 'Awan Academy Education', 'Consultations'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  const toggleAccordion = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <div className="w-full text-left">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#060c1d] via-[#08122a]/40 to-[#060913] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
              Knowledge Base & Clarifications
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Find transparent answers regarding our dual wing organizational model, order placement workflows, pricing in PKR, academic integrity policies, and consultation scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-slate-950/60 border-b border-slate-800 sticky top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
