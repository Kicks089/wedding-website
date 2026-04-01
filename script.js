/* =============================================
   WEDDING WEBSITE — Maximiliane & Stefan
   ============================================= */

// ─── CONFIGURATION ────────────────────────────
// TODO: Replace with your deployed Google Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxiOxs2yQ5zXzP9QDRrES1AxsuJWjLMm45L5w1i9l036z-EuMojxoiseBqQSjBsIP6X/exec';

// Google Drive — BildaFotograf subfolder link
const DRIVE_LINK = 'https://drive.google.com/drive/folders/10aNn17LKg2J8-Z7jytSeMPOAlZBXLaVu';

// Guest list — generated from your Google Sheet
// Format: 'uniqueId': { name: 'Display Name' }
const GUESTS = {
  'd3d8ce': { name: 'Sigrid Mittermair' },
  '0ddfcc': { name: 'Tom Mittermair' },
  '6ed919': { name: 'Vicky Mittermair' },
  '2088fd': { name: 'Ursula Trommeter' },
  'c4d392': { name: 'Anke Höll' },
  '28a915': { name: 'Christian Höll' },
  'cbb686': { name: 'Julia Höll' },
  '496710': { name: 'Oscar Franz' },
  '78a5ba': { name: 'Niklas v. Freeden' },
  '85f25c': { name: 'Julia v. Freeden' },
  '269280': { name: 'Constanze Tangemann' },
  '3a51f5': { name: 'Jakob Tangemann' },
  '40f39b': { name: 'Henning v. Freeden' },
  '50a46d': { name: 'Terre' },
  '8841e7': { name: 'Marlene Mikyska' },
  '310309': { name: 'Veit Mikyska' },
  '714aa5': { name: 'Christoph Mikyska' },
  '0716c6': { name: 'Jenny Mikyska' },
  'f5e5ed': { name: 'Constanze' },
  'd259c7': { name: 'Nic' },
  '7e6f87': { name: 'Michaela Quinn' },
  '508019': { name: 'Jack Quinn' },
  '43f75d': { name: 'Erin Quinn' },
  'fd7fdb': { name: 'Ariana Quinn' },
  '2597c3': { name: 'Alex Quinn' },
  'b5839e': { name: 'Lisa Hörter' },
  '5297fa': { name: 'Gerhard Hörter' },
  'b65083': { name: 'Fred Mittermair' },
  '68dc25': { name: 'Christine Mittermair' },
  'b5f7e2': { name: 'Teresa Mittermair' },
  '19938b': { name: 'Marcel Kettenbach' },
  'c8ce07': { name: 'Lavinia Hofmann' },
  '0df44b': { name: 'Emma Danner' },
  '185c8b': { name: 'Flo Danner' },
  'f44e3d': { name: 'Julian Blass' },
  'ae1832': { name: 'Stephi Brandl' },
  '232b9e': { name: 'Marlon Bucciarelli' },
  '720819': { name: 'Philipp Vogl' },
  '34a146': { name: 'Matze Lechner' },
  'c61366': { name: 'Franzi Leicher' },
  '9d3e47': { name: 'Flo Hasreiter' },
  'bb5c71': { name: 'Kathi Danner' },
  'f2c14c': { name: 'Milian Danner' },
  '637baf': { name: 'Patrick Drexler' },
  'c477d1': { name: 'Wolfgang' },
  'a43ccb': { name: 'Mike Jost' },
  '7ac8ce': { name: 'Sophie Jost' },
  '9d4441': { name: 'Ina' },
  'c5f304': { name: 'Nils' },
  '234452': { name: 'Julia' },
  '689ec2': { name: 'Manuel (Julia)' },
  'f09930': { name: 'Franzi Riederle' },
  '5cfeb0': { name: 'Ahsan Riederle' },
  '506400': { name: 'Manu Huber' },
  '620b80': { name: 'Lena Huber' },
  '8f04cc': { name: 'Eli Jahl' },
  '4b2f2c': { name: 'Maxi Jahl' },
  '282db7': { name: 'Janine Röttgerkamp' },
  'a7f748': { name: 'Javier Röttgerkamp' },
  '65a80c': { name: 'Helena Smolak' },
  'da099d': { name: 'Christoph Feldmann' },
  '4aff26': { name: 'David Natzkin' },
  '89eb5d': { name: 'Steffi Hain' },
  '12ef9d': { name: 'Fabi Filbig' },
  '08734e': { name: 'Melli (Fabi)' },
  'c53bfc': { name: 'Henni Leicher' },
  '99779b': { name: 'Daniel Gaedke' },
  '5f06f3': { name: 'Fritz Nitschke' },
  'c45559': { name: 'Margit Nitschke' },
  'e5e0dc': { name: 'Matthias Helfrich' },
  'b25ff1': { name: 'Evelyn (Matthias)' },
  'f1cd31': { name: 'Kevin' },
  '2da664': { name: 'Maxi Bonauer' },
  '0a940f': { name: 'Robin Balabaner' },
  '6f346a': { name: 'Lino Pineda' },
  '25eba9': { name: 'Philipp Hahnebüte' },
  'e3e199': { name: 'Nathalie Franz' },
  '2e8057': { name: 'Joachim Franz' },
};

