/*
 * ============================================================
 * images-svg.js — Hình Ảnh SVG Mẫu Cho Sản Phẩm
 * ============================================================
 * Mỗi hàm trả về chuỗi SVG base64 data URL
 * Tông màu lạnh: Navy #0D2B45, Blue #2E86C1, Steel #3E7A99, Teal #117A65
 *
 * CÁCH THAY BẰNG ẢNH THẬT:
 *   1. Đặt file ảnh vào đúng thư mục images/<phong>/
 *   2. Trong data.js, trường image: 'images/living-room/sofa-nb-s01.jpg'
 *   3. Xóa dòng gọi hàm getSVGImage() trong renderProductCard()
 * ============================================================
 */

/* ── Bảng màu lạnh dùng chung cho SVG ── */
const SVG_PALETTE = {
  bg:        '#E8F4FA', // Nền nhạt lạnh
  bgDark:    '#C5DCE8', // Nền tối hơn một chút
  main:      '#2E86C1', // Màu chính
  dark:      '#1B4F72', // Xanh navy
  mid:       '#3E7A99', // Xanh thép giữa
  light:     '#85C1E9', // Xanh nhạt
  accent:    '#117A65', // Teal accent
  wood:      '#5B8FA8', // Màu gỗ lạnh
  woodDark:  '#2C5F7A', // Gỗ đậm lạnh
  shadow:    'rgba(27,79,114,0.18)',
  white:     '#F0F8FF',
};

/* ──────────────────────────────────────────
   PHÒNG KHÁCH (Living Room)
   ────────────────────────────────────────── */

