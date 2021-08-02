const Task = require('../models/task')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    }
    catch (e) {
        res.status(500).send(e)
        
    }
})

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }

})
//Get /tasks?completed=true
//Get /tasks?limit=10&skip=10
//get/tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort={}
    try {
        // const tasks = await Task.find({owner:req.user._id})
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        if(req.query.sortBy)
        {
            const parts=req.query.sortBy.split(':')
            sort[parts[0]]=parts[1]==='desc'? -1 : 1
        }
        // res.status(200).send(tasks)

        await req.user.populate({
            path: 'tasks', match, options: {
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch (e) {
        res.status(500).send()
    }
    // Task.find({}).then((tasks) => {
    //     res.status(200).send(tasks)

    // }).catch((error) => {
    //     res.status(500).send()
    // })
})


router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }
    // Task.findById(id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const Updates = Object.keys(req.body)
    const AllowedUpdates = ['completed', 'description']
    const isAllowedOperation = Updates.every((update) => AllowedUpdates.includes(update))

    if (!isAllowedOperation) {
        return res.status(400).send({ error: 'Invalid operation' })
    }

    try {
        // const task=await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        // const updatedtask = await Task.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        if (!task) { return res.status(404).send() }
        Updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router