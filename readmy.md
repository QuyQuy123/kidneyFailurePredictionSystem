# Kidney Failure Prediction System

## 1. Tổng quan

Đây là hệ thống dự đoán nguy cơ suy thận được tổ chức theo mô hình tách biệt **backend** và **frontend**:

- **Backend:** xây dựng bằng Java 21, Spring Boot và Maven; chịu trách nhiệm xử lý nghiệp vụ, bảo mật, truy cập cơ sở dữ liệu và cung cấp REST API.
- **Frontend:** xây dựng bằng React và Vite; chịu trách nhiệm hiển thị giao diện, tiếp nhận dữ liệu người dùng và gọi API từ backend.
- **Cơ sở dữ liệu:** MySQL, được backend truy cập thông qua Spring Data JPA.

```text
kidneyFailurePredictionSystem/
├── kidneyFailurePredictionSystem/      # Backend Spring Boot
├── feKidneyFailurePredictionSystem/    # Frontend React + Vite
├── DESIGN.md                            # Tài liệu thiết kế của dự án
└── readmy.md                            # Tài liệu mô tả cấu trúc dự án
```

## 2. Cấu trúc backend

Thư mục backend là `kidneyFailurePredictionSystem/`.

```text
kidneyFailurePredictionSystem/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/kidneyFailurePredictionSystem/kidneyFailurePredictionSystem/
│   │   │       ├── KidneyFailurePredictionSystemApplication.java # Điểm khởi động ứng dụng
│   │   │       ├── config/          # Cấu hình CORS, Security, bean và các thành phần hệ thống
│   │   │       ├── controller/      # Tiếp nhận HTTP request và trả về HTTP response
│   │   │       ├── dto/             # Dữ liệu request/response trao đổi qua API
│   │   │       ├── entity/          # Các thực thể ánh xạ với bảng trong MySQL
│   │   │       ├── exception/       # Ngoại lệ và xử lý lỗi dùng chung
│   │   │       ├── mapper/          # Chuyển đổi giữa Entity và DTO
│   │   │       ├── repository/      # Truy vấn dữ liệu bằng Spring Data JPA
│   │   │       ├── security/        # Xác thực, phân quyền và xử lý token
│   │   │       ├── service/         # Interface định nghĩa nghiệp vụ
│   │   │       │   └── impl/        # Các lớp triển khai nghiệp vụ
│   │   │       └── util/            # Hàm và hằng số tiện ích dùng chung
│   │   └── resources/
│   │       ├── application.properties # Cấu hình ứng dụng, cổng chạy và kết nối database
│   │       ├── static/               # Tài nguyên tĩnh do Spring Boot phục vụ nếu cần
│   │       └── templates/            # Template phía server nếu được sử dụng
│   └── test/
│       └── java/                      # Unit test và integration test
├── .mvn/                              # Cấu hình Maven Wrapper
├── mvnw                               # Maven Wrapper cho Linux/macOS
├── mvnw.cmd                           # Maven Wrapper cho Windows
└── pom.xml                            # Khai báo dependency và cấu hình build Maven
```

Các package như `controller`, `service`, `repository`, `entity` và `dto` là cấu trúc định hướng để bổ sung khi phát triển tính năng. Hiện tại backend mới có lớp khởi động và cấu hình tên ứng dụng.

### Vai trò các tầng backend

1. `controller` nhận request từ frontend và kiểm tra định dạng dữ liệu đầu vào.
2. `service` xử lý nghiệp vụ như quản lý tài khoản, hồ sơ bệnh nhân và dự đoán nguy cơ suy thận.
3. `repository` đọc/ghi dữ liệu trong MySQL.
4. `entity` biểu diễn dữ liệu lưu trong cơ sở dữ liệu.
5. `dto` giới hạn dữ liệu được nhận hoặc trả về qua API, tránh đưa trực tiếp Entity ra ngoài.
6. `security` bảo vệ API và thực hiện xác thực, phân quyền người dùng.

### Công nghệ backend hiện có

- Java 21
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA
- Spring Security
- MySQL Connector/J
- Lombok
- Maven

## 3. Cấu trúc frontend

Thư mục frontend là `feKidneyFailurePredictionSystem/`.

