 document.onload = load();

 //AOS init
 AOS.init();




let op1 = document.getElementById('op1');
let op2 = document.getElementById('op2');
let op3 = document.getElementById('op3');
let op4 = document.getElementById('op4');
let btns_back = document.querySelectorAll('.back');
let btn_edit = document.getElementById('edit');
let menuTraining = document.getElementsByClassName('training')[0];
let profile = document.getElementsByClassName('profile')[0];
let editProfile = document.getElementsByClassName('editProfile')[0];
let diet = document.getElementsByClassName('diet')[0];


//option training
op1.addEventListener('click',()=>{
    menuTraining.style.display='grid';
    
})

//option profile
op2.addEventListener('click',()=>{
    profile.style.display='grid';
    
})

//option training
op3.addEventListener('click',()=>{
    diet.style.display='grid';
    
})

//Back to menu dashboard;
btns_back.forEach((button)=>{button.onclick = backDashboard});

function backDashboard(){                            //Clean all pop-ups
   menuTraining.style.display = 'none';
   profile.style.display = 'none';
   diet.style.display = 'none';
   editProfile.style.display = 'none';
}


// Button Logout
op4.addEventListener('click',()=>{

    let confirmation = window.confirm('Deseja sair do App?')
   
    if(confirmation){
    logout();
    }
});


//edit profile

btn_edit.addEventListener('click',()=>{
    editProfile.style.display='grid';
})

// Save changes:

let btn_save = document.getElementById('save');

btn_save.addEventListener('click', ()=>{
    let confirmation = window.confirm('Deseja Salvar as alterações?')
    let action = false;
    if(confirmation){
        upgradeprofile();

    } else {
        window.location.replace('../dashboard.html');
    }
})