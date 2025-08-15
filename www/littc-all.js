// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t8, e12, o18) {
    if (this._$cssResult$ = true, o18 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t8, this.t = e12;
  }
  get styleSheet() {
    let t8 = this.o;
    const s12 = this.t;
    if (e && void 0 === t8) {
      const e12 = void 0 !== s12 && 1 === s12.length;
      e12 && (t8 = o.get(s12)), void 0 === t8 && ((this.o = t8 = new CSSStyleSheet()).replaceSync(this.cssText), e12 && o.set(s12, t8));
    }
    return t8;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t8) => new n("string" == typeof t8 ? t8 : t8 + "", void 0, s);
var i = (t8, ...e12) => {
  const o18 = 1 === t8.length ? t8[0] : e12.reduce(((e13, s12, o19) => e13 + ((t9) => {
    if (true === t9._$cssResult$) return t9.cssText;
    if ("number" == typeof t9) return t9;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t9 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s12) + t8[o19 + 1]), t8[0]);
  return new n(o18, t8, s);
};
var S = (s12, o18) => {
  if (e) s12.adoptedStyleSheets = o18.map(((t8) => t8 instanceof CSSStyleSheet ? t8 : t8.styleSheet));
  else for (const e12 of o18) {
    const o19 = document.createElement("style"), n13 = t.litNonce;
    void 0 !== n13 && o19.setAttribute("nonce", n13), o19.textContent = e12.cssText, s12.appendChild(o19);
  }
};
var c = e ? (t8) => t8 : (t8) => t8 instanceof CSSStyleSheet ? ((t9) => {
  let e12 = "";
  for (const s12 of t9.cssRules) e12 += s12.cssText;
  return r(e12);
})(t8) : t8;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t8, s12) => t8;
var u = { toAttribute(t8, s12) {
  switch (s12) {
    case Boolean:
      t8 = t8 ? l : null;
      break;
    case Object:
    case Array:
      t8 = null == t8 ? t8 : JSON.stringify(t8);
  }
  return t8;
}, fromAttribute(t8, s12) {
  let i14 = t8;
  switch (s12) {
    case Boolean:
      i14 = null !== t8;
      break;
    case Number:
      i14 = null === t8 ? null : Number(t8);
      break;
    case Object:
    case Array:
      try {
        i14 = JSON.parse(t8);
      } catch (t9) {
        i14 = null;
      }
  }
  return i14;
} };
var f = (t8, s12) => !i2(t8, s12);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
var _a, _b;
(_a = Symbol.metadata) != null ? _a : Symbol.metadata = Symbol("metadata"), (_b = a.litPropertyMetadata) != null ? _b : a.litPropertyMetadata = /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t8) {
    var _a6;
    this._$Ei(), ((_a6 = this.l) != null ? _a6 : this.l = []).push(t8);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t8, s12 = b) {
    if (s12.state && (s12.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t8) && ((s12 = Object.create(s12)).wrapped = true), this.elementProperties.set(t8, s12), !s12.noAccessor) {
      const i14 = Symbol(), h10 = this.getPropertyDescriptor(t8, i14, s12);
      void 0 !== h10 && e2(this.prototype, t8, h10);
    }
  }
  static getPropertyDescriptor(t8, s12, i14) {
    var _a6;
    const { get: e12, set: r8 } = (_a6 = h(this.prototype, t8)) != null ? _a6 : { get() {
      return this[s12];
    }, set(t9) {
      this[s12] = t9;
    } };
    return { get: e12, set(s13) {
      const h10 = e12 == null ? void 0 : e12.call(this);
      r8 == null ? void 0 : r8.call(this, s13), this.requestUpdate(t8, h10, i14);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t8) {
    var _a6;
    return (_a6 = this.elementProperties.get(t8)) != null ? _a6 : b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t8 = n2(this);
    t8.finalize(), void 0 !== t8.l && (this.l = [...t8.l]), this.elementProperties = new Map(t8.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t9 = this.properties, s12 = [...r2(t9), ...o2(t9)];
      for (const i14 of s12) this.createProperty(i14, t9[i14]);
    }
    const t8 = this[Symbol.metadata];
    if (null !== t8) {
      const s12 = litPropertyMetadata.get(t8);
      if (void 0 !== s12) for (const [t9, i14] of s12) this.elementProperties.set(t9, i14);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t9, s12] of this.elementProperties) {
      const i14 = this._$Eu(t9, s12);
      void 0 !== i14 && this._$Eh.set(i14, t9);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s12) {
    const i14 = [];
    if (Array.isArray(s12)) {
      const e12 = new Set(s12.flat(1 / 0).reverse());
      for (const s13 of e12) i14.unshift(c(s13));
    } else void 0 !== s12 && i14.push(c(s12));
    return i14;
  }
  static _$Eu(t8, s12) {
    const i14 = s12.attribute;
    return false === i14 ? void 0 : "string" == typeof i14 ? i14 : "string" == typeof t8 ? t8.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a6;
    this._$ES = new Promise(((t8) => this.enableUpdating = t8)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a6 = this.constructor.l) == null ? void 0 : _a6.forEach(((t8) => t8(this)));
  }
  addController(t8) {
    var _a6, _b2;
    ((_a6 = this._$EO) != null ? _a6 : this._$EO = /* @__PURE__ */ new Set()).add(t8), void 0 !== this.renderRoot && this.isConnected && ((_b2 = t8.hostConnected) == null ? void 0 : _b2.call(t8));
  }
  removeController(t8) {
    var _a6;
    (_a6 = this._$EO) == null ? void 0 : _a6.delete(t8);
  }
  _$E_() {
    const t8 = /* @__PURE__ */ new Map(), s12 = this.constructor.elementProperties;
    for (const i14 of s12.keys()) this.hasOwnProperty(i14) && (t8.set(i14, this[i14]), delete this[i14]);
    t8.size > 0 && (this._$Ep = t8);
  }
  createRenderRoot() {
    var _a6;
    const t8 = (_a6 = this.shadowRoot) != null ? _a6 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(t8, this.constructor.elementStyles), t8;
  }
  connectedCallback() {
    var _a6, _b2;
    (_a6 = this.renderRoot) != null ? _a6 : this.renderRoot = this.createRenderRoot(), this.enableUpdating(true), (_b2 = this._$EO) == null ? void 0 : _b2.forEach(((t8) => {
      var _a7;
      return (_a7 = t8.hostConnected) == null ? void 0 : _a7.call(t8);
    }));
  }
  enableUpdating(t8) {
  }
  disconnectedCallback() {
    var _a6;
    (_a6 = this._$EO) == null ? void 0 : _a6.forEach(((t8) => {
      var _a7;
      return (_a7 = t8.hostDisconnected) == null ? void 0 : _a7.call(t8);
    }));
  }
  attributeChangedCallback(t8, s12, i14) {
    this._$AK(t8, i14);
  }
  _$ET(t8, s12) {
    var _a6;
    const i14 = this.constructor.elementProperties.get(t8), e12 = this.constructor._$Eu(t8, i14);
    if (void 0 !== e12 && true === i14.reflect) {
      const h10 = (void 0 !== ((_a6 = i14.converter) == null ? void 0 : _a6.toAttribute) ? i14.converter : u).toAttribute(s12, i14.type);
      this._$Em = t8, null == h10 ? this.removeAttribute(e12) : this.setAttribute(e12, h10), this._$Em = null;
    }
  }
  _$AK(t8, s12) {
    var _a6, _b2, _c;
    const i14 = this.constructor, e12 = i14._$Eh.get(t8);
    if (void 0 !== e12 && this._$Em !== e12) {
      const t9 = i14.getPropertyOptions(e12), h10 = "function" == typeof t9.converter ? { fromAttribute: t9.converter } : void 0 !== ((_a6 = t9.converter) == null ? void 0 : _a6.fromAttribute) ? t9.converter : u;
      this._$Em = e12;
      const r8 = h10.fromAttribute(s12, t9.type);
      this[e12] = (_c = r8 != null ? r8 : (_b2 = this._$Ej) == null ? void 0 : _b2.get(e12)) != null ? _c : r8, this._$Em = null;
    }
  }
  requestUpdate(t8, s12, i14) {
    var _a6, _b2;
    if (void 0 !== t8) {
      const e12 = this.constructor, h10 = this[t8];
      if (i14 != null ? i14 : i14 = e12.getPropertyOptions(t8), !(((_a6 = i14.hasChanged) != null ? _a6 : f)(h10, s12) || i14.useDefault && i14.reflect && h10 === ((_b2 = this._$Ej) == null ? void 0 : _b2.get(t8)) && !this.hasAttribute(e12._$Eu(t8, i14)))) return;
      this.C(t8, s12, i14);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t8, s12, { useDefault: i14, reflect: e12, wrapped: h10 }, r8) {
    var _a6, _b2, _c;
    i14 && !((_a6 = this._$Ej) != null ? _a6 : this._$Ej = /* @__PURE__ */ new Map()).has(t8) && (this._$Ej.set(t8, (_b2 = r8 != null ? r8 : s12) != null ? _b2 : this[t8]), true !== h10 || void 0 !== r8) || (this._$AL.has(t8) || (this.hasUpdated || i14 || (s12 = void 0), this._$AL.set(t8, s12)), true === e12 && this._$Em !== t8 && ((_c = this._$Eq) != null ? _c : this._$Eq = /* @__PURE__ */ new Set()).add(t8));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t9) {
      Promise.reject(t9);
    }
    const t8 = this.scheduleUpdate();
    return null != t8 && await t8, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a6, _b2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((_a6 = this.renderRoot) != null ? _a6 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
        for (const [t10, s13] of this._$Ep) this[t10] = s13;
        this._$Ep = void 0;
      }
      const t9 = this.constructor.elementProperties;
      if (t9.size > 0) for (const [s13, i14] of t9) {
        const { wrapped: t10 } = i14, e12 = this[s13];
        true !== t10 || this._$AL.has(s13) || void 0 === e12 || this.C(s13, void 0, i14, e12);
      }
    }
    let t8 = false;
    const s12 = this._$AL;
    try {
      t8 = this.shouldUpdate(s12), t8 ? (this.willUpdate(s12), (_b2 = this._$EO) == null ? void 0 : _b2.forEach(((t9) => {
        var _a7;
        return (_a7 = t9.hostUpdate) == null ? void 0 : _a7.call(t9);
      })), this.update(s12)) : this._$EM();
    } catch (s13) {
      throw t8 = false, this._$EM(), s13;
    }
    t8 && this._$AE(s12);
  }
  willUpdate(t8) {
  }
  _$AE(t8) {
    var _a6;
    (_a6 = this._$EO) == null ? void 0 : _a6.forEach(((t9) => {
      var _a7;
      return (_a7 = t9.hostUpdated) == null ? void 0 : _a7.call(t9);
    })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t8)), this.updated(t8);
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
  shouldUpdate(t8) {
    return true;
  }
  update(t8) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((t9) => this._$ET(t9, this[t9])))), this._$EM();
  }
  updated(t8) {
  }
  firstUpdated(t8) {
  }
};
var _a2;
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: y }), ((_a2 = a.reactiveElementVersions) != null ? _a2 : a.reactiveElementVersions = []).push("2.1.1");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = t2.trustedTypes;
var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t8) => t8 }) : void 0;
var e3 = "$lit$";
var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = document;
var l2 = () => r3.createComment("");
var c3 = (t8) => null === t8 || "object" != typeof t8 && "function" != typeof t8;
var a2 = Array.isArray;
var u2 = (t8) => a2(t8) || "function" == typeof (t8 == null ? void 0 : t8[Symbol.iterator]);
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t8) => (i14, ...s12) => ({ _$litType$: t8, strings: i14, values: s12 });
var x = y2(1);
var b2 = y2(2);
var w = y2(3);
var T = Symbol.for("lit-noChange");
var E = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129);
function P(t8, i14) {
  if (!a2(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i14) : i14;
}
var V = (t8, i14) => {
  const s12 = t8.length - 1, o18 = [];
  let r8, l6 = 2 === i14 ? "<svg>" : 3 === i14 ? "<math>" : "", c11 = f2;
  for (let i15 = 0; i15 < s12; i15++) {
    const s13 = t8[i15];
    let a4, u6, d5 = -1, y3 = 0;
    for (; y3 < s13.length && (c11.lastIndex = y3, u6 = c11.exec(s13), null !== u6); ) y3 = c11.lastIndex, c11 === f2 ? "!--" === u6[1] ? c11 = v : void 0 !== u6[1] ? c11 = _ : void 0 !== u6[2] ? ($.test(u6[2]) && (r8 = RegExp("</" + u6[2], "g")), c11 = m) : void 0 !== u6[3] && (c11 = m) : c11 === m ? ">" === u6[0] ? (c11 = r8 != null ? r8 : f2, d5 = -1) : void 0 === u6[1] ? d5 = -2 : (d5 = c11.lastIndex - u6[2].length, a4 = u6[1], c11 = void 0 === u6[3] ? m : '"' === u6[3] ? g : p2) : c11 === g || c11 === p2 ? c11 = m : c11 === v || c11 === _ ? c11 = f2 : (c11 = m, r8 = void 0);
    const x2 = c11 === m && t8[i15 + 1].startsWith("/>") ? " " : "";
    l6 += c11 === f2 ? s13 + n3 : d5 >= 0 ? (o18.push(a4), s13.slice(0, d5) + e3 + s13.slice(d5) + h2 + x2) : s13 + h2 + (-2 === d5 ? i15 : x2);
  }
  return [P(t8, l6 + (t8[s12] || "<?>") + (2 === i14 ? "</svg>" : 3 === i14 ? "</math>" : "")), o18];
};
var N = class _N {
  constructor({ strings: t8, _$litType$: s12 }, n13) {
    let r8;
    this.parts = [];
    let c11 = 0, a4 = 0;
    const u6 = t8.length - 1, d5 = this.parts, [f5, v3] = V(t8, s12);
    if (this.el = _N.createElement(f5, n13), C.currentNode = this.el.content, 2 === s12 || 3 === s12) {
      const t9 = this.el.content.firstChild;
      t9.replaceWith(...t9.childNodes);
    }
    for (; null !== (r8 = C.nextNode()) && d5.length < u6; ) {
      if (1 === r8.nodeType) {
        if (r8.hasAttributes()) for (const t9 of r8.getAttributeNames()) if (t9.endsWith(e3)) {
          const i14 = v3[a4++], s13 = r8.getAttribute(t9).split(h2), e12 = /([.?@])?(.*)/.exec(i14);
          d5.push({ type: 1, index: c11, name: e12[2], strings: s13, ctor: "." === e12[1] ? H : "?" === e12[1] ? I : "@" === e12[1] ? L : k }), r8.removeAttribute(t9);
        } else t9.startsWith(h2) && (d5.push({ type: 6, index: c11 }), r8.removeAttribute(t9));
        if ($.test(r8.tagName)) {
          const t9 = r8.textContent.split(h2), s13 = t9.length - 1;
          if (s13 > 0) {
            r8.textContent = i3 ? i3.emptyScript : "";
            for (let i14 = 0; i14 < s13; i14++) r8.append(t9[i14], l2()), C.nextNode(), d5.push({ type: 2, index: ++c11 });
            r8.append(t9[s13], l2());
          }
        }
      } else if (8 === r8.nodeType) if (r8.data === o3) d5.push({ type: 2, index: c11 });
      else {
        let t9 = -1;
        for (; -1 !== (t9 = r8.data.indexOf(h2, t9 + 1)); ) d5.push({ type: 7, index: c11 }), t9 += h2.length - 1;
      }
      c11++;
    }
  }
  static createElement(t8, i14) {
    const s12 = r3.createElement("template");
    return s12.innerHTML = t8, s12;
  }
};
function S2(t8, i14, s12 = t8, e12) {
  var _a6, _b2, _c;
  if (i14 === T) return i14;
  let h10 = void 0 !== e12 ? (_a6 = s12._$Co) == null ? void 0 : _a6[e12] : s12._$Cl;
  const o18 = c3(i14) ? void 0 : i14._$litDirective$;
  return (h10 == null ? void 0 : h10.constructor) !== o18 && ((_b2 = h10 == null ? void 0 : h10._$AO) == null ? void 0 : _b2.call(h10, false), void 0 === o18 ? h10 = void 0 : (h10 = new o18(t8), h10._$AT(t8, s12, e12)), void 0 !== e12 ? ((_c = s12._$Co) != null ? _c : s12._$Co = [])[e12] = h10 : s12._$Cl = h10), void 0 !== h10 && (i14 = S2(t8, h10._$AS(t8, i14.values), h10, e12)), i14;
}
var M = class {
  constructor(t8, i14) {
    this._$AV = [], this._$AN = void 0, this._$AD = t8, this._$AM = i14;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t8) {
    var _a6;
    const { el: { content: i14 }, parts: s12 } = this._$AD, e12 = ((_a6 = t8 == null ? void 0 : t8.creationScope) != null ? _a6 : r3).importNode(i14, true);
    C.currentNode = e12;
    let h10 = C.nextNode(), o18 = 0, n13 = 0, l6 = s12[0];
    for (; void 0 !== l6; ) {
      if (o18 === l6.index) {
        let i15;
        2 === l6.type ? i15 = new R(h10, h10.nextSibling, this, t8) : 1 === l6.type ? i15 = new l6.ctor(h10, l6.name, l6.strings, this, t8) : 6 === l6.type && (i15 = new z(h10, this, t8)), this._$AV.push(i15), l6 = s12[++n13];
      }
      o18 !== (l6 == null ? void 0 : l6.index) && (h10 = C.nextNode(), o18++);
    }
    return C.currentNode = r3, e12;
  }
  p(t8) {
    let i14 = 0;
    for (const s12 of this._$AV) void 0 !== s12 && (void 0 !== s12.strings ? (s12._$AI(t8, s12, i14), i14 += s12.strings.length - 2) : s12._$AI(t8[i14])), i14++;
  }
};
var R = class _R {
  get _$AU() {
    var _a6, _b2;
    return (_b2 = (_a6 = this._$AM) == null ? void 0 : _a6._$AU) != null ? _b2 : this._$Cv;
  }
  constructor(t8, i14, s12, e12) {
    var _a6;
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t8, this._$AB = i14, this._$AM = s12, this.options = e12, this._$Cv = (_a6 = e12 == null ? void 0 : e12.isConnected) != null ? _a6 : true;
  }
  get parentNode() {
    let t8 = this._$AA.parentNode;
    const i14 = this._$AM;
    return void 0 !== i14 && 11 === (t8 == null ? void 0 : t8.nodeType) && (t8 = i14.parentNode), t8;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t8, i14 = this) {
    t8 = S2(this, t8, i14), c3(t8) ? t8 === E || null == t8 || "" === t8 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t8 !== this._$AH && t8 !== T && this._(t8) : void 0 !== t8._$litType$ ? this.$(t8) : void 0 !== t8.nodeType ? this.T(t8) : u2(t8) ? this.k(t8) : this._(t8);
  }
  O(t8) {
    return this._$AA.parentNode.insertBefore(t8, this._$AB);
  }
  T(t8) {
    this._$AH !== t8 && (this._$AR(), this._$AH = this.O(t8));
  }
  _(t8) {
    this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t8 : this.T(r3.createTextNode(t8)), this._$AH = t8;
  }
  $(t8) {
    var _a6;
    const { values: i14, _$litType$: s12 } = t8, e12 = "number" == typeof s12 ? this._$AC(t8) : (void 0 === s12.el && (s12.el = N.createElement(P(s12.h, s12.h[0]), this.options)), s12);
    if (((_a6 = this._$AH) == null ? void 0 : _a6._$AD) === e12) this._$AH.p(i14);
    else {
      const t9 = new M(e12, this), s13 = t9.u(this.options);
      t9.p(i14), this.T(s13), this._$AH = t9;
    }
  }
  _$AC(t8) {
    let i14 = A.get(t8.strings);
    return void 0 === i14 && A.set(t8.strings, i14 = new N(t8)), i14;
  }
  k(t8) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i14 = this._$AH;
    let s12, e12 = 0;
    for (const h10 of t8) e12 === i14.length ? i14.push(s12 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s12 = i14[e12], s12._$AI(h10), e12++;
    e12 < i14.length && (this._$AR(s12 && s12._$AB.nextSibling, e12), i14.length = e12);
  }
  _$AR(t8 = this._$AA.nextSibling, i14) {
    var _a6;
    for ((_a6 = this._$AP) == null ? void 0 : _a6.call(this, false, true, i14); t8 !== this._$AB; ) {
      const i15 = t8.nextSibling;
      t8.remove(), t8 = i15;
    }
  }
  setConnected(t8) {
    var _a6;
    void 0 === this._$AM && (this._$Cv = t8, (_a6 = this._$AP) == null ? void 0 : _a6.call(this, t8));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t8, i14, s12, e12, h10) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t8, this.name = i14, this._$AM = e12, this.options = h10, s12.length > 2 || "" !== s12[0] || "" !== s12[1] ? (this._$AH = Array(s12.length - 1).fill(new String()), this.strings = s12) : this._$AH = E;
  }
  _$AI(t8, i14 = this, s12, e12) {
    const h10 = this.strings;
    let o18 = false;
    if (void 0 === h10) t8 = S2(this, t8, i14, 0), o18 = !c3(t8) || t8 !== this._$AH && t8 !== T, o18 && (this._$AH = t8);
    else {
      const e13 = t8;
      let n13, r8;
      for (t8 = h10[0], n13 = 0; n13 < h10.length - 1; n13++) r8 = S2(this, e13[s12 + n13], i14, n13), r8 === T && (r8 = this._$AH[n13]), o18 || (o18 = !c3(r8) || r8 !== this._$AH[n13]), r8 === E ? t8 = E : t8 !== E && (t8 += (r8 != null ? r8 : "") + h10[n13 + 1]), this._$AH[n13] = r8;
    }
    o18 && !e12 && this.j(t8);
  }
  j(t8) {
    t8 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t8 != null ? t8 : "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t8) {
    this.element[this.name] = t8 === E ? void 0 : t8;
  }
};
var I = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t8) {
    this.element.toggleAttribute(this.name, !!t8 && t8 !== E);
  }
};
var L = class extends k {
  constructor(t8, i14, s12, e12, h10) {
    super(t8, i14, s12, e12, h10), this.type = 5;
  }
  _$AI(t8, i14 = this) {
    var _a6;
    if ((t8 = (_a6 = S2(this, t8, i14, 0)) != null ? _a6 : E) === T) return;
    const s12 = this._$AH, e12 = t8 === E && s12 !== E || t8.capture !== s12.capture || t8.once !== s12.once || t8.passive !== s12.passive, h10 = t8 !== E && (s12 === E || e12);
    e12 && this.element.removeEventListener(this.name, this, s12), h10 && this.element.addEventListener(this.name, this, t8), this._$AH = t8;
  }
  handleEvent(t8) {
    var _a6, _b2;
    "function" == typeof this._$AH ? this._$AH.call((_b2 = (_a6 = this.options) == null ? void 0 : _a6.host) != null ? _b2 : this.element, t8) : this._$AH.handleEvent(t8);
  }
};
var z = class {
  constructor(t8, i14, s12) {
    this.element = t8, this.type = 6, this._$AN = void 0, this._$AM = i14, this.options = s12;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t8) {
    S2(this, t8);
  }
};
var Z = { M: e3, P: h2, A: o3, C: 1, L: V, R: M, D: u2, V: S2, I: R, H: k, N: I, U: L, B: H, F: z };
var j = t2.litHtmlPolyfillSupport;
var _a3;
j == null ? void 0 : j(N, R), ((_a3 = t2.litHtmlVersions) != null ? _a3 : t2.litHtmlVersions = []).push("3.3.1");
var B = (t8, i14, s12) => {
  var _a6, _b2;
  const e12 = (_a6 = s12 == null ? void 0 : s12.renderBefore) != null ? _a6 : i14;
  let h10 = e12._$litPart$;
  if (void 0 === h10) {
    const t9 = (_b2 = s12 == null ? void 0 : s12.renderBefore) != null ? _b2 : null;
    e12._$litPart$ = h10 = new R(i14.insertBefore(l2(), t9), t9, void 0, s12 != null ? s12 : {});
  }
  return h10._$AI(t8), h10;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a6, _b2;
    const t8 = super.createRenderRoot();
    return (_b2 = (_a6 = this.renderOptions).renderBefore) != null ? _b2 : _a6.renderBefore = t8.firstChild, t8;
  }
  update(t8) {
    const r8 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t8), this._$Do = B(r8, this.renderRoot, this.renderOptions);
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
var n4 = { _$AK: (t8, e12, r8) => {
  t8._$AK(e12, r8);
}, _$AL: (t8) => t8._$AL };
var _a5;
((_a5 = s3.litElementVersions) != null ? _a5 : s3.litElementVersions = []).push("4.2.1");

