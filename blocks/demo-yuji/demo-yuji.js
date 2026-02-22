export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const [imageCol, contentCol] = [...row.children];

  if (imageCol) imageCol.className = 'demo-yuji-image';
  if (contentCol) contentCol.className = 'demo-yuji-content';
}
