import { benefits, careerAreas, events, jobs, locations, stories } from "../data/site-data.js";
import { accordion, badge, button, jobCard, jobsList, pageHero, sectionHeader, simpleCard } from "../components/common.js";
import { benefitsWidget, careerAreasWidget, eventsWidget, growthWidget, locationsWidget, storiesWidget, talentCommunityWidget } from "../widgets/home-widgets.js";

const asset = (file) => `${window.location.pathname.includes("/pages/") ? "../" : ""}assets/illustrations/${file}`;
const svgIcon = (paths) => `<svg viewBox="0 0 48 48" aria-hidden="true">${paths}</svg>`;
const pageIcons = {
  culture: svgIcon(`<path d="M14 16h20M14 24h14M14 32h20"/><path d="M9 10h30v28H9V10Z"/>`),
  curiosity: svgIcon(`<path d="M24 8v8M24 32v8M12.7 12.7l5.6 5.6M29.7 29.7l5.6 5.6M8 24h8M32 24h8M12.7 35.3l5.6-5.6M29.7 18.3l5.6-5.6"/>`),
  care: svgIcon(`<path d="M24 38s-12-7-12-17a7 7 0 0 1 12-5 7 7 0 0 1 12 5c0 10-12 17-12 17Z"/>`),
  voice: svgIcon(`<path d="M12 14h24v16H22l-7 6v-6h-3V14Z"/><path d="M18 21h12M18 26h8"/>`),
  purpose: svgIcon(`<path d="M24 8v32M12 15h24l-4 7 4 7H12"/>`),
  progress: svgIcon(`<path d="M11 34h26M15 30l7-7 5 5 9-12"/><path d="M31 16h5v5"/>`),
  huddle: svgIcon(`<circle cx="17" cy="18" r="5"/><circle cx="31" cy="18" r="5"/><path d="M9 36c2-8 14-8 16 0M23 36c2-8 14-8 16 0"/>`),
  mentorship: svgIcon(`<path d="M14 34c1-6 10-6 12 0M26 34c1-6 9-6 10 0"/><circle cx="20" cy="18" r="5"/><circle cx="31" cy="19" r="4"/><path d="M28 10l5 4 5-4"/>`),
  collaboration: svgIcon(`<path d="M13 24h10l4 6h8M35 18H25l-4-6h-8"/><path d="m31 15 4 3-4 3M17 27l-4-3 4-3"/>`),
  recognition: svgIcon(`<path d="M24 8 28 18l10 1-8 7 3 10-9-5-9 5 3-10-8-7 10-1 4-10Z"/>`),
  learning: svgIcon(`<path d="M12 14h16c4 0 8 3 8 7v13H18c-3 0-6-3-6-6V14Z"/><path d="M18 20h12M18 26h10"/>`),
  community: svgIcon(`<circle cx="24" cy="17" r="5"/><path d="M13 36c2-7 20-7 22 0"/><path d="M9 27c2-4 5-6 9-6M39 27c-2-4-5-6-9-6"/>`),
  health: svgIcon(`<path d="M24 8c6 0 11 5 11 11 0 10-11 21-11 21S13 29 13 19c0-6 5-11 11-11Z"/><path d="M24 15v10M19 20h10"/>`),
  time: svgIcon(`<circle cx="24" cy="24" r="14"/><path d="M24 15v10l7 4"/>`),
  flexibility: svgIcon(`<path d="M11 24c5-8 12-8 17 0 3 5 6 5 9 0"/><path d="M13 32h22M18 14v20"/>`),
  finance: svgIcon(`<path d="M13 17h22v18H13V17Z"/><path d="M18 17v-5h12v5M19 26h10M19 31h6"/>`),
  family: svgIcon(`<circle cx="18" cy="18" r="5"/><circle cx="31" cy="20" r="4"/><path d="M9 36c2-8 16-8 18 0M26 36c1-5 9-5 11 0"/>`),
  perks: svgIcon(`<path d="M14 20h20v18H14V20Z"/><path d="M24 20v18M12 20h24M18 20c-5-4-1-10 6 0M30 20c5-4 1-10-6 0"/>`),
  internship: svgIcon(`<path d="M12 16h24v20H12V16Z"/><path d="M18 16v-4h12v4M18 24h12M18 30h8"/>`),
  apprenticeship: svgIcon(`<path d="m14 31 12-12 5 5-12 12h-5v-5Z"/><path d="m28 17 3-3 5 5-3 3"/>`),
  graduate: svgIcon(`<path d="M24 10 9 18l15 8 15-8-15-8Z"/><path d="M15 22v8c5 4 13 4 18 0v-8"/>`),
  entry: svgIcon(`<path d="M13 36V12h14l8 8v16H13Z"/><path d="M27 12v8h8M18 28h12"/>`),
  rotation: svgIcon(`<path d="M15 18a12 12 0 0 1 19-3l3 3"/><path d="M37 10v8h-8M33 30a12 12 0 0 1-19 3l-3-3"/><path d="M11 38v-8h8"/>`),
  skill: svgIcon(`<path d="M14 33 33 14M18 14h16v16M13 20l5 5M23 30l5 5"/>`),
  location: svgIcon(`<path d="M24 8c6 0 11 5 11 11 0 9-11 21-11 21S13 28 13 19c0-6 5-11 11-11Z"/><circle cx="24" cy="19" r="4"/>`),
  remote: svgIcon(`<path d="M10 15h28v18H10V15Z"/><path d="M18 39h12M24 33v6"/><path d="M18 24h12"/>`),
  frontline: svgIcon(`<path d="M16 33c0-6 16-6 16 0"/><circle cx="24" cy="18" r="6"/><path d="M9 35c1-5 5-8 10-8M39 35c-1-5-5-8-10-8"/>`),
  corporate: svgIcon(`<path d="M15 17h18v19H15V17Z"/><path d="M20 17v-5h8v5M15 24h18M21 29h2M25 29h2"/>`),
  technology: svgIcon(`<path d="m18 16-7 8 7 8M30 16l7 8-7 8M27 13l-6 22"/>`),
  operations: svgIcon(`<path d="M10 18h12l4 6h12M10 30h10l4-6h14"/><path d="m34 15 4 3-4 3M34 27l4 3-4 3"/>`),
  leadership: svgIcon(`<path d="M12 34c0-7 10-7 10 0M26 34c0-7 10-7 10 0"/><circle cx="17" cy="19" r="5"/><circle cx="31" cy="19" r="5"/><path d="M24 9v8M20 13h8"/>`),
  growth: svgIcon(`<path d="M11 34h26M15 30l7-7 5 5 9-12"/><path d="M31 16h5v5"/>`),
  belonging: svgIcon(`<circle cx="24" cy="16" r="6"/><path d="M13 37c2-8 20-8 22 0"/><path d="M9 27c2-4 5-6 9-6M39 27c-2-4-5-6-9-6"/>`),
  early: svgIcon(`<path d="M12 14h16c4 0 8 3 8 7v13H18c-3 0-6-3-6-6V14Z"/><path d="M18 20h12M18 26h10M36 21l3-3 3 3"/>`)
};
const iconAt = (icons) => (_title, _copy, _meta, index) => icons[index] || icons[0];

