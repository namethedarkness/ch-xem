/*
 * ============================================================
 * products.js — Render Sản Phẩm, Bộ Lọc, Phân Trang
 * ============================================================
 * Phụ thuộc: data.js, images-svg.js, cart.js, main.js
 *
 * LUỒNG HOẠT ĐỘNG:
 *   1. initProductsPage() → đọc URL params → renderFilterSidebar() → renderProducts()
 *   2. User click filter → filterState thay đổi → renderProducts() lại
 *   3. renderProducts() → getFilteredProducts() → sort → phân trang → DOM
 * ============================================================
 */

/* ──────────────────────────────────────────
   TRẠNG THÁI BỘ LỌC (toàn cục cho trang products)
   ────────────────────────────────────────── */
let filterState = {
  rooms:    [],      // Mảng room ID đang lọc VD: ['phong-khach','phong-ngu']
  styles:   [],      // Mảng style ID VD: ['hien-dai','co-dien']
  materials:[],      // Mảng material ID VD: ['go-soi','vai']
  priceMin: 0,       // Giá tối thiểu (VNĐ)
  priceMax: 50000000,// Giá tối đa (VNĐ) — 50 triệu
  search:   '',      // Từ khóa tìm kiếm
  sort:     'default',// Cách sắp xếp
  page:     1,       // Trang hiện tại (bắt đầu từ 1)
  perPage:  12,      // Số sản phẩm mỗi trang
  view:     'grid',  // Kiểu hiển thị: 'grid' hoặc 'list'
};

/* ──────────────────────────────────────────
   KHỞI TẠO TRANG SẢN PHẨM
   ────────────────────────────────────────── */
function initProductsPage() {
  /* Đọc tham số từ URL để filter trực tiếp
     VD: products.html?room=phong-khach&style=hien-dai */
  const params = new URLSearchParams(window.location.search);
  if (params.get('room'))   filterState.rooms   = [params.get('room')];
  if (params.get('style'))  filterState.styles  = [params.get('style')];
  if (params.get('search')) filterState.search  = params.get('search');

  renderFilterSidebar();  // Vẽ sidebar bộ lọc
  syncFilterUI();          // Đồng bộ trạng thái checkbox theo filterState
  renderProducts();        // Render sản phẩm lần đầu
  attachToolbarEvents();   // Gắn sự kiện sort + view

  /* Nút filter dành cho mobile */
  const filterMobileBtn = document.getElementById('filter-mobile-btn');
  const filterSidebar   = document.querySelector('.filter-sidebar');
  filterMobileBtn?.addEventListener('click', () => {
    filterSidebar?.classList.add('mobile-open');
    document.body.style.overflow = 'hidden'; // Khóa scroll trang
  });

  /* Đóng filter mobile khi click ra ngoài */
  document.addEventListener('click', e => {
    if (filterSidebar?.classList.contains('mobile-open') &&
        !filterSidebar.contains(e.target) &&
        !filterMobileBtn?.contains(e.target)) {
      filterSidebar.classList.remove('mobile-open');
      document.body.style.overflow = '';
    }
  });
}

/* ──────────────────────────────────────────
   LỌC & SẮP XẾP SẢN PHẨM
   ────────────────────────────────────────── */
