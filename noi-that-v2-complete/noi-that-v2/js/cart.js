/*
 * ============================================================
 * cart.js — Quản Lý Giỏ Hàng (localStorage)
 * ============================================================
 * CartManager : API thêm/xóa/cập nhật item, tính hóa đơn
 * CartUI      : Render giao diện trang cart.html
 * showToast() : Thông báo nổi góc phải màn hình
 * ============================================================
 *
 * DỮ LIỆU LƯU TRONG localStorage:
 *   Key "noi_that_cart"    → JSON array các CartItem
 *   Key "noi_that_voucher" → JSON object voucher đang áp dụng
 *
 * CẤU TRÚC 1 CartItem:
 *   { key, productId, productName, image, size, sizeLabel,
 *     material, materialLabel, price, qty, total, room, style }
 */

const CartManager = (() => {
  const CART_KEY    = 'noi_that_cart';
  const VOUCHER_KEY = 'noi_that_voucher';

  /* ── Đọc giỏ hàng ── */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }

  /* ── Lưu giỏ hàng & cập nhật badge ── */
  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartBadge();
    // Phát event để các component khác lắng nghe
    window.dispatchEvent(new CustomEvent('cartChanged', { detail: { cart: items } }));
  }

  /* ── THÊM sản phẩm vào giỏ ──
   *  Nếu đã có cùng (id+size+material) → tăng qty
   *  Nếu chưa có → thêm mới
   */
  function addItem({ productId, productName, image, size, material,
                     materialLabel, sizeLabel, price, room, style }) {
    const cart    = getCart();
    const itemKey = `${productId}_${size}_${material}`; // Key duy nhất cho combo
    const idx     = cart.findIndex(i => i.key === itemKey);

    if (idx >= 0) {
      // Đã có → chỉ tăng qty
      cart[idx].qty++;
      cart[idx].total = cart[idx].price * cart[idx].qty;
      saveCart(cart);
      return { success: true, message: `Đã tăng số lượng: ${productName}`, isNew: false };
    }

    // Chưa có → push item mới
    cart.push({ key:itemKey, productId, productName, image:'', // Không lưu image URL (tiết kiệm localStorage)
      size, sizeLabel, material, materialLabel, price, qty:1, total:price, room, style, addedAt:Date.now() });
    saveCart(cart);
    return { success: true, message: `Đã thêm vào giỏ: ${productName}`, isNew: true };
  }

  /* ── XÓA 1 item khỏi giỏ ── */
  function removeItem(itemKey) {
    let cart = getCart();
    const before = cart.length;
    cart = cart.filter(i => i.key !== itemKey);
    if (cart.length === before) return false; // Không tìm thấy
    saveCart(cart);
    return true;
  }

  /* ── CẬP NHẬT số lượng ──
   *  qty <= 0 → tự động xóa item
   */
  function updateQty(itemKey, qty) {
    if (qty <= 0) return removeItem(itemKey);
    const cart = getCart();
    const idx  = cart.findIndex(i => i.key === itemKey);
    if (idx < 0) return false;
    cart[idx].qty   = qty;
    cart[idx].total = cart[idx].price * qty;
    saveCart(cart);
    return true;
  }

  /* ── XÓA TOÀN BỘ giỏ hàng ── */
  function clearCart() {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(VOUCHER_KEY);
    updateCartBadge();
    window.dispatchEvent(new CustomEvent('cartChanged', { detail: { cart: [] } }));
  }

  /* ── Đếm tổng số lượng (hiện trên badge) ── */
  function getTotalQty() {
    return getCart().reduce((acc, i) => acc + i.qty, 0);
  }

  /* ── TÍNH HÓA ĐƠN đầy đủ ──
   *  Trả về object gồm: subtotal, shipping, discount, tax, grandTotal
   */
  function calcSummary() {
    const cart    = getCart();
    const voucher = getSavedVoucher();

    /* 1. Tổng tiền hàng (chưa thuế, chưa ship) */
    const subtotal = cart.reduce((acc, i) => acc + i.total, 0);

    /* 2. Phí vận chuyển — miễn phí nếu đơn >= 5 triệu */
    const shippingFee      = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.standardFee;
    const freeShipApplied  = subtotal >= SHIPPING.freeThreshold;

    /* 3. Giảm giá từ voucher */
    let discount = 0, shippingDiscount = 0;
    if (voucher && subtotal >= voucher.minOrder) {
      if (voucher.type === 'percent')  discount = Math.round(subtotal * voucher.value / 100);
      if (voucher.type === 'fixed')    discount = Math.min(voucher.value, subtotal);
      if (voucher.type === 'shipping') shippingDiscount = Math.min(voucher.value, shippingFee);
    }

    /* 4. Giá sau giảm (chưa thuế) */
    const preTaxTotal = subtotal - discount + shippingFee - shippingDiscount;

    /* 5. Thuế VAT 10% tính trên tổng sau giảm */
    const taxAmount = Math.round(preTaxTotal * TAX_RATE);

    /* 6. Tổng thanh toán cuối */
    const grandTotal = preTaxTotal + taxAmount;

    return { subtotal, shippingFee, shippingDiscount, freeShipApplied,
             discount, taxRate: TAX_RATE, taxAmount, grandTotal,
             itemCount: cart.length, totalQty: getTotalQty(), voucher };
  }

  /* ── Voucher ── */
  function applyVoucher(code, subtotal) {
    const result = validateVoucher(code, subtotal);
    if (result.valid) localStorage.setItem(VOUCHER_KEY, JSON.stringify(result.voucher));
    return result;
  }
  function removeVoucher()     { localStorage.removeItem(VOUCHER_KEY); }
  function getSavedVoucher()   { try { return JSON.parse(localStorage.getItem(VOUCHER_KEY)); } catch { return null; } }

  /* ── Cập nhật số đếm badge trên icon giỏ hàng ── */
  function updateCartBadge() {
    const qty = getTotalQty();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent    = qty > 99 ? '99+' : qty;
      b.style.display  = qty > 0 ? 'flex' : 'none';
    });
  }

  /* ── Khởi tạo khi load trang ── */
  function init() { updateCartBadge(); }

  return { getCart, addItem, removeItem, updateQty, clearCart,
           getTotalQty, calcSummary, applyVoucher, removeVoucher,
           getSavedVoucher, updateCartBadge, init };
})();

