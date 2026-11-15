import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-5XLGQDHG";

const suisseMedium = localFont({
  variable: "--font-heading",
  src: "../public/fonts/SuisseIntl_Medium-s.p.a07b9f1f.woff2",
  weight: "500",
  style: "normal",
  display: "swap"
});

const satoshiMedium = localFont({
  variable: "--font-body",
  src: "../public/fonts/Satoshi-Medium.otf",
  weight: "500",
  style: "normal",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Dr. TEA | Purpose, Clarity & Transformational Coaching",
  description:
    "Dr. Temitope Ebenezer Arowele helps individuals discover purpose, gain clarity, grow intentionally, and lead with impact.",
  metadataBase: new URL("https://temitopearowele.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suisseMedium.variable} ${satoshiMedium.variable} font-body antialiased`}>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
