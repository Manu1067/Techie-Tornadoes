// =====================================================
// TECHIE-TORNADOES
// SEARCH & FILTER FUNCTIONALITY
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    initializeSearchAndFilters();
});

function initializeSearchAndFilters() {
    const searchInput = document.querySelector(".search-box input");
    const searchBtn = document.querySelector(".search-button");
    const categorySelects = document.querySelectorAll(".filter-select");
    const categorySelect = categorySelects[0] || null; // Category select
    const dateSelect = categorySelects[1] || null;     // Date select
    const chipButtons = document.querySelectorAll(".category-filter");

    let currentSearchQuery = "";
    let currentCategory = "all";
    let currentDate = "all";

    function applyFilters() {
        if (!window.TechFestEvents || !window.TechFestEvents.events) return;

        const allEvents = window.TechFestEvents.events;

        const filtered = allEvents.filter((event) => {
            // 1. Text Search Filter
            const query = currentSearchQuery.toLowerCase().trim();
            const matchesText =
                !query ||
                event.name.toLowerCase().includes(query) ||
                event.categoryName.toLowerCase().includes(query) ||
                event.description.toLowerCase().includes(query) ||
                event.location.toLowerCase().includes(query);

            // 2. Category Filter
            const eventCat = (event.category || "").toLowerCase();
            const selectedCat = currentCategory.toLowerCase();
            const matchesCategory =
                selectedCat === "all" ||
                selectedCat === "" ||
                eventCat === selectedCat ||
                event.categoryName.toLowerCase() === selectedCat;

            // 3. Date Filter
            const selectedDate = currentDate.toLowerCase();
            const matchesDate =
                selectedDate === "all" ||
                selectedDate === "" ||
                (event.monthYear && event.monthYear.toLowerCase() === selectedDate) ||
                (event.date && event.date.toLowerCase().includes(selectedDate));

            return matchesText && matchesCategory && matchesDate;
        });

        // Re-render filtered list
        if (window.TechFestEvents.renderEvents) {
            window.TechFestEvents.renderEvents(filtered);
        }
    }

    // --- Search Input Event (Real-time + Enter key) ---
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearchQuery = e.target.value;
            applyFilters();
        });

        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                currentSearchQuery = searchInput.value;
                applyFilters();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (searchInput) currentSearchQuery = searchInput.value;
            applyFilters();
        });
    }

    // --- Category Dropdown Select ---
    if (categorySelect) {
        categorySelect.addEventListener("change", (e) => {
            currentCategory = e.target.value.toLowerCase();
            syncChipActiveState(currentCategory);
            applyFilters();
        });
    }

    // --- Date Dropdown Select ---
    if (dateSelect) {
        dateSelect.addEventListener("change", (e) => {
            currentDate = e.target.value.toLowerCase();
            applyFilters();
        });
    }

    // --- Category Filter Chips ---
    chipButtons.forEach((chip) => {
        chip.addEventListener("click", () => {
            chipButtons.forEach((c) => c.classList.remove("active"));
            chip.classList.add("active");

            const chipText = chip.textContent.trim().toLowerCase();

            if (chipText.includes("all events")) {
                currentCategory = "all";
            } else if (chipText.includes("coding")) {
                currentCategory = "coding";
            } else if (chipText.includes("robotics")) {
                currentCategory = "robotics";
            } else if (chipText.includes("cyber")) {
                currentCategory = "cybersecurity";
            } else if (chipText.includes("innovation")) {
                currentCategory = "innovation";
            } else if (chipText.includes("workshop")) {
                currentCategory = "workshop";
            } else if (chipText.includes("cloud")) {
                currentCategory = "cloud";
            } else {
                currentCategory = chipText;
            }

            // Sync with select dropdown if present
            if (categorySelect) {
                const options = Array.from(categorySelect.options);
                const matchingOpt = options.find((opt) => opt.text.toLowerCase().includes(currentCategory));
                if (matchingOpt) {
                    categorySelect.value = matchingOpt.value;
                } else if (currentCategory === "all") {
                    categorySelect.selectedIndex = 0;
                }
            }

            applyFilters();
        });
    });

    function syncChipActiveState(categorySlug) {
        chipButtons.forEach((chip) => {
            const chipText = chip.textContent.trim().toLowerCase();
            let isMatch = false;

            if (categorySlug === "all" || categorySlug === "") {
                isMatch = chipText.includes("all events");
            } else {
                isMatch = chipText.includes(categorySlug.replace("cybersecurity", "cyber"));
            }

            if (isMatch) {
                chip.classList.add("active");
            } else {
                chip.classList.remove("active");
            }
        });
    }
}
