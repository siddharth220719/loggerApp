
const user=JSON.parse(localStorage.getItem("user"));
if(!user)
{
alert('Please login')

    location.href = './login.html'; 


}
const taskAddedAlert=document.getElementById('task')
taskAddedAlert.style='display:none'
const addTaskForm=document.getElementById('addTask')
const token=JSON.parse(localStorage.getItem("user")).token


async function addTask(url , data ) {
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



addTaskForm.addEventListener('submit',async(e)=>{
    taskAddedAlert.style='display:block'
    e.preventDefault()
    const description=document.getElementById('description').value
    const completed=document.getElementById('complete').value
    const task=await addTask('/tasks',{description,completed})
    console.log(task)
setTimeout(() => {
    taskAddedAlert.style='display:none'
}, 1500);
})

const logOut=document.getElementById('logOut')
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
localStorage.removeItem('user')
location.href = './index.html';

})
