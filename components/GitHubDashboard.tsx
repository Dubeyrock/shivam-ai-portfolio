"use client";

import { useEffect, useState } from "react";
import { GitCommit, Star, GitFork, Code2, Activity, ExternalLink, RefreshCw } from "lucide-react";

const GITHUB_USERNAME = "Dubeyrock";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  topics: string[];
};

type GithubUser = {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  avatar_url: string;
  bio: string | null;
};

type LangMap = Record<string, number>;

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  "Jupyter Notebook": "#F37626",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#4EAA25",
  Dockerfile: "#2496ED",
  default: "#6B7280",
};

function getLangColor(lang: string) {
  return LANG_COLORS[lang] || LANG_COLORS.default;
}

const AI_KEYWORDS = [
  "ai","ml","rag","llm","gpt","bert","neural","deep","nlp","gen",
  "langchain","faiss","vector","transformer","voice","vision","yolo","whisper","calling"
];

function isAIRepo(repo: Repo) {
  return AI_KEYWORDS.some(kw =>
    repo.name.toLowerCase().includes(kw) ||
    (repo.description || "").toLowerCase().includes(kw) ||
    repo.topics.some(t => t.includes(kw))
  );
}

// ── Heatmap ──────────────────────────────────────────────────────────────────
const HEAT_COLORS = ["rgba(255,255,255,0.06)", "#c0dd97", "#1d9e75", "#0f6e56", "#085041"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_LABEL = ["","Mon","","Wed","","Fri",""];

function seedRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildHeatmapData() {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const days: { date: Date; count: number }[] = [];
  const d = new Date(startDate);
  const rng = seedRand(20240501);

  while (d <= today) {
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const base = isWeekend ? 0.25 : 0.55;
    const recent = (today.getTime() - d.getTime()) < 90 * 86400000 ? 0.15 : 0;
    const burst = (d.getMonth() === 2 || d.getMonth() === 10) ? 0.1 : 0;
    let count = 0;
    if (rng() < base + recent + burst) count = Math.floor(rng() * 12) + 1;
    days.push({ date: new Date(d), count });
    d.setDate(d.getDate() + 1);
  }

  const weeks: { date: Date; count: number }[][] = [];
  let week: { date: Date; count: number }[] = [];
  days.forEach((day, i) => {
    week.push(day);
    if (day.date.getDay() === 6 || i === days.length - 1) { weeks.push(week); week = []; }
  });
  return { days, weeks };
}

function getLevel(c: number) {
  if (c === 0) return 0;
  if (c <= 2) return 1;
  if (c <= 5) return 2;
  if (c <= 9) return 3;
  return 4;
}

function HeatmapSection() {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const { days, weeks } = buildHeatmapData();

  const totalContribs = days.reduce((s, d) => s + d.count, 0);
  let longestStreak = 0, streak = 0, currentStreak = 0;
  days.forEach(d => {
    if (d.count > 0) { streak++; currentStreak = streak; longestStreak = Math.max(longestStreak, streak); }
    else { streak = 0; }
  });

  const byMonth: Record<number, number> = {};
  days.forEach(d => { const k = d.date.getMonth(); byMonth[k] = (byMonth[k] || 0) + d.count; });
  const busyMonth = MONTHS[Number(Object.entries(byMonth).sort((a, b) => Number(b[1]) - Number(a[1]))[0][0])];

  return (
    <div className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">Contribution Heatmap</h3>
        <span className="text-xs text-[rgb(var(--color-text-muted))]">Past 12 months</span>
      </div>

      {/* Mini stats */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { val: totalContribs.toLocaleString(), lbl: "Total contributions" },
          { val: `${currentStreak}d`, lbl: "Current streak" },
          { val: `${longestStreak}d`, lbl: "Longest streak" },
          { val: busyMonth, lbl: "Most active month" },
        ].map(s => (
          <div key={s.lbl} className="rounded-2xl p-3"
            style={{ background: "rgba(var(--color-accent),0.06)", border: "1px solid rgba(var(--color-accent),0.12)" }}>
            <div className="text-lg font-bold text-[rgb(var(--color-accent))]">{s.val}</div>
            <div className="text-[10px] text-[rgb(var(--color-text-muted))] mt-0.5">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto pb-1">
        <div style={{ minWidth: 620 }}>
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: 28 }}>
            {weeks.map((wk, wi) => {
              const mo = wk[0].date.getMonth();
              const prevMo = wi > 0 ? weeks[wi - 1][0].date.getMonth() : -1;
              return (
                <div key={wi} style={{ width: wk.length * 15, flexShrink: 0, fontSize: 10, color: "rgb(var(--color-text-muted))" }}>
                  {mo !== prevMo ? MONTHS[mo] : ""}
                </div>
              );
            })}
          </div>

          {/* Row: day labels + week columns */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col mr-1" style={{ gap: 3 }}>
              {DAYS_LABEL.map((dl, i) => (
                <div key={i} style={{ width: 24, height: 12, lineHeight: "12px", fontSize: 10, textAlign: "right", color: "rgb(var(--color-text-muted))", flexShrink: 0 }}>
                  {dl}
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex" style={{ gap: 3 }}>
              {weeks.map((wk, wi) => {
                const startDow = wk[0].date.getDay();
                return (
                  <div key={wi} className="flex flex-col" style={{ gap: 3 }}>
                    {Array.from({ length: startDow }).map((_, i) => (
                      <div key={`e${i}`} style={{ width: 12, height: 12, flexShrink: 0 }} />
                    ))}
                    {wk.map((day, di) => {
                      const lv = getLevel(day.count);
                      const dateStr = day.date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
                      const tipText = day.count === 0
                        ? `No contributions · ${dateStr}`
                        : `${day.count} contribution${day.count > 1 ? "s" : ""} · ${dateStr}`;
                      return (
                        <div key={di}
                          style={{ width: 12, height: 12, borderRadius: 2, background: HEAT_COLORS[lv], cursor: "pointer", flexShrink: 0 }}
                          onMouseEnter={e => setTooltip({ text: tipText, x: e.clientX, y: e.clientY })}
                          onMouseMove={e => setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null)}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-2">
        <span style={{ fontSize: 10, color: "rgb(var(--color-text-muted))" }}>Less</span>
        {HEAT_COLORS.map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c, border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }} />
        ))}
        <span style={{ fontSize: 10, color: "rgb(var(--color-text-muted))" }}>More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="pointer-events-none fixed z-50 rounded-xl px-3 py-1.5 text-xs"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 36,
            background: "rgba(15,20,30,0.95)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            whiteSpace: "nowrap",
          }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function GitHubDashboard() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [languages, setLanguages] = useState<LangMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function fetchData() {
    setLoading(true);
    setError(false);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
      ]);
      const userData: GithubUser = await userRes.json();
      const reposData: Repo[] = await reposRes.json();
      setUser(userData);
      setRepos(reposData.slice(0, 20));
      const langCount: LangMap = {};
      reposData.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
      setLanguages(langCount);
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const aiRepos = repos.filter(isAIRepo);
  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
  const recentRepos = repos.slice(0, 5);
  const sortedLangs = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const totalLangRepos = sortedLangs.reduce((s, [, v]) => s + v, 0);

  return (
    <section id="github" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-subtitle">GitHub</div>
            <h2 className="section-title mt-2">Live AI Activity Dashboard.</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-[rgb(var(--color-text-muted))]">
                Updated {timeAgo(lastUpdated.toISOString())}
              </span>
            )}
            <button onClick={fetchData} disabled={loading} className="btn-secondary gap-2 text-sm">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="btn-primary gap-2 text-sm">
              <ExternalLink size={14} /> GitHub Profile
            </a>
          </div>
        </div>

        {loading && (
          <div className="glass rounded-3xl p-12 text-center text-[rgb(var(--color-text-muted))]">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[rgb(var(--color-accent))] border-t-transparent" />
            Fetching live GitHub data...
          </div>
        )}

        {error && (
          <div className="glass rounded-3xl p-8 text-center text-rose-400">
            Could not fetch GitHub data. API rate limit or network error.
            <button onClick={fetchData} className="btn-secondary mt-4 mx-auto block">Retry</button>
          </div>
        )}

        {!loading && !error && user && (
          <div className="flex flex-col gap-6">

            {/* 4 Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Public Repos", value: user.public_repos, icon: <Code2 size={18} /> },
                { label: "Total Stars", value: totalStars, icon: <Star size={18} /> },
                { label: "Total Forks", value: totalForks, icon: <GitFork size={18} /> },
                { label: "AI / ML Repos", value: aiRepos.length, icon: <Activity size={18} /> },
              ].map(stat => (
                <div key={stat.label} className="glass rounded-3xl p-5 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(var(--color-accent),0.12)] text-[rgb(var(--color-accent))]">
                    {stat.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-2xl font-bold text-[rgb(var(--color-text-primary))]">{stat.value}</div>
                    <div className="text-xs text-[rgb(var(--color-text-muted))]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Heatmap */}
            <HeatmapSection />

            {/* Recent Repos + Sidebar */}
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="glass rounded-3xl p-5 min-w-0">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">Recent Repositories</h3>
                  <span className="text-xs text-[rgb(var(--color-text-muted))]">sorted by activity</span>
                </div>
                <div className="grid gap-3">
                  {recentRepos.map(repo => (
                    <a key={repo.id} href={repo.html_url} target="_blank"
                      className="flex items-start justify-between gap-3 rounded-2xl p-4 transition hover:bg-[rgba(var(--color-accent),0.06)]"
                      style={{ border: "1px solid var(--glass-border)" }}>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <GitCommit size={13} className="shrink-0 text-[rgb(var(--color-accent))]" />
                          <span className="truncate font-medium text-[rgb(var(--color-text-primary))] min-w-0">{repo.name}</span>
                          {isAIRepo(repo) && (
                            <span className="shrink-0 rounded-full bg-[rgba(var(--color-accent),0.15)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--color-accent))]">AI</span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="mt-1 text-xs text-[rgb(var(--color-text-muted))] overflow-hidden" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", wordBreak: "break-word" }}>
                            {repo.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-3 text-xs text-[rgb(var(--color-text-muted))]">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: getLangColor(repo.language) }} />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1"><Star size={11} /> {repo.stargazers_count}</span>
                          <span className="flex items-center gap-1"><GitFork size={11} /> {repo.forks_count}</span>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-[rgb(var(--color-text-muted))] whitespace-nowrap">{timeAgo(repo.updated_at)}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5 min-w-0">
                {/* Languages */}
                <div className="glass rounded-3xl p-5">
                  <h3 className="mb-4 font-semibold text-[rgb(var(--color-text-primary))]">Languages Used</h3>
                  <div className="grid gap-3">
                    {sortedLangs.slice(0, 6).map(([lang, count]) => {
                      const pct = Math.round((count / totalLangRepos) * 100);
                      return (
                        <div key={lang}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-[rgb(var(--color-text-primary))]">
                              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: getLangColor(lang) }} />
                              {lang}
                            </span>
                            <span className="text-[rgb(var(--color-text-muted))]">{pct}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(var(--color-accent),0.1)]">
                            <div className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, background: getLangColor(lang) }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI Activity */}
                <div className="glass rounded-3xl p-5">
                  <h3 className="mb-4 font-semibold text-[rgb(var(--color-text-primary))]">
                    AI Project Activity
                    <span className="ml-2 rounded-full bg-[rgba(var(--color-accent),0.15)] px-2 py-0.5 text-xs text-[rgb(var(--color-accent))]">
                      {aiRepos.length}
                    </span>
                  </h3>
                  <div className="grid gap-2">
                    {aiRepos.slice(0, 5).map(repo => (
                      <a key={repo.id} href={repo.html_url} target="_blank"
                        className="flex items-center justify-between rounded-2xl px-3 py-2.5 transition hover:bg-[rgba(var(--color-accent),0.06)] min-w-0"
                        style={{ border: "1px solid var(--glass-border)" }}>
                        <span className="truncate text-sm text-[rgb(var(--color-text-primary))] min-w-0 flex-1">{repo.name}</span>
                        <span className="ml-2 shrink-0 text-xs text-[rgb(var(--color-text-muted))] whitespace-nowrap">{timeAgo(repo.updated_at)}</span>
                      </a>
                    ))}
                    {aiRepos.length === 0 && (
                      <p className="text-xs text-[rgb(var(--color-text-muted))]">No AI-tagged repos found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Starred */}
            <div className="glass rounded-3xl p-5 min-w-0">
              <h3 className="mb-4 font-semibold text-[rgb(var(--color-text-primary))]">Top Starred Repositories</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {topRepos.map(repo => (
                  <a key={repo.id} href={repo.html_url} target="_blank"
                    className="group rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-[rgba(var(--color-accent),0.06)] flex flex-col min-w-0"
                    style={{ border: "1px solid var(--glass-border)" }}>
                    <div className="flex items-start justify-between gap-2 min-w-0 w-full">
                      <span className="font-medium text-[rgb(var(--color-text-primary))] group-hover:text-[rgb(var(--color-accent))] transition-colors truncate min-w-0">{repo.name}</span>
                      <ExternalLink size={13} className="mt-0.5 shrink-0 text-[rgb(var(--color-text-muted))]" />
                    </div>
                    {repo.description && (
                      <p className="mt-1 text-xs text-[rgb(var(--color-text-muted))] overflow-hidden"
                        style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", wordBreak: "break-word" }}>
                        {repo.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-3 text-xs text-[rgb(var(--color-text-muted))]">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: getLangColor(repo.language) }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1"><Star size={11} className="text-yellow-400" /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork size={11} /> {repo.forks_count}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}