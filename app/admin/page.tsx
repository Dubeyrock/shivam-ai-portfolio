"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Upload, Save, ArrowLeft, Sparkles, ImageIcon, Check, X } from "lucide-react";
import Link from "next/link";
import { projectsSeed, certifications, blogs, timeline, ProjectItem } from "@/lib/data";
import { loadProjectsFallback, saveProjectsFallback } from "@/lib/storage";
import { slugify } from "@/lib/utils";

type Tab = "projects" | "certifications" | "blogs" | "timeline";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<ProjectItem[]>(projectsSeed);
  const [newProject, setNewProject] = useState<ProjectItem>({
    id: "",
    title: "",
    category: "GenAI",
    summary: "",
    tech: [],
    github: "",
    demo: "",
    highlight: "",
    image: ""
  });
  const [techInput, setTechInput] = useState("");
  const [certList, setCertList] = useState<string[]>(certifications);
  const [blogList, setBlogList] = useState(blogs);
  const [timelineList, setTimelineList] = useState(timeline);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ id: string; status: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const stored = loadProjectsFallback(projectsSeed);
    setProjects(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCerts = window.localStorage.getItem("shivam-certs-v1");
      const localBlogs = window.localStorage.getItem("shivam-blogs-v1");
      const localTimeline = window.localStorage.getItem("shivam-timeline-v1");
      if (localCerts) setCertList(JSON.parse(localCerts));
      if (localBlogs) setBlogList(JSON.parse(localBlogs));
      if (localTimeline) setTimelineList(JSON.parse(localTimeline));
    }
  }, []);

  const totalItems = useMemo(() => ({
    projects: projects.length,
    certifications: certList.length,
    blogs: blogList.length,
    timeline: timelineList.length
  }), [projects.length, certList.length, blogList.length, timelineList.length]);

  function persist(next: ProjectItem[]) {
    setProjects(next);
    saveProjectsFallback(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  }

  function addProject() {
    const item: ProjectItem = {
      ...newProject,
      id: newProject.id || slugify(newProject.title),
      tech: techInput.split(",").map((s) => s.trim()).filter(Boolean)
    };
    persist([item, ...projects]);
    setNewProject({
      id: "",
      title: "",
      category: "GenAI",
      summary: "",
      tech: [],
      github: "",
      demo: "",
      highlight: "",
      image: ""
    });
    setTechInput("");
  }

  function removeProject(id: string) {
    persist(projects.filter((p) => p.id !== id));
  }

  function updateProject(id: string, field: keyof ProjectItem, value: string) {
    persist(projects.map((p) => p.id === id ? { ...p, [field]: value } as ProjectItem : p));
  }

  function updateTech(id: string, value: string) {
    persist(projects.map((p) => p.id === id ? { ...p, tech: value.split(",").map((s) => s.trim()).filter(Boolean) } : p));
  }

  async function uploadImage(id: string, file: File | null) {
    if (!file) return;
    setUploading(id);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", id);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        // Save the URL to the project and persist
        persist(projects.map((p) => p.id === id ? { ...p, image: data.url } : p));
        setUploadStatus({ id, status: "success", message: "Image saved!" });
      } else {
        setUploadStatus({ id, status: "error", message: data.error || "Upload failed" });
      }
    } catch {
      setUploadStatus({ id, status: "error", message: "Network error" });
    } finally {
      setUploading(null);
      window.setTimeout(() => setUploadStatus(null), 3000);
    }
  }

  function saveAll() {
    saveProjectsFallback(projects);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("shivam-certs-v1", JSON.stringify(certList));
      window.localStorage.setItem("shivam-blogs-v1", JSON.stringify(blogList));
      window.localStorage.setItem("shivam-timeline-v1", JSON.stringify(timelineList));
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  function saveLocalStorage(key: string, value: unknown) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  const inputClass = "rounded-2xl px-4 py-3 outline-none text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-muted))] transition-colors duration-300";
  const inputStyle = { background: 'var(--input-bg)', border: '1px solid var(--input-border)' };

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="glass mb-6 flex flex-col gap-4 rounded-3xl p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[rgb(var(--color-accent))]">
              <Sparkles size={18} />
              <span className="text-xs uppercase tracking-[0.3em]">Admin Panel</span>
            </div>
            <h1 className="text-3xl font-bold text-[rgb(var(--color-text-primary))]">Portfolio Content Manager</h1>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Add, update, delete, and upload content from one dashboard.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="btn-secondary">
              <ArrowLeft size={16} /> Back to site
            </Link>
            <button onClick={saveAll} className="btn-primary">
              <Save size={16} /> {saved ? "Saved ✓" : "Save All"}
            </button>
          </div>
        </div>

        {/* Tab Cards */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {(["projects", "certifications", "blogs", "timeline"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`glass rounded-3xl p-5 text-left transition hover:-translate-y-1 ${tab === t ? "ring-2 ring-[rgb(var(--color-accent))]" : ""}`}
            >
              <div className="text-sm uppercase tracking-[0.25em] text-[rgb(var(--color-accent))]">{t}</div>
              <div className="mt-2 text-2xl font-bold text-[rgb(var(--color-text-primary))]">{totalItems[t]}</div>
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {tab === "projects" && (
          <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
            {/* Add Project Form */}
            <div className="glass rounded-3xl p-5">
              <h2 className="mb-4 text-xl font-semibold text-[rgb(var(--color-text-primary))]">Add Project</h2>
              <div className="grid gap-3">
                <input className={inputClass} style={inputStyle} placeholder="Project title"
                  value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                <input className={inputClass} style={inputStyle} placeholder="Category"
                  value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} />
                <textarea className={`${inputClass} min-h-[110px]`} style={inputStyle} placeholder="Summary"
                  value={newProject.summary} onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })} />
                <input className={inputClass} style={inputStyle} placeholder="GitHub URL"
                  value={newProject.github} onChange={(e) => setNewProject({ ...newProject, github: e.target.value })} />
                <input className={inputClass} style={inputStyle} placeholder="Demo URL"
                  value={newProject.demo} onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })} />
                <input className={inputClass} style={inputStyle} placeholder="Highlight"
                  value={newProject.highlight} onChange={(e) => setNewProject({ ...newProject, highlight: e.target.value })} />
                <input className={inputClass} style={inputStyle} placeholder="Tech stack comma separated"
                  value={techInput} onChange={(e) => setTechInput(e.target.value)} />
                <button onClick={addProject} className="btn-primary"><Plus size={16} /> Add Project</button>
              </div>
            </div>

            {/* Existing Projects */}
            <div className="grid gap-4">
              {projects.map((project) => (
                <article key={project.id} className="glass rounded-3xl p-5">
                  <div className="grid gap-3 md:grid-cols-[1fr_240px]">
                    {/* Project Fields */}
                    <div className="grid gap-3">
                      <input className={inputClass} style={inputStyle} value={project.title}
                        onChange={(e) => updateProject(project.id, "title", e.target.value)} />
                      <input className={inputClass} style={inputStyle} value={project.category}
                        onChange={(e) => updateProject(project.id, "category", e.target.value)} />
                      <textarea className={`${inputClass} min-h-[90px]`} style={inputStyle} value={project.summary}
                        onChange={(e) => updateProject(project.id, "summary", e.target.value)} />
                      <input className={inputClass} style={inputStyle} value={project.github}
                        onChange={(e) => updateProject(project.id, "github", e.target.value)} />
                      <input className={inputClass} style={inputStyle} value={project.demo || ""}
                        onChange={(e) => updateProject(project.id, "demo", e.target.value)} placeholder="Demo URL" />
                      <input className={inputClass} style={inputStyle} value={project.highlight || ""}
                        onChange={(e) => updateProject(project.id, "highlight", e.target.value)} placeholder="Highlight" />
                      <input className={inputClass} style={inputStyle} value={project.tech.join(", ")}
                        onChange={(e) => updateTech(project.id, e.target.value)} />
                    </div>

                    {/* Image Upload + Actions */}
                    <div className="space-y-3">
                      <label className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 text-sm transition-colors
                        ${uploading === project.id
                          ? "border-[rgb(var(--color-accent))] bg-[rgba(var(--color-accent),0.05)]"
                          : "border-[var(--glass-border)] hover:border-[rgba(var(--color-accent),0.4)] hover:bg-[rgba(var(--color-accent),0.04)]"
                        } text-[rgb(var(--color-text-secondary))]`}>
                        {uploading === project.id ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[rgb(var(--color-accent))] border-t-transparent" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={18} />
                            <span>Upload Image</span>
                            <span className="text-xs text-[rgb(var(--color-text-muted))]">JPG, PNG, WebP • Max 5MB</span>
                          </>
                        )}
                        <input type="file" accept="image/*" className="hidden"
                          onChange={(e) => uploadImage(project.id, e.target.files?.[0] || null)}
                          disabled={uploading === project.id} />
                      </label>

                      {/* Upload Status Message */}
                      {uploadStatus?.id === project.id && (
                        <div className={`flex items-center gap-2 rounded-2xl p-3 text-xs ${
                          uploadStatus.status === "success"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        }`}>
                          {uploadStatus.status === "success" ? <Check size={14} /> : <X size={14} />}
                          {uploadStatus.message}
                        </div>
                      )}

                      {/* Image Preview */}
                      {project.image ? (
                        <div className="relative group">
                          <img src={project.image} alt={project.title} className="h-40 w-full rounded-2xl object-cover" />
                          <button
                            onClick={() => updateProject(project.id, "image", "")}
                            className="absolute top-2 right-2 rounded-full bg-rose-500/80 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--overlay-white)] text-[rgb(var(--color-text-muted))]">
                          <ImageIcon size={24} className="opacity-40" />
                          <span className="text-xs">No image uploaded</span>
                        </div>
                      )}

                      {/* Image URL input (manual) */}
                      <input
                        className={`${inputClass} w-full text-xs`}
                        style={inputStyle}
                        value={project.image || ""}
                        onChange={(e) => updateProject(project.id, "image", e.target.value)}
                        placeholder="Or paste image URL"
                      />

                      {/* Save & Delete buttons */}
                      <button
                        onClick={() => {
                          saveProjectsFallback(projects);
                          setSaved(true);
                          window.setTimeout(() => setSaved(false), 1400);
                        }}
                        className="btn-primary w-full justify-center"
                      >
                        <Save size={16} /> Save Project
                      </button>
                      <button onClick={() => removeProject(project.id)} className="btn-secondary w-full justify-center text-rose-500 dark:text-rose-300">
                        <Trash2 size={16} /> Delete
                      </button>
                      <div className="rounded-2xl p-3 text-xs text-[rgb(var(--color-text-muted))]" style={{ background: 'rgba(var(--color-accent), 0.05)', border: '1px solid rgba(var(--color-accent), 0.1)' }}>
                        ID: {project.id}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Tab */}
        {tab === "certifications" && (
          <section className="glass rounded-3xl p-5">
            <h2 className="mb-4 text-xl font-semibold text-[rgb(var(--color-text-primary))]">Certifications</h2>
            <EditorList
              items={certList}
              setItems={(items) => { setCertList(items); saveLocalStorage("shivam-certs-v1", items); }}
              placeholder="Add certification title"
            />
          </section>
        )}

        {/* Blogs Tab */}
        {tab === "blogs" && (
          <section className="glass rounded-3xl p-5">
            <h2 className="mb-4 text-xl font-semibold text-[rgb(var(--color-text-primary))]">Blogs</h2>
            <EditorList
              items={blogList.map((b) => `${b.title} | ${b.href}`)}
              setItems={(items) => {
                const parsed = items.map((raw) => {
                  const [title, href] = raw.split("|").map((s) => s.trim());
                  return { title, href };
                });
                setBlogList(parsed);
                saveLocalStorage("shivam-blogs-v1", parsed);
              }}
              placeholder="Title | link"
            />
          </section>
        )}

        {/* Timeline Tab */}
        {tab === "timeline" && (
          <section className="glass rounded-3xl p-5">
            <h2 className="mb-4 text-xl font-semibold text-[rgb(var(--color-text-primary))]">Experience Timeline</h2>
            <EditorList
              items={timelineList.map((t) => `${t.year} | ${t.title} | ${t.org} | ${t.desc}`)}
              setItems={(items) => {
                const parsed = items.map((raw) => {
                  const [year, title, org, desc] = raw.split("|").map((s) => s.trim());
                  return { year, title, org, desc };
                });
                setTimelineList(parsed);
                saveLocalStorage("shivam-timeline-v1", parsed);
              }}
              placeholder="Year | Role | Company | Description"
            />
          </section>
        )}
      </div>
    </main>
  );
}

function EditorList({
  items,
  setItems,
  placeholder
}: {
  items: string[];
  setItems: (items: string[]) => void;
  placeholder: string;
}) {
  const [value, setValue] = useState("");

  const inputClass = "rounded-2xl px-4 py-3 outline-none text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-muted))] transition-colors duration-300";
  const inputStyle = { background: 'var(--input-bg)', border: '1px solid var(--input-border)' };

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          className={`${inputClass} flex-1`}
          style={inputStyle}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="btn-primary"
          onClick={() => {
            if (!value.trim()) return;
            setItems([value.trim(), ...items]);
            setValue("");
          }}
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="grid gap-3">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3" style={inputStyle}>
            <input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[index] = e.target.value;
                setItems(next);
              }}
              className="w-full bg-transparent outline-none text-[rgb(var(--color-text-primary))]"
            />
            <button className="rounded-xl p-2 hover:bg-[rgba(var(--color-accent),0.1)] text-[rgb(var(--color-text-muted))]" onClick={() => setItems(items.filter((_, i) => i !== index))}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
