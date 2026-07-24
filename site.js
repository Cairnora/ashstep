(() => {
  const storageKey = "akora-language";
  const root = document.documentElement;
  const toggle = document.querySelector("[data-language-toggle]");

  if (!toggle) {
    return;
  }

  function setLanguage(language) {
    const next = language === "en" ? "en" : "ko";
    root.dataset.lang = next;
    root.lang = next;
    toggle.textContent = next === "ko" ? "EN" : "KO";
    toggle.setAttribute("aria-label", next === "ko" ? "영문으로 보기" : "View in Korean");
    document.querySelectorAll("[data-aria-ko][data-aria-en]").forEach((element) => {
      element.setAttribute(
        "aria-label",
        next === "ko" ? element.dataset.ariaKo : element.dataset.ariaEn
      );
    });
    document.title =
      next === "ko"
        ? root.dataset.titleKo || "AKORA | 아코라 유한회사"
        : root.dataset.titleEn || "AKORA | Digital Service Company";

    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // The site still works when browser storage is unavailable.
    }
  }

  let savedLanguage = "ko";

  try {
    savedLanguage = window.localStorage.getItem(storageKey) || "ko";
  } catch {
    savedLanguage = "ko";
  }

  setLanguage(savedLanguage);
  toggle.addEventListener("click", () => {
    setLanguage(root.dataset.lang === "en" ? "ko" : "en");
  });
})();
