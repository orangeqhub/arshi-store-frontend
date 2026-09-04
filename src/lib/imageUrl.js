const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Backend origin only (e.g. "http://localhost:8000"), derived from the API
// base URL so no environment-specific host is ever hardcoded here.
const BACKEND_ORIGIN = API_BASE.replace(/\/api\/v1\/?$/, "").replace(
  /\/+$/,
  ""
);

/**
 * Resolves a possibly-relative backend image path into a URL the browser
 * can load, regardless of environment (local/staging/production).
 *
 * - Already-absolute URLs (http/https) are returned unchanged — this keeps
 *   older records (uploaded before paths were stored as portable paths)
 *   working too.
 * - Portable backend paths like "/uploads/products/x.png" are prefixed
 *   with the backend origin derived from NEXT_PUBLIC_API_URL.
 * - Anything else (e.g. local static assets like "/images/placeholder.png")
 *   is returned unchanged.
 */
export function getImageUrl(path) {
  if (!path || typeof path !== "string") return null;

  if (/^https?:\/\//i.test(path)) return path;

  if (path.startsWith("/uploads")) return `${BACKEND_ORIGIN}${path}`;

  return path;
}
