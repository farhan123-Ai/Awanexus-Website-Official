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
  INITIAL_SERVICES,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  SAMPLE_EDUCATIONAL_RESOURCES,
  DEFAULT_SETTINGS,
} from '../data/initialData';

const KEYS = {
  SERVICES: 'awanexus_services_v1',
  ORDERS: 'awanexus_orders_v1',
  BOOKINGS: 'awanexus_bookings_v1',
  RESOURCES: 'awanexus_resources_v1',
  INQUIRIES: 'awanexus_inquiries_v1',
  SETTINGS: 'awanexus_settings_v1',
  ADMIN_AUTH: 'awanexus_admin_auth_v1',
};

// Safe LocalStorage helpers
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

// ----------------- SERVICES & PACKAGES -----------------
export const getServices = (): ServiceItem[] => {
  return loadFromStorage<ServiceItem[]>(KEYS.SERVICES, INITIAL_SERVICES);
};

export const saveServices = (services: ServiceItem[]): void => {
  saveToStorage(KEYS.SERVICES, services);
};

export const updateServicePackage = (
  serviceId: string,
  packageId: string,
  updatedFields: Partial<{
    name: string;
    pricePKR: number | null;
    priceDisplay: string;
    turnaroundDays: string;
    revisions: string;
    description: string;
    features: string[];
  }>
): ServiceItem[] => {
  const current = getServices();
  const next = current.map((svc) => {
    if (svc.id !== serviceId) return svc;
    return {
      ...svc,
      packages: svc.packages.map((pkg) => {
        if (pkg.id !== packageId) return pkg;
        return {
          ...pkg,
          ...updatedFields,
        };
      }),
    };
  });
  saveServices(next);
  return next;
};

// ----------------- ORDERS -----------------
export const getOrders = (): OrderItem[] => {
  return loadFromStorage<OrderItem[]>(KEYS.ORDERS, INITIAL_ORDERS);
};

export const saveOrders = (orders: OrderItem[]): void => {
  saveToStorage(KEYS.ORDERS, orders);
};

export const createOrder = (
  orderData: Omit<OrderItem, 'id' | 'trackingCode' | 'createdAt' | 'status' | 'statusHistory' | 'internalNotes' | 'customerUpdates'>
): OrderItem => {
  const orders = getOrders();
  const timestamp = new Date().toISOString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newId = `AWN-ORD-${new Date().getFullYear()}-${randomSuffix}`;
  const trackingCode = `TRACK-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder: OrderItem = {
    ...orderData,
    id: newId,
    trackingCode,
    createdAt: timestamp,
    status: 'New',
    statusHistory: [
      {
        status: 'New',
        timestamp,
        note: 'Order submitted successfully and received by AwaNexus system.',
        updatedBy: 'System',
      },
    ],
    internalNotes: [`Order received from website portal for ${orderData.customerName}.`],
    customerUpdates: [
      `Thank you for choosing AwaNexus! Your order #${newId} is being reviewed by our team.`,
    ],
  };

  const updated = [newOrder, ...orders];
  saveOrders(updated);
  return newOrder;
};

export const updateOrderStatus = (
  orderId: string,
  newStatus: OrderStatus,
  note: string,
  updatedBy: string = 'Administrator',
  customerVisibleUpdate?: string
): OrderItem | null => {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const target = orders[index];
  const now = new Date().toISOString();

  const newHistory = [
    ...target.statusHistory,
    {
      status: newStatus,
      timestamp: now,
      note,
      updatedBy,
    },
  ];

  const updatedCustomerUpdates = customerVisibleUpdate
    ? [...target.customerUpdates, customerVisibleUpdate]
    : target.customerUpdates;

  const updatedOrder: OrderItem = {
    ...target,
    status: newStatus,
    statusHistory: newHistory,
    customerUpdates: updatedCustomerUpdates,
  };

  orders[index] = updatedOrder;
  saveOrders(orders);
  return updatedOrder;
};

export const addInternalNoteToOrder = (orderId: string, noteText: string): OrderItem | null => {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const target = orders[index];
  const updatedOrder: OrderItem = {
    ...target,
    internalNotes: [...target.internalNotes, `[${new Date().toLocaleDateString()}] ${noteText}`],
  };

  orders[index] = updatedOrder;
  saveOrders(orders);
  return updatedOrder;
};

export const addCustomerUpdateToOrder = (orderId: string, updateText: string): OrderItem | null => {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const target = orders[index];
  const updatedOrder: OrderItem = {
    ...target,
    customerUpdates: [...target.customerUpdates, updateText],
  };

  orders[index] = updatedOrder;
  saveOrders(orders);
  return updatedOrder;
};

export const findOrderByReference = (query: string): OrderItem | undefined => {
  const normalized = query.trim().toUpperCase();
  const orders = getOrders();
  return orders.find(
    (o) =>
      o.id.toUpperCase() === normalized ||
      o.trackingCode.toUpperCase() === normalized ||
      o.email.toUpperCase() === normalized
  );
};

