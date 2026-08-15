// =====================================================
// TECHIE-TORNADOES
// SOCIAL OAUTH SIGNUP & LOGIN SIMULATOR
// Provides interactive Google, LinkedIn, and GitHub authentication
// =====================================================

(function () {
    document.addEventListener("DOMContentLoaded", () => {
        setupSocialAuth();
    });

    function setupSocialAuth() {
        const socialButtons = document.querySelectorAll(
            ".social-register button, .social-register .social-btn, [data-provider]"
        );

        socialButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                let provider = btn.getAttribute("data-provider");

                if (!provider) {
                    const text = btn.textContent.trim();
                    if (text.includes("Google") || text.includes("G ")) provider = "Google";
                    else if (text.includes("LinkedIn") || text.includes("in ")) provider = "LinkedIn";
                    else if (text.includes("GitHub")) provider = "GitHub";
                    else provider = "Google";
                }

                // TODO: integrate OAuth provider
                console.log(`[OAuth Simulator] Initiating sign-in with ${provider}`);

                openSocialAuthModal(provider);
            });
        });
    }

    function openSocialAuthModal(provider) {
        // Remove existing modal if any
        const existing = document.getElementById("socialAuthModal");
        if (existing) existing.remove();

        const isRegistrationPage = window.location.pathname.includes("registration.html");
        const eventSelect = document.getElementById("event");
        const selectedEvent = eventSelect && eventSelect.value ? eventSelect.value : "CodeSprint 2026";

        // Provider styling & icons
        const providerConfig = {
            Google: {
                svg: `<svg width="22" height="22" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`,
                brandColor: "#4285f4",
                name: "Google Account",
                officialUrl: "https://accounts.google.com/",
                accounts: [
                    { name: "Alex Mercer", email: "alex.mercer@gmail.com", college: "IIT Bombay" },
                    { name: "Priya Sharma", email: "priya.sharma@gmail.com", college: "COEP Pune" }
                ]
            },
            LinkedIn: {
                svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>`,
                brandColor: "#0a66c2",
                name: "LinkedIn Profile",
                officialUrl: "https://www.linkedin.com/login",
                accounts: [
                    { name: "Rahul Verma", email: "rahul.verma@linkedin.com", college: "BITS Pilani" },
                    { name: "Ananya Roy", email: "ananya.roy@linkedin.com", college: "DTU Delhi" }
                ]
            },
            GitHub: {
                svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`,
                brandColor: "#24292e",
                name: "GitHub Account",
                officialUrl: "https://github.com/login",
                accounts: [
                    { name: "DevNinja (Karan)", email: "karan.dev@github.com", college: "VJTI Mumbai" },
                    { name: "CodeCraft (Sneha)", email: "sneha.code@github.com", college: "NIT Surathkal" }
                ]
            }
        };

        const config = providerConfig[provider] || providerConfig.Google;

        // Automatically open official provider portal in new window
        window.open(config.officialUrl, "_blank", "noopener");

        // Build Modal Element
        const modal = document.createElement("div");
        modal.id = "socialAuthModal";
        modal.className = "social-auth-modal";
        modal.innerHTML = `
            <div class="social-modal-backdrop"></div>
            <div class="social-modal-dialog">
                <div class="social-modal-header" style="border-top: 4px solid ${config.brandColor}">
                    <div class="provider-badge" style="background:${config.provider === 'Google' ? '#ffffff' : config.brandColor}">
                        ${config.svg}
                    </div>
                    <div>
                        <h3>Sign in with ${provider}</h3>
                        <p>Opened official ${config.name} portal in new tab</p>
                    </div>
                    <button type="button" class="social-close-btn" aria-label="Close">&times;</button>
                </div>

                <div class="social-modal-body">
                    <div class="official-link-banner" style="background: ${config.brandColor}15; border: 1px solid ${config.brandColor}40; padding: 12px; border-radius: 8px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                        <span style="font-size: 12px; color: var(--navy); font-weight: 600;">🔗 Opened Official ${provider} Sign-In</span>
                        <a href="${config.officialUrl}" target="_blank" rel="noopener" style="background: ${config.brandColor}; color: white; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; text-decoration: none;">Launch Site ↗</a>
                    </div>

                    <p class="section-title">Select profile to complete event registration:</p>

                    <div class="account-options-list">
                        ${config.accounts.map((acc, index) => `
                            <label class="account-option-item ${index === 0 ? 'selected' : ''}">
                                <input type="radio" name="socialAcc" value="${index}" ${index === 0 ? 'checked' : ''}>
                                <div class="acc-avatar">${acc.name.charAt(0)}</div>
                                <div class="acc-details">
                                    <strong>${acc.name}</strong>
                                    <span>${acc.email} • ${acc.college}</span>
                                </div>
                            </label>
                        `).join("")}
                    </div>

                    <div class="custom-account-toggle">
                        <button type="button" id="toggleCustomAccBtn">+ Use a different email</button>
                    </div>

                    <div id="customAccForm" class="custom-acc-fields" hidden>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="socialCustomName" placeholder="e.g. Sam Wilson">
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="socialCustomEmail" placeholder="e.g. sam@example.com">
                        </div>
                    </div>

                    ${isRegistrationPage ? `
                        <div class="form-group event-confirm-group" style="margin-top:14px;">
                            <label style="font-weight:700; color:var(--navy); font-size:12px; display:block; margin-bottom:4px;">Registering for Event:</label>
                            <input type="text" value="${selectedEvent}" readonly style="background:#f1f5f9; cursor:not-allowed; padding:8px 12px; border:1px solid #cbd5e1; border-radius:6px; width:100%; font-size:13px; font-weight:700; color:var(--navy);">
                        </div>
                    ` : ''}

                    <div class="auth-permissions">
                        <small>🔒 Verified via ${provider} Official Authentication. A participant pass will be issued instantly.</small>
                    </div>
                </div>

                <div class="social-modal-footer">
                    <button type="button" class="social-cancel-btn">Cancel</button>
                    <button type="button" class="social-confirm-btn" style="background:${config.brandColor}">
                        Confirm & Issue Pass for <span id="confirmNameBtn">${config.accounts[0].name}</span> →
                    </button>

                </div>
            </div>
        `;

        document.body.appendChild(modal);

        document.body.classList.add("modal-open");

        requestAnimationFrame(() => {
            modal.classList.add("active");
        });

        // Interactive Radio Selection
        const radios = modal.querySelectorAll('input[name="socialAcc"]');
        const confirmNameSpan = modal.querySelector("#confirmNameBtn");
        const customToggleBtn = modal.querySelector("#toggleCustomAccBtn");
        const customAccForm = modal.querySelector("#customAccForm");
        const customNameInput = modal.querySelector("#socialCustomName");
        const customEmailInput = modal.querySelector("#socialCustomEmail");

        radios.forEach((radio) => {
            radio.addEventListener("change", (e) => {
                modal.querySelectorAll(".account-option-item").forEach((item) => item.classList.remove("selected"));
                radio.closest(".account-option-item").classList.add("selected");
                const selectedAcc = config.accounts[e.target.value];
                if (selectedAcc && confirmNameSpan) {
                    confirmNameSpan.textContent = selectedAcc.name;
                }
                customAccForm.hidden = true;
            });
        });

        customToggleBtn.addEventListener("click", () => {
            const isHidden = customAccForm.hidden;
            customAccForm.hidden = !isHidden;
            if (!isHidden) {
                const selectedRadio = modal.querySelector('input[name="socialAcc"]:checked');
                if (selectedRadio) {
                    confirmNameSpan.textContent = config.accounts[selectedRadio.value].name;
                }
            } else {
                confirmNameSpan.textContent = "Custom User";
                if (customNameInput) customNameInput.focus();
            }
        });

        if (customNameInput) {
            customNameInput.addEventListener("input", (e) => {
                confirmNameSpan.textContent = e.target.value.trim() || "Custom User";
            });
        }

        // Close Handlers
        const closeBtn = modal.querySelector(".social-close-btn");
        const cancelBtn = modal.querySelector(".social-cancel-btn");
        const backdrop = modal.querySelector(".social-modal-backdrop");

        function closeModal() {
            modal.classList.remove("active");
            document.body.classList.remove("modal-open");
            setTimeout(() => modal.remove(), 250);
        }

        closeBtn.addEventListener("click", closeModal);
        cancelBtn.addEventListener("click", closeModal);
        backdrop.addEventListener("click", closeModal);

        // Confirm Handler
        const confirmBtn = modal.querySelector(".social-confirm-btn");
        confirmBtn.addEventListener("click", () => {
            let finalName = "";
            let finalEmail = "";
            let finalCollege = "Tech University";

            if (!customAccForm.hidden && customEmailInput && customEmailInput.value.trim()) {
                finalName = customNameInput && customNameInput.value.trim() ? customNameInput.value.trim() : "Social Candidate";
                finalEmail = customEmailInput.value.trim();
            } else {
                const selectedRadio = modal.querySelector('input[name="socialAcc"]:checked');
                const selectedAcc = config.accounts[selectedRadio ? selectedRadio.value : 0];
                finalName = selectedAcc.name;
                finalEmail = selectedAcc.email;
                finalCollege = selectedAcc.college;
            }

            // Generate registration / account record
            const regId = window.TechieStorage ?
                window.TechieStorage.generateRegistrationId() :
                `TT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

            const registrationDate = new Date().toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            const socialRegistration = {
                id: regId,
                fullName: finalName,
                email: finalEmail,
                phone: "9876543210",
                college: finalCollege,
                year: "Third Year",
                branch: "Computer Science",
                event: selectedEvent,
                password: `oauth_${provider.toLowerCase()}_verified`,
                registeredAt: registrationDate,
                authProvider: provider
            };

            // Save to LocalStorage
            if (window.TechieStorage) {
                window.TechieStorage.saveRegistration(socialRegistration);
            } else {
                let list = JSON.parse(localStorage.getItem("techieTornadoesRegistrations")) || [];
                list.push(socialRegistration);
                localStorage.setItem("techieTornadoesRegistrations", JSON.stringify(list));
            }

            closeModal();

            // Display Toast feedback
            if (window.showTechieToast) {
                window.showTechieToast(`🎉 ${provider} Authentication Successful! Signed in as ${finalName}`);
            }

            // If on registration form, show rich success ticket!
            const formMessage = document.getElementById("formMessage");
            if (isRegistrationPage && formMessage) {
                formMessage.innerHTML = `
                    <div class="registration-success-badge">
                        <div class="badge-header" style="background: ${config.brandColor}; color: white;">
                            <span class="badge-icon">${config.svg}</span>
                            <div>

                                <h3>Authenticated with ${provider}!</h3>
                                <p>Welcome, ${finalName}! Your registration ticket is active.</p>
                            </div>
                        </div>
                        <div class="ticket-details">
                            <div class="ticket-row">
                                <span class="t-label">Registration ID:</span>
                                <strong class="t-value id-code">${regId}</strong>
                            </div>
                            <div class="ticket-row">
                                <span class="t-label">Candidate Name:</span>
                                <span class="t-value">${finalName}</span>
                            </div>
                            <div class="ticket-row">
                                <span class="t-label">Registered Event:</span>
                                <strong class="t-value event-name">${selectedEvent}</strong>
                            </div>
                            <div class="ticket-row">
                                <span class="t-label">Social Email:</span>
                                <span class="t-value">${finalEmail}</span>
                            </div>
                            <div class="ticket-row">
                                <span class="t-label">Auth Provider:</span>
                                <span class="t-value">Verified via ${provider} OAuth</span>
                            </div>
                        </div>
                        <div class="badge-footer">
                            <button type="button" class="action-btn print-btn" onclick="window.print()">🖨️ Print Pass</button>
                            <a href="events.html" class="action-btn link-btn">Explore Events →</a>
                        </div>
                    </div>
                `;
                formMessage.className = "form-message show success";
                formMessage.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (window.location.pathname.includes("login.html")) {
                const loginFormMessage = document.getElementById("formMessage");
                if (loginFormMessage) {
                    loginFormMessage.innerHTML = `
                        <div class="msg-content success">
                            <span class="msg-icon">✅</span>
                            <div>
                                <strong>Logged in via ${provider}!</strong>
                                <p>Welcome back, ${finalName}! Redirecting to Home...</p>
                            </div>
                        </div>
                    `;
                    loginFormMessage.className = "form-message show success";
                }
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);
            }
        });
    }
})();
