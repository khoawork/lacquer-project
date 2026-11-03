# HỒ SƠ NGỮ CẢNH DỰ ÁN (PROJECT CONTEXT & ARCHITECTURE)
## HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA VIỆT NAM (1930–2030)

> **DÀNH CHO AI AGENT & DEVELOPER:**
> File này là **Nguồn Chân Lý Duy Nhất (Single Source of Truth)** của dự án. Khi tiếp nhận bất kỳ yêu cầu nào (sửa lỗi, thêm tính năng, thiết kế giao diện mới, tạo API), bạn **CHỈ CẦN ĐỌC FILE NÀY** để nắm toàn bộ ngữ cảnh, hệ thống nhận diện thương hiệu, quy tắc hiệu ứng, kiến trúc thư mục và quy chuẩn lập trình mà **KHÔNG CẦN QUÉT LẠI TOÀN BỘ CODEBASE**.

---

## 1. THÔNG TIN THƯƠNG HIỆU & SỨ MỆNH DI SẢN

* **Tên chính thức:** HÀNH TRÌNH 100 NĂM SƠN MÀI HỘI HỌA & DI SẢN THẾ KỶ (1930–2030)
* **Slogan cốt lõi:** *"Đánh thức cội nguồn di sản — Khơi nguồn mạch ngầm sáng tạo."*
* **Mô tả dự án:** Dự án văn hóa - nghệ thuật - học thuật quốc gia kết nối mỹ thuật tạo hình, nghiên cứu khoa học vật liệu sơn ta tự nhiên và chấn hưng kinh tế di sản văn hóa Việt Nam hướng tới dấu mốc kỷ niệm 100 năm hội họa sơn mài (1930 - 2030).
* **Đơn vị bảo trợ & điều phối:**
  * **Điều phối nền tảng:** Viện Kỷ lục Việt Nam
  * **Chủ trì nội dung & khoa học:** Trung tâm Công nghiệp Sáng tạo
* **Thông tin liên hệ chính thức:**
  * **Email:** `info@sonmaihoihoavietnam.com`
  * **Hotline:** Ms. Khánh – `090 900 2207`
  * **Địa bàn điều phối:** Hà Nội • TP. Hồ Chí Minh • Phú Thọ

---

## 2. HỆ THỐNG NHẬN DIỆN THIẾT KẾ (DESIGN SYSTEM)

### A. Bảng Màu Chủ Đạo (Lacquer Color Palette)
* **Nền Then Sơn Mài Chính (Primary Background):** `#28090d` (Màu đỏ mận then chín sâu thẳm, quý phái, không dùng màu đen tuyền đơn điệu).
* **Nền Phối Lớp & Chiều Sâu (Layered Backgrounds):**
  * Radial gradient nền: `radial-gradient(ellipse at 50% 40%, #8c1e28 0%, #63141d 28%, #3e0c12 55%, #28090d 80%, #150305 100%)`
  * Vùng hào quang tỏa sáng (Center Glow): `radial-gradient(circle, rgba(255, 215, 110, 0.55) 0%, rgba(235, 75, 80, 0.45) 35%, rgba(160, 25, 40, 0.35) 60%, transparent 75%)`
  * Nền thẻ bento: `linear-gradient(180deg, rgba(46, 12, 17, 0.92) 0%, rgba(32, 7, 11, 0.96) 100%)`
* **Ánh Kim Vàng Hoàng Gia (Imperial Gold):**
  * Chữ vàng rực rỡ (`.text-gold-gradient`): `linear-gradient(135deg, #FFFFFF 0%, #FFF5CC 15%, #FFE07D 40%, #E5B834 75%, #B88916 100%)` kết hợp đổ bóng `drop-shadow(0 4px 20px rgba(255, 223, 115, 0.65))`.
  * Chữ vàng ánh kim nhẹ (`.text-gold-subtle`): `linear-gradient(135deg, #FFF9E5 0%, #FFE599 50%, #D4AF37 100%)`.
  * Viền vàng kim (`border-gold`): `rgba(212, 175, 55, 0.38)` đến `rgba(255, 223, 115, 0.85)` khi hover.
