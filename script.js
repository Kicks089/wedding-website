/* =============================================
   WEDDING WEBSITE — Maximiliane & Stefan
   ============================================= */

// ─── CONFIGURATION ────────────────────────────
// TODO: Replace with your deployed Google Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxiOxs2yQ5zXzP9QDRrES1AxsuJWjLMm45L5w1i9l036z-EuMojxoiseBqQSjBsIP6X/exec';

// Google Drive — BildaFotograf subfolder link
const DRIVE_LINK = 'https://drive.google.com/drive/folders/10aNn17LKg2J8-Z7jytSeMPOAlZBXLaVu';

// Guest list — generated from your Google Sheet
// Format: 'uniqueId': { name: 'Display Name', isChild: bool }
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
  'a3c7e1': { name: 'Hauke Tangemann', isChild: true },
  'b4d8f2': { name: 'Jost Tangemann', isChild: true },
  '40f39b': { name: 'Henning v. Freeden' },
  '50a46d': { name: 'Terre' },
  '8841e7': { name: 'Marlene Mikyska' },
  '310309': { name: 'Veit Mikyska' },
  '714aa5': { name: 'Christoph Mikyska' },
  '0716c6': { name: 'Jenny Mikyska' },
  'c5e9a3': { name: 'Christoph Mikyska (Kind)', isChild: true },
  'd6f0b4': { name: 'Jenny Mikyska (Kind)', isChild: true },
  'f5e5ed': { name: 'Constanze Heinze' },
  'd259c7': { name: 'Nic Heinze' },
  'e7a1c5': { name: 'Julius Heinze', isChild: true },
  'f8b2d6': { name: 'Flori Heinze', isChild: true },
  'a9c3e7': { name: 'Konstantin Heinze', isChild: true },
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
  'c477d1': { name: 'Wolfgang Seibert' },
  'a43ccb': { name: 'Mike Jost' },
  '7ac8ce': { name: 'Sophie Jost' },
  '9d4441': { name: 'Ina' },
  'c5f304': { name: 'Nils' },
  '234452': { name: 'Julia' },
  '689ec2': { name: 'Manuel' },
  'f09930': { name: 'Franzi Riederle' },
  '5cfeb0': { name: 'Ahsan Riederle' },
  '506400': { name: 'Manu Gierschewski' },
  '620b80': { name: 'Lena Gierschewski' },
  '8f04cc': { name: 'Eli Jahl' },
  '4b2f2c': { name: 'Maxi Jahl' },
  '282db7': { name: 'Janine Röttgerkamp' },
  'a7f748': { name: 'Javier Röttgerkamp' },
  '65a80c': { name: 'Helena Smolak' },
  'da099d': { name: 'Christoph Feldmann' },
  '4aff26': { name: 'David Natzkin' },
  '89eb5d': { name: 'Steffi Hain' },
  '12ef9d': { name: 'Fabi Filbig' },
  '08734e': { name: 'Melli' },
  'c53bfc': { name: 'Henni Leicher' },
  '99779b': { name: 'Daniel Gaedke' },
  'b0d4f8': { name: 'Julia Gaedke' },
  '5f06f3': { name: 'Fritz Nitschke' },
  'c45559': { name: 'Margit Nitschke' },
  'e5e0dc': { name: 'Matthias Helfrich' },
  'b25ff1': { name: 'Evelyn' },
  'f1cd31': { name: 'Kevin' },
  '2da664': { name: 'Maxi Bonauer' },
  '0a940f': { name: 'Robin Balabaner' },
  '6f346a': { name: 'Lino Pineda' },
  '25eba9': { name: 'Philipp Hahnebüte' },
  'e3e199': { name: 'Nathalie Franz' },
  '2e8057': { name: 'Joachim Franz' },
};

