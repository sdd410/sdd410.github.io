/**
 * INTERACTIVE CLI TERMINAL
 * Full interactive terminal with command history, autocompletion,
 * and deep links into Sidharth Sreekumar's SWE background.
 */

class InteractiveTerminal {
  constructor() {
    this.modal = document.getElementById('terminal-modal');
    this.input = document.getElementById('terminal-cmd-input');
    this.body = document.getElementById('terminal-log-body');
    this.launcherBtn = document.getElementById('terminal-hud-launcher');
    this.closeBtn = document.getElementById('terminal-close-btn');

    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      'help': () => this.cmdHelp(),
      'bio': () => this.cmdBio(),
      'about': () => this.cmdBio(),
      'skills': () => this.cmdSkills(),
      'experience': () => this.cmdExperience(),
      'projects': () => this.cmdProjects(),
      'education': () => this.cmdEducation(),
      'contact': () => this.cmdContact(),
      'jfr': () => this.cmdJFR(),
      'theme': (args) => this.cmdTheme(args),
      'resume': () => this.cmdResume(),
      'clear': () => this.cmdClear(),
      'exit': () => this.toggle(false)
    };

    this.init();
  }

  init() {
    if (!this.modal || !this.input) return;

    if (this.launcherBtn) {
      this.launcherBtn.addEventListener('click', () => this.toggle());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.toggle(false));
    }

    // Keyboard global shortcut: 't' or '`'
    window.addEventListener('keydown', (e) => {
      if ((e.key === 't' || e.key === 'T') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.toggle(false);
      }
    });

    // Input handlers
    this.input.addEventListener('keydown', (e) => {
      window.soundEngine && window.soundEngine.playTerminalKey();

      if (e.key === 'Enter') {
        const line = this.input.value.trim();
        if (line) {
          this.execute(line);
          this.history.push(line);
          this.historyIndex = this.history.length;
        }
        this.input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autocomplete();
      }
    });

    this.printBanner();
  }

  toggle(forceState = null) {
    window.soundEngine && window.soundEngine.playClick();
    const shouldOpen = forceState !== null ? forceState : this.modal.classList.contains('hidden');

    if (shouldOpen) {
      this.modal.classList.remove('hidden');
      setTimeout(() => this.input.focus(), 80);
    } else {
      this.modal.classList.add('hidden');
    }
  }

  printBanner() {
    this.print(`
<span style="color:#00f2fe;font-weight:700;">SIDHARTH SREEKUMAR // BACKEND & SYSTEMS TERMINAL</span>
Version: 2.4.0 (x86_64-apple-darwin / Java 18+ JVM)
Type '<span style="color:#38bdf8;">help</span>' to list available commands.
`, false);
  }

  print(html, prefix = true) {
    const div = document.createElement('div');
    div.style.marginBottom = '0.5rem';
    div.innerHTML = prefix ? `<span style="color:#64748b;">guest@sidharth:~$</span> ${html}` : html;
    this.body.appendChild(div);
    this.body.scrollTop = this.body.scrollHeight;
  }

  execute(rawCmd) {
    this.print(`<span style="color:#f8fafc;font-weight:600;">${this.escape(rawCmd)}</span>`, true);
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (this.commands[cmd]) {
      this.commands[cmd](args);
    } else {
      this.print(`<span style="color:#f43f5e;">Command not found: '${cmd}'. Type 'help' for commands.</span>`, false);
    }
  }

  autocomplete() {
    const current = this.input.value.trim().toLowerCase();
    const matches = Object.keys(this.commands).filter(c => c.startsWith(current));
    if (matches.length === 1) {
      this.input.value = matches[0] + ' ';
    } else if (matches.length > 1) {
      this.print(`<span style="color:#94a3b8;">Suggestions: ${matches.join(', ')}</span>`, false);
    }
  }

  cmdHelp() {
    this.print(`
Available commands:
  <span style="color:#38bdf8;">about</span>        - Summary of background & core competencies
  <span style="color:#38bdf8;">skills</span>       - Technical skill breakdown
  <span style="color:#38bdf8;">experience</span>   - Verteil Technologies (SWE & SWE Intern)
  <span style="color:#38bdf8;">projects</span>     - Swarm Drones, Riyadh Air NDC, Sign Language CV, CKD ML
  <span style="color:#38bdf8;">education</span>    - Amrita School of Engineering & certifications
  <span style="color:#38bdf8;">jfr</span>          - Java Flight Recorder diagnostic snapshot
  <span style="color:#38bdf8;">theme &lt;name&gt;</span> - Switch theme: midnight, emerald, amber, light
  <span style="color:#38bdf8;">contact</span>      - Email, phone, GitHub, LinkedIn
  <span style="color:#38bdf8;">resume</span>       - Download PDF resume directly
  <span style="color:#38bdf8;">clear</span>        - Clear terminal history
  <span style="color:#38bdf8;">exit</span>         - Close terminal
`, false);
  }

  cmdBio() {
    this.print(`
<span style="color:#38bdf8;font-weight:700;">Sidharth Sreekumar — Software Engineer</span>
Kerala, India | +91 9645332233 | sidharthsmsd@gmail.com
• Results-driven Software Engineer experienced in building scalable backend microservices, RESTful APIs, and distributed systems using Java, Spring Boot, and AWS.
• Proven track record in CI/CD automation, performance profiling, and enterprise integrations.
• Additionally brings cross-functional leadership experience in hospital operations, focusing on patient care quality improvements and workflow optimization.
`, false);
  }

  cmdSkills() {
    this.print(`
<span style="color:#10b981;font-weight:700;">Languages:</span> Java, Python, C++, JavaScript, SQL
<span style="color:#10b981;font-weight:700;">Backend & Data:</span> Spring Boot, gRPC, Redis, PostgreSQL, MySQL, Neo4j
<span style="color:#10b981;font-weight:700;">Cloud & DevOps:</span> AWS, Docker, Git, CI/CD (GitHub Actions, ArgoCD)
<span style="color:#10b981;font-weight:700;">AI Dev Tools:</span> GitHub Copilot, Claude Code, LangChain, GPT-4o API
<span style="color:#10b981;font-weight:700;">Performance:</span> Load Testing, Java Flight Recorder (JFR), JVM Profiling, Grafana, Kibana
<span style="color:#10b981;font-weight:700;">Concepts:</span> DSA, OOP, Microservices, REST APIs, Scalability, High Availability, System Design
`, false);
  }

  cmdExperience() {
    this.print(`
<span style="color:#38bdf8;font-weight:700;">1. Software Engineer @ Verteil Technologies Pvt. Ltd (Oct 2023 – Present)</span>
   • Serve as co-code owner for Riyadh Air integration (backend, code reviews, prod maintenance)
   • Designed and implemented RESTful APIs secured with OAuth 2.0 & JWT to standardize airline data retrieval
   • Built scalable microservices on AWS (Java 18+, Spring Boot, PostgreSQL, Redis) with 30% faster scaffolding via GitHub Copilot & Claude Code
   • Integrated gRPC inter-service communication for low-latency communication
   • Automated CI/CD pipelines using GitHub Actions & ArgoCD with unit & acceptance testing
   • Conducted load testing on backend services to validate throughput & latency under peak traffic
   • Performed JVM performance analysis using Java Flight Recorder (JFR) for memory, GC, and CPU bottlenecks
   • Improved system observability by building Kibana & Grafana dashboards, reducing MTTR

<span style="color:#38bdf8;font-weight:700;">2. Software Engineering Intern @ Verteil Technologies Pvt. Ltd (Mar 2023 – Jul 2023)</span>
   • Built backend services using Java, Spring Boot, and REST APIs for airline data processing workflows
   • Worked closely with senior engineers in Agile sprints, learning best practices in clean code and debugging
`, false);
  }

  cmdProjects() {
    this.print(`
• <span style="color:#38bdf8;font-weight:700;">Security & Surveillance using Swarm Drones:</span> Flight-path algorithms & real-time object detection in Python.
• <span style="color:#38bdf8;font-weight:700;">Sign Language Detection:</span> CNN-based computer vision model with OpenCV for real-time translation.
• <span style="color:#38bdf8;font-weight:700;">Chronic Kidney Disease Prediction:</span> Machine learning models (Logistic Regression, Random Forest, SVM) with hyperparameter tuning.
`, false);
  }

  cmdEducation() {
    this.print(`
<span style="color:#38bdf8;font-weight:700;">B.Tech in Computer Science and Engineering</span>
Amrita School of Engineering (Graduated May 2023)

<span style="color:#38bdf8;font-weight:700;">Certifications:</span>
• Python (Basic), SQL (Basic), SQL (Intermediate) — HackerRank
• C Programming, HTML & CSS — Coursera
`, false);
  }

  cmdContact() {
    this.print(`
Email:    <a href="mailto:sidharthsmsd@gmail.com" style="color:#38bdf8;text-decoration:underline;">sidharthsmsd@gmail.com</a>
Phone:    <a href="tel:+919645332233" style="color:#38bdf8;text-decoration:underline;">+91 9645332233</a>
LinkedIn: <a href="https://linkedin.com/in/sdd410" target="_blank" style="color:#38bdf8;text-decoration:underline;">linkedin.com/in/sdd410</a>
GitHub:   <a href="https://github.com/sdd410" target="_blank" style="color:#38bdf8;text-decoration:underline;">github.com/sdd410</a>
Location: Kerala, India
`, false);
  }

  cmdJFR() {
    this.print(`
[JFR Telemetry Snapshot]
Thread Count: 2,840 | Heap: 29.5% used | ZGC Max Pause: 0.81ms
JVM Status: Healthy | 0 memory leak warnings.
`, false);
  }

  cmdTheme(args) {
    const valid = ['midnight', 'emerald', 'amber', 'light'];
    const theme = args[0] ? args[0].toLowerCase() : '';
    if (!valid.includes(theme)) {
      this.print(`Usage: theme [midnight | emerald | amber | light]`, false);
      return;
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sdd_theme', theme);
    this.print(`Switched theme to: <span style="color:#00f2fe;">${theme}</span>`, false);
    if (window.showToast) window.showToast(`Theme changed to ${theme}`);
  }

  cmdResume() {
    this.print(`Downloading PDF resume: <a href="Sidharth_Sreekumar_SWE.pdf" download style="color:#38bdf8;text-decoration:underline;">Sidharth_Sreekumar_SWE.pdf</a>`, false);
    const link = document.createElement('a');
    link.href = 'Sidharth_Sreekumar_SWE.pdf';
    link.download = 'Sidharth_Sreekumar_SWE.pdf';
    link.click();
  }

  cmdClear() {
    this.body.innerHTML = '';
  }

  escape(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.interactiveTerminalInstance = new InteractiveTerminal();
});
