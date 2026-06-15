/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
(function bootSequence() {
  const lines = document.querySelectorAll('.boot-line');
  const typeSpeed = 18; // ms per character
  const lineDelay = 220; // pause between lines

  lines.forEach((line, index) => {
    const text = line.getAttribute('data-text') || '';
    let charIndex = 0;

    const startDelay = lines.length
      ? index * (text.length * typeSpeed + lineDelay) * 0
      : 0;

    // Sequential typing: each line waits for the previous to finish.
    const previousDuration = Array.from(lines)
      .slice(0, index)
      .reduce((total, l) => {
        const t = l.getAttribute('data-text') || '';
        return total + t.length * typeSpeed + lineDelay;
      }, 0);

    setTimeout(() => {
      const typeChar = () => {
        line.textContent = text.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex < text.length) {
          setTimeout(typeChar, typeSpeed);
        }
      };
      typeChar();
    }, previousDuration);
  });
})();

/* ============================================================
   ENTER SITE / AUDIO
   ============================================================ */
const bootScreen = document.getElementById('boot-screen');
const enterBtn = document.getElementById('enter-btn');
const bgAudio = document.getElementById('bg-audio');
const muteBtn = document.getElementById('mute-btn');

enterBtn.addEventListener('click', () => {
  bootScreen.classList.add('hidden');

  // Attempt to start ambient audio. Browsers allow this because
  // it's triggered by a direct user gesture (the click).
  if (bgAudio) {
    bgAudio.volume = 0.4;
    bgAudio.play().catch(() => {
      // No audio source available yet, or browser blocked it.
      // Fail silently — the mute icon still works once a track is added.
    });
  }
});

// Also allow pressing Enter/Space on the button via keyboard (native button
// behaviour already supports this, kept here only as a safety net for
// custom event wiring in case markup changes).
enterBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    enterBtn.click();
  }
});

muteBtn.addEventListener('click', () => {
  if (!bgAudio) return;

  bgAudio.muted = !bgAudio.muted;
  muteBtn.classList.toggle('is-muted', bgAudio.muted);
  muteBtn.setAttribute('aria-pressed', String(bgAudio.muted));
  muteBtn.setAttribute(
    'aria-label',
    bgAudio.muted ? 'Unmute background audio' : 'Mute background audio'
  );
});

/* ============================================================
   TAB SWITCHING
   ============================================================ */
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-target');

    tabs.forEach((t) => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === target);
    });
  });
});

/* ============================================================
   SKILLS CAROUSEL (user controlled, left/right)
   ============================================================ */
(function skillsCarousel() {
  const track = document.getElementById('skills-track');
  const viewport = track ? track.parentElement : null;
  const leftBtn = document.querySelector('.carousel-arrow--left');
  const rightBtn = document.querySelector('.carousel-arrow--right');

  if (!track || !viewport || !leftBtn || !rightBtn) return;

  const cards = Array.from(track.children);
  let index = 0;

  function getStep() {
    // Distance to move = width of one card + the track's gap.
    const card = cards[0];
    const cardWidth = card.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || '0');
    return cardWidth + gap;
  }

  function maxIndex() {
    const step = getStep();
    const viewportWidth = viewport.getBoundingClientRect().width;
    const visibleCount = Math.max(1, Math.floor((viewportWidth + 1) / step));
    return Math.max(0, cards.length - visibleCount);
  }

  function update() {
    const step = getStep();
    track.style.transform = `translateX(-${index * step}px)`;

    // If every card already fits in the viewport, the arrows have
    // nothing to do — hide them rather than leave dead buttons.
    const max = maxIndex();
    const needsArrows = max > 0;
    leftBtn.style.display = needsArrows ? '' : 'none';
    rightBtn.style.display = needsArrows ? '' : 'none';
  }

  leftBtn.addEventListener('click', () => {
    const max = maxIndex();
    index = index <= 0 ? max : index - 1;
    update();
  });

  rightBtn.addEventListener('click', () => {
    const max = maxIndex();
    index = index >= max ? 0 : index + 1;
    update();
  });

  window.addEventListener('resize', () => {
    const max = maxIndex();
    if (index > max) index = max;
    update();
  });

  update();
})();
