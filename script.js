// Almacena el carrito de compras
let carrito = [];

// Estructura de productos
class Producto 
{
  constructor(id, descripcion, stock, precio) {
    this.id = id;
    this.descripcion = descripcion;
    this.stock = stock;
    this.precio = precio;
    this.cantidad = 0;
  }
}

// Definicion de los productos a mostrar
const stockInicial = [5, 8, 10, 3, 4];

const producto1 = new Producto(1, "Vestido 1", stockInicial[0], 1);
const producto2 = new Producto(2, "Vestido 2", stockInicial[1], 1);
const producto3 = new Producto(3, "Vestido 3", stockInicial[2], 1);
const producto4 = new Producto(4, "Vestido 4", stockInicial[3], 1);
const producto5 = new Producto(5, "Vestido 5", stockInicial[4], 1);

const PRODUCTOS = [producto1, producto2, producto3, producto4, producto5];

// Funcion para mostrar los productos en la pagina
function renderizarProductos()
{
  const cardProductos = document.getElementById("cardProductos");
  cardProductos.className = "row";
  PRODUCTOS.forEach((producto) => 
  {
    let divCard = document.createElement("div");
    divCard.className =
      "col-sm-12 col-md-6 col-lg-4 mx-auto d-flex justify-content-center";
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    if (!productoEnCarrito) 
    {
      divCard.classList.add("oculto");
    }
    divCard.innerHTML = `
      <div class="card text-center border-danger ${productoEnCarrito ? "oculto" : ""}">
          <div class="titulo">${producto.descripcion}</div>
          <div class="imagen"><img src="./img/productos/producto${producto.id}.png" alt="RECIEN NACIDO"></div>
          <div class="stock-precio-cantidad row align-items-center">
            <div class="col">
              <span id="stock-${producto.id}" class="stock">Stock: ${producto.stock}</span>
            </div>
            <div class="col">
              <span class="precio">Precio: $${producto.precio.toFixed(2)}</span>
            </div>
            <div class="col">
              <div class="cantidad-container">
                <label for="cantidad-${producto.id}">Cant:</label>
                <input id="cantidad-${producto.id}" type="number" min="1" max="${producto.stock}" value="1">
              </div>
            </div>
          </div>
          <button class="btn btn-primary pie_card_prod" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      </div> `;
    cardProductos.append(divCard);
  });
}

// Funcion para cargar el carrito almacenado en el Local Storage
function cargarCarritoDesdeLocalStorage() 
{
  const carritoJSON = localStorage.getItem("carrito");
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
  }
}

// Funcion para guardar el carrito en el LocalStorage
function guardarCarritoEnLocalStorage() 
{
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJSON);
}

// Funcion para mostrar el resumen del carrito
function mostrarResumen() 
{
  let resumenHTML = "TOTAL DE LA COMPRA";
  let totalPrecios = 0;
  let totalCantidades = 0;

  // Almacena temporalmente las cantidades de cada producto
  const cantidadesTemp = {};

  // Recorre el carrito y calcula el precio total de cada producto
  for (const producto of carrito) 
  {
    const precioTotalProducto = producto.precio * producto.cantidad;
    totalPrecios += precioTotalProducto;
    totalCantidades += producto.cantidad;

    // Almacena temporalmente la cantidad de cada producto
    if (producto.id in cantidadesTemp) 
    {
      cantidadesTemp[producto.id] += producto.cantidad;
    } else {
      cantidadesTemp[producto.id] = producto.cantidad;
    }

    // Agrega el HTML del producto al resumen
    resumenHTML += `
      <div class="producto-resumen">
        <span class="nombre-producto">${producto.descripcion}</span>
        <span class="cantidad-producto">- Cantidad: ${cantidadesTemp[producto.id]} unidades</span>
        <span class="precio-producto">- Precio: $${precioTotalProducto.toFixed(2)}</span>
      </div> `;
  }

  // Agrega el resumen final con los totales al HTML
  resumenHTML += `
    <div class="total-resumen">
      <span>Total de prendas: ${totalCantidades}</span>
      <span>- Precio final: $${totalPrecios.toFixed(2)}</span>
    </div> `;
  // Actualiza el contenido del elemento HTML con el resumen del carrito
  const resumenCarritoElement = document.getElementById("resumenCarrito");
  resumenCarritoElement.innerHTML = resumenHTML;

  // Muestra el botón "Borrar carrito"
  const borrarCarritoBtn = document.getElementById("borrarCarritoBtn");
  borrarCarritoBtn.style.display = "inline-block";

  const btnMostrarResumen = document.getElementById("btnMostrarResumen");
  btnMostrarResumen.style.display = "inline-block";
}

// Funcion para actualizar el stock en el elemento del DOM correspondiente
function actualizarStock(idProducto, nuevoStock) 
{
  const stockElement = document.getElementById(`stock-${idProducto}`);
  stockElement.innerText = `Stock: ${nuevoStock}`;
}

function borrarCarrito() 
{
  carrito = []; // Vacía el carrito
  for (const producto of PRODUCTOS) 
  {
    producto.stock = stockInicial[producto.id - 1]; // Coloca el stock original de cada producto
    actualizarStock(producto.id, producto.stock);
  }
  swal.fire({
    text: "Carrito vacío",
    icon: "success",
  });
  mostrarResumen(); // Actualiza el resumen del carrito
  guardarCarritoEnLocalStorage(); // Guarda el carrito en el LocalStorage

  const btnMostrarResumen = document.getElementById("btnMostrarResumen");
  btnMostrarResumen.style.display = "inline-block";
  
  const borrarCarritoBtn = document.getElementById("borrarCarritoBtn");
  borrarCarritoBtn.style.display = "inline-block";

}

// Funcion para agregar un producto al carrito
function agregarAlCarrito(idProducto) 
{
  const producto = PRODUCTOS.find((producto) => producto.id === idProducto);
  if (producto) 
  {
    const cantidadSeleccionada = document.getElementById(`cantidad-${idProducto}`).value;
    const cantidad = parseInt(cantidadSeleccionada);
    if (isNaN(cantidad) || cantidad <= 0) 
    {
      swal.fire({
        title: "Error",
        text: "Por favor, ingrese una cantidad válida.",
        icon: "error",
      });
      return;
    }

    if (cantidad > producto.stock) 
    {
      swal.fire({
        title: "Error",
        text: "No hay suficiente stock disponible.",
        icon: "error",
      });
      return;
    }

    producto.stock -= cantidad;

    // Actualizar el stock en el elemento del DOM correspondiente
    actualizarStock(idProducto, producto.stock);

    // Busca el producto en el carrito
    const productoEnCarrito = carrito.find((item) => item.id === idProducto);

    if (productoEnCarrito) 
    {
      // Actualiza la cantidad del producto en el carrito
      productoEnCarrito.cantidad += cantidad;
    } 
    else 
    {
      // Agrega el producto al carrito
      producto.cantidad = cantidad;
      carrito.push(producto);
    }

    // Guarda el carrito en el LocalStorage
    guardarCarritoEnLocalStorage();

    swal.fire({
      title: "Producto agregado",
      text: "El producto ha sido agregado al carrito.",
      icon: "success",
    });
  }
}

// Carga el carrito almacenado en el Local Storage
cargarCarritoDesdeLocalStorage();

// Muestra los productos en la página
renderizarProductos();

// Muestra el resumen del carrito
mostrarResumen();
