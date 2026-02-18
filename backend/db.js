const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db",          // IMPORTANT: must be "db" (docker service name)
  database: "scheduler",
  password: "root123", // your password
  port: 5432,
});

module.exports = pool;
