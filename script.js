const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (header) {
  const setScrolled = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });
}

(() => {
  const measurementId = "G-WWYLD1FE4S";
  const storageKey = `audience_measurement_consent_${measurementId}`;
  const translations = {
    fr: ["Mesure d’audience", "Autorisez-vous Google Analytics à mesurer anonymement la fréquentation du site ? Aucun suivi publicitaire n’est activé.", "Refuser", "Accepter", "Gérer les cookies"],
    en: ["Audience measurement", "Do you allow Google Analytics to measure site traffic? Advertising tracking is disabled.", "Decline", "Accept", "Cookie settings"],
    es: ["Medición de audiencia", "¿Permites que Google Analytics mida las visitas del sitio? El seguimiento publicitario está desactivado.", "Rechazar", "Aceptar", "Gestionar cookies"],
  };
  const labels = translations[(document.documentElement.lang || "fr").slice(0, 2)] || translations.fr;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  const readChoice = () => { try { return localStorage.getItem(storageKey); } catch { return null; } };
  const saveChoice = (value) => { try { localStorage.setItem(storageKey, value); } catch { /* Storage can be unavailable. */ } };
  function loadAnalytics() {
    window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    if (document.querySelector(`script[data-google-analytics="${measurementId}"]`)) return;
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement("script"); script.async = true; script.dataset.googleAnalytics = measurementId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`; document.head.appendChild(script);
  }
  function clearAnalyticsCookies() {
    document.cookie.split(";").forEach((cookie) => { const name = cookie.split("=")[0].trim(); if (!name.startsWith("_ga")) return; document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`; document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}; SameSite=Lax`; });
  }
  function ensureStyles() {
    if (document.getElementById("audience-consent-styles")) return;
    const style = document.createElement("style"); style.id = "audience-consent-styles";
    style.textContent = "#audience-consent{position:fixed;z-index:2147483647;right:1rem;bottom:1rem;width:min(31rem,calc(100vw - 2rem));padding:1rem;border:1px solid #d7d3cb;border-radius:14px;background:#fff;color:#171717;box-shadow:0 12px 40px #0003;font:15px/1.45 system-ui,sans-serif}#audience-consent h2{margin:0 0 .35rem;font:700 18px/1.3 system-ui,sans-serif}#audience-consent p{margin:0}#audience-consent div{display:flex;justify-content:flex-end;gap:.6rem;margin-top:.9rem}#audience-consent button,#audience-consent-manage{min-height:42px;padding:.6rem .9rem;border:1px solid #171717;border-radius:999px;cursor:pointer;font:600 14px system-ui,sans-serif}#audience-consent [data-consent-refuse]{background:#fff;color:#171717}#audience-consent [data-consent-accept]{background:#171717;color:#fff}#audience-consent-manage{position:fixed;z-index:2147483646;left:.75rem;bottom:.75rem;min-height:auto;padding:.35rem .65rem;background:#fff;color:#171717;box-shadow:0 3px 14px #0002}";
    document.head.appendChild(style);
  }
  function showManager() {
    ensureStyles(); let manager = document.getElementById("audience-consent-manage");
    if (!manager) { manager = document.createElement("button"); manager.id = "audience-consent-manage"; manager.type = "button"; manager.textContent = labels[4]; manager.addEventListener("click", showDialog); document.body.appendChild(manager); }
    manager.hidden = false;
  }
  function applyChoice(choice) {
    saveChoice(choice); document.getElementById("audience-consent")?.remove();
    if (choice === "granted") loadAnalytics(); else { window.gtag("consent", "update", { analytics_storage: "denied" }); clearAnalyticsCookies(); }
    showManager();
  }
  function showDialog() {
    ensureStyles(); document.getElementById("audience-consent-manage")?.setAttribute("hidden", ""); if (document.getElementById("audience-consent")) return;
    const dialog = document.createElement("section"); dialog.id = "audience-consent"; dialog.setAttribute("role", "dialog"); dialog.setAttribute("aria-labelledby", "audience-consent-title");
    dialog.innerHTML = `<h2 id="audience-consent-title">${labels[0]}</h2><p>${labels[1]}</p><div><button type="button" data-consent-refuse>${labels[2]}</button><button type="button" data-consent-accept>${labels[3]}</button></div>`;
    dialog.querySelector("[data-consent-refuse]").addEventListener("click", () => applyChoice("denied")); dialog.querySelector("[data-consent-accept]").addEventListener("click", () => applyChoice("granted")); document.body.appendChild(dialog); dialog.querySelector("[data-consent-accept]").focus();
  }
  function start() { const choice = readChoice(); if (choice === "granted") loadAnalytics(); if (choice === "granted" || choice === "denied") showManager(); else showDialog(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true }); else start();
})();
