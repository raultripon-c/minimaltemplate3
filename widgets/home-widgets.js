import { benefits, careerAreas, events, evpPillars, jobs, locations, pathways, stories } from "../data/site-data.js";
import { accordion, badge, button, jobCard, jobsList, sectionHeader, simpleCard } from "../components/common.js";

export function heroSearchWidget() {
  return `
    <section class="hero" id="top">
      <div class="container hero__grid">
        <div>
          <p class="eyebrow">Find Work That Feels Possible</p>
          <h1 class="phw-g-h1-primary">Build a career where your next step is clear, supported, and worth it.</h1>
          <p class="hero__copy">Explore roles, teams, schedules, and growth paths with enough detail to decide whether this is a place for someone like you.</p>
          <div class="hero__proof" aria-label="Candidate trust signals">
            ${["Clear hiring process", "Growth pathways", "Flexible role options", "People-first teams"].map((item) => `<span class="proof-chip">${item}</span>`).join("")}
          </div>
          <form class="smart-search" action="pages/search-results.html" aria-label="Job search">
            <div class="smart-search__grid">
              <div class="field"><label for="hero-keyword">Keyword</label><input id="hero-keyword" name="q" type="search" placeholder="Role, skill, or team"></div>
              <div class="field"><label for="hero-location">Location</label><input id="hero-location" name="location" type="search" placeholder="Region, remote, or hybrid"></div>
              <div class="field"><label for="hero-category">Career Area</label><select id="hero-category" name="category"><option>Any career area</option><option>Frontline</option><option>Technology</option><option>Healthcare</option><option>Operations</option></select></div>
              <button class="btn btn--primary" type="submit">Search Jobs</button>
            </div>
          </form>
        </div>
        <aside class="hero-card" aria-label="Employer brand preview">
          <div class="hero-card__visual">
            <p class="eyebrow">Inside The Experience</p>
            <div class="people-stack">
              <div class="person-tile"><strong>Mentorship</strong><br>First-month coaching and manager check-ins.</div>
              <div class="person-tile"><strong>Belonging</strong><br>Teams explain routines before you apply.</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  `;
}

export function candidatePathwaysWidget() {
  return `
    <section class="section">
      <div class="container">
        ${sectionHeader("Candidate Pathways", "Start where you see yourself.", "Role families are written for fast self-identification, not internal org charts.")}
        <div class="grid grid--4">${pathways.map((item, i) => simpleCard(item, ["F", "C", "T", "H", "O", "L", "S", "R"][i])).join("")}</div>
      </div>
    </section>
  `;
}

