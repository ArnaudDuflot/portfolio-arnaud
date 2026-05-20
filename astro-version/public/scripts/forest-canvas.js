(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var TIER = window.FOREST_TIER || 1;
  var CONNECT_DIST = TIER >= 2 ? 160 : 0;
  var MAX_AMBIENT  = TIER >= 2 ? 55 : 50;
  var SPAWN_MOUSE  = TIER >= 2 ? 4 : 2;

  var canvas = document.getElementById('forest-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = window.innerWidth;
  var H = window.innerHeight;
  var particles = [];

  var COLORS = [
    'rgba(130,227,182,',
    'rgba(63,168,118,',
    'rgba(212,175,55,',
    'rgba(31,107,74,',
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle(x, y, fromMouse) {
    this.x       = x !== undefined ? x : Math.random() * W;
    this.y       = y !== undefined ? y : Math.random() * H;
    this.fromMouse = !!fromMouse;
    this.size    = this.fromMouse ? Math.random() * 2.5 + 0.8 : Math.random() * 1.8 + 0.4;
    this.baseX   = this.x;
    this.baseY   = this.y;
    this.color   = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha   = 0;
    this.targetAlpha = this.fromMouse ? Math.random() * 0.75 + 0.35
                                      : Math.random() * 0.32 + 0.08;
    this.vx      = (Math.random() - 0.5) * (this.fromMouse ? 1.4 : 0.3);
    this.vy      = this.fromMouse ? -(Math.random() * 1.8 + 0.4)
                                  : (Math.random() - 0.5) * 0.3;
    this.life    = 0;
    this.maxLife = this.fromMouse ? Math.random() * 70 + 40
                                  : Math.random() * 280 + 180;
    this.pulse      = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.022 + 0.005;
  }

  Particle.prototype.update = function () {
    this.life++;
    this.pulse += this.pulseSpeed;
    var p = this.life / this.maxLife;
    if (this.fromMouse) {
      this.vx *= 0.97; this.vy *= 0.97;
      this.x  += this.vx; this.y  += this.vy;
      this.alpha = p < 0.2 ? (p / 0.2) * this.targetAlpha
                           : this.targetAlpha * (1 - (p - 0.2) / 0.8);
    } else {
      this.x = this.baseX + Math.sin(this.pulse * 0.7) * 9;
      this.y = this.baseY + Math.cos(this.pulse * 0.5) * 6 - this.life * 0.045;
      var g = 0.5 + Math.sin(this.pulse) * 0.5;
      this.alpha = p < 0.15 ? (p / 0.15) * this.targetAlpha * g
                 : p > 0.7  ? this.targetAlpha * g * (1 - (p - 0.7) / 0.3)
                             : this.targetAlpha * g;
    }
    return this.life < this.maxLife && this.alpha > 0.005;
  };

  Particle.prototype.draw = function () {
    var glow = this.size * (this.fromMouse ? 7 : 5);
    var gr = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glow);
    gr.addColorStop(0,   this.color + this.alpha + ')');
    gr.addColorStop(0.4, this.color + (this.alpha * 0.35) + ')');
    gr.addColorStop(1,   this.color + '0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, glow, 0, Math.PI * 2);
    ctx.fillStyle = gr;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = this.color + Math.min(1, this.alpha * 2.2) + ')';
    ctx.fill();
  };

  // ── Mycélium connections (Tier 2+) ─────────────────────────────────────
  function drawConnections() {
    var len = particles.length;
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        var a = particles[i], b = particles[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          var lineAlpha = (1 - dist / CONNECT_DIST) * Math.min(a.alpha, b.alpha) * 0.6;
          if (lineAlpha < 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(130,227,182,' + lineAlpha + ')';
          ctx.lineWidth = (1 - dist / CONNECT_DIST) * 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // ── Mouse trail ─────────────────────────────────────────────────────────
  var lastMove = 0, lastX = 0, lastY = 0;
  document.addEventListener('mousemove', function (e) {
    var now = Date.now();
    var dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (now - lastMove > 35 && dist > 7) {
      lastMove = now; lastX = e.clientX; lastY = e.clientY;
      var count = Math.min(Math.floor(dist / 10) + 1, SPAWN_MOUSE);
      for (var i = 0; i < count; i++) {
        particles.push(new Particle(
          e.clientX + (Math.random() - 0.5) * 12,
          e.clientY + (Math.random() - 0.5) * 12,
          true
        ));
      }
    }
  });

  // ── Main loop ───────────────────────────────────────────────────────────
  function loop() {
    ctx.clearRect(0, 0, W, H);
    var ambient = 0;
    for (var i = 0; i < particles.length; i++) {
      if (!particles[i].fromMouse) ambient++;
    }
    if (ambient < MAX_AMBIENT) particles.push(new Particle());
    particles = particles.filter(function (p) { return p.update(); });
    if (CONNECT_DIST > 0) drawConnections();
    for (var i = 0; i < particles.length; i++) particles[i].draw();
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);

  // Seed initial ambient cloud
  setTimeout(function () {
    for (var i = 0; i < MAX_AMBIENT * 0.6; i++) {
      var p = new Particle();
      p.life = Math.floor(Math.random() * p.maxLife * 0.5);
      particles.push(p);
    }
    loop();
  }, 350);
})();
