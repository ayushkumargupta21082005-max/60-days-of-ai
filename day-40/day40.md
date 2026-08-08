# 📊 Smart Project Prioritizer

A production-grade AI assistant that analyzes competing projects and ranks them by strategic impact, urgency, feasibility, and effort. Built with Claude AI and a premium, responsive UI.

**Open `project_prioritizer.html` in any modern browser to start immediately.** No setup, no API keys, no installation required.

---

## ✨ Features

- **Real-time prioritization** — Paste projects, get ranked results in seconds
- **Executive-level scoring** — 0-100 scores with data-driven reasoning
- **Smart analysis** — Weighs impact (40%), urgency (30%), feasibility (20%), effort (10%)
- **Transparent reasoning** — Understand *why* each project got its rank
- **Edge-case handling** — Works with incomplete data, flags contradictions, handles ambiguity
- **Professional UI** — Animated result cards, color-coded rankings, responsive design
- **Built-in documentation** — Collapsible guide explaining system design and extension paths
- **Live Claude API** — Real-time analysis with error handling and loading states
- **Zero dependencies** — Self-contained HTML file, pure JavaScript, no external libraries

---

## 🚀 Quick Start

### 1. **Open the Assistant**
   Download or open `project_prioritizer.html` in any modern browser (Chrome, Firefox, Safari, Edge).

### 2. **Paste Your Projects**
   In the left panel, paste project descriptions. Include:
   - Project name/goal
   - Deadline (if any)
   - Team size / resources
   - Business impact (revenue, blocks other work, strategic alignment)
   - Dependencies or blockers

   **Example input:**
   ```
   Project A: Launch new customer dashboard. Deadline: 6 weeks. 3 engineers assigned. 
   Unblocks Q3 product roadmap. High customer demand (sales team reports 50+ requests).

   Project B: Fix critical API performance issue. Deadline: 2 weeks. 2 engineers. 
   Currently blocks new integrations from shipping. Urgency: High (customer complaints incoming).

   Project C: Internal refactoring of auth service. Deadline: Open. 4 weeks. 2 engineers. 
   Reduces technical debt but not blocking anything currently.
   ```

### 3. **Click "Prioritize Now"**
   The assistant analyzes your projects and returns:
   - **Rank** (1, 2, 3, etc.) — visual badge
   - **Score** (0-100) — normalized priority score
   - **Reasoning** — one-line executive summary explaining the rank

### 4. **Review & Act**
   - Use the ranked list to inform sprint planning or roadmap decisions
   - Re-run with updated info as situations change
   - See "How this was built" for extension ideas (drill-down, export, what-if scenarios)

---

## 🧠 How It Works

### The System Prompt (Claude's Brain)

The assistant uses a specialized system prompt that positions Claude as an expert project prioritization consultant. It analyzes projects using this framework:

| Dimension | Weight | Criteria |
|-----------|--------|----------|
| **Impact** | 40% | Strategic alignment, revenue, unblocks other work, risk reduction |
| **Urgency** | 30% | Deadline proximity, external dependencies, compliance/regulatory risk |
| **Feasibility** | 20% | Resource availability, technical dependencies, skill gaps |
| **Effort** | 10% | Time/resource cost relative to benefits, hidden complexity |

**Scoring Process:**
1. Claude scores each project independently on each dimension (0-100)
2. Weighted sum produces final score (0-100)
3. Projects ranked highest-to-lowest
4. Reasoning generated (max 15 words) explaining the rank to executives

**Output Format:**
```json
{
  "projects": [
    {
      "name": "Project A",
      "score": 92,
      "rank": 1,
      "reasoning": "Unblocks Q3 roadmap, high customer demand, 3-week buffer."
    },
    {
      "name": "Project B",
      "score": 85,
      "rank": 2,
      "reasoning": "Critical blocker, tight deadline, straightforward fix."
    }
  ],
  "warnings": [
    "Project C has conflicting signals: low urgency but tech debt."
  ]
}
```

### API Integration

The app calls Claude's API in real-time:

```javascript
fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: 'Prioritize these projects: ...' }]
  })
})
```

**No API key needed** — the backend handles authentication. This is designed for Anthropic's claude.ai environment.

---

## 📐 UI/UX Design Rationale

Every design choice serves the goal of **fast, clear executive communication**:

| Component | Design | Why |
|-----------|--------|-----|
| **Two-column layout** | Input left, results right | Immediate cause-effect visibility |
| **Rank badges (1🟢 2🔵 3🟠)** | Large, color-coded, top-left of each card | Eyes scan badge first; color = urgency signal |
| **Score badge (92/100)** | Numeric, right-aligned | Precise, memorable, no ambiguity |
| **Reasoning text** | Single sentence, ~15 words | Executive-level, no fluff, fits on screen |
| **Animated cards** | Slide-in with stagger | Feels polished, not generic; shows results arrived |
| **Hover lift effect** | Cards rise on hover | Signals interactivity, reinforces hierarchy |
| **Empty state** | Inviting prompt, no blank space | Guides users (not intimidating) |
| **Loading spinner** | Animated, labeled | Clear feedback; users know analysis is running |
| **Error messages** | Friendly, actionable | "Please include deadline and team size" (not "Invalid input") |
| **Collapsible docs** | Expandable "How this was built" section | Professional, doesn't clutter main UI |

---

## 💡 Usage Examples

### Example 1: Q3 Roadmap Planning
**Scenario:** You have 5 projects, 2 engineering teams, 12 weeks.

```
Engineering effort: Dashboard (6w, 3 people), Mobile app (8w, 2 people), 
Refactoring (4w, 2 people), Bug fixes (ongoing), API work (2w, 1 person).
```

**Result:** "Do Dashboard + API work in parallel (9 weeks total, 4 people). 
Refactoring in Q4. Bug fixes ongoing."

---

### Example 2: Fire-Fighting Mode
**Scenario:** Critical outage, customer escalations, plus planned work.

```
Critical API bug (2 week fix, blocks integrations). 
Customer support tool (4 weeks, 3 people, $100k revenue). 
Internal automation (3 weeks, 2 people, reduces toil).
```

**Result:** "Fix API bug first (unblocks revenue work). Then customer tool. 
Automation deprioritized (non-blocking)."

---

### Example 3: Ambiguous Input (Testing Edge Cases)
**Scenario:** Unclear priorities, conflicting signals.

```
Project: Rewrite legacy code. Urgency: unclear. Team: unknown. 
Impact: some (tech debt).
```

**Result:** "Medium priority (58/100). Tech debt matters, but need clarity on 
urgency and resource availability. Recommend stakeholder clarification."

---

## 🔌 Extension Guide

The assistant is designed to be extended. Here are production-ready enhancements:

### 1. **Project Memory / History**
Track how rankings change over time. Useful for retrospectives ("Were we right to deprioritize X?").

```javascript
// Add to prioritizeProjects():
const history = JSON.parse(localStorage.getItem('prioritizationHistory') || '[]');
history.push({ timestamp: new Date(), results });
localStorage.setItem('prioritizationHistory', JSON.stringify(history));

// In renderResults(): Show "Previous rank vs. New rank" comparison
```

### 2. **Drill-Down / Detail View**
Click a ranked project → expand to see:
- Detailed action plan / task breakdown
- Risk assessment
- Resource needs by role
- Timeline with milestones
- Dependency map

```javascript
// On result card click:
if (clicked) {
  const detailPrompt = `For ${projectName}, provide:
    1. Step-by-step breakdown (tasks in order)
    2. Resource needs (roles, hours)
    3. Key risks and mitigation
    4. Critical path & milestones`;
  // Send to Claude for detailed analysis
}
```

### 3. **Export / Reporting**
Generate shareable reports (Markdown, PDF, or PPTX) with rankings + reasoning.

```javascript
// Export to Markdown:
const markdown = projects.map(p => 
  `## ${p.rank}. ${p.name}\n\nScore: ${p.score}/100\n\n${p.reasoning}`
).join('\n\n');

// Or use a PDF library (e.g., jsPDF) to generate formatted reports
```

### 4. **Real Project Data Integration**
Instead of free text, fetch projects from your PM tool (Jira, Linear, Asana, etc.):

```javascript
// Before sending to Claude:
const projects = await fetch('/api/jira/projects').then(r => r.json());
const descriptions = projects.map(p => 
  `${p.name}: Due ${p.dueDate}, ${p.team.size} people, ${p.blockers.length} blockers.`
).join('\n\n');
// Send descriptions to Claude (same flow)
```

### 5. **Multi-Turn Refinement / Chat**
After ranking, let users chat with Claude to refine priorities:

```
User: "Why did you rank Project B so low? We can add 2 more engineers."
Claude: "That changes feasibility from medium to high. Revised score: 88/100 → rank 2."
```

Add a chat panel below results for iterative refinement.

### 6. **What-If Scenarios**
Let users tweak constraints and see re-ranked results instantly:

```javascript
// UI: Checkboxes to toggle constraints
// "Assume unlimited budget"
// "Remove deadline pressure"
// "Assume resource X unavailable"