* **Nút bấm phong cách sơn mài (Buttons) — Đồng bộ chuẩn mực toàn dự án:**
  * `.btn-gold`: Nền gradient vàng kim hoàng gia `#FFF0B3` -> `#FFDF73` -> `#D4AF37` -> `#A67C14`, chữ đen nâu `#1a0303`, viền vàng nhạt bóng bẩy, padding chuẩn `px-8 py-3.5 rounded text-[15px] font-bold uppercase tracking-wider shadow-xl cursor-pointer`, kết hợp icon mũi tên `ArrowRight` bên phải.
  * `.btn-gold-outline`: Nền đỏ then trong suốt `rgba(40, 9, 13, 0.85)`, chữ vàng `#FFDF73`, viền `#D4AF37`, hiệu ứng kính mờ `backdrop-filter: blur(12px)`, padding chuẩn `px-7 py-3.5 rounded text-[15px] font-bold uppercase tracking-wider shadow-md cursor-pointer`, kết hợp icon `BookOpen` / `Handshake` / `Compass` bên trái.

### B. Nghệ Thuật Chữ (Typography)
* **Font Tiêu đề & Nhấn mạnh (Serif / Display):** `Cormorant Garamond` (Google Font).
  * Áp dụng tự động cho: `h1, h2, h3, h4, .font-serif, [class*="font-display"]`.
  * Thuộc tính đi kèm: `text-wrap: balance`, chữ in hoa `uppercase`, giãn chữ rộng `tracking-[0.14em]` đến `tracking-[0.25em]`.
* **Font Nội dung & Đoạn văn (Body):** `Lora` (Google Font).
  * Áp dụng tự động cho: `p, li, blockquote, .font-body`.
  * Thuộc tính đi kèm: `text-wrap: pretty`, line-height `1.8`, cỡ chữ `17px - 18px`.

### C. Quy Chuẩn Đốm Sáng Vàng Kim (FloatingSparkles) — TUYỆT ĐỐI TUÂN THỦ
* **Hình thức chuẩn mực lấy Trang Hành trình (Image 1) làm chuẩn:**
  * Kích thước hạt: Dạng hạt tròn đặc thuần túy, hỗ trợ tham số `size` (mặc định lấy chuẩn trang **Hành trình** `size={4.5}` (4.5px) rõ nét, tinh tế và sáng ấm theo yêu cầu người dùng).
  * Màu sắc & Hào quang: Nền vàng ngà `#FFF2B2`, hào quang tinh tế phủ tỷ lệ theo kích thước hạt, không gây chói lóa hay viền bóng quá khổ.
* **QUY TẮC CỐT LÕI (NGHIÊM CẤM SCALE):**
  * **TUYỆT ĐỐI KHÔNG dùng `scale(...)` hoặc thuộc tính `scale`** trong CSS `@keyframes` hoặc style của hạt.
  * Hạt bay lơ lửng hoàn toàn bằng phép chuyển vị thuần túy: `transform: translate3d(Xpx, Ypx, 0)`.
  * Không dùng `!important` bên trong `@keyframes` (vì trình duyệt web sẽ vô hiệu hóa và bỏ qua toàn bộ khối keyframe).
  * Độ mờ (opacity) và kích thước hạt giữ nguyên cố định 100%, không phóng to thu nhỏ nhấp nháy làm rối mắt người dùng.
* **Component dùng chung:** `client/src/components/common/FloatingSparkles.jsx`.
  * Đồng bộ 100% trên toàn bộ các trang: **Trang Chủ**, **Giới Thiệu**, **Hành Trình**, **Sự Kiện**, **Bộ Sưu Tập**, và **Kỷ Yếu** đều sử dụng chung `size={4.5}` chuẩn mực.
* **Đồng bộ Hero Section giữa Hành Trình và Giới Thiệu:**
  * Cả 2 trang đều giữ cấu trúc trang nghiêm, tinh tế: Con dấu bách niên -> Badge thời gian -> Tiêu đề chính -> Đoạn văn di sản -> Thanh trang trí hoàng kim (hairline divider) kết hợp biểu tượng trung tâm (La bàn / Ngôi sao flare). Loại bỏ các nút bấm thừa ở phần đầu trang để đồng nhất tuyệt đối về visual weight.

