# AGENTS.md — AI Agent Guidelines & Architecture Handbook

> **Target Audience:** AI Coding Agents (Antigravity, Claude Code, Cursor, Copilot, Codex, etc.) and human contributors.  
> **Repository:** Sidharth Sreekumar — Personal Engineering Portfolio & Interactive Website  
> **Primary Technology Stack:** Zero-dependency static architecture (Pure HTML5, CSS3, ES6+ JavaScript, WebGL/Canvas 2D, Web Audio API, Node.js HTTP server).

---

## 1. Project Overview & Core Philosophy

This repository contains the interactive portfolio and engineering showcase for **Sidharth Sreekumar** (Software Engineer — Scalable Backend Microservices & Distributed Systems). It highlights production experience at **Verteil Technologies** (co-code ownership of the **Riyadh Air** NDC integration), Java 18+/Spring Boot, gRPC, AWS cloud-native architecture, JVM profiling (Java Flight Recorder), and computer science projects.

### Foundational Architectural Principles
1. **Zero External Runtime Client Dependencies**:  
   No frontend JavaScript frameworks (React, Vue, Angular), no bundlers (Webpack, Vite), no utility-class CSS engines (Tailwind), and no external CDN libraries. All UI components, sound synthesis, physics simulations, and terminal emulators are hand-crafted from first principles in vanilla web technologies.
2. **Zero-Build, Static-First Deployment**:  
   The codebase can be served directly by any static web server (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3/CloudFront) or run locally using the included lightweight Node.js HTTP server.
3. **High-Performance Client-Side Simulations**:  
   Features 60 FPS real-time fluid particle canvas physics, an interactive Verteil/Riyadh Air distributed system simulator, and an autonomous swarm drone surveillance simulation inside an interactive modal.
4. **Rich Ergonomics & Multi-Theme System**:  
   Includes a Quake-style floating CLI HUD terminal (hotkey `T`), client-side Web Audio API synthesizer for sound effects (hotkey `M`), and 4 dynamic theme palettes with synchronized canvas styling.

---

## 2. Repository Layout & File Responsibilities

```text
/Users/sdd410/personal website/
├── AGENTS.md                  # Comprehensive AI agent handbook and codebase reference
├── README.md                  # User-facing project documentation and quickstart
├── package.json               # Project metadata & npm script (`npm start`)
├── server.js                  # Zero-dependency local Node.js static HTTP server
├── index.html                 # Semantic HTML5 structure, SEO, meta tags, and layouts
├── Sidharth_Sreekumar_SWE.pdf # Official SWE resume PDF (linked across UI and CLI)
├── css/
│   └── style.css              # Design tokens, themes, fluid typography, glassmorphism, responsive grid
└── js/
    ├── audio.js               # Synthesized Web Audio API sound designer (SoundEngine)
    ├── fluid-canvas.js        # Interactive particle-wave fluid physics background (FluidCanvas)
    ├── system-simulator.js    # Riyadh Air / Spring Boot / gRPC / JFR interactive telemetry hub
    ├── terminal.js            # Quake-style interactive CLI HUD terminal (InteractiveTerminal)
    └── app.js                 # App coordinator: theme toggle, drawer nav, typing effect, swarm sim
```

### Detailed File Matrix

