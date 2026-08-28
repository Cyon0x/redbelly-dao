import {
  BookOpen,
  Boxes,
  Code2,
  Coins,
  Compass,
  FileCode2,
  Gavel,
  GitBranch,
  Globe2,
  LayoutDashboard,
  LayoutGrid,
  LifeBuoy,
  ListChecks,
  type LucideIcon,
  ScrollText,
  Search,
  Shield,
  ShieldCheck,
  Sprout,
  Users,
  Vote,
  Wallet,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  external?: boolean;
}

export interface NavSection {
  key: "developers" | "dao" | "institutional";
  label: string;
  tagline: string;
  accent: string; // tailwind text color class
  links: NavLink[];
}

export const navSections: NavSection[] = [
  {
    key: "developers",
    label: "Developers",
    tagline: "Everything you need to build on Redbelly.",
    accent: "text-dev",
    links: [
      { label: "Documentation", href: "/developers", description: "Guides, tutorials, and API reference", icon: BookOpen },
      { label: "SDKs", href: "/developers#sdks", description: "viem, wagmi, and language SDKs", icon: Code2 },
      { label: "API Reference", href: "/developers#api", description: "JSON-RPC and REST endpoints", icon: FileCode2 },
      { label: "Vine Developer Portal", href: "https://vine.redbelly.network/", description: "Node operators and network status", icon: GitBranch, external: true },
      { label: "Explorer", href: "https://redbelly.routescan.io/", description: "Blocks, transactions, and contracts", icon: Compass, external: true },
      { label: "Testnet & Faucet", href: "/developers#testnet", description: "Chain 153 · RBNT faucet", icon: Boxes },
      { label: "Grants", href: "https://redbelly.network/grant", description: "Funding to build on Redbelly", icon: Sprout, external: true },
      { label: "Bug Bounty", href: "https://hashlock.com/bug-bounty/redbelly-network", description: "Report vulnerabilities, earn rewards", icon: Shield, external: true },
    ],
  },
  {
    key: "dao",
    label: "DAO",
    tagline: "Participate in Redbelly governance.",
    accent: "text-gov",
    links: [
      { label: "Governance", href: "/dao", description: "How Redbelly is governed", icon: Gavel },
      { label: "Proposals", href: "/dao/proposals", description: "Browse and track proposals", icon: ScrollText },
      { label: "Voting", href: "/dao/proposals?filter=active", description: "Cast and delegate votes", icon: Vote },
      { label: "Treasury", href: "/dao/treasury", description: "On-chain treasury dashboard", icon: Coins },
      { label: "Task Board", href: "/dao/tasks", description: "Contributor bounties and rewards", icon: ListChecks },
      { label: "Community Showcase", href: "/dao/showcase", description: "dApps, tools, and projects built by the community", icon: LayoutGrid },
      { label: "Working Groups", href: "/dao#working-groups", description: "Where contributors organise", icon: Users },
      { label: "Community", href: "https://discord.gg/redbelly", description: "Discord, forums, and events", icon: Globe2, external: true },
    ],
  },
  {
    key: "institutional",
    label: "Institutional",
    tagline: "Due diligence for enterprises and issuers.",
    accent: "text-inst",
    links: [
      { label: "Security", href: "/institutional#security", description: "Architecture and audits", icon: ShieldCheck },
      { label: "Compliance", href: "/institutional#compliance", description: "Accredited-issuer governance", icon: ScrollText },
      { label: "Project Acacia", href: "/institutional#acacia", description: "Wholesale settlement pilot", icon: LayoutDashboard },
      { label: "Case Studies", href: "/institutional#cases", description: "Real-world asset tokenisation", icon: BookOpen },
      { label: "Metrics", href: "/institutional#metrics", description: "Network and adoption data", icon: Compass },
      { label: "Enterprise Support", href: "/institutional#contact", description: "Talk to the Redbelly team", icon: LifeBuoy },
    ],
  },
];

export const quickLinks: NavLink[] = [
  { label: "Connect Wallet", href: "#connect", icon: Wallet },
  { label: "Search everything", href: "#search", icon: Search },
];