function getFilteredProducts() {
  let list = [...PRODUCTS]; // Sao chép mảng gốc, không sửa PRODUCTS

  // ── Lọc theo phòng ──
  if (filterState.rooms.length > 0)
    list = list.filter(p => filterState.rooms.includes(p.room));

  // ── Lọc theo phong cách ──
  if (filterState.styles.length > 0)
    list = list.filter(p => filterState.styles.includes(p.style));

  // ── Lọc theo vật liệu (sản phẩm có ÍT NHẤT 1 vật liệu khớp) ──
  if (filterState.materials.length > 0)
    list = list.filter(p => p.materials.some(m => filterState.materials.includes(m)));

  // ── Lọc theo khoảng giá (dùng basePrice làm cơ sở) ──
  list = list.filter(p =>
    p.basePrice >= filterState.priceMin && p.basePrice <= filterState.priceMax
  );

  // ── Tìm kiếm text (tên, phòng, phong cách, mô tả) ──
  if (filterState.search) {
    const q = filterState.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.roomLabel.toLowerCase().includes(q) ||
      p.styleLabel.toLowerCase().includes(q) ||
      (p.description||'').toLowerCase().includes(q)
    );
  }

  // ── Sắp xếp theo lựa chọn ──
  switch (filterState.sort) {
    case 'price-asc':  list.sort((a,b) => a.basePrice - b.basePrice); break;
    case 'price-desc': list.sort((a,b) => b.basePrice - a.basePrice); break;
    case 'name-asc':   list.sort((a,b) => a.name.localeCompare(b.name,'vi')); break;
    case 'rating':     list.sort((a,b) => b.rating - a.rating);       break;
    case 'reviews':    list.sort((a,b) => b.reviews - a.reviews);     break;
    // 'default': giữ thứ tự id tăng dần
  }
  return list;
}

/* ──────────────────────────────────────────
   RENDER DANH SÁCH SẢN PHẨM RA DOM
   ────────────────────────────────────────── */
