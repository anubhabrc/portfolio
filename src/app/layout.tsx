import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import SmoothScroll from "@/components/smooth-scroll";
import SoundFeedbackProvider from "@/components/sound-feedback";

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.bio,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <SoundFeedbackProvider>{children}</SoundFeedbackProvider>
      </body>
    </html>
  );
}
