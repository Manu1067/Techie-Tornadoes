// =====================================================
// TECHIE-TORNADOES
// EVENTS DATA & EXPANDABLE CARD RENDERER
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
        image: "images/codesprint.png",
        icon: "</>",
        badgeColor: "blue",
        description: "Showcase your programming skills in this thrilling coding competition. Solve real-world algorithmic problems, optimize time complexity, and compete under pressure.",
        detailedDescription: "CodeSprint 2026 tests speed, problem-solving, data structures, and algorithmic optimization across multiple challenging tracks. Participants compete on a live interactive leaderboard with automated testcase evaluation.",
        teamSize: "1 - 3 Members",
        registrationDeadline: "10 Jun 2026",
        duration: "6 Hours",
        prizePool: "₹50,000",
        participants: "120+ Coders",
        rounds: [
            {
                number: "Round 1",
                name: "Online Qualifier & Speed DSA",
                time: "10:00 AM - 11:30 AM",
                mode: "Online Platform",
                desc: "30 MCQs on Data Structures & Algorithms + 2 algorithmic coding problems. Top 40 teams advance to Round 2."
            },
            {
                number: "Round 2",
                name: "Algorithmic Optimization & Debugging",
                time: "01:00 PM - 03:00 PM",
                mode: "Live Arena",
                desc: "Solve 4 complex competitive programming challenges with strict memory & CPU time constraints."
            },
            {
                number: "Round 3",
                name: "Grand Finale: System Design Sprint",
                time: "04:00 PM - 06:00 PM",
                mode: "Live Showdown",
                desc: "Live leaderboard sprint with dynamically changing problem constraints judged by top industry software engineers."
            }
        ],
        timeline: [
            { date: "01 May 2026", title: "Registrations Open", desc: "Team formation and online portal registration begins." },
            { date: "10 Jun 2026", title: "Registration Closes", desc: "Portal closes at 11:59 PM. Slot allocation emails sent." },
            { date: "13 Jun 2026", title: "Platform Dry Run", desc: "Mock test to verify compiler environments and VPN setups." },
            { date: "15 Jun 2026", title: "Competition Day", desc: "Rounds 1, 2, and 3 executed live with instant scoring." },
            { date: "16 Jun 2026", title: "Results & Awards", desc: "Winner ceremony, leaderboard release & e-certificate dispatch." }
        ],
        perks: ["₹50,000 Cash Pool", "Verified E-Certificate", "Internship Interviews", "Mentorship Access"]
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
        image: "images/robowars.png",
        icon: "🤖",
        badgeColor: "blue",
        description: "Design, build and battle your wired or wireless combat robot in the ultimate arena showdown. Outsmart and outmaneuver your opponents in explosive matches.",
        detailedDescription: "RoboWars brings together hardware builders and autonomous roboticists. Robots clash in regulated weight brackets featuring spinners, flippers, and drum crushers inside a high-security steel arena.",
        teamSize: "2 - 5 Members",
        registrationDeadline: "15 Jun 2026",
        duration: "2 Days",
        prizePool: "₹75,000",
        participants: "80+ Teams",
        rounds: [
            {
                number: "Round 1",
                name: "Bot Inspection & Safety Clearance",
                time: "Day 1 - 09:00 AM",
                mode: "Tech Arena",
                desc: "Technical scrutiny of bot dimensions, weight class (15kg & 30kg), pneumatic safety, and fail-safe cutoffs."
            },
            {
                number: "Round 2",
                name: "Obstacle Speedrun & Mobility Test",
                time: "Day 1 - 02:00 PM",
                mode: "Test Track",
                desc: "Timed navigation through uneven terrain, ramps, and precision handling zones to seed bracket positions."
            },
            {
                number: "Round 3",
                name: "1v1 Arena Combat Knockouts",
                time: "Day 2 - 10:00 AM",
                mode: "Main Steel Cage",
                desc: "3-minute knockout cage matches. Points awarded for aggression, damage, control, and immobilization."
            }
        ],
        timeline: [
            { date: "10 May 2026", title: "Team Registration Opens", desc: "Submit team roster and bot mechanical blueprints." },
            { date: "15 Jun 2026", title: "Specs Submission Deadline", desc: "Final verification of weapon mechanism and power ratings." },
            { date: "20 Jun 2026", title: "Arena Slot Confirmation", desc: "Battle fixtures & arena safety guidelines distributed." },
            { date: "22 Jun 2026", title: "Inspection & Qualifiers", desc: "Day 1 technical checks and preliminary obstacle trials." },
            { date: "23 Jun 2026", title: "Grand Finals & Ceremony", desc: "Championship combat bouts and ₹75,000 prize distribution." }
        ],
        perks: ["₹75,000 Prize Pool", "Championship Trophy", "Hardware Sponsorships", "Media Spotlight"]
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
        image: "images/cybershield.png",
        icon: "🛡",
        badgeColor: "blue",
        description: "Put your offensive and defensive cybersecurity skills to the test. Capture The Flag (CTF), reverse engineering, cryptography, and digital forensics challenges await!",
        detailedDescription: "CyberShield is an intensive 8-hour Capture The Flag (CTF) marathon. Contestants tackle web exploitation, network packet analysis, binary decompilation, and privilege escalation in realistic simulated networks.",
        teamSize: "1 - 4 Members",
        registrationDeadline: "20 Jun 2026",
        duration: "8 Hours",
        prizePool: "₹60,000",
        participants: "150+ Hackers",
        rounds: [
            {
                number: "Round 1",
                name: "Jeopardy-Style CTF Challenge",
                time: "10:00 AM - 02:00 PM",
                mode: "Isolated Cyber Range",
                desc: "Solve 20 flags across Cryptography, Web Vulnerabilities (SQLi, XSS, SSRF), and Steganography."
            },
            {
                number: "Round 2",
                name: "Attack-Defense Arena Showdown",
                time: "03:00 PM - 06:00 PM",
                mode: "Live Network Grid",
                desc: "Patch proprietary services on your designated server while identifying and exploiting weaknesses in opposing teams' nodes."
            }
        ],
        timeline: [
            { date: "15 May 2026", title: "Registration Opens", desc: "Sign up and create team handles on the CTF portal." },
            { date: "20 Jun 2026", title: "VPN Access Distributed", desc: "Secure WireGuard credentials issued for network checks." },
            { date: "25 Jun 2026", title: "Warmup CTF Practice", desc: "Practice flags go live to familiarize teams with platform." },
            { date: "29 Jun 2026", title: "8-Hour CTF Marathon", desc: "Real-time flag submissions with dynamic challenge scoring." },
            { date: "30 Jun 2026", title: "Write-up Review & Winners", desc: "Validation of exploits and release of official rankings." }
        ],
        perks: ["₹60,000 Bounty Pool", "Security Badges", "SOC Analyst Fast-Track", "Certificate of Merit"]
    },
    {
        id: 4,
        slug: "innovatex",
        name: "InnovateX 2026",
        category: "innovation",
        categoryName: "Innovation",
        date: "06 Jul 2026",
        monthYear: "July 2026",
        location: "Innovation Hub",
        isOnline: false,
        image: "images/innovatex.png",
        icon: "💡",
        badgeColor: "pink",
        description: "Bring your visionary ideas to life! Pitch working software or hardware prototypes solving pressing industrial, healthcare, and sustainable tech challenges.",
        detailedDescription: "InnovateX is a premier product and prototype hackathon. Teams demonstrate working MVPs to leading angel investors, venture capitalists, and academic incubators to gain seed grants and incubation support.",
        teamSize: "2 - 4 Members",
        registrationDeadline: "30 Jun 2026",
        duration: "1 Day",
        prizePool: "₹40,000",
        participants: "45+ Startups",
        rounds: [
            {
                number: "Round 1",
                name: "Executive Summary & Abstract Screening",
                time: "Online Review",
                mode: "Portal Submission",
                desc: "Submit a 5-page pitch deck with architecture diagrams, market viability, and problem statements. Top 20 shortlisted."
            },
            {
                number: "Round 2",
                name: "Live Prototype Demo & Investor Pitch",
                time: "10:00 AM - 04:00 PM",
                mode: "Innovation Hub Stage",
                desc: "10-minute live demonstration of working hardware/software followed by an intensive 5-minute jury Q&A."
            }
        ],
        timeline: [
            { date: "01 Jun 2026", title: "Idea Portal Opens", desc: "Submit project abstract and team background details." },
            { date: "30 Jun 2026", title: "Abstract Submission Closes", desc: "Jury evaluates market novelty, tech feasibility & impact." },
            { date: "02 Jul 2026", title: "Top 20 Shortlist Announced", desc: "Shortlisted teams receive exhibition booth invites." },
            { date: "06 Jul 2026", title: "Exhibition & Live Pitches", desc: "Interactive demo floor and jury evaluation at Innovation Hub." },
            { date: "07 Jul 2026", title: "Incubation Grants & Awards", desc: "Grant winners and top 3 startups announced." }
        ],
        perks: ["₹40,000 Cash Grant", "Incubation Support", "Angel Investor Meet", "Hardware Lab Credits"]
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
        image: "images/techtalks.png",
        icon: "🎙",
        badgeColor: "pink",
        description: "Insightful keynote sessions and hands-on masterclasses delivered by tech leaders covering generative AI, distributed systems, and modern cloud architecture.",
        detailedDescription: "TechTalks brings top engineering leaders, open-source maintainers, and researchers together for an immersive full-day summit featuring interactive deep-dives, live code refactor sessions, and direct career networking.",
        teamSize: "Individual",
        registrationDeadline: "10 Jul 2026",
        duration: "1 Day",
        prizePool: "₹299 Fee",
        participants: "200+ Attendees",
        rounds: [
            {
                number: "Session 1",
                name: "Keynote: Next-Gen AI & Agentic Systems",
                time: "10:00 AM - 12:00 PM",
                mode: "Main Auditorium",
                desc: "Keynote presentation by principal AI scientists on fine-tuning reasoning models and autonomous workflows."
            },
            {
                number: "Session 2",
                name: "Hands-on Workshop: High-Scale Cloud Architecture",
                time: "01:30 PM - 03:45 PM",
                mode: "Breakout Labs",
                desc: "Hands-on guided lab: Architecting distributed caching, zero-downtime microservices, and Kubernetes auto-scalers."
            },
            {
                number: "Session 3",
                name: "Fireside Chat & Career Networking Tea",
                time: "04:15 PM - 05:30 PM",
                mode: "Lounge Area",
                desc: "Direct networking with hiring managers from Tier-1 tech firms, portfolio reviews, and exclusive swags."
            }
        ],
        timeline: [
            { date: "15 Jun 2026", title: "Early Bird Passes Live", desc: "Pass registration opens with limited seating capacity." },
            { date: "05 Jul 2026", title: "Speaker Lineup & Agenda", desc: "Complete track schedule and prerequisite software sent." },
            { date: "10 Jul 2026", title: "Pass Confirmation Closes", desc: "Digital QR entry passes generated for all delegates." },
            { date: "13 Jul 2026", title: "TechTalks Summit Day", desc: "Full day of keynotes, breakout workshops, and networking." }
        ],
        perks: ["Summit Kit & Swag", "Hands-on Lab Certificate", "Speaker Resource Pack", "Direct Recruiter Connect"]
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
        image: "images/cloudcraft.png",
        icon: "☁",
        badgeColor: "blue",
        description: "Deploy scalable cloud architectures, optimize serverless pipelines, and automate container orchestration in practical real-time DevOps challenges.",
        detailedDescription: "CloudCraft challenges cloud architects and backend engineers to build resilient infrastructure. Teams deploy microservices, implement automated CI/CD pipelines, and secure cloud environments against traffic surges.",
        teamSize: "1 - 3 Members",
        registrationDeadline: "17 Jul 2026",
        duration: "6 Hours",
        prizePool: "₹45,000",
        participants: "90+ Builders",
        rounds: [
            {
                number: "Round 1",
                name: "Infrastructure-as-Code & Architecture Design",
                time: "10:00 AM - 12:30 PM",
                mode: "Cloud Playground",
                desc: "Write Terraform/CloudFormation scripts to configure multi-region VPCs, load balancers, and relational databases."
            },
            {
                number: "Round 2",
                name: "Live Chaos Engineering & Traffic Surge Sprint",
                time: "02:00 PM - 04:30 PM",
                mode: "Live Cluster",
                desc: "System undergoes simulated synthetic load spikes and server failures. Evaluated on uptime, latency, and cost efficiency."
            }
        ],
        timeline: [
            { date: "05 Jun 2026", title: "Registration Opens", desc: "Sign up and link GitHub accounts for cloud sandbox access." },
            { date: "17 Jul 2026", title: "Cloud Sandbox Credits Issued", desc: "AWS & GCP testing credits allocated to verified teams." },
            { date: "20 Jul 2026", title: "6-Hour Cloud Sprint", desc: "Live challenge execution with automated metric monitors." },
            { date: "21 Jul 2026", title: "Winners & Cloud Badges", desc: "Top architectures published with ₹45k prize distribution." }
        ],
        perks: ["₹45,000 Prize Pool", "$500 Cloud Credits", "DevOps Pro Badges", "Interview Fast-Tracks"]
    },
    {
        id: 7,
        slug: "ainexus",
        name: "AI Nexus 2026",
        category: "ai",
        categoryName: "AI & ML",
        date: "27 Jul 2026",
        monthYear: "July 2026",
        location: "Online / Hybrid",
        isOnline: true,
        image: "images/ainexus.png",
        icon: "🧠",
        badgeColor: "pink",
        description: "Develop cutting-edge artificial intelligence, computer vision, and generative AI models to tackle real-world multi-modal challenges.",
        detailedDescription: "AI Nexus invites researchers and AI engineers to build practical machine learning pipelines. Fine-tune foundation models, optimize inference latency on edge hardware, and deploy interactive AI demos with GPU cloud compute provided.",
        teamSize: "1 - 4 Members",
        registrationDeadline: "24 Jul 2026",
        duration: "24 Hours",
        prizePool: "₹80,000",
        participants: "110+ AI Builders",
        rounds: [
            {
                number: "Round 1",
                name: "Dataset Exploration & Baseline Pipeline",
                time: "Day 1 - 10:00 AM",
                mode: "Jupyter Hub",
                desc: "Process multi-modal datasets, clean noisy samples, and train baseline neural networks on standard benchmarks."
            },
            {
                number: "Round 2",
                name: "Model Fine-Tuning & Quantization Sprint",
                time: "Day 1 - 04:00 PM",
                mode: "GPU Cluster",
                desc: "Apply LoRA/QLoRA fine-tuning, implement RAG architectures, and optimize model throughput with TensorRT."
            },
            {
                number: "Round 3",
                name: "Jury Evaluation & Private Benchmark Test",
                time: "Day 2 - 10:00 AM",
                mode: "Live Stream Demo",
                desc: "Submission tested against hidden test set for generalization accuracy, latency, and safety alignment."
            }
        ],
        timeline: [
            { date: "10 Jun 2026", title: "Registration Portal Live", desc: "Register team and request dedicated GPU compute nodes." },
            { date: "24 Jul 2026", title: "GPU Access & Problem Release", desc: "A100 compute credentials and problem statements unlocked." },
            { date: "27-28 Jul 2026", title: "24-Hour AI Nexus Hackathon", desc: "Non-stop model training, mentoring sessions & evaluation." },
            { date: "28 Jul 2026", title: "Grand Awards Ceremony", desc: "₹80,000 cash distribution and AI research internship offers." }
        ],
        perks: ["₹80,000 Cash Pool", "A100 GPU Compute Credits", "Research Fellowships", "Global Leaderboard Badge"]
    },
    {
        id: 8,
        slug: "iotforge",
        name: "IoT Forge 2026",
        category: "iot",
        categoryName: "IoT & Hardware",
        date: "03 Aug 2026",
        monthYear: "August 2026",
        location: "Hardware Lab, Bengaluru",
        isOnline: false,
        image: "images/iotforge.png",
        icon: "⚡",
        badgeColor: "blue",
        description: "Engineer smart connected devices, telemetry sensor networks, and edge automation solutions for smart cities and industrial IoT applications.",
        detailedDescription: "IoT Forge provides teams with microcontrollers (ESP32, STM32, Raspberry Pi), sensor suites, and wireless modules. Participants design embedded firmware, telemetry dashboards, and prototype industrial IoT hardware.",
        teamSize: "2 - 4 Members",
        registrationDeadline: "31 Jul 2026",
        duration: "2 Days",
        prizePool: "₹65,000",
        participants: "60+ Hardware Teams",
        rounds: [
            {
                number: "Round 1",
                name: "Embedded Firmware & Circuit Prototyping",
                time: "Day 1 - 10:00 AM",
                mode: "Hardware Lab",
                desc: "Design PCB breadboard schematics, interface multi-sensor inputs (I2C/SPI), and write power-optimized C++ firmware."
            },
            {
                number: "Round 2",
                name: "Cloud MQTT Broker & Dashboard Integration",
                time: "Day 1 - 04:00 PM",
                mode: "IoT Testbed",
                desc: "Establish secure TLS MQTT communication to cloud brokers and construct real-time control telemetry dashboards."
            },
            {
                number: "Round 3",
                name: "Live Environmental Simulation & Demo",
                time: "Day 2 - 11:00 AM",
                mode: "Live Demo Floor",
                desc: "Hardware placed in simulated industrial load stress test to verify sensor accuracy and failover response."
            }
        ],
        timeline: [
            { date: "15 Jun 2026", title: "Team Registration Opens", desc: "Submit project domain and hardware component requests." },
            { date: "31 Jul 2026", title: "Kit Allocation & Lab Access", desc: "Component verification and lab workbench reservation." },
            { date: "03-04 Aug 2026", title: "2-Day Buildathon", desc: "48-hour hardware build sprint with expert component mentors." },
            { date: "04 Aug 2026", title: "Demo & Cash Prize Handover", desc: "Working prototype presentation and ₹65,000 prize distribution." }
        ],
        perks: ["₹65,000 Cash Pool", "Hardware Kits Retained", "Incubator Lab Access", "Industry Mentorship"]
    }
];

