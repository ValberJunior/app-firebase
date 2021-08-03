let op1 = document.getElementById('op1');
let op2 = document.getElementById('op2');
let op3 = document.getElementById('op3');
let op4 = document.getElementById('op4');
let btns_back = document.querySelectorAll('.back');
let training = document.getElementsByClassName('training')[0];
let profile = document.getElementsByClassName('profile')[0];
let diet = document.getElementsByClassName('diet')[0];


//option training
op1.addEventListener('click',()=>{
    training.style.display='flex';
})

//option profile
op2.addEventListener('click',()=>{
    profile.style.display='flex';
})

//option training
op3.addEventListener('click',()=>{
    diet.style.display='flex';
})

//Back to menu dashboard;
btns_back.forEach((button)=>{button.onclick = backDashboard});

function backDashboard(){                            //Clean all pop-ups
   training.style.display = 'none';
   profile.style.display = 'none';
   diet.style.display = 'none';
}


// Button Logout
op4.addEventListener('click',()=>{

    let confirmation = window.confirm('Deseja sair do App?')
   
    if(confirmation){
    window.location.replace('../index.html');
    }
});