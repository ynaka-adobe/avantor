export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // Row 0: background image
  const bgRow = rows[0];
  const bgPic = bgRow.querySelector('picture');
  if (bgPic) {
    bgRow.classList.add('hero-epoch-background');
  }

  // Row 1: wordmark image
  const wordmarkRow = rows[1];
  const wordmarkPic = wordmarkRow.querySelector('picture');
  if (wordmarkPic) {
    wordmarkRow.classList.add('hero-epoch-wordmark');
  }

  // Row 2: tagline text
  if (rows[2]) {
    rows[2].classList.add('hero-epoch-tagline');
  }

  // Row 3: CTA buttons
  if (rows[3]) {
    rows[3].classList.add('hero-epoch-actions');

    // Strip button/button-container classes added by EDS pipeline
    rows[3].querySelectorAll('.button-container').forEach((bc) => {
      bc.className = '';
    });
    rows[3].querySelectorAll('.button').forEach((b) => {
      b.className = '';
    });

    const links = rows[3].querySelectorAll('a');
    links.forEach((link, i) => {
      link.classList.add('hero-epoch-btn');
      if (i === 0) link.classList.add('hero-epoch-btn-dark');
      else link.classList.add('hero-epoch-btn-light');
    });
  }
}
