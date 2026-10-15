/**
 * VOLTERRA Auto Electrical - Contact Page Logic (contact.js)
 * Implements:
 * - Theme Switcher (Dark & Light Mode) with Local Storage Persistence
 * - RTL / LTR Toggle with Indicator Sync
 * - Mobile Navigation Menu
 * - Contact & Diagnostic Booking Form Validation & Submission
 * - Interactive FAQ Accordion
 * - Customer Portal Login Modal with password toggle
 * - Notification Toast alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileNavigation();
  initContactForm();
  initContactFaqAccordion();
  initModals();
  initToast();
  setDefaultDate();
  initContactConciergeTerminal();
});

/* ==========================================================================
   1. Theme Toggle (Dark & Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('voltedge_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('voltedge_theme', theme);
  }
}

/* ==========================================================================
   2. RTL / LTR Toggle (Direction Switcher)
   ========================================================================== */
function initRtlToggle() {
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  const root = document.documentElement;
  const indicator = rtlToggleBtn ? rtlToggleBtn.querySelector('.rtl-text-indicator') : null;

  const savedDir = localStorage.getItem('voltedge_dir') || 'ltr';
  setDirection(savedDir);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = root.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(newDir);
      showToast(`Direction switched to ${newDir.toUpperCase()}`);
    });
  }

  function setDirection(dir) {
    root.setAttribute('dir', dir);
    localStorage.setItem('voltedge_dir', dir);
    if (indicator) {
      indicator.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      indicator.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
    }
  }
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link:not(.has-dropdown > .nav-link)');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('open');
        }
      });
    });
  }
}

/* ==========================================================================
   4. Contact Form Validation & Submission
   ========================================================================== */
function setDefaultDate() {
  const dateInput = document.getElementById('contact-date');
  if (dateInput) {
    // Set min date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
}

function initContactForm() {
  const form = document.getElementById('contact-booking-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const phoneInput = document.getElementById('contact-phone');
  const emailInput = document.getElementById('contact-email');
  const vehicleInput = document.getElementById('contact-vehicle');
  const serviceSelect = document.getElementById('contact-service-type');
  const dateInput = document.getElementById('contact-date');
  const submitBtn = document.getElementById('submit-contact-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showError('name-error', nameInput);
      isValid = false;
    } else {
      clearError('name-error', nameInput);
    }

    // Validate Phone
    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      showError('phone-error', phoneInput);
      isValid = false;
    } else {
      clearError('phone-error', phoneInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError('email-error', emailInput);
      isValid = false;
    } else {
      clearError('email-error', emailInput);
    }

    // Validate Vehicle
    if (!vehicleInput.value.trim()) {
      showError('vehicle-error', vehicleInput);
      isValid = false;
    } else {
      clearError('vehicle-error', vehicleInput);
    }

    // Validate Date
    if (!dateInput.value) {
      showError('date-error', dateInput);
      isValid = false;
    } else {
      clearError('date-error', dateInput);
    }

    if (!isValid) {
      showToast('Please correct highlighted fields before submitting.');
      return;
    }

    // Simulate submission
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting to Workshop Queue...</span>`;

    setTimeout(() => {
      const customerName = nameInput.value.trim();
      const serviceName = serviceSelect.value;
      const vehicleName = vehicleInput.value.trim();

      form.reset();
      setDefaultDate();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      showToast(`Thank you, ${customerName}! Your request for "${serviceName}" on ${vehicleName} is confirmed in our bay dispatch.`);
    }, 900);
  });

  function showError(errorId, inputElement) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.add('show');
    if (inputElement) inputElement.classList.add('error');
  }

  function clearError(errorId, inputElement) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.classList.remove('show');
    if (inputElement) inputElement.classList.remove('error');
  }
}

/* ==========================================================================
   5. FAQs Accordion Logic
   ========================================================================== */
function initContactFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   6. Modals
   ========================================================================== */
function initModals() {
  const loginModal = document.getElementById('login-modal');
  const headerLoginBtn = document.getElementById('header-login-btn');
  const closeLoginBtn = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');
  const togglePassBtn = document.getElementById('toggle-password-visibility');
  const passwordInput = document.getElementById('login-password');

  const headerBookBtn = document.getElementById('header-book-btn');
  const bookingFormSection = document.getElementById('booking-form-section');
  if (headerBookBtn && bookingFormSection) {
    headerBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      bookingFormSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (headerLoginBtn && loginModal) {
    headerLoginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
      loginModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (togglePassBtn && passwordInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
    });
  }

  if (loginForm && loginModal) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
      loginForm.reset();
      showToast('Portal login verified. Welcome to VOLTERRA!');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal) {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ==========================================================================
   7. Toast Utility
   ========================================================================== */
function initToast() {}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4500);
  }
}

/* ==========================================================================
   8. Interactive Concierge Dispatch Terminal Logic
   ========================================================================== */
function initContactConciergeTerminal() {
  const triageButtons = document.querySelectorAll('.triage-btn');
  const routingTarget = document.getElementById('triage-routing-target');
  const routingDesc = document.getElementById('triage-routing-desc');
  const claimBtn = document.getElementById('triage-claim-bay-btn');

  const triageData = {
    battery: {
      target: 'ROUTING: LAB BAY 01 • PARASITIC DRAW CELL',
      desc: 'Allocates 4-Channel PicoScope 4425A with microamp amp-clamps for millisecond sleep-cycle trace.',
      cta: 'Fast-Track Bay 01 →',
      servicePref: 'parasitic'
    },
    inverter: {
      target: 'ROUTING: HIGH-VOLTAGE BAY 02 • 800V ISOLATION BENCH',
      desc: 'Staged with Megger HV Insulation Sentry & thermal imaging for inverter/DC-DC converter validation.',
      cta: 'Fast-Track Bay 02 →',
      servicePref: 'ev-hybrid'
    },
    canbus: {
      target: 'ROUTING: PROTOCOL LAB BAY 03 • BUS TELEMETRY SUITE',
      desc: 'Synchronous differential waveform capture across dual CAN-FD and LIN busses to trap corrupted frames.',
      cta: 'Fast-Track Bay 03 →',
      servicePref: 'ecu'
    }
  };

  if (!triageButtons.length || !routingTarget || !routingDesc) return;

  triageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-triage');
      if (!triageData[type]) return;

      // Update button active state
      triageButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update terminal result panel with smooth micro-fade
      const card = document.getElementById('triage-feedback-card');
      if (card) {
        card.style.opacity = '0.35';
        card.style.transform = 'translateY(2px)';
        setTimeout(() => {
          routingTarget.textContent = triageData[type].target;
          routingDesc.textContent = triageData[type].desc;
          if (claimBtn) {
            claimBtn.innerHTML = `<span>${triageData[type].cta}</span>`;
          }
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 120);
      }

      // Pre-select service in booking form if matching option exists
      const serviceSelect = document.getElementById('service-category');
      if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.toLowerCase().includes(triageData[type].servicePref) ||
              serviceSelect.options[i].text.toLowerCase().includes(triageData[type].servicePref)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });
}

