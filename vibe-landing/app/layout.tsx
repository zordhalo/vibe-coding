import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Vibe Coding Framework - Build $20K/Month Apps in 14 Days',
  description: "Learn Connor Burd's complete framework for rapid app development using AI. Build revenue-generating apps in 14 days with modern design principles and data-driven growth strategies.",
  keywords: 'vibe coding, app development, AI coding, React Native, startup, mobile apps, subscription apps',
  authors: [{ name: 'Connor Burd' }],
  openGraph: {
    type: 'website',
    url: 'https://vibecoding.dev/',
    title: 'Vibe Coding Framework - Build $20K/Month Apps in 14 Days',
    description: "Learn Connor Burd's complete framework for rapid app development using AI. Build revenue-generating apps in 14 days.",
    images: ['https://vibecoding.dev/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Framework - Build $20K/Month Apps in 14 Days',
    description: "Learn Connor Burd's complete framework for rapid app development using AI.",
    images: ['https://vibecoding.dev/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        {children}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          async
        />
      </body>
    </html>
  );
}
