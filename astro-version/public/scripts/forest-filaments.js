(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) return;

  var svg = document.querySelector('.filaments-global');
  if (!svg) return;

  var bases = [
    { el: null, origin: '-40,300', pts: [{x:200,y:150},{x:500,y:250},{x:900,y:200},{x:1300,y:120}], w:[0.6,0.9,0.5,0.2] },
    { el: null, origin: '-40,500', pts: [{x:250,y:380},{x:520,y:440},{x:880,y:320},{x:1200,y:370}], w:[0.5,0.8,0.4,0.2] },
    { el: null, origin: '700,950', pts: [{x:680,y:700},{x:760,y:480},{x:820,y:200},{x:860,y:-20}], w:[0.2,0.6,0.8,0.3] },
    { el: null, origin: '200,950', pts: [{x:240,y:720},{x:190,y:530},{x:310,y:290},{x:360,y:40}], w:[0.2,0.5,0.7,0.3] },
    { el: null, origin: '1100,950', pts: [{x:1080,y:700},{x:1160,y:500},{x:1200,y:220},{x:1220,y:-20}], w:[0.2,0.6,0.8,0.3] },
  ];

  var paths = svg.querySelectorAll('path.fg');
  paths.forEach(function (p, i) { if (bases[i]) bases[i].el = p; });

  var mouse = { x: 720, y: 450 };
  var smooth = { x: 720, y: 450 };
  var MAX_PULL = 38;

  document.addEventListener('mousemove', function (e) {
    mouse.x = (e.clientX / window.innerWidth) * 1440;
    mouse.y = (e.clientY / window.innerHeight) * 900;
  });

  function buildPath(b) {
    var p = b.pts;
    var w = b.w;
    var dp = p.map(function (pt, i) {
      var dx = smooth.x - pt.x;
      var dy = smooth.y - pt.y;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var pull = Math.min(MAX_PULL * w[i], MAX_PULL * w[i] * (300 / dist));
      return { x: pt.x + (dx / dist) * pull, y: pt.y + (dy / dist) * pull };
    });
    return 'M' + b.origin
      + ' Q' + dp[0].x.toFixed(1) + ',' + dp[0].y.toFixed(1)
      + ' ' + dp[1].x.toFixed(1) + ',' + dp[1].y.toFixed(1)
      + ' T' + dp[2].x.toFixed(1) + ',' + dp[2].y.toFixed(1)
      + ' T' + dp[3].x.toFixed(1) + ',' + dp[3].y.toFixed(1);
  }

  function tick() {
    smooth.x += (mouse.x - smooth.x) * 0.045;
    smooth.y += (mouse.y - smooth.y) * 0.045;
    bases.forEach(function (b) {
      if (!b.el) return;
      b.el.setAttribute('d', buildPath(b));
    });
    requestAnimationFrame(tick);
  }

  setTimeout(function () { requestAnimationFrame(tick); }, 3200);
})();
