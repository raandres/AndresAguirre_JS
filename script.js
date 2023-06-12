// Almacena el carrito de compras
let carrito = [];

// Funcion para mostrar los productos en la pagina
function renderizarProductos() {
  const cardProductos = document.getElementById("cardProductos");
  cardProductos.className = "row";
  PRODUCTOS.forEach((producto) => {
    let divCard = document.createElement("div");
    divCard.className =
      "col-sm-12 col-md-6 col-lg-4 mx-auto d-flex justify-content-center";
    divCard.innerHTML = `
      <div class="card text-center border-danger">
          <div class="titulo">${producto.descripcion}</div>
          <div class="imagen"><img src="./img/productos/producto${producto.id}.png" alt="RECIEN NACIDO"></div>
          <button class="btn btn-primary pie_card_prod" onclick="mostrarRecuadroCantidad(${producto.id})">Comprar</button>
      </div>
      `;
    cardProductos.append(divCard);
  });
}

// Funcion para cargar el carrito almacenado en el Local Storage
function cargarCarritoDesdeLocalStorage() {
  const carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
  }
}

// Funcion para guardar el carrito en el LocalStorage
function guardarCarritoEnLocalStorage() {
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem('carrito', carritoJSON);
}

// Funcion para mostrar el resumen del carrito
function mostrarResumenCarrito() {
  let resumenHTML = "";
  let totalPrecios = 0;
  let totalCantidades = 0;

  // Almacena temporalmente las cantidades de cada producto
  const cantidadesTemp = {};

  // Recorre el carrito y calcula el precio total de cada producto
  for (const producto of carrito) {
    const precioTotalProducto = producto.precio * producto.cantidad;
    totalPrecios += precioTotalProducto;
    totalCantidades += producto.cantidad;

    // Almacena temporalmente la cantidad de cada producto
    if (producto.id in cantidadesTemp) {
      cantidadesTemp[producto.id] += producto.cantidad;
    } else {
      cantidadesTemp[producto.id] = producto.cantidad;
    }

    // Agrega el HTML del producto al resumen
    resumenHTML += `
      <div class="producto-resumen">
        <span class="nombre-producto">${producto.descripcion}</span>
        <span class="cantidad-producto">${cantidadesTemp[producto.id]}</span>
        <span class="precio-producto">$${precioTotalProducto.toFixed(2)}</span>
      </div>
    `;
  }

  // Agrega el resumen final con los totales al HTML
  resumenHTML += `
    <div class="total-resumen">
      <span>Total</span>
      <span>${totalCantidades}</span>
      <span>$${totalPrecios.toFixed(2)}</span>
    </div>
  `;

  // Actualiza el contenido del elemento HTML con el resumen del carrito
  const resumenCarritoElement = document.getElementById("resumenCarrito");
  resumenCarritoElement.innerHTML = resumenHTML;
}

// Funcion para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = PRODUCTOS.find((producto) => producto.id === idProducto);

  if (producto) {
    const cantidadSeleccionada = document.getElementById("input-cantidad").value;
    const cantidad = parseInt(cantidadSeleccionada);

    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor, ingrese una cantidad válida.");
      return;
    }

    if (cantidad > producto.stock) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    producto.stock -= cantidad;

    // Busca el producto en el carrito
    const productoEnCarrito = carrito.find((item) => item.id === idProducto);

    if (productoEnCarrito) {
      // Actualiza la cantidad del producto en el carrito
      productoEnCarrito.cantidad += cantidad;
    } else {
      // Agrega el producto al carrito
      producto.cantidad = cantidad;
      carrito.push(producto);
    }

    // Ocultar el recuadro de cantidad
    document.getElementById("cantidad-seleccionada").style.display = "none";

    // Actualizar el resumen del carrito
    mostrarResumenCarrito();
  } else {
    alert("El producto seleccionado no existe.");
  }
  guardarCarritoEnLocalStorage();
}

// Funcion para mostrar el recuadro de cantidad y configurar el botón de agregar al carrito
function mostrarRecuadroCantidad(idProducto) {
  const cantidadSeleccionadaElement = document.getElementById("cantidad-seleccionada");
  const comprarBtn = document.getElementById("btn-agregar-carrito");

  if (cantidadSeleccionadaElement && comprarBtn) {
    cantidadSeleccionadaElement.style.display = "block";
    comprarBtn.onclick = function () {
      agregarAlCarrito(idProducto);
    };
  } else {
    console.error("Elemento no encontrado. Verifica el ID de los elementos HTML.");
  }
}

// Estructura de productos
class Producto {
  constructor(id, descripcion, stock, precio, carrito) {
    this.id = id;
    this.descripcion = descripcion;
    this.stock = stock;
    this.precio = precio;
    this.cantidad = 0;
  }
}

// Definicion de los productos a mostrar
const producto1 = new Producto(1, "Vestido 1", 5, 1);
const producto2 = new Producto(2, "Vestido 2", 5, 1);
const producto3 = new Producto(3, "Vestido 3", 5, 1);
const producto4 = new Producto(4, "Vestido 4", 5, 1);
const producto5 = new Producto(5, "Vestido 5", 5, 1);

const PRODUCTOS = [producto1, producto2, producto3, producto4, producto5];

renderizarProductos();
