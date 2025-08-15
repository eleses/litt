// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t2, e3, o3) {
    if (this._$cssResult$ = true, o3 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e3;
  }
  get styleSheet() {
    let t2 = this.o;
    const s3 = this.t;
    if (e && void 0 === t2) {
      const e3 = void 0 !== s3 && 1 === s3.length;
      e3 && (t2 = o.get(s3)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e3 && o.set(s3, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t2) => new n("string" == typeof t2 ? t2 : t2 + "", void 0, s);
var S = (s3, o3) => {
  if (e) s3.adoptedStyleSheets = o3.map(((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet));
  else for (const e3 of o3) {
    const o4 = document.createElement("style"), n3 = t.litNonce;
    void 0 !== n3 && o4.setAttribute("nonce", n3), o4.textContent = e3.cssText, s3.appendChild(o4);
  }
};
var c = e ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e3 = "";
  for (const s3 of t3.cssRules) e3 += s3.cssText;
  return r(e3);
})(t2) : t2;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t2, s3) => t2;
var u = { toAttribute(t2, s3) {
  switch (s3) {
    case Boolean:
      t2 = t2 ? l : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s3) {
  let i4 = t2;
  switch (s3) {
    case Boolean:
      i4 = null !== t2;
      break;
    case Number:
      i4 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t2);
      } catch (t3) {
        i4 = null;
      }
  }
  return i4;
} };
var f = (t2, s3) => !i2(t2, s3);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
var _a, _b;
(_a = Symbol.metadata) != null ? _a : Symbol.metadata = Symbol("metadata"), (_b = a.litPropertyMetadata) != null ? _b : a.litPropertyMetadata = /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t2) {
    var _a3;
    this._$Ei(), ((_a3 = this.l) != null ? _a3 : this.l = []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s3 = b) {
    if (s3.state && (s3.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s3 = Object.create(s3)).wrapped = true), this.elementProperties.set(t2, s3), !s3.noAccessor) {
      const i4 = Symbol(), h3 = this.getPropertyDescriptor(t2, i4, s3);
      void 0 !== h3 && e2(this.prototype, t2, h3);
    }
  }
  static getPropertyDescriptor(t2, s3, i4) {
    var _a3;
    const { get: e3, set: r4 } = (_a3 = h(this.prototype, t2)) != null ? _a3 : { get() {
      return this[s3];
    }, set(t3) {
      this[s3] = t3;
    } };
    return { get: e3, set(s4) {
      const h3 = e3 == null ? void 0 : e3.call(this);
      r4 == null ? void 0 : r4.call(this, s4), this.requestUpdate(t2, h3, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    var _a3;
    return (_a3 = this.elementProperties.get(t2)) != null ? _a3 : b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t2 = n2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t3 = this.properties, s3 = [...r2(t3), ...o2(t3)];
      for (const i4 of s3) this.createProperty(i4, t3[i4]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s3 = litPropertyMetadata.get(t2);
      if (void 0 !== s3) for (const [t3, i4] of s3) this.elementProperties.set(t3, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s3] of this.elementProperties) {
      const i4 = this._$Eu(t3, s3);
      void 0 !== i4 && this._$Eh.set(i4, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s3) {
    const i4 = [];
    if (Array.isArray(s3)) {
      const e3 = new Set(s3.flat(1 / 0).reverse());
      for (const s4 of e3) i4.unshift(c(s4));
    } else void 0 !== s3 && i4.push(c(s3));
    return i4;
  }
  static _$Eu(t2, s3) {
    const i4 = s3.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a3;
    this._$ES = new Promise(((t2) => this.enableUpdating = t2)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a3 = this.constructor.l) == null ? void 0 : _a3.forEach(((t2) => t2(this)));
  }
  addController(t2) {
    var _a3, _b2;
    ((_a3 = this._$EO) != null ? _a3 : this._$EO = /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_b2 = t2.hostConnected) == null ? void 0 : _b2.call(t2));
  }
  removeController(t2) {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s3 = this.constructor.elementProperties;
    for (const i4 of s3.keys()) this.hasOwnProperty(i4) && (t2.set(i4, this[i4]), delete this[i4]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    var _a3;
    const t2 = (_a3 = this.shadowRoot) != null ? _a3 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a3, _b2;
    (_a3 = this.renderRoot) != null ? _a3 : this.renderRoot = this.createRenderRoot(), this.enableUpdating(true), (_b2 = this._$EO) == null ? void 0 : _b2.forEach(((t2) => {
      var _a4;
      return (_a4 = t2.hostConnected) == null ? void 0 : _a4.call(t2);
    }));
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.forEach(((t2) => {
      var _a4;
      return (_a4 = t2.hostDisconnected) == null ? void 0 : _a4.call(t2);
    }));
  }
  attributeChangedCallback(t2, s3, i4) {
    this._$AK(t2, i4);
  }
  _$ET(t2, s3) {
    var _a3;
    const i4 = this.constructor.elementProperties.get(t2), e3 = this.constructor._$Eu(t2, i4);
    if (void 0 !== e3 && true === i4.reflect) {
      const h3 = (void 0 !== ((_a3 = i4.converter) == null ? void 0 : _a3.toAttribute) ? i4.converter : u).toAttribute(s3, i4.type);
      this._$Em = t2, null == h3 ? this.removeAttribute(e3) : this.setAttribute(e3, h3), this._$Em = null;
    }
  }
  _$AK(t2, s3) {
    var _a3, _b2, _c;
    const i4 = this.constructor, e3 = i4._$Eh.get(t2);
    if (void 0 !== e3 && this._$Em !== e3) {
      const t3 = i4.getPropertyOptions(e3), h3 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a3 = t3.converter) == null ? void 0 : _a3.fromAttribute) ? t3.converter : u;
      this._$Em = e3;
      const r4 = h3.fromAttribute(s3, t3.type);
      this[e3] = (_c = r4 != null ? r4 : (_b2 = this._$Ej) == null ? void 0 : _b2.get(e3)) != null ? _c : r4, this._$Em = null;
    }
  }
  requestUpdate(t2, s3, i4) {
    var _a3, _b2;
    if (void 0 !== t2) {
      const e3 = this.constructor, h3 = this[t2];
      if (i4 != null ? i4 : i4 = e3.getPropertyOptions(t2), !(((_a3 = i4.hasChanged) != null ? _a3 : f)(h3, s3) || i4.useDefault && i4.reflect && h3 === ((_b2 = this._$Ej) == null ? void 0 : _b2.get(t2)) && !this.hasAttribute(e3._$Eu(t2, i4)))) return;
      this.C(t2, s3, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s3, { useDefault: i4, reflect: e3, wrapped: h3 }, r4) {
    var _a3, _b2, _c;
    i4 && !((_a3 = this._$Ej) != null ? _a3 : this._$Ej = /* @__PURE__ */ new Map()).has(t2) && (this._$Ej.set(t2, (_b2 = r4 != null ? r4 : s3) != null ? _b2 : this[t2]), true !== h3 || void 0 !== r4) || (this._$AL.has(t2) || (this.hasUpdated || i4 || (s3 = void 0), this._$AL.set(t2, s3)), true === e3 && this._$Em !== t2 && ((_c = this._$Eq) != null ? _c : this._$Eq = /* @__PURE__ */ new Set()).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a3, _b2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((_a3 = this.renderRoot) != null ? _a3 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
        for (const [t4, s4] of this._$Ep) this[t4] = s4;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s4, i4] of t3) {
        const { wrapped: t4 } = i4, e3 = this[s4];
        true !== t4 || this._$AL.has(s4) || void 0 === e3 || this.C(s4, void 0, i4, e3);
      }
    }
    let t2 = false;
    const s3 = this._$AL;
    try {
      t2 = this.shouldUpdate(s3), t2 ? (this.willUpdate(s3), (_b2 = this._$EO) == null ? void 0 : _b2.forEach(((t3) => {
        var _a4;
        return (_a4 = t3.hostUpdate) == null ? void 0 : _a4.call(t3);
      })), this.update(s3)) : this._$EM();
    } catch (s4) {
      throw t2 = false, this._$EM(), s4;
    }
    t2 && this._$AE(s3);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a3;
    (_a3 = this._$EO) == null ? void 0 : _a3.forEach(((t3) => {
      var _a4;
      return (_a4 = t3.hostUpdated) == null ? void 0 : _a4.call(t3);
    })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
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
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((t3) => this._$ET(t3, this[t3])))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
var _a2;
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: y }), ((_a2 = a.reactiveElementVersions) != null ? _a2 : a.reactiveElementVersions = []).push("2.1.1");

// node_modules/@lit/task/task.js
var s2 = { INITIAL: 0, PENDING: 1, COMPLETE: 2, ERROR: 3 };
var i3 = Symbol();
var h2 = class {
  get taskComplete() {
    return this.t || (1 === this.i ? this.t = new Promise(((t2, s3) => {
      this.o = t2, this.h = s3;
    })) : 3 === this.i ? this.t = Promise.reject(this.l) : this.t = Promise.resolve(this.u)), this.t;
  }
  constructor(t2, s3, i4) {
    var _a3, _b2, _c;
    this.p = 0, this.i = 0, (this._ = t2).addController(this);
    const h3 = "object" == typeof s3 ? s3 : { task: s3, args: i4 };
    this.v = h3.task, this.j = h3.args, this.m = (_a3 = h3.argsEqual) != null ? _a3 : r3, this.k = h3.onComplete, this.A = h3.onError, this.autoRun = (_b2 = h3.autoRun) != null ? _b2 : true, "initialValue" in h3 && (this.u = h3.initialValue, this.i = 2, this.O = (_c = this.T) == null ? void 0 : _c.call(this));
  }
  hostUpdate() {
    true === this.autoRun && this.S();
  }
  hostUpdated() {
    "afterUpdate" === this.autoRun && this.S();
  }
  T() {
    if (void 0 === this.j) return;
    const t2 = this.j();
    if (!Array.isArray(t2)) throw Error("The args function must return an array");
    return t2;
  }
  async S() {
    const t2 = this.T(), s3 = this.O;
    this.O = t2, t2 === s3 || void 0 === t2 || void 0 !== s3 && this.m(s3, t2) || await this.run(t2);
  }
  async run(t2) {
    var _a3, _b2, _c, _d, _e;
    let s3, h3;
    t2 != null ? t2 : t2 = this.T(), this.O = t2, 1 === this.i ? (_a3 = this.q) == null ? void 0 : _a3.abort() : (this.t = void 0, this.o = void 0, this.h = void 0), this.i = 1, "afterUpdate" === this.autoRun ? queueMicrotask((() => this._.requestUpdate())) : this._.requestUpdate();
    const r4 = ++this.p;
    this.q = new AbortController();
    let e3 = false;
    try {
      s3 = await this.v(t2, { signal: this.q.signal });
    } catch (t3) {
      e3 = true, h3 = t3;
    }
    if (this.p === r4) {
      if (s3 === i3) this.i = 0;
      else {
        if (false === e3) {
          try {
            (_b2 = this.k) == null ? void 0 : _b2.call(this, s3);
          } catch {
          }
          this.i = 2, (_c = this.o) == null ? void 0 : _c.call(this, s3);
        } else {
          try {
            (_d = this.A) == null ? void 0 : _d.call(this, h3);
          } catch {
          }
          this.i = 3, (_e = this.h) == null ? void 0 : _e.call(this, h3);
        }
        this.u = s3, this.l = h3;
      }
      this._.requestUpdate();
    }
  }
  abort(t2) {
    var _a3;
    1 === this.i && ((_a3 = this.q) == null ? void 0 : _a3.abort(t2));
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
  render(t2) {
    var _a3, _b2, _c, _d;
    switch (this.i) {
      case 0:
        return (_a3 = t2.initial) == null ? void 0 : _a3.call(t2);
      case 1:
        return (_b2 = t2.pending) == null ? void 0 : _b2.call(t2);
      case 2:
        return (_c = t2.complete) == null ? void 0 : _c.call(t2, this.value);
      case 3:
        return (_d = t2.error) == null ? void 0 : _d.call(t2, this.error);
      default:
        throw Error("Unexpected status: " + this.i);
    }
  }
};
var r3 = (s3, i4) => s3 === i4 || s3.length === i4.length && s3.every(((s4, h3) => !f(s4, i4[h3])));
export {
  h2 as Task,
  s2 as TaskStatus,
  i3 as initialState,
  r3 as shallowArrayEquals
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
@lit/task/task.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=index.js.map
