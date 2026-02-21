export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  let startIdx = 0;
  let headingText = null;

  // Check if first row is heading-only (empty col1, heading in col2)
  const firstRow = rows[0];
  const firstCols = [...firstRow.children];
  const hasImage = firstRow.querySelector('picture, img');
  const col2 = firstCols[1];
  if (!hasImage && firstCols.length >= 2 && col2 && col2.childNodes.length <= 2) {
    headingText = col2?.textContent?.trim() || '';
    if (headingText) startIdx = 1;
  }

  const grid = document.createElement('div');
  grid.className = 'cards-highlight-grid';

  let secondaryContainer = null;

  rows.slice(startIdx).forEach((row, idx) => {
    const cols = [...row.children];

    const imageCell = document.createElement('div');
    imageCell.className = 'cards-highlight-card-image';

    const contentCell = document.createElement('div');
    contentCell.className = 'cards-highlight-card-content';

    if (cols[0]) while (cols[0].firstChild) imageCell.append(cols[0].firstChild);
    if (cols[1]) while (cols[1].firstChild) contentCell.append(cols[1].firstChild);

    if (idx === 0) {
      // First card → large featured card (left column)
      const featured = document.createElement('div');
      featured.className = 'cards-highlight-featured';
      if (imageCell.children.length) featured.append(imageCell);
      if (contentCell.children.length) featured.append(contentCell);
      grid.append(featured);
    } else {
      // Remaining cards → small stacked cards (right column)
      if (!secondaryContainer) {
        secondaryContainer = document.createElement('div');
        secondaryContainer.className = 'cards-highlight-secondary';
        grid.append(secondaryContainer);
      }
      const card = document.createElement('article');
      card.className = 'cards-highlight-card';
      if (imageCell.children.length) card.append(imageCell);
      if (contentCell.children.length) card.append(contentCell);
      secondaryContainer.append(card);
    }
  });

  block.textContent = '';

  if (headingText) {
    const heading = document.createElement('h2');
    heading.className = 'cards-highlight-title';
    heading.textContent = headingText;
    block.append(heading);
  }

  block.append(grid);
}
