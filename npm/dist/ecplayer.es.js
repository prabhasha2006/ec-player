import dr, { forwardRef as fr, createElement as Ze, useState as j, useRef as N, useEffect as I } from "react";
var er = { exports: {} }, Ye = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or;
function $r() {
  if (or) return Ye;
  or = 1;
  var o = dr, u = Symbol.for("react.element"), f = Symbol.for("react.fragment"), g = Object.prototype.hasOwnProperty, q = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(h, b, T) {
    var L, M = {}, _ = null, Y = null;
    T !== void 0 && (_ = "" + T), b.key !== void 0 && (_ = "" + b.key), b.ref !== void 0 && (Y = b.ref);
    for (L in b) g.call(b, L) && !p.hasOwnProperty(L) && (M[L] = b[L]);
    if (h && h.defaultProps) for (L in b = h.defaultProps, b) M[L] === void 0 && (M[L] = b[L]);
    return { $$typeof: u, type: h, key: _, ref: Y, props: M, _owner: q.current };
  }
  return Ye.Fragment = f, Ye.jsx = w, Ye.jsxs = w, Ye;
}
var Ke = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cr;
function Er() {
  return cr || (cr = 1, process.env.NODE_ENV !== "production" && function() {
    var o = dr, u = Symbol.for("react.element"), f = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), h = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), M = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), K = Symbol.iterator, G = "@@iterator";
    function J(r) {
      if (r === null || typeof r != "object")
        return null;
      var n = K && r[K] || r[G];
      return typeof n == "function" ? n : null;
    }
    var k = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(r) {
      {
        for (var n = arguments.length, c = new Array(n > 1 ? n - 1 : 0), m = 1; m < n; m++)
          c[m - 1] = arguments[m];
        we("error", r, c);
      }
    }
    function we(r, n, c) {
      {
        var m = k.ReactDebugCurrentFrame, B = m.getStackAddendum();
        B !== "" && (n += "%s", c = c.concat([B]));
        var V = c.map(function(S) {
          return String(S);
        });
        V.unshift("Warning: " + n), Function.prototype.apply.call(console[r], console, V);
      }
    }
    var he = !1, $e = !1, le = !1, ue = !1, ve = !1, ye;
    ye = Symbol.for("react.module.reference");
    function Z(r) {
      return !!(typeof r == "string" || typeof r == "function" || r === g || r === p || ve || r === q || r === T || r === L || ue || r === Y || he || $e || le || typeof r == "object" && r !== null && (r.$$typeof === _ || r.$$typeof === M || r.$$typeof === w || r.$$typeof === h || r.$$typeof === b || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      r.$$typeof === ye || r.getModuleId !== void 0));
    }
    function ke(r, n, c) {
      var m = r.displayName;
      if (m)
        return m;
      var B = n.displayName || n.name || "";
      return B !== "" ? c + "(" + B + ")" : c;
    }
    function W(r) {
      return r.displayName || "Context";
    }
    function F(r) {
      if (r == null)
        return null;
      if (typeof r.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof r == "function")
        return r.displayName || r.name || null;
      if (typeof r == "string")
        return r;
      switch (r) {
        case g:
          return "Fragment";
        case f:
          return "Portal";
        case p:
          return "Profiler";
        case q:
          return "StrictMode";
        case T:
          return "Suspense";
        case L:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case h:
            var n = r;
            return W(n) + ".Consumer";
          case w:
            var c = r;
            return W(c._context) + ".Provider";
          case b:
            return ke(r, r.render, "ForwardRef");
          case M:
            var m = r.displayName || null;
            return m !== null ? m : F(r.type) || "Memo";
          case _: {
            var B = r, V = B._payload, S = B._init;
            try {
              return F(S(V));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var O = Object.assign, ee = 0, ne, C, x, H, ie, Ne, de;
    function fe() {
    }
    fe.__reactDisabledLog = !0;
    function re() {
      {
        if (ee === 0) {
          ne = console.log, C = console.info, x = console.warn, H = console.error, ie = console.group, Ne = console.groupCollapsed, de = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: fe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        ee++;
      }
    }
    function A() {
      {
        if (ee--, ee === 0) {
          var r = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: O({}, r, {
              value: ne
            }),
            info: O({}, r, {
              value: C
            }),
            warn: O({}, r, {
              value: x
            }),
            error: O({}, r, {
              value: H
            }),
            group: O({}, r, {
              value: ie
            }),
            groupCollapsed: O({}, r, {
              value: Ne
            }),
            groupEnd: O({}, r, {
              value: de
            })
          });
        }
        ee < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var oe = k.ReactCurrentDispatcher, ae;
    function P(r, n, c) {
      {
        if (ae === void 0)
          try {
            throw Error();
          } catch (B) {
            var m = B.stack.trim().match(/\n( *(at )?)/);
            ae = m && m[1] || "";
          }
        return `
` + ae + r;
      }
    }
    var D = !1, s;
    {
      var $ = typeof WeakMap == "function" ? WeakMap : Map;
      s = new $();
    }
    function U(r, n) {
      if (!r || D)
        return "";
      {
        var c = s.get(r);
        if (c !== void 0)
          return c;
      }
      var m;
      D = !0;
      var B = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var V;
      V = oe.current, oe.current = null, re();
      try {
        if (n) {
          var S = function() {
            throw Error();
          };
          if (Object.defineProperty(S.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(S, []);
            } catch (me) {
              m = me;
            }
            Reflect.construct(r, [], S);
          } else {
            try {
              S.call();
            } catch (me) {
              m = me;
            }
            r.call(S.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (me) {
            m = me;
          }
          r();
        }
      } catch (me) {
        if (me && m && typeof me.stack == "string") {
          for (var R = me.stack.split(`
`), ge = m.stack.split(`
`), te = R.length - 1, se = ge.length - 1; te >= 1 && se >= 0 && R[te] !== ge[se]; )
            se--;
          for (; te >= 1 && se >= 0; te--, se--)
            if (R[te] !== ge[se]) {
              if (te !== 1 || se !== 1)
                do
                  if (te--, se--, se < 0 || R[te] !== ge[se]) {
                    var je = `
` + R[te].replace(" at new ", " at ");
                    return r.displayName && je.includes("<anonymous>") && (je = je.replace("<anonymous>", r.displayName)), typeof r == "function" && s.set(r, je), je;
                  }
                while (te >= 1 && se >= 0);
              break;
            }
        }
      } finally {
        D = !1, oe.current = V, A(), Error.prepareStackTrace = B;
      }
      var Ue = r ? r.displayName || r.name : "", Ie = Ue ? P(Ue) : "";
      return typeof r == "function" && s.set(r, Ie), Ie;
    }
    function X(r, n, c) {
      return U(r, !1);
    }
    function d(r) {
      var n = r.prototype;
      return !!(n && n.isReactComponent);
    }
    function v(r, n, c) {
      if (r == null)
        return "";
      if (typeof r == "function")
        return U(r, d(r));
      if (typeof r == "string")
        return P(r);
      switch (r) {
        case T:
          return P("Suspense");
        case L:
          return P("SuspenseList");
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case b:
            return X(r.render);
          case M:
            return v(r.type, n, c);
          case _: {
            var m = r, B = m._payload, V = m._init;
            try {
              return v(V(B), n, c);
            } catch {
            }
          }
        }
      return "";
    }
    var ce = Object.prototype.hasOwnProperty, Ee = {}, _e = k.ReactDebugCurrentFrame;
    function be(r) {
      if (r) {
        var n = r._owner, c = v(r.type, r._source, n ? n.type : null);
        _e.setExtraStackFrame(c);
      } else
        _e.setExtraStackFrame(null);
    }
    function Fe(r, n, c, m, B) {
      {
        var V = Function.call.bind(ce);
        for (var S in r)
          if (V(r, S)) {
            var R = void 0;
            try {
              if (typeof r[S] != "function") {
                var ge = Error((m || "React class") + ": " + c + " type `" + S + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[S] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ge.name = "Invariant Violation", ge;
              }
              R = r[S](n, S, m, c, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (te) {
              R = te;
            }
            R && !(R instanceof Error) && (be(B), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", c, S, typeof R), be(null)), R instanceof Error && !(R.message in Ee) && (Ee[R.message] = !0, be(B), y("Failed %s type: %s", c, R.message), be(null));
          }
      }
    }
    var Ce = Array.isArray;
    function Ae(r) {
      return Ce(r);
    }
    function De(r) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, c = n && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return c;
      }
    }
    function Be(r) {
      try {
        return Le(r), !1;
      } catch {
        return !0;
      }
    }
    function Le(r) {
      return "" + r;
    }
    function Me(r) {
      if (Be(r))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", De(r)), Le(r);
    }
    var He = k.ReactCurrentOwner, Oe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, We, Pe;
    function Re(r) {
      if (ce.call(r, "ref")) {
        var n = Object.getOwnPropertyDescriptor(r, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return r.ref !== void 0;
    }
    function ze(r) {
      if (ce.call(r, "key")) {
        var n = Object.getOwnPropertyDescriptor(r, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return r.key !== void 0;
    }
    function t(r, n) {
      typeof r.ref == "string" && He.current;
    }
    function a(r, n) {
      {
        var c = function() {
          We || (We = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        c.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: c,
          configurable: !0
        });
      }
    }
    function l(r, n) {
      {
        var c = function() {
          Pe || (Pe = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        c.isReactWarning = !0, Object.defineProperty(r, "ref", {
          get: c,
          configurable: !0
        });
      }
    }
    var i = function(r, n, c, m, B, V, S) {
      var R = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: u,
        // Built-in properties that belong on the element
        type: r,
        key: n,
        ref: c,
        props: S,
        // Record the component responsible for creating this element.
        _owner: V
      };
      return R._store = {}, Object.defineProperty(R._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(R, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(R, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: B
      }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
    };
    function E(r, n, c, m, B) {
      {
        var V, S = {}, R = null, ge = null;
        c !== void 0 && (Me(c), R = "" + c), ze(n) && (Me(n.key), R = "" + n.key), Re(n) && (ge = n.ref, t(n, B));
        for (V in n)
          ce.call(n, V) && !Oe.hasOwnProperty(V) && (S[V] = n[V]);
        if (r && r.defaultProps) {
          var te = r.defaultProps;
          for (V in te)
            S[V] === void 0 && (S[V] = te[V]);
        }
        if (R || ge) {
          var se = typeof r == "function" ? r.displayName || r.name || "Unknown" : r;
          R && a(S, se), ge && l(S, se);
        }
        return i(r, R, ge, B, m, He.current, S);
      }
    }
    var z = k.ReactCurrentOwner, xe = k.ReactDebugCurrentFrame;
    function pe(r) {
      if (r) {
        var n = r._owner, c = v(r.type, r._source, n ? n.type : null);
        xe.setExtraStackFrame(c);
      } else
        xe.setExtraStackFrame(null);
    }
    var qe;
    qe = !1;
    function Q(r) {
      return typeof r == "object" && r !== null && r.$$typeof === u;
    }
    function Ve() {
      {
        if (z.current) {
          var r = F(z.current.type);
          if (r)
            return `

Check the render method of \`` + r + "`.";
        }
        return "";
      }
    }
    function pr(r) {
      return "";
    }
    var nr = {};
    function mr(r) {
      {
        var n = Ve();
        if (!n) {
          var c = typeof r == "string" ? r : r.displayName || r.name;
          c && (n = `

Check the top-level render call using <` + c + ">.");
        }
        return n;
      }
    }
    function ar(r, n) {
      {
        if (!r._store || r._store.validated || r.key != null)
          return;
        r._store.validated = !0;
        var c = mr(n);
        if (nr[c])
          return;
        nr[c] = !0;
        var m = "";
        r && r._owner && r._owner !== z.current && (m = " It was passed a child from " + F(r._owner.type) + "."), pe(r), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', c, m), pe(null);
      }
    }
    function sr(r, n) {
      {
        if (typeof r != "object")
          return;
        if (Ae(r))
          for (var c = 0; c < r.length; c++) {
            var m = r[c];
            Q(m) && ar(m, n);
          }
        else if (Q(r))
          r._store && (r._store.validated = !0);
        else if (r) {
          var B = J(r);
          if (typeof B == "function" && B !== r.entries)
            for (var V = B.call(r), S; !(S = V.next()).done; )
              Q(S.value) && ar(S.value, n);
        }
      }
    }
    function hr(r) {
      {
        var n = r.type;
        if (n == null || typeof n == "string")
          return;
        var c;
        if (typeof n == "function")
          c = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === b || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === M))
          c = n.propTypes;
        else
          return;
        if (c) {
          var m = F(n);
          Fe(c, r.props, "prop", m, r);
        } else if (n.PropTypes !== void 0 && !qe) {
          qe = !0;
          var B = F(n);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function yr(r) {
      {
        for (var n = Object.keys(r.props), c = 0; c < n.length; c++) {
          var m = n[c];
          if (m !== "children" && m !== "key") {
            pe(r), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), pe(null);
            break;
          }
        }
        r.ref !== null && (pe(r), y("Invalid attribute `ref` supplied to `React.Fragment`."), pe(null));
      }
    }
    var lr = {};
    function ir(r, n, c, m, B, V) {
      {
        var S = Z(r);
        if (!S) {
          var R = "";
          (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ge = pr();
          ge ? R += ge : R += Ve();
          var te;
          r === null ? te = "null" : Ae(r) ? te = "array" : r !== void 0 && r.$$typeof === u ? (te = "<" + (F(r.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : te = typeof r, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", te, R);
        }
        var se = E(r, n, c, B, V);
        if (se == null)
          return se;
        if (S) {
          var je = n.children;
          if (je !== void 0)
            if (m)
              if (Ae(je)) {
                for (var Ue = 0; Ue < je.length; Ue++)
                  sr(je[Ue], r);
                Object.freeze && Object.freeze(je);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              sr(je, r);
        }
        if (ce.call(n, "key")) {
          var Ie = F(r), me = Object.keys(n).filter(function(Nr) {
            return Nr !== "key";
          }), Qe = me.length > 0 ? "{key: someKey, " + me.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!lr[Ie + Qe]) {
            var kr = me.length > 0 ? "{" + me.join(": ..., ") + ": ...}" : "{}";
            y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Qe, Ie, kr, Ie), lr[Ie + Qe] = !0;
          }
        }
        return r === g ? yr(se) : hr(se), se;
      }
    }
    function br(r, n, c) {
      return ir(r, n, c, !0);
    }
    function vr(r, n, c) {
      return ir(r, n, c, !1);
    }
    var jr = vr, wr = br;
    Ke.Fragment = g, Ke.jsx = jr, Ke.jsxs = wr;
  }()), Ke;
}
process.env.NODE_ENV === "production" ? er.exports = $r() : er.exports = Er();
var e = er.exports;
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cr = (o) => o.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Rr = (o) => o.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (u, f, g) => g ? g.toUpperCase() : f.toLowerCase()
), ur = (o) => {
  const u = Rr(o);
  return u.charAt(0).toUpperCase() + u.slice(1);
}, xr = (...o) => o.filter((u, f, g) => !!u && u.trim() !== "" && g.indexOf(u) === f).join(" ").trim(), Tr = (o) => {
  for (const u in o)
    if (u.startsWith("aria-") || u === "role" || u === "title")
      return !0;
};
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Pr = {
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
const qr = fr(
  ({
    color: o = "currentColor",
    size: u = 24,
    strokeWidth: f = 2,
    absoluteStrokeWidth: g,
    className: q = "",
    children: p,
    iconNode: w,
    ...h
  }, b) => Ze(
    "svg",
    {
      ref: b,
      ...Pr,
      width: u,
      height: u,
      stroke: o,
      strokeWidth: g ? Number(f) * 24 / Number(u) : f,
      className: xr("lucide", q),
      ...!p && !Tr(h) && { "aria-hidden": "true" },
      ...h
    },
    [
      ...w.map(([T, L]) => Ze(T, L)),
      ...Array.isArray(p) ? p : [p]
    ]
  )
);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = (o, u) => {
  const f = fr(
    ({ className: g, ...q }, p) => Ze(qr, {
      ref: p,
      iconNode: u,
      className: xr(
        `lucide-${Cr(ur(o))}`,
        `lucide-${o}`,
        g
      ),
      ...q
    })
  );
  return f.displayName = ur(o), f;
};
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _r = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], Ar = Te("maximize", _r);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sr = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
], Fr = Te("minimize", Sr);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lr = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], Je = Te("pause", Lr);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mr = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Xe = Te("play", Mr);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Or = [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
], zr = Te("repeat", Or);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ir = [
  ["line", { x1: "4", x2: "4", y1: "21", y2: "14", key: "1p332r" }],
  ["line", { x1: "4", x2: "4", y1: "10", y2: "3", key: "gb41h5" }],
  ["line", { x1: "12", x2: "12", y1: "21", y2: "12", key: "hf2csr" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "3", key: "1kfi7u" }],
  ["line", { x1: "20", x2: "20", y1: "21", y2: "16", key: "1lhrwl" }],
  ["line", { x1: "20", x2: "20", y1: "12", y2: "3", key: "16vvfq" }],
  ["line", { x1: "2", x2: "6", y1: "14", y2: "14", key: "1uebub" }],
  ["line", { x1: "10", x2: "14", y1: "8", y2: "8", key: "1yglbp" }],
  ["line", { x1: "18", x2: "22", y1: "16", y2: "16", key: "1jxqpz" }]
], Ge = Te("sliders-vertical", Ir);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dr = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], gr = Te("square", Dr);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Br = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], Hr = Te("upload", Br);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wr = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], rr = Te("volume-2", Wr);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vr = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
], tr = Te("volume-x", Vr), Se = {
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
function Ur({ theme: o, setTheme: u, close: f }) {
  const g = Object.keys(Se).map((q) => ({
    key: q,
    name: Se[q].name,
    colors: Se[q].bars
  }));
  return /* @__PURE__ */ e.jsxs("div", { className: "container-glass rounded-xl p-6 mb-6", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "text-lg font-semibold text-gray-800", children: "Choose Color Palette" }),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => f(),
          className: "text-gray-500 hover:text-gray-700 text-sm font-medium",
          children: "Close"
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "theme-selector grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: g.map((q) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `theme-card bg-white p-4 rounded-lg cursor-pointer border-2 transition-all ${o === q.key ? "border-current shadow-lg" : "border-transparent"}`,
        onClick: () => u(q.key),
        children: [
          /* @__PURE__ */ e.jsx("div", { className: "color-preview h-10 rounded mb-2", style: { background: `linear-gradient(to right, ${q.colors.join(", ")})` } }),
          /* @__PURE__ */ e.jsx("div", { className: "text-sm font-medium text-gray-700", children: q.name })
        ]
      },
      q.key
    )) })
  ] });
}
function Yr({
  audio: o,
  name: u = "No track loaded",
  author: f,
  theme: g = "rainbow",
  volume: q = 100,
  thumbnail: p = null,
  controls: w = {
    play: !0,
    pause: !0,
    stop: !0,
    seekbar: !0,
    volume: !0,
    loop: !0,
    trackName: !0,
    equalizer: !0
  },
  mode: h = "light",
  bands: b = null,
  transparent: T = !1,
  autoPlay: L = !1,
  equalizer: M = {
    bass: 0,
    mid: 0,
    treble: 0
  }
}) {
  const [_, Y] = j(!1), [K, G] = j(0), [J, k] = j(0), [y, we] = j(q || 100), [he, $e] = j(!1), [le, ue] = j(!1), [ve, ye] = j(!1), [Z, ke] = j([]), [W, F] = j(!1), [O, ee] = j({
    bass: M.bass || 0,
    mid: M.mid || 0,
    treble: M.treble || 0
  }), [ne, C] = j(0), x = N(null), H = N(null), ie = N(null), Ne = N(null), de = N(null), fe = N(null), re = N(null), A = N(null), oe = N(null), ae = N(null);
  I(() => {
    const t = ae.current;
    if (!t) return;
    const a = new ResizeObserver((l) => {
      for (let i of l)
        C(i.contentRect.width);
    });
    return a.observe(t), () => a.disconnect();
  }, []), I(() => {
    const t = [];
    if (o && typeof o != "string" && t.push(["TypeError", "audio must be a string (URL or path)"]), u && typeof u != "string" && t.push(["TypeError", "name must be a string"]), g && typeof g != "string" && typeof g != "object")
      t.push(["TypeError", "theme must be a string or a valid theme object"]);
    else if (typeof g == "object") {
      const a = ["name", "bg", "bars", "peak", "button", "buttonHover", "slider"];
      for (const l of a)
        l in g || t.push(["ThemeError", `theme object missing key: ${l}`]);
    }
    (typeof q != "number" || q < 0 || q > 100) && t.push(["TypeError", "volume must be a number between 0 and 100"]), typeof w != "object" || Array.isArray(w) ? t.push(["TypeError", "controls must be an object"]) : ["play", "pause", "stop", "seekbar", "volume", "loop", "trackName", "equalizer"].forEach((l) => {
      w && l in w && typeof w[l] != "boolean" && t.push(["TypeError", `controls.${l} must be a boolean`]);
    }), b && (Array.isArray(b) ? b.length === 0 ? t.push(["ValueError", "bands array cannot be empty"]) : b.forEach((a, l) => {
      typeof a.freq != "number" && t.push(["TypeError", `bands[${l}].freq must be a number`]);
    }) : t.push(["TypeError", "bands must be an array"])), t.length > 0 ? (ke(t), console.group("%cVisualizePlayer: Prop validation failed", "color:red"), t.forEach((a) => console.error(`${a[0]}: ${a[1]}`)), console.groupEnd()) : ke([]);
  }, [o, u, g, q, w, h, b]);
  const P = b || [
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
  ], D = N(P.map(() => 0)), s = N(P.map(() => 0)), $ = N(P.map(() => 0)), U = N(!1), X = N(typeof g == "string" ? g : "purple");
  let d = typeof g == "string" ? Se[g] || Se.purple : typeof g == "object" ? g : Se.purple;
  const v = h === "dark", ce = typeof w == "object" && Object.keys(w).length === 0;
  I(() => {
    typeof g == "string" ? X.current = g : X.current = "purple", Ce();
  }, [g]), I(() => {
    x.current || (x.current = new Audio());
    const t = x.current, a = () => {
      ve || G(t.currentTime);
    }, l = () => {
      k(t.duration);
    }, i = () => {
      le || (Y(!1), A.current && cancelAnimationFrame(A.current));
    }, E = () => Y(!0), z = () => Y(!1);
    return t.addEventListener("timeupdate", a), t.addEventListener("loadedmetadata", l), t.addEventListener("ended", i), t.addEventListener("play", E), t.addEventListener("pause", z), () => {
      t.removeEventListener("timeupdate", a), t.removeEventListener("loadedmetadata", l), t.removeEventListener("ended", i), t.removeEventListener("play", E), t.removeEventListener("pause", z);
    };
  }, [ve, le]), I(() => () => {
    x.current && (x.current.pause(), x.current.src = "", x.current.load()), H.current && H.current.close().catch((t) => console.warn("AudioContext cleanup error:", t)), A.current && cancelAnimationFrame(A.current);
  }, []), I(() => {
    if (o) {
      const t = _, a = y, l = le;
      if (A.current && (cancelAnimationFrame(A.current), A.current = null), Ne.current) {
        try {
          Ne.current.disconnect();
        } catch (Q) {
          console.warn("Source disconnect error:", Q);
        }
        Ne.current = null;
      }
      if (ie.current) {
        try {
          ie.current.disconnect();
        } catch (Q) {
          console.warn("Analyser disconnect error:", Q);
        }
        ie.current = null;
      }
      if (de.current) {
        try {
          de.current.disconnect();
        } catch (Q) {
          console.warn("Bass filter disconnect error:", Q);
        }
        de.current = null;
      }
      if (fe.current) {
        try {
          fe.current.disconnect();
        } catch (Q) {
          console.warn("Mid filter disconnect error:", Q);
        }
        fe.current = null;
      }
      if (re.current) {
        try {
          re.current.disconnect();
        } catch (Q) {
          console.warn("Treble filter disconnect error:", Q);
        }
        re.current = null;
      }
      H.current && (H.current.close().catch((Q) => console.warn("AudioContext close error:", Q)), H.current = null), x.current && (x.current.pause(), x.current.src = "", x.current.load()), x.current = new Audio();
      try {
        x.current.crossOrigin = "anonymous";
      } catch (Q) {
        console.debug("Could not set crossOrigin on audio element", Q);
      }
      x.current.src = o, x.current.preload = "auto", x.current.muted = !1, x.current.volume = he ? 0 : a / 100, x.current.loop = l, x.current.load();
      const i = x.current, E = () => {
        ve || G(i.currentTime);
      }, z = () => {
        k(i.duration);
      }, xe = () => {
        le || (Y(!1), A.current && cancelAnimationFrame(A.current));
      }, pe = () => Y(!0), qe = () => Y(!1);
      i.addEventListener("timeupdate", E), i.addEventListener("loadedmetadata", z), i.addEventListener("ended", xe), i.addEventListener("play", pe), i.addEventListener("pause", qe), G(0), Y(!1), console.debug("Audio element created", { src: x.current.src, volume: x.current.volume, loop: x.current.loop }), D.current = P.map(() => 0), s.current = P.map(() => 0), $.current = P.map(() => 0), Ce(), t && x.current.play().catch((Q) => console.error("Play failed:", Q));
    }
  }, [o]), I(() => {
    x.current && (x.current.volume = he ? 0 : y / 100);
  }, [y, he]), I(() => {
    x.current && (x.current.loop = le);
  }, [le]), I(() => {
    H.current && (de.current && (de.current.gain.value = O.bass), fe.current && (fe.current.gain.value = O.mid), re.current && (re.current.gain.value = O.treble));
  }, [O]), I(() => {
    U.current = _, A.current && (cancelAnimationFrame(A.current), A.current = null), _ ? (H.current || Ee(), Fe()) : be();
  }, [_]);
  const Ee = () => {
    if (!H.current && x.current)
      try {
        const t = window.AudioContext || window.webkitAudioContext;
        if (t) {
          const a = new t();
          H.current = a;
          const l = a.createBiquadFilter();
          l.type = "lowshelf", l.frequency.value = 320, l.gain.value = O.bass;
          const i = a.createBiquadFilter();
          i.type = "peaking", i.frequency.value = 1e3, i.Q.value = 0.5, i.gain.value = O.mid;
          const E = a.createBiquadFilter();
          E.type = "highshelf", E.frequency.value = 3200, E.gain.value = O.treble;
          const z = a.createAnalyser();
          z.fftSize = 8192, z.smoothingTimeConstant = 0.7;
          const xe = a.createMediaElementSource(x.current);
          xe.connect(l), l.connect(i), i.connect(E), E.connect(z), z.connect(a.destination), de.current = l, fe.current = i, re.current = E, ie.current = z, Ne.current = xe;
        }
      } catch (t) {
        console.error("Failed to setup audio context:", t);
      }
  }, _e = (t) => {
    const a = H.current, l = ie.current;
    if (!a || !l) return 0;
    const i = a.sampleRate / 2, E = Math.round(t / i * l.frequencyBinCount);
    return Math.min(E, l.frequencyBinCount - 1);
  }, be = () => {
    if (U.current) return;
    D.current = D.current.map((i) => i * 0.7);
    const t = Date.now();
    s.current = s.current.map((i, E) => t - $.current[E] > 1500 ? i * 0.95 : i), Ce();
    const a = Math.max(...D.current), l = Math.max(...s.current);
    a > 0.01 || l > 0.01 ? A.current = requestAnimationFrame(be) : (U.current || (D.current = P.map(() => 0), s.current = P.map(() => 0), $.current = P.map(() => 0), Ce()), A.current && cancelAnimationFrame(A.current), A.current = null);
  }, Fe = () => {
    if (!ie.current || !U.current) return;
    const t = ie.current.frequencyBinCount, a = new Uint8Array(t);
    ie.current.getByteFrequencyData(a), P.forEach((l, i) => {
      const E = _e(l.freq), z = i < P.length - 1 ? _e(P[i + 1].freq) : a.length;
      let xe = 0, pe = 0;
      for (let Ve = E; Ve < z; Ve++)
        xe += a[Ve], pe++;
      let qe = pe > 0 ? xe / pe / 255 : 0;
      qe = Math.pow(qe, 0.6), D.current[i] = D.current[i] * 0.8 + qe * 0.2;
      const Q = Date.now();
      D.current[i] > s.current[i] ? (s.current[i] = D.current[i], $.current[i] = Q) : Q - $.current[i] > 1500 && (s.current[i] *= 0.95);
    }), Ce(), A.current = requestAnimationFrame(Fe);
  }, Ce = () => {
    if (!oe.current) return;
    const t = Se[X.current] || Se.rainbow;
    let a = "";
    P.forEach((l, i) => {
      const E = D.current[i] * 100, z = 100 - s.current[i] * 100, xe = Math.floor(i / P.length * t.bars.length), pe = t.bars[Math.min(xe, t.bars.length - 1)];
      a += `
                <div class="flex-1 h-full relative flex flex-col justify-end">
                    <div class="rounded-t transition-all duration-75" style="height: ${E}%; background: ${pe};">
                        ${s.current[i] > 0.1 ? `<div class="absolute w-full h-0.5 transition-all duration-100" style="top: ${z}%; background: ${t.peak};"></div>` : ""}
                    </div>
                </div>
            `;
    }), oe.current.innerHTML = a;
  }, Ae = () => {
    !x.current || !o || (_ ? x.current.pause() : (H.current && H.current.state === "suspended" && H.current.resume(), x.current.play().catch((t) => console.error("Play failed:", t))));
  }, De = () => {
    x.current && (x.current.pause(), x.current.currentTime = 0, Y(!1), G(0), D.current = P.map(() => 0), s.current = P.map(() => 0), $.current = P.map(() => 0), Ce());
  }, Be = (t) => {
    const l = parseFloat(t.target.value) / 100 * J;
    G(l), x.current && !ve && (x.current.currentTime = l);
  }, Le = () => {
    ye(!0);
  }, Me = () => {
    x.current && (x.current.currentTime = K), ye(!1);
  }, He = (t) => {
    const a = parseInt(t.target.value);
    we(a), $e(a === 0);
  }, Oe = () => {
    $e(!he);
  }, We = () => {
    ue(!le);
  }, Pe = (t, a) => {
    ee((l) => ({
      ...l,
      [t]: a
    }));
  }, Re = () => {
    ee({ bass: 0, mid: 0, treble: 0 });
  };
  I(() => {
    ((typeof w == "object" && Object.keys(w).length === 0 || !w) && !_ || L) && Ae();
  }, [w]);
  const ze = (t) => {
    if (isNaN(t)) return "0:00";
    const a = Math.floor(t / 60), l = Math.floor(t % 60);
    return `${a}:${l.toString().padStart(2, "0")}`;
  };
  return Z && Z.length > 0 ? Z.map((t, a) => /* @__PURE__ */ e.jsxs("div", { className: "text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300", children: [
    /* @__PURE__ */ e.jsxs("strong", { children: [
      t[0],
      ":"
    ] }),
    " ",
    t[1]
  ] }, a)) : /* @__PURE__ */ e.jsx("div", { ref: ae, className: "w-full rounded-xl overflow-hidden", style: { backgroundColor: ce || T ? void 0 : v ? "#6060606a" : "#ffffffab" }, children: /* @__PURE__ */ e.jsxs("div", { style: { background: ce || T ? void 0 : d.bg }, className: ce || T ? "" : "p-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ e.jsx("div", { className: `${T && W ? "opacity-30" : ""} ${ce || T ? "" : v ? "bg-black/40" : "bg-white/70"} rounded-lg ${ce ? "" : "mb-6"} ${ce || T ? "" : "p-4"} shadow-sm`, children: /* @__PURE__ */ e.jsx("div", { className: "flex justify-center items-end gap-1 h-64", ref: oe }) }),
      W && /* @__PURE__ */ e.jsxs("div", { className: `absolute inset-0 flex flex-col w-full justify-center z-10 ${!(ce || T) && (v ? "bg-black/50" : "bg-white/80")} rounded-lg p-4 shadow-sm transition-all duration-300`, children: [
        /* @__PURE__ */ e.jsx("h3", { className: `text-sm font-medium mb-4 ${v ? "text-gray-200" : "text-gray-700"}`, children: "Equalizer" }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-300" : "text-gray-600"}`, children: "Bass" }),
              /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${v ? "text-gray-300" : "text-gray-600"}`, children: [
                O.bass,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: O.bass,
                  onChange: (t) => Pe("bass", parseInt(t.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${d.slider} ${(O.bass + 20) / 40 * 100}%, ${d.slider + "30"} ${(O.bass + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-300" : "text-gray-600"}`, children: "Mid" }),
              /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${v ? "text-gray-300" : "text-gray-600"}`, children: [
                O.mid,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: O.mid,
                  onChange: (t) => Pe("mid", parseInt(t.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${d.slider} ${(O.mid + 20) / 40 * 100}%, ${d.slider + "30"} ${(O.mid + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-300" : "text-gray-600"}`, children: "Treble" }),
              /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${v ? "text-gray-300" : "text-gray-600"}`, children: [
                O.treble,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: O.treble,
                  onChange: (t) => Pe("treble", parseInt(t.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${d.slider} ${(O.treble + 20) / 40 * 100}%, ${d.slider + "30"} ${(O.treble + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: Re,
            className: `px-3 py-1 rounded text-xs ${v ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
            children: "Reset"
          }
        ) })
      ] })
    ] }),
    w.trackName && /* @__PURE__ */ e.jsxs("div", { className: "mb-6 flex items-center", children: [
      p && /* @__PURE__ */ e.jsx("div", { className: "mr-2", children: /* @__PURE__ */ e.jsx("img", { src: p, alt: "", className: `${_ ? "animation-spin" : ""} h-12 w-12 rounded-full` }) }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { className: `${v ? "text-gray-100" : "text-gray-700"} font-medium truncate`, children: u }),
        f && typeof f == "string" && /* @__PURE__ */ e.jsx("div", { className: `${v ? "text-gray-300" : "text-gray-500"} text-xs`, children: f })
      ] })
    ] }),
    w.seekbar && /* @__PURE__ */ e.jsx("div", { className: "mb-6", children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center md:gap-1", children: [
      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-100" : "text-gray-600"} font-mono w-12`, children: ze(K) }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "100",
          value: J > 0 ? K / J * 100 : 0,
          onChange: Be,
          onMouseDown: Le,
          onMouseUp: Me,
          onTouchStart: Le,
          onTouchEnd: Me,
          disabled: !o,
          className: "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
          style: {
            background: o && J > 0 ? `linear-gradient(to right, ${d.slider} ${K / J * 100}%, ${d.slider + "30"} ${K / J * 100}%)` : d.slider + "30"
          }
        }
      ),
      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${v ? "text-gray-100" : "text-gray-600"} font-mono w-12 text-right`, children: ze(J) })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: `flex flex-wrap items-center ${ne < 330 ? "gap-2" : "gap-3"}`, children: [
      w.play && /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: Ae,
          disabled: !o,
          className: `${ne < 350 ? "px-3 py-5" : "px-4 py-2 md:w-24"} rounded-full text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:opacity-90`,
          style: { backgroundColor: d.button },
          children: [
            /* @__PURE__ */ e.jsxs("div", { className: "relative w-4 flex items-center", children: [
              /* @__PURE__ */ e.jsx(Je, { size: 16, className: `${_ ? "" : "scale-0 translate-y-10"} transition-all absolute` }),
              /* @__PURE__ */ e.jsx(Xe, { size: 16, className: `${_ ? "scale-0 -translate-y-10" : ""} transition-all absolute` })
            ] }),
            /* @__PURE__ */ e.jsx("span", { style: { display: ne < 350 ? "none" : "block" }, children: _ ? "Pause" : "Play" })
          ]
        }
      ),
      w.stop && /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: De,
          disabled: !o,
          className: `${v ? "bg-gray-100 text-black" : "bg-gray-700 text-white"} ${ne < 600 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium ${v ? "hover:bg-gray-300" : "hover:bg-gray-800"} disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
          children: [
            /* @__PURE__ */ e.jsx(gr, { size: 16 }),
            /* @__PURE__ */ e.jsx("span", { style: { display: ne < 600 ? "none" : "block" }, children: "Stop" })
          ]
        }
      ),
      w.equalizer && /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: () => F(!W),
          disabled: !o,
          className: `${ne < 600 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${W ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
          style: W ? { backgroundColor: d.button } : {},
          children: [
            /* @__PURE__ */ e.jsx(Ge, { size: 16 }),
            /* @__PURE__ */ e.jsx("span", { style: { display: ne < 600 ? "none" : "block" }, children: "EQ" })
          ]
        }
      ),
      w.loop && /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: We,
          disabled: !o,
          className: `${ne < 700 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${le ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
          style: le ? { backgroundColor: d.button } : {},
          children: [
            /* @__PURE__ */ e.jsx(zr, { size: 16, className: `${le ? "rotate-180" : ""} transition-all` }),
            /* @__PURE__ */ e.jsx("span", { style: { display: ne < 700 ? "none" : "block" }, children: "Loop" })
          ]
        }
      ),
      w.volume && /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 md:gap-3 ml-auto", children: [
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: Oe,
            className: "p-2 rounded-full hover:bg-gray-100/50 transition-all",
            children: he || y === 0 ? /* @__PURE__ */ e.jsx(tr, { size: 20, className: v ? "text-gray-100" : "text-gray-600" }) : /* @__PURE__ */ e.jsx(rr, { size: 20, className: v ? "text-gray-100" : "text-gray-600" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "range",
            min: "0",
            max: "100",
            value: y,
            onChange: He,
            className: "hide-for-xs w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
            style: {
              background: `linear-gradient(to right, ${d.slider} ${y}%, ${d.slider + "30"} ${y}%)`,
              display: ne < 460 ? "none" : "block"
            }
          }
        ),
        /* @__PURE__ */ e.jsxs("span", { style: { display: ne < 800 ? "none" : "block" }, className: `hidden sm:block text-xs ${v ? "text-gray-100" : "text-gray-700"} font-mono w-10 text-right`, children: [
          y,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("style", { children: `
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: ${d.slider};
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                
                input[type="range"]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: ${d.slider};
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
function Kr({
  audio: o,
  gradient: u = ["#cd7eff", "#fe59f6"],
  background: f = "#2f1f3aff",
  autoPlay: g = !1,
  thumbnail: q = null,
  width: p,
  equalizer: w = {
    bass: 0,
    mid: 0,
    treble: 0
  },
  mode: h = "light"
}) {
  const [b, T] = j(!1), [L, M] = j(0), [_, Y] = j(0), [K, G] = j(!1), [J, k] = j(80), [y, we] = j(1), [he, $e] = j([]), [le, ue] = j(null), [ve, ye] = j(!1), [Z, ke] = j({
    bass: w.bass || 0,
    mid: w.mid || 0,
    treble: w.treble || 0
  }), W = N(null), F = N(null), O = N(null), ee = N(null), ne = N(null), C = N(null), x = () => {
    const s = [];
    for (let $ = 0; $ < 100; $++) {
      const U = 20 + Math.random() * 60;
      s.push(U);
    }
    return s;
  };
  I(() => {
    if (!o)
      return;
    if (!Array.isArray(u) || u.length < 2) {
      ue("Gradient must be an array with at least 2 colors");
      return;
    }
    const s = W.current;
    if (!s) return;
    const $ = () => M(s.currentTime), U = () => {
      Y(s.duration), $e(x());
    }, X = () => T(!1), d = (v) => {
      var ce, Ee;
      ue(`Audio error: ${((Ee = (ce = v.target) == null ? void 0 : ce.error) == null ? void 0 : Ee.message) || "Failed to load audio"}`);
    };
    return s.addEventListener("timeupdate", $), s.addEventListener("loadedmetadata", U), s.addEventListener("ended", X), s.addEventListener("error", d), () => {
      s.removeEventListener("timeupdate", $), s.removeEventListener("loadedmetadata", U), s.removeEventListener("ended", X), s.removeEventListener("error", d);
    };
  }, [o, u, h]), I(() => {
    o && W.current && g && (W.current.play().catch((s) => {
      console.error("Play failed:", s), T(!1);
    }), T(!0));
  }, [o]), I(() => {
    if (W.current && !F.current && W.current) {
      const s = window.AudioContext || window.webkitAudioContext;
      if (s) {
        const $ = new s();
        F.current = $;
        const U = $.createMediaElementSource(W.current);
        O.current = U;
        const X = $.createBiquadFilter();
        X.type = "lowshelf", X.frequency.value = 200, ee.current = X;
        const d = $.createBiquadFilter();
        d.type = "peaking", d.frequency.value = 1e3, d.Q.value = 1, ne.current = d;
        const v = $.createBiquadFilter();
        v.type = "highshelf", v.frequency.value = 3e3, C.current = v, U.connect(X).connect(d).connect(v).connect($.destination);
      }
    }
  }, [o]), I(() => {
    W.current && (W.current.volume = K ? 0 : J / 100);
  }, [J, K]), I(() => {
    W.current && (W.current.playbackRate = y);
  }, [y]);
  const H = () => {
    W.current && (b ? W.current.pause() : W.current.play().catch((s) => {
      ue(`Playback failed: ${s instanceof Error ? s.message : String(s)}`);
    }), T(!b));
  }, ie = () => {
    G(!K);
  }, Ne = (s) => {
    k(parseInt(s.target.value)), K && parseInt(s.target.value) > 0 && G(!1);
  }, de = (s) => {
    we(parseFloat(s.target.value));
  }, fe = (s) => {
    const $ = s.currentTarget.getBoundingClientRect(), d = (s.clientX - $.left) / $.width * _;
    W.current && (W.current.currentTime = d, M(d));
  }, re = (s, $) => {
    ke((U) => ({ ...U, [s]: $ })), s === "bass" && ee.current && (ee.current.gain.value = $), s === "mid" && ne.current && (ne.current.gain.value = $), s === "treble" && C.current && (C.current.gain.value = $);
  }, A = () => {
    re("bass", 0), re("mid", 0), re("treble", 0);
  }, oe = (s) => {
    if (isNaN(s)) return "0:00";
    const $ = Math.floor(s / 60), U = Math.floor(s % 60);
    return `${$}:${U.toString().padStart(2, "0")}`;
  }, ae = _ > 0 ? L / _ * 100 : 0;
  if (le)
    return /* @__PURE__ */ e.jsx("div", { className: "w-lg p-6 rounded-xl", style: { background: f }, children: /* @__PURE__ */ e.jsxs("div", { className: `text-center ${h === "dark" ? "text-red-300" : "text-red-600"}`, children: [
      /* @__PURE__ */ e.jsx("p", { className: "font-medium", children: "Error" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: le })
    ] }) });
  if (!o) return null;
  const P = h === "dark" ? "text-gray-300" : "text-gray-700", D = h === "dark" ? "text-gray-500" : "text-gray-400";
  return /* @__PURE__ */ e.jsxs("div", { className: "w-full max-w-lg relative", style: { width: p + "px" }, children: [
    /* @__PURE__ */ e.jsx("audio", { ref: W, src: o }),
    /* @__PURE__ */ e.jsx("div", { className: "rounded-2xl shadow-2xl", children: /* @__PURE__ */ e.jsxs("div", { className: "rounded-2xl p-6 backdrop-blur-xl", style: { background: f }, children: [
      q && /* @__PURE__ */ e.jsx("div", { className: "w-full p-4", children: /* @__PURE__ */ e.jsx("img", { src: q, alt: "", className: "w-full aspect-square rounded-xl" }) }),
      /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: "relative h-20 mb-6 cursor-pointer",
          onClick: fe,
          children: [
            /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-end justify-center h-full w-full gap-px", children: he.map((s, $) => {
              const X = $ / he.length * 100 <= ae;
              return /* @__PURE__ */ e.jsx(
                "div",
                {
                  className: "w-1 rounded-t transition-all duration-150",
                  style: {
                    height: `${s}%`,
                    background: X ? u[0] : u[1],
                    opacity: X ? 1 : 0.4
                  }
                },
                $
              );
            }) }),
            /* @__PURE__ */ e.jsx(
              "div",
              {
                className: "absolute top-0 h-full w-1 bg-white border-r border-black rounded-full transition-all duration-150",
                style: { left: `${ae}%`, transform: "translateX(-50%)" }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e.jsxs("div", { className: `flex justify-between text-sm ${D} mb-6`, children: [
        /* @__PURE__ */ e.jsx("span", { children: oe(L) }),
        /* @__PURE__ */ e.jsx("span", { children: oe(_) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-3 items-center justify-between mb-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: ie,
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${u[0]}, ${u[1]})`
              },
              children: K || J === 0 ? /* @__PURE__ */ e.jsx(tr, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ e.jsx(rr, { className: "w-4 h-4 text-white" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: J,
              onChange: Ne,
              className: `${p ? "" : "hidden sm:block"} w-20 h-1.5 rounded-lg appearance-none cursor-pointer`,
              style: {
                background: `linear-gradient(to right, ${u[0]} ${J}%, ${h === "dark" ? "#374151" : "#d1d5db"} ${J}%)`,
                display: p && p < 400 ? "none" : void 0
              }
            }
          ),
          p && p < 400 && /* @__PURE__ */ e.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: () => ye(!ve),
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${u[0]}, ${u[1]})`
              },
              children: /* @__PURE__ */ e.jsx(Ge, { className: "w-4 h-4 text-white" })
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: H,
            className: "p-4 rounded-full transition-all hover:scale-105 shadow-lg",
            style: {
              background: `linear-gradient(135deg, ${u[0]}, ${u[1]})`
            },
            children: b ? /* @__PURE__ */ e.jsx(Je, { className: "w-6 h-6 text-white fill-white" }) : /* @__PURE__ */ e.jsx(Xe, { className: "w-6 h-6 text-white fill-white" })
          }
        ) }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ e.jsxs(
            "select",
            {
              value: y,
              style: { background: f, color: u[0] },
              onChange: de,
              className: `py-1 px-2 rounded-lg text-sm ${P} ${h === "dark" ? "bg-gray-800" : "bg-gray-100"}`,
              children: [
                /* @__PURE__ */ e.jsx("option", { value: "0.5", children: "0.5x" }),
                /* @__PURE__ */ e.jsx("option", { value: "0.75", children: "0.75x" }),
                /* @__PURE__ */ e.jsx("option", { value: "1", children: "1x" }),
                /* @__PURE__ */ e.jsx("option", { value: "1.25", children: "1.25x" }),
                /* @__PURE__ */ e.jsx("option", { value: "1.5", children: "1.5x" }),
                /* @__PURE__ */ e.jsx("option", { value: "2", children: "2x" })
              ]
            }
          ) }),
          !(p && p < 400) && /* @__PURE__ */ e.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: () => ye(!ve),
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${u[0]}, ${u[1]})`
              },
              children: /* @__PURE__ */ e.jsx(Ge, { className: "w-4 h-4 text-white" })
            }
          ) })
        ] })
      ] })
    ] }) }),
    ve && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 rounded-2xl p-4", children: /* @__PURE__ */ e.jsxs("div", { className: `max-w-xs w-full p-6 rounded-xl ${h === "dark" ? "bg-gray-800" : "bg-white"}`, children: [
      /* @__PURE__ */ e.jsx("h3", { className: `text-lg font-medium mb-4 ${h === "dark" ? "text-gray-200" : "text-gray-700"}`, children: "Equalizer" }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Bass" }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${h === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              Z.bass,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: Z.bass,
                onChange: (s) => re("bass", parseInt(s.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${u[0]} ${(Z.bass + 20) / 40 * 100}%, ${u[1] + "30"} ${(Z.bass + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Mid" }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${h === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              Z.mid,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: Z.mid,
                onChange: (s) => re("mid", parseInt(s.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${u[0]} ${(Z.mid + 20) / 40 * 100}%, ${u[1] + "30"} ${(Z.mid + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Treble" }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${h === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              Z.treble,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: Z.treble,
                onChange: (s) => re("treble", parseInt(s.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${u[0]} ${(Z.treble + 20) / 40 * 100}%, ${u[1] + "30"} ${(Z.treble + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${h === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mt-6", children: [
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: A,
            className: `px-3 py-1 rounded text-xs ${h === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
            children: "Reset"
          }
        ),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => ye(!1),
            className: `px-3 py-1 rounded text-xs ${h === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
            children: "Close"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx("style", { children: `
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
function Gr({ audio: o, thumbnail: u, gradient: f = ["#cd7eff", "#fe59f6"], background: g = "#1f273a", autoPlay: q = !1 }) {
  const [p, w] = j(!1), [, h] = j(0), b = N(null), [T, L] = j(0), [M, _] = j(0), [Y, K] = j(0);
  I(() => {
    const k = b.current;
    if (!k) return;
    const y = () => h(k.currentTime);
    return k.addEventListener("timeupdate", y), () => k.removeEventListener("timeupdate", y);
  }, []), I(() => {
    const k = setInterval(() => {
      p && L((y) => y + 0.1);
    }, 100);
    return () => clearInterval(k);
  }, [p]), I(() => {
    const k = setInterval(() => {
      p && K((y) => y + 0.1);
    }, 100);
    return () => clearInterval(k);
  }, [p]), I(() => {
    o && b.current && q && (b.current.play().catch(() => w(!1)), w(!0));
  }, [o]), I(() => {
    const k = b.current;
    if (!k) return;
    const y = () => {
      _(k.duration), console.log("Audio duration:", k.duration);
    };
    return K(0), k.addEventListener("loadedmetadata", y), () => {
      k.removeEventListener("loadedmetadata", y);
    };
  }, [o]);
  const G = () => {
    b.current && (p ? b.current.pause() : b.current.play().catch((k) => console.error("NanoPlayer play failed:", k)), w(!p));
  };
  if (!o) return null;
  const J = {
    background: `linear-gradient(135deg, ${f[0]}, ${f[1]})`
  };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      style: { backgroundColor: g },
      className: `
                relative overflow-hidden inline-flex flex-col 
                ${u ? "rounded-2xl" : "rounded-full"} 
                px-3 py-2 shadow-lg
                ${u ? "w-[120px] h-[150px]" : "w-[110px] h-[40px]"}
            `,
      children: [
        /* @__PURE__ */ e.jsx(
          "audio",
          {
            ref: b,
            src: o,
            onEnded: () => {
              w(!1), K(0);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            style: {
              width: `${(M > 0 ? Y / M : 0) * 100}%`,
              backgroundImage: J.background
            },
            className: "absolute top-0 left-0 h-full opacity-20"
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "absolute flex flex-col", children: [
          u && /* @__PURE__ */ e.jsx("div", { className: "w-24 pb-2", children: /* @__PURE__ */ e.jsx("img", { src: u, alt: "", className: "w-24 aspect-square rounded-xl" }) }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e.jsx(
              "button",
              {
                onClick: G,
                style: J,
                className: "p-1.5 rounded-full hover:scale-110 transition-transform flex-shrink-0",
                children: p ? /* @__PURE__ */ e.jsx(Je, { fill: g, className: "w-3 h-3 text-transparent" }) : /* @__PURE__ */ e.jsx(Xe, { fill: g, className: "w-3 h-3 text-transparent" })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { className: "flex w-full min-w-12 items-center gap-0.5 h-6", children: [...Array(12)].map((k, y) => /* @__PURE__ */ e.jsx(
              "div",
              {
                className: "rounded-full transition-all duration-200",
                style: {
                  width: "100%",
                  background: `linear-gradient(to top, ${f[0]}, ${f[1]})`,
                  height: p ? `${8 + Math.sin((T * 8 + y) * 0.6) * 10}px` : "8px",
                  opacity: p ? 0.8 : 0.4
                }
              },
              y
            )) })
          ] })
        ] })
      ]
    }
  );
}
function Xr({
  video: o,
  name: u = "No video loaded",
  audioVisual: f = null,
  volume: g = 100,
  thumbnail: q = null,
  controls: p = {
    play: !0,
    pause: !0,
    stop: !0,
    seekbar: !0,
    volume: !0,
    fullscreen: !0,
    videoName: !0,
    equalizer: !0
  },
  mode: w = "light",
  transparent: h = !1,
  autoPlay: b = !1,
  color: T = "#3b82f6",
  equalizer: L = {
    bass: 0,
    mid: 0,
    treble: 0
  }
}) {
  const [M, _] = j(!1), [Y, K] = j(0), [G, J] = j(0), [k, y] = j(g || 100), [we, he] = j(!1), [$e, le] = j(!1), [ue, ve] = j(!1), [ye, Z] = j([]), [ke, W] = j(!1), [F, O] = j({
    bass: L.bass || 0,
    mid: L.mid || 0,
    treble: L.treble || 0
  }), [ee, ne] = j(0), C = N(null), x = N(null), H = N(null), ie = N(null), Ne = N(null), de = N(null), fe = N(null), re = N(null), A = N(null), oe = N(null), ae = N(0), P = N(0), D = N(0), s = N(0), $ = N(0), U = N(0), X = N(!1), d = w === "dark" || ue, v = typeof p == "object" && Object.keys(p).length === 0;
  I(() => {
    const t = x.current;
    if (!t) return;
    const a = new ResizeObserver((l) => {
      for (let i of l)
        ne(i.contentRect.width);
    });
    return a.observe(t), () => a.disconnect();
  }, []), I(() => {
    const t = [];
    o && typeof o != "string" && t.push(["TypeError", "video must be a string (URL or path)"]), u && typeof u != "string" && t.push(["TypeError", "name must be a string"]), (typeof g != "number" || g < 0 || g > 100) && t.push(["TypeError", "volume must be a number between 0 and 100"]), f && typeof f != "object" ? t.push(["TypeError", "audioVisual must be an object"]) : f && (["left", "right", "top", "bottom"].includes(f.side) || t.push(["ValueError", "audioVisual.side must be 'left', 'right', 'top', or 'bottom'"])), t.length > 0 ? (Z(t), console.group("%cVideoPlayer: Prop validation failed", "color:red"), t.forEach((a) => console.error(`${a[0]}: ${a[1]}`)), console.groupEnd()) : Z([]);
  }, [o, u, g, f, p, w]), I(() => {
    if (!C.current) return;
    const t = C.current, a = () => {
      $e || K(t.currentTime);
    }, l = () => {
      J(t.duration);
    }, i = () => {
      _(!1), A.current && cancelAnimationFrame(A.current);
    }, E = () => _(!0), z = () => _(!1);
    return t.addEventListener("timeupdate", a), t.addEventListener("loadedmetadata", l), t.addEventListener("ended", i), t.addEventListener("play", E), t.addEventListener("pause", z), () => {
      t.removeEventListener("timeupdate", a), t.removeEventListener("loadedmetadata", l), t.removeEventListener("ended", i), t.removeEventListener("play", E), t.removeEventListener("pause", z);
    };
  }, [$e]), I(() => {
    if (o) {
      const t = M, a = k;
      if (C.current && C.current.pause(), C.current) {
        C.current.pause(), C.current.src = o, C.current.volume = we ? 0 : a / 100;
        const l = () => {
          t && C.current && C.current.play().catch((i) => console.error("Play failed:", i)), C.current && C.current.removeEventListener("canplay", l);
        };
        C.current.addEventListener("canplay", l), C.current.load();
      }
      K(0), _(!1), ae.current = 0, P.current = 0, D.current = 0, s.current = 0, $.current = 0, U.current = 0, be();
    }
  }, [o]), I(() => {
    C.current && (C.current.volume = we ? 0 : k / 100);
  }, [k, we]), I(() => {
    H.current && (de.current && (de.current.gain.value = F.bass), fe.current && (fe.current.gain.value = F.mid), re.current && (re.current.gain.value = F.treble));
  }, [F]), I(() => {
    X.current = M, A.current && (cancelAnimationFrame(A.current), A.current = null), M && f ? (H.current || ce(), _e()) : !M && f && Ee();
  }, [M, f]), I(() => {
    const t = () => {
      ve(!!document.fullscreenElement);
    };
    return document.addEventListener("fullscreenchange", t), () => document.removeEventListener("fullscreenchange", t);
  }, []), I(() => () => {
    A.current && cancelAnimationFrame(A.current), H.current && H.current.close().catch((t) => console.warn("AudioContext cleanup error:", t));
  }, []);
  const ce = () => {
    if (!H.current && C.current)
      try {
        const t = window.AudioContext || window.webkitAudioContext;
        if (t) {
          const a = new t();
          H.current = a;
          const l = a.createBiquadFilter();
          l.type = "lowshelf", l.frequency.value = 320, l.gain.value = F.bass;
          const i = a.createBiquadFilter();
          i.type = "peaking", i.frequency.value = 1e3, i.Q.value = 0.5, i.gain.value = F.mid;
          const E = a.createBiquadFilter();
          E.type = "highshelf", E.frequency.value = 3200, E.gain.value = F.treble;
          const z = a.createAnalyser();
          z.fftSize = 2048, z.smoothingTimeConstant = 0.8;
          const xe = a.createMediaElementSource(C.current);
          xe.connect(l), l.connect(i), i.connect(E), E.connect(z), E.connect(a.destination), de.current = l, fe.current = i, re.current = E, ie.current = z, Ne.current = xe;
        }
      } catch (t) {
        console.error("Failed to setup audio context:", t);
      }
  }, Ee = () => {
    if (X.current) return;
    ae.current *= 0.7, P.current *= 0.7;
    const t = Date.now();
    t - $.current > 1500 && (D.current *= 0.95), t - U.current > 1500 && (s.current *= 0.95), be();
    const a = Math.max(ae.current, P.current), l = Math.max(D.current, s.current);
    a > 0.01 || l > 0.01 ? A.current = requestAnimationFrame(Ee) : (X.current || (ae.current = 0, P.current = 0, D.current = 0, s.current = 0, be()), A.current && cancelAnimationFrame(A.current), A.current = null);
  }, _e = () => {
    if (!ie.current || !X.current) return;
    const t = ie.current.frequencyBinCount, a = new Uint8Array(t);
    ie.current.getByteFrequencyData(a);
    let l = 0;
    for (let z = 0; z < t; z++)
      l += a[z];
    let i = l / t / 255;
    i = Math.pow(i, 0.5), ae.current = ae.current * 0.7 + i * 0.3, P.current = P.current * 0.7 + i * 0.3;
    const E = Date.now();
    ae.current > D.current ? (D.current = ae.current, $.current = E) : E - $.current > 1500 && (D.current *= 0.95), P.current > s.current ? (s.current = P.current, U.current = E) : E - U.current > 1500 && (s.current *= 0.95), be(), A.current = requestAnimationFrame(_e);
  }, be = () => {
    if (!oe.current || !f) return;
    const t = f.color || "#00ff00", a = f.peak || "#ff0000", l = ae.current * 100, i = P.current * 100, E = 100 - D.current * 100, z = 100 - s.current * 100;
    f.side === "top" || f.side === "bottom" ? oe.current.innerHTML = `
                <div class="flex flex-col gap-1 h-full justify-center">
                    <div class="flex items-center justify-center gap-2">
                        <div class="text-xs ${d ? "text-gray-100" : "text-gray-900"} opacity-80 w-4 text-center">L</div>
                        <div class="relative flex-1 h-3 bg-black/40 rounded-full overflow-hidden flex justify-end">
                            <div class="h-full rounded-l-full transition-all duration-75" style="width: ${l}%; background: ${t};"></div>
                            ${D.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="right: ${D.current * 100}%; background: ${a};"></div>` : ""}
                        </div>
                        <div class="w-px h-4 bg-white/20"></div>
                        <div class="relative flex-1 h-3 bg-black/40 rounded-full overflow-hidden flex justify-start">
                            <div class="h-full rounded-r-full transition-all duration-75" style="width: ${i}%; background: ${t};"></div>
                            ${s.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="left: ${s.current * 100}%; background: ${a};"></div>` : ""}
                        </div>
                        <div class="text-xs ${d ? "text-gray-100" : "text-gray-900"} opacity-80 w-4 text-center">R</div>
                    </div>
                </div>
            ` : oe.current.innerHTML = `
                <div class="flex gap-2 h-full">
                    <div class="flex-1 flex flex-col">
                        <div class="text-xs text-white opacity-70 text-center mb-1">L</div>
                        <div class="flex-1 relative flex flex-col justify-end bg-black/30 rounded-lg overflow-hidden">
                            <div class="rounded-t transition-all duration-75" style="height: ${l}%; background: ${t};">
                                ${D.current > 0.1 ? `<div class="absolute w-full h-1 transition-all duration-100" style="top: ${E}%; background: ${a};"></div>` : ""}
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col">
                        <div class="text-xs text-white opacity-70 text-center mb-1">R</div>
                        <div class="flex-1 relative flex flex-col justify-end bg-black/30 rounded-lg overflow-hidden">
                            <div class="rounded-t transition-all duration-75" style="height: ${i}%; background: ${t};">
                                ${s.current > 0.1 ? `<div class="absolute w-full h-1 transition-all duration-100" style="top: ${z}%; background: ${a};"></div>` : ""}
                        </div>
                    </div>
                </div>
            `;
  }, Fe = () => {
    !C.current || !o || (M ? C.current.pause() : (H.current && H.current.state === "suspended" && H.current.resume(), C.current.play().catch((t) => console.error("Play failed:", t))));
  }, Ce = () => {
    C.current && (C.current.pause(), C.current.currentTime = 0, _(!1), K(0), ae.current = 0, P.current = 0, D.current = 0, s.current = 0, be());
  }, Ae = (t) => {
    const l = parseFloat(t.target.value) / 100 * G;
    K(l), C.current && !$e && (C.current.currentTime = l);
  }, De = () => le(!0), Be = () => {
    C.current && (C.current.currentTime = Y), le(!1);
  }, Le = (t) => {
    const a = parseInt(t.target.value);
    y(a), he(a === 0);
  }, Me = () => he(!we), He = () => {
    x.current && (document.fullscreenElement ? document.exitFullscreen() : x.current.requestFullscreen().catch((t) => console.error("Fullscreen failed:", t)));
  }, Oe = (t, a) => {
    O((l) => ({
      ...l,
      [t]: a
    })), H.current && (t === "bass" && de.current && (de.current.gain.value = a), t === "mid" && fe.current && (fe.current.gain.value = a), t === "treble" && re.current && (re.current.gain.value = a));
  }, We = () => {
    O({ bass: 0, mid: 0, treble: 0 });
  }, Pe = (t) => {
    if (isNaN(t)) return "0:00";
    const a = Math.floor(t / 60), l = Math.floor(t % 60);
    return `${a}:${l.toString().padStart(2, "0")}`;
  };
  if (I(() => {
    (v && !M || b) && Fe();
  }, [p]), ye && ye.length > 0)
    return ye.map((t, a) => /* @__PURE__ */ e.jsxs("div", { className: "text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300", children: [
      /* @__PURE__ */ e.jsxs("strong", { children: [
        t[0],
        ":"
      ] }),
      " ",
      t[1]
    ] }, a));
  const Re = f ? f.side : null, ze = Re === "top" || Re === "bottom";
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      ref: x,
      className: `rounded-xl overflow-hidden transition-all duration-300 ${ue ? "fixed inset-0 z-[9999] flex flex-col h-screen w-screen bg-black" : "relative"}`,
      style: { backgroundColor: v || h ? void 0 : d ? "#49494937" : "white" },
      children: /* @__PURE__ */ e.jsxs("div", { style: { background: v || h ? void 0 : d ? "#1a1a1ab0" : "#f5f5f5", height: ue ? "100%" : "auto" }, className: `${v || h ? "" : "p-4"} ${ue ? "flex flex-col flex-1" : ""}`, children: [
        p.videoName && !ue && /* @__PURE__ */ e.jsx("div", { className: "mb-4", children: /* @__PURE__ */ e.jsx("div", { className: `${d ? "text-gray-100" : "text-gray-700"} font-medium`, children: u }) }),
        /* @__PURE__ */ e.jsxs("div", { className: `relative ${ze ? "flex flex-col gap-3" : "flex gap-3"} ${ue ? "flex-1 min-h-0" : "mb-4"}`, children: [
          f && Re === "top" && /* @__PURE__ */ e.jsx("div", { className: "w-full h-12", ref: oe }),
          /* @__PURE__ */ e.jsxs("div", { className: `flex ${!ze && "flex-1"} gap-3`, children: [
            f && Re === "left" && /* @__PURE__ */ e.jsx("div", { className: "w-12 bg-black/50 rounded-lg p-1", ref: oe }),
            /* @__PURE__ */ e.jsxs("div", { className: `flex-1 ${d ? "bg-black/70" : "bg-white/70"} rounded-lg overflow-hidden relative`, children: [
              /* @__PURE__ */ e.jsxs(
                "video",
                {
                  ref: C,
                  className: "w-full h-full object-contain",
                  poster: q || void 0,
                  children: [
                    o && /* @__PURE__ */ e.jsx("source", { src: o }),
                    "Your browser does not support the video tag."
                  ]
                }
              ),
              ke && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex flex-col w-full justify-center z-10 rounded-lg p-4 shadow-sm transition-all duration-300", children: /* @__PURE__ */ e.jsxs("div", { className: `max-w-[600px] w-full mx-auto flex flex-col justify-center z-10 ${d ? "bg-black/70" : "bg-white/80"} rounded-lg p-4 shadow-sm transition-all duration-300`, children: [
                /* @__PURE__ */ e.jsx("h3", { className: `text-sm font-medium mb-4 ${d ? "text-gray-200" : "text-gray-700"}`, children: "Equalizer" }),
                /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ e.jsxs("div", { children: [
                    /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-300" : "text-gray-600"}`, children: "Bass" }),
                      /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${d ? "text-gray-300" : "text-gray-600"}`, children: [
                        F.bass,
                        " dB"
                      ] })
                    ] }),
                    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
                      /* @__PURE__ */ e.jsx(
                        "input",
                        {
                          type: "range",
                          min: "-20",
                          max: "20",
                          value: F.bass,
                          onChange: (t) => Oe("bass", parseInt(t.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${T} ${(F.bass + 20) / 40 * 100}%, #e5e7eb ${(F.bass + 20) / 40 * 100}%)`
                          }
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
                    ] })
                  ] }),
                  /* @__PURE__ */ e.jsxs("div", { children: [
                    /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-300" : "text-gray-600"}`, children: "Mid" }),
                      /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${d ? "text-gray-300" : "text-gray-600"}`, children: [
                        F.mid,
                        " dB"
                      ] })
                    ] }),
                    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
                      /* @__PURE__ */ e.jsx(
                        "input",
                        {
                          type: "range",
                          min: "-20",
                          max: "20",
                          value: F.mid,
                          onChange: (t) => Oe("mid", parseInt(t.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${T} ${(F.mid + 20) / 40 * 100}%, #e5e7eb ${(F.mid + 20) / 40 * 100}%)`
                          }
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
                    ] })
                  ] }),
                  /* @__PURE__ */ e.jsxs("div", { children: [
                    /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-300" : "text-gray-600"}`, children: "Treble" }),
                      /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${d ? "text-gray-300" : "text-gray-600"}`, children: [
                        F.treble,
                        " dB"
                      ] })
                    ] }),
                    /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
                      /* @__PURE__ */ e.jsx(
                        "input",
                        {
                          type: "range",
                          min: "-20",
                          max: "20",
                          value: F.treble,
                          onChange: (t) => Oe("treble", parseInt(t.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${T} ${(F.treble + 20) / 40 * 100}%, #e5e7eb ${(F.treble + 20) / 40 * 100}%)`
                          }
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mt-6", children: [
                  /* @__PURE__ */ e.jsx(
                    "button",
                    {
                      onClick: We,
                      className: `px-3 py-1 rounded text-xs ${d ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
                      children: "Reset"
                    }
                  ),
                  /* @__PURE__ */ e.jsx(
                    "button",
                    {
                      onClick: () => W(!1),
                      className: `ml-2 px-3 py-1 rounded text-xs ${d ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
                      children: "Close"
                    }
                  )
                ] })
              ] }) })
            ] }),
            f && Re === "right" && /* @__PURE__ */ e.jsx("div", { className: "w-12 bg-black/50 rounded-lg p-1", ref: oe })
          ] }),
          f && Re === "bottom" && /* @__PURE__ */ e.jsx("div", { className: "w-full h-12", ref: oe })
        ] }),
        p.seekbar && /* @__PURE__ */ e.jsx("div", { className: `mb-4 ${ue ? "mt-3" : ""}`, children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-100" : "text-gray-600"} font-mono w-12`, children: Pe(Y) }),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: G > 0 ? Y / G * 100 : 0,
              onChange: Ae,
              onMouseDown: De,
              onMouseUp: Be,
              onTouchStart: De,
              onTouchEnd: Be,
              disabled: !o,
              className: "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
              style: {
                background: o && G > 0 ? `linear-gradient(to right, ${T} ${Y / G * 100}%, #e5e7eb ${Y / G * 100}%)` : "#e5e7eb"
              }
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-100" : "text-gray-600"} font-mono w-12 text-right`, children: Pe(G) })
        ] }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          p.play && /* @__PURE__ */ e.jsxs(
            "button",
            {
              onClick: Fe,
              disabled: !o,
              style: { backgroundColor: T },
              className: `${ee > 400 ? " px-4 py-2" : "px-3 py-5"} rounded-full text-sm font-medium text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
              children: [
                /* @__PURE__ */ e.jsxs("div", { className: "relative w-4 flex items-center", children: [
                  /* @__PURE__ */ e.jsx(Je, { size: 16, className: `${M ? "" : "scale-0 translate-y-10"} transition-all absolute` }),
                  /* @__PURE__ */ e.jsx(Xe, { size: 16, className: `${M ? "scale-0 -translate-y-10" : ""} transition-all absolute` })
                ] }),
                ee > 400 && (M ? "Pause" : "Play")
              ]
            }
          ),
          p.stop && /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: Ce,
              disabled: !o,
              className: `${d ? "bg-gray-100 text-black hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-800"} px-3 py-3 rounded-full text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
              children: /* @__PURE__ */ e.jsx(gr, { size: 16 })
            }
          ),
          p.fullscreen && /* @__PURE__ */ e.jsxs(
            "button",
            {
              onClick: He,
              className: `${ee < 800 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${d ? "bg-gray-100 text-black hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-800"}`,
              children: [
                ue ? /* @__PURE__ */ e.jsx(Fr, { size: 16 }) : /* @__PURE__ */ e.jsx(Ar, { size: 16 }),
                /* @__PURE__ */ e.jsx("span", { style: { display: ee < 800 ? "none" : "block" }, children: ue ? "Exit" : "Full" })
              ]
            }
          ),
          p.equalizer && /* @__PURE__ */ e.jsxs(
            "button",
            {
              onClick: () => W(!ke),
              disabled: !o,
              className: `${ee < 700 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${ke ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
              style: ke ? { backgroundColor: T } : {},
              children: [
                /* @__PURE__ */ e.jsx(Ge, { size: 16 }),
                /* @__PURE__ */ e.jsx("span", { style: { display: ee < 700 ? "none" : "block" }, children: "EQ" })
              ]
            }
          ),
          p.volume && /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 md:gap-3 ml-auto", children: [
            /* @__PURE__ */ e.jsx(
              "button",
              {
                onClick: Me,
                className: "p-2 rounded-lg hover:bg-gray-100 transition-all",
                children: we || k === 0 ? /* @__PURE__ */ e.jsx(tr, { size: 20, className: d ? "text-gray-100" : "text-gray-600" }) : /* @__PURE__ */ e.jsx(rr, { size: 20, className: d ? "text-gray-100" : "text-gray-600" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "range",
                min: "0",
                max: "100",
                value: k,
                onChange: Le,
                className: "hide-for-xs w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
                style: {
                  background: `linear-gradient(to right, ${T} ${k}%, #e5e7eb ${k}%)`,
                  display: ee < 460 ? "none" : "block"
                }
              }
            ),
            /* @__PURE__ */ e.jsxs("span", { style: { display: ee < 800 ? "none" : "block" }, className: `text-xs ${d ? "text-gray-100" : "text-gray-700"} font-mono w-10 text-right`, children: [
              k,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("style", { children: `
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
function Qr() {
  const [o, u] = j(null), [f, g] = j("No track loaded"), [q, p] = j("purple"), [w, h] = j(!1), [b, T] = j(!1), [L, M] = j("light"), _ = N(null), Y = (G) => {
    var k;
    const J = (k = G.target.files) == null ? void 0 : k[0];
    if (J) {
      const y = URL.createObjectURL(J);
      u(y), g(J.name);
    }
  }, K = () => {
    var G;
    (G = _.current) == null || G.click();
  };
  return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen flex items-center justify-center p-4 md:p-8", style: { backgroundColor: L === "dark" ? "#222" : "white" }, children: /* @__PURE__ */ e.jsxs("div", { className: "w-full h-full md:h-auto md:max-w-4xl", children: [
    w && /* @__PURE__ */ e.jsx(Ur, { theme: q, setTheme: p, close: () => h(!1) }),
    /* @__PURE__ */ e.jsxs("div", { className: "container-glass rounded-xl p-8", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "mb-6 flex justify-between items-start", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("h1", { className: `text-2xl font-semibold ${L === "dark" ? "text-gray-200" : "text-gray-800"} mb-1`, children: "Audio Visualizer" }),
          /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-500", children: "Professional frequency analyzer" })
        ] }),
        /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: () => h(!w),
            className: "bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              /* @__PURE__ */ e.jsx("span", { children: "🎨" }),
              " Themes"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(
        Yr,
        {
          audio: o || void 0,
          name: f || void 0,
          author: "K.Prabhasha",
          theme: q,
          autoPlay: !1,
          thumbnail: "https://cdn-icons-png.flaticon.com/512/3845/3845874.png",
          mode: L,
          transparent: b,
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
      /* @__PURE__ */ e.jsx(Kr, { audio: o || "", width: 400, thumbnail: "https://cdn-icons-png.flaticon.com/512/8316/8316619.png", autoPlay: !1, gradient: ["#26ce3aff", "#39eed9ff"], background: "#c0ffefff" }),
      /* @__PURE__ */ e.jsx(Gr, { audio: o || "", thumbnail: "https://cdn-icons-png.flaticon.com/512/17524/17524837.png", autoPlay: !1, gradient: ["#26ce3aff", "#39eed9ff"], background: "#c0ffefff" }),
      /* @__PURE__ */ e.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "file",
            ref: _,
            onChange: Y,
            accept: "audio/*",
            className: "hidden"
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: K,
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              /* @__PURE__ */ e.jsx(Hr, { size: 16 }),
              "Load Audio"
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => M(L === "dark" ? "light" : "dark"),
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: L === "dark" ? "Light" : "Dark"
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: () => T(!b),
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              "Transparent: ",
              String(b)
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Qr as DemoVisualizePlayer,
  Gr as NanoAudioPlayer,
  Ur as ThemeSelector,
  Xr as VideoPlayer,
  Yr as VisualizePlayer,
  Kr as WaveAudioPlayer,
  Se as themes
};
