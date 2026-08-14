// ================= WAIT FOR DOM =================

document.addEventListener("DOMContentLoaded", function () {

    const registrationForm = document.getElementById("registrationForm");
    const formMessage = document.getElementById("formMessage");

    // ================= FORM SUBMISSION =================

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const college = document.getElementById("college").value.trim();
        const year = document.getElementById("year").value;
        const branch = document.getElementById("branch").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terms = document.getElementById("terms").checked;

        // Clear previous message
        formMessage.textContent = "";
        formMessage.className = "form-message";

        // ================= VALIDATION =================

        if (fullName === "") {
            showError("Please enter your full name.");
            return;
        }

        if (email === "") {
            showError("Please enter your email address.");
            return;
        }

        if (!validateEmail(email)) {
            showError("Please enter a valid email address.");
            return;
        }

        if (isDuplicateEmail(email)) {
            showError("This email is already registered.");
            return;
        }

        if (phone === "") {
            showError("Please enter your phone number.");
            return;
        }

        if (!validatePhone(phone)) {
            showError("Please enter a valid 10-digit phone number.");
            return;
        }

        if (college === "") {
            showError("Please enter your college or organization.");
            return;
        }

        if (year === "") {
            showError("Please select your year of study.");
            return;
        }

        if (branch === "") {
            showError("Please select your branch or department.");
            return;
        }

        if (password === "") {
            showError("Please create a password.");
            return;
        }

        if (password.length < 6) {
            showError("Password must contain at least 6 characters.");
            return;
        }

        if (confirmPassword === "") {
            showError("Please confirm your password.");
            return;
        }

        if (password !== confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        if (!terms) {
            showError("Please accept the Terms & Conditions.");
            return;
        }

        // ================= CREATE REGISTRATION =================

        const registration = {
            id: generateRegistrationId(),
            fullName: fullName,
            email: email,
            phone: phone,
            college: college,
            year: year,
            branch: branch,
            registeredAt: new Date().toLocaleString()
        };

        // ================= SAVE TO LOCAL STORAGE =================

        saveRegistration(registration);

        // ================= SUCCESS =================

        showSuccess(
            `Registration successful! Your registration ID is ${registration.id}.`
        );

        // Reset form
        registrationForm.reset();
    });

    // ================= EMAIL VALIDATION =================

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // ================= PHONE VALIDATION =================

    function validatePhone(phone) {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    }

    // ================= DUPLICATE EMAIL CHECK =================

    function isDuplicateEmail(email) {
        const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
        return registrations.some(
            (r) => r.email.toLowerCase() === email.toLowerCase()
        );
    }

    // ================= REGISTRATION ID (GUARANTEED UNIQUE) =================

    function generateRegistrationId() {
        const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
        const existingIds = new Set(registrations.map((r) => r.id));

        let id;
        do {
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            id = `TT-2026-${randomNumber}`;
        } while (existingIds.has(id));

        return id;
    }

    // ================= LOCAL STORAGE =================

    function saveRegistration(registration) {
        let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
        registrations.push(registration);
        localStorage.setItem("registrations", JSON.stringify(registrations));
    }

    // ================= ERROR MESSAGE =================

    function showError(message) {
        formMessage.textContent = message;
        formMessage.classList.add("error");
    }

    // ================= SUCCESS MESSAGE =================

    function showSuccess(message) {
        formMessage.textContent = message;
        formMessage.classList.add("success");
    }

    // ================= PASSWORD TOGGLE (CORRECTED) =================

    const passwordToggles = document.querySelectorAll(".password-toggle");

    passwordToggles.forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-target");
            const passwordInput = document.getElementById(targetId);

            // Guard against missing input
            if (!passwordInput) return;

            // Toggle input type and button text
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                button.textContent = "🙈"; // Hide icon (password visible)
            } else {
                passwordInput.type = "password";
                button.textContent = "👁️"; // Show icon (password hidden)
            }
        });
    });

});