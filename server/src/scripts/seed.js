const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function seed() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'lacquer_db';
  const port = Number(process.env.DB_PORT) || 3306;

  console.log(`⏳ Connecting to MySQL server at ${host}:${port}...`);

  // Connect without DB first to ensure DB exists
  let connection;
  try {
    connection = await mysql.createConnection({ host, user, password, port });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.changeUser({ database });
    console.log(`✅ Database "${database}" is ready.`);

    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'customer') DEFAULT 'customer',
        avatar VARCHAR(255) NULL,
        phone VARCHAR(20) NULL,
        address VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(120) NOT NULL UNIQUE,
        description TEXT NULL,
        image VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NULL,
        name VARCHAR(200) NOT NULL,
        slug VARCHAR(220) NOT NULL UNIQUE,
        description TEXT NULL,
        price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
        stock INT NOT NULL DEFAULT 0,
        image_url VARCHAR(500) NULL,
        is_featured BOOLEAN DEFAULT FALSE,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
      ) ENGINE=InnoDB;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        order_code VARCHAR(50) NOT NULL UNIQUE,
        customer_name VARCHAR(100) NOT NULL,
        customer_email VARCHAR(150) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        shipping_address VARCHAR(255) NOT NULL,
        total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
        payment_method ENUM('cod', 'banking') DEFAULT 'cod',
        status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
      ) ENGINE=InnoDB;
    `);

    console.log('✅ Tables checked/created successfully.');

    // Seed default admin and user
    const [existingUsers] = await connection.query('SELECT id FROM users LIMIT 1');
    if (existingUsers.length === 0) {
      console.log('🌱 Seeding initial accounts...');
      const adminPass = await bcrypt.hash('admin123', 10);
      const userPass = await bcrypt.hash('123456', 10);

      await connection.query(
        `INSERT INTO users (name, email, password, role, phone, address) VALUES
         ('Quản Trị Viên', 'admin@lacquer.com', ?, 'admin', '0901234567', 'Hà Nội, Việt Nam'),
         ('Nguyễn Văn An', 'customer@gmail.com', ?, 'customer', '0987654321', 'TP. Hồ Chí Minh, Việt Nam')`,
        [adminPass, userPass]
      );
      console.log('✅ Created admin (admin@lacquer.com / admin123) and customer (customer@gmail.com / 123456)');
    }

    // Seed categories
    const [existingCats] = await connection.query('SELECT id FROM categories LIMIT 1');
    if (existingCats.length === 0) {
      await connection.query(`
        INSERT INTO categories (name, slug, description, image) VALUES
        ('Tranh Sơn Mài', 'tranh-son-mai', 'Các tác phẩm tranh sơn mài thủ công truyền thống tinh xảo', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80'),
        ('Bình Hoa & Lọ Gốm', 'binh-hoa-lo-gom', 'Bình hoa tráng men sơn mài mạ vàng độc đáo', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'),
        ('Hộp Trang Sức', 'hop-trang-suc', 'Hộp đựng trang sức sơn mài cẩn xà cừ cao cấp', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'),
        ('Khay Trà & Đồ Gia Dụng', 'khay-tra-do-gia-dung', 'Khay trà, đĩa sơn mài phong cách mỹ thuật Á Đông', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80')
      `);
      console.log('✅ Seeded categories.');
    }

    // Seed products
    const [existingProducts] = await connection.query('SELECT id FROM products LIMIT 1');
    if (existingProducts.length === 0) {
      await connection.query(`
        INSERT INTO products (category_id, name, slug, description, price, stock, image_url, is_featured, status) VALUES
        (1, 'Tranh Sơn Mài Sen Vàng Hoàng Cung', 'tranh-son-mai-sen-vang-hoang-cung', 'Bức họa hoa sen vàng dát bạc và vàng lá 24k, nét vẽ tinh xảo mang lại vượng khí tài lộc.', 3500000.00, 15, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80', TRUE, 'active'),
        (1, 'Tranh Phố Cổ Hà Nội Mùa Thu', 'tranh-pho-co-ha-noi-mua-thu', 'Tác phẩm sơn mài khắc họa nét hoài niệm phố cổ qua từng lớp sơn truyền thống.', 4200000.00, 8, 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80', TRUE, 'active'),
        (2, 'Bình Gốm Sơn Mài Họa Tiết Cá Chép', 'binh-gom-son-mai-hoa-tiet-ca-chep', 'Bình phong thủy vẽ cá chép vượt vũ môn kết hợp men ngọc và vỏ trứng cẩn thủ công.', 1850000.00, 20, 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80', FALSE, 'active'),
        (3, 'Hộp Trang Sức Cẩn Ốc Ngũ Sắc', 'hop-trang-suc-can-oc-ngu-sac', 'Hộp bảo quản trang sức lót nhung đỏ, nắp cẩn xà cừ hoa cúc đại đóa sang trọng.', 1250000.00, 35, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', TRUE, 'active'),
        (4, 'Khay Trà Sơn Mài Vân Mây Cổ Điển', 'khay-tra-son-mai-van-may-co-dien', 'Khay trà gỗ tự nhiên phủ 12 lớp sơn then, chịu nhiệt tốt, bền đẹp theo năm tháng.', 890000.00, 42, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', FALSE, 'active'),
        (1, 'Tranh Tùng Hạc Diên Niên Sơn Mài', 'tranh-tung-hac-dien-nien-son-mai', 'Biểu tượng trường thọ và thanh cao, chế tác kỳ công bởi nghệ nhân làng nghề.', 5600000.00, 5, 'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80', TRUE, 'active')
      `);
      console.log('✅ Seeded sample products.');
    }

    // Seed orders
    const [existingOrders] = await connection.query('SELECT id FROM orders LIMIT 1');
    if (existingOrders.length === 0) {
      await connection.query(`
        INSERT INTO orders (user_id, order_code, customer_name, customer_email, customer_phone, shipping_address, total_amount, payment_method, status) VALUES
        (2, 'ORD-2026-001', 'Nguyễn Văn An', 'customer@gmail.com', '0987654321', 'Số 123 Đường Nguyễn Huệ, Quận 1, TP. HCM', 4750000.00, 'banking', 'completed'),
        (NULL, 'ORD-2026-002', 'Trần Thị Mai', 'maitran@gmail.com', '0912345678', '45 Hàng Bài, Hoàn Kiếm, Hà Nội', 1250000.00, 'cod', 'processing'),
        (NULL, 'ORD-2026-003', 'Lê Hoàng Nam', 'namle@yahoo.com', '0933221144', '88 Lê Lợi, TP. Đà Nẵng', 3500000.00, 'cod', 'pending')
      `);
      console.log('✅ Seeded sample orders.');
    }

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

seed();

