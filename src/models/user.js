const mongoose= require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('../models/task')




const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true 
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive')
            }
        },
        default:0
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(validator.isEmail(value)===false)
            {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
       minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error('Password should not contain password')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{timestamps:true})

UserSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}
UserSchema.methods.GenerateAuthToken=async function (){
const user=this
const token= jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
user.tokens=user.tokens.concat({token})
await user.save()
return token
}
    

UserSchema.statics.findByCredentials= async(email,password)=>{
    
const user= await User.findOne({email})
if(!user)
{
    throw new Error('Unable to log in')
    
}
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch)
{
    throw new Error('Unable to log in')
}
return user
}



// Hash the plain text password before saving
UserSchema.pre('save',async function(next){
    const user=this
if(user.isModified('password'))
{
    user.password=await bcrypt.hash(user.password,8)
}
next()
})

// Delete tasks when user is removed
UserSchema.pre('remove',async function(next){
    const user=this
  await Task.deleteMany({owner:user._id})
    next()
})





UserSchema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner'
})
const User=mongoose.model('User',UserSchema)



module.exports=User