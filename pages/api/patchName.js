import { query } from "../../lib/db"

export default async function handler(req, res) {
    try {
        const { name, userID } = JSON.parse(req.body);
        await query({ query: "UPDATE users SET name = ? WHERE person_id = ?;", values: [name, userID] });
        res.status(200).json({ message: "200 OK" });
    } catch (err) {
        res.status(500).json({ message: "500 BAD" });
        throw Error(err);
    }
}