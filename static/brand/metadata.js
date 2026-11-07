// Generated from src/metadata.ts by scripts/render-node-runtime.mjs.
/** Product names and share artwork are shared by build and browser adapters. */
export const diesisProductIdentities = {
  site: {
    name: "Diesis",
    shortName: "Diesis",
    icon: "diesis",
    host: "0xdiesis.com",
    kicker: "THE DIESIS ECOSYSTEM",
    headline: ["One network.", "Yours to explore."],
    summary: "Explore. Build. Connect.",
  },
  portal: {
    name: "Diesis Portal",
    shortName: "Portal",
    icon: "diesis",
    host: "portal.0xdiesis.com",
    kicker: "YOUR DIESIS WORKSPACE",
    headline: ["Your Diesis", "account."],
    summary: "Names, account tools and your next move.",
  },
  explorer: {
    name: "Diesis Explorer",
    shortName: "Explorer",
    icon: "explorer",
    host: "explorer.0xdiesis.com",
    kicker: "PUBLIC CHAIN ACTIVITY",
    headline: ["Read the chain.", "Follow every move."],
    summary: "Blocks, transactions and native network insights.",
  },
  exchange: {
    name: "Diesis Exchange",
    shortName: "Exchange",
    icon: "exchange",
    host: "exchange.0xdiesis.com",
    kicker: "NATIVE MARKETS",
    headline: ["Find your market.", "Make your move."],
    summary: "Markets, orders and permissions in one place.",
  },
  faucet: {
    name: "Diesis Faucet",
    shortName: "Faucet",
    icon: "faucet",
    host: "faucet.0xdiesis.com",
    kicker: "BUILD ON DIESIS",
    headline: ["Start with test DS.", "Build what comes next."],
    summary: "Testnet tokens for your next experiment.",
  },
  mpc: {
    name: "dsMPC",
    shortName: "dsMPC",
    icon: "mpc",
    host: "mpc.0xdiesis.com",
    kicker: "POLICY-GOVERNED SIGNING",
    headline: ["Shared control.", "Deliberate signing."],
    summary: "Accounts, signing policies and independent approvals.",
  },
  mcp: {
    name: "Diesis MCP",
    shortName: "MCP",
    icon: "mcp",
    host: "mcp.0xdiesis.com",
    kicker: "SCOPED AGENT ACCESS",
    headline: ["Connect your agent.", "Scope every action."],
    summary: "Scoped tools for AI agents in the Diesis ecosystem.",
  },
}         ;



export function renderDiesisFavicons(app                 )         {
  if (!Object.hasOwn(diesisProductIdentities, app))
    throw new Error("Unknown Diesis product identity.");
  return [
    `<link data-diesis-head data-diesis-favicon="${app}" rel="icon" type="image/x-icon" sizes="any" href="/brand/favicon-${app}.ico" />`,
    `<link data-diesis-head data-diesis-favicon="${app}" rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-${app}-32.png" />`,
    `<link data-diesis-head data-diesis-favicon="${app}" rel="icon" type="image/svg+xml" href="/brand/favicon-${app}.svg" />`,
    `<link data-diesis-head rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-${app}.png" />`,
    `<link data-diesis-head rel="manifest" href="/brand/${app}.webmanifest" />`,
  ].join("\n");
}









export function resolvePublicOrigin(value         )                     {
  if (!value?.trim()) return undefined;
  const url = new URL(value);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (
    (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  )
    throw new Error(
      "Public origin must be an HTTPS origin without credentials, path, query or fragment.",
    );
  return url.origin;
}
const escape = (value        ) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ,
  );

export function renderDiesisHead(page                    )         {
  const origin = resolvePublicOrigin(page.origin);
  if (
    !page.path.startsWith("/") ||
    page.path.startsWith("//") ||
    /[?#]/.test(page.path)
  )
    throw new Error(
      "Metadata path must be a local route without query or fragment.",
    );
  const tag = (kind        , value        , content        ) =>
    `<meta data-diesis-head ${kind}="${escape(value)}" content="${escape(content)}" />`;
  const product = diesisProductIdentities[page.app];
  if (!Object.hasOwn(diesisProductIdentities, page.app))
    throw new Error("Unknown Diesis product identity.");
  const site = product.name;
  const image = origin
    ? new URL(`/brand/social-${page.app}.png`, origin).href
    : undefined;
  return [
    `<title data-diesis-head>${escape(page.title)}</title>`,
    tag("name", "description", page.description),
    tag("name", "application-name", site),
    tag("name", "color-scheme", "light dark"),
    `<meta data-diesis-head name="theme-color" content="#f4f0e9" media="(prefers-color-scheme: light)" />`,
    `<meta data-diesis-head name="theme-color" content="#1c1922" media="(prefers-color-scheme: dark)" />`,
    renderDiesisFavicons(page.app),
    tag("property", "og:type", "website"),
    tag("property", "og:site_name", site),
    tag("property", "og:locale", "en_US"),
    tag("property", "og:title", page.title),
    tag("property", "og:description", page.description),
    tag("name", "twitter:card", "summary_large_image"),
    tag("name", "twitter:title", page.title),
    tag("name", "twitter:description", page.description),
    ...(origin
      ? [
          `<link data-diesis-head rel="canonical" href="${escape(new URL(page.path, origin).href)}" />`,
          tag("property", "og:url", new URL(page.path, origin).href),
        ]
      : []),
    ...(image
      ? [
          tag("property", "og:image", image),
          tag("property", "og:image:type", "image/png"),
          tag("property", "og:image:width", "1200"),
          tag("property", "og:image:height", "630"),
          tag(
            "property",
            "og:image:alt",
            `${site}. One ecosystem. Many ways in.`,
          ),
          tag("name", "twitter:image", image),
          tag(
            "name",
            "twitter:image:alt",
            `${site}. One ecosystem. Many ways in.`,
          ),
        ]
      : []),
  ].join("\n");
}

export function updateBrowserThemeColor() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const color = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--diesis-surface")
    .trim();
  if (color)
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((element) => element.setAttribute("content", color));
  const theme =
    document.documentElement.dataset.diesisTheme === "dark" ? "dark" : "light";
  document
    .querySelectorAll                 ("link[data-diesis-favicon]")
    .forEach((link) => {
      const app = link.dataset.diesisFavicon;
      if (!app || !Object.hasOwn(diesisProductIdentities, app)) return;
      const suffix =
        link.type === "image/svg+xml"
          ? ".svg"
          : link.type === "image/png"
            ? "-32.png"
            : ".ico";
      link.setAttribute("href", `/brand/favicon-${app}-${theme}${suffix}`);
    });
}

/** Synchronize chrome color and tab artwork after a non-Vue theme change. */
export const syncDiesisBrowserIdentity = updateBrowserThemeColor;

export function applyDiesisHead(page                    ) {
  if (typeof document === "undefined") return;
  document.head
    .querySelectorAll("[data-diesis-head]")
    .forEach((element) => element.remove());
  const template = document.createElement("template");
  template.innerHTML = renderDiesisHead(page);
  document.head.append(template.content);
  updateBrowserThemeColor();
}
