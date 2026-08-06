"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletButton } from "@/components/wallet-button";
import { Button } from "@/components/ui/button";
import { navSections, type NavSection } from "@/components/nav-data";
import { cn } from "@/lib/utils";

function openSearch() {
  document.dispatchEvent(new Event("open-command"));
}

export function Navbar() {
  const [active, setActive] = useState<NavSection["key"] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "bg-transparent",
      )}
      onMouseLeave={() => setActive(null)}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Redbelly DAO home">
          <Logo />
        </Link>

        {/* Desktop triggers */}
        <div className="hidden items-center gap-1 lg:flex">
          {navSections.map((section) => (
            <button
              key={section.key}
              onMouseEnter={() => setActive(section.key)}
              onFocus={() => setActive(section.key)}
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === section.key ? "text-ember" : "text-ink hover:text-ember",
              )}
              aria-expanded={active === section.key}
            >
              {section.label}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", active === section.key && "rotate-180")}
              />
            </button>
          ))}
          <Link
            href="/institutional#metrics"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-ember"
          >
            Ecosystem
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            className="hidden h-10 items-center gap-2 rounded-full border border-border px-3 text-sm text-muted transition-colors hover:border-ember hover:text-ember sm:flex"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden rounded border border-border px-1.5 text-[10px] md:inline">⌘K</kbd>
          </button>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="hidden sm:block">
            <WalletButton />
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-16 hidden lg:block"
            onMouseEnter={() => setActive(active)}
          >
            <div className="mx-auto max-w-7xl px-8">
              <div className="overflow-hidden rounded-b-4xl border border-t-0 border-border bg-surface/95 shadow-lift backdrop-blur-xl">
                {navSections
                  .filter((s) => s.key === active)
                  .map((section) => (
                    <div key={section.key} className="grid grid-cols-[1fr_2.4fr]">
                      <div className="border-r border-border bg-mesh-radial p-8">
                        <p className={cn("font-display text-2xl font-semibold", section.accent)}>
                          {section.label}
                        </p>
                        <p className="mt-2 max-w-[22ch] text-sm text-muted">{section.tagline}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1 p-4">
                        {section.links.map((link) => {
                          const Icon = link.icon;
                          const inner = (
                            <span className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-surface-2">
                              {Icon && (
                                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink transition-colors group-hover:bg-ember/12 group-hover:text-ember">
                                  <Icon className="h-4 w-4" />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="flex items-center gap-1 text-sm font-medium text-ink">
                                  {link.label}
                                  {link.external && <ArrowUpRight className="h-3 w-3 text-muted" />}
                                </span>
                                {link.description && (
                                  <span className="mt-0.5 block truncate text-xs text-muted">
                                    {link.description}
                                  </span>
                                )}
                              </span>
                            </span>
                          );
                          return link.external ? (
                            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" onClick={() => setActive(null)}>
                              {inner}
                            </a>
                          ) : (
                            <Link key={link.label} href={link.href} onClick={() => setActive(null)}>
                              {inner}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="scroll-thin absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  openSearch();
                }}
                className="mt-5 flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm text-muted"
              >
                <Search className="h-4 w-4" /> Search everything
              </button>

              <div className="mt-4 space-y-4">
                {navSections.map((section) => (
                  <details key={section.key} className="group rounded-3xl border border-border">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold">
                      <span className={section.accent}>{section.label}</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="space-y-0.5 px-2 pb-2">
                      {section.links.map((link) =>
                        link.external ? (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm text-ink hover:bg-surface-2"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                          </a>
                        ) : (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-2xl px-3 py-2.5 text-sm text-ink hover:bg-surface-2"
                          >
                            {link.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </details>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <WalletButton />
                <ThemeToggle />
              </div>
              <a href="https://redbelly.network/" target="_blank" rel="noreferrer" className="mt-4">
                <Button className="w-full">Join Mainnet</Button>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
