/**
 * TECHIE-TORNADOES - ANIMATION ENGINE
 * High-performance interactive UI animations, scroll triggers, 3D card tilts, and stat counters.
 */

(function () {
    "use strict";

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // =====================================================
    // 1. SCROLL REVEAL OBSERVER
    // =====================================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            ".anim-reveal, .anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-zoom-in, .scroll-animate"
        );

        if (!revealElements.length) return;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            revealElements.forEach((el) => {
                el.classList.add("is-visible");
                el.classList.add("visible");
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -40px 0px",
            threshold: 0.08
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach((el) => {
            observer.observe(el);
        });
    }

    // =====================================================
    // 2. DYNAMIC STAT COUNTERS
    // =====================================================
    function initStatCounters() {
        const counters = document.querySelectorAll(".counter-number");
        if (!counters.length) return;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            return; // keep static text if reduced motion
        }

        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        counters.forEach((counter) => counterObserver.observe(counter));
    }

    function animateCounter(counterEl) {
        const originalText = counterEl.textContent.trim();
        // Parse prefix, number, and suffix (e.g., "₹1.5L+", "5000+", "100%", "8+")
        const match = originalText.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
        if (!match) return;

        const prefix = match[1] || "";
        const targetNumber = parseFloat(match[2]);
        const suffix = match[3] || "";
        const isDecimal = match[2].includes(".");
        const decimalPlaces = isDecimal ? match[2].split(".")[1].length : 0;

        const duration = 1600; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart function
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentVal = easeProgress * targetNumber;

            counterEl.textContent = `${prefix}${currentVal.toFixed(decimalPlaces)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counterEl.textContent = originalText; // ensure exact original string at end
            }
        }

        requestAnimationFrame(updateCount);
    }

    // =====================================================
    // 3. 3D CARD TILT EFFECT (DESKTOP)
    // =====================================================
    function init3DCardTilt() {
        // Only run on desktop devices with hover support
        if (prefersReducedMotion || window.innerWidth < 992 || !window.matchMedia("(hover: hover)").matches) {
            return;
        }

        const tiltCards = document.querySelectorAll(".tilt-card, .event-card-main, .intro-visual-card");

        tiltCards.forEach((card) => {
            let boundingBox = null;

            card.addEventListener("mouseenter", () => {
                boundingBox = card.getBoundingClientRect();
            });

            card.addEventListener("mousemove", (e) => {
                if (!boundingBox) boundingBox = card.getBoundingClientRect();

                const x = e.clientX - boundingBox.left;
                const y = e.clientY - boundingBox.top;

                const centerX = boundingBox.width / 2;
                const centerY = boundingBox.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
                const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
                boundingBox = null;
            });
        });
    }

    // =====================================================
    // 4. CLICK WAVE RIPPLE MICRO-INTERACTION
    // =====================================================
    function initButtonRipples() {
        const rippleButtons = document.querySelectorAll(".primary-btn, .secondary-btn, .register-button, .login-btn, .social-btn");

        rippleButtons.forEach((btn) => {
            btn.classList.add("btn-ripple-container");

            btn.addEventListener("click", function (e) {
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                const ripple = document.createElement("span");
                ripple.className = "click-ripple";
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // =====================================================
    // 5. INITIALIZE ALL ANIMATIONS ON DOM READY
    // =====================================================
    function initAnimations() {
        initScrollReveal();
        initStatCounters();
        init3DCardTilt();
        initButtonRipples();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAnimations);
    } else {
        initAnimations();
    }

    // Expose for dynamic event page re-renders
    window.TechieAnimations = {
        refresh: initAnimations,
        initScrollReveal,
        init3DCardTilt,
        initStatCounters
    };
})();
