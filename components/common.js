import { jobs, navItems } from "../data/site-data.js";

export const icon = (label = "•") => `<span aria-hidden="true">${label}</span>`;
const lucideIcon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

const workingHereLinks = [
  ["Life & Culture", "life.html"],
  ["Benefits & Wellbeing", "benefits.html"],
  ["Inclusion & Belonging", "inclusion-belonging.html"]
];

function inPages() {
  return window.location.pathname.includes("/pages/");
}

function pageDepthPrefix() {
  const path = window.location.pathname;
  if (!path.includes("/pages/")) return "";
  const relativePath = path.split("/pages/")[1] || "";
  const depth = relativePath.split("/").filter(Boolean).length - 1;
  return depth > 0 ? "../".repeat(depth) : "";
}

function rootPrefix() {
  return inPages() ? `../${pageDepthPrefix()}` : "";
}

function pagePath(file) {
  if (!inPages()) return `pages/${file}`;
  return `${pageDepthPrefix()}${file}`;
}

function normalizeHref(href) {
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return href;
  if (href.startsWith("pages/") && inPages()) return `${pageDepthPrefix()}${href.replace("pages/", "")}`;
  if (inPages() && !href.startsWith("../") && !href.startsWith("/")) return `${pageDepthPrefix()}${href}`;
  return href;
}

export function button(label, href = "#", variant = "primary", extra = "") {
  return `<a class="btn btn--${variant} ${extra}" href="${normalizeHref(href)}">${label}</a>`;
}

export function badge(label, type = "") {
  return `<span class="badge ${type ? `badge--${type}` : ""}">${label}</span>`;
}

