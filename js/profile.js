// =====================================================
// TECHIE-TORNADOES
// PROFILE & MY EVENTS CONTROLLER
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    const user = window.TechieStorage ? window.TechieStorage.getCurrentUser() : null;

    if (!user) {
        // Redirect to login if user visits profile while logged out
        window.location.href = "login.html";
        return;
    }

    renderUserProfile(user);
    renderMyEvents(user.email);
    setupLogoutButton();

    /**
     * Render User Information Fields
     * @param {Object} user 
     */
    function renderUserProfile(user) {
        const nameEl = document.getElementById("profileFullName");
        const avatarEl = document.getElementById("userAvatar");
        const emailEl = document.getElementById("profileEmail");
        const phoneEl = document.getElementById("profilePhone");
        const collegeEl = document.getElementById("profileCollege");
        const yearEl = document.getElementById("profileYear");
        const branchEl = document.getElementById("profileBranch");

        const fullName = user.fullName || user.name || "User";
        const initial = fullName.charAt(0).toUpperCase();

        if (nameEl) nameEl.textContent = fullName;
        if (avatarEl) avatarEl.textContent = initial;
        if (emailEl) emailEl.textContent = user.email || "Not provided";
        if (phoneEl) phoneEl.textContent = user.phone || "Not provided";
        if (collegeEl) collegeEl.textContent = user.college || "Not provided";
        if (yearEl) yearEl.textContent = user.year || "Not provided";
        if (branchEl) branchEl.textContent = user.branch || "Not provided";
    }

    /**
     * Render Events Participated exclusively for current logged-in user
     * @param {string} email 
     */
    function renderMyEvents(email) {
        const eventsContainer = document.getElementById("myEventsList");
        if (!eventsContainer) return;

        let allRegistrations = [];
        if (window.TechieStorage && window.TechieStorage.getRegistrations) {
            allRegistrations = window.TechieStorage.getRegistrations();
        } else {
            try {
                allRegistrations = JSON.parse(localStorage.getItem("techieTornadoesRegistrations")) || [];
            } catch (err) {
                allRegistrations = [];
            }
        }

        const cleanEmail = (email || "").trim().toLowerCase();
        const myRegistrations = allRegistrations.filter(
            (r) => r.email && r.email.trim().toLowerCase() === cleanEmail
        );

        if (myRegistrations.length === 0) {
            eventsContainer.innerHTML = `
                <div class="my-events-empty">
                    <div class="empty-icon">🎟️</div>
                    <h3>No Events Registered Yet</h3>
                    <p>Explore our upcoming technical challenges, workshops, and hackathons.</p>
                    <a href="events.html" class="primary-btn">Browse Events →</a>
                </div>
            `;
            return;
        }

        eventsContainer.innerHTML = myRegistrations.map((item) => {
            // Find extra event details from window.TechFestEvents if available
            let categoryName = "Technical Event";
            let eventIcon = "💻";
            let dateStr = item.registeredAt || "Confirmed";

            if (window.TechFestEvents && window.TechFestEvents.events) {
                const match = window.TechFestEvents.events.find(
                    (e) => e.name.toLowerCase() === (item.event || "").toLowerCase()
                );
                if (match) {
                    if (match.categoryName) categoryName = match.categoryName;
                    if (match.icon) eventIcon = match.icon;
                    if (match.date) dateStr = match.date;
                }
            }

            return `
                <div class="my-event-card">
                    <div class="my-event-header">
                        <span class="my-event-icon">${eventIcon}</span>
                        <div>
                            <span class="my-event-category">${categoryName}</span>
                            <h3 class="my-event-title">${item.event || "Tech Event"}</h3>
                        </div>
                        <span class="my-event-status">Registered</span>
                    </div>

                    <div class="my-event-details">
                        <div class="m-detail">
                            <span class="m-label">Registration ID:</span>
                            <strong class="m-value id-code">${item.id || "TT-2026"}</strong>
                        </div>
                        <div class="m-detail">
                            <span class="m-label">Date:</span>
                            <span class="m-value">📅 ${dateStr}</span>
                        </div>
                        <div class="m-detail">
                            <span class="m-label">Participant:</span>
                            <span class="m-value">${item.fullName || user.fullName}</span>
                        </div>
                        <div class="m-detail">
                            <span class="m-label">College:</span>
                            <span class="m-value">${item.college || user.college || "N/A"}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    /**
     * Handle Profile Page Logout Button
     */
    function setupLogoutButton() {
        const logoutBtn = document.getElementById("profileLogoutBtn");
        if (!logoutBtn) return;

        logoutBtn.addEventListener("click", function () {
            if (window.TechieStorage && window.TechieStorage.clearCurrentUser) {
                window.TechieStorage.clearCurrentUser();
            }
            if (window.showTechieToast) {
                window.showTechieToast("Logged out successfully");
            }
            if (window.updateHeaderAuthState) {
                window.updateHeaderAuthState();
            }
            window.location.href = "index.html";
        });
    }
});
