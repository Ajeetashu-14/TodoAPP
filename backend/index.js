const express=require("express")
const { createTodo, updateTodo } = require("./types")
const { todo } =require("./db")
const cors = require("cors")
const app=express()


app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.post("/todo", async function(req,res){
    //creating a todo
    const payLoad=req.body;
    const parsedPayLoad=createTodo.safeParse(payLoad)
    if(!parsedPayLoad.success){
        res.status(411).json({
            msg: "Wrong inputs"
        })
        return;
    }
    //putting data in mongoDB
    await todo.create({
        title: payLoad.title,
        description: payLoad.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })

})

app.get("/todos", async function(req,res){
    //getting all todos
    const todos= await todo.find()
    res.json({
        todos
    })
})

app.put("/completed", async function(req, res) {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ msg: "Missing id" });
    }

    try {
        const result = await todo.updateOne({ _id: id }, { $set: { completed: true } });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json({ msg: "Todo updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

// app.put("/completed", async function(req,res){
//     //marking todos completed
//     const updatepayLoad=req.body;
//     const parsedPayLoad=updatepayLoad.safeParse(updatepayLoad)
//     if(!parsedPayLoad.success){
//         res.status(411).json({
//             msg: "Wrong inputs"
//         })
//         return;
//     }

//     await todo.update({
//         _id: req.body.id
//     },{
//         completed: true
//     })
    
// })

app.listen(3000)