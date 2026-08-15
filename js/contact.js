// =====================================================
// TECHIE-TORNADOES
// CONTACT FORM & FAQ HANDLER
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("contactFormMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", handleContactSubmit);
    }

    setupFaqAccordion();

    function handleContactSubmit(event) {
        event.preventDefault();
        hideMessage();

        const nameInput = document.getElementById("contactName");
        const emailInput = document.getElementById("contactEmail");
        const messageInput = document.getElementById("contactMessage");

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const message = messageInput ? messageInput.value.trim() : "";

        if (!name || name.length < 2) {
            return showError("Please enter your name (minimum 2 characters).", nameInput);
        }

        if (!email) {
            return showError("Please enter your email address.", emailInput);
        }

        if (!validateEmail(email)) {
            return showError("Please enter a valid email address.", emailInput);
        }

        if (!message || message.length < 10) {
            return showError("Please enter a message (minimum 10 characters).", messageInput);
        }

        showSuccess("Thank you! Your message has been received. We'll get back to you within 24–48 hours.");
        contactForm.reset();
    }

    function validateEmail(emailStr) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailStr);
    }

    function showError(msg, focusEl) {
        if (!formMessage) return;
        formMessage.innerHTML = `
            <div class="msg-content error">
                <span class="msg-icon">⚠️</span>
                <div><strong>Error:</strong><p>${msg}</p></div>
            </div>
        `;
        formMessage.className = "form-message show error";
        if (focusEl) focusEl.focus();
    }

    function showSuccess(msg) {
        if (!formMessage) return;
        formMessage.innerHTML = `
            <div class="msg-content success">
                <span class="msg-icon">✅</span>
                <div><strong>Sent!</strong><p>${msg}</p></div>
            </div>
        `;
        formMessage.className = "form-message show success";
    }

    function hideMessage() {
        if (!formMessage) return;
        formMessage.textContent = "";
        formMessage.className = "form-message";
    }

    function setupFaqAccordion() {
        const faqItems = document.querySelectorAll(".faq-item");
        faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question");
            if (!question) return;

            question.addEventListener("click", () => {
                const isOpen = item.classList.contains("open");
                faqItems.forEach((i) => i.classList.remove("open"));
                if (!isOpen) {
                    item.classList.add("open");
                }
            });
        });
    }
});
