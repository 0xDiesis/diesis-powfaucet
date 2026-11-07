import { syncDiesisBrowserIdentity } from '/brand/metadata.js';

// React lifecycle adapter for the same preference and browser identity helper
// used by the shared Vue theme control. All visuals come from interface.css.
const choices = ['light', 'dark', 'system'];
const media = window.matchMedia('(prefers-color-scheme: dark)');
let mode = 'system';
try { const stored = localStorage.getItem('diesis-theme'); if (choices.includes(stored)) mode = stored; } catch { /* Storage may be unavailable. */ }
function apply() {
  document.documentElement.dataset.diesisTheme = mode === 'system' ? (media.matches ? 'dark' : 'light') : mode;
  document.querySelectorAll('.theme-control button[name="theme"]').forEach(button => {
    const selected = button.value === mode;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  syncDiesisBrowserIdentity();
}
document.querySelector('.theme-control form').addEventListener('submit', event => {
  event.preventDefault();
  if (!choices.includes(event.submitter?.value)) return;
  mode = event.submitter.value;
  try { if (mode === 'system') localStorage.removeItem('diesis-theme'); else localStorage.setItem('diesis-theme', mode); } catch { /* Keep the current in-memory preference. */ }
  apply();
});
media.addEventListener('change', () => { if (mode === 'system') apply(); });
apply();
