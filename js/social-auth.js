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
                icon: "🌐",
                brandColor: "#4285f4",
                name: "Google Account",
                accounts: [
                    { name: "Alex Mercer", email: "alex.mercer@gmail.com", college: "IIT Bombay" },
                    { name: "Priya Sharma", email: "priya.sharma@gmail.com", college: "COEP Pune" }
                ]
            },
            LinkedIn: {
                icon: "💼",
                brandColor: "#0a66c2",
                name: "LinkedIn Profile",
                accounts: [
                    { name: "Rahul Verma", email: "rahul.verma@linkedin.com", college: "BITS Pilani" },
                    { name: "Ananya Roy", email: "ananya.roy@linkedin.com", college: "DTU Delhi" }
                ]
            },
            GitHub: {
                icon: "🐙",
                brandColor: "#24292e",
                name: "GitHub Account",
                accounts: [
                    { name: "DevNinja (Karan)", email: "karan.dev@github.com", college: "VJTI Mumbai" },
                    { name: "CodeCraft (Sneha)", email: "sneha.code@github.com", college: "NIT Surathkal" }
                ]
            }
        };

        const config = providerConfig[provider] || providerConfig.Google;

        // Build Modal Element
        const modal = document.createElement("div");
        modal.id = "socialAuthModal";
        modal.className = "social-auth-modal";
        modal.innerHTML = `
            <div class="social-modal-backdrop"></div>
            <div class="social-modal-dialog">
                <div class="social-modal-header" style="border-top: 4px solid ${config.brandColor}">
                    <div class="provider-badge" style="background:${config.brandColor}">
                        <span>${config.icon}</span>
                    </div>
                    <div>
                        <h3>Sign in with ${provider}</h3>
                        <p>Techie-Tornadoes 2026 is requesting profile access</p>
                    </div>
                    <button type="button" class="social-close-btn" aria-label="Close">&times;</button>
                </div>

                <div class="social-modal-body">
                    <p class="section-title">Choose an account to continue:</p>

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
                        <small>🔒 By continuing, Techie-Tornadoes will create a verified participant profile with your email & name. No password required.</small>
                    </div>
                </div>

                <div class="social-modal-footer">
                    <button type="button" class="social-cancel-btn">Cancel</button>
                    <button type="button" class="social-confirm-btn" style="background:${config.brandColor}">
                        Continue as <span id="confirmNameBtn">${config.accounts[0].name}</span> →
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
                            <span class="badge-icon">${config.icon}</span>
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
