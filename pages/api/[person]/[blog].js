import { query } from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const { person, blog } = req.query;

    const sqlQuery =
      "SELECT blogs.blog, blogs.blog_title, users.name FROM blogs INNER JOIN users ON users.person_id = blogs.person_id WHERE users.name = ? AND blogs.url_name = ?;";
    const valueParams = [person, blog];

    const data = await query({ query: sqlQuery, values: valueParams });

    // Going to check if this blog post actually exists
    if (data.length !== 0) {
      // Valid blog article
      res.status(200).json({ blogs: data });
    } else {
      // Invalid blog article
      res.status(400).json({ error: "This blog article does not exist" });
    }

    res.status(200).json({ blogs: data });
  } catch (error) {
    throw Error(error.message);
  }
}
