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

//Session login

let userSession = document.getElementById('userSession');
let user = localStorage.getItem("user");

userSession.innerHTML = user;

//Loading DATA...

//menu
// menu training
let menu1 = document.getElementById('menu1');

let treinoA = document.getElementById('treinoA');
let treinoB = document.getElementById('treinoB');
let treinoC = document.getElementById('treinoC');
let treinoD = document.getElementById('treinoD');

let trnA = localStorage.getItem("user_trainingA");
let trnB = localStorage.getItem("user_trainingB");
let trnC = localStorage.getItem("user_trainingC");
let trnD = localStorage.getItem("user_trainingD");

treinoA.innerText = trnA;
treinoB.innerText = trnB;
treinoC.innerText = trnC;
treinoD.innerText = trnD;


// menu profile
let menu2 = document.getElementById('menu2');

let profile_picture = document.getElementById('profile_picture');
let name_user = document.getElementById('name_user')
let Last_name = document.getElementById('last_name')
let id_user = document.getElementById('id_user')
let city = document.getElementById('city')
let email_user = document.getElementById('email_user')

let nm = localStorage.getItem("user");
let ln = localStorage.getItem("user_ln");
let id = localStorage.getItem("user_id");
let ct = localStorage.getItem("user_city");
let em = localStorage.getItem("user_email");
let img = localStorage.getItem("user_image");


profile_picture.src = img;
name_user.innerText = nm;
Last_name.innerText = ln;
id_user.innerText = id;
city.innerText = ct;
email_user.innerText = em;


// menu diet
let menu3 = document.getElementById('menu3');

let ref1 = document.getElementById('refeicao1');
let ref2 = document.getElementById('refeicao2');
let ref3 = document.getElementById('refeicao3');
let ref4 = document.getElementById('refeicao4');
let ref5 = document.getElementById('refeicao5');
let ref6 = document.getElementById('refeicao6');

let dietItem1 = localStorage.getItem("user_diet1");
let dietItem2 = localStorage.getItem("user_diet2");
let dietItem3 = localStorage.getItem("user_diet3");
let dietItem4 = localStorage.getItem("user_diet4");
let dietItem5 = localStorage.getItem("user_diet5");
let dietItem6 = localStorage.getItem("user_diet6");

ref1.innerText = dietItem1; 
ref2.innerText = dietItem2; 
ref3.innerText = dietItem3; 
ref4.innerText = dietItem4; 
ref5.innerText = dietItem5; 
ref6.innerText = dietItem6; 


//edit profile

btn_edit.addEventListener('click',()=>{
    editProfile.style.display='grid';
})

// Save changes:

let btn_save = document.getElementById('save');

btn_save.addEventListener('click', ()=>{
    let confirmation = window.confirm('Deseja Salvar as alterações?')

    if(confirmation){
        upgradeprofile();
    } else {
        window.location.replace('../dashboard.html');
    }
})