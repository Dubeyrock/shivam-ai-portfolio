"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { personal, socialLinks } from "@/lib/data";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Write a short message")
});

type FormValues = z.infer<typeof schema>;

export default function ContactSection() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormValues) => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setDone(true);
    reset();
    window.setTimeout(() => setDone(false), 2500);
  };

  return (
    <section id="contact" className="px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass rounded-[2rem] p-7">
          <div className="section-subtitle">Contact</div>
          <h2 className="section-title mt-2">Let's build something advanced.</h2>
          <p className="mt-4 text-[rgb(var(--color-text-secondary))]">Open to AI/ML, GenAI, Data Science, Python, and Data Engineer roles.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a href={`mailto:${personal.email}`} className="btn-secondary"><Mail size={16} /> {personal.email}</a>
            <a href="https://www.linkedin.com/in/shivam-dubey-371a591a8/" target="_blank" className="btn-secondary"><Linkedin size={16} /> LinkedIn</a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" className="chip">{item.label}</a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-[2rem] p-7">
          <div className="grid gap-4">
            <input {...register("name")} placeholder="Your name"
              className="rounded-2xl px-4 py-3 outline-none text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-muted))]"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)' }} />
            {errors.name && <p className="text-sm text-rose-500">{errors.name.message}</p>}

            <input {...register("email")} placeholder="Your email"
              className="rounded-2xl px-4 py-3 outline-none text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-muted))]"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)' }} />
            {errors.email && <p className="text-sm text-rose-500">{errors.email.message}</p>}

            <textarea {...register("message")} placeholder="Your message"
              className="min-h-[140px] rounded-2xl px-4 py-3 outline-none text-[rgb(var(--color-text-primary))] placeholder:text-[rgb(var(--color-text-muted))]"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)' }} />
            {errors.message && <p className="text-sm text-rose-500">{errors.message.message}</p>}

            <button disabled={isSubmitting} className="btn-primary" type="submit">
              <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {done && (
              <div className="rounded-2xl p-4 text-sm" style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', color: `rgb(var(--success-text))` }}>
                Message sent successfully.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