// node_modules/lit-html/is-server.js
var o5 = false;

// node_modules/lit-html/directive-helpers.js
var { I: t3 } = Z;
var i5 = (o18) => null === o18 || "object" != typeof o18 && "function" != typeof o18;
var n5 = { HTML: 1, SVG: 2, MATHML: 3 };
var e4 = (o18, t8) => void 0 === t8 ? void 0 !== (o18 == null ? void 0 : o18._$litType$) : (o18 == null ? void 0 : o18._$litType$) === t8;
var l3 = (o18) => {
  var _a6;
  return null != ((_a6 = o18 == null ? void 0 : o18._$litType$) == null ? void 0 : _a6.h);
};
var d3 = (o18) => void 0 !== (o18 == null ? void 0 : o18._$litDirective$);
var c4 = (o18) => o18 == null ? void 0 : o18._$litDirective$;
var f3 = (o18) => void 0 === o18.strings;
var r4 = () => document.createComment("");
var s4 = (o18, i14, n13) => {
  var _a6;
  const e12 = o18._$AA.parentNode, l6 = void 0 === i14 ? o18._$AB : i14._$AA;
  if (void 0 === n13) {
    const i15 = e12.insertBefore(r4(), l6), d5 = e12.insertBefore(r4(), l6);
    n13 = new t3(i15, d5, o18, o18.options);
  } else {
    const t8 = n13._$AB.nextSibling, i15 = n13._$AM, d5 = i15 !== o18;
    if (d5) {
      let t9;
      (_a6 = n13._$AQ) == null ? void 0 : _a6.call(n13, o18), n13._$AM = o18, void 0 !== n13._$AP && (t9 = o18._$AU) !== i15._$AU && n13._$AP(t9);
    }
    if (t8 !== l6 || d5) {
      let o19 = n13._$AA;
      for (; o19 !== t8; ) {
        const t9 = o19.nextSibling;
        e12.insertBefore(o19, l6), o19 = t9;
      }
    }
  }
  return n13;
};
var v2 = (o18, t8, i14 = o18) => (o18._$AI(t8, i14), o18);
var u3 = {};
var m2 = (o18, t8 = u3) => o18._$AH = t8;
var p3 = (o18) => o18._$AH;
var M2 = (o18) => {
  o18._$AR(), o18._$AA.remove();
};
var h3 = (o18) => {
  o18._$AR();
};

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t8) => (...e12) => ({ _$litDirective$: t8, values: e12 });
var i6 = class {
  constructor(t8) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t8, e12, i14) {
    this._$Ct = t8, this._$AM = e12, this._$Ci = i14;
  }
  _$AS(t8, e12) {
    return this.update(t8, e12);
  }
  update(t8, e12) {
    return this.render(...e12);
  }
};

