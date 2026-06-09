/* ============================================================
   main.js — Script Chung Cho Toàn Bộ Trang
   - Mobile menu
   - Hero slider (trang chủ)
   - Header scroll
   - Search dropdown
   - Page loader
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== PAGE LOADER ===== */
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }

  /* ===== MOBILE MENU ===== */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = mobileMenu?.querySelector('.mobile-overlay');
  const mobileClose = document.getElementById('mobile-close');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
  });

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileOverlay?.addEventListener('click', closeMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);

  /* ===== HERO SLIDER (Trang chủ) ===== */
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let currentSlide = 0;
  let sliderTimer = null;

  function goToSlide(n) {
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  function startSlider() {
    sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function resetSlider() {
    clearInterval(sliderTimer);
    startSlider();
  }

  if (slides.length > 0) {
    goToSlide(0);
    startSlider();
    prevBtn?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSlider(); });
    nextBtn?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSlider(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); resetSlider(); }));

    // Dừng slider khi hover
    const hero = document.querySelector('.hero');
    hero?.addEventListener('mouseenter', () => clearInterval(sliderTimer));
    hero?.addEventListener('mouseleave', startSlider);
  }

  /* ===== SEARCH DROPDOWN ===== */
  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');

  if (searchInput && searchDropdown) {
    let searchTimeout;

    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      const q = searchInput.value.trim().toLowerCase();

      if (!q || q.length < 2) {
        searchDropdown.classList.remove('show');
        return;
      }

      searchTimeout = setTimeout(() => {
        // Tìm kiếm trong PRODUCTS (đã khai báo trong data.js)
        const results = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : [])
          .filter(p => p.name.toLowerCase().includes(q) || p.roomLabel.toLowerCase().includes(q) || p.styleLabel.toLowerCase().includes(q))
          .slice(0, 6);

        if (results.length === 0) {
          searchDropdown.innerHTML = '<div class="search-no-result">Không tìm thấy sản phẩm phù hợp</div>';
        } else {
          searchDropdown.innerHTML = results.map(p => `
            <a class="search-result-item" href="product-detail.html?id=${p.id}">
              <div style="width:40px;height:40px;background:var(--c-steel-pale);border-radius:var(--r-sm);
                   display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">
                ${{ 'phong-khach':'🛋️','phong-ngu':'🛏️','phong-bep':'🍳','nha-ve-sinh':'🚿','phong-lam-viec':'🖥️','ban-cong':'🌿' }[p.room]||'🪑'}
              </div>
              <div>
                <div class="search-result-name">${highlightText(p.name, q)}</div>
                <div class="search-result-price">${formatPrice(p.basePrice)}</div>
              </div>
            </a>
          `).join('');
        }
        searchDropdown.classList.add('show');
      }, 250);
    });

    // Đóng khi click ra ngoài
    document.addEventListener('click', e => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('show');
      }
    });

    // Enter → sang trang sản phẩm
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }

  /* ===== ACTIVE NAV LINK ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ===== ROOM CATEGORY CLICK → PRODUCTS PAGE ===== */
  document.querySelectorAll('.room-card[data-room]').forEach(card => {
    card.addEventListener('click', () => {
      const room = card.dataset.room;
      window.location.href = `products.html?room=${room}`;
    });
    card.style.cursor = 'pointer';
  });

  /* ===== STYLE CARD CLICK → PRODUCTS PAGE ===== */
  document.querySelectorAll('.style-card[data-style]').forEach(card => {
    card.addEventListener('click', () => {
      const style = card.dataset.style;
      window.location.href = `products.html?style=${style}`;
    });
  });

  /* ===== NEWSLETTER FORM ===== */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]')?.value;
      if (!email) return;
      showToast('Đăng ký thành công! Cảm ơn bạn 🎉', 'success', 4000);
      newsletterForm.reset();
    });
  }

  /* ===== SCROLL TO TOP BUTTON ===== */
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
      scrollTopBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===== ADMIN SIDEBAR MOBILE TOGGLE ===== */
  const adminMenuBtn = document.getElementById('admin-menu-btn');
  const adminSidebar = document.querySelector('.admin-sidebar');
  if (adminMenuBtn && adminSidebar) {
    adminMenuBtn.addEventListener('click', () => {
      adminSidebar.classList.toggle('mobile-open');
    });
  }
});

/* ===== HELPERS ===== */

// Tô màu chữ tìm kiếm
function highlightText(text, query) {
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark style="background:var(--c-sky);color:var(--c-navy);border-radius:2px;padding:0 2px;">$1</mark>');
}

// Debounce utility
function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// Tạo SVG icon inline
const ICONS = {
  cart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  sofa: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="10" width="4" height="8" rx="1"/><rect x="19" y="10" width="4" height="8" rx="1"/><path d="M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3"/><path d="M5 14h14"/><path d="M5 18h14"/><line x1="8" y1="18" x2="8" y2="20"/><line x1="16" y1="18" x2="16" y2="20"/></svg>`,
  bed: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20v-8"/><path d="M22 20v-8"/><path d="M2 14h20"/><path d="M2 12c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4"/><rect x="6" y="9" width="4" height="3" rx="1"/></svg>`,
  kitchen: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><circle cx="8" cy="14" r="2"/><circle cx="14" cy="14" r="2"/><line x1="18" y1="12" x2="18" y2="18"/></svg>`,
  bath: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z"/><path d="M4 12V6a2 2 0 012-2h2a2 2 0 012 2v6"/><line x1="8" y1="20" x2="8" y2="22"/><line x1="16" y1="20" x2="16" y2="22"/></svg>`,
  office: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="18" x2="8" y2="20"/><line x1="16" y1="18" x2="16" y2="20"/><line x1="6" y1="20" x2="18" y2="20"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
  outdoor: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a7 7 0 00-7 7c0 4.4 7 13 7 13s7-8.6 7-13a7 7 0 00-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
  filter: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  truck: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8a16 16 0 006 6l.35-.35a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  tag: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  zoom: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  list: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  grid: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
  voucher: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"/><rect x="2" y="6" width="20" height="6"/><path d="M12 6V2"/><path d="M12 18v-6"/></svg>`,
  invoice: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  logout: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
};

function getIcon(name, size = 20, color = 'currentColor') {
  const iconStr = ICONS[name] || '';
  return iconStr.replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
}

/* Tạo sao đánh giá */
function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star${i < Math.floor(rating) ? ' filled' : ''}">${ICONS.star}</span>`
  ).join('');
}
