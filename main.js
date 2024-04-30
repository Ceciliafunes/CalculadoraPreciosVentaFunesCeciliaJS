
//OBJETO
class Costos {
    constructor (producto, costoFijo, costoVariable, ganancia, precioVenta) {
        this.producto = producto;
        this.costoFijo = costoFijo;
        this.costoVariable = costoVariable;
        this.ganancia = ganancia;
        this.precioVenta = precioVenta;
        
    }
}

Costos.prototype.CalculoPrecioVenta = function() {
    if (this.ganancia < 100) {
        return (this.costoFijo + this.costoVariable) / (1- this.ganancia/100);
    } else (this.ganancia >= 100) 
        return ((this.costoFijo + this.costoVariable) * 2);
}



//array para guardar los datos ingresados
let datosIngresados = [];

if(localStorage.getItem("ultimoDatoIngresado")){
    ultimoDatoIngresado = JSON.parse(localStorage.getItem("costos"));
}



let datosUsarios = [];

class Usuario {
    constructor (nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}


//funciones para manejar el envio del formulario

document.getElementById("formulario").addEventListener ("submit", function(e) {
    e.preventDefault();
    
    let producto = document.getElementById("producto").value;
    let costoFijo = parseFloat(document.getElementById("costoFijo").value);
    let costoVariable = parseFloat(document.getElementById("costoVariable").value);
    let ganancia = parseFloat(document.getElementById("ganancia").value);
    

    //validacion de datos
    if (isNaN(costoFijo) || isNaN(costoVariable) || isNaN(ganancia) || costoFijo < 0 || costoVariable < 0 || ganancia < 0) {
        alert("ERROR. por favor complete todos los campos. Con números mayores o iguales a 0");
        return;
    }
    
    //objeto con los valores ingresados
    let costos = new Costos(producto, costoFijo, costoVariable, ganancia);

    let precioVenta = Math.round(costos.CalculoPrecioVenta(),);

    //Mostrar resultado
    document.getElementById("resultado").innerHTML = `<strong>RESULTADO: $${precioVenta}</strong>`

    datosIngresados.push(new Costos (producto, costoFijo, costoVariable, ganancia, precioVenta));
    console.log(datosIngresados);

    //guardamos todos los datos ingresados
    localStorage.setItem("datosIngresados", JSON.stringify(datosIngresados))
    
    let ultimosDatos = [];
    ultimosDatos.push(costos);

    const listaDatos = document.getElementById("listaDatos");

    ultimosDatos.forEach( costos => {
    const div = document.createElement("div");
    div.innerHTML = `   
                        <h4> Producto: ${costos.producto}</h4>
                        <ul><li> El costo fijo es: $${costos.costoFijo}</li>
                        <li> El costo variable es: $${costos.costoVariable}</li>
                        <li> La ganancia pretendida es: ${costos.ganancia}%</li></ul>
                        <h6> El precio ideal es: <strong>$${precioVenta}</strong></h6>
                        `;
                        listaDatos.appendChild(div);
    }) 
    
    //almacenamos los datos capturados
    localStorage.setItem("ultimoDatoIngresado", JSON.stringify(costos));
    


    //sweert alert
    let timerInterval;
    Swal.fire({
        title: "Calculando...",
        html: "aguarda un <b></b> instante .",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
    },
    willClose: () => {
        clearInterval(timerInterval);
    }
}).then((result) => {
      /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        console.log("se cerro el mensaje");
    }
    });
}, 1500);




// Manejar envío de formulario de usuario
document.getElementById("formularioUsuario").addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombres").value;
    let email = document.getElementById("email").value;

    if (!nombre || !email) {
        alert("Por favor, ingrese su nombre y correo electrónico.");
        return;
    }

    let nuevoUsuario = new Usuario (nombre, email)
    console.log(nuevoUsuario);

    datosUsarios.push(nuevoUsuario);
    // Almacenar datos de usuarios en localStorage
    localStorage.setItem("datosUsuarios", JSON.stringify(datosUsarios));

    let ultimoUsuario = [];
    ultimoUsuario.push(nuevoUsuario);
    //almacenamos ultimo usuario

    localStorage.setItem("ultimoUsuario", JSON.stringify(nuevoUsuario));
});



//FUNCIONES PARA ELIMINAR LOS DATOS INGRESADOS

const mostrarDatos = () => {
    listaDatos.innerHTML = "";
}