/*
 * ============================================================
 * CartUI — Render Giao Diện Trang cart.html
 * ============================================================
 */
const CartUI = (() => {

  /* Render toàn bộ trang giỏ hàng */
  function render() {
    const cart        = CartManager.getCart();
    const emptyEl     = document.getElementById('cart-empty');
    const contentEl   = document.getElementById('cart-content');
    const containerEl = document.getElementById('cart-items-list');
    if (!containerEl) return;

    /* Giỏ trống */
    if (cart.length === 0) {
      if (emptyEl)  emptyEl.style.display  = 'flex';
      if (contentEl) contentEl.style.display = 'none';
      renderSummary();
      return;
    }

    /* Có sản phẩm */
    if (emptyEl)   emptyEl.style.display  = 'none';
    if (contentEl) contentEl.style.display = '';

    /* Hiển thị số lượng */
    const cntEl = document.getElementById('cart-item-total-count');
    if (cntEl) cntEl.textContent = `(${CartManager.getTotalQty()} sản phẩm)`;

    /* Render từng dòng */
    containerEl.innerHTML = cart.map(item => renderRow(item)).join('');
    attachRowEvents();
    renderSummary();
  }

  /* Render 1 dòng sản phẩm trong cart */
  function renderRow(item) {
    /* Emoji đại diện khi không có hình thật */
    const emojiMap = {'phong-khach':'🛋️','phong-ngu':'🛏️','phong-bep':'🍳',
                      'nha-ve-sinh':'🚿','phong-lam-viec':'🖥️','ban-cong':'🌿'};
    const emoji = emojiMap[item.room] || '🪑';

    return `
    <div class="cart-item" data-key="${item.key}">

      <!-- Cột 1: Hình + tên sản phẩm -->
      <div class="cart-item-product">
        <!-- Placeholder hình (thay bằng <img> khi có ảnh thật) -->
        <div class="cart-item-img-placeholder"
          style="width:72px;height:72px;border-radius:var(--r-md);
            background:linear-gradient(135deg,var(--c-ice),var(--c-steel-pale));
            display:flex;align-items:center;justify-content:center;
            font-size:30px;flex-shrink:0;border:1px solid var(--c-border-light)">
          ${emoji}
        </div>
        <div class="cart-item-info">
          <a class="cart-item-name" href="product-detail.html?id=${item.productId}">${item.productName}</a>
          <div class="cart-item-meta">
            ${item.sizeLabel   ? `<span class="cart-item-tag">📐 ${item.sizeLabel}</span>`   : ''}
            ${item.materialLabel?`<span class="cart-item-tag">🪵 ${item.materialLabel}</span>`:''}
            ${item.style       ? `<span class="cart-item-tag">${item.style}</span>`           : ''}
          </div>
        </div>
      </div>

      <!-- Cột 2: Đơn giá -->
      <div class="cart-item-price">${formatPrice(item.price)}</div>

      <!-- Cột 3: Điều chỉnh số lượng -->
      <div class="cart-item-qty">
        <div class="qty-control">
          <button class="qty-btn qty-minus" data-key="${item.key}">−</button>
          <input  class="qty-input" type="number" value="${item.qty}"
                  min="1" max="99" data-key="${item.key}" readonly/>
          <button class="qty-btn qty-plus"  data-key="${item.key}">+</button>
        </div>
      </div>

      <!-- Cột 4: Thành tiền (price × qty) -->
      <div class="cart-item-total">${formatPrice(item.total)}</div>

      <!-- Cột 5: Nút xóa -->
      <button class="cart-item-remove" data-key="${item.key}" title="Xóa">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>`;
  }

  /* Gắn sự kiện tương tác cho từng dòng */
  function attachRowEvents() {

    /* Nút GIẢM qty */
    document.querySelectorAll('.qty-minus').forEach(btn => {
      btn.onclick = () => {
        const key  = btn.dataset.key;
        const item = CartManager.getCart().find(i => i.key === key);
        if (!item) return;
        if (item.qty <= 1) {
          if (confirm(`Xóa "${item.productName}" khỏi giỏ hàng?`)) {
            CartManager.removeItem(key);
            render();
            showToast('Đã xóa sản phẩm', 'info');
          }
        } else {
          CartManager.updateQty(key, item.qty - 1);
          render();
        }
      };
    });

    /* Nút TĂNG qty */
    document.querySelectorAll('.qty-plus').forEach(btn => {
      btn.onclick = () => {
        const key  = btn.dataset.key;
        const item = CartManager.getCart().find(i => i.key === key);
        if (!item) return;
        if (item.qty >= 99) { showToast('Tối đa 99 sản phẩm', 'error'); return; }
        CartManager.updateQty(key, item.qty + 1);
        render();
      };
    });

    /* Nút XÓA với hiệu ứng fade-out */
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.onclick = () => {
        const key  = btn.dataset.key;
        const item = CartManager.getCart().find(i => i.key === key);
        if (!item) return;
        const row = btn.closest('.cart-item');
        row.style.transition = 'opacity .25s, transform .25s';
        row.style.opacity    = '0';
        row.style.transform  = 'translateX(-20px)';
        setTimeout(() => {
          CartManager.removeItem(key);
          render();
          showToast(`Đã xóa: ${item.productName}`, 'info');
        }, 250);
      };
    });
  }

  /* Render bảng tóm tắt hóa đơn bên phải */
  function renderSummary() {
    const s   = CartManager.calcSummary();
    const get = id => document.getElementById(id);

    if (get('summary-subtotal'))  get('summary-subtotal').textContent  = formatPrice(s.subtotal);
    if (get('summary-tax'))       get('summary-tax').textContent       = formatPrice(s.taxAmount);
    if (get('summary-grand-total')) get('summary-grand-total').textContent = formatPrice(s.grandTotal);

    /* Phí ship — hiện "Miễn phí" nếu đủ điều kiện */
    if (get('summary-shipping')) {
      get('summary-shipping').innerHTML = s.freeShipApplied
        ? `<span style="color:var(--c-success);font-weight:700">Miễn phí ✓</span>`
        : formatPrice(s.shippingFee);
    }

    /* Dòng giảm giá — chỉ hiện khi có voucher */
    const discRow = get('summary-discount-row');
    if (discRow) {
      const total = s.discount + s.shippingDiscount;
      discRow.style.display = total > 0 ? 'flex' : 'none';
      if (get('summary-discount')) get('summary-discount').textContent = `−${formatPrice(total)}`;
    }

    renderVoucherState();
  }

  /* Hiện trạng thái voucher (ô nhập hay tag đã áp dụng) */
  function renderVoucherState() {
    const v = CartManager.getSavedVoucher();
    const inputRow = document.getElementById('voucher-input-row');
    const applied  = document.getElementById('voucher-applied');
    if (!inputRow && !applied) return;
    if (v) {
      if (inputRow) inputRow.style.display = 'none';
      if (applied) {
        applied.style.display = 'flex';
        const lbl = applied.querySelector('.voucher-applied-label');
        if (lbl) lbl.textContent = `${v.code} — ${v.desc}`;
      }
    } else {
      if (inputRow) inputRow.style.display = 'flex';
      if (applied)  applied.style.display  = 'none';
    }
  }

  return { render, renderSummary, renderVoucherState };
})();

