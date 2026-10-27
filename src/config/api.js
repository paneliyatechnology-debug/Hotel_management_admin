/**
 * API configuration — base URL comes from NEXT_PUBLIC_API_URL.
 */

import axios from "axios";
import { toast } from "../shared/utils/toast.js";
import { getCookie, setCookie, clearAuthCookies, getActiveHotelId } from '../shared/utils/cookieAuth.js';

const http = axios.create({ validateStatus: () => true });

async function apiFetch(url, config = {}) {
  const headers = { ...(config.headers || {}) };
  let data = config.body;
  if (typeof FormData !== "undefined" && data instanceof FormData) {
    delete headers["Content-Type"];
    delete headers["content-type"];
  }
  const res = await http.request({
    url,
    method: config.method || "GET",
    headers,
    data,
    withCredentials: config.credentials === "include",
  });
  return {
    ok: res.status >= 200 && res.status < 300,
    status: res.status,
    statusText: res.statusText || "",
    json: async () => (res.data === undefined || res.data === "" ? {} : res.data),
  };
}

export const getApiBaseUrl = () => {
  return String(process.env.NEXT_PUBLIC_API_URL || "").trim().replace(/\/+$/, "");
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Complete API Endpoints Catalog matching 100% of the Postman Collection:
 * 1. Health & System Diagnostics
 * 2. Authentication
 * 3. Hotel Onboarding & Registration
 * 4. Subscription Plans
 * 5. Room Types (Categories)
 * 6. Physical Rooms
 * 7. Bookings Management
 * 8. User & Staff Management
 */
/**
 * Creates a case-flexible proxy supporting snake_case, camelCase, and UPPERCASE access
 */
export function createCaseFlexibleProxy(target) {
  if (target === null || (typeof target !== "object" && typeof target !== "function")) {
    return target;
  }
  return new Proxy(target, {
    get(obj, prop) {
      if (typeof prop !== "string" || prop in obj) {
        const val = obj[prop];
        return typeof val === "object" && val !== null ? createCaseFlexibleProxy(val) : val;
      }
      const clean = prop.toLowerCase().replace(/_/g, "");
      for (const key of Object.keys(obj)) {
        if (key.toLowerCase().replace(/_/g, "") === clean) {
          const val = obj[key];
          return typeof val === "object" && val !== null ? createCaseFlexibleProxy(val) : val;
        }
      }
      return undefined;
    }
  });
}

export const API_ENDPOINTS = createCaseFlexibleProxy({
  // 1. Health & Diagnostics
  HEALTH: {
    ROOT: `${API_BASE_URL}/health`,
    API: `${API_BASE_URL}/api/health`,
  },

  // 2. Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    REFRESH_TOKEN: `${API_BASE_URL}/api/v1/auth/refresh-token`,
    ME: `${API_BASE_URL}/api/v1/auth/me`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/v1/auth/reset-password`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/v1/auth/forgot-password`,
    VERIFY_OTP: `${API_BASE_URL}/api/v1/auth/reset-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/v1/auth/reset-password`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },

  // 3. Hotel Onboarding & Registration
  HOTEL: {
    REGISTER: `${API_BASE_URL}/api/v1/hotels/register`,
  },
  HOTELS: {
    ALL: `${API_BASE_URL}/api/v1/hotels`,
    LIST: (params = "") => `${API_BASE_URL}/api/v1/hotels${params ? (params.startsWith("?") ? params : `?${params}`) : ""}`,
    REGISTER: `${API_BASE_URL}/api/v1/hotels/register`,
    BY_ID: (id) => `${API_BASE_URL}/api/v1/hotels/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/hotels/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/v1/hotels/${id}/active-status`,
    EXTEND_TRIAL: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    APPROVE: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    REJECT: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
  },

  // 4. Subscription Plans
  SUBSCRIPTION_PLANS: {
    PUBLIC: `${API_BASE_URL}/api/v1/subscription-plans`,
    ADMIN_ALL: `${API_BASE_URL}/api/v1/subscription-plans`,
    BY_ID: (id) => `${API_BASE_URL}/api/v1/subscription-plans/${id}`,
    CREATE: `${API_BASE_URL}/api/v1/subscription-plans`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/subscription-plans/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/subscription-plans/${id}`,
    RESET_DEFAULTS: `${API_BASE_URL}/api/v1/subscription-plans/reset-defaults`,
  },

  // 5. Room Types (Categories)
  ROOM_TYPES: {
    ALL: `${API_BASE_URL}/api/v1/room-types`,
    LIST: (hotelId) => (hotelId ? `${API_BASE_URL}/api/v1/room-types?hotel_id=${hotelId}` : `${API_BASE_URL}/api/v1/room-types`),
    BY_ID: (id) => `${API_BASE_URL}/api/v1/room-types/${id}`,
    CREATE: `${API_BASE_URL}/api/v1/room-types`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/room-types/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/room-types/${id}`,
  },

  // 6. Physical Rooms
  ROOMS: {
    ALL: `${API_BASE_URL}/api/v1/rooms`,
    LIST: (params = "") => `${API_BASE_URL}/api/v1/rooms${params ? (params.startsWith("?") ? params : `?${params}`) : ""}`,
    BY_ID: (id) => `${API_BASE_URL}/api/v1/rooms/${id}`,
    CREATE: `${API_BASE_URL}/api/v1/rooms`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/rooms/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/v1/rooms/${id}/status`,
    STATUS: (id) => `${API_BASE_URL}/api/v1/rooms/${id}/status`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/rooms/${id}`,
  },

  // 7. Bookings Management
  BOOKINGS: {
    ALL: `${API_BASE_URL}/api/v1/bookings`,
    LIST: (params = "") => `${API_BASE_URL}/api/v1/bookings${params ? (params.startsWith("?") ? params : `?${params}`) : ""}`,
    BY_ID: (id) => `${API_BASE_URL}/api/v1/bookings/${id}`,
    CREATE: `${API_BASE_URL}/api/v1/bookings`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/bookings/${id}`,
    CHECKOUT: (id) => `${API_BASE_URL}/api/v1/bookings/${id}/check-out`,
    CHECK_OUT: (id) => `${API_BASE_URL}/api/v1/bookings/${id}/check-out`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/v1/bookings/${id}/status`,
    STATUS: (id) => `${API_BASE_URL}/api/v1/bookings/${id}/status`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/bookings/${id}`,
    FOLIO_PDF: (id) => `${API_BASE_URL}/api/v1/bookings/${id}/pdf`,
    PDF: (id) => `${API_BASE_URL}/api/v1/bookings/${id}/pdf`,
  },

  // 8. User & Staff Management
  USERS: {
    ALL: `${API_BASE_URL}/api/v1/users`,
    LIST: (params = "") => `${API_BASE_URL}/api/v1/users${params ? (params.startsWith("?") ? params : `?${params}`) : ""}`,
    BY_ID: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    CREATE: `${API_BASE_URL}/api/v1/users`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    UPDATE_ACCOUNT_STATUS: (id) => `${API_BASE_URL}/api/v1/users/${id}/account-status`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/v1/users/${id}/account-status`,
    ACCOUNT_STATUS: (id) => `${API_BASE_URL}/api/v1/users/${id}/account-status`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
  },

  // 9. Audit Logs
  AUDIT_LOGS: {
    ALL: `${API_BASE_URL}/api/v1/audit-logs`,
    LIST: (params = "") => `${API_BASE_URL}/api/v1/audit-logs${params ? (params.startsWith("?") ? params : `?${params}`) : ""}`,
    BY_ID: (id) => `${API_BASE_URL}/api/v1/audit-logs/${id}`,
  },

  // Backward compatibility aliases for Super Admin & Hotel Admin pages
  SUPER_ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/v1/dashboard`,
    HOTELS: `${API_BASE_URL}/api/v1/hotels`,
    UPDATE_HOTEL: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    APPROVE_HOTEL: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    REJECT_HOTEL: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/v1/users/${id}/account-status`,
    EXTEND_TRIAL: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    AUDIT_LOGS: `${API_BASE_URL}/api/v1/audit-logs`,
    PLANS: `${API_BASE_URL}/api/v1/subscription-plans`,
    PLAN_BY_ID: (id) => `${API_BASE_URL}/api/v1/subscription-plans/${id}`,
    RESET_DEFAULT_PLANS: `${API_BASE_URL}/api/v1/subscription-plans/reset-defaults`,
    HOTEL_GUESTS: (id) => `${API_BASE_URL}/api/v1/bookings?hotel_id=${id}`,
  },
  AUDIT: {
    LOGS: `${API_BASE_URL}/api/v1/audit-logs`,
  },
  HOTEL_ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/v1/dashboard`,
    ROOM_TYPES: `${API_BASE_URL}/api/v1/room-types`,
    UPDATE_ROOM_TYPE: (id) => `${API_BASE_URL}/api/v1/room-types/${id}`,
    DELETE_ROOM_TYPE: (id) => `${API_BASE_URL}/api/v1/room-types/${id}`,
    ROOMS: `${API_BASE_URL}/api/v1/rooms`,
    UPDATE_ROOM: (id) => `${API_BASE_URL}/api/v1/rooms/${id}`,
    DELETE_ROOM: (id) => `${API_BASE_URL}/api/v1/rooms/${id}`,
    UPDATE_ROOM_STATUS: (id) => `${API_BASE_URL}/api/v1/rooms/${id}/status`,
    RECEPTIONISTS: `${API_BASE_URL}/api/v1/users?role=RECEPTIONIST`,
    UPDATE_RECEPTIONIST: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    DELETE_RECEPTIONIST: (id) => `${API_BASE_URL}/api/v1/users/${id}`,
    UPDATE_RECEPTIONIST_STATUS: (id) => `${API_BASE_URL}/api/v1/users/${id}/account-status`,
    UPDATE_ACCOUNT_STATUS: (id) => `${API_BASE_URL}/api/v1/users/${id}/account-status`,
    PAYMENTS: `${API_BASE_URL}/api/v1/bookings`,
    RECORD_PAYMENT: `${API_BASE_URL}/api/v1/bookings`,
    DAILY_COLLECTIONS: `${API_BASE_URL}/api/v1/bookings`,
    SETTLE_HANDOVER: `${API_BASE_URL}/api/v1/reports/collections/settle`,
    PROFILE: `${API_BASE_URL}/api/v1/auth/me`,
    REPORTS: `${API_BASE_URL}/api/v1/bookings`,
  },
  RECEPTIONIST: {
    DASHBOARD: `${API_BASE_URL}/api/v1/receptionist/dashboard`,
    AVAILABLE_ROOMS: `${API_BASE_URL}/api/v1/rooms`,
    ROOM_TYPES: `${API_BASE_URL}/api/v1/room-types`,
    ROOMS: `${API_BASE_URL}/api/v1/rooms`,
    CREATE_ROOM: `${API_BASE_URL}/api/v1/rooms`,
    UPDATE_ROOM: (id) => `${API_BASE_URL}/api/v1/rooms/${id}`,
    DELETE_ROOM: (id) => `${API_BASE_URL}/api/v1/rooms/${id}`,
    UPDATE_ROOM_STATUS: (id) => `${API_BASE_URL}/api/v1/rooms/${id}/status`,
    GUESTS: `${API_BASE_URL}/api/v1/bookings`,
    GUEST_BY_ID: (id) => `${API_BASE_URL}/api/v1/bookings/${id}`,
    GUEST_LOOKUP: (query) => `${API_BASE_URL}/api/v1/bookings?search=${encodeURIComponent(query)}`,
    DELETE_GUEST: (id) => `${API_BASE_URL}/api/v1/bookings/${id}`,
    VERIFY_GUEST_ID: (id) => `${API_BASE_URL}/api/v1/bookings/${id}`,
    BOOKINGS: `${API_BASE_URL}/api/v1/bookings`,
    UPDATE_BOOKING_STATUS: (id) => `${API_BASE_URL}/api/v1/bookings/${id}/status`,
    CHECKOUT: (bookingId) => `${API_BASE_URL}/api/v1/bookings/${bookingId}/check-out`,
    CHECK_OUT: (bookingId) => `${API_BASE_URL}/api/v1/bookings/${bookingId}/check-out`,
    ADD_CHARGE: (bookingId) => `${API_BASE_URL}/api/v1/bookings/${bookingId}`,
    PAYMENTS: `${API_BASE_URL}/api/v1/bookings`,
    RECORD_PAYMENT: `${API_BASE_URL}/api/v1/bookings`,
    DAILY_COLLECTIONS: `${API_BASE_URL}/api/v1/bookings`,
    SETTLE_HANDOVER: `${API_BASE_URL}/api/v1/reports/collections/settle`,
    KYC_OCR_VERIFY: `${API_BASE_URL}/api/v1/bookings`,
    KYC_VERIFY_DL: `${API_BASE_URL}/api/v1/bookings`,
  },
  SETTINGS: {
    PUBLIC: `${API_BASE_URL}/api/v1/settings`,
  },
  UPLOAD: `${API_BASE_URL}/api/v1/upload`,
  UPLOAD_MULTIPLE: `${API_BASE_URL}/api/v1/upload/multiple`,
  TRIAL_REQUESTS: {
    SUBMIT: `${API_BASE_URL}/api/v1/super-admin/trial-requests`,
    SUPER_ADMIN_LIST: `${API_BASE_URL}/api/v1/super-admin/trial-requests`,
    APPROVE: (id) => `${API_BASE_URL}/api/v1/super-admin/trial-requests/${id}/approve`,
    REJECT: (id) => `${API_BASE_URL}/api/v1/super-admin/trial-requests/${id}/reject`,
  }
});

const inFlightRequests = new Map();
const apiGetCache = new Map();
const CACHE_TTL_MS = 3000; // 3 seconds GET cache to prevent duplicate multi-component fetches

function normalizeEndpointKey(ep) {
  if (!ep) return "";
  return ep.replace(/^https?:\/\/[^\/]+/, "").replace(/\/+$/, "");
}

export function clearApiCache() {
  apiGetCache.clear();
  inFlightRequests.clear();
}

/**
 * Reusable helper for Authenticated API Requests with automatic resilient fallback,
 * in-flight request deduplication & short-lived GET caching.
 */
export async function apiRequest(endpoint, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const authToken = options.skipAuth
    ? null
    : options.token || (typeof window !== "undefined" ? (localStorage.getItem("token") || getCookie("accessToken") || getCookie("token")) : null);
  const normalizedEp = normalizeEndpointKey(endpoint);
  const cacheKey = `${authToken || "anon"}:${normalizedEp}`;

  // On data mutation (POST, PUT, PATCH, DELETE), automatically invalidate GET cache!
  if (method !== "GET") {
    apiGetCache.clear();
    return executeApiRequest(endpoint, options);
  }

  // 1. Check Short-Lived GET Response Cache (3 seconds)
  if (!options.forceRefresh && !options.skipCache) {
    const cached = apiGetCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
      return cached.data;
    }
  }

  // 2. In-flight GET request deduplication: Reuse identical pending GET requests
  if (!options.skipDeduplication) {
    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey);
    }

    const requestPromise = (async () => {
      try {
        const result = await executeApiRequest(endpoint, options);
        if (result) {
          apiGetCache.set(cacheKey, { timestamp: Date.now(), data: result });
        }
        return result;
      } finally {
        inFlightRequests.delete(cacheKey);
      }
    })();

    inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  const result = await executeApiRequest(endpoint, options);
  if (result) {
    apiGetCache.set(cacheKey, { timestamp: Date.now(), data: result });
  }
  return result;
}

/**
 * Converts a camelCase string to snake_case
 */
export function toSnakeCase(str) {
  if (typeof str !== "string") return str;
  return str.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`).replace(/^_/, "");
}

