import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "analytics.json");

export async function GET() {
  const raw = await fs.readFile(filePath, "utf8").catch(() => JSON.stringify({ visits: 0, recruiters: 0 }));
  return NextResponse.json(JSON.parse(raw));
}

export async function POST() {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const raw = await fs.readFile(filePath, "utf8").catch(() => JSON.stringify({ visits: 0, recruiters: 0 }));
  const current = JSON.parse(raw) as { visits?: number; recruiters?: number };
  const next = {
    visits: (current.visits || 0) + 1,
    recruiters: current.recruiters || 0
  };
  await fs.writeFile(filePath, JSON.stringify(next, null, 2));
  return NextResponse.json(next);
}
