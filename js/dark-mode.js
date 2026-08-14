// =====================================================
// TECHIE-TORNADOES
// Dark Mode Toggle & Persistence
// =====================================================

(function () {
    const THEME_KEY = "techie_theme";

    // Immediate theme apply to prevent FOUC (Flash of Unstyled Content)
    function applySavedTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.body.classList.add("dark-mode");
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            document.documentElement.setAttribute("data-theme", "light");
        }
    }

    // Apply theme as soon as DOM is interactive
    if (document.body) {
        applySavedTheme();
    } else {
        document.addEventListener("DOMContentLoaded", applySavedTheme);
    }

    document.addEventListener("DOMContentLoaded", () => {
        setupDarkModeToggle();
    });

    function setupDarkModeToggle() {
        const toggleButtons = document.querySelectorAll(".dark-mode-toggle, #themeToggle");

        toggleButtons.forEach((btn) => {
            updateButtonIcon(btn);
            btn.addEventListener("click", () => {
                const isDark = document.body.classList.toggle("dark-mode");
                const newTheme = isDark ? "dark" : "light";
                document.documentElement.setAttribute("data-theme", newTheme);
                localStorage.setItem(THEME_KEY, newTheme);

                // Update all toggles on page
                document.querySelectorAll(".dark-mode-toggle, #themeToggle").forEach(updateButtonIcon);
            });
        });
    }

    function updateButtonIcon(btn) {
        if (!btn) return;
        const isDark = document.body.classList.contains("dark-mode");
        const iconSpan = btn.querySelector(".theme-icon") || btn;
        
        if (isDark) {
            btn.setAttribute("aria-label", "Switch to light mode");
            btn.setAttribute("title", "Switch to light mode");
            if (iconSpan !== btn) {
                iconSpan.textContent = "☀️";
            } else {
                btn.innerHTML = `<span>☀️</span> Light`;
            }
        } else {
            btn.setAttribute("aria-label", "Switch to dark mode");
            btn.setAttribute("title", "Switch to dark mode");
            if (iconSpan !== btn) {
                iconSpan.textContent = "🌙";
            } else {
                btn.innerHTML = `<span>🌙</span> Dark`;
            }
        }
    }

    window.TechieDarkMode = {
        toggle: () => {
            const btn = document.querySelector(".dark-mode-toggle, #themeToggle");
            if (btn) btn.click();
        }
    };
})();
