/**
 * INTERACTIVE DISTRIBUTED SYSTEM & JVM OBSERVABILITY HUB
 * Simulates Verteil Technologies & Riyadh Air High-Scale Backend Architecture
 * Showcases: Spring Boot, gRPC, OAuth2/JWT, Redis Caching, JFR Profiling & AWS
 */

class SystemSimulator {
  constructor() {
    this.container = document.getElementById('system-simulator');
    if (!this.container) return;

    this.isSpikeActive = false;
    this.requestCount = 14280;
    this.baseRps = 180;
    this.currentRps = 180;
    this.p99Latency = 14.2; // ms
    this.cacheHitRate = 94.6; // %
    this.activeWorkers = 12;

    this.activeTab = 'stream'; // 'stream', 'proto', 'jfr'
    this.logInterval = null;
    this.activeStep = 0;

    this.init();
  }

  init() {
    this.bindEvents();
    this.startBackgroundMetrics();
    this.appendLog("SYSTEM INITIALIZED", "INFO", "Riyadh Air NDC Gateway v2.4 online. gRPC channels established.");
  }

  bindEvents() {
    const sendReqBtn = document.getElementById('sim-send-req');
    const spikeBtn = document.getElementById('sim-spike-btn');
    const jfrBtn = document.getElementById('sim-jfr-btn');

    if (sendReqBtn) {
      sendReqBtn.addEventListener('click', () => {
        window.soundEngine && window.soundEngine.playClick();
        this.simulateRequest();
      });
    }

    if (spikeBtn) {
      spikeBtn.addEventListener('click', () => {
        this.toggleTrafficSpike(spikeBtn);
      });
    }

    if (jfrBtn) {
      jfrBtn.addEventListener('click', () => {
        window.soundEngine && window.soundEngine.playClick();
        this.simulateJFRDump();
      });
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.telemetry-tabs .tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.soundEngine && window.soundEngine.playHover();
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchTab(btn.dataset.tab);
      });
    });

    // Node click inspection
    const archNodes = document.querySelectorAll('.arch-node');
    archNodes.forEach(node => {
      node.addEventListener('click', () => {
        window.soundEngine && window.soundEngine.playHover();
        archNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        this.inspectNode(node.dataset.node);
      });
    });
  }

  simulateRequest() {
    const traceId = Math.random().toString(36).substring(2, 10);
    const routes = ['RUH ✈ LHR', 'DXB ✈ JED', 'RUH ✈ JFK', 'DMM ✈ CDG'];
    const selectedRoute = routes[Math.floor(Math.random() * routes.length)];

    this.animatePacketFlow();
    this.appendLog(`TRACE [${traceId}]`, "INFO", `Inbound NDC FlightSearch: ${selectedRoute} | Auth: Bearer JWT (OAuth 2.0 valid)`);
    
    setTimeout(() => {
      const isCacheHit = Math.random() < 0.88;
      if (isCacheHit) {
        this.appendLog(`TRACE [${traceId}]`, "METRIC", `Redis Cache HIT for key 'avail:${selectedRoute}' -> 0.8ms response`);
      } else {
        this.appendLog(`TRACE [${traceId}]`, "WARN", `Redis Cache MISS -> Invoking gRPC FareEngine via Protobuf stub`);
        this.appendLog(`TRACE [${traceId}]`, "INFO", `gRPC stream received: 14 available cabin classes from PostgreSQL replicas`);
      }
      this.requestCount++;
      this.updateMetricDisplays();
    }, 350);
  }

  toggleTrafficSpike(btn) {
    this.isSpikeActive = !this.isSpikeActive;
    if (this.isSpikeActive) {
      window.soundEngine && window.soundEngine.playSpike();
      btn.classList.add('active-spike');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Stop Load Spike`;
      this.currentRps = 4850;
      this.p99Latency = 24.8;
      this.activeWorkers = 48;
      this.appendLog("LOAD SPIKE TRIGGERED", "WARN", "Simulating 4,800+ concurrent NDC partner requests. ArgoCD autoscaler scaling pods 12 -> 48.");
    } else {
      window.soundEngine && window.soundEngine.playClick();
      btn.classList.remove('active-spike');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> Simulate Load Spike`;
      this.currentRps = 185;
      this.p99Latency = 13.9;
      this.activeWorkers = 12;
      this.appendLog("TRAFFIC NORMALIZED", "INFO", "Load reduced. Pod count stabilizing. Latency p99 < 15ms.");
    }
    this.updateMetricDisplays();
  }

  simulateJFRDump() {
    this.switchTab('jfr');
    const tabBtns = document.querySelectorAll('.telemetry-tabs .tab-btn');
    tabBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.tab === 'jfr');
    });

    this.appendLog("JFR PROFILER", "METRIC", "Java Flight Recorder snapshot recorded: 0 memory leaks detected. ZGC pause time: 0.42ms.");
  }

  animatePacketFlow() {
    const nodes = document.querySelectorAll('.arch-node');
    nodes.forEach((node, index) => {
      setTimeout(() => {
        node.classList.add('active');
        setTimeout(() => {
          node.classList.remove('active');
        }, 300);
      }, index * 120);
    });
  }

  inspectNode(nodeName) {
    const details = {
      'gateway': "AWS API Gateway + OAuth 2.0 Interceptor: Standardizes external Riyadh Air NDC requests, validates JWT claims, and implements token bucket rate limiting.",
      'spring': "Spring Boot 3.x Microservice (Java 18+): High-throughput reactive orchestrator handling data retrieval, payload transformation, and async worker dispatch.",
      'redis': "Redis Cluster: Sub-millisecond distributed cache for flight schedules, fare availability cache, and distributed rate limiting counters.",
      'grpc': "gRPC Inter-service Mesh: Protobuf-based binary RPC replacing legacy REST for internal microservice calls. Latency reduced by ~45%.",
      'postgres': "PostgreSQL Replicas: ACID-compliant relational storage for airline booking states, partner audit logs, and transaction ledgers."
    };

    const text = details[nodeName] || "Microservice Component Node";
    this.appendLog("COMPONENT INSPECTION", "INFO", `[${nodeName.toUpperCase()}] ${text}`);
  }

  switchTab(tab) {
    this.activeTab = tab;
    const output = document.getElementById('telemetry-log');
    if (!output) return;

    if (tab === 'stream') {
      output.innerHTML = this.streamLogsHtml || `<span class="log-level-info">[LIVE]</span> Telemetry stream active...\n`;
    } else if (tab === 'proto') {
      output.textContent = `syntax = "proto3";

package com.verteil.airline.v1;

service AirlineSearchService {
  rpc SearchFlights (SearchRequest) returns (SearchResponse);
  rpc StreamAvailability (StreamRequest) returns (stream SeatUpdate);
}

message SearchRequest {
  string origin = 1;
  string destination = 2;
  string departure_date = 3;
  int32 passenger_count = 4;
  string partner_id = 5; // e.g., "RIYADH_AIR"
}

message SearchResponse {
  string trace_id = 1;
  repeated FlightOption options = 2;
  int64 processing_time_ms = 3;
}`;
    } else if (tab === 'jfr') {
      output.textContent = `=== JAVA FLIGHT RECORDER (JFR) DIAGNOSTIC DUMP ===
JVM Version: OpenJDK 64-Bit Server VM (18.0.2+9)
GC Algorithm: ZGC (Generational)
Heap Total: 8,192 MB | Used: 2,418 MB (29.5%)
Peak Allocation Rate: 420 MB/s
Avg GC Pause Time: 0.38 ms (p99: 0.81 ms)

[THREAD TELEMETRY]
Virtual Threads Active: 2,840
Carrier OS Threads: 16 (1:1 CPU affinity)
JVM Contention Events: 0 blocked threads
JIT Compiler: C2 Tier-4 active, 100% hot methods compiled

[PROFILING OBSERVATIONS]
- Zero memory leaks identified in Riyadh Air partner JSON parser
- Zero heap contention in Redis serialization buffers`;
    }
  }

  appendLog(prefix, level, message) {
    const output = document.getElementById('telemetry-log');
    if (!output) return;

    const time = new Date().toISOString().substring(11, 19);
    let levelClass = 'log-level-info';
    if (level === 'WARN') levelClass = 'log-level-warn';
    if (level === 'METRIC') levelClass = 'log-level-metric';

    const logEntry = `<div><span class="log-time">[${time}]</span> <span class="${levelClass}">[${prefix}]</span> ${message}</div>`;
    
    if (this.activeTab === 'stream') {
      output.innerHTML += logEntry;
      output.scrollTop = output.scrollHeight;
    }

    this.streamLogsHtml = (this.streamLogsHtml || '') + logEntry;
  }

  startBackgroundMetrics() {
    setInterval(() => {
      if (this.isSpikeActive) {
        this.requestCount += Math.floor(Math.random() * 80 + 50);
        this.currentRps = Math.floor(4800 + Math.random() * 200);
      } else {
        this.requestCount += Math.floor(Math.random() * 4 + 1);
        this.currentRps = Math.floor(175 + Math.random() * 15);
      }
      this.updateMetricDisplays();
    }, 1200);
  }

  updateMetricDisplays() {
    const elRps = document.getElementById('metric-rps');
    const elLatency = document.getElementById('metric-latency');
    const elHitRate = document.getElementById('metric-hitrate');
    const elTotalReqs = document.getElementById('metric-total-reqs');

    if (elRps) elRps.textContent = `${this.currentRps} /s`;
    if (elLatency) elLatency.textContent = `${this.p99Latency}ms`;
    if (elHitRate) elHitRate.textContent = `${this.cacheHitRate}%`;
    if (elTotalReqs) elTotalReqs.textContent = this.requestCount.toLocaleString();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.systemSimulatorInstance = new SystemSimulator();
});
