/*
 * ============================================================
 * detail-auth-admin.js
 * Gộp 3 module: Chi Tiết SP · Xác Thực · Admin Dashboard
 * ============================================================
 * MODULE 1 — initDetailPage()  : Trang product-detail.html
 * MODULE 2 — AuthManager       : Login / Register / Session
 * MODULE 3 — AdminManager      : Dashboard / Products / Orders
 * ============================================================
 */

/* ╔══════════════════════════════════════════╗
   ║  MODULE 1: TRANG CHI TIẾT SẢN PHẨM      ║
   ╚══════════════════════════════════════════╝ */
(function initDetailPage() {
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('product-detail-page')) return;

    // Lấy ID từ URL: product-detail.html?id=1
    const id      = parseInt(new URLSearchParams(window.location.search).get('id'));
    const product = getProductById(id);

    if (!product) {
      document.getElementById('product-detail-page').innerHTML =
        `<div style="text-align:center;padding:80px 20px">
          <div style="font-size:64px">😕</div>
          <h2>Không tìm thấy sản phẩm</h2>
          <a href="products.html" class="btn btn-primary" style="margin-top:20px">← Xem tất cả</a>
        </div>`;
      return;
    }

    document.title = `${product.name} — IndigoSpace`;

    // Trạng thái lựa chọn của người dùng
    let selectedSizeIdx = 0;           // Index size đang chọn
    let selectedMaterial = product.defaultMaterial; // Material đang chọn
    let qty = 1;                       // Số lượng

    /* Tính giá hiện tại = giá size + chênh lệch vật liệu */
    function getPrice() {
      return calcProductPrice(product, selectedSizeIdx, selectedMaterial);
    }

    /* Cập nhật hiển thị giá khi đổi size / vật liệu */
    function updatePrice() {
      const el = document.getElementById('detail-price');
      if (el) el.textContent = formatPrice(getPrice());
    }

    /* Cập nhật label "Đang chọn: ..." */
    function updateLabel(id, val) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    /* ── Breadcrumb ── */
    const bc = document.getElementById('detail-breadcrumb');
    if (bc) bc.innerHTML = `
      <a href="index.html">Trang chủ</a>
      <span class="breadcrumb-sep">›</span>
      <a href="products.html?room=${product.room}">${product.roomLabel}</a>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-current">${product.name}</span>`;

    /* ── Badge & Room tag ── */
    const badgeEl = document.getElementById('detail-badge');
    if (badgeEl && product.badge)
      badgeEl.innerHTML = `<span class="badge badge-${product.badgeType||'new'}">${product.badge}</span>`;

    const roomEl = document.getElementById('detail-room-tag');
    if (roomEl) roomEl.textContent = product.roomLabel;

    /* ── Tên sản phẩm ── */
    const nameEl = document.getElementById('detail-name');
    if (nameEl) nameEl.textContent = product.name;

    /* ── Rating stars ── */
    const ratingEl = document.getElementById('detail-rating');
    if (ratingEl) {
      const stars = Array.from({length:5},(_,i)=>
        `<span style="color:${i<Math.floor(product.rating)?'#F5A623':'#ccc'};font-size:16px">★</span>`
      ).join('');
      ratingEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px">
          <span>${stars}</span>
          <strong style="color:var(--c-text-dark)">${product.rating}</strong>
          <span style="color:var(--c-text-muted)">(${product.reviews} đánh giá)</span>
        </div>`;
    }

    /* ── Gallery ── */
    const mainImg   = document.getElementById('gallery-main-img');
    const thumbWrap = document.getElementById('gallery-thumbs');
    const mainPlaceholder = document.getElementById('gallery-main-placeholder');

    /* Lấy SVG mẫu thay cho ảnh thật */
    const svgImgHTML = getProductImageHTML(product, 'gallery-main-img');
    if (mainImg && mainImg.parentElement) {
      mainImg.outerHTML = svgImgHTML; // Thay thế <img> bằng SVG
    }

    /* Thumbs: 4 ảnh nhỏ (dùng SVG placeholder) */
    if (thumbWrap) {
      thumbWrap.innerHTML = [0,1,2,3].map(i => `
        <div class="gallery-thumb ${i===0?'active':''}" data-idx="${i}">
          ${getProductImageHTML(product, '')}
        </div>`).join('');
      thumbWrap.querySelectorAll('.gallery-thumb').forEach(t => {
        t.addEventListener('click', () => {
          thumbWrap.querySelectorAll('.gallery-thumb').forEach(x=>x.classList.remove('active'));
          t.classList.add('active');
        });
      });
    }

    /* ── Giá hiển thị ── */
    updatePrice();

    /* ── Chọn Size ── */
    const sizeContainer = document.getElementById('size-options');
    if (sizeContainer) {
      sizeContainer.innerHTML = product.sizes.map((s,i) => `
        <button class="option-btn ${i===0?'selected':''}" data-size="${i}">
          ${s.label}
          <small style="display:block;font-size:10px;margin-top:2px;font-weight:400;opacity:.75">
            ${formatPrice(s.price)}
          </small>
        </button>`).join('');

      sizeContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedSizeIdx = parseInt(btn.dataset.size);
          sizeContainer.querySelectorAll('.option-btn').forEach(b=>b.classList.remove('selected'));
          btn.classList.add('selected');
          updatePrice();
          updateLabel('selected-size', product.sizes[selectedSizeIdx].label);
        });
      });
      updateLabel('selected-size', product.sizes[0].label);
    }

    /* ── Chọn Vật Liệu ── */
    const matContainer = document.getElementById('material-options');
    if (matContainer) {
      matContainer.innerHTML = product.materials.map(m => {
        const mat = getMaterialById(m);
        const add = product.materialPrices[m] || 0;
        const addStr = add > 0 ? ` +${formatPrice(add)}` : add < 0 ? ` ${formatPrice(add)}` : '';
        return `
        <button class="option-btn material-btn ${m===selectedMaterial?'selected':''}"
          data-mat="${m}">
          <span style="width:12px;height:12px;border-radius:50%;
            background:${mat?.color||'#999'};border:1px solid rgba(0,0,0,.15);
            display:inline-block;vertical-align:middle;margin-right:4px"></span>
          ${mat?.label||m}${addStr}
        </button>`;
      }).join('');

      matContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedMaterial = btn.dataset.mat;
          matContainer.querySelectorAll('.option-btn').forEach(b=>b.classList.remove('selected'));
          btn.classList.add('selected');
          updatePrice();
          updateLabel('selected-material', getMaterialById(selectedMaterial)?.label||'');
        });
      });
      updateLabel('selected-material', getMaterialById(selectedMaterial)?.label||'');
    }

    /* ── Số lượng ── */
    const qtyEl = document.getElementById('detail-qty');
    document.getElementById('qty-minus')?.addEventListener('click', () => {
      if (qty > 1) { qty--; if (qtyEl) qtyEl.value = qty; }
    });
    document.getElementById('qty-plus')?.addEventListener('click', () => {
      if (qty < 99) { qty++; if (qtyEl) qtyEl.value = qty; }
    });
    if (qtyEl) { qtyEl.value = qty; qtyEl.addEventListener('change', () => { qty = Math.max(1,Math.min(99,parseInt(qtyEl.value)||1)); qtyEl.value = qty; }); }

    /* ── Thêm vào giỏ hàng ── */
    document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
      for (let i = 0; i < qty; i++) {
        CartManager.addItem({
          productId:     product.id,
          productName:   product.name,
          image:         product.image,
          size:          product.sizes[selectedSizeIdx].label,
          sizeLabel:     product.sizes[selectedSizeIdx].label,
          material:      selectedMaterial,
          materialLabel: getMaterialById(selectedMaterial)?.label || '',
          price:         getPrice(),
          room:          product.room,
          style:         product.styleLabel,
        });
      }
      showToast(`✅ Đã thêm ${qty} sản phẩm vào giỏ hàng!`, 'success');
    });

    /* ── Mua ngay — thêm rồi chuyển sang cart ── */
    document.getElementById('buy-now-btn')?.addEventListener('click', () => {
      CartManager.addItem({
        productId: product.id, productName: product.name,
        image: product.image,
        size: product.sizes[selectedSizeIdx].label,
        sizeLabel: product.sizes[selectedSizeIdx].label,
        material: selectedMaterial,
        materialLabel: getMaterialById(selectedMaterial)?.label||'',
        price: getPrice(), room: product.room, style: product.styleLabel,
      });
      window.location.href = 'cart.html';
    });

    /* ── Tabs mô tả / thông số / vận chuyển ── */
    const descEl = document.getElementById('tab-desc');
    if (descEl) descEl.innerHTML = `
      <p style="line-height:1.8;color:var(--c-text-mid)">${product.description||''}</p>
      ${product.features?.length ? `
        <h5 style="margin:var(--sp-lg) 0 var(--sp-sm);color:var(--c-navy)">✨ Tính năng nổi bật</h5>
        <ul style="padding-left:var(--sp-lg)">
          ${product.features.map(f=>`
            <li style="margin-bottom:8px;color:var(--c-text-mid)">
              <span style="color:var(--c-blue-mid);margin-right:6px">▶</span>${f}
            </li>`).join('')}
        </ul>` : ''}`;

    const specsEl = document.getElementById('tab-specs');
    if (specsEl && product.specs) {
      specsEl.innerHTML = `
        <table class="specs-table" style="width:100%;border-collapse:collapse">
          ${Object.entries(product.specs).map(([k,v])=>`
            <tr>
              <td style="padding:10px 12px;font-weight:600;color:var(--c-text-dark);
                width:160px;border-bottom:1px solid var(--c-border-light)">${k}</td>
              <td style="padding:10px 12px;color:var(--c-text-mid);
                border-bottom:1px solid var(--c-border-light)">${v}</td>
            </tr>`).join('')}
        </table>`;
    }

    /* Tab switching */
    document.querySelectorAll('.tab-header').forEach(h => {
      h.addEventListener('click', () => {
        document.querySelectorAll('.tab-header').forEach(x=>x.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
        h.classList.add('active');
        document.getElementById(h.dataset.tab)?.classList.add('active');
      });
    });

    /* ── Sản phẩm liên quan ── */
    const relGrid = document.getElementById('related-products-grid');
    if (relGrid) {
      const related = PRODUCTS
        .filter(p => p.id !== product.id && (p.room===product.room || p.style===product.style))
        .slice(0, 4);
      relGrid.innerHTML = related.map(p => renderProductCard(p)).join('');
      attachCardEvents();
    }
  });
})();

/* ╔══════════════════════════════════════════╗
   ║  MODULE 2: AUTH — Login / Register       ║
   ╚══════════════════════════════════════════╝ */
const AUTH_KEY = 'noi_that_user';

const AuthManager = {
  /* Lấy user hiện tại từ localStorage */
  getUser()    { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; } },

  /* Đăng nhập — lưu session vào localStorage */
  login(email, password) {
    const user = { email, name: email.split('@')[0], role: 'customer', loginAt: Date.now() };
    if (email === 'admin@noithat.vn' && password === 'admin123') user.role = 'admin';
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  /* Đăng xuất — xóa session */
  logout() { localStorage.removeItem(AUTH_KEY); window.location.href = 'index.html'; },

  /* Đăng ký — lưu thông tin người dùng */
  register(data) {
    const user = { ...data, role: 'customer', registeredAt: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },
  isAdmin()    { return this.getUser()?.role === 'admin'; },
  isLoggedIn() { return !!this.getUser(); },
};

document.addEventListener('DOMContentLoaded', () => {
  const user = AuthManager.getUser();

  /* Cập nhật nút tài khoản trên header */
  const userBtn = document.getElementById('user-action-btn');
  if (userBtn && user) {
    userBtn.title = user.email;
    userBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
      <span class="action-label" style="font-size:11px">${user.name.substring(0,8)}</span>`;
  }

  /* ── Xử lý trang login.html ── */
  if (!document.getElementById('login-form')) return;

  /* Redirect nếu đã đăng nhập */
  if (user && window.location.pathname.includes('login')) {
    window.location.href = user.role==='admin' ? 'admin/index.html' : 'index.html';
    return;
  }

  /* Tab switch: Đăng nhập ↔ Đăng ký */
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const t = tab.dataset.target;
      document.getElementById('login-form').style.display    = t==='login-form'    ? 'block' : 'none';
      document.getElementById('register-form').style.display = t==='register-form' ? 'block' : 'none';
    });
  });

  /* Form đăng nhập */
  document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value;
    const pass  = document.getElementById('login-password')?.value;
    if (!email || !pass) { showToast('Điền đầy đủ thông tin!', 'error'); return; }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = '⏳ Đang đăng nhập...';
    setTimeout(() => {
      const u = AuthManager.login(email, pass);
      showToast(`Chào ${u.name}! 👋`, 'success');
      setTimeout(() => window.location.href = u.role==='admin' ? 'admin/index.html' : 'index.html', 800);
    }, 700);
  });

  /* Form đăng ký */
  document.getElementById('register-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('reg-name')?.value;
    const email = document.getElementById('reg-email')?.value;
    const phone = document.getElementById('reg-phone')?.value;
    const pass  = document.getElementById('reg-password')?.value;
    const conf  = document.getElementById('reg-confirm')?.value;
    if (pass !== conf) { showToast('Mật khẩu không khớp!', 'error'); return; }
    if (pass.length < 6) { showToast('Mật khẩu tối thiểu 6 ký tự!', 'error'); return; }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = '⏳ Đang đăng ký...';
    setTimeout(() => {
      AuthManager.register({ name, email, phone });
      showToast(`Đăng ký thành công! Chào ${name} 🎉`, 'success');
      setTimeout(() => window.location.href = 'index.html', 800);
    }, 700);
  });

  /* Toggle hiện/ẩn mật khẩu */
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = btn.previousElementSibling;
      if (!inp) return;
      const show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      btn.innerHTML = show
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  });
});

