const express=require("express");
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const port=process.env.PORT | 8000;

const startServer=()=> {
    app.listen(port, ()=> {
        console.log(`Server running on port NO : ${port}`);
    })
}

startServer();

app.get("/", async(req, res)=> {
    return res.status(200).json({message: "HI nithin"})
})

const todos=[
    {
        id: 1,
        taskName: "Name",
        taskDesc: "asdadfadsf",
        deadline: new Date(new Date()+10),
        priority: 1,
        dependencies: [
            2, 3, 4
        ],
        subTasks:[
        ]
    }, 
    {
        id: 2,
        name: "Name",
        deadline: new Date(new Date()+10),
        dependencies: [
        ],
        priority: 2,
    },
    {
        id: 3,
        name: "Name",
        deadline: new Date(new Date()+10),
        dependencies: [
        ],
        priority: 3,
    }
]

app.get("/todos", async(req, res)=> {
    return res.status(200).json({message: "Data retrieved successfully.", data: todos})
})

app.post("/todos", async(req, res)=> {
    try {
        const {todo}=req.body;
        todos.push(todo);
        return res.status(201).json({message: "Todo added succesfully."});
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

app.put("/todo/:id", async(req, res)=> {
    try {
        const {updatedTodo}=req.body;
        const {id}=req.params;
        todos=todos.map(todo=> todo.id===id ? {...todo, ...updatedTodo} : todo);
        return res.status(201).json({message: "Todo updated succesfully."});
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})


app.delete("/todo/:id", async(req, res)=> {
    try {
        const {id}=req.params;
        todos=todos.filter(todo=> todo.id!==id);
        return res.status(200).json({message: "Todo Deleted Succesfully."})
    } catch (error) {
        return res.status(200).json({message: error.message});
    }
})