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
  const path = window.location.pathname.endsWith("/") ? `${window.location.pathname}index.html` : window.location.pathname;
  const basePath = ["/career-platform-template", "/minimaltemplate3"].find((root) => path.startsWith(root));
  return basePath ? path.slice(basePath.length) || "/" : path;
};

function render() {
  const route = routes[normalizePath()] || routes["/"];
  document.querySelector("#app").innerHTML = `${header(route.active)}${route.render()}${footer()}`;
  bindInteractions();
}

function bindInteractions() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileDrawer = document.querySelector("#mobile-drawer");
  toggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("drawer-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (mobileDrawer) mobileDrawer.hidden = !isOpen;
  });

  bindHeaderMenus();
  bindAccordions();
  bindSearchSidebar();

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
      updateSavedJobLinks();
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
  bindStoryCarousels();
  bindGrowthTabs();
  renderSavedJobs();
  updateSavedJobLinks();
}

function bindHeaderMenus() {
  const dropdownTriggers = [...document.querySelectorAll("[data-dropdown-trigger]")];
  const mobileTrigger = document.querySelector("[data-mobile-submenu-trigger]");
  const mobileDrawer = document.querySelector("#mobile-drawer");
  const menuToggle = document.querySelector(".menu-toggle");

  const closeDropdowns = () => {
    dropdownTriggers.forEach((trigger) => {
      const menu = document.querySelector(`[data-dropdown-menu="${trigger.dataset.dropdownTrigger}"]`);
      trigger.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    });
  };

  const closeMobileDrawer = () => {
    document.body.classList.remove("drawer-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (mobileDrawer) mobileDrawer.hidden = true;
  };

  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = document.querySelector(`[data-dropdown-menu="${trigger.dataset.dropdownTrigger}"]`);
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";
      closeDropdowns();
      trigger.setAttribute("aria-expanded", String(willOpen));
      if (menu) menu.hidden = !willOpen;
    });
  });

  mobileTrigger?.addEventListener("click", () => {
    const target = document.querySelector(`#${mobileTrigger.getAttribute("aria-controls")}`);
    const willOpen = mobileTrigger.getAttribute("aria-expanded") !== "true";
    mobileTrigger.setAttribute("aria-expanded", String(willOpen));
    if (target) target.hidden = !willOpen;
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-menu") && !event.target.closest(".utility-menu")) closeDropdowns();
    if (document.body.classList.contains("drawer-open") && !event.target.closest(".mobile-drawer") && !event.target.closest(".menu-toggle")) {
      closeMobileDrawer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdowns();
      closeMobileDrawer();
    }
  });

  document.querySelectorAll(".mobile-drawer a, .mobile-drawer .btn").forEach((control) => control.addEventListener("click", closeMobileDrawer));
  document.querySelectorAll("#language-menu button").forEach((button) => {
    button.addEventListener("click", () => {
      const label = button.closest(".utility-menu")?.querySelector("[data-dropdown-trigger='language'] span:nth-child(2)");
      if (label) label.textContent = button.lang.toUpperCase();
      closeDropdowns();
    });
  });

  document.querySelectorAll(".mobile-language button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".mobile-language button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
    });
  });
}

function bindSearchSidebar() {
  document.querySelectorAll("[data-filter-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".filter-group");
      const panel = document.querySelector(`#${button.getAttribute("aria-controls")}`);
      const willOpen = button.getAttribute("aria-expanded") !== "true";
      const icon = button.querySelector("span:last-child");

      group?.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      if (panel) panel.hidden = !willOpen;
      if (icon) icon.textContent = willOpen ? "x" : "+";
    });
  });

  document.querySelectorAll(".search-alert-card__toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", String(!isActive));
      button.setAttribute("aria-label", isActive ? "Turn search alert on" : "Turn search alert off");
    });
  });
}

