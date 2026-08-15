// =====================================================
// TECHIE-TORNADOES
// Main Website JavaScript
// Shared global functionality and interactive controllers
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Techie-Tornadoes initialized.");

    initializeNavigation();
    initializeMobileMenu();
    initializeNavbarScrollEffect();
    initializeHighlightGalleries();
    initializeButtonEffects();
    initializeScrollAnimations();
    initializeImageHandling();
    updateCurrentYear();
    initializeToast();
    updateHeaderAuthState();
});

// =====================================================
// 1. NAVIGATION ACTIVE STATE
// =====================================================
function initializeNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("http")) return;

        const linkPage = href.split("/").pop();
        link.classList.remove("active");

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html") ||
            (currentPage === "index.html" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
    });
}

// =====================================================
// 2. MOBILE HAMBURGER MENU
// =====================================================
function initializeMobileMenu() {
    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelector(".nav-links");

    if (!navContainer || document.querySelector(".mobile-menu-toggle")) return;

    // Create hamburger toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "mobile-menu-toggle";
    toggleBtn.setAttribute("aria-label", "Toggle navigation menu");
    toggleBtn.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;

    // Insert toggle button into nav-right-actions (right of login-btn)
    const navRightActions = navContainer.querySelector(".nav-right-actions");
    if (navRightActions) {
        navRightActions.appendChild(toggleBtn);
    } else {
        navContainer.appendChild(toggleBtn);
    }

    toggleBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("mobile-open");
        toggleBtn.classList.toggle("is-active");
        document.body.classList.toggle("menu-open", isOpen);
    });

    // Close mobile menu on clicking any link
    if (navLinks) {
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("mobile-open");
                toggleBtn.classList.remove("is-active");
                document.body.classList.remove("menu-open");
            });
        });
    }
}

// =====================================================
// 3. NAVBAR SCROLL SHADOW & BG
// =====================================================
function initializeNavbarScrollEffect() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });
}

