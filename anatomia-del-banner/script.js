// Anatomía del banner — interacción

// 1. Rellena las líneas de "texto" falsas de las maquetas
document.querySelectorAll('.lines').forEach((el) => {
  const n = Number(el.dataset.n) || 4;
  for (let i = 1; i <= n; i++) {
    const ln = document.createElement('b');
    ln.className = i % 5 === 0 ? 'ln s' : 'ln';
    el.appendChild(ln);
  }
});

// 2. Medidor de intrusión (1 a 5)
const intrusion = ['', 'Muy baja', 'Baja', 'Media', 'Alta', 'Muy alta'];
document.querySelectorAll('.meter').forEach((el) => {
  const v = Number(el.dataset.v);
  for (let i = 1; i <= 5; i++) {
    const dot = document.createElement('i');
    if (i <= v) dot.className = 'on';
    el.appendChild(dot);
  }
  const label = document.createElement('span');
  label.textContent = intrusion[v];
  el.appendChild(label);
  el.setAttribute('aria-label', `Intrusión ${v} de 5: ${intrusion[v]}`);
});

// 3. Las animaciones solo se reproducen cuando la ficha está en pantalla
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.target.classList.toggle('is-on', e.isIntersecting));
}, { threshold: 0.25 });
document.querySelectorAll('.fmt__stage').forEach((el) => io.observe(el));

// 4. Filtros por familia
const cards = [...document.querySelectorAll('.fmt')];
const chips = [...document.querySelectorAll('.chip')];

chips.forEach((chip) => {
  const f = chip.dataset.filter;
  const count = f === 'all' ? cards.length : cards.filter((c) => c.dataset.cat === f).length;
  chip.querySelector('small').textContent = count;

  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.toggle('is-active', c === chip));
    cards.forEach((card) => { card.hidden = f !== 'all' && card.dataset.cat !== f; });
    const first = cards.find((c) => !c.hidden);
    const filters = document.querySelector('.filters');
    if (first && filters.getBoundingClientRect().top <= 1) {
      window.scrollTo({ top: first.offsetTop - filters.offsetHeight - 24, behavior: 'smooth' });
    }
  });
});

// Si se llega desde un número del esquema, quita el filtro para que la ficha sea visible
document.querySelectorAll('.pin').forEach((pin) => {
  pin.addEventListener('click', () => chips[0].click());
});

// 5. Robapáginas "de verdad": al llegar a su ficha aparece fijo en la pantalla
//    y te sigue por toda la web hasta que lo cierras
const liveAd = document.getElementById('live-ad');
let liveShownOnce = false;
let chaseTimer;

const showLiveAd = () => {
  liveAd.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => liveAd.classList.add('is-in')));
};
const hideLiveAd = () => {
  liveAd.classList.remove('is-in');
  setTimeout(() => { if (!liveAd.classList.contains('is-in')) liveAd.hidden = true; }, 600);
};

new IntersectionObserver((entries) => {
  if (!liveShownOnce && entries[0].isIntersecting) {
    liveShownOnce = true;
    showLiveAd();
  }
}, { threshold: 0.6 }).observe(document.querySelector('#robapaginas .fmt__stage'));

liveAd.querySelector('.live-ad__x').addEventListener('click', hideLiveAd);
document.querySelectorAll('[data-show-live]').forEach((b) => b.addEventListener('click', showLiveAd));

window.addEventListener('scroll', () => {
  if (liveAd.hidden) return;
  liveAd.classList.add('is-chasing');
  clearTimeout(chaseTimer);
  chaseTimer = setTimeout(() => liveAd.classList.remove('is-chasing'), 180);
}, { passive: true });

// 6. Intersticial "de verdad": tapa toda la web con una cuenta atrás de 5 segundos
const inter = document.getElementById('live-inter');
const interSkip = inter.querySelector('.live-inter__skip');
let interShownOnce = false;
let interTimer;

const showInter = () => {
  let left = 5;
  clearInterval(interTimer);
  interSkip.disabled = true;
  interSkip.innerHTML = `Ir a la web en <b>${left}</b>`;
  inter.hidden = false;
  document.documentElement.style.overflow = 'hidden';
  requestAnimationFrame(() => requestAnimationFrame(() => inter.classList.add('is-in')));
  interSkip.focus();

  interTimer = setInterval(() => {
    left--;
    if (left > 0) {
      interSkip.querySelector('b').textContent = left;
    } else {
      clearInterval(interTimer);
      interSkip.disabled = false;
      interSkip.textContent = 'Ir a la web ›';
      interSkip.focus();
    }
  }, 1000);
};
const hideInter = () => {
  inter.classList.remove('is-in');
  document.documentElement.style.overflow = '';
  setTimeout(() => { if (!inter.classList.contains('is-in')) inter.hidden = true; }, 450);
};

