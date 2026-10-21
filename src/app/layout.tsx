import type { Metadata } from "next";
import "./globals.css";
import { siteName, siteUrl } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteName} | Yamaha Authorised Dealer in Visakhapatnam`,
  description: "Explore Yamaha motorcycles and scooters at Mahalakshmi Motorrad, an authorised Yamaha dealership in Gajuwaka, Visakhapatnam. Book a test ride and get on-road prices.",
  keywords: ["Yamaha showroom in Vizag", "Yamaha showroom in Visakhapatnam", "Yamaha dealership in Gajuwaka", "Yamaha bikes in Vizag", "Yamaha service centre in Vizag", "Yamaha R15 Vizag", "Yamaha MT-15 Vizag", "Yamaha scooters Vizag"],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName,
    title: `${siteName} | Yamaha Authorised Dealer in Visakhapatnam`,
    description: "Explore Yamaha motorcycles and scooters in Visakhapatnam.",
    images: [{ url: "/r15-hero-white-v2.png", width: 1200, height: 630, alt: "Yamaha R15 at Mahalakshmi Motorrad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Yamaha Authorised Dealer in Visakhapatnam`,
    description: "Explore Yamaha motorcycles and scooters in Visakhapatnam.",
    images: ["/r15-hero-white-v2.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
