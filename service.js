/**
 * VoltEdge Auto Electrical - Services Page Logic (service.js)
 * Implements:
 * - Theme Switcher (Dark & Light Mode) with Local Storage Persistence
 * - RTL / LTR Toggle with Indicator Sync
 * - Mobile Navigation Menu
 * - Category Filter for 6 Services Cards
 * - Works Gallery Filtering & Lightbox Preview
 * - Interactive Accordion FAQs
 * - Modals (Login, Booking Dialog) & Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initMobileNavigation();
  initServiceFilters();
  initCockpitNavigation();
  initGalleryFiltersAndLightbox();
  initFaqAccordion();
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
   4. Services Cards Category Filter
   ========================================================================== */
function initServiceFilters() {
  const filterTabs = document.querySelectorAll('#service-filter-tabs .filter-tab');
  const cards = document.querySelectorAll('.service-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Works Gallery Filtering & Lightbox Preview
   ========================================================================== */
function initGalleryFiltersAndLightbox() {
  const galleryTabs = document.querySelectorAll('#gallery-filter-tabs .gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightboxBtn = document.getElementById('close-lightbox');

  // Filter functionality
  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '1';
          }, 20);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      const desc = item.querySelector('.gallery-desc')?.textContent || '';

      if (lightboxModal && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption) {
          lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size:0.88rem;color:var(--color-secondary-light);">${desc}</span>`;
        }
        lightboxModal.classList.add('open');
        lightboxModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('open');
      lightboxModal.setAttribute('aria-hidden', 'true');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
        lightboxModal.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

/* ==========================================================================
   6. FAQs Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherHeader = otherItem.querySelector('.faq-accordion-header');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* ==========================================================================
   7. Modals (Login & Booking)
   ========================================================================== */
function initModals() {
  // Login Modal
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

  // Booking Modal
  const bookBayBtn = document.getElementById('cta-book-appointment-btn');
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingModal = document.getElementById('close-booking-modal');
  const bookingForm = document.getElementById('booking-form');

  if (bookBayBtn && bookingModal) {
    bookBayBtn.addEventListener('click', () => {
      bookingModal.classList.add('open');
      bookingModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeBookingModal && bookingModal) {
    closeBookingModal.addEventListener('click', () => {
      bookingModal.classList.remove('open');
      bookingModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const serviceSelect = document.getElementById('booking-service');
      const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
      bookingModal.classList.remove('open');
      bookingModal.setAttribute('aria-hidden', 'true');
      showToast(`Priority Bay Booked for: ${serviceName.split('(')[0].trim()}`);
      bookingForm.reset();
    });
  }

  // Close modals on overlay click
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('open');
      loginModal.setAttribute('aria-hidden', 'true');
    }
    if (e.target === bookingModal) {
      bookingModal.classList.remove('open');
      bookingModal.setAttribute('aria-hidden', 'true');
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
   8. Toast Notification Utility
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

/* ==========================================================================
   9. Cockpit Quick-Navigator & Division Card Highlight
   ========================================================================== */
function initCockpitNavigation() {
  const cockpitTiles = document.querySelectorAll('.cockpit-tile');

  cockpitTiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
      const targetId = tile.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          // If the filter is active and hiding this card, reset filter to 'all'
          const filterTabs = document.querySelectorAll('.filter-tab');
          const allTab = document.querySelector('.filter-tab[data-filter="all"]');
          if (targetElement.classList.contains('hidden') && allTab) {
            filterTabs.forEach(tab => {
              tab.classList.remove('active');
              tab.setAttribute('aria-selected', 'false');
            });
            allTab.classList.add('active');
            allTab.setAttribute('aria-selected', 'true');
            document.querySelectorAll('.service-card').forEach(card => card.classList.remove('hidden'));
          }

          // Smooth scroll to card with header offset
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Apply luxury pulse glow effect to the card
          targetElement.classList.add('cockpit-highlight');
          setTimeout(() => {
            targetElement.classList.remove('cockpit-highlight');
          }, 2400);
        }
      }
    });
  });
}

