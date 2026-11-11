/* ============================================================
   Agrosoft — language switcher behaviour
   Click-to-open dropdown. Menu items with a real href navigate
   to the same page in the other language; the item with
   href="#" is the current language and just closes the menu.
   Esc or a click outside closes it.
   ============================================================ */
/* When the site is opened locally (file://), root-absolute links like "/"
   or "/en/" have nowhere to go, so rewrite them to relative file paths.
   On the live site this does nothing and the URLs stay clean. */
(function () {
  'use strict';
  if (location.protocol !== 'file:') return;
  var inEn = /[/\\]en[/\\][^/\\]*$/.test(decodeURIComponent(location.pathname));
  var links = document.querySelectorAll('a[href^="/"]');
  Array.prototype.forEach.call(links, function (a) {
    var h = a.getAttribute('href');
    if (h.indexOf('//') === 0) return; /* protocol-relative, leave alone */
    var m = h.match(/^\/(en\/)?([^#?]*)([#?].*)?$/);
    if (!m) return;
    var en = !!m[1];
    var page = m[2] || 'index.html';
    var tail = m[3] || '';
    var base = en ? (inEn ? '' : 'en/') : (inEn ? '../' : '');
    a.setAttribute('href', base + page + tail);
  });
})();

(function () {
  'use strict';

  var dd = document.querySelector('.lang-dd');
  if (!dd) return;

  var btn = dd.querySelector('.lang-btn');
  var menu = dd.querySelector('.lang-menu');
  if (!btn || !menu) return;
  var items = menu.querySelectorAll('a');

  function toggle(open) {
    dd.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    if (open && items.length) items[0].focus();
  }

  btn.addEventListener('click', function () {
    toggle(!dd.classList.contains('open'));
  });

  items.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (a.getAttribute('href') === '#') { /* already on this language */
        e.preventDefault();
        toggle(false);
        btn.focus();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!dd.contains(e.target)) toggle(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dd.classList.contains('open')) {
      toggle(false);
      btn.focus();
    }
  });
})();

/* ============================================================
   Solutions mega menu — opens on hover or click and STAYS open
   until a click outside, Escape, or choosing an item.
   ============================================================ */
(function () {
  'use strict';
  var dd = document.querySelector('.dropdown');
  if (!dd) return;
  var mega = dd.querySelector('.mega');
  var trig = dd.querySelector('a');
  if (!mega || !trig) return;

  function open() {
    mega.classList.add('open');
    dd.classList.add('open');
    trig.setAttribute('aria-expanded', 'true');
  }
  function close() {
    mega.classList.remove('open');
    dd.classList.remove('open');
    trig.setAttribute('aria-expanded', 'false');
  }
  trig.setAttribute('aria-haspopup', 'true');
  trig.setAttribute('aria-expanded', 'false');

  dd.addEventListener('mouseenter', open);
  trig.addEventListener('click', function (e) {
    e.preventDefault();
    if (mega.classList.contains('open')) close(); else open();
  });
  document.addEventListener('click', function (e) {
    if (!dd.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  Array.prototype.forEach.call(mega.querySelectorAll('a'), function (a) {
    a.addEventListener('click', function () { close(); });
  });
})();
