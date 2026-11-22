function t(t,e,i,s){var n,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,i,o):n(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",_=u.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),v={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const a=this.constructor;if(!1===s&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=new Map,$[y("finalized")]=new Map,_?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+C,P=`<${M}>`,T=document,U=()=>T.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,W="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,z=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,Q=/"/g,I=/^(?:script|style|textarea|title)$/i,R=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),j=R(1),B=R(2),X=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,Z=T.createTreeWalker(T,129);function V(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",o=L;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===L?"!--"===l[1]?o=D:void 0!==l[1]?o=H:void 0!==l[2]?(I.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=n??L,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?z:'"'===l[3]?Q:F):o===Q||o===F?o=z:o===D||o===H?o=L:(o=z,n=void 0);const h=o===z&&t[e+1].startsWith("/>")?" ":"";a+=o===L?i+P:c>=0?(s.push(r),i.slice(0,c)+S+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[V(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const o=t.length-1,r=this.parts,[l,c]=Y(t,e);if(this.el=K.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Z.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[a++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?st:"?"===o[1]?nt:"@"===o[1]?at:it}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),Z.nextNode(),r.push({type:2,index:++n});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===M)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===X)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=N(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);Z.currentNode=s;let n=Z.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new et(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new ot(n,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(n=Z.nextNode(),a++)}return Z.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),N(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==X&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new K(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new et(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=J(this,t,e,0),a=!N(t)||t!==this._$AH&&t!==X,a&&(this._$AH=t);else{const s=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=J(this,s[i+o],e,o),r===X&&(r=this._$AH[o]),a||=!N(r)||r!==this._$AH[o],r===q?t=q:t!==q&&(t+=(r??"")+n[o+1]),this._$AH[o]=r}a&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class nt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class at extends it{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===X)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(K,et),(x.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;let ct=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new et(e.insertBefore(U(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return X}};ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},ft=(t=pt,e,i)=>{const{kind:s,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?ft(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ut({...t,state:!0,attribute:!1})}let mt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const _t={},yt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends mt{constructor(){super(...arguments),this.key=q}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(((t,e=_t)=>{t._$AH=e})(t),this.key=e),i}}),wt=o`
  :host {
    --ist-sky-day-top: #9cc7ec;
    --ist-sky-day-bottom: #e3f0fb;
    --ist-sky-night-top: #0b1733;
    --ist-sky-night-bottom: #2a3f6b;
    --ist-snow: #f4f8fc;
    --ist-snow-shade: #d6e2ee;
    --lean: 0deg;
    --amp: 1deg;
    --sway-dur: 4s;
    --flutter-dur: 2s;
    --hat-lean: 0deg;
    display: block;
    height: 100%;
  }
  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  ha-card:focus-visible {
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .scene {
    position: relative;
    flex: 1 1 auto;
    min-height: 200px;
    aspect-ratio: 24 / 22;
    overflow: hidden;
    background: linear-gradient(var(--ist-sky-day-top), var(--ist-sky-day-bottom));
    isolation: isolate;
    transition: --lean 2.5s ease, --amp 2.5s ease, --hat-lean 2.5s ease, --warn-color 1.5s ease;
  }
  :host([fill-height]) .scene {
    aspect-ratio: auto;
  }
  .sky {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 2.5s ease;
  }
  .sky.overcast-day {
    background: linear-gradient(#8f9daa, #d3dbe3);
  }
  .sky.night {
    background: linear-gradient(var(--ist-sky-night-top), var(--ist-sky-night-bottom));
  }
  .sky.overcast-night {
    background: linear-gradient(#141a26, #323c4f);
  }
  .overcast .sky.overcast-day,
  .night .sky.night,
  .night.overcast .sky.overcast-night {
    opacity: 1;
  }
  .tint {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(var(--warn-color, transparent), transparent 65%);
    opacity: var(--warn-opacity, 0);
    transition: opacity 1.5s ease;
  }
  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  /* ---------- ground ---------- */
  .ground {
    fill: var(--ist-snow);
  }
  .ground {
    transition: fill 2.5s ease;
  }
  .night .ground {
    fill: #c9d6ea;
  }
  .ground-shine {
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0.7;
  }
  .frost .ground-shine {
    stroke: #bfe6ff;
    stroke-dasharray: 2 6;
    opacity: 1;
  }
  .shadow {
    fill: rgba(30, 45, 70, 0.22);
  }

  /* ---------- figure ---------- */
  .figure {
    transition: filter 1.5s ease;
    filter: saturate(0.8) brightness(0.82);
  }
  .on .figure {
    filter: drop-shadow(0 0 6px rgba(255, 196, 120, 0.85)) brightness(1.06);
  }
  .halo {
    opacity: 0;
    transition: opacity 1.2s ease;
  }
  .on .halo {
    opacity: 0.55;
    animation: ist-glow 3s ease-in-out infinite;
  }
  .night.on .halo {
    opacity: 0.95;
  }
  .sway,
  .inflate,
  .breathe {
    transform-box: view-box;
    transform-origin: 120px 236px;
  }
  .head {
    transform-box: view-box;
    transform-origin: 120px 120px;
  }
  .arm-wave {
    transform-box: view-box;
    transform-origin: 158px 122px;
  }
  .hat-tip {
    transform-box: view-box;
    transform-origin: 120px 68px;
  }
  .heap {
    transform-box: view-box;
    transform-origin: 120px 234px;
  }
  .ropes path {
    fill: none;
    stroke: #c9b48a;
    stroke-width: 1.4;
  }
  .ropes rect {
    fill: #6b5a3e;
  }
  .ropes {
    transition: opacity 1s ease;
    opacity: 0.25;
  }
  .on .ropes {
    opacity: 1;
  }
  .blower rect {
    fill: #4b5563;
  }
  .blower .fan {
    fill: none;
    stroke: #9ca3af;
    stroke-width: 1.5;
    stroke-dasharray: 3 2;
    transform-box: fill-box;
    transform-origin: center;
  }
  .on .blower .fan {
    animation: ist-spin 0.4s linear infinite;
  }
  .blower .led {
    fill: #6b7280;
  }
  .on .blower .led {
    fill: #4ade80;
  }
  .seam {
    fill: none;
    stroke: rgba(80, 0, 0, 0.35);
    stroke-width: 1;
    stroke-dasharray: 3 3;
  }
  .gloss {
    fill: #fff;
    opacity: 0.22;
  }
  .button {
    fill: #f5c542;
  }
  .eye {
    fill: none;
    stroke: #3b2a20;
    stroke-width: 2.4;
    stroke-linecap: round;
  }
  .fold {
    fill: none;
    stroke: rgba(70, 0, 0, 0.45);
    stroke-width: 1.4;
    stroke-linecap: round;
  }

  /* resting states (also used when animations are disabled) */
  .off .inflate {
    transform: scale(1.35, 0.06);
    opacity: 0;
  }
  .off .head {
    transform: rotate(85deg);
  }
  .on .heap {
    opacity: 0;
  }

  /* state change animations */
  .on.animate .inflate {
    animation: ist-inflate 3.4s cubic-bezier(0.3, 0.7, 0.4, 1) both;
  }
  .on.animate .head {
    animation: ist-head-up 3.4s ease-out both;
  }
  .on.animate .heap {
    animation: ist-heap-out 3.4s ease-out both;
  }
  .off.animate .inflate {
    animation: ist-deflate 2.8s ease-in both;
  }
  .off.animate .head {
    animation: ist-head-down 2.8s ease-in both;
  }
  .off.animate .heap {
    animation: ist-heap-in 2.8s ease-out both;
  }

  /* idle motion while inflated */
  .on .sway {
    animation: ist-sway var(--sway-dur) ease-in-out infinite;
  }
  .off .sway {
    transition: transform 1s ease;
  }
  .on .breathe {
    animation: ist-breathe 2.4s ease-in-out 3.4s infinite;
  }
  .on .arm-wave {
    animation: ist-wave 1.8s ease-in-out 3.4s infinite;
  }
  .on .hat-tip {
    animation: ist-flutter var(--flutter-dur) ease-in-out infinite;
  }
  .storm.on .breathe {
    animation: ist-shudder 0.35s linear infinite;
  }

  /* ---------- weather particles ---------- */
  .flake,
  .drop,
  .streak-wrap {
    position: absolute;
    inset: 0;
    will-change: transform;
  }
  .flake {
    animation: ist-fall var(--dur) linear var(--delay) infinite;
  }
  .flake i {
    position: absolute;
    top: -6px;
    left: var(--x);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: #fff;
    opacity: var(--alpha, 0.9);
    box-shadow: 0 0 1px rgba(40, 60, 90, 0.35);
  }
  .drop {
    animation: ist-fall var(--dur) linear var(--delay) infinite;
  }
  .drop i {
    position: absolute;
    top: -20px;
    left: var(--x);
    width: 1.5px;
    height: 14px;
    border-radius: 1px;
    background: linear-gradient(transparent, rgba(190, 215, 255, 0.85));
    transform: rotate(var(--angle));
  }
  .streak-wrap {
    animation: ist-blow var(--dur) linear var(--delay) infinite;
  }
  .streak-wrap i {
    position: absolute;
    top: var(--y);
    left: 0;
    width: var(--len);
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent);
  }
  .wind-left .streak-wrap {
    animation-name: ist-blow-left;
  }
  .wind-left .streak-wrap i {
    left: auto;
    right: 0;
  }
  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #fff;
    animation: ist-twinkle var(--dur) ease-in-out var(--delay) infinite;
  }
  .cloud {
    position: absolute;
    top: var(--y);
    left: 0;
    width: var(--w);
    height: calc(var(--w) * 0.32);
    border-radius: 999px;
    background: rgba(255, 255, 255, var(--alpha));
    filter: blur(1px);
    animation: ist-drift var(--dur) linear var(--delay) infinite;
  }
  .cloud::before,
  .cloud::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: inherit;
  }
  .cloud::before {
    width: 46%;
    height: 140%;
    left: 16%;
    bottom: 20%;
  }
  .cloud::after {
    width: 34%;
    height: 110%;
    left: 52%;
    bottom: 30%;
  }
  .wind-left .cloud {
    animation-name: ist-drift-left;
  }
  .fog {
    position: absolute;
    left: -50%;
    width: 200%;
    height: 30%;
    background: radial-gradient(ellipse at center, rgba(235, 240, 245, 0.75), transparent 70%);
    animation: ist-fog 24s ease-in-out infinite alternate;
  }
  .flash {
    position: absolute;
    inset: 0;
    background: #fff;
    opacity: 0;
    animation: ist-flash 7s linear infinite;
    mix-blend-mode: screen;
  }

  /* ---------- texts ---------- */
  .header {
    position: absolute;
    top: 10px;
    left: 14px;
    right: 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    pointer-events: none;
    z-index: 2;
  }
  .title {
    transition: color 2s ease;
    display: flex;
    flex-direction: column;
    color: #1e2a3a;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  }
  .night .title {
    color: #f5f7fb;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  }
  .name {
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.3;
  }
  .state {
    font-size: 0.85rem;
    opacity: 0.85;
  }
  .storm-hint {
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    background: rgba(229, 57, 53, 0.9);
    padding: 3px 8px;
    border-radius: 999px;
    max-width: 55%;
    border-radius: 12px !important;
    text-align: right;
    line-height: 1.3;
    pointer-events: auto;
  }
  .info {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 12px;
    align-items: center;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.85rem;
    color: var(--primary-text-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chip ha-icon {
    --mdc-icon-size: 18px;
  }
  .chip svg.arrow {
    position: static;
    width: 14px;
    height: 14px;
    flex: none;
  }
  .chip.warning {
    color: #1b1b1b;
    background: var(--warn-color);
  }
  .chip.warning.dark {
    color: #fff;
  }
  .warning-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .missing {
    padding: 16px;
    color: var(--error-color, #db4437);
  }


  /* ---------- effect groups fade in / out ---------- */
  .fx {
    position: absolute;
    inset: 0;
    animation: ist-fade-in 1.6s ease both;
    transition: opacity 1.5s ease;
  }
  .fx.leaving {
    opacity: 0;
  }
  .state-text {
    display: inline-block;
    animation: ist-text-in 0.6s ease both;
  }

  /* ---------- power button ---------- */
  .power {
    position: absolute;
    right: 12px;
    bottom: 12px;
    z-index: 3;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    padding: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: #fff;
    background: #6b7280;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: background 0.6s ease, box-shadow 0.6s ease, transform 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .power:hover {
    transform: scale(1.05);
  }
  .power:active {
    transform: scale(0.92);
  }
  .power:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 3px;
  }
  .power svg {
    position: static;
    width: 24px;
    height: 24px;
  }
  .power .ring {
    position: absolute;
    inset: -4px;
    width: auto;
    height: auto;
    border-radius: 50%;
    border: 3px solid transparent;
    pointer-events: none;
  }
  .on .power {
    background: #d81f26;
    box-shadow: 0 0 0 0 rgba(216, 31, 38, 0.6), 0 2px 6px rgba(0, 0, 0, 0.3);
    animation: ist-power-glow 2.4s ease-in-out infinite;
  }
  .pending .power .ring {
    border-top-color: #f5c542;
    border-right-color: #f5c542;
    animation: ist-spin 0.9s linear infinite;
  }
  .power.failed {
    animation: ist-shake 0.5s ease both;
  }
  .unavailable .power {
    background: #9ca3af;
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* ---------- pending (switch command sent) ---------- */
  .pending .blower .led {
    fill: #f5c542;
    animation: ist-blink 0.5s steps(2) infinite;
  }
  .pending.off .blower .fan {
    animation: ist-spin 1.2s linear infinite;
  }
  .pending.off .heap {
    animation: ist-twitch 0.6s ease-in-out infinite;
  }
  .pending.on .breathe {
    animation: ist-shudder 0.5s linear infinite;
  }

  /* ---------- unavailable ---------- */
  .unavailable .figure {
    filter: grayscale(0.85) brightness(0.8);
  }
  .unavailable .blower .led {
    fill: #ef4444;
    animation: ist-blink 1.2s steps(2) infinite;
  }
  .unplugged {
    position: absolute;
    left: 50%;
    top: 38%;
    width: 44px;
    height: 44px;
    margin-left: -22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.85);
    color: #b91c1c;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    animation: ist-fade-in 1s ease both, ist-bob 2.4s ease-in-out 1s infinite;
    pointer-events: none;
  }
  .unplugged svg {
    position: static;
    width: 26px;
    height: 26px;
  }

  /* ---------- chips ---------- */
  .chip {
    animation: ist-chip-in 0.5s ease both;
  }
  .chip.warning {
    transition: background 1.5s ease;
  }
  .chip.warning.severe {
    animation: ist-chip-in 0.5s ease both, ist-warn-pulse 1.8s ease-in-out 0.5s infinite;
  }
  .storm-hint.leaving {
    opacity: 0;
    transition: opacity 1.2s ease;
  }
  .storm-hint {
    animation: ist-chip-in 0.6s ease both, ist-pulse 1.6s ease-in-out 0.6s infinite;
  }

  @keyframes ist-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes ist-text-in {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: none; }
  }
  @keyframes ist-chip-in {
    from { opacity: 0; transform: translateY(6px) scale(0.95); }
    to { opacity: 1; transform: none; }
  }
  @keyframes ist-warn-pulse {
    0%, 100% { box-shadow: 0 0 0 0 var(--warn-color); }
    50% { box-shadow: 0 0 0 4px transparent; }
  }
  @keyframes ist-power-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(216, 31, 38, 0.55), 0 2px 6px rgba(0, 0, 0, 0.3); }
    50% { box-shadow: 0 0 0 8px rgba(216, 31, 38, 0), 0 2px 6px rgba(0, 0, 0, 0.3); }
  }
  @keyframes ist-shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  @keyframes ist-blink {
    to { visibility: hidden; }
  }
  @keyframes ist-twitch {
    0%, 100% { transform: scale(1, 1); }
    50% { transform: scale(1.02, 1.08); }
  }
  @keyframes ist-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  /* ---------- keyframes ---------- */
  @keyframes ist-inflate {
    0% { transform: scale(1.35, 0.06); opacity: 0; }
    8% { opacity: 1; }
    35% { transform: scale(1.15, 0.45); }
    60% { transform: scale(0.94, 0.9); }
    75% { transform: scale(1.04, 1.04); }
    88% { transform: scale(0.99, 0.98); }
    100% { transform: scale(1, 1); opacity: 1; }
  }
  @keyframes ist-deflate {
    0% { transform: scale(1, 1); opacity: 1; }
    25% { transform: scale(1.02, 0.93); }
    60% { transform: scale(1.12, 0.5); }
    90% { transform: scale(1.3, 0.1); opacity: 1; }
    100% { transform: scale(1.35, 0.06); opacity: 0; }
  }
  @keyframes ist-head-up {
    0% { transform: rotate(80deg); }
    45% { transform: rotate(55deg); }
    70% { transform: rotate(-10deg); }
    85% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes ist-head-down {
    0% { transform: rotate(0deg); }
    20% { transform: rotate(-6deg); }
    60% { transform: rotate(40deg); }
    100% { transform: rotate(85deg); }
  }
  @keyframes ist-heap-out {
    0% { opacity: 1; transform: scale(1); }
    25% { opacity: 0; transform: scale(0.9, 0.7); }
    100% { opacity: 0; transform: scale(0.9, 0.7); }
  }
  @keyframes ist-heap-in {
    0%, 75% { opacity: 0; transform: scale(0.9, 0.7); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ist-sway {
    0%, 100% { transform: rotate(calc(var(--lean) - var(--amp))); }
    50% { transform: rotate(calc(var(--lean) + var(--amp))); }
  }
  @keyframes ist-breathe {
    0%, 100% { transform: scale(1, 1); }
    50% { transform: scale(1.012, 0.99); }
  }
  @keyframes ist-shudder {
    0%, 100% { transform: scale(1, 1) skewX(0deg); }
    25% { transform: scale(1.015, 0.985) skewX(1.5deg); }
    75% { transform: scale(0.99, 1.01) skewX(-1.5deg); }
  }
  @keyframes ist-wave {
    0%, 100% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
  }
  @keyframes ist-flutter {
    0%, 100% { transform: rotate(calc(var(--hat-lean) - 4deg)); }
    50% { transform: rotate(calc(var(--hat-lean) + 4deg)); }
  }
  @keyframes ist-glow {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 0.8; }
  }
  @keyframes ist-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes ist-fall {
    from { transform: translate(0, -5%); }
    to { transform: translate(var(--drift), 105%); }
  }
  @keyframes ist-blow {
    from { transform: translateX(-30%); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    to { transform: translateX(110%); opacity: 0; }
  }
  @keyframes ist-blow-left {
    from { transform: translateX(30%); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    to { transform: translateX(-110%); opacity: 0; }
  }
  @keyframes ist-drift {
    from { transform: translateX(-40%); }
    to { transform: translateX(calc(100cqw + 40%)); }
  }
  @keyframes ist-drift-left {
    from { transform: translateX(calc(100cqw + 40%)); }
    to { transform: translateX(-140%); }
  }
  @keyframes ist-twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
  @keyframes ist-fog {
    from { transform: translateX(-12%); }
    to { transform: translateX(12%); }
  }
  @keyframes ist-flash {
    0%, 61%, 64%, 67%, 100% { opacity: 0; }
    62% { opacity: 0.85; }
    63% { opacity: 0.2; }
    65% { opacity: 0.6; }
  }
  @keyframes ist-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.65; }
  }
  .layer.clouds {
    container-type: inline-size;
  }

  @media (prefers-reduced-motion: reduce) {
    .on .sway,
    .on .breathe,
    .on .arm-wave,
    .on .hat-tip,
    .on .halo,
    .flake,
    .drop,
    .streak-wrap,
    .cloud,
    .star,
    .fog,
    .flash,
    .storm-hint,
    .unplugged,
    .on .power,
    .chip,
    .fx {
      animation: none !important;
    }
    .on .sway {
      transform: rotate(var(--lean));
    }
    .flake,
    .drop {
      transform: translateY(var(--rest, 40%));
    }
  }
`,bt=B`
  <defs>
    <radialGradient id="ist-body" cx="38%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#ff5a52" />
      <stop offset="55%" stop-color="#d81f26" />
      <stop offset="100%" stop-color="#8f0d14" />
    </radialGradient>
    <radialGradient id="ist-hat" cx="35%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#ff5a52" />
      <stop offset="100%" stop-color="#a5111a" />
    </radialGradient>
    <radialGradient id="ist-face" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#ffe0c7" />
      <stop offset="100%" stop-color="#eeb48f" />
    </radialGradient>
    <linearGradient id="ist-fur" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#dfe6ee" />
    </linearGradient>
    <linearGradient id="ist-boot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a3a3a" />
      <stop offset="100%" stop-color="#111" />
    </linearGradient>
    <radialGradient id="ist-halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255,214,150,0.75)" />
      <stop offset="60%" stop-color="rgba(255,170,90,0.18)" />
      <stop offset="100%" stop-color="rgba(255,170,90,0)" />
    </radialGradient>
    <clipPath id="ist-body-clip">
      <ellipse cx="120" cy="160" rx="52" ry="56" />
    </clipPath>
  </defs>
`,vt=B`
  <path class="ground" d="M-400 228 Q -200 216 0 226 Q 60 214 120 222 T 240 220 Q 420 214 640 226 L 640 600 L -400 600 Z" />
  <path class="ground-shine" d="M18 228 Q 70 220 118 227" />
`,$t=B`<ellipse class="halo" cx="120" cy="140" rx="110" ry="112" fill="url(#ist-halo)" />`,xt=B`
  <g class="ropes">
    <path d="M80 196 Q 58 218 36 236" />
    <path d="M160 196 Q 182 218 204 236" />
    <rect x="33" y="232" width="6" height="8" rx="1" />
    <rect x="201" y="232" width="6" height="8" rx="1" />
  </g>
`,kt=B`
  <g class="blower">
    <rect x="98" y="226" width="44" height="12" rx="3" />
    <circle class="fan" cx="110" cy="232" r="4" />
    <circle class="led" cx="134" cy="232" r="2" />
  </g>
`,At=B`<ellipse class="shadow" cx="120" cy="236" rx="58" ry="6" />`,Et=B`
  <g class="sway">
    <g class="inflate">
      <g class="breathe">
        <!-- boots -->
        <ellipse cx="98" cy="221" rx="17" ry="9" fill="url(#ist-boot)" />
        <ellipse cx="142" cy="221" rx="17" ry="9" fill="url(#ist-boot)" />
        <!-- legs -->
        <path d="M90 186 L 92 218 Q 98 222 108 218 L 116 194 L 124 194 L 132 218 Q 142 222 148 218 L 150 186 Z" fill="url(#ist-body)" />
        <rect x="88" y="208" width="22" height="7" rx="3.5" fill="url(#ist-fur)" />
        <rect x="130" y="208" width="22" height="7" rx="3.5" fill="url(#ist-fur)" />

        <!-- left arm (resting) -->
        <path d="M76 128 Q 52 150 58 184 L 72 182 Q 70 156 86 140 Z" fill="url(#ist-body)" />
        <rect x="54" y="176" width="22" height="8" rx="4" fill="url(#ist-fur)" transform="rotate(-6 65 180)" />
        <ellipse cx="64" cy="192" rx="10" ry="11" fill="#1f6b33" />

        <!-- body -->
        <ellipse cx="120" cy="160" rx="52" ry="56" fill="url(#ist-body)" />
        <g clip-path="url(#ist-body-clip)">
          <rect x="113" y="100" width="14" height="120" rx="7" fill="url(#ist-fur)" />
          <path d="M60 204 Q 120 222 180 204 L 180 230 L 60 230 Z" fill="url(#ist-fur)" />
          <rect x="60" y="170" width="120" height="14" fill="#1b1b1b" />
          <circle class="button" cx="120" cy="140" r="2.6" />
          <circle class="button" cx="120" cy="156" r="2.6" />
        </g>
        <rect x="108" y="166" width="24" height="22" rx="3" fill="none" stroke="#f5c542" stroke-width="4" />
        <path class="seam" d="M80 118 Q 70 160 82 205" />
        <path class="seam" d="M160 118 Q 170 160 158 205" />
        <ellipse class="gloss" cx="96" cy="132" rx="14" ry="24" transform="rotate(20 96 132)" />

        <!-- right arm (waving) -->
        <g class="arm-wave">
          <path d="M160 128 Q 186 118 192 86 L 178 82 Q 176 104 154 114 Z" fill="url(#ist-body)" />
          <rect x="174" y="80" width="22" height="8" rx="4" fill="url(#ist-fur)" transform="rotate(10 185 84)" />
          <ellipse cx="187" cy="70" rx="10" ry="12" fill="#1f6b33" />
          <ellipse cx="179" cy="73" rx="4" ry="6" fill="#1f6b33" transform="rotate(-30 179 73)" />
        </g>

        <!-- head -->
        <g class="head">
          <circle cx="120" cy="90" r="27" fill="url(#ist-face)" />
          <!-- beard -->
          <path d="M92 90 Q 90 118 104 130 Q 112 140 120 136 Q 128 140 136 130 Q 150 118 148 90 Q 142 106 132 104 Q 120 112 108 104 Q 98 106 92 90 Z" fill="url(#ist-fur)" />
          <ellipse cx="111" cy="104" rx="10" ry="5" fill="#fff" transform="rotate(12 111 104)" />
          <ellipse cx="129" cy="104" rx="10" ry="5" fill="#fff" transform="rotate(-12 129 104)" />
          <circle cx="120" cy="98" r="5.2" fill="#ec8f78" />
          <circle cx="106" cy="96" r="4.5" fill="#f7a1a1" opacity="0.6" />
          <circle cx="134" cy="96" r="4.5" fill="#f7a1a1" opacity="0.6" />
          <path class="eye" d="M106 87 Q 110 83 114 87" />
          <path class="eye" d="M126 87 Q 130 83 134 87" />
          <ellipse class="gloss" cx="110" cy="78" rx="7" ry="4" />
          <!-- hat -->
          <g class="hat-tip">
            <path d="M95 70 Q 104 34 134 30 Q 160 30 170 48 Q 158 44 150 48 Q 146 58 147 70 Z" fill="url(#ist-hat)" />
            <circle cx="172" cy="52" r="8" fill="url(#ist-fur)" />
          </g>
          <rect x="90" y="63" width="60" height="14" rx="7" fill="url(#ist-fur)" />
        </g>
      </g>
    </g>
  </g>
`,St=B`
  <g class="heap">
    <path d="M66 234 Q 64 214 84 216 Q 92 202 108 210 Q 120 198 134 208 Q 152 200 160 216 Q 180 214 178 234 Z" fill="url(#ist-body)" />
    <path d="M86 224 Q 100 214 112 222 Q 120 216 128 222" class="fold" />
    <path d="M136 218 Q 146 212 156 222" class="fold" />
    <path d="M100 234 Q 108 222 122 226 Q 136 222 144 234 Z" fill="url(#ist-fur)" />
    <ellipse cx="150" cy="212" rx="11" ry="6" fill="url(#ist-fur)" />
    <ellipse cx="88" cy="226" rx="9" ry="5" fill="#1f6b33" />
    <circle cx="170" cy="226" r="5" fill="url(#ist-fur)" />
  </g>
`,Ct={on:"Aufgeblasen",off:"Luft raus",inflating:"Wird aufgeblasen …",deflating:"Luft wird abgelassen …",turn_on:"Einschalten",turn_off:"Ausschalten",unavailable:"Nicht verfügbar",wind:"Wind",no_warning:"Keine Warnung",warning_level:"Warnstufe",storm_hint:"Starker Wind – Abschalten empfohlen",missing_entity:"Bitte eine Schaltsteckdose (entity) auswählen.",entity_not_found:"Entität nicht gefunden",card_description:"Animierter, beleuchteter aufblasbarer Weihnachtsmann mit Wind- und Wettereffekten.","editor.entity":"Schaltsteckdose (Ein/Aus)","editor.name":"Name","editor.wind_speed_entity":"Windgeschwindigkeit","editor.wind_direction_entity":"Windrichtung","editor.warning_entity":"DWD-Warnstufe","editor.weather_entity":"Wetter-Entität (optional)","editor.view_direction":"Blickrichtung auf den Weihnachtsmann (°, 0 = Norden)","editor.storm_threshold":"Sturmhinweis ab (km/h)","editor.show_name":"Name anzeigen","editor.show_info":"Infozeile anzeigen","editor.show_weather_effects":"Wettereffekte anzeigen","editor.show_power_button":"Ein/Aus-Button anzeigen","editor.tap_action":"Aktion bei Antippen","editor.hold_action":"Aktion bei langem Drücken","editor.double_tap_action":"Aktion bei Doppeltippen","editor.section_entities":"Wetter & Wind","editor.section_appearance":"Darstellung","editor.section_actions":"Interaktionen"},Mt={on:"Inflated",off:"Deflated",inflating:"Inflating …",deflating:"Deflating …",turn_on:"Turn on",turn_off:"Turn off",unavailable:"Unavailable",wind:"Wind",no_warning:"No warning",warning_level:"Warning level",storm_hint:"Strong wind – consider switching off",missing_entity:"Please select a smart plug (entity).",entity_not_found:"Entity not found",card_description:"Animated, illuminated inflatable Santa with wind and weather effects.","editor.entity":"Smart plug (on/off)","editor.name":"Name","editor.wind_speed_entity":"Wind speed","editor.wind_direction_entity":"Wind direction","editor.warning_entity":"DWD warning level","editor.weather_entity":"Weather entity (optional)","editor.view_direction":"Direction you look at Santa (°, 0 = north)","editor.storm_threshold":"Storm hint from (km/h)","editor.show_name":"Show name","editor.show_info":"Show info row","editor.show_weather_effects":"Show weather effects","editor.show_power_button":"Show power button","editor.tap_action":"Tap action","editor.hold_action":"Hold action","editor.double_tap_action":"Double tap action","editor.section_entities":"Weather & wind","editor.section_appearance":"Appearance","editor.section_actions":"Interactions"};function Pt(t,e){return((e||"en").toLowerCase().startsWith("de")?Ct:Mt)[t]??Mt[t]??t}function Tt(t){return t?.locale?.language||t?.language||navigator.language||"en"}const Ut=(t,e,i)=>Math.min(i,Math.max(e,t)),Nt=t=>!t||"unavailable"===t.state||"unknown"===t.state||""===t.state,Ot=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];function Wt(t){if(null==t)return;if("number"==typeof t)return Number.isFinite(t)?(t%360+360)%360:void 0;const e=String(t).trim();if(""===e||"unknown"===e||"unavailable"===e)return;const i=Number(e.replace(",",".").replace("°",""));if(Number.isFinite(i))return(i%360+360)%360;let s=e.toLowerCase();s=s.replace(/nord|north/g,"n").replace(/süd|sued|south/g,"s").replace(/ost|east/g,"e").replace(/west/g,"w").replace(/[^a-z]/g,"").toUpperCase().replace(/O/g,"E");const n=Ot.indexOf(s);return n>=0?22.5*n:void 0}function Lt(t,e){switch((e||"km/h").toLowerCase().replace(/\s/g,"")){case"m/s":return 3.6*t;case"mph":return 1.609344*t;case"kn":case"kt":case"knots":return 1.852*t;case"ft/s":return 1.09728*t;default:return t}}const Dt=["","#f6c12d","#fb8c00","#e53935","#8e24aa"];const Ht=(t,...e)=>t.some(t=>e.some(e=>t.toLowerCase().includes(e)));function zt(t){let e=t>>>0;return()=>(e=1664525*e+1013904223>>>0,e/4294967296)}const Ft=[{name:"entity",required:!0,selector:{entity:{domain:["switch","input_boolean","light"]}}},{name:"name",selector:{text:{}}},{type:"expandable",name:"",flatten:!0,title:"section_entities",icon:"mdi:weather-windy",expanded:!0,schema:[{name:"wind_speed_entity",selector:{entity:{domain:"sensor"}}},{name:"wind_direction_entity",selector:{entity:{domain:"sensor"}}},{name:"warning_entity",selector:{entity:{domain:"sensor"}}},{name:"weather_entity",selector:{entity:{domain:"weather"}}}]},{type:"expandable",name:"",flatten:!0,title:"section_appearance",icon:"mdi:palette",schema:[{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_info",selector:{boolean:{}}},{name:"show_weather_effects",selector:{boolean:{}}},{name:"show_power_button",selector:{boolean:{}}}]},{name:"storm_threshold",selector:{number:{min:10,max:150,step:5,mode:"box",unit_of_measurement:"km/h"}}},{name:"view_direction",selector:{number:{min:0,max:359,step:1,mode:"slider",unit_of_measurement:"°"}}}]},{type:"expandable",name:"",flatten:!0,title:"section_actions",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{default_action:"more-info"}}},{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}];let Qt=class extends ct{constructor(){super(...arguments),this._computeLabel=t=>{const e=Tt(this.hass),i=t.name||t.title||"";return i?Pt(`editor.${i}`,e):""}}setConfig(t){this._config=t}connectedCallback(){super.connectedCallback(),this._loadHaComponents()}async _loadHaComponents(){if(!customElements.get("ha-form")||!customElements.get("ha-entity-picker"))try{const t=await(window.loadCardHelpers?.());if(!t)return;const e=await t.createCardElement({type:"entities",entities:[]});await(e?.constructor?.getConfigElement?.()),this.requestUpdate()}catch{}}_valueChanged(t){t.stopPropagation();const e={...t.detail.value};for(const t of Object.keys(e))""!==e[t]&&void 0!==e[t]&&null!==e[t]||delete e[t];this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){if(!this.hass||!this._config)return q;const t={show_name:!0,show_info:!0,show_weather_effects:!0,show_power_button:!0,storm_threshold:50,view_direction:0,...this._config};return j`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${Ft}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}};Qt.styles=o`
    ha-form {
      display: block;
    }
  `,t([ut({attribute:!1})],Qt.prototype,"hass",void 0),t([gt()],Qt.prototype,"_config",void 0),Qt=t([ht("inflatable-santa-card-editor")],Qt);const It="inflatable-santa-card";console.info("%c INFLATABLE-SANTA-CARD %c v1.1.0 ","color:#fff;background:#d81f26;font-weight:700;border-radius:3px 0 0 3px","color:#d81f26;background:#fff;font-weight:700;border-radius:0 3px 3px 0");const Rt=new Set(["on","open","playing","home"]);(()=>{const t=(t,e,i)=>{try{CSS.registerProperty?.({name:t,syntax:e,inherits:!0,initialValue:i})}catch{}};t("--lean","<angle>","0deg"),t("--amp","<angle>","1deg"),t("--hat-lean","<angle>","0deg"),t("--warn-color","<color>","transparent")})();const jt=B`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.56 5.44l-1.45 1.45A5.97 5.97 0 0 1 18 12a6 6 0 0 1-12 0c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.96 7.96 0 0 0 4 12a8 8 0 0 0 16 0c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2"/></svg>`,Bt=B`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.84 22.73L15.31 17.2 14.5 18c-1.3 1.3-3.08 1.83-4.79 1.6l-2.68 2.67-1.41-1.41 2.67-2.68C8.06 16.47 8.6 14.7 9.89 13.4l.8-.81L1.11 3l1.28-1.27 19.73 19.73zM17.6 14.9l-1.4-1.41 1.6-1.6-1.06-1.06-1.6 1.6-1.41-1.4 1.6-1.6-1.06-1.07-1.6 1.6-1.41-1.4 2.12-2.13a5.25 5.25 0 0 1 6.44-.78l2.67-2.67 1.41 1.41-2.67 2.67c.6.98.84 2.13.71 3.24z"/></svg>`,Xt=(t,e,i)=>{t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))};let qt=class extends ct{constructor(){super(...arguments),this._animate=!1,this._held=!1,this._pending=!1,this._failed=!1,this._linger=new Map,this._animatingUntil=0}static getConfigElement(){return document.createElement(`${It}-editor`)}static getStubConfig(t){const e=Object.keys(t?.states??{}),i=t=>e.find(t),s=e.filter(t=>t.startsWith("switch.")),n=s.find(t=>/santa|weihnacht|nikolaus|xmas|christmas/i.test(t))??s[0]??"",a=i(e=>e.startsWith("sensor.")&&"wind_speed"===t.states[e].attributes.device_class),o=i(t=>t.startsWith("sensor.")&&/wind_?(direction|bearing|richtung)|windrichtung/i.test(t)),r=i(t=>t.startsWith("sensor.")&&/current_warning_level/i.test(t)),l=i(t=>t.startsWith("weather.")),c={entity:n};return a&&(c.wind_speed_entity=a),o&&(c.wind_direction_entity=o),r&&(c.warning_entity=r),l&&(c.weather_entity=l),c}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={show_name:!0,show_info:!0,show_weather_effects:!0,show_power_button:!0,storm_threshold:50,view_direction:0,...t}}getCardSize(){return!1===this._config?.show_info?5:6}getGridOptions(){return{columns:6,rows:6,min_columns:4,min_rows:4}}firstUpdated(){requestAnimationFrame(()=>this._animate=!0)}shouldUpdate(t){if(!this._config)return!1;if(["_config","_animate","_pending","_failed"].some(e=>t.has(e)))return!0;const e=t.get("hass");if(!e||!this.hass)return!0;const i=this._config;return[i.entity,i.wind_speed_entity,i.wind_direction_entity,i.warning_entity,i.weather_entity,"sun.sun"].some(t=>t&&e.states[t]!==this.hass.states[t])||e.locale?.language!==this.hass.locale?.language}_onPointerDown(t){0===t.button&&(this._held=!1,window.clearTimeout(this._holdTimer),this._holdTimer=window.setTimeout(()=>{this._held=!0,this._runAction("hold")},500))}_onPointerUp(){if(window.clearTimeout(this._holdTimer),!this._held)return this._config?.double_tap_action&&"none"!==this._config.double_tap_action.action?this._tapTimer?(window.clearTimeout(this._tapTimer),this._tapTimer=void 0,void this._runAction("double_tap")):void(this._tapTimer=window.setTimeout(()=>{this._tapTimer=void 0,this._runAction("tap")},250)):void this._runAction("tap")}_onPointerCancel(){window.clearTimeout(this._holdTimer)}_onKeyDown(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._runAction("tap"))}_runAction(t){if(!this.hass||!this._config)return;const e={tap:{action:!1===this._config.show_power_button?"toggle":"more-info"},hold:{action:"more-info"},double_tap:{action:"none"}},i=this._config[`${t}_action`]??e[t];this._handleAction(i)}async _handleAction(t){const e=this.hass,i=t.entity||this._config.entity;if("none"!==t.action){if(t.confirmation){const e="object"==typeof t.confirmation&&t.confirmation.text?t.confirmation.text:`${t.action}?`;if(Xt(this,"haptic","warning"),!window.confirm(e))return}switch(t.action){case"toggle":if(!i)return;Xt(this,"haptic","light"),await e.callService("homeassistant","toggle",{entity_id:i});break;case"more-info":i&&Xt(this,"hass-more-info",{entityId:i});break;case"navigate":t.navigation_path&&(history.pushState(null,"",t.navigation_path),Xt(window,"location-changed",{replace:!1}));break;case"url":t.url_path&&window.open(t.url_path);break;case"perform-action":case"call-service":{const i=t.perform_action||t.service;if(!i)return;const[s,n]=i.split(".",2);Xt(this,"haptic","light"),await e.callService(s,n,t.data??t.service_data,t.target);break}}}}async _onPower(t){if(t.stopPropagation(),!this.hass||!this._config?.entity||this._pending)return;const e=this.hass.states[this._config.entity];if(e&&"unavailable"!==e.state){this._pending=!0,this._failed=!1,window.clearTimeout(this._pendingTimer),this._pendingTimer=window.setTimeout(()=>{this._pending=!1,this._failed=!0,window.setTimeout(()=>this._failed=!1,700)},1e4),Xt(this,"haptic","light");try{await this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity})}catch{window.clearTimeout(this._pendingTimer),this._pending=!1,this._failed=!0,Xt(this,"haptic","failure"),window.setTimeout(()=>this._failed=!1,700)}}}_keep(t,e){const i=!!e,s=Date.now();if(i)return this._linger.set(t,{value:e,until:0}),{value:e,leaving:!1};const n=this._linger.get(t);return n&&this._animate?(0===n.until&&(n.until=s+1600),s<n.until?(window.clearTimeout(this._lingerTimer),this._lingerTimer=window.setTimeout(()=>this.requestUpdate(),n.until-s+30),{value:n.value,leaving:!0}):(this._linger.delete(t),{value:e,leaving:!1})):{value:e,leaving:!1}}render(){if(!this._config||!this.hass)return q;const t=this._config,e=Tt(this.hass);if(!t.entity)return j`<ha-card><div class="missing">${Pt("missing_entity",e)}</div></ha-card>`;const i=this.hass.states[t.entity],s=!i||"unavailable"===i.state||"unknown"===i.state,n=!!i&&Rt.has(i.state),a=this._animate&&void 0!==this._lastIsOn&&this._lastIsOn!==n;void 0!==this._lastIsOn&&this._lastIsOn!==n&&this._pending&&(window.clearTimeout(this._pendingTimer),this._pending=!1),void 0!==this._lastIsOn&&this._lastIsOn===n||(this._lastIsOn=n,a&&(this._animatingUntil=Date.now()+3500));const o=a||Date.now()<this._animatingUntil,r=function(t,e,i,s){const n={},a=e?t.states[e]:void 0;if(a&&!Nt(a)){const t=Number(String(a.state).replace(",","."));Number.isFinite(t)&&(n.speed=Lt(t,a.attributes.unit_of_measurement))}const o=i?t.states[i]:void 0;o&&!Nt(o)&&(n.direction=Wt(o.state));const r=s?t.states[s]:void 0;if(r&&!Nt(r)){if(void 0===n.speed&&void 0!==r.attributes.wind_speed){const t=Number(r.attributes.wind_speed);Number.isFinite(t)&&(n.speed=Lt(t,r.attributes.wind_speed_unit))}void 0===n.direction&&void 0!==r.attributes.wind_bearing&&(n.direction=Wt(r.attributes.wind_bearing))}return n}(this.hass,t.wind_speed_entity,t.wind_direction_entity,t.weather_entity),l=function(t,e){const i=e?t.states[e]:void 0;if(!i||Nt(i))return;const s=Ut(Math.round(Number(i.state))||0,0,4),n=Number(i.attributes.warning_count)||0,a=[];let o,r,l=-1;for(let t=1;t<=Math.max(n,0);t++){const e=i.attributes[`warning_${t}_name`];e&&a.push(String(e));const s=Number(i.attributes[`warning_${t}_level`])||0;s>l&&(l=s,o=i.attributes[`warning_${t}_headline`]||e,r=i.attributes[`warning_${t}_color`])}return{level:s,count:n,headline:o,names:a,color:r||Dt[s]||""}}(this.hass,t.warning_entity),c=!1!==t.show_weather_effects?function(t,e,i){const s={snow:0,rain:0,lightning:!1,fog:!1,clouds:0,night:!1,frost:!1},n=t.states["sun.sun"];n&&(s.night="below_horizon"===n.state);const a=e?t.states[e]:void 0;if(a&&!Nt(a)){switch(a.state){case"clear-night":s.night=!0;break;case"cloudy":s.clouds=2;break;case"partlycloudy":s.clouds=1;break;case"fog":s.fog=!0,s.clouds=1;break;case"rainy":s.rain=1,s.clouds=2;break;case"pouring":case"hail":s.rain=2,s.clouds=2;break;case"snowy":s.snow=1,s.clouds=1;break;case"snowy-rainy":s.snow=1,s.rain=1,s.clouds=2;break;case"lightning":s.lightning=!0,s.clouds=2;break;case"lightning-rainy":s.lightning=!0,s.rain=2,s.clouds=2;break;case"windy":case"windy-variant":s.clouds=Math.max(s.clouds,1)}const t=Number(a.attributes.temperature);Number.isFinite(t)&&t<=0&&(s.frost=!0)}if(i&&i.level>0){const t=i.names;Ht(t,"schnee","snow","schneeverwehung")&&(s.snow=Math.max(s.snow,i.level>=2?2:1)),Ht(t,"gewitter","thunder")&&(s.lightning=!0,s.clouds=2),Ht(t,"regen","rain","dauerregen","starkregen")&&(s.rain=Math.max(s.rain,i.level>=2?2:1)),Ht(t,"nebel","fog")&&(s.fog=!0),Ht(t,"frost","glätte","glatteis","glaette","ice")&&(s.frost=!0),s.clouds=Math.max(s.clouds,i.level>=2?2:1)}return s}(this.hass,t.weather_entity,l):{snow:0,rain:0,lightning:!1,fog:!1,clouds:0,night:"below_horizon"===this.hass.states["sun.sun"]?.state,frost:!1},d=r.speed??0,h=((r.direction??270)-(t.view_direction??0))*Math.PI/180,p=void 0===r.direction?d>0?.6:0:-Math.sin(h),f=d>=(t.storm_threshold??50),u=Ut(.28*d,0,16)*p,g=Ut(.8+.12*d,.8,9),m=Ut(4.5-.06*d,.9,4.5),_=Ut(2.2-.03*d,.35,2.2),y=["scene",n?"on":"off",o?"animate":"",c.night?"night":"",c.clouds>=2?"overcast":"",c.frost?"frost":"",f?"storm":"",p<-.05?"wind-left":"",s?"unavailable":"",this._pending?"pending":""].join(" "),w=l?.color||"transparent",b=[`--lean:${u.toFixed(2)}deg`,`--amp:${g.toFixed(2)}deg`,`--sway-dur:${m.toFixed(2)}s`,`--flutter-dur:${_.toFixed(2)}s`,`--hat-lean:${(p*Ut(.4*d,0,18)).toFixed(1)}deg`,`--warn-color:${w}`,"--warn-opacity:"+(l&&l.level>0?.15+.1*l.level:0)].join(";"),v=t.name||i?.attributes.friendly_name||t.entity,$=this._keep("storm",f&&n),x=s?Pt("unavailable",e):this._pending?Pt(n?"deflating":"inflating",e):Pt(n?"on":"off",e);return j`
      <ha-card
        tabindex="0"
        role="button"
        aria-label="${v}: ${x}"
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @pointerleave=${this._onPointerCancel}
        @keydown=${this._onKeyDown}
        @contextmenu=${t=>t.preventDefault()}
      >
        <div class=${y} style=${b}>
          <div class="sky overcast-day"></div>
          <div class="sky night"></div>
          <div class="sky overcast-night"></div>
          <div class="tint"></div>
          ${this._renderSky(c,d,p)}
          <svg viewBox="0 0 240 260" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            ${vt}${At}
          </svg>
          <svg class="figure" viewBox="0 0 240 260" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            ${bt}${$t}${xt}${St}${Et}${kt}
          </svg>
          ${this._renderPrecipitation(c,d,p)}
          ${s?j`<div class="unplugged" title=${x}>${Bt}</div>`:q}
          ${!1!==t.show_power_button?j`<button
                class="power ${this._failed?"failed":""}"
                type="button"
                ?disabled=${s}
                aria-pressed=${n?"true":"false"}
                aria-label="${v}: ${Pt(n?"turn_off":"turn_on",e)}"
                title=${Pt(n?"turn_off":"turn_on",e)}
                @pointerdown=${this._stop}
                @pointerup=${this._stop}
                @keydown=${this._stop}
                @click=${this._onPower}
              >
                <span class="ring"></span>${jt}
              </button>`:q}
          ${!1!==t.show_name||$.value?j`<div class="header">
                ${!1!==t.show_name?j`<div class="title">
                      <span class="name">${v}</span>
                      <span class="state">${yt(x,j`<span class="state-text">${x}</span>`)}</span>
                    </div>`:j`<span></span>`}
                ${$.value?j`<span class="storm-hint ${$.leaving?"leaving":""}">${Pt("storm_hint",e)}</span>`:q}
              </div>`:q}
        </div>
        ${!1!==t.show_info?this._renderInfo(r.speed,r.direction,l,e):q}
      </ha-card>
    `}updated(t){if(super.updated(t),this._animatingUntil>Date.now()){const t=this._animatingUntil-Date.now()+50;window.clearTimeout(this._animTimer),this._animTimer=window.setTimeout(()=>this.requestUpdate(),t)}}_renderSky(t,e,i){const s=zt(7),n=this._keep("stars",t.night&&t.clouds<2),a=n.value?Array.from({length:18},()=>{const t=`left:${(100*s()).toFixed(1)}%;top:${(55*s()).toFixed(1)}%;--dur:${(2+3*s()).toFixed(1)}s;--delay:-${(4*s()).toFixed(1)}s`;return j`<span class="star" style=${t}></span>`}):[],o=this._keep("clouds",t.clouds),r=o.value,l=0===r?0:1===r?2:4,c=Ut(90-1.2*e,18,90),d=Array.from({length:l},(e,i)=>{const n=r>=2?t.night?.18:.75:t.night?.12:.85,a=`--y:${(4+28*s()).toFixed(1)}%;--w:${(70+70*s()).toFixed(0)}px;--alpha:${n};--dur:${(c*(.8+.5*s())).toFixed(1)}s;--delay:-${(i/l*c).toFixed(1)}s`;return j`<span class="cloud" style=${a}></span>`}),h=this._keep("fog",t.fog),p=this._keep("lightning",t.lightning);return j`
      <div class="layer">${this._fx("stars",n.leaving,a)}</div>
      <div class="layer clouds ${i<-.05?"wind-left":""}">${this._fx(`clouds${l}`,o.leaving,d)}</div>
      <div class="layer">
        ${h.value?this._fx("fog",h.leaving,j`<span class="fog" style="top:45%"></span><span class="fog" style="top:62%;animation-duration:31s"></span>`):q}
      </div>
      <div class="layer">${p.value?this._fx("flash",p.leaving,j`<span class="flash"></span>`):q}</div>
    `}_fx(t,e,i){return Array.isArray(i)&&0===i.length?q:yt(t,j`<div class="fx ${e?"leaving":""}">${i}</div>`)}_renderPrecipitation(t,e,i){const s=zt(42),n=Ut(i*e*.9,-70,70),a=this._keep("snow",t.snow),o=this._keep("rain",t.rain),r=a.value,l=o.value,c=r?Array.from({length:r>=2?70:32},()=>{const t=2+s()*(r>=2?4:3),i=(r>=2?4:7)+4*s()-Ut(e/30,0,2),a=`--x:${(140*s()-20-n/2).toFixed(1)}%;--size:${t.toFixed(1)}px;--dur:${i.toFixed(1)}s;--delay:-${(s()*i).toFixed(1)}s;--drift:${(n+(10*s()-5)).toFixed(1)}%;--alpha:${(.6+.4*s()).toFixed(2)};--rest:${(90*s()).toFixed(0)}%`;return j`<span class="flake" style=${a}><i></i></span>`}):[],d=Ut(-i*e*.7,-45,45),h=l?Array.from({length:l>=2?70:35},()=>{const t=.5+.4*s(),e=`--x:${(140*s()-20-n/3).toFixed(1)}%;--dur:${t.toFixed(2)}s;--delay:-${(s()*t).toFixed(2)}s;--drift:${(n/3).toFixed(1)}%;--angle:${d.toFixed(1)}deg;--rest:${(90*s()).toFixed(0)}%`;return j`<span class="drop" style=${e}><i></i></span>`}):[],p=this._keep("streaks",e<8?0:Math.round(Ut(e/7,1,12))),f=p.value,u=Ut(3.2-e/30,.6,3.2),g=Array.from({length:f},()=>{const t=`--y:${(8+80*s()).toFixed(1)}%;--len:${(30+50*s()).toFixed(0)}px;--dur:${(u*(.8+.5*s())).toFixed(2)}s;--delay:-${(s()*u*2).toFixed(2)}s`;return j`<span class="streak-wrap" style=${t}><i></i></span>`});return j`
      <div class="layer">
        ${this._fx(`rain${l}`,o.leaving,h)}${this._fx(`snow${r}`,a.leaving,c)}
      </div>
      <div class="layer ${i<-.05?"wind-left":""}">${this._fx(`wind${f}`,p.leaving,g)}</div>
    `}_renderInfo(t,e,i,s){const n=this._config,a=[];if(void 0!==t||void 0!==e){const i=void 0!==e?B`<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 L19 20 L12 16 L5 20 Z" fill="currentColor" transform="rotate(${(e+180)%360} 12 12)"/></svg>`:q;a.push(j`<span
        class="chip"
        title=${Pt("wind",s)}
        @pointerdown=${this._stop}
        @pointerup=${t=>this._moreInfo(t,n.wind_speed_entity||n.wind_direction_entity||n.weather_entity)}
      >
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        ${void 0!==t?`${Math.round(t)} km/h`:""}
        ${i}
        ${void 0!==e?function(t,e){const i=Math.round(t/22.5)%16,s=Ot[i];return e.startsWith("de")?s.replace(/E/g,"O"):s}(e,s):""}
      </span>`)}if(n.warning_entity)if(i&&i.level>0){const t=i.level>=3,e=i.headline||`${Pt("warning_level",s)} ${i.level}`;a.push(j`<span
          class="chip warning ${t?"dark severe":""}"
          style="--warn-color:${i.color}"
          title=${i.names.join(", ")}
          @pointerdown=${this._stop}
          @pointerup=${t=>this._moreInfo(t,n.warning_entity)}
        >
          <ha-icon icon="mdi:alert"></ha-icon>
          <span class="warning-text">${e}</span>
        </span>`)}else i&&a.push(j`<span
          class="chip"
          @pointerdown=${this._stop}
          @pointerup=${t=>this._moreInfo(t,n.warning_entity)}
        >
          <ha-icon icon="mdi:shield-check-outline"></ha-icon>${Pt("no_warning",s)}
        </span>`);return 0===a.length?j``:j`<div class="info">${a}</div>`}_stop(t){t.stopPropagation()}_moreInfo(t,e){t.stopPropagation(),window.clearTimeout(this._holdTimer),e&&Xt(this,"hass-more-info",{entityId:e})}};qt.styles=wt,t([ut({attribute:!1})],qt.prototype,"hass",void 0),t([gt()],qt.prototype,"_config",void 0),t([gt()],qt.prototype,"_animate",void 0),t([gt()],qt.prototype,"_pending",void 0),t([gt()],qt.prototype,"_failed",void 0),qt=t([ht(It)],qt),window.customCards=window.customCards||[],window.customCards.some(t=>t.type===It)||window.customCards.push({type:It,name:"Inflatable Santa Card",description:Pt("card_description",navigator.language),preview:!0,documentationURL:"https://github.com/Pfillip/inflatable-santa-card"});export{qt as InflatableSantaCard};
