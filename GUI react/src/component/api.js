const API_URL = "http://localhost:3000/users";

/**
 * Registers a new user.
 * @param {Object} user - User data { name, email, password }.
 * @returns {Promise} API response.
 */
export const registerUser = async (user) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

/**
 * Verifies user login credentials.
 * @param {Object} credentials - User credentials { email, password }.
 * @returns {Promise} User data if valid, otherwise null.
 */
export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}?email=${credentials.email}&password=${credentials.password}`);
    const data = await response.json();
    return data.length ? data[0] : null;
};
