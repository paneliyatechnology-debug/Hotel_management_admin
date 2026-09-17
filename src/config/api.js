/**
 * Central API Configuration for Admin & Operations Portal
 * All calls use Next.js proxy rewrites (/api/...)
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    ME: `${API_BASE_URL}/api/v1/auth/me`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/v1/auth/change-password`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/v1/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/v1/auth/reset-password`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },
  SUPER_ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/v1/super-admin/dashboard`,
    HOTELS: `${API_BASE_URL}/api/v1/super-admin/hotels`,
    APPROVE_HOTEL: (id) => `${API_BASE_URL}/api/v1/super-admin/hotels/${id}/approve`,
    REJECT_HOTEL: (id) => `${API_BASE_URL}/api/v1/super-admin/hotels/${id}/reject`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/v1/super-admin/hotels/${id}/status`,
    EXTEND_TRIAL: (id) => `${API_BASE_URL}/api/v1/super-admin/hotels/${id}/extend-trial`,
    AUDIT_LOGS: `${API_BASE_URL}/api/v1/super-admin/audit-logs`,
    PLANS: `${API_BASE_URL}/api/v1/super-admin/subscription-plans`,
    PLAN_BY_ID: (id) => `${API_BASE_URL}/api/v1/super-admin/subscription-plans/${id}`,
    RESET_DEFAULT_PLANS: `${API_BASE_URL}/api/v1/super-admin/subscription-plans/reset-defaults`,
  },
  SUBSCRIPTION_PLANS: {
    PUBLIC: `${API_BASE_URL}/api/v1/subscription-plans`,
    ADMIN_ALL: `${API_BASE_URL}/api/v1/super-admin/subscription-plans`,
    CREATE: `${API_BASE_URL}/api/v1/super-admin/subscription-plans`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/super-admin/subscription-plans/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/super-admin/subscription-plans/${id}`,
    RESET_DEFAULTS: `${API_BASE_URL}/api/v1/super-admin/subscription-plans/reset-defaults`,
  },
  HOTELS: {
    ALL: `${API_BASE_URL}/api/v1/super-admin/hotels`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/v1/super-admin/hotels/${id}/status`,
    EXTEND_TRIAL: (id) => `${API_BASE_URL}/api/v1/super-admin/hotels/${id}/extend-trial`,
    APPROVE: (id) => `${API_BASE_URL}/api/v1/super-admin/hotels/${id}/approve`,
    REJECT: (id) => `${API_BASE_URL}/api/v1/super-admin/hotels/${id}/reject`,
  },
  AUDIT: {
    LOGS: `${API_BASE_URL}/api/v1/super-admin/audit-logs`,
  },
  HOTEL_ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/v1/admin/dashboard`,
    ROOM_TYPES: `${API_BASE_URL}/api/v1/admin/room-types`,
    DELETE_ROOM_TYPE: (id) => `${API_BASE_URL}/api/v1/admin/room-types/${id}`,
    ROOMS: `${API_BASE_URL}/api/v1/admin/rooms`,
    UPDATE_ROOM: (id) => `${API_BASE_URL}/api/v1/admin/rooms/${id}`,
    DELETE_ROOM: (id) => `${API_BASE_URL}/api/v1/admin/rooms/${id}`,
    UPDATE_ROOM_STATUS: (id) => `${API_BASE_URL}/api/v1/admin/rooms/${id}/status`,
    RECEPTIONISTS: `${API_BASE_URL}/api/v1/admin/receptionists`,
    DELETE_RECEPTIONIST: (id) => `${API_BASE_URL}/api/v1/admin/receptionists/${id}`,
    UPDATE_RECEPTIONIST_STATUS: (id) => `${API_BASE_URL}/api/v1/admin/receptionists/${id}/status`,
    PAYMENTS: `${API_BASE_URL}/api/v1/admin/payments`,
    RECORD_PAYMENT: `${API_BASE_URL}/api/v1/admin/payments`,
    DAILY_COLLECTIONS: `${API_BASE_URL}/api/v1/admin/daily-collections`,
    SETTLE_HANDOVER: `${API_BASE_URL}/api/v1/admin/daily-collections/handover`,
    PROFILE: `${API_BASE_URL}/api/v1/admin/profile`,
    REPORTS: `${API_BASE_URL}/api/v1/admin/reports`,
  },
  RECEPTIONIST: {
    DASHBOARD: `${API_BASE_URL}/api/v1/receptionist/dashboard`,
    AVAILABLE_ROOMS: `${API_BASE_URL}/api/v1/receptionist/rooms/available`,
    GUESTS: `${API_BASE_URL}/api/v1/receptionist/guests`,
    GUEST_LOOKUP: (query) => `${API_BASE_URL}/api/v1/receptionist/guests/lookup?query=${encodeURIComponent(query)}`,
    DELETE_GUEST: (id) => `${API_BASE_URL}/api/v1/receptionist/guests/${id}`,
    VERIFY_GUEST_ID: (id) => `${API_BASE_URL}/api/v1/receptionist/guests/${id}/verify-id`,
    BOOKINGS: `${API_BASE_URL}/api/v1/receptionist/bookings`,
    UPDATE_ROOM_STATUS: (id) => `${API_BASE_URL}/api/v1/receptionist/rooms/${id}/status`,
    ADD_CHARGE: (bookingId) => `${API_BASE_URL}/api/v1/receptionist/bookings/${bookingId}/charges`,
    CHECKOUT: (bookingId) => `${API_BASE_URL}/api/v1/receptionist/bookings/${bookingId}/check-out`,
    PAYMENTS: `${API_BASE_URL}/api/v1/receptionist/payments`,
    RECORD_PAYMENT: `${API_BASE_URL}/api/v1/receptionist/payments`,
  },
};

/**
 * Reusable helper for Authenticated API Requests
 */
export async function apiRequest(endpoint, options = {}) {
  const { method = "GET", body, headers = {}, token, ...rest } = options;

  const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const reqHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (authToken) {
    reqHeaders["Authorization"] = `Bearer ${authToken}`;
  }

  const config = {
    method,
    headers: reqHeaders,
    ...rest,
  };

  if (body) {
    config.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (
      response.status === 403 &&
      (data.errorCode === "STAFF_INACTIVE" ||
        data.errorCode === "HOTEL_DISABLED" ||
        data.errorCode === "HOTEL_SUSPENDED" ||
        data.errorCode === "SUBSCRIPTION_EXPIRED" ||
        data.hotelStatus === "DISABLED" ||
        data.hotelStatus === "SUSPENDED" ||
        data.subscriptionStatus === "EXPIRED")
    ) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("hotel-status-lockout", {
            detail: {
              errorCode: data.errorCode || "SUBSCRIPTION_EXPIRED",
              message: data.message,
              hotelStatus: data.hotelStatus,
              subscriptionStatus: data.subscriptionStatus,
              supportContact: data.supportContact,
            },
          })
        );
      }
    }

    const error = new Error(data.message || `API Error: ${response.statusText} (${response.status})`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
