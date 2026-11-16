import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateWorkflowMetadata } from '@/lib/seo';
import WorkflowPageClient from './WorkflowPageClient';

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
    const t = await getTranslations({ locale: validLocale, namespace: 'workflow' });

    return generateWorkflowMetadata(validLocale, {
        title: t('metaTitle'),
        description: t('metaDescription'),
    });
}

interface WorkflowPageProps {
    params: Promise<{ locale: string }>;
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    return <WorkflowPageClient locale={locale as Locale} />;
}
