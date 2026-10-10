
# MERN To-Do List Application

A full-stack To-Do List web application developed using the **MERN stack** — MongoDB, Express.js, React.js, and Node.js.

## Technologies Used

- **MongoDB Atlas** – Database
- **Mongoose** – MongoDB object modeling
- **Express.js** – Backend REST API
- **Node.js** – Server-side runtime
- **React.js** – Frontend user interface
- **Vite** – React development environment
- **CSS** – User interface styling

---

## Project Structure

```text
todo-mern/
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── package.json
    └── ...
```

---

## Features

- Add new tasks
- View all tasks
- Mark tasks as completed or incomplete
- Edit task titles
- Delete tasks
- Data stored permanently in MongoDB Atlas
- RESTful API using Express.js
- React frontend connected to the backend
- No page reload required for task operations
- Responsive and user-friendly interface

---

# Backend Setup

## 1. Navigate to the backend folder

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

The backend uses:

- express
- mongoose
- cors
- dotenv
- nodemon

## 3. Configure MongoDB Atlas

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.avze0jd.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0
```

Replace:

- `<username>` with the MongoDB Atlas database username
- `<password>` with the MongoDB Atlas database password

**Do not share or upload the real MongoDB connection string containing the password.**

The database used by this project is:

```text
todoDB
```

The task collection is:

```text
tasks
```

MongoDB Atlas can create the database and collection automatically when the first task is inserted.

## 4. Start the backend

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal.

## 1. Navigate to the frontend folder

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the React application

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

# REST API Endpoints

The backend provides the following REST API endpoints.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Add a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Example: Add a Task

**POST**

```text
http://localhost:5000/api/tasks
```

Request body:

```json
{
  "title": "Complete MERN assignment"
}
```

## Example: Update a Task

**PUT**

```text
http://localhost:5000/api/tasks/<task_id>
```

Request body:

```json
{
  "completed": true
}
```

## Example: Delete a Task

**DELETE**

```text
http://localhost:5000/api/tasks/<task_id>
```

---

# MongoDB Data Model

The application uses a Mongoose `Task` schema.

```javascript
{
  title: String,
  completed: Boolean,
  createdAt: Date
}
```

### Fields

| Field | Type | Description |
|---|---|---|
| `title` | String | Task description |
| `completed` | Boolean | Completion status |
| `createdAt` | Date | Task creation time |

The `title` field is required.

The `completed` field defaults to:

```text
false
```

The `createdAt` field defaults to the current date and time.

---

# Application Workflow

```text
User
  ↓
React Frontend
  ↓
Express REST API
  ↓
Mongoose
  ↓
MongoDB Atlas
```

### Adding a task

```text
Enter task
    ↓
Click Add Task
    ↓
React sends POST request
    ↓
Express receives request
    ↓
Mongoose saves task
    ↓
MongoDB Atlas stores task
    ↓
React updates the task list
```

### Completing a task

```text
Click checkbox
    ↓
React sends PUT request
    ↓
Backend updates completed status
    ↓
MongoDB Atlas stores change
    ↓
React updates the UI
```

### Deleting a task

```text
Click Delete
    ↓
React sends DELETE request
    ↓
Backend removes task
    ↓
MongoDB Atlas is updated
    ↓
React removes task from screen
```

---

# Running the Complete Application

Two terminals are required.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Open the frontend URL in a browser to use the application.

---

# Testing

The REST APIs can be tested using tools such as **Thunder Client** or **Postman**.

The following operations were tested:

- Adding a task
- Retrieving all tasks
- Updating task completion status
- Editing a task
- Deleting a task
- Storing task data in MongoDB Atlas

---

# Screenshots

The following screenshots can be included as part of the project submission:

1. Adding a new task
2. Task marked as completed
3. Task deleted from the list

---

# Conclusion

This project demonstrates the development of a complete MERN-based To-Do List application. The React frontend communicates with an Express.js REST API, which uses Mongoose to store and manage task data in MongoDB Atlas. Users can add, view, edit, complete, and delete tasks without reloading the page.
