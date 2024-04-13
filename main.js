
//OBJETO
class Costos {
    constructor (producto, costoFijo, costoVariable, ganancia, precioVenta) {
        this.producto = producto;
        this.costoFijo = costoFijo;
        this.costoVariable = costoVariable;
        this.ganancia = ganancia;
        
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

    let precioVenta = Math.round(costos.CalculoPrecioVenta());

    //Mostrar resultado
    document.getElementById("resultado").innerHTML = `<strong>RESULTADO: $${precioVenta}</strong>`

    datosIngresados.push(new Costos (producto, costoFijo, costoVariable, ganancia));
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
    localStorage.setItem("ultimoDatoIngresado", JSON.stringify(costos))
})


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



