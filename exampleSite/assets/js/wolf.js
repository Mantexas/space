document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.wolf-title');
  if (!container) return;

  // Clear any existing content
  container.innerHTML = '';

  // Create cursor
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  container.appendChild(cursor);

  const text = "Mantas Zdancius";
  let i = 0;

  function type() {
    if (i < text.length) {
      const span = document.createElement('span');
      span.textContent = text.charAt(i);
      container.insertBefore(span, cursor);
      i++;
      // Randomize timing slightly for organic "human" feel
      setTimeout(type, 100 + Math.random() * 50);
    } else {
      // Fade out cursor after typing is done (A24 style clean finish)
      setTimeout(() => {
        cursor.style.transition = 'opacity 1s ease';
        cursor.style.opacity = '0';
      }, 2000);
    }
  }

  // Start after 1 second
  setTimeout(type, 1000);
});
