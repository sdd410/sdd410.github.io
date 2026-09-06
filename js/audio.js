/**
 * FLUIDIC AUDIO SYNTHESIZER (Web Audio API)
 * Zero external audio assets required. Pure synthesized modern sound design.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('sdd_sound_muted') === 'true';
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('sdd_sound_muted', this.isMuted);
    return this.isMuted;
  }

  playPop(freq = 440, type = 'sine', duration = 0.08, volume = 0.05) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || this.ctx.state === 'suspended') {
      this.ctx && this.ctx.resume();
    }
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playClick() {
    this.playPop(520, 'sine', 0.06, 0.04);
  }

  playHover() {
    this.playPop(340, 'triangle', 0.04, 0.02);
  }

  playTerminalKey() {
    this.playPop(850, 'sine', 0.03, 0.015);
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25]; // A major chord
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPop(freq, 'sine', 0.15, 0.04);
      }, idx * 60);
    });
  }

  playSpike() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    this.playPop(220, 'sawtooth', 0.18, 0.06);
  }
}

window.soundEngine = new SoundEngine();
