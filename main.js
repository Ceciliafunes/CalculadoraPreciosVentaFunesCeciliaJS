
// Mensaje de bienvenida
alert("¡Bienvenido a calculator precio de venta online!");


//Funcion para soliciar nombre y verificar el mismo
function solicitarNombre () {
    let nombre = prompt("Por favor, ingresa tu nombre para continuar: ");

    if (nombre === "" || nombre === null || !isNaN(nombre)) {
        alert ("Ingresa un nombre válido para continuar");
        return solicitarNombre();
    } else {
        return alert ("Hola " + nombre + " puedes calcular el precio ideal para tus productos");
        
    }
}
solicitarNombre ();

//variables globales
let costoFijo = verificarDatos("Ingresa el costo fijo de tu producto, sin el signo pesos: ");
let costoVariable = verificarDatos("Ingresa el total de costos variables. Ej. : fletes, embalaje,etc. : ");
let ganancia = verificarDatos("Ingresa el margen de ganancia pretendido, sin el signo %. ej.: 50");
let precioVenta = CalculoPrecioVenta(costoFijo, costoVariable, ganancia);


//funcion para validar numeros
function verificarDatos (datos) {
    let numero = parseFloat(prompt(datos));

    while (isNaN(numero) || numero < 0) {
        numero = parseFloat(prompt("Por favor ingresa un numero válido, el mismo debe ser mayor o igual a 0: "));
    }
    return numero;
}

//funcion para calcular precio de venta 

function CalculoPrecioVenta (costoFijo, costoVariable, ganancia) {
    return (costoFijo + costoVariable) / ( 1 - ganancia/100);
}

//funcion para mostrar el resultado de la operacion
function resultado (){
    alert("El precio de venta de tu producto, segun los datos ingresados es: $" + precioVenta);
}
resultado ();

//objeto y funcion constructora

class Costos {
    constructor (costoFijo, costoVariable, ganancia, precioVenta) {
        this.costoFijo = costoFijo;
        this.costoVariable = costoVariable;
        this.ganancia = ganancia;
        this.precioVenta = precioVenta
    }
    listaCostos() {
        console.log("Estos son los datos ingresados: \n" 
        + "Costo fijo: " + (this.costoFijo) + "\n" +
        "Costo variable: " + (this.costoVariable) + "\n"
        + "Ganancia pretendida: " + (this.ganancia) + "%" + "\n" 
        + "El precio de tu producto es: $" + (this.precioVenta));
    }
}
let costos1 = new Costos (costoFijo, costoVariable, ganancia, precioVenta);
costos1.listaCostos();

//array para almacenar datos

const datosIngresados = [];

datosIngresados.push(new Costos(costoFijo, costoVariable, ganancia, precioVenta));

console.log(datosIngresados);



const guardarResultado = datosIngresados.map((el) => el.precioVenta);
console.log(guardarResultado);

const contenedorDatos = document.getElementById("listaDatos");
datosIngresados.forEach( costos => {
    const div = document.createElement("div");
    div.innerHTML = `   <h3> Los datos ingresados son: </h3>
                        <ul><li> El costo fijo es: $${costos.costoFijo}</li>
                        <li> El costo variable es: $${costos.costoVariable}</li>
                        <li> La ganancia pretendida es: ${costos.ganancia}%</li></ul>
                        <p> El precio ideal para su producto segun los datos recolectados es: $${costos.precioVenta}</p>`;
                        listaDatos.appendChild(div);
})  

