// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t7, e10, o18) {
    if (this._$cssResult$ = true, o18 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t7, this.t = e10;
  }
  get styleSheet() {
    let t7 = this.o;
    const s9 = this.t;
    if (e && void 0 === t7) {
      const e10 = void 0 !== s9 && 1 === s9.length;
      e10 && (t7 = o.get(s9)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e10 && o.set(s9, t7));
    }
    return t7;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t7) => new n("string" == typeof t7 ? t7 : t7 + "", void 0, s);
var i = (t7, ...e10) => {
  const o18 = 1 === t7.length ? t7[0] : e10.reduce(((e11, s9, o19) => e11 + ((t8) => {
    if (true === t8._$cssResult$) return t8.cssText;
    if ("number" == typeof t8) return t8;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s9) + t7[o19 + 1]), t7[0]);
  return new n(o18, t7, s);
};
var S = (s9, o18) => {
  if (e) s9.adoptedStyleSheets = o18.map(((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet));
  else for (const e10 of o18) {
    const o19 = document.createElement("style"), n12 = t.litNonce;
    void 0 !== n12 && o19.setAttribute("nonce", n12), o19.textContent = e10.cssText, s9.appendChild(o19);
  }
};
var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
  let e10 = "";
  for (const s9 of t8.cssRules) e10 += s9.cssText;
  return r(e10);
})(t7) : t7;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t7, s9) => t7;
var u = { toAttribute(t7, s9) {
  switch (s9) {
    case Boolean:
      t7 = t7 ? l : null;
      break;
    case Object:
    case Array:
      t7 = null == t7 ? t7 : JSON.stringify(t7);
  }
  return t7;
}, fromAttribute(t7, s9) {
  let i13 = t7;
  switch (s9) {
    case Boolean:
      i13 = null !== t7;
      break;
    case Number:
      i13 = null === t7 ? null : Number(t7);
      break;
    case Object:
    case Array:
      try {
        i13 = JSON.parse(t7);
      } catch (t8) {
        i13 = null;
      }
  }
  return i13;
} };
var f = (t7, s9) => !i2(t7, s9);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
var _a, _b;
(_a = Symbol.metadata) != null ? _a : Symbol.metadata = Symbol("metadata"), (_b = a.litPropertyMetadata) != null ? _b : a.litPropertyMetadata = /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t7) {
    var _a6;
    this._$Ei(), ((_a6 = this.l) != null ? _a6 : this.l = []).push(t7);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t7, s9 = b) {
    if (s9.state && (s9.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t7) && ((s9 = Object.create(s9)).wrapped = true), this.elementProperties.set(t7, s9), !s9.noAccessor) {
      const i13 = Symbol(), h10 = this.getPropertyDescriptor(t7, i13, s9);
      void 0 !== h10 && e2(this.prototype, t7, h10);
    }
  }
  static getPropertyDescriptor(t7, s9, i13) {
    var _a6;
    const { get: e10, set: r8 } = (_a6 = h(this.prototype, t7)) != null ? _a6 : { get() {
      return this[s9];
    }, set(t8) {
      this[s9] = t8;
    } };
    return { get: e10, set(s10) {
      const h10 = e10 == null ? void 0 : e10.call(this);
      r8 == null ? void 0 : r8.call(this, s10), this.requestUpdate(t7, h10, i13);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t7) {
    var _a6;
    return (_a6 = this.elementProperties.get(t7)) != null ? _a6 : b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t7 = n2(this);
    t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t8 = this.properties, s9 = [...r2(t8), ...o2(t8)];
      for (const i13 of s9) this.createProperty(i13, t8[i13]);
    }
    const t7 = this[Symbol.metadata];
    if (null !== t7) {
      const s9 = litPropertyMetadata.get(t7);
      if (void 0 !== s9) for (const [t8, i13] of s9) this.elementProperties.set(t8, i13);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t8, s9] of this.elementProperties) {
      const i13 = this._$Eu(t8, s9);
      void 0 !== i13 && this._$Eh.set(i13, t8);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s9) {
    const i13 = [];
    if (Array.isArray(s9)) {
      const e10 = new Set(s9.flat(1 / 0).reverse());
      for (const s10 of e10) i13.unshift(c(s10));
    } else void 0 !== s9 && i13.push(c(s9));
    return i13;
  }
  static _$Eu(t7, s9) {
    const i13 = s9.attribute;
    return false === i13 ? void 0 : "string" == typeof i13 ? i13 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a6;
    this._$ES = new Promise(((t7) => this.enableUpdating = t7)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a6 = this.constructor.l) == null ? void 0 : _a6.forEach(((t7) => t7(this)));
  }
  addController(t7) {
    var _a6, _b2;
    ((_a6 = this._$EO) != null ? _a6 : this._$EO = /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && ((_b2 = t7.hostConnected) == null ? void 0 : _b2.call(t7));
  }
  removeController(t7) {
    var _a6;
    (_a6 = this._$EO) == null ? void 0 : _a6.delete(t7);
  }
  _$E_() {
    const t7 = /* @__PURE__ */ new Map(), s9 = this.constructor.elementProperties;
    for (const i13 of s9.keys()) this.hasOwnProperty(i13) && (t7.set(i13, this[i13]), delete this[i13]);
    t7.size > 0 && (this._$Ep = t7);
  }
  createRenderRoot() {
    var _a6;
    const t7 = (_a6 = this.shadowRoot) != null ? _a6 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(t7, this.constructor.elementStyles), t7;
  }
  connectedCallback() {
    var _a6, _b2;
    (_a6 = this.renderRoot) != null ? _a6 : this.renderRoot = this.createRenderRoot(), this.enableUpdating(true), (_b2 = this._$EO) == null ? void 0 : _b2.forEach(((t7) => {
      var _a7;
      return (_a7 = t7.hostConnected) == null ? void 0 : _a7.call(t7);
    }));
  }
  enableUpdating(t7) {
  }
  disconnectedCallback() {
    var _a6;
    (_a6 = this._$EO) == null ? void 0 : _a6.forEach(((t7) => {
      var _a7;
      return (_a7 = t7.hostDisconnected) == null ? void 0 : _a7.call(t7);
    }));
  }
  attributeChangedCallback(t7, s9, i13) {
    this._$AK(t7, i13);
  }
  _$ET(t7, s9) {
    var _a6;
    const i13 = this.constructor.elementProperties.get(t7), e10 = this.constructor._$Eu(t7, i13);
    if (void 0 !== e10 && true === i13.reflect) {
      const h10 = (void 0 !== ((_a6 = i13.converter) == null ? void 0 : _a6.toAttribute) ? i13.converter : u).toAttribute(s9, i13.type);
      this._$Em = t7, null == h10 ? this.removeAttribute(e10) : this.setAttribute(e10, h10), this._$Em = null;
    }
  }
  _$AK(t7, s9) {
    var _a6, _b2, _c;
    const i13 = this.constructor, e10 = i13._$Eh.get(t7);
    if (void 0 !== e10 && this._$Em !== e10) {
      const t8 = i13.getPropertyOptions(e10), h10 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== ((_a6 = t8.converter) == null ? void 0 : _a6.fromAttribute) ? t8.converter : u;
      this._$Em = e10;
      const r8 = h10.fromAttribute(s9, t8.type);
      this[e10] = (_c = r8 != null ? r8 : (_b2 = this._$Ej) == null ? void 0 : _b2.get(e10)) != null ? _c : r8, this._$Em = null;
    }
  }
  requestUpdate(t7, s9, i13) {
    var _a6, _b2;
    if (void 0 !== t7) {
      const e10 = this.constructor, h10 = this[t7];
      if (i13 != null ? i13 : i13 = e10.getPropertyOptions(t7), !(((_a6 = i13.hasChanged) != null ? _a6 : f)(h10, s9) || i13.useDefault && i13.reflect && h10 === ((_b2 = this._$Ej) == null ? void 0 : _b2.get(t7)) && !this.hasAttribute(e10._$Eu(t7, i13)))) return;
      this.C(t7, s9, i13);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t7, s9, { useDefault: i13, reflect: e10, wrapped: h10 }, r8) {
    var _a6, _b2, _c;
    i13 && !((_a6 = this._$Ej) != null ? _a6 : this._$Ej = /* @__PURE__ */ new Map()).has(t7) && (this._$Ej.set(t7, (_b2 = r8 != null ? r8 : s9) != null ? _b2 : this[t7]), true !== h10 || void 0 !== r8) || (this._$AL.has(t7) || (this.hasUpdated || i13 || (s9 = void 0), this._$AL.set(t7, s9)), true === e10 && this._$Em !== t7 && ((_c = this._$Eq) != null ? _c : this._$Eq = /* @__PURE__ */ new Set()).add(t7));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t8) {
      Promise.reject(t8);
    }
    const t7 = this.scheduleUpdate();
    return null != t7 && await t7, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a6, _b2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((_a6 = this.renderRoot) != null ? _a6 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
        for (const [t9, s10] of this._$Ep) this[t9] = s10;
        this._$Ep = void 0;
      }
      const t8 = this.constructor.elementProperties;
      if (t8.size > 0) for (const [s10, i13] of t8) {
        const { wrapped: t9 } = i13, e10 = this[s10];
        true !== t9 || this._$AL.has(s10) || void 0 === e10 || this.C(s10, void 0, i13, e10);
      }
    }
    let t7 = false;
    const s9 = this._$AL;
    try {
      t7 = this.shouldUpdate(s9), t7 ? (this.willUpdate(s9), (_b2 = this._$EO) == null ? void 0 : _b2.forEach(((t8) => {
        var _a7;
        return (_a7 = t8.hostUpdate) == null ? void 0 : _a7.call(t8);
      })), this.update(s9)) : this._$EM();
    } catch (s10) {
      throw t7 = false, this._$EM(), s10;
    }
    t7 && this._$AE(s9);
  }
  willUpdate(t7) {
  }
  _$AE(t7) {
    var _a6;
    (_a6 = this._$EO) == null ? void 0 : _a6.forEach(((t8) => {
      var _a7;
      return (_a7 = t8.hostUpdated) == null ? void 0 : _a7.call(t8);
    })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t7) {
    return true;
  }
  update(t7) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((t8) => this._$ET(t8, this[t8])))), this._$EM();
  }
  updated(t7) {
  }
  firstUpdated(t7) {
  }
};
var _a2;
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: y }), ((_a2 = a.reactiveElementVersions) != null ? _a2 : a.reactiveElementVersions = []).push("2.1.1");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = t2.trustedTypes;
var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
var e3 = "$lit$";
var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = document;
var l2 = () => r3.createComment("");
var c3 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
var a2 = Array.isArray;
var u2 = (t7) => a2(t7) || "function" == typeof (t7 == null ? void 0 : t7[Symbol.iterator]);
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t7) => (i13, ...s9) => ({ _$litType$: t7, strings: i13, values: s9 });
var x = y2(1);
var b2 = y2(2);
var w = y2(3);
var T = Symbol.for("lit-noChange");
var E = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129);
function P(t7, i13) {
  if (!a2(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i13) : i13;
}
var V = (t7, i13) => {
  const s9 = t7.length - 1, o18 = [];
  let r8, l6 = 2 === i13 ? "<svg>" : 3 === i13 ? "<math>" : "", c10 = f2;
  for (let i14 = 0; i14 < s9; i14++) {
    const s10 = t7[i14];
    let a4, u6, d5 = -1, y3 = 0;
    for (; y3 < s10.length && (c10.lastIndex = y3, u6 = c10.exec(s10), null !== u6); ) y3 = c10.lastIndex, c10 === f2 ? "!--" === u6[1] ? c10 = v : void 0 !== u6[1] ? c10 = _ : void 0 !== u6[2] ? ($.test(u6[2]) && (r8 = RegExp("</" + u6[2], "g")), c10 = m) : void 0 !== u6[3] && (c10 = m) : c10 === m ? ">" === u6[0] ? (c10 = r8 != null ? r8 : f2, d5 = -1) : void 0 === u6[1] ? d5 = -2 : (d5 = c10.lastIndex - u6[2].length, a4 = u6[1], c10 = void 0 === u6[3] ? m : '"' === u6[3] ? g : p2) : c10 === g || c10 === p2 ? c10 = m : c10 === v || c10 === _ ? c10 = f2 : (c10 = m, r8 = void 0);
    const x2 = c10 === m && t7[i14 + 1].startsWith("/>") ? " " : "";
    l6 += c10 === f2 ? s10 + n3 : d5 >= 0 ? (o18.push(a4), s10.slice(0, d5) + e3 + s10.slice(d5) + h2 + x2) : s10 + h2 + (-2 === d5 ? i14 : x2);
  }
  return [P(t7, l6 + (t7[s9] || "<?>") + (2 === i13 ? "</svg>" : 3 === i13 ? "</math>" : "")), o18];
};
var N = class _N {
  constructor({ strings: t7, _$litType$: s9 }, n12) {
    let r8;
    this.parts = [];
    let c10 = 0, a4 = 0;
    const u6 = t7.length - 1, d5 = this.parts, [f5, v3] = V(t7, s9);
    if (this.el = _N.createElement(f5, n12), C.currentNode = this.el.content, 2 === s9 || 3 === s9) {
      const t8 = this.el.content.firstChild;
      t8.replaceWith(...t8.childNodes);
    }
    for (; null !== (r8 = C.nextNode()) && d5.length < u6; ) {
      if (1 === r8.nodeType) {
        if (r8.hasAttributes()) for (const t8 of r8.getAttributeNames()) if (t8.endsWith(e3)) {
          const i13 = v3[a4++], s10 = r8.getAttribute(t8).split(h2), e10 = /([.?@])?(.*)/.exec(i13);
          d5.push({ type: 1, index: c10, name: e10[2], strings: s10, ctor: "." === e10[1] ? H : "?" === e10[1] ? I : "@" === e10[1] ? L : k }), r8.removeAttribute(t8);
        } else t8.startsWith(h2) && (d5.push({ type: 6, index: c10 }), r8.removeAttribute(t8));
        if ($.test(r8.tagName)) {
          const t8 = r8.textContent.split(h2), s10 = t8.length - 1;
          if (s10 > 0) {
            r8.textContent = i3 ? i3.emptyScript : "";
            for (let i13 = 0; i13 < s10; i13++) r8.append(t8[i13], l2()), C.nextNode(), d5.push({ type: 2, index: ++c10 });
            r8.append(t8[s10], l2());
          }
        }
      } else if (8 === r8.nodeType) if (r8.data === o3) d5.push({ type: 2, index: c10 });
      else {
        let t8 = -1;
        for (; -1 !== (t8 = r8.data.indexOf(h2, t8 + 1)); ) d5.push({ type: 7, index: c10 }), t8 += h2.length - 1;
      }
      c10++;
    }
  }
  static createElement(t7, i13) {
    const s9 = r3.createElement("template");
    return s9.innerHTML = t7, s9;
  }
};
function S2(t7, i13, s9 = t7, e10) {
  var _a6, _b2, _c;
  if (i13 === T) return i13;
  let h10 = void 0 !== e10 ? (_a6 = s9._$Co) == null ? void 0 : _a6[e10] : s9._$Cl;
  const o18 = c3(i13) ? void 0 : i13._$litDirective$;
  return (h10 == null ? void 0 : h10.constructor) !== o18 && ((_b2 = h10 == null ? void 0 : h10._$AO) == null ? void 0 : _b2.call(h10, false), void 0 === o18 ? h10 = void 0 : (h10 = new o18(t7), h10._$AT(t7, s9, e10)), void 0 !== e10 ? ((_c = s9._$Co) != null ? _c : s9._$Co = [])[e10] = h10 : s9._$Cl = h10), void 0 !== h10 && (i13 = S2(t7, h10._$AS(t7, i13.values), h10, e10)), i13;
}
var M = class {
  constructor(t7, i13) {
    this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i13;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t7) {
    var _a6;
    const { el: { content: i13 }, parts: s9 } = this._$AD, e10 = ((_a6 = t7 == null ? void 0 : t7.creationScope) != null ? _a6 : r3).importNode(i13, true);
    C.currentNode = e10;
    let h10 = C.nextNode(), o18 = 0, n12 = 0, l6 = s9[0];
    for (; void 0 !== l6; ) {
      if (o18 === l6.index) {
        let i14;
        2 === l6.type ? i14 = new R(h10, h10.nextSibling, this, t7) : 1 === l6.type ? i14 = new l6.ctor(h10, l6.name, l6.strings, this, t7) : 6 === l6.type && (i14 = new z(h10, this, t7)), this._$AV.push(i14), l6 = s9[++n12];
      }
      o18 !== (l6 == null ? void 0 : l6.index) && (h10 = C.nextNode(), o18++);
    }
    return C.currentNode = r3, e10;
  }
  p(t7) {
    let i13 = 0;
    for (const s9 of this._$AV) void 0 !== s9 && (void 0 !== s9.strings ? (s9._$AI(t7, s9, i13), i13 += s9.strings.length - 2) : s9._$AI(t7[i13])), i13++;
  }
};
var R = class _R {
  get _$AU() {
    var _a6, _b2;
    return (_b2 = (_a6 = this._$AM) == null ? void 0 : _a6._$AU) != null ? _b2 : this._$Cv;
  }
  constructor(t7, i13, s9, e10) {
    var _a6;
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t7, this._$AB = i13, this._$AM = s9, this.options = e10, this._$Cv = (_a6 = e10 == null ? void 0 : e10.isConnected) != null ? _a6 : true;
  }
  get parentNode() {
    let t7 = this._$AA.parentNode;
    const i13 = this._$AM;
    return void 0 !== i13 && 11 === (t7 == null ? void 0 : t7.nodeType) && (t7 = i13.parentNode), t7;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t7, i13 = this) {
    t7 = S2(this, t7, i13), c3(t7) ? t7 === E || null == t7 || "" === t7 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t7 !== this._$AH && t7 !== T && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : u2(t7) ? this.k(t7) : this._(t7);
  }
  O(t7) {
    return this._$AA.parentNode.insertBefore(t7, this._$AB);
  }
  T(t7) {
    this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
  }
  _(t7) {
    this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(r3.createTextNode(t7)), this._$AH = t7;
  }
  $(t7) {
    var _a6;
    const { values: i13, _$litType$: s9 } = t7, e10 = "number" == typeof s9 ? this._$AC(t7) : (void 0 === s9.el && (s9.el = N.createElement(P(s9.h, s9.h[0]), this.options)), s9);
    if (((_a6 = this._$AH) == null ? void 0 : _a6._$AD) === e10) this._$AH.p(i13);
    else {
      const t8 = new M(e10, this), s10 = t8.u(this.options);
      t8.p(i13), this.T(s10), this._$AH = t8;
    }
  }
  _$AC(t7) {
    let i13 = A.get(t7.strings);
    return void 0 === i13 && A.set(t7.strings, i13 = new N(t7)), i13;
  }
  k(t7) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i13 = this._$AH;
    let s9, e10 = 0;
    for (const h10 of t7) e10 === i13.length ? i13.push(s9 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s9 = i13[e10], s9._$AI(h10), e10++;
    e10 < i13.length && (this._$AR(s9 && s9._$AB.nextSibling, e10), i13.length = e10);
  }
  _$AR(t7 = this._$AA.nextSibling, i13) {
    var _a6;
    for ((_a6 = this._$AP) == null ? void 0 : _a6.call(this, false, true, i13); t7 !== this._$AB; ) {
      const i14 = t7.nextSibling;
      t7.remove(), t7 = i14;
    }
  }
  setConnected(t7) {
    var _a6;
    void 0 === this._$AM && (this._$Cv = t7, (_a6 = this._$AP) == null ? void 0 : _a6.call(this, t7));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t7, i13, s9, e10, h10) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t7, this.name = i13, this._$AM = e10, this.options = h10, s9.length > 2 || "" !== s9[0] || "" !== s9[1] ? (this._$AH = Array(s9.length - 1).fill(new String()), this.strings = s9) : this._$AH = E;
  }
  _$AI(t7, i13 = this, s9, e10) {
    const h10 = this.strings;
    let o18 = false;
    if (void 0 === h10) t7 = S2(this, t7, i13, 0), o18 = !c3(t7) || t7 !== this._$AH && t7 !== T, o18 && (this._$AH = t7);
    else {
      const e11 = t7;
      let n12, r8;
      for (t7 = h10[0], n12 = 0; n12 < h10.length - 1; n12++) r8 = S2(this, e11[s9 + n12], i13, n12), r8 === T && (r8 = this._$AH[n12]), o18 || (o18 = !c3(r8) || r8 !== this._$AH[n12]), r8 === E ? t7 = E : t7 !== E && (t7 += (r8 != null ? r8 : "") + h10[n12 + 1]), this._$AH[n12] = r8;
    }
    o18 && !e10 && this.j(t7);
  }
  j(t7) {
    t7 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 != null ? t7 : "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t7) {
    this.element[this.name] = t7 === E ? void 0 : t7;
  }
};
var I = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t7) {
    this.element.toggleAttribute(this.name, !!t7 && t7 !== E);
  }
};
var L = class extends k {
  constructor(t7, i13, s9, e10, h10) {
    super(t7, i13, s9, e10, h10), this.type = 5;
  }
  _$AI(t7, i13 = this) {
    var _a6;
    if ((t7 = (_a6 = S2(this, t7, i13, 0)) != null ? _a6 : E) === T) return;
    const s9 = this._$AH, e10 = t7 === E && s9 !== E || t7.capture !== s9.capture || t7.once !== s9.once || t7.passive !== s9.passive, h10 = t7 !== E && (s9 === E || e10);
    e10 && this.element.removeEventListener(this.name, this, s9), h10 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
  }
  handleEvent(t7) {
    var _a6, _b2;
    "function" == typeof this._$AH ? this._$AH.call((_b2 = (_a6 = this.options) == null ? void 0 : _a6.host) != null ? _b2 : this.element, t7) : this._$AH.handleEvent(t7);
  }
};
var z = class {
  constructor(t7, i13, s9) {
    this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i13, this.options = s9;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t7) {
    S2(this, t7);
  }
};
var Z = { M: e3, P: h2, A: o3, C: 1, L: V, R: M, D: u2, V: S2, I: R, H: k, N: I, U: L, B: H, F: z };
var j = t2.litHtmlPolyfillSupport;
var _a3;
j == null ? void 0 : j(N, R), ((_a3 = t2.litHtmlVersions) != null ? _a3 : t2.litHtmlVersions = []).push("3.3.1");
var B = (t7, i13, s9) => {
  var _a6, _b2;
  const e10 = (_a6 = s9 == null ? void 0 : s9.renderBefore) != null ? _a6 : i13;
  let h10 = e10._$litPart$;
  if (void 0 === h10) {
    const t8 = (_b2 = s9 == null ? void 0 : s9.renderBefore) != null ? _b2 : null;
    e10._$litPart$ = h10 = new R(i13.insertBefore(l2(), t8), t8, void 0, s9 != null ? s9 : {});
  }
  return h10._$AI(t7), h10;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a6, _b2;
    const t7 = super.createRenderRoot();
    return (_b2 = (_a6 = this.renderOptions).renderBefore) != null ? _b2 : _a6.renderBefore = t7.firstChild, t7;
  }
  update(t7) {
    const r8 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = B(r8, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a6;
    super.connectedCallback(), (_a6 = this._$Do) == null ? void 0 : _a6.setConnected(true);
  }
  disconnectedCallback() {
    var _a6;
    super.disconnectedCallback(), (_a6 = this._$Do) == null ? void 0 : _a6.setConnected(false);
  }
  render() {
    return T;
  }
};
var _a4;
i4._$litElement$ = true, i4["finalized"] = true, (_a4 = s3.litElementHydrateSupport) == null ? void 0 : _a4.call(s3, { LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4 == null ? void 0 : o4({ LitElement: i4 });
var n4 = { _$AK: (t7, e10, r8) => {
  t7._$AK(e10, r8);
}, _$AL: (t7) => t7._$AL };
var _a5;
((_a5 = s3.litElementVersions) != null ? _a5 : s3.litElementVersions = []).push("4.2.1");

// node_modules/lit-html/is-server.js
var o5 = false;

// node_modules/lit-html/directive-helpers.js
var { I: t3 } = Z;
var i5 = (o18) => null === o18 || "object" != typeof o18 && "function" != typeof o18;
var n5 = { HTML: 1, SVG: 2, MATHML: 3 };
var e4 = (o18, t7) => void 0 === t7 ? void 0 !== (o18 == null ? void 0 : o18._$litType$) : (o18 == null ? void 0 : o18._$litType$) === t7;
var l3 = (o18) => {
  var _a6;
  return null != ((_a6 = o18 == null ? void 0 : o18._$litType$) == null ? void 0 : _a6.h);
};
var d3 = (o18) => void 0 !== (o18 == null ? void 0 : o18._$litDirective$);
var c4 = (o18) => o18 == null ? void 0 : o18._$litDirective$;
var f3 = (o18) => void 0 === o18.strings;
var r4 = () => document.createComment("");
var s4 = (o18, i13, n12) => {
  var _a6;
  const e10 = o18._$AA.parentNode, l6 = void 0 === i13 ? o18._$AB : i13._$AA;
  if (void 0 === n12) {
    const i14 = e10.insertBefore(r4(), l6), d5 = e10.insertBefore(r4(), l6);
    n12 = new t3(i14, d5, o18, o18.options);
  } else {
    const t7 = n12._$AB.nextSibling, i14 = n12._$AM, d5 = i14 !== o18;
    if (d5) {
      let t8;
      (_a6 = n12._$AQ) == null ? void 0 : _a6.call(n12, o18), n12._$AM = o18, void 0 !== n12._$AP && (t8 = o18._$AU) !== i14._$AU && n12._$AP(t8);
    }
    if (t7 !== l6 || d5) {
      let o19 = n12._$AA;
      for (; o19 !== t7; ) {
        const t8 = o19.nextSibling;
        e10.insertBefore(o19, l6), o19 = t8;
      }
    }
  }
  return n12;
};
var v2 = (o18, t7, i13 = o18) => (o18._$AI(t7, i13), o18);
var u3 = {};
var m2 = (o18, t7 = u3) => o18._$AH = t7;
var p3 = (o18) => o18._$AH;
var M2 = (o18) => {
  o18._$AR(), o18._$AA.remove();
};
var h3 = (o18) => {
  o18._$AR();
};

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t7) => (...e10) => ({ _$litDirective$: t7, values: e10 });
var i6 = class {
  constructor(t7) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t7, e10, i13) {
    this._$Ct = t7, this._$AM = e10, this._$Ci = i13;
  }
  _$AS(t7, e10) {
    return this.update(t7, e10);
  }
  update(t7, e10) {
    return this.render(...e10);
  }
};

