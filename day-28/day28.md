# Hospital Admission Readiness Simulator

A clinical workflow simulator designed to train admission coordinators on the end-to-end process of preparing patients for hospital admission. This tool models real-world decision-making around prior authorization, insurance verification, documentation, and readiness assessment.

## Overview

The **Hospital Admission Readiness Simulator** is a single-file web application that replicates the admission coordinator role. Users progress through a realistic intake workflow, completing prerequisite tasks and managing competing priorities before a patient can be admitted.

### Key Purpose
- Train coordinators on admission protocol workflows
- Demonstrate the cascading impact of incomplete documentation or denied authorizations
- Build understanding of compliance touchpoints (UR, CMS rules, billing)
- Illustrate industry timelines and denial risk patterns

**Status**: Illustrative training tool with sample provider and payer names

---

## System Requirements

- **Browser**: Modern HTML5 support (Chrome, Firefox, Safari, Edge)
- **Internet**: CDN access for Tailwind CSS (https://cdn.tailwindcss.com)
- **No backend required**: Fully client-side state management
- **File Format**: Single `.html` file; no installation or build step

### To Use
1. Open `hospital-admission-simulator.html` in any web browser
2. Begin intake immediately—no login or setup required
3. All data stored in browser memory; refreshing resets the session

---

## Workflow Overview

### Phase 1: Intake & Setup (5–10 seconds)

User collects required patient and admission information:

| Field | Options | Notes |
|-------|---------|-------|
| **Provider/Hospital System** | Free text | e.g., "Valley Health System" (illustrative) |
| **Attending Physician** | Free text | e.g., "Dr. Sarah Chen" (sample name) |
| **Primary Diagnosis** | 5 options | Acute MI, CHF, Pneumonia, Elective Surgery, Hip Fracture |
| **Admission Type** | 5 options | Inpatient, Observation, Emergency, ICU, Same-Day Surgery |
| **PA Status** | 3 options | Approved, Pending, Denied |
| **Admission Date** | Date picker | Defaults to today |

#### Dynamic Warnings
- **Observation status selected** → Displays CMS 2-Midnight Rule notice (different cost-sharing, SNF eligibility, MOON notification requirement)
- **Acute MI or CHF diagnosed** → Displays clinical criteria flag (InterQual/Milliman standards apply)

**Button**: 🏥 Analyze Admission Readiness → Proceeds to Phase 2

---

### Phase 2: Initial Analysis & Assessment (30–60% Readiness)

#### Readiness Score Display
- Large percentage badge (center of screen)
- Gradient progress bar (warm → cool, left to right)
- Does **not** reveal final decision yet
- Score clamped to 30–60% range during initial phase

#### Score Weighting (100% total)
```
PA Status (25%)
├─ Approved: 100% contribution
├─ Pending: 50% contribution
└─ Denied: 0% contribution (must appeal to advance)

Clinical Documentation (20%)
├─ Complete: 100% contribution
└─ Incomplete: 60% contribution

Physician Orders (20%)
├─ Entered: 100% contribution
└─ Pending: 70% contribution

Insurance Verification (15%)
├─ Verified: 100% contribution
└─ Pending: 50% contribution

Patient Consent (10%)
├─ Signed: 100% contribution
└─ Pending: 60% contribution

Bed Assignment (10%)
├─ Assigned: 100% contribution
└─ ICU/Pending: 40% contribution
```

**Special Rule**: Denied PA + ICU admission cannot reach 70% from administrative task completion alone (hard cap on action bonus)

#### Status Dashboard (6 Badges)
Quick reference for:
- PA Status (Approved/Pending/Denied)
- Insurance (Verified/Pending)
- Bed (Assigned/Pending)
- Documentation (Complete/Incomplete)
- Physician Orders (Entered/Pending)
- Consent (Signed/Pending)

---

### Phase 3: Prior Authorization Branches

Based on PA status selected, user sees context-specific workflow options:

#### If PA = Approved
- Badge shows ✓ Approved
- Text: "Proceed with bed assignment and clinical workflows"
- No additional actions required for PA (user can still complete other tasks)

#### If PA = Pending
- Badge shows ⏳ Pending Review
- Three interactive workflow buttons:
  1. **📞 Follow Up with Insurer** – Call authorization team for status
  2. **📄 Upload Missing Documentation** – Submit clinical notes/test results
  3. **👨‍⚕️ Contact Attending Physician** – Clarify medical necessity
- Each action advances readiness incrementally

#### If PA = Denied
- Badge shows ✗ Denied
- Three workflow options:
  1. **📋 Review Denial Reason** – Understand medical necessity concern
  2. **☎️ Contact Insurance Appeal Team** – Request formal reconsideration
  3. **📮 Submit Formal Appeal** – File peer-to-peer or clinical appeal
- **On successful appeal submission**: PA status converts to Approved, component score jumps to 100%
- Alert box explains appeal conversion mechanic

---

### Phase 4: Workflow Actions (7 Tasks)

Interactive clickable tasks that advance readiness when completed:

| Task | Icon | Purpose | Component Impact |
|------|------|---------|------------------|
| Assign Bed | 🛏️ | Reserve bed on appropriate unit | Bed = 100% |
| Verify Insurance | 🔍 | Confirm coverage & eligibility | Insurance = 100% |
| Upload Documentation | 📁 | Submit clinical records | Documentation = 100% |
| Complete Consent | ✍️ | Patient signature on forms | Consent = 100% |
| Contact Physician | 📞 | Finalize admission orders | Physician Orders = 100% |
| Notify Nursing | 👩‍⚕️ | Alert unit staff to prepare | (Status tracking) |
| Prepare Patient Arrival | 📍 | Confirm transport arrangements | (Timeline advancement) |

**Mechanics**:
- Clicking a task button marks it complete (step number changes to ✓, background becomes light green)
- Each completed action adds +3% to overall readiness score
- Multiple completions stack (7 actions × 3% = +21% possible)
- All actions clickable simultaneously; order does not matter

**Score Update**: Readiness recalculates and displays immediately upon action completion

---

### Phase 5: Care Coordination Cards (6 Roles)

Team members involved in admission process, each with specific responsibilities:

#### 1. **👨‍⚕️ Attending Physician** (Clinical Leadership)
- Verify admission orders entered
- Confirm medical necessity documentation
- Approve ICU/observation status if applicable

#### 2. **📊 Case Manager** (Utilization Coordination)
- Assess length of stay expectations
- Identify discharge planning needs early
- Coordinate SNF placement if observation

#### 3. **👩‍⚕️ Nursing Unit** (Patient Care)
- Prepare bed assignment
- Review admission protocols
- Perform clinical assessment on arrival

#### 4. **🔍 Utilization Review** (Compliance & Quality) ⭐
- Conduct concurrent review
- **Identify denial risk early (InterQual/Milliman)**
- Flag documentation gaps for rework
- *This card names the standards explicitly*

#### 5. **🏥 Discharge Planner** (Post-Acute Coordination)
- Determine appropriate discharge setting
- Arrange post-acute care if needed
- Coordinate SNF pre-authorization

#### 6. **💰 Revenue Cycle** (Financial Compliance)
- Verify insurance authorization active
- Confirm pre-cert requirements met
- Track denial & appeal timelines

**Display**: 3-column grid on desktop; responsive to single column on mobile

---

### Phase 6: Risk Tracking (4 Categories)

Ongoing risk assessment based on current state:

| Risk Type | High (Red) | Medium (Amber) | Low (Green) |
|-----------|-----------|----------------|------------|
| **Documentation Risk** | <80% complete | 80–89% complete | ≥90% complete |
| **Insurance Risk** | PA Denied | PA Pending | PA Approved |
| **Bed Risk** | ICU bed not assigned | Med/Surg pending | Assigned |
| **Clinical Risk** | Acute MI, CHF | Pneumonia, Fracture | Elective, routine |

**Weighting**: Clinical risk escalated for Acute MI, CHF, and ICU admissions

**Display**: Color-coded risk chips with brief detail text

---

### Phase 7: Timeline Milestones (9 Steps)

Visual timeline showing admission process from start to completion:

```
1. PA Review
   ↓
2. Insurance Verification
   ↓
3. Bed Assignment
   ↓
4. Documentation
   ↓
5. Consent
   ↓
6. Patient Arrival
   ↓
7. Registration
   ↓
8. Clinical Assessment
   ↓
9. Admission Complete
```

**Visual Indicators**:
- ✓ Green dot = Completed step
- 🔵 Blue pulsing dot = Active/current step (animated)
- ⭕ Gray dot = Pending step

**State Management**: Timeline updates as coordinator completes workflow actions

---

### Phase 8: Governance Snapshot (Threshold: ≥75% Readiness)

Appears automatically when readiness reaches 75% or higher.

**Industry Benchmarks** (estimates only):

| Metric | Value | Source |
|--------|-------|--------|
| Prior Authorization Turnaround | 3–5 days | Typical range |
| Inpatient Denial Rate | ~8–10% | CMS data |
| PA Rework Cost | ~$11 | Per transaction (CAQH) |

**Purpose**: Reinforces real-world compliance context and financial impact

---

### Phase 9: Final Decision (Threshold: ≥90% Readiness)

Appears automatically when readiness reaches 90% or higher.

#### ✅ Admit (≥90%)
```
✅ READY FOR ADMISSION

Admission Summary:
Attending: [Physician Name]
Diagnosis: [Selected diagnosis]
Admission Type: [Selected type]
Readiness Score: [Score]%

All critical workflows completed. 
Patient cleared for immediate admission.
```

#### ⚠️ Not Ready (<90%)
```
⚠️ NOT READY FOR ADMISSION

Missing Items (N):
[List of incomplete components]

Required Actions: Complete workflow tasks 
above to reach 90%+ readiness.
```

**Components Checked**:
- PA Status < 80% → "Prior Authorization" in missing list
- Documentation < 80% → "Clinical Documentation"
- Physician Orders < 80% → "Physician Orders"
- Insurance < 80% → "Insurance Verification"
- Consent < 80% → "Patient Consent"
- Bed < 80% → "Bed Assignment"

---

## Key Clinical & Compliance Features

### CMS 2-Midnight Rule
When **Observation** admission type is selected, alert box displays:
```
CMS 2-Midnight Rule applies — This admission carries different 
cost-sharing, SNF eligibility, and billing than inpatient. 
Medicare patients require written MOON (Modifier, Observation, 
Overnight, Notification) notification before or upon admission. 
Document medical necessity carefully to avoid post-payment denials.
```

**Training Point**: Observation vs. Inpatient has major downstream billing impact

### InterQual/Milliman Standards
When **Acute MI** or **CHF** is diagnosed, alert box displays:
```
InterQual/Milliman thresholds apply — ensure documentation 
meets medical necessity standards before UR review. Incomplete 
documentation may trigger pre-authorization denial or delay admission.
```

**Training Point**: High-acuity diagnoses trigger stricter UR criteria

### Denied PA + ICU Hard Cap
**Special Rule**: If user selects PA = Denied AND Admission Type = ICU:
- Actions can advance score, but hard cap prevents reaching 70% from administrative tasks alone
- Communicates real-world constraint: some combinations require actual appeal success, not just process completion

---

## User Actions & Workflows

### Starting a New Admission
1. Enter Provider, Physician, Diagnosis, Admission Type, PA Status, Date
2. Click **🏥 Analyze Admission Readiness**
3. Taken to analysis phase

### Advancing Readiness
**Option A: Complete Workflow Actions**
- Click any of 7 task buttons (Assign Bed, Verify Insurance, etc.)
- Each completion: +3% to readiness, component updated to 100%
- Visible feedback: button turns green with ✓

**Option B: Handle PA Branches**
- If PA = Pending: Click Follow Up, Upload Docs, or Contact Physician
- If PA = Denied: Click Review Reason, Appeal Team, or Submit Appeal
- Successful appeal: PA converts to Approved, component = 100%

### Monitoring Progress
- Dashboard badges update in real-time
- Score display and progress bar refresh immediately
- Timeline dots animate as milestones progress
- Risk chips update color based on current state

### Exporting Report
- Click **📋 Export Summary** button
- Downloads `.txt` file with:
  - Patient info (provider, physician, diagnosis, admission type, date)
  - Readiness score & component status
  - List of completed actions
  - Final decision (Admit / Not Ready)
  - Generation timestamp

### Starting Over
- Click **← Start New Admission** button
- Resets all state; returns to intake form
- Form fields restore to default values

---

## Clinical Scenarios & Training Use Cases

### Scenario 1: Smooth Admission (Best Case)
**Setup**: Approved PA, Elective Surgery, all information complete
- Initial score: ~55%
- Complete 4–5 workflow tasks
- Reach 70%+ easily
- Hit 90% before final governance threshold
- **Outcome**: ✅ Admit

**Teaching Point**: When PA is approved and documentation complete, remaining tasks are operational efficiency

### Scenario 2: Pending Authorization (Wait & Escalate)
**Setup**: Pending PA, CHF admission, clinician wants to proceed
- Initial score: ~40% (PA stuck at 50%)
- Must click PA branch actions (Follow Up, Upload Docs, Contact Physician)
- Or complete unrelated tasks (Insurance, Bed, Consent) to build score
- Once PA resolves → immediate jump in score
- **Outcome**: Conditional; highlights PA as bottleneck

**Teaching Point**: Pending authorizations require active follow-up, not passive waiting

### Scenario 3: Denied Appeal (Recovery Path)
**Setup**: Denied PA, Acute MI, high-acuity case
- Initial score: ~30% (PA = 0%)
- Standard tasks available but limited impact (hard cap rule applies)
- **Must** click PA branch: Review Reason → Contact Insurance → Submit Appeal
- Upon successful appeal submission → PA = Approved, score jumps
- Now able to reach 90%
- **Outcome**: ✅ Admit (after appeal success)

**Teaching Point**: Denials require targeted escalation; process automation alone insufficient

### Scenario 4: Observation Admission (Regulatory Nuance)
**Setup**: Observation admission type selected
- MOON notification warning appears
- Cost-sharing and SNF eligibility rules display
- Discharge planner card emphasizes SNF pre-auth
- Same workflow logic but regulatory context differs

**Teaching Point**: Observation billing is materially different from inpatient; requires specific patient communication

---

## Interface Design Notes

### Visual Design System
- **Primary Color**: #1e3a5f (clinical navy)
- **Status Colors**: 
  - Green (#10b981) = Approved, Complete
  - Amber (#f59e0b) = Pending, Warning
  - Red (#ef4444) = Denied, Risk
- **Typography**: System sans-serif (Segoe UI, SF Pro Display fallback)
- **Layout**: Responsive grid (1 col mobile, 2–3 col desktop)
- **Animations**: Pulse effect on active timeline dot, smooth transitions

### Accessibility
- Semantic HTML structure
- Color + icon differentiation (not color alone)
- Focus states on interactive elements
- Reduced motion respected (via CSS media query if implemented)

### Mobile Responsive
- Single-column layout on small screens
- Touch-friendly button sizes (44px minimum)
- Readable font sizes (16px+ for body text)
- Full functionality on tablets and phones

---

## Known Limitations & Design Choices

### Single-Session State
- No persistent data storage (refresh = reset)
- Intended behavior for training environment
- If persistence needed, add `localStorage` API

### Illustrative Data Only
- All provider names, physician names, payer names are sample/training data
- Not connected to real EMR, claims system, or authorization platform
- Designed for workflow education, not operational use

### Simplified Scoring Model
- Real admission readiness involves nuanced clinical judgment
- Simulator uses weighted formula for determinism and learning
- Scores should not be interpreted as clinical recommendations

### No Real Insurance Integration
- PA status manually selected by trainer/user
- Real workflow would call insurance APIs or workflow queue
- Simulator demonstrates impact of PA status on downstream workflow

### No Secure Patient Data
- No HIPAA-compliant data storage or transmission
- Suitable for training/demo environments only
- Do not use with real patient identifiers

---

## File Contents

### Single HTML File: `hospital-admission-simulator.html`

**Size**: ~40 KB (minified)

**Dependencies**:
- Tailwind CSS (CDN): `https://cdn.tailwindcss.com`
- Modern browser with ES6 JavaScript support

**Structure**:
```html
<head>
  └─ Tailwind CDN import
  └─ Custom CSS (design system, animations, layouts)
  
<body>
  ├─ Header (title, icon)
  │
  ├─ Setup Phase (form inputs)
  │  └─ Intake fields + conditional warnings
  │
  └─ Analysis Phase (hidden until analysis starts)
     ├─ Status dashboard
     ├─ Readiness score display
     ├─ PA branches
     ├─ Workflow actions
     ├─ Care coordination cards
     ├─ Risk tracking
     ├─ Timeline milestones
     ├─ Governance snapshot (conditional)
     ├─ Final decision (conditional)
     └─ Export / Reset buttons

<script>
  └─ app object (state management, calculations, rendering)
```

---

## Running & Deploying

### Local Use (No Server Required)
1. Download `hospital-admission-simulator.html`
2. Double-click to open in default browser, **or**
3. Right-click → Open With → [Choose browser]
4. Or drag & drop into browser window

### Hosting on Web Server
1. Copy `.html` file to web server root (or subdirectory)
2. No build step; no backend required
3. Access via `https://yourdomain.com/hospital-admission-simulator.html`
4. All functionality runs client-side; no server load

### Customization
To modify provider names, payer data, or diagnosis options:
1. Open `.html` in text editor
2. Search for `<select id="diagnosis">` or hardcoded values (e.g., "Valley Health System")
3. Edit option labels or default values
4. Save file
5. No re-build needed; refresh browser to see changes

---

## Training Tips & Facilitation Guide

### For Trainers/Educators

**Objective**: Build mental model of admission coordinator workflow

**Session Structure** (30 minutes):
1. **Introduction** (3 min): Explain simulator purpose; ground in real workflow
2. **Guided Demo** (7 min): Walk through best-case scenario (Approved PA, simple admission)
3. **Hands-On Exploration** (15 min): Let trainees try 2–3 scenarios
4. **Debrief** (5 min): Highlight decision points, PA impact, risk escalation

**Scenario Order** (build complexity):
1. **Elective Surgery** (Simple) — Approved PA, straightforward workflow
2. **CHF or Acute MI** (Complex) — Pending PA, regulatory triggers, UR involvement
3. **Denied + Appeal** (Advanced) — Recovery path, persistence required

**Discussion Points**:
- "Why did the score jump when we clicked Submit Appeal?"
- "What happened to the timeline when we assigned a bed?"
- "How would a real patient experience this wait time?"
- "Where do you think most denials happen in your organization?"

### For Self-Directed Learners

**Try These**:
1. Complete an admission with Observation status; note MOON notice
2. Trigger a Denied PA; see if you can appeal to Approved
3. Watch risk chips change color as you complete actions
4. Export two different admission reports and compare

---

## Troubleshooting

### Simulator Won't Load
- **Cause**: Browser too old or JavaScript disabled
- **Fix**: Update browser (Chrome 90+, Firefox 88+, Safari 14+); enable JavaScript

### Tailwind CSS Not Styling
- **Cause**: No internet connection or CDN blocked
- **Fix**: Check network access; may need firewall exception for `cdn.tailwindcss.com`

### Buttons Not Responding
- **Cause**: Browser console error or JavaScript error
- **Fix**: Open Developer Tools (F12); check Console tab for error messages

### Score Not Updating
- **Cause**: Form not fully completed before clicking Analyze
- **Fix**: Ensure all 6 intake fields are filled; click Analyze again

### Data Lost on Refresh
- **Cause**: Designed behavior (no persistence)
- **Fix**: If you need to keep data, take a screenshot or export summary before refreshing

---

## Contact & Support

**For Questions About**:
- Workflow logic → Review "Workflow Overview" section above
- Clinical accuracy → Consult your compliance or UR team
- Technical issues → Check browser console (F12) for error messages
- Customization → Edit `.html` file with text editor

**For Real Admission Workflows**:
This simulator is educational only. For actual patient admissions:
- Contact your hospital's admission department
- Follow your organization's admission protocol
- Refer to CMS guidelines (2-Midnight Rule, PA requirements)
- Consult your insurance partners' authorization procedures

---

## Version & Changelog

**Version**: 1.0  
**Release Date**: July 2024  
**Status**: Training Tool (Illustrative Data)

### Features Included
- ✅ Full intake workflow
- ✅ 5 diagnosis types, 5 admission types
- ✅ PA pending/approved/denied branches
- ✅ 7 workflow action tasks
- ✅ 6 care coordination roles
- ✅ Risk tracking & timeline visualization
- ✅ CMS 2-Midnight Rule notice
- ✅ InterQual/Milliman criteria flags
- ✅ Governance benchmarks display
- ✅ Final decision logic (90%+ threshold)
- ✅ Export summary report
- ✅ Fully responsive design
- ✅ No external backend required

---

## License & Usage

**Intended Use**: Internal training, educational simulation, workflow demonstration

**Restrictions**: 
- Do not use with real patient data
- Do not use in live clinical decision-making
- Do not store or transmit through secure patient portals
- For training purposes only

**Customization**: Licensed for modification and internal distribution within your organization

---

## Appendix: Scoring Reference

### Initial Component Scores

```javascript
// Triggered by user selections during setup

pa (Prior Authorization) = {
  'approved': 100,
  'pending': 50,
  'denied': 0
}

documentation = {
  'if diagnosis selected': 60,
  'if no diagnosis': 30
}

physicianOrders = {
  'if pa !== "denied"': 70,
  'if pa === "denied"': 0
}

insurance = 50  // Default baseline

consent = 60    // Default baseline

bed = {
  'if icu': 40,
  'else': 60
}
```

### Score Formula

```
READINESS_SCORE = (pa × 0.25) + (documentation × 0.20) + 
                  (physicianOrders × 0.20) + (insurance × 0.15) + 
                  (consent × 0.10) + (bed × 0.10) + action_bonus

action_bonus = completed_actions.length × 3
              [capped at 25 if pa === 'denied' && admission_type === 'icu']

INITIAL_RANGE = Math.max(30%, Math.min(60%, READINESS_SCORE))
```

### Thresholds

| Score | Event |
|-------|-------|
| 30–60% | Initial Analysis phase (score not finalized) |
| 60–74% | Normal workflow (can continue completing tasks) |
| ≥75% | Governance Snapshot appears |
| ≥90% | Final Decision appears (Admit or Not Ready) |

---

## Quick Reference: Keystroke Walkthrough

```
1. Open hospital-admission-simulator.html in browser
2. Form appears with 6 fields:
   - Provider: "Valley Health System" (default)
   - Physician: "Dr. Sarah Chen" (default)
   - Diagnosis: Select one (e.g., "CHF")
   - Admission Type: Select one (e.g., "Inpatient")
   - PA Status: Select one (e.g., "Pending")
   - Admission Date: Default today
3. Click "🏥 Analyze Admission Readiness"
4. Analysis phase loads:
   - Status dashboard (6 badges)
   - Readiness score display (30–60%)
   - PA branch options appear
   - Workflow action buttons available
   - Click any action button to complete (turns green ✓)
   - Score updates in real-time
   - Timeline advances as tasks complete
5. When score ≥75%: Governance Snapshot appears
6. When score ≥90%: Final Decision appears
7. Click "📋 Export Summary" to download report
8. Click "← Start New Admission" to reset
```

---

**End of README**

For additional questions or feedback, consult your admission department or compliance team.