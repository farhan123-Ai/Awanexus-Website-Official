import React from 'react';
import {
  Cpu,
  Bot,
  Terminal,
  Globe,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  ArrowRight,
  AlertCircle,
  Database,
  Code2,
} from 'lucide-react';

interface AiTechnologyPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const AiTechnologyPage: React.FC<AiTechnologyPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full text-left">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#060e24] via-[#071233]/40 to-[#060913] border-b border-cyan-900/40 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[600px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
              Technology Architecture & AI Engineering
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              AI & Advanced Web Engineering
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We architect intelligent digital solutions: combining modern full-stack frameworks (React, TypeScript, Three.js) with LLM integrations, autonomous agent loops, and prompt engineering.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('place-order', { wing: 'creative', serviceId: 'ai-agents' })}
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center space-x-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Custom AI Development</span>
              </button>
              <button
                onClick={() => onNavigate('book-consultation', { category: 'AI Agent Planning Session' })}
                className="px-6 py-3 rounded-xl font-semibold text-xs text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-cyan-800 transition-all flex items-center space-x-1.5"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Schedule AI Planning Session</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent API Notice */}
      <section className="py-4 bg-cyan-950/20 border-b border-cyan-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3 text-xs text-cyan-200/90 bg-cyan-950/40 p-3.5 rounded-xl border border-cyan-800/40">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Commercial Clarity: </span>
              External language model API usage (e.g. OpenAI GPT-4o, Anthropic Claude, Google Gemini), vector database hosting (e.g. Pinecone), third-party subscriptions, and specialized cloud server costs are billed separately based on actual client runtime requirements.
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of AI at AwaNexus */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
              Engineering Disciplines
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-3 mb-3">
              The 4 Pillars of Our AI Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              From web-first user interfaces to autonomous multi-agent systems and verifiable prompt benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 backdrop-blur-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-700/50 flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">1. AI-Assisted 3D Web Development</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We develop reactive web platforms utilizing Three.js and modern WebGL canvases. By combining generative UI logic with dynamic user flows, websites achieve top-tier performance while captivating users with subtle 3D spatial depth.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Responsive WebGL & Three.js Canvas Visuals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Accessible fallbacks & reduced-motion toggles</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 backdrop-blur-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-700/50 flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">2. Autonomous & Support AI Agents</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Moving beyond simple static chatbots to goal-oriented agents capable of memory retrieval, tool execution, customer onboarding, order tracking verification, and seamless human escalation.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Multi-turn conversational memory</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Database & CRM API integrations</span>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 backdrop-blur-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">3. System Prompt Engineering</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reliable AI requires meticulous prompt design. We formulate structured system prompts with strict guardrails, multi-shot demonstrations, and deterministic JSON schemas to ensure zero hallucination in critical workflows.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Guardrails & formatting constraints</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Benchmarking across Claude, GPT-4o & Gemini</span>
                </div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 backdrop-blur-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-700/50 flex items-center justify-center">
                <Database className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">4. Data Pipelines & Document RAG</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your business spreadsheets, PDFs, curriculum guides, and notes into an automated knowledge repository. Enabling your AI tools to answer questions with verifiable citations from your proprietary data.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Document chunking & vector search</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Excel & CSV data extraction pipelines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