// ----------------- BOOKINGS -----------------
export const getBookings = (): BookingItem[] => {
  return loadFromStorage<BookingItem[]>(KEYS.BOOKINGS, INITIAL_BOOKINGS);
};

export const saveBookings = (bookings: BookingItem[]): void => {
  saveToStorage(KEYS.BOOKINGS, bookings);
};

// Checks for double booking on the same date and timeSlot
export const isSlotAvailable = (date: string, slot: string): boolean => {
  const bookings = getBookings();
  return !bookings.some(
    (b) => b.preferredDate === date && b.timeSlot === slot && b.status !== 'Cancelled'
  );
};

export const createBooking = (
  bookingData: Omit<BookingItem, 'id' | 'createdAt' | 'status'>
): { success: boolean; booking?: BookingItem; message?: string } => {
  // Check double-booking
  if (!isSlotAvailable(bookingData.preferredDate, bookingData.timeSlot)) {
    return {
      success: false,
      message: 'This time slot is already booked for the selected date. Please choose another time slot.',
    };
  }

  const bookings = getBookings();
  const timestamp = new Date().toISOString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newId = `AWN-CNS-${new Date().getFullYear()}-${randomSuffix}`;

  const newBooking: BookingItem = {
    ...bookingData,
    id: newId,
    createdAt: timestamp,
    status: 'Confirmed',
  };

  const updated = [newBooking, ...bookings];
  saveBookings(updated);
  return { success: true, booking: newBooking };
};

export const updateBookingStatus = (
  bookingId: string,
  newStatus: BookingStatus,
  adminNotes?: string
): BookingItem | null => {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === bookingId);
  if (index === -1) return null;

  const target = bookings[index];
  const updatedBooking: BookingItem = {
    ...target,
    status: newStatus,
    adminNotes: adminNotes ?? target.adminNotes,
  };

  bookings[index] = updatedBooking;
  saveBookings(bookings);
  return updatedBooking;
};

export const findBookingById = (bookingId: string): BookingItem | undefined => {
  const normalized = bookingId.trim().toUpperCase();
  const bookings = getBookings();
  return bookings.find((b) => b.id.toUpperCase() === normalized);
};

// ----------------- EDUCATIONAL RESOURCES -----------------
export const getResources = (): EducationalResource[] => {
  return loadFromStorage<EducationalResource[]>(KEYS.RESOURCES, SAMPLE_EDUCATIONAL_RESOURCES);
};

export const saveResources = (resources: EducationalResource[]): void => {
  saveToStorage(KEYS.RESOURCES, resources);
};

export const incrementResourceDownloads = (resourceId: string): void => {
  const current = getResources();
  const updated = current.map((r) =>
    r.id === resourceId ? { ...r, downloadsCount: r.downloadsCount + 1 } : r
  );
  saveResources(updated);
};

// ----------------- CONTACT INQUIRIES -----------------
export const getInquiries = (): ContactInquiry[] => {
  return loadFromStorage<ContactInquiry[]>(KEYS.INQUIRIES, [
    {
      id: 'INQ-901',
      createdAt: '2026-10-22T08:30:00Z',
      name: 'Usman Ali',
      email: 'usman.ali@example.com',
      phone: '+92 312 9876543',
      wing: 'creative',
      subject: 'Inquiry regarding AI Web Redesign',
      message: 'Hello Malik Muhammad Farhan Wajid, we saw your portfolio and are interested in redesigning our tech portal with interactive 3D elements.',
      status: 'Unread',
    },
    {
      id: 'INQ-902',
      createdAt: '2026-10-21T15:20:00Z',
      name: 'Sadia Naveed',
      email: 'sadia.tutor@example.com',
      wing: 'education',
      subject: 'Awan Academy Guess Papers for Punjab Board',
      message: 'Could you please confirm if your Class 10 Chemistry guess papers are updated for the 2026 board exam syllabus?',
      status: 'Responded',
    },
  ]);
};

export const createInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry => {
  const current = getInquiries();
  const newInq: ContactInquiry = {
    ...inquiry,
    id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString(),
    status: 'Unread',
  };
  saveToStorage(KEYS.INQUIRIES, [newInq, ...current]);
  return newInq;
};

// ----------------- SETTINGS -----------------
export const getSettings = (): WebsiteSettings => {
  return loadFromStorage<WebsiteSettings>(KEYS.SETTINGS, DEFAULT_SETTINGS);
};

export const saveSettings = (settings: WebsiteSettings): void => {
  saveToStorage(KEYS.SETTINGS, settings);
};

// ----------------- ADMIN AUTH -----------------
export const isAdminAuthenticated = (): boolean => {
  return sessionStorage.getItem(KEYS.ADMIN_AUTH) === 'true';
};

export const setAdminAuthenticated = (auth: boolean): void => {
  if (auth) {
    sessionStorage.setItem(KEYS.ADMIN_AUTH, 'true');
  } else {
    sessionStorage.removeItem(KEYS.ADMIN_AUTH);
  }
};
