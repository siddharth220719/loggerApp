
const user=JSON.parse(sessionStorage.getItem("user"));
if(!user)
{
alert('Please login')

    location.href = './login.html'; 


}
else{

    async function getTasksRequest(url) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Authorization':user.token
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
           // body data type must match "Content-Type" header
        })
        return response.json() // parses JSON response into native JavaScript objects
      }
      const getTasks=async()=>{
      const tasks=await getTasksRequest('/tasks?limit=10')
      const table= document.getElementById('tasks')
      const row=document.createElement("tr");
        let i=1;
      tasks.forEach(task => {
          row.innerHTML='<th scope="row">'+i+'</th><td>'+task.description+'</td><td>'+task.completed+'</td>'
          table.appendChild(row.cloneNode(true))
        i++
      });
      
    
    }
getTasks()
   
}


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
      'Authorization':user.token

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
