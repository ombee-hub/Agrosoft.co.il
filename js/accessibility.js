/* ─────────────────────────────────────────────
   Agrosoft — Accessibility Widget ("תו נגישות")
   מבוסס על יישומון הנגישות של OMBee Studio, בצבעי אגרוסופט.
   כרטיסים לבנים בשתי עמודות, מונה הגדרות פעילות על הכפתור הצף,
   איפוס ירוק, הצהרת נגישות ומדיניות פרטיות בתחתית.
   כל אפשרות היא <button> עם aria-pressed (נגיש גם במקלדת).
───────────────────────────────────────────── */
(function () {
  const STORAGE_KEY = 'agrosoft-a11y';
  const EN = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
  const FONT = EN ? "'Assistant',Arial,sans-serif" : "'Heebo',Arial,sans-serif";
  const DIR = EN ? 'ltr' : 'rtl';
  const ALIGN = EN ? 'left' : 'right';
  const SV = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  const T = EN ? {
    title: 'Accessibility', open: 'Open accessibility menu', openN: n => `Open accessibility menu (${n} active settings)`,
    close: 'Close accessibility menu', reset: 'Reset all accessibility settings',
    stmt: 'Accessibility Statement', priv: 'Privacy Policy',
    dys: 'Replaces the site font with a simpler, more readable one',
    labels: { contrast: '+ Contrast', links: 'Highlight Links', bigText: 'Big Text', spacing: 'Text Spacing',
      stopAnim: 'Stop Animations', hideImages: 'Hide Images', dyslexia: 'Dyslexia Support', bigCursor: 'Cursor',
      altText: 'Image Captions', lineHeight: 'Line Height', textAlign: 'Align Text', saturation: 'Grayscale' }
  } : {
    title: 'תו נגישות', open: 'פתיחת תפריט נגישות', openN: n => `פתיחת תפריט נגישות (${n} הגדרות פעילות)`,
    close: 'סגירת תפריט הנגישות', reset: 'איפוס את כל הגדרות הנגישות',
    stmt: 'הצהרת נגישות', priv: 'מדיניות פרטיות',
    dys: 'מחליף את הגופן באתר לגופן פשוט וקריא יותר',
    labels: { contrast: '+ ניגודיות', links: 'הדגשת קישורים', bigText: 'טקסט גדול', spacing: 'ריווח טקסט',
      stopAnim: 'ביטול הנפשות', hideImages: 'הסתרת תמונות', dyslexia: 'תמיכה בדיסלקסיה', bigCursor: 'סמן',
      altText: 'תאורים', lineHeight: 'גובה שורה', textAlign: 'יישור טקסט', saturation: 'רווי' }
  };

  const features = [
    { id: 'contrast',   icon: `<svg ${SV}><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>` },
    { id: 'links',      icon: `<svg ${SV}><path d="M9 8H7a4 4 0 0 0 0 8h2"/><path d="M15 8h2a4 4 0 0 1 0 8h-2"/><path d="M8 12h8"/></svg>` },
    { id: 'bigText',    icon: `<svg ${SV}><path d="M3 8V6h9v2"/><path d="M7.5 6v12"/><path d="M6 18h3"/><path d="M13 12v-1.5h8V12"/><path d="M17 10.5V18"/><path d="M15.8 18h2.4"/></svg>` },
    { id: 'spacing',    icon: `<svg ${SV}><path d="M6 9l-3 3 3 3"/><path d="M18 9l3 3-3 3"/><path d="M3 12h2M8 12h2M14 12h2M19 12h2"/></svg>` },
    { id: 'stopAnim',   icon: `<svg ${SV} stroke-dasharray="2.4 2.4"><circle cx="12" cy="12" r="9"/></svg><svg ${SV} style="position:absolute"><path d="M10 9v6M14 9v6"/></svg>` },
    { id: 'hideImages', icon: `<svg ${SV}><path d="M14 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/><path d="M17 3l4 4M21 3l-4 4"/></svg>` },
    { id: 'dyslexia',   info: T.dys, icon: `<svg ${SV} stroke-width="2"><path d="M3 5h3.5a7 7 0 0 1 0 14H3z"/><path d="M17 19V9.5A3.5 3.5 0 0 1 20.5 6"/><path d="M14.5 11.5h6"/></svg>` },
    { id: 'bigCursor',  icon: `<svg ${SV}><path d="M5 3l6.5 17 2.4-7.1L21 10.5z"/></svg>` },
    { id: 'altText',    icon: `<svg ${SV}><path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-8l-4 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M12 9.5V13"/><path d="M12 7h.01" stroke-width="2.4"/></svg>` },
    { id: 'lineHeight', icon: `<svg ${SV}><path d="M10 6h11M10 10h11M10 14h11M10 18h11"/><path d="M5 4v16"/><path d="M3 6l2-2 2 2"/><path d="M3 18l2 2 2-2"/></svg>` },
    { id: 'textAlign',  icon: `<svg ${SV}><path d="M3 6h18M3 10h18M3 14h18M9 18h12"/></svg>` },
    { id: 'saturation', icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5s-6.5 7-6.5 12a6.5 6.5 0 0 0 13 0c0-5-6.5-12-6.5-12z" fill="currentColor"/></svg>` },
  ];

  // ── Load saved state ──
  let state = {};
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (_) {}

  // ── Inject CSS ──
  const style = document.createElement('style');
  style.textContent = `
/* ── A11y Floating Button ── */
.agro-a11y-btn::before{
  content:"";position:absolute;inset:5px;border:2px solid #fff;border-radius:50%;pointer-events:none;
}
.agro-a11y-btn{
  position:fixed;bottom:24px;left:24px;z-index:10000;
  width:46px;height:46px;border-radius:50%;border:none;
  background:linear-gradient(135deg,#2d7a3a,#4caf50);color:#fff;cursor:pointer;
  box-shadow:0 4px 20px rgba(45,122,58,.4);
  display:flex;align-items:center;justify-content:center;
  transition:transform .3s ease,box-shadow .3s ease;
}
.agro-a11y-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(45,122,58,.5)}
.agro-a11y-btn:focus-visible{outline:3px solid #1a4d23;outline-offset:3px}
.agro-a11y-btn svg{width:24px;height:24px}
.agro-a11y-count{
  position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;
  background:#1a4d23;color:#fff;font:800 11px/20px ${FONT};text-align:center;display:none;
  box-shadow:0 0 0 2px #fff;
}
.agro-a11y-btn.active .agro-a11y-count{display:block}

/* ── Overlay ── */
.agro-a11y-overlay{
  position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.3);
  opacity:0;pointer-events:none;transition:opacity .3s ease;
}
.agro-a11y-overlay.open{opacity:1;pointer-events:all}

/* ── Panel ── */
.agro-a11y-panel{
  --a11y-w:280px;--a11y-icon:28px;--a11y-label:13px;--a11y-card:104px;
  position:fixed;bottom:0;left:0;z-index:10001;
  max-height:100vh;height:auto;
  width:var(--a11y-w);max-width:100vw;overflow-y:auto;overscroll-behavior:contain;
  background:linear-gradient(170deg,#f6fbf6,#e4f2e5);border-radius:0 18px 0 0;
  box-shadow:8px 0 40px rgba(0,0,0,.18);
  transform:translateX(-105%);visibility:hidden;
  transition:transform .35s cubic-bezier(.4,0,.2,1),visibility 0s linear .35s,width .25s ease;
  direction:${DIR};font-family:${FONT};color:#111;
}
.agro-a11y-panel.open{transform:none;visibility:visible;transition:transform .35s cubic-bezier(.4,0,.2,1),width .25s ease}
.agro-a11y-panel::-webkit-scrollbar{width:5px}
.agro-a11y-panel::-webkit-scrollbar-thumb{background:rgba(45,122,58,.35);border-radius:5px}

.agro-a11y-header{
  position:sticky;top:0;z-index:2;background:rgba(255,255,255,.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(45,122,58,.12);margin-bottom:8px;
  display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 12px 8px;
}
.agro-a11y-title{font-size:16px;font-weight:800;color:#1a4d23;margin:0;display:flex;align-items:center;gap:8px}
.agro-a11y-title-ico{color:#2d7a3a;display:flex;align-items:center;flex-shrink:0}
.agro-a11y-title-ico svg{width:24px;height:24px}
.agro-a11y-hctl{display:flex;align-items:center;gap:6px}
.agro-a11y-close{
  width:26px;height:26px;border-radius:50%;border:none;background:rgba(45,122,58,.1);color:#1a4d23;cursor:pointer;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.agro-a11y-close:hover{background:#2d7a3a;color:#fff}
.agro-a11y-close svg{width:14px;height:14px}
.agro-a11y-close:focus-visible{outline:3px solid #2d7a3a;outline-offset:2px}

.agro-a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:4px 12px 12px}
.agro-a11y-item{
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
  min-height:var(--a11y-card);padding:14px 6px;position:relative;
  border:2px solid transparent;border-radius:12px;background:#fff;color:#111;
  font-family:${FONT};cursor:pointer;text-align:center;
  box-shadow:0 2px 10px rgba(45,122,58,.12);
  transition:border-color .2s,box-shadow .2s,background .2s;
}
.agro-a11y-item:hover{border-color:#2d7a3a;box-shadow:0 6px 16px rgba(45,122,58,.2)}
.agro-a11y-item:focus-visible{outline:3px solid #1a4d23;outline-offset:2px}
.agro-a11y-item[aria-pressed="true"]{background:#2d7a3a;border-color:#2d7a3a;color:#fff}
.agro-a11y-ico{position:relative;display:flex;align-items:center;justify-content:center;width:var(--a11y-icon);height:var(--a11y-icon)}
.agro-a11y-ico svg{width:100%;height:100%}
.agro-a11y-item-label{font-size:var(--a11y-label);font-weight:800;line-height:1.25}
.agro-a11y-info{
  position:absolute;top:7px;left:7px;width:16px;height:16px;border-radius:50%;
  background:#dff2e1;color:#2d7a3a;font:800 10px/16px ${FONT};text-align:center;
}
.agro-a11y-item[aria-pressed="true"] .agro-a11y-info{background:rgba(255,255,255,.3);color:#fff}
.agro-a11y-check{
  position:absolute;top:7px;right:7px;width:18px;height:18px;border-radius:50%;
  background:#fff;color:#2d7a3a;display:none;align-items:center;justify-content:center;
}
.agro-a11y-check svg{width:11px;height:11px}
.agro-a11y-item[aria-pressed="true"] .agro-a11y-check{display:flex}

.agro-a11y-reset{
  display:flex;align-items:center;justify-content:center;gap:10px;
  width:calc(100% - 24px);margin:6px 12px 14px;padding:13px 14px;
  border:none;border-radius:10px;background:linear-gradient(135deg,#2d7a3a,#4caf50);color:#fff;box-shadow:0 6px 18px rgba(45,122,58,.3);
  font:800 13.5px ${FONT};cursor:pointer;transition:filter .2s;
}
.agro-a11y-reset:hover{filter:brightness(.92)}
.agro-a11y-reset:focus-visible{outline:3px solid #1a4d23;outline-offset:2px}
.agro-a11y-reset svg{width:20px;height:20px;flex-shrink:0;order:2}

.agro-a11y-bottom{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 12px 16px}
.agro-a11y-bottom a{display:flex;align-items:center;justify-content:center;gap:6px;padding:11px 6px;border-radius:10px;background:#fff;border:1.5px solid #2d7a3a;font:800 12.5px/1.3 ${FONT};color:#2d7a3a;text-decoration:none;white-space:normal;text-align:center;box-shadow:0 4px 12px rgba(45,122,58,.15);transition:background .2s,color .2s}
.agro-a11y-bottom a:hover{background:#2d7a3a;color:#fff}
.agro-a11y-bottom a:focus-visible{outline:3px solid #1a4d23;outline-offset:2px}
.agro-a11y-bottom svg{width:15px;height:15px;flex-shrink:0}

/* ── Applied A11y Styles (לא חלים על היישומון עצמו) ── */
html.a11y-contrast{filter:contrast(1.35)!important}
html.a11y-saturation{filter:grayscale(1)!important}
html.a11y-contrast.a11y-saturation{filter:contrast(1.35) grayscale(1)!important}
html.a11y-bigText body>:not(.agro-a11y-root) :is(p,li,h1,h2,h3,h4,h5,h6,label,td,blockquote,.btn-solid,.btn-ghost,nav a):not(:is(p,li,h1,h2,h3,h4,h5,h6,label,td,blockquote,.btn-solid,.btn-ghost,nav a) *){zoom:1.18}
html.a11y-spacing body>:not(.agro-a11y-root) *{letter-spacing:.06em!important;word-spacing:.14em!important}
html.a11y-lineHeight body>:not(.agro-a11y-root) :is(p,li,a,span,label,h1,h2,h3,h4,td,div){line-height:2!important}
html.a11y-links body>:not(.agro-a11y-root) a{text-decoration:underline!important;outline:2px solid #2d7a3a!important;outline-offset:2px!important}
html.a11y-hideImages body>:not(.agro-a11y-root) img{opacity:0!important}
html.a11y-hideImages body>:not(.agro-a11y-root) *{background-image:none!important}
html.a11y-stopAnim *,html.a11y-stopAnim *::before,html.a11y-stopAnim *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
html.a11y-bigCursor,html.a11y-bigCursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M8 8l12 30 5-15 15-5z' fill='%232d7a3a' stroke='%23fff' stroke-width='2.5'/%3E%3C/svg%3E") 8 8,auto!important}
html.a11y-dyslexia body>:not(.agro-a11y-root) *{font-family:Arial,'Segoe UI',sans-serif!important;font-weight:500!important}
html.a11y-textAlign body>:not(.agro-a11y-root) *{text-align:${ALIGN}!important}
.agro-alt-cap{display:block;font:600 12px/1.4 ${FONT};color:#1a4d23;background:#eaf6ea;border:1px solid #bfe3c2;padding:4px 8px;border-radius:6px;margin:4px 0;direction:${DIR};text-align:${ALIGN}}

/* ── Mobile ── */
@media(max-width:480px){
  .agro-a11y-btn{bottom:16px;left:16px;width:50px;height:50px}
  .agro-a11y-btn svg{width:26px;height:26px}
}
@media(max-width:600px){
  .agro-a11y-panel{width:auto;left:0;right:0;border-radius:18px 18px 0 0;max-height:82vh;transform:translateY(105%)}
  .agro-a11y-panel.open{transform:none}
  .agro-a11y-grid{grid-template-columns:1fr 1fr 1fr;gap:8px;padding:4px 10px 10px}
  .agro-a11y-item{min-height:84px;padding:10px 4px;gap:8px;border-radius:10px}
  .agro-a11y-ico{width:24px;height:24px}
  .agro-a11y-item-label{font-size:11.5px}
  .agro-a11y-reset{margin:4px 10px 10px;width:calc(100% - 20px);padding:12px}
  .agro-a11y-bottom{padding:0 10px 12px}
}
@media(prefers-reduced-motion:reduce){.agro-a11y-panel,.agro-a11y-overlay,.agro-a11y-btn{transition:none}}
`;
  document.head.appendChild(style);

  const A11Y_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="3.8" r="2.2"/><path d="M20.5 8.7c-2.6.7-5.5 1.1-8.5 1.1s-5.9-.4-8.5-1.1c-.5-.1-1 .2-1.1.7-.1.5.2 1 .7 1.1 2.3.6 4.7 1 7.2 1.1v3.6L7.5 21c-.2.5 0 1.1.5 1.3.5.2 1.1 0 1.3-.5L11.7 16h.6l2.4 5.8c.2.5.8.7 1.3.5.5-.2.7-.8.5-1.3L13.7 15v-3.5c2.5-.1 4.9-.5 7.2-1.1.5-.1.8-.6.7-1.1-.1-.5-.6-.8-1.1-.7z"/></svg>';

  // ── Build HTML ──
  const wrapper = document.createElement('div');
  wrapper.className = 'agro-a11y-root';
  wrapper.innerHTML = `
<button class="agro-a11y-btn" type="button" aria-label="${T.open}" aria-haspopup="dialog" aria-expanded="false" aria-controls="agroA11yPanel" title="${T.title}">
  ${A11Y_ICON}<span class="agro-a11y-count" aria-hidden="true"></span>
</button>
<div class="agro-a11y-overlay"></div>
<div class="agro-a11y-panel" id="agroA11yPanel" role="dialog" aria-modal="true" aria-label="${T.title}">
  <div class="agro-a11y-header">
    <h2 class="agro-a11y-title"><span class="agro-a11y-title-ico">${A11Y_ICON}</span>${T.title}</h2>
    <div class="agro-a11y-hctl">
      <button class="agro-a11y-close" type="button" aria-label="${T.close}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
      </button>
    </div>
  </div>
  <div class="agro-a11y-grid">
    ${features.map(f => `
      <button type="button" class="agro-a11y-item" data-feature="${f.id}" aria-pressed="false"${f.info ? ` title="${f.info}"` : ''}>
        <span class="agro-a11y-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></span>
        ${f.info ? '<span class="agro-a11y-info" aria-hidden="true">i</span>' : ''}
        <span class="agro-a11y-ico">${f.icon}</span>
        <span class="agro-a11y-item-label">${T.labels[f.id]}</span>
      </button>
    `).join('')}
  </div>
  <button class="agro-a11y-reset" type="button">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 3v5h5"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 21v-5h-5"/></svg>
    ${T.reset}
  </button>
  <div class="agro-a11y-bottom">
    <a href="accessibility.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>${T.stmt}</a>
    <a href="privacy.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>${T.priv}</a>
  </div>
</div>`;

  document.body.appendChild(wrapper);

  const btn     = wrapper.querySelector('.agro-a11y-btn');
  const count   = wrapper.querySelector('.agro-a11y-count');
  const panel   = wrapper.querySelector('.agro-a11y-panel');
  const overlay = wrapper.querySelector('.agro-a11y-overlay');
  const close   = wrapper.querySelector('.agro-a11y-close');
  const items   = wrapper.querySelectorAll('.agro-a11y-item');
  const reset   = wrapper.querySelector('.agro-a11y-reset');

  function openPanel() {
    panel.classList.add('open'); overlay.classList.add('open');
    btn.style.visibility = 'hidden'; btn.setAttribute('aria-expanded', 'true');
    setTimeout(() => close.focus(), 50);
  }
  function closePanel() {
    if (!panel.classList.contains('open')) return;
    panel.classList.remove('open'); overlay.classList.remove('open');
    btn.style.visibility = ''; btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }

  // תאורים: ::after לא עובד על <img>, לכן מוסיפים כיתוב אמיתי מתחת לכל תמונה
  function setAltCaptions(on) {
    document.querySelectorAll('.agro-alt-cap').forEach(c => c.remove());
    if (!on) return;
    document.querySelectorAll('body img[alt]').forEach(img => {
      if (!img.alt.trim() || wrapper.contains(img)) return;
      const cap = document.createElement('span');
      cap.className = 'agro-alt-cap';
      cap.textContent = img.alt;
      img.insertAdjacentElement('afterend', cap);
    });
  }

  function applyState() {
    let n = 0;
    features.forEach(f => {
      const isOn = !!state[f.id];
      if (isOn) n++;
      document.documentElement.classList.toggle('a11y-' + f.id, isOn);
      const el = wrapper.querySelector(`[data-feature="${f.id}"]`);
      if (el) el.setAttribute('aria-pressed', String(isOn));
    });
    setAltCaptions(!!state.altText);
    btn.classList.toggle('active', n > 0);
    count.textContent = n || '';
    btn.setAttribute('aria-label', n ? T.openN(n) : T.open);
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyState);
  else applyState();

  btn.addEventListener('click', (e) => { e.stopPropagation(); openPanel(); });
  close.addEventListener('click', (e) => { e.stopPropagation(); closePanel(); });
  overlay.addEventListener('click', () => closePanel());

  items.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.feature;
      state[id] = !state[id];
      save();
      applyState();
    });
  });

  reset.addEventListener('click', () => {
    state = {};
    save();
    applyState();
  });

  // Escape סוגר; Tab נשאר בתוך היישומון כשהוא פתוח
  document.addEventListener('keydown', (e) => {
    if (!panel.classList.contains('open')) return;
    if (e.key === 'Escape') { closePanel(); return; }
    if (e.key !== 'Tab') return;
    const f = [...panel.querySelectorAll('button,a[href]')].filter(el => el.offsetParent !== null);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
