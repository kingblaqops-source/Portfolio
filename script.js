// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// ============================================
// SCROLL-TRIGGERED SECTION REVEALS
// ============================================
const sections = document.querySelectorAll('.section');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => revealObserver.observe(section));

// ============================================
// TERMINAL TYPING ANIMATION (HERO)
// ============================================
function typeText(el, text, speed = 45) {
  return new Promise(resolve => {
    let i = 0;
    el.style.opacity = 1;
    const interval = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function runTerminalSequence() {
  const typedName = document.getElementById('typedName');
  const line2 = document.getElementById('line2');
  const typedRole = document.getElementById('typedRole');
  const line3 = document.getElementById('line3');

  await typeText(typedName, 'Opemipo');
  await new Promise(r => setTimeout(r, 300));

  line2.style.opacity = 1;
  await new Promise(r => setTimeout(r, 200));
  await typeText(typedRole, 'Computer Engineering Student & Developer', 28);
  await new Promise(r => setTimeout(r, 200));

  line3.style.opacity = 1;
}

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.getElementById('typedName').textContent = 'Opemipo';
  document.getElementById('typedName').style.opacity = 1;
  document.getElementById('line2').style.opacity = 1;
  document.getElementById('typedRole').textContent = 'Computer Engineering Student & Developer';
  document.getElementById('typedRole').style.opacity = 1;
  document.getElementById('line3').style.opacity = 1;
} else {
  window.addEventListener('DOMContentLoaded', runTerminalSequence);
  // Fallback in case DOMContentLoaded already fired
  if (document.readyState !== 'loading') runTerminalSequence();
}

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const navLinkEls = document.querySelectorAll('.nav__link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(sec => navObserver.observe(sec));
