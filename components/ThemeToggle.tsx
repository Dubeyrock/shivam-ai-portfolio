"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <button className="btn-secondary">Theme</button>;

  const dark = resolvedTheme === "dark";
  return (
    <button className="btn-secondary" onClick={() => setTheme(dark ? "light" : "dark")}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      {dark ? "Light" : "Dark"}
    </button>
  );
}