// Re-run analysis with modified input
```

### 7. **Collaborative Voting**
Share prioritization with team, let them vote/comment, feed consensus back to Claude:

```javascript
// Simple version: Add React/Vue for multi-user interaction
// Claude makes final call based on voting patterns
```

### 8. **Scheduled Re-prioritization**
Set up recurring prioritization runs (weekly/monthly):

```javascript
// Cron job: Fetch current projects, run prioritizer, email summary
setInterval(() => {
  prioritizeProjects(); // Auto-run
  sendEmailReport();    // Email team the updated ranking
}, 7 * 24 * 60 * 60000); // Weekly
```

---

## 🛠️ Technical Architecture

### File Structure
```
project_prioritizer.html          # Single self-contained file
├── HTML                          # Semantic structure
├── CSS                           # Design system (colors, animations, responsive)
├── JavaScript                    # Logic, API calls, state management
└── System Prompt (in JS)         # Claude's instructions
```

### Key Components

**HTML:**
- Two-column grid layout (input + results)
- Textarea for project input
- Results container (dynamically populated)
- Collapsible documentation panel

**CSS:**
- Design tokens (colors, spacing, shadows) defined as CSS variables
- Responsive breakpoints (desktop → tablet → mobile)
- Smooth animations (slide-in, fade, spin)
- Accessibility-first (semantic colors, readable contrast)

**JavaScript:**
- Event listeners (click, keyboard shortcuts)
- Fetch-based API calls
- JSON parsing and error handling
- Dynamic HTML rendering
- Local state management

---

## ⚙️ Edge Case Handling

The system prompt instructs Claude to handle:

| Scenario | Behavior |
|----------|----------|
| **Empty input** | Validation error ("Please enter at least one project") |
| **One project** | Still ranks it, provides reasoning |
| **Missing data** | "Based on limited info, best guess is... Consider providing [deadline/budget/team size]." |
| **Contradictions** | "High impact but due tomorrow — risky. Recommend timeline extension or resource boost." |
| **Unclear descriptions** | Asks for clarification in reasoning; scores lower confidence |
| **Non-project input** | "Doesn't look like project descriptions. Please format as: Project name, deadline, team size, impact." |
| **Duplicate projects** | "Projects A and A' appear identical. Treat as one?" |

---

## 🔐 Privacy & Security

- **No data storage** — Projects are analyzed in real-time and not logged
- **No authentication** — Designed for Anthropic's environment (API key handled by backend)
- **Client-side processing** — All UI rendering happens in your browser
- **HTTPS only** — API calls use secure transport

---

## 🚦 Error Handling

The app gracefully handles:

- **Network errors** — "Connection failed. Check your internet and retry."
- **API errors** — "API returned an error (e.g., 429 rate limit). Try again in a moment."
- **Parse errors** — "Response format unexpected. Please report to support."
- **Empty input** — "Please enter project descriptions."
- **Invalid JSON** — "Failed to parse Claude's response. Try rephrasing your projects."

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

**Responsive design:** Optimized for desktop (two columns) and mobile (single column, stacked).

---

## 🎯 Best Practices

### For Users

1. **Be specific** — Include deadline, team size, and business impact
   - ✅ Good: "Launch dashboard by end of Q2. 3 engineers. Unblocks revenue roadmap ($200k potential)."
   - ❌ Vague: "Work on dashboard."

2. **Mention blockers** — Help Claude understand dependencies
   - ✅ Good: "Depends on API redesign (Project B). Blocked if Project B slips."
   - ❌ Vague: "Depends on other stuff."

3. **Re-run as situations change** — Roadmaps are living documents
   - Use it for sprint planning, quarterly OKRs, and crisis management

4. **Treat as recommendation, not gospel** — Claude is smart but not omniscient
   - Validate rankings against your context and stakeholder input

### For Developers

1. **Extend incrementally** — Start with memory (localStorage), then export, then chat
2. **Preserve the system prompt** — It's tuned for this use case; changing it may degrade quality
3. **Test edge cases** — One project, no deadline, contradictory info, etc.
4. **Consider rate limits** — If deploying at scale, add queue/cache logic
5. **Monitor API costs** — Each call uses tokens; batch if possible

---

## 🐛 Troubleshooting

### **"No results after clicking Prioritize"**
- Check browser console (F12) for errors
- Verify internet connection is active
- Confirm textarea has valid project descriptions
- Wait 10-30 seconds (API may be slow)

### **"API error 429"**
- Rate limit hit. Wait a few moments and retry.
- If persistent, you may be hitting usage limits (contact support).

### **"Results don't make sense"**
- Check your project descriptions for clarity
- Add more details (deadline, team size, impact)
- Re-run with rephrased input
- Consider whether context is ambiguous (e.g., "high priority" to whom?)

### **"Why did it rank Project X so low?"**
- Read the reasoning (usually explains the trade-off)
- Click the result card to expand (if drill-down is added)
- Re-run with additional context or clarification
- Use chat refinement (if multi-turn is added)

---

## 📊 Scoring Deep Dive

Claude applies this mental model (user doesn't see this, but it's what powers the ranking):

### Impact (40%)
- **Strategic alignment** — Supports company goals/OKRs? (0-30 points)
- **Revenue impact** — Direct or indirect revenue? (0-30 points)
- **Unblocks work** — How many other projects depend on this? (0-20 points)
- **Risk reduction** — Mitigates critical risk? (0-20 points)

### Urgency (30%)
- **Deadline proximity** — Days/weeks away? (0-30 points)
- **External dependencies** — Waiting on customer, vendor, or other team? (0-20 points)
- **Compliance/regulatory** — Legal or regulatory deadline? (0-20 points)
- **Reputation risk** — Failure impacts brand? (0-15 points)
- **Market window** — Seasonal or time-sensitive? (0-15 points)

### Feasibility (20%)
- **Resource availability** — Do we have people, skills, budget? (0-40 points)
- **Technical debt** — Will existing tech support this? (0-30 points)
- **Dependency resolution** — Can blockers be unblocked? (0-30 points)

### Effort (10%)
- **Complexity** — How hard is this compared to payoff? (0-50 points)
- **Timeline realism** — Is the stated deadline achievable? (0-50 points)

**Final score** = (Impact×0.4) + (Urgency×0.3) + (Feasibility×0.2) + (Effort×0.1)

---

## 🤝 Contributing

Found a bug? Have a feature idea? Want to extend this?

1. **Bug reports** — Open an issue with:
   - Browser and OS
   - Exact input that caused the issue
   - Expected vs. actual behavior
   - Console error messages (if any)

2. **Feature requests** — Describe the use case:
   - What problem does it solve?
   - How would users interact with it?
   - Which extension category? (memory, drill-down, export, integration, chat, scenarios)

3. **Extensions** — Build and share:
   - Fork / modify the HTML file
   - Test thoroughly
   - Document your changes
   - Share with your team or community

---

## 📞 Support & Questions

**How do I deploy this at scale?**
- Host the HTML file on your internal server or static site (AWS S3, Vercel, Netlify, etc.)
- The app works client-side; API calls are handled by Anthropic's backend
- Consider adding authentication if sensitive project info is involved

**Can I use this offline?**
- No. The app requires API access to Claude. (Feature idea: local fallback ranking for planning?)

**What if I want to store results?**
- Add localStorage (see extension guide)
- Or integrate with your database backend

**How much does it cost?**
- Uses standard Claude API pricing (per-token)
- Typical prioritization run: ~500-1000 tokens (~$0.01-0.03 USD)

---

## 📄 License

This assistant is designed for use within Anthropic's claude.ai environment. Check Anthropic's terms for deployment and commercial use.

---

## 🙏 Acknowledgments

Built with:
- **Claude AI** (claude-sonnet-4-20250514) for prioritization logic
- **Anthropic API** for real-time analysis
- **Vanilla JS** (no frameworks) for zero-dependency simplicity
- **Modern CSS** (Grid, Flexbox, CSS Variables) for responsive design

---

## 📚 Additional Resources

- **Anthropic Claude Docs** — https://docs.claude.com
- **Project Management best practices** — Research RICE scoring, MoSCoW prioritization, Weighted Shortest Job First
- **AI prompt engineering** — See collapsible "How this was built" section in the app

---

## 🚀 What's Next?

Try these extensions in order of complexity:

1. **Easy** — Add localStorage for project history (30 min)
2. **Medium** — Add "Export to Markdown" button (1 hour)
3. **Hard** — Add multi-turn chat for refinement (2-3 hours)
4. **Expert** — Integrate with Jira/Linear/Asana API (half day)

Each builds on the previous. Start with one and share your results!

---

**Made with ❤️ for teams who need clarity in chaos.**