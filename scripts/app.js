import { header, footer, jobsList } from "../components/common.js";
import { jobs } from "../data/site-data.js";
import { homeWidgets } from "../widgets/home-widgets.js";
import {
  accessibilityPage,
  benefitsPage,
  careerAreasPage,
  earlyCareersPage,
  eventsPage,
  jobDescriptionPage,
  lifePage,
  locationsPage,
  savedJobsPage,
  searchResultsPage,
  talentCommunityPage,
  widgetPreviewPage
} from "../pages/page-modules.js";

const routes = {
  "/index.html": { active: "", render: () => homeWidgets.map((widget) => widget()).join("") },
  "/": { active: "", render: () => homeWidgets.map((widget) => widget()).join("") },
  "/pages/search-results.html": { active: "search-results.html", render: searchResultsPage },
  "/pages/job-description.html": { active: "search-results.html", render: jobDescriptionPage },
  "/pages/life.html": { active: "life.html", render: lifePage },
  "/pages/benefits.html": { active: "benefits.html", render: benefitsPage },
  "/pages/early-careers.html": { active: "early-careers.html", render: earlyCareersPage },
  "/pages/events.html": { active: "events.html", render: eventsPage },
  "/pages/talent-community.html": { active: "talent-community.html", render: talentCommunityPage },
  "/pages/locations.html": { active: "locations.html", render: locationsPage },
  "/pages/career-areas.html": { active: "career-areas.html", render: careerAreasPage },
  "/pages/saved-jobs.html": { active: "saved-jobs.html", render: savedJobsPage },
  "/pages/accessibility-help.html": { active: "accessibility-help.html", render: accessibilityPage },
  "/pages/widget-preview.html": { active: "widget-preview.html", render: widgetPreviewPage }
};

const normalizePath = () => {
  const root = "/career-platform-template";
  const path = window.location.pathname.endsWith("/") ? `${window.location.pathname}index.html` : window.location.pathname;
  return path.startsWith(root) ? path.slice(root.length) || "/" : path;
};

function render() {
  const route = routes[normalizePath()] || routes["/"];
  document.querySelector("#app").innerHTML = `${header(route.active)}${route.render()}${footer()}`;
  bindInteractions();
}

function bindInteractions() {
  const toggle = document.querySelector(".menu-toggle");
  toggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("drawer-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".accordion__button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion__item");
      const isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.querySelectorAll("[data-community-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.querySelector(".success-message")?.classList.add("is-visible");
    });
  });

  document.querySelectorAll("[data-save]").forEach((button) => {
    const id = button.dataset.save;
    const saved = new Set(JSON.parse(localStorage.getItem("career-template-saved") || "[]"));
    button.setAttribute("aria-pressed", String(saved.has(id)));
    button.classList.toggle("is-active", saved.has(id));
    button.textContent = saved.has(id) ? "♥" : "♡";
    button.addEventListener("click", () => {
      const current = new Set(JSON.parse(localStorage.getItem("career-template-saved") || "[]"));
      current.has(id) ? current.delete(id) : current.add(id);
      localStorage.setItem("career-template-saved", JSON.stringify([...current]));
      button.setAttribute("aria-pressed", String(current.has(id)));
      button.classList.toggle("is-active", current.has(id));
      button.textContent = current.has(id) ? "♥" : "♡";
    });
  });

  document.querySelectorAll("[data-share]").forEach((button) => {
    button.addEventListener("click", async () => {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else {
        await navigator.clipboard?.writeText(url);
        button.textContent = "✓";
        setTimeout(() => (button.textContent = "↗"), 1200);
      }
    });
  });

  bindTabs();
  bindFilters();
  renderSavedJobs();
}

function bindTabs() {
  document.querySelectorAll("[data-tab-filter]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const group = tab.closest(".tabs");
      group.querySelectorAll(".tab").forEach((item) => item.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      const value = tab.dataset.tabFilter;
      document.querySelectorAll("[data-job-card]").forEach((card) => {
        const visible = value === "Featured" || card.textContent.includes(value) || card.dataset.schedule === value;
        card.hidden = !visible;
      });
    });
  });
}

function bindFilters() {
  const searchInput = document.querySelector("[data-search-input]");
  const checks = [...document.querySelectorAll("[data-filter-value]")];
  const clearButton = document.querySelector("[data-clear-filters]");

  if (!searchInput && !checks.length) return;

  const apply = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const active = checks.filter((check) => check.checked).map((check) => check.value.toLowerCase());
    let count = 0;

    document.querySelectorAll("[data-job-card]").forEach((card) => {
      const text = card.textContent.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      const matchesFilters = active.length === 0 || active.some((filter) => text.includes(filter));
      const visible = matchesQuery && matchesFilters;
      card.hidden = !visible;
      if (visible) count += 1;
    });

    const countEl = document.querySelector("[data-result-count]");
    if (countEl) countEl.textContent = `${count} role${count === 1 ? "" : "s"} matched`;
  };

  searchInput?.addEventListener("input", apply);
  checks.forEach((check) => check.addEventListener("change", apply));
  clearButton?.addEventListener("click", () => {
    checks.forEach((check) => (check.checked = false));
    if (searchInput) searchInput.value = "";
    apply();
  });
}

function renderSavedJobs() {
  const mount = document.querySelector("[data-saved-jobs]");
  if (!mount) return;
  const savedIds = new Set(JSON.parse(localStorage.getItem("career-template-saved") || "[]"));
  const saved = jobs.filter((job) => savedIds.has(job.id));
  mount.innerHTML = saved.length
    ? jobsList(saved, true)
    : `<article class="card"><h2>No saved jobs yet</h2><p>Save jobs from search results or job cards to compare them here later.</p></article>`;
}

render();