```text
feKidneyFailurePredictionSystem/
├── public/                 # Tài nguyên tĩnh không bị Vite biên dịch: ảnh, favicon, robots.txt
├── src/                    # Chứa toàn bộ source code frontend
│   ├── assets/             # Ảnh, font và tài nguyên cần được Vite đóng gói
│   ├── components/         # UI component dùng chung: Button, Modal, Input
│   ├── features/           # Mã nguồn được chia theo từng tính năng nghiệp vụ
│   │   ├── auth/
│   │   │   ├── components/# Component riêng của tính năng xác thực
│   │   │   ├── services/  # Hàm gọi API đăng nhập, đăng ký, đăng xuất
│   │   │   └── pages/     # Các trang đăng nhập và đăng ký
│   │   └── dashboard/     # Trang tổng quan và các thành phần liên quan
│   ├── hooks/              # Custom React Hook dùng lại ở nhiều nơi
│   ├── layouts/            # Khung giao diện: Sidebar, Header, Footer
│   ├── pages/              # Các trang chính: Home, Profile, NotFound
│   ├── routes/             # Cấu hình định tuyến của ứng dụng
│   ├── services/           # Cấu hình Axios/Fetch và xử lý API dùng chung
│   ├── stores/             # Quản lý state toàn cục
│   ├── styles/             # CSS, SCSS hoặc theme dùng chung
│   ├── types/              # Định nghĩa kiểu dữ liệu TypeScript nếu chuyển sang TS
│   ├── utils/              # Hàm tiện ích: định dạng ngày tháng, validate dữ liệu
│   ├── App.jsx             # Component gốc của ứng dụng
│   ├── App.css             # Style dành cho component App
│   ├── index.css           # Style toàn cục
│   └── main.jsx            # Entry point, render ứng dụng React vào DOM
├── .env                    # Biến môi trường, ví dụ địa chỉ API backend
├── .gitignore              # Khai báo file/thư mục không đưa lên Git
├── index.html              # File HTML gốc được Vite dùng để khởi tạo ứng dụng
├── package.json            # Dependency và các script npm
├── package-lock.json       # Khóa phiên bản dependency
└── vite.config.js          # Cấu hình Vite
```

Các thư mục `components`, `features`, `hooks`, `layouts`, `pages`, `routes`, `services`, `stores`, `styles`, `types` và `utils` là cấu trúc đề xuất cho giai đoạn phát triển tiếp theo. Frontend hiện tại mới là ứng dụng React/Vite khởi tạo ban đầu.

### Công nghệ frontend hiện có

- React 19
- React DOM
- Vite 8
- Oxlint
- JavaScript JSX

## 4. Luồng hoạt động tổng quát

```text
Người dùng
    │
    ▼
Frontend React/Vite
    │  HTTP/JSON
    ▼
REST API Spring Boot
    │
    ├── Security: xác thực và phân quyền
    ├── Service: xử lý nghiệp vụ và dự đoán
    └── Repository/JPA
              │
              ▼
         Cơ sở dữ liệu MySQL
```

Frontend không truy cập trực tiếp MySQL. Mọi thao tác dữ liệu đều phải đi qua API của backend.

## 5. Chạy dự án ở môi trường phát triển

### Chạy backend

Yêu cầu: JDK 21 và MySQL.

Trên Windows:

```powershell
cd kidneyFailurePredictionSystem
.\mvnw.cmd spring-boot:run
```

Trước khi chạy với MySQL, cần bổ sung thông tin kết nối cơ sở dữ liệu trong `src/main/resources/application.properties` hoặc truyền bằng biến môi trường.

### Chạy frontend

Yêu cầu: Node.js và npm.

```powershell
cd feKidneyFailurePredictionSystem
npm install
npm run dev
```

Các script frontend:

- `npm run dev`: chạy máy chủ phát triển Vite.
- `npm run build`: tạo bản build production.
- `npm run lint`: kiểm tra chất lượng mã nguồn bằng Oxlint.
- `npm run preview`: xem thử bản production đã build.

## 6. Quy ước cấu hình môi trường

Không đưa mật khẩu, khóa bí mật hoặc thông tin kết nối thật lên Git. Frontend có thể sử dụng biến môi trường như sau:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Backend nên lấy cấu hình nhạy cảm từ biến môi trường, ví dụ:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```
