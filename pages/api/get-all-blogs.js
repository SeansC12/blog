import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const sqlQuery = `SELECT * FROM blogs;`;
    const valueParams = [];
    const data = await query({ query: sqlQuery, values: valueParams });

    const index_name_dictionary = await query({
      query: "SELECT person_id, name FROM users;",
      values: [],
    });

    res.status(200).json({ blogs: data, dictionary: index_name_dictionary });
  } catch (error) {
    throw Error(error.message);
  }
}
