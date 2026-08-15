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
        const safeRegistration = { ...registration };
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
 * Check if a candidate is already registered for a SPECIFIC event
 * @param {string} email Email address to check
 * @param {string} eventName Event title to check
 * @returns {boolean} True if already registered for this event
 */
function isDuplicateRegistration(email, eventName) {
    if (!email || !eventName) return false;
    const registrations = getRegistrations();
    const cleanEmail = email.trim().toLowerCase();
    const cleanEvent = eventName.trim().toLowerCase();

    return registrations.some((item) => {
        const itemEmail = (item.email || "").trim().toLowerCase();
        const itemEvent = (item.event || "").trim().toLowerCase();
        return itemEmail === cleanEmail && itemEvent === cleanEvent;
    });
}

/**
 * Check if an email has already been registered in the system
 * @param {string} email Email address to check
 * @returns {boolean} True if email exists in any record
 */
function isDuplicateEmail(email) {
    if (!email) return false;
    const registrations = getRegistrations();
    return registrations.some(
        (item) => item.email && item.email.toLowerCase() === email.trim().toLowerCase()
    );
}

/**
 * Get all registrations associated with a specific email
 * @param {string} email 
 * @returns {Array} Matching registrations
 */
function getRegistrationsByEmail(email) {
    if (!email) return [];
    const registrations = getRegistrations();
    const cleanEmail = email.trim().toLowerCase();
    return registrations.filter(
        (item) => item.email && item.email.trim().toLowerCase() === cleanEmail
    );
}

/**
 * Find registration record by Registration ID
 * @param {string} id 
 * @returns {Object|null}
 */
function getRegistrationById(id) {
    if (!id) return null;
    const registrations = getRegistrations();
    const cleanId = id.trim().toUpperCase();
    return registrations.find((item) => (item.id || "").toUpperCase() === cleanId) || null;
}

/**
 * Generate a unique registration ID formatted as TT-2026-XXXX
 * @returns {string} Unique Registration ID
 */
function generateRegistrationId() {
    const registrations = getRegistrations();
    const existingIds = new Set(registrations.map((r) => (r.id || "").toUpperCase()));

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
    isDuplicateRegistration,
    isDuplicateEmail,
    getRegistrationsByEmail,
    getRegistrationById,
    generateRegistrationId
};
