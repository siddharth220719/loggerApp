const getTasks = async (skip) => {
  const tasks = await getTasksRequest('/tasks?limit=10&skip='+skip)

  const table = document.getElementById('logs')
  table.innerHTML=''
  const row = document.createElement("tr");

  let i = 1;
  tasks.forEach(task => {
  
    row.innerHTML = '<th scope="row">' + i + '</th><td>' + task.priority + '</td><td>' + task.description + '</td> <td class=delete  id='+task._id+' ><a href>Delete</a></td> <td class=update id='+task._id+' value='+task.description+'> <a href= >Update </a></td>'
    table.appendChild(row.cloneNode(true))
    i++
  }
  );
//deleting log

async function deleteTask(url) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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

//deleting log
const deleteLog =document.getElementsByClassName("delete")
for(let child of deleteLog)
{
  child.addEventListener('click',async function (e){
    // document.getElementById('id01').style.display='block'
    e.preventDefault()
    const deletedtask=await deleteTask('/tasks/'+this.id)
    location.href = './logs.html';

  }
  
  )
}
//updating log

const updateLog =document.getElementsByClassName("update")
for(let child of updateLog)
{
  child.addEventListener('click',async function (e){
    // document.getElementById('id01').style.display='block'
    e.preventDefault()
    // const deletedtask=await deleteTask('/tasks/'+this.id)
    localStorage.setItem('updateLog',this.id)
    location.href = './updatelog.html';

  }
  
  )
}

}
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  alert('Please login')

  location.href = './login.html';


}
else {


  getTasks('0')

}



 
  


const paginationDisplay = async () => {

  const tasks = await getTasksRequest('/tasks?limit=0')
  const pagination = Math.ceil(tasks.length / 10)
  const paginationItem = document.getElementById('pagination')
  const a = document.createElement("a");
  for (let i = 1; i <= pagination; i++) {
    a.id = `pagination${i}`
    a.innerHTML = i

    a.href = ''
  
    a.className='paginationElements'
    
    // a.addEventListener('click',displayNextTasks())
    
    paginationItem.appendChild(a.cloneNode(true))
  }
  //set active pagination element
  const elementActive = document.getElementById('pagination1')
  elementActive.className = 'active'

  //setting events 

  for(i=1;i<=pagination;i++)
  {

    const element=document.getElementById(`pagination${i}`)
   
    element.addEventListener('click', async function (e){
      e.preventDefault()
       //removing other active links
    const pagination =document.getElementById("pagination").childNodes.forEach((child)=>child.className='inactive')
    
      this.className='active'
     await getTasks((this.id.replace('pagination','')*10)-10)
    })
  }
}
paginationDisplay()









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

const logOut = document.getElementById('logOut')
const logOut2 = document.getElementById('logOut2')

async function logOutUser(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.token

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response // parses JSON response into native JavaScript objects
}

async function logout (e)  {
  e.preventDefault()
  const logoutStatus = await logOutUser('/users/logout')
  localStorage.removeItem('user')
  location.href = './index.html';
}
logOut.addEventListener('click', logout)
logOut2.addEventListener('click', logout)




