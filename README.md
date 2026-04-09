# 🎤 Voice-Based AI Inventory & Stock Management System

## 🚀 Live Application

🌐 Frontend: https://voice-inventory-pro.vercel.app  
⚙ Backend API: https://voice-inventory-pro.onrender.com  
🗄 Database: MongoDB Atlas (Cloud)

---

## 📌 Project Overview

Voice-Based Inventory & Stock Management System is a full-stack web application that allows retailers to manage stock using voice commands.

The system captures speech using the Web Speech API, converts it into text, processes intent using rule-based NLP parsing, and updates inventory in real time through REST APIs connected to MongoDB Atlas.

This project demonstrates:

- Full-stack development
- RESTful API design
- Cloud database integration
- Production deployment
- Clean backend architecture
- Voice-driven interaction

---

## 🏗 Architecture

Frontend (React - Vercel)
        ↓
Backend (Node.js + Express - Render)
        ↓
MongoDB Atlas (Cloud Database)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- Web Speech API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

### Cloud & Deployment
- MongoDB Atlas
- Render (Backend Deployment)
- Vercel (Frontend Deployment)

---

## 🎯 Features

- 🎤 Voice-based stock management
- ➕ Add inventory items
- ➖ Reduce stock quantity
- 🔄 Update stock
- 🔍 View stock
- ⚠ Low stock alert (below threshold)
- 🧾 Command logging
- 🔄 Admin reset inventory
- 🌐 Fully deployed production system

---

## 🎙 Supported Voice Commands

Examples:

Add 50 rice  
Reduce 10 rice  
Update 5 rice  
Show rice  

---

## 📡 API Endpoints

### POST /api/command
Processes voice commands and updates inventory.

### GET /api/inventory
Returns all inventory items.

### DELETE /api/reset
Resets inventory and command logs.

---

## ⚙ Local Setup Instructions

### 1️⃣ Clone Repository

git clone https://github.com/rajthakur26/voice-inventory-pro.git  
cd voice-inventory-pro  

---

### 2️⃣ Backend Setup

cd backend  
npm install  

Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_atlas_connection_string  
PORT=5000  

Start backend:

npm start  

---

### 3️⃣ Frontend Setup

Open a new terminal:

cd frontend  
npm install  
npm run dev  

Visit:

http://localhost:5173  

---

## 🌍 Deployment Details

- Backend deployed using Render
- Frontend deployed using Vercel
- Database hosted on MongoDB Atlas
- Environment variables secured using .env
- .env excluded using .gitignore

---

## 🧠 Design Decisions

- Used rule-based NLP parsing instead of paid AI APIs for cost efficiency.
- MongoDB chosen for flexible schema and fast development.
- Separate frontend and backend deployment for scalability.
- REST architecture for maintainability and clarity.

---

## 🔐 Security Considerations

- Environment variables stored securely
- No sensitive credentials committed to repository
- MongoDB Atlas network access configured
- Reset endpoint intended for admin/demo use

---

## 📈 Future Improvements

- Authentication (JWT-based login)
- Multi-user support
- Role-based access control
- Dashboard analytics & charts
- Enhanced NLP parsing  

---

## 👨‍💻 Author

Aayush Arunam  
Software Developer | Full Stack Enthusiast  

GitHub: https://github.com/aayush031  
LinkedIn: https://www.linkedin.com/in/aayush-arunam/

---

## 📜 License

This project is built for educational and demonstration purposes.
