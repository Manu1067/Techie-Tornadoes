# Techie-Tornadoes

> Discover. Build. Compete. 
> The premier technical event discovery & registration portal for student developers, innovators, and robotics enthusiasts.

Live Demo Website: [https://techie-tornadoes.vercel.app/](https://techie-tornadoes.vercel.app/)

Overview

Techie-Tornadoes is a modern, high-performance, responsive web application designed to connect students with national hackathons, robotics tournaments, AI challenges, and expert workshops. Built with clean, modern web standards (HTML5, Vanilla CSS3, and Modular ES6+ JavaScript), it delivers a seamless user experience across desktop and mobile viewports with full light/dark theme support and persistent client-side session management.

Features

1.Live Demo Deployment: Hosted live on Vercel at [techie-tornadoes.vercel.app](https://techie-tornadoes.vercel.app/).
2.Post-Login Profile Header & Session Management**:
3.Client-side authentication using browser `localStorage` (`techieTornadoesUser`).
4.Dynamic header transition from `👤 Login / Sign Up` to `👤 User Name ▼` upon login.
5.Interactive profile dropdown menu (`My Profile`, `My Events`, `Logout`) with smooth transition animations.
6.Session persistence across page reloads and cross-page navigation (`Home`, `Events`, `Register`, `About Us`, `Profile`).
7.My Events & Events Participated (`profile.html`):
8.Dedicated profile dashboard displaying user details (Name, Email, College, Phone, Year, Branch).
9.Filtered "Events Participated" section showing only events registered by the logged-in user.
10 Automatic duplicate registration prevention.

How Events Work" Step-by-Step Flow:

  - Interactive 5-step breakdown card grid (`Discover Events`, `Instant Digital Pass`, `Prepare & Practice`, `Participate & Submit`, `Win & Get Certified`).
  - Hero CTA smooth-scrolling navigation.
- Real-Time Search & Event Filtering**:
  - Search by keyword with real-time text matching.
  - Filter events by category (Coding, Robotics, AI, Cyber Security, Innovation, Workshops).
  - Filter by event status (Upcoming, Live, Past).
  - Intelligent empty state handling ("No matching events found") with automatic reset capabilities.
- 100% Mobile Responsive Design**:
  - Pixel-perfect mobile adaptation (320px–768px viewports).
  - Header layout with inline theme toggle, user profile badge, and 3-line animated hamburger drawer (`☰` to `X`).
  - Mobile hero text/image vertical stacking.
- Dark Mode Support:
  - System and manual theme toggling with smooth color transitions and persistent state (`techie_theme`).
  - Fully tuned contrast tokens for event cards, navigation, and dropdown menus.



| Component | Technologies Used |
| :--- | :--- |
| **Frontend Core** | HTML5 (Semantic Markup), JavaScript ES6+ (Vanilla JS) |
| **Styling & Design System** | Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism) |
| **Typography** | Google Fonts (Inter font family) |
| **Data Persistence** | Browser `localStorage` API |
| **Hosting & Deployment** | Vercel Edge Network |


Project Architecture

Techie-Tornadoes/
├── index.html            # Main Landing Page (Hero, Event Highlights, How Events Work, CTAs)
├── events.html           # Full Events Explorer (Search, Category Filters, Event Cards)
├── registration.html     # Event Registration Form & Digital Pass Generator
├── login.html            # User Login Portal
├── profile.html          # User Profile Dashboard & Events Participated Tracking
├── about.html            # About Us & Community Stats
├── contact.html          # Contact Form & FAQs
├── privacy.html          # Privacy Policy
├── terms.html            # Terms & Conditions
├── css/
│   ├── style.css         # Global Design Tokens, Core Styles, Header/Footer, Dropdowns
│   ├── responsive.css    # Mobile-Only Media Queries (@media max-width: 768px)
│   ├── dark-mode.css     # Dark Mode Theme Overrides & Color Palette
│   ├── registration.css  # Registration Form & Pass Ticket Styling
│   ├── login.css         # Login Page Layout
│   └── pages.css        # About, Contact, Legal, Profile Page Styling
└── js/
    ├── main.js           # Header State Controller, Mobile Hamburger, Global Navigation
    ├── storage.js        # LocalStorage Session & Registration Storage Helpers
    ├── events.js         # Event Dataset & Card Rendering Controller
    ├── search-filter.js  # Live Event Search, Category & Status Filter Logic
    ├── registration.js    # Registration Form Validation & Digital Ticket Generation
    ├── login.js           # Login Form Validation & Session Storage Initialization
    ├── profile.js         # User Profile Info & My Events Filter Controller
    ├── dark-mode.js      # Light/Dark Theme Switcher Logic
    ├── contact.js         # Contact Form & FAQ Accordion Logic
    └── social-auth.js    # Demo Social Auth Handlers


Getting Started Locally--

Prerequisites
- Any standard modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
- (Optional) `Node.js` or `python` to run a local HTTP server.

1. Clone the repository:
   ```bash
   git clone https://github.com/Manu1067/Techie-Tornadoes.git
   cd Techie-Tornadoes
   ```

2. Open directly in browser:
   Simply open `index.html` in your browser.

3. Or serve via local server:
   Using Node.js:
   ```bash
   npx serve .
   ```
   Using Python:
   ```bash
   python -m http.server 8080
   ```
   Open `http://localhost:8080` in your browser.



Links & Resources--

- Live Website: [https://techie-tornadoes.vercel.app/](https://techie-tornadoes.vercel.app/)
- GitHub Repository: [https://github.com/Manu1067/Techie-Tornadoes](https://github.com/Manu1067/Techie-Tornadoes)


Copy Rights-

© 2026 **Techie-Tornadoes**. Built for CodeForge WebSprint. All rights reserved.