/**
 * Creates HTML string for a modern, spacious event card with structured expandable details
 * @param {Object} event Event data object
 * @returns {string} HTML markup
 */
function createEventRowMarkup(event) {
    const isPink = event.badgeColor === "pink";
    const categoryBadgeClass = isPink ? "pink-category" : "blue-category";

    // Generate Rounds HTML
    const roundsHtml = (event.rounds || []).map((round, idx) => `
        <div class="round-card">
            <div class="round-header">
                <span class="round-badge">${round.number}</span>
                <span class="round-time">🕒 ${round.time}</span>
            </div>
            <h4 class="round-title">${round.name}</h4>
            <div class="round-mode">📍 Mode: <strong>${round.mode}</strong></div>
            <p class="round-desc">${round.desc}</p>
        </div>
    `).join("");

    // Generate Timeline HTML
    const timelineHtml = (event.timeline || []).map((step, idx) => `
        <div class="timeline-step">
            <div class="timeline-marker">
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
            </div>
            <div class="timeline-content">
                <div class="timeline-date">${step.date}</div>
                <h4 class="timeline-title">${step.title}</h4>
                <p class="timeline-desc">${step.desc}</p>
            </div>
        </div>
    `).join("");

    // Generate Perks HTML
    const perksHtml = (event.perks || []).map(perk => `
        <span class="perk-pill">✨ ${perk}</span>
    `).join("");

    return `
        <article class="event-row anim-fade-up" data-event-id="${event.id}" data-category="${event.category}" data-name="${event.name.toLowerCase()}">
            
            <!-- MAIN VISIBLE CARD -->
            <div class="event-card-main tilt-card">
                
                <!-- POSTER IMAGE (100% Full Uncropped Poster) -->
                <div class="event-image-col">
                    <img src="${event.image}" alt="${event.name}" onerror="this.onerror=null; this.src='images/event.png';">
                </div>

                <!-- EVENT CONTENT BODY -->
                <div class="event-body-col">
                    
                    <!-- HEADER / TITLE ROW -->
                    <div class="event-header-row">
                        <div class="event-title-area">
                            <div class="event-title-top">
                                <h2 class="event-title">${event.name}</h2>
                                <span class="event-category-badge ${categoryBadgeClass}">${event.categoryName}</span>
                            </div>
                            <div class="event-meta-tags">
                                <span class="meta-tag"><i class="meta-icon">📅</i> ${event.date}</span>
                                <span class="meta-tag"><i class="meta-icon">📍</i> ${event.location}</span>
                                <span class="meta-tag"><i class="meta-icon">👥</i> ${event.teamSize}</span>
                            </div>
                        </div>
                    </div>

                    <!-- SHORT DESCRIPTION -->
                    <p class="event-short-desc">${event.description}</p>

                    <!-- METRICS GRID -->
                    <div class="event-metrics-grid">
                        <div class="metric-box">
                            <span class="metric-icon">👥</span>
                            <div class="metric-text">
                                <span class="metric-label">Team Size</span>
                                <strong class="metric-val">${event.teamSize}</strong>
                            </div>
                        </div>
                        <div class="metric-box">
                            <span class="metric-icon">📅</span>
                            <div class="metric-text">
                                <span class="metric-label">Deadline</span>
                                <strong class="metric-val">${event.registrationDeadline}</strong>
                            </div>
                        </div>
                        <div class="metric-box">
                            <span class="metric-icon">⏱</span>
                            <div class="metric-text">
                                <span class="metric-label">Duration</span>
                                <strong class="metric-val">${event.duration}</strong>
                            </div>
                        </div>
                        <div class="metric-box highlight-metric">
                            <span class="metric-icon">🏆</span>
                            <div class="metric-text">
                                <span class="metric-label">Prize Pool</span>
                                <strong class="metric-val prize-val">${event.prizePool}</strong>
                            </div>
                        </div>
                    </div>

                    <!-- ACTION BUTTONS -->
                    <div class="event-card-actions">
                        <button type="button" class="details-toggle-btn" aria-expanded="false" aria-controls="details-panel-${event.id}">
                            <span class="btn-text">View Details</span>
                            <span class="arrow-icon">↓</span>
                        </button>
                        <a href="registration.html?event=${encodeURIComponent(event.name)}" class="direct-register-btn shimmer-btn" title="Register for ${event.name}">
                            Register Now <span class="arrow-right">→</span>
                        </a>
                    </div>

                </div>

            </div>

            <!-- EXPANDABLE DETAILS PANEL (Rounds + Timeline + Overview) -->
            <div class="event-expanded-panel" id="details-panel-${event.id}" hidden>
                
                <div class="expanded-inner-container">
                    
                    <!-- ABOUT OVERVIEW -->
                    <div class="expanded-overview-box">
                        <h3 class="expanded-section-title">
                            <span class="title-icon">📖</span> About ${event.name}
                        </h3>
                        <p class="expanded-detailed-desc">${event.detailedDescription}</p>
                        
                        <!-- PERKS & HIGHLIGHTS -->
                        <div class="expanded-perks-row">
                            ${perksHtml}
                        </div>
                    </div>

                    <!-- 2-COLUMN GRID: ROUNDS & TIMELINE -->
                    <div class="expanded-details-grid">
                        
                        <!-- COLUMN 1: COMPETITION ROUNDS -->
                        <div class="rounds-column">
                            <div class="column-header">
                                <h3 class="column-title">
                                    <span class="title-icon">🎯</span> Competition Structure & Rounds
                                </h3>
                                <span class="column-subtitle">${(event.rounds || []).length} Structured Stages</span>
                            </div>
                            <div class="rounds-list">
                                ${roundsHtml}
                            </div>
                        </div>

                        <!-- COLUMN 2: SCHEDULE & TIMELINE -->
                        <div class="timeline-column">
                            <div class="column-header">
                                <h3 class="column-title">
                                    <span class="title-icon">🗓️</span> Event Roadmap & Timeline
                                </h3>
                                <span class="column-subtitle">Important Dates & Milestones</span>
                            </div>
                            <div class="timeline-track">
                                ${timelineHtml}
                            </div>
                        </div>

                    </div>

                    <!-- FOOTER ACTION BAR INSIDE EXPANDED VIEW -->
                    <div class="expanded-footer-actions">
                        <div class="expanded-note">
                            <span>ℹ️ Registrations close on <strong>${event.registrationDeadline}</strong>. Early submissions receive priority mentoring!</span>
                        </div>
                        <a href="registration.html?event=${encodeURIComponent(event.name)}" class="expanded-register-btn">
                            Apply & Register for ${event.name} →
                        </a>
                    </div>

                </div>

            </div>

        </article>
    `;
}

