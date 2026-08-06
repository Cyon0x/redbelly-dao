import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { TaskBoard } from "@/features/dao/task-board";
import { daoService } from "@/features/dao/service";

export const metadata: Metadata = {
  title: "Task Board",
  description: "Claim contributor bounties across Redbelly working groups and earn RBNT rewards.",
};

export default async function TasksPage() {
  const tasks = await daoService.listTasks();
  return (
    <>
      <PageHeader
        eyebrow="Contributor Rewards"
        title="Task Board"
        description="Pick up bounties from any working group. Claim, ship, and earn RBNT."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "DAO", href: "/dao" },
          { label: "Task Board", href: "/dao/tasks" },
        ]}
      />
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <TaskBoard tasks={tasks} />
      </section>
    </>
  );
}
