/**
 * VOLTERRA Auto Electrical - Pricing Page Logic (pricing.js)
 * Implements:
 * - Theme Switcher (Dark & Light Mode) with Local Storage Persistence
 * - RTL / LTR Toggle with Indicator Sync
 * - Mobile Navigation Menu
 * - FAQ Accordion with smooth height transitions
 * - Interactive Pricing Quote / Booking Modal with prefilled packages
 * - Customer Portal Login Modal with password toggle
 * - Notification Toast alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileNavigation();
  initPricingFaqAccordion();
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
   4. Pricing FAQs Accordion
   ========================================================================== */
function initPricingFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for clean accordion behavior
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   5. Interactive Modals (Quote & Customer Portal)
   ========================================================================== */
function initModals() {
  // Quote Modal elements
  const quoteModal = document.getElementById('pricing-quote-modal');
  const closeQuoteBtn = document.getElementById('close-quote-modal');
  const quoteForm = document.getElementById('pricing-quote-form');
  const quoteServiceSelect = document.getElementById('quote-service-select');

  // Login Modal elements
  const loginModal = document.getElementById('login-modal');
  const headerLoginBtn = document.getElementById('header-login-btn');
  const closeLoginBtn = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');
  const togglePassBtn = document.getElementById('toggle-password-visibility');
  const passwordInput = document.getElementById('login-password');

  // Close Quote Modal
  if (closeQuoteBtn && quoteModal) {
    closeQuoteBtn.addEventListener('click', () => {
      quoteModal.classList.remove('active');
      quoteModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Submit Quote Form
  if (quoteForm && quoteModal) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const serviceName = quoteServiceSelect ? quoteServiceSelect.value : 'Diagnostic Check';
      const customerName = document.getElementById('quote-name') ? document.getElementById('quote-name').value : 'Customer';
      quoteModal.classList.remove('active');
      quoteModal.setAttribute('aria-hidden', 'true');
      quoteForm.reset();
      showToast(`Thank you, ${customerName}! Your estimate request for "${serviceName}" has been received.`);
    });
  }

  // Open Login Modal
  if (headerLoginBtn && loginModal) {
    headerLoginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
      loginModal.setAttribute('aria-hidden', 'false');
    });
  }

  // Close Login Modal
  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Toggle Password Visibility
  if (togglePassBtn && passwordInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
    });
  }

  // Submit Login Form
  if (loginForm && loginModal) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
      loginForm.reset();
      showToast('Portal login session authenticated. Welcome back!');
    });
  }

  // Close modals on overlay backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === quoteModal) {
      quoteModal.classList.remove('active');
      quoteModal.setAttribute('aria-hidden', 'true');
    }
    if (e.target === loginModal) {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (quoteModal) {
        quoteModal.classList.remove('active');
        quoteModal.setAttribute('aria-hidden', 'true');
      }
      if (loginModal) {
        loginModal.classList.remove('active');
        loginModal.setAttribute('aria-hidden', 'true');
      }
    }
  });
}

// Global function to trigger Quote modal pre-filled
window.openPricingQuoteModal = function(packageName) {
  const quoteModal = document.getElementById('pricing-quote-modal');
  const quoteServiceSelect = document.getElementById('quote-service-select');

  if (quoteModal) {
    if (packageName && quoteServiceSelect) {
      // Find matching option
      for (let i = 0; i < quoteServiceSelect.options.length; i++) {
        if (quoteServiceSelect.options[i].value.includes(packageName) || packageName.includes(quoteServiceSelect.options[i].text.split('(')[0].trim())) {
          quoteServiceSelect.selectedIndex = i;
          break;
        }
      }
    }
    quoteModal.classList.add('active');
    quoteModal.setAttribute('aria-hidden', 'false');
  }
};

/* ==========================================================================
   6. Notification Toast Utility
   ========================================================================== */
function initToast() {
  // Toast container is in DOM
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4200);
  }
}
