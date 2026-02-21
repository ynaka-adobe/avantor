function decorateOverlay(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    const imgCol = cols.find((col) => col.querySelector('picture'));
    const textCol = cols.find((col) => !col.querySelector('picture'));

    if (imgCol) imgCol.classList.add('columns-feature-img-col');
    if (textCol) textCol.classList.add('columns-feature-text-col');

    // Promote any <a> tags as CTA buttons
    if (textCol) {
      textCol.querySelectorAll('a').forEach((a) => {
        a.classList.add('btn', 'btn-accent');
      });
    }
  });
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-feature-${cols.length}-cols`);

  if (block.classList.contains('overlay')) {
    decorateOverlay(block);
    return;
  }

  // setup image columns (default variant)
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-feature-img-col');
        }
      }
    });
  });
}
