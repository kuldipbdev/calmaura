export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.info-card, .feature-card, .testimonial-card, .quote-card, .screenshot-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedElements.forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
