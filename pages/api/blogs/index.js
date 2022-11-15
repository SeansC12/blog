import { query } from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const sqlQuery = "SELECT * FROM blogs;";
    const valueParams = [];
    const data = await query({ query: sqlQuery, values: valueParams });

    res.status(200).json({ blogs: data });
  } catch (error) {
    throw Error(error.message);
  }
}
