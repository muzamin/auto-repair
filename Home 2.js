/**
 * VoltEdge Auto Electrical - Home 2 Logic (Home 2.js)
 * Commercial Fleet & High-Voltage EV Systems
 * Features:
 * - Dark & Light Mode Theme Toggle with Persistence
 * - RTL / LTR Layout Direction Switcher
 * - Continuous Automated Scrolling Marquee Carousel with Play/Pause and Manual Controls
 * - Modal Dialogs (Login, Password Visibility Eye Toggle, 404, Coming Soon)
 * - Smooth Header Scroll Blur & Active Navigation Link Tracking
 * - Interactive CTA & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileNavigation();
  initSmoothScrollAndActiveNav();
  initMarqueeControls();
  initModals();
  initActionButtons();
  initTelemetryLab();
  initSlaBillingToggle();
  initHome2FleetMatrix();
});

/* ==========================================================================
   1. Theme Toggle (Dark & Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Sync preference with Home 1 or default to dark
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
   3. Mobile Navigation
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
   4. Smooth Scrolling & Header Scroll Detection
   ========================================================================== */
function initSmoothScrollAndActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (header) {
      if (window.pageYOffset > 24) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active link highlighting
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
      const href = link.getAttribute('href');
      if (href && href === `#${currentId}`) {
        link.classList.add('active');
      } else if (href && href.startsWith('#') && currentId !== '') {
        link.classList.remove('active');
      }
    });
  });
}

/* ==========================================================================
   5. Automated Scrolling Marquee Carousel with Manual Controls
   ========================================================================== */
function initMarqueeControls() {
  const track = document.getElementById('marquee-track');
  const wrapper = document.getElementById('marquee-wrapper');
  const toggleBtn = document.getElementById('marquee-toggle');
  const prevBtn = document.getElementById('marquee-prev');
  const nextBtn = document.getElementById('marquee-next');

  if (!track || !wrapper) return;

  let isPaused = false;

  // Toggle Play / Pause
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        track.style.animationPlayState = 'paused';
        toggleBtn.innerHTML = '&#9658;'; // Play icon
        toggleBtn.setAttribute('aria-label', 'Resume auto scroll');
        showToast('Auto scroll paused');
      } else {
        track.style.animationPlayState = 'running';
        toggleBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
        toggleBtn.setAttribute('aria-label', 'Pause auto scroll');
        showToast('Auto scroll resumed');
      }
    });
  }

  // Manual Previous (Scroll left by 340px)
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      wrapper.scrollBy({ left: -340, behavior: 'smooth' });
    });
  }

  // Manual Next (Scroll right by 340px)
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      wrapper.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   6. Modal Dialogs (Login, 404, Coming Soon)
   ========================================================================== */
function initModals() {
  const loginModal = document.getElementById('login-modal');
  const generalModal = document.getElementById('general-modal');
  const headerLoginBtn = document.getElementById('header-login-btn');
  const closeLoginBtn = document.getElementById('close-login-modal');
  const closeGeneralBtn = document.getElementById('close-general-modal');
  const generalOkBtn = document.getElementById('general-modal-ok-btn');
  const loginForm = document.getElementById('login-form');

  // Open Login Modal
  if (headerLoginBtn && loginModal) {
    headerLoginBtn.addEventListener('click', () => {
      openModal(loginModal);
    });
  }

  // Close Login Modal
  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      closeModal(loginModal);
    });
  }

  // Close General Modal
  if (closeGeneralBtn && generalModal) {
    closeGeneralBtn.addEventListener('click', () => {
      closeModal(generalModal);
    });
  }

  if (generalOkBtn && generalModal) {
    generalOkBtn.addEventListener('click', () => {
      closeModal(generalModal);
    });
  }

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

  // Password visibility eye toggle
  const togglePassBtn = document.getElementById('toggle-password-visibility');
  const passInput = document.getElementById('login-password');
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passInput.setAttribute('type', type);
      togglePassBtn.classList.toggle('active', type === 'text');
    });
  }

  // Handle Login Form Submit
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      closeModal(loginModal);
      showToast(`Welcome back, ${email}! Loading fleet portal...`);
      loginForm.reset();
    });
  }

  // Handle generic modal links (404, Coming soon)
  const modalLinks = document.querySelectorAll('.modal-trigger-link');
  modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalType = link.getAttribute('data-modal');
      if (modalType === 'login') {
        openModal(loginModal);
      } else if (modalType === 'not-found') {
        openGeneralModal('404 Page Demonstration', 'The diagnostic node you requested is off-bus or relocated.', '⚠');
      } else if (modalType === 'coming-soon') {
        openGeneralModal('Coming Soon', 'This fleet module is undergoing laboratory calibration.', '⚡');
      }
    });
  });

  function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openGeneralModal(title, msg, icon) {
    const heading = document.getElementById('general-modal-heading');
    const message = document.getElementById('general-modal-message');
    const iconBadge = document.getElementById('general-modal-icon');

    if (heading) heading.textContent = title;
    if (message) message.textContent = msg;
    if (iconBadge) iconBadge.textContent = icon || '⚡';

    openModal(generalModal);
  }
}

