// ─── HTTP Status Codes ─────────────────────────────────────────────
export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  STRIPE_CONNECT_VERIFIED: 255,
  CHECK_PAYMENT: 298,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  MANY_REQUESTS: 429,

  INTERNAL_SERVER: 500,

  NOT_VERIFIED: 600,
  RESTRICTED: 601,
  SERVICE_ERROR: 503,
} as const;

export type HttpStatusCodes =
  (typeof HttpStatusCodes)[keyof typeof HttpStatusCodes];

type ValueOf<T> = T[keyof T];

// ─── User ──────────────────────────────────────────────────────
export const UserRoles = {
  GUEST: "guest",
  USER: "user",
  ADMIN: "admin",
} as const;
export type UserRoles = (typeof UserRoles)[keyof typeof UserRoles];

export const UserStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
