import { jobs, navItems } from "../data/site-data.js";

export const icon = (label = "•") => `<span aria-hidden="true">${label}</span>`;

const workingHereLinks = [
  ["Life & Culture", "life.html"],
  ["Benefits & Wellbeing", "benefits.html"],
  ["Inclusion & Belonging", "life.html#culture"],
  ["Career Growth", "life.html#growth"],
  ["Employee Stories", "life.html#stories"],
  ["Events & Hiring Experiences", "events.html"]
];

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

function savedJobCount() {
  try {
    return JSON.parse(localStorage.getItem("career-template-saved") || "[]").length;
  } catch {
    return 0;
  }
}

function savedJobsLabel(compact = false) {
  const count = savedJobCount();
  const countText = count > 0 ? ` (${count})` : "";
  return compact && count > 0 ? `Saved <span class="utility-count">${count}</span>` : `♡ Saved Jobs${countText}`;
}

export function button(label, href = "#", variant = "primary", extra = "") {
  return `<a class="btn btn--${variant} ${extra}" href="${normalizeHref(href)}">${label}</a>`;
}

export function badge(label, type = "") {
  return `<span class="badge ${type ? `badge--${type}` : ""}">${label}</span>`;
}

export function header(active = "") {
  const prefix = inPages() ? "../" : "";
  const primaryNav = navItems
    .filter(([label]) => label !== "Working Here")
    .map(([label, href]) => `<a class="primary-nav__link" href="${prefix}pages/${href}" ${active === href ? 'aria-current="page"' : ""}>${label}</a>`)
    .join("");
  const workingHereActive = ["life.html", "benefits.html", "events.html"].includes(active);
  const workingLinks = workingHereLinks
    .map(([label, href]) => `<a href="${prefix}pages/${href}">${label}</a>`)
    .join("");
  const utilitySavedHref = `${prefix}pages/saved-jobs.html`;
  const utilityLanguage = `
    <div class="utility-menu">
      <button class="utility-link utility-link--button" type="button" data-dropdown-trigger="language" aria-expanded="false" aria-controls="language-menu" aria-label="Choose language">
        <span aria-hidden="true">🌐</span><span>EN</span><span class="nav-chevron" aria-hidden="true"></span>
      </button>
      <div class="nav-dropdown nav-dropdown--small" id="language-menu" data-dropdown-menu="language" hidden>
        <button type="button" lang="en">English</button>
        <button type="button" lang="es">Spanish</button>
        <button type="button" lang="fr">French</button>
      </div>
    </div>
  `;
  const utilityLinks = `
    ${utilityLanguage}
    <a class="utility-link" href="${utilitySavedHref}" data-saved-link>${savedJobsLabel()}</a>
    <button class="btn btn--primary btn--small header-signin" type="button" aria-label="Sign in to candidate profile">Sign In</button>
  `;

  return `
    <header class="site-header">
      <div class="container site-header__bar">
        <a class="brand-mark" href="${prefix}index.html" aria-label="Company career home">
          <span class="brand-mark__text">Company | Career</span>
        </a>
        <nav class="primary-nav" id="primary-navigation" aria-label="Primary navigation">
          <div class="nav-menu">
            <button class="primary-nav__link primary-nav__button" type="button" data-dropdown-trigger="working-here" aria-expanded="false" aria-controls="working-here-menu" ${workingHereActive ? 'aria-current="page"' : ""}>
              Working Here
              <span class="nav-chevron" aria-hidden="true"></span>
            </button>
            <div class="nav-dropdown" id="working-here-menu" data-dropdown-menu="working-here" hidden>
              ${workingLinks}
            </div>
          </div>
          ${primaryNav}
        </nav>
        <div class="utility-nav" aria-label="Utility navigation">
          ${utilityLinks}
        </div>
        <a class="mobile-search-link" href="${prefix}pages/search-results.html" aria-label="Search jobs">Search</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-drawer">
          <span class="sr-only">Toggle navigation</span>
        </button>
      </div>
      <div class="mobile-drawer" id="mobile-drawer" hidden>
        <nav class="mobile-drawer__nav" aria-label="Mobile navigation">
          <button class="mobile-drawer__link mobile-drawer__button" type="button" data-mobile-submenu-trigger aria-expanded="false" aria-controls="mobile-working-here">
            Working Here <span aria-hidden="true">⌄</span>
          </button>
          <div class="mobile-submenu" id="mobile-working-here" hidden>
            ${workingLinks}
          </div>
          ${navItems.filter(([label]) => label !== "Working Here").map(([label, href]) => `<a class="mobile-drawer__link" href="${prefix}pages/${href}">${label}</a>`).join("")}
          <hr>
          <a class="mobile-drawer__link" href="${utilitySavedHref}" data-saved-link data-saved-mobile>${savedJobsLabel(true)}</a>
          <button class="btn btn--primary" type="button">Sign In</button>
          <div class="mobile-language" aria-label="Language selector">
            <span>Language</span>
            <button type="button" class="utility-link utility-link--button is-active" aria-pressed="true">English</button>
            <button type="button" class="utility-link utility-link--button">Spanish</button>
            <button type="button" class="utility-link utility-link--button">French</button>
          </div>
          <hr>
          ${button("Join Talent Community", `${prefix}pages/talent-community.html`, "secondary")}
        </nav>
      </div>
    </header>
  `;
}

