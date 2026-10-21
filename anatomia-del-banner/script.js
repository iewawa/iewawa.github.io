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

// 4. Filtros por familia (las fichas y sus anuncios en vivo)
const cards = [...document.querySelectorAll('.fmt')];
const slots = [...document.querySelectorAll('.slot')];
const chips = [...document.querySelectorAll('.chip')];

chips.forEach((chip) => {
  const f = chip.dataset.filter;
  const count = f === 'all' ? cards.length : cards.filter((c) => c.dataset.cat === f).length;
  chip.querySelector('small').textContent = count;

  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.toggle('is-active', c === chip));
    [...cards, ...slots].forEach((el) => { el.hidden = f !== 'all' && el.dataset.cat !== f; });
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

/* =========================================================
   ANUNCIOS EN VIVO
   ========================================================= */

const adsOff = () => document.body.classList.contains('adblock');

// Ejecuta fn una sola vez, cuando el elemento entra en pantalla
const onReach = (el, fn, threshold = 0.6) => {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      fn();
    }
  }, { threshold });
  obs.observe(el);
};

const slideIn = (el) => {
  el.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
};
const slideOut = (el, ms = 700) => {
  el.classList.remove('is-in');
  setTimeout(() => { if (!el.classList.contains('is-in')) el.hidden = true; }, ms);
};
const onClick = (selector, fn) => document.querySelectorAll(selector).forEach((b) => b.addEventListener('click', fn));

// Avisos
const toast = document.getElementById('toast');
let toastTimer;
const showToast = (msg, ms = 7000) => {
  toast.textContent = msg;
  slideIn(toast);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => slideOut(toast, 400), ms);
};

// Los huecos publicitarios "cargan" su anuncio al llegar a ellos
const slotObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-seen');
      slotObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
slots.forEach((s) => slotObserver.observe(s));

// 01 · El banner de 1994: haz clic
const retro = document.querySelector('.real-ad--retro');
retro.addEventListener('click', () => {
  retro.classList.add('is-clicked');
  setTimeout(() => retro.classList.remove('is-clicked'), 3000);
});

// 04 · Robapáginas: aparece en la esquina y te sigue hasta que lo cierras
const liveAd = document.getElementById('live-ad');
let chaseTimer;
const showLiveAd = () => { if (!adsOff()) slideIn(liveAd); };

onReach(document.querySelector('#robapaginas .fmt__stage'), showLiveAd);
liveAd.querySelector('.live-ad__x').addEventListener('click', () => slideOut(liveAd, 600));
onClick('[data-show-live]', showLiveAd);

window.addEventListener('scroll', () => {
  if (liveAd.hidden) return;
  liveAd.classList.add('is-chasing');
  clearTimeout(chaseTimer);
  chaseTimer = setTimeout(() => liveAd.classList.remove('is-chasing'), 180);
}, { passive: true });

