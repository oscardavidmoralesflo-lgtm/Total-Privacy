/* =========================================================
   BASTIÓN ACADEMY · Motor de la plataforma (vanilla JS, 100% local)
   ========================================================= */
(function () {
  "use strict";

  var T = window.BASTION;
  var MODS = T.modules.slice().sort(function (a, b) { return a.num.localeCompare(b.num); });
  var ALL = [];
  MODS.forEach(function (m) { m.lessons.forEach(function (l, i) { l.mod = m; l.idx = i; ALL.push(l); }); });
  var LBY = {}; ALL.forEach(function (l, i) { l.g = i; LBY[l.id] = l; });
  var MBY = {}; MODS.forEach(function (m) { MBY[m.id] = m; });
  var COLORS = { em: "#00f5a0", cy: "#22d3ee", vi: "#a78bfa", go: "#fbbf24", ro: "#fb7185", bl: "#60a5fa" };

  /* ---------------- Estado persistente ---------------- */
  var KEY = "bastion.academy.v1", OLD_KEY = "tokin.academy.v1";
  try { if (!localStorage.getItem(KEY) && localStorage.getItem(OLD_KEY)) { localStorage.setItem(KEY, localStorage.getItem(OLD_KEY)); localStorage.removeItem(OLD_KEY); } } catch (e) { /* sin almacenamiento */ }
  function blank() { return { lessons: {}, steps: {}, quizzes: {}, sprint: {}, notes: {}, labs: { comp: {}, audit: {}, safe: null, tm: null }, badges: {}, days: [], modDone: {}, last: null, prefs: { sound: true, name: "", onboarded: false }, cards: {}, exam: null, daily: null, rankIdx: 0 }; }
  var S = load();
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var s = JSON.parse(raw), b = blank();
      Object.keys(b).forEach(function (k) { if (s[k] === undefined) s[k] = b[k]; });
      Object.keys(b.labs).forEach(function (k) { if (s.labs[k] === undefined) s.labs[k] = b.labs[k]; });
      return s;
    } catch (e) { return blank(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* almacenamiento no disponible */ } }
  function today() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function activity() { var t = today(); if (S.days.indexOf(t) < 0) { S.days.push(t); if (S.days.length > 400) S.days.shift(); } }
  function streak() {
    var set = {}; S.days.forEach(function (d) { set[d] = 1; });
    var d = new Date(), n = 0;
    function key(x) { return x.getFullYear() + "-" + pad(x.getMonth() + 1) + "-" + pad(x.getDate()); }
    if (!set[key(d)]) d.setDate(d.getDate() - 1);
    while (set[key(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* ---------------- Métricas ---------------- */
  function lessonsDone() { return ALL.filter(function (l) { return S.lessons[l.id]; }).length; }
  function stepsDone() { return Object.keys(S.steps).filter(function (k) { return S.steps[k]; }).length; }
  function quizPassed() { return Object.keys(S.quizzes).filter(function (k) { return S.quizzes[k] && S.quizzes[k].best >= 0.7; }).length; }
  function sprintDone() { return Object.keys(S.sprint).filter(function (k) { return S.sprint[k]; }).length; }
  function modProgress(m) { var d = m.lessons.filter(function (l) { return S.lessons[l.id]; }).length; return { d: d, t: m.lessons.length, p: m.lessons.length ? d / m.lessons.length : 0 }; }
  function modsDone() { return MODS.filter(function (m) { return modProgress(m).p === 1; }).length; }
  function cardsMastered() { return Object.keys(S.cards).filter(function (k) { return S.cards[k].b >= 3; }).length; }
  function xp() { return lessonsDone() * 100 + stepsDone() * 5 + quizPassed() * 150 + sprintDone() * 30 + Object.keys(S.badges).length * 50 + cardsMastered() * 10 + (S.exam && S.exam.best >= 0.8 ? 500 : 0); }
  function dailyXp() {
    var t = today();
    if (!S.daily || S.daily.d !== t) { S.daily = { d: t, start: xp() }; save(); }
    return Math.max(0, xp() - S.daily.start);
  }
  var DAILY_GOAL = 150;
  function rank() {
    var x = xp(), r = T.ranks[0], next = null;
    for (var i = 0; i < T.ranks.length; i++) { if (x >= T.ranks[i].xp) { r = T.ranks[i]; next = T.ranks[i + 1] || null; } }
    var p = next ? (x - r.xp) / (next.xp - r.xp) : 1;
    return { r: r, next: next, p: p, x: x, lvl: T.ranks.indexOf(r) + 1 };
  }
  function totalPct() { return Math.round(lessonsDone() / ALL.length * 100); }
  function levelProgress(n) {
    var ls = ALL.filter(function (l) { return l.mod.level === n; });
    return ls.length ? ls.filter(function (l) { return S.lessons[l.id]; }).length / ls.length : 0;
  }

  /* ---------------- Utilidades ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function strip(s) { return String(s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
  function norm(s) { return strip(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function rand(n) {
    var max = Math.floor(4294967296 / n) * n, buf = new Uint32Array(1), x;
    do { crypto.getRandomValues(buf); x = buf[0]; } while (x >= max);
    return x % n;
  }
  function pick(a) { return a[rand(a.length)]; }
  function debounce(fn, ms) { var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms); }; }
  function copy(text) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast("📋 Copiado al portapapeles"); } catch (e) { toast("No se pudo copiar"); }
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { toast("📋 Copiado al portapapeles"); }, fallback);
    else fallback();
  }
  function toolFind(name) {
    var n = norm(name);
    for (var i = 0; i < T.arsenal.length; i++) if (norm(T.arsenal[i].n) === n) return T.arsenal[i];
    return null;
  }

  /* ---------------- Toasts y confeti ---------------- */
  function toast(msg, ico) {
    var el = document.createElement("div");
    el.className = "toast"; el.innerHTML = (ico ? "<span style='font-size:18px'>" + ico + "</span>" : "") + "<span>" + msg + "</span>";
    $("#toasts").appendChild(el);
    setTimeout(function () { el.classList.add("out"); setTimeout(function () { el.remove(); }, 400); }, 3200);
  }
  var cv = $("#confetti"), cx = cv.getContext("2d"), parts = [], confRunning = false;
  /* Celebración sobria: un velo de partículas doradas y esmeralda que cae despacio.
     Solo para grandes logros (módulo completado, nuevo rango, examen aprobado). */
  function confetti(n) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || (n || 0) < 200) return;
    cv.width = innerWidth; cv.height = innerHeight;
    var cols = ["251,191,36", "0,245,160", "255,255,255"];
    for (var i = 0; i < 70; i++) {
      parts.push({ x: Math.random() * innerWidth, y: -10 - Math.random() * innerHeight * .4, vy: .6 + Math.random() * 1.1, sway: Math.random() * 6.28, s: Math.random() * 1.8 + .8, c: pick(cols), life: 0, max: 220 + Math.random() * 80 });
    }
    if (!confRunning) { confRunning = true; requestAnimationFrame(confTick); }
  }
  function confTick() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(function (p) { return p.life < p.max && p.y < cv.height + 20; });
    parts.forEach(function (p) {
      p.life++; p.sway += .02; p.y += p.vy; p.x += Math.sin(p.sway) * .35;
      var a = Math.min(1, p.life / 30) * Math.max(0, 1 - p.life / p.max);
      cx.beginPath(); cx.fillStyle = "rgba(" + p.c + "," + (a * .9).toFixed(3) + ")"; cx.shadowColor = "rgba(" + p.c + ",.8)"; cx.shadowBlur = 8;
      cx.arc(p.x, p.y, p.s, 0, 6.283); cx.fill();
    });
    cx.shadowBlur = 0;
    if (parts.length) requestAnimationFrame(confTick); else { confRunning = false; cx.clearRect(0, 0, cv.width, cv.height); }
  }

  /* ---------------- Insignias ---------------- */
  function checkBadges() {
    var got = [];
    function give(id, cond) { if (cond && !S.badges[id]) { S.badges[id] = Date.now(); got.push(id); } }
    var perfect = Object.keys(S.quizzes).some(function (k) { return S.quizzes[k] && S.quizzes[k].best === 1; });
    var auditN = Object.keys(S.labs.audit).filter(function (k) { return S.labs.audit[k]; }).length;
    give("first", lessonsDone() >= 1);
    give("mod1", modsDone() >= 1);
    give("mod5", modsDone() >= 5);
    give("mod10", modsDone() >= 10);
    give("modall", modsDone() === MODS.length);
    give("quiz", perfect);
    give("quiz5", quizPassed() >= 5);
    give("sprint7", sprintDone() >= 7);
    give("sprint30", sprintDone() >= 30);
    give("pass", !!S.labs.passGen);
    give("comp", !!S.labs.compSaved);
    give("safe", !!S.labs.safe);
    give("audit", auditN >= 10);
    give("threat", !!S.labs.tm);
    give("streak3", streak() >= 3);
    give("streak7", streak() >= 7);
    give("backup", !!S.labs.backup);
    MODS.forEach(function (m) {
      if (modProgress(m).p === 1 && !S.modDone[m.id]) { S.modDone[m.id] = 1; setTimeout(function () { confetti(220); toast("Módulo " + m.num + " completado: " + esc(m.title), "🏆"); }, 300); }
    });
    if (got.length) {
      got.forEach(function (id, i) {
        var b = T.badges.filter(function (x) { return x.id === id; })[0];
        setTimeout(function () { toast("Insignia desbloqueada: <b>" + b.n + "</b>", b.ico); sfx.badge(); }, 400 + i * 700);
      });
      confetti(90);
    }
    save();
  }
  function commit() {
    var before = dailyXp();
    activity(); checkBadges();
    var ri = rank().lvl;
    if (ri > (S.rankIdx || 1)) { S.rankIdx = ri; setTimeout(levelUp, 700); } else if (!S.rankIdx) S.rankIdx = ri;
    var after = dailyXp();
    if (before < DAILY_GOAL && after >= DAILY_GOAL) setTimeout(function () { toast("¡Meta diaria cumplida! " + DAILY_GOAL + " XP hoy", "🎯"); sfx.success(); confetti(120); }, 900);
    save(); chrome();
  }

  /* ---------------- Motor de sonido (Web Audio, sintetizado: sin archivos) ---------------- */
  var sfx = (function () {
    var ctx = null, master = null;
    function on() { return S.prefs && S.prefs.sound !== false; }
    function ac() {
      if (!ctx) {
        var A = window.AudioContext || window.webkitAudioContext; if (!A) return null;
        ctx = new A(); master = ctx.createGain(); master.gain.value = 0.18; master.connect(ctx.destination);
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }
    function tone(freq, start, dur, type, vol, slideTo) {
      var c = ac(); if (!c) return;
      var t = c.currentTime + (start || 0), o = c.createOscillator(), g = c.createGain();
      o.type = type || "sine"; o.frequency.setValueAtTime(freq, t);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.5, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
    }
    function noise(start, dur, vol, from, to) {
      var c = ac(); if (!c) return;
      var len = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), t = c.currentTime + (start || 0);
      f.type = "bandpass"; f.Q.value = 1.2; f.frequency.setValueAtTime(from || 600, t); f.frequency.exponentialRampToValueAtTime(to || 2400, t + dur);
      g.gain.value = vol || 0.25; s.buffer = buf; s.connect(f); f.connect(g); g.connect(master); s.start(t);
    }
    function guard(fn) { return function () { if (!on()) return; try { fn(); } catch (e) { /* audio no disponible */ } }; }
    return {
      tap: guard(function () { tone(1400, 0, 0.035, "sine", 0.07); }),
      nav: guard(function () { noise(0, 0.14, 0.045, 700, 2600); }),
      check: guard(function () { tone(660, 0, 0.09, "triangle", 0.35); tone(990, 0.07, 0.14, "triangle", 0.35); }),
      uncheck: guard(function () { tone(700, 0, 0.08, "triangle", 0.25); tone(470, 0.06, 0.12, "triangle", 0.25); }),
      success: guard(function () { [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) { tone(f, i * 0.085, 0.32, "triangle", 0.42); tone(f * 2, i * 0.085, 0.2, "sine", 0.08); }); }),
      wrong: guard(function () { tone(220, 0, 0.18, "sawtooth", 0.14, 160); tone(185, 0.12, 0.22, "sawtooth", 0.12, 130); }),
      correct: guard(function () { tone(880, 0, 0.1, "sine", 0.4); tone(1318.5, 0.08, 0.22, "sine", 0.4); }),
      flip: guard(function () { noise(0, 0.12, 0.18, 1800, 600); }),
      badge: guard(function () { [784, 988, 1175, 1568].forEach(function (f, i) { tone(f, i * 0.07, 0.4, "sine", 0.35); }); noise(0.25, 0.5, 0.06, 4000, 9000); }),
      levelup: guard(function () {
        tone(196, 0, 0.9, "sawtooth", 0.08, 392); noise(0, 0.6, 0.08, 300, 5000);
        [523.25, 659.25, 783.99, 1046.5, 1318.5, 1568].forEach(function (f, i) { tone(f, 0.35 + i * 0.09, 0.6, "triangle", 0.38); });
        [1046.5, 1318.5, 1568, 2093].forEach(function (f) { tone(f, 0.95, 1.1, "sine", 0.12); });
      }),
      open: guard(function () { tone(520, 0, 0.12, "sine", 0.2, 900); }),
      set: function (v) { S.prefs.sound = v; save(); }
    };
  })();

  /* ---------------- Recompensas visuales ---------------- */
  function xpFloat(e, txt, color) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var el = document.createElement("div"); el.className = "xp-float"; el.textContent = txt;
    if (color) el.style.color = color;
    var x = e && e.clientX ? e.clientX : innerWidth / 2, y = e && e.clientY ? e.clientY : innerHeight / 2;
    el.style.left = x + "px"; el.style.top = y + "px";
    document.body.appendChild(el); setTimeout(function () { el.remove(); }, 1300);
  }
  function levelUp() {
    var rk = rank();
    var ov = document.createElement("div"); ov.className = "levelup";
    ov.innerHTML = "<div class='lu-rays'></div><div class='lu-card'><div class='lu-k'>NUEVO RANGO DESBLOQUEADO</div><div class='lu-ico'>" + rk.r.ico + "</div><div class='lu-name'>" + rk.r.name + "</div><div class='lu-d'>" + rk.r.d + "</div><div class='lu-xp'>" + rk.x + " XP</div><button class='btn btn-primary mt16' data-act='closeLevel'>Continuar →</button></div>";
    document.body.appendChild(ov);
    sfx.levelup(); confetti(260);
    setTimeout(function () { ov.classList.add("show"); }, 20);
  }

  /* ---------------- Fondo animado ---------------- */
  (function bg() {
    var c = $("#bgCanvas"), g = c.getContext("2d"), pts = [], W, H, mouse = { x: -999, y: -999 };
    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function size() {
      W = c.width = innerWidth; H = c.height = innerHeight;
      var n = Math.min(55, Math.floor(W * H / 26000)); pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .12, vy: (Math.random() - .5) * .12 });
    }
    function draw() {
      g.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (!reduced) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
        g.fillStyle = "rgba(0,245,160,.55)"; g.beginPath(); g.arc(p.x, p.y, 1.4, 0, 6.283); g.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 17000) { g.strokeStyle = "rgba(34,211,238," + (0.14 * (1 - d / 17000)) + ")"; g.lineWidth = 1; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(q.x, q.y); g.stroke(); }
        }
      }
      if (!reduced && !document.hidden) requestAnimationFrame(draw);
    }
    addEventListener("resize", debounce(function () { size(); if (reduced) draw(); }, 200));
    addEventListener("mousemove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener("visibilitychange", function () { if (!document.hidden && !reduced) requestAnimationFrame(draw); });
    size(); draw();
  })();

  /* ---------------- Barra lateral y cabecera ---------------- */
  var NAV = [
    { r: "", ico: "🏠", t: "Inicio" },
    { r: "ruta", ico: "📚", t: "Programa completo", pill: function () { return MODS.length + " mód."; } },
    { r: "reto", ico: "⚡", t: "Reto 30 días", pill: function () { return sprintDone() + "/30"; } },
    { r: "arsenal", ico: "🛡️", t: "Arsenal", pill: function () { return T.arsenal.length; } },
    { r: "amenazas", ico: "📡", t: "Radar de amenazas", pill: function () { return T.threats.length; } },
    { r: "labs", ico: "🧪", t: "Laboratorios", pill: function () { return "7"; } },
    { r: "cobertura", ico: "🗺️", t: "Mapa del temario", pill: function () { return covStats().pct + "%"; } },
    { r: "repaso", ico: "🃏", t: "Repaso diario", pill: function () { var n = dueCards().length; return n > 99 ? "99+" : n; } },
    { r: "examen", ico: "🎓", t: "Examen y certificado", pill: function () { return S.exam && S.exam.best >= 0.8 ? "✓" : "—"; } },
    { r: "glosario", ico: "📖", t: "Glosario" },
    { r: "progreso", ico: "🏆", t: "Mi progreso", pill: function () { return Object.keys(S.badges).length + "/" + T.badges.length; } }
  ];
  function chrome() {
    var cur = route().parts;
    var base = cur[0] || "";
    $("#mainNav").innerHTML = NAV.map(function (n) {
      var on = base === n.r || (n.r === "ruta" && (base === "m" || base === "l"));
      return "<button class='nav-item" + (on ? " active" : "") + "' data-go='#/" + n.r + "'><span class='ico'>" + n.ico + "</span><span>" + n.t + "</span>" + (n.pill ? "<span class='pill'>" + n.pill() + "</span>" : "") + "</button>";
    }).join("");
    var activeMod = base === "m" ? cur[1] : base === "l" && LBY[cur[1]] ? LBY[cur[1]].mod.id : null;
    $("#sideModules").innerHTML = MODS.map(function (m) {
      var p = modProgress(m);
      return "<button class='side-mod" + (activeMod === m.id ? " active" : "") + "' data-go='#/m/" + m.id + "' title='" + esc(m.title) + "'><span class='num'>" + m.num + "</span><span>" + m.icon + " " + esc(shortTitle(m.title)) + "</span><span class='mini-bar'><i style='width:" + Math.round(p.p * 100) + "%'></i></span></button>";
    }).join("");
    var rk = rank();
    $("#rankIco").textContent = rk.r.ico;
    $("#rankName").textContent = rk.r.name;
    $("#rankSub").textContent = rk.x + " XP · Rango " + rk.lvl + (rk.next ? " · faltan " + (rk.next.xp - rk.x) : " · máximo");
    $("#rankBar").style.width = Math.round(rk.p * 100) + "%";
    var pct = totalPct();
    $("#ringFg").style.strokeDashoffset = 119.38 * (1 - pct / 100);
    $("#ringTxt").textContent = pct + "%";
    $("#streakVal").textContent = streak();
  }
  function shortTitle(t) { return t.split(":")[0].split(",")[0]; }

  /* ---------------- Router ---------------- */
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var q = ""; var qi = h.indexOf("?"); if (qi >= 0) { q = h.slice(qi + 1); h = h.slice(0, qi); }
    var params = {}; q.split("&").forEach(function (kv) { if (!kv) return; var p = kv.split("="); params[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ""); });
    return { parts: h.split("/").filter(Boolean), q: params };
  }
  var view = $("#view"), rendered = false;
  function render() {
    var r = route(), p = r.parts, html;
    closeSidebar();
    switch (p[0] || "") {
      case "": html = vHome(); break;
      case "ruta": html = vRoute(); break;
      case "m": html = MBY[p[1]] ? vModule(MBY[p[1]]) : vNotFound(); break;
      case "l": html = LBY[p[1]] ? vLesson(LBY[p[1]]) : vNotFound(); break;
      case "reto": html = vSprint(); break;
      case "arsenal": html = vArsenal(r.q); break;
      case "amenazas": html = vThreats(); break;
      case "labs": html = vLabs(p[1] || "pass"); break;
      case "glosario": html = vGlossary(); break;
      case "progreso": html = vProgress(); break;
      case "repaso": html = vReview(); break;
      case "examen": html = vExam(); break;
      case "certificado": html = vCert(); break;
      case "cobertura": html = vCoverage(); break;
      default: html = vNotFound();
    }
    view.classList.remove("view-enter"); void view.offsetWidth;
    view.innerHTML = html + "<div class='footer-note'>BASTIÓN ACADEMY · 100% local · tus datos nunca salen de este navegador</div>";
    view.classList.add("view-enter");
    window.scrollTo(0, 0);
    if (rendered) sfx.nav();
    rendered = true;
    chrome();
    afterRender(p);
  }
  addEventListener("hashchange", render);

  /* ---------------- Post-render: animaciones ---------------- */
  var io;
  function afterRender(p) {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .08 });
    $$(".reveal").forEach(function (el, i) { el.style.transitionDelay = Math.min(i % 8, 7) * 55 + "ms"; io.observe(el); });
    $$("[data-count]").forEach(countUp);
    $$("[data-w]").forEach(function (el) { requestAnimationFrame(function () { setTimeout(function () { el.style.width = el.dataset.w; }, 120); }); });
    if (p[0] === "" || !p[0]) typed();
    if (p[0] === "l") lessonHooks(LBY[p[1]]);
    if (p[0] === "labs") labHooks(p[1] || "pass");
    if (p[0] === "arsenal") arsenalHooks();
    if (p[0] === "glosario") glossaryHooks();
    if (p[0] === "repaso") drawCard();
    if (p[0] === "examen") drawExam();
    tiltInit();
  }
  function tiltInit() {
    return; // Diseño sobrio: sin inclinación 3D
    /* eslint-disable no-unreachable */
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    $$(".mod-card, .tool-card, .level-node, .stat, .badge, .news-card").forEach(function (el) {
      if (el._tilt) return; el._tilt = 1; el.classList.add("tilt");
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = "perspective(900px) rotateX(" + (-y * 7).toFixed(2) + "deg) rotateY(" + (x * 9).toFixed(2) + "deg) translateY(-4px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }
  function countUp(el) {
    var to = parseFloat(el.dataset.count), suf = el.dataset.suf || "", t0 = null, dur = 1100;
    function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e) + suf; if (k < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var typedTimer;
  function typed() {
    var el = $("#typed"); if (!el) return;
    var lines = ["> inicializando protocolo de soberanía digital…", "> cifrando identidades en 4 capas…", "> bloqueando telemetría y rastreadores…", "> neutralizando phishing y deepfakes con IA…", "> levantando los muros de tu bastión…"];
    var li = 0, ci = 0, del = false;
    clearTimeout(typedTimer);
    (function tick() {
      if (!document.body.contains(el)) return;
      var s = lines[li];
      el.textContent = s.slice(0, ci);
      if (!del && ci < s.length) { ci++; typedTimer = setTimeout(tick, 32); }
      else if (!del) { del = true; typedTimer = setTimeout(tick, 1600); }
      else if (ci > 0) { ci -= 2; if (ci < 0) ci = 0; typedTimer = setTimeout(tick, 14); }
      else { del = false; li = (li + 1) % lines.length; typedTimer = setTimeout(tick, 250); }
    })();
  }
  document.addEventListener("mousemove", function (e) {
    var el = e.target.closest && e.target.closest(".spot"); if (!el) return;
    var r = el.getBoundingClientRect(); el.style.setProperty("--x", (e.clientX - r.left) + "px"); el.style.setProperty("--y", (e.clientY - r.top) + "px");
  });

  /* ---------------- Componentes HTML ---------------- */
  function bar(p, color) { return "<div class='progress'><i data-w='" + Math.round(p * 100) + "%' style='width:0;" + (color ? "background:" + color : "") + "'></i></div>"; }
  function modCard(m) {
    var p = modProgress(m), c = COLORS[m.color];
    return "<div class='glass mod-card hover-lift spot reveal" + (p.p === 1 ? " done" : "") + "' data-go='#/m/" + m.id + "'>" +
      (p.p === 1 ? "<span class='tag em check-badge'>✓ Completado</span>" : "") +
      "<div class='mtop'><div class='micon' style='border-color:" + c + "55;box-shadow:0 0 24px -8px " + c + "'>" + m.icon + "</div>" + (p.p === 1 ? "" : "<span class='tag' style='color:" + c + ";border-color:" + c + "55'>Nivel " + m.level + "</span>") + "</div>" +
      "<div class='mono' style='font-size:11px;color:" + c + ";letter-spacing:1.5px'>MÓDULO " + m.num + "</div>" +
      "<h3>" + esc(m.title) + "</h3><p>" + esc(m.summary) + "</p>" +
      "<div class='mfoot'><span>" + m.lessons.length + " lecciones · " + m.lessons.reduce(function (a, l) { return a + l.min; }, 0) + " min</span><span>" + p.d + "/" + p.t + "</span></div>" + bar(p.p, c) + "</div>";
  }
  function sectionHead(eyebrow, title, sub, right) {
    return "<div class='section-head reveal'><div><div class='eyebrow'>" + eyebrow + "</div><h2>" + title + "</h2>" + (sub ? "<p>" + sub + "</p>" : "") + "</div>" + (right || "") + "</div>";
  }
  function nextLesson() {
    if (S.last && LBY[S.last] && !S.lessons[S.last]) return LBY[S.last];
    for (var i = 0; i < ALL.length; i++) if (!S.lessons[ALL[i].id]) return ALL[i];
    return null;
  }

  /* ---------------- VISTA: Inicio ---------------- */
  function vHome() {
    var nl = nextLesson(), rk = rank(), totalMin = ALL.reduce(function (a, l) { return a + l.min; }, 0);
    var h = "";
    h += "<section class='glass hero reveal'><div class='hero-grid'><div>" +
      "<div class='typed' id='typed'></div>" +
      "<h1>De usuario expuesto a <span class='grad-text'>soberano digital</span></h1>" +
      "<p class='lead'>La academia unificada de privacidad, OPSEC y soberanía digital para la era de la IA masiva. " + MODS.length + " módulos, " + ALL.length + " lecciones prácticas, " + T.arsenal.length + " herramientas, laboratorios interactivos y un reto de 30 días. Todo local, todo tuyo.</p>" +
      "<div class='row mt24'>" +
      (nl ? "<button class='btn btn-primary' data-go='#/l/" + nl.id + "'>" + (lessonsDone() ? "▶ Continuar: " + esc(nl.title.slice(0, 38)) + (nl.title.length > 38 ? "…" : "") : "▶ Empezar el Módulo 00") + "</button>" : "<button class='btn btn-primary' data-go='#/progreso'>🏆 Ver mi certificado de rango</button>") +
      "<button class='btn btn-ghost' data-go='#/reto'>⚡ Reto 30 días</button>" +
      "<button class='btn btn-gold' data-go='#/labs/audit'>📊 Auditar mi exposición</button>" +
      "</div></div><div class='emblem'><div class='orbit'></div><div class='orbit o2'></div><div class='piece'><span>B</span></div></div></div></section>";

    var dx = dailyXp(), dp = Math.min(1, dx / DAILY_GOAL), due = dueCards().length;
    var nextDay = T.sprint.filter(function (d) { return !S.sprint[d.d]; })[0];
    var hr = new Date().getHours(), greet = hr < 12 ? "Buenos días" : hr < 19 ? "Buenas tardes" : "Buenas noches";
    h += "<section class='glass mission reveal mt24'><div class='mission-head'><div><div class='eyebrow'>Misión de hoy</div><h2>" + greet + (S.prefs.name ? ", " + esc(S.prefs.name) : "") + " 👋</h2><p class='muted'>" + (dp >= 1 ? "Meta diaria cumplida. Cada día suma: vuelve mañana para mantener la racha." : "Completa tu meta de " + DAILY_GOAL + " XP para mantener la racha de " + streak() + " día" + (streak() === 1 ? "" : "s") + ".") + "</p></div>" +
      "<div class='goal-ring'>" + gaugeSVG(dp, dp >= 1 ? "#00f5a0" : "#a78bfa") + "<div class='gv'><div><b>" + dx + "</b><span>/ " + DAILY_GOAL + " XP</span></div></div></div></div>" +
      "<div class='grid g3 mt16'>" +
      (nl ? missionItem("📘", "Siguiente lección", nl.title, "Módulo " + nl.mod.num + " · " + nl.min + " min · +100 XP", "#/l/" + nl.id) : missionItem("🏆", "Programa completo", "Has terminado todas las lecciones", "Prueba el examen final", "#/examen")) +
      missionItem("🃏", "Repaso espaciado", due ? due + " tarjetas pendientes" : "Todo repasado por hoy", "Fija lo aprendido · +10 XP por tarjeta dominada", "#/repaso") +
      (nextDay ? missionItem("⚡", "Reto · Día " + nextDay.d, nextDay.t, nextDay.desc, "#/l/" + nextDay.l) : missionItem("🎓", "Certificación", "Examen final", "30 preguntas · aprobado con 80%", "#/examen")) +
      "</div></section>";

    h += "<div class='grid g4 mt24'>" +
      statCard("Lecciones", lessonsDone(), "/" + ALL.length, lessonsDone() / ALL.length, "#00f5a0", Math.round(totalMin / 60) + " h de contenido") +
      statCard("Progreso total", totalPct(), "%", totalPct() / 100, "#22d3ee", modsDone() + " módulos completos") +
      statCard("Reto 30 días", sprintDone(), "/30", sprintDone() / 30, "#fbbf24", "20 min al día") +
      statCard("XP · " + rk.r.name, rk.x, "", rk.p, "#a78bfa", rk.next ? "Siguiente: " + rk.next.name : "Rango máximo") + "</div>";

    h += sectionHead("La ruta", "5 niveles para levantar tu bastión", "Cada nivel es un muro más: de los cimientos a la fortaleza completa.");
    h += "<div class='levels'>" + T.levels.map(function (lv) {
      var p = levelProgress(lv.n);
      return "<div class='glass level-node hover-lift reveal' data-go='#/ruta?lv=" + lv.n + "'><div class='lv' style='color:" + lv.color + "'>" + lv.ico + " NIVEL " + lv.n + "</div><h4>" + lv.name + "</h4><p>" + lv.d + "</p><div class='lbar'><i data-w='" + Math.round(p * 100) + "%' style='width:0;background:" + lv.color + "'></i></div></div>";
    }).join("") + "</div>";

    h += sectionHead("El método", "Entiende · Blinda · Limpia · Domina", "La filosofía Bastión: cero paranoia, máxima intención. Ajustes de 'hacer una vez y olvidar' que dan el 80% de la protección.");
    var phases = [
      ["01 · ENTIENDE", "#00f5a0", "Mentalidad y modelo de amenazas", "Identificadores, LINDDUN y compartimentación en 4 capas: Bóveda, Avatar, Laboratorio IA y Fantasma.", "m01"],
      ["02 · BLINDA", "#22d3ee", "Navegador, red, cuentas y dispositivos", "Brave endurecido, DNS cifrado, VPN post-cuántica, passkeys, cifrado de disco y móvil blindado.", "m02"],
      ["03 · LIMPIA", "#a78bfa", "Identidad invisible y limpieza digital", "Alias infinitos, mensajería sin metadatos, antifraude con IA, data brokers y derechos legales.", "m06"],
      ["04 · DOMINA", "#fbbf24", "OSINT, IA soberana y patrimonio", "IA local, seguridad de agentes, biometría, Bitcoin en autocustodia, self-hosting y herencia.", "m09"]
    ];
    h += "<div class='grid g4'>" + phases.map(function (f) {
      return "<div class='glass card hover-lift spot reveal' style='border-top:2px solid " + f[1] + ";cursor:pointer' data-go='#/m/" + f[4] + "'><div class='mono' style='font-size:11px;color:" + f[1] + ";letter-spacing:1.5px'>" + f[0] + "</div><h3 style='margin:8px 0 6px;font-size:16px'>" + f[2] + "</h3><p class='muted' style='margin:0;font-size:13px'>" + f[3] + "</p></div>";
    }).join("") + "</div>";

    h += sectionHead("Novedades 2026", "Lo que casi ningún curso te enseña", "Temas de actualidad en la era de la IA masiva integrados en el programa.", "<button class='btn btn-ghost btn-sm' data-go='#/amenazas'>Ver radar completo →</button>");
    var news = [["🧠", "Agentes IA y MCP", "Prompt injection, tool poisoning y la tríada letal.", "m11"], ["🗣️", "Voz y rostro clonados", "Protocolo Santo y Seña y desafíos anti-deepfake.", "m12"], ["⚛️", "Cripto post-cuántica", "ML-KEM y DAITA contra 'cosechar ahora, descifrar después'.", "m03"], ["🤖", "IA 100% local", "Ollama, LM Studio, RAG privado y anonimización PII.", "m10"], ["🦠", "Infostealers y ClickFix", "Robo de cookies que salta el 2FA y falsos CAPTCHA.", "m07"], ["👁️", "IA que mira tu pantalla", "Recall, Apple Intelligence y escaneo en el dispositivo.", "m05"]];
    h += "<div class='grid g3'>" + news.map(function (n) {
      return "<div class='glass card hover-lift spot reveal' style='cursor:pointer' data-go='#/m/" + n[3] + "'><div style='font-size:28px'>" + n[0] + "</div><h3 style='margin:10px 0 4px;font-size:16px'>" + n[1] + "</h3><p class='muted' style='margin:0;font-size:13px'>" + n[2] + "</p><div class='mono mt8' style='font-size:11px;color:var(--em)'>MÓDULO " + MBY[n[3]].num + " →</div></div>";
    }).join("") + "</div>";

    h += sectionHead("Mapa curricular", "Los " + MODS.length + " módulos del programa", "Haz clic en cualquier módulo para estudiarlo.", "<button class='btn btn-ghost btn-sm' data-go='#/ruta'>Ver por niveles →</button>");
    h += "<div class='grid g3'>" + MODS.map(modCard).join("") + "</div>";
    return h;
  }
  function missionItem(ico, k, t, s, go) {
    return "<div class='mission-item' data-go='" + go + "'><div class='mi-ico'>" + ico + "</div><div style='min-width:0'><div class='mi-k'>" + k + "</div><div class='mi-t'>" + esc(t) + "</div><div class='mi-s'>" + esc(s) + "</div></div><span class='arrow'>→</span></div>";
  }
  function statCard(k, v, suf, p, color, s) {
    return "<div class='glass stat reveal'><div class='k'>" + k + "</div><div class='v' style='color:" + color + "'><span data-count='" + v + "'>0</span><span style='font-size:16px;color:var(--muted)'>" + suf + "</span></div><div class='s'>" + s + "</div><div class='bar'><i data-w='" + Math.round(p * 100) + "%' style='width:0;background:" + color + ";box-shadow:0 0 10px " + color + "'></i></div></div>";
  }

  /* ---------------- VISTA: Programa ---------------- */
  function vRoute() {
    var lvq = parseInt(route().q.lv || "0", 10);
    var h = "<div class='reveal'><div class='eyebrow'>Programa maestro unificado</div><h1 style='font-size:clamp(26px,3.4vw,40px);margin:8px 0;letter-spacing:-1px'>Fundamentos + Blindaje total + <span class='grad-text'>Era IA 2026</span></h1><p class='muted' style='max-width:760px'>" + MODS.length + " módulos, " + ALL.length + " lecciones y " + MODS.reduce(function (a, m) { return a + m.quiz.length; }, 0) + " preguntas de evaluación organizadas en 5 niveles. Puedes seguir el orden o saltar al módulo que necesites.</p></div>";
    h += "<div class='filters mt16 reveal'>" + "<button class='chip" + (!lvq ? " on" : "") + "' data-go='#/ruta'>Todos</button>" + T.levels.map(function (lv) { return "<button class='chip" + (lvq === lv.n ? " on" : "") + "' data-go='#/ruta?lv=" + lv.n + "'>" + lv.ico + " Nivel " + lv.n + " · " + lv.name + "</button>"; }).join("") + "</div>";
    T.levels.forEach(function (lv) {
      if (lvq && lvq !== lv.n) return;
      var ms = MODS.filter(function (m) { return m.level === lv.n; });
      h += sectionHead("<span style='color:" + lv.color + "'>" + lv.ico + " Nivel " + lv.n + "</span>", lv.name, lv.d, "<span class='tag' style='color:" + lv.color + "'>" + Math.round(levelProgress(lv.n) * 100) + "% completado</span>");
      h += "<div class='grid g3'>" + ms.map(modCard).join("") + "</div>";
    });
    return h;
  }

  /* ---------------- VISTA: Módulo ---------------- */
  function vModule(m) {
    var p = modProgress(m), c = COLORS[m.color], lv = T.levels[m.level - 1];
    var first = m.lessons.filter(function (l) { return !S.lessons[l.id]; })[0] || m.lessons[0];
    var i = MODS.indexOf(m), prev = MODS[i - 1], next = MODS[i + 1];
    var h = "<div class='crumbs reveal'><a href='#/ruta'>Programa</a> › <span>Nivel " + m.level + " · " + lv.name + "</span> › <span style='color:" + c + "'>Módulo " + m.num + "</span></div>";
    h += "<section class='glass mod-hero mt16 reveal' style='border-color:" + c + "40'><div class='big-ico'>" + m.icon + "</div>" +
      "<div class='row'><span class='tag' style='color:" + c + ";border-color:" + c + "55'>MÓDULO " + m.num + "</span><span class='tag'>" + lv.ico + " Nivel " + m.level + " · " + lv.name + "</span><span class='tag'>⏱ " + m.lessons.reduce(function (a, l) { return a + l.min; }, 0) + " min</span></div>" +
      "<h1>" + esc(m.title) + "</h1><p class='muted' style='margin:0 0 6px;font-size:14px'>" + esc(m.subtitle) + "</p><p style='color:#cdd5e2;max-width:780px'>" + esc(m.summary) + "</p>" +
      "<div class='grid g2 mt16' style='max-width:780px'>" + m.outcomes.map(function (o) { return "<div class='row' style='gap:8px;font-size:13.5px'><span style='color:" + c + "'>✦</span>" + esc(o) + "</div>"; }).join("") + "</div>" +
      "<div class='row mt24' style='max-width:560px'><div style='flex:1'>" + bar(p.p, c) + "</div><span class='mono' style='font-size:12px'>" + p.d + "/" + p.t + " lecciones</span></div>" +
      "<div class='row mt16'><button class='btn btn-primary' data-go='#/l/" + first.id + "'>" + (p.d ? (p.p === 1 ? "↻ Repasar módulo" : "▶ Continuar") : "▶ Empezar módulo") + "</button><button class='btn btn-ghost' data-act='scrollQuiz'>🧠 Ir al examen</button></div></section>";
    h += sectionHead("Lecciones", m.lessons.length + " lecciones prácticas", "Cada una con teoría, pasos marcables, comandos y la nota del profesor.");
    h += "<div class='grid' style='gap:12px'>" + m.lessons.map(function (l, k) {
      var done = S.lessons[l.id], st = l.steps.filter(function (_, si) { return S.steps[l.id + ":" + si]; }).length;
      return "<div class='lesson-row reveal" + (done ? " done" : "") + "' data-go='#/l/" + l.id + "'><div class='lnum'>" + (done ? "✓" : m.num + "." + (k + 1)) + "</div><div><h4>" + esc(l.title) + "</h4><div class='lmeta'>⏱ " + l.min + " min · " + st + "/" + l.steps.length + " pasos" + (l.tools && l.tools.length ? " · " + l.tools.slice(0, 3).map(esc).join(", ") : "") + "</div></div><span class='arrow'>→</span></div>";
    }).join("") + "</div>";
    var refs = (T.refs && T.refs[m.id]) || [];
    if (refs.length) {
      h += sectionHead("Para profundizar", "Fuentes oficiales y de referencia", "Documentación primaria para ir más allá de la lección. Se abren en una pestaña nueva.");
      h += "<div class='grid g2'>" + refs.map(function (r) { return "<a class='glass ref-card reveal' href='" + esc(r[1]) + "' target='_blank' rel='noopener noreferrer'><span class='ref-ico'>🔗</span><span style='min-width:0'><b>" + esc(r[0]) + "</b><small>" + esc(r[1].replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</small></span><span class='arrow'>↗</span></a>"; }).join("") + "</div>";
    }
    h += "<div id='quizAnchor'></div>" + sectionHead("Evaluación", "Examen del módulo " + m.num, "Aprueba con 70% o más para ganar 150 XP. Puedes repetirlo.");
    h += "<div class='glass card reveal' id='quizBox'>" + quizHTML(m) + "</div>";
    h += "<div class='lesson-nav'>" + (prev ? "<button class='btn btn-ghost' data-go='#/m/" + prev.id + "'>← " + prev.num + " · " + esc(shortTitle(prev.title)) + "</button>" : "<span></span>") + (next ? "<button class='btn btn-ghost' data-go='#/m/" + next.id + "'>" + next.num + " · " + esc(shortTitle(next.title)) + " →</button>" : "") + "</div>";
    return h;
  }
  var quizRun = {};
  function quizHTML(m) {
    var run = quizRun[m.id] || (quizRun[m.id] = {});
    var best = S.quizzes[m.id] ? S.quizzes[m.id].best : null;
    var answered = Object.keys(run).length, ok = Object.keys(run).filter(function (k) { return run[k] === m.quiz[k].a; }).length;
    var h = "<div class='row between'><div class='mono muted' style='font-size:12px'>" + answered + "/" + m.quiz.length + " respondidas" + (best !== null ? " · mejor nota: <b style='color:" + (best >= .7 ? "var(--em)" : "var(--go)") + "'>" + Math.round(best * 100) + "%</b>" : "") + "</div>" + (answered ? "<button class='btn btn-ghost btn-sm' data-act='quizReset' data-m='" + m.id + "'>↻ Reintentar</button>" : "") + "</div>";
    m.quiz.forEach(function (q, qi) {
      var a = run[qi];
      h += "<div class='quiz-q" + (a !== undefined ? " answered" : "") + "'><h4>" + (qi + 1) + ". " + esc(q.q) + "</h4>" + q.o.map(function (o, oi) {
        var cls = a === undefined ? "" : (oi === q.a ? " ok" : (oi === a ? " bad" : ""));
        return "<button class='quiz-opt" + cls + "' data-act='quiz' data-m='" + m.id + "' data-q='" + qi + "' data-o='" + oi + "'" + (a !== undefined ? " disabled" : "") + ">" + String.fromCharCode(65 + oi) + ") " + esc(o) + "</button>";
      }).join("") + "<div class='quiz-exp'>" + (a === q.a ? "✅ <b style='color:var(--em)'>Correcto.</b> " : "❌ <b style='color:var(--ro)'>No exactamente.</b> ") + esc(q.e) + "</div></div>";
    });
    if (answered === m.quiz.length) {
      var sc = ok / m.quiz.length;
      h += "<div class='callout " + (sc >= .7 ? "tip" : "warn") + " mt16'><span class='ci'>" + (sc >= .7 ? "🏅" : "📘") + "</span><div><b>Resultado: " + ok + "/" + m.quiz.length + " (" + Math.round(sc * 100) + "%)</b>. " + (sc >= .7 ? "¡Módulo superado! Has ganado XP." : "Repasa las lecciones y vuelve a intentarlo.") + "</div></div>";
    }
    return h;
  }

  /* ---------------- VISTA: Lección ---------------- */
  function vLesson(l) {
    var m = l.mod, c = COLORS[m.color], prev = ALL[l.g - 1], next = ALL[l.g + 1], done = S.lessons[l.id];
    var st = l.steps.filter(function (_, i) { return S.steps[l.id + ":" + i]; }).length;
    S.last = l.id; save();
    var secs = [["sec-obj", "🎯 Objetivos"], ["sec-theory", "📖 El porqué"], ["sec-steps", "🛠 Paso a paso"]];
    if (l.code) secs.push(["sec-code", "⌨️ Comandos"]);
    if (l.pitfalls && l.pitfalls.length) secs.push(["sec-pit", "⚠️ Errores comunes"]);
    secs.push(["sec-prof", "🎓 Nota del profe"]);
    if (l.tools && l.tools.length) secs.push(["sec-tools", "🧰 Herramientas"]);
    secs.push(["sec-notes", "📝 Mis notas"]);

    var h = "<div class='lesson-layout'><div>";
    h += "<div class='crumbs'><a href='#/ruta'>Programa</a> › <a href='#/m/" + m.id + "' style='color:" + c + "'>" + m.icon + " Módulo " + m.num + "</a> › <span>Lección " + (l.idx + 1) + "/" + m.lessons.length + "</span></div>";
    h += "<h1 class='lesson-title'>" + esc(l.title) + "</h1>";
    h += "<div class='row'><span class='tag' style='color:" + c + ";border-color:" + c + "55'>" + m.num + "." + (l.idx + 1) + "</span><span class='tag'>⏱ " + l.min + " min</span><span class='tag' id='stepCount'>" + st + "/" + l.steps.length + " pasos</span>" + (done ? "<span class='tag em'>✓ Completada</span>" : "") + "</div>";

    h += "<section id='sec-obj' class='glass block reveal'><h2><span class='bi'>🎯</span>Al terminar sabrás…</h2><div class='objectives'>" + l.objectives.map(function (o) { return "<div>" + esc(o) + "</div>"; }).join("") + "</div></section>";
    h += "<section id='sec-theory' class='glass block reveal'><h2><span class='bi'>📖</span>El porqué (estrategia)</h2><div class='prose'>" + l.theory + "</div></section>";
    h += "<section id='sec-steps' class='glass block reveal'><div class='row between'><h2 style='margin:0'><span class='bi'>🛠</span>Paso a paso</h2><span class='mono muted' style='font-size:12px'>Haz clic para marcar</span></div><div class='mt8' id='stepBar'>" + bar(st / l.steps.length) + "</div><div class='steps mt16'>" +
      l.steps.map(function (s, i) { var on = S.steps[l.id + ":" + i]; return "<div class='step" + (on ? " on" : "") + "' data-act='step' data-l='" + l.id + "' data-i='" + i + "'><div class='sbox'>" + (on ? "✓" : i + 1) + "</div><div class='stxt'>" + s + "</div></div>"; }).join("") + "</div></section>";
    if (l.code) h += "<section id='sec-code' class='glass block reveal'><h2><span class='bi'>⌨️</span>Comandos y plantillas</h2>" + codeBox(l.code.title, l.code.body) + "</section>";
    if (l.pitfalls && l.pitfalls.length) h += "<section id='sec-pit' class='glass block reveal'><h2><span class='bi'>⚠️</span>Errores comunes</h2>" + l.pitfalls.map(function (p) { return "<div class='callout danger'><span class='ci'>✗</span><div>" + esc(p) + "</div></div>"; }).join("") + "</section>";
    h += "<section id='sec-prof' class='glass block reveal'><h2><span class='bi'>🎓</span>Así te lo enseño yo</h2><div class='callout prof'><span class='ci'>🎓</span><div>" + esc(l.prof) + "</div></div></section>";
    if (l.tools && l.tools.length) h += "<section id='sec-tools' class='glass block reveal'><h2><span class='bi'>🧰</span>Herramientas de esta lección</h2><div>" + l.tools.map(function (t) { var tf = toolFind(t); return "<span class='tool-chip' data-go='#/arsenal?q=" + encodeURIComponent(t) + "'>" + (tf ? "🔧" : "🔎") + " " + esc(t) + "</span>"; }).join("") + "</div></section>";
    h += "<section id='sec-notes' class='glass block reveal'><h2><span class='bi'>📝</span>Mis notas</h2><textarea class='notes' id='notes' placeholder='Escribe aquí tus conclusiones, configuraciones aplicadas o dudas. Se guarda automáticamente en tu navegador.'>" + esc(S.notes[l.id] || "") + "</textarea><div class='mono muted mt8' style='font-size:11px' id='noteState'>Guardado local automático</div></section>";

    h += "<div class='glass complete-bar' id='completeBar'>" + completeBarHTML(l) + "</div>";
    h += "<div class='lesson-nav'>" + (prev ? "<button class='btn btn-ghost' data-go='#/l/" + prev.id + "'>← " + esc(prev.title.slice(0, 40)) + (prev.title.length > 40 ? "…" : "") + "</button>" : "<span></span>") + (next ? "<button class='btn btn-ghost' data-go='#/l/" + next.id + "'>" + esc(next.title.slice(0, 40)) + (next.title.length > 40 ? "…" : "") + " →</button>" : "<button class='btn btn-gold' data-go='#/progreso'>🏆 Ver mi progreso</button>") + "</div>";
    h += "</div><aside class='glass lesson-toc'><div class='mono muted' style='font-size:11px;letter-spacing:1.5px;margin-bottom:8px'>EN ESTA LECCIÓN</div>" + secs.map(function (s) { return "<a href='javascript:void(0)' data-act='toc' data-t='" + s[0] + "' data-sec='" + s[0] + "'>" + s[1] + "</a>"; }).join("") +
      "<div style='border-top:1px solid var(--line);margin:14px 0 10px'></div><div class='mono muted' style='font-size:11px;letter-spacing:1.5px;margin-bottom:6px'>MÓDULO " + m.num + "</div>" +
      m.lessons.map(function (x, k) { return "<a href='#/l/" + x.id + "' style='" + (x.id === l.id ? "color:" + c + ";" : "") + "font-size:12px'>" + (S.lessons[x.id] ? "✓ " : (k + 1) + ". ") + esc(x.title.slice(0, 44)) + (x.title.length > 44 ? "…" : "") + "</a>"; }).join("") + "</aside></div>";
    return h;
  }
  function completeBarHTML(l) {
    var done = S.lessons[l.id];
    return "<div><div style='font-weight:700;font-size:16px'>" + (done ? "✅ Lección completada" : "¿Terminaste la lección?") + "</div><div class='muted' style='font-size:13px'>" + (done ? "Ganaste 100 XP. Puedes desmarcarla si quieres repasarla." : "Márcala como completada para ganar 100 XP y avanzar en tu rango.") + "</div></div>" +
      "<button class='btn " + (done ? "btn-ghost" : "btn-primary") + "' data-act='lesson' data-l='" + l.id + "'>" + (done ? "↺ Marcar como pendiente" : "✓ Marcar como completada") + "</button>";
  }
  function codeBox(title, body) {
    return "<div class='codebox'><div class='cb-head'><div class='row' style='gap:10px'><span class='dots'><i style='background:#fb7185'></i><i style='background:#fbbf24'></i><i style='background:#00f5a0'></i></span><span>" + esc(title) + "</span></div><button class='copy-btn' data-act='copyCode'>Copiar</button></div><pre>" + esc(body) + "</pre></div>";
  }
  var spyObs;
  function lessonHooks(l) {
    var ta = $("#notes");
    if (ta) ta.addEventListener("input", debounce(function () { S.notes[l.id] = ta.value; save(); $("#noteState").textContent = "✓ Guardado " + new Date().toLocaleTimeString(); }, 400));
    if (spyObs) spyObs.disconnect();
    spyObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { $$(".lesson-toc a[data-sec]").forEach(function (a) { a.classList.toggle("on", a.dataset.sec === e.target.id); }); } });
    }, { rootMargin: "-30% 0px -60% 0px" });
    $$("section[id^='sec-']").forEach(function (s) { spyObs.observe(s); });
  }
  addEventListener("scroll", function () {
    var bar = $("#readProgress i"); if (!bar) return;
    if (route().parts[0] !== "l") { bar.style.width = "0"; return; }
    var max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + "%";
  }, { passive: true });

  /* ---------------- VISTA: Reto 30 días ---------------- */
  function vSprint() {
    var n = sprintDone();
    var h = "<section class='glass hero reveal' style='padding:34px'><div class='row between'><div style='max-width:640px'><span class='tag go'>Plan exprés · 20 minutos al día</span><h1 style='font-size:clamp(26px,3.4vw,40px)'>Reto de <span class='gold-text'>30 días</span></h1><p class='lead'>Un ajuste por día, en el orden que más protección te da por minuto invertido. Cada día enlaza a la lección exacta. Marca el día cuando lo apliques en tus dispositivos.</p></div>" +
      "<div class='gauge'>" + gaugeSVG(n / 30, "#fbbf24") + "<div class='gv'><div><b class='gold-text' data-count='" + n + "'>0</b><span>DE 30 DÍAS</span></div></div></div></div></section>";
    h += "<div class='sprint-grid mt24'>";
    var weeks = ["Semana 1 · Cuentas blindadas", "Semana 2 · Navegador y red", "Semana 3 · Dispositivos e identidad", "Semana 4 · Antifraude y limpieza", "Cierre · IA, dinero y herencia"];
    T.sprint.forEach(function (d, i) {
      if (i % 7 === 0) h += "<div class='week-label'>" + weeks[Math.floor(i / 7)] + "</div>";
      var on = S.sprint[d.d];
      h += "<div class='glass day reveal" + (on ? " on" : "") + "' data-act='day' data-d='" + d.d + "'><span class='dcheck'>" + (on ? "✓" : "") + "</span><div class='dnum'>DÍA " + pad(d.d) + "</div><h4>" + esc(d.t) + "</h4><p>" + esc(d.desc) + "</p><button class='btn btn-ghost btn-sm mt16' data-go='#/l/" + d.l + "'>Abrir lección →</button></div>";
    });
    return h + "</div>";
  }
  function gaugeSVG(p, color) {
    var r = 74, C = 2 * Math.PI * r;
    return "<svg width='170' height='170' viewBox='0 0 170 170'><circle cx='85' cy='85' r='" + r + "' fill='none' stroke='rgba(255,255,255,.07)' stroke-width='10'/><circle cx='85' cy='85' r='" + r + "' fill='none' stroke='" + color + "' stroke-width='10' stroke-linecap='round' stroke-dasharray='" + C.toFixed(1) + "' stroke-dashoffset='" + (C * (1 - p)).toFixed(1) + "' style='transition:stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1);filter:drop-shadow(0 0 8px " + color + ")'/></svg>";
  }

  /* ---------------- VISTA: Arsenal ---------------- */
  var arsCat = "Todas";
  function vArsenal(q) {
    var h = "<div class='reveal'><div class='eyebrow'>Arsenal Bastión</div><h1 style='font-size:clamp(26px,3.4vw,40px);margin:8px 0;letter-spacing:-1px'>" + T.arsenal.length + " herramientas que <span class='grad-text'>reemplazan</span> a las que te espían</h1><p class='muted'>Criterio: código abierto, cifrado de extremo a extremo o conocimiento cero, auditorías y modelo de negocio claro. Cada ficha indica qué sustituye y en qué módulo se enseña.</p></div>";
    h += "<div class='glass card mt16 reveal'><input class='input' id='arsQ' placeholder='🔎 Buscar herramienta, categoría o qué reemplaza (ej. Gmail, VPN, Android)…' value='" + esc(q.q || "") + "'/><div class='filters mt16' id='arsCats'>" + ["Todas"].concat(T.arsenalCats).map(function (c) { return "<button class='chip" + (c === arsCat ? " on" : "") + "' data-act='arsCat' data-c='" + esc(c) + "'>" + esc(c) + "</button>"; }).join("") + "</div></div>";
    h += "<div class='mono muted mt16' id='arsCount' style='font-size:12px'></div><div class='grid g3 mt16' id='arsGrid'></div>";
    return h;
  }
  function arsenalHooks() {
    var inp = $("#arsQ");
    inp.addEventListener("input", debounce(drawArsenal, 120));
    drawArsenal();
    if (inp.value) { inp.focus(); }
  }
  function drawArsenal() {
    var q = norm($("#arsQ").value);
    var list = T.arsenal.filter(function (t) {
      if (arsCat !== "Todas" && t.cat !== arsCat) return false;
      return !q || norm(t.n + " " + t.cat + " " + t.rep + " " + t.d + " " + t.os + " " + t.os_tag).indexOf(q) >= 0;
    });
    $("#arsCount").textContent = list.length + " herramienta" + (list.length === 1 ? "" : "s");
    $("#arsGrid").innerHTML = list.length ? list.map(function (t, i) {
      var m = MBY[t.mod];
      return "<div class='glass tool-card hover-lift spot' style='animation:viewIn .5s " + Math.min(i, 12) * 35 + "ms both'><div class='row between'><h4>" + esc(t.n) + "</h4><span class='tag em'>" + esc(t.os_tag) + "</span></div><div class='rep'>✗ " + esc(t.rep) + " → <b>✓ " + esc(t.n) + "</b></div><p>" + esc(t.d) + "</p><div class='tmeta'><span class='tag'>" + esc(t.cat) + "</span><span class='tag cy'>" + esc(t.os) + "</span><span class='tag go'>" + esc(t.price) + "</span></div><div class='row mt8'><a class='btn btn-ghost btn-sm' href='" + esc(t.url) + "' target='_blank' rel='noopener noreferrer'>Web oficial ↗</a>" + (m ? "<button class='btn btn-ghost btn-sm' data-go='#/m/" + m.id + "'>Módulo " + m.num + "</button>" : "") + "</div></div>";
    }).join("") : "<div class='glass empty' style='grid-column:1/-1'>Sin resultados. Prueba con otra palabra.</div>";
  }

  /* ---------------- VISTA: Amenazas ---------------- */
  var sevF = "all";
  function vThreats() {
    var crit = T.threats.filter(function (t) { return t.sev === "crit"; }).length;
    var h = "<section class='glass hero reveal' style='padding:34px'><div class='row between'><div style='max-width:680px'><span class='tag ro'>● Radar activo · Octubre 2026</span><h1 style='font-size:clamp(26px,3.4vw,40px)'>Radar de amenazas <span class='grad-text'>de la era IA</span></h1><p class='lead'>Las " + T.threats.length + " amenazas que más afectan hoy a personas y familias, cómo funcionan y cómo neutralizarlas. Haz clic en cada tarjeta para ver el detalle y las lecciones que te protegen.</p></div><div class='radar'>" +
      [[30, 40], [70, 28], [52, 74], [22, 66], [80, 62]].map(function (p, i) { return "<i style='left:" + p[0] + "%;top:" + p[1] + "%;animation-delay:" + i * .6 + "s'></i>"; }).join("") + "</div></div>" +
      "<div class='row mt16'><span class='tag ro'>" + crit + " críticas</span><span class='tag go'>" + T.threats.filter(function (t) { return t.sev === "high"; }).length + " altas</span><span class='tag bl'>" + T.threats.filter(function (t) { return t.sev === "med"; }).length + " medias</span></div></section>";
    h += "<div class='filters mt24 reveal'>" + [["all", "Todas"], ["crit", "🔴 Críticas"], ["high", "🟠 Altas"], ["med", "🔵 Medias"]].map(function (f) { return "<button class='chip" + (sevF === f[0] ? " on" : "") + "' data-act='sev' data-s='" + f[0] + "'>" + f[1] + "</button>"; }).join("") + "</div>";
    h += "<div class='grid g2 mt16' id='thrGrid'>" + threatCards() + "</div>";
    return h;
  }
  function threatCards() {
    var lab = { crit: ["sev-crit", "CRÍTICA"], high: ["sev-high", "ALTA"], med: ["sev-med", "MEDIA"] };
    return T.threats.filter(function (t) { return sevF === "all" || t.sev === sevF; }).map(function (t, i) {
      return "<div class='glass threat hover-lift spot' data-act='threat' style='animation:viewIn .5s " + Math.min(i, 10) * 40 + "ms both'><div class='row between'><span style='font-size:26px'>" + t.ico + "</span><span class='sev " + lab[t.sev][0] + "'>" + lab[t.sev][1] + "</span></div><h4>" + esc(t.t) + "</h4><p class='tdesc'>" + esc(t.d) + "</p>" +
        "<div class='tmore'><h5>Cómo funciona</h5><ul>" + t.how.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><h5>Cómo te defiendes</h5><ul>" + t.def.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><h5>Lecciones que te protegen</h5><div class='row'>" + t.mods.map(function (mid) { var m = MBY[mid]; return "<button class='btn btn-ghost btn-sm' data-go='#/m/" + mid + "'>" + m.icon + " Módulo " + m.num + "</button>"; }).join("") + "</div></div>" +
        "<div class='mono mt8' style='font-size:11px;color:var(--muted)'>▾ ver detalle</div></div>";
    }).join("");
  }

  /* ---------------- VISTA: Laboratorios ---------------- */
  var LABS = [["pass", "🔑 Frase maestra"], ["strength", "💪 Fuerza de contraseña"], ["comp", "🏗️ Compartimentos"], ["safe", "🗣️ Santo y Seña"], ["audit", "📊 Auditoría"], ["threat", "🗺️ Modelo de amenazas"], ["url", "🔗 Detector de URLs"]];
  function vLabs(tab) {
    if (!LABS.some(function (x) { return x[0] === tab; })) tab = "pass";
    var h = "<div class='reveal'><div class='eyebrow'>Laboratorios interactivos</div><h1 style='font-size:clamp(26px,3.4vw,40px);margin:8px 0;letter-spacing:-1px'>Practica aquí, <span class='grad-text'>sin enviar nada a internet</span></h1><p class='muted'>Todas las herramientas funcionan dentro de tu navegador. Nada se transmite.</p></div>";
    h += "<div class='tabs mt16 reveal'>" + LABS.map(function (x) { return "<button class='tab" + (x[0] === tab ? " on" : "") + "' data-go='#/labs/" + x[0] + "'>" + x[1] + "</button>"; }).join("") + "</div>";
    h += "<div class='mt24'>" + ({ pass: labPass, strength: labStrength, comp: labComp, safe: labSafe, audit: labAudit, threat: labThreat, url: labUrl })[tab]() + "</div>";
    return h;
  }
  function labPass() {
    return "<div class='glass lab reveal'><span class='tag em'>Módulo 04 · Lección 1</span><h3>Generador de frases maestras (tipo Diceware)</h3><p>Usa el generador criptográfico de tu navegador (<code>crypto.getRandomValues</code>) sobre una lista de " + T.words.length + " palabras en español. Para tu frase maestra, usa 7 u 8 palabras.</p>" +
      "<div class='grid g3'><div><label class='lbl'>Número de palabras: <b id='pwN'>7</b></label><input type='range' id='pwLen' min='4' max='12' value='7' style='width:100%;accent-color:#00f5a0'/></div><div><label class='lbl'>Separador</label><select class='input' id='pwSep'><option value='-'>Guion  (-)</option><option value='.'>Punto  (.)</option><option value='_'>Guion bajo  (_)</option><option value=' '>Espacio</option></select></div><div><label class='lbl'>Opciones</label><div class='row'><label class='row' style='gap:6px;font-size:13px'><input type='checkbox' id='pwNum' checked/> Añadir número</label><label class='row' style='gap:6px;font-size:13px'><input type='checkbox' id='pwCap'/> Mayúscula</label></div></div></div>" +
      "<div class='output-box' id='pwOut'>Pulsa Generar</div><div class='meter'><i id='pwMeter' style='width:0'></i></div><div class='row between mt8'><span class='mono muted' style='font-size:12px' id='pwInfo'></span><div class='row'><button class='btn btn-primary' data-act='genPass'>⚡ Generar</button><button class='btn btn-ghost' data-act='copyPass'>📋 Copiar</button></div></div>" +
      "<div class='callout warn mt16'><span class='ci'>✍️</span><div>Escríbela a mano en papel. No la guardes en notas, capturas ni en la nube. Este generador no guarda nada.</div></div></div>";
  }
  function labStrength() {
    return "<div class='glass lab reveal'><span class='tag em'>Módulo 04</span><h3>Analizador de fuerza de contraseñas</h3><p>Estima la entropía y el tiempo de crackeo offline (10¹⁰ intentos/s, GPU moderna). Se calcula en local; no se guarda ni se envía. Aun así, no escribas aquí tu contraseña maestra real.</p>" +
      "<div class='row'><input class='input' id='stIn' type='password' placeholder='Escribe una contraseña de prueba…' autocomplete='off' style='flex:1'/><button class='btn btn-ghost' data-act='stShow'>👁</button></div><div class='meter'><i id='stMeter' style='width:0'></i></div><div class='grid g3 mt16'><div class='glass stat'><div class='k'>Entropía estimada</div><div class='v' id='stBits'>0</div><div class='s'>bits</div></div><div class='glass stat'><div class='k'>Tiempo de crackeo</div><div class='v' id='stTime' style='font-size:20px'>—</div><div class='s'>ataque offline</div></div><div class='glass stat'><div class='k'>Veredicto</div><div class='v' id='stVer' style='font-size:20px'>—</div><div class='s' id='stTip'></div></div></div><div id='stFlags' class='url-flags mt16'></div></div>";
  }
  function labComp() {
    var cols = [["c1", "Capa 1 · Bóveda", "#60a5fa", "Banco, impuestos, salud, gobierno"], ["c2", "Capa 2 · Avatar", "#00f5a0", "Compras, redes, suscripciones, trabajo"], ["c3", "Capa 3 · Laboratorio IA", "#a78bfa", "Chatbots, APIs, agentes, código"], ["c4", "Capa 4 · Fantasma", "#fbbf24", "Investigación, P2P, anonimato"]];
    var fields = [["nav", "Navegador / perfil"], ["mail", "Correo / alias"], ["tel", "Teléfono"], ["pay", "Pago"], ["net", "Red (VPN/Tor)"]];
    var ph = { c1: ["Brave · perfil 'Bóveda'", "Proton (correo secreto)", "SIM principal", "Cuenta búnker", "Directa + DNS cifrado"], c2: ["Brave · perfil 'Diario'", "SimpleLogin: 1 alias por web", "SIM secundaria", "Tarjeta virtual", "VPN + NextDNS"], c3: ["Firefox · perfil 'IA'", "Alias dedicados", "Ninguno", "Tarjeta virtual de límite bajo", "VPN"], c4: ["Mullvad Browser / Tor", "Cuenta creada sin datos", "Ninguno", "Efectivo / BTC autocustodia", "Mullvad (PQ+DAITA) / Tor"] };
    var v = S.labs.comp || {};
    return "<div class='glass lab reveal'><span class='tag em'>Módulo 01 · Lección 3</span><h3>Arquitecto de compartimentos (4 capas)</h3><p>Define qué herramientas usa cada capa. Regla de oro: ningún identificador se repite entre capas. Se guarda en tu navegador.</p><div class='grid g4'>" +
      cols.map(function (c) {
        return "<div class='comp-col' style='border-color:" + c[2] + "55'><div class='mono' style='font-size:11px;color:" + c[2] + ";letter-spacing:1px;font-weight:700'>" + c[1].toUpperCase() + "</div><div class='muted' style='font-size:12px;margin-top:4px'>" + c[3] + "</div>" +
          fields.map(function (f, fi) { var id = c[0] + "_" + f[0]; return "<label class='lbl'>" + f[1] + "</label><input class='input comp-in' data-k='" + id + "' value='" + esc(v[id] || "") + "' placeholder='" + esc(ph[c[0]][fi]) + "' style='font-size:13px;padding:9px 11px'/>"; }).join("") + "</div>";
      }).join("") + "</div><div class='row mt16'><button class='btn btn-primary' data-act='saveComp'>💾 Guardar arquitectura</button><button class='btn btn-ghost' data-act='fillComp'>✨ Rellenar con la recomendación</button><button class='btn btn-ghost' data-act='checkComp'>🔍 Detectar cruces</button></div><div id='compMsg' class='url-flags'></div></div>";
  }
  function labSafe() {
    var s = S.labs.safe || { reto: "", ok: "", coac: "", resp: "" };
    return "<div class='glass lab reveal'><span class='tag em'>Módulo 07 · Lección 2</span><h3>Protocolo familiar Santo y Seña</h3><p>Defensa contra clonación de voz, secuestros virtuales y coacción. Genera, ajusta y compártelo <b>en persona</b>. Nunca por chat.</p>" +
      "<div class='grid g2'><div><label class='lbl'>1 · Pregunta-reto (suena normal)</label><input class='input' id='sfReto' value='" + esc(s.reto) + "' placeholder='¿Ya regaste el cactus del balcón?'/><label class='lbl'>Respuesta pactada (no la obvia)</label><input class='input' id='sfResp' value='" + esc(s.resp) + "' placeholder='Sí, pero el cactus se mudó a la cocina'/></div><div><label class='lbl'>2 · Santo y seña: 'soy yo y estoy bien'</label><input class='input' id='sfOk' value='" + esc(s.ok) + "' placeholder='girasol'/><label class='lbl'>3 · Clave de coacción: 'me obligan, avisa'</label><input class='input' id='sfCoac' value='" + esc(s.coac) + "' placeholder='receta de la abuela'/></div></div>" +
      "<div class='row mt16'><button class='btn btn-gold' data-act='genSafe'>🎲 Generar al azar</button><button class='btn btn-primary' data-act='saveSafe'>💾 Guardar</button><button class='btn btn-ghost' data-act='printSafe'>🖨 Imprimir tarjeta</button></div>" +
      "<div class='grid g3 mt24'><div class='callout tip'><span class='ci'>1</span><div><b>Reto</b>: lo dice quien recibe la llamada si hay dudas.</div></div><div class='callout info'><span class='ci'>2</span><div><b>Santo y seña</b>: si no la saben, es IA o estafa. Cuelga.</div></div><div class='callout danger'><span class='ci'>3</span><div><b>Coacción</b>: sigue la conversación con calma y avisa a la policía.</div></div></div></div>";
  }
  var AUDIT_MOD = ["m04", "m04", "m04", "m04", "m05", "m04", "m02", "m03", "m06", "m06", "m07", "m01", "m10", "m14", "m15"];
  function labAudit() {
    return "<div class='glass lab reveal'><span class='tag em'>Autodiagnóstico</span><h3>Auditoría de exposición (15 vectores)</h3><p>Marca lo que <b>ya</b> haces hoy. Las casillas sin marcar te dicen qué módulo estudiar.</p><div class='grid audit-wrap' id='auditWrap'><div class='grid' style='gap:10px'>" +
      T.audit.map(function (a, i) { var on = S.labs.audit[i]; return "<div class='check-item" + (on ? " on" : "") + "' data-act='audit' data-i='" + i + "'><span class='cb'>" + (on ? "✓" : "") + "</span><span style='flex:1'>" + esc(a) + "</span><span class='tag' data-go='#/m/" + AUDIT_MOD[i] + "' style='cursor:pointer'>M" + MBY[AUDIT_MOD[i]].num + "</span></div>"; }).join("") +
      "</div><div class='audit-side'><div id='auditGauge'></div></div></div></div>";
  }
  function auditGauge() {
    var n = T.audit.filter(function (_, i) { return S.labs.audit[i]; }).length, p = n / T.audit.length;
    var col = p < .34 ? "#fb7185" : p < .67 ? "#fbbf24" : "#00f5a0";
    var ver = p < .34 ? "Muy expuesto" : p < .67 ? "Protección parcial" : p < 1 ? "Bien blindado" : "Soberano digital";
    var el = $("#auditGauge"); if (!el) return;
    el.innerHTML = "<div class='gauge'>" + gaugeSVG(p, col) + "<div class='gv'><div><b style='color:" + col + "'>" + n + "</b><span>DE " + T.audit.length + "</span></div></div></div><div style='text-align:center;font-weight:700;margin-top:10px;color:" + col + "'>" + ver + "</div><div class='muted' style='text-align:center;font-size:12px;margin-top:4px'>Siguiente paso: " + (n < T.audit.length ? "<a href='#/m/" + AUDIT_MOD[T.audit.findIndex(function (_, i) { return !S.labs.audit[i]; })] + "'>estudia el módulo sugerido</a>" : "mantener y revisar cada 6 meses") + "</div>";
  }
  function labThreat() {
    tmDraft = { a: S.labs.tm && S.labs.tm.a ? JSON.parse(JSON.stringify(S.labs.tm.a)) : {} };
    var ans = tmDraft.a;
    var h = "<div class='glass lab reveal'><span class='tag em'>Módulo 01 · Lección 2</span><h3>Asistente de modelo de amenazas</h3><p>Responde 6 preguntas y obtén tu perfil y la ruta de estudio recomendada.</p>";
    T.threatModelQs.forEach(function (q, qi) {
      h += "<div class='quiz-q'><h4>" + (qi + 1) + ". " + esc(q.q) + "</h4><div class='row'>" + q.o.map(function (o, oi) { return "<button class='chip" + (ans[qi] === oi ? " on" : "") + "' data-act='tm' data-q='" + qi + "' data-o='" + oi + "'>" + esc(o) + "</button>"; }).join("") + "</div></div>";
    });
    h += "<div id='tmResult' class='mt16'>" + tmResult(ans) + "</div></div>";
    return h;
  }
  function tmResult(ans) {
    var n = Object.keys(ans).length;
    if (n < T.threatModelQs.length) return "<div class='muted mono' style='font-size:12px'>" + n + "/" + T.threatModelQs.length + " respondidas</div>";
    var sc = 0; T.threatModelQs.forEach(function (q, i) { sc += q.w[ans[i]]; });
    var prof = sc <= 3 ? ["A", "Ciudadano", "#00f5a0", "Tu prioridad es blindar cuentas, dinero y familia contra el fraude. No necesitas la capa Fantasma.", ["m04", "m07", "m02", "m05", "m06", "m03"]] :
      sc <= 7 ? ["B", "Expuesto", "#fbbf24", "Tienes visibilidad o activos: añade compartimentación seria, alias, borrado de huella y OSINT defensivo.", ["m04", "m01", "m06", "m07", "m08", "m09", "m13"]] :
        ["C", "Alto riesgo", "#fb7185", "Necesitas el programa completo, incluida la capa Fantasma, móvil endurecido (GrapheneOS/Lockdown) y procedimientos estrictos.", ["m01", "m04", "m05", "m03", "m06", "m12", "m09", "m15"]];
    return "<div class='glass card' style='border-color:" + prof[2] + "66'><div class='row'><div style='font-size:46px;font-weight:900;color:" + prof[2] + ";font-family:var(--mono)'>" + prof[0] + "</div><div><div style='font-weight:800;font-size:18px'>Perfil " + prof[0] + " · " + prof[1] + "</div><div class='muted' style='font-size:13.5px'>" + prof[3] + "</div></div></div><div class='mono mt16' style='font-size:11px;color:var(--muted);letter-spacing:1px'>TU RUTA RECOMENDADA</div><div class='row mt8'>" + prof[4].map(function (id, i) { var m = MBY[id]; return "<button class='btn btn-ghost btn-sm' data-go='#/m/" + id + "'>" + (i + 1) + ". " + m.icon + " " + esc(shortTitle(m.title)) + "</button>"; }).join("") + "</div><div class='row mt16'><button class='btn btn-ghost btn-sm' data-act='tmReset'>↻ Repetir</button></div></div>";
  }
  function labUrl() {
    return "<div class='glass lab reveal'><span class='tag em'>Módulo 07 · Lección 1</span><h3>Detector de URLs sospechosas</h3><p>Pega un enlace recibido por SMS, correo o QR. Se analiza con reglas heurísticas en local, sin visitarlo. Para un análisis profundo usa VirusTotal o urlscan.io.</p><div class='row'><input class='input' id='urlIn' placeholder='https://ejemplo.com/login' style='flex:1' autocomplete='off'/><button class='btn btn-primary' data-act='url'>🔍 Analizar</button></div><div id='urlOut' class='mt16'></div>" +
      "<div class='row mt16'><span class='muted' style='font-size:12px'>Prueba con:</span>" + ["http://bancolombia-seguridad.top/verificar", "https://xn--pple-43d.com/login", "https://www.paypal.com.account-update.info/signin", "https://www.mozilla.org/es-ES/firefox/"].map(function (u) { return "<button class='chip' data-act='urlTry' data-u='" + esc(u) + "'>" + esc(u.length > 34 ? u.slice(0, 34) + "…" : u) + "</button>"; }).join("") + "</div></div>";
  }
  function labHooks(tab) {
    if (tab === "pass") { ["pwLen", "pwSep", "pwNum", "pwCap"].forEach(function (id) { $("#" + id).addEventListener("input", genPass); }); genPass(true); }
    if (tab === "strength") $("#stIn").addEventListener("input", strength);
    if (tab === "audit") auditGauge();
    if (tab === "url") $("#urlIn").addEventListener("keydown", function (e) { if (e.key === "Enter") analyzeUrl(); });
  }
  var lastPass = "";
  function genPass(silent) {
    var n = +$("#pwLen").value, sep = $("#pwSep").value, num = $("#pwNum").checked, cap = $("#pwCap").checked;
    $("#pwN").textContent = n;
    var w = []; for (var i = 0; i < n; i++) w.push(pick(T.words));
    if (cap) { var ci = rand(n); w[ci] = w[ci].charAt(0).toUpperCase() + w[ci].slice(1); }
    if (num) { var ni = rand(n); w[ni] = w[ni] + rand(10); }
    lastPass = w.join(sep);
    var bits = n * Math.log2(T.words.length) + (num ? Math.log2(10 * n) : 0) + (cap ? Math.log2(n) : 0);
    var el = $("#pwOut"); el.style.opacity = 0; setTimeout(function () { el.textContent = lastPass; el.style.transition = "opacity .3s"; el.style.opacity = 1; }, 120);
    var p = Math.min(1, bits / 100), col = bits < 50 ? "#fb7185" : bits < 64 ? "#fbbf24" : "#00f5a0";
    $("#pwMeter").style.width = p * 100 + "%"; $("#pwMeter").style.background = col;
    $("#pwInfo").innerHTML = "≈ <b style='color:" + col + "'>" + Math.round(bits) + " bits</b> · crackeo offline: " + crackTime(bits);
    if (silent !== true) { S.labs.passGen = 1; commit(); }
  }
  function crackTime(bits) {
    var s = Math.pow(2, bits) / 2 / 1e10;
    if (s < 1) return "instantáneo";
    var u = [["años", 31557600], ["días", 86400], ["horas", 3600], ["minutos", 60], ["segundos", 1]];
    for (var i = 0; i < u.length; i++) if (s >= u[i][1]) {
      var v = s / u[i][1];
      if (u[i][0] === "años") { if (v > 1e12) return "más que la edad del universo"; if (v > 1e6) return "≈ " + (v / 1e6).toFixed(1) + " millones de años"; if (v > 1e3) return "≈ " + Math.round(v / 1e3) + " mil años"; }
      return "≈ " + Math.round(v) + " " + u[i][0];
    }
    return "segundos";
  }
  var COMMON = ["123456", "password", "contraseña", "qwerty", "111111", "abc123", "iloveyou", "admin", "welcome", "monkey", "dragon", "letmein", "football", "colombia", "españa", "mexico", "teamo", "hola", "amor", "princesa", "000000", "superman", "batman", "pass", "clave"];
  function strength() {
    var p = $("#stIn").value, flags = [];
    if (!p) { $("#stMeter").style.width = 0; $("#stBits").textContent = 0; $("#stTime").textContent = "—"; $("#stVer").textContent = "—"; $("#stTip").textContent = ""; $("#stFlags").innerHTML = ""; return; }
    var pool = 0;
    if (/[a-z]/.test(p)) pool += 26; if (/[A-Z]/.test(p)) pool += 26; if (/[0-9]/.test(p)) pool += 10; if (/[^a-zA-Z0-9]/.test(p)) pool += 33;
    var bits = p.length * Math.log2(Math.max(pool, 1));
    var low = norm(p);
    COMMON.forEach(function (c) { if (low.indexOf(c) >= 0) { bits -= c.length * 3; flags.push(["bad", "Contiene una palabra/patrón muy común: «" + c + "»"]); } });
    if (/(.)\1{2,}/.test(p)) { bits -= 8; flags.push(["warn", "Caracteres repetidos (aaa, 111)"]); }
    if (/(0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf)/i.test(p)) { bits -= 12; flags.push(["bad", "Secuencias de teclado o numéricas"]); }
    if (/(19|20)\d{2}/.test(p)) { bits -= 6; flags.push(["warn", "Parece contener un año (fechas = adivinables)"]); }
    if (/^[A-Z][a-z]+\d+[^a-zA-Z0-9]?$/.test(p)) { bits -= 10; flags.push(["warn", "Patrón típico 'Palabra123!' que los crackers prueban primero"]); }
    if (p.length < 12) flags.push(["warn", "Menos de 12 caracteres"]);
    if (p.length >= 20) flags.push(["ok", "Longitud excelente (20+)"]);
    bits = Math.max(0, bits);
    var col = bits < 40 ? "#fb7185" : bits < 60 ? "#fbbf24" : "#00f5a0";
    $("#stMeter").style.width = Math.min(100, bits) + "%"; $("#stMeter").style.background = col;
    $("#stBits").textContent = Math.round(bits); $("#stBits").style.color = col;
    $("#stTime").textContent = crackTime(bits);
    $("#stVer").textContent = bits < 40 ? "Débil" : bits < 60 ? "Aceptable" : bits < 80 ? "Fuerte" : "Excelente"; $("#stVer").style.color = col;
    $("#stTip").textContent = bits < 60 ? "Usa el gestor o una frase de 7 palabras" : "Asegúrate de que sea única";
    $("#stFlags").innerHTML = flags.map(function (f) { return "<div class='flag-" + f[0] + "'>" + (f[0] === "ok" ? "✓ " : "⚠ ") + esc(f[1]) + "</div>"; }).join("");
  }
  var TLDS_BAD = ["zip", "mov", "top", "xyz", "click", "icu", "cyou", "sbs", "cfd", "rest", "buzz", "gq", "tk", "ml", "cf", "ga", "work", "support", "live", "shop", "info", "online", "site", "loan", "country", "kim", "mom", "lol"];
  var BRANDS = ["paypal", "google", "apple", "icloud", "microsoft", "outlook", "office", "amazon", "netflix", "whatsapp", "instagram", "facebook", "meta", "binance", "coinbase", "bancolombia", "davivienda", "nequi", "daviplata", "bbva", "santander", "caixabank", "bancodebogota", "dian", "agenciatributaria", "mercadolibre", "dhl", "fedex", "correos", "servientrega", "metamask", "ledger", "trezor", "openai", "chatgpt", "proton", "bitwarden", "steam", "tiktok", "banorte", "bancoppel", "itau", "scotiabank", "revolut"];
  var SHORT = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "is.gd", "cutt.ly", "rb.gy", "shorturl.at", "ow.ly", "tiny.cc", "s.id"];
  function regDomain(host) {
    var p = host.split("."); if (p.length <= 2) return host;
    var sl = p[p.length - 2];
    if (["com", "co", "org", "net", "gov", "edu", "gob", "ac"].indexOf(sl) >= 0 && p[p.length - 1].length === 2) return p.slice(-3).join(".");
    return p.slice(-2).join(".");
  }
  function analyzeUrl() {
    var raw = $("#urlIn").value.trim(), out = $("#urlOut"), f = [], score = 0;
    if (!raw) { out.innerHTML = ""; return; }
    var u; try { u = new URL(/^[a-z]+:\/\//i.test(raw) ? raw : "http://" + raw); } catch (e) { out.innerHTML = "<div class='flag-bad'>No parece una URL válida.</div>"; return; }
    var host = u.hostname.toLowerCase(), reg = regDomain(host), tld = host.split(".").pop(), full = raw.toLowerCase();
    function add(t, s, msg) { f.push([t, msg]); score += s; }
    if (u.protocol !== "https:") add("bad", 2, "No usa HTTPS (conexión sin cifrar).");
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.indexOf("[") === 0) add("bad", 3, "El dominio es una dirección IP: las webs legítimas usan nombres.");
    if (host.indexOf("xn--") >= 0) add("bad", 4, "Dominio punycode (xn--): posible ataque homógrafo con letras de otros alfabetos.");
    if (/[^\x00-\x7f]/.test(raw)) add("bad", 3, "Contiene caracteres no latinos que pueden imitar letras reales.");
    if (u.username || raw.indexOf("@") > -1 && raw.indexOf("@") < raw.indexOf(host) + host.length) add("bad", 3, "Usa '@' en la URL: el navegador ignora lo que va antes y va a otro sitio.");
    if (TLDS_BAD.indexOf(tld) >= 0) add("warn", 2, "Dominio de nivel superior '." + tld + "' muy usado en campañas de phishing.");
    if (host.split(".").length > 4) add("warn", 2, "Demasiados subdominios (" + host.split(".").length + " niveles): técnica para esconder el dominio real.");
    if ((reg.match(/-/g) || []).length >= 2) add("warn", 1, "Dominio con varios guiones (típico de imitaciones).");
    if (SHORT.indexOf(host.replace(/^www\./, "")) >= 0) add("warn", 2, "Acortador de enlaces: oculta el destino real.");
    if (u.port && ["80", "443"].indexOf(u.port) < 0) add("warn", 1, "Puerto no estándar (" + u.port + ").");
    if (raw.length > 110) add("warn", 1, "URL muy larga (" + raw.length + " caracteres).");
    if (/(login|signin|verify|verificar|secure|seguridad|update|actualizar|account|cuenta|wallet|password|confirm|desbloqueo|bloqueo)/.test(u.pathname + u.search + host.replace(reg, ""))) add("warn", 1, "Palabras de urgencia/credenciales en la ruta o subdominio.");
    BRANDS.forEach(function (b) {
      if (full.indexOf(b) >= 0) {
        var regName = reg.split(".")[0];
        if (regName !== b) add("bad", 4, "Menciona «" + b + "» pero el dominio real es «" + reg + "». Clásico de suplantación.");
        else f.push(["ok", "El dominio registrado coincide con la marca «" + b + "». Comprueba aun así que es el oficial."]);
      }
    });
    if (!f.some(function (x) { return x[0] !== "ok"; })) f.push(["ok", "No se detectaron señales heurísticas de riesgo."]);
    var lvl = score >= 5 ? ["bad", "🚨 ALTO RIESGO", "#fb7185"] : score >= 2 ? ["warn", "⚠️ SOSPECHOSA", "#fbbf24"] : ["ok", "✅ SIN SEÑALES CLARAS", "#00f5a0"];
    out.innerHTML = "<div class='glass card' style='border-color:" + lvl[2] + "66'><div class='row between'><div><div class='mono muted' style='font-size:11px'>DOMINIO REAL</div><div style='font-size:20px;font-weight:800;font-family:var(--mono);color:" + lvl[2] + "'>" + esc(reg) + "</div><div class='muted mono' style='font-size:12px'>host: " + esc(host) + "</div></div><div style='font-weight:800;color:" + lvl[2] + "'>" + lvl[1] + " · " + score + " pts</div></div><div class='url-flags mt8'>" + f.map(function (x) { return "<div class='flag-" + x[0] + "'>" + (x[0] === "ok" ? "✓ " : x[0] === "bad" ? "✗ " : "⚠ ") + esc(x[1]) + "</div>"; }).join("") + "</div><div class='muted mt16' style='font-size:12px'>Análisis heurístico: una URL 'limpia' aún puede ser maliciosa. Ante la duda, no la abras y entra por tus marcadores.</div></div>";
  }

  /* ---------------- VISTA: Glosario ---------------- */
  function vGlossary() {
    return "<div class='reveal'><div class='eyebrow'>Glosario</div><h1 style='font-size:clamp(26px,3.4vw,40px);margin:8px 0;letter-spacing:-1px'>" + T.glossary.length + " términos <span class='grad-text'>sin jerga</span></h1><p class='muted'>Todo lo que necesitas para entender a un experto en privacidad y seguridad.</p></div><input class='input mt16 reveal' id='glQ' placeholder='🔎 Buscar término…'/><div class='grid g2 mt16' id='glGrid'></div>";
  }
  function glossaryHooks() { $("#glQ").addEventListener("input", drawGlossary); drawGlossary(); }
  function drawGlossary() {
    var q = norm($("#glQ").value);
    var items = T.glossary.slice().sort(function (a, b) { return a[0].localeCompare(b[0], "es"); }).filter(function (g) { return !q || norm(g[0] + " " + g[1]).indexOf(q) >= 0; });
    $("#glGrid").innerHTML = items.length ? items.map(function (g, i) { return "<div class='glass gl-item hover-lift' style='animation:viewIn .45s " + Math.min(i, 14) * 25 + "ms both'><h4>" + esc(g[0]) + "</h4><p>" + esc(g[1]) + "</p></div>"; }).join("") : "<div class='glass empty' style='grid-column:1/-1'>Sin resultados.</div>";
  }

  /* ---------------- VISTA: Progreso ---------------- */
  function vProgress() {
    var rk = rank();
    var h = "<section class='glass hero reveal' style='padding:34px'><div class='row between'><div><span class='tag go'>Tu rango actual</span><h1 style='font-size:clamp(28px,4vw,46px)'><span style='font-size:1.2em'>" + rk.r.ico + "</span> <span class='gold-text'>" + rk.r.name + "</span></h1><p class='lead'>" + rk.r.d + " Tienes <b>" + rk.x + " XP</b>." + (rk.next ? " Te faltan <b>" + (rk.next.xp - rk.x) + " XP</b> para <b>" + rk.next.name + "</b>." : " Has alcanzado el rango máximo.") + "</p><div class='xp-bar' style='height:10px;max-width:520px;margin-top:16px'><i style='width:0' data-w='" + Math.round(rk.p * 100) + "%'></i></div></div>" +
      "<div class='gauge'>" + gaugeSVG(totalPct() / 100, "#00f5a0") + "<div class='gv'><div><b class='grad-text' data-count='" + totalPct() + "' data-suf='%'>0</b><span>DEL PROGRAMA</span></div></div></div></div></section>";
    h += "<div class='grid g4 mt24'>" + statCard("Lecciones", lessonsDone(), "/" + ALL.length, lessonsDone() / ALL.length, "#00f5a0", stepsDone() + " pasos aplicados") + statCard("Exámenes aprobados", quizPassed(), "/" + MODS.length, quizPassed() / MODS.length, "#a78bfa", "70% o más") + statCard("Reto 30 días", sprintDone(), "/30", sprintDone() / 30, "#fbbf24", "días completados") + statCard("Racha", streak(), " días", Math.min(1, streak() / 7), "#fb7185", "días seguidos estudiando") + "</div>";
    h += sectionHead("Escalera de rangos", "Del explorador al soberano", "Ganas XP con lecciones (100), pasos (5), exámenes (150), días del reto (30) e insignias (50).");
    h += "<div class='grid' style='grid-template-columns:repeat(auto-fill,minmax(170px,1fr))'>" + T.ranks.map(function (r) { var on = rk.x >= r.xp; return "<div class='badge reveal" + (on ? " on" : "") + "'><div class='bico' style='font-family:serif'>" + r.ico + "</div><h5>" + r.name + "</h5><p>" + r.xp + " XP</p></div>"; }).join("") + "</div>";
    h += sectionHead("Insignias", Object.keys(S.badges).length + " de " + T.badges.length + " desbloqueadas", "");
    h += "<div class='badge-grid'>" + T.badges.map(function (b) { var on = S.badges[b.id]; return "<div class='badge reveal" + (on ? " on" : "") + "'><div class='bico'>" + b.ico + "</div><h5>" + b.n + "</h5><p>" + b.d + "</p></div>"; }).join("") + "</div>";
    h += sectionHead("Progreso por módulo", "Tu mapa de dominio", "");
    h += "<div class='glass card reveal'>" + MODS.map(function (m) { var p = modProgress(m), q = S.quizzes[m.id]; return "<div class='row' style='padding:8px 0;border-bottom:1px solid var(--line);cursor:pointer' data-go='#/m/" + m.id + "'><span class='mono' style='width:30px;color:" + COLORS[m.color] + "'>" + m.num + "</span><span style='flex:1;min-width:180px;font-size:13.5px'>" + m.icon + " " + esc(m.title) + "</span><span style='width:160px'>" + bar(p.p, COLORS[m.color]) + "</span><span class='mono muted' style='font-size:11.5px;width:110px;text-align:right'>" + p.d + "/" + p.t + (q ? " · " + Math.round(q.best * 100) + "%" : "") + "</span></div>"; }).join("") + "</div>";
    h += sectionHead("Tus datos", "Copia de seguridad y restauración", "Todo se guarda solo en este navegador. Descarga un backup para no perderlo si limpias el navegador o cambias de equipo.");
    h += "<div class='glass card reveal row'><button class='btn btn-primary' data-act='exportFile'>⬇ Descargar backup (.json)</button><button class='btn btn-ghost' data-act='importFile'>⬆ Restaurar desde archivo</button><button class='btn btn-ghost' data-act='openBackup'>📋 Copiar / pegar JSON</button><button class='btn btn-danger' data-act='resetAll'>🗑 Reiniciar todo</button></div>";
    return h;
  }
  /* ---------------- Mapa del temario (cobertura) ---------------- */
  function covStats() {
    var total = 0, covered = 0, learned = 0;
    (T.coverage || []).forEach(function (g) { g.items.forEach(function (it) {
      total++;
      var ok = it[1].filter(function (id) { return LBY[id]; });
      if (ok.length) covered++;
      if (ok.length && ok.every(function (id) { return S.lessons[id]; })) learned++;
    }); });
    return { total: total, covered: covered, learned: learned, pct: total ? Math.round(covered / total * 100) : 0, lpct: total ? Math.round(learned / total * 100) : 0 };
  }
  function vCoverage() {
    var st = covStats();
    var h = "<section class='glass hero reveal' style='padding:34px'><div class='row between'><div style='max-width:680px'><span class='tag em'>Auditoría de contenido</span><h1 style='font-size:clamp(26px,3.4vw,40px)'>Mapa del <span class='grad-text'>temario completo</span></h1><p class='lead'>Cada tema de los programas de referencia (básico, avanzado y sus catálogos públicos) y cada tema imprescindible que faltaba, con las lecciones exactas donde lo aprendes aquí. Úsalo como checklist para convertirte en experto.</p></div>" +
      "<div class='gauge'>" + gaugeSVG(st.lpct / 100, "#00f5a0") + "<div class='gv'><div><b class='grad-text'>" + st.lpct + "%</b><span>DOMINADO</span></div></div></div></div>" +
      "<div class='row mt16'><span class='tag em'>✓ " + st.covered + " / " + st.total + " temas cubiertos (" + st.pct + "%)</span><span class='tag vi'>" + st.learned + " temas dominados</span></div></section>";
    (T.coverage || []).forEach(function (g, gi) {
      var done = g.items.filter(function (it) { return it[1].length && it[1].every(function (id) { return S.lessons[id]; }); }).length;
      h += sectionHead("Bloque " + (gi + 1), esc(g.g), done + " de " + g.items.length + " temas dominados");
      h += "<div class='glass card reveal cov-list'>" + g.items.map(function (it) {
        var ls = it[1].filter(function (id) { return LBY[id]; }), all = ls.length && ls.every(function (id) { return S.lessons[id]; });
        return "<div class='cov-row" + (all ? " done" : "") + "'><span class='cov-state'>" + (all ? "✓" : ls.length ? "●" : "!") + "</span><div class='cov-main'><div class='cov-t'>" + esc(it[0]) + "</div><div class='cov-links'>" +
          ls.map(function (id) { var l = LBY[id]; return "<button class='cov-chip" + (S.lessons[id] ? " on" : "") + "' data-go='#/l/" + id + "' title='" + esc(l.title) + "'>" + l.mod.num + "." + (l.idx + 1) + " · " + esc(l.title.length > 46 ? l.title.slice(0, 46) + "…" : l.title) + "</button>"; }).join("") + "</div></div></div>";
      }).join("") + "</div>";
    });
    return h;
  }

  /* ---------------- Repaso espaciado (sistema Leitner) ---------------- */
  var BOX_DAYS = [0, 1, 3, 7, 16, 35];
  var CARDS = null;
  function allCards() {
    if (CARDS) return CARDS;
    CARDS = [];
    T.glossary.forEach(function (g) { CARDS.push({ id: "g:" + g[0], k: "Glosario", f: "¿Qué es <b>" + esc(g[0]) + "</b>?", b: esc(g[1]) }); });
    MODS.forEach(function (m) { m.quiz.forEach(function (q, i) { CARDS.push({ id: "q:" + m.id + ":" + i, k: "Módulo " + m.num, f: esc(q.q), b: "<b>" + esc(q.o[q.a]) + "</b><br><span class='muted'>" + esc(q.e) + "</span>" }); }); });
    return CARDS;
  }
  function daysFromToday(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function dueCards() {
    var t = today();
    return allCards().filter(function (c) { var s = S.cards[c.id]; return !s || s.due <= t; });
  }
  var session = null;
  function vReview() {
    var due = dueCards(), all = allCards();
    var boxes = [0, 0, 0, 0, 0, 0]; all.forEach(function (c) { var s = S.cards[c.id]; boxes[s ? Math.min(5, s.b) : 0]++; });
    if (!session || session.done) {
      var pool = due.slice(); for (var i = pool.length - 1; i > 0; i--) { var j = rand(i + 1), t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
      session = { q: pool.slice(0, 20), i: 0, ok: 0, done: false, flipped: false };
    }
    var h = "<div class='reveal'><div class='eyebrow'>Repaso espaciado</div><h1 style='font-size:clamp(26px,3.4vw,40px);margin:8px 0;letter-spacing:-1px'>Lo que repasas, <span class='grad-text'>no se olvida</span></h1><p class='muted'>Sistema Leitner: cada tarjeta que aciertas vuelve más tarde (1, 3, 7, 16 y 35 días). Las que fallas vuelven mañana. " + all.length + " tarjetas del glosario y de los exámenes.</p></div>";
    h += "<div class='box-row mt16 reveal'>" + boxes.map(function (n, i) { return "<div class='box-pill'><span>" + (i === 0 ? "Nuevas" : "Caja " + i) + "</span><b>" + n + "</b></div>"; }).join("") + "</div>";
    h += "<div id='cardStage' class='mt24'></div>";
    return h;
  }
  function drawCard() {
    var st = $("#cardStage"); if (!st) return;
    if (!session.q.length) { st.innerHTML = "<div class='glass card empty'><div style='font-size:48px'>🌙</div><h2>Todo repasado por hoy</h2><p class='muted'>Vuelve mañana: tus tarjetas te estarán esperando en el momento justo para no olvidarlas.</p><button class='btn btn-primary mt16' data-go='#/'>Volver al inicio</button></div>"; return; }
    if (session.i >= session.q.length) {
      session.done = true;
      st.innerHTML = "<div class='glass card empty'><div style='font-size:52px'>🧠</div><h2>Sesión completada</h2><p class='muted'>Acertaste " + session.ok + " de " + session.q.length + ". " + (dueCards().length ? "Quedan " + dueCards().length + " tarjetas pendientes." : "No quedan tarjetas pendientes hoy.") + "</p><div class='row mt16' style='justify-content:center'>" + (dueCards().length ? "<button class='btn btn-primary' data-act='newSession'>Otra ronda</button>" : "") + "<button class='btn btn-ghost' data-go='#/'>Inicio</button></div></div>";
      sfx.success(); confetti(100); return;
    }
    var c = session.q[session.i];
    st.innerHTML = "<div class='row between mono muted' style='font-size:12px;max-width:640px;margin:0 auto 10px'><span>" + c.k + "</span><span>" + (session.i + 1) + " / " + session.q.length + "</span></div>" +
      "<div class='progress' style='max-width:640px;margin:0 auto 18px'><i style='width:" + Math.round(session.i / session.q.length * 100) + "%'></i></div>" +
      "<div class='flashcard" + (session.flipped ? " flipped" : "") + "' data-act='flip'><div class='fc-inner'><div class='fc-face fc-front'><div class='fc-tag'>PREGUNTA</div><div class='fc-text'>" + c.f + "</div><div class='fc-hint'>Toca para ver la respuesta</div></div><div class='fc-face fc-back'><div class='fc-tag'>RESPUESTA</div><div class='fc-text' style='font-size:17px'>" + c.b + "</div></div></div></div>" +
      "<div class='row mt24 fc-actions" + (session.flipped ? " show" : "") + "' style='justify-content:center'><button class='btn btn-danger' data-act='cardAns' data-v='0'>😅 Repasar mañana</button><button class='btn btn-primary' data-act='cardAns' data-v='1'>✅ Lo sabía</button></div>";
  }

  /* ---------------- Examen final y certificado ---------------- */
  var exam = null;
  function vExam() {
    var best = S.exam ? Math.round(S.exam.best * 100) : null;
    var pool = 0; MODS.forEach(function (m) { pool += m.quiz.length; });
    var h = "<section class='glass hero reveal' style='padding:34px'><div class='row between'><div style='max-width:660px'><span class='tag vi'>Certificación final</span><h1 style='font-size:clamp(26px,3.4vw,42px)'>Examen de <span class='grad-text'>Soberanía Digital</span></h1><p class='lead'>30 preguntas al azar de un banco de " + pool + ", de todos los módulos. Aprueba con un 80% para obtener tu certificado y +500 XP. Puedes repetirlo las veces que quieras.</p></div><div class='cert-seal'><span>🎓</span></div></div>" +
      (best !== null ? "<div class='row mt16'><span class='tag " + (best >= 80 ? "em" : "go") + "'>Mejor nota: " + best + "%</span>" + (best >= 80 ? "<button class='btn btn-gold btn-sm' data-go='#/certificado'>📜 Ver mi certificado</button>" : "") + "</div>" : "") + "</section>";
    h += "<div id='examStage' class='mt24'></div>";
    return h;
  }
  function startExam() {
    var bank = []; MODS.forEach(function (m) { m.quiz.forEach(function (q) { bank.push({ q: q, m: m }); }); });
    for (var i = bank.length - 1; i > 0; i--) { var j = rand(i + 1), t = bank[i]; bank[i] = bank[j]; bank[j] = t; }
    exam = { q: bank.slice(0, Math.min(30, bank.length)), i: 0, ok: 0, answered: false, choice: null };
    drawExam();
  }
  function drawExam() {
    var st = $("#examStage"); if (!st) return;
    if (!exam) { st.innerHTML = "<div class='glass card' style='text-align:center'><div style='font-size:40px'>⏱️</div><h3>¿Listo?</h3><p class='muted'>Sin límite de tiempo. Lee con calma: cada respuesta incluye la explicación.</p><button class='btn btn-primary mt8' data-act='examStart'>Comenzar examen</button></div>"; return; }
    if (exam.i >= exam.q.length) {
      var sc = exam.ok / exam.q.length, pass = sc >= 0.8;
      var prev = S.exam ? S.exam.best : 0;
      S.exam = { best: Math.max(prev, sc), last: sc, at: Date.now(), code: (S.exam && S.exam.code) || certCode() };
      if (pass) S.exam.passedAt = S.exam.passedAt || Date.now();
      commit();
      st.innerHTML = "<div class='glass card' style='text-align:center'><div style='font-size:56px'>" + (pass ? "🏆" : "📘") + "</div><h2>" + exam.ok + " / " + exam.q.length + " · " + Math.round(sc * 100) + "%</h2><p class='muted'>" + (pass ? "¡Aprobado! Ya tienes tu certificado." : "Necesitas un 80%. Repasa los módulos con más fallos y vuelve a intentarlo.") + "</p><div class='row mt16' style='justify-content:center'>" + (pass ? "<button class='btn btn-gold' data-go='#/certificado'>📜 Ver certificado</button>" : "") + "<button class='btn btn-ghost' data-act='examStart'>↻ Repetir</button><button class='btn btn-ghost' data-go='#/repaso'>🃏 Repasar</button></div></div>";
      if (pass) { sfx.levelup(); confetti(300); } else sfx.wrong();
      exam = null; return;
    }
    var it = exam.q[exam.i], q = it.q;
    st.innerHTML = "<div class='glass card exam-card'><div class='row between mono muted' style='font-size:12px'><span>Pregunta " + (exam.i + 1) + " de " + exam.q.length + " · " + it.m.icon + " Módulo " + it.m.num + "</span><span>✓ " + exam.ok + "</span></div><div class='progress mt8'><i style='width:" + Math.round(exam.i / exam.q.length * 100) + "%'></i></div>" +
      "<h3 style='font-size:19px;margin:18px 0 6px'>" + esc(q.q) + "</h3>" +
      q.o.map(function (o, oi) {
        var cls = !exam.answered ? "" : oi === q.a ? " ok" : oi === exam.choice ? " bad" : "";
        return "<button class='quiz-opt" + cls + "' data-act='examAns' data-o='" + oi + "'" + (exam.answered ? " disabled" : "") + ">" + String.fromCharCode(65 + oi) + ") " + esc(o) + "</button>";
      }).join("") +
      (exam.answered ? "<div class='callout " + (exam.choice === q.a ? "tip" : "danger") + " mt16'><span class='ci'>" + (exam.choice === q.a ? "✅" : "❌") + "</span><div>" + esc(q.e) + "</div></div><div class='row mt16' style='justify-content:flex-end'><button class='btn btn-primary' data-act='examNext'>" + (exam.i + 1 < exam.q.length ? "Siguiente →" : "Ver resultado") + "</button></div>" : "") + "</div>";
  }
  function certCode() { var b = new Uint8Array(6); crypto.getRandomValues(b); return Array.prototype.map.call(b, function (x) { return ("0" + x.toString(16)).slice(-2); }).join("").toUpperCase(); }
  function vCert() {
    if (!S.exam || S.exam.best < 0.8) return "<div class='glass card empty'><div style='font-size:48px'>🔒</div><h2>Certificado bloqueado</h2><p class='muted'>Aprueba el examen final con un 80% para desbloquearlo.</p><button class='btn btn-primary mt16' data-go='#/examen'>Ir al examen</button></div>";
    var d = new Date(S.exam.passedAt || S.exam.at);
    var name = S.prefs.name || "Estudiante de Bastión";
    return "<div class='cert-wrap reveal'><div class='certificate' id='certificate'><div class='cert-border'></div><div class='cert-logo'>B</div><div class='cert-k'>BASTIÓN · ACADEMIA DE SOBERANÍA DIGITAL</div><div class='cert-t'>Certificado de Dominio</div><div class='cert-s'>Se certifica que</div><div class='cert-name'>" + esc(name) + "</div><div class='cert-s'>ha completado y superado la evaluación final del programa de Privacidad, OPSEC y Soberanía Digital en la era de la IA, con una calificación de</div><div class='cert-score'>" + Math.round(S.exam.best * 100) + "%</div><div class='cert-foot'><div><b>" + d.toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" }) + "</b><span>Fecha</span></div><div><b>" + rank().r.ico + " " + rank().r.name + "</b><span>Rango</span></div><div><b>" + S.exam.code + "</b><span>Código</span></div></div></div>" +
      "<div class='row mt24' style='justify-content:center'><button class='btn btn-primary' data-act='printCert'>🖨 Imprimir / guardar PDF</button><button class='btn btn-ghost' data-act='editName'>✏️ Cambiar nombre</button><button class='btn btn-ghost' data-go='#/examen'>Volver</button></div><p class='muted mono' style='text-align:center;font-size:11px;margin-top:12px'>Certificado personal de autoformación generado en tu dispositivo. No es una titulación oficial.</p></div>";
  }
  function askName(first) {
    openModal("<div style='text-align:center'><div class='onb-logo'>B</div><h2 style='margin:14px 0 6px'>" + (first ? "Bienvenido a Bastión" : "Tu nombre") + "</h2><p class='muted' style='font-size:14px'>" + (first ? "Tu academia personal de soberanía digital. Todo lo que hagas se guarda <b>solo en este dispositivo</b>." : "Se usa en saludos y en tu certificado. Se guarda solo en este dispositivo.") + "</p></div>" +
      "<label class='lbl'>¿Cómo quieres que te llame? (opcional, puede ser un alias)</label><input class='input' id='onbName' maxlength='40' value='" + esc(S.prefs.name || "") + "' placeholder='Tu nombre o alias'/>" +
      (first ? "<label class='row mt16' style='gap:10px;font-size:14px;cursor:pointer'><input type='checkbox' id='onbSound' checked style='accent-color:#00f5a0;width:18px;height:18px'/> Activar efectos de sonido</label>" : "") +
      "<div class='row mt24' style='justify-content:flex-end'><button class='btn btn-primary' data-act='saveName'>" + (first ? "Empezar →" : "Guardar") + "</button></div>");
    setTimeout(function () { var i = $("#onbName"); if (i) i.focus(); }, 60);
  }

  function vNotFound() { return "<div class='glass card empty'><h2>404 · Esta casilla del tablero no existe</h2><button class='btn btn-primary mt16' data-go='#/'>Volver al inicio</button></div>"; }

  /* ---------------- Backup ---------------- */
  function exportFile() {
    S.labs.backup = 1; commit();
    var blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "bastion-backup-" + today() + ".json";
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast("Backup descargado", "💾");
  }
  function restore(txt) {
    try {
      var s = JSON.parse(txt); if (!s || typeof s !== "object" || !s.lessons) throw new Error("formato");
      localStorage.setItem(KEY, JSON.stringify(s)); S = load(); closeModal(); render(); toast("Progreso restaurado", "✅");
    } catch (e) { toast("El archivo no es un backup válido", "⚠️"); }
  }
  function importFile() {
    var inp = document.createElement("input"); inp.type = "file"; inp.accept = ".json,application/json";
    inp.onchange = function () { var f = inp.files[0]; if (!f) return; var r = new FileReader(); r.onload = function () { restore(r.result); }; r.readAsText(f); };
    inp.click();
  }
  function openModal(html) { $("#modalBody").innerHTML = html; $("#modal").classList.add("show"); }
  function closeModal() { $("#modal").classList.remove("show"); }
  function openBackup() {
    openModal("<div class='row between'><h3 style='margin:0'>💾 Copia de seguridad</h3><button class='icon-btn' data-act='closeModal'>✕</button></div><p class='muted' style='font-size:13.5px'>Tu progreso vive solo en este navegador. Descárgalo o copia el JSON para restaurarlo en otro equipo.</p><textarea class='notes mono' id='bkTa' style='min-height:160px;font-size:12px'>" + esc(JSON.stringify(S)) + "</textarea><div class='row mt16'><button class='btn btn-primary btn-sm' data-act='exportFile'>⬇ Descargar archivo</button><button class='btn btn-ghost btn-sm' data-act='copyJson'>📋 Copiar JSON</button><button class='btn btn-ghost btn-sm' data-act='importFile'>⬆ Desde archivo</button><button class='btn btn-gold btn-sm' data-act='restoreTa'>↺ Restaurar el JSON pegado</button></div>");
  }
  function resetAll() {
    openModal("<h3 style='margin-top:0'>🗑 ¿Reiniciar todo el progreso?</h3><p class='muted'>Se borrarán lecciones, notas, exámenes, laboratorios e insignias de este navegador. No se puede deshacer (salvo que tengas un backup).</p><div class='row mt16'><button class='btn btn-danger' data-act='resetConfirm'>Sí, borrar todo</button><button class='btn btn-ghost' data-act='closeModal'>Cancelar</button></div>");
  }

  /* ---------------- Paleta de comandos ---------------- */
  var palIdx = [], palSel = 0, palItems = [];
  function buildIndex() {
    palIdx = [];
    NAV.forEach(function (n) { palIdx.push({ k: "Ir a", t: n.ico + " " + n.t, s: "", go: "#/" + n.r }); });
    LABS.forEach(function (x) { palIdx.push({ k: "Lab", t: x[1], s: "Laboratorio interactivo", go: "#/labs/" + x[0] }); });
    MODS.forEach(function (m) { palIdx.push({ k: "Módulo " + m.num, t: m.icon + " " + m.title, s: m.subtitle, go: "#/m/" + m.id, x: m.summary }); });
    ALL.forEach(function (l) { palIdx.push({ k: "Lección", t: l.title, s: "Módulo " + l.mod.num + " · " + l.min + " min", go: "#/l/" + l.id, x: strip(l.theory) + " " + l.steps.join(" ") + " " + (l.tools || []).join(" ") }); });
    T.arsenal.forEach(function (t) { palIdx.push({ k: "Herramienta", t: t.n, s: t.cat + " · reemplaza " + t.rep, go: "#/arsenal?q=" + encodeURIComponent(t.n), x: t.d }); });
    T.threats.forEach(function (t) { palIdx.push({ k: "Amenaza", t: t.ico + " " + t.t, s: t.d, go: "#/amenazas", x: t.how.join(" ") + t.def.join(" ") }); });
    T.glossary.forEach(function (g) { palIdx.push({ k: "Glosario", t: g[0], s: g[1], go: "#/glosario" }); });
    palIdx.forEach(function (it) { it.nt = norm(it.t); it.nx = norm(it.s + " " + (it.x || "")); });
  }
  function openPalette() { sfx.open(); $("#palette").classList.add("show"); var i = $("#palInput"); i.value = ""; drawPal(); setTimeout(function () { i.focus(); }, 30); }
  function closePalette() { $("#palette").classList.remove("show"); }
  function drawPal() {
    var q = norm($("#palInput").value), words = q.split(" ").filter(Boolean);
    if (!words.length) palItems = palIdx.slice(0, 8 + LABS.length).filter(function (x) { return x.k === "Ir a" || x.k === "Lab"; });
    else {
      palItems = palIdx.map(function (it) {
        var sc = 0;
        for (var i = 0; i < words.length; i++) { var w = words[i], a = it.nt.indexOf(w), b = it.nx.indexOf(w); if (a < 0 && b < 0) return null; sc += a === 0 ? 10 : a > 0 ? 6 : 1; }
        return { it: it, sc: sc };
      }).filter(Boolean).sort(function (a, b) { return b.sc - a.sc; }).slice(0, 40).map(function (x) { return x.it; });
    }
    palSel = 0;
    $("#palList").innerHTML = palItems.length ? palItems.map(function (it, i) { return "<div class='pal-item" + (i === 0 ? " sel" : "") + "' data-pi='" + i + "'><span class='pk'>" + esc(it.k) + "</span><div style='min-width:0'><div class='pt'>" + esc(it.t) + "</div>" + (it.s ? "<div class='ps' style='white-space:nowrap;overflow:hidden;text-overflow:ellipsis'>" + esc(it.s) + "</div>" : "") + "</div></div>"; }).join("") : "<div class='pal-empty'>Sin resultados para «" + esc($("#palInput").value) + "»</div>";
  }
  function palMove(d) {
    if (!palItems.length) return;
    palSel = (palSel + d + palItems.length) % palItems.length;
    $$(".pal-item").forEach(function (el, i) { el.classList.toggle("sel", i === palSel); if (i === palSel) el.scrollIntoView({ block: "nearest" }); });
  }
  function palGo(i) { var it = palItems[i]; if (!it) return; closePalette(); if (location.hash === it.go) render(); else location.hash = it.go; }
  $("#palInput").addEventListener("input", drawPal);
  $("#palInput").addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); palMove(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); palMove(-1); }
    else if (e.key === "Enter") { e.preventDefault(); palGo(palSel); }
  });
  $("#palList").addEventListener("click", function (e) { var el = e.target.closest(".pal-item"); if (el) palGo(+el.dataset.pi); });
  $("#palette").addEventListener("click", function (e) { if (e.target.id === "palette") closePalette(); });
  $("#modal").addEventListener("click", function (e) { if (e.target.id === "modal") closeModal(); });
  $("#searchTrigger").addEventListener("click", openPalette);
  $("#backupBtn").addEventListener("click", openBackup);
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#palette").classList.contains("show") ? closePalette() : openPalette(); }
    else if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openPalette(); }
    else if (e.key === "Escape") { closePalette(); closeModal(); closeSidebar(); }
  });

  /* ---------------- Menú móvil ---------------- */
  function closeSidebar() { $("#sidebar").classList.remove("open"); $("#backdrop").classList.remove("show"); }
  $("#burger").addEventListener("click", function () { $("#sidebar").classList.add("open"); $("#backdrop").classList.add("show"); });
  $("#backdrop").addEventListener("click", closeSidebar);

  /* ---------------- Acciones (delegación) ---------------- */
  document.addEventListener("click", function (e) {
    var act = e.target.closest("[data-act]"), go = e.target.closest("[data-go]");
    if (go && (!act || act.contains(go))) {
      e.preventDefault(); e.stopPropagation();
      var dest = go.dataset.go; if (location.hash === dest || (dest === "#/" && !location.hash)) render(); else location.hash = dest; return;
    }
    if (act) doAct(act.dataset.act, act, e);
  });

  function doAct(a, el, e) {
    var l, m, i;
    switch (a) {
      case "step":
        l = LBY[el.dataset.l]; i = +el.dataset.i; var k = l.id + ":" + i;
        S.steps[k] = !S.steps[k]; if (!S.steps[k]) delete S.steps[k];
        el.classList.toggle("on", !!S.steps[k]); el.querySelector(".sbox").textContent = S.steps[k] ? "✓" : i + 1;
        var st = l.steps.filter(function (_, si) { return S.steps[l.id + ":" + si]; }).length;
        $("#stepCount").textContent = st + "/" + l.steps.length + " pasos";
        $("#stepBar .progress i").style.width = Math.round(st / l.steps.length * 100) + "%";
        if (S.steps[k]) { sfx.check(); xpFloat(e, "+5 XP"); } else sfx.uncheck();
        if (st === l.steps.length && !S.lessons[l.id]) toast("¡Todos los pasos hechos! Marca la lección como completada.", "🎯");
        commit(); break;
      case "lesson":
        l = LBY[el.dataset.l]; S.lessons[l.id] = !S.lessons[l.id]; if (!S.lessons[l.id]) delete S.lessons[l.id];
        if (S.lessons[l.id]) { toast("+100 XP · Lección completada", "✅"); confetti(70); sfx.success(); xpFloat(e, "+100 XP", "#fbbf24"); } else sfx.uncheck();
        $("#completeBar").innerHTML = completeBarHTML(l);
        commit(); break;
      case "quiz":
        m = MBY[el.dataset.m]; var run = quizRun[m.id] || (quizRun[m.id] = {});
        run[+el.dataset.q] = +el.dataset.o;
        if (run[+el.dataset.q] === m.quiz[+el.dataset.q].a) sfx.correct(); else sfx.wrong();
        if (Object.keys(run).length === m.quiz.length) {
          var ok = Object.keys(run).filter(function (k2) { return run[k2] === m.quiz[k2].a; }).length, sc = ok / m.quiz.length;
          var prevBest = S.quizzes[m.id] ? S.quizzes[m.id].best : 0;
          S.quizzes[m.id] = { best: Math.max(prevBest, sc), last: sc, at: Date.now() };
          if (sc >= .7) { confetti(sc === 1 ? 200 : 100); if (prevBest < .7) toast("+150 XP · Examen aprobado", "🏅"); }
          commit();
        }
        $("#quizBox").innerHTML = quizHTML(m); break;
      case "quizReset": quizRun[el.dataset.m] = {}; $("#quizBox").innerHTML = quizHTML(MBY[el.dataset.m]); break;
      case "scrollQuiz": $("#quizAnchor").scrollIntoView({ behavior: "smooth" }); break;
      case "toc": var sec = document.getElementById(el.dataset.t); if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      case "copyCode": copy(el.closest(".codebox").querySelector("pre").textContent); break;
      case "day":
        if (e.target.closest("[data-go]")) return;
        var d = el.dataset.d; S.sprint[d] = !S.sprint[d]; if (!S.sprint[d]) delete S.sprint[d];
        el.classList.toggle("on", !!S.sprint[d]); el.querySelector(".dcheck").textContent = S.sprint[d] ? "✓" : "";
        if (S.sprint[d]) { toast("Día " + d + " completado · +30 XP", "⚡"); sfx.check(); xpFloat(e, "+30 XP", "#fbbf24"); } else sfx.uncheck();
        commit();
        var g = document.querySelector(".hero .gauge"); if (g) g.outerHTML = "<div class='gauge'>" + gaugeSVG(sprintDone() / 30, "#fbbf24") + "<div class='gv'><div><b class='gold-text'>" + sprintDone() + "</b><span>DE 30 DÍAS</span></div></div></div>";
        break;
      case "arsCat": arsCat = el.dataset.c; $$("#arsCats .chip").forEach(function (c) { c.classList.toggle("on", c.dataset.c === arsCat); }); drawArsenal(); break;
      case "sev": sevF = el.dataset.s; $$("[data-act='sev']").forEach(function (c) { c.classList.toggle("on", c.dataset.s === sevF); }); $("#thrGrid").innerHTML = threatCards(); break;
      case "threat": el.classList.toggle("open"); var lb = el.querySelector(".mono.mt8"); if (lb) lb.textContent = el.classList.contains("open") ? "▴ ocultar" : "▾ ver detalle"; break;
      case "genPass": genPass(); break;
      case "copyPass": if (lastPass) copy(lastPass); break;
      case "stShow": var si = $("#stIn"); si.type = si.type === "password" ? "text" : "password"; break;
      case "saveComp":
        var v = {}; $$(".comp-in").forEach(function (inp) { if (inp.value.trim()) v[inp.dataset.k] = inp.value.trim(); });
        S.labs.comp = v; S.labs.compSaved = 1; commit(); toast("Arquitectura guardada", "🏗️"); break;
      case "fillComp": $$(".comp-in").forEach(function (inp) { if (!inp.value) inp.value = inp.placeholder; }); toast("Rellenado con la recomendación. Ajusta y guarda.", "✨"); break;
      case "checkComp":
        var vals = {}, cross = [];
        $$(".comp-in").forEach(function (inp) { var val = norm(inp.value); if (!val || /^ninguno/.test(val)) return; var layer = inp.dataset.k.split("_")[0]; (vals[val] = vals[val] || []).push(layer); });
        Object.keys(vals).forEach(function (val) { var ls = vals[val].filter(function (x, j, arr) { return arr.indexOf(x) === j; }); if (ls.length > 1) cross.push([val, ls]); });
        $("#compMsg").innerHTML = cross.length ? cross.map(function (c) { return "<div class='flag-bad'>✗ «" + esc(c[0]) + "» aparece en " + c[1].map(function (x) { return "capa " + x.slice(1); }).join(" y ") + ". Separa ese identificador.</div>"; }).join("") : "<div class='flag-ok'>✓ No hay identificadores idénticos entre capas. Revisa también usernames, fotos y horarios.</div>";
        break;
      case "genSafe":
        $("#sfReto").value = pick(T.safeWords.reto); $("#sfOk").value = pick(T.safeWords.ok);
        var co = pick(T.safeWords.coac); $("#sfCoac").value = co; $("#sfResp").value = "No, eso lo hago los " + pick(["martes", "jueves", "domingos"]) + " con " + pick(["Carmen", "el vecino", "la prima Lucía"]);
        break;
      case "saveSafe":
        S.labs.safe = { reto: $("#sfReto").value, ok: $("#sfOk").value, coac: $("#sfCoac").value, resp: $("#sfResp").value };
        if (!S.labs.safe.ok || !S.labs.safe.coac) { toast("Completa al menos el santo y seña y la clave de coacción", "⚠️"); S.labs.safe = null; break; }
        commit(); toast("Protocolo guardado. Compártelo en persona.", "🗣️"); break;
      case "printSafe":
        var w = window.open("", "_blank", "width=520,height=640");
        if (!w) { toast("Permite las ventanas emergentes para imprimir", "⚠️"); break; }
        w.document.write("<!doctype html><meta charset='utf-8'><title>Santo y Seña</title><body style='font-family:system-ui;padding:30px;max-width:420px'><h2>🗣️ Protocolo familiar</h2><p><b>Pregunta-reto:</b><br>" + esc($("#sfReto").value) + "</p><p><b>Respuesta pactada:</b><br>" + esc($("#sfResp").value) + "</p><p><b>Santo y seña (estoy bien):</b><br>" + esc($("#sfOk").value) + "</p><p><b>Clave de coacción (me obligan):</b><br>" + esc($("#sfCoac").value) + "</p><hr><p style='font-size:12px'>Guárdala en un lugar privado. No la fotografíes ni la envíes por chat.</p><script>print()<\/script></body>");
        w.document.close(); break;
      case "audit":
        if (e.target.closest("[data-go]")) return;
        i = el.dataset.i; S.labs.audit[i] = !S.labs.audit[i]; if (!S.labs.audit[i]) delete S.labs.audit[i];
        el.classList.toggle("on", !!S.labs.audit[i]); el.querySelector(".cb").textContent = S.labs.audit[i] ? "✓" : "";
        if (S.labs.audit[i]) sfx.check(); else sfx.uncheck();
        auditGauge(); commit(); break;
      case "tm":
        tmDraft.a[el.dataset.q] = +el.dataset.o;
        $$("[data-act='tm'][data-q='" + el.dataset.q + "']").forEach(function (c) { c.classList.toggle("on", c === el); });
        if (Object.keys(tmDraft.a).length === T.threatModelQs.length) { S.labs.tm = { a: JSON.parse(JSON.stringify(tmDraft.a)) }; commit(); }
        $("#tmResult").innerHTML = tmResult(tmDraft.a);
        break;
      case "tmReset": S.labs.tm = null; save(); render(); break;
      case "url": analyzeUrl(); break;
      case "urlTry": $("#urlIn").value = el.dataset.u; analyzeUrl(); break;
      case "exportFile": exportFile(); break;
      case "importFile": importFile(); break;
      case "openBackup": openBackup(); break;
      case "copyJson": copy(JSON.stringify(S)); break;
      case "restoreTa": restore($("#bkTa").value); break;
      case "resetAll": resetAll(); break;
      case "resetConfirm": S = blank(); quizRun = {}; save(); closeModal(); render(); toast("Progreso reiniciado", "🗑"); break;
      case "closeModal": closeModal(); break;
      case "closeLevel": var ov = el.closest(".levelup"); ov.classList.remove("show"); setTimeout(function () { ov.remove(); }, 400); break;
      case "flip": session.flipped = !session.flipped; el.classList.toggle("flipped", session.flipped); var fa = $(".fc-actions"); if (fa) fa.classList.toggle("show", session.flipped); sfx.flip(); break;
      case "cardAns":
        var c = session.q[session.i], rec = S.cards[c.id] || { b: 0 }, good = el.dataset.v === "1";
        var wasMastered = rec.b >= 3;
        rec.b = good ? Math.min(5, rec.b + 1) : 0;
        rec.due = daysFromToday(BOX_DAYS[rec.b] || 1); if (!good) rec.due = daysFromToday(1);
        S.cards[c.id] = rec;
        if (good) { session.ok++; sfx.correct(); if (!wasMastered && rec.b >= 3) xpFloat(e, "+10 XP"); } else sfx.wrong();
        session.i++; session.flipped = false; commit(); drawCard(); break;
      case "newSession": session = null; render(); break;
      case "examStart": startExam(); sfx.open(); break;
      case "examAns":
        if (exam.answered) break;
        exam.answered = true; exam.choice = +el.dataset.o;
        if (exam.choice === exam.q[exam.i].q.a) { exam.ok++; sfx.correct(); } else sfx.wrong();
        drawExam(); break;
      case "examNext": exam.i++; exam.answered = false; exam.choice = null; drawExam(); var es = $("#examStage"); if (es) es.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      case "printCert": window.print(); break;
      case "editName": askName(false); break;
      case "saveName":
        S.prefs.name = ($("#onbName").value || "").trim().slice(0, 40);
        var sb = $("#onbSound"); if (sb) S.prefs.sound = sb.checked;
        S.prefs.onboarded = true; save(); closeModal(); soundBtn(); render(); sfx.success(); break;
    }
  }
  function soundBtn() { var b = $("#soundBtn"); if (b) { b.textContent = S.prefs.sound ? "🔊" : "🔇"; b.title = S.prefs.sound ? "Sonido activado" : "Sonido desactivado"; } }
  $("#soundBtn").addEventListener("click", function () { sfx.set(!S.prefs.sound); soundBtn(); if (S.prefs.sound) sfx.check(); toast(S.prefs.sound ? "Sonido activado" : "Sonido desactivado", S.prefs.sound ? "🔊" : "🔇"); });
  soundBtn();
  document.addEventListener("pointerdown", function (e) { if (e.target.closest(".btn, .chip, .tab, .quiz-opt")) sfx.tap(); }, true);
  var tmDraft = { a: {} };

  /* ---------------- Actualización instantánea (botón flotante) ---------------- */
  var APP_VERSION = "5.1";
  var updateFab = $("#updateFab"), remoteVersion = null, updating = false;
  function canUpdate() { return /^https?:$/.test(location.protocol); }
  function checkUpdate(manual) {
    if (!canUpdate()) { if (manual) toast("La actualización automática funciona en la versión publicada", "ℹ️"); return Promise.resolve(false); }
    return fetch("version.json?t=" + Date.now(), { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      remoteVersion = j && j.version;
      var has = !!remoteVersion && remoteVersion !== APP_VERSION;
      updateFab.classList.toggle("has-update", has);
      $("#burger").classList.toggle("has-update", has);
      $("#updateFabLabel").textContent = has ? "Instalar versión " + remoteVersion : "Buscar actualizaciones";
      $("#updateFabSub").textContent = has ? "Hay novedades disponibles" : "Versión " + APP_VERSION + " instalada";
      updateFab.title = has ? "Hay una versión nueva (" + remoteVersion + "). Toca para instalarla." : "Buscar actualizaciones (versión " + APP_VERSION + ")";
      return has;
    }).catch(function () { if (manual) toast("Sin conexión: no se pudo comprobar", "📡"); return false; });
  }
  function applyUpdate() {
    if (updating) return; updating = true;
    updateFab.classList.add("busy"); $("#updateFabLabel").textContent = "Actualizando…";
    var steps = [];
    if (window.caches) steps.push(caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); }));
    if ("serviceWorker" in navigator) steps.push(navigator.serviceWorker.getRegistration().then(function (reg) { return reg ? reg.update().catch(function () { }) : null; }));
    Promise.all(steps).then(function () { location.reload(); }, function () { location.reload(); });
  }
  updateFab.addEventListener("click", function () {
    checkUpdate(true).then(function (has) {
      if (has) applyUpdate();
      else if (canUpdate() && remoteVersion) toast("Ya tienes la última versión (" + APP_VERSION + ")", "✅");
    });
  });
  if (canUpdate()) {
    updateFab.style.display = "";
    $("#updateFabSub").textContent = "Versión " + APP_VERSION + " instalada";
    setTimeout(function () { checkUpdate(false); }, 2500);
    setInterval(function () { checkUpdate(false); }, 15 * 60 * 1000);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) checkUpdate(false); });
  }

  /* ---------------- PWA: instalación y modo sin conexión ---------------- */
  var deferredInstall = null, isStandalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () { }); });
  }
  addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferredInstall = e; $("#installBtn").style.display = ""; });
  addEventListener("appinstalled", function () { $("#installBtn").style.display = "none"; toast("App instalada. Ya funciona sin conexión.", "📲"); });
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (isIOS && !isStandalone && /^https:$/.test(location.protocol)) $("#installBtn").style.display = "";
  $("#installBtn").addEventListener("click", function () {
    if (deferredInstall) { deferredInstall.prompt(); deferredInstall.userChoice.then(function () { deferredInstall = null; }); return; }
    openModal("<div class='row between'><h3 style='margin:0'>📲 Instalar en tu móvil</h3><button class='icon-btn' data-act='closeModal'>✕</button></div>" +
      "<p class='muted' style='font-size:14px'><b>iPhone (Safari):</b> toca el botón Compartir ⬆️ → <b>Añadir a pantalla de inicio</b>.</p>" +
      "<p class='muted' style='font-size:14px'><b>Android (Chrome/Brave):</b> menú ⋮ → <b>Instalar aplicación</b> o <b>Añadir a pantalla de inicio</b>.</p>" +
      "<p class='muted' style='font-size:13px'>Una vez instalada funciona sin conexión. Tu progreso se guarda en el dispositivo: usa Backup para pasarlo entre PC y móvil.</p>");
  });

  /* ---------------- Inicio ---------------- */
  if (!S.rankIdx) { S.rankIdx = rank().lvl; save(); }
  dailyXp();
  buildIndex();
  render();
  if (!S.prefs.onboarded) setTimeout(function () { askName(true); }, 700);
  else if (!S.days.length) setTimeout(function () { toast("Pulsa <b>Ctrl+K</b> para buscar cualquier cosa.", "🏰"); }, 900);
})();