/* ==========================================================================
   7. Action Buttons & Toast Notifications
   ========================================================================== */
function initActionButtons() {
  const ctaBookBtn = document.getElementById('home2-cta-book-btn');
  if (ctaBookBtn) {
    ctaBookBtn.addEventListener('click', () => {
      showToast('Priority Commercial Bay Reserved. Dispatch notified.');
    });
  }
}

// Global Toast Display Helper
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   8. Interactive High-Voltage & Fleet Telemetry Lab (Oscilloscope Console)
   ========================================================================== */
function initTelemetryLab() {
  const tabs = document.querySelectorAll('.scope-tab-btn');
  const waveGlow = document.getElementById('scope-wave-glow');
  const waveBeam = document.getElementById('scope-wave-beam');
  const tracerLine = document.getElementById('scope-tracer-line');
  const statusText = document.getElementById('scope-status-text');
  const ch1Value = document.getElementById('ch1-value');
  const ch2Value = document.getElementById('ch2-value');
  const timebaseDisplay = document.getElementById('scope-timebase-display');
  const rippleText = document.getElementById('scope-ripple-text');
  const isolationText = document.getElementById('scope-isolation-text');
  const btnTrigger = document.getElementById('btn-scope-trigger');
  const btnFreeze = document.getElementById('btn-scope-freeze');
  const freezeLabel = document.getElementById('scope-freeze-label');
  const logStream = document.getElementById('telemetry-log-stream');

  const tVal1 = document.getElementById('t-val-1');
  const tVal2 = document.getElementById('t-val-2');
  const tVal3 = document.getElementById('t-val-3');
  const tBar1 = document.getElementById('t-bar-1');
  const tBar2 = document.getElementById('t-bar-2');
  const tBar3 = document.getElementById('t-bar-3');

  if (!tabs.length || !waveBeam) return;

  const presets = {
    ev: {
      path: "M 0,120 Q 50,30 100,120 T 200,120 T 300,120 T 400,120 T 500,120 T 600,120 T 700,120 T 800,120",
      status: "CHANNEL 1 & 2 ARMED • 800V HV PACK ISOLATION",
      ch1: "812.4 V DC",
      ch2: "148.6 A PEAK",
      timebase: "50 ms / DIV • 1.0 GS/s",
      ripple: "0.14% (Tolerance <0.5%)",
      isolation: "> 550 MΩ @ 1,000V",
      t1: "812.4",
      t2: "0.004",
      t3: "28.4",
      w1: "82%",
      w2: "96%",
      w3: "32%",
      color: "#C8A45D",
      log: "Switched probe to 800V High-Voltage Battery Isolation Rail."
    },
    alternator: {
      path: "M 0,120 Q 25,60 50,120 Q 75,60 100,120 Q 125,60 150,120 Q 175,60 200,120 Q 225,60 250,120 Q 275,60 300,120 Q 325,60 350,120 Q 375,60 400,120 Q 425,60 450,120 Q 475,60 500,120 Q 525,60 550,120 Q 575,60 600,120 Q 625,60 650,120 Q 675,60 700,120 Q 725,60 750,120 Q 775,60 800,120",
      status: "CHANNEL 1 & 2 ARMED • 28V 300A ALTERNATOR",
      ch1: "28.4 V DC",
      ch2: "294.2 A LOAD",
      timebase: "5 ms / DIV • 500 MS/s",
      ripple: "0.08V P-P (Full Rectification Pass)",
      isolation: "Diode Trio Ripple: Normal",
      t1: "28.4",
      t2: "0.012",
      t3: "54.8",
      w1: "65%",
      w2: "88%",
      w3: "62%",
      color: "#38BDF8",
      log: "Dyno load-bank energized: 294 Amps continuous on 28V bus."
    },
    canbus: {
      path: "M 0,160 L 30,160 L 30,70 L 90,70 L 90,160 L 130,160 L 130,70 L 200,70 L 200,160 L 250,160 L 250,70 L 310,70 L 310,160 L 370,160 L 370,70 L 450,70 L 450,160 L 510,160 L 510,70 L 580,70 L 580,160 L 630,160 L 630,70 L 710,70 L 710,160 L 800,160",
      status: "CAN-FD 2.0 Mbps • DIFFERENTIAL BUS ACTIVE",
      ch1: "3.5 V (CAN-H)",
      ch2: "1.5 V (CAN-L)",
      timebase: "2 μs / DIV • 2.5 GS/s",
      ripple: "Recessive/Dominant Δ 2.0V",
      isolation: "Terminating: 60.1 Ω (PASSED)",
      t1: "2.00",
      t2: "0.000",
      t3: "24.1",
      w1: "95%",
      w2: "100%",
      w3: "24%",
      color: "#10B981",
      log: "CAN-FD Baud: 2000 kbps decoded. CRC Errors: 0."
    }
  };

  function appendLog(msg, type) {
    if (!logStream) return;
    const now = new Date();
    const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    const row = document.createElement('div');
    row.className = 'log-row';
    const typeClass = type === 'error' ? 'log-info' : (type === 'gold' ? 'log-gold' : 'log-success');
    row.innerHTML = `<span class="log-time">${timeStr}</span> <span class="${typeClass}">${msg}</span>`;
    logStream.appendChild(row);
    logStream.scrollTop = logStream.scrollHeight;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const mode = tab.getAttribute('data-mode');
      const data = presets[mode];
      if (!data) return;

      waveGlow.setAttribute('d', data.path);
      waveBeam.setAttribute('d', data.path);
      waveGlow.style.stroke = data.color;
      waveBeam.style.stroke = data.color === '#C8A45D' ? '#E7DDC7' : data.color;

      if (statusText) statusText.textContent = data.status;
      if (ch1Value) ch1Value.textContent = data.ch1;
      if (ch2Value) ch2Value.textContent = data.ch2;
      if (timebaseDisplay) timebaseDisplay.textContent = data.timebase;
      if (rippleText) rippleText.textContent = data.ripple;
      if (isolationText) isolationText.textContent = data.isolation;

      if (tVal1) tVal1.textContent = data.t1;
      if (tVal2) tVal2.textContent = data.t2;
      if (tVal3) tVal3.textContent = data.t3;
      if (tBar1) tBar1.style.width = data.w1;
      if (tBar2) tBar2.style.width = data.w2;
      if (tBar3) tBar3.style.width = data.w3;

      appendLog(data.log, "gold");
    });
  });

  // Transient fault spike simulation
  if (btnTrigger) {
    btnTrigger.addEventListener('click', () => {
      const origD = waveBeam.getAttribute('d');
      const spikePath = "M 0,120 Q 30,120 70,10 Q 110,230 150,50 Q 180,180 220,120 T 350,120 T 500,120 T 650,120 T 800,120";
      
      waveGlow.setAttribute('d', spikePath);
      waveBeam.setAttribute('d', spikePath);
      waveBeam.style.stroke = "#EF4444";
      waveGlow.style.stroke = "#EF4444";

      appendLog("TRANSIENT SPIKE INJECTED: +180V Peak Overvoltage Clamped in 12ns!", "error");
      showToast("Diagnostic Transient Peak Captured by PicoScope");

      setTimeout(() => {
        waveGlow.setAttribute('d', origD);
        waveBeam.setAttribute('d', origD);
        const activeTab = document.querySelector('.scope-tab-btn.active');
        const mode = activeTab ? activeTab.getAttribute('data-mode') : 'ev';
        const color = presets[mode].color;
        waveGlow.style.stroke = color;
        waveBeam.style.stroke = color === '#C8A45D' ? '#E7DDC7' : color;
      }, 700);
    });
  }

  // Freeze / Run waveform toggle
  let isFrozen = false;
  if (btnFreeze && tracerLine) {
    btnFreeze.addEventListener('click', () => {
      isFrozen = !isFrozen;
      if (isFrozen) {
        tracerLine.classList.add('paused');
        if (freezeLabel) freezeLabel.textContent = '▶ Resume Scope';
        appendLog("Waveform buffer frozen for cursor analysis.", "info");
      } else {
        tracerLine.classList.remove('paused');
        if (freezeLabel) freezeLabel.textContent = '⏸ Freeze Scope';
        appendLog("Real-time acquisition resumed.", "success");
      }
    });
  }
}

