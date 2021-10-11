// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID=mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb') // de structure

const connectionURL = process.env.MONGODB_URL
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error)
        return console.log('Unable to connect to database')

    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     _id:id,
    //     name: 'Sid',
    //     age: '27'
    // }, (error, result) => {
    //     if (error)
    //         return console.log('Unable to insert user')

    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([{
    //     name: 'alex',
    //     age: '29'
    // }, {
    //     name: 'martin',
    //     age: '32'
    // }],(error,result)=>{
    //     if(error)
    //     return console.log('unable to insert documents')
    //     console.log(result.ops)

    // })

    //     db.collection('tasks').insertMany([{
    //         description:'First task',
    //         status:true
    //     },{
    //         description:'Second task',
    //         status:false
    //     },
    //     {
    //       description:'Third task',
    //       status:true
    //     }
    // ],(error,result)=>{
    //     if(error)
    //     return console.log(error)

    //     console.log(result.ops)

    // })
    // db.collection('users').findOne({name:'Sid'},(error,user)=>{
    // if(error)
    // return console.log('Unable to fetch')

    // console.log(user);
    // })

    // db.collection('users').findOne({_id:new ObjectID("60e573d44ce03d038890ccbf")},(error,user)=>{
    //     if(error)
    //     return console.log('Unable to fetch')

    //     console.log(user);
    //     })
    // db.collection('users').find({age:'27'}).toArray((error,users)=>{
    // console.log(users)
    // })

    // db.collection('users').find({age:'27'}).count((error,count)=>{
    //     console.log(count)
    //     })

    // db.collection('tasks').find({status:false}).toArray((error,data)=>{
    // console.log(data);
    // })
    // db.collection('tasks').findOne({id: new ObjectID("60e577463a471e1f3457d8c2")},(error,data)=>{
    // console.log(data);
    // })
    //  db.collection('users').updateOne({_id: new ObjectID("60e57f4b921eec0e6c0da19e")},{$set:{
    //     name:'Andrew'
    // }}).then((result)=>{
    // console.log(result)
    // }).catch((error)=>{
    // console.log(error)
    // })
    // db.collection('users').updateOne({ _id: new ObjectID("60e57f4b921eec0e6c0da19e") }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // db.collection('users').updateMany({name:'mojojo'},{$set:{name:'mojsssojo'}}).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log

    // })

    // db.collection('users').deleteMany({ age: '27' }).then((result) => {
    //     console.log(result.deletedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({description:'First task'}).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })

})