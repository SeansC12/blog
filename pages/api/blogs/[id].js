import { query } from "../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const sqlQuery = "SELECT * FROM blogs WHERE `blog_id` = ?;";
    const valueParams = [id];
    const data = await query({ query: sqlQuery, values: valueParams });

    res.status(200).json({ blogs: data });
  } catch (error) {
    throw Error(error.message);
  }
}
