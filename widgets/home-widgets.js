import { benefits, careerAreas, evpPillars, jobs, locations, pathways, stories } from "../data/site-data.js";
import { button, jobCard, jobsList, sectionHeader, simpleCard } from "../components/common.js";

const asset = (file) => `${window.location.pathname.includes("/pages/") ? "../" : ""}assets/illustrations/${file}`;
const pageHref = (file) => `${window.location.pathname.includes("/pages/") ? "" : "pages/"}${file}`;
const lucideIcon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

const contentIcons = {
  frontline: lucideIcon("users"),
  corporate: lucideIcon("briefcase"),
  technology: lucideIcon("code-2"),
  healthcare: lucideIcon("heart-pulse"),
  operations: lucideIcon("workflow"),
  leadership: lucideIcon("crown"),
  early: lucideIcon("graduation-cap"),
  support: lucideIcon("messages-square"),
  growth: lucideIcon("trending-up"),
  purpose: lucideIcon("flag"),
  flexibility: lucideIcon("calendar-clock"),
  stability: lucideIcon("shield-check"),
  wellbeing: lucideIcon("heart-handshake"),
  belonging: lucideIcon("users-round"),
  location: lucideIcon("map-pin")
};

export function heroSearchWidget() {
  return `
    <section class="hero" id="top">
      <div class="container hero__grid">
        <div>
          <p class="eyebrow">Find Work That Feels Possible</p>
          <h1 class="phw-g-h1-primary">Find your next role with us.</h1>
          <p class="hero__copy">Search roles, explore teams, and see the support around the work.</p>
          <form class="smart-search" action="pages/search-results.html" aria-label="Job search">
            <div class="smart-search__grid">
              <div class="field"><label for="hero-keyword">Keyword</label><input id="hero-keyword" name="q" type="search" placeholder="Role, skill, or team"></div>
              <div class="field"><label for="hero-location">Location</label><input id="hero-location" name="location" type="search" placeholder="Region, remote, or hybrid"></div>
              <button class="btn btn--primary" type="submit">Search Jobs</button>
            </div>
          </form>
        </div>
        <aside class="hero-card" aria-label="Team collaboration image">
          <div class="hero-card__visual">
            <img src="${asset("career-hero-teamwork.png")}" alt="Coworkers collaborating in a bright modern office">
          </div>
        </aside>
      </div>
    </section>
  `;
}

export function candidatePathwaysWidget() {
  const pathwayIcons = [
    contentIcons.frontline,
    contentIcons.corporate,
    contentIcons.technology,
    contentIcons.healthcare,
    contentIcons.operations,
    contentIcons.leadership,
    contentIcons.early,
    contentIcons.support
  ];
  return `
    <section class="section">
      <div class="container">
        ${sectionHeader("Find your pathway", "Start where you see yourself.")}
        <div class="grid grid--4 airy-grid">${pathways.map(([title, copy, cta], i) => simpleCard([title, copy, "", cta, "career-areas/frontline-workers.html"], pathwayIcons[i])).join("")}</div>
      </div>
    </section>
  `;
}

export function featuredJobsWidget() {
  const tabs = ["All", "Nearby Jobs", "Recently Viewed", "New Opportunities"];
  const recommendationTags = [
    ["Nearby Jobs"],
    ["Recently Viewed", "New Opportunities"],
    ["New Opportunities"],
    ["Nearby Jobs"]
  ];
  const recommendations = jobs.slice(0, 4).map((job, index) => ({
    ...job,
    tags: [...recommendationTags[index], ...job.tags]
  }));

  return `
    <section class="section section--soft" id="job-recommendations">
      <div class="container feature-layout">
        <div>
          <p class="eyebrow">Job Recommendations For You</p>
          <h2 class="phw-g-h2-dark">Start with roles that fit.</h2>
          <p class="section-lede">Revisit relevant roles, spot nearby options, and catch new opportunities quickly.</p>
          ${button("View all jobs", "pages/search-results.html", "primary")}
        </div>
        <div data-filter-scope>
          <div class="tabs" role="tablist" aria-label="Job recommendation filters">${tabs.map((tab, index) => `<button class="tab" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" data-tab-filter="${tab}">${tab}</button>`).join("")}</div>
          ${jobsList(recommendations)}
        </div>
      </div>
    </section>
  `;
}

export function matchedJobsWidget() {
  const recommendationTabs = ["Browsing Based", "Recently Viewed", "New Opportunities", "Be the First"];
  const recommendationTags = ["Browsing Based", "Recently Viewed", "New Opportunities", "Be the First", "Recently Viewed", "New Opportunities"];
  const recommendations = jobs.map((job, index) => ({
    ...job,
    tags: [recommendationTags[index] || "Browsing Based", ...job.tags]
  }));

  return `
    <section class="job-detail-recommendations" data-match-recommendations hidden aria-labelledby="matched-job-title">
      <div class="job-detail-recommendations__inner">
        <h2 id="matched-job-title" class="phw-g-h2-dark">Job Recommendations for You</h2>
        <div data-filter-scope>
          <div class="tabs" role="tablist" aria-label="Matched job recommendation filters">
            ${recommendationTabs.map((tab, index) => `<button class="tab" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" data-tab-filter="${index === 0 ? "All" : tab}">${tab}</button>`).join("")}
          </div>
          <div class="job-detail-recommendations__grid">
            ${recommendations.map((job, index) => jobCard(job, true).replace(
              '<article class="job-card"',
              `<article class="job-card" data-similar-job-card${index > 2 ? ' data-similar-extra="true" hidden' : ""}`
            )).join("")}
          </div>
        </div>
        <button class="btn btn--secondary" type="button" data-similar-jobs-more>View More</button>
      </div>
    </section>
  `;
}

export function evpWidget() {
  const features = evpPillars.slice(0, 6);
  const evpIcons = [contentIcons.growth, contentIcons.purpose, contentIcons.flexibility, contentIcons.stability, contentIcons.wellbeing, contentIcons.belonging];
  return `
    <section class="section section--inverse">
      <div class="container evp-layout">
        <div class="evp-layout__intro">
          <p class="eyebrow">Why Work Here</p>
          <h2>Support you can evaluate.</h2>
          <p>See what support, growth, and day-to-day work can feel like here.</p>
          ${button("Explore benefits & wellbeing →", pageHref("benefits.html"), "secondary")}
        </div>
        <div class="evp-feature-grid" aria-label="Workplace support pillars">
          ${features.map(([title, copy], i) => `
            <article class="evp-feature-card">
              <span class="card__icon">${evpIcons[i]}</span>
              <h3>${title}</h3>
              <p>${copy}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

export function careerAreasWidget() {
  const areaIcons = [contentIcons.frontline, contentIcons.corporate, contentIcons.technology, contentIcons.healthcare, contentIcons.operations, contentIcons.early];
  const memberCounts = ["42 teams", "18 teams", "26 teams", "14 teams", "31 teams", "9 programs"];
  const positionCounts = ["8 roles", "6 roles", "7 roles", "5 roles", "6 roles", "3 roles"];
  const areaLinks = [
    "career-areas/frontline-workers.html",
    "career-areas/corporate-shared-services.html",
    "career-areas/technology-product.html",
    "career-areas/healthcare-care-support.html",
    "career-areas/operations-logistics.html",
    "career-areas/early-careers.html"
  ];
  return `
    <section class="section career-areas-section">
      <div class="container career-areas-panel">
        <div class="career-areas-heading">
          <p class="eyebrow">Career Areas</p>
          <h2>Explore by work style.</h2>
          <p>Choose the team environment that fits how you want to contribute.</p>
        </div>
        <div class="career-area-list">
          ${careerAreas.map(([title, copy], i) => `
            <a class="career-area-row" href="${pageHref(areaLinks[i])}">
              <span class="career-area-row__icon" aria-hidden="true">${areaIcons[i]}</span>
              <span class="career-area-row__content">
                <strong>${title}</strong>
                <small>${copy}</small>
              </span>
              <span class="career-area-row__meta">${memberCounts[i]}</span>
              <span class="career-area-row__pill">${positionCounts[i]}</span>
              <span class="career-area-row__chevron" aria-hidden="true">⌄</span>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

export function locationsWidget() {
  const serviceAreas = [
    ["North Region", "Hybrid hubs and field support teams."],
    ["Central Region", "Learning spaces and frontline opportunities."],
    ["East Region", "Care, support, and operations teams."],
    ["Southwest Region", "Growing operations and leadership paths."],
    ["Remote Eligible", "Core hours and collaboration clarity."]
  ];

  return `
    <section class="section section--soft location-service-section">
      <div class="container location-service-layout">
        <div class="location-service-copy">
          <p class="eyebrow">Discover our locations</p>
          <h2>Find roles around your life.</h2>
          <p>Browse regions, remote options, and flexibility cues that fit your day-to-day needs.</p>
          ${button("Search by location", "pages/search-results.html", "primary")}
        </div>
        <nav class="location-link-list" aria-label="Location links">
          ${serviceAreas.map(([title, copy]) => `
            <a href="${pageHref("locations/north-region.html")}">
              <span class="location-link-list__pin" aria-hidden="true">${contentIcons.location}</span>
              <span>
                <strong>${title}</strong>
                <small>${copy}</small>
              </span>
              <span class="location-link-list__arrow" aria-hidden="true">→</span>
            </a>
          `).join("")}
        </nav>
      </div>
    </section>
  `;
}

export function storiesWidget() {
  return `
    <section class="section" id="stories">
      <div class="container story-section">
        <div class="story-section__header">
          <p class="eyebrow">Some of our stories</p>
          <h2>Hear what made the work feel possible.</h2>
          <p>Short stories create trust without overwhelming the page.</p>
        </div>
        <div class="story-carousel" data-story-carousel aria-label="Employee stories carousel">
          <div class="story-carousel__viewport" aria-live="polite">
            ${stories.map((story, index) => `
              <article class="story-slide" data-story-slide ${index === 0 ? "" : "hidden"}>
                <div class="story-slide__image">
                  <img src="${asset(story.image)}" alt="${story.imageAlt}">
                </div>
                <div class="story-slide__content">
                  <p class="eyebrow">${story.role}</p>
                  <h3>${story.name}</h3>
                  <blockquote>“${story.quote}”</blockquote>
                </div>
              </article>
            `).join("")}
          </div>
          <div class="story-carousel__controls">
            <button class="story-carousel__arrow" type="button" data-story-prev aria-label="Show previous employee story">←</button>
            <span class="story-carousel__status" data-story-status>1 / ${stories.length}</span>
            <button class="story-carousel__arrow" type="button" data-story-next aria-label="Show next employee story">→</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function benefitsWidget() {
  const icons = ["heart-pulse", "clock", "shield-check", "calendar-clock", "circle-dollar-sign", "book-open", "users-round", "gift"].map(lucideIcon);

  return `
    <section class="section section--inverse benefits-feature-section">
      <div class="container benefits-feature-layout">
        <div class="benefits-feature-header">
          <p class="eyebrow">Benefits & Rewards</p>
          <h2>Benefits that support your life.</h2>
          <p>Clear rewards across care, flexibility, wellbeing, and time away.</p>
        </div>
        <div class="benefits-feature-grid" aria-label="Benefits and rewards highlights">
          ${benefits.map(([title, copy], index) => `
            <article class="benefit-feature-card">
              <div class="benefit-feature-card__icon">${icons[index]}</div>
              <h3>${title}</h3>
              <p>${copy}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

export function cultureWidget() {
  return `
    <section class="section section--inverse" id="culture">
      <div class="container split-panel">
        <div class="culture-copy">
          ${sectionHeader("Our culture", "Respect shows up in daily routines.")}
          <p class="culture-description">Teams start the week by aligning on priorities, support needs, and shared decisions. It creates rhythm and space to ask for help.</p>
          ${button("Explore culture →", pageHref("life.html"), "secondary", "culture-link")}
        </div>
        <div class="visual-panel">
          <img src="${asset("career-culture-belonging-team-ritual.png")}" alt="Coworkers participating in a team culture and belonging discussion">
        </div>
      </div>
    </section>
  `;
}

export function growthWidget() {
  const steps = [
    ["Month 1", "Learn the role, meet your support network, and understand what good work looks like.", "book-open"],
    ["Months 2-6", "Build confidence through coaching, feedback, and visible skill milestones.", "handshake"],
    ["Year 1", "Explore adjacent roles, mentorship, certifications, or leadership readiness.", "trending-up"],
    ["Next Step", "Move into specialist, lead, manager, or cross-functional pathways when ready.", "move-right"]
  ];
  return `
    <section class="section section--inverse growth-pathways-section" id="growth">
      <div class="container hiring-journey growth-pathways">
        <div class="hiring-journey__header growth-pathways__header">
          <p class="eyebrow">Career Growth Pathways</p>
          <h2 class="phw-g-h2-dark">See a future before you apply.</h2>
          <p class="section-lede">Simple milestones make growth easier to picture.</p>
        </div>
        <div class="hiring-journey__steps hiring-journey__steps--4" aria-label="Career growth milestones">
          ${steps.map(([time, copy, icon]) => `
            <article class="hiring-journey__step">
              <span class="hiring-journey__icon" aria-hidden="true">${lucideIcon(icon)}</span>
              <h3>${time}</h3>
              <p>${copy}</p>
            </article>
          `).join("")}
        </div>
        <div class="growth-pathways__actions">
          ${button("Browse available positions", pageHref("search-results.html"), "primary")}
        </div>
      </div>
    </section>
  `;
}

export function jobMatchCtaWidget() {
  return `
    <section class="job-match-cta-section">
      <div class="container job-match-cta">
        <div>
          <h2>We make it easy to find the right job for you.</h2>
        </div>
        <div class="job-match-cta__content">
          <p>Answer a few quick questions and discover roles that match your interests, experience, and next step.</p>
          <button class="btn btn--secondary" type="button" data-job-match-open aria-haspopup="dialog">Start matching →</button>
        </div>
      </div>
    </section>
  `;
}

export function resumeMatchWidget() {
  return `
    <section class="resume-match-section" aria-labelledby="resume-match-title">
      <div class="container">
        <div class="resume-match-card">
          <p class="eyebrow">Recommended</p>
          <h2 id="resume-match-title">Get matched by resume.</h2>
          <p>Upload your resume and see jobs that match your skills, experience, and next step.</p>
          <button class="btn btn--primary resume-match-card__upload" type="button" data-resume-match-open aria-haspopup="dialog">
            ${lucideIcon("upload")}
            <span>Search with resume</span>
          </button>
        </div>
      </div>
    </section>
  `;
}

export function statsWidget() {
  const stats = [
    ["120+", "Teams working across shared goals"],
    ["18", "Learning communities and interest groups"],
    ["92%", "Employees say their team is supportive"]
  ];

  return `
    <section class="stats-section" aria-label="Career site support stats">
      <div class="container stats-strip">
        ${stats.map(([value, label]) => `
          <div class="stats-strip__item">
            <strong>${value}</strong>
            <span>${label}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

export function cultureVideoWidget() {
  return `
    <section class="section video-story-section" aria-labelledby="culture-video-title">
      <div class="container video-story">
        <div class="video-story__header">
          <h2 id="culture-video-title">See how our teams work together.</h2>
        </div>
        <button class="video-story__placeholder" type="button" aria-label="Play team culture video">
          <img src="${asset("career-video-culture-placeholder.png")}" alt="Coworkers gathering around a laptop in a bright workplace">
          <span class="video-story__play" aria-hidden="true">▶</span>
        </button>
      </div>
    </section>
  `;
}

export function talentCommunityWidget() {
  return `
    <section class="section talent-alert-section">
      <div class="container">
        <form class="talent-alert" data-community-form>
          <div class="talent-alert__header">
            <p class="eyebrow">Job Alerts</p>
            <h2>Subscribe to job alerts.</h2>
            <p>Get roles that match your interests and location sent to your inbox.</p>
          </div>
          <div class="talent-alert__form-row">
            <div class="field">
              <label for="tc-email">Email</label>
              <input id="tc-email" type="email" required autocomplete="email">
            </div>
            <div class="field">
              <label for="tc-interest">Career Interest</label>
              <select id="tc-interest" required>
                <option>Technology & Data</option>
                <option>Frontline</option>
                <option>Operations</option>
                <option>Care & Wellness</option>
              </select>
            </div>
            <div class="field">
              <label for="tc-location">Location Interest</label>
              <select id="tc-location">
                <option>Remote Eligible</option>
                <option>North Region</option>
                <option>Central Region</option>
                <option>East Region</option>
              </select>
            </div>
            <button class="btn btn--primary talent-alert__submit" type="submit">Subscribe to Job Alerts</button>
          </div>
          <div class="talent-alert__consent">
            <label class="checkbox-field"><input type="checkbox" required> <span>I agree to receive career updates and understand I can opt out.</span></label>
          </div>
          <p class="success-message" role="status">Thanks. Your job alert preferences are saved.</p>
        </form>
      </div>
    </section>
  `;
}

export function jobListingCtaWidget() {
  return `
    <section class="job-listing-cta-section">
      <div class="container job-listing-cta">
        <h2>Ready to find a role that fits?</h2>
        ${button("Explore job listings →", "pages/search-results.html", "secondary")}
      </div>
    </section>
  `;
}

export function footerWidget() {
  return "";
}

export const homeWidgets = [
  heroSearchWidget,
  resumeMatchWidget,
  statsWidget,
  cultureVideoWidget,
  evpWidget,
  candidatePathwaysWidget,
  locationsWidget,
  storiesWidget,
  cultureWidget,
  featuredJobsWidget,
  jobMatchCtaWidget,
  matchedJobsWidget,
  talentCommunityWidget
];
