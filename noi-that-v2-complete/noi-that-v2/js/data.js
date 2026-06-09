/* ============================================================
   data.js — Dữ Liệu Sản Phẩm & Config
   30 sản phẩm | 6 phòng | 4 phong cách | kèm size & giá chi tiết
   ============================================================ */

/* ===== CẤU HÌNH PHÒNG ===== */
const ROOMS = [
  { id: 'phong-khach',    label: 'Phòng Khách',      icon: 'sofa',    count: 8 },
  { id: 'phong-ngu',      label: 'Phòng Ngủ',        icon: 'bed',     count: 7 },
  { id: 'phong-bep',      label: 'Phòng Bếp',        icon: 'kitchen', count: 6 },
  { id: 'nha-ve-sinh',    label: 'Nhà Vệ Sinh',      icon: 'bath',    count: 5 },
  { id: 'phong-lam-viec', label: 'Phòng Làm Việc',   icon: 'office',  count: 5 },
  { id: 'ban-cong',       label: 'Ban Công',          icon: 'outdoor', count: 4 },
];

/* ===== CẤU HÌNH PHONG CÁCH ===== */
const STYLES = [
  { id: 'co-dien',    label: 'Cổ Điển',       color: '#5D4037', desc: 'Đường nét chạm khắc tinh xảo, gỗ óc chó tối màu, sang trọng cổ kính' },
  { id: 'hien-dai',   label: 'Hiện Đại',       color: '#1B4F72', desc: 'Tối giản, đường thẳng sắc nét, chất liệu kim loại và kính hiện đại' },
  { id: 'dong-duong', label: 'Đông Dương',     color: '#827717', desc: 'Mây tre đan, gỗ tự nhiên, hoa văn Á Đông, gần gũi thiên nhiên' },
  { id: 'tan-co-dien',label: 'Tân Cổ Điển',   color: '#0E6655', desc: 'Kết hợp cổ điển và hiện đại, đường nét thanh lịch, màu trung tính' },
];

/* ===== CẤU HÌNH VẬT LIỆU ===== */
const MATERIALS = [
  { id: 'go-soi',    label: 'Gỗ Sồi',         color: '#C8A97E' },
  { id: 'go-oc-cho', label: 'Gỗ Óc Chó',      color: '#5D3A1A' },
  { id: 'go-thong',  label: 'Gỗ Thông',        color: '#D4B896' },
  { id: 'go-mdf',    label: 'Gỗ MDF',          color: '#B8A898' },
  { id: 'kim-loai',  label: 'Kim Loại',        color: '#78909C' },
  { id: 'kinh',      label: 'Kính',            color: '#B2EBF2' },
  { id: 'may-tre',   label: 'Mây Tre',         color: '#BCAA84' },
  { id: 'da-cam-thach', label: 'Đá Cẩm Thạch',color: '#E0E0E0' },
  { id: 'vai',       label: 'Vải',             color: '#90A4AE' },
  { id: 'da',        label: 'Da Thật',         color: '#795548' },
];

