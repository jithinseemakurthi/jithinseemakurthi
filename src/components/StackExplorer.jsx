import { useState } from 'react';
import { ArrowUpRight, Check, Terminal } from 'lucide-react';
import LazyHeroScene from './LazyHeroScene.jsx';
import { allSkills, skillGroups } from '../data.js';

export default function StackExplorer() {
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].id);
  const [showAll, setShowAll] = useState(false);
  const active = skillGroups.find((group) => group.id === activeGroup);

  return (
    <section className="stack-section section-shell" id="stack">
      <div className="section-heading">
        <div><p className="eyebrow">02 / CAPABILITIES</p><h2>One stack.<br /><span className="gradient-text">Many dimensions.</span></h2></div>
        <p>My favorite work lives at the boundaries—connecting an interface to a model, or a model to the real world.</p>
      </div>
      <div className="stack-console">
        <div className="stack-visual">
          <div className="stack-visual-bar"><span><i className="live-dot" /> INTERACTIVE SKILL MAP</span><span>CLICK A NODE TO FILTER</span></div>
          <LazyHeroScene activeGroup={activeGroup} onSelect={setActiveGroup} />
          <div className="stack-axis"><span>FRONTEND</span><span>INTELLIGENCE</span><span>HARDWARE</span></div>
        </div>
        <div className="stack-terminal">
          <div className="terminal-title"><Terminal size={14} /><span>jithin://capabilities</span><span className="terminal-state">CONNECTED</span></div>
          <div className="terminal-tabs" role="tablist" aria-label="Capability category">
            {skillGroups.map((group) => <button key={group.id} role="tab" aria-selected={activeGroup === group.id} className={activeGroup === group.id ? 'tab-active' : ''} onClick={() => setActiveGroup(group.id)}>{group.name}</button>)}
          </div>
          <div className="terminal-body" role="tabpanel" key={activeGroup}>
            <p className="terminal-prompt"><span>➜</span> loading {active.id} stack<span className="blink-cursor">_</span></p>
            <p className="terminal-eyebrow">{active.eyebrow}</p>
            <div className="skill-cloud">{active.skills.map((skill) => <span key={skill}><Check size={11} /> {skill}</span>)}</div>
          </div>
          <button className="all-skills-toggle" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? 'Hide full toolkit' : 'View full toolkit'} <ArrowUpRight size={13} /></button>
          {showAll && <div className="all-skills-list">{allSkills.map((skill) => <span key={skill}>{skill}</span>)}</div>}
        </div>
      </div>
    </section>
  );
}
