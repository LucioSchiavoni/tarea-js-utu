class User {
    constructor(nombre, precioConIVA, imagen) {
        this.nombre = nombre;
        this.precioConIVA = precioConIVA;
        this.imagen = imagen;
    }
}

let usuarios = [];

localStorage.getItem("usuarios") ? (usuarios = JSON.parse(localStorage.getItem("usuarios"))) : localStorage.setItem("usuarios", JSON.stringify(usuarios));

const formUser = document.getElementById("formUser");
const handleButton = document.getElementById("handleButton");
const divUser = document.getElementById("divUser");

const tasaIVA = 0.16;

formUser.addEventListener("submit", (e) => {
    e.preventDefault();
    let reservaForm = new FormData(e.target);
    let imagenFile = reservaForm.get("imagen");
    let precioSinIVA = parseFloat(reservaForm.get("precio"));

    if (imagenFile) {
        let reader = new FileReader();

        reader.onload = function () {
            let imagenDataUrl = reader.result;
            let precioConIVA = precioSinIVA * (1 + tasaIVA); 

            let reservaUser = new User(
                reservaForm.get("nombre"),
                precioConIVA.toFixed(2), 
                imagenDataUrl
            );

            usuarios.push(reservaUser);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            formUser.reset();
               Toastify({
        text: "Usuario registrado ",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
    }).showToast();
        };

        reader.readAsDataURL(imagenFile);
    } else {
        alert("Seleccione una imagen.");
    }
});

handleButton.addEventListener("click", () => {
    let arrayUser = JSON.parse(localStorage.getItem("usuarios"));
    let itemDiv = "";
    arrayUser.forEach((usuario, indice) => {
        itemDiv += `<div class="p-8 absolute left-10 border bg-white rounded-lg card w-50 m-auto " id="usuario${indice}">
            <div class="card-body">
                <h2 class="card-title">Nombre: ${usuario.nombre}</h2>
                <p class="card-text">Precio con IVA: $${usuario.precioConIVA}</p>
                <img src="${usuario.imagen}" alt="Imagen de usuario" class="card-text" style="max-width: 100px; max-height: 100px;">
                <button class=" mt-10 px-6 py-1 rounded-lg text-white bg-blue-800 shadow-xl ">Cancelar Registro</button>
            </div>
        </div>`;
    });
    divUser.innerHTML = itemDiv;

    arrayUser.forEach((usuario, indice) => {
        let botonCard = document.getElementById(`usuario${indice}`).lastElementChild.lastElementChild;
        botonCard.addEventListener("click", () => {
            document.getElementById(`usuario${indice}`).remove();
            usuarios.splice(indice, 1);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            console.log(`${usuario.nombre} Fue eliminado`);
              Toastify({
                text: "Usuario eliminado",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #AA000B, #FFFF)",
                },
                onClick: function () { }
            }).showToast();
        });
          
        });
   

});
