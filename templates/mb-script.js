var $jscomp = { scope: {} };
$jscomp.defineProperty =
  "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, f, q) {
        if (q.get || q.set)
          throw new TypeError("ES3 does not support getters and setters.");
        a != Array.prototype && a != Object.prototype && (a[f] = q.value);
      };
$jscomp.getGlobal = function (a) {
  return "undefined" != typeof window && window === a
    ? a
    : "undefined" != typeof global && null != global
    ? global
    : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (a) {
  return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] &&
    $jscomp.defineProperty(Array.prototype, a, {
      configurable: !0,
      writable: !0,
      value: function () {
        return $jscomp.arrayIterator(this);
      },
    });
  $jscomp.initSymbolIterator = function () {};
};
$jscomp.arrayIterator = function (a) {
  var f = 0;
  return $jscomp.iteratorPrototype(function () {
    return f < a.length ? { done: !1, value: a[f++] } : { done: !0 };
  });
};
$jscomp.iteratorPrototype = function (a) {
  $jscomp.initSymbolIterator();
  a = { next: a };
  a[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };
  return a;
};
$jscomp.makeIterator = function (a) {
  $jscomp.initSymbolIterator();
  var f = a[Symbol.iterator];
  return f ? f.call(a) : $jscomp.arrayIterator(a);
};
(function (a, f) {
  "object" === typeof module && "object" === typeof module.exports
    ? (module.exports = a.document
        ? f(a, !0)
        : function (a) {
            if (!a.document)
              throw Error("jQuery requires a window with a document");
            return f(a);
          })
    : f(a);
})("undefined" !== typeof window ? window : this, function (a, f) {
  function q(b, e, c) {
    c = c || W;
    var v,
      l = c.createElement("script");
    l.text = b;
    if (e)
      for (v in Xa)
        (b = e[v] || (e.getAttribute && e.getAttribute(v))) &&
          l.setAttribute(v, b);
    c.head.appendChild(l).parentNode.removeChild(l);
  }
  function t(b) {
    return null == b
      ? b + ""
      : "object" === typeof b || "function" === typeof b
      ? Ja[va.call(b)] || "object"
      : typeof b;
  }
  function y(b) {
    var e = !!b && "length" in b && b.length,
      c = t(b);
    return A(b) || Ca(b)
      ? !1
      : "array" === c ||
          0 === e ||
          ("number" === typeof e && 0 < e && e - 1 in b);
  }
  function p(b, e) {
    return b.nodeName && b.nodeName.toLowerCase() === e.toLowerCase();
  }
  function w(b, e, c) {
    return A(e)
      ? l.grep(b, function (b, v) {
          return !!e.call(b, v, b) !== c;
        })
      : e.nodeType
      ? l.grep(b, function (b) {
          return (b === e) !== c;
        })
      : "string" !== typeof e
      ? l.grep(b, function (b) {
          return -1 < Da.call(e, b) !== c;
        })
      : l.filter(e, b, c);
  }
  function B(b, e) {
    for (; (b = b[e]) && 1 !== b.nodeType; );
    return b;
  }
  function F(b) {
    var e = {};
    l.each(b.match(Aa) || [], function (b, c) {
      e[c] = !0;
    });
    return e;
  }
  function O(b) {
    return b;
  }
  function K(b) {
    throw b;
  }
  function d(b, e, c, z) {
    var v;
    try {
      b && A((v = b.promise))
        ? v.call(b).done(e).fail(c)
        : b && A((v = b.then))
        ? v.call(b, e, c)
        : e.apply(void 0, [b].slice(z));
    } catch (Na) {
      c.apply(void 0, [Na]);
    }
  }
  function I() {
    W.removeEventListener("DOMContentLoaded", I);
    a.removeEventListener("load", I);
    l.ready();
  }
  function C(b, e) {
    return e.toUpperCase();
  }
  function Y(b) {
    return b.replace(Eb, "ms-").replace(Fb, C);
  }
  function S() {
    this.expando = l.expando + S.uid++;
  }
  function ga(b, e, c) {
    if (void 0 === c && 1 === b.nodeType)
      if (
        ((c = "data-" + e.replace(Gb, "-$\x26").toLowerCase()),
        (c = b.getAttribute(c)),
        "string" === typeof c)
      ) {
        try {
          var v = c;
          c =
            "true" === v
              ? !0
              : "false" === v
              ? !1
              : "null" === v
              ? null
              : v === +v + ""
              ? +v
              : Hb.test(v)
              ? JSON.parse(v)
              : v;
        } catch (ra) {}
        pa.set(b, e, c);
      } else c = void 0;
    return c;
  }
  function aa(b, e, c, z) {
    var v,
      h,
      a = 20,
      d = z
        ? function () {
            return z.cur();
          }
        : function () {
            return l.css(b, e, "");
          },
      k = d(),
      g = (c && c[3]) || (l.cssNumber[e] ? "" : "px"),
      A =
        b.nodeType &&
        (l.cssNumber[e] || ("px" !== g && +k)) &&
        Oa.exec(l.css(b, e));
    if (A && A[3] !== g) {
      k /= 2;
      g = g || A[3];
      for (A = +k || 1; a--; )
        l.style(b, e, A + g),
          0 >= (1 - h) * (1 - (h = d() / k || 0.5)) && (a = 0),
          (A /= h);
      A *= 2;
      l.style(b, e, A + g);
      c = c || [];
    }
    c &&
      ((A = +A || +k || 0),
      (v = c[1] ? A + (c[1] + 1) * c[2] : +c[2]),
      z && ((z.unit = g), (z.start = A), (z.end = v)));
    return v;
  }
  function T(b, e) {
    for (var c, z, h = [], a = 0, k = b.length; a < k; a++)
      if (((z = b[a]), z.style))
        if (((c = z.style.display), e)) {
          if (
            ("none" === c &&
              ((h[a] = M.get(z, "display") || null),
              h[a] || (z.style.display = "")),
            "" === z.style.display && Ua(z))
          ) {
            c = a;
            var d;
            d = z.ownerDocument;
            z = z.nodeName;
            var g = fb[z];
            g ||
              ((d = d.body.appendChild(d.createElement(z))),
              (g = l.css(d, "display")),
              d.parentNode.removeChild(d),
              "none" === g && (g = "block"),
              (fb[z] = g));
            d = g;
            h[c] = d;
          }
        } else "none" !== c && ((h[a] = "none"), M.set(z, "display", c));
    for (a = 0; a < k; a++) null != h[a] && (b[a].style.display = h[a]);
    return b;
  }
  function Z(b, e) {
    var c;
    c =
      "undefined" !== typeof b.getElementsByTagName
        ? b.getElementsByTagName(e || "*")
        : "undefined" !== typeof b.querySelectorAll
        ? b.querySelectorAll(e || "*")
        : [];
    return void 0 === e || (e && p(b, e)) ? l.merge([b], c) : c;
  }
  function ma(b, e) {
    for (var c = 0, z = b.length; c < z; c++)
      M.set(b[c], "globalEval", !e || M.get(e[c], "globalEval"));
  }
  function ea(b, e, c, z, h) {
    for (
      var v, a, d, k = e.createDocumentFragment(), ra = [], g = 0, A = b.length;
      g < A;
      g++
    )
      if ((v = b[g]) || 0 === v)
        if ("object" === t(v)) l.merge(ra, v.nodeType ? [v] : v);
        else if (Jb.test(v)) {
          a = a || k.appendChild(e.createElement("div"));
          d = (gb.exec(v) || ["", ""])[1].toLowerCase();
          d = wa[d] || wa._default;
          a.innerHTML = d[1] + l.htmlPrefilter(v) + d[2];
          for (d = d[0]; d--; ) a = a.lastChild;
          l.merge(ra, a.childNodes);
          a = k.firstChild;
          a.textContent = "";
        } else ra.push(e.createTextNode(v));
    k.textContent = "";
    for (g = 0; (v = ra[g++]); )
      if (z && -1 < l.inArray(v, z)) h && h.push(v);
      else if (
        ((b = La(v)), (a = Z(k.appendChild(v), "script")), b && ma(a), c)
      )
        for (d = 0; (v = a[d++]); ) hb.test(v.type || "") && c.push(v);
    return k;
  }
  function E() {
    return !0;
  }
  function ca() {
    return !1;
  }
  function X(b, e) {
    var c;
    a: {
      try {
        c = W.activeElement;
        break a;
      } catch (z) {}
      c = void 0;
    }
    return (b === c) === ("focus" === e);
  }
  function m(b, e, c, z, h, a) {
    var v, d;
    if ("object" === typeof e) {
      "string" !== typeof c && ((z = z || c), (c = void 0));
      for (d in e) m(b, d, c, z, e[d], a);
      return b;
    }
    null == z && null == h
      ? ((h = c), (z = c = void 0))
      : null == h &&
        ("string" === typeof c
          ? ((h = z), (z = void 0))
          : ((h = z), (z = c), (c = void 0)));
    if (!1 === h) h = ca;
    else if (!h) return b;
    1 === a &&
      ((v = h),
      (h = function (b) {
        l().off(b);
        return v.apply(this, arguments);
      }),
      (h.guid = v.guid || (v.guid = l.guid++)));
    return b.each(function () {
      l.event.add(this, e, h, z, c);
    });
  }
  function u(b, e, c) {
    c
      ? (M.set(b, e, !1),
        l.event.add(b, e, {
          namespace: !1,
          handler: function (b) {
            var v,
              z,
              h = M.get(this, e);
            if (b.isTrigger & 1 && this[e])
              if (h.length)
                (l.event.special[e] || {}).delegateType && b.stopPropagation();
              else {
                if (
                  ((h = U.call(arguments)),
                  M.set(this, e, h),
                  (v = c(this, e)),
                  this[e](),
                  (z = M.get(this, e)),
                  h !== z || v ? M.set(this, e, !1) : (z = {}),
                  h !== z)
                )
                  return (
                    b.stopImmediatePropagation(),
                    b.preventDefault(),
                    z && z.value
                  );
              }
            else
              h.length &&
                (M.set(this, e, {
                  value: l.event.trigger(
                    l.extend(h[0], l.Event.prototype),
                    h.slice(1),
                    this
                  ),
                }),
                b.stopImmediatePropagation());
          },
        }))
      : void 0 === M.get(b, e) && l.event.add(b, e, E);
  }
  function G(b, e) {
    return p(b, "table") && p(11 !== e.nodeType ? e : e.firstChild, "tr")
      ? l(b).children("tbody")[0] || b
      : b;
  }
  function D(b) {
    b.type = (null !== b.getAttribute("type")) + "/" + b.type;
    return b;
  }
  function ja(b) {
    "true/" === (b.type || "").slice(0, 5)
      ? (b.type = b.type.slice(5))
      : b.removeAttribute("type");
    return b;
  }
  function sa(b, e) {
    var c, z, h, a;
    if (1 === e.nodeType) {
      if (M.hasData(b) && ((c = M.get(b)), (a = c.events)))
        for (h in (M.remove(e, "handle events"), a))
          for (c = 0, z = a[h].length; c < z; c++) l.event.add(e, h, a[h][c]);
      pa.hasData(b) &&
        ((b = pa.access(b)), (b = l.extend({}, b)), pa.set(e, b));
    }
  }
  function R(b, e, c, z) {
    e = P(e);
    var v,
      a,
      d,
      k,
      g = 0,
      r = b.length,
      x = r - 1,
      f = e[0],
      m = A(f);
    if (m || (1 < r && "string" === typeof f && !h.checkClone && Kb.test(f)))
      return b.each(function (v) {
        var h = b.eq(v);
        m && (e[0] = f.call(this, v, h.html()));
        R(h, e, c, z);
      });
    if (
      r &&
      ((v = ea(e, b[0].ownerDocument, !1, b, z)),
      (a = v.firstChild),
      1 === v.childNodes.length && (v = a),
      a || z)
    ) {
      a = l.map(Z(v, "script"), D);
      for (d = a.length; g < r; g++)
        (k = v),
          g !== x &&
            ((k = l.clone(k, !0, !0)), d && l.merge(a, Z(k, "script"))),
          c.call(b[g], k, g);
      if (d)
        for (v = a[a.length - 1].ownerDocument, l.map(a, ja), g = 0; g < d; g++)
          (k = a[g]),
            hb.test(k.type || "") &&
              !M.access(k, "globalEval") &&
              l.contains(v, k) &&
              (k.src && "module" !== (k.type || "").toLowerCase()
                ? l._evalUrl &&
                  !k.noModule &&
                  l._evalUrl(
                    k.src,
                    { nonce: k.nonce || k.getAttribute("nonce") },
                    v
                  )
                : q(k.textContent.replace(Lb, ""), k, v));
    }
    return b;
  }
  function ta(b, e, c) {
    for (var v = e ? l.filter(e, b) : b, h = 0; null != (e = v[h]); h++)
      c || 1 !== e.nodeType || l.cleanData(Z(e)),
        e.parentNode &&
          (c && La(e) && ma(Z(e, "script")), e.parentNode.removeChild(e));
    return b;
  }
  function H(b, e, c) {
    var v,
      a,
      d = b.style;
    if ((c = c || Va(b)))
      (a = c.getPropertyValue(e) || c[e]),
        "" !== a || La(b) || (a = l.style(b, e)),
        !h.pixelBoxStyles() &&
          Za.test(a) &&
          Mb.test(e) &&
          ((b = d.width),
          (e = d.minWidth),
          (v = d.maxWidth),
          (d.minWidth = d.maxWidth = d.width = a),
          (a = c.width),
          (d.width = b),
          (d.minWidth = e),
          (d.maxWidth = v));
    return void 0 !== a ? a + "" : a;
  }
  function ya(b, e) {
    return {
      get: function () {
        if (b()) delete this.get;
        else return (this.get = e).apply(this, arguments);
      },
    };
  }
  function J(b) {
    var e = l.cssProps[b] || ib[b];
    if (e) return e;
    if (b in jb) return b;
    a: {
      for (var e = b, c = e[0].toUpperCase() + e.slice(1), h = kb.length; h--; )
        if (((e = kb[h] + c), e in jb)) break a;
      e = void 0;
    }
    return (ib[b] = e || b);
  }
  function Ba(b, e, c) {
    return (b = Oa.exec(e)) ? Math.max(0, b[2] - (c || 0)) + (b[3] || "px") : e;
  }
  function Ea(b, e, c, h, a, d) {
    var v = "width" === e ? 1 : 0,
      z = 0,
      k = 0;
    if (c === (h ? "border" : "content")) return 0;
    for (; 4 > v; v += 2)
      "margin" === c && (k += l.css(b, c + Fa[v], !0, a)),
        h
          ? ("content" === c && (k -= l.css(b, "padding" + Fa[v], !0, a)),
            "margin" !== c &&
              (k -= l.css(b, "border" + Fa[v] + "Width", !0, a)))
          : ((k += l.css(b, "padding" + Fa[v], !0, a)),
            "padding" !== c
              ? (k += l.css(b, "border" + Fa[v] + "Width", !0, a))
              : (z += l.css(b, "border" + Fa[v] + "Width", !0, a)));
    !h &&
      0 <= d &&
      (k +=
        Math.max(
          0,
          Math.ceil(
            b["offset" + e[0].toUpperCase() + e.slice(1)] - d - k - z - 0.5
          )
        ) || 0);
    return k;
  }
  function ka(b, e, c) {
    var v = Va(b),
      a =
        (!h.boxSizingReliable() || c) &&
        "border-box" === l.css(b, "boxSizing", !1, v),
      d = a,
      k = H(b, e, v),
      g = "offset" + e[0].toUpperCase() + e.slice(1);
    if (Za.test(k)) {
      if (!c) return k;
      k = "auto";
    }
    ((!h.boxSizingReliable() && a) ||
      (!h.reliableTrDimensions() && p(b, "tr")) ||
      "auto" === k ||
      (!parseFloat(k) && "inline" === l.css(b, "display", !1, v))) &&
      b.getClientRects().length &&
      ((a = "border-box" === l.css(b, "boxSizing", !1, v)),
      (d = g in b) && (k = b[g]));
    k = parseFloat(k) || 0;
    return k + Ea(b, e, c || (a ? "border" : "content"), d, v, k) + "px";
  }
  function Q(b, e, c, h, l) {
    return new Q.prototype.init(b, e, c, h, l);
  }
  function xa() {
    Wa &&
      (!1 === W.hidden && a.requestAnimationFrame
        ? a.requestAnimationFrame(xa)
        : a.setTimeout(xa, l.fx.interval),
      l.fx.tick());
  }
  function g() {
    a.setTimeout(function () {
      Ma = void 0;
    });
    return (Ma = Date.now());
  }
  function L(b, e) {
    var c,
      h = 0,
      l = { height: b };
    for (e = e ? 1 : 0; 4 > h; h += 2 - e)
      (c = Fa[h]), (l["margin" + c] = l["padding" + c] = b);
    e && (l.opacity = l.width = b);
    return l;
  }
  function x(b, e, c) {
    for (
      var v,
        h = (n.tweeners[e] || []).concat(n.tweeners["*"]),
        l = 0,
        a = h.length;
      l < a;
      l++
    )
      if ((v = h[l].call(c, e, b))) return v;
  }
  function da(b, e) {
    var c, h, a, k, d;
    for (c in b)
      if (
        ((h = Y(c)),
        (a = e[h]),
        (k = b[c]),
        Array.isArray(k) && ((a = k[1]), (k = b[c] = k[0])),
        c !== h && ((b[h] = k), delete b[c]),
        (d = l.cssHooks[h]) && "expand" in d)
      )
        for (c in ((k = d.expand(k)), delete b[h], k))
          c in b || ((b[c] = k[c]), (e[c] = a));
      else e[h] = a;
  }
  function n(b, e, c) {
    var v,
      h = 0,
      a = n.prefilters.length,
      k = l.Deferred().always(function () {
        delete d.elem;
      }),
      d = function () {
        if (v) return !1;
        for (
          var e = Ma || g(),
            e = Math.max(0, r.startTime + r.duration - e),
            c = 1 - (e / r.duration || 0),
            h = 0,
            l = r.tweens.length;
          h < l;
          h++
        )
          r.tweens[h].run(c);
        k.notifyWith(b, [r, c, e]);
        if (1 > c && l) return e;
        l || k.notifyWith(b, [r, 1, 0]);
        k.resolveWith(b, [r]);
        return !1;
      },
      r = k.promise({
        elem: b,
        props: l.extend({}, e),
        opts: l.extend(!0, { specialEasing: {}, easing: l.easing._default }, c),
        originalProperties: e,
        originalOptions: c,
        startTime: Ma || g(),
        duration: c.duration,
        tweens: [],
        createTween: function (e, c) {
          e = l.Tween(
            b,
            r.opts,
            e,
            c,
            r.opts.specialEasing[e] || r.opts.easing
          );
          r.tweens.push(e);
          return e;
        },
        stop: function (e) {
          var c = 0,
            h = e ? r.tweens.length : 0;
          if (v) return this;
          for (v = !0; c < h; c++) r.tweens[c].run(1);
          e
            ? (k.notifyWith(b, [r, 1, 0]), k.resolveWith(b, [r, e]))
            : k.rejectWith(b, [r, e]);
          return this;
        },
      });
    c = r.props;
    for (da(c, r.opts.specialEasing); h < a; h++)
      if ((e = n.prefilters[h].call(r, b, c, r.opts)))
        return (
          A(e.stop) &&
            (l._queueHooks(r.elem, r.opts.queue).stop = e.stop.bind(e)),
          e
        );
    l.map(c, x, r);
    A(r.opts.start) && r.opts.start.call(b, r);
    r.progress(r.opts.progress)
      .done(r.opts.done, r.opts.complete)
      .fail(r.opts.fail)
      .always(r.opts.always);
    l.fx.timer(l.extend(d, { elem: b, anim: r, queue: r.opts.queue }));
    return r;
  }
  function ha(b) {
    return (b.match(Aa) || []).join(" ");
  }
  function la(b) {
    return (b.getAttribute && b.getAttribute("class")) || "";
  }
  function fa(b) {
    return Array.isArray(b)
      ? b
      : "string" === typeof b
      ? b.match(Aa) || []
      : [];
  }
  function ba(b, e, c, h) {
    var v;
    if (Array.isArray(e))
      l.each(e, function (e, v) {
        c || Nb.test(b)
          ? h(b, v)
          : ba(
              b + "[" + ("object" === typeof v && null != v ? e : "") + "]",
              v,
              c,
              h
            );
      });
    else if (c || "object" !== t(e)) h(b, e);
    else for (v in e) ba(b + "[" + v + "]", e[v], c, h);
  }
  function Ga(b) {
    return function (e, c) {
      "string" !== typeof e && ((c = e), (e = "*"));
      var v = 0,
        h = e.toLowerCase().match(Aa) || [];
      if (A(c))
        for (; (e = h[v++]); )
          "+" === e[0]
            ? ((e = e.slice(1) || "*"), (b[e] = b[e] || []).unshift(c))
            : (b[e] = b[e] || []).push(c);
    };
  }
  function za(b, e, c, h) {
    function v(k) {
      var d;
      a[k] = !0;
      l.each(b[k] || [], function (b, l) {
        b = l(e, c, h);
        if ("string" === typeof b && !z && !a[b])
          return e.dataTypes.unshift(b), v(b), !1;
        if (z) return !(d = b);
      });
      return d;
    }
    var a = {},
      z = b === $a;
    return v(e.dataTypes[0]) || (!a["*"] && v("*"));
  }
  function ia(b, e) {
    var c,
      h,
      a = l.ajaxSettings.flatOptions || {};
    for (c in e) void 0 !== e[c] && ((a[c] ? b : h || (h = {}))[c] = e[c]);
    h && l.extend(!0, b, h);
    return b;
  }
  function ua(b, e, c) {
    for (var h, v, l, a, k = b.contents, d = b.dataTypes; "*" === d[0]; )
      d.shift(),
        void 0 === h && (h = b.mimeType || e.getResponseHeader("Content-Type"));
    if (h)
      for (v in k)
        if (k[v] && k[v].test(h)) {
          d.unshift(v);
          break;
        }
    if (d[0] in c) l = d[0];
    else {
      for (v in c) {
        if (!d[0] || b.converters[v + " " + d[0]]) {
          l = v;
          break;
        }
        a || (a = v);
      }
      l = l || a;
    }
    if (l) return l !== d[0] && d.unshift(l), c[l];
  }
  function k(b, e, c, h) {
    var v,
      l,
      a,
      k,
      d,
      z = {},
      g = b.dataTypes.slice();
    if (g[1]) for (a in b.converters) z[a.toLowerCase()] = b.converters[a];
    for (l = g.shift(); l; )
      if (
        (b.responseFields[l] && (c[b.responseFields[l]] = e),
        !d && h && b.dataFilter && (e = b.dataFilter(e, b.dataType)),
        (d = l),
        (l = g.shift()))
      )
        if ("*" === l) l = d;
        else if ("*" !== d && d !== l) {
          a = z[d + " " + l] || z["* " + l];
          if (!a)
            for (v in z)
              if (
                ((k = v.split(" ")),
                k[1] === l && (a = z[d + " " + k[0]] || z["* " + k[0]]))
              ) {
                !0 === a
                  ? (a = z[v])
                  : !0 !== z[v] && ((l = k[0]), g.unshift(k[1]));
                break;
              }
          if (!0 !== a)
            if (a && b.throws) e = a(e);
            else
              try {
                e = a(e);
              } catch (Ya) {
                return {
                  state: "parsererror",
                  error: a ? Ya : "No conversion from " + d + " to " + l,
                };
              }
        }
    return { state: "success", data: e };
  }
  var r = [],
    V = Object.getPrototypeOf,
    U = r.slice,
    P = r.flat
      ? function (b) {
          return r.flat.call(b);
        }
      : function (b) {
          return r.concat.apply([], b);
        },
    qa = r.push,
    Da = r.indexOf,
    Ja = {},
    va = Ja.toString,
    na = Ja.hasOwnProperty,
    N = na.toString,
    c = N.call(Object),
    h = {},
    A = function (b) {
      return (
        "function" === typeof b &&
        "number" !== typeof b.nodeType &&
        "function" !== typeof b.item
      );
    },
    Ca = function (b) {
      return null != b && b === b.window;
    },
    W = a.document,
    Xa = { type: !0, src: !0, nonce: !0, noModule: !0 },
    l = function (b, e) {
      return new l.fn.init(b, e);
    };
  l.fn = l.prototype = {
    jquery: "3.6.0",
    constructor: l,
    length: 0,
    toArray: function () {
      return U.call(this);
    },
    get: function (b) {
      return null == b ? U.call(this) : 0 > b ? this[b + this.length] : this[b];
    },
    pushStack: function (b) {
      b = l.merge(this.constructor(), b);
      b.prevObject = this;
      return b;
    },
    each: function (b) {
      return l.each(this, b);
    },
    map: function (b) {
      return this.pushStack(
        l.map(this, function (e, c) {
          return b.call(e, c, e);
        })
      );
    },
    slice: function () {
      return this.pushStack(U.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    even: function () {
      return this.pushStack(
        l.grep(this, function (b, e) {
          return (e + 1) % 2;
        })
      );
    },
    odd: function () {
      return this.pushStack(
        l.grep(this, function (b, e) {
          return e % 2;
        })
      );
    },
    eq: function (b) {
      var e = this.length;
      b = +b + (0 > b ? e : 0);
      return this.pushStack(0 <= b && b < e ? [this[b]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: qa,
    sort: r.sort,
    splice: r.splice,
  };
  l.extend = l.fn.extend = function () {
    var b,
      e,
      c,
      h,
      a,
      k = arguments[0] || {},
      d = 1,
      g = arguments.length,
      r = !1;
    "boolean" === typeof k && ((r = k), (k = arguments[d] || {}), d++);
    "object" === typeof k || A(k) || (k = {});
    d === g && ((k = this), d--);
    for (; d < g; d++)
      if (null != (b = arguments[d]))
        for (e in b)
          (h = b[e]),
            "__proto__" !== e &&
              k !== h &&
              (r && h && (l.isPlainObject(h) || (a = Array.isArray(h)))
                ? ((c = k[e]),
                  (c =
                    a && !Array.isArray(c)
                      ? []
                      : a || l.isPlainObject(c)
                      ? c
                      : {}),
                  (a = !1),
                  (k[e] = l.extend(r, c, h)))
                : void 0 !== h && (k[e] = h));
    return k;
  };
  l.extend({
    expando: "jQuery" + ("3.6.0" + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function (b) {
      throw Error(b);
    },
    noop: function () {},
    isPlainObject: function (b) {
      if (!b || "[object Object]" !== va.call(b)) return !1;
      b = V(b);
      if (!b) return !0;
      b = na.call(b, "constructor") && b.constructor;
      return "function" === typeof b && N.call(b) === c;
    },
    isEmptyObject: function (b) {
      for (var e in b) return !1;
      return !0;
    },
    globalEval: function (b, e, c) {
      q(b, { nonce: e && e.nonce }, c);
    },
    each: function (b, e) {
      var c,
        h = 0;
      if (y(b)) for (c = b.length; h < c && !1 !== e.call(b[h], h, b[h]); h++);
      else for (h in b) if (!1 === e.call(b[h], h, b[h])) break;
      return b;
    },
    makeArray: function (b, e) {
      e = e || [];
      null != b &&
        (y(Object(b))
          ? l.merge(e, "string" === typeof b ? [b] : b)
          : qa.call(e, b));
      return e;
    },
    inArray: function (b, e, c) {
      return null == e ? -1 : Da.call(e, b, c);
    },
    merge: function (b, e) {
      for (var c = +e.length, h = 0, l = b.length; h < c; h++) b[l++] = e[h];
      b.length = l;
      return b;
    },
    grep: function (b, e, c) {
      for (var h = [], l = 0, v = b.length, a = !c; l < v; l++)
        (c = !e(b[l], l)), c !== a && h.push(b[l]);
      return h;
    },
    map: function (b, e, c) {
      var h,
        l,
        v = 0,
        a = [];
      if (y(b))
        for (h = b.length; v < h; v++)
          (l = e(b[v], v, c)), null != l && a.push(l);
      else for (v in b) (l = e(b[v], v, c)), null != l && a.push(l);
      return P(a);
    },
    guid: 1,
    support: h,
  });
  $jscomp.initSymbol();
  "function" === typeof Symbol &&
    ($jscomp.initSymbol(),
    $jscomp.initSymbolIterator(),
    $jscomp.initSymbol(),
    $jscomp.initSymbolIterator(),
    (l.fn[Symbol.iterator] = r[Symbol.iterator]));
  l.each(
    "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
      " "
    ),
    function (b, e) {
      Ja["[object " + e + "]"] = e.toLowerCase();
    }
  );
  var oa = (function (b) {
    function e(b, e, c, h) {
      var l,
        v,
        a,
        k,
        d,
        z = e && e.ownerDocument;
      v = e ? e.nodeType : 9;
      c = c || [];
      if ("string" !== typeof b || !b || (1 !== v && 9 !== v && 11 !== v))
        return c;
      if (!h && (fa(e), (e = e || t), Y)) {
        if (11 !== v && (d = ya.exec(b)))
          if ((l = d[1]))
            if (9 === v)
              if ((a = e.getElementById(l))) {
                if (a.id === l) return c.push(a), c;
              } else return c;
            else {
              if (z && (a = z.getElementById(l)) && la(e, a) && a.id === l)
                return c.push(a), c;
            }
          else {
            if (d[2]) return T.apply(c, e.getElementsByTagName(b)), c;
            if (
              (l = d[3]) &&
              U.getElementsByClassName &&
              e.getElementsByClassName
            )
              return T.apply(c, e.getElementsByClassName(l)), c;
          }
        if (
          !(
            !U.qsa ||
            H[b + " "] ||
            (E && E.test(b)) ||
            (1 === v && "object" === e.nodeName.toLowerCase())
          )
        ) {
          l = b;
          z = e;
          if (1 === v && (Z.test(b) || O.test(b))) {
            z = (sa.test(b) && x(e.parentNode)) || e;
            (z === e && U.scope) ||
              ((k = e.getAttribute("id"))
                ? (k = k.replace(ta, ka))
                : e.setAttribute("id", (k = I)));
            l = D(b);
            for (v = l.length; v--; )
              l[v] = (k ? "#" + k : ":scope") + " " + m(l[v]);
            l = l.join(",");
          }
          try {
            return T.apply(c, z.querySelectorAll(l)), c;
          } catch (oc) {
            H(b, !0);
          } finally {
            k === I && e.removeAttribute("id");
          }
        }
      }
      return w(b.replace(J, "$1"), e, c, h);
    }
    function c() {
      function b(c, h) {
        e.push(c + " ") > P.cacheLength && delete b[e.shift()];
        return (b[c + " "] = h);
      }
      var e = [];
      return b;
    }
    function h(b) {
      b[I] = !0;
      return b;
    }
    function l(b) {
      var e = t.createElement("fieldset");
      try {
        return !!b(e);
      } catch (mc) {
        return !1;
      } finally {
        e.parentNode && e.parentNode.removeChild(e);
      }
    }
    function a(b, e) {
      b = b.split("|");
      for (var c = b.length; c--; ) P.attrHandle[b[c]] = e;
    }
    function k(b, e) {
      var c = e && b,
        h =
          c &&
          1 === b.nodeType &&
          1 === e.nodeType &&
          b.sourceIndex - e.sourceIndex;
      if (h) return h;
      if (c) for (; (c = c.nextSibling); ) if (c === e) return -1;
      return b ? 1 : -1;
    }
    function d(b) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === b;
      };
    }
    function g(b) {
      return function (e) {
        var c = e.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && e.type === b;
      };
    }
    function r(b) {
      return function (e) {
        return "form" in e
          ? e.parentNode && !1 === e.disabled
            ? "label" in e
              ? "label" in e.parentNode
                ? e.parentNode.disabled === b
                : e.disabled === b
              : e.isDisabled === b || (e.isDisabled !== !b && xa(e) === b)
            : e.disabled === b
          : "label" in e
          ? e.disabled === b
          : !1;
      };
    }
    function A(b) {
      return h(function (e) {
        e = +e;
        return h(function (c, h) {
          for (var l, v = b([], c.length, e), a = v.length; a--; )
            c[(l = v[a])] && (c[l] = !(h[l] = c[l]));
        });
      });
    }
    function x(b) {
      return b && "undefined" !== typeof b.getElementsByTagName && b;
    }
    function f() {}
    function m(b) {
      for (var e = 0, c = b.length, h = ""; e < c; e++) h += b[e].value;
      return h;
    }
    function V(b, e, c) {
      var h = e.dir,
        l = e.next,
        v = l || h,
        a = c && "parentNode" === v,
        k = W++;
      return e.first
        ? function (e, c, l) {
            for (; (e = e[h]); ) if (1 === e.nodeType || a) return b(e, c, l);
            return !1;
          }
        : function (e, c, d) {
            var z,
              g,
              r = [F, k];
            if (d)
              for (; (e = e[h]); ) {
                if ((1 === e.nodeType || a) && b(e, c, d)) return !0;
              }
            else
              for (; (e = e[h]); )
                if (1 === e.nodeType || a)
                  if (
                    ((g = e[I] || (e[I] = {})),
                    (g = g[e.uniqueID] || (g[e.uniqueID] = {})),
                    l && l === e.nodeName.toLowerCase())
                  )
                    e = e[h] || e;
                  else {
                    if ((z = g[v]) && z[0] === F && z[1] === k)
                      return (r[2] = z[2]);
                    g[v] = r;
                    if ((r[2] = b(e, c, d))) return !0;
                  }
            return !1;
          };
    }
    function n(b) {
      return 1 < b.length
        ? function (e, c, h) {
            for (var l = b.length; l--; ) if (!b[l](e, c, h)) return !1;
            return !0;
          }
        : b[0];
    }
    function na(b, e, c, h, l) {
      for (var v, a = [], k = 0, d = b.length, z = null != e; k < d; k++)
        if ((v = b[k])) if (!c || c(v, h, l)) a.push(v), z && e.push(k);
      return a;
    }
    function N(b, c, l, v, a, k) {
      v && !v[I] && (v = N(v));
      a && !a[I] && (a = N(a, k));
      return h(function (h, k, d, z) {
        var g,
          r,
          A = [],
          x = [],
          ra = k.length,
          f;
        if (!(f = h)) {
          f = c || "*";
          for (
            var m = d.nodeType ? [d] : d, V = [], n = 0, lb = m.length;
            n < lb;
            n++
          )
            e(f, m[n], V);
          f = V;
        }
        f = !b || (!h && c) ? f : na(f, A, b, d, z);
        m = l ? (a || (h ? b : ra || v) ? [] : k) : f;
        l && l(f, m, d, z);
        if (v)
          for (g = na(m, x), v(g, [], d, z), d = g.length; d--; )
            if ((r = g[d])) m[x[d]] = !(f[x[d]] = r);
        if (h) {
          if (a || b) {
            if (a) {
              g = [];
              for (d = m.length; d--; ) (r = m[d]) && g.push((f[d] = r));
              a(null, (m = []), g, z);
            }
            for (d = m.length; d--; )
              (r = m[d]) &&
                -1 < (g = a ? X(h, r) : A[d]) &&
                (h[g] = !(k[g] = r));
          }
        } else (m = na(m === k ? m.splice(ra, m.length) : m)), a ? a(null, k, m, z) : T.apply(k, m);
      });
    }
    function da(b) {
      var e,
        c,
        h,
        l = b.length,
        v = P.relative[b[0].type];
      c = v || P.relative[" "];
      for (
        var a = v ? 1 : 0,
          k = V(
            function (b) {
              return b === e;
            },
            c,
            !0
          ),
          d = V(
            function (b) {
              return -1 < X(e, b);
            },
            c,
            !0
          ),
          z = [
            function (b, c, h) {
              b =
                (!v && (h || c !== q)) ||
                ((e = c).nodeType ? k(b, c, h) : d(b, c, h));
              e = null;
              return b;
            },
          ];
        a < l;
        a++
      )
        if ((c = P.relative[b[a].type])) z = [V(n(z), c)];
        else {
          c = P.filter[b[a].type].apply(null, b[a].matches);
          if (c[I]) {
            for (h = ++a; h < l && !P.relative[b[h].type]; h++);
            return N(
              1 < a && n(z),
              1 < a &&
                m(
                  b
                    .slice(0, a - 1)
                    .concat({ value: " " === b[a - 2].type ? "*" : "" })
                ).replace(J, "$1"),
              c,
              a < h && da(b.slice(a, h)),
              h < l && da((b = b.slice(h))),
              h < l && m(b)
            );
          }
          z.push(c);
        }
      return n(z);
    }
    function L(b, c) {
      var l = 0 < c.length,
        v = 0 < b.length,
        a = function (h, a, k, d, z) {
          var g,
            r,
            A,
            x = 0,
            f = "0",
            ra = h && [],
            m = [],
            V = q,
            n = h || (v && P.find.TAG("*", z)),
            Na = (F += null == V ? 1 : Math.random() || 0.1),
            N = n.length;
          for (
            z && (q = a == t || a || z);
            f !== N && null != (g = n[f]);
            f++
          ) {
            if (v && g) {
              r = 0;
              a || g.ownerDocument == t || (fa(g), (k = !Y));
              for (; (A = b[r++]); )
                if (A(g, a || t, k)) {
                  d.push(g);
                  break;
                }
              z && (F = Na);
            }
            l && ((g = !A && g) && x--, h && ra.push(g));
          }
          x += f;
          if (l && f !== x) {
            for (r = 0; (A = c[r++]); ) A(ra, m, a, k);
            if (h) {
              if (0 < x) for (; f--; ) ra[f] || m[f] || (m[f] = aa.call(d));
              m = na(m);
            }
            T.apply(d, m);
            z && !h && 0 < m.length && 1 < x + c.length && e.uniqueSort(d);
          }
          z && ((F = Na), (q = V));
          return ra;
        };
      return l ? h(a) : a;
    }
    var u,
      U,
      P,
      p,
      Ca,
      D,
      ha,
      w,
      q,
      qa,
      C,
      fa,
      t,
      G,
      Y,
      E,
      S,
      B,
      la,
      I = "sizzle" + 1 * new Date(),
      ba = b.document,
      F = 0,
      W = 0,
      y = c(),
      Ga = c(),
      ca = c(),
      H = c(),
      ga = function (b, e) {
        b === e && (C = !0);
        return 0;
      },
      Da = {}.hasOwnProperty,
      ia = [],
      aa = ia.pop,
      Ja = ia.push,
      T = ia.push,
      ua = ia.slice,
      X = function (b, e) {
        for (var c = 0, h = b.length; c < h; c++) if (b[c] === e) return c;
        return -1;
      },
      R = /[\x20\t\r\n\f]+/g,
      J = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
      za = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
      O = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
      Z = /[\x20\t\r\n\f]|>/,
      ja =
        /:((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
      Xa =
        /^(?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+$/,
      va = {
        ID: /^#((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)/,
        CLASS:
          /^\.((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)/,
        TAG: /^((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+|[*])/,
        ATTR: /^\[[\x20\t\r\n\f]*((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+))|)[\x20\t\r\n\f]*\]/,
        PSEUDO:
          /^:((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\[^\r\n\f]|[\w-]|[^\x00-\x7f])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
        CHILD:
          /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
        bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
        needsContext:
          /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
      },
      ma = /HTML$/i,
      M = /^(?:input|select|textarea|button)$/i,
      Q = /^h\d$/i,
      K = /^[^{]+\{\s*\[native \w/,
      ya = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      sa = /[+~]/,
      oa = /\\[\da-fA-F]{1,6}[\x20\t\r\n\f]?|\\([^\r\n\f])/g,
      ea = function (b, e) {
        b = "0x" + b.slice(1) - 65536;
        return e
          ? e
          : 0 > b
          ? String.fromCharCode(b + 65536)
          : String.fromCharCode((b >> 10) | 55296, (b & 1023) | 56320);
      },
      ta = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      ka = function (b, e) {
        return e
          ? "\x00" === b
            ? "�"
            : b.slice(0, -1) +
              "\\" +
              b.charCodeAt(b.length - 1).toString(16) +
              " "
          : "\\" + b;
      },
      Ha = function () {
        fa();
      },
      xa = V(
        function (b) {
          return !0 === b.disabled && "fieldset" === b.nodeName.toLowerCase();
        },
        { dir: "parentNode", next: "legend" }
      );
    try {
      T.apply((ia = ua.call(ba.childNodes)), ba.childNodes),
        ia[ba.childNodes.length].nodeType;
    } catch (lb) {
      T = {
        apply: ia.length
          ? function (b, e) {
              Ja.apply(b, ua.call(e));
            }
          : function (b, e) {
              for (var c = b.length, h = 0; (b[c++] = e[h++]); );
              b.length = c - 1;
            },
      };
    }
    U = e.support = {};
    Ca = e.isXML = function (b) {
      var e = b && (b.ownerDocument || b).documentElement;
      return !ma.test((b && b.namespaceURI) || (e && e.nodeName) || "HTML");
    };
    fa = e.setDocument = function (b) {
      var e;
      b = b ? b.ownerDocument || b : ba;
      if (b == t || 9 !== b.nodeType || !b.documentElement) return t;
      t = b;
      G = t.documentElement;
      Y = !Ca(t);
      ba != t &&
        (e = t.defaultView) &&
        e.top !== e &&
        (e.addEventListener
          ? e.addEventListener("unload", Ha, !1)
          : e.attachEvent && e.attachEvent("onunload", Ha));
      U.scope = l(function (b) {
        G.appendChild(b).appendChild(t.createElement("div"));
        return (
          "undefined" !== typeof b.querySelectorAll &&
          !b.querySelectorAll(":scope fieldset div").length
        );
      });
      U.attributes = l(function (b) {
        b.className = "i";
        return !b.getAttribute("className");
      });
      U.getElementsByTagName = l(function (b) {
        b.appendChild(t.createComment(""));
        return !b.getElementsByTagName("*").length;
      });
      U.getElementsByClassName = K.test(t.getElementsByClassName);
      U.getById = l(function (b) {
        G.appendChild(b).id = I;
        return !t.getElementsByName || !t.getElementsByName(I).length;
      });
      U.getById
        ? ((P.filter.ID = function (b) {
            var e = b.replace(oa, ea);
            return function (b) {
              return b.getAttribute("id") === e;
            };
          }),
          (P.find.ID = function (b, e) {
            if ("undefined" !== typeof e.getElementById && Y)
              return (b = e.getElementById(b)) ? [b] : [];
          }))
        : ((P.filter.ID = function (b) {
            var e = b.replace(oa, ea);
            return function (b) {
              return (
                (b =
                  "undefined" !== typeof b.getAttributeNode &&
                  b.getAttributeNode("id")) && b.value === e
              );
            };
          }),
          (P.find.ID = function (b, e) {
            if ("undefined" !== typeof e.getElementById && Y) {
              var c,
                h,
                l = e.getElementById(b);
              if (l) {
                if ((c = l.getAttributeNode("id")) && c.value === b) return [l];
                h = e.getElementsByName(b);
                for (e = 0; (l = h[e++]); )
                  if ((c = l.getAttributeNode("id")) && c.value === b)
                    return [l];
              }
              return [];
            }
          }));
      P.find.TAG = U.getElementsByTagName
        ? function (b, e) {
            if ("undefined" !== typeof e.getElementsByTagName)
              return e.getElementsByTagName(b);
            if (U.qsa) return e.querySelectorAll(b);
          }
        : function (b, e) {
            var c = [],
              h = 0;
            e = e.getElementsByTagName(b);
            if ("*" === b) {
              for (; (b = e[h++]); ) 1 === b.nodeType && c.push(b);
              return c;
            }
            return e;
          };
      P.find.CLASS =
        U.getElementsByClassName &&
        function (b, e) {
          if ("undefined" !== typeof e.getElementsByClassName && Y)
            return e.getElementsByClassName(b);
        };
      S = [];
      E = [];
      if ((U.qsa = K.test(t.querySelectorAll)))
        l(function (b) {
          var e;
          G.appendChild(b).innerHTML =
            "\x3ca id\x3d'" +
            I +
            "'\x3e\x3c/a\x3e\x3cselect id\x3d'" +
            I +
            "-\r\\' msallowcapture\x3d''\x3e\x3coption selected\x3d''\x3e\x3c/option\x3e\x3c/select\x3e";
          b.querySelectorAll("[msallowcapture^\x3d'']").length &&
            E.push("[*^$]\x3d[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
          b.querySelectorAll("[selected]").length ||
            E.push(
              "\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)"
            );
          b.querySelectorAll("[id~\x3d" + I + "-]").length || E.push("~\x3d");
          e = t.createElement("input");
          e.setAttribute("name", "");
          b.appendChild(e);
          b.querySelectorAll("[name\x3d'']").length ||
            E.push(
              "\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*\x3d[\\x20\\t\\r\\n\\f]*(?:''|\"\")"
            );
          b.querySelectorAll(":checked").length || E.push(":checked");
          b.querySelectorAll("a#" + I + "+*").length || E.push(".#.+[+~]");
          b.querySelectorAll("\\\f");
          E.push("[\\r\\n\\f]");
        }),
          l(function (b) {
            b.innerHTML =
              "\x3ca href\x3d'' disabled\x3d'disabled'\x3e\x3c/a\x3e\x3cselect disabled\x3d'disabled'\x3e\x3coption/\x3e\x3c/select\x3e";
            var e = t.createElement("input");
            e.setAttribute("type", "hidden");
            b.appendChild(e).setAttribute("name", "D");
            b.querySelectorAll("[name\x3dd]").length &&
              E.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?\x3d");
            2 !== b.querySelectorAll(":enabled").length &&
              E.push(":enabled", ":disabled");
            G.appendChild(b).disabled = !0;
            2 !== b.querySelectorAll(":disabled").length &&
              E.push(":enabled", ":disabled");
            b.querySelectorAll("*,:x");
            E.push(",.*:");
          });
      (U.matchesSelector = K.test(
        (B =
          G.matches ||
          G.webkitMatchesSelector ||
          G.mozMatchesSelector ||
          G.oMatchesSelector ||
          G.msMatchesSelector)
      )) &&
        l(function (b) {
          U.disconnectedMatch = B.call(b, "*");
          B.call(b, "[s!\x3d'']:x");
          S.push(
            "!\x3d",
            ":((?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?\x3d)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)"
          );
        });
      E = E.length && new RegExp(E.join("|"));
      S = S.length && new RegExp(S.join("|"));
      la =
        (e = K.test(G.compareDocumentPosition)) || K.test(G.contains)
          ? function (b, e) {
              var c = 9 === b.nodeType ? b.documentElement : b;
              e = e && e.parentNode;
              return (
                b === e ||
                !!(
                  e &&
                  1 === e.nodeType &&
                  (c.contains
                    ? c.contains(e)
                    : b.compareDocumentPosition &&
                      b.compareDocumentPosition(e) & 16)
                )
              );
            }
          : function (b, e) {
              if (e) for (; (e = e.parentNode); ) if (e === b) return !0;
              return !1;
            };
      ga = e
        ? function (b, e) {
            if (b === e) return (C = !0), 0;
            var c = !b.compareDocumentPosition - !e.compareDocumentPosition;
            if (c) return c;
            c =
              (b.ownerDocument || b) == (e.ownerDocument || e)
                ? b.compareDocumentPosition(e)
                : 1;
            return c & 1 ||
              (!U.sortDetached && e.compareDocumentPosition(b) === c)
              ? b == t || (b.ownerDocument == ba && la(ba, b))
                ? -1
                : e == t || (e.ownerDocument == ba && la(ba, e))
                ? 1
                : qa
                ? X(qa, b) - X(qa, e)
                : 0
              : c & 4
              ? -1
              : 1;
          }
        : function (b, e) {
            if (b === e) return (C = !0), 0;
            var c = 0,
              h = b.parentNode,
              l = e.parentNode,
              a = [b],
              v = [e];
            if (!h || !l)
              return b == t
                ? -1
                : e == t
                ? 1
                : h
                ? -1
                : l
                ? 1
                : qa
                ? X(qa, b) - X(qa, e)
                : 0;
            if (h === l) return k(b, e);
            for (; (b = b.parentNode); ) a.unshift(b);
            for (b = e; (b = b.parentNode); ) v.unshift(b);
            for (; a[c] === v[c]; ) c++;
            return c ? k(a[c], v[c]) : a[c] == ba ? -1 : v[c] == ba ? 1 : 0;
          };
      return t;
    };
    e.matches = function (b, c) {
      return e(b, null, null, c);
    };
    e.matchesSelector = function (b, c) {
      fa(b);
      if (
        !(
          !U.matchesSelector ||
          !Y ||
          H[c + " "] ||
          (S && S.test(c)) ||
          (E && E.test(c))
        )
      )
        try {
          var h = B.call(b, c);
          if (
            h ||
            U.disconnectedMatch ||
            (b.document && 11 !== b.document.nodeType)
          )
            return h;
        } catch (nc) {
          H(c, !0);
        }
      return 0 < e(c, t, null, [b]).length;
    };
    e.contains = function (b, e) {
      (b.ownerDocument || b) != t && fa(b);
      return la(b, e);
    };
    e.attr = function (b, e) {
      (b.ownerDocument || b) != t && fa(b);
      var c = P.attrHandle[e.toLowerCase()],
        c = c && Da.call(P.attrHandle, e.toLowerCase()) ? c(b, e, !Y) : void 0;
      return void 0 !== c
        ? c
        : U.attributes || !Y
        ? b.getAttribute(e)
        : (c = b.getAttributeNode(e)) && c.specified
        ? c.value
        : null;
    };
    e.escape = function (b) {
      return (b + "").replace(ta, ka);
    };
    e.error = function (b) {
      throw Error("Syntax error, unrecognized expression: " + b);
    };
    e.uniqueSort = function (b) {
      var e,
        c = [],
        h = 0,
        l = 0;
      C = !U.detectDuplicates;
      qa = !U.sortStable && b.slice(0);
      b.sort(ga);
      if (C) {
        for (; (e = b[l++]); ) e === b[l] && (h = c.push(l));
        for (; h--; ) b.splice(c[h], 1);
      }
      qa = null;
      return b;
    };
    p = e.getText = function (b) {
      var e,
        c = "",
        h = 0;
      e = b.nodeType;
      if (!e) for (; (e = b[h++]); ) c += p(e);
      else if (1 === e || 9 === e || 11 === e) {
        if ("string" === typeof b.textContent) return b.textContent;
        for (b = b.firstChild; b; b = b.nextSibling) c += p(b);
      } else if (3 === e || 4 === e) return b.nodeValue;
      return c;
    };
    P = e.selectors = {
      cacheLength: 50,
      createPseudo: h,
      match: va,
      attrHandle: {},
      find: {},
      relative: {
        "\x3e": { dir: "parentNode", first: !0 },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: !0 },
        "~": { dir: "previousSibling" },
      },
      preFilter: {
        ATTR: function (b) {
          b[1] = b[1].replace(oa, ea);
          b[3] = (b[3] || b[4] || b[5] || "").replace(oa, ea);
          "~\x3d" === b[2] && (b[3] = " " + b[3] + " ");
          return b.slice(0, 4);
        },
        CHILD: function (b) {
          b[1] = b[1].toLowerCase();
          "nth" === b[1].slice(0, 3)
            ? (b[3] || e.error(b[0]),
              (b[4] = +(b[4]
                ? b[5] + (b[6] || 1)
                : 2 * ("even" === b[3] || "odd" === b[3]))),
              (b[5] = +(b[7] + b[8] || "odd" === b[3])))
            : b[3] && e.error(b[0]);
          return b;
        },
        PSEUDO: function (b) {
          var e,
            c = !b[6] && b[2];
          if (va.CHILD.test(b[0])) return null;
          b[3]
            ? (b[2] = b[4] || b[5] || "")
            : c &&
              ja.test(c) &&
              (e = D(c, !0)) &&
              (e = c.indexOf(")", c.length - e) - c.length) &&
              ((b[0] = b[0].slice(0, e)), (b[2] = c.slice(0, e)));
          return b.slice(0, 3);
        },
      },
      filter: {
        TAG: function (b) {
          var e = b.replace(oa, ea).toLowerCase();
          return "*" === b
            ? function () {
                return !0;
              }
            : function (b) {
                return b.nodeName && b.nodeName.toLowerCase() === e;
              };
        },
        CLASS: function (b) {
          var e = y[b + " "];
          return (
            e ||
            ((e = new RegExp(
              "(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)"
            )),
            y(b, function (b) {
              return e.test(
                ("string" === typeof b.className && b.className) ||
                  ("undefined" !== typeof b.getAttribute &&
                    b.getAttribute("class")) ||
                  ""
              );
            }))
          );
        },
        ATTR: function (b, c, h) {
          return function (l) {
            l = e.attr(l, b);
            if (null == l) return "!\x3d" === c;
            if (!c) return !0;
            l += "";
            return "\x3d" === c
              ? l === h
              : "!\x3d" === c
              ? l !== h
              : "^\x3d" === c
              ? h && 0 === l.indexOf(h)
              : "*\x3d" === c
              ? h && -1 < l.indexOf(h)
              : "$\x3d" === c
              ? h && l.slice(-h.length) === h
              : "~\x3d" === c
              ? -1 < (" " + l.replace(R, " ") + " ").indexOf(h)
              : "|\x3d" === c
              ? l === h || l.slice(0, h.length + 1) === h + "-"
              : !1;
          };
        },
        CHILD: function (b, e, c, h, l) {
          var a = "nth" !== b.slice(0, 3),
            v = "last" !== b.slice(-4),
            k = "of-type" === e;
          return 1 === h && 0 === l
            ? function (b) {
                return !!b.parentNode;
              }
            : function (e, c, d) {
                var z, g, r, A, f;
                c = a !== v ? "nextSibling" : "previousSibling";
                var x = e.parentNode,
                  m = k && e.nodeName.toLowerCase();
                d = !d && !k;
                z = !1;
                if (x) {
                  if (a) {
                    for (; c; ) {
                      for (r = e; (r = r[c]); )
                        if (
                          k ? r.nodeName.toLowerCase() === m : 1 === r.nodeType
                        )
                          return !1;
                      f = c = "only" === b && !f && "nextSibling";
                    }
                    return !0;
                  }
                  f = [v ? x.firstChild : x.lastChild];
                  if (v && d)
                    for (
                      r = x,
                        g = r[I] || (r[I] = {}),
                        g = g[r.uniqueID] || (g[r.uniqueID] = {}),
                        z = g[b] || [],
                        z = (A = z[0] === F && z[1]) && z[2],
                        r = A && x.childNodes[A];
                      (r = (++A && r && r[c]) || (z = A = 0) || f.pop());

                    ) {
                      if (1 === r.nodeType && ++z && r === e) {
                        g[b] = [F, A, z];
                        break;
                      }
                    }
                  else if (
                    (d &&
                      ((r = e),
                      (g = r[I] || (r[I] = {})),
                      (g = g[r.uniqueID] || (g[r.uniqueID] = {})),
                      (z = g[b] || []),
                      (z = A = z[0] === F && z[1])),
                    !1 === z)
                  )
                    for (
                      ;
                      (r = (++A && r && r[c]) || (z = A = 0) || f.pop()) &&
                      ((k
                        ? r.nodeName.toLowerCase() !== m
                        : 1 !== r.nodeType) ||
                        !++z ||
                        (d &&
                          ((g = r[I] || (r[I] = {})),
                          (g = g[r.uniqueID] || (g[r.uniqueID] = {})),
                          (g[b] = [F, z])),
                        r !== e));

                    );
                  z -= l;
                  return z === h || (0 === z % h && 0 <= z / h);
                }
              };
        },
        PSEUDO: function (b, c) {
          var l,
            a =
              P.pseudos[b] ||
              P.setFilters[b.toLowerCase()] ||
              e.error("unsupported pseudo: " + b);
          return a[I]
            ? a(c)
            : 1 < a.length
            ? ((l = [b, b, "", c]),
              P.setFilters.hasOwnProperty(b.toLowerCase())
                ? h(function (b, e) {
                    for (var h, l = a(b, c), v = l.length; v--; )
                      (h = X(b, l[v])), (b[h] = !(e[h] = l[v]));
                  })
                : function (b) {
                    return a(b, 0, l);
                  })
            : a;
        },
      },
      pseudos: {
        not: h(function (b) {
          var e = [],
            c = [],
            l = ha(b.replace(J, "$1"));
          return l[I]
            ? h(function (b, e, c, h) {
                h = l(b, null, h, []);
                for (var a = b.length; a--; )
                  if ((c = h[a])) b[a] = !(e[a] = c);
              })
            : function (b, h, a) {
                e[0] = b;
                l(e, null, a, c);
                e[0] = null;
                return !c.pop();
              };
        }),
        has: h(function (b) {
          return function (c) {
            return 0 < e(b, c).length;
          };
        }),
        contains: h(function (b) {
          b = b.replace(oa, ea);
          return function (e) {
            return -1 < (e.textContent || p(e)).indexOf(b);
          };
        }),
        lang: h(function (b) {
          Xa.test(b || "") || e.error("unsupported lang: " + b);
          b = b.replace(oa, ea).toLowerCase();
          return function (e) {
            var c;
            do
              if (
                (c = Y
                  ? e.lang
                  : e.getAttribute("xml:lang") || e.getAttribute("lang"))
              )
                return (
                  (c = c.toLowerCase()), c === b || 0 === c.indexOf(b + "-")
                );
            while ((e = e.parentNode) && 1 === e.nodeType);
            return !1;
          };
        }),
        target: function (e) {
          var c = b.location && b.location.hash;
          return c && c.slice(1) === e.id;
        },
        root: function (b) {
          return b === G;
        },
        focus: function (b) {
          return (
            b === t.activeElement &&
            (!t.hasFocus || t.hasFocus()) &&
            !!(b.type || b.href || ~b.tabIndex)
          );
        },
        enabled: r(!1),
        disabled: r(!0),
        checked: function (b) {
          var e = b.nodeName.toLowerCase();
          return (
            ("input" === e && !!b.checked) || ("option" === e && !!b.selected)
          );
        },
        selected: function (b) {
          b.parentNode && b.parentNode.selectedIndex;
          return !0 === b.selected;
        },
        empty: function (b) {
          for (b = b.firstChild; b; b = b.nextSibling)
            if (6 > b.nodeType) return !1;
          return !0;
        },
        parent: function (b) {
          return !P.pseudos.empty(b);
        },
        header: function (b) {
          return Q.test(b.nodeName);
        },
        input: function (b) {
          return M.test(b.nodeName);
        },
        button: function (b) {
          var e = b.nodeName.toLowerCase();
          return ("input" === e && "button" === b.type) || "button" === e;
        },
        text: function (b) {
          var e;
          return (
            "input" === b.nodeName.toLowerCase() &&
            "text" === b.type &&
            (null == (e = b.getAttribute("type")) || "text" === e.toLowerCase())
          );
        },
        first: A(function () {
          return [0];
        }),
        last: A(function (b, e) {
          return [e - 1];
        }),
        eq: A(function (b, e, c) {
          return [0 > c ? c + e : c];
        }),
        even: A(function (b, e) {
          for (var c = 0; c < e; c += 2) b.push(c);
          return b;
        }),
        odd: A(function (b, e) {
          for (var c = 1; c < e; c += 2) b.push(c);
          return b;
        }),
        lt: A(function (b, e, c) {
          for (e = 0 > c ? c + e : c > e ? e : c; 0 <= --e; ) b.push(e);
          return b;
        }),
        gt: A(function (b, e, c) {
          for (c = 0 > c ? c + e : c; ++c < e; ) b.push(c);
          return b;
        }),
      },
    };
    P.pseudos.nth = P.pseudos.eq;
    for (u in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
      P.pseudos[u] = d(u);
    for (u in { submit: !0, reset: !0 }) P.pseudos[u] = g(u);
    f.prototype = P.filters = P.pseudos;
    P.setFilters = new f();
    D = e.tokenize = function (b, c) {
      var h, l, a, v, k, d, z;
      if ((k = Ga[b + " "])) return c ? 0 : k.slice(0);
      k = b;
      d = [];
      for (z = P.preFilter; k; ) {
        if (!h || (l = za.exec(k)))
          l && (k = k.slice(l[0].length) || k), d.push((a = []));
        h = !1;
        if ((l = O.exec(k)))
          (h = l.shift()),
            a.push({ value: h, type: l[0].replace(J, " ") }),
            (k = k.slice(h.length));
        for (v in P.filter)
          !(l = va[v].exec(k)) ||
            (z[v] && !(l = z[v](l))) ||
            ((h = l.shift()),
            a.push({ value: h, type: v, matches: l }),
            (k = k.slice(h.length)));
        if (!h) break;
      }
      return c ? k.length : k ? e.error(b) : Ga(b, d).slice(0);
    };
    ha = e.compile = function (b, e) {
      var c,
        h = [],
        l = [],
        a = ca[b + " "];
      if (!a) {
        e || (e = D(b));
        for (c = e.length; c--; ) (a = da(e[c])), a[I] ? h.push(a) : l.push(a);
        a = ca(b, L(l, h));
        a.selector = b;
      }
      return a;
    };
    w = e.select = function (b, e, c, h) {
      var l,
        a,
        v,
        k,
        d = "function" === typeof b && b,
        z = !h && D((b = d.selector || b));
      c = c || [];
      if (1 === z.length) {
        a = z[0] = z[0].slice(0);
        if (
          2 < a.length &&
          "ID" === (v = a[0]).type &&
          9 === e.nodeType &&
          Y &&
          P.relative[a[1].type]
        ) {
          e = (P.find.ID(v.matches[0].replace(oa, ea), e) || [])[0];
          if (!e) return c;
          d && (e = e.parentNode);
          b = b.slice(a.shift().value.length);
        }
        for (l = va.needsContext.test(b) ? 0 : a.length; l--; ) {
          v = a[l];
          if (P.relative[(k = v.type)]) break;
          if ((k = P.find[k]))
            if (
              (h = k(
                v.matches[0].replace(oa, ea),
                (sa.test(a[0].type) && x(e.parentNode)) || e
              ))
            ) {
              a.splice(l, 1);
              b = h.length && m(a);
              if (!b) return T.apply(c, h), c;
              break;
            }
        }
      }
      (d || ha(b, z))(h, e, !Y, c, !e || (sa.test(b) && x(e.parentNode)) || e);
      return c;
    };
    U.sortStable = I.split("").sort(ga).join("") === I;
    U.detectDuplicates = !!C;
    fa();
    U.sortDetached = l(function (b) {
      return b.compareDocumentPosition(t.createElement("fieldset")) & 1;
    });
    l(function (b) {
      b.innerHTML = "\x3ca href\x3d'#'\x3e\x3c/a\x3e";
      return "#" === b.firstChild.getAttribute("href");
    }) ||
      a("type|href|height|width", function (b, e, c) {
        if (!c) return b.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
      });
    (U.attributes &&
      l(function (b) {
        b.innerHTML = "\x3cinput/\x3e";
        b.firstChild.setAttribute("value", "");
        return "" === b.firstChild.getAttribute("value");
      })) ||
      a("value", function (b, e, c) {
        if (!c && "input" === b.nodeName.toLowerCase()) return b.defaultValue;
      });
    l(function (b) {
      return null == b.getAttribute("disabled");
    }) ||
      a(
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        function (b, e, c) {
          var h;
          if (!c)
            return !0 === b[e]
              ? e.toLowerCase()
              : (h = b.getAttributeNode(e)) && h.specified
              ? h.value
              : null;
        }
      );
    return e;
  })(a);
  l.find = oa;
  l.expr = oa.selectors;
  l.expr[":"] = l.expr.pseudos;
  l.uniqueSort = l.unique = oa.uniqueSort;
  l.text = oa.getText;
  l.isXMLDoc = oa.isXML;
  l.contains = oa.contains;
  l.escapeSelector = oa.escape;
  var Ha = function (b, e, c) {
      for (var h = [], a = void 0 !== c; (b = b[e]) && 9 !== b.nodeType; )
        if (1 === b.nodeType) {
          if (a && l(b).is(c)) break;
          h.push(b);
        }
      return h;
    },
    nb = function (b, e) {
      for (var c = []; b; b = b.nextSibling)
        1 === b.nodeType && b !== e && c.push(b);
      return c;
    },
    ob = l.expr.match.needsContext,
    pb = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  l.filter = function (b, e, c) {
    var h = e[0];
    c && (b = ":not(" + b + ")");
    return 1 === e.length && 1 === h.nodeType
      ? l.find.matchesSelector(h, b)
        ? [h]
        : []
      : l.find.matches(
          b,
          l.grep(e, function (b) {
            return 1 === b.nodeType;
          })
        );
  };
  l.fn.extend({
    find: function (b) {
      var e,
        c,
        h = this.length,
        a = this;
      if ("string" !== typeof b)
        return this.pushStack(
          l(b).filter(function () {
            for (e = 0; e < h; e++) if (l.contains(a[e], this)) return !0;
          })
        );
      c = this.pushStack([]);
      for (e = 0; e < h; e++) l.find(b, a[e], c);
      return 1 < h ? l.uniqueSort(c) : c;
    },
    filter: function (b) {
      return this.pushStack(w(this, b || [], !1));
    },
    not: function (b) {
      return this.pushStack(w(this, b || [], !0));
    },
    is: function (b) {
      return !!w(this, "string" === typeof b && ob.test(b) ? l(b) : b || [], !1)
        .length;
    },
  });
  var qb,
    Ob = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (l.fn.init = function (b, e, c) {
    var h;
    if (!b) return this;
    c = c || qb;
    if ("string" === typeof b) {
      h =
        "\x3c" === b[0] && "\x3e" === b[b.length - 1] && 3 <= b.length
          ? [null, b, null]
          : Ob.exec(b);
      if (!h || (!h[1] && e))
        return !e || e.jquery ? (e || c).find(b) : this.constructor(e).find(b);
      if (h[1]) {
        if (
          ((e = e instanceof l ? e[0] : e),
          l.merge(
            this,
            l.parseHTML(h[1], e && e.nodeType ? e.ownerDocument || e : W, !0)
          ),
          pb.test(h[1]) && l.isPlainObject(e))
        )
          for (h in e)
            if (A(this[h])) this[h](e[h]);
            else this.attr(h, e[h]);
      } else if ((b = W.getElementById(h[2]))) (this[0] = b), (this.length = 1);
      return this;
    }
    return b.nodeType
      ? ((this[0] = b), (this.length = 1), this)
      : A(b)
      ? void 0 !== c.ready
        ? c.ready(b)
        : b(l)
      : l.makeArray(b, this);
  }).prototype = l.fn;
  qb = l(W);
  var Pb = /^(?:parents|prev(?:Until|All))/,
    Qb = { children: !0, contents: !0, next: !0, prev: !0 };
  l.fn.extend({
    has: function (b) {
      var e = l(b, this),
        c = e.length;
      return this.filter(function () {
        for (var b = 0; b < c; b++) if (l.contains(this, e[b])) return !0;
      });
    },
    closest: function (b, e) {
      var c,
        h = 0,
        a = this.length,
        k = [],
        d = "string" !== typeof b && l(b);
      if (!ob.test(b))
        for (; h < a; h++)
          for (c = this[h]; c && c !== e; c = c.parentNode)
            if (
              11 > c.nodeType &&
              (d
                ? -1 < d.index(c)
                : 1 === c.nodeType && l.find.matchesSelector(c, b))
            ) {
              k.push(c);
              break;
            }
      return this.pushStack(1 < k.length ? l.uniqueSort(k) : k);
    },
    index: function (b) {
      return b
        ? "string" === typeof b
          ? Da.call(l(b), this[0])
          : Da.call(this, b.jquery ? b[0] : b)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (b, e) {
      return this.pushStack(l.uniqueSort(l.merge(this.get(), l(b, e))));
    },
    addBack: function (b) {
      return this.add(null == b ? this.prevObject : this.prevObject.filter(b));
    },
  });
  l.each(
    {
      parent: function (b) {
        return (b = b.parentNode) && 11 !== b.nodeType ? b : null;
      },
      parents: function (b) {
        return Ha(b, "parentNode");
      },
      parentsUntil: function (b, e, c) {
        return Ha(b, "parentNode", c);
      },
      next: function (b) {
        return B(b, "nextSibling");
      },
      prev: function (b) {
        return B(b, "previousSibling");
      },
      nextAll: function (b) {
        return Ha(b, "nextSibling");
      },
      prevAll: function (b) {
        return Ha(b, "previousSibling");
      },
      nextUntil: function (b, e, c) {
        return Ha(b, "nextSibling", c);
      },
      prevUntil: function (b, e, c) {
        return Ha(b, "previousSibling", c);
      },
      siblings: function (b) {
        return nb((b.parentNode || {}).firstChild, b);
      },
      children: function (b) {
        return nb(b.firstChild);
      },
      contents: function (b) {
        if (null != b.contentDocument && V(b.contentDocument))
          return b.contentDocument;
        p(b, "template") && (b = b.content || b);
        return l.merge([], b.childNodes);
      },
    },
    function (b, e) {
      l.fn[b] = function (c, h) {
        var a = l.map(this, e, c);
        "Until" !== b.slice(-5) && (h = c);
        h && "string" === typeof h && (a = l.filter(h, a));
        1 < this.length &&
          (Qb[b] || l.uniqueSort(a), Pb.test(b) && a.reverse());
        return this.pushStack(a);
      };
    }
  );
  var Aa = /[^\x20\t\r\n\f]+/g;
  l.Callbacks = function (b) {
    b = "string" === typeof b ? F(b) : l.extend({}, b);
    var e,
      c,
      h,
      a,
      k = [],
      d = [],
      g = -1,
      r = function () {
        a = a || b.once;
        for (h = e = !0; d.length; g = -1)
          for (c = d.shift(); ++g < k.length; )
            !1 === k[g].apply(c[0], c[1]) &&
              b.stopOnFalse &&
              ((g = k.length), (c = !1));
        b.memory || (c = !1);
        e = !1;
        a && (k = c ? [] : "");
      },
      f = {
        add: function () {
          k &&
            (c && !e && ((g = k.length - 1), d.push(c)),
            (function Ya(e) {
              l.each(e, function (e, c) {
                A(c)
                  ? (b.unique && f.has(c)) || k.push(c)
                  : c && c.length && "string" !== t(c) && Ya(c);
              });
            })(arguments),
            c && !e && r());
          return this;
        },
        remove: function () {
          l.each(arguments, function (b, e) {
            for (var c; -1 < (c = l.inArray(e, k, c)); )
              k.splice(c, 1), c <= g && g--;
          });
          return this;
        },
        has: function (b) {
          return b ? -1 < l.inArray(b, k) : 0 < k.length;
        },
        empty: function () {
          k && (k = []);
          return this;
        },
        disable: function () {
          a = d = [];
          k = c = "";
          return this;
        },
        disabled: function () {
          return !k;
        },
        lock: function () {
          a = d = [];
          c || e || (k = c = "");
          return this;
        },
        locked: function () {
          return !!a;
        },
        fireWith: function (b, c) {
          a ||
            ((c = c || []),
            (c = [b, c.slice ? c.slice() : c]),
            d.push(c),
            e || r());
          return this;
        },
        fire: function () {
          f.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!h;
        },
      };
    return f;
  };
  l.extend({
    Deferred: function (b) {
      var e = [
          [
            "notify",
            "progress",
            l.Callbacks("memory"),
            l.Callbacks("memory"),
            2,
          ],
          [
            "resolve",
            "done",
            l.Callbacks("once memory"),
            l.Callbacks("once memory"),
            0,
            "resolved",
          ],
          [
            "reject",
            "fail",
            l.Callbacks("once memory"),
            l.Callbacks("once memory"),
            1,
            "rejected",
          ],
        ],
        c = "pending",
        h = {
          state: function () {
            return c;
          },
          always: function () {
            k.done(arguments).fail(arguments);
            return this;
          },
          catch: function (b) {
            return h.then(null, b);
          },
          pipe: function () {
            var b = arguments;
            return l
              .Deferred(function (c) {
                l.each(e, function (e, h) {
                  var l = A(b[h[4]]) && b[h[4]];
                  k[h[1]](function () {
                    var b = l && l.apply(this, arguments);
                    if (b && A(b.promise))
                      b.promise()
                        .progress(c.notify)
                        .done(c.resolve)
                        .fail(c.reject);
                    else c[h[0] + "With"](this, l ? [b] : arguments);
                  });
                });
                b = null;
              })
              .promise();
          },
          then: function (b, c, h) {
            function k(b, e, c, h) {
              return function () {
                var d = this,
                  z = arguments,
                  g = function () {
                    var l, a;
                    if (!(b < v)) {
                      l = c.apply(d, z);
                      if (l === e.promise())
                        throw new TypeError("Thenable self-resolution");
                      a =
                        l &&
                        ("object" === typeof l || "function" === typeof l) &&
                        l.then;
                      A(a)
                        ? h
                          ? a.call(l, k(v, e, O, h), k(v, e, K, h))
                          : (v++,
                            a.call(
                              l,
                              k(v, e, O, h),
                              k(v, e, K, h),
                              k(v, e, O, e.notifyWith)
                            ))
                        : (c !== O && ((d = void 0), (z = [l])),
                          (h || e.resolveWith)(d, z));
                    }
                  },
                  r = h
                    ? g
                    : function () {
                        try {
                          g();
                        } catch (mb) {
                          l.Deferred.exceptionHook &&
                            l.Deferred.exceptionHook(mb, r.stackTrace),
                            b + 1 >= v &&
                              (c !== K && ((d = void 0), (z = [mb])),
                              e.rejectWith(d, z));
                        }
                      };
                b
                  ? r()
                  : (l.Deferred.getStackHook &&
                      (r.stackTrace = l.Deferred.getStackHook()),
                    a.setTimeout(r));
              };
            }
            var v = 0;
            return l
              .Deferred(function (l) {
                e[0][3].add(k(0, l, A(h) ? h : O, l.notifyWith));
                e[1][3].add(k(0, l, A(b) ? b : O));
                e[2][3].add(k(0, l, A(c) ? c : K));
              })
              .promise();
          },
          promise: function (b) {
            return null != b ? l.extend(b, h) : h;
          },
        },
        k = {};
      l.each(e, function (b, l) {
        var a = l[2],
          v = l[5];
        h[l[1]] = a.add;
        v &&
          a.add(
            function () {
              c = v;
            },
            e[3 - b][2].disable,
            e[3 - b][3].disable,
            e[0][2].lock,
            e[0][3].lock
          );
        a.add(l[3].fire);
        k[l[0]] = function () {
          k[l[0] + "With"](this === k ? void 0 : this, arguments);
          return this;
        };
        k[l[0] + "With"] = a.fireWith;
      });
      h.promise(k);
      b && b.call(k, k);
      return k;
    },
    when: function (b) {
      var e = arguments.length,
        c = e,
        h = Array(c),
        a = U.call(arguments),
        k = l.Deferred(),
        g = function (b) {
          return function (c) {
            h[b] = this;
            a[b] = 1 < arguments.length ? U.call(arguments) : c;
            --e || k.resolveWith(h, a);
          };
        };
      if (
        1 >= e &&
        (d(b, k.done(g(c)).resolve, k.reject, !e),
        "pending" === k.state() || A(a[c] && a[c].then))
      )
        return k.then();
      for (; c--; ) d(a[c], g(c), k.reject);
      return k.promise();
    },
  });
  var Rb = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  l.Deferred.exceptionHook = function (b, e) {
    a.console &&
      a.console.warn &&
      b &&
      Rb.test(b.name) &&
      a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, e);
  };
  l.readyException = function (b) {
    a.setTimeout(function () {
      throw b;
    });
  };
  var bb = l.Deferred();
  l.fn.ready = function (b) {
    bb.then(b).catch(function (b) {
      l.readyException(b);
    });
    return this;
  };
  l.extend({
    isReady: !1,
    readyWait: 1,
    ready: function (b) {
      (!0 === b ? --l.readyWait : l.isReady) ||
        ((l.isReady = !0),
        (!0 !== b && 0 < --l.readyWait) || bb.resolveWith(W, [l]));
    },
  });
  l.ready.then = bb.then;
  "complete" === W.readyState ||
  ("loading" !== W.readyState && !W.documentElement.doScroll)
    ? a.setTimeout(l.ready)
    : (W.addEventListener("DOMContentLoaded", I),
      a.addEventListener("load", I));
  var Ia = function (b, e, c, h, a, k, d) {
      var v = 0,
        z = b.length,
        g = null == c;
      if ("object" === t(c))
        for (v in ((a = !0), c)) Ia(b, e, v, c[v], !0, k, d);
      else if (
        void 0 !== h &&
        ((a = !0),
        A(h) || (d = !0),
        g &&
          (d
            ? (e.call(b, h), (e = null))
            : ((g = e),
              (e = function (b, e, c) {
                return g.call(l(b), c);
              }))),
        e)
      )
        for (; v < z; v++) e(b[v], c, d ? h : h.call(b[v], v, e(b[v], c)));
      return a ? b : g ? e.call(b) : z ? e(b[0], c) : k;
    },
    Eb = /^-ms-/,
    Fb = /-([a-z])/g,
    Pa = function (b) {
      return 1 === b.nodeType || 9 === b.nodeType || !+b.nodeType;
    };
  S.uid = 1;
  S.prototype = {
    cache: function (b) {
      var e = b[this.expando];
      e ||
        ((e = {}),
        Pa(b) &&
          (b.nodeType
            ? (b[this.expando] = e)
            : Object.defineProperty(b, this.expando, {
                value: e,
                configurable: !0,
              })));
      return e;
    },
    set: function (b, e, c) {
      var h;
      b = this.cache(b);
      if ("string" === typeof e) b[Y(e)] = c;
      else for (h in e) b[Y(h)] = e[h];
      return b;
    },
    get: function (b, e) {
      return void 0 === e
        ? this.cache(b)
        : b[this.expando] && b[this.expando][Y(e)];
    },
    access: function (b, e, c) {
      if (void 0 === e || (e && "string" === typeof e && void 0 === c))
        return this.get(b, e);
      this.set(b, e, c);
      return void 0 !== c ? c : e;
    },
    remove: function (b, e) {
      var c,
        h = b[this.expando];
      if (void 0 !== h) {
        if (void 0 !== e)
          for (
            Array.isArray(e)
              ? (e = e.map(Y))
              : ((e = Y(e)), (e = (e in h) ? [e] : e.match(Aa) || [])),
              c = e.length;
            c--;

          )
            delete h[e[c]];
        if (void 0 === e || l.isEmptyObject(h))
          b.nodeType ? (b[this.expando] = void 0) : delete b[this.expando];
      }
    },
    hasData: function (b) {
      b = b[this.expando];
      return void 0 !== b && !l.isEmptyObject(b);
    },
  };
  var M = new S(),
    pa = new S(),
    Hb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Gb = /[A-Z]/g;
  l.extend({
    hasData: function (b) {
      return pa.hasData(b) || M.hasData(b);
    },
    data: function (b, e, c) {
      return pa.access(b, e, c);
    },
    removeData: function (b, e) {
      pa.remove(b, e);
    },
    _data: function (b, e, c) {
      return M.access(b, e, c);
    },
    _removeData: function (b, e) {
      M.remove(b, e);
    },
  });
  l.fn.extend({
    data: function (b, e) {
      var c,
        h,
        l,
        a = this[0],
        k = a && a.attributes;
      if (void 0 === b) {
        if (
          this.length &&
          ((l = pa.get(a)), 1 === a.nodeType && !M.get(a, "hasDataAttrs"))
        ) {
          for (c = k.length; c--; )
            k[c] &&
              ((h = k[c].name),
              0 === h.indexOf("data-") &&
                ((h = Y(h.slice(5))), ga(a, h, l[h])));
          M.set(a, "hasDataAttrs", !0);
        }
        return l;
      }
      return "object" === typeof b
        ? this.each(function () {
            pa.set(this, b);
          })
        : Ia(
            this,
            function (e) {
              var c;
              if (a && void 0 === e) {
                c = pa.get(a, b);
                if (void 0 !== c) return c;
                c = ga(a, b);
                if (void 0 !== c) return c;
              } else
                this.each(function () {
                  pa.set(this, b, e);
                });
            },
            null,
            e,
            1 < arguments.length,
            null,
            !0
          );
    },
    removeData: function (b) {
      return this.each(function () {
        pa.remove(this, b);
      });
    },
  });
  l.extend({
    queue: function (b, e, c) {
      var h;
      if (b)
        return (
          (e = (e || "fx") + "queue"),
          (h = M.get(b, e)),
          c &&
            (!h || Array.isArray(c)
              ? (h = M.access(b, e, l.makeArray(c)))
              : h.push(c)),
          h || []
        );
    },
    dequeue: function (b, e) {
      e = e || "fx";
      var c = l.queue(b, e),
        h = c.length,
        a = c.shift(),
        k = l._queueHooks(b, e),
        d = function () {
          l.dequeue(b, e);
        };
      "inprogress" === a && ((a = c.shift()), h--);
      a &&
        ("fx" === e && c.unshift("inprogress"), delete k.stop, a.call(b, d, k));
      !h && k && k.empty.fire();
    },
    _queueHooks: function (b, c) {
      var e = c + "queueHooks";
      return (
        M.get(b, e) ||
        M.access(b, e, {
          empty: l.Callbacks("once memory").add(function () {
            M.remove(b, [c + "queue", e]);
          }),
        })
      );
    },
  });
  l.fn.extend({
    queue: function (b, c) {
      var e = 2;
      "string" !== typeof b && ((c = b), (b = "fx"), e--);
      return arguments.length < e
        ? l.queue(this[0], b)
        : void 0 === c
        ? this
        : this.each(function () {
            var e = l.queue(this, b, c);
            l._queueHooks(this, b);
            "fx" === b && "inprogress" !== e[0] && l.dequeue(this, b);
          });
    },
    dequeue: function (b) {
      return this.each(function () {
        l.dequeue(this, b);
      });
    },
    clearQueue: function (b) {
      return this.queue(b || "fx", []);
    },
    promise: function (b, c) {
      var e,
        h = 1,
        a = l.Deferred(),
        k = this,
        d = this.length,
        g = function () {
          --h || a.resolveWith(k, [k]);
        };
      "string" !== typeof b && ((c = b), (b = void 0));
      for (b = b || "fx"; d--; )
        (e = M.get(k[d], b + "queueHooks")) && e.empty && (h++, e.empty.add(g));
      g();
      return a.promise(c);
    },
  });
  var rb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    Oa = new RegExp("^(?:([+-])\x3d|)(" + rb + ")([a-z%]*)$", "i"),
    Fa = ["Top", "Right", "Bottom", "Left"],
    Ka = W.documentElement,
    La = function (b) {
      return l.contains(b.ownerDocument, b);
    },
    Sb = { composed: !0 };
  Ka.getRootNode &&
    (La = function (b) {
      return (
        l.contains(b.ownerDocument, b) || b.getRootNode(Sb) === b.ownerDocument
      );
    });
  var Ua = function (b, c) {
      b = c || b;
      return (
        "none" === b.style.display ||
        ("" === b.style.display && La(b) && "none" === l.css(b, "display"))
      );
    },
    fb = {};
  l.fn.extend({
    show: function () {
      return T(this, !0);
    },
    hide: function () {
      return T(this);
    },
    toggle: function (b) {
      return "boolean" === typeof b
        ? b
          ? this.show()
          : this.hide()
        : this.each(function () {
            Ua(this) ? l(this).show() : l(this).hide();
          });
    },
  });
  var Qa = /^(?:checkbox|radio)$/i,
    gb = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    hb = /^$|^module$|\/(?:java|ecma)script/i;
  (function () {
    var b = W.createDocumentFragment().appendChild(W.createElement("div")),
      c = W.createElement("input");
    c.setAttribute("type", "radio");
    c.setAttribute("checked", "checked");
    c.setAttribute("name", "t");
    b.appendChild(c);
    h.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked;
    b.innerHTML = "\x3ctextarea\x3ex\x3c/textarea\x3e";
    h.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
    b.innerHTML = "\x3coption\x3e\x3c/option\x3e";
    h.option = !!b.lastChild;
  })();
  var wa = {
    thead: [1, "\x3ctable\x3e", "\x3c/table\x3e"],
    col: [
      2,
      "\x3ctable\x3e\x3ccolgroup\x3e",
      "\x3c/colgroup\x3e\x3c/table\x3e",
    ],
    tr: [2, "\x3ctable\x3e\x3ctbody\x3e", "\x3c/tbody\x3e\x3c/table\x3e"],
    td: [
      3,
      "\x3ctable\x3e\x3ctbody\x3e\x3ctr\x3e",
      "\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e",
    ],
    _default: [0, "", ""],
  };
  wa.tbody = wa.tfoot = wa.colgroup = wa.caption = wa.thead;
  wa.th = wa.td;
  h.option ||
    (wa.optgroup = wa.option =
      [1, "\x3cselect multiple\x3d'multiple'\x3e", "\x3c/select\x3e"]);
  var Jb = /<|&#?\w+;/,
    sb = /^([^.]*)(?:\.(.+)|)/;
  l.event = {
    global: {},
    add: function (b, c, h, a, k) {
      var e, d, v, z, g, r, A, f, x;
      g = M.get(b);
      if (Pa(b))
        for (
          h.handler && ((e = h), (h = e.handler), (k = e.selector)),
            k && l.find.matchesSelector(Ka, k),
            h.guid || (h.guid = l.guid++),
            (z = g.events) || (z = g.events = Object.create(null)),
            (d = g.handle) ||
              (d = g.handle =
                function (c) {
                  return "undefined" !== typeof l &&
                    l.event.triggered !== c.type
                    ? l.event.dispatch.apply(b, arguments)
                    : void 0;
                }),
            c = (c || "").match(Aa) || [""],
            g = c.length;
          g--;

        )
          (v = sb.exec(c[g]) || []),
            (f = r = v[1]),
            (x = (v[2] || "").split(".").sort()),
            f &&
              ((v = l.event.special[f] || {}),
              (f = (k ? v.delegateType : v.bindType) || f),
              (v = l.event.special[f] || {}),
              (r = l.extend(
                {
                  type: f,
                  origType: r,
                  data: a,
                  handler: h,
                  guid: h.guid,
                  selector: k,
                  needsContext: k && l.expr.match.needsContext.test(k),
                  namespace: x.join("."),
                },
                e
              )),
              (A = z[f]) ||
                ((A = z[f] = []),
                (A.delegateCount = 0),
                (v.setup && !1 !== v.setup.call(b, a, x, d)) ||
                  (b.addEventListener && b.addEventListener(f, d))),
              v.add &&
                (v.add.call(b, r), r.handler.guid || (r.handler.guid = h.guid)),
              k ? A.splice(A.delegateCount++, 0, r) : A.push(r),
              (l.event.global[f] = !0));
    },
    remove: function (b, c, h, a, k) {
      var e,
        d,
        v,
        g,
        z,
        r,
        A,
        f,
        x,
        m,
        V,
        n = M.hasData(b) && M.get(b);
      if (n && (g = n.events)) {
        c = (c || "").match(Aa) || [""];
        for (z = c.length; z--; )
          if (
            ((v = sb.exec(c[z]) || []),
            (x = V = v[1]),
            (m = (v[2] || "").split(".").sort()),
            x)
          ) {
            A = l.event.special[x] || {};
            x = (a ? A.delegateType : A.bindType) || x;
            f = g[x] || [];
            v =
              v[2] &&
              new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)");
            for (d = e = f.length; e--; )
              (r = f[e]),
                (!k && V !== r.origType) ||
                  (h && h.guid !== r.guid) ||
                  (v && !v.test(r.namespace)) ||
                  (a && a !== r.selector && ("**" !== a || !r.selector)) ||
                  (f.splice(e, 1),
                  r.selector && f.delegateCount--,
                  A.remove && A.remove.call(b, r));
            d &&
              !f.length &&
              ((A.teardown && !1 !== A.teardown.call(b, m, n.handle)) ||
                l.removeEvent(b, x, n.handle),
              delete g[x]);
          } else for (x in g) l.event.remove(b, x + c[z], h, a, !0);
        l.isEmptyObject(g) && M.remove(b, "handle events");
      }
    },
    dispatch: function (b) {
      var c,
        h,
        a,
        k,
        d,
        g = Array(arguments.length),
        r = l.event.fix(b);
      h = (M.get(this, "events") || Object.create(null))[r.type] || [];
      var A = l.event.special[r.type] || {};
      g[0] = r;
      for (c = 1; c < arguments.length; c++) g[c] = arguments[c];
      r.delegateTarget = this;
      if (!A.preDispatch || !1 !== A.preDispatch.call(this, r)) {
        d = l.event.handlers.call(this, r, h);
        for (c = 0; (k = d[c++]) && !r.isPropagationStopped(); )
          for (
            r.currentTarget = k.elem, h = 0;
            (a = k.handlers[h++]) && !r.isImmediatePropagationStopped();

          )
            if (
              !r.rnamespace ||
              !1 === a.namespace ||
              r.rnamespace.test(a.namespace)
            )
              (r.handleObj = a),
                (r.data = a.data),
                (a = (
                  (l.event.special[a.origType] || {}).handle || a.handler
                ).apply(k.elem, g)),
                void 0 !== a &&
                  !1 === (r.result = a) &&
                  (r.preventDefault(), r.stopPropagation());
        A.postDispatch && A.postDispatch.call(this, r);
        return r.result;
      }
    },
    handlers: function (b, c) {
      var e,
        h,
        a,
        k,
        d,
        g = [],
        r = c.delegateCount,
        A = b.target;
      if (r && A.nodeType && !("click" === b.type && 1 <= b.button))
        for (; A !== this; A = A.parentNode || this)
          if (1 === A.nodeType && ("click" !== b.type || !0 !== A.disabled)) {
            k = [];
            d = {};
            for (e = 0; e < r; e++)
              (h = c[e]),
                (a = h.selector + " "),
                void 0 === d[a] &&
                  (d[a] = h.needsContext
                    ? -1 < l(a, this).index(A)
                    : l.find(a, this, null, [A]).length),
                d[a] && k.push(h);
            k.length && g.push({ elem: A, handlers: k });
          }
      r < c.length && g.push({ elem: this, handlers: c.slice(r) });
      return g;
    },
    addProp: function (b, c) {
      Object.defineProperty(l.Event.prototype, b, {
        enumerable: !0,
        configurable: !0,
        get: A(c)
          ? function () {
              if (this.originalEvent) return c(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[b];
            },
        set: function (c) {
          Object.defineProperty(this, b, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: c,
          });
        },
      });
    },
    fix: function (b) {
      return b[l.expando] ? b : new l.Event(b);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (b) {
          b = this || b;
          Qa.test(b.type) && b.click && p(b, "input") && u(b, "click", E);
          return !1;
        },
        trigger: function (b) {
          b = this || b;
          Qa.test(b.type) && b.click && p(b, "input") && u(b, "click");
          return !0;
        },
        _default: function (b) {
          b = b.target;
          return (
            (Qa.test(b.type) &&
              b.click &&
              p(b, "input") &&
              M.get(b, "click")) ||
            p(b, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (b) {
          void 0 !== b.result &&
            b.originalEvent &&
            (b.originalEvent.returnValue = b.result);
        },
      },
    },
  };
  l.removeEvent = function (b, c, h) {
    b.removeEventListener && b.removeEventListener(c, h);
  };
  l.Event = function (b, c) {
    if (!(this instanceof l.Event)) return new l.Event(b, c);
    b && b.type
      ? ((this.originalEvent = b),
        (this.type = b.type),
        (this.isDefaultPrevented =
          b.defaultPrevented ||
          (void 0 === b.defaultPrevented && !1 === b.returnValue)
            ? E
            : ca),
        (this.target =
          b.target && 3 === b.target.nodeType ? b.target.parentNode : b.target),
        (this.currentTarget = b.currentTarget),
        (this.relatedTarget = b.relatedTarget))
      : (this.type = b);
    c && l.extend(this, c);
    this.timeStamp = (b && b.timeStamp) || Date.now();
    this[l.expando] = !0;
  };
  l.Event.prototype = {
    constructor: l.Event,
    isDefaultPrevented: ca,
    isPropagationStopped: ca,
    isImmediatePropagationStopped: ca,
    isSimulated: !1,
    preventDefault: function () {
      var b = this.originalEvent;
      this.isDefaultPrevented = E;
      b && !this.isSimulated && b.preventDefault();
    },
    stopPropagation: function () {
      var b = this.originalEvent;
      this.isPropagationStopped = E;
      b && !this.isSimulated && b.stopPropagation();
    },
    stopImmediatePropagation: function () {
      var b = this.originalEvent;
      this.isImmediatePropagationStopped = E;
      b && !this.isSimulated && b.stopImmediatePropagation();
      this.stopPropagation();
    },
  };
  l.each(
    {
      altKey: !0,
      bubbles: !0,
      cancelable: !0,
      changedTouches: !0,
      ctrlKey: !0,
      detail: !0,
      eventPhase: !0,
      metaKey: !0,
      pageX: !0,
      pageY: !0,
      shiftKey: !0,
      view: !0,
      char: !0,
      code: !0,
      charCode: !0,
      key: !0,
      keyCode: !0,
      button: !0,
      buttons: !0,
      clientX: !0,
      clientY: !0,
      offsetX: !0,
      offsetY: !0,
      pointerId: !0,
      pointerType: !0,
      screenX: !0,
      screenY: !0,
      targetTouches: !0,
      toElement: !0,
      touches: !0,
      which: !0,
    },
    l.event.addProp
  );
  l.each({ focus: "focusin", blur: "focusout" }, function (b, c) {
    l.event.special[b] = {
      setup: function () {
        u(this, b, X);
        return !1;
      },
      trigger: function () {
        u(this, b);
        return !0;
      },
      _default: function () {
        return !0;
      },
      delegateType: c,
    };
  });
  l.each(
    {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout",
    },
    function (b, c) {
      l.event.special[b] = {
        delegateType: c,
        bindType: c,
        handle: function (b) {
          var e,
            h = b.relatedTarget,
            a = b.handleObj;
          if (!h || (h !== this && !l.contains(this, h)))
            (b.type = a.origType),
              (e = a.handler.apply(this, arguments)),
              (b.type = c);
          return e;
        },
      };
    }
  );
  l.fn.extend({
    on: function (b, c, h, a) {
      return m(this, b, c, h, a);
    },
    one: function (b, c, h, a) {
      return m(this, b, c, h, a, 1);
    },
    off: function (b, c, h) {
      var e;
      if (b && b.preventDefault && b.handleObj)
        return (
          (e = b.handleObj),
          l(b.delegateTarget).off(
            e.namespace ? e.origType + "." + e.namespace : e.origType,
            e.selector,
            e.handler
          ),
          this
        );
      if ("object" === typeof b) {
        for (e in b) this.off(e, c, b[e]);
        return this;
      }
      if (!1 === c || "function" === typeof c) (h = c), (c = void 0);
      !1 === h && (h = ca);
      return this.each(function () {
        l.event.remove(this, b, h, c);
      });
    },
  });
  var Tb = /<script|<style|<link/i,
    Kb = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Lb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  l.extend({
    htmlPrefilter: function (b) {
      return b;
    },
    clone: function (b, c, a) {
      var e,
        k,
        d,
        v,
        r = b.cloneNode(!0),
        g = La(b);
      if (
        !(
          h.noCloneChecked ||
          (1 !== b.nodeType && 11 !== b.nodeType) ||
          l.isXMLDoc(b)
        )
      )
        for (v = Z(r), d = Z(b), e = 0, k = d.length; e < k; e++) {
          var A = d[e],
            f = v[e],
            x = f.nodeName.toLowerCase();
          if ("input" === x && Qa.test(A.type)) f.checked = A.checked;
          else if ("input" === x || "textarea" === x)
            f.defaultValue = A.defaultValue;
        }
      if (c)
        if (a)
          for (d = d || Z(b), v = v || Z(r), e = 0, k = d.length; e < k; e++)
            sa(d[e], v[e]);
        else sa(b, r);
      v = Z(r, "script");
      0 < v.length && ma(v, !g && Z(b, "script"));
      return r;
    },
    cleanData: function (b) {
      for (var c, h, a, k = l.event.special, d = 0; void 0 !== (h = b[d]); d++)
        if (Pa(h)) {
          if ((c = h[M.expando])) {
            if (c.events)
              for (a in c.events)
                k[a] ? l.event.remove(h, a) : l.removeEvent(h, a, c.handle);
            h[M.expando] = void 0;
          }
          h[pa.expando] && (h[pa.expando] = void 0);
        }
    },
  });
  l.fn.extend({
    detach: function (b) {
      return ta(this, b, !0);
    },
    remove: function (b) {
      return ta(this, b);
    },
    text: function (b) {
      return Ia(
        this,
        function (b) {
          return void 0 === b
            ? l.text(this)
            : this.empty().each(function () {
                if (
                  1 === this.nodeType ||
                  11 === this.nodeType ||
                  9 === this.nodeType
                )
                  this.textContent = b;
              });
        },
        null,
        b,
        arguments.length
      );
    },
    append: function () {
      return R(this, arguments, function (b) {
        (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) ||
          G(this, b).appendChild(b);
      });
    },
    prepend: function () {
      return R(this, arguments, function (b) {
        if (
          1 === this.nodeType ||
          11 === this.nodeType ||
          9 === this.nodeType
        ) {
          var c = G(this, b);
          c.insertBefore(b, c.firstChild);
        }
      });
    },
    before: function () {
      return R(this, arguments, function (b) {
        this.parentNode && this.parentNode.insertBefore(b, this);
      });
    },
    after: function () {
      return R(this, arguments, function (b) {
        this.parentNode && this.parentNode.insertBefore(b, this.nextSibling);
      });
    },
    empty: function () {
      for (var b, c = 0; null != (b = this[c]); c++)
        1 === b.nodeType && (l.cleanData(Z(b, !1)), (b.textContent = ""));
      return this;
    },
    clone: function (b, c) {
      b = null == b ? !1 : b;
      c = null == c ? b : c;
      return this.map(function () {
        return l.clone(this, b, c);
      });
    },
    html: function (b) {
      return Ia(
        this,
        function (b) {
          var c = this[0] || {},
            e = 0,
            h = this.length;
          if (void 0 === b && 1 === c.nodeType) return c.innerHTML;
          if (
            "string" === typeof b &&
            !Tb.test(b) &&
            !wa[(gb.exec(b) || ["", ""])[1].toLowerCase()]
          ) {
            b = l.htmlPrefilter(b);
            try {
              for (; e < h; e++)
                (c = this[e] || {}),
                  1 === c.nodeType &&
                    (l.cleanData(Z(c, !1)), (c.innerHTML = b));
              c = 0;
            } catch (Na) {}
          }
          c && this.empty().append(b);
        },
        null,
        b,
        arguments.length
      );
    },
    replaceWith: function () {
      var b = [];
      return R(
        this,
        arguments,
        function (c) {
          var e = this.parentNode;
          0 > l.inArray(this, b) &&
            (l.cleanData(Z(this)), e && e.replaceChild(c, this));
        },
        b
      );
    },
  });
  l.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith",
    },
    function (b, c) {
      l.fn[b] = function (b) {
        for (var e = [], h = l(b), a = h.length - 1, k = 0; k <= a; k++)
          (b = k === a ? this : this.clone(!0)),
            l(h[k])[c](b),
            qa.apply(e, b.get());
        return this.pushStack(e);
      };
    }
  );
  var Za = new RegExp("^(" + rb + ")(?!px)[a-z%]+$", "i"),
    Va = function (b) {
      var c = b.ownerDocument.defaultView;
      (c && c.opener) || (c = a);
      return c.getComputedStyle(b);
    },
    tb = function (b, c, h) {
      var e,
        a = {};
      for (e in c) (a[e] = b.style[e]), (b.style[e] = c[e]);
      h = h.call(b);
      for (e in c) b.style[e] = a[e];
      return h;
    },
    Mb = new RegExp(Fa.join("|"), "i");
  (function () {
    function b() {
      if (x) {
        f.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
        x.style.cssText =
          "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
        Ka.appendChild(f).appendChild(x);
        var b = a.getComputedStyle(x);
        c = "1%" !== b.top;
        A = 12 === Math.round(parseFloat(b.marginLeft));
        x.style.right = "60%";
        r = 36 === Math.round(parseFloat(b.right));
        k = 36 === Math.round(parseFloat(b.width));
        x.style.position = "absolute";
        d = 12 === Math.round(parseFloat(x.offsetWidth / 3));
        Ka.removeChild(f);
        x = null;
      }
    }
    var c,
      k,
      d,
      r,
      g,
      A,
      f = W.createElement("div"),
      x = W.createElement("div");
    x.style &&
      ((x.style.backgroundClip = "content-box"),
      (x.cloneNode(!0).style.backgroundClip = ""),
      (h.clearCloneStyle = "content-box" === x.style.backgroundClip),
      l.extend(h, {
        boxSizingReliable: function () {
          b();
          return k;
        },
        pixelBoxStyles: function () {
          b();
          return r;
        },
        pixelPosition: function () {
          b();
          return c;
        },
        reliableMarginLeft: function () {
          b();
          return A;
        },
        scrollboxSize: function () {
          b();
          return d;
        },
        reliableTrDimensions: function () {
          var b, c, e;
          null == g &&
            ((b = W.createElement("table")),
            (c = W.createElement("tr")),
            (e = W.createElement("div")),
            (b.style.cssText =
              "position:absolute;left:-11111px;border-collapse:separate"),
            (c.style.cssText = "border:1px solid"),
            (c.style.height = "1px"),
            (e.style.height = "9px"),
            (e.style.display = "block"),
            Ka.appendChild(b).appendChild(c).appendChild(e),
            (e = a.getComputedStyle(c)),
            (g =
              parseInt(e.height, 10) +
                parseInt(e.borderTopWidth, 10) +
                parseInt(e.borderBottomWidth, 10) ===
              c.offsetHeight),
            Ka.removeChild(b));
          return g;
        },
      }));
  })();
  var kb = ["Webkit", "Moz", "ms"],
    jb = W.createElement("div").style,
    ib = {},
    Ub = /^(none|table(?!-c[ea]).+)/,
    ub = /^--/,
    Vb = { position: "absolute", visibility: "hidden", display: "block" },
    vb = { letterSpacing: "0", fontWeight: "400" };
  l.extend({
    cssHooks: {
      opacity: {
        get: function (b, c) {
          if (c) return (b = H(b, "opacity")), "" === b ? "1" : b;
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {},
    style: function (b, c, a, k) {
      if (b && 3 !== b.nodeType && 8 !== b.nodeType && b.style) {
        var e,
          d,
          v,
          r = Y(c),
          g = ub.test(c),
          A = b.style;
        g || (c = J(r));
        v = l.cssHooks[c] || l.cssHooks[r];
        if (void 0 !== a)
          (d = typeof a),
            "string" === d &&
              (e = Oa.exec(a)) &&
              e[1] &&
              ((a = aa(b, c, e)), (d = "number")),
            null != a &&
              a === a &&
              ("number" !== d ||
                g ||
                (a += (e && e[3]) || (l.cssNumber[r] ? "" : "px")),
              h.clearCloneStyle ||
                "" !== a ||
                0 !== c.indexOf("background") ||
                (A[c] = "inherit"),
              (v && "set" in v && void 0 === (a = v.set(b, a, k))) ||
                (g ? A.setProperty(c, a) : (A[c] = a)));
        else
          return v && "get" in v && void 0 !== (e = v.get(b, !1, k)) ? e : A[c];
      }
    },
    css: function (b, c, h, a) {
      var e, k;
      k = Y(c);
      ub.test(c) || (c = J(k));
      (k = l.cssHooks[c] || l.cssHooks[k]) &&
        "get" in k &&
        (e = k.get(b, !0, h));
      void 0 === e && (e = H(b, c, a));
      "normal" === e && c in vb && (e = vb[c]);
      return "" === h || h
        ? ((b = parseFloat(e)), !0 === h || isFinite(b) ? b || 0 : e)
        : e;
    },
  });
  l.each(["height", "width"], function (b, c) {
    l.cssHooks[c] = {
      get: function (b, e, h) {
        if (e)
          return !Ub.test(l.css(b, "display")) ||
            (b.getClientRects().length && b.getBoundingClientRect().width)
            ? ka(b, c, h)
            : tb(b, Vb, function () {
                return ka(b, c, h);
              });
      },
      set: function (b, e, a) {
        var k,
          d = Va(b),
          v = !h.scrollboxSize() && "absolute" === d.position,
          r = (v || a) && "border-box" === l.css(b, "boxSizing", !1, d);
        a = a ? Ea(b, c, a, r, d) : 0;
        r &&
          v &&
          (a -= Math.ceil(
            b["offset" + c[0].toUpperCase() + c.slice(1)] -
              parseFloat(d[c]) -
              Ea(b, c, "border", !1, d) -
              0.5
          ));
        a &&
          (k = Oa.exec(e)) &&
          "px" !== (k[3] || "px") &&
          ((b.style[c] = e), (e = l.css(b, c)));
        return Ba(b, e, a);
      },
    };
  });
  l.cssHooks.marginLeft = ya(h.reliableMarginLeft, function (b, c) {
    if (c)
      return (
        (parseFloat(H(b, "marginLeft")) ||
          b.getBoundingClientRect().left -
            tb(b, { marginLeft: 0 }, function () {
              return b.getBoundingClientRect().left;
            })) + "px"
      );
  });
  l.each({ margin: "", padding: "", border: "Width" }, function (b, c) {
    l.cssHooks[b + c] = {
      expand: function (e) {
        var h = 0,
          a = {};
        for (e = "string" === typeof e ? e.split(" ") : [e]; 4 > h; h++)
          a[b + Fa[h] + c] = e[h] || e[h - 2] || e[0];
        return a;
      },
    };
    "margin" !== b && (l.cssHooks[b + c].set = Ba);
  });
  l.fn.extend({
    css: function (b, c) {
      return Ia(
        this,
        function (b, c, e) {
          var h,
            a = {},
            k = 0;
          if (Array.isArray(c)) {
            e = Va(b);
            for (h = c.length; k < h; k++) a[c[k]] = l.css(b, c[k], !1, e);
            return a;
          }
          return void 0 !== e ? l.style(b, c, e) : l.css(b, c);
        },
        b,
        c,
        1 < arguments.length
      );
    },
  });
  l.Tween = Q;
  Q.prototype = {
    constructor: Q,
    init: function (b, c, h, a, k, d) {
      this.elem = b;
      this.prop = h;
      this.easing = k || l.easing._default;
      this.options = c;
      this.start = this.now = this.cur();
      this.end = a;
      this.unit = d || (l.cssNumber[h] ? "" : "px");
    },
    cur: function () {
      var b = Q.propHooks[this.prop];
      return b && b.get ? b.get(this) : Q.propHooks._default.get(this);
    },
    run: function (b) {
      var c,
        h = Q.propHooks[this.prop];
      this.pos = this.options.duration
        ? (c = l.easing[this.easing](
            b,
            this.options.duration * b,
            0,
            1,
            this.options.duration
          ))
        : (c = b);
      this.now = (this.end - this.start) * c + this.start;
      this.options.step && this.options.step.call(this.elem, this.now, this);
      h && h.set ? h.set(this) : Q.propHooks._default.set(this);
      return this;
    },
  };
  Q.prototype.init.prototype = Q.prototype;
  Q.propHooks = {
    _default: {
      get: function (b) {
        return 1 !== b.elem.nodeType ||
          (null != b.elem[b.prop] && null == b.elem.style[b.prop])
          ? b.elem[b.prop]
          : (b = l.css(b.elem, b.prop, "")) && "auto" !== b
          ? b
          : 0;
      },
      set: function (b) {
        if (l.fx.step[b.prop]) l.fx.step[b.prop](b);
        else
          1 !== b.elem.nodeType ||
          (!l.cssHooks[b.prop] && null == b.elem.style[J(b.prop)])
            ? (b.elem[b.prop] = b.now)
            : l.style(b.elem, b.prop, b.now + b.unit);
      },
    },
  };
  Q.propHooks.scrollTop = Q.propHooks.scrollLeft = {
    set: function (b) {
      b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now);
    },
  };
  l.easing = {
    linear: function (b) {
      return b;
    },
    swing: function (b) {
      return 0.5 - Math.cos(b * Math.PI) / 2;
    },
    _default: "swing",
  };
  l.fx = Q.prototype.init;
  l.fx.step = {};
  var Ma,
    Wa,
    Wb = /^(?:toggle|show|hide)$/,
    Xb = /queueHooks$/;
  l.Animation = l.extend(n, {
    tweeners: {
      "*": [
        function (b, c) {
          var e = this.createTween(b, c);
          aa(e.elem, b, Oa.exec(c), e);
          return e;
        },
      ],
    },
    tweener: function (b, c) {
      A(b) ? ((c = b), (b = ["*"])) : (b = b.match(Aa));
      for (var e, h = 0, a = b.length; h < a; h++)
        (e = b[h]),
          (n.tweeners[e] = n.tweeners[e] || []),
          n.tweeners[e].unshift(c);
    },
    prefilters: [
      function (b, c, h) {
        var e, a, k, d, r, g, v;
        v = "width" in c || "height" in c;
        var A = this,
          f = {},
          m = b.style,
          V = b.nodeType && Ua(b),
          n = M.get(b, "fxshow");
        h.queue ||
          ((d = l._queueHooks(b, "fx")),
          null == d.unqueued &&
            ((d.unqueued = 0),
            (r = d.empty.fire),
            (d.empty.fire = function () {
              d.unqueued || r();
            })),
          d.unqueued++,
          A.always(function () {
            A.always(function () {
              d.unqueued--;
              l.queue(b, "fx").length || d.empty.fire();
            });
          }));
        for (e in c)
          if (((a = c[e]), Wb.test(a))) {
            delete c[e];
            k = k || "toggle" === a;
            if (a === (V ? "hide" : "show"))
              if ("show" === a && n && void 0 !== n[e]) V = !0;
              else continue;
            f[e] = (n && n[e]) || l.style(b, e);
          }
        if ((c = !l.isEmptyObject(c)) || !l.isEmptyObject(f))
          for (e in (v &&
            1 === b.nodeType &&
            ((h.overflow = [m.overflow, m.overflowX, m.overflowY]),
            (g = n && n.display),
            null == g && (g = M.get(b, "display")),
            (v = l.css(b, "display")),
            "none" === v &&
              (g
                ? (v = g)
                : (T([b], !0),
                  (g = b.style.display || g),
                  (v = l.css(b, "display")),
                  T([b]))),
            ("inline" === v || ("inline-block" === v && null != g)) &&
              "none" === l.css(b, "float") &&
              (c ||
                (A.done(function () {
                  m.display = g;
                }),
                null == g && ((v = m.display), (g = "none" === v ? "" : v))),
              (m.display = "inline-block"))),
          h.overflow &&
            ((m.overflow = "hidden"),
            A.always(function () {
              m.overflow = h.overflow[0];
              m.overflowX = h.overflow[1];
              m.overflowY = h.overflow[2];
            })),
          (c = !1),
          f))
            c ||
              (n
                ? "hidden" in n && (V = n.hidden)
                : (n = M.access(b, "fxshow", { display: g })),
              k && (n.hidden = !V),
              V && T([b], !0),
              A.done(function () {
                V || T([b]);
                M.remove(b, "fxshow");
                for (e in f) l.style(b, e, f[e]);
              })),
              (c = x(V ? n[e] : 0, e, A)),
              e in n ||
                ((n[e] = c.start), V && ((c.end = c.start), (c.start = 0)));
      },
    ],
    prefilter: function (b, c) {
      c ? n.prefilters.unshift(b) : n.prefilters.push(b);
    },
  });
  l.speed = function (b, c, h) {
    var e =
      b && "object" === typeof b
        ? l.extend({}, b)
        : {
            complete: h || (!h && c) || (A(b) && b),
            duration: b,
            easing: (h && c) || (c && !A(c) && c),
          };
    l.fx.off
      ? (e.duration = 0)
      : "number" !== typeof e.duration &&
        (e.duration =
          e.duration in l.fx.speeds
            ? l.fx.speeds[e.duration]
            : l.fx.speeds._default);
    if (null == e.queue || !0 === e.queue) e.queue = "fx";
    e.old = e.complete;
    e.complete = function () {
      A(e.old) && e.old.call(this);
      e.queue && l.dequeue(this, e.queue);
    };
    return e;
  };
  l.fn.extend({
    fadeTo: function (b, c, h, a) {
      return this.filter(Ua)
        .css("opacity", 0)
        .show()
        .end()
        .animate({ opacity: c }, b, h, a);
    },
    animate: function (b, c, h, a) {
      var e = l.isEmptyObject(b),
        k = l.speed(c, h, a);
      c = function () {
        var c = n(this, l.extend({}, b), k);
        (e || M.get(this, "finish")) && c.stop(!0);
      };
      c.finish = c;
      return e || !1 === k.queue ? this.each(c) : this.queue(k.queue, c);
    },
    stop: function (b, c, h) {
      var e = function (b) {
        var c = b.stop;
        delete b.stop;
        c(h);
      };
      "string" !== typeof b && ((h = c), (c = b), (b = void 0));
      c && this.queue(b || "fx", []);
      return this.each(function () {
        var c = !0,
          a = null != b && b + "queueHooks",
          k = l.timers,
          d = M.get(this);
        if (a) d[a] && d[a].stop && e(d[a]);
        else for (a in d) d[a] && d[a].stop && Xb.test(a) && e(d[a]);
        for (a = k.length; a--; )
          k[a].elem !== this ||
            (null != b && k[a].queue !== b) ||
            (k[a].anim.stop(h), (c = !1), k.splice(a, 1));
        (!c && h) || l.dequeue(this, b);
      });
    },
    finish: function (b) {
      !1 !== b && (b = b || "fx");
      return this.each(function () {
        var c,
          h = M.get(this),
          a = h[b + "queue"];
        c = h[b + "queueHooks"];
        var k = l.timers,
          d = a ? a.length : 0;
        h.finish = !0;
        l.queue(this, b, []);
        c && c.stop && c.stop.call(this, !0);
        for (c = k.length; c--; )
          k[c].elem === this &&
            k[c].queue === b &&
            (k[c].anim.stop(!0), k.splice(c, 1));
        for (c = 0; c < d; c++) a[c] && a[c].finish && a[c].finish.call(this);
        delete h.finish;
      });
    },
  });
  l.each(["toggle", "show", "hide"], function (b, c) {
    var e = l.fn[c];
    l.fn[c] = function (b, h, a) {
      return null == b || "boolean" === typeof b
        ? e.apply(this, arguments)
        : this.animate(L(c, !0), b, h, a);
    };
  });
  l.each(
    {
      slideDown: L("show"),
      slideUp: L("hide"),
      slideToggle: L("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" },
    },
    function (b, c) {
      l.fn[b] = function (b, e, h) {
        return this.animate(c, b, e, h);
      };
    }
  );
  l.timers = [];
  l.fx.tick = function () {
    var b,
      c = 0,
      h = l.timers;
    for (Ma = Date.now(); c < h.length; c++)
      (b = h[c]), b() || h[c] !== b || h.splice(c--, 1);
    h.length || l.fx.stop();
    Ma = void 0;
  };
  l.fx.timer = function (b) {
    l.timers.push(b);
    l.fx.start();
  };
  l.fx.interval = 13;
  l.fx.start = function () {
    Wa || ((Wa = !0), xa());
  };
  l.fx.stop = function () {
    Wa = null;
  };
  l.fx.speeds = { slow: 600, fast: 200, _default: 400 };
  l.fn.delay = function (b, c) {
    b = l.fx ? l.fx.speeds[b] || b : b;
    return this.queue(c || "fx", function (c, e) {
      var h = a.setTimeout(c, b);
      e.stop = function () {
        a.clearTimeout(h);
      };
    });
  };
  (function () {
    var b = W.createElement("input"),
      c = W.createElement("select").appendChild(W.createElement("option"));
    b.type = "checkbox";
    h.checkOn = "" !== b.value;
    h.optSelected = c.selected;
    b = W.createElement("input");
    b.value = "t";
    b.type = "radio";
    h.radioValue = "t" === b.value;
  })();
  var wb,
    Ra = l.expr.attrHandle;
  l.fn.extend({
    attr: function (b, c) {
      return Ia(this, l.attr, b, c, 1 < arguments.length);
    },
    removeAttr: function (b) {
      return this.each(function () {
        l.removeAttr(this, b);
      });
    },
  });
  l.extend({
    attr: function (b, c, h) {
      var e,
        a,
        k = b.nodeType;
      if (3 !== k && 8 !== k && 2 !== k) {
        if ("undefined" === typeof b.getAttribute) return l.prop(b, c, h);
        (1 === k && l.isXMLDoc(b)) ||
          (a =
            l.attrHooks[c.toLowerCase()] ||
            (l.expr.match.bool.test(c) ? wb : void 0));
        if (void 0 !== h) {
          if (null === h) {
            l.removeAttr(b, c);
            return;
          }
          if (a && "set" in a && void 0 !== (e = a.set(b, h, c))) return e;
          b.setAttribute(c, h + "");
          return h;
        }
        if (a && "get" in a && null !== (e = a.get(b, c))) return e;
        e = l.find.attr(b, c);
        return null == e ? void 0 : e;
      }
    },
    attrHooks: {
      type: {
        set: function (b, c) {
          if (!h.radioValue && "radio" === c && p(b, "input")) {
            var e = b.value;
            b.setAttribute("type", c);
            e && (b.value = e);
            return c;
          }
        },
      },
    },
    removeAttr: function (b, c) {
      var e = 0,
        h = c && c.match(Aa);
      if (h && 1 === b.nodeType) for (; (c = h[e++]); ) b.removeAttribute(c);
    },
  });
  wb = {
    set: function (b, c, h) {
      !1 === c ? l.removeAttr(b, h) : b.setAttribute(h, h);
      return h;
    },
  };
  l.each(l.expr.match.bool.source.match(/\w+/g), function (b, c) {
    var e = Ra[c] || l.find.attr;
    Ra[c] = function (b, c, h) {
      var a,
        l,
        k = c.toLowerCase();
      h ||
        ((l = Ra[k]),
        (Ra[k] = a),
        (a = null != e(b, c, h) ? k : null),
        (Ra[k] = l));
      return a;
    };
  });
  var Yb = /^(?:input|select|textarea|button)$/i,
    Zb = /^(?:a|area)$/i;
  l.fn.extend({
    prop: function (b, c) {
      return Ia(this, l.prop, b, c, 1 < arguments.length);
    },
    removeProp: function (b) {
      return this.each(function () {
        delete this[l.propFix[b] || b];
      });
    },
  });
  l.extend({
    prop: function (b, c, h) {
      var e,
        a,
        k = b.nodeType;
      if (3 !== k && 8 !== k && 2 !== k)
        return (
          (1 === k && l.isXMLDoc(b)) ||
            ((c = l.propFix[c] || c), (a = l.propHooks[c])),
          void 0 !== h
            ? a && "set" in a && void 0 !== (e = a.set(b, h, c))
              ? e
              : (b[c] = h)
            : a && "get" in a && null !== (e = a.get(b, c))
            ? e
            : b[c]
        );
    },
    propHooks: {
      tabIndex: {
        get: function (b) {
          var c = l.find.attr(b, "tabindex");
          return c
            ? parseInt(c, 10)
            : Yb.test(b.nodeName) || (Zb.test(b.nodeName) && b.href)
            ? 0
            : -1;
        },
      },
    },
    propFix: { for: "htmlFor", class: "className" },
  });
  h.optSelected ||
    (l.propHooks.selected = {
      get: function (b) {
        (b = b.parentNode) && b.parentNode && b.parentNode.selectedIndex;
        return null;
      },
      set: function (b) {
        if ((b = b.parentNode))
          b.selectedIndex, b.parentNode && b.parentNode.selectedIndex;
      },
    });
  l.each(
    "tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(
      " "
    ),
    function () {
      l.propFix[this.toLowerCase()] = this;
    }
  );
  l.fn.extend({
    addClass: function (b) {
      var c,
        h,
        a,
        k,
        d,
        g,
        r = 0;
      if (A(b))
        return this.each(function (c) {
          l(this).addClass(b.call(this, c, la(this)));
        });
      c = fa(b);
      if (c.length)
        for (; (h = this[r++]); )
          if (((k = la(h)), (a = 1 === h.nodeType && " " + ha(k) + " "))) {
            for (g = 0; (d = c[g++]); )
              0 > a.indexOf(" " + d + " ") && (a += d + " ");
            a = ha(a);
            k !== a && h.setAttribute("class", a);
          }
      return this;
    },
    removeClass: function (b) {
      var c,
        h,
        a,
        k,
        d,
        g,
        r = 0;
      if (A(b))
        return this.each(function (c) {
          l(this).removeClass(b.call(this, c, la(this)));
        });
      if (!arguments.length) return this.attr("class", "");
      c = fa(b);
      if (c.length)
        for (; (h = this[r++]); )
          if (((k = la(h)), (a = 1 === h.nodeType && " " + ha(k) + " "))) {
            for (g = 0; (d = c[g++]); )
              for (; -1 < a.indexOf(" " + d + " "); )
                a = a.replace(" " + d + " ", " ");
            a = ha(a);
            k !== a && h.setAttribute("class", a);
          }
      return this;
    },
    toggleClass: function (b, c) {
      var e = typeof b,
        h = "string" === e || Array.isArray(b);
      return "boolean" === typeof c && h
        ? c
          ? this.addClass(b)
          : this.removeClass(b)
        : A(b)
        ? this.each(function (e) {
            l(this).toggleClass(b.call(this, e, la(this), c), c);
          })
        : this.each(function () {
            var c, a, k, d;
            if (h)
              for (a = 0, k = l(this), d = fa(b); (c = d[a++]); )
                k.hasClass(c) ? k.removeClass(c) : k.addClass(c);
            else if (void 0 === b || "boolean" === e)
              (c = la(this)) && M.set(this, "__className__", c),
                this.setAttribute &&
                  this.setAttribute(
                    "class",
                    c || !1 === b ? "" : M.get(this, "__className__") || ""
                  );
          });
    },
    hasClass: function (b) {
      var c,
        h = 0;
      for (b = " " + b + " "; (c = this[h++]); )
        if (1 === c.nodeType && -1 < (" " + ha(la(c)) + " ").indexOf(b))
          return !0;
      return !1;
    },
  });
  var $b = /\r/g;
  l.fn.extend({
    val: function (b) {
      var c,
        h,
        a,
        k = this[0];
      if (arguments.length)
        return (
          (a = A(b)),
          this.each(function (e) {
            1 === this.nodeType &&
              ((e = a ? b.call(this, e, l(this).val()) : b),
              null == e
                ? (e = "")
                : "number" === typeof e
                ? (e += "")
                : Array.isArray(e) &&
                  (e = l.map(e, function (b) {
                    return null == b ? "" : b + "";
                  })),
              (c =
                l.valHooks[this.type] ||
                l.valHooks[this.nodeName.toLowerCase()]),
              (c && "set" in c && void 0 !== c.set(this, e, "value")) ||
                (this.value = e));
          })
        );
      if (k) {
        if (
          (c = l.valHooks[k.type] || l.valHooks[k.nodeName.toLowerCase()]) &&
          "get" in c &&
          void 0 !== (h = c.get(k, "value"))
        )
          return h;
        h = k.value;
        return "string" === typeof h ? h.replace($b, "") : null == h ? "" : h;
      }
    },
  });
  l.extend({
    valHooks: {
      option: {
        get: function (b) {
          var c = l.find.attr(b, "value");
          return null != c ? c : ha(l.text(b));
        },
      },
      select: {
        get: function (b) {
          var c,
            h = b.options,
            a = b.selectedIndex,
            k = "select-one" === b.type,
            d = k ? null : [],
            g = k ? a + 1 : h.length;
          for (b = 0 > a ? g : k ? a : 0; b < g; b++)
            if (
              ((c = h[b]),
              !(
                (!c.selected && b !== a) ||
                c.disabled ||
                (c.parentNode.disabled && p(c.parentNode, "optgroup"))
              ))
            ) {
              c = l(c).val();
              if (k) return c;
              d.push(c);
            }
          return d;
        },
        set: function (b, c) {
          for (var e, h = b.options, a = l.makeArray(c), k = h.length; k--; )
            if (
              ((c = h[k]),
              (c.selected = -1 < l.inArray(l.valHooks.option.get(c), a)))
            )
              e = !0;
          e || (b.selectedIndex = -1);
          return a;
        },
      },
    },
  });
  l.each(["radio", "checkbox"], function () {
    l.valHooks[this] = {
      set: function (b, c) {
        if (Array.isArray(c))
          return (b.checked = -1 < l.inArray(l(b).val(), c));
      },
    };
    h.checkOn ||
      (l.valHooks[this].get = function (b) {
        return null === b.getAttribute("value") ? "on" : b.value;
      });
  });
  h.focusin = "onfocusin" in a;
  var xb = /^(?:focusinfocus|focusoutblur)$/,
    yb = function (b) {
      b.stopPropagation();
    };
  l.extend(l.event, {
    trigger: function (b, c, h, k) {
      var e,
        d,
        g,
        r,
        v,
        f,
        x,
        m = [h || W],
        n = na.call(b, "type") ? b.type : b;
      f = na.call(b, "namespace") ? b.namespace.split(".") : [];
      d = x = e = h = h || W;
      if (
        3 !== h.nodeType &&
        8 !== h.nodeType &&
        !xb.test(n + l.event.triggered) &&
        (-1 < n.indexOf(".") && ((f = n.split(".")), (n = f.shift()), f.sort()),
        (r = 0 > n.indexOf(":") && "on" + n),
        (b = b[l.expando] ? b : new l.Event(n, "object" === typeof b && b)),
        (b.isTrigger = k ? 2 : 3),
        (b.namespace = f.join(".")),
        (b.rnamespace = b.namespace
          ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)")
          : null),
        (b.result = void 0),
        b.target || (b.target = h),
        (c = null == c ? [b] : l.makeArray(c, [b])),
        (f = l.event.special[n] || {}),
        k || !f.trigger || !1 !== f.trigger.apply(h, c))
      ) {
        if (!k && !f.noBubble && !Ca(h)) {
          g = f.delegateType || n;
          xb.test(g + n) || (d = d.parentNode);
          for (; d; d = d.parentNode) m.push(d), (e = d);
          e === (h.ownerDocument || W) &&
            m.push(e.defaultView || e.parentWindow || a);
        }
        for (e = 0; (d = m[e++]) && !b.isPropagationStopped(); )
          (x = d),
            (b.type = 1 < e ? g : f.bindType || n),
            (v =
              (M.get(d, "events") || Object.create(null))[b.type] &&
              M.get(d, "handle")) && v.apply(d, c),
            (v = r && d[r]) &&
              v.apply &&
              Pa(d) &&
              ((b.result = v.apply(d, c)),
              !1 === b.result && b.preventDefault());
        b.type = n;
        k ||
          b.isDefaultPrevented() ||
          (f._default && !1 !== f._default.apply(m.pop(), c)) ||
          !Pa(h) ||
          !r ||
          !A(h[n]) ||
          Ca(h) ||
          ((e = h[r]) && (h[r] = null),
          (l.event.triggered = n),
          b.isPropagationStopped() && x.addEventListener(n, yb),
          h[n](),
          b.isPropagationStopped() && x.removeEventListener(n, yb),
          (l.event.triggered = void 0),
          e && (h[r] = e));
        return b.result;
      }
    },
    simulate: function (b, c, h) {
      b = l.extend(new l.Event(), h, { type: b, isSimulated: !0 });
      l.event.trigger(b, null, c);
    },
  });
  l.fn.extend({
    trigger: function (b, c) {
      return this.each(function () {
        l.event.trigger(b, c, this);
      });
    },
    triggerHandler: function (b, c) {
      var e = this[0];
      if (e) return l.event.trigger(b, c, e, !0);
    },
  });
  h.focusin ||
    l.each({ focus: "focusin", blur: "focusout" }, function (b, c) {
      var e = function (b) {
        l.event.simulate(c, b.target, l.event.fix(b));
      };
      l.event.special[c] = {
        setup: function () {
          var h = this.ownerDocument || this.document || this,
            a = M.access(h, c);
          a || h.addEventListener(b, e, !0);
          M.access(h, c, (a || 0) + 1);
        },
        teardown: function () {
          var h = this.ownerDocument || this.document || this,
            a = M.access(h, c) - 1;
          a
            ? M.access(h, c, a)
            : (h.removeEventListener(b, e, !0), M.remove(h, c));
        },
      };
    });
  var Sa = a.location,
    zb = Date.now(),
    cb = /\?/;
  l.parseXML = function (b) {
    var c, h;
    if (!b || "string" !== typeof b) return null;
    try {
      c = new a.DOMParser().parseFromString(b, "text/xml");
    } catch (z) {}
    h = c && c.getElementsByTagName("parsererror")[0];
    (c && !h) ||
      l.error(
        "Invalid XML: " +
          (h
            ? l
                .map(h.childNodes, function (b) {
                  return b.textContent;
                })
                .join("\n")
            : b)
      );
    return c;
  };
  var Nb = /\[\]$/,
    Ab = /\r?\n/g,
    ac = /^(?:submit|button|image|reset|file)$/i,
    bc = /^(?:input|select|textarea|keygen)/i;
  l.param = function (b, c) {
    var e,
      h = [],
      a = function (b, c) {
        c = A(c) ? c() : c;
        h[h.length] =
          encodeURIComponent(b) +
          "\x3d" +
          encodeURIComponent(null == c ? "" : c);
      };
    if (null == b) return "";
    if (Array.isArray(b) || (b.jquery && !l.isPlainObject(b)))
      l.each(b, function () {
        a(this.name, this.value);
      });
    else for (e in b) ba(e, b[e], c, a);
    return h.join("\x26");
  };
  l.fn.extend({
    serialize: function () {
      return l.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var b = l.prop(this, "elements");
        return b ? l.makeArray(b) : this;
      })
        .filter(function () {
          var b = this.type;
          return (
            this.name &&
            !l(this).is(":disabled") &&
            bc.test(this.nodeName) &&
            !ac.test(b) &&
            (this.checked || !Qa.test(b))
          );
        })
        .map(function (b, c) {
          b = l(this).val();
          return null == b
            ? null
            : Array.isArray(b)
            ? l.map(b, function (b) {
                return { name: c.name, value: b.replace(Ab, "\r\n") };
              })
            : { name: c.name, value: b.replace(Ab, "\r\n") };
        })
        .get();
    },
  });
  var cc = /%20/g,
    dc = /#.*$/,
    ec = /([?&])_=[^&]*/,
    fc = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    gc = /^(?:GET|HEAD)$/,
    hc = /^\/\//,
    Bb = {},
    $a = {},
    Cb = "*/".concat("*"),
    db = W.createElement("a");
  db.href = Sa.href;
  l.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Sa.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
        Sa.protocol
      ),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
      accepts: {
        "*": Cb,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
      },
      contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON",
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": JSON.parse,
        "text xml": l.parseXML,
      },
      flatOptions: { url: !0, context: !0 },
    },
    ajaxSetup: function (b, c) {
      return c ? ia(ia(b, l.ajaxSettings), c) : ia(l.ajaxSettings, b);
    },
    ajaxPrefilter: Ga(Bb),
    ajaxTransport: Ga($a),
    ajax: function (b, c) {
      function e(b, c, e, r) {
        var v,
          m,
          L,
          u = c;
        if (!f) {
          f = !0;
          A && a.clearTimeout(A);
          h = void 0;
          g = r || "";
          p.readyState = 0 < b ? 4 : 0;
          r = (200 <= b && 300 > b) || 304 === b;
          e && (L = ua(n, p, e));
          !r &&
            -1 < l.inArray("script", n.dataTypes) &&
            0 > l.inArray("json", n.dataTypes) &&
            (n.converters["text script"] = function () {});
          L = k(n, L, p, r);
          if (r)
            n.ifModified &&
              ((e = p.getResponseHeader("Last-Modified")) &&
                (l.lastModified[d] = e),
              (e = p.getResponseHeader("etag")) && (l.etag[d] = e)),
              204 === b || "HEAD" === n.type
                ? (u = "nocontent")
                : 304 === b
                ? (u = "notmodified")
                : ((u = L.state), (v = L.data), (m = L.error), (r = !m));
          else if (((m = u), b || !u)) (u = "error"), 0 > b && (b = 0);
          p.status = b;
          p.statusText = (c || u) + "";
          r ? na.resolveWith(V, [v, u, p]) : na.rejectWith(V, [p, u, m]);
          p.statusCode(U);
          U = void 0;
          x && N.trigger(r ? "ajaxSuccess" : "ajaxError", [p, n, r ? v : m]);
          da.fireWith(V, [p, u]);
          x &&
            (N.trigger("ajaxComplete", [p, n]),
            --l.active || l.event.trigger("ajaxStop"));
        }
      }
      "object" === typeof b && ((c = b), (b = void 0));
      c = c || {};
      var h,
        d,
        g,
        r,
        A,
        f,
        x,
        m,
        n = l.ajaxSetup({}, c),
        V = n.context || n,
        N = n.context && (V.nodeType || V.jquery) ? l(V) : l.event,
        na = l.Deferred(),
        da = l.Callbacks("once memory"),
        U = n.statusCode || {},
        L = {},
        u = {},
        P = "canceled",
        p = {
          readyState: 0,
          getResponseHeader: function (b) {
            var c;
            if (f) {
              if (!r)
                for (r = {}; (c = fc.exec(g)); )
                  r[c[1].toLowerCase() + " "] = (
                    r[c[1].toLowerCase() + " "] || []
                  ).concat(c[2]);
              c = r[b.toLowerCase() + " "];
            }
            return null == c ? null : c.join(", ");
          },
          getAllResponseHeaders: function () {
            return f ? g : null;
          },
          setRequestHeader: function (b, c) {
            null == f &&
              ((b = u[b.toLowerCase()] = u[b.toLowerCase()] || b), (L[b] = c));
            return this;
          },
          overrideMimeType: function (b) {
            null == f && (n.mimeType = b);
            return this;
          },
          statusCode: function (b) {
            var c;
            if (b)
              if (f) p.always(b[p.status]);
              else for (c in b) U[c] = [U[c], b[c]];
            return this;
          },
          abort: function (b) {
            b = b || P;
            h && h.abort(b);
            e(0, b);
            return this;
          },
        };
      na.promise(p);
      n.url = ((b || n.url || Sa.href) + "").replace(hc, Sa.protocol + "//");
      n.type = c.method || c.type || n.method || n.type;
      n.dataTypes = (n.dataType || "*").toLowerCase().match(Aa) || [""];
      if (null == n.crossDomain) {
        b = W.createElement("a");
        try {
          (b.href = n.url),
            (b.href = b.href),
            (n.crossDomain =
              db.protocol + "//" + db.host !== b.protocol + "//" + b.host);
        } catch (ab) {
          n.crossDomain = !0;
        }
      }
      n.data &&
        n.processData &&
        "string" !== typeof n.data &&
        (n.data = l.param(n.data, n.traditional));
      za(Bb, n, c, p);
      if (f) return p;
      (x = l.event && n.global) &&
        0 === l.active++ &&
        l.event.trigger("ajaxStart");
      n.type = n.type.toUpperCase();
      n.hasContent = !gc.test(n.type);
      d = n.url.replace(dc, "");
      n.hasContent
        ? n.data &&
          n.processData &&
          0 ===
            (n.contentType || "").indexOf(
              "application/x-www-form-urlencoded"
            ) &&
          (n.data = n.data.replace(cc, "+"))
        : ((b = n.url.slice(d.length)),
          n.data &&
            (n.processData || "string" === typeof n.data) &&
            ((d += (cb.test(d) ? "\x26" : "?") + n.data), delete n.data),
          !1 === n.cache &&
            ((d = d.replace(ec, "$1")),
            (b = (cb.test(d) ? "\x26" : "?") + "_\x3d" + zb++ + b)),
          (n.url = d + b));
      n.ifModified &&
        (l.lastModified[d] &&
          p.setRequestHeader("If-Modified-Since", l.lastModified[d]),
        l.etag[d] && p.setRequestHeader("If-None-Match", l.etag[d]));
      ((n.data && n.hasContent && !1 !== n.contentType) || c.contentType) &&
        p.setRequestHeader("Content-Type", n.contentType);
      p.setRequestHeader(
        "Accept",
        n.dataTypes[0] && n.accepts[n.dataTypes[0]]
          ? n.accepts[n.dataTypes[0]] +
              ("*" !== n.dataTypes[0] ? ", " + Cb + "; q\x3d0.01" : "")
          : n.accepts["*"]
      );
      for (m in n.headers) p.setRequestHeader(m, n.headers[m]);
      if (n.beforeSend && (!1 === n.beforeSend.call(V, p, n) || f))
        return p.abort();
      P = "abort";
      da.add(n.complete);
      p.done(n.success);
      p.fail(n.error);
      if ((h = za($a, n, c, p))) {
        p.readyState = 1;
        x && N.trigger("ajaxSend", [p, n]);
        if (f) return p;
        n.async &&
          0 < n.timeout &&
          (A = a.setTimeout(function () {
            p.abort("timeout");
          }, n.timeout));
        try {
          (f = !1), h.send(L, e);
        } catch (ab) {
          if (f) throw ab;
          e(-1, ab);
        }
      } else e(-1, "No Transport");
      return p;
    },
    getJSON: function (b, c, h) {
      return l.get(b, c, h, "json");
    },
    getScript: function (b, c) {
      return l.get(b, void 0, c, "script");
    },
  });
  l.each(["get", "post"], function (b, c) {
    l[c] = function (b, e, h, a) {
      A(e) && ((a = a || h), (h = e), (e = void 0));
      return l.ajax(
        l.extend(
          { url: b, type: c, dataType: a, data: e, success: h },
          l.isPlainObject(b) && b
        )
      );
    };
  });
  l.ajaxPrefilter(function (b) {
    for (var c in b.headers)
      "content-type" === c.toLowerCase() &&
        (b.contentType = b.headers[c] || "");
  });
  l._evalUrl = function (b, c, h) {
    return l.ajax({
      url: b,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      converters: { "text script": function () {} },
      dataFilter: function (b) {
        l.globalEval(b, c, h);
      },
    });
  };
  l.fn.extend({
    wrapAll: function (b) {
      this[0] &&
        (A(b) && (b = b.call(this[0])),
        (b = l(b, this[0].ownerDocument).eq(0).clone(!0)),
        this[0].parentNode && b.insertBefore(this[0]),
        b
          .map(function () {
            for (var b = this; b.firstElementChild; ) b = b.firstElementChild;
            return b;
          })
          .append(this));
      return this;
    },
    wrapInner: function (b) {
      return A(b)
        ? this.each(function (c) {
            l(this).wrapInner(b.call(this, c));
          })
        : this.each(function () {
            var c = l(this),
              h = c.contents();
            h.length ? h.wrapAll(b) : c.append(b);
          });
    },
    wrap: function (b) {
      var c = A(b);
      return this.each(function (h) {
        l(this).wrapAll(c ? b.call(this, h) : b);
      });
    },
    unwrap: function (b) {
      this.parent(b)
        .not("body")
        .each(function () {
          l(this).replaceWith(this.childNodes);
        });
      return this;
    },
  });
  l.expr.pseudos.hidden = function (b) {
    return !l.expr.pseudos.visible(b);
  };
  l.expr.pseudos.visible = function (b) {
    return !!(b.offsetWidth || b.offsetHeight || b.getClientRects().length);
  };
  l.ajaxSettings.xhr = function () {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  };
  var ic = { 0: 200, 1223: 204 },
    Ta = l.ajaxSettings.xhr();
  h.cors = !!Ta && "withCredentials" in Ta;
  h.ajax = Ta = !!Ta;
  l.ajaxTransport(function (b) {
    var c, k;
    if (h.cors || (Ta && !b.crossDomain))
      return {
        send: function (h, e) {
          var l,
            d = b.xhr();
          d.open(b.type, b.url, b.async, b.username, b.password);
          if (b.xhrFields) for (l in b.xhrFields) d[l] = b.xhrFields[l];
          b.mimeType && d.overrideMimeType && d.overrideMimeType(b.mimeType);
          b.crossDomain ||
            h["X-Requested-With"] ||
            (h["X-Requested-With"] = "XMLHttpRequest");
          for (l in h) d.setRequestHeader(l, h[l]);
          c = function (b) {
            return function () {
              c &&
                ((c =
                  k =
                  d.onload =
                  d.onerror =
                  d.onabort =
                  d.ontimeout =
                  d.onreadystatechange =
                    null),
                "abort" === b
                  ? d.abort()
                  : "error" === b
                  ? "number" !== typeof d.status
                    ? e(0, "error")
                    : e(d.status, d.statusText)
                  : e(
                      ic[d.status] || d.status,
                      d.statusText,
                      "text" !== (d.responseType || "text") ||
                        "string" !== typeof d.responseText
                        ? { binary: d.response }
                        : { text: d.responseText },
                      d.getAllResponseHeaders()
                    ));
            };
          };
          d.onload = c();
          k = d.onerror = d.ontimeout = c("error");
          void 0 !== d.onabort
            ? (d.onabort = k)
            : (d.onreadystatechange = function () {
                4 === d.readyState &&
                  a.setTimeout(function () {
                    c && k();
                  });
              });
          c = c("abort");
          try {
            d.send((b.hasContent && b.data) || null);
          } catch (Ib) {
            if (c) throw Ib;
          }
        },
        abort: function () {
          c && c();
        },
      };
  });
  l.ajaxPrefilter(function (b) {
    b.crossDomain && (b.contents.script = !1);
  });
  l.ajaxSetup({
    accepts: {
      script:
        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
    },
    contents: { script: /\b(?:java|ecma)script\b/ },
    converters: {
      "text script": function (b) {
        l.globalEval(b);
        return b;
      },
    },
  });
  l.ajaxPrefilter("script", function (b) {
    void 0 === b.cache && (b.cache = !1);
    b.crossDomain && (b.type = "GET");
  });
  l.ajaxTransport("script", function (b) {
    if (b.crossDomain || b.scriptAttrs) {
      var c, h;
      return {
        send: function (e, a) {
          c = l("\x3cscript\x3e")
            .attr(b.scriptAttrs || {})
            .prop({ charset: b.scriptCharset, src: b.url })
            .on(
              "load error",
              (h = function (b) {
                c.remove();
                h = null;
                b && a("error" === b.type ? 404 : 200, b.type);
              })
            );
          W.head.appendChild(c[0]);
        },
        abort: function () {
          h && h();
        },
      };
    }
  });
  var Db = [],
    eb = /(=)\?(?=&|$)|\?\?/;
  l.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var b = Db.pop() || l.expando + "_" + zb++;
      this[b] = !0;
      return b;
    },
  });
  l.ajaxPrefilter("json jsonp", function (b, c, h) {
    var e,
      k,
      d,
      r =
        !1 !== b.jsonp &&
        (eb.test(b.url)
          ? "url"
          : "string" === typeof b.data &&
            0 ===
              (b.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            eb.test(b.data) &&
            "data");
    if (r || "jsonp" === b.dataTypes[0])
      return (
        (e = b.jsonpCallback =
          A(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback),
        r
          ? (b[r] = b[r].replace(eb, "$1" + e))
          : !1 !== b.jsonp &&
            (b.url += (cb.test(b.url) ? "\x26" : "?") + b.jsonp + "\x3d" + e),
        (b.converters["script json"] = function () {
          d || l.error(e + " was not called");
          return d[0];
        }),
        (b.dataTypes[0] = "json"),
        (k = a[e]),
        (a[e] = function () {
          d = arguments;
        }),
        h.always(function () {
          void 0 === k ? l(a).removeProp(e) : (a[e] = k);
          b[e] && ((b.jsonpCallback = c.jsonpCallback), Db.push(e));
          d && A(k) && k(d[0]);
          d = k = void 0;
        }),
        "script"
      );
  });
  h.createHTMLDocument = (function () {
    var b = W.implementation.createHTMLDocument("").body;
    b.innerHTML = "\x3cform\x3e\x3c/form\x3e\x3cform\x3e\x3c/form\x3e";
    return 2 === b.childNodes.length;
  })();
  l.parseHTML = function (b, c, a) {
    if ("string" !== typeof b) return [];
    "boolean" === typeof c && ((a = c), (c = !1));
    var e;
    c ||
      (h.createHTMLDocument
        ? ((c = W.implementation.createHTMLDocument("")),
          (e = c.createElement("base")),
          (e.href = W.location.href),
          c.head.appendChild(e))
        : (c = W));
    e = pb.exec(b);
    a = !a && [];
    if (e) return [c.createElement(e[1])];
    e = ea([b], c, a);
    a && a.length && l(a).remove();
    return l.merge([], e.childNodes);
  };
  l.fn.load = function (b, c, h) {
    var e,
      a,
      k,
      d = this,
      r = b.indexOf(" ");
    -1 < r && ((e = ha(b.slice(r))), (b = b.slice(0, r)));
    A(c) ? ((h = c), (c = void 0)) : c && "object" === typeof c && (a = "POST");
    0 < d.length &&
      l
        .ajax({ url: b, type: a || "GET", dataType: "html", data: c })
        .done(function (b) {
          k = arguments;
          d.html(e ? l("\x3cdiv\x3e").append(l.parseHTML(b)).find(e) : b);
        })
        .always(
          h &&
            function (b, c) {
              d.each(function () {
                h.apply(this, k || [b.responseText, c, b]);
              });
            }
        );
    return this;
  };
  l.expr.pseudos.animated = function (b) {
    return l.grep(l.timers, function (c) {
      return b === c.elem;
    }).length;
  };
  l.offset = {
    setOffset: function (b, c, h) {
      var e,
        a,
        k,
        d = l.css(b, "position"),
        r = l(b),
        g = {};
      "static" === d && (b.style.position = "relative");
      k = r.offset();
      a = l.css(b, "top");
      e = l.css(b, "left");
      ("absolute" === d || "fixed" === d) && -1 < (a + e).indexOf("auto")
        ? ((e = r.position()), (a = e.top), (e = e.left))
        : ((a = parseFloat(a) || 0), (e = parseFloat(e) || 0));
      A(c) && (c = c.call(b, h, l.extend({}, k)));
      null != c.top && (g.top = c.top - k.top + a);
      null != c.left && (g.left = c.left - k.left + e);
      "using" in c ? c.using.call(b, g) : r.css(g);
    },
  };
  l.fn.extend({
    offset: function (b) {
      if (arguments.length)
        return void 0 === b
          ? this
          : this.each(function (c) {
              l.offset.setOffset(this, b, c);
            });
      var c, h;
      if ((h = this[0])) {
        if (!h.getClientRects().length) return { top: 0, left: 0 };
        c = h.getBoundingClientRect();
        h = h.ownerDocument.defaultView;
        return { top: c.top + h.pageYOffset, left: c.left + h.pageXOffset };
      }
    },
    position: function () {
      if (this[0]) {
        var b,
          c,
          h,
          a = this[0],
          k = { top: 0, left: 0 };
        if ("fixed" === l.css(a, "position")) c = a.getBoundingClientRect();
        else {
          c = this.offset();
          h = a.ownerDocument;
          for (
            b = a.offsetParent || h.documentElement;
            b &&
            (b === h.body || b === h.documentElement) &&
            "static" === l.css(b, "position");

          )
            b = b.parentNode;
          b &&
            b !== a &&
            1 === b.nodeType &&
            ((k = l(b).offset()),
            (k.top += l.css(b, "borderTopWidth", !0)),
            (k.left += l.css(b, "borderLeftWidth", !0)));
        }
        return {
          top: c.top - k.top - l.css(a, "marginTop", !0),
          left: c.left - k.left - l.css(a, "marginLeft", !0),
        };
      }
    },
    offsetParent: function () {
      return this.map(function () {
        for (
          var b = this.offsetParent;
          b && "static" === l.css(b, "position");

        )
          b = b.offsetParent;
        return b || Ka;
      });
    },
  });
  l.each(
    { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
    function (b, c) {
      var h = "pageYOffset" === c;
      l.fn[b] = function (e) {
        return Ia(
          this,
          function (b, e, a) {
            var k;
            Ca(b) ? (k = b) : 9 === b.nodeType && (k = b.defaultView);
            if (void 0 === a) return k ? k[c] : b[e];
            k
              ? k.scrollTo(h ? k.pageXOffset : a, h ? a : k.pageYOffset)
              : (b[e] = a);
          },
          b,
          e,
          arguments.length
        );
      };
    }
  );
  l.each(["top", "left"], function (b, c) {
    l.cssHooks[c] = ya(h.pixelPosition, function (b, h) {
      if (h) return (h = H(b, c)), Za.test(h) ? l(b).position()[c] + "px" : h;
    });
  });
  l.each({ Height: "height", Width: "width" }, function (b, c) {
    l.each(
      { padding: "inner" + b, content: c, "": "outer" + b },
      function (h, e) {
        l.fn[e] = function (a, k) {
          var d = arguments.length && (h || "boolean" !== typeof a),
            r = h || (!0 === a || !0 === k ? "margin" : "border");
          return Ia(
            this,
            function (c, h, a) {
              return Ca(c)
                ? 0 === e.indexOf("outer")
                  ? c["inner" + b]
                  : c.document.documentElement["client" + b]
                : 9 === c.nodeType
                ? ((h = c.documentElement),
                  Math.max(
                    c.body["scroll" + b],
                    h["scroll" + b],
                    c.body["offset" + b],
                    h["offset" + b],
                    h["client" + b]
                  ))
                : void 0 === a
                ? l.css(c, h, r)
                : l.style(c, h, a, r);
            },
            c,
            d ? a : void 0,
            d
          );
        };
      }
    );
  });
  l.each(
    "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
    function (b, c) {
      l.fn[c] = function (b) {
        return this.on(c, b);
      };
    }
  );
  l.fn.extend({
    bind: function (b, c, h) {
      return this.on(b, null, c, h);
    },
    unbind: function (b, c) {
      return this.off(b, null, c);
    },
    delegate: function (b, c, h, a) {
      return this.on(c, b, h, a);
    },
    undelegate: function (b, c, h) {
      return 1 === arguments.length
        ? this.off(b, "**")
        : this.off(c, b || "**", h);
    },
    hover: function (b, c) {
      return this.mouseenter(b).mouseleave(c || b);
    },
  });
  l.each(
    "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
      " "
    ),
    function (b, c) {
      l.fn[c] = function (b, h) {
        return 0 < arguments.length ? this.on(c, null, b, h) : this.trigger(c);
      };
    }
  );
  var jc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  l.proxy = function (b, c) {
    var h, e;
    "string" === typeof c && ((h = b[c]), (c = b), (b = h));
    if (A(b))
      return (
        (e = U.call(arguments, 2)),
        (h = function () {
          return b.apply(c || this, e.concat(U.call(arguments)));
        }),
        (h.guid = b.guid = b.guid || l.guid++),
        h
      );
  };
  l.holdReady = function (b) {
    b ? l.readyWait++ : l.ready(!0);
  };
  l.isArray = Array.isArray;
  l.parseJSON = JSON.parse;
  l.nodeName = p;
  l.isFunction = A;
  l.isWindow = Ca;
  l.camelCase = Y;
  l.type = t;
  l.now = Date.now;
  l.isNumeric = function (b) {
    var c = l.type(b);
    return ("number" === c || "string" === c) && !isNaN(b - parseFloat(b));
  };
  l.trim = function (b) {
    return null == b ? "" : (b + "").replace(jc, "");
  };
  "function" === typeof define &&
    define.amd &&
    define("jquery", [], function () {
      return l;
    });
  var kc = a.jQuery,
    lc = a.$;
  l.noConflict = function (b) {
    a.$ === l && (a.$ = lc);
    b && a.jQuery === l && (a.jQuery = kc);
    return l;
  };
  "undefined" === typeof f && (a.jQuery = a.$ = l);
  return l;
});
(function (a, f, q) {
  "function" === typeof define && define.amd
    ? define(["jquery"], a)
    : "object" === typeof exports && "undefined" === typeof Meteor
    ? (module.exports = a(require("jquery")))
    : a(f || q);
})(
  function (a) {
    var f = function (f, t, q) {
      var p = {
        invalid: [],
        getCaret: function () {
          try {
            var a,
              d = 0,
              t = f.get(0),
              q = document.selection,
              w = t.selectionStart;
            if (q && -1 === navigator.appVersion.indexOf("MSIE 10"))
              (a = q.createRange()),
                a.moveStart("character", -p.val().length),
                (d = a.text.length);
            else if (w || "0" === w) d = w;
            return d;
          } catch (aa) {}
        },
        setCaret: function (a) {
          try {
            if (f.is(":focus")) {
              var d,
                p = f.get(0);
              p.setSelectionRange
                ? p.setSelectionRange(a, a)
                : ((d = p.createTextRange()),
                  d.collapse(!0),
                  d.moveEnd("character", a),
                  d.moveStart("character", a),
                  d.select());
            }
          } catch (S) {}
        },
        events: function () {
          f.on("keydown.mask", function (a) {
            f.data("mask-keycode", a.keyCode || a.which);
            f.data("mask-previus-value", f.val());
            f.data("mask-previus-caret-pos", p.getCaret());
            p.maskDigitPosMapOld = p.maskDigitPosMap;
          })
            .on(
              a.jMaskGlobals.useInput ? "input.mask" : "keyup.mask",
              p.behaviour
            )
            .on("paste.mask drop.mask", function () {
              setTimeout(function () {
                f.keydown().keyup();
              }, 100);
            })
            .on("change.mask", function () {
              f.data("changed", !0);
            })
            .on("blur.mask", function () {
              B === p.val() || f.data("changed") || f.trigger("change");
              f.data("changed", !1);
            })
            .on("blur.mask", function () {
              B = p.val();
            })
            .on("focus.mask", function (d) {
              !0 === q.selectOnFocus && a(d.target).select();
            })
            .on("focusout.mask", function () {
              q.clearIfNotMatch && !d.test(p.val()) && p.val("");
            });
        },
        getRegexMask: function () {
          for (var a = [], d, f, p, q, B = 0; B < t.length; B++)
            (d = w.translation[t.charAt(B)])
              ? ((f = d.pattern.toString().replace(/.{1}$|^.{1}/g, "")),
                (p = d.optional),
                (d = d.recursive)
                  ? (a.push(t.charAt(B)),
                    (q = { digit: t.charAt(B), pattern: f }))
                  : a.push(p || d ? f + "?" : f))
              : a.push(
                  t.charAt(B).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$\x26")
                );
          a = a.join("");
          q &&
            (a = a
              .replace(
                new RegExp("(" + q.digit + "(.*" + q.digit + ")?)"),
                "($1)?"
              )
              .replace(new RegExp(q.digit, "g"), q.pattern));
          return new RegExp(a);
        },
        destroyEvents: function () {
          f.off(
            "input keydown keyup paste drop blur focusout "
              .split(" ")
              .join(".mask ")
          );
        },
        val: function (a) {
          var d = f.is("input") ? "val" : "text";
          if (0 < arguments.length) {
            if (f[d]() !== a) f[d](a);
            d = f;
          } else d = f[d]();
          return d;
        },
        calculateCaretPosition: function (a) {
          var d = p.getMasked(),
            q = p.getCaret();
          if (a !== d) {
            var t = f.data("mask-previus-caret-pos") || 0,
              d = d.length,
              w = a.length,
              B = (a = 0),
              I = 0,
              y = 0,
              F;
            for (F = q; F < d && p.maskDigitPosMap[F]; F++) B++;
            for (F = q - 1; 0 <= F && p.maskDigitPosMap[F]; F--) a++;
            for (F = q - 1; 0 <= F; F--) p.maskDigitPosMap[F] && I++;
            for (F = t - 1; 0 <= F; F--) p.maskDigitPosMapOld[F] && y++;
            q > w
              ? (q = 10 * d)
              : t >= q && t !== w
              ? p.maskDigitPosMapOld[q] ||
                ((t = q),
                (q = q - (y - I) - a),
                p.maskDigitPosMap[q] && (q = t))
              : q > t && (q = q + (I - y) + B);
          }
          return q;
        },
        behaviour: function (d) {
          d = d || window.event;
          p.invalid = [];
          var q = f.data("mask-keycode");
          if (-1 === a.inArray(q, w.byPassKeys)) {
            var q = p.getMasked(),
              t = p.getCaret(),
              B = f.data("mask-previus-value") || "";
            setTimeout(function () {
              p.setCaret(p.calculateCaretPosition(B));
            }, a.jMaskGlobals.keyStrokeCompensation);
            p.val(q);
            p.setCaret(t);
            return p.callbacks(d);
          }
        },
        getMasked: function (a, d) {
          var f = [],
            B = void 0 === d ? p.val() : d + "",
            C = 0,
            y = t.length,
            I = 0,
            F = B.length,
            K = 1,
            O = "push",
            E = -1,
            ca = 0;
          d = [];
          var X, m;
          q.reverse
            ? ((O = "unshift"),
              (K = -1),
              (X = 0),
              (C = y - 1),
              (I = F - 1),
              (m = function () {
                return -1 < C && -1 < I;
              }))
            : ((X = y - 1),
              (m = function () {
                return C < y && I < F;
              }));
          for (var u; m(); ) {
            var G = t.charAt(C),
              D = B.charAt(I),
              ja = w.translation[G];
            if (ja)
              D.match(ja.pattern)
                ? (f[O](D),
                  ja.recursive &&
                    (-1 === E ? (E = C) : C === X && C !== E && (C = E - K),
                    X === E && (C -= K)),
                  (C += K))
                : D === u
                ? (ca--, (u = void 0))
                : ja.optional
                ? ((C += K), (I -= K))
                : ja.fallback
                ? (f[O](ja.fallback), (C += K), (I -= K))
                : p.invalid.push({ p: I, v: D, e: ja.pattern }),
                (I += K);
            else {
              if (!a) f[O](G);
              D === G ? (d.push(I), (I += K)) : ((u = G), d.push(I + ca), ca++);
              C += K;
            }
          }
          a = t.charAt(X);
          y !== F + 1 || w.translation[a] || f.push(a);
          f = f.join("");
          p.mapMaskdigitPositions(f, d, F);
          return f;
        },
        mapMaskdigitPositions: function (a, d, f) {
          a = q.reverse ? a.length - f : 0;
          p.maskDigitPosMap = {};
          for (f = 0; f < d.length; f++) p.maskDigitPosMap[d[f] + a] = 1;
        },
        callbacks: function (a) {
          var d = p.val(),
            w = d !== B,
            y = [d, a, f, q],
            I = function (a, d, f) {
              "function" === typeof q[a] && d && q[a].apply(this, f);
            };
          I("onChange", !0 === w, y);
          I("onKeyPress", !0 === w, y);
          I("onComplete", d.length === t.length, y);
          I("onInvalid", 0 < p.invalid.length, [d, a, f, p.invalid, q]);
        },
      };
      f = a(f);
      var w = this,
        B = p.val(),
        d;
      t = "function" === typeof t ? t(p.val(), void 0, f, q) : t;
      w.mask = t;
      w.options = q;
      w.remove = function () {
        var a = p.getCaret();
        w.options.placeholder && f.removeAttr("placeholder");
        f.data("mask-maxlength") && f.removeAttr("maxlength");
        p.destroyEvents();
        p.val(w.getCleanVal());
        p.setCaret(a);
        return f;
      };
      w.getCleanVal = function () {
        return p.getMasked(!0);
      };
      w.getMaskedVal = function (a) {
        return p.getMasked(!1, a);
      };
      w.init = function (B) {
        B = B || !1;
        q = q || {};
        w.clearIfNotMatch = a.jMaskGlobals.clearIfNotMatch;
        w.byPassKeys = a.jMaskGlobals.byPassKeys;
        w.translation = a.extend({}, a.jMaskGlobals.translation, q.translation);
        w = a.extend(!0, {}, w, q);
        d = p.getRegexMask();
        if (B) p.events(), p.val(p.getMasked());
        else {
          q.placeholder && f.attr("placeholder", q.placeholder);
          f.data("mask") && f.attr("autocomplete", "off");
          B = 0;
          for (var C = !0; B < t.length; B++) {
            var y = w.translation[t.charAt(B)];
            if (y && y.recursive) {
              C = !1;
              break;
            }
          }
          C && f.attr("maxlength", t.length).data("mask-maxlength", !0);
          p.destroyEvents();
          p.events();
          B = p.getCaret();
          p.val(p.getMasked());
          p.setCaret(B);
        }
      };
      w.init(!f.is("input"));
    };
    a.maskWatchers = {};
    var q = function () {
        var p = a(this),
          q = {},
          B = p.attr("data-mask");
        p.attr("data-mask-reverse") && (q.reverse = !0);
        p.attr("data-mask-clearifnotmatch") && (q.clearIfNotMatch = !0);
        "true" === p.attr("data-mask-selectonfocus") && (q.selectOnFocus = !0);
        if (t(p, B, q)) return p.data("mask", new f(this, B, q));
      },
      t = function (f, q, t) {
        t = t || {};
        var p = a(f).data("mask"),
          w = JSON.stringify;
        f = a(f).val() || a(f).text();
        try {
          return (
            "function" === typeof q && (q = q(f)),
            "object" !== typeof p || w(p.options) !== w(t) || p.mask !== q
          );
        } catch (K) {}
      },
      y = function (a) {
        var f = document.createElement("div"),
          p;
        a = "on" + a;
        p = a in f;
        p || (f.setAttribute(a, "return;"), (p = "function" === typeof f[a]));
        return p;
      };
    a.fn.mask = function (p, q) {
      q = q || {};
      var w = this.selector,
        y = a.jMaskGlobals,
        O = y.watchInterval,
        y = q.watchInputs || y.watchInputs,
        K = function () {
          if (t(this, p, q)) return a(this).data("mask", new f(this, p, q));
        };
      a(this).each(K);
      w &&
        "" !== w &&
        y &&
        (clearInterval(a.maskWatchers[w]),
        (a.maskWatchers[w] = setInterval(function () {
          a(document).find(w).each(K);
        }, O)));
      return this;
    };
    a.fn.masked = function (a) {
      return this.data("mask").getMaskedVal(a);
    };
    a.fn.unmask = function () {
      clearInterval(a.maskWatchers[this.selector]);
      delete a.maskWatchers[this.selector];
      return this.each(function () {
        var f = a(this).data("mask");
        f && f.remove().removeData("mask");
      });
    };
    a.fn.cleanVal = function () {
      return this.data("mask").getCleanVal();
    };
    a.applyDataMask = function (f) {
      f = f || a.jMaskGlobals.maskElements;
      (f instanceof a ? f : a(f)).filter(a.jMaskGlobals.dataMaskAttr).each(q);
    };
    y = {
      maskElements: "input,td,span,div",
      dataMaskAttr: "*[data-mask]",
      dataMask: !0,
      watchInterval: 300,
      watchInputs: !0,
      keyStrokeCompensation: 10,
      useInput:
        !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) &&
        y("input"),
      watchDataMask: !1,
      byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
      translation: {
        0: { pattern: /\d/ },
        9: { pattern: /\d/, optional: !0 },
        "#": { pattern: /\d/, recursive: !0 },
        A: { pattern: /[a-zA-Z0-9]/ },
        S: { pattern: /[a-zA-Z]/ },
      },
    };
    a.jMaskGlobals = a.jMaskGlobals || {};
    y = a.jMaskGlobals = a.extend(!0, {}, y, a.jMaskGlobals);
    y.dataMask && a.applyDataMask();
    setInterval(function () {
      a.jMaskGlobals.watchDataMask && a.applyDataMask();
    }, y.watchInterval);
  },
  window.jQuery,
  window.Zepto
);
(function (a, f) {
  "object" === typeof exports && "undefined" !== typeof module
    ? (module.exports = f())
    : "function" === typeof define && define.amd
    ? define(f)
    : (a.Popper = f());
})(this, function () {
  function a(a) {
    var k = !1;
    return function () {
      k ||
        ((k = !0),
        window.Promise.resolve().then(function () {
          k = !1;
          a();
        }));
    };
  }
  function f(a) {
    var k = !1;
    return function () {
      k ||
        ((k = !0),
        setTimeout(function () {
          k = !1;
          a();
        }, x));
    };
  }
  function q(a) {
    var k = {};
    return a && "[object Function]" === k.toString.call(a);
  }
  function t(a, d) {
    if (1 !== a.nodeType) return [];
    a = a.ownerDocument.defaultView.getComputedStyle(a, null);
    return d ? a[d] : a;
  }
  function y(a) {
    return "HTML" === a.nodeName ? a : a.parentNode || a.host;
  }
  function p(a) {
    if (!a) return document.body;
    switch (a.nodeName) {
      case "HTML":
      case "BODY":
        return a.ownerDocument.body;
      case "#document":
        return a.body;
    }
    var d = t(a);
    return /(auto|scroll|overlay)/.test(d.overflow + d.overflowY + d.overflowX)
      ? a
      : p(y(a));
  }
  function w(a) {
    return 11 === a ? n : 10 === a ? ha : n || ha;
  }
  function B(a) {
    if (!a) return document.documentElement;
    for (
      var d = w(10) ? document.body : null, k = a.offsetParent || null;
      k === d && a.nextElementSibling;

    )
      k = (a = a.nextElementSibling).offsetParent;
    return (d = k && k.nodeName) && "BODY" !== d && "HTML" !== d
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(k.nodeName) &&
        "static" === t(k, "position")
        ? B(k)
        : k
      : a
      ? a.ownerDocument.documentElement
      : document.documentElement;
  }
  function F(a) {
    return null !== a.parentNode ? F(a.parentNode) : a;
  }
  function O(a, d) {
    if (!(a && a.nodeType && d && d.nodeType)) return document.documentElement;
    var k = a.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING,
      g = k ? a : d,
      r = k ? d : a,
      k = document.createRange();
    k.setStart(g, 0);
    k.setEnd(r, 0);
    k = k.commonAncestorContainer;
    if ((a !== k && d !== k) || g.contains(r))
      return (
        (a = k.nodeName),
        (a = "BODY" === a ? !1 : "HTML" === a || B(k.firstElementChild) === k),
        a ? k : B(k)
      );
    g = F(a);
    return g.host ? O(g.host, d) : O(a, F(d).host);
  }
  function K(a) {
    var d =
        "top" ===
        (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top")
          ? "scrollTop"
          : "scrollLeft",
      k = a.nodeName;
    return "BODY" === k || "HTML" === k
      ? ((k = a.ownerDocument.documentElement),
        (a.ownerDocument.scrollingElement || k)[d])
      : a[d];
  }
  function d(a, d) {
    var k = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1,
      g = K(d, "top"),
      r = K(d, "left"),
      k = k ? -1 : 1;
    a.top += g * k;
    a.bottom += g * k;
    a.left += r * k;
    a.right += r * k;
    return a;
  }
  function I(a, d) {
    d = "x" === d ? "Left" : "Top";
    var k = "Left" === d ? "Right" : "Bottom";
    return (
      parseFloat(a["border" + d + "Width"]) +
      parseFloat(a["border" + k + "Width"])
    );
  }
  function C(a, d, g, f) {
    return Math.max(
      d["offset" + a],
      d["scroll" + a],
      g["client" + a],
      g["offset" + a],
      g["scroll" + a],
      w(10)
        ? parseInt(g["offset" + a]) +
            parseInt(f["margin" + ("Height" === a ? "Top" : "Left")]) +
            parseInt(f["margin" + ("Height" === a ? "Bottom" : "Right")])
        : 0
    );
  }
  function Y(a) {
    var d = a.body;
    a = a.documentElement;
    var k = w(10) && getComputedStyle(a);
    return { height: C("Height", d, a, k), width: C("Width", d, a, k) };
  }
  function S(a) {
    return ba({}, a, { right: a.left + a.width, bottom: a.top + a.height });
  }
  function ga(a) {
    var d = {};
    try {
      if (w(10)) {
        var d = a.getBoundingClientRect(),
          k = K(a, "top"),
          g = K(a, "left");
        d.top += k;
        d.left += g;
        d.bottom += k;
        d.right += g;
      } else d = a.getBoundingClientRect();
    } catch (P) {}
    d = {
      left: d.left,
      top: d.top,
      width: d.right - d.left,
      height: d.bottom - d.top,
    };
    g = "HTML" === a.nodeName ? Y(a.ownerDocument) : {};
    k = a.offsetWidth - (g.width || a.clientWidth || d.width);
    g = a.offsetHeight - (g.height || a.clientHeight || d.height);
    if (k || g)
      (a = t(a)),
        (k -= I(a, "x")),
        (g -= I(a, "y")),
        (d.width -= k),
        (d.height -= g);
    return S(d);
  }
  function aa(a, g) {
    var k = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1,
      f = w(10),
      r = "HTML" === g.nodeName,
      n = ga(a),
      x = ga(g),
      m = p(a),
      u = t(g),
      na = parseFloat(u.borderTopWidth),
      N = parseFloat(u.borderLeftWidth);
    k && r && ((x.top = Math.max(x.top, 0)), (x.left = Math.max(x.left, 0)));
    n = S({
      top: n.top - x.top - na,
      left: n.left - x.left - N,
      width: n.width,
      height: n.height,
    });
    n.marginTop = 0;
    n.marginLeft = 0;
    !f &&
      r &&
      ((r = parseFloat(u.marginTop)),
      (u = parseFloat(u.marginLeft)),
      (n.top -= na - r),
      (n.bottom -= na - r),
      (n.left -= N - u),
      (n.right -= N - u),
      (n.marginTop = r),
      (n.marginLeft = u));
    if (f && !k ? g.contains(m) : g === m && "BODY" !== m.nodeName) n = d(n, g);
    return n;
  }
  function T(a) {
    var d = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1,
      k = a.ownerDocument.documentElement,
      g = aa(a, k),
      f = Math.max(k.clientWidth, window.innerWidth || 0),
      n = Math.max(k.clientHeight, window.innerHeight || 0),
      x = d ? 0 : K(k),
      d = d ? 0 : K(k, "left");
    return S({
      top: x - g.top + g.marginTop,
      left: d - g.left + g.marginLeft,
      width: f,
      height: n,
    });
  }
  function Z(a) {
    var d = a.nodeName;
    return "BODY" === d || "HTML" === d
      ? !1
      : "fixed" === t(a, "position")
      ? !0
      : (a = y(a))
      ? Z(a)
      : !1;
  }
  function ma(a) {
    if (!a || !a.parentElement || w()) return document.documentElement;
    for (a = a.parentElement; a && "none" === t(a, "transform"); )
      a = a.parentElement;
    return a || document.documentElement;
  }
  function ea(a, d, g, f) {
    var k = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : !1,
      r = { top: 0, left: 0 },
      n = k ? ma(a) : O(a, d && d.referenceNode ? d.referenceNode : d);
    if ("viewport" === f) r = T(n, k);
    else {
      var x;
      "scrollParent" === f
        ? ((x = p(y(d))),
          "BODY" === x.nodeName && (x = a.ownerDocument.documentElement))
        : (x = "window" === f ? a.ownerDocument.documentElement : f);
      k = aa(x, n, k);
      "HTML" !== x.nodeName || Z(n)
        ? (r = k)
        : ((x = Y(a.ownerDocument)),
          (n = x.height),
          (x = x.width),
          (r.top += k.top - k.marginTop),
          (r.bottom = n + k.top),
          (r.left += k.left - k.marginLeft),
          (r.right = x + k.left));
    }
    g = g || 0;
    k = "number" === typeof g;
    r.left += k ? g : g.left || 0;
    r.top += k ? g : g.top || 0;
    r.right -= k ? g : g.right || 0;
    r.bottom -= k ? g : g.bottom || 0;
    return r;
  }
  function E(a, d, g, f, n) {
    var k = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === a.indexOf("auto")) return a;
    var k = ea(g, f, k, n),
      r = {
        top: { width: k.width, height: d.top - k.top },
        right: { width: k.right - d.right, height: k.height },
        bottom: { width: k.width, height: k.bottom - d.bottom },
        left: { width: d.left - k.left, height: k.height },
      },
      k = Object.keys(r)
        .map(function (a) {
          var d = r[a];
          return ba({ key: a }, r[a], { area: d.width * d.height });
        })
        .sort(function (a, d) {
          return d.area - a.area;
        }),
      x = k.filter(function (a) {
        var d = a.height;
        return a.width >= g.clientWidth && d >= g.clientHeight;
      }),
      k = 0 < x.length ? x[0].key : k[0].key,
      x = a.split("-")[1];
    return k + (x ? "-" + x : "");
  }
  function ca(a, d, g) {
    var k =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
      f = k ? ma(d) : O(d, g && g.referenceNode ? g.referenceNode : g);
    return aa(g, f, k);
  }
  function X(a) {
    var d = a.ownerDocument.defaultView.getComputedStyle(a),
      k = parseFloat(d.marginTop || 0) + parseFloat(d.marginBottom || 0),
      d = parseFloat(d.marginLeft || 0) + parseFloat(d.marginRight || 0);
    return { width: a.offsetWidth + d, height: a.offsetHeight + k };
  }
  function m(a) {
    var d = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return a.replace(/left|right|bottom|top/g, function (a) {
      return d[a];
    });
  }
  function u(a, d, g) {
    g = g.split("-")[0];
    a = X(a);
    var k = { width: a.width, height: a.height },
      f = -1 !== ["right", "left"].indexOf(g),
      r = f ? "top" : "left",
      n = f ? "left" : "top",
      x = f ? "height" : "width";
    k[r] = d[r] + d[x] / 2 - a[x] / 2;
    k[n] = g === n ? d[n] - a[f ? "width" : "height"] : d[m(n)];
    return k;
  }
  function G(a, d) {
    return Array.prototype.find ? a.find(d) : a.filter(d)[0];
  }
  function D(a, d, g) {
    if (Array.prototype.findIndex)
      return a.findIndex(function (a) {
        return a[d] === g;
      });
    var k = G(a, function (a) {
      return a[d] === g;
    });
    return a.indexOf(k);
  }
  function ja(a, d, g) {
    (void 0 === g ? a : a.slice(0, D(a, "name", g))).forEach(function (a) {
      a["function"] &&
        console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var k = a["function"] || a.fn;
      a.enabled &&
        q(k) &&
        ((d.offsets.popper = S(d.offsets.popper)),
        (d.offsets.reference = S(d.offsets.reference)),
        (d = k(d, a)));
    });
    return d;
  }
  function sa(a, d) {
    return a.some(function (a) {
      var k = a.name;
      return a.enabled && k === d;
    });
  }
  function R(a) {
    for (
      var d = [!1, "ms", "Webkit", "Moz", "O"],
        k = a.charAt(0).toUpperCase() + a.slice(1),
        g = 0;
      g < d.length;
      g++
    ) {
      var f = d[g],
        f = f ? "" + f + k : a;
      if ("undefined" !== typeof document.body.style[f]) return f;
    }
    return null;
  }
  function ta(a) {
    return (a = a.ownerDocument) ? a.defaultView : window;
  }
  function H(a, d, g, f) {
    var k = "BODY" === a.nodeName;
    a = k ? a.ownerDocument.defaultView : a;
    a.addEventListener(d, g, { passive: !0 });
    k || H(p(a.parentNode), d, g, f);
    f.push(a);
  }
  function ya(a, d) {
    ta(a).removeEventListener("resize", d.updateBound);
    d.scrollParents.forEach(function (a) {
      a.removeEventListener("scroll", d.updateBound);
    });
    d.updateBound = null;
    d.scrollParents = [];
    d.scrollElement = null;
    d.eventsEnabled = !1;
    return d;
  }
  function J(a) {
    return "" !== a && !isNaN(parseFloat(a)) && isFinite(a);
  }
  function Ba(a, d) {
    Object.keys(d).forEach(function (k) {
      var g = "";
      -1 !== "width height top right bottom left".split(" ").indexOf(k) &&
        J(d[k]) &&
        (g = "px");
      a.style[k] = d[k] + g;
    });
  }
  function Ea(a, d) {
    Object.keys(d).forEach(function (k) {
      !1 !== d[k] ? a.setAttribute(k, d[k]) : a.removeAttribute(k);
    });
  }
  function ka(a, d) {
    var k = a.offsets,
      g = k.popper,
      f = Math.round,
      n = Math.floor,
      r = function (a) {
        return a;
      },
      k = f(k.reference.width),
      x = f(g.width),
      m = -1 !== ["left", "right"].indexOf(a.placement);
    a = -1 !== a.placement.indexOf("-");
    n = d ? (m || a || k % 2 === x % 2 ? f : n) : r;
    f = d ? f : r;
    return {
      left: n(1 === k % 2 && 1 === x % 2 && !a && d ? g.left - 1 : g.left),
      top: f(g.top),
      bottom: f(g.bottom),
      right: n(g.right),
    };
  }
  function Q(a, d, g) {
    var k = G(a, function (a) {
      return a.name === d;
    });
    a =
      !!k &&
      a.some(function (a) {
        return a.name === g && a.enabled && a.order < k.order;
      });
    if (!a) {
      var f = "`" + d + "`";
      console.warn(
        "`" +
          g +
          "` modifier is required by " +
          f +
          " modifier in order to work, be sure to include it before " +
          f +
          "!"
      );
    }
    return a;
  }
  function xa(a) {
    var d = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : !1,
      k = ia.indexOf(a),
      k = ia.slice(k + 1).concat(ia.slice(0, k));
    return d ? k.reverse() : k;
  }
  function g(a, d, g, f) {
    var k = [0, 0],
      n = -1 !== ["right", "left"].indexOf(f);
    a = a.split(/(\+|\-)/).map(function (a) {
      return a.trim();
    });
    f = a.indexOf(
      G(a, function (a) {
        return -1 !== a.search(/,|\s/);
      })
    );
    a[f] &&
      -1 === a[f].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var r = /\s*,\s*|\s+/;
    a =
      -1 !== f
        ? [
            a.slice(0, f).concat([a[f].split(r)[0]]),
            [a[f].split(r)[1]].concat(a.slice(f + 1)),
          ]
        : [a];
    a = a.map(function (a, k) {
      var f = (1 === k ? !n : n) ? "height" : "width",
        r = !1;
      return a
        .reduce(function (c, a) {
          return "" === c[c.length - 1] && -1 !== ["+", "-"].indexOf(a)
            ? ((c[c.length - 1] = a), (r = !0), c)
            : r
            ? ((c[c.length - 1] += a), (r = !1), c)
            : c.concat(a);
        }, [])
        .map(function (c) {
          var a;
          var k = c.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
          a = +k[1];
          k = k[2];
          if (a)
            if (0 === k.indexOf("%")) {
              switch (k) {
                case "%p":
                  c = d;
                  break;
                default:
                  c = g;
              }
              a *= S(c)[f] / 100;
            } else
              a =
                "vh" === k || "vw" === k
                  ? (("vh" === k
                      ? Math.max(
                          document.documentElement.clientHeight,
                          window.innerHeight || 0
                        )
                      : Math.max(
                          document.documentElement.clientWidth,
                          window.innerWidth || 0
                        )) /
                      100) *
                    a
                  : a;
          else a = c;
          return a;
        });
    });
    a.forEach(function (a, d) {
      a.forEach(function (g, f) {
        J(g) && (k[d] += g * ("-" === a[f - 1] ? -1 : 1));
      });
    });
    return k;
  }
  var L =
      "undefined" !== typeof window &&
      "undefined" !== typeof document &&
      "undefined" !== typeof navigator,
    x = (function () {
      for (var a = ["Edge", "Trident", "Firefox"], d = 0; d < a.length; d += 1)
        if (L && 0 <= navigator.userAgent.indexOf(a[d])) return 1;
      return 0;
    })(),
    da = L && window.Promise ? a : f,
    n = L && !(!window.MSInputMethodContext || !document.documentMode),
    ha = L && /MSIE 10/.test(navigator.userAgent),
    la = (function () {
      function a(a, d) {
        for (var k = 0; k < d.length; k++) {
          var g = d[k];
          g.enumerable = g.enumerable || !1;
          g.configurable = !0;
          "value" in g && (g.writable = !0);
          Object.defineProperty(a, g.key, g);
        }
      }
      return function (d, k, g) {
        k && a(d.prototype, k);
        g && a(d, g);
        return d;
      };
    })(),
    fa = function (a, d, g) {
      d in a
        ? Object.defineProperty(a, d, {
            value: g,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (a[d] = g);
      return a;
    },
    ba =
      Object.assign ||
      function (a) {
        for (var d = 1; d < arguments.length; d++) {
          var k = arguments[d],
            g;
          for (g in k)
            Object.prototype.hasOwnProperty.call(k, g) && (a[g] = k[g]);
        }
        return a;
      },
    Ga = L && /Firefox/i.test(navigator.userAgent),
    za =
      "auto-start auto auto-end top-start top top-end right-start right right-end bottom-end bottom bottom-start left-end left left-start".split(
        " "
      ),
    ia = za.slice(3),
    ua = (function () {
      function a(d, k) {
        var g = this,
          f =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        if (!(this instanceof a))
          throw new TypeError("Cannot call a class as a function");
        this.scheduleUpdate = function () {
          return requestAnimationFrame(g.update);
        };
        this.update = da(this.update.bind(this));
        this.options = ba({}, a.Defaults, f);
        this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] };
        this.reference = d && d.jquery ? d[0] : d;
        this.popper = k && k.jquery ? k[0] : k;
        this.options.modifiers = {};
        Object.keys(ba({}, a.Defaults.modifiers, f.modifiers)).forEach(
          function (d) {
            g.options.modifiers[d] = ba(
              {},
              a.Defaults.modifiers[d] || {},
              f.modifiers ? f.modifiers[d] : {}
            );
          }
        );
        this.modifiers = Object.keys(this.options.modifiers)
          .map(function (a) {
            return ba({ name: a }, g.options.modifiers[a]);
          })
          .sort(function (a, d) {
            return a.order - d.order;
          });
        this.modifiers.forEach(function (a) {
          if (a.enabled && q(a.onLoad))
            a.onLoad(g.reference, g.popper, g.options, a, g.state);
        });
        this.update();
        var n = this.options.eventsEnabled;
        n && this.enableEventListeners();
        this.state.eventsEnabled = n;
      }
      la(a, [
        {
          key: "update",
          value: function () {
            if (!this.state.isDestroyed) {
              var a = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {},
              };
              a.offsets.reference = ca(
                this.state,
                this.popper,
                this.reference,
                this.options.positionFixed
              );
              a.placement = E(
                this.options.placement,
                a.offsets.reference,
                this.popper,
                this.reference,
                this.options.modifiers.flip.boundariesElement,
                this.options.modifiers.flip.padding
              );
              a.originalPlacement = a.placement;
              a.positionFixed = this.options.positionFixed;
              a.offsets.popper = u(
                this.popper,
                a.offsets.reference,
                a.placement
              );
              a.offsets.popper.position = this.options.positionFixed
                ? "fixed"
                : "absolute";
              a = ja(this.modifiers, a);
              if (this.state.isCreated) this.options.onUpdate(a);
              else (this.state.isCreated = !0), this.options.onCreate(a);
            }
          },
        },
        {
          key: "destroy",
          value: function () {
            this.state.isDestroyed = !0;
            sa(this.modifiers, "applyStyle") &&
              (this.popper.removeAttribute("x-placement"),
              (this.popper.style.position = ""),
              (this.popper.style.top = ""),
              (this.popper.style.left = ""),
              (this.popper.style.right = ""),
              (this.popper.style.bottom = ""),
              (this.popper.style.willChange = ""),
              (this.popper.style[R("transform")] = ""));
            this.disableEventListeners();
            this.options.removeOnDestroy &&
              this.popper.parentNode.removeChild(this.popper);
            return this;
          },
        },
        {
          key: "enableEventListeners",
          value: function () {
            if (!this.state.eventsEnabled) {
              var a = this.reference,
                d = this.state;
              d.updateBound = this.scheduleUpdate;
              ta(a).addEventListener("resize", d.updateBound, { passive: !0 });
              a = p(a);
              H(a, "scroll", d.updateBound, d.scrollParents);
              d.scrollElement = a;
              d.eventsEnabled = !0;
              this.state = d;
            }
          },
        },
        {
          key: "disableEventListeners",
          value: function () {
            this.state.eventsEnabled &&
              (cancelAnimationFrame(this.scheduleUpdate),
              (this.state = ya(this.reference, this.state)));
          },
        },
      ]);
      return a;
    })();
  ua.Utils = ("undefined" !== typeof window ? window : global).PopperUtils;
  ua.placements = za;
  ua.Defaults = {
    placement: "bottom",
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function () {},
    onUpdate: function () {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function (a) {
          var d = a.placement,
            k = d.split("-")[0];
          if ((d = d.split("-")[1])) {
            var g = a.offsets,
              f = g.reference,
              g = g.popper,
              n = -1 !== ["bottom", "top"].indexOf(k),
              k = n ? "left" : "top",
              n = n ? "width" : "height",
              f = {
                start: fa({}, k, f[k]),
                end: fa({}, k, f[k] + f[n] - g[n]),
              };
            a.offsets.popper = ba({}, g, f[d]);
          }
          return a;
        },
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: function (a, d) {
          var k = d.offset,
            f = a.offsets;
          d = f.popper;
          var n = f.reference,
            f = a.placement.split("-")[0],
            k = J(+k) ? [+k, 0] : g(k, d, n, f);
          "left" === f
            ? ((d.top += k[0]), (d.left -= k[1]))
            : "right" === f
            ? ((d.top += k[0]), (d.left += k[1]))
            : "top" === f
            ? ((d.left += k[0]), (d.top -= k[1]))
            : "bottom" === f && ((d.left += k[0]), (d.top += k[1]));
          a.popper = d;
          return a;
        },
        offset: 0,
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function (a, d) {
          var k = d.boundariesElement || B(a.instance.popper);
          a.instance.reference === k && (k = B(k));
          var g = R("transform"),
            f = a.instance.popper.style,
            n = f.top,
            x = f.left,
            m = f[g];
          f.top = "";
          f.left = "";
          f[g] = "";
          var r = ea(
            a.instance.popper,
            a.instance.reference,
            d.padding,
            k,
            a.positionFixed
          );
          f.top = n;
          f.left = x;
          f[g] = m;
          d.boundaries = r;
          var u = a.offsets.popper,
            N = {
              primary: function (c) {
                var a = u[c];
                u[c] < r[c] &&
                  !d.escapeWithReference &&
                  (a = Math.max(u[c], r[c]));
                return fa({}, c, a);
              },
              secondary: function (c) {
                var a = "right" === c ? "left" : "top",
                  k = u[a];
                u[c] > r[c] &&
                  !d.escapeWithReference &&
                  (k = Math.min(
                    u[a],
                    r[c] - ("right" === c ? u.width : u.height)
                  ));
                return fa({}, a, k);
              },
            };
          d.priority.forEach(function (c) {
            var a = -1 !== ["left", "top"].indexOf(c) ? "primary" : "secondary";
            u = ba({}, u, N[a](c));
          });
          a.offsets.popper = u;
          return a;
        },
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent",
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function (a) {
          var d = a.offsets,
            k = d.popper,
            d = d.reference,
            g = a.placement.split("-")[0],
            f = Math.floor,
            n = -1 !== ["top", "bottom"].indexOf(g),
            g = n ? "right" : "bottom",
            x = n ? "left" : "top",
            n = n ? "width" : "height";
          k[g] < f(d[x]) && (a.offsets.popper[x] = f(d[x]) - k[n]);
          k[x] > f(d[g]) && (a.offsets.popper[x] = f(d[g]));
          return a;
        },
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function (a, d) {
          var k;
          if (!Q(a.instance.modifiers, "arrow", "keepTogether")) return a;
          d = d.element;
          if ("string" === typeof d) {
            if (((d = a.instance.popper.querySelector(d)), !d)) return a;
          } else if (!a.instance.popper.contains(d))
            return (
              console.warn(
                "WARNING: `arrow.element` must be child of its popper element!"
              ),
              a
            );
          var g = a.placement.split("-")[0],
            f = a.offsets,
            n = f.popper,
            x = f.reference,
            m = -1 !== ["left", "right"].indexOf(g),
            g = m ? "height" : "width",
            r = m ? "Top" : "Left",
            f = r.toLowerCase(),
            u = m ? "left" : "top",
            N = m ? "bottom" : "right",
            m = X(d)[g];
          x[N] - m < n[f] && (a.offsets.popper[f] -= n[f] - (x[N] - m));
          x[f] + m > n[N] && (a.offsets.popper[f] += x[f] + m - n[N]);
          a.offsets.popper = S(a.offsets.popper);
          var x = x[f] + x[g] / 2 - m / 2,
            c = t(a.instance.popper),
            N = parseFloat(c["margin" + r]),
            r = parseFloat(c["border" + r + "Width"]),
            r = x - a.offsets.popper[f] - N - r,
            r = Math.max(Math.min(n[g] - m, r), 0);
          a.arrowElement = d;
          a.offsets.arrow =
            ((k = {}), fa(k, f, Math.round(r)), fa(k, u, ""), k);
          return a;
        },
        element: "[x-arrow]",
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function (a, d) {
          if (
            sa(a.instance.modifiers, "inner") ||
            (a.flipped && a.placement === a.originalPlacement)
          )
            return a;
          var k = ea(
              a.instance.popper,
              a.instance.reference,
              d.padding,
              d.boundariesElement,
              a.positionFixed
            ),
            g = a.placement.split("-")[0],
            f = m(g),
            n = a.placement.split("-")[1] || "",
            x = [];
          switch (d.behavior) {
            case "flip":
              x = [g, f];
              break;
            case "clockwise":
              x = xa(g);
              break;
            case "counterclockwise":
              x = xa(g, !0);
              break;
            default:
              x = d.behavior;
          }
          x.forEach(function (r, da) {
            if (g !== r || x.length === da + 1) return a;
            g = a.placement.split("-")[0];
            f = m(g);
            var L = a.offsets.popper;
            r = a.offsets.reference;
            var N = Math.floor;
            r =
              ("left" === g && N(L.right) > N(r.left)) ||
              ("right" === g && N(L.left) < N(r.right)) ||
              ("top" === g && N(L.bottom) > N(r.top)) ||
              ("bottom" === g && N(L.top) < N(r.bottom));
            var c = N(L.left) < N(k.left),
              h = N(L.right) > N(k.right),
              A = N(L.top) < N(k.top),
              N = N(L.bottom) > N(k.bottom),
              L =
                ("left" === g && c) ||
                ("right" === g && h) ||
                ("top" === g && A) ||
                ("bottom" === g && N),
              q = -1 !== ["top", "bottom"].indexOf(g),
              p =
                !!d.flipVariationsByContent &&
                ((q && "start" === n && h) ||
                  (q && "end" === n && c) ||
                  (!q && "start" === n && N) ||
                  (!q && "end" === n && A)),
              c =
                (!!d.flipVariations &&
                  ((q && "start" === n && c) ||
                    (q && "end" === n && h) ||
                    (!q && "start" === n && A) ||
                    (!q && "end" === n && N))) ||
                p;
            if (r || L || c) {
              a.flipped = !0;
              if (r || L) g = x[da + 1];
              c && ("end" === n ? (n = "start") : "start" === n && (n = "end"));
              a.placement = g + (n ? "-" + n : "");
              a.offsets.popper = ba(
                {},
                a.offsets.popper,
                u(a.instance.popper, a.offsets.reference, a.placement)
              );
              a = ja(a.instance.modifiers, a, "flip");
            }
          });
          return a;
        },
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport",
        flipVariations: !1,
        flipVariationsByContent: !1,
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function (a) {
          var d = a.placement,
            k = d.split("-")[0],
            g = a.offsets,
            f = g.popper,
            g = g.reference,
            n = -1 !== ["left", "right"].indexOf(k),
            x = -1 === ["top", "left"].indexOf(k);
          f[n ? "left" : "top"] = g[k] - (x ? f[n ? "width" : "height"] : 0);
          a.placement = m(d);
          a.offsets.popper = S(f);
          return a;
        },
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function (a) {
          if (!Q(a.instance.modifiers, "hide", "preventOverflow")) return a;
          var d = a.offsets.reference,
            k = G(a.instance.modifiers, function (a) {
              return "preventOverflow" === a.name;
            }).boundaries;
          if (
            d.bottom < k.top ||
            d.left > k.right ||
            d.top > k.bottom ||
            d.right < k.left
          ) {
            if (!0 === a.hide) return a;
            a.hide = !0;
            a.attributes["x-out-of-boundaries"] = "";
          } else {
            if (!1 === a.hide) return a;
            a.hide = !1;
            a.attributes["x-out-of-boundaries"] = !1;
          }
          return a;
        },
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function (a, d) {
          var k = d.x,
            g = d.y,
            f = a.offsets.popper,
            n = G(a.instance.modifiers, function (c) {
              return "applyStyle" === c.name;
            }).gpuAcceleration;
          void 0 !== n &&
            console.warn(
              "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
            );
          d = void 0 !== n ? n : d.gpuAcceleration;
          var n = B(a.instance.popper),
            x = ga(n),
            f = { position: f.position },
            m = ka(a, 2 > window.devicePixelRatio || !Ga),
            k = "bottom" === k ? "top" : "bottom",
            g = "right" === g ? "left" : "right",
            r = R("transform"),
            u = void 0,
            N = void 0,
            N =
              "bottom" === k
                ? "HTML" === n.nodeName
                  ? -n.clientHeight + m.bottom
                  : -x.height + m.bottom
                : m.top,
            u =
              "right" === g
                ? "HTML" === n.nodeName
                  ? -n.clientWidth + m.right
                  : -x.width + m.right
                : m.left;
          d && r
            ? ((f[r] = "translate3d(" + u + "px, " + N + "px, 0)"),
              (f[k] = 0),
              (f[g] = 0),
              (f.willChange = "transform"))
            : ((f[k] = N * ("bottom" === k ? -1 : 1)),
              (f[g] = u * ("right" === g ? -1 : 1)),
              (f.willChange = k + ", " + g));
          a.attributes = ba({}, { "x-placement": a.placement }, a.attributes);
          a.styles = ba({}, f, a.styles);
          a.arrowStyles = ba({}, a.offsets.arrow, a.arrowStyles);
          return a;
        },
        gpuAcceleration: !0,
        x: "bottom",
        y: "right",
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function (a) {
          Ba(a.instance.popper, a.styles);
          Ea(a.instance.popper, a.attributes);
          a.arrowElement &&
            Object.keys(a.arrowStyles).length &&
            Ba(a.arrowElement, a.arrowStyles);
          return a;
        },
        onLoad: function (a, d, g, f, n) {
          f = ca(n, d, a, g.positionFixed);
          a = E(
            g.placement,
            f,
            d,
            a,
            g.modifiers.flip.boundariesElement,
            g.modifiers.flip.padding
          );
          d.setAttribute("x-placement", a);
          Ba(d, { position: g.positionFixed ? "fixed" : "absolute" });
          return g;
        },
        gpuAcceleration: void 0,
      },
    },
  };
  return ua;
});
(function (a, f) {
  "object" === typeof exports && "undefined" !== typeof module
    ? f(exports, require("jquery"), require("popper.js"))
    : "function" === typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], f)
    : ((a = "undefined" !== typeof globalThis ? globalThis : a || self),
      f((a.bootstrap = {}), a.jQuery, a.Popper));
})(this, function (a, f, q) {
  function t(a) {
    return a && "object" === typeof a && "default" in a ? a : { default: a };
  }
  function y(a, d) {
    for (var c = 0; c < d.length; c++) {
      var h = d[c];
      h.enumerable = h.enumerable || !1;
      h.configurable = !0;
      "value" in h && (h.writable = !0);
      Object.defineProperty(a, h.key, h);
    }
  }
  function p(a, d, c) {
    d && y(a.prototype, d);
    c && y(a, c);
    return a;
  }
  function w() {
    w =
      Object.assign ||
      function (a) {
        for (var d = 1; d < arguments.length; d++) {
          var c = arguments[d],
            h;
          for (h in c)
            Object.prototype.hasOwnProperty.call(c, h) && (a[h] = c[h]);
        }
        return a;
      };
    return w.apply(this, arguments);
  }
  function B(a, d) {
    a.prototype = Object.create(d.prototype);
    a.prototype.constructor = a;
    F(a, d);
  }
  function F(a, d) {
    F =
      Object.setPrototypeOf ||
      function (c, a) {
        c.__proto__ = a;
        return c;
      };
    return F(a, d);
  }
  function O(a, d) {
    var c = a.nodeName.toLowerCase();
    if (-1 !== d.indexOf(c))
      return -1 !== Ba.indexOf(c)
        ? !(!Ea.test(a.nodeValue) && !ka.test(a.nodeValue))
        : !0;
    a = d.filter(function (c) {
      return c instanceof RegExp;
    });
    d = 0;
    for (var h = a.length; d < h; d++) if (a[d].test(c)) return !0;
    return !1;
  }
  function K(a, d, c) {
    if (0 === a.length) return a;
    if (c && "function" === typeof c) return c(a);
    a = new window.DOMParser().parseFromString(a, "text/html");
    var h = Object.keys(d),
      g = [].slice.call(a.body.querySelectorAll("*"));
    c = function (c, a) {
      var l = g[c];
      c = l.nodeName.toLowerCase();
      if (-1 === h.indexOf(l.nodeName.toLowerCase()))
        return l.parentNode.removeChild(l), "continue";
      a = [].slice.call(l.attributes);
      var k = [].concat(d["*"] || [], d[c] || []);
      a.forEach(function (c) {
        O(c, k) || l.removeAttribute(c.nodeName);
      });
    };
    for (var k = 0, f = g.length; k < f; k++) c(k);
    return a.body.innerHTML;
  }
  var d = t(f),
    I = t(q),
    C = {
      TRANSITION_END: "bsTransitionEnd",
      getUID: function (a) {
        do a += ~~(1e6 * Math.random());
        while (document.getElementById(a));
        return a;
      },
      getSelectorFromElement: function (a) {
        var d = a.getAttribute("data-target");
        (d && "#" !== d) ||
          (d = (a = a.getAttribute("href")) && "#" !== a ? a.trim() : "");
        try {
          return document.querySelector(d) ? d : null;
        } catch (c) {
          return null;
        }
      },
      getTransitionDurationFromElement: function (a) {
        if (!a) return 0;
        var g = d["default"](a).css("transition-duration");
        a = d["default"](a).css("transition-delay");
        var c = parseFloat(g),
          h = parseFloat(a);
        if (!c && !h) return 0;
        g = g.split(",")[0];
        a = a.split(",")[0];
        return 1e3 * (parseFloat(g) + parseFloat(a));
      },
      reflow: function (a) {
        return a.offsetHeight;
      },
      triggerTransitionEnd: function (a) {
        d["default"](a).trigger("transitionend");
      },
      supportsTransitionEnd: function () {
        return !0;
      },
      isElement: function (a) {
        return (a[0] || a).nodeType;
      },
      typeCheckConfig: function (a, d, c) {
        for (var h in c)
          if (Object.prototype.hasOwnProperty.call(c, h)) {
            var g = c[h],
              k = d[h];
            k =
              k && C.isElement(k)
                ? "element"
                : null === k || "undefined" === typeof k
                ? "" + k
                : {}.toString
                    .call(k)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase();
            if (!new RegExp(g).test(k))
              throw Error(
                a.toUpperCase() +
                  ": " +
                  ('Option "' + h + '" provided type "' + k + '" ') +
                  ('but expected type "' + g + '".')
              );
          }
      },
      findShadowRoot: function (a) {
        return document.documentElement.attachShadow
          ? "function" === typeof a.getRootNode
            ? ((a = a.getRootNode()), a instanceof ShadowRoot ? a : null)
            : a instanceof ShadowRoot
            ? a
            : a.parentNode
            ? C.findShadowRoot(a.parentNode)
            : null
          : null;
      },
      jQueryDetection: function () {
        if ("undefined" === typeof d["default"])
          throw new TypeError(
            "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
          );
        var a = d["default"].fn.jquery.split(" ")[0].split(".");
        if (
          (2 > a[0] && 9 > a[1]) ||
          (1 === a[0] && 9 === a[1] && 1 > a[2]) ||
          4 <= a[0]
        )
          throw Error(
            "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
          );
      },
    };
  C.jQueryDetection();
  d["default"].fn.emulateTransitionEnd = function (a) {
    var g = this,
      c = !1;
    d["default"](this).one(C.TRANSITION_END, function () {
      c = !0;
    });
    setTimeout(function () {
      c || C.triggerTransitionEnd(g);
    }, a);
    return this;
  };
  d["default"].event.special[C.TRANSITION_END] = (function () {
    return {
      bindType: "transitionend",
      delegateType: "transitionend",
      handle: function (a) {
        if (d["default"](a.target).is(this))
          return a.handleObj.handler.apply(this, arguments);
      },
    };
  })();
  var Y = d["default"].fn.alert,
    S = (function () {
      function a(c) {
        this._element = c;
      }
      var g = a.prototype;
      g.close = function (c) {
        var a = this._element;
        c && (a = this._getRootElement(c));
        this._triggerCloseEvent(a).isDefaultPrevented() ||
          this._removeElement(a);
      };
      g.dispose = function () {
        d["default"].removeData(this._element, "bs.alert");
        this._element = null;
      };
      g._getRootElement = function (c) {
        var a = C.getSelectorFromElement(c),
          g = !1;
        a && (g = document.querySelector(a));
        g || (g = d["default"](c).closest(".alert")[0]);
        return g;
      };
      g._triggerCloseEvent = function (c) {
        var a = d["default"].Event("close.bs.alert");
        d["default"](c).trigger(a);
        return a;
      };
      g._removeElement = function (c) {
        var a = this;
        d["default"](c).removeClass("show");
        if (d["default"](c).hasClass("fade")) {
          var g = C.getTransitionDurationFromElement(c);
          d["default"](c)
            .one(C.TRANSITION_END, function (h) {
              return a._destroyElement(c, h);
            })
            .emulateTransitionEnd(g);
        } else this._destroyElement(c);
      };
      g._destroyElement = function (c) {
        d["default"](c).detach().trigger("closed.bs.alert").remove();
      };
      a._jQueryInterface = function (c) {
        return this.each(function () {
          var h = d["default"](this),
            g = h.data("bs.alert");
          g || ((g = new a(this)), h.data("bs.alert", g));
          if ("close" === c) g[c](this);
        });
      };
      a._handleDismiss = function (c) {
        return function (a) {
          a && a.preventDefault();
          c.close(this);
        };
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
      ]);
      return a;
    })();
  d["default"](document).on(
    "click.bs.alert.data-api",
    '[data-dismiss\x3d"alert"]',
    S._handleDismiss(new S())
  );
  d["default"].fn.alert = S._jQueryInterface;
  d["default"].fn.alert.Constructor = S;
  d["default"].fn.alert.noConflict = function () {
    d["default"].fn.alert = Y;
    return S._jQueryInterface;
  };
  var ga = d["default"].fn.button,
    aa = (function () {
      function a(c) {
        this._element = c;
        this.shouldAvoidTriggerChange = !1;
      }
      var g = a.prototype;
      g.toggle = function () {
        var c = !0,
          a = !0,
          g = d["default"](this._element).closest(
            '[data-toggle\x3d"buttons"]'
          )[0];
        if (g) {
          var k = this._element.querySelector('input:not([type\x3d"hidden"])');
          if (k) {
            "radio" === k.type &&
              (k.checked && this._element.classList.contains("active")
                ? (c = !1)
                : (a = g.querySelector(".active")) &&
                  d["default"](a).removeClass("active"));
            if (c) {
              if ("checkbox" === k.type || "radio" === k.type)
                k.checked = !this._element.classList.contains("active");
              this.shouldAvoidTriggerChange ||
                d["default"](k).trigger("change");
            }
            k.focus();
            a = !1;
          }
        }
        this._element.hasAttribute("disabled") ||
          this._element.classList.contains("disabled") ||
          (a &&
            this._element.setAttribute(
              "aria-pressed",
              !this._element.classList.contains("active")
            ),
          c && d["default"](this._element).toggleClass("active"));
      };
      g.dispose = function () {
        d["default"].removeData(this._element, "bs.button");
        this._element = null;
      };
      a._jQueryInterface = function (c, h) {
        return this.each(function () {
          var g = d["default"](this),
            k = g.data("bs.button");
          k || ((k = new a(this)), g.data("bs.button", k));
          k.shouldAvoidTriggerChange = h;
          if ("toggle" === c) k[c]();
        });
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
      ]);
      return a;
    })();
  d["default"](document)
    .on("click.bs.button.data-api", '[data-toggle^\x3d"button"]', function (a) {
      var g = a.target,
        c = g;
      d["default"](g).hasClass("btn") ||
        (g = d["default"](g).closest(".btn")[0]);
      if (!g || g.hasAttribute("disabled") || g.classList.contains("disabled"))
        a.preventDefault();
      else {
        var h = g.querySelector('input:not([type\x3d"hidden"])');
        h && (h.hasAttribute("disabled") || h.classList.contains("disabled"))
          ? a.preventDefault()
          : ("INPUT" !== c.tagName && "LABEL" === g.tagName) ||
            aa._jQueryInterface.call(
              d["default"](g),
              "toggle",
              "INPUT" === c.tagName
            );
      }
    })
    .on(
      "focus.bs.button.data-api blur.bs.button.data-api",
      '[data-toggle^\x3d"button"]',
      function (a) {
        var g = d["default"](a.target).closest(".btn")[0];
        d["default"](g).toggleClass("focus", /^focus(in)?$/.test(a.type));
      }
    );
  d["default"](window).on("load.bs.button.data-api", function () {
    for (
      var a = [].slice.call(
          document.querySelectorAll('[data-toggle\x3d"buttons"] .btn')
        ),
        d = 0,
        c = a.length;
      d < c;
      d++
    ) {
      var h = a[d],
        g = h.querySelector('input:not([type\x3d"hidden"])');
      g.checked || g.hasAttribute("checked")
        ? h.classList.add("active")
        : h.classList.remove("active");
    }
    a = [].slice.call(document.querySelectorAll('[data-toggle\x3d"button"]'));
    d = 0;
    for (c = a.length; d < c; d++)
      (h = a[d]),
        "true" === h.getAttribute("aria-pressed")
          ? h.classList.add("active")
          : h.classList.remove("active");
  });
  d["default"].fn.button = aa._jQueryInterface;
  d["default"].fn.button.Constructor = aa;
  d["default"].fn.button.noConflict = function () {
    d["default"].fn.button = ga;
    return aa._jQueryInterface;
  };
  var T = d["default"].fn.carousel,
    Z = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    ma = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    ea = { TOUCH: "touch", PEN: "pen" },
    E = (function () {
      function a(c, a) {
        this._activeElement = this._interval = this._items = null;
        this._isSliding = this._isPaused = !1;
        this.touchTimeout = null;
        this.touchDeltaX = this.touchStartX = 0;
        this._config = this._getConfig(a);
        this._element = c;
        this._indicatorsElement = this._element.querySelector(
          ".carousel-indicators"
        );
        this._touchSupported =
          "ontouchstart" in document.documentElement ||
          0 < navigator.maxTouchPoints;
        this._pointerEvent = !(!window.PointerEvent && !window.MSPointerEvent);
        this._addEventListeners();
      }
      var g = a.prototype;
      g.next = function () {
        this._isSliding || this._slide("next");
      };
      g.nextWhenVisible = function () {
        var c = d["default"](this._element);
        !document.hidden &&
          c.is(":visible") &&
          "hidden" !== c.css("visibility") &&
          this.next();
      };
      g.prev = function () {
        this._isSliding || this._slide("prev");
      };
      g.pause = function (c) {
        c || (this._isPaused = !0);
        this._element.querySelector(
          ".carousel-item-next, .carousel-item-prev"
        ) && (C.triggerTransitionEnd(this._element), this.cycle(!0));
        clearInterval(this._interval);
        this._interval = null;
      };
      g.cycle = function (c) {
        c || (this._isPaused = !1);
        this._interval &&
          (clearInterval(this._interval), (this._interval = null));
        this._config.interval &&
          !this._isPaused &&
          (this._updateInterval(),
          (this._interval = setInterval(
            (document.visibilityState ? this.nextWhenVisible : this.next).bind(
              this
            ),
            this._config.interval
          )));
      };
      g.to = function (c) {
        var a = this;
        this._activeElement = this._element.querySelector(
          ".active.carousel-item"
        );
        var g = this._getItemIndex(this._activeElement);
        if (!(c > this._items.length - 1 || 0 > c))
          if (this._isSliding)
            d["default"](this._element).one("slid.bs.carousel", function () {
              return a.to(c);
            });
          else
            g === c
              ? (this.pause(), this.cycle())
              : this._slide(c > g ? "next" : "prev", this._items[c]);
      };
      g.dispose = function () {
        d["default"](this._element).off(".bs.carousel");
        d["default"].removeData(this._element, "bs.carousel");
        this._indicatorsElement =
          this._activeElement =
          this._isSliding =
          this._isPaused =
          this._interval =
          this._element =
          this._config =
          this._items =
            null;
      };
      g._getConfig = function (c) {
        c = w({}, Z, c);
        C.typeCheckConfig("carousel", c, ma);
        return c;
      };
      g._handleSwipe = function () {
        var c = Math.abs(this.touchDeltaX);
        40 >= c ||
          ((c /= this.touchDeltaX),
          (this.touchDeltaX = 0),
          0 < c && this.prev(),
          0 > c && this.next());
      };
      g._addEventListeners = function () {
        var c = this;
        if (this._config.keyboard)
          d["default"](this._element).on("keydown.bs.carousel", function (a) {
            return c._keydown(a);
          });
        if ("hover" === this._config.pause)
          d["default"](this._element)
            .on("mouseenter.bs.carousel", function (a) {
              return c.pause(a);
            })
            .on("mouseleave.bs.carousel", function (a) {
              return c.cycle(a);
            });
        this._config.touch && this._addTouchEventListeners();
      };
      g._addTouchEventListeners = function () {
        var c = this;
        if (this._touchSupported) {
          var a = function (a) {
              c._pointerEvent && ea[a.originalEvent.pointerType.toUpperCase()]
                ? (c.touchStartX = a.originalEvent.clientX)
                : c._pointerEvent ||
                  (c.touchStartX = a.originalEvent.touches[0].clientX);
            },
            g = function (a) {
              c._pointerEvent &&
                ea[a.originalEvent.pointerType.toUpperCase()] &&
                (c.touchDeltaX = a.originalEvent.clientX - c.touchStartX);
              c._handleSwipe();
              "hover" === c._config.pause &&
                (c.pause(),
                c.touchTimeout && clearTimeout(c.touchTimeout),
                (c.touchTimeout = setTimeout(function (a) {
                  return c.cycle(a);
                }, 500 + c._config.interval)));
            };
          d["default"](this._element.querySelectorAll(".carousel-item img")).on(
            "dragstart.bs.carousel",
            function (c) {
              return c.preventDefault();
            }
          );
          this._pointerEvent
            ? (d["default"](this._element).on(
                "pointerdown.bs.carousel",
                function (c) {
                  return a(c);
                }
              ),
              d["default"](this._element).on(
                "pointerup.bs.carousel",
                function (c) {
                  return g(c);
                }
              ),
              this._element.classList.add("pointer-event"))
            : (d["default"](this._element).on(
                "touchstart.bs.carousel",
                function (c) {
                  return a(c);
                }
              ),
              d["default"](this._element).on(
                "touchmove.bs.carousel",
                function (a) {
                  c.touchDeltaX =
                    a.originalEvent.touches &&
                    1 < a.originalEvent.touches.length
                      ? 0
                      : a.originalEvent.touches[0].clientX - c.touchStartX;
                }
              ),
              d["default"](this._element).on(
                "touchend.bs.carousel",
                function (c) {
                  return g(c);
                }
              ));
        }
      };
      g._keydown = function (c) {
        if (!/input|textarea/i.test(c.target.tagName))
          switch (c.which) {
            case 37:
              c.preventDefault();
              this.prev();
              break;
            case 39:
              c.preventDefault(), this.next();
          }
      };
      g._getItemIndex = function (c) {
        this._items =
          c && c.parentNode
            ? [].slice.call(c.parentNode.querySelectorAll(".carousel-item"))
            : [];
        return this._items.indexOf(c);
      };
      g._getItemByDirection = function (c, a) {
        var d = "next" === c,
          h = "prev" === c,
          g = this._getItemIndex(a),
          k = this._items.length - 1;
        if (((h && 0 === g) || (d && g === k)) && !this._config.wrap) return a;
        c = (g + ("prev" === c ? -1 : 1)) % this._items.length;
        return -1 === c ? this._items[this._items.length - 1] : this._items[c];
      };
      g._triggerSlideEvent = function (c, a) {
        var h = this._getItemIndex(c),
          g = this._getItemIndex(
            this._element.querySelector(".active.carousel-item")
          );
        c = d["default"].Event("slide.bs.carousel", {
          relatedTarget: c,
          direction: a,
          from: g,
          to: h,
        });
        d["default"](this._element).trigger(c);
        return c;
      };
      g._setActiveIndicatorElement = function (c) {
        if (this._indicatorsElement) {
          var a = [].slice.call(
            this._indicatorsElement.querySelectorAll(".active")
          );
          d["default"](a).removeClass("active");
          (c = this._indicatorsElement.children[this._getItemIndex(c)]) &&
            d["default"](c).addClass("active");
        }
      };
      g._updateInterval = function () {
        var c =
          this._activeElement ||
          this._element.querySelector(".active.carousel-item");
        c &&
          ((c = parseInt(c.getAttribute("data-interval"), 10))
            ? ((this._config.defaultInterval =
                this._config.defaultInterval || this._config.interval),
              (this._config.interval = c))
            : (this._config.interval =
                this._config.defaultInterval || this._config.interval));
      };
      g._slide = function (c, a) {
        var h = this,
          g = this._element.querySelector(".active.carousel-item"),
          k = this._getItemIndex(g),
          f = a || (g && this._getItemByDirection(c, g)),
          l = this._getItemIndex(f);
        a = !!this._interval;
        var n, x;
        "next" === c
          ? ((n = "carousel-item-left"),
            (x = "carousel-item-next"),
            (c = "left"))
          : ((n = "carousel-item-right"),
            (x = "carousel-item-prev"),
            (c = "right"));
        if (f && d["default"](f).hasClass("active")) this._isSliding = !1;
        else if (
          !this._triggerSlideEvent(f, c).isDefaultPrevented() &&
          g &&
          f
        ) {
          this._isSliding = !0;
          a && this.pause();
          this._setActiveIndicatorElement(f);
          this._activeElement = f;
          var m = d["default"].Event("slid.bs.carousel", {
            relatedTarget: f,
            direction: c,
            from: k,
            to: l,
          });
          d["default"](this._element).hasClass("slide")
            ? (d["default"](f).addClass(x),
              C.reflow(f),
              d["default"](g).addClass(n),
              d["default"](f).addClass(n),
              (k = C.getTransitionDurationFromElement(g)),
              d["default"](g)
                .one(C.TRANSITION_END, function () {
                  d["default"](f)
                    .removeClass(n + " " + x)
                    .addClass("active");
                  d["default"](g).removeClass("active " + x + " " + n);
                  h._isSliding = !1;
                  setTimeout(function () {
                    return d["default"](h._element).trigger(m);
                  }, 0);
                })
                .emulateTransitionEnd(k))
            : (d["default"](g).removeClass("active"),
              d["default"](f).addClass("active"),
              (this._isSliding = !1),
              d["default"](this._element).trigger(m));
          a && this.cycle();
        }
      };
      a._jQueryInterface = function (c) {
        return this.each(function () {
          var h = d["default"](this).data("bs.carousel"),
            g = w({}, Z, d["default"](this).data());
          "object" === typeof c && (g = w({}, g, c));
          var k = "string" === typeof c ? c : g.slide;
          h ||
            ((h = new a(this, g)), d["default"](this).data("bs.carousel", h));
          if ("number" === typeof c) h.to(c);
          else if ("string" === typeof k) {
            if ("undefined" === typeof h[k])
              throw new TypeError('No method named "' + k + '"');
            h[k]();
          } else g.interval && g.ride && (h.pause(), h.cycle());
        });
      };
      a._dataApiClickHandler = function (c) {
        var h = C.getSelectorFromElement(this);
        if (
          h &&
          (h = d["default"](h)[0]) &&
          d["default"](h).hasClass("carousel")
        ) {
          var g = w({}, d["default"](h).data(), d["default"](this).data()),
            k = this.getAttribute("data-slide-to");
          k && (g.interval = !1);
          a._jQueryInterface.call(d["default"](h), g);
          k && d["default"](h).data("bs.carousel").to(k);
          c.preventDefault();
        }
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return Z;
          },
        },
      ]);
      return a;
    })();
  d["default"](document).on(
    "click.bs.carousel.data-api",
    "[data-slide], [data-slide-to]",
    E._dataApiClickHandler
  );
  d["default"](window).on("load.bs.carousel.data-api", function () {
    for (
      var a = [].slice.call(
          document.querySelectorAll('[data-ride\x3d"carousel"]')
        ),
        g = 0,
        c = a.length;
      g < c;
      g++
    ) {
      var h = d["default"](a[g]);
      E._jQueryInterface.call(h, h.data());
    }
  });
  d["default"].fn.carousel = E._jQueryInterface;
  d["default"].fn.carousel.Constructor = E;
  d["default"].fn.carousel.noConflict = function () {
    d["default"].fn.carousel = T;
    return E._jQueryInterface;
  };
  var ca = d["default"].fn.collapse,
    X = { toggle: !0, parent: "" },
    m = { toggle: "boolean", parent: "(string|element)" },
    u = (function () {
      function a(c, a) {
        this._isTransitioning = !1;
        this._element = c;
        this._config = this._getConfig(a);
        this._triggerArray = [].slice.call(
          document.querySelectorAll(
            '[data-toggle\x3d"collapse"][href\x3d"#' +
              c.id +
              '"],' +
              ('[data-toggle\x3d"collapse"][data-target\x3d"#' + c.id + '"]')
          )
        );
        a = [].slice.call(
          document.querySelectorAll('[data-toggle\x3d"collapse"]')
        );
        for (var d = 0, h = a.length; d < h; d++) {
          var g = a[d],
            k = C.getSelectorFromElement(g),
            l = [].slice
              .call(document.querySelectorAll(k))
              .filter(function (a) {
                return a === c;
              });
          null !== k &&
            0 < l.length &&
            ((this._selector = k), this._triggerArray.push(g));
        }
        this._parent = this._config.parent ? this._getParent() : null;
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        this._config.toggle && this.toggle();
      }
      var g = a.prototype;
      g.toggle = function () {
        d["default"](this._element).hasClass("show")
          ? this.hide()
          : this.show();
      };
      g.show = function () {
        var c = this;
        if (
          !this._isTransitioning &&
          !d["default"](this._element).hasClass("show")
        ) {
          var h, g;
          this._parent &&
            ((h = [].slice
              .call(this._parent.querySelectorAll(".show, .collapsing"))
              .filter(function (a) {
                return "string" === typeof c._config.parent
                  ? a.getAttribute("data-parent") === c._config.parent
                  : a.classList.contains("collapse");
              })),
            0 === h.length && (h = null));
          if (
            h &&
            (g = d["default"](h).not(this._selector).data("bs.collapse")) &&
            g._isTransitioning
          )
            return;
          var k = d["default"].Event("show.bs.collapse");
          d["default"](this._element).trigger(k);
          if (!k.isDefaultPrevented()) {
            h &&
              (a._jQueryInterface.call(
                d["default"](h).not(this._selector),
                "hide"
              ),
              g || d["default"](h).data("bs.collapse", null));
            var f = this._getDimension();
            d["default"](this._element)
              .removeClass("collapse")
              .addClass("collapsing");
            this._element.style[f] = 0;
            this._triggerArray.length &&
              d["default"](this._triggerArray)
                .removeClass("collapsed")
                .attr("aria-expanded", !0);
            this.setTransitioning(!0);
            h = "scroll" + (f[0].toUpperCase() + f.slice(1));
            g = C.getTransitionDurationFromElement(this._element);
            d["default"](this._element)
              .one(C.TRANSITION_END, function () {
                d["default"](c._element)
                  .removeClass("collapsing")
                  .addClass("collapse show");
                c._element.style[f] = "";
                c.setTransitioning(!1);
                d["default"](c._element).trigger("shown.bs.collapse");
              })
              .emulateTransitionEnd(g);
            this._element.style[f] = this._element[h] + "px";
          }
        }
      };
      g.hide = function () {
        var c = this;
        if (
          !this._isTransitioning &&
          d["default"](this._element).hasClass("show")
        ) {
          var a = d["default"].Event("hide.bs.collapse");
          d["default"](this._element).trigger(a);
          if (!a.isDefaultPrevented()) {
            a = this._getDimension();
            this._element.style[a] =
              this._element.getBoundingClientRect()[a] + "px";
            C.reflow(this._element);
            d["default"](this._element)
              .addClass("collapsing")
              .removeClass("collapse show");
            var g = this._triggerArray.length;
            if (0 < g)
              for (var k = 0; k < g; k++) {
                var f = this._triggerArray[k],
                  n = C.getSelectorFromElement(f);
                null !== n &&
                  (d["default"](
                    [].slice.call(document.querySelectorAll(n))
                  ).hasClass("show") ||
                    d["default"](f)
                      .addClass("collapsed")
                      .attr("aria-expanded", !1));
              }
            this.setTransitioning(!0);
            this._element.style[a] = "";
            a = C.getTransitionDurationFromElement(this._element);
            d["default"](this._element)
              .one(C.TRANSITION_END, function () {
                c.setTransitioning(!1);
                d["default"](c._element)
                  .removeClass("collapsing")
                  .addClass("collapse")
                  .trigger("hidden.bs.collapse");
              })
              .emulateTransitionEnd(a);
          }
        }
      };
      g.setTransitioning = function (c) {
        this._isTransitioning = c;
      };
      g.dispose = function () {
        d["default"].removeData(this._element, "bs.collapse");
        this._isTransitioning =
          this._triggerArray =
          this._element =
          this._parent =
          this._config =
            null;
      };
      g._getConfig = function (c) {
        c = w({}, X, c);
        c.toggle = !!c.toggle;
        C.typeCheckConfig("collapse", c, m);
        return c;
      };
      g._getDimension = function () {
        return d["default"](this._element).hasClass("width")
          ? "width"
          : "height";
      };
      g._getParent = function () {
        var c = this,
          h;
        C.isElement(this._config.parent)
          ? ((h = this._config.parent),
            "undefined" !== typeof this._config.parent.jquery &&
              (h = this._config.parent[0]))
          : (h = document.querySelector(this._config.parent));
        var g = [].slice.call(
          h.querySelectorAll(
            '[data-toggle\x3d"collapse"][data-parent\x3d"' +
              this._config.parent +
              '"]'
          )
        );
        d["default"](g).each(function (d, h) {
          c._addAriaAndCollapsedClass(a._getTargetFromElement(h), [h]);
        });
        return h;
      };
      g._addAriaAndCollapsedClass = function (c, a) {
        c = d["default"](c).hasClass("show");
        a.length &&
          d["default"](a).toggleClass("collapsed", !c).attr("aria-expanded", c);
      };
      a._getTargetFromElement = function (c) {
        return (c = C.getSelectorFromElement(c))
          ? document.querySelector(c)
          : null;
      };
      a._jQueryInterface = function (c) {
        return this.each(function () {
          var h = d["default"](this),
            g = h.data("bs.collapse"),
            k = w({}, X, h.data(), "object" === typeof c && c ? c : {});
          !g &&
            k.toggle &&
            "string" === typeof c &&
            /show|hide/.test(c) &&
            (k.toggle = !1);
          g || ((g = new a(this, k)), h.data("bs.collapse", g));
          if ("string" === typeof c) {
            if ("undefined" === typeof g[c])
              throw new TypeError('No method named "' + c + '"');
            g[c]();
          }
        });
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return X;
          },
        },
      ]);
      return a;
    })();
  d["default"](document).on(
    "click.bs.collapse.data-api",
    '[data-toggle\x3d"collapse"]',
    function (a) {
      "A" === a.currentTarget.tagName && a.preventDefault();
      var g = d["default"](this);
      a = C.getSelectorFromElement(this);
      a = [].slice.call(document.querySelectorAll(a));
      d["default"](a).each(function () {
        var c = d["default"](this),
          a = c.data("bs.collapse") ? "toggle" : g.data();
        u._jQueryInterface.call(c, a);
      });
    }
  );
  d["default"].fn.collapse = u._jQueryInterface;
  d["default"].fn.collapse.Constructor = u;
  d["default"].fn.collapse.noConflict = function () {
    d["default"].fn.collapse = ca;
    return u._jQueryInterface;
  };
  var G = d["default"].fn.dropdown,
    D = /38|40|27/,
    ja = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
    },
    sa = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
      popperConfig: "(null|object)",
    },
    R = (function () {
      function a(c, a) {
        this._element = c;
        this._popper = null;
        this._config = this._getConfig(a);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();
        this._addEventListeners();
      }
      var g = a.prototype;
      g.toggle = function () {
        if (
          !this._element.disabled &&
          !d["default"](this._element).hasClass("disabled")
        ) {
          var c = d["default"](this._menu).hasClass("show");
          a._clearMenus();
          c || this.show(!0);
        }
      };
      g.show = function (c) {
        void 0 === c && (c = !1);
        if (
          !(
            this._element.disabled ||
            d["default"](this._element).hasClass("disabled") ||
            d["default"](this._menu).hasClass("show")
          )
        ) {
          var h = { relatedTarget: this._element },
            g = d["default"].Event("show.bs.dropdown", h),
            k = a._getParentFromElement(this._element);
          d["default"](k).trigger(g);
          if (!g.isDefaultPrevented()) {
            if (!this._inNavbar && c) {
              if ("undefined" === typeof I["default"])
                throw new TypeError(
                  "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                );
              c = this._element;
              "parent" === this._config.reference
                ? (c = k)
                : C.isElement(this._config.reference) &&
                  ((c = this._config.reference),
                  "undefined" !== typeof this._config.reference.jquery &&
                    (c = this._config.reference[0]));
              "scrollParent" !== this._config.boundary &&
                d["default"](k).addClass("position-static");
              this._popper = new I["default"](
                c,
                this._menu,
                this._getPopperConfig()
              );
            }
            if (
              "ontouchstart" in document.documentElement &&
              0 === d["default"](k).closest(".navbar-nav").length
            )
              d["default"](document.body)
                .children()
                .on("mouseover", null, d["default"].noop);
            this._element.focus();
            this._element.setAttribute("aria-expanded", !0);
            d["default"](this._menu).toggleClass("show");
            d["default"](k)
              .toggleClass("show")
              .trigger(d["default"].Event("shown.bs.dropdown", h));
          }
        }
      };
      g.hide = function () {
        if (
          !this._element.disabled &&
          !d["default"](this._element).hasClass("disabled") &&
          d["default"](this._menu).hasClass("show")
        ) {
          var c = { relatedTarget: this._element },
            h = d["default"].Event("hide.bs.dropdown", c),
            g = a._getParentFromElement(this._element);
          d["default"](g).trigger(h);
          h.isDefaultPrevented() ||
            (this._popper && this._popper.destroy(),
            d["default"](this._menu).toggleClass("show"),
            d["default"](g)
              .toggleClass("show")
              .trigger(d["default"].Event("hidden.bs.dropdown", c)));
        }
      };
      g.dispose = function () {
        d["default"].removeData(this._element, "bs.dropdown");
        d["default"](this._element).off(".bs.dropdown");
        this._menu = this._element = null;
        null !== this._popper &&
          (this._popper.destroy(), (this._popper = null));
      };
      g.update = function () {
        this._inNavbar = this._detectNavbar();
        null !== this._popper && this._popper.scheduleUpdate();
      };
      g._addEventListeners = function () {
        var c = this;
        d["default"](this._element).on("click.bs.dropdown", function (a) {
          a.preventDefault();
          a.stopPropagation();
          c.toggle();
        });
      };
      g._getConfig = function (c) {
        c = w(
          {},
          this.constructor.Default,
          d["default"](this._element).data(),
          c
        );
        C.typeCheckConfig("dropdown", c, this.constructor.DefaultType);
        return c;
      };
      g._getMenuElement = function () {
        if (!this._menu) {
          var c = a._getParentFromElement(this._element);
          c && (this._menu = c.querySelector(".dropdown-menu"));
        }
        return this._menu;
      };
      g._getPlacement = function () {
        var c = d["default"](this._element.parentNode),
          a = "bottom-start";
        c.hasClass("dropup")
          ? (a = d["default"](this._menu).hasClass("dropdown-menu-right")
              ? "top-end"
              : "top-start")
          : c.hasClass("dropright")
          ? (a = "right-start")
          : c.hasClass("dropleft")
          ? (a = "left-start")
          : d["default"](this._menu).hasClass("dropdown-menu-right") &&
            (a = "bottom-end");
        return a;
      };
      g._detectNavbar = function () {
        return 0 < d["default"](this._element).closest(".navbar").length;
      };
      g._getOffset = function () {
        var c = this,
          a = {};
        "function" === typeof this._config.offset
          ? (a.fn = function (a) {
              a.offsets = w(
                {},
                a.offsets,
                c._config.offset(a.offsets, c._element)
              );
              return a;
            })
          : (a.offset = this._config.offset);
        return a;
      };
      g._getPopperConfig = function () {
        var c = {
          placement: this._getPlacement(),
          modifiers: {
            offset: this._getOffset(),
            flip: { enabled: this._config.flip },
            preventOverflow: { boundariesElement: this._config.boundary },
          },
        };
        "static" === this._config.display &&
          (c.modifiers.applyStyle = { enabled: !1 });
        return w({}, c, this._config.popperConfig);
      };
      a._jQueryInterface = function (c) {
        return this.each(function () {
          var h = d["default"](this).data("bs.dropdown"),
            g = "object" === typeof c ? c : null;
          h ||
            ((h = new a(this, g)), d["default"](this).data("bs.dropdown", h));
          if ("string" === typeof c) {
            if ("undefined" === typeof h[c])
              throw new TypeError('No method named "' + c + '"');
            h[c]();
          }
        });
      };
      a._clearMenus = function (c) {
        if (!c || (3 !== c.which && ("keyup" !== c.type || 9 === c.which)))
          for (
            var h = [].slice.call(
                document.querySelectorAll('[data-toggle\x3d"dropdown"]')
              ),
              g = 0,
              k = h.length;
            g < k;
            g++
          ) {
            var f = a._getParentFromElement(h[g]),
              n = d["default"](h[g]).data("bs.dropdown"),
              l = { relatedTarget: h[g] };
            c && "click" === c.type && (l.clickEvent = c);
            if (n) {
              var x = n._menu;
              if (
                d["default"](f).hasClass("show") &&
                !(
                  c &&
                  (("click" === c.type &&
                    /input|textarea/i.test(c.target.tagName)) ||
                    ("keyup" === c.type && 9 === c.which)) &&
                  d["default"].contains(f, c.target)
                )
              ) {
                var m = d["default"].Event("hide.bs.dropdown", l);
                d["default"](f).trigger(m);
                m.isDefaultPrevented() ||
                  ("ontouchstart" in document.documentElement &&
                    d["default"](document.body)
                      .children()
                      .off("mouseover", null, d["default"].noop),
                  h[g].setAttribute("aria-expanded", "false"),
                  n._popper && n._popper.destroy(),
                  d["default"](x).removeClass("show"),
                  d["default"](f)
                    .removeClass("show")
                    .trigger(d["default"].Event("hidden.bs.dropdown", l)));
              }
            }
          }
      };
      a._getParentFromElement = function (c) {
        var a,
          d = C.getSelectorFromElement(c);
        d && (a = document.querySelector(d));
        return a || c.parentNode;
      };
      a._dataApiKeydownHandler = function (c) {
        if (
          !(
            (/input|textarea/i.test(c.target.tagName)
              ? 32 === c.which ||
                (27 !== c.which &&
                  ((40 !== c.which && 38 !== c.which) ||
                    d["default"](c.target).closest(".dropdown-menu").length))
              : !D.test(c.which)) ||
            this.disabled ||
            d["default"](this).hasClass("disabled")
          )
        ) {
          var h = a._getParentFromElement(this),
            g = d["default"](h).hasClass("show");
          (!g && 27 === c.which) ||
            0 < f(c.target).closest(".bootstrap-select").length ||
            (c.preventDefault(),
            c.stopPropagation(),
            g && 27 !== c.which && 32 !== c.which
              ? ((h = [].slice
                  .call(
                    h.querySelectorAll(
                      ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                    )
                  )
                  .filter(function (c) {
                    return d["default"](c).is(":visible");
                  })),
                0 !== h.length &&
                  ((g = h.indexOf(c.target)),
                  38 === c.which && 0 < g && g--,
                  40 === c.which && g < h.length - 1 && g++,
                  0 > g && (g = 0),
                  h[g].focus()))
              : (27 === c.which &&
                  d["default"](
                    h.querySelector('[data-toggle\x3d"dropdown"]')
                  ).trigger("focus"),
                d["default"](this).trigger("click")));
        }
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return ja;
          },
        },
        {
          key: "DefaultType",
          get: function () {
            return sa;
          },
        },
      ]);
      return a;
    })();
  d["default"](document)
    .on(
      "keydown.bs.dropdown.data-api",
      '[data-toggle\x3d"dropdown"]',
      R._dataApiKeydownHandler
    )
    .on(
      "keydown.bs.dropdown.data-api",
      ".dropdown-menu",
      R._dataApiKeydownHandler
    )
    .on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", R._clearMenus)
    .on(
      "click.bs.dropdown.data-api",
      '[data-toggle\x3d"dropdown"]',
      function (a) {
        a.preventDefault();
        a.stopPropagation();
        R._jQueryInterface.call(d["default"](this), "toggle");
      }
    )
    .on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
      a.stopPropagation();
    });
  d["default"].fn.dropdown = R._jQueryInterface;
  d["default"].fn.dropdown.Constructor = R;
  d["default"].fn.dropdown.noConflict = function () {
    d["default"].fn.dropdown = G;
    return R._jQueryInterface;
  };
  var ta = d["default"].fn.modal,
    H = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    ya = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    J = (function () {
      function a(c, a) {
        this._config = this._getConfig(a);
        this._element = c;
        this._dialog = c.querySelector(".modal-dialog");
        this._backdrop = null;
        this._isTransitioning =
          this._ignoreBackdropClick =
          this._isBodyOverflowing =
          this._isShown =
            !1;
        this._scrollbarWidth = 0;
      }
      var g = a.prototype;
      g.toggle = function (c) {
        return this._isShown ? this.hide() : this.show(c);
      };
      g.show = function (c) {
        var a = this;
        if (!this._isShown && !this._isTransitioning) {
          var g = d["default"].Event("show.bs.modal", { relatedTarget: c });
          d["default"](this._element).trigger(g);
          g.isDefaultPrevented() ||
            ((this._isShown = !0),
            d["default"](this._element).hasClass("fade") &&
              (this._isTransitioning = !0),
            this._checkScrollbar(),
            this._setScrollbar(),
            this._adjustDialog(),
            this._setEscapeEvent(),
            this._setResizeEvent(),
            d["default"](this._element).on(
              "click.dismiss.bs.modal",
              '[data-dismiss\x3d"modal"]',
              function (c) {
                return a.hide(c);
              }
            ),
            d["default"](this._dialog).on(
              "mousedown.dismiss.bs.modal",
              function () {
                d["default"](a._element).one(
                  "mouseup.dismiss.bs.modal",
                  function (c) {
                    d["default"](c.target).is(a._element) &&
                      (a._ignoreBackdropClick = !0);
                  }
                );
              }
            ),
            this._showBackdrop(function () {
              return a._showElement(c);
            }));
        }
      };
      g.hide = function (c) {
        var a = this;
        c && c.preventDefault();
        if (
          this._isShown &&
          !this._isTransitioning &&
          ((c = d["default"].Event("hide.bs.modal")),
          d["default"](this._element).trigger(c),
          this._isShown && !c.isDefaultPrevented())
        ) {
          this._isShown = !1;
          if ((c = d["default"](this._element).hasClass("fade")))
            this._isTransitioning = !0;
          this._setEscapeEvent();
          this._setResizeEvent();
          d["default"](document).off("focusin.bs.modal");
          d["default"](this._element).removeClass("show");
          d["default"](this._element).off("click.dismiss.bs.modal");
          d["default"](this._dialog).off("mousedown.dismiss.bs.modal");
          c
            ? ((c = C.getTransitionDurationFromElement(this._element)),
              d["default"](this._element)
                .one(C.TRANSITION_END, function (c) {
                  return a._hideModal(c);
                })
                .emulateTransitionEnd(c))
            : this._hideModal();
        }
      };
      g.dispose = function () {
        [window, this._element, this._dialog].forEach(function (c) {
          return d["default"](c).off(".bs.modal");
        });
        d["default"](document).off("focusin.bs.modal");
        d["default"].removeData(this._element, "bs.modal");
        this._scrollbarWidth =
          this._isTransitioning =
          this._ignoreBackdropClick =
          this._isBodyOverflowing =
          this._isShown =
          this._backdrop =
          this._dialog =
          this._element =
          this._config =
            null;
      };
      g.handleUpdate = function () {
        this._adjustDialog();
      };
      g._getConfig = function (c) {
        c = w({}, H, c);
        C.typeCheckConfig("modal", c, ya);
        return c;
      };
      g._triggerBackdropTransition = function () {
        var c = this,
          a = d["default"].Event("hidePrevented.bs.modal");
        d["default"](this._element).trigger(a);
        if (!a.isDefaultPrevented()) {
          var g =
            this._element.scrollHeight > document.documentElement.clientHeight;
          g || (this._element.style.overflowY = "hidden");
          this._element.classList.add("modal-static");
          var k = C.getTransitionDurationFromElement(this._dialog);
          d["default"](this._element).off(C.TRANSITION_END);
          d["default"](this._element)
            .one(C.TRANSITION_END, function () {
              c._element.classList.remove("modal-static");
              g ||
                d["default"](c._element)
                  .one(C.TRANSITION_END, function () {
                    c._element.style.overflowY = "";
                  })
                  .emulateTransitionEnd(c._element, k);
            })
            .emulateTransitionEnd(k);
          this._element.focus();
        }
      };
      g._showElement = function (c) {
        var a = this,
          g = d["default"](this._element).hasClass("fade"),
          k = this._dialog ? this._dialog.querySelector(".modal-body") : null;
        (this._element.parentNode &&
          this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
          document.body.appendChild(this._element);
        this._element.style.display = "block";
        this._element.removeAttribute("aria-hidden");
        this._element.setAttribute("aria-modal", !0);
        this._element.setAttribute("role", "dialog");
        d["default"](this._dialog).hasClass("modal-dialog-scrollable") && k
          ? (k.scrollTop = 0)
          : (this._element.scrollTop = 0);
        g && C.reflow(this._element);
        d["default"](this._element).addClass("show");
        this._config.focus && this._enforceFocus();
        var f = d["default"].Event("shown.bs.modal", { relatedTarget: c });
        c = function () {
          a._config.focus && a._element.focus();
          a._isTransitioning = !1;
          d["default"](a._element).trigger(f);
        };
        g
          ? ((g = C.getTransitionDurationFromElement(this._dialog)),
            d["default"](this._dialog)
              .one(C.TRANSITION_END, c)
              .emulateTransitionEnd(g))
          : c();
      };
      g._enforceFocus = function () {
        var c = this;
        d["default"](document)
          .off("focusin.bs.modal")
          .on("focusin.bs.modal", function (a) {
            document !== a.target &&
              c._element !== a.target &&
              0 === d["default"](c._element).has(a.target).length &&
              c._element.focus();
          });
      };
      g._setEscapeEvent = function () {
        var c = this;
        if (this._isShown)
          d["default"](this._element).on(
            "keydown.dismiss.bs.modal",
            function (a) {
              c._config.keyboard && 27 === a.which
                ? (a.preventDefault(), c.hide())
                : c._config.keyboard ||
                  27 !== a.which ||
                  c._triggerBackdropTransition();
            }
          );
        else
          this._isShown ||
            d["default"](this._element).off("keydown.dismiss.bs.modal");
      };
      g._setResizeEvent = function () {
        var c = this;
        if (this._isShown)
          d["default"](window).on("resize.bs.modal", function (a) {
            return c.handleUpdate(a);
          });
        else d["default"](window).off("resize.bs.modal");
      };
      g._hideModal = function () {
        var c = this;
        this._element.style.display = "none";
        this._element.setAttribute("aria-hidden", !0);
        this._element.removeAttribute("aria-modal");
        this._element.removeAttribute("role");
        this._isTransitioning = !1;
        this._showBackdrop(function () {
          d["default"](document.body).removeClass("modal-open");
          c._resetAdjustments();
          c._resetScrollbar();
          d["default"](c._element).trigger("hidden.bs.modal");
        });
      };
      g._removeBackdrop = function () {
        this._backdrop &&
          (d["default"](this._backdrop).remove(), (this._backdrop = null));
      };
      g._showBackdrop = function (c) {
        var a = this,
          g = d["default"](this._element).hasClass("fade") ? "fade" : "";
        if (this._isShown && this._config.backdrop)
          (this._backdrop = document.createElement("div")),
            (this._backdrop.className = "modal-backdrop"),
            g && this._backdrop.classList.add(g),
            d["default"](this._backdrop).appendTo(document.body),
            d["default"](this._element).on(
              "click.dismiss.bs.modal",
              function (c) {
                a._ignoreBackdropClick
                  ? (a._ignoreBackdropClick = !1)
                  : c.target === c.currentTarget &&
                    ("static" === a._config.backdrop
                      ? a._triggerBackdropTransition()
                      : a.hide());
              }
            ),
            g && C.reflow(this._backdrop),
            d["default"](this._backdrop).addClass("show"),
            c &&
              (g
                ? ((g = C.getTransitionDurationFromElement(this._backdrop)),
                  d["default"](this._backdrop)
                    .one(C.TRANSITION_END, c)
                    .emulateTransitionEnd(g))
                : c());
        else if (!this._isShown && this._backdrop)
          if (
            (d["default"](this._backdrop).removeClass("show"),
            (g = function () {
              a._removeBackdrop();
              c && c();
            }),
            d["default"](this._element).hasClass("fade"))
          ) {
            var k = C.getTransitionDurationFromElement(this._backdrop);
            d["default"](this._backdrop)
              .one(C.TRANSITION_END, g)
              .emulateTransitionEnd(k);
          } else g();
        else c && c();
      };
      g._adjustDialog = function () {
        var c =
          this._element.scrollHeight > document.documentElement.clientHeight;
        !this._isBodyOverflowing &&
          c &&
          (this._element.style.paddingLeft = this._scrollbarWidth + "px");
        this._isBodyOverflowing &&
          !c &&
          (this._element.style.paddingRight = this._scrollbarWidth + "px");
      };
      g._resetAdjustments = function () {
        this._element.style.paddingLeft = "";
        this._element.style.paddingRight = "";
      };
      g._checkScrollbar = function () {
        var c = document.body.getBoundingClientRect();
        this._isBodyOverflowing =
          Math.round(c.left + c.right) < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };
      g._setScrollbar = function () {
        var c = this;
        if (this._isBodyOverflowing) {
          var a = [].slice.call(
              document.querySelectorAll(
                ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
              )
            ),
            g = [].slice.call(document.querySelectorAll(".sticky-top"));
          d["default"](a).each(function (a, h) {
            a = h.style.paddingRight;
            var g = d["default"](h).css("padding-right");
            d["default"](h)
              .data("padding-right", a)
              .css("padding-right", parseFloat(g) + c._scrollbarWidth + "px");
          });
          d["default"](g).each(function (a, h) {
            a = h.style.marginRight;
            var g = d["default"](h).css("margin-right");
            d["default"](h)
              .data("margin-right", a)
              .css("margin-right", parseFloat(g) - c._scrollbarWidth + "px");
          });
          a = document.body.style.paddingRight;
          g = d["default"](document.body).css("padding-right");
          d["default"](document.body)
            .data("padding-right", a)
            .css("padding-right", parseFloat(g) + this._scrollbarWidth + "px");
        }
        d["default"](document.body).addClass("modal-open");
      };
      g._resetScrollbar = function () {
        var c = [].slice.call(
          document.querySelectorAll(
            ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
          )
        );
        d["default"](c).each(function (c, a) {
          c = d["default"](a).data("padding-right");
          d["default"](a).removeData("padding-right");
          a.style.paddingRight = c ? c : "";
        });
        c = [].slice.call(document.querySelectorAll(".sticky-top"));
        d["default"](c).each(function (c, a) {
          c = d["default"](a).data("margin-right");
          "undefined" !== typeof c &&
            d["default"](a).css("margin-right", c).removeData("margin-right");
        });
        c = d["default"](document.body).data("padding-right");
        d["default"](document.body).removeData("padding-right");
        document.body.style.paddingRight = c ? c : "";
      };
      g._getScrollbarWidth = function () {
        var c = document.createElement("div");
        c.className = "modal-scrollbar-measure";
        document.body.appendChild(c);
        var a = c.getBoundingClientRect().width - c.clientWidth;
        document.body.removeChild(c);
        return a;
      };
      a._jQueryInterface = function (c, h) {
        return this.each(function () {
          var g = d["default"](this).data("bs.modal"),
            k = w(
              {},
              H,
              d["default"](this).data(),
              "object" === typeof c && c ? c : {}
            );
          g || ((g = new a(this, k)), d["default"](this).data("bs.modal", g));
          if ("string" === typeof c) {
            if ("undefined" === typeof g[c])
              throw new TypeError('No method named "' + c + '"');
            g[c](h);
          } else k.show && g.show(h);
        });
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return H;
          },
        },
      ]);
      return a;
    })();
  d["default"](document).on(
    "click.bs.modal.data-api",
    '[data-toggle\x3d"modal"]',
    function (a) {
      var g = this,
        c,
        h = C.getSelectorFromElement(this);
      h && (c = document.querySelector(h));
      h = d["default"](c).data("bs.modal")
        ? "toggle"
        : w({}, d["default"](c).data(), d["default"](this).data());
      ("A" !== this.tagName && "AREA" !== this.tagName) || a.preventDefault();
      var k = d["default"](c).one("show.bs.modal", function (c) {
        if (!c.isDefaultPrevented())
          k.one("hidden.bs.modal", function () {
            d["default"](g).is(":visible") && g.focus();
          });
      });
      J._jQueryInterface.call(d["default"](c), h, this);
    }
  );
  d["default"].fn.modal = J._jQueryInterface;
  d["default"].fn.modal.Constructor = J;
  d["default"].fn.modal.noConflict = function () {
    d["default"].fn.modal = ta;
    return J._jQueryInterface;
  };
  var Ba = "background cite href itemtype longdesc poster src xlink:href".split(
      " "
    ),
    Ea = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
    ka =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    Q = d["default"].fn.tooltip,
    xa = /(^|\s)bs-tooltip\S+/g,
    g = ["sanitize", "whiteList", "sanitizeFn"],
    L = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    x = {
      animation: !0,
      template:
        '\x3cdiv class\x3d"tooltip" role\x3d"tooltip"\x3e\x3cdiv class\x3d"arrow"\x3e\x3c/div\x3e\x3cdiv class\x3d"tooltip-inner"\x3e\x3c/div\x3e\x3c/div\x3e',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      customClass: "",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: "src srcset alt title width height".split(" "),
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    da = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      customClass: "(string|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)",
    },
    n = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip",
    },
    ha = (function () {
      function a(a, d) {
        if ("undefined" === typeof I["default"])
          throw new TypeError(
            "Bootstrap's tooltips require Popper (https://popper.js.org)"
          );
        this._isEnabled = !0;
        this._timeout = 0;
        this._hoverState = "";
        this._activeTrigger = {};
        this._popper = null;
        this.element = a;
        this.config = this._getConfig(d);
        this.tip = null;
        this._setListeners();
      }
      var k = a.prototype;
      k.enable = function () {
        this._isEnabled = !0;
      };
      k.disable = function () {
        this._isEnabled = !1;
      };
      k.toggleEnabled = function () {
        this._isEnabled = !this._isEnabled;
      };
      k.toggle = function (a) {
        if (this._isEnabled)
          if (a) {
            var c = this.constructor.DATA_KEY,
              g = d["default"](a.currentTarget).data(c);
            g ||
              ((g = new this.constructor(
                a.currentTarget,
                this._getDelegateConfig()
              )),
              d["default"](a.currentTarget).data(c, g));
            g._activeTrigger.click = !g._activeTrigger.click;
            g._isWithActiveTrigger() ? g._enter(null, g) : g._leave(null, g);
          } else
            d["default"](this.getTipElement()).hasClass("show")
              ? this._leave(null, this)
              : this._enter(null, this);
      };
      k.dispose = function () {
        clearTimeout(this._timeout);
        d["default"].removeData(this.element, this.constructor.DATA_KEY);
        d["default"](this.element).off(this.constructor.EVENT_KEY);
        d["default"](this.element)
          .closest(".modal")
          .off("hide.bs.modal", this._hideModalHandler);
        this.tip && d["default"](this.tip).remove();
        this._activeTrigger =
          this._hoverState =
          this._timeout =
          this._isEnabled =
            null;
        this._popper && this._popper.destroy();
        this.tip = this.config = this.element = this._popper = null;
      };
      k.show = function () {
        var a = this;
        if ("none" === d["default"](this.element).css("display"))
          throw Error("Please use show on visible elements");
        var h = d["default"].Event(this.constructor.Event.SHOW);
        if (this.isWithContent() && this._isEnabled) {
          d["default"](this.element).trigger(h);
          var g = C.findShadowRoot(this.element),
            g = d["default"].contains(
              null !== g ? g : this.element.ownerDocument.documentElement,
              this.element
            );
          if (!h.isDefaultPrevented() && g) {
            h = this.getTipElement();
            g = C.getUID(this.constructor.NAME);
            h.setAttribute("id", g);
            this.element.setAttribute("aria-describedby", g);
            this.setContent();
            this.config.animation && d["default"](h).addClass("fade");
            g =
              "function" === typeof this.config.placement
                ? this.config.placement.call(this, h, this.element)
                : this.config.placement;
            g = this._getAttachment(g);
            this.addAttachmentClass(g);
            var k = this._getContainer();
            d["default"](h).data(this.constructor.DATA_KEY, this);
            d["default"].contains(
              this.element.ownerDocument.documentElement,
              this.tip
            ) || d["default"](h).appendTo(k);
            d["default"](this.element).trigger(this.constructor.Event.INSERTED);
            this._popper = new I["default"](
              this.element,
              h,
              this._getPopperConfig(g)
            );
            d["default"](h).addClass("show");
            d["default"](h).addClass(this.config.customClass);
            if ("ontouchstart" in document.documentElement)
              d["default"](document.body)
                .children()
                .on("mouseover", null, d["default"].noop);
            h = function () {
              a.config.animation && a._fixTransition();
              var c = a._hoverState;
              a._hoverState = null;
              d["default"](a.element).trigger(a.constructor.Event.SHOWN);
              "out" === c && a._leave(null, a);
            };
            d["default"](this.tip).hasClass("fade")
              ? ((g = C.getTransitionDurationFromElement(this.tip)),
                d["default"](this.tip)
                  .one(C.TRANSITION_END, h)
                  .emulateTransitionEnd(g))
              : h();
          }
        }
      };
      k.hide = function (a) {
        var c = this,
          g = this.getTipElement(),
          k = d["default"].Event(this.constructor.Event.HIDE),
          f = function () {
            "show" !== c._hoverState &&
              g.parentNode &&
              g.parentNode.removeChild(g);
            c._cleanTipClass();
            c.element.removeAttribute("aria-describedby");
            d["default"](c.element).trigger(c.constructor.Event.HIDDEN);
            null !== c._popper && c._popper.destroy();
            a && a();
          };
        d["default"](this.element).trigger(k);
        k.isDefaultPrevented() ||
          (d["default"](g).removeClass("show"),
          "ontouchstart" in document.documentElement &&
            d["default"](document.body)
              .children()
              .off("mouseover", null, d["default"].noop),
          (this._activeTrigger.click = !1),
          (this._activeTrigger.focus = !1),
          (this._activeTrigger.hover = !1),
          d["default"](this.tip).hasClass("fade")
            ? ((k = C.getTransitionDurationFromElement(g)),
              d["default"](g).one(C.TRANSITION_END, f).emulateTransitionEnd(k))
            : f(),
          (this._hoverState = ""));
      };
      k.update = function () {
        null !== this._popper && this._popper.scheduleUpdate();
      };
      k.isWithContent = function () {
        return !!this.getTitle();
      };
      k.addAttachmentClass = function (a) {
        d["default"](this.getTipElement()).addClass("bs-tooltip-" + a);
      };
      k.getTipElement = function () {
        return (this.tip = this.tip || d["default"](this.config.template)[0]);
      };
      k.setContent = function () {
        var a = this.getTipElement();
        this.setElementContent(
          d["default"](a.querySelectorAll(".tooltip-inner")),
          this.getTitle()
        );
        d["default"](a).removeClass("fade show");
      };
      k.setElementContent = function (a, h) {
        "object" === typeof h && (h.nodeType || h.jquery)
          ? this.config.html
            ? d["default"](h).parent().is(a) || a.empty().append(h)
            : a.text(d["default"](h).text())
          : this.config.html
          ? (this.config.sanitize &&
              (h = K(h, this.config.whiteList, this.config.sanitizeFn)),
            a.html(h))
          : a.text(h);
      };
      k.getTitle = function () {
        var a = this.element.getAttribute("data-original-title");
        a ||
          (a =
            "function" === typeof this.config.title
              ? this.config.title.call(this.element)
              : this.config.title);
        return a;
      };
      k._getPopperConfig = function (a) {
        var c = this;
        a = {
          placement: a,
          modifiers: {
            offset: this._getOffset(),
            flip: { behavior: this.config.fallbackPlacement },
            arrow: { element: ".arrow" },
            preventOverflow: { boundariesElement: this.config.boundary },
          },
          onCreate: function (a) {
            a.originalPlacement !== a.placement &&
              c._handlePopperPlacementChange(a);
          },
          onUpdate: function (a) {
            return c._handlePopperPlacementChange(a);
          },
        };
        return w({}, a, this.config.popperConfig);
      };
      k._getOffset = function () {
        var a = this,
          d = {};
        "function" === typeof this.config.offset
          ? (d.fn = function (c) {
              c.offsets = w(
                {},
                c.offsets,
                a.config.offset(c.offsets, a.element)
              );
              return c;
            })
          : (d.offset = this.config.offset);
        return d;
      };
      k._getContainer = function () {
        return !1 === this.config.container
          ? document.body
          : C.isElement(this.config.container)
          ? d["default"](this.config.container)
          : d["default"](document).find(this.config.container);
      };
      k._getAttachment = function (a) {
        return L[a.toUpperCase()];
      };
      k._setListeners = function () {
        var a = this;
        this.config.trigger.split(" ").forEach(function (c) {
          if ("click" === c)
            d["default"](a.element).on(
              a.constructor.Event.CLICK,
              a.config.selector,
              function (c) {
                return a.toggle(c);
              }
            );
          else if ("manual" !== c) {
            var h =
              "hover" === c
                ? a.constructor.Event.MOUSEENTER
                : a.constructor.Event.FOCUSIN;
            c =
              "hover" === c
                ? a.constructor.Event.MOUSELEAVE
                : a.constructor.Event.FOCUSOUT;
            d["default"](a.element)
              .on(h, a.config.selector, function (c) {
                return a._enter(c);
              })
              .on(c, a.config.selector, function (c) {
                return a._leave(c);
              });
          }
        });
        this._hideModalHandler = function () {
          a.element && a.hide();
        };
        d["default"](this.element)
          .closest(".modal")
          .on("hide.bs.modal", this._hideModalHandler);
        this.config.selector
          ? (this.config = w({}, this.config, {
              trigger: "manual",
              selector: "",
            }))
          : this._fixTitle();
      };
      k._fixTitle = function () {
        var a = typeof this.element.getAttribute("data-original-title");
        if (this.element.getAttribute("title") || "string" !== a)
          this.element.setAttribute(
            "data-original-title",
            this.element.getAttribute("title") || ""
          ),
            this.element.setAttribute("title", "");
      };
      k._enter = function (a, h) {
        var c = this.constructor.DATA_KEY;
        h = h || d["default"](a.currentTarget).data(c);
        h ||
          ((h = new this.constructor(
            a.currentTarget,
            this._getDelegateConfig()
          )),
          d["default"](a.currentTarget).data(c, h));
        a && (h._activeTrigger["focusin" === a.type ? "focus" : "hover"] = !0);
        d["default"](h.getTipElement()).hasClass("show") ||
        "show" === h._hoverState
          ? (h._hoverState = "show")
          : (clearTimeout(h._timeout),
            (h._hoverState = "show"),
            h.config.delay && h.config.delay.show
              ? (h._timeout = setTimeout(function () {
                  "show" === h._hoverState && h.show();
                }, h.config.delay.show))
              : h.show());
      };
      k._leave = function (a, h) {
        var c = this.constructor.DATA_KEY;
        h = h || d["default"](a.currentTarget).data(c);
        h ||
          ((h = new this.constructor(
            a.currentTarget,
            this._getDelegateConfig()
          )),
          d["default"](a.currentTarget).data(c, h));
        a && (h._activeTrigger["focusout" === a.type ? "focus" : "hover"] = !1);
        h._isWithActiveTrigger() ||
          (clearTimeout(h._timeout),
          (h._hoverState = "out"),
          h.config.delay && h.config.delay.hide
            ? (h._timeout = setTimeout(function () {
                "out" === h._hoverState && h.hide();
              }, h.config.delay.hide))
            : h.hide());
      };
      k._isWithActiveTrigger = function () {
        for (var a in this._activeTrigger)
          if (this._activeTrigger[a]) return !0;
        return !1;
      };
      k._getConfig = function (a) {
        var c = d["default"](this.element).data();
        Object.keys(c).forEach(function (a) {
          -1 !== g.indexOf(a) && delete c[a];
        });
        a = w(
          {},
          this.constructor.Default,
          c,
          "object" === typeof a && a ? a : {}
        );
        "number" === typeof a.delay &&
          (a.delay = { show: a.delay, hide: a.delay });
        "number" === typeof a.title && (a.title = a.title.toString());
        "number" === typeof a.content && (a.content = a.content.toString());
        C.typeCheckConfig("tooltip", a, this.constructor.DefaultType);
        a.sanitize && (a.template = K(a.template, a.whiteList, a.sanitizeFn));
        return a;
      };
      k._getDelegateConfig = function () {
        var a = {};
        if (this.config)
          for (var d in this.config)
            this.constructor.Default[d] !== this.config[d] &&
              (a[d] = this.config[d]);
        return a;
      };
      k._cleanTipClass = function () {
        var a = d["default"](this.getTipElement()),
          h = a.attr("class").match(xa);
        null !== h && h.length && a.removeClass(h.join(""));
      };
      k._handlePopperPlacementChange = function (a) {
        this.tip = a.instance.popper;
        this._cleanTipClass();
        this.addAttachmentClass(this._getAttachment(a.placement));
      };
      k._fixTransition = function () {
        var a = this.getTipElement(),
          h = this.config.animation;
        null === a.getAttribute("x-placement") &&
          (d["default"](a).removeClass("fade"),
          (this.config.animation = !1),
          this.hide(),
          this.show(),
          (this.config.animation = h));
      };
      a._jQueryInterface = function (c) {
        return this.each(function () {
          var h = d["default"](this),
            g = h.data("bs.tooltip"),
            k = "object" === typeof c && c;
          if (g || !/dispose|hide/.test(c))
            if (
              (g || ((g = new a(this, k)), h.data("bs.tooltip", g)),
              "string" === typeof c)
            ) {
              if ("undefined" === typeof g[c])
                throw new TypeError('No method named "' + c + '"');
              g[c]();
            }
        });
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return x;
          },
        },
        {
          key: "NAME",
          get: function () {
            return "tooltip";
          },
        },
        {
          key: "DATA_KEY",
          get: function () {
            return "bs.tooltip";
          },
        },
        {
          key: "Event",
          get: function () {
            return n;
          },
        },
        {
          key: "EVENT_KEY",
          get: function () {
            return ".bs.tooltip";
          },
        },
        {
          key: "DefaultType",
          get: function () {
            return da;
          },
        },
      ]);
      return a;
    })();
  d["default"].fn.tooltip = ha._jQueryInterface;
  d["default"].fn.tooltip.Constructor = ha;
  d["default"].fn.tooltip.noConflict = function () {
    d["default"].fn.tooltip = Q;
    return ha._jQueryInterface;
  };
  var la = d["default"].fn.popover,
    fa = /(^|\s)bs-popover\S+/g,
    ba = w({}, ha.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '\x3cdiv class\x3d"popover" role\x3d"tooltip"\x3e\x3cdiv class\x3d"arrow"\x3e\x3c/div\x3e\x3ch3 class\x3d"popover-header"\x3e\x3c/h3\x3e\x3cdiv class\x3d"popover-body"\x3e\x3c/div\x3e\x3c/div\x3e',
    }),
    Ga = w({}, ha.DefaultType, { content: "(string|element|function)" }),
    za = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover",
    },
    ia = (function (a) {
      function g() {
        return a.apply(this, arguments) || this;
      }
      B(g, a);
      var c = g.prototype;
      c.isWithContent = function () {
        return this.getTitle() || this._getContent();
      };
      c.addAttachmentClass = function (a) {
        d["default"](this.getTipElement()).addClass("bs-popover-" + a);
      };
      c.getTipElement = function () {
        return (this.tip = this.tip || d["default"](this.config.template)[0]);
      };
      c.setContent = function () {
        var a = d["default"](this.getTipElement());
        this.setElementContent(a.find(".popover-header"), this.getTitle());
        var c = this._getContent();
        "function" === typeof c && (c = c.call(this.element));
        this.setElementContent(a.find(".popover-body"), c);
        a.removeClass("fade show");
      };
      c._getContent = function () {
        return this.element.getAttribute("data-content") || this.config.content;
      };
      c._cleanTipClass = function () {
        var a = d["default"](this.getTipElement()),
          c = a.attr("class").match(fa);
        null !== c && 0 < c.length && a.removeClass(c.join(""));
      };
      g._jQueryInterface = function (a) {
        return this.each(function () {
          var c = d["default"](this).data("bs.popover"),
            h = "object" === typeof a ? a : null;
          if (c || !/dispose|hide/.test(a))
            if (
              (c ||
                ((c = new g(this, h)),
                d["default"](this).data("bs.popover", c)),
              "string" === typeof a)
            ) {
              if ("undefined" === typeof c[a])
                throw new TypeError('No method named "' + a + '"');
              c[a]();
            }
        });
      };
      p(g, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return ba;
          },
        },
        {
          key: "NAME",
          get: function () {
            return "popover";
          },
        },
        {
          key: "DATA_KEY",
          get: function () {
            return "bs.popover";
          },
        },
        {
          key: "Event",
          get: function () {
            return za;
          },
        },
        {
          key: "EVENT_KEY",
          get: function () {
            return ".bs.popover";
          },
        },
        {
          key: "DefaultType",
          get: function () {
            return Ga;
          },
        },
      ]);
      return g;
    })(ha);
  d["default"].fn.popover = ia._jQueryInterface;
  d["default"].fn.popover.Constructor = ia;
  d["default"].fn.popover.noConflict = function () {
    d["default"].fn.popover = la;
    return ia._jQueryInterface;
  };
  var ua = d["default"].fn.scrollspy,
    k = { offset: 10, method: "auto", target: "" },
    r = { offset: "number", method: "string", target: "(string|element)" },
    V = (function () {
      function a(a, g) {
        var c = this;
        this._element = a;
        this._scrollElement = "BODY" === a.tagName ? window : a;
        this._config = this._getConfig(g);
        this._selector =
          this._config.target +
          " .nav-link," +
          (this._config.target + " .list-group-item,") +
          (this._config.target + " .dropdown-item");
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        d["default"](this._scrollElement).on(
          "scroll.bs.scrollspy",
          function (a) {
            return c._process(a);
          }
        );
        this.refresh();
        this._process();
      }
      var g = a.prototype;
      g.refresh = function () {
        var a = this,
          g =
            this._scrollElement === this._scrollElement.window
              ? "offset"
              : "position",
          k = "auto" === this._config.method ? g : this._config.method,
          f = "position" === k ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        [].slice
          .call(document.querySelectorAll(this._selector))
          .map(function (a) {
            var c;
            (a = C.getSelectorFromElement(a)) &&
              (c = document.querySelector(a));
            if (c) {
              var g = c.getBoundingClientRect();
              if (g.width || g.height) return [d["default"](c)[k]().top + f, a];
            }
            return null;
          })
          .filter(function (a) {
            return a;
          })
          .sort(function (a, c) {
            return a[0] - c[0];
          })
          .forEach(function (c) {
            a._offsets.push(c[0]);
            a._targets.push(c[1]);
          });
      };
      g.dispose = function () {
        d["default"].removeData(this._element, "bs.scrollspy");
        d["default"](this._scrollElement).off(".bs.scrollspy");
        this._scrollHeight =
          this._activeTarget =
          this._targets =
          this._offsets =
          this._selector =
          this._config =
          this._scrollElement =
          this._element =
            null;
      };
      g._getConfig = function (a) {
        a = w({}, k, "object" === typeof a && a ? a : {});
        if ("string" !== typeof a.target && C.isElement(a.target)) {
          var c = d["default"](a.target).attr("id");
          c ||
            ((c = C.getUID("scrollspy")), d["default"](a.target).attr("id", c));
          a.target = "#" + c;
        }
        C.typeCheckConfig("scrollspy", a, r);
        return a;
      };
      g._getScrollTop = function () {
        return this._scrollElement === window
          ? this._scrollElement.pageYOffset
          : this._scrollElement.scrollTop;
      };
      g._getScrollHeight = function () {
        return (
          this._scrollElement.scrollHeight ||
          Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      };
      g._getOffsetHeight = function () {
        return this._scrollElement === window
          ? window.innerHeight
          : this._scrollElement.getBoundingClientRect().height;
      };
      g._process = function () {
        var a = this._getScrollTop() + this._config.offset,
          d = this._getScrollHeight(),
          g = this._config.offset + d - this._getOffsetHeight();
        this._scrollHeight !== d && this.refresh();
        if (a >= g)
          (a = this._targets[this._targets.length - 1]),
            this._activeTarget !== a && this._activate(a);
        else if (
          this._activeTarget &&
          a < this._offsets[0] &&
          0 < this._offsets[0]
        )
          (this._activeTarget = null), this._clear();
        else
          for (d = this._offsets.length; d--; )
            this._activeTarget !== this._targets[d] &&
              a >= this._offsets[d] &&
              ("undefined" === typeof this._offsets[d + 1] ||
                a < this._offsets[d + 1]) &&
              this._activate(this._targets[d]);
      };
      g._activate = function (a) {
        this._activeTarget = a;
        this._clear();
        var c = this._selector.split(",").map(function (c) {
            return (
              c + '[data-target\x3d"' + a + '"],' + c + '[href\x3d"' + a + '"]'
            );
          }),
          c = d["default"](
            [].slice.call(document.querySelectorAll(c.join(",")))
          );
        c.hasClass("dropdown-item")
          ? (c.closest(".dropdown").find(".dropdown-toggle").addClass("active"),
            c.addClass("active"))
          : (c.addClass("active"),
            c
              .parents(".nav, .list-group")
              .prev(".nav-link, .list-group-item")
              .addClass("active"),
            c
              .parents(".nav, .list-group")
              .prev(".nav-item")
              .children(".nav-link")
              .addClass("active"));
        d["default"](this._scrollElement).trigger("activate.bs.scrollspy", {
          relatedTarget: a,
        });
      };
      g._clear = function () {
        [].slice
          .call(document.querySelectorAll(this._selector))
          .filter(function (a) {
            return a.classList.contains("active");
          })
          .forEach(function (a) {
            return a.classList.remove("active");
          });
      };
      a._jQueryInterface = function (c) {
        return this.each(function () {
          var g = d["default"](this).data("bs.scrollspy"),
            k = "object" === typeof c && c;
          g ||
            ((g = new a(this, k)), d["default"](this).data("bs.scrollspy", g));
          if ("string" === typeof c) {
            if ("undefined" === typeof g[c])
              throw new TypeError('No method named "' + c + '"');
            g[c]();
          }
        });
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "Default",
          get: function () {
            return k;
          },
        },
      ]);
      return a;
    })();
  d["default"](window).on("load.bs.scrollspy.data-api", function () {
    for (
      var a = [].slice.call(
          document.querySelectorAll('[data-spy\x3d"scroll"]')
        ),
        g = a.length;
      g--;

    ) {
      var c = d["default"](a[g]);
      V._jQueryInterface.call(c, c.data());
    }
  });
  d["default"].fn.scrollspy = V._jQueryInterface;
  d["default"].fn.scrollspy.Constructor = V;
  d["default"].fn.scrollspy.noConflict = function () {
    d["default"].fn.scrollspy = ua;
    return V._jQueryInterface;
  };
  var U = d["default"].fn.tab,
    P = (function () {
      function a(a) {
        this._element = a;
      }
      var g = a.prototype;
      g.show = function () {
        var a = this;
        if (
          !(
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
              d["default"](this._element).hasClass("active")) ||
            d["default"](this._element).hasClass("disabled")
          )
        ) {
          var g,
            k,
            f = d["default"](this._element).closest(".nav, .list-group")[0],
            n = C.getSelectorFromElement(this._element);
          if (f) {
            var x =
              "UL" === f.nodeName || "OL" === f.nodeName
                ? "\x3e li \x3e .active"
                : ".active";
            k = d["default"].makeArray(d["default"](f).find(x));
            k = k[k.length - 1];
          }
          var x = d["default"].Event("hide.bs.tab", {
              relatedTarget: this._element,
            }),
            l = d["default"].Event("show.bs.tab", { relatedTarget: k });
          k && d["default"](k).trigger(x);
          d["default"](this._element).trigger(l);
          l.isDefaultPrevented() ||
            x.isDefaultPrevented() ||
            (n && (g = document.querySelector(n)),
            this._activate(this._element, f),
            (f = function () {
              var c = d["default"].Event("hidden.bs.tab", {
                  relatedTarget: a._element,
                }),
                g = d["default"].Event("shown.bs.tab", { relatedTarget: k });
              d["default"](k).trigger(c);
              d["default"](a._element).trigger(g);
            }),
            g ? this._activate(g, g.parentNode, f) : f());
        }
      };
      g.dispose = function () {
        d["default"].removeData(this._element, "bs.tab");
        this._element = null;
      };
      g._activate = function (a, g, k) {
        var c = this,
          h = (
            !g || ("UL" !== g.nodeName && "OL" !== g.nodeName)
              ? d["default"](g).children(".active")
              : d["default"](g).find("\x3e li \x3e .active")
          )[0],
          f = k && h && d["default"](h).hasClass("fade");
        g = function () {
          return c._transitionComplete(a, h, k);
        };
        h && f
          ? ((f = C.getTransitionDurationFromElement(h)),
            d["default"](h)
              .removeClass("show")
              .one(C.TRANSITION_END, g)
              .emulateTransitionEnd(f))
          : g();
      };
      g._transitionComplete = function (a, g, k) {
        if (g) {
          d["default"](g).removeClass("active");
          var c = d["default"](g.parentNode).find(
            "\x3e .dropdown-menu .active"
          )[0];
          c && d["default"](c).removeClass("active");
          "tab" === g.getAttribute("role") &&
            g.setAttribute("aria-selected", !1);
        }
        d["default"](a).addClass("active");
        "tab" === a.getAttribute("role") && a.setAttribute("aria-selected", !0);
        C.reflow(a);
        a.classList.contains("fade") && a.classList.add("show");
        (g = a.parentNode) && "LI" === g.nodeName && (g = g.parentNode);
        if (g && d["default"](g).hasClass("dropdown-menu")) {
          if ((g = d["default"](a).closest(".dropdown")[0]))
            (g = [].slice.call(g.querySelectorAll(".dropdown-toggle"))),
              d["default"](g).addClass("active");
          a.setAttribute("aria-expanded", !0);
        }
        k && k();
      };
      a._jQueryInterface = function (c) {
        return this.each(function () {
          var g = d["default"](this),
            k = g.data("bs.tab");
          k || ((k = new a(this)), g.data("bs.tab", k));
          if ("string" === typeof c) {
            if ("undefined" === typeof k[c])
              throw new TypeError('No method named "' + c + '"');
            k[c]();
          }
        });
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
      ]);
      return a;
    })();
  d["default"](document).on(
    "click.bs.tab.data-api",
    '[data-toggle\x3d"tab"], [data-toggle\x3d"pill"], [data-toggle\x3d"list"]',
    function (a) {
      a.preventDefault();
      P._jQueryInterface.call(d["default"](this), "show");
    }
  );
  d["default"].fn.tab = P._jQueryInterface;
  d["default"].fn.tab.Constructor = P;
  d["default"].fn.tab.noConflict = function () {
    d["default"].fn.tab = U;
    return P._jQueryInterface;
  };
  var qa = d["default"].fn.toast,
    Da = { animation: !0, autohide: !0, delay: 500 },
    Ja = { animation: "boolean", autohide: "boolean", delay: "number" },
    va = (function () {
      function a(a, d) {
        this._element = a;
        this._config = this._getConfig(d);
        this._timeout = null;
        this._setListeners();
      }
      var g = a.prototype;
      g.show = function () {
        var a = this,
          g = d["default"].Event("show.bs.toast");
        d["default"](this._element).trigger(g);
        if (!g.isDefaultPrevented())
          if (
            (this._clearTimeout(),
            this._config.animation && this._element.classList.add("fade"),
            (g = function () {
              a._element.classList.remove("showing");
              a._element.classList.add("show");
              d["default"](a._element).trigger("shown.bs.toast");
              a._config.autohide &&
                (a._timeout = setTimeout(function () {
                  a.hide();
                }, a._config.delay));
            }),
            this._element.classList.remove("hide"),
            C.reflow(this._element),
            this._element.classList.add("showing"),
            this._config.animation)
          ) {
            var k = C.getTransitionDurationFromElement(this._element);
            d["default"](this._element)
              .one(C.TRANSITION_END, g)
              .emulateTransitionEnd(k);
          } else g();
      };
      g.hide = function () {
        if (this._element.classList.contains("show")) {
          var a = d["default"].Event("hide.bs.toast");
          d["default"](this._element).trigger(a);
          a.isDefaultPrevented() || this._close();
        }
      };
      g.dispose = function () {
        this._clearTimeout();
        this._element.classList.contains("show") &&
          this._element.classList.remove("show");
        d["default"](this._element).off("click.dismiss.bs.toast");
        d["default"].removeData(this._element, "bs.toast");
        this._config = this._element = null;
      };
      g._getConfig = function (a) {
        a = w(
          {},
          Da,
          d["default"](this._element).data(),
          "object" === typeof a && a ? a : {}
        );
        C.typeCheckConfig("toast", a, this.constructor.DefaultType);
        return a;
      };
      g._setListeners = function () {
        var a = this;
        d["default"](this._element).on(
          "click.dismiss.bs.toast",
          '[data-dismiss\x3d"toast"]',
          function () {
            return a.hide();
          }
        );
      };
      g._close = function () {
        var a = this,
          g = function () {
            a._element.classList.add("hide");
            d["default"](a._element).trigger("hidden.bs.toast");
          };
        this._element.classList.remove("show");
        if (this._config.animation) {
          var k = C.getTransitionDurationFromElement(this._element);
          d["default"](this._element)
            .one(C.TRANSITION_END, g)
            .emulateTransitionEnd(k);
        } else g();
      };
      g._clearTimeout = function () {
        clearTimeout(this._timeout);
        this._timeout = null;
      };
      a._jQueryInterface = function (c) {
        return this.each(function () {
          var g = d["default"](this),
            k = g.data("bs.toast"),
            f = "object" === typeof c && c;
          k || ((k = new a(this, f)), g.data("bs.toast", k));
          if ("string" === typeof c) {
            if ("undefined" === typeof k[c])
              throw new TypeError('No method named "' + c + '"');
            k[c](this);
          }
        });
      };
      p(a, null, [
        {
          key: "VERSION",
          get: function () {
            return "4.6.1";
          },
        },
        {
          key: "DefaultType",
          get: function () {
            return Ja;
          },
        },
        {
          key: "Default",
          get: function () {
            return Da;
          },
        },
      ]);
      return a;
    })();
  d["default"].fn.toast = va._jQueryInterface;
  d["default"].fn.toast.Constructor = va;
  d["default"].fn.toast.noConflict = function () {
    d["default"].fn.toast = qa;
    return va._jQueryInterface;
  };
  a.Alert = S;
  a.Button = aa;
  a.Carousel = E;
  a.Collapse = u;
  a.Dropdown = R;
  a.Modal = J;
  a.Popover = ia;
  a.Scrollspy = V;
  a.Tab = P;
  a.Toast = va;
  a.Tooltip = ha;
  a.Util = C;
  Object.defineProperty(a, "__esModule", { value: !0 });
});
(function (a, f) {
  void 0 === a && void 0 !== window && (a = window);
  "function" === typeof define && define.amd
    ? define(["jquery"], function (a) {
        return f(a);
      })
    : "object" === typeof module && module.exports
    ? (module.exports = f(require("jquery")))
    : f(a.jQuery);
})(this, function (a) {
  (function (a) {
    function f(d, f) {
      var g = d.nodeName.toLowerCase();
      if (-1 !== a.inArray(g, f))
        return -1 !== a.inArray(g, S)
          ? !(!d.nodeValue.match(ga) && !d.nodeValue.match(aa))
          : !0;
      d = a(f).filter(function (a, d) {
        return d instanceof RegExp;
      });
      f = 0;
      for (var m = d.length; f < m; f++) if (g.match(d[f])) return !0;
      return !1;
    }
    function t(a, d, x) {
      if (x && "function" === typeof x) return x(a);
      x = Object.keys(d);
      for (var g = 0, n = a.length; g < n; g++)
        for (
          var m = a[g].querySelectorAll("*"), u = 0, L = m.length;
          u < L;
          u++
        ) {
          var q = m[u],
            p = q.nodeName.toLowerCase();
          if (-1 === x.indexOf(p)) q.parentNode.removeChild(q);
          else
            for (
              var t = [].slice.call(q.attributes),
                p = [].concat(d["*"] || [], d[p] || []),
                D = 0,
                w = t.length;
              D < w;
              D++
            ) {
              var k = t[D];
              f(k, p) || q.removeAttribute(k.nodeName);
            }
        }
    }
    function y(a, d) {
      return (
        a.length === d.length &&
        a.every(function (a, g) {
          return a === d[g];
        })
      );
    }
    function p(a, d) {
      a = a.selectedOptions;
      var g = [];
      if (d) {
        for (var f = 0, n = a.length; f < n; f++)
          (d = a[f]),
            d.disabled ||
              ("OPTGROUP" === d.parentNode.tagName && d.parentNode.disabled) ||
              g.push(d);
        return g;
      }
      return a;
    }
    function w(a, d) {
      var g = [];
      d = d || a.selectedOptions;
      for (var f, n = 0, m = d.length; n < m; n++)
        (f = d[n]),
          f.disabled ||
            ("OPTGROUP" === f.parentNode.tagName && f.parentNode.disabled) ||
            g.push(f.value);
      return a.multiple ? g : g.length ? g[0] : null;
    }
    function B(a, d, f, m) {
      for (
        var g = ["display", "subtext", "tokens"], x = !1, u = 0;
        u < g.length;
        u++
      ) {
        var q = g[u],
          p = a[q];
        if (
          p &&
          ((p = p.toString()),
          "display" === q && (p = p.replace(/<[^>]+>/g, "")),
          m && (p = K(p)),
          (p = p.toUpperCase()),
          (x = "contains" === f ? 0 <= p.indexOf(d) : p.startsWith(d)))
        )
          break;
      }
      return x;
    }
    function F(a) {
      return parseInt(a, 10) || 0;
    }
    function O(a) {
      return u[a];
    }
    function K(a) {
      return (a = a.toString()) && a.replace(G, O).replace(D, "");
    }
    function d(a, d) {
      a.length ||
        ((J.noResults.innerHTML = this.options.noneResultsText.replace(
          "{0}",
          '"' + ja(d) + '"'
        )),
        this.$menuInner[0].firstChild.appendChild(J.noResults));
    }
    function I(d) {
      var g = arguments,
        f = d;
      [].shift.apply(g);
      if (!R.success) {
        try {
          R.full = (a.fn.dropdown.Constructor.VERSION || "")
            .split(" ")[0]
            .split(".");
        } catch (la) {
          Q.BootstrapVersion
            ? (R.full = Q.BootstrapVersion.split(" ")[0].split("."))
            : ((R.full = [R.major, "0", "0"]),
              console.warn(
                "There was an issue retrieving Bootstrap's version. Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.",
                la
              ));
        }
        R.major = R.full[0];
        R.success = !0;
      }
      if ("4" === R.major) {
        var m = [];
        Q.DEFAULTS.style === H.BUTTONCLASS &&
          m.push({ name: "style", className: "BUTTONCLASS" });
        Q.DEFAULTS.iconBase === H.ICONBASE &&
          m.push({ name: "iconBase", className: "ICONBASE" });
        Q.DEFAULTS.tickIcon === H.TICKICON &&
          m.push({ name: "tickIcon", className: "TICKICON" });
        H.DIVIDER = "dropdown-divider";
        H.SHOW = "show";
        H.BUTTONCLASS = "btn-light";
        H.POPOVERHEADER = "popover-header";
        H.ICONBASE = "";
        H.TICKICON = "bs-ok-default";
        for (var n = 0; n < m.length; n++)
          (d = m[n]), (Q.DEFAULTS[d.name] = H[d.className]);
      }
      var u,
        m = this.each(function () {
          var d = a(this);
          if (d.is("select") && !d.is(".pika-select")) {
            var n = d.data("selectpicker"),
              x = "object" == typeof f && f;
            if (!n) {
              var n = d.data(),
                m;
              for (m in n)
                Object.prototype.hasOwnProperty.call(n, m) &&
                  -1 !== a.inArray(m, Y) &&
                  delete n[m];
              m = a.extend(
                {},
                Q.DEFAULTS,
                a.fn.selectpicker.defaults || {},
                n,
                x
              );
              m.template = a.extend(
                {},
                Q.DEFAULTS.template,
                a.fn.selectpicker.defaults
                  ? a.fn.selectpicker.defaults.template
                  : {},
                n.template,
                x.template
              );
              d.data("selectpicker", (n = new Q(this, m)));
            } else if (x)
              for (var p in x)
                Object.prototype.hasOwnProperty.call(x, p) &&
                  (n.options[p] = x[p]);
            "string" == typeof f &&
              (u = n[f] instanceof Function ? n[f].apply(n, g) : n.options[f]);
          }
        });
      return "undefined" !== typeof u ? u : m;
    }
    function C() {
      if (a.fn.dropdown)
        return (
          a.fn.dropdown.Constructor._dataApiKeydownHandler ||
          a.fn.dropdown.Constructor.prototype.keydown
        ).apply(this, arguments);
    }
    var Y = ["sanitize", "whiteList", "sanitizeFn"],
      S = "background cite href itemtype longdesc poster src xlink:href".split(
        " "
      ),
      ga = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
      aa =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    "classList" in document.createElement("_") ||
      (function (d) {
        if ("Element" in d) {
          d = d.Element.prototype;
          var g = Object,
            f = function () {
              var d = a(this);
              return {
                add: function (a) {
                  a = Array.prototype.slice.call(arguments).join(" ");
                  return d.addClass(a);
                },
                remove: function (a) {
                  a = Array.prototype.slice.call(arguments).join(" ");
                  return d.removeClass(a);
                },
                toggle: function (a, g) {
                  return d.toggleClass(a, g);
                },
                contains: function (a) {
                  return d.hasClass(a);
                },
              };
            };
          if (g.defineProperty) {
            f = { get: f, enumerable: !0, configurable: !0 };
            try {
              g.defineProperty(d, "classList", f);
            } catch (da) {
              if (void 0 === da.number || -2146823252 === da.number)
                (f.enumerable = !1), g.defineProperty(d, "classList", f);
            }
          } else
            g.prototype.__defineGetter__ && d.__defineGetter__("classList", f);
        }
      })(window);
    var T = document.createElement("_");
    T.classList.add("c1", "c2");
    if (!T.classList.contains("c2")) {
      var Z = DOMTokenList.prototype.add,
        ma = DOMTokenList.prototype.remove;
      DOMTokenList.prototype.add = function () {
        Array.prototype.forEach.call(arguments, Z.bind(this));
      };
      DOMTokenList.prototype.remove = function () {
        Array.prototype.forEach.call(arguments, ma.bind(this));
      };
    }
    T.classList.toggle("c3", !1);
    if (T.classList.contains("c3")) {
      var ea = DOMTokenList.prototype.toggle;
      DOMTokenList.prototype.toggle = function (a, d) {
        return 1 in arguments && !this.contains(a) === !d
          ? d
          : ea.call(this, a);
      };
    }
    T = null;
    String.prototype.startsWith ||
      (function () {
        var a = (function () {
            try {
              var a = {},
                d = Object.defineProperty,
                g = d(a, a, a) && d;
            } catch (la) {}
            return g;
          })(),
          d = {}.toString,
          f = function (a) {
            if (null == this) throw new TypeError();
            var g = String(this);
            if (a && "[object RegExp]" == d.call(a)) throw new TypeError();
            var f = g.length,
              x = String(a),
              m = x.length,
              u = 1 < arguments.length ? arguments[1] : void 0,
              u = u ? Number(u) : 0;
            u != u && (u = 0);
            u = Math.min(Math.max(u, 0), f);
            if (m + u > f) return !1;
            for (f = -1; ++f < m; )
              if (g.charCodeAt(u + f) != x.charCodeAt(f)) return !1;
            return !0;
          };
        a
          ? a(String.prototype, "startsWith", {
              value: f,
              configurable: !0,
              writable: !0,
            })
          : (String.prototype.startsWith = f);
      })();
    Object.keys ||
      (Object.keys = function (a, d, f) {
        f = [];
        for (d in a) f.hasOwnProperty.call(a, d) && f.push(d);
        return f;
      });
    HTMLSelectElement &&
      !HTMLSelectElement.prototype.hasOwnProperty("selectedOptions") &&
      Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
        get: function () {
          return this.querySelectorAll(":checked");
        },
      });
    var E = !1,
      ca = a.valHooks.select.set;
    a.valHooks.select.set = function (d, f) {
      f && !E && a(d).data("selected", !0);
      return ca.apply(this, arguments);
    };
    var X = null,
      m;
    try {
      new Event("change"), (m = !0);
    } catch (g) {
      m = !1;
    }
    a.fn.triggerNative = function (a) {
      var d = this[0],
        g;
      d.dispatchEvent
        ? (m
            ? (g = new Event(a, { bubbles: !0 }))
            : ((g = document.createEvent("Event")), g.initEvent(a, !0, !1)),
          d.dispatchEvent(g))
        : d.fireEvent
        ? ((g = document.createEventObject()),
          (g.eventType = a),
          d.fireEvent("on" + a, g))
        : this.trigger(a);
    };
    var u = {
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s",
      },
      G = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      D =
        /[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]/g,
      ja = (function (a) {
        var d = function (d) {
            return a[d];
          },
          g = "(?:" + Object.keys(a).join("|") + ")",
          f = RegExp(g),
          n = RegExp(g, "g");
        return function (a) {
          a = null == a ? "" : "" + a;
          return f.test(a) ? a.replace(n, d) : a;
        };
      })({
        "\x26": "\x26amp;",
        "\x3c": "\x26lt;",
        "\x3e": "\x26gt;",
        '"': "\x26quot;",
        "'": "\x26#x27;",
        "`": "\x26#x60;",
      }),
      sa = {
        32: " ",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        59: ";",
        65: "A",
        66: "B",
        67: "C",
        68: "D",
        69: "E",
        70: "F",
        71: "G",
        72: "H",
        73: "I",
        74: "J",
        75: "K",
        76: "L",
        77: "M",
        78: "N",
        79: "O",
        80: "P",
        81: "Q",
        82: "R",
        83: "S",
        84: "T",
        85: "U",
        86: "V",
        87: "W",
        88: "X",
        89: "Y",
        90: "Z",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
      },
      R = { success: !1, major: "3" };
    try {
      (R.full = (a.fn.dropdown.Constructor.VERSION || "")
        .split(" ")[0]
        .split(".")),
        (R.major = R.full[0]),
        (R.success = !0);
    } catch (g) {}
    var ta = 0,
      H = {
        DISABLED: "disabled",
        DIVIDER: "divider",
        SHOW: "open",
        DROPUP: "dropup",
        MENU: "dropdown-menu",
        MENURIGHT: "dropdown-menu-right",
        MENULEFT: "dropdown-menu-left",
        BUTTONCLASS: "btn-default",
        POPOVERHEADER: "popover-title",
        ICONBASE: "glyphicon",
        TICKICON: "glyphicon-ok",
      },
      ya = "." + H.MENU,
      J = {
        div: document.createElement("div"),
        span: document.createElement("span"),
        i: document.createElement("i"),
        subtext: document.createElement("small"),
        a: document.createElement("a"),
        li: document.createElement("li"),
        whitespace: document.createTextNode(" "),
        fragment: document.createDocumentFragment(),
      };
    J.noResults = J.li.cloneNode(!1);
    J.noResults.className = "no-results";
    J.a.setAttribute("role", "option");
    J.a.className = "dropdown-item";
    J.subtext.className = "text-muted";
    J.text = J.span.cloneNode(!1);
    J.text.className = "text";
    J.checkMark = J.span.cloneNode(!1);
    var Ba = /38|40/,
      Ea = /^9$|27/,
      ka = {
        li: function (a, d, f) {
          var g = J.li.cloneNode(!1);
          a &&
            (1 === a.nodeType || 11 === a.nodeType
              ? g.appendChild(a)
              : (g.innerHTML = a));
          "undefined" !== typeof d && "" !== d && (g.className = d);
          "undefined" !== typeof f &&
            null !== f &&
            g.classList.add("optgroup-" + f);
          return g;
        },
        a: function (a, d, f) {
          var g = J.a.cloneNode(!0);
          a &&
            (11 === a.nodeType
              ? g.appendChild(a)
              : g.insertAdjacentHTML("beforeend", a));
          "undefined" !== typeof d &&
            "" !== d &&
            g.classList.add.apply(g.classList, d.split(/\s+/));
          f && g.setAttribute("style", f);
          return g;
        },
        text: function (a, d) {
          var g = J.text.cloneNode(!1),
            f;
          if (a.content) g.innerHTML = a.content;
          else {
            g.textContent = a.text;
            if (a.icon) {
              var n = J.whitespace.cloneNode(!1);
              f = (!0 === d ? J.i : J.span).cloneNode(!1);
              f.className = this.options.iconBase + " " + a.icon;
              J.fragment.appendChild(f);
              J.fragment.appendChild(n);
            }
            a.subtext &&
              ((f = J.subtext.cloneNode(!1)),
              (f.textContent = a.subtext),
              g.appendChild(f));
          }
          if (!0 === d)
            for (; 0 < g.childNodes.length; )
              J.fragment.appendChild(g.childNodes[0]);
          else J.fragment.appendChild(g);
          return J.fragment;
        },
        label: function (a) {
          var d = J.text.cloneNode(!1),
            g;
          d.innerHTML = a.display;
          if (a.icon) {
            var f = J.whitespace.cloneNode(!1);
            g = J.span.cloneNode(!1);
            g.className = this.options.iconBase + " " + a.icon;
            J.fragment.appendChild(g);
            J.fragment.appendChild(f);
          }
          a.subtext &&
            ((g = J.subtext.cloneNode(!1)),
            (g.textContent = a.subtext),
            d.appendChild(g));
          J.fragment.appendChild(d);
          return J.fragment;
        },
      },
      Q = function (d, f) {
        var g = this;
        E || ((a.valHooks.select.set = ca), (E = !0));
        this.$element = a(d);
        this.$menu = this.$button = this.$newElement = null;
        this.options = f;
        this.selectpicker = {
          main: {},
          search: {},
          current: {},
          view: {},
          isSearching: !1,
          keydown: {
            keyHistory: "",
            resetKeyHistory: {
              start: function () {
                return setTimeout(function () {
                  g.selectpicker.keydown.keyHistory = "";
                }, 800);
              },
            },
          },
        };
        this.sizeInfo = {};
        null === this.options.title &&
          (this.options.title = this.$element.attr("title"));
        d = this.options.windowPadding;
        "number" === typeof d && (this.options.windowPadding = [d, d, d, d]);
        this.val = Q.prototype.val;
        this.render = Q.prototype.render;
        this.refresh = Q.prototype.refresh;
        this.setStyle = Q.prototype.setStyle;
        this.selectAll = Q.prototype.selectAll;
        this.deselectAll = Q.prototype.deselectAll;
        this.destroy = Q.prototype.destroy;
        this.remove = Q.prototype.remove;
        this.show = Q.prototype.show;
        this.hide = Q.prototype.hide;
        this.init();
      };
    Q.VERSION = "1.13.18";
    Q.DEFAULTS = {
      noneSelectedText: "Nothing selected",
      noneResultsText: "No results matched {0}",
      countSelectedText: function (a, d) {
        return 1 == a ? "{0} item selected" : "{0} items selected";
      },
      maxOptionsText: function (a, d) {
        return [
          1 == a
            ? "Limit reached ({n} item max)"
            : "Limit reached ({n} items max)",
          1 == d
            ? "Group limit reached ({n} item max)"
            : "Group limit reached ({n} items max)",
        ];
      },
      selectAllText: "Select All",
      deselectAllText: "Deselect All",
      doneButton: !1,
      doneButtonText: "Close",
      multipleSeparator: ", ",
      styleBase: "btn",
      style: H.BUTTONCLASS,
      size: "auto",
      title: null,
      selectedTextFormat: "values",
      width: !1,
      container: !1,
      hideDisabled: !1,
      showSubtext: !1,
      showIcon: !0,
      showContent: !0,
      dropupAuto: !0,
      header: !1,
      liveSearch: !1,
      liveSearchPlaceholder: null,
      liveSearchNormalize: !1,
      liveSearchStyle: "contains",
      actionsBox: !1,
      iconBase: H.ICONBASE,
      tickIcon: H.TICKICON,
      showTick: !1,
      template: { caret: '\x3cspan class\x3d"caret"\x3e\x3c/span\x3e' },
      maxOptions: !1,
      mobile: !1,
      selectOnTab: !1,
      dropdownAlignRight: !1,
      windowPadding: 0,
      virtualScroll: 600,
      display: !1,
      sanitize: !0,
      sanitizeFn: null,
      whiteList: {
        "*": [
          "class",
          "dir",
          "id",
          "lang",
          "role",
          "tabindex",
          "style",
          /^aria-[\w-]*$/i,
        ],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
    };
    Q.prototype = {
      constructor: Q,
      init: function () {
        var a = this,
          d = this.$element.attr("id"),
          f = this.$element[0],
          m = f.form;
        ta++;
        this.selectId = "bs-select-" + ta;
        f.classList.add("bs-select-hidden");
        this.multiple = this.$element.prop("multiple");
        this.autofocus = this.$element.prop("autofocus");
        f.classList.contains("show-tick") && (this.options.showTick = !0);
        this.$newElement = this.createDropdown();
        this.buildData();
        this.$element.after(this.$newElement).prependTo(this.$newElement);
        m &&
          null === f.form &&
          (m.id || (m.id = "form-" + this.selectId),
          f.setAttribute("form", m.id));
        this.$button = this.$newElement.children("button");
        this.$menu = this.$newElement.children(ya);
        this.$menuInner = this.$menu.children(".inner");
        this.$searchbox = this.$menu.find("input");
        f.classList.remove("bs-select-hidden");
        !0 === this.options.dropdownAlignRight &&
          this.$menu[0].classList.add(H.MENURIGHT);
        "undefined" !== typeof d && this.$button.attr("data-id", d);
        this.checkDisabled();
        this.clickListener();
        this.options.liveSearch
          ? (this.liveSearchListener(),
            (this.focusedParent = this.$searchbox[0]))
          : (this.focusedParent = this.$menuInner[0]);
        this.setStyle();
        this.render();
        this.setWidth();
        if (this.options.container) this.selectPosition();
        else
          this.$element.on("hide.bs.select", function () {
            if (a.isVirtual()) {
              var d = a.$menuInner[0],
                g = d.firstChild.cloneNode(!1);
              d.replaceChild(g, d.firstChild);
              d.scrollTop = 0;
            }
          });
        this.$menu.data("this", this);
        this.$newElement.data("this", this);
        this.options.mobile && this.mobile();
        this.$newElement.on({
          "hide.bs.dropdown": function (d) {
            a.$element.trigger("hide.bs.select", d);
          },
          "hidden.bs.dropdown": function (d) {
            a.$element.trigger("hidden.bs.select", d);
          },
          "show.bs.dropdown": function (d) {
            a.$element.trigger("show.bs.select", d);
          },
          "shown.bs.dropdown": function (d) {
            a.$element.trigger("shown.bs.select", d);
          },
        });
        if (f.hasAttribute("required"))
          this.$element.on("invalid.bs.select", function () {
            a.$button[0].classList.add("bs-invalid");
            a.$element
              .on("shown.bs.select.invalid", function () {
                a.$element.val(a.$element.val()).off("shown.bs.select.invalid");
              })
              .on("rendered.bs.select", function () {
                this.validity.valid &&
                  a.$button[0].classList.remove("bs-invalid");
                a.$element.off("rendered.bs.select");
              });
            a.$button.on("blur.bs.select", function () {
              a.$element.trigger("focus").trigger("blur");
              a.$button.off("blur.bs.select");
            });
          });
        setTimeout(function () {
          a.buildList();
          a.$element.trigger("loaded.bs.select");
        });
      },
      createDropdown: function () {
        var d = this.multiple || this.options.showTick ? " show-tick" : "",
          f = this.multiple ? ' aria-multiselectable\x3d"true"' : "",
          m = "",
          u = this.autofocus ? " autofocus" : "";
        4 > R.major &&
          this.$element.parent().hasClass("input-group") &&
          (m = " input-group-btn");
        var n = "",
          p = "",
          q = "",
          t = "";
        this.options.header &&
          (n =
            '\x3cdiv class\x3d"' +
            H.POPOVERHEADER +
            '"\x3e\x3cbutton type\x3d"button" class\x3d"close" aria-hidden\x3d"true"\x3e\x26times;\x3c/button\x3e' +
            this.options.header +
            "\x3c/div\x3e");
        this.options.liveSearch &&
          (p =
            '\x3cdiv class\x3d"bs-searchbox"\x3e\x3cinput type\x3d"search" class\x3d"form-control" autocomplete\x3d"off"' +
            (null === this.options.liveSearchPlaceholder
              ? ""
              : ' placeholder\x3d"' +
                ja(this.options.liveSearchPlaceholder) +
                '"') +
            ' role\x3d"combobox" aria-label\x3d"Search" aria-controls\x3d"' +
            this.selectId +
            '" aria-autocomplete\x3d"list"\x3e\x3c/div\x3e');
        this.multiple &&
          this.options.actionsBox &&
          (q =
            '\x3cdiv class\x3d"bs-actionsbox"\x3e\x3cdiv class\x3d"btn-group btn-group-sm btn-block"\x3e\x3cbutton type\x3d"button" class\x3d"actions-btn bs-select-all btn ' +
            H.BUTTONCLASS +
            '"\x3e' +
            this.options.selectAllText +
            '\x3c/button\x3e\x3cbutton type\x3d"button" class\x3d"actions-btn bs-deselect-all btn ' +
            H.BUTTONCLASS +
            '"\x3e' +
            this.options.deselectAllText +
            "\x3c/button\x3e\x3c/div\x3e\x3c/div\x3e");
        this.multiple &&
          this.options.doneButton &&
          (t =
            '\x3cdiv class\x3d"bs-donebutton"\x3e\x3cdiv class\x3d"btn-group btn-block"\x3e\x3cbutton type\x3d"button" class\x3d"btn btn-sm ' +
            H.BUTTONCLASS +
            '"\x3e' +
            this.options.doneButtonText +
            "\x3c/button\x3e\x3c/div\x3e\x3c/div\x3e");
        return a(
          '\x3cdiv class\x3d"dropdown bootstrap-select' +
            d +
            m +
            '"\x3e\x3cbutton type\x3d"button" tabindex\x3d"-1" class\x3d"' +
            this.options.styleBase +
            ' dropdown-toggle" ' +
            ("static" === this.options.display
              ? 'data-display\x3d"static"'
              : "") +
            'data-toggle\x3d"dropdown"' +
            u +
            ' role\x3d"combobox" aria-owns\x3d"' +
            this.selectId +
            '" aria-haspopup\x3d"listbox" aria-expanded\x3d"false"\x3e\x3cdiv class\x3d"filter-option"\x3e\x3cdiv class\x3d"filter-option-inner"\x3e\x3cdiv class\x3d"filter-option-inner-inner"\x3e\x3c/div\x3e\x3c/div\x3e \x3c/div\x3e' +
            ("4" === R.major
              ? ""
              : '\x3cspan class\x3d"bs-caret"\x3e' +
                this.options.template.caret +
                "\x3c/span\x3e") +
            '\x3c/button\x3e\x3cdiv class\x3d"' +
            H.MENU +
            " " +
            ("4" === R.major ? "" : H.SHOW) +
            '"\x3e' +
            n +
            p +
            q +
            '\x3cdiv class\x3d"inner ' +
            H.SHOW +
            '" role\x3d"listbox" id\x3d"' +
            this.selectId +
            '" tabindex\x3d"-1" ' +
            f +
            '\x3e\x3cul class\x3d"' +
            H.MENU +
            " inner " +
            ("4" === R.major ? H.SHOW : "") +
            '" role\x3d"presentation"\x3e\x3c/ul\x3e\x3c/div\x3e' +
            t +
            "\x3c/div\x3e\x3c/div\x3e"
        );
      },
      setPositionData: function () {
        this.selectpicker.view.canHighlight = [];
        this.selectpicker.view.size = 0;
        this.selectpicker.view.firstHighlightIndex = !1;
        for (var a = 0; a < this.selectpicker.current.data.length; a++) {
          var d = this.selectpicker.current.data[a],
            f = !0;
          "divider" === d.type
            ? ((f = !1), (d.height = this.sizeInfo.dividerHeight))
            : "optgroup-label" === d.type
            ? ((f = !1), (d.height = this.sizeInfo.dropdownHeaderHeight))
            : (d.height = this.sizeInfo.liHeight);
          d.disabled && (f = !1);
          this.selectpicker.view.canHighlight.push(f);
          f &&
            (this.selectpicker.view.size++,
            (d.posinset = this.selectpicker.view.size),
            !1 === this.selectpicker.view.firstHighlightIndex &&
              (this.selectpicker.view.firstHighlightIndex = a));
          d.position =
            (0 === a ? 0 : this.selectpicker.current.data[a - 1].position) +
            d.height;
        }
      },
      isVirtual: function () {
        return (
          (!1 !== this.options.virtualScroll &&
            this.selectpicker.main.elements.length >=
              this.options.virtualScroll) ||
          !0 === this.options.virtualScroll
        );
      },
      createView: function (d, f, m) {
        function g(a, g) {
          var f = n.selectpicker.current.elements.length,
            m = [],
            k,
            x,
            D,
            da,
            w = !0,
            L = n.isVirtual();
          n.selectpicker.view.scrollTop = a;
          k = Math.ceil(
            (n.sizeInfo.menuInnerHeight / n.sizeInfo.liHeight) * 1.5
          );
          x = Math.round(f / k) || 1;
          for (D = 0; D < x; D++) {
            var G = (D + 1) * k;
            D === x - 1 && (G = f);
            m[D] = [D * k + (D ? 1 : 0), G];
            if (!f) break;
            void 0 === da &&
              a - 1 <=
                n.selectpicker.current.data[G - 1].position -
                  n.sizeInfo.menuInnerHeight &&
              (da = D);
          }
          void 0 === da && (da = 0);
          a = [n.selectpicker.view.position0, n.selectpicker.view.position1];
          D = Math.max(0, da - 1);
          x = Math.min(x - 1, da + 1);
          n.selectpicker.view.position0 =
            !1 === L ? 0 : Math.max(0, m[D][0]) || 0;
          n.selectpicker.view.position1 =
            !1 === L ? f : Math.min(f, m[x][1]) || 0;
          D =
            a[0] !== n.selectpicker.view.position0 ||
            a[1] !== n.selectpicker.view.position1;
          void 0 !== n.activeIndex &&
            ((q = n.selectpicker.main.elements[n.prevActiveIndex]),
            (u = n.selectpicker.main.elements[n.activeIndex]),
            (p = n.selectpicker.main.elements[n.selectedIndex]),
            g &&
              (n.activeIndex !== n.selectedIndex && n.defocusItem(u),
              (n.activeIndex = void 0)),
            n.activeIndex &&
              n.activeIndex !== n.selectedIndex &&
              n.defocusItem(p));
          void 0 !== n.prevActiveIndex &&
            n.prevActiveIndex !== n.activeIndex &&
            n.prevActiveIndex !== n.selectedIndex &&
            n.defocusItem(q);
          if (g || D) {
            D = n.selectpicker.view.visibleElements
              ? n.selectpicker.view.visibleElements.slice()
              : [];
            n.selectpicker.view.visibleElements =
              !1 === L
                ? n.selectpicker.current.elements
                : n.selectpicker.current.elements.slice(
                    n.selectpicker.view.position0,
                    n.selectpicker.view.position1
                  );
            n.setOptionStatus();
            if (d || (!1 === L && g))
              w = !y(D, n.selectpicker.view.visibleElements);
            if ((g || !0 === L) && w) {
              w = n.$menuInner[0];
              m = document.createDocumentFragment();
              D = w.firstChild.cloneNode(!1);
              x = n.selectpicker.view.visibleElements;
              da = [];
              w.replaceChild(D, w.firstChild);
              D = 0;
              for (a = x.length; D < a; D++) {
                k = x[D];
                var E;
                n.options.sanitize &&
                  (G = k.lastChild) &&
                  (E =
                    n.selectpicker.current.data[
                      D + n.selectpicker.view.position0
                    ]) &&
                  E.content &&
                  !E.sanitized &&
                  (da.push(G), (E.sanitized = !0));
                m.appendChild(k);
              }
              n.options.sanitize &&
                da.length &&
                t(da, n.options.whiteList, n.options.sanitizeFn);
              !0 === L
                ? ((D =
                    0 === n.selectpicker.view.position0
                      ? 0
                      : n.selectpicker.current.data[
                          n.selectpicker.view.position0 - 1
                        ].position),
                  (f =
                    n.selectpicker.view.position1 > f - 1
                      ? 0
                      : n.selectpicker.current.data[f - 1].position -
                        n.selectpicker.current.data[
                          n.selectpicker.view.position1 - 1
                        ].position),
                  (w.firstChild.style.marginTop = D + "px"),
                  (w.firstChild.style.marginBottom = f + "px"))
                : ((w.firstChild.style.marginTop = 0),
                  (w.firstChild.style.marginBottom = 0));
              w.firstChild.appendChild(m);
              !0 === L &&
                n.sizeInfo.hasScrollBar &&
                ((L = w.firstChild.offsetWidth),
                g &&
                L < n.sizeInfo.menuInnerInnerWidth &&
                n.sizeInfo.totalMenuWidth > n.sizeInfo.selectWidth
                  ? (w.firstChild.style.minWidth =
                      n.sizeInfo.menuInnerInnerWidth + "px")
                  : L > n.sizeInfo.menuInnerInnerWidth &&
                    ((n.$menu[0].style.minWidth = 0),
                    (L = w.firstChild.offsetWidth),
                    L > n.sizeInfo.menuInnerInnerWidth &&
                      ((n.sizeInfo.menuInnerInnerWidth = L),
                      (w.firstChild.style.minWidth =
                        n.sizeInfo.menuInnerInnerWidth + "px")),
                    (n.$menu[0].style.minWidth = "")));
            }
          }
          n.prevActiveIndex = n.activeIndex;
          n.options.liveSearch
            ? d &&
              g &&
              ((g = 0),
              n.selectpicker.view.canHighlight[g] ||
                (g = 1 + n.selectpicker.view.canHighlight.slice(1).indexOf(!0)),
              (L = n.selectpicker.view.visibleElements[g]),
              n.defocusItem(n.selectpicker.view.currentActive),
              (n.activeIndex = (n.selectpicker.current.data[g] || {}).index),
              n.focusItem(L))
            : n.$menuInner.trigger("focus");
        }
        var n = this,
          x = 0,
          u = [],
          p,
          q;
        this.selectpicker.isSearching = d;
        this.selectpicker.current = d
          ? this.selectpicker.search
          : this.selectpicker.main;
        this.setPositionData();
        f &&
          (m
            ? (x = this.$menuInner[0].scrollTop)
            : n.multiple ||
              ((f = n.$element[0]),
              (f = (f.options[f.selectedIndex] || {}).liIndex),
              "number" === typeof f &&
                !1 !== n.options.size &&
                (f = (f = n.selectpicker.main.data[f]) && f.position) &&
                (x =
                  f - (n.sizeInfo.menuInnerHeight + n.sizeInfo.liHeight) / 2)));
        g(x, !0);
        this.$menuInner
          .off("scroll.createView")
          .on("scroll.createView", function (a, d) {
            n.noScroll || g(this.scrollTop, d);
            n.noScroll = !1;
          });
        a(window)
          .off("resize.bs.select." + this.selectId + ".createView")
          .on("resize.bs.select." + this.selectId + ".createView", function () {
            n.$newElement.hasClass(H.SHOW) && g(n.$menuInner[0].scrollTop);
          });
      },
      focusItem: function (a, d, f) {
        if (a) {
          d = d || this.selectpicker.main.data[this.activeIndex];
          var g = a.firstChild;
          g &&
            (g.setAttribute("aria-setsize", this.selectpicker.view.size),
            g.setAttribute("aria-posinset", d.posinset),
            !0 !== f &&
              (this.focusedParent.setAttribute("aria-activedescendant", g.id),
              a.classList.add("active"),
              g.classList.add("active")));
        }
      },
      defocusItem: function (a) {
        a &&
          (a.classList.remove("active"),
          a.firstChild && a.firstChild.classList.remove("active"));
      },
      setPlaceholder: function () {
        var a = this,
          d = !1;
        if (this.options.title && !this.multiple) {
          this.selectpicker.view.titleOption ||
            (this.selectpicker.view.titleOption =
              document.createElement("option"));
          var d = !0,
            f = this.$element[0],
            m = !1,
            n = !this.selectpicker.view.titleOption.parentNode,
            u = f.selectedIndex,
            p = f.options[u],
            q =
              window.performance &&
              window.performance.getEntriesByType("navigation"),
            q =
              q && q.length
                ? "back_forward" !== q[0].type
                : 2 !== window.performance.navigation.type;
          n &&
            ((this.selectpicker.view.titleOption.className = "bs-title-option"),
            (this.selectpicker.view.titleOption.value = ""),
            (m =
              !p ||
              (0 === u &&
                !1 === p.defaultSelected &&
                void 0 === this.$element.data("selected"))));
          (n || 0 !== this.selectpicker.view.titleOption.index) &&
            f.insertBefore(this.selectpicker.view.titleOption, f.firstChild);
          m && q
            ? (f.selectedIndex = 0)
            : "complete" !== document.readyState &&
              window.addEventListener("pageshow", function () {
                a.selectpicker.view.displayedValue !== f.value && a.render();
              });
        }
        return d;
      },
      buildData: function () {
        function a(a) {
          var d = n[n.length - 1];
          (d && "divider" === d.type && (d.optID || a.optID)) ||
            ((a = a || {}), (a.type = "divider"), n.push(a));
        }
        function d(d, g) {
          g = g || {};
          g.divider = "true" === d.getAttribute("data-divider");
          if (g.divider) a({ optID: g.optID });
          else {
            var k = n.length,
              f = d.style.cssText,
              f = f ? ja(f) : "",
              m = (d.className || "") + (g.optgroupClass || "");
            g.optID && (m = "opt " + m);
            g.optionClass = m.trim();
            g.inlineStyle = f;
            g.text = d.textContent;
            g.content = d.getAttribute("data-content");
            g.tokens = d.getAttribute("data-tokens");
            g.subtext = d.getAttribute("data-subtext");
            g.icon = d.getAttribute("data-icon");
            d.liIndex = k;
            g.display = g.content || g.text;
            g.type = "option";
            g.index = k;
            g.option = d;
            g.selected = !!d.selected;
            g.disabled = g.disabled || !!d.disabled;
            n.push(g);
          }
        }
        function f(g, f) {
          var k = f[g],
            x = g - 1 < p ? !1 : f[g - 1];
          g = f[g + 1];
          f = k.querySelectorAll("option" + m);
          if (f.length) {
            var q = {
                display: ja(k.label),
                subtext: k.getAttribute("data-subtext"),
                icon: k.getAttribute("data-icon"),
                type: "optgroup-label",
                optgroupClass: " " + (k.className || ""),
              },
              t,
              D;
            u++;
            x && a({ optID: u });
            q.optID = u;
            n.push(q);
            for (var x = 0, w = f.length; x < w; x++) {
              var da = f[x];
              0 === x && ((t = n.length - 1), (D = t + w));
              d(da, {
                headerIndex: t,
                lastIndex: D,
                optID: q.optID,
                optgroupClass: q.optgroupClass,
                disabled: k.disabled,
              });
            }
            g && a({ optID: u });
          }
        }
        var m = ':not([hidden]):not([data-hidden\x3d"true"])',
          n = [],
          u = 0,
          p = this.setPlaceholder() ? 1 : 0;
        this.options.hideDisabled && (m += ":not(:disabled)");
        for (
          var q = this.$element[0].querySelectorAll("select \x3e *" + m),
            D = q.length,
            t = p;
          t < D;
          t++
        ) {
          var w = q[t];
          "OPTGROUP" !== w.tagName ? d(w, {}) : f(t, q);
        }
        this.selectpicker.main.data = this.selectpicker.current.data = n;
      },
      buildList: function () {
        var a = this.selectpicker.main.data,
          d = [],
          f = 0;
        (!this.options.showTick && !this.multiple) ||
          J.checkMark.parentNode ||
          ((J.checkMark.className =
            this.options.iconBase +
            " " +
            this.options.tickIcon +
            " check-mark"),
          J.a.appendChild(J.checkMark));
        for (var m = a.length, n = 0; n < m; n++) {
          var u = a[n],
            q = void 0,
            p = 0;
          switch (u.type) {
            case "divider":
              q = ka.li(!1, H.DIVIDER, u.optID ? u.optID + "div" : void 0);
              break;
            case "option":
              q = ka.li(
                ka.a(ka.text.call(this, u), u.optionClass, u.inlineStyle),
                "",
                u.optID
              );
              q.firstChild && (q.firstChild.id = this.selectId + "-" + u.index);
              break;
            case "optgroup-label":
              q = ka.li(
                ka.label.call(this, u),
                "dropdown-header" + u.optgroupClass,
                u.optID
              );
          }
          u.element = q;
          d.push(q);
          u.display && (p += u.display.length);
          u.subtext && (p += u.subtext.length);
          u.icon && (p += 1);
          p > f &&
            ((f = p), (this.selectpicker.view.widestOption = d[d.length - 1]));
        }
        this.selectpicker.main.elements = this.selectpicker.current.elements =
          d;
      },
      findLis: function () {
        return this.$menuInner.find(".inner \x3e li");
      },
      render: function () {
        var a = this.$element[0],
          d = this.setPlaceholder() && 0 === a.selectedIndex,
          f = p(a, this.options.hideDisabled),
          m = f.length,
          n = this.$button[0],
          u = n.querySelector(".filter-option-inner-inner"),
          q = document.createTextNode(this.options.multipleSeparator),
          D = J.fragment.cloneNode(!1),
          G = !1;
        n.classList.toggle("bs-placeholder", this.multiple ? !m : !w(a, f));
        this.multiple ||
          1 !== f.length ||
          (this.selectpicker.view.displayedValue = w(a, f));
        if ("static" === this.options.selectedTextFormat)
          D = ka.text.call(this, { text: this.options.title }, !0);
        else {
          if (
            (a =
              this.multiple &&
              -1 !== this.options.selectedTextFormat.indexOf("count") &&
              1 < m)
          )
            (a = this.options.selectedTextFormat.split("\x3e")),
              (a = (1 < a.length && m > a[1]) || (1 === a.length && 2 <= m));
          if (!1 === a) {
            if (!d) {
              for (d = 0; d < m; d++)
                if (50 > d) {
                  var a = f[d],
                    E = this.selectpicker.main.data[a.liIndex],
                    y = {};
                  this.multiple && 0 < d && D.appendChild(q.cloneNode(!1));
                  a.title
                    ? (y.text = a.title)
                    : E &&
                      (E.content && this.options.showContent
                        ? ((y.content = E.content.toString()), (G = !0))
                        : (this.options.showIcon && (y.icon = E.icon),
                          this.options.showSubtext &&
                            !this.multiple &&
                            E.subtext &&
                            (y.subtext = " " + E.subtext),
                          (y.text = a.textContent.trim())));
                  D.appendChild(ka.text.call(this, y, !0));
                } else break;
              49 < m && D.appendChild(document.createTextNode("..."));
            }
          } else
            (f =
              ':not([hidden]):not([data-hidden\x3d"true"]):not([data-divider\x3d"true"])'),
              this.options.hideDisabled && (f += ":not(:disabled)"),
              (f = this.$element[0].querySelectorAll(
                "select \x3e option" + f + ", optgroup" + f + " option" + f
              ).length),
              (q =
                "function" === typeof this.options.countSelectedText
                  ? this.options.countSelectedText(m, f)
                  : this.options.countSelectedText),
              (D = ka.text.call(
                this,
                {
                  text: q
                    .replace("{0}", m.toString())
                    .replace("{1}", f.toString()),
                },
                !0
              ));
        }
        void 0 == this.options.title &&
          (this.options.title = this.$element.attr("title"));
        D.childNodes.length ||
          (D = ka.text.call(
            this,
            {
              text:
                "undefined" !== typeof this.options.title
                  ? this.options.title
                  : this.options.noneSelectedText,
            },
            !0
          ));
        n.title = D.textContent.replace(/<[^>]*>?/g, "").trim();
        this.options.sanitize &&
          G &&
          t([D], this.options.whiteList, this.options.sanitizeFn);
        u.innerHTML = "";
        u.appendChild(D);
        4 > R.major &&
          this.$newElement[0].classList.contains("bs3-has-addon") &&
          ((m = n.querySelector(".filter-expand")),
          (u = u.cloneNode(!0)),
          (u.className = "filter-expand"),
          m ? n.replaceChild(u, m) : n.appendChild(u));
        this.$element.trigger("rendered.bs.select");
      },
      setStyle: function (a, d) {
        var g = this.$button[0],
          f = this.$newElement[0],
          n = this.options.style.trim();
        this.$element.attr("class") &&
          this.$newElement.addClass(
            this.$element
              .attr("class")
              .replace(
                /selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,
                ""
              )
          );
        4 > R.major &&
          (f.classList.add("bs3"),
          f.parentNode.classList &&
            f.parentNode.classList.contains("input-group") &&
            (f.previousElementSibling || f.nextElementSibling) &&
            (
              f.previousElementSibling || f.nextElementSibling
            ).classList.contains("input-group-addon") &&
            f.classList.add("bs3-has-addon"));
        a = a ? a.trim() : n;
        "add" == d
          ? a && g.classList.add.apply(g.classList, a.split(" "))
          : "remove" == d
          ? a && g.classList.remove.apply(g.classList, a.split(" "))
          : (n && g.classList.remove.apply(g.classList, n.split(" ")),
            a && g.classList.add.apply(g.classList, a.split(" ")));
      },
      liHeight: function (d) {
        if (
          d ||
          (!1 !== this.options.size && !Object.keys(this.sizeInfo).length)
        ) {
          d = J.div.cloneNode(!1);
          var g = J.div.cloneNode(!1),
            f = J.div.cloneNode(!1),
            m = document.createElement("ul"),
            n = J.li.cloneNode(!1),
            u = J.li.cloneNode(!1),
            q,
            p = J.a.cloneNode(!1),
            D = J.span.cloneNode(!1),
            t =
              this.options.header &&
              0 < this.$menu.find("." + H.POPOVERHEADER).length
                ? this.$menu.find("." + H.POPOVERHEADER)[0].cloneNode(!0)
                : null,
            w = this.options.liveSearch ? J.div.cloneNode(!1) : null,
            E =
              this.options.actionsBox &&
              this.multiple &&
              0 < this.$menu.find(".bs-actionsbox").length
                ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0)
                : null,
            G =
              this.options.doneButton &&
              this.multiple &&
              0 < this.$menu.find(".bs-donebutton").length
                ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0)
                : null,
            k = this.$element.find("option")[0];
          this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;
          D.className = "text";
          p.className = "dropdown-item " + (k ? k.className : "");
          d.className = this.$menu[0].parentNode.className + " " + H.SHOW;
          d.style.width = 0;
          "auto" === this.options.width && (g.style.minWidth = 0);
          g.className = H.MENU + " " + H.SHOW;
          f.className = "inner " + H.SHOW;
          m.className = H.MENU + " inner " + ("4" === R.major ? H.SHOW : "");
          n.className = H.DIVIDER;
          u.className = "dropdown-header";
          D.appendChild(document.createTextNode("​"));
          if (this.selectpicker.current.data.length)
            for (p = 0; p < this.selectpicker.current.data.length; p++) {
              if (
                ((k = this.selectpicker.current.data[p]), "option" === k.type)
              ) {
                q = k.element;
                break;
              }
            }
          else (q = J.li.cloneNode(!1)), p.appendChild(D), q.appendChild(p);
          u.appendChild(D.cloneNode(!0));
          this.selectpicker.view.widestOption &&
            m.appendChild(this.selectpicker.view.widestOption.cloneNode(!0));
          m.appendChild(q);
          m.appendChild(n);
          m.appendChild(u);
          t && g.appendChild(t);
          w &&
            ((D = document.createElement("input")),
            (w.className = "bs-searchbox"),
            (D.className = "form-control"),
            w.appendChild(D),
            g.appendChild(w));
          E && g.appendChild(E);
          f.appendChild(m);
          g.appendChild(f);
          G && g.appendChild(G);
          d.appendChild(g);
          document.body.appendChild(d);
          q = q.offsetHeight;
          u = u ? u.offsetHeight : 0;
          t = t ? t.offsetHeight : 0;
          w = w ? w.offsetHeight : 0;
          E = E ? E.offsetHeight : 0;
          G = G ? G.offsetHeight : 0;
          n = a(n).outerHeight(!0);
          p = window.getComputedStyle ? window.getComputedStyle(g) : !1;
          m = g.offsetWidth;
          k = p ? null : a(g);
          D = {
            vert:
              F(p ? p.paddingTop : k.css("paddingTop")) +
              F(p ? p.paddingBottom : k.css("paddingBottom")) +
              F(p ? p.borderTopWidth : k.css("borderTopWidth")) +
              F(p ? p.borderBottomWidth : k.css("borderBottomWidth")),
            horiz:
              F(p ? p.paddingLeft : k.css("paddingLeft")) +
              F(p ? p.paddingRight : k.css("paddingRight")) +
              F(p ? p.borderLeftWidth : k.css("borderLeftWidth")) +
              F(p ? p.borderRightWidth : k.css("borderRightWidth")),
          };
          p = {
            vert:
              D.vert +
              F(p ? p.marginTop : k.css("marginTop")) +
              F(p ? p.marginBottom : k.css("marginBottom")) +
              2,
            horiz:
              D.horiz +
              F(p ? p.marginLeft : k.css("marginLeft")) +
              F(p ? p.marginRight : k.css("marginRight")) +
              2,
          };
          f.style.overflowY = "scroll";
          g = g.offsetWidth - m;
          document.body.removeChild(d);
          this.sizeInfo.liHeight = q;
          this.sizeInfo.dropdownHeaderHeight = u;
          this.sizeInfo.headerHeight = t;
          this.sizeInfo.searchHeight = w;
          this.sizeInfo.actionsHeight = E;
          this.sizeInfo.doneButtonHeight = G;
          this.sizeInfo.dividerHeight = n;
          this.sizeInfo.menuPadding = D;
          this.sizeInfo.menuExtras = p;
          this.sizeInfo.menuWidth = m;
          this.sizeInfo.menuInnerInnerWidth = m - D.horiz;
          this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
          this.sizeInfo.scrollBarWidth = g;
          this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight;
          this.setPositionData();
        }
      },
      getSelectPosition: function () {
        var d = a(window),
          f = this.$newElement.offset(),
          m = a(this.options.container),
          u;
        this.options.container && m.length && !m.is("body")
          ? ((u = m.offset()),
            (u.top += parseInt(m.css("borderTopWidth"))),
            (u.left += parseInt(m.css("borderLeftWidth"))))
          : (u = { top: 0, left: 0 });
        m = this.options.windowPadding;
        this.sizeInfo.selectOffsetTop = f.top - u.top - d.scrollTop();
        this.sizeInfo.selectOffsetBot =
          d.height() -
          this.sizeInfo.selectOffsetTop -
          this.sizeInfo.selectHeight -
          u.top -
          m[2];
        this.sizeInfo.selectOffsetLeft = f.left - u.left - d.scrollLeft();
        this.sizeInfo.selectOffsetRight =
          d.width() -
          this.sizeInfo.selectOffsetLeft -
          this.sizeInfo.selectWidth -
          u.left -
          m[1];
        this.sizeInfo.selectOffsetTop -= m[0];
        this.sizeInfo.selectOffsetLeft -= m[3];
      },
      setMenuSize: function (a) {
        this.getSelectPosition();
        a = this.sizeInfo.selectWidth;
        var d = this.sizeInfo.liHeight,
          g = this.sizeInfo.headerHeight,
          f = this.sizeInfo.searchHeight,
          n = this.sizeInfo.actionsHeight,
          m = this.sizeInfo.doneButtonHeight,
          u = this.sizeInfo.dividerHeight,
          p = this.sizeInfo.menuPadding,
          q,
          D = 0,
          t,
          w,
          E,
          k;
        this.options.dropupAuto &&
          ((k = d * this.selectpicker.current.elements.length + p.vert),
          (k =
            this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot >
              this.sizeInfo.menuExtras.vert &&
            k + this.sizeInfo.menuExtras.vert + 50 >
              this.sizeInfo.selectOffsetBot),
          !0 === this.selectpicker.isSearching &&
            (k = this.selectpicker.dropup),
          this.$newElement.toggleClass(H.DROPUP, k),
          (this.selectpicker.dropup = k));
        if ("auto" === this.options.size)
          (q =
            3 < this.selectpicker.current.elements.length
              ? 3 * this.sizeInfo.liHeight + this.sizeInfo.menuExtras.vert - 2
              : 0),
            (d = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert),
            (t = q + g + f + n + m),
            (E = Math.max(q - p.vert, 0)),
            this.$newElement.hasClass(H.DROPUP) &&
              (d =
                this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert),
            (w = d),
            (q = d - g - f - n - m - p.vert);
        else if (
          this.options.size &&
          "auto" != this.options.size &&
          this.selectpicker.current.elements.length > this.options.size
        ) {
          for (t = 0; t < this.options.size; t++)
            "divider" === this.selectpicker.current.data[t].type && D++;
          d = d * this.options.size + D * u + p.vert;
          q = d - p.vert;
          w = d + g + f + n + m;
          t = E = "";
        }
        this.$menu.css({
          "max-height": w + "px",
          overflow: "hidden",
          "min-height": t + "px",
        });
        this.$menuInner.css({
          "max-height": q + "px",
          "overflow-y": "auto",
          "min-height": E + "px",
        });
        this.sizeInfo.menuInnerHeight = Math.max(q, 1);
        this.selectpicker.current.data.length &&
          this.selectpicker.current.data[
            this.selectpicker.current.data.length - 1
          ].position > this.sizeInfo.menuInnerHeight &&
          ((this.sizeInfo.hasScrollBar = !0),
          (this.sizeInfo.totalMenuWidth =
            this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth));
        "auto" === this.options.dropdownAlignRight &&
          this.$menu.toggleClass(
            H.MENURIGHT,
            this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight &&
              this.sizeInfo.selectOffsetRight < this.sizeInfo.totalMenuWidth - a
          );
        this.dropdown &&
          this.dropdown._popper &&
          this.dropdown._popper.update();
      },
      setSize: function (d) {
        this.liHeight(d);
        this.options.header && this.$menu.css("padding-top", 0);
        if (!1 !== this.options.size) {
          var g = this,
            f = a(window);
          this.setMenuSize();
          if (this.options.liveSearch)
            this.$searchbox
              .off("input.setMenuSize propertychange.setMenuSize")
              .on("input.setMenuSize propertychange.setMenuSize", function () {
                return g.setMenuSize();
              });
          if ("auto" === this.options.size)
            f.off(
              "resize.bs.select." +
                this.selectId +
                ".setMenuSize scroll.bs.select." +
                this.selectId +
                ".setMenuSize"
            ).on(
              "resize.bs.select." +
                this.selectId +
                ".setMenuSize scroll.bs.select." +
                this.selectId +
                ".setMenuSize",
              function () {
                return g.setMenuSize();
              }
            );
          else
            this.options.size &&
              "auto" != this.options.size &&
              this.selectpicker.current.elements.length > this.options.size &&
              f.off(
                "resize.bs.select." +
                  this.selectId +
                  ".setMenuSize scroll.bs.select." +
                  this.selectId +
                  ".setMenuSize"
              );
        }
        this.createView(!1, !0, d);
      },
      setWidth: function () {
        var a = this;
        "auto" === this.options.width
          ? requestAnimationFrame(function () {
              a.$menu.css("min-width", "0");
              a.$element.on("loaded.bs.select", function () {
                a.liHeight();
                a.setMenuSize();
                var d = a.$newElement.clone().appendTo("body"),
                  g = d.css("width", "auto").children("button").outerWidth();
                d.remove();
                a.sizeInfo.selectWidth = Math.max(a.sizeInfo.totalMenuWidth, g);
                a.$newElement.css("width", a.sizeInfo.selectWidth + "px");
              });
            })
          : "fit" === this.options.width
          ? (this.$menu.css("min-width", ""),
            this.$newElement.css("width", "").addClass("fit-width"))
          : this.options.width
          ? (this.$menu.css("min-width", ""),
            this.$newElement.css("width", this.options.width))
          : (this.$menu.css("min-width", ""),
            this.$newElement.css("width", ""));
        this.$newElement.hasClass("fit-width") &&
          "fit" !== this.options.width &&
          this.$newElement[0].classList.remove("fit-width");
      },
      selectPosition: function () {
        this.$bsContainer = a('\x3cdiv class\x3d"bs-container" /\x3e');
        var d = this,
          f = a(this.options.container),
          m,
          u,
          n,
          p = function (g) {
            var x = {},
              p =
                d.options.display ||
                (a.fn.dropdown.Constructor.Default
                  ? a.fn.dropdown.Constructor.Default.display
                  : !1);
            d.$bsContainer
              .addClass(g.attr("class").replace(/form-control|fit-width/gi, ""))
              .toggleClass(H.DROPUP, g.hasClass(H.DROPUP));
            m = g.offset();
            f.is("body")
              ? (u = { top: 0, left: 0 })
              : ((u = f.offset()),
                (u.top += parseInt(f.css("borderTopWidth")) - f.scrollTop()),
                (u.left +=
                  parseInt(f.css("borderLeftWidth")) - f.scrollLeft()));
            n = g.hasClass(H.DROPUP) ? 0 : g[0].offsetHeight;
            if (4 > R.major || "static" === p)
              (x.top = m.top - u.top + n), (x.left = m.left - u.left);
            x.width = g[0].offsetWidth;
            d.$bsContainer.css(x);
          };
        this.$button.on("click.bs.dropdown.data-api", function () {
          d.isDisabled() ||
            (p(d.$newElement),
            d.$bsContainer
              .appendTo(d.options.container)
              .toggleClass(H.SHOW, !d.$button.hasClass(H.SHOW))
              .append(d.$menu));
        });
        a(window)
          .off(
            "resize.bs.select." +
              this.selectId +
              " scroll.bs.select." +
              this.selectId
          )
          .on(
            "resize.bs.select." +
              this.selectId +
              " scroll.bs.select." +
              this.selectId,
            function () {
              d.$newElement.hasClass(H.SHOW) && p(d.$newElement);
            }
          );
        this.$element.on("hide.bs.select", function () {
          d.$menu.data("height", d.$menu.height());
          d.$bsContainer.detach();
        });
      },
      setOptionStatus: function (a) {
        this.noScroll = !1;
        if (
          this.selectpicker.view.visibleElements &&
          this.selectpicker.view.visibleElements.length
        )
          for (
            var d = 0;
            d < this.selectpicker.view.visibleElements.length;
            d++
          ) {
            var g =
                this.selectpicker.current.data[
                  d + this.selectpicker.view.position0
                ],
              f = g.option;
            f &&
              (!0 !== a && this.setDisabled(g.index, g.disabled),
              this.setSelected(g.index, f.selected));
          }
      },
      setSelected: function (a, d) {
        var g = this.selectpicker.main.elements[a],
          f = this.selectpicker.main.data[a],
          n = void 0 !== this.activeIndex,
          m,
          u = this.activeIndex === a || (d && !this.multiple && !n);
        f.selected = d;
        m = g.firstChild;
        d && (this.selectedIndex = a);
        g.classList.toggle("selected", d);
        u
          ? (this.focusItem(g, f),
            (this.selectpicker.view.currentActive = g),
            (this.activeIndex = a))
          : this.defocusItem(g);
        m &&
          (m.classList.toggle("selected", d),
          d
            ? m.setAttribute("aria-selected", !0)
            : this.multiple
            ? m.setAttribute("aria-selected", !1)
            : m.removeAttribute("aria-selected"));
        u ||
          n ||
          !d ||
          void 0 === this.prevActiveIndex ||
          ((a = this.selectpicker.main.elements[this.prevActiveIndex]),
          this.defocusItem(a));
      },
      setDisabled: function (a, d) {
        var g = this.selectpicker.main.elements[a];
        this.selectpicker.main.data[a].disabled = d;
        a = g.firstChild;
        g.classList.toggle(H.DISABLED, d);
        a &&
          ("4" === R.major && a.classList.toggle(H.DISABLED, d),
          d
            ? (a.setAttribute("aria-disabled", d),
              a.setAttribute("tabindex", -1))
            : (a.removeAttribute("aria-disabled"),
              a.setAttribute("tabindex", 0)));
      },
      isDisabled: function () {
        return this.$element[0].disabled;
      },
      checkDisabled: function () {
        this.isDisabled()
          ? (this.$newElement[0].classList.add(H.DISABLED),
            this.$button.addClass(H.DISABLED).attr("aria-disabled", !0))
          : this.$button[0].classList.contains(H.DISABLED) &&
            (this.$newElement[0].classList.remove(H.DISABLED),
            this.$button.removeClass(H.DISABLED).attr("aria-disabled", !1));
      },
      clickListener: function () {
        function d() {
          m.options.liveSearch
            ? m.$searchbox.trigger("focus")
            : m.$menuInner.trigger("focus");
        }
        function f() {
          m.dropdown && m.dropdown._popper && m.dropdown._popper.state.isCreated
            ? d()
            : requestAnimationFrame(f);
        }
        var m = this,
          u = a(document);
        u.data("spaceSelect", !1);
        this.$button.on("keyup", function (a) {
          /(32)/.test(a.keyCode.toString(10)) &&
            u.data("spaceSelect") &&
            (a.preventDefault(), u.data("spaceSelect", !1));
        });
        this.$newElement.on("show.bs.dropdown", function () {
          3 < R.major &&
            !m.dropdown &&
            ((m.dropdown = m.$button.data("bs.dropdown")),
            (m.dropdown._menu = m.$menu[0]));
        });
        this.$button.on("click.bs.dropdown.data-api", function () {
          m.$newElement.hasClass(H.SHOW) || m.setSize();
        });
        this.$element.on("shown.bs.select", function () {
          m.$menuInner[0].scrollTop !== m.selectpicker.view.scrollTop &&
            (m.$menuInner[0].scrollTop = m.selectpicker.view.scrollTop);
          3 < R.major ? requestAnimationFrame(f) : d();
        });
        this.$menuInner.on("mouseenter", "li a", function (a) {
          a = this.parentElement;
          var d = m.isVirtual() ? m.selectpicker.view.position0 : 0,
            g = Array.prototype.indexOf.call(a.parentElement.children, a);
          m.focusItem(a, m.selectpicker.current.data[g + d], !0);
        });
        this.$menuInner.on("click", "li a", function (d, g) {
          var f = a(this),
            n = m.$element[0],
            u = m.isVirtual() ? m.selectpicker.view.position0 : 0,
            q = m.selectpicker.current.data[f.parent().index() + u],
            D = q.index,
            u = w(n),
            x = n.selectedIndex,
            t = n.options[x],
            k = !0;
          m.multiple && 1 !== m.options.maxOptions && d.stopPropagation();
          d.preventDefault();
          if (!m.isDisabled() && !f.parent().hasClass(H.DISABLED)) {
            d = q.option;
            var f = a(d),
              r = d.selected,
              E = f.parent("optgroup"),
              G = E.find("option"),
              q = m.options.maxOptions,
              y = E.data("maxOptions") || !1;
            D === m.activeIndex && (g = !0);
            g ||
              ((m.prevActiveIndex = m.activeIndex), (m.activeIndex = void 0));
            if (m.multiple) {
              if (
                ((d.selected = !r),
                m.setSelected(D, !r),
                m.focusedParent.focus(),
                !1 !== q || !1 !== y)
              )
                if (
                  ((g = q < p(n).length),
                  (t = y < E.find("option:selected").length),
                  (q && g) || (y && t))
                )
                  if (q && 1 == q)
                    (n.selectedIndex = -1),
                      (d.selected = !0),
                      m.setOptionStatus(!0);
                  else if (y && 1 == y) {
                    for (q = 0; q < G.length; q++)
                      (y = G[q]),
                        (y.selected = !1),
                        m.setSelected(y.liIndex, !1);
                    d.selected = !0;
                    m.setSelected(D, !0);
                  } else {
                    var G =
                        "string" === typeof m.options.maxOptionsText
                          ? [m.options.maxOptionsText, m.options.maxOptionsText]
                          : m.options.maxOptionsText,
                      G = "function" === typeof G ? G(q, y) : G,
                      E = G[0].replace("{n}", q),
                      r = G[1].replace("{n}", y),
                      C = a('\x3cdiv class\x3d"notify"\x3e\x3c/div\x3e');
                    G[2] &&
                      ((E = E.replace("{var}", G[2][1 < q ? 0 : 1])),
                      (r = r.replace("{var}", G[2][1 < y ? 0 : 1])));
                    d.selected = !1;
                    m.$menu.append(C);
                    q &&
                      g &&
                      (C.append(a("\x3cdiv\x3e" + E + "\x3c/div\x3e")),
                      (k = !1),
                      m.$element.trigger("maxReached.bs.select"));
                    y &&
                      t &&
                      (C.append(a("\x3cdiv\x3e" + r + "\x3c/div\x3e")),
                      (k = !1),
                      m.$element.trigger("maxReachedGrp.bs.select"));
                    setTimeout(function () {
                      m.setSelected(D, !1);
                    }, 10);
                    C[0].classList.add("fadeOut");
                    setTimeout(function () {
                      C.remove();
                    }, 1050);
                  }
            } else
              t && (t.selected = !1), (d.selected = !0), m.setSelected(D, !0);
            !m.multiple || (m.multiple && 1 === m.options.maxOptions)
              ? m.$button.trigger("focus")
              : m.options.liveSearch && m.$searchbox.trigger("focus");
            k &&
              (m.multiple || x !== n.selectedIndex) &&
              ((X = [d.index, f.prop("selected"), u]),
              m.$element.triggerNative("change"));
          }
        });
        this.$menu.on(
          "click",
          "li." +
            H.DISABLED +
            " a, ." +
            H.POPOVERHEADER +
            ", ." +
            H.POPOVERHEADER +
            " :not(.close)",
          function (d) {
            d.currentTarget == this &&
              (d.preventDefault(),
              d.stopPropagation(),
              m.options.liveSearch && !a(d.target).hasClass("close")
                ? m.$searchbox.trigger("focus")
                : m.$button.trigger("focus"));
          }
        );
        this.$menuInner.on("click", ".divider, .dropdown-header", function (a) {
          a.preventDefault();
          a.stopPropagation();
          m.options.liveSearch
            ? m.$searchbox.trigger("focus")
            : m.$button.trigger("focus");
        });
        this.$menu.on("click", "." + H.POPOVERHEADER + " .close", function () {
          m.$button.trigger("click");
        });
        this.$searchbox.on("click", function (a) {
          a.stopPropagation();
        });
        this.$menu.on("click", ".actions-btn", function (d) {
          m.options.liveSearch
            ? m.$searchbox.trigger("focus")
            : m.$button.trigger("focus");
          d.preventDefault();
          d.stopPropagation();
          a(this).hasClass("bs-select-all") ? m.selectAll() : m.deselectAll();
        });
        this.$button
          .on("focus.bs.select", function (a) {
            var d = m.$element[0].getAttribute("tabindex");
            void 0 !== d &&
              a.originalEvent &&
              a.originalEvent.isTrusted &&
              (this.setAttribute("tabindex", d),
              m.$element[0].setAttribute("tabindex", -1),
              (m.selectpicker.view.tabindex = d));
          })
          .on("blur.bs.select", function (a) {
            void 0 !== m.selectpicker.view.tabindex &&
              a.originalEvent &&
              a.originalEvent.isTrusted &&
              (m.$element[0].setAttribute(
                "tabindex",
                m.selectpicker.view.tabindex
              ),
              this.setAttribute("tabindex", -1),
              (m.selectpicker.view.tabindex = void 0));
          });
        this.$element
          .on("change.bs.select", function () {
            m.render();
            m.$element.trigger("changed.bs.select", X);
            X = null;
          })
          .on("focus.bs.select", function () {
            m.options.mobile || m.$button[0].focus();
          });
      },
      liveSearchListener: function () {
        var a = this;
        this.$button.on("click.bs.dropdown.data-api", function () {
          a.$searchbox.val() &&
            (a.$searchbox.val(""),
            (a.selectpicker.search.previousValue = void 0));
        });
        this.$searchbox.on(
          "click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api",
          function (a) {
            a.stopPropagation();
          }
        );
        this.$searchbox.on("input propertychange", function () {
          var g = a.$searchbox[0].value;
          a.selectpicker.search.elements = [];
          a.selectpicker.search.data = [];
          if (g) {
            var f,
              m = [],
              n = g.toUpperCase(),
              u = {},
              p = [],
              q = a._searchStyle(),
              D = a.options.liveSearchNormalize;
            D && (n = K(n));
            for (f = 0; f < a.selectpicker.main.data.length; f++) {
              var t = a.selectpicker.main.data[f];
              u[f] || (u[f] = B(t, n, q, D));
              u[f] &&
                void 0 !== t.headerIndex &&
                -1 === p.indexOf(t.headerIndex) &&
                (0 < t.headerIndex &&
                  ((u[t.headerIndex - 1] = !0), p.push(t.headerIndex - 1)),
                (u[t.headerIndex] = !0),
                p.push(t.headerIndex),
                (u[t.lastIndex + 1] = !0));
              u[f] && "optgroup-label" !== t.type && p.push(f);
            }
            f = 0;
            for (n = p.length; f < n; f++)
              if (
                ((u = p[f]),
                (q = p[f - 1]),
                (t = a.selectpicker.main.data[u]),
                (q = a.selectpicker.main.data[q]),
                "divider" !== t.type ||
                  ("divider" === t.type &&
                    q &&
                    "divider" !== q.type &&
                    n - 1 !== f))
              )
                a.selectpicker.search.data.push(t),
                  m.push(a.selectpicker.main.elements[u]);
            a.activeIndex = void 0;
            a.noScroll = !0;
            a.$menuInner.scrollTop(0);
            a.selectpicker.search.elements = m;
            a.createView(!0);
            d.call(a, m, g);
          } else a.selectpicker.search.previousValue && (a.$menuInner.scrollTop(0), a.createView(!1));
          a.selectpicker.search.previousValue = g;
        });
      },
      _searchStyle: function () {
        return this.options.liveSearchStyle || "contains";
      },
      val: function (a) {
        var d = this.$element[0];
        return "undefined" !== typeof a
          ? ((X = [null, null, w(d)]),
            this.$element.val(a).trigger("changed.bs.select", X),
            this.$newElement.hasClass(H.SHOW) &&
              (this.multiple
                ? this.setOptionStatus(!0)
                : ((a = (d.options[d.selectedIndex] || {}).liIndex),
                  "number" === typeof a &&
                    (this.setSelected(this.selectedIndex, !1),
                    this.setSelected(a, !0)))),
            this.render(),
            (X = null),
            this.$element)
          : this.$element.val();
      },
      changeAll: function (a) {
        if (this.multiple) {
          "undefined" === typeof a && (a = !0);
          var d = this.$element[0],
            g = 0,
            f = 0,
            m = w(d);
          d.classList.add("bs-select-hidden");
          for (
            var u = 0, p = this.selectpicker.current.data, q = p.length;
            u < q;
            u++
          ) {
            var t = p[u],
              D = t.option;
            D &&
              !t.disabled &&
              "divider" !== t.type &&
              (t.selected && g++, (D.selected = a), !0 === a && f++);
          }
          d.classList.remove("bs-select-hidden");
          g !== f &&
            (this.setOptionStatus(),
            (X = [null, null, m]),
            this.$element.triggerNative("change"));
        }
      },
      selectAll: function () {
        return this.changeAll(!0);
      },
      deselectAll: function () {
        return this.changeAll(!1);
      },
      toggle: function (a) {
        (a = a || window.event) && a.stopPropagation();
        this.$button.trigger("click.bs.dropdown.data-api");
      },
      keydown: function (d) {
        var g = a(this),
          f = g.hasClass("dropdown-toggle"),
          m = (f ? g.closest(".dropdown") : g.closest(ya)).data("this"),
          n = m.findLis(),
          u,
          p,
          q,
          t = !1,
          D = 9 === d.which && !f && !m.options.selectOnTab;
        p = Ba.test(d.which) || D;
        var w = m.$menuInner[0].scrollTop,
          E = !0 === m.isVirtual() ? m.selectpicker.view.position0 : 0;
        if (!(112 <= d.which && 123 >= d.which)) {
          f = m.$newElement.hasClass(H.SHOW);
          if (
            !f &&
            (p ||
              (48 <= d.which && 57 >= d.which) ||
              (96 <= d.which && 105 >= d.which) ||
              (65 <= d.which && 90 >= d.which)) &&
            (m.$button.trigger("click.bs.dropdown.data-api"),
            m.options.liveSearch)
          ) {
            m.$searchbox.trigger("focus");
            return;
          }
          27 === d.which &&
            f &&
            (d.preventDefault(),
            m.$button.trigger("click.bs.dropdown.data-api").trigger("focus"));
          if (p) {
            if (!n.length) return;
            u = (p = m.selectpicker.main.elements[m.activeIndex])
              ? Array.prototype.indexOf.call(p.parentElement.children, p)
              : -1;
            -1 !== u && m.defocusItem(p);
            if (38 === d.which)
              -1 !== u && u--,
                0 > u + E && (u += n.length),
                m.selectpicker.view.canHighlight[u + E] ||
                  ((u =
                    m.selectpicker.view.canHighlight
                      .slice(0, u + E)
                      .lastIndexOf(!0) - E),
                  -1 === u && (u = n.length - 1));
            else if (40 === d.which || D)
              u++,
                u + E >= m.selectpicker.view.canHighlight.length &&
                  (u = m.selectpicker.view.firstHighlightIndex),
                m.selectpicker.view.canHighlight[u + E] ||
                  (u =
                    u +
                    1 +
                    m.selectpicker.view.canHighlight
                      .slice(u + E + 1)
                      .indexOf(!0));
            d.preventDefault();
            var G = E + u;
            if (38 === d.which)
              0 === E && u === n.length - 1
                ? ((m.$menuInner[0].scrollTop = m.$menuInner[0].scrollHeight),
                  (G = m.selectpicker.current.elements.length - 1))
                : ((n = m.selectpicker.current.data[G]),
                  (q = n.position - n.height),
                  (t = q < w));
            else if (40 === d.which || D)
              u === m.selectpicker.view.firstHighlightIndex
                ? ((m.$menuInner[0].scrollTop = 0),
                  (G = m.selectpicker.view.firstHighlightIndex))
                : ((n = m.selectpicker.current.data[G]),
                  (q = n.position - m.sizeInfo.menuInnerHeight),
                  (t = q > w));
            p = m.selectpicker.current.elements[G];
            m.activeIndex = m.selectpicker.current.data[G].index;
            m.focusItem(p);
            m.selectpicker.view.currentActive = p;
            t && (m.$menuInner[0].scrollTop = q);
            m.options.liveSearch
              ? m.$searchbox.trigger("focus")
              : g.trigger("focus");
          } else if (
            (!g.is("input") && !Ea.test(d.which)) ||
            (32 === d.which && m.selectpicker.keydown.keyHistory)
          ) {
            D = [];
            d.preventDefault();
            m.selectpicker.keydown.keyHistory += sa[d.which];
            m.selectpicker.keydown.resetKeyHistory.cancel &&
              clearTimeout(m.selectpicker.keydown.resetKeyHistory.cancel);
            m.selectpicker.keydown.resetKeyHistory.cancel =
              m.selectpicker.keydown.resetKeyHistory.start();
            q = m.selectpicker.keydown.keyHistory;
            /^(.)\1+$/.test(q) && (q = q.charAt(0));
            for (t = 0; t < m.selectpicker.current.data.length; t++)
              (p = m.selectpicker.current.data[t]),
                B(p, q, "startsWith", !0) &&
                  m.selectpicker.view.canHighlight[t] &&
                  D.push(p.index);
            D.length &&
              ((E = 0),
              n.removeClass("active").find("a").removeClass("active"),
              1 === q.length &&
                ((E = D.indexOf(m.activeIndex)),
                -1 === E || E === D.length - 1 ? (E = 0) : E++),
              (p = D[E]),
              (n = m.selectpicker.main.data[p]),
              0 < w - n.position
                ? ((q = n.position - n.height), (t = !0))
                : ((q = n.position - m.sizeInfo.menuInnerHeight),
                  (t = n.position > w + m.sizeInfo.menuInnerHeight)),
              (p = m.selectpicker.main.elements[p]),
              (m.activeIndex = D[E]),
              m.focusItem(p),
              p && p.firstChild.focus(),
              t && (m.$menuInner[0].scrollTop = q),
              g.trigger("focus"));
          }
          f &&
            ((32 === d.which && !m.selectpicker.keydown.keyHistory) ||
              13 === d.which ||
              (9 === d.which && m.options.selectOnTab)) &&
            (32 !== d.which && d.preventDefault(),
            (m.options.liveSearch && 32 === d.which) ||
              (m.$menuInner.find(".active a").trigger("click", !0),
              g.trigger("focus"),
              m.options.liveSearch ||
                (d.preventDefault(), a(document).data("spaceSelect", !0))));
        }
      },
      mobile: function () {
        this.options.mobile = !0;
        this.$element[0].classList.add("mobile-device");
      },
      refresh: function () {
        this.options = a.extend({}, this.options, this.$element.data());
        this.checkDisabled();
        this.buildData();
        this.setStyle();
        this.render();
        this.buildList();
        this.setWidth();
        this.setSize(!0);
        this.$element.trigger("refreshed.bs.select");
      },
      hide: function () {
        this.$newElement.hide();
      },
      show: function () {
        this.$newElement.show();
      },
      remove: function () {
        this.$newElement.remove();
        this.$element.remove();
      },
      destroy: function () {
        this.$newElement.before(this.$element).remove();
        this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove();
        this.selectpicker.view.titleOption &&
          this.selectpicker.view.titleOption.parentNode &&
          this.selectpicker.view.titleOption.parentNode.removeChild(
            this.selectpicker.view.titleOption
          );
        this.$element
          .off(".bs.select")
          .removeData("selectpicker")
          .removeClass("bs-select-hidden selectpicker");
        a(window).off(".bs.select." + this.selectId);
      },
    };
    var xa = a.fn.selectpicker;
    a.fn.selectpicker = I;
    a.fn.selectpicker.Constructor = Q;
    a.fn.selectpicker.noConflict = function () {
      a.fn.selectpicker = xa;
      return this;
    };
    a(document)
      .off("keydown.bs.dropdown.data-api")
      .on(
        "keydown.bs.dropdown.data-api",
        ':not(.bootstrap-select) \x3e [data-toggle\x3d"dropdown"]',
        C
      )
      .on(
        "keydown.bs.dropdown.data-api",
        ":not(.bootstrap-select) \x3e .dropdown-menu",
        C
      )
      .on(
        "keydown.bs.select",
        '.bootstrap-select [data-toggle\x3d"dropdown"], .bootstrap-select [role\x3d"listbox"], .bootstrap-select .bs-searchbox input',
        Q.prototype.keydown
      )
      .on(
        "focusin.modal",
        '.bootstrap-select [data-toggle\x3d"dropdown"], .bootstrap-select [role\x3d"listbox"], .bootstrap-select .bs-searchbox input',
        function (a) {
          a.stopPropagation();
        }
      );
    a(window).on("load.bs.select.data-api", function () {
      a(".selectpicker").each(function () {
        var d = a(this);
        I.call(d, d.data());
      });
    });
  })(a);
});
(function (a, f) {
  "object" === typeof exports && "undefined" !== typeof module
    ? f()
    : "function" === typeof define && define.amd
    ? define(f)
    : f();
})(this, function () {
  function a() {
    function a(a) {
      return a &&
        a !== document &&
        "HTML" !== a.nodeName &&
        "BODY" !== a.nodeName &&
        "classList" in a &&
        "contains" in a.classList
        ? !0
        : !1;
    }
    function f(a) {
      a.classList.contains("focus-visible") ||
        (a.classList.add("focus-visible"),
        a.setAttribute("data-focus-visible-added", ""));
    }
    function y(a) {
      a.hasAttribute("data-focus-visible-added") &&
        (a.classList.remove("focus-visible"),
        a.removeAttribute("data-focus-visible-added"));
    }
    function p(a) {
      F = !1;
    }
    function w() {
      document.addEventListener("mousemove", B);
      document.addEventListener("mousedown", B);
      document.addEventListener("mouseup", B);
      document.addEventListener("pointermove", B);
      document.addEventListener("pointerdown", B);
      document.addEventListener("pointerup", B);
      document.addEventListener("touchmove", B);
      document.addEventListener("touchstart", B);
      document.addEventListener("touchend", B);
    }
    function B(a) {
      "html" !== a.target.nodeName.toLowerCase() &&
        ((F = !1),
        document.removeEventListener("mousemove", B),
        document.removeEventListener("mousedown", B),
        document.removeEventListener("mouseup", B),
        document.removeEventListener("pointermove", B),
        document.removeEventListener("pointerdown", B),
        document.removeEventListener("pointerup", B),
        document.removeEventListener("touchmove", B),
        document.removeEventListener("touchstart", B),
        document.removeEventListener("touchend", B));
    }
    var F = !0,
      O = !1,
      K = null,
      d = {
        text: !0,
        search: !0,
        url: !0,
        tel: !0,
        email: !0,
        password: !0,
        number: !0,
        date: !0,
        month: !0,
        week: !0,
        time: !0,
        datetime: !0,
        "datetime-local": !0,
      };
    document.addEventListener(
      "keydown",
      function (d) {
        a(document.activeElement) && f(document.activeElement);
        F = !0;
      },
      !0
    );
    document.addEventListener("mousedown", p, !0);
    document.addEventListener("pointerdown", p, !0);
    document.addEventListener("touchstart", p, !0);
    document.addEventListener(
      "focus",
      function (p) {
        if (a(p.target)) {
          var q;
          if (!(q = F)) {
            q = p.target;
            var t = q.type,
              w = q.tagName;
            q =
              ("INPUT" == w && d[t] && !q.readOnly) ||
              ("TEXTAREA" == w && !q.readOnly) ||
              q.isContentEditable
                ? !0
                : !1;
          }
          q && f(p.target);
        }
      },
      !0
    );
    document.addEventListener(
      "blur",
      function (d) {
        a(d.target) &&
          (d.target.classList.contains("focus-visible") ||
            d.target.hasAttribute("data-focus-visible-added")) &&
          ((O = !0),
          window.clearTimeout(K),
          (K = window.setTimeout(function () {
            O = !1;
            window.clearTimeout(K);
          }, 100)),
          y(d.target));
      },
      !0
    );
    document.addEventListener(
      "visibilitychange",
      function (a) {
        "hidden" == document.visibilityState && (O && (F = !0), w());
      },
      !0
    );
    w();
    document.body.classList.add("js-focus-visible");
  }
  function f(a) {
    function f() {
      q || ((q = !0), a());
    }
    var q;
    0 <= ["interactive", "complete"].indexOf(document.readyState)
      ? a()
      : ((q = !1),
        document.addEventListener("DOMContentLoaded", f, !1),
        window.addEventListener("load", f, !1));
  }
  "undefined" !== typeof document && f(a);
});
(function (a) {}.call(
  ("object" === typeof window && window) ||
    ("object" === typeof self && self) ||
    ("object" === typeof global && global) ||
    {}
));
(function (a, f) {
  function q(a, d) {
    for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f]);
  }
  function t(a) {
    for (var d = 0; a; ) (d += a.offsetTop), (a = a.offsetParent);
    return d;
  }
  function y() {
    function p() {
      a.pageXOffset != K.left
        ? ((K.top = a.pageYOffset), (K.left = a.pageXOffset), C.refreshAll())
        : a.pageYOffset != K.top &&
          ((K.top = a.pageYOffset),
          (K.left = a.pageXOffset),
          d.forEach(function (a) {
            return a._recalcPosition();
          }));
    }
    function q() {
      t = setInterval(function () {
        d.forEach(function (a) {
          return a._fastCheck();
        });
      }, 500);
    }
    if (!F) {
      F = !0;
      p();
      a.addEventListener("scroll", p);
      a.addEventListener("resize", C.refreshAll);
      a.addEventListener("orientationchange", C.refreshAll);
      var t = void 0,
        w = void 0,
        y = void 0;
      "hidden" in f
        ? ((w = "hidden"), (y = "visibilitychange"))
        : "webkitHidden" in f &&
          ((w = "webkitHidden"), (y = "webkitvisibilitychange"));
      y
        ? (f[w] || q(),
          f.addEventListener(y, function () {
            f[w] ? clearInterval(t) : q();
          }))
        : q();
    }
  }
  var p = (function () {
      function a(a, d) {
        for (var f = 0; f < d.length; f++) {
          var p = d[f];
          p.enumerable = p.enumerable || !1;
          p.configurable = !0;
          "value" in p && (p.writable = !0);
          Object.defineProperty(a, p.key, p);
        }
      }
      return function (d, f, p) {
        f && a(d.prototype, f);
        p && a(d, p);
        return d;
      };
    })(),
    w = !1,
    B = "undefined" !== typeof a;
  B && a.getComputedStyle
    ? (function () {
        var a = f.createElement("div");
        ["", "-webkit-", "-moz-", "-ms-"].some(function (d) {
          try {
            a.style.position = d + "sticky";
          } catch (ga) {}
          return "" != a.style.position;
        }) && (w = !0);
      })()
    : (w = !0);
  var F = !1,
    O = "undefined" !== typeof ShadowRoot,
    K = { top: null, left: null },
    d = [],
    I = (function () {
      function y(a) {
        if (!(this instanceof y))
          throw new TypeError("Cannot call a class as a function");
        if (!(a instanceof HTMLElement))
          throw Error("First argument must be HTMLElement");
        if (
          d.some(function (d) {
            return d._node === a;
          })
        )
          throw Error("Stickyfill is already applied to this node");
        this._node = a;
        this._stickyMode = null;
        this._active = !1;
        d.push(this);
        this.refresh();
      }
      p(y, [
        {
          key: "refresh",
          value: function () {
            if (!w && !this._removed) {
              this._active && this._deactivate();
              var d = this._node,
                p = getComputedStyle(d),
                y = p.top,
                B = p.display,
                C = p.marginTop,
                F = p.marginBottom,
                I = p.marginLeft,
                E = p.marginRight,
                ca = p.cssFloat;
              if (!isNaN(parseFloat(y)) && "table-cell" != B && "none" != B) {
                this._active = !0;
                var X = d.style.position;
                if ("sticky" == p.position || "-webkit-sticky" == p.position)
                  d.style.position = "static";
                var p = d.parentNode,
                  m = O && p instanceof ShadowRoot ? p.host : p,
                  B = d.getBoundingClientRect(),
                  u = m.getBoundingClientRect(),
                  G = getComputedStyle(m);
                this._parent = {
                  node: m,
                  styles: { position: m.style.position },
                  offsetHeight: m.offsetHeight,
                };
                this._offsetToWindow = {
                  left: B.left,
                  right: f.documentElement.clientWidth - B.right,
                };
                this._offsetToParent = {
                  top: B.top - u.top - (parseFloat(G.borderTopWidth) || 0),
                  left: B.left - u.left - (parseFloat(G.borderLeftWidth) || 0),
                  right:
                    -B.right + u.right - (parseFloat(G.borderRightWidth) || 0),
                };
                this._styles = {
                  position: X,
                  top: d.style.top,
                  bottom: d.style.bottom,
                  left: d.style.left,
                  right: d.style.right,
                  width: d.style.width,
                  marginTop: d.style.marginTop,
                  marginLeft: d.style.marginLeft,
                  marginRight: d.style.marginRight,
                };
                y = parseFloat(y) || 0;
                this._limits = {
                  start: B.top + a.pageYOffset - y,
                  end:
                    u.top +
                    a.pageYOffset +
                    m.offsetHeight -
                    (parseFloat(G.borderBottomWidth) || 0) -
                    d.offsetHeight -
                    y -
                    (parseFloat(F) || 0),
                };
                y = G.position;
                "absolute" != y &&
                  "relative" != y &&
                  (m.style.position = "relative");
                this._recalcPosition();
                y = this._clone = {};
                y.node = f.createElement("div");
                q(y.node.style, {
                  width: B.right - B.left + "px",
                  height: B.bottom - B.top + "px",
                  marginTop: C,
                  marginBottom: F,
                  marginLeft: I,
                  marginRight: E,
                  cssFloat: ca,
                  padding: 0,
                  border: 0,
                  borderSpacing: 0,
                  fontSize: "1em",
                  position: "static",
                });
                p.insertBefore(y.node, d);
                y.docOffsetTop = t(y.node);
              }
            }
          },
        },
        {
          key: "_recalcPosition",
          value: function () {
            if (this._active && !this._removed) {
              var a =
                K.top <= this._limits.start
                  ? "start"
                  : K.top >= this._limits.end
                  ? "end"
                  : "middle";
              if (this._stickyMode != a) {
                switch (a) {
                  case "start":
                    q(this._node.style, {
                      position: "absolute",
                      left: this._offsetToParent.left + "px",
                      right: this._offsetToParent.right + "px",
                      top: this._offsetToParent.top + "px",
                      bottom: "auto",
                      width: "auto",
                      marginLeft: 0,
                      marginRight: 0,
                      marginTop: 0,
                    });
                    break;
                  case "middle":
                    q(this._node.style, {
                      position: "fixed",
                      left: this._offsetToWindow.left + "px",
                      right: this._offsetToWindow.right + "px",
                      top: this._styles.top,
                      bottom: "auto",
                      width: "auto",
                      marginLeft: 0,
                      marginRight: 0,
                      marginTop: 0,
                    });
                    break;
                  case "end":
                    q(this._node.style, {
                      position: "absolute",
                      left: this._offsetToParent.left + "px",
                      right: this._offsetToParent.right + "px",
                      top: "auto",
                      bottom: 0,
                      width: "auto",
                      marginLeft: 0,
                      marginRight: 0,
                    });
                }
                this._stickyMode = a;
              }
            }
          },
        },
        {
          key: "_fastCheck",
          value: function () {
            this._active &&
              !this._removed &&
              (1 < Math.abs(t(this._clone.node) - this._clone.docOffsetTop) ||
                1 <
                  Math.abs(
                    this._parent.node.offsetHeight - this._parent.offsetHeight
                  )) &&
              this.refresh();
          },
        },
        {
          key: "_deactivate",
          value: function () {
            var a = this;
            this._active &&
              !this._removed &&
              (this._clone.node.parentNode.removeChild(this._clone.node),
              delete this._clone,
              q(this._node.style, this._styles),
              delete this._styles,
              d.some(function (d) {
                return (
                  d !== a && d._parent && d._parent.node === a._parent.node
                );
              }) || q(this._parent.node.style, this._parent.styles),
              delete this._parent,
              (this._stickyMode = null),
              (this._active = !1),
              delete this._offsetToWindow,
              delete this._offsetToParent,
              delete this._limits);
          },
        },
        {
          key: "remove",
          value: function () {
            var a = this;
            this._deactivate();
            d.some(function (f, p) {
              if (f._node === a._node) return d.splice(p, 1), !0;
            });
            this._removed = !0;
          },
        },
      ]);
      return y;
    })(),
    C = {
      stickies: d,
      Sticky: I,
      forceSticky: function () {
        w = !1;
        y();
        this.refreshAll();
      },
      addOne: function (a) {
        if (!(a instanceof HTMLElement))
          if (a.length && a[0]) a = a[0];
          else return;
        for (var f = 0; f < d.length; f++) if (d[f]._node === a) return d[f];
        return new I(a);
      },
      add: function (a) {
        a instanceof HTMLElement && (a = [a]);
        if (a.length) {
          for (
            var f = [],
              p = function (p) {
                var q = a[p];
                if (!(q instanceof HTMLElement))
                  return f.push(void 0), "continue";
                if (
                  d.some(function (a) {
                    if (a._node === q) return f.push(a), !0;
                  })
                )
                  return "continue";
                f.push(new I(q));
              },
              q = 0;
            q < a.length;
            q++
          )
            p(q);
          return f;
        }
      },
      refreshAll: function () {
        d.forEach(function (a) {
          return a.refresh();
        });
      },
      removeOne: function (a) {
        if (!(a instanceof HTMLElement))
          if (a.length && a[0]) a = a[0];
          else return;
        d.some(function (d) {
          if (d._node === a) return d.remove(), !0;
        });
      },
      remove: function (a) {
        a instanceof HTMLElement && (a = [a]);
        if (a.length)
          for (
            var f = function (f) {
                var p = a[f];
                d.some(function (a) {
                  if (a._node === p) return a.remove(), !0;
                });
              },
              p = 0;
            p < a.length;
            p++
          )
            f(p);
      },
      removeAll: function () {
        for (; d.length; ) d[0].remove();
      },
    };
  w || y();
  "undefined" != typeof module && module.exports
    ? (module.exports = C)
    : B && (a.Stickyfill = C);
})(window, document);
(function (a, f) {
  var q;
  if ("object" === typeof exports) {
    try {
      q = require("moment");
    } catch (t) {}
    module.exports = f(q);
  } else
    "function" === typeof define && define.amd
      ? define(function (a) {
          try {
            q = a("moment");
          } catch (y) {}
          return f(q);
        })
      : (a.Pikaday = f(a.moment));
})(this, function (a) {
  var f = "function" === typeof a,
    q = !!window.addEventListener,
    t = window.document,
    y = window.setTimeout,
    p = function (a, d, f, p) {
      q ? a.addEventListener(d, f, !!p) : a.attachEvent("on" + d, f);
    },
    w = function (a, d, f, p) {
      q ? a.removeEventListener(d, f, !!p) : a.detachEvent("on" + d, f);
    },
    B = function (a, d) {
      return -1 !== (" " + a.className + " ").indexOf(" " + d + " ");
    },
    F = function (a, d) {
      B(a, d) || (a.className = "" === a.className ? d : a.className + " " + d);
    },
    O = function (a, d) {
      d = (" " + a.className + " ").replace(" " + d + " ", " ");
      d = d.trim ? d.trim() : d.replace(/^\s+|\s+$/g, "");
      a.className = d;
    },
    K = function (a) {
      return /Array/.test(Object.prototype.toString.call(a));
    },
    d = function (a) {
      return (
        /Date/.test(Object.prototype.toString.call(a)) && !isNaN(a.getTime())
      );
    },
    I = function (a, d) {
      return [
        31,
        (0 === a % 4 && 0 !== a % 100) || 0 === a % 400 ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ][d];
    },
    C = function (a) {
      d(a) && a.setHours(0, 0, 0, 0);
    },
    Y = function (a, d) {
      return a.getTime() === d.getTime();
    },
    S = function (a, f, p) {
      var m, u;
      for (m in f)
        if (
          (u = void 0 !== a[m]) &&
          "object" === typeof f[m] &&
          null !== f[m] &&
          void 0 === f[m].nodeName
        )
          d(f[m])
            ? p && (a[m] = new Date(f[m].getTime()))
            : K(f[m])
            ? p && (a[m] = f[m].slice(0))
            : (a[m] = S({}, f[m], p));
        else if (p || !u) a[m] = f[m];
      return a;
    },
    ga = function (a, d, f) {
      var m;
      t.createEvent
        ? ((m = t.createEvent("HTMLEvents")),
          m.initEvent(d, !0, !1),
          (m = S(m, f)),
          a.dispatchEvent(m))
        : t.createEventObject &&
          ((m = t.createEventObject()),
          (m = S(m, f)),
          a.fireEvent("on" + d, m));
    },
    aa = function (a) {
      0 > a.month &&
        ((a.year -= Math.ceil(Math.abs(a.month) / 12)), (a.month += 12));
      11 < a.month &&
        ((a.year += Math.floor(Math.abs(a.month) / 12)), (a.month -= 12));
      return a;
    },
    T = {
      field: null,
      bound: void 0,
      ariaLabel: "Use the arrow keys to pick a date",
      position: "bottom left",
      reposition: !0,
      format: "YYYY-MM-DD",
      toString: null,
      parse: null,
      defaultDate: null,
      setDefaultDate: !1,
      firstDay: 0,
      firstWeekOfYearMinDays: 4,
      formatStrict: !1,
      minDate: null,
      maxDate: null,
      yearRange: 10,
      showWeekNumber: !1,
      pickWholeWeek: !1,
      minYear: 0,
      maxYear: 9999,
      minMonth: void 0,
      maxMonth: void 0,
      startRange: null,
      endRange: null,
      isRTL: !1,
      yearSuffix: "",
      showMonthAfterYear: !1,
      showDaysInNextAndPreviousMonths: !1,
      enableSelectionDaysInNextAndPreviousMonths: !1,
      numberOfMonths: 1,
      mainCalendar: "left",
      container: void 0,
      blurFieldOnSelect: !0,
      i18n: {
        previousMonth: "Previous Month",
        nextMonth: "Next Month",
        months:
          "January February March April May June July August September October November December".split(
            " "
          ),
        weekdays:
          "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        weekdaysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
      },
      theme: null,
      events: [],
      onSelect: null,
      onOpen: null,
      onClose: null,
      onDraw: null,
      keyboardInput: !0,
    },
    Z = function (a, d, f) {
      for (d += a.firstDay; 7 <= d; ) d -= 7;
      return f ? a.i18n.weekdaysShort[d] : a.i18n.weekdays[d];
    },
    ma = function (a) {
      var d = [],
        f = "false";
      if (a.isEmpty)
        if (a.showDaysInNextAndPreviousMonths)
          d.push("is-outside-current-month"),
            a.enableSelectionDaysInNextAndPreviousMonths ||
              d.push("is-selection-disabled");
        else return '\x3ctd class\x3d"is-empty"\x3e\x3c/td\x3e';
      a.isDisabled && d.push("is-disabled");
      a.isToday && d.push("is-today");
      a.isSelected && (d.push("is-selected"), (f = "true"));
      a.hasEvent && d.push("has-event");
      a.isInRange && d.push("is-inrange");
      a.isStartRange && d.push("is-startrange");
      a.isEndRange && d.push("is-endrange");
      return (
        '\x3ctd data-day\x3d"' +
        a.day +
        '" class\x3d"' +
        d.join(" ") +
        '" aria-selected\x3d"' +
        f +
        '"\x3e\x3cbutton class\x3d"pika-button pika-day" type\x3d"button" data-pika-year\x3d"' +
        a.year +
        '" data-pika-month\x3d"' +
        a.month +
        '" data-pika-day\x3d"' +
        a.day +
        '"\x3e' +
        a.day +
        "\x3c/button\x3e\x3c/td\x3e"
      );
    },
    ea = function (d, p, q, t) {
      p = new Date(q, p, d);
      if (f) t = a(p).isoWeek();
      else {
        p.setHours(0, 0, 0, 0);
        q = p.getDate();
        var m = p.getDay();
        d = t - 1;
        p.setDate(q + d - ((m + 7 - 1) % 7));
        t = new Date(p.getFullYear(), 0, t);
        p = (p.getTime() - t.getTime()) / 864e5;
        t = 1 + Math.round((p - d + ((t.getDay() + 7 - 1) % 7)) / 7);
      }
      return '\x3ctd class\x3d"pika-week"\x3e' + t + "\x3c/td\x3e";
    },
    E = function (a, d, f, p) {
      return (
        '\x3ctr class\x3d"pika-row' +
        (f ? " pick-whole-week" : "") +
        (p ? " is-selected" : "") +
        '"\x3e' +
        (d ? a.reverse() : a).join("") +
        "\x3c/tr\x3e"
      );
    },
    ca = function (a, d, f, p, q, t) {
      var m,
        u,
        D,
        w = a._o,
        E = f === w.minYear,
        y = f === w.maxYear;
      t =
        '\x3cdiv id\x3d"' +
        t +
        '" class\x3d"pika-title" role\x3d"heading" aria-live\x3d"assertive"\x3e';
      var G = !0,
        B = !0;
      D = [];
      for (m = 0; 12 > m; m++)
        D.push(
          '\x3coption value\x3d"' +
            (f === q ? m - d : 12 + m - d) +
            '"' +
            (m === p ? ' selected\x3d"selected"' : "") +
            ((E && m < w.minMonth) || (y && m > w.maxMonth)
              ? ' disabled\x3d"disabled"'
              : "") +
            "\x3e" +
            w.i18n.months[m] +
            "\x3c/option\x3e"
        );
      q =
        '\x3cdiv class\x3d"pika-label"\x3e' +
        w.i18n.months[p] +
        '\x3cselect class\x3d"pika-select pika-select-month" tabindex\x3d"-1"\x3e' +
        D.join("") +
        "\x3c/select\x3e\x3c/div\x3e";
      K(w.yearRange)
        ? ((m = w.yearRange[0]), (u = w.yearRange[1] + 1))
        : ((m = f - w.yearRange), (u = 1 + f + w.yearRange));
      for (D = []; m < u && m <= w.maxYear; m++)
        m >= w.minYear &&
          D.push(
            '\x3coption value\x3d"' +
              m +
              '"' +
              (m === f ? ' selected\x3d"selected"' : "") +
              "\x3e" +
              m +
              "\x3c/option\x3e"
          );
      f =
        '\x3cdiv class\x3d"pika-label"\x3e' +
        f +
        w.yearSuffix +
        '\x3cselect class\x3d"pika-select pika-select-year" tabindex\x3d"-1"\x3e' +
        D.join("") +
        "\x3c/select\x3e\x3c/div\x3e";
      t = w.showMonthAfterYear ? t + (f + q) : t + (q + f);
      E && (0 === p || w.minMonth >= p) && (G = !1);
      y && (11 === p || w.maxMonth <= p) && (B = !1);
      0 === d &&
        (t +=
          '\x3cbutton class\x3d"pika-prev' +
          (G ? "" : " is-disabled") +
          '" type\x3d"button"\x3e' +
          w.i18n.previousMonth +
          "\x3c/button\x3e");
      d === a._o.numberOfMonths - 1 &&
        (t +=
          '\x3cbutton class\x3d"pika-next' +
          (B ? "" : " is-disabled") +
          '" type\x3d"button"\x3e' +
          w.i18n.nextMonth +
          "\x3c/button\x3e");
      return t + "\x3c/div\x3e";
    },
    X = function (m) {
      var u = this,
        w = u.config(m);
      u._onMouseDown = function (a) {
        if (u._v) {
          a = a || window.event;
          var d = a.target || a.srcElement;
          if (d)
            if (
              (B(d, "is-disabled") ||
                (!B(d, "pika-button") ||
                B(d, "is-empty") ||
                B(d.parentNode, "is-disabled")
                  ? B(d, "pika-prev")
                    ? u.prevMonth()
                    : B(d, "pika-next") && u.nextMonth()
                  : (u.setDate(
                      new Date(
                        d.getAttribute("data-pika-year"),
                        d.getAttribute("data-pika-month"),
                        d.getAttribute("data-pika-day")
                      )
                    ),
                    w.bound &&
                      y(function () {
                        u.hide();
                        w.blurFieldOnSelect && w.field && w.field.blur();
                      }, 100))),
              B(d, "pika-select"))
            )
              u._c = !0;
            else if (a.preventDefault) a.preventDefault();
            else return (a.returnValue = !1);
        }
      };
      u._onChange = function (a) {
        a = a || window.event;
        (a = a.target || a.srcElement) &&
          (B(a, "pika-select-month")
            ? u.gotoMonth(a.value)
            : B(a, "pika-select-year") && u.gotoYear(a.value));
      };
      u._onKeyChange = function (a) {
        a = a || window.event;
        if (u.isVisible())
          switch (a.keyCode) {
            case 13:
            case 27:
              w.field && w.field.blur();
              break;
            case 37:
              u.adjustDate("subtract", 1);
              break;
            case 38:
              u.adjustDate("subtract", 7);
              break;
            case 39:
              u.adjustDate("add", 1);
              break;
            case 40:
              u.adjustDate("add", 7);
              break;
            case 8:
            case 46:
              u.setDate(null);
          }
      };
      u._parseFieldValue = function () {
        if (w.parse) return w.parse(w.field.value, w.format);
        if (f) {
          var d = a(w.field.value, w.format, w.formatStrict);
          return d && d.isValid() ? d.toDate() : null;
        }
        return new Date(Date.parse(w.field.value));
      };
      u._onInputChange = function (a) {
        a.firedBy !== u &&
          ((a = u._parseFieldValue()), d(a) && u.setDate(a), u._v || u.show());
      };
      u._onInputFocus = function () {
        u.show();
      };
      u._onInputClick = function () {
        u.show();
      };
      u._onInputBlur = function () {
        var a = t.activeElement;
        do if (B(a, "pika-single")) return;
        while ((a = a.parentNode));
        u._c ||
          (u._b = y(function () {
            u.hide();
          }, 50));
        u._c = !1;
      };
      u._onClick = function (a) {
        a = a || window.event;
        var d = (a = a.target || a.srcElement);
        if (a) {
          q ||
            !B(a, "pika-select") ||
            a.onchange ||
            (a.setAttribute("onchange", "return;"),
            p(a, "change", u._onChange));
          do if (B(d, "pika-single") || d === w.trigger) return;
          while ((d = d.parentNode));
          u._v && a !== w.trigger && d !== w.trigger && u.hide();
        }
      };
      u.el = t.createElement("div");
      u.el.className =
        "pika-single" +
        (w.isRTL ? " is-rtl" : "") +
        (w.theme ? " " + w.theme : "");
      p(u.el, "mousedown", u._onMouseDown, !0);
      p(u.el, "touchend", u._onMouseDown, !0);
      p(u.el, "change", u._onChange);
      w.keyboardInput && p(t, "keydown", u._onKeyChange);
      w.field &&
        (w.container
          ? w.container.appendChild(u.el)
          : w.bound
          ? t.body.appendChild(u.el)
          : w.field.parentNode.insertBefore(u.el, w.field.nextSibling),
        p(w.field, "change", u._onInputChange),
        w.defaultDate ||
          ((w.defaultDate = u._parseFieldValue()), (w.setDefaultDate = !0)));
      m = w.defaultDate;
      d(m)
        ? w.setDefaultDate
          ? u.setDate(m, !0)
          : u.gotoDate(m)
        : u.gotoDate(new Date());
      w.bound
        ? (this.hide(),
          (u.el.className += " is-bound"),
          p(w.trigger, "click", u._onInputClick),
          p(w.trigger, "focus", u._onInputFocus),
          p(w.trigger, "blur", u._onInputBlur))
        : this.show();
    };
  X.prototype = {
    config: function (a) {
      this._o || (this._o = S({}, T, !0));
      a = S(this._o, a, !0);
      a.isRTL = !!a.isRTL;
      a.field = a.field && a.field.nodeName ? a.field : null;
      a.theme = "string" === typeof a.theme && a.theme ? a.theme : null;
      a.bound = !!(void 0 !== a.bound ? a.field && a.bound : a.field);
      a.trigger = a.trigger && a.trigger.nodeName ? a.trigger : a.field;
      a.disableWeekends = !!a.disableWeekends;
      a.disableDayFn =
        "function" === typeof a.disableDayFn ? a.disableDayFn : null;
      var f = parseInt(a.numberOfMonths, 10) || 1;
      a.numberOfMonths = 4 < f ? 4 : f;
      d(a.minDate) || (a.minDate = !1);
      d(a.maxDate) || (a.maxDate = !1);
      a.minDate &&
        a.maxDate &&
        a.maxDate < a.minDate &&
        (a.maxDate = a.minDate = !1);
      a.minDate && this.setMinDate(a.minDate);
      a.maxDate && this.setMaxDate(a.maxDate);
      K(a.yearRange)
        ? ((f = new Date().getFullYear() - 10),
          (a.yearRange[0] = parseInt(a.yearRange[0], 10) || f),
          (a.yearRange[1] = parseInt(a.yearRange[1], 10) || f))
        : ((a.yearRange = Math.abs(parseInt(a.yearRange, 10)) || T.yearRange),
          100 < a.yearRange && (a.yearRange = 100));
      return a;
    },
    toString: function (m) {
      m = m || this._o.format;
      return d(this._d)
        ? this._o.toString
          ? this._o.toString(this._d, m)
          : f
          ? a(this._d).format(m)
          : this._d.toDateString()
        : "";
    },
    getMoment: function () {
      return f ? a(this._d) : null;
    },
    setMoment: function (d, p) {
      f && a.isMoment(d) && this.setDate(d.toDate(), p);
    },
    getDate: function () {
      return d(this._d) ? new Date(this._d.getTime()) : null;
    },
    setDate: function (a, f) {
      if (!a)
        return (
          (this._d = null),
          this._o.field &&
            ((this._o.field.value = ""),
            ga(this._o.field, "change", { firedBy: this })),
          this.draw()
        );
      "string" === typeof a && (a = new Date(Date.parse(a)));
      if (d(a)) {
        var m = this._o.minDate,
          p = this._o.maxDate;
        d(m) && a < m ? (a = m) : d(p) && a > p && (a = p);
        this._d = new Date(a.getTime());
        C(this._d);
        this.gotoDate(this._d);
        this._o.field &&
          ((this._o.field.value = this.toString()),
          ga(this._o.field, "change", { firedBy: this }));
        f ||
          "function" !== typeof this._o.onSelect ||
          this._o.onSelect.call(this, this.getDate());
      }
    },
    clear: function () {
      this.setDate(null);
    },
    gotoDate: function (a) {
      var f = !0;
      if (d(a)) {
        if (this.calendars) {
          var f = new Date(this.calendars[0].year, this.calendars[0].month, 1),
            m = new Date(
              this.calendars[this.calendars.length - 1].year,
              this.calendars[this.calendars.length - 1].month,
              1
            ),
            p = a.getTime();
          m.setMonth(m.getMonth() + 1);
          m.setDate(m.getDate() - 1);
          f = p < f.getTime() || m.getTime() < p;
        }
        f &&
          ((this.calendars = [{ month: a.getMonth(), year: a.getFullYear() }]),
          "right" === this._o.mainCalendar &&
            (this.calendars[0].month += 1 - this._o.numberOfMonths));
        this.adjustCalendars();
      }
    },
    adjustDate: function (a, d) {
      var f = this.getDate() || new Date();
      d = 864e5 * parseInt(d);
      var m;
      "add" === a
        ? (m = new Date(f.valueOf() + d))
        : "subtract" === a && (m = new Date(f.valueOf() - d));
      this.setDate(m);
    },
    adjustCalendars: function () {
      this.calendars[0] = aa(this.calendars[0]);
      for (var a = 1; a < this._o.numberOfMonths; a++)
        this.calendars[a] = aa({
          month: this.calendars[0].month + a,
          year: this.calendars[0].year,
        });
      this.draw();
    },
    gotoToday: function () {
      this.gotoDate(new Date());
    },
    gotoMonth: function (a) {
      isNaN(a) ||
        ((this.calendars[0].month = parseInt(a, 10)), this.adjustCalendars());
    },
    nextMonth: function () {
      this.calendars[0].month++;
      this.adjustCalendars();
    },
    prevMonth: function () {
      this.calendars[0].month--;
      this.adjustCalendars();
    },
    gotoYear: function (a) {
      isNaN(a) ||
        ((this.calendars[0].year = parseInt(a, 10)), this.adjustCalendars());
    },
    setMinDate: function (a) {
      a instanceof Date
        ? (C(a),
          (this._o.minDate = a),
          (this._o.minYear = a.getFullYear()),
          (this._o.minMonth = a.getMonth()))
        : ((this._o.minDate = T.minDate),
          (this._o.minYear = T.minYear),
          (this._o.minMonth = T.minMonth),
          (this._o.startRange = T.startRange));
      this.draw();
    },
    setMaxDate: function (a) {
      a instanceof Date
        ? (C(a),
          (this._o.maxDate = a),
          (this._o.maxYear = a.getFullYear()),
          (this._o.maxMonth = a.getMonth()))
        : ((this._o.maxDate = T.maxDate),
          (this._o.maxYear = T.maxYear),
          (this._o.maxMonth = T.maxMonth),
          (this._o.endRange = T.endRange));
      this.draw();
    },
    setStartRange: function (a) {
      this._o.startRange = a;
    },
    setEndRange: function (a) {
      this._o.endRange = a;
    },
    draw: function (a) {
      if (this._v || a) {
        var d = this._o,
          f = d.minYear,
          m = d.maxYear,
          p = d.minMonth,
          q = d.maxMonth;
        a = "";
        this._y <= f &&
          ((this._y = f), !isNaN(p) && this._m < p && (this._m = p));
        this._y >= m &&
          ((this._y = m), !isNaN(q) && this._m > q && (this._m = q));
        for (m = 0; m < d.numberOfMonths; m++)
          (f =
            "pika-title-" +
            Math.random()
              .toString(36)
              .replace(/[^a-z]+/g, "")
              .substr(0, 2)),
            (a +=
              '\x3cdiv class\x3d"pika-lendar"\x3e' +
              ca(
                this,
                m,
                this.calendars[m].year,
                this.calendars[m].month,
                this.calendars[0].year,
                f
              ) +
              this.render(this.calendars[m].year, this.calendars[m].month, f) +
              "\x3c/div\x3e");
        this.el.innerHTML = a;
        d.bound &&
          "hidden" !== d.field.type &&
          y(function () {
            d.trigger.focus();
          }, 1);
        if ("function" === typeof this._o.onDraw) this._o.onDraw(this);
        d.bound && d.field.setAttribute("aria-label", d.ariaLabel);
      }
    },
    adjustPosition: function () {
      var a, d, f, p, q, w, E, y, B, C, ca;
      if (!this._o.container) {
        this.el.style.position = "absolute";
        d = a = this._o.trigger;
        f = this.el.offsetWidth;
        p = this.el.offsetHeight;
        q = window.innerWidth || t.documentElement.clientWidth;
        w = window.innerHeight || t.documentElement.clientHeight;
        E =
          window.pageYOffset || t.body.scrollTop || t.documentElement.scrollTop;
        ca = C = !0;
        if ("function" === typeof a.getBoundingClientRect)
          (d = a.getBoundingClientRect()),
            (y = d.left + window.pageXOffset),
            (B = d.bottom + window.pageYOffset);
        else
          for (
            y = d.offsetLeft, B = d.offsetTop + d.offsetHeight;
            (d = d.offsetParent);

          )
            (y += d.offsetLeft), (B += d.offsetTop);
        if (
          (this._o.reposition && y + f > q) ||
          (-1 < this._o.position.indexOf("right") && 0 < y - f + a.offsetWidth)
        )
          (y = y - f + a.offsetWidth), (C = !1);
        if (
          (this._o.reposition && B + p > w + E) ||
          (-1 < this._o.position.indexOf("top") && 0 < B - p - a.offsetHeight)
        )
          (B = B - p - a.offsetHeight), (ca = !1);
        this.el.style.left = y + "px";
        this.el.style.top = B + "px";
        F(this.el, C ? "left-aligned" : "right-aligned");
        F(this.el, ca ? "bottom-aligned" : "top-aligned");
        O(this.el, C ? "right-aligned" : "left-aligned");
        O(this.el, ca ? "top-aligned" : "bottom-aligned");
      }
    },
    render: function (a, f, p) {
      var m = this._o,
        q = new Date(),
        u = I(a, f),
        t = new Date(a, f, 1).getDay(),
        w = [],
        y = [];
      C(q);
      0 < m.firstDay && ((t -= m.firstDay), 0 > t && (t += 7));
      for (
        var B = 0 === f ? 11 : f - 1,
          ca = 11 === f ? 0 : f + 1,
          X = 0 === f ? a - 1 : a,
          F = 11 === f ? a + 1 : a,
          G = I(X, B),
          K = u + t,
          O = K;
        7 < O;

      )
        O -= 7;
      for (var K = K + (7 - O), O = !1, g = 0, L = 0; g < K; g++) {
        var x = new Date(a, f, 1 + (g - t)),
          S = d(this._d) ? Y(x, this._d) : !1,
          n = Y(x, q),
          T = -1 !== m.events.indexOf(x.toDateString()) ? !0 : !1,
          aa = g < t || g >= u + t,
          fa = 1 + (g - t),
          ba = f,
          ga = a,
          za = m.startRange && Y(m.startRange, x),
          ia = m.endRange && Y(m.endRange, x),
          ua = m.startRange && m.endRange && m.startRange < x && x < m.endRange,
          k;
        !(k = (m.minDate && x < m.minDate) || (m.maxDate && x > m.maxDate)) &&
          (k = m.disableWeekends) &&
          ((k = x.getDay()), (k = 0 === k || 6 === k));
        x = k || (m.disableDayFn && m.disableDayFn(x));
        aa &&
          (g < t
            ? ((fa = G + fa), (ba = B), (ga = X))
            : ((fa -= u), (ba = ca), (ga = F)));
        n = {
          day: fa,
          month: ba,
          year: ga,
          hasEvent: T,
          isSelected: S,
          isToday: n,
          isDisabled: x,
          isEmpty: aa,
          isStartRange: za,
          isEndRange: ia,
          isInRange: ua,
          showDaysInNextAndPreviousMonths: m.showDaysInNextAndPreviousMonths,
          enableSelectionDaysInNextAndPreviousMonths:
            m.enableSelectionDaysInNextAndPreviousMonths,
        };
        m.pickWholeWeek && S && (O = !0);
        y.push(ma(n));
        7 === ++L &&
          (m.showWeekNumber &&
            y.unshift(ea(g - t, f, a, m.firstWeekOfYearMinDays)),
          w.push(E(y, m.isRTL, m.pickWholeWeek, O)),
          (y = []),
          (L = 0),
          (O = !1));
      }
      f = [];
      m.showWeekNumber && f.push("\x3cth\x3e\x3c/th\x3e");
      for (a = 0; 7 > a; a++)
        f.push(
          '\x3cth scope\x3d"col"\x3e\x3cabbr title\x3d"' +
            Z(m, a) +
            '"\x3e' +
            Z(m, a, !0) +
            "\x3c/abbr\x3e\x3c/th\x3e"
        );
      m =
        "\x3cthead\x3e\x3ctr\x3e" +
        (m.isRTL ? f.reverse() : f).join("") +
        "\x3c/tr\x3e\x3c/thead\x3e";
      return (
        '\x3ctable cellpadding\x3d"0" cellspacing\x3d"0" class\x3d"pika-table" role\x3d"grid" aria-labelledby\x3d"' +
        p +
        '"\x3e' +
        m +
        ("\x3ctbody\x3e" + w.join("") + "\x3c/tbody\x3e") +
        "\x3c/table\x3e"
      );
    },
    isVisible: function () {
      return this._v;
    },
    show: function () {
      this.isVisible() ||
        ((this._v = !0),
        this.draw(),
        O(this.el, "is-hidden"),
        this._o.bound && (p(t, "click", this._onClick), this.adjustPosition()),
        "function" === typeof this._o.onOpen && this._o.onOpen.call(this));
    },
    hide: function () {
      var a = this._v;
      !1 !== a &&
        (this._o.bound && w(t, "click", this._onClick),
        this._o.container ||
          ((this.el.style.position = "static"),
          (this.el.style.left = "auto"),
          (this.el.style.top = "auto")),
        F(this.el, "is-hidden"),
        (this._v = !1),
        void 0 !== a &&
          "function" === typeof this._o.onClose &&
          this._o.onClose.call(this));
    },
    destroy: function () {
      var a = this._o;
      this.hide();
      w(this.el, "mousedown", this._onMouseDown, !0);
      w(this.el, "touchend", this._onMouseDown, !0);
      w(this.el, "change", this._onChange);
      a.keyboardInput && w(t, "keydown", this._onKeyChange);
      a.field &&
        (w(a.field, "change", this._onInputChange),
        a.bound &&
          (w(a.trigger, "click", this._onInputClick),
          w(a.trigger, "focus", this._onInputFocus),
          w(a.trigger, "blur", this._onInputBlur)));
      this.el.parentNode && this.el.parentNode.removeChild(this.el);
    },
  };
  return X;
});
var isGemachtigd = !0,
  longUsername = !1,
  onMobileBrowser,
  tableRowSelection = 11,
  windowHeight,
  windowWidth,
  orientation = window.screen.orientation;
jQuery(document).ready(function () {
  onInit();
  resizeHandler();
});
function onInit() {
  browserCheck();
  focusHandler();
  hamburgerAnimation();
  accordionListeners();
  notificationStyle();
  bsnOnChange();
  modalListener();
  nameShortener();
  enableTooltips();
}
function resizeEventNameAndTitleHandling() {
  nameShortener();
  showNavbarTitle();
}
function resizeEventOrientationChangeHandling() {
  orientation = window.screen.orientation;
  var a = document.querySelector('meta[name\x3d"viewport"]');
  a.setAttribute(
    "content",
    "initial-scale\x3d1.0, minimum-scale\x3d1.0, maximum-scale\x3d1.0"
  );
  setTimeout(function () {
    a.setAttribute(
      "content",
      "width\x3ddevice-width, initial-scale\x3d1, minimum-scale\x3d1.0"
    );
  }, 200);
}
function resizeHandler() {
  window.removeEventListener("resize", resizeEventNameAndTitleHandling(), !1);
  window.addEventListener("resize", resizeEventNameAndTitleHandling(), !1);
  window.removeEventListener(
    "orientationchange",
    resizeEventOrientationChangeHandling(),
    !1
  );
  window.addEventListener(
    "orientationchange",
    resizeEventOrientationChangeHandling(),
    !1
  );
}
function isScrolledIntoView(a) {
  var f = jQuery(window).scrollTop(),
    q = f + jQuery(window).height(),
    t = jQuery(a).offset().top;
  return t + jQuery(a).height() <= q && t >= f;
}
function scrollToMain() {
  var a = jQuery(".bld-navbar"),
    f = 1;
  0 !== jQuery("#bld-anchor-start").length &&
    !1 === isScrolledIntoView("#bld-anchor-start") &&
    (60 === a.height()
      ? (f = 85)
      : 40 === a.height() && (f = 100 > window.pageYOffset ? 100 : 60),
    jQuery("html,body").animate(
      { scrollTop: jQuery("#bld-anchor-start").offset().top - f },
      300
    ));
}
function isBootstrapSelect(a) {
  for (; a; ) {
    if (a.classList.contains("bootstrap-select")) return !0;
    a = a.parentElement;
  }
  return !1;
}
function focusHandler() {
  var a = !0;
  jQuery(document)
    .off("keydown.focusHandler")
    .on("keydown.focusHandler", function () {
      a = !1;
    });
  jQuery("button, a, .card__header__button, .carousel__nav .u-focus-blur")
    .off("mousedown")
    .on("mousedown", function () {
      a = !0;
    });
  jQuery("button, a, .card__header__button, .carousel__nav .u-focus-blur")
    .off("mouseup")
    .on("mouseup", function () {
      a = !0;
    });
  jQuery(".modal")
    .off("shown.bs.modal")
    .on("shown.bs.modal", function (f) {
      a = !1;
    });
  jQuery("button, a, .card__header__button, .carousel__nav .u-focus-blur")
    .off("focus")
    .on("focus", function (f) {
      a && !isBootstrapSelect(f.target) && f.target.blur();
    });
}
function welcomeAnimation() {
  jQuery(".navbar-nav, .bld-dashboard-content").hide();
  setTimeout(function () {
    jQuery(".bld-dashboard-content")
      .delay(1e3)
      .slideDown("slow", function () {
        jQuery(".navbar-nav").fadeIn(500);
      });
    jQuery(".bld-dashboard-content").show(1e3);
    jQuery(".bld-welcome-content")
      .delay(1050)
      .slideUp("slow", function () {
        jQuery(this).remove();
      });
  }, 2e3);
}
function browserCheck() {
  var a = navigator.userAgent || navigator.vendor || window.opera;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  )
    onMobileBrowser = !0;
  showSwipeIcon();
  window.addEventListener("orientationchange", showSwipeIcon);
  return onMobileBrowser;
}
function showSwipeIcon() {
  0 < jQuery(".bld-swipe").length &&
    ((onMobileBrowser &&
      768 > jQuery(window).width() &&
      0 === orientation &&
      0 < jQuery("#correspondentieTabel").length) ||
    0 < jQuery("#bezoekTable").length
      ? jQuery("#correspondentieTabel, #bezoekTable").bind(
          "touchstart",
          function (a) {
            jQuery(".bld-swipe img").hasClass("swipe-anim") &&
              setTimeout(function () {
                jQuery(".bld-swipe img").removeClass("swipe-anim");
                jQuery(".bld-swipe").animate({ opacity: 0 });
              }, 2500);
          }
        )
      : jQuery(".bld-swipe").parent().remove());
}
function setSticky() {}
function hamburgerAnimation() {
  var a = 0,
    f = jQuery("#bld-hamburger");
  jQuery(".bld-account")
    .off("show.bs.dropdown")
    .on("show.bs.dropdown", function () {
      jQuery(".backdrop").addClass("show");
      jQuery(".backdrop")
        .off("click")
        .on("click", function () {
          jQuery(this).removeClass("show");
        });
    });
  jQuery(".bld-account")
    .off("hide.bs.dropdown")
    .on("hide.bs.dropdown", function () {
      jQuery(".backdrop").removeClass("show");
    });
  jQuery(".bld-menu")
    .off("show.bs.dropdown")
    .on("show.bs.dropdown", function () {
      0 <= a && (f.addClass("menu-hamburger-active"), (a += 1));
      1 < a && f.toggleClass("menu-hamburger-animation");
      jQuery(this).find(".bld-hamburger-text").addClass("active");
      jQuery(this)
        .find(".bld-hamburger-text")
        .one(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend",
          function (a) {
            jQuery(this).removeClass("active");
          }
        );
      jQuery(this).find(".bld-hamburger-text").text("Sluiten");
      jQuery("#navMenuDropdown").attr("aria-label", "Sluit Menu");
      jQuery(".backdrop").addClass("show");
      jQuery(".backdrop")
        .off("click")
        .on("click", function () {
          jQuery(this).removeClass("show");
        });
    });
  jQuery(".bld-menu")
    .off("hide.bs.dropdown")
    .on("hide.bs.dropdown", function () {
      0 <= a && (f.removeClass("menu-hamburger-active"), (a += 1));
      1 < a && f.toggleClass("menu-hamburger-animation");
      jQuery(this).find(".bld-hamburger-text").addClass("active");
      jQuery(this)
        .find(".bld-hamburger-text")
        .one(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend",
          function (a) {
            jQuery(this).removeClass("active");
          }
        );
      jQuery(this).find(".bld-hamburger-text").text("Menu");
      jQuery("#navMenuDropdown").attr("aria-label", "Open Menu");
      jQuery(".backdrop").removeClass("show");
    });
  jQuery(".bld-menu .list-unstyled li a")
    .off("click")
    .on("click", function () {
      jQuery(".bld-menu .dropdown-menu").dropdown("toggle");
    });
}
function accordionListeners() {
  jQuery(".card")
    .off("click")
    .on("click", function () {
      var a = jQuery(this);
      a.off("show.bs.collapse").on("show.bs.collapse", function () {
        a.find(".acc-item.show") && a.addClass("card--open");
      });
      a.off("hide.bs.collapse").on("hide.bs.collapse", function () {
        a.find(".acc-item.show") && a.removeClass("card--open");
      });
    });
  jQuery(".bld-inline-accordion-link")
    .off("click")
    .on("click", function (a) {
      a = jQuery(this);
      a.find(".bld-show-more") &&
        (a.hasClass("collapsed")
          ? (a.find(".plus-minus").addClass("opened"),
            a.find(".bld-show-more").text("Minder tonen"))
          : (a.find(".bld-show-more").text("Meer tonen"),
            a.find(".plus-minus").removeClass("opened")));
    });
}
function skipLink() {
  jQuery("#bld-anchor-start").attr("tabindex", "-1");
  jQuery("#bld-anchor-start").focus();
  jQuery("html, body").animate(
    { scrollTop: jQuery("#bld-anchor-start").offset().top },
    500
  );
}
function notificationStyle() {
  jQuery(".bld-prio1").each(function () {
    2 <= jQuery(this).find(".bld-btn-container").children().length &&
      jQuery(this).addClass("bld-prio1-large");
  });
  jQuery(".bld-prio15").each(function () {
    2 <= jQuery(this).find(".bld-btn-container").children().length &&
      jQuery(this).addClass("bld-prio15-large");
  });
}
function closeModal(a, f) {
  jQuery("#" + f).modal("hide");
  "navigate" === a && (window.location.href = "/");
}
function scrollToTop() {
  jQuery("body,html").animate({ scrollTop: 0 }, 500);
  jQuery("body").attr("tabindex", "-1");
  jQuery("body").focus();
}
function bsnOnChange() {
  jQuery("input[name\x3dbelanghebbende_bsn]").on("change", function () {
    1 === jQuery("input[id\x3dBSNso_Ander]:checked").length
      ? jQuery(".toggleInput").slideDown()
      : (jQuery(".toggleInput").slideUp(), jQuery(".bld-alert").hide());
  });
}
function showSelectionRows(a) {
  var f = jQuery("#" + a + "").find("tr").length,
    q = jQuery("#" + a + " tr");
  f < tableRowSelection || q.slice(tableRowSelection).hide();
  showAllRows(a);
}
function showAllRows(a) {
  var f = jQuery("table#" + a + " tr");
  jQuery(".show-all-rows")
    .off("click")
    .on("click", function () {
      f.each(function () {
        jQuery(this).addClass("table__row--no-animation");
        jQuery(this).is(":visible") || jQuery(this).show();
      });
      jQuery(".bld-filter-block input:checkbox ").each(function () {
        if (!0 === jQuery(this).prop("checked")) {
          var a = jQuery(this).attr("id");
          jQuery("#" + a + "").prop("checked", !1);
        }
      });
      jQuery("#S_allItems, #L_allItems, #allItems").each(function () {
        var a = jQuery(this).attr("id");
        jQuery("#" + a + "").prop("checked", !0);
      });
      jQuery(this).addClass("disabled");
      "correspondentieTabel" === a &&
        jQuery("#correspondentieTabel tr").removeClass("hidden");
      rowColor();
      jQuery(".table-noresult").hide();
    });
}
function modalListener() {
  jQuery(".modal")
    .off("shown.bs.modal")
    .on("shown.bs.modal", function (a) {
      a = jQuery(this).find(".bld-btn:not(.bld-btn-inverted)");
      jQuery(a).focus();
      1 < $(".modal.show").length && $(".modal-backdrop").css("zIndex", "1046");
    });
  jQuery(".modal")
    .off("hidden.bs.modal")
    .on("hidden.bs.modal", function (a) {
      2 > $(".modal.show").length && $(".modal-backdrop").css("zIndex", "1040");
    });
}
function nameShortenerGwt(a) {
  "true" === a ? (isGemachtigd = !0) : "false" === a && (isGemachtigd = !1);
  nameShortener();
}
function nameShortener() {
  windowSize();
  showAuthUsername();
  jQuery(".bld-username.short").each(function () {
    var a = jQuery(this).attr("title");
    if (void 0 !== a && null !== a) {
      var f = jQuery(this);
      1200 > windowWidth && 991 <= windowWidth
        ? 47 < a.length && showUsername(f, a, 35)
        : 991 > windowWidth
        ? 22 < a.length && showUsername(f, a, 16)
        : 58 < a.length && showUsername(f, a, 35);
    }
  });
}
function windowSize() {
  windowHeight = window.innerHeight
    ? window.innerHeight
    : jQuery(window).height();
  windowWidth = window.innerWidth ? window.innerWidth : jQuery(window).width();
}
function showUsername(a, f, q) {
  longUsername = !0;
  f = f.slice(0, q);
  a.html(f + "...");
  !1 === isGemachtigd
    ? jQuery(".bld-username-full").removeClass("d-sm-none")
    : !0 === isGemachtigd &&
      (jQuery(".bld-user-auth").removeClass("d-md-none"),
      jQuery(".bld-auth").removeClass("d-md-block"),
      jQuery(".bld-username-full").removeClass("d-sm-none"),
      jQuery(".bld-username-full").addClass("d-none"));
}
function showAuthUsername() {
  !1 === isGemachtigd
    ? (!1 === longUsername && 770 < windowWidth
        ? jQuery(".bld-username-full").addClass("d-none")
        : !1 === longUsername && 770 >= windowWidth
        ? jQuery(".bld-username-full").removeClass("d-none")
        : !0 === longUsername &&
          jQuery(".bld-username-full").removeClass("d-none"),
      jQuery(".bld-user-auth").removeClass("d-md-none"),
      jQuery(".bld-user-auth").addClass("d-none"),
      jQuery(".bld-auth").removeClass("d-md-block"))
    : !0 === isGemachtigd && jQuery(".bld-username-full").addClass("d-none");
}
function progressSteps() {
  var a = jQuery(".progress-steps").children().length,
    a = a - 1,
    f = jQuery(".progress-steps").find(".progress-step.active").index() + 1,
    q = jQuery(".progress-stack"),
    t = jQuery(".progress-steps");
  3 < a
    ? 4 <= a &&
      jQuery(".progress-steps .progress-step").each(function (t, p) {
        t += 1;
        1 < f &&
          (1 === t
            ? (jQuery(".progress-stack").removeClass("d-none"),
              jQuery(p).after(q[0]),
              jQuery(p).hide())
            : jQuery(p).hasClass("complete") && t < a - 1 && jQuery(p).hide());
        t === a &&
          1 < a - f &&
          jQuery(p)
            .find(".step-line")
            .css(
              "background",
              "repeating-linear-gradient(to right, #b4b4b4 0px, #b4b4b4 3px, transparent 3px, transparent 7px)"
            );
        t > f &&
          t < a &&
          (jQuery(p).hasClass("active") || 2 === t || jQuery(p).hide());
      })
    : (t.removeClass("d-block mt-5"), t.addClass("d-none"));
}
function enableTooltips() {
  $('[data-toggle\x3d"tooltip"]').tooltip();
}
function disableTooltips() {
  $('[data-toggle\x3d"tooltip"]').tooltip("disable");
}
function showNavbarTitle() {
  windowSize();
  if (0 < jQuery(".navbar__tooltip").length) {
    var a = jQuery(".navbar__tooltip"),
      f = jQuery(".nav-item").find(".navbar__tooltip").attr("value"),
      q = f.length;
    450 > windowWidth && 27 < q
      ? sliceNavbarTitle(27, a, f)
      : 450 <= windowWidth && 500 > windowWidth && 40 < q
      ? sliceNavbarTitle(40, a, f)
      : 500 <= windowWidth && 768 > windowWidth && 49 < q
      ? sliceNavbarTitle(49, a, f)
      : 768 <= windowWidth && 990 > windowWidth && 55 < q
      ? sliceNavbarTitle(55, a, f)
      : ($(".navbar__tooltip").tooltip("disable"), a.html(f));
  }
}
function sliceNavbarTitle(a, f, q) {
  a = q.slice(0, a);
  f.html(a + "...");
  enableTooltips();
}
function fadeIn(a) {
  a.classList.add("show");
  a.classList.remove("hide");
}
function fadeOut(a) {
  a.classList.add("hide");
  a.classList.remove("show");
}
function getBrowserWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
function initResizeTextarea() {
  for (
    var a = document.getElementsByTagName("textarea"), f = 0;
    f < a.length;
    f++
  )
    a[f].setAttribute("style", "height:" + a[f].scrollHeight + "px;"),
      a[f].addEventListener("input", resizeTextarea, !1);
}
function resizeTextarea() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}
function showSwipeTable(a, f) {
  a = document.getElementById(a);
  var q = a.closest(".container");
  a.closest("table");
  q = q ? q.getBoundingClientRect().width : void 0;
  f = document.getElementById(f);
  a = a.getBoundingClientRect().width + 30;
  a >= getBrowserWidth() || a >= q
    ? f.classList.add("show")
    : f.classList.remove("show");
}
function helpListener(a) {
  if (a)
    for (
      var f = document.getElementById(a + "-help-mobile"),
        q = document.getElementById(a + "-help"),
        f = [f, q],
        q = 0;
      q < f.length;
      q++
    )
      toggleHelpContainer(f[q], a);
}
function toggleHelpContainer(a, f) {
  if (a) {
    a.classList.toggle("show");
    a.classList.contains("show")
      ? $("#" + a.id).slideDown("fast")
      : $("#" + a.id).slideUp("fast");
    var q = document.getElementById(f).querySelectorAll("i");
    f = a.querySelector(".bld-close");
    toggleIconActive(q, a);
    f.addEventListener("click", function () {
      a.classList.remove("show");
      a.classList.contains("show") || $("#" + a.id).slideUp("fast");
      toggleIconActive(q, a);
    });
  }
}
function toggleIconActive(a, f) {
  for (var q = 0; q < a.length; q++)
    f.classList.contains("show")
      ? a[q].classList.add("active")
      : a[q].classList.remove("active");
}
var currentRadioChecked = void 0;
jQuery(document).ready(function () {
  onInitBurger();
});
function onInitBurger() {
  tableActions();
  inkomenCheck();
  showSelectionRows("bezoekTable");
}
function tableActions() {
  showSelectionRows("correspondentieTabel");
  toggleExtraInfo("correspondentieTabel");
}
function filterSelect(a) {
  jQuery("tr").each(function () {
    jQuery(this).addClass("table__row--no-animation");
  });
  toggleExecute(a);
  setTimeout(responsiveFilterSelection, 500);
}
function toggleExecute(a) {
  1 === jQuery("input[id\x3d" + a.id + "]:checked").length &&
    ((a = jQuery("#" + a.id + "").parent()),
    a.find(".toggleInput").slideDown(),
    a
      .parent()
      .parent()
      .find("input[type\x3dradio]:not(:checked)")
      .each(function () {
        1 <= jQuery(this).parent().find(".toggleInput").length &&
          jQuery(this).parent().find(".toggleInput").slideUp();
      }));
}
function responsiveFilterSelection() {
  if (currentRadioChecked) {
    var a = currentRadioChecked.attr("id").substring(2),
      f,
      q;
    jQuery("#bld-filter-accordion").is(":visible")
      ? ((q = "#S_"), (f = jQuery("#L_" + a + "").parent()))
      : ((q = "#L_"), (f = jQuery("#S_" + a + "").parent()));
    jQuery(q + a + "").prop("checked", !0);
    f.find("input[type\x3dcheckbox]").each(function () {
      var f = jQuery(this)[0].checked,
        y = jQuery(this).attr("id"),
        y = y.substring(2),
        y = jQuery(q + a + "")
          .parent()
          .find(q + y + "");
      f ? y.prop("checked", !0) : y.prop("checked", !1);
    });
    toggleExecute(jQuery(q + a + "")[0]);
  }
}
function enableFilter(a) {
  jQuery(".show-all-rows").removeClass("disabled");
  jQuery.expr[":"].contains = jQuery.expr.createPseudo(function (a) {
    return function (f) {
      return 0 <= jQuery(f).text().toUpperCase().indexOf(a.toUpperCase());
    };
  });
  filterSelect(a);
  var f, q;
  jQuery("#bld-filter-accordion").is(":visible")
    ? ((f = jQuery("#bld-filter-accordion").find(
        "input[type\x3dradio]:checked"
      )),
      (a = "bld-filter-accordion"),
      (currentRadioChecked = f),
      (f = jQuery("#bld-filter-accordion input[type\x3dradio]:checked").attr(
        "id"
      )),
      (q = jQuery("#bld-filter-accordion input[type\x3dradio]:checked").length))
    : ((f = jQuery("#bld-filter-accordion-sm").find(
        "input[type\x3dradio]:checked"
      )),
      (a = "bld-filter-accordion-sm"),
      (currentRadioChecked = f),
      (f = jQuery("#bld-filter-accordion-sm input[type\x3dradio]:checked").attr(
        "id"
      )),
      (q = jQuery(
        "#bld-filter-accordion-sm input[type\x3dradio]:checked"
      ).length));
  jQuery("#correspondentieTabel tr:not(.thead-trans)").hide();
  f &&
    "allItems" == f.substring(2) &&
    (jQuery("#correspondentieTabel tr").fadeIn(),
    jQuery("#correspondentieTabel tr").removeClass("hidden"),
    rowColor());
  1 <= q &&
    jQuery("#" + a + " input:checked").each(function (a, f) {
      a = jQuery(f).parent().find(".input-year:checkbox:checked");
      1 <= a.length
        ? a.each(function (a, q) {
            filterRows(
              "all",
              f.id.substring(2),
              jQuery(q).attr("id").substring(2)
            );
          })
        : filterRows("type", f.id.substring(2));
    });
  a = jQuery("#correspondentieTabel tbody tr:visible").length;
  0 === a
    ? jQuery("#aantalCorrespondentieGetoond").text(
        "Er wordt geen correspondentie getoond."
      )
    : 1 === a
    ? jQuery("#aantalCorrespondentieGetoond").text(
        "Er wordt 1 correspondentie item getoond."
      )
    : jQuery("#aantalCorrespondentieGetoond").text(
        "Er worden " + a + " correspondentie items getoond."
      );
}
function filterRows(a, f, q) {
  var t, y, p, w;
  t = jQuery("#correspondentieTabel tr");
  q && (q = q.slice(4));
  for (w = 0; w < t.length; w++)
    "type" === a
      ? (y = t[w].getElementsByTagName("td")[0]) &&
        -1 < y.innerHTML.indexOf(f) &&
        (t[w].style.display = "")
      : "year" === a
      ? (y = t[w].getElementsByTagName("td")[1]) &&
        -1 < y.innerHTML.indexOf(f) &&
        (t[w].style.display = "")
      : "all" === a &&
        ((y = t[w].getElementsByTagName("td")[0]),
        (p = t[w].getElementsByTagName("td")[1]),
        y &&
          p &&
          -1 < y.innerHTML.indexOf(f) &&
          -1 < p.innerHTML.indexOf(q) &&
          (t[w].style.display = "")),
      "none" === t[w].style.display
        ? t[w].classList.add("hidden")
        : t[w].classList.remove("hidden");
  rowColor();
  setTimeout(countTableRows, 400);
}
function countTableRows() {
  0 === jQuery("tr:visible").length - 1
    ? jQuery(".table-noresult").show()
    : jQuery(".table-noresult").hide();
}
function rowColor() {
  jQuery("#correspondentieTabel tbody tr:not(.hidden):odd").css({
    backgroundColor: "#fff",
  });
  jQuery("#correspondentieTabel tbody tr:not(.hidden):even").css({
    backgroundColor: "#eef7fb",
  });
}
function toggleExtraInfo(a) {
  a = jQuery("#" + a);
  var f = jQuery(".table__expand");
  0 < a.length &&
    (f.off("click").on("click", function () {
      var a = jQuery(this).closest("tr"),
        f = a.find(".corr-date");
      a.find(".table__info").toggle();
      a.find(".table__info").toggleClass("transparent");
      jQuery(this).find(".delta").toggleClass("flip--vertical--rotated");
      f.find(".init-date").toggleClass("transparent");
      jQuery(this).find(".delta").hasClass("flip--vertical--rotated")
        ? jQuery(this).attr("aria-label", "Details verbergen")
        : jQuery(this).attr("aria-label", "Details tonen");
      a.find(".table__info").hasClass("transparent")
        ? jQuery(this).attr("aria-expanded", !1)
        : jQuery(this).attr("aria-expanded", !0);
    }),
    window.addEventListener(
      "keydown",
      function (a) {
        for (var q = 0; q < f.length; q++)
          document.activeElement === f[q] &&
            (("Enter" !== a.key &&
              "ArrowDown" !== a.key &&
              "ArrowUp" !== a.key &&
              " " !== a.key) ||
              f[q].click());
      },
      !0
    ));
}
function inkomenCheck() {
  var a = jQuery(".card");
  jQuery.each(a, function (a, q) {
    status = jQuery(this).find(".bld-inkomen-status").text();
    "nog niet bekend" === status &&
      jQuery(this).find(".bld-inkomen-datum").toggle();
  });
}
jQuery(document).ready(function () {
  onInitFormulier();
});
function onInitFormulier() {
  blockedRadioButtons();
  tableListener();
  showMobileDateInput();
  customMenuListeners();
  selectNativeUI();
}
function blockedRadioButtons() {
  jQuery(".custom-radio.blocked") &&
    jQuery(".custom-radio.blocked")
      .find('input[type\x3d"radio"]')
      .off()
      .change(function () {
        jQuery(".custom-radio.blocked")
          .find('input[type\x3d"radio"]')
          .each(function () {
            if (jQuery(this)[0].checked) {
              var a = jQuery(this).parent();
              a.addClass("checked");
            } else (a = jQuery(this).parent()), a.removeClass("checked");
          });
      });
}
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
function tableListener() {
  jQuery("table") &&
    jQuery("td").each(function () {
      var a = jQuery(this).text().replace("samen: ", ""),
        q = jQuery(this).find("p").text().replace("samen: ", "");
      ("€" !== a.charAt(0) &&
        "€" !== a.charAt(1) &&
        "€" !== q.charAt(0) &&
        "€" !== q.charAt(1)) ||
        jQuery(this).css({ "white-space": "nowrap", "text-align": "right" });
    });
  if (jQuery(".table-container")) {
    var a;
    jQuery(".table-container").each(function () {
      var f = jQuery(this).find(".table-responsive"),
        q = jQuery(this).find(".table-swipe-indicator"),
        t = q.find(".swipe-right"),
        y = q.find(".swipe-left");
      a = jQuery(this).find(".table-add-row");
      f && f[0] && f[0].scrollWidth > f[0].clientWidth
        ? q.css("display", "flex")
        : q.css("display", "none");
      a[0] && q.css("top", "calc(50% - " + a[0].clientHeight + "px)");
      jQuery(f).scroll(function () {
        var a = jQuery(f)[0].offsetWidth,
          q = jQuery(f)[0].scrollWidth,
          B = jQuery(f).scrollLeft();
        0 < B ? y.css("visibility", "visible") : y.css("visibility", "hidden");
        q - a <= B + 4
          ? t.css("visibility", "hidden")
          : t.css("visibility", "visible");
      });
      t.on("click", function () {
        f[0].scrollLeft += 20;
      });
      y.on("click", function () {
        f[0].scrollLeft -= 20;
      });
    });
  }
}
function expandNavItem(a) {
  var f = a.target;
  a = a.target.closest("li").querySelector("ul");
  a.classList.toggle("show");
  f.classList.toggle("flip--vertical--rotated");
  jQuery(a).hasClass("nav-level-2") &&
    !jQuery(a).hasClass("show") &&
    ((f = jQuery(a).find(".nav-level-3")),
    f.prev().find(".icon.pointer").removeClass("flip--vertical--rotated"),
    f.removeClass("show"));
}
function showMobileDateInput() {
  if (onMobileBrowser)
    for (
      var a = jQuery.find(".datepicker__trigger"), f = 0;
      f < a.length;
      f++
    ) {
      var q = jQuery(a[f]).find("button"),
        t = jQuery(a[f]).find("input");
      q.remove();
      t.attr("inputmode", "numeric");
      switch (t.attr("placeholder")) {
        case "mm-jjjj":
          t.removeAttr("placeholder");
          t.mask("00-0000", { placeholder: "mm-jjjj" });
          break;
        case "dd-mm":
          t.removeAttr("placeholder");
          t.mask("00-00", { placeholder: "dd-mm" });
          break;
        default:
          t.removeAttr("placeholder"),
            t.mask("00-00-0000", { placeholder: "dd-mm-jjjj" });
      }
    }
}
function customMenuListeners() {
  var a = 0;
  jQuery("#navMenuDropdown")
    .off("click")
    .on("click", function () {
      0 <= a && (showMenu(), (a += 1));
      1 < a && (hideMenu(), (a = 0));
    });
  jQuery(".backdrop")
    .off("click")
    .on("click", function () {
      hideMenu();
      a = 0;
    });
  jQuery(".bld-menu .list-unstyled li a")
    .off("click")
    .on("click", function () {
      hideMenu();
      a = 0;
    });
}
function showMenu() {
  jQuery("#bld-hamburger").addClass("menu-hamburger-active");
  jQuery(".bld-hamburger-text")
    .text("Sluiten")
    .addClass("active")
    .one(
      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
      function () {
        jQuery(this).removeClass("active");
      }
    );
  jQuery("#navMenuDropdown").attr("aria-label", "Sluit Menu");
  jQuery(".ola-menu").addClass("show");
  jQuery(".backdrop").addClass("show");
}
function hideMenu() {
  jQuery("#bld-hamburger")
    .toggleClass("menu-hamburger-animation")
    .removeClass("menu-hamburger-active");
  jQuery(".bld-hamburger-text").text("Menu").removeClass("active");
  jQuery("#navMenuDropdown").attr("aria-label", "Menu");
  jQuery(".ola-menu").removeClass("show");
  jQuery(".backdrop").removeClass("show");
}
function selectNativeUI() {
  for (var a = jQuery("select"), f = 0; f < a.length; f++)
    jQuery(a[f]).selectpicker("dropupAuto", !1);
}
function initSuggestionBox(a, f) {
  function q(a) {
    if (!a) return !1;
    for (var f = 0; f < a.length; f++)
      a[f].classList.remove("autocomplete-active");
    y >= a.length && (y = 0);
    0 > y && (y = a.length - 1);
    a[y].classList.add("autocomplete-active");
    a[y].scrollIntoViewIfNeeded();
  }
  function t(f) {
    for (
      var p = document.getElementsByClassName("autocomplete-items"), q = 0;
      q < p.length;
      q++
    )
      f !== p[q] && f !== a && p[q].parentNode.removeChild(p[q]);
  }
  var y;
  a.addEventListener("input", function (p) {
    var q,
      B,
      F = this.value;
    t();
    if (!F) return !1;
    y = -1;
    p = document.createElement("DIV");
    p.setAttribute("id", this.id + "autocomplete-list");
    p.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(p);
    for (B = 0; B < f.length; B++)
      f[B].substr(0, F.length).toUpperCase() === F.toUpperCase() &&
        ((q = document.createElement("DIV")),
        (q.innerHTML =
          "\x3cstrong\x3e" + f[B].substr(0, F.length) + "\x3c/strong\x3e"),
        (q.innerHTML += f[B].substr(F.length)),
        (q.innerHTML +=
          "\x3cinput type\x3d'hidden' value\x3d'" + f[B] + "'\x3e"),
        q.addEventListener("click", function (f) {
          a.value = this.getElementsByTagName("input")[0].value;
          t();
        }),
        p.appendChild(q));
  });
  a.addEventListener("keydown", function (a) {
    var f = document.getElementById(this.id + "autocomplete-list");
    f && (f = f.getElementsByTagName("div"));
    40 === a.keyCode
      ? (y++, q(f))
      : 38 === a.keyCode
      ? (y--, q(f))
      : 13 === a.keyCode && (a.preventDefault(), -1 < y && f && f[y].click());
  });
  document.addEventListener("click", function (a) {
    t(a.target);
  });
}
function customizeViaTable() {
  for (var a = jQuery.find(".viaovz"), f = 0; f < a.length; f++)
    for (var q = jQuery(a[f]).find("table"), t = 0; t < q.length; t++)
      q.addClass("table table-borderless"),
        jQuery(q[t]).closest("div").addClass("table-responsive");
}
(function () {
  function a() {
    y.css({ width: getComputedStyle(q.get(0)).width });
  }
  function f() {
    p.remove();
    p = y = t = q = null;
    w = !1;
  }
  var q = null,
    t = null,
    y = null,
    p = null,
    w = !1;
  window.addEventListener("resize", function (f) {
    w && a();
  });
  $(window).on("show.bs.dropdown", function (f) {
    !f.target.classList.contains("bootstrap-select") ||
      0 < $(".mobile-device", $(f.target)).length ||
      ((q = $(f.target)),
      (t = $(".selectpicker", q)),
      (y = $("div.dropdown-menu", q)),
      a(),
      (p = $(
        '\x3cdiv class\x3d"bootstrap-select-atb bootstrap-select"\x3e\x3c/div\x3e'
      ).append(y.detach())),
      $("body").append(p),
      (f = q.offset()),
      y.css({ display: "block", top: f.top + q.outerHeight(), left: f.left }),
      (w = !0));
    return !0;
  });
  $(window).on("hide.bs.dropdown", function (a) {
    w && (q.append(y.detach()), y.hide(), f());
    return !0;
  });
  window.addEventListener(
    "click",
    function (a) {
      w &&
        setTimeout(function () {
          w &&
            (document.body.contains(t.get(0)) ? t.selectpicker("toggle") : f());
        });
      return !0;
    },
    !0
  );
})();
var _Algemeen = {},
  _accessible = !1;
_Algemeen.init = function () {
  initHelpListenerGwt();
  initSelectPicker();
  initSwipeIconListeners();
};
var onInitGwtTimeout = null;
function onInitGwt() {
  null !== onInitGwtTimeout &&
    (clearTimeout(onInitGwtTimeout), (onInitGwtTimeout = null));
  onInitGwtTimeout = setTimeout(function () {
    onInit();
    onInitFormulier();
    initHelpListenerGwt();
    initSelectPicker();
    wrapTable();
    tableListener();
    addPrintClickEventListener();
    window.removeEventListener("resize", tableListener);
    window.addEventListener("resize", tableListener);
    initSwipeIconListeners();
    onInitGwtTimeout = null;
  }, 200);
  null !== refreshTablesGwtTimeout &&
    (clearTimeout(refreshTablesGwtTimeout), (refreshTablesGwtTimeout = null));
}
var refreshTablesGwtTimeout = null;
function refreshTablesGwt() {
  null !== refreshTablesGwtTimeout &&
    (clearTimeout(refreshTablesGwtTimeout), (refreshTablesGwtTimeout = null));
  null === onInitGwtTimeout &&
    (refreshTablesGwtTimeout = setTimeout(function () {
      tableListener();
      refreshTablesGwtTimeout = null;
    }, 200));
}
function initHelpListenerGwt() {
  if (0 < jQuery(".bld-help-icon").length)
    jQuery(".bld-help-icon")
      .off("click")
      .on("click", function () {
        var a = jQuery(this).attr("id");
        toonHelpTekst(a);
        helpListener(a);
        setTimeout(function () {
          tableListener();
        }, 300);
        event.stopPropagation();
      });
}
function initSelectPicker() {
  jQuery("select").not(".pika-select").selectpicker();
}
function initSwipeIconListeners() {
  jQuery(".card__body")
    .off("shown.bs.collapse")
    .on("shown.bs.collapse", function () {
      tableListener();
    });
  jQuery(".bld-close").on("click", function () {
    setTimeout(function () {
      tableListener();
    }, 300);
  });
}
function refreshSelectPicker() {
  jQuery(".selectpicker").selectpicker("refresh");
}
function setAccessible(a) {
  _accessible = a;
}
function toggleHelpPanel(a) {
  $(".toggleHelpPanelEffect_" + a).slideToggle(500);
}
function togglePanelcontent(a) {
  var f = jQuery("#" + a);
  $("#" + a).hasClass("collapsed")
    ? ($("#" + a).addClass("inklap_icon"),
      $("#" + a).removeClass("uitklap_icon"),
      $("#" + a + " ~ div").removeClass(a + "_collapsed"),
      $("#" + a + " ~ table").removeClass(a + "_collapsed"),
      f.removeClass("collapsed"),
      -1 < a.search("brk") &&
        $("#" + a)
          .parent()
          .removeClass("no-margin-bottom"))
    : (f.addClass("collapsed"),
      $("#" + a + " ~ div").addClass(a + "_collapsed"),
      $("#" + a + " ~ table").addClass(a + "_collapsed"),
      $("#" + a).addClass("uitklap_icon"),
      $("#" + a).removeClass("inklap_icon"),
      -1 < a.search("brk") &&
        $("#" + a)
          .parent()
          .addClass("no-margin-bottom"));
}
function showPopupPanel(a, f) {
  jQuery("#Cover1").height(jQuery("#PageContainer").height() + 80);
  jQuery(f)
    .css("top", a + "px")
    .css("display", "block");
  jQuery("#Cover1").fadeIn(800, function () {
    jQuery(f).focus();
  });
}
function hidePopupPanel(a) {
  jQuery("#Cover1").hide();
  jQuery(a).remove();
}
function hideContentPanel() {
  $("#contentpanel").hide();
}
function showContentPanel() {
  $("#contentpanel").show();
}
function collapseAllPanels(a) {
  $("." + a).each(function (a) {
    a = $(this);
    togglePanelcontent(a.attr("id"));
  });
}
function wrapTable() {
  for (
    var a;
    void 0 !==
    (a = document.getElementsByClassName("needs-overflow-protection")[0]);

  ) {
    a.classList.remove("needs-overflow-protection");
    try {
      var f = document.createElement("div");
      f.setAttribute("class", "table-container");
      var q = document.createElement("div");
      q.setAttribute("class", "table-swipe-container");
      var t = document.createElement("div");
      t.setAttribute("class", "table-swipe-indicator");
      var y = document.createElement("div");
      y.setAttribute("class", "swipe-left");
      var p = document.createElement("div");
      p.setAttribute("class", "swipe-right");
      var w = document.createElement("span");
      w.setAttribute("class", "icon");
      w.setAttribute("aria-hidden", "true");
      w.innerText = "delta_links";
      var B = document.createElement("span");
      B.setAttribute("class", "icon");
      B.setAttribute("aria-hidden", "true");
      B.innerText = "delta_rechts";
      y.appendChild(w);
      p.appendChild(B);
      t.appendChild(y);
      t.appendChild(p);
      q.appendChild(t);
      f.appendChild(q);
      var F = document.createElement("div");
      F.setAttribute("class", "table-responsive");
      f.appendChild(F);
      a.replaceWith(f);
      F.appendChild(a);
    } catch (O) {
      console.error("Could not handle " + a.id), console.error(O);
    }
  }
}
function addClickHandlerRadiobuttonCheckbox(a) {
  $("input[name\x3d" + a + "]").click(function () {
    this.blur();
    this.focus();
  });
}
function focusHelp(a) {
  openAndFocus(a, "_help");
}
var helptab = null;
function openAndFocus(a, f) {
  helptab && !helptab.closed && helptab.close();
  helptab = window.open(a, f);
  return !1;
}
function setHelpAccessible() {
  $(".help-link").attr("tabindex", "0");
}
function setTabIndexUit() {
  $("input[tabindex!\x3d-2]").attr("tabindex", "-5");
  $("a[tabindex!\x3d-2]").attr("tabindex", "-5");
  $("button[tabindex!\x3d-2]").attr("tabindex", "-5");
  $("select[tabindex!\x3d-2]").attr("tabindex", "-5");
  $("div[tabindex\x3d0]").attr("tabindex", "-5");
  $("span[tabindex\x3d0]").attr("tabindex", "-5");
}
function setPopupAccessible() {
  $("#detailschermholderid").attr("aria-hidden", "false");
  $("#detailschermholderid input[tabindex!\x3d-2]").attr("tabindex", "0");
  $("#detailschermholderid a[tabindex!\x3d-2]").attr("tabindex", "0");
  $("#detailschermholderid button[tabindex!\x3d-2]").attr("tabindex", "0");
  $("#detailschermholderid select[tabindex!\x3d-2]").attr("tabindex", "0");
}
var focusId;
function setNextFocusId(a) {
  focusId = a;
}
function setNextFocus() {
  $("#" + focusId).focus();
}
function setTabIndexAan() {
  $("[tabindex\x3d-5]").attr("tabindex", "0");
}
OLA = {
  toggleWaitScreen: function (a) {
    var f = $("#wait"),
      q = $("#wait div p");
    0 < f.length &&
      (a
        ? ((document.body.style.cursor = "wait"),
          showModalBackdrop(),
          f.show(),
          q.focus())
        : ((document.body.style.cursor = "default"),
          hideModalBackdrop(),
          f.hide()));
  },
};
function activateFocusNextInputField(a) {
  $("#" + a).focusNextInputField();
}
$.fn.focusNextInputField = function () {
  return this.each(function () {
    var a = $(this)
        .parents("form:eq(0),body")
        .find(
          "button:visible[tabindex!\x3d-2],input:visible[tabindex!\x3d-2],textarea:visible[tabindex!\x3d-2],select:visible[tabindex!\x3d-2]"
        ),
      f = a.index(this);
    -1 < f && f + 1 < a.length && a.eq(f + 1).focus();
    return !1;
  });
};
function activateTooltips(a) {
  a.querySelectorAll(".tooltip").forEach(function (a) {
    $(a).attr("tabindex", "0");
    a.addEventListener("focus", function () {
      return showTooltip(a);
    });
    a.addEventListener("mouseover", function () {
      return showTooltip(a);
    });
  });
}
function printElement(a) {
  null !== a &&
    void 0 !== a &&
    "" !== a &&
    document.getElementById(a) &&
    ((a = document.getElementById(a).innerHTML),
    (newWin = window.open()),
    newWin.document.write(a),
    newWin.document.close(),
    newWin.focus(),
    newWin.print(),
    newWin.close());
}
function printClickEventListener(a) {
  a.target.hasAttribute("ola-print-id") &&
    printElement(a.target.getAttribute("ola-print-id"));
}
function addPrintClickEventListener() {
  document.body.removeEventListener("click", printClickEventListener);
  document.body.addEventListener("click", printClickEventListener);
}
var picker,
  pickerActiveElementClassName = null,
  pickerTabPressedInInput = !1;
function destroyPikaday() {
  picker &&
    (picker.destroy(),
    (picker = void 0),
    (pickerActiveElementClassName = null),
    (pickerTabPressedInInput = !1));
}
function datepickerDatumBox(a, f, q, t, y, p) {
  datepickerDatumBoxWithLanguageCode(a, f, q, t, y, p, "nl");
}
function datepickerDatumBoxWithLanguageCode(a, f, q, t, y, p, w) {
  function B() {
    ingevuldeDatum = aa.value;
    ma(ingevuldeDatum) && picker.setDate(Z(ingevuldeDatum, "DD-MM-YYYY"));
  }
  function F(a, d, f, m) {
    return (
      O(a) &&
      a.getFullYear() === d &&
      a.getMonth() === f &&
      a.getDate() === m &&
      (!O(t) || a >= t) &&
      (!O(y) || a <= y)
    );
  }
  function O(a) {
    return (
      /Date/.test(Object.prototype.toString.call(a)) && !isNaN(a.getTime())
    );
  }
  function K(a) {
    a &&
      a.addEventListener("keydown", function (a) {
        27 === a.keyCode &&
          (a.stopPropagation(),
          aa.focus(),
          (pickerActiveElementClassName = null),
          picker.hide());
      });
  }
  function d(a) {
    a &&
      a.addEventListener("keydown", function (a) {
        if (13 === a.keyCode || 32 === a.keyCode)
          if ((a = a.target.getElementsByClassName("pika-select")[0]))
            (pickerActiveElementClassName =
              -1 === a.className.indexOf("pika-select-month")
                ? "pika-select-year"
                : "pika-select-month"),
              a.focus();
      });
  }
  function I(a, d) {
    a &&
      d &&
      a.addEventListener("keydown", function (a) {
        if (a.shiftKey && 9 === a.keyCode)
          a.stopPropagation(), a.preventDefault(), d.focus();
        else if (13 === a.keyCode || 32 === a.keyCode)
          (pickerActiveElementClassName = "pika-prev"),
            a.stopPropagation(),
            a.target.dispatchEvent(new Event("mousedown"));
      });
  }
  function C(a) {
    a &&
      a.addEventListener("keydown", function (a) {
        if (13 === a.keyCode || 32 === a.keyCode)
          (pickerActiveElementClassName = "pika-next"),
            a.stopPropagation(),
            a.target.dispatchEvent(new Event("mousedown"));
      });
  }
  function Y(a) {
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var d = a.next(); !d.done; d = a.next())
        d.value.addEventListener("keydown", function (a) {
          if (13 === a.keyCode || 32 === a.keyCode)
            (pickerActiveElementClassName = null),
              a.stopPropagation(),
              a.target.dispatchEvent(new Event("mousedown"));
        });
    }
  }
  function S(a, d) {
    a &&
      d &&
      a.addEventListener("keydown", function (a) {
        a.shiftKey ||
          9 !== a.keyCode ||
          (a.stopPropagation(), a.preventDefault(), d.focus());
      });
  }
  function ga() {
    if (
      document.getElementsByClassName("pika-lendar") &&
      1 === document.getElementsByClassName("pika-lendar").length
    ) {
      var a = document.getElementsByClassName("pika-lendar")[0],
        f = a.getElementsByClassName("pika-select-month")[0],
        f = f ? f.parentNode : void 0,
        p = a.getElementsByClassName("pika-select-year")[0],
        p = p ? p.parentNode : void 0,
        m = a.getElementsByClassName("pika-prev")[0],
        q = a.getElementsByClassName("pika-next")[0],
        t = a.getElementsByClassName("pika-day"),
        w = t ? t[t.length - 1] : void 0;
      K(a);
      d(f);
      d(p);
      I(m, w);
      C(q);
      Y(t);
      S(w, m);
      m && (m.tabIndex = 1);
      f && (f.tabIndex = 2);
      p && (p.tabIndex = 3);
      q && (q.tabIndex = 4);
      if (t)
        for (a = $jscomp.makeIterator(t), f = a.next(); !f.done; f = a.next())
          if ((f = f.value)) f.tabIndex = 5;
    }
  }
  q = q || "DD-MM-YYYY";
  w = w || "nl";
  t = new Date(parseInt(t));
  y = new Date(parseInt(y));
  p = p ? new Date(parseInt(p)) : t;
  p > y && (p = t);
  var aa = document.getElementById(a);
  if (aa) {
    var T, Z, ma;
    switch (q) {
      case "DD-MM-YYYY":
        T = function (a, d) {
          d = a.getDate();
          10 > d && (d = "0" + d);
          var f = a.getMonth() + 1;
          10 > f && (f = "0" + f);
          a = a.getFullYear();
          return d + "-" + f + "-" + a;
        };
        Z = function (a, d) {
          var f = a.split("-");
          if (
            3 !== f.length ||
            2 !== f[0].length ||
            2 !== f[1].length ||
            4 !== f[2].length
          )
            return !1;
          a = parseInt(f[0], 10);
          d = parseInt(f[1], 10) - 1;
          var f = parseInt(f[2], 10),
            m = new Date(f, d, a);
          return F(m, f, d, a) ? m : null;
        };
        ma = function (a) {
          if ("" == a) return !1;
          var d = a.split("-"),
            f = parseInt(d[0], 10),
            m = parseInt(d[1], 10) - 1,
            d = parseInt(d[2], 10);
          a = Z(a);
          return F(a, d, m, f);
        };
        break;
      case "DD-MM":
        T = function (a, d) {
          d = a.getDate();
          10 > d && (d = "0" + d);
          a = a.getMonth() + 1;
          10 > a && (a = "0" + a);
          return d + "-" + a;
        };
        Z = function (a, d) {
          d = a.split("-");
          a = parseInt(d[0], 10);
          d = parseInt(d[1], 10) - 1;
          var f = t.getFullYear(),
            m = new Date(f, d, a);
          return F(m, f, d, a) ? m : null;
        };
        ma = function (a) {
          if ("" == a) return !1;
          var d = a.split("-");
          if (2 !== d.length || 2 !== d[0].length || 2 !== d[1].length)
            return !1;
          var f = parseInt(d[0], 10),
            d = parseInt(d[1], 10) - 1,
            m = t.getFullYear();
          a = Z(a);
          return F(a, m, d, f);
        };
        break;
      default:
        console.warn("Onbekende datum Formaat " + q);
        console.trace();
        return;
    }
    var ea;
    switch (w) {
      case "nl":
        ea = {
          previousMonth: "Vorige maand",
          nextMonth: "Volgende maand",
          months:
            "Januari Februari Maart April Mei Juni Juli Augustus September Oktober November December".split(
              " "
            ),
          weekdays:
            "Zondag Maandag Dinsdag Woensdag Donderdag Vrijdag Zaterdag".split(
              " "
            ),
          weekdaysShort: "Zo Ma Di Wo Do Vr Za".split(" "),
        };
        break;
      case "en":
        ea = {
          previousMonth: "Previous month",
          nextMonth: "Next month",
          months:
            "January February March April May June July August September October November December".split(
              " "
            ),
          weekdays:
            "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
              " "
            ),
          weekdaysShort: "Su Mo Tu We Th Fr Sa".split(" "),
        };
        break;
      case "de":
        ea = {
          previousMonth: "Letzten Monat",
          nextMonth: "Nächsten Monat",
          months:
            "Januar Februar März April Mai Juni Juli August September Oktober November Dezember".split(
              " "
            ),
          weekdays:
            "Sonntag Montag Dienstag Mittwoch Donnerstag Freitag Samstag".split(
              " "
            ),
          weekdaysShort: "So Mo Di Mi Do Fr Sa".split(" "),
        };
        break;
      default:
        console.warn(
          "Onbekende languageCode " + w + ". Fallback naar Nederlands."
        ),
          (ea = {
            previousMonth: "Vorige maand",
            nextMonth: "Volgende maand",
            months:
              "Januari Februari Maart April Mei Juni Juli Augustus September Oktober November December".split(
                " "
              ),
            weekdays:
              "Zondag Maandag Dinsdag Woensdag Donderdag Vrijdag Zaterdag".split(
                " "
              ),
            weekdaysShort: "Zo Ma Di Wo Do Vr Za".split(" "),
          });
    }
    (a = aa.nextElementSibling) &&
      "BUTTON" === a.tagName &&
      a.addEventListener("click", function (a) {
        a.stopPropagation();
        aa.blur();
        destroyPikaday();
        ((picker = new Pikaday({
          defaultDate: p,
          setDefaultDate: !1,
          numberOfMonths: 1,
          field: aa,
          trigger: aa,
          format: q,
          toString: T,
          parse: Z,
          minDate: t,
          maxDate: y,
          yearRange: [t.getFullYear(), y.getFullYear()],
          i18n: ea,
          onOpen: B,
          onClose: destroyPikaday,
          onDraw: ga,
        })),
        picker.el) && picker.show();
      });
    aa.addEventListener("focus", function (a) {
      pickerTabPressedInInput = !1;
      null !== pickerActiveElementClassName &&
        picker &&
        picker.isVisible &&
        (a.stopImmediatePropagation(),
        a.preventDefault(),
        (a = document
          .getElementsByClassName("pika-lendar")[0]
          .getElementsByClassName(pickerActiveElementClassName)[0]),
        "pika-select-month" === pickerActiveElementClassName ||
        "pika-select-year" === pickerActiveElementClassName
          ? a.parentNode.focus()
          : a.focus());
    });
    aa.addEventListener("blur", function (a) {
      null !== pickerActiveElementClassName
        ? (a.stopImmediatePropagation(),
          a.preventDefault(),
          (pickerActiveElementClassName = null))
        : pickerTabPressedInInput &&
          picker &&
          picker.isVisible() &&
          document.getElementsByClassName("pika-prev")[0] &&
          (a.stopImmediatePropagation(),
          a.preventDefault(),
          (pickerTabPressedInInput = !1),
          document.getElementsByClassName("pika-prev")[0].focus());
    });
    aa.addEventListener("keydown", function (a) {
      !a.shiftKey &&
        9 === a.keyCode &&
        picker &&
        picker.isVisible() &&
        (pickerTabPressedInInput = !0);
    });
  } else console.warn("Onbekend element " + a), console.trace();
}
function showTooltip(a) {
  var f;
  a.classList.contains("tooltip") && (f = a.childNodes[1]);
  f.classList.toggle("show");
  f.classList.remove("left", "right");
  a.addEventListener("mouseleave", function () {
    f.classList.remove("show");
  });
  var q = jQuery(".screenContent").first().get(0);
  a = f.getBoundingClientRect().left;
  var t = f.getBoundingClientRect().right,
    y = q.getBoundingClientRect().left,
    q = q.getBoundingClientRect().right;
  q - y < 1.5 * f.offsetWidth && f.classList.add("small");
  t >= q ? f.classList.add("right") : a < y && f.classList.add("left");
}
function showLogoutModal() {
  jQuery(".logoutModal").css("display", "block");
  jQuery(".logoutModal").css("class", "modal fade show");
  showModalBackdrop();
}
function showTimeoutModal() {
  jQuery("#timeoutModal").css("display", "block");
  jQuery("#timeoutModal").css("class", "modal fade show");
  showModalBackdrop();
}
function hideLogoutModal() {
  jQuery(".logoutModal").css("display", "none");
  jQuery(".logoutModal").css("class", "modal fade");
  hideModalBackdrop();
}
function hideTimeoutModal() {
  jQuery("#timeoutModal").css("display", "none");
  jQuery("#timeoutModal").css("class", "modal fade");
  hideModalBackdrop();
}
function hideModalBackdrop() {
  jQuery(".modal-backdrop").remove();
  jQuery("body").removeClass("modal-open");
}
function showModalBackdrop() {
  jQuery("body").append('\x3cdiv class\x3d"modal-backdrop fade show"/\x3e');
  jQuery("body").addClass("modal-open");
}
jQuery(document).ready(function () {
  _Algemeen.init();
});
