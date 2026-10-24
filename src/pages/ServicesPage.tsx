import React, { useState } from 'react';
import { getServices } from '../services/storage';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem, ServicePackage } from '../types';
import {
  Search,
  Filter,
  Sparkles,
  GraduationCap,
  Calendar,
  ShoppingBag,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSelectPackageForOrder: (service: ServiceItem, pkg: ServicePackage) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectPackageForOrder,
}) => {
  const services = getServices();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState<'all' | 'creative' | 'education'>('all');

  const filteredServices = services.filter((s) => {
    const matchesWing = selectedWing === 'all' || s.wing === selectedWing;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWing && matchesSearch;
  });

  return (
    <div className="w-full text-left">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#060c1d] via-[#08122a]/40 to-[#060913] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
              Complete Service Directory
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              AwaNexus Professional Services
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore our full catalog across Think & Design (Creative & Technology Wing) and Awan Academy (Educational Wing). Every service offers 3 transparent package tiers in Pakistani Rupees (PKR) and custom quotation options.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-slate-950/60 border-b border-slate-800 sticky top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Wing Filter Pills */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedWing('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedWing === 'all'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Services ({services.length})
              </button>
              <button
                onClick={() => setSelectedWing('creative')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  selectedWing === 'creative'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Think & Design</span>
              </button>
              <button
                onClick={() => setSelectedWing('education')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  selectedWing === 'education'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Awan Academy</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectPackage={onSelectPackageForOrder}
                onBookConsultation={(category) => onNavigate('book-consultation', { category })}
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
