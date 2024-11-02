'use client'
import localFont from "next/font/local";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };



export default function RootLayout({ children }) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      </QueryClientProvider>
    </html>
  );
}
