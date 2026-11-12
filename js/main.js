/**
 * Peacock Shine Private Limited - Corporate Consulting JavaScript & Motion Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Current Year
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

  // 2. Sticky Navbar Blur & Shadow on Scroll
  const navbar = document.querySelector('.navbar-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // 4. Interactive Tabs (for Solutions / Services)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.add('hidden'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });

  // 5. Contact Form Submission & Toast Notification
  const contactForm = document.getElementById('peacockContactForm');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message, isSuccess = true) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.style.borderLeftColor = isSuccess ? '#0D9488' : '#EF4444';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields.', false);
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Inquiry';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Transmitting to Peacock Shine...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        showToast('Thank you! Your inquiry has been received. Our corporate team will reach out shortly.');
        contactForm.reset();
      }, 900);
    });
  }

  // 6. Active Page Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // =========================================================================
  // MOTION GRAPHICS & ADVANCED UI INTERACTIVITY (UI/UX PRO MAX)
  // =========================================================================

  // A. Check for Reduced Motion Preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // B. Ambient Interactive Hero Mesh Canvas
  const canvas = document.getElementById('heroMeshCanvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 140 };

    function resizeCanvas() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 1;
        this.color = Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(20, 184, 166, ';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Gentle Mouse Interaction
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '0.75)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.floor((width * height) / 18000);
      const count = Math.min(Math.max(particleCount, 25), 65);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    }

    // Pause animation when hero leaves viewport to save battery & CPU
    const heroSection = canvas.closest('section');
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!animationFrameId) animate();
          } else {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        });
      }, { threshold: 0.05 });
      heroObserver.observe(heroSection);
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animate();
  }

  // C. Kinetic Capability Rotator (Hero Title)
  const capabilityRotator = document.getElementById('capabilityRotator');
  if (capabilityRotator && !prefersReducedMotion) {
    const capabilities = [
      'Technology Solutions',
      'Enterprise ERP Platforms',
      'Cloud Modernization',
      'Mobile Architectures',
      'Infrastructure Engineering',
      'Strategic Consulting'
    ];
    let currentIndex = 0;

    setInterval(() => {
      capabilityRotator.classList.add('slide-out');
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % capabilities.length;
        capabilityRotator.textContent = capabilities[currentIndex];
        capabilityRotator.classList.remove('slide-out');
        capabilityRotator.classList.add('slide-in');
        setTimeout(() => {
          capabilityRotator.classList.remove('slide-in');
        }, 450);
      }, 450);
    }, 3200);
  }

  // D. Animated Number Counters (0 to Target Metric)
  const counterElements = document.querySelectorAll('.counter-value');
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-Out Cubic curve
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOutProgress;

            el.textContent = currentVal.toFixed(decimals) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target.toFixed(decimals) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.35 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // E. Card Cursor Spotlight / Border Glow Tracking
  const spotlightCards = document.querySelectorAll('.corporate-card, .stat-box');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  });

  // F. Staggered Scroll-Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    if (prefersReducedMotion) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
    } else {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealElements.forEach(el => revealObserver.observe(el));
    }
  }

  // G. Corporate FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');
    if (header && body) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBody = otherItem.querySelector('.faq-body');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          body.style.maxHeight = null;
        } else {
          item.classList.add('active');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    }
  });
});
