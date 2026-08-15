// =====================================================
// TECHIE-TORNADOES
// LOGIN FORM HANDLER
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const formMessage = document.getElementById("formMessage");
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const rememberMeInput = document.getElementById("rememberMe");

    const REMEMBER_KEY = "techie_remember_email";

    setupPasswordToggles();
    prefillRememberedEmail();
    setupSocialButtons();

    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }

    [emailInput, passwordInput].forEach((input) => {
        if (!input) return;
        input.addEventListener("input", () => {
            if (formMessage && formMessage.classList.contains("error")) {
                hideMessage();
            }
        });
    });

    function prefillRememberedEmail() {
        if (!emailInput) return;
        try {
            const savedEmail = localStorage.getItem(REMEMBER_KEY);
            if (savedEmail) {
                emailInput.value = savedEmail;
                if (rememberMeInput) rememberMeInput.checked = true;
            }
        } catch (err) {
            console.error("Could not read remembered email:", err);
        }
    }

    function handleLoginSubmit(event) {
        event.preventDefault();
        hideMessage();

        const email = emailInput ? emailInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value : "";

        if (!email) {
            return showError("Please enter your email address.", emailInput);
        }

        if (!validateEmail(email)) {
            return showError("Please enter a valid email address (e.g., student@example.com).", emailInput);
        }

        if (!password) {
            return showError("Please enter your password.", passwordInput);
        }

        const account = findAccountByEmail(email);

        if (!account) {
            return showError("No matching account found. Please register first or check your email.", emailInput);
        }

        if (!account.password || account.password !== password) {
            return showError("Wrong password. Please try again or reset via registration.", passwordInput);
        }

        if (rememberMeInput && rememberMeInput.checked) {
            localStorage.setItem(REMEMBER_KEY, email);
        } else {
            localStorage.removeItem(REMEMBER_KEY);
        }

        // Save session without password
        if (window.TechieStorage && window.TechieStorage.setCurrentUser) {
            window.TechieStorage.setCurrentUser(account);
        }

        // Update header state immediately
        if (window.updateHeaderAuthState) {
            window.updateHeaderAuthState();
        }

        showSuccess(`Welcome back, ${account.fullName || "member"}! Redirecting to home...`);

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    }

    function findAccountByEmail(email) {
        const cleanEmail = email.trim().toLowerCase();

        // 1. Check Accounts list first
        if (window.TechieStorage && window.TechieStorage.getAccounts) {
            const accounts = window.TechieStorage.getAccounts();
            const accMatch = accounts.find((a) => (a.email || "").trim().toLowerCase() === cleanEmail);
            if (accMatch) return accMatch;
        }

        // 2. Check Registrations list
        let registrations = [];
        if (window.TechieStorage && window.TechieStorage.getRegistrations) {
            registrations = window.TechieStorage.getRegistrations();
        } else {
            try {
                registrations = JSON.parse(localStorage.getItem("techieTornadoesRegistrations")) || [];
            } catch (err) {
                registrations = [];
            }
        }

        const matches = registrations.filter(
            (item) => item.email && item.email.trim().toLowerCase() === cleanEmail
        );

        return matches.length > 0 ? matches[matches.length - 1] : null;
    }

    function validateEmail(emailStr) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailStr);
    }

    function showError(msg, focusEl) {
        if (!formMessage) return;
        formMessage.innerHTML = `
            <div class="msg-content error">
                <span class="msg-icon">⚠️</span>
                <div>
                    <strong>Login Failed:</strong>
                    <p>${msg}</p>
                </div>
            </div>
        `;
        formMessage.className = "form-message show error";

        if (focusEl && typeof focusEl.focus === "function") {
            focusEl.focus();
            focusEl.classList.add("input-error");
            setTimeout(() => focusEl.classList.remove("input-error"), 3000);
        }
    }

    function showSuccess(msg) {
        if (!formMessage) return;
        formMessage.innerHTML = `
            <div class="msg-content success">
                <span class="msg-icon">✅</span>
                <div>
                    <strong>Login Successful!</strong>
                    <p>${msg}</p>
                </div>
            </div>
        `;
        formMessage.className = "form-message show success";
    }

    function hideMessage() {
        if (!formMessage) return;
        formMessage.textContent = "";
        formMessage.className = "form-message";
    }

    function setupPasswordToggles() {
        const passwordToggles = document.querySelectorAll(".password-toggle");
        passwordToggles.forEach(function (button) {
            button.addEventListener("click", function () {
                const targetId = button.getAttribute("data-target");
                const input = document.getElementById(targetId);
                if (!input) return;

                if (input.type === "password") {
                    input.type = "text";
                    button.textContent = "🙈";
                    button.setAttribute("aria-label", "Hide password");
                } else {
                    input.type = "password";
                    button.textContent = "👁️";
                    button.setAttribute("aria-label", "Show password");
                }
            });
        });
    }

    function setupSocialButtons() {
        const socialButtons = document.querySelectorAll(".social-register .social-btn, .social-register button[data-provider]");
        socialButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const provider = btn.getAttribute("data-provider") || btn.textContent.trim();
                // TODO: integrate OAuth provider
                console.log(provider);
                if (window.showTechieToast) {
                    window.showTechieToast(`${provider} sign-in coming soon`);
                }
            });
        });
    }
});