export function featuredJobsWidget() {
  const tabs = ["Featured", "Recently Added", "Remote", "Full-Time", "Part-Time", "Urgent Hiring"];
  return `
    <section class="section section--soft" id="featured-jobs">
      <div class="container feature-layout">
        <div>
          <p class="eyebrow">Fast Job Discovery</p>
          <h2 class="phw-g-h2-dark">Compare promising roles without losing momentum.</h2>
          <p class="section-lede">Each card shows schedule, location, compensation placeholders, and trust cues before the candidate commits to a detail page.</p>
          ${button("View all jobs", "pages/search-results.html", "primary")}
        </div>
        <div>
          <div class="tabs" role="tablist" aria-label="Featured job categories">${tabs.map((tab, index) => `<button class="tab" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" data-tab-filter="${tab}">${tab}</button>`).join("")}</div>
          ${jobsList(jobs.slice(0, 4))}
        </div>
      </div>
    </section>
  `;
}

export function evpWidget() {
  return `
    <section class="section section--inverse">
      <div class="container">
        ${sectionHeader("Why Work Here", "Support you can actually evaluate.", "Proof near conversion reduces anxiety: candidates see what support, growth, and wellbeing mean before applying.")}
        <div class="grid grid--3">${evpPillars.map((item, i) => simpleCard(item, ["↗", "◎", "⏱", "◆", "✦", "♥", "∴", "✓", "＋"][i])).join("")}</div>
        <div class="metric-row">
          <div class="metric"><strong>30</strong><span>day onboarding clarity</span></div>
          <div class="metric"><strong>4</strong><span>growth conversations per year</span></div>
          <div class="metric"><strong>1</strong><span>candidate-friendly apply path</span></div>
        </div>
      </div>
    </section>
  `;
}

export function careerAreasWidget() {
  return `
    <section class="section">
      <div class="container">
        ${sectionHeader("Career Areas", "Explore by work style, not just department.", "Candidates can scan impact, pace, growth, and environment cues before they browse jobs.")}
        <div class="grid grid--3">${careerAreas.map((area) => simpleCard([area[0], area[1], `${area[2]} · ${area[3]}`, "Explore roles"], "◆")).join("")}</div>
      </div>
    </section>
  `;
}

export function locationsWidget() {
  return `
    <section class="section section--soft">
      <div class="container split-panel">
        <div>
          ${sectionHeader("Location Discovery", "Find roles around how your life works.", "Searchable regions, remote eligibility, commute cues, and flexibility indicators make location decisions clearer.")}
          <div class="grid">${locations.map((location) => simpleCard([location[0], location[1], "", "View opportunities"], "⌖")).join("")}</div>
        </div>
        <div class="location-map" aria-label="Map inspired location discovery panel">
          <p class="eyebrow">Map-aware layout</p>
          <h3>Regional opportunity clusters</h3>
          <p>Use this module as a placeholder for maps, commute estimates, region cards, or location recommendation logic.</p>
        </div>
      </div>
    </section>
  `;
}

export function storiesWidget() {
  return `
    <section class="section">
      <div class="container">
        ${sectionHeader("Employee Stories", "Realistic stories that reduce the unknown.", "Narratives show belonging, growth, and team support through practical moments rather than inflated claims.")}
        <div class="story-slider">
          <div class="story-track" aria-label="Employee stories">
            ${stories.map((story) => `
              <article class="card story-card">
                <div class="portrait">${story.initials}</div>
                <p class="eyebrow">${story.role}</p>
                <h3>${story.name}'s path</h3>
                <p>“${story.quote}”</p>
                <p>${story.detail}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function benefitsWidget() {
  return `
    <section class="section section--soft">
      <div class="container split-panel">
        <div>
          <p class="eyebrow">Benefits & Rewards</p>
          <h2 class="phw-g-h2-dark">Support details candidates can skim and trust.</h2>
          <p class="section-lede">Expandable content keeps the page calm while giving motivated candidates enough detail to make a confident decision.</p>
          ${button("Explore benefits", "pages/benefits.html", "primary")}
        </div>
        ${accordion(benefits)}
      </div>
    </section>
  `;
}

export function cultureWidget() {
  return `
    <section class="section">
      <div class="container split-panel">
        <div>
          ${sectionHeader("Culture & Belonging", "Respect shows up in daily routines.", "The strongest culture proof is behavioral: clear huddles, manager availability, inclusive feedback, and support when work gets complex.")}
          <div class="grid grid--2">
            ${["Team agreements clarify how people communicate.", "Managers check in before small issues become big ones.", "New employees learn where to ask for help.", "Different work styles are respected through practical norms."].map((copy) => simpleCard(["Practical proof", copy], "✓")).join("")}
          </div>
        </div>
        <div class="card">
          <p class="eyebrow">Trust Cue</p>
          <h3>What candidates learn before applying</h3>
          <p>How teams collaborate, who supports onboarding, what flexibility means by role, and how success is measured after the first month.</p>
        </div>
      </div>
    </section>
  `;
}

export function growthWidget() {
  const steps = [
    ["Month 1", "Learn the role, meet your support network, and understand what good work looks like."],
    ["Months 2-6", "Build confidence through coaching, feedback, and visible skill milestones."],
    ["Year 1", "Explore adjacent roles, mentorship, certifications, or leadership readiness."],
    ["Next Step", "Move into specialist, lead, manager, or cross-functional pathways when ready."]
  ];
  return `
    <section class="section section--inverse">
      <div class="container split-panel">
        <div>
          <p class="eyebrow">Career Growth Pathways</p>
          <h2>See a future before you apply.</h2>
          <p class="section-lede">Progression cues help candidates imagine staying, learning, and becoming more valuable over time.</p>
        </div>
        <div class="timeline">${steps.map(([time, copy]) => `<div class="timeline__item"><strong>${time}</strong><span>${copy}</span></div>`).join("")}</div>
      </div>
    </section>
  `;
}

export function eventsWidget() {
  return `
    <section class="section">
      <div class="container">
        ${sectionHeader("Hiring Events", "Low-pressure ways to learn more.", "Events help passive candidates ask practical questions before they apply.")}
        <div class="grid grid--4">${events.map(([date, title, type, focus, copy]) => `
          <article class="card">
            ${badge(type, type === "Virtual" ? "success" : "warning")}
            <p class="eyebrow">${date} · ${focus}</p>
            <h3>${title}</h3>
            <p>${copy}</p>
            ${button("Register", "pages/events.html", "secondary", "btn--small")}
          </article>
        `).join("")}</div>
      </div>
    </section>
  `;
}

export function talentCommunityWidget() {
  return `
    <section class="section section--soft">
      <div class="container split-panel">
        <div>
          <p class="eyebrow">Talent Community</p>
          <h2 class="phw-g-h2-dark">Not ready to apply? Keep the door open.</h2>
          <p class="section-lede">A lightweight form supports passive candidates with role alerts, event invites, and practical career guidance.</p>
        </div>
        <form class="card" data-community-form>
          <div class="form-grid">
            <div class="field"><label for="tc-name">Name</label><input id="tc-name" required autocomplete="name"></div>
            <div class="field"><label for="tc-email">Email</label><input id="tc-email" type="email" required autocomplete="email"></div>
            <div class="field"><label for="tc-interest">Career Interest</label><select id="tc-interest"><option>Technology & Data</option><option>Frontline</option><option>Operations</option><option>Care & Wellness</option></select></div>
            <div class="field"><label for="tc-location">Location Interest</label><select id="tc-location"><option>Remote Eligible</option><option>North Region</option><option>Central Region</option><option>East Region</option></select></div>
            <div class="field field--full"><label><input type="checkbox" required> I agree to receive career updates and understand I can opt out.</label></div>
          </div>
          <button class="btn btn--primary" type="submit">Join Talent Community</button>
          <p class="success-message" role="status">Thanks. Your preferences are saved for this demo experience.</p>
        </form>
      </div>
    </section>
  `;
}

export function footerWidget() {
  return "";
}

export const homeWidgets = [
  heroSearchWidget,
  candidatePathwaysWidget,
  featuredJobsWidget,
  evpWidget,
  careerAreasWidget,
  locationsWidget,
  storiesWidget,
  benefitsWidget,
  cultureWidget,
  growthWidget,
  eventsWidget,
  talentCommunityWidget
];
