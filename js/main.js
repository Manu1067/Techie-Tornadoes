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

    // Insert toggle button before login-btn or right container
    const loginBtn = navContainer.querySelector(".login-btn") || navContainer.querySelector(".nav-right-actions");
    if (loginBtn) {
        navContainer.insertBefore(toggleBtn, loginBtn);
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
        ".highlight-event, .section-header, .cta-container, .event-row, .registration-card, .scroll-animate, .contact-form-card, .contact-details-card, .faq-section, .legal-content, .about-mission"
    );

    if (!("IntersectionObserver" in window)) {
        animatedElements.forEach((el) => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    animatedElements.forEach((el) => {
        el.classList.add("scroll-animate");
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