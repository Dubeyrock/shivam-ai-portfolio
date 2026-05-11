export default function AIHelperCard() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass rounded-[2rem] p-7 md:p-8">
          <div className="section-subtitle">AI Assistant</div>
          <h2 className="section-title mt-2">Ask about Shivam</h2>
          <p className="mt-4 max-w-3xl text-[rgb(var(--color-text-secondary))]">
            This area is ready for a RAG chatbot later. You can connect it to your resume, projects, and FAQs using FAISS + Groq/Gemini.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Skills", "Projects", "Experience", "Certifications", "Blogs"].map((item) => (
              <span key={item} className="chip">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