// =====================================================
// 4. HIGHLIGHT EVENT GALLERY SLIDER (with autoplay)
// =====================================================
function initializeHighlightGalleries() {
    const highlightCards = document.querySelectorAll(".highlight-event");
    const AUTOPLAY_DELAY = 4000; // ms between automatic slides

    highlightCards.forEach((card) => {
        const gallery = card.querySelector(".highlight-gallery");
        const mainImage = card.querySelector(".main-event-image");
        const thumbnails = card.querySelectorAll(".event-thumbnails img");
        const prevBtn = card.querySelector(".gallery-prev");
        const nextBtn = card.querySelector(".gallery-next");

        if (!mainImage || thumbnails.length === 0) return;

        let currentIndex = 0;
        let autoplayTimer = null;

        function updateGallery(index) {
            if (index < 0) index = thumbnails.length - 1;
            if (index >= thumbnails.length) index = 0;

            currentIndex = index;
            const selectedThumb = thumbnails[currentIndex];
            if (selectedThumb) {
                mainImage.src = selectedThumb.src;
                thumbnails.forEach((t) => t.classList.remove("active-thumb"));
                selectedThumb.classList.add("active-thumb");
            }
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(() => {
                updateGallery(currentIndex + 1);
            }, AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        // Any manual interaction restarts the autoplay clock
        // so the slide doesn't jump right after the user acts.
        function handleManualChange(index) {
            updateGallery(index);
            startAutoplay();
        }

        thumbnails.forEach((thumb, idx) => {
            thumb.addEventListener("click", () => {
                handleManualChange(idx);
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener("click", (e) => {
                e.preventDefault();
                handleManualChange(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", (e) => {
                e.preventDefault();
                handleManualChange(currentIndex + 1);
            });
        }

        // Pause on hover so people can actually look at a slide,
        // resume when the mouse leaves.
        if (gallery) {
            gallery.addEventListener("mouseenter", stopAutoplay);
            gallery.addEventListener("mouseleave", startAutoplay);
        }

        startAutoplay();
    });
}

// =====================================================
// 5. BUTTON RIPPLE EFFECT
// =====================================================
function initializeButtonEffects() {
    const buttons = document.querySelectorAll(
        ".primary-btn, .secondary-btn, .view-events, .cta-button, .login-btn, .register-button"
    );

    buttons.forEach((button) => {
        button.addEventListener("click", function (event) {
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// =====================================================
// 6. INTERSECTION OBSERVER ANIMATIONS
// =====================================================
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        ".highlight-event, .section-header, .cta-container, .event-row, .registration-card, .scroll-animate, .contact-form-card, .contact-details-card, .faq-section, .legal-content, .about-mission, .page-hero-content"
    );

    // Make all elements visible immediately by default to prevent blank pages
    animatedElements.forEach((el) => {
        el.classList.add("visible");
    });

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.01 }
    );

    animatedElements.forEach((el) => {
        observer.observe(el);
    });
}

// =====================================================
// 7. IMAGE FALLBACK HANDLING
// =====================================================
function initializeImageHandling() {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        img.addEventListener("error", () => {
            img.classList.add("image-error");
        });
    });
}

// =====================================================
// 8. UPDATE FOOTER YEAR
// =====================================================
function updateCurrentYear() {
    const yearElements = document.querySelectorAll("[data-current-year]");
    const currentYear = new Date().getFullYear();
    yearElements.forEach((el) => {
        el.textContent = currentYear;
    });
}

// =====================================================
// 9. NON-BLOCKING TOAST NOTIFICATIONS
// =====================================================
function initializeToast() {
    if (document.getElementById("techieToastContainer")) return;
    const container = document.createElement("div");
    container.id = "techieToastContainer";
    container.className = "techie-toast-container";
    document.body.appendChild(container);
}

window.showTechieToast = function (message, duration = 3000) {
    let container = document.getElementById("techieToastContainer");
    if (!container) {
        initializeToast();
        container = document.getElementById("techieToastContainer");
    }

    const toast = document.createElement("div");
    toast.className = "techie-toast";
    toast.innerHTML = `
        <span class="toast-icon">ℹ️</span>
        <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("toast-show");
    });

    setTimeout(() => {
        toast.classList.remove("toast-show");
        toast.classList.add("toast-hide");
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

// =====================================================
// 10. SOCIAL OAUTH BUTTON HANDLER (Global)
// =====================================================
function initializeSocialButtons() {
    const socialButtons = document.querySelectorAll(
        ".social-register button, .social-register .social-btn, [data-provider]"
    );

    socialButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const provider = btn.getAttribute("data-provider") || btn.textContent.trim().replace(/[^a-zA-Z]/g, "") || "Social";
            
            // TODO: integrate OAuth provider
            console.log(provider);

            if (window.showTechieToast) {
                window.showTechieToast(`🌐 ${provider} sign-in coming soon`);
            }
        });
    });
}

// =====================================================
// 11. POST-LOGIN PROFILE HEADER & DROPDOWN CONTROLLER
// =====================================================
function updateHeaderAuthState() {
    const navRightActions = document.querySelector(".nav-right-actions");
    if (!navRightActions) return;

    const user = window.TechieStorage ? window.TechieStorage.getCurrentUser() : null;

    if (user) {
        const userName = user.fullName || user.name || "User";
        const firstName = userName.split(" ")[0];

        // Create or locate profile wrapper
        let wrapper = navRightActions.querySelector(".profile-btn-wrapper");
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.className = "profile-btn-wrapper";

            const oldLoginBtn = navRightActions.querySelector(".login-btn");
            if (oldLoginBtn) oldLoginBtn.remove();

            const toggleBtn = navRightActions.querySelector(".mobile-menu-toggle");
            if (toggleBtn) {
                navRightActions.insertBefore(wrapper, toggleBtn);
            } else {
                navRightActions.appendChild(wrapper);
            }
        }

        wrapper.innerHTML = `
            <button type="button" class="profile-btn" id="userProfileBtn" aria-expanded="false" aria-haspopup="true">
                <span class="profile-icon">👤</span>
                <span class="profile-name">${firstName}</span>
                <span class="profile-caret">▼</span>
            </button>
            <div class="profile-dropdown-menu" id="profileDropdown" hidden>
                <div class="profile-dropdown-header">
                    <div class="user-avatar-badge">${firstName.charAt(0).toUpperCase()}</div>
                    <div class="user-info-text">
                        <strong class="user-display-name">${userName}</strong>
                        <span class="user-display-email">${user.email || ""}</span>
                    </div>
                </div>
                <div class="profile-dropdown-divider"></div>
                <a href="profile.html" class="profile-dropdown-item">
                    <span class="item-icon">👤</span> My Profile
                </a>
                <a href="profile.html#my-events" class="profile-dropdown-item">
                    <span class="item-icon">🎟️</span> My Events
                </a>
                <div class="profile-dropdown-divider"></div>
                <button type="button" class="profile-dropdown-item logout-item" id="logoutBtn">
                    <span class="item-icon">🚪</span> Logout
                </button>
            </div>
        `;

        const profileBtn = wrapper.querySelector("#userProfileBtn");
        const dropdown = wrapper.querySelector("#profileDropdown");
        const logoutBtn = wrapper.querySelector("#logoutBtn");

        if (profileBtn && dropdown) {
            profileBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isOpen = dropdown.classList.contains("is-open");
                if (isOpen) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            });

            function openDropdown() {
                dropdown.hidden = false;
                void dropdown.offsetHeight;
                dropdown.classList.add("is-open");
                profileBtn.setAttribute("aria-expanded", "true");
            }

            function closeDropdown() {
                dropdown.classList.remove("is-open");
                profileBtn.setAttribute("aria-expanded", "false");
                setTimeout(() => {
                    if (!dropdown.classList.contains("is-open")) {
                        dropdown.hidden = true;
                    }
                }, 200);
            }

            document.addEventListener("click", (e) => {
                if (!wrapper.contains(e.target)) {
                    closeDropdown();
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") closeDropdown();
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (window.TechieStorage && window.TechieStorage.clearCurrentUser) {
                    window.TechieStorage.clearCurrentUser();
                }
                if (window.showTechieToast) {
                    window.showTechieToast("Logged out successfully");
                }
                updateHeaderAuthState();
                if (window.location.pathname.includes("profile.html")) {
                    window.location.href = "index.html";
                }
            });
        }

    } else {
        // Not logged in -> restore Login / Sign Up button
        const wrapper = navRightActions.querySelector(".profile-btn-wrapper");
        if (wrapper) wrapper.remove();

        if (!navRightActions.querySelector(".login-btn")) {
            const loginBtn = document.createElement("a");
            loginBtn.href = "login.html";
            loginBtn.className = "login-btn";
            loginBtn.innerHTML = `<span>👤</span> Login / Sign Up`;

            const toggleBtn = navRightActions.querySelector(".mobile-menu-toggle");
            if (toggleBtn) {
                navRightActions.insertBefore(loginBtn, toggleBtn);
            } else {
                navRightActions.appendChild(loginBtn);
            }
        }
    }
}

window.updateHeaderAuthState = updateHeaderAuthState;

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeMobileMenu();
    initializeNavbarScrollEffect();
    initializeHighlightGalleries();
    initializeButtonEffects();
    initializeScrollAnimations();
    initializeImageHandling();
    updateCurrentYear();
    initializeToast();
    initializeSocialButtons();
    updateHeaderAuthState();
});