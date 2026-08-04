document.getElementById('year').textContent = new Date().getFullYear();

const cards = document.querySelectorAll('.video-card, .project-card');
cards.forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;
  card.addEventListener('mouseenter', () => video.play().catch(()=>{}));
  card.addEventListener('mouseleave', () => {
    video.pause();
    try { video.currentTime = 0; } catch(e) {}
  });
});

const revealTargets = document.querySelectorAll('.chapter-head, .origin-grid, .media-strip, .spotify-card, .project, .project-card, .proof-copy, .proof-visual, .future-copy, .principle-grid, .contact');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
revealTargets.forEach(el => observer.observe(el));

if (window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('video').forEach(v => {
    if (!v.closest('.future-bg')) v.setAttribute('controls','');
  });
}
