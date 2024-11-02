'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import localFont from 'next/font/local';

const geistSans = localFont({
   src: '../fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
});
const geistMono = localFont({
   src: '../fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
});

const queryClient = new QueryClient();

export default function ReservationsLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" className="overflow-y-scroll scroll-smooth">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <QueryClientProvider client={queryClient}>
               <main>{children}</main>
            </QueryClientProvider>
         </body>
      </html>
   );
}
