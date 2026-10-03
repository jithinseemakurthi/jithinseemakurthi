import { ArrowUpRight, ArrowDownRight, Radio, Activity, Network } from 'lucide-react';

const visuals = {
  diagram: <div className="diagram-art"><span className="diagram-node node-cyan">PROMPT</span><i /><span className="diagram-node node-violet">LLM</span><i /><span className="diagram-node node-blue">DOCS</span><div className="diagram-orbit" /></div>,
  telemetry: <div className="telemetry-art"><div className="telemetry-readout"><Radio size={14} /><span>TELEMETRY / LIVE</span><strong>98.4<span>%</span></strong><small>LINK STATUS <b>CONNECTED</b></small></div><svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 58H40l8-20 9 42 12-62 13 48 9-8h20l7-28 10 43 12-17h20l11-43 10 57 12-18h20l7-26 12 40 9-10h25" /></svg></div>,
  nodes: <div className="nodes-art"><span className="array-node">08</span><i /><span className="array-node node-highlight">13</span><i /><span className="array-node">21</span><i /><span className="array-node">34</span><div className="nodes-caption">STACK <span>·</span> TOP →</div></div>,
  agents: <div className="agents-art"><div className="agent-hub"><Network size={19} /></div><i /><i /><i /><span className="agent agent-a">PLAN</span><span className="agent agent-b">TOOLS</span><span className="agent agent-c">REVIEW</span><span className="agent agent-d">LOCAL LLM</span></div>,
};

export default function ProjectCard({ project, expanded, onToggle }) {
  return (
    <article className={`project-card project-${project.accent} ${expanded ? 'project-expanded' : ''}`}>
      <button className="project-hit-area" onClick={onToggle} aria-expanded={expanded} aria-label={`${expanded ? 'Collapse' : 'Expand'} ${project.title} project details`}>
        <div className="project-topline"><span>{project.number} / {project.label}</span><span className="project-open-icon"><ArrowUpRight size={16} /></span></div>
        <div className="project-visual" aria-hidden="true">{visuals[project.visual]}</div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-more">{expanded ? 'DETAILS OPEN' : 'EXPLORE CONCEPT'} <ArrowDownRight size={13} /></div>
      </button>
      {expanded && (
        <div className="project-detail">
          <div className="detail-state"><Activity size={14} /> CONCEPT PREVIEW <span>·</span> SOURCE NOT PUBLISHED</div>
          <p>This project concept is not yet available as a public repository or live demo. In the meantime, explore the published work below.</p>
          <a href="https://github.com/jithinseemakurthi?tab=repositories">Browse published repos <ArrowUpRight size={13} /></a>
        </div>
      )}
    </article>
  );
}
