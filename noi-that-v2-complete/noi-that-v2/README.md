# 🏠 IndigoSpace — Website Nội Thất Ecommerce v2.0
> Tông màu lạnh (Navy/Blue/Teal) · Font Roboto · 34 sản phẩm · 6 phòng · 4 phong cách · SVG hình mẫu sẵn

---

## 📁 Cấu Trúc & Giải Thích File

```
noi-that/
├── index.html              ← Trang chủ: hero slider, room, featured, styles
├── products.html           ← Danh sách sản phẩm + bộ lọc sidebar
├── product-detail.html     ← Chi tiết: gallery SVG, chọn size/vật liệu/qty
├── cart.html               ← Giỏ hàng: hóa đơn chi tiết, thuế VAT, voucher
├── checkout.html           ← Thanh toán: form địa chỉ, phương thức
├── login.html              ← Đăng nhập / Đăng ký
├── admin/index.html        ← Dashboard admin toàn năng
│
├── css/
│   ├── main.css            ← ⭐ Biến CSS toàn cục (màu sắc, spacing, typography)
│   ├── header.css          ← Header sticky, navigation, footer
│   ├── home.css            ← Hero slider, room grid, style showcase
│   ├── products.css        ← Sản phẩm, filter sidebar, product detail
│   │                          + CĂNG CHỈNH HÌNH (aspect-ratio, object-fit)
│   ├── cart.css            ← Giỏ hàng, hóa đơn, checkout, login
│   └── admin.css           ← Dashboard, bảng quản lý, stats cards
│
└── js/
    ├── data.js             ← ⭐ 34 sản phẩm + rooms/styles/materials/vouchers
    ├── images-svg.js       ← ⭐ Hình SVG mẫu cho từng loại nội thất
    ├── cart.js             ← Quản lý giỏ hàng localStorage + CartUI + showToast
    ├── products.js         ← Filter, sort, pagination, render card
    ├── detail-auth-admin.js← Chi tiết SP + Auth (login/register) + Admin
    └── main.js             ← Hero slider, search, mobile menu, icons SVG
```

---

## 🖼️ Hình Ảnh — Cách Thay Ảnh Thật

### Hình mẫu SVG có sẵn (tự động hiển thị)
File `js/images-svg.js` chứa 12+ hình SVG vẽ sẵn theo tông lạnh:
- Sofa 3 chỗ Bắc Âu, Bàn trà kính, Kệ TV cổ điển
- Ghế đơn Đông Dương, Giường ngủ, Tủ quần áo
- Bàn ăn gỗ sồi, Tủ gương lavabo
- Bàn làm việc, Ghế văn phòng ergonomic
- Bộ bàn ghế ban công mây

### Thay bằng ảnh thật
1. Đặt file ảnh vào thư mục đúng:
   ```
   images/living-room/sofa-nb-s01.jpg
   images/bedroom/giuong-go-soi.jpg
   images/kitchen/ban-an-go-soi.jpg
   ...
   ```
2. Mở `js/data.js`, tìm sản phẩm cần đổi, sửa trường `image`:
   ```js
   image: 'images/living-room/sofa-nb-s01.jpg',  ← ĐÃ ĐÚNG RỒI
   ```
3. Mở `js/images-svg.js`, trong hàm `getProductImageHTML()`,
   thêm điều kiện kiểm tra file thật:
   ```js
   // Hệ thống tự fallback sang SVG nếu không tìm thấy file thật
   ```

---

## 🚀 Cách Chạy

```bash
# Cách 1: Mở trực tiếp
open index.html    # macOS
start index.html   # Windows

# Cách 2: Live Server (khuyến nghị, tránh CORS)
# Cài VS Code Extension "Live Server"
# Click chuột phải index.html → Open with Live Server
```

---

## 🔑 Tài Khoản Demo

| Loại | Email | Mật khẩu |
|------|-------|----------|
| Admin | admin@noithat.vn | admin123 |
| Khách hàng | bat-ky@email.com | bat-ky-pass |

---

## 🎟️ Voucher Test

| Mã | Loại | Điều kiện |
|----|------|-----------|
| `NOITHAT10` | Giảm 10% | Từ 5 triệu |
| `SALE2024` | Giảm 15% | Từ 10 triệu |
| `NOITHAT200` | Giảm 200K | Từ 2 triệu |
| `FREESHIP` | Miễn phí ship | Từ 1 triệu |

---

## 🎨 Bảng Màu Lạnh (CSS Variables)

```css
--c-navy:      #0D2B45   /* Xanh navy đậm — header, footer */
--c-blue-dark: #1B4F72   /* Xanh đậm — màu chính brand */
--c-blue-mid:  #2E86C1   /* Xanh giữa — buttons, links */
--c-blue-light:#5DADE2   /* Xanh nhạt — hover states */
--c-teal:      #117A65   /* Teal — accent, prices */
--c-frost:     #EBF5FB   /* Băng trắng — nền trang */
```

---

## 📐 Căn Chỉnh Hình Ảnh

Tất cả hình đã được căn chỉnh với:
```css
.product-img-wrap { aspect-ratio: 4 / 3; overflow: hidden; }
.product-img { width:100%; height:100%; object-fit:cover; object-position:center; }
```
- **product-img-wrap**: Luôn giữ tỷ lệ 4:3 cho tất cả card
- **object-fit: cover**: Ảnh lấp đầy khung, không méo, không trắng viền
- **Gallery detail**: aspect-ratio 4:3, thumbs hình vuông (1:1)
- **Cart**: fixed 72×72px, admin: 44×44px
