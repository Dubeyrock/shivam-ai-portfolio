"use client";

import { useEffect, useState } from "react";
import { blogs as defaultBlogs } from "@/lib/data";
import Link from "next/link";

type Blog = { title: string; href: string };

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>(defaultBlogs);

  useEffect(() => {
    const stored = localStorage.getItem("shivam-blogs-v1");
    if (stored) {
      setBlogs(JSON.parse(stored));
    }
  }, []);

  return (
    <section id="blogs" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="section-subtitle">Blogs</div>
          <h2 className="section-title mt-2">Research-style writing and technical content.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link key={blog.href} href={blog.href} target="_blank" className="glass rounded-3xl p-6 transition hover:-translate-y-1">
              <div className="text-sm uppercase tracking-[0.25em] text-[rgb(var(--color-accent))]">Medium</div>
              <div className="mt-3 text-lg font-semibold leading-snug text-[rgb(var(--color-text-primary))]">{blog.title}</div>
              <div className="mt-4 text-sm text-[rgb(var(--color-text-muted))]">Read article →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}