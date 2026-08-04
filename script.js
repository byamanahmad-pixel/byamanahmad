
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('video').forEach(video => {
  const card = video.closest('.feature, .work-card');
  if (!card) return;
  card.addEventListener('mouseenter', () => video.play().catch(()=>{}));
  card.addEventListener('mouseleave', () => {
    video.pause();
    try { video.currentTime = 0; } catch(e) {}
  });
});

const targets = document.querySelectorAll('.section-title,.feature,.work-card,.public-copy,.public-grid img,.music-intro,.media-grid,.spotify,.recognition,.contact');
targets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

targets.forEach(el => observer.observe(el));

if (window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('video').forEach(v => v.setAttribute('controls',''));
}
