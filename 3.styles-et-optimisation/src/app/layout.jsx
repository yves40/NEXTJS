import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Super Bike",
  description: "An excellent site for MGP",
  openGraph: {
    title: 'Go to this site',
    description: 'This is the most visited site in the motoGP world'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-20`}
      >
        {children}
      </body>
    </html>
  );
}
