const mostrar_filtros = document.getElementById('productos')


fetch('/products.json')
    .then((respuesta) => respuesta.json())
    .then((productos) => {
        const todos = productos
        const almacenamiento = productos.filter((productos) => productos.nombre.includes('Disco'))
        const auriculares = productos.filter((productos) => productos.nombre.includes('Auriculares'))
        const fuentes = productos.filter((productos) => productos.nombre.includes('Fuente'))
        const gabinetes = productos.filter((productos) => productos.nombre.includes('Gabinete'))
        const ram = productos.filter((productos) => productos.nombre.includes('Memoria'))
        const monitores = productos.filter((productos) => productos.nombre.includes('Monitor'))
        const mothers = productos.filter((productos) => productos.nombre.includes('Mother'))
        const notebooks = productos.filter((productos) => productos.nombre.includes('Notebook'))
        const procesadores = productos.filter((productos) => productos.nombre.includes('Procesador'))
        const teclados = productos.filter((productos) => productos.nombre.includes('Teclado'))
    })


/* let filtro = document.getElementsByTagName('li')
filtro.addEventListener('click', pintar_filtro) */
let filtro = document.getElementsByTagName("li");
for (let i = 0; i < filtro.length; i++) {
    filtro[i].addEventListener('click', pintar_filtro)
}

let producto_filtro;

function pintar_filtro(e) {
    if (filtro[0]) {
        producto_filtro = todos
    } else if (filtro[1]) {
        producto_filtro = almacenamiento
    } else if (filtro[2]) {
        producto_filtro = auriculares
    } else if (filtro[3]) {
        producto_filtro = fuentes
    } else if (filtro[4]) {
        producto_filtro = gabinetes
    } else if (filtro[5]) {
        producto_filtro = ram
    } else if (filtro[6]) {
        producto_filtro = monitores
    } else if (filtro[7]) {
        producto_filtro = mothers
    } else if (filtro[8]) {
        producto_filtro = notebooks
    } else if (filtro[9]) {
        producto_filtro = procesadores
    } else if (filtro[10]) {
        producto_filtro = teclados
    }

    

    for (let i = 0; i == producto_filtro; i++) {
        const producto_filtrado = producto_filtro[i]
        const { imagen, nombre, precio, id } = producto_filtrado;
        const mostrar_filtro = document.createElement('div')
        mostrar_filtro.classList = 'card mt-5'
        mostrar_filtro.innerHTML = `
            <div class="descripcion img-box">
                <img src="${imagen}" alt="">
                <p class="name">${nombre}</p>
                <p class="precio">$ ${precio}</p>
                <div>Agregar <i class="bi bi-cart" data-id="${id}"></i></div>
            </div>
            `
            mostrar_filtros.appendChild(mostrar_filtro)
    }

    

}

console.log(producto_filtro)