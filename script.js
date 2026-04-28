/* =========================================================
   PARTICLES — floating ambient nodes
   ========================================================= */
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dx = (Math.random() - 0.5) * 220;
    const dy = (Math.random() - 0.5) * 220 - 50;
    const dur = 10 + Math.random() * 16;
    const delay = Math.random() * 10;
    p.style.left = x + '%';
    p.style.top = y + '%';
    p.style.setProperty('--dx', dx + 'px');
    p.style.setProperty('--dy', dy + 'px');
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = delay + 's';
    p.style.opacity = (0.25 + Math.random() * 0.45).toString();
    container.appendChild(p);
  }
})();

/* =========================================================
   MOUSE-TRACKED LIGHT + 3D TILT on hacker card
   ========================================================= */
const hackerCard = document.getElementById('hackerCard');
const lightPass = document.getElementById('lightPass');

function handleMove(e) {
  if (!hackerCard) return;
  const rect = hackerCard.getBoundingClientRect();

  // Light pass position (relative to card, but updated even when mouse outside)
  const lx = ((e.clientX - rect.left) / rect.width) * 100;
  const ly = ((e.clientY - rect.top) / rect.height) * 100;
  if (lightPass) {
    lightPass.style.setProperty('--mx', lx + '%');
    lightPass.style.setProperty('--my', ly + '%');
  }

  // Subtle 3D tilt
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) / rect.width;
  const dy = (e.clientY - cy) / rect.height;
  const maxTilt = 3.5;
  hackerCard.style.transform =
    `perspective(1300px) rotateY(${dx * maxTilt}deg) rotateX(${-dy * maxTilt}deg)`;
}

document.addEventListener('mousemove', handleMove);

document.addEventListener('mouseleave', () => {
  if (hackerCard) {
    hackerCard.style.transform = 'perspective(1300px) rotateY(0) rotateX(0)';
  }
});

/* =========================================================
   TERMINAL TYPING ENGINE
   ========================================================= */
const terminal = document.getElementById('terminal');

const deniedSequence = [
  ['sys',  '[SYSTEM] Accessing secure terminal...'],
  ['ok',   '[ OK ] Clearance level: TOP SECRET'],
  ['info', '[INFO] Connecting to ******** database...'],
  ['ok',   '[ OK ] Connection established'],
  ['info', '[INFO] Initializing subject search protocol'],
  ['raw',  '[...] Scanning known aliases...'],
  ['ok',   '[ OK ] Match found: sofiane_mahiout'],
  ['info', '[INFO] Retrieving biometric data...'],
  ['ok',   '[ OK ] Facial recognition: 99.87% match'],
  ['info', '[INFO] Cross-checking digital footprint...'],
  ['ok',   '[ OK ] Found platforms: LinkedIn, GitHub, ...'],
  ['info', '[INFO]'],
];

const grantedSequence = [
  ['info', '[INFO] Analyzing repository activity...'],
  ['ok',   '[ OK ] Detected active engagements'],
  ['raw',  '[...] Extracting latest commit logs...'],
  ['ok',   '[ OK ] "feat: harden auth pipeline" - commit 3f9a2c1'],
  ['info', '[INFO] Assessing cybersecurity activity...'],
  ['ok',   '[ OK ] Identified role: SysAdmin / Future Cyber Engineer'],
  ['raw',  '[...] Verifying network presence...'],
  ['ok',   '[ OK ] Active on port 1337'],
  ['ok',   "[ OK ] Known alias: 'Sofiane'"],
  ['info', '[INFO] Checking recent engagements...'],
  ['ok',   '[ OK ] Alternance @ La Fondation du Bocage'],
  ['fail', '[FAIL] Access denied to classified report (403)'],
  ['raw',  '[...] Bypassing access restriction...'],
  ['ok',   '[ OK ] Access granted (override: admin token)'],
  ['info', '[INFO] Loading profile UI modules...'],
  ['ok',   '[ OK ] Interface initialized'],
  ['ok',   '[ OK ] Interface secured'],
  ['sys',  '[SYSTEM] Subject profile fully loaded.'],
  ['warn', '[NOTICE] You are now being monitored.'],
];

