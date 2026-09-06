# Sidharth Sreekumar — Personal Engineering Portfolio & Interactive Website

> A fluidic, high-performance static interactive personal website built for **Sidharth Sreekumar** (Software Engineer — Scalable Backend Microservices & Distributed Systems), based on the official resume.

---

## 🌟 Overview & Key Highlights

This website is engineered from first principles with **zero external runtime dependencies** (pure modern HTML5, CSS3, ES6 JavaScript, WebGL/Canvas, and Web Audio API synthesis). It runs natively in any modern browser and can be served statically on GitHub Pages, Netlify, Vercel, or locally.

### 🚀 Interactive Engineering Features

1. **Fluid Interactive Canvas Physics (`js/fluid-canvas.js`)**:
   - 60 FPS real-time vector particle and wave fluid simulation.
   - Dynamic deflection based on cursor velocity, pointer tracking, and click ripples.
   - Automatically adapts accent colors to the active theme.

2. **High-Scale Microservice & JVM Observability Hub (`js/system-simulator.js`)**:
   - Visual interactive pipeline modeling Sidharth's production experience at **Verteil Technologies** for the **Riyadh Air** NDC partner integration.
   - Interactive components:
     - **Dispatch Flight Query**: Simulates real-time inbound NDC queries with OAuth 2.0 / JWT validation.
     - **Simulate Load Spike**: Ramps throughput up to 4,800+ req/s, triggering simulated ArgoCD auto-scaling and Redis cache hit ratio visualizer.
     - **Run JFR Dump**: Live Java Flight Recorder telemetry showing JVM heap metrics, ZGC pause times (< 0.4ms), and virtual thread counts.
     - **Inspect Nodes**: Click on AWS API Gateway, Spring Boot 3.x, Redis Cluster, gRPC Mesh, or PostgreSQL replicas to view technical details.
     - **gRPC Protobuf Viewer**: Shows the exact Protobuf service definition for airline seat availability.

3. **Interactive Developer CLI Terminal (`js/terminal.js`)**:
   - Accessible via keyboard hotkey **`T`** or the floating bottom-right HUD button.
   - Supports command autocomplete (Tab), command history (Up/Down arrows), and rich commands:
     - `help`, `about`, `skills`, `experience`, `projects`, `education`, `jfr`, `theme <midnight|emerald|amber|light>`, `resume`, `contact`, `clear`, `exit`.

4. **Autonomous Swarm Drone Coordination Simulator (`js/app.js`)**:
   - Interactive 2D canvas simulation inside a modal showcasing Sidharth's Swarm Drones project.
   - Visualizes boids-based flocking, peer collision avoidance, and dynamic perimeter surveillance around a roaming target.

5. **Web Audio API Synthesizer (`js/audio.js`)**:
   - Synthesized micro-interaction audio feedback (clicks, pops, terminal keystrokes, traffic spike warning) without loading external audio files.
   - Sound toggle button in navigation or press **`M`** to mute/unmute.

6. **Multi-Theme Engine**:
   - **Liquid Midnight** (Default deep cosmic obsidian & electric cyan/indigo).
   - **Cyber Emerald** (AWS & terminal green).
   - **Sunset Amber** (Warm amber gold glow).
   - **Clean Light Modern** (Frosted daylight executive aesthetic).

7. **Direct Resume Integration**:
   - The official resume PDF (`Sidharth_Sreekumar_SWE.pdf`) is integrated with one-click download buttons throughout the navigation, hero, terminal, and footer.

---

## 📁 File Structure

```text
/Users/sdd410/personal website/
├── index.html                  # Semantic, accessible, SEO-optimized HTML5 structure
├── Sidharth_Sreekumar_SWE.pdf  # Original SWE Resume PDF
├── server.js                   # Lightweight zero-dependency local static server
├── package.json                # Project metadata & npm start script
├── README.md                   # Documentation & setup guide
├── css/
│   └── style.css               # Fluid typography, glassmorphism, responsive grid & animations
└── js/
    ├── fluid-canvas.js         # Interactive fluid particle physics background
    ├── audio.js                # Synthesized Web Audio API sound designer
    ├── system-simulator.js     # Riyadh Air / Spring Boot / gRPC / JFR interactive hub
    ├── terminal.js             # Quake-style interactive CLI HUD terminal
    └── app.js                  # Dynamic typing, themes, swarm drone sim modal & toast manager
```

---

## ⚡ How to Run Locally

### Option 1: Using the included Node.js server (Instant)
```bash
node server.js
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Direct file open
Simply double-click [`index.html`](index.html) or open it directly in Safari, Chrome, Edge, or Firefox.

### Option 3: Deploy to GitHub Pages / Vercel / Netlify
Because this is a completely static, zero-build project, you can push this directory to a GitHub repository and enable **GitHub Pages** (Settings > Pages > Deploy from branch: `main` / root) for instant global deployment with HTTPS.
