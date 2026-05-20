(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.FOREST_TIER = 0;
    return;
  }
  var isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  var cores = navigator.hardwareConcurrency || 4;
  var mem = navigator.deviceMemory || 8;
  var lowPower = cores <= 4 || mem <= 4;
  window.FOREST_TIER = isMobile ? 1 : lowPower ? 2 : 3;
})();
