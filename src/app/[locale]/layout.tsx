import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "../globals.css";

const siteUrl = new URL("https://rezacode.cloud");

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isIndonesian = locale === "id";
  const title = "RezaCode.cloud | QA Engineer & AI Testing Specialist";
  const description = isIndonesian
    ? "Portofolio Reza Yusuf Maulana, Quality Assurance Engineer dengan keahlian Playwright, Cypress, API testing, dan pengujian berbasis AI."
    : "Portfolio of Reza Yusuf Maulana, a Quality Assurance Engineer specializing in Playwright, Cypress, API testing, and AI-driven testing.";

  return {
  metadataBase: siteUrl,
  title,
  description,
  keywords: [
    "QA Engineer",
    "Quality Assurance",
    "Cypress",
    "Playwright",
    "API Testing",
    "Fintech",
    "Software Testing",
    "Automation Testing",
    "Azure AI",
    "Google Cloud",
  ],
  authors: [{ name: "Reza Yusuf Maulana" }],
  creator: "Reza Yusuf Maulana",
  openGraph: {
    type: "website",
    locale: isIndonesian ? "id_ID" : "en_US",
    alternateLocale: isIndonesian ? ["en_US"] : ["id_ID"],
    url: `/${locale}`,
    title,
    description,
    siteName: "RezaCode.cloud",
    images: [{ url: "https://rezacode.cloud/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RezaCode.cloud | QA Engineer",
    description,
    images: ["https://rezacode.cloud/logo.png"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: `/${locale}`,
    languages: { en: "/en", id: "/id" },
  },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex flex-col min-h-screen overflow-x-hidden w-full max-w-[100vw]">
            {children}
          </div>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