const eliminarDatos = document.getElementById("eliminarDatos");

eliminarDatos.addEventListener("click", () => {
    vaciarDatos();
})

const vaciarDatos = () => {
    datosIngresados = [];
    mostrarDatos();

    //Vaciar localStorage
    localStorage.clear();
}

//funcion para calcular precio de venta 

function CalculoPrecioVenta (costoFijo, costoVariable, ganancia) {
    return (costoFijo + costoVariable) / ( 1 - ganancia/100);
}


//toastify

eliminarDatos.addEventListener('click', () => {
    Toastify({
        text: "Eliminado",
        duration: 2000,
        gravity: top,
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }
    }).showToast();
})



//USO DE API Y fetch

//API PARA ENVIAR EMAIL CON LOS DATOS ALMACENADOS
//configuramos el evento click como una funcion asincrona

const urlApi = 'https://mail-sender-api1.p.rapidapi.com/';

document.getElementById("formularioUsuario").addEventListener("click", async function(){
    const destinatario = document.getElementById("email").value;
    const asunto = "Listado de precios de venta online";
    const cuerpo = datosCorreo(JSON.parse(localStorage.getItem("datosIngresados")));


    const options = {
        method: `POST`,
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "c21bcd3e93msh076fff1aaccb55dp1f1a91jsnb0f535878a36",
            "X-RapidAPI-Host": "mail-sender-api1.p.rapidapi.com",
        },
        body: JSON.stringify({
            sendto: destinatario,
            replyTo: 'funes.ceciliagisela@gmail.com',
            ishtml: 'false',
            title: asunto,
            body: cuerpo
        })
    }
    try {
        //esperamos a que se resuelva la promesa fetch
        const response = await  fetch(urlApi, options);
        const result = await response.text();
        console.log(result);
        //mensaje de enviado
        animationEnviado();

    } catch (error) {
        console.error(error);
    }
})

// Función para obtener el cuerpo del correo electrónico

function datosCorreo(costosArray) {
    let cuerpo = "Datos Ingresados:\n";
    costosArray.forEach(costos => {
        cuerpo += `Producto: ${costos.producto}\n`;
        cuerpo += `Costo Fijo: ${costos.costoFijo}\n`;
        cuerpo += `Costo Variable: ${costos.costoVariable}\n`;
        cuerpo += `Ganancia: ${costos.ganancia}%\n\n`;
        cuerpo += `Precio de venta: $${costos.precioVenta}\n`;
    });
    return cuerpo;
}


//funcion para animacion de enviado

const enviarDatos = document.getElementById("enviar");

function animationEnviado () {
    enviarDatos.addEventListener(`click`, () => {
        Toastify({
            text: "Enviado",
            duration: 2000,
            gravity: top,
            style: {
                background: "linear-gradient(to right, #05F428, #13CB2E)",
            }
        }).showToast()
    })
}


//SECCION API CLIMA



// Función para obtener el pronóstico del clima en la ubicación del usuario
function obtenerPronosticoClima(latitud, longitud) {
    const apiKey = `8994e8a7f50c41ab90d4e13f0f1c08cf`;
    const urlApiClima = `https://api.weatherbit.io/v2.0/current?lat=${latitud}&lon=${longitud}&key=${apiKey}`;


    // Realizar la solicitud GET a la API
    fetch(urlApiClima)
        
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error en la solicitud fetch.');
    })
    .then(data => {
        mostrarPronosticoClima(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para mostrar el pronóstico del clima en la página

function mostrarPronosticoClima(pronostico) {

    // Aquí procesamos los datos del pronóstico del clima y los mostramos en el sitio web

    const ciudad = pronostico.data[0].city_name;
    const grados = pronostico.data[0].temp;

    const pronosticoDiv = document.createElement("div");
    pronosticoDiv.innerHTML = ` <h3>Clima en tu zona: </h3>
                                <p>Ciudad: ${ciudad}</p>
                                <p>Temperatura: ${grados}°C</p>
                                `;
    document.getElementById("pronosticos").appendChild(pronosticoDiv); 
    console.log(pronostico);
}

// Obtener la ubicación del usuario (latitud y longitud)

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        obtenerPronosticoClima(latitud, longitud);
    }, function(error) {
        console.error('Error al obtener la ubicación del usuario:', error);
    });
} else {
    console.error('Geolocalización no es compatible en este navegador.');
}
