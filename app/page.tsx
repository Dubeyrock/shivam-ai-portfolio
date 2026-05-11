import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import GitHubDashboard from "@/components/GitHubDashboard";
import StatsSection from "@/components/StatsSection";
import BlogsSection from "@/components/BlogsSection";
import CertificationsSection from "@/components/CertificationsSection";
import AIHelperCard from "@/components/AIHelperCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <TimelineSection />
      <ProjectsSection />
      <GitHubDashboard />
      <StatsSection />
      <BlogsSection />
      <CertificationsSection />
      <AIHelperCard />
      <ContactSection />
      <Footer />
    </main>
  );
}