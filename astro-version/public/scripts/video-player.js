(function () {
  function ensureSrc(video) {
    if (!video.src && video.dataset.src) {
      video.src = video.dataset.src;
    }
  }

  document.querySelectorAll('[data-video-player]').forEach(function (root) {
    var video = root.querySelector('video');
    var playBtn = root.querySelector('.video-player__play');
    if (!video || !playBtn) return;

    var loaded = false;

    function loadVideo() {
      if (loaded) return;
      ensureSrc(video);
      loaded = true;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              loadVideo();
              observer.unobserve(root);
            }
          });
        },
        { rootMargin: '120px 0px' }
      );
      observer.observe(root);
    }

    playBtn.addEventListener('click', function () {
      loadVideo();
      video
        .play()
        .then(function () {
          root.classList.add('is-playing');
        })
        .catch(function () {});
    });

    video.addEventListener('click', function () {
      if (!root.classList.contains('is-playing')) return;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
        root.classList.remove('is-playing');
      }
    });

    video.addEventListener('ended', function () {
      if (!video.loop) {
        root.classList.remove('is-playing');
      }
    });
  });
})();
