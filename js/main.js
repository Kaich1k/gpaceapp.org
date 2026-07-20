const config = window.GPACE_SITE || {
  appStoreUrl: "https://apps.apple.com/app/id6792100451",
  supportEmail: "support@gpaceapp.org",
};

document.querySelectorAll("[data-app-store]").forEach((el) => {
  el.setAttribute("href", config.appStoreUrl);
});

document.querySelectorAll("[data-support-email]").forEach((el) => {
  const email = config.supportEmail;
  if (el.tagName === "A") {
    el.setAttribute("href", `mailto:${email}`);
    if (!el.textContent.trim() || el.dataset.supportEmail === "fill") {
      el.textContent = email;
    }
  } else {
    el.textContent = email;
  }
});

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

document.querySelectorAll("[data-faq-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest("[data-faq-item]");
    if (!item) return;
    const open = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });
});
