# 💰 Expense Tracker

A full-stack Expense Tracker application built with the **MERN Stack** that helps users manage their personal finances. Users can securely register, log in, track income and expenses, search, filter, sort, paginate transactions, and view their financial summary on a dashboard.

---

## ✨ Features

### 🔐 Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Logout
- Authentication Context

### 📊 Dashboard
- Total Balance
- Total Income
- Total Expense
- Recent Transactions

### 💵 Transaction Management
- Add Transaction
- Edit Transaction
- Delete Transaction
- Search Transactions
- Filter by Category
- Filter by Type
- Sort Transactions
  - Newest
  - Oldest
  - Highest Amount
  - Lowest Amount
- Pagination

### 🎨 User Experience
- Responsive UI
- Loading States
- Toast Notifications
- Modal for Add/Edit Transaction
- Confirmation Before Delete

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify
- React Icons
- Context API

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Zod

---

# 📂 Folder Structure

```text
Expense-Tracker
│
├── backend
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── index.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/expense-tracker.git
```

```bash
cd expense-tracker
```

---

## Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

PORT=3000
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

Run frontend

```bash
npm run dev
```

---

# 📸 Screenshots

### Dashboard

<img width="1440" height="784" alt="Screenshot 2026-07-18 at 20 01 45" src="https://github.com/user-attachments/assets/742abbfc-8801-49b1-a39a-6cf6518328e8" />


- Total Balance
- Total Income
- Total Expense
- Recent Transactions

---

### Transactions

<img width="1440" height="784" alt="Screenshot 2026-07-18 at 20 02 03" src="https://github.com/user-attachments/assets/1cedce13-79ba-4a29-9831-55f5f20a43e7" />


- Search
- Filter
- Sort
- Pagination
- Add Transaction
- Edit Transaction
- Delete Transaction

---

# 🔐 Authentication Flow

```text
Signup
   │
   ▼
Login
   │
   ▼
JWT Token
   │
   ▼
Auth Context
   │
   ▼
Protected Routes
   │
   ▼
Dashboard
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/user/signup` | Register User |
| POST | `/api/v1/user/signin` | Login User |
| GET | `/api/v1/user/me` | Get Logged-in User |

---

## Dashboard

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/dashboard` | Dashboard Summary |

---

## Transactions

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/transactions` | Get Transactions |
| POST | `/api/v1/transactions` | Add Transaction |
| PUT | `/api/v1/transactions/:id` | Update Transaction |
| DELETE | `/api/v1/transactions/:id` | Delete Transaction |

---

# 📖 Query Parameters

| Parameter | Description |
|-----------|-------------|
| search | Search by title |
| category | Filter by category |
| type | income / expense |
| sort | newest, oldest, highest, lowest |
| page | Current page |
| limit | Transactions per page |

Example

```http
GET /transactions?search=food&category=Food&type=expense&sort=newest&page=2&limit=5
```

---

# 🎯 Future Improvements

- Reports & Analytics
- Pie Charts
- Monthly Expense Graph
- Budget Planning
- CSV Export
- PDF Export
- User Profile
- Change Password
- Dark Mode
- Recurring Transactions
- Mobile App

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Javed**

X: [javedakhtar_dev](https://x.com/javedakhtar_dev)

GitHub: [javedakhtar-dev](https://github.com/javedakhtar-dev)

LinkedIn: [javedakhtar-dev](https://linkedin.com/in/javedakhtar-dev)

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
