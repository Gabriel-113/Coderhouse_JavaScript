/* Codigo funcional en la pagina de tienda.html, controla el filtro*/

//Los productos estan importados en codigo.js y se los trae mediante la variable productos

let filtro = document.getElementsByTagName("li");
for (let i = 0; i < filtro.length; i++) {
    filtro[i].addEventListener('click', pintar_filtro);
}

//Los productos estan importados en codigo.js y se los trae mediante la variable productos

/*Funcion que controla el filtro de los elementos utilizando el id del html y el nombre de los productos,
mostrando en la pantalla dependiendo de la seleccion del usuario*/
function pintar_filtro(e) {
    const productos_filtrados = productos.filter((producto) => {
        return producto.nombre.toLowerCase().includes(e.target.id)
    })

    products_div.innerHTML = ""

    for (let i = 0; i < productos_filtrados.length; i++) {
        const producto_filtrado = productos_filtrados[i]
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
        products_div.appendChild(mostrar_filtro)
    }
}