// node_modules/lit-html/async-directive.js
var s5 = (i13, t7) => {
  var _a6;
  const e10 = i13._$AN;
  if (void 0 === e10) return false;
  for (const i14 of e10) (_a6 = i14._$AO) == null ? void 0 : _a6.call(i14, t7, false), s5(i14, t7);
  return true;
};
var o6 = (i13) => {
  let t7, e10;
  do {
    if (void 0 === (t7 = i13._$AM)) break;
    e10 = t7._$AN, e10.delete(i13), i13 = t7;
  } while (0 === (e10 == null ? void 0 : e10.size));
};
var r5 = (i13) => {
  for (let t7; t7 = i13._$AM; i13 = t7) {
    let e10 = t7._$AN;
    if (void 0 === e10) t7._$AN = e10 = /* @__PURE__ */ new Set();
    else if (e10.has(i13)) break;
    e10.add(i13), c5(t7);
  }
};
function h4(i13) {
  void 0 !== this._$AN ? (o6(this), this._$AM = i13, r5(this)) : this._$AM = i13;
}
function n6(i13, t7 = false, e10 = 0) {
  const r8 = this._$AH, h10 = this._$AN;
  if (void 0 !== h10 && 0 !== h10.size) if (t7) if (Array.isArray(r8)) for (let i14 = e10; i14 < r8.length; i14++) s5(r8[i14], false), o6(r8[i14]);
  else null != r8 && (s5(r8, false), o6(r8));
  else s5(this, i13);
}
var c5 = (i13) => {
  var _a6, _b2;
  i13.type == t4.CHILD && ((_a6 = i13._$AP) != null ? _a6 : i13._$AP = n6, (_b2 = i13._$AQ) != null ? _b2 : i13._$AQ = h4);
};
var f4 = class extends i6 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i13, t7, e10) {
    super._$AT(i13, t7, e10), r5(this), this.isConnected = i13._$AU;
  }
  _$AO(i13, t7 = true) {
    var _a6, _b2;
    i13 !== this.isConnected && (this.isConnected = i13, i13 ? (_a6 = this.reconnected) == null ? void 0 : _a6.call(this) : (_b2 = this.disconnected) == null ? void 0 : _b2.call(this)), t7 && (s5(this, i13), o6(this));
  }
  setValue(t7) {
    if (f3(this._$Ct)) this._$Ct._$AI(t7, this);
    else {
      const i13 = [...this._$Ct._$AH];
      i13[this._$Ci] = t7, this._$Ct._$AI(i13, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/directives/private-async-helpers.js
var t5 = async (t7, s9) => {
  for await (const i13 of t7) if (false === await s9(i13)) return;
};
var s6 = class {
  constructor(t7) {
    this.G = t7;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(t7) {
    this.G = t7;
  }
  deref() {
    return this.G;
  }
};
var i7 = class {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    var _a6;
    (_a6 = this.Y) != null ? _a6 : this.Y = new Promise(((t7) => this.Z = t7));
  }
  resume() {
    var _a6;
    (_a6 = this.Z) == null ? void 0 : _a6.call(this), this.Y = this.Z = void 0;
  }
};

// node_modules/lit-html/directives/async-replace.js
var o7 = class extends f4 {
  constructor() {
    super(...arguments), this._$CK = new s6(this), this._$CX = new i7();
  }
  render(i13, s9) {
    return T;
  }
  update(i13, [s9, r8]) {
    if (this.isConnected || this.disconnected(), s9 === this._$CJ) return T;
    this._$CJ = s9;
    let n12 = 0;
    const { _$CK: o18, _$CX: h10 } = this;
    return t5(s9, (async (t7) => {
      for (; h10.get(); ) await h10.get();
      const i14 = o18.deref();
      if (void 0 !== i14) {
        if (i14._$CJ !== s9) return false;
        void 0 !== r8 && (t7 = r8(t7, n12)), i14.commitValue(t7, n12), n12++;
      }
      return true;
    })), T;
  }
  commitValue(t7, i13) {
    this.setValue(t7);
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
};
var h5 = e5(o7);

// node_modules/lit-html/directives/async-append.js
var c6 = e5(class extends o7 {
  constructor(r8) {
    if (super(r8), r8.type !== t4.CHILD) throw Error("asyncAppend can only be used in child expressions");
  }
  update(r8, e10) {
    return this._$Ctt = r8, super.update(r8, e10);
  }
  commitValue(r8, e10) {
    0 === e10 && h3(this._$Ctt);
    const s9 = s4(this._$Ctt);
    v2(s9, r8);
  }
});

// node_modules/lit-html/directives/cache.js
var d4 = (t7) => l3(t7) ? t7._$litType$.h : t7.strings;
var h6 = e5(class extends i6 {
  constructor(t7) {
    super(t7), this.et = /* @__PURE__ */ new WeakMap();
  }
  render(t7) {
    return [t7];
  }
  update(s9, [e10]) {
    const u6 = e4(this.it) ? d4(this.it) : null, h10 = e4(e10) ? d4(e10) : null;
    if (null !== u6 && (null === h10 || u6 !== h10)) {
      const e11 = p3(s9).pop();
      let o18 = this.et.get(u6);
      if (void 0 === o18) {
        const s10 = document.createDocumentFragment();
        o18 = B(E, s10), o18.setConnected(false), this.et.set(u6, o18);
      }
      m2(o18, [e11]), s4(o18, void 0, e11);
    }
    if (null !== h10) {
      if (null === u6 || u6 !== h10) {
        const t7 = this.et.get(h10);
        if (void 0 !== t7) {
          const i13 = p3(t7).pop();
          h3(s9), s4(s9, void 0, i13), m2(s9, [i13]);
        }
      }
      this.it = e10;
    } else this.it = void 0;
    return this.render(e10);
  }
});

// node_modules/lit-html/directives/choose.js
var r6 = (r8, o18, t7) => {
  for (const t8 of o18) if (t8[0] === r8) return (0, t8[1])();
  return t7 == null ? void 0 : t7();
};

// node_modules/lit-html/directives/class-map.js
var e6 = e5(class extends i6 {
  constructor(t7) {
    var _a6;
    if (super(t7), t7.type !== t4.ATTRIBUTE || "class" !== t7.name || ((_a6 = t7.strings) == null ? void 0 : _a6.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t7) {
    return " " + Object.keys(t7).filter(((s9) => t7[s9])).join(" ") + " ";
  }
  update(s9, [i13]) {
    var _a6, _b2;
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s9.strings && (this.nt = new Set(s9.strings.join(" ").split(/\s/).filter(((t7) => "" !== t7))));
      for (const t7 in i13) i13[t7] && !((_a6 = this.nt) == null ? void 0 : _a6.has(t7)) && this.st.add(t7);
      return this.render(i13);
    }
    const r8 = s9.element.classList;
    for (const t7 of this.st) t7 in i13 || (r8.remove(t7), this.st.delete(t7));
    for (const t7 in i13) {
      const s10 = !!i13[t7];
      s10 === this.st.has(t7) || ((_b2 = this.nt) == null ? void 0 : _b2.has(t7)) || (s10 ? (r8.add(t7), this.st.add(t7)) : (r8.remove(t7), this.st.delete(t7)));
    }
    return T;
  }
});

// node_modules/lit-html/directives/guard.js
var e7 = {};
var i8 = e5(class extends i6 {
  constructor() {
    super(...arguments), this.ot = e7;
  }
  render(r8, t7) {
    return t7();
  }
  update(t7, [s9, e10]) {
    if (Array.isArray(s9)) {
      if (Array.isArray(this.ot) && this.ot.length === s9.length && s9.every(((r8, t8) => r8 === this.ot[t8]))) return T;
    } else if (this.ot === s9) return T;
    return this.ot = Array.isArray(s9) ? Array.from(s9) : s9, this.render(s9, e10);
  }
});

// node_modules/lit-html/directives/if-defined.js
var o8 = (o18) => o18 != null ? o18 : E;

// node_modules/lit-html/directives/join.js
function* o9(o18, t7) {
  const f5 = "function" == typeof t7;
  if (void 0 !== o18) {
    let i13 = -1;
    for (const n12 of o18) i13 > -1 && (yield f5 ? t7(i13) : t7), i13++, yield n12;
  }
}

// node_modules/lit-html/directives/keyed.js
var i9 = e5(class extends i6 {
  constructor() {
    super(...arguments), this.key = E;
  }
  render(r8, t7) {
    return this.key = r8, t7;
  }
  update(r8, [t7, e10]) {
    return t7 !== this.key && (m2(r8), this.key = t7), e10;
  }
});

// node_modules/lit-html/directives/live.js
var l4 = e5(class extends i6 {
  constructor(r8) {
    if (super(r8), r8.type !== t4.PROPERTY && r8.type !== t4.ATTRIBUTE && r8.type !== t4.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!f3(r8)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r8) {
    return r8;
  }
  update(i13, [t7]) {
    if (t7 === T || t7 === E) return t7;
    const o18 = i13.element, l6 = i13.name;
    if (i13.type === t4.PROPERTY) {
      if (t7 === o18[l6]) return T;
    } else if (i13.type === t4.BOOLEAN_ATTRIBUTE) {
      if (!!t7 === o18.hasAttribute(l6)) return T;
    } else if (i13.type === t4.ATTRIBUTE && o18.getAttribute(l6) === t7 + "") return T;
    return m2(i13), t7;
  }
});

// node_modules/lit-html/directives/map.js
function* o10(o18, f5) {
  if (void 0 !== o18) {
    let i13 = 0;
    for (const t7 of o18) yield f5(t7, i13++);
  }
}

// node_modules/lit-html/directives/range.js
function* o11(o18, t7, e10 = 1) {
  const i13 = void 0 === t7 ? 0 : o18;
  t7 != null ? t7 : t7 = o18;
  for (let o19 = i13; e10 > 0 ? o19 < t7 : t7 < o19; o19 += e10) yield o19;
}

// node_modules/lit-html/directives/ref.js
var e8 = () => new h7();
var h7 = class {
};
var o12 = /* @__PURE__ */ new WeakMap();
var n7 = e5(class extends f4 {
  render(i13) {
    return E;
  }
  update(i13, [s9]) {
    var _a6;
    const e10 = s9 !== this.G;
    return e10 && void 0 !== this.G && this.rt(void 0), (e10 || this.lt !== this.ct) && (this.G = s9, this.ht = (_a6 = i13.options) == null ? void 0 : _a6.host, this.rt(this.ct = i13.element)), E;
  }
  rt(t7) {
    var _a6;
    if (this.isConnected || (t7 = void 0), "function" == typeof this.G) {
      const i13 = (_a6 = this.ht) != null ? _a6 : globalThis;
      let s9 = o12.get(i13);
      void 0 === s9 && (s9 = /* @__PURE__ */ new WeakMap(), o12.set(i13, s9)), void 0 !== s9.get(this.G) && this.G.call(this.ht, void 0), s9.set(this.G, t7), void 0 !== t7 && this.G.call(this.ht, t7);
    } else this.G.value = t7;
  }
  get lt() {
    var _a6, _b2, _c;
    return "function" == typeof this.G ? (_b2 = o12.get((_a6 = this.ht) != null ? _a6 : globalThis)) == null ? void 0 : _b2.get(this.G) : (_c = this.G) == null ? void 0 : _c.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});

// node_modules/lit-html/directives/repeat.js
var u4 = (e10, s9, t7) => {
  const r8 = /* @__PURE__ */ new Map();
  for (let l6 = s9; l6 <= t7; l6++) r8.set(e10[l6], l6);
  return r8;
};
var c7 = e5(class extends i6 {
  constructor(e10) {
    if (super(e10), e10.type !== t4.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e10, s9, t7) {
    let r8;
    void 0 === t7 ? t7 = s9 : void 0 !== s9 && (r8 = s9);
    const l6 = [], o18 = [];
    let i13 = 0;
    for (const s10 of e10) l6[i13] = r8 ? r8(s10, i13) : i13, o18[i13] = t7(s10, i13), i13++;
    return { values: o18, keys: l6 };
  }
  render(e10, s9, t7) {
    return this.dt(e10, s9, t7).values;
  }
  update(s9, [t7, r8, c10]) {
    var _a6;
    const d5 = p3(s9), { values: p4, keys: a4 } = this.dt(t7, r8, c10);
    if (!Array.isArray(d5)) return this.ut = a4, p4;
    const h10 = (_a6 = this.ut) != null ? _a6 : this.ut = [], v3 = [];
    let m4, y3, x2 = 0, j2 = d5.length - 1, k2 = 0, w2 = p4.length - 1;
    for (; x2 <= j2 && k2 <= w2; ) if (null === d5[x2]) x2++;
    else if (null === d5[j2]) j2--;
    else if (h10[x2] === a4[k2]) v3[k2] = v2(d5[x2], p4[k2]), x2++, k2++;
    else if (h10[j2] === a4[w2]) v3[w2] = v2(d5[j2], p4[w2]), j2--, w2--;
    else if (h10[x2] === a4[w2]) v3[w2] = v2(d5[x2], p4[w2]), s4(s9, v3[w2 + 1], d5[x2]), x2++, w2--;
    else if (h10[j2] === a4[k2]) v3[k2] = v2(d5[j2], p4[k2]), s4(s9, d5[x2], d5[j2]), j2--, k2++;
    else if (void 0 === m4 && (m4 = u4(a4, k2, w2), y3 = u4(h10, x2, j2)), m4.has(h10[x2])) if (m4.has(h10[j2])) {
      const e10 = y3.get(a4[k2]), t8 = void 0 !== e10 ? d5[e10] : null;
      if (null === t8) {
        const e11 = s4(s9, d5[x2]);
        v2(e11, p4[k2]), v3[k2] = e11;
      } else v3[k2] = v2(t8, p4[k2]), s4(s9, d5[x2], t8), d5[e10] = null;
      k2++;
    } else M2(d5[j2]), j2--;
    else M2(d5[x2]), x2++;
    for (; k2 <= w2; ) {
      const e10 = s4(s9, v3[w2 + 1]);
      v2(e10, p4[k2]), v3[k2++] = e10;
    }
    for (; x2 <= j2; ) {
      const e10 = d5[x2++];
      null !== e10 && M2(e10);
    }
    return this.ut = a4, m2(s9, v3), T;
  }
});

// node_modules/lit-html/directives/style-map.js
var n8 = "important";
var i10 = " !" + n8;
var o13 = e5(class extends i6 {
  constructor(t7) {
    var _a6;
    if (super(t7), t7.type !== t4.ATTRIBUTE || "style" !== t7.name || ((_a6 = t7.strings) == null ? void 0 : _a6.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t7) {
    return Object.keys(t7).reduce(((e10, r8) => {
      const s9 = t7[r8];
      return null == s9 ? e10 : e10 + `${r8 = r8.includes("-") ? r8 : r8.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s9};`;
    }), "");
  }
  update(e10, [r8]) {
    const { style: s9 } = e10.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r8)), this.render(r8);
    for (const t7 of this.ft) null == r8[t7] && (this.ft.delete(t7), t7.includes("-") ? s9.removeProperty(t7) : s9[t7] = null);
    for (const t7 in r8) {
      const e11 = r8[t7];
      if (null != e11) {
        this.ft.add(t7);
        const r9 = "string" == typeof e11 && e11.endsWith(i10);
        t7.includes("-") || r9 ? s9.setProperty(t7, r9 ? e11.slice(0, -11) : e11, r9 ? n8 : "") : s9[t7] = e11;
      }
    }
    return T;
  }
});

// node_modules/lit-html/directives/template-content.js
var o14 = e5(class extends i6 {
  constructor(t7) {
    if (super(t7), t7.type !== t4.CHILD) throw Error("templateContent can only be used in child bindings");
  }
  render(r8) {
    return this.vt === r8 ? T : (this.vt = r8, document.importNode(r8.content, true));
  }
});

// node_modules/lit-html/directives/unsafe-html.js
var e9 = class extends i6 {
  constructor(i13) {
    if (super(i13), this.it = E, i13.type !== t4.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r8) {
    if (r8 === E || null == r8) return this._t = void 0, this.it = r8;
    if (r8 === T) return r8;
    if ("string" != typeof r8) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r8 === this.it) return this._t;
    this.it = r8;
    const s9 = [r8];
    return s9.raw = s9, this._t = { _$litType$: this.constructor.resultType, strings: s9, values: [] };
  }
};
e9.directiveName = "unsafeHTML", e9.resultType = 1;
var o15 = e5(e9);

// node_modules/lit-html/directives/unsafe-svg.js
var t6 = class extends e9 {
};
t6.directiveName = "unsafeSVG", t6.resultType = 2;
var o16 = e5(t6);

// node_modules/lit-html/directives/until.js
var n9 = (t7) => !i5(t7) && "function" == typeof t7.then;
var h8 = 1073741823;
var c8 = class extends f4 {
  constructor() {
    super(...arguments), this._$Cwt = h8, this._$Cbt = [], this._$CK = new s6(this), this._$CX = new i7();
  }
  render(...s9) {
    var _a6;
    return (_a6 = s9.find(((t7) => !n9(t7)))) != null ? _a6 : T;
  }
  update(s9, i13) {
    const e10 = this._$Cbt;
    let r8 = e10.length;
    this._$Cbt = i13;
    const o18 = this._$CK, c10 = this._$CX;
    this.isConnected || this.disconnected();
    for (let t7 = 0; t7 < i13.length && !(t7 > this._$Cwt); t7++) {
      const s10 = i13[t7];
      if (!n9(s10)) return this._$Cwt = t7, s10;
      t7 < r8 && s10 === e10[t7] || (this._$Cwt = h8, r8 = 0, Promise.resolve(s10).then((async (t8) => {
        for (; c10.get(); ) await c10.get();
        const i14 = o18.deref();
        if (void 0 !== i14) {
          const e11 = i14._$Cbt.indexOf(s10);
          e11 > -1 && e11 < i14._$Cwt && (i14._$Cwt = e11, i14.setValue(t8));
        }
      })));
    }
    return T;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
};
var m3 = e5(c8);

// node_modules/lit-html/directives/when.js
function n10(n12, r8, t7) {
  return n12 ? r8(n12) : t7 == null ? void 0 : t7(n12);
}

// node_modules/lit-html/static.js
var a3 = Symbol.for("");
var o17 = (t7) => {
  if ((t7 == null ? void 0 : t7.r) === a3) return t7 == null ? void 0 : t7._$litStatic$;
};
var s7 = (t7) => ({ _$litStatic$: t7, r: a3 });
var i11 = (t7, ...r8) => ({ _$litStatic$: r8.reduce(((r9, e10, a4) => r9 + ((t8) => {
  if (void 0 !== t8._$litStatic$) return t8._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t8}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e10) + t7[a4 + 1]), t7[0]), r: a3 });
var l5 = /* @__PURE__ */ new Map();
var n11 = (t7) => (r8, ...e10) => {
  const a4 = e10.length;
  let s9, i13;
  const n12 = [], u6 = [];
  let c10, $3 = 0, f5 = false;
  for (; $3 < a4; ) {
    for (c10 = r8[$3]; $3 < a4 && void 0 !== (i13 = e10[$3], s9 = o17(i13)); ) c10 += s9 + r8[++$3], f5 = true;
    $3 !== a4 && u6.push(i13), n12.push(c10), $3++;
  }
  if ($3 === a4 && n12.push(r8[a4]), f5) {
    const t8 = n12.join("$$lit$$");
    void 0 === (r8 = l5.get(t8)) && (n12.raw = n12, l5.set(t8, r8 = n12)), e10 = u6;
  }
  return t7(r8, ...e10);
};
var u5 = n11(x);
var c9 = n11(b2);
var $2 = n11(w);

// node_modules/lit/development/index.all.js
if (!window.litDisableBundleWarning) {
  console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");
}

// node_modules/@lit/task/task.js
var s8 = { INITIAL: 0, PENDING: 1, COMPLETE: 2, ERROR: 3 };
var i12 = Symbol();
var h9 = class {
  get taskComplete() {
    return this.t || (1 === this.i ? this.t = new Promise(((t7, s9) => {
      this.o = t7, this.h = s9;
    })) : 3 === this.i ? this.t = Promise.reject(this.l) : this.t = Promise.resolve(this.u)), this.t;
  }
  constructor(t7, s9, i13) {
    var _a6, _b2, _c;
    this.p = 0, this.i = 0, (this._ = t7).addController(this);
    const h10 = "object" == typeof s9 ? s9 : { task: s9, args: i13 };
    this.v = h10.task, this.j = h10.args, this.m = (_a6 = h10.argsEqual) != null ? _a6 : r7, this.k = h10.onComplete, this.A = h10.onError, this.autoRun = (_b2 = h10.autoRun) != null ? _b2 : true, "initialValue" in h10 && (this.u = h10.initialValue, this.i = 2, this.O = (_c = this.T) == null ? void 0 : _c.call(this));
  }
  hostUpdate() {
    true === this.autoRun && this.S();
  }
  hostUpdated() {
    "afterUpdate" === this.autoRun && this.S();
  }
  T() {
    if (void 0 === this.j) return;
    const t7 = this.j();
    if (!Array.isArray(t7)) throw Error("The args function must return an array");
    return t7;
  }
  async S() {
    const t7 = this.T(), s9 = this.O;
    this.O = t7, t7 === s9 || void 0 === t7 || void 0 !== s9 && this.m(s9, t7) || await this.run(t7);
  }
  async run(t7) {
    var _a6, _b2, _c, _d, _e;
    let s9, h10;
    t7 != null ? t7 : t7 = this.T(), this.O = t7, 1 === this.i ? (_a6 = this.q) == null ? void 0 : _a6.abort() : (this.t = void 0, this.o = void 0, this.h = void 0), this.i = 1, "afterUpdate" === this.autoRun ? queueMicrotask((() => this._.requestUpdate())) : this._.requestUpdate();
    const r8 = ++this.p;
    this.q = new AbortController();
    let e10 = false;
    try {
      s9 = await this.v(t7, { signal: this.q.signal });
    } catch (t8) {
      e10 = true, h10 = t8;
    }
    if (this.p === r8) {
      if (s9 === i12) this.i = 0;
      else {
        if (false === e10) {
          try {
            (_b2 = this.k) == null ? void 0 : _b2.call(this, s9);
          } catch {
          }
          this.i = 2, (_c = this.o) == null ? void 0 : _c.call(this, s9);
        } else {
          try {
            (_d = this.A) == null ? void 0 : _d.call(this, h10);
          } catch {
          }
          this.i = 3, (_e = this.h) == null ? void 0 : _e.call(this, h10);
        }
        this.u = s9, this.l = h10;
      }
      this._.requestUpdate();
    }
  }
  abort(t7) {
    var _a6;
    1 === this.i && ((_a6 = this.q) == null ? void 0 : _a6.abort(t7));
  }
  get value() {
    return this.u;
  }
  get error() {
    return this.l;
  }
  get status() {
    return this.i;
  }
  render(t7) {
    var _a6, _b2, _c, _d;
    switch (this.i) {
      case 0:
        return (_a6 = t7.initial) == null ? void 0 : _a6.call(t7);
      case 1:
        return (_b2 = t7.pending) == null ? void 0 : _b2.call(t7);
      case 2:
        return (_c = t7.complete) == null ? void 0 : _c.call(t7, this.value);
      case 3:
        return (_d = t7.error) == null ? void 0 : _d.call(t7, this.error);
      default:
        throw Error("Unexpected status: " + this.i);
    }
  }
};
var r7 = (s9, i13) => s9 === i13 || s9.length === i13.length && s9.every(((s10, h10) => !f(s10, i13[h10])));
export {
  f4 as AsyncDirective,
  o7 as AsyncReplaceDirective,
  n as CSSResult,
  i6 as Directive,
  i4 as LitElement,
  t4 as PartType,
  y as ReactiveElement,
  h9 as Task,
  s8 as TaskStatus,
  n5 as TemplateResultType,
  e9 as UnsafeHTMLDirective,
  c8 as UntilDirective,
  n4 as _$LE,
  Z as _$LH,
  S as adoptStyles,
  c6 as asyncAppend,
  h5 as asyncReplace,
  h6 as cache,
  r6 as choose,
  e6 as classMap,
  h3 as clearPart,
  e8 as createRef,
  i as css,
  u as defaultConverter,
  e5 as directive,
  p3 as getCommittedValue,
  c as getCompatibleStyle,
  c4 as getDirectiveClass,
  i8 as guard,
  x as html,
  o8 as ifDefined,
  i12 as initialState,
  s4 as insertPart,
  l3 as isCompiledTemplateResult,
  d3 as isDirectiveResult,
  i5 as isPrimitive,
  o5 as isServer,
  f3 as isSingleExpression,
  e4 as isTemplateResult,
  o9 as join,
  i9 as keyed,
  i11 as literal,
  l4 as live,
  o10 as map,
  w as mathml,
  T as noChange,
  f as notEqual,
  E as nothing,
  o11 as range,
  n7 as ref,
  M2 as removePart,
  B as render,
  c7 as repeat,
  v2 as setChildPartValue,
  m2 as setCommittedValue,
  r7 as shallowArrayEquals,
  u5 as staticHtml,
  c9 as staticSvg,
  o13 as styleMap,
  e as supportsAdoptingStyleSheets,
  b2 as svg,
  o14 as templateContent,
  r as unsafeCSS,
  o15 as unsafeHTML,
  o16 as unsafeSVG,
  s7 as unsafeStatic,
  m3 as until,
  n10 as when,
  n11 as withStatic
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
lit-html/async-directive.js:
lit-html/directives/async-replace.js:
lit-html/directives/async-append.js:
lit-html/directives/cache.js:
lit-html/directives/repeat.js:
lit-html/directives/unsafe-html.js:
lit-html/directives/unsafe-svg.js:
lit-html/directives/until.js:
@lit/task/task.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit/development/index.js:
lit/development/async-directive.js:
lit/development/directive-helpers.js:
lit/development/directive.js:
lit-html/directives/private-async-helpers.js:
lit/development/directives/async-append.js:
lit/development/directives/async-replace.js:
lit/development/directives/cache.js:
lit-html/directives/choose.js:
lit/development/directives/choose.js:
lit/development/directives/class-map.js:
lit/development/directives/guard.js:
lit/development/directives/if-defined.js:
lit-html/directives/join.js:
lit/development/directives/join.js:
lit-html/directives/keyed.js:
lit/development/directives/keyed.js:
lit/development/directives/live.js:
lit-html/directives/map.js:
lit/development/directives/map.js:
lit-html/directives/range.js:
lit/development/directives/range.js:
lit/development/directives/ref.js:
lit/development/directives/repeat.js:
lit/development/directives/style-map.js:
lit/development/directives/template-content.js:
lit/development/directives/unsafe-html.js:
lit/development/directives/unsafe-svg.js:
lit/development/directives/until.js:
lit-html/directives/when.js:
lit/development/directives/when.js:
lit/development/static-html.js:
lit/development/index.all.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
lit-html/directives/ref.js:
lit-html/directives/template-content.js:
lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/guard.js:
lit-html/directives/if-defined.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=litt-all.js.map
