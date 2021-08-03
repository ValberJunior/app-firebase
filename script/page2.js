let btnCreatePassword = document.getElementById('create_password');
let back = document.getElementById('back');

btnCreatePassword.addEventListener('click', ()=>{
    if (email.value!=''){
        changePswd()
    } else{
        alert('Digite um e-mail válido')
    }
})

back.addEventListener('click', ()=>{
    window.location.replace('../index.html')
})