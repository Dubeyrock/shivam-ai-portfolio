"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, BadgeCheck, Download } from "lucide-react";
import { personal, socialLinks } from "@/lib/data";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="mb-5 flex flex-wrap gap-3">
            <span className="chip">Immediate Joiner</span>
            <span className="chip">Open to Remote / Hybrid / On-site</span>
            <span className="chip">AI • ML • GenAI</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Building{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              production-grade
            </span>{" "}
            AI systems.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[rgb(var(--color-text-secondary))]">
            {personal.summary} I focus on GenAI, RAG, voice AI, computer vision, and practical deployments that recruiters can test.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/Shivam_Dubey_Resume.pdf" download="Shivam_Dubey_Resume.pdf" className="btn-secondary">
              <Download size={16} /> Download Resume
            </a>
            <a href={`mailto:${personal.email}`} className="btn-secondary">
              <Mail size={16} /> Contact
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://github.com/Dubeyrock" target="_blank" className="btn-secondary"><Github size={16} /> GitHub</a>
            <a href="https://www.linkedin.com/in/shivam-dubey-371a591a8/" target="_blank" className="btn-secondary"><Linkedin size={16} /> LinkedIn</a>
            <Link href="/admin" className="btn-secondary"><BadgeCheck size={16} /> Admin CMS</Link>
          </div>

          <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
            {[
              ["6+", "AI/ML projects"],
              ["5+", "major internships"],
              ["3+", "public blogs"]
            ].map(([value, label]) => (
              <div key={label} className="glass rounded-3xl p-5">
                <div className="text-3xl font-bold text-[rgb(var(--color-accent))]">{value}</div>
                <div className="mt-1 text-sm text-[rgb(var(--color-text-muted))]">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[2rem] bg-[rgba(var(--color-accent),0.08)] blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--color-accent),0.08)] via-transparent to-[rgba(139,92,246,0.08)]" />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--color-accent))]">Developer Theme</div>
                  <div className="mt-1 text-xl font-semibold text-[rgb(var(--color-text-primary))]">{personal.name}</div>
                </div>
                <div className="rounded-full border border-[rgba(var(--color-accent),0.2)] bg-[rgba(var(--color-accent),0.08)] px-3 py-1 text-xs text-[rgb(var(--color-accent))]">
                  Online
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-[var(--glass-border)] bg-[rgb(var(--color-bg-surface)/0.7)] p-5">
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">Profile</div>
                  <div className="mt-2 text-2xl font-bold text-[rgb(var(--color-text-primary))]">AI/ML Engineer</div>
                  <div className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">{personal.location}</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--overlay-white)] p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-[rgb(var(--color-accent))]">Stack</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["LangChain", "RAG", "LLMs", "Python"].map((item) => <span key={item} className="chip">{item}</span>)}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--overlay-white)] p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-[rgb(var(--color-accent))]">Links</div>
                    <div className="mt-3 grid gap-2 text-sm">
                      {socialLinks.slice(0, 3).map((item) => (
                        <a key={item.label} href={item.href} target="_blank" className="text-[rgb(var(--color-text-secondary))] transition hover:text-[rgb(var(--color-accent))]">
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-[var(--glass-border)] bg-gradient-to-r from-[rgba(var(--color-accent),0.1)] to-[rgba(139,92,246,0.1)] p-5">
                  <div className="text-sm text-[rgb(var(--color-text-secondary))]">Feature highlight</div>
                  <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
                    Recruiter analytics, admin CMS, project uploads, and a polished 3D-styled UI are built into this portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
