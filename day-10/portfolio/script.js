const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) root.dataset.theme = savedTheme;

    document.querySelector(".theme-toggle").addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      localStorage.setItem("theme", next);
    });

    document.getElementById("year").textContent = new Date().getFullYear();

    const glow = document.querySelector(".cursor-glow");
    window.addEventListener("pointermove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = "1";
    });

    const titles = ["AI Engineer", "Software Developer", "GenAI Builder", "Prompt Engineer", "Full Stack Developer"];
    const target = document.getElementById("typewriter");
    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const word = titles[titleIndex];
      target.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
      if (!deleting && charIndex > word.length + 8) deleting = true;
      if (deleting && charIndex < 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
      setTimeout(type, deleting ? 42 : 72);
    }
    type();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        const counter = entry.target.querySelector("[data-count]");
        if (counter && !counter.dataset.done) {
          counter.dataset.done = "true";
          const end = Number(counter.dataset.count);
          const startTime = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - startTime) / 1100, 1);
            counter.textContent = `${Math.floor(progress * end)}+`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.16 });

    document.querySelectorAll(".reveal, .stat").forEach((item) => observer.observe(item));

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
        card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });

    async function loadGitHub() {
      const user = "ayushkumargupta21082005-max";
      const list = document.getElementById("repo-list");
      try {
        const response = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`, {
          headers: { "Accept": "application/vnd.github+json" }
        });
        if (!response.ok) throw new Error("GitHub API unavailable");
        const repos = await response.json();
        const languages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))];
        document.getElementById("repo-count").textContent = `${repos.length} recent repos`;
        document.getElementById("top-language").textContent = languages.slice(0, 3).join(", ") || "Languages unavailable";
        list.innerHTML = repos.slice(0, 5).map((repo) => `
          <a class="repo" href="${repo.html_url}" target="_blank" rel="noreferrer">
            <strong>${repo.name}</strong>
            <p>${repo.description || "Public repository on GitHub."}</p>
            <div class="tags">
              ${repo.language ? `<span class="tag">${repo.language}</span>` : ""}
              <span class="tag">${repo.stargazers_count} stars</span>
            </div>
          </a>
        `).join("");
      } catch (error) {
        document.getElementById("repo-count").textContent = "GitHub profile linked";
        document.getElementById("top-language").textContent = "API unavailable";
        list.innerHTML = `<p class="muted">Could not load repositories from the GitHub API in this browser session. Use the profile button to view public repositories.</p>`;
      }
    }
    loadGitHub();

    document.getElementById("contact-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const message = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
      try {
        await navigator.clipboard.writeText(message);
        document.getElementById("form-note").textContent = "Message draft copied. Send it through LinkedIn or GitHub because no resume-backed email was available.";
      } catch (error) {
        document.getElementById("form-note").textContent = message;
      }
    });

