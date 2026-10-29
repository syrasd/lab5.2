/**
 * main.js
 * Controller for Syeda Shafia Haider's Portfolio
 * - Multi-page version: each page has its own studio pose background
 * - Exact Angle Mapping:
 *     home:      Left Profile (Face Left Side)
 *     skills:    Left Three-Quarter
 *     projects:  Front
 *     education: Right Three-Quarter
 *     contact:   Right Profile
 * - Reduced Card Blur (8px) for High Text Prominence
 */

document.addEventListener('DOMContentLoaded', () => {
  // Depth-camera pulse when a page opens
  if (typeof window.triggerThreeZoom === 'function') {
    window.triggerThreeZoom();
  }

  // 3D Card Tilt & Specular Glare Physics
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -7;
      const rotY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(10px)`;
      card.style.setProperty('--glare-x', `${x}px`);
      card.style.setProperty('--glare-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });

  // Mouse Parallax for Background Subject
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', (e.clientX / window.innerWidth - 0.5).toFixed(3));
    document.documentElement.style.setProperty('--mouse-y', (e.clientY / window.innerHeight - 0.5).toFixed(3));
  });

  // Dark & Light Mode Theme
  const themeBtn = document.getElementById('theme-switch-btn');
  const storedTheme = localStorage.getItem('shafia_exact_theme') || 'dark';

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('shafia_exact_theme', t);
  }

  setTheme(storedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // Contact Form & Toast Notice
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-msg-box');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Message sent! Syeda Shafia will get back to you shortly.');
      }, 1000);
    });
  }
});