### D. Thanh Điều Hướng (Navbar Header)
* **Hiệu ứng Kính mờ (Glassmorphism):** `background: rgba(28, 6, 9, 0.94); backdrop-filter: blur(16px);`.
* **Hiệu ứng Active trang:** Link trang hiện tại tự động đổi sang màu vàng kim chói sáng (`#FFDF73`), `font-bold`, kèm thanh gạch chân ánh kim mở rộng 100% (`linear-gradient(90deg, #D4AF37, #FFDF73)`) và đổ bóng hào quang `box-shadow: 0 0 12px #FFDF73`.

---

## 3. BẢN ĐỒ CẤU TRÚC COMPONENT & TÍNH NĂNG (FRONTEND)

### Cây thư mục nguồn `client/src/`:
```text
client/src/
├── components/
│   ├── common/
│   │   └── FloatingSparkles.jsx         # Đốm vàng kim 2px-2.5px lơ lửng thuần translate3d (size=4.5 chuẩn Journey)
│   ├── home/                            # CÁC SECTION TÁCH RỜI TRANG CHỦ
│   │   ├── HeroSection.jsx              # Hero 100vh, đĩa sơn mài logo, hào quang & FloatingSparkles
│   │   ├── HeritageStorySection.jsx     # Giới thiệu 1 thế kỷ, kỹ thuật mài dưới nước & đại cảnh tuyên ngôn
│   │   ├── PillarsSection.jsx           # Bốn hướng mở của hành trình (4 thẻ Bento) & FloatingSparkles
│   │   ├── OperationalPipelineSection.jsx# Chuỗi vận hành (LAB, STUDIO, SHOWCASE, MARKET)
│   │   ├── FeaturedEventsSection.jsx    # Chuỗi sự kiện tiêu biểu (Tọa đàm, Triển lãm, Trình diễn)
│   │   ├── FeaturedArtworksSection.jsx  # Bộ sưu tập kiệt tác & FloatingSparkles
│   │   ├── MonographArchiveSection.jsx  # Kỷ yếu bách niên (Tập I - IV, Chương I - IV)
│   │   └── CoCreationCtaSection.jsx     # Kêu gọi đồng kiến tạo văn hóa & FloatingSparkles
│   ├── about/                           # CÁC SECTION TÁCH RỜI TRANG GIỚI THIỆU
│   │   ├── AboutHeroSection.jsx         # Hero "Từ di sản đến hạ tầng sáng tạo", con dấu bách niên & FloatingSparkles
│   │   ├── AboutStorySection.jsx        # Vì sao hành trình được hình thành & 3 tầng tích tụ di sản
│   │   ├── AboutMissionVisionSection.jsx# 5 Trụ cột sứ mệnh & Tầm nhìn 2030 (3 mốc lịch sử)
│   │   ├── AboutPrinciplesSection.jsx   # Ba nguyên tắc chỉ đạo cốt lõi (01, 02, 03)
│   │   ├── AboutArchitectureSection.jsx # Kiến trúc nền tảng (Lõi bất biến - Vòng mở - Lớp vận hành)
│   │   ├── AboutCommunitiesSection.jsx  # 5 nhóm đối tượng cộng đồng đồng hành
│   │   └── AboutCtaSection.jsx          # Kêu gọi đồng kiến tạo với con dấu & FloatingSparkles
│   ├── journey/                         # CÁC SECTION TÁCH RỜI TRANG HÀNH TRÌNH (JOURNEY)
│   │   ├── JourneyHeroSection.jsx       # Hero hành trình bách niên chuyển mình di sản & FloatingSparkles
│   │   ├── JourneyTimelineSection.jsx   # 5 Mốc son lịch sử xuyên thế kỷ (1925 - 2030)
│   │   ├── JourneyMastersSection.jsx    # Bậc thầy hội họa sơn mài tiên phong (Nguyễn Gia Trí, Phạm Hậu...)
│   │   ├── JourneyTerroirsSection.jsx   # Cội nguồn đất và nghề: Phú Thọ, Hạ Thái, Tương Bình Hiệp
│   │   ├── JourneyFutureSection.jsx     # Hạ tầng sáng tạo và tầm nhìn 2030
│   │   └── JourneyCtaSection.jsx        # Kêu gọi đồng hành và đóng góp tư liệu kỷ yếu & FloatingSparkles
│   ├── events/                          # CÁC SECTION TÁCH RỜI TRANG SỰ KIỆN (EVENTS)
│   │   ├── EventsHeroSection.jsx        # Hero "Nơi di sản được thực hành", 4 metrics & FloatingSparkles
│   │   ├── EventsFilterSection.jsx      # Bộ lọc chuyên đề (Tọa đàm, Triển lãm, Workshop, Kỷ lục...)
│   │   ├── EventsListSection.jsx        # Card Hành trình lần 7 & Hoạt động SIHUB
│   │   ├── EventsProgramSection.jsx     # Mô hình chuẩn hóa: Đại hội thảo, GPS, khung vận hành chi tiết
│   │   └── EventsCtaSection.jsx         # Kêu gọi đồng hành kiến tạo sự kiện tiếp theo & FloatingSparkles
│   ├── collection/                      # CÁC SECTION TÁCH RỜI TRANG BỘ SƯU TẬP (COLLECTION)
│   │   ├── CollectionHeroSection.jsx    # Hero "Mỗi tác phẩm là một lớp thời gian", 4 metrics & FloatingSparkles
│   │   ├── CuratedCollectionsSection.jsx# 3 Bộ sưu tập độc bản: Cửu Cửu, Bách Thụ Đồng Tâm Viên, Du Lãm
│   │   ├── CollectionCommunitySection.jsx# Dự án cộng đồng: Bách Họa Liên Hoa & Kỷ lục Thủ Chỉ Đầu
│   │   └── CollectionCtaSection.jsx     # Kêu gọi kết nối di sản đồng kiến tạo & FloatingSparkles
│   ├── archive/                         # CÁC SECTION TÁCH RỜI TRANG KỶ YẾU (ARCHIVE / MONOGRAPH)
│   │   ├── ArchiveHeroSection.jsx       # Hero "Kho tri thức của một di sản đang sống", 4 metrics & FloatingSparkles
│   │   ├── ArchiveCategoriesSection.jsx # 5 Phân hệ tri thức cốt lõi (Bento Grid)
│   │   ├── ArchiveVolumesSection.jsx    # Bốn tập chuyên khảo thế kỷ (Tập I - IV)
│   │   ├── ArchiveSchemaSection.jsx     # Khung chuẩn dữ liệu lưu trữ quốc gia (Museum Archival Data Table)
│   │   └── ArchiveCallSection.jsx       # Kêu gọi đóng góp tư liệu văn hóa & FloatingSparkles
│   ├── leadership/                      # CÁC SECTION TÁCH RỜI TRANG BAN ĐIỀU HÀNH (LEADERSHIP)
│   │   ├── LeadershipHeroSection.jsx    # Hero "Những người giữ nhịp cho hành trình" & FloatingSparkles
│   │   ├── LeadershipCoreUnitsSection.jsx# Cơ quan điều phối & chủ trì: VietKings & Trung Tâm Đổi Mới Sáng Tạo
│   │   ├── LeadershipAdvisorySection.jsx# Hội đồng chuyên môn (4 lĩnh vực: Mỹ thuật, Làng nghề, Thiết kế, Công nghệ số)
│   │   ├── LeadershipProjectTeamsSection.jsx# Ban Dự Án (6 ban chức năng từ nội dung đến tài chính)
│   │   └── LeadershipNetworkSection.jsx # Mạng lưới phối hợp & Nút kêu gọi "Trở thành đối tác"
│   ├── news/                            # CÁC SECTION TÁCH RỜI TRANG TIN TỨC (NEWS / JOURNAL)
│   │   ├── NewsHeroSection.jsx          # Hero "Nhật Ký & Nghiên Cứu Di Sản" & FloatingSparkles
│   │   ├── NewsFilterSection.jsx        # 7 Phân loại chuyên đề (Dòng chảy, Người giữ lửa, Sơn mài 2.0...)
│   │   ├── NewsGridSection.jsx          # Lưới bài viết với 6 chuyên khảo thực tế & hình ảnh chất lượng cao
│   │   ├── NewsTemplateMockupSection.jsx# Khung bố cục bài viết mẫu chuẩn bảo tàng (Article Detail Mockup)
│   │   └── NewsNewsletterSection.jsx    # Form đăng ký nhận bản tin định kỳ VietKings
│   ├── contact/                         # CÁC SECTION TÁCH RỜI TRANG LIÊN HỆ (CONTACT)
│   │   ├── ContactHeroSection.jsx       # Hero "Mọi hành trình đều bắt đầu từ một cuộc gặp" & FloatingSparkles
│   │   ├── ContactRoutesSection.jsx     # 5 Tuyến tham gia đồng hành (Sáng tác, Học thuật, Doanh nghiệp, Giáo dục, Truyền thông)
│   │   └── ContactFormSection.jsx       # Biểu mẫu đề xuất kết nối, thông tin trực tiếp & Modal xác nhận tham chiếu
│   └── admin/                           # Giao diện trang quản trị
├── layouts/
│   ├── header.jsx                       # Header chính, nhận diện trang active vàng kim, hỗ trợ điều hướng
│   ├── footer.jsx                       # Chân trang 3 cột (thương hiệu, bảo trợ, liên hệ, bản quyền)
│   ├── base.jsx                         # Shell bọc: Header + <Outlet /> + Footer
│   └── admin.jsx                        # Shell trang quản trị Admin
├── pages/
│   ├── Home.jsx                         # Trang chủ (Lắp ghép từ components/home/)
│   ├── About.jsx                        # Trang giới thiệu (Lắp ghép từ components/about/)
│   ├── Journey.jsx                      # Trang hành trình di sản (Lắp ghép từ components/journey/)
│   ├── Events.jsx                       # Trang sự kiện & hoạt động di sản (Lắp ghép từ components/events/)
│   ├── Collection.jsx                   # Trang bộ sưu tập di sản bách niên (Lắp ghép từ components/collection/)
│   ├── Archive.jsx                      # Trang kỷ yếu & kho lưu trữ di sản (Lắp ghép từ components/archive/)
│   ├── Leadership.jsx                   # Trang ban điều hành & hội đồng chuyên môn (Lắp ghép từ components/leadership/)
│   ├── News.jsx                         # Trang tin tức, nghiên cứu & tạp chí di sản (Lắp ghép từ components/news/)
│   ├── Contact.jsx                      # Trang liên hệ, kết nối đề xuất & đồng hành di sản (Lắp ghép từ components/contact/)
│   ├── Products.jsx                     # Danh mục tác phẩm tranh và cổ vật sơn mài
│   ├── Login.jsx                        # Đăng nhập
│   └── admin/                           # Dashboard, Products, Orders
└── router/
    └── index.jsx                        # React Router DOM với createBrowserRouter
```

