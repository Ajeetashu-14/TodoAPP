/*
    Todo { 
        title: string,
        description: string,
        completed: boolean
    }
*/

const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://Ajeetashu14:VkFCqQrhaPFTEfwg@cluster0.2bimbn4.mongodb.net/todos")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo=mongoose.model('todos',todoSchema)

module.exports = {
    todo
}