const sectionIntro = (eyebrow, title, copy = "") => `
  <div class="page-section-intro">
    <p class="eyebrow">${eyebrow}</p>
    <h2>${title}</h2>
    ${copy ? `<p>${copy}</p>` : ""}
  </div>
`;

const cardGrid = (items, icon = pageIcons.progress, className = "grid grid--3") => `
  <div class="${className}">
    ${items.map(([title, copy, meta], index) => `
      <article class="card">
        <div class="card__icon">${typeof icon === "function" ? icon(title, copy, meta, index) : icon}</div>
        <h3>${title}</h3>
        ${meta ? `<p><strong>${meta}</strong></p>` : ""}
        <p>${copy}</p>
      </article>
    `).join("")}
  </div>
`;

const proofBar = (items) => `
  <section class="section section--inverse page-proof-section">
    <div class="container page-proof-bar">
      ${items.map((item) => `<span>✓ ${item}</span>`).join("")}
    </div>
  </section>
`;

const closingCta = ({ title, copy = "", primary, secondary = "" }) => `
  <section class="section page-closing-cta">
    <div class="container page-closing-cta__inner">
      <div>
        <h2>${title}</h2>
        ${copy ? `<p>${copy}</p>` : ""}
      </div>
      <div class="page-cta-actions">
        ${primary}
        ${secondary}
      </div>
    </div>
  </section>
`;

const imageFeature = ({ eyebrow, title, copy, image, imageAlt, reverse = false, theme = "" }) => `
  <section class="section ${theme === "inverse" ? "section--inverse" : reverse ? "section--soft" : ""}">
    <div class="container page-image-feature ${reverse ? "page-image-feature--reverse" : ""}">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h2 class="phw-g-h2-dark">${title}</h2>
        <p class="section-lede">${copy}</p>
      </div>
      <div class="visual-panel">
        <img src="${asset(image)}" alt="${imageAlt}">
      </div>
    </div>
  </section>
`;

const chipList = (items, className = "page-chip-list") => `
  <div class="${className}">
    ${items.map((item, index) => `<button class="tab ${index === 0 ? "is-active" : ""}" type="button">${item}</button>`).join("")}
  </div>
`;

