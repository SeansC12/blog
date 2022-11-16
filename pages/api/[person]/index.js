import { query } from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const { person } = req.query;

    const sqlQuery =
      "SELECT blogs.blog, blogs.blog_title FROM blogs INNER JOIN users ON users.person_id = blogs.person_id WHERE users.name = ?;";
    const valueParams = [person];
    const data = await query({ query: sqlQuery, values: valueParams });

    res.status(200).json({ blogs: data });
  } catch (error) {
    throw Error(error.message);
  }
}
