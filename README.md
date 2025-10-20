# 🎯 Quiz Master - MERN Stack Quiz Application

A modern, full-stack quiz application with timer, score tracking, and leaderboard functionality built using MongoDB, Express.js, React.js, and Node.js.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)

---

## ✨ Features

- 🎮 Interactive quiz interface with 10 questions
- ⏱️ 5-minute countdown timer with auto-submit
- 📊 Real-time score tracking and percentage calculation
- 🏆 Leaderboard displaying top 10 scores
- 📝 Detailed answer review after completion
- 🎨 Fully responsive design
- 🔀 Random question selection from database
- 📚 Multiple categories (Geography, Science, History, etc.)

---

## 🛠️ Tech Stack

**Frontend:** React.js, Axios, CSS3  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Dev Tools:** Nodemon, dotenv, CORS

---

## 📦 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v7 or higher)
- npm or yarn

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/quiz-master.git
cd quiz-master
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/quizapp
```

Seed database:
```bash
npm run seed
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Open browser to `http://localhost:3000`

---

## 📁 Project Structure

```
quiz-master/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── seed/             # Database seeding
│   ├── .env              # Environment variables
│   └── server.js         # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── services/     # API calls
    │   ├── styles/       # CSS files
    │   └── App.js        # Main component
    └── .env              # Environment variables
```

---

## 🔌 API Endpoints

### Questions
- `GET /api/questions?limit=10` - Get random questions
- `GET /api/questions/all` - Get all questions
- `POST /api/questions/verify` - Verify answers

### Scores
- `POST /api/scores` - Submit score
- `GET /api/scores/leaderboard?limit=10` - Get top scores
- `GET /api/scores/user/:playerName` - Get user's best score

---

## 📖 Usage

1. **Start Quiz** - Enter your name and click "Start Quiz"
2. **Answer Questions** - Select answers and navigate using buttons
3. **Submit** - Click submit or wait for auto-submit
4. **Review** - View your score and correct answers
5. **Leaderboard** - Check your ranking

---

## 🎨 Customization

### Change Quiz Duration

**File:** `frontend/src/components/Quiz.jsx`
```javascript
const QUIZ_DURATION = 300; // 300 seconds = 5 minutes
```

### Change Number of Questions

**File:** `frontend/src/components/Quiz.jsx`
```javascript
const response = await getQuestions(10); // Change 10 to desired number
```

### Add Custom Questions

Edit `backend/seed/seedQuestions.js` and add to `sampleQuestions` array:
```javascript
{
  question: "Your question?",
  options: ["A", "B", "C", "D"],
  correctAnswer: 0, // Index (0-3)
  difficulty: "easy",
  category: "General"
}
```

Then run: `npm run seed`

---

## 🐛 Troubleshooting

**MongoDB Connection Error:**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**Module Not Found:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Deployment

### Backend (Heroku)

```bash
cd backend
heroku create quiz-master-backend
heroku config:set MONGO_URI=your_mongodb_atlas_uri
git push heroku main
```

### Frontend (Netlify)

```bash
cd frontend
npm run build
# Drag 'build' folder to netlify.com
```

**Set environment variable in Netlify:**
```
REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Your Name**
- GitHub: [@siddbhatt18](https://github.com/siddbhatt18/)
- LinkedIn: [Siddharth Bhattacharya](https://www.linkedin.com/in/siddharth-bhattacharya-8b9710247/)

---

## 🙏 Acknowledgments

- Questions sourced from general knowledge databases
- Built with MERN stack
- Inspired by quiz platforms like Kahoot and Quizizz

---

**⭐ Star this repo if you find it helpful!**
