/* Faixa contínua de clientes, sem dependências ou controles visuais. */
(() => {
  const carousel = document.querySelector('.clients-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.clients-track');
  const originals = Array.from(track.children);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animation;

  function rebuild() {
    animation?.cancel();
    track.querySelectorAll('[aria-hidden="true"]').forEach(item => item.remove());
    if (reducedMotion.matches) return;
    // Repetir grupos inteiros também cobre monitores mais largos que a lista.
    const groupWidth = originals[0].getBoundingClientRect().width * originals.length
      + parseFloat(getComputedStyle(track).gap) * originals.length;
    const copies = Math.ceil(carousel.clientWidth / groupWidth) + 1;
    for (let i = 0; i < copies; i++) {
      originals.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelector('img').loading = 'eager';
        track.appendChild(clone);
      });
    }
    carousel.scrollLeft = 0;
    animation = track.animate([
      { transform: 'translateX(0)' },
      { transform: `translateX(-${groupWidth}px)` }
    ], { duration: groupWidth / 35 * 1000, iterations: Infinity, easing: 'linear' });
    sync();
  }

  function sync() {
    if (!animation) return;
    if (document.hidden || carousel.matches(':focus-within')) animation.pause();
    else animation.play();
  }
  carousel.addEventListener('focusin', sync);
  carousel.addEventListener('focusout', () => requestAnimationFrame(sync));
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.stopPropagation();
    // Em movimento reduzido, permitir rolagem nativa pelo teclado.
  });
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', rebuild);
  new ResizeObserver(rebuild).observe(carousel);
})();
