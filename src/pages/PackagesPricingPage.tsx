import React, { useState } from 'react';
import { getServices } from '../services/storage';
import { ServiceItem, ServicePackage } from '../types';
import {
  ShoppingBag,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  GraduationCap,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';

interface PackagesPricingPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectPackageForOrder: (service: ServiceItem, pkg: ServicePackage) => void;
}

export const PackagesPricingPage: React.FC<PackagesPricingPageProps> = ({
  onNavigate,
  onSelectPackageForOrder,
}) => {
  const services = getServices();
  const [selectedWing, setSelectedWing] = useState<'all' | 'creative' | 'education'>('all');

  const filteredServices = services.filter(
    (s) => selectedWing === 'all' || s.wing === selectedWing
  );

  return (
    <div className="w-full text-left text-slate-800">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-sky-50 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              Transparent Tiered Investment
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Packages & Pricing (PKR)
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every service provides three clear tiers: Basic, Standard, and Premium. Rates are displayed in Pakistani Rupees (PKR) as configurable baseline rates or custom quotes.
            </p>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600">
              <span className="font-bold text-slate-900">Administrator Notice:</span> All package rates, deliverables, turnaround periods, and revision counts can be adjusted in real-time from the <button onClick={() => onNavigate('admin')} className="text-blue-600 underline font-bold">Admin Dashboard</button> without code edits.
            </div>
          </div>
        </div>
      </section>

      {/* Wing Switcher */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedWing('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedWing === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All Packages ({services.length} Services)
            </button>
            <button
              onClick={() => setSelectedWing('creative')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedWing === 'creative'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Think & Design (Creative & Tech)</span>
            </button>
            <button
              onClick={() => setSelectedWing('education')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedWing === 'education'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Awan Academy (Education)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Packages Breakdown */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredServices.map((svc) => (
            <div key={svc.id} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    {svc.category} · {svc.wing === 'education' ? 'Awan Academy' : 'Think & Design'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">{svc.title}</h2>
                </div>
                <button
                  onClick={() => onNavigate('place-order', { serviceId: svc.id, packageTier: 'Custom Quote' })}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Need Custom Scope? Request a Quote →
                </button>
              </div>

              {/* 3 Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {svc.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                      pkg.isPopular
                        ? 'bg-white border-2 border-blue-500 shadow-lg relative scale-[1.02]'
                        : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {pkg.isPopular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs">
                        Most Popular Choice
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-extrabold text-slate-900">{pkg.name}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {pkg.tier}
                        </span>
                      </div>

                      <div className="flex items-baseline space-x-1 mb-3">
                        <span className="text-2xl font-extrabold text-slate-900">
                          {pkg.pricePKR !== null ? `PKR ${pkg.pricePKR.toLocaleString()}` : 'Custom Quote'}
                        </span>
                        {pkg.pricePKR !== null && (
                          <span className="text-xs text-slate-500">PKR rate</span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-5 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        <div>
                          <span className="text-slate-400 block font-semibold">Delivery:</span>
                          <span className="font-bold text-slate-800">{pkg.turnaroundDays}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-semibold">Revisions:</span>
                          <span className="font-bold text-slate-800">{pkg.revisions}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                          Included Features & Standards:
                        </span>
                        {pkg.features.map((f, i) => (
                          <div key={i} className="flex items-start text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mr-2 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <button
                        onClick={() => onSelectPackageForOrder(svc, pkg)}
                        className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                          pkg.isPopular
                            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/25'
                            : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Choose Package & Order</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