| File Path | Role | Key Components / Classes | Dependencies |
| :--- | :--- | :--- | :--- |
| `index.html` | Entry document | Header, Hero, Architecture, Experience, Projects, Skills, Education, Contact, Terminal Modal, Drone Modal | `css/style.css`, Google Fonts |
| `css/style.css` | Global styling | CSS Custom Properties, Theme palettes, Bento grid, Glassmorphism, Responsive queries | None |
| `server.js` | Dev web server | Node.js native `http`, `fs`, `path` server, MIME dictionary, directory-traversal sanitizer | Node.js standard library |
| `js/audio.js` | Audio engine | `class SoundEngine` (`playPop`, `playClick`, `playHover`, `playSuccess`, `playSpike`) | Native Web Audio API |
| `js/fluid-canvas.js` | Background canvas | `class FluidCanvas` (particle vectors, mouse deflection, dynamic theme palette adaptation) | HTML5 2D Canvas |
| `js/system-simulator.js`| Microservice hub | `class SystemSimulator` (traffic spike, JFR dump, gRPC protobuf viewer, interactive nodes) | DOM, `SoundEngine` |
| `js/terminal.js` | Quake CLI HUD | `class InteractiveTerminal` (command parser, autocompletion, history buffer, quick buttons) | DOM, `SoundEngine` |
| `js/app.js` | UI coordinator | Theme switching, mobile drawer navigation, dynamic hero typewriter, drone swarm modal sim | DOM, `SoundEngine` |
| `Sidharth_Sreekumar_SWE.pdf` | Resume asset | Official resume downloadable via navbar, hero, terminal, drawer, and footer | Static PDF reader |

---

## 3. Development Workflow & Operational Commands

### Prerequisites
- Node.js 16+ (recommended for running local server and syntax verification).
- Modern web browser (Chrome, Safari, Edge, Firefox).

### Common Commands

```bash
# Start local development server (runs on http://localhost:3000)
npm start
# or directly:
node server.js

# Custom port
PORT=8080 node server.js

# Validate JavaScript syntax across all JS files (essential pre-commit check for agents)
node -c server.js js/*.js

# Check git status and staged changes
git status
git diff
```

### Script Load Order (`index.html`)
The scripts at the bottom of `index.html` must maintain this exact order:
1. `js/audio.js`: Initializes `window.soundEngine` needed by subsequent modules.
2. `js/fluid-canvas.js`: Initializes fluid background canvas physics.
3. `js/system-simulator.js`: Boots the distributed systems architecture interactive hub.
4. `js/terminal.js`: Boots the terminal emulator and binds keyboard hotkeys.
5. `js/app.js`: Coordinates navigation, theme switching, typewriter, and drone modal.

---

## 4. Subsystem Deep-Dive & Implementation Rules

### 4.1 Theme System (`css/style.css` & `js/app.js`)
The application supports four coordinated themes driven by the `data-theme` attribute on `document.documentElement`:
- `midnight` (Default): Liquid Midnight — deep obsidian `#060911` with electric cyan `#00f2fe` and indigo `#6366f1`.
- `emerald`: Cyber Emerald — AWS and terminal green tones (`#040d0a` / `#10b981`).
- `amber`: Sunset Amber — warm gold and amber glow (`#0f0b08` / `#f59e0b`).
- `light`: Clean Light Modern — executive daylight aesthetic (`#f8fafc` / `#0284c7`).

#### Theming Rules for Agents:
- **Never hardcode hex values for UI surfaces or text colors in CSS.** Always use CSS custom properties:
  - Surface: `var(--bg-primary)`, `var(--bg-secondary)`, `var(--bg-card)`, `var(--bg-glass)`
  - Borders: `var(--border-subtle)`, `var(--border-glow)`, `var(--border-active)`
  - Text: `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`, `var(--text-accent)`
  - Accent: `var(--accent-cyan)`, `var(--accent-blue)`, `var(--accent-indigo)`, `var(--glow-cyan)`
- When switching themes in JS, update both `document.documentElement.setAttribute('data-theme', theme)` and `localStorage.setItem('sdd_theme', theme)`.
- If new colors or themes are introduced, also update `getThemeColors()` in `js/fluid-canvas.js` so particle waves adapt automatically.

### 4.2 Web Audio API Synthesizer (`js/audio.js`)
- Exposes `window.soundEngine` with zero external audio assets (pure oscillator waveforms: sine, triangle, sawtooth).
- **Mute State**: Persisted in `localStorage.getItem('sdd_sound_muted')`.
- **Autoplay Policy Compliance**: The audio context is initialized lazily upon user interaction (`init()` called on first click/hover) and safely calls `ctx.resume()` if suspended.
- **Agent Guardrail**: Never load external `.mp3` or `.wav` files. Retain synthesized sound generation to preserve zero-dependency, instant loading.

