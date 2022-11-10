  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getDatabase, onValue, ref, set, child, get, update, remove} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
  import { getStorage,ref as refStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
  import { signOut, getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
// if (sessionStorage.getItem("isAuth") === null || sessionStorage.getItem("isAuth") !== "true") {
//     window.location.href = "login.html";
// }

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
  const auth = getAuth(app);

// Declaración de objetos
var btnInsertar = document.getElementById("btnInsertar");
var btnMostrar = document.getElementById("btnMostrar");
var btnActualizar = document.getElementById("btnActualizar");
var btnBorrar = document.getElementById("btnEliminar");
var btnLimpiar = document.getElementById("btnLimpiar");
var btnTodos = document.getElementById("btnMostrarTodos");
var archivo = document.getElementById('img');
var btnEliminarTabla = document.getElementById('btnEliminarTabla');
var btnCerrarSesion = document.getElementById('btnCerrarSesion');


var codigo = "";
var precio = "";
var nombre = "";
var descripcion = "";
var urlImagen = "";
var estatus = 0;
var nombreImagen = "";

// Limpiar imagen
function limpiar(){
document.getElementById("txtPrecio").value = "";
document.getElementById("txtNombre").value = "";
document.getElementById("txtDescripcion").value = "";
document.getElementById('txtCodigo').value = "";
document.getElementById('url').value = "";
document.getElementById('imagenSeleccionada').src =""; 
document.getElementById('estatus').value="";
document.getElementById('productos').innerHTML = "";
}

function leer() {
  precio = document.getElementById("txtPrecio").value;
  nombre = document.getElementById("txtNombre").value;
  descripcion = document.getElementById("txtDescripcion").value;
  codigo = document.getElementById('txtCodigo').value;
  urlImagen = document.getElementById('url').value;
  estatus = document.getElementById('estatus').value;
}

function insertarDatos() {
    event.preventDefault();
    leer();
    //debugger;
    //alert(codigo + nombre + descripcion + precio + cantidad + urlImagen);
    // Referencia a la base de datos
    const dbref = ref(db);
    if(nombre=="" || descripcion == "" || codigo =="" || precio =="" || urlImagen=="" || estatus==""){
      alert("Complete los campos");
    }else{
      //Validación para que no se repita el producto
      get(child(dbref, "productos/" + codigo))
      .then((snapshot) => {
        if (snapshot.exists() == true) {
          alert('El producto ya existe');
          return;
        }
          set(ref(db,"productos/" + codigo),{
            nombre:nombre,
            precio:precio,
            descripcion:descripcion,
            estatus:estatus,
            urlImagen:urlImagen})
            .then(() => {
              alert("Producto añadido correctamente");
              mostrarProductos();
              })
              .catch((error) => {
              alert("No se pudo insertar el producto -> " + error);
              });  
      })
      .catch((error) => {
        alert("Ocurrio un error " + error);
      });
        
    }
  
  }
  function actualizar() {
    event.preventDefault();
    leer();
    // Referencia a la base de datos
    if(nombre=="" || descripcion == "" || codigo =="" || precio =="" || urlImagen=="" || estatus==""){
      alert("Complete los campos");
    }else {
      update(ref(db, "productos/" + codigo), {
        nombre:nombre,
        precio:precio,
        descripcion:descripcion,
        estatus:estatus,
        urlImagen:urlImagen,
      })
        .then(() => {
          alert("El registro se actualizó correctamente");
          mostrarProductos();
        })
        .catch((error) => {
          alert("No se pudo actualizar -> " + error);
        });
    }
  }
  function mostrarProducto() {
    event.preventDefault();
    leer();
    if(codigo==""){
      alert('Ingresa un código');
      return;
    }
    const dbref = ref(db);
    get(child(dbref, "productos/" + codigo))
      .then((snapshot) => {
        if (snapshot.exists()) {
          nombre = snapshot.val().nombre;
          precio = snapshot.val().precio;
          descripcion = snapshot.val().descripcion;
          estatus = snapshot.val().estatus;
          urlImagen = snapshot.val().urlImagen;
          escribirInputs();
        } else {
          alert("No existe el código");
        }
      })
      .catch((error) => {
        alert("Surgio un error " + error);
      });
  }

  function borrar() {
    event.preventDefault();
    leer();
    // Referencia a la base de datos
    if(codigo =="" ){
      alert("Introduce un código");
    }else {
      update(ref(db, "productos/" + codigo), {
        estatus:1
      })
        .then(() => {
          alert("El Producto ha sido deshabilitado");
          mostrarProductos();
        })
        .catch((error) => {
          alert("No se pudo actualizar -> " + error);
        });
    }
  }
  
  async function cargarImagen(){
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    
    const storageRef = refStorage(storage, 'imagenes/'+name);
    await uploadBytes(storageRef, file).then((snapshot) => {
      nombreImagen = name;
    });
  }
  
  function descargarImagen(){
  
    archivo = nombreImagen;
    const storageRef = refStorage(storage, 'imagenes/'+ archivo);
    // Get the download URL
  getDownloadURL(storageRef)
  .then((url) => {
    document.getElementById('url').value=url;
    document.getElementById('imagenSeleccionada').src=url;
    urlImagen =url;
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        alert("No existe el archivo");
        break;
      case 'storage/unauthorized':
        alert("No tiene permisos");
        break;
      case 'storage/canceled':
        alert("Se canceló la subida")
        break;
  
      // ...
  
      case 'storage/unknown':
        alert("Error desconocido");
        break;
    }
  });
  }

 async function obtnerUrl(){
    await cargarImagen();
    await descargarImagen();
 }

function mostrarProductos(){
  event.preventDefault();
  const dbRef = ref(db, "productos");
  productos.classList.remove("d-none");
  
      productos.innerHTML = `<thead><tr>
					<th scope="col" width="5%" class="text-center">Código</th>
					<th scope="col" width="30%" class="text-center">Nombre</th>
					<th scope="col" width="15%" class="text-center">Precio</th>
					<th scope="col" width="20%" class="text-center">Descripcion</th>
					<th scope="col" width="15%" class="text-center">Imagen</th>
          <th scope="col" width="15%" class="text-center">estatus</th>
				</tr></thead><tbody></tbody>`;
  onValue(dbRef,(snapshot) => {
      

      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        productos.lastElementChild.innerHTML += `<tr>
						<th class="text-center" scope="row">${childKey}</th>
						<td class="text-center">${childData.nombre}</td>
						<td class="text-center">${childData.precio}</td>
						<td class="text-center">${childData.descripcion}</td>
						<td class="text-center p-0"><img class="w-100" src="${childData.urlImagen}" alt="Imagen de ${childData.nombre}"/></td>
            <td class="text-center">${childData.estatus}</td>
					</tr>`;
      });
    },
    {
      onlyOnce: true,
    }
    
  );
}
function EliminarTabla(){
  event.preventDefault();
  productos.classList.add("d-none");
}

function escribirInputs(){
  document.getElementById("txtPrecio").value = precio;
  document.getElementById("txtNombre").value = nombre;
  document.getElementById("txtDescripcion").value = descripcion;
  document.getElementById('txtCodigo').value = codigo;
  document.getElementById('url').value = urlImagen;
  document.getElementById('imagenSeleccionada').src=urlImagen;
  document.getElementById('estatus').value=estatus;
}


    btnCerrarSesion.addEventListener('click',  (e)=>{
        signOut(auth).then(() => {
        alert("SESIÓN CERRADA")
        window.location.href="login.html";
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    });

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


//Listado de eventos
btnInsertar.addEventListener("click", insertarDatos);
archivo.addEventListener("change", obtnerUrl);
btnMostrar.addEventListener('click', mostrarProducto);
btnLimpiar.addEventListener('click', limpiar);
btnBorrar.addEventListener('click', borrar);
btnActualizar.addEventListener('click',actualizar);
btnTodos.addEventListener('click', mostrarProductos);
btnEliminarTabla.addEventListener('click', EliminarTabla);



