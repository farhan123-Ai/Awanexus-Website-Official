import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ServicesPage } from './pages/ServicesPage';
import { ThinkDesignPage } from './pages/ThinkDesignPage';
import { AwanAcademyPage } from './pages/AwanAcademyPage';
import { AiTechnologyPage } from './pages/AiTechnologyPage';
import { PackagesPricingPage } from './pages/PackagesPricingPage';
import { PlaceOrderPage } from './pages/PlaceOrderPage';
import { BookConsultationPage } from './pages/BookConsultationPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPages } from './pages/LegalPages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';

import { isAdminAuthenticated, setAdminAuthenticated } from './services/storage';
import { ServiceItem, ServicePackage } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [navParams, setNavParams] = useState<Record<string, string>>({});
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(isAdminAuthenticated());

  const handleNavigate = (page: string, params: Record<string, string> = {}) => {
    setCurrentPage(page);
    setNavParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackageForOrder = (service: ServiceItem, pkg: ServicePackage) => {
    handleNavigate('place-order', {
      serviceId: service.id,
      packageTier: pkg.name,
      wing: service.wing,
    });
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentPage('admin');
  };

  // Render content based on current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectPackageForOrder={handleSelectPackageForOrder}
          />
        );

      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;

      case 'portfolio':
        return <PortfolioPage onNavigate={handleNavigate} />;

      case 'services':
        return (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectPackageForOrder={handleSelectPackageForOrder}
          />
        );

      case 'think-design':
        return (
          <ThinkDesignPage
            onNavigate={handleNavigate}
            onSelectPackageForOrder={handleSelectPackageForOrder}
          />
        );

      case 'awan-academy':
        return (
          <AwanAcademyPage
            onNavigate={handleNavigate}
            onSelectPackageForOrder={handleSelectPackageForOrder}
          />
        );

      case 'ai-tech':
        return <AiTechnologyPage onNavigate={handleNavigate} />;

      case 'pricing':
        return (
          <PackagesPricingPage
            onNavigate={handleNavigate}
            onSelectPackageForOrder={handleSelectPackageForOrder}
          />
        );

      case 'place-order':
        return (
          <PlaceOrderPage
            initialServiceId={navParams.serviceId}
            initialPackageTier={navParams.packageTier}
            initialWing={navParams.wing as any}
            onNavigate={handleNavigate}
          />
        );

      case 'book-consultation':
        return (
          <BookConsultationPage
            initialCategory={navParams.category}
            onNavigate={handleNavigate}
          />
        );

      case 'client-portal':
        return (
          <ClientPortalPage
            initialQuery={navParams.query}
            onNavigate={handleNavigate}
          />
        );

      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;

      case 'faq':
        return <FaqPage onNavigate={handleNavigate} />;

      case 'privacy':
        return <LegalPages initialTab="privacy" onNavigate={handleNavigate} />;

      case 'terms':
        return <LegalPages initialTab="terms" onNavigate={handleNavigate} />;

      case 'refunds':
        return <LegalPages initialTab="refunds" onNavigate={handleNavigate} />;

      case 'admin':
        if (isAdminLoggedIn) {
          return (
            <AdminDashboardPage
              onLogout={handleAdminLogout}
              onNavigate={handleNavigate}
            />
          );
        }
        return (
          <LoginPage
            onLoginSuccess={handleAdminLoginSuccess}
            onNavigate={handleNavigate}
          />
        );

      case 'login':
        return (
          <LoginPage
            onLoginSuccess={handleAdminLoginSuccess}
            onNavigate={handleNavigate}
          />
        );

      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectPackageForOrder={handleSelectPackageForOrder}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Action Pill */}
      <WhatsAppFloat />
    </div>
  );
}

export default App;