export function searchResultsPage() {
  const filters = [
    ["Country", ["Remote Eligible", "Multiple Regions"], false],
    ["State", ["Central Region Hub", "Northwest Service Center", "East Region Campus", "Southwest Operations Center"], true],
    ["City", ["Remote Eligible", "Multiple Regions"], false],
    ["Category", ["Frontline", "Corporate", "Technology", "Healthcare", "Operations", "Students"], false],
    ["Type", ["Full-Time", "Part-Time", "Remote", "Hybrid", "On-site"], false]
  ];
  const matchSignals = ["Jobs that fit you", "Save time applying", "Match by interest"];

  return `
    <section class="page-hero page-hero--inverse search-hero">
      <div class="container search-hero__inner">
        <p class="eyebrow">Search Jobs</p>
        <h1 class="phw-g-h1-primary">Find the role that fits your goals and your life.</h1>
        <p class="section-lede">Use focused filters and clear role details to compare opportunities with confidence.</p>
        <form class="smart-search search-hero__form" action="search-results.html" aria-label="Search open jobs">
          <div class="smart-search__grid">
            <div class="field"><label for="hero-search-keyword">Keyword</label><input id="hero-search-keyword" name="q" type="search" placeholder="Role, skill, or team"></div>
            <div class="field"><label for="hero-search-location">Location</label><input id="hero-search-location" name="location" type="search" placeholder="Region, remote, or hybrid"></div>
            <button class="btn btn--primary" type="submit">Search Jobs</button>
          </div>
        </form>
      </div>
    </section>
    <main class="section" id="results">
      <div class="container filter-shell">
        <aside class="filters search-sidebar" aria-label="Job filters">
          <section class="search-alert-card" aria-label="Search alert">
            <div>
              <h2>Set Alert For This Search</h2>
              <a href="talent-community.html">Manage Alerts</a>
            </div>
            <button class="search-alert-card__toggle" type="button" aria-pressed="true" aria-label="Turn search alert off">
              <span aria-hidden="true">x</span>
            </button>
          </section>
          <section class="filter-card" aria-label="Filter jobs">
            <div class="filter-card__header">
              <h2>Filter By</h2>
              <button type="button" data-clear-filters>Clear Filters</button>
            </div>
            <div class="field"><label for="search-keyword">Search</label><input id="search-keyword" data-search-input type="search" placeholder="Keyword or team"></div>
            ${filters.map(([group, values, isOpen], index) => `
              <fieldset class="checkbox-list filter-group ${isOpen ? "is-open" : ""}" data-filter-group="${group}">
                <legend>
                  <button type="button" data-filter-toggle aria-expanded="${isOpen ? "true" : "false"}" aria-controls="filter-panel-${index}">
                    <span>${group}</span><span aria-hidden="true">${isOpen ? "x" : "+"}</span>
                  </button>
                </legend>
                <div class="filter-group__panel" id="filter-panel-${index}" ${isOpen ? "" : "hidden"}>
                  ${values.map((value) => `<label><input type="checkbox" value="${value}" data-filter-value> ${value}</label>`).join("")}
                </div>
              </fieldset>
            `).join("")}
          </section>
          <section class="sidebar-match-card" aria-label="Personalized job match">
            <h2>Discover roles that fit how you work.</h2>
            <div class="sidebar-match-card__signals">
              ${matchSignals.map((signal) => `<span>✓ ${signal}</span>`).join("")}
            </div>
            <button class="btn btn--secondary btn--small" type="button" data-job-match-open aria-haspopup="dialog">Start matching →</button>
          </section>
        </aside>
        <section aria-live="polite">
          <div class="results-toolbar">
            <p><strong data-result-count>${jobs.length}</strong> of <strong>${jobs.length}</strong> results</p>
            <label class="results-sort">
              <span>Sort by:</span>
              <select aria-label="Sort job results">
                <option>Relevance</option>
                <option>Newest</option>
                <option>Location</option>
                <option>Job Title</option>
              </select>
            </label>
          </div>
          ${jobsList(jobs, true)}
          <section class="section--tight related-paths-widget">
            ${sectionHeader("Related Paths", "Keep exploring.", "Your experience may fit more than one kind of team.")}
            <div class="grid grid--3">${careerAreas.slice(0, 3).map((area, index) => simpleCard([area[0], area[1], area[2], "See related jobs"], [pageIcons.frontline, pageIcons.corporate, pageIcons.technology][index])).join("")}</div>
          </section>
        </section>
      </div>
    </main>
  `;
}

