
const user=JSON.parse(localStorage.getItem("user"));
if(!user)
{
alert('Please login')

    location.href = './login.html'; 


}
const token=JSON.parse(localStorage.getItem("user")).token
const updateForm=document.getElementById('updateForm')
updateForm.elements['name'].value=user.user.name
updateForm.elements['age'].value=user.user.age
const update_alert=document.getElementById('update')
update_alert.style='display:none'
const logOut=document.getElementById('logOut')

async function updateProfile(url , data ) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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

updateForm.addEventListener('submit',async(e)=>{
    const name=updateForm.elements['name'].value
    const age=updateForm.elements['age'].value
    const email=updateForm.elements['email'].value
    const password=updateForm.elements['password'].value
    e.preventDefault()
    const user=await updateProfile('/users/me',{name,age,email,password})
    if(user)
    {   
        function update(value){
            let prevData = JSON.parse(localStorage.getItem('user'));
            Object.keys(value).forEach(function(val, key){
                 prevData[val] = value[val];
            })
            localStorage.setItem('user', JSON.stringify(prevData));
        }
        
        update({user})
        
        update_alert.style='display:block'
        setTimeout(() => {
            update_alert.style='display:none'
        }, 2000);
    }
    
})

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
