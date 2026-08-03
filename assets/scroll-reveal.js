/*
 * Fade-up reveal on scroll for top-level sections. Skips the very first
 * section (hero) so above-the-fold content is never hidden on load, and
 * re-observes after Theme Editor section re-renders.
 */
(function () {
  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  );

  function observeAll() {
    var main = document.getElementById('MainContent');
    if (!main) return;
    var sections = main.querySelectorAll(':scope > .shopify-section');
    sections.forEach(function (section, index) {
      if (section.dataset.scrollRevealBound) return;
      section.dataset.scrollRevealBound = 'true';
      if (index === 0) return;
      section.classList.add('scroll-reveal');
      observer.observe(section);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAll);
  } else {
    observeAll();
  }

  document.addEventListener('shopify:section:load', observeAll);
})();
