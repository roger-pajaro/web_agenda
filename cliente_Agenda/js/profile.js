window.onload = function(){

    let op = sessionStorage.getItem("op");
    let id_contacto = sessionStorage.getItem("id_contacto");


    if (op == "edit"){
        document.getElementById("boton").innerText = "Editar contacto";
        cargarDatos(id_contacto);
    }
    else{
        document.getElementById("bloque_id").style.display = "none";
        document.getElementById("boton").innerText = "Crear contacto";
    }
}

function cargarDatos(id_contacto){

    let url = "https://app-agenda-39bs.onrender.com/contacto?id_contacto="+id_contacto;

    fetch(url, {
        method : 'GET',
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById("id").value = res.id;
        document.getElementById("nombre").value = res.nombre;
        document.getElementById("apellidos").value = res.apellidos;
        document.getElementById("direccion").value = res.direccion;
        document.getElementById("email").value = res.email;
        document.getElementById("telefono").value = res.telefono;
    })
}

function operar(){

    let op = sessionStorage.getItem("op");

    if(op == "edit"){
        editar_contacto();
    }
}

function editar_contacto(){
    swal.fire({
        title : 'El contacto será editado, ¿Desea continuar?',
        showCancelButton: true,
        confirmButtonText: 'OK',
    }). then((result) =>{
        if (result.isComfirmed){
            editar();
        }
    })
}

function editar(){
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    
    let url = "https://app-agenda-39bs.onrender.com/contacto?id="+id+"&nombre"+nombre+
              "&apellidos"+apellidos+"&direccion"+direccion+"&email"+email+"&telefono"+telefono;

    fetch(url, {
        method : 'PUT',
    })
    .then(res => res.json())
    .then(res => {
         if(res.result != false){
            swal.fire("Editar", "Contacto editado satisfactoriamente", "success")
        .then(()=>{
            sessionStorage.clear();
            location.href = "main.html";
        })
        }
        else{
            swal("Editar", "Error al editar el contacto", "error");
        }      
    })         
}

function crear_contacto(){
    swal.fire({
        title : 'El contacto será creado, ¿Desea continuar?',
        showCancelButton: true,
        confirmButtonText: 'OK',
    }). then((result) =>{
        if (result.isComfirmed){
            crear();
        }
    })
}

function crear(){
    let id_usuario = localStorage.getItem("id");
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    
    let url = "https://app-agenda-39bs.onrender.com/contacto?id="+id+"&nombre"+nombre+
              "&apellidos"+apellidos+"&direccion"+direccion+"&email"+email+"&telefono"+telefono;

    
    fetch(url, {
        method : 'POST',
        })
        .then(res => res.json())
        .then(res => {
            if(res.result != false){
                swal.fire("Crear", "Contacto creado satisfactoriamente", "success")
        .then(()=>{
            sessionStorage.clear();
            location.href = "main.html";
            })
        }
        else{
            swal("Editar", "Error al crear el nuevo contacto", "error");
        }      
    })       


}


