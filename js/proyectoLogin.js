  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBezE0KjyxCn00NvX85-B-mSDuUB_YSt98",
    authDomain: "proyectofinalpw-82c1c.firebaseapp.com",
    projectId: "proyectofinalpw-82c1c",
    storageBucket: "proyectofinalpw-82c1c.appspot.com",
    messagingSenderId: "853015635140",
    appId: "1:853015635140:web:a8f6561ac6613cddcb9591"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

// Autentificación
function iniciarSesion(){
    event.preventDefault();
    let usuario = document.getElementById('txtUsuario').value;
    let contraseña = document.getElementById('txtPassword').value;
  
    if(usuario == "" || contraseña == ""){
      alert('Complete los campos');
      return;
    }
    
    signInWithEmailAndPassword(auth, usuario, contraseña).then((userCredential) => {
    alert('Bienvenido ' + usuario);
    sessionStorage.setItem('isAuth',"true");
    window.location.href = 'proyectoFormulario.html';
    
  })
  .catch((error) => {
    alert('Usuario y o contraseña incorrectos')
  });

  }

  var btnIniciarSesion = document.getElementById('btnInicioSesion');
  btnIniciarSesion.addEventListener('click', iniciarSesion);

onAuthStateChanged(auth, async user => {
    if (user) {
        if (window.location.pathname.includes("login")) {
            window.location.href = "/html/proyectoFormulario.html";
        }
    } else {
        if (window.location.pathname.includes("proyectoFormulario")||window.location.pathname.includes("proyectoformulario")) {
            window.location.href = "/html/login.html";
        }
    }
});

  