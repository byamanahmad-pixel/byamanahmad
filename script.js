document.getElementById('year').textContent = new Date().getFullYear();

// Desktop: preview project videos on hover.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('video').forEach(video => {
    const card = video.closest('.feature, .work-card');
    if (!card) return;

    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => {
      video.pause();
      try { video.currentTime = 0; } catch (e) {}
    });
  });
}

// Mobile: play the three project previews when they enter the screen.
// This avoids relying on hover or a first tap on iPhone Safari.
const mobileProjectVideos = document.querySelectorAll('[data-mobile-autoplay]');

mobileProjectVideos.forEach(video => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  // Try as soon as enough video data is available.
  video.addEventListener('loadeddata', () => {
    const rect = video.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      video.play().catch(() => {});
    }
  });
});

if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '180px 0px 180px 0px'
  });

  mobileProjectVideos.forEach(video => videoObserver.observe(video));
} else {
  mobileProjectVideos.forEach(video => video.play().catch(() => {}));
}

// Reveal animations.
const targets = document.querySelectorAll('.section-title,.feature,.work-card,.public-copy,.public-grid img,.music-intro,.media-grid,.spotify,.recognition,.contact');
targets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

targets.forEach(el => observer.observe(el));


// Mobile navigation.
(() => {
  const header = document.querySelector('.nav');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.getElementById('site-nav');

  if (!header || !toggle || !menu) return;

  const closeMenu = () => {
    header.classList.remove('menu-open');
    document.body.classList.remove('mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  };

  const openMenu = () => {
    header.classList.add('menu-open');
    document.body.classList.add('mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
  };

  toggle.addEventListener('click', () => {
    if (header.classList.contains('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();
