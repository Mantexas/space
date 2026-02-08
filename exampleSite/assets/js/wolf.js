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

  const wolfContainer = document.querySelector('.wolf-container');
  const wolfImg = document.querySelector('.wolf');
  const letters = document.querySelectorAll('.letter:not(.letter-space)');
  const stage = document.querySelector('.wolf-stage');

  if (!wolfContainer || !letters.length || !stage) return;

  // Configuration
  const SPEED = 0.15; // pixels per ms
  const JUMP_SPEED = 0.35; // faster when jumping

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
    wolfContainer.style.left = x + 'px';
  }

  // Set wolf behavior class
  function setWolfBehavior(behavior) {
    // Remove all previous behaviors
    const behaviors = ['walking', 'sniffing', 'paused', 'jumping', 'howling', 'cautious'];
    behaviors.forEach(b => wolfContainer.classList.remove(b));
    
    if (behavior) {
      wolfContainer.classList.add(behavior);
    }
  }

  // Clear all letter states
  function clearLetterStates() {
    letters.forEach(letter => {
      letter.classList.remove('pressed', 'sniffed', 'wobble', 'spring', 'shiver');
    });
  }

  // Animate wolf moving to position
  function moveTo(targetX, behavior = 'walking') {
    return new Promise(resolve => {
      setWolfBehavior(behavior);
      
      const startX = currentX;
      const distance = targetX - startX;
      
      // Calculate duration based on speed
      const speed = behavior === 'jumping' ? JUMP_SPEED : SPEED;
      const duration = Math.abs(distance) / speed;
      
      if (duration <= 0) {
        resolve();
        return;
      }

      const startTime = performance.now();

      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Linear movement for walking, ease-out for jump landing
        const eased = behavior === 'jumping' 
          ? progress // Linear horizontal for jump usually looks best with parabolic vertical
          : progress;

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
    await wait(400); // Wait for head to go down
    letterEl.classList.add('sniffed');
    await wait(800);
    letterEl.classList.remove('sniffed');
    letterEl.classList.add('wobble');
    await wait(300);
  }

  // Step on a letter
  async function stepOnLetter(letterEl) {
    // Just trigger the visual effect, don't stop walking
    letterEl.classList.add('pressed');
    setTimeout(() => {
       letterEl.classList.remove('pressed');
       letterEl.classList.add('wobble');
       setTimeout(() => letterEl.classList.remove('wobble'), 500);
    }, 400);
  }

  // Jump over letters
  async function jumpOver(letterEls) {
    setWolfBehavior('jumping');
    // Trigger spring effect on letters as we pass over
    letterEls.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('spring');
        setTimeout(() => el.classList.remove('spring'), 800);
      }, 100 + (index * 100));
    });
    // The visual jump is handled by CSS on the wolf container
    // The horizontal movement is handled by moveTo
  }

  // Howl - affects nearby letters
  async function howl(nearbyLetters) {
    setWolfBehavior('howling');
    // Trigger shiver slightly delayed
    setTimeout(() => {
        nearbyLetters.forEach(el => el.classList.add('shiver'));
    }, 500);
    
    await wait(2000);
    nearbyLetters.forEach(el => el.classList.remove('shiver'));
  }

  // Main choreographed animation sequence
  async function runAnimation() {
    if (isAnimating) return;
    isAnimating = true;

    const letterPos = getLetterPositions();
    if (!letterPos.length) return;

    const stageRect = stage.getBoundingClientRect();
    const wolfWidth = wolfImg ? wolfImg.offsetWidth : 120;
    const endX = stageRect.width + 100;
    const startX = -wolfWidth - 50;

    clearLetterStates();
    setWolfPosition(startX);

    // Sequence Start
    await wait(500);

    // 1. Walk in to the first letter
    const firstLetter = letterPos[0];
    await moveTo(firstLetter.left - wolfWidth - 20, 'walking');
    
    // 2. Cautious pause
    setWolfBehavior('cautious');
    await wait(1200);

    // 3. Sniff first letter
    await moveTo(firstLetter.left - wolfWidth + 10, 'walking'); // Get closer
    await sniffLetter(firstLetter.el);

    // 4. Walk across first name, stepping on letters
    // "Mantas" has 6 letters. Let's walk to the middle.
    const midName1 = letterPos[2]; // 'n'
    await moveTo(midName1.center - wolfWidth/2, 'walking');
    stepOnLetter(midName1.el); // Non-blocking
    
    // 5. Jump over the rest of the first name
    const endName1 = letterPos[5]; // 's'
    const jumpTargetX = endName1.right + 20;
    const jumpLetters = letterPos.slice(3, 6).map(p => p.el);
    
    const jumpDist = jumpTargetX - currentX;
    // We need to call jumpOver (visuals) and moveTo (position) together
    jumpOver(jumpLetters);
    await moveTo(jumpTargetX, 'jumping');

    // 6. Pause in the space
    setWolfBehavior('paused');
    await wait(800);

    // 7. Howl at the moon (or the space)
    // Affect letters on both sides
    const howlLetters = [letterPos[5].el, letterPos[6] ? letterPos[6].el : null].filter(Boolean);
    await howl(howlLetters);

    // 8. Walk slowly/cautiously through the second name
    setWolfBehavior('cautious');
    const lastLetter = letterPos[letterPos.length - 1];
    
    // Move to the end of the name
    await moveTo(lastLetter.right + 20, 'walking');

    // 9. Final look back
    setWolfBehavior('paused'); // or turn head if we had a sprite
    await wait(600);

    // 10. Exit stage right
    await moveTo(endX, 'walking');

    // Reset
    setWolfBehavior(null);
    clearLetterStates();
    isAnimating = false;

    // Loop
    setTimeout(runAnimation, 6000);
  }

  // Initialization
  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isAnimating) {
          observer.disconnect();
          setTimeout(runAnimation, 500);
        }
      });
    }, { threshold: 0.2 });

    if (wolfContainer) {
        observer.observe(wolfContainer);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
