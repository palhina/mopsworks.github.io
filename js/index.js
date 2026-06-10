const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!motionOK) {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('is-visible'));
} else {
  // 同一親要素内での出現順に stagger delay を設定
  document.querySelectorAll('.fade-up').forEach(el => {
    const siblings = [...el.parentElement.querySelectorAll(':scope > .fade-up')];
    el.dataset.fadeIdx = siblings.indexOf(el);
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const idx = parseInt(entry.target.dataset.fadeIdx || '0', 10);
        entry.target.style.transitionDelay = `${idx * 0.15}s`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}
