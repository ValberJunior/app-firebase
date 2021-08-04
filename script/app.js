var firebaseConfig = {
  apiKey: "AIzaSyBAozfyUdlSuieTsVhwfsAeZ2raRlSb9Kc",
  authDomain: "app-meu-treino-7df6c.firebaseapp.com",
  projectId: "app-meu-treino-7df6c",
  storageBucket: "app-meu-treino-7df6c.appspot.com",
  messagingSenderId: "687046193094",
  appId: "1:687046193094:web:3871af5483c94b2a1accc7",
  measurementId: "G-V70M3QEYEG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  //Page index----------------------------------------------------------------------

  //Login
  
  let auth = firebase.auth();

  let userInput = document.getElementById('userEmail');
  let pswInput = document.getElementById('userPassword');


  function login(){

    let userEmail = userInput.value;
    let userPassword = pswInput.value;

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>{

      auth.signInWithEmailAndPassword(userEmail, userPassword).then(() =>{
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

function createUser(){
    let newUserEmail = inputCreateUser.value;
    let newUserPassword = inputCreatePswd.value;
    
    auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword).then(
        () => {

          generateData();
        
        alert('Usuário criado com Sucesso! :)')
        setTimeout(() => {
          window.location.replace('../index.html');
      }, 1000);}).catch(error =>{
          console.log('Favor, verifique os dados digitados');
        })
        
      }


      function generateData (){   // <<< working on it

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