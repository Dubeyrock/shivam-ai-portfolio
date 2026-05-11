"use client";

import { useEffect, useState } from "react";
import { timeline as defaultTimeline } from "@/lib/data";

type TimelineItem = { year: string; title: string; org: string; desc: string };

export default function TimelineSection() {
  const [timeline, setTimeline] = useState<TimelineItem[]>(defaultTimeline);

  useEffect(() => {
    const stored = localStorage.getItem("shivam-timeline-v1");
    if (stored) {
      setTimeline(JSON.parse(stored));
    }
  }, []);

  return (
    <section id="timeline" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="section-subtitle">Timeline</div>
          <h2 className="section-title mt-2">Experience and growth.</h2>
        </div>

        <div className="relative grid gap-5">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-500 to-purple-500 dark:from-cyan-400/70 dark:to-purple-400/70 md:block" />
          {timeline.map((item, index) => (
            <div key={`${item.year}-${index}`} className="relative grid gap-4 md:grid-cols-[180px_1fr] md:pl-8">
              <div className="flex items-start gap-3">
                <div className="mt-2 hidden h-3 w-3 rounded-full bg-[rgb(var(--color-accent))] md:block" />
                <div className="text-sm font-semibold text-[rgb(var(--color-accent))]">{item.year}</div>
              </div>
              <div className="glass rounded-3xl p-6">
                <div className="text-xl font-semibold text-[rgb(var(--color-text-primary))]">{item.title}</div>
                <div className="mt-1 text-sm text-[rgb(var(--color-text-muted))]">{item.org}</div>
                <p className="mt-3 text-[rgb(var(--color-text-secondary))]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}