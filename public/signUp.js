const signUpForm=document.getElementById('signUpForm')

if(sessionStorage.getItem("user")!=null&&JSON.parse(sessionStorage.getItem("user")).token!=null)
{
  alert('Already logged in')
  
    location.href = './tasks.html';
 
}

async function signUpData(url , data ) {
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


signUpForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const email=signUpForm.elements['email'].value
    const age=parseInt(signUpForm.elements['age'].value)
    const name=signUpForm.elements['name'].value
    const password=signUpForm.elements['password'].value
    console.log(name)
    const user= await signUpData('/users',{name,age,email,password})
    
    if(user.user)
    {
        sessionStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          location.href = './tasks.html';
        }, 1500);
    }


})