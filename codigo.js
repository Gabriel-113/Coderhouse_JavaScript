let cards = document.querySelector('.productos');





eventos();
function eventos() {
    cards.addEventListener('click', agregar_producto);

}

function agregar_producto(e) {
    if (e.target.classList.contains('bi-cart')) {
        const productoSeleccionado = e.target.parentElement;
        datos(productoSeleccionado);
    }
}


function datos(producto) {
    const datoProducto = {
        imagen: producto.querySelector('div img').src,
        nombre: producto.querySelector('.name').textContent,
        precio: producto.querySelector('div p').textContent,
        id: producto.querySelector('div i').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(datoProducto)

}