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

const SESSION_KEY = "techieTornadoesUser";
const ACCOUNTS_KEY = "techieTornadoesAccounts";

/**
 * Get currently logged-in user object from localStorage
 * @returns {Object|null}
 */
function getCurrentUser() {
    try {
        const data = localStorage.getItem(SESSION_KEY);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error("Error reading current user session:", err);
        return null;
    }
}

/**
 * Save logged-in user session (excluding password)
 * @param {Object} user 
 */
function setCurrentUser(user) {
    try {
        if (!user) {
            clearCurrentUser();
            return;
        }
        const safeUser = {
            fullName: user.fullName || user.name || "User",
            email: (user.email || "").trim().toLowerCase(),
            phone: user.phone || "",
            college: user.college || "",
            year: user.year || "",
            branch: user.branch || ""
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    } catch (err) {
        console.error("Error setting current user session:", err);
    }
}

/**
 * Clear logged-in user session
 */
function clearCurrentUser() {
    try {
        localStorage.removeItem(SESSION_KEY);
    } catch (err) {
        console.error("Error clearing current user session:", err);
    }
}

/**
 * Get all registered user accounts
 * @returns {Array}
 */
function getAccounts() {
    try {
        const data = localStorage.getItem(ACCOUNTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        return [];
    }
}

/**
 * Save or update user account
 * @param {Object} account 
 */
function saveAccount(account) {
    try {
        const accounts = getAccounts();
        const cleanEmail = (account.email || "").trim().toLowerCase();
        const index = accounts.findIndex((a) => (a.email || "").trim().toLowerCase() === cleanEmail);
        
        const accountData = {
            fullName: account.fullName || account.name || "",
            email: cleanEmail,
            phone: account.phone || "",
            college: account.college || "",
            year: account.year || "",
            branch: account.branch || "",
            password: account.password || ""
        };

        if (index >= 0) {
            accounts[index] = { ...accounts[index], ...accountData };
        } else {
            accounts.push(accountData);
        }

        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
        return accountData;
    } catch (err) {
        console.error("Error saving account:", err);
        return null;
    }
}

// Expose globally for modular usage
window.TechieStorage = {
    STORAGE_KEY,
    SESSION_KEY,
    ACCOUNTS_KEY,
    getRegistrations,
    saveRegistration,
    isDuplicateRegistration,
    isDuplicateEmail,
    getRegistrationsByEmail,
    getRegistrationById,
    generateRegistrationId,
    getCurrentUser,
    setCurrentUser,
    clearCurrentUser,
    getAccounts,
    saveAccount
};
