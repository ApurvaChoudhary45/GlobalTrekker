import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sessionwrapper from "./component/Sessionwrapper";
import { ReduxProvider } from "@/Redux/Provider";
import 'leaflet/dist/leaflet.css';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GlobeTrekker",
  description: "Track the globe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <Sessionwrapper>
        {children}
        </Sessionwrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
