/**
 * Peacock Shine Private Limited - High-End Corporate Consulting & 3D Motion Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Current Year
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

  // 2. Sticky Navbar with Blur & Shadow
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
  // HIGH-END 3D CYBER-GLOBE & MOTION GRAPHICS (UI/UX PRO MAX)
  // =========================================================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // A. Interactive 3D Enterprise Cyber-Globe on Canvas
  const globeCanvas = document.getElementById('heroGlobeCanvas');
  if (globeCanvas && !prefersReducedMotion) {
    const ctx = globeCanvas.getContext('2d');
    let width, height, globeRadius;
    let animId;

    // Rotation angles and inertia
    let rotX = 0.25;
    let rotY = 0.4;
    let targetRotX = rotX;
    let targetRotY = rotY;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // Hubs (lat/long) for international enterprise points
    const hubs = [
      { name: 'Mysore/HQ', lat: 12.11, lon: 76.67, color: '#38BDF8', size: 5, pulse: true },
      { name: 'Bangalore', lat: 12.97, lon: 77.59, color: '#2DD4BF', size: 4 },
      { name: 'New York', lat: 40.71, lon: -74.00, color: '#38BDF8', size: 4.5 },
      { name: 'London', lat: 51.50, lon: -0.12, color: '#38BDF8', size: 4 },
      { name: 'Frankfurt', lat: 50.11, lon: 8.68, color: '#2DD4BF', size: 4 },
      { name: 'Singapore', lat: 1.35, lon: 103.81, color: '#38BDF8', size: 4 },
      { name: 'Tokyo', lat: 35.67, lon: 139.65, color: '#38BDF8', size: 4 }
    ];

    // Connection Arcs between hubs
    const connections = [
      [0, 2], // Mysore -> New York
      [0, 3], // Mysore -> London
      [0, 4], // Mysore -> Frankfurt
      [0, 5], // Mysore -> Singapore
      [5, 6], // Singapore -> Tokyo
      [2, 3]  // NY -> London
    ];

    // Sphere grid dots
    let dots = [];
    function generateSphereDots() {
      dots = [];
      const latStep = 14;
      const lonStep = 18;
      for (let lat = -80; lat <= 80; lat += latStep) {
        const phi = (90 - lat) * (Math.PI / 180);
        const r = Math.sin(phi);
        const y = Math.cos(phi);
        for (let lon = -180; lon < 180; lon += lonStep) {
          const theta = lon * (Math.PI / 180);
          dots.push({
            x: r * Math.sin(theta),
            y: y,
            z: r * Math.cos(theta)
          });
        }
      }
    }

    function resizeGlobe() {
      const container = globeCanvas.parentElement;
      width = globeCanvas.width = container.offsetWidth;
      height = globeCanvas.height = container.offsetHeight || 420;
      globeRadius = Math.min(width, height) * 0.38;
      generateSphereDots();
    }

    function latLonToVector(lat, lon) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = lon * (Math.PI / 180);
      return {
        x: Math.sin(phi) * Math.sin(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.cos(theta)
      };
    }

    function rotatePoint(p, rx, ry) {
      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y1 = p.y * cosX - p.z * sinX;
      const z1 = p.y * sinX + p.z * cosX;

      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x2 = p.x * cosY + z1 * sinY;
      const z2 = -p.x * sinY + z1 * cosY;

      return { x: x2, y: y1, z: z2 };
    }

    let pulseTime = 0;

    function renderGlobe() {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation when not dragging
      if (!isDragging) {
        targetRotY += 0.004;
      }
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;
      pulseTime += 0.04;

      const cx = width / 2;
      const cy = height / 2;

      // Ambient outer sphere glow
      const glowGrad = ctx.createRadialGradient(cx, cy, globeRadius * 0.7, cx, cy, globeRadius * 1.3);
      glowGrad.addColorStop(0, 'rgba(14, 165, 233, 0.08)');
      glowGrad.addColorStop(0.5, 'rgba(13, 148, 136, 0.04)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Outer boundary ring
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Draw Grid Dots
      dots.forEach(dot => {
        const p = rotatePoint(dot, rotX, rotY);
        // Only draw front hemisphere for clean depth
        if (p.z > -0.15) {
          const depth = (p.z + 1) / 2; // 0 to 1
          const px = cx + p.x * globeRadius;
          const py = cy - p.y * globeRadius;
          const size = Math.max(0.6, depth * 1.8);
          const alpha = Math.max(0.08, depth * 0.65);

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.fill();
        }
      });

      // Transformed hub positions
      const transformedHubs = hubs.map(hub => {
        const v = latLonToVector(hub.lat, hub.lon);
        const p = rotatePoint(v, rotX, rotY);
        return {
          ...hub,
          p: p,
          px: cx + p.x * globeRadius,
          py: cy - p.y * globeRadius,
          visible: p.z > -0.1
        };
      });

      // Draw Arcs between hubs
      connections.forEach(([i, j]) => {
        const h1 = transformedHubs[i];
        const h2 = transformedHubs[j];
        if (h1.visible || h2.visible) {
          ctx.beginPath();
          ctx.moveTo(h1.px, h1.py);
          
          // Mid-point curve lifted outward from sphere surface
          const midX = (h1.p.x + h2.p.x) / 2;
          const midY = (h1.p.y + h2.p.y) / 2;
          const midZ = (h1.p.z + h2.p.z) / 2;
          const len = Math.sqrt(midX * midX + midY * midY + midZ * midZ) || 1;
          const lift = 1.28;
          const cpX = cx + (midX / len) * globeRadius * lift;
          const cpY = cy - (midY / len) * globeRadius * lift;

          ctx.quadraticCurveTo(cpX, cpY, h2.px, h2.py);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Traveling data pulse particle along curve
          const t = (pulseTime * 0.6 + (i * 0.3)) % 1;
          const oneMinusT = 1 - t;
          const bx = oneMinusT * oneMinusT * h1.px + 2 * oneMinusT * t * cpX + t * t * h2.px;
          const by = oneMinusT * oneMinusT * h1.py + 2 * oneMinusT * t * cpY + t * t * h2.py;

          ctx.beginPath();
          ctx.arc(bx, by, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.shadowColor = '#F59E0B';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Draw Hubs with pulsing telemetry beacons
      transformedHubs.forEach(hub => {
        if (hub.visible) {
          const depth = (hub.p.z + 1) / 2;
          
          // Outer pulse ring
          if (hub.pulse) {
            const wave = (Math.sin(pulseTime * 2.5) + 1) / 2;
            ctx.beginPath();
            ctx.arc(hub.px, hub.py, hub.size * 2 + wave * 6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.7 - wave * 0.6})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }

          // Hub Core Dot
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, hub.size * depth, 0, Math.PI * 2);
          ctx.fillStyle = hub.color;
          ctx.shadowColor = hub.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Hub Label for HQ
          if (hub.name.includes('HQ')) {
            ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText('● Mysore HQ', hub.px + 9, hub.py + 3);
          }
        }
      });

      animId = requestAnimationFrame(renderGlobe);
    }

    // Drag / Touch Controls
    globeCanvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        targetRotY += dx * 0.006;
        targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX + dy * 0.006));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });

    // Touch handlers for mobile
    globeCanvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevMouseX;
        const dy = e.touches[0].clientY - prevMouseY;
        targetRotY += dx * 0.007;
        targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX + dy * 0.007));
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    // IntersectionObserver to pause rendering when off-screen
    const heroSection = globeCanvas.closest('section');
    if (heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!animId) renderGlobe();
          } else {
            cancelAnimationFrame(animId);
            animId = null;
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

    window.addEventListener('resize', resizeGlobe, { passive: true });
    resizeGlobe();
    renderGlobe();
  }

  // B. Kinetic Capability Rotator (Hero Title)
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

  // C. Animated Number Counters (0 to Target Metric)
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

  // D. 3D Perspective Card Tilt Physics
  const tiltCards = document.querySelectorAll('.card-3d');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // E. Staggered Scroll-Reveal Observer
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

  // F. Corporate FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');
    if (header && body) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBody = otherItem.querySelector('.faq-body');
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

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

  // G. Live Telemetry Simulators (Pulse updates)
  const pingLatencyEl = document.getElementById('liveLatencyPing');
  if (pingLatencyEl) {
    setInterval(() => {
      const randomPing = Math.floor(Math.random() * 5) + 11;
      pingLatencyEl.textContent = `${randomPing}ms`;
    }, 2800);
  }
});
