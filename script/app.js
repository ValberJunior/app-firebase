let btns_back = document.querySelectorAll('.back');
let training = document.getElementsByClassName('training')[0];
let profile = document.getElementsByClassName('profile')[0];
let diet = document.getElementsByClassName('diet')[0];


//Back to menu;
btns_back.forEach((button)=>{button.onclick = backDashboard});

function backDashboard(){
   training.style.display = 'none';
   profile.style.display = 'none';
   diet.style.display = 'none';
}

let op4 = document.getElementById('op4');
op4.addEventListener('click',()=>{
   
    window.location.replace('../index.html');

});