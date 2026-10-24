import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getServices, createOrder } from '../services/storage';
import { ServiceItem, ServicePackage, OrderItem } from '../types';
import {
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Phone,
  Mail,
  Copy,
  ExternalLink,
  ArrowRight,
  Upload,
} from 'lucide-react';

interface PlaceOrderPageProps {
  initialServiceId?: string;
  initialPackageTier?: string;
  initialWing?: 'creative' | 'education';
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const PlaceOrderPage: React.FC<PlaceOrderPageProps> = ({
  initialServiceId,
  initialPackageTier,
  initialWing,
  onNavigate,
}) => {
  const services = getServices();

  const [selectedWing, setSelectedWing] = useState<'creative' | 'education'>(
    initialWing || 'creative'
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || (services[0] ? services[0].id : '')
  );
  const [selectedPackageTier, setSelectedPackageTier] = useState<string>(
    initialPackageTier || 'Standard'
  );

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [detailedRequirements, setDetailedRequirements] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
  const [budgetNotes, setBudgetNotes] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Email' | 'Phone'>('WhatsApp');
  const [referenceLinks, setReferenceLinks] = useState('');
  const [simulatedFiles, setSimulatedFiles] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // State
  const [submittedOrder, setSubmittedOrder] = useState<OrderItem | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Find currently selected service
  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const currentPackage =
    currentService?.packages.find(
      (p) => p.tier.toLowerCase() === selectedPackageTier.toLowerCase()
    ) || currentService?.packages[1];

  useEffect(() => {
    if (initialServiceId) {
      const match = services.find((s) => s.id === initialServiceId);
      if (match) {
        setSelectedServiceId(match.id);
        setSelectedWing(match.wing);
      }
    }
    if (initialPackageTier) {
      setSelectedPackageTier(initialPackageTier);
    }
  }, [initialServiceId, initialPackageTier, services]);

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setSimulatedFiles((prev) => [...prev, ...names]);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide your WhatsApp or phone number (e.g. +92 327-7993368).');
      return;
    }
    if (!projectTitle.trim()) {
      setErrorMessage('Please give your project a brief title.');
      return;
    }
    if (!detailedRequirements.trim() || detailedRequirements.length < 20) {
      setErrorMessage('Please provide detailed requirements (at least 20 characters) so we can review the scope accurately.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage('Please confirm agreement to our terms of service and revision policy.');
      return;
    }

    const newOrder = createOrder({
      customerName,
      email,
      phone,
      wing: currentService.wing,
      serviceCategory: currentService.category,
      serviceTitle: currentService.title,
      packageTier: currentPackage ? currentPackage.name : selectedPackageTier,
      pricePKR: currentPackage ? currentPackage.pricePKR : null,
      budgetNotes: budgetNotes || (currentPackage?.priceDisplay ?? 'Custom Quotation Requested'),
      projectTitle,
      detailedRequirements,
      expectedDeliveryDate: expectedDeliveryDate || 'Standard Turnaround Schedule',
      preferredContact,
      referenceLinks: referenceLinks || undefined,
      fileAttachmentNames: simulatedFiles.length > 0 ? simulatedFiles : undefined,
    });

    setSubmittedOrder(newOrder);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedOrder) {
    const waText = `Hello Malik Muhammad Farhan Wajid, I have placed Order #${submittedOrder.id} (${submittedOrder.serviceTitle} - ${submittedOrder.packageTier}) on AwaNexus. My project title is "${submittedOrder.projectTitle}". Looking forward to your review!`;
    const waUrl = `https://wa.me/923277993368?text=${encodeURIComponent(waText)}`;

    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-left">
        <div className="rounded-3xl p-8 sm:p-10 bg-white border-2 border-emerald-300 shadow-xl">
          <div className="flex items-center space-x-3 text-emerald-700 mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300">
              Order Confirmed & Saved to Database
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Thank You, {submittedOrder.customerName}!
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Your order has been registered in our database with status <span className="font-bold text-sky-700">"New"</span>. Our team at AwaNexus will review your requirements and notify you shortly.
          </p>

          {/* Reference Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                Official Order ID
              </span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-blue-700">
                  {submittedOrder.id}
                </span>
                <button
                  onClick={() => handleCopy(submittedOrder.id)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                  title="Copy ID"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                Client Tracking Code
              </span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-purple-700">
                  {submittedOrder.trackingCode}
                </span>
                <button
                  onClick={() => handleCopy(submittedOrder.trackingCode)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                  title="Copy Code"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {copiedCode && (
            <p className="text-xs text-emerald-600 mb-4 font-bold">
              ✓ Reference code copied to clipboard!
            </p>
          )}

          {/* Order Summary Breakdown */}
          <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 space-y-3 text-xs mb-8">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
              Order Summary Specification
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-500 block">Service:</span>
                <span className="font-bold text-slate-800">{submittedOrder.serviceTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Selected Tier:</span>
                <span className="font-bold text-blue-700">{submittedOrder.packageTier}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Rate / Budget:</span>
                <span className="font-bold text-slate-800">
                  {submittedOrder.pricePKR !== null && submittedOrder.pricePKR !== undefined
                    ? `PKR ${submittedOrder.pricePKR.toLocaleString()}`
                    : 'Custom Quote'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Project Title:</span>
                <span className="font-bold text-slate-800">{submittedOrder.projectTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Delivery:</span>
                <span className="font-bold text-slate-800">{submittedOrder.expectedDeliveryDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Contact Method:</span>
                <span className="font-bold text-slate-800">{submittedOrder.preferredContact} ({submittedOrder.phone})</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center space-x-2 shadow-md shadow-emerald-600/20"
            >
              <Phone className="w-4 h-4" />
              <span>Confirm on WhatsApp Now</span>
            </a>

            <button
              onClick={() => onNavigate('client-portal', { query: submittedOrder.id })}
              className="px-6 py-3 rounded-xl font-bold text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center space-x-2"
            >
              <span>Track in Client Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSubmittedOrder(null);
                setProjectTitle('');
                setDetailedRequirements('');
              }}
              className="px-4 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ORDER FORM VIEW
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-left">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
          Order Placement Workflow
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
          Place a Project Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Select your wing, service, and package tier, or request a custom quotation. Submissions are saved securely to our system and assigned a unique Order ID.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="space-y-8">
        {/* Step 1: Select Wing & Service */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-bold text-slate-900">Select Wing, Service & Package</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wing Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Organizational Wing:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWing('creative');
                    const firstCreative = services.find((s) => s.wing === 'creative');
                    if (firstCreative) setSelectedServiceId(firstCreative.id);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    selectedWing === 'creative'
                      ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold">Think & Design</p>
                  <p className="text-[10px] text-slate-500">Creative & Tech</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedWing('education');
                    const firstEdu = services.find((s) => s.wing === 'education');
                    if (firstEdu) setSelectedServiceId(firstEdu.id);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    selectedWing === 'education'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold">Awan Academy</p>
                  <p className="text-[10px] text-slate-500">Educational Wing</p>
                </button>
              </div>
            </div>

            {/* Service Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Specific Service Offering:
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-500"
              >
                {services
                  .filter((s) => s.wing === selectedWing)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.category})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Package Tier Selector */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Select Package Tier for {currentService?.title}:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentService?.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageTier(pkg.name)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPackageTier.toLowerCase() === pkg.name.toLowerCase()
                      ? 'bg-blue-50/60 border-blue-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{pkg.tier}</span>
                  </div>
                  <p className="text-base font-extrabold text-blue-700 mb-1">
                    {pkg.pricePKR !== null ? `PKR ${pkg.pricePKR.toLocaleString()}` : 'Custom Quote'}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-tight mb-2">
                    {pkg.turnaroundDays} · {pkg.revisions}
                  </p>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {pkg.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Project Requirements */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-3 mb-2 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="text-base font-bold text-slate-900">Project Scope & Requirements</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Real Estate Website with 3D elements / Class 10 Chemistry Guess Papers"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Detailed Requirements & Objectives *
            </label>
            <textarea
              required
              rows={5}
              placeholder="Please describe the deliverables, desired features, style preferences, syllabus topics, or any specific constraints..."
              value={detailedRequirements}
              onChange={(e) => setDetailedRequirements(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Expected Delivery Date
              </label>
              <input
                type="date"
                value={expectedDeliveryDate}
                onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Target Budget (PKR) / Custom Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Standard rate or specify PKR budget limit"
                value={budgetNotes}
                onChange={(e) => setBudgetNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Reference Links (Optional)
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/... or reference website URL"
              value={referenceLinks}
              onChange={(e) => setReferenceLinks(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Simulated File Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Attach Reference Files or Syllabus Documents
            </label>
            <div className="p-4 rounded-2xl border border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 text-center">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <p className="text-xs text-slate-600">
                Click to select files from your computer (PDF, DOCX, PNG, XLSX)
              </p>
              <input
                type="file"
                multiple
                onChange={handleSimulateFileUpload}
                className="mt-2 text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {simulatedFiles.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                  {simulatedFiles.map((file, i) => (
                    <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white border border-slate-200 text-blue-700">
                      📎 {file}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Customer Details & Contact Method */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center space-x-3 mb-2 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="text-base font-bold text-slate-900">Customer Information & Communication</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="+92 300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Preferred Contact Channel
            </label>
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              {(['WhatsApp', 'Email', 'Phone'] as const).map((method) => (
                <label key={method} className="flex items-center space-x-2 cursor-pointer text-slate-700">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={preferredContact === method}
                    onChange={() => setPreferredContact(method)}
                    className="accent-blue-600"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-start space-x-3 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 accent-blue-600 rounded"
              />
              <span>
                I agree to the AwaNexus <button type="button" onClick={() => onNavigate('terms')} className="text-blue-600 font-bold underline">Terms of Service</button> and <button type="button" onClick={() => onNavigate('refunds')} className="text-blue-600 font-bold underline">Revision & Cancellation Policy</button>. I understand academic materials are for legitimate educational guidance.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-extrabold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95"
          >
            Submit Order & Generate Tracking Code →
          </button>
        </div>
      </form>
    </div>
  );
};