export function header(active = "") {
  const prefix = rootPrefix();
  const primaryNav = navItems
    .filter(([label]) => !["Working Here", "Career Areas", "Locations", "Search Jobs"].includes(label))
    .map(([label, href]) => `<a class="primary-nav__link" href="${prefix}pages/${href}" ${active === href ? 'aria-current="page"' : ""}>${label}</a>`)
    .join("");
  const workingHereActive = ["life.html", "benefits.html", "inclusion-belonging.html"].includes(active);
  const careerAreasActive = active === "career-areas.html";
  const locationsActive = active === "locations.html";
  const searchJobsActive = active === "search-results.html";
  const workingLinks = workingHereLinks
    .map(([label, href]) => `<a href="${prefix}pages/${href}">${label}</a>`)
    .join("");
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
    <button class="btn btn--secondary btn--small header-signin" type="button" aria-label="Sign in to candidate profile">Sign In</button>
    <a class="btn btn--primary btn--small header-search-jobs" href="${prefix}pages/search-results.html" ${searchJobsActive ? 'aria-current="page"' : ""}>Search Jobs</a>
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
          <a class="primary-nav__link" href="${prefix}pages/career-areas.html" ${careerAreasActive ? 'aria-current="page"' : ""}>Career Areas</a>
          <a class="primary-nav__link" href="${prefix}pages/locations.html" ${locationsActive ? 'aria-current="page"' : ""}>Locations</a>
          ${primaryNav}
        </nav>
        <div class="utility-nav" aria-label="Utility navigation">
          ${utilityLinks}
        </div>
        <a class="mobile-search-link" href="${prefix}pages/search-results.html" aria-label="Search jobs">Search Jobs</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Toggle navigation">
          <span class="menu-toggle__bar" aria-hidden="true"></span>
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
          <a class="mobile-drawer__link" href="${prefix}pages/career-areas.html">Career Areas</a>
          <a class="mobile-drawer__link" href="${prefix}pages/locations.html">Locations</a>
          ${navItems.filter(([label]) => !["Working Here", "Career Areas", "Locations", "Search Jobs"].includes(label)).map(([label, href]) => `<a class="mobile-drawer__link" href="${prefix}pages/${href}">${label}</a>`).join("")}
          <hr>
          <button class="btn btn--secondary" type="button">Sign In</button>
          <div class="mobile-language" aria-label="Language selector">
            <button class="mobile-drawer__link mobile-drawer__button" type="button" data-mobile-submenu-trigger aria-expanded="false" aria-controls="mobile-language-menu">
              Language <span aria-hidden="true">⌄</span>
            </button>
            <div class="mobile-submenu mobile-submenu--language" id="mobile-language-menu" hidden>
              <button type="button" class="utility-link utility-link--button is-active" aria-pressed="true" data-mobile-language-option>English</button>
              <button type="button" class="utility-link utility-link--button" data-mobile-language-option>Spanish</button>
              <button type="button" class="utility-link utility-link--button" data-mobile-language-option>French</button>
            </div>
          </div>
          <hr>
          ${button("Join Talent Community", "talent-community.html", "secondary")}
        </nav>
      </div>
    </header>
  `;
}

export function footer() {
  const prefix = rootPrefix();
  const footerLinks = {
    "Search Jobs": "search-results.html",
    "Frontline Roles": "career-areas/frontline-workers.html",
    "Corporate Roles": "career-areas/corporate-shared-services.html",
    "Operations Roles": "career-areas/operations-logistics.html",
    "Early Careers": "early-careers.html",
    Leadership: "career-areas/leadership.html",
    Internships: "early-careers.html",
    "Career Areas": "career-areas.html",
    Locations: "locations.html",
    "Life at Work": "life.html",
    "Inclusion & Belonging": "inclusion-belonging.html",
    "Our Culture": "life.html",
    "How We Hire": "accessibility-help.html",
    "FAQs & Tips": "accessibility-help.html",
    Benefits: "benefits.html",
    "Benefits & Wellbeing": "benefits.html",
    Belonging: "inclusion-belonging.html",
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
    ["Discover", ["Search Jobs", "Frontline Roles", "Corporate Roles", "Operations Roles", "Early Careers", "Leadership", "Internships", "Talent Community"]],
    ["Who We Are", ["Life at Work", "Our Culture", "Benefits & Wellbeing", "Inclusion & Belonging", "How We Hire", "FAQs & Tips"]]
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
            <a class="brand-mark" href="${prefix}index.html" aria-label="Company career home">
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

export function jobMatchModal() {
  return `
    <div class="job-match-modal" data-job-match-modal hidden>
      <div class="job-match-modal__backdrop" data-job-match-close></div>
      <section class="job-match-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="job-match-title" aria-describedby="job-match-copy">
        <button class="job-match-modal__back" type="button" data-job-match-back aria-label="Go back">‹</button>
        <button class="job-match-modal__skip" type="button" data-job-match-skip>Skip</button>
        <div class="job-match-modal__content" data-job-match-step="choice">
          <p class="eyebrow">Personalized Job Match</p>
          <h2 id="job-match-title">Choose your path.</h2>
          <p id="job-match-copy">Use your resume for a faster match, or answer a few questions manually.</p>
          <div class="job-match-modal__choices" role="group" aria-label="Choose matching method">
            <button class="btn btn--primary" type="button">Use My Resume</button>
            <span>or</span>
            <button class="btn btn--secondary" type="button" data-job-match-answer>Answer Questions</button>
          </div>
          <label class="checkbox-field job-match-modal__updates">
            <input type="checkbox">
            <span>Sign me up for company updates</span>
          </label>
        </div>
        <div class="job-match-modal__content job-match-modal__content--login" data-job-match-step="login" hidden>
          <p class="eyebrow">Save Your Progress</p>
          <h2>Sign in to save your information for future visits.</h2>
          <p>We take your privacy seriously. We never post anything to your social accounts.</p>
          <div class="job-match-modal__social" aria-label="Sign in options">
            <button type="button" data-job-match-interests aria-label="Continue with LinkedIn">in</button>
            <button type="button" data-job-match-interests aria-label="Continue with Facebook">f</button>
            <button type="button" data-job-match-interests aria-label="Continue with Google">G</button>
          </div>
          <button class="btn btn--secondary btn--small" type="button" data-job-match-interests>Skip for now</button>
        </div>
        <div class="job-match-modal__content job-match-modal__content--departments" data-job-match-step="departments" hidden>
          <p class="eyebrow">Step 1 Of 5</p>
          <h2>What are you interested in?</h2>
          <p>Select one or more departments so we can recommend roles that fit your goals.</p>
          <div class="job-match-modal__departments" role="group" aria-label="Departments of interest">
            ${["Customer & Frontline", "Operations & Supply", "Care & Wellness", "Technology & Data", "Corporate & Shared Services", "People & HR", "Finance & Accounting", "Sales & Client Support", "Early Careers"].map((department) => `
              <button type="button" aria-pressed="false" data-job-match-department>${department}</button>
            `).join("")}
          </div>
          <button class="btn btn--primary job-match-modal__next" type="button" data-job-match-departments-next disabled>Next</button>
          <div class="job-match-modal__progress" aria-label="Step 1 of 5">
            <span><i></i></span>
            <strong>Step 1 of 5</strong>
          </div>
        </div>
        <div class="job-match-modal__content job-match-modal__content--title" data-job-match-step="job-title" hidden>
          <p class="eyebrow">Step 2 Of 5</p>
          <h2>What is your most recent job title?</h2>
          <div class="job-match-modal__form">
            <div class="field">
              <label for="job-match-title-input">Your most recent job title</label>
              <input id="job-match-title-input" type="text" placeholder="Your most recent job title" data-job-match-title-input>
            </div>
            <label class="checkbox-field job-match-modal__career-start">
              <input type="checkbox" data-job-match-career-start>
              <span>Just starting my career</span>
            </label>
          </div>
          <button class="btn btn--primary job-match-modal__next" type="button" data-job-match-title-next disabled>Next</button>
          <div class="job-match-modal__progress job-match-modal__progress--step-2" aria-label="Step 2 of 5">
            <span><i></i></span>
            <strong>Step 2 of 5</strong>
          </div>
        </div>
        <div class="job-match-modal__content job-match-modal__content--skills" data-job-match-step="skills" hidden>
          <p class="eyebrow">Step 3 Of 5</p>
          <h2>Tell us what you’re really good at.</h2>
          <div class="job-match-modal__form">
            <div class="field">
              <label for="job-match-skills-input">Your skills</label>
              <div class="job-match-modal__skill-field">
                <div class="job-match-modal__skill-input" data-job-match-skill-input aria-live="polite">
                <div class="job-match-modal__skill-tags" data-job-match-skill-tags></div>
                  <input id="job-match-skills-input" type="search" placeholder="Search skills" autocomplete="off" data-job-match-skill-search aria-controls="job-match-skills-list" aria-expanded="false">
                </div>
                <div class="job-match-modal__skill-dropdown" id="job-match-skills-list" data-job-match-skill-dropdown hidden></div>
              </div>
            </div>
          </div>
          <button class="btn btn--primary job-match-modal__next" type="button" data-job-match-skills-next disabled>Next</button>
          <div class="job-match-modal__progress job-match-modal__progress--step-3" aria-label="Step 3 of 5">
            <span><i></i></span>
            <strong>Step 3 of 5</strong>
          </div>
        </div>
        <div class="job-match-modal__content job-match-modal__content--experience" data-job-match-step="experience" hidden>
          <p class="eyebrow">Step 4 Of 5</p>
          <h2>How experienced are you?</h2>
          <div class="job-match-modal__experience" role="group" aria-label="Years of experience">
            ${["0-3", "4-8", "9-14", "15+"].map((range) => `
              <button type="button" aria-pressed="false" data-job-match-experience>
                <strong>${range}</strong>
                <span>Years</span>
              </button>
            `).join("")}
          </div>
          <button class="btn btn--primary job-match-modal__next" type="button" data-job-match-experience-next disabled>Next</button>
          <div class="job-match-modal__progress job-match-modal__progress--step-4" aria-label="Step 4 of 5">
            <span><i></i></span>
            <strong>Step 4 of 5</strong>
          </div>
        </div>
        <div class="job-match-modal__content job-match-modal__content--location" data-job-match-step="location" hidden>
          <p class="eyebrow">Step 5 Of 5</p>
          <h2>What is your preferred location?</h2>
          <div class="job-match-modal__form">
            <div class="field">
              <label for="job-match-location-input">Your preferred work location</label>
              <input id="job-match-location-input" type="text" placeholder="Your preferred work location" data-job-match-location-input>
            </div>
          </div>
          <button class="btn btn--primary job-match-modal__next" type="button" data-job-match-location-next disabled>Next</button>
          <div class="job-match-modal__progress job-match-modal__progress--step-5" aria-label="Step 5 of 5">
            <span><i></i></span>
            <strong>Step 5 of 5</strong>
          </div>
        </div>
        <div class="job-match-modal__content job-match-modal__content--no-match" data-job-match-step="no-match" hidden>
          <p class="eyebrow">No Matches Yet</p>
          <h2>We do not have a perfect match right now.</h2>
          <p>Share a few contact details or upload your resume, and our team can reach out when a role fits your profile.</p>
          <div class="job-match-modal__form job-match-modal__lead-form">
            <div class="field">
              <label for="job-match-lead-email">Email <span aria-hidden="true">*</span></label>
              <input id="job-match-lead-email" type="email" placeholder="Enter your email" autocomplete="email" data-job-match-lead-email required>
            </div>
            <div class="job-match-modal__lead-grid">
              <div class="field">
                <label for="job-match-lead-first-name">First name</label>
                <input id="job-match-lead-first-name" type="text" placeholder="Enter your first name" autocomplete="given-name">
              </div>
              <div class="field">
                <label for="job-match-lead-last-name">Last name</label>
                <input id="job-match-lead-last-name" type="text" placeholder="Enter your last name" autocomplete="family-name">
              </div>
            </div>
            <div class="field">
              <label for="job-match-lead-phone">Phone number</label>
              <div class="job-match-modal__phone-row">
                <select aria-label="Phone code">
                  <option>Code</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+61</option>
                  <option>+91</option>
                </select>
                <input id="job-match-lead-phone" type="tel" placeholder="Enter your phone number" autocomplete="tel">
              </div>
            </div>
            <label class="btn btn--primary job-match-modal__resume-upload">
              <input type="file" accept=".pdf,.doc,.docx" data-job-match-resume>
              ${lucideIcon("upload")}
              <span>Upload resume</span>
            </label>
          </div>
          <div class="job-match-modal__footer-actions">
            <button class="btn btn--primary job-match-modal__done" type="button" data-job-match-done disabled>Done</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function resumeMatchModal() {
  return `
    <div class="resume-match-modal" data-resume-match-modal hidden>
      <div class="resume-match-modal__backdrop" data-resume-match-close></div>
      <section class="resume-match-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="resume-match-modal-title" aria-describedby="resume-match-modal-copy">
        <div class="resume-match-modal__header">
          <h2 id="resume-match-modal-title">Find better job matches with your resume</h2>
          <button class="resume-match-modal__close" type="button" data-resume-match-close aria-label="Close resume match">×</button>
        </div>
        <div class="resume-match-modal__body">
          <p id="resume-match-modal-copy">Your resume helps us recommend jobs that match your skills and experience.</p>
          <label class="resume-dropzone" for="resume-match-upload" data-resume-dropzone>
            <input id="resume-match-upload" type="file" accept=".pdf,.doc,.docx,.txt" data-resume-match-file>
            <span class="resume-dropzone__icon" aria-hidden="true">
              ${lucideIcon("upload")}
            </span>
            <span class="resume-dropzone__main">Drop resume file here or <strong>select a file to upload</strong></span>
            <span class="resume-dropzone__hint" data-resume-match-file-name>PDF, DOC, DOCX, and TXT files are supported, up to 1MB.</span>
          </label>
          <label class="checkbox-field resume-match-modal__consent">
            <input type="checkbox" data-resume-match-consent>
            <span>I have read and accept the <a href="${pagePath("accessibility-help.html")}">privacy policy</a> and <a href="${pagePath("accessibility-help.html")}">terms of use</a> <strong aria-hidden="true">*</strong></span>
          </label>
          <div class="resume-match-modal__actions">
            <button class="btn btn--secondary" type="button" data-resume-match-close>Cancel</button>
            <button class="btn btn--primary" type="button" data-resume-match-submit disabled>Get My Matches</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function videoStoryModal() {
  return `
    <div class="video-story-modal" data-video-story-modal hidden>
      <div class="video-story-modal__backdrop" data-video-story-close></div>
      <section class="video-story-modal__dialog" role="dialog" aria-modal="true" aria-label="Video story">
        <div class="video-story-modal__header">
          <button class="video-story-modal__close" type="button" data-video-story-close aria-label="Close video">×</button>
        </div>
        <div class="video-story-modal__frame">
          <img src="" alt="" data-video-story-image>
          <span class="video-story-modal__play" aria-hidden="true">▶</span>
        </div>
      </section>
    </div>
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

export function simpleCard([title, copy, _meta, cta, href = "career-areas.html"], iconText = "●") {
  return `
    <article class="card">
      <div class="card__icon">${iconText}</div>
      <h3>${title}</h3>
      <p>${copy}</p>
      ${cta ? `<a class="card__link" href="${pagePath(href)}">${cta}<span aria-hidden="true">→</span></a>` : ""}
    </article>
  `;
}

export function jobCard(job, rich = false) {
  const jobHref = `${pagePath("job-description.html")}?job=${encodeURIComponent(job.id)}`;
  const tags = [job.category, job.schedule, job.workType, job.level, job.location, job.department, ...(job.tags || [])].join(" ").toLowerCase();
  return `
    <article class="job-card" data-job-card data-category="${job.category}" data-schedule="${job.schedule}" data-work-type="${job.workType}" data-level="${job.level}" data-location="${job.location}" data-shift="${job.shift}" data-tags="${tags}">
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
