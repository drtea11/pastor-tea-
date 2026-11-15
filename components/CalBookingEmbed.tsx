"use client";

import { useEffect, useRef } from "react";

// Cal.com event to embed. `calLink` is the public booking link; `namespace`
// scopes this embed's Cal API calls. Multiple durations are configured on the
// Cal.com event itself, so this single embed shows the duration picker when the
// event has more than one length enabled.
const CAL_LINK = "temitope-arowele-bkztsk/30min";
const CAL_NAMESPACE = "30min";

declare global {
  interface Window {
    // Cal.com's embed API is loaded dynamically; typed loosely on purpose.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal?: any;
  }
}

export function CalBookingEmbed() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Official Cal.com embed loader (script injection — no npm package needed).
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function (...a: any[]) {
              p(api, a);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal;
    Cal("init", CAL_NAMESPACE, { origin: "https://cal.com" });

    Cal.ns[CAL_NAMESPACE]("inline", {
      elementOrSelector: "#cal-booking-inline",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: CAL_LINK,
    });

    Cal.ns[CAL_NAMESPACE]("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#292929" },
        dark: { "cal-brand": "#A5CD39" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }, []);

  return (
    <div
      id="cal-booking-inline"
      className="booking-cal-embed"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
    />
  );
}