/* ╔══════════════════════════════════════════╗
   ║  MODULE 3: ADMIN DASHBOARD               ║
   ╚══════════════════════════════════════════╝ */

/* Dữ liệu mẫu demo */
const AdminManager = {
  orders: [
    { id:'#DH001', customer:'Nguyễn Văn An',   date:'01/06/2026', total:18500000, status:'delivered', items:2 },
    { id:'#DH002', customer:'Trần Thị Bình',   date:'01/06/2026', total:6800000,  status:'shipping',  items:1 },
    { id:'#DH003', customer:'Lê Quốc Cường',   date:'31/05/2026', total:25200000, status:'confirmed', items:3 },
    { id:'#DH004', customer:'Phạm Thị Dung',   date:'31/05/2026', total:3500000,  status:'pending',   items:1 },
    { id:'#DH005', customer:'Hoàng Văn Em',    date:'30/05/2026', total:11200000, status:'delivered', items:2 },
    { id:'#DH006', customer:'Vũ Thị Phương',   date:'30/05/2026', total:4100000,  status:'cancelled', items:1 },
  ],
  customers: [
    { id:'KH001', name:'Nguyễn Văn An',  email:'an@email.com',   phone:'0901234567', orders:3, total:42000000, status:'active'   },
    { id:'KH002', name:'Trần Thị Bình',  email:'binh@email.com', phone:'0912345678', orders:1, total:6800000,  status:'active'   },
    { id:'KH003', name:'Lê Quốc Cường',  email:'cuong@email.com',phone:'0923456789', orders:5, total:78500000, status:'active'   },
    { id:'KH004', name:'Phạm Thị Dung',  email:'dung@email.com', phone:'0934567890', orders:2, total:15200000, status:'inactive' },
  ],
  vouchers: VOUCHERS.map((v,i) => ({ ...v, id:`VC00${i+1}`, used: [12,8,5,20][i]||0, active: true })),
};

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('admin-dashboard')) return;

  /* Bảo vệ trang admin — redirect nếu chưa đăng nhập */
  if (!AuthManager.isLoggedIn()) { window.location.href = '../login.html'; return; }

  /* Sidebar navigation */
  document.querySelectorAll('.admin-nav-link[data-target]').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-link').forEach(l=>l.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));
      link.classList.add('active');
      const t = link.dataset.target;
      document.getElementById(t)?.classList.add('active');
      const labels = {'sec-dashboard':'Dashboard','sec-products':'Sản Phẩm','sec-orders':'Đơn Hàng','sec-customers':'Khách Hàng','sec-vouchers':'Voucher'};
      const titleEl = document.getElementById('admin-page-title');
      if (titleEl) titleEl.textContent = labels[t]||'Dashboard';
    });
  });

  /* Render tất cả sections */
  renderDashboard();
  renderAdminProducts();
  renderAdminOrders();
  renderAdminCustomers();
  renderAdminVouchers();

  /* Đăng xuất */
  document.getElementById('admin-logout')?.addEventListener('click', AuthManager.logout.bind(AuthManager));

  /* Search trong table */
  [['search-products','admin-products-table'],
   ['search-orders','admin-orders-table'],
   ['search-customers','admin-customers-table']].forEach(([inputId, tableId]) => {
    document.getElementById(inputId)?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll(`#${tableId} tr`).forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  });

  /* Ngày giờ hiện tại */
  const dateEl = document.getElementById('current-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('vi-VN',
    {weekday:'long',year:'numeric',month:'long',day:'numeric'});

  /* Mobile sidebar toggle */
  document.getElementById('admin-menu-btn')?.addEventListener('click', () => {
    document.querySelector('.admin-sidebar')?.classList.toggle('mobile-open');
  });
});

