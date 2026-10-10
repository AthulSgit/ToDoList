import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // GET /api/tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(data);
    } catch (error) {
      setError("Could not load tasks. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };


  // POST /api/tasks
  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title: title.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();

      setTasks((previousTasks) => [
        newTask,
        ...previousTasks
      ]);

      setTitle("");
    } catch (error) {
      setError("Could not add task.");
    }
  };


  // PUT /api/tasks/:id
  const toggleTask = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          completed: !completed
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task._id === updatedTask._id
            ? updatedTask
            : task
        )
      );
    } catch (error) {
      setError("Could not update task.");
    }
  };


  // DELETE /api/tasks/:id
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      setError("Could not delete task.");
    }
  };


  // Edit task title
  const editTask = async (task) => {
    const newTitle = window.prompt(
      "Edit task:",
      task.title
    );

    if (newTitle === null) {
      return;
    }

    if (!newTitle.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title: newTitle.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Failed to edit task");
      }

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item._id === updatedTask._id
            ? updatedTask
            : item
        )
      );
    } catch (error) {
      setError("Could not edit task.");
    }
  };


  return (
    <div className="app">
      <div className="container">

        <header className="header">
          <h1>My To-Do List</h1>

          <p>
            Manage your tasks easily with MERN
          </p>
        </header>


        <form
          className="task-form"
          onSubmit={addTask}
        >
          <input
            type="text"
            placeholder="Enter a new task..."
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

          <button type="submit">
            Add Task
          </button>
        </form>


        {error && (
          <div className="error">
            {error}
          </div>
        )}


        <section className="task-section">

          <div className="section-header">
            <h2>My Tasks</h2>

            <span>
              {tasks.length} task
              {tasks.length !== 1 ? "s" : ""}
            </span>
          </div>


          {loading ? (
            <p className="message">
              Loading tasks...
            </p>
          ) : tasks.length === 0 ? (
            <p className="message">
              No tasks yet. Add your first task!
            </p>
          ) : (
            <div className="task-list">

              {tasks.map((task) => (
                <div
                  className={`task ${
                    task.completed
                      ? "completed"
                      : ""
                  }`}
                  key={task._id}
                >

                  <label className="task-content">

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        toggleTask(
                          task._id,
                          task.completed
                        )
                      }
                    />

                    <span>
                      {task.title}
                    </span>

                  </label>


                  <div className="actions">

                    <button
                      className="edit-button"
                      onClick={() =>
                        editTask(task)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteTask(task._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>


        <footer>
          <p>
            MERN Stack To-Do List Application
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;