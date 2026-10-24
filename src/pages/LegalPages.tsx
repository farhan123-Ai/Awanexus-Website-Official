import React, { useState } from 'react';
import { ShieldCheck, FileText, RefreshCw, AlertCircle } from 'lucide-react';
import { FOUNDER_NAME, DEFAULT_SETTINGS } from '../data/initialData';

interface LegalPagesProps {
  initialTab?: 'privacy' | 'terms' | 'refunds';
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({
  initialTab = 'privacy',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refunds'>(initialTab);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-left">
      {/* Header Tabs */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-800 mb-8">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'privacy'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'terms'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service & Academic Code</span>
        </button>

        <button
          onClick={() => setActiveTab('refunds')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'refunds'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refund, Revision & Cancellation Policy</span>
        </button>
      </div>

      {/* Policy Notice Box */}
      <div className="mb-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3 text-xs text-slate-400">
        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-200">Legal Review Note: </span>
          The terms and conditions below reflect operational standards established by {FOUNDER_NAME} for AwaNexus, Awan Academy, and Think & Design. Standard terms are editable via the Administrator Dashboard.
        </div>
      </div>

      {/* ===================== PRIVACY POLICY ===================== */}
      {activeTab === 'privacy' && (
        <div className="rounded-3xl p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6 text-xs text-slate-300 leading-relaxed">
          <h1 className="text-2xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-[11px] text-slate-500">Effective Date: October 2026 · Last Updated: October 23, 2026</p>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Information We Collect</h3>
            <p>
              When you submit an order, book a consultation appointment, or send an inquiry through AwaNexus, we collect contact information including your full name, email address, phone or WhatsApp number, and project/educational requirements.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Confidentiality & Reference Documents</h3>
            <p>
              Any proprietary files, spreadsheets, syllabus guidelines, and drafts uploaded or shared with AwaNexus are treated with strict confidentiality. Customer information and private administrative notes are never shared with unauthorized third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">3. Communication Channels</h3>
            <p>
              We communicate with clients via WhatsApp (+92 327-7993368) and official email destinations (<span className="text-blue-300">awanexus.association@gmail.com</span> for Think & Design; <span className="text-emerald-300">awanexus.education@gmail.com</span> for Awan Academy). We do not send unsolicited marketing blasts.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">4. Data Retention & Deletion</h3>
            <p>
              Clients may request complete deletion of their order records and attached files from our database at any time by contacting us directly.
            </p>
          </section>
        </div>
      )}

      {/* ===================== TERMS OF SERVICE ===================== */}
      {activeTab === 'terms' && (
        <div className="rounded-3xl p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6 text-xs text-slate-300 leading-relaxed">
          <h1 className="text-2xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-[11px] text-slate-500">Effective Date: October 2026</p>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Organizational Structure</h3>
            <p>
              AwaNexus operates two distinct wings: <span className="text-emerald-300 font-semibold">Awan Academy</span> (Educational Wing) and <span className="text-blue-300 font-semibold">Think & Design</span> (Creative and Technology Wing).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">2. Awan Academy Academic Integrity Code</h3>
            <p className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40 text-emerald-200">
              Awan Academy provides legitimate educational guidance, proofreading, structural review, citation formatting, and practice materials. For academic assignments, services are intended strictly as model tutoring, reference guides, and research assistance. We do not support cheating or fraudulent exam submissions.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">3. Think & Design Scope & Deliverables</h3>
            <p>
              Deliverables are provided according to the selected package tier (Basic, Standard, or Premium). Third-party API usage (such as OpenAI/Gemini/Anthropic LLM API credits, domain registrations, or cloud hosting) is billed separately where applicable.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">4. External Platform Independence</h3>
            <p>
              The official educational platform at <span className="text-cyan-300 font-mono">https://awan-academy-edueducation.base44.app</span> operates as an external educational destination linked from AwaNexus.
            </p>
          </section>
        </div>
      )}

      {/* ===================== REFUND & REVISION ===================== */}
      {activeTab === 'refunds' && (
        <div className="rounded-3xl p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6 text-xs text-slate-300 leading-relaxed">
          <h1 className="text-2xl font-extrabold text-white">Revision, Refund & Cancellation Policy</h1>
          <p className="text-[11px] text-slate-500">Effective Date: October 2026</p>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Package Revisions</h3>
            <p>
              Every package tier specifies an included revision allowance (e.g. 2 to 5 revisions depending on tier). Clients may submit revision requests directly through the Client Portal. Revisions must align with the initial project scope agreed upon at order placement.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Consultation Rescheduling & Cancellation</h3>
            <p>
              Consultation appointments may be rescheduled or cancelled through the Client Portal or WhatsApp with at least 12 hours advance notice, allowing the time slot to be released for other clients.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">3. Custom Quotations & Advance Payments</h3>
            <p>
              For custom projects where advance deposits are collected, work commences following initial deposit confirmation. In the rare event that AwaNexus is unable to fulfill the agreed scope, deposits for uncompleted deliverables are refundable.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};
