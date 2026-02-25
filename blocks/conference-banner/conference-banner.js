export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cols = [...row.children];
  cols.forEach((col, idx) => {
    col.classList.add(`conference-banner-col`, `conference-banner-col-${idx + 1}`);
  });
}
