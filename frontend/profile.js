


const user=JSON.parse(localStorage.getItem("user"));


if(!user)
{
alert('Please login')

    location.href = './login.html'; 


}


const profileUpdatedAlert=document.getElementById('success')
profileUpdatedAlert.style='display:none'
const addTaskForm=document.getElementById('update-profile')
const token=JSON.parse(localStorage.getItem("user")).token


  async function updateProfile(url,data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  window.addEventListener('load', (event) => {
   
    document.getElementById('name').value=user.user.name
    document.getElementById('email').value=user.user.email      
    
  });

addTaskForm.addEventListener('submit',async(e)=>{
    
    e.preventDefault()
    const name=document.getElementById('name').value
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
    user.user.name=name
    user.user.email=email
    const user=await updateProfile('/users/me',{name,email,password})
    
    if(user._id)
    {
        profileUpdatedAlert.style='display:flex'
setTimeout(() => {
   
    profileUpdatedAlert.style='display:none'
    // location.href = './logs.html'; 

}, 700);
    }

    else
    alert('Email already exists')

})

const logOut=document.getElementById('logOut')
const logOut2=document.getElementById('logOut2')

async function logOutUser(url , data ) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization':token

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body:  JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response // parses JSON response into native JavaScript objects
}

async function logout (e)  {
  e.preventDefault()
  const logoutStatus = await logOutUser('/users/logout')
  localStorage.removeItem('user')
  location.href = './index.html';
}
logOut.addEventListener('click',logout)
logOut2.addEventListener('click',logout)

