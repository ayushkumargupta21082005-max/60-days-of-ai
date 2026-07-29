# 🏭 AI Supply Chain Control Tower

A premium interactive operations dashboard simulation where you manage real-time supply chain incidents as the Head of Operations. Make strategic decisions under time pressure to maximize operational performance and protect business revenue.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Game Overview](#game-overview)
- [How to Play](#how-to-play)
- [KPI Metrics Explained](#kpi-metrics-explained)
- [Alert Types](#alert-types)
- [Available Actions](#available-actions)
- [Scoring System](#scoring-system)
- [Strategy Tips](#strategy-tips)
- [Technical Specifications](#technical-specifications)
- [Browser Compatibility](#browser-compatibility)

---

## 🚀 Quick Start

### Installation
1. Download `supply_chain_control_tower.html`
2. Open the file in any modern web browser
3. Click "Help" (❓) for in-game instructions
4. Start managing incidents!

**No installation, no internet, no dependencies required!**

---

## 🎮 Game Overview

### Objective
Manage a global supply chain operation for **3 minutes** while handling randomized operational disruptions. Your decisions affect key performance indicators (KPIs) and determine your final operational performance grade.

### Your Role
You are the **Head of Operations** responsible for:
- Responding to critical incidents in real-time
- Optimizing resource allocation under time pressure
- Protecting revenue while managing costs
- Maintaining customer satisfaction and service levels

### Core Mechanics
- **Alerts** appear randomly representing supply chain disruptions
- Each alert has a **time limit** (45-90 seconds depending on priority)
- You must **select an action** to resolve each incident
- Your decisions **immediately impact KPIs**
- Some decisions have **delayed consequences** (5+ seconds)
- As time runs out, alerts appear more frequently

---

## 📖 How to Play

### Getting Started
1. **Review Initial Alerts**: 2 incidents appear when you start
2. **Assess Priority**: Look for 🔴 **Critical** alerts first
3. **Choose Action**: Select the best response button for each alert
4. **Manage Time**: Watch the countdown timer - you have 3 minutes total
5. **Receive Feedback**: Event log shows results of your decisions

### Alert Anatomy

Each alert contains:
```
🚨 ALERT TITLE
├─ Description (what's happening)
├─ Priority Badge (Critical/High/Medium/Low)
├─ Impact Preview (shows KPI changes)
├─ Time Limit (seconds remaining to decide)
└─ Action Buttons (8 response options)
```

### Making Decisions
- **Click any action button** to resolve the alert
- One decision per alert (you can't change your mind)
- Alerts timeout if you don't act in time
- Correct decisions earn more points
- Wrong decisions reduce KPIs and increase costs

### Game Flow
```
START (3:00)
  ↓
Generate 2 initial alerts
  ↓
Player manages incidents (alerts appear every 15 seconds)
  ↓
Alert frequency increases as time runs out
  ↓
Multiple alerts active simultaneously
  ↓
END (0:00) → Performance Summary
```

---

## 📊 KPI Metrics Explained

### Service Level % (Target: 90%+)
**On-time delivery rate** - The percentage of orders delivered by promised date
- **Impact**: Affected by delays, disruptions, routing changes
- **How to improve**: Expedite shipments, reroute efficiently, backup suppliers
- **Danger zone**: Below 85% → Customer complaints escalate

### Customer Satisfaction (Target: 85%+)
**Overall customer sentiment score** - How happy your customers are
- **Impact**: Damaged shipments, delays, wrong inventory hurt satisfaction
- **How to improve**: Quick resolutions, damage prevention, accurate fulfillment
- **Danger zone**: Below 75% → Churn increases, revenue at risk

### Inventory Health (Target: 90%+)
**Warehouse optimization level** - Efficiency of stock management
- **Impact**: Stock-outs reduce health; overstocking wastes capital
- **How to improve**: Transfer inventory between warehouses, increase production
- **Danger zone**: Below 70% → Stock-outs become frequent

### Transportation Efficiency (Target: 85%+)
**Logistics performance score** - Cost-per-mile, utilization, on-time pickup/delivery
- **Impact**: Breakdowns, rerouting, and delays reduce efficiency
- **How to improve**: Reroute trucks, maintain fleets, optimize routes
- **Danger zone**: Below 75% → Transport costs spike

### Operating Cost (Target: <$2.5M)
**Total operational expenses** - Lower is better
- **Impact**: Quick solutions (air freight, expedited) cost more
- **How to improve**: Use longer-lead solutions, backup suppliers, delay non-critical decisions
- **Warning**: Every decision has a cost component

### Revenue Protected (Target: >$45M)
**Prevented losses from incidents** - Higher is better
- **Impact**: Resolving critical incidents protects revenue
- **How to improve**: Act decisively on critical alerts, prevent escalation
- **Measures**: Actual business value saved by good decisions

### Score (Target: 500+)
**Your operational performance score** - Increases with correct decisions
- **Calculation**: 50-100 points per alert depending on priority + bonus/penalty
- **Affects**: Final grade and performance evaluation

---

## 🚨 Alert Types

### Critical Priority (45-second limit) 🔴

| Alert | Icon | Description | Key Impact |
|-------|------|-------------|-----------|
| **Truck Breakdown** | 🚚 | Vehicle fails on route affecting 200+ orders | Service -12%, Efficiency -8% |
| **Warehouse Stock Out** | 📦 | Cannot fulfill orders from primary warehouse | Service -15%, Inventory -10% |
| **Factory Machine Failure** | ⚙️ | Production line down, reduces output 40% | Service -14%, Efficiency -10% |
| **Damaged Shipment** | 💥 | 500 units damaged in transit need replacement | Service -11%, Satisfaction -8% |

**Best Actions**: Expedite Shipment, Increase Production, Use Backup Supplier

---

### High Priority (60-second limit) 🟠

| Alert | Icon | Description | Key Impact |
|-------|------|-------------|-----------|
| **Port Congestion** | 🚢 | Major port delays shipping 48+ hours | Service -8%, Satisfaction -5% |
| **Supplier Delay** | ⏳ | Supplier reports 3-week production delay | Service -10%, Inventory -6% |
| **Customs Inspection** | 🔍 | Shipment held for inspection, 36-hour delay | Service -7%, Efficiency -6% |
| **Weather Disruption** | 🌪️ | Routes closed, transport severely limited | Service -9%, Efficiency -8% |

**Best Actions**: Reroute Trucks, Approve Air Freight, Use Backup Supplier

---

### Medium Priority (90-second limit) 🟡

| Alert | Icon | Description | Key Impact |
|-------|------|-------------|-----------|
| **Demand Spike** | 📈 | Unexpected 35% order increase | Inventory -8%, Efficiency -4% |
| **Inventory Mismatch** | ❌ | Physical inventory doesn't match system | Inventory -12%, Satisfaction -4% |

**Best Actions**: Increase Production, Transfer Inventory, Approve Air Freight

---

## 💡 Available Actions

Each alert provides 8 response options. Choose wisely - different actions have different impacts:

### Expedite Shipment ⚡
**When**: Need to speed up delivery
- **Cost**: +5 to Operating Cost
- **Benefits**: +12% Service Level, +3M Revenue Protected
- **Best for**: Port Congestion, Supplier Delays, Demand Spike
- **Strategy**: Expensive but fast solution

---

### Use Backup Supplier 🔄
**When**: Primary supplier is unavailable
- **Cost**: +3 to Operating Cost
- **Benefits**: +8% Service, +5% Inventory, +4% Satisfaction
- **Best for**: Supplier Delays, Factory Machine Failure
- **Strategy**: Reliable alternative source

---

### Reroute Trucks 🗺️
**When**: Current route is blocked/slow
- **Cost**: +2 to Operating Cost
- **Benefits**: +8% Efficiency, +6% Service, +3% Inventory
- **Best for**: Truck Breakdown, Weather Disruption, Customs Inspection
- **Strategy**: Find alternative transportation routes

---

### Increase Production 📈
**When**: Need to boost inventory quickly
- **Cost**: +4 to Operating Cost
- **Benefits**: +10% Inventory, +7% Service, -3% Efficiency (temporary)
- **Best for**: Warehouse Stock Out, Demand Spike
- **Strategy**: Ramped production to meet demand

---

### Transfer Inventory 📦
**When**: Inventory is in wrong warehouse
- **Cost**: +2 to Operating Cost
- **Benefits**: +8% Inventory, +9% Service
- **Best for**: Warehouse Stock Out, Demand Spike, Inventory Mismatch
- **Strategy**: Move stock between distribution centers

---

### Approve Air Freight ✈️
**When**: Need fastest possible delivery
- **Cost**: +8 to Operating Cost (most expensive)
- **Benefits**: +15% Service, +5% Efficiency
- **Best for**: Supplier Delays, Demand Spike, Weather Disruption
- **Strategy**: Premium urgent solution

---

### Ignore ⏭️
**When**: You think it will resolve itself
- **Cost**: 0 immediate cost
- **Delayed Penalty** (5 seconds later): Service -10%, Satisfaction -15%, Cost +5
- **Best for**: Low priority issues (rarely correct)
- **Strategy**: Risky - often results in escalation

---

### Delay Decision ⏸️
**When**: You need more information
- **Cost**: +1 to Operating Cost
- **Delayed Impact**: Minimal immediate effect
- **Best for**: Low priority issues while handling critical alerts
- **Strategy**: Buy time for decisions, but still costs money

---

## 🏆 Scoring System

### Points Per Alert
- **Critical Alert - Correct Action**: +100 points
- **Critical Alert - Wrong Action**: -20 points
- **High Priority - Correct Action**: +75 points
- **High Priority - Wrong Action**: -15 points
- **Medium Priority - Correct Action**: +50 points
- **Medium Priority - Wrong Action**: -10 points

### Performance Grade

| Grade | Score Requirement | Avg KPI | Meaning |
|-------|------------------|---------|---------|
| **A+** | 500+ | 95%+ | Excellent operational excellence |
| **A** | 400-499 | 90-94% | Great decision-making |
| **B** | 300-399 | 80-89% | Good management overall |
| **C** | 200-299 | 70-79% | Adequate but needs improvement |
| **D** | <200 | <70% | Poor incident response |

### How Score is Calculated
```
Final Score = (Correct Decisions × Points) + (KPI Bonuses) - (Penalty Deductions)

Performance Grade = Based on Final Score + Average KPI Level
```

---

## 🎯 Strategy Tips

### Priority Management
1. **Always handle Critical alerts first** 🔴 (45-second timer)
2. **Then High priority** 🟠 (60-second timer)  
3. **Finally Medium priority** 🟡 (90-second timer)
4. Don't ignore problems - they escalate with penalties

### Cost Management
- **Air Freight is expensive** (+8) but fastest
- **Expedite Shipment** (+5) is mid-range cost/speed
- **Backup Supplier** (+3) is economical
- Spread costs across decisions; don't spike Operating Cost

### KPI Balancing
- **Service Level & Satisfaction** are interconnected - keep both high
- **Inventory Health** prevents cascading failures
- **Efficiency** affects long-term costs
- Target: All KPIs above 85% for good grade

### Decision Patterns
```
Supplier Problem → Use Backup Supplier or Expedite
Routing Problem → Reroute Trucks
Stock Problem → Transfer Inventory or Increase Production
Demand Surge → Increase Production + Approve Air Freight
Time Pressure → Delay Decision on low-priority items
```

### Advanced Tactics
1. **Early game**: Build up KPIs with smart decisions (don't ignore anything)
2. **Mid game**: Prepare for alert surge by maintaining healthy inventory
3. **Late game**: Take calculated risks; handle multiple alerts quickly
4. **Final 30 seconds**: Resolve everything, even with expensive actions

### What NOT to Do
- ❌ Ignore critical alerts (automatic escalation penalty)
- ❌ Let Operating Cost spike above $3.5M (hurts profitability)
- ❌ Allow Service Level to drop below 80% (customer complaints)
- ❌ Let Inventory Health fall below 70% (stock-out cascade)
- ❌ Delay all decisions (costs add up)

---

## ⚙️ Technical Specifications

### System Requirements
- **Browser**: Any modern web browser (Chrome, Firefox, Safari, Edge)
- **Memory**: Minimal (<50MB)
- **Disk Space**: Single HTML file (~150KB)
- **Internet**: None required (fully offline)
- **Screen**: Responsive from mobile to 4K

### Architecture
- **Technology**: Pure HTML5, CSS3, Vanilla JavaScript
- **No Dependencies**: Zero external libraries or APIs
- **Self-Contained**: Everything in one file
- **Performance**: Lightweight, runs smoothly on all devices

### Game Loop
```
Main Loop (1000ms intervals):
├─ Check if game is active
├─ Decrement timer
├─ Increase alert frequency (every 15 seconds)
├─ Update UI elements
└─ Check for game end condition (0:00)

Alert Loop (per alert):
├─ Countdown timer (1000ms intervals)
├─ Check if time expired
└─ Apply timeout penalty if unresolved
```

### Data Structure
```javascript
Alert Object:
{
  id: unique_identifier,
  type: alert_name,
  icon: emoji,
  priority: critical|high|medium|low,
  description: text,
  impact: {service, satisfaction, inventory, efficiency, cost, revenue},
  timeLimit: seconds_remaining,
  resolved: boolean,
  created: timestamp
}

KPI Object:
{
  serviceLevel: 0-100,
  satisfaction: 0-100,
  inventory: 0-100,
  efficiency: 0-100,
  cost: currency,
  revenue: currency,
  score: integer
}
```

---

## 🌐 Browser Compatibility

| Browser | Version | Compatibility |
|---------|---------|---|
| Chrome | 60+ | ✅ Full Support |
| Firefox | 55+ | ✅ Full Support |
| Safari | 12+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |
| Opera | 47+ | ✅ Full Support |
| IE 11 | 11 | ⚠️ Partial (CSS Grid) |

**Recommended**: Latest versions of Chrome, Firefox, or Safari for best experience

---

## 🎮 Controls

### Keyboard
- **Esc**: Close help/modals
- **Click**: Make decisions, toggle buttons

### Mouse
- **Left Click**: Select actions, open modals
- **Hover**: See tooltips, highlight options

### Touch (Mobile)
- **Tap**: All interactions work on touch devices
- **Swipe**: Scroll through alerts and event log

---

## 🎨 Visual Features

### Color Coding
- 🔵 **Blue/Cyan**: Normal, informational
- 🔴 **Red**: Critical alerts, errors, high cost
- 🟢 **Green**: Success, positive KPIs
- 🟠 **Orange**: Warnings, medium priority
- 🟣 **Purple**: Impact preview

### Animations
- **Slide In**: Alerts smoothly appear
- **Pulse**: Critical alerts pulse urgently
- **Glow**: Hover effects with colored glow
- **Pop**: Modals animate into view

### Dashboard Elements
- Live KPI cards with color-coded status
- Real-time countdown timer
- Animated alert queue
- Event log with timestamps
- Performance grade display
- Statistics grid

---

## 📈 Sample Game Session

**Time: 3:00** - Game starts
- Initial: Service 95%, Satisfaction 88%, Inventory 92%, Cost $2.4M
- 2 alerts appear: "Port Congestion" (High) + "Demand Spike" (Medium)

**Time: 2:45** - First decision
- Resolve Port Congestion with "Expedite Shipment"
- Score +75, Service +12%, Cost +5
- Event: "✅ Port Congestion resolved with Expedite Shipment"

**Time: 2:30** - Alert surge begins
- 4 new alerts appear simultaneously
- Critical: "Truck Breakdown" | High: "Customs Inspection"
- Medium: "Inventory Mismatch" | Low: previous "Demand Spike" (still open)

**Time: 2:00** - Multiple decisions
- "Truck Breakdown": Reroute Trucks (+50 points)
- "Inventory Mismatch": Transfer Inventory (+50 points)
- "Demand Spike" timeout: Escalation penalty (-20 points)

**Time: 1:00** - Final phase
- Alert frequency maximum
- 6 active alerts, limited time
- Must make quick decisions
- Each decision worth 75-100 points

**Time: 0:05** - Final alerts
- Last 2 critical incidents
- Choose fastest solutions regardless of cost
- Final score calculation begins

**Time: 0:00** - Game Over
- Final KPIs calculated
- Grade: A (Score: 425, Avg KPI: 92%)
- Summary: "Good performance with solid decision-making"
- Results: 12 Alerts Resolved, 10 Correct, 2 Wrong (83% accuracy)

---

## 🔧 Customization

### To Modify Game Duration
Find this line in the HTML:
```javascript
const GAME_DURATION = 180; // Change to desired seconds
```

### To Add New Alert Types
Locate `ALERT_TYPES` array and add:
```javascript
{
  name: 'Your Alert Name',
  icon: '🎯',
  priority: 'high',
  baseImpact: { service: -10, cost: 4 }
}
```

### To Adjust KPI Starting Values
Modify the `gameState.kpis` object:
```javascript
kpis: {
  serviceLevel: 95, // Change starting value
  satisfaction: 88,
  // ... etc
}
```

---

## 📞 Tips & Tricks

### Pause Game
Click the **⏸ Pause** button to pause the game and think strategically

### Check Instructions
Click the **❓ Help** button anytime to review rules and strategy

### Monitor Event Log
Watch the **Event Log** on the right to understand decision impacts

### Use Sound Toggle
Click the **🔊** button to enable sound mode (visual indicator only)

---

## 🎓 Learning Outcomes

Playing this simulation teaches:
- ✅ Supply chain incident management
- ✅ Decision-making under time pressure
- ✅ KPI balancing and trade-offs
- ✅ Cost-benefit analysis
- ✅ Risk management
- ✅ Operations leadership

---

## 📝 Performance Metrics Breakdown

### Why These KPIs Matter

**Service Level**: Core business metric - missed deliveries = lost customers

**Customer Satisfaction**: Drives loyalty, retention, and referrals

**Inventory Health**: Too much inventory = wasted capital; too little = stock-outs

**Transport Efficiency**: Direct impact on per-unit delivery cost

**Operating Cost**: Bottom-line profitability; every decision has cost implications

**Revenue Protected**: Value of good decisions; prevents financial losses

---

## 🎯 Winning Strategy Summary

1. **Assess**: Read alert description and impact carefully
2. **Prioritize**: Handle critical first, high second, medium last
3. **Choose**: Pick best-fit action based on incident type
4. **Execute**: Click the action button
5. **React**: Adapt to new alerts that appear
6. **Finish**: Score based on accuracy and KPI maintenance

**Target: A+ Grade** = 500+ points with 95%+ average KPI

---

## 🚀 Ready to Play?

Open `supply_chain_control_tower.html` in your browser and start managing!

**Good luck, Head of Operations!** ⚙️🎮

---

*AI Supply Chain Control Tower - Professional Operations Simulation*  
*One file. No dependencies. 100% offline.*  
Version 1.0 | © 2024