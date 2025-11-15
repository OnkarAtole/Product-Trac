

##  ProductTrac – Inventory & Product Management Application

A simple and efficient **Product Management Web Application** built using **React.js**, **Tailwind CSS**, **FastAPI**, and **PostgreSQL**.

Visit:   https://producttrac.vercel.app/

This project helps you:

* ➕ Add products
* ✏️ Edit products
* ❌ Delete products
* 🔍 Search products by ID, Name, or Description
* 🔄 Refresh product list
* 📊 View products in a responsive table
* 📥 Store data securely in PostgreSQL

---

## 🚀 Features

### 🛠️ Frontend (React + Tailwind CSS)

* Clean UI with modern Tailwind components
* Product form with validation
* Search filter (ID, name, description)
* Auto-updating table
* Popup messages for success/error
* Responsive layout
* Refresh button to reload data

### ⚡ Backend (FastAPI)

* REST API for CRUD operations
* PostgreSQL database integration
* SQLAlchemy ORM models
* Pydantic schemas for validation
* CORS enabled for frontend communication

---

## 🗄️ Tech Stack

| Layer       | Technology             |
| ----------- | ---------------------- |
| Frontend    | React.js, Tailwind CSS |
| Backend     | FastAPI, SQLAlchemy    |
| Database    | PostgreSQL             |
| HTTP Client | Axios                  |
| Dev Tools   | Vite                   |

---

## 📂 Folder Structure

```
/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── database_models.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/components/
│   │   ├── Header.jsx
│   │   ├── Container.jsx
│   ├── App.jsx
│   ├── index.css
│   └── ...
└── README.md
```

---

## ▶️ How to Run Locally

### **Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 🖼 Screenshots (Optional)

Add screenshots of UI here after uploading the project.

---

## 💡 Future Enhancements

* User login & authentication
* Pagination
* Sorting by price & quantity
* Reports & analytics
* Category support

---