// node_modules/lit-html/async-directive.js
var s5 = (i14, t8) => {
  var _a6;
  const e12 = i14._$AN;
  if (void 0 === e12) return false;
  for (const i15 of e12) (_a6 = i15._$AO) == null ? void 0 : _a6.call(i15, t8, false), s5(i15, t8);
  return true;
};
var o6 = (i14) => {
  let t8, e12;
  do {
    if (void 0 === (t8 = i14._$AM)) break;
    e12 = t8._$AN, e12.delete(i14), i14 = t8;
  } while (0 === (e12 == null ? void 0 : e12.size));
};
var r5 = (i14) => {
  for (let t8; t8 = i14._$AM; i14 = t8) {
    let e12 = t8._$AN;
    if (void 0 === e12) t8._$AN = e12 = /* @__PURE__ */ new Set();
    else if (e12.has(i14)) break;
    e12.add(i14), c5(t8);
  }
};
function h4(i14) {
  void 0 !== this._$AN ? (o6(this), this._$AM = i14, r5(this)) : this._$AM = i14;
}
function n6(i14, t8 = false, e12 = 0) {
  const r8 = this._$AH, h10 = this._$AN;
  if (void 0 !== h10 && 0 !== h10.size) if (t8) if (Array.isArray(r8)) for (let i15 = e12; i15 < r8.length; i15++) s5(r8[i15], false), o6(r8[i15]);
  else null != r8 && (s5(r8, false), o6(r8));
  else s5(this, i14);
}
var c5 = (i14) => {
  var _a6, _b2;
  i14.type == t4.CHILD && ((_a6 = i14._$AP) != null ? _a6 : i14._$AP = n6, (_b2 = i14._$AQ) != null ? _b2 : i14._$AQ = h4);
};
var f4 = class extends i6 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i14, t8, e12) {
    super._$AT(i14, t8, e12), r5(this), this.isConnected = i14._$AU;
  }
  _$AO(i14, t8 = true) {
    var _a6, _b2;
    i14 !== this.isConnected && (this.isConnected = i14, i14 ? (_a6 = this.reconnected) == null ? void 0 : _a6.call(this) : (_b2 = this.disconnected) == null ? void 0 : _b2.call(this)), t8 && (s5(this, i14), o6(this));
  }
  setValue(t8) {
    if (f3(this._$Ct)) this._$Ct._$AI(t8, this);
    else {
      const i14 = [...this._$Ct._$AH];
      i14[this._$Ci] = t8, this._$Ct._$AI(i14, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/directives/private-async-helpers.js
var t5 = async (t8, s12) => {
  for await (const i14 of t8) if (false === await s12(i14)) return;
};
var s6 = class {
  constructor(t8) {
    this.G = t8;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(t8) {
    this.G = t8;
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
    (_a6 = this.Y) != null ? _a6 : this.Y = new Promise(((t8) => this.Z = t8));
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
  render(i14, s12) {
    return T;
  }
  update(i14, [s12, r8]) {
    if (this.isConnected || this.disconnected(), s12 === this._$CJ) return T;
    this._$CJ = s12;
    let n13 = 0;
    const { _$CK: o18, _$CX: h10 } = this;
    return t5(s12, (async (t8) => {
      for (; h10.get(); ) await h10.get();
      const i15 = o18.deref();
      if (void 0 !== i15) {
        if (i15._$CJ !== s12) return false;
        void 0 !== r8 && (t8 = r8(t8, n13)), i15.commitValue(t8, n13), n13++;
      }
      return true;
    })), T;
  }
  commitValue(t8, i14) {
    this.setValue(t8);
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
  update(r8, e12) {
    return this._$Ctt = r8, super.update(r8, e12);
  }
  commitValue(r8, e12) {
    0 === e12 && h3(this._$Ctt);
    const s12 = s4(this._$Ctt);
    v2(s12, r8);
  }
});

// node_modules/lit-html/directives/cache.js
var d4 = (t8) => l3(t8) ? t8._$litType$.h : t8.strings;
var h6 = e5(class extends i6 {
  constructor(t8) {
    super(t8), this.et = /* @__PURE__ */ new WeakMap();
  }
  render(t8) {
    return [t8];
  }
  update(s12, [e12]) {
    const u6 = e4(this.it) ? d4(this.it) : null, h10 = e4(e12) ? d4(e12) : null;
    if (null !== u6 && (null === h10 || u6 !== h10)) {
      const e13 = p3(s12).pop();
      let o18 = this.et.get(u6);
      if (void 0 === o18) {
        const s13 = document.createDocumentFragment();
        o18 = B(E, s13), o18.setConnected(false), this.et.set(u6, o18);
      }
      m2(o18, [e13]), s4(o18, void 0, e13);
    }
    if (null !== h10) {
      if (null === u6 || u6 !== h10) {
        const t8 = this.et.get(h10);
        if (void 0 !== t8) {
          const i14 = p3(t8).pop();
          h3(s12), s4(s12, void 0, i14), m2(s12, [i14]);
        }
      }
      this.it = e12;
    } else this.it = void 0;
    return this.render(e12);
  }
});

// node_modules/lit-html/directives/choose.js
var r6 = (r8, o18, t8) => {
  for (const t9 of o18) if (t9[0] === r8) return (0, t9[1])();
  return t8 == null ? void 0 : t8();
};

// node_modules/lit-html/directives/class-map.js
var e6 = e5(class extends i6 {
  constructor(t8) {
    var _a6;
    if (super(t8), t8.type !== t4.ATTRIBUTE || "class" !== t8.name || ((_a6 = t8.strings) == null ? void 0 : _a6.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t8) {
    return " " + Object.keys(t8).filter(((s12) => t8[s12])).join(" ") + " ";
  }
  update(s12, [i14]) {
    var _a6, _b2;
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s12.strings && (this.nt = new Set(s12.strings.join(" ").split(/\s/).filter(((t8) => "" !== t8))));
      for (const t8 in i14) i14[t8] && !((_a6 = this.nt) == null ? void 0 : _a6.has(t8)) && this.st.add(t8);
      return this.render(i14);
    }
    const r8 = s12.element.classList;
    for (const t8 of this.st) t8 in i14 || (r8.remove(t8), this.st.delete(t8));
    for (const t8 in i14) {
      const s13 = !!i14[t8];
      s13 === this.st.has(t8) || ((_b2 = this.nt) == null ? void 0 : _b2.has(t8)) || (s13 ? (r8.add(t8), this.st.add(t8)) : (r8.remove(t8), this.st.delete(t8)));
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
  render(r8, t8) {
    return t8();
  }
  update(t8, [s12, e12]) {
    if (Array.isArray(s12)) {
      if (Array.isArray(this.ot) && this.ot.length === s12.length && s12.every(((r8, t9) => r8 === this.ot[t9]))) return T;
    } else if (this.ot === s12) return T;
    return this.ot = Array.isArray(s12) ? Array.from(s12) : s12, this.render(s12, e12);
  }
});

// node_modules/lit-html/directives/if-defined.js
var o8 = (o18) => o18 != null ? o18 : E;

// node_modules/lit-html/directives/join.js
function* o9(o18, t8) {
  const f5 = "function" == typeof t8;
  if (void 0 !== o18) {
    let i14 = -1;
    for (const n13 of o18) i14 > -1 && (yield f5 ? t8(i14) : t8), i14++, yield n13;
  }
}

// node_modules/lit-html/directives/keyed.js
var i9 = e5(class extends i6 {
  constructor() {
    super(...arguments), this.key = E;
  }
  render(r8, t8) {
    return this.key = r8, t8;
  }
  update(r8, [t8, e12]) {
    return t8 !== this.key && (m2(r8), this.key = t8), e12;
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
  update(i14, [t8]) {
    if (t8 === T || t8 === E) return t8;
    const o18 = i14.element, l6 = i14.name;
    if (i14.type === t4.PROPERTY) {
      if (t8 === o18[l6]) return T;
    } else if (i14.type === t4.BOOLEAN_ATTRIBUTE) {
      if (!!t8 === o18.hasAttribute(l6)) return T;
    } else if (i14.type === t4.ATTRIBUTE && o18.getAttribute(l6) === t8 + "") return T;
    return m2(i14), t8;
  }
});

// node_modules/lit-html/directives/map.js
function* o10(o18, f5) {
  if (void 0 !== o18) {
    let i14 = 0;
    for (const t8 of o18) yield f5(t8, i14++);
  }
}

// node_modules/lit-html/directives/range.js
function* o11(o18, t8, e12 = 1) {
  const i14 = void 0 === t8 ? 0 : o18;
  t8 != null ? t8 : t8 = o18;
  for (let o19 = i14; e12 > 0 ? o19 < t8 : t8 < o19; o19 += e12) yield o19;
}

// node_modules/lit-html/directives/ref.js
var e8 = () => new h7();
var h7 = class {
};
var o12 = /* @__PURE__ */ new WeakMap();
var n7 = e5(class extends f4 {
  render(i14) {
    return E;
  }
  update(i14, [s12]) {
    var _a6;
    const e12 = s12 !== this.G;
    return e12 && void 0 !== this.G && this.rt(void 0), (e12 || this.lt !== this.ct) && (this.G = s12, this.ht = (_a6 = i14.options) == null ? void 0 : _a6.host, this.rt(this.ct = i14.element)), E;
  }
  rt(t8) {
    var _a6;
    if (this.isConnected || (t8 = void 0), "function" == typeof this.G) {
      const i14 = (_a6 = this.ht) != null ? _a6 : globalThis;
      let s12 = o12.get(i14);
      void 0 === s12 && (s12 = /* @__PURE__ */ new WeakMap(), o12.set(i14, s12)), void 0 !== s12.get(this.G) && this.G.call(this.ht, void 0), s12.set(this.G, t8), void 0 !== t8 && this.G.call(this.ht, t8);
    } else this.G.value = t8;
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
var u4 = (e12, s12, t8) => {
  const r8 = /* @__PURE__ */ new Map();
  for (let l6 = s12; l6 <= t8; l6++) r8.set(e12[l6], l6);
  return r8;
};
var c7 = e5(class extends i6 {
  constructor(e12) {
    if (super(e12), e12.type !== t4.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e12, s12, t8) {
    let r8;
    void 0 === t8 ? t8 = s12 : void 0 !== s12 && (r8 = s12);
    const l6 = [], o18 = [];
    let i14 = 0;
    for (const s13 of e12) l6[i14] = r8 ? r8(s13, i14) : i14, o18[i14] = t8(s13, i14), i14++;
    return { values: o18, keys: l6 };
  }
  render(e12, s12, t8) {
    return this.dt(e12, s12, t8).values;
  }
  update(s12, [t8, r8, c11]) {
    var _a6;
    const d5 = p3(s12), { values: p4, keys: a4 } = this.dt(t8, r8, c11);
    if (!Array.isArray(d5)) return this.ut = a4, p4;
    const h10 = (_a6 = this.ut) != null ? _a6 : this.ut = [], v3 = [];
    let m4, y3, x2 = 0, j2 = d5.length - 1, k2 = 0, w2 = p4.length - 1;
    for (; x2 <= j2 && k2 <= w2; ) if (null === d5[x2]) x2++;
    else if (null === d5[j2]) j2--;
    else if (h10[x2] === a4[k2]) v3[k2] = v2(d5[x2], p4[k2]), x2++, k2++;
    else if (h10[j2] === a4[w2]) v3[w2] = v2(d5[j2], p4[w2]), j2--, w2--;
    else if (h10[x2] === a4[w2]) v3[w2] = v2(d5[x2], p4[w2]), s4(s12, v3[w2 + 1], d5[x2]), x2++, w2--;
    else if (h10[j2] === a4[k2]) v3[k2] = v2(d5[j2], p4[k2]), s4(s12, d5[x2], d5[j2]), j2--, k2++;
    else if (void 0 === m4 && (m4 = u4(a4, k2, w2), y3 = u4(h10, x2, j2)), m4.has(h10[x2])) if (m4.has(h10[j2])) {
      const e12 = y3.get(a4[k2]), t9 = void 0 !== e12 ? d5[e12] : null;
      if (null === t9) {
        const e13 = s4(s12, d5[x2]);
        v2(e13, p4[k2]), v3[k2] = e13;
      } else v3[k2] = v2(t9, p4[k2]), s4(s12, d5[x2], t9), d5[e12] = null;
      k2++;
    } else M2(d5[j2]), j2--;
    else M2(d5[x2]), x2++;
    for (; k2 <= w2; ) {
      const e12 = s4(s12, v3[w2 + 1]);
      v2(e12, p4[k2]), v3[k2++] = e12;
    }
    for (; x2 <= j2; ) {
      const e12 = d5[x2++];
      null !== e12 && M2(e12);
    }
    return this.ut = a4, m2(s12, v3), T;
  }
});

// node_modules/lit-html/directives/style-map.js
var n8 = "important";
var i10 = " !" + n8;
var o13 = e5(class extends i6 {
  constructor(t8) {
    var _a6;
    if (super(t8), t8.type !== t4.ATTRIBUTE || "style" !== t8.name || ((_a6 = t8.strings) == null ? void 0 : _a6.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t8) {
    return Object.keys(t8).reduce(((e12, r8) => {
      const s12 = t8[r8];
      return null == s12 ? e12 : e12 + `${r8 = r8.includes("-") ? r8 : r8.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s12};`;
    }), "");
  }
  update(e12, [r8]) {
    const { style: s12 } = e12.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r8)), this.render(r8);
    for (const t8 of this.ft) null == r8[t8] && (this.ft.delete(t8), t8.includes("-") ? s12.removeProperty(t8) : s12[t8] = null);
    for (const t8 in r8) {
      const e13 = r8[t8];
      if (null != e13) {
        this.ft.add(t8);
        const r9 = "string" == typeof e13 && e13.endsWith(i10);
        t8.includes("-") || r9 ? s12.setProperty(t8, r9 ? e13.slice(0, -11) : e13, r9 ? n8 : "") : s12[t8] = e13;
      }
    }
    return T;
  }
});

// node_modules/lit-html/directives/template-content.js
var o14 = e5(class extends i6 {
  constructor(t8) {
    if (super(t8), t8.type !== t4.CHILD) throw Error("templateContent can only be used in child bindings");
  }
  render(r8) {
    return this.vt === r8 ? T : (this.vt = r8, document.importNode(r8.content, true));
  }
});

// node_modules/lit-html/directives/unsafe-html.js
var e9 = class extends i6 {
  constructor(i14) {
    if (super(i14), this.it = E, i14.type !== t4.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r8) {
    if (r8 === E || null == r8) return this._t = void 0, this.it = r8;
    if (r8 === T) return r8;
    if ("string" != typeof r8) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r8 === this.it) return this._t;
    this.it = r8;
    const s12 = [r8];
    return s12.raw = s12, this._t = { _$litType$: this.constructor.resultType, strings: s12, values: [] };
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
var n9 = (t8) => !i5(t8) && "function" == typeof t8.then;
var h8 = 1073741823;
var c8 = class extends f4 {
  constructor() {
    super(...arguments), this._$Cwt = h8, this._$Cbt = [], this._$CK = new s6(this), this._$CX = new i7();
  }
  render(...s12) {
    var _a6;
    return (_a6 = s12.find(((t8) => !n9(t8)))) != null ? _a6 : T;
  }
  update(s12, i14) {
    const e12 = this._$Cbt;
    let r8 = e12.length;
    this._$Cbt = i14;
    const o18 = this._$CK, c11 = this._$CX;
    this.isConnected || this.disconnected();
    for (let t8 = 0; t8 < i14.length && !(t8 > this._$Cwt); t8++) {
      const s13 = i14[t8];
      if (!n9(s13)) return this._$Cwt = t8, s13;
      t8 < r8 && s13 === e12[t8] || (this._$Cwt = h8, r8 = 0, Promise.resolve(s13).then((async (t9) => {
        for (; c11.get(); ) await c11.get();
        const i15 = o18.deref();
        if (void 0 !== i15) {
          const e13 = i15._$Cbt.indexOf(s13);
          e13 > -1 && e13 < i15._$Cwt && (i15._$Cwt = e13, i15.setValue(t9));
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
function n10(n13, r8, t8) {
  return n13 ? r8(n13) : t8 == null ? void 0 : t8(n13);
}

// node_modules/lit-html/static.js
var a3 = Symbol.for("");
var o17 = (t8) => {
  if ((t8 == null ? void 0 : t8.r) === a3) return t8 == null ? void 0 : t8._$litStatic$;
};
var s7 = (t8) => ({ _$litStatic$: t8, r: a3 });
var i11 = (t8, ...r8) => ({ _$litStatic$: r8.reduce(((r9, e12, a4) => r9 + ((t9) => {
  if (void 0 !== t9._$litStatic$) return t9._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t9}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e12) + t8[a4 + 1]), t8[0]), r: a3 });
var l5 = /* @__PURE__ */ new Map();
var n11 = (t8) => (r8, ...e12) => {
  const a4 = e12.length;
  let s12, i14;
  const n13 = [], u6 = [];
  let c11, $3 = 0, f5 = false;
  for (; $3 < a4; ) {
    for (c11 = r8[$3]; $3 < a4 && void 0 !== (i14 = e12[$3], s12 = o17(i14)); ) c11 += s12 + r8[++$3], f5 = true;
    $3 !== a4 && u6.push(i14), n13.push(c11), $3++;
  }
  if ($3 === a4 && n13.push(r8[a4]), f5) {
    const t9 = n13.join("$$lit$$");
    void 0 === (r8 = l5.get(t9)) && (n13.raw = n13, l5.set(t9, r8 = n13)), e12 = u6;
  }
  return t8(r8, ...e12);
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
    return this.t || (1 === this.i ? this.t = new Promise(((t8, s12) => {
      this.o = t8, this.h = s12;
    })) : 3 === this.i ? this.t = Promise.reject(this.l) : this.t = Promise.resolve(this.u)), this.t;
  }
  constructor(t8, s12, i14) {
    var _a6, _b2, _c;
    this.p = 0, this.i = 0, (this._ = t8).addController(this);
    const h10 = "object" == typeof s12 ? s12 : { task: s12, args: i14 };
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
    const t8 = this.j();
    if (!Array.isArray(t8)) throw Error("The args function must return an array");
    return t8;
  }
  async S() {
    const t8 = this.T(), s12 = this.O;
    this.O = t8, t8 === s12 || void 0 === t8 || void 0 !== s12 && this.m(s12, t8) || await this.run(t8);
  }
  async run(t8) {
    var _a6, _b2, _c, _d, _e;
    let s12, h10;
    t8 != null ? t8 : t8 = this.T(), this.O = t8, 1 === this.i ? (_a6 = this.q) == null ? void 0 : _a6.abort() : (this.t = void 0, this.o = void 0, this.h = void 0), this.i = 1, "afterUpdate" === this.autoRun ? queueMicrotask((() => this._.requestUpdate())) : this._.requestUpdate();
    const r8 = ++this.p;
    this.q = new AbortController();
    let e12 = false;
    try {
      s12 = await this.v(t8, { signal: this.q.signal });
    } catch (t9) {
      e12 = true, h10 = t9;
    }
    if (this.p === r8) {
      if (s12 === i12) this.i = 0;
      else {
        if (false === e12) {
          try {
            (_b2 = this.k) == null ? void 0 : _b2.call(this, s12);
          } catch {
          }
          this.i = 2, (_c = this.o) == null ? void 0 : _c.call(this, s12);
        } else {
          try {
            (_d = this.A) == null ? void 0 : _d.call(this, h10);
          } catch {
          }
          this.i = 3, (_e = this.h) == null ? void 0 : _e.call(this, h10);
        }
        this.u = s12, this.l = h10;
      }
      this._.requestUpdate();
    }
  }
  abort(t8) {
    var _a6;
    1 === this.i && ((_a6 = this.q) == null ? void 0 : _a6.abort(t8));
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
  render(t8) {
    var _a6, _b2, _c, _d;
    switch (this.i) {
      case 0:
        return (_a6 = t8.initial) == null ? void 0 : _a6.call(t8);
      case 1:
        return (_b2 = t8.pending) == null ? void 0 : _b2.call(t8);
      case 2:
        return (_c = t8.complete) == null ? void 0 : _c.call(t8, this.value);
      case 3:
        return (_d = t8.error) == null ? void 0 : _d.call(t8, this.error);
      default:
        throw Error("Unexpected status: " + this.i);
    }
  }
};
var r7 = (s12, i14) => s12 === i14 || s12.length === i14.length && s12.every(((s13, h10) => !f(s13, i14[h10])));

// node_modules/@lit/context/lib/context-request-event.js
var s9 = class extends Event {
  constructor(s12, t8, e12, o18) {
    super("context-request", { bubbles: true, composed: true }), this.context = s12, this.contextTarget = t8, this.callback = e12, this.subscribe = o18 != null ? o18 : false;
  }
};

// node_modules/@lit/context/lib/create-context.js
function n12(n13) {
  return n13;
}

// node_modules/@lit/context/lib/controllers/context-consumer.js
var s10 = class {
  constructor(t8, s12, i14, h10) {
    var _a6;
    if (this.subscribe = false, this.provided = false, this.value = void 0, this.t = (t9, s13) => {
      this.unsubscribe && (this.unsubscribe !== s13 && (this.provided = false, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = t9, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = true, this.callback && this.callback(t9, s13)), this.unsubscribe = s13;
    }, this.host = t8, void 0 !== s12.context) {
      const t9 = s12;
      this.context = t9.context, this.callback = t9.callback, this.subscribe = (_a6 = t9.subscribe) != null ? _a6 : false;
    } else this.context = s12, this.callback = i14, this.subscribe = h10 != null ? h10 : false;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new s9(this.context, this.host, this.t, this.subscribe));
  }
};

// node_modules/@lit/context/lib/value-notifier.js
var s11 = class {
  get value() {
    return this.o;
  }
  set value(s12) {
    this.setValue(s12);
  }
  setValue(s12, t8 = false) {
    const i14 = t8 || !Object.is(s12, this.o);
    this.o = s12, i14 && this.updateObservers();
  }
  constructor(s12) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (const [s13, { disposer: t8 }] of this.subscriptions) s13(this.o, t8);
    }, void 0 !== s12 && (this.value = s12);
  }
  addCallback(s12, t8, i14) {
    if (!i14) return void s12(this.value);
    this.subscriptions.has(s12) || this.subscriptions.set(s12, { disposer: () => {
      this.subscriptions.delete(s12);
    }, consumerHost: t8 });
    const { disposer: h10 } = this.subscriptions.get(s12);
    s12(this.value, h10);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
};

// node_modules/@lit/context/lib/controllers/context-provider.js
var e10 = class extends Event {
  constructor(t8, s12) {
    super("context-provider", { bubbles: true, composed: true }), this.context = t8, this.contextTarget = s12;
  }
};
var i13 = class extends s11 {
  constructor(s12, e12, i14) {
    var _a6, _b2;
    super(void 0 !== e12.context ? e12.initialValue : i14), this.onContextRequest = (t8) => {
      var _a7;
      if (t8.context !== this.context) return;
      const s13 = (_a7 = t8.contextTarget) != null ? _a7 : t8.composedPath()[0];
      s13 !== this.host && (t8.stopPropagation(), this.addCallback(t8.callback, s13, t8.subscribe));
    }, this.onProviderRequest = (s13) => {
      var _a7;
      if (s13.context !== this.context) return;
      if (((_a7 = s13.contextTarget) != null ? _a7 : s13.composedPath()[0]) === this.host) return;
      const e13 = /* @__PURE__ */ new Set();
      for (const [s14, { consumerHost: i15 }] of this.subscriptions) e13.has(s14) || (e13.add(s14), i15.dispatchEvent(new s9(this.context, i15, s14, true)));
      s13.stopPropagation();
    }, this.host = s12, void 0 !== e12.context ? this.context = e12.context : this.context = e12, this.attachListeners(), (_b2 = (_a6 = this.host).addController) == null ? void 0 : _b2.call(_a6, this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new e10(this.context, this.host));
  }
};

// node_modules/@lit/context/lib/context-root.js
var t7 = class {
  constructor() {
    this.pendingContextRequests = /* @__PURE__ */ new Map(), this.onContextProvider = (t8) => {
      const s12 = this.pendingContextRequests.get(t8.context);
      if (void 0 === s12) return;
      this.pendingContextRequests.delete(t8.context);
      const { requests: o18 } = s12;
      for (const { elementRef: s13, callbackRef: n13 } of o18) {
        const o19 = s13.deref(), c11 = n13.deref();
        void 0 === o19 || void 0 === c11 || o19.dispatchEvent(new s9(t8.context, o19, c11, true));
      }
    }, this.onContextRequest = (e12) => {
      var _a6;
      if (true !== e12.subscribe) return;
      const t8 = (_a6 = e12.contextTarget) != null ? _a6 : e12.composedPath()[0], s12 = e12.callback;
      let o18 = this.pendingContextRequests.get(e12.context);
      void 0 === o18 && this.pendingContextRequests.set(e12.context, o18 = { callbacks: /* @__PURE__ */ new WeakMap(), requests: [] });
      let n13 = o18.callbacks.get(t8);
      void 0 === n13 && o18.callbacks.set(t8, n13 = /* @__PURE__ */ new WeakSet()), n13.has(s12) || (n13.add(s12), o18.requests.push({ elementRef: new WeakRef(t8), callbackRef: new WeakRef(s12) }));
    };
  }
  attach(e12) {
    e12.addEventListener("context-request", this.onContextRequest), e12.addEventListener("context-provider", this.onContextProvider);
  }
  detach(e12) {
    e12.removeEventListener("context-request", this.onContextRequest), e12.removeEventListener("context-provider", this.onContextProvider);
  }
};

// node_modules/@lit/context/lib/decorators/provide.js
function e11({ context: e12 }) {
  return (n13, i14) => {
    const r8 = /* @__PURE__ */ new WeakMap();
    if ("object" == typeof i14) return { get() {
      return n13.get.call(this);
    }, set(t8) {
      return r8.get(this).setValue(t8), n13.set.call(this, t8);
    }, init(n14) {
      return r8.set(this, new i13(this, { context: e12, initialValue: n14 })), n14;
    } };
    {
      n13.constructor.addInitializer(((n14) => {
        r8.set(n14, new i13(n14, { context: e12 }));
      }));
      const o18 = Object.getOwnPropertyDescriptor(n13, i14);
      let s12;
      if (void 0 === o18) {
        const t8 = /* @__PURE__ */ new WeakMap();
        s12 = { get() {
          return t8.get(this);
        }, set(e13) {
          r8.get(this).setValue(e13), t8.set(this, e13);
        }, configurable: true, enumerable: true };
      } else {
        const t8 = o18.set;
        s12 = { ...o18, set(e13) {
          r8.get(this).setValue(e13), t8 == null ? void 0 : t8.call(this, e13);
        } };
      }
      return void Object.defineProperty(n13, i14, s12);
    }
  };
}

// node_modules/@lit/context/lib/decorators/consume.js
function c10({ context: c11, subscribe: e12 }) {
  return (o18, n13) => {
    "object" == typeof n13 ? n13.addInitializer((function() {
      new s10(this, { context: c11, callback: (t8) => {
        o18.set.call(this, t8);
      }, subscribe: e12 });
    })) : o18.constructor.addInitializer(((o19) => {
      new s10(o19, { context: c11, callback: (t8) => {
        o19[n13] = t8;
      }, subscribe: e12 });
    }));
  };
}
export {
  f4 as AsyncDirective,
  o7 as AsyncReplaceDirective,
  n as CSSResult,
  s10 as ContextConsumer,
  s9 as ContextEvent,
  i13 as ContextProvider,
  t7 as ContextRoot,
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
  c10 as consume,
  n12 as createContext,
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
  e11 as provide,
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
@lit/context/lib/decorators/provide.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
@lit/context/lib/decorators/consume.js:
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
@lit/context/lib/context-request-event.js:
@lit/context/lib/create-context.js:
@lit/context/lib/controllers/context-consumer.js:
@lit/context/lib/value-notifier.js:
@lit/context/lib/controllers/context-provider.js:
@lit/context/lib/context-root.js:
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
//# sourceMappingURL=littc-all.js.map
