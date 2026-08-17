# ✨ Personal AI Playbook

> **A local-first AI debugging workflow builder for JavaScript/TypeScript and Python.**

Personal AI Playbook helps developers create, customize, save, and reuse **AI-powered debugging prompts and autonomous debugging loops**.

Instead of writing the same debugging prompt repeatedly, you can build structured prompts using predefined components such as **Role, Objective, Context, Reasoning Strategy, Output Format, and Tone**.

---

## 🚀 Features

### 📊 Dashboard

* View the number of workflows created
* Track prompts built
* Quick access to debugging workflows
* Simple and interactive dashboard

### 🧰 Prompt Builder

Build custom AI debugging prompts using:

* **Role / Expertise**

  * Expert Debugger
  * Python Expert
  * JavaScript/TypeScript Expert
  * Systems Thinker
  * Teacher

* **Objective**

  * Find root cause
  * Explain errors
  * Suggest fixes
  * Prevent recurrence
  * Compare debugging approaches

* **Context**

  * React + Node.js
  * Express.js REST API
  * Python data processing
  * Async/await
  * Database/ORM
  * No specific framework

* **Reasoning Strategy**

  * Step-by-step analysis
  * Execution tracing
  * Hypothesis testing
  * Excluding possibilities
  * Most-likely-first analysis

* **Output Format**

  * One-liner
  * Brief explanation + fix
  * Detailed breakdown
  * Structured response
  * Code-only

* **Tone**

  * Casual & encouraging
  * Direct & factual
  * Educational

The prompt is generated automatically with a **live preview**.

---

## ♻️ Loop Builder

Turn a debugging prompt into an **iterative autonomous debugging workflow**.

Configure:

1. Starting Prompt
2. Goal / Success Criteria
3. Evaluation Method
4. Improvement Strategy
5. Stop Conditions
6. Safety Rules

The generated loop follows a process similar to:

```text
Initial Prompt
      ↓
Run Prompt
      ↓
Evaluate Result
      ↓
Goal Met?
  ↙       ↘
 Yes       No
 ↓         ↓
Stop    Improve
           ↓
       Run Again
           ↓
        Evaluate
```

This makes debugging more systematic and repeatable.

---

## 🛠️ Pre-built Debugging Workflows

The project includes ready-to-use workflows for common development problems:

| Workflow                          | Purpose                                        |
| --------------------------------- | ---------------------------------------------- |
| ⚠️ JavaScript TypeError Debugger  | Diagnose TypeErrors and property-access issues |
| ⏱️ Async/Await Issue Resolver     | Debug promises and async execution             |
| 🐍 Python Traceback Decoder       | Understand and fix Python tracebacks           |
| ❌ Null/Undefined Reference Solver | Debug null and undefined errors                |
| 🌐 API Response Error Debugger    | Debug API requests, responses and parsing      |
| 🐌 Performance Issue Debugger     | Identify bottlenecks and performance problems  |

---

## 💾 Local Workflow Library

Create and save your own workflows.

Saved workflows can contain:

* Custom debugging prompts
* Autonomous debugging loops
* Workflow names
* Descriptions
* Tags
* Creation timestamps

All workflow data is stored locally using **browser LocalStorage**.

---

## 🔐 Privacy First

Personal AI Playbook is designed as a **local-first application**.

Your workflow data is stored on your device using:

```text
Browser LocalStorage
```

The application does not include a backend database or API for storing your workflow data.

You can also:

* Export your data as JSON
* Import previously exported workflows
* Clear all locally stored data

---

## 📦 Data Export & Import

### Export

Export your workflows as a JSON backup file:

```text
ai-playbook-backup-<timestamp>.json
```

### Import

Import previously exported JSON data and restore your workflows.

This makes it easy to back up or move your personal debugging workflows.

---

## ⌨️ Keyboard Shortcuts