export function footer() {
  const prefix = inPages() ? "../" : "";
  const footerLinks = {
    "Search Jobs": "search-results.html",
    "Frontline Roles": "career-areas.html",
    "Corporate Roles": "career-areas.html",
    "Operations Roles": "career-areas.html",
    "Early Careers": "early-careers.html",
    Leadership: "career-areas.html",
    Internships: "early-careers.html",
    "Career Areas": "career-areas.html",
    Locations: "locations.html",
    Events: "events.html",
    "Life at Work": "life.html",
    "Employee Stories": "life.html#stories",
    "Our Culture": "life.html",
    "How We Hire": "accessibility-help.html",
    "FAQs & Tips": "accessibility-help.html",
    Benefits: "benefits.html",
    "Benefits & Wellbeing": "benefits.html",
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
    ["Discover", ["Search Jobs", "Frontline Roles", "Corporate Roles", "Operations Roles", "Early Careers", "Leadership", "Internships", "Events", "Talent Community"]],
    ["Who We Are", ["Employee Stories", "Our Culture", "Benefits & Wellbeing", "Belonging", "How We Hire", "Growth", "FAQs & Tips"]]
  ];
  const socialLinks = [
    {
      label: "Facebook",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.2V6.6c0-.8.5-1 1-1h1.7V2.7A22 22 0 0 0 14.2 2c-2.5 0-4.2 1.5-4.2 4.3v1.9H7.2v3.3H10V22h3.5V11.5h2.8l.4-3.3H14Z"/></svg>`
    },
    {
      label: "Instagram",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 3A2.8 2.8 0 0 0 5 7.8v8.4A2.8 2.8 0 0 0 7.8 19h8.4a2.8 2.8 0 0 0 2.8-2.8V7.8A2.8 2.8 0 0 0 16.2 5H7.8Zm8.7 1.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Z"/></svg>`
    },
    {
      label: "LinkedIn",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.9 8.9H3.3V22h3.6V8.9ZM5.1 2a2.1 2.1 0 1 0 0 4.2A2.1 2.1 0 0 0 5.1 2Zm6.2 6.9H7.9V22h3.6v-6.5c0-1.7.3-3.4 2.5-3.4 2.1 0 2.1 2 2.1 3.5V22h3.6v-7.2c0-3.5-.8-6.2-4.9-6.2-2 0-3.3 1.1-3.8 2.1h-.1V8.9Z"/></svg>`
    },
    {
      label: "YouTube",
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31.1 31.1 0 0 0 2 12a31.1 31.1 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.1 31.1 0 0 0 22 12a31.1 31.1 0 0 0-.4-4.8ZM10 15.3V8.7l5.8 3.3L10 15.3Z"/></svg>`
    }
  ];

  return `
    <footer class="site-footer">
      <div class="container footer-shell">
        <div class="footer-main">
          <div class="footer-brand">
            <a class="brand-mark" href="${prefix}index.html">
              <span class="brand-mark__text">Company | Career</span>
            </a>
            <p>Explore roles, culture, benefits, and support for every step of your search.</p>
            <nav class="footer-social" aria-label="Social links">
              ${socialLinks.map(({ label, icon }) => `<a href="${prefix}pages/talent-community.html" aria-label="${label}">${icon}</a>`).join("")}
            </nav>
          </div>
          <div class="footer-columns">
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
        </div>
        <div class="footer-bottom">
          <p>Copyright © 2026 Company | Career.</p>
          <nav class="footer-legal" aria-label="Legal links">
            <a href="${prefix}pages/accessibility-help.html">Privacy Policy</a>
            <a href="${prefix}pages/accessibility-help.html">Terms of Use</a>
            <a href="${prefix}pages/search-results.html">Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  `;
}