function renderProducts() {
  const grid    = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  if (!grid) return;

  const all   = getFilteredProducts();   // Tất cả sau lọc
  const total = all.length;
  // Cắt theo trang: page 1 = [0..11], page 2 = [12..23]...
  const start = (filterState.page - 1) * filterState.perPage;
  const paged = all.slice(start, start + filterState.perPage);

  // Cập nhật số đếm
  if (countEl)
    countEl.innerHTML = `Hiển thị <strong>${start+1}–${Math.min(start+paged.length,total)}</strong> / <strong>${total}</strong> sản phẩm`;

  // Trường hợp không có kết quả
  if (paged.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;padding:60px 20px;">
        <div style="font-size:72px;text-align:center;margin-bottom:16px;">🔍</div>
        <h3 style="text-align:center;color:var(--c-text-light)">Không tìm thấy sản phẩm</h3>
        <p style="text-align:center;color:var(--c-text-muted);margin:8px 0 20px">Thử thay đổi bộ lọc hoặc từ khóa</p>
        <div style="text-align:center">
          <button class="btn btn-secondary" onclick="resetAllFilters()">Xóa bộ lọc</button>
        </div>
      </div>`;
    renderPagination(0);
    renderActiveTags();
    return;
  }

  // Render HTML tất cả card
  grid.innerHTML = paged.map(p => renderProductCard(p)).join('');

  // Áp dụng class view (grid hoặc list)
  grid.className = `products-grid${filterState.view === 'list' ? ' list-view' : ''}`;

  renderPagination(total);
  renderActiveTags();
  attachCardEvents(); // Gắn click events
}

/* ──────────────────────────────────────────
   RENDER 1 CARD SẢN PHẨM
   ────────────────────────────────────────── */
function renderProductCard(p) {
  // Tính khoảng giá từ tất cả sizes
  const prices   = p.sizes.map(s => s.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceStr = minPrice === maxPrice
    ? formatPrice(minPrice)
    : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`;

  // Badge HTML (Bán Chạy / Mới / Sale...)
  const badgeHtml = p.badge
    ? `<span class="badge badge-${p.badgeType||'new'}" style="font-size:10px;">${p.badge}</span>` : '';

  // Render 5 sao đánh giá
  const starsHtml = Array.from({length:5}, (_, i) =>
    `<span class="star${i < Math.floor(p.rating) ? ' filled' : ''}">★</span>`
  ).join('');

  // Lấy hình SVG mẫu từ images-svg.js (tự động chọn đúng loại sản phẩm)
const imgHtml = `
  <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
`;

  return `
  <div class="product-card" data-id="${p.id}">

    <!-- ── Wrapper hình ảnh ── -->
    <div class="product-img-wrap">

      ${imgHtml}

      <!-- Badge góc trên trái -->
      <div class="product-badges">${badgeHtml}</div>

      <!-- Nút yêu thích góc trên phải -->
      <button class="product-wishlist" data-id="${p.id}" title="Thêm vào yêu thích">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="var(--c-text-muted)" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>

      <!-- Overlay hiện khi hover: 2 nút Xem nhanh & Thêm giỏ -->
      <div class="product-actions-overlay">
        <button class="product-quick-view" data-id="${p.id}">👁 Xem nhanh</button>
        <button class="product-quick-add"  data-id="${p.id}">🛒 Thêm giỏ</button>
      </div>
    </div>

    <!-- ── Thông tin sản phẩm ── -->
    <div class="product-body">
      <!-- Tag phòng (màu xanh nhỏ phía trên tên) -->
      <div class="product-room-tag">${p.roomLabel}</div>

      <!-- Tên sản phẩm — click đi trang detail -->
      <a class="product-name" href="product-detail.html?id=${p.id}">${p.name}</a>

      <!-- Mô tả ngắn (chỉ hiện ở list-view) -->
      <p class="product-desc-short">${(p.description||'').substring(0,90)}...</p>

      <!-- Tag phong cách + Rating -->
      <div class="product-meta">
        <span class="product-style-tag">${p.styleLabel}</span>
        <div class="product-rating">
          <span class="star-rating" style="color:#F5A623;font-size:12px">${starsHtml}</span>
          <span>${p.rating} (${p.reviews})</span>
        </div>
      </div>

      <!-- Giá + Nút chọn mua -->
      <div class="product-price-row">
        <div>
          <div class="text-price">${priceStr}</div>
          <div class="product-size-hint">${p.sizes.length} kích thước</div>
        </div>
        <a href="product-detail.html?id=${p.id}" class="btn btn-primary btn-sm">Chọn mua</a>
      </div>
    </div>
  </div>`;
}

/* ──────────────────────────────────────────
   GẮN SỰ KIỆN CHO CARD (click thêm giỏ, wishlist)
   ────────────────────────────────────────── */
function attachCardEvents() {

  /* Nút "Thêm giỏ hàng nhanh" — thêm size mặc định, vật liệu mặc định */
  document.querySelectorAll('.product-quick-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation(); // Không lan ra card cha
      const id = parseInt(btn.dataset.id);
      const p  = getProductById(id);
      if (!p) return;

      // Lấy size đầu tiên và vật liệu mặc định
      const result = CartManager.addItem({
        productId:     p.id,
        productName:   p.name,
        image:         p.image,
        size:          p.sizes[0].label,
        sizeLabel:     p.sizes[0].label,
        material:      p.defaultMaterial,
        materialLabel: getMaterialById(p.defaultMaterial)?.label || '',
        price:         p.sizes[0].price,
        room:          p.room,
        style:         p.styleLabel,
      });
      showToast(result.message, 'success');
    });
  });

  /* Nút yêu thích — toggle trạng thái */
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.classList.toggle('wishlisted');
      const wished = btn.classList.contains('wishlisted');
      const path   = btn.querySelector('path');
      if (path) {
        path.setAttribute('fill',   wished ? 'var(--c-error)' : 'none');
        path.setAttribute('stroke', wished ? 'var(--c-error)' : 'var(--c-text-muted)');
      }
      showToast(wished ? 'Đã thêm vào yêu thích ❤️' : 'Đã xóa khỏi yêu thích', wished?'success':'info');
    });
  });

  /* Nút xem nhanh — điều hướng sang trang detail */
  document.querySelectorAll('.product-quick-view').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      window.location.href = `product-detail.html?id=${btn.dataset.id}`;
    });
  });
}

/* ──────────────────────────────────────────
   PAGINATION — Phân Trang
   ────────────────────────────────────────── */
