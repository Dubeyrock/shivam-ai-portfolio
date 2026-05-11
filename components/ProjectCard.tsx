import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { ProjectItem } from "@/lib/data";

export default function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group glass relative overflow-hidden rounded-[2rem] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(var(--color-accent),0.15)]">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(var(--color-accent),0.04)] opacity-0 transition group-hover:opacity-100" />
      <div className="relative">
        {project.image ? (
          <img src={project.image} alt={project.title} className="mb-4 h-40 w-full rounded-2xl object-cover" />
        ) : (
          <div className="mb-4 grid h-40 place-items-center rounded-2xl border border-[var(--glass-border)] bg-[rgb(var(--color-bg-surface)/0.7)] text-sm text-[rgb(var(--color-text-muted))]">
            3D project panel
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          <span className="chip">{project.category}</span>
          <span className="text-xs text-[rgb(var(--color-text-muted))]">{project.id}</span>
        </div>
        <h3 className="mt-4 text-2xl font-bold leading-tight text-[rgb(var(--color-text-primary))]">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[rgb(var(--color-text-secondary))]">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => <span key={tech} className="chip">{tech}</span>)}
        </div>

        {project.highlight && (
          <div className="mt-4 rounded-2xl p-4 text-sm" style={{ background: 'var(--highlight-bg)', borderColor: 'var(--highlight-border)', border: '1px solid', color: `rgb(var(--highlight-text))` }}>
            {project.highlight}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={project.github} target="_blank" className="btn-secondary">
            <Github size={16} /> Code
          </Link>
          {project.demo ? (
            <Link href={project.demo} target="_blank" className="btn-primary">
              <ArrowUpRight size={16} /> Live
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
