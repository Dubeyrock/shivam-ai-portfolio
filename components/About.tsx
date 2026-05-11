export default function About() {
  return (
    <section id="about" className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="section-subtitle">About</div>
            <h2 className="section-title mt-2">Professional, solid, and recruiter-ready.</h2>
          </div>

          <div className="glass rounded-[2rem] p-7 leading-7 text-[rgb(var(--color-text-secondary))]">
            I build end-to-end AI products, not just notebooks. My work covers data preprocessing, feature engineering, model training,
            retrieval pipelines, automation, UI development, deployment, and evaluation. This portfolio is designed to show both technical depth
            and product thinking.
          </div>
        </div>
      </div>
    </section>
  );
}
