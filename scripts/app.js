import { header, footer, jobMatchModal, jobsList, resumeMatchModal, videoStoryModal } from "../components/common.js";
import { jobs } from "../data/site-data.js";
import { homeWidgets } from "../widgets/home-widgets.js";
import {
  accessibilityPage,
  careerAreaFrontlinePage,
  benefitsPage,
  careerAreasPage,
  earlyCareersPage,
  inclusionBelongingPage,
  jobDescriptionPage,
  lifePage,
  locationNorthRegionPage,
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
  "/pages/inclusion-belonging.html": { active: "inclusion-belonging.html", render: inclusionBelongingPage },
  "/pages/benefits.html": { active: "benefits.html", render: benefitsPage },
  "/pages/early-careers.html": { active: "early-careers.html", render: earlyCareersPage },
  "/pages/talent-community.html": { active: "talent-community.html", render: talentCommunityPage },
  "/pages/locations.html": { active: "locations.html", render: locationsPage },
  "/pages/locations/index.html": { active: "locations.html", render: locationsPage },
  "/pages/locations/north-region.html": { active: "locations.html", render: locationNorthRegionPage },
  "/pages/career-areas.html": { active: "career-areas.html", render: careerAreasPage },
  "/pages/career-areas/index.html": { active: "career-areas.html", render: careerAreasPage },
  "/pages/career-areas/frontline-workers.html": { active: "career-areas.html", render: careerAreaFrontlinePage },
  "/pages/career-areas/corporate-shared-services.html": { active: "career-areas.html", render: careerAreaFrontlinePage },
  "/pages/career-areas/technology-product.html": { active: "career-areas.html", render: careerAreaFrontlinePage },
  "/pages/career-areas/healthcare-care-support.html": { active: "career-areas.html", render: careerAreaFrontlinePage },
  "/pages/career-areas/operations-logistics.html": { active: "career-areas.html", render: careerAreaFrontlinePage },
  "/pages/career-areas/leadership.html": { active: "career-areas.html", render: careerAreaFrontlinePage },
  "/pages/career-areas/early-careers.html": { active: "career-areas.html", render: careerAreaFrontlinePage },
  "/pages/career-areas/sales-client-support.html": { active: "career-areas.html", render: careerAreaFrontlinePage },
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
  const app = document.querySelector("#app");
  app.setAttribute("tabindex", "-1");
  app.innerHTML = `${header(route.active)}${route.render()}${footer()}${jobMatchModal()}${resumeMatchModal()}${videoStoryModal()}`;
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
  bindJobMatchModal();
  bindResumeMatchModal();
  bindVideoStoryModal();
  bindLocationsMap();
  renderLucideIcons();

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
        const label = button.querySelector("span");
        if (label) {
          label.textContent = "Copied";
          setTimeout(() => (label.textContent = "Share"), 1200);
        } else {
          button.textContent = "✓";
          setTimeout(() => (button.textContent = "↗"), 1200);
        }
      }
    });
  });

  bindTabs();
  bindFilters();
  bindStoryCarousels();
  bindCultureGalleries();
  bindGrowthTabs();
  bindJobDetailTabs();
  bindJobDescriptionToggle();
  bindSimilarJobsMore();
  renderSavedJobs();
  updateSavedJobLinks();
}