/* ===== DỮ LIỆU SẢN PHẨM ===== */
const PRODUCTS = [

  /* ============ PHÒNG KHÁCH (8 sản phẩm) ============ */
  {
    id: 1,
    name: 'Sofa 3 Chỗ Bắc Âu NB-S01',
    slug: 'sofa-3-cho-bac-au',
    room: 'phong-khach', roomLabel: 'Phòng Khách',
    style: 'hien-dai',   styleLabel: 'Hiện Đại',
    materials: ['vai', 'da'],
    defaultMaterial: 'vai',
    // Giá theo size (VNĐ)
    sizes: [
      { label: '1.8m – 2 chỗ', price: 6800000 },
      { label: '2.1m – 3 chỗ', price: 8500000 },
      { label: '2.4m – 3 chỗ +', price: 10200000 },
    ],
    materialPrices: { 'vai': 0, 'da': 3500000 },
    basePrice: 8500000,
    // ĐẶT ẢNH: images/living-room/sofa-nb-s01.jpg
    image: '../images/living-room/1.jpg',
    thumb: 'phong-khach',
    badge: 'Bán Chạy',
    badgeType: 'hot',
    rating: 4.8, reviews: 124,
    featured: true, inStock: true,
    description: 'Sofa phong cách Bắc Âu với chân gỗ tự nhiên sơn trắng, đệm mút cao cấp D40, vải cotton pha polyester chống bẩn. Thiết kế tối giản nhưng sang trọng, phù hợp mọi không gian phòng khách hiện đại.',
    features: ['Chân gỗ sồi sơn trắng', 'Đệm mút D40 cao cấp', 'Vải chống bẩn, tháo giặt được', 'Khung sắt gia cố bên trong'],
    specs: { 'Kích thước': '2.1m × 0.9m × 0.78m', 'Trọng lượng': '52 kg', 'Độ bền': 'Bảo hành 3 năm', 'Màu sắc': 'Xanh lạnh / Xám / Trắng kem' }
  },

  {
    id: 2,
    name: 'Bàn Trà Kính Cường Lực BT-K02',
    slug: 'ban-tra-kinh-cuong-luc',
    room: 'phong-khach', roomLabel: 'Phòng Khách',
    style: 'hien-dai',   styleLabel: 'Hiện Đại',
    materials: ['kinh', 'kim-loai'],
    defaultMaterial: 'kinh',
    sizes: [
      { label: '1.0m × 0.55m', price: 2800000 },
      { label: '1.2m × 0.65m', price: 3500000 },
      { label: '1.4m × 0.75m', price: 4200000 },
    ],
    materialPrices: { 'kinh': 0, 'kim-loai': 800000 },
    basePrice: 3500000,
    image: 'images/living-room/2.jpg',
    thumb: 'phong-khach',
    badge: 'Mới',
    badgeType: 'new',
    rating: 4.6, reviews: 87,
    featured: true, inStock: true,
    description: 'Bàn trà kính cường lực 12mm an toàn, chân inox 304 mạ vàng. Thiết kế hiện đại, dễ lau chùi, không gian thoáng đãng.',
    features: ['Kính cường lực 12mm', 'Chân inox 304 bền bỉ', 'Góc bo tròn an toàn', 'Trọng tải 80 kg'],
    specs: { 'Kích thước': '1.2m × 0.65m × 0.45m', 'Vật liệu': 'Kính + Inox 304', 'Màu sắc': 'Trong suốt / Đen mờ' }
  },

  {
    id: 3,
    name: 'Kệ TV Gỗ Cổ Điển KTV-CD03',
    slug: 'ke-tv-go-co-dien',
    room: 'phong-khach', roomLabel: 'Phòng Khách',
    style: 'co-dien',    styleLabel: 'Cổ Điển',
    materials: ['go-oc-cho', 'go-soi'],
    defaultMaterial: 'go-oc-cho',
    sizes: [
      { label: '1.4m', price: 4500000 },
      { label: '1.6m', price: 5500000 },
      { label: '1.8m', price: 6800000 },
      { label: '2.0m', price: 8200000 },
    ],
    materialPrices: { 'go-oc-cho': 0, 'go-soi': -800000 },
    basePrice: 5500000,
    image: 'images/living-room/3.jpg',
    thumb: 'phong-khach',
    badge: null, badgeType: null,
    rating: 4.7, reviews: 63,
    featured: false, inStock: true,
    description: 'Kệ TV phong cách cổ điển với họa tiết chạm khắc thủ công, gỗ óc chó nguyên khối. Ngăn kéo và cánh tủ rộng rãi lưu trữ tiện lợi.',
    features: ['Gỗ óc chó nguyên khối', 'Chạm khắc thủ công', '4 ngăn kéo + 2 cánh tủ', 'Sơn PU bóng chống ẩm'],
    specs: { 'Kích thước': '1.6m × 0.5m × 0.6m', 'Chịu tải TV': 'Đến 75 inch' }
  },

  {
    id: 4,
    name: 'Ghế Đơn Đông Dương GD-DD04',
    slug: 'ghe-don-dong-duong',
    room: 'phong-khach', roomLabel: 'Phòng Khách',
    style: 'dong-duong',  styleLabel: 'Đông Dương',
    materials: ['may-tre', 'vai'],
    defaultMaterial: 'may-tre',
    sizes: [
      { label: 'Size S – 0.65m rộng', price: 1800000 },
      { label: 'Size M – 0.75m rộng', price: 2200000 },
      { label: 'Size L – 0.85m rộng', price: 2700000 },
    ],
    materialPrices: { 'may-tre': 0, 'vai': -200000 },
    basePrice: 2200000,
    image: 'images/living-room/4.png',
    thumb: 'phong-khach',
    badge: 'Sale 15%',
    badgeType: 'sale',
    rating: 4.5, reviews: 41,
    featured: true, inStock: true,
    description: 'Ghế đơn phong cách Đông Dương làm từ mây tre đan thủ công, bọc đệm vải lanh tự nhiên. Nhẹ nhàng, thoáng khí, gần gũi thiên nhiên.',
    features: ['Mây tre đan thủ công', 'Khung gỗ tràm bền chắc', 'Đệm lanh tự nhiên', 'Trọng lượng nhẹ 8 kg'],
    specs: { 'Kích thước': '0.75m × 0.80m × 0.90m', 'Nguồn gốc': 'Thủ công mỹ nghệ Việt Nam' }
  },

  {
    id: 5,
    name: 'Tủ Trang Trí Tân Cổ Điển TTT-TCD05',
    slug: 'tu-trang-tri-tan-co-dien',
    room: 'phong-khach', roomLabel: 'Phòng Khách',
    style: 'tan-co-dien', styleLabel: 'Tân Cổ Điển',
    materials: ['go-soi', 'go-mdf'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '0.8m × 0.4m',  price: 3200000 },
      { label: '1.0m × 0.45m', price: 4100000 },
      { label: '1.2m × 0.5m',  price: 5200000 },
    ],
    materialPrices: { 'go-soi': 0, 'go-mdf': -700000 },
    basePrice: 4100000,
    image: 'images/living-room/5.png',
    thumb: 'phong-khach',
    badge: 'Mới', badgeType: 'new',
    rating: 4.9, reviews: 28,
    featured: true, inStock: true,
    description: 'Tủ trang trí phong cách tân cổ điển với chân cao thanh lịch, cánh kính viền vàng. Phù hợp trưng bày đồ sứ, tượng, sách.',
    features: ['Gỗ sồi Mỹ nhập khẩu', 'Cánh kính viền đồng mạ vàng', '6 ngăn điều chỉnh độ cao', 'Đèn LED nội thất'],
    specs: { 'Kích thước': '1.0m × 0.45m × 1.8m', 'Trọng tải mỗi ngăn': '20 kg' }
  },

  {
    id: 6,
    name: 'Sofa Góc Chữ L Hiện Đại SL-HD06',
    slug: 'sofa-goc-chu-l',
    room: 'phong-khach', roomLabel: 'Phòng Khách',
    style: 'hien-dai',   styleLabel: 'Hiện Đại',
    materials: ['vai', 'da'],
    defaultMaterial: 'vai',
    sizes: [
      { label: '2.6m × 1.6m', price: 14500000 },
      { label: '2.8m × 1.8m', price: 17200000 },
      { label: '3.0m × 2.0m', price: 20500000 },
    ],
    materialPrices: { 'vai': 0, 'da': 5000000 },
    basePrice: 17200000,
    image: 'images/living-room/sofa-goc-l.jpg',
    thumb: 'phong-khach',
    badge: 'Cao Cấp', badgeType: 'hot',
    rating: 4.9, reviews: 56,
    featured: true, inStock: true,
    description: 'Sofa góc chữ L cỡ lớn với ghế đôn Ottoman tháo lắp. Thiết kế modular linh hoạt, phù hợp không gian phòng khách rộng.',
    features: ['Modular tháo lắp linh hoạt', 'Đệm mút ép lạnh D45', 'Chân kim loại mạ đen', 'Kèm gối trang trí'],
    specs: { 'Kích thước': '2.8m × 1.8m', 'Số chỗ ngồi': 'Tối đa 6 người' }
  },

  {
    id: 7,
    name: 'Bàn Trà Gỗ Óc Chó BT-OC07',
    slug: 'ban-tra-go-oc-cho',
    room: 'phong-khach', roomLabel: 'Phòng Khách',
    style: 'co-dien',    styleLabel: 'Cổ Điển',
    materials: ['go-oc-cho', 'da-cam-thach'],
    defaultMaterial: 'go-oc-cho',
    sizes: [
      { label: '1.1m × 0.6m', price: 5800000 },
      { label: '1.3m × 0.7m', price: 7200000 },
    ],
    materialPrices: { 'go-oc-cho': 0, 'da-cam-thach': 4500000 },
    basePrice: 7200000,
    image: 'images/living-room/7.png',
    thumb: 'phong-khach',
    badge: null, badgeType: null,
    rating: 4.7, reviews: 33,
    featured: false, inStock: true,
    description: 'Bàn trà gỗ óc chó nguyên tấm nguyên khối, không ghép. Vân gỗ độc đáo, sơn dầu tự nhiên tôn lên màu sắc gỗ.',
    features: ['Gỗ óc chó nguyên khối', 'Vân gỗ độc đáo không lặp lại', 'Sơn dầu tự nhiên an toàn', 'Ngăn để sách bên dưới'],
    specs: { 'Kích thước': '1.3m × 0.7m × 0.42m', 'Độ dày mặt bàn': '5cm' }
  },

  {
    id: 8,
    name: 'Kệ Sách Đứng Tân Cổ Điển KSD-08',
    slug: 'ke-sach-tan-co-dien',
    room: 'phong-khach', roomLabel: 'Phòng Khách',
    style: 'tan-co-dien', styleLabel: 'Tân Cổ Điển',
    materials: ['go-soi', 'kim-loai'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '0.8m × 0.3m × 1.6m', price: 2900000 },
      { label: '1.0m × 0.35m × 1.8m', price: 3800000 },
      { label: '1.2m × 0.4m × 2.0m', price: 5200000 },
    ],
    materialPrices: { 'go-soi': 0, 'kim-loai': 600000 },
    basePrice: 3800000,
    image: 'images/living-room/8.png',
    thumb: 'phong-khach',
    badge: null, badgeType: null,
    rating: 4.5, reviews: 19,
    featured: false, inStock: true,
    description: 'Kệ sách đứng phong cách tân cổ điển với ngăn mở và ngăn tủ kết hợp. Vách ngăn điều chỉnh linh hoạt.',
    features: ['5 ngăn mở + 2 cánh tủ', 'Vách ngăn điều chỉnh', 'Sơn pu chống trầy', 'Dễ lắp ráp'],
    specs: { 'Kích thước': '1.0m × 0.35m × 1.8m', 'Trọng tải': '30 kg/ngăn' }
  },

  /* ============ PHÒNG NGỦ (7 sản phẩm) ============ */
  {
    id: 9,
    name: 'Giường Ngủ Gỗ Sồi GN-SO09',
    slug: 'giuong-ngu-go-soi',
    room: 'phong-ngu',   roomLabel: 'Phòng Ngủ',
    style: 'tan-co-dien', styleLabel: 'Tân Cổ Điển',
    materials: ['go-soi', 'go-oc-cho'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '1.2m × 2.0m – 1 người', price: 5800000 },
      { label: '1.4m × 2.0m – 1.5 người', price: 6900000 },
      { label: '1.6m × 2.0m – Đôi',       price: 8500000 },
      { label: '1.8m × 2.0m – King',       price: 10200000 },
    ],
    materialPrices: { 'go-soi': 0, 'go-oc-cho': 2200000 },
    basePrice: 8500000,
    image: 'images/bedroom/9.png',
    thumb: 'phong-ngu',
    badge: 'Bán Chạy', badgeType: 'hot',
    rating: 4.9, reviews: 198,
    featured: true, inStock: true,
    description: 'Giường ngủ gỗ sồi Mỹ với đầu giường thiết kế bọc da, chân giường cao 25cm tiện vệ sinh. Khung giường gia cố chắc chắn, tải trọng 500 kg.',
    features: ['Gỗ sồi Mỹ nhập khẩu', 'Đầu giường bọc da PU cao cấp', 'Chân 25cm, có bánh xe', 'Tải trọng 500 kg'],
    specs: { 'Kích thước': '1.8m × 2.0m × 1.2m', 'Chiều cao đầu giường': '1.2m', 'Màu sắc': 'Tự nhiên / Nâu walnut' }
  },

  {
    id: 10,
    name: 'Tủ Quần Áo 4 Cánh Cổ Điển TQA-10',
    slug: 'tu-quan-ao-co-dien',
    room: 'phong-ngu',  roomLabel: 'Phòng Ngủ',
    style: 'co-dien',   styleLabel: 'Cổ Điển',
    materials: ['go-oc-cho', 'go-mdf'],
    defaultMaterial: 'go-oc-cho',
    sizes: [
      { label: '1.6m – 3 cánh', price: 8900000 },
      { label: '2.0m – 4 cánh', price: 11500000 },
      { label: '2.4m – 5 cánh', price: 14200000 },
    ],
    materialPrices: { 'go-oc-cho': 0, 'go-mdf': -2800000 },
    basePrice: 11500000,
    image: 'images/bedroom/10.png',
    thumb: 'phong-ngu',
    badge: null, badgeType: null,
    rating: 4.7, reviews: 76,
    featured: true, inStock: true,
    description: 'Tủ quần áo phong cách cổ điển European với gương soi toàn thân, chạm khắc hoa văn thủ công. Bên trong thiết kế nhiều ngăn linh hoạt.',
    features: ['Gỗ óc chó nguyên khối', 'Gương soi toàn thân', 'Thanh treo + ngăn kéo', 'Chống ẩm mốc'],
    specs: { 'Kích thước': '2.0m × 0.6m × 2.2m', 'Số ngăn': '12 ngăn + thanh treo', 'Chống ẩm': 'Có lớp phủ chống ẩm' }
  },

  {
    id: 11,
    name: 'Bàn Phấn Đông Dương BP-DD11',
    slug: 'ban-phan-dong-duong',
    room: 'phong-ngu',   roomLabel: 'Phòng Ngủ',
    style: 'dong-duong', styleLabel: 'Đông Dương',
    materials: ['may-tre', 'go-thong'],
    defaultMaterial: 'may-tre',
    sizes: [
      { label: '0.8m – Nhỏ',  price: 3200000 },
      { label: '1.0m – Vừa',  price: 4100000 },
    ],
    materialPrices: { 'may-tre': 0, 'go-thong': -400000 },
    basePrice: 4100000,
    image: 'images/bedroom/11.png',
    thumb: 'phong-ngu',
    badge: 'Mới', badgeType: 'new',
    rating: 4.6, reviews: 34,
    featured: false, inStock: true,
    description: 'Bàn phấn phong cách Đông Dương với khung mây đan thủ công, mặt bàn gỗ tự nhiên, gương bo khung mây. Nhẹ nhàng, thanh thoát.',
    features: ['Khung mây đan thủ công', 'Gỗ tràm kết hợp mây', 'Gương tròn bo khung mây', 'Ngăn nhỏ đựng đồ trang điểm'],
    specs: { 'Kích thước': '1.0m × 0.45m × 1.4m', 'Trọng lượng': '15 kg' }
  },

  {
    id: 12,
    name: 'Tủ Đầu Giường Tân Cổ Điển TDG-12',
    slug: 'tu-dau-giuong-tan-co-dien',
    room: 'phong-ngu',    roomLabel: 'Phòng Ngủ',
    style: 'tan-co-dien', styleLabel: 'Tân Cổ Điển',
    materials: ['go-soi', 'go-mdf'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '0.45m × 0.4m – 1 ngăn', price: 1200000 },
      { label: '0.5m × 0.45m – 2 ngăn', price: 1700000 },
    ],
    materialPrices: { 'go-soi': 0, 'go-mdf': -300000 },
    basePrice: 1700000,
    image: 'images/bedroom/12.png',
    thumb: 'phong-ngu',
    badge: null, badgeType: null,
    rating: 4.5, reviews: 89,
    featured: false, inStock: true,
    description: 'Tủ đầu giường nhỏ gọn với mặt bàn đủ để đèn ngủ, sách. 2 ngăn kéo có đường ray trượt êm ái.',
    features: ['Ngăn kéo trượt êm', 'Mặt đá giả marble chống nước', 'Tay cầm đồng mạ vàng', 'Bán theo cặp'],
    specs: { 'Kích thước': '0.5m × 0.45m × 0.58m', 'Ghi chú': 'Bán theo cặp, giá 1 cái' }
  },

  {
    id: 13,
    name: 'Giường Ngủ Gỗ Óc Chó Cổ Điển GN-OC13',
    slug: 'giuong-go-oc-cho-co-dien',
    room: 'phong-ngu',  roomLabel: 'Phòng Ngủ',
    style: 'co-dien',   styleLabel: 'Cổ Điển',
    materials: ['go-oc-cho'],
    defaultMaterial: 'go-oc-cho',
    sizes: [
      { label: '1.6m × 2.0m – Đôi',  price: 15800000 },
      { label: '1.8m × 2.0m – King', price: 18500000 },
    ],
    materialPrices: { 'go-oc-cho': 0 },
    basePrice: 18500000,
    image: 'images/bedroom/13.png',
    thumb: 'phong-ngu',
    badge: 'Cao Cấp', badgeType: 'hot',
    rating: 5.0, reviews: 22,
    featured: true, inStock: true,
    description: 'Giường ngủ cổ điển cao cấp từ gỗ óc chó nguyên khối nhập khẩu, đầu giường chạm khắc hoa văn cổ điển châu Âu. Sản phẩm thủ công đặt hàng riêng.',
    features: ['Gỗ óc chó nguyên khối nhập khẩu', 'Chạm khắc thủ công 100%', 'Sơn PU bóng 3 lớp', 'Tải trọng 600 kg'],
    specs: { 'Kích thước': '1.8m × 2.0m × 1.5m', 'Thời gian sản xuất': '15-20 ngày' }
  },

  {
    id: 14,
    name: 'Gương Soi Đứng Khung Gỗ GSD-14',
    slug: 'guong-soi-dung',
    room: 'phong-ngu',   roomLabel: 'Phòng Ngủ',
    style: 'tan-co-dien', styleLabel: 'Tân Cổ Điển',
    materials: ['go-soi', 'kim-loai'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '0.6m × 1.6m', price: 2100000 },
      { label: '0.7m × 1.8m', price: 2800000 },
      { label: '0.8m × 2.0m', price: 3600000 },
    ],
    materialPrices: { 'go-soi': 0, 'kim-loai': 500000 },
    basePrice: 2800000,
    image: 'images/bedroom/14.png',
    thumb: 'phong-ngu',
    badge: null, badgeType: null,
    rating: 4.8, reviews: 57,
    featured: false, inStock: true,
    description: 'Gương soi đứng toàn thân khung gỗ sồi, có thể treo tường hoặc đứng tự do nghiêng điều chỉnh góc. Gương nhập khẩu độ rõ cao.',
    features: ['Gương nhập khẩu độ rõ cao', 'Khung gỗ sồi chắc chắn', 'Nghiêng điều chỉnh -15°/+15°', 'Treo tường hoặc đứng tự do'],
    specs: { 'Kích thước': '0.7m × 1.8m', 'Độ dày khung': '3.5cm' }
  },

  {
    id: 15,
    name: 'Kệ Sách Phòng Ngủ Đông Dương KSPN-15',
    slug: 'ke-sach-phong-ngu',
    room: 'phong-ngu',   roomLabel: 'Phòng Ngủ',
    style: 'dong-duong', styleLabel: 'Đông Dương',
    materials: ['may-tre', 'go-thong'],
    defaultMaterial: 'may-tre',
    sizes: [
      { label: '0.6m × 1.4m', price: 1500000 },
      { label: '0.8m × 1.6m', price: 2100000 },
    ],
    materialPrices: { 'may-tre': 0, 'go-thong': -200000 },
    basePrice: 2100000,
    image: 'images/bedroom/15.png',
    thumb: 'phong-ngu',
    badge: null, badgeType: null,
    rating: 4.4, reviews: 29,
    featured: false, inStock: true,
    description: 'Kệ sách phòng ngủ chất liệu mây tre tự nhiên, nhẹ và thoáng. Phù hợp đặt góc phòng ngủ tạo điểm nhấn Đông Dương.',
    features: ['Mây tre tự nhiên', 'Nhẹ và thoáng', '5 ngăn cố định', 'Có thể sơn màu theo yêu cầu'],
    specs: { 'Kích thước': '0.8m × 0.3m × 1.6m', 'Trọng tải': '15 kg/ngăn' }
  },

  /* ============ PHÒNG BẾP (6 sản phẩm) ============ */
  {
    id: 16,
    name: 'Bàn Ăn Gỗ Sồi Mỹ BA-SO16',
    slug: 'ban-an-go-soi-my',
    room: 'phong-bep',  roomLabel: 'Phòng Bếp',
    style: 'hien-dai',  styleLabel: 'Hiện Đại',
    materials: ['go-soi', 'da-cam-thach'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '1.2m – 4 người', price: 5200000 },
      { label: '1.4m – 6 người', price: 6800000 },
      { label: '1.6m – 6 người', price: 8100000 },
      { label: '1.8m – 8 người', price: 9500000 },
      { label: '1.9m – 8 người', price: 10200000 },
    ],
    materialPrices: { 'go-soi': 0, 'da-cam-thach': 6800000 },
    basePrice: 6800000,
    image: 'images/kitchen/16.png',
    thumb: 'phong-bep',
    badge: 'Bán Chạy', badgeType: 'hot',
    rating: 4.8, reviews: 145,
    featured: true, inStock: true,
    description: 'Bàn ăn gỗ sồi Mỹ nguyên tấm với chân chữ A hiện đại. Mặt bàn dày 4cm, sơn dầu tự nhiên. Phù hợp phòng bếp rộng, hiện đại.',
    features: ['Gỗ sồi Mỹ FAS grade', 'Mặt bàn dày 4cm', 'Chân chữ A bằng thép sơn tĩnh điện', 'Sơn dầu tự nhiên chống nước'],
    specs: { 'Kích thước': '1.9m × 0.9m', 'Độ dày mặt': '4cm', 'Màu sắc': 'Tự nhiên / Smoke / Ebony' }
  },

  {
    id: 17,
    name: 'Ghế Ăn Tân Cổ Điển GA-TCD17',
    slug: 'ghe-an-tan-co-dien',
    room: 'phong-bep',    roomLabel: 'Phòng Bếp',
    style: 'tan-co-dien', styleLabel: 'Tân Cổ Điển',
    materials: ['vai', 'da'],
    defaultMaterial: 'vai',
    sizes: [
      { label: 'Tiêu chuẩn 0.45m × 0.52m', price: 1200000 },
      { label: 'Có tựa tay 0.55m × 0.55m',  price: 1600000 },
    ],
    materialPrices: { 'vai': 0, 'da': 500000 },
    basePrice: 1200000,
    image: 'images/kitchen/17.png',
    thumb: 'phong-bep',
    badge: null, badgeType: null,
    rating: 4.6, reviews: 88,
    featured: false, inStock: true,
    description: 'Ghế ăn tân cổ điển với khung gỗ sồi, bọc vải velvet mịn, chân gỗ có đệm cao su chống trầy sàn. Bán theo bộ 4 hoặc 6 cái.',
    features: ['Khung gỗ sồi chắc chắn', 'Bọc vải velvet mềm mại', 'Chân có đệm cao su', 'Bán theo bộ 4/6 cái'],
    specs: { 'Kích thước': '0.45m × 0.52m × 0.92m', 'Trọng tải': '150 kg' }
  },

  {
    id: 18,
    name: 'Bộ Bàn Đảo Bếp BD-BEP18',
    slug: 'ban-dao-bep',
    room: 'phong-bep', roomLabel: 'Phòng Bếp',
    style: 'hien-dai', styleLabel: 'Hiện Đại',
    materials: ['da-cam-thach', 'go-soi'],
    defaultMaterial: 'da-cam-thach',
    sizes: [
      { label: '1.0m × 0.6m', price: 8500000 },
      { label: '1.2m × 0.7m', price: 11200000 },
      { label: '1.4m × 0.8m', price: 14500000 },
    ],
    materialPrices: { 'da-cam-thach': 0, 'go-soi': -3500000 },
    basePrice: 11200000,
    image: 'images/kitchen/18.png',
    thumb: 'phong-bep',
    badge: 'Cao Cấp', badgeType: 'hot',
    rating: 4.9, reviews: 37,
    featured: true, inStock: true,
    description: 'Bàn đảo bếp mặt đá cẩm thạch nhập khẩu Ý, khung tủ gỗ sồi với ngăn kéo và kệ rượu tích hợp. Trung tâm của nhà bếp mở hiện đại.',
    features: ['Mặt đá cẩm thạch nhập khẩu Ý', 'Ngăn kéo có khóa', 'Kệ rượu tích hợp', 'Ghế bar đi kèm 2 chiếc'],
    specs: { 'Kích thước': '1.2m × 0.7m × 0.92m', 'Chiều cao': '92cm chuẩn bar' }
  },

  {
    id: 19,
    name: 'Tủ Bếp Gỗ Cổ Điển TB-CD19',
    slug: 'tu-bep-co-dien',
    room: 'phong-bep', roomLabel: 'Phòng Bếp',
    style: 'co-dien',  styleLabel: 'Cổ Điển',
    materials: ['go-soi', 'go-mdf'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '1.6m – Tủ dưới',    price: 12000000 },
      { label: '2.0m – Tủ trên+dưới', price: 18500000 },
      { label: '2.4m – Full set',    price: 26000000 },
    ],
    materialPrices: { 'go-soi': 0, 'go-mdf': -4000000 },
    basePrice: 18500000,
    image: 'images/kitchen/19.png',
    thumb: 'phong-bep',
    badge: null, badgeType: null,
    rating: 4.7, reviews: 61,
    featured: false, inStock: true,
    description: 'Tủ bếp phong cách cổ điển với cửa panel chạm khắc, tay nắm đồng mạ vàng. Tủ trên và tủ dưới bao gồm ngăn kéo, cánh mở và kệ hở.',
    features: ['Cửa panel chạm khắc thủ công', 'Tay nắm đồng mạ vàng', 'Bản lề giảm chấn Blum', 'Sơn PU bóng 5 lớp'],
    specs: { 'Kích thước': '2.0m × 0.6m × 2.0m', 'Phụ kiện': 'Blum nhập khẩu Áo' }
  },

  {
    id: 20,
    name: 'Kệ Ly Bát Đông Dương KLBD-20',
    slug: 'ke-ly-bat-dong-duong',
    room: 'phong-bep',   roomLabel: 'Phòng Bếp',
    style: 'dong-duong', styleLabel: 'Đông Dương',
    materials: ['may-tre', 'go-thong'],
    defaultMaterial: 'may-tre',
    sizes: [
      { label: '0.6m × 1.2m', price: 1800000 },
      { label: '0.8m × 1.5m', price: 2500000 },
      { label: '1.0m × 1.8m', price: 3200000 },
    ],
    materialPrices: { 'may-tre': 0, 'go-thong': -300000 },
    basePrice: 2500000,
    image: 'images/kitchen/20.png',
    thumb: 'phong-bep',
    badge: null, badgeType: null,
    rating: 4.5, reviews: 42,
    featured: false, inStock: true,
    description: 'Kệ treo ly bát chất liệu mây tre tự nhiên, mang hơi thở thiên nhiên vào bếp. Có móc treo cốc và ngăn để bát đĩa.',
    features: ['Mây tre tự nhiên', 'Móc treo cốc inox', 'Lắp tường dễ dàng', 'Kháng ẩm tốt'],
    specs: { 'Kích thước': '0.8m × 0.3m × 1.5m', 'Trọng tải': '25 kg' }
  },

  {
    id: 21,
    name: 'Ghế Bar Hiện Đại GB-HD21',
    slug: 'ghe-bar-hien-dai',
    room: 'phong-bep', roomLabel: 'Phòng Bếp',
    style: 'hien-dai', styleLabel: 'Hiện Đại',
    materials: ['da', 'vai'],
    defaultMaterial: 'da',
    sizes: [
      { label: 'Cao 63-83cm (điều chỉnh)', price: 2200000 },
      { label: 'Cao 73-93cm (điều chỉnh)', price: 2800000 },
    ],
    materialPrices: { 'da': 0, 'vai': -500000 },
    basePrice: 2800000,
    image: 'images/kitchen/21.png',
    thumb: 'phong-bep',
    badge: null, badgeType: null,
    rating: 4.7, reviews: 55,
    featured: false, inStock: true,
    description: 'Ghế bar điều chỉnh chiều cao liên tục bằng piston khí nén, xoay 360°. Chân inox bền đẹp, đệm da PU mềm mại.',
    features: ['Piston khí nén điều chỉnh chiều cao', 'Xoay 360°', 'Chân inox sáng bóng', 'Đệm da PU mềm mại'],
    specs: { 'Chiều cao điều chỉnh': '73-93cm', 'Trọng tải': '150 kg' }
  },

  /* ============ NHÀ VỆ SINH (5 sản phẩm) ============ */
  {
    id: 22,
    name: 'Tủ Gương Lavabo TGL-22',
    slug: 'tu-guong-lavabo',
    room: 'nha-ve-sinh',  roomLabel: 'Nhà Vệ Sinh',
    style: 'hien-dai',    styleLabel: 'Hiện Đại',
    materials: ['go-mdf', 'kim-loai'],
    defaultMaterial: 'go-mdf',
    sizes: [
      { label: '0.6m – 1 cửa',  price: 1850000 },
      { label: '0.8m – 1 cửa',  price: 2300000 },
      { label: '1.0m – 2 cửa',  price: 3100000 },
      { label: '1.2m – 2 cửa',  price: 3900000 },
    ],
    materialPrices: { 'go-mdf': 0, 'kim-loai': 900000 },
    basePrice: 2300000,
    image: 'images/bathroom/22.png',
    thumb: 'nha-ve-sinh',
    badge: 'Bán Chạy', badgeType: 'hot',
    rating: 4.7, reviews: 112,
    featured: true, inStock: true,
    description: 'Tủ gương lavabo chống nước cao cấp với gương soi LED cảm ứng. MDF phủ PVC chống ẩm, bản lề giảm chấn. Phù hợp phòng tắm hiện đại.',
    features: ['MDF phủ PVC chống ẩm 100%', 'Gương LED cảm ứng 3 màu ánh sáng', 'Bản lề giảm chấn êm ái', 'Ngăn chứa đồ bên trong'],
    specs: { 'Kích thước': '0.8m × 0.15m × 0.65m', 'Chống ẩm': 'IP44', 'Bảo hành': '2 năm' }
  },

  {
    id: 23,
    name: 'Kệ Phòng Tắm Inox KPT-23',
    slug: 'ke-phong-tam-inox',
    room: 'nha-ve-sinh',  roomLabel: 'Nhà Vệ Sinh',
    style: 'hien-dai',    styleLabel: 'Hiện Đại',
    materials: ['kim-loai'],
    defaultMaterial: 'kim-loai',
    sizes: [
      { label: '2 tầng – 0.4m × 0.8m', price: 850000 },
      { label: '3 tầng – 0.4m × 1.1m', price: 1150000 },
      { label: '4 tầng – 0.4m × 1.4m', price: 1450000 },
    ],
    materialPrices: { 'kim-loai': 0 },
    basePrice: 1150000,
    image: 'images/bathroom/23.png',
    thumb: 'nha-ve-sinh',
    badge: null, badgeType: null,
    rating: 4.6, reviews: 78,
    featured: false, inStock: true,
    description: 'Kệ phòng tắm inox 304 chống gỉ, chống ăn mòn. Thiết kế gọn gàng, để được nhiều đồ dùng phòng tắm. Lắp đặt không cần khoan tường.',
    features: ['Inox 304 chống gỉ bền vĩnh cửu', 'Không cần khoan tường (kẹp bồn/góc)', 'Ngăn lưới thông gió nhanh khô', 'Tải trọng 20 kg'],
    specs: { 'Kích thước': '0.4m × 0.3m × 1.1m', 'Vật liệu': 'Inox 304 bề mặt satin' }
  },

  {
    id: 24,
    name: 'Tủ Đựng Khăn Tắm Cổ Điển TDKT-24',
    slug: 'tu-dung-khan-tam',
    room: 'nha-ve-sinh', roomLabel: 'Nhà Vệ Sinh',
    style: 'co-dien',    styleLabel: 'Cổ Điển',
    materials: ['go-soi', 'go-mdf'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '0.4m × 0.3m × 0.8m', price: 1400000 },
      { label: '0.5m × 0.35m × 1.0m', price: 1900000 },
    ],
    materialPrices: { 'go-soi': 0, 'go-mdf': -400000 },
    basePrice: 1900000,
    image: 'images/bathroom/24.png',
    thumb: 'nha-ve-sinh',
    badge: null, badgeType: null,
    rating: 4.5, reviews: 31,
    featured: false, inStock: true,
    description: 'Tủ đựng khăn tắm phong cách cổ điển nhỏ gọn, gỗ sồi xử lý chống ẩm đặc biệt. Cửa lưới thoáng khí giúp khăn nhanh khô.',
    features: ['Gỗ sồi xử lý chống ẩm đặc biệt', 'Cửa lưới inox thoáng khí', '4 ngăn chứa', 'Sơn PU bóng không thấm nước'],
    specs: { 'Kích thước': '0.5m × 0.35m × 1.0m', 'Chịu độ ẩm': 'Đến 90%' }
  },

  {
    id: 25,
    name: 'Ghế Tắm Đứng Đông Dương GTD-25',
    slug: 'ghe-tam-dong-duong',
    room: 'nha-ve-sinh',  roomLabel: 'Nhà Vệ Sinh',
    style: 'dong-duong',  styleLabel: 'Đông Dương',
    materials: ['may-tre', 'go-thong'],
    defaultMaterial: 'go-thong',
    sizes: [
      { label: '0.35m × 0.3m – Nhỏ', price: 450000 },
      { label: '0.45m × 0.38m – Lớn', price: 680000 },
    ],
    materialPrices: { 'go-thong': 0, 'may-tre': -80000 },
    basePrice: 680000,
    image: 'images/bathroom/25.png',
    thumb: 'nha-ve-sinh',
    badge: null, badgeType: null,
    rating: 4.4, reviews: 47,
    featured: false, inStock: true,
    description: 'Ghế tắm đứng gỗ thông tự nhiên chống nước, chân cao su chống trượt. Nhẹ nhàng và bền, thêm nét Đông Dương cho phòng tắm.',
    features: ['Gỗ thông xử lý chống nước', 'Chân cao su chống trượt', 'Nhẹ 2.5 kg dễ di chuyển', 'Khe thông gió nhanh khô'],
    specs: { 'Kích thước': '0.45m × 0.38m × 0.45m', 'Trọng tải': '120 kg' }
  },

  {
    id: 26,
    name: 'Tủ Vanity Đơn TVD-26',
    slug: 'tu-vanity-don',
    room: 'nha-ve-sinh', roomLabel: 'Nhà Vệ Sinh',
    style: 'tan-co-dien', styleLabel: 'Tân Cổ Điển',
    materials: ['go-mdf', 'da-cam-thach'],
    defaultMaterial: 'go-mdf',
    sizes: [
      { label: '0.6m – Không bồn', price: 2800000 },
      { label: '0.8m – Không bồn', price: 3600000 },
    ],
    materialPrices: { 'go-mdf': 0, 'da-cam-thach': 3200000 },
    basePrice: 3600000,
    image: 'images/bathroom/26.png',
    thumb: 'nha-ve-sinh',
    badge: 'Mới', badgeType: 'new',
    rating: 4.8, reviews: 24,
    featured: true, inStock: true,
    description: 'Tủ vanity phòng tắm tân cổ điển với mặt đá giả marble và tay cầm vàng. Chất liệu chống ẩm hoàn toàn, thiết kế sang trọng.',
    features: ['MDF chống ẩm HMR', 'Mặt đá giả marble cao cấp', 'Tay cầm mạ vàng', 'Ngăn kéo có ray giảm chấn'],
    specs: { 'Kích thước': '0.8m × 0.5m × 0.85m', 'Bảo hành': '3 năm' }
  },

  /* ============ PHÒNG LÀM VIỆC (5 sản phẩm) ============ */
  {
    id: 27,
    name: 'Bàn Làm Việc Hiện Đại BLV-HD27',
    slug: 'ban-lam-viec-hien-dai',
    room: 'phong-lam-viec', roomLabel: 'Phòng Làm Việc',
    style: 'hien-dai',      styleLabel: 'Hiện Đại',
    materials: ['go-mdf', 'go-soi'],
    defaultMaterial: 'go-mdf',
    sizes: [
      { label: '1.2m × 0.6m', price: 2800000 },
      { label: '1.4m × 0.7m', price: 3600000 },
      { label: '1.6m × 0.75m', price: 4500000 },
      { label: '1.8m × 0.8m', price: 5400000 },
    ],
    materialPrices: { 'go-mdf': 0, 'go-soi': 1200000 },
    basePrice: 3600000,
    image: 'images/office/27.png',
    thumb: 'phong-lam-viec',
    badge: 'Bán Chạy', badgeType: 'hot',
    rating: 4.7, reviews: 203,
    featured: true, inStock: true,
    description: 'Bàn làm việc hiện đại với ngăn kéo bên phải và kệ màn hình tích hợp. Quản lý cáp gọn gàng, màu sắc lạnh trung tính phù hợp văn phòng.',
    features: ['Ngăn kéo bên phải khóa được', 'Kệ màn hình tích hợp', 'Quản lý cáp sau bàn', 'Chân thép sơn tĩnh điện'],
    specs: { 'Kích thước': '1.4m × 0.7m × 0.75m', 'Trọng tải mặt bàn': '80 kg' }
  },

  {
    id: 28,
    name: 'Ghế Văn Phòng Cao Cấp GVP-28',
    slug: 'ghe-van-phong-cao-cap',
    room: 'phong-lam-viec', roomLabel: 'Phòng Làm Việc',
    style: 'hien-dai',      styleLabel: 'Hiện Đại',
    materials: ['da', 'vai'],
    defaultMaterial: 'da',
    sizes: [
      { label: 'Standard – Đến 1.7m', price: 3500000 },
      { label: 'Executive – Đến 1.9m', price: 4800000 },
    ],
    materialPrices: { 'da': 0, 'vai': -800000 },
    basePrice: 4800000,
    image: 'images/office/28.png',
    thumb: 'phong-lam-viec',
    badge: null, badgeType: null,
    rating: 4.8, reviews: 167,
    featured: true, inStock: true,
    description: 'Ghế văn phòng ergonomic cao cấp với điều chỉnh 7 chiều. Lưng tựa lưới thoáng khí, ngả 135°, tựa tay có thể nâng hạ xoay.',
    features: ['Ergonomic 7 điều chỉnh', 'Lưng lưới thoáng khí', 'Ngả 90-135°', 'Piston khí nén class 4'],
    specs: { 'Chiều cao ngồi': '46-56cm', 'Trọng tải': '130 kg', 'Bảo hành': '3 năm' }
  },

  {
    id: 29,
    name: 'Kệ Sách Văn Phòng KSVP-29',
    slug: 'ke-sach-van-phong',
    room: 'phong-lam-viec', roomLabel: 'Phòng Làm Việc',
    style: 'tan-co-dien',   styleLabel: 'Tân Cổ Điển',
    materials: ['go-soi', 'kim-loai'],
    defaultMaterial: 'go-soi',
    sizes: [
      { label: '0.8m – 4 tầng', price: 2600000 },
      { label: '1.0m – 5 tầng', price: 3500000 },
      { label: '1.2m – 6 tầng', price: 4400000 },
    ],
    materialPrices: { 'go-soi': 0, 'kim-loai': 800000 },
    basePrice: 3500000,
    image: 'images/office/29.png',
    thumb: 'phong-lam-viec',
    badge: null, badgeType: null,
    rating: 4.6, reviews: 44,
    featured: false, inStock: true,
    description: 'Kệ sách văn phòng đứng với ngăn tủ khóa phía dưới và ngăn mở phía trên. Phong cách tân cổ điển lịch lãm.',
    features: ['Ngăn tủ khóa phía dưới', 'Ngăn điều chỉnh độ cao', 'Chân gỗ chạm khắc', 'Màu walnut tối sang trọng'],
    specs: { 'Kích thước': '1.0m × 0.35m × 2.0m', 'Ngăn': '4 mở + 1 tủ khóa' }
  },

  {
    id: 30,
    name: 'Bàn Họp Nhỏ 4 Người BH-4P30',
    slug: 'ban-hop-4-nguoi',
    room: 'phong-lam-viec', roomLabel: 'Phòng Làm Việc',
    style: 'hien-dai',      styleLabel: 'Hiện Đại',
    materials: ['go-mdf', 'da-cam-thach'],
    defaultMaterial: 'go-mdf',
    sizes: [
      { label: '1.2m × 0.8m – 4 người', price: 4200000 },
      { label: '1.5m × 0.9m – 6 người', price: 6100000 },
    ],
    materialPrices: { 'go-mdf': 0, 'da-cam-thach': 5800000 },
    basePrice: 6100000,
    image: 'images/office/30.png',
    thumb: 'phong-lam-viec',
    badge: null, badgeType: null,
    rating: 4.7, reviews: 29,
    featured: false, inStock: true,
    description: 'Bàn họp nhỏ cho phòng làm việc gia đình hoặc văn phòng nhỏ, quản lý dây cáp trung tâm, mặt bàn chịu nhiệt.',
    features: ['Quản lý cáp trung tâm', 'Mặt bàn chịu nhiệt 80°C', 'Chân thép sơn tĩnh điện', 'Dễ lau chùi'],
    specs: { 'Kích thước': '1.5m × 0.9m × 0.75m', 'Màu sắc': 'Trắng / Xám / Đen' }
  },

  /* ============ BAN CÔNG (4 sản phẩm) ============ */
  {
    id: 31,
    name: 'Bộ Bàn Ghế Ban Công Mây BBC-31',
    slug: 'bo-ban-ghe-ban-cong',
    room: 'ban-cong',    roomLabel: 'Ban Công',
    style: 'dong-duong', styleLabel: 'Đông Dương',
    materials: ['may-tre', 'kim-loai'],
    defaultMaterial: 'may-tre',
    sizes: [
      { label: 'Bộ 2 ghế + 1 bàn tròn', price: 3800000 },
      { label: 'Bộ 4 ghế + 1 bàn chữ nhật', price: 6500000 },
    ],
    materialPrices: { 'may-tre': 0, 'kim-loai': 800000 },
    basePrice: 3800000,
    image: 'images/balcony/31.png',
    thumb: 'ban-cong',
    badge: 'Bán Chạy', badgeType: 'hot',
    rating: 4.8, reviews: 92,
    featured: true, inStock: true,
    description: 'Bộ bàn ghế ban công chất liệu mây tổng hợp chống tia UV và thời tiết. Không gỉ, không phai màu, nhẹ và dễ di chuyển.',
    features: ['Mây tổng hợp chống UV', 'Không gỉ khi để ngoài trời', 'Đệm chống nước dày 8cm', 'Khung nhôm không gỉ'],
    specs: { 'Trọng lượng bộ': '22 kg', 'Bảo hành': '2 năm ngoài trời' }
  },

  {
    id: 32,
    name: 'Ghế Xích Đu Gỗ GXD-32',
    slug: 'ghe-xich-du-go',
    room: 'ban-cong',    roomLabel: 'Ban Công',
    style: 'dong-duong', styleLabel: 'Đông Dương',
    materials: ['go-thong', 'may-tre'],
    defaultMaterial: 'go-thong',
    sizes: [
      { label: '0.8m – 1 người', price: 2800000 },
      { label: '1.2m – 2 người', price: 4200000 },
    ],
    materialPrices: { 'go-thong': 0, 'may-tre': -200000 },
    basePrice: 2800000,
    image: 'images/balcony/32.png',
    thumb: 'ban-cong',
    badge: 'Mới', badgeType: 'new',
    rating: 4.7, reviews: 48,
    featured: false, inStock: true,
    description: 'Ghế xích đu gỗ thông tự nhiên xử lý chống thời tiết, có mái che vải canvas. Tải trọng 250 kg, dây treo inox chắc chắn.',
    features: ['Gỗ thông xử lý chống thời tiết', 'Mái che canvas chống mưa', 'Dây treo inox', 'Tải trọng 250 kg'],
    specs: { 'Kích thước': '0.8m × 1.2m × 1.8m (có mái)', 'Chiều cao treo': '2.2-2.5m' }
  },

  {
    id: 33,
    name: 'Kệ Cây Ban Công KCBC-33',
    slug: 'ke-cay-ban-cong',
    room: 'ban-cong',   roomLabel: 'Ban Công',
    style: 'hien-dai',  styleLabel: 'Hiện Đại',
    materials: ['kim-loai'],
    defaultMaterial: 'kim-loai',
    sizes: [
      { label: '0.5m × 3 tầng',  price: 680000 },
      { label: '0.5m × 5 tầng',  price: 980000 },
      { label: '1.0m × 3 tầng – Ngang', price: 1200000 },
    ],
    materialPrices: { 'kim-loai': 0 },
    basePrice: 980000,
    image: 'images/balcony/33.png',
    thumb: 'ban-cong',
    badge: null, badgeType: null,
    rating: 4.5, reviews: 65,
    featured: false, inStock: true,
    description: 'Kệ để cây ban công inox sơn tĩnh điện, chống tia UV và thời tiết. Nhẹ, có thể treo tường hoặc đứng độc lập.',
    features: ['Inox sơn tĩnh điện', 'Chống UV và thời tiết', 'Treo tường hoặc đứng', 'Lỗ thoát nước chậu cây'],
    specs: { 'Kích thước': '0.5m × 0.25m × 1.2m', 'Trọng tải': '10 kg/ngăn' }
  },

  {
    id: 34,
    name: 'Ghế Lười Ngoài Trời GLN-34',
    slug: 'ghe-luoi-ngoai-troi',
    room: 'ban-cong',   roomLabel: 'Ban Công',
    style: 'hien-dai',  styleLabel: 'Hiện Đại',
    materials: ['vai', 'may-tre'],
    defaultMaterial: 'vai',
    sizes: [
      { label: '0.9m × 1.4m – Nhỏ', price: 1900000 },
      { label: '1.0m × 1.6m – Lớn', price: 2600000 },
    ],
    materialPrices: { 'vai': 0, 'may-tre': 400000 },
    basePrice: 1900000,
    image: 'images/balcony/34.png',
    thumb: 'ban-cong',
    badge: null, badgeType: null,
    rating: 4.6, reviews: 73,
    featured: false, inStock: true,
    description: 'Ghế lười ngoài trời với khung thép chống gỉ, vải canvas chống nước chống UV. Gấp gọn dễ dàng, kèm túi đựng.',
    features: ['Khung thép chống gỉ', 'Vải canvas chống nước UV', 'Gấp gọn kèm túi đựng', 'Trọng lượng nhẹ 4 kg'],
    specs: { 'Kích thước': '0.9m × 1.4m × 0.28m (gấp)', 'Trọng tải': '100 kg' }
  },
];

