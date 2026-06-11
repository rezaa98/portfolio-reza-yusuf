import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

export const metadata: Metadata = {
  title: "Reza Yusuf Maulana — QA Engineer & AI Testing Specialist",
  description:
    "Portfolio of Reza Yusuf Maulana — Quality Assurance Engineer with 4+ years of experience in Web, Mobile & API testing for fintech. Expert in Cypress, Playwright, AI-driven testing, and Google Cloud.",
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
    locale: "en_US",
    url: "https://rezayusufmaulana.vercel.app",
    title: "Reza Yusuf Maulana — QA Engineer & AI Testing Specialist",
    description:
      "Portfolio of Reza Yusuf Maulana — QA Engineer with 4+ years at BFI Finance. 24+ certifications from Microsoft, Google Cloud, Cisco & Dicoding.",
    siteName: "Reza Yusuf Maulana Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reza Yusuf Maulana — QA Engineer",
    description: "QA Engineer | AI Testing | 24+ Certifications",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
