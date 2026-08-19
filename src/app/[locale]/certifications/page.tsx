import { setRequestLocale } from 'next-intl/server';
import { CertificationsPageClient } from '@/features/certifications/ui/CertificationsPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Certifications | RezaCode.id',
  description: 'View the complete list of 24+ professional certifications earned by Reza Yusuf Maulana from Microsoft, Google Cloud, Cisco, and Dicoding.',
};

export default async function CertificationsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <CertificationsPageClient />;
}
