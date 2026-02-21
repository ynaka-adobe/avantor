/**
 * Builds the avtr-card-content DOM structure inside a text column:
 *   .avtr-card-title  — heading
 *   .avtr-card-body   — body paragraphs
 *   .avtr-card-cta    — last paragraph's link(s) promoted to primary buttons
 */
function decorateTextCol(col) {
  col.classList.add('columns-feature-text-col');

  const heading = col.querySelector('h1, h2, h3, h4, h5, h6');
  const paras = [...col.querySelectorAll('p')];

  // Last paragraph that contains a link becomes the CTA row
  let ctaIdx = -1;
  for (let i = paras.length - 1; i >= 0; i -= 1) {
    if (paras[i].querySelector('a')) { ctaIdx = i; break; }
  }
  const bodyParas = paras.filter((_, i) => i !== ctaIdx);
  const ctaPara = ctaIdx >= 0 ? paras[ctaIdx] : null;

  // Rebuild as avtr-card-content sub-structure
  col.innerHTML = '';

  if (heading) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'avtr-card-title';
    titleDiv.append(heading);
    col.append(titleDiv);
  }

  if (bodyParas.length) {
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'avtr-card-body';
    bodyParas.forEach((p) => bodyDiv.append(p));
    col.append(bodyDiv);
  }

  if (ctaPara) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'avtr-card-cta';
    ctaPara.querySelectorAll('a').forEach((a) => {
      a.classList.add('btn', 'btn-primary');
      ctaDiv.append(a);
    });
    col.append(ctaDiv);
  }
}

function decorateOverlay(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    const imgCol = cols.find((col) => col.querySelector('picture'));
    const textCol = cols.find((col) => !col.querySelector('picture'));

    if (imgCol) imgCol.classList.add('columns-feature-img-col');
    if (textCol) decorateTextCol(textCol);
  });
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-feature-${cols.length}-cols`);

  if (block.classList.contains('overlay')) {
    decorateOverlay(block);
    return;
  }

  // setup image + text columns (default variant)
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-feature-img-col');
        }
      } else {
        decorateTextCol(col);
      }
    });
  });
}