/* ===== CẤU HÌNH GIÁ VẬN CHUYỂN ===== */
const SHIPPING = {
  freeThreshold: 5000000,   // Miễn phí vận chuyển từ 5 triệu
  standardFee: 150000,       // Phí vận chuyển tiêu chuẩn
  expressMultiplier: 2,      // Nhân 2x cho giao hàng nhanh
};

/* ===== CẤU HÌNH THUẾ ===== */
const TAX_RATE = 0.10; // 10% VAT

/* ===== VOUCHER MẪU ===== */
const VOUCHERS = [
  { code: 'NOITHAT10', type: 'percent', value: 10, minOrder: 5000000, desc: 'Giảm 10% đơn từ 5 triệu' },
  { code: 'NOITHAT200', type: 'fixed', value: 200000, minOrder: 2000000, desc: 'Giảm 200K đơn từ 2 triệu' },
  { code: 'SALE2024', type: 'percent', value: 15, minOrder: 10000000, desc: 'Giảm 15% đơn từ 10 triệu' },
  { code: 'FREESHIP', type: 'shipping', value: 150000, minOrder: 1000000, desc: 'Miễn phí vận chuyển' },
];

/* ===== HELPERS ===== */
// Format tiền VNĐ
function formatPrice(p) {
  return p.toLocaleString('vi-VN') + 'đ';
}

