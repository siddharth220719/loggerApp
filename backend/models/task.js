const mongoose= require('mongoose')

const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    priority:{
        type:String,
        required:true,
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User'
    }
  },{timestamps:true})
const tasks=mongoose.model('Tasks',taskSchema)

  module.exports=tasks