| Shortcut   | Action                |
| ---------- | --------------------- |
| `Ctrl + B` | Open Prompt Builder   |
| `Ctrl + L` | Open Loop Builder     |
| `Ctrl + S` | Save current workflow |
| `Ctrl + ?` | Open Help             |

---

## 💻 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Font Awesome

### Browser APIs

* LocalStorage
* Clipboard API
* FileReader API
* Blob API

### Architecture

```text
HTML
 │
 ├── CSS
 │
 └── JavaScript
       │
       ├── Dashboard
       ├── Workflow Engine
       ├── Prompt Builder
       ├── Loop Builder
       ├── LocalStorage
       ├── Import / Export
       └── Help System
```

---

## 📁 Project Structure

```text
personal-ai-playbook/
│
├── index.html
├── README.md
└── assets/
    └── screenshots/
```

> The current implementation is contained in a single HTML file with embedded CSS and JavaScript.

---

## ▶️ How to Run

No backend or installation is required.

### Option 1 — Open Directly

Clone the repository:

```bash
git clone https://github.com/your-username/personal-ai-playbook.git
```

Navigate into the project:

```bash
cd personal-ai-playbook
```

Open:

```text
index.html
```

in your browser.

### Option 2 — VS Code Live Server

1. Open the project in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

---

## 🧪 Example Workflow

Suppose you have this JavaScript error:

```text
TypeError: Cannot read properties of undefined
```

You can select:

```text
Role:
JavaScript/TypeScript Expert

Objective:
Find Root Cause

Context:
Async/Await

Strategy:
Trace Execution

Format:
Structured

Tone:
Educational
```

The Playbook automatically generates a structured debugging prompt.

You can then:

```text
Copy Prompt
     ↓
Use with your preferred AI assistant
     ↓
Evaluate the solution
     ↓
Create an iterative debugging loop
     ↓
Save the workflow
```

---

## 🎯 Why This Project?

Developers frequently spend time:

* Rewriting debugging prompts
* Explaining the same problem repeatedly
* Trying random fixes
* Losing useful debugging approaches
* Repeating similar debugging workflows

Personal AI Playbook turns these repetitive tasks into **reusable AI workflows**.

### Core Idea

> **Don't just use AI for debugging. Build a repeatable system for debugging with AI.**

---

## 🔮 Future Improvements

Potential future features include:

* [ ] AI API integration
* [ ] Gemini / OpenAI / Claude integration
* [ ] Real autonomous debugging execution
* [ ] Workflow categories
* [ ] Search and filtering
* [ ] Workflow editing
* [ ] Functional favorites
* [ ] Workflow sharing
* [ ] Cloud synchronization
* [ ] Dark/light theme customization
* [ ] More programming languages
* [ ] GitHub integration
* [ ] Automated test execution
* [ ] Debugging history and analytics

---

## 🤝 Contributing

Contributions are welcome!

### Steps

```bash
# Fork the repository

# Clone your fork
git clone https://github.com/your-username/personal-ai-playbook.git

# Create a feature branch
git checkout -b feature/new-feature

# Make your changes

# Commit
git add .
git commit -m "Add new debugging workflow"

# Push
git push origin feature/new-feature
```

Then open a Pull Request.

---

## 📜 License

This project is open source.

You can modify, improve, and extend it for learning and development purposes.

---

## 👨‍💻 Author

**Ayush Kumar Gupta**

Aspiring AI Engineer & Software Developer

### Connect

* GitHub: `ayushkumargupta21082005-max`
* LinkedIn: `Ayush Kumar Gupta`

---

## ⭐ Support

If you find this project useful:

⭐ **Star the repository**

🍴 **Fork it**

💡 **Suggest improvements**

🐛 **Report issues**

---

## 💡 Final Thought

**Personal AI Playbook is more than a prompt generator — it's a framework for turning debugging knowledge into reusable AI workflows.**

> Build once. Debug smarter. Reuse forever. 🚀