export function jobDescriptionPage() {
  const job = jobs[0];
  const overview = [
    "In this role, you will help people get clear answers, feel welcomed, and move through each interaction with confidence. You will work closely with teammates who share priorities, coach through new situations, and keep daily work organized.",
    "The work is practical, people-centered, and supported by clear routines. You will have space to learn role-specific systems, ask questions, and build confidence through guided practice."
  ];
  const responsibilities = [
    "Welcome people with clear information and warm follow-through.",
    "Use team routines to escalate questions and improve experiences.",
    "Partner with peers to keep daily work predictable and respectful.",
    "Learn role-specific systems through guided practice."
  ];
  const dayRhythm = [
    ["Start", "Review priorities, confirm support needs, and prepare for the day."],
    ["Midday", "Handle questions, document patterns, and escalate when needed."],
    ["Wrap", "Share handoff notes and prepare for what comes next."]
  ];
  const mustHave = ["Clear, patient communication.", "Reliable follow-through.", "Comfort learning basic digital tools."];
  const preferred = ["Service, support, operations, care, retail, hospitality, or community experience.", "Interest in coaching, process improvement, or leadership."];
  const similarJobs = jobs.slice(1, 4);

  return `
    ${pageHero({
      eyebrow: "Job Description",
      title: job.title,
      copy: `${job.department} · ${job.location} · ${job.schedule} · ${job.compensation}`,
      action: button("Apply now →", "#apply", "secondary") + button("Save Job", "#", "ghost"),
      theme: "inverse",
      layout: "job-detail",
      tags: job.tags
    })}
    <main>
      <section class="section">
        <div class="container job-detail-layout">
          <article class="job-detail-content">
            <nav class="job-detail-breadcrumb" aria-label="Breadcrumb">
              <a href="search-results.html">Search Jobs</a>
              <span aria-hidden="true">/</span>
              <span>${job.title}</span>
            </nav>
            <section class="job-detail-section">
              <p class="eyebrow">Description</p>
              <h2 class="phw-g-h2-dark">Know what you are stepping into.</h2>
              ${overview.map((paragraph) => `<p>${paragraph}</p>`).join("")}
            </section>
            <section class="job-detail-section">
              <h2>Responsibilities</h2>
              <ul>${responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul>
            </section>
            <section class="job-detail-section">
              <h2>Day in the life</h2>
              <ul>${dayRhythm.map(([title, copy]) => `<li><strong>${title}:</strong> ${copy}</li>`).join("")}</ul>
            </section>
            <section class="job-detail-section">
              <h2>Qualifications</h2>
              <h3>Must have</h3>
              <ul>${mustHave.map((item) => `<li>${item}</li>`).join("")}</ul>
              <h3>Preferred</h3>
              <ul>${preferred.map((item) => `<li>${item}</li>`).join("")}</ul>
            </section>
            <section class="job-detail-section">
              <h2>Benefits and support</h2>
              <ul>${["Health, PTO, learning, and wellbeing support", "Clear onboarding and guided practice", "Team routines that make support easy to find", "Growth paths for future opportunities"].map((item) => `<li>${item}</li>`).join("")}</ul>
            </section>
            <section class="job-detail-section">
              <h2>Team introductions</h2>
              <p>See how support, coaching, and collaboration show up around the work.</p>
              <ul>${stories.map((story) => `<li><strong>${story.name}, ${story.role}:</strong> “${story.quote}”</li>`).join("")}</ul>
            </section>
          </article>
          <aside class="job-detail-sidebar" aria-label="Job actions and related jobs">
            <section class="job-detail-widget job-alert-widget" id="apply">
              <h2>Get similar roles by email.</h2>
              <p>Stay close to new opportunities that match this path.</p>
              <div class="field">
                <label for="similar-role-email">Email address</label>
                <input id="similar-role-email" type="email" autocomplete="email" placeholder="you@example.com">
              </div>
              ${button("Join Talent Community", "talent-community.html", "secondary", "btn--small")}
            </section>
            <section class="job-detail-widget">
              <h2>Quick facts</h2>
              <dl class="job-facts-list">
                <div><dt>Department</dt><dd>${job.department}</dd></div>
                <div><dt>Schedule</dt><dd>${job.schedule} · ${job.shift}</dd></div>
                <div><dt>Location</dt><dd>${job.location} · ${job.workType}</dd></div>
                <div><dt>Compensation</dt><dd>${job.compensation}</dd></div>
              </dl>
            </section>
            <section class="job-detail-widget sidebar-match-card">
              <h2>Discover roles that fit how you work.</h2>
              <div class="sidebar-match-card__signals">
                <span>✓ Match by interest</span>
                <span>✓ Compare nearby roles</span>
                <span>✓ Save time applying</span>
              </div>
              <button class="btn btn--secondary btn--small" type="button" data-job-match-open aria-haspopup="dialog">Start matching →</button>
            </section>
            <section class="job-detail-widget">
              <h2>Similar jobs</h2>
              <div class="similar-job-list">
                ${similarJobs.map((item) => `
                  <article class="similar-job-card">
                    <p class="eyebrow">${item.department}</p>
                    <h3><a href="job-description.html?job=${item.id}">${item.title}</a></h3>
                    <p>${item.location} · ${item.schedule}</p>
                    ${button("Apply now →", "job-description.html", "primary", "btn--small")}
                  </article>
                `).join("")}
              </div>
              <a class="card__link" href="search-results.html">View all jobs <span aria-hidden="true">→</span></a>
            </section>
          </aside>
        </div>
      </section>
    </main>
  `;
}

