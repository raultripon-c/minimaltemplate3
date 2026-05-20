import { benefits, careerAreas, events, jobs, locations, stories } from "../data/site-data.js";
import { accordion, badge, button, jobCard, jobsList, pageHero, sectionHeader, simpleCard } from "../components/common.js";
import { benefitsWidget, careerAreasWidget, eventsWidget, growthWidget, locationsWidget, storiesWidget, talentCommunityWidget } from "../widgets/home-widgets.js";

export function searchResultsPage() {
  const filters = {
    Department: ["Customer & Frontline", "Corporate & Shared Services", "Technology & Data", "Care & Wellness", "Operations & Supply"],
    Schedule: ["Full-Time", "Part-Time"],
    "Remote / Hybrid": ["Remote", "Hybrid", "On-site"],
    "Experience Level": ["Entry", "Associate", "Mid", "Manager"],
    Category: ["Frontline", "Corporate", "Technology", "Healthcare", "Operations", "Students"],
    Location: ["Remote Eligible", "Northwest Service Center", "Central Region Hub", "East Region Campus", "Multiple Regions"],
    "Shift Type": ["Day Shift", "Evening Shift", "Flexible Core Hours", "Program Schedule"]
  };

  return `
    ${pageHero({
      eyebrow: "Search Results",
      title: "Find the role that fits your goals and your life.",
      copy: "Fast filters, rich previews, save/share states, and nearby recommendations help candidates compare roles without page reloads.",
      action: button("Skip to results", "#results", "primary")
    })}
    <main class="section" id="results">
      <div class="container filter-shell">
        <aside class="filters" aria-label="Job filters">
          <div class="field"><label for="search-keyword">Search</label><input id="search-keyword" data-search-input type="search" placeholder="Keyword or team"></div>
          ${Object.entries(filters).map(([group, values]) => `
            <fieldset class="checkbox-list" data-filter-group="${group}">
              <legend>${group}</legend>
              ${values.map((value) => `<label><input type="checkbox" value="${value}" data-filter-value> ${value}</label>`).join("")}
            </fieldset>
          `).join("")}
          <button class="btn btn--secondary" type="button" data-clear-filters>Clear filters</button>
        </aside>
        <section aria-live="polite">
          <div class="job-card" style="margin-bottom:16px">
            <strong data-result-count>${jobs.length} roles matched</strong>
            <span class="phw-g-body-secondary">Recommendations prioritize schedule clarity, nearby opportunities, and flexible-location indicators.</span>
          </div>
          ${jobsList(jobs, true)}
          <section class="section--tight">
            ${sectionHeader("Related Momentum", "Keep exploring similar paths.", "Candidates should never hit a dead end after filtering.")}
            <div class="grid grid--3">${careerAreas.slice(0, 3).map((area) => simpleCard([area[0], area[1], area[2], "See related jobs"], "↗")).join("")}</div>
          </section>
        </section>
      </div>
    </main>
  `;
}