// Local images for gallery — leave empty until after the wedding
const GALLERY_IMAGES = [];
// ──────────────────────────────────────────────


// ─── NAVBAR ───────────────────────────────────
const navbar  = document.getElementById('navbar');
const toggle  = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('nav-mobile');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

toggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});


// ─── COUNTDOWN ────────────────────────────────
function updateCountdown() {
  const wedding = new Date('2026-09-05T13:00:00');
  const now     = new Date();
  const diff    = wedding - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p style="color:var(--gold-light);font-family:var(--font-serif);font-size:1.4rem">Es ist soweit!</p>';
    return;
  }

  document.getElementById('days').textContent    = Math.floor(diff / 86400000);
  document.getElementById('hours').textContent   = Math.floor((diff % 86400000) / 3600000);
  document.getElementById('minutes').textContent = Math.floor((diff % 3600000) / 60000);
}

updateCountdown();
setInterval(updateCountdown, 30000);


// ─── GUEST PERSONALIZATION ────────────────────
const params  = new URLSearchParams(window.location.search);
const guestId = params.get('g');
const guest   = guestId ? GUESTS[guestId] : null;

if (guest) {
  document.getElementById('guest-name').value = guest.name;
  const intro = document.getElementById('rsvp-intro');
  intro.textContent = '';
  const hallo = document.createElement('span');
  hallo.textContent = 'Hallo ';
  const nameEl = document.createElement('strong');
  nameEl.textContent = guest.name;
  const rest = document.createTextNode('! Wir freuen uns auf deine Rückmeldung bis zum ');
  const deadline = document.createElement('strong');
  deadline.textContent = '31. Juli 2026';
  const dot = document.createTextNode('.');
  intro.append(hallo, nameEl, rest, deadline, dot);
}


// ─── RSVP FORM ────────────────────────────────
const form     = document.getElementById('rsvp-form');
const feedback = document.getElementById('form-feedback');
const attending = document.querySelectorAll('input[name="attending"]');
const attendingFields = document.getElementById('attending-fields');

attending.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'yes' && radio.checked) {
      attendingFields.classList.remove('hidden');
    } else if (radio.value === 'no' && radio.checked) {
      attendingFields.classList.add('hidden');
    }
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  feedback.className = 'form-feedback';

  const attendingVal = document.querySelector('input[name="attending"]:checked');
  if (!attendingVal) {
    feedback.textContent = 'Bitte wähle aus, ob du kommst.';
    feedback.classList.add('error');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Wird gespeichert …';
  feedback.textContent = '';

  const payload = {
    timestamp:  new Date().toISOString(),
    guestId:    guestId || '(direkt)',
    name:       document.getElementById('guest-name').value.trim(),
    attending:  attendingVal.value,
    menu:       attendingVal.value === 'yes' ? document.getElementById('menu').value : '',
    notes:      document.getElementById('notes').value.trim(),
  };

  if (APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
    await new Promise(r => setTimeout(r, 800));
    feedback.textContent = 'Danke! Deine Antwort wurde gespeichert. (Demo-Modus)';
    feedback.classList.add('success');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Absenden';
    return;
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body:   JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    feedback.textContent = attendingVal.value === 'yes'
      ? 'Danke! Wir freuen uns auf dich.'
      : 'Schade, dass du nicht kommen kannst. Danke für deine Rückmeldung!';
    feedback.classList.add('success');
    form.reset();
    attendingFields.classList.add('hidden');

  } catch (err) {
    feedback.textContent = 'Etwas ist schiefgelaufen. Bitte versuche es noch einmal.';
    feedback.classList.add('error');
    console.error('RSVP error:', err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Absenden';
  }
});


// ─── GALLERY ──────────────────────────────────
function initGallery() {
  const grid    = document.getElementById('gallery-grid');
  const empty   = document.getElementById('gallery-empty');
  const driveEl = document.getElementById('drive-link-container');
  const driveLink = document.getElementById('drive-link');

  if (GALLERY_IMAGES.length > 0) {
    empty.style.display = 'none';
    GALLERY_IMAGES.forEach(src => {
      const img = document.createElement('img');
      img.src     = src;
      img.loading = 'lazy';
      img.alt     = 'Hochzeitsfoto';
      img.addEventListener('click', () => openLightbox(src));
      grid.appendChild(img);
    });
  }

  if (DRIVE_LINK) {
    driveLink.href = DRIVE_LINK;
    driveEl.style.display = 'block';
  }
}


// ─── LIGHTBOX ─────────────────────────────────
function openLightbox(src) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="${src}" alt="Foto" />
  `;
  box.addEventListener('click', (e) => {
    if (e.target === box || e.target.classList.contains('lightbox-close')) {
      document.body.removeChild(box);
      document.body.style.overflow = '';
    }
  });
  document.body.appendChild(box);
  document.body.style.overflow = 'hidden';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const box = document.querySelector('.lightbox');
    if (box) {
      document.body.removeChild(box);
      document.body.style.overflow = '';
    }
  }
});


// ─── SMOOTH ANCHOR SCROLL ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});


// ─── INIT ─────────────────────────────────────
initGallery();
