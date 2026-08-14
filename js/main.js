// =====================================================
// TECHIE-TORNADOES
// Main JavaScript
// Shared functionality for the website
// =====================================================
 
 
// =====================================================
// 1. WAIT FOR HTML TO LOAD
// =====================================================
 
document.addEventListener("DOMContentLoaded", () => {
 
    console.log("Techie-Tornadoes loaded successfully.");
 
    initializeNavigation();
    initializeSmoothScrolling();
    initializeEventCards();
    initializeNavbarScrollEffect();
    initializeButtonEffects();
    initializeScrollAnimations();
    initializeImageHandling();
    updateCurrentYear();
 
});
 
 
// =====================================================
// 2. NAVIGATION
// =====================================================
 
function initializeNavigation() {
 
    const currentPage = window.location.pathname
        .split("/")
        .pop();
 
    const navLinks = document.querySelectorAll(".nav-links a");
 
    navLinks.forEach(link => {
 
        const href = link.getAttribute("href");
 
        // Skip links with no href, or hash-only/external links
        if (!href || href.startsWith("#") || href.startsWith("http")) {
            return;
        }
 
        const linkPage = href.split("/").pop();
 
        // Remove existing active class
        link.classList.remove("active");
 
        // Add active class to current page
        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }
 
    });
 
}
 
 
// =====================================================
// 3. SMOOTH SCROLLING
// =====================================================
 
function initializeSmoothScrolling() {
 
    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );
 
    anchorLinks.forEach(link => {
 
        link.addEventListener("click", function (event) {
 
            const targetId = this.getAttribute("href");
 
            // Ignore empty #
            if (targetId === "#" || !targetId) {
                return;
            }
 
            let targetElement;
 
            try {
                targetElement = document.querySelector(targetId);
            } catch (error) {
                // Invalid selector (e.g. href="#123abc") — bail out quietly
                return;
            }
 
            if (targetElement) {
 
                event.preventDefault();
 
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
 
            }
 
        });
 
    });
 
}
 
 
// =====================================================
// 4. EVENT CARD INTERACTION
// =====================================================
 
function initializeEventCards() {
 
    const eventCards =
        document.querySelectorAll(".event-card");
 
    eventCards.forEach(card => {
 
        card.addEventListener("mouseenter", () => {
 
            card.classList.add("event-card-hover");
 
        });
 
        card.addEventListener("mouseleave", () => {
 
            card.classList.remove("event-card-hover");
 
        });
 
    });
 
}
 
 
// =====================================================
// 5. NAVBAR SCROLL EFFECT
// (moved inside DOMContentLoaded — querying for .navbar
// at parse time could return null if this script runs
// before the DOM is built)
// =====================================================
 
function initializeNavbarScrollEffect() {
 
    const navbar = document.querySelector(".navbar");
 
    if (!navbar) {
        return;
    }
 
    window.addEventListener("scroll", () => {
 
        if (window.scrollY > 20) {
 
            navbar.classList.add("navbar-scrolled");
 
        } else {
 
            navbar.classList.remove("navbar-scrolled");
 
        }
 
    });
 
}
 
 
// =====================================================
// 6. BUTTON RIPPLE EFFECT
// =====================================================
 
function initializeButtonEffects() {
 
    const buttons = document.querySelectorAll(
        ".primary-btn, .secondary-btn, .view-events, .cta-button, .login-btn"
    );
 
    buttons.forEach(button => {
 
        button.addEventListener("click", function (event) {
 
            const ripple =
                document.createElement("span");
 
            ripple.classList.add("ripple");
 
            const rect =
                this.getBoundingClientRect();
 
            const size =
                Math.max(rect.width, rect.height);
 
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
 
            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;
 
            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;
 
            this.appendChild(ripple);
 
            setTimeout(() => {
 
                ripple.remove();
 
            }, 600);
 
        });
 
    });
 
}
 
 
// =====================================================
// 7. INTERSECTION OBSERVER
// Adds animation when sections enter the screen
// =====================================================
 
function initializeScrollAnimations() {
 
    const animatedElements =
        document.querySelectorAll(
            ".event-card, .section-header, .cta-container"
        );
 
    if (!("IntersectionObserver" in window)) {
 
        animatedElements.forEach(element => {
            element.classList.add("visible");
        });
 
        return;
 
    }
 
    const observer =
        new IntersectionObserver(
            (entries, observer) => {
 
                entries.forEach(entry => {
 
                    if (entry.isIntersecting) {
 
                        entry.target.classList.add(
                            "visible"
                        );
 
                        observer.unobserve(
                            entry.target
                        );
 
                    }
 
                });
 
            },
            {
                threshold: 0.15
            }
        );
 
    animatedElements.forEach(element => {
 
        element.classList.add("scroll-animate");
 
        observer.observe(element);
 
    });
 
}
 
 
// =====================================================
// 8. IMAGE ERROR HANDLING
// =====================================================
 
function initializeImageHandling() {
 
    const images =
        document.querySelectorAll("img");
 
    images.forEach(image => {
 
        image.addEventListener("error", () => {
 
            console.warn(
                `Image could not be loaded: ${image.src}`
            );
 
            image.classList.add("image-error");
 
        });
 
    });
 
}
 
 
// =====================================================
// 9. CURRENT YEAR
// =====================================================
 
function updateCurrentYear() {
 
    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );
 
    const currentYear =
        new Date().getFullYear();
 
    yearElements.forEach(element => {
 
        element.textContent = currentYear;
 
    });
 
}
 
 
// =====================================================
// 10. UTILITY FUNCTIONS
// These can be used by other JavaScript files later
// =====================================================
 
function showMessage(message, type = "info") {
 
    console.log(`[${type.toUpperCase()}] ${message}`);
 
}
 
 
function getElement(selector) {
 
    return document.querySelector(selector);
 
}
 
 
function getElements(selector) {
 
    return document.querySelectorAll(selector);
 
}
 
 
// =====================================================
// END OF MAIN.JS
// =====================================================
 