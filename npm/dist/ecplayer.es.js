import xt, { forwardRef as gt, createElement as rt, useState as v, useRef as C, useEffect as L } from "react";
var nt = { exports: {} }, Je = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ut;
function $t() {
  if (ut) return Je;
  ut = 1;
  var o = xt, u = Symbol.for("react.element"), g = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, _ = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function k(y, N, q) {
    var M, O = {}, S = null, V = null;
    q !== void 0 && (S = "" + q), N.key !== void 0 && (S = "" + N.key), N.ref !== void 0 && (V = N.ref);
    for (M in N) m.call(N, M) && !p.hasOwnProperty(M) && (O[M] = N[M]);
    if (y && y.defaultProps) for (M in N = y.defaultProps, N) O[M] === void 0 && (O[M] = N[M]);
    return { $$typeof: u, type: y, key: S, ref: V, props: O, _owner: _.current };
  }
  return Je.Fragment = g, Je.jsx = k, Je.jsxs = k, Je;
}
var Xe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dt;
function Et() {
  return dt || (dt = 1, process.env.NODE_ENV !== "production" && function() {
    var o = xt, u = Symbol.for("react.element"), g = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), y = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), V = Symbol.for("react.offscreen"), U = Symbol.iterator, Y = "@@iterator";
    function K(t) {
      if (t === null || typeof t != "object")
        return null;
      var n = U && t[U] || t[Y];
      return typeof n == "function" ? n : null;
    }
    var $ = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(t) {
      {
        for (var n = arguments.length, c = new Array(n > 1 ? n - 1 : 0), h = 1; h < n; h++)
          c[h - 1] = arguments[h];
        we("error", t, c);
      }
    }
    function we(t, n, c) {
      {
        var h = $.ReactDebugCurrentFrame, D = h.getStackAddendum();
        D !== "" && (n += "%s", c = c.concat([D]));
        var W = c.map(function(A) {
          return String(A);
        });
        W.unshift("Warning: " + n), Function.prototype.apply.call(console[t], console, W);
      }
    }
    var me = !1, $e = !1, se = !1, ce = !1, ye = !1, he;
    he = Symbol.for("react.module.reference");
    function X(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === m || t === p || ye || t === _ || t === q || t === M || ce || t === V || me || $e || se || typeof t == "object" && t !== null && (t.$$typeof === S || t.$$typeof === O || t.$$typeof === k || t.$$typeof === y || t.$$typeof === N || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === he || t.getModuleId !== void 0));
    }
    function ke(t, n, c) {
      var h = t.displayName;
      if (h)
        return h;
      var D = n.displayName || n.name || "";
      return D !== "" ? c + "(" + D + ")" : c;
    }
    function H(t) {
      return t.displayName || "Context";
    }
    function F(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case m:
          return "Fragment";
        case g:
          return "Portal";
        case p:
          return "Profiler";
        case _:
          return "StrictMode";
        case q:
          return "Suspense";
        case M:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case y:
            var n = t;
            return H(n) + ".Consumer";
          case k:
            var c = t;
            return H(c._context) + ".Provider";
          case N:
            return ke(t, t.render, "ForwardRef");
          case O:
            var h = t.displayName || null;
            return h !== null ? h : F(t.type) || "Memo";
          case S: {
            var D = t, W = D._payload, A = D._init;
            try {
              return F(A(W));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, fe = 0, be, ue, le, R, f, B, ie;
    function Ne() {
    }
    Ne.__reactDisabledLog = !0;
    function Q() {
      {
        if (fe === 0) {
          be = console.log, ue = console.info, le = console.warn, R = console.error, f = console.group, B = console.groupCollapsed, ie = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: Ne,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        fe++;
      }
    }
    function xe() {
      {
        if (fe--, fe === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, t, {
              value: be
            }),
            info: z({}, t, {
              value: ue
            }),
            warn: z({}, t, {
              value: le
            }),
            error: z({}, t, {
              value: R
            }),
            group: z({}, t, {
              value: f
            }),
            groupCollapsed: z({}, t, {
              value: B
            }),
            groupEnd: z({}, t, {
              value: ie
            })
          });
        }
        fe < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ne = $.ReactCurrentDispatcher, T;
    function oe(t, n, c) {
      {
        if (T === void 0)
          try {
            throw Error();
          } catch (D) {
            var h = D.stack.trim().match(/\n( *(at )?)/);
            T = h && h[1] || "";
          }
        return `
` + T + t;
      }
    }
    var ae = !1, s;
    {
      var x = typeof WeakMap == "function" ? WeakMap : Map;
      s = new x();
    }
    function E(t, n) {
      if (!t || ae)
        return "";
      {
        var c = s.get(t);
        if (c !== void 0)
          return c;
      }
      var h;
      ae = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var W;
      W = ne.current, ne.current = null, Q();
      try {
        if (n) {
          var A = function() {
            throw Error();
          };
          if (Object.defineProperty(A.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(A, []);
            } catch (pe) {
              h = pe;
            }
            Reflect.construct(t, [], A);
          } else {
            try {
              A.call();
            } catch (pe) {
              h = pe;
            }
            t.call(A.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (pe) {
            h = pe;
          }
          t();
        }
      } catch (pe) {
        if (pe && h && typeof pe.stack == "string") {
          for (var P = pe.stack.split(`
`), ge = h.stack.split(`
`), ee = P.length - 1, re = ge.length - 1; ee >= 1 && re >= 0 && P[ee] !== ge[re]; )
            re--;
          for (; ee >= 1 && re >= 0; ee--, re--)
            if (P[ee] !== ge[re]) {
              if (ee !== 1 || re !== 1)
                do
                  if (ee--, re--, re < 0 || P[ee] !== ge[re]) {
                    var je = `
` + P[ee].replace(" at new ", " at ");
                    return t.displayName && je.includes("<anonymous>") && (je = je.replace("<anonymous>", t.displayName)), typeof t == "function" && s.set(t, je), je;
                  }
                while (ee >= 1 && re >= 0);
              break;
            }
        }
      } finally {
        ae = !1, ne.current = W, xe(), Error.prepareStackTrace = D;
      }
      var Ye = t ? t.displayName || t.name : "", Be = Ye ? oe(Ye) : "";
      return typeof t == "function" && s.set(t, Be), Be;
    }
    function G(t, n, c) {
      return E(t, !1);
    }
    function J(t) {
      var n = t.prototype;
      return !!(n && n.isReactComponent);
    }
    function te(t, n, c) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return E(t, J(t));
      if (typeof t == "string")
        return oe(t);
      switch (t) {
        case q:
          return oe("Suspense");
        case M:
          return oe("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case N:
            return G(t.render);
          case O:
            return te(t.type, n, c);
          case S: {
            var h = t, D = h._payload, W = h._init;
            try {
              return te(W(D), n, c);
            } catch {
            }
          }
        }
      return "";
    }
    var d = Object.prototype.hasOwnProperty, j = {}, ve = $.ReactDebugCurrentFrame;
    function qe(t) {
      if (t) {
        var n = t._owner, c = te(t.type, t._source, n ? n.type : null);
        ve.setExtraStackFrame(c);
      } else
        ve.setExtraStackFrame(null);
    }
    function Fe(t, n, c, h, D) {
      {
        var W = Function.call.bind(d);
        for (var A in t)
          if (W(t, A)) {
            var P = void 0;
            try {
              if (typeof t[A] != "function") {
                var ge = Error((h || "React class") + ": " + c + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ge.name = "Invariant Violation", ge;
              }
              P = t[A](n, A, h, c, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ee) {
              P = ee;
            }
            P && !(P instanceof Error) && (qe(D), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", h || "React class", c, A, typeof P), qe(null)), P instanceof Error && !(P.message in j) && (j[P.message] = !0, qe(D), b("Failed %s type: %s", c, P.message), qe(null));
          }
      }
    }
    var Ee = Array.isArray;
    function _e(t) {
      return Ee(t);
    }
    function Ce(t) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, c = n && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return c;
      }
    }
    function He(t) {
      try {
        return Le(t), !1;
      } catch {
        return !0;
      }
    }
    function Le(t) {
      return "" + t;
    }
    function Me(t) {
      if (He(t))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ce(t)), Le(t);
    }
    var Oe = $.ReactCurrentOwner, We = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ve, Ue;
    function ze(t) {
      if (d.call(t, "ref")) {
        var n = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function Ke(t) {
      if (d.call(t, "key")) {
        var n = Object.getOwnPropertyDescriptor(t, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function Se(t, n) {
      typeof t.ref == "string" && Oe.current;
    }
    function Re(t, n) {
      {
        var c = function() {
          Ve || (Ve = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        c.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: c,
          configurable: !0
        });
      }
    }
    function Ie(t, n) {
      {
        var c = function() {
          Ue || (Ue = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        c.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: c,
          configurable: !0
        });
      }
    }
    var r = function(t, n, c, h, D, W, A) {
      var P = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: u,
        // Built-in properties that belong on the element
        type: t,
        key: n,
        ref: c,
        props: A,
        // Record the component responsible for creating this element.
        _owner: W
      };
      return P._store = {}, Object.defineProperty(P._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(P, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: h
      }), Object.defineProperty(P, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: D
      }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
    };
    function a(t, n, c, h, D) {
      {
        var W, A = {}, P = null, ge = null;
        c !== void 0 && (Me(c), P = "" + c), Ke(n) && (Me(n.key), P = "" + n.key), ze(n) && (ge = n.ref, Se(n, D));
        for (W in n)
          d.call(n, W) && !We.hasOwnProperty(W) && (A[W] = n[W]);
        if (t && t.defaultProps) {
          var ee = t.defaultProps;
          for (W in ee)
            A[W] === void 0 && (A[W] = ee[W]);
        }
        if (P || ge) {
          var re = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          P && Re(A, re), ge && Ie(A, re);
        }
        return r(t, P, ge, D, h, Oe.current, A);
      }
    }
    var l = $.ReactCurrentOwner, i = $.ReactDebugCurrentFrame;
    function w(t) {
      if (t) {
        var n = t._owner, c = te(t.type, t._source, n ? n.type : null);
        i.setExtraStackFrame(c);
      } else
        i.setExtraStackFrame(null);
    }
    var I;
    I = !1;
    function de(t) {
      return typeof t == "object" && t !== null && t.$$typeof === u;
    }
    function Te() {
      {
        if (l.current) {
          var t = F(l.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function De(t) {
      return "";
    }
    var Z = {};
    function Ge(t) {
      {
        var n = Te();
        if (!n) {
          var c = typeof t == "string" ? t : t.displayName || t.name;
          c && (n = `

Check the top-level render call using <` + c + ">.");
        }
        return n;
      }
    }
    function lt(t, n) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var c = Ge(n);
        if (Z[c])
          return;
        Z[c] = !0;
        var h = "";
        t && t._owner && t._owner !== l.current && (h = " It was passed a child from " + F(t._owner.type) + "."), w(t), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', c, h), w(null);
      }
    }
    function it(t, n) {
      {
        if (typeof t != "object")
          return;
        if (_e(t))
          for (var c = 0; c < t.length; c++) {
            var h = t[c];
            de(h) && lt(h, n);
          }
        else if (de(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var D = K(t);
          if (typeof D == "function" && D !== t.entries)
            for (var W = D.call(t), A; !(A = W.next()).done; )
              de(A.value) && lt(A.value, n);
        }
      }
    }
    function ht(t) {
      {
        var n = t.type;
        if (n == null || typeof n == "string")
          return;
        var c;
        if (typeof n == "function")
          c = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === N || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === O))
          c = n.propTypes;
        else
          return;
        if (c) {
          var h = F(n);
          Fe(c, t.props, "prop", h, t);
        } else if (n.PropTypes !== void 0 && !I) {
          I = !0;
          var D = F(n);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function yt(t) {
      {
        for (var n = Object.keys(t.props), c = 0; c < n.length; c++) {
          var h = n[c];
          if (h !== "children" && h !== "key") {
            w(t), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", h), w(null);
            break;
          }
        }
        t.ref !== null && (w(t), b("Invalid attribute `ref` supplied to `React.Fragment`."), w(null));
      }
    }
    var ot = {};
    function ct(t, n, c, h, D, W) {
      {
        var A = X(t);
        if (!A) {
          var P = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (P += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ge = De();
          ge ? P += ge : P += Te();
          var ee;
          t === null ? ee = "null" : _e(t) ? ee = "array" : t !== void 0 && t.$$typeof === u ? (ee = "<" + (F(t.type) || "Unknown") + " />", P = " Did you accidentally export a JSX literal instead of a component?") : ee = typeof t, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ee, P);
        }
        var re = a(t, n, c, D, W);
        if (re == null)
          return re;
        if (A) {
          var je = n.children;
          if (je !== void 0)
            if (h)
              if (_e(je)) {
                for (var Ye = 0; Ye < je.length; Ye++)
                  it(je[Ye], t);
                Object.freeze && Object.freeze(je);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              it(je, t);
        }
        if (d.call(n, "key")) {
          var Be = F(t), pe = Object.keys(n).filter(function(Nt) {
            return Nt !== "key";
          }), tt = pe.length > 0 ? "{key: someKey, " + pe.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ot[Be + tt]) {
            var kt = pe.length > 0 ? "{" + pe.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, tt, Be, kt, Be), ot[Be + tt] = !0;
          }
        }
        return t === m ? yt(re) : ht(re), re;
      }
    }
    function bt(t, n, c) {
      return ct(t, n, c, !0);
    }
    function vt(t, n, c) {
      return ct(t, n, c, !1);
    }
    var jt = vt, wt = bt;
    Xe.Fragment = m, Xe.jsx = jt, Xe.jsxs = wt;
  }()), Xe;
}
process.env.NODE_ENV === "production" ? nt.exports = $t() : nt.exports = Et();
var e = nt.exports;
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ct = (o) => o.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Rt = (o) => o.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (u, g, m) => m ? m.toUpperCase() : g.toLowerCase()
), ft = (o) => {
  const u = Rt(o);
  return u.charAt(0).toUpperCase() + u.slice(1);
}, pt = (...o) => o.filter((u, g, m) => !!u && u.trim() !== "" && m.indexOf(u) === g).join(" ").trim(), Tt = (o) => {
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
var Pt = {
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
const qt = gt(
  ({
    color: o = "currentColor",
    size: u = 24,
    strokeWidth: g = 2,
    absoluteStrokeWidth: m,
    className: _ = "",
    children: p,
    iconNode: k,
    ...y
  }, N) => rt(
    "svg",
    {
      ref: N,
      ...Pt,
      width: u,
      height: u,
      stroke: o,
      strokeWidth: m ? Number(g) * 24 / Number(u) : g,
      className: pt("lucide", _),
      ...!p && !Tt(y) && { "aria-hidden": "true" },
      ...y
    },
    [
      ...k.map(([q, M]) => rt(q, M)),
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
const Pe = (o, u) => {
  const g = gt(
    ({ className: m, ..._ }, p) => rt(qt, {
      ref: p,
      iconNode: u,
      className: pt(
        `lucide-${Ct(ft(o))}`,
        `lucide-${o}`,
        m
      ),
      ..._
    })
  );
  return g.displayName = ft(o), g;
};
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _t = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], St = Pe("maximize", _t);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const At = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
], Ft = Pe("minimize", At);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lt = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], Ze = Pe("pause", Lt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mt = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], et = Pe("play", Mt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ot = [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
], zt = Pe("repeat", Ot);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const It = [
  ["line", { x1: "4", x2: "4", y1: "21", y2: "14", key: "1p332r" }],
  ["line", { x1: "4", x2: "4", y1: "10", y2: "3", key: "gb41h5" }],
  ["line", { x1: "12", x2: "12", y1: "21", y2: "12", key: "hf2csr" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "3", key: "1kfi7u" }],
  ["line", { x1: "20", x2: "20", y1: "21", y2: "16", key: "1lhrwl" }],
  ["line", { x1: "20", x2: "20", y1: "12", y2: "3", key: "16vvfq" }],
  ["line", { x1: "2", x2: "6", y1: "14", y2: "14", key: "1uebub" }],
  ["line", { x1: "10", x2: "14", y1: "8", y2: "8", key: "1yglbp" }],
  ["line", { x1: "18", x2: "22", y1: "16", y2: "16", key: "1jxqpz" }]
], Qe = Pe("sliders-vertical", It);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dt = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], mt = Pe("square", Dt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bt = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], Ht = Pe("upload", Bt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wt = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], at = Pe("volume-2", Wt);
/**
 * @license lucide-react v0.540.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vt = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
], st = Pe("volume-x", Vt), Ae = {
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
function Ut({ theme: o, setTheme: u, close: g }) {
  const m = Object.keys(Ae).map((_) => ({
    key: _,
    name: Ae[_].name,
    colors: Ae[_].bars
  }));
  return /* @__PURE__ */ e.jsxs("div", { className: "container-glass rounded-xl p-6 mb-6", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "text-lg font-semibold text-gray-800", children: "Choose Color Palette" }),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => g(),
          className: "text-gray-500 hover:text-gray-700 text-sm font-medium",
          children: "Close"
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "theme-selector grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: m.map((_) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `theme-card bg-white p-4 rounded-lg cursor-pointer border-2 transition-all ${o === _.key ? "border-current shadow-lg" : "border-transparent"}`,
        onClick: () => u(_.key),
        children: [
          /* @__PURE__ */ e.jsx("div", { className: "color-preview h-10 rounded mb-2", style: { background: `linear-gradient(to right, ${_.colors.join(", ")})` } }),
          /* @__PURE__ */ e.jsx("div", { className: "text-sm font-medium text-gray-700", children: _.name })
        ]
      },
      _.key
    )) })
  ] });
}
function Yt({
  audio: o,
  name: u = "No track loaded",
  author: g,
  theme: m = "rainbow",
  volume: _ = 100,
  thumbnail: p = null,
  controls: k = {
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
  mode: y = "light",
  bands: N = null,
  transparent: q = !1,
  autoPlay: M = !1,
  equalizer: O = {
    bass: 0,
    mid: 0,
    treble: 0
  }
}) {
  const [S, V] = v(!1), [U, Y] = v(0), [K, $] = v(0), [b, we] = v(_ || 100), [me, $e] = v(!1), [se, ce] = v(!1), [ye, he] = v(!1), [X, ke] = v([]), [H, F] = v(!1), [z, fe] = v({
    bass: O.bass || 0,
    mid: O.mid || 0,
    treble: O.treble || 0
  }), [be, ue] = v(1), [le, R] = v(0), f = C(null), B = C(null), ie = C(null), Ne = C(null), Q = C(null), xe = C(null), ne = C(null), T = C(null), oe = C(null), ae = C(null);
  L(() => {
    const r = ae.current;
    if (!r) return;
    const a = new ResizeObserver((l) => {
      for (let i of l)
        R(i.contentRect.width);
    });
    return a.observe(r), () => a.disconnect();
  }, []), L(() => {
    const r = [];
    if (o && typeof o != "string" && r.push(["TypeError", "audio must be a string (URL or path)"]), u && typeof u != "string" && r.push(["TypeError", "name must be a string"]), m && typeof m != "string" && typeof m != "object")
      r.push(["TypeError", "theme must be a string or a valid theme object"]);
    else if (typeof m == "object") {
      const a = ["name", "bg", "bars", "peak", "button", "buttonHover", "slider"];
      for (const l of a)
        l in m || r.push(["ThemeError", `theme object missing key: ${l}`]);
    }
    (typeof _ != "number" || _ < 0 || _ > 100) && r.push(["TypeError", "volume must be a number between 0 and 100"]), typeof k != "object" || Array.isArray(k) ? r.push(["TypeError", "controls must be an object"]) : ["play", "pause", "stop", "seekbar", "volume", "loop", "trackName", "equalizer"].forEach((l) => {
      k && l in k && typeof k[l] != "boolean" && r.push(["TypeError", `controls.${l} must be a boolean`]);
    }), N && (Array.isArray(N) ? N.length === 0 ? r.push(["ValueError", "bands array cannot be empty"]) : N.forEach((a, l) => {
      typeof a.freq != "number" && r.push(["TypeError", `bands[${l}].freq must be a number`]);
    }) : r.push(["TypeError", "bands must be an array"])), r.length > 0 ? (ke(r), console.group("%cVisualizePlayer: Prop validation failed", "color:red"), r.forEach((a) => console.error(`${a[0]}: ${a[1]}`)), console.groupEnd()) : ke([]);
  }, [o, u, m, _, k, y, N]);
  const s = N || [
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
  ], x = C(s.map(() => 0)), E = C(s.map(() => 0)), G = C(s.map(() => 0)), J = C(!1), te = C(typeof m == "string" ? m : "purple");
  let d = typeof m == "string" ? Ae[m] || Ae.purple : typeof m == "object" ? m : Ae.purple;
  const j = y === "dark", ve = typeof k == "object" && Object.keys(k).length === 0;
  L(() => {
    typeof m == "string" ? te.current = m : te.current = "purple", Ce();
  }, [m]), L(() => {
    f.current || (f.current = new Audio());
    const r = f.current, a = () => {
      ye || Y(r.currentTime);
    }, l = () => {
      $(r.duration);
    }, i = () => {
      se || (V(!1), T.current && cancelAnimationFrame(T.current));
    }, w = () => V(!0), I = () => V(!1);
    return r.addEventListener("timeupdate", a), r.addEventListener("loadedmetadata", l), r.addEventListener("ended", i), r.addEventListener("play", w), r.addEventListener("pause", I), () => {
      r.removeEventListener("timeupdate", a), r.removeEventListener("loadedmetadata", l), r.removeEventListener("ended", i), r.removeEventListener("play", w), r.removeEventListener("pause", I);
    };
  }, [ye, se]), L(() => () => {
    f.current && (f.current.pause(), f.current.src = "", f.current.load()), B.current && B.current.close().catch((r) => console.warn("AudioContext cleanup error:", r)), T.current && cancelAnimationFrame(T.current);
  }, []), L(() => {
    if (o) {
      const r = S, a = b, l = se;
      if (T.current && (cancelAnimationFrame(T.current), T.current = null), Ne.current) {
        try {
          Ne.current.disconnect();
        } catch (Z) {
          console.warn("Source disconnect error:", Z);
        }
        Ne.current = null;
      }
      if (ie.current) {
        try {
          ie.current.disconnect();
        } catch (Z) {
          console.warn("Analyser disconnect error:", Z);
        }
        ie.current = null;
      }
      if (Q.current) {
        try {
          Q.current.disconnect();
        } catch (Z) {
          console.warn("Bass filter disconnect error:", Z);
        }
        Q.current = null;
      }
      if (xe.current) {
        try {
          xe.current.disconnect();
        } catch (Z) {
          console.warn("Mid filter disconnect error:", Z);
        }
        xe.current = null;
      }
      if (ne.current) {
        try {
          ne.current.disconnect();
        } catch (Z) {
          console.warn("Treble filter disconnect error:", Z);
        }
        ne.current = null;
      }
      B.current && (B.current.close().catch((Z) => console.warn("AudioContext close error:", Z)), B.current = null), f.current && (f.current.pause(), f.current.src = "", f.current.load()), f.current = new Audio();
      try {
        f.current.crossOrigin = "anonymous";
      } catch (Z) {
        console.debug("Could not set crossOrigin on audio element", Z);
      }
      f.current.src = o, f.current.preload = "auto", f.current.muted = !1, f.current.volume = me ? 0 : a / 100, f.current.loop = l, f.current.load();
      const i = f.current, w = () => {
        ye || Y(i.currentTime);
      }, I = () => {
        $(i.duration);
      }, de = () => {
        se || (V(!1), T.current && cancelAnimationFrame(T.current));
      }, Te = () => V(!0), De = () => V(!1);
      i.addEventListener("timeupdate", w), i.addEventListener("loadedmetadata", I), i.addEventListener("ended", de), i.addEventListener("play", Te), i.addEventListener("pause", De), Y(0), V(!1), console.debug("Audio element created", { src: f.current.src, volume: f.current.volume, loop: f.current.loop }), x.current = s.map(() => 0), E.current = s.map(() => 0), G.current = s.map(() => 0), Ce(), r && f.current.play().catch((Z) => console.error("Play failed:", Z));
    }
  }, [o]), L(() => {
    f.current && (f.current.volume = me ? 0 : b / 100);
  }, [b, me]), L(() => {
    f.current && (f.current.loop = se);
  }, [se]), L(() => {
    f.current && (f.current.playbackRate = be);
  }, [be]), L(() => {
    B.current && (Q.current && (Q.current.gain.value = z.bass), xe.current && (xe.current.gain.value = z.mid), ne.current && (ne.current.gain.value = z.treble));
  }, [z]), L(() => {
    J.current = S, T.current && (cancelAnimationFrame(T.current), T.current = null), S ? (B.current || qe(), _e()) : Ee();
  }, [S]);
  const qe = () => {
    if (!B.current && f.current)
      try {
        const r = window.AudioContext || window.webkitAudioContext;
        if (r) {
          const a = new r();
          B.current = a;
          const l = a.createBiquadFilter();
          l.type = "lowshelf", l.frequency.value = 320, l.gain.value = z.bass;
          const i = a.createBiquadFilter();
          i.type = "peaking", i.frequency.value = 1e3, i.Q.value = 0.5, i.gain.value = z.mid;
          const w = a.createBiquadFilter();
          w.type = "highshelf", w.frequency.value = 3200, w.gain.value = z.treble;
          const I = a.createAnalyser();
          I.fftSize = 8192, I.smoothingTimeConstant = 0.7;
          const de = a.createMediaElementSource(f.current);
          de.connect(l), l.connect(i), i.connect(w), w.connect(I), I.connect(a.destination), Q.current = l, xe.current = i, ne.current = w, ie.current = I, Ne.current = de;
        }
      } catch (r) {
        console.error("Failed to setup audio context:", r);
      }
  }, Fe = (r) => {
    const a = B.current, l = ie.current;
    if (!a || !l) return 0;
    const i = a.sampleRate / 2, w = Math.round(r / i * l.frequencyBinCount);
    return Math.min(w, l.frequencyBinCount - 1);
  }, Ee = () => {
    if (J.current) return;
    x.current = x.current.map((i) => i * 0.7);
    const r = Date.now();
    E.current = E.current.map((i, w) => r - G.current[w] > 1500 ? i * 0.95 : i), Ce();
    const a = Math.max(...x.current), l = Math.max(...E.current);
    a > 0.01 || l > 0.01 ? T.current = requestAnimationFrame(Ee) : (J.current || (x.current = s.map(() => 0), E.current = s.map(() => 0), G.current = s.map(() => 0), Ce()), T.current && cancelAnimationFrame(T.current), T.current = null);
  }, _e = () => {
    if (!ie.current || !J.current) return;
    const r = ie.current.frequencyBinCount, a = new Uint8Array(r);
    ie.current.getByteFrequencyData(a), s.forEach((l, i) => {
      const w = Fe(l.freq), I = i < s.length - 1 ? Fe(s[i + 1].freq) : a.length;
      let de = 0, Te = 0;
      for (let Ge = w; Ge < I; Ge++)
        de += a[Ge], Te++;
      let De = Te > 0 ? de / Te / 255 : 0;
      De = Math.pow(De, 0.6), x.current[i] = x.current[i] * 0.8 + De * 0.2;
      const Z = Date.now();
      x.current[i] > E.current[i] ? (E.current[i] = x.current[i], G.current[i] = Z) : Z - G.current[i] > 1500 && (E.current[i] *= 0.95);
    }), Ce(), T.current = requestAnimationFrame(_e);
  }, Ce = () => {
    if (!oe.current) return;
    const r = Ae[te.current] || Ae.rainbow;
    let a = "";
    s.forEach((l, i) => {
      const w = x.current[i] * 100, I = 100 - E.current[i] * 100, de = Math.floor(i / s.length * r.bars.length), Te = r.bars[Math.min(de, r.bars.length - 1)];
      a += `
                <div class="flex-1 h-full relative flex flex-col justify-end">
                    <div class="rounded-t transition-all duration-75" style="height: ${w}%; background: ${Te};">
                        ${E.current[i] > 0.1 ? `<div class="absolute w-full h-0.5 transition-all duration-100" style="top: ${I}%; background: ${r.peak};"></div>` : ""}
                    </div>
                </div>
            `;
    }), oe.current.innerHTML = a;
  }, He = () => {
    !f.current || !o || (S ? f.current.pause() : (B.current && B.current.state === "suspended" && B.current.resume(), f.current.play().catch((r) => console.error("Play failed:", r))));
  }, Le = () => {
    f.current && (f.current.pause(), f.current.currentTime = 0, V(!1), Y(0), x.current = s.map(() => 0), E.current = s.map(() => 0), G.current = s.map(() => 0), Ce());
  }, Me = (r) => {
    const l = parseFloat(r.target.value) / 100 * K;
    Y(l), f.current && !ye && (f.current.currentTime = l);
  }, Oe = () => {
    he(!0);
  }, We = () => {
    f.current && (f.current.currentTime = U), he(!1);
  }, Ve = (r) => {
    const a = parseInt(r.target.value);
    we(a), $e(a === 0);
  }, Ue = () => {
    $e(!me);
  }, ze = (r) => {
    ue(parseFloat(r.target.value));
  }, Ke = () => {
    ce(!se);
  }, Se = (r, a) => {
    fe((l) => ({
      ...l,
      [r]: a
    }));
  }, Re = () => {
    fe({ bass: 0, mid: 0, treble: 0 });
  };
  L(() => {
    ((typeof k == "object" && Object.keys(k).length === 0 || !k) && !S || M) && He();
  }, [k]);
  const Ie = (r) => {
    if (isNaN(r)) return "0:00";
    const a = Math.floor(r / 60), l = Math.floor(r % 60);
    return `${a}:${l.toString().padStart(2, "0")}`;
  };
  return X && X.length > 0 ? X.map((r, a) => /* @__PURE__ */ e.jsxs("div", { className: "text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300", children: [
    /* @__PURE__ */ e.jsxs("strong", { children: [
      r[0],
      ":"
    ] }),
    " ",
    r[1]
  ] }, a)) : /* @__PURE__ */ e.jsx("div", { ref: ae, className: "w-full rounded-xl overflow-hidden", style: { backgroundColor: ve || q ? void 0 : j ? "#6060606a" : "#ffffffab" }, children: /* @__PURE__ */ e.jsxs("div", { style: { background: ve || q ? void 0 : d.bg }, className: ve || q ? "" : "p-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ e.jsx("div", { className: `${q && H ? "opacity-30" : ""} ${ve || q ? "" : j ? "bg-black/40" : "bg-white/70"} rounded-lg ${ve ? "" : "mb-6"} ${ve || q ? "" : "p-4"} shadow-sm`, children: /* @__PURE__ */ e.jsx("div", { className: "flex justify-center items-end gap-1 h-64", ref: oe }) }),
      H && /* @__PURE__ */ e.jsxs("div", { className: `absolute inset-0 flex flex-col w-full justify-center z-10 ${!(ve || q) && (j ? "bg-black/50" : "bg-white/80")} rounded-lg p-4 shadow-sm transition-all duration-300`, children: [
        /* @__PURE__ */ e.jsx("h3", { className: `text-sm font-medium mb-4 ${j ? "text-gray-200" : "text-gray-700"}`, children: "Equalizer" }),
        /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-300" : "text-gray-600"}`, children: "Bass" }),
              /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${j ? "text-gray-300" : "text-gray-600"}`, children: [
                z.bass,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: z.bass,
                  onChange: (r) => Se("bass", parseInt(r.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${d.slider} ${(z.bass + 20) / 40 * 100}%, ${d.slider + "30"} ${(z.bass + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-300" : "text-gray-600"}`, children: "Mid" }),
              /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${j ? "text-gray-300" : "text-gray-600"}`, children: [
                z.mid,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: z.mid,
                  onChange: (r) => Se("mid", parseInt(r.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${d.slider} ${(z.mid + 20) / 40 * 100}%, ${d.slider + "30"} ${(z.mid + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-300" : "text-gray-600"}`, children: "Treble" }),
              /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${j ? "text-gray-300" : "text-gray-600"}`, children: [
                z.treble,
                " dB"
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
              /* @__PURE__ */ e.jsx(
                "input",
                {
                  type: "range",
                  min: "-20",
                  max: "20",
                  value: z.treble,
                  onChange: (r) => Se("treble", parseInt(r.target.value)),
                  className: "flex-1 h-8 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                  style: {
                    background: `linear-gradient(to right, ${d.slider} ${(z.treble + 20) / 40 * 100}%, ${d.slider + "30"} ${(z.treble + 20) / 40 * 100}%)`
                  }
                }
              ),
              /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: Re,
            className: `px-3 py-1 rounded text-xs ${j ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
            children: "Reset"
          }
        ) })
      ] })
    ] }),
    k.trackName && /* @__PURE__ */ e.jsxs("div", { className: "mb-6 flex items-center", children: [
      p && /* @__PURE__ */ e.jsx("div", { className: "mr-2", children: /* @__PURE__ */ e.jsx("img", { src: p, alt: "", className: `${S ? "animation-spin" : ""} h-12 w-12 rounded-full` }) }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { className: `${j ? "text-gray-100" : "text-gray-700"} font-medium truncate`, children: u }),
        g && typeof g == "string" && /* @__PURE__ */ e.jsx("div", { className: `${j ? "text-gray-300" : "text-gray-500"} text-xs`, children: g })
      ] })
    ] }),
    k.seekbar && /* @__PURE__ */ e.jsx("div", { className: "mb-6", children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center md:gap-1", children: [
      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-100" : "text-gray-600"} font-mono w-12`, children: Ie(U) }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "100",
          value: K > 0 ? U / K * 100 : 0,
          onChange: Me,
          onMouseDown: Oe,
          onMouseUp: We,
          onTouchStart: Oe,
          onTouchEnd: We,
          disabled: !o,
          className: "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
          style: {
            background: o && K > 0 ? `linear-gradient(to right, ${d.slider} ${U / K * 100}%, ${d.slider + "30"} ${U / K * 100}%)` : d.slider + "30"
          }
        }
      ),
      /* @__PURE__ */ e.jsx("span", { className: `text-xs ${j ? "text-gray-100" : "text-gray-600"} font-mono w-12 text-right`, children: Ie(K) })
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { className: `flex flex-wrap items-center ${le < 330 ? "gap-2" : "gap-3"}`, children: [
      k.play && /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: He,
          disabled: !o,
          className: `${le < 350 ? "px-3 py-5" : "px-4 py-2 md:w-24"} rounded-full text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:opacity-90`,
          style: { backgroundColor: d.button },
          children: [
            /* @__PURE__ */ e.jsxs("div", { className: "relative w-4 flex items-center", children: [
              /* @__PURE__ */ e.jsx(Ze, { size: 16, className: `${S ? "" : "scale-0 translate-y-10"} transition-all absolute` }),
              /* @__PURE__ */ e.jsx(et, { size: 16, className: `${S ? "scale-0 -translate-y-10" : ""} transition-all absolute` })
            ] }),
            /* @__PURE__ */ e.jsx("span", { style: { display: le < 350 ? "none" : "block" }, children: S ? "Pause" : "Play" })
          ]
        }
      ),
      k.stop && /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: Le,
          disabled: !o,
          className: `${j ? "bg-gray-100 text-black" : "bg-gray-700 text-white"} ${le < 600 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium ${j ? "hover:bg-gray-300" : "hover:bg-gray-800"} disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
          children: [
            /* @__PURE__ */ e.jsx(mt, { size: 16 }),
            /* @__PURE__ */ e.jsx("span", { style: { display: le < 600 ? "none" : "block" }, children: "Stop" })
          ]
        }
      ),
      k.equalizer && /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: () => F(!H),
          disabled: !o,
          className: `${le < 600 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${H ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
          style: H ? { backgroundColor: d.button } : {},
          children: [
            /* @__PURE__ */ e.jsx(Qe, { size: 16 }),
            /* @__PURE__ */ e.jsx("span", { style: { display: le < 600 ? "none" : "block" }, children: "EQ" })
          ]
        }
      ),
      k.loop && /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: Ke,
          disabled: !o,
          className: `${le < 700 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${se ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
          style: se ? { backgroundColor: d.button } : {},
          children: [
            /* @__PURE__ */ e.jsx(zt, { size: 16, className: `${se ? "rotate-180" : ""} transition-all` }),
            /* @__PURE__ */ e.jsx("span", { style: { display: le < 700 ? "none" : "block" }, children: "Loop" })
          ]
        }
      ),
      k.speed && /* @__PURE__ */ e.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ e.jsxs(
        "select",
        {
          value: be,
          onChange: ze,
          className: `rounded-full text-sm font-medium border-none outline-none cursor-pointer transition-all bg-transparent ${j ? "text-gray-200" : "text-gray-800"}`,
          children: [
            /* @__PURE__ */ e.jsx("option", { value: "0.5", className: j ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "0.5x" }),
            /* @__PURE__ */ e.jsx("option", { value: "0.75", className: j ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "0.75x" }),
            /* @__PURE__ */ e.jsx("option", { value: "1", className: j ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "1x" }),
            /* @__PURE__ */ e.jsx("option", { value: "1.25", className: j ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "1.25x" }),
            /* @__PURE__ */ e.jsx("option", { value: "1.5", className: j ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "1.5x" }),
            /* @__PURE__ */ e.jsx("option", { value: "2", className: j ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800", children: "2x" })
          ]
        }
      ) }),
      k.volume && /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 md:gap-3 ml-auto", children: [
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: Ue,
            className: "p-2 rounded-full hover:bg-gray-100/50 transition-all",
            children: me || b === 0 ? /* @__PURE__ */ e.jsx(st, { size: 20, className: j ? "text-gray-100" : "text-gray-600" }) : /* @__PURE__ */ e.jsx(at, { size: 20, className: j ? "text-gray-100" : "text-gray-600" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "range",
            min: "0",
            max: "100",
            value: b,
            onChange: Ve,
            className: "hide-for-xs w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
            style: {
              background: `linear-gradient(to right, ${d.slider} ${b}%, ${d.slider + "30"} ${b}%)`,
              display: le < 460 ? "none" : "block"
            }
          }
        ),
        /* @__PURE__ */ e.jsxs("span", { style: { display: le < 800 ? "none" : "block" }, className: `hidden sm:block text-xs ${j ? "text-gray-100" : "text-gray-700"} font-mono w-10 text-right`, children: [
          b,
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
function Kt({
  audio: o,
  gradient: u = ["#cd7eff", "#ff00f2"],
  background: g = "#f4e4ffff",
  autoPlay: m = !1,
  thumbnail: _ = null,
  width: p,
  equalizer: k = {
    bass: 0,
    mid: 0,
    treble: 0
  },
  mode: y = "light"
}) {
  const [N, q] = v(!1), [M, O] = v(0), [S, V] = v(0), [U, Y] = v(!1), [K, $] = v(80), [b, we] = v(1), [me, $e] = v([]), [se, ce] = v(null), [ye, he] = v(!1), [X, ke] = v({
    bass: k.bass || 0,
    mid: k.mid || 0,
    treble: k.treble || 0
  }), H = C(null), F = C(null), z = C(null), fe = C(null), be = C(null), ue = C(null), le = () => {
    const s = [];
    for (let x = 0; x < 100; x++) {
      const E = 20 + Math.random() * 60;
      s.push(E);
    }
    return s;
  };
  L(() => {
    if (!o)
      return;
    if (!Array.isArray(u) || u.length < 2) {
      ce("Gradient must be an array with at least 2 colors");
      return;
    }
    const s = H.current;
    if (!s) return;
    const x = () => O(s.currentTime), E = () => {
      V(s.duration), $e(le());
    }, G = () => q(!1), J = (te) => {
      var d, j;
      ce(`Audio error: ${((j = (d = te.target) == null ? void 0 : d.error) == null ? void 0 : j.message) || "Failed to load audio"}`);
    };
    return s.addEventListener("timeupdate", x), s.addEventListener("loadedmetadata", E), s.addEventListener("ended", G), s.addEventListener("error", J), () => {
      s.removeEventListener("timeupdate", x), s.removeEventListener("loadedmetadata", E), s.removeEventListener("ended", G), s.removeEventListener("error", J);
    };
  }, [o, u, y]), L(() => {
    o && H.current && m && (H.current.play().catch((s) => {
      console.error("Play failed:", s), q(!1);
    }), q(!0));
  }, [o]), L(() => {
    if (H.current && !F.current && H.current) {
      const s = window.AudioContext || window.webkitAudioContext;
      if (s) {
        const x = new s();
        F.current = x;
        const E = x.createMediaElementSource(H.current);
        z.current = E;
        const G = x.createBiquadFilter();
        G.type = "lowshelf", G.frequency.value = 200, fe.current = G;
        const J = x.createBiquadFilter();
        J.type = "peaking", J.frequency.value = 1e3, J.Q.value = 1, be.current = J;
        const te = x.createBiquadFilter();
        te.type = "highshelf", te.frequency.value = 3e3, ue.current = te, E.connect(G).connect(J).connect(te).connect(x.destination);
      }
    }
  }, [o]), L(() => {
    H.current && (H.current.volume = U ? 0 : K / 100);
  }, [K, U]), L(() => {
    H.current && (H.current.playbackRate = b);
  }, [b]);
  const R = () => {
    H.current && (N ? H.current.pause() : H.current.play().catch((s) => {
      ce(`Playback failed: ${s instanceof Error ? s.message : String(s)}`);
    }), q(!N));
  }, f = () => {
    Y(!U);
  }, B = (s) => {
    $(parseInt(s.target.value)), U && parseInt(s.target.value) > 0 && Y(!1);
  }, ie = (s) => {
    we(parseFloat(s.target.value));
  }, Ne = (s) => {
    const x = s.currentTarget.getBoundingClientRect(), J = (s.clientX - x.left) / x.width * S;
    H.current && (H.current.currentTime = J, O(J));
  }, Q = (s, x) => {
    ke((E) => ({ ...E, [s]: x })), s === "bass" && fe.current && (fe.current.gain.value = x), s === "mid" && be.current && (be.current.gain.value = x), s === "treble" && ue.current && (ue.current.gain.value = x);
  }, xe = () => {
    Q("bass", 0), Q("mid", 0), Q("treble", 0);
  }, ne = (s) => {
    if (isNaN(s)) return "0:00";
    const x = Math.floor(s / 60), E = Math.floor(s % 60);
    return `${x}:${E.toString().padStart(2, "0")}`;
  }, T = S > 0 ? M / S * 100 : 0;
  if (se)
    return /* @__PURE__ */ e.jsx("div", { className: "w-lg p-6 rounded-xl", style: { background: g }, children: /* @__PURE__ */ e.jsxs("div", { className: `text-center ${y === "dark" ? "text-red-300" : "text-red-600"}`, children: [
      /* @__PURE__ */ e.jsx("p", { className: "font-medium", children: "Error" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-sm", children: se })
    ] }) });
  if (!o) return null;
  const oe = y === "dark" ? "text-gray-300" : "text-gray-700", ae = y === "dark" ? "text-gray-400" : "text-gray-500";
  return /* @__PURE__ */ e.jsxs("div", { className: "w-full max-w-lg relative", style: { width: p + "px" }, children: [
    /* @__PURE__ */ e.jsx("audio", { ref: H, src: o }),
    /* @__PURE__ */ e.jsx("div", { className: "rounded-2xl shadow-2xl", children: /* @__PURE__ */ e.jsxs("div", { className: "rounded-2xl p-6 backdrop-blur-xl", style: { background: g }, children: [
      _ && /* @__PURE__ */ e.jsx("div", { className: "w-full p-4", children: /* @__PURE__ */ e.jsx("img", { src: _, alt: "", className: "w-full aspect-square rounded-xl" }) }),
      /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: "relative h-20 mb-6 cursor-pointer",
          onClick: Ne,
          children: [
            /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 flex items-end justify-center h-full w-full gap-px", children: me.map((s, x) => {
              const G = x / me.length * 100 <= T;
              return /* @__PURE__ */ e.jsx(
                "div",
                {
                  className: "w-1 rounded-t transition-all duration-150",
                  style: {
                    height: `${s}%`,
                    background: G ? u[0] : u[1],
                    opacity: G ? 1 : 0.4
                  }
                },
                x
              );
            }) }),
            /* @__PURE__ */ e.jsx(
              "div",
              {
                className: "absolute top-0 h-full w-1 bg-white border-r border-black rounded-full transition-all duration-150",
                style: { left: `${T}%`, transform: "translateX(-50%)" }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e.jsxs("div", { className: `flex justify-between text-sm ${ae} mb-6`, children: [
        /* @__PURE__ */ e.jsx("span", { children: ne(M) }),
        /* @__PURE__ */ e.jsx("span", { children: ne(S) })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "grid grid-cols-3 items-center justify-between mb-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: f,
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${u[0]}, ${u[1]})`
              },
              children: U || K === 0 ? /* @__PURE__ */ e.jsx(st, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ e.jsx(at, { className: "w-4 h-4 text-white" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: K,
              onChange: B,
              className: `${p ? "" : "hidden sm:block"} w-20 h-1.5 rounded-lg appearance-none cursor-pointer`,
              style: {
                background: `linear-gradient(to right, ${u[0]} ${K}%, ${y === "dark" ? "#374151" : "#d1d5db"} ${K}%)`,
                display: p && p < 400 ? "none" : void 0
              }
            }
          ),
          p && p < 400 && /* @__PURE__ */ e.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: () => he(!ye),
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${u[0]}, ${u[1]})`
              },
              children: /* @__PURE__ */ e.jsx(Qe, { className: "w-4 h-4 text-white" })
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: R,
            className: "p-4 rounded-full transition-all hover:scale-105 shadow-lg",
            style: {
              background: `linear-gradient(135deg, ${u[0]}, ${u[1]})`
            },
            children: N ? /* @__PURE__ */ e.jsx(Ze, { className: "w-6 h-6 text-white fill-white" }) : /* @__PURE__ */ e.jsx(et, { className: "w-6 h-6 text-white fill-white" })
          }
        ) }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ e.jsxs(
            "select",
            {
              value: b,
              style: { background: g, color: u[0] },
              onChange: ie,
              className: `py-1 px-2 rounded-lg text-sm ${oe} ${y === "dark" ? "bg-gray-800" : "bg-gray-100"}`,
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
              onClick: () => he(!ye),
              className: "p-2 rounded-full transition-all",
              style: {
                background: `linear-gradient(135deg, ${u[0]}, ${u[1]})`
              },
              children: /* @__PURE__ */ e.jsx(Qe, { className: "w-4 h-4 text-white" })
            }
          ) })
        ] })
      ] })
    ] }) }),
    ye && /* @__PURE__ */ e.jsx("div", { className: "absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10 rounded-2xl p-4", children: /* @__PURE__ */ e.jsxs("div", { className: `max-w-xs w-full p-4 pt-2 rounded-xl ${y === "dark" ? "bg-gray-800" : "bg-white"}`, children: [
      /* @__PURE__ */ e.jsx("h3", { className: `text-lg font-medium mb-2 ${y === "dark" ? "text-gray-200" : "text-gray-700"}`, children: "Equalizer" }),
      /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Bass" }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${y === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              X.bass,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: X.bass,
                onChange: (s) => Q("bass", parseInt(s.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${u[0]} ${(X.bass + 20) / 40 * 100}%, ${u[1] + "30"} ${(X.bass + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Mid" }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${y === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              X.mid,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: X.mid,
                onChange: (s) => Q("mid", parseInt(s.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${u[0]} ${(X.mid + 20) / 40 * 100}%, ${u[1] + "30"} ${(X.mid + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Treble" }),
            /* @__PURE__ */ e.jsxs("span", { className: `text-xs ${y === "dark" ? "text-gray-300" : "text-gray-600"}`, children: [
              X.treble,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "-20" }),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "range",
                min: "-20",
                max: "20",
                value: X.treble,
                onChange: (s) => Q("treble", parseInt(s.target.value)),
                className: "flex-1 h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                style: {
                  background: `linear-gradient(to right, ${u[0]} ${(X.treble + 20) / 40 * 100}%, ${u[1] + "30"} ${(X.treble + 20) / 40 * 100}%)`
                }
              }
            ),
            /* @__PURE__ */ e.jsx("span", { className: `text-xs ${y === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "+20" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex justify-between mt-6", children: [
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: xe,
            className: `px-3 py-1 rounded text-xs ${y === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
            children: "Reset"
          }
        ),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => he(!1),
            className: `px-3 py-1 rounded text-xs ${y === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
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
function Gt({ audio: o, thumbnail: u, gradient: g = ["#cd7eff", "#fe59f6"], background: m = "#1f273a", autoPlay: _ = !1 }) {
  const [p, k] = v(!1), [, y] = v(0), N = C(null), [q, M] = v(0), [O, S] = v(0), [V, U] = v(0);
  L(() => {
    const $ = N.current;
    if (!$) return;
    const b = () => y($.currentTime);
    return $.addEventListener("timeupdate", b), () => $.removeEventListener("timeupdate", b);
  }, []), L(() => {
    const $ = setInterval(() => {
      p && M((b) => b + 0.1);
    }, 100);
    return () => clearInterval($);
  }, [p]), L(() => {
    const $ = setInterval(() => {
      p && U((b) => b + 0.1);
    }, 100);
    return () => clearInterval($);
  }, [p]), L(() => {
    o && N.current && _ && (N.current.play().catch(() => k(!1)), k(!0));
  }, [o]), L(() => {
    const $ = N.current;
    if (!$) return;
    const b = () => {
      S($.duration), console.log("Audio duration:", $.duration);
    };
    return U(0), $.addEventListener("loadedmetadata", b), () => {
      $.removeEventListener("loadedmetadata", b);
    };
  }, [o]);
  const Y = () => {
    N.current && (p ? N.current.pause() : N.current.play().catch(($) => console.error("NanoPlayer play failed:", $)), k(!p));
  };
  if (!o) return null;
  const K = {
    background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`
  };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      style: { backgroundColor: m },
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
            ref: N,
            src: o,
            onEnded: () => {
              k(!1), U(0);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            style: {
              width: `${(O > 0 ? V / O : 0) * 100}%`,
              backgroundImage: K.background
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
                onClick: Y,
                style: K,
                className: "p-1.5 rounded-full hover:scale-110 transition-transform flex-shrink-0",
                children: p ? /* @__PURE__ */ e.jsx(Ze, { fill: m, className: "w-3 h-3 text-transparent" }) : /* @__PURE__ */ e.jsx(et, { fill: m, className: "w-3 h-3 text-transparent" })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { className: "flex w-full min-w-12 items-center gap-0.5 h-6", children: [...Array(12)].map(($, b) => /* @__PURE__ */ e.jsx(
              "div",
              {
                className: "rounded-full transition-all duration-200",
                style: {
                  width: "100%",
                  background: `linear-gradient(to top, ${g[0]}, ${g[1]})`,
                  height: p ? `${8 + Math.sin((q * 8 + b) * 0.6) * 10}px` : "8px",
                  opacity: p ? 0.8 : 0.4
                }
              },
              b
            )) })
          ] })
        ] })
      ]
    }
  );
}
function Xt({
  video: o,
  name: u = "No video loaded",
  audioVisual: g = null,
  volume: m = 100,
  thumbnail: _ = null,
  controls: p = {
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
  mode: k = "light",
  transparent: y = !1,
  autoPlay: N = !1,
  color: q = "#3b82f6",
  equalizer: M = {
    bass: 0,
    mid: 0,
    treble: 0
  }
}) {
  const [O, S] = v(!1), [V, U] = v(0), [Y, K] = v(0), [$, b] = v(m || 100), [we, me] = v(!1), [$e, se] = v(!1), [ce, ye] = v(!1), [he, X] = v([]), [ke, H] = v(!1), [F, z] = v({
    bass: M.bass || 0,
    mid: M.mid || 0,
    treble: M.treble || 0
  }), [fe, be] = v(1), [ue, le] = v(0), R = C(null), f = C(null), B = C(null), ie = C(null), Ne = C(null), Q = C(null), xe = C(null), ne = C(null), T = C(null), oe = C(null), ae = C(0), s = C(0), x = C(0), E = C(0), G = C(0), J = C(0), te = C(!1), d = k === "dark" || ce, j = typeof p == "object" && Object.keys(p).length === 0;
  L(() => {
    const r = f.current;
    if (!r) return;
    const a = new ResizeObserver((l) => {
      for (let i of l)
        le(i.contentRect.width);
    });
    return a.observe(r), () => a.disconnect();
  }, []), L(() => {
    const r = [];
    o && typeof o != "string" && r.push(["TypeError", "video must be a string (URL or path)"]), u && typeof u != "string" && r.push(["TypeError", "name must be a string"]), (typeof m != "number" || m < 0 || m > 100) && r.push(["TypeError", "volume must be a number between 0 and 100"]), g && typeof g != "object" ? r.push(["TypeError", "audioVisual must be an object"]) : g && (["left", "right", "top", "bottom"].includes(g.side) || r.push(["ValueError", "audioVisual.side must be 'left', 'right', 'top', or 'bottom'"])), r.length > 0 ? (X(r), console.group("%cVideoPlayer: Prop validation failed", "color:red"), r.forEach((a) => console.error(`${a[0]}: ${a[1]}`)), console.groupEnd()) : X([]);
  }, [o, u, m, g, p, k]), L(() => {
    if (!R.current) return;
    const r = R.current, a = () => {
      $e || U(r.currentTime);
    }, l = () => {
      K(r.duration);
    }, i = () => {
      S(!1), T.current && cancelAnimationFrame(T.current);
    }, w = () => S(!0), I = () => S(!1);
    return r.addEventListener("timeupdate", a), r.addEventListener("loadedmetadata", l), r.addEventListener("ended", i), r.addEventListener("play", w), r.addEventListener("pause", I), () => {
      r.removeEventListener("timeupdate", a), r.removeEventListener("loadedmetadata", l), r.removeEventListener("ended", i), r.removeEventListener("play", w), r.removeEventListener("pause", I);
    };
  }, [$e]), L(() => {
    if (o) {
      const r = O, a = $;
      if (R.current && R.current.pause(), R.current) {
        R.current.pause(), R.current.src = o, R.current.volume = we ? 0 : a / 100;
        const l = () => {
          r && R.current && R.current.play().catch((i) => console.error("Play failed:", i)), R.current && R.current.removeEventListener("canplay", l);
        };
        R.current.addEventListener("canplay", l), R.current.load();
      }
      U(0), S(!1), ae.current = 0, s.current = 0, x.current = 0, E.current = 0, G.current = 0, J.current = 0, Ee();
    }
  }, [o]), L(() => {
    R.current && (R.current.volume = we ? 0 : $ / 100);
  }, [$, we]), L(() => {
    R.current && (R.current.playbackRate = fe);
  }, [fe]), L(() => {
    B.current && (Q.current && (Q.current.gain.value = F.bass), xe.current && (xe.current.gain.value = F.mid), ne.current && (ne.current.gain.value = F.treble));
  }, [F]), L(() => {
    te.current = O, T.current && (cancelAnimationFrame(T.current), T.current = null), O && g ? (B.current || ve(), Fe()) : !O && g && qe();
  }, [O, g]), L(() => {
    const r = () => {
      ye(!!document.fullscreenElement);
    };
    return document.addEventListener("fullscreenchange", r), () => document.removeEventListener("fullscreenchange", r);
  }, []), L(() => () => {
    T.current && cancelAnimationFrame(T.current), B.current && B.current.close().catch((r) => console.warn("AudioContext cleanup error:", r));
  }, []);
  const ve = () => {
    if (!B.current && R.current)
      try {
        const r = window.AudioContext || window.webkitAudioContext;
        if (r) {
          const a = new r();
          B.current = a;
          const l = a.createBiquadFilter();
          l.type = "lowshelf", l.frequency.value = 320, l.gain.value = F.bass;
          const i = a.createBiquadFilter();
          i.type = "peaking", i.frequency.value = 1e3, i.Q.value = 0.5, i.gain.value = F.mid;
          const w = a.createBiquadFilter();
          w.type = "highshelf", w.frequency.value = 3200, w.gain.value = F.treble;
          const I = a.createAnalyser();
          I.fftSize = 2048, I.smoothingTimeConstant = 0.8;
          const de = a.createMediaElementSource(R.current);
          de.connect(l), l.connect(i), i.connect(w), w.connect(I), w.connect(a.destination), Q.current = l, xe.current = i, ne.current = w, ie.current = I, Ne.current = de;
        }
      } catch (r) {
        console.error("Failed to setup audio context:", r);
      }
  }, qe = () => {
    if (te.current) return;
    ae.current *= 0.7, s.current *= 0.7;
    const r = Date.now();
    r - G.current > 1500 && (x.current *= 0.95), r - J.current > 1500 && (E.current *= 0.95), Ee();
    const a = Math.max(ae.current, s.current), l = Math.max(x.current, E.current);
    a > 0.01 || l > 0.01 ? T.current = requestAnimationFrame(qe) : (te.current || (ae.current = 0, s.current = 0, x.current = 0, E.current = 0, Ee()), T.current && cancelAnimationFrame(T.current), T.current = null);
  }, Fe = () => {
    if (!ie.current || !te.current) return;
    const r = ie.current.frequencyBinCount, a = new Uint8Array(r);
    ie.current.getByteFrequencyData(a);
    let l = 0;
    for (let I = 0; I < r; I++)
      l += a[I];
    let i = l / r / 255;
    i = Math.pow(i, 0.5), ae.current = ae.current * 0.7 + i * 0.3, s.current = s.current * 0.7 + i * 0.3;
    const w = Date.now();
    ae.current > x.current ? (x.current = ae.current, G.current = w) : w - G.current > 1500 && (x.current *= 0.95), s.current > E.current ? (E.current = s.current, J.current = w) : w - J.current > 1500 && (E.current *= 0.95), Ee(), T.current = requestAnimationFrame(Fe);
  }, Ee = () => {
    if (!oe.current || !g) return;
    const r = g.color || "#00ff00", a = g.peak || "#ff0000", l = ae.current * 100, i = s.current * 100, w = 100 - x.current * 100, I = 100 - E.current * 100;
    g.side === "top" || g.side === "bottom" ? oe.current.innerHTML = `
                <div class="flex flex-col gap-1 h-full justify-center">
                    <div class="flex items-center justify-center gap-2">
                        <div class="text-xs ${d ? "text-gray-100" : "text-gray-900"} opacity-80 w-4 text-center">L</div>
                        <div class="relative flex-1 h-3 bg-black/40 rounded-full overflow-hidden flex justify-end">
                            <div class="h-full rounded-l-full transition-all duration-75" style="width: ${l}%; background: ${r};"></div>
                            ${x.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="right: ${x.current * 100}%; background: ${a};"></div>` : ""}
                        </div>
                        <div class="w-px h-4 bg-white/20"></div>
                        <div class="relative flex-1 h-3 bg-black/40 rounded-full overflow-hidden flex justify-start">
                            <div class="h-full rounded-r-full transition-all duration-75" style="width: ${i}%; background: ${r};"></div>
                            ${E.current > 0.1 ? `<div class="absolute top-0 w-1 h-full transition-all duration-100" style="left: ${E.current * 100}%; background: ${a};"></div>` : ""}
                        </div>
                        <div class="text-xs ${d ? "text-gray-100" : "text-gray-900"} opacity-80 w-4 text-center">R</div>
                    </div>
                </div>
            ` : oe.current.innerHTML = `
                <div class="flex gap-2 h-full">
                    <div class="flex-1 flex flex-col">
                        <div class="text-xs text-white opacity-70 text-center mb-1">L</div>
                        <div class="flex-1 relative flex flex-col justify-end bg-black/30 rounded-lg overflow-hidden">
                            <div class="rounded-t transition-all duration-75" style="height: ${l}%; background: ${r};">
                                ${x.current > 0.1 ? `<div class="absolute w-full h-1 transition-all duration-100" style="top: ${w}%; background: ${a};"></div>` : ""}
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col">
                        <div class="text-xs text-white opacity-70 text-center mb-1">R</div>
                        <div class="flex-1 relative flex flex-col justify-end bg-black/30 rounded-lg overflow-hidden">
                            <div class="rounded-t transition-all duration-75" style="height: ${i}%; background: ${r};">
                                ${E.current > 0.1 ? `<div class="absolute w-full h-1 transition-all duration-100" style="top: ${I}%; background: ${a};"></div>` : ""}
                        </div>
                    </div>
                </div>
            `;
  }, _e = () => {
    !R.current || !o || (O ? R.current.pause() : (B.current && B.current.state === "suspended" && B.current.resume(), R.current.play().catch((r) => console.error("Play failed:", r))));
  }, Ce = () => {
    R.current && (R.current.pause(), R.current.currentTime = 0, S(!1), U(0), ae.current = 0, s.current = 0, x.current = 0, E.current = 0, Ee());
  }, He = (r) => {
    const l = parseFloat(r.target.value) / 100 * Y;
    U(l), R.current && !$e && (R.current.currentTime = l);
  }, Le = () => se(!0), Me = () => {
    R.current && (R.current.currentTime = V), se(!1);
  }, Oe = (r) => {
    const a = parseInt(r.target.value);
    b(a), me(a === 0);
  }, We = (r) => {
    be(parseFloat(r.target.value));
  }, Ve = () => me(!we), Ue = () => {
    f.current && (document.fullscreenElement ? document.exitFullscreen() : f.current.requestFullscreen().catch((r) => console.error("Fullscreen failed:", r)));
  }, ze = (r, a) => {
    z((l) => ({
      ...l,
      [r]: a
    })), B.current && (r === "bass" && Q.current && (Q.current.gain.value = a), r === "mid" && xe.current && (xe.current.gain.value = a), r === "treble" && ne.current && (ne.current.gain.value = a));
  }, Ke = () => {
    z({ bass: 0, mid: 0, treble: 0 });
  }, Se = (r) => {
    if (isNaN(r)) return "0:00";
    const a = Math.floor(r / 60), l = Math.floor(r % 60);
    return `${a}:${l.toString().padStart(2, "0")}`;
  };
  if (L(() => {
    (j && !O || N) && _e();
  }, [p]), he && he.length > 0)
    return he.map((r, a) => /* @__PURE__ */ e.jsxs("div", { className: "text-red-500 text-sm bg-red-50 p-3 rounded mb-4 border border-red-300", children: [
      /* @__PURE__ */ e.jsxs("strong", { children: [
        r[0],
        ":"
      ] }),
      " ",
      r[1]
    ] }, a));
  const Re = g ? g.side : null, Ie = Re === "top" || Re === "bottom";
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      ref: f,
      className: `rounded-xl overflow-hidden transition-all duration-300 ${ce ? "fixed inset-0 z-[9999] flex flex-col h-screen w-screen bg-black" : "relative"}`,
      style: { backgroundColor: j || y ? void 0 : d ? "#49494937" : "white" },
      children: /* @__PURE__ */ e.jsxs("div", { style: { background: j || y ? void 0 : d ? "#1a1a1ab0" : "#f5f5f5", height: ce ? "100%" : "auto" }, className: `${j || y ? "" : "p-4"} ${ce ? "flex flex-col flex-1" : ""}`, children: [
        p.videoName && !ce && /* @__PURE__ */ e.jsx("div", { className: "mb-4", children: /* @__PURE__ */ e.jsx("div", { className: `${d ? "text-gray-100" : "text-gray-700"} font-medium`, children: u }) }),
        /* @__PURE__ */ e.jsxs("div", { className: `relative ${Ie ? "flex flex-col gap-3" : "flex gap-3"} ${ce ? "flex-1 min-h-0" : "mb-4"}`, children: [
          g && Re === "top" && /* @__PURE__ */ e.jsx("div", { className: "w-full h-12", ref: oe }),
          /* @__PURE__ */ e.jsxs("div", { className: `flex ${!Ie && "flex-1"} gap-3`, children: [
            g && Re === "left" && /* @__PURE__ */ e.jsx("div", { className: "w-12 bg-black/50 rounded-lg p-1", ref: oe }),
            /* @__PURE__ */ e.jsxs("div", { className: `flex-1 ${d ? "bg-black/70" : "bg-white/70"} rounded-lg overflow-hidden relative`, children: [
              /* @__PURE__ */ e.jsxs(
                "video",
                {
                  ref: R,
                  className: "w-full h-full object-contain",
                  poster: _ || void 0,
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
                          onChange: (r) => ze("bass", parseInt(r.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${q} ${(F.bass + 20) / 40 * 100}%, #e5e7eb ${(F.bass + 20) / 40 * 100}%)`
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
                          onChange: (r) => ze("mid", parseInt(r.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${q} ${(F.mid + 20) / 40 * 100}%, #e5e7eb ${(F.mid + 20) / 40 * 100}%)`
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
                          onChange: (r) => ze("treble", parseInt(r.target.value)),
                          className: "flex-1 h-6 bg-gray-300 rounded-lg appearance-none cursor-pointer eq-slider",
                          style: {
                            background: `linear-gradient(to right, ${q} ${(F.treble + 20) / 40 * 100}%, #e5e7eb ${(F.treble + 20) / 40 * 100}%)`
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
                      onClick: Ke,
                      className: `px-3 py-1 rounded text-xs ${d ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
                      children: "Reset"
                    }
                  ),
                  /* @__PURE__ */ e.jsx(
                    "button",
                    {
                      onClick: () => H(!1),
                      className: `ml-2 px-3 py-1 rounded text-xs ${d ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all`,
                      children: "Close"
                    }
                  )
                ] })
              ] }) })
            ] }),
            g && Re === "right" && /* @__PURE__ */ e.jsx("div", { className: "w-12 bg-black/50 rounded-lg p-1", ref: oe })
          ] }),
          g && Re === "bottom" && /* @__PURE__ */ e.jsx("div", { className: "w-full h-12", ref: oe })
        ] }),
        p.seekbar && /* @__PURE__ */ e.jsx("div", { className: `mb-4 ${ce ? "mt-3" : ""}`, children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-100" : "text-gray-600"} font-mono w-12`, children: Se(V) }),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "100",
              value: Y > 0 ? V / Y * 100 : 0,
              onChange: He,
              onMouseDown: Le,
              onMouseUp: Me,
              onTouchStart: Le,
              onTouchEnd: Me,
              disabled: !o,
              className: "flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
              style: {
                background: o && Y > 0 ? `linear-gradient(to right, ${q} ${V / Y * 100}%, #e5e7eb ${V / Y * 100}%)` : "#e5e7eb"
              }
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: `text-xs ${d ? "text-gray-100" : "text-gray-600"} font-mono w-12 text-right`, children: Se(Y) })
        ] }) }),
        /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          p.play && /* @__PURE__ */ e.jsxs(
            "button",
            {
              onClick: _e,
              disabled: !o,
              style: { backgroundColor: q },
              className: `${ue > 400 ? " px-4 py-2" : "px-3 py-5"} rounded-full text-sm font-medium text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
              children: [
                /* @__PURE__ */ e.jsxs("div", { className: "relative w-4 flex items-center", children: [
                  /* @__PURE__ */ e.jsx(Ze, { size: 16, className: `${O ? "" : "scale-0 translate-y-10"} transition-all absolute` }),
                  /* @__PURE__ */ e.jsx(et, { size: 16, className: `${O ? "scale-0 -translate-y-10" : ""} transition-all absolute` })
                ] }),
                ue > 400 && (O ? "Pause" : "Play")
              ]
            }
          ),
          p.stop && /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: Ce,
              disabled: !o,
              className: `${d ? "bg-gray-100 text-black hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-800"} px-3 py-3 rounded-full text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all`,
              children: /* @__PURE__ */ e.jsx(mt, { size: 16 })
            }
          ),
          p.fullscreen && /* @__PURE__ */ e.jsxs(
            "button",
            {
              onClick: Ue,
              className: `${ue < 800 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${d ? "bg-gray-100 text-black hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-800"}`,
              children: [
                ce ? /* @__PURE__ */ e.jsx(Ft, { size: 16 }) : /* @__PURE__ */ e.jsx(St, { size: 16 }),
                /* @__PURE__ */ e.jsx("span", { style: { display: ue < 800 ? "none" : "block" }, children: ce ? "Exit" : "Full" })
              ]
            }
          ),
          p.equalizer && /* @__PURE__ */ e.jsxs(
            "button",
            {
              onClick: () => H(!ke),
              disabled: !o,
              className: `${ue < 700 ? "px-3 py-3" : "px-4 py-2"} rounded-full text-sm font-medium flex items-center gap-2 transition-all ${ke ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"} disabled:opacity-40 disabled:cursor-not-allowed`,
              style: ke ? { backgroundColor: q } : {},
              children: [
                /* @__PURE__ */ e.jsx(Qe, { size: 16 }),
                /* @__PURE__ */ e.jsx("span", { style: { display: ue < 700 ? "none" : "block" }, children: "EQ" })
              ]
            }
          ),
          p.speed && /* @__PURE__ */ e.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ e.jsxs(
            "select",
            {
              value: fe,
              onChange: We,
              className: `rounded-full text-sm font-medium border-none outline-none cursor-pointer transition-all bg-transparent ${d ? "text-gray-200" : "text-gray-800"}`,
              children: [
                /* @__PURE__ */ e.jsx("option", { value: "0.5", className: d ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "0.5x" }),
                /* @__PURE__ */ e.jsx("option", { value: "0.75", className: d ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "0.75x" }),
                /* @__PURE__ */ e.jsx("option", { value: "1", className: d ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "1x" }),
                /* @__PURE__ */ e.jsx("option", { value: "1.25", className: d ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "1.25x" }),
                /* @__PURE__ */ e.jsx("option", { value: "1.5", className: d ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "1.5x" }),
                /* @__PURE__ */ e.jsx("option", { value: "2", className: d ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800", children: "2x" })
              ]
            }
          ) }),
          p.volume && /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-1 md:gap-3 ml-auto", children: [
            /* @__PURE__ */ e.jsx(
              "button",
              {
                onClick: Ve,
                className: "p-2 rounded-lg hover:bg-gray-100 transition-all",
                children: we || $ === 0 ? /* @__PURE__ */ e.jsx(st, { size: 20, className: d ? "text-gray-100" : "text-gray-600" }) : /* @__PURE__ */ e.jsx(at, { size: 20, className: d ? "text-gray-100" : "text-gray-600" })
              }
            ),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                type: "range",
                min: "0",
                max: "100",
                value: $,
                onChange: Oe,
                className: "hide-for-xs w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
                style: {
                  background: `linear-gradient(to right, ${q} ${$}%, #e5e7eb ${$}%)`,
                  display: ue < 460 ? "none" : "block"
                }
              }
            ),
            /* @__PURE__ */ e.jsxs("span", { style: { display: ue < 800 ? "none" : "block" }, className: `text-xs ${d ? "text-gray-100" : "text-gray-700"} font-mono w-10 text-right`, children: [
              $,
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
                        background: ${q};
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    }
                    
                    input[type="range"]::-moz-range-thumb {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: ${q};
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
function Qt() {
  const [o, u] = v(null), [g, m] = v("No track loaded"), [_, p] = v("purple"), [k, y] = v(!1), [N, q] = v(!1), [M, O] = v("light"), S = C(null), V = (Y) => {
    var $;
    const K = ($ = Y.target.files) == null ? void 0 : $[0];
    if (K) {
      const b = URL.createObjectURL(K);
      u(b), m(K.name);
    }
  }, U = () => {
    var Y;
    (Y = S.current) == null || Y.click();
  };
  return /* @__PURE__ */ e.jsx("div", { className: "min-h-screen flex items-center justify-center p-4 md:p-8", style: { backgroundColor: M === "dark" ? "#222" : "white" }, children: /* @__PURE__ */ e.jsxs("div", { className: "w-full h-full md:h-auto md:max-w-4xl", children: [
    k && /* @__PURE__ */ e.jsx(Ut, { theme: _, setTheme: p, close: () => y(!1) }),
    /* @__PURE__ */ e.jsxs("div", { className: "container-glass rounded-xl p-8", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "mb-6 flex justify-between items-start", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("h1", { className: `text-2xl font-semibold ${M === "dark" ? "text-gray-200" : "text-gray-800"} mb-1`, children: "Audio Visualizer" }),
          /* @__PURE__ */ e.jsx("p", { className: "text-sm text-gray-500", children: "Professional frequency analyzer" })
        ] }),
        /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: () => y(!k),
            className: "bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              /* @__PURE__ */ e.jsx("span", { children: "🎨" }),
              " Themes"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(
        Yt,
        {
          audio: o || void 0,
          name: g || void 0,
          author: "K.Prabhasha",
          theme: _,
          autoPlay: !1,
          thumbnail: "https://cdn-icons-png.flaticon.com/512/3845/3845874.png",
          mode: M,
          transparent: N,
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
      /* @__PURE__ */ e.jsx(Kt, { audio: o || "", width: 400, thumbnail: "https://cdn-icons-png.flaticon.com/512/8316/8316619.png", autoPlay: !1, gradient: ["#26ce3aff", "#39eed9ff"], background: "#c0ffefff" }),
      /* @__PURE__ */ e.jsx(Gt, { audio: o || "", thumbnail: "https://cdn-icons-png.flaticon.com/512/17524/17524837.png", autoPlay: !1, gradient: ["#26ce3aff", "#39eed9ff"], background: "#c0ffefff" }),
      /* @__PURE__ */ e.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "file",
            ref: S,
            onChange: V,
            accept: "audio/*",
            className: "hidden"
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: U,
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              /* @__PURE__ */ e.jsx(Ht, { size: 16 }),
              "Load Audio"
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: () => O(M === "dark" ? "light" : "dark"),
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: M === "dark" ? "Light" : "Dark"
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "button",
          {
            onClick: () => q(!N),
            className: "bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2",
            children: [
              "Transparent: ",
              String(N)
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Qt as DemoVisualizePlayer,
  Gt as NanoAudioPlayer,
  Ut as ThemeSelector,
  Xt as VideoPlayer,
  Yt as VisualizePlayer,
  Kt as WaveAudioPlayer,
  Ae as themes
};
