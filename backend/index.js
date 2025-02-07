const express=require("express");
const cors=require('cors');
const { default: mongoose } = require("mongoose");
const Tasks = require("./models/task");

const app=express();
app.use(cors());
app.use(express.json());

const port=process.env.PORT | 8000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/smartTodoList";

const startServerAndConnectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connected...");
        app.listen(port, () => {
            console.log(`🚀 Server running on port NO: ${port}`);
        });
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
};

startServerAndConnectDB();

app.get("/", async(req, res)=> {
    return res.status(200).json({message: "HI nithin"})
})


app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Tasks.find();
        return res.status(200).json({ message: "Data retrieved successfully.", data: tasks });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const {task}=req.body;
        const { taskName, taskDesc, subtasks, dependencies, priority, deadline } = task;
        const newTask = new Tasks({ taskName, taskDesc, subtasks, dependencies, priority, deadline });
        await newTask.save();
        return res.status(201).json({ message: "Todo added successfully.", data: newTask });
    } catch (error) {
        return res.status(400).json({ message: "Error adding todo", error: error.message });
    }
});

app.put("/tasks", async (req, res) => {
    try {
        const { task } = req.body;
        const {id}=task;
        const updatedTask = await Tasks.findByIdAndUpdate(id, task, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Todo not found." });
        }
        return res.status(200).json({ message: "Todo updated successfully.", data: updatedTask });
    } catch (error) {
        return res.status(400).json({ message: "Error updating todo", error: error.message });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deletedTask = await Tasks.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Todo not found." });
        }
        return res.status(200).json({ message: "Todo deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting todo", error: error.message });
    }
});
