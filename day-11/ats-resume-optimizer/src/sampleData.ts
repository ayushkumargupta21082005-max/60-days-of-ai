export interface SampleSet {
  name: string;
  role: string;
  resume: string;
  jd: string;
}

export const SAMPLES: SampleSet[] = [
  {
    name: "AI/ML Software Engineer Role",
    role: "AI & ML Engineer @ Top Tech",
    resume: `Ayush Kumar Gupta
Email: ayush.gupta@example.com | Phone: +1-234-567-8900 | LinkedIn: linkedin.com/in/ayush
GitHub: github.com/ayush

Objective:
Software Engineer looking for a job in AI and ML.

Education:
- B.Tech in Computer Science, 2022-2026. GPA: 8.9/10

Technical Skills:
- Python, JavaScript, C++
- React, Node.js, Express, HTML/CSS
- TensorFlow, PyTorch
- SQL, MongoDB

Experience:
Web Developer Intern at Alpha Startup (June 2024 - Dec 2024)
- Worked on their main website.
- Added some features using React.
- Fixed some bugs in the code.
- Made the pages load a bit faster.

Project Intern at Tech Labs (Jan 2025 - Present)
- Built a machine learning model to classify images.
- Used PyTorch and trained it on a dataset.
- Connected the ML model to a web backend.
- Wrote API endpoints to receive images.

Projects:
Smart Chatbot
- Made a chatbot using Gemini API and React.
- Users can type questions and get answers.
- Saved user conversation history in localStorage.

Portfolio Website
- Developed a static portfolio page using HTML, Tailwind CSS.
- Hosted it on GitHub Pages.
`,
    jd: `Role: Software Engineer - AI/ML Systems
Company: Leading AI Labs
Location: Remote / Hybrid

About the Role:
We are looking for a high-impact Software Engineer specializing in AI/ML systems. You will design, develop, and scale our core machine learning pipelines and build clean, responsive client-facing web applications integrated with large language models.

Requirements:
- Strong proficiency in modern Python and TypeScript/JavaScript.
- Experience with deep learning frameworks (PyTorch or TensorFlow).
- Experience building full-stack web applications with React, Node.js/Express.
- Experience optimizing database queries (SQL, PostgreSQL) and designing RESTful APIs.
- Familiarity with Cloud deployment platforms (Google Cloud Run, AWS, Docker) and vector databases.
- Strong focus on performance optimization, sub-second latency, and clean code principles.
- Exceptional communication and system-design collaboration skills.

Preferred Qualifications:
- Experience integrating and fine-tuning GenAI APIs (Google Gemini, OpenAI).
- Strong tracking of performance metrics (e.g., reduced latency by X%, improved accuracy by Y%).
- Degree in Computer Science or related fields.`
  },
  {
    name: "Full-Stack Web Developer",
    role: "Full-Stack Engineer @ FinTech",
    resume: `Amit Sharma
Email: amit.sharma@example.com | LinkedIn: linkedin.com/in/amit

Summary:
I do web development. I know frontend and backend. Seeking an engineer role.

Skills:
React, Vue, Node.js, Express, JavaScript, CSS, PostgreSQL, Git

Work History:
Software Developer at Vertex Solutions (2023 - 2025)
- Maintained legacy React web application.
- Wrote backend APIs.
- Talked with clients to resolve bugs.
- Deployed code to AWS using Docker.

Junior Developer at WebCreations (2021 - 2023)
- Helped design HTML pages.
- Handled simple backend tasks in Node.
- Wrote database migrations for SQL tables.

Key Projects:
- E-Commerce App: Built shopping cart frontend.
- Task Tracker: Simple personal dashboard with node backend.
`,
    jd: `Role: Senior Full-Stack Engineer (React & Node.js)
Company: Global FinTech Co.

We are seeking a Senior Full-Stack Engineer to lead development on our transaction dashboard.
Key Responsibilities:
- Design and execute scalable architecture using React, TypeScript, and Node.js.
- Optimize database performance in PostgreSQL, improving query response times.
- Lead code reviews and mentor junior developers.
- Drive CI/CD pipelines and orchestrate containers with Docker on AWS.
- Implement robust security standards (OAuth2, JWT) and real-time features using WebSockets.

Qualifications:
- 3+ years experience with React and Node.js.
- Strong understanding of state management (Redux, Context API).
- Experience leading and mentoring developers.`
  }
];
