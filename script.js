/* ========================================
   Robotics and STEM, Engineering the Future
   COE Summer Camp 2026 — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initDropdowns();
  initCountdown();
  initScrollReveal();
  initSmoothScroll();
  initTimelineToggles();
  initInteractiveCursor();
  initRocketLaunch();
});

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---------- Mobile Menu & Dropdowns ---------- */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  function toggleMenu() {
    btn.classList.toggle('active');
    navLinks.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    btn.classList.remove('active');
    navLinks.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking regular navigation links, but not dropdown triggers
  navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

function initDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
}

/* ---------- Countdown Timer ---------- */
function initCountdown() {
  const timerEl = document.getElementById('countdownTimer');
  if (!timerEl) return;
  const targetDateStr = timerEl.getAttribute('data-target-date') || '2026-12-14T09:00:00+04:00';
  const campDate = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minutesEl = document.getElementById('countMinutes');
  const secondsEl = document.getElementById('countSeconds');

  function updateCountdown() {
    const now = Date.now();
    const diff = campDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}

/* ---------- Timeline Expandable Focus Areas ---------- */
function initTimelineToggles() {
  const toggles = document.querySelectorAll('.timeline-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const focusPanel = document.getElementById(targetId);

      if (!focusPanel) return;

      const isExpanded = focusPanel.classList.contains('expanded');

      if (isExpanded) {
        focusPanel.classList.remove('expanded');
        toggle.classList.remove('expanded');
        toggle.innerHTML = 'View Focus Areas <span class="arrow">▾</span>';
      } else {
        focusPanel.classList.add('expanded');
        toggle.classList.add('expanded');
        toggle.innerHTML = 'Hide Focus Areas <span class="arrow">▾</span>';
      }
    });
  });
}

/* ---------- Interactive Spacecraft & Drone Cursor ---------- */
function initInteractiveCursor() {
  const cursor = document.getElementById('spacecraftCursor') || document.getElementById('droneCursor');
  if (!cursor) return;

  // Detect touch device (flight cursors don't make sense on touch screen devices)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    cursor.style.display = 'none';
    return;
  }

  cursor.style.display = 'block';

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let velocityX = 0;

  window.addEventListener('mousemove', (e) => {
    // Target position is offset to the top-right so the spacecraft flies beside the user pointer
    mouseX = e.clientX + 18;
    mouseY = e.clientY - 18;
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  // Hover animations for interactive elements
  const interactiveSelector = 'a, button, [role="button"], .timeline-toggle, .mobile-menu-btn';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('spacecraft-hovering');
      cursor.classList.add('drone-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (!e.target.closest(interactiveSelector)) {
      cursor.classList.remove('spacecraft-hovering');
      cursor.classList.remove('drone-hovering');
    }
  });

  function animate() {
    // Physics lerp for smooth spacecraft flight
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    const lerpFactor = 0.09;
    const oldX = cursorX;
    cursorX += dx * lerpFactor;
    cursorY += dy * lerpFactor;

    // Calculate velocity for aerodynamic banking
    velocityX = cursorX - oldX;

    // Calculate aerodynamic bank/tilt angle based on horizontal velocity
    const maxTilt = 24;
    const tilt = Math.min(Math.max(velocityX * 1.6, -maxTilt), maxTilt);

    // Apply transform (translate + tilt)
    cursor.style.transform = `translate3d(${cursorX - 21}px, ${cursorY - 21}px, 0) rotate(${tilt}deg)`;

    requestAnimationFrame(animate);
  }

  // Start the flight render loop
  requestAnimationFrame(animate);
}

/* ---------- Rocket Click Effect ---------- */
function initRocketLaunch() {
  document.addEventListener('click', (e) => {
    // Avoid spawning on links/buttons/toggles to keep click actions clean
    const interactiveSelector = 'a, button, [role="button"], .timeline-toggle, .mobile-menu-btn';
    if (e.target.closest(interactiveSelector)) return;

    const startX = e.clientX;
    const startY = window.innerHeight;
    const targetY = e.clientY;

    // Create rocket element
    const rocket = document.createElement('div');
    rocket.className = 'rocket-projectile';
    rocket.innerHTML = '🚀';
    rocket.style.left = `${startX - 15}px`;
    rocket.style.top = `${startY}px`;
    document.body.appendChild(rocket);

    // Animate rocket shoot up
    setTimeout(() => {
      rocket.style.transform = `translateY(-${startY - targetY}px) rotate(0deg)`;
      rocket.style.opacity = '1';
    }, 10);

    // When rocket reaches target, explode and disappear
    setTimeout(() => {
      createExplosion(startX, targetY);
      rocket.remove();
    }, 600);
  });

  function createExplosion(x, y) {
    const particleCount = 8;
    const colors = ['#2563eb', '#0891b2', '#ea580c', '#f59e0b', '#22c55e'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'rocket-spark';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 30 + Math.random() * 40;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        particle.style.opacity = '0';
      }, 10);

      setTimeout(() => {
        particle.remove();
      }, 800);
    }
  }
}
