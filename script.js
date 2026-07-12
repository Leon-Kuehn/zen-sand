(() => {
  const COLS = 160;
  const ROWS = 100;

  const EMPTY = 0, SAND = 1, STONE = 2, WATER = 3, PLANT = 4, FIRE = 5, STEAM = 6,
        OIL = 7, LAVA = 8, ICE = 9, SNOW = 10, HONEY = 11, GLASS = 12, RAINBOW = 13,
        ACID = 14, MUD = 15, MERCURY = 16, SPORE = 17, FUSE = 18, CRYSTAL = 19,
        POISON_GAS = 20, QUICKSAND = 21, WIRE = 22, BATTERY = 23, FISH = 24, ANT = 25;
  const MAX_MATERIAL_ID = ANT;
  const WIND_TOOL = -1, BOMB_TOOL = -2, DYNAMITE_TOOL = -3, NUKE_TOOL = -4;

  const ACTION_TOOLS = [
    { id: "bomb", tool: BOMB_TOOL, label: "💣 Bombe", unlockAt: 0 },
    { id: "dynamite", tool: DYNAMITE_TOOL, label: "🧨 Dynamit", unlockAt: 60 },
    { id: "nuke", tool: NUKE_TOOL, label: "☢️ Nuke", achievement: "sprengmeister" },
  ];

  const WEATHER_TOOLS = [
    { id: "thunder", mode: "thunder", label: "⛈️ Gewitter", achievement: "wolkenbruch" },
    { id: "snow", mode: "snow", label: "❄️ Schneesturm", achievement: "kaelteeinbruch" },
  ];

  const PRESETS = [
    { id: "insel", label: "🏝️ Insel" },
    { id: "teich", label: "🪷 Teich" },
    { id: "vulkan", label: "🌋 Vulkan" },
    { id: "wueste", label: "🏜️ Wüste" },
    { id: "bergwerk", label: "⛏️ Bergwerk" },
    { id: "sumpf", label: "🐸 Giftsumpf" },
    { id: "kristallhoehle", label: "💎 Kristallhöhle" },
    { id: "sprengplatz", label: "🧨 Sprengplatz" },
  ];

  const MATERIALS = [
    { id: SAND, label: "Sand", icon: "🏖️", unlockAt: 0 },
    { id: STONE, label: "Stein", icon: "🪨", unlockAt: 25 },
    { id: WATER, label: "Wasser", icon: "💧", unlockAt: 75 },
    { id: PLANT, label: "Pflanze", icon: "🌱", unlockAt: 180 },
    { id: SPORE, label: "Sporen", icon: "🍄", unlockAt: 280 },
    { id: FIRE, label: "Feuer", icon: "🔥", unlockAt: 400 },
    { id: WIRE, label: "Draht", icon: "🔗", unlockAt: 550 },
    { id: BATTERY, label: "Batterie", icon: "🔋", achievement: "elektriker" },
    { id: OIL, label: "Öl", icon: "🛢️", achievement: "feuerloescher" },
    { id: ICE, label: "Eis", icon: "🧊", achievement: "seebaumeister" },
    { id: SNOW, label: "Schnee", icon: "❄️", achievement: "frostig" },
    { id: LAVA, label: "Lava", icon: "🌋", achievement: "waldbrand" },
    { id: GLASS, label: "Glas", icon: "🪟", achievement: "alchemist" },
    { id: HONEY, label: "Honig", icon: "🍯", achievement: "geologe" },
    { id: RAINBOW, label: "Regenbogensand", icon: "🌈", achievement: "vollbild" },
    { id: ACID, label: "Säure", icon: "🧪", achievement: "glasblaeser" },
    { id: MUD, label: "Schlamm", icon: "🟤", achievement: "sumpfland" },
    { id: CRYSTAL, label: "Kristall", icon: "💎", achievement: "ozeanmeister" },
    { id: POISON_GAS, label: "Giftgas", icon: "☠️", achievement: "flaechenbrand" },
    { id: FUSE, label: "Zündschnur", icon: "🪢", achievement: "kettenreaktion" },
    { id: MERCURY, label: "Quecksilber", icon: "🌡️", achievement: "schwermetall" },
    { id: QUICKSAND, label: "Treibsand", icon: "🌀", achievement: "wuestenwanderer" },
    { id: FISH, label: "Fisch", icon: "🐟", achievement: "biotop" },
    { id: ANT, label: "Ameise", icon: "🐜", achievement: "sandburg" },
  ];

  const ACHIEVEMENTS = [
    { key: "feuerloescher", label: "Feuerlöscher", desc: "Lösche 5-mal Feuer mit Wasser", target: 5, get: (s) => s.fireExtinguished, unlocks: "Öl" },
    { key: "seebaumeister", label: "Seebaumeister", desc: "Halte gleichzeitig 250 Wasser-Zellen auf der Fläche", target: 250, get: (s) => s.peakWater, unlocks: "Eis" },
    { key: "frostig", label: "Frostig", desc: "Schmelze 8-mal Eis", target: 8, get: (s) => s.iceMelted, unlocks: "Schnee" },
    { key: "waldbrand", label: "Waldbrand", desc: "Lass Feuer 40-mal auf Pflanzen überspringen", target: 40, get: (s) => s.plantsIgnited, unlocks: "Lava" },
    { key: "alchemist", label: "Alchemist", desc: "Schmelze Sand zu Glas", target: 1, get: (s) => s.glassCreated, unlocks: "Glas" },
    { key: "geologe", label: "Geologe", desc: "Lass Lava 10-mal auf Wasser treffen", target: 10, get: (s) => s.lavaWaterReactions, unlocks: "Honig" },
    { key: "vollbild", label: "Vollbild", desc: "Fülle 70% der Fläche gleichzeitig", target: 70, get: (s) => s.peakFillPct, unlocks: "Regenbogensand" },
    { key: "vulkanausbruch", label: "Vulkanausbruch", desc: "Lass Lava 20-mal auf Wasser treffen", target: 20, get: (s) => s.lavaWaterReactions, unlocks: "Meteor-Werkzeug" },
    { key: "sturm", label: "Sturm", desc: "Platziere insgesamt 700 Körner", target: 700, get: (s) => s.totalPlaced, unlocks: "Wind-Werkzeug" },
    { key: "sprengmeister", label: "Sprengmeister", desc: "Löse 10 Explosionen aus (Bombe/Dynamit)", target: 10, get: (s) => s.explosionsTriggered, unlocks: "Nuke" },
    { key: "wolkenbruch", label: "Wolkenbruch", desc: "Lösche 15-mal Feuer mit Wasser", target: 15, get: (s) => s.fireExtinguished, unlocks: "Gewitter" },
    { key: "kaelteeinbruch", label: "Kälteeinbruch", desc: "Schmelze 20-mal Eis", target: 20, get: (s) => s.iceMelted, unlocks: "Schneesturm" },
    { key: "glasblaeser", label: "Glasbläser", desc: "Schmelze 5-mal Sand zu Glas", target: 5, get: (s) => s.glassCreated, unlocks: "Säure" },
    { key: "sumpfland", label: "Sumpfland", desc: "Lass Sand einmal zu Schlamm werden", target: 1, get: (s) => s.mudFormed, unlocks: "Schlamm" },
    { key: "ozeanmeister", label: "Ozeanmeister", desc: "Halte gleichzeitig 500 Wasser-Zellen auf der Fläche", target: 500, get: (s) => s.peakWater, unlocks: "Kristall" },
    { key: "flaechenbrand", label: "Flächenbrand", desc: "Lass Feuer 100-mal auf Pflanzen überspringen", target: 100, get: (s) => s.plantsIgnited, unlocks: "Giftgas" },
    { key: "kettenreaktion", label: "Kettenreaktion", desc: "Löse 25 Explosionen aus", target: 25, get: (s) => s.explosionsTriggered, unlocks: "Zündschnur" },
    { key: "schwermetall", label: "Schwermetall", desc: "Lass Lava 30-mal auf Wasser treffen", target: 30, get: (s) => s.lavaWaterReactions, unlocks: "Quecksilber" },
    { key: "wuestenwanderer", label: "Wüstenwanderer", desc: "Platziere insgesamt 1500 Körner", target: 1500, get: (s) => s.totalPlaced, unlocks: "Treibsand" },
    { key: "elektriker", label: "Elektriker", desc: "Platziere 220 Draht-Zellen", target: 220, get: (s) => s.wirePlaced || 0, unlocks: "Batterie" },
    { key: "biotop", label: "Biotop", desc: "Halte gleichzeitig 100 Pflanzen-Zellen auf der Fläche", target: 100, get: (s) => s.peakPlants || 0, unlocks: "Fisch" },
    { key: "sandburg", label: "Sandburg", desc: "Halte gleichzeitig 600 Sand-Zellen auf der Fläche", target: 600, get: (s) => s.peakSand || 0, unlocks: "Ameisen" },
  ];

  const FIRE_FUEL = 70;
  const STEAM_LIFE = 22;
  const WIRE_CHARGE = 14;
  const PLANT_MAX_HEIGHT = 28;
  const GLASS_HEAT_THRESHOLD = 42;
  const MUD_WET_THRESHOLD = 60;
  const MOVABLE_BY_WIND = new Set([SAND, WATER, OIL, HONEY, SNOW, STEAM, RAINBOW, ACID, SPORE]);

  // --- Sound engine (procedural, no assets) ---
  let audioCtx = null;
  let masterGain = null;
  let noiseBuffer = null;
  let soundMuted = false;
  try { soundMuted = localStorage.getItem("zen-sand-muted") === "1"; } catch (e) {}

  function createNoiseBuffer() {
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function startAmbientDrone() {
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    osc1.type = "sine"; osc1.frequency.value = 110;
    osc2.type = "sine"; osc2.frequency.value = 110 * 1.5;
    const droneGain = audioCtx.createGain();
    droneGain.gain.value = 0.05;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass"; filter.frequency.value = 700;
    osc1.connect(filter); osc2.connect(filter);
    filter.connect(droneGain); droneGain.connect(masterGain);
    osc1.start(); osc2.start();
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.04;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 250;
    lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
    lfo.start();
  }

  function ensureAudio() {
    if (audioCtx || soundMuted) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.35;
      masterGain.connect(audioCtx.destination);
      noiseBuffer = createNoiseBuffer();
      startAmbientDrone();
    } catch (e) {}
  }

  function playNoiseBurst(opts) {
    if (!audioCtx || soundMuted) return;
    const { filterFreq = 1000, filterType = "bandpass", gain = 0.08, decay = 0.2, duration = 0.3 } = opts || {};
    const src = audioCtx.createBufferSource();
    src.buffer = noiseBuffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = filterType; filter.frequency.value = filterFreq;
    const g = audioCtx.createGain();
    const now = audioCtx.currentTime;
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    src.connect(filter); filter.connect(g); g.connect(masterGain);
    src.start(now); src.stop(now + duration);
  }

  const BLIP_FREQ = {
    [SAND]: 220, [STONE]: 90, [WATER]: 340, [PLANT]: 480, [FIRE]: 200,
    [OIL]: 130, [LAVA]: 100, [ICE]: 560, [SNOW]: 620, [HONEY]: 160,
    [GLASS]: 700, [RAINBOW]: 500, [ACID]: 300, [MUD]: 80, [MERCURY]: 60,
    [SPORE]: 700, [FUSE]: 150, [CRYSTAL]: 900, [POISON_GAS]: 110, [QUICKSAND]: 95,
    [WIRE]: 420, [BATTERY]: 240, [FISH]: 520, [ANT]: 380,
  };

  let lastBlipTime = 0;
  function playBlip(material) {
    if (!audioCtx || soundMuted) return;
    const now = audioCtx.currentTime;
    if (now - lastBlipTime < 0.05) return;
    lastBlipTime = now;
    const osc = audioCtx.createOscillator();
    osc.type = material === STONE || material === GLASS ? "square" : "sine";
    osc.frequency.value = (BLIP_FREQ[material] || 250) * (0.95 + Math.random() * 0.1);
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.1, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(g); g.connect(masterGain);
    osc.start(now); osc.stop(now + 0.25);
  }

  function playExplosionSound(size) {
    if (!audioCtx || soundMuted) return;
    const now = audioCtx.currentTime;
    const cfg = size === "large"
      ? { start: 90, peak: 0.55, tail: 1.3, noiseDecay: 0.9 }
      : size === "medium"
      ? { start: 130, peak: 0.38, tail: 0.7, noiseDecay: 0.4 }
      : { start: 180, peak: 0.25, tail: 0.4, noiseDecay: 0.2 };
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(cfg.start, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + cfg.tail * 0.6);
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(cfg.peak, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + cfg.tail);
    osc.connect(g); g.connect(masterGain);
    osc.start(now); osc.stop(now + cfg.tail + 0.1);
    playNoiseBurst({ filterFreq: 1000, filterType: "lowpass", gain: cfg.peak * 0.7, decay: cfg.noiseDecay, duration: cfg.noiseDecay + 0.1 });
  }

  function playAchievementChime() {
    if (!audioCtx || soundMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const t = audioCtx.currentTime + i * 0.09;
      const osc = audioCtx.createOscillator();
      osc.type = "triangle"; osc.frequency.value = freq;
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      osc.connect(g); g.connect(masterGain);
      osc.start(t); osc.stop(t + 0.55);
    });
  }

  function playWindSound() {
    playNoiseBurst({ filterFreq: 500, filterType: "bandpass", gain: 0.1, decay: 0.5, duration: 0.55 });
  }

  // C-Dur-Pentatonik – klingt in jeder Kombination harmonisch (Windspiel)
  const CHIME_NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];

  function playWindChime() {
    if (!audioCtx || soundMuted) return;
    const count = 1 + (Math.random() < 0.4 ? 1 : 0) + (Math.random() < 0.15 ? 1 : 0);
    let t = audioCtx.currentTime + 0.02;
    for (let i = 0; i < count; i++) {
      const freq = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)] * (Math.random() < 0.3 ? 0.5 : 1);
      const osc = audioCtx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.04, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.9);
      osc.connect(g); g.connect(masterGain);
      osc.start(t); osc.stop(t + 2);
      t += 0.16 + Math.random() * 0.3;
    }
  }

  const materialCounts = { water: 0, fire: 0, steam: 0, lava: 0, charge: 0 };

  function ambientSoundTick() {
    if (!audioCtx || soundMuted) return;
    if (materialCounts.water > 5 && Math.random() < 0.3) {
      playNoiseBurst({ filterFreq: 500 + Math.random() * 500, filterType: "lowpass", gain: 0.04, decay: 0.35, duration: 0.4 });
    }
    if (materialCounts.fire > 0 && Math.random() < 0.4) {
      playNoiseBurst({ filterFreq: 2200 + Math.random() * 2000, filterType: "highpass", gain: 0.05, decay: 0.08, duration: 0.1 });
    }
    if (materialCounts.steam > 0 && Math.random() < 0.2) {
      playNoiseBurst({ filterFreq: 3200, filterType: "bandpass", gain: 0.025, decay: 0.4, duration: 0.45 });
    }
    if (materialCounts.lava > 0 && Math.random() < 0.15) {
      playNoiseBurst({ filterFreq: 250, filterType: "lowpass", gain: 0.06, decay: 0.5, duration: 0.55 });
    }
    if (materialCounts.charge > 0 && Math.random() < 0.25) {
      playNoiseBurst({ filterFreq: 4200, filterType: "bandpass", gain: 0.02, decay: 0.05, duration: 0.06 });
    }
    if (Math.random() < 0.045) playWindChime();
  }

  function setMuted(m) {
    soundMuted = m;
    try { localStorage.setItem("zen-sand-muted", m ? "1" : "0"); } catch (e) {}
    if (!m) ensureAudio();
    renderSoundToggle();
  }

  function renderSoundToggle() {
    const btn = document.getElementById("sound-toggle");
    if (!btn) return;
    btn.textContent = soundMuted ? "🔇" : "🔊";
    btn.title = soundMuted ? "Sound einschalten" : "Sound stummschalten";
  }

  // --- Modal-Dialoge (eigenes Prompt/Confirm statt nativer Browser-Popups, passend zum Theme) ---
  let modalResolve = null;

  function openModal({ message, withInput, defaultValue, okLabel, danger }) {
    const overlay = document.getElementById("modal-overlay");
    const messageEl = document.getElementById("modal-message");
    const input = document.getElementById("modal-input");
    const okBtn = document.getElementById("modal-ok-btn");
    if (!overlay || !messageEl || !input || !okBtn) return Promise.resolve(null);
    return new Promise((resolve) => {
      modalResolve = resolve;
      messageEl.textContent = message;
      input.style.display = withInput ? "" : "none";
      input.value = withInput ? (defaultValue || "") : "";
      okBtn.textContent = okLabel || "OK";
      okBtn.className = "ghost-btn small" + (danger ? " danger" : " primary");
      overlay.hidden = false;
      if (withInput) { input.focus(); input.select(); }
      else okBtn.focus();
    });
  }

  function closeModal(result) {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) overlay.hidden = true;
    if (modalResolve) { modalResolve(result); modalResolve = null; }
  }

  // --- Undo ---
  const undoStack = [];
  const UNDO_LIMIT = 15;

  function pushUndoSnapshot() {
    undoStack.push({ g: grid.slice(), m: meta.slice() });
    if (undoStack.length > UNDO_LIMIT) undoStack.shift();
  }

  function undo() {
    const snap = undoStack.pop();
    if (!snap) { showToast("↩️ Nichts mehr rückgängig zu machen"); return; }
    grid.set(snap.g);
    meta.set(snap.m);
    showToast("↩️ Rückgängig");
  }

  // --- Achievement celebration ---
  function celebrateUnlock() {
    const wrap = document.querySelector(".canvas-wrap");
    if (!wrap) return;
    const emojis = ["✨", "⭐", "🎉", "💫"];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement("span");
      el.className = "celebrate-particle";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 90;
      el.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      el.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      el.style.left = "50%";
      el.style.top = "40%";
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    }
  }

  let symmetryMode = false;

  function renderSymmetryToggle() {
    const btn = document.getElementById("symmetry-btn");
    if (!btn) return;
    btn.classList.toggle("active", symmetryMode);
  }

  // --- Sidebar collapse ---
  const SIDEBAR_KEY = "zen-sand-sidebars";
  let sidebarState = { left: false, right: false };
  try {
    const saved = JSON.parse(localStorage.getItem(SIDEBAR_KEY) || "{}");
    sidebarState.left = !!saved.left;
    sidebarState.right = !!saved.right;
  } catch (e) {}

  function applySidebarState() {
    const leftEl = document.getElementById("sidebar-left");
    const rightEl = document.getElementById("sidebar-right");
    const toggleLeftBtn = document.getElementById("toggle-left");
    const toggleRightBtn = document.getElementById("toggle-right");
    if (leftEl) leftEl.classList.toggle("collapsed", sidebarState.left);
    if (rightEl) rightEl.classList.toggle("collapsed", sidebarState.right);
    if (toggleLeftBtn) toggleLeftBtn.textContent = sidebarState.left ? "▶" : "◀";
    if (toggleRightBtn) toggleRightBtn.textContent = sidebarState.right ? "◀" : "▶";
  }

  function toggleSidebar(side) {
    sidebarState[side] = !sidebarState[side];
    try { localStorage.setItem(SIDEBAR_KEY, JSON.stringify(sidebarState)); } catch (e) {}
    applySidebarState();
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(COLS, ROWS);

  const grid = new Uint8Array(COLS * ROWS);
  const meta = new Uint8Array(COLS * ROWS);
  let moved = new Uint8Array(COLS * ROWS);

  // Dynamisches Licht: additive Glow-Buffer, pro Frame neu befüllt von Feuer/Lava/Kristall/Draht/Batterie/Zündschnur
  const lightR = new Float32Array(COLS * ROWS);
  const lightG = new Float32Array(COLS * ROWS);
  const lightB = new Float32Array(COLS * ROWS);

  let tool = SAND;
  let brushRadius = 3;
  let painting = false;
  let lastPaintCell = null;
  let tick = 0;
  let weatherMode = null;

  const STORE_KEY = "zen-sand-state-v2";
  const OLD_STORE_KEY = "zen-sand-progress-v1";
  const CANVAS_KEY = "zen-sand-canvas-v1";

  let totalPlaced = 0;
  let stats = {
    fireExtinguished: 0,
    plantsIgnited: 0,
    iceMelted: 0,
    glassCreated: 0,
    lavaWaterReactions: 0,
    peakWater: 0,
    peakFillPct: 0,
    explosionsTriggered: 0,
    mudFormed: 0,
    wirePlaced: 0,
    peakPlants: 0,
    peakSand: 0,
  };
  let achievementsUnlocked = new Set();

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        totalPlaced = data.totalPlaced || 0;
        stats = Object.assign(stats, data.stats || {});
        achievementsUnlocked = new Set(data.achievements || []);
        return;
      }
      const old = localStorage.getItem(OLD_STORE_KEY);
      if (old) totalPlaced = parseInt(old, 10) || 0;
    } catch (e) {}
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        totalPlaced, stats, achievements: [...achievementsUnlocked],
      }));
    } catch (e) {}
  }

  function bytesToBase64(bytes) {
    let binary = "";
    const chunkSize = 1024;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
  }

  function base64ToBytes(b64, target) {
    const binary = atob(b64);
    const len = Math.min(binary.length, target.length);
    for (let i = 0; i < len; i++) target[i] = binary.charCodeAt(i);
  }

  function saveCanvas() {
    try {
      localStorage.setItem(CANVAS_KEY, JSON.stringify({
        g: bytesToBase64(grid), m: bytesToBase64(meta),
      }));
    } catch (e) {}
  }

  function loadCanvas() {
    try {
      const raw = localStorage.getItem(CANVAS_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      base64ToBytes(data.g, grid);
      base64ToBytes(data.m, meta);
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] > MAX_MATERIAL_ID) { grid[i] = EMPTY; meta[i] = 0; }
      }
    } catch (e) {}
  }

  // --- Benannte Gärten: mehrere Speicherstände nebeneinander ---
  const GARDEN_KEY = "zen-sand-gardens-v1";
  const GARDEN_LIMIT = 12;

  function loadGardens() {
    try {
      const raw = localStorage.getItem(GARDEN_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveGardens(list) {
    try { localStorage.setItem(GARDEN_KEY, JSON.stringify(list)); } catch (e) {}
  }

  async function saveCurrentAsGarden() {
    const gardens = loadGardens();
    if (gardens.length >= GARDEN_LIMIT) {
      showToast(`🌱 Maximal ${GARDEN_LIMIT} Gärten – lösche erst einen`);
      return;
    }
    const name = await openModal({
      message: "Name für diesen Garten:",
      withInput: true,
      defaultValue: `Garten ${gardens.length + 1}`,
      okLabel: "💾 Speichern",
    });
    if (!name) return;
    gardens.push({
      id: Date.now(),
      name: name.slice(0, 40),
      savedAt: Date.now(),
      g: bytesToBase64(grid),
      m: bytesToBase64(meta),
    });
    saveGardens(gardens);
    renderGardenList();
    showToast(`🌱 „${name}“ gespeichert`);
  }

  function loadGarden(id) {
    const gardens = loadGardens();
    const garden = gardens.find((g) => g.id === id);
    if (!garden) return;
    pushUndoSnapshot();
    base64ToBytes(garden.g, grid);
    base64ToBytes(garden.m, meta);
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] > MAX_MATERIAL_ID) { grid[i] = EMPTY; meta[i] = 0; }
    }
    saveCanvas();
    showToast(`🌱 „${garden.name}“ geladen`);
  }

  async function deleteGarden(id) {
    const gardens = loadGardens();
    const garden = gardens.find((g) => g.id === id);
    if (!garden) return;
    const ok = await openModal({ message: `„${garden.name}“ endgültig löschen?`, okLabel: "🗑️ Löschen", danger: true });
    if (!ok) return;
    saveGardens(gardens.filter((g) => g.id !== id));
    renderGardenList();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderGardenList() {
    const list = document.getElementById("garden-list");
    if (!list) return;
    const gardens = loadGardens();
    if (!gardens.length) {
      list.innerHTML = `<p class="garden-empty">Noch keine Gärten gespeichert.</p>`;
      return;
    }
    list.innerHTML = gardens
      .slice()
      .sort((a, b) => b.savedAt - a.savedAt)
      .map((g) => {
        const date = new Date(g.savedAt);
        const when = date.toLocaleDateString("de-DE") + " " + date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
        return `
          <div class="garden-item">
            <div class="garden-info">
              <span class="garden-name">${escapeHtml(g.name)}</span>
              <span class="garden-date">${when}</span>
            </div>
            <div class="garden-actions">
              <button class="ghost-btn small" data-load="${g.id}" title="Diesen Garten laden">📂</button>
              <button class="ghost-btn small danger" data-delete="${g.id}" title="Diesen Garten löschen">🗑️</button>
            </div>
          </div>
        `;
      })
      .join("");
    list.querySelectorAll("[data-load]").forEach((btn) => {
      btn.addEventListener("click", () => loadGarden(Number(btn.dataset.load)));
    });
    list.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => deleteGarden(Number(btn.dataset.delete)));
    });
  }

  function idx(x, y) {
    return y * COLS + x;
  }

  function inBounds(x, y) {
    return x >= 0 && x < COLS && y >= 0 && y < ROWS;
  }

  function moveCell(src, dst) {
    grid[dst] = grid[src];
    meta[dst] = meta[src];
    grid[src] = EMPTY;
    meta[src] = 0;
    moved[dst] = 1;
    moved[src] = 1;
  }

  function swapCells(a, b) {
    const g = grid[a], m = meta[a];
    grid[a] = grid[b]; meta[a] = meta[b];
    grid[b] = g; meta[b] = m;
    moved[a] = 1; moved[b] = 1;
  }

  function neighbors4(x, y) {
    return [
      [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1],
    ];
  }

  function fallLikeSand(x, y, i) {
    const belowY = y + 1;
    if (belowY >= ROWS) return false;
    const belowI = idx(x, belowY);
    const belowMat = grid[belowI];
    if (belowMat === EMPTY) { moveCell(i, belowI); return true; }
    if (belowMat === WATER) { swapCells(i, belowI); return true; }
    const dir = Math.random() < 0.5 ? -1 : 1;
    for (const d of [dir, -dir]) {
      const nx = x + d;
      if (nx < 0 || nx >= COLS) continue;
      const nBelowI = idx(nx, belowY);
      if (grid[nBelowI] === EMPTY) { moveCell(i, nBelowI); return true; }
    }
    return false;
  }

  function flowLikeWater(x, y, i) {
    const belowY = y + 1;
    if (belowY < ROWS) {
      const belowI = idx(x, belowY);
      if (grid[belowI] === EMPTY) { moveCell(i, belowI); return true; }
      const dir = Math.random() < 0.5 ? -1 : 1;
      for (const d of [dir, -dir]) {
        const nx = x + d;
        if (nx < 0 || nx >= COLS) continue;
        const nBelowI = idx(nx, belowY);
        if (grid[nBelowI] === EMPTY) { moveCell(i, nBelowI); return true; }
      }
    }
    const dir2 = Math.random() < 0.5 ? -1 : 1;
    for (const d of [dir2, -dir2]) {
      const nx = x + d;
      if (nx < 0 || nx >= COLS) continue;
      const nI = idx(nx, y);
      if (grid[nI] === EMPTY) { moveCell(i, nI); return true; }
    }
    return false;
  }

  function updateSandLike(x, y, i, canGlassify) {
    if (canGlassify) {
      let hot = false, wet = false;
      for (const [nx, ny] of neighbors4(x, y)) {
        if (inBounds(nx, ny)) {
          const nm = grid[idx(nx, ny)];
          if (nm === FIRE || nm === LAVA) hot = true;
          if (nm === WATER) wet = true;
        }
      }
      if (hot) {
        if (meta[i] < 250) meta[i] += 3;
        if (meta[i] >= GLASS_HEAT_THRESHOLD) {
          grid[i] = GLASS; meta[i] = 0; stats.glassCreated++; moved[i] = 1;
          return;
        }
      } else if (wet) {
        if (meta[i] < 250) meta[i] += 2;
        if (meta[i] >= MUD_WET_THRESHOLD) {
          grid[i] = MUD; meta[i] = 0; stats.mudFormed = (stats.mudFormed || 0) + 1; moved[i] = 1;
          return;
        }
      } else if (meta[i] > 0) {
        meta[i] = Math.max(0, meta[i] - 1);
      }
    }
    fallLikeSand(x, y, i);
  }

  function updateMud(x, y, i) {
    let nearWater = false;
    for (const [nx, ny] of neighbors4(x, y)) {
      if (inBounds(nx, ny) && grid[idx(nx, ny)] === WATER) { nearWater = true; break; }
    }
    if (!nearWater) {
      if (meta[i] < 250) meta[i] += 1;
      if (meta[i] >= 90) { grid[i] = SAND; meta[i] = 0; moved[i] = 1; return; }
    } else if (meta[i] > 0) {
      meta[i] = Math.max(0, meta[i] - 2);
    }
    if (Math.random() > 0.08) return;
    fallLikeSand(x, y, i);
  }

  function updateAcid(x, y, i) {
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nI = idx(nx, ny);
      const nm = grid[nI];
      if ((nm === SAND || nm === STONE || nm === GLASS || nm === ICE || nm === PLANT || nm === SNOW || nm === MUD) && Math.random() < 0.12) {
        grid[nI] = EMPTY; meta[nI] = 0;
        if (meta[i] < 250) meta[i] += 40;
        if (meta[i] >= 200) { grid[i] = EMPTY; meta[i] = 0; return; }
      }
    }
    flowLikeWater(x, y, i);
  }

  function updateMercury(x, y, i) {
    const belowY = y + 1;
    if (belowY < ROWS) {
      const belowI = idx(x, belowY);
      const belowMat = grid[belowI];
      if (belowMat === EMPTY) { moveCell(i, belowI); return; }
      if (belowMat === WATER || belowMat === OIL || belowMat === HONEY || belowMat === SAND || belowMat === SNOW || belowMat === MUD) {
        swapCells(i, belowI); return;
      }
    }
    if (Math.random() < 0.15) {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const nx = x + dir;
      if (inBounds(nx, y) && grid[idx(nx, y)] === EMPTY) moveCell(i, idx(nx, y));
    }
  }

  function updateSpore(x, y, i) {
    meta[i] = (meta[i] || 0) + 1;
    if (meta[i] > 200) { grid[i] = EMPTY; return; }
    const belowY = y + 1;
    if (belowY < ROWS) {
      const belowMat = grid[idx(x, belowY)];
      if ((belowMat === SAND || belowMat === MUD) && Math.random() < 0.03) {
        grid[i] = PLANT; meta[i] = 0;
        return;
      }
      if (belowMat === EMPTY && Math.random() < 0.6) { moveCell(i, idx(x, belowY)); return; }
    }
    const dir = Math.random() < 0.5 ? -1 : 1;
    if (inBounds(x + dir, y) && grid[idx(x + dir, y)] === EMPTY) moveCell(i, idx(x + dir, y));
  }

  function updateFuse(x, y, i) {
    if (meta[i] === 0) {
      for (const [nx, ny] of neighbors4(x, y)) {
        if (!inBounds(nx, ny)) continue;
        const nm = grid[idx(nx, ny)];
        if (nm === FIRE || nm === LAVA) { meta[i] = 30; return; }
      }
      return;
    }
    meta[i]--;
    if (meta[i] <= 0) {
      grid[i] = FIRE; meta[i] = Math.floor(FIRE_FUEL * 0.4);
      return;
    }
    if (Math.random() < 0.35) {
      for (const [nx, ny] of neighbors4(x, y)) {
        if (!inBounds(nx, ny)) continue;
        const nI = idx(nx, ny);
        if (grid[nI] === FUSE && meta[nI] === 0) { meta[nI] = 30; break; }
      }
    }
  }

  // Fisch-Meta: unterstes Bit = Blickrichtung (0 = links, 1 = rechts), Rest = Zeit außerhalb des Wassers
  function fishSwapWithWater(i, tI) {
    grid[tI] = FISH; meta[tI] = meta[i];
    grid[i] = WATER; meta[i] = 0;
    moved[tI] = 1; moved[i] = 1;
  }

  function fishFall(x, y, i) {
    const belowY = y + 1;
    if (belowY >= ROWS) return false;
    const belowI = idx(x, belowY);
    if (grid[belowI] === EMPTY) { moveCell(i, belowI); return true; }
    if (grid[belowI] === WATER) { fishSwapWithWater(i, belowI); return true; }
    const dir = Math.random() < 0.5 ? -1 : 1;
    for (const d of [dir, -dir]) {
      const nx = x + d;
      if (nx < 0 || nx >= COLS) continue;
      const nI = idx(nx, belowY);
      if (grid[nI] === EMPTY) { moveCell(i, nI); return true; }
      if (grid[nI] === WATER) { fishSwapWithWater(i, nI); return true; }
    }
    return false;
  }

  function updateFish(x, y, i) {
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nI = idx(nx, ny);
      const nm = grid[nI];
      if (nm === FIRE || nm === LAVA || nm === ACID || (nm === WATER && meta[nI] > 0)) {
        grid[i] = EMPTY; meta[i] = 0;
        return;
      }
    }
    let dir = meta[i] & 1;
    let air = meta[i] >> 1;
    let inWater = false;
    for (let dy = -1; dy <= 1 && !inWater; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx, ny = y + dy;
        if (inBounds(nx, ny) && grid[idx(nx, ny)] === WATER) { inWater = true; break; }
      }
    }
    if (!inWater) {
      air++;
      if (air > 100) { grid[i] = EMPTY; meta[i] = 0; return; }
      meta[i] = air * 2 + dir;
      fishFall(x, y, i);
      return;
    }
    if (air > 0) { air = 0; meta[i] = dir; }
    if (Math.random() > 0.35) return;
    if (Math.random() < 0.03) { dir ^= 1; meta[i] = air * 2 + dir; }
    const targets = [];
    const dx = dir === 1 ? 1 : -1;
    if (Math.random() < 0.25) {
      const vy = Math.random() < 0.5 ? -1 : 1;
      if (inBounds(x, y + vy)) targets.push(idx(x, y + vy));
    }
    if (inBounds(x + dx, y)) targets.push(idx(x + dx, y));
    for (const tI of targets) {
      if (grid[tI] === WATER && meta[tI] === 0) { fishSwapWithWater(i, tI); return; }
    }
    if (Math.random() < 0.4) meta[i] = air * 2 + (dir ^ 1);
  }

  // Ameisen-Meta: Bit 0 = Blickrichtung, Bit 1 = trägt gerade ein Sandkorn, Bits 2-7 = Timer
  // bis zum spätestens Ablegen (verhindert endloses Herumtragen, falls kein Weg nach oben führt).
  function updateAnt(x, y, i) {
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nm = grid[idx(nx, ny)];
      if (nm === FIRE || nm === LAVA || nm === ACID || nm === WATER) {
        grid[i] = EMPTY; meta[i] = 0;
        return;
      }
    }
    const belowY = y + 1;
    if (belowY < ROWS && grid[idx(x, belowY)] === EMPTY) {
      moveCell(i, idx(x, belowY));
      return;
    }

    const dir = meta[i] & 1;
    const carrying = (meta[i] >> 1) & 1;

    if (carrying) {
      const timer = meta[i] >> 2;
      if (timer <= 0) {
        const dropSpots = [[x, y - 1], [x - 1, y], [x + 1, y], [x, y + 1]];
        let dropped = false;
        for (const [dx, dy] of dropSpots) {
          if (inBounds(dx, dy) && grid[idx(dx, dy)] === EMPTY) {
            grid[idx(dx, dy)] = SAND; meta[idx(dx, dy)] = 0;
            dropped = true;
            break;
          }
        }
        meta[i] = dropped ? dir : (dir | 2 | (10 << 2));
        return;
      }
      const nextTimer = timer - 1;
      const aboveI = y > 0 ? idx(x, y - 1) : -1;
      if (aboveI >= 0 && grid[aboveI] === EMPTY) {
        meta[i] = dir | 2 | (nextTimer << 2);
        moveCell(i, aboveI);
        return;
      }
      if (aboveI >= 0 && grid[aboveI] === SAND && Math.random() < 0.4) {
        grid[aboveI] = EMPTY;
        meta[i] = dir | 2 | (nextTimer << 2);
        moveCell(i, aboveI);
        return;
      }
      const sideX = x + (dir === 1 ? 1 : -1);
      if (inBounds(sideX, y)) {
        const sideI = idx(sideX, y);
        if (grid[sideI] === EMPTY) { meta[i] = dir | 2 | (nextTimer << 2); moveCell(i, sideI); return; }
        if (grid[sideI] === SAND && Math.random() < 0.25) {
          grid[sideI] = EMPTY;
          meta[i] = dir | 2 | (nextTimer << 2);
          moveCell(i, sideI);
          return;
        }
      }
      meta[i] = (Math.random() < 0.1 ? dir ^ 1 : dir) | 2 | (nextTimer << 2);
      return;
    }

    if (Math.random() < 0.12) {
      for (const [nx, ny] of neighbors4(x, y)) {
        if (inBounds(nx, ny) && grid[idx(nx, ny)] === SAND) {
          grid[idx(nx, ny)] = EMPTY;
          meta[i] = dir | 2 | (30 << 2);
          return;
        }
      }
    }
    const sideX = x + (dir === 1 ? 1 : -1);
    if (inBounds(sideX, y)) {
      const sideI = idx(sideX, y);
      if (grid[sideI] === EMPTY) { moveCell(i, sideI); return; }
      if (grid[sideI] === SAND && Math.random() < 0.2) { grid[sideI] = EMPTY; moveCell(i, sideI); return; }
    }
    if (Math.random() < 0.15) meta[i] = dir ^ 1;
  }

  function updateWire(x, y, i) {
    if (meta[i] === 0) return;
    // Ladung wandert als Welle: nur frisch geladene Zellen stecken Nachbarn an,
    // damit Ringe nicht ewig oszillieren.
    const fresh = meta[i] >= WIRE_CHARGE - 1;
    meta[i]--;
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nI = idx(nx, ny);
      const nm = grid[nI];
      if (fresh && nm === WIRE && meta[nI] === 0) { meta[nI] = WIRE_CHARGE; moved[nI] = 1; }
      else if (fresh && nm === WATER && meta[nI] === 0) { meta[nI] = WIRE_CHARGE; }
      else if (nm === FUSE && meta[nI] === 0) { meta[nI] = 30; }
      else if (nm === OIL && Math.random() < 0.08) { grid[nI] = FIRE; meta[nI] = Math.floor(FIRE_FUEL * 1.6); }
      else if (nm === ICE && Math.random() < 0.02) { grid[nI] = WATER; meta[nI] = 0; stats.iceMelted++; }
    }
  }

  function updateBattery(x, y, i) {
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nI = idx(nx, ny);
      const nm = grid[nI];
      if (nm === WIRE && meta[nI] === 0) { meta[nI] = WIRE_CHARGE; moved[nI] = 1; }
      else if (nm === WATER && meta[nI] === 0) { meta[nI] = WIRE_CHARGE; }
    }
  }

  function updateCrystal(x, y, i) {
    if (meta[i] > 40 || Math.random() >= 0.01) return;
    let nearWater = false, nearStone = false;
    for (const [nx, ny] of neighbors4(x, y)) {
      if (inBounds(nx, ny)) {
        const nm = grid[idx(nx, ny)];
        if (nm === WATER) nearWater = true;
        if (nm === STONE || nm === CRYSTAL) nearStone = true;
      }
    }
    if (!nearWater || !nearStone) return;
    const dirs = [[0, -1], [1, 0], [-1, 0], [0, 1]];
    const [ddx, ddy] = dirs[Math.floor(Math.random() * dirs.length)];
    const nx = x + ddx, ny = y + ddy;
    if (inBounds(nx, ny) && grid[idx(nx, ny)] === EMPTY) {
      grid[idx(nx, ny)] = CRYSTAL;
      meta[idx(nx, ny)] = meta[i] + 1;
    }
  }

  function updatePoisonGas(x, y, i) {
    // meta ist ein Uint8Array (max. 255) – mit 50%-Chance pro Tick hochzählen und bei 250
    // auflösen ergibt im Schnitt dieselbe ~500-Tick-Lebensdauer, ohne je zu überlaufen.
    if (Math.random() < 0.5) meta[i] = (meta[i] || 0) + 1;
    if (meta[i] >= 250) { grid[i] = EMPTY; return; }
    for (const [nx, ny] of neighbors4(x, y)) {
      if (inBounds(nx, ny) && grid[idx(nx, ny)] === PLANT && Math.random() < 0.1) {
        grid[idx(nx, ny)] = EMPTY; meta[idx(nx, ny)] = 0;
      }
    }
    const r = Math.random();
    if (r < 0.3 && y > 0 && grid[idx(x, y - 1)] === EMPTY) { moveCell(i, idx(x, y - 1)); return; }
    if (r < 0.7) {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const nx = x + dir;
      if (inBounds(nx, y) && grid[idx(nx, y)] === EMPTY) moveCell(i, idx(nx, y));
    }
  }

  function updateQuicksand(x, y, i) {
    if (y > 0) {
      const aboveI = idx(x, y - 1);
      const aboveMat = grid[aboveI];
      if ((aboveMat === SAND || aboveMat === STONE || aboveMat === PLANT || aboveMat === GLASS) && Math.random() < 0.05) {
        swapCells(i, aboveI);
        return;
      }
    }
    if (Math.random() < 0.05) flowLikeWater(x, y, i);
  }

  function updateSnow(x, y, i) {
    for (const [nx, ny] of neighbors4(x, y)) {
      if (inBounds(nx, ny)) {
        const nm = grid[idx(nx, ny)];
        if ((nm === FIRE || nm === LAVA) && Math.random() < 0.3) {
          grid[i] = WATER; meta[i] = 0; moved[i] = 1; return;
        }
      }
    }
    fallLikeSand(x, y, i);
  }

  function updateWater(x, y, i) {
    if (meta[i] > 0) {
      const fresh = meta[i] >= WIRE_CHARGE - 1;
      meta[i]--;
      if (Math.random() < 0.015) {
        grid[i] = STEAM; meta[i] = STEAM_LIFE; moved[i] = 1;
        return;
      }
      for (const [nx, ny] of neighbors4(x, y)) {
        if (!inBounds(nx, ny)) continue;
        const nI = idx(nx, ny);
        const nm = grid[nI];
        if (fresh && nm === WATER && meta[nI] === 0 && Math.random() < 0.85) meta[nI] = WIRE_CHARGE;
        else if (fresh && nm === WIRE && meta[nI] === 0) { meta[nI] = WIRE_CHARGE; moved[nI] = 1; }
      }
    }
    if (flowLikeWater(x, y, i)) return;
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nI = idx(nx, ny);
      const nm = grid[nI];
      if (nm === FIRE && Math.random() < 0.2) {
        grid[i] = STEAM; meta[i] = STEAM_LIFE;
        grid[nI] = STEAM; meta[nI] = Math.floor(STEAM_LIFE * 0.6);
        stats.fireExtinguished++;
        moved[i] = 1; moved[nI] = 1;
        return;
      }
      if (nm === ICE && Math.random() < 0.01) {
        grid[i] = ICE; meta[i] = 0; moved[i] = 1;
        return;
      }
    }
  }

  function updateOil(x, y, i) {
    for (const [nx, ny] of neighbors4(x, y)) {
      if (inBounds(nx, ny)) {
        const nm = grid[idx(nx, ny)];
        if ((nm === FIRE || nm === LAVA) && Math.random() < 0.3) {
          grid[i] = FIRE; meta[i] = Math.floor(FIRE_FUEL * 1.6); moved[i] = 1;
          return;
        }
      }
    }
    if (y > 0) {
      const aboveI = idx(x, y - 1);
      if (grid[aboveI] === WATER && Math.random() < 0.5) { swapCells(i, aboveI); return; }
    }
    flowLikeWater(x, y, i);
  }

  function updateHoney(x, y, i) {
    if (Math.random() > 0.22) return;
    flowLikeWater(x, y, i);
  }

  function updateLava(x, y, i) {
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nI = idx(nx, ny);
      const nm = grid[nI];
      if (nm === WATER && Math.random() < 0.5) {
        grid[i] = STONE; meta[i] = 0;
        grid[nI] = STEAM; meta[nI] = STEAM_LIFE;
        stats.lavaWaterReactions++;
        moved[i] = 1; moved[nI] = 1;
        return;
      }
      if ((nm === PLANT || nm === OIL) && Math.random() < 0.4) {
        if (nm === PLANT) stats.plantsIgnited++;
        grid[nI] = FIRE; meta[nI] = FIRE_FUEL + 20;
      }
      if (nm === ICE && Math.random() < 0.3) {
        grid[nI] = WATER; meta[nI] = 0;
        stats.iceMelted++;
      }
    }
    if (Math.random() > 0.4) return;
    flowLikeWater(x, y, i);
  }

  function updateIce(x, y, i) {
    for (const [nx, ny] of neighbors4(x, y)) {
      if (inBounds(nx, ny)) {
        const nm = grid[idx(nx, ny)];
        if ((nm === FIRE || nm === LAVA) && Math.random() < 0.15) {
          grid[i] = WATER; meta[i] = 0; stats.iceMelted++; moved[i] = 1;
          return;
        }
      }
    }
  }

  function updatePlant(x, y, i) {
    if (meta[i] < PLANT_MAX_HEIGHT && Math.random() < 0.025) {
      let nearWater = false;
      for (const [nx, ny] of neighbors4(x, y)) {
        if (inBounds(nx, ny) && grid[idx(nx, ny)] === WATER) { nearWater = true; break; }
      }
      if (nearWater) {
        const aboveY = y - 1;
        if (aboveY >= 0) {
          const aboveI = idx(x, aboveY);
          if (grid[aboveI] === EMPTY) {
            grid[aboveI] = PLANT;
            meta[aboveI] = meta[i] + 1;
            moved[aboveI] = 1;
            return;
          }
        }
      }
    }
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nm = grid[idx(nx, ny)];
      if (nm === FIRE && Math.random() < 0.3) {
        grid[i] = FIRE; meta[i] = Math.floor(FIRE_FUEL * 0.7); moved[i] = 1;
        stats.plantsIgnited++;
        return;
      }
      if (nm === LAVA && Math.random() < 0.5) {
        grid[i] = FIRE; meta[i] = Math.floor(FIRE_FUEL * 0.9); moved[i] = 1;
        stats.plantsIgnited++;
        return;
      }
    }
  }

  function updateFire(x, y, i) {
    meta[i]--;
    if (meta[i] <= 0) { grid[i] = EMPTY; meta[i] = 0; return; }
    for (const [nx, ny] of neighbors4(x, y)) {
      if (!inBounds(nx, ny)) continue;
      const nI = idx(nx, ny);
      const nm = grid[nI];
      if (nm === PLANT && Math.random() < 0.25) {
        grid[nI] = FIRE;
        meta[nI] = FIRE_FUEL + Math.floor(Math.random() * 15);
        stats.plantsIgnited++;
      } else if (nm === OIL && Math.random() < 0.3) {
        grid[nI] = FIRE;
        meta[nI] = Math.floor(FIRE_FUEL * 1.6);
      } else if (nm === WATER && Math.random() < 0.3) {
        grid[i] = STEAM; meta[i] = STEAM_LIFE;
        stats.fireExtinguished++;
        moved[i] = 1;
        return;
      }
    }
    if (y > 0 && Math.random() < 0.06) {
      const aboveI = idx(x, y - 1);
      if (grid[aboveI] === EMPTY) {
        grid[aboveI] = STEAM;
        meta[aboveI] = Math.floor(STEAM_LIFE * 0.5);
      }
    }
  }

  function updateSteam(x, y, i) {
    meta[i]--;
    if (meta[i] <= 0) { grid[i] = EMPTY; return; }
    if (y === 0) { grid[i] = EMPTY; return; }
    const aboveI = idx(x, y - 1);
    if (grid[aboveI] === EMPTY) { moveCell(i, aboveI); return; }
    const dir = Math.random() < 0.5 ? -1 : 1;
    for (const d of [dir, -dir]) {
      const nx = x + d;
      if (nx < 0 || nx >= COLS) continue;
      const nI = idx(nx, y - 1);
      if (grid[nI] === EMPTY) { moveCell(i, nI); return; }
    }
  }

  function step() {
    moved.fill(0);
    const ltr = tick % 2 === 0;
    for (let y = ROWS - 1; y >= 0; y--) {
      if (ltr) {
        for (let x = 0; x < COLS; x++) updateCell(x, y);
      } else {
        for (let x = COLS - 1; x >= 0; x--) updateCell(x, y);
      }
    }
    applyWeather();
    tick++;
  }

  function updateCell(x, y) {
    const i = idx(x, y);
    if (moved[i]) return;
    const m = grid[i];
    switch (m) {
      case SAND: updateSandLike(x, y, i, true); break;
      case RAINBOW: updateSandLike(x, y, i, false); break;
      case SNOW: updateSnow(x, y, i); break;
      case WATER: updateWater(x, y, i); break;
      case OIL: updateOil(x, y, i); break;
      case HONEY: updateHoney(x, y, i); break;
      case LAVA: updateLava(x, y, i); break;
      case ICE: updateIce(x, y, i); break;
      case PLANT: updatePlant(x, y, i); break;
      case FIRE: updateFire(x, y, i); break;
      case STEAM: updateSteam(x, y, i); break;
      case ACID: updateAcid(x, y, i); break;
      case MUD: updateMud(x, y, i); break;
      case MERCURY: updateMercury(x, y, i); break;
      case SPORE: updateSpore(x, y, i); break;
      case FUSE: updateFuse(x, y, i); break;
      case CRYSTAL: updateCrystal(x, y, i); break;
      case POISON_GAS: updatePoisonGas(x, y, i); break;
      case QUICKSAND: updateQuicksand(x, y, i); break;
      case WIRE: updateWire(x, y, i); break;
      case BATTERY: updateBattery(x, y, i); break;
      case FISH: updateFish(x, y, i); break;
      case ANT: updateAnt(x, y, i); break;
      default: break;
    }
  }

  function hash(x, y) {
    let h = (x * 374761393 + y * 668265263) ^ (x << 13);
    h = (h ^ (h >> 7)) * 2654435761;
    return ((h ^ (h >> 13)) >>> 0) / 4294967295;
  }

  function colorFor(x, y, m, metaVal) {
    switch (m) {
      case SAND: {
        const v = hash(x, y);
        return hslToRgb(42, 55, 48 + v * 14);
      }
      case STONE: {
        const v = hash(x, y);
        return hslToRgb(230, 8, 30 + v * 10);
      }
      case WATER: {
        if (metaVal > 0) {
          const zap = (Math.sin(tick * 0.6 + x + y) + 1) / 2;
          return hslToRgb(190, 85, 58 + zap * 20, 240);
        }
        return hslToRgb(203, 60, 45, 210);
      }
      case PLANT: {
        const l = 30 + Math.min(metaVal, PLANT_MAX_HEIGHT) * 1.2;
        return hslToRgb(140, 55, l);
      }
      case FIRE: {
        const t = metaVal / FIRE_FUEL;
        const hue = 18 + t * 30;
        return hslToRgb(hue, 90, 50 + hash(x, y) * 10);
      }
      case STEAM: {
        const a = Math.min(200, metaVal * 8);
        return [180, 190, 210, a];
      }
      case OIL: {
        const v = hash(x, y);
        return [24 + v * 8, 18 + v * 6, 14 + v * 5, 235];
      }
      case LAVA: {
        const flicker = (Math.sin(tick * 0.3 + x * 0.7 + y * 0.5) + 1) / 2;
        return hslToRgb(14 + flicker * 16, 95, 48 + flicker * 18);
      }
      case ICE: {
        const v = hash(x, y);
        return [190 + v * 20, 222 + v * 15, 238 + v * 10, 220];
      }
      case SNOW: {
        const v = hash(x, y);
        return hslToRgb(205, 25, 88 + v * 8);
      }
      case HONEY: {
        const v = hash(x, y);
        return hslToRgb(40, 80, 42 + v * 10, 225);
      }
      case GLASS: {
        const v = hash(x, y);
        return hslToRgb(190, 25, 68 + v * 16, 235);
      }
      case RAINBOW: {
        const hue = (x * 6 + y * 4 + tick * 3) % 360;
        return hslToRgb(hue, 75, 55);
      }
      case ACID: {
        const v = hash(x, y);
        return hslToRgb(95, 85, 45 + v * 10, 215);
      }
      case MUD: {
        const v = hash(x, y);
        return hslToRgb(28, 35, 22 + v * 8);
      }
      case MERCURY: {
        const v = hash(x, y);
        return [170 + v * 30, 175 + v * 30, 185 + v * 30, 255];
      }
      case SPORE:
        return hslToRgb(50, 70, 70);
      case FUSE: {
        if (metaVal > 0) {
          const t = metaVal / 30;
          return hslToRgb(20 + t * 25, 95, 55);
        }
        const v = hash(x, y);
        return hslToRgb(30, 35, 25 + v * 10);
      }
      case CRYSTAL: {
        const sparkle = (Math.sin(tick * 0.15 + x * 1.3 + y * 0.9) + 1) / 2;
        return hslToRgb(190, 60, 55 + sparkle * 25);
      }
      case POISON_GAS:
        return [110, 200, 90, 100];
      case QUICKSAND: {
        const v = hash(x, y);
        return hslToRgb(38, 45, 38 + v * 10);
      }
      case WIRE: {
        if (metaVal > 0) {
          const t = metaVal / WIRE_CHARGE;
          return hslToRgb(52, 100, 55 + t * 22);
        }
        const v = hash(x, y);
        return hslToRgb(215, 12, 40 + v * 12);
      }
      case BATTERY: {
        const pulse = (Math.sin(tick * 0.12 + (x + y) * 0.3) + 1) / 2;
        return hslToRgb(45, 90, 45 + pulse * 12);
      }
      case FISH: {
        const v = hash(x, y);
        const shimmer = (Math.sin(tick * 0.2 + x * 0.8 + y * 0.6) + 1) / 2;
        return hslToRgb(14 + v * 18, 85, 52 + shimmer * 10);
      }
      case ANT: {
        const carrying = (metaVal >> 1) & 1;
        const v = hash(x, y);
        return carrying ? hslToRgb(32, 45, 32 + v * 8) : hslToRgb(15, 45, 15 + v * 6);
      }
      default:
        return null;
    }
  }

  function hslToRgb(h, s, l, a = 255) {
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hh = h / 60;
    const xx = c * (1 - Math.abs((hh % 2) - 1));
    let r = 0, g = 0, b = 0;
    if (hh < 1) [r, g, b] = [c, xx, 0];
    else if (hh < 2) [r, g, b] = [xx, c, 0];
    else if (hh < 3) [r, g, b] = [0, c, xx];
    else if (hh < 4) [r, g, b] = [0, xx, c];
    else if (hh < 5) [r, g, b] = [xx, 0, c];
    else [r, g, b] = [c, 0, xx];
    const m = l - c / 2;
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
      a,
    ];
  }

  // --- Dynamisches Licht ---
  // Materialien, die selbst leuchten, bekommen keinen zusätzlichen Glow-Tint (ihre eigene Farbe strahlt schon),
  // aber sie beleuchten ihre Umgebung: dunkler Hintergrund und benachbarte Materialien hellen sich sichtbar auf.
  const SELF_GLOWING = new Set([FIRE, LAVA]);

  function lightSourceFor(m, x, y, metaVal) {
    switch (m) {
      case FIRE: {
        const t = metaVal / FIRE_FUEL;
        return { r: 255, g: 150 + 60 * t, b: 70, strength: 0.85, radius: 3 };
      }
      case LAVA: {
        const flicker = (Math.sin(tick * 0.3 + x * 0.7 + y * 0.5) + 1) / 2;
        return { r: 255, g: 90 + flicker * 40, b: 40, strength: 0.6, radius: 4 };
      }
      case CRYSTAL: {
        const sparkle = (Math.sin(tick * 0.15 + x * 1.3 + y * 0.9) + 1) / 2;
        return { r: 140, g: 210, b: 255, strength: 0.16 + sparkle * 0.2, radius: 2 };
      }
      case WIRE: {
        if (metaVal <= 0) return null;
        return { r: 255, g: 225, b: 110, strength: 0.5 * (metaVal / WIRE_CHARGE), radius: 2 };
      }
      case BATTERY: {
        const pulse = (Math.sin(tick * 0.12 + (x + y) * 0.3) + 1) / 2;
        return { r: 255, g: 200, b: 90, strength: 0.35 + pulse * 0.15, radius: 3 };
      }
      case FUSE: {
        if (metaVal <= 0) return null;
        const t = metaVal / 30;
        return { r: 255, g: 140 + t * 60, b: 60, strength: 0.5, radius: 2 };
      }
      default:
        return null;
    }
  }

  function addLight(cx, cy, r, cr, cg, cb, strength) {
    const r2 = r * r;
    const y0 = Math.max(0, cy - r), y1 = Math.min(ROWS - 1, cy + r);
    const x0 = Math.max(0, cx - r), x1 = Math.min(COLS - 1, cx + r);
    for (let ny = y0; ny <= y1; ny++) {
      const dy = ny - cy;
      for (let nx = x0; nx <= x1; nx++) {
        const dx = nx - cx;
        const d2 = dx * dx + dy * dy;
        if (d2 > r2) continue;
        const amt = strength * (1 - Math.sqrt(d2) / r);
        const li = idx(nx, ny);
        lightR[li] += cr * amt;
        lightG[li] += cg * amt;
        lightB[li] += cb * amt;
      }
    }
  }

  function accumulateLight() {
    lightR.fill(0); lightG.fill(0); lightB.fill(0);
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const i = idx(x, y);
        const m = grid[i];
        if (m === EMPTY) continue;
        const src = lightSourceFor(m, x, y, meta[i]);
        if (!src) continue;
        addLight(x, y, src.radius, src.r, src.g, src.b, src.strength);
      }
    }
  }

  // --- Tag/Nacht-Zyklus: läuft automatisch, kann aber per Regler manuell übersteuert werden ---
  const DAY_CYCLE_MS = 90000;
  let manualCyclePos = null; // null = automatischer Zyklus aktiv
  let cycleAnchor = 0;

  function currentCyclePos() {
    if (manualCyclePos !== null) return manualCyclePos;
    return (((performance.now() - cycleAnchor) % DAY_CYCLE_MS) + DAY_CYCLE_MS) % DAY_CYCLE_MS / DAY_CYCLE_MS;
  }

  function setManualCyclePos(v) {
    manualCyclePos = ((v % 1) + 1) % 1;
  }

  function resumeAutoCycle() {
    if (manualCyclePos === null) return;
    // Anker so verschieben, dass der Automatikzyklus nahtlos an der Reglerposition weiterläuft
    cycleAnchor = performance.now() - manualCyclePos * DAY_CYCLE_MS;
    manualCyclePos = null;
  }

  function dayCycleBrightness(t) {
    return 0.5 + 0.5 * Math.sin(t * Math.PI * 2 - Math.PI / 2);
  }

  // Farbverlauf des Himmels über den Zyklus: Nacht → Morgendämmerung → Tag → Abenddämmerung → Nacht
  const SKY_STOPS = [
    [0.00, [6, 8, 18]],
    [0.19, [10, 11, 24]],
    [0.25, [52, 36, 50]],
    [0.31, [118, 86, 68]],
    [0.50, [62, 98, 134]],
    [0.69, [118, 84, 64]],
    [0.75, [50, 34, 48]],
    [0.81, [10, 11, 24]],
    [1.00, [6, 8, 18]],
  ];

  function skyColorForCycle(t) {
    for (let i = 0; i < SKY_STOPS.length - 1; i++) {
      const [t0, c0] = SKY_STOPS[i];
      const [t1, c1] = SKY_STOPS[i + 1];
      if (t <= t1) {
        const f = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
        return [
          Math.round(c0[0] + (c1[0] - c0[0]) * f),
          Math.round(c0[1] + (c1[1] - c0[1]) * f),
          Math.round(c0[2] + (c1[2] - c0[2]) * f),
        ];
      }
    }
    return SKY_STOPS[SKY_STOPS.length - 1][1];
  }

  function emptyColorForTime(cyclePos) {
    return skyColorForCycle(cyclePos);
  }

  function timeLabelForCycle(t) {
    if (t < 0.06 || t >= 0.94) return "🌑 Tiefe Nacht";
    if (t < 0.19) return "🌌 Nacht";
    if (t < 0.28) return "🌅 Morgendämmerung";
    if (t < 0.42) return "🌤️ Vormittag";
    if (t < 0.58) return "☀️ Mittag";
    if (t < 0.72) return "🌤️ Nachmittag";
    if (t < 0.81) return "🌇 Abenddämmerung";
    return "🌌 Nacht";
  }

  let lastTimeSliderPct = null;
  let lastTimeLabelText = null;

  function renderTimeControls(cyclePos) {
    const pct = Math.round(cyclePos * 100);
    const slider = document.getElementById("time-slider");
    if (slider && document.activeElement !== slider && pct !== lastTimeSliderPct) {
      slider.value = pct;
      lastTimeSliderPct = pct;
    }
    const label = document.getElementById("time-label");
    const text = timeLabelForCycle(cyclePos);
    if (label && text !== lastTimeLabelText) { label.textContent = text; lastTimeLabelText = text; }
    const autoBtn = document.getElementById("time-auto-btn");
    if (autoBtn) {
      const isAuto = manualCyclePos === null;
      autoBtn.classList.toggle("active", isAuto);
      autoBtn.disabled = isAuto;
    }
  }

  // --- Sonne & Mond: wandern als Bogen über den Himmel, passend zum Zyklus ---
  const SUN_START = 0.22, SUN_END = 0.78, SUN_MOON_FADE = 0.05;
  const MOON_START = SUN_END - 0.5, MOON_END = SUN_START + 0.5;

  function arcPosition(progress) {
    const p = Math.max(0, Math.min(1, progress));
    const horizonY = ROWS * 0.62, topY = ROWS * 0.08;
    return [6 + p * (COLS - 12), horizonY - Math.sin(p * Math.PI) * (horizonY - topY)];
  }

  function edgeFadeAlpha(t, start, end, fade) {
    if (t < start) return (t - (start - fade)) / fade;
    if (t > end) return ((end + fade) - t) / fade;
    return 1;
  }

  function drawGlowingDisc(cx, cy, r, coreColor, glowColor, alpha, isMoon) {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = `rgba(${glowColor[0]}, ${glowColor[1]}, ${glowColor[2]}, 0.10)`;
    ctx.beginPath(); ctx.arc(cx, cy, r * 2.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(${glowColor[0]}, ${glowColor[1]}, ${glowColor[2]}, 0.22)`;
    ctx.beginPath(); ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgb(${coreColor[0]}, ${coreColor[1]}, ${coreColor[2]})`;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    if (isMoon) {
      ctx.fillStyle = "rgba(160, 175, 200, 0.35)";
      ctx.beginPath(); ctx.arc(cx - r * 0.3, cy - r * 0.25, r * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + r * 0.35, cy + r * 0.2, r * 0.18, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  function drawSunMoon(cyclePos) {
    if (cyclePos > SUN_START - SUN_MOON_FADE && cyclePos < SUN_END + SUN_MOON_FADE) {
      const p = (cyclePos - SUN_START) / (SUN_END - SUN_START);
      const [sx, sy] = arcPosition(p);
      const alpha = edgeFadeAlpha(cyclePos, SUN_START, SUN_END, SUN_MOON_FADE);
      drawGlowingDisc(sx, sy, 7, [255, 214, 130], [255, 165, 90], alpha, false);
    }
    let moonT = cyclePos + 0.5;
    if (moonT >= 1) moonT -= 1;
    if (moonT > MOON_START - SUN_MOON_FADE && moonT < MOON_END + SUN_MOON_FADE) {
      const p = (moonT - MOON_START) / (MOON_END - MOON_START);
      const [mx, my] = arcPosition(p);
      const alpha = edgeFadeAlpha(moonT, MOON_START, MOON_END, SUN_MOON_FADE);
      drawGlowingDisc(mx, my, 5, [225, 232, 245], [180, 195, 220], alpha, true);
    }
  }

  // --- Ambiente: Sterne, Sternschnuppen, Glühwürmchen, Schmetterlinge ---
  // Reine Render-Ebene über dem Grid, greift nie in die Physik ein und läuft auch bei Pause weiter.
  const fireflies = [];
  const butterflies = [];
  let shootingStar = null;

  function randomPlantPerch() {
    for (let tries = 0; tries < 60; tries++) {
      const x = Math.floor(Math.random() * COLS);
      const y = 1 + Math.floor(Math.random() * (ROWS - 2));
      if (grid[idx(x, y)] === PLANT && grid[idx(x, y - 1)] === EMPTY) return [x, y - 1];
    }
    return null;
  }

  function updateAmbientLife(cyclePos) {
    const t = performance.now() / 1000;
    const brightness = dayCycleBrightness(cyclePos);
    const night = 1 - brightness;

    const fireflyTarget = night > 0.55 ? 10 : 0;
    if (fireflies.length < fireflyTarget && Math.random() < 0.3) {
      const perch = randomPlantPerch();
      if (perch) fireflies.push({ x: perch[0], y: perch[1], phase: Math.random() * 6.28, age: 0, life: 900 + Math.random() * 600 });
    }
    for (let k = fireflies.length - 1; k >= 0; k--) {
      const f = fireflies[k];
      f.age++;
      f.x += Math.sin(t * 0.7 + f.phase) * 0.06 + (Math.random() - 0.5) * 0.18;
      f.y += Math.cos(t * 0.5 + f.phase * 1.3) * 0.04 + (Math.random() - 0.5) * 0.14;
      const cx = Math.round(f.x), cy = Math.round(f.y);
      if (f.age > f.life || night < 0.4 || !inBounds(cx, cy) || grid[idx(cx, cy)] !== EMPTY) fireflies.splice(k, 1);
    }

    const butterflyTarget = brightness > 0.6 ? 4 : 0;
    if (butterflies.length < butterflyTarget && Math.random() < 0.2) {
      const perch = randomPlantPerch();
      if (perch) butterflies.push({ x: perch[0], y: Math.max(1, perch[1] - 1), phase: Math.random() * 6.28, hue: 280 + Math.random() * 100, age: 0, life: 900 + Math.random() * 600, vx: Math.random() < 0.5 ? -0.08 : 0.08 });
    }
    for (let k = butterflies.length - 1; k >= 0; k--) {
      const b = butterflies[k];
      b.age++;
      if (Math.random() < 0.02) b.vx = -b.vx;
      b.x += b.vx + (Math.random() - 0.5) * 0.2;
      b.y += Math.sin(t * 5 + b.phase) * 0.12 + (Math.random() - 0.5) * 0.1;
      const cx = Math.round(b.x), cy = Math.round(b.y);
      if (b.age > b.life || brightness < 0.5 || !inBounds(cx, cy) || grid[idx(cx, cy)] !== EMPTY) butterflies.splice(k, 1);
    }

    if (!shootingStar && night > 0.5 && Math.random() < 0.004) {
      shootingStar = { x: Math.random() * COLS * 0.6, y: 2 + Math.random() * ROWS * 0.2, vx: 1.3 + Math.random(), vy: 0.35 + Math.random() * 0.4, life: 30 };
    }
    if (shootingStar) {
      shootingStar.x += shootingStar.vx;
      shootingStar.y += shootingStar.vy;
      shootingStar.life--;
      const hx = Math.round(shootingStar.x), hy = Math.round(shootingStar.y);
      if (shootingStar.life <= 0 || night < 0.4 || !inBounds(hx, hy) || grid[idx(hx, hy)] !== EMPTY) shootingStar = null;
    }
  }

  function drawAmbientLife(cyclePos) {
    const t = performance.now() / 1000;
    const brightness = dayCycleBrightness(cyclePos);
    const night = 1 - brightness;

    drawSunMoon(cyclePos);

    const starIntensity = Math.max(0, (night - 0.45) / 0.55);
    if (starIntensity > 0) {
      for (let s = 0; s < 70; s++) {
        const sx = Math.floor(hash(s * 3 + 1, 97) * COLS);
        const sy = Math.floor(hash(s * 5 + 2, 131) * ROWS * 0.6);
        if (grid[idx(sx, sy)] !== EMPTY) continue;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.5 + s * 2.3);
        ctx.fillStyle = `rgba(205, 218, 255, ${starIntensity * (0.25 + 0.6 * tw)})`;
        ctx.fillRect(sx, sy, 1, 1);
      }
    }
    if (shootingStar) {
      for (let k = 0; k < 6; k++) {
        const px = Math.round(shootingStar.x - shootingStar.vx * k * 1.1);
        const py = Math.round(shootingStar.y - shootingStar.vy * k * 1.1);
        if (!inBounds(px, py) || grid[idx(px, py)] !== EMPTY) continue;
        ctx.fillStyle = `rgba(235, 240, 255, ${0.9 - k * 0.15})`;
        ctx.fillRect(px, py, 1, 1);
      }
    }
    for (const f of fireflies) {
      const cx = Math.round(f.x), cy = Math.round(f.y);
      const env = Math.min(1, f.age / 60, (f.life - f.age) / 60);
      const blink = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 2.4 + f.phase * 3));
      const a = env * blink;
      ctx.fillStyle = `rgba(190, 255, 130, ${a * 0.16})`;
      ctx.fillRect(cx - 1, cy - 1, 3, 3);
      ctx.fillStyle = `rgba(215, 255, 150, ${a})`;
      ctx.fillRect(cx, cy, 1, 1);
    }
    for (const b of butterflies) {
      const cx = Math.round(b.x), cy = Math.round(b.y);
      const env = Math.min(1, b.age / 60, (b.life - b.age) / 60);
      const flap = Math.sin(t * 9 + b.phase) > 0;
      ctx.fillStyle = `hsla(${b.hue}, 80%, 75%, ${env * 0.9})`;
      if (flap) ctx.fillRect(cx - 1, cy, 3, 1);
      else ctx.fillRect(cx, cy, 1, 1);
    }
  }

  function render(cyclePos) {
    const data = img.data;
    const [er, eg, eb] = emptyColorForTime(cyclePos);
    accumulateLight();
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const i = idx(x, y);
        const m = grid[i];
        const p = i * 4;
        const lr = lightR[i], lg = lightG[i], lb = lightB[i];
        if (m === EMPTY) {
          data[p] = Math.min(255, er + lr); data[p + 1] = Math.min(255, eg + lg); data[p + 2] = Math.min(255, eb + lb); data[p + 3] = 255;
          continue;
        }
        const c = colorFor(x, y, m, meta[i]);
        if (!c) {
          // Unbekannte Material-ID (z. B. kaputter Save): wie leer rendern statt crashen
          data[p] = Math.min(255, er + lr); data[p + 1] = Math.min(255, eg + lg); data[p + 2] = Math.min(255, eb + lb); data[p + 3] = 255;
          continue;
        }
        if (SELF_GLOWING.has(m)) {
          data[p] = c[0]; data[p + 1] = c[1]; data[p + 2] = c[2]; data[p + 3] = c[3];
        } else {
          data[p] = Math.min(255, c[0] + lr * 0.5); data[p + 1] = Math.min(255, c[1] + lg * 0.5); data[p + 2] = Math.min(255, c[2] + lb * 0.5); data[p + 3] = c[3];
        }
      }
    }
    ctx.putImageData(img, 0, 0);
    drawAmbientLife(cyclePos);
    drawShapePreview();
  }

  // --- Pause & Tempo ---
  const SPEEDS = [0.25, 0.5, 1, 2, 4];
  let speedIdx = 2;
  let paused = false;
  let stepAcc = 0;

  function renderSimControls() {
    const pauseBtn = document.getElementById("pause-btn");
    if (pauseBtn) {
      pauseBtn.textContent = paused ? "▶️ Weiter" : "⏸️ Pause";
      pauseBtn.classList.toggle("active", paused);
    }
    const speedBtn = document.getElementById("speed-btn");
    if (speedBtn) {
      const s = SPEEDS[speedIdx];
      speedBtn.textContent = (s < 1 ? "🐢 " : s > 1 ? "⚡ " : "▶ ") + s + "×";
    }
  }

  function togglePause() {
    paused = !paused;
    renderSimControls();
  }

  function cycleSpeed() {
    speedIdx = (speedIdx + 1) % SPEEDS.length;
    renderSimControls();
  }

  function loop() {
    if (!paused) {
      stepAcc += SPEEDS[speedIdx];
      while (stepAcc >= 1) { step(); stepAcc -= 1; }
    }
    const cyclePos = currentCyclePos();
    updateAmbientLife(cyclePos);
    render(cyclePos);
    renderTimeControls(cyclePos);
    const [shakeX, shakeY] = consumeShakeOffset();
    renderCanvasTransform(shakeX, shakeY);
    requestAnimationFrame(loop);
  }

  function canvasPosToCell(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;
    const x = Math.floor(relX * COLS);
    const y = Math.floor(relY * ROWS);
    return [x, y];
  }

  // --- Screen Shake (bei Explosionen) ---
  let shakeMagnitude = 0, shakeFrames = 0, shakeFramesTotal = 1;

  function triggerShake(magnitude, frames) {
    shakeMagnitude = magnitude;
    shakeFrames = frames;
    shakeFramesTotal = frames;
  }

  function consumeShakeOffset() {
    if (shakeFrames <= 0) return [0, 0];
    const power = shakeMagnitude * (shakeFrames / shakeFramesTotal);
    shakeFrames--;
    const angle = Math.random() * Math.PI * 2;
    return [Math.cos(angle) * power, Math.sin(angle) * power];
  }

  // --- Zoom & Pan ---
  const viewportEl = document.getElementById("canvas-viewport");
  const ZOOM_MAX = 8;
  let zoom = 1, panX = 0, panY = 0;

  function renderCanvasTransform(shakeX, shakeY) {
    canvas.style.transform = `translate(${panX + shakeX}px, ${panY + shakeY}px) scale(${zoom})`;
  }

  function applyView() {
    if (!viewportEl) return;
    const vw = viewportEl.clientWidth, vh = viewportEl.clientHeight;
    panX = Math.min(0, Math.max(vw - vw * zoom, panX));
    panY = Math.min(0, Math.max(vh - vh * zoom, panY));
    renderCanvasTransform(0, 0);
    const resetBtn = document.getElementById("zoom-reset-btn");
    if (resetBtn) resetBtn.textContent = "↺ " + Math.round(zoom * 100) + "%";
  }

  function zoomAt(vx, vy, factor) {
    const newZoom = Math.min(ZOOM_MAX, Math.max(1, zoom * factor));
    const cx = (vx - panX) / zoom;
    const cy = (vy - panY) / zoom;
    zoom = newZoom;
    panX = vx - cx * zoom;
    panY = vy - cy * zoom;
    applyView();
  }

  function resetView() {
    zoom = 1; panX = 0; panY = 0;
    applyView();
  }

  function applyWindGust(cx, cy) {
    const r = brushRadius * 3;
    const passes = 5;
    for (let pass = 0; pass < passes; pass++) {
      const targets = [];
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const dist2 = dx * dx + dy * dy;
          if (dist2 > r * r || dist2 === 0) continue;
          const nx = cx + dx, ny = cy + dy;
          if (!inBounds(nx, ny)) continue;
          if (MOVABLE_BY_WIND.has(grid[idx(nx, ny)])) targets.push([nx, ny, dx, dy]);
        }
      }
      for (const [nx, ny, dx, dy] of targets) {
        const i = idx(nx, ny);
        if (grid[i] === EMPTY) continue;
        const pushX = dx > 0 ? 1 : dx < 0 ? -1 : (Math.random() < 0.5 ? -1 : 1);
        const pushY = dy > 0 ? 1 : dy < 0 ? -1 : (Math.random() < 0.5 ? -1 : 1);
        const tx = nx + pushX, ty = ny + pushY;
        if (inBounds(tx, ty) && grid[idx(tx, ty)] === EMPTY) {
          moveCell(i, idx(tx, ty));
        }
      }
    }
  }

  function dropMeteor() {
    const cx = 15 + Math.floor(Math.random() * (COLS - 30));
    const cy = 2;
    const r = 3;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy > r * r) continue;
        const nx = cx + dx, ny = cy + dy;
        if (!inBounds(nx, ny)) continue;
        const i = idx(nx, ny);
        const isCore = dx * dx + dy * dy <= 2;
        grid[i] = isCore ? FIRE : LAVA;
        meta[i] = isCore ? FIRE_FUEL : 0;
      }
    }
    showToast("☄️ Ein Meteor schlägt ein!");
  }

  function explode(cx, cy, radius, opts) {
    const igniteChance = (opts && opts.igniteChance) || 0.5;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius) continue;
        const nx = cx + dx, ny = cy + dy;
        if (!inBounds(nx, ny)) continue;
        const i = idx(nx, ny);
        const t = dist / radius;
        if (t < 0.35) {
          const isFireCore = Math.random() < 0.4;
          grid[i] = isFireCore ? FIRE : EMPTY;
          meta[i] = isFireCore ? FIRE_FUEL : 0;
        } else if (t < 0.8) {
          const cur = grid[i];
          if ((cur === PLANT || cur === OIL) && Math.random() < igniteChance) {
            grid[i] = FIRE; meta[i] = FIRE_FUEL;
          } else if (cur !== STONE && cur !== EMPTY && Math.random() < 0.3) {
            grid[i] = EMPTY; meta[i] = 0;
          }
        } else if (MOVABLE_BY_WIND.has(grid[i])) {
          const pushX = dx > 0 ? 1 : dx < 0 ? -1 : 0;
          const pushY = dy > 0 ? 1 : dy < 0 ? -1 : 0;
          const tx = nx + pushX, ty = ny + pushY;
          if (inBounds(tx, ty) && grid[idx(tx, ty)] === EMPTY) moveCell(i, idx(tx, ty));
        }
      }
    }
    stats.explosionsTriggered = (stats.explosionsTriggered || 0) + 1;
    triggerShake(Math.min(10, 2 + radius * 0.3), Math.min(45, 14 + radius * 1.1));
  }

  function triggerNuke(cx, cy) {
    explode(cx, cy, 30, { igniteChance: 0.8 });
    for (let yy = Math.max(0, cy - 26); yy <= cy; yy++) {
      for (let xx = cx - 3; xx <= cx + 3; xx++) {
        if (!inBounds(xx, yy)) continue;
        const i = idx(xx, yy);
        if (grid[i] === EMPTY && Math.random() < 0.5) {
          grid[i] = STEAM; meta[i] = STEAM_LIFE + 20;
        }
      }
    }
    showToast("☢️ Nuke gezündet!");
  }

  function applyWeather() {
    if (weatherMode === "thunder") {
      if (Math.random() < 0.4) {
        const x = Math.floor(Math.random() * COLS);
        if (grid[idx(x, 0)] === EMPTY) { grid[idx(x, 0)] = WATER; meta[idx(x, 0)] = 0; }
      }
      if (Math.random() < 0.05) {
        const x = 5 + Math.floor(Math.random() * (COLS - 10));
        let y = 0;
        while (y < ROWS && grid[idx(x, y)] === EMPTY) {
          grid[idx(x, y)] = FIRE; meta[idx(x, y)] = 6;
          y++;
        }
        triggerShake(1.5, 8);
        if (y < ROWS) {
          const hitI = idx(x, y);
          const hitM = grid[hitI];
          if (hitM === PLANT || hitM === OIL) {
            if (hitM === PLANT) stats.plantsIgnited++;
            grid[hitI] = FIRE; meta[hitI] = FIRE_FUEL;
          } else if ((hitM === WIRE || hitM === WATER) && meta[hitI] === 0) {
            meta[hitI] = WIRE_CHARGE;
          }
        }
      }
    } else if (weatherMode === "snow") {
      if (Math.random() < 0.5) {
        const x = Math.floor(Math.random() * COLS);
        if (grid[idx(x, 0)] === EMPTY) { grid[idx(x, 0)] = SNOW; meta[idx(x, 0)] = 0; }
      }
      if (Math.random() < 0.03) {
        const x = Math.floor(Math.random() * COLS);
        applyWindGust(x, ROWS - 5);
      }
    }
  }

  function topOfColumn(x) {
    for (let y = 0; y < ROWS; y++) {
      if (grid[idx(x, y)] !== EMPTY) return y;
    }
    return ROWS;
  }

  function presetIsland() {
    const waterTop = ROWS - 14;
    for (let y = waterTop; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) grid[idx(x, y)] = WATER;
    }
    for (let x = 45; x < 115; x++) {
      const t = (x - 80) / 35;
      const h = Math.round(26 * Math.max(0, 1 - t * t));
      if (h <= 0) continue;
      for (let dy = 0; dy < h; dy++) {
        const y = waterTop - dy;
        if (y < 0) continue;
        grid[idx(x, y)] = dy < 3 || Math.random() > 0.12 ? SAND : STONE;
      }
    }
    for (let x = 62; x < 100; x += 8) {
      const topY = topOfColumn(x);
      if (topY > 0 && topY < ROWS) {
        grid[idx(x, topY - 1)] = PLANT;
        meta[idx(x, topY - 1)] = 0;
      }
    }
  }

  function presetPond() {
    const leftWall = 55, rightWall = 105, wallTop = ROWS - 40;
    for (let y = wallTop; y < ROWS; y++) {
      grid[idx(leftWall, y)] = STONE;
      grid[idx(rightWall, y)] = STONE;
    }
    for (let y = ROWS - 30; y < ROWS; y++) {
      for (let x = leftWall + 1; x < rightWall; x++) grid[idx(x, y)] = WATER;
    }
    for (let x = 0; x < leftWall; x++) {
      for (let y = ROWS - 8; y < ROWS; y++) grid[idx(x, y)] = SAND;
    }
    for (let x = rightWall + 1; x < COLS; x++) {
      for (let y = ROWS - 8; y < ROWS; y++) grid[idx(x, y)] = SAND;
    }
    grid[idx(leftWall - 3, ROWS - 9)] = PLANT;
    grid[idx(rightWall + 3, ROWS - 9)] = PLANT;
  }

  function presetVolcano() {
    const baseY = ROWS - 4;
    const apexX = Math.round(COLS / 2), apexY = ROWS - 55;
    for (let y = apexY; y < baseY; y++) {
      const t = (y - apexY) / (baseY - apexY);
      const halfWidth = 4 + t * 30;
      for (let x = Math.round(apexX - halfWidth); x <= Math.round(apexX + halfWidth); x++) {
        if (!inBounds(x, y)) continue;
        const distFromApexX = Math.abs(x - apexX);
        if (y < apexY + 8 && distFromApexX < halfWidth - 3) continue;
        grid[idx(x, y)] = STONE;
      }
    }
    for (let y = apexY; y < apexY + 6; y++) {
      for (let x = apexX - 3; x <= apexX + 3; x++) {
        if (inBounds(x, y)) grid[idx(x, y)] = LAVA;
      }
    }
    for (let x = 0; x < COLS; x++) {
      if (Math.abs(x - apexX) > 34) grid[idx(x, ROWS - 3)] = SAND;
    }
    for (let x = 10; x < COLS - 10; x += 12) {
      if (Math.abs(x - apexX) > 36 && grid[idx(x, ROWS - 3)] === SAND) {
        grid[idx(x, ROWS - 4)] = PLANT;
      }
    }
  }

  function presetDesert() {
    for (let x = 0; x < COLS; x++) {
      const h = Math.round(8 + 6 * Math.sin(x * 0.12) + 4 * Math.sin(x * 0.05 + 1));
      for (let y = ROWS - h; y < ROWS; y++) {
        if (inBounds(x, y)) grid[idx(x, y)] = SAND;
      }
    }
  }

  function presetMine() {
    for (let y = 15; y < ROWS; y++) {
      for (let x = 10; x < COLS - 10; x++) grid[idx(x, y)] = STONE;
    }
    const chambers = [[35, 30, 10], [70, 45, 13], [110, 30, 9], [55, 70, 11], [95, 75, 10]];
    for (const [cx, cy, cr] of chambers) {
      for (let dy = -cr; dy <= cr; dy++) {
        for (let dx = -cr; dx <= cr; dx++) {
          if (dx * dx + dy * dy <= cr * cr && inBounds(cx + dx, cy + dy)) grid[idx(cx + dx, cy + dy)] = EMPTY;
        }
      }
    }
    for (let k = 0; k < chambers.length - 1; k++) {
      const [x0, y0] = chambers[k], [x1, y1] = chambers[k + 1];
      const steps = 60;
      for (let s = 0; s <= steps; s++) {
        const x = Math.round(x0 + (x1 - x0) * s / steps);
        const y = Math.round(y0 + (y1 - y0) * s / steps);
        for (let w = -2; w <= 2; w++) {
          if (inBounds(x, y + w)) grid[idx(x, y + w)] = EMPTY;
        }
      }
    }
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -6; dx <= 6; dx++) {
        const x = 70 + dx, y = 51 + dy;
        if (inBounds(x, y) && grid[idx(x, y)] === EMPTY) grid[idx(x, y)] = QUICKSAND;
      }
    }
    for (let dy = -3; dy <= 3; dy++) {
      for (let dx = -5; dx <= 5; dx++) {
        const x = 110 + dx, y = 35 + dy;
        if (inBounds(x, y) && grid[idx(x, y)] === EMPTY) grid[idx(x, y)] = WATER;
      }
    }
    if (inBounds(104, 27)) grid[idx(104, 27)] = CRYSTAL;
    if (inBounds(116, 27)) grid[idx(116, 27)] = CRYSTAL;
  }

  function presetSwamp() {
    const floor = ROWS - 10;
    for (let y = floor; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) grid[idx(x, y)] = MUD;
    }
    for (let x = 20; x < COLS - 20; x += 3) {
      if (Math.random() < 0.5) {
        const y = floor - 1 - Math.floor(Math.random() * 3);
        if (inBounds(x, y)) grid[idx(x, y)] = WATER;
      }
    }
    for (let x = 10; x < COLS - 10; x += 14) {
      for (let dy = 0; dy < 6; dy++) {
        const y = floor - 2 - dy;
        if (inBounds(x, y) && grid[idx(x, y)] === EMPTY && Math.random() < 0.7) grid[idx(x, y)] = POISON_GAS;
      }
    }
    for (let x = 30; x < COLS - 30; x += 25) {
      if (inBounds(x, floor - 1) && grid[idx(x, floor - 1)] === MUD) grid[idx(x, floor - 1)] = PLANT;
    }
  }

  function presetCrystalCave() {
    for (let y = 10; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) grid[idx(x, y)] = STONE;
    }
    const cx = 80, cy = 60;
    for (let dy = -35; dy <= 35; dy++) {
      for (let dx = -60; dx <= 60; dx++) {
        if ((dx * dx) / (60 * 60) + (dy * dy) / (35 * 35) <= 1 && inBounds(cx + dx, cy + dy)) {
          grid[idx(cx + dx, cy + dy)] = EMPTY;
        }
      }
    }
    for (let y = cy + 15; y < cy + 34; y++) {
      for (let x = cx - 40; x < cx + 40; x++) {
        if (inBounds(x, y) && grid[idx(x, y)] === EMPTY) grid[idx(x, y)] = WATER;
      }
    }
    for (let x = cx - 55; x <= cx + 55; x += 10) {
      const y = cy + 16;
      if (inBounds(x, y) && grid[idx(x, y)] === EMPTY) grid[idx(x, y)] = CRYSTAL;
    }
  }

  function presetDemolition() {
    const wallX0 = 90, wallX1 = 140, wallY0 = ROWS - 45, wallY1 = ROWS - 5;
    for (let y = wallY0; y < wallY1; y++) {
      for (let x = wallX0; x < wallX1; x++) grid[idx(x, y)] = STONE;
    }
    for (let y = wallY0 + 8; y < wallY1 - 8; y++) {
      for (let x = wallX0 + 8; x < wallX1 - 8; x++) grid[idx(x, y)] = EMPTY;
    }
    for (let y = wallY1 - 16; y < wallY1 - 8; y++) {
      for (let x = wallX0 + 8; x < wallX1 - 8; x++) grid[idx(x, y)] = OIL;
    }
    const fuseY = wallY1 - 12;
    for (let x = 10; x < wallX0 + 8; x++) {
      if (inBounds(x, fuseY)) grid[idx(x, fuseY)] = FUSE;
    }
    for (let x = 0; x < COLS; x++) {
      if (grid[idx(x, ROWS - 4)] === EMPTY) grid[idx(x, ROWS - 4)] = SAND;
    }
  }

  const PRESET_BUILDERS = {
    insel: presetIsland,
    teich: presetPond,
    vulkan: presetVolcano,
    wueste: presetDesert,
    bergwerk: presetMine,
    sumpf: presetSwamp,
    kristallhoehle: presetCrystalCave,
    sprengplatz: presetDemolition,
  };

  function loadPreset(id) {
    pushUndoSnapshot();
    grid.fill(EMPTY);
    meta.fill(0);
    try { localStorage.removeItem(CANVAS_KEY); } catch (e) {}
    const builder = PRESET_BUILDERS[id];
    if (builder) builder();
    const label = PRESETS.find((p) => p.id === id)?.label || id;
    showToast(`🗺️ Karte geladen: ${label}`);
  }

  function placeCellWithTool(i) {
    // Aktions-Werkzeuge (Bombe & Co, negative IDs) dürfen nie als Material ins Grid
    if (tool < 0) return 0;
    if (tool === EMPTY) {
      if (grid[i] !== EMPTY) { grid[i] = EMPTY; meta[i] = 0; }
      return 0;
    }
    // Fisch geht ausschließlich in Wasser, nie auf trockenen/leeren Untergrund; locker
    // verteilen, damit ein Pinselklick einen Schwarm statt eines Klumpens setzt
    if (tool === FISH) {
      if (grid[i] !== WATER || Math.random() > 0.22) return 0;
      grid[i] = FISH;
      meta[i] = Math.random() < 0.5 ? 0 : 1;
      return 1;
    }
    // Ameisen graben sich nur durch bestehenden Sand, nie in die leere Luft
    if (tool === ANT) {
      if (grid[i] !== SAND || Math.random() > 0.3) return 0;
      grid[i] = ANT;
      meta[i] = Math.random() < 0.5 ? 0 : 1;
      return 1;
    }
    if (grid[i] === EMPTY) {
      grid[i] = tool;
      meta[i] = tool === FIRE ? FIRE_FUEL : 0;
      if (tool === WIRE) stats.wirePlaced = (stats.wirePlaced || 0) + 1;
      return 1;
    }
    return 0;
  }

  function applyToolAt(x, y) {
    if (tool === WIND_TOOL) { applyWindGust(x, y); playWindSound(); return; }
    if (tool === BOMB_TOOL) { explode(x, y, 6, { igniteChance: 0.5 }); playExplosionSound("small"); return; }
    if (tool === DYNAMITE_TOOL) { explode(x, y, 12, { igniteChance: 0.7 }); playExplosionSound("medium"); return; }
    if (tool === NUKE_TOOL) { triggerNuke(x, y); playExplosionSound("large"); return; }
    const r = brushRadius;
    let placedAny = false;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy > r * r) continue;
        const nx = x + dx, ny = y + dy;
        if (!inBounds(nx, ny)) continue;
        if (placeCellWithTool(idx(nx, ny)) > 0) placedAny = true;
      }
    }
    if (placedAny) {
      playBlip(tool);
      const cellsInBrush = Math.max(1, Math.round(Math.PI * r * r * 0.3));
      registerPlacement(cellsInBrush);
    }
  }

  function paintRect(x0, y0, x1, y1) {
    const spans = [[x0, x1]];
    if (symmetryMode) spans.push([COLS - 1 - x0, COLS - 1 - x1]);
    const minY = Math.max(0, Math.min(y0, y1));
    const maxY = Math.min(ROWS - 1, Math.max(y0, y1));
    let placed = 0;
    for (const [ax, bx] of spans) {
      const minX = Math.max(0, Math.min(ax, bx));
      const maxX = Math.min(COLS - 1, Math.max(ax, bx));
      for (let yy = minY; yy <= maxY; yy++) {
        for (let xx = minX; xx <= maxX; xx++) {
          placed += placeCellWithTool(idx(xx, yy));
        }
      }
    }
    if (placed > 0) {
      playBlip(tool);
      // Fortschritts-Gutschrift deckeln, damit Riesenflächen das Freischalten nicht sprengen
      registerPlacement(Math.min(placed, 120));
    }
  }

  function floodFillAt(x, y) {
    if (!inBounds(x, y)) return;
    if (tool < 0) return;
    if (tool === FISH) {
      showToast("🐟 Fisch lässt sich nur von Hand ins Wasser malen, nicht füllen");
      return;
    }
    if (tool === ANT) {
      showToast("🐜 Ameisen lassen sich nur von Hand in Sand malen, nicht füllen");
      return;
    }
    const startI = idx(x, y);
    const target = grid[startI];
    if (tool === target) return;
    if (tool !== EMPTY && target !== EMPTY) {
      showToast("🪣 Füllen geht nur in leeren Bereichen – der Radierer löscht zusammenhängende Flächen");
      return;
    }
    const stack = [startI];
    const seen = new Uint8Array(grid.length);
    seen[startI] = 1;
    let placed = 0;
    while (stack.length) {
      const i = stack.pop();
      if (grid[i] !== target) continue;
      grid[i] = tool;
      meta[i] = tool === FIRE ? FIRE_FUEL : 0;
      if (tool === WIRE) stats.wirePlaced = (stats.wirePlaced || 0) + 1;
      if (tool !== EMPTY) placed++;
      const cx = i % COLS, cy = (i / COLS) | 0;
      for (const [nx, ny] of neighbors4(cx, cy)) {
        if (!inBounds(nx, ny)) continue;
        const nI = idx(nx, ny);
        if (!seen[nI] && grid[nI] === target) { seen[nI] = 1; stack.push(nI); }
      }
    }
    if (placed > 0) {
      playBlip(tool);
      registerPlacement(Math.min(placed, 120));
    }
  }

  function paintAt(x, y) {
    applyToolAt(x, y);
    if (symmetryMode) {
      const mx = COLS - 1 - x;
      if (mx !== x) applyToolAt(mx, y);
    }
  }

  function paintLine(x0, y0, x1, y1) {
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let x = x0, y = y0;
    const steps = Math.max(dx, dy) + 1;
    for (let s = 0; s < steps; s++) {
      paintAt(x, y);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x += sx; }
      if (e2 < dx) { err += dx; y += sy; }
    }
  }

  // --- Formen-Werkzeuge ---
  let shapeMode = "free";
  let shapeStart = null;
  let shapeEnd = null;

  function clampCell(x, y) {
    return [Math.max(0, Math.min(COLS - 1, x)), Math.max(0, Math.min(ROWS - 1, y))];
  }

  function bresenhamCells(x0, y0, x1, y1) {
    const cells = [];
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy, x = x0, y = y0;
    while (true) {
      cells.push([x, y]);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x += sx; }
      if (e2 < dx) { err += dx; y += sy; }
    }
    return cells;
  }

  function setShapeMode(mode) {
    shapeMode = mode;
    document.querySelectorAll("#shape-group .seg-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.shape === mode);
    });
  }

  function drawShapePreview() {
    if (!painting || !shapeStart || !shapeEnd) return;
    const [sx, sy] = shapeStart;
    const [ex, ey] = shapeEnd;
    const regions = [[sx, ex]];
    if (symmetryMode) regions.push([COLS - 1 - sx, COLS - 1 - ex]);
    for (const [ax, bx] of regions) {
      if (shapeMode === "rect") {
        const minX = Math.min(ax, bx), maxX = Math.max(ax, bx);
        const minY = Math.min(sy, ey), maxY = Math.max(sy, ey);
        ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
        ctx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
        ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
        ctx.fillRect(minX, minY, maxX - minX + 1, 1);
        ctx.fillRect(minX, maxY, maxX - minX + 1, 1);
        ctx.fillRect(minX, minY, 1, maxY - minY + 1);
        ctx.fillRect(maxX, minY, 1, maxY - minY + 1);
      } else if (shapeMode === "line") {
        // Vorschau in voller Pinselbreite zeichnen, damit sie zum tatsächlichen Ergebnis passt
        // (paintLine stempelt beim Loslassen Kreise mit brushRadius entlang der Linie).
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        for (const [cx, cy] of bresenhamCells(ax, sy, bx, ey)) {
          ctx.beginPath();
          ctx.arc(cx, cy, brushRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // --- Progress / unlock system ---
  function unlockedAt(count) {
    return MATERIALS.filter((m) => m.unlockAt != null && m.unlockAt <= count);
  }

  function nextLocked(count) {
    return MATERIALS.find((m) => m.unlockAt != null && m.unlockAt > count) || null;
  }

  function isUnlocked(m) {
    if (m.unlockAt != null) return m.unlockAt <= totalPlaced;
    if (m.achievement) return achievementsUnlocked.has(m.achievement);
    return true;
  }

  function achievementByKey(key) {
    return ACHIEVEMENTS.find((a) => a.key === key);
  }

  function registerPlacement(n) {
    const prev = totalPlaced;
    totalPlaced += n;
    const prevUnlocked = new Set(unlockedAt(prev).map((m) => m.id));
    const nowUnlocked = unlockedAt(totalPlaced);
    for (const m of nowUnlocked) {
      if (!prevUnlocked.has(m.id)) {
        showToast(`🔓 ${m.label} freigeschaltet!`);
        playAchievementChime();
        celebrateUnlock();
      }
    }
    saveProgress();
    renderPalette();
    renderProgress();
    renderHotbar();
    renderStatsPanel();
  }

  function statsSnapshot() {
    return Object.assign({}, stats, { totalPlaced });
  }

  const DEFAULT_STATS = {
    fireExtinguished: 0, plantsIgnited: 0, iceMelted: 0, glassCreated: 0,
    lavaWaterReactions: 0, peakWater: 0, peakFillPct: 0, explosionsTriggered: 0,
    mudFormed: 0, wirePlaced: 0, peakPlants: 0, peakSand: 0,
  };

  async function resetProgress() {
    const ok = await openModal({
      message: "Wirklich den gesamten Freischalt-Fortschritt zurücksetzen? Erfolge, Werkzeuge und Spezialmaterialien werden wieder gesperrt. Die Zeichenfläche bleibt erhalten. Das kann nicht rückgängig gemacht werden.",
      okLabel: "🔄 Zurücksetzen",
      danger: true,
    });
    if (!ok) return;
    totalPlaced = 0;
    stats = Object.assign({}, DEFAULT_STATS);
    achievementsUnlocked = new Set();
    weatherMode = null;
    saveProgress();
    setTool(SAND);
    renderProgress();
    renderChallenges();
    renderWeatherTools();
    renderStatsPanel();
    showToast("🔄 Fortschritt zurückgesetzt");
  }

  const STAT_LABELS = [
    { key: "totalPlaced", label: "Körner insgesamt platziert" },
    { key: "peakWater", label: "Meiste Wasser-Zellen gleichzeitig" },
    { key: "peakPlants", label: "Meiste Pflanzen-Zellen gleichzeitig" },
    { key: "peakSand", label: "Meiste Sand-Zellen gleichzeitig" },
    { key: "peakFillPct", label: "Höchste Flächenfüllung", suffix: "%" },
    { key: "fireExtinguished", label: "Feuer mit Wasser gelöscht" },
    { key: "iceMelted", label: "Eis geschmolzen" },
    { key: "glassCreated", label: "Sand zu Glas geschmolzen" },
    { key: "lavaWaterReactions", label: "Lava-Wasser-Kontakte" },
    { key: "mudFormed", label: "Sand zu Schlamm geworden" },
    { key: "wirePlaced", label: "Draht-Zellen platziert" },
    { key: "explosionsTriggered", label: "Explosionen ausgelöst" },
  ];

  function renderStatsPanel() {
    const body = document.getElementById("stats-body");
    if (!body) return;
    const snap = statsSnapshot();
    body.innerHTML = STAT_LABELS.map((s) => {
      const val = snap[s.key] || 0;
      return `<div class="stats-row"><span>${s.label}</span><span class="stats-val">${val}${s.suffix || ""}</span></div>`;
    }).join("");
  }

  function checkAchievements() {
    const snap = statsSnapshot();
    let any = false;
    for (const a of ACHIEVEMENTS) {
      if (achievementsUnlocked.has(a.key)) continue;
      if (a.get(snap) >= a.target) {
        achievementsUnlocked.add(a.key);
        showToast(`🏆 ${a.label}: ${a.unlocks} freigeschaltet!`);
        playAchievementChime();
        celebrateUnlock();
        any = true;
      }
    }
    return any;
  }

  function sampleStats() {
    let waterCount = 0, filledCount = 0, fireCount = 0, steamCount = 0, lavaCount = 0, chargeCount = 0, plantCount = 0, sandCount = 0;
    for (let i = 0; i < grid.length; i++) {
      const g = grid[i];
      if (g !== EMPTY) filledCount++;
      if (g === WATER) waterCount++;
      else if (g === FIRE) fireCount++;
      else if (g === STEAM) steamCount++;
      else if (g === LAVA) lavaCount++;
      else if (g === WIRE && meta[i] > 0) chargeCount++;
      else if (g === PLANT) plantCount++;
      else if (g === SAND) sandCount++;
    }
    if (plantCount > (stats.peakPlants || 0)) stats.peakPlants = plantCount;
    if (sandCount > (stats.peakSand || 0)) stats.peakSand = sandCount;
    materialCounts.water = waterCount;
    materialCounts.fire = fireCount;
    materialCounts.steam = steamCount;
    materialCounts.lava = lavaCount;
    materialCounts.charge = chargeCount;
    if (waterCount > stats.peakWater) stats.peakWater = waterCount;
    const fillPct = Math.round((filledCount / grid.length) * 100);
    if (fillPct > stats.peakFillPct) stats.peakFillPct = fillPct;
    const unlockedSomething = checkAchievements();
    renderChallenges();
    if (unlockedSomething) { renderPalette(); renderSpecialTools(); renderActionTools(); renderWeatherTools(); renderHotbar(); }
    renderStatsPanel();
    saveProgress();
  }

  let toastTimer = null;
  function showToast(text) {
    const el = document.getElementById("toast");
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  function renderProgress() {
    const fill = document.getElementById("progress-fill");
    const label = document.getElementById("progress-label");
    const next = nextLocked(totalPlaced);
    if (!next) {
      fill.style.width = "100%";
      label.textContent = "Alle Grundmaterialien freigeschaltet.";
      return;
    }
    const prevThreshold = [...MATERIALS].reverse().find((m) => m.unlockAt != null && m.unlockAt <= totalPlaced)?.unlockAt || 0;
    const span = next.unlockAt - prevThreshold;
    const progressed = totalPlaced - prevThreshold;
    const pct = Math.max(0, Math.min(100, (progressed / span) * 100));
    fill.style.width = pct + "%";
    label.textContent = `Nächste Freischaltung: ${next.label} (${totalPlaced}/${next.unlockAt})`;
  }

  function defaultMetaFor(id) {
    if (id === FIRE) return FIRE_FUEL;
    if (id === PLANT) return 20;
    return 0;
  }

  function setTool(t) {
    tool = t;
    renderPalette();
    renderSpecialTools();
    renderActionTools();
    renderHotbar();
  }

  function getHotbarEntries() {
    const entries = [{ tool: EMPTY, label: "Radierer" }];
    for (const m of MATERIALS) {
      if (isUnlocked(m)) entries.push({ tool: m.id, label: m.label });
    }
    for (const t of ACTION_TOOLS) {
      if (isUnlocked(t)) entries.push({ tool: t.tool, label: t.label });
    }
    if (achievementsUnlocked.has("sturm")) entries.push({ tool: WIND_TOOL, label: "Wind" });
    return entries.slice(0, 10);
  }

  function renderHotbar() {
    const el = document.getElementById("hotbar");
    if (!el) return;
    const hotbar = getHotbarEntries();
    el.innerHTML = "";
    hotbar.forEach((entry, i) => {
      const key = i === 9 ? "0" : String(i + 1);
      const btn = document.createElement("button");
      btn.className = "hotbar-slot" + (tool === entry.tool ? " active" : "");
      const color = entry.tool >= 0 ? colorFor(0, 0, entry.tool, defaultMetaFor(entry.tool)) : null;
      const bg = color ? `rgb(${color[0]},${color[1]},${color[2]})` : "rgba(127, 179, 201, 0.16)";
      const swatch = `<span class="hotbar-swatch" style="background:${bg}">${iconForTool(entry.tool)}</span>`;
      btn.innerHTML = `<span class="hotbar-key">${key}</span>${swatch}`;
      btn.title = entry.label;
      btn.onclick = () => setTool(entry.tool);
      el.appendChild(btn);
    });
  }

  function setWeather(mode) {
    weatherMode = weatherMode === mode ? null : mode;
    renderWeatherTools();
  }

  function renderPalette() {
    const nav = document.getElementById("palette");
    nav.innerHTML = "";

    const eraseBtn = document.createElement("button");
    eraseBtn.className = "mat-btn" + (tool === EMPTY ? " active" : "");
    eraseBtn.innerHTML = `<span class="mat-swatch" style="background:#334155">${ERASER_ICON}</span> Radierer`;
    eraseBtn.onclick = () => setTool(EMPTY);
    nav.appendChild(eraseBtn);

    for (const m of MATERIALS) {
      const unlocked = isUnlocked(m);
      const btn = document.createElement("button");
      btn.className = "mat-btn" + (tool === m.id ? " active" : "");
      const [r, g, b] = colorFor(0, 0, m.id, defaultMetaFor(m.id)).slice(0, 3);
      btn.innerHTML = `<span class="mat-swatch" style="background:rgb(${r},${g},${b})">${m.icon}</span> ${m.label}`;
      if (!unlocked) {
        btn.disabled = true;
        btn.title = m.unlockAt != null
          ? `Freischaltung bei ${m.unlockAt} platzierten Körnern`
          : `Herausforderung: ${achievementByKey(m.achievement)?.desc || ""}`;
      } else {
        btn.onclick = () => setTool(m.id);
      }
      nav.appendChild(btn);
    }
  }

  function renderSpecialTools() {
    const row = document.getElementById("special-row");
    if (!row) return;
    row.innerHTML = "";
    if (achievementsUnlocked.has("sturm")) {
      const btn = document.createElement("button");
      btn.className = "mat-btn special" + (tool === WIND_TOOL ? " active" : "");
      btn.innerHTML = "💨 Wind";
      btn.title = "Klicken oder ziehen, um lose Materialien wegzupusten";
      btn.onclick = () => setTool(WIND_TOOL);
      row.appendChild(btn);
    }
    if (achievementsUnlocked.has("vulkanausbruch")) {
      const btn = document.createElement("button");
      btn.className = "ghost-btn small";
      btn.textContent = "☄️ Meteor";
      btn.onclick = dropMeteor;
      row.appendChild(btn);
    }
  }

  function renderActionTools() {
    const row = document.getElementById("action-tools-row");
    if (!row) return;
    row.innerHTML = "";
    for (const t of ACTION_TOOLS) {
      const unlocked = isUnlocked(t);
      const btn = document.createElement("button");
      btn.className = "mat-btn special" + (tool === t.tool ? " active" : "");
      btn.innerHTML = t.label;
      if (!unlocked) {
        btn.disabled = true;
        btn.title = t.unlockAt != null
          ? `Freischaltung bei ${t.unlockAt} platzierten Körnern`
          : `Herausforderung: ${achievementByKey(t.achievement)?.desc || ""}`;
      } else {
        btn.onclick = () => setTool(t.tool);
      }
      row.appendChild(btn);
    }
  }

  function renderWeatherTools() {
    const row = document.getElementById("weather-row");
    if (!row) return;
    row.innerHTML = "";
    for (const w of WEATHER_TOOLS) {
      const unlocked = isUnlocked(w);
      const btn = document.createElement("button");
      btn.className = "mat-btn special" + (weatherMode === w.mode ? " active" : "");
      btn.innerHTML = w.label;
      if (!unlocked) {
        btn.disabled = true;
        btn.title = `Herausforderung: ${achievementByKey(w.achievement)?.desc || ""}`;
      } else {
        btn.onclick = () => setWeather(w.mode);
      }
      row.appendChild(btn);
    }
  }

  function renderPresets() {
    const row = document.getElementById("preset-row");
    if (!row) return;
    row.innerHTML = "";
    for (const p of PRESETS) {
      const btn = document.createElement("button");
      btn.className = "ghost-btn small";
      btn.textContent = p.label;
      btn.onclick = () => loadPreset(p.id);
      row.appendChild(btn);
    }
  }

  const RANK_TITLES = [
    { min: 0, title: "Sandkasten-Neuling" },
    { min: 4, title: "Hobby-Alchemist" },
    { min: 8, title: "Elementmeister" },
    { min: 12, title: "Katastrophen-Experte" },
    { min: 16, title: "Weltenformer" },
  ];

  function currentRank() {
    const n = achievementsUnlocked.size;
    if (n >= ACHIEVEMENTS.length) return { title: "Zen-Großmeister" };
    let best = RANK_TITLES[0];
    for (const r of RANK_TITLES) if (n >= r.min) best = r;
    return best;
  }

  function materialForAchievement(key) {
    return MATERIALS.find((m) => m.achievement === key);
  }

  const ERASER_ICON = "🧹";

  function iconForTool(t) {
    if (t === EMPTY) return ERASER_ICON;
    if (t === WIND_TOOL) return "💨";
    if (t === BOMB_TOOL) return "💣";
    if (t === DYNAMITE_TOOL) return "🧨";
    if (t === NUKE_TOOL) return "☢️";
    const mat = MATERIALS.find((m) => m.id === t);
    return mat ? mat.icon : "❔";
  }

  function achievementUnlockIcon(a) {
    const mat = materialForAchievement(a.key);
    if (mat) return mat.icon;
    const action = ACTION_TOOLS.find((t) => t.achievement === a.key);
    if (action) return action.label.split(" ")[0];
    const weather = WEATHER_TOOLS.find((t) => t.achievement === a.key);
    if (weather) return weather.label.split(" ")[0];
    if (a.key === "vulkanausbruch") return "☄️";
    if (a.key === "sturm") return "💨";
    return "🔓";
  }

  function renderRank() {
    const header = document.getElementById("quest-header");
    const n = achievementsUnlocked.size;
    const total = ACHIEVEMENTS.length;
    const rank = currentRank();
    if (header) {
      const pct = Math.round((n / total) * 100);
      header.innerHTML = `
        <div class="rank-title">🏆 ${rank.title}</div>
        <div class="rank-sub">${n}/${total} Erfolge</div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      `;
    }
    const rankLine = document.getElementById("rank-line");
    if (rankLine) rankLine.textContent = `${rank.title} · ${n}/${total} Erfolge`;
  }

  function questCardHtml(a, val, pct, done) {
    const mat = materialForAchievement(a.key);
    const swatch = mat ? colorFor(0, 0, mat.id, defaultMetaFor(mat.id)) : null;
    const borderColor = swatch ? `rgb(${swatch[0]},${swatch[1]},${swatch[2]})` : "var(--accent)";
    return `
      <div class="quest-card${done ? " done" : ""}" style="border-left-color:${borderColor}">
        <div class="quest-head">
          <span class="quest-icon">${done ? "✅" : "🔒"}</span>
          <span class="quest-label">${a.label}</span>
          <span class="quest-reward">→ ${achievementUnlockIcon(a)} ${a.unlocks}</span>
        </div>
        <div class="quest-desc">${a.desc}${done ? "" : ` (${val}/${a.target})`}</div>
        <div class="quest-track"><div class="quest-fill" style="width:${pct}%"></div></div>
      </div>
    `;
  }

  function renderChallenges() {
    const list = document.getElementById("challenge-list");
    if (!list) return;
    renderRank();
    const snap = statsSnapshot();
    const active = [];
    const done = [];
    for (const a of ACHIEVEMENTS) {
      const isDone = achievementsUnlocked.has(a.key);
      const val = Math.min(a.target, Math.floor(a.get(snap)));
      const pct = Math.max(0, Math.min(100, (val / a.target) * 100));
      (isDone ? done : active).push({ a, val, pct });
    }
    active.sort((x, y) => y.pct - x.pct);
    let html = active.map((e) => questCardHtml(e.a, e.val, e.pct, false)).join("");
    if (done.length) {
      html += `
        <details class="quest-done-group">
          <summary>✅ Abgeschlossen (${done.length})</summary>
          ${done.map((e) => questCardHtml(e.a, e.val, e.pct, true)).join("")}
        </details>
      `;
    }
    list.innerHTML = html;
  }

  // --- Events ---
  let panDrag = null;

  canvas.addEventListener("pointerdown", (e) => {
    if (e.button === 1 || e.altKey) {
      e.preventDefault();
      panDrag = { sx: e.clientX, sy: e.clientY, px: panX, py: panY };
      canvas.setPointerCapture(e.pointerId);
      return;
    }
    ensureAudio();
    pushUndoSnapshot();
    const [x, y] = clampCell(...canvasPosToCell(e.clientX, e.clientY));
    // Aktions-Werkzeuge (Bombe & Co) ignorieren die Formen-Modi und wirken direkt
    if (tool >= 0 && shapeMode === "fill") {
      floodFillAt(x, y);
      if (symmetryMode) {
        const mx = COLS - 1 - x;
        if (mx !== x) floodFillAt(mx, y);
      }
      return;
    }
    painting = true;
    canvas.setPointerCapture(e.pointerId);
    if (tool >= 0 && (shapeMode === "line" || shapeMode === "rect")) {
      shapeStart = [x, y];
      shapeEnd = [x, y];
      return;
    }
    paintAt(x, y);
    lastPaintCell = [x, y];
  });

  canvas.addEventListener("pointermove", (e) => {
    if (panDrag) {
      panX = panDrag.px + (e.clientX - panDrag.sx);
      panY = panDrag.py + (e.clientY - panDrag.sy);
      applyView();
      return;
    }
    if (!painting) return;
    if (e.buttons === 0) { endPaint(e); return; }
    const [x, y] = canvasPosToCell(e.clientX, e.clientY);
    if (shapeStart) {
      shapeEnd = clampCell(x, y);
      return;
    }
    if (lastPaintCell) paintLine(lastPaintCell[0], lastPaintCell[1], x, y);
    else paintAt(x, y);
    lastPaintCell = [x, y];
  });

  function endPaint(e) {
    panDrag = null;
    if (painting && shapeStart && shapeEnd) {
      if (shapeMode === "line") paintLine(shapeStart[0], shapeStart[1], shapeEnd[0], shapeEnd[1]);
      else if (shapeMode === "rect") paintRect(shapeStart[0], shapeStart[1], shapeEnd[0], shapeEnd[1]);
    }
    shapeStart = null;
    shapeEnd = null;
    painting = false;
    lastPaintCell = null;
    if (e && e.pointerId != null && canvas.hasPointerCapture && canvas.hasPointerCapture(e.pointerId)) {
      try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    }
  }

  canvas.addEventListener("pointerup", endPaint);
  canvas.addEventListener("pointercancel", endPaint);
  window.addEventListener("pointerup", endPaint);
  window.addEventListener("blur", () => {
    shapeStart = null;
    shapeEnd = null;
    endPaint();
  });

  if (viewportEl) {
    viewportEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      const rect = viewportEl.getBoundingClientRect();
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.deltaY < 0 ? 1.25 : 0.8);
    }, { passive: false });
    // Pan-Grenzen neu berechnen, wenn sich die Viewport-Größe ändert (Fenster/Orientierung)
    window.addEventListener("resize", () => applyView());
  }

  document.getElementById("brush-slider").addEventListener("input", (e) => {
    brushRadius = parseInt(e.target.value, 10);
    document.getElementById("brush-label").textContent = brushRadius;
  });

  document.getElementById("clear-btn").addEventListener("click", () => {
    pushUndoSnapshot();
    grid.fill(EMPTY);
    meta.fill(0);
    try { localStorage.removeItem(CANVAS_KEY); } catch (e) {}
  });

  const undoBtn = document.getElementById("undo-btn");
  if (undoBtn) undoBtn.addEventListener("click", undo);

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      undo();
    }
  });

  const HOTBAR_KEYS = { "1": 0, "2": 1, "3": 2, "4": 3, "5": 4, "6": 5, "7": 6, "8": 7, "9": 8, "0": 9 };
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    if (!(e.key in HOTBAR_KEYS)) return;
    const entry = getHotbarEntries()[HOTBAR_KEYS[e.key]];
    if (entry) { setTool(entry.tool); showToast(`🎹 ${entry.label}`); }
  });

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "BUTTON" || t.tagName === "SELECT")) return;
    if (e.key === " ") {
      e.preventDefault();
      togglePause();
      showToast(paused ? "⏸️ Pausiert – Punkt-Taste für Einzelschritt" : "▶️ Weiter geht's");
    } else if (e.key === "." && paused) {
      step();
    }
  });

  const pauseBtn = document.getElementById("pause-btn");
  if (pauseBtn) pauseBtn.addEventListener("click", togglePause);
  const speedBtn = document.getElementById("speed-btn");
  if (speedBtn) speedBtn.addEventListener("click", cycleSpeed);
  const zoomInBtn = document.getElementById("zoom-in-btn");
  const zoomOutBtn = document.getElementById("zoom-out-btn");
  const zoomResetBtn = document.getElementById("zoom-reset-btn");
  if (zoomInBtn && viewportEl) zoomInBtn.addEventListener("click", () => zoomAt(viewportEl.clientWidth / 2, viewportEl.clientHeight / 2, 1.5));
  if (zoomOutBtn && viewportEl) zoomOutBtn.addEventListener("click", () => zoomAt(viewportEl.clientWidth / 2, viewportEl.clientHeight / 2, 1 / 1.5));
  if (zoomResetBtn) zoomResetBtn.addEventListener("click", resetView);

  const timeSlider = document.getElementById("time-slider");
  if (timeSlider) {
    timeSlider.addEventListener("input", (e) => {
      setManualCyclePos(parseInt(e.target.value, 10) / 100);
    });
  }
  const timeAutoBtn = document.getElementById("time-auto-btn");
  if (timeAutoBtn) timeAutoBtn.addEventListener("click", resumeAutoCycle);

  document.querySelectorAll("#shape-group .seg-btn").forEach((b) => {
    b.addEventListener("click", () => setShapeMode(b.dataset.shape));
  });

  const symmetryBtn = document.getElementById("symmetry-btn");
  if (symmetryBtn) {
    symmetryBtn.addEventListener("click", () => {
      symmetryMode = !symmetryMode;
      renderSymmetryToggle();
    });
  }

  const soundToggleBtn = document.getElementById("sound-toggle");
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => setMuted(!soundMuted));
  }

  const toggleLeftBtn = document.getElementById("toggle-left");
  if (toggleLeftBtn) toggleLeftBtn.addEventListener("click", () => toggleSidebar("left"));
  const toggleRightBtn = document.getElementById("toggle-right");
  if (toggleRightBtn) toggleRightBtn.addEventListener("click", () => toggleSidebar("right"));

  const exportBtn = document.getElementById("export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const scale = 4;
      const off = document.createElement("canvas");
      off.width = COLS * scale;
      off.height = ROWS * scale;
      const octx = off.getContext("2d");
      octx.imageSmoothingEnabled = false;
      octx.drawImage(canvas, 0, 0, off.width, off.height);
      const link = document.createElement("a");
      link.download = "zen-sand.png";
      link.href = off.toDataURL("image/png");
      link.click();
    });
  }

  const gardenSaveBtn = document.getElementById("garden-save-btn");
  if (gardenSaveBtn) gardenSaveBtn.addEventListener("click", saveCurrentAsGarden);

  const resetProgressBtn = document.getElementById("reset-progress-btn");
  if (resetProgressBtn) resetProgressBtn.addEventListener("click", resetProgress);

  const modalOverlay = document.getElementById("modal-overlay");
  const modalInput = document.getElementById("modal-input");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const modalOkBtn = document.getElementById("modal-ok-btn");
  if (modalCancelBtn) modalCancelBtn.addEventListener("click", () => closeModal(null));
  if (modalOkBtn) modalOkBtn.addEventListener("click", () => closeModal(modalInput.style.display === "none" ? true : (modalInput.value.trim() || null)));
  if (modalOverlay) modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(null); });
  if (modalInput) {
    modalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") closeModal(modalInput.value.trim() || null);
      if (e.key === "Escape") closeModal(null);
    });
  }
  window.addEventListener("keydown", (e) => {
    if (modalOverlay && !modalOverlay.hidden && e.key === "Escape") closeModal(null);
  });

  loadProgress();
  loadCanvas();
  renderPalette();
  renderProgress();
  renderChallenges();
  renderSpecialTools();
  renderActionTools();
  renderWeatherTools();
  renderPresets();
  renderGardenList();
  renderStatsPanel();
  renderSoundToggle();
  renderSymmetryToggle();
  renderHotbar();
  applySidebarState();
  renderSimControls();
  renderTimeControls(currentCyclePos());
  applyView();
  setInterval(sampleStats, 1500);
  setInterval(saveCanvas, 4000);
  setInterval(ambientSoundTick, 400);
  window.addEventListener("beforeunload", saveCanvas);
  loop();
})();
