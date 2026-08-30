"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Clipboard, Github, Send } from "lucide-react";

const categories = [
  "dApp",
  "Tool / SDK",
  "Wallet",
  "Explorer",
  "Bot / Integration",
  "Content / Education",
  "Infrastructure",
];

export function ShowcaseSubmit() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    builder: "",
    category: "dApp",
    url: "",
    repo: "",
    description: "",
  });

  const submissionText = `RED BELLY DAO COMMUNITY SHOWCASE SUBMISSION\n\nProject: ${form.name}\nBuilder: ${form.builder}\nCategory: ${form.category}\nProject URL: ${form.url}\nSource URL: ${form.repo || "N/A"}\nDescription: ${form.description}`;

  async function submitToDiscord() {
    if (!form.name || !form.builder || !form.url || !form.description) return;
    try {
      await navigator.clipboard.writeText(submissionText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard can be blocked by some browsers; the Discord link still opens.
    }
    window.open("https://discord.gg/redbelly", "_blank", "noopener,noreferrer");
  }

  return (
    <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border bg-surface">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[28px] border-ember/10" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rotate-12 rounded-[4rem] border border-ember/15" />

      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative overflow-hidden border-b border-border bg-black p-7 text-white lg:border-b-0 lg:border-r lg:p-9">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-ember/40" />
          <div className="absolute right-6 top-8 h-3 w-3 rounded-full bg-ember shadow-[0_0_24px_rgba(255,31,43,0.8)]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">COMMUNITY / SHOWCASE / 001</p>
          <h2 className="mt-6 max-w-sm font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Put your build on the map.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Tell the community what you shipped. Complete the signal form, then send the prepared submission to the Redbelly DAO Discord.
          </p>

          <div className="mt-8 space-y-3 font-mono text-[11px] text-white/55">
            {[
              ["01", "Project identity"],
              ["02", "What you built"],
              ["03", "Where to find it"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-ember">{number}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-9">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-medium text-muted">
              Project name *
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Redbelly Pay"
                className="mt-2 h-11 w-full rounded-2xl border border-border bg-surface-2 px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ember"
              />
            </label>
            <label className="text-xs font-medium text-muted">
              Builder / team *
              <input
                value={form.builder}
                onChange={(e) => setForm({ ...form, builder: e.target.value })}
                placeholder="Your name or team"
                className="mt-2 h-11 w-full rounded-2xl border border-border bg-surface-2 px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ember"
              />
            </label>
          </div>

          <label className="mt-4 block text-xs font-medium text-muted">
            Category
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-2 h-11 w-full rounded-2xl border border-border bg-surface-2 px-4 text-sm text-ink outline-none focus:border-ember"
            >
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-medium text-muted">
              Project URL *
              <input
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://..."
                className="mt-2 h-11 w-full rounded-2xl border border-border bg-surface-2 px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ember"
              />
            </label>
            <label className="text-xs font-medium text-muted">
              Source / GitHub
              <input
                type="url"
                value={form.repo}
                onChange={(e) => setForm({ ...form, repo: e.target.value })}
                placeholder="https://github.com/..."
                className="mt-2 h-11 w-full rounded-2xl border border-border bg-surface-2 px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ember"
              />
            </label>
          </div>

          <label className="mt-4 block text-xs font-medium text-muted">
            What did you build? *
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Give the community a short description..."
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-border bg-surface-2 p-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ember"
            />
          </label>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={submitToDiscord}
              disabled={!form.name || !form.builder || !form.url || !form.description}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-ember px-5 text-sm font-semibold text-white transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              {copied ? "Copied — paste it in Discord" : "Prepare & send to Discord"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a
              href="https://github.com/Cyon0x/redbelly-dao"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-border px-5 text-sm font-medium text-ink transition-colors hover:border-ember hover:text-ember"
            >
              <Github className="h-4 w-4" />
              Submit PR
            </a>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
            <Clipboard className="h-3.5 w-3.5" />
            Your submission is copied to your clipboard before Discord opens.
          </p>
        </div>
      </div>
    </div>
  );
}
