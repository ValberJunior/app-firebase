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
        (userLogon) =>{    
          //Load user data.   
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


//upload image  !IMPORTANT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const fileRef = storage.ref('/Images');
let path = ' '


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

console.log(path)



function upgradeprofile (){


  let id = localStorage.getItem("user_id");
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
            userRef.update({image: path}).then().catch(err=> alert('Erro ao carregar a Foto', err));
          }
          if (new_name != ''){
            userRef.update({name: new_name}).then().catch(err=> alert('Erro ao atualizar dados', err));
          }
          if (new_lastName != ''){
            userRef.update({lastName: new_lastName}).then().catch(err=> alert('Erro ao atualizar dados', err));
          }
          if (new_city != ''){
            userRef.update({city: new_city}).then().catch(err=> alert('Erro ao atualizar dados', err));
          }

          update();
          alert('Usuário Atualizado :)');
  }

}








//update

function update(){

  let id = localStorage.getItem("user_id");
  
  db.collection("users").doc(id).get().then((doc)=>{        
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
}
