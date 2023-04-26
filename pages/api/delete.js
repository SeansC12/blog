import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body)

    await query({ query: "DELETE FROM blogs WHERE blog_id = ?", values: [body.blog_id] })

    res.status(200).send({ message: "200 OK" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}