"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Coins,
  FileText,
  Gavel,
  LayoutGrid,
  ListChecks,
  Search,
} from "lucide-react";
import { navSections } from "@/components/nav-data";
import { daoFixtures } from "@/features/dao/service";

interface Item {
  label: string;
  href: string;
  group: string;
  external?: boolean;
  icon: typeof Search;
}

function buildIndex(): Item[] {
  const items: Item[] = [];
  navSections.forEach((s) =>
    s.links.forEach((l) =>
      items.push({ label: l.label, href: l.href, group: s.label, external: l.external, icon: l.icon ?? FileText }),
    ),
  );
  daoFixtures.proposals.forEach((p) =>
    items.push({ label: `${p.id} · ${p.title}`, href: `/dao/proposals/${p.id}`, group: "Proposals", icon: Gavel }),
  );
  daoFixtures.tasks.forEach((t) =>
    items.push({ label: t.title, href: "/dao/tasks", group: "Tasks", icon: ListChecks }),
  );
  daoFixtures.treasury.assets.forEach((a) =>
    items.push({ label: `Treasury · ${a.name}`, href: "/dao/treasury", group: "Treasury", icon: Coins }),
  );
  daoFixtures.showcaseProjects.forEach((p) =>
    items.push({ label: `${p.name} · ${p.category}`, href: "/dao/showcase", group: "Showcase", icon: LayoutGrid }),
  );
  return items;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const items = buildIndex();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    document.addEventListener("open-command", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("open-command", onOpen);
    };
  }, []);

  const go = (item: Item) => {
    setOpen(false);
    if (item.external) window.open(item.href, "_blank");
    else router.push(item.href);
  };

  const groups = Array.from(new Set(items.map((i) => i.group)));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global search"
      className="fixed left-1/2 top-[15vh] z-[100] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-3xl border border-border bg-surface shadow-lift"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="h-4 w-4 text-muted" />
        <Command.Input
          autoFocus
          placeholder="Search docs, proposals, treasury, tasks…"
          className="h-14 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
        <kbd className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted">ESC</kbd>
      </div>
      <Command.List className="scroll-thin max-h-[52vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
          No results found.
        </Command.Empty>
        {groups.map((group) => (
          <Command.Group
            key={group}
            heading={group}
            className="px-1 py-1 text-xs font-medium uppercase tracking-wider text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
          >
            {items
              .filter((i) => i.group === group)
              .map((item) => (
                <Command.Item
                  key={`${item.group}-${item.label}`}
                  value={`${item.label} ${item.group}`}
                  onSelect={() => go(item)}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-ink"
                >
                  <item.icon className="h-4 w-4 text-muted" />
                  <span className="flex-1 truncate normal-case">{item.label}</span>
                  {item.external && <ArrowUpRight className="h-3.5 w-3.5 text-muted" />}
                </Command.Item>
              ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