// 06 · Rascacielos: fijo en el margen izquierdo (si la pantalla es lo bastante ancha)
const liveSky = document.getElementById('live-sky');
const wideScreen = window.matchMedia('(min-width: 1600px)');
const showSky = () => {
  if (adsOff()) return;
  if (wideScreen.matches) slideIn(liveSky);
  else document.querySelector('.slot--sky').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

onReach(document.querySelector('#rascacielos .fmt__stage'), () => { if (wideScreen.matches) showSky(); });
liveSky.querySelector('.live-ad__x').addEventListener('click', () => slideOut(liveSky));
onClick('[data-show-sky]', showSky);

// 07 · Expandible: en pantallas táctiles se abre con un toque
const xp = document.querySelector('.real-ad--xp');
xp.addEventListener('click', () => {
  const open = xp.classList.toggle('is-open');
  xp.setAttribute('aria-expanded', open);
});
xp.closest('.xp-wrap').addEventListener('mouseleave', () => {
  xp.classList.remove('is-open');
  xp.setAttribute('aria-expanded', false);
});

// 08 · Push-down: clic para desplegar, clic para recoger
const pd = document.querySelector('.real-ad--pd');
pd.addEventListener('click', () => {
  const open = pd.classList.toggle('is-open');
  pd.setAttribute('aria-expanded', open);
});

// 09 · Layer: flota sobre la web; se cierra con la × o a los 15 segundos
const layer = document.getElementById('live-layer');
let layerTimer;
const hideLayer = () => {
  clearInterval(layerTimer);
  slideOut(layer, 900);
};
const showLayer = () => {
  if (adsOff()) return;
  let left = 15;
  const count = layer.querySelector('b');
  count.textContent = left;
  clearInterval(layerTimer);
  slideIn(layer);
  layerTimer = setInterval(() => {
    left--;
    count.textContent = left;
    if (left <= 0) hideLayer();
  }, 1000);
};

onReach(document.querySelector('#layer .fmt__stage'), showLayer);
layer.querySelector('.live-ad__x').addEventListener('click', hideLayer);
onClick('[data-show-layer]', showLayer);

// 10 · Intersticial: tapa toda la web con una cuenta atrás de 5 segundos
const inter = document.getElementById('live-inter');
const interSkip = inter.querySelector('.live-inter__skip');
let interTimer;

const showInter = () => {
  if (adsOff()) return;
  let left = 5;
  clearInterval(interTimer);
  interSkip.disabled = true;
  interSkip.innerHTML = `Ir a la web en <b>${left}</b>`;
  document.documentElement.style.overflow = 'hidden';
  slideIn(inter);
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
  clearInterval(interTimer);
  document.documentElement.style.overflow = '';
  slideOut(inter, 450);
};

onReach(document.querySelector('#intersticial .fmt__stage'), showInter);
interSkip.addEventListener('click', hideInter);
onClick('[data-show-inter]', showInter);

// 11 · Pop-up: la web intenta abrir una ventana nueva (y el navegador suele impedirlo)
const popupHTML = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>¡Pop-up!</title>
<style>html,body{margin:0;height:100%}body{display:grid;place-items:center;text-align:center;color:#fff;
font-family:Georgia,serif;background:#ff4a1c repeating-linear-gradient(135deg,rgba(255,255,255,.08) 0 12px,transparent 0 24px)}
h1{margin:0;font-weight:400;font-size:56px}p{margin:10px 24px 20px;font:16px/1.4 system-ui,sans-serif}
button{padding:10px 18px;border:0;border-radius:99px;background:#fff;color:#c93810;font:600 14px system-ui,sans-serif;cursor:pointer}</style>
</head><body><div><h1>POP-UP</h1><p>Soy una ventana nueva del navegador.<br>La web me ha abierto sin preguntarte.</p>
<button onclick="window.close()">Cerrarme</button></div></body></html>`;

const openPopup = (auto) => {
  if (adsOff()) return;
  const w = 420;
  const h = 320;
  const left = Math.max(0, window.screenX + window.outerWidth - w - 40);
  const top = window.screenY + 90;
  let win = null;
  try {
    win = window.open('', 'anatomia-popup', `popup,width=${w},height=${h},left=${left},top=${top}`);
  } catch (e) { /* bloqueado */ }

  if (win) {
    win.document.open();
    win.document.write(popupHTML);
    win.document.close();
  } else if (auto) {
    showToast('🚫 Esta web acaba de intentar abrirte un pop-up… y tu navegador lo ha bloqueado. Por eso ya casi no se ven.');
  } else {
    showToast('Tu navegador lo ha bloqueado incluso con clic. Puedes permitir las ventanas emergentes de esta web desde la barra de direcciones.');
  }
};

onReach(document.querySelector('#pop-up .fmt__stage'), () => openPopup(true));
onClick('[data-show-popup]', () => openPopup(false));

// 12 · Skin: mientras ves su ficha, los laterales de la web se visten con la marca
new IntersectionObserver((entries) => {
  const e = entries[0];
  if (e.intersectionRatio >= 0.4 && !adsOff()) document.body.classList.add('skin-on');
  else if (!e.isIntersecting) document.body.classList.remove('skin-on');
}, { threshold: [0, 0.4] }).observe(document.querySelector('#skin'));

onClick('[data-show-skin]', () => {
  if (adsOff()) return;
  document.body.classList.remove('skin-on');
  setTimeout(() => document.body.classList.add('skin-on'), 850);
});

// 13 · Pre-roll: antes de tu vídeo, el anuncio (saltable a los 5 segundos)
const player = document.querySelector('.player-live');
const plSkip = player.querySelector('.pl-skip');
const plChip = player.querySelector('.pl-chip b');
let plTick;
let plEnd;

const plSet = (state) => { player.dataset.state = state; };
const plVideo = () => {
  clearInterval(plTick);
  plSet('video');
  clearTimeout(plEnd);
  plEnd = setTimeout(() => plSet('poster'), 12000);
};
const plStart = () => {
  let t = 15;
  plSet('ad');
  plChip.textContent = '0:15';
  plSkip.disabled = true;
  plSkip.innerHTML = 'Puedes saltarlo en <b>5</b>';
  clearInterval(plTick);
  clearTimeout(plEnd);

  plTick = setInterval(() => {
    t--;
    plChip.textContent = `0:${String(t).padStart(2, '0')}`;
    const elapsed = 15 - t;
    if (elapsed < 5) {
      plSkip.querySelector('b').textContent = 5 - elapsed;
    } else if (elapsed === 5) {
      plSkip.disabled = false;
      plSkip.textContent = 'Saltar anuncio ▸';
    }
    if (t <= 0) plVideo();
  }, 1000);
};

player.querySelector('.pl-poster').addEventListener('click', () => {
  if (adsOff()) plVideo();
  else plStart();
});
plSkip.addEventListener('click', plVideo);

// 14 · In-read: el hueco se abre al llegar, se reproduce sin sonido y se vuelve a cerrar
const irSlot = document.querySelector('.slot--ir');
const ir = irSlot.querySelector('.ir-live');
const irStatus = irSlot.querySelector('.ir-status');
const irIdleText = irStatus.textContent;
let irState = 'idle';
let irTimers = [];

const irClose = (text, nextState) => {
  irTimers.forEach(clearTimeout);
  ir.classList.remove('is-open', 'is-playing');
  irStatus.textContent = text;
  irState = nextState;
};

new IntersectionObserver((entries) => {
  const e = entries[0];
  if (e.isIntersecting && irState === 'idle' && !adsOff()) {
    irState = 'open';
    ir.classList.add('is-open');
    irStatus.textContent = 'reproduciéndose sin sonido…';
    irTimers = [
      setTimeout(() => ir.classList.add('is-playing'), 900),
      setTimeout(() => irClose('fin del anuncio: el hueco se ha vuelto a cerrar', 'done'), 10900),
    ];
  } else if (!e.isIntersecting && irState !== 'idle') {
    irClose(irIdleText, 'idle');
  }
}, { rootMargin: '0px 0px -35% 0px' }).observe(irSlot);

// 16 · Anclado: pegado al borde de abajo hasta que lo cierras
const anchor = document.getElementById('live-anchor');
const showAnchor = () => {
  if (adsOff()) return;
  slideIn(anchor);
  document.body.classList.add('anchor-on');
};
const hideAnchor = () => {
  slideOut(anchor, 600);
  document.body.classList.remove('anchor-on');
};

onReach(document.querySelector('#anclado .fmt__stage'), showAnchor);
anchor.querySelector('.live-ad__x').addEventListener('click', hideAnchor);
onClick('[data-show-anchor]', showAnchor);

// 17 · Publicidad nativa escondida en el glosario: se revela tras unos segundos mirándolo
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

// Escape cierra lo que se pueda cerrar
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!inter.hidden && !interSkip.disabled) hideInter();
  if (!layer.hidden) hideLayer();
});

// Modo adblocker: quita todos los anuncios de la web de golpe
onClick('[data-adblock]', (e) => {
  const on = document.body.classList.toggle('adblock');
  document.querySelectorAll('[data-adblock]').forEach((b) => {
    b.textContent = on ? 'Desactivar adblocker' : 'Probar: activar adblocker';
  });
  if (on) {
    hideInter();
    clearInterval(layerTimer);
    document.body.classList.remove('skin-on', 'anchor-on');
    showToast('Adblocker activado: todos los anuncios de esta web han desaparecido. Vuelve a pulsar para desactivarlo.');
  } else {
    showToast('Adblocker desactivado: los anuncios vuelven a estar en su sitio.', 4000);
  }
  e.currentTarget.focus();
});

/* =========================================================
   COMPARATIVA A ESCALA
   ========================================================= */

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
