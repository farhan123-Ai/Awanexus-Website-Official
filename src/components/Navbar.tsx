import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Cpu,
  Calendar,
  ShoppingBag,
  ShieldAlert,
  ArrowRight,
  Phone,
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const handleNavClick = (page: string, params?: Record<string, string>) => {
    onNavigate(page, params);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'client-portal', label: 'Client Portal' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Main Logo Container - Crisp, High-Contrast */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm group-hover:border-sky-500 transition-all flex items-center justify-center">
              <img
                src="/assets/logos/awanexus-emblem.png"
                alt="AwaNexus Emblem"
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center">
                Awa<span className="text-sky-600">Nexus</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                Innovation & Connectivity
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'home'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'about'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              About Me
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  ['services', 'think-design', 'awan-academy', 'ai-tech'].includes(currentPage)
                    ? 'text-blue-700 bg-blue-50 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Services & Wings</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-84 mt-1 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Dual Organizational Wings
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavClick('think-design')}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 p-1 flex items-center justify-center shrink-0">
                      <img
                        src="/assets/logos/think-and-design-emblem.png"
                        alt="Think & Design"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center">
                        Think & Design
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                          Creative & Tech
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        AI dev, graphic design, video editing & data
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('awan-academy')}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-start space-x-3 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center shrink-0">
                      <img
                        src="/assets/logos/awan-academy-emblem.png"
                        alt="Awan Academy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 flex items-center">
                        Awan Academy
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                          Education
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Guess papers, notes, exam creation & quizzes
                      </p>
                    </div>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => handleNavClick('ai-tech')}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center space-x-2.5 text-xs font-medium text-slate-700 hover:text-blue-600"
                  >
                    <Cpu className="w-4 h-4 text-sky-600" />
                    <span>AI & Technology Architecture</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center space-x-2.5 text-xs font-medium text-slate-700 hover:text-blue-600"
                  >
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span>View All Services Directory</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('portfolio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'portfolio'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Portfolio
            </button>

            <button
              onClick={() => handleNavClick('pricing')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'pricing'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Packages & Pricing
            </button>

            <button
              onClick={() => handleNavClick('client-portal')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'client-portal'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Client Portal
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === 'contact'
                  ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('book-consultation')}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 border border-sky-300 hover:bg-sky-100 transition-all shadow-xs"
            >
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>Book Consultation</span>
            </button>

            <button
              onClick={() => handleNavClick('place-order')}
              className="flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-500/25 hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
            </button>

            {/* Admin Portal Shortcut */}
            <button
              onClick={() => handleNavClick('admin')}
              title="Admin Dashboard"
              className="p-2.5 rounded-xl text-slate-500 hover:text-amber-600 bg-slate-100 hover:bg-amber-50 border border-slate-200 transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => handleNavClick('place-order')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600"
            >
              Order Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 bg-slate-100 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl text-left animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3 border-b border-slate-200">
            <button
              onClick={() => handleNavClick('think-design')}
              className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-white p-1 mb-1 shadow-xs border border-blue-100">
                <img src="/assets/logos/think-and-design-emblem.png" alt="Think & Design" className="w-full h-full object-contain" />
              </div>
              <p className="text-xs font-bold text-slate-900">Think & Design</p>
              <p className="text-[10px] text-slate-500">Creative & Tech</p>
            </button>
            <button
              onClick={() => handleNavClick('awan-academy')}
              className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-white p-1 mb-1 shadow-xs border border-emerald-100">
                <img src="/assets/logos/awan-academy-emblem.png" alt="Awan Academy" className="w-full h-full object-contain" />
              </div>
              <p className="text-xs font-bold text-slate-900">Awan Academy</p>
              <p className="text-[10px] text-slate-500">Educational Wing</p>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  currentPage === link.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('services')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              All Services
            </button>
            <button
              onClick={() => handleNavClick('ai-tech')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              AI & Technology Architecture
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              FAQs & Help
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-700 hover:bg-amber-50 flex items-center justify-between"
            >
              <span>Admin Management Dashboard</span>
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            </button>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('book-consultation')}
              className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-sky-700 bg-sky-50 border border-sky-300"
            >
              Book a Consultation
            </button>
            <a
              href="https://wa.me/923277993368"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 flex items-center justify-center space-x-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: +92 327-7993368</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
