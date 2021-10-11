const express=require('express')
const User=require('../models/user')
const router=new express.Router()
const auth=require('../middleware/auth')
const multer=require('multer')
const sharp=require('sharp')
const {sendWelcomeEmail,sendCancellationEmail}=require('../emails/account')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        
        const token=await user.GenerateAuthToken()
        sendWelcomeEmail(user.email,user.name)
        res.status(201).send({user,token})
    }
    catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(()=>{
    // res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)

    // })

})
router.post('/users/login', async (req, res) => {
    try{
    const user=await User.findByCredentials(req.body.email,req.body.password)
    const token =await user.GenerateAuthToken()
    res.send({user,token})
    }
    catch(e){
        
    res.status(400).send()
    }
    })

    router.post('/users/logout',auth, async(req,res)=>{
        try{
            req.user.tokens=req.user.tokens.filter((token)=>{
                return token.token!==req.token
            })
            await req.user.save()
            res.send()
        }
        catch(e){

            res.status(500).send()

        }

    })

    router.post('/users/logoutAll',auth, async(req,res)=>{
        try{
           req.user.tokens=[]
            await req.user.save()
            res.send()
        }
        catch(e){

            res.status(500).send()

        }

    })


// router.get('/users/:id', async (req, res) => {
//     const id = req.params.id

//     try {
//         const user = await User.findById(id)
//         if (!user) {
//             return res.status(404).send()

//         }

//         res.status(200).send(user)
//     }

//     catch (e) {
//         res.status(500).send()
//     }
//     // User.findById(id).then((user)=>{
//     //     if(!user)
//     //     {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((error)=>{
//     //     res.status(500).send(error)
//     // })

// })



const upload=multer({limits:{fileSize:1000000},fileFilter(req,file,ch){
if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
{
    return ch(new Error('Please provide jpg,jpeg or png file'))
}
ch(undefined,true)
}})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
res.send()
},(error,req,res,next)=>{
res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
res.send()
},(error,req,res,next)=>{
res.status(400).send({error:error.message})
})

router.get('/users/:id/avatar',async (req,res)=>{
try{
const  user= await User.findById(req.params.id)
if(!user||!user.avatar)
{
    throw new Error()
}
res.set('Content-Type','image/png')
res.send(user.avatar)

}
catch(e)
{
    res.status(400).send()
}



})



router.get('/users_me',auth, async (req, res) => {

   res.send(req.user)
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})

router.patch('/users/me',auth, async (req, res) => {
    const Updates = Object.keys(req.body)
    const AllowedUpdates = ['name', 'email', 'password', 'age']
    const IsValidOperation = Updates.every((update) => AllowedUpdates.includes(update))
    if (!IsValidOperation) {
        return res.status(400).send({ error: 'Invalid operation' })
    }
    try {

     
        Updates.forEach(Update => req.user[Update]=req.body[Update]);
        await req.user.save()
        res.send(req.user)
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        // if (!user) { return res.status(404).send() }
        // res.send(user)

    }
    catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        sendCancellationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

module.exports=router
