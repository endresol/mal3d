// db.js
import mysql from "mysql2/promise";

export default async function executeQuery({
  query,
  values,
}: {
  query: string;
  values: any[];
}) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT ?? "3306"),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  try {
    const [rows, fields] = await db.execute(query, values);
    await db.end();
    return rows;
  } catch (error) {
    return { error };
  }
}
