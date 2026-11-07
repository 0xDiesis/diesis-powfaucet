// Generated from src/navigation.ts by scripts/render-node-runtime.mjs.
/** Keep sequential keyboard focus inside a modal navigation drawer.
 * Native dialog focus can visit the browser chrome at a boundary in Chromium.
 */
export function containNavigationFocus(event               ) {
  if (event.key !== "Tab") return;
  const dialog = event.currentTarget;
  if (!(dialog instanceof HTMLDialogElement) || !dialog.open) return;
  const controls = Array.from(
    dialog.querySelectorAll             (
      "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]",
    ),
  ).filter(
    (element) => element.tabIndex >= 0 && element.getClientRects().length > 0,
  );
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first || !last) {
    event.preventDefault();
    return;
  }
  const active = document.activeElement;
  if (
    event.shiftKey &&
    (active === first || active === dialog || !dialog.contains(active))
  ) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    (active === last || active === dialog || !dialog.contains(active))
  ) {
    event.preventDefault();
    first.focus();
  }
}

// App lifecycle only; dialog geometry and focus containment come from brand.
const menuButton = document.querySelector('[aria-controls="faucet-navigation"]');
const menuDialog = document.getElementById('faucet-navigation');
if (menuButton && menuDialog) {
  let previousOverflow = '';
  let focusAfterClose = '';
  function focusDestination(hash) {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
    target.focus({preventScroll: true});
    target.scrollIntoView({block: 'start'});
  }
  menuButton.addEventListener('click', event => {
    event.preventDefault();
    if (menuDialog.open) return;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    menuDialog.showModal();
    menuButton.setAttribute('aria-expanded', 'true');
    menuDialog.querySelector('[autofocus]').focus();
  });
  menuDialog.addEventListener('keydown', containNavigationFocus);
  menuDialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    menuButton.setAttribute('aria-expanded', 'false');
    if (focusAfterClose) {
      focusDestination(focusAfterClose);
      focusAfterClose = '';
    } else menuButton.focus({preventScroll: true});
  });
  menuDialog.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', event => {
      const destination = new URL(link.href);
      if (destination.origin === location.origin && destination.pathname === location.pathname && destination.search === location.search && destination.hash) {
        event.preventDefault();
        history.pushState(null, '', destination.hash);
        focusAfterClose = destination.hash;
      }
      menuDialog.close();
    });
  });
  if (location.hash) focusDestination(location.hash);
}
