// =====================================================
// TECHIE-TORNADOES
// EVENTS DATA & EVENT CARD RENDERING
// =====================================================


// =====================================================
// 1. EVENT DATA
// =====================================================

const events = [

    {
        id: 1,
        name: "Code Wars",
        date: "22 Aug 2026",
        category: "coding",
        categoryName: "Coding",
        description:
            "Battle your way through challenging algorithms, data structures and competitive programming problems.",
        icon: "</>",
        iconClass: "blue-icon"
    },

    {
        id: 2,
        name: "CyberShield",
        date: "25 Aug 2026",
        category: "cybersecurity",
        categoryName: "Cybersecurity",
        description:
            "Test your cybersecurity skills through ethical hacking, digital defense and real-world security challenges.",
        icon: "🛡",
        iconClass: "blue-icon"
    },

    {
        id: 3,
        name: "AI Innovation",
        date: "28 Aug 2026",
        category: "ai",
        categoryName: "AI / ML",
        description:
            "Build intelligent solutions using artificial intelligence and machine learning to solve real-world problems.",
        icon: "🤖",
        iconClass: "pink-icon"
    },

    {
        id: 4,
        name: "WebSprint",
        date: "30 Aug 2026",
        category: "web",
        categoryName: "Web Development",
        description:
            "Design and develop creative, responsive web experiences that combine technology with great user experience.",
        icon: "🌐",
        iconClass: "blue-icon"
    },

    {
        id: 5,
        name: "CloudCraft",
        date: "02 Sep 2026",
        category: "cloud",
        categoryName: "Cloud Computing",
        description:
            "Explore cloud technologies and build scalable solutions using modern cloud computing concepts.",
        icon: "☁",
        iconClass: "blue-icon"
    },

    {
        id: 6,
        name: "DataQuest",
        date: "05 Sep 2026",
        category: "data",
        categoryName: "Data Science",
        description:
            "Turn raw data into meaningful insights through analytics, visualization and data-driven problem solving.",
        icon: "📊",
        iconClass: "pink-icon"
    },

    {
        id: 7,
        name: "RoboWars",
        date: "08 Sep 2026",
        category: "robotics",
        categoryName: "Robotics",
        description:
            "Design, build and compete with innovative robots while solving exciting engineering challenges.",
        icon: "🤖",
        iconClass: "blue-icon"
    },

    {
        id: 8,
        name: "TechTalks",
        date: "12 Sep 2026",
        category: "workshop",
        categoryName: "Workshop",
        description:
            "Learn from technology enthusiasts and industry experts through engaging technical talks and workshops.",
        icon: "🎙",
        iconClass: "pink-icon"
    }

];


// =====================================================
// 2. GET EVENT CONTAINER
// =====================================================

const eventContainer =
    document.getElementById("eventContainer");


// =====================================================
// 3. CREATE EVENT CARD
// =====================================================

function createEventCard(event) {

    const article =
        document.createElement("article");

    article.className = "event-card";

    article.dataset.eventId = event.id;
    article.dataset.category = event.category;
    article.dataset.name = event.name.toLowerCase();


    article.innerHTML = `

        <div class="event-icon ${event.iconClass}">
            ${event.icon}
        </div>

        <h3>
            ${event.name}
        </h3>

        <p class="event-date">
            📅 &nbsp; ${event.date}
        </p>

        <span class="category ${event.iconClass === "pink-icon"
            ? "pink-category"
            : "blue-category"}">
            ${event.categoryName}
        </span>

        <p class="event-description">
            ${event.description}
        </p>

        <a
            href="registration.html?event=${encodeURIComponent(event.name)}"
            class="event-register-btn"
        >
            Register Now
            <span>→</span>
        </a>

    `;

    return article;
}


// =====================================================
// 4. DISPLAY EVENTS
// =====================================================

function displayEvents(eventsToDisplay = events) {

    // Make sure container exists
    if (!eventContainer) {
        console.warn(
            "Event container (#eventContainer) was not found."
        );

        return;
    }


    // Clear existing cards
    eventContainer.innerHTML = "";


    // No events found
    if (eventsToDisplay.length === 0) {

        const noEvents =
            document.getElementById("noEvents");

        if (noEvents) {
            noEvents.hidden = false;
        }

        return;
    }


    // Hide "No events found"
    const noEvents =
        document.getElementById("noEvents");

    if (noEvents) {
        noEvents.hidden = true;
    }


    // Create and add cards
    eventsToDisplay.forEach(event => {

        const card =
            createEventCard(event);

        eventContainer.appendChild(card);

    });

}


// =====================================================
// 5. INITIALIZE EVENTS
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // Only display events if we're on
        // the events page
        if (eventContainer) {

            displayEvents(events);

            console.log(
                `${events.length} events loaded successfully.`
            );

        }

    }
);


// =====================================================
// 6. FIND EVENT BY ID
// =====================================================

function getEventById(id) {

    return events.find(
        event => event.id === Number(id)
    );

}


// =====================================================
// 7. FIND EVENT BY NAME
// =====================================================

function getEventByName(name) {

    if (!name) {
        return null;
    }

    return events.find(
        event =>
            event.name.toLowerCase() ===
            name.toLowerCase()
    );

}


window.TechFestEvents = {

    events: events,

    displayEvents: displayEvents,

    getEventById: getEventById,

    getEventByName: getEventByName

};


