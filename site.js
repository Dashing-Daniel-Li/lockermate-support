/* Progressive enhancement only. With this file blocked or failing, both pages
   remain fully readable and the FAQ still opens — <details> is native. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll reveal --------------------------------------------------
     Elements are hidden by CSS only under `html.js`, which is set inline in
     the head. If IntersectionObserver is missing, show everything at once
     rather than leaving the page blank. */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      // Stagger within a batch, so a group arriving together cascades
      // instead of appearing as one block.
      var shown = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--reveal-i', reduceMotion ? 0 : Math.min(shown, 4));
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
        shown += 1;
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    items.forEach(function (el) {
      // Anything already on screen at load shouldn't fade in behind the fold.
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight * 0.9) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
  }

  /* ---- Table of contents highlighting --------------------------------- */
  function initTOC() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    var targets = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      targets.push(section);
    });
    if (!targets.length) return;

    var visible = [];

    function setCurrent(id) {
      links.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        var index = visible.indexOf(id);
        if (entry.isIntersecting && index === -1) visible.push(id);
        if (!entry.isIntersecting && index !== -1) visible.splice(index, 1);
      });

      if (!visible.length) return;
      // Whichever visible heading sits highest wins.
      var top = visible.slice().sort(function (a, b) {
        return document.getElementById(a).getBoundingClientRect().top -
               document.getElementById(b).getBoundingClientRect().top;
      })[0];
      if (byId[top]) setCurrent(top);
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

    targets.forEach(function (section) { observer.observe(section); });
  }

  function init() {
    initReveal();
    initTOC();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
