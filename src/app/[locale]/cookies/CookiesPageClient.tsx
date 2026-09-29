'use client';

import { useTranslations } from 'next-intl';
import { Cookie, ShieldCheck, Settings, Database, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n/config';

interface CookiesPageClientProps {
  locale: Locale;
}

export default function CookiesPageClient({ locale }: CookiesPageClientProps) {
  const t = useTranslations();

  const cookieHighlights = [
    {
      icon: ShieldCheck,
      title: locale === 'zh' ? '零广告与零追踪' : 'Zero Tracking Cookies',
      description: locale === 'zh'
        ? '我们不使用任何侵犯隐私的第三方广告 Cookie 或跨站画像分析。'
        : 'We never deploy advertising trackers, behavioral profiling, or invasive third-party cross-site cookies.',
    },
    {
      icon: Settings,
      title: locale === 'zh' ? '基础偏好记忆' : 'Essential Preferences',
      description: locale === 'zh'
        ? '仅使用最基础的 Cookie 或本地存储记录您的语言（如 zh/en）与主题模式。'
        : 'Minimal cookies are stored strictly to remember your active interface language and light/dark theme preference.',
    },
    {
      icon: Database,
      title: locale === 'zh' ? '本地安全隔离' : 'Local Storage Isolation',
      description: locale === 'zh'
        ? '您处理的临时文档缓存保存在浏览器沙箱内存中，页面关闭后自动释放。'
        : 'Document buffers and session states are isolated inside browser memory and automatically flushed upon tab closure.',
    },
    {
      icon: CheckCircle2,
      title: locale === 'zh' ? 'GDPR 与国际合规' : 'GDPR & ePrivacy Ready',
      description: locale === 'zh'
        ? '设计完全符合欧盟 GDPR 与全球隐私规范，确保对用户数据的绝对尊重。'
        : 'Architected with privacy-by-default to satisfy GDPR and European ePrivacy regulatory frameworks.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[hsl(var(--color-primary)/0.1)] via-[hsl(var(--color-background))] to-[hsl(var(--color-secondary)/0.1)] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <Cookie className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--color-foreground))] mb-6">
                {locale === 'zh' ? 'Cookie 政策' : 'Cookie Policy'}
              </h1>
              <p className="text-lg text-[hsl(var(--color-muted-foreground))]">
                {locale === 'zh'
                  ? `了解 ${t('common.brand')} 如何遵循最高隐私准则使用 Cookies 和本地存储。`
                  : `Learn how ${t('common.brand')} uses cookies and client storage with strict privacy compliance.`}
              </p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-12 bg-[hsl(var(--color-muted)/0.3)]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cookieHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="p-6 text-center" hover>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      {item.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Legal Body */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-8">
                {locale === 'zh' ? '最近更新日期：2026年9月' : 'Last updated: September 2026'}
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                Cookies are tiny text files stored on your computer or mobile device when you visit websites. They are widely used to allow web applications to remember your state (such as language, theme, or active session) and improve loading performance.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                2. How We Use Cookies & Storage
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                {t('common.brand')} adheres to a strict <em>privacy-by-design</em> philosophy. We only utilize:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--color-muted-foreground))] mb-4">
                <li><strong>Strictly Necessary & Functional Cookies:</strong> To preserve your preferred locale (e.g., <code>NEXT_LOCALE</code>) and user theme mode (light/dark).</li>
                <li><strong>Browser LocalStorage:</strong> To cache UI states and non-sensitive tool preferences locally on your hardware.</li>
                <li><strong>Anonymous Telemetry:</strong> Lightweight, cookieless privacy-friendly statistics (Umami) to understand aggregate page views without user identification.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                3. What We Never Do
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                We believe your digital workspace should be completely free of trackers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--color-muted-foreground))] mb-4">
                <li>We do NOT sell or exchange cookie data with advertising brokers.</li>
                <li>We do NOT use cross-site behavioral tracking or fingerprinting techniques.</li>
                <li>We do NOT associate any document contents with cookies or visitor records.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                4. Managing & Disabling Cookies
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                You have full control over your cookie settings. You can delete or block cookies directly through your browser preferences (Chrome, Edge, Firefox, Safari). Note that disabling essential preference cookies may require you to select your preferred language again on future visits.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                5. Questions & Contact
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                If you have questions about our Cookie Policy or data handling practices, feel free to reach out to our team at:
              </p>
              <p className="text-[hsl(var(--color-primary))] font-semibold">
                <a href="mailto:19556523308ding@gmail.com">19556523308ding@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
