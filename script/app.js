const firebaseConfig = {
  apiKey: "AIzaSyCGRMQ0BuiKB-wCZuxyhTyEJQGW_86ARro",
  authDomain: "treinoapp-937bf.firebaseapp.com",
  databaseURL: "https://treinoapp-937bf-default-rtdb.firebaseio.com",
  projectId: "treinoapp-937bf",
  storageBucket: "treinoapp-937bf.appspot.com",
  messagingSenderId: "792663491656",
  appId: "1:792663491656:web:2cd35889a2acc4bbcdc47d",
  measurementId: "G-WS2ERRGGN0"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage =  firebase.storage();

  
  //Page index----------------------------------------------------------------------

  //Login


  let userInput = document.getElementById('userEmail');
  let pswInput = document.getElementById('userPassword');



  function login(){

    let userEmail = userInput.value;
    let userPassword = pswInput.value;

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{

      auth.signInWithEmailAndPassword(userEmail, userPassword).then(
        () =>{       
       console.log('Usuário logado')   
        load(); 
        window.location.replace('../dashboard.html');
      }).catch(error=>{
          alert('Usuário não encontrado!\n Verifique seus dados ou crie um novo usuário :)');
        })
    });
}


//Create User----------------------------------------------------------------------------------------


let inputCreateUser = document.getElementById('inputCreateUser');
let inputCreatePswd = document.getElementById('inputCreatePswd');
let inputUserName = document.getElementById('inputUserName');
let inputUserLastN = document.getElementById('inputUserLastName');
let inputUserCity = document.getElementById('inputUserCity');



function createUser(){
    let newUserEmail = inputCreateUser.value;
    let newUserPassword = inputCreatePswd.value;
    let newUserName = inputUserName.value;
    let newUserLN = inputUserLastN.value;
    let newUserCity = inputUserCity.value;


    auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword).then((data) => {    
  
      //To create the document in firestore
      db.collection("users").doc(data.user.uid).set({        
          name: newUserName,    
          lastName: newUserLN,
          email: newUserEmail,
          id: data.user.uid,
          city: newUserCity,
          image: '../assets/profiledefault.jpg',
          training: ['vazio', 'vazio', 'vazio', 'vazio'],
          diet: ['vazio', 'vazio','vazio','vazio','vazio','vazio',],
          });    
          alert('Usuário criado com Sucesso! :)');
          setTimeout(() => {
            window.location.replace('../index.html');
        }, 1000);
      })  .catch((err) => {        
         alert ('Favor, verifique os dados digitados');
      });

    }



  //Change the password

let email = document.getElementById('email');  

function changePswd(){
   
auth.sendPasswordResetEmail(email.value).then(()=>{
  alert('E-mail enviado!\nVerifique a sua caixa de entrada :)')
  setTimeout(() => {
    window.location.replace('../index.html');
}, 1000);}).catch(error=>
  alert('Favor, verifique os dasos informados!'))

      }
    
//Logout

function logout(){

  auth.signOut().then(()=>{
    window.location.replace('../index.html');
  }).catch(error => {console.log(error)})

}

//editProfile

let fileInput = document.getElementById('fileInput');
let editName = document.getElementById('edit_name_user');
let editLastName = document.getElementById('edit_last_name');
let editCity = document.getElementById('edit_city');


//upload image  
const fileRef = storage.ref('/Images');
let path = ' '


if(fileInput){
  fileInput.addEventListener('change', (e)=>{
    let file = e.target.files[0];
    fileRef.child(file.name).put(file).then(snapshot=>{
      console.log(snapshot);      
      let root = '/Images/';

      let fullPath = root+file.name;
      
      console.log(fullPath)
     
      let refPicture = storage.ref(fullPath);
      refPicture.getDownloadURL().then(url =>{ path = url; return path}).catch(
        err => console.log(err)
      )
    
    })
  });
}



function upgradeprofile (){

firebase.auth().onAuthStateChanged(function (user) {  
  if (user) {    
    db.collection("users").doc(user.uid).get().then((snapshot) => {   
      let id = snapshot.data().id;


      let new_file = fileInput.value;
      let new_name = editName.value;
      let new_lastName = editLastName.value;
      let new_city = editCity.value;

     const userRef = db.collection('users').doc(id);


      if (new_file == '' && new_name == '' &&  new_lastName == ''  && new_city == ''){
        alert('Nenhuma alteração efetuada');
        window.location.replace('../dashboard.html');
      }   else{
              if (new_file != ''){ 
              userRef.update({ image: path }).then(() => {                   
                console.log("imagem atualizada com sucesso");           
              }).catch(err=> alert('Erro ao carregar a Foto', err));
              }

              if (new_name != ''){
                userRef.update({name: new_name}).then(()=>{
                  console.log("Nome atualizado com sucesso")
                }).catch(err=> alert('Erro ao atualizar dados', err));
                
              }
              
              if (new_lastName != ''){
                userRef.update({lastName: new_lastName}).then(
                  ()=>{
                    console.log("Sobrenome atualizado com sucesso")
                  }
                ).catch(err=> alert('Erro ao atualizar dados', err));
              }

              if (new_city != ''){
                userRef.update({city: new_city}).then(()=>{
                  console.log("Cidade atualizada com sucesso")
                }).catch(err=> alert('Erro ao atualizar dados', err));
              }

                load();
                  
     
      }    

    })
  }
})


}



  //Loading DATA...

  function load(){   
    //check if the user is logged in...
    
    firebase.auth().onAuthStateChanged(function (user) {  
      if (user) {    
      db.collection("users").doc(user.uid).get().then((snapshot) => {   
          
      //Session login
      
      let userSession = document.getElementById('userSession');
      let user = `Olá ${snapshot.data().name} <i class="far fa-smile-beam"></i>`;
      
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