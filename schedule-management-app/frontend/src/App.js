


import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Chargement initial des tâches depuis l'API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  // Ajouter une nouvelle tâche
  const addTask = () => {
    if (newTask.trim() === "") return; // Empêcher l'ajout de tâches vides
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTask }),
    })
      .then((response) => {
        if (response.ok) {
          setNewTask(""); // Réinitialiser le champ de saisie
          fetchTasks(); // Récupérer les tâches mises à jour
        } else {
          console.error("Failed to add task");
        }
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Supprimer une tâche
  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTasks(tasks.filter((task) => task.id !== id)); // Mettre à jour localement
        } else {
          console.error("Failed to delete task");
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
