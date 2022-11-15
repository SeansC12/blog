import { query } from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const { person } = req.query;
    const currentPersonID = await query({
      query: "SELECT person_id FROM users WHERE name = ?;",
      values: [person],
    });

    const sqlQuery = "SELECT * FROM blogs WHERE person_id = ?;";
    const valueParams = [currentPersonID[0].person_id];
    const data = await query({ query: sqlQuery, values: valueParams });

    res.status(200).json({ blogs: data });
  } catch (error) {
    throw Error(error.message);
  }
}
