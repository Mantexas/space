// Panther Hero Animation - Letter Physics Interaction

(function() {
  'use strict';

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const pantherContainer = document.querySelector('.panther-container');
  const letters = document.querySelectorAll('.panther-title .letter');

  if (!pantherContainer || letters.length === 0) {
    return;
  }

  // Track which letters are currently pressed
  const pressedLetters = new Set();

  // Get panther's "feet" position (center-bottom of panther)
  function getPantherFeetPosition() {
    const rect = pantherContainer.getBoundingClientRect();
    // Panther feet are roughly at center-bottom
    return {
      x: rect.left + rect.width * 0.5,
      width: rect.width * 0.6 // Approximate width where feet touch
    };
  }

  // Check if panther is stepping on a letter
  function isSteppingOn(letterRect, pantherFeet) {
    const letterCenter = letterRect.left + letterRect.width / 2;
    const pantherLeft = pantherFeet.x - pantherFeet.width / 2;
    const pantherRight = pantherFeet.x + pantherFeet.width / 2;

    return letterCenter >= pantherLeft && letterCenter <= pantherRight;
  }

  // Main animation loop
  function updateLetterPhysics() {
    const pantherFeet = getPantherFeetPosition();

    letters.forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();
      const stepping = isSteppingOn(letterRect, pantherFeet);
      const index = letter.dataset.index;

      if (stepping && !pressedLetters.has(index)) {
        // Panther just stepped on this letter
        pressedLetters.add(index);
        letter.classList.add('pressed');
        letter.classList.remove('bouncing');
      } else if (!stepping && pressedLetters.has(index)) {
        // Panther just stepped off this letter
        pressedLetters.delete(index);
        letter.classList.remove('pressed');
        letter.classList.add('bouncing');

        // Remove bouncing class after animation
        setTimeout(() => {
          letter.classList.remove('bouncing');
        }, 400);
      }
    });

    requestAnimationFrame(updateLetterPhysics);
  }

  // Start the animation loop
  requestAnimationFrame(updateLetterPhysics);
})();
