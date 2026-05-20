(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ((window.FOREST_TIER || 1) < 3) return;

  var canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) return;

  canvas.style.display = 'block';
  // Hide the Canvas2D system - WebGL takes over
  var c2d = document.getElementById('forest-canvas');
  if (c2d) c2d.style.display = 'none';

  var W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    gl.viewport(0, 0, W, H);
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Shaders ────────────────────────────────────────────────────────────
  var VS = [
    'attribute vec2 a_pos;',
    'attribute float a_sz;',
    'attribute vec4 a_col;',
    'uniform vec2 u_res;',
    'varying vec4 v_col;',
    'void main(){',
    '  vec2 c = (a_pos / u_res) * 2.0 - 1.0;',
    '  c.y = -c.y;',
    '  gl_Position = vec4(c, 0.0, 1.0);',
    '  gl_PointSize = a_sz;',
    '  v_col = a_col;',
    '}'
  ].join('\n');

  var FS = [
    'precision mediump float;',
    'varying vec4 v_col;',
    'void main(){',
    '  vec2 uv = gl_PointCoord - vec2(0.5);',
    '  float d = length(uv) * 2.0;',
    '  if (d > 1.0) discard;',
    '  float core  = 1.0 - smoothstep(0.0, 0.18, d);',
    '  float glow  = pow(1.0 - smoothstep(0.0, 1.0, d), 2.2);',
    '  float alpha = clamp(core * 1.8 + glow, 0.0, 1.0);',
    '  gl_FragColor = vec4(v_col.rgb, v_col.a * alpha);',
    '}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('Forest WebGL shader compile failed:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  var vs = compile(gl.VERTEX_SHADER, VS);
  var fs = compile(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('Forest WebGL program link failed:', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  var loc = {
    pos: gl.getAttribLocation(prog, 'a_pos'),
    sz:  gl.getAttribLocation(prog, 'a_sz'),
    col: gl.getAttribLocation(prog, 'a_col'),
    res: gl.getUniformLocation(prog, 'u_res'),
  };

  // ── Particle pool ──────────────────────────────────────────────────────
  var MAX = 500;
  var PALETTES = [
    [0.51, 0.89, 0.71],  // #82E3B6 green
    [0.25, 0.66, 0.46],  // #3FA876 deep green
    [0.83, 0.69, 0.21],  // #D4AF37 gold
    [0.12, 0.42, 0.29],  // #1F6B4A forest
  ];

  function Particle(mx, my) {
    this.fromMouse = mx !== undefined;
    this.x    = this.fromMouse ? mx + (Math.random()-.5)*18 : Math.random() * W;
    this.y    = this.fromMouse ? my + (Math.random()-.5)*18 : Math.random() * H;
    this.bx   = this.x; this.by = this.y;
    var pal   = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    this.r    = pal[0]; this.g = pal[1]; this.b = pal[2];
    // z: 0 = far/small/dim, 1 = close/large/bright
    this.z    = this.fromMouse ? 0.85 + Math.random()*0.15 : 0.3 + Math.random()*0.7;
    this.size = this.fromMouse ? Math.random()*28+12 : Math.random()*22+6;
    this.tAlpha = this.fromMouse ? Math.random()*.8+.3 : Math.random()*.35+.07;
    this.alpha  = 0;
    this.vx   = (Math.random()-.5)*(this.fromMouse ? 2.2 : .4);
    this.vy   = this.fromMouse ? -(Math.random()*2.6+.6) : (Math.random()-.5)*.4;
    this.life = 0;
    this.maxLife = this.fromMouse ? Math.random()*80+50 : Math.random()*320+200;
    this.pulse  = Math.random()*Math.PI*2;
    this.pSpeed = Math.random()*.022+.005;
  }

  Particle.prototype.update = function() {
    this.life++; this.pulse += this.pSpeed;
    var p = this.life / this.maxLife;
    if (this.fromMouse) {
      this.vx *= .97; this.vy *= .97;
      this.x += this.vx; this.y += this.vy;
      this.alpha = p < .2 ? (p/.2)*this.tAlpha : this.tAlpha*(1-(p-.2)/.8);
    } else {
      // Hover attraction
      if (hoverTarget) {
        var hdx = hoverTarget.x - this.x;
        var hdy = hoverTarget.y - this.y;
        var hdist = Math.sqrt(hdx*hdx + hdy*hdy);
        if (hdist < ATTRACT_DIST && hdist > 1) {
          var pull = ATTRACT_FORCE * (1 - hdist / ATTRACT_DIST);
          this.bx += (hdx / hdist) * pull * 18;
          this.by += (hdy / hdist) * pull * 18;
        }
      } else {
        // Gently return to original base
        this.bx += (this.x - this.bx) * -0.008;
        this.by += (this.y - this.by) * -0.008;
      }
      this.x = this.bx + Math.sin(this.pulse*.7)*11;
      this.y = this.by + Math.cos(this.pulse*.5)*8 - this.life*.05;
      var g = .5+Math.sin(this.pulse)*.5;
      this.alpha = p < .15 ? (p/.15)*this.tAlpha*g
                 : p > .7  ? this.tAlpha*g*(1-(p-.7)/.3)
                            : this.tAlpha*g;
    }
    return this.life < this.maxLife && this.alpha > .004;
  };

  var particles = [];
  var posArr = new Float32Array(MAX * 2);
  var szArr  = new Float32Array(MAX);
  var colArr = new Float32Array(MAX * 4);

  var posBuf = gl.createBuffer();
  var szBuf  = gl.createBuffer();
  var colBuf = gl.createBuffer();

  // Additive blending - the WebGL magic
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.enable(gl.BLEND);
  gl.clearColor(0, 0, 0, 0);

  // ── Scroll impulse ─────────────────────────────────────────────────────
  var scrollVY = 0, scrollOffset = 0, lastScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    var dy = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    // Cap dy to avoid anchor-jump explosions (large single-frame scrolls)
    var capped = Math.max(-40, Math.min(40, dy));
    scrollVY += capped * 2.5;
  }, { passive: true });

  // ── Hover morphing ─────────────────────────────────────────────────────
  var hoverTarget = null;
  var ATTRACT_DIST = 260;
  var ATTRACT_FORCE = 0.09;

  document.addEventListener('mouseover', function(e) {
    var el = e.target.closest('a, button, .btn');
    if (!el) { hoverTarget = null; return; }
    var r = el.getBoundingClientRect();
    hoverTarget = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  document.addEventListener('mouseout', function(e) {
    if (!e.target.closest('a, button, .btn')) hoverTarget = null;
  });

  // ── Mouse trail ────────────────────────────────────────────────────────
  var lastMove = 0, lastX = 0, lastY = 0;
  // Trail disabled in tier 3 - hover morphing handles interactivity


  // ── Render loop ────────────────────────────────────────────────────────
  function loop() {
    scrollVY    *= 0.88;
    scrollOffset += scrollVY * 0.04;
    scrollOffset *= 0.96; // slowly return to rest

    var ambient = 0;
    for (var i=0; i<particles.length; i++) if (!particles[i].fromMouse) ambient++;
    while (ambient < 280) { particles.push(new Particle()); ambient++; }
    particles = particles.filter(function(p){ return p.update(); });

    var n = Math.min(particles.length, MAX);
    for (var i=0; i<n; i++) {
      var p = particles[i];
      var zScale = p.fromMouse ? 1 : (0.35 + p.z * 0.65);
      posArr[i*2]=p.x; posArr[i*2+1]=p.y - scrollOffset;
      szArr[i] = p.size * zScale;
      colArr[i*4]=p.r; colArr[i*4+1]=p.g; colArr[i*4+2]=p.b;
      colArr[i*4+3] = p.alpha; // alpha unchanged - only size varies with depth
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(loc.res, W, H);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, posArr.subarray(0, n*2), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(loc.pos);
    gl.vertexAttribPointer(loc.pos, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, szBuf);
    gl.bufferData(gl.ARRAY_BUFFER, szArr.subarray(0, n), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(loc.sz);
    gl.vertexAttribPointer(loc.sz, 1, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
    gl.bufferData(gl.ARRAY_BUFFER, colArr.subarray(0, n*4), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(loc.col);
    gl.vertexAttribPointer(loc.col, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.POINTS, 0, n);
    requestAnimationFrame(loop);
  }

  setTimeout(function() {
    for (var i=0; i<170; i++) {
      var p = new Particle();
      p.life = Math.floor(Math.random()*p.maxLife*.5);
      particles.push(p);
    }
    loop();
  }, 350);
})();