---

## 4. HỆ THỐNG ĐƯỜNG DẪN ĐỊNH TUYẾN (ROUTING MAP — TIẾNG ANH CHUẨN HÓA)

| Đường dẫn URL Chính (English) | Alias Hỗ Trợ | Component Trang | Mục đích & Chức năng | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| `/` | | `pages/Home.jsx` | Trang chủ kỷ niệm bách niên sơn mài, 8 sections toàn diện | Hoàn thiện 100% |
| `/about` | `/gioi-thieu` | `pages/About.jsx` | Trang giới thiệu tổng quan, sứ mệnh, kiến trúc và cộng đồng | Hoàn thiện 100% |
| `/journey` | `/hanh-trinh` | `pages/Journey.jsx` | Trang Hành trình 100 năm sơn mài: 5 mốc son, danh họa, làng nghề, tầm nhìn 2030 | Hoàn thiện 100% |
| `/events` | `/su-kien` | `pages/Events.jsx` | Trang Sự kiện & Hoạt động di sản: bộ lọc đề mục, Hành trình lần 7, SIHUB, hội thảo | Hoàn thiện 100% |
| `/collection` | `/bo-suu-tap`, `/products` | `pages/Collection.jsx` | Trang Bộ Sưu Tập bách niên: Cửu Cửu, Bách Thụ, Du Lãm, Kỷ lục | Hoàn thiện 100% |
| `/archive` | `/ky-yeu`, `/monograph` | `pages/Archive.jsx` | Trang Kỷ Yếu bách niên: 5 phân hệ tri thức, 4 tập chuyên khảo, bảng chuẩn hóa dữ liệu | Hoàn thiện 100% |
| `/leadership` | `/ban-dieu-hanh` | `pages/Leadership.jsx` | Trang Ban Điều Hành & Hội Đồng Chuyên Môn: cơ quan điều phối, cố vấn, ban dự án | Hoàn thiện 100% |
| `/news` | `/tin-tuc` | `pages/News.jsx` | Trang Tin Tức & Nghiên Cứu Di Sản: bộ lọc 7 chủ đề, lưới bài viết, bố cục chuyên khảo mẫu, đăng ký bản tin | Hoàn thiện 100% |
| `/contact` | `/lien-he` | `pages/Contact.jsx` | Trang Liên Hệ & Kết Nối Đồng Hành: 5 tuyến tham gia, biểu mẫu đề xuất có mã tham chiếu, thông tin điều phối | Hoàn thiện 100% |
| `/login` | | `pages/Login.jsx` | Trang đăng nhập người dùng và quản trị viên | Hoàn thiện cơ bản |
| `/admin` | | `pages/admin/Dashboard.jsx` | Tổng quan số liệu doanh thu, hiện vật, đơn đăng ký | Hoàn thiện |
| `/admin/products`| | `pages/admin/Products.jsx` | CRUD quản lý danh mục tác phẩm sơn mài | Hoàn thiện |
| `/admin/orders` | | `pages/admin/Orders.jsx` | Quản lý danh sách đặt tác phẩm / người tham gia | Hoàn thiện |

