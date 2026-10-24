import React, { useState, useEffect } from 'react';
import {
  findOrderByReference,
  findBookingById,
  addCustomerUpdateToOrder,
  updateOrderStatus,
  updateBookingStatus,
} from '../services/storage';
import { OrderItem, BookingItem, OrderStatus } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  ExternalLink,
  Calendar,
  Send,
  RefreshCw,
  Phone,
} from 'lucide-react';

interface ClientPortalPageProps {
  initialQuery?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({
  initialQuery = '',
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [matchedOrder, setMatchedOrder] = useState<OrderItem | null>(null);
  const [matchedBooking, setMatchedBooking] = useState<BookingItem | null>(null);
  const [searched, setSearched] = useState(false);

  // Revision Request State
  const [revisionMessage, setRevisionMessage] = useState('');
  const [revisionSuccess, setRevisionSuccess] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (q: string) => {
    const term = q.trim();
    if (!term) return;

    setSearched(true);
    setRevisionSuccess(false);

    const foundOrder = findOrderByReference(term);
    setMatchedOrder(foundOrder || null);

    const foundBooking = findBookingById(term);
    setMatchedBooking(foundBooking || null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedOrder || !revisionMessage.trim()) return;

    const message = `[Client Revision Request]: ${revisionMessage.trim()}`;
    addCustomerUpdateToOrder(matchedOrder.id, message);
    updateOrderStatus(
      matchedOrder.id,
      'Revision Requested',
      'Client submitted a revision request via portal',
      'Client'
    );

    const updated = findOrderByReference(matchedOrder.id);
    if (updated) setMatchedOrder(updated);

    setRevisionMessage('');
    setRevisionSuccess(true);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this consultation appointment?')) {
      updateBookingStatus(bookingId, 'Cancelled', 'Cancelled by client via Client Portal');
      const updated = findBookingById(bookingId);
      if (updated) setMatchedBooking(updated);
    }
  };

  const statusSteps: OrderStatus[] = [
    'New',
    'Under Review',
    'Quote Sent',
    'In Progress',
    'Completed',
  ];

  const getStepStatus = (step: OrderStatus, current: OrderStatus) => {
    const currentIndex = statusSteps.indexOf(current);
    const stepIndex = statusSteps.indexOf(step);

    if (current === 'Cancelled') return 'cancelled';
    if (current === 'Revision Requested' && step === 'In Progress') return 'active';
    if (stepIndex <= currentIndex && currentIndex !== -1) return 'completed';
    return 'pending';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-left text-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
          Self-Service Client Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
          Track Your Order & Bookings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enter your Order ID (e.g. <span className="font-mono font-bold text-blue-700">AWN-ORD-2026-1042</span>), Tracking Code, Booking Number, or Email to view real-time project milestones.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm mb-10">
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Order ID, Tracking Code (TRACK-...), or Booking Number (AWN-CNS-...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20 shrink-0"
          >
            <span>Search Records</span>
          </button>
        </form>

        {/* Demo Quick Search Buttons for Evaluation */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span>Quick test shortcuts:</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('AWN-ORD-2026-1042');
              handleSearch('AWN-ORD-2026-1042');
            }}
            className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-mono font-bold"
          >
            AWN-ORD-2026-1042 (In Progress)
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('AWN-CNS-2026-8812');
              handleSearch('AWN-CNS-2026-8812');
            }}
            className="px-2.5 py-1 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-700 font-mono font-bold"
          >
            AWN-CNS-2026-8812 (Consultation)
          </button>
        </div>
      </div>