export function pageHero({ eyebrow, title, copy, action = "", image = "", imageAlt = "", theme = "", layout = "", tags = [] }) {
  const themeClass = theme === "inverse" ? " page-hero--inverse" : "";
  const layoutClass = layout ? ` page-hero--${layout}` : "";

  if (image) {
    return `
    <section class="page-hero page-hero--with-image${themeClass}${layoutClass}">
      <div class="container page-hero__grid">
        <div class="page-hero__content">
          <p class="eyebrow">${eyebrow}</p>
          <h1 class="phw-g-h1-primary">${title}</h1>
          <p class="section-lede">${copy}</p>
          ${action}
        </div>
        <div class="page-hero__media">
          <img src="${image}" alt="${imageAlt}">
        </div>
      </div>
    </section>
  `;
  }

  if (layout === "job-detail") {
    return `
    <section class="page-hero${themeClass}${layoutClass}">
      <div class="container page-hero__grid">
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h1 class="phw-g-h1-primary">${title}</h1>
          <p class="section-lede">${copy}</p>
          ${tags.length ? `<div class="page-hero__tags">${tags.map((tag) => badge(tag)).join("")}</div>` : ""}
        </div>
        <div class="page-hero__content">
          ${action}
        </div>
      </div>
    </section>
  `;
  }

  return `
    <section class="page-hero${themeClass}${layoutClass}">
      <div class="container page-hero__grid">
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h1 class="phw-g-h1-primary">${title}</h1>
        </div>
        <div class="page-hero__content">
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

export function simpleCard([title, copy, _meta, cta], iconText = "●") {
  return `
    <article class="card">
      <div class="card__icon">${iconText}</div>
      <h3>${title}</h3>
      <p>${copy}</p>
      ${cta ? `<a class="card__link" href="${pagePath("career-areas.html")}">${cta}<span aria-hidden="true">→</span></a>` : ""}
    </article>
  `;
}

export function jobCard(job, rich = false) {
  const jobHref = pagePath("job-description.html");
  return `
    <article class="job-card" data-job-card data-category="${job.category}" data-schedule="${job.schedule}" data-work-type="${job.workType}" data-level="${job.level}" data-location="${job.location}" data-shift="${job.shift}">
      <div class="job-card__top">
        <div>
          <p class="eyebrow">${job.department}</p>
          <h3><a href="${jobHref}?job=${job.id}">${job.title}</a></h3>
        </div>
        <div>
          <button class="icon-button" type="button" data-save="${job.id}" aria-pressed="false" aria-label="Save ${job.title}">♡</button>
        </div>
      </div>
      <div class="job-card__meta">
        <span>${job.location}</span><span>•</span><span>${job.schedule}</span><span>•</span><span>${job.workType}</span>${rich ? `<span>•</span><span>${job.compensation}</span>` : ""}
      </div>
      <p>${job.summary}</p>
      <div class="job-card__actions">
        ${button("Apply now →", jobHref, "primary")}
        ${button("View Details", jobHref, "secondary")}
      </div>
    </article>
  `;
}

export function jobsList(items = jobs, rich = false) {
  return `<div class="job-list" data-job-list>${items.map((job) => jobCard(job, rich)).join("")}</div>`;
}

export function accordion(items) {
  return `<div class="accordion" data-accordion>${items.map(([title, copy], index) => `
    <div class="accordion__item ${index === 0 ? "is-open" : ""}">
      <button class="accordion__button" type="button" aria-expanded="${index === 0 ? "true" : "false"}" aria-controls="accordion-panel-${index}">
        <span>${title}</span><span class="accordion__icon" aria-hidden="true">${index === 0 ? "x" : "+"}</span>
      </button>
      <div class="accordion__panel" id="accordion-panel-${index}" aria-hidden="${index === 0 ? "false" : "true"}">${copy}</div>
    </div>
  `).join("")}</div>`;
}
