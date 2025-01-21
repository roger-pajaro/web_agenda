window.onload = function(){


    cargarTabla("ID","ASC");

    let ordenar_nombre = document.getElementById("ordenar_nombre");
    ordenar_nombre.addEventListener("click", ordenar_contactos_nombre);

    let search = document.getElementById("search");
    search.addEventListener("input",buscar_contacto);
}

function cargarTabla(campo,orden){

    let id = localStorage.getItem("id");

    let url = "https://app-agenda-39bs.onrender.com/contactos?id_usuario="+id+"&campo="+campo+"&orden="+orden;

    fetch(url, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
        cargar_datos_tabla(res);
    })
}

function cargar_datos_tabla(res){

    let tabla = document.getElementById("cuerpo-tabla");
    tabla.innerHTML = "";

    for (let i=0; i<res.length; i++){
        let tr = document.createElement("tr");
        let col1 = document.createElement("td");
        col1.innerHTML = res[i].id;
        let col2 = document.createElement("td");
        col2.innerHTML = res[i].nombre;
        let col3 = document.createElement("td");
        col3.innerHTML = res[i].apellidos;
        let col4 = document.createElement("td");
        col4.innerHTML = res[i].direccion;
        let col5 = document.createElement("td");
        col5.innerHTML = res[i].email;
        let col6 = document.createElement("td");
        col6.innerHTML = res[i].telefono;
        let col7 = document.createElement("td");
        let date = new Date(res[i].fechaCreacion);
        col7.innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        let col8 = document.createElement("td");
        col8.innerHTML = '<button onclick="editar_contacto('+res[i].id+');" style="cursor:pointer"><i class="fa fa-pen"></></button>';
        let col9 = document.createElement("td");
        col9.innerHTML = '<button onclick="eliminar_contacto('+res[i].id+')"  style="cursor:pointer"><i class="fa fa-trash"></></button>';

        tabla.appendChild(tr);
        tr.appendChild(col1);
        tr.appendChild(col2);
        tr.appendChild(col3);
        tr.appendChild(col4);
        tr.appendChild(col5);
        tr.appendChild(col6);
        tr.appendChild(col7);
        tr.appendChild(col8);
        tr.appendChild(col9);
       
       
    }
}

function eliminar_contacto(id){

    swal.fire({
        title : 'El contacto será eliminado, ¿Desea continuar?',
        showCancelButton: true,
        confirmButtonText: 'OK',
    }). then((result) =>{
        if (result.isComfirmed){
            eliminar(id);
        }
    })
}

function eliminar(id_contacto){
    let id_usuario = localStorage.getItem("id");
    let url = "https://app-agenda-39bs.onrender.com/contacto?id_usuario="+id_usuario+"&id_contacto="+id_contacto;

    fetch(url, {
        method : 'DELETE',
    })
    .then(res => res.json())
    .then(res => {
        if (res.result != false){
            swal.fire("Eliminar", "Contacto eliminado satisfactoriamente", "success")
            .then(() => {
                location.reload();
            })
        }
        else{
            swal.fire("Eliminar", "Error al eliminar el contacto", "error");
        }
    });
}


function ordenar_contactos_nombre(){

    let ordenar_nombre = document.getElementById("ordenar_nombre");

    if (ordenar_nombre.classList.contains("fa-sort")){
        cargarTabla("NOMBRE","ASC");
        ordenar_nombre.classList.remove("fa-sort");
        ordenar_nombre.classList.add("fa-sort-down");
    }
    else if(ordenar_nombre.classList.contains("fa-sort-down")){
        cargarTabla("NOMBRE","DESC");
        ordenar_nombre.classList.remove("fa-sort-down");
        ordenar_nombre.classList.add("fa-sort-up");
    }
    else if(ordenar_nombre.classList.contains("fa-sort-up")){
        cargarTabla("ID","ASC");
        ordenar_nombre.classList.remove("fa-sort-up");
        ordenar_nombre.classList.add("fa-sort");
    }

}

function buscar_contacto(){
    let id = localStorage.getItem("id");
    let value = document.getElementById("search").value;

    let url = "https://app-agenda-39bs.onrender.com/contactoStr?id_usuario="+id+"&value="+value;

    fetch(url, {
        method : "GET",
    })
    .then(res => res.json())
    .then(res =>{
        cargar_datos_tabla(res);
    })
}

function crear_contacto(){
    sessionStorage.setItem("op","new");
    location.href = "profile.html";
}

function editar_contacto(id){
    sessionStorage.setItem("op","edit");
    sessionStorage.setItem("id_contacto",id);
    location.href = "profile.html";
}