!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}(this, function(e) {
    "use strict";
    function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
        }
    }
    function q() {
        return we || "undefined" != typeof window && (we = window.gsap) && we.registerPlugin && we
    }
    function y(e, t) {
        return ~Fe.indexOf(e) && Fe[Fe.indexOf(e) + 1][t]
    }
    function z(e) {
        return !!~t.indexOf(e)
    }
    function A(e, t, r, n, o) {
        return e.addEventListener(t, r, {
            passive: !n,
            capture: !!o
        })
    }
    function B(e, t, r, n) {
        return e.removeEventListener(t, r, !!n)
    }
    function E() {
        return ze && ze.isPressed || Le.cache++
    }
    function F(r, n) {
        function Sc(e) {
            if (e || 0 === e) {
                o && (Ae.history.scrollRestoration = "manual");
                var t = ze && ze.isPressed;
                e = Sc.v = Math.round(e) || (ze && ze.iOS ? 1 : 0),
                r(e),
                Sc.cacheID = Le.cache,
                t && i("ss", e)
            } else
                (n || Le.cache !== Sc.cacheID || i("ref")) && (Sc.cacheID = Le.cache,
                Sc.v = r());
            return Sc.v + Sc.offset
        }
        return Sc.offset = 0,
        r && Sc
    }
    function I(e) {
        return we.utils.toArray(e)[0] || ("string" == typeof e && !1 !== we.config().nullTargetWarn ? console.warn("Element not found:", e) : null)
    }
    function J(t, e) {
        var r = e.s
          , n = e.sc;
        z(t) && (t = Ee.scrollingElement || Me);
        var o = Le.indexOf(t)
          , i = n === Ne.sc ? 1 : 2;
        ~o || (o = Le.push(t) - 1),
        Le[o + i] || t.addEventListener("scroll", E);
        var a = Le[o + i]
          , s = a || (Le[o + i] = F(y(t, r), !0) || (z(t) ? n : F(function(e) {
            return arguments.length ? t[r] = e : t[r]
        })));
        return s.target = t,
        a || (s.smooth = "smooth" === we.getProperty(t, "scrollBehavior")),
        s
    }
    function K(e, t, o) {
        function od(e, t) {
            var r = He();
            t || n < r - s ? (a = i,
            i = e,
            l = s,
            s = r) : o ? i += e : i = a + (e - a) / (r - l) * (s - l)
        }
        var i = e
          , a = e
          , s = He()
          , l = s
          , n = t || 50
          , c = Math.max(500, 3 * n);
        return {
            update: od,
            reset: function reset() {
                a = i = o ? 0 : i,
                l = s = 0
            },
            getVelocity: function getVelocity(e) {
                var t = l
                  , r = a
                  , n = He();
                return !e && 0 !== e || e === i || od(e),
                s === l || c < n - l ? 0 : (i + (o ? r : -r)) / ((o ? n : s) - t) * 1e3
            }
        }
    }
    function L(e, t) {
        return t && !e._gsapAllow && e.preventDefault(),
        e.changedTouches ? e.changedTouches[0] : e
    }
    function M(e) {
        var t = Math.max.apply(Math, e)
          , r = Math.min.apply(Math, e);
        return Math.abs(t) >= Math.abs(r) ? t : r
    }
    function N() {
        (Ie = we.core.globals().ScrollTrigger) && Ie.core && function _integrate() {
            var e = Ie.core
              , r = e.bridge || {}
              , t = e._scrollers
              , n = e._proxies;
            t.push.apply(t, Le),
            n.push.apply(n, Fe),
            Le = t,
            Fe = n,
            i = function _bridge(e, t) {
                return r[e](t)
            }
        }()
    }
    function O(e) {
        return (we = e || q()) && "undefined" != typeof document && document.body && (Ae = window,
        Me = (Ee = document).documentElement,
        Ce = Ee.body,
        t = [Ae, Ee, Me, Ce],
        we.utils.clamp,
        De = "onpointerenter"in Ce ? "pointer" : "mouse",
        Oe = k.isTouch = Ae.matchMedia && Ae.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart"in Ae || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints ? 2 : 0,
        Be = k.eventTypes = ("ontouchstart"in Me ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown"in Me ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","),
        setTimeout(function() {
            return o = 0
        }, 500),
        N(),
        ke = 1),
        ke
    }
    var we, ke, Ae, Ee, Me, Ce, Oe, De, Ie, t, ze, Be, o = 1, Re = [], Le = [], Fe = [], He = Date.now, i = function _bridge(e, t) {
        return t
    }, r = "scrollLeft", n = "scrollTop", Je = {
        s: r,
        p: "left",
        p2: "Left",
        os: "right",
        os2: "Right",
        d: "width",
        d2: "Width",
        a: "x",
        sc: F(function(e) {
            return arguments.length ? Ae.scrollTo(e, Ne.sc()) : Ae.pageXOffset || Ee[r] || Me[r] || Ce[r] || 0
        })
    }, Ne = {
        s: n,
        p: "top",
        p2: "Top",
        os: "bottom",
        os2: "Bottom",
        d: "height",
        d2: "Height",
        a: "y",
        op: Je,
        sc: F(function(e) {
            return arguments.length ? Ae.scrollTo(Je.sc(), e) : Ae.pageYOffset || Ee[n] || Me[n] || Ce[n] || 0
        })
    };
    Je.op = Ne,
    Le.cache = 0;
    var k = (Observer.prototype.init = function init(e) {
        ke || O(we) || console.warn("Please gsap.registerPlugin(Observer)"),
        Ie || N();
        var o = e.tolerance
          , a = e.dragMinimum
          , t = e.type
          , n = e.target
          , r = e.lineHeight
          , i = e.debounce
          , s = e.preventDefault
          , l = e.onStop
          , c = e.onStopDelay
          , u = e.ignore
          , f = e.wheelSpeed
          , d = e.event
          , p = e.onDragStart
          , g = e.onDragEnd
          , h = e.onDrag
          , v = e.onPress
          , b = e.onRelease
          , m = e.onRight
          , y = e.onLeft
          , x = e.onUp
          , S = e.onDown
          , w = e.onChangeX
          , _ = e.onChangeY
          , T = e.onChange
          , k = e.onToggleX
          , P = e.onToggleY
          , C = e.onHover
          , D = e.onHoverEnd
          , R = e.onMove
          , X = e.ignoreCheck
          , F = e.isNormalizer
          , Y = e.onGestureStart
          , H = e.onGestureEnd
          , V = e.onWheel
          , W = e.onEnable
          , j = e.onDisable
          , q = e.onClick
          , U = e.scrollSpeed
          , G = e.capture
          , $ = e.allowClicks
          , Q = e.lockAxis
          , Z = e.onLockAxis;
        function Pe() {
            return ye = He()
        }
        function Qe(e, t) {
            return (se.event = e) && u && ~u.indexOf(e.target) || t && ge && "touch" !== e.pointerType || X && X(e, t)
        }
        function Se() {
            var e = se.deltaX = M(be)
              , t = se.deltaY = M(me)
              , r = Math.abs(e) >= o
              , n = Math.abs(t) >= o;
            T && (r || n) && T(se, e, t, be, me),
            r && (m && 0 < se.deltaX && m(se),
            y && se.deltaX < 0 && y(se),
            w && w(se),
            k && se.deltaX < 0 != le < 0 && k(se),
            le = se.deltaX,
            be[0] = be[1] = be[2] = 0),
            n && (S && 0 < se.deltaY && S(se),
            x && se.deltaY < 0 && x(se),
            _ && _(se),
            P && se.deltaY < 0 != ce < 0 && P(se),
            ce = se.deltaY,
            me[0] = me[1] = me[2] = 0),
            (ne || re) && (R && R(se),
            re && (h(se),
            re = !1),
            ne = !1),
            ie && !(ie = !1) && Z && Z(se),
            oe && (V(se),
            oe = !1),
            ee = 0
        }
        function Te(e, t, r) {
            be[r] += e,
            me[r] += t,
            se._vx.update(e),
            se._vy.update(t),
            i ? ee = ee || requestAnimationFrame(Se) : Se()
        }
        function Ue(e, t) {
            Q && !ae && (se.axis = ae = Math.abs(e) > Math.abs(t) ? "x" : "y",
            ie = !0),
            "y" !== ae && (be[2] += e,
            se._vx.update(e, !0)),
            "x" !== ae && (me[2] += t,
            se._vy.update(t, !0)),
            i ? ee = ee || requestAnimationFrame(Se) : Se()
        }
        function Ve(e) {
            if (!Qe(e, 1)) {
                var t = (e = L(e, s)).clientX
                  , r = e.clientY
                  , n = t - se.x
                  , o = r - se.y
                  , i = se.isDragging;
                se.x = t,
                se.y = r,
                (i || Math.abs(se.startX - t) >= a || Math.abs(se.startY - r) >= a) && (h && (re = !0),
                i || (se.isDragging = !0),
                Ue(n, o),
                i || p && p(se))
            }
        }
        function Xe(t) {
            if (!Qe(t, 1)) {
                B(F ? n : ve, Be[1], Ve, !0);
                var e = se.isDragging && (3 < Math.abs(se.x - se.startX) || 3 < Math.abs(se.y - se.startY))
                  , r = L(t);
                e || (se._vx.reset(),
                se._vy.reset(),
                s && $ && we.delayedCall(.08, function() {
                    if (300 < He() - ye && !t.defaultPrevented)
                        if (t.target.click)
                            t.target.click();
                        else if (ve.createEvent) {
                            var e = ve.createEvent("MouseEvents");
                            e.initMouseEvent("click", !0, !0, Ae, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null),
                            t.target.dispatchEvent(e)
                        }
                })),
                se.isDragging = se.isGesturing = se.isPressed = !1,
                l && !F && te.restart(!0),
                g && e && g(se),
                b && b(se, e)
            }
        }
        function Ye(e) {
            return e.touches && 1 < e.touches.length && (se.isGesturing = !0) && Y(e, se.isDragging)
        }
        function Ze() {
            return (se.isGesturing = !1) || H(se)
        }
        function $e(e) {
            if (!Qe(e)) {
                var t = ue()
                  , r = fe();
                Te((t - de) * U, (r - pe) * U, 1),
                de = t,
                pe = r,
                l && te.restart(!0)
            }
        }
        function _e(e) {
            if (!Qe(e)) {
                e = L(e, s),
                V && (oe = !0);
                var t = (1 === e.deltaMode ? r : 2 === e.deltaMode ? Ae.innerHeight : 1) * f;
                Te(e.deltaX * t, e.deltaY * t, 0),
                l && !F && te.restart(!0)
            }
        }
        function af(e) {
            if (!Qe(e)) {
                var t = e.clientX
                  , r = e.clientY
                  , n = t - se.x
                  , o = r - se.y;
                se.x = t,
                se.y = r,
                ne = !0,
                (n || o) && Ue(n, o)
            }
        }
        function bf(e) {
            se.event = e,
            C(se)
        }
        function cf(e) {
            se.event = e,
            D(se)
        }
        function df(e) {
            return Qe(e) || L(e, s) && q(se)
        }
        this.target = n = I(n) || Me,
        this.vars = e,
        u = u && we.utils.toArray(u),
        o = o || 1e-9,
        a = a || 0,
        f = f || 1,
        U = U || 1,
        t = t || "wheel,touch,pointer",
        i = !1 !== i,
        r = r || parseFloat(Ae.getComputedStyle(Ce).lineHeight) || 22;
        var ee, te, re, ne, oe, ie, ae, se = this, le = 0, ce = 0, ue = J(n, Je), fe = J(n, Ne), de = ue(), pe = fe(), ge = ~t.indexOf("touch") && !~t.indexOf("pointer") && "pointerdown" === Be[0], he = z(n), ve = n.ownerDocument || Ee, be = [0, 0, 0], me = [0, 0, 0], ye = 0, xe = se.onPress = function(e) {
            Qe(e, 1) || (se.axis = ae = null,
            te.pause(),
            se.isPressed = !0,
            e = L(e),
            le = ce = 0,
            se.startX = se.x = e.clientX,
            se.startY = se.y = e.clientY,
            se._vx.reset(),
            se._vy.reset(),
            A(F ? n : ve, Be[1], Ve, s, !0),
            se.deltaX = se.deltaY = 0,
            v && v(se))
        }
        ;
        te = se._dc = we.delayedCall(c || .25, function onStopFunc() {
            se._vx.reset(),
            se._vy.reset(),
            te.pause(),
            l && l(se)
        }).pause(),
        se.deltaX = se.deltaY = 0,
        se._vx = K(0, 50, !0),
        se._vy = K(0, 50, !0),
        se.scrollX = ue,
        se.scrollY = fe,
        se.isDragging = se.isGesturing = se.isPressed = !1,
        se.enable = function(e) {
            return se.isEnabled || (A(he ? ve : n, "scroll", E),
            0 <= t.indexOf("scroll") && A(he ? ve : n, "scroll", $e, s, G),
            0 <= t.indexOf("wheel") && A(n, "wheel", _e, s, G),
            (0 <= t.indexOf("touch") && Oe || 0 <= t.indexOf("pointer")) && (A(n, Be[0], xe, s, G),
            A(ve, Be[2], Xe),
            A(ve, Be[3], Xe),
            $ && A(n, "click", Pe, !1, !0),
            q && A(n, "click", df),
            Y && A(ve, "gesturestart", Ye),
            H && A(ve, "gestureend", Ze),
            C && A(n, De + "enter", bf),
            D && A(n, De + "leave", cf),
            R && A(n, De + "move", af)),
            se.isEnabled = !0,
            e && e.type && xe(e),
            W && W(se)),
            se
        }
        ,
        se.disable = function() {
            se.isEnabled && (Re.filter(function(e) {
                return e !== se && z(e.target)
            }).length || B(he ? ve : n, "scroll", E),
            se.isPressed && (se._vx.reset(),
            se._vy.reset(),
            B(F ? n : ve, Be[1], Ve, !0)),
            B(he ? ve : n, "scroll", $e, G),
            B(n, "wheel", _e, G),
            B(n, Be[0], xe, G),
            B(ve, Be[2], Xe),
            B(ve, Be[3], Xe),
            B(n, "click", Pe, !0),
            B(n, "click", df),
            B(ve, "gesturestart", Ye),
            B(ve, "gestureend", Ze),
            B(n, De + "enter", bf),
            B(n, De + "leave", cf),
            B(n, De + "move", af),
            se.isEnabled = se.isPressed = se.isDragging = !1,
            j && j(se))
        }
        ,
        se.kill = function() {
            se.disable();
            var e = Re.indexOf(se);
            0 <= e && Re.splice(e, 1),
            ze === se && (ze = 0)
        }
        ,
        Re.push(se),
        F && z(n) && (ze = se),
        se.enable(d)
    }
    ,
    function _createClass(e, t, r) {
        return t && _defineProperties(e.prototype, t),
        r && _defineProperties(e, r),
        e
    }(Observer, [{
        key: "velocityX",
        get: function get() {
            return this._vx.getVelocity()
        }
    }, {
        key: "velocityY",
        get: function get() {
            return this._vy.getVelocity()
        }
    }]),
    Observer);
    function Observer(e) {
        this.init(e)
    }
    k.version = "3.11.3",
    k.create = function(e) {
        return new k(e)
    }
    ,
    k.register = O,
    k.getAll = function() {
        return Re.slice()
    }
    ,
    k.getById = function(t) {
        return Re.filter(function(e) {
            return e.vars.id === t
        })[0]
    }
    ,
    q() && we.registerPlugin(k);
    function xa() {
        return ot = 1
    }
    function ya() {
        return ot = 0
    }
    function za(e) {
        return e
    }
    function Aa(e) {
        return Math.round(1e5 * e) / 1e5 || 0
    }
    function Ba() {
        return "undefined" != typeof window
    }
    function Ca() {
        return Ke || Ba() && (Ke = window.gsap) && Ke.registerPlugin && Ke
    }
    function Da(e) {
        return !!~s.indexOf(e)
    }
    function Ea(e) {
        return y(e, "getBoundingClientRect") || (Da(e) ? function() {
            return Xt.width = We.innerWidth,
            Xt.height = We.innerHeight,
            Xt
        }
        : function() {
            return Mt(e)
        }
        )
    }
    function Ha(e, t) {
        var r = t.s
          , n = t.d2
          , o = t.d
          , i = t.a;
        return (r = "scroll" + n) && (i = y(e, r)) ? i() - Ea(e)()[o] : Da(e) ? (qe[r] || Ge[r]) - (We["inner" + n] || qe["client" + n] || Ge["client" + n]) : e[r] - e["offset" + n]
    }
    function Ia(e, t) {
        for (var r = 0; r < p.length; r += 3)
            t && !~t.indexOf(p[r + 1]) || e(p[r], p[r + 1], p[r + 2])
    }
    function Ja(e) {
        return "string" == typeof e
    }
    function Ka(e) {
        return "function" == typeof e
    }
    function La(e) {
        return "number" == typeof e
    }
    function Ma(e) {
        return "object" == typeof e
    }
    function Na(e, t, r) {
        return e && e.progress(t ? 0 : 1) && r && e.pause()
    }
    function Oa(e, t) {
        if (e.enabled) {
            var r = t(e);
            r && r.totalTime && (e.callbackAnimation = r)
        }
    }
    function db(e) {
        return We.getComputedStyle(e)
    }
    function fb(e, t) {
        for (var r in t)
            r in e || (e[r] = t[r]);
        return e
    }
    function hb(e, t) {
        var r = t.d2;
        return e["offset" + r] || e["client" + r] || 0
    }
    function ib(e) {
        var t, r = [], n = e.labels, o = e.duration();
        for (t in n)
            r.push(n[t] / o);
        return r
    }
    function kb(o) {
        var i = Ke.utils.snap(o)
          , a = Array.isArray(o) && o.slice(0).sort(function(e, t) {
            return e - t
        });
        return a ? function(e, t, r) {
            var n;
            if (void 0 === r && (r = .001),
            !t)
                return i(e);
            if (0 < t) {
                for (e -= r,
                n = 0; n < a.length; n++)
                    if (a[n] >= e)
                        return a[n];
                return a[n - 1]
            }
            for (n = a.length,
            e += r; n--; )
                if (a[n] <= e)
                    return a[n];
            return a[0]
        }
        : function(e, t, r) {
            void 0 === r && (r = .001);
            var n = i(e);
            return !t || Math.abs(n - e) < r || n - e < 0 == t < 0 ? n : i(t < 0 ? e - o : e + o)
        }
    }
    function mb(t, r, e, n) {
        return e.split(",").forEach(function(e) {
            return t(r, e, n)
        })
    }
    function nb(e, t, r, n, o) {
        return e.addEventListener(t, r, {
            passive: !n,
            capture: !!o
        })
    }
    function ob(e, t, r, n) {
        return e.removeEventListener(t, r, !!n)
    }
    function pb(e, t, r) {
        return r && r.wheelHandler && e(t, "wheel", r)
    }
    function tb(e, t) {
        if (Ja(e)) {
            var r = e.indexOf("=")
              , n = ~r ? (e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
            ~r && (e.indexOf("%") > r && (n *= t / 100),
            e = e.substr(0, r - 1)),
            e = n + (e in D ? D[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0)
        }
        return e
    }
    function ub(e, t, r, n, o, i, a, s) {
        var l = o.startColor
          , c = o.endColor
          , u = o.fontSize
          , f = o.indent
          , d = o.fontWeight
          , p = je.createElement("div")
          , g = Da(r) || "fixed" === y(r, "pinType")
          , h = -1 !== e.indexOf("scroller")
          , v = g ? Ge : r
          , b = -1 !== e.indexOf("start")
          , m = b ? l : c
          , x = "border-color:" + m + ";font-size:" + u + ";color:" + m + ";font-weight:" + d + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return x += "position:" + ((h || s) && g ? "fixed;" : "absolute;"),
        !h && !s && g || (x += (n === Ne ? _ : T) + ":" + (i + parseFloat(f)) + "px;"),
        a && (x += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"),
        p._isStart = b,
        p.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")),
        p.style.cssText = x,
        p.innerText = t || 0 === t ? e + "-" + t : e,
        v.children[0] ? v.insertBefore(p, v.children[0]) : v.appendChild(p),
        p._offset = p["offset" + n.op.d2],
        R(p, 0, n, b),
        p
    }
    function zb() {
        return 34 < gt() - ht && (S = S || requestAnimationFrame(j))
    }
    function Ab() {
        h && h.isPressed && !(h.startX > Ge.clientWidth) || (Le.cache++,
        h ? S = S || requestAnimationFrame(j) : j(),
        ht || H("scrollStart"),
        ht = gt())
    }
    function Bb() {
        m = We.innerWidth,
        b = We.innerHeight
    }
    function Cb() {
        Le.cache++,
        nt || g || je.fullscreenElement || je.webkitFullscreenElement || v && m === We.innerWidth && !(Math.abs(We.innerHeight - b) > .25 * We.innerHeight) || l.restart(!0)
    }
    function Fb() {
        return ob(Z, "scrollEnd", Fb) || zt(!0)
    }
    function Ib(e) {
        for (var t = 0; t < V.length; t += 5)
            (!e || V[t + 4] && V[t + 4].query === e) && (V[t].style.cssText = V[t + 1],
            V[t].getBBox && V[t].setAttribute("transform", V[t + 2] || ""),
            V[t + 3].uncache = 1)
    }
    function Jb(e, t) {
        var r;
        for (it = 0; it < Ot.length; it++)
            !(r = Ot[it]) || t && r._ctx !== t || (e ? r.kill(1) : r.revert(!0, !0));
        t && Ib(t),
        t || H("revert")
    }
    function Kb(e, t) {
        Le.cache++,
        !t && ut || Le.forEach(function(e) {
            return Ka(e) && e.cacheID++ && (e.rec = 0)
        }),
        Ja(e) && (We.history.scrollRestoration = x = e)
    }
    function Xb(e, t, r, n) {
        if (!e._gsap.swappedIn) {
            for (var o, i = U.length, a = t.style, s = e.style; i--; )
                a[o = U[i]] = r[o];
            a.position = "absolute" === r.position ? "absolute" : "relative",
            "inline" === r.display && (a.display = "inline-block"),
            s[T] = s[_] = "auto",
            a.flexBasis = r.flexBasis || "auto",
            a.overflow = "visible",
            a.boxSizing = "border-box",
            a[mt] = hb(e, Je) + Et,
            a[yt] = hb(e, Ne) + Et,
            a[Tt] = s[kt] = s.top = s.left = "0",
            Rt(n),
            s[mt] = s.maxWidth = r[mt],
            s[yt] = s.maxHeight = r[yt],
            s[Tt] = r[Tt],
            e.parentNode !== t && (e.parentNode.insertBefore(t, e),
            t.appendChild(e)),
            e._gsap.swappedIn = !0
        }
    }
    function $b(e) {
        for (var t = G.length, r = e.style, n = [], o = 0; o < t; o++)
            n.push(G[o], r[G[o]]);
        return n.t = e,
        n
    }
    function bc(e, t, r, n, o, i, a, s, l, c, u, f, d) {
        Ka(e) && (e = e(s)),
        Ja(e) && "max" === e.substr(0, 3) && (e = f + ("=" === e.charAt(4) ? tb("0" + e.substr(3), r) : 0));
        var p, g, h, v = d ? d.time() : 0;
        if (d && d.seek(0),
        La(e))
            a && R(a, r, n, !0);
        else {
            Ka(t) && (t = t(s));
            var b, m, y, x, S = (e || "0").split(" ");
            h = I(t) || Ge,
            (b = Mt(h) || {}) && (b.left || b.top) || "none" !== db(h).display || (x = h.style.display,
            h.style.display = "block",
            b = Mt(h),
            x ? h.style.display = x : h.style.removeProperty("display")),
            m = tb(S[0], b[n.d]),
            y = tb(S[1] || "0", r),
            e = b[n.p] - l[n.p] - c + m + o - y,
            a && R(a, y, n, r - y < 20 || a._isStart && 20 < y),
            r -= r - y
        }
        if (i) {
            var w = e + r
              , _ = i._isStart;
            p = "scroll" + n.d2,
            R(i, w, n, _ && 20 < w || !_ && (u ? Math.max(Ge[p], qe[p]) : i.parentNode[p]) <= w + 1),
            u && (l = Mt(a),
            u && (i.style[n.op.p] = l[n.op.p] - n.op.m - i._offset + Et))
        }
        return d && h && (p = Mt(h),
        d.seek(f),
        g = Mt(h),
        d._caScrollDist = p[n.p] - g[n.p],
        e = e / d._caScrollDist * f),
        d && d.seek(v),
        d ? e : Math.round(e)
    }
    function dc(e, t, r, n) {
        if (e.parentNode !== t) {
            var o, i, a = e.style;
            if (t === Ge) {
                for (o in e._stOrig = a.cssText,
                i = db(e))
                    +o || Q.test(o) || !i[o] || "string" != typeof a[o] || "0" === o || (a[o] = i[o]);
                a.top = r,
                a.left = n
            } else
                a.cssText = e._stOrig;
            Ke.core.getCache(e).uncache = 1,
            t.appendChild(e)
        }
    }
    function ec(l, e) {
        function Sj(e, t, r, n, o) {
            var i = Sj.tween
              , a = t.onComplete
              , s = {};
            return r = r || f(),
            o = n && o || 0,
            n = n || e - r,
            i && i.kill(),
            c = Math.round(r),
            t[d] = e,
            (t.modifiers = s)[d] = function(e) {
                return (e = Math.round(f())) !== c && e !== u && 3 < Math.abs(e - c) && 3 < Math.abs(e - u) ? (i.kill(),
                Sj.tween = 0) : e = r + n * i.ratio + o * i.ratio * i.ratio,
                u = c,
                c = Math.round(e)
            }
            ,
            t.onComplete = function() {
                Sj.tween = 0,
                a && a.call(i)
            }
            ,
            i = Sj.tween = Ke.to(l, t)
        }
        var c, u, f = J(l, e), d = "_scroll" + e.p2;
        return (l[d] = f).wheelHandler = function() {
            return Sj.tween && Sj.tween.kill() && (Sj.tween = 0)
        }
        ,
        nb(l, "wheel", f.wheelHandler),
        Sj
    }
    var Ke, a, We, je, qe, Ge, s, l, et, tt, rt, c, nt, ot, u, it, f, d, p, at, st, g, h, v, b, m, P, lt, x, ct, S, ut, ft, dt, pt = 1, gt = Date.now, w = gt(), ht = 0, vt = 0, bt = Math.abs, _ = "right", T = "bottom", mt = "width", yt = "height", xt = "Right", St = "Left", wt = "Top", _t = "Bottom", Tt = "padding", kt = "margin", At = "Width", C = "Height", Et = "px", Mt = function _getBounds(e, t) {
        var r = t && "matrix(1, 0, 0, 1, 0, 0)" !== db(e)[u] && Ke.to(e, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0
        }).progress(1)
          , n = e.getBoundingClientRect();
        return r && r.progress(0).kill(),
        n
    }, Pt = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal"
    }, Ct = {
        toggleActions: "play",
        anticipatePin: 0
    }, D = {
        top: 0,
        left: 0,
        center: .5,
        bottom: 1,
        right: 1
    }, R = function _positionMarker(e, t, r, n) {
        var o = {
            display: "block"
        }
          , i = r[n ? "os2" : "p2"]
          , a = r[n ? "p2" : "os2"];
        e._isFlipped = n,
        o[r.a + "Percent"] = n ? -100 : 0,
        o[r.a] = n ? "1px" : 0,
        o["border" + i + At] = 1,
        o["border" + a + At] = 0,
        o[r.p] = t + "px",
        Ke.set(e, o)
    }, Ot = [], Dt = {}, X = {}, Y = [], H = function _dispatch(e) {
        return X[e] && X[e].map(function(e) {
            return e()
        }) || Y
    }, V = [], It = 0, zt = function _refreshAll(e, t) {
        if (!ht || e) {
            ut = Z.isRefreshing = !0,
            Le.forEach(function(e) {
                return Ka(e) && e.cacheID++ && (e.rec = e())
            });
            var r = H("refreshInit");
            at && Z.sort(),
            t || Jb(),
            Le.forEach(function(e) {
                Ka(e) && (e.smooth && (e.target.style.scrollBehavior = "auto"),
                e(0))
            }),
            Ot.slice(0).forEach(function(e) {
                return e.refresh()
            }),
            Ot.forEach(function(e, t) {
                if (e._subPinOffset && e.pin) {
                    var r = e.vars.horizontal ? "offsetWidth" : "offsetHeight"
                      , n = e.pin[r];
                    e.revert(!0, 1),
                    e.adjustPinSpacing(e.pin[r] - n),
                    e.revert(!1, 1)
                }
            }),
            Ot.forEach(function(e) {
                return "max" === e.vars.end && e.setPositions(e.start, Math.max(e.start + 1, Ha(e.scroller, e._dir)))
            }),
            r.forEach(function(e) {
                return e && e.render && e.render(-1)
            }),
            Le.forEach(function(e) {
                Ka(e) && (e.smooth && requestAnimationFrame(function() {
                    return e.target.style.scrollBehavior = "smooth"
                }),
                e.rec && e(e.rec))
            }),
            Kb(x, 1),
            l.pause(),
            It++,
            j(2),
            Ot.forEach(function(e) {
                return Ka(e.vars.onRefresh) && e.vars.onRefresh(e)
            }),
            ut = Z.isRefreshing = !1,
            H("refresh")
        } else
            nb(Z, "scrollEnd", Fb)
    }, W = 0, Bt = 1, j = function _updateAll(e) {
        if (!ut || 2 === e) {
            Z.isUpdating = !0,
            dt && dt.update(0);
            var t = Ot.length
              , r = gt()
              , n = 50 <= r - w
              , o = t && Ot[0].scroll();
            if (Bt = o < W ? -1 : 1,
            W = o,
            n && (ht && !ot && 200 < r - ht && (ht = 0,
            H("scrollEnd")),
            rt = w,
            w = r),
            Bt < 0) {
                for (it = t; 0 < it--; )
                    Ot[it] && Ot[it].update(0, n);
                Bt = 1
            } else
                for (it = 0; it < t; it++)
                    Ot[it] && Ot[it].update(0, n);
            Z.isUpdating = !1
        }
        S = 0
    }, U = ["left", "top", T, _, kt + _t, kt + xt, kt + wt, kt + St, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], G = U.concat([mt, yt, "boxSizing", "max" + At, "max" + C, "position", kt, Tt, Tt + wt, Tt + xt, Tt + _t, Tt + St]), $ = /([A-Z])/g, Rt = function _setState(e) {
        if (e) {
            var t, r, n = e.t.style, o = e.length, i = 0;
            for ((e.t._gsap || Ke.core.getCache(e.t)).uncache = 1; i < o; i += 2)
                r = e[i + 1],
                t = e[i],
                r ? n[t] = r : n[t] && n.removeProperty(t.replace($, "-$1").toLowerCase())
        }
    }, Xt = {
        left: 0,
        top: 0
    }, Q = /(webkit|moz|length|cssText|inset)/i, Z = (ScrollTrigger.prototype.init = function init(_, T) {
        if (this.progress = this.start = 0,
        this.vars && this.kill(!0, !0),
        vt) {
            var k, n, p, A, E, M, P, C, O, D, z, e, B, R, X, L, F, t, Y, b, H, N, m, K, x, S, r, w, V, W, o, g, j, q, U, G, $, i, Q = (_ = fb(Ja(_) || La(_) || _.nodeType ? {
                trigger: _
            } : _, Ct)).onUpdate, Z = _.toggleClass, a = _.id, ee = _.onToggle, te = _.onRefresh, re = _.scrub, ne = _.trigger, oe = _.pin, ie = _.pinSpacing, ae = _.invalidateOnRefresh, se = _.anticipatePin, s = _.onScrubComplete, h = _.onSnapComplete, le = _.once, ce = _.snap, ue = _.pinReparent, l = _.pinSpacer, fe = _.containerAnimation, de = _.fastScrollEnd, pe = _.preventOverlaps, ge = _.horizontal || _.containerAnimation && !1 !== _.horizontal ? Je : Ne, he = !re && 0 !== re, ve = I(_.scroller || We), c = Ke.core.getCache(ve), be = Da(ve), me = "fixed" === ("pinType"in _ ? _.pinType : y(ve, "pinType") || be && "fixed"), ye = [_.onEnter, _.onLeave, _.onEnterBack, _.onLeaveBack], xe = he && _.toggleActions.split(" "), u = "markers"in _ ? _.markers : Ct.markers, Se = be ? 0 : parseFloat(db(ve)["border" + ge.p2 + At]) || 0, we = this, _e = _.onRefreshInit && function() {
                return _.onRefreshInit(we)
            }
            , Te = function _getSizeFunc(e, t, r) {
                var n = r.d
                  , o = r.d2
                  , i = r.a;
                return (i = y(e, "getBoundingClientRect")) ? function() {
                    return i()[n]
                }
                : function() {
                    return (t ? We["inner" + o] : e["client" + o]) || 0
                }
            }(ve, be, ge), ke = function _getOffsetsFunc(e, t) {
                return !t || ~Fe.indexOf(e) ? Ea(e) : function() {
                    return Xt
                }
            }(ve, be), Ae = 0, Ee = 0, Me = J(ve, ge);
            if (lt(we),
            we._dir = ge,
            se *= 45,
            we.scroller = ve,
            we.scroll = fe ? fe.time.bind(fe) : Me,
            A = Me(),
            we.vars = _,
            T = T || _.animation,
            "refreshPriority"in _ && (at = 1,
            -9999 === _.refreshPriority && (dt = we)),
            c.tweenScroll = c.tweenScroll || {
                top: ec(ve, Ne),
                left: ec(ve, Je)
            },
            we.tweenTo = k = c.tweenScroll[ge.p],
            we.scrubDuration = function(e) {
                (o = La(e) && e) ? W ? W.duration(e) : W = Ke.to(T, {
                    ease: "expo",
                    totalProgress: "+=0.001",
                    duration: o,
                    paused: !0,
                    onComplete: function onComplete() {
                        return s && s(we)
                    }
                }) : (W && W.progress(1).kill(),
                W = 0)
            }
            ,
            T && (T.vars.lazy = !1,
            T._initted || !1 !== T.vars.immediateRender && !1 !== _.immediateRender && T.duration() && T.render(0, !0, !0),
            we.animation = T.pause(),
            (T.scrollTrigger = we).scrubDuration(re),
            w = 0,
            a = a || T.vars.id),
            Ot.push(we),
            ce && (Ma(ce) && !ce.push || (ce = {
                snapTo: ce
            }),
            "scrollBehavior"in Ge.style && Ke.set(be ? [Ge, qe] : ve, {
                scrollBehavior: "auto"
            }),
            Le.forEach(function(e) {
                return Ka(e) && e.target === (be ? je.scrollingElement || qe : ve) && (e.smooth = !1)
            }),
            p = Ka(ce.snapTo) ? ce.snapTo : "labels" === ce.snapTo ? function _getClosestLabel(t) {
                return function(e) {
                    return Ke.utils.snap(ib(t), e)
                }
            }(T) : "labelsDirectional" === ce.snapTo ? function _getLabelAtDirection(r) {
                return function(e, t) {
                    return kb(ib(r))(e, t.direction)
                }
            }(T) : !1 !== ce.directional ? function(e, t) {
                return kb(ce.snapTo)(e, gt() - Ee < 500 ? 0 : t.direction)
            }
            : Ke.utils.snap(ce.snapTo),
            g = ce.duration || {
                min: .1,
                max: 2
            },
            g = Ma(g) ? tt(g.min, g.max) : tt(g, g),
            j = Ke.delayedCall(ce.delay || o / 2 || .1, function() {
                var e = Me()
                  , t = gt() - Ee < 500
                  , r = k.tween;
                if (!(t || Math.abs(we.getVelocity()) < 10) || r || ot || Ae === e)
                    we.isActive && Ae !== e && j.restart(!0);
                else {
                    var n = (e - M) / B
                      , o = T && !he ? T.totalProgress() : n
                      , i = t ? 0 : (o - V) / (gt() - rt) * 1e3 || 0
                      , a = Ke.utils.clamp(-n, 1 - n, bt(i / 2) * i / .185)
                      , s = n + (!1 === ce.inertia ? 0 : a)
                      , l = tt(0, 1, p(s, we))
                      , c = Math.round(M + l * B)
                      , u = ce.onStart
                      , f = ce.onInterrupt
                      , d = ce.onComplete;
                    if (e <= P && M <= e && c !== e) {
                        if (r && !r._initted && r.data <= bt(c - e))
                            return;
                        !1 === ce.inertia && (a = l - n),
                        k(c, {
                            duration: g(bt(.185 * Math.max(bt(s - o), bt(l - o)) / i / .05 || 0)),
                            ease: ce.ease || "power3",
                            data: bt(c - e),
                            onInterrupt: function onInterrupt() {
                                return j.restart(!0) && f && f(we)
                            },
                            onComplete: function onComplete() {
                                we.update(),
                                Ae = Me(),
                                w = V = T && !he ? T.totalProgress() : we.progress,
                                h && h(we),
                                d && d(we)
                            }
                        }, e, a * B, c - e - a * B),
                        u && u(we, k.tween)
                    }
                }
            }).pause()),
            a && (Dt[a] = we),
            i = (i = (ne = we.trigger = I(ne || oe)) && ne._gsap && ne._gsap.stRevert) && i(we),
            oe = !0 === oe ? ne : I(oe),
            Ja(Z) && (Z = {
                targets: ne,
                className: Z
            }),
            oe && (!1 === ie || ie === kt || (ie = !(!ie && oe.parentNode && oe.parentNode.style && "flex" === db(oe.parentNode).display) && Tt),
            we.pin = oe,
            (n = Ke.core.getCache(oe)).spacer ? R = n.pinState : (l && ((l = I(l)) && !l.nodeType && (l = l.current || l.nativeElement),
            n.spacerIsNative = !!l,
            l && (n.spacerState = $b(l))),
            n.spacer = F = l || je.createElement("div"),
            F.classList.add("pin-spacer"),
            a && F.classList.add("pin-spacer-" + a),
            n.pinState = R = $b(oe)),
            !1 !== _.force3D && Ke.set(oe, {
                force3D: !0
            }),
            we.spacer = F = n.spacer,
            r = db(oe),
            m = r[ie + ge.os2],
            Y = Ke.getProperty(oe),
            b = Ke.quickSetter(oe, ge.a, Et),
            Xb(oe, F, r),
            L = $b(oe)),
            u) {
                e = Ma(u) ? fb(u, Pt) : Pt,
                D = ub("scroller-start", a, ve, ge, e, 0),
                z = ub("scroller-end", a, ve, ge, e, 0, D),
                t = D["offset" + ge.op.d2];
                var f = I(y(ve, "content") || ve);
                C = this.markerStart = ub("start", a, f, ge, e, t, 0, fe),
                O = this.markerEnd = ub("end", a, f, ge, e, t, 0, fe),
                fe && ($ = Ke.quickSetter([C, O], ge.a, Et)),
                me || Fe.length && !0 === y(ve, "fixedMarkers") || (function _makePositionable(e) {
                    var t = db(e).position;
                    e.style.position = "absolute" === t || "fixed" === t ? t : "relative"
                }(be ? Ge : ve),
                Ke.set([D, z], {
                    force3D: !0
                }),
                x = Ke.quickSetter(D, ge.a, Et),
                S = Ke.quickSetter(z, ge.a, Et))
            }
            if (fe) {
                var d = fe.vars.onUpdate
                  , v = fe.vars.onUpdateParams;
                fe.eventCallback("onUpdate", function() {
                    we.update(0, 0, 1),
                    d && d.apply(v || [])
                })
            }
            we.previous = function() {
                return Ot[Ot.indexOf(we) - 1]
            }
            ,
            we.next = function() {
                return Ot[Ot.indexOf(we) + 1]
            }
            ,
            we.revert = function(e, t) {
                if (!t)
                    return we.kill(!0);
                var r = !1 !== e || !we.enabled
                  , n = nt;
                r !== we.isReverted && (r && (U = Math.max(Me(), we.scroll.rec || 0),
                q = we.progress,
                G = T && T.progress()),
                C && [C, O, D, z].forEach(function(e) {
                    return e.style.display = r ? "none" : "block"
                }),
                r && (nt = 1,
                we.update(r)),
                oe && (r ? function _swapPinOut(e, t, r) {
                    Rt(r);
                    var n = e._gsap;
                    if (n.spacerIsNative)
                        Rt(n.spacerState);
                    else if (e._gsap.swappedIn) {
                        var o = t.parentNode;
                        o && (o.insertBefore(e, t),
                        o.removeChild(t))
                    }
                    e._gsap.swappedIn = !1
                }(oe, F, R) : ue && we.isActive || Xb(oe, F, db(oe), K)),
                r || we.update(r),
                nt = n,
                we.isReverted = r)
            }
            ,
            we.refresh = function(e, t) {
                if (!nt && we.enabled || t)
                    if (oe && e && ht)
                        nb(ScrollTrigger, "scrollEnd", Fb);
                    else {
                        !ut && _e && _e(we),
                        nt = 1,
                        Ee = gt(),
                        k.tween && (k.tween.kill(),
                        k.tween = 0),
                        W && W.pause(),
                        ae && T && T.revert({
                            kill: !1
                        }).invalidate(),
                        we.isReverted || we.revert(!0, !0),
                        we._subPinOffset = !1;
                        for (var r, n, o, i, a, s, l, c, u, f, d = Te(), p = ke(), g = fe ? fe.duration() : Ha(ve, ge), h = 0, v = 0, b = _.end, m = _.endTrigger || ne, y = _.start || (0 !== _.start && ne ? oe ? "0 0" : "0 100%" : 0), x = we.pinnedContainer = _.pinnedContainer && I(_.pinnedContainer), S = ne && Math.max(0, Ot.indexOf(we)) || 0, w = S; w--; )
                            (s = Ot[w]).end || s.refresh(0, 1) || (nt = 1),
                            !(l = s.pin) || l !== ne && l !== oe || s.isReverted || ((f = f || []).unshift(s),
                            s.revert(!0, !0)),
                            s !== Ot[w] && (S--,
                            w--);
                        for (Ka(y) && (y = y(we)),
                        M = bc(y, ne, d, ge, Me(), C, D, we, p, Se, me, g, fe) || (oe ? -.001 : 0),
                        Ka(b) && (b = b(we)),
                        Ja(b) && !b.indexOf("+=") && (~b.indexOf(" ") ? b = (Ja(y) ? y.split(" ")[0] : "") + b : (h = tb(b.substr(2), d),
                        b = Ja(y) ? y : M + h,
                        m = ne)),
                        P = Math.max(M, bc(b || (m ? "100% 0" : g), m, d, ge, Me() + h, O, z, we, p, Se, me, g, fe)) || -.001,
                        B = P - M || (M -= .01) && .001,
                        h = 0,
                        w = S; w--; )
                            (l = (s = Ot[w]).pin) && s.start - s._pinPush <= M && !fe && 0 < s.end && (r = s.end - s.start,
                            (l === ne && s.start - s._pinPush < M || l === x) && !La(y) && (h += r * (1 - s.progress)),
                            l === oe && (v += r));
                        if (M += h,
                        P += h,
                        we._pinPush = v,
                        C && h && ((r = {})[ge.a] = "+=" + h,
                        x && (r[ge.p] = "-=" + Me()),
                        Ke.set([C, O], r)),
                        oe)
                            r = db(oe),
                            i = ge === Ne,
                            o = Me(),
                            H = parseFloat(Y(ge.a)) + v,
                            !g && 1 < P && ((be ? Ge : ve).style["overflow-" + ge.a] = "scroll"),
                            Xb(oe, F, r),
                            L = $b(oe),
                            n = Mt(oe, !0),
                            c = me && J(ve, i ? Je : Ne)(),
                            ie && ((K = [ie + ge.os2, B + v + Et]).t = F,
                            (w = ie === Tt ? hb(oe, ge) + B + v : 0) && K.push(ge.d, w + Et),
                            Rt(K),
                            x && Ot.forEach(function(e) {
                                e.pin === x && !1 !== e.vars.pinSpacing && (e._subPinOffset = !0)
                            }),
                            me && Me(U)),
                            me && ((a = {
                                top: n.top + (i ? o - M : c) + Et,
                                left: n.left + (i ? c : o - M) + Et,
                                boxSizing: "border-box",
                                position: "fixed"
                            })[mt] = a.maxWidth = Math.ceil(n.width) + Et,
                            a[yt] = a.maxHeight = Math.ceil(n.height) + Et,
                            a[kt] = a[kt + wt] = a[kt + xt] = a[kt + _t] = a[kt + St] = "0",
                            a[Tt] = r[Tt],
                            a[Tt + wt] = r[Tt + wt],
                            a[Tt + xt] = r[Tt + xt],
                            a[Tt + _t] = r[Tt + _t],
                            a[Tt + St] = r[Tt + St],
                            X = function _copyState(e, t, r) {
                                for (var n, o = [], i = e.length, a = r ? 8 : 0; a < i; a += 2)
                                    n = e[a],
                                    o.push(n, n in t ? t[n] : e[a + 1]);
                                return o.t = e.t,
                                o
                            }(R, a, ue),
                            ut && Me(0)),
                            T ? (u = T._initted,
                            st(1),
                            T.render(T.duration(), !0, !0),
                            N = Y(ge.a) - H + B + v,
                            B !== N && me && X.splice(X.length - 2, 2),
                            T.render(0, !0, !0),
                            u || T.invalidate(!0),
                            T.parent || T.totalTime(T.totalTime()),
                            st(0)) : N = B;
                        else if (ne && Me() && !fe)
                            for (n = ne.parentNode; n && n !== Ge; )
                                n._pinOffset && (M -= n._pinOffset,
                                P -= n._pinOffset),
                                n = n.parentNode;
                        f && f.forEach(function(e) {
                            return e.revert(!1, !0)
                        }),
                        we.start = M,
                        we.end = P,
                        A = E = ut ? U : Me(),
                        fe || ut || (A < U && Me(U),
                        we.scroll.rec = 0),
                        we.revert(!1, !0),
                        j && (Ae = -1,
                        we.isActive && Me(M + B * q),
                        j.restart(!0)),
                        nt = 0,
                        T && he && (T._initted || G) && T.progress() !== G && T.progress(G, !0).render(T.time(), !0, !0),
                        q === we.progress && !fe || (T && !he && T.totalProgress(q, !0),
                        we.progress = (A - M) / B === q ? 0 : q),
                        oe && ie && (F._pinOffset = Math.round(we.progress * N)),
                        te && !ut && te(we)
                    }
            }
            ,
            we.getVelocity = function() {
                return (Me() - E) / (gt() - rt) * 1e3 || 0
            }
            ,
            we.endAnimation = function() {
                Na(we.callbackAnimation),
                T && (W ? W.progress(1) : T.paused() ? he || Na(T, we.direction < 0, 1) : Na(T, T.reversed()))
            }
            ,
            we.labelToScroll = function(e) {
                return T && T.labels && (M || we.refresh() || M) + T.labels[e] / T.duration() * B || 0
            }
            ,
            we.getTrailing = function(t) {
                var e = Ot.indexOf(we)
                  , r = 0 < we.direction ? Ot.slice(0, e).reverse() : Ot.slice(e + 1);
                return (Ja(t) ? r.filter(function(e) {
                    return e.vars.preventOverlaps === t
                }) : r).filter(function(e) {
                    return 0 < we.direction ? e.end <= M : e.start >= P
                })
            }
            ,
            we.update = function(e, t, r) {
                if (!fe || r || e) {
                    var n, o, i, a, s, l, c, u = ut ? U : we.scroll(), f = e ? 0 : (u - M) / B, d = f < 0 ? 0 : 1 < f ? 1 : f || 0, p = we.progress;
                    if (t && (E = A,
                    A = fe ? Me() : u,
                    ce && (V = w,
                    w = T && !he ? T.totalProgress() : d)),
                    se && !d && oe && !nt && !pt && ht && M < u + (u - E) / (gt() - rt) * se && (d = 1e-4),
                    d !== p && we.enabled) {
                        if (a = (s = (n = we.isActive = !!d && d < 1) != (!!p && p < 1)) || !!d != !!p,
                        we.direction = p < d ? 1 : -1,
                        we.progress = d,
                        a && !nt && (o = d && !p ? 0 : 1 === d ? 1 : 1 === p ? 2 : 3,
                        he && (i = !s && "none" !== xe[o + 1] && xe[o + 1] || xe[o],
                        c = T && ("complete" === i || "reset" === i || i in T))),
                        pe && (s || c) && (c || re || !T) && (Ka(pe) ? pe(we) : we.getTrailing(pe).forEach(function(e) {
                            return e.endAnimation()
                        })),
                        he || (!W || nt || pt ? T && T.totalProgress(d, !!nt) : ((fe || dt && dt !== we) && W.render(W._dp._time - W._start),
                        W.resetTo ? W.resetTo("totalProgress", d, T._tTime / T._tDur) : (W.vars.totalProgress = d,
                        W.invalidate().restart()))),
                        oe)
                            if (e && ie && (F.style[ie + ge.os2] = m),
                            me) {
                                if (a) {
                                    if (l = !e && p < d && u < P + 1 && u + 1 >= Ha(ve, ge),
                                    ue)
                                        if (e || !n && !l)
                                            dc(oe, F);
                                        else {
                                            var g = Mt(oe, !0)
                                              , h = u - M;
                                            dc(oe, Ge, g.top + (ge === Ne ? h : 0) + Et, g.left + (ge === Ne ? 0 : h) + Et)
                                        }
                                    Rt(n || l ? X : L),
                                    N !== B && d < 1 && n || b(H + (1 !== d || l ? 0 : N))
                                }
                            } else
                                b(Aa(H + N * d));
                        !ce || k.tween || nt || pt || j.restart(!0),
                        Z && (s || le && d && (d < 1 || !ct)) && et(Z.targets).forEach(function(e) {
                            return e.classList[n || le ? "add" : "remove"](Z.className)
                        }),
                        !Q || he || e || Q(we),
                        a && !nt ? (he && (c && ("complete" === i ? T.pause().totalProgress(1) : "reset" === i ? T.restart(!0).pause() : "restart" === i ? T.restart(!0) : T[i]()),
                        Q && Q(we)),
                        !s && ct || (ee && s && Oa(we, ee),
                        ye[o] && Oa(we, ye[o]),
                        le && (1 === d ? we.kill(!1, 1) : ye[o] = 0),
                        s || ye[o = 1 === d ? 1 : 3] && Oa(we, ye[o])),
                        de && !n && Math.abs(we.getVelocity()) > (La(de) ? de : 2500) && (Na(we.callbackAnimation),
                        W ? W.progress(1) : Na(T, "reverse" === i ? 1 : !d, 1))) : he && Q && !nt && Q(we)
                    }
                    if (S) {
                        var v = fe ? u / fe.duration() * (fe._caScrollDist || 0) : u;
                        x(v + (D._isFlipped ? 1 : 0)),
                        S(v)
                    }
                    $ && $(-u / fe.duration() * (fe._caScrollDist || 0))
                }
            }
            ,
            we.enable = function(e, t) {
                we.enabled || (we.enabled = !0,
                nb(ve, "resize", Cb),
                nb(be ? je : ve, "scroll", Ab),
                _e && nb(ScrollTrigger, "refreshInit", _e),
                !1 !== e && (we.progress = q = 0,
                A = E = Ae = Me()),
                !1 !== t && we.refresh())
            }
            ,
            we.getTween = function(e) {
                return e && k ? k.tween : W
            }
            ,
            we.setPositions = function(e, t) {
                oe && (H += e - M,
                N += t - e - B,
                ie === Tt && we.adjustPinSpacing(t - e - B)),
                we.start = M = e,
                we.end = P = t,
                B = t - e,
                we.update()
            }
            ,
            we.adjustPinSpacing = function(e) {
                if (K) {
                    var t = K.indexOf(ge.d) + 1;
                    K[t] = parseFloat(K[t]) + e + Et,
                    K[1] = parseFloat(K[1]) + e + Et,
                    Rt(K)
                }
            }
            ,
            we.disable = function(e, t) {
                if (we.enabled && (!1 !== e && we.revert(!0, !0),
                we.enabled = we.isActive = !1,
                t || W && W.pause(),
                U = 0,
                n && (n.uncache = 1),
                _e && ob(ScrollTrigger, "refreshInit", _e),
                j && (j.pause(),
                k.tween && k.tween.kill() && (k.tween = 0)),
                !be)) {
                    for (var r = Ot.length; r--; )
                        if (Ot[r].scroller === ve && Ot[r] !== we)
                            return;
                    ob(ve, "resize", Cb),
                    ob(ve, "scroll", Ab)
                }
            }
            ,
            we.kill = function(e, t) {
                we.disable(e, t),
                W && !t && W.kill(),
                a && delete Dt[a];
                var r = Ot.indexOf(we);
                0 <= r && Ot.splice(r, 1),
                r === it && 0 < Bt && it--,
                r = 0,
                Ot.forEach(function(e) {
                    return e.scroller === we.scroller && (r = 1)
                }),
                r || ut || (we.scroll.rec = 0),
                T && (T.scrollTrigger = null,
                e && T.revert({
                    kill: !1
                }),
                t || T.kill()),
                C && [C, O, D, z].forEach(function(e) {
                    return e.parentNode && e.parentNode.removeChild(e)
                }),
                dt === we && (dt = 0),
                oe && (n && (n.uncache = 1),
                r = 0,
                Ot.forEach(function(e) {
                    return e.pin === oe && r++
                }),
                r || (n.spacer = 0)),
                _.onKill && _.onKill(we)
            }
            ,
            we.enable(!1, !1),
            i && i(we),
            T && T.add && !B ? Ke.delayedCall(.01, function() {
                return M || P || we.refresh()
            }) && (B = .01) && (M = P = 0) : we.refresh(),
            oe && function _queueRefreshAll() {
                if (ft !== It) {
                    var e = ft = It;
                    requestAnimationFrame(function() {
                        return e === It && zt(!0)
                    })
                }
            }()
        } else
            this.update = this.refresh = this.kill = za
    }
    ,
    ScrollTrigger.register = function register(e) {
        return a || (Ke = e || Ca(),
        Ba() && window.document && ScrollTrigger.enable(),
        a = vt),
        a
    }
    ,
    ScrollTrigger.defaults = function defaults(e) {
        if (e)
            for (var t in e)
                Ct[t] = e[t];
        return Ct
    }
    ,
    ScrollTrigger.disable = function disable(t, r) {
        vt = 0,
        Ot.forEach(function(e) {
            return e[r ? "kill" : "disable"](t)
        }),
        ob(We, "wheel", Ab),
        ob(je, "scroll", Ab),
        clearInterval(c),
        ob(je, "touchcancel", za),
        ob(Ge, "touchstart", za),
        mb(ob, je, "pointerdown,touchstart,mousedown", xa),
        mb(ob, je, "pointerup,touchend,mouseup", ya),
        l.kill(),
        Ia(ob);
        for (var e = 0; e < Le.length; e += 3)
            pb(ob, Le[e], Le[e + 1]),
            pb(ob, Le[e], Le[e + 2])
    }
    ,
    ScrollTrigger.enable = function enable() {
        if (We = window,
        je = document,
        qe = je.documentElement,
        Ge = je.body,
        Ke && (et = Ke.utils.toArray,
        tt = Ke.utils.clamp,
        lt = Ke.core.context || za,
        st = Ke.core.suppressOverwrites || za,
        x = We.history.scrollRestoration || "auto",
        Ke.core.globals("ScrollTrigger", ScrollTrigger),
        Ge)) {
            vt = 1,
            k.register(Ke),
            ScrollTrigger.isTouch = k.isTouch,
            P = k.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
            nb(We, "wheel", Ab),
            s = [We, je, qe, Ge],
            Ke.matchMedia ? (ScrollTrigger.matchMedia = function(e) {
                var t, r = Ke.matchMedia();
                for (t in e)
                    r.add(t, e[t]);
                return r
            }
            ,
            Ke.addEventListener("matchMediaInit", function() {
                return Jb()
            }),
            Ke.addEventListener("matchMediaRevert", function() {
                return Ib()
            }),
            Ke.addEventListener("matchMedia", function() {
                zt(0, 1),
                H("matchMedia")
            }),
            Ke.matchMedia("(orientation: portrait)", function() {
                return Bb(),
                Bb
            })) : console.warn("Requires GSAP 3.11.0 or later"),
            Bb(),
            nb(je, "scroll", Ab);
            var e, t, r = Ge.style, n = r.borderTopStyle, o = Ke.core.Animation.prototype;
            for (o.revert || Object.defineProperty(o, "revert", {
                value: function value() {
                    return this.time(-.01, !0)
                }
            }),
            r.borderTopStyle = "solid",
            e = Mt(Ge),
            Ne.m = Math.round(e.top + Ne.sc()) || 0,
            Je.m = Math.round(e.left + Je.sc()) || 0,
            n ? r.borderTopStyle = n : r.removeProperty("border-top-style"),
            c = setInterval(zb, 250),
            Ke.delayedCall(.5, function() {
                return pt = 0
            }),
            nb(je, "touchcancel", za),
            nb(Ge, "touchstart", za),
            mb(nb, je, "pointerdown,touchstart,mousedown", xa),
            mb(nb, je, "pointerup,touchend,mouseup", ya),
            u = Ke.utils.checkPrefix("transform"),
            G.push(u),
            a = gt(),
            l = Ke.delayedCall(.2, zt).pause(),
            p = [je, "visibilitychange", function() {
                var e = We.innerWidth
                  , t = We.innerHeight;
                je.hidden ? (f = e,
                d = t) : f === e && d === t || Cb()
            }
            , je, "DOMContentLoaded", zt, We, "load", zt, We, "resize", Cb],
            Ia(nb),
            Ot.forEach(function(e) {
                return e.enable(0, 1)
            }),
            t = 0; t < Le.length; t += 3)
                pb(ob, Le[t], Le[t + 1]),
                pb(ob, Le[t], Le[t + 2])
        }
    }
    ,
    ScrollTrigger.config = function config(e) {
        "limitCallbacks"in e && (ct = !!e.limitCallbacks);
        var t = e.syncInterval;
        t && clearInterval(c) || (c = t) && setInterval(zb, t),
        "ignoreMobileResize"in e && (v = 1 === ScrollTrigger.isTouch && e.ignoreMobileResize),
        "autoRefreshEvents"in e && (Ia(ob) || Ia(nb, e.autoRefreshEvents || "none"),
        g = -1 === (e.autoRefreshEvents + "").indexOf("resize"))
    }
    ,
    ScrollTrigger.scrollerProxy = function scrollerProxy(e, t) {
        var r = I(e)
          , n = Le.indexOf(r)
          , o = Da(r);
        ~n && Le.splice(n, o ? 6 : 2),
        t && (o ? Fe.unshift(We, t, Ge, t, qe, t) : Fe.unshift(r, t))
    }
    ,
    ScrollTrigger.clearMatchMedia = function clearMatchMedia(t) {
        Ot.forEach(function(e) {
            return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0)
        })
    }
    ,
    ScrollTrigger.isInViewport = function isInViewport(e, t, r) {
        var n = (Ja(e) ? I(e) : e).getBoundingClientRect()
          , o = n[r ? mt : yt] * t || 0;
        return r ? 0 < n.right - o && n.left + o < We.innerWidth : 0 < n.bottom - o && n.top + o < We.innerHeight
    }
    ,
    ScrollTrigger.positionInViewport = function positionInViewport(e, t, r) {
        Ja(e) && (e = I(e));
        var n = e.getBoundingClientRect()
          , o = n[r ? mt : yt]
          , i = null == t ? o / 2 : t in D ? D[t] * o : ~t.indexOf("%") ? parseFloat(t) * o / 100 : parseFloat(t) || 0;
        return r ? (n.left + i) / We.innerWidth : (n.top + i) / We.innerHeight
    }
    ,
    ScrollTrigger.killAll = function killAll(e) {
        if (Ot.forEach(function(e) {
            return "ScrollSmoother" !== e.vars.id && e.kill()
        }),
        !0 !== e) {
            var t = X.killAll || [];
            X = {},
            t.forEach(function(e) {
                return e()
            })
        }
    }
    ,
    ScrollTrigger);
    function ScrollTrigger(e, t) {
        a || ScrollTrigger.register(Ke) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        this.init(e, t)
    }
    Z.version = "3.11.3",
    Z.saveStyles = function(e) {
        return e ? et(e).forEach(function(e) {
            if (e && e.style) {
                var t = V.indexOf(e);
                0 <= t && V.splice(t, 5),
                V.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), Ke.core.getCache(e), lt())
            }
        }) : V
    }
    ,
    Z.revert = function(e, t) {
        return Jb(!e, t)
    }
    ,
    Z.create = function(e, t) {
        return new Z(e,t)
    }
    ,
    Z.refresh = function(e) {
        return e ? Cb() : (a || Z.register()) && zt(!0)
    }
    ,
    Z.update = j,
    Z.clearScrollMemory = Kb,
    Z.maxScroll = function(e, t) {
        return Ha(e, t ? Je : Ne)
    }
    ,
    Z.getScrollFunc = function(e, t) {
        return J(I(e), t ? Je : Ne)
    }
    ,
    Z.getById = function(e) {
        return Dt[e]
    }
    ,
    Z.getAll = function() {
        return Ot.filter(function(e) {
            return "ScrollSmoother" !== e.vars.id
        })
    }
    ,
    Z.isScrolling = function() {
        return !!ht
    }
    ,
    Z.snapDirectional = kb,
    Z.addEventListener = function(e, t) {
        var r = X[e] || (X[e] = []);
        ~r.indexOf(t) || r.push(t)
    }
    ,
    Z.removeEventListener = function(e, t) {
        var r = X[e]
          , n = r && r.indexOf(t);
        0 <= n && r.splice(n, 1)
    }
    ,
    Z.batch = function(e, t) {
        function Do(e, t) {
            var r = []
              , n = []
              , o = Ke.delayedCall(i, function() {
                t(r, n),
                r = [],
                n = []
            }).pause();
            return function(e) {
                r.length || o.restart(!0),
                r.push(e.trigger),
                n.push(e),
                a <= r.length && o.progress(1)
            }
        }
        var r, n = [], o = {}, i = t.interval || .016, a = t.batchMax || 1e9;
        for (r in t)
            o[r] = "on" === r.substr(0, 2) && Ka(t[r]) && "onRefreshInit" !== r ? Do(0, t[r]) : t[r];
        return Ka(a) && (a = a(),
        nb(Z, "refresh", function() {
            return a = t.batchMax()
        })),
        et(e).forEach(function(e) {
            var t = {};
            for (r in o)
                t[r] = o[r];
            t.trigger = e,
            n.push(Z.create(t))
        }),
        n
    }
    ;
    function gc(e, t, r, n) {
        return n < t ? e(n) : t < 0 && e(0),
        n < r ? (n - t) / (r - t) : r < 0 ? t / (t - r) : 1
    }
    function hc(e, t) {
        !0 === t ? e.style.removeProperty("touch-action") : e.style.touchAction = !0 === t ? "auto" : t ? "pan-" + t + (k.isTouch ? " pinch-zoom" : "") : "none",
        e === qe && hc(Ge, t)
    }
    function jc(e) {
        var t, r = e.event, n = e.target, o = e.axis, i = (r.changedTouches ? r.changedTouches[0] : r).target, a = i._gsap || Ke.core.getCache(i), s = gt();
        if (!a._isScrollT || 2e3 < s - a._isScrollT) {
            for (; i && i.scrollHeight <= i.clientHeight; )
                i = i.parentNode;
            a._isScroll = i && !Da(i) && i !== n && (te[(t = db(i)).overflowY] || te[t.overflowX]),
            a._isScrollT = s
        }
        !a._isScroll && "x" !== o || (r.stopPropagation(),
        r._gsapAllow = !0)
    }
    function kc(e, t, r, n) {
        return k.create({
            target: e,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: t,
            onWheel: n = n && jc,
            onPress: n,
            onDrag: n,
            onScroll: n,
            onEnable: function onEnable() {
                return r && nb(je, k.eventTypes[0], ne, !1, !0)
            },
            onDisable: function onDisable() {
                return ob(je, k.eventTypes[0], ne, !0)
            }
        })
    }
    function oc(e) {
        function zp() {
            return o = !1
        }
        function Cp() {
            i = Ha(d, Ne),
            T = tt(P ? 1 : 0, i),
            f && (_ = tt(0, Ha(d, Je))),
            l = It
        }
        function Dp() {
            h._gsap.y = Aa(parseFloat(h._gsap.y) + v.offset) + "px",
            h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)",
            v.offset = v.cacheID = 0
        }
        function Jp() {
            Cp(),
            a.isActive() && a.vars.scrollY > i && (v() > i ? a.progress(1) && v(i) : a.resetTo("scrollY", i))
        }
        Ma(e) || (e = {}),
        e.preventDefault = e.isNormalizer = e.allowClicks = !0,
        e.type || (e.type = "wheel,touch"),
        e.debounce = !!e.debounce,
        e.id = e.id || "normalizer";
        var n, i, l, o, a, c, u, s, f = e.normalizeScrollX, t = e.momentum, r = e.allowNestedScroll, d = I(e.target) || qe, p = Ke.core.globals().ScrollSmoother, g = p && p.get(), h = P && (e.content && I(e.content) || g && !1 !== e.content && !g.smooth() && g.content()), v = J(d, Ne), b = J(d, Je), m = 1, y = (k.isTouch && We.visualViewport ? We.visualViewport.scale * We.visualViewport.width : We.outerWidth) / We.innerWidth, x = 0, S = Ka(t) ? function() {
            return t(n)
        }
        : function() {
            return t || 2.8
        }
        , w = kc(d, e.type, !0, r), _ = za, T = za;
        return h && Ke.set(h, {
            y: "+=0"
        }),
        e.ignoreCheck = function(e) {
            return P && "touchmove" === e.type && function ignoreDrag() {
                if (o) {
                    requestAnimationFrame(zp);
                    var e = Aa(n.deltaY / 2)
                      , t = T(v.v - e);
                    if (h && t !== v.v + v.offset) {
                        v.offset = t - v.v;
                        var r = Aa((parseFloat(h && h._gsap.y) || 0) - v.offset);
                        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + r + ", 0, 1)",
                        h._gsap.y = r + "px",
                        v.cacheID = Le.cache,
                        j()
                    }
                    return !0
                }
                v.offset && Dp(),
                o = !0
            }() || 1.05 < m && "touchstart" !== e.type || n.isGesturing || e.touches && 1 < e.touches.length
        }
        ,
        e.onPress = function() {
            var e = m;
            m = Aa((We.visualViewport && We.visualViewport.scale || 1) / y),
            a.pause(),
            e !== m && hc(d, 1.01 < m || !f && "x"),
            c = b(),
            u = v(),
            Cp(),
            l = It
        }
        ,
        e.onRelease = e.onGestureStart = function(e, t) {
            if (v.offset && Dp(),
            t) {
                Le.cache++;
                var r, n, o = S();
                f && (n = (r = b()) + .05 * o * -e.velocityX / .227,
                o *= gc(b, r, n, Ha(d, Je)),
                a.vars.scrollX = _(n)),
                n = (r = v()) + .05 * o * -e.velocityY / .227,
                o *= gc(v, r, n, Ha(d, Ne)),
                a.vars.scrollY = T(n),
                a.invalidate().duration(o).play(.01),
                (P && a.vars.scrollY >= i || i - 1 <= r) && Ke.to({}, {
                    onUpdate: Jp,
                    duration: o
                })
            } else
                s.restart(!0)
        }
        ,
        e.onWheel = function() {
            a._ts && a.pause(),
            1e3 < gt() - x && (l = 0,
            x = gt())
        }
        ,
        e.onChange = function(e, t, r, n, o) {
            if (It !== l && Cp(),
            t && f && b(_(n[2] === t ? c + (e.startX - e.x) : b() + t - n[1])),
            r) {
                v.offset && Dp();
                var i = o[2] === r
                  , a = i ? u + e.startY - e.y : v() + r - o[1]
                  , s = T(a);
                i && a !== s && (u += s - a),
                v(s)
            }
            (r || t) && j()
        }
        ,
        e.onEnable = function() {
            hc(d, !f && "x"),
            Z.addEventListener("refresh", Jp),
            nb(We, "resize", Jp),
            v.smooth && (v.target.style.scrollBehavior = "auto",
            v.smooth = b.smooth = !1),
            w.enable()
        }
        ,
        e.onDisable = function() {
            hc(d, !0),
            ob(We, "resize", Jp),
            Z.removeEventListener("refresh", Jp),
            w.kill()
        }
        ,
        e.lockAxis = !1 !== e.lockAxis,
        ((n = new k(e)).iOS = P) && !v() && v(1),
        P && Ke.ticker.add(za),
        s = n._dc,
        a = Ke.to(n, {
            ease: "power4",
            paused: !0,
            scrollX: f ? "+=0.1" : "+=0",
            scrollY: "+=0.1",
            onComplete: s.vars.onComplete
        }),
        n
    }
    var ee, te = {
        auto: 1,
        scroll: 1
    }, re = /(input|label|select|textarea)/i, ne = function _captureInputs(e) {
        var t = re.test(e.target.tagName);
        (t || ee) && (e._gsapAllow = !0,
        ee = t)
    };
    Z.sort = function(e) {
        return Ot.sort(e || function(e, t) {
            return -1e6 * (e.vars.refreshPriority || 0) + e.start - (t.start + -1e6 * (t.vars.refreshPriority || 0))
        }
        )
    }
    ,
    Z.observe = function(e) {
        return new k(e)
    }
    ,
    Z.normalizeScroll = function(e) {
        if (void 0 === e)
            return h;
        if (!0 === e && h)
            return h.enable();
        if (!1 === e)
            return h && h.kill();
        var t = e instanceof k ? e : oc(e);
        return h && h.target === t.target && h.kill(),
        Da(t.target) && (h = t),
        t
    }
    ,
    Z.core = {
        _getVelocityProp: K,
        _inputObserver: kc,
        _scrollers: Le,
        _proxies: Fe,
        bridge: {
            ss: function ss() {
                ht || H("scrollStart"),
                ht = gt()
            },
            ref: function ref() {
                return nt
            }
        }
    },
    Ca() && Ke.registerPlugin(Z),
    e.ScrollTrigger = Z,
    e.default = Z;
    if (typeof (window) === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    } else {
        delete e.default
    }
});
