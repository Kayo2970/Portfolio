import { Project } from '../lib/types';

export const projects: Project[] = [
  {
    id: "leads-website",
    name: "LEADS Website",
    description: "The official LEADS Next Gen Centre website — self-hosted, live, CI/CD on TrueNAS.",
    url: "https://leads.pavris.in",
    image: "https://placehold.co/800x600/111111/FFFFFF/png?text=LEADS+Website",
    status: "live",
    featured: true
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "My personal portfolio site — design, work, and presence in one place.",
    url: "https://github.com/Kayo2970/Portfolio",
    image: "https://placehold.co/800x600/111111/FFFFFF/png?text=Portfolio",
    status: "building"
  },
  {
    id: "bls-2026",
    name: "BLS 2026",
    description: "Bharat Lead Summit 2026 — event microsite, RUAS Bengaluru, April 10-11.",
    url: "#",
    image: "https://placehold.co/800x600/111111/FFFFFF/png?text=BLS+2026",
    status: "live"
  },
  {
    id: "stock-screener",
    name: "Stock Screener",
    description: "Buffett-style screener for Indian equities — Nifty 500 value investing tool.",
    url: "#",
    image: "https://placehold.co/800x600/111111/FFFFFF/png?text=Stock+Screener",
    status: "building"
  },
  {
    id: "truenas-admin",
    name: "TrueNAS Admin",
    description: "Local homelab dashboard via Cloudflare Tunnel.",
    url: "#",
    image: "https://placehold.co/800x600/111111/FFFFFF/png?text=TrueNAS+Admin",
    status: "live"
  }
];
