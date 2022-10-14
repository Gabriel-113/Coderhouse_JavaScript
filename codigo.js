const abrir = document.getElementById('abrir');
const modal = document.getElementById('id_productos');
const products_div = document.getElementById('productos');
const cerrar = document.getElementById('cerrar');

modal.style.display = "none";



fetch('/products.json')
    .then((respuesta) => respuesta.json())
    .then((productos) => {
        products_div.getAttribute("inicio");
        products_div.getAttribute("tienda");
        if ("tienda") {
            productos.forEach(producto => {
                let { imagen, nombre, precio, id } = producto;
                let product_div = document.createElement('div')
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
            })
            agregar_eventos_producto();
        } else if ("inicio") {


        }
    })

abrir.addEventListener('click', () => {
    modal.style.display = "";
})

cerrar.addEventListener('click', () => {
    modal.style.display = "none";
})

let ventanaCarrito = document.querySelector('.items')
ventanaCarrito.addEventListener('click', borrarProducto);

let carrito = [];
let precio_final = document.querySelector('.precioTotal');
let cantidad_carrito = document.querySelector('.cantidad');
let total = 0;
let cantidadproductos = 0;
let cards = document.querySelector('#productos');

function agregar_eventos_producto() {
    cards?.addEventListener('click', agregar_producto);
}

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

function borrarProducto(e) {
    if (e.target.classList.contains('borrar_producto')) {
        let borrarId = e.target.getAttribute('data-id');
        carrito.forEach(value => {
            if (value.id == borrarId) {
                let precioResta = (value.precio * value.cantidad);
                total = total - precioResta;
            }
        })
        carrito = carrito.filter(producto => producto.id !== borrarId)
        cantidadproductos--;
    }
    if (carrito.length === 0) {
        precio_final.innerHTML = 0;
        cantidad_carrito.innerHTML = 0;
    }
    limpiarCarritoHtml();
    interaccion();
}

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

function datos(datoProducto) {
    total = total + datoProducto.precio;
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
        cantidadproductos++;
    }
    interaccion();
}

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
    precio_final.innerHTML = `Total: $ ${total}`;
    cantidad_carrito.innerHTML = cantidadproductos;
}

function limpiarCarritoHtml() {
    ventanaCarrito.innerHTML = '';
}

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

function comprar() {
    let compra = new Compra(carrito)
    compra.almacenar_compra()
    localStorage.setItem('proximo_id', id)
    carrito = []
    precio_final.innerHTML = `Total: $ 0`;
    total = 0;
    cantidad_carrito.innerHTML = 0;
    limpiarCarritoHtml();
    if (cantidadproductos != 0) {
        Swal.fire({
            title: 'Compra realizada!',
            text: 'Gracias por confiar en Tilt | Hardware',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            footer: 'El comprobante de su compra se envió a su correo electrónico'
        })
        cantidadproductos = 0;
    } else {
        Swal.fire({
            title: 'No hay productos en el carrito!',
            text: 'Agregue productos al carrito para comprar',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}

document.querySelector('.btn_comprar').addEventListener('click', comprar);