const SVG_IMAGES = {

  /* 1. Sofa 3 chỗ */
  'sofa-3-cho': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="bgG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#D6EAF8"/><stop offset="100%" stop-color="#AED6F1"/>
      </linearGradient>
      <linearGradient id="sofaG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5DADE2"/><stop offset="100%" stop-color="#1B4F72"/>
      </linearGradient>
      <filter id="sh"><feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#0D2B45" flood-opacity="0.25"/></filter>
    </defs>
    <rect width="400" height="300" fill="url(#bgG)"/>
    <!-- Sàn -->
    <ellipse cx="200" cy="265" rx="170" ry="20" fill="rgba(27,79,114,0.12)"/>
    <!-- Chân sofa -->
    <rect x="70" y="215" width="14" height="30" rx="4" fill="#1B4F72"/>
    <rect x="316" y="215" width="14" height="30" rx="4" fill="#1B4F72"/>
    <rect x="105" y="220" width="10" height="25" rx="3" fill="#1B4F72"/>
    <rect x="285" y="220" width="10" height="25" rx="3" fill="#1B4F72"/>
    <!-- Thân sofa chính -->
    <rect x="60" y="155" width="280" height="70" rx="12" fill="url(#sofaG)" filter="url(#sh)"/>
    <!-- Tựa lưng -->
    <rect x="68" y="110" width="264" height="55" rx="10" fill="#2E86C1"/>
    <rect x="75" y="117" width="250" height="42" rx="8" fill="#3A9BD5" opacity="0.6"/>
    <!-- Tựa tay trái -->
    <rect x="55" y="120" width="38" height="105" rx="10" fill="#1A7FC1"/>
    <rect x="60" y="125" width="28" height="92" rx="7" fill="#2689D0" opacity="0.7"/>
    <!-- Tựa tay phải -->
    <rect x="307" y="120" width="38" height="105" rx="10" fill="#1A7FC1"/>
    <rect x="312" y="125" width="28" height="92" rx="7" fill="#2689D0" opacity="0.7"/>
    <!-- Đệm ngồi -->
    <rect x="68" y="160" width="82" height="58" rx="6" fill="#4AACDF" opacity="0.5"/>
    <rect x="159" y="160" width="82" height="58" rx="6" fill="#4AACDF" opacity="0.5"/>
    <rect x="250" y="160" width="82" height="58" rx="6" fill="#4AACDF" opacity="0.5"/>
    <!-- Gối trang trí -->
    <rect x="90" y="130" width="38" height="38" rx="6" fill="#117A65" opacity="0.9"/>
    <rect x="272" y="130" width="38" height="38" rx="6" fill="#0E6655" opacity="0.9"/>
    <!-- Nhãn sản phẩm -->
    <rect x="130" y="252" width="140" height="26" rx="6" fill="rgba(27,79,114,0.15)"/>
    <text x="200" y="269" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">SOFA BẮC ÂU • VẢI PREMIUM</text>
  </svg>`,

  /* 2. Bàn trà kính */
  'ban-tra-kinh': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#D6EAF8"/><stop offset="100%" stop-color="#AED6F1"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg2)"/>
    <ellipse cx="200" cy="262" rx="160" ry="16" fill="rgba(27,79,114,0.10)"/>
    <!-- Chân inox chữ X -->
    <line x1="110" y1="245" x2="290" y2="175" stroke="#2C5F7A" stroke-width="8" stroke-linecap="round"/>
    <line x1="290" y1="245" x2="110" y2="175" stroke="#2C5F7A" stroke-width="8" stroke-linecap="round"/>
    <!-- Thanh ngang chân -->
    <rect x="108" y="206" width="184" height="8" rx="4" fill="#3E7A99"/>
    <!-- Mặt kính -->
    <rect x="68" y="158" width="264" height="24" rx="6" fill="#AED6F1" opacity="0.55"/>
    <rect x="68" y="158" width="264" height="24" rx="6" fill="none" stroke="#5DADE2" stroke-width="2"/>
    <!-- Phản chiếu kính -->
    <rect x="80" y="162" width="80" height="6" rx="3" fill="white" opacity="0.45"/>
    <!-- Vật trang trí trên bàn -->
    <circle cx="155" cy="148" r="12" fill="#117A65" opacity="0.8"/>
    <rect x="192" y="136" width="20" height="28" rx="3" fill="#1B4F72" opacity="0.7"/>
    <ellipse cx="248" cy="150" rx="18" ry="10" fill="#2E86C1" opacity="0.6"/>
    <text x="200" y="278" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">BÀN TRÀ KÍNH CƯỜNG LỰC</text>
  </svg>`,

  /* 3. Kệ TV cổ điển */
  'ke-tv': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#D6EAF8"/>
    <ellipse cx="200" cy="268" rx="175" ry="14" fill="rgba(27,79,114,0.10)"/>
    <!-- Thân kệ TV -->
    <rect x="40" y="130" width="320" height="130" rx="8" fill="#2C5F7A"/>
    <rect x="44" y="134" width="312" height="122" rx="6" fill="#3E7A99"/>
    <!-- Ngăn giữa màn hình -->
    <rect x="52" y="142" width="200" height="90" rx="4" fill="#1B4F72"/>
    <rect x="56" y="146" width="192" height="82" rx="3" fill="#0D2B45"/>
    <!-- Màn hình TV giả -->
    <rect x="62" y="152" width="180" height="70" rx="2" fill="#1A3A50"/>
    <text x="152" y="192" font-family="sans-serif" font-size="26" fill="#2E86C1" text-anchor="middle" opacity="0.6">📺</text>
    <!-- Ngăn kéo bên phải -->
    <rect x="264" y="142" width="88" height="42" rx="4" fill="#2C5F7A"/>
    <rect x="268" y="146" width="80" height="34" rx="3" fill="#1B4F72"/>
    <circle cx="308" cy="163" r="5" fill="#85C1E9"/>
    <rect x="264" y="194" width="88" height="30" rx="4" fill="#2C5F7A"/>
    <rect x="268" y="198" width="80" height="22" rx="3" fill="#1B4F72"/>
    <circle cx="308" cy="209" r="4" fill="#85C1E9"/>
    <!-- Chân gỗ -->
    <rect x="65" y="260" width="18" height="20" rx="4" fill="#1B4F72"/>
    <rect x="317" y="260" width="18" height="20" rx="4" fill="#1B4F72"/>
    <!-- Chạm khắc hoa văn -->
    <text x="160" y="122" font-family="serif" font-size="14" fill="#2E86C1" text-anchor="middle" opacity="0.6">✦ ✦ ✦</text>
    <text x="200" y="285" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">KỆ TV GỖ CỔ ĐIỂN</text>
  </svg>`,

  /* 4. Ghế đơn Đông Dương */
  'ghe-don': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#D6EAF8"/>
    <ellipse cx="200" cy="268" rx="110" ry="14" fill="rgba(27,79,114,0.10)"/>
    <!-- Chân ghế -->
    <rect x="138" y="215" width="12" height="55" rx="4" fill="#2C5F7A"/>
    <rect x="250" y="215" width="12" height="55" rx="4" fill="#2C5F7A"/>
    <rect x="148" y="230" width="10" height="42" rx="3" fill="#1B4F72"/>
    <rect x="242" y="230" width="10" height="42" rx="3" fill="#1B4F72"/>
    <!-- Thanh nối chân -->
    <rect x="138" y="248" width="124" height="8" rx="4" fill="#3E7A99"/>
    <!-- Phần ngồi mây tre -->
    <rect x="125" y="185" width="150" height="38" rx="8" fill="#5B8FA8"/>
    <!-- Hoa văn mây tre -->
    <line x1="135" y1="195" x2="265" y2="195" stroke="#2C5F7A" stroke-width="1.5" opacity="0.5"/>
    <line x1="135" y1="204" x2="265" y2="204" stroke="#2C5F7A" stroke-width="1.5" opacity="0.5"/>
    <line x1="135" y1="213" x2="265" y2="213" stroke="#2C5F7A" stroke-width="1.5" opacity="0.5"/>
    <line x1="155" y1="185" x2="155" y2="223" stroke="#2C5F7A" stroke-width="1.5" opacity="0.4"/>
    <line x1="180" y1="185" x2="180" y2="223" stroke="#2C5F7A" stroke-width="1.5" opacity="0.4"/>
    <line x1="205" y1="185" x2="205" y2="223" stroke="#2C5F7A" stroke-width="1.5" opacity="0.4"/>
    <line x1="230" y1="185" x2="230" y2="223" stroke="#2C5F7A" stroke-width="1.5" opacity="0.4"/>
    <line x1="255" y1="185" x2="255" y2="223" stroke="#2C5F7A" stroke-width="1.5" opacity="0.4"/>
    <!-- Tựa lưng mây tre -->
    <rect x="132" y="100" width="136" height="92" rx="10" fill="#4A8BAA"/>
    <rect x="140" y="108" width="120" height="76" rx="7" fill="#3A7A9A"/>
    <!-- Hoa văn tựa lưng -->
    <ellipse cx="200" cy="150" rx="40" ry="28" fill="none" stroke="#2C5F7A" stroke-width="2" opacity="0.5"/>
    <ellipse cx="200" cy="150" rx="22" ry="14" fill="none" stroke="#2C5F7A" stroke-width="1.5" opacity="0.4"/>
    <circle cx="200" cy="150" r="6" fill="#117A65" opacity="0.7"/>
    <!-- Tựa tay mây tre -->
    <rect x="120" y="140" width="20" height="55" rx="6" fill="#3E7A99"/>
    <rect x="260" y="140" width="20" height="55" rx="6" fill="#3E7A99"/>
    <text x="200" y="285" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">GHẾ ĐƠN ĐÔNG DƯƠNG • MÂY TRE</text>
  </svg>`,

  /* 5. Giường ngủ */
  'giuong-ngu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#D6EAF8"/>
    <ellipse cx="200" cy="270" rx="175" ry="14" fill="rgba(27,79,114,0.10)"/>
    <!-- Chân giường -->
    <rect x="58" y="230" width="16" height="45" rx="4" fill="#1B4F72"/>
    <rect x="326" y="230" width="16" height="45" rx="4" fill="#1B4F72"/>
    <!-- Thân giường -->
    <rect x="52" y="170" width="296" height="72" rx="8" fill="#2C5F7A"/>
    <rect x="56" y="174" width="288" height="64" rx="6" fill="#3E7A99"/>
    <!-- Đệm nằm -->
    <rect x="60" y="162" width="280" height="52" rx="10" fill="#5DADE2" opacity="0.7"/>
    <rect x="64" y="166" width="272" height="44" rx="8" fill="#6DB8E8" opacity="0.5"/>
    <!-- Gối nằm -->
    <rect x="75" y="152" width="88" height="38" rx="10" fill="#EBF5FB"/>
    <rect x="237" y="152" width="88" height="38" rx="10" fill="#EBF5FB"/>
    <rect x="80" y="157" width="78" height="28" rx="7" fill="white" opacity="0.8"/>
    <rect x="242" y="157" width="78" height="28" rx="7" fill="white" opacity="0.8"/>
    <!-- Đầu giường bọc da -->
    <rect x="52" y="88" width="296" height="90" rx="12" fill="#1B4F72"/>
    <rect x="58" y="94" width="284" height="78" rx="9" fill="#2C5F7A"/>
    <!-- Hoa văn đầu giường -->
    <rect x="66" y="102" width="268" height="62" rx="6" fill="#3E7A99" opacity="0.6"/>
    <line x1="66" y1="130" x2="334" y2="130" stroke="#2C5F7A" stroke-width="2" opacity="0.5"/>
    <!-- Nút bọc đầu giường -->
    <circle cx="120" cy="115" r="5" fill="#1B4F72"/><circle cx="160" cy="115" r="5" fill="#1B4F72"/>
    <circle cx="200" cy="115" r="5" fill="#1B4F72"/><circle cx="240" cy="115" r="5" fill="#1B4F72"/>
    <circle cx="280" cy="115" r="5" fill="#1B4F72"/>
    <circle cx="120" cy="145" r="5" fill="#1B4F72"/><circle cx="160" cy="145" r="5" fill="#1B4F72"/>
    <circle cx="200" cy="145" r="5" fill="#1B4F72"/><circle cx="240" cy="145" r="5" fill="#1B4F72"/>
    <circle cx="280" cy="145" r="5" fill="#1B4F72"/>
    <text x="200" y="286" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">GIƯỜNG NGỦ GỖ SỒI • ĐẦU GỖ BỌC DA</text>
  </svg>`,

  /* 6. Tủ quần áo */
  'tu-quan-ao': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#D6EAF8"/>
    <ellipse cx="200" cy="272" rx="170" ry="14" fill="rgba(27,79,114,0.10)"/>
    <!-- Thân tủ -->
    <rect x="52" y="48" width="296" height="224" rx="8" fill="#2C5F7A"/>
    <rect x="56" y="52" width="288" height="216" rx="6" fill="#3E7A99"/>
    <!-- Cánh tủ trái -->
    <rect x="60" y="56" width="136" height="208" rx="4" fill="#2C5F7A"/>
    <rect x="64" y="60" width="128" height="200" rx="3" fill="#1B4F72"/>
    <!-- Gương cánh trái -->
    <rect x="70" y="68" width="116" height="160" rx="4" fill="#AED6F1" opacity="0.45"/>
    <rect x="70" y="68" width="116" height="160" rx="4" fill="none" stroke="#5DADE2" stroke-width="1.5"/>
    <rect x="76" y="74" width="40" height="100" rx="2" fill="white" opacity="0.15"/>
    <!-- Tay cầm trái -->
    <rect x="192" y="148" width="12" height="36" rx="4" fill="#85C1E9"/>
    <!-- Cánh tủ phải -->
    <rect x="204" y="56" width="136" height="208" rx="4" fill="#2C5F7A"/>
    <rect x="208" y="60" width="128" height="200" rx="3" fill="#1B4F72"/>
    <!-- Gương cánh phải -->
    <rect x="214" y="68" width="116" height="160" rx="4" fill="#AED6F1" opacity="0.45"/>
    <rect x="214" y="68" width="116" height="160" rx="4" fill="none" stroke="#5DADE2" stroke-width="1.5"/>
    <rect x="220" y="74" width="40" height="100" rx="2" fill="white" opacity="0.15"/>
    <!-- Tay cầm phải -->
    <rect x="196" y="148" width="12" height="36" rx="4" fill="#85C1E9"/>
    <!-- Đường nối 2 cánh -->
    <line x1="200" y1="56" x2="200" y2="264" stroke="#0D2B45" stroke-width="2"/>
    <!-- Chạm khắc phía trên -->
    <rect x="62" y="262" width="276" height="8" rx="2" fill="#1B4F72"/>
    <text x="200" y="288" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">TỦ QUẦN ÁO 4 CÁNH CỔ ĐIỂN</text>
  </svg>`,

  /* 7. Bàn ăn gỗ sồi */
  'ban-an': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#D6EAF8"/>
    <ellipse cx="200" cy="268" rx="185" ry="15" fill="rgba(27,79,114,0.10)"/>
    <!-- Chân bàn chữ A -->
    <line x1="90" y1="168" x2="78" y2="258" stroke="#2C5F7A" stroke-width="10" stroke-linecap="round"/>
    <line x1="90" y1="168" x2="118" y2="258" stroke="#2C5F7A" stroke-width="10" stroke-linecap="round"/>
    <line x1="310" y1="168" x2="282" y2="258" stroke="#2C5F7A" stroke-width="10" stroke-linecap="round"/>
    <line x1="310" y1="168" x2="322" y2="258" stroke="#2C5F7A" stroke-width="10" stroke-linecap="round"/>
    <!-- Thanh nối 2 chân -->
    <rect x="86" y="218" width="228" height="8" rx="4" fill="#1B4F72"/>
    <!-- Mặt bàn dày -->
    <rect x="38" y="148" width="324" height="28" rx="7" fill="#1B4F72"/>
    <rect x="42" y="152" width="316" height="20" rx="5" fill="#3E7A99"/>
    <!-- Vân gỗ -->
    <line x1="55" y1="156" x2="355" y2="156" stroke="#2C5F7A" stroke-width="1" opacity="0.4"/>
    <line x1="70" y1="160" x2="340" y2="160" stroke="#2C5F7A" stroke-width="0.8" opacity="0.3"/>
    <line x1="50" y1="164" x2="360" y2="164" stroke="#2C5F7A" stroke-width="1" opacity="0.4"/>
    <line x1="60" y1="168" x2="350" y2="168" stroke="#2C5F7A" stroke-width="0.8" opacity="0.3"/>
    <!-- Ghế ăn mini -->
    <rect x="64" y="178" width="46" height="56" rx="5" fill="#5DADE2" opacity="0.55"/>
    <rect x="120" y="178" width="46" height="56" rx="5" fill="#5DADE2" opacity="0.55"/>
    <rect x="234" y="178" width="46" height="56" rx="5" fill="#5DADE2" opacity="0.55"/>
    <rect x="290" y="178" width="46" height="56" rx="5" fill="#5DADE2" opacity="0.55"/>
    <!-- Vật trên bàn -->
    <circle cx="200" cy="140" r="14" fill="#117A65" opacity="0.7"/>
    <rect x="172" y="132" width="6" height="20" rx="2" fill="#AED6F1" opacity="0.7"/>
    <rect x="222" y="132" width="6" height="20" rx="2" fill="#AED6F1" opacity="0.7"/>
    <text x="200" y="286" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">BÀN ĂN GỖ SỒI MỸ • 6 NGƯỜI</text>
  </svg>`,

  /* 8. Tủ gương lavabo */
  'tu-guong-lavabo': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#D6EAF8"/>
    <!-- Thân tủ gương -->
    <rect x="80" y="60" width="240" height="180" rx="8" fill="#2C5F7A"/>
    <rect x="84" y="64" width="232" height="172" rx="6" fill="#1B4F72"/>
    <!-- Gương chính -->
    <rect x="90" y="70" width="220" height="150" rx="4" fill="#AED6F1" opacity="0.5"/>
    <rect x="90" y="70" width="220" height="150" rx="4" fill="none" stroke="#5DADE2" stroke-width="2"/>
    <!-- Phản chiếu gương -->
    <rect x="96" y="76" width="65" height="110" rx="2" fill="white" opacity="0.18"/>
    <!-- Đèn LED viền gương -->
    <rect x="88" y="68" width="224" height="4" rx="2" fill="#F0E68C" opacity="0.8"/>
    <rect x="88" y="218" width="224" height="4" rx="2" fill="#F0E68C" opacity="0.6"/>
    <rect x="88" y="68" width="4" height="154" rx="2" fill="#F0E68C" opacity="0.6"/>
    <rect x="308" y="68" width="4" height="154" rx="2" fill="#F0E68C" opacity="0.6"/>
    <!-- Bóng LED -->
    <ellipse cx="200" cy="70" rx="80" ry="6" fill="#FFFACD" opacity="0.25"/>
    <!-- Nút cảm ứng -->
    <circle cx="290" cy="230" r="8" fill="#3E7A99"/>
    <circle cx="308" cy="230" r="8" fill="#2E86C1"/>
    <circle cx="326" cy="230" r="8" fill="#5DADE2"/>
    <!-- Lavabo bên dưới -->
    <rect x="80" y="246" width="240" height="32" rx="8" fill="#3E7A99"/>
    <ellipse cx="200" cy="252" rx="80" ry="16" fill="#AED6F1" opacity="0.6"/>
    <ellipse cx="200" cy="252" rx="80" ry="16" fill="none" stroke="#5DADE2" stroke-width="1.5"/>
    <text x="200" y="292" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">TỦ GƯƠNG LAVABO • ĐÈN LED CẢM ỨNG</text>
  </svg>`,

  /* 9. Bàn làm việc */
  'ban-lam-viec': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#D6EAF8"/>
    <ellipse cx="200" cy="268" rx="180" ry="14" fill="rgba(27,79,114,0.10)"/>
    <!-- Chân bàn trái -->
    <rect x="58" y="168" width="20" height="92" rx="5" fill="#1B4F72"/>
    <!-- Ngăn kéo bên phải -->
    <rect x="292" y="168" width="60" height="92" rx="5" fill="#2C5F7A"/>
    <rect x="296" y="172" width="52" height="26" rx="3" fill="#1B4F72"/>
    <rect x="296" y="202" width="52" height="26" rx="3" fill="#1B4F72"/>
    <rect x="296" y="232" width="52" height="24" rx="3" fill="#1B4F72"/>
    <!-- Tay kéo -->
    <rect x="314" y="183" width="20" height="5" rx="2" fill="#85C1E9"/>
    <rect x="314" y="213" width="20" height="5" rx="2" fill="#85C1E9"/>
    <rect x="314" y="242" width="20" height="5" rx="2" fill="#85C1E9"/>
    <!-- Mặt bàn -->
    <rect x="44" y="148" width="312" height="24" rx="6" fill="#2C5F7A"/>
    <rect x="48" y="152" width="304" height="16" rx="4" fill="#3E7A99"/>
    <!-- Kệ màn hình trên bàn -->
    <rect x="130" y="112" width="140" height="8" rx="3" fill="#1B4F72"/>
    <rect x="160" y="90" width="80" height="24" rx="3" fill="#0D2B45"/>
    <rect x="164" y="94" width="72" height="16" rx="2" fill="#1B4F72"/>
    <!-- Laptop / màn hình -->
    <rect x="82" y="96" width="132" height="58" rx="5" fill="#1B4F72"/>
    <rect x="86" y="100" width="124" height="50" rx="3" fill="#0D2B45"/>
    <rect x="90" y="104" width="116" height="42" rx="2" fill="#1A3A50"/>
    <!-- UI giả màn hình -->
    <rect x="94" y="108" width="108" height="8" rx="2" fill="#2E86C1" opacity="0.7"/>
    <rect x="94" y="120" width="70" height="5" rx="1" fill="#5DADE2" opacity="0.5"/>
    <rect x="94" y="129" width="85" height="5" rx="1" fill="#5DADE2" opacity="0.4"/>
    <rect x="94" y="138" width="50" height="5" rx="1" fill="#5DADE2" opacity="0.3"/>
    <!-- Chuột máy tính -->
    <ellipse cx="265" cy="158" rx="14" ry="18" fill="#2C5F7A"/>
    <line x1="265" y1="146" x2="265" y2="160" stroke="#1B4F72" stroke-width="1.5"/>
    <text x="200" y="286" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">BÀN LÀM VIỆC HIỆN ĐẠI • NGĂN KÉO</text>
  </svg>`,

  /* 10. Ghế văn phòng */
  'ghe-van-phong': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#D6EAF8"/>
    <ellipse cx="200" cy="270" rx="110" ry="14" fill="rgba(27,79,114,0.10)"/>
    <!-- Chân sao 5 nhánh -->
    <line x1="200" y1="248" x2="200" y2="220" stroke="#1B4F72" stroke-width="8" stroke-linecap="round"/>
    <line x1="200" y1="248" x2="138" y2="265" stroke="#1B4F72" stroke-width="7" stroke-linecap="round"/>
    <line x1="200" y1="248" x2="262" y2="265" stroke="#1B4F72" stroke-width="7" stroke-linecap="round"/>
    <line x1="200" y1="248" x2="155" y2="280" stroke="#1B4F72" stroke-width="7" stroke-linecap="round"/>
    <line x1="200" y1="248" x2="245" y2="280" stroke="#1B4F72" stroke-width="7" stroke-linecap="round"/>
    <!-- Bánh xe -->
    <circle cx="200" cy="248" r="10" fill="#2C5F7A"/>
    <circle cx="138" cy="265" r="6" fill="#2C5F7A"/>
    <circle cx="262" cy="265" r="6" fill="#2C5F7A"/>
    <circle cx="155" cy="280" r="6" fill="#2C5F7A"/>
    <circle cx="245" cy="280" r="6" fill="#2C5F7A"/>
    <!-- Piston khí nén -->
    <rect x="193" y="192" width="14" height="32" rx="4" fill="#3E7A99"/>
    <!-- Phần ngồi -->
    <ellipse cx="200" cy="190" rx="78" ry="20" fill="#2E86C1"/>
    <ellipse cx="200" cy="188" rx="74" ry="17" fill="#3A9BD5"/>
    <!-- Tựa lưng lưới -->
    <rect x="148" y="86" width="104" height="108" rx="12" fill="#1B4F72"/>
    <rect x="154" y="92" width="92" height="96" rx="9" fill="#2C5F7A"/>
    <!-- Hoa văn lưới lưng -->
    <rect x="158" y="96" width="84" height="88" rx="6" fill="none" stroke="#3E7A99" stroke-width="1.5"/>
    <line x1="176" y1="96" x2="176" y2="184" stroke="#3E7A99" stroke-width="1" opacity="0.5"/>
    <line x1="200" y1="96" x2="200" y2="184" stroke="#3E7A99" stroke-width="1" opacity="0.5"/>
    <line x1="224" y1="96" x2="224" y2="184" stroke="#3E7A99" stroke-width="1" opacity="0.5"/>
    <line x1="158" y1="120" x2="242" y2="120" stroke="#3E7A99" stroke-width="1" opacity="0.5"/>
    <line x1="158" y1="144" x2="242" y2="144" stroke="#3E7A99" stroke-width="1" opacity="0.5"/>
    <line x1="158" y1="168" x2="242" y2="168" stroke="#3E7A99" stroke-width="1" opacity="0.5"/>
    <!-- Tựa tay -->
    <rect x="118" y="172" width="34" height="12" rx="5" fill="#2E86C1"/>
    <rect x="248" y="172" width="34" height="12" rx="5" fill="#2E86C1"/>
    <rect x="122" y="172" width="8" height="30" rx="3" fill="#2C5F7A"/>
    <rect x="270" y="172" width="8" height="30" rx="3" fill="#2C5F7A"/>
    <text x="200" y="296" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">GHẾ VĂN PHÒNG ERGONOMIC</text>
  </svg>`,

  /* 11. Bộ bàn ghế ban công mây */
  'bo-ban-ghe-ban-cong': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#C5DCE8"/>
    <!-- Nền sàn gạch -->
    <rect x="0" y="220" width="400" height="80" fill="#AED6F1" opacity="0.4"/>
    <line x1="0" y1="240" x2="400" y2="240" stroke="#85C1E9" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="260" x2="400" y2="260" stroke="#85C1E9" stroke-width="1" opacity="0.4"/>
    <!-- Bàn tròn ban công -->
    <ellipse cx="200" cy="188" rx="62" ry="18" fill="#1B4F72" opacity="0.25"/>
    <circle cx="200" cy="175" r="62" fill="#2C5F7A"/>
    <circle cx="200" cy="172" r="58" fill="#3E7A99"/>
    <!-- Hoa văn mây bàn -->
    <circle cx="200" cy="172" r="42" fill="none" stroke="#2C5F7A" stroke-width="2"/>
    <circle cx="200" cy="172" r="22" fill="none" stroke="#2C5F7A" stroke-width="2"/>
    <line x1="158" y1="172" x2="242" y2="172" stroke="#2C5F7A" stroke-width="1.5" opacity="0.5"/>
    <line x1="200" y1="130" x2="200" y2="214" stroke="#2C5F7A" stroke-width="1.5" opacity="0.5"/>
    <!-- Chân bàn -->
    <rect x="195" y="190" width="10" height="36" rx="4" fill="#1B4F72"/>
    <!-- Ghế mây ban công trái -->
    <rect x="70" y="140" width="80" height="80" rx="12" fill="#2E86C1"/>
    <rect x="76" y="146" width="68" height="68" rx="9" fill="#3A9BD5"/>
    <ellipse cx="110" cy="146" rx="36" ry="12" fill="#2E86C1"/>
    <!-- Lưng ghế trái -->
    <rect x="72" y="72" width="76" height="76" rx="10" fill="#1B4F72"/>
    <rect x="78" y="78" width="64" height="64" rx="7" fill="#2C5F7A"/>
    <!-- Hoa văn ghế trái -->
    <circle cx="110" cy="110" r="22" fill="none" stroke="#3E7A99" stroke-width="2"/>
    <!-- Ghế mây ban công phải -->
    <rect x="250" y="140" width="80" height="80" rx="12" fill="#2E86C1"/>
    <rect x="256" y="146" width="68" height="68" rx="9" fill="#3A9BD5"/>
    <ellipse cx="290" cy="146" rx="36" ry="12" fill="#2E86C1"/>
    <!-- Lưng ghế phải -->
    <rect x="252" y="72" width="76" height="76" rx="10" fill="#1B4F72"/>
    <rect x="258" y="78" width="64" height="64" rx="7" fill="#2C5F7A"/>
    <circle cx="290" cy="110" r="22" fill="none" stroke="#3E7A99" stroke-width="2"/>
    <!-- Cây cảnh -->
    <rect x="360" y="160" width="12" height="60" rx="3" fill="#2C5F7A"/>
    <ellipse cx="366" cy="148" rx="24" ry="30" fill="#117A65" opacity="0.8"/>
    <ellipse cx="354" cy="158" rx="18" ry="22" fill="#0E6655" opacity="0.7"/>
    <text x="200" y="290" font-family="'Roboto',sans-serif" font-size="11" font-weight="700" fill="#1B4F72" text-anchor="middle">BỘ BÀN GHẾ BAN CÔNG • MÂY TỔNG HỢP</text>
  </svg>`,

  /* 12. Hero banner 1 */
  'hero-1': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 580">
    <defs>
      <linearGradient id="heroG1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0D2B45"/><stop offset="50%" stop-color="#1B4F72"/>
        <stop offset="100%" stop-color="#1ABC9C"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="580" fill="url(#heroG1)"/>
    <!-- Phòng khách hero -->
    <!-- Sofa lớn -->
    <rect x="620" y="300" width="420" height="160" rx="16" fill="#2E86C1" opacity="0.75"/>
    <rect x="630" y="268" width="400" height="80" rx="12" fill="#3A9BD5" opacity="0.7"/>
    <rect x="612" y="275" width="55" height="155" rx="12" fill="#1A7FC1" opacity="0.8"/>
    <rect x="973" y="275" width="55" height="155" rx="12" fill="#1A7FC1" opacity="0.8"/>
    <!-- Bàn trà -->
    <rect x="680" y="455" width="240" height="12" rx="5" fill="#AED6F1" opacity="0.6"/>
    <rect x="700" y="467" width="8" height="30" rx="3" fill="#5DADE2" opacity="0.5"/>
    <rect x="892" y="467" width="8" height="30" rx="3" fill="#5DADE2" opacity="0.5"/>
    <!-- Cây cảnh góc -->
    <rect x="1120" y="260" width="18" height="120" rx="5" fill="#117A65" opacity="0.7"/>
    <ellipse cx="1129" cy="230" rx="52" ry="70" fill="#117A65" opacity="0.6"/>
    <ellipse cx="1110" cy="260" rx="36" ry="48" fill="#0E6655" opacity="0.5"/>
    <!-- Đèn sàn -->
    <rect x="600" y="240" width="8" height="180" rx="3" fill="#AED6F1" opacity="0.5"/>
    <ellipse cx="604" cy="240" rx="28" ry="38" fill="#D6EAF8" opacity="0.25"/>
    <!-- Particles -->
    <circle cx="100" cy="100" r="3" fill="#5DADE2" opacity="0.4"/>
    <circle cx="200" cy="50" r="2" fill="#AED6F1" opacity="0.3"/>
    <circle cx="400" cy="150" r="4" fill="#1ABC9C" opacity="0.3"/>
    <circle cx="550" cy="80" r="2.5" fill="#5DADE2" opacity="0.35"/>
    <circle cx="50" cy="300" r="3.5" fill="#AED6F1" opacity="0.3"/>
  </svg>`,

};

