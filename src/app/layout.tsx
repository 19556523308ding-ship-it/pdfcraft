import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'PDFCraft - Professional PDF Tools',
  description: 'Free online PDF tools for merging, splitting, compressing, and converting PDF files. All processing happens in your browser for maximum privacy.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

// Root layout - provides the basic HTML structure
// The actual layout with i18n is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: 'html{scrollbar-gutter:stable}' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script defer src="https://umami.aixmb.cn/script.js" data-website-id="88a52d9c-3013-4a9b-bd41-bfd724b71faa"></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5777864556239380" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