export function lifePage() {
  const principles = [
    ["We support each other", "Trust grows through helpful feedback, shared accountability, and everyday care."],
    ["We grow through curiosity", "Questions and new perspectives help teams learn, improve, and keep moving."],
    ["We lead with care", "Care shapes how we serve, collaborate, and make decisions."],
    ["We make room for every voice", "Different experiences and perspectives help teams reach better outcomes."],
    ["We move with purpose", "Clear priorities connect daily work to a larger mission."],
    ["We celebrate progress", "We recognize effort, improvement, and moments that move teams forward."]
  ];
  const moments = [
    ["Team huddles", "Quick moments to align, share priorities, and start the day with clarity."],
    ["Mentorship conversations", "Guidance from people who understand the work and want to help others grow."],
    ["Flexible collaboration", "Teams work together in ways that support different roles, schedules, and work styles."],
    ["Recognition moments", "Progress, effort, and contribution are noticed and celebrated."],
    ["Learning sessions", "Opportunities to build skills, ask questions, and prepare for what comes next."],
    ["Community impact", "Work connects to people, places, and communities beyond the walls of the organization."]
  ];
  const belonging = ["Respect in every interaction", "Accessible communication", "Supportive team norms", "Space for different perspectives"];

  return `
    ${pageHero({
      eyebrow: "Life & Culture",
      title: "Bring your whole self to meaningful work.",
      copy: "Explore a workplace built around trust, purpose, everyday support, and belonging.",
      action: button("Explore career areas", "career-areas.html", "primary") + button("Search open roles", "search-results.html", "secondary"),
      image: asset("page-life-culture-team.png"),
      imageAlt: "Coworkers talking together in a warm modern workplace"
    })}
    <main>
      <section class="section">
        <div class="container">
          ${sectionIntro("Culture Principles", "How we work together", "Culture is shaped by how teams communicate, support people, welcome ideas, and recognize progress.")}
          ${cardGrid(principles, iconAt([pageIcons.community, pageIcons.curiosity, pageIcons.care, pageIcons.voice, pageIcons.purpose, pageIcons.progress]))}
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container page-story-feature">
          <div class="visual-panel"><img src="${asset("story-jordan-care-support.png")}" alt="Jordan, a team lead, in a bright workplace"></div>
          <article>
            <p class="eyebrow">Employee Story</p>
            <h2>Real growth starts with feeling supported.</h2>
            <blockquote>“People made space for my ideas early. That trust gave me confidence to grow.”</blockquote>
            <p>Jordan joined for stability and room to learn. Supportive teammates helped Jordan grow into leadership.</p>
            <footer><strong>Jordan</strong><span>Team Lead</span></footer>
            ${button("Explore open roles", "search-results.html", "primary")}
          </article>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${sectionIntro("Everyday Culture Grid", "Culture shows up in the everyday.")}
          ${cardGrid(moments, iconAt([pageIcons.huddle, pageIcons.mentorship, pageIcons.collaboration, pageIcons.recognition, pageIcons.learning, pageIcons.community]))}
        </div>
      </section>
      <section class="section section--soft">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">Belonging & Inclusion</p>
            <h2 class="phw-g-h2-dark">Belonging shows up in the everyday moments.</h2>
            <p class="section-lede">Belonging is built through respect, accessible information, open perspectives, and space to contribute.</p>
          </div>
          <div class="grid grid--2">${belonging.map((item, index) => simpleCard([item, "Practical habits help people feel respected and ready to contribute."], [pageIcons.care, pageIcons.voice, pageIcons.community, pageIcons.belonging][index] || pageIcons.community)).join("")}</div>
        </div>
      </section>
      ${proofBar(["Multiple career pathways", "Flexible team environments", "Ongoing learning support", "Employee-led communities"])}
      ${closingCta({
        title: "Find the team where you can do your best work.",
        copy: "Explore opportunities shaped around purpose, growth, and the people who make work meaningful.",
        primary: button("Explore career areas", "career-areas.html", "primary"),
        secondary: button("Search jobs", "search-results.html", "secondary")
      })}
    </main>
  `;
}

export function benefitsPage() {
  const benefitCards = [
    ["Health & Care", "Programs that support physical, mental, and everyday wellbeing."],
    ["Time Away", "Time to rest, recharge, handle personal priorities, and return with focus."],
    ["Flexibility", "Work arrangements and scheduling options vary by role, team, and location."],
    ["Financial Wellbeing", "Resources and programs designed to support long-term financial confidence."],
    ["Learning & Growth", "Opportunities to build skills, explore new paths, and prepare for what comes next."],
    ["Family Support", "Resources that help employees support the people who matter most."],
    ["Recognition", "Programs and everyday moments that celebrate contribution and progress."],
    ["Everyday Perks", "Practical extras that make work feel more supportive and rewarding."]
  ];
  const learning = [
    ["Learning resources", "Practical tools that help people build skills with confidence."],
    ["Mentorship", "Guidance from people who understand the work and want to help others grow."],
    ["Internal mobility", "Visibility into adjacent paths, skill needs, and future opportunities."],
    ["Leadership development", "Support for people preparing to guide teams and shape outcomes."]
  ];
  const faq = [
    ["When do benefits start?", "Timing can vary by role, location, and employment type. Details are shared during hiring."],
    ["Do benefits vary by role or location?", "Yes. Some benefits may vary based on role type, schedule, location, and local requirements."],
    ["Are flexible work options available?", "Flexible options may be available depending on the role, team, and business needs."],
    ["Is learning support available?", "Yes. Support may include learning resources, development conversations, mentorship, and growth opportunities."],
    ["Are wellbeing resources available?", "Wellbeing support may include resources for physical, mental, emotional, and financial health depending on eligibility."],
    ["Can I learn more during the interview process?", "Yes. Candidates are encouraged to ask about benefits, flexibility, team expectations, and growth."]
  ];

  return `
    ${pageHero({
      eyebrow: "Benefits & Wellbeing",
      title: "Support for your work, life, and future.",
      copy: "Explore support for wellbeing, growth, financial confidence, and practical flexibility.",
      action: button("View open roles", "search-results.html", "primary") + button("Join talent community", "talent-community.html", "secondary"),
      image: asset("page-benefits-wellbeing-calm.png"),
      imageAlt: "Colleagues taking a calm wellbeing break in a bright workplace"
    })}
    <main>
      <section class="section">
        <div class="container">
          ${sectionIntro("Benefits Categories", "Support that meets people where they are.", "Different moments call for different support across life, work, family, and future goals.")}
          ${cardGrid(benefitCards, iconAt([pageIcons.health, pageIcons.time, pageIcons.flexibility, pageIcons.finance, pageIcons.learning, pageIcons.family, pageIcons.recognition, pageIcons.perks]), "grid grid--4")}
        </div>
      </section>
      ${imageFeature({
        eyebrow: "Wellbeing Feature",
        title: "Wellbeing is part of how work gets done.",
        copy: "Sustainable work starts with clear expectations, supportive teams, and space to recharge.",
        image: "page-wellbeing-team-support.png",
        imageAlt: "Coworkers planning priorities together in a bright workplace",
        reverse: true,
        theme: "inverse"
      })}
      <section class="section">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">Flexibility</p>
            <h2 class="phw-g-h2-dark">Flexibility that reflects real work.</h2>
            <p class="section-lede">Flexibility varies by role. Review schedule, location, and work model details before you apply.</p>
          </div>
          <div class="page-check-list">${["Schedule options vary by role", "Remote or hybrid options where available", "Team-based planning", "Clear expectations before applying"].map((item) => `<span>✓ ${item}</span>`).join("")}</div>
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container">
          ${sectionIntro("Growth & Learning", "Keep building what comes next.", "Growth can mean learning, deepening expertise, leading, or exploring a new path.")}
          ${cardGrid(learning, iconAt([pageIcons.learning, pageIcons.mentorship, pageIcons.growth, pageIcons.leadership]), "grid grid--4")}
        </div>
      </section>
      <section class="section">
        <div class="container split-panel">
          <div>${sectionIntro("Benefits FAQ", "Answers to common benefits questions.")}</div>
          ${accordion(faq)}
        </div>
      </section>
      ${closingCta({
        title: "Explore roles that support where you are and where you want to go.",
        primary: button("Search jobs", "search-results.html", "primary")
      })}
    </main>
  `;
}

