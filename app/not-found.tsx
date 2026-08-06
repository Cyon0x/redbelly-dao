import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-ember">404 · off-chain</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">This page isn&apos;t in the ledger</h1>
      <p className="mt-3 text-muted">The link may be outdated. Everything is two clicks from home.</p>
      <Link href="/" className="mt-8">
        <Button>Back to home</Button>
      </Link>
    </section>
  );
}
