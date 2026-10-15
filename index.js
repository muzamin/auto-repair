/**
 * VoltEdge Auto Electrical Repair Shop
 * Main Application Logic (index.js)
 * Features:
 * - Dark & Light Mode Theme Toggle with Persistence
 * - RTL / LTR Directional Layout Switcher
 * - Interactive SOH & Voltage Diagnostic Simulation Station
 * - Dynamic Modals (Login with eye-toggle & social login, Coming Soon, 404)
 * - Service & Pricing Pre-fill with Smooth Auto-Scroll
 * - Functional Diagnostic Enquiry Form Submission with Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileNavigation();
  initSmoothScrollAndActiveNav();
  initDiagnosticSimulator();
  initModals();
  initEnquiryForm();
  initServiceAndPlanButtons();
});

/* ==========================================================================
   1. Theme Toggle (Light & Dark Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('voltedge_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
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
   3. Mobile Navigation & Dropdown
   ========================================================================== */
function initMobileNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link:not(.has-dropdown > .nav-link)');
  const homeDropdown = document.getElementById('nav-home-dropdown');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('open');
        }
      });
    });

    // Home 2 link now navigates directly to Home 2.html
    const home2Link = document.getElementById('nav-home2-link');
    if (home2Link) {
      home2Link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('open');
        }
      });
    }
  }
}

/* ==========================================================================
   4. Smooth Scrolling & Active Navigation Indicator
   ========================================================================== */
function initSmoothScrollAndActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. Interactive Battery Health & Voltage Diagnostic Station
   ========================================================================== */
