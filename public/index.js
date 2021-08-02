const login=document.getElementById('login')
const signUp=document.getElementById('signUp')
const logOut=document.getElementById('logOut')
const tasks=document.getElementById('tasks')
const addTasks=document.getElementById('addTasks')
const profile=document.getElementById('profile')


if(sessionStorage.getItem("user")!=null)
{
   

    login.style='display:none'
    signUp.style='display:none'
    logOut.style='display:block'
    tasks.style='display:block'
    addTasks.style='display:block'
    profile.style='display:block'
 
}
else{


login.style='display:block'
signUp.style='display:block'
logOut.style='display:none'
tasks.style='display:none'
    addTasks.style='display:none'
    profile.style='display:none'
}
const token=JSON.parse(sessionStorage.getItem("user")).token


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
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json() // parses JSON response into native JavaScript objects
  }

logOut.addEventListener('click',async(e)=>{
    e.preventDefault()
    const logoutStatus=await logOutUser('/users/logout')
sessionStorage.removeItem('user')
location.href = './index.html';

})
