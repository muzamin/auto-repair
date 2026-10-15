/**
 * VOLTERRA Auto Electrical - Technology Page Logic (technology.js)
 * Implements:
 * - Theme Switcher (Dark & Light Mode) with Local Storage Persistence
 * - RTL / LTR Layout Direction Switcher with Indicator Sync
 * - Responsive Mobile Navigation Drawer
 * - Diagnostic Check Booking Modal
 * - Customer Portal Login Modal with Eye Toggle
 * - Toast Notification Feedback Utility
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileNavigation();
  initModals();
  initToast();
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
   4. Modals (Diagnostic Check & Login)
   ========================================================================== */
function initModals() {
  // Diagnostic Check Booking Modal
  const diagModal = document.getElementById('diag-check-modal');
  const closeDiagModalBtn = document.getElementById('close-diag-modal');
  const diagForm = document.getElementById('diag-check-form');
  const diagSystemSelect = document.getElementById('diag-system');

  window.openDiagCheckModal = function(systemArea) {
    if (diagSystemSelect && systemArea) {
      diagSystemSelect.value = systemArea;
    }
    if (diagModal) {
      diagModal.classList.add('open');
      diagModal.setAttribute('aria-hidden', 'false');
    }
  };

  if (closeDiagModalBtn && diagModal) {
    closeDiagModalBtn.addEventListener('click', () => {
      diagModal.classList.remove('open');
      diagModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (diagForm) {
    diagForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const systemName = diagSystemSelect ? diagSystemSelect.options[diagSystemSelect.selectedIndex].text : 'Diagnostic Check';
      diagModal.classList.remove('open');
      diagModal.setAttribute('aria-hidden', 'true');
      showToast(`Diagnostic Bay Reserved for: ${systemName}`);
      diagForm.reset();
    });
  }

  // Customer Login Modal
  const headerLoginBtn = document.getElementById('header-login-btn');
  const loginModal = document.getElementById('login-modal');
  const closeLoginModal = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');
  const togglePassBtn = document.getElementById('toggle-password-visibility');
  const passInput = document.getElementById('login-password');

  if (headerLoginBtn && loginModal) {
    headerLoginBtn.addEventListener('click', () => {
      loginModal.classList.add('open');
      loginModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeLoginModal && loginModal) {
    closeLoginModal.addEventListener('click', () => {
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passInput.setAttribute('type', type);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
      showToast('Successfully signed in to customer portal');
      loginForm.reset();
    });
  }

  // Close modals on overlay backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === diagModal) {
      diagModal.classList.remove('open');
      diagModal.setAttribute('aria-hidden', 'true');
    }
    if (e.target === loginModal) {
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
    }
  });

  // ESC key listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
    }
  });
}

/* ==========================================================================
   5. Toast Notification Utility
   ========================================================================== */
function initToast() {
  window.showToast = function(message) {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');

      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  };
}