### 4.3 Background Fluid Physics (`js/fluid-canvas.js`)
- Renders dynamic particle connections within proximity threshold (130px on desktop).
- Scales particle count dynamically based on viewport (`numParticles = 35` on mobile `< 768px`, `65` on desktop).
- Clamps `devicePixelRatio` to `Math.min(window.devicePixelRatio || 1, 2)` to avoid performance bottlenecks on high-density Retina screens.
- Deflects particles based on pointer velocity (`vx`, `vy`) and triggers ripple wavefronts on clicks.

### 4.4 Distributed Systems & JVM Observability Hub (`js/system-simulator.js`)
- Simulates Sidharth's production work at Verteil Technologies for Riyadh Air:
  - **Inbound Flight Search**: Simulates OAuth 2.0 / JWT validation and cache query.
  - **Redis Cache Hit / Miss**: Renders real-time telemetry logs with synthetic trace IDs.
  - **Simulate Load Spike**: Ramps throughput up to 4,800+ req/s, triggers synthetic ArgoCD autoscaling, and changes badge states.
  - **Run JFR Dump**: Live JVM telemetry (Virtual Threads, ZGC pause times < 0.4ms, Heap usage).
  - **Node Inspection**: Clicking nodes (AWS API Gateway, Spring Boot 3, Redis, gRPC Mesh, PostgreSQL) reveals architectural details.
  - **Protobuf Viewer**: Displays gRPC `.proto` service definition for airline seat availability.

### 4.5 Interactive Developer CLI Terminal (`js/terminal.js`)
- Keyboard launcher: Pressing `T` or `` ` `` (backtick) toggles the terminal modal. Pressing `Esc` closes it.
- Floating HUD button: Positioned in bottom-right corner with `.terminal-hud`.
- Autocompletion: `Tab` key automatically completes available commands.
- History: `ArrowUp` and `ArrowDown` navigate command history buffer.
- Quick command bar: Mobile-friendly buttons (`help`, `about`, `skills`, `experience`, `projects`, `jfr`, `drone`, `resume`, `clear`).
- **Synchronized Commands Registry**:
  - `help`: Lists all supported commands.
  - `about` / `bio`: Professional summary, location, contact.
  - `skills`: Categorized technical skill stack.
  - `experience`: Verteil Technologies SWE and SWE Intern experience details.
  - `projects`: Swarm Drones, Riyadh Air NDC, Sign Language CV, CKD ML.
  - `education`: Amrita School of Engineering & certifications.
  - `jfr`: Telemetry snapshot of JVM metrics.
  - `drone` / `sim`: Launches the Autonomous Swarm Drone simulation modal.
  - `theme <midnight|emerald|amber|light>`: Switches theme palette.
  - `contact`: Email, phone, LinkedIn, GitHub links.
  - `resume`: Triggers direct download of `Sidharth_Sreekumar_SWE.pdf`.
  - `clear`: Empties the terminal output body.
  - `exit`: Hides the terminal window.

### 4.6 Drone Swarm Coordination Simulator (`js/app.js`)
- Runs in a full modal (`#drone-modal`) with an independent 60 FPS HTML5 canvas (`#drone-swarm-canvas`).
- Simulates 24 autonomous UAVs using:
  - **Target Attraction**: Vector pull toward a roaming target beacon.
  - **Boids Separation**: Inverse-square peer repulsion to avoid mid-air collisions.
  - **Mesh Networking**: Inter-drone proximity lines (`< 65px`) and target lock-lines.
  - **Interactive Drag & Click**: Users can drag or click to relocate the surveillance target in real time.
- **Memory & Resource Safety**:
  - Uses `cancelAnimationFrame(droneSimAnimationId)` and an `AbortController` signal to clean up event listeners and stop the loop when the modal is closed.

---

## 5. Coding Standards & Agent Best Practices

