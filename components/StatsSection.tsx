"use client";

import { useEffect, useState } from "react";
import { incrementLocalVisitCount, getLocalVisitCount } from "@/lib/storage";

export default function StatsSection() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const next = incrementLocalVisitCount();
    setVisits(next);
    fetch("/api/analytics", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Profile visits", `${visits}`],
            ["Recruiter-ready projects", "6+"],
            ["Public blogs", "3+"],
            ["Core domains", "AI / ML / GenAI"]
          ].map(([label, value]) => (
            <div key={label} className="glass rounded-3xl p-6">
              <div className="text-sm text-[rgb(var(--color-text-muted))]">{label}</div>
              <div className="mt-2 text-3xl font-bold text-[rgb(var(--color-accent))]">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
