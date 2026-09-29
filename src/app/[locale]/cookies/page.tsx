import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateCookiesMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import CookiesPageClient from './CookiesPageClient';

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

  return generateCookiesMetadata(validLocale, {
    title: t('cookies.title'),
    description: t('cookies.description'),
  });
}

interface CookiesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  // Enable static rendering
  setRequestLocale(locale);

  const tCommon = await getTranslations({ locale: validLocale, namespace: 'common' });

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: tCommon('navigation.home') || 'Home', path: '' },
      { name: tCommon('navigation.cookies') || 'Cookie Policy', path: '/cookies' },
    ],
    validLocale
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CookiesPageClient locale={validLocale} />
    </>
  );
}