/* ==========================================================================
   9. Commercial Fleet SLA Billing Switcher & Plan Interactions
   ========================================================================== */
function initSlaBillingToggle() {
  const switchBtn = document.getElementById('sla-billing-switch');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnual = document.getElementById('label-annual');
  const amountEls = document.querySelectorAll('.sla-amount');
  const noteEls = document.querySelectorAll('.sla-billing-note');
  const selectBtns = document.querySelectorAll('.sla-select-btn');

  if (!switchBtn) return;

  let isAnnual = false;

  function updatePricing() {
    if (isAnnual) {
      switchBtn.classList.add('annual-active');
      switchBtn.setAttribute('aria-checked', 'true');
      if (labelMonthly) labelMonthly.classList.remove('active');
      if (labelAnnual) labelAnnual.classList.add('active');

      amountEls.forEach(el => {
        const annualVal = el.getAttribute('data-annual');
        if (annualVal) el.textContent = annualVal;
      });

      noteEls.forEach(el => {
        const annualNote = el.getAttribute('data-annual');
        if (annualNote) el.textContent = annualNote;
      });
    } else {
      switchBtn.classList.remove('annual-active');
      switchBtn.setAttribute('aria-checked', 'false');
      if (labelMonthly) labelMonthly.classList.add('active');
      if (labelAnnual) labelAnnual.classList.remove('active');

      amountEls.forEach(el => {
        const monthlyVal = el.getAttribute('data-monthly');
        if (monthlyVal) el.textContent = monthlyVal;
      });

      noteEls.forEach(el => {
        const monthlyNote = el.getAttribute('data-monthly');
        if (monthlyNote) el.textContent = monthlyNote;
      });
    }
  }

  switchBtn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    updatePricing();
    showToast(isAnnual ? 'Switched to Annual Fleet SLA (15% Saved)' : 'Switched to Monthly Fleet Retainer');
  });

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      if (isAnnual) {
        isAnnual = false;
        updatePricing();
      }
    });
  }

  if (labelAnnual) {
    labelAnnual.addEventListener('click', () => {
      if (!isAnnual) {
        isAnnual = true;
        updatePricing();
      }
    });
  }

  selectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan') || 'Commercial Fleet SLA';
      showToast(`Selected: ${planName}. Directing to Priority Bay booking...`);
    });
  });
}

