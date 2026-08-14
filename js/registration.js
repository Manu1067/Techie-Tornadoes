// =====================================================
// TECHIE-TORNADOES
// REGISTRATION FORM HANDLER
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

    /**
     * Populate Event Select Dropdown from TechFestEvents dataset
     */
    function populateEventDropdown() {
        if (!eventSelect) return;

        // Obtain events list from window.TechFestEvents or fallback list
        const eventsList = (window.TechFestEvents && window.TechFestEvents.events) ?
            window.TechFestEvents.events : [
                { name: "CodeSprint 2026" },
                { name: "RoboWars 2026" },
                { name: "CyberShield" },
                { name: "InnovateX" },
                { name: "TechTalks 2026" },
                { name: "CloudCraft" }
            ];

        // Keep initial default option
        eventSelect.innerHTML = `<option value="" disabled selected>Select an event</option>`;

        eventsList.forEach((evt) => {
            const option = document.createElement("option");
            option.value = evt.name;
            option.textContent = evt.name + (evt.categoryName ? ` (${evt.categoryName})` : "");
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

            const match = options.find((opt) => opt.value.toLowerCase().includes(decodedParam) || decodedParam.includes(opt.value.toLowerCase()));

            if (match) {
                eventSelect.value = match.value;
            }
        }
    }

    /**
     * Handle Form Submission with Validation and LocalStorage Save
     */
    function handleFormSubmission(event) {
        event.preventDefault();

        // Retrieve field values
        const fullName = document.getElementById("fullName") ? document.getElementById("fullName").value.trim() : "";
        const email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
        const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
        const college = document.getElementById("college") ? document.getElementById("college").value.trim() : "";
        const year = document.getElementById("year") ? document.getElementById("year").value : "";
        const branch = document.getElementById("branch") ? document.getElementById("branch").value : "";
        const eventChoice = eventSelect ? eventSelect.value : "";
        const password = document.getElementById("password") ? document.getElementById("password").value : "";
        const confirmPassword = document.getElementById("confirmPassword") ? document.getElementById("confirmPassword").value : "";
        const terms = document.getElementById("terms") ? document.getElementById("terms").checked : false;

        // Clear previous message
        hideMessage();

        // Validation pipeline
        if (!fullName) {
            return showError("Please enter your full name.");
        }

        if (!email) {
            return showError("Please enter your email address.");
        }

        if (!validateEmail(email)) {
            return showError("Please enter a valid email address.");
        }

        if (window.TechieStorage && window.TechieStorage.isDuplicateEmail(email)) {
            return showError("This email address is already registered.");
        }

        if (!phone) {
            return showError("Please enter your phone number.");
        }

        if (!validatePhone(phone)) {
            return showError("Please enter a valid 10-digit mobile number.");
        }

        if (!college) {
            return showError("Please enter your college or organization.");
        }

        if (!year) {
            return showError("Please select your year of study.");
        }

        if (!branch) {
            return showError("Please select your branch or department.");
        }

        if (!eventChoice) {
            return showError("Please select an event to register for.");
        }

        if (!password) {
            return showError("Please create a password.");
        }

        if (password.length < 6) {
            return showError("Password must contain at least 6 characters.");
        }

        if (!confirmPassword) {
            return showError("Please confirm your password.");
        }

        if (password !== confirmPassword) {
            return showError("Passwords do not match. Please re-enter.");
        }

        if (!terms) {
            return showError("Please accept the Terms & Conditions and Privacy Policy.");
        }

        // Generate ID
        const regId = window.TechieStorage ?
            window.TechieStorage.generateRegistrationId() :
            `TT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

        // Build registration record (strictly exclude passwords)
        const registrationData = {
            id: regId,
            fullName: fullName,
            email: email,
            phone: phone,
            college: college,
            year: year,
            branch: branch,
            event: eventChoice,
            registeredAt: new Date().toLocaleString()
        };

        // Save to LocalStorage
        if (window.TechieStorage) {
            window.TechieStorage.saveRegistration(registrationData);
        } else {
            let list = JSON.parse(localStorage.getItem("techieTornadoesRegistrations")) || [];
            list.push(registrationData);
            localStorage.setItem("techieTornadoesRegistrations", JSON.stringify(list));
        }

        // Show Success View
        showSuccess(`🎉 Registration Successful! Your Registration ID is: ${regId}`);

        // Reset form
        registrationForm.reset();

        // Scroll to success message
        if (formMessage) {
            formMessage.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    // --- Validation Utilities ---
    function validateEmail(emailStr) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
    }

    function validatePhone(phoneStr) {
        return /^[0-9]{10}$/.test(phoneStr.replace(/[- ]/g, ""));
    }

    // --- UI Messaging ---
    function showError(msg) {
        if (!formMessage) return;
        formMessage.innerHTML = `<strong>⚠️ Error:</strong> ${msg}`;
        formMessage.className = "form-message show error";
    }

    function showSuccess(msg) {
        if (!formMessage) return;
        formMessage.innerHTML = `<strong>Success!</strong> ${msg}`;
        formMessage.className = "form-message show success";
    }

    function hideMessage() {
        if (!formMessage) return;
        formMessage.textContent = "";
        formMessage.className = "form-message";
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
                } else {
                    passwordInput.type = "password";
                    button.textContent = "👁️";
                    button.setAttribute("aria-label", "Show password");
                }
            });
        });
    }
});