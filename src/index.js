require('./db/mongoose')
const Task = require('./models/task')
const express = require('express')
const app = express();
const port = process.env.PORT
const User = require('./models/user');
const { request } = require('express');
const mongoose = require('mongoose')
const UserRouter=require('./routers/user')
const TaskRouter=require('./routers/task')

const path = require('path');
const publicdirectorypath = path.join(__dirname, '../public');

// app.use((req,res)=>{
// res.status(503).send('Site is under maintenance')
// })
// const multer=require('multer')

// const upload=multer({dest:'images'})

// app.post('/upload',upload.single('upload'),(req,res)=>{
// res.send()



// })



app.use(express.json())

app.use(express.static(publicdirectorypath))

app.use(UserRouter)
app.use(TaskRouter)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

