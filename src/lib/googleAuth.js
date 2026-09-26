// Google OAuth client IDs are public (they ship to every browser anyway), so
// a hardcoded fallback is safe. It keeps "Sign in with Google" working on
// redeploys where NEXT_PUBLIC_GOOGLE_CLIENT_ID isn't set at build time
// (.env files are gitignored and not copied into fresh builds).
export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "313895485255-7r4m65t15uk1cdp489jak955rvf84dtt.apps.googleusercontent.com";

const GSI_SRC = "https://accounts.google.com/gsi/client";

let gsiPromise = null;

export const loadGoogleScript = () => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Not in browser"));
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google);
  }

  if (!gsiPromise) {
    gsiPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = GSI_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google);
      script.onerror = () => {
        gsiPromise = null;
        script.remove();
        reject(new Error("Failed to load Google Sign-In"));
      };
      document.head.appendChild(script);
    });
  }

  return gsiPromise;
};