/*
 * ============================================================
 * showToast() — Thông báo nổi góc phải màn hình
 * ============================================================
 * @param {string} message - Nội dung thông báo
 * @param {string} type    - 'success' | 'error' | 'info'
 * @param {number} duration- Thời gian hiển thị (ms), mặc định 3000
 */
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✅',
    error:   '❌',
    info:    'ℹ️',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type]||'💬'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut .3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/*
 * ============================================================
 * KHỞI TẠO KHI DOM SẴN SÀNG
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  CartManager.init(); // Cập nhật badge

  /* ── Trang giỏ hàng (cart.html) ── */
  if (document.getElementById('cart-items-list')) {
    CartUI.render(); // Render lần đầu

    /* Nút áp dụng voucher */
    document.getElementById('apply-voucher-btn')?.addEventListener('click', () => {
      const input = document.getElementById('voucher-input');
      const code  = input?.value.trim();
      if (!code) { showToast('Nhập mã voucher trước!', 'error'); return; }
      const { subtotal } = CartManager.calcSummary();
      const result = CartManager.applyVoucher(code, subtotal);
      if (result.valid) {
        showToast(`🎉 Áp dụng thành công: ${result.voucher.desc}`, 'success');
        CartUI.renderSummary();
      } else {
        showToast(result.msg, 'error');
      }
    });

    /* Enter trong ô voucher */
    document.getElementById('voucher-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('apply-voucher-btn')?.click();
    });

    /* Nút xóa voucher */
    document.getElementById('remove-voucher-btn')?.addEventListener('click', () => {
      CartManager.removeVoucher();
      CartUI.renderSummary();
      showToast('Đã xóa voucher', 'info');
    });

    /* Nút xóa toàn bộ giỏ hàng */
    document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
      if (CartManager.getCart().length === 0) return;
      if (confirm('Xóa toàn bộ giỏ hàng?')) {
        CartManager.clearCart();
        CartUI.render();
        showToast('Đã xóa toàn bộ giỏ hàng', 'info');
      }
    });
  }

  /* ── Trang thanh toán (checkout.html) ── */
  if (document.getElementById('checkout-items-list')) {
    renderCheckoutSummary();
  }
});

