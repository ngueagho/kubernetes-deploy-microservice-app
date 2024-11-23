// const express = require("express");
// const { Pool } = require("pg");

// const app = express();
// const pool = new Pool({
//   user: "postgres",
//   host: "db",
//   database: "todoapp",
//   password: "password",
//   port: 5432,
// });

// app.use(express.json());

// // Get all tasks
// app.get("/api/tasks", async (req, res) => {
//   const result = await pool.query("SELECT * FROM tasks");
//   res.json(result.rows);
// });

// // Add a new task
// app.post("/api/tasks", async (req, res) => {
//   const { description } = req.body;
//   await pool.query("INSERT INTO tasks (description) VALUES ($1)", [description]);
//   res.sendStatus(201);
// });

// // Start server
// app.listen(5000, () => {
//   console.log("Backend running on port 5000");
// });




const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "todoapp",
  password: "password",
  port: 5432,
});

app.use(express.json());

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

// Add a new task
app.post("/api/tasks", async (req, res) => {
  const { description } = req.body;
  await pool.query("INSERT INTO tasks (description) VALUES ($1)", [description]);
  res.sendStatus(201);
});

// Supprimer une tâche
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.sendStatus(204); // Réponse appropriée pour une suppression réussie
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