function initDiagnosticSimulator() {
  const runCalcBtn = document.getElementById('run-diagnostic-calc');
  const reserveBtn = document.getElementById('diag-reserve-btn');
  const symptomChips = document.querySelectorAll('#symptom-chips .chip');
  const vehicleTypeSelect = document.getElementById('diag-vehicle-type');
  const batteryAgeSelect = document.getElementById('diag-battery-age');

  // Result Elements
  const gaugeArc = document.getElementById('gauge-arc');
  const gaugePercentDisplay = document.getElementById('gauge-percent-display');
  const gaugeBadge = document.getElementById('gauge-badge');
  const telemetryVolts = document.getElementById('telemetry-volts');
  const telemetryDrop = document.getElementById('telemetry-drop');
  const telemetryCharging = document.getElementById('telemetry-charging');
  const verdictTitle = document.getElementById('verdict-title');
  const verdictDesc = document.getElementById('verdict-desc');

  let activeSymptom = 'crank';

  // Symptom chip selection
  symptomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      symptomChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeSymptom = chip.getAttribute('data-symptom');
      calculateDiagnostics();
    });
  });

  if (runCalcBtn) {
    runCalcBtn.addEventListener('click', (e) => {
      e.preventDefault();
      calculateDiagnostics();
      showToast('Diagnostic scan refreshed with updated telemetry');
    });
  }

  // Pre-fill and scroll to contact form from verdict
  if (reserveBtn) {
    reserveBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact-us');
      const serviceSelect = document.getElementById('contact-service');
      const notesField = document.getElementById('contact-message');

      if (serviceSelect) {
        serviceSelect.value = 'battery';
      }
      if (notesField) {
        const vType = vehicleTypeSelect ? vehicleTypeSelect.options[vehicleTypeSelect.selectedIndex].text : '';
        notesField.value = `Diagnostic Simulation Result: ${gaugePercentDisplay.textContent} SOH. Vehicle: ${vType}. Symptom: ${activeSymptom.toUpperCase()}. Requesting In-Bay Diagnostic Verification.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById('contact-name')?.focus();
        }, 600);
      }
    });
  }

  function calculateDiagnostics() {
    const age = parseInt(batteryAgeSelect?.value || '3', 10);
    const vehicle = vehicleTypeSelect?.value || 'sedan';

    // Baseline calculation logic
    let estimatedSOH = 88 - (age * 12);
    let volts = 12.6 - (age * 0.15);
    let drop = 10.2 - (age * 0.25);
    let chargingStatus = 'Normal Regulated 14.2V';
    let statusText = 'Attention Needed';
    let badgeClass = 'badge-warning';
    let title = '';
    let description = '';

    switch (activeSymptom) {
      case 'crank':
        estimatedSOH -= 14;
        volts -= 0.3;
        drop = 8.9;
        title = 'Substantial Cell Degradation & Cranking Voltage Sag';
        description = 'The internal resistance of the battery lead plates has elevated, preventing sufficient cold cranking amperage (CCA) delivery to the starter motor.';
        break;

      case 'flicker':
        estimatedSOH -= 10;
        chargingStatus = 'Alternator Diode Ripple Warning (>0.12V AC)';
        title = 'Alternator Rectifier / Voltage Regulator Instability';
        description = 'Flickering instruments indicate alternating current (AC) ripple leaking through the alternator diode pack, which degrades sensitive vehicle ECUs and undercharges the battery.';
        break;

      case 'warning':
        estimatedSOH -= 18;
        volts -= 0.45;
        chargingStatus = 'Charging System Fault Code Stored';
        title = 'BMS Charging Inhibit / Smart Alternator Fault';
        description = 'The Battery Monitoring System (BMS) has flagged an active charging anomaly or thermal runaway threshold. Immediate bench scope analysis advised.';
        break;

      case 'drain':
        estimatedSOH -= 8;
        volts = 11.65;
        chargingStatus = 'Parasitic Draw Exceeding 120mA';
        title = 'Micro-Circuit Parasitic Battery Drain Detected';
        description = 'A control module (BCM, infotainment, or door latch sensor) is remaining awake after ignition-off, slowly depleting the battery overnight.';
        break;

      case 'click':
        estimatedSOH -= 30;
        volts = 10.9;
        drop = 6.4;
        title = 'Critical Battery Discharge / Solenoid Starvation';
        description = 'Voltage is insufficient to hold the starter solenoid pull-in coil. Immediate jump-start may cause alternator overload; full battery replacement is strongly advised.';
        break;
    }

    if (vehicle === 'euro') {
      estimatedSOH -= 4; // Higher electronic load
    } else if (vehicle === 'suv') {
      estimatedSOH += 2;
    }

    // Clamp values
    estimatedSOH = Math.max(18, Math.min(96, Math.round(estimatedSOH)));
    volts = Math.max(10.5, Math.min(12.8, parseFloat(volts.toFixed(2))));
    drop = Math.max(6.2, Math.min(10.5, parseFloat(drop.toFixed(1))));

    // Determine badge and color
    if (estimatedSOH >= 75) {
      statusText = 'Healthy Capacity';
      badgeClass = 'badge-optimal';
      gaugeArc.style.stroke = '#10B981';
    } else if (estimatedSOH >= 45) {
      statusText = 'Attention Needed';
      badgeClass = 'badge-warning';
      gaugeArc.style.stroke = '#C8A45D';
    } else {
      statusText = 'Critical Failure';
      badgeClass = 'badge-critical';
      gaugeArc.style.stroke = '#EF4444';
    }

    // Animate Gauge Arc (stroke-dasharray is 251.2 for the semi-circle)
    // 100% corresponds to 0 offset, 0% corresponds to 251.2 offset
    const maxOffset = 251.2;
    const targetOffset = maxOffset - (maxOffset * (estimatedSOH / 100));
    gaugeArc.style.strokeDashoffset = targetOffset;

    // Animate Text Display
    animateCounter(gaugePercentDisplay, estimatedSOH, '%');

    // Update Telemetry Elements
    if (gaugeBadge) {
      gaugeBadge.className = `gauge-status-badge ${badgeClass}`;
      gaugeBadge.textContent = statusText;
    }

    if (telemetryVolts) {
      telemetryVolts.textContent = `${volts} V (${volts >= 12.4 ? 'Sufficient Charge' : 'Depleted Charge'})`;
    }

    if (telemetryDrop) {
      telemetryDrop.textContent = `< ${drop} V (${drop < 9.5 ? 'Severe Voltage Sag' : 'Normal Crank Sag'})`;
      telemetryDrop.className = drop < 9.5 ? 't-val text-alert' : 't-val highlight-green';
    }

    if (telemetryCharging) {
      telemetryCharging.textContent = chargingStatus;
    }

    if (verdictTitle) verdictTitle.textContent = title;
    if (verdictDesc) verdictDesc.textContent = description;
  }

  function animateCounter(element, target, suffix = '') {
    if (!element) return;
    let current = parseInt(element.textContent, 10) || 0;
    const step = target > current ? 1 : -1;
    const timer = setInterval(() => {
      current += step;
      element.textContent = `${current}${suffix}`;
      if (current === target) {
        clearInterval(timer);
      }
    }, 15);
  }

  // Initial calculation run
  calculateDiagnostics();
}

/* ==========================================================================
   6. Modals Management (Login, Coming Soon, 404)
   ========================================================================== */
function initModals() {
  const loginModal = document.getElementById('login-modal');
  const generalModal = document.getElementById('general-modal');

  // Trigger buttons for login
  const headerLoginBtn = document.getElementById('header-login-btn');
  const closeLoginBtn = document.getElementById('close-login-modal');
  const closeGeneralBtn = document.getElementById('close-general-modal');
  const generalOkBtn = document.getElementById('general-modal-ok-btn');

  if (headerLoginBtn) {
    headerLoginBtn.addEventListener('click', () => openModal(loginModal));
  }

  if (closeLoginBtn) {
    closeLoginBtn.addEventListener('click', () => closeModal(loginModal));
  }

  if (closeGeneralBtn) {
    closeGeneralBtn.addEventListener('click', () => closeModal(generalModal));
  }

  if (generalOkBtn) {
    generalOkBtn.addEventListener('click', () => closeModal(generalModal));
  }

  // Password visibility eye toggle per Guideline 8
  const togglePassBtn = document.getElementById('toggle-password-visibility');
  const passInput = document.getElementById('login-password');

  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      togglePassBtn.style.color = isPassword ? 'var(--color-primary)' : 'var(--text-muted)';
    });
  }

  // Login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;
      closeModal(loginModal);
      showToast(`Welcome back, ${email || 'Client'}! Portal session active.`);
      loginForm.reset();
    });
  }

  // Social sign-in buttons
  const googleBtn = document.getElementById('btn-google-login');
  const appleBtn = document.getElementById('btn-apple-login');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      closeModal(loginModal);
      showToast('Authenticated via Google OAuth2');
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      closeModal(loginModal);
      showToast('Authenticated via Apple ID');
    });
  }

  // Handle Footer Additional Links (Coming Soon, 404, etc.)
  const modalLinks = document.querySelectorAll('.modal-trigger-link');
  modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalType = link.getAttribute('data-modal');
      if (modalType === 'login') {
        openModal(loginModal);
      } else if (modalType === 'coming-soon') {
        openGeneralModal(
          'Coming Soon: Dedicated Customer Bay Live Feed',
          'We are integrating real-time camera streams for workshop bays and battery load live logs. Scheduled launch: Next sprint.',
          '🚀'
        );
      } else if (modalType === 'not-found') {
        openGeneralModal(
          '404 Error: Component Not Located',
          'The requested circuit diagram or diagnostic telemetry token does not exist on this node. Please verify your URL or return to Home.',
          '⚠️'
        );
      }
    });
  });

  // Close when clicking overlay backdrop
  [loginModal, generalModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(loginModal);
      closeModal(generalModal);
    }
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openGeneralModal(title, message, icon = '⚡') {
  const generalModal = document.getElementById('general-modal');
  const heading = document.getElementById('general-modal-heading');
  const desc = document.getElementById('general-modal-message');
  const iconBadge = document.getElementById('general-modal-icon');

  if (heading) heading.textContent = title;
  if (desc) desc.textContent = message;
  if (iconBadge) iconBadge.textContent = icon;

  openModal(generalModal);
}

/* ==========================================================================
   7. Functional Enquiry & Appointment Booking Form
   ========================================================================== */
function initEnquiryForm() {
  const form = document.getElementById('contact-enquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Client';
      const vehicle = document.getElementById('contact-vehicle')?.value || 'Vehicle';
      const service = document.getElementById('contact-service')?.value || 'Diagnostics';

      showToast(`Thank you, ${name}! Bay appointment requested for ${vehicle}. Dispatch confirmed.`);
      form.reset();
    });
  }
}

/* ==========================================================================
   8. Service & Pricing Plan Pre-Fill Handlers
   ========================================================================== */
function initServiceAndPlanButtons() {
  const headerBookBtn = document.getElementById('header-book-btn');
  const heroBookBtn = document.getElementById('hero-book-btn');
  const ctaBookBtn = document.getElementById('cta-book-btn');
  const serviceEnquireBtns = document.querySelectorAll('.service-enquire-btn');
  const bookPlanBtns = document.querySelectorAll('.book-plan-btn');

  const contactSection = document.getElementById('contact-us');
  const serviceSelect = document.getElementById('contact-service');
  const messageArea = document.getElementById('contact-message');

  function scrollToEnquiry(serviceCategory, customNote) {
    if (serviceSelect && serviceCategory) {
      serviceSelect.value = serviceCategory;
    }
    if (messageArea && customNote) {
      messageArea.value = customNote;
    }
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById('contact-name')?.focus();
      }, 600);
    }
  }

  if (headerBookBtn) {
    headerBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.openClientBookingModal === 'function') {
        window.openClientBookingModal();
      } else {
        const bookingModal = document.getElementById('booking-service-modal');
        if (bookingModal) {
          bookingModal.classList.add('active');
          bookingModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  }

  if (heroBookBtn) {
    heroBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.openClientBookingModal === 'function') {
        window.openClientBookingModal('Diagnostics');
      } else {
        scrollToEnquiry('diagnostics', 'Hero CTA: Requesting priority computerized diagnostic scan.');
      }
    });
  }

  if (ctaBookBtn) {
    ctaBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.openClientBookingModal === 'function') {
        window.openClientBookingModal('Battery');
      } else {
        scrollToEnquiry('battery', 'Emergency / Express Bay Reservation requested via CTA banner.');
      }
    });
  }

  serviceEnquireBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service') || 'Auto Electrical';
      let category = 'other';
      if (serviceName.includes('Battery')) category = 'battery';
      else if (serviceName.includes('Diagnostics')) category = 'diagnostics';
      else if (serviceName.includes('Alternator')) category = 'alternator';

      scrollToEnquiry(category, `Inquiring about ${serviceName}. Please provide slot availability and estimate.`);
    });
  });

  bookPlanBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan') || 'Service Plan';
      scrollToEnquiry('diagnostics', `Selected Package: ${planName}. Please schedule an in-bay diagnostic inspection.`);
    });
  });
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('active');

    if (window.toastTimeout) {
      clearTimeout(window.toastTimeout);
    }

    window.toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }
}
