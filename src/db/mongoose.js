const mongoose= require('mongoose')
const validator=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})


// const me=new User({
//     name:'         MEad       ',
//     email:'          MEad@gmail.com          ',
//     password:'          password'
// })

// me.save().then(()=>{
// console.log(me)
// }).catch((error)=>{
//     console.log('error '+error)
// })






// const task=new tasks({
//     description:'It is forth task                     ',
//     completed: true
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
// console.log(error)
// })