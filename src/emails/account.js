const sgMail=require('@sendgrid/mail')
const sendWelcomeEmail=async(email,name)=>{
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
try{
await sgMail.send({
    to:email,
    from:'siddharth220719@gmail.com',
    subject:'Welcome to Task-Manager App',
    text: `Welcome to the app, ${name}`
})

}
catch(e)
{
    return (e)
}

}
const sendCancellationEmail=async(email,name)=>{
try{
await sgMail.send({
    to:email,
    from:'siddharth220719@gmail.com',
    subject:'Cancellation email',
    text:`Hi ${name} we are sorry that you are leaving our service`
})
}
catch(e)
{
    return(e)

}
}

module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}