/* ==========================================================================
   10. Interactive 800V Fleet Drivetrain & Diagnostic Matrix (Home 2 Hero)
   ========================================================================== */
function initHome2FleetMatrix() {
  const tabs = document.querySelectorAll('.fleet-tab-btn');
  const modeTag = document.getElementById('fleet-readout-mode');
  const freqTag = document.getElementById('fleet-readout-freq');
  const stat1 = document.getElementById('fleet-stat-1');
  const sub1 = document.getElementById('fleet-sub-1');
  const stat2 = document.getElementById('fleet-stat-2');
  const sub2 = document.getElementById('fleet-sub-2');
  const stat3 = document.getElementById('fleet-stat-3');
  const sub3 = document.getElementById('fleet-sub-3');
  const stat4 = document.getElementById('fleet-stat-4');
  const sub4 = document.getElementById('fleet-sub-4');
  const displayCard = document.getElementById('fleet-matrix-display');

  const fleetData = {
    transit: {
      mode: 'MODE: HEAVY DIESEL & HYBRID TRANSPORT (24V/48V)',
      freq: 'J1939 BUS @ 500 KBPS',
      s1: 'Delco 55SI • 430A Peak',
      sub1: 'Under 1,200A Dyno Load',
      s2: '> 3,500 MΩ (0.000 mA)',
      sub2: 'Aerospace Ground Sentry',
      s3: '2.5V Bias • 0 Error Frames',
      sub3: 'Microsecond Packet Trace',
      s4: 'ΔV < 0.002V Per Cell',
      sub4: '192S Pack Equalized'
    },
    ev800: {
      mode: 'MODE: 800V COMMERCIAL EV & DELIVERY VANS',
      freq: 'ISO 15118 & CAN-FD @ 2 MBPS',
      s1: 'Inverter Overhaul • 98.6% Eff',
      sub1: 'Silicon Carbide (SiC) Stage',
      s2: '> 5,000 MΩ @ 1,000V DC',
      sub2: 'Chassis HV Isolation Certified',
      s3: 'CCS2 / MCS Fast Charge Sync',
      sub3: '350 kW DC Fast-Gate Verified',
      s4: 'Multi-Cell Pack SOH: 99.4%',
      sub4: 'Thermal Variance < 1.2°C'
    },
    alternator: {
      mode: 'MODE: HIGH-OUTPUT COMPONENT DYNO REBUILD',
      freq: 'DYNO BENCH TEST @ 8,000 RPM',
      s1: 'Prestolite 450A Dyno Certified',
      sub1: 'Continuous Heat Run Passed',
      s2: 'Diode Pack Leakage: 0.000 mA',
      sub2: 'Avalanche Diode Stress Tested',
      s3: 'Rotor Balancing < 0.1g-mm',
      sub3: 'Laser Dynamic Alignment',
      s4: 'Brushless Stator Overhaul',
      sub4: 'OEM Flash & Re-wound Rig'
    }
  };

  if (!tabs.length || !modeTag || !stat1) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-fleet-mode');
      if (!fleetData[mode]) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (displayCard) {
        displayCard.style.opacity = '0.35';
        displayCard.style.transform = 'translateY(2px)';
        displayCard.style.transition = 'all 0.15s ease';

        setTimeout(() => {
          modeTag.textContent = fleetData[mode].mode;
          freqTag.textContent = fleetData[mode].freq;
          stat1.textContent = fleetData[mode].s1;
          sub1.textContent = fleetData[mode].sub1;
          stat2.textContent = fleetData[mode].s2;
          sub2.textContent = fleetData[mode].sub2;
          stat3.textContent = fleetData[mode].s3;
          sub3.textContent = fleetData[mode].sub3;
          stat4.textContent = fleetData[mode].s4;
          sub4.textContent = fleetData[mode].sub4;

          displayCard.style.opacity = '1';
          displayCard.style.transform = 'translateY(0)';
        }, 130);
      }
    });
  });
}


