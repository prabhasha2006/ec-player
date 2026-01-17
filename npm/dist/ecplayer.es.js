import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { forwardRef as Oe, createElement as Ie, useState as f, useRef as y, useEffect as C } from "react";
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const We = (i) => i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Qe = (i) => i.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (c, g, h) => h ? h.toUpperCase() : g.toLowerCase()
), _e = (i) => {
  const c = Qe(i);
  return c.charAt(0).toUpperCase() + c.slice(1);
}, Ve = (...i) => i.filter((c, g, h) => !!c && c.trim() !== "" && h.indexOf(c) === g).join(" ").trim(), Ge = (i) => {
  for (const c in i)
    if (c.startsWith("aria-") || c === "role" || c === "title")
      return !0;
};
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ke = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = Oe(
  ({
    color: i = "currentColor",
    size: c = 24,
    strokeWidth: g = 2,
    absoluteStrokeWidth: h,
    className: q = "",
    children: m,
    iconNode: x,
    ...v
  }, P) => Ie(
    "svg",
    {
      ref: P,
      ...Ke,
      width: c,
      height: c,
      stroke: i,
      strokeWidth: h ? Number(g) * 24 / Number(c) : g,
      className: Ve("lucide", q),
      ...!m && !Ge(v) && { "aria-hidden": "true" },
      ...v
    },
    [
      ...x.map(([T, U]) => Ie(T, U)),
      ...Array.isArray(m) ? m : [m]
    ]
  )
);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ce = (i, c) => {
  const g = Oe(
    ({ className: h, ...q }, m) => Ie(Xe, {
      ref: m,
      iconNode: c,
      className: Ve(
        `lucide-${We(_e(i))}`,
        `lucide-${i}`,
        h
      ),
      ...q
    })
  );
  return g.displayName = _e(i), g;
};
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ze = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], Ye = ce("maximize", Ze);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
], et = ce("minimize", Je);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tt = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], Re = ce("pause", tt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rt = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Fe = ce("play", rt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nt = [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
], at = ce("repeat", nt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const st = [
  ["line", { x1: "4", x2: "4", y1: "21", y2: "14", key: "1p332r" }],
  ["line", { x1: "4", x2: "4", y1: "10", y2: "3", key: "gb41h5" }],
  ["line", { x1: "12", x2: "12", y1: "21", y2: "12", key: "hf2csr" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "3", key: "1kfi7u" }],
  ["line", { x1: "20", x2: "20", y1: "21", y2: "16", key: "1lhrwl" }],
  ["line", { x1: "20", x2: "20", y1: "12", y2: "3", key: "16vvfq" }],
  ["line", { x1: "2", x2: "6", y1: "14", y2: "14", key: "1uebub" }],
  ["line", { x1: "10", x2: "14", y1: "8", y2: "8", key: "1yglbp" }],
  ["line", { x1: "18", x2: "22", y1: "16", y2: "16", key: "1jxqpz" }]
], Ae = ce("sliders-vertical", st);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lt = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], Ue = ce("square", lt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const it = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], ct = ce("upload", it);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ot = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], He = ce("volume-2", ot);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dt = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
], De = ce("volume-x", dt), be = {
  rainbow: {
    name: "Rainbow",
    bg: "linear-gradient(135deg, #ef444422 0%, #f9731622 15%, #f59e0b22 30%, #10b98122 45%, #06b6d422 60%, #3b82f622 75%, #6366f122 85%, #a855f722 92%, #ec489922 100%)",
    bars: [
      "#ef4444",
      "#f97316",
      "#f59e0b",
      "#eab308",
      "#84cc16",
      "#22c55e",
      "#10b981",
      "#06b6d4",
      "#0ea5e9",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#d946ef",
      "#ec4899",
      "#f43f5e"
    ],
    peak: "#a0a0a0ff",
    button: "#ec4899",
    buttonHover: "#d946ef",
    slider: "#ec4899"
  },
  ocean: {
    name: "Ocean Blue",
    bg: "linear-gradient(135deg, #667eea43 0%, #764ba243 100%)",
    bars: ["#0ea5e9", "#38bdf8", "#06b6d4", "#22d3ee"],
    peak: "#0369a1",
    button: "#0ea5e9",
    buttonHover: "#0284c7",
    slider: "#0ea5e9"
  },
  sunset: {
    name: "Sunset",
    bg: "linear-gradient(135deg, #f093fb43 0%, #f5576c43 100%)",
    bars: ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3"],
    peak: "#be123c",
    button: "#f43f5e",
    buttonHover: "#e11d48",
    slider: "#f43f5e"
  },
  forest: {
    name: "Forest Green",
    bg: "linear-gradient(135deg, #0ba36043 0%, #3cba9243 100%)",
    bars: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
    peak: "#047857",
    button: "#10b981",
    buttonHover: "#059669",
    slider: "#10b981"
  },
  midnight: {
    name: "Midnight",
    bg: "linear-gradient(135deg, #2c3e5043 0%, #3498db43 100%)",
    bars: ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"],
    peak: "#1e40af",
    button: "#3b82f6",
    buttonHover: "#2563eb",
    slider: "#3b82f6"
  },
  neon: {
    name: "Neon Cyan",
    bg: "linear-gradient(135deg, #13547a43 0%, #80d0c743 100%)",
    bars: ["#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"],
    peak: "#0e7490",
    button: "#06b6d4",
    buttonHover: "#0891b2",
    slider: "#06b6d4"
  },
  purple: {
    name: "Royal Purple",
    bg: "linear-gradient(135deg, #2f1c5622 0%, #764ba243 100%)",
    bars: ["#8b5cf6", "#a78bfa", "#baabf9ff", "#ddd6fe"],
    peak: "#6d28d9",
    button: "#8b5cf6",
    buttonHover: "#7c3aed",
    slider: "#8b5cf6"
  },
  amber: {
    name: "Amber Gold",
    bg: "linear-gradient(135deg, #f59e0b43 0%, #d9770643 100%)",
    bars: ["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"],
    peak: "#b45309",
    button: "#f59e0b",
    buttonHover: "#d97706",
    slider: "#f59e0b"
  },
  rose: {
    name: "Rose Pink",
    bg: "linear-gradient(135deg, #ec489943 0%, #be185d43 100%)",
    bars: ["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8"],
    peak: "#9f1239",
    button: "#ec4899",
    buttonHover: "#db2777",
    slider: "#ec4899"
  }
};
function ut({ theme: i, setTheme: c, close: g }) {
  const h = Object.keys(be).map((q) => ({
    key: q,
    name: be[q].name,
    colors: be[q].bars
  }));
  return /* @__PURE__ */ r("div", { className: "container-glass rounded-xl p-6 mb-6", children: [
    /* @__PURE__ */ r("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-gray-800", children: "Choose Color Palette" }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => g(),
          className: "text-gray-500 hover:text-gray-700 text-sm font-medium",
          children: "Close"
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "theme-selector grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: h.map((q) => /* @__PURE__ */ r(
      "div",
      {
        className: `theme-card bg-white p-4 rounded-lg cursor-pointer border-2 transition-all ${i === q.key ? "border-current shadow-lg" : "border-transparent"}`,
        onClick: () => c(q.key),
        children: [
          /* @__PURE__ */ e("div", { className: "color-preview h-10 rounded mb-2", style: { background: `linear-gradient(to right, ${q.colors.join(", ")})` } }),
          /* @__PURE__ */ e("div", { className: "text-sm font-medium text-gray-700", children: q.name })
        ]
      },
      q.key
    )) })
  ] });
}
function gt({
  audio: i,
  name: c = "No track loaded",
  author: g,
  theme: h = "rainbow",
  volume: q = 100,
  thumbnail: m = null,
  controls: x = {
    play: !0,
    pause: !0,
    stop: !0,
    seekbar: !0,
    volume: !0,
    loop: !0,
    trackName: !0,
    equalizer: !0,
    speed: !0
  },
  mode: v = "light",
  bands: P = null,
  transparent: T = !1,
  autoPlay: U = !1,
  equalizer: I = {
    bass: 0,
    mid: 0,
    treble: 0
  }
}) {
  const [M, _] = f(!1), [H, z] = f(0), [S, N] = f(0), [E, oe] = f(q || 100), [ae, fe] = f(!1), [Q, G] = f(!1), [se, le] = f(!1), [O, de] = f([]), [R, F] = f(!1), [j, ie] = f({
    bass: I.bass || 0,
    mid: I.mid || 0,
    treble: I.treble || 0
  }), [ue, ee] = f(1), [K, k] = f(0), u = y(null), A = y(null), X = y(null), me = y(null), V = y(null), te = y(null), Z = y(null), $ = y(null), re = y(null), Y = y(null);
  C(() => {
    const t = Y.current;
    if (!t) return;
    const n = new ResizeObserver((s) => {
      for (let l of s)
        k(l.contentRect.width);
    });
    return n.observe(t), () => n.disconnect();
  }, []), C(() => {
    const t = [];
    if (i && typeof i != "string" && t.push(["TypeError", "audio must be a string (URL or path)"]), c && typeof c != "string" && t.push(["TypeError", "name must be a string"]), h && typeof h != "string" && typeof h != "object")
      t.push(["TypeError", "theme must be a string or a valid theme object"]);
    else if (typeof h == "object") {
      const n = ["name", "bg", "bars", "peak", "button", "buttonHover", "slider"];
      for (const s of n)
        s in h || t.push(["ThemeError", `theme object missing key: ${s}`]);
    }
    (typeof q != "number" || q < 0 || q > 100) && t.push(["TypeError", "volume must be a number between 0 and 100"]), typeof x != "object" || Array.isArray(x) ? t.push(["TypeError", "controls must be an object"]) : ["play", "pause", "stop", "seekbar", "volume", "loop", "trackName", "equalizer"].forEach((s) => {
      x && s in x && typeof x[s] != "boolean" && t.push(["TypeError", `controls.${s} must be a boolean`]);
    }), P && (Array.isArray(P) ? P.length === 0 ? t.push(["ValueError", "bands array cannot be empty"]) : P.forEach((n, s) => {
      typeof n.freq != "number" && t.push(["TypeError", `bands[${s}].freq must be a number`]);
    }) : t.push(["TypeError", "bands must be an array"])), t.length > 0 ? (de(t), console.group("%cVisualizePlayer: Prop validation failed", "color:red"), t.forEach((n) => console.error(`${n[0]}: ${n[1]}`)), console.groupEnd()) : de([]);
  }, [i, c, h, q, x, v, P]);
  const a = P || [
    { freq: 0 },
    { freq: 10 },
    { freq: 20 },
    { freq: 25 },
    { freq: 31.5 },
    { freq: 40 },
    { freq: 50 },
    { freq: 63 },
    { freq: 80 },
    { freq: 100 },
    { freq: 125 },
    { freq: 160 },
    { freq: 200 },
    { freq: 250 },
    { freq: 315 },
    { freq: 400 },
    { freq: 500 },
    { freq: 630 },
    { freq: 800 },
    { freq: 1e3 },
    { freq: 1250 },
    { freq: 1600 },
    { freq: 2e3 },
    { freq: 2500 },
    { freq: 3150 },
    { freq: 4e3 },
    { freq: 5e3 },
    { freq: 6300 },
    { freq: 8e3 },
    { freq: 1e4 },
    { freq: 12500 }
  ], d = y(a.map(() => 0)), b = y(a.map(() => 0)), B = y(a.map(() => 0)), D = y(!1), J = y(typeof h == "string" ? h : "purple");
  let o = typeof h == "string" ? be[h] || be.purple : typeof h == "object" ? h : be.purple;
  const p = v === "dark", ge = typeof x == "object" && Object.keys(x).length === 0;
  C(() => {
    typeof h == "string" ? J.current = h : J.current = "purple", he();
  }, [h]), C(() => {
    u.current || (u.current = new Audio());
    const t = u.current, n = () => {
      se || z(t.currentTime);
    }, s = () => {
      N(t.duration);
    }, l = () => {
      Q || (_(!1), $.current && cancelAnimationFrame($.current));
    }, w = () => _(!0), L = () => _(!1);
    return t.addEventListener("timeupdate", n), t.addEventListener("loadedmetadata", s), t.addEventListener("ended", l), t.addEventListener("play", w), t.addEventListener("pause", L), () => {
      t.removeEventListener("timeupdate", n), t.removeEventListener("loadedmetadata", s), t.removeEventListener("ended", l), t.removeEventListener("play", w), t.removeEventListener("pause", L);
    };
  }, [se, Q]), C(() => () => {
    u.current && (u.current.pause(), u.current.src = "", u.current.load()), A.current && A.current.close().catch((t) => console.warn("AudioContext cleanup error:", t)), $.current && cancelAnimationFrame($.current);
  }, []), C(() => {
    if (i) {
      const t = M, n = E, s = Q;
      if ($.current && (cancelAnimationFrame($.current), $.current = null), me.current) {
        try {
          me.current.disconnect();
        } catch (W) {
          console.warn("Source disconnect error:", W);
        }
        me.current = null;
      }
      if (X.current) {
        try {
          X.current.disconnect();
        } catch (W) {
          console.warn("Analyser disconnect error:", W);
        }
        X.current = null;
      }
      if (V.current) {
        try {
          V.current.disconnect();
        } catch (W) {
          console.warn("Bass filter disconnect error:", W);
        }
        V.current = null;
      }
      if (te.current) {
        try {
          te.current.disconnect();
        } catch (W) {
          console.warn("Mid filter disconnect error:", W);
        }
        te.current = null;
      }
      if (Z.current) {
        try {
          Z.current.disconnect();
        } catch (W) {
          console.warn("Treble filter disconnect error:", W);
        }
        Z.current = null;
      }
      A.current && (A.current.close().catch((W) => console.warn("AudioContext close error:", W)), A.current = null), u.current && (u.current.pause(), u.current.src = "", u.current.load()), u.current = new Audio();
      try {
        u.current.crossOrigin = "anonymous";
      } catch (W) {
        console.debug("Could not set crossOrigin on audio element", W);
      }
      u.current.src = i, u.current.preload = "auto", u.current.muted = !1, u.current.volume = ae ? 0 : n / 100, u.current.loop = s, u.current.load();
      const l = u.current, w = () => {
        se || z(l.currentTime);
      }, L = () => {
        N(l.duration);
      }, ne = () => {
        Q || (_(!1), $.current && cancelAnimationFrame($.current));
      }, xe = () => _(!0), Ce = () => _(!1);
      l.addEventListener("timeupdate", w), l.addEventListener("loadedmetadata", L), l.addEventListener("ended", ne), l.addEventListener("play", xe), l.addEventListener("pause", Ce), z(0), _(!1), console.debug("Audio element created", { src: u.current.src, volume: u.current.volume, loop: u.current.loop }), d.current = a.map(() => 0), b.current = a.map(() => 0), B.current = a.map(() => 0), he(), t && u.current.play().catch((W) => console.error("Play failed:", W));
    }
  }, [i]), C(() => {
    u.current && (u.current.volume = ae ? 0 : E / 100);
  }, [E, ae]), C(() => {
    u.current && (u.current.loop = Q);
  }, [Q]), C(() => {
    u.current && (u.current.playbackRate = ue);
  }, [ue]), C(() => {
    A.current && (V.current && (V.current.gain.value = j.bass), te.current && (te.current.gain.value = j.mid), Z.current && (Z.current.gain.value = j.treble));
  }, [j]), C(() => {
    D.current = M, $.current && (cancelAnimationFrame($.current), $.current = null), M ? (A.current || qe(), ke()) : pe();
  }, [M]);
  const qe = () => {
    if (!A.current && u.current)
      try {
        const t = window.AudioContext || window.webkitAudioContext;
        if (t) {
          const n = new t();
          A.current = n;
          const s = n.createBiquadFilter();
          s.type = "lowshelf", s.frequency.value = 320, s.gain.value = j.bass;
          const l = n.createBiquadFilter();
          l.type = "peaking", l.frequency.value = 1e3, l.Q.value = 0.5, l.gain.value = j.mid;
          const w = n.createBiquadFilter();
          w.type = "highshelf", w.frequency.value = 3200, w.gain.value = j.treble;
          const L = n.createAnalyser();
          L.fftSize = 8192, L.smoothingTimeConstant = 0.7;
          const ne = n.createMediaElementSource(u.current);
          ne.connect(s), s.connect(l), l.connect(w), w.connect(L), L.connect(n.destination), V.current = s, te.current = l, Z.current = w, X.current = L, me.current = ne;
        }
      } catch (t) {
        console.error("Failed to setup audio context:", t);
      }
  }, we = (t) => {
    const n = A.current, s = X.current;
    if (!n || !s) return 0;
    const l = n.sampleRate / 2, w = Math.round(t / l * s.frequencyBinCount);
    return Math.min(w, s.frequencyBinCount - 1);
  }, pe = () => {
    if (D.current) return;
    d.current = d.current.map((l) => l * 0.7);
    const t = Date.now();
    b.current = b.current.map((l, w) => t - B.current[w] > 1500 ? l * 0.95 : l), he();
    const n = Math.max(...d.current), s = Math.max(...b.current);
    n > 0.01 || s > 0.01 ? $.current = requestAnimationFrame(pe) : (D.current || (d.current = a.map(() => 0), b.current = a.map(() => 0), B.current = a.map(() => 0), he()), $.current && cancelAnimationFrame($.current), $.current = null);
  }, ke = () => {
    if (!X.current || !D.current) return;
    const t = X.current.frequencyBinCount, n = new Uint8Array(t);
    X.current.getByteFrequencyData(n), a.forEach((s, l) => {
      const w = we(s.freq), L = l < a.length - 1 ? we(a[l + 1].freq) : n.length;
      let ne = 0, xe = 0;
      for (let Be = w; Be < L; Be++)
        ne += n[Be], xe++;
      let Ce = xe > 0 ? ne / xe / 255 : 0;
      Ce = Math.pow(Ce, 0.6), d.current[l] = d.current[l] * 0.8 + Ce * 0.2;
      const W = Date.now();
      d.current[l] > b.current[l] ? (b.current[l] = d.current[l], B.current[l] = W) : W - B.current[l] > 1500 && (b.current[l] *= 0.95);
    }), he(), $.current = requestAnimationFrame(ke);
  }, he = () => {
    if (!re.current) return;
    const t = be[J.current] || be.rainbow;
    let n = "";
    a.forEach((s, l) => {
      const w = d.current[l] * 100, L = 100 - b.current[l] * 100, ne = Math.floor(l / a.length * t.bars.length), xe = t.bars[Math.min(ne, t.bars.length - 1)];
      n += `
                <div class="flex-1 h-full relative flex flex-col justify-end">
                    <div class="rounded-t transition-all duration-75" style="height: ${w}%; background: ${xe};">
                        ${b.current[l] > 0.1 ? `<div class="absolute w-full h-0.5 transition-all duration-100" style="top: ${L}%; background: ${t.peak};"></div>` : ""}
                    </div>
                </div>
            `;
    }), re.current.innerHTML = n;
  }, Ee = () => {
    !u.current || !i || (M ? u.current.pause() : (A.current && A.current.state === "suspended" && A.current.resume(), u.current.play().catch((t) => console.error("Play failed:", t))));
  }, Te = () => {
    u.current && (u.current.pause(), u.current.currentTime = 0, _(!1), z(0), d.current = a.map(() => 0), b.current = a.map(() => 0), B.current = a.map(() => 0), he());
  }, Le = (t) => {
    const s = parseFloat(t.target.value) / 100 * S;
    z(s), u.current && !se && (u.current.currentTime = s);
  }, Pe = () => {
    le(!0);
  }, Me = () => {
    u.current && (u.current.currentTime = H), le(!1);
  }, je = (t) => {
    const n = parseInt(t.target.value);
    oe(n), fe(n === 0);
  }, ze = () => {
    fe(!ae);
  }, Ne = (t) => {
    ee(parseFloat(t.target.value));
  }, Se = () => {
    G(!Q);
  }, ve = (t, n) => {
    ie((s) => ({
      ...s,
      [t]: n
    }));
  }, ye = () => {
    ie({ bass: 0, mid: 0, treble: 0 });
  };
  C(() => {
    ((typeof x == "object" && Object.keys(x).length === 0 || !x) && !M || U) && Ee();
  }, [x]);
  const $e = (t) => {
    if (isNaN(t)) return "0:00";
    const n = Math.floor(t / 60), s = Math.floor(t % 60);
    return `${n}:${s.toString().padStart(2, "0")}`;
  };
  return O && O.length > 0 ? O.map((t, n) => /* @__PURE__ */ r("div", { className: "text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300", children: [
    /* @__PURE__ */ r("strong", { children: [
      t[0],
      ":"
    ] }),
    " ",
    t[1]
  ] }, n)) : /* @__PURE__ */ e("div", { ref: Y, className: "w-full rounded-xl overflow-hidden", style: { backgroundColor: ge || T ? void 0 : p ? "#6060606a" : "#ffffffab" }, children: /* @__PURE__ */ r("div", { style: { background: ge || T ? void 0 : o.bg }, className: ge || T ? "" : "p-4", children: [
    /* @__PURE__ */ r("div", { className: "relative", children: [
      /* @__PURE__ */ e("div", { className: `${T && R ? "opacity-30" : ""} ${ge || T ? "" : p ? "bg-black/40" : "bg-white/70"} rounded-lg ${ge ? "" : "mb-6"} ${ge || T ? "" : "p-4"} shadow-sm`, children: /* @__PURE__ */ e("div", { className: "flex justify-center items-end gap-1 h-64", ref: re }) }),
      R && /* @__PURE__ */ r("div", { className: `absolute inset-0 flex flex-col w-full justify-center z-10 ${!(ge || T) && (p ? "bg-black/50" : "bg-white/80")} rounded-lg p-4 shadow-sm transition-all duration-300`, children: [
        /* @__PURE__ */ e("h3", { className: `text-sm font-medium mb-4 ${p ? "text-gray-200" : "text-gray-700"}`, children: "Equalizer" }),
        /* @__PURE__ */ r("div", { className: "space-y-4", children: [
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-300" : "text-gray-600"}`, children: "Bass" }),
              /* @__PURE__ */ r("span", { className: `text-xs ${p ? "text-gray-300" : "text-gray-600"}`, children: [
                j.bass,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: j.bass,
                  onChange: (t) => ve("bass", parseInt(t.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${o.slider} ${(j.bass + 20) / 40 * 100}%, ${o.slider + "30"} ${(j.bass + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] }),
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-300" : "text-gray-600"}`, children: "Mid" }),
              /* @__PURE__ */ r("span", { className: `text-xs ${p ? "text-gray-300" : "text-gray-600"}`, children: [
                j.mid,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: j.mid,
                  onChange: (t) => ve("mid", parseInt(t.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${o.slider} ${(j.mid + 20) / 40 * 100}%, ${o.slider + "30"} ${(j.mid + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] }),
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-300" : "text-gray-600"}`, children: "Treble" }),
              /* @__PURE__ */ r("span", { className: `text-xs ${p ? "text-gray-300" : "text-gray-600"}`, children: [
                j.treble,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: j.treble,
                  onChange: (t) => ve("treble", parseInt(t.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${o.slider} ${(j.treble + 20) / 40 * 100}%, ${o.slider + "30"} ${(j.treble + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ e(
          "button",
          {
            onClick: ye,
            className: `px-3 py-1 rounded text-xs ${p ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
            children: "Reset"
          }
        ) })
      ] })
    ] }),
    x.trackName && /* @__PURE__ */ r("div", { className: "mb-6 flex items-center", children: [
      m && /* @__PURE__ */ e("div", { className: "mr-2", children: /* @__PURE__ */ e("img", { src: m, alt: "", className: `${M ? "animation-spin" : ""} h-12 w-12 rounded-full` }) }),
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("div", { className: `${p ? "text-gray-100" : "text-gray-700"} font-medium truncate`, children: c }),
        g && typeof g == "string" && /* @__PURE__ */ e("div", { className: `${p ? "text-gray-300" : "text-gray-500"} text-xs`, children: g })
      ] })
    ] }),
    x.seekbar && /* @__PURE__ */ e("div", { className: "mb-6", children: /* @__PURE__ */ r("div", { className: "flex items-center md:gap-1", children: [
      /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-100" : "text-gray-600"} font-mono w-12`, children: $e(H) }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "range",
          min: "0",
          max: "100",
          value: S > 0 ? H / S * 100 : 0,
          onChange: Le,
          onMouseDown: Pe,
          onMouseUp: Me,
          onTouchStart: Pe,
          onTouchEnd: Me,
          disabled: !i,
          className: "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
          style: {
            background: i && S > 0 ? `linear-gradient(to right, ${o.slider} ${H / S * 100}%, ${o.slider + "30"} ${H / S * 100}%)` : o.slider + "30"
          }
        }
      ),
      /* @__PURE__ */ e("span", { className: `text-xs ${p ? "text-gray-100" : "text-gray-600"} font-mono w-12 text-right`, children: $e(S) })
    ] }) }),
    /* @__PURE__ */ r("div", { className: `flex flex-wrap items-center ${K < 330 ? "gap-2" : "gap-3"}`, children: [
      x.play && /* @__PURE__ */ r(
        "button",
        {
          onClick: Ee,
          disabled: !i,
          className: `${K < 350 ? "px-3 py-5" : "px-4 py-2 md:w-24"} rounded-full text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:opacity-90`,
          style: { backgroundColor: o.button },
          children: [
            /* @__PURE__ */ r("div", { className: "relative w-4 flex items-center", children: [
              /* @__PURE__ */ e(Re, { size: 16, className: `${M ? "" : "scale-0 translate-y-10"} transition-all absolute` }),
              /* @__PURE__ */ e(Fe, { size: 16, className: `${M ? "scale-0 -translate-y-10" : ""} transition-all absolute` })
            ] }),
            /* @__PURE__ */ e("span", { style: { display: K < 350 ? "none" : "block" }, children: M ? "Pause" : "Play" })
          ]
        }
      ),
      x.stop && /* @__PURE__ */ r(
        "button",
        {
          onClick: Te,
          disabled: !i,
          className: `${p ? "bg-gray-100 text-black" : "bg-gray-700 text-white"} ${K < 600 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium ${p ? "hover:bg-gray-300" : "hover:bg-gray-800"} disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
          children: [
            /* @__PURE__ */ e(Ue, { size: 16 }),
            /* @__PURE__ */ e("span", { style: { display: K < 600 ? "none" : "block" }, children: "Stop" })
          ]
        }
      ),
      x.equalizer && /* @__PURE__ */ r(
        "button",
        {
          onClick: () => F(!R),
          disabled: !i,
          className: `${K < 600 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${R ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
          style: R ? { backgroundColor: o.button } : {},
          children: [
            /* @__PURE__ */ e(Ae, { size: 16 }),
            /* @__PURE__ */ e("span", { style: { display: K < 600 ? "none" : "block" }, children: "EQ" })
          ]
        }
      ),
      x.loop && /* @__PURE__ */ r(
        "button",
        {
          onClick: Se,
          disabled: !i,
          className: `${K < 700 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${Q ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
          style: Q ? { backgroundColor: o.button } : {},
          children: [
            /* @__PURE__ */ e(at, { size: 16, className: `${Q ? "rotate-180" : ""} transition-all` }),
            /* @__PURE__ */ e("span", { style: { display: K < 700 ? "none" : "block" }, children: "Loop" })
          ]
        }
      ),
      x.speed && /* @__PURE__ */ e("div", { className: "flex items-center", children: /* @__PURE__ */ r(
        "select",
        {
          value: ue,
          onChange: Ne,
          className: `rounded-full text-sm font-medium border-none outline-none cursor-pointer transition-all bg-transparent ${p ? "text-gray-200" : "text-gray-800"}`,
          children: [
            /* @__PURE__ */ e("option", { value: "0.5", className: p ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "0.5x" }),
            /* @__PURE__ */ e("option", { value: "0.75", className: p ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "0.75x" }),
            /* @__PURE__ */ e("option", { value: "1", className: p ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "1x" }),
            /* @__PURE__ */ e("option", { value: "1.25", className: p ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "1.25x" }),
            /* @__PURE__ */ e("option", { value: "1.5", className: p ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "1.5x" }),
            /* @__PURE__ */ e("option", { value: "2", className: p ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "2x" })
          ]
        }
      ) }),
      x.volume && /* @__PURE__ */ r("div", { className: "flex items-center gap-1 md:gap-3 ml-auto", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: ze,
            className: "p-2 rounded-full hover:bg-gray-100/50 transition-all",
            children: ae || E === 0 ? /* @__PURE__ */ e(De, { size: 20, className: p ? "text-gray-100" : "text-gray-600" }) : /* @__PURE__ */ e(He, { size: 20, className: p ? "text-gray-100" : "text-gray-600" })
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: "0",
            max: "100",
            value: E,
            onChange: je,
            className: "hide-for-xs w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
            style: {
              background: `linear-gradient(to right, ${o.slider} ${E}%, ${o.slider + "30"} ${E}%)`,
              display: K < 460 ? "none" : "block"
            }
          }
        ),
        /* @__PURE__ */ r("span", { style: { display: K < 800 ? "none" : "block" }, className: `hidden sm:block text-xs ${p ? "text-gray-100" : "text-gray-700"} font-mono w-10 text-right`, children: [
          E,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("style", { children: `
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: ${o.slider};
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                
                input[type="range"]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: ${o.slider};
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                input[type="range"].eq-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 0;
                    height: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }
                input[type="range"].eq-slider::-moz-range-thumb {
                    width: 0;
                    height: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }
                .hide-for-xs {
                    display: flex;
                }
                @media (max-width: 480px) {
                    .hide-for-xs {
                        display: none;
                    }
                }
                .animation-spin {
                    animation: spin 15s infinite linear;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg)
                    }
                }
            ` })
  ] }) });
}
function ft({
  audio: i,
  gradient: c = ["#cd7eff", "#ff00f2"],
  background: g = "#f4e4ffff",
  autoPlay: h = !1,
  thumbnail: q = null,
  width: m,
  equalizer: x = {
    bass: 0,
    mid: 0,
    treble: 0
  },
  mode: v = "light"
}) {
  const [P, T] = f(!1), [U, I] = f(0), [M, _] = f(0), [H, z] = f(!1), [S, N] = f(80), [E, oe] = f(1), [ae, fe] = f([]), [Q, G] = f(null), [se, le] = f(!1), [O, de] = f({
    bass: x.bass || 0,
    mid: x.mid || 0,
    treble: x.treble || 0
  }), R = y(null), F = y(null), j = y(null), ie = y(null), ue = y(null), ee = y(null), K = () => {
    const a = [];
    for (let d = 0; d < 100; d++) {
      const b = 20 + Math.random() * 60;
      a.push(b);
    }
    return a;
  };
  C(() => {
    if (!i)
      return;
    if (!Array.isArray(c) || c.length < 2) {
      G("Gradient must be an array with at least 2 colors");
      return;
    }
    const a = R.current;
    if (!a) return;
    const d = () => I(a.currentTime), b = () => {
      _(a.duration), fe(K());
    }, B = () => T(!1), D = (J) => {
      var o, p;
      G(`Audio error: ${((p = (o = J.target) == null ? void 0 : o.error) == null ? void 0 : p.message) || "Failed to load audio"}`);
    };
    return a.addEventListener("timeupdate", d), a.addEventListener("loadedmetadata", b), a.addEventListener("ended", B), a.addEventListener("error", D), () => {
      a.removeEventListener("timeupdate", d), a.removeEventListener("loadedmetadata", b), a.removeEventListener("ended", B), a.removeEventListener("error", D);
    };
  }, [i, c, v]), C(() => {
    i && R.current && h && (R.current.play().catch((a) => {
      console.error("Play failed:", a), T(!1);
    }), T(!0));
  }, [i]), C(() => {
    if (R.current && !F.current && R.current) {
      const a = window.AudioContext || window.webkitAudioContext;
      if (a) {
        const d = new a();
        F.current = d;
        const b = d.createMediaElementSource(R.current);
        j.current = b;
        const B = d.createBiquadFilter();
        B.type = "lowshelf", B.frequency.value = 200, ie.current = B;
        const D = d.createBiquadFilter();
        D.type = "peaking", D.frequency.value = 1e3, D.Q.value = 1, ue.current = D;
        const J = d.createBiquadFilter();
        J.type = "highshelf", J.frequency.value = 3e3, ee.current = J, b.connect(B).connect(D).connect(J).connect(d.destination);
      }
    }
  }, [i]), C(() => {
    R.current && (R.current.volume = H ? 0 : S / 100);
  }, [S, H]), C(() => {
    R.current && (R.current.playbackRate = E);
  }, [E]);
  const k = () => {
    R.current && (P ? R.current.pause() : R.current.play().catch((a) => {
      G(`Playback failed: ${a instanceof Error ? a.message : String(a)}`);
    }), T(!P));
  }, u = () => {
    z(!H);
  }, A = (a) => {
    N(parseInt(a.target.value)), H && parseInt(a.target.value) > 0 && z(!1);
  }, X = (a) => {
    oe(parseFloat(a.target.value));
  }, me = (a) => {
    const d = a.currentTarget.getBoundingClientRect(), D = (a.clientX - d.left) / d.width * M;
    R.current && (R.current.currentTime = D, I(D));
  }, V = (a, d) => {
    de((b) => ({ ...b, [a]: d })), a === "bass" && ie.current && (ie.current.gain.value = d), a === "mid" && ue.current && (ue.current.gain.value = d), a === "treble" && ee.current && (ee.current.gain.value = d);
  }, te = () => {
    V("bass", 0), V("mid", 0), V("treble", 0);
  }, Z = (a) => {
    if (isNaN(a)) return "0:00";
    const d = Math.floor(a / 60), b = Math.floor(a % 60);
    return `${d}:${b.toString().padStart(2, "0")}`;
  }, $ = M > 0 ? U / M * 100 : 0;
  if (Q)
    return /* @__PURE__ */ e("div", { className: "w-lg p-6 rounded-xl", style: { background: g }, children: /* @__PURE__ */ r("div", { className: `text-center ${v === "dark" ? "text-red-300" : "text-red-600"}`, children: [
      /* @__PURE__ */ e("p", { className: "font-medium", children: "Error" }),
      /* @__PURE__ */ e("p", { className: "text-sm", children: Q })
    ] }) });
  if (!i) return null;
  const re = v === "dark" ? "text-gray-300" : "text-gray-700", Y = v === "dark" ? "text-gray-400" : "text-gray-500";
  return /* @__PURE__ */ r("div", { className: "w-full max-w-lg relative", style: { width: m + "px" }, children: [
    /* @__PURE__ */ e("audio", { ref: R, src: i }),
    /* @__PURE__ */ e("div", { className: "rounded-2xl shadow-2xl", children: /* @__PURE__ */ r("div", { className: "rounded-2xl p-6 backdrop-blur-xl", style: { background: g }, children: [
      q && /* @__PURE__ */ e("div", { className: "w-full p-4", children: /* @__PURE__ */ e("img", { src: q, alt: "", className: "w-full aspect-square rounded-xl" }) }),
      /* @__PURE__ */ r(
        "div",
        {
          className: "relative h-20 mb-6 cursor-pointer",
          onClick: me,
          children: [
            /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-end justify-center h-full w-full gap-px", children: ae.map((a, d) => {
              const B = d / ae.length * 100 <= $;
              return /* @__PURE__ */ e(
                "div",
                {
                  className: "w-1 rounded-t transition-all duration-150",
                  style: {
                    height: `${a}%`,
                    background: B ? c[0] : c[1],
                    opacity: B ? 1 : 0.4
                  }
                },
                d
              );
            }) }),
            /* @__PURE__ */ e(
              "div",
              {
                className: "absolute top-0 h-full w-1 bg-white border-r border-black rounded-full transition-all duration-150",
                style: { left: `${$}%`, transform: "translateX(-50%)" }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ r("div", { className: `flex justify-between text-sm ${Y} mb-6`, children: [
        /* @__PURE__ */ e("span", { children: Z(U) }),
        /* @__PURE__ */ e("span", { children: Z(M) })
      ] }),
      /* @__PURE__ */ r("div", { className: "grid grid-cols-3 items-center justify-between mb-4", children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: u,
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${c[0]}, ${c[1]})`
              },
              children: H || S === 0 ? /* @__PURE__ */ e(De, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ e(He, { className: "w-4 h-4 text-white" })
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: S,
              onChange: A,
              className: `${m ? "" : "hidden sm:block"} w-20 h-1.5 rounded-lg appearance-none cursor-pointer`,
              style: {
                background: `linear-gradient(to right, ${c[0]} ${S}%, ${v === "dark" ? "#374151" : "#d1d5db"} ${S}%)`,
                display: m && m < 400 ? "none" : void 0
              }
            }
          ),
          m && m < 400 && /* @__PURE__ */ e("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ e(
            "button",
            {
              onClick: () => le(!se),
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${c[0]}, ${c[1]})`
              },
              children: /* @__PURE__ */ e(Ae, { className: "w-4 h-4 text-white" })
            }
          ) })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex justify-center", children: /* @__PURE__ */ e(
          "button",
          {
            onClick: k,
            className: "p-4 rounded-full transition-all hover:scale-105 shadow-lg",
            style: {
              background: `linear-gradient(135deg, ${c[0]}, ${c[1]})`
            },
            children: P ? /* @__PURE__ */ e(Re, { className: "w-6 h-6 text-white fill-white" }) : /* @__PURE__ */ e(Fe, { className: "w-6 h-6 text-white fill-white" })
          }
        ) }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ r(
            "select",
            {
              value: E,
              style: { background: g, color: c[0] },
              onChange: X,
              className: `py-1 px-2 rounded-lg text-sm ${re} ${v === "dark" ? "bg-gray-800" : "bg-gray-100"}`,
              children: [
                /* @__PURE__ */ e("option", { value: "0.5", children: "0.5x" }),
                /* @__PURE__ */ e("option", { value: "0.75", children: "0.75x" }),
                /* @__PURE__ */ e("option", { value: "1", children: "1x" }),
                /* @__PURE__ */ e("option", { value: "1.25", children: "1.25x" }),
                /* @__PURE__ */ e("option", { value: "1.5", children: "1.5x" }),
                /* @__PURE__ */ e("option", { value: "2", children: "2x" })
              ]
            }
          ) }),
          !(m && m < 400) && /* @__PURE__ */ e("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ e(
            "button",
            {
              onClick: () => le(!se),
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${c[0]}, ${c[1]})`
              },
              children: /* @__PURE__ */ e(Ae, { className: "w-4 h-4 text-white" })
            }
          ) })
        ] })
      ] })
    ] }) }),
    se && /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10 rounded-2xl p-4", children: /* @__PURE__ */ r("div", { className: `max-w-xs w-full p-4 pt-2 rounded-xl ${v === "dark" ? "bg-gray-800" : "bg-white"}`, children: [
      /* @__PURE__ */ e("h3", { className: `text-lg font-medium mb-2 ${v === "dark" ? "text-gray-200" : "text-gray-700"}`, children: "Equalizer" }),
      /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Bass" }),
            /* @__PURE__ */ r("span", { className: `text-xs ${v === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              O.bass,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: O.bass,
                onChange: (a) => V("bass", parseInt(a.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${c[0]} ${(O.bass + 20) / 40 * 100}%, ${c[1] + "30"} ${(O.bass + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Mid" }),
            /* @__PURE__ */ r("span", { className: `text-xs ${v === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              O.mid,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: O.mid,
                onChange: (a) => V("mid", parseInt(a.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${c[0]} ${(O.mid + 20) / 40 * 100}%, ${c[1] + "30"} ${(O.mid + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Treble" }),
            /* @__PURE__ */ r("span", { className: `text-xs ${v === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              O.treble,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: O.treble,
                onChange: (a) => V("treble", parseInt(a.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${c[0]} ${(O.treble + 20) / 40 * 100}%, ${c[1] + "30"} ${(O.treble + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e("span", { className: `text-xs ${v === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "flex justify-between mt-6", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: te,
            className: `px-3 py-1 rounded text-xs ${v === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
            children: "Reset"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => le(!1),
            className: `px-3 py-1 rounded text-xs ${v === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
            children: "Close"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e("style", { children: `
                input[type="range"].eq-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 0;
                    height: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }
                input[type="range"].eq-slider::-moz-range-thumb {
                    width: 0;
                    height: 0;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }
            ` })
  ] });
}
function mt({ audio: i, thumbnail: c, gradient: g = ["#cd7eff", "#fe59f6"], background: h = "#1f273a", autoPlay: q = !1 }) {
  const [m, x] = f(!1), [, v] = f(0), P = y(null), [T, U] = f(0), [I, M] = f(0), [_, H] = f(0);
  C(() => {
    const N = P.current;
    if (!N) return;
    const E = () => v(N.currentTime);
    return N.addEventListener("timeupdate", E), () => N.removeEventListener("timeupdate", E);
  }, []), C(() => {
    const N = setInterval(() => {
      m && U((E) => E + 0.1);
    }, 100);
    return () => clearInterval(N);
  }, [m]), C(() => {
    const N = setInterval(() => {
      m && H((E) => E + 0.1);
    }, 100);
    return () => clearInterval(N);
  }, [m]), C(() => {
    i && P.current && q && (P.current.play().catch(() => x(!1)), x(!0));
  }, [i]), C(() => {
    const N = P.current;
    if (!N) return;
    const E = () => {
      M(N.duration), console.log("Audio duration:", N.duration);
    };
    return H(0), N.addEventListener("loadedmetadata", E), () => {
      N.removeEventListener("loadedmetadata", E);
    };
  }, [i]);
  const z = () => {
    P.current && (m ? P.current.pause() : P.current.play().catch((N) => console.error("NanoPlayer play failed:", N)), x(!m));
  };
  if (!i) return null;
  const S = {
    background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`
  };
  return /* @__PURE__ */ r(
    "div",
    {
      style: { backgroundColor: h },
      className: `
                relative overflow-hidden inline-flex flex-col 
                ${c ? "rounded-2xl" : "rounded-full"} 
                px-3 py-2 shadow-lg
                ${c ? "w-[120px] h-[150px]" : "w-[110px] h-[40px]"}
            `,
      children: [
        /* @__PURE__ */ e(
          "audio",
          {
            ref: P,
            src: i,
            onEnded: () => {
              x(!1), H(0);
            }
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            style: {
              width: `${(I > 0 ? _ / I : 0) * 100}%`,
              backgroundImage: S.background
            },
            className: "absolute top-0 left-0 h-full opacity-20"
          }
        ),
        /* @__PURE__ */ r("div", { className: "absolute flex flex-col", children: [
          c && /* @__PURE__ */ e("div", { className: "w-24 pb-2", children: /* @__PURE__ */ e("img", { src: c, alt: "", className: "w-24 aspect-square rounded-xl" }) }),
          /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(
              "button",
              {
                onClick: z,
                style: S,
                className: "p-1.5 rounded-full hover:scale-110 transition-transform flex-shrink-0",
                children: m ? /* @__PURE__ */ e(Re, { fill: h, className: "w-3 h-3 text-transparent" }) : /* @__PURE__ */ e(Fe, { fill: h, className: "w-3 h-3 text-transparent" })
              }
            ),
            /* @__PURE__ */ e("div", { className: "flex w-full min-w-12 items-center gap-0.5 h-6", children: [...Array(12)].map((N, E) => /* @__PURE__ */ e(
              "div",
              {
                className: "rounded-full transition-all duration-200",
                style: {
                  width: "100%",
                  background: `linear-gradient(to top, ${g[0]}, ${g[1]})`,
                  height: m ? `${8 + Math.sin((T * 8 + E) * 0.6) * 10}px` : "8px",
                  opacity: m ? 0.8 : 0.4
                }
              },
              E
            )) })
          ] })
        ] })
      ]
    }
  );
}
function yt({
  video: i,
  name: c = "No video loaded",
  audioVisual: g = null,
  volume: h = 100,
  thumbnail: q = null,
  controls: m = {
    play: !0,
    pause: !0,
    stop: !0,
    seekbar: !0,
    volume: !0,
    fullscreen: !0,
    videoName: !0,
    equalizer: !0,
    speed: !0
  },
  mode: x = "light",
  transparent: v = !1,
  autoPlay: P = !1,
  color: T = "#3b82f6",
  equalizer: U = {
    bass: 0,
    mid: 0,
    treble: 0
  }
}) {
  const [I, M] = f(!1), [_, H] = f(0), [z, S] = f(0), [N, E] = f(h || 100), [oe, ae] = f(!1), [fe, Q] = f(!1), [G, se] = f(!1), [le, O] = f([]), [de, R] = f(!1), [F, j] = f({
    bass: U.bass || 0,
    mid: U.mid || 0,
    treble: U.treble || 0
  }), [ie, ue] = f(1), [ee, K] = f(0), k = y(null), u = y(null), A = y(null), X = y(null), me = y(null), V = y(null), te = y(null), Z = y(null), $ = y(null), re = y(null), Y = y(0), a = y(0), d = y(0), b = y(0), B = y(0), D = y(0), J = y(!1), o = x === "dark" || G, p = typeof m == "object" && Object.keys(m).length === 0;
  C(() => {
    const t = u.current;
    if (!t) return;
    const n = new ResizeObserver((s) => {
      for (let l of s)
        K(l.contentRect.width);
    });
    return n.observe(t), () => n.disconnect();
  }, []), C(() => {
    const t = [];
    i && typeof i != "string" && t.push(["TypeError", "video must be a string (URL or path)"]), c && typeof c != "string" && t.push(["TypeError", "name must be a string"]), (typeof h != "number" || h < 0 || h > 100) && t.push(["TypeError", "volume must be a number between 0 and 100"]), g && typeof g != "object" ? t.push(["TypeError", "audioVisual must be an object"]) : g && (["left", "right", "top", "bottom"].includes(g.side) || t.push(["ValueError", "audioVisual.side must be 'left', 'right', 'top', or 'bottom'"])), t.length > 0 ? (O(t), console.group("%cVideoPlayer: Prop validation failed", "color:red"), t.forEach((n) => console.error(`${n[0]}: ${n[1]}`)), console.groupEnd()) : O([]);
  }, [i, c, h, g, m, x]), C(() => {
    if (!k.current) return;
    const t = k.current, n = () => {
      fe || H(t.currentTime);
    }, s = () => {
      S(t.duration);
    }, l = () => {
      M(!1), $.current && cancelAnimationFrame($.current);
    }, w = () => M(!0), L = () => M(!1);
    return t.addEventListener("timeupdate", n), t.addEventListener("loadedmetadata", s), t.addEventListener("ended", l), t.addEventListener("play", w), t.addEventListener("pause", L), () => {
      t.removeEventListener("timeupdate", n), t.removeEventListener("loadedmetadata", s), t.removeEventListener("ended", l), t.removeEventListener("play", w), t.removeEventListener("pause", L);
    };
  }, [fe]), C(() => {
    if (i) {
      const t = I, n = N;
      if (k.current && k.current.pause(), k.current) {
        k.current.pause(), k.current.src = i, k.current.volume = oe ? 0 : n / 100;
        const s = () => {
          t && k.current && k.current.play().catch((l) => console.error("Play failed:", l)), k.current && k.current.removeEventListener("canplay", s);
        };
        k.current.addEventListener("canplay", s), k.current.load();
      }
      H(0), M(!1), Y.current = 0, a.current = 0, d.current = 0, b.current = 0, B.current = 0, D.current = 0, pe();
    }
  }, [i]), C(() => {
    k.current && (k.current.volume = oe ? 0 : N / 100);
  }, [N, oe]), C(() => {
    k.current && (k.current.playbackRate = ie);
  }, [ie]), C(() => {
    A.current && (V.current && (V.current.gain.value = F.bass), te.current && (te.current.gain.value = F.mid), Z.current && (Z.current.gain.value = F.treble));
  }, [F]), C(() => {
    J.current = I, $.current && (cancelAnimationFrame($.current), $.current = null), I && g ? (A.current || ge(), we()) : !I && g && qe();
  }, [I, g]), C(() => {
    const t = () => {
      se(!!document.fullscreenElement);
    };
    return document.addEventListener("fullscreenchange", t), () => document.removeEventListener("fullscreenchange", t);
  }, []), C(() => () => {
    $.current && cancelAnimationFrame($.current), A.current && A.current.close().catch((t) => console.warn("AudioContext cleanup error:", t));
  }, []);
  const ge = () => {
    if (!A.current && k.current)
      try {
        const t = window.AudioContext || window.webkitAudioContext;
        if (t) {
          const n = new t();
          A.current = n;
          const s = n.createBiquadFilter();
          s.type = "lowshelf", s.frequency.value = 320, s.gain.value = F.bass;
          const l = n.createBiquadFilter();
          l.type = "peaking", l.frequency.value = 1e3, l.Q.value = 0.5, l.gain.value = F.mid;
          const w = n.createBiquadFilter();
          w.type = "highshelf", w.frequency.value = 3200, w.gain.value = F.treble;
          const L = n.createAnalyser();
          L.fftSize = 2048, L.smoothingTimeConstant = 0.8;
          const ne = n.createMediaElementSource(k.current);
          ne.connect(s), s.connect(l), l.connect(w), w.connect(L), w.connect(n.destination), V.current = s, te.current = l, Z.current = w, X.current = L, me.current = ne;
        }
      } catch (t) {
        console.error("Failed to setup audio context:", t);
      }
  }, qe = () => {
    if (J.current) return;
    Y.current *= 0.7, a.current *= 0.7;
    const t = Date.now();
    t - B.current > 1500 && (d.current *= 0.95), t - D.current > 1500 && (b.current *= 0.95), pe();
    const n = Math.max(Y.current, a.current), s = Math.max(d.current, b.current);
    n > 0.01 || s > 0.01 ? $.current = requestAnimationFrame(qe) : (J.current || (Y.current = 0, a.current = 0, d.current = 0, b.current = 0, pe()), $.current && cancelAnimationFrame($.current), $.current = null);
  }, we = () => {
    if (!X.current || !J.current) return;
    const t = X.current.frequencyBinCount, n = new Uint8Array(t);
    X.current.getByteFrequencyData(n);
    let s = 0;
    for (let L = 0; L < t; L++)
      s += n[L];
    let l = s / t / 255;
    l = Math.pow(l, 0.5), Y.current = Y.current * 0.7 + l * 0.3, a.current = a.current * 0.7 + l * 0.3;
    const w = Date.now();
    Y.current > d.current ? (d.current = Y.current, B.current = w) : w - B.current > 1500 && (d.current *= 0.95), a.current > b.current ? (b.current = a.current, D.current = w) : w - D.current > 1500 && (b.current *= 0.95), pe(), $.current = requestAnimationFrame(we);
  }, pe = () => {
    if (!re.current || !g) return;
    const t = g.color || "#00ff00", n = g.peak || "#ff0000", s = Y.current * 100, l = a.current * 100, w = 100 - d.current * 100, L = 100 - b.current * 100;
    g.side === "top" || g.side === "bottom" ? re.current.innerHTML = `
                <div class="flex flex-col gap-1 h-full justify-center">
                    <div class="flex items-center justify-center gap-2">
                        <div class="text-xs ${o ? "text-gray-100" : "text-gray-900"} opacity-80 w-4 text-center">L</div>
                        <div class="relative flex-1 h-3 bg-black/40 rounded-full overflow-hidden flex justify-end">
                            <div class="h-full rounded-l-full transition-all duration-75" style="width: ${s}%; background: ${t};"></div>
                            ${d.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="right: ${d.current * 100}%; background: ${n};"></div>` : ""}
                        </div>
                        <div class="w-px h-4 bg-white/20"></div>
                        <div class="relative flex-1 h-3 bg-black/40 rounded-full overflow-hidden flex justify-start">
                            <div class="h-full rounded-r-full transition-all duration-75" style="width: ${l}%; background: ${t};"></div>
                            ${b.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="left: ${b.current * 100}%; background: ${n};"></div>` : ""}
                        </div>
                        <div class="text-xs ${o ? "text-gray-100" : "text-gray-900"} opacity-80 w-4 text-center">R</div>
                    </div>
                </div>
            ` : re.current.innerHTML = `
                <div class="flex gap-2 h-full">
                    <div class="flex-1 flex flex-col">
                        <div class="text-xs text-white opacity-70 text-center mb-1">L</div>
                        <div class="flex-1 relative flex flex-col justify-end bg-black/30 rounded-lg overflow-hidden">
                            <div class="rounded-t transition-all duration-75" style="height: ${s}%; background: ${t};">
                                ${d.current > 0.1 ? `<div class="absolute w-full h-1 transition-all duration-100" style="top: ${w}%; background: ${n};"></div>` : ""}
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col">
                        <div class="text-xs text-white opacity-70 text-center mb-1">R</div>
                        <div class="flex-1 relative flex flex-col justify-end bg-black/30 rounded-lg overflow-hidden">
                            <div class="rounded-t transition-all duration-75" style="height: ${l}%; background: ${t};">
                                ${b.current > 0.1 ? `<div class="absolute w-full h-1 transition-all duration-100" style="top: ${L}%; background: ${n};"></div>` : ""}
                        </div>
                    </div>
                </div>
            `;
  }, ke = () => {
    !k.current || !i || (I ? k.current.pause() : (A.current && A.current.state === "suspended" && A.current.resume(), k.current.play().catch((t) => console.error("Play failed:", t))));
  }, he = () => {
    k.current && (k.current.pause(), k.current.currentTime = 0, M(!1), H(0), Y.current = 0, a.current = 0, d.current = 0, b.current = 0, pe());
  }, Ee = (t) => {
    const s = parseFloat(t.target.value) / 100 * z;
    H(s), k.current && !fe && (k.current.currentTime = s);
  }, Te = () => Q(!0), Le = () => {
    k.current && (k.current.currentTime = _), Q(!1);
  }, Pe = (t) => {
    const n = parseInt(t.target.value);
    E(n), ae(n === 0);
  }, Me = (t) => {
    ue(parseFloat(t.target.value));
  }, je = () => ae(!oe), ze = () => {
    u.current && (document.fullscreenElement ? document.exitFullscreen() : u.current.requestFullscreen().catch((t) => console.error("Fullscreen failed:", t)));
  }, Ne = (t, n) => {
    j((s) => ({
      ...s,
      [t]: n
    })), A.current && (t === "bass" && V.current && (V.current.gain.value = n), t === "mid" && te.current && (te.current.gain.value = n), t === "treble" && Z.current && (Z.current.gain.value = n));
  }, Se = () => {
    j({ bass: 0, mid: 0, treble: 0 });
  }, ve = (t) => {
    if (isNaN(t)) return "0:00";
    const n = Math.floor(t / 60), s = Math.floor(t % 60);
    return `${n}:${s.toString().padStart(2, "0")}`;
  };
  if (C(() => {
    (p && !I || P) && ke();
  }, [m]), le && le.length > 0)
    return le.map((t, n) => /* @__PURE__ */ r("div", { className: "text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300", children: [
      /* @__PURE__ */ r("strong", { children: [
        t[0],
        ":"
      ] }),
      " ",
      t[1]
    ] }, n));
  const ye = g ? g.side : null, $e = ye === "top" || ye === "bottom";
  return /* @__PURE__ */ e(
    "div",
    {
      ref: u,
      className: `rounded-xl overflow-hidden transition-all duration-300 ${G ? "fixed inset-0 z-[9999] flex flex-col h-screen w-screen bg-black" : "relative"}`,
      style: { backgroundColor: p || v ? void 0 : o ? "#49494937" : "white" },
      children: /* @__PURE__ */ r("div", { style: { background: p || v ? void 0 : o ? "#1a1a1ab0" : "#f5f5f5", height: G ? "100%" : "auto" }, className: `${p || v ? "" : "p-4"} ${G ? "flex flex-col flex-1" : ""}`, children: [
        m.videoName && !G && /* @__PURE__ */ e("div", { className: "mb-4", children: /* @__PURE__ */ e("div", { className: `${o ? "text-gray-100" : "text-gray-700"} font-medium`, children: c }) }),
        /* @__PURE__ */ r("div", { className: `relative ${$e ? "flex flex-col gap-3" : "flex gap-3"} ${G ? "flex-1 min-h-0" : "mb-4"}`, children: [
          g && ye === "top" && /* @__PURE__ */ e("div", { className: "w-full h-12", ref: re }),
          /* @__PURE__ */ r("div", { className: `flex ${!$e && "flex-1"} gap-3`, children: [
            g && ye === "left" && /* @__PURE__ */ e("div", { className: "w-12 bg-black/50 rounded-lg p-1", ref: re }),
            /* @__PURE__ */ r("div", { className: `flex-1 ${o ? "bg-black/70" : "bg-white/70"} rounded-lg overflow-hidden relative`, children: [
              /* @__PURE__ */ r(
                "video",
                {
                  ref: k,
                  className: "w-full h-full object-contain",
                  poster: q || void 0,
                  children: [
                    i && /* @__PURE__ */ e("source", { src: i }),
                    "Your browser does not support the video tag."
                  ]
                }
              ),
              de && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex flex-col w-full justify-center z-10 rounded-lg p-4 shadow-sm transition-all duration-300", children: /* @__PURE__ */ r("div", { className: `max-w-[600px] w-full mx-auto flex flex-col justify-center z-10 ${o ? "bg-black/70" : "bg-white/80"} rounded-lg p-4 shadow-sm transition-all duration-300`, children: [
                /* @__PURE__ */ e("h3", { className: `text-sm font-medium mb-4 ${o ? "text-gray-200" : "text-gray-700"}`, children: "Equalizer" }),
                /* @__PURE__ */ r("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ r("div", { children: [
                    /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-300" : "text-gray-600"}`, children: "Bass" }),
                      /* @__PURE__ */ r("span", { className: `text-xs ${o ? "text-gray-300" : "text-gray-600"}`, children: [
                        F.bass,
                        " dB"
                      ] })
                    ] }),
                    /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
                      /* @__PURE__ */ e(
                        "input",
                        {
                          type: "range",
                          min: "-20",
                          max: "20",
                          value: F.bass,
                          onChange: (t) => Ne("bass", parseInt(t.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${T} ${(F.bass + 20) / 40 * 100}%, #e5e7eb ${(F.bass + 20) / 40 * 100}%)`
                          }
                        }
                      ),
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
                    ] })
                  ] }),
                  /* @__PURE__ */ r("div", { children: [
                    /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-300" : "text-gray-600"}`, children: "Mid" }),
                      /* @__PURE__ */ r("span", { className: `text-xs ${o ? "text-gray-300" : "text-gray-600"}`, children: [
                        F.mid,
                        " dB"
                      ] })
                    ] }),
                    /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
                      /* @__PURE__ */ e(
                        "input",
                        {
                          type: "range",
                          min: "-20",
                          max: "20",
                          value: F.mid,
                          onChange: (t) => Ne("mid", parseInt(t.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${T} ${(F.mid + 20) / 40 * 100}%, #e5e7eb ${(F.mid + 20) / 40 * 100}%)`
                          }
                        }
                      ),
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
                    ] })
                  ] }),
                  /* @__PURE__ */ r("div", { children: [
                    /* @__PURE__ */ r("div", { className: "flex justify-between mb-1", children: [
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-300" : "text-gray-600"}`, children: "Treble" }),
                      /* @__PURE__ */ r("span", { className: `text-xs ${o ? "text-gray-300" : "text-gray-600"}`, children: [
                        F.treble,
                        " dB"
                      ] })
                    ] }),
                    /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
                      /* @__PURE__ */ e(
                        "input",
                        {
                          type: "range",
                          min: "-20",
                          max: "20",
                          value: F.treble,
                          onChange: (t) => Ne("treble", parseInt(t.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${T} ${(F.treble + 20) / 40 * 100}%, #e5e7eb ${(F.treble + 20) / 40 * 100}%)`
                          }
                        }
                      ),
                      /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ r("div", { className: "flex justify-between mt-6", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: Se,
                      className: `px-3 py-1 rounded text-xs ${o ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
                      children: "Reset"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => R(!1),
                      className: `ml-2 px-3 py-1 rounded text-xs ${o ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
                      children: "Close"
                    }
                  )
                ] })
              ] }) })
            ] }),
            g && ye === "right" && /* @__PURE__ */ e("div", { className: "w-12 bg-black/50 rounded-lg p-1", ref: re })
          ] }),
          g && ye === "bottom" && /* @__PURE__ */ e("div", { className: "w-full h-12", ref: re })
        ] }),
        m.seekbar && /* @__PURE__ */ e("div", { className: `mb-4 ${G ? "mt-3" : ""}`, children: /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-100" : "text-gray-600"} font-mono w-12`, children: ve(_) }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: z > 0 ? _ / z * 100 : 0,
              onChange: Ee,
              onMouseDown: Te,
              onMouseUp: Le,
              onTouchStart: Te,
              onTouchEnd: Le,
              disabled: !i,
              className: "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
              style: {
                background: i && z > 0 ? `linear-gradient(to right, ${T} ${_ / z * 100}%, #e5e7eb ${_ / z * 100}%)` : "#e5e7eb"
              }
            }
          ),
          /* @__PURE__ */ e("span", { className: `text-xs ${o ? "text-gray-100" : "text-gray-600"} font-mono w-12 text-right`, children: ve(z) })
        ] }) }),
        /* @__PURE__ */ r("div", { className: "flex flex-wrap items-center gap-3", children: [
          m.play && /* @__PURE__ */ r(
            "button",
            {
              onClick: ke,
              disabled: !i,
              style: { backgroundColor: T },
              className: `${ee > 400 ? " px-4 py-2" : "px-3 py-5"} rounded-full text-sm font-medium text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
              children: [
                /* @__PURE__ */ r("div", { className: "relative w-4 flex items-center", children: [
                  /* @__PURE__ */ e(Re, { size: 16, className: `${I ? "" : "scale-0 translate-y-10"} transition-all absolute` }),
                  /* @__PURE__ */ e(Fe, { size: 16, className: `${I ? "scale-0 -translate-y-10" : ""} transition-all absolute` })
                ] }),
                ee > 400 && (I ? "Pause" : "Play")
              ]
            }
          ),
          m.stop && /* @__PURE__ */ e(
            "button",
            {
              onClick: he,
              disabled: !i,
              className: `${o ? "bg-gray-100 text-black hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-800"} px-3 py-3 rounded-full text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
              children: /* @__PURE__ */ e(Ue, { size: 16 })
            }
          ),
          m.fullscreen && /* @__PURE__ */ r(
            "button",
            {
              onClick: ze,
              className: `${ee < 800 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${o ? "bg-gray-100 text-black hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-800"}`,
              children: [
                G ? /* @__PURE__ */ e(et, { size: 16 }) : /* @__PURE__ */ e(Ye, { size: 16 }),
                /* @__PURE__ */ e("span", { style: { display: ee < 800 ? "none" : "block" }, children: G ? "Exit" : "Full" })
              ]
            }
          ),
          m.equalizer && /* @__PURE__ */ r(
            "button",
            {
              onClick: () => R(!de),
              disabled: !i,
              className: `${ee < 700 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${de ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
              style: de ? { backgroundColor: T } : {},
              children: [
                /* @__PURE__ */ e(Ae, { size: 16 }),
                /* @__PURE__ */ e("span", { style: { display: ee < 700 ? "none" : "block" }, children: "EQ" })
              ]
            }
          ),
          m.speed && /* @__PURE__ */ e("div", { className: "flex items-center", children: /* @__PURE__ */ r(
            "select",
            {
              value: ie,
              onChange: Me,
              className: `rounded-full text-sm font-medium border-none outline-none cursor-pointer transition-all bg-transparent ${o ? "text-gray-200" : "text-gray-800"}`,
              children: [
                /* @__PURE__ */ e("option", { value: "0.5", className: o ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "0.5x" }),
                /* @__PURE__ */ e("option", { value: "0.75", className: o ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "0.75x" }),
                /* @__PURE__ */ e("option", { value: "1", className: o ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "1x" }),
                /* @__PURE__ */ e("option", { value: "1.25", className: o ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "1.25x" }),
                /* @__PURE__ */ e("option", { value: "1.5", className: o ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "1.5x" }),
                /* @__PURE__ */ e("option", { value: "2", className: o ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "2x" })
              ]
            }
          ) }),
          m.volume && /* @__PURE__ */ r("div", { className: "flex items-center gap-1 md:gap-3 ml-auto", children: [
            /* @__PURE__ */ e(
              "button",
              {
                onClick: je,
                className: "p-2 rounded-lg hover:bg-gray-100 transition-all",
                children: oe || N === 0 ? /* @__PURE__ */ e(De, { size: 20, className: o ? "text-gray-100" : "text-gray-600" }) : /* @__PURE__ */ e(He, { size: 20, className: o ? "text-gray-100" : "text-gray-600" })
              }
            ),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "0",
                max: "100",
                value: N,
                onChange: Pe,
                className: "hide-for-xs w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
                style: {
                  background: `linear-gradient(to right, ${T} ${N}%, #e5e7eb ${N}%)`,
                  display: ee < 460 ? "none" : "block"
                }
              }
            ),
            /* @__PURE__ */ r("span", { style: { display: ee < 800 ? "none" : "block" }, className: `text-xs ${o ? "text-gray-100" : "text-gray-700"} font-mono w-10 text-right`, children: [
              N,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e("style", { children: `
                    input[type="range"]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: ${T};
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    }
                    
                    input[type="range"]::-moz-range-thumb {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: ${T};
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    }
                    input[type="range"].eq-slider::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 0;
                        height: 0;
                        background: transparent;
                        border: none;
                        box-shadow: none;
                    }
                    input[type="range"].eq-slider::-moz-range-thumb {
                        width: 0;
                        height: 0;
                        background: transparent;
                        border: none;
                        box-shadow: none;
                    }
                    .hide-for-xs {
                        display: flex;
                    }
                    @media (max-width: 480px) {
                        .hide-for-xs {
                            display: none;
                        }
                    }
                ` })
      ] })
    }
  );
}
function bt() {
  const [i, c] = f(null), [g, h] = f("No track loaded"), [q, m] = f("purple"), [x, v] = f(!1), [P, T] = f(!1), [U, I] = f("light"), M = y(null);
  return /* @__PURE__ */ e("div", { className: "min-h-screen flex items-center justify-center p-4 md:p-8", style: { backgroundColor: U === "dark" ? "#222" : "white" }, children: /* @__PURE__ */ r("div", { className: "w-full h-full md:h-auto md:max-w-4xl", children: [
    x && /* @__PURE__ */ e(ut, { theme: q, setTheme: m, close: () => v(!1) }),
    /* @__PURE__ */ r("div", { className: "container-glass rounded-xl p-8", children: [
      /* @__PURE__ */ r("div", { className: "mb-6 flex justify-between items-start", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h1", { className: `text-2xl font-semibold ${U === "dark" ? "text-gray-200" : "text-gray-800"} mb-1`, children: "Audio Visualizer" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-500", children: "Professional frequency analyzer" })
        ] }),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => v(!x),
            className: "bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              /* @__PURE__ */ e("span", { children: "🎨" }),
              " Themes"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ e(
        gt,
        {
          audio: i || void 0,
          name: g || void 0,
          author: "K.Prabhasha",
          theme: q,
          autoPlay: !1,
          thumbnail: "https://cdn-icons-png.flaticon.com/512/3845/3845874.png",
          mode: U,
          transparent: P,
          volume: 70,
          controls: {
            play: !0,
            pause: !0,
            stop: !0,
            seekbar: !0,
            volume: !0,
            loop: !0,
            trackName: !0
          }
        }
      ),
      /* @__PURE__ */ e(ft, { audio: i || "", width: 400, thumbnail: "https://cdn-icons-png.flaticon.com/512/8316/8316619.png", autoPlay: !1, gradient: ["#26ce3aff", "#39eed9ff"], background: "#c0ffefff" }),
      /* @__PURE__ */ e(mt, { audio: i || "", thumbnail: "https://cdn-icons-png.flaticon.com/512/17524/17524837.png", autoPlay: !1, gradient: ["#26ce3aff", "#39eed9ff"], background: "#c0ffefff" }),
      /* @__PURE__ */ r("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "file",
            ref: M,
            onChange: (z) => {
              var N;
              const S = (N = z.target.files) == null ? void 0 : N[0];
              if (S) {
                const E = URL.createObjectURL(S);
                c(E), h(S.name);
              }
            },
            accept: "audio/*",
            className: "hidden"
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => {
              var z;
              (z = M.current) == null || z.click();
            },
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              /* @__PURE__ */ e(ct, { size: 16 }),
              "Load Audio"
            ]
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => I(U === "dark" ? "light" : "dark"),
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: U === "dark" ? "Light" : "Dark"
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => T(!P),
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              "Transparent: ",
              String(P)
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  bt as DemoVisualizePlayer,
  mt as NanoAudioPlayer,
  ut as ThemeSelector,
  yt as VideoPlayer,
  gt as VisualizePlayer,
  ft as WaveAudioPlayer,
  be as themes
};
