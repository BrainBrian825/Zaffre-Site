const tabs = Array.from(document.querySelectorAll("[data-character]"));
const panels = Array.from(document.querySelectorAll("[data-character-panel]"));
const referenceSection = document.querySelector("#reference");

function normalizeCharacter(hash) {
  const value = hash.replace("#", "").toLowerCase();
  return value === "bolt" ? "bolt" : "home";
}

function showCharacter(character, shouldScroll = false) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.character === character;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.characterPanel === character;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });

  if (shouldScroll) {
    referenceSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    const character = tab.dataset.character;
    const hash = character === "bolt" ? "#bolt" : "#home";
    history.pushState(null, "", hash);
    showCharacter(character, true);
  });
});

window.addEventListener("hashchange", () => {
  const character = normalizeCharacter(window.location.hash);
  showCharacter(character, window.location.hash === "#bolt" || window.location.hash === "#home");
});

if (window.location.hash === "#bolt" || window.location.hash === "#home") {
  showCharacter(normalizeCharacter(window.location.hash), false);
}
