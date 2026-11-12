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

  // A. Interactive 3D Enterprise Cyber-Globe on Canvas (Ultra-Detailed Geodesic Edition)
  const globeCanvas = document.getElementById('heroGlobeCanvas');
  if (globeCanvas && !prefersReducedMotion) {
    const ctx = globeCanvas.getContext('2d');
    let width, height, globeRadius;
    let animId;

    // Rotation angles, velocity, and touch/mouse inertia
    let rotX = 0.22;
    let rotY = 0.45;
    let targetRotX = rotX;
    let targetRotY = rotY;
    let velX = 0;
    let velY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // Global delivery hubs with real-world geographical coordinates
    const hubs = [
      { name: 'Mysore HQ', lat: 12.11, lon: 76.67, color: '#38BDF8', size: 6, pulse: true, isHQ: true },
      { name: 'Bangalore', lat: 12.97, lon: 77.59, color: '#2DD4BF', size: 4.2 },
      { name: 'Singapore', lat: 1.35, lon: 103.81, color: '#38BDF8', size: 4.2 },
      { name: 'Tokyo', lat: 35.67, lon: 139.65, color: '#38BDF8', size: 4.2 },
      { name: 'Dubai', lat: 25.20, lon: 55.27, color: '#2DD4BF', size: 4.5 },
      { name: 'Frankfurt', lat: 50.11, lon: 8.68, color: '#2DD4BF', size: 4.2 },
      { name: 'London', lat: 51.50, lon: -0.12, color: '#38BDF8', size: 4.5 },
      { name: 'New York', lat: 40.71, lon: -74.00, color: '#38BDF8', size: 4.8 },
      { name: 'San Francisco', lat: 37.77, lon: -122.41, color: '#2DD4BF', size: 4.2 },
      { name: 'Sydney', lat: -33.86, lon: 151.20, color: '#38BDF8', size: 4.2 }
    ];

    // High-capacity enterprise telecommunication trunk lines
    const connections = [
      [0, 1], // Mysore -> Bangalore
      [1, 2], // Bangalore -> Singapore
      [2, 3], // Singapore -> Tokyo
      [2, 9], // Singapore -> Sydney
      [0, 4], // Mysore -> Dubai
      [4, 5], // Dubai -> Frankfurt
      [5, 6], // Frankfurt -> London
      [6, 7], // London -> New York
      [7, 8], // New York -> San Francisco
      [8, 3], // San Francisco -> Tokyo
      [0, 6]  // Mysore -> London
    ];

    // Dense Geodesic Lattice Dots
    let dots = [];
    function generateSphereDots() {
      dots = [];
      const latStep = 9;   // High-density latitude spacing
      const lonStep = 11;  // High-density longitude spacing
      for (let lat = -81; lat <= 81; lat += latStep) {
        const phi = (90 - lat) * (Math.PI / 180);
        const r = Math.sin(phi);
        const y = Math.cos(phi);
        for (let lon = -180; lon < 180; lon += lonStep) {
          const theta = lon * (Math.PI / 180);
          dots.push({
            x: r * Math.sin(theta),
            y: y,
            z: r * Math.cos(theta),
            lat: lat
          });
        }
      }
    }

    // Latitude Wireframe Rings (Equator, Tropics, Arctic/Antarctic)
    const ringLats = [0, 23.5, -23.5, 48, -48];
    let ringSegments = [];
    function generateRings() {
      ringSegments = ringLats.map(lat => {
        const phi = (90 - lat) * (Math.PI / 180);
        const r = Math.sin(phi);
        const y = Math.cos(phi);
        const pts = [];
        const numPts = 48;
        for (let i = 0; i <= numPts; i++) {
          const theta = (i / numPts) * Math.PI * 2;
          pts.push({
            x: r * Math.sin(theta),
            y: y,
            z: r * Math.cos(theta)
          });
        }
        return { lat, pts, isEquator: lat === 0 };
      });
    }

    function resizeGlobe() {
      const container = globeCanvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.offsetWidth;
      height = container.offsetHeight || 380;
      
      globeCanvas.width = width * dpr;
      globeCanvas.height = height * dpr;
      globeCanvas.style.width = width + 'px';
      globeCanvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);

      globeRadius = Math.min(width, height) * 0.38;
      generateSphereDots();
      generateRings();
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
      // Rotate around X axis
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y1 = p.y * cosX - p.z * sinX;
      const z1 = p.y * sinX + p.z * cosX;

      // Rotate around Y axis
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x2 = p.x * cosY + z1 * sinY;
      const z2 = -p.x * sinY + z1 * cosY;

      return { x: x2, y: y1, z: z2 };
    }

    let pulseTime = 0;

    function renderGlobe() {
      ctx.clearRect(0, 0, width, height);

      // Smooth inertia & auto-rotation
      if (!isDragging) {
        velX *= 0.92;
        velY *= 0.92;
        targetRotY += 0.0035 + velY;
        targetRotX += velX;
      }
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;
      pulseTime += 0.038;

      const cx = width / 2;
      const cy = height / 2;

      // 1. Deep Atmospheric Radial Aura
      const haloGrad = ctx.createRadialGradient(cx, cy, globeRadius * 0.4, cx, cy, globeRadius * 1.35);
      haloGrad.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
      haloGrad.addColorStop(0.65, 'rgba(13, 148, 136, 0.06)');
      haloGrad.addColorStop(0.95, 'rgba(2, 132, 199, 0.02)');
      haloGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Outer Atmospheric Glow Limb
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // 3. Draw Back Dots (Holographic 3D Internal Volume)
      dots.forEach(dot => {
        const p = rotatePoint(dot, rotX, rotY);
        if (p.z <= 0) {
          const px = cx + p.x * globeRadius;
          const py = cy - p.y * globeRadius;
          ctx.beginPath();
          ctx.arc(px, py, 0.65, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
          ctx.fill();
        }
      });

      // 4. Draw Latitude Reference Wireframe Rings
      ringSegments.forEach(ring => {
        ctx.beginPath();
        let started = false;
        ring.pts.forEach(pt => {
          const p = rotatePoint(pt, rotX, rotY);
          const px = cx + p.x * globeRadius;
          const py = cy - p.y * globeRadius;
          if (p.z > -0.05) {
            if (!started) {
              ctx.moveTo(px, py);
              started = true;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            started = false;
          }
        });
        ctx.strokeStyle = ring.isEquator ? 'rgba(45, 212, 191, 0.35)' : 'rgba(56, 189, 248, 0.16)';
        ctx.lineWidth = ring.isEquator ? 1.2 : 0.8;
        if (!ring.isEquator) ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash
      });

      // 5. Inclined Orbital Track with Orbiting Telemetry Satellite
      const orbitTilt = 0.45; // ~26 degree orbital incline
      const orbitR = globeRadius * 1.32;
      const numOrbitPts = 64;
      ctx.beginPath();
      for (let i = 0; i <= numOrbitPts; i++) {
        const ang = (i / numOrbitPts) * Math.PI * 2;
        const ox = Math.cos(ang) * orbitR;
        const oy = Math.sin(ang) * orbitR * Math.sin(orbitTilt);
        const oz = Math.sin(ang) * orbitR * Math.cos(orbitTilt);
        const p = rotatePoint({ x: ox / globeRadius, y: oy / globeRadius, z: oz / globeRadius }, rotX, rotY);
        const px = cx + p.x * globeRadius;
        const py = cy - p.y * globeRadius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Orbiting Satellite Node along path
      const satAng = pulseTime * 0.55;
      const satOx = Math.cos(satAng) * orbitR;
      const satOy = Math.sin(satAng) * orbitR * Math.sin(orbitTilt);
      const satOz = Math.sin(satAng) * orbitR * Math.cos(orbitTilt);
      const satP = rotatePoint({ x: satOx / globeRadius, y: satOy / globeRadius, z: satOz / globeRadius }, rotX, rotY);
      const satPx = cx + satP.x * globeRadius;
      const satPy = cy - satP.y * globeRadius;

      // Draw Satellite Beacon & Signal Crosshair
      ctx.beginPath();
      ctx.arc(satPx, satPy, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Satellite Crosshairs
      ctx.beginPath();
      ctx.moveTo(satPx - 6, satPy);
      ctx.lineTo(satPx + 6, satPy);
      ctx.moveTo(satPx, satPy - 6);
      ctx.lineTo(satPx, satPy + 6);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Satellite Label
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
      ctx.fillText('SAT-COMM // 104', satPx + 8, satPy - 4);

      // 6. Draw Front Grid Dots with Dynamic Depth Gradient
      dots.forEach(dot => {
        const p = rotatePoint(dot, rotX, rotY);
        if (p.z > 0) {
          const depth = p.z; // 0 to 1
          const px = cx + p.x * globeRadius;
          const py = cy - p.y * globeRadius;
          const size = 0.8 + depth * 1.5;
          const alpha = 0.18 + depth * 0.75;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          
          if (Math.abs(dot.lat) < 16) {
            ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`;
          }
          ctx.fill();
        }
      });

      // 7. Transformed Hub Positions
      const transformedHubs = hubs.map(hub => {
        const v = latLonToVector(hub.lat, hub.lon);
        const p = rotatePoint(v, rotX, rotY);
        return {
          ...hub,
          p: p,
          px: cx + p.x * globeRadius,
          py: cy - p.y * globeRadius,
          visible: p.z > -0.05
        };
      });

      // 8. Draw Geodetic Arcs & Dual Energy Packets
      connections.forEach(([i, j]) => {
        const h1 = transformedHubs[i];
        const h2 = transformedHubs[j];
        if (h1.visible || h2.visible) {
          ctx.beginPath();
          ctx.moveTo(h1.px, h1.py);
          
          // Elevated Midpoint Curve
          const midX = (h1.p.x + h2.p.x) / 2;
          const midY = (h1.p.y + h2.p.y) / 2;
          const midZ = (h1.p.z + h2.p.z) / 2;
          const len = Math.sqrt(midX * midX + midY * midY + midZ * midZ) || 1;
          const lift = 1.30;
          const cpX = cx + (midX / len) * globeRadius * lift;
          const cpY = cy - (midY / len) * globeRadius * lift;

          ctx.quadraticCurveTo(cpX, cpY, h2.px, h2.py);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Traveling Data Packet 1 (Cyan/Teal)
          const t1 = (pulseTime * 0.52 + (i * 0.18)) % 1;
          const oneMinusT1 = 1 - t1;
          const bx1 = oneMinusT1 * oneMinusT1 * h1.px + 2 * oneMinusT1 * t1 * cpX + t1 * t1 * h2.px;
          const by1 = oneMinusT1 * oneMinusT1 * h1.py + 2 * oneMinusT1 * t1 * cpY + t1 * t1 * h2.py;

          ctx.beginPath();
          ctx.arc(bx1, by1, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = '#2DD4BF';
          ctx.shadowColor = '#2DD4BF';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Traveling Data Packet 2 (Amber/Gold offset)
          const t2 = (pulseTime * 0.52 + (i * 0.18) + 0.5) % 1;
          const oneMinusT2 = 1 - t2;
          const bx2 = oneMinusT2 * oneMinusT2 * h1.px + 2 * oneMinusT2 * t2 * cpX + t2 * t2 * h2.px;
          const by2 = oneMinusT2 * oneMinusT2 * h1.py + 2 * oneMinusT2 * t2 * cpY + t2 * t2 * h2.py;

          ctx.beginPath();
          ctx.arc(bx2, by2, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.shadowColor = '#F59E0B';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 9. Draw Hubs & Sonar Ripples
      transformedHubs.forEach(hub => {
        if (hub.visible) {
          const depth = (hub.p.z + 1) / 2;
          
          // Sonar pulse rings for HQ & Primary nodes
          if (hub.pulse) {
            const wave1 = (Math.sin(pulseTime * 2.8) + 1) / 2;
            const wave2 = (Math.sin(pulseTime * 2.8 + Math.PI) + 1) / 2;

            ctx.beginPath();
            ctx.arc(hub.px, hub.py, hub.size * 1.5 + wave1 * 10, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.8 - wave1 * 0.75})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(hub.px, hub.py, hub.size * 1.5 + wave2 * 10, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.8 - wave2 * 0.75})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }

          // Hub Core Dot
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, hub.size * (0.8 + depth * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = hub.isHQ ? '#38BDF8' : hub.color;
          ctx.shadowColor = hub.color;
          ctx.shadowBlur = hub.isHQ ? 12 : 7;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Distinctive Tag for Mysore HQ
          if (hub.isHQ) {
            ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 4;
            ctx.fillText('★ Mysore HQ', hub.px + 10, hub.py + 4);
            ctx.shadowBlur = 0;
          }
        }
      });

      animId = requestAnimationFrame(renderGlobe);
    }

    // Touch & Mouse Drag Inertia
    globeCanvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velX = 0;
      velY = 0;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        velY = dx * 0.005;
        velX = dy * 0.005;
        targetRotY += velY;
        targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX + velX));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });

    globeCanvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        velX = 0;
        velY = 0;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevMouseX;
        const dy = e.touches[0].clientY - prevMouseY;
        velY = dx * 0.006;
        velX = dy * 0.006;
        targetRotY += velY;
        targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX + velX));
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    // IntersectionObserver to pause rendering when off-screen (Zero CPU waste!)
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

  // H. Lightweight Subpage Ambient Particle Network (60 FPS, Zero CPU Waste)
  const subpageCanvases = document.querySelectorAll('.subpage-ambient-canvas');
  subpageCanvases.forEach(canvas => {
    if (prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    let width, height, animId;
    const particleCount = 34;
    const particles = [];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height || 180;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.8
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle interconnected lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${(1 - dist / 95) * 0.22})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 212, 191, 0.65)';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    }

    // Auto-pause when off-screen
    const parentSection = canvas.closest('section');
    if (parentSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!animId) render();
          } else {
            cancelAnimationFrame(animId);
            animId = null;
          }
        });
      }, { threshold: 0.05 });
      observer.observe(parentSection);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    render();
  });
});