      {/* SEARCH RESULTS */}
      {searched && !matchedOrder && !matchedBooking && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center shadow-xs">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No Matching Record Found</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
            We couldn't find an order or booking matching "{searchQuery}". Please verify the reference code provided in your confirmation message.
          </p>
          <a
            href="https://wa.me/923277993368"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs text-emerald-700 font-bold hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Need Help? Contact Farhan on WhatsApp (+92 327-7993368)</span>
          </a>
        </div>
      )}

      {/* MATCHED ORDER DETAILS */}
      {matchedOrder && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-md">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {matchedOrder.wing === 'education' ? 'Awan Academy Order' : 'Think & Design Order'}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {matchedOrder.projectTitle}
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Order ID: <span className="text-blue-700 font-bold">{matchedOrder.id}</span> · Code: {matchedOrder.trackingCode}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block font-semibold">Current Status</span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    matchedOrder.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : matchedOrder.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : matchedOrder.status === 'Revision Requested'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {matchedOrder.status}
                </span>
              </div>
            </div>

            {/* Visual Milestone Progress Tracker */}
            <div className="py-8">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                Milestone Progress Timeline:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {statusSteps.map((step, idx) => {
                  const state = getStepStatus(step, matchedOrder.status);
                  return (
                    <div
                      key={step}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        state === 'completed'
                          ? 'bg-blue-50 border-blue-400 text-blue-800'
                          : state === 'active'
                          ? 'bg-sky-50 border-sky-400 text-sky-800 animate-pulse'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-bold block mb-1">Step {idx + 1}</span>
                      <p className="text-xs font-bold leading-tight">{step}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Specifications & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-3 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Order Details
                </h4>
                <div>
                  <span className="text-slate-500 block">Service:</span>
                  <span className="text-slate-800 font-bold">{matchedOrder.serviceTitle} ({matchedOrder.packageTier})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Rate / Quote:</span>
                  <span className="text-blue-700 font-bold">
                    {matchedOrder.pricePKR !== null && matchedOrder.pricePKR !== undefined
                      ? `PKR ${matchedOrder.pricePKR.toLocaleString()}`
                      : 'Custom Quote'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Target Delivery:</span>
                  <span className="text-slate-800 font-medium">{matchedOrder.expectedDeliveryDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Detailed Scope:</span>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed mt-1">
                    {matchedOrder.detailedRequirements}
                  </p>
                </div>
              </div>

              {/* Customer-Facing Updates */}
              <div className="space-y-3 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Project Updates from Farhan Wajid
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {matchedOrder.customerUpdates.map((update, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                      {update}
                    </div>
                  ))}
                </div>

                {matchedOrder.deliverableLinks && matchedOrder.deliverableLinks.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                      Access Deliverable Files
                    </h5>
                    {matchedOrder.deliverableLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100"
                      >
                        <span>Open Deliverable Preview #{i + 1}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Revision Request Form */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>Submit a Revision or Question for this Order</span>
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Need modifications according to your package's revision limit? Leave a message here and it will alert the administrator.
            </p>

            {revisionSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Revision request submitted successfully! Farhan has been notified.</span>
              </div>
            )}

            <form onSubmit={handleSendRevision} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder="Describe the specific adjustments or feedback required..."
                value={revisionMessage}
                onChange={(e) => setRevisionMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Revision Request</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MATCHED BOOKING DETAILS */}
      {matchedBooking && (
        <div className="mt-8 rounded-3xl p-6 sm:p-8 bg-white border-2 border-sky-300 shadow-lg text-left animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                Consultation Appointment
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {matchedBooking.topic}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Booking ID: {matchedBooking.id}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                matchedBooking.status === 'Confirmed'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : matchedBooking.status === 'Cancelled'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {matchedBooking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 text-xs">
            <div>
              <span className="text-slate-500 block">Date & Slot:</span>
              <span className="font-bold text-slate-800">{matchedBooking.preferredDate} · {matchedBooking.timeSlot}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Channel:</span>
              <span className="font-bold text-emerald-700">{matchedBooking.meetingType}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Client:</span>
              <span className="font-bold text-slate-800">{matchedBooking.fullName} ({matchedBooking.phone})</span>
            </div>
          </div>

          {matchedBooking.status !== 'Cancelled' && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleCancelBooking(matchedBooking.id)}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold"
              >
                Cancel Appointment
              </button>
              <button
                type="button"
                onClick={() => onNavigate('book-consultation', { initialCategory: matchedBooking.category })}
                className="px-4 py-2 rounded-xl text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-300"
              >
                Reschedule Session
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
