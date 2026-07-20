document.getElementById('year').textContent = new Date().getFullYear();

fetch('data/rates.json')
  .then((res) => res.json())
  .then(render)
  .catch((err) => {
    console.error('Could not load rates.json', err);
  });

function render(data) {
  // contact links
  const waLink = `https://wa.me/${data.contact.whatsapp}`;
  ['waTop', 'waHero', 'waFooter', 'waSticky'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = waLink;
  });
  const lineEl = document.getElementById('lineFooter');
  if (lineEl) lineEl.textContent = `Line: ${data.contact.line}`;

  // WH service
  document.getElementById('whDuration').textContent = `/ ${data.whService.duration}`;
  document.getElementById('whNote').textContent = data.whService.note;
  const whTiers = document.getElementById('whTiers');
  whTiers.innerHTML = data.whService.tiers
    .map((t) => `<div class="rate-row"><span>${t.weight}</span><span class="price">${t.price}</span></div>`)
    .join('');

  // Rent alamat
  document.getElementById('rentPrice').firstChild.textContent = data.rentAlamat.price;
  document.getElementById('rentPeriod').textContent = ` ${data.rentAlamat.period}`;
  document.getElementById('rentNote').textContent = data.rentAlamat.note;

  // Delivery
  document.getElementById('handcarryPrice').firstChild.textContent = data.delivery.handcarry;
  const notesEl = document.getElementById('deliveryNotes');
  notesEl.innerHTML = data.delivery.notes.map((n) => `<li>${n}</li>`).join('');

  // Persod
  document.getElementById('persodNote').textContent = data.personalOrder.note;

  // Paper based
  const paperTiers = document.getElementById('paperTiers');
  paperTiers.innerHTML = data.paperBased.tiers
    .map((t) => `<div class="rate-row"><span>${t.range}</span><span class="price">${t.price}</span></div>`)
    .join('');
  document.getElementById('paperNote').textContent = data.paperBased.note;

  // Other fee
  const feeTiers = document.getElementById('feeTiers');
  feeTiers.innerHTML = data.otherFee
    .map((f) => `<div class="rate-row"><span>${f.label}</span><span class="price">${f.price}</span></div>`)
    .join('');

  // Benefit
  const benefitList = document.getElementById('benefitList');
  benefitList.innerHTML = data.benefits.map((b) => `<li>${b}</li>`).join('');

  // CO chat rate
  document.getElementById('openBadge').textContent = `OPEN ${data.coChatRate.openSince}`;
  const rateTable = document.getElementById('rateTable');
  const rows = [
    ...data.coChatRate.idrToRmb.map(
      (r) => `<div class="row"><span>IDR ➜ RMB (${r.label})</span><span class="val">${r.rate}</span></div>`
    ),
    `<div class="row"><span>RMB ➜ IDR</span><span class="val">${data.coChatRate.rmbToIdr}</span></div>`,
  ];
  rateTable.innerHTML = rows.join('');
  document.getElementById('rateFineprint').textContent = data.coChatRate.note;
  document.getElementById('rateUpdated').textContent = `Update terakhir: ${data.lastUpdated}`;

  const coServices = document.getElementById('coServices');
  coServices.innerHTML = data.coChatServices
    .map((s) => `<div class="chip">${s.name} <b>${s.price}</b></div>`)
    .join('');

  // Payment
  const payRow = document.getElementById('payRow');
  payRow.innerHTML = data.payment.map((p) => `<div class="pay-chip">${p}</div>`).join('');
}

// scroll-spy pill nav
const pills = Array.from(document.querySelectorAll('.pill'));
pills.forEach((pill) => {
  pill.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(pill.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sections = pills
  .map((p) => document.querySelector(p.dataset.target))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          pills.forEach((p) => p.classList.toggle('is-active', p.dataset.target === id));
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}
