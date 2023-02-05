// pages/api/auth/[...auth0].js
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { query } from '../../../lib/db';

const afterCallback = async (req, res, session, state) => {
    // Extract user related values from the session, email is name
    const { sub, nickname, name } = session.user;

    // Check if user is inside MySql Database, if not, add the user to the table
    const users_with_this_id = await query({ query: "SELECT person_id FROM users WHERE person_id = ?;", values: [sub] })

    console.log(users_with_this_id);

    if (users_with_this_id.length < 1) {
        // Person is not inside the database, so we add the person to the database
        const sqlQuery = "INSERT INTO users (person_id, name, email, status) VALUES (?, ?, ?, ?);";
        const valueParams = [sub, nickname, name, "Bronze"];

        await query({ query: sqlQuery, values: valueParams });

        console.log("success");
    }

    console.log(session.user)

    return session;
};

export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error) {
            throw Error(error.message);
        }
    }
});