new IntersectionObserver((entries) => {
  if (!interShownOnce && entries[0].isIntersecting) {
    interShownOnce = true;
    showInter();
  }
}, { threshold: 0.6 }).observe(document.querySelector('#intersticial .fmt__stage'));

interSkip.addEventListener('click', hideInter);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !inter.hidden && !interSkip.disabled) hideInter();
});
document.querySelectorAll('[data-show-inter]').forEach((b) => b.addEventListener('click', showInter));

// 7. Skin "de verdad": mientras ves su ficha, los laterales de la web se visten con la marca
new IntersectionObserver((entries) => {
  const e = entries[0];
  if (e.intersectionRatio >= 0.4) document.body.classList.add('skin-on');
  else if (!e.isIntersecting) document.body.classList.remove('skin-on');
}, { threshold: [0, 0.4] }).observe(document.querySelector('#skin'));

document.querySelectorAll('[data-show-skin]').forEach((b) => b.addEventListener('click', () => {
  document.body.classList.remove('skin-on');
  setTimeout(() => document.body.classList.add('skin-on'), 850);
}));

// 8. Publicidad nativa escondida en el glosario: se revela tras unos segundos mirándolo
const gloss = document.querySelector('.gloss');
let revealTimer;
const glossObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    revealTimer = setTimeout(() => {
      gloss.querySelector('.sponsored').classList.add('is-revealed');
      document.querySelector('.gloss-reveal').classList.add('is-in');
      glossObserver.disconnect();
    }, 3500);
  } else {
    clearTimeout(revealTimer);
  }
}, { threshold: 0.6 });
glossObserver.observe(gloss);

// 9. Comparativa a escala
const sizes = [
  { name: 'Billboard', w: 970, h: 250 },
  { name: 'Megabanner', w: 728, h: 90 },
  { name: 'Banner clásico', w: 468, h: 60 },
  { name: 'Robapáginas grande', w: 336, h: 280 },
  { name: 'Banner móvil grande', w: 320, h: 100 },
  { name: 'Banner móvil', w: 320, h: 50 },
  { name: 'Robapáginas', w: 300, h: 250 },
  { name: 'Doble robapáginas', w: 300, h: 600 },
  { name: 'Rascacielos ancho', w: 160, h: 600 },
  { name: 'Rascacielos', w: 120, h: 600 },
  { name: 'Botón', w: 125, h: 125 },
];

const board = document.querySelector('.scale__board');
const legend = document.querySelector('.scale__legend');
const canvas = document.createElement('div');
canvas.className = 'scale__canvas';
board.appendChild(canvas);

// Los más grandes debajo, los pequeños encima (para poder señalarlos)
const byArea = [...sizes].sort((a, b) => b.w * b.h - a.w * a.h);

const pairs = byArea.map((s) => {
  const rect = document.createElement('div');
  rect.className = 'sz';
  rect.style.setProperty('--w', s.w);
  rect.style.setProperty('--h', s.h);
  rect.innerHTML = `<span>${s.name} · ${s.w}×${s.h}</span>`;
  canvas.appendChild(rect);
  return { s, rect };
});

const setHot = (target) => {
  pairs.forEach((p) => {
    const on = p === target;
    p.rect.classList.toggle('is-hot', on);
    p.item.classList.toggle('is-hot', on);
  });
};

sizes.forEach((s) => {
  const p = pairs.find((x) => x.s === s);
  const li = document.createElement('li');
  li.tabIndex = 0;
  li.innerHTML = `${s.name} <b>${s.w} × ${s.h}</b>`;
  legend.appendChild(li);
  p.item = li;
  li.addEventListener('mouseenter', () => setHot(p));
  li.addEventListener('focus', () => setHot(p));
  p.rect.addEventListener('mouseenter', () => setHot(p));
});

const note = document.createElement('p');
note.className = 'scale__note';
note.textContent = 'Cada cuadrícula = 100 px';
legend.after(note);

setHot(pairs.find((p) => p.s.name === 'Robapáginas'));
