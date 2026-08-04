const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const quotes = [...document.querySelectorAll('.quote-card')];
let quoteIndex = 0;
function showQuote(index) {
  quotes.forEach((quote, i) => quote.classList.toggle('active', i === index));
}
document.getElementById('nextQuote').addEventListener('click', () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  showQuote(quoteIndex);
});
document.getElementById('prevQuote').addEventListener('click', () => {
  quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
  showQuote(quoteIndex);
});