// Invitations — one per card/QR code, maps to guest IDs
const INVITATIONS = {
  '1':  ['d3d8ce', '0ddfcc'],                                     // Sigrid & Tom Mittermair
  '2':  ['6ed919'],                                                // Vicky Mittermair
  '3':  ['2088fd'],                                                // Ursula Trommeter
  '4':  ['c4d392', '28a915'],                                     // Anke & Christian Höll
  '5':  ['cbb686', '496710'],                                     // Julia Höll & Oscar Franz
  '6':  ['78a5ba', '85f25c'],                                     // Niklas & Julia v. Freeden
  '7':  ['269280', '3a51f5', 'a3c7e1', 'b4d8f2'],                // Tangemann Familie
  '8':  ['40f39b', '50a46d'],                                     // Henning v. Freeden & Terre
  '9':  ['8841e7', '310309'],                                     // Marlene & Veit Mikyska
  '10': ['714aa5', '0716c6', 'c5e9a3', 'd6f0b4'],                // Christoph & Jenny Mikyska + Kinder
  '11': ['f5e5ed', 'd259c7', 'e7a1c5', 'f8b2d6', 'a9c3e7'],     // Heinze Familie
  '12': ['7e6f87', '508019'],                                     // Michaela & Jack Quinn
  '13': ['43f75d'],                                                // Erin Quinn
  '14': ['fd7fdb', '2597c3'],                                     // Ariana & Alex Quinn
  '15': ['b5839e', '5297fa'],                                     // Lisa & Gerhard Hörter
  '16': ['b65083', '68dc25', 'b5f7e2'],                           // Fred, Christine & Teresa Mittermair
  '17': ['19938b', 'c8ce07'],                                     // Marcel Kettenbach & Lavinia Hofmann
  '18': ['0df44b', '185c8b'],                                     // Emma & Flo Danner
  '19': ['f44e3d', 'ae1832'],                                     // Julian Blass & Stephi Brandl
  '20': ['232b9e'],                                                // Marlon Bucciarelli
  '21': ['720819'],                                                // Philipp Vogl
  '22': ['34a146'],                                                // Matze Lechner
  '23': ['c61366', '9d3e47'],                                     // Franzi Leicher & Flo Hasreiter
  '24': ['bb5c71', 'f2c14c'],                                     // Kathi & Milian Danner
  '25': ['637baf'],                                                // Patrick Drexler
  '26': ['c477d1'],                                                // Wolfgang Seibert
  '27': ['a43ccb', '7ac8ce'],                                     // Mike & Sophie Jost
  '28': ['9d4441', 'c5f304'],                                     // Ina & Nils
  '29': ['234452', '689ec2'],                                     // Julia & Manuel
  '30': ['f09930', '5cfeb0'],                                     // Franzi & Ahsan Riederle
  '31': ['506400', '620b80'],                                     // Manu & Lena Gierschewski
  '32': ['8f04cc', '4b2f2c'],                                     // Eli & Maxi Jahl
  '33': ['282db7', 'a7f748'],                                     // Janine & Javier Röttgerkamp
  '34': ['65a80c'],                                                // Helena Smolak
  '35': ['da099d'],                                                // Christoph Feldmann
  '36': ['4aff26', '89eb5d'],                                     // David Natzkin & Steffi Hain
  '37': ['12ef9d', '08734e'],                                     // Fabi Filbig & Melli
  '38': ['c53bfc'],                                                // Henni Leicher
  '39': ['99779b', 'b0d4f8'],                                     // Daniel & Julia Gaedke
  '40': ['5f06f3', 'c45559'],                                     // Fritz & Margit Nitschke
  '41': ['e5e0dc', 'b25ff1'],                                     // Matthias Helfrich & Evelyn
  '42': ['f1cd31'],                                                // Kevin
  '43': ['2da664'],                                                // Maxi Bonauer
  '44': ['0a940f'],                                                // Robin Balabaner
  '45': ['6f346a'],                                                // Lino Pineda
  '46': ['25eba9'],                                                // Philipp Hahnebüte
  '47': ['e3e199', '2e8057'],                                     // Nathalie & Joachim Franz
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
const params   = new URLSearchParams(window.location.search);
const inviteId = params.get('i');
const guestId  = params.get('g');

// Resolve guest list for this invitation
let inviteGuests = [];
if (inviteId && INVITATIONS[inviteId]) {
  inviteGuests = INVITATIONS[inviteId].map(id => ({ id, ...GUESTS[id] }));
} else if (guestId && GUESTS[guestId]) {
  inviteGuests = [{ id: guestId, ...GUESTS[guestId] }];
}

// Extract first name from full name (strips parentheticals and surname)
function getFirstName(name) {
  return name.replace(/\s*\(.*\)/, '').split(' ')[0];
}

// Track which guests have submitted
const submittedGuests = new Set();
let activeGuestIndex = 0;

if (inviteGuests.length > 0) {
  // Build greeting with first names
  const firstNames = inviteGuests.map(g => getFirstName(g.name));
  let greetingNames;
  if (firstNames.length === 1) {
    greetingNames = firstNames[0];
  } else {
    greetingNames = firstNames.slice(0, -1).join(', ') + ' & ' + firstNames[firstNames.length - 1];
  }

  const intro = document.getElementById('rsvp-intro');
  intro.textContent = '';
  const hallo = document.createElement('span');
  hallo.textContent = 'Hallo ';
  const nameEl = document.createElement('strong');
  nameEl.textContent = greetingNames;
  const rest = document.createTextNode('! Wir freuen uns auf eure Rückmeldung bis zum ');
  const deadline = document.createElement('strong');
  deadline.textContent = '5. Juni 2026';
  const dot = document.createTextNode('.');
  intro.append(hallo, nameEl, rest, deadline, dot);

  // Hide the generic "fill out separately" note — the person selector makes it obvious
  const rsvpNote = document.querySelector('.rsvp-note');
  if (rsvpNote) rsvpNote.style.display = 'none';

  // Build person selector if multiple guests
  if (inviteGuests.length > 1) {
    const selector = document.getElementById('person-selector');
    selector.classList.remove('hidden');

    const label = document.createElement('p');
    label.className = 'person-selector-label';
    label.textContent = 'Anmeldung für:';
    selector.appendChild(label);

    const btnWrap = document.createElement('div');
    btnWrap.className = 'person-buttons';
    selector.appendChild(btnWrap);

    inviteGuests.forEach((g, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'person-btn' + (i === 0 ? ' active' : '');
      btn.dataset.index = i;
      btn.textContent = getFirstName(g.name);
      btn.addEventListener('click', () => selectPerson(i));
      btnWrap.appendChild(btn);
    });
  }

  // Pre-fill first person
  selectPerson(0);
}

function selectPerson(index) {
  if (!inviteGuests[index]) return;
  activeGuestIndex = index;
  const g = inviteGuests[index];

  // Update active button
  document.querySelectorAll('.person-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  // Fill name and lock it
  const nameInput = document.getElementById('guest-name');
  nameInput.value = g.name;
  nameInput.readOnly = true;

  // Auto-check child checkbox
  document.getElementById('is-child').checked = !!g.isChild;

  // Reset form fields (but keep name)
  document.querySelectorAll('input[name="attending"]').forEach(r => r.checked = false);
  document.getElementById('menu').value = '';
  document.getElementById('notes').value = '';
  document.getElementById('attending-fields').classList.add('hidden');
  document.getElementById('form-feedback').textContent = '';
  document.getElementById('form-feedback').className = 'form-feedback';
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
    isChild:    document.getElementById('is-child').checked ? 'ja' : 'nein',
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

    const gName = getFirstName(document.getElementById('guest-name').value || 'du');

    // Mark this guest as submitted
    if (inviteGuests.length > 0) {
      submittedGuests.add(activeGuestIndex);
      const btn = document.querySelector(`.person-btn[data-index="${activeGuestIndex}"]`);
      if (btn) btn.classList.add('done');
    }

    // Check if there's a next person to fill out
    const nextIndex = inviteGuests.findIndex((_, i) => !submittedGuests.has(i));

    if (attendingVal.value === 'yes') {
      feedback.textContent = nextIndex >= 0
        ? `Danke, ${gName}! Weiter mit der nächsten Anmeldung.`
        : `Danke, ${gName}! Wir freuen uns auf dich.`;
    } else {
      feedback.textContent = nextIndex >= 0
        ? `Schade, ${gName}! Weiter mit der nächsten Anmeldung.`
        : `Schade, dass du nicht kommen kannst. Danke für deine Rückmeldung!`;
    }
    feedback.classList.add('success');
    attendingFields.classList.add('hidden');

    // Auto-advance to next person or show all-done state
    if (nextIndex >= 0) {
      setTimeout(() => selectPerson(nextIndex), 1200);
    } else if (inviteGuests.length > 1) {
      setTimeout(() => {
        feedback.textContent = 'Alle Anmeldungen abgeschickt — danke euch!';
        form.querySelector('button[type="submit"]').style.display = 'none';
      }, 1200);
    } else {
      form.reset();
    }

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
