const header = document.querySelector<HTMLElement>('.site-header');
const toTop = document.querySelector<HTMLElement>('.to-top');
const isHome = document.body.classList.contains('home');

function onScroll() {
  const y = window.scrollY;
  if (isHome && header) header.classList.toggle('is-solid', y > 60);
  if (toTop) toTop.classList.toggle('show', y > 400);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Hero heading: reveal one character at a time. Full text stays in the layout (hidden
// characters keep their space) so nothing shifts, and screen readers get the whole text.
const typing = document.querySelector<HTMLElement>('[data-typing]');
if (typing && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const text = typing.textContent ?? '';
  const chars = [...text].map((ch) => {
    const span = document.createElement('span');
    span.className = 'typing-char';
    span.textContent = ch;
    span.setAttribute('aria-hidden', 'true');
    return span;
  });
  const caret = document.createElement('span');
  caret.className = 'typing-caret';
  caret.setAttribute('aria-hidden', 'true');

  typing.setAttribute('aria-label', text);
  typing.replaceChildren(...chars);

  const START_DELAY = 500;
  const INTERVAL = 60;
  const CARET_LINGER = 1800;
  let i = 0;
  function step() {
    if (i < chars.length) {
      chars[i].classList.add('is-visible');
      i++;
      chars[i - 1].after(caret);
      setTimeout(step, INTERVAL);
    } else {
      setTimeout(() => caret.remove(), CARET_LINGER);
    }
  }
  chars[0]?.before(caret);
  setTimeout(step, START_DELAY);
}
