// =====================================================
// TECHIE-TORNADOES
// Storage Module - LocalStorage Operations
// =====================================================

const STORAGE_KEY = "techieTornadoesRegistrations";

/**
 * Retrieve all stored registrations from LocalStorage
 * @returns {Array} List of registration objects
 */
function getRegistrations() {
    try {
        const data = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("registrations");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading registrations from LocalStorage:", error);
        return [];
    }
}

/**
 * Save a new registration to LocalStorage
 * @param {Object} registration Registration object (excluding password)
 * @returns {boolean} Success status
 */
function saveRegistration(registration) {
    try {
        // Ensure security requirement: remove any accidental password field
        const safeRegistration = { ...registration };
        delete safeRegistration.password;
        delete safeRegistration.confirmPassword;

        const registrations = getRegistrations();
        registrations.push(safeRegistration);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
        return true;
    } catch (error) {
        console.error("Error saving registration to LocalStorage:", error);
        return false;
    }
}

/**
 * Check if an email has already been registered
 * @param {string} email Email address to check
 * @returns {boolean} True if email already exists
 */
function isDuplicateEmail(email) {
    if (!email) return false;
    const registrations = getRegistrations();
    return registrations.some(
        (item) => item.email && item.email.toLowerCase() === email.trim().toLowerCase()
    );
}

/**
 * Generate a unique registration ID formatted as TT-2026-XXXX
 * @returns {string} Unique Registration ID
 */
function generateRegistrationId() {
    const registrations = getRegistrations();
    const existingIds = new Set(registrations.map((r) => r.id));

    let id;
    let attempts = 0;
    do {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        id = `TT-2026-${randomNumber}`;
        attempts++;
    } while (existingIds.has(id) && attempts < 1000);

    return id;
}

// Expose globally for modular usage
window.TechieStorage = {
    STORAGE_KEY,
    getRegistrations,
    saveRegistration,
    isDuplicateEmail,
    generateRegistrationId
};