export function earlyCareersPage() {
  const pathways = [
    ["Internships", "Gain practical experience, contribute to real work, and learn with support."],
    ["Apprenticeships", "Build skills through structured learning, hands-on work, and guidance."],
    ["Graduate Programs", "Grow through exposure, support, and clear career direction."],
    ["Entry-Level Roles", "Start with meaningful work, clear expectations, and support as you build confidence."],
    ["Rotational Programs", "Explore teams, projects, and functions while building context."],
    ["Skill-Building Opportunities", "Build practical skills through feedback, resources, and real work."]
  ];
  const experience = ["Mentorship", "Practical learning", "Real projects", "Team support", "Feedback", "Growth planning"].map((title) => [title, "Contribute while learning with support."]);
  const timeline = [
    ["Discover opportunities", "Explore roles, programs, and pathways that match your interests."],
    ["Apply", "Submit your application and share what motivates you."],
    ["Meet the team", "Learn about expectations, culture, and how the role supports growth."],
    ["Learn and contribute", "Build skills through meaningful work and support from your team."],
    ["Grow into your next step", "Use feedback and curiosity to shape your direction."]
  ];
  const skills = ["Curiosity", "Collaboration", "Problem solving", "Communication", "Adaptability", "Customer focus", "Willingness to learn", "Accountability"];
  const faq = [
    ["Do I need previous experience?", "Not always. Some early career opportunities are designed for people who are still building experience."],
    ["Are internships paid?", "Details vary by role and location. Compensation should be shared in the role or hiring process."],
    ["Can students apply?", "Yes, when eligibility fits. Some programs are built for students or recent graduates."],
    ["What support is available?", "Support may include mentorship, feedback, learning resources, and team guidance."],
    ["Can early career roles become full-time?", "Some opportunities may lead to longer-term roles based on performance, needs, and openings."],
    ["How do I prepare for the interview?", "Review the role and prepare examples that show curiosity, teamwork, and willingness to learn."]
  ];

  return `
    ${pageHero({
      eyebrow: "Early Careers",
      title: "Start strong. Grow with purpose.",
      copy: "Explore opportunities for people starting careers, building skills, or taking a first meaningful step.",
      action: button("Explore early career roles", "search-results.html", "primary") + button("Join talent community", "talent-community.html", "secondary"),
      image: asset("page-early-careers-learning.png"),
      imageAlt: "Early career associate learning with a mentor in a bright workplace"
    })}
    <main>
      <section class="section">
        <div class="container">
          ${sectionIntro("Early Career Pathways", "Explore ways to begin.", "Explore paths built for learning, contribution, and confidence.")}
          ${cardGrid(pathways, iconAt([pageIcons.internship, pageIcons.apprenticeship, pageIcons.graduate, pageIcons.entry, pageIcons.rotation, pageIcons.skill]))}
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container">
          ${sectionIntro("What You’ll Experience", "Learning happens through real work and real support.", "Contribute, build confidence, and create momentum.")}
          ${cardGrid(experience, iconAt([pageIcons.mentorship, pageIcons.learning, pageIcons.corporate, pageIcons.community, pageIcons.voice, pageIcons.growth]))}
        </div>
      </section>
      <section class="section">
        <div class="container split-panel">
          <div>${sectionIntro("Program Journey Timeline", "What the journey can look like.")}</div>
          <div class="timeline">${timeline.map(([title, copy]) => `<div class="timeline__item"><strong>${title}</strong><span>${copy}</span></div>`).join("")}</div>
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container page-story-feature page-story-feature--compact">
          <div class="visual-panel"><img src="${asset("page-story-maya-associate.png")}" alt="Maya, an associate, smiling in a bright workplace"></div>
          <article>
            <p class="eyebrow">Early Careers Story</p>
            <h2>Maya found momentum through support.</h2>
            <blockquote>“I didn’t need to have everything figured out. What mattered was curiosity, effort, and the support to keep learning.”</blockquote>
            <p>Maya started with questions, not a fixed plan. Mentorship and real work helped Maya build confidence.</p>
            <footer><strong>Maya</strong><span>Associate</span></footer>
          </article>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${sectionIntro("Skills We Value", "What helps people succeed early.")}
          ${chipList(skills, "page-chip-list page-chip-list--static")}
        </div>
      </section>
      <section class="section section--soft">
        <div class="container split-panel">
          <div>${sectionIntro("Early Career FAQ", "Helpful answers before taking the first step.")}</div>
          ${accordion(faq)}
        </div>
      </section>
      ${closingCta({
        title: "Take your first step toward a career with room to grow.",
        primary: button("Search early career roles", "search-results.html", "primary")
      })}
    </main>
  `;
}

