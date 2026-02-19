const { Pool } = require("pg");   // ✅ YOU FORGOT THIS LINE

const pool = new Pool({
  user: "postgres",
  host: "scheduler-db",   // docker service name
  database: "scheduler",
  password: "root123",
  port: 5432,
});

module.exports = pool;
