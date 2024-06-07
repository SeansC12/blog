const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./blog.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
        person_id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(321) NOT NULL,
        status VARCHAR(100) NOT NULL
      );`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created users table.");

      db.run(
        `
        CREATE TABLE IF NOT EXISTS blogs (
          blog_id VARCHAR(250) PRIMARY KEY,
          blog_title VARCHAR(1000) NOT NULL,
          blog TEXT NOT NULL,
          person_id VARCHAR(100) NOT NULL,
          url_name VARCHAR(1000) NOT NULL,
          description VARCHAR(1000) NOT NULL,
          FOREIGN KEY (person_id) REFERENCES users(person_id)
        );`,
        (err) => {
          if (err) {
            return console.error(err.message);
          }

          console.log("Created blogs table.");

          // Clear the existing data in the products table
          db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log(
              "Closed the database connection. Operation was successful."
            );
          });
        }
      );
    }
  );
});
