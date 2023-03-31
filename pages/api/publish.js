import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body);
    const queryString = "INSERT INTO blogs (blog_id, blog_title, blog, person_id, url_name, description) VALUES (?, ?, ?, ?, ?, ?);";
    const values = [body.blog_id, body.blog_title, body.blog, body.person_id, body.url_name, body.description];

    await query({ query: queryString, values: values });

    res.status(200).send({ message: "200 OK" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error })
  }
}