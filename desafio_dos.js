/* Este codigo es un simulador de prestamos, el usuario ingresara el monto requerido y se le solicitara
en cuantas cuotas desea devolver el prestamo, dependiendo de la cuotas elegidas tendra una especifica carga
de intereses. Por ultimo el usuario tiene que elegir en que banco se le realizara el prestamo y si lo desea
en una moneda extranjera o no. */

alert("Bienvenido/a a Prestamos.AR")

let dinero = parseInt(prompt("Ingrese el monto a solicitar: Min.: $100.000, Max.: $1.000.000. INGRESE EL MONTO SIN LOS PUNTOS"));
let cuotas = parseInt(prompt("Ingrese las cuotas a devolver el prestamo: 12/24/36/48"));

/* Esta funcion calcula el interes del prestamo
dependiendo de las cuotas que elija el usuario siendo
 12/c 10%, 24/c 20%, 36/c 30%, 48/c 40% */
function monto_a_devolver() {
    if (cuotas == 12) {
        let intereses_12 = (dinero * 10) / 100;
        let total_a_devolver = intereses_12 + dinero;
        return total_a_devolver;
    } else if (cuotas == 24) {
        let intereses_24 = (dinero * 20) / 100;
        let total_a_devolver = intereses_24 + dinero;
        return total_a_devolver;
    } else if (cuotas == 36) {
        let intereses_36 = (dinero * 30) / 100;
        let total_a_devolver = intereses_36 + dinero;
        return total_a_devolver;
    } else if (cuotas == 48) {
        let intereses_48 = (dinero * 40) / 100;
        let total_a_devolver = intereses_48 + dinero;
        return total_a_devolver;
    }
}

let total_a_devolver = monto_a_devolver();

//Esta funcion pasa el dinero en peso AR a dolar tomando el valor de referencia $286
function dolar() {
    let dinero_dolar = parseInt (dinero / 286)
    return dinero_dolar
}

//Esta funcion pasa el dinero en peso AR a euro tomando el valor de referencia $312
function euro() {
    let dinero_euro = parseInt (dinero / 312)
    return dinero_euro
}

let moneda = prompt(("Ingrese la moneda en que desea recibir su prestamo: Dolar, Euro, Peso"))

/* while (moneda != "Dolar" || moneda != "Euro" || moneda != "Peso") */
    if (moneda == "Dolar") {
        let dinero_dolar = dolar(dinero)
        alert("Usted recibe " + dinero_dolar + "$" + " dolares a pagar en " + cuotas + " meses . Por el prestamo recibido usted devolvera " + total_a_devolver + "$" + " pesos.");
        alert("Gracias por confiar en Prestamos.AR!");
    } else if (moneda == "Euro") {
        let dinero_euro = euro(dinero)
        alert("Usted recibe " + dinero_euro + "$" + " euros a pagar en " + cuotas + " meses . Por el prestamo recibido usted devolvera " + total_a_devolver + "$" + " pesos.");
        alert("Gracias por confiar en Prestamos.AR!");
    } else if (moneda == "Peso") {
        alert("Usted recibe  " + dinero + "$" + " pesos a pagar en " + cuotas + " meses . Por el prestamo recibido usted devolvera " + total_a_devolver + "$" + " pesos.");
        alert("Gracias por confiar en Prestamos.AR!");
    } else {
        alert("No ingreso la moneda, vuelve a comenzar")
    }

   