/* Render dashboard stats + recent orders */
function renderDashboard() {
  const delivered = AdminManager.orders.filter(o=>o.status==='delivered');
  const stats = {
    revenue:   delivered.reduce((s,o)=>s+o.total,0),
    orders:    AdminManager.orders.length,
    customers: AdminManager.customers.length,
    products:  PRODUCTS.length,
  };
  const map = {'stat-revenue': formatPrice(stats.revenue), 'stat-orders':stats.orders, 'stat-customers':stats.customers, 'stat-products':stats.products};
  Object.entries(map).forEach(([id,v]) => { const el=document.getElementById(id); if(el) el.textContent=v; });

  const tbl = document.getElementById('recent-orders-table');
  if (tbl) tbl.innerHTML = AdminManager.orders.slice(0,5).map(o => `
    <tr>
      <td style="font-weight:700">${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.date}</td>
      <td>${o.items} SP</td>
      <td style="font-weight:700;color:var(--c-price)">${formatPrice(o.total)}</td>
      <td><span class="status-badge status-${o.status}">${statusLabel(o.status)}</span></td>
      <td><div class="table-actions">
        <button class="tbl-btn tbl-btn-view" onclick="showToast('Xem đơn ${o.id}','info')">👁</button>
        <button class="tbl-btn tbl-btn-edit" onclick="showToast('Cập nhật ${o.id}','info')">✏️</button>
      </div></td>
    </tr>`).join('');
}

