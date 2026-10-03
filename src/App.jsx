import { useState } from 'react';
import { Github, ArrowUpRight, ArrowDown, Menu, X, Mail, Linkedin, Cpu, Sparkles, Radio, ExternalLink } from 'lucide-react';
import LazyHeroScene from './components/LazyHeroScene.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import StackExplorer from './components/StackExplorer.jsx';
import { projects, publishedProjects } from './data.js';

const repoUrl = 'https://github.com/jithinseemakurthi';
const portfolioUrl = 'https://jithinseemakurthi.github.io/jithinseemakurthi/';

function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Jithin Seemakurthi, home" onClick={closeMenu}>
        <span className="brand-mark">J<span>.</span></span>
        <span>JITHIN<span className="brand-muted"> / SEEMAKURTHI</span></span>
      </a>
      <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <nav className={open ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        <a href="#work" onClick={closeMenu}>Selected work</a>
        <a href="#stack" onClick={closeMenu}>Capabilities</a>
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Let’s connect <ArrowUpRight size={13} /></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-content">
        <p className="eyebrow"><span className="live-dot" /> ENGINEERING ACROSS THE DIGITAL + PHYSICAL</p>
        <h1>Where software<br />meets <span className="gradient-text">the signal.</span></h1>
        <p className="hero-description">
          I’m Jithin—a full-stack builder and ECE undergraduate exploring AI agents, connected devices, and experiences that make complex ideas feel simple.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">Explore selected work <ArrowDown size={15} /></a>
          <a className="button button-ghost" href={repoUrl} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
        </div>
        <div className="hero-pill-row" aria-label="Areas of focus">
          <span><Sparkles size={13} /> FULL-STACK</span>
          <span><Cpu size={13} /> AI / AGENTIC</span>
          <span><Radio size={13} /> ECE / EMBEDDED</span>
        </div>
      </div>
      <div className="hero-art">
        <div className="scene-topline"><span><i className="live-dot" /> SIGNAL CORE / 001</span><span>DRAG TO ORBIT</span></div>
        <LazyHeroScene />
        <div className="scene-caption"><span className="caption-line" /> SOFTWARE <span>×</span> INTELLIGENCE <span>×</span> HARDWARE</div>
        <div className="scene-corner scene-corner-tl" />
        <div className="scene-corner scene-corner-br" />
      </div>
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><span className="scroll-track" /></div>
    </section>
  );
}

function Projects() {
  const [expandedProject, setExpandedProject] = useState(projects[0].id);
  return (
    <section className="work-section section-shell" id="work">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED PROJECTS</p>
          <h2>Ideas, <span className="gradient-text">in motion.</span></h2>
        </div>
        <p>Four explorations at the intersection of product engineering, intelligent systems, and real-world impact.</p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            expanded={expandedProject === project.id}
            onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
          />
        ))}
      </div>
      <div className="published-work">
        <div className="published-heading"><span>LIVE ON GITHUB</span><a href={`${repoUrl}?tab=repositories`} target="_blank" rel="noreferrer">Explore all repositories <ArrowUpRight size={13} /></a></div>
        <div className="published-list">
          {publishedProjects.map((project, index) => (
            <article className="published-row" key={project.name}>
              <span className="published-index">0{index + 1}</span>
              <div className="published-copy"><a href={project.url} target="_blank" rel="noreferrer">{project.name} <ArrowUpRight size={12} /></a><p>{project.detail}</p></div>
              <span className="published-stack">{project.stack}</span>
              <a className="published-repo" href={project.demo ?? project.url} target="_blank" rel="noreferrer" aria-label={`${project.demo ? 'Open live demo for' : 'Open repository for'} ${project.name}`}><ExternalLink size={15} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner section-shell">
        <div>
          <p className="eyebrow">04 / OPEN CHANNEL</p>
          <h2>Have a good problem?<br /><span className="gradient-text">Let’s build something.</span></h2>
        </div>
        <div className="contact-copy">
          <p>I’m interested in thoughtful products where software, AI, and hardware meet. Reach out to compare notes or start a collaboration.</p>
          <div className="contact-links">
            <a href="mailto:jithinseemakurthi@gmail.com"><Mail size={15} /> Email me <ArrowUpRight size={13} /></a>
            <a href="https://www.linkedin.com/search/results/people/?keywords=Jithin%20Seemakurthi" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a>
            <a href={repoUrl} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <a className="brand footer-brand" href="#home"><span className="brand-mark">J<span>.</span></span><span>JITHIN<span className="brand-muted"> / SEEMAKURTHI</span></span></a>
      <span>DESIGNED TO CONNECT THE DOTS <span className="footer-dot">●</span> 2026</span>
      <a href={portfolioUrl}>Back to top ↑</a>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <div className="signal-strip section-shell">
          <div><span>01</span> BUILD FOR THE BROWSER</div><i />
          <div><span>02</span> REASON WITH MACHINES</div><i />
          <div><span>03</span> DESIGN FOR REALITY</div>
        </div>
        <Projects />
        <StackExplorer />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
