const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks
// Fetch all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
});


// POST /api/tasks
// Add a new task
router.post("/", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const task = new Task({
            title: title.trim()
        });

        const savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({
            message: "Failed to add task",
            error: error.message
        });
    }
});


// PUT /api/tasks/:id
// Update task
router.put("/:id", async (req, res) => {
    try {
        const { title, completed } = req.body;

        const updateData = {};

        if (title !== undefined) {
            if (title.trim() === "") {
                return res.status(400).json({
                    message: "Task title cannot be empty"
                });
            }

            updateData.title = title.trim();
        }

        if (completed !== undefined) {
            updateData.completed = completed;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });
    }
});


// DELETE /api/tasks/:id
// Delete task
router.delete("/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });
    }
});


module.exports = router;