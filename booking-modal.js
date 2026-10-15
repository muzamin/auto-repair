/**
 * VoltEdge Auto Electrical Repair Shop
 * Premium Client Booking Modal & Service Allocation Engine
 * Features:
 * - Instant Header CTA "Book a Service" Interactive Trigger
 * - Easy Booking for Client (Battery & Auto Electrical Repair Shop)
 * - Dynamic Date Constraint (Min date = Today)
 * - Robust Client Validation with Inline Feedback
 * - Real-time Bay Allocation Simulation & Confirmation Receipt Ticket
 * - Flawless Responsive Behavior (360px to 1024px+)
 * - Full Keyboard (ESC) & Backdrop Interaction Support
 */

(function () {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClientBookingEngine);
  } else {
    initClientBookingEngine();
  }

  function initClientBookingEngine() {
    ensureModalMarkup();

    const bookingModal = document.getElementById('booking-service-modal');
    if (!bookingModal) return;

    const closeBtn = document.getElementById('close-booking-service-modal');
    const bookingForm = document.getElementById('client-booking-form');
    const confirmView = document.getElementById('booking-confirmation-view');
    const confirmCloseBtn = document.getElementById('confirm-close-btn');
    const confirmRebookBtn = document.getElementById('confirm-rebook-btn');
    const submitBtn = document.getElementById('client-booking-submit-btn');

    // Date picker: ensure user cannot pick past dates
    const dateInput = document.getElementById('client-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      if (!dateInput.value) {
        dateInput.value = today;
      }
    }

    // Attach trigger handlers to all "Book a Service" buttons
    attachBookingTriggers(bookingModal);

    // Close handlers
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeBookingModal(bookingModal);
      });
    }

    if (confirmCloseBtn) {
      confirmCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeBookingModal(bookingModal);
        resetBookingCard();
      });
    }

    if (confirmRebookBtn) {
      confirmRebookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetBookingCard();
      });
    }

    // Backdrop click
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeBookingModal(bookingModal);
      }
    });

    // Keyboard ESC key handler
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
        closeBookingModal(bookingModal);
      }
    });

    // Interactive Diagnostic Stage Switcher & Live Image Synchronization
    initDiagnosticStageSwitcher();

    function initDiagnosticStageSwitcher() {
      const previewCards = document.querySelectorAll('.service-preview-card');
      const stageImg = document.getElementById('booking-stage-img');
      const stageCaption = document.getElementById('booking-stage-caption');
      const serviceSelect = document.getElementById('client-service-select');

      previewCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          previewCards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');

          const imgSrc = card.getAttribute('data-service-img');
          const serviceVal = card.getAttribute('data-service-val');
          const captionText = card.getAttribute('data-caption');

          if (stageImg && imgSrc) {
            stageImg.style.opacity = '0.35';
            stageImg.style.transform = 'scale(0.98)';
            setTimeout(() => {
              stageImg.src = imgSrc;
              stageImg.style.opacity = '1';
              stageImg.style.transform = 'scale(1)';
            }, 180);
          }

          if (stageCaption && captionText) {
            const capTextEl = stageCaption.querySelector('.caption-text');
            if (capTextEl) capTextEl.textContent = captionText;
          }

          if (serviceSelect && serviceVal) {
            for (let i = 0; i < serviceSelect.options.length; i++) {
              if (serviceSelect.options[i].value === serviceVal || serviceSelect.options[i].value.includes(serviceVal) || serviceVal.includes(serviceSelect.options[i].value)) {
                serviceSelect.selectedIndex = i;
                break;
              }
            }
          }
        });
      });

      if (serviceSelect) {
        serviceSelect.addEventListener('change', () => {
          const selectedVal = serviceSelect.value;
          previewCards.forEach(card => {
            const cardVal = card.getAttribute('data-service-val');
            if (cardVal && (selectedVal.includes(cardVal) || cardVal.includes(selectedVal))) {
              previewCards.forEach(c => c.classList.remove('active'));
              card.classList.add('active');
              const imgSrc = card.getAttribute('data-service-img');
              const captionText = card.getAttribute('data-caption');
              if (stageImg && imgSrc) {
                stageImg.style.opacity = '0.35';
                setTimeout(() => {
                  stageImg.src = imgSrc;
                  stageImg.style.opacity = '1';
                }, 180);
              }
              if (stageCaption && captionText) {
                const capTextEl = stageCaption.querySelector('.caption-text');
                if (capTextEl) capTextEl.textContent = captionText;
              }
            }
          });
        });
      }
    }

    // Form Submission & Validation
    if (bookingForm) {
      bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    function handleBookingSubmit(e) {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const phoneInput = document.getElementById('client-phone');
      const emailInput = document.getElementById('client-email');
      const vehicleInput = document.getElementById('client-vehicle');
      const serviceSelect = document.getElementById('client-service-select');
      const dateVal = document.getElementById('client-date');
      const timeVal = document.getElementById('client-time-slot');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'name-error', 'Please provide client full name');
        isValid = false;
      } else {
        clearFieldError(nameInput, 'name-error');
      }

      // Validate Phone
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,14}$/;
      if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim().replace(/\s+/g, ''))) {
        showFieldError(phoneInput, 'phone-error', 'Please enter a valid contact phone number');
        isValid = false;
      } else {
        clearFieldError(phoneInput, 'phone-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'email-error', 'Please provide a valid email address');
        isValid = false;
      } else {
        clearFieldError(emailInput, 'email-error');
      }

      // Validate Vehicle
      if (!vehicleInput.value.trim()) {
        showFieldError(vehicleInput, 'vehicle-error', 'Please specify vehicle make and model');
        isValid = false;
      } else {
        clearFieldError(vehicleInput, 'vehicle-error');
      }

      // Validate Date
      if (!dateVal.value) {
        showFieldError(dateVal, 'date-error', 'Please choose an appointment date');
        isValid = false;
      } else {
        clearFieldError(dateVal, 'date-error');
      }

      if (!isValid) {
        return;
      }

      // Show Loading State on submit button
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      // Simulate Fast Server Bay Allocation (450ms)
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }

        // Generate Realistic Confirmation Data
        const clientName = nameInput.value.trim();
        const clientPhone = phoneInput.value.trim();
        const clientEmail = emailInput.value.trim();
        const clientVehicle = vehicleInput.value.trim();
        const serviceChosen = serviceSelect.options[serviceSelect.selectedIndex].text;
        const selectedDate = new Date(dateVal.value);
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        const chosenTime = timeVal.value;

        // Random Assigned Bay from Specialist Bay List
        const bayList = [
          'Bay #1 (High-Voltage EV / Hybrid Bench)',
          'Bay #2 (Master Auto Electrical & ECU Lab)',
          'Bay #3 (AGM Battery Diagnostics & Load Station)',
          'Bay #4 (Alternator & Starter Testing Rig)'
        ];
        const assignedBay = bayList[Math.floor(Math.random() * bayList.length)];
        const bookingRefCode = '#VOLT-' + Math.floor(1000 + Math.random() * 9000) + '-BAY';

        // Populate Ticket
        setElementText('confirm-client-name', clientName);
        setElementText('confirm-ticket-code', bookingRefCode);
        setElementText('confirm-vehicle', clientVehicle);
        setElementText('confirm-bay', assignedBay);
        setElementText('confirm-date', formattedDate);
        setElementText('confirm-time', chosenTime);
        setElementText('confirm-service', serviceChosen);
        setElementText('confirm-phone-display', clientPhone);
        setElementText('confirm-email-display', clientEmail);

        // Transition views smoothly inside the atelier suite
        const workspace = document.getElementById('booking-main-workspace');
        if (workspace) workspace.style.display = 'none';
        else if (bookingForm) bookingForm.style.display = 'none';
        confirmView.style.display = 'flex';

        // Trigger Global Toast if available
        if (typeof window.showToast === 'function') {
          window.showToast(`Priority Bay Allocated: ${clientName} (${bookingRefCode})`);
        } else {
          showFallbackToast(`Priority Bay Allocated: ${clientName} (${bookingRefCode})`);
        }

        // Scroll top of modal container
        const scrollTarget = bookingModal.querySelector('.booking-suite-container') || bookingModal.querySelector('.booking-card');
        scrollTarget?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    }

    function showFieldError(input, errorId, msg) {
      const field = input.closest('.form-field');
      if (field) {
        field.classList.add('has-error');
        const errEl = document.getElementById(errorId);
        if (errEl) errEl.textContent = msg;
      }
    }

    function clearFieldError(input, errorId) {
      const field = input.closest('.form-field');
      if (field) {
        field.classList.remove('has-error');
      }
    }

    function resetBookingCard() {
      const workspace = document.getElementById('booking-main-workspace');
      if (workspace) workspace.style.display = 'grid';
      if (bookingForm) {
        bookingForm.reset();
        bookingForm.style.display = 'flex';
        bookingForm.querySelectorAll('.has-error').forEach(f => f.classList.remove('has-error'));
      }
      if (confirmView) {
        confirmView.style.display = 'none';
      }
      if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }
    }
  }

  function setElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function openBookingModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Auto-focus first input
    setTimeout(() => {
      document.getElementById('client-name')?.focus();
    }, 200);
  }

  function closeBookingModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function attachBookingTriggers(bookingModal) {
    // Select all relevant buttons that should trigger the booking form card
    const triggers = document.querySelectorAll(`
      #header-book-btn,
      .header-cta-btn,
      a[href="book a service.html"],
      a[href*="book"],
      #home-cta-journey-btn,
      #about-cta-book-btn,
      #service-cta-book-btn,
      #pricing-cta-book-btn,
      #tech-cta-book-btn,
      [data-open-booking="true"]
    `);

    triggers.forEach(btn => {
      // Exclude navigation dropdown links or non-cta links
      if (btn.classList.contains('nav-link') && !btn.classList.contains('header-cta-btn')) return;

      btn.addEventListener('click', (e) => {
        // If already on the dedicated book a service page, allow natural in-page scrolling/handling
        if (window.location.pathname.includes('book%20a%20service.html') || window.location.pathname.includes('book a service.html')) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        window.location.href = 'book a service.html';
      });
    });

    // Also support global window trigger with optional service pre-fill
    window.openClientBookingModal = (servicePrefill) => {
      openBookingModal(bookingModal);
      if (servicePrefill) {
        const serviceSelect = document.getElementById('client-service-select');
        if (serviceSelect) {
          for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].text.toLowerCase().includes(servicePrefill.toLowerCase()) || 
                serviceSelect.options[i].value.toLowerCase().includes(servicePrefill.toLowerCase())) {
              serviceSelect.selectedIndex = i;
              break;
            }
          }
        }
      }
    };
  }

  function showFallbackToast(msg) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notification';
      toast.innerHTML = `<div class="toast-icon">✓</div><div class="toast-message" id="toast-message"></div>`;
      document.body.appendChild(toast);
    }
    const messageEl = document.getElementById('toast-message');
    if (messageEl) messageEl.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  }

  /**
   * Ensures the Premium Booking Form Card markup exists in the DOM.
   * If it doesn't exist, it dynamically injects it so every page on the site
   * can seamlessly trigger this card without needing copied markup everywhere.
   */
  function ensureModalMarkup() {
    if (document.getElementById('booking-service-modal')) return;

    const modalHTML = `
  <!-- MODAL: FULL-SCREEN ULTRA-PREMIUM AUTOMOTIVE CLIENT BOOKING ATELIER -->
  <div class="modal-overlay booking-modal-overlay fullscreen-atelier-mode" id="booking-service-modal" aria-hidden="true" role="dialog" aria-labelledby="booking-card-main-title">
    <div class="booking-suite-container fullscreen-suite" id="booking-card-container">
      
      <!-- Top Ambient Decorative Glows -->
      <div class="booking-card-glow"></div>
      <div class="booking-halo-spot"></div>

      <!-- TOP HEADER: 3-POINT LUXURY SYMMETRY WITH CENTERED BRAND CREST -->
      <header class="booking-atelier-header">
        <div class="atelier-header-left">
          <span class="atelier-live-dot"></span>
          <span class="atelier-loc-tag">VOLTERRA ATELIER • HIGH-VOLTAGE LAB #02</span>
        </div>

        <div class="booking-brand-hero-center">
          <div class="booking-brand-crest">
            <img src="assets/images/logo_transparent.png" alt="VOLTERRA Luxury Auto Electrical" class="booking-brand-logo-img">
          </div>
          <div class="booking-brand-text-center">
            <div class="booking-brand-title">
              <span class="brand-title-primary">VOLT</span><span class="brand-title-secondary">ERRA</span>
            </div>
            <div class="booking-brand-tagline">BATTERY &amp; AUTO ELECTRICAL REPAIR SHOP</div>
          </div>
          <div class="booking-top-meta-strip">
            <div class="booking-bay-status-badge">
              <span class="pulse-indicator-gold"></span>
              <span>MASTER DIAGNOSTIC BAYS • LIVE CLIENT RESERVATION</span>
            </div>
          </div>
        </div>

        <div class="atelier-header-right">
          <button class="modal-close-btn booking-close-btn" id="close-booking-service-modal" aria-label="Close Booking Dialog" title="Close booking suite">
            <span class="close-kbd-hint">ESC</span>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- Main Booking Split Workspace (Active Form Flow) -->
      <div id="booking-main-workspace" class="booking-main-workspace">
        
        <!-- LEFT COLUMN: CINEMATIC DIAGNOSTIC BENCH & ANIMATED VISUAL STAGE (Fills 100% Height - Zero Empty Space) -->
        <div class="booking-visual-stage">
          <div class="stage-frame-wrapper">
            <!-- Stage Live Status Telemetry HUD -->
            <div class="stage-header-hud">
              <span class="stage-hud-badge live-active">
                <span class="hud-blink-dot"></span>
                BAY #02 • ACTIVE DIAGNOSTIC BENCH
              </span>
              <span class="stage-hud-badge telemetry-val">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                14.42V • PICO OSCILLOSCOPE ACTIVE
              </span>
            </div>

            <!-- The Hero Image Viewport with Animated Laser Scanning Line -->
            <div class="stage-image-viewport">
              <img id="booking-stage-img" src="assets/images/tech_cinematic_lab.jpg" alt="Master Diagnostic Bench" class="stage-featured-img">
              
              <!-- Continuous Animated Laser Scanning Beam -->
              <div class="stage-laser-scanner" aria-hidden="true">
                <div class="laser-beam-line"></div>
                <div class="laser-glow-gradient"></div>
              </div>

              <!-- High-Tech Telemetry Stats Floating Overlay -->
              <div class="stage-hud-stats-overlay" aria-hidden="true">
                <div class="hud-metric-pill">
                  <span class="metric-val">99.8%</span>
                  <span class="metric-label">BATT SOH HEALTH</span>
                </div>
                <div class="hud-metric-pill">
                  <span class="metric-val">850 CCA</span>
                  <span class="metric-label">CRANKING POWER</span>
                </div>
                <div class="hud-metric-pill">
                  <span class="metric-val">&lt;0.12V</span>
                  <span class="metric-label">RIPPLE VOLTAGE</span>
                </div>
              </div>

              <!-- Animated Oscilloscope Waveform at the base -->
              <div class="stage-waveform-overlay" aria-hidden="true">
                <svg class="oscilloscope-svg" viewBox="0 0 500 40" preserveAspectRatio="none">
                  <path class="wave-path" d="M0,20 L80,20 L95,8 L105,32 L115,14 L125,26 L135,20 L240,20 L255,5 L268,35 L280,12 L290,28 L300,20 L400,20 L415,8 L428,32 L440,15 L450,25 L500,20" />
                </svg>
              </div>

              <!-- Interactive Caption Badge -->
              <div class="stage-caption-badge" id="booking-stage-caption">
                <span class="caption-icon">⚡</span>
                <span class="caption-text">Master Diagnostic Bench: Multi-Point Electrical Telemetry &amp; Load Calibration</span>
              </div>
            </div>

            <!-- Interactive Service Switcher with Real Animated Previews -->
            <div class="stage-service-switcher">
              <div class="switcher-headline">
                <span>SPECIALIZED WORKSHOP BENCHES</span>
                <span class="switcher-hint">Click to switch diagnostic view</span>
              </div>
              <div class="service-preview-grid">
                <button type="button" class="service-preview-card active" data-service-val="Battery Replacement ($129)" data-service-img="assets/images/battery_testing.jpg" data-caption="High-Performance AGM &amp; Lithium Battery Replacement Bench ($129)">
                  <div class="preview-thumb-wrap">
                    <img src="assets/images/battery_testing.jpg" alt="Battery Bench" class="preview-thumb-img">
                    <span class="preview-pulse-tag">AGM</span>
                  </div>
                  <div class="preview-info">
                    <span class="preview-title">AGM Battery Bench</span>
                    <span class="preview-price">$129 • 45 Min Bay</span>
                  </div>
                </button>

                <button type="button" class="service-preview-card" data-service-val="Computer Diagnostics ($89)" data-service-img="assets/images/electrical_diagnostics.jpg" data-caption="Master Computer Diagnostics, PicoScope 8-Channel &amp; ECU Fault Scan ($89)">
                  <div class="preview-thumb-wrap">
                    <img src="assets/images/electrical_diagnostics.jpg" alt="ECU Diagnostics" class="preview-thumb-img">
                    <span class="preview-pulse-tag">SCAN</span>
                  </div>
                  <div class="preview-info">
                    <span class="preview-title">ECU &amp; PicoScope</span>
                    <span class="preview-price">$89 • Instant Code</span>
                  </div>
                </button>

                <button type="button" class="service-preview-card" data-service-val="Alternator &amp; Starter ($149)" data-service-img="assets/images/alternator_repair.jpg" data-caption="Heavy-Duty Alternator &amp; Starter Motor Oscilloscope Dyno Overhaul ($149)">
                  <div class="preview-thumb-wrap">
                    <img src="assets/images/alternator_repair.jpg" alt="Alternator Repair" class="preview-thumb-img">
                    <span class="preview-pulse-tag">DYNO</span>
                  </div>
                  <div class="preview-info">
                    <span class="preview-title">Alternator &amp; Starter</span>
                    <span class="preview-price">$149 • High-Amp</span>
                  </div>
                </button>

                <button type="button" class="service-preview-card" data-service-val="EV High-Voltage Isolation ($199)" data-service-img="assets/images/detail_service_5_ev.jpg" data-caption="Hybrid &amp; Full EV High-Voltage Isolation &amp; Battery Health Diagnostic ($199)">
                  <div class="preview-thumb-wrap">
                    <img src="assets/images/detail_service_5_ev.jpg" alt="EV High Voltage" class="preview-thumb-img">
                    <span class="preview-pulse-tag">800V</span>
                  </div>
                  <div class="preview-info">
                    <span class="preview-title">EV / Hybrid Isolation</span>
                    <span class="preview-price">$199 • Certified</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Client Trust Quality Strip -->
            <div class="stage-guarantee-strip">
              <div class="stage-strip-item">
                <span class="strip-icon">🛡️</span>
                <span class="strip-label">24-Month Warranty</span>
              </div>
              <div class="stage-strip-item">
                <span class="strip-icon">⚡</span>
                <span class="strip-label">OEM Coding Verified</span>
              </div>
              <div class="stage-strip-item">
                <span class="strip-icon">🏆</span>
                <span class="strip-label">Master Electricians</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: EXECUTIVE CLIENT BOOKING CONSOLE (Chassis 2 - Matched & Symmetrical) -->
        <div class="booking-console-pane">
          <div class="console-frame-wrapper atelier-chassis-frame">
            <!-- Console Live Status Telemetry HUD (Matches Left Stage HUD Baseline) -->
            <div class="stage-header-hud console-header-hud">
              <span class="stage-hud-badge live-active">
                <span class="hud-blink-dot"></span>
                STEP-BY-STEP CLIENT VERIFICATION
              </span>
              <span class="stage-hud-badge telemetry-val">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                PRIORITY ALLOCATION PROTOCOL • 256-BIT SSL
              </span>
            </div>

            <form id="client-booking-form" class="booking-form" novalidate>
              
              <!-- Section 1: Client & Vehicle Information -->
              <div class="booking-panel-section">
                <div class="booking-section-label">
                  <span class="section-number">01</span>
                  <span class="section-title">Client &amp; Vehicle Profile</span>
                </div>

              <div class="booking-grid-2">
                <!-- Full Name -->
                <div class="form-field">
                  <label for="client-name" class="form-label">
                    <span>Full Name <span class="required-star">*</span></span>
                  </label>
                  <div class="booking-input-wrap">
                    <span class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input type="text" id="client-name" name="client_name" class="form-input booking-input" placeholder="e.g. David Vance" required autocomplete="name">
                  </div>
                  <span class="field-error-msg" id="name-error">Please provide client full name</span>
                </div>

                <!-- Phone Number -->
                <div class="form-field">
                  <label for="client-phone" class="form-label">
                    <span>Phone Number <span class="required-star">*</span></span>
                  </label>
                  <div class="booking-input-wrap">
                    <span class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <input type="tel" id="client-phone" name="client_phone" class="form-input booking-input" placeholder="+1 (555) 019-2834" required autocomplete="tel">
                  </div>
                  <span class="field-error-msg" id="phone-error">Please enter a valid phone number</span>
                </div>
              </div>

              <div class="booking-grid-2">
                <!-- Email Address -->
                <div class="form-field">
                  <label for="client-email" class="form-label">
                    <span>Email Address <span class="required-star">*</span></span>
                    <span class="label-hint">Digital pass</span>
                  </label>
                  <div class="booking-input-wrap">
                    <span class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </span>
                    <input type="email" id="client-email" name="client_email" class="form-input booking-input" placeholder="client@luxuryauto.com" required autocomplete="email">
                  </div>
                  <span class="field-error-msg" id="email-error">Please provide a valid email</span>
                </div>

                <!-- Vehicle Make & Model -->
                <div class="form-field">
                  <label for="client-vehicle" class="form-label">
                    <span>Vehicle Make, Model &amp; Year <span class="required-star">*</span></span>
                  </label>
                  <div class="booking-input-wrap">
                    <span class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    </span>
                    <input type="text" id="client-vehicle" name="client_vehicle" class="form-input booking-input" placeholder="e.g. 2023 Porsche Taycan / BMW M5" required>
                  </div>
                  <span class="field-error-msg" id="vehicle-error">Please state your vehicle model</span>
                </div>
              </div>
            </div>

            <!-- Section 2: Electrical Architecture & Powertrain -->
            <div class="booking-panel-section">
              <div class="booking-section-label">
                <span class="section-number">02</span>
                <span class="section-title">Electrical Architecture</span>
              </div>

              <div class="powertrain-chips" role="radiogroup" aria-label="Electrical System Architecture">
                <label class="powertrain-chip">
                  <input type="radio" name="powertrain_type" value="Standard 12V/24V ICE" checked>
                  <span class="chip-content">
                    <span class="chip-icon">🔋</span>
                    <span class="chip-text-wrap">
                      <span class="chip-title">12V/24V ICE</span>
                      <span class="chip-sub">AGM / EFB Batteries</span>
                    </span>
                  </span>
                </label>
                <label class="powertrain-chip">
                  <input type="radio" name="powertrain_type" value="Hybrid / Full EV High-Voltage">
                  <span class="chip-content">
                    <span class="chip-icon">⚡</span>
                    <span class="chip-text-wrap">
                      <span class="chip-title">Hybrid &amp; EV (400V-800V)</span>
                      <span class="chip-sub">High-Voltage Isolation</span>
                    </span>
                  </span>
                </label>
                <label class="powertrain-chip">
                  <input type="radio" name="powertrain_type" value="European Luxury / High-Performance">
                  <span class="chip-content">
                    <span class="chip-icon">🏎️</span>
                    <span class="chip-text-wrap">
                      <span class="chip-title">Euro Luxury</span>
                      <span class="chip-sub">Porsche / BMW / Audi CAN</span>
                    </span>
                  </span>
                </label>
                <label class="powertrain-chip">
                  <input type="radio" name="powertrain_type" value="Commercial / Fleet Vehicle">
                  <span class="chip-content">
                    <span class="chip-icon">🚛</span>
                    <span class="chip-text-wrap">
                      <span class="chip-title">Commercial &amp; Fleet</span>
                      <span class="chip-sub">Dual Alternator / Heavy Duty</span>
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <!-- Section 3: Specialized Battery & Electrical Service -->
            <div class="booking-panel-section">
              <div class="booking-section-label">
                <span class="section-number">03</span>
                <span class="section-title">Service &amp; Bay Schedule</span>
              </div>

              <div class="form-field full-width">
                <label for="client-service-select" class="form-label">
                  <span>Selected Diagnostic Service <span class="required-star">*</span></span>
                </label>
                <div class="booking-select-wrap">
                  <select id="client-service-select" name="client_service" class="custom-select booking-select" required>
                    <option value="Battery Replacement ($129)" selected>🔋 High-Performance Battery Replacement &amp; AGM Coding ($129)</option>
                    <option value="Computer Diagnostics ($89)">⚡ Master Computer Diagnostics &amp; ECU Fault Scan ($89)</option>
                    <option value="Alternator &amp; Starter ($149)">⚙️ Alternator &amp; Starter Motor Testing / Overhaul ($149)</option>
                    <option value="Parasitic Drain Repair ($119)">🔌 Parasitic Battery Drain &amp; Complex Wiring Loom Repair ($119)</option>
                    <option value="EV High-Voltage Isolation ($199)">⚡ Hybrid / EV High-Voltage Isolation &amp; Battery Health ($199)</option>
                    <option value="Climate Control &amp; AC ($109)">❄️ Auto Electrical AC &amp; Sensor Calibration ($109)</option>
                    <option value="Rapid Jump Rescue ($79)">🚨 Rapid Mobile Roadside Jump-Start &amp; Battery Dispatch ($79)</option>
                  </select>
                  <span class="select-chevron">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor"><path d="M4 6L8 10L12 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </span>
                </div>
              </div>

              <!-- Appointment Scheduling Grid -->
              <div class="booking-grid-2">
                <!-- Preferred Date -->
                <div class="form-field">
                  <label for="client-date" class="form-label">
                    <span>Preferred Date <span class="required-star">*</span></span>
                  </label>
                  <div class="booking-input-wrap">
                    <span class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </span>
                    <input type="date" id="client-date" name="client_date" class="form-input booking-input" required>
                  </div>
                  <span class="field-error-msg" id="date-error">Please select a service date</span>
                </div>

                <!-- Preferred Time Window -->
                <div class="form-field">
                  <label for="client-time-slot" class="form-label">
                    <span>Bay Time Window <span class="required-star">*</span></span>
                  </label>
                  <div class="booking-select-wrap">
                    <select id="client-time-slot" name="client_time_slot" class="custom-select booking-select" required>
                      <option value="Morning Slot (08:30 AM – 11:30 AM)" selected>Morning (08:30 AM – 11:30 AM)</option>
                      <option value="Midday Slot (11:30 AM – 02:30 PM)">Midday (11:30 AM – 02:30 PM)</option>
                      <option value="Afternoon Slot (02:30 PM – 05:30 PM)">Afternoon (02:30 PM – 05:30 PM)</option>
                      <option value="Express Priority Immediate Bay">Express Immediate Bay (Priority)</option>
                    </select>
                    <span class="select-chevron">
                      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor"><path d="M4 6L8 10L12 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 4: Symptoms & Client Notes -->
            <div class="booking-panel-section">
              <div class="booking-section-label">
                <span class="section-number">04</span>
                <span class="section-title">Diagnostic Symptoms &amp; Notes</span>
              </div>

              <div class="form-field full-width">
                <label for="client-symptoms" class="form-label">
                  <span>Describe Any Symptoms or Issues</span>
                  <span class="label-hint">Optional</span>
                </label>
                <textarea id="client-symptoms" name="client_symptoms" class="form-textarea booking-textarea" rows="2" placeholder="e.g. Battery drains overnight, slow crank, dashboard warning lights, alternator whine..."></textarea>
              </div>
            </div>

            <!-- Estimation & Guarantee Banner -->
            <div class="booking-guarantee-banner">
              <div class="guarantee-icon">🛡️</div>
              <div class="guarantee-text">
                <strong>Workshop Bench Guarantee:</strong> Transparent pricing. Bench scan fee applies 100% directly toward repair credit if you proceed with our master electrical overhaul.
              </div>
            </div>

            <!-- Submit Button Group -->
            <div class="booking-submit-group">
              <button type="submit" class="btn btn-primary full-width booking-submit-btn" id="client-booking-submit-btn">
                <span class="btn-spinner" id="booking-btn-spinner"></span>
                <span class="btn-text">Confirm Priority Bay Booking</span>
                <svg class="btn-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                  <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <p class="booking-privacy-note">🔒 SSL-Encrypted Client Reservation • Instant SMS &amp; Calendar Confirmation</p>
            </div>
          </form>
        </div>
      </div>

      </div><!-- /.booking-main-workspace -->

      <!-- Confirmation Card View (Shows upon successful form submission) -->
      <div id="booking-confirmation-view" class="booking-confirmation-view" style="display: none;">
        <!-- Top Middle Brand on Confirmation Ticket -->
        <div class="booking-brand-hero-center confirm-brand-header">
          <div class="booking-brand-crest">
            <img src="assets/images/logo_transparent.png" alt="VOLTERRA Luxury Auto Electrical" class="booking-brand-logo-img">
          </div>
          <div class="booking-brand-text-center">
            <div class="booking-brand-title">
              <span class="brand-title-primary">VOLT</span><span class="brand-title-secondary">ERRA</span>
            </div>
            <div class="booking-brand-tagline">BATTERY &amp; AUTO ELECTRICAL REPAIR SHOP</div>
          </div>
        </div>

        <div class="confirmation-icon-wrap">
          <svg class="confirmation-check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <span class="confirmation-badge">RESERVATION CONFIRMED</span>
        <h3 class="confirmation-title">Diagnostic Bay Allocated!</h3>
        <p class="confirmation-subtitle">Thank you, <strong id="confirm-client-name">Client</strong>. Your appointment has been secured at VOLTERRA Master Auto Electrical.</p>

        <!-- Ticket Card Details -->
        <div class="booking-ticket-card">
          <div class="ticket-row ticket-header-row">
            <span class="ticket-token-label">Booking Reference:</span>
            <span class="ticket-token-code" id="confirm-ticket-code">#VOLT-8942-BAY</span>
          </div>
          <div class="ticket-divider"></div>
          <div class="ticket-grid">
            <div class="ticket-item">
              <span class="item-label">Vehicle:</span>
              <span class="item-val" id="confirm-vehicle">Audi RS6</span>
            </div>
            <div class="ticket-item">
              <span class="item-label">Assigned Bay:</span>
              <span class="item-val badge-bay" id="confirm-bay">Bay #2 (Master Electrical Lab)</span>
            </div>
            <div class="ticket-item">
              <span class="item-label">Scheduled Date:</span>
              <span class="item-val" id="confirm-date">Oct 14, 2026</span>
            </div>
            <div class="ticket-item">
              <span class="item-label">Time Window:</span>
              <span class="item-val" id="confirm-time">08:30 AM – 11:30 AM</span>
            </div>
            <div class="ticket-item ticket-col-span">
              <span class="item-label">Selected Service:</span>
              <span class="item-val highlight-gold" id="confirm-service">High-Performance Battery Replacement ($129)</span>
            </div>
          </div>
        </div>

        <div class="confirmation-notes">
          <p>📲 An instant confirmation SMS and telemetry token have been sent to <span id="confirm-phone-display">+1 (555) 000-0000</span> and <span id="confirm-email-display">client@example.com</span>.</p>
        </div>

        <div class="confirmation-actions">
          <button type="button" class="btn btn-primary" id="confirm-close-btn">
            <span>Done / Return to Website</span>
          </button>
          <button type="button" class="btn btn-secondary" id="confirm-rebook-btn">
            <span>Book Another Vehicle</span>
          </button>
        </div>
      </div>

    </div>
  </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

})();