/* Render bảng sản phẩm admin */
function renderAdminProducts() {
  const tbl = document.getElementById('admin-products-table');
  if (!tbl) return;
  const emojis = {'phong-khach':'🛋️','phong-ngu':'🛏️','phong-bep':'🍳','nha-ve-sinh':'🚿','phong-lam-viec':'🖥️','ban-cong':'🌿'};
  tbl.innerHTML = PRODUCTS.map(p => `
    <tr>
      <td>
        <div class="cell-product">
          <div class="cell-product-img" style="font-size:22px;text-align:center">
            ${emojis[p.room]||'🪑'}
          </div>
          <div>
            <div class="cell-product-name">${p.name}</div>
            <div class="cell-product-code">ID: ${p.id} · ${p.roomLabel}</div>
          </div>
        </div>
      </td>
      <td>${p.roomLabel}</td>
      <td><span class="badge badge-${p.style==='hien-dai'?'modern':p.style==='co-dien'?'classic':p.style==='dong-duong'?'indochine':'neoclassic'}">${p.styleLabel}</span></td>
      <td style="font-size:12px;line-height:1.6">${p.sizes.slice(0,2).map(s=>`${s.label}: <b>${formatPrice(s.price)}</b>`).join('<br>')}${p.sizes.length>2?`<br><i>+${p.sizes.length-2} size</i>`:''}</td>
      <td>
        <div style="display:flex;align-items:flex-end;gap:3px;height:32px">
          ${Array.from({length:7},()=>`<div style="width:7px;border-radius:2px 2px 0 0;background:linear-gradient(to top,var(--c-blue-dark),var(--c-blue-light));height:${Math.floor(Math.random()*90+10)}%"></div>`).join('')}
        </div>
      </td>
      <td><span class="status-badge status-instock">Còn hàng</span></td>
      <td>
        <div class="table-actions">
          <button class="tbl-btn tbl-btn-view" onclick="showToast('Xem: ${p.name}','info')">👁</button>
          <button class="tbl-btn tbl-btn-edit" onclick="showToast('Sửa: ${p.name}','info')">✏️</button>
          <button class="tbl-btn tbl-btn-del"  onclick="showToast('Đã xóa: ${p.name}','error')">🗑</button>
        </div>
      </td>
    </tr>`).join('');
}

