document.addEventListener('DOMContentLoaded', () => {

  /*=============== CRAZY COOL PRELOADER ANIMATION ===============*/
  const preloader = document.getElementById('preloader');
  const preloaderPercent = document.getElementById('preloader-percent');
  const preloaderProgress = document.getElementById('preloader-progress');
  const preloaderText = document.getElementById('preloader-text');

  if (preloader && preloaderPercent && preloaderProgress) {
    document.body.style.overflow = 'hidden';

    let count = 0;
    const statusMessages = [
      'INITIALIZING EXPERIENCE...',
      'LOADING GRAPHICS ENGINE...',
      'COMPILING HIGH-PERFORMANCE CODE...',
      'PREPARING PORTFOLIO SYSTEM...',
      'WELCOME TO KARIBASU JADAR PORTFOLIO'
    ];

    const interval = setInterval(() => {
      count += 1;

      if (count > 25 && count < 50 && preloaderText) {
        preloaderText.textContent = statusMessages[1];
      } else if (count >= 50 && count < 75 && preloaderText) {
        preloaderText.textContent = statusMessages[2];
      } else if (count >= 75 && count < 95 && preloaderText) {
        preloaderText.textContent = statusMessages[3];
      }

      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        if (preloaderText) preloaderText.textContent = statusMessages[4];

        setTimeout(() => {
          preloader.classList.add('loaded');
          document.body.style.overflow = '';
        }, 700);
      }

      preloaderPercent.textContent = `${count}%`;
      preloaderProgress.style.width = `${count}%`;
    }, 28);
  }

  /*=============== CYBER HOLOGRAM ORB CANVAS ===============*/
  const holoCanvas = document.getElementById('preloader-hologram');
  if (holoCanvas) {
    const hCtx = holoCanvas.getContext('2d');
    const w = holoCanvas.width;
    const h = holoCanvas.height;
    const centerX = w / 2;
    const centerY = h / 2;
    let angle = 0;

    const holoNodes = [];
    const nodeCount = 45;
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 45 + Math.random() * 8;
      holoNodes.push({ theta, phi, radius });
    }

    const animateHologram = () => {
      hCtx.clearRect(0, 0, w, h);
      angle += 0.025;

      // Draw outer glowing ring
      hCtx.save();
      hCtx.translate(centerX, centerY);
      hCtx.rotate(angle * 0.5);
      hCtx.beginPath();
      hCtx.ellipse(0, 0, 52, 22, Math.PI / 4, 0, Math.PI * 2);
      hCtx.strokeStyle = 'rgba(240, 185, 11, 0.45)';
      hCtx.lineWidth = 1.5;
      hCtx.stroke();
      hCtx.restore();

      // Draw reverse ring
      hCtx.save();
      hCtx.translate(centerX, centerY);
      hCtx.rotate(-angle * 0.7);
      hCtx.beginPath();
      hCtx.ellipse(0, 0, 56, 26, -Math.PI / 3, 0, Math.PI * 2);
      hCtx.strokeStyle = 'rgba(56, 239, 125, 0.35)';
      hCtx.lineWidth = 1.5;
      hCtx.stroke();
      hCtx.restore();

      // Render 3D projected nodes
      for (let i = 0; i < holoNodes.length; i++) {
        const n = holoNodes[i];
        n.theta += 0.02;

        const x3d = n.radius * Math.sin(n.phi) * Math.cos(n.theta + angle);
        const y3d = n.radius * Math.cos(n.phi);
        const z3d = n.radius * Math.sin(n.phi) * Math.sin(n.theta + angle) + 100;

        const scale = 100 / z3d;
        const screenX = centerX + x3d * scale;
        const screenY = centerY + y3d * scale;

        const nodeAlpha = Math.max(0.2, (z3d - 50) / 100);

        hCtx.beginPath();
        hCtx.arc(screenX, screenY, scale * 2.2, 0, Math.PI * 2);
        hCtx.fillStyle = i % 2 === 0 ? '#f0b90b' : '#38ef7d';
        hCtx.globalAlpha = nodeAlpha;
        hCtx.fill();
        hCtx.globalAlpha = 1;
      }

      if (document.getElementById('preloader') && !document.getElementById('preloader').classList.contains('loaded')) {
        requestAnimationFrame(animateHologram);
      }
    };
    animateHologram();
  }

  /*=============== LIGHT / DARK THEME TOGGLE ===============*/
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.classList.replace('bx-moon', 'bx-sun');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'dark');
        if (themeIcon) themeIcon.classList.replace('bx-sun', 'bx-moon');
        showToast('Switched to Dark Mode 🌙');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('portfolio-theme', 'light');
        if (themeIcon) themeIcon.classList.replace('bx-moon', 'bx-sun');
        showToast('Switched to Light Mode ☀️');
      }
    });
  }

  /*=============== HEADER SCROLLED CLASS ===============*/
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /*=============== HERO SUBTLE PARTICLES ===============*/
  const particleCanvas = document.getElementById('hero-particles');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 35; // Small, subtle amount as requested

    const resizeCanvas = () => {
      if (particleCanvas.parentElement) {
        width = particleCanvas.width = particleCanvas.parentElement.offsetWidth;
        height = particleCanvas.height = particleCanvas.parentElement.offsetHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (width || window.innerWidth);
        this.y = Math.random() * (height || window.innerHeight);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.3 ? '#f0b90b' : '#38ef7d';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect nearby particles with subtle faint lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#f0b90b';
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

  /*=============== NAV MENU MOBILE TOGGLE ===============*/
  const headerToggle = document.getElementById('header-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (headerToggle && navMenu) {
    headerToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = headerToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.replace('bx-menu', 'bx-x');
      } else {
        icon.classList.replace('bx-x', 'bx-menu');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = headerToggle.querySelector('i');
        if (icon) icon.classList.replace('bx-x', 'bx-menu');
      });
    });
  }

  /*=============== ACTIVE LINK SCROLL SPY ===============*/
  const sections = document.querySelectorAll('section[id]');
  const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

      if (sectionsClass) {
        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
          sectionsClass.classList.add('active-link');
        } else {
          sectionsClass.classList.remove('active-link');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActive);

  /*=============== CUSTOM GLOWING CURSOR ===============*/
  const cursorDot = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');

  if (cursorDot && cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth lagging glow follower
    const renderGlow = () => {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;

      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;

      requestAnimationFrame(renderGlow);
    };
    renderGlow();
  }

  /*=============== GLASS CARD SPOTLIGHT EFFECT ===============*/
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /*=============== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ===============*/
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /*=============== ANIMATED STAT COUNTER ===============*/
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const countUp = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const step = Math.ceil(target / (duration / 20));
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (stat.textContent.includes('%')) {
          stat.textContent = `${current}%`;
        } else {
          stat.textContent = `${current}+`;
        }
      }, 20);
    });
  };

  const statsSection = document.querySelector('.about__stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        countUp();
        counted = true;
      }
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  }

  /*=============== MODALS LOGIC ===============*/

  // Schedule Call Modal
  const scheduleModal = document.getElementById('schedule-modal');
  const openScheduleBtn = document.getElementById('open-schedule-btn');
  const closeScheduleBtn = document.getElementById('close-schedule-modal');
  const scheduleOverlay = document.getElementById('schedule-overlay');
  const scheduleForm = document.getElementById('schedule-form');

  if (scheduleModal && openScheduleBtn) {
    openScheduleBtn.addEventListener('click', () => {
      scheduleModal.classList.add('active');
    });

    const closeSchedule = () => scheduleModal.classList.remove('active');
    if (closeScheduleBtn) closeScheduleBtn.addEventListener('click', closeSchedule);
    if (scheduleOverlay) scheduleOverlay.addEventListener('click', closeSchedule);

    if (scheduleForm) {
      scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        closeSchedule();
        scheduleForm.reset();
        showToast('Call request submitted! Karibasu will get back to you shortly.');
      });
    }
  }

  // Resume Modal
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const resumeOverlay = document.getElementById('resume-overlay');
  const printResumeBtn = document.getElementById('print-resume-btn');

  if (resumeModal && openResumeBtn) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });

    const closeResume = () => resumeModal.classList.remove('active');
    if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
    if (resumeOverlay) resumeOverlay.addEventListener('click', closeResume);

    if (printResumeBtn) {
      printResumeBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  /*=============== CONTACT FORM SUBMISSION (Web3Forms API) ===============*/
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnContent = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>Sending...</span> <i class="bx bx-loader-alt bx-spin"></i>';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          contactForm.reset();
          showToast('Thank you! Your message has been sent successfully.');
        } else {
          showToast(result.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        showToast('Network error! Please check your connection and try again.');
      } finally {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
      }
    });
  }

  /*=============== TOAST NOTIFICATION ===============*/
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

});
