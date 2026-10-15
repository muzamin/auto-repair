/**
 * ==========================================================================
 * VOLTERRA BATTERY & AUTO ELECTRICAL — LUXURY BOOKING CONTROLLER (book a service.js)
 * Features:
 * - Theme Controller (Dark & Light Mode) with Local Storage Persistence
 * - RTL / LTR Layout Switcher
 * - 6 Interactive Luxury Service Tiles with Bidirectional Form Sync
 * - Date Picker Constraints (Min = Today, Default = Tomorrow)
 * - URL Parameter Pre-selection (?service=... / ?priority=...)
 * - Comprehensive Form Validation with Polished Feedback
 * - Itemized Luxury Confirmation Ticket Modal
 * - Custom Toast Feedback Engine
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initDatePickerConstraints();
  initServiceTilesSelection();
  initUrlParamPreselection();
  initBookingFormSubmission();
  initModalAndToast();
});

/* ==========================================================================
   1. THEME CONTROLLER (Dark & Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('volterra_theme') || localStorage.getItem('voltedge_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('volterra_theme', theme);
    localStorage.setItem('voltedge_theme', theme);
    if (theme === 'light') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }
}

/* ==========================================================================
   2. RTL / LTR DIRECTION CONTROLLER
   ========================================================================== */
function initRtlToggle() {
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  const root = document.documentElement;
  const indicator = rtlToggleBtn ? rtlToggleBtn.querySelector('.rtl-text-indicator') : null;

  const savedDir = localStorage.getItem('volterra_dir') || localStorage.getItem('voltedge_dir') || 'ltr';
  setDirection(savedDir);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = root.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(newDir);
      showToast(`Layout switched to ${newDir.toUpperCase()}`);
    });
  }

  function setDirection(dir) {
    root.setAttribute('dir', dir);
    localStorage.setItem('volterra_dir', dir);
    localStorage.setItem('voltedge_dir', dir);
    if (indicator) {
      indicator.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      indicator.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    }
  }
}

/* ==========================================================================
   3. DATE PICKER CONSTRAINTS
   ========================================================================== */
function initDatePickerConstraints() {
  const dateInput = document.getElementById('appointment-date');
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDateStr = `${yyyy}-${mm}-${dd}`;

  dateInput.min = minDateStr;

  // Set default to tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomMm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const tomDd = String(tomorrow.getDate()).padStart(2, '0');
  dateInput.value = `${tomorrow.getFullYear()}-${tomMm}-${tomDd}`;
}

/* ==========================================================================
   4. LUXURY SERVICE TILES SELECTION
   ========================================================================== */
function initServiceTilesSelection() {
  const serviceTiles = document.querySelectorAll('.service-luxury-tile, .service-select-card');
  const serviceSelect = document.getElementById('service-select');

  serviceTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      selectServiceTile(tile);
    });

    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectServiceTile(tile);
      }
    });
  });

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      const selectedTitle = serviceSelect.value;
      serviceTiles.forEach(tile => {
        const tileTitle = (tile.getAttribute('data-service-title') || '').replace('&amp;', '&');
        if (tileTitle === selectedTitle || selectedTitle.includes(tileTitle)) {
          setActiveTile(tile);
        }
      });
    });
  }

  function selectServiceTile(tile) {
    setActiveTile(tile);

    const serviceTitle = (tile.getAttribute('data-service-title') || '').replace('&amp;', '&');
    if (serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.includes(serviceTitle) || serviceSelect.options[i].value === serviceTitle) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    const titleText = tile.querySelector('.tile-title')?.textContent?.trim() || serviceTitle;
    showToast(`Selected: ${titleText}`);
  }

  function setActiveTile(activeTile) {
    serviceTiles.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-checked', 'false');
    });

    activeTile.classList.add('active');
    activeTile.setAttribute('aria-checked', 'true');
  }
}

/* ==========================================================================
   5. URL PARAMETERS PRE-SELECTION
   ========================================================================== */
