# E-Commerce Catalog Management System

## Overview
This is a full-stack **E-Commerce Catalog Management System** that allows **admins** to create, update, delete, and manage product listings, while **users** can browse and review products. The system is built using:

- **Frontend:** React.js (with React Router & Axios)
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)
- **File Uploads:** Multer (for product images)

## Features
### User Features:
- Browse products and categories
- View product details and reviews
- Register and log in

### Admin Features:
- Create, update, and delete products
- Manage product inventory
- Secure access control (only admins can modify products)

## Tech Stack
| Component | Technology |
|-----------|------------|
| Frontend  | React.js, Axios, React Router |
| Backend   | Node.js, Express.js, Multer |
| Database  | MySQL with Sequelize ORM |
| Authentication | JWT (JSON Web Token) |
| Styling   | CSS |

## Setup Instructions
### 1. Clone the Repository
```sh
git clone https://https://github.com/nipunidev/E-commerce-Product-Catalog.git
cd your-project-folder
```

### 2. Install Dependencies
#### Backend (Express.js)
```sh
cd backend
npm install
```
#### Frontend (React.js)
```sh
cd frontend
npm install
```

### 3. Set Up Environment Variables
Create a **.env** file in the **backend** directory:
```sh
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_catalog
JWT_SECRET=your_jwt_secret
```

### 4. Set Up MySQL Database
Run the following SQL commands to create the database and tables:
```sql
CREATE DATABASE ecommerce_catalog;
USE ecommerce_catalog;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image_url VARCHAR(255),
  stock_quantity INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE product_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 5. Start the Backend Server
```sh
cd backend
npm start
```

### 6. Start the Frontend React App
```sh
cd frontend
npm start
```

## API Endpoints
### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create a new product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

## Troubleshooting
1. **Ensure MySQL is running**: If you get a connection error, check your MySQL server status.
2. **Check `.env` configuration**: Ensure database credentials and JWT secret are correct.
3. **Check API Logs**: Run `console.log()` in the backend to debug API responses.

## Future Improvements
- Implement a shopping cart system
- Add payment integration (Stripe, PayPal)
- Improve UI design

## License
This project is licensed under the MIT License.

