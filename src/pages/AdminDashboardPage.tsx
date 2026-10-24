import React, { useState } from 'react';
import {
  getOrders,
  saveOrders,
  updateOrderStatus,
  addInternalNoteToOrder,
  addCustomerUpdateToOrder,
  getBookings,
  updateBookingStatus,
  getServices,
  updateServicePackage,
  getResources,
  saveResources,
  getInquiries,
  getSettings,
  saveSettings,
  setAdminAuthenticated,
} from '../services/storage';
import {
  OrderItem,
  BookingItem,
  ServiceItem,
  EducationalResource,
  ContactInquiry,
  WebsiteSettings,
  OrderStatus,
  BookingStatus,
} from '../types';
import {
  ShieldAlert,
  ShoppingBag,
  Calendar,
  Layers,
  GraduationCap,
  Mail,
  Settings,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  Send,
  Eye,
  Lock,
  DollarSign,
  TrendingUp,
  UserCheck,
  Phone,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onLogout: () => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onLogout,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'bookings' | 'packages' | 'education' | 'inquiries' | 'settings'
  >('overview');

  // Live states from storage
  const [orders, setOrders] = useState<OrderItem[]>(getOrders());
  const [bookings, setBookings] = useState<BookingItem[]>(getBookings());
  const [services, setServices] = useState<ServiceItem[]>(getServices());
  const [resources, setResources] = useState<EducationalResource[]>(getResources());
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(getInquiries());
  const [settings, setSettingsState] = useState<WebsiteSettings>(getSettings());

  // Order Details Modal / Drawer State
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('In Progress');
  const [statusNote, setStatusNote] = useState('');
  const [internalNoteInput, setInternalNoteInput] = useState('');
  const [clientUpdateInput, setClientUpdateInput] = useState('');
  const [deliverableInput, setDeliverableInput] = useState('');

  // Package Edit State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [pkgPriceInput, setPkgPriceInput] = useState<string>('');
  const [pkgTurnaroundInput, setPkgTurnaroundInput] = useState<string>('');
  const [pkgRevisionsInput, setPkgRevisionsInput] = useState<string>('');
  const [pkgDescInput, setPkgDescInput] = useState<string>('');

  // Settings Save Feedback
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Search / Filters
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Stats Calculations
  const totalOrdersCount = orders.length;
  const newOrdersCount = orders.filter((o) => o.status === 'New').length;
  const inProgressCount = orders.filter((o) => o.status === 'In Progress').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed').length;
  const upcomingBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'Unread').length;

  // Handlers for Order Operations
  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    const updated = updateOrderStatus(
      selectedOrder.id,
      newStatus,
      statusNote || `Status updated to ${newStatus}`,
      'Farhan Wajid',
      clientUpdateInput || undefined
    );
    if (updated) {
      setSelectedOrder(updated);
      setOrders(getOrders());
      setStatusNote('');
      setClientUpdateInput('');
    }
  };

  const handleAddInternalNote = () => {
    if (!selectedOrder || !internalNoteInput.trim()) return;
    const updated = addInternalNoteToOrder(selectedOrder.id, internalNoteInput.trim());
    if (updated) {
      setSelectedOrder(updated);
      setOrders(getOrders());
      setInternalNoteInput('');
    }
  };

  const handleAddDeliverable = () => {
    if (!selectedOrder || !deliverableInput.trim()) return;
    const currentLinks = selectedOrder.deliverableLinks || [];
    const updatedOrder = {
      ...selectedOrder,
      deliverableLinks: [...currentLinks, deliverableInput.trim()],
    };
    const all = orders.map((o) => (o.id === selectedOrder.id ? updatedOrder : o));
    saveOrders(all);
    setSelectedOrder(updatedOrder);
    setOrders(all);
    setDeliverableInput('');
  };

  // Handlers for Booking Operations
  const handleChangeBookingStatus = (id: string, st: BookingStatus) => {
    updateBookingStatus(id, st);
    setBookings(getBookings());
  };

  // Handlers for Package Edit
  const handleStartEditPackage = (svcId: string, pkgId: string) => {
    const svc = services.find((s) => s.id === svcId);
    const pkg = svc?.packages.find((p) => p.id === pkgId);
    if (!svc || !pkg) return;

    setEditingServiceId(svcId);
    setEditingPackageId(pkgId);
    setPkgPriceInput(pkg.pricePKR !== null ? pkg.pricePKR.toString() : '');
    setPkgTurnaroundInput(pkg.turnaroundDays);
    setPkgRevisionsInput(pkg.revisions);
    setPkgDescInput(pkg.description);
  };

  const handleSavePackage = (svcId: string, pkgId: string) => {
    const numPrice = pkgPriceInput.trim() ? parseInt(pkgPriceInput.trim(), 10) : null;
    const updatedServices = updateServicePackage(svcId, pkgId, {
      pricePKR: numPrice,
      priceDisplay: numPrice !== null ? `PKR ${numPrice.toLocaleString()}` : 'Request a Quote',
      turnaroundDays: pkgTurnaroundInput,
      revisions: pkgRevisionsInput,
      description: pkgDescInput,
    });
    setServices(updatedServices);
    setEditingServiceId(null);
    setEditingPackageId(null);
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.projectTitle.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-200 text-left">
      {/* Top Admin Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>AwaNexus Administrator Suite</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Owner Access
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Authenticated Session: <span className="text-slate-200 font-semibold">Malik Muhammad Farhan Wajid</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          >
            View Live Site
          </button>
          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800/50 flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-b border-slate-800 bg-slate-950/40 px-4 sm:px-8 overflow-x-auto">
        <div className="flex space-x-2 py-2 min-w-max">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'orders', label: `Orders (${totalOrdersCount})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'bookings', label: `Consultations (${upcomingBookingsCount})`, icon: <Calendar className="w-4 h-4" /> },
            { id: 'packages', label: 'Service & Package Editor', icon: <Layers className="w-4 h-4" /> },
            { id: 'education', label: 'Awan Academy Manager', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'inquiries', label: `Inquiries (${unreadInquiriesCount})`, icon: <Mail className="w-4 h-4" /> },
            { id: 'settings', label: 'Settings & Business Info', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* ==================== 1. OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Orders</span>
                <p className="text-2xl font-extrabold text-white">{totalOrdersCount}</p>
                <span className="text-[10px] text-slate-500">In Database</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-800/40">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">New Orders</span>
                <p className="text-2xl font-extrabold text-cyan-300">{newOrdersCount}</p>
                <span className="text-[10px] text-cyan-500">Require Review</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-blue-800/40">
                <span className="text-[10px] uppercase font-bold text-blue-400 block mb-1">In Progress</span>
                <p className="text-2xl font-extrabold text-blue-300">{inProgressCount}</p>
                <span className="text-[10px] text-blue-500">Active Work</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-800/40">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Completed</span>
                <p className="text-2xl font-extrabold text-emerald-300">{completedOrdersCount}</p>
                <span className="text-[10px] text-emerald-500">Delivered</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-purple-800/40">
                <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1">Consultations</span>
                <p className="text-2xl font-extrabold text-purple-300">{upcomingBookingsCount}</p>
                <span className="text-[10px] text-purple-500">Confirmed Slots</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-800/40">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Inquiries</span>
                <p className="text-2xl font-extrabold text-amber-300">{unreadInquiriesCount}</p>
                <span className="text-[10px] text-amber-500">Unread Contact</span>
              </div>
            </div>

            {/* Recent Orders & Bookings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-cyan-400" />
                    <span>Recent Customer Orders</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 4).map((o) => (
                    <div
                      key={o.id}
                      onClick={() => {
                        setSelectedOrder(o);
                        setActiveTab('orders');
                      }}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{o.projectTitle}</p>
                        <p className="text-[11px] text-slate-400">
                          {o.customerName} · <span className="font-mono text-cyan-300">{o.id}</span>
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Consultations */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>Upcoming Consultation Appointments</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-purple-400 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{b.topic}</p>
                        <p className="text-[11px] text-slate-400">
                          {b.fullName} · {b.preferredDate} ({b.timeSlot})
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                        {b.meetingType.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. ORDERS MANAGEMENT TAB ==================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders by customer, title, or ID..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Status Filter:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Quote Sent">Quote Sent</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Revision Requested">Revision Requested</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Order ID & Date</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Wing & Service</th>
                      <th className="px-6 py-4">Tier / Rate</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono font-bold text-cyan-300 block">{ord.id}</span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-white">{ord.customerName}</p>
                          <p className="text-[11px] text-slate-400">{ord.email}</p>
                          <p className="text-[10px] text-slate-500">{ord.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-semibold text-slate-400 block">
                            {ord.wing === 'education' ? 'Awan Academy' : 'Think & Design'}
                          </span>
                          <span className="text-white font-medium">{ord.serviceTitle}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-200 block font-semibold">{ord.packageTier}</span>
                          <span className="text-cyan-400 font-mono">
                            {ord.pricePKR !== null && ord.pricePKR !== undefined
                              ? `PKR ${ord.pricePKR.toLocaleString()}`
                              : 'Custom'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              ord.status === 'Completed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                : ord.status === 'In Progress'
                                ? 'bg-blue-950 text-blue-300 border border-blue-700'
                                : ord.status === 'New'
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ORDER MANAGEMENT MODAL */}
            {selectedOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl text-left">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {selectedOrder.id}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        {selectedOrder.projectTitle}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-slate-400 hover:text-white font-bold text-lg"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="py-6 space-y-6">
                    {/* Customer & Scope Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Customer:</span>
                        <span className="font-semibold text-white">{selectedOrder.customerName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Phone:</span>
                        <a href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-400 hover:underline">
                          {selectedOrder.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Email:</span>
                        <span className="font-semibold text-slate-200">{selectedOrder.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Rate / Quote:</span>
                        <span className="font-semibold text-cyan-400">
                          {selectedOrder.pricePKR !== null && selectedOrder.pricePKR !== undefined
                            ? `PKR ${selectedOrder.pricePKR.toLocaleString()}`
                            : 'Custom Quote'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Target Date:</span>
                        <span className="font-semibold text-slate-200">{selectedOrder.expectedDeliveryDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Current Status:</span>
                        <span className="font-bold text-cyan-300">{selectedOrder.status}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Client Scope & Requirements
                      </span>
                      <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                        {selectedOrder.detailedRequirements}
                      </p>
                    </div>

                    {/* Change Status & Post Update */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        Update Order Status & Send Customer Progress Note
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Quote Sent">Quote Sent</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Revision Requested">Revision Requested</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Client-visible update message (optional)..."
                          value={clientUpdateInput}
                          onChange={(e) => setClientUpdateInput(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <button
                        onClick={handleUpdateStatus}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
                      >
                        Commit Status Update
                      </button>
                    </div>

                    {/* Internal Notes (Hidden from Client!) */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Private Internal Administrator Notes (Strictly Hidden from Client)</span>
                      </h4>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {selectedOrder.internalNotes.map((note, i) => (
                          <div key={i} className="text-xs text-slate-300 p-2 rounded-lg bg-slate-900 border border-slate-800">
                            {note}
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Add internal note..."
                          value={internalNoteInput}
                          onChange={(e) => setInternalNoteInput(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                        <button
                          onClick={handleAddInternalNote}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-700 hover:bg-amber-900/60"
                        >
                          Add Note
                        </button>
                      </div>
                    </div>

                    {/* Attach Deliverables Links */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Deliverable Links for Client Access
                      </h4>
                      {selectedOrder.deliverableLinks && selectedOrder.deliverableLinks.length > 0 && (
                        <div className="space-y-1 text-xs">
                          {selectedOrder.deliverableLinks.map((l, idx) => (
                            <a key={idx} href={l} target="_blank" rel="noopener noreferrer" className="block text-emerald-400 hover:underline">
                              {l}
                            </a>
                          ))}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          placeholder="https://drive.google.com/... or preview link"
                          value={deliverableInput}
                          onChange={(e) => setDeliverableInput(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                        />
                        <button
                          onClick={handleAddDeliverable}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950 border border-emerald-700"
                        >
                          Attach Link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. BOOKINGS MANAGEMENT TAB ==================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Consultation Appointments</h2>
              <span className="text-xs text-slate-400 font-mono">
                Working Days: {settings.workingDays} ({settings.workingHours})
              </span>
            </div>

            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Booking ID</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Domain / Topic</th>
                      <th className="px-6 py-4">Date & Slot</th>
                      <th className="px-6 py-4">Channel</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-cyan-300">{b.id}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-white">{b.fullName}</p>
                          <p className="text-[11px] text-slate-400">{b.phone}</p>
                          <p className="text-[10px] text-slate-500">{b.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-200">{b.topic}</p>
                          <span className="text-[10px] text-slate-500">{b.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white">{b.preferredDate}</p>
                          <span className="text-[10px] text-cyan-400">{b.timeSlot}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-300">{b.meetingType}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                : b.status === 'Cancelled'
                                ? 'bg-rose-950 text-rose-300 border border-rose-700'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {b.status !== 'Completed' && (
                            <button
                              onClick={() => handleChangeBookingStatus(b.id, 'Completed')}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700"
                            >
                              Mark Done
                            </button>
                          )}
                          {b.status !== 'Cancelled' && (
                            <button
                              onClick={() => handleChangeBookingStatus(b.id, 'Cancelled')}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-rose-300 bg-rose-950/60 border border-rose-700"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. PACKAGE EDITOR TAB ==================== */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Service Packages & Pricing Editor</h2>
                <p className="text-xs text-slate-400">
                  Update package names, PKR prices, turnaround days, revisions, and descriptions without modifying code.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {services.map((svc) => (
                <div key={svc.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400">{svc.category}</span>
                      <h3 className="text-base font-bold text-white">{svc.title}</h3>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">
                      {svc.wing === 'education' ? 'Awan Academy' : 'Think & Design'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {svc.packages.map((pkg) => {
                      const isEditing = editingServiceId === svc.id && editingPackageId === pkg.id;

                      if (isEditing) {
                        return (
                          <div key={pkg.id} className="p-4 rounded-2xl bg-slate-950 border border-cyan-400 space-y-3">
                            <span className="text-xs font-bold text-cyan-300 block">{pkg.name}</span>
                            <div>
                              <label className="text-[10px] text-slate-400 block">Price (PKR, leave blank for Custom Quote):</label>
                              <input
                                type="number"
                                value={pkgPriceInput}
                                onChange={(e) => setPkgPriceInput(e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block">Turnaround:</label>
                              <input
                                type="text"
                                value={pkgTurnaroundInput}
                                onChange={(e) => setPkgTurnaroundInput(e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block">Revisions:</label>
                              <input
                                type="text"
                                value={pkgRevisionsInput}
                                onChange={(e) => setPkgRevisionsInput(e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block">Description:</label>
                              <textarea
                                rows={2}
                                value={pkgDescInput}
                                onChange={(e) => setPkgDescInput(e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                              />
                            </div>
                            <div className="flex space-x-2 pt-2">
                              <button
                                onClick={() => handleSavePackage(svc.id, pkg.id)}
                                className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={() => {
                                  setEditingServiceId(null);
                                  setEditingPackageId(null);
                                }}
                                className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={pkg.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-white">{pkg.name}</span>
                              <span className="text-[10px] font-semibold text-slate-500">{pkg.tier}</span>
                            </div>
                            <p className="text-base font-extrabold text-cyan-400 mb-1">
                              {pkg.pricePKR !== null ? `PKR ${pkg.pricePKR.toLocaleString()}` : 'Custom Quote'}
                            </p>
                            <p className="text-[11px] text-slate-400 mb-2">
                              {pkg.turnaroundDays} · {pkg.revisions}
                            </p>
                            <p className="text-xs text-slate-300 line-clamp-2">{pkg.description}</p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                            <button
                              onClick={() => handleStartEditPackage(svc.id, pkg.id)}
                              className="px-3 py-1 rounded-lg text-xs font-semibold text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center space-x-1"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit Package</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 5. AWAN ACADEMY MANAGER TAB ==================== */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Awan Academy Sample Resources</h2>
                <p className="text-xs text-slate-400">
                  Manage guess papers, revision notes, model tests, and download metrics.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res) => (
                <div key={res.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {res.category}
                    </span>
                    <span className="text-xs text-slate-400">{res.classLevel}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{res.title}</h4>
                  <p className="text-xs text-slate-300 mb-3">{res.description}</p>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 mb-3">
                    {res.previewSnippet}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>{res.downloadsCount} total downloads</span>
                    <span className="text-emerald-400 font-semibold">Active in Catalog</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 6. INQUIRIES TAB ==================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Contact & Inquiry Submissions</h2>
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{inq.subject}</h4>
                      <p className="text-xs text-slate-400">
                        From: <span className="text-slate-200 font-semibold">{inq.name}</span> ({inq.email} {inq.phone ? `· ${inq.phone}` : ''})
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                      {inq.wing === 'education' ? 'Awan Academy' : 'Think & Design'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    {inq.message}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-500">
                      Received: {new Date(inq.createdAt).toLocaleString()}
                    </span>
                    <a
                      href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 inline-flex items-center space-x-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 7. SETTINGS TAB ==================== */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Organization & Business Configuration</h2>
              <p className="text-xs text-slate-400">
                Update business emails, WhatsApp routing, working hours, and operational status.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Settings saved successfully! Changes are active throughout the platform.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Think & Design Business Email:
                </label>
                <input
                  type="email"
                  value={settings.creativeEmail}
                  onChange={(e) => setSettingsState({ ...settings, creativeEmail: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Awan Academy Educational Email:
                </label>
                <input
                  type="email"
                  value={settings.educationEmail}
                  onChange={(e) => setSettingsState({ ...settings, educationEmail: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Official Awan Academy Platform URL:
                </label>
                <input
                  type="url"
                  value={settings.academyPlatformUrl}
                  onChange={(e) => setSettingsState({ ...settings, academyPlatformUrl: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Phone & WhatsApp Destination:
                  </label>
                  <input
                    type="text"
                    value={settings.contactWhatsApp}
                    onChange={(e) => setSettingsState({ ...settings, contactWhatsApp: e.target.value, contactPhone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Working Days & Hours:
                  </label>
                  <input
                    type="text"
                    value={settings.workingHours}
                    onChange={(e) => setSettingsState({ ...settings, workingHours: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow"
                >
                  Save Business Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