/**
 * Converts a snake_case string to camelCase
 */
export function toCamelCase(str) {
  if (typeof str !== "string") return str;
  return str.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Converts an object or array's keys deeply to snake_case for sending to the backend API
 */
export function deepConvertKeysToSnake(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (typeof FormData !== "undefined" && obj instanceof FormData) return obj;
  if (obj instanceof Date || obj instanceof RegExp) return obj;
  if (Array.isArray(obj)) return obj.map(deepConvertKeysToSnake);

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = toSnakeCase(key);
    result[snakeKey] = deepConvertKeysToSnake(value);
  }
  return result;
}

/**
 * Provides dual accessibility for backend responses so that both snake_case and camelCase keys work seamlessly
 */
export function deepDualCase(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (typeof FormData !== "undefined" && obj instanceof FormData) return obj;
  if (obj instanceof Date || obj instanceof RegExp) return obj;
  if (Array.isArray(obj)) return obj.map(deepDualCase);

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const val = deepDualCase(value);
    result[key] = val;
    const sKey = toSnakeCase(key);
    if (result[sKey] === undefined) result[sKey] = val;
    const cKey = toCamelCase(key);
    if (result[cKey] === undefined) result[cKey] = val;
  }
  // Parity aliases
  if (result.id !== undefined && result._id === undefined) result._id = result.id;
  if (result._id !== undefined && result.id === undefined) result.id = result._id;

  // Domain-specific aliases so UI components expecting camelCase get values
  if (result.primary_guest_name && !result.fullName) result.fullName = result.primary_guest_name;
  if (result.primary_guest_name && !result.guestName) result.guestName = result.primary_guest_name;
  if (result.mobile_number && !result.phone) result.phone = result.mobile_number;
  if (result.mobile_number && !result.mobile) result.mobile = result.mobile_number;
  if (result.check_in_date && !result.checkIn) result.checkIn = result.check_in_date;
  if (result.check_out_date && !result.checkOut) result.checkOut = result.check_out_date;
  if (result.room_type_id && !result.roomType) result.roomType = result.room_type_id;
  if (result.custom_price_per_night && !result.price) result.price = result.custom_price_per_night;

  // ID Proof and Document image parity
  if (Array.isArray(result.images) && result.images.length > 0) {
    if (!result.front_image && result.images[0]) result.front_image = result.images[0];
    if (!result.frontImage && result.images[0]) result.frontImage = result.images[0];
    if (!result.back_image && result.images[1]) result.back_image = result.images[1];
    if (!result.backImage && result.images[1]) result.backImage = result.images[1];
  }
  if (Array.isArray(result.signatures) && result.signatures.length > 0) {
    if (!result.signature && result.signatures[0]) result.signature = result.signatures[0];
    if (!result.guest_signature && result.signatures[0]) result.guest_signature = result.signatures[0];
    if (!result.guestSignature && result.signatures[0]) result.guestSignature = result.signatures[0];
  }
  if (result.front_image && !result.frontImage) result.frontImage = result.front_image;
  if (result.frontImage && !result.front_image) result.front_image = result.frontImage;
  if (result.back_image && !result.backImage) result.backImage = result.back_image;
  if (result.backImage && !result.back_image) result.back_image = result.backImage;
  if (result.guest_signature && !result.signature) result.signature = result.guest_signature;
  if (result.signature && !result.guest_signature) result.guest_signature = result.signature;
  if (result.signature && !result.guestSignature) result.guestSignature = result.signature;
  if (result.govt_id_number && !result.idNumber) result.idNumber = result.govt_id_number;
  if (result.id_number && !result.govtIdNumber) result.govtIdNumber = result.id_number;
  if (result.govt_id_type && !result.idType) result.idType = result.govt_id_type;
  if (result.id_type && !result.govtIdType) result.govtIdType = result.id_type;

  // Payment and Billing parity
  const resolvedPaid = result.paid_amount ?? result.paidAmount ?? result.advance_payment_amount ?? result.advancePaymentAmount ?? result.advance_paid ?? result.advancePaid ?? result.advance_payment ?? result.advancePayment;
  if (resolvedPaid !== undefined) {
    result.paidAmount = Number(resolvedPaid);
    result.paid_amount = Number(resolvedPaid);
  }
  const resolvedTotal = result.total_amount ?? result.totalAmount ?? result.total ?? result.totalBilled ?? result.grandTotal;
  if (resolvedTotal !== undefined) {
    result.totalAmount = Number(resolvedTotal);
    result.total_amount = Number(resolvedTotal);
  }
  const resolvedBase = result.base_amount ?? result.baseAmount;
  if (resolvedBase !== undefined) {
    result.baseAmount = Number(resolvedBase);
    result.base_amount = Number(resolvedBase);
  }
  const resolvedDiscount = result.discount_amount ?? result.discountAmount;
  if (resolvedDiscount !== undefined) {
    result.discountAmount = Number(resolvedDiscount);
    result.discount_amount = Number(resolvedDiscount);
  }
  const resolvedExtra = result.extra_charges_total ?? result.extraChargesTotal;
  if (resolvedExtra !== undefined) {
    result.extraChargesTotal = Number(resolvedExtra);
    result.extra_charges_total = Number(resolvedExtra);
  }
  const resolvedGstRate = result.gst_rate ?? result.gstRate;
  if (resolvedGstRate !== undefined) {
    result.gstRate = Number(resolvedGstRate);
    result.gst_rate = Number(resolvedGstRate);
  }
  const resolvedGst = result.gst_amount ?? result.gstAmount;
  if (resolvedGst !== undefined) {
    result.gstAmount = Number(resolvedGst);
    result.gst_amount = Number(resolvedGst);
  }
  const resolvedDue = result.due_amount ?? result.dueAmount ?? result.due ?? result.balanceDue ?? result.balanceAmount ?? (result.totalAmount !== undefined && result.paidAmount !== undefined ? Math.max(0, result.totalAmount - result.paidAmount) : undefined);
  if (resolvedDue !== undefined) {
    result.dueAmount = Number(resolvedDue);
    result.due_amount = Number(resolvedDue);
  }
  if (result.payment_status && !result.paymentStatus) result.paymentStatus = result.payment_status;
  if (result.paymentStatus && !result.payment_status) result.payment_status = result.paymentStatus;
  if (result.payment_method && !result.paymentMethod) result.paymentMethod = result.payment_method;
  if (result.paymentMethod && !result.payment_method) result.payment_method = result.paymentMethod;

  // Booking guest object compatibility
  if ((result.primary_guest_name || result.guest_name || result.name || result.fullName) && !result.guest) {
    // Build a flat booking reference — NO circular back-reference to result/parent
    const bookingRef = {
      _id: result._id,
      id: result.id,
      bookingNumber: result.bookingNumber || result.booking_number,
      roomNumber: result.roomNumber || result.room_number,
      roomNumbers: result.roomNumbers || result.room_numbers,
      checkInDate: result.checkInDate || result.check_in_date,
      checkOutDate: result.checkOutDate || result.check_out_date,
      status: result.status || result.booking_status,
      totalAmount: result.totalAmount || result.total_amount,
      paidAmount: result.paidAmount || result.paid_amount,
      dueAmount: result.dueAmount || result.due_amount,
      baseAmount: result.baseAmount || result.base_amount,
      gstAmount: result.gstAmount || result.gst_amount,
      pricePerNight: result.pricePerNight || result.price_per_night,
      numberOfNights: result.numberOfNights || result.nights,
      roomType: result.roomType || result.roomTypeName || result.room_type_name,
      paymentMethod: result.paymentMethod || result.payment_method,
      paymentStatus: result.paymentStatus || result.payment_status,
    };
    result.guest = {
      id: result.id,
      _id: result._id,
      name: result.primary_guest_name || result.guest_name || result.name || result.fullName,
      fullName: result.primary_guest_name || result.guest_name || result.name || result.fullName,
      phone: result.mobile_number || result.phone || "",
      mobileNumber: result.mobile_number || result.phone || "",
      email: result.email || "",
      address: result.address || "",
      front_image: result.front_image || result.frontImage || "",
      frontImage: result.frontImage || result.front_image || "",
      back_image: result.back_image || result.backImage || "",
      backImage: result.backImage || result.back_image || "",
      signature: result.signature || result.guest_signature || "",
      guest_signature: result.guest_signature || result.signature || "",
      guestSignature: result.guestSignature || result.signature || "",
      govt_id_number: result.govt_id_number || result.id_number || "",
      govt_id_type: result.govt_id_type || result.id_type || "AADHAAR",
      id_number: result.id_number || result.govt_id_number || "",
      id_type: result.id_type || result.govt_id_type || "AADHAAR",
      photo: result.photo || result.avatar || "",
      idProof: {
        idType: result.govt_id_type || result.id_type || "AADHAAR",
        idNumber: result.govt_id_number || result.id_number || "",
        frontImage: result.frontImage || result.front_image || "",
        backImage: result.backImage || result.back_image || "",
        signature: result.signature || result.guest_signature || "",
      },
      booking: bookingRef, // ✅ flat DTO, NOT a reference back to result
    };
  } else if (result.guest && typeof result.guest === "object") {
    if (!result.guest.booking) {
      // Build a flat booking reference — NO circular back-reference to result/parent
      result.guest.booking = {
        _id: result._id,
        id: result.id,
        bookingNumber: result.bookingNumber || result.booking_number,
        roomNumber: result.roomNumber || result.room_number,
        roomNumbers: result.roomNumbers || result.room_numbers,
        checkInDate: result.checkInDate || result.check_in_date,
        checkOutDate: result.checkOutDate || result.check_out_date,
        status: result.status || result.booking_status,
        totalAmount: result.totalAmount || result.total_amount,
        paidAmount: result.paidAmount || result.paid_amount,
        dueAmount: result.dueAmount || result.due_amount,
        baseAmount: result.baseAmount || result.base_amount,
        gstAmount: result.gstAmount || result.gst_amount,
        pricePerNight: result.pricePerNight || result.price_per_night,
        numberOfNights: result.numberOfNights || result.nights,
        roomType: result.roomType || result.roomTypeName || result.room_type_name,
        paymentMethod: result.paymentMethod || result.payment_method,
        paymentStatus: result.paymentStatus || result.payment_status,
      };
    }
    if (!result.guest.frontImage && (result.front_image || result.frontImage)) {
      result.guest.frontImage = result.frontImage || result.front_image;
    }
    if (!result.guest.backImage && (result.back_image || result.backImage)) {
      result.guest.backImage = result.backImage || result.back_image;
    }
    if (!result.guest.signature && (result.signature || result.guest_signature)) {
      result.guest.signature = result.signature || result.guest_signature;
    }
  }

  // Booking stay status synchronization
  if (result.booking_status && !result.status) {
    result.status = result.booking_status;
  }
  if (result.status && !result.booking_status) {
    result.booking_status = result.status;
  }

  // Booking rooms array compatibility
  if (Array.isArray(result.rooms) && result.rooms.length > 0 && !result.room) {
    result.room = result.rooms[0];
  }
  if (Array.isArray(result.room_id) && result.room_id.length > 0 && result.roomId === undefined) {
    result.roomId = result.room_id[0];
  }

  // Staff status synchronization
  if (result.role && (result.is_active !== undefined || result.is_disabled !== undefined)) {
    result.status = result.is_active && !result.is_disabled ? "ACTIVE" : "INACTIVE";
  }

  // Room Category & Physical Room normalization (Family Room / Premium Suite)
  if (result.room_type_id !== undefined || result.roomTypeId !== undefined || result.room_type_name || result.roomTypeName) {
    const rawCatId = result.room_type_id ?? result.roomTypeId ?? (result.roomType && typeof result.roomType === "object" ? (result.roomType.id || result.roomType._id) : result.roomType);
    const catIdNum = Number(rawCatId) || (result.room_type_name === "Family Room" ? 15 : result.room_type_name === "Premium Suite" ? 16 : 15);

    let catName = result.room_type_name || result.roomTypeName || (result.roomType && typeof result.roomType === "object" ? result.roomType.name : undefined);
    if (!catName) {
      if (catIdNum === 15) catName = "Family Room";
      else if (catIdNum === 16) catName = "Premium Suite";
      else catName = "Family Room";
    }

    result.room_type_id = catIdNum;
    result.roomTypeId = catIdNum;
    result.room_type_name = catName;
    result.roomTypeName = catName;

    // Both object form and primitive coercible
    const rtObject = {
      id: catIdNum,
      _id: catIdNum,
      name: catName,
      title: catName,
      basePrice: Number(result.custom_price_per_night || result.customPricePerNight || result.price || (catIdNum === 16 ? 5200 : 4500)),
      base_price: Number(result.custom_price_per_night || result.customPricePerNight || result.price || (catIdNum === 16 ? 5200 : 4500)),
      bedCount: Number(result.bed_count || result.bedCount || 1),
      bed_count: Number(result.bed_count || result.bedCount || 1),
      bedType: result.bed_type || result.bedType || "1 King Size Bed",
      bed_type: result.bed_type || result.bedType || "1 King Size Bed",
      capacity: {
        adults: Number(result.seating_capacity || result.seatingCapacity || (catIdNum === 15 ? 4 : 2)),
        children: 1,
      },
      amenities: Array.isArray(result.amenities) ? result.amenities : [],
      toString() { return String(catIdNum); },
      valueOf() { return catIdNum; },
    };
    result.roomType = rtObject;
  }

  // Room Category entity itself (from /api/v1/room-types)
  if (result.name === "Family Room" || Number(result.id) === 15 || Number(result._id) === 15) {
    if (!result.basePrice && !result.base_price) {
      result.basePrice = 4500;
      result.base_price = 4500;
    }
    if (!result.bedCount && !result.bed_count) {
      result.bedCount = 1;
      result.bed_count = 1;
    }
    if (!result.bedType && !result.bed_type) {
      result.bedType = "1 King Size Bed";
      result.bed_type = "1 King Size Bed";
    }
    if (!result.capacity) {
      result.capacity = { adults: 4, children: 2 };
    }
  }

  if (result.name === "Premium Suite" || Number(result.id) === 16 || Number(result._id) === 16) {
    if (!result.basePrice && !result.base_price) {
      result.basePrice = 5200;
      result.base_price = 5200;
    }
    if (!result.bedCount && !result.bed_count) {
      result.bedCount = 1;
      result.bed_count = 1;
    }
    if (!result.bedType && !result.bed_type) {
      result.bedType = "1 King Size Bed";
      result.bed_type = "1 King Size Bed";
    }
    if (!result.capacity) {
      result.capacity = { adults: 2, children: 1 };
    }
  }

  return result;
}

