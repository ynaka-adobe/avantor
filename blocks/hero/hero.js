function setBackgroundFocus(img) {
  const { title } = img.dataset;
  if (!title?.includes('data-focal')) return;
  delete img.dataset.title;
  const [x, y] = title.split(':')[1].split(',');
  img.style.objectPosition = `${x}% ${y}%`;
}

function decorateBackground(bg) {
  const bgPic = bg.querySelector('picture');
  if (!bgPic) return;

  const img = bgPic.querySelector('img');
  setBackgroundFocus(img);

  const vidLink = bgPic.closest('a[href*=".mp4"]');
  if (!vidLink) return;
  const video = document.createElement('video');
  video.src = vidLink.href;
  video.loop = true;
  video.muted = true;
  video.inert = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'none');
  video.load();
  video.addEventListener('canplay', () => {
    video.play();
    bgPic.remove();
  });
  vidLink.parentElement.append(video, bgPic);
  vidLink.remove();
}

/**
 * Restructures a foreground text column into avtr-card Content_Cta sub-elements:
 *   .avtr-card-title  — heading
 *   .avtr-card-body   — body paragraphs
 *   .avtr-card-cta    — last link paragraph promoted to a primary-on-dark button
 */
function decorateCtaContent(col) {
  const heading = col.querySelector('h1, h2, h3, h4, h5, h6');
  const paras = [...col.querySelectorAll('p')];

  let ctaIdx = -1;
  for (let i = paras.length - 1; i >= 0; i -= 1) {
    if (paras[i].querySelector('a')) { ctaIdx = i; break; }
  }
  const bodyParas = paras.filter((_, i) => i !== ctaIdx);
  const ctaPara = ctaIdx >= 0 ? paras[ctaIdx] : null;

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
      a.classList.add('btn', 'btn-primary-on-dark');
      ctaDiv.append(a);
    });
    col.append(ctaDiv);
  }
}

function decorateForeground(fg) {
  const { children } = fg;
  for (const [idx, child] of [...children].entries()) {
    const heading = child.querySelector('h1, h2, h3, h4, h5, h6');
    const text = heading || child.querySelector('p, a, ul');
    if (text) {
      child.classList.add('fg-text');
      decorateCtaContent(child);
      if (idx === 0) {
        child.closest('.hero').classList.add('hero-text-start');
      } else {
        child.closest('.hero').classList.add('hero-text-end');
      }
    }
  }
}

export default async function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];
  const fg = rows.pop();
  fg.classList.add('hero-foreground');
  decorateForeground(fg);
  if (rows.length) {
    const bg = rows.pop();
    bg.classList.add('hero-background');
    decorateBackground(bg);
  }
}
