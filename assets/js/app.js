import { initNavbar } from './navbar.js';
import { initScrollAnimations } from './animation.js';
import { initFaq } from './faq.js';
import { initAnalytics } from './analytics.js';

const createLightbox = () => {
  const overlay = document.createElement('div');
  overlay.className = 'image-lightbox';
  overlay.innerHTML = `
    <div class="image-lightbox__backdrop"></div>
    <div class="image-lightbox__panel">
      <button class="image-lightbox__close" type="button" aria-label="Close image preview">×</button>
      <img class="image-lightbox__image" src="" alt="" />
    </div>
  `;

  document.body.appendChild(overlay);

  const image = overlay.querySelector('.image-lightbox__image');
  const close = overlay.querySelector('.image-lightbox__close');

  const closeLightbox = () => {
    overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  };

  close.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target.classList.contains('image-lightbox__backdrop')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  return (src, alt) => {
    image.src = src;
    image.alt = alt;
    overlay.classList.add('is-open');
    document.body.classList.add('no-scroll');
  };
};

const initImageLightbox = () => {
  const openLightbox = createLightbox();

  document.querySelectorAll('img.zoomable').forEach((img) => {
    if (img.closest('a')) return;
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const src = img.src;
      if (!src) return;
      openLightbox(src, img.alt || 'Image preview');
    });
  });
};

const initApp = () => {
  initNavbar();
  initScrollAnimations();
  initFaq();
  initAnalytics();
  initImageLightbox();
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