// Tìm sản phẩm theo ID
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

// Tìm sản phẩm theo phòng
function getProductsByRoom(room) {
  return room ? PRODUCTS.filter(p => p.room === room) : PRODUCTS;
}

// Tìm sản phẩm nổi bật
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

// Tính giá theo size + vật liệu đã chọn
function calcProductPrice(product, sizeIndex, material) {
  const sizePrice = product.sizes[sizeIndex]?.price ?? product.basePrice;
  const matAdd = product.materialPrices[material] ?? 0;
  return sizePrice + matAdd;
}

// Lấy vật liệu theo ID
function getMaterialById(id) {
  return MATERIALS.find(m => m.id === id);
}

// Kiểm tra voucher
function validateVoucher(code, subtotal) {
  const v = VOUCHERS.find(x => x.code === code.toUpperCase().trim());
  if (!v) return { valid: false, msg: 'Mã voucher không tồn tại' };
  if (subtotal < v.minOrder) return { valid: false, msg: `Đơn hàng tối thiểu ${formatPrice(v.minOrder)}` };
  return { valid: true, voucher: v };
}

// Export cho module nếu cần
if (typeof module !== 'undefined') module.exports = { PRODUCTS, ROOMS, STYLES, MATERIALS, VOUCHERS, formatPrice, getProductById };
