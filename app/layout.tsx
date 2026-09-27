import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PostSpark - LinkedIn Event Amplifier',
  description: 'AI-powered LinkedIn social post generator and campaign management studio for tech events, attendees, and speakers.',
  openGraph: {
    title: 'PostSpark - LinkedIn Event Amplifier',
    description: 'AI-powered LinkedIn social post generator and campaign management studio for tech events, attendees, and speakers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PostSpark - LinkedIn Event Amplifier',
    description: 'AI-powered LinkedIn social post generator and campaign management studio for tech events, attendees, and speakers.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fcf9f8] text-[#1c1b1b] antialiased selection:bg-[#cde5ff] selection:text-[#004b74]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