function bindAccordions() {
  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    const items = [...accordion.querySelectorAll(".accordion__item")];

    const syncItem = (item, open) => {
      const button = item.querySelector(".accordion__button");
      const panel = item.querySelector(".accordion__panel");
      const icon = item.querySelector(".accordion__icon");

      item.classList.toggle("is-open", open);
      button?.setAttribute("aria-expanded", String(open));
      panel?.setAttribute("aria-hidden", String(!open));
      if (panel) panel.style.maxHeight = open ? `${panel.scrollHeight}px` : "0px";
      if (icon) icon.textContent = open ? "x" : "+";
    };

    const reserveAccordionHeight = () => {
      const currentState = items.map((item) => item.classList.contains("is-open"));
      let maxHeight = 0;

      accordion.classList.add("is-measuring");
      items.forEach((itemToOpen) => {
        items.forEach((item) => syncItem(item, item === itemToOpen));
        maxHeight = Math.max(maxHeight, accordion.offsetHeight);
      });
      items.forEach((item) => syncItem(item, false));
      maxHeight = Math.max(maxHeight, accordion.offsetHeight);
      items.forEach((item, index) => syncItem(item, currentState[index]));
      accordion.classList.remove("is-measuring");
      accordion.style.minHeight = `${Math.ceil(maxHeight)}px`;
    };

    reserveAccordionHeight();

    items.forEach((item) => {
      const button = item.querySelector(".accordion__button");
      button?.addEventListener("click", () => {
        const shouldOpen = !item.classList.contains("is-open");
        items.forEach((currentItem) => syncItem(currentItem, shouldOpen && currentItem === item));
      });
    });
  });
}

function updateSavedJobLinks() {
  const savedIds = JSON.parse(localStorage.getItem("career-template-saved") || "[]");
  const count = savedIds.length;
  const label = count > 0 ? `♡ Saved Jobs (${count})` : "♡ Saved Jobs";
  const compact = count > 0 ? `Saved <span class="utility-count">${count}</span>` : "Saved Jobs";
  document.querySelectorAll("[data-saved-link]").forEach((link) => {
    link.innerHTML = link.hasAttribute("data-saved-mobile") ? compact : label;
  });
}

function bindTabs() {
  document.querySelectorAll("[data-tab-filter]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const group = tab.closest(".tabs");
      group.querySelectorAll(".tab").forEach((item) => item.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      const value = tab.dataset.tabFilter;
      const scope = tab.closest("[data-filter-scope]") || document;
      scope.querySelectorAll("[data-job-card]").forEach((card) => {
        const visible = value === "All" || value === "Featured" || card.textContent.includes(value) || card.dataset.schedule === value;
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
    if (countEl) countEl.textContent = String(count);
  };

  searchInput?.addEventListener("input", apply);
  checks.forEach((check) => check.addEventListener("change", apply));
  clearButton?.addEventListener("click", () => {
    checks.forEach((check) => (check.checked = false));
    if (searchInput) searchInput.value = "";
    apply();
  });
}

function bindStoryCarousels() {
  document.querySelectorAll("[data-story-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-story-slide]")];
    const prev = carousel.querySelector("[data-story-prev]");
    const next = carousel.querySelector("[data-story-next]");
    const status = carousel.querySelector("[data-story-status]");
    let active = slides.findIndex((slide) => !slide.hidden);
    if (active < 0) active = 0;

    const showSlide = (index) => {
      if (!slides.length) return;
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== active;
      });
      if (status) status.textContent = `${active + 1} / ${slides.length}`;
    };

    prev?.addEventListener("click", () => showSlide(active - 1));
    next?.addEventListener("click", () => showSlide(active + 1));
    showSlide(active);
  });
}

function bindGrowthTabs() {
  document.querySelectorAll("[data-growth-tabs]").forEach((tabs) => {
    const triggers = [...tabs.querySelectorAll("[data-growth-tab]")];
    const panels = [...tabs.querySelectorAll("[data-growth-panel]")];

    const activate = (index) => {
      triggers.forEach((trigger) => {
        const isActive = trigger.dataset.growthTab === String(index);
        trigger.setAttribute("aria-selected", String(isActive));
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.growthPanel !== String(index);
      });
    };

    triggers.forEach((trigger, triggerIndex) => {
      trigger.addEventListener("click", () => activate(trigger.dataset.growthTab));
      trigger.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = event.key === "Home"
          ? 0
          : event.key === "End"
            ? triggers.length - 1
            : event.key === "ArrowRight"
              ? (triggerIndex + 1) % triggers.length
              : (triggerIndex - 1 + triggers.length) % triggers.length;
        triggers[nextIndex]?.focus();
        activate(triggers[nextIndex]?.dataset.growthTab);
      });
    });
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
