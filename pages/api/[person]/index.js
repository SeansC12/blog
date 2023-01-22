import { query } from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const { person: personName } = req.query;

    const sqlQuery =
      "SELECT blogs.blog, blogs.blog_title, blogs.url_name, users.name FROM blogs INNER JOIN users ON users.person_id = blogs.person_id WHERE users.name = ?;";
    const valueParams = [personName];

    const data = await query({ query: sqlQuery, values: valueParams });

    if (data.length !== 0) {
      // Valid person has blog articles
      res.status(200).json({ blogs: data });
    } else {
      // Person has no blog articles: Need to check if the person exists in the database in the first place
      const personWithThisName = await query({ query: "SELECT person_id FROM users WHERE name = ?", values: [personName] });

      if (personWithThisName.length === 0) {
        // This person does not exist
        console.log("broman");
        res.status(500).json({ error: "This person does not exist" });
      } else {
        // This person does exist, it is just that the person has 0 blog articles
        res.status(200).json({ blogs: data });
      }

    }
  } catch (error) {
    throw Error(error.message);
  }
}
