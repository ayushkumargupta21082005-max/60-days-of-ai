# 🧩 Face Puzzle Game

> A modern AI-powered Face Puzzle Game built using pure HTML, CSS, and JavaScript. Capture your face using your device's camera, transform it into a customizable puzzle, and challenge yourself to solve it as quickly as possible.

---

## 📌 Overview

Face Puzzle Game is an interactive browser-based puzzle game that uses your webcam to capture a selfie and instantly converts it into a sliding-style puzzle. Players can choose different difficulty levels, drag and swap puzzle pieces, track their performance, and compete against their best times.

The entire project is built as a **single self-contained HTML file** with no frameworks, making it lightweight and easy to run in any modern browser.

---

## ✨ Features

### 📷 Camera Integration

- Live webcam preview
- Front camera support (where available)
- One-click photo capture
- Retake photo anytime
- Graceful handling of camera permission denial

---

### 🧩 Puzzle Generation

- Capture your own face
- Difficulty Levels:
  - 3 × 3
  - 4 × 4
  - 5 × 5
- Automatic image slicing
- Random yet solvable puzzle generation
- High-quality image rendering

---

### 🎮 Gameplay

- Drag & Drop support
- Mobile touch controls
- Piece swapping
- Snap-to-grid movement
- Highlight selected tiles
- Green indicators for correctly placed pieces

---

### ⏱ Game Statistics

- Live Timer
- Move Counter
- Correct Pieces Counter
- Selected Difficulty Display
- Real-time Progress Tracking

---

### 🏆 Win Detection

- Automatic puzzle completion detection
- Timer stops instantly
- Victory popup
- Final statistics
- Difficulty display

---

### 📊 Leaderboard

Stores Top 5 Records using Local Storage.

Each record contains:

- Date
- Completion Time
- Total Moves
- Difficulty Level

---

### 🎨 User Interface

- Modern Design
- Responsive Layout
- Mobile Friendly
- Dark Theme
- Smooth Animations
- Glassmorphism Inspired UI
- Interactive Buttons

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- HTML5 Canvas API
- MediaDevices getUserMedia API
- Local Storage API

---

## 🚀 How to Run

### Option 1 — Localhost (Recommended)

```bash
# Python

python -m http.server
```

Open:

```
http://localhost:8000
```

---

### Option 2 — VS Code

Install:

- Live Server Extension

Right-click:

```
index.html
```

Select

```
Open with Live Server
```

---

### Option 3 — HTTPS Hosting

Deploy on:

- GitHub Pages
- Netlify
- Vercel

Camera access requires:

- HTTPS
- or localhost

---

## 🎯 Gameplay Flow

```
Open Game
      │
      ▼
Allow Camera Access
      │
      ▼
Capture Face
      │
      ▼
Choose Difficulty
      │
      ▼
Generate Puzzle
      │
      ▼
Drag & Swap Pieces
      │
      ▼
Complete Puzzle
      │
      ▼
View Results
      │
      ▼
Save Best Score
```

---

## 📱 Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |

---

## 📂 Project Structure

```
Face-Puzzle-Game/
│
├── index.html
├── README.md
└── assets/
    ├── preview.png
    └── gameplay.png
```

---

## 📸 Screenshots

### Camera Preview

Capture your face directly from the webcam before starting the game.

---

### Puzzle Gameplay

Solve the scrambled puzzle using drag-and-drop or touch gestures.

---

### Results Screen

View completion time, move count, difficulty, and leaderboard.

---

## 🌟 Future Improvements

- 🎵 Sound Effects
- 🎉 Confetti Animation
- 🌍 Multiplayer Mode
- 🧠 AI Difficulty Suggestions
- 📤 Share Score Feature
- 🎨 Custom Themes
- 🖼 Gallery Upload Support
- 📈 Statistics Dashboard

---

## 🔒 Permissions

The application requests access only to your device camera.

Captured images:

- Stay inside the browser
- Are never uploaded
- Are never stored online
- Remain completely private

---

## 💡 Learning Outcomes

This project demonstrates:

- Camera API Integration
- Canvas Image Processing
- Puzzle Generation Algorithms
- Drag & Drop Mechanics
- Touch Gesture Handling
- Local Storage Management
- Responsive UI Design
- Browser-Based Game Development

---

## 👨‍💻 Author

**Ayush Kumar Gupta**

- 💼 LinkedIn: https://www.linkedin.com/in/ayush-kumar-gupta-a9b5a8344/
- 💻 GitHub: https://github.com/ayushkumargupta21082005-max

---

## ⭐ If you like this project

Give this repository a ⭐ and share your feedback!

---

**Built with ❤️ using HTML, CSS, JavaScript, and modern Web APIs.**