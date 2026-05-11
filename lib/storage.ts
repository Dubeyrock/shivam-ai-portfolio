import type { ProjectItem } from "@/lib/data";

const KEY = "shivam-portfolio-projects-v1";
const VISITS_KEY = "shivam-portfolio-visits-v1";

export function loadProjectsFallback(seed: ProjectItem[]) {
  if (typeof window === "undefined") return seed;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return seed;
  try {
    return JSON.parse(raw) as ProjectItem[];
  } catch {
    return seed;
  }
}

export function saveProjectsFallback(items: ProjectItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
}

export function getLocalVisitCount() {
  if (typeof window === "undefined") return 0;
  const value = Number(window.localStorage.getItem(VISITS_KEY) || "0");
  return Number.isFinite(value) ? value : 0;
}

export function incrementLocalVisitCount() {
  if (typeof window === "undefined") return 0;
  const current = getLocalVisitCount() + 1;
  window.localStorage.setItem(VISITS_KEY, String(current));
  return current;
}