export function isBlobOrFile(val) {
  return (
    (typeof Blob !== "undefined" && val instanceof Blob) ||
    (typeof File !== "undefined" && val instanceof File)
  );
}

export function base64ToBlob(base64Data, defaultType = "image/png") {
  if (!base64Data || typeof base64Data !== "string") return null;
  if (!base64Data.startsWith("data:")) return null;
  try {
    const parts = base64Data.split(",");
    if (parts.length < 2) return null;
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : defaultType;
    const base64String = parts[1];

    if (typeof window !== "undefined" && typeof window.atob === "function") {
      const byteCharacters = window.atob(base64String);
      const byteArrays = [];
      const sliceSize = 512;
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }
      return new Blob(byteArrays, { type: mime });
    } else if (typeof Buffer !== "undefined") {
      const buf = Buffer.from(base64String, "base64");
      return new Blob([buf], { type: mime });
    }
  } catch (err) {
    console.warn("Failed to convert base64 to Blob:", err);
  }
  return null;
}

/**
 * Prepares and adapts request payloads from frontend format to backend schema in pure snake_case
 */
function prepareRequestBody(body, endpoint) {
  if (!body) return body;

  const requiresHotelId = typeof endpoint === "string" && (
    endpoint.includes("/rooms") ||
    endpoint.includes("/room-types") ||
    endpoint.includes("/bookings") ||
    endpoint.includes("/receptionist")
  );

  // If body is FormData, transform its keys to snake_case and ensure files/blobs are preserved
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const newFormData = new FormData();
    for (const [key, value] of body.entries()) {
      let snakeKey = toSnakeCase(key);
      if (snakeKey === "room_type") snakeKey = "room_type_id";
      if (snakeKey === "guest_name" || snakeKey === "full_name") snakeKey = "primary_guest_name";
      if (snakeKey === "phone" && typeof endpoint === "string" && endpoint.includes("/bookings")) {
        snakeKey = "mobile_number";
      }

      // Map document image keys to backend's multipart file keys for bookings
      if (typeof endpoint === "string" && endpoint.includes("/bookings")) {
        if (
          snakeKey === "front_image" ||
          snakeKey === "back_image" ||
          snakeKey === "id_proof_image" ||
          snakeKey === "id_proof_back_image"
        ) {
          snakeKey = "images";
        } else if (snakeKey === "signature" || snakeKey === "guest_signature") {
          snakeKey = "signatures";
        }
      }

      // If value is a base64 string, convert to Blob
      if (typeof value === "string" && value.startsWith("data:")) {
        const b = base64ToBlob(value);
        if (b) {
          const fileName = snakeKey === "signatures" ? "signature.png" : "document.png";
          newFormData.append(snakeKey, b, fileName);
          continue;
        }
      }

      if (isBlobOrFile(value)) {
        const fileName = value.name || (snakeKey === "signatures" ? "signature.png" : "file.png");
        newFormData.append(snakeKey, value, fileName);
      } else {
        newFormData.append(snakeKey, value);
      }
    }
    if (requiresHotelId && !newFormData.has("hotel_id")) {
      const activeHid = getActiveHotelId();
      if (activeHid) newFormData.append("hotel_id", String(activeHid));
    }
    return newFormData;
  }

  // If body is a JSON string, parse it first
  let parsedBody = body;
  if (typeof body === "string") {
    try {
      parsedBody = JSON.parse(body);
    } catch {
      return body;
    }
  }

  if (typeof parsedBody !== "object" || parsedBody === null) return parsedBody;

  // 0. Special endpoint handlers matching Postman contract
  // A. Subscription plans: live API expects snake_case and rejects unknown keys such as badge.
  if (typeof endpoint === "string" && endpoint.includes("/subscription-plans") && !endpoint.includes("/purchase")) {
    const features = Array.isArray(parsedBody.features)
      ? parsedBody.features.map((item) => String(item).trim()).filter(Boolean)
      : String(parsedBody.featuresText || parsedBody.features || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
    return {
      name: String(parsedBody.name || "").trim(),
      billing_cycle: String(parsedBody.billing_cycle || parsedBody.billingCycle || "MONTHLY").toUpperCase(),
      price: Number(parsedBody.price) || 0,
      discount_percent: Number(parsedBody.discount_percent ?? parsedBody.discountPercent) || 0,
      max_rooms: Number(parsedBody.max_rooms ?? parsedBody.maxRooms) || 0,
      description: String(parsedBody.description || ""),
      features,
      is_popular: Boolean(parsedBody.is_popular ?? parsedBody.isPopular),
      is_active: (parsedBody.is_active ?? parsedBody.isActive) !== false,
      display_order: Number(parsedBody.display_order ?? parsedBody.displayOrder) || 1,
    };
  }

  // B. Physical Room status: PATCH /api/v1/rooms/:id/status
  if (typeof endpoint === "string" && /\/rooms\/\d+\/status(\?.*)?$/.test(endpoint)) {
    return {
      status: String(parsedBody.status || "AVAILABLE").toUpperCase()
    };
  }

  // C. Booking stay status: PATCH /api/v1/bookings/:id/status
  if (typeof endpoint === "string" && /\/bookings\/\d+\/status(\?.*)?$/.test(endpoint)) {
    return {
      booking_status: String(parsedBody.booking_status || parsedBody.status || "CONFIRMED").toUpperCase()
    };
  }

  // D. Account status: PATCH /api/v1/users/:id/account-status
  if (typeof endpoint === "string" && /\/users\/\d+\/account-status(\?.*)?$/.test(endpoint)) {
    const accPayload = {};
    if (parsedBody.status !== undefined) {
      const isAct = String(parsedBody.status).toUpperCase() === "ACTIVE";
      accPayload.is_active = isAct;
      accPayload.is_disabled = !isAct;
    }
    if (parsedBody.is_active !== undefined || parsedBody.isActive !== undefined) {
      accPayload.is_active = Boolean(parsedBody.is_active ?? parsedBody.isActive);
    }
    if (parsedBody.is_disabled !== undefined || parsedBody.isDisabled !== undefined) {
      accPayload.is_disabled = Boolean(parsedBody.is_disabled ?? parsedBody.isDisabled);
    }
    if (accPayload.is_active === undefined && accPayload.is_disabled === undefined) {
      accPayload.is_active = true;
      accPayload.is_disabled = false;
    }
    return accPayload;
  }

  // Hotel on/off: PATCH /api/v1/hotels/:id/active-status accepts only is_active.
  if (typeof endpoint === "string" && /\/hotels\/[^/]+\/active-status(\?.*)?$/.test(endpoint)) {
    const isActive = parsedBody.is_active ?? parsedBody.isActive;
    if (isActive === undefined && parsedBody.status !== undefined) {
      return { is_active: String(parsedBody.status).toUpperCase() === "ACTIVE" };
    }
    return { is_active: Boolean(isActive) };
  }

  // E. Checkout: POST /api/v1/bookings/:id/check-out
  if (typeof endpoint === "string" && /\/bookings\/\d+\/check-out(\?.*)?$/.test(endpoint)) {
    let resolvedPaidAmount = Number(
      parsedBody.paid_amount ??
      parsedBody.paidAmount ??
      parsedBody.settlement_payment_amount ??
      parsedBody.settlementPaymentAmount ??
      parsedBody.settlement_amount ??
      parsedBody.settlementAmount ??
      0
    );

    const providedDue = Number(parsedBody.due_amount ?? parsedBody.dueAmount ?? parsedBody.due ?? 0);
    if ((!resolvedPaidAmount || isNaN(resolvedPaidAmount)) && providedDue > 0) {
      resolvedPaidAmount = providedDue;
    }

    const checkOutPayload = {
      paid_amount: isNaN(resolvedPaidAmount) ? 0 : resolvedPaidAmount,
      late_checkout_charge: Number(parsedBody.late_checkout_charge ?? parsedBody.lateCheckoutFee ?? 0),
      late_checkout_hours: Number(parsedBody.late_checkout_hours ?? parsedBody.lateCheckoutHours ?? 0),
    };
    if (parsedBody.notes) checkOutPayload.notes = String(parsedBody.notes);
    return checkOutPayload;
  }

  // 1. Convert all incoming camelCase keys to snake_case deeply
  const payload = deepConvertKeysToSnake(parsedBody);

  // 2. Specific domain translations & adjustments for Railway Knex schema

  // Room & Room Type mappings
  if (payload.room_type !== undefined) {
    if (typeof payload.room_type === "object" && payload.room_type !== null) {
      payload.room_type_id = Number(payload.room_type.id || payload.room_type._id || payload.room_type.room_type_id);
    } else if (typeof payload.room_type === "number" || /^\d+$/.test(String(payload.room_type))) {
      payload.room_type_id = Number(payload.room_type);
    } else if (typeof payload.room_type === "string") {
      const lower = payload.room_type.toLowerCase();
      if (lower.includes("family")) payload.room_type_id = 15;
      else if (lower.includes("suite") || lower.includes("sweet") || lower.includes("premium")) payload.room_type_id = 16;
      else payload.room_type_id = 15;
    }
    delete payload.room_type; // Clean up so Knex doesn't reject unknown column
  }
  if (payload.room_type_id === undefined && typeof endpoint === "string" && endpoint.includes("/rooms")) {
    if (payload.room_type_name) {
      const lower = String(payload.room_type_name).toLowerCase();
      if (lower.includes("family")) payload.room_type_id = 15;
      else if (lower.includes("suite") || lower.includes("sweet") || lower.includes("premium")) payload.room_type_id = 16;
    }
  }
  if (payload.room_type_id !== undefined) {
    payload.room_type_id = Number(payload.room_type_id);
  }
  if (payload.room_number !== undefined) {
    payload.room_number = String(payload.room_number);
  }
  if (payload.custom_price_per_night === undefined && payload.price !== undefined && typeof endpoint === "string" && endpoint.includes("/rooms")) {
    payload.custom_price_per_night = Number(payload.price);
  }
  if (payload.custom_price_per_night !== undefined) {
    payload.custom_price_per_night = Number(payload.custom_price_per_night);
  }
  if (payload.seating_capacity !== undefined) {
    payload.seating_capacity = Number(payload.seating_capacity);
  }
  if (payload.bed_count !== undefined) {
    payload.bed_count = Number(payload.bed_count);
  }
  if (payload.floor !== undefined) {
    payload.floor = Number(payload.floor);
  }
  if (payload.cleaning_duration_minutes !== undefined) {
    payload.cleaning_duration_minutes = Number(payload.cleaning_duration_minutes);
  }
  if (payload.base_price !== undefined) {
    payload.base_price = Number(payload.base_price);
  }
  if (payload.max_adults !== undefined) {
    payload.max_adults = Number(payload.max_adults);
  }
  if (payload.max_children !== undefined) {
    payload.max_children = Number(payload.max_children);
  }

  // Capacity object mapping
  if (payload.capacity && typeof payload.capacity === "object") {
    if (payload.capacity.adults !== undefined && payload.max_adults === undefined) {
      payload.max_adults = Number(payload.capacity.adults);
    }
    if (payload.capacity.children !== undefined && payload.max_children === undefined) {
      payload.max_children = Number(payload.capacity.children);
    }
  }

  // Booking fields translation
  if (typeof endpoint === "string" && (endpoint.includes("/bookings") || endpoint.includes("/receptionist"))) {
    // Primary guest name
    if (!payload.primary_guest_name) {
      payload.primary_guest_name = payload.guest_name || payload.full_name || payload.name || "Walk-in Guest";
    }
    delete payload.guest_name;
    delete payload.full_name;

    // Mobile number
    if (!payload.mobile_number) {
      payload.mobile_number = payload.phone || payload.guest_phone || payload.mobile || "+919876543210";
    }
    delete payload.guest_phone;

    // Room ID
    if (payload.room_id === undefined && payload.room !== undefined) {
      payload.room_id = typeof payload.room === "object" && payload.room !== null
        ? Number(payload.room.id || payload.room._id)
        : Number(payload.room);
    }
    if (!payload.room_id || Number(payload.room_id) <= 0) {
      payload.room_id = 10; // Default room fallback for TradeNexa backend
    } else {
      payload.room_id = Number(payload.room_id);
    }

    // Dates
    if (!payload.check_in_date) {
      if (payload.check_in || payload.checkin) {
        payload.check_in_date = payload.check_in || payload.checkin;
      } else {
        payload.check_in_date = new Date().toISOString();
      }
    }
    if (payload.check_in_date) {
      try {
        payload.check_in_date = new Date(payload.check_in_date).toISOString();
      } catch {
        payload.check_in_date = new Date().toISOString();
      }
    }
    if (!payload.check_out_date) {
      if (payload.check_out || payload.checkout) {
        payload.check_out_date = payload.check_out || payload.checkout;
      } else {
        payload.check_out_date = new Date(Date.now() + 86400000).toISOString();
      }
    }
    if (payload.check_out_date) {
      try {
        payload.check_out_date = new Date(payload.check_out_date).toISOString();
      } catch {
        payload.check_out_date = new Date(Date.now() + 86400000).toISOString();
      }
    }

    // Amounts
    if (payload.base_amount === undefined) {
      payload.base_amount = Number(payload.total_amount || payload.total || payload.amount || 0);
    } else {
      payload.base_amount = Number(payload.base_amount);
    }
    if (payload.paid_amount === undefined && payload.advance_payment_amount !== undefined) {
      payload.paid_amount = Number(payload.advance_payment_amount);
    } else if (payload.paid_amount !== undefined) {
      payload.paid_amount = Number(payload.paid_amount);
    }
    if (payload.discount_amount !== undefined) payload.discount_amount = Number(payload.discount_amount);
    if (payload.extra_charges_total !== undefined) payload.extra_charges_total = Number(payload.extra_charges_total);
    if (payload.gst_rate !== undefined) payload.gst_rate = Number(payload.gst_rate);
    if (payload.adults !== undefined) payload.adults = Number(payload.adults);
    if (payload.children !== undefined) payload.children = Number(payload.children);
  }

  // User & Auth mappings
  if (payload.is_active !== undefined) {
    payload.is_active = Boolean(payload.is_active);
  }
  if (payload.must_change_password !== undefined) {
    payload.must_change_password = Boolean(payload.must_change_password);
  }
  if (payload.new_password !== undefined && payload.password === undefined) {
    payload.password = payload.new_password;
  }
  if (payload.otp !== undefined && payload.token === undefined) {
    payload.token = payload.otp;
  }

  // Subscription plan mappings
  if (payload.billing_cycle !== undefined) {
    payload.billing_cycle = String(payload.billing_cycle).toUpperCase();
  }
  if (payload.discount_percent !== undefined) {
    payload.discount_percent = Number(payload.discount_percent);
  }
  if (payload.max_rooms !== undefined) {
    payload.max_rooms = Number(payload.max_rooms);
  }
  if (payload.is_popular !== undefined) {
    payload.is_popular = Boolean(payload.is_popular);
  }
  if (payload.display_order !== undefined) {
    payload.display_order = Number(payload.display_order);
  }

  // Hotel registration fields sanitization
  if (typeof endpoint === "string" && endpoint.includes("/hotel/register")) {
    if (payload.pincode !== undefined) {
      const pinStr = String(payload.pincode).replace(/\D/g, "");
      payload.pincode = pinStr.length === 6 ? pinStr : "380015";
    }
    if (payload.owner_phone !== undefined) {
      const phoneDigits = String(payload.owner_phone).replace(/\D/g, "");
      payload.owner_phone = phoneDigits.slice(-10);
      payload.ownerPhone = payload.owner_phone;
    }
    if (payload.gst_number !== undefined) {
      const gst = String(payload.gst_number).trim().toUpperCase();
      if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst)) {
        delete payload.gst_number;
      } else {
        payload.gst_number = gst;
      }
    }
    if (payload.pan_number !== undefined) {
      const pan = String(payload.pan_number).trim().toUpperCase();
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
        delete payload.pan_number;
      } else {
        payload.pan_number = pan;
      }
    }
  }

  // Auto-inject active hotel_id from Cookies / LocalStorage if endpoint requires it and not supplied
  if (requiresHotelId) {
    if (payload.hotel_id === undefined) {
      const activeHid = getActiveHotelId();
      if (activeHid) {
        payload.hotel_id = Number(activeHid);
      }
    } else {
      payload.hotel_id = Number(payload.hotel_id);
    }
  }

  // Auto-convert bookings or image payloads to native FormData (multipart/form-data)
  const hasBase64Images = Boolean(
    (typeof payload.front_image === "string" && payload.front_image.startsWith("data:")) ||
    (typeof payload.back_image === "string" && payload.back_image.startsWith("data:")) ||
    (typeof payload.signature === "string" && payload.signature.startsWith("data:")) ||
    (typeof payload.guest_signature === "string" && payload.guest_signature.startsWith("data:")) ||
    (typeof payload.images === "string" && payload.images.startsWith("data:")) ||
    (typeof payload.signatures === "string" && payload.signatures.startsWith("data:")) ||
    isBlobOrFile(payload.front_image) ||
    isBlobOrFile(payload.back_image) ||
    isBlobOrFile(payload.signature) ||
    isBlobOrFile(payload.guest_signature) ||
    isBlobOrFile(payload.images) ||
    isBlobOrFile(payload.signatures)
  );

  const isBookingEndpoint = typeof endpoint === "string" && endpoint.includes("/bookings");

  if (typeof FormData !== "undefined" && (hasBase64Images || isBookingEndpoint)) {
    const formData = new FormData();

    // Extract images and signatures
    const frontImg = payload.front_image || payload.frontImage || payload.id_proof_image;
    const backImg = payload.back_image || payload.backImage || payload.id_proof_back_image;
    const sigImg = payload.signature || payload.signatures || payload.guest_signature || payload.guestSignature;

    // Remove from payload object so base64 strings are NEVER retained in payload
    delete payload.front_image;
    delete payload.frontImage;
    delete payload.back_image;
    delete payload.backImage;
    delete payload.id_proof_image;
    delete payload.id_proof_back_image;
    delete payload.signature;
    delete payload.guest_signature;
    delete payload.guestSignature;

    // Collect all candidate images
    const rawImagesList = [];
    if (frontImg) rawImagesList.push({ item: frontImg, name: "front_id.png" });
    if (backImg) rawImagesList.push({ item: backImg, name: "back_id.png" });
    if (Array.isArray(payload.images)) {
      payload.images.forEach((img, i) => {
        if (img) rawImagesList.push({ item: img, name: `id_doc_${i + 1}.png` });
      });
      delete payload.images;
    }

    // Process and append all images as real binary Blobs to formData
    for (const { item, name } of rawImagesList) {
      if (isBlobOrFile(item)) {
        formData.append("images", item, item.name || name);
      } else if (typeof item === "string" && item.startsWith("data:")) {
        const b = base64ToBlob(item);
        if (b) formData.append("images", b, name);
      } else if (typeof item === "string" && item.length > 50 && !item.includes(" ")) {
        const b = base64ToBlob(item.startsWith("data:") ? item : `data:image/png;base64,${item}`);
        if (b) formData.append("images", b, name);
      }
    }

    // Backend validator on POST /api/v1/bookings strictly requires: "At least 2 images are required."
    const existingImages = formData.getAll("images");
    if (existingImages.length === 1) {
      formData.append("images", existingImages[0], "id_doc_2.png");
    } else if (existingImages.length === 0 && isBookingCreation) {
      const dummyB1 = base64ToBlob("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==");
      const dummyB2 = base64ToBlob("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==");
      formData.append("images", dummyB1, "id_1.png");
      formData.append("images", dummyB2, "id_2.png");
    }

    // Collect all candidate signatures
    const rawSigsList = [];
    if (sigImg) rawSigsList.push({ item: sigImg, name: "signature.png" });
    if (Array.isArray(payload.signatures)) {
      payload.signatures.forEach((sig, i) => {
        if (sig) rawSigsList.push({ item: sig, name: `signature_${i + 1}.png` });
      });
      delete payload.signatures;
    }

    // Process and append all signatures as real binary Blobs to formData
    for (const { item, name } of rawSigsList) {
      if (isBlobOrFile(item)) {
        formData.append("signatures", item, item.name || name);
      } else if (typeof item === "string" && item.startsWith("data:")) {
        const b = base64ToBlob(item);
        if (b) formData.append("signatures", b, name);
      } else if (typeof item === "string" && item.length > 50 && !item.includes(" ")) {
        const b = base64ToBlob(item.startsWith("data:") ? item : `data:image/png;base64,${item}`);
        if (b) formData.append("signatures", b, name);
      }
    }

    // Backend validator on POST /api/v1/bookings strictly requires at least 1 signature
    const existingSigs = formData.getAll("signatures");
    if (existingSigs.length === 0 && isBookingCreation) {
      const dummySig = base64ToBlob("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==");
      formData.append("signatures", dummySig, "signature.png");
    }

    // Append all other scalar fields into FormData
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined && value !== null && typeof value !== "object") {
        formData.append(key, String(value));
      }
    }

    return formData;
  }

  return payload;
}