function tagClass(tag) {
  switch (tag) {
    case 'ok': return 'tag-ok';
    case 'info': return 'tag-info';
    case 'fail': return 'tag-fail';
    case 'sys': return 'tag-sys';
    case 'warn': return 'tag-warn';
    default: return '';
  }
}

function colorize(text, tagType) {
  const m = text.match(/^(\[[^\]]+\])(.*)$/);
  if (!m) return `<span class="${tagClass(tagType)}">${text}</span>`;
  return `<span class="${tagClass(tagType)}">${m[1]}</span>${m[2]}`;
}

let cursorEl = null;

function appendCursor() {
  if (cursorEl) cursorEl.remove();
  cursorEl = document.createElement('span');
  cursorEl.className = 'cursor';
  terminal.appendChild(cursorEl);
}

function removeCursor() {
  if (cursorEl) {
    cursorEl.remove();
    cursorEl = null;
  }
}

function writeLine(tag, text, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      removeCursor();
      const div = document.createElement('div');
      div.className = 'line';
      div.innerHTML = colorize(text, tag);
      terminal.appendChild(div);
      appendCursor();
      resolve();
    }, delay);
  });
}

async function playSequence(sequence, baseDelay = 160) {
  for (const [tag, text] of sequence) {
    await writeLine(tag, text, baseDelay + Math.random() * 100);
  }
}

function addDivider() {
  const d = document.createElement('div');
  d.className = 'line divider';
  d.textContent = '----------------------------------------';
  terminal.appendChild(d);
}

/* =========================================================
   MAIN FLOW: denied → bypass → granted → profile
   ========================================================= */
const btn = document.getElementById('bypassBtn');
const statusBand = document.getElementById('statusBand');
const accessScreen = document.getElementById('accessScreen');
const profileView = document.getElementById('profileView');

let phase = 'denied';

async function bootSequence() {
  if (btn) btn.disabled = true;
  await playSequence(deniedSequence, 150);
  addDivider();
  if (btn) btn.disabled = false;
}

if (btn) {
  btn.addEventListener('click', async () => {
    if (phase === 'denied') {
      btn.disabled = true;
      await playSequence(grantedSequence, 130);
      // Flip status band
      if (statusBand) {
        statusBand.textContent = 'ACCESS GRANTED';
        statusBand.classList.add('granted');
      }
      phase = 'granted';
      btn.querySelector('.btn-label').textContent = 'Enter Profile';
      btn.disabled = false;
    } else if (phase === 'granted') {
      // Fade out access screen, fade in profile
      accessScreen.style.transition = 'opacity 0.6s ease';
      accessScreen.style.opacity = '0';
      setTimeout(() => {
        accessScreen.style.display = 'none';
        profileView.classList.add('visible');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 600);
    }
  });
}

/* =========================================================
   PROFILE NAVIGATION (side nav + bottom nav scroll)
   ========================================================= */
function setupNavigation() {
  // Side nav active state on click
  const sideLinks = document.querySelectorAll('.nav-link');
  const bnavLinks = document.querySelectorAll('.bnav-link[data-target]');
  const allInternalLinks = [...sideLinks, ...bnavLinks];

  allInternalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-target');
      if (!target) return; // external links handled by browser
      e.preventDefault();

      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sideLinks.forEach(l => l.classList.remove('active'));
        const matchingSide = document.querySelector(`.nav-link[data-target="${target}"]`);
        if (matchingSide) matchingSide.classList.add('active');
      }
    });
  });

  // Active nav based on scroll position
  const sections = ['about', 'experience', 'formations']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sideLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('data-target') === id);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));
}

setupNavigation();

/* =========================================================
   KICK OFF
   ========================================================= */
bootSequence();
