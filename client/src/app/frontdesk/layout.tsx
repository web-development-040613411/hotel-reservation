import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './frontdesk.css';

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
});
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
});

export const metadata: Metadata = {
   title: {
      template: '%s | Mof Hotel',
      default: 'Mof Hotel',
   },
};

export default function FrontdeskLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <body
         id="body"
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         {children}
      </body>
   );
}
