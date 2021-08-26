var firebaseConfig = {
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

  let db = firebase.firestore();
  let auth = firebase.auth();

  
  //Page index----------------------------------------------------------------------

  //Login


  let userInput = document.getElementById('userEmail');
  let pswInput = document.getElementById('userPassword');


  function login(){

    let userEmail = userInput.value;
    let userPassword = pswInput.value;

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{

      auth.signInWithEmailAndPassword(userEmail, userPassword).then(
        (userLogon) =>{    
          // a ideia é a mesma, eu pego do colection um documento específico, e pego os dados dele    
      db.collection("users").doc(userLogon.user.uid).get().then((doc)=>{        
          let name = doc.data().name;
          let lastName = doc.data().lastName;
          let id = doc.data().id;
          let city = doc.data().city;
          let dietMenu = doc.data().diet;
          let email = doc.data().email;
          let trainingMenu = doc.data().training;
          let image = doc.data().image;
         
        

          localStorage.setItem("user", name);
          localStorage.setItem("user_ln", lastName);
          localStorage.setItem("user_id", id);
          localStorage.setItem("user_city", city);
          localStorage.setItem("user_diet1", dietMenu[0]);
          localStorage.setItem("user_diet2", dietMenu[1]);
          localStorage.setItem("user_diet3", dietMenu[2]);
          localStorage.setItem("user_diet4", dietMenu[3]);
          localStorage.setItem("user_diet5", dietMenu[4]);
          localStorage.setItem("user_diet6", dietMenu[5]);
          localStorage.setItem("user_email", email);
          localStorage.setItem("user_trainingA", trainingMenu[0]);
          localStorage.setItem("user_trainingB", trainingMenu[1]);
          localStorage.setItem("user_trainingC", trainingMenu[2]);
          localStorage.setItem("user_trainingD", trainingMenu[3]);
          localStorage.setItem("user_image", image);
          

          window.location.replace('../dashboard.html');
          })  
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
      // esse tem vem com informações do usuário cadastrado    
      // eu pegaria o id desse valor para poder criar um documento no storage com esse valor.    
      db.collection("users").doc(data.user.uid).set({        
          // Perceba que eu crio um documento em um acoleção específica de 
          // usuários que vai ser setado inicialmente        
          // apenas com nome, dessa forma você guardará informações no firestore      
          name: newUserName,    
          lastName: newUserLN,
          email: newUserEmail,
          id: data.user.uid,
          city: newUserCity,
          image: 'vazio',
          training: ['vazio', 'vazio', 'vazio', 'vazio'],
          diet: ['vazio', 'vazio','vazio','vazio','vazio','vazio',],
          });    
          alert('Usuário criado com Sucesso! :)');
          setTimeout(() => {
            window.location.replace('../index.html');
        }, 1000);
      })  .catch((err) => {    
          //   caso tiver algum erro...    
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
