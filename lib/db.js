import mysql from "mysql2/promise";

let dbConnection;
(async () => {
  dbConnection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
})();

export async function query({ query, values = [] }) {
  // const dbconnection = await mysql.createConnection({
  //   host: process.env.MYSQL_HOST,
  //   database: process.env.MYSQL_DATABASE,
  //   port: process.env.MYSQL_PORT,
  //   user: process.env.MYSQL_USER,
  //   password: process.env.MYSQL_PASSWORD,
  // });
  // try {
  //   const [results] = await dbconnection.execute(query, values);
  //   dbconnection.end();
  //   return results;
  // } catch (error) {
  //   throw Error(error.message);
  // }
  // const dbconnection = await mysql.createPool({
  //   host: process.env.MYSQL_HOST,
  //   database: process.env.MYSQL_DATABASE,
  //   port: process.env.MYSQL_PORT,
  //   user: process.env.MYSQL_USER,
  //   password: process.env.MYSQL_PASSWORD,
  // });
  try {
    const [results] = await dbConnection.execute(query, values);
    // dbConnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}
