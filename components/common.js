import { jobs, navItems } from "../data/site-data.js";

export const icon = (label = "•") => `<span aria-hidden="true">${label}</span>`;

function inPages() {
  return window.location.pathname.includes("/pages/");
}

function pagePath(file) {
  return inPages() ? file : `pages/${file}`;
}

function normalizeHref(href) {
  if (href.startsWith("pages/") && inPages()) return href.replace("pages/", "");
  return href;
}

export function button(label, href = "#", variant = "primary", extra = "") {
  return `<a class="btn btn--${variant} ${extra}" href="${normalizeHref(href)}">${label}</a>`;
}

export function badge(label, type = "") {
  return `<span class="badge ${type ? `badge--${type}` : ""}">${label}</span>`;
}

export function header(active = "") {
  const prefix = inPages() ? "../" : "";
  const nav = navItems
    .map(([label, href]) => `<a href="${prefix}pages/${href}" ${active === href ? 'aria-current="page"' : ""}>${label}</a>`)
    .join("");

  return `
    <header class="site-header">
      <div class="container site-header__bar">
        <a class="brand-mark" href="${prefix}index.html" aria-label="Career platform template home">
          <span class="brand-mark__symbol">CT</span>
          <span class="brand-mark__text">Career Template<span>Employer Brand Platform</span></span>
        </a>
        <nav class="primary-nav" id="primary-navigation" aria-label="Primary navigation">${nav}</nav>
        <div class="header-actions">
          ${button("Search Jobs", `${prefix}pages/search-results.html`, "primary", "btn--small")}
          ${button("Join Talent Community", `${prefix}pages/talent-community.html`, "secondary", "btn--small")}
        </div>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
          <span class="sr-only">Toggle navigation</span>
        </button>
      </div>
    </header>
  `;
}

export function footer() {
  const prefix = inPages() ? "../" : "";
  const footerLinks = {
    "Search Jobs": "search-results.html",
    "Career Areas": "career-areas.html",
    Locations: "locations.html",
    Events: "events.html",
    "Life at Work": "life.html",
    Benefits: "benefits.html",
    Growth: "life.html",
    Belonging: "life.html",
    Accessibility: "accessibility-help.html",
    "Application Support": "accessibility-help.html",
    "Saved Jobs": "saved-jobs.html",
    "Talent Community": "talent-community.html",
    "Social Placeholder": "talent-community.html",
    "Recruiting Updates": "talent-community.html",
    "Contact Support": "accessibility-help.html",
    Privacy: "accessibility-help.html"
  };
  const columns = [
    ["Explore", ["Search Jobs", "Career Areas", "Locations", "Events"]],
    ["Working Here", ["Life at Work", "Benefits", "Growth", "Belonging"]],
    ["Candidate Help", ["Accessibility", "Application Support", "Saved Jobs", "Talent Community"]],
    ["Connect", ["Social Placeholder", "Recruiting Updates", "Contact Support", "Privacy"]]
  ];

  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand-mark" href="${prefix}index.html">
            <span class="brand-mark__symbol">CT</span>
            <span class="brand-mark__text">Career Template<span>Human, modular, conversion ready</span></span>
          </a>
          <p>Reusable employer brand and job discovery patterns built to help candidates understand fit, trust the process, and keep moving.</p>
        </div>
        ${columns.map(([title, links]) => `
          <div>
            <h2 class="sr-only">${title}</h2>
            <strong>${title}</strong>
            <nav class="footer-links" aria-label="${title}">
              ${links.map((link) => `<a href="${prefix}pages/${footerLinks[link] || "search-results.html"}">${link}</a>`).join("")}
            </nav>
          </div>
        `).join("")}
      </div>
    </footer>
  `;
}

export function pageHero({ eyebrow, title, copy, action = "" }) {
  return `
    <section class="page-hero">
      <div class="container page-hero__grid">
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h1 class="phw-g-h1-primary">${title}</h1>
        </div>
        <div>
          <p class="section-lede">${copy}</p>
          ${action}
        </div>
      </div>
    </section>
  `;
}

export function sectionHeader(eyebrow, title, copy = "") {
  return `
    <div class="section-header">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
      </div>
      ${copy ? `<p>${copy}</p>` : "<span></span>"}
    </div>
  `;
}

export function simpleCard([title, copy, meta, cta], iconText = "●") {
  return `
    <article class="card">
      <div class="card__icon">${iconText}</div>
      <h3>${title}</h3>
      <p>${copy}</p>
      ${meta ? `<p><strong>${meta}</strong></p>` : ""}
      ${cta ? `<a class="card__link" href="${pagePath("career-areas.html")}">${cta} →</a>` : ""}
    </article>
  `;
}

export function jobCard(job, rich = false) {
  const jobHref = pagePath("job-description.html");
  const tags = job.tags.map((tag) => badge(tag, tag.includes("Urgent") ? "danger" : tag.includes("Remote") || tag.includes("Hybrid") ? "success" : "")).join("");
  return `
    <article class="job-card" data-job-card data-category="${job.category}" data-schedule="${job.schedule}" data-work-type="${job.workType}" data-level="${job.level}" data-location="${job.location}" data-shift="${job.shift}">
      <div class="job-card__top">
        <div>
          <p class="eyebrow">${job.department}</p>
          <h3><a href="${jobHref}?job=${job.id}">${job.title}</a></h3>
        </div>
        <div>
          <button class="icon-button" type="button" data-save="${job.id}" aria-pressed="false" aria-label="Save ${job.title}">♡</button>
          <button class="icon-button" type="button" data-share="${job.id}" aria-label="Share ${job.title}">↗</button>
        </div>
      </div>
      <div class="job-card__meta">
        <span>${job.location}</span><span>•</span><span>${job.schedule}</span><span>•</span><span>${job.workType}</span>${rich ? `<span>•</span><span>${job.compensation}</span>` : ""}
      </div>
      <p>${job.summary}</p>
      <div class="tabs" aria-label="Job highlights">${tags}</div>
      <div class="job-card__actions">
        ${button("Quick Apply", jobHref, "primary")}
        ${button("View Details", jobHref, "secondary")}
      </div>
    </article>
  `;
}

export function jobsList(items = jobs, rich = false) {
  return `<div class="job-list" data-job-list>${items.map((job) => jobCard(job, rich)).join("")}</div>`;
}

export function accordion(items) {
  return `<div class="accordion">${items.map(([title, copy], index) => `
    <div class="accordion__item ${index === 0 ? "is-open" : ""}">
      <button class="accordion__button" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
        <span>${title}</span><span aria-hidden="true">+</span>
      </button>
      <div class="accordion__panel">${copy}</div>
    </div>
  `).join("")}</div>`;
}