function renderPagination(total) {
  const el = document.getElementById('pagination');
  if (!el) return;
  const totalPages = Math.ceil(total / filterState.perPage);
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  let html = `<button class="page-btn" onclick="changePage(${filterState.page-1})"
    ${filterState.page===1?'disabled':''}>‹</button>`;

  for (let i = 1; i <= totalPages; i++) {
    // Hiện trang 1, trang cuối, và 2 trang gần trang hiện tại
    if (i===1 || i===totalPages || Math.abs(i-filterState.page) <= 1) {
      html += `<button class="page-btn ${i===filterState.page?'active':''}"
        onclick="changePage(${i})">${i}</button>`;
    } else if (Math.abs(i-filterState.page) === 2) {
      html += `<span style="padding:0 4px;color:var(--c-text-muted)">…</span>`;
    }
  }
  html += `<button class="page-btn" onclick="changePage(${filterState.page+1})"
    ${filterState.page===totalPages?'disabled':''}>›</button>`;
  el.innerHTML = html;
}

function changePage(n) {
  const max = Math.ceil(getFilteredProducts().length / filterState.perPage);
  if (n < 1 || n > max) return;
  filterState.page = n;
  renderProducts();
  // Scroll lên đầu danh sách
  document.querySelector('.products-main')?.scrollIntoView({behavior:'smooth',block:'start'});
}

/* ──────────────────────────────────────────
   RENDER FILTER SIDEBAR
   ────────────────────────────────────────── */