export const eventsPage = () => `${pageHero({ eyebrow: "Events", title: "Meet the work before you decide.", copy: "Ask practical questions before applying." })}${eventsWidget()}`;

export const talentCommunityPage = () => `${pageHero({ eyebrow: "Talent Community", title: "Stay connected without pressure.", copy: "Get updates by interest, location, and timing." })}${talentCommunityWidget()}`;

export function locationsPage() {
  const regionCards = [
    ["Central Region", "Explore workplace hubs with team-based and support roles."],
    ["Coastal Region", "Find growing teams, flexible work models, and service roles."],
    ["Northern Region", "Discover established teams, operations centers, and community-based work."],
    ["Southern Region", "Explore roles shaped around service, collaboration, and local team support."],
    ["Remote & Hybrid", "View opportunities with flexible work models where available."],
    ["Emerging Locations", "Explore areas where teams are growing and new opportunities may become available."]
  ];
  const faq = [
    ["Can I filter by remote or hybrid roles?", "Yes. Use the work model filter to view remote, hybrid, or on-site opportunities where available."],
    ["Do roles vary by location?", "Yes. Available roles may vary by region, team needs, schedule, and business priorities."],
    ["Can I save location preferences?", "Yes. Candidates can save interests or join the talent community to receive relevant updates."],
    ["Are relocation options available?", "Relocation support may vary by role and location. Details are shared during hiring when applicable."],
    ["How often are new roles added?", "New opportunities may be added regularly. Check back or join the talent community for updates."]
  ];
  const locationJobs = jobs.slice(0, 5).map((job, index) => ({
    ...job,
    location: ["Region A Hub • Nearby", "Region B Workplace • 12 miles", "Remote Eligible", "Hybrid Team Hub", "Region C Campus"][index] || job.location
  }));

  return `
    ${pageHero({
      eyebrow: "Locations",
      title: "Explore opportunities where work fits your life.",
      copy: "Search by location, work style, or interest to find roles that fit your life and goals.",
      action: button("Search by location", "#location-search", "primary") + button("View remote opportunities", "search-results.html", "secondary"),
      image: asset("page-locations-workplace-hub.png"),
      imageAlt: "People arriving and collaborating in a bright workplace hub"
    })}
    <main>
      <section class="section" id="location-search">
        <div class="container">
          ${sectionIntro("Location Search", "Find opportunities near what matters most.")}
          <form class="card page-location-search">
            <div class="field"><label for="loc-keyword">Keyword</label><input id="loc-keyword" type="search" placeholder="Role, skill, or team"></div>
            <div class="field"><label for="loc-region">Location or region</label><select id="loc-region"><option>Region A</option><option>Region B</option><option>Region C</option></select></div>
            <div class="field"><label for="loc-distance">Distance or commute preference</label><select id="loc-distance"><option>Nearby</option><option>Flexible commute</option><option>Any distance</option></select></div>
            <div class="field"><label for="loc-model">Work model</label><select id="loc-model"><option>Remote</option><option>Hybrid</option><option>On-site</option></select></div>
            <div class="field"><label for="loc-area">Career area</label><select id="loc-area"><option>Customer & Frontline</option><option>Technology & Product</option><option>Operations & Logistics</option></select></div>
            <button class="btn btn--primary" type="submit">Search locations</button>
          </form>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container">
          ${sectionIntro("Region Cards", "Explore by region or work style.")}
          ${cardGrid(regionCards, iconAt([pageIcons.location, pageIcons.location, pageIcons.location, pageIcons.location, pageIcons.remote, pageIcons.growth]))}
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">Commute & Flexibility</p>
            <h2 class="phw-g-h2-dark">Know how the location fits your day.</h2>
            <p class="section-lede">Review commute, schedule, work model, and team expectations before you apply.</p>
          </div>
          <div class="page-check-list">${["Filter by region or work model", "Understand schedule expectations", "Save location preferences", "Explore nearby opportunities"].map((item) => `<span>✓ ${item}</span>`).join("")}</div>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container">
          ${sectionIntro("Featured Location Jobs", "Compare roles by region, schedule, and work model.")}
          ${jobsList(locationJobs, true)}
        </div>
      </section>
      <section class="section">
        <div class="container split-panel">
          <div>${sectionIntro("Location FAQ", "Questions about where work happens.")}</div>
          ${accordion(faq)}
        </div>
      </section>
      ${closingCta({
        title: "Find opportunities close to what matters most.",
        primary: button("Search jobs by location", "search-results.html", "primary")
      })}
    </main>
  `;
}

