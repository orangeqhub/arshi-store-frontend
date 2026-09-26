"use client";

import { useEffect, useRef, useState } from "react";
import { GOOGLE_CLIENT_ID, loadGoogleScript } from "@/lib/googleAuth";

export default function GoogleSignInButton({ onCredential, text = "continue_with" }) {
    const containerRef = useRef(null);
    const callbackRef = useRef(onCredential);
    const [loadError, setLoadError] = useState("");

    // always call the latest handler without re-rendering the Google button
    useEffect(() => {
        callbackRef.current = onCredential;
    }, [onCredential]);

    useEffect(() => {
        let cancelled = false;

        loadGoogleScript()
            .then((google) => {
                if (cancelled || !containerRef.current) return;

                google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: (response) => {
                        if (response?.credential) {
                            callbackRef.current?.(response.credential);
                        }
                    },
                    ux_mode: "popup",
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                const width = Math.min(
                    Math.max(containerRef.current.offsetWidth || 300, 200),
                    400
                );

                containerRef.current.innerHTML = "";
                google.accounts.id.renderButton(containerRef.current, {
                    type: "standard",
                    theme: "outline",
                    size: "large",
                    shape: "rectangular",
                    text,
                    logo_alignment: "left",
                    width,
                });
            })
            .catch(() => {
                if (!cancelled) {
                    setLoadError("Google Sign-In is unavailable right now.");
                }
            });

        return () => {
            cancelled = true;
        };
    }, [text]);

    return (
        <div>
            <div ref={containerRef} className="flex min-h-[44px] w-full justify-center" />
            {loadError && (
                <p className="mt-1 text-center text-xs text-red-500">{loadError}</p>
            )}
        </div>
    );
}
