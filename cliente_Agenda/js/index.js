function enviar(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let url = "https://app-agenda-39bs.onrender.com/usuario?email="+email+"&password="+password;

    fetch(url, { 
        methods: 'GET',
    })
    .then(res => res.json())
    .then(res => {
        if (res.result != 0){
            localStorage.setItem("id", res.result)
            location.href = "main.html";
        }
        else{
            Swal.fire({
                title: "Login",
                text: "Las credenciales no son correctas",
                icon: "error"
              });
        }
    });

}
