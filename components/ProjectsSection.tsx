"use client";

import { useMemo, useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { projectsSeed, ProjectItem } from "@/lib/data";
import { loadProjectsFallback } from "@/lib/storage";

const categories = ["All", ...new Set(projectsSeed.map((p) => p.category))];

export default function ProjectsSection() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [localProjects, setLocalProjects] = useState<ProjectItem[]>(projectsSeed);

  useEffect(() => {
    setLocalProjects(loadProjectsFallback(projectsSeed));
  }, []);

  const projects = useMemo<ProjectItem[]>(() => {
    return localProjects.filter((project) => {
      const matchCategory = active === "All" || project.category === active;
      const haystack = `${project.title} ${project.summary} ${project.tech.join(" ")}`.toLowerCase();
      const matchQuery = haystack.includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [active, query, localProjects]);

  return (
    <section id="projects" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-subtitle">Projects</div>
            <h2 className="section-title mt-2">Featured work with filtering and search.</h2>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full max-w-md rounded-2xl border px-4 py-3 text-sm outline-none transition-colors duration-300 placeholder:text-[rgb(var(--color-text-muted))] text-[rgb(var(--color-text-primary))]"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)' }}
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-2 text-sm transition ${active === category
                ? "bg-[rgb(var(--color-accent))] text-white font-semibold"
                : "border text-[rgb(var(--color-text-secondary))]"}`}
              style={active !== category ? { background: 'var(--overlay-white)', borderColor: 'var(--glass-border)' } : undefined}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
