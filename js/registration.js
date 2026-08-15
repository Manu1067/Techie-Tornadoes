// =====================================================
// TECHIE-TORNADOES
// REGISTRATION FORM HANDLER & STATUS CHECKER
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const formMessage = document.getElementById("formMessage");
    const eventSelect = document.getElementById("event");

    // 1. Populate Event Selection Dropdown
    populateEventDropdown();

    // 2. Handle URL Query Parameter for Event Pre-selection (e.g. registration.html?event=CodeSprint)
    handleUrlEventPreselection();

    // 3. Password Toggle Handlers
    setupPasswordToggles();

    // 4. Form Submit Listener
    if (registrationForm) {
        registrationForm.addEventListener("submit", handleFormSubmission);
    }

    // 5. Setup Live Input Validation Feedback
    setupRealtimeValidation();

    // 6. Setup Social Buttons Simulation
    setupSocialButtons();

    // 7. Setup Registration Lookup / Login Modal
    setupLookupModal();

    /**
     * Populate Event Select Dropdown from TechFestEvents dataset
     */
    function populateEventDropdown() {
        if (!eventSelect) return;

        // Obtain events list from window.TechFestEvents or fallback list
        const eventsList = (window.TechFestEvents && window.TechFestEvents.events && window.TechFestEvents.events.length > 0) ?
            window.TechFestEvents.events : [
                { name: "CodeSprint 2026", categoryName: "Coding" },
                { name: "RoboWars 2026", categoryName: "Robotics" },
                { name: "CyberShield", categoryName: "Cyber Security" },
                { name: "InnovateX", categoryName: "Innovation" },
                { name: "TechTalks 2026", categoryName: "Workshop" },
                { name: "CloudCraft", categoryName: "Cloud Computing" },
                { name: "AI Nexus 2026", categoryName: "AI & ML" },
                { name: "IoT Forge 2026", categoryName: "IoT & Hardware" }
            ];

        // Keep initial default option
        eventSelect.innerHTML = `<option value="" disabled selected>Select an event</option>`;

        eventsList.forEach((evt) => {
            const option = document.createElement("option");
            option.value = evt.name;
            option.textContent = `${evt.name}${evt.categoryName ? ` (${evt.categoryName})` : ""}`;
            eventSelect.appendChild(option);
        });
    }

    /**
     * Pre-select event from URL parameter ?event=EventName
     */
    function handleUrlEventPreselection() {
        if (!eventSelect) return;
        const urlParams = new URLSearchParams(window.location.search);
        const eventParam = urlParams.get("event");

        if (eventParam) {
            const decodedParam = decodeURIComponent(eventParam).toLowerCase().trim();
            const options = Array.from(eventSelect.options);

            // Find best matching option
            const match = options.find((opt) => {
                const optVal = opt.value.toLowerCase().trim();
                return optVal === decodedParam || optVal.includes(decodedParam) || decodedParam.includes(optVal);
            });

            if (match) {
                eventSelect.value = match.value;
                eventSelect.classList.add("highlight-field");
                setTimeout(() => eventSelect.classList.remove("highlight-field"), 2000);
            }
        }
    }

    /**
     * Handle Form Submission with Validation and LocalStorage Save
     */
    function handleFormSubmission(event) {
        event.preventDefault();

        // Retrieve field elements
        const nameInput = document.getElementById("fullName");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const collegeInput = document.getElementById("college");
        const yearInput = document.getElementById("year");
        const branchInput = document.getElementById("branch");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const termsInput = document.getElementById("terms");

        const fullName = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const college = collegeInput ? collegeInput.value.trim() : "";
        const year = yearInput ? yearInput.value : "";
        const branch = branchInput ? branchInput.value : "";
        const eventChoice = eventSelect ? eventSelect.value : "";
        const password = passwordInput ? passwordInput.value : "";
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";
        const terms = termsInput ? termsInput.checked : false;

        // Clear previous message
        hideMessage();

        // Validation pipeline
        if (!fullName || fullName.length < 2) {
            return showError("Please enter your full name (minimum 2 characters).", nameInput);
        }

        if (!email) {
            return showError("Please enter your email address.", emailInput);
        }

        if (!validateEmail(email)) {
            return showError("Please enter a valid email address (e.g., student@example.com).", emailInput);
        }

        if (!phone) {
            return showError("Please enter your phone number.", phoneInput);
        }

        const sanitizedPhone = sanitizePhone(phone);
        if (!validatePhone(sanitizedPhone)) {
            return showError("Please enter a valid 10-digit mobile number (e.g., 9876543210 or +91 9876543210).", phoneInput);
        }

        if (!college || college.length < 2) {
            return showError("Please enter your college or organization name.", collegeInput);
        }

        if (!year) {
            return showError("Please select your current year of study.", yearInput);
        }

        if (!branch) {
            return showError("Please select your branch or department.", branchInput);
        }

        if (!eventChoice) {
            return showError("Please select the technical event you wish to register for.", eventSelect);
        }

        // Check if candidate is already registered for this specific event
        if (window.TechieStorage && window.TechieStorage.isDuplicateRegistration(email, eventChoice)) {
            return showError(`You have already registered for "${eventChoice}" with this email (${email}). You can register for a different event or view your status in the lookup tool below.`, emailInput);
        }

        if (!password) {
            return showError("Please create a password for your account.", passwordInput);
        }

        if (password.length < 6) {
            return showError("Password must contain at least 6 characters.", passwordInput);
        }

        if (!confirmPassword) {
            return showError("Please confirm your password.", confirmPasswordInput);
        }

        if (password !== confirmPassword) {
            return showError("Passwords do not match. Please re-type your password.", confirmPasswordInput);
        }

        if (!terms) {
            return showError("Please accept the Terms & Conditions and Privacy Policy to continue.", termsInput);
        }

        // Generate unique registration ID
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

        // Build registration record (password stored locally for demo login)
        const registrationData = {
            id: regId,
            fullName: fullName,
            email: email,
            phone: sanitizedPhone,
            college: college,
            year: year,
            branch: branch,
            event: eventChoice,
            password: password,
            registeredAt: registrationDate
        };

        // Save to LocalStorage
        let saveSuccess = false;
        if (window.TechieStorage) {
            saveSuccess = window.TechieStorage.saveRegistration(registrationData);
        } else {
            try {
                let list = JSON.parse(localStorage.getItem("techieTornadoesRegistrations")) || [];
                list.push(registrationData);
                localStorage.setItem("techieTornadoesRegistrations", JSON.stringify(list));
                saveSuccess = true;
            } catch (err) {
                console.error("Storage error:", err);
            }
        }

        if (saveSuccess) {
            // Render rich success ticket
            showSuccessCard(registrationData);
            // Reset form
            registrationForm.reset();
            // Scroll to success message smoothly
            if (formMessage) {
                formMessage.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else {
            showError("Could not save registration. Please ensure cookies and localStorage are enabled.");
        }
    }

    // --- Validation Utilities ---
    function validateEmail(emailStr) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailStr);
    }

    function sanitizePhone(phoneStr) {
        // Strip country code +91 or leading 0, and non-digits
        let clean = phoneStr.replace(/[^0-9+]/g, "");
        if (clean.startsWith("+91")) clean = clean.substring(3);
        if (clean.startsWith("91") && clean.length === 12) clean = clean.substring(2);
        if (clean.startsWith("0") && clean.length === 11) clean = clean.substring(1);
        return clean.replace(/[^0-9]/g, "");
    }

    function validatePhone(phoneDigits) {
        return /^[6-9][0-9]{9}$/.test(phoneDigits);
    }

    // --- UI Messaging & State ---
    function showError(msg, focusEl = null) {
        if (!formMessage) return;
        formMessage.innerHTML = `
            <div class="msg-content error">
                <span class="msg-icon">⚠️</span>
                <div>
                    <strong>Registration Incomplete:</strong>
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

    function showSuccessCard(data) {
        if (!formMessage) return;
        formMessage.innerHTML = `
            <div class="registration-success-badge">
                <div class="badge-header">
                    <span class="badge-icon">🎉</span>
                    <div>
                        <h3>Registration Confirmed!</h3>
                        <p>Welcome to Techie-Tornadoes 2026. Your event seat is reserved.</p>
                    </div>
                </div>
                <div class="ticket-details">
                    <div class="ticket-row">
                        <span class="t-label">Registration ID:</span>
                        <strong class="t-value id-code">${data.id}</strong>
                    </div>
                    <div class="ticket-row">
                        <span class="t-label">Candidate Name:</span>
                        <span class="t-value">${data.fullName}</span>
                    </div>
                    <div class="ticket-row">
                        <span class="t-label">Registered Event:</span>
                        <strong class="t-value event-name">${data.event}</strong>
                    </div>
                    <div class="ticket-row">
                        <span class="t-label">Email Address:</span>
                        <span class="t-value">${data.email}</span>
                    </div>
                    <div class="ticket-row">
                        <span class="t-label">College:</span>
                        <span class="t-value">${data.college}</span>
                    </div>
                    <div class="ticket-row">
                        <span class="t-label">Date:</span>
                        <span class="t-value">${data.registeredAt}</span>
                    </div>
                </div>
                <div class="badge-footer">
                    <button type="button" class="action-btn print-btn" onclick="window.print()">🖨️ Print Ticket</button>
                    <a href="events.html" class="action-btn link-btn">Browse More Events →</a>
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

    // --- Live Validation Setup ---
    function setupRealtimeValidation() {
        const inputs = document.querySelectorAll("#registrationForm input, #registrationForm select");
        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                if (formMessage && formMessage.classList.contains("error")) {
                    hideMessage();
                }
            });
            input.addEventListener("change", () => {
                if (formMessage && formMessage.classList.contains("error")) {
                    hideMessage();
                }
            });
        });
    }

    // --- Password Visibility Toggle ---
    function setupPasswordToggles() {
        const passwordToggles = document.querySelectorAll(".password-toggle");
        passwordToggles.forEach(function (button) {
            button.addEventListener("click", function () {
                const targetId = button.getAttribute("data-target");
                const passwordInput = document.getElementById(targetId);
                if (!passwordInput) return;

                if (passwordInput.type === "password") {
                    passwordInput.type = "text";
                    button.textContent = "🙈";
                    button.setAttribute("aria-label", "Hide password");
                    button.setAttribute("title", "Hide password");
                } else {
                    passwordInput.type = "password";
                    button.textContent = "👁️";
                    button.setAttribute("aria-label", "Show password");
                    button.setAttribute("title", "Show password");
                }
            });
        });
    }

    // --- Social Buttons Simulation ---
    function setupSocialButtons() {
        const socialButtons = document.querySelectorAll(".social-register .social-btn, .social-register button[data-provider]");
        socialButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const provider = btn.getAttribute("data-provider") || btn.textContent.trim();
                // TODO: integrate OAuth provider
                console.log(provider);
                if (window.showTechieToast) {
                    window.showTechieToast(`${provider} sign-up coming soon`);
                }
            });
        });
    }

    // --- Registration Lookup / Status Check ---
    function setupLookupModal() {
        const lookupBtn = document.getElementById("openLookupBtn") || document.querySelector(".login-cta a");
        if (!lookupBtn) return;

        lookupBtn.addEventListener("click", function (e) {
            e.preventDefault();
            let modal = document.getElementById("lookupModal");
            if (!modal) {
                modal = createLookupModal();
                document.body.appendChild(modal);
            }
            modal.classList.add("active");
            document.body.classList.add("modal-open");
        });
    }

    function createLookupModal() {
        const modal = document.createElement("div");
        modal.id = "lookupModal";
        modal.className = "lookup-modal";
        modal.innerHTML = `
            <div class="lookup-modal-backdrop"></div>
            <div class="lookup-modal-dialog">
                <div class="lookup-modal-header">
                    <h3>🔍 Check Registration Status</h3>
                    <button type="button" class="lookup-close-btn" aria-label="Close modal">&times;</button>
                </div>
                <div class="lookup-modal-body">
                    <p>Enter your Email Address or Registration ID to look up your registered events.</p>
                    <div class="lookup-search-box">
                        <input type="text" id="lookupQuery" placeholder="e.g. yourname@mail.com or TT-2026-1234">
                        <button type="button" id="lookupSubmitBtn">Search</button>
                    </div>
                    <div id="lookupResults" class="lookup-results"></div>
                </div>
            </div>
        `;

        const closeBtn = modal.querySelector(".lookup-close-btn");
        const backdrop = modal.querySelector(".lookup-modal-backdrop");
        const queryInput = modal.querySelector("#lookupQuery");
        const submitBtn = modal.querySelector("#lookupSubmitBtn");
        const resultsBox = modal.querySelector("#lookupResults");

        function closeModal() {
            modal.classList.remove("active");
            document.body.classList.remove("modal-open");
        }

        closeBtn.addEventListener("click", closeModal);
        backdrop.addEventListener("click", closeModal);

        function performLookup() {
            const query = queryInput.value.trim();
            if (!query) {
                resultsBox.innerHTML = `<div class="lookup-empty">Please enter an email address or Registration ID.</div>`;
                return;
            }

            const registrations = window.TechieStorage ? window.TechieStorage.getRegistrations() : [];
            const matches = registrations.filter((r) => {
                return (r.email && r.email.toLowerCase() === query.toLowerCase()) ||
                       (r.id && r.id.toLowerCase() === query.toLowerCase());
            });

            if (matches.length === 0) {
                resultsBox.innerHTML = `
                    <div class="lookup-empty">
                        <p>❌ No registration records found for "<strong>${query}</strong>".</p>
                        <small>Please verify the spelling or complete the registration form.</small>
                    </div>
                `;
            } else {
                resultsBox.innerHTML = `
                    <div class="lookup-success-list">
                        <h4>Found ${matches.length} Registration(s):</h4>
                        ${matches.map((item) => `
                            <div class="lookup-item-card">
                                <div class="l-head">
                                    <span class="l-id">${item.id}</span>
                                    <span class="l-date">${item.registeredAt || "Confirmed"}</span>
                                </div>
                                <div class="l-name"><strong>${item.fullName}</strong></div>
                                <div class="l-event">🎯 Event: <b>${item.event}</b></div>
                                <div class="l-meta">🏫 ${item.college} | ✉ ${item.email}</div>
                            </div>
                        `).join("")}
                    </div>
                `;
            }
        }

        submitBtn.addEventListener("click", performLookup);
        queryInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                performLookup();
            }
        });

        return modal;
    }
});