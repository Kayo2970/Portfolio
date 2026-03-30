import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kayo Portal — Project Launchpad",
  description: "Private project launchpad for Kayomarz M Pavri. Access all active projects from one place.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground min-h-screen">
        <nav className="sticky top-0 z-50 bg-black/85 backdrop-blur-[20px] border-b border-border px-6 md:px-10 flex items-center h-[60px]">
          <span className="text-sm font-semibold tracking-widest text-text-primary uppercase mr-auto">
            Kayo Portal
          </span>
          <a
            href="https://github.com/Kayo2970"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            github.com/Kayo2970
          </a>
        </nav>
        {children}
        <footer className="py-8 text-center text-xs text-text-muted border-t border-border mt-12 mb-6">
          <p>Built by Kayomarz M Pavri</p>
        </footer>
      </body>
    </html>
  );
}
