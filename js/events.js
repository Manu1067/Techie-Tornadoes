// =====================================================
// TECHIE-TORNADOES
// EVENTS DATA & HORIZONTAL CARD RENDERER
// =====================================================

const eventsData = [
    {
        id: 1,
        slug: "codesprint",
        name: "CodeSprint 2026",
        category: "coding",
        categoryName: "Coding",
        date: "15 Jun 2026",
        monthYear: "June 2026",
        location: "Online",
        isOnline: true,
        image: "assets/images/events/codesprint.jpg",
        icon: "</>",
        badgeColor: "blue",
        description: "Showcase your programming skills in this thrilling coding competition. Solve real-world algorithmic problems and compete with the best minds under pressure.",
        detailedDescription: "CodeSprint 2026 tests speed, problem-solving, data structures, and algorithmic optimization across 4 challenging tracks. Participants receive live leaderboard updates, expert code analysis, and certificates of completion.",
        teamSize: "1 - 3 Members",
        registrationDeadline: "10 Jun 2026",
        duration: "6 Hours",
        prizePool: "₹50,000",
        participants: "120+ Participants"
    },
    {
        id: 2,
        slug: "robowars",
        name: "RoboWars 2026",
        category: "robotics",
        categoryName: "Robotics",
        date: "22 Jun 2026",
        monthYear: "June 2026",
        location: "Tech Campus, Pune",
        isOnline: false,
        image: "assets/images/events/robowars.jpg",
        icon: "🤖",
        badgeColor: "blue",
        description: "Design, build and battle your robot in the ultimate robotics showdown. Outsmart your opponents in exciting tactical engineering challenges.",
        detailedDescription: "RoboWars brings together hardware builders and autonomous system creators. Robots compete in weight-bracket arena battles, obstacle speedruns, and precision task maneuvering with live arena commentary.",
        teamSize: "2 - 5 Members",
        registrationDeadline: "15 Jun 2026",
        duration: "2 Days",
        prizePool: "₹75,000",
        participants: "80+ Teams"
    },
    {
        id: 3,
        slug: "cybershield",
        name: "CyberShield",
        category: "cybersecurity",
        categoryName: "Cyber Security",
        date: "29 Jun 2026",
        monthYear: "June 2026",
        location: "Online",
        isOnline: true,
        image: "assets/images/events/cybershield.jpg",
        icon: "🛡",
        badgeColor: "blue",
        description: "Put your cybersecurity knowledge to the test. Capture the flag (CTF), ethical hacking, cryptography, and digital forensics challenges await!",
        detailedDescription: "CyberShield is an intensive 8-hour Capture The Flag competition. Tackle reverse engineering, web security vulnerabilities, network packet analysis, and binary exploitation in a safe, simulated target environment.",
        teamSize: "1 - 4 Members",
        registrationDeadline: "20 Jun 2026",
        duration: "8 Hours",
        prizePool: "₹60,000",
        participants: "150+ Hackers"
    },
    {
        id: 4,
        slug: "innovatex",
        name: "InnovateX",
        category: "innovation",
        categoryName: "Innovation",
        date: "06 Jul 2026",
        monthYear: "July 2026",
        location: "Innovation Hub",
        isOnline: false,
        image: "assets/images/events/innovatex.jpg",
        icon: "💡",
        badgeColor: "pink",
        description: "Bring your ideas to life! Present your innovative solutions to real-world social and industrial problems and make a lasting impact.",
        detailedDescription: "InnovateX is a hardware and software pitch hackathon. Teams demonstrate working prototypes to industry mentors, venture incubators, and university researchers, gaining feedback and grant funding opportunities.",
        teamSize: "2 - 4 Members",
        registrationDeadline: "30 Jun 2026",
        duration: "1 Day",
        prizePool: "₹40,000",
        participants: "45+ Ideas"
    },
    {
        id: 5,
        slug: "techtalks",
        name: "TechTalks 2026",
        category: "workshop",
        categoryName: "Workshop",
        date: "13 Jul 2026",
        monthYear: "July 2026",
        location: "Auditorium, Delhi",
        isOnline: false,
        image: "assets/images/events/techtalks.jpg",
        icon: "🎙",
        badgeColor: "pink",
        description: "Insightful keynote sessions and hands-on workshops delivered by technology experts covering AI trends, web architecture, and future careers.",
        detailedDescription: "TechTalks feature interactive Q&A sessions with senior engineers and architects from top tech firms. Includes hands-on breakout rooms, networking tea sessions, and career guidance workshops.",
        teamSize: "Individual",
        registrationDeadline: "10 Jul 2026",
        duration: "1 Day",
        prizePool: "₹299 Fee",
        participants: "200+ Attendees"
    },
    {
        id: 6,
        slug: "cloudcraft",
        name: "CloudCraft",
        category: "cloud",
        categoryName: "Cloud Computing",
        date: "20 Jul 2026",
        monthYear: "July 2026",
        location: "Online",
        isOnline: true,
        image: "assets/images/events/cloudcraft.jpg",
        icon: "☁",
        badgeColor: "blue",
        description: "Build cloud-powered solutions and explore modern serverless, DevOps, and cloud infrastructure through practical real-time challenges.",
        detailedDescription: "CloudCraft challenges developers to deploy resilient microservices, configure containerized orchestrations, and implement scalable cloud infrastructure with automated CI/CD pipelines.",
        teamSize: "1 - 3 Members",
        registrationDeadline: "17 Jul 2026",
        duration: "6 Hours",
        prizePool: "₹45,000",
        participants: "90+ Builders"
    }
];

