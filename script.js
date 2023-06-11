//*****************************************************************
// Estructura de productos
class Producto{
    constructor (id, descripcion, stock, precio, carrito){
        this.id = id,
        this.descripcion = descripcion,
		this.stock = stock,
		this.precio = precio,
		this.carrito = carrito,
		this.cantidad = []
    }
}
//*****************************************************************


//*****************************************************************
// Definicion de los productos a mostrar
const producto1 = new Producto(1, "Galletas",0,1);
const producto2 = new Producto(2, "Yerba",10,2);
const producto3 = new Producto(3, "Azucar",10,3);
const producto4 = new Producto(4, "Te",10,4);
const producto5 = new Producto(5, "Arroz",10,5);

const PRODUCTOS = [producto1,producto2,producto3,producto4,producto5];
//*****************************************************************

//let continuar = true;
//let precioTotal = 0;
//let cantidadTotal = 0;
//let productosSeleccionados = [];
//let cantidadUser = 0;


const cardProductos = document.getElementById("cardProductos");
cardProductos.className = "row";
PRODUCTOS.forEach((producto => {
    let divCard = document.createElement("div");
    divCard.className = "col-sm-12 col-md-6 col-lg-4 mx-auto d-flex justify-content-center";
    divCard.innerHTML = `
        <div class="card text-center border-danger">
            <div class="titulo">${producto.descripcion}</div>
            <div class="imagen"><img src="./img/productos/producto${producto.id}.png" alt="RECIEN NACIDO"></div>
            <input type="button" class="btn btn-primary pie_card_prod" value="Comprar">
            
        </div>
    `;
    cardProductos.append(divCard); 
}));

























//*****************************************************************
// Funcion para validacion de numero ingresado
// Si se ingresa un valor distinto a un numero vuelve a pedirlo
/*
function validarNumero(numero,mensaje)
{
	while(isNaN(numero))
	{
			alert("Ingreso un valor incorrecto, reintente")
			numero = parseInt(prompt(mensaje)); //asigna a numero el valor ingresado por teclado
	}
	return numero;
}*/
//*****************************************************************

//*****************************************************************
// Funcion para mostrar productos en stock
// Si se ingresa un producto con stock 0 pide ingresar otro
/*function mensajeBienvenida ()
{
	let mensajePresentacion = "Productos disponibles: \n Ingrese el numero del producto que desea \n";

	PRODUCTOS.forEach(e => {
		mensajePresentacion += `${e.id} - ${e.descripcion} - Stock: ${e.stock} - Precio: ${e.precio}\n`
	}) //Agrega a mensajePresentacion la lista de productos

	let respuestaUser = parseInt(prompt(mensajePresentacion))
	respuestaUser = validarNumero(respuestaUser,mensajePresentacion); //Verifica el numero ingresado

	let productoSeleccionado = PRODUCTOS.find(elem => elem.id === respuestaUser);
	
	while(productoSeleccionado.stock === 0) //Comprueba el stock del producto elegido
	{
		alert("El producto seleccionado no posee stock por el momento, por favor seleccione otro")
		respuestaUser = parseInt(prompt(mensajePresentacion))
		respuestaUser = validarNumero(respuestaUser,mensajePresentacion);
		productoSeleccionado = PRODUCTOS.find(elem => elem.id === respuestaUser);
	}
	return productoSeleccionado;
}*/
//*****************************************************************

//*****************************************************************
// Funcion para modificar stock, sumar precios y cantidades
/*function ingresarCantidad(producto)
{
	let precio = 0;
	cantidadUser = parseInt(prompt(`Ingrese la cantidad de ${producto.descripcion} que desea`))
	cantidadUser = validarNumero(cantidadUser, cantidadUser);
	while(producto.stock < cantidadUser) //Comprueba si la cantidad deseada es mayor que el stock disponible
	{
		alert("Hay un problema, queres mas de lo que hay :)")
		cantidadUser = parseInt(prompt(`Ingrese la cantidad de ${producto.descripcion} que desea`))
		cantidadUser = validarNumero(cantidadUser, cantidadUser);
	}
	producto.stock -= cantidadUser;
	producto.carrito += cantidadUser;
	producto.cantidad += cantidadUser;
	return producto.precio * cantidadUser;
}*/
//*****************************************************************

//*****************************************************************
// Estructura de productos
/*class Producto{
    constructor (id, descripcion, stock, precio, carrito){
        this.id = id,
        this.descripcion = descripcion,
		this.stock = stock,
		this.precio = precio,
		this.carrito = carrito,
		this.cantidad = []
    }
}*/
//*****************************************************************


//*****************************************************************
// Definicion de los productos a mostrar
/*const producto1 = new Producto(1, "Galletas",0,1);
const producto2 = new Producto(2, "Yerba",10,2);
const producto3 = new Producto(3, "Azucar",10,3);
const producto4 = new Producto(4, "Te",10,4);
const producto5 = new Producto(5, "Arroz",10,5);*/
//*****************************************************************

/*const PRODUCTOS = [producto1,producto2,producto3,producto4,producto5];

let continuar = true;
let precioTotal = 0;
let cantidadTotal = 0;
let productosSeleccionados = [];
let cantidadUser = 0;
*/

//*****************************************************************
// Ciclo de programa principal
/*while (continuar)
{

	const productoSeleccionado = mensajeBienvenida();
	const precioProducto = ingresarCantidad(productoSeleccionado);
	
	precioTotal += precioProducto;
	cantidadTotal += cantidadUser;
	productosSeleccionados.push(productoSeleccionado);
		
	const opcionContinuar = prompt("Desea continuar? Si/No").toLowerCase();
	if(opcionContinuar !== "si" && opcionContinuar !== "sí") //Por cada iteracion pregunta si desea continuar
	{
		continuar = false;
	}
		
}*/
//*****************************************************************

//*****************************************************************
//Resumen de compras realizadas
/*let resumen1 = "Resumen de la seleccion: \n ------------------------------\nProductos seleccionados: \n";

productosSeleccionados.forEach(producto => {
		resumen1 += `- ${producto.descripcion}: $${producto.precio} x ${producto.cantidad} unidades\n`	});
		
resumen1 += `-------------------------------\nCantidad total de productos: ${cantidadTotal}\nPrecio total de productos: $${precioTotal}`

alert(resumen1);
//*****************************************************************
*/