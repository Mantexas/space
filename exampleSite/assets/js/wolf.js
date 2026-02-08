/**
 * Wolf Hero Animation - Creative Letter Interaction
 * The wolf walks across the title, interacting with each letter uniquely
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const wolf = document.querySelector('.wolf-container');
  const wolfImg = document.querySelector('.wolf');
  const letters = document.querySelectorAll('.letter:not(.letter-space)');
  const stage = document.querySelector('.wolf-stage');

  if (!wolf || !letters.length || !stage) return;

  // Animation timeline - array of actions
  // Each action: { type, letterIndex, duration, moveDistance }
  const behaviors = ['walk', 'sniff', 'pause', 'jump', 'howl', 'cautious', 'step'];

  // State
  let currentX = -200;
  let isAnimating = false;
  let animationTimeout = null;

  // Get letter positions relative to stage
  function getLetterPositions() {
    const stageRect = stage.getBoundingClientRect();
    return Array.from(letters).map(letter => {
      const rect = letter.getBoundingClientRect();
      return {
        el: letter,
        left: rect.left - stageRect.left,
        right: rect.right - stageRect.left,
        center: (rect.left + rect.right) / 2 - stageRect.left,
        width: rect.width
      };
    });
  }

  // Set wolf position
  function setWolfPosition(x) {
    currentX = x;
    wolf.style.left = x + 'px';
  }

  // Set wolf behavior class
  function setWolfBehavior(behavior) {
    behaviors.forEach(b => wolf.classList.remove(b));
    if (behavior) wolf.classList.add(behavior);
  }

  // Clear all letter states
  function clearLetterStates() {
    letters.forEach(letter => {
      letter.classList.remove('pressed', 'sniffed', 'wobble', 'spring', 'shiver');
    });
  }

  // Animate wolf moving to position
  function moveTo(targetX, duration, behavior = 'walking') {
    return new Promise(resolve => {
      setWolfBehavior(behavior);
      const startX = currentX;
      const distance = targetX - startX;
      const startTime = performance.now();

      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        setWolfPosition(startX + distance * eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      }

      requestAnimationFrame(animate);
    });
  }

  // Wait for duration
  function wait(duration) {
    return new Promise(resolve => {
      animationTimeout = setTimeout(resolve, duration);
    });
  }

  // Sniff a letter
  async function sniffLetter(letterEl) {
    setWolfBehavior('sniffing');
    letterEl.classList.add('sniffed');
    await wait(800);
    letterEl.classList.remove('sniffed');
    letterEl.classList.add('wobble');
    await wait(300);
  }

  // Step on a letter
  async function stepOnLetter(letterEl) {
    setWolfBehavior('walking');
    letterEl.classList.add('pressed');
    await wait(400);
  }

  // Release a letter (wolf steps off)
  function releaseLetter(letterEl) {
    letterEl.classList.remove('pressed');
    letterEl.classList.add('wobble');
    setTimeout(() => letterEl.classList.remove('wobble'), 600);
  }

  // Jump over letters
  async function jumpOver(letterEls) {
    setWolfBehavior('jumping');
    letterEls.forEach(el => {
      setTimeout(() => {
        el.classList.add('spring');
        setTimeout(() => el.classList.remove('spring'), 800);
      }, 200);
    });
    await wait(700);
  }

  // Howl - affects nearby letters
  async function howl(nearbyLetters) {
    setWolfBehavior('howling');
    nearbyLetters.forEach(el => el.classList.add('shiver'));
    await wait(1400);
    nearbyLetters.forEach(el => el.classList.remove('shiver'));
  }

  // Pause cautiously
  async function pauseCautious() {
    setWolfBehavior('cautious');
    await wait(1000);
  }

  // Pause and look around
  async function pauseLook() {
    setWolfBehavior('paused');
    await wait(800);
  }

  // Main choreographed animation sequence
  async function runAnimation() {
    if (isAnimating) return;
    isAnimating = true;

    const letterPos = getLetterPositions();
    const stageRect = stage.getBoundingClientRect();
    const wolfWidth = wolfImg ? wolfImg.offsetWidth : 120;
    const endX = stageRect.width + 100;

    clearLetterStates();
    setWolfPosition(-200);

    // Start: walk in from left
    await wait(500);

    // Move to before first letter, pause cautiously
    const firstLetter = letterPos[0];
    await moveTo(firstLetter.left - wolfWidth - 30, 1500, 'walking');
    await pauseCautious();

    // Sniff first letter
    await moveTo(firstLetter.left - wolfWidth + 10, 400, 'walking');
    await sniffLetter(firstLetter.el);

    // Step onto first few letters
    let currentLetterIndex = 0;
    let steppedLetters = [];

    // Walk onto letter 0
    await moveTo(firstLetter.center - wolfWidth / 2, 300, 'walking');
    await stepOnLetter(letterPos[0].el);
    steppedLetters.push(letterPos[0].el);

    // Walk to letter 2, stepping on letters
    if (letterPos[2]) {
      await moveTo(letterPos[2].center - wolfWidth / 2, 600, 'walking');
      releaseLetter(letterPos[0].el);
      await stepOnLetter(letterPos[2].el);
      steppedLetters = [letterPos[2].el];
    }

    // Pause and look around in the middle of first name
    await pauseLook();

    // Jump over the next 2-3 letters
    const jumpStart = 3;
    const jumpEnd = Math.min(5, letterPos.length - 1);
    const jumpLetters = letterPos.slice(jumpStart, jumpEnd + 1).map(p => p.el);

    if (jumpLetters.length > 0) {
      steppedLetters.forEach(el => releaseLetter(el));
      steppedLetters = [];

      const jumpTargetX = letterPos[jumpEnd].right + 20;
      await jumpOver(jumpLetters);
      await moveTo(jumpTargetX, 500, 'jumping');
    }

    // Find the space between names (around index 6 for "Mantas Zdancius")
    const midPoint = Math.floor(letterPos.length / 2);

    // Walk to middle, howl
    if (letterPos[midPoint]) {
      await moveTo(letterPos[midPoint].center - wolfWidth / 2, 800, 'walking');
      const howlLetters = letterPos.slice(
        Math.max(0, midPoint - 2),
        Math.min(letterPos.length, midPoint + 3)
      ).map(p => p.el);
      await howl(howlLetters);
    }

    // Continue walking, stepping on a few more letters
    const laterLetters = Math.floor(letterPos.length * 0.7);
    if (letterPos[laterLetters]) {
      await moveTo(letterPos[laterLetters].center - wolfWidth / 2, 1000, 'walking');
      await stepOnLetter(letterPos[laterLetters].el);
      await wait(300);

      // Sniff the next letter
      if (letterPos[laterLetters + 1]) {
        await moveTo(letterPos[laterLetters + 1].center - wolfWidth / 2, 400, 'walking');
        releaseLetter(letterPos[laterLetters].el);
        await sniffLetter(letterPos[laterLetters + 1].el);
      }
    }

    // Final jump over last couple letters
    const finalJumpStart = letterPos.length - 2;
    if (finalJumpStart > 0 && letterPos[finalJumpStart]) {
      const finalJumpLetters = letterPos.slice(finalJumpStart).map(p => p.el);
      await jumpOver(finalJumpLetters);
      await moveTo(letterPos[letterPos.length - 1].right + 50, 600, 'jumping');
    }

    // Walk off stage
    await moveTo(endX, 1200, 'walking');

    clearLetterStates();
    setWolfBehavior(null);
    isAnimating = false;

    // Restart after delay
    setTimeout(runAnimation, 8000);
  }

  // Start animation when visible
  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isAnimating) {
          observer.disconnect();
          setTimeout(runAnimation, 1000);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(wolf);
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animationTimeout) {
      clearTimeout(animationTimeout);
    }
  });
})();
