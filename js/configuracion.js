  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getDatabase, onValue, ref, set, child, get, update, remove} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
  import { getStorage,ref as refStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

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
  const db = getDatabase();
  const storage = getStorage();

let productos = document.getElementById('contenedorProductos');
window.addEventListener('DOMContentLoaded',mostrarProductos)

function mostrarProductos(){
    const dbRef = ref(db, "productos");
  
    onValue(dbRef,(snapshot) => {
        productos.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          
          if(childData.estatus=="0"){
            productos.innerHTML +=
            "<div class="+"'ProductoCont'"+"> " +
            "<img src="+" "+childData.urlImagen+" "+"> " +
            "<h3>"+childData.nombre +"</h3>"+
            "<h3> "+childData.descripcion +"</h3>"+
            "<h3>$ "+childData.precio +"</h3>"+
            "<a class='button'>Comprar</a>"+
            "</div>";
          }
          
        });
      },
      {
        onlyOnce: true,
      }
    );
}