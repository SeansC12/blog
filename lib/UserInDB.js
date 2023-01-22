import { query } from "./db";

export async function isUserInDB(user) {
    // Exit early if the user object is empty
    if (!user) return

    const { sub } = user;

    // Check if user is already in the user database, if user is, return true
    // If not, return false

    const data = await query({ query: "SELECT person_id FROM users WHERE person_id = ?", values: [sub] })

    if (data.person_id.length < 1) {
        return false;
    } else {
        return true;
    }
}