function renderFilterSidebar() {
  const sidebar = document.getElementById('filter-sidebar-content');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <!-- ── Bộ lọc PHÒNG ── -->
    <div class="filter-group open" id="fg-room">
      <div class="filter-group-head" onclick="toggleGroup('fg-room')">
        <span class="filter-group-title">Phòng</span>
        <span class="filter-chevron">▾</span>
      </div>
      <div class="filter-group-body">
        ${ROOMS.map(r => `
          <label class="filter-item ${filterState.rooms.includes(r.id)?'checked':''}"
            data-type="room" data-value="${r.id}">
            <div class="filter-checkbox"></div>
            <span class="filter-item-label">${r.label}</span>
            <span class="filter-item-count">${r.count}</span>
          </label>`).join('')}
      </div>
    </div>

    <!-- ── Bộ lọc PHONG CÁCH ── -->
    <div class="filter-group open" id="fg-style">
      <div class="filter-group-head" onclick="toggleGroup('fg-style')">
        <span class="filter-group-title">Phong Cách</span>
        <span class="filter-chevron">▾</span>
      </div>
      <div class="filter-group-body">
        ${STYLES.map(s => `
          <label class="filter-item ${filterState.styles.includes(s.id)?'checked':''}"
            data-type="style" data-value="${s.id}">
            <div class="filter-checkbox"></div>
            <span class="filter-item-label" style="display:flex;align-items:center;gap:6px">
              <span style="width:10px;height:10px;border-radius:50%;background:${s.color};flex-shrink:0"></span>
              ${s.label}
            </span>
          </label>`).join('')}
      </div>
    </div>

    <!-- ── Bộ lọc KHOẢNG GIÁ ── -->
    <div class="filter-group open" id="fg-price">
      <div class="filter-group-head" onclick="toggleGroup('fg-price')">
        <span class="filter-group-title">Khoảng Giá</span>
        <span class="filter-chevron">▾</span>
      </div>
      <div class="filter-group-body">
        <div class="price-range-wrap">
          <!-- Hiển thị min–max -->
          <div class="price-range-display">
            <span id="price-min-display">${formatPrice(filterState.priceMin)}</span>
            <span id="price-max-display">${formatPrice(filterState.priceMax)}</span>
          </div>
          <!-- Thanh kéo giá (range input) -->
          <input type="range" id="price-range"
            min="0" max="50000000" step="500000" value="${filterState.priceMax}"/>
        </div>
        <!-- Nút lọc nhanh theo khoảng giá -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:10px">
          ${[
            {l:'Dưới 2 triệu', max:2000000},
            {l:'2 – 5 triệu',  max:5000000},
            {l:'5 – 10 triệu', max:10000000},
            {l:'Trên 10 triệu',max:50000000},
          ].map(r=>`
            <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:6px 4px;text-align:center"
              onclick="setPriceRange(0,${r.max})">${r.l}</button>`
          ).join('')}
        </div>
      </div>
    </div>

    <!-- ── Bộ lọc VẬT LIỆU ── -->
    <div class="filter-group" id="fg-material">
      <div class="filter-group-head" onclick="toggleGroup('fg-material')">
        <span class="filter-group-title">Vật Liệu</span>
        <span class="filter-chevron">▾</span>
      </div>
      <div class="filter-group-body">
        ${MATERIALS.map(m => `
          <label class="filter-item ${filterState.materials.includes(m.id)?'checked':''}"
            data-type="material" data-value="${m.id}">
            <div class="filter-checkbox"></div>
            <!-- Chip màu vật liệu -->
            <span style="width:13px;height:13px;border-radius:50%;background:${m.color};
              border:1px solid rgba(0,0,0,.15);flex-shrink:0"></span>
            <span class="filter-item-label">${m.label}</span>
          </label>`).join('')}
      </div>
    </div>`;

  /* Gắn sự kiện click cho từng item filter */
  sidebar.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', () => {
      const type  = item.dataset.type;
      const value = item.dataset.value;
      item.classList.toggle('checked');
      const isChecked = item.classList.contains('checked');

      // Cập nhật filterState theo loại filter
      if (type === 'room') {
        isChecked
          ? filterState.rooms.push(value)
          : (filterState.rooms = filterState.rooms.filter(v => v !== value));
      } else if (type === 'style') {
        isChecked
          ? filterState.styles.push(value)
          : (filterState.styles = filterState.styles.filter(v => v !== value));
      } else if (type === 'material') {
        isChecked
          ? filterState.materials.push(value)
          : (filterState.materials = filterState.materials.filter(v => v !== value));
      }

      filterState.page = 1; // Reset về trang 1 khi đổi filter
      renderProducts();
    });
  });

  /* Thanh kéo giá max */
  document.getElementById('price-range')?.addEventListener('input', e => {
    filterState.priceMax = parseInt(e.target.value);
    document.getElementById('price-max-display').textContent = formatPrice(filterState.priceMax);
    filterState.page = 1;
    renderProducts();
  });
}

/* Toggle đóng/mở nhóm filter */
function toggleGroup(id) {
  document.getElementById(id)?.classList.toggle('open');
}

/* Đặt khoảng giá từ nút nhanh */
function setPriceRange(min, max) {
  filterState.priceMin = min;
  filterState.priceMax = max;
  const s = document.getElementById('price-range');
  if (s) s.value = max;
  document.getElementById('price-min-display').textContent = formatPrice(min);
  document.getElementById('price-max-display').textContent = formatPrice(max);
  filterState.page = 1;
  renderProducts();
}

/* ──────────────────────────────────────────
   TAGS FILTER ACTIVE (hiện tag có thể xóa)
   ────────────────────────────────────────── */
function renderActiveTags() {
  const container = document.getElementById('active-filter-tags');
  if (!container) return;

  // Xây dựng danh sách tag đang active
  const tags = [];
  filterState.rooms.forEach(r => {
    const room = ROOMS.find(x => x.id === r);
    if (room) tags.push({ label: '🏠 '+room.label, remove: () => { filterState.rooms = filterState.rooms.filter(v=>v!==r); }});
  });
  filterState.styles.forEach(s => {
    const style = STYLES.find(x => x.id === s);
    if (style) tags.push({ label: style.label, remove: () => { filterState.styles = filterState.styles.filter(v=>v!==s); }});
  });
  filterState.materials.forEach(m => {
    const mat = MATERIALS.find(x => x.id === m);
    if (mat) tags.push({ label: mat.label, remove: () => { filterState.materials = filterState.materials.filter(v=>v!==m); }});
  });
  if (filterState.priceMax < 50000000)
    tags.push({ label: `≤ ${formatPrice(filterState.priceMax)}`, remove: () => { filterState.priceMax = 50000000; }});

  // Render tags HTML
  container.innerHTML = tags.map((t, i) => `
    <span class="filter-tag">
      ${t.label}
      <span class="filter-tag-remove" data-idx="${i}">×</span>
    </span>`).join('');

  // Sự kiện xóa tag
  container.querySelectorAll('.filter-tag-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      tags[idx]?.remove();
      filterState.page = 1;
      syncFilterUI();
      renderProducts();
    });
  });
}

/* Đồng bộ UI checkbox với filterState (khi load trang hoặc xóa tag) */
function syncFilterUI() {
  document.querySelectorAll('.filter-item').forEach(item => {
    const type = item.dataset.type, val = item.dataset.value;
    item.classList.toggle('checked',
      (type==='room'     && filterState.rooms.includes(val))     ||
      (type==='style'    && filterState.styles.includes(val))    ||
      (type==='material' && filterState.materials.includes(val))
    );
  });
}

/* Reset toàn bộ filter về mặc định */
function resetAllFilters() {
  Object.assign(filterState, { rooms:[], styles:[], materials:[], priceMin:0, priceMax:50000000, search:'', page:1 });
  const s = document.getElementById('price-range');
  if (s) s.value = 50000000;
  syncFilterUI();
  renderProducts();
}

/* ──────────────────────────────────────────
   TOOLBAR: Sort + View toggle
   ────────────────────────────────────────── */
function attachToolbarEvents() {
  // Dropdown sắp xếp
  document.getElementById('sort-select')?.addEventListener('change', e => {
    filterState.sort = e.target.value;
    filterState.page = 1;
    renderProducts();
  });

  // Nút toggle grid/list
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.view = btn.dataset.view;
      renderProducts();
    });
  });
}

/* ──────────────────────────────────────────
   TRANG CHỦ — Render sản phẩm + room categories
   ────────────────────────────────────────── */
function initHomePage() {
  renderHomeProducts();
  renderRoomCategories();
}

function renderHomeProducts() {
  const grid = document.getElementById('featured-products-grid');
  if (!grid) return;
  // Lấy 8 sản phẩm nổi bật đầu tiên
  const featured = getFeaturedProducts().slice(0, 8);
  grid.innerHTML  = featured.map(p => renderProductCard(p)).join('');
  attachCardEvents();
}

function renderRoomCategories() {
  const grid = document.getElementById('room-categories-grid');
  if (!grid) return;
  // Map icon SVG cho từng phòng
  const roomIcons = {
    'phong-khach':    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="10" width="4" height="8" rx="1"/><rect x="19" y="10" width="4" height="8" rx="1"/><path d="M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3"/><path d="M5 14h14"/><path d="M5 18h14"/><line x1="8" y1="18" x2="8" y2="20"/><line x1="16" y1="18" x2="16" y2="20"/></svg>',
    'phong-ngu':      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20v-8"/><path d="M22 20v-8"/><path d="M2 14h20"/><path d="M2 12c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4"/><rect x="6" y="9" width="4" height="3" rx="1"/></svg>',
    'phong-bep':      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><circle cx="7" cy="14" r="2"/><circle cx="13" cy="14" r="2"/><line x1="19" y1="12" x2="19" y2="18"/></svg>',
    'nha-ve-sinh':    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z"/><path d="M4 12V6a2 2 0 012-2h2a2 2 0 012 2v6"/><line x1="8" y1="20" x2="8" y2="22"/><line x1="16" y1="20" x2="16" y2="22"/></svg>',
    'phong-lam-viec': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="18" x2="8" y2="20"/><line x1="16" y1="18" x2="16" y2="20"/><line x1="6" y1="20" x2="18" y2="20"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    'ban-cong':       '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a7 7 0 00-7 7c0 4.4 7 13 7 13s7-8.6 7-13a7 7 0 00-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  };

  grid.innerHTML = ROOMS.map(r => `
    <div class="room-card" onclick="window.location.href='products.html?room=${r.id}'">
      <div class="room-icon" style="color:var(--c-blue-mid)">
        ${roomIcons[r.id] || '🪑'}
      </div>
      <span class="room-name">${r.label}</span>
      <span class="room-count">${r.count} sản phẩm</span>
    </div>`).join('');
}

/* ──────────────────────────────────────────
   KHỞI TẠO KHI DOM SẴN SÀNG
   ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('products-grid'))          initProductsPage();
  if (document.getElementById('featured-products-grid')) initHomePage();
});
