export const AUTH_REDIRECT_COOKIE = "auth_redirect";
export const ONE_DAY_IN_SECONDS = 86400; // 24 hours in seconds
export const APP_URL = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