/* Render tóm tắt đơn hàng trang checkout */
function renderCheckoutSummary() {
  const cart    = CartManager.getCart();
  const summary = CartManager.calcSummary();
  const el      = document.getElementById('checkout-items-list');
  if (!el) return;

  const emojiMap = {'phong-khach':'🛋️','phong-ngu':'🛏️','phong-bep':'🍳',
                    'nha-ve-sinh':'🚿','phong-lam-viec':'🖥️','ban-cong':'🌿'};

  el.innerHTML = cart.map(item => `
    <div class="checkout-item-row">
      <div style="position:relative;flex-shrink:0">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,var(--c-ice),var(--c-steel-pale));
          border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:24px">
          ${emojiMap[item.room]||'🪑'}
        </div>
        <div class="checkout-item-qty-badge">${item.qty}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div class="checkout-item-name">${item.productName}</div>
        <div class="checkout-item-meta">${item.sizeLabel||''} ${item.materialLabel?'· '+item.materialLabel:''}</div>
      </div>
      <div class="checkout-item-price">${formatPrice(item.total)}</div>
    </div>`).join('');

  const map = {'co-subtotal':summary.subtotal,'co-shipping':summary.shippingFee,
               'co-tax':summary.taxAmount,'co-total':summary.grandTotal};
  Object.entries(map).forEach(([id,val]) => {
    const e = document.getElementById(id);
    if (e) e.textContent = (id==='co-shipping' && summary.freeShipApplied) ? 'Miễn phí' : formatPrice(val);
  });
}
