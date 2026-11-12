/**
 * Peacock Shine Private Limited - Corporate Consulting JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
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
  });

  // 3. Mobile Navigation Menu Toggle
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

  // 4. Interactive Tabs (for Solutions / Services deep-dive)
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
      const phone = document.getElementById('contactPhone')?.value.trim();
      const service = document.getElementById('contactService')?.value;
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields.', false);
        return;
      }

      // Simulate sending to info@peacockshine.com
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
      }, 1000);
    });
  }

  // 6. Newsletter Subscription Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('Subscribed! You will receive our quarterly corporate briefing.');
        emailInput.value = '';
      }
    });
  }

  // 7. Active Page Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
