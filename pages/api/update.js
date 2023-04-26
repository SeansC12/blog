import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body);

    const sqlQuery = "UPDATE blogs SET blog_title = ?, blog = ?, url_name = ?, description = ? WHERE person_id = ?";
    const valueParams = [body.blog_title, body.blog, body.url_name, body.description, body.person_id];

    await query({ query: sqlQuery, values: valueParams });

    res.status(200).send({ message: "200 OK" });
  } catch (err) {
    res.status(500).send({ message: err })
  }
}