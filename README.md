# 📦 QR-Driven Smart Inventory System

A smart inventory management system that uses **QR code scanning** to track, update, and manage stock in real time. Built with a PHP/Laravel backend and a React Native (Expo) mobile frontend.

---

## 🚀 Features

- 📷 **QR Code Scanning** — Scan product QR codes directly from a mobile device using the camera
- 📦 **Inventory Tracking** — Add, update, and delete inventory items with ease
- 🔍 **Instant Product Lookup** — Scan a QR code to instantly fetch product details and stock levels
- 📊 **Stock Management** — Monitor quantity, update stock on scan, and manage product records
- 🌐 **Web Dashboard** — View and manage inventory through a browser-based interface (Laravel Blade)
- 📱 **Mobile App** — React Native (Expo) app for on-the-go QR scanning
- 🔗 **REST API** — Laravel backend exposes API endpoints consumed by the mobile app

---

## 🛠️ Tech Stack

**Frontend (Mobile)**
- React Native (Expo ~55.0.0)
- expo-barcode-scanner
- Axios (API calls)
- Instascan (web-based QR scanning)

**Backend**
- PHP
- Laravel (MVC framework)
- Blade Templates (web dashboard)
- MySQL (database)

---

## 📁 Project Structure

```
QR-Driven-Smart-Inventory-System/
├── frontend/                  # React Native (Expo) mobile app
│   └── ...                    # Screens, components, navigation
├── backend/                   # Laravel PHP backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/   # Inventory & API controllers
│   │   │   └── Middleware/
│   │   └── Models/            # Eloquent models (Product, Stock, etc.)
│   ├── routes/
│   │   ├── web.php            # Web dashboard routes
│   │   └── api.php            # REST API routes for mobile app
│   ├── resources/views/       # Blade templates (web UI)
│   ├── database/migrations/   # DB schema
│   └── .env.example
├── app.json                   # Expo plugin config
├── package.json               # Frontend dependencies
└── .gitignore
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

**For the Backend:**
- PHP `>= 8.0`
- Composer
- MySQL
- Laravel CLI (`composer global require laravel/installer`)

**For the Frontend (Mobile App):**
- Node.js `>= 16`
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

---

## 🏃 Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/subhashini46/QR-Driven-Smart-Inventory-System.git
cd QR-Driven-Smart-Inventory-System
```

---

### 2. Set Up the Backend (Laravel)

```bash
cd backend
composer install
```

Copy the environment file and configure it:

```bash
cp .env.example .env
```

Open `backend/.env` and update the database settings:

```env
APP_NAME=QR-Inventory
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=qr_inventory
DB_USERNAME=root
DB_PASSWORD=your_password
```

Then run:

```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

The backend will run at `http://localhost:8000`.

---

### 3. Set Up the Frontend (Expo Mobile App)

Open a new terminal:

```bash
cd frontend
npm install
```

Update the API base URL in the frontend to point to your backend:

```js
// e.g., in your api.js or config file
const BASE_URL = "http://your-local-ip:8000/api";
```

> Use your machine's **local IP address** (e.g., `192.168.x.x`), not `localhost`, so your phone can reach the backend over the same Wi-Fi network.

Start the Expo app:

```bash
npx expo start
```

Scan the QR code shown in the terminal using the **Expo Go** app on your phone.

---

## 📱 How QR Scanning Works

1. Open the mobile app and navigate to the scan screen
2. Point your phone camera at any product QR code
3. The app sends the scanned code to the Laravel API
4. The API returns product details and current stock level
5. You can then update the quantity, mark as restocked, or view full details

---

## 🌐 Web Dashboard

The Laravel Blade web interface lets you:
- View all inventory items in a table
- Add new products and generate QR codes
- Edit or delete products
- Monitor stock levels at a glance

Access it at `http://localhost:8000` after starting the backend.

---

## 🔮 Future Plans

- [ ] QR code generation for new products directly from the dashboard
- [ ] Low stock alerts and email notifications
- [ ] Role-based access (Admin / Staff)
- [ ] Export inventory report as CSV or PDF
- [ ] Deploy backend on a cloud server
- [ ] Publish mobile app on Play Store / App Store

---

## 🙋‍♀️ Author

**Subhashini**  
GitHub: [@subhashini46](https://github.com/subhashini46)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
