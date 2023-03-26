import { supabase } from "../../utils/supabase";
import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const { email, password } = JSON.parse(req.body);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      res.status(400).json({ message: "An error has occurred. Please try again later." })
      return
    }


    const { user } = data;

    const users_with_this_id = await query({ query: "SELECT person_id FROM users WHERE person_id = ?;", values: [user.id] });

    // Check if this person is already in the database
    if (users_with_this_id < 1) {
      // Person is not inside the database, so we add the person to the database
      const queryString = "INSERT INTO users (person_id, name, email, status) VALUES (?, ?, ?, ?);";
      const values = [user.id, user.email, user.email, "Bronze"];

      await query({ query: queryString, values: values });
    }

    // Return the data from my MySQL database
    const userObject = await query({ query: "SELECT * FROM users WHERE person_id = ?;", values: [user.id] });

    res.status(200).send({ message: "200 OK", user: userObject[0] });

  } catch (err) {
    console.error(err)
    res.status(500).send({ message: err });
  }
}