/* Render bảng đơn hàng admin */
function renderAdminOrders() {
  const tbl = document.getElementById('admin-orders-table');
  if (!tbl) return;
  tbl.innerHTML = AdminManager.orders.map(o => `
    <tr>
      <td style="font-weight:700;color:var(--c-blue-dark)">${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.date}</td>
      <td>${o.items} sản phẩm</td>
      <td style="font-weight:700;color:var(--c-price)">${formatPrice(o.total)}</td>
      <td><span class="status-badge status-${o.status}">${statusLabel(o.status)}</span></td>
      <td><div class="table-actions">
        <button class="tbl-btn tbl-btn-view">👁</button>
        <button class="tbl-btn tbl-btn-edit" onclick="changeStatus('${o.id}')">✏️</button>
      </div></td>
    </tr>`).join('');
}

/* Render bảng khách hàng admin */
function renderAdminCustomers() {
  const tbl = document.getElementById('admin-customers-table');
  if (!tbl) return;
  tbl.innerHTML = AdminManager.customers.map(c => `
    <tr>
      <td style="font-weight:700">${c.id}</td>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td>${c.orders} đơn</td>
      <td style="font-weight:700;color:var(--c-price)">${formatPrice(c.total)}</td>
      <td><span class="status-badge status-${c.status}">${c.status==='active'?'Hoạt động':'Ngừng'}</span></td>
      <td><div class="table-actions">
        <button class="tbl-btn tbl-btn-view">👁</button>
        <button class="tbl-btn tbl-btn-edit">✏️</button>
      </div></td>
    </tr>`).join('');
}

