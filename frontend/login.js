
const loginForm=document.getElementById('loginForm')
const login_failed_alert=document.getElementById('failed')
const  success_alert=document.getElementById('success')
login_failed_alert.style='display:none'
success_alert.style='display:none'
if(localStorage.getItem("user")!=null&&JSON.parse(localStorage.getItem("user")).token!=null)
{
  alert('Already logged in')
  
    location.href = './logs.html';
 
}


async function loginData(url , data ) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json() // parses JSON response into native JavaScript objects
  }

  loginForm.addEventListener ('submit',async(e)=>{
    e.preventDefault()
  const email=loginForm.elements['email'].value
  const password=loginForm.elements['password'].value
  try{
  const user= await loginData('/users/login', {email,password})
  login_failed_alert.style='display:none'
  if(user)
  {
    
    localStorage.setItem("user", JSON.stringify(user));
    success_alert.style='display:flex'
    setTimeout(() => {
      location.href = './logs.html';
    }, 1500);
    
    

  }
 
  }
  catch(e)
  {
    login_failed_alert.style='display:flex'
 
}

  })

  
