
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








