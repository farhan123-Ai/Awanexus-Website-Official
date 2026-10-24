import React, { useState } from 'react';
import { ServiceItem, ServicePackage } from '../types';
import {
  Clock,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  Layers,
  Sparkles,
  ChevronRight,
  HelpCircle,
  FileCheck,
  BookOpen,
  FileSpreadsheet,
  Globe,
  Cpu,
  Bot,
  Palette,
  Video,
  Table,
  Terminal,
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectPackage: (service: ServiceItem, pkg: ServicePackage) => void;
  onBookConsultation: (category: string) => void;
  onCustomQuote: (service: ServiceItem) => void;
}

const serviceIconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5 text-blue-600" />,
  Cpu: <Cpu className="w-5 h-5 text-sky-600" />,
  Bot: <Bot className="w-5 h-5 text-indigo-600" />,
  Palette: <Palette className="w-5 h-5 text-pink-600" />,
  Video: <Video className="w-5 h-5 text-rose-600" />,
  Table: <Table className="w-5 h-5 text-teal-600" />,
  Terminal: <Terminal className="w-5 h-5 text-emerald-600" />,
  FileCheck: <FileCheck className="w-5 h-5 text-teal-600" />,
  BookOpen: <BookOpen className="w-5 h-5 text-emerald-600" />,
  FileSpreadsheet: <FileSpreadsheet className="w-5 h-5 text-sky-600" />,
  HelpCircle: <HelpCircle className="w-5 h-5 text-indigo-600" />,
  Layers: <Layers className="w-5 h-5 text-blue-600" />,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelectPackage,
  onBookConsultation,
  onCustomQuote,
}) => {
  const [selectedTab, setSelectedTab] = useState<'packages' | 'deliverables'>('packages');
  const [activePackageIndex, setActivePackageIndex] = useState(
    service.packages.findIndex((p) => p.isPopular) >= 0
      ? service.packages.findIndex((p) => p.isPopular)
      : 1
  );

  const activePackage = service.packages[activePackageIndex] || service.packages[0];

  return (
    <div className="group rounded-3xl bg-white border border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden text-left">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {serviceIconMap[service.icon] || <Sparkles className="w-5 h-5 text-blue-600" />}
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                {service.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
            </div>
          </div>
          {service.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              {service.badge}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          {service.shortDesc}
        </p>

        {/* Turnaround badge */}
        <div className="flex items-center text-[11px] text-slate-500">
          <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
          <span>Turnaround: <span className="text-slate-800 font-semibold">{service.suggestedTurnaround}</span></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50 text-xs font-semibold">
        <button
          onClick={() => setSelectedTab('packages')}
          className={`flex-1 py-2.5 transition-colors border-b-2 ${
            selectedTab === 'packages'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Packages & Pricing ({service.packages.length} Tiers)
        </button>
        <button
          onClick={() => setSelectedTab('deliverables')}
          className={`flex-1 py-2.5 transition-colors border-b-2 ${
            selectedTab === 'deliverables'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Included Deliverables
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {selectedTab === 'packages' ? (
          <div>
            {/* Tier Selector Pills */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 mb-4">
              {service.packages.map((pkg, idx) => (
                <button
                  key={pkg.id}
                  onClick={() => setActivePackageIndex(idx)}
                  className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    activePackageIndex === idx
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pkg.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Package Details */}
            <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {activePackage.name}
                </span>
                {activePackage.isPopular && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Recommended
                  </span>
                )}
              </div>

              <div className="flex items-baseline space-x-1 mb-2">
                <span className="text-xl font-extrabold text-slate-900">
                  {activePackage.pricePKR !== null
                    ? `PKR ${activePackage.pricePKR.toLocaleString()}`
                    : 'Request a Quote'}
                </span>
                {activePackage.pricePKR !== null && (
                  <span className="text-[11px] text-slate-500 font-normal">PKR rate</span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-3">
                {activePackage.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-3 pt-2 border-t border-slate-200">
                <div>
                  <span className="block text-slate-400">Delivery:</span>
                  <span className="font-bold text-slate-800">{activePackage.turnaroundDays}</span>
                </div>
                <div>
                  <span className="block text-slate-400">Revisions:</span>
                  <span className="font-bold text-slate-800">{activePackage.revisions}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                {activePackage.features.map((feature, i) => (
                  <div key={i} className="flex items-start text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mr-1.5 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Standard Deliverables Checklist
            </h4>
            <div className="space-y-2 mb-4">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectPackage(service, activePackage)}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-blue-500/20"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Choose Package</span>
            </button>

            <button
              onClick={() => onBookConsultation(service.category)}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center space-x-1.5 transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>Consultation</span>
            </button>
          </div>

          <button
            onClick={() => onCustomQuote(service)}
            className="w-full py-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center space-x-1"
          >
            <span>Need Custom Requirements? Request a Bespoke Quote</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