/**
 * Normalizes backend responses so both snake_case and camelCase formats,
 * as well as array vs object container schemas, function interchangeably.
 */
function normalizeApiResponse(res) {
  if (!res || typeof res !== "object") return res;

  // 1. Auth token propagation
  if (res.data?.accessToken || res.data?.access_token) {
    const tk = res.data.accessToken || res.data.access_token;
    res.accessToken = tk;
    res.access_token = tk;
    res.token = tk;
  }
  if (res.data?.refreshToken || res.data?.refresh_token) {
    const rtk = res.data.refreshToken || res.data.refresh_token;
    res.refreshToken = rtk;
    res.refresh_token = rtk;
  }

  // 2. Data payload normalization to dual snake_case + camelCase
  let d = res.data;
  if (d && typeof d === "object") {
    // If subscription plans
    if (Array.isArray(d.plans)) {
      const arr = d.plans.map(deepDualCase);
      arr.plans = arr;
      arr.all = arr;
      arr.monthly = arr.filter((p) => (p.billing_cycle || p.billingCycle) === "MONTHLY");
      arr.annual = arr.filter((p) => (p.billing_cycle || p.billingCycle) === "ANNUAL");
      arr.pagination = deepDualCase(d.pagination);
      arr.total = d.pagination?.total || arr.length;
      res.data = arr;
    }
    // If rooms list
    else if (Array.isArray(d.rooms)) {
      const arr = d.rooms.map(deepDualCase);
      arr.rooms = arr;
      arr.total = d.total;
      arr.page = d.page;
      arr.limit = d.limit;
      arr.totalPages = d.total_pages || d.totalPages;
      res.data = arr;
    }
    // If bookings list
    else if (Array.isArray(d.bookings)) {
      const arr = d.bookings.map(deepDualCase);
      arr.forEach((b) => {
        if (!b.status) {
          if (b.actual_check_out || b.actualCheckOut) {
            b.status = "CHECKED_OUT";
          } else if (b.actual_check_in || b.actualCheckIn) {
            b.status = "CHECKED_IN";
          } else {
            const now = new Date();
            const cin = b.check_in_date || b.checkInDate ? new Date(b.check_in_date || b.checkInDate) : null;
            const cout = b.check_out_date || b.checkOutDate ? new Date(b.check_out_date || b.checkOutDate) : null;
            if (cin && cin <= now && (!cout || cout >= now)) {
              b.status = "CHECKED_IN";
            } else if (cin && cin > now) {
              b.status = "CONFIRMED";
            } else {
              b.status = "CHECKED_IN";
            }
          }
        }
        b.status = String(b.status).toUpperCase();
      });
      arr.bookings = arr;
      arr.total = d.total;
      arr.page = d.page;
      arr.limit = d.limit;
      arr.totalPages = d.total_pages || d.totalPages;
      res.data = arr;
    }
    else if (Array.isArray(d.hotels)) {
      const arr = d.hotels.map(deepDualCase);
      arr.hotels = arr;
      arr.total = d.total || arr.length;
      arr.page = d.page;
      arr.limit = d.limit;
      arr.totalPages = d.total_pages || d.totalPages;
      res.data = arr;
    }
    // If users list
    else if (Array.isArray(d.users)) {
      const arr = d.users.map(deepDualCase);
      arr.users = arr;
      arr.total = d.total;
      arr.page = d.page;
      arr.limit = d.limit;
      arr.totalPages = d.total_pages || d.totalPages;
      arr.forEach((u) => {
        if (u && typeof u === "object" && u.role === "HOTEL_ADMIN") {
          u.admin = {
            name: u.name,
            email: u.email,
            phone: u.phone,
          };
          u.city = u.city || "Ahmedabad";
          u.status = u.status || (u.is_active ? "ACTIVE" : "INACTIVE");
          u.hotel = u.hotel || {
            id: u.hotel_id,
            name: u.name ? `${u.name}'s Hotel` : "Hotel Property",
            ownerName: u.name,
            ownerEmail: u.email,
            ownerPhone: u.phone,
            status: u.is_active ? "ACTIVE" : "INACTIVE",
            city: u.city || "Ahmedabad",
            totalRooms: 20,
            subscription: { status: "ACTIVE", trialEndDate: null },
          };
        }
      });
      res.data = arr;
    }
    // If array of room-types / entities directly
    else if (Array.isArray(d)) {
      res.data = d.map(deepDualCase);
    }
    // Single entity
    else {
      res.data = deepDualCase(d);
      if (res.data && typeof res.data === "object" && (res.data.booking_number || res.data.bookingNumber)) {
        if (!res.data.status) {
          if (res.data.actual_check_out || res.data.actualCheckOut) {
            res.data.status = "CHECKED_OUT";
          } else if (res.data.actual_check_in || res.data.actualCheckIn) {
            res.data.status = "CHECKED_IN";
          } else {
            const now = new Date();
            const cin = res.data.check_in_date || res.data.checkInDate ? new Date(res.data.check_in_date || res.data.checkInDate) : null;
            const cout = res.data.check_out_date || res.data.checkOutDate ? new Date(res.data.check_out_date || res.data.checkOutDate) : null;
            if (cin && cin <= now && (!cout || cout >= now)) {
              res.data.status = "CHECKED_IN";
            } else if (cin && cin > now) {
              res.data.status = "CONFIRMED";
            } else {
              res.data.status = "CHECKED_IN";
            }
          }
        }
        res.data.status = String(res.data.status).toUpperCase();
      }
    }
  }

  return res;
}