export function careerAreasPage() {
  const roleFamilies = [
    ["Customer & Frontline Roles", "Work directly with people and make each interaction simple and supportive.", "Customer Support Associate, Service Specialist, Team Member"],
    ["Operations & Logistics", "Keep work moving through planning, coordination, and reliable execution.", "Operations Coordinator, Fulfillment Associate, Logistics Specialist"],
    ["Corporate & Business Functions", "Support the teams, systems, and strategies that help the organization grow.", "Finance Analyst, People Operations Partner, Marketing Coordinator"],
    ["Technology & Product", "Build tools, improve experiences, and solve complex problems with technology and insight.", "Software Engineer, Product Designer, Data Analyst"],
    ["Sales & Client Support", "Build relationships and connect people with the right solutions.", "Account Associate, Client Success Specialist, Sales Coordinator"],
    ["Healthcare & Care Support", "Support care experiences with empathy, precision, and teamwork.", "Care Coordinator, Clinical Support Specialist, Patient Services Associate"],
    ["Leadership", "Guide teams, coach others, and help people do meaningful work with clarity and confidence.", "Team Lead, Department Manager, Operations Leader"],
    ["Early Careers", "Build practical skills and grow with support from experienced teams.", "Intern, Apprentice, Entry-Level Associate"]
  ];
  const interests = ["Helping people", "Solving problems", "Leading teams", "Working with technology", "Organizing operations", "Creating experiences", "Supporting communities", "Learning something new"];
  const pathways = [
    "Entry role → Skilled contributor → Senior specialist → Team lead",
    "Intern → Associate → Specialist → Manager",
    "Support role → Coordinator → Lead → Operations manager"
  ];

  return `
    ${pageHero({
      eyebrow: "Career Areas",
      title: "Find the path that fits your strengths.",
      copy: "Explore opportunities designed around different skills, interests, and ambitions.",
      action: button("Search jobs", "search-results.html", "primary") + button("View all career areas", "#role-families", "secondary"),
      image: asset("page-career-areas-paths.png"),
      imageAlt: "Professionals discussing different career paths in a bright workplace"
    })}
    <main>
      <section class="section" id="role-families">
        <div class="container">
          ${sectionIntro("Role Families", "Explore opportunities by career area.", "Find where your strengths, experience, and goals may fit best.")}
          ${cardGrid(roleFamilies, iconAt([pageIcons.frontline, pageIcons.operations, pageIcons.corporate, pageIcons.technology, pageIcons.community, pageIcons.health, pageIcons.leadership, pageIcons.early]), "grid grid--4")}
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container career-spotlight">
          ${sectionIntro("Career Area Spotlight", "Not sure where to start?", "Choose what energizes you most, and explore role paths that align with your strengths.")}
          ${chipList(interests)}
          <div class="grid grid--3">
            ${["Customer & Frontline Roles", "Technology & Product", "Operations & Logistics"].map((title, index) => simpleCard([title, "A strong place to begin based on what energizes you.", "", "Explore roles"], [pageIcons.frontline, pageIcons.technology, pageIcons.operations][index])).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">Career Growth Pathways</p>
            <h2 class="phw-g-h2-dark">Build a path with room to grow.</h2>
            <p class="section-lede">Career growth is not always linear. The right path builds confidence, skills, and momentum toward work that fits.</p>
          </div>
          <div class="timeline">${pathways.map((path) => `<div class="timeline__item"><strong>Path</strong><span>${path}</span></div>`).join("")}</div>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container">
          ${sectionIntro("Featured Career Area Jobs", "Explore roles across different paths.")}
          ${jobsList(jobs, true)}
        </div>
      </section>
      ${closingCta({
        title: "Your next step starts with the right path.",
        primary: button("Search jobs", "search-results.html", "primary"),
        secondary: button("Save your interests", "talent-community.html", "secondary")
      })}
    </main>
  `;
}

export const savedJobsPage = () => `
  ${pageHero({ eyebrow: "Saved Jobs", title: "Return to roles you want to compare.", copy: "Keep your strongest options in one place." })}
  <section class="section"><div class="container"><div data-saved-jobs>${jobsList([], true)}</div></div></section>
`;

export const accessibilityPage = () => `
  ${pageHero({ eyebrow: "Accessibility & Help", title: "Support should be easy to find.", copy: "Find help with applications, accessibility needs, and account questions." })}
  <section class="section"><div class="container split-panel"><div>${sectionHeader("Candidate Help", "Get the support you need.", "Use the options below to prepare, apply, and ask for assistance.")}</div>${accordion([["Application assistance", "Help with forms, uploads, logistics, or accessibility needs."], ["Keyboard navigation", "Use navigation, filters, drawers, tabs, accordions, and forms with a keyboard."], ["Privacy and consent", "Forms include clear consent language and low-pressure next steps."]])}</div></section>
`;

export const widgetPreviewPage = () => `
  ${pageHero({ eyebrow: "Page Sections", title: "Explore reusable career site sections.", copy: "Review common sections for jobs, benefits, events, and talent community journeys." })}
  ${careerAreasWidget()}${benefitsWidget()}${eventsWidget()}${talentCommunityWidget()}
`;
