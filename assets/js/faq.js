export function initFaq() {
  const detailsItems = document.querySelectorAll('.faq-list details');

  detailsItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;

      detailsItems.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });
}
