/*codigo principal donde se controla el flujo de la mayoria de acciones de la pagina,
ademas es donde se importan los productos del .json*/

const abrir = document.getElementById('abrir');
const modal = document.getElementById('id_productos');
const products_div = document.getElementById('productos');
const cerrar = document.getElementById('cerrar');
modal.style.display = "none";

let productos

/*Se importan los datos de los productos y se los reedistribuye en el index y en tienda mediante los atributos
de las etiquetas html. Tambien se pinta en la pagina el div con las clases donde se va a insertar la informacion
de los productos*/
fetch('products.json')
    .then((respuesta) => respuesta.json())
    .then((productosImportados) => {
        productos = productosImportados
        let page = products_div.getAttribute("page")
        let perPage = products_div.getAttribute("per-page")

        if (page === null || perPage === null) {
            page = 0;
            perPage = productosImportados.length
        } else {
            page = parseInt(page) - 1;
            perPage = parseInt(perPage)
        }
        if (perPage > productosImportados.length) {
            perPage = productosImportados.length
        }

        const primerProductoIndex = page * perPage
        const ultimoProductoIndex = primerProductoIndex + perPage

        for (let i = primerProductoIndex; i < ultimoProductoIndex; i++) {
            const producto = productosImportados[i]
            const { imagen, nombre, precio, id } = producto;
            const product_div = document.createElement('div')
            product_div.classList = 'card mt-5'
            product_div.innerHTML = `
            <div class="descripcion img-box">
                <img src="${imagen}" alt="">
                <p class="name">${nombre}</p>
                <p class="precio">$ ${precio}</p>
                <div class="btn_producto"><a href="">Tienda</a></div>
                <div>Agregar <i class="bi bi-cart" data-id="${id}"></i></div>
            </div>
            `
            products_div.appendChild(product_div)
        }
        agregar_eventos_producto();

    })

//Eventos que controla la "pestaña" del carrito
abrir.addEventListener('click', () => {
    modal.style.display = "";
})

cerrar.addEventListener('click', () => {
    modal.style.display = "none";
})

let ventanaCarrito = document.querySelector('.items')
ventanaCarrito.addEventListener('click', borrarProducto);

//Creacion del carrito, se importan los selectores
let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
let precio_final = document.querySelector('.precioTotal');
let cantidad_carrito = document.querySelector('.cantidad');
let cards = document.querySelector('#productos');

//Funcion que limpia la "pestaña" del carrito
function limpiarCarritoHtml() {
    ventanaCarrito.innerHTML = '';
}

//Funcion que controla los productos que se pintan en la "pestaña" del carrito
function interaccion() {
    limpiarCarritoHtml();
    carrito.forEach(producto => {
        let { imagen, nombre, precio, id, cantidad } = producto;
        let car = document.createElement('div');
        car.classList.add('car_style');
        car.innerHTML = `
                <img src="${imagen}" alt=""><i class="borrar_producto bi bi-x-circle-fill" data-id="${id}"></i>
                <p class="name">${nombre}</p>
                <p class="precio_total">${precio}</p>
                <p>Cantidad: ${cantidad}</p>
        `;
        ventanaCarrito.appendChild(car)
    })
    const total = carrito.reduce((acc, producto) => {
        return acc + (producto.precio * producto.cantidad)
    }, 0)
    precio_final.innerHTML = `Total: $ ${total}`;
    cantidad_carrito.innerHTML = carrito.length;
}

interaccion()
//Funcion que añade el evento realizando una comprobacion en la card
function agregar_eventos_producto() {
    cards?.addEventListener('click', agregar_producto);
}

/*Funcion que agrega los productos al carrito mediante el evento target y notifica al usuario
el producto agregaro con la libreria toastify */
function agregar_producto(e) {
    if (e.target.classList.contains('bi-cart')) {
        let productoSeleccionado = e.target.parentElement.parentElement;
        let datoProducto = obtenerDatosProducto(productoSeleccionado)
        datos(datoProducto);
        Toastify({
            text: "Se agregó " + datoProducto.nombre + " al carrito",
            duration: 1000,
            gravity: "top",
            style: {
                background: "linear-gradient(to right, rgb(0, 25, 63), rgba(92, 111, 173, 0.753))",
            }
        }).showToast();
    }
}

/*Funcion que borra elementos del carrito con el evento target y limpia la ventana
con las llamando las funciones de interaccion y limpiarcarrito*/
function borrarProducto(e) {
    if (e.target.classList.contains('borrar_producto')) {
        let borrarId = e.target.getAttribute('data-id');
        carrito = carrito.filter(producto => producto.id !== borrarId)
    }
    if (carrito.length === 0) {
        precio_final.innerHTML = 0;
        cantidad_carrito.innerHTML = 0;
    }
    limpiarCarritoHtml();
    interaccion();
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//Funcion que obtiene los datos del producto creando un objeto
function obtenerDatosProducto(producto) {
    let datoProducto = {
        imagen: producto.querySelector('div img').src,
        nombre: producto.querySelector('.name').textContent,
        precio: parseFloat(producto.querySelector('.precio').textContent.replaceAll("$", "")),
        id: producto.querySelector('div i').getAttribute('data-id'),
        cantidad: 1
    }
    return datoProducto;
}

//Funcion que controla los productos si los productos son iguales
function datos(datoProducto) {
    let mismoProducto = carrito.some(producto => producto.id === datoProducto.id)
    if (mismoProducto) {
        let producto_ = carrito.map(producto => {
            if (producto.id === datoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        carrito = [...producto_];
    } else {
        carrito = [...carrito, datoProducto];
    }
    interaccion();
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//Se almacenan los datos del carrito
let registro = localStorage.getItem('proximo_id')
let id = 0;

if (registro) {
    id = parseInt(registro)
}
class Compra {
    constructor(compras) {
        this.compras = JSON.stringify(compras);
        this.id = id++;
    }
    almacenar_compra() {
        localStorage.setItem(this.id, this.compras)
    }
}

/*Funcion donde el usuario decide comprar, controla si hay elementos
 en el carrito o no y de ahi lo direcciona al usario*/
function comprar() {
    if (carrito.length > 0) {
        window.location.href = '../pages/compra.html'
        carrito = []
    } else {
        Swal.fire({
            title: 'No hay productos en el carrito!',
            text: 'Agregue productos al carrito para comprar',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
    carrito = []
}

//Evento del boton comprar de la "pestaña" del carrito
document.querySelector('.btn_comprar').addEventListener('click', comprar);