### 1. Maintain Zero External Runtime Dependencies
- **DO NOT** run `npm install <package>` for frontend features.
- **DO NOT** add CDN `<script>` tags for external libraries (e.g. jQuery, React, Bootstrap, Tailwind, Lodash).
- Use native Web APIs (`fetch`, `AudioContext`, `CanvasRenderingContext2D`, `IntersectionObserver`, `ResizeObserver`, `localStorage`).

### 2. Synchronization Across Information Surfaces
Sidharth's professional information appears in three distinct locations that **must remain strictly synchronized**:
1. `index.html` (the primary webpage sections).
2. `js/terminal.js` (the CLI terminal command handlers: `cmdBio`, `cmdSkills`, `cmdExperience`, `cmdProjects`, `cmdEducation`, `cmdContact`).
3. `README.md` (the repository documentation).

> [!IMPORTANT]
> If you update job titles, dates, project descriptions, skills, or contact info in `index.html`, you **MUST** update the corresponding command method in `js/terminal.js` and relevant sections in `README.md`.

### 3. Responsive Design & Touch Targets
- All interactive controls (buttons, links, terminal chips, close buttons) must have a tap target of at least **44 × 44 pixels** on mobile.
- Use fluid typography with `clamp()` and responsive CSS variables.
- Always verify behavior on mobile viewports (e.g., 375px width, 390px iPhone, 412px Android) as well as desktop (1440px+).

### 4. Canvas Performance & Lifecycle Management
- Always clamp `devicePixelRatio` using `Math.min(window.devicePixelRatio || 1, 2)`.
- Always cancel animation frames using `cancelAnimationFrame` when a modal or canvas is hidden to prevent background CPU/GPU drain.
- Clean up window resize and interaction event listeners using `AbortController` or explicit `removeEventListener`.

### 5. Accessibility (a11y)
- Preserve `aria-label` and `title` attributes on all icon-only buttons (theme toggle, sound toggle, mobile menu toggle, close buttons).
- Ensure high contrast in both dark themes and the light theme.
- Support keyboard users: modal closing via `Escape`, terminal toggle via `T`, audio mute via `M`.

### 6. Local Server Security (`server.js`)
- `server.js` includes directory traversal protection:
  ```javascript
  let safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  ```
- Maintain correct MIME types in the `MIME_TYPES` dictionary when adding new asset types.

---

## 6. Common Modification Recipes for Agents

### Recipe A: Adding or Modifying a Technical Skill
1. In `index.html`:
   - Locate `#skills` section.
   - Find the appropriate `.skills-category-group` (Backend, Languages, Cloud, AI, Observability).
   - Add/edit the skill pill or card. Ensure `data-category` attribute matches filter buttons (`backend`, `cloud`, `languages`, `devops`, `performance`).
2. In `js/terminal.js`:
   - Locate `cmdSkills()` (around line 190).
   - Update the terminal output string to reflect the change.
3. Validate syntax: `node -c js/terminal.js`.

### Recipe B: Updating Work Experience
1. In `index.html`:
   - Locate `#experience` section.
   - Update job title, duration, bullet points, tech tags, or metrics.
2. In `js/terminal.js`:
   - Locate `cmdExperience()` (around line 201).
   - Update the text format in the terminal command.
3. In `README.md`:
   - Update any summary references if affected.
4. Validate syntax: `node -c js/terminal.js`.

### Recipe C: Adding a New Terminal Command
1. Open `js/terminal.js`.
2. Add the command name to `this.commands` map in the constructor:
   ```javascript
   'newcmd': () => this.cmdNewCmd(),
   ```
3. Implement the command method:
   ```javascript
   cmdNewCmd() {
     this.print(`<span style="color:#38bdf8;font-weight:700;">Output Title</span>\nDetails here...`, false);
   }
   ```
4. Add the command to `cmdHelp()` so users see it in the `help` menu.
5. (Optional) If mobile users should have quick access, add a quick button in `index.html` under `.terminal-quick-cmds`:
   ```html
   <button type="button" class="term-quick-btn" data-cmd="newcmd">newcmd</button>
   ```
