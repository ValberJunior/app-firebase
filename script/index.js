let send = document.getElementById('send');
let btnCreateUser = document.getElementById('createUser');
let btnChangePswd = document.getElementById('changePassword');

send.addEventListener('click',()=>
{
    window.location.replace('../dashboard.html')
});


btnCreateUser.addEventListener('click',()=>
{
    window.location.replace('../page1.html')
});

btnChangePswd.addEventListener('click',()=>{
    window.location.replace('../page2.html')
});