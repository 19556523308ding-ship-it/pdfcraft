import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateTermsMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import TermsPageClient from './TermsPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = await getTranslations({ locale: validLocale, namespace: 'metadata' });

  return generateTermsMetadata(validLocale, {
    title: t('terms.title'),
    description: t('terms.description'),
  });
}

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  // Enable static rendering
  setRequestLocale(locale);

  const tCommon = await getTranslations({ locale: validLocale, namespace: 'common' });

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: tCommon('navigation.home') || 'Home', path: '' },
      { name: tCommon('navigation.terms') || 'Terms of Service', path: '/terms' },
    ],
    validLocale
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <TermsPageClient locale={validLocale} />
    </>
  );
}
