# 🏥 Prior Authorization Story Simulator

> **An interactive, story-driven healthcare education simulator that explains the Prior Authorization (PA) process through a beginner-friendly conversation.**

![HTML](https://img.shields.io/badge/HTML-5-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-CDN-38BDF8)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

The **Prior Authorization Story Simulator** is a single-file web application designed to educate patients, students, and healthcare professionals about the **Prior Authorization (PA)** workflow.

Instead of reading long documents, users experience the process as an interactive story between:

- 👦 **Rahul** – Patient
- 👧 **Priya** – Healthcare Operations Specialist
- 👨‍⚕️ **Dr. Patel** – Physician (Narrator)

The simulator explains how a Prior Authorization request moves from a healthcare provider to an insurance payer, why requests may be denied, and how appeals lead to approval.

> **Note:** StarCare Health is used throughout as an **illustrative example** for educational purposes.

---

# ✨ Features

- 📚 Interactive story-based learning
- 💬 Chat-style conversation interface
- 📈 Progress tracker across 8 scenes
- 🎯 Decision-based dialogue choices
- 🏥 Beginner-friendly healthcare explanations
- 📋 Prior Authorization workflow simulation
- 📄 Insurance review explanation
- ❌ PA denial scenario
- 📝 Appeal workflow
- ✅ Final approval process
- 📊 Healthcare operations insights
- 📱 Responsive UI
- 🎨 Tailwind CSS design
- ⚡ Pure Vanilla JavaScript
- 📦 Single HTML file
- 🔒 Safe DOM manipulation using `createElement()` and `appendChild()` (no `innerHTML` for chat rendering)

---

# 🗂 Story Flow

## Scene 1 — Doctor Visit

- Rahul visits City Medical Center
- Diagnosed with Rheumatoid Arthritis
- Dr. Patel prescribes Humira

---

## Scene 2 — Insurance Roadblock

Provider submits:

```
Provider
      │
      ▼
Prior Authorization Request
      │
      ▼
StarCare Health (Illustrative Payer)
```

Approved PA is stored on file.

---

## Scene 3 — What is Prior Authorization?

Explains:

- What PA is
- Why insurance reviews treatments
- Step Therapy
- Treatment delays
- Educational reference to the **AMA 2023 PA Survey**

---

## Scene 4 — Insurance Review

Illustrates how an insurance payer evaluates:

- Eligibility
- Clinical documentation
- ICD-10 diagnosis
- Step therapy history

---

## Scene 5 — Denial

Example denial due to:

- Missing step therapy documentation

Explains:

- Denial is **not permanent**
- Administrative burden on provider offices

---

## Scene 6 — Appeal

Shows:

- Gathering clinical documentation
- Letter of Medical Necessity
- Formal appeal submission

---

## Scene 7 — Approval

PA Approved

Includes:

- Approval notification
- Reference number
- Authorization saved on file

---

## Scene 8 — Key Takeaways

### Patient Perspective

- Understands Prior Authorization
- Importance of documentation
- Appeals can change outcomes

### Healthcare System Perspective

Health systems monitor:

- Denial Rate
- Appeal Rate
- Resolution Time

---

# 🛠 Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- DOM API

---

# 🏗 Project Structure

```
Prior-Authorization-Story-Simulator/
│
├── index.html
└── README.md
```

---

# 🎮 User Experience

The simulator presents the workflow as a conversation.

Each scene includes:

- Story narration
- Interactive chat
- Two user choices
- Progress indicator
- Automatic progression

---

# 📊 Workflow Diagram

```
Patient
   │
   ▼
Doctor Visit
   │
   ▼
Provider
   │
   ▼
Prior Authorization Request
   │
   ▼
Insurance Review
   │
   ├─────────────┐
   │             │
Approved      Denied
   │             │
   │         Appeal
   │             │
   └──────► Approved
                 │
                 ▼
Treatment Begins
```

---

# 🎨 UI Highlights

- Modern healthcare-inspired design
- Chat application interface
- Left/right messaging layout
- Centered narrator messages
- Animated conversations
- Interactive buttons
- Progress bar
- Mobile-friendly responsive layout

---

# 🎯 Learning Objectives

After completing the simulator, users will understand:

- What Prior Authorization is
- Why insurers require PA
- How providers submit requests
- What insurance companies review
- Why denials occur
- How appeals work
- How approvals are recorded
- Operational metrics used by healthcare organizations

---

# ⚙️ How to Run

1. Download the repository.

2. Open:

```
index.html
```

in any modern web browser.

No installation required.

No dependencies required.

No build process required.

---

# 📚 Educational Disclaimer

This simulator is designed **for educational purposes only**.

- StarCare Health is an illustrative example.
- The workflow is simplified for learning.
- Real Prior Authorization processes vary by payer, provider, treatment, and jurisdiction.
- This application should not be used as medical or insurance advice.

---

# 🚀 Future Improvements

- Voice narration
- Multiple payer simulations
- Different medical conditions
- Branching storylines
- Analytics dashboard
- Physician workflow view
- Interactive PA forms
- Appeal success statistics
- Accessibility enhancements
- Multi-language support

---

# 🤝 Contributing

Contributions are welcome!

You can improve:

- UI/UX
- Educational content
- Accessibility
- Additional healthcare scenarios
- Code quality
- Animations
- Documentation

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Ayush Kumar Gupta**

- GitHub: https://github.com/ayushkumargupta21082005-max
- LinkedIn: https://www.linkedin.com/in/ayush-kumar-gupta-a9b5a8344/

---

⭐ If you found this project helpful, consider giving it a **Star** on GitHub!