const express=require("express")
const { createTodo, updateTodo } = require("./types")

const app=express()
app.use(express.json())

app.post("/todo",function(req,res){
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
})

app.get("/todos",function(req,res){
    //getting all todos
})

app.put("/completed",function(req,res){
    //marking todos completed
    const updatepayLoad=req.body;
    const parsedPayLoad=updateTodo.safeParse(updatepayLoad)
    if(!parsedPayLoad.success){
        res.status(411).json({
            msg: "Wrong inputs"
        })
        return;
    }
})

app.listen(3000)