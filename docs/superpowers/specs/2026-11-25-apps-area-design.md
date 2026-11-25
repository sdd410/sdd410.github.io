# Apps area and Stick privacy policy

Date: 25 Nov 2026. Status: **approved** by Sidharth (short design, small change).

## Why
Google Play needs a public privacy policy URL before Stick (App #001 of the @th3_on3guy "everyday problems become apps" series) can go to closed testing. Sidharth wants it on his own site, inside a new **Apps** area where every app he builds gets its own page and its own privacy policy.

## Goals
- A stable policy URL for Play: `https://sdd410.github.io/apps/stick/privacy/`.
- An **Apps** section on the home page, and a page per app under `/apps/<app>/`.
- Honest policy text that matches what Stick actually does (from its code).

## Non-goals
- A terminal command for apps, store screenshots, analytics, any build tooling.
- An `/apps/` index page (the home section is the index).

## Anti-goals
- Anything that breaks the site's zero-dependency, no-build rule (`AGENTS.md`).
- A policy that claims more privacy than the app gives (e.g. ignoring Android backup).

## Approaches
1. **Hand-written static pages in this repo, reusing `css/style.css` (picked).** Fits `AGENTS.md`; themes keep working; stable URLs on the same domain.
2. Jekyll/Markdown pages: needs GitHub Pages' Jekyll build and conventions the site doesn't use.
3. Policy on Google Docs or a policy generator: off-domain, less trustworthy, not part of the portfolio.

Layout choices (picked by Sidharth in mockups):
- **Apps area: a section on the home page** (option A), with an "Apps" link in the navbar and mobile drawer. Each card links to the app's page.
- **App pages use the site's own style** (option A): navy/cyan, Space Grotesk, the 4 themes; only the app icon uses the app's brand colour (Stick: lime `#c6ff3d`).

## Design
**Home (`index.html`)**
- Navbar and mobile drawer: "Apps" link to `#apps`, placed between Experience and Projects.
- New `<section id="apps" class="section">` between Experience and Projects: title "Apps I'm building in public", one line about the series (everyday problems turned into small apps, built in public on Instagram @th3_on3guy).
  - Stick card: lime "S." icon tile, "Stick", chip "App #001 · Closed testing", line "A habit app for people who quit new habits by day 3.", links **Details →** (`apps/stick/`) and **Privacy** (`apps/stick/privacy/`).
  - App #002 card: grey "?" tile, chip "Picking", line "Chosen from your comments on @th3_on3guy."

**`apps/stick/index.html`**
- Uses `../../css/style.css` and fonts; applies the saved theme (`localStorage` `sdd_theme`) on load; no terminal, audio, canvas or simulator scripts.
- Top: link back "← Sidharth Sreekumar" to `/` and breadcrumb "Apps / Stick".
- Hero: icon tile, "Stick", "A habit app for people who quit by day 3.", chip "App #001 · Closed testing".
- Tester call: "Want to test it? Comment TEST on @th3_on3guy, be 1 of 12 testers." linking to `https://www.instagram.com/th3_on3guy/`.
- Four features: Day 3 rescue; No broken streaks; Message to future you; Private (no internet, no account, all on your phone).
- Footer: Privacy policy link; "Built in public on Instagram @th3_on3guy".

**`apps/stick/privacy/index.html`** (plain, readable, same style)
- Effective date 25 November 2026; developer Sidharth Sreekumar; contact **oneguyatwork@gmail.com**.
- What Stick stores, all on the device: habit name, tiny version, reason, emoji/template, reminder time, onboarding answers, check-in days and attempts, app settings, voice and video clips you record.
- Nothing leaves the phone through Stick: no internet permission, no account, no ads, no analytics, no third-party SDKs that collect data; the developer cannot see your data.
- Permissions: camera and microphone only while recording a clip; notifications for reminders; run at startup to restore reminders after a restart; vibrate for haptics; keep-awake for reliable reminders; a network-state permission added by a library (Stick has no internet permission, so it cannot connect or send anything).
- Android backup: if Android backup is on, Google's device backup may include Stick's habit data (not clips) in the user's Google account, under Google's terms; device-to-device transfer may copy everything. Users can turn backup off in Android settings.
- Deleting: Settings → Fresh start clears the habit and days (clips optional); uninstalling deletes everything on the phone.
- Purchases: a future one-time Pro unlock will be handled by Google Play; Stick never sees payment details.
- Children: not directed at children under 13; no data is collected from anyone.
- Changes: posted on this page with a new effective date.
- Contact: oneguyatwork@gmail.com.

**Docs:** one line each in `README.md` and `AGENTS.md` (repository layout) about `apps/<app>/` and `apps/<app>/privacy/`.

## Constraints
- Zero dependencies, no build step; GitHub Pages serves `main` at `/`.
- Theme colours only via CSS custom properties, except the app's own brand colour on its icon.
- Pages must work on mobile (the site is mobile-optimised) and pass `node -c` for any JS touched.

## Left to the builder
- Exact markup and small page-specific CSS (scoped, using existing tokens and card styles).
- Copy polish within the facts above.

## After it ships
Play Console → Stick → App content → Privacy policy → `https://sdd410.github.io/apps/stick/privacy/`. Publishing to `main` happens only when Sidharth says so.
