import { benefits, careerAreas, events, jobs, locations, stories } from "../data/site-data.js";
import { accordion, button, jobCard, jobsList, pageHero, sectionHeader, simpleCard } from "../components/common.js";
import { benefitsWidget, careerAreasWidget, growthWidget, locationsWidget, resumeMatchWidget, storiesWidget, talentCommunityWidget } from "../widgets/home-widgets.js";

const assetPrefix = () => {
  if (!window.location.pathname.includes("/pages/")) return "";
  const relativePath = window.location.pathname.split("/pages/")[1] || "";
  const depth = relativePath.split("/").filter(Boolean).length - 1;
  return depth > 0 ? `../${"../".repeat(depth)}` : "../";
};
const asset = (file) => `${assetPrefix()}assets/illustrations/${file}`;
const pageHref = (file) => {
  if (!window.location.pathname.includes("/pages/")) return `pages/${file}`;
  const relativePath = window.location.pathname.split("/pages/")[1] || "";
  const depth = relativePath.split("/").filter(Boolean).length - 1;
  return `${depth > 0 ? "../".repeat(depth) : ""}${file}`;
};
const lucideIcon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const viewAllJobsCta = (href = "search-results.html") => `<div class="job-list-footer">${button("View All", href, "primary")}</div>`;
const pageIcons = {
  culture: lucideIcon("book-open"),
  curiosity: lucideIcon("sparkles"),
  care: lucideIcon("heart-handshake"),
  voice: lucideIcon("message-square"),
  purpose: lucideIcon("flag"),
  progress: lucideIcon("trending-up"),
  huddle: lucideIcon("users-round"),
  mentorship: lucideIcon("handshake"),
  collaboration: lucideIcon("network"),
  recognition: lucideIcon("award"),
  learning: lucideIcon("book-open"),
  community: lucideIcon("users"),
  health: lucideIcon("heart-pulse"),
  time: lucideIcon("clock"),
  flexibility: lucideIcon("calendar-clock"),
  finance: lucideIcon("circle-dollar-sign"),
  family: lucideIcon("heart-handshake"),
  perks: lucideIcon("gift"),
  internship: lucideIcon("briefcase"),
  apprenticeship: lucideIcon("wrench"),
  graduate: lucideIcon("graduation-cap"),
  entry: lucideIcon("file-text"),
  rotation: lucideIcon("rotate-cw"),
  skill: lucideIcon("wand-sparkles"),
  location: lucideIcon("map-pin"),
  remote: lucideIcon("monitor"),
  frontline: lucideIcon("users"),
  corporate: lucideIcon("briefcase"),
  technology: lucideIcon("code-2"),
  operations: lucideIcon("workflow"),
  leadership: lucideIcon("crown"),
  growth: lucideIcon("trending-up"),
  belonging: lucideIcon("users-round"),
  early: lucideIcon("graduation-cap")
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
    ${items.map(([title, copy, meta, cta = "", href = "career-areas.html"], index) => `
      <article class="card">
        <div class="card__icon">${typeof icon === "function" ? icon(title, copy, meta, index) : icon}</div>
        <h3>${title}</h3>
        ${meta ? `<p><strong>${meta}</strong></p>` : ""}
        <p>${copy}</p>
        ${cta ? `<a class="card__link" href="${pageHref(href)}">${cta}<span aria-hidden="true">→</span></a>` : ""}
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

const imageFeature = ({ eyebrow, title, copy, image, imageAlt, reverse = false, theme = "", action = "" }) => `
  <section class="section ${theme === "inverse" ? "section--inverse" : reverse ? "section--soft" : ""}">
    <div class="container page-image-feature ${reverse ? "page-image-feature--reverse" : ""}">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h2 class="phw-g-h2-dark">${title}</h2>
        <p class="section-lede">${copy}</p>
        ${action}
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
          <section class="sidebar-resume-match-card" aria-label="Resume job match">
            <p class="eyebrow">Recommended</p>
            <h2>Get matched by resume.</h2>
            <p>Upload your resume and see roles that match your skills, experience, and next step.</p>
            <button class="btn btn--secondary btn--small" type="button" data-resume-match-open aria-haspopup="dialog">
              ${lucideIcon("upload")}
              <span>Search with resume</span>
            </button>
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
          <nav class="search-pagination" aria-label="Search results pages">
            <button class="search-pagination__arrow" type="button" aria-label="Previous page">‹</button>
            <button type="button" aria-current="page">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <span aria-hidden="true">...</span>
            <button type="button">8</button>
            <button class="search-pagination__arrow" type="button" aria-label="Next page">›</button>
          </nav>
        </section>
      </div>
      <div class="container">
        <section class="section--tight related-paths-widget">
          ${sectionHeader("Related Paths", "Keep exploring.", "Your experience may fit more than one kind of team.")}
          <div class="grid grid--3">${careerAreas.slice(0, 3).map((area, index) => simpleCard([area[0], area[1], area[2], "See related jobs"], [pageIcons.frontline, pageIcons.corporate, pageIcons.technology][index])).join("")}</div>
        </section>
      </div>
    </main>
  `;
}

export function jobDescriptionPage() {
  const selectedJobId = new URLSearchParams(window.location.search).get("job");
  const job = jobs.find((item) => item.id === selectedJobId) || jobs[0];
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
  const recommendationTabs = ["Browsing Based", "Recently Viewed", "New Opportunities", "Be the First"];
  const recommendationTags = ["Browsing Based", "Recently Viewed", "New Opportunities", "Be the First", "Recently Viewed", "New Opportunities"];
  const similarJobs = jobs
    .filter((item) => item.id !== job.id)
    .slice(0, 6)
    .map((item, index) => ({
      ...item,
      tags: [recommendationTags[index], ...(item.tags || [])]
    }));
  const tabSections = [
    {
      id: "summary",
      label: "Summary",
      icon: "sparkles",
      content: `
        <p>This role is built for someone who communicates clearly, learns new routines with confidence, and helps people move through each interaction with support.</p>
        <p>You will work with teammates to answer questions, improve daily handoffs, and create a reliable experience for candidates, employees, or customers depending on the team.</p>
      `
    },
    {
      id: "responsibilities",
      label: "Responsibilities",
      content: `<ul>${responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul>`
    },
    {
      id: "education",
      label: "Education",
      content: `
        <h3>Must have</h3>
        <ul>${mustHave.map((item) => `<li>${item}</li>`).join("")}</ul>
        <h3>Preferred</h3>
        <ul>${preferred.map((item) => `<li>${item}</li>`).join("")}</ul>
      `
    },
    {
      id: "skills",
      label: "Skills",
      content: `<ul>${["Clear communication", "Reliable follow-through", "Team collaboration", "Comfort learning digital tools", "Careful handoffs", "Customer or candidate empathy"].map((item) => `<li>${item}</li>`).join("")}</ul>`
    }
  ];

  return `
    <main>
      <section class="job-detail-hero">
        <div class="container job-detail-hero__grid">
          <div class="job-detail-hero__content">
            <div class="job-detail-hero__meta" aria-label="Job details">
              <span>${lucideIcon("map-pin")}${job.location}</span>
              <span>${lucideIcon("briefcase")}${job.department}</span>
              <span>${lucideIcon("clock")}${job.schedule}</span>
              <span>${lucideIcon("hash")}P-${job.id}</span>
            </div>
            <h1 class="phw-g-h1-primary">${job.title}</h1>
            <div class="job-detail-tabs" role="tablist" aria-label="Job description sections" data-job-detail-tabs>
              ${tabSections.map((tab, index) => `
                <button id="job-tab-${tab.id}" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-controls="job-panel-${tab.id}" data-job-detail-tab="${tab.id}">
                  ${tab.icon ? lucideIcon(tab.icon) : ""}${tab.label}
                </button>
              `).join("")}
            </div>
            <div class="job-detail-tabpanels" data-job-detail-tabpanels>
              ${tabSections.map((tab, index) => `
                <section id="job-panel-${tab.id}" class="job-detail-tabpanel" role="tabpanel" aria-labelledby="job-tab-${tab.id}" data-job-detail-panel="${tab.id}" ${index === 0 ? "" : "hidden"}>
                  ${tab.content}
                </section>
              `).join("")}
            </div>
            <div class="job-detail-mobile-sections" data-job-detail-mobile-sections>
              ${tabSections.map((tab) => `
                <section class="job-detail-mobile-section">
                  <button type="button" aria-expanded="false" aria-controls="job-mobile-panel-${tab.id}" data-job-detail-mobile-toggle>
                    <span>${tab.icon ? lucideIcon(tab.icon) : ""}${tab.label}</span>
                    <span aria-hidden="true">⌄</span>
                  </button>
                  <div id="job-mobile-panel-${tab.id}" class="job-detail-mobile-panel" hidden>
                    ${tab.content}
                  </div>
                </section>
              `).join("")}
            </div>
          </div>
          <figure class="job-detail-hero__media">
            <img src="${asset("page-life-culture-team.png")}" alt="Team members collaborating in a bright workplace">
          </figure>
        </div>
      </section>
      <section class="job-action-strip" aria-label="Job actions">
        <div class="container job-action-strip__inner">
          <div class="job-action-strip__actions">
            <button class="btn btn--ghost btn--small" type="button" data-share>${lucideIcon("share-2")} <span>Share</span></button>
            ${button("Apply Now", "#apply", "primary", "btn--small")}
            <button class="btn btn--primary btn--small" type="button">${lucideIcon("heart")} Save job</button>
          </div>
        </div>
      </section>
      <section class="section job-detail-main-section">
        <div class="container">
          <article class="job-description-card is-collapsed" id="apply" data-job-description-card>
            <div class="job-description-card__content" data-job-description-content>
              <section class="job-detail-section" id="summary">
                <h2 class="phw-g-h2-dark">Job Description</h2>
                <h3>Job Requirements</h3>
                ${overview.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              </section>
              <section class="job-detail-section" id="responsibilities">
                <h2>Responsibilities</h2>
                <ul>${responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul>
              </section>
              <section class="job-detail-section">
                <h2>Day in the life</h2>
                <ul>${dayRhythm.map(([title, copy]) => `<li><strong>${title}:</strong> ${copy}</li>`).join("")}</ul>
              </section>
              <section class="job-detail-section" id="education">
                <h2>Qualifications</h2>
                <h3>Must have</h3>
                <ul>${mustHave.map((item) => `<li>${item}</li>`).join("")}</ul>
                <h3>Preferred</h3>
                <ul>${preferred.map((item) => `<li>${item}</li>`).join("")}</ul>
              </section>
              <section class="job-detail-section" id="skills">
                <h2>Benefits and support</h2>
                <ul>${["Health, PTO, learning, and wellbeing support", "Clear onboarding and guided practice", "Team routines that make support easy to find", "Growth paths for future opportunities"].map((item) => `<li>${item}</li>`).join("")}</ul>
              </section>
              <section class="job-detail-section">
                <h2>Team introductions</h2>
                <p>See how support, coaching, and collaboration show up around the work.</p>
                <ul>${stories.map((story) => `<li><strong>${story.name}, ${story.role}:</strong> “${story.quote}”</li>`).join("")}</ul>
              </section>
            </div>
            <div class="job-description-card__actions">
              <button class="btn btn--secondary btn--small" type="button" aria-expanded="false" data-job-description-toggle>
                <span>Read Full Job Description</span>
                ${lucideIcon("chevron-down")}
              </button>
            </div>
          </article>
          <section class="job-detail-recommendations" aria-labelledby="similar-job-title">
            <div class="job-detail-recommendations__inner">
              <h2 id="similar-job-title" class="phw-g-h2-dark">Job Recommendations for You</h2>
              <div data-filter-scope>
                <div class="tabs" role="tablist" aria-label="Similar job recommendation filters">
                  ${recommendationTabs.map((tab, index) => `<button class="tab" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" data-tab-filter="${index === 0 ? "All" : tab}">${tab}</button>`).join("")}
                </div>
                <div class="job-detail-recommendations__grid">
                  ${similarJobs.map((item, index) => jobCard(item, true).replace(
                    '<article class="job-card"',
                    `<article class="job-card" data-similar-job-card${index > 2 ? ' data-similar-extra="true" hidden' : ""}`
                  )).join("")}
                </div>
              </div>
              <button class="btn btn--secondary" type="button" data-similar-jobs-more>View More</button>
            </div>
          </section>
        </div>
      </section>
      ${resumeMatchWidget()}
      <section class="job-detail-benefits-widget" aria-labelledby="job-detail-benefits-title">
        <div class="container">
          <div class="job-detail-benefits-widget__header">
            <p class="eyebrow">Benefits</p>
            <h2 id="job-detail-benefits-title" class="phw-g-h2-dark">Benefits that support this role day to day.</h2>
          </div>
          <div class="job-detail-benefits-grid">
            ${[
              ["Growth", "Build confidence through coaching, guided practice, and clear next steps.", "trending-up"],
              ["Support", "Work with teammates who help clarify priorities, handoffs, and daily expectations.", "heart-handshake"],
              ["Flexibility", "Review schedule, location, and work model details before deciding if this role fits.", "calendar-clock"]
            ].map(([title, copy, iconName]) => `
              <article class="job-detail-benefit-card">
                <span class="card__icon">${lucideIcon(iconName)}</span>
                <h3>${title}</h3>
                <p>${copy}</p>
              </article>
            `).join("")}
          </div>
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
  const cultureGallery = [
    ["culture-gallery-collaboration.png", "Team members collaborating around a laptop in a bright workplace"],
    ["culture-gallery-mentorship.png", "A mentor and teammate having a supportive coaching conversation"],
    ["culture-gallery-team-huddle.png", "Coworkers sharing a friendly team huddle near a whiteboard"],
    ["culture-gallery-recognition.png", "Team members celebrating a recognition moment together"],
    ["culture-gallery-flexible-work.png", "Coworkers working in a flexible collaboration space"]
  ];

  return `
    ${pageHero({
      eyebrow: "Our culture",
      title: "Bring your whole self to meaningful work.",
      copy: "Explore a workplace built around trust, purpose, everyday support, and belonging.",
      action: button("Explore career areas", "career-areas.html", "primary") + button("Search open roles", "search-results.html", "secondary"),
      image: asset("page-life-culture-team.png"),
      imageAlt: "Coworkers talking together in a warm modern workplace"
    })}
    <main>
      <section class="section" id="culture">
        <div class="container">
          ${sectionIntro("Our principles", "How we work together", "Culture is shaped by how teams communicate, support people, welcome ideas, and recognize progress.")}
          ${cardGrid(principles, iconAt([pageIcons.community, pageIcons.curiosity, pageIcons.care, pageIcons.voice, pageIcons.purpose, pageIcons.progress]))}
        </div>
      </section>
      <section class="section section--inverse" id="stories">
        <div class="container page-story-feature">
          <div class="visual-panel"><img src="${asset("story-jordan-care-support.png")}" alt="Jordan, a team lead, in a bright workplace"></div>
          <article>
            <p class="eyebrow">Meet Jordan, one of our team leads</p>
            <blockquote>“People made space for my ideas early. That trust gave me confidence to grow.”</blockquote>
            <p>Jordan joined for stability and room to learn. Supportive teammates helped Jordan grow into leadership.</p>
            ${button("Explore open roles", "search-results.html", "primary")}
          </article>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">You belong here</p>
            <h2 class="phw-g-h2-dark">Belonging shows up in the everyday moments.</h2>
            <p class="section-lede">Belonging is built through respect, accessible information, open perspectives, and space to contribute.</p>
          </div>
          <div class="grid grid--2">${belonging.map((item, index) => simpleCard([item, "Practical habits help people feel respected and ready to contribute."], [pageIcons.care, pageIcons.voice, pageIcons.community, pageIcons.belonging][index] || pageIcons.community)).join("")}</div>
        </div>
      </section>
      <section class="section culture-gallery-section" aria-labelledby="culture-gallery-title">
        <div class="container">
          <div class="culture-gallery__header">
            <p class="eyebrow">Discover us</p>
            <h2 id="culture-gallery-title" class="phw-g-h2-dark">Moments that shape the everyday experience.</h2>
          </div>
          <div class="culture-gallery" data-culture-gallery>
            <button class="culture-gallery__arrow" type="button" data-culture-prev aria-label="Show previous culture image">←</button>
            <div class="culture-gallery__viewport">
              <div class="culture-gallery__track" data-culture-track>
                ${cultureGallery.map(([image, imageAlt]) => `
                  <figure class="culture-gallery__item">
                    <img src="${asset(image)}" alt="${imageAlt}">
                  </figure>
                `).join("")}
              </div>
            </div>
            <button class="culture-gallery__arrow" type="button" data-culture-next aria-label="Show next culture image">→</button>
          </div>
        </div>
      </section>
      ${closingCta({
        title: "Find the team where you can do your best work.",
        copy: "Explore opportunities shaped around purpose, growth, and the people who make work meaningful.",
        primary: button("Explore career areas", "career-areas.html", "primary"),
        secondary: button("Search jobs", "search-results.html", "secondary")
      })}
    </main>
  `;
}

export function inclusionBelongingPage() {
  const belonging = [
    ["Respect in every interaction", "Teams are expected to communicate with care, clarity, and consistency."],
    ["Accessible communication", "Information is easier to act on when expectations, steps, and support are clear."],
    ["Supportive team norms", "Everyday habits help people ask questions, share context, and contribute with confidence."],
    ["Space for different perspectives", "Better decisions come from listening to different experiences and ways of thinking."]
  ];
  const moments = [
    ["Employee-led communities", "Spaces to connect, learn, and build relationships across teams."],
    ["Mentorship conversations", "Guidance from people who understand the work and want others to grow."],
    ["Recognition moments", "Progress, effort, and contribution are noticed in practical ways."],
    ["Open feedback", "Teams improve when people can share ideas, questions, and concerns respectfully."]
  ];
  const inclusionGallery = [
    ["inclusion-gallery-team-voices.png", "Coworkers sharing ideas in an inclusive team conversation"],
    ["inclusion-gallery-mentorship.png", "A mentor and teammate having a supportive workplace conversation"],
    ["inclusion-gallery-community.png", "An employee-led community group gathering in a bright workplace"],
    ["inclusion-gallery-recognition.png", "Teammates recognizing a colleague's contribution"],
    ["inclusion-gallery-accessible-meeting.png", "An inclusive team meeting with accessible communication materials"]
  ];

  return `
    ${pageHero({
      eyebrow: "Inclusion & Belonging",
      title: "A place to contribute, connect, and grow.",
      copy: "Belonging is built through respect, clear communication, supportive teams, and stories that help people see themselves here.",
      action: button("Explore open roles", "search-results.html", "primary") + button("Join talent community", "talent-community.html", "secondary"),
      image: asset("page-life-culture-team.png"),
      imageAlt: "Team members from diverse backgrounds collaborating in a bright workplace"
    })}
    <main>
      <section class="section">
        <div class="container">
          ${sectionIntro("Belonging In Practice", "Support people can feel every day.", "Inclusion becomes real through how teams listen, communicate, recognize effort, and make space for different perspectives.")}
          ${cardGrid(belonging, iconAt([pageIcons.care, pageIcons.voice, pageIcons.community, pageIcons.belonging]), "grid grid--4")}
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container page-story-feature">
          <div class="visual-panel"><img src="${asset("story-jordan-care-support.png")}" alt="Jordan, a team lead, in a bright workplace"></div>
          <article>
            <p class="eyebrow">Meet Jordan, one of our team leads</p>
            <blockquote>“People made space for my ideas early. That trust gave me confidence to grow.”</blockquote>
            <p>Jordan joined for stability and room to learn. Supportive teammates helped Jordan grow into leadership.</p>
            ${button("Explore open roles", "search-results.html", "primary")}
          </article>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container">
          ${sectionIntro("Everyday Signals", "What belonging can look like.", "Candidates should be able to see how support shows up before they apply.")}
          ${cardGrid(moments, iconAt([pageIcons.community, pageIcons.mentorship, pageIcons.recognition, pageIcons.voice]), "grid grid--4")}
        </div>
      </section>
      <section class="section culture-gallery-section" aria-labelledby="inclusion-gallery-title">
        <div class="container">
          <div class="culture-gallery__header">
            <p class="eyebrow">You belong here</p>
            <h2 id="inclusion-gallery-title" class="phw-g-h2-dark">Everyday moments that help people feel included.</h2>
          </div>
          <div class="culture-gallery" data-culture-gallery>
            <button class="culture-gallery__arrow" type="button" data-culture-prev aria-label="Show previous inclusion image">←</button>
            <div class="culture-gallery__viewport">
              <div class="culture-gallery__track" data-culture-track>
                ${inclusionGallery.map(([image, imageAlt]) => `
                  <figure class="culture-gallery__item">
                    <img src="${asset(image)}" alt="${imageAlt}">
                  </figure>
                `).join("")}
              </div>
            </div>
            <button class="culture-gallery__arrow" type="button" data-culture-next aria-label="Show next inclusion image">→</button>
          </div>
        </div>
      </section>
      ${closingCta({
        title: "Find a team where your perspective can matter.",
        copy: "Explore opportunities shaped around purpose, support, and the people who make work meaningful.",
        primary: button("Search jobs", "search-results.html", "primary"),
        secondary: button("Explore Life & Culture", "life.html", "secondary")
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
      eyebrow: "Benefits of working here",
      title: "Support for your work, life, and future.",
      copy: "Explore support for wellbeing, growth, financial confidence, and practical flexibility.",
      action: button("View open roles", "search-results.html", "primary") + button("Join talent community", "talent-community.html", "secondary"),
      image: asset("page-benefits-wellbeing-calm.png"),
      imageAlt: "Colleagues taking a calm wellbeing break in a bright workplace"
    })}
    <main>
      <section class="section">
        <div class="container">
          ${sectionIntro("Support For Every Part Of Life", "Support that meets people where they are.", "Different moments call for different support across life, work, family, and future goals.")}
          ${cardGrid(benefitCards, iconAt([pageIcons.health, pageIcons.time, pageIcons.flexibility, pageIcons.finance, pageIcons.learning, pageIcons.family, pageIcons.recognition, pageIcons.perks]), "grid grid--4")}
        </div>
      </section>
      ${imageFeature({
        eyebrow: "Wellbeing At Work",
        title: "Wellbeing is part of how work gets done.",
        copy: "Sustainable work starts with clear expectations, supportive teams, and space to recharge.",
        image: "page-wellbeing-team-support.png",
        imageAlt: "Coworkers planning priorities together in a bright workplace",
        reverse: true,
        theme: "inverse",
        action: button("Browse jobs", "search-results.html", "primary")
      })}
      <section class="section growth-learning-section">
        <div class="container">
          ${sectionIntro("Growth & Learning", "Keep building what comes next.", "Growth can mean learning, deepening expertise, leading, or exploring a new path.")}
          ${cardGrid(learning, iconAt([pageIcons.learning, pageIcons.mentorship, pageIcons.growth, pageIcons.leadership]), "grid grid--4")}
        </div>
      </section>
      ${growthWidget()}
      <section class="section">
        <div class="container split-panel">
          <div>${sectionIntro("Questions regarding our benefits", "Answers to common benefits questions.")}</div>
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
  const faq = [
    ["Do I need previous experience?", "Not always. Some early career opportunities are designed for people who are still building experience."],
    ["Are internships paid?", "Details vary by role and location. Compensation should be shared in the role or hiring process."],
    ["Can students apply?", "Yes, when eligibility fits. Some programs are built for students or recent graduates."],
    ["What support is available?", "Support may include mentorship, feedback, learning resources, and team guidance."],
    ["Can early career roles become full-time?", "Some opportunities may lead to longer-term roles based on performance, needs, and openings."],
    ["How do I prepare for the interview?", "Review the role and prepare examples that show curiosity, teamwork, and willingness to learn."]
  ];
  const earlyCareerStories = [
    {
      eyebrow: "Meet Maya, one of our associates",
      quote: "I didn’t need to have everything figured out. What mattered was curiosity, effort, and the support to keep learning.",
      copy: "Maya started with questions, not a fixed plan. Mentorship and real work helped Maya build confidence.",
      image: "page-story-maya-associate.png",
      imageAlt: "Maya, an associate, smiling in a bright workplace"
    },
    {
      eyebrow: "Meet Eli, one of our interns",
      quote: "The best part was being trusted with real work while still having people close by when I needed guidance.",
      copy: "Eli found confidence through practical projects, clear feedback, and a team that made learning part of the day.",
      image: "page-story-eli-intern.png",
      imageAlt: "Eli, an intern, writing notes in a bright workplace"
    },
    {
      eyebrow: "Meet Nia, one of our apprentices",
      quote: "I learned faster because the work felt useful from day one, and my mentor helped me see progress each week.",
      copy: "Nia built skills through hands-on practice, supportive coaching, and small wins that made the next step clearer.",
      image: "page-story-nia-apprentice.png",
      imageAlt: "Nia, an apprentice, smiling in a collaborative workplace"
    }
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
        <div class="container page-story-carousel" data-story-carousel aria-label="Early career stories carousel">
          ${earlyCareerStories.map((story, index) => `
            <div class="page-story-feature page-story-feature--compact page-story-carousel__slide" data-story-slide ${index === 0 ? "" : "hidden"}>
              <div class="visual-panel"><img src="${asset(story.image)}" alt="${story.imageAlt}"></div>
              <article>
                <p class="eyebrow">${story.eyebrow}</p>
                <blockquote>“${story.quote}”</blockquote>
                <p>${story.copy}</p>
                <div class="page-story-carousel__controls" aria-label="Early career story carousel controls">
                  <button class="story-carousel__arrow" type="button" data-story-prev aria-label="Show previous early career story">${lucideIcon("arrow-left")}</button>
                  <button class="story-carousel__arrow" type="button" data-story-next aria-label="Show next early career story">${lucideIcon("arrow-right")}</button>
                </div>
              </article>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="section hiring-journey-section">
        <div class="container hiring-journey">
          <div class="hiring-journey__header">
            <p class="eyebrow">Your First Steps</p>
            <h2 class="phw-g-h2-dark">Getting hired</h2>
            <p class="section-lede">Know what to expect from the first search to your first step with the team.</p>
          </div>
          <div class="hiring-journey__steps" aria-label="Early career hiring journey">
            ${timeline.map(([title, copy], index) => `
              <article class="hiring-journey__step">
                <span class="hiring-journey__icon" aria-hidden="true">${[lucideIcon("search"), lucideIcon("file-text"), lucideIcon("phone"), lucideIcon("users"), lucideIcon("smile")][index] || lucideIcon("check")}</span>
                <h3>${title}</h3>
                <p>${copy}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container">
          ${sectionIntro("What You’ll Experience", "Learning happens through real work and real support.", "Contribute, build confidence, and create momentum.")}
          ${cardGrid(experience, iconAt([pageIcons.mentorship, pageIcons.learning, pageIcons.corporate, pageIcons.community, pageIcons.voice, pageIcons.growth]))}
        </div>
      </section>
      <section class="section video-story-section" aria-labelledby="early-careers-video-title">
        <div class="container video-story">
          <div class="video-story__header">
            <h2 id="early-careers-video-title">What helps people succeed early.</h2>
          </div>
          <button class="video-story__placeholder" type="button" aria-label="Play early career success video">
            <img src="${asset("page-early-careers-video-preview.png")}" alt="Early career professionals learning together with a mentor in a bright workplace">
            <span class="video-story__play" aria-hidden="true">▶</span>
          </button>
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

export const talentCommunityPage = () => `${pageHero({ eyebrow: "Talent Community", title: "Stay connected without pressure.", copy: "Get updates by interest, location, and timing." })}${talentCommunityWidget()}`;

export function locationsPage() {
  const regionCards = [
    ["Central Region", "Explore workplace hubs with team-based and support roles.", "", "Explore region", "locations/north-region.html"],
    ["Coastal Region", "Find growing teams, flexible work models, and service roles.", "", "Explore region", "locations/north-region.html"],
    ["Northern Region", "Discover established teams, operations centers, and community-based work.", "", "Explore region", "locations/north-region.html"],
    ["Southern Region", "Explore roles shaped around service, collaboration, and local team support.", "", "Explore region", "locations/north-region.html"],
    ["Remote & Hybrid", "View opportunities with flexible work models where available.", "", "Explore region", "locations/north-region.html"],
    ["Emerging Locations", "Explore areas where teams are growing and new opportunities may become available.", "", "Explore region", "locations/north-region.html"]
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
        <div class="container locations-map-widget">
          <div class="locations-map-widget__header">
            <h2>Our Locations</h2>
            <p>Explore the regions where teams collaborate, support communities, and grow meaningful work.</p>
          </div>
          <div class="locations-map-widget__frame">
            <div class="locations-map-widget__map" data-location-map aria-label="Interactive map of company locations"></div>
          </div>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container">
          ${sectionIntro("Open Roles By Location", "Compare roles by region, schedule, and work model.")}
          ${jobsList(locationJobs, true)}
          ${viewAllJobsCta("search-results.html")}
        </div>
      </section>
      <section class="section section--soft">
        <div class="container">
          ${sectionIntro("Ways To Work Near You", "Explore by region or work style.")}
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
      <section class="section">
        <div class="container split-panel">
          <div>${sectionIntro("Questions regarding our locations", "Questions about where work happens.")}</div>
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

export function locationNorthRegionPage() {
  const regionJobs = jobs.slice(0, 4).map((job, index) => ({
    ...job,
    location: ["North Region Hub", "North Region Service Center", "North Region Hybrid Team", "North Region Campus"][index] || "North Region"
  }));
  const workStyles = [
    ["Frontline Teams", "People-facing roles with training and support."],
    ["Hybrid Hubs", "Spaces for planning, coaching, and connection."],
    ["Operations Support", "Coordinated work that keeps teams moving."],
    ["Community-Based Work", "Local roles with practical impact."]
  ];
  const regionSignals = ["Hybrid and on-site teams", "Frontline and operations roles", "Practical onboarding support", "Team spaces for coaching and connection"];
  const northOfficeGallery = [
    ["north-office-masonry-collaboration-wide.png", "Coworkers collaborating around a table in the northern office hub", "wide"],
    ["north-office-masonry-focus-square.png", "A professional focused at a desk in the northern office", "square"],
    ["north-office-masonry-huddle-square.png", "A small team huddle in the northern office lounge", "square"],
    ["north-office-masonry-meeting-wide.png", "A team meeting in a connected northern office hub", "wide"]
  ];

  return `
    ${pageHero({
      eyebrow: "North Region",
      title: "Find your fit in the North Region.",
      copy: "Explore local teams, schedules, and work settings with clear support.",
      action: button("Search North Region roles", "../search-results.html", "primary") + button("Save location interest", "../talent-community.html", "secondary"),
      image: asset("page-north-region-hero.png"),
      imageAlt: "People collaborating in a bright North Region workplace hub"
    })}
    <main>
      <section class="section">
        <div class="container">
          ${sectionIntro("Work Settings In The North Region", "Choose the environment that fits how you work.", "Find frontline, operations, hybrid, and support teams with practical guidance from day one.")}
          ${cardGrid(workStyles, iconAt([pageIcons.frontline, pageIcons.remote, pageIcons.operations, pageIcons.community]), "grid grid--4")}
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">Region Fit</p>
            <h2 class="phw-g-h2-dark">Know what the location can support before you apply.</h2>
            <p class="section-lede">Review work model, commute, schedule, and team support before you apply.</p>
          </div>
          <div class="page-check-list">${regionSignals.map((item) => `<span>✓ ${item}</span>`).join("")}</div>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container">
          ${sectionIntro("Open Roles In The North Region", "Compare roles by team, schedule, and work model.")}
          ${jobsList(regionJobs, true)}
          ${viewAllJobsCta("../search-results.html")}
        </div>
      </section>
      <section class="section">
        <div class="container page-image-feature page-image-feature--reverse">
          <div>
            <p class="eyebrow">Daily Experience</p>
            <h2 class="phw-g-h2-dark">A connected hub for teams that support people.</h2>
            <p class="section-lede">Expect clear routines, approachable leaders, shared spaces, and room to build confidence.</p>
            ${button("View open roles", "../search-results.html", "primary")}
          </div>
          <div class="visual-panel">
            <img src="${asset("page-north-region-team.png")}" alt="North Region team members reviewing work together in a bright workplace">
          </div>
        </div>
      </section>
      <section class="section section--inverse office-masonry-section" aria-labelledby="north-office-gallery-title">
        <div class="container office-masonry">
          <div class="office-masonry__header">
            <p class="eyebrow">A glimpse into our office</p>
            <h2 id="north-office-gallery-title" class="phw-g-h2-dark">Glimpses from our Northern Office</h2>
          </div>
          <div class="office-masonry__grid">
            ${northOfficeGallery.map(([image, imageAlt, size]) => `
              <figure class="office-masonry__item office-masonry__item--${size}">
                <img src="${asset(image)}" alt="${imageAlt}">
              </figure>
            `).join("")}
          </div>
        </div>
      </section>
      ${closingCta({
        title: "Interested in the North Region?",
        copy: "Search current openings or save your interest for future location updates.",
        primary: button("Search North Region jobs", "../search-results.html", "primary"),
        secondary: button("Join talent community", "../talent-community.html", "secondary")
      })}
    </main>
  `;
}

export function careerAreasPage() {
  const roleFamilies = [
    ["Customer & Frontline Roles", "Work directly with people and make each interaction simple and supportive.", "", "Explore frontline work", "career-areas/frontline-workers.html"],
    ["Operations & Logistics", "Keep work moving through planning, coordination, and reliable execution.", "", "Preview this path", "career-areas/operations-logistics.html"],
    ["Corporate & Business Functions", "Support the teams, systems, and strategies that help the organization grow.", "", "Preview this path", "career-areas/corporate-shared-services.html"],
    ["Technology & Product", "Build tools, improve experiences, and solve complex problems with technology and insight.", "", "Preview this path", "career-areas/technology-product.html"],
    ["Sales & Client Support", "Build relationships and connect people with the right solutions.", "", "Preview this path", "career-areas/sales-client-support.html"],
    ["Healthcare & Care Support", "Support care experiences with empathy, precision, and teamwork.", "", "Preview this path", "career-areas/healthcare-care-support.html"],
    ["Leadership", "Guide teams, coach others, and help people do meaningful work with clarity and confidence.", "", "Preview this path", "career-areas/leadership.html"],
    ["Early Careers", "Build practical skills and grow with support from experienced teams.", "", "Preview this path", "career-areas/early-careers.html"]
  ];
  const growthMoments = [
    ["Find your fit", "Start with a role family that matches your strengths and interests."],
    ["Build confidence", "Grow through coaching, feedback, and practical experience."],
    ["See what is next", "Explore specialist, lead, manager, or cross-functional paths over time."]
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
      <section class="section section--soft">
        <div class="container">
          ${sectionIntro("Open Roles Across Career Areas", "Explore roles across different paths.")}
          ${jobsList(jobs, true)}
          ${viewAllJobsCta("search-results.html")}
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container career-spotlight">
          ${sectionIntro("What we're currently looking for", "Not sure where to start?", "Choose what energizes you most, and explore role paths that align with your strengths.")}
          <div class="grid grid--3">
            ${["Customer & Frontline Roles", "Technology & Product", "Operations & Logistics"].map((title, index) => simpleCard([title, "A strong place to begin based on what energizes you.", "", "Explore roles"], [pageIcons.frontline, pageIcons.technology, pageIcons.operations][index])).join("")}
          </div>
        </div>
      </section>
      <section class="section career-growth-feature-section">
        <div class="container career-growth-feature">
          <div class="visual-panel">
            <img src="${asset("career-areas-growth-pathways.png")}" alt="A mentor and teammate discussing career growth in a bright workplace">
          </div>
          <div class="career-growth-feature__content">
            <p class="eyebrow">Career Growth Pathways</p>
            <h2 class="phw-g-h2-dark">Build a path that can grow with you.</h2>
            <p class="section-lede">Choose a starting point, learn with support, and explore next steps as your interests become clearer.</p>
            <div class="career-growth-feature__cards">
              ${growthMoments.map(([title, copy], index) => `
                <article>
                  <span aria-hidden="true">${[lucideIcon("compass"), lucideIcon("trending-up"), lucideIcon("move-right")][index]}</span>
                  <div>
                    <h3>${title}</h3>
                    <p>${copy}</p>
                  </div>
                </article>
              `).join("")}
            </div>
            ${button("Explore open roles", "search-results.html", "primary")}
          </div>
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

export function careerAreaFrontlinePage() {
  const frontlineJobs = jobs.filter((job) => job.category === "Frontline" || job.department.includes("Customer")).concat(jobs.slice(0, 2)).slice(0, 4);
  const supportCards = [
    ["Clear Training", "Learn the role with practical guidance and team support."],
    ["People-Focused Work", "Help people feel informed, welcomed, and ready."],
    ["Reliable Team Rhythm", "Use clear routines and shared handoffs when days get busy."],
    ["Room To Grow", "Build skills through coaching and next-step opportunities."]
  ];
  const dayInRole = [
    ["Week 1", "Learn routines, role basics, and where support lives."],
    ["Month 1", "Help people with coaching and clear handoffs."],
    ["Month 3", "Build skill, context, and confidence."],
    ["Next Step", "Move toward specialist, trainer, or lead paths."]
  ];
  const frontlineGallery = [
    ["frontline-gallery-team-handoff.png", "Frontline team members sharing a supportive team handoff"],
    ["frontline-gallery-customer-support.png", "A frontline professional helping someone at a service desk"],
    ["frontline-gallery-training.png", "A frontline team member learning with a mentor using a tablet"],
    ["frontline-gallery-team-rhythm.png", "Frontline coworkers reviewing priorities near a whiteboard"],
    ["frontline-gallery-growth.png", "A frontline lead encouraging a teammate during the workday"]
  ];
  const fitSignals = ["You enjoy helping people", "You like clear routines", "You want training first", "You value team support"];

  return `
    ${pageHero({
      eyebrow: "Frontline workers",
      title: "Frontline work with support from day one.",
      copy: "Explore service-focused roles with training, team support, and room to grow.",
      action: button("Search frontline roles", "../search-results.html", "primary") + button("Join talent community", "../talent-community.html", "secondary"),
      image: asset("career-hero-teamwork.png"),
      imageAlt: "Frontline team members collaborating in a bright workplace"
    })}
    <main>
      <section class="section">
        <div class="container">
          ${sectionIntro("Why Frontline Work Matters", "Create confidence every day.", "Frontline teams make work feel easier through helpful, human support.")}
          ${cardGrid(supportCards, iconAt([pageIcons.frontline, pageIcons.care, pageIcons.collaboration, pageIcons.growth]), "grid grid--4")}
        </div>
      </section>
      <section class="section section--inverse">
        <div class="container page-image-feature">
          <div>
            <p class="eyebrow">Day In The Role</p>
            <h2 class="phw-g-h2-dark">Structure, support, and people to help.</h2>
            <p class="section-lede">Clear expectations help you respond to real people and real needs.</p>
            ${button("View open roles", "../search-results.html", "primary")}
          </div>
          <div class="visual-panel">
            <img src="${asset("page-life-culture-team.png")}" alt="Team members discussing priorities before a service shift">
          </div>
        </div>
      </section>
      <section class="section hiring-journey-section">
        <div class="container hiring-journey">
          <div class="hiring-journey__header">
            <p class="eyebrow">What your Path Can Look Like</p>
            <h2 class="phw-g-h2-dark">Grow with support.</h2>
            <p class="section-lede">Build skills, confidence, and next-step options over time.</p>
          </div>
          <div class="hiring-journey__steps hiring-journey__steps--4" aria-label="Frontline career growth path">
            ${dayInRole.map(([title, copy], index) => `
              <article class="hiring-journey__step">
                <span class="hiring-journey__icon" aria-hidden="true">${[lucideIcon("badge-check"), lucideIcon("handshake"), lucideIcon("trending-up"), lucideIcon("move-right")][index] || lucideIcon("check")}</span>
                <h3>${title}</h3>
                <p>${copy}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${sectionIntro("Open Frontline Roles", "Compare current roles.")}
          ${jobsList(frontlineJobs, true)}
          ${viewAllJobsCta("../search-results.html")}
        </div>
      </section>
      <section class="section culture-gallery-section" aria-labelledby="frontline-gallery-title">
        <div class="container">
          <div class="culture-gallery__header">
            <p class="eyebrow">Glimpses of your day here</p>
            <h2 id="frontline-gallery-title" class="phw-g-h2-dark">Support, service, and teamwork throughout the day.</h2>
          </div>
          <div class="culture-gallery" data-culture-gallery>
            <button class="culture-gallery__arrow" type="button" data-culture-prev aria-label="Show previous frontline image">←</button>
            <div class="culture-gallery__viewport">
              <div class="culture-gallery__track" data-culture-track>
                ${frontlineGallery.map(([image, imageAlt]) => `
                  <figure class="culture-gallery__item">
                    <img src="${asset(image)}" alt="${imageAlt}">
                  </figure>
                `).join("")}
              </div>
            </div>
            <button class="culture-gallery__arrow" type="button" data-culture-next aria-label="Show next frontline image">→</button>
          </div>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">Why you may be a good fit</p>
            <h2 class="phw-g-h2-dark">This path may fit you.</h2>
            <p class="section-lede">Look for signals that match how you like to work.</p>
          </div>
          <div class="page-check-list">${fitSignals.map((item) => `<span>✓ ${item}</span>`).join("")}</div>
        </div>
      </section>
      ${closingCta({
        title: "Explore frontline work.",
        copy: "Search openings or save your interest for future roles.",
        primary: button("Search frontline jobs", "../search-results.html", "primary"),
        secondary: button("Save your interest", "../talent-community.html", "secondary")
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
  ${pageHero({ eyebrow: "Career Site Highlights", title: "Explore ways to learn, compare, and connect.", copy: "Review paths for jobs, benefits, belonging, and talent community journeys." })}
  ${careerAreasWidget()}${benefitsWidget()}${talentCommunityWidget()}
`;
