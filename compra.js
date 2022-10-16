//Codigo funcional en la pagina compra.html

//Se importa el valor total en el carrito desde el codigo.js
const total = carrito.reduce((acc, producto) => {
    return acc + (producto.precio * producto.cantidad)
}, 0)

const formulario = document.getElementById('formulario')

/*Funcion donde se toman los datos que usuario ingresa y los pinta en la pantalla para notificarle
de la compra y que los datos se enviaran al mail ingresado*/
function enviarDatos(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const email = document.getElementById('email').value
    if (carrito.length > 0) {
        let compra = new Compra(carrito)
        compra.almacenar_compra()
        localStorage.setItem('proximo_id', id)
        precio_final.innerHTML = `Total: $ 0`;
        cantidad_carrito.innerHTML = 0;
        limpiarCarritoHtml();
        Swal.fire({
            title: 'Compra confirmada!',
            text: `Gracias ${nombre} ${apellido} por confiar en Tilt | Hardware, su compra por $${total} fue realizada con éxito`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            footer: `El comprobante de su compra se envió a ${email}`
        })
        carrito = []
        localStorage.clear()
    }
    formulario.reset()
}
formulario.addEventListener('submit', enviarDatos)