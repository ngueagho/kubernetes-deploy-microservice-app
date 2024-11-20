from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import sqlite3

app = FastAPI()

# Configuration de la base de données SQLite
conn = sqlite3.connect("tasks.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT)")
conn.commit()

# Modèles de données
class Task(BaseModel):
    id: int
    title: str

class TaskCreate(BaseModel):
    title: str

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    return [{"id": row[0], "title": row[1]} for row in cursor.fetchall()]

@app.post("/tasks", response_model=Task)
def create_task(task: TaskCreate):
    cursor.execute("INSERT INTO tasks (title) VALUES (?)", (task.title,))
    conn.commit()
    task_id = cursor.lastrowid
    return {"id": task_id, "title": task.title}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
