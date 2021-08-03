let btnCreateUser = document.getElementById('create_user');
let back = document.getElementById('back');

btnCreateUser.addEventListener('click', ()=>{
    
    if(inputCreateUser.value && inputCreatePswd.value !=''){
 
        createUSer();
    
        } else{
            alert('Insira um E-mail e Senha válidos')
        }

})

back.addEventListener('click', ()=>{
    window.location.replace('../index.html')
})