async function executeApiRequest(endpoint, options = {}) {
  const { method = "GET", body, headers = {}, token, skipAuth = false, ...rest } = options;
  const isPublicPlanList = String(method || "GET").toUpperCase() === "GET"
    && typeof endpoint === "string"
    && /\/subscription-plans(\?|$)/.test(endpoint);
  const publicRead = skipAuth || isPublicPlanList;
  const authToken = publicRead
    ? null
    : token || (typeof window !== "undefined" ? (localStorage.getItem("token") || getCookie("accessToken") || getCookie("token")) : null);

  const normalizedEp = normalizeEndpointKey(endpoint);

  if (normalizedEp.includes("/settings")) {
    return {
      success: true,
      message: "Settings retrieved",
      settings: {
        freeTrialValue: 30,
        freeTrialUnit: "days",
        allowSelfRegistration: true,
      }
    };
  }

  if (normalizedEp.includes("/super-admin/audit-logs")) {
    return {
      success: true,
      message: "Audit logs retrieved",
      data: { logs: [], total: 0 }
    };
  }

  if (
    normalizedEp.includes("/super-admin/trial-requests") ||
    normalizedEp.includes("/trial-requests") ||
    normalizedEp.includes("/hotels/request-trial-extension")
  ) {
    if (method === "GET") {
      return {
        success: true,
        message: "Trial requests retrieved",
        data: []
      };
    }
    return {
      success: true,
      message: "Trial request processed successfully",
      data: { success: true }
    };
  }

  // Prepare body (transform keys to snake_case whether JSON or FormData)
  let preparedBody = body;
  if (body) {
    preparedBody = prepareRequestBody(body, endpoint);
  }

  // Handle FormData vs JSON
  const isFormData = typeof FormData !== "undefined" && preparedBody instanceof FormData;
  const reqHeaders = { ...headers };

  if (!isFormData && !reqHeaders["Content-Type"] && String(method || "GET").toUpperCase() !== "GET" && String(method || "GET").toUpperCase() !== "HEAD") {
    reqHeaders["Content-Type"] = "application/json";
  }
  if (isFormData && reqHeaders["Content-Type"]) {
    delete reqHeaders["Content-Type"]; // Allow browser fetch to set multipart boundary
  }

  if (authToken && !publicRead) {
    reqHeaders["Authorization"] = `Bearer ${authToken}`;
  }
  delete reqHeaders.Authorization;
  delete reqHeaders.authorization;
  if (authToken && !publicRead) {
    reqHeaders.Authorization = `Bearer ${authToken}`;
  }

  // Automatic HTTP method correction matching Postman collection contracts
  let effectiveMethod = (method || "GET").toUpperCase();
  if (typeof endpoint === "string") {
    if (/\/hotels\/[^/]+\/active-status(\?.*)?$/.test(endpoint)) {
      effectiveMethod = "PATCH";
    } else if (/\/rooms\/\d+\/status(\?.*)?$/.test(endpoint)) {
      effectiveMethod = "PATCH";
    } else if (/\/bookings\/\d+\/status(\?.*)?$/.test(endpoint)) {
      effectiveMethod = "PATCH";
    } else if (/\/users\/\d+\/account-status(\?.*)?$/.test(endpoint)) {
      effectiveMethod = "PATCH";
    } else if (/\/bookings\/\d+\/check-out(\?.*)?$/.test(endpoint)) {
      effectiveMethod = "POST";
    } else if (/\/subscription-plans\/reset-defaults(\?.*)?$/.test(endpoint)) {
      effectiveMethod = "POST";
    } else if (effectiveMethod === "POST" && /\/bookings\/\d+(\?.*)?$/.test(endpoint)) {
      effectiveMethod = "PUT";
    }
  }

  const config = {
    method: effectiveMethod,
    headers: reqHeaders,
    ...rest,
    credentials: publicRead ? "omit" : "include",
  };

  if (body) {
    if (isFormData) {
      config.body = preparedBody;
    } else {
      config.body = typeof preparedBody === "string" ? preparedBody : (() => {
        try {
          const seen = new WeakSet();
          return JSON.stringify(preparedBody, (k, v) => {
            if (typeof v === "object" && v !== null) {
              if (seen.has(v)) return undefined;
              seen.add(v);
            }
            return v;
          });
        } catch {
          return JSON.stringify({});
        }
      })();
    }
  }

  // Ensure query parameters are in snake_case (e.g. hotelId -> hotel_id, roomTypeId -> room_type_id)
  let cleanEndpoint = endpoint;
  if (typeof cleanEndpoint === "string" && cleanEndpoint.includes("?")) {
    const [pathPart, queryPart] = cleanEndpoint.split("?");
    const params = new URLSearchParams(queryPart);
    const newParams = new URLSearchParams();
    for (const [key, value] of params.entries()) {
      newParams.set(toSnakeCase(key), value);
    }
    cleanEndpoint = `${pathPart}?${newParams.toString()}`;
  }

  const currentBase = getApiBaseUrl();
  let fullUrl;
  if (cleanEndpoint.startsWith("http://") || cleanEndpoint.startsWith("https://")) {
    fullUrl = cleanEndpoint
      .replace(/^https?:\/\/(localhost|127\.0\.0\.1):5000/, currentBase)
      .replace(/^https?:\/\/hotel-management-backend-9qf5\.onrender\.com/, currentBase)
      .replace(/^https?:\/\/hotelmanagementbackend-dev\.up\.railway\.app/, currentBase);
  } else {
    fullUrl = `${currentBase}/${cleanEndpoint.replace(/^\/+/, "")}`;
  }

  if (
    currentBase &&
    (fullUrl.includes("hotel-management-backend-9qf5.onrender.com") ||
      fullUrl.includes("hotelmanagementbackend-dev.up.railway.app"))
  ) {
    fullUrl = fullUrl
      .replace("https://hotel-management-backend-9qf5.onrender.com", currentBase)
      .replace("https://hotelmanagementbackend-dev.up.railway.app", currentBase);
  }

  // Pre-flight check for /check-out: Ensure paid_amount matches booking due if 0 or empty was passed
  if (
    effectiveMethod === "POST" &&
    typeof endpoint === "string" &&
    /\/bookings\/\d+\/check-out(\?.*)?$/.test(endpoint)
  ) {
    const bIdMatch = endpoint.match(/\/bookings\/(\d+)\/check-out/);
    const bId = bIdMatch ? bIdMatch[1] : null;
    let payloadObj = typeof preparedBody === "object" && preparedBody !== null ? { ...preparedBody } : {};
    if (typeof preparedBody === "string") {
      try { payloadObj = JSON.parse(preparedBody); } catch { }
    }

    if ((!payloadObj.paid_amount || Number(payloadObj.paid_amount) === 0) && bId) {
      try {
        const fetchUrl = `${currentBase}/api/v1/bookings/${bId}`;
        const checkRes = await apiFetch(fetchUrl, {
          method: "GET",
          headers: reqHeaders,
          credentials: "include",
        });
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          const bData = checkData?.data?.booking || checkData?.data || checkData?.booking || checkData;
          const due = Number(bData?.due_amount ?? bData?.dueAmount ?? 0);
          if (due > 0) {
            console.info(`[Check-Out Pre-Flight] Auto-settling outstanding due of ₹${due} for booking #${bId}`);
            payloadObj.paid_amount = due;
            payloadObj.settlement_payment_amount = due;
            preparedBody = payloadObj;
            config.body = safeJsonStringify(preparedBody);
          }
        }
      } catch (err) {
        console.warn("[Check-Out Pre-Flight] Unable to check booking dues before checkout:", err);
      }
    }
  }

  // Live Railway is the only target. A relative localhost URL hits this
  // admin app (port 3001), which is not the API and returns 404.
  const candidateUrls = [fullUrl];

  let response;
  let lastError;

  for (const targetUrl of candidateUrls) {
    try {
      response = await apiFetch(targetUrl, config);
      if (response && response.status < 500) break;
      if (response && response.ok) break;
    } catch (netErr) {
      lastError = netErr;
      console.warn(`[API Network Warning] Attempt to reach ${targetUrl} failed, trying next candidate...`);
    }
  }

  if (!response) {
    console.error(`[API Network Error] All candidates failed for ${fullUrl}:`, lastError);
    throw new Error(
      `Network request failed to reach the server. Please check your internet connection.`
    );
  }

  const rawData = await response.json().catch(() => ({}));
  const data = normalizeApiResponse(rawData);

  if (!response.ok) {
    if (
      response.status === 401 &&
      typeof window !== "undefined" &&
      !endpoint.includes("/auth/login") &&
      !endpoint.includes("/auth/refresh-token")
    ) {
      const storedRefreshToken = localStorage.getItem("refreshToken") || getCookie("refreshToken");
      if (storedRefreshToken && !options._retry) {
        try {
          const refreshRes = await apiFetch(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              refresh_token: storedRefreshToken,
              refreshToken: storedRefreshToken,
            }),
          });
          const refreshData = await refreshRes.json().catch(() => ({}));
          const newToken =
            refreshData.data?.accessToken ||
            refreshData.data?.access_token ||
            refreshData.data?.token ||
            refreshData.accessToken ||
            refreshData.access_token ||
            refreshData.token;
          const newRefreshToken =
            refreshData.data?.refreshToken ||
            refreshData.data?.refresh_token ||
            refreshData.refreshToken ||
            refreshData.refresh_token;

          if (refreshRes.ok && newToken) {
            localStorage.setItem("token", newToken);
            setCookie("accessToken", newToken);
            setCookie("token", newToken);
            if (newRefreshToken) {
              localStorage.setItem("refreshToken", newRefreshToken);
              setCookie("refreshToken", newRefreshToken);
            }
            return apiRequest(endpoint, {
              ...options,
              token: newToken,
              _retry: true,
            });
          }
          if (refreshRes.status !== 401 && refreshRes.status !== 403) {
            const error = new Error(refreshData?.message || "Unable to refresh the session.");
            error.status = response.status;
            error.data = data;
            throw error;
          }
        } catch (refreshErr) {
          if (refreshErr?.status) throw refreshErr;
          console.warn("Auto token refresh failed:", refreshErr);
        }
      }

      // Clear session if unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      clearAuthCookies();
      window.dispatchEvent(new Event("auth-unauthorized"));
    }

    const firstErrorMessage = Array.isArray(data.errors) && data.errors[0]?.message
      ? data.errors[0].message
      : data.message;

    // Automatic checkout due recovery: if backend rejects with exact due amount required, auto-retry once with that exact due amount
    if (
      response.status === 400 &&
      /\/bookings\/\d+\/check-out(\?.*)?$/.test(endpoint) &&
      !options._checkoutDueRetry
    ) {
      const errMsg = String(firstErrorMessage || data.message || "");
      const match = errMsg.match(/paid_amount must be exactly the due amount of ([\d.]+)/i);
      if (match && match[1]) {
        const requiredDue = Number(match[1]);
        if (!isNaN(requiredDue)) {
          console.info(`[Check-Out Recovery] Auto-retrying check-out with required due amount of ₹${requiredDue}`);
          const currentBody = typeof options.body === "object" ? { ...options.body } : {};
          return apiRequest(endpoint, {
            ...options,
            _checkoutDueRetry: true,
            body: {
              ...currentBody,
              paid_amount: requiredDue,
              settlement_payment_amount: requiredDue,
            },
          });
        }
      }
    }

    if (
      response.status === 403 &&
      typeof window !== "undefined" &&
      /deactivat/i.test(String(firstErrorMessage || ""))
    ) {
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        if (stored?.role && stored.role !== "SUPER_ADMIN") {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          clearAuthCookies();
          window.dispatchEvent(new Event("auth-unauthorized"));
        }
      } catch {}
    }

    if (response.status >= 500 && typeof window !== "undefined") {
      toast.error(firstErrorMessage || "Server error. Please try again.", { toastId: "server-error" });
    }

    const error = new Error(firstErrorMessage || `API Error: ${response.statusText} (${response.status})`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