/**
 * Creates HTML string for a horizontal event row matching Screenshot 3
 * @param {Object} event Event data object
 * @returns {string} HTML markup
 */
function createEventRowMarkup(event) {
    const isPink = event.badgeColor === "pink";
    const categoryBadgeClass = isPink ? "pink-category" : "blue-category";
    const iconClass = isPink ? "pink" : "blue";
    const linkClass = isPink ? "pink-link" : "";

    return `
        <article class="event-row" data-event-id="${event.id}" data-category="${event.category}" data-name="${event.name.toLowerCase()}">
            <!-- EVENT IMAGE & ICON -->
            <div class="event-image">
                <img src="${event.image}" alt="${event.name}" onerror="this.src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80';">
                <div class="event-image-icon ${iconClass}">
                    ${event.icon}
                </div>
            </div>

            <!-- BASIC INFO -->
            <div class="event-main-info">
                <h2>${event.name}</h2>
                <div class="event-basic-info">
                    <span><i class="info-symbol">📅</i> ${event.date}</span>
                    <span><i class="info-symbol">📍</i> ${event.location}</span>
                </div>
                <span class="event-category ${categoryBadgeClass}">${event.categoryName}</span>
            </div>

            <!-- DESCRIPTION & KEY DETAILS -->
            <div class="event-description">
                <p>${event.description}</p>
                <div class="event-details">
                    <div>
                        <strong>👥</strong>
                        <span>Team Size <b>${event.teamSize}</b></span>
                    </div>
                    <div>
                        <strong>📅</strong>
                        <span>Deadline <b>${event.registrationDeadline}</b></span>
                    </div>
                    <div>
                        <strong>⏱</strong>
                        <span>Duration <b>${event.duration}</b></span>
                    </div>
                    <div>
                        <strong>🏆</strong>
                        <span>Prize Pool <b>${event.prizePool}</b></span>
                    </div>
                </div>
                <div class="event-extra-details" hidden>
                    <p class="extra-desc">${event.detailedDescription}</p>
                </div>
            </div>

            <!-- ACTION LINK / TOGGLE DETAILS -->
            <div class="event-actions">
                <button type="button" class="details-toggle-btn ${linkClass}" aria-expanded="false">
                    <span>View Details</span>
                    <span class="arrow">↓</span>
                </button>
                <a href="registration.html?event=${encodeURIComponent(event.name)}" class="direct-register-btn" title="Register for ${event.name}">
                    Register →
                </a>
            </div>
        </article>
    `;
}

/**
 * Render list of events into event container element
 * @param {Array} eventsList Array of event objects to render
 */
function renderEvents(eventsList = eventsData) {
    const container = document.getElementById("eventContainer") || document.querySelector(".event-list");
    const noEventsMsg = document.getElementById("noEvents");

    if (!container) return;

    if (!eventsList || eventsList.length === 0) {
        container.innerHTML = "";
        if (noEventsMsg) noEventsMsg.hidden = false;
        return;
    }

    if (noEventsMsg) noEventsMsg.hidden = true;

    container.innerHTML = eventsList.map(createEventRowMarkup).join("");

    // Attach expandable details listeners
    container.querySelectorAll(".details-toggle-btn").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const row = btn.closest(".event-row");
            const extraDetails = row.querySelector(".event-extra-details");
            const isExpanded = btn.getAttribute("aria-expanded") === "true";

            if (isExpanded) {
                extraDetails.hidden = true;
                btn.setAttribute("aria-expanded", "false");
                btn.querySelector("span:first-child").textContent = "View Details";
                btn.querySelector(".arrow").textContent = "↓";
            } else {
                extraDetails.hidden = false;
                btn.setAttribute("aria-expanded", "true");
                btn.querySelector("span:first-child").textContent = "Hide Details";
                btn.querySelector(".arrow").textContent = "↑";
            }
        });
    });
}

// Initial render if container exists on DOM load
document.addEventListener("DOMContentLoaded", () => {
    renderEvents(eventsData);
});

// Export globally
window.TechFestEvents = {
    events: eventsData,
    renderEvents,
    getEventById: (id) => eventsData.find((e) => e.id === Number(id)),
    getEventByName: (name) => eventsData.find((e) => e.name.toLowerCase() === (name || "").toLowerCase())
};