/*
 * Hàm chính: Lấy SVG data URL theo key sản phẩm
 * @param {string} key - Tên key trong SVG_IMAGES
 * @returns {string} - Data URL base64 của SVG
 */
function getSVGDataURL(key) {
  const svg = SVG_IMAGES[key] || SVG_IMAGES['sofa-3-cho'];
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/*
 * Lấy SVG dựa trên room + index sản phẩm
 * Tự động chọn SVG phù hợp hoặc tạo placeholder đẹp
 * @param {object} product - Object sản phẩm từ data.js
 * @returns {string} - HTML string <img> hoặc <div> placeholder
 */
function getProductImageHTML(product, className = 'product-img') {
  // Map room sang key SVG
  const roomKeyMap = {
    'phong-khach':    ['sofa-3-cho','ban-tra-kinh','ke-tv','ghe-don'],
    'phong-ngu':      ['giuong-ngu','tu-quan-ao'],
    'phong-bep':      ['ban-an'],
    'nha-ve-sinh':    ['tu-guong-lavabo'],
    'phong-lam-viec': ['ban-lam-viec','ghe-van-phong'],
    'ban-cong':       ['bo-ban-ghe-ban-cong'],
  };
  const keys = roomKeyMap[product.room] || [];
  const idx  = (product.id - 1) % Math.max(keys.length, 1);
  const key  = keys[idx] || null;

  if (key && SVG_IMAGES[key]) {
    const url = getSVGDataURL(key);
    return `<img class="${className}" src="${url}" alt="${product.name}"
      style="width:100%;height:100%;object-fit:cover;" />`;
  }

  // Fallback: gradient placeholder
  const colors = {
    'phong-khach':'#2E86C1','phong-ngu':'#1B4F72','phong-bep':'#117A65',
    'nha-ve-sinh':'#3E7A99','phong-lam-viec':'#2C5F7A','ban-cong':'#0E6655'
  };
  const emojis = {
    'phong-khach':'🛋️','phong-ngu':'🛏️','phong-bep':'🍳',
    'nha-ve-sinh':'🚿','phong-lam-viec':'🖥️','ban-cong':'🌿'
  };
  const c = colors[product.room] || '#2E86C1';
  const e = emojis[product.room] || '🪑';
  return `<div class="${className}" style="width:100%;height:100%;
    background:linear-gradient(135deg,${c}22,${c}55);
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;">
    <span style="font-size:52px;line-height:1">${e}</span>
    <span style="font-size:10px;font-weight:600;color:${c};opacity:0.7;text-align:center;padding:0 8px">${product.name}</span>
    <span style="font-size:9px;color:${c};opacity:0.4">Đặt ảnh: images/${product.room}/</span>
  </div>`;
}
