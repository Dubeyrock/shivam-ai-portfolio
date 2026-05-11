import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { ProjectItem } from "@/lib/data";

const filePath = path.join(process.cwd(), "data", "projects.json");

async function readProjects(): Promise<ProjectItem[]> {
  const raw = await fs.readFile(filePath, "utf8").catch(() => "[]");
  try {
    return JSON.parse(raw) as ProjectItem[];
  } catch {
    return [];
  }
}

export async function GET() {
  const items = await readProjects();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const project = (await req.json()) as ProjectItem;
  const items = await readProjects();
  items.unshift(project);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(items, null, 2));
  return NextResponse.json({ ok: true, items });
}
