import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="section-subtitle">Skills</div>
          <h2 className="section-title mt-2">Technical depth with visible proficiency.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.name} className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div className="font-medium text-[rgb(var(--color-text-primary))]">{skill.name}</div>
                <div className="text-sm text-[rgb(var(--color-accent))]">{skill.level}%</div>
              </div>
              <div className="mt-4 h-3 rounded-full" style={{ background: 'var(--skill-bar-track)' }}>
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
