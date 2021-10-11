
const user=JSON.parse(localStorage.getItem("user"));
if(!user)
{
alert('Please login')

    location.href = './login.html'; 


}
const taskAddedAlert=document.getElementById('success')
taskAddedAlert.style='display:none'
const addTaskForm=document.getElementById('add-log')
const token=JSON.parse(localStorage.getItem("user")).token

async function getTasksRequest(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }
  async function updateLog(url,data) {
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

  window.addEventListener('load', async(event) => {
    const log=await getTasksRequest('/tasks/'+localStorage.updateLog)
    
    document.getElementById('log-description').value=log.description
    document.getElementById('priority-level').value=log.priority
    
  });

addTaskForm.addEventListener('submit',async(e)=>{
    taskAddedAlert.style='display:flex'
    e.preventDefault()
    const description=document.getElementById('log-description').value
    const priority=document.getElementById('priority-level').value
    
    const task=await updateLog('/tasks/'+localStorage.updateLog,{description,priority})
    
setTimeout(() => {
    taskAddedAlert.style='display:none'
    location.href = './logs.html'; 

}, 700);
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