async function renderLucideIcons() {
  if (!document.querySelector("[data-lucide]")) return;
  await loadScript("https://unpkg.com/lucide@latest/dist/umd/lucide.min.js");
  window.lucide?.createIcons({
    attrs: {
      "stroke-width": 2,
    },
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      if (window.L) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

async function bindLocationsMap() {
  const mapMount = document.querySelector("[data-location-map]");
  if (!mapMount || mapMount.dataset.initialized === "true") return;

  const leafletCss = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  if (!document.querySelector(`link[href="${leafletCss}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = leafletCss;
    document.head.append(link);
  }

  await loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
  if (!window.L) return;

  mapMount.dataset.initialized = "true";
  const detailHref = window.location.pathname.includes("/pages/locations/")
    ? "north-region.html"
    : "locations/north-region.html";
  const pins = [
    { title: "North Region", copy: "Hybrid hubs and field support teams.", coords: [45.1, -93.2] },
    { title: "Central Region", copy: "Learning spaces and frontline opportunities.", coords: [39.1, -94.6] },
    { title: "East Region", copy: "Care, support, and operations teams.", coords: [40.7, -74.0] },
    { title: "Southwest Region", copy: "Growing operations and leadership paths.", coords: [33.4, -112.1] },
    { title: "Remote Eligible", copy: "Distributed teams with core collaboration hours.", coords: [41.9, -87.6] }
  ];

  const map = window.L.map(mapMount, {
    scrollWheelZoom: false,
  }).setView([39.8, -96.5], 4);

  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const markerIcon = window.L.divIcon({
    className: "locations-map-pin",
    html: "<span></span>",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });

  pins.forEach((pin) => {
    window.L.marker(pin.coords, { icon: markerIcon })
      .addTo(map)
      .bindPopup(`
        <strong>${pin.title}</strong>
        <span>${pin.copy}</span>
        <a href="${detailHref}">Explore this region →</a>
      `);
  });
}

function bindResumeMatchModal() {
  const modal = document.querySelector("[data-resume-match-modal]");
  if (!modal) return;

  const openButtons = document.querySelectorAll("[data-resume-match-open]");
  const closeButtons = modal.querySelectorAll("[data-resume-match-close]");
  const fileInput = modal.querySelector("[data-resume-match-file]");
  const fileName = modal.querySelector("[data-resume-match-file-name]");
  const consent = modal.querySelector("[data-resume-match-consent]");
  const submit = modal.querySelector("[data-resume-match-submit]");
  const dropzone = modal.querySelector("[data-resume-dropzone]");
  let previouslyFocused = null;

  const updateSubmit = () => {
    if (!submit || !fileInput || !consent) return;
    submit.disabled = !fileInput.files.length || !consent.checked;
  };

  const updateFileName = () => {
    if (!fileName || !fileInput) return;
    fileName.textContent = fileInput.files[0]?.name || "PDF, DOC, DOCX, and TXT files are supported, up to 1MB.";
    updateSubmit();
  };

  const openModal = (trigger) => {
    previouslyFocused = trigger;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector("[data-resume-match-close]")?.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    previouslyFocused?.focus();
  };

  openButtons.forEach((button) => button.addEventListener("click", () => openModal(button)));
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  fileInput?.addEventListener("change", updateFileName);
  consent?.addEventListener("change", updateSubmit);
  submit?.addEventListener("click", closeModal);

  dropzone?.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropzone.classList.add("is-dragging");
  });
  dropzone?.addEventListener("dragleave", () => {
    dropzone.classList.remove("is-dragging");
  });
  dropzone?.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.classList.remove("is-dragging");
    if (!fileInput || !event.dataTransfer?.files.length) return;
    fileInput.files = event.dataTransfer.files;
    updateFileName();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

function bindVideoStoryModal() {
  const modal = document.querySelector("[data-video-story-modal]");
  if (!modal) return;

  const openButtons = document.querySelectorAll(".video-story__placeholder");
  const closeButtons = modal.querySelectorAll("[data-video-story-close]");
  const image = modal.querySelector("[data-video-story-image]");
  let previouslyFocused = null;

  const openModal = (trigger) => {
    const triggerImage = trigger.querySelector("img");
    previouslyFocused = trigger;
    if (image && triggerImage) {
      image.src = triggerImage.currentSrc || triggerImage.src;
      image.alt = triggerImage.alt || "";
    }
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector("[data-video-story-close]")?.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (image) image.removeAttribute("src");
    previouslyFocused?.focus();
  };

  openButtons.forEach((button) => button.addEventListener("click", () => openModal(button)));
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

function bindJobMatchModal() {
  const modal = document.querySelector("[data-job-match-modal]");
  if (!modal) return;

  const openButtons = document.querySelectorAll("[data-job-match-open]");
  const closeButtons = modal.querySelectorAll("[data-job-match-close]");
  const backButton = modal.querySelector("[data-job-match-back]");
  const skipButton = modal.querySelector("[data-job-match-skip]");
  const answerButton = modal.querySelector("[data-job-match-answer]");
  const interestTriggers = modal.querySelectorAll("[data-job-match-interests]");
  const departmentButtons = modal.querySelectorAll("[data-job-match-department]");
  const departmentsNextButton = modal.querySelector("[data-job-match-departments-next]");
  const titleInput = modal.querySelector("[data-job-match-title-input]");
  const careerStartCheckbox = modal.querySelector("[data-job-match-career-start]");
  const titleNextButton = modal.querySelector("[data-job-match-title-next]");
  const skillTags = modal.querySelector("[data-job-match-skill-tags]");
  const skillSearch = modal.querySelector("[data-job-match-skill-search]");
  const skillDropdown = modal.querySelector("[data-job-match-skill-dropdown]");
  const skillsNextButton = modal.querySelector("[data-job-match-skills-next]");
  const experienceButtons = modal.querySelectorAll("[data-job-match-experience]");
  const experienceNextButton = modal.querySelector("[data-job-match-experience-next]");
  const locationInput = modal.querySelector("[data-job-match-location-input]");
  const locationNextButton = modal.querySelector("[data-job-match-location-next]");
  const leadEmailInput = modal.querySelector("[data-job-match-lead-email]");
  const leadDoneButton = modal.querySelector("[data-job-match-done]");
  const steps = [...modal.querySelectorAll("[data-job-match-step]")];
  const firstChoice = modal.querySelector(".job-match-modal__choices .btn");
  const skillOptions = ["Customer Service", "Communication", "Data Analysis", "Scheduling", "Problem Solving", "Team Leadership", "Inventory Planning", "Care Coordination", "Project Support", "Reporting"];
  const selectedSkills = new Set();
  let activeStep = "choice";
  let previouslyFocused = null;

  const showStep = (stepName) => {
    activeStep = stepName;
    steps.forEach((step) => {
      step.hidden = step.dataset.jobMatchStep !== stepName;
    });
    backButton.hidden = stepName === "choice";
  };

  const focusStep = (stepName) => {
    const target = {
      choice: firstChoice,
      login: modal.querySelector(".job-match-modal__social button"),
      departments: modal.querySelector("[data-job-match-department]"),
      "job-title": titleInput,
      skills: skillSearch,
      experience: modal.querySelector("[data-job-match-experience]"),
      location: locationInput,
      "no-match": leadEmailInput,
    }[stepName];
    target?.focus();
  };

  const advanceStep = () => {
    const nextStep = {
      choice: "login",
      login: "departments",
      departments: "job-title",
      "job-title": "skills",
      skills: "experience",
      experience: "location",
    }[activeStep];

    if (!nextStep) {
      completeMatchFlow();
      return;
    }

    showStep(nextStep);
    focusStep(nextStep);
  };

  const openModal = (trigger) => {
    previouslyFocused = trigger;
    showStep("choice");
    modal.hidden = false;
    document.body.classList.add("modal-open");
    firstChoice?.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    previouslyFocused?.focus();
  };

  const completeMatchFlow = () => {
    closeModal();
    const recommendations = document.querySelector("[data-match-recommendations]");
    if (!recommendations) return;
    recommendations.hidden = false;
    recommendations.classList.add("is-visible");
    recommendations.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  openButtons.forEach((button) => button.addEventListener("click", () => openModal(button)));
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  skipButton?.addEventListener("click", advanceStep);
  answerButton?.addEventListener("click", () => {
    showStep("login");
    modal.querySelector(".job-match-modal__social button")?.focus();
  });
  interestTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      showStep("departments");
      modal.querySelector("[data-job-match-department]")?.focus();
    });
  });
  departmentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isSelected = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", String(!isSelected));
      button.classList.toggle("is-selected", !isSelected);
      const hasSelection = [...departmentButtons].some((item) => item.getAttribute("aria-pressed") === "true");
      if (departmentsNextButton) departmentsNextButton.disabled = !hasSelection;
    });
  });
  departmentsNextButton?.addEventListener("click", () => {
    showStep("job-title");
    titleInput?.focus();
  });
  const updateTitleNext = () => {
    const hasTitle = Boolean(titleInput?.value.trim());
    const isStartingCareer = Boolean(careerStartCheckbox?.checked);
    if (titleNextButton) titleNextButton.disabled = !hasTitle && !isStartingCareer;
  };
  titleInput?.addEventListener("input", updateTitleNext);
  careerStartCheckbox?.addEventListener("change", updateTitleNext);
  titleNextButton?.addEventListener("click", () => {
    showStep("skills");
    skillSearch?.focus();
  });
  const renderSkillDropdown = () => {
    if (!skillDropdown || !skillSearch) return;
    const query = skillSearch.value.trim().toLowerCase();
    const matches = query
      ? skillOptions.filter((skill) => !selectedSkills.has(skill) && skill.toLowerCase().includes(query))
      : [];
    skillDropdown.innerHTML = matches.map((skill) => `<button type="button" data-job-match-skill-option="${skill}">${skill}</button>`).join("");
    skillDropdown.hidden = matches.length === 0;
    skillSearch.setAttribute("aria-expanded", String(matches.length > 0));
    skillDropdown.querySelectorAll("[data-job-match-skill-option]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedSkills.add(button.dataset.jobMatchSkillOption);
        skillSearch.value = "";
        renderSelectedSkills();
        renderSkillDropdown();
        skillSearch.focus();
      });
    });
  };
  const renderSelectedSkills = () => {
    if (!skillTags) return;
    skillTags.innerHTML = [...selectedSkills].map((skill) => `
      <span class="job-match-modal__skill-tag">
        ${skill}
        <button type="button" data-job-match-remove-skill="${skill}" aria-label="Remove ${skill}">x</button>
      </span>
    `).join("");
    if (skillsNextButton) skillsNextButton.disabled = selectedSkills.size === 0;
    skillTags.querySelectorAll("[data-job-match-remove-skill]").forEach((button) => {
      button.addEventListener("click", () => {
        const skill = button.dataset.jobMatchRemoveSkill;
        selectedSkills.delete(skill);
        renderSelectedSkills();
        renderSkillDropdown();
        skillSearch?.focus();
      });
    });
  };
  skillSearch?.addEventListener("focus", renderSkillDropdown);
  skillSearch?.addEventListener("input", renderSkillDropdown);
  skillsNextButton?.addEventListener("click", () => {
    showStep("experience");
    modal.querySelector("[data-job-match-experience]")?.focus();
  });
  experienceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      experienceButtons.forEach((item) => {
        const isSelected = item === button;
        item.setAttribute("aria-pressed", String(isSelected));
        item.classList.toggle("is-selected", isSelected);
      });
      if (experienceNextButton) experienceNextButton.disabled = false;
    });
  });
  experienceNextButton?.addEventListener("click", () => {
    showStep("location");
    locationInput?.focus();
  });
  locationInput?.addEventListener("input", () => {
    if (locationNextButton) locationNextButton.disabled = !locationInput.value.trim();
  });
  locationNextButton?.addEventListener("click", () => {
    showStep("no-match");
    leadEmailInput?.focus();
  });
  leadEmailInput?.addEventListener("input", () => {
    if (leadDoneButton) leadDoneButton.disabled = !leadEmailInput.value.trim();
  });
  leadDoneButton?.addEventListener("click", completeMatchFlow);
  backButton?.addEventListener("click", () => {
    if (activeStep === "no-match") {
      showStep("location");
      locationInput?.focus();
      return;
    }
    if (activeStep === "location") {
      showStep("experience");
      modal.querySelector("[data-job-match-experience]")?.focus();
      return;
    }
    if (activeStep === "experience") {
      showStep("skills");
      skillSearch?.focus();
      return;
    }
    if (activeStep === "skills") {
      showStep("job-title");
      titleInput?.focus();
      return;
    }
    if (activeStep === "job-title") {
      showStep("departments");
      modal.querySelector("[data-job-match-department]")?.focus();
      return;
    }
    if (activeStep === "departments") {
      showStep("login");
      modal.querySelector("[data-job-match-interests]")?.focus();
      return;
    }
    showStep("choice");
    answerButton?.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

function bindHeaderMenus() {
  const dropdownTriggers = [...document.querySelectorAll("[data-dropdown-trigger]")];
  const mobileTriggers = [...document.querySelectorAll("[data-mobile-submenu-trigger]")];
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

  mobileTriggers.forEach((mobileTrigger) => {
    mobileTrigger.addEventListener("click", () => {
      const target = document.querySelector(`#${mobileTrigger.getAttribute("aria-controls")}`);
      const willOpen = mobileTrigger.getAttribute("aria-expanded") !== "true";
      mobileTrigger.setAttribute("aria-expanded", String(willOpen));
      if (target) target.hidden = !willOpen;
    });
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

  document.querySelectorAll("[data-mobile-language-option]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-mobile-language-option]").forEach((item) => {
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
      const normalizedValue = value.toLowerCase();
      const scope = tab.closest("[data-filter-scope]") || document;
      scope.querySelectorAll("[data-job-card]").forEach((card) => {
        const searchable = `${card.textContent} ${card.dataset.tags || ""}`.toLowerCase();
        const isUnrevealedSimilar = card.dataset.similarExtra === "true" && card.dataset.similarRevealed !== "true";
        const visible = value === "All" || value === "Featured" || searchable.includes(normalizedValue);
        card.hidden = !visible || isUnrevealedSimilar;
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
    const activeByGroup = checks.reduce((groups, check) => {
      if (!check.checked) return groups;
      const group = check.closest("[data-filter-group]")?.dataset.filterGroup || "filter";
      groups[group] ||= [];
      groups[group].push(check.value.toLowerCase());
      return groups;
    }, {});
    let count = 0;

    document.querySelectorAll("[data-job-card]").forEach((card) => {
      const text = `${card.textContent} ${card.dataset.tags || ""}`.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      const matchesFilters = Object.values(activeByGroup).every((filters) => filters.some((filter) => text.includes(filter)));
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
    const prevButtons = [...carousel.querySelectorAll("[data-story-prev]")];
    const nextButtons = [...carousel.querySelectorAll("[data-story-next]")];
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

    prevButtons.forEach((button) => button.addEventListener("click", () => showSlide(active - 1)));
    nextButtons.forEach((button) => button.addEventListener("click", () => showSlide(active + 1)));
    showSlide(active);
  });
}

function bindCultureGalleries() {
  document.querySelectorAll("[data-culture-gallery]").forEach((gallery) => {
    const track = gallery.querySelector("[data-culture-track]");
    const items = [...gallery.querySelectorAll(".culture-gallery__item")];
    const prev = gallery.querySelector("[data-culture-prev]");
    const next = gallery.querySelector("[data-culture-next]");
    let active = 0;

    const visibleCount = () => {
      if (window.matchMedia("(max-width: 640px)").matches) return 1;
      if (window.matchMedia("(max-width: 1024px)").matches) return 2;
      return 4;
    };

    const update = () => {
      if (!track || !items.length) return;
      const max = Math.max(0, items.length - visibleCount());
      active = Math.min(Math.max(active, 0), max);
      const itemWidth = items[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      track.style.transform = `translateX(-${active * (itemWidth + gap)}px)`;
      if (prev) prev.disabled = active === 0;
      if (next) next.disabled = active === max;
    };

    prev?.addEventListener("click", () => {
      active -= 1;
      update();
    });
    next?.addEventListener("click", () => {
      active += 1;
      update();
    });
    window.addEventListener("resize", update);
    update();
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

function bindJobDetailTabs() {
  document.querySelectorAll("[data-job-detail-tabs]").forEach((tablist) => {
    const tabs = [...tablist.querySelectorAll("[data-job-detail-tab]")];
    const container = tablist.closest(".job-detail-hero__content");
    const panels = [...(container?.querySelectorAll("[data-job-detail-panel]") || [])];

    const activate = (id, focus = false) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.jobDetailTab === id;
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        if (isActive && focus) tab.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.jobDetailPanel !== id;
      });
    };

    tabs.forEach((tab, index) => {
      tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
      tab.addEventListener("click", () => activate(tab.dataset.jobDetailTab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : event.key === "ArrowRight"
              ? (index + 1) % tabs.length
              : (index - 1 + tabs.length) % tabs.length;
        activate(tabs[nextIndex]?.dataset.jobDetailTab, true);
      });
    });
  });

  document.querySelectorAll("[data-job-detail-mobile-sections]").forEach((group) => {
    const toggles = [...group.querySelectorAll("[data-job-detail-mobile-toggle]")];
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const panel = document.getElementById(toggle.getAttribute("aria-controls"));
        const willOpen = toggle.getAttribute("aria-expanded") !== "true";

        toggles.forEach((item) => {
          item.setAttribute("aria-expanded", "false");
          const itemPanel = document.getElementById(item.getAttribute("aria-controls"));
          if (itemPanel) itemPanel.hidden = true;
        });

        toggle.setAttribute("aria-expanded", String(willOpen));
        if (panel) panel.hidden = !willOpen;
      });
    });
  });
}

function bindJobDescriptionToggle() {
  document.querySelectorAll("[data-job-description-card]").forEach((card) => {
    const toggle = card.querySelector("[data-job-description-toggle]");
    const label = toggle?.querySelector("span");
    if (!toggle || !label) return;

    toggle.addEventListener("click", () => {
      const isExpanded = !card.classList.toggle("is-collapsed");
      toggle.setAttribute("aria-expanded", String(isExpanded));
      label.textContent = isExpanded ? "Show Less" : "Read Full Job Description";
    });
  });
}

function bindSimilarJobsMore() {
  document.querySelectorAll("[data-similar-jobs-more]").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest(".job-detail-recommendations");
      const cardsToReveal = [...(section?.querySelectorAll("[data-similar-extra='true']:not([data-similar-revealed='true'])") || [])].slice(0, 3);
      cardsToReveal.forEach((card) => {
        card.dataset.similarRevealed = "true";
      });
      const activeTab = section?.querySelector("[data-tab-filter][aria-selected='true']");
      activeTab?.click();
      if (!section?.querySelector("[data-similar-extra='true']:not([data-similar-revealed='true'])")) {
        button.hidden = true;
      }
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