---

## 5. KIẾN TRÚC BACKEND PHÂN TẦNG (SERVER ARCHITECTURE)

* **Công nghệ:** Node.js (ExpressJS), MySQL (`mysql2/promise`), JWT, bcryptjs.
* **Cơ sở dữ liệu:** Database `lacquer_db` (Cổng mặc định 3306).
* **Kiến trúc phân tầng nghiêm ngặt (Strict Layered Flow):**
  ```text
  Client Request ➔ routes/ ➔ middlewares/ ➔ controllers/ ➔ services/ ➔ models/ ➔ MySQL
  ```
  1. `models/`: Chỉ chứa các câu lệnh SQL thuần (`SELECT`, `INSERT`, `UPDATE`, `DELETE`). Tuyệt đối không chứa logic nghiệp vụ.
  2. `services/`: Xử lý toàn bộ logic nghiệp vụ (tính toán, đối chiếu mật khẩu, mã hóa token, kiểm tra điều kiện).
  3. `controllers/`: Tiếp nhận tham số từ `req.body`, `req.query`, gọi service tương ứng và trả về `res.json()`.
  4. `routes/`: Định nghĩa URL endpoint HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
  5. `middlewares/`: Kiểm tra JWT token (`authMiddleware`), phân quyền quản trị (`adminMiddleware`).

---

## 6. HƯỚNG DẪN BUILD & VẬN HÀNH (OPERATIONAL GUIDELINES)

* **Hệ điều hành môi trường:** Windows (PowerShell).
* **Lưu ý thực thi lệnh Node/NPM:**
  * Node.js và NPM được quản lý qua NVM Windows. Khi chạy các lệnh kiểm tra build hoặc cài gói (ví dụ `npm run build`), cần thực hiện với quyền phù hợp (`BypassSandbox: true` nếu công cụ yêu cầu truy cập đường dẫn NVM).
* **Quy tắc khi tạo / sửa code giao diện:**
  * Luôn sử dụng Tailwind CSS v4 kết hợp biến màu và class tiện ích có sẵn trong `index.css`.
  * Các file giao diện có chứa JSX phải luôn đặt đuôi `.jsx`.
  * Khi người dùng yêu cầu chỉnh sửa hiệu ứng hạt bụi sáng, chỉ sửa tại `FloatingSparkles.jsx` hoặc class `.gold-stardust`, **tuyệt đối không đưa `scale(...)` vào animation bay**.
