import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "فارما AI - ستاسو شخصي هوښيار درمل جوړونکی",
  description: "د مخکښ هوښيار ټیکنالوژۍ سره د درملو تعامل چیکر، چیټ بوټ، او د نسخې تحلیل کونکی.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ps" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