/**
 * Render list of events into event container element
 * @param {Array} eventsList Array of event objects to render
 * @param {boolean} hasActiveFilters Whether active filters/search criteria are applied
 */
function renderEvents(eventsList = eventsData, hasActiveFilters = false) {
    const container = document.getElementById("eventContainer") || document.querySelector(".event-list");
    const noEventsMsg = document.getElementById("noEventsMessage") || document.getElementById("noEvents") || document.querySelector(".no-events-state");

    if (!container) return;

    if (!eventsList || eventsList.length === 0) {
        container.innerHTML = "";
        if (noEventsMsg) {
            if (hasActiveFilters) {
                noEventsMsg.hidden = false;
                noEventsMsg.style.display = "flex";
            } else {
                noEventsMsg.hidden = true;
                noEventsMsg.style.display = "none";
            }
        }
        return;
    }

    if (noEventsMsg) {
        noEventsMsg.hidden = true;
        noEventsMsg.style.display = "none";
    }

    container.innerHTML = eventsList.map(createEventRowMarkup).join("");

    // Fade-in animation for event cards
    container.querySelectorAll(".event-row").forEach((row, index) => {
        row.classList.add("event-animate-in");
        row.style.animationDelay = `${index * 0.04}s`;
    });

    // Attach expandable details listeners
    container.querySelectorAll(".details-toggle-btn").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const row = btn.closest(".event-row");
            const panel = row.querySelector(".event-expanded-panel");
            const btnText = btn.querySelector(".btn-text");
            const arrowIcon = btn.querySelector(".arrow-icon");
            const isCurrentlyExpanded = btn.getAttribute("aria-expanded") === "true";

            if (isCurrentlyExpanded) {
                // Collapse
                panel.classList.remove("is-open");
                setTimeout(() => {
                    panel.hidden = true;
                }, 200);
                btn.setAttribute("aria-expanded", "false");
                row.classList.remove("expanded-active");
                if (btnText) btnText.textContent = "View Details";
                if (arrowIcon) arrowIcon.textContent = "↓";
            } else {
                // Expand
                panel.hidden = false;
                // Force reflow for smooth animation
                void panel.offsetHeight;
                panel.classList.add("is-open");
                btn.setAttribute("aria-expanded", "true");
                row.classList.add("expanded-active");
                if (btnText) btnText.textContent = "Hide Details";
                if (arrowIcon) arrowIcon.textContent = "↑";
            }
        });
    });

    // Trigger animations engine for new cards
    if (window.TechieAnimations && typeof window.TechieAnimations.refresh === "function") {
        window.TechieAnimations.refresh();
    }
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
