document.onload = load();


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


    //Loading DATA...

 function load(){   
  //check if the user is logged in...
  
  firebase.auth().onAuthStateChanged(function (user) {  
    if (user) {    
    db.collection("users").doc(user.uid).get().then((snapshot) => {   
        
    //Session login
    
    let userSession = document.getElementById('userSession');
    let user = `Olá ${snapshot.data().name} <i class="fas fa-smile"></i>`;
    
    userSession.innerHTML = user;
    
                    
    //menu
    // menu training
    let menu1 = document.getElementById('menu1');
    
    let treinoA = document.getElementById('treinoA');
    let treinoB = document.getElementById('treinoB');
    let treinoC = document.getElementById('treinoC');
    let treinoD = document.getElementById('treinoD');
    
    treinoA.innerText = snapshot.data().training[0];
    treinoB.innerText = snapshot.data().training[1];
    treinoC.innerText = snapshot.data().training[2];
    treinoD.innerText = snapshot.data().training[3];
    
    
    // menu profile
    let menu2 = document.getElementById('menu2');
    
    let profile_picture = document.getElementById('profile_picture')
    let name_user = document.getElementById('name_user')
    let Last_name = document.getElementById('last_name')
    let id_user = document.getElementById('id_user')
    let city = document.getElementById('city')
    let email_user = document.getElementById('email_user')
    
    
    profile_picture.src = snapshot.data().image;
    name_user.innerText = snapshot.data().name;
    Last_name.innerText = snapshot.data().lastName;
    id_user.innerText = snapshot.data().id;
    city.innerText = snapshot.data().city;
    email_user.innerText = snapshot.data().email;
    
    
    // menu diet
    let menu3 = document.getElementById('menu3');
    
    let ref1 = document.getElementById('refeicao1');
    let ref2 = document.getElementById('refeicao2');
    let ref3 = document.getElementById('refeicao3');
    let ref4 = document.getElementById('refeicao4');
    let ref5 = document.getElementById('refeicao5');
    let ref6 = document.getElementById('refeicao6');
    
    
    
    ref1.innerText = snapshot.data().diet[0]; 
    ref2.innerText = snapshot.data().diet[1]; 
    ref3.innerText = snapshot.data().diet[2]; 
    ref4.innerText = snapshot.data().diet[3]; 
    ref5.innerText = snapshot.data().diet[4]; 
    ref6.innerText = snapshot.data().diet[5]; 
  
                           
    });  
    }});
  
 }
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