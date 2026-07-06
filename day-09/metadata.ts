<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NutriScope - Premium Personal Nutrition Engine</title>
  
  <!-- Font Integrations -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Space Grotesk', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          boxShadow: {
            'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
          }
        }
      }
    }
  </script>

  <style>
    body {
      background-color: #020617;
      color: #f8fafc;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    
    .glass-card {
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(51, 65, 85, 0.5);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #020617;
    }
    ::-webkit-scrollbar-thumb {
      background: #1e293b;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #334155;
    }
  </style>
</head>
<body class="min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-slate-900 pb-16">

  <!-- Sticky Header Navigation -->
  <header class="sticky top-0 z-50 w-full glass-card border-b border-slate-800/80 shadow-lg px-4 lg:px-8 py-4 mb-8">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-xl shadow-md shadow-cyan-500/20">
          <i data-lucide="activity" class="w-6 h-6 text-white"></i>
        </div>
        <div>
          <h1 class="text-2xl font-bold font-display bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">NutriScope</h1>
          <p class="text-xs text-slate-400 font-mono tracking-wider uppercase">SaaS Nutrition Engine</p>
        </div>
      </div>
      
      <!-- Nav Tabs -->
      <nav class="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-800/50">
        <button onclick="switchTab('dashboard')" id="btn-tab-dashboard" class="px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 bg-slate-800 text-cyan-400 shadow-sm flex items-center gap-1.5">
          <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i> Dashboard
        </button>
        <button onclick="switchTab('profile')" id="btn-tab-profile" class="px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-200 flex items-center gap-1.5">
          <i data-lucide="user" class="w-3.5 h-3.5"></i> Profile
        </button>
        <button onclick="switchTab('database')" id="btn-tab-database" class="px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 text-slate-400 hover:text-slate-200 flex items-center gap-1.5">
          <i data-lucide="database" class="w-3.5 h-3.5"></i> Food Directory
        </button>
      </nav>

      <div class="flex items-center gap-3">
        <span class="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20 flex items-center gap-1.5 font-mono">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Standalone Engine
        </span>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- ================= DASHBOARD TAB ================= -->
    <section id="tab-dashboard" class="space-y-8">
      
      <!-- Upper Section: Metrics Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Calories Card -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800/60 shadow-xl flex flex-col justify-between relative overflow-hidden group col-span-1 lg:col-span-2">
          <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-300"></div>
          <div>
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs text-slate-400 font-mono tracking-wider uppercase">Energy Target</span>
              <span class="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg"><i data-lucide="zap" class="w-4 h-4"></i></span>
            </div>
            <div class="flex items-baseline gap-2 mt-1">
              <span id="metric-cal-logged" class="text-3xl font-bold font-mono text-white">0</span>
              <span class="text-slate-400 text-sm">/</span>
              <span id="metric-cal-target" class="text-slate-400 text-sm font-mono">2,000 kcal</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
              <span>Energy Completion</span>
              <span id="metric-cal-pct" class="text-cyan-400 font-semibold">0%</span>
            </div>
            <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/60">
              <div id="bar-cal-pct" class="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <!-- Protein Card -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800/60 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all duration-300"></div>
          <div>
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs text-slate-400 font-mono tracking-wider uppercase">Protein</span>
              <span class="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg"><i data-lucide="biceps-flexed" class="w-4 h-4"></i></span>
            </div>
            <div class="flex items-baseline gap-1.5 mt-1">
              <span id="metric-prot-logged" class="text-2xl font-bold font-mono text-white">0g</span>
              <span class="text-slate-500 text-xs">/</span>
              <span id="metric-prot-target" class="text-slate-400 text-xs font-mono">120g</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between text-xs text-slate-400 mb-1 font-mono">
              <span>Macro Target</span>
              <span id="metric-prot-pct" class="text-purple-400">0%</span>
            </div>
            <div class="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div id="bar-prot-pct" class="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <!-- Carbs Card -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800/60 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all duration-300"></div>
          <div>
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs text-slate-400 font-mono tracking-wider uppercase">Carbohydrates</span>
              <span class="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg"><i data-lucide="wheat" class="w-4 h-4"></i></span>
            </div>
            <div class="flex items-baseline gap-1.5 mt-1">
              <span id="metric-carb-logged" class="text-2xl font-bold font-mono text-white">0g</span>
              <span class="text-slate-500 text-xs">/</span>
              <span id="metric-carb-target" class="text-slate-400 text-xs font-mono">250g</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between text-xs text-slate-400 mb-1 font-mono">
              <span>Macro Target</span>
              <span id="metric-carb-pct" class="text-amber-400">0%</span>
            </div>
            <div class="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div id="bar-carb-pct" class="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <!-- Fat Card -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800/60 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/15 transition-all duration-300"></div>
          <div>
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs text-slate-400 font-mono tracking-wider uppercase">Lipid / Fat</span>
              <span class="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg"><i data-lucide="droplet" class="w-4 h-4"></i></span>
            </div>
            <div class="flex items-baseline gap-1.5 mt-1">
              <span id="metric-fat-logged" class="text-2xl font-bold font-mono text-white">0g</span>
              <span class="text-slate-500 text-xs">/</span>
              <span id="metric-fat-target" class="text-slate-400 text-xs font-mono">60g</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between text-xs text-slate-400 mb-1 font-mono">
              <span>Macro Target</span>
              <span id="metric-fat-pct" class="text-rose-400">0%</span>
            </div>
            <div class="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <div id="bar-fat-pct" class="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Operational Dashboard: Split Left/Right -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- LEFT 2 COLS: Logger, Tables & Charts -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Chart Panel Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Pie Chart Card -->
            <div class="glass-card p-6 rounded-2xl border border-slate-800/60 shadow-2xl relative overflow-hidden">
              <h3 class="text-md font-semibold font-display mb-4 flex items-center gap-2">
                <i data-lucide="pie-chart" class="w-4 h-4 text-cyan-400"></i> Macro Calorie Distribution
              </h3>
              <div class="h-64 flex items-center justify-center relative">
                <canvas id="chart-macros" class="max-h-full"></canvas>
                <div id="no-chart-data" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center text-center p-4">
                  <i data-lucide="utensils" class="w-10 h-10 text-slate-600 mb-2"></i>
                  <p class="text-sm text-slate-400">No food logged yet today</p>
                  <p class="text-xs text-slate-500 mt-1">Add items below to calculate distribution</p>
                </div>
              </div>
            </div>

            <!-- Bar Chart Card (Micronutrients) -->
            <div class="glass-card p-6 rounded-2xl border border-slate-800/60 shadow-2xl">
              <h3 class="text-md font-semibold font-display mb-4 flex items-center gap-2">
                <i data-lucide="bar-chart-3" class="w-4 h-4 text-emerald-400"></i> Micronutrient Completion
              </h3>
              <div class="space-y-4" id="micros-list-container">
                <!-- Will be dynamically populated -->
              </div>
            </div>
          </div>

          <!-- Food Logger Form Card -->
          <div class="glass-card p-6 rounded-2xl border border-slate-800/60 shadow-2xl relative">
            <h3 class="text-lg font-semibold font-display mb-4 flex items-center gap-2" id="logger-form-title">
              <i data-lucide="plus-circle" class="w-5 h-5 text-cyan-400"></i> Log Food Item
            </h3>
            
            <form id="logger-form" onsubmit="handleLogSubmit(event)" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <input type="hidden" id="edit-log-id" value="">
              
              <div class="md:col-span-2">
                <label for="logger-food-select" class="block text-xs text-slate-400 font-mono uppercase mb-2">Select Food</label>
                <select id="logger-food-select" onchange="updateServingHelperText()" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors">
                  <!-- Seeded dynamically -->
                </select>
              </div>

              <div>
                <label for="logger-qty" class="block text-xs text-slate-400 font-mono uppercase mb-2">Quantity</label>
                <input type="number" id="logger-qty" step="any" min="0.1" required class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono transition-colors">
              </div>

              <div>
                <label for="logger-unit" class="block text-xs text-slate-400 font-mono uppercase mb-2">Unit</label>
                <select id="logger-unit" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors">
                  <option value="servings" id="unit-option-servings">Servings (Pieces)</option>
                  <option value="g">Grams (g)</option>
                </select>
              </div>

              <div class="md:col-span-4 flex justify-between items-center mt-2 border-t border-slate-800/40 pt-4">
                <span id="logger-serving-helper" class="text-xs text-slate-400 italic"></span>
                <div class="flex gap-2">
                  <button type="button" onclick="cancelLoggerEdit()" id="btn-cancel-edit" class="hidden px-4 py-2 text-xs font-semibold rounded-xl border border-slate-800 hover:bg-slate-900 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" id="btn-submit-log" class="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-200 flex items-center gap-1.5">
                    <i data-lucide="check" class="w-4 h-4"></i> Add to Log
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Logged Foods Table Card -->
          <div class="glass-card rounded-2xl border border-slate-800/60 shadow-2xl overflow-hidden">
            <div class="px-6 py-5 border-b border-slate-800/40 flex justify-between items-center bg-slate-900/30">
              <h3 class="text-md font-semibold font-display flex items-center gap-2">
                <i data-lucide="clipboard-list" class="w-4 h-4 text-cyan-400"></i> Today's Food Journal
              </h3>
              <span id="logged-count-badge" class="bg-slate-950 border border-slate-800 text-slate-400 px-2.5 py-1 rounded-full text-[10px] font-mono">0 Items logged</span>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800/50 bg-slate-950/40 text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                    <th class="py-3 px-6">Food</th>
                    <th class="py-3 px-6 text-right">Qty</th>
                    <th class="py-3 px-6 text-right">Calories</th>
                    <th class="py-3 px-6 text-right">Protein</th>
                    <th class="py-3 px-6 text-right">Carbs</th>
                    <th class="py-3 px-6 text-right">Fat</th>
                    <th class="py-3 px-6 text-right">Fiber</th>
                    <th class="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody id="logs-table-body" class="divide-y divide-slate-800/30 text-sm">
                  <!-- Injected dynamically -->
                </tbody>
              </table>
              <div id="no-logs-alert" class="hidden p-8 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                <i data-lucide="calendar-days" class="w-8 h-8 text-slate-700"></i>
                <p class="text-sm">No food logs registered today.</p>
                <p class="text-xs text-slate-600">Select a pre-seeded food above to initialize your calorie tracker.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT 1 COL: Smart Recommendations & Deficiencies -->
        <div class="space-y-8">
          
          <!-- Deficiencies & Excesses Card -->
          <div class="glass-card p-6 rounded-2xl border border-slate-800/60 shadow-2xl relative overflow-hidden">
            <div class="absolute right-0 top-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl"></div>
            <h3 class="text-md font-semibold font-display mb-4 flex items-center gap-2 border-b border-slate-800/40 pb-3">
              <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-500"></i> Nutritional Telemetry
            </h3>
            
            <div class="space-y-6">
              <div>
                <span class="text-xs text-slate-400 font-mono uppercase tracking-wider block mb-2.5">Top 3 Deficiencies</span>
                <div id="list-deficiencies" class="space-y-2">
                  <!-- Dynamic -->
                </div>
              </div>
              
              <div>
                <span class="text-xs text-slate-400 font-mono uppercase tracking-wider block mb-2.5">Top 3 Excesses</span>
                <div id="list-excesses" class="space-y-2">
                  <!-- Dynamic -->
                </div>
              </div>
            </div>
          </div>

          <!-- Smart Recommendations Card -->
          <div class="glass-card p-6 rounded-2xl border border-slate-800/60 shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/80">
            <div class="absolute -right-12 -top-12 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>
            <h3 class="text-md font-semibold font-display mb-4 flex items-center gap-2 border-b border-slate-800/40 pb-3">
              <i data-lucide="sparkles" class="w-4 h-4 text-cyan-400"></i> Smart Engine Analysis
            </h3>
            
            <div class="space-y-4">
              <!-- Foods to Add -->
              <div cl
