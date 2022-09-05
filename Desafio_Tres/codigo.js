/* El codigo es un simulador de compras con carrito, que agrega un descuento registrandose */

//La idea final del trabajo es que este array este representado en imagenes que el usuario veria en la pagina
const productos = [
    { nombre: "procesador", precio: 20000 },
    { nombre: "ram", precio: 9000 },
    { nombre: "mother", precio: 18000 },
    { nombre: "disco interno", precio: 12000 },
    { nombre: "disco solido", precio: 16000 },
    { nombre: "tarjeta de video", precio: 75000 },
    { nombre: "gabinete", precio: 10000 },
    { nombre: "fuente", precio: 14000 },
    { nombre: "monitor", precio: 25000 },
    { nombre: "teclado", precio: 8500 },
    { nombre: "auriculares", precio: 10000 },
    { nombre: "notebook gamer", precio: 85000 },
];

let carrito = [];
let productos_exhibicion = productos.map((producto) => producto.nombre + " " + "$" + producto.precio);

let id = 0;

/*Este objeto funciona para almacenar datos del usuario, la idea es que el usuario no acceda a estos datos
si no que es para la empresa, para el backend, id++ crea un id de usuario por cada usuario nuevo registrado
esto mas adelante con el proyecto se iran almacenando mas de uno, actualmente siempre da 0 */
class Usuario {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.compras = [];
        this.id = id++;
    }

    agregar_compra(compras) {
        this.compras.push(compras)
    } /* La funcion agrega los datos del carrito final del usuario a las compras que la empresa vera desde el back
    actualmente por console.log */
}

alert("Bienvenido a kubrik");
let comprar = prompt("Ir a la tienda: si o no");

/* El simulador contiene los datos que la pagina le va a dar de los productos y el usuario los ira agregando
al carrito siempre y cuando acceda a la tienda, podra agregar varios productos al carrito y finalmente podra comprar
los productos accediendo si asi lo desea a registrarse, obteniendo un descuento del 15% */
while (comprar != "si" && comprar != "no") {
    alert("Estos son nuestros productos " + productos_exhibicion.join(" | "));
    comprar = prompt("Agregar productos al carrito: si o no").toLowerCase()
}
if (comprar == "si") {
    alert("Estos son nuestros productos: " + productos_exhibicion.join(" | "));
    while (comprar != "no") {
        let producto_seleccionado = prompt("Agrega el producto que desea comprar").toLowerCase();
        let producto = productos.find((el) => el.nombre === producto_seleccionado)
        if (producto != undefined) {
            let cantidad_producto = parseInt(prompt("Cantidad de producto a sumar al carrito"));
            carrito.push({ producto, cantidad_producto })
        } else {
            alert("El producto ingresado es incorrecto")
        }
        comprar = prompt("Seguir comprando: si o no")
    }

    let precio_total = carrito.reduce((acc, el) => (acc + (el.producto.precio * el.cantidad_producto)), 0);

    alert("Ir a pagar")

    let usuario1;
    let registro;

    while (registro != "si" && registro != "no") {
        alert("Registrandote obtenes 15% de descuento");
        registro = prompt("Desea registrarse: si o no").toLowerCase()

    }
    if (registro == "si") {
        precio_total = precio_total * 0.85;
        usuario1 = new Usuario(prompt("Ingrese su nombre"), prompt("Ingrese su apellido"), prompt("Ingrese su edad"));
        alert("Usted realizo la compra por un total de " + "$" + precio_total);
        alert("Gracias por confiar kubrik");
        usuario1.agregar_compra(carrito);

        console.log("Datos de usuario" , usuario1);//Seria una simulacion minima de control de datos backend
    } else if (registro == "no") {
        alert("Usted realizo la compra por un total de " + "$" + precio_total);
        alert("Gracias por confiar kubrik");
    }

} else if (comprar == "no") {
    alert("Gracias por visitar kubrik, que tengas buen dia");
}

/*Al codigo le falta mucho, la idea es que el contenido este separado en paginas, una dedicada a la Cuenta 
del usuario. El carrito mas adelante se le agregara metodos de pago, cuotas, envios, descuentos, stock. Por el lado 
del objeto que almacena los datos del usuario la idea es crear una ligera base de datos como referencia para 
"la empresa"*/
