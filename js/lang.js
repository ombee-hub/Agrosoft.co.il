/* ============================================================
   Agrosoft — language switcher behaviour
   Click-to-open dropdown. Menu items with a real href navigate
   to the same page in the other language; the item with
   href="#" is the current language and just closes the menu.
   Esc or a click outside closes it.
   ============================================================ */
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