/* Render bảng voucher admin */
function renderAdminVouchers() {
  const tbl = document.getElementById('admin-vouchers-table');
  if (!tbl) return;
  tbl.innerHTML = AdminManager.vouchers.map(v => `
    <tr>
      <td style="font-family:monospace;font-weight:700;color:var(--c-blue-dark);letter-spacing:1px">${v.code}</td>
      <td>${v.type==='percent'?`🏷 Giảm ${v.value}%`:v.type==='fixed'?`💰 Giảm ${formatPrice(v.value)}`:'🚚 Miễn phí ship'}</td>
      <td>${formatPrice(v.minOrder)}</td>
      <td>${v.desc}</td>
      <td style="font-weight:700">${v.used} lần</td>
      <td><span class="status-badge ${v.active?'status-active':'status-inactive'}">${v.active?'Đang dùng':'Hết hạn'}</span></td>
      <td><div class="table-actions">
        <button class="tbl-btn tbl-btn-edit">✏️</button>
        <button class="tbl-btn tbl-btn-del" onclick="deleteVoucher('${v.code}')">🗑</button>
      </div></td>
    </tr>`).join('');
}

/* Helper functions */
function statusLabel(s) {
  return {'pending':'Chờ xác nhận','confirmed':'Đã xác nhận','shipping':'Đang giao',
          'delivered':'Hoàn thành','cancelled':'Đã hủy'}[s]||s;
}
function changeStatus(id) { showToast(`Cập nhật trạng thái đơn ${id}`, 'info'); }
function deleteVoucher(code) {
  const idx = AdminManager.vouchers.findIndex(v=>v.code===code);
  if (idx>=0) { AdminManager.vouchers.splice(idx,1); renderAdminVouchers(); showToast(`Đã xóa voucher ${code}`, 'error'); }
}
function addNewVoucher() {
  const code  = document.getElementById('new-voucher-code')?.value.trim().toUpperCase();
  const type  = document.getElementById('new-voucher-type')?.value;
  const value = parseInt(document.getElementById('new-voucher-value')?.value)||0;
  const min   = parseInt(document.getElementById('new-voucher-min')?.value)||0;
  if (!code||!value) { showToast('Điền đầy đủ thông tin voucher!','error'); return; }
  const desc = type==='percent'?`Giảm ${value}%`:type==='fixed'?`Giảm ${formatPrice(value)}`:'Miễn phí ship';
  AdminManager.vouchers.push({code,type,value,minOrder:min,desc,used:0,active:true,id:'VC0'+Date.now()});
  renderAdminVouchers();
  showToast(`✅ Tạo voucher ${code} thành công!`,'success');
  ['new-voucher-code','new-voucher-value','new-voucher-min'].forEach(id => {
    const el = document.getElementById(id); if(el) el.value='';
  });
}
