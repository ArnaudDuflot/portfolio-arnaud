// Bioluminescent particle system - forest ambiance
(function () {
  const canvas = document.getElementById('forest-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  let mouse = { x: W / 2, y: H / 2 };
  let particles = [];
  let raf;

  const COLORS = [
    'rgba(115, 179, 146,',  // forest green
    'rgba(90, 153, 117,',   // accent
    'rgba(212, 175, 55,',   // gold
    'rgba(45, 95, 63,',     // deep green
  ];

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }

  class Particle {
    constructor(x, y, fromMouse) {
      this.x = x ?? Math.random() * W;
      this.y = y ?? Math.random() * H;
      this.fromMouse = fromMouse ?? false;
      this.size = fromMouse
        ? Math.random() * 2.5 + 0.5
        : Math.random() * 1.8 + 0.3;
      this.baseX = this.x;
      this.baseY = this.y;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = 0;
      this.targetAlpha = fromMouse
        ? Math.random() * 0.7 + 0.3
        : Math.random() * 0.35 + 0.05;
      this.vx = (Math.random() - 0.5) * (fromMouse ? 1.2 : 0.3);
      this.vy = fromMouse
        ? -(Math.random() * 1.5 + 0.5)
        : (Math.random() - 0.5) * 0.3;
      this.life = 0;
      this.maxLife = fromMouse
        ? Math.random() * 60 + 40
        : Math.random() * 300 + 200;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
    }

    update() {
      this.life++;
      this.pulse += this.pulseSpeed;
      const progress = this.life / this.maxLife;

      if (this.fromMouse) {
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.x += this.vx;
        this.y += this.vy;
        if (progress < 0.2) {
          this.alpha = (progress / 0.2) * this.targetAlpha;
        } else {
          this.alpha = this.targetAlpha * (1 - ((progress - 0.2) / 0.8));
        }
      } else {
        // Ambient float
        this.x = this.baseX + Math.sin(this.pulse * 0.7) * 8;
        this.y = this.baseY + Math.cos(this.pulse * 0.5) * 5 - (this.life * 0.04);
        const glow = 0.5 + Math.sin(this.pulse) * 0.5;
        if (progress < 0.15) {
          this.alpha = (progress / 0.15) * this.targetAlpha * glow;
        } else if (progress > 0.7) {
          this.alpha = this.targetAlpha * glow * (1 - ((progress - 0.7) / 0.3));
        } else {
          this.alpha = this.targetAlpha * glow;
        }
      }

      return this.life < this.maxLife && this.alpha > 0;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      const glow = this.size * (this.fromMouse ? 6 : 4);
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, glow
      );
      gradient.addColorStop(0, this.color + this.alpha + ')');
      gradient.addColorStop(0.4, this.color + (this.alpha * 0.4) + ')');
      gradient.addColorStop(1, this.color + '0)');

      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, glow, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = this.color + Math.min(1, this.alpha * 2) + ')';
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnAmbient() {
    if (particles.filter(p => !p.fromMouse).length < 40) {
      particles.push(new Particle());
    }
  }

  let lastMouse = { x: 0, y: 0 };
  let mouseMoveThrottle = 0;

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const now = Date.now();
    const dist = Math.hypot(e.clientX - lastMouse.x, e.clientY - lastMouse.y);
    if (now - mouseMoveThrottle > 40 && dist > 8) {
      mouseMoveThrottle = now;
      lastMouse = { x: e.clientX, y: e.clientY };
      const count = Math.floor(dist / 12) + 1;
      for (let i = 0; i < Math.min(count, 3); i++) {
        particles.push(new Particle(
          e.clientX + (Math.random() - 0.5) * 10,
          e.clientY + (Math.random() - 0.5) * 10,
          true
        ));
      }
    }
  });

  function loop() {
    ctx.clearRect(0, 0, W, H);
    spawnAmbient();
    particles = particles.filter(p => p.update());
    particles.forEach(p => p.draw());
    raf = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);

  // Delay start slightly so page renders first
  setTimeout(() => {
    // Seed some initial ambient particles spread across the viewport
    for (let i = 0; i < 25; i++) {
      const p = new Particle();
      p.life = Math.floor(Math.random() * p.maxLife * 0.5);
      particles.push(p);
    }
    loop();
  }, 300);

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelAnimationFrame(raf);
    canvas.style.display = 'none';
  }
})();
