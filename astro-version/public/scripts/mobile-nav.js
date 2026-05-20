(function () {
  if (!window.matchMedia('(max-width: 767px)').matches) return;

  var links = document.querySelectorAll('.mobile-nav__link');
  if (!links.length) return;

  var sectionIds = ['work', 'approach', 'about', 'contact'];
  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (!sections.length) return;

  function setActive(id) {
    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var isActive = href === '#' + id || href.endsWith('#' + id);
      link.classList.toggle('is-active', isActive);
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.1, 0.25] }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }
})();