6. Validate syntax: `node -c js/terminal.js`.

### Recipe D: Adding a New Theme Palette
1. In `css/style.css`:
   - Add a new attribute selector `[data-theme="newtheme"]` overriding CSS variables (`--bg-primary`, `--bg-secondary`, `--bg-card`, `--border-glow`, `--accent-cyan`, etc.).
2. In `js/app.js`:
   - Add `'newtheme'` to `const themes = ['midnight', 'emerald', 'amber', 'light', 'newtheme'];`.
   - Add theme chip button in `index.html` within `.mobile-drawer-theme-grid` with `data-theme-choice="newtheme"`.
3. In `js/fluid-canvas.js`:
   - Add the color mapping in `getThemeColors()` for `'newtheme'`.
4. In `js/terminal.js`:
   - Add `'newtheme'` to the `valid` array in `cmdTheme(args)`.
5. Validate syntax: `node -c js/*.js`.

### Recipe E: Updating the Resume PDF
1. Replace `Sidharth_Sreekumar_SWE.pdf` in the workspace root with the updated resume PDF.
2. Ensure file naming remains identical (`Sidharth_Sreekumar_SWE.pdf`).
3. Verify that all 5 download links in `index.html` point to the file:
   - Navbar resume button (`.nav-resume-btn`)
   - Mobile drawer resume button (`.mobile-drawer-resume-btn`)
   - Hero action button (`.hero-actions`)
   - Contact section resume button
   - Footer metadata link
4. Verify the `resume` command in `js/terminal.js` continues to download the correct filename.

---

## 7. Verification & Quality Assurance Protocol

Before submitting any code changes, every AI agent must execute this checklist:

- [ ] **Syntax Validation**: Run `node -c server.js js/*.js` and verify zero errors.
- [ ] **Cross-Surface Consistency**: Verify that changes made to biographical data, skills, experience, or projects in `index.html` are mirrored in `js/terminal.js` and `README.md`.
- [ ] **Theme Integrity**: Verify that newly styled elements look correct in all 4 themes (`midnight`, `emerald`, `amber`, `light`).
- [ ] **Mobile Responsiveness**: Verify layout at 375px width. Ensure no horizontal overflow, drawer navigation opens and closes smoothly, and terminal HUD remains accessible.
- [ ] **Zero-Dependency Check**: Confirm no `package-lock.json`, `node_modules` additions, or remote script tags were introduced.
- [ ] **Console Cleanliness**: Ensure zero JavaScript runtime errors or unhandled exceptions when loading pages or opening modals.
- [ ] **Animation Cleanup**: Confirm any canvas animation loops (`requestAnimationFrame`) are properly cancelled when modal is closed.

---

## 8. Summary of Sidharth Sreekumar's Profile Data

For quick reference when maintaining or generating content:

| Field | Detail |
| :--- | :--- |
| **Full Name** | Sidharth Sreekumar |
| **Role** | Software Engineer (Backend Microservices & Distributed Systems) |
| **Current Employer** | Verteil Technologies Pvt. Ltd (Oct 2023 – Present) |
| **Key Airline Project** | Riyadh Air NDC (New Distribution Capability) Integration |
| **Previous Role** | Software Engineering Intern @ Verteil Technologies (Mar 2023 – Jul 2023) |
| **Education** | B.Tech in Computer Science and Engineering, Amrita School of Engineering (Graduated May 2023) |
| **Location** | Kerala, India |
| **Email** | sidharthsmsd@gmail.com |
| **Phone** | +91 9645332233 |
| **LinkedIn** | [linkedin.com/in/sdd410](https://linkedin.com/in/sdd410) |
| **GitHub** | [github.com/sdd410](https://github.com/sdd410) |
| **Key Technologies** | Java 18+, Spring Boot 3, gRPC, Protobuf, Redis, PostgreSQL, AWS, Docker, ArgoCD, GitHub Actions, JFR, ZGC/G1GC, Grafana, Kibana, Python, OpenCV |
