import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const sqlQuery = `SELECT blogs.blog_title, blogs.url_name, blogs.description, users.name FROM blogs INNER JOIN users ON users.person_id = blogs.person_id;`;
    const valueParams = [];
    const data = await query({ query: sqlQuery, values: valueParams });

    res.status(200).json({ blogs: data });
  } catch (error) {
    throw Error(error.message);
  }
}
