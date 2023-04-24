import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const { user } = JSON.parse(req.body);

    // Add the person to my SQL database
    const queryString = "INSERT INTO users (person_id, name, email, status) VALUES (?, ?, ?, ?);";
    const values = [user.id, user.email, user.email, "Bronze"];

    await query({ query: queryString, values: values });

    res.status(200).send({ message: "200 OK" });
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: err });
  }
}