export function jobDescriptionPage() {
  const job = jobs[0];
  const responsibilities = [
    "Welcome people with clear information, practical follow-through, and warm service habits.",
    "Use team routines to escalate questions, document patterns, and improve candidate or customer experiences.",
    "Partner with peers and managers to keep daily work predictable, respectful, and easy to understand.",
    "Learn role-specific systems through guided training and supported practice."
  ];
  const mustHave = ["Comfort communicating with different people in a clear, patient way.", "Reliable follow-through and attention to practical details.", "Ability to use basic digital tools after training."];
  const preferred = ["Experience in service, support, operations, care, retail, hospitality, or community roles.", "Interest in coaching, process improvement, or future leadership."];

  return `
    ${pageHero({
      eyebrow: "Job Description",
      title: job.title,
      copy: `${job.department} · ${job.location} · ${job.schedule} · ${job.compensation}`,
      action: button("Start Quick Apply", "#apply", "primary") + button("Save Job", "#", "secondary")
    })}
    <main>
      <section class="section">
        <div class="container split-panel">
          <article>
            ${sectionHeader("Role Overview", "Know what you are stepping into.", "A clear summary, visible pay placeholder, schedule expectations, and team proof reduce hesitation before apply.")}
            <p>${job.summary}</p>
            <div class="tabs">${job.tags.map((tag) => badge(tag)).join("")}</div>
          </article>
          <aside class="card">
            <h2>Quick facts</h2>
            <p><strong>Department:</strong> ${job.department}</p>
            <p><strong>Schedule:</strong> ${job.schedule} · ${job.shift}</p>
            <p><strong>Location:</strong> ${job.location} · ${job.workType}</p>
            <p><strong>Compensation:</strong> ${job.compensation}</p>
            <p><strong>Benefits:</strong> Health support, PTO, learning, wellbeing, and family resources.</p>
          </aside>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container grid grid--2">
          <article class="card"><h2>Responsibilities</h2><ul>${responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul></article>
          <article class="card"><h2>Qualifications</h2><h3>Must have</h3><ul>${mustHave.map((item) => `<li>${item}</li>`).join("")}</ul><h3>Preferred</h3><ul>${preferred.map((item) => `<li>${item}</li>`).join("")}</ul></article>
        </div>
      </section>
      <section class="section">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">Day In The Life</p>
            <h2 class="phw-g-h2-dark">Visualize the rhythm before you apply.</h2>
            <p class="section-lede">This timeline makes the role feel knowable by showing support, collaboration, and realistic workflow.</p>
          </div>
          <div class="timeline">
            <div class="timeline__item"><strong>Start</strong><span>Review priorities with the team and confirm any candidate or customer needs.</span></div>
            <div class="timeline__item"><strong>Midday</strong><span>Handle support moments, document patterns, and ask for help when a question needs escalation.</span></div>
            <div class="timeline__item"><strong>Wrap</strong><span>Share handoff notes, celebrate progress, and prepare for the next shift or workday.</span></div>
          </div>
        </div>
      </section>
      <section class="section section--soft">
        <div class="container">
          ${sectionHeader("Team Introductions", "Meet the people around the work.", "Fictional team previews reduce fear of unknown environments.")}
          <div class="grid grid--3">${stories.map((story) => simpleCard([story.name, `${story.role}: “${story.quote}”`, story.detail], story.initials)).join("")}</div>
        </div>
      </section>
      <section class="section" id="apply">
        <div class="container split-panel">
          <form class="card" data-community-form>
            <h2>Simplified Apply</h2>
            <div class="form-grid">
              <div class="field"><label for="apply-name">Name</label><input id="apply-name" required autocomplete="name"></div>
              <div class="field"><label for="apply-email">Email</label><input id="apply-email" type="email" required autocomplete="email"></div>
              <div class="field"><label for="apply-resume">Resume Upload</label><input id="apply-resume" type="file"></div>
              <div class="field"><label for="apply-profile">Profile Link</label><input id="apply-profile" placeholder="LinkedIn or portfolio placeholder"></div>
              <div class="field field--full"><label for="apply-note">Optional note</label><textarea id="apply-note" rows="4" placeholder="Tell us what matters in your next role."></textarea></div>
            </div>
            <button class="btn btn--primary" type="submit">Submit Interest</button>
            <p class="success-message" role="status">Application interest saved for this demo.</p>
          </form>
          <aside>
            ${sectionHeader("Related Jobs", "Keep momentum if this role is not the one.", "Nearby, similar, and adjacent paths keep candidates exploring.")}
            ${jobs.slice(1, 4).map((item) => jobCard(item)).join("")}
          </aside>
        </div>
      </section>
    </main>
    <div class="sticky-cta"><strong>${job.title}</strong><span>${job.location} · ${job.compensation}</span>${button("Quick Apply", "#apply", "primary")}</div>
  `;
}

export function lifePage() {
  return `
    ${pageHero({
      eyebrow: "Working Here",
      title: "A workplace story told through behavior, not slogans.",
      copy: "This page turns EVP into concrete proof: mentorship, manager routines, growth systems, flexibility clarity, and human stories."
    })}
    ${growthWidget()}
    ${storiesWidget()}
    <section class="section section--soft">
      <div class="container">
        ${sectionHeader("Behavioral EVP Proof", "What support looks like in practice.", "Every claim is paired with a visible behavior or system.")}
        <div class="grid grid--3">${[
          ["Mentorship", "New employees are paired with practical guides for role questions and team context."],
          ["Internal mobility", "Open roles include skill cues so employees can understand realistic next steps."],
          ["Manager routines", "Check-ins focus on priorities, blockers, wellbeing, and growth signals."],
          ["Flexible clarity", "Teams explain remote, hybrid, schedule, and shift expectations before conversion."],
          ["Learning paths", "Role-based learning helps employees see what to practice next."],
          ["Inclusion habits", "Meeting norms and feedback channels are designed so quieter voices are heard."]
        ].map((item) => simpleCard(item, "✓")).join("")}</div>
      </div>
    </section>
  `;
}

export const benefitsPage = () => `${pageHero({ eyebrow: "Benefits", title: "Rewards that help candidates evaluate real-life fit.", copy: "Skimmable categories and expandable details keep benefit information useful without overwhelming candidates." })}${benefitsWidget()}`;

export const earlyCareersPage = () => `
  ${pageHero({ eyebrow: "Students & Early Careers", title: "Start with structure, mentorship, and visible project work.", copy: "Programs are designed for candidates who want learning, support, and a clearer transition into meaningful work.", action: button("See early career roles", "search-results.html", "primary") })}
  <section class="section"><div class="container grid grid--3">${["Internships with guided project scopes.", "Apprenticeships with role practice and coaching.", "Rotations that clarify career direction.", "Interview prep and recruiter office hours.", "Peer communities for belonging.", "Manager feedback at useful milestones."].map((copy) => simpleCard(["Program feature", copy, "", "Explore program"], "★")).join("")}</div></section>
`;

export const eventsPage = () => `${pageHero({ eyebrow: "Events", title: "Meet the work before you decide.", copy: "Hiring events reduce pressure by letting candidates ask practical questions about teams, schedules, growth, and application steps." })}${eventsWidget()}`;

export const talentCommunityPage = () => `${pageHero({ eyebrow: "Talent Community", title: "Stay connected without pressure.", copy: "Candidates can subscribe to relevant updates by interest, location, and timing." })}${talentCommunityWidget()}`;

export const locationsPage = () => `${pageHero({ eyebrow: "Locations", title: "Search by region, work style, and flexibility.", copy: "Location modules support commute context, regional highlights, and remote eligibility without using real city references." })}${locationsWidget()}`;

export const careerAreasPage = () => `${pageHero({ eyebrow: "Career Areas", title: "Choose a path that matches your strengths.", copy: "Templates support reusable role-family pages with growth cues, proof, and related jobs." })}${careerAreasWidget()}`;

export const savedJobsPage = () => `
  ${pageHero({ eyebrow: "Saved Jobs", title: "Return to roles you want to compare.", copy: "Saved roles persist in local storage for this standalone demo and help candidates keep momentum." })}
  <section class="section"><div class="container"><div data-saved-jobs>${jobsList([], true)}</div></div></section>
`;

export const accessibilityPage = () => `
  ${pageHero({ eyebrow: "Accessibility & Help", title: "Support should be easy to find.", copy: "This page gives candidates clear help paths, keyboard-accessible patterns, and transparent application support." })}
  <section class="section"><div class="container split-panel"><div>${sectionHeader("Candidate Help", "A more accessible journey.", "Use semantic HTML, visible focus, clear labels, aria states, skip links, and responsive layouts across every module.")}</div>${accordion([["Application assistance", "Candidates can request help with forms, uploads, interview logistics, or accessibility needs."], ["Keyboard navigation", "Navigation, filters, drawers, tabs, accordions, and forms are built for keyboard use."], ["Privacy and consent", "Talent community and application forms include clear consent language and low-pressure next steps."]])}</div></section>
`;

export const widgetPreviewPage = () => `
  ${pageHero({ eyebrow: "Widget Preview", title: "Every module renders independently.", copy: "Use this page for isolated widget QA before importing modules into a composed page." })}
  ${careerAreasWidget()}${benefitsWidget()}${eventsWidget()}${talentCommunityWidget()}
`;