function initUrlParamPreselection() {
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service') || params.get('id');
  const priorityParam = params.get('priority');

  if (serviceParam) {
    let targetTile = null;
    const tiles = document.querySelectorAll('.service-luxury-tile, .service-select-card');

    tiles.forEach(tile => {
      const id = tile.getAttribute('data-service-id');
      const title = (tile.getAttribute('data-service-title') || '').toLowerCase();
      if (id === serviceParam || title.includes(serviceParam.toLowerCase())) {
        targetTile = tile;
      }
    });

    if (targetTile) {
      targetTile.click();
    }
  }

  if (priorityParam) {
    const radio = document.querySelector(`input[name="service_priority"][value="${priorityParam}"]`) ||
                  document.querySelector(`input[name="service_priority"][value="${capitalize(priorityParam)}"]`);
    if (radio) {
      radio.checked = true;
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

/* ==========================================================================
   6. FORM VALIDATION & CONFIRMATION SUBMISSION
   ========================================================================== */
function initBookingFormSubmission() {
  const form = document.getElementById('master-booking-form');
  const submitBtn = document.getElementById('submit-booking-btn');
  const modal = document.getElementById('submission-confirmation-modal');

  if (!form) return;

  // Real-time error dismissal on input
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const errEl = document.getElementById(`${input.id.replace('client-', '').replace('vehicle-', '').replace('appointment-', '')}-error`);
      if (errEl) errEl.classList.remove('visible');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalidElem = null;

    const requiredFields = [
      { id: 'client-name', errId: 'name-error', validate: val => val.trim().length >= 2 },
      { id: 'client-phone', errId: 'phone-error', validate: val => val.trim().length >= 7 },
      { id: 'client-email', errId: 'email-error', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
      { id: 'vehicle-make', errId: 'make-error', validate: val => val.trim().length >= 2 },
      { id: 'vehicle-model', errId: 'model-error', validate: val => val.trim().length >= 1 },
      { id: 'vehicle-year', errId: 'year-error', validate: val => Boolean(val) },
      { id: 'appointment-date', errId: 'date-error', validate: val => Boolean(val) }
    ];

    requiredFields.forEach(field => {
      const input = document.getElementById(field.id);
      const errEl = document.getElementById(field.errId);

      if (input) {
        const passes = field.validate(input.value);
        if (!passes) {
          isValid = false;
          input.classList.add('is-invalid');
          if (errEl) errEl.classList.add('visible');
          if (!firstInvalidElem) firstInvalidElem = input;
        } else {
          input.classList.remove('is-invalid');
          if (errEl) errEl.classList.remove('visible');
        }
      }
    });

    if (!isValid) {
      if (firstInvalidElem) {
        firstInvalidElem.focus();
        showToast('Please correct highlighted fields before submitting.');
      }
      return;
    }

    // Submission animation state
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    }

    // Simulate atelier workshop reception
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }

      // Populate confirmation ticket details
      const clientName = document.getElementById('client-name')?.value.trim() || 'Valued Client';
      const vehicleMake = document.getElementById('vehicle-make')?.value.trim() || '';
      const vehicleModel = document.getElementById('vehicle-model')?.value.trim() || '';
      const vehicleYear = document.getElementById('vehicle-year')?.value || '';
      const serviceSelect = document.getElementById('service-select');
      const appointmentDate = document.getElementById('appointment-date')?.value || '';
      const appointmentTime = document.getElementById('appointment-time')?.value || '';
      const priorityVal = document.querySelector('input[name="service_priority"]:checked')?.value || 'Standard';
      const contactVal = document.getElementById('client-email')?.value.trim() || document.getElementById('client-phone')?.value.trim() || 'On File';

      const ticketClientName = document.getElementById('ticket-client-name');
      const ticketService = document.getElementById('ticket-service-val');
      const ticketVehicle = document.getElementById('ticket-vehicle-val');
      const ticketDate = document.getElementById('ticket-date-val');
      const ticketTime = document.getElementById('ticket-time-val');
      const ticketPriority = document.getElementById('ticket-priority-val');
      const ticketContact = document.getElementById('ticket-contact-val');
      const ticketRef = document.getElementById('ticket-ref-code');

      if (ticketClientName) ticketClientName.textContent = clientName;
      if (ticketService) {
        const activeTileTitle = document.querySelector('.service-luxury-tile.active .tile-title')?.textContent?.trim();
        ticketService.textContent = activeTileTitle || (serviceSelect ? serviceSelect.value : 'Diagnostic Service');
      }
      if (ticketVehicle) ticketVehicle.textContent = `${vehicleMake} ${vehicleModel} (${vehicleYear})`;
      
      if (ticketDate) {
        try {
          const parts = appointmentDate.split('-');
          const d = new Date(parts[0], parts[1] - 1, parts[2]);
          ticketDate.textContent = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        } catch (e) {
          ticketDate.textContent = appointmentDate;
        }
      }

      if (ticketTime) ticketTime.textContent = appointmentTime.replace(/\s*\(.*\)/, '');
      if (ticketPriority) ticketPriority.textContent = priorityVal;
      if (ticketContact) ticketContact.textContent = contactVal;

      if (ticketRef) {
        const randCode = Math.floor(1000 + Math.random() * 9000);
        ticketRef.textContent = `#VOLT-${randCode}-BAY`;
      }

      // Open Modal
      if (modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      }

      showToast('Service bay reservation confirmed');
    }, 1000);
  });
}

/* ==========================================================================
   7. MODAL & TOAST FEEDBACK UTILITIES
   ========================================================================== */
function initModalAndToast() {
  const modal = document.getElementById('submission-confirmation-modal');
  const closeBtn = document.getElementById('close-confirm-modal');
  const returnBtn = document.getElementById('ticket-close-return-btn');

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (returnBtn) returnBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Global Toast function
  window.showToast = function(message) {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');

      clearTimeout(window.bookingToastTimer);
      window.bookingToastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }
  };
}
