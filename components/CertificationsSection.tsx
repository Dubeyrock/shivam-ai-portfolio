"use client";

import { useEffect, useState } from "react";
import { certifications as defaultCertifications } from "@/lib/data";

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<string[]>(defaultCertifications);

  useEffect(() => {
    const stored = localStorage.getItem("shivam-certs-v1");
    if (stored) {
      setCertifications(JSON.parse(stored));
    }
  }, []);

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="section-subtitle">Certifications</div>
          <h2 className="section-title mt-2">Credentials that support the profile.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((item) => (
            <div key={item} className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[rgb(var(--color-accent))]" />
                <div className="text-[rgb(var(--color-text-primary))]">{item}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}