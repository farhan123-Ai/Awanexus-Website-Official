import React, { useState } from 'react';
import { SAMPLE_PROJECTS, DEFAULT_SETTINGS } from '../data/initialData';
import { PortfolioProject } from '../types';
import {
  ExternalLink,
  Code2,
  Sparkles,
  Bot,
  Palette,
  Video,
  Table,
  Filter,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const categories = [
    'All',
    'AI & Web',
    'AI Agents & Apps',
    'Graphic Design',
    'Video & Multimedia',
    'Educational Content',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? SAMPLE_PROJECTS
      : SAMPLE_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full text-left">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#060c1d] via-[#08122a]/40 to-[#060913] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
              Selected Work & Demonstrations
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Portfolio & Project Case Studies
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Demonstrating expertise across intelligent AI web platforms, autonomous agents, vector brand identity design, motion video editing, and academic test engineering.
            </p>
            <p className="text-xs text-slate-400 italic">
              Notice: Demonstrative samples and working platforms labeled clearly until formal client publishing permissions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-slate-950/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center mr-2">
              <Filter className="w-3.5 h-3.5 mr-1" />
              Filter Domain:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl p-6 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_-10px_rgba(56,189,248,0.15)] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {proj.wing === 'education' ? 'Awan Academy' : 'Think & Design'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <p className="text-[11px] text-slate-400 italic">
                    Key Highlight: <span className="text-slate-300">{proj.metrics}</span>
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalProject(proj)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Case Details</span>
                    </button>

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-700/60 text-xs font-semibold hover:bg-cyan-900 inline-flex items-center space-x-1"
                      >
                        <span>Live Platform</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                {activeModalProject.category}
              </span>
              <button
                onClick={() => setActiveModalProject(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-6 space-y-4">
              <h3 className="text-xl font-bold text-white">
                {activeModalProject.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeModalProject.description}
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-cyan-400 uppercase tracking-wider block">
                  Implementation Highlights:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeModalProject.metrics}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeModalProject.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {activeModalProject.liveUrl ? (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-cyan-400 hover:underline flex items-center space-x-1"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-500">Demonstration Project</span>
              )}

              <button
                onClick={() => {
                  setActiveModalProject(null);
                  onNavigate('place-order', { wing: activeModalProject.wing });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
              >
                Request Similar Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
