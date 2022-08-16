let peso = parseInt(prompt("Ingresa tu peso"))
let planeta = prompt("Ingresa el nombre del planeta con mayuscula")

while (planeta != "Listo") {
    /*La operación se resuelve tomando tres valores,
    el peso ingresado por el usuario, la grevedad en la Tierra que es de 9,8m/s2,
    y por ultimo la gravedad en los otros planetas dato que no ve el usuario*/
    switch (planeta) {
        case "Mercurio":
            //La gravedad en Mercurio es de 3,7m/s2
            peso = (peso * 3, 7) / 9, 8;
            alert("Tu peso en el planeta Mercurio es de" + " " + peso)
            alert("La distancia al sol es de 57.910.000 km");
            break;
        case "Venus":
            //La gravedad en Venus es de 8,87m/s2
            peso = (peso * 8, 87) / 9, 8;
            alert("Tu peso en el planeta Venus es de" + " " + peso)
            alert("La distancia al sol es de 108.200.000 km");
            break;
        case "Marte":
            //La gravedad en Marte es de 3,7m/s2
            peso = (peso * 3, 7) / 9, 8;
            alert("Tu peso en el planeta Marte es de" + " " + peso)
            alert("La distancia al sol es de 227.940.000 km");
            break;
        case "Jupiter":
            //La gravedad en Jupiter es de 24,79m/s2
            peso = (peso * 24, 79) / 9, 8;
            alert("Tu peso en el planeta Jupiter es de" + " " + peso)
            alert("La distancia al sol es de 778.330.000 km");
            break;
        case "Saturno":
            //La gravedad en Saturno es de 10,44m/s2
            peso = (peso * 10, 44) / 9, 8;
            alert("Tu peso en el planeta Saturno es de" + " " + peso)
            alert("La distancia al sol es de 1.429.400.000 km");
            break;
        case "Urano":
            //La gravedad en Urano es de 8,87m/s2
            peso = (peso * 8, 87) / 9, 8;
            alert("Tu peso en el planeta Urano es de" + " " + peso)
            alert("La distancia al sol es de 2.870.990.000 km");
            break;
        case "Neptuno":
            //La gravedad en Neptuno es de 11,15m/s2
            peso = (peso * 11, 15) / 9, 8;
            alert("Tu peso en el planeta Neptuno es de" + " " + peso)
            alert("La distancia al sol es de 4.504.300.000 km");
            break;
        case "Pluton":
            //La gravedad en Pluton es de 0,62m/s2
            peso = (peso * 0, 62) / 9, 8;
            alert("Tu peso en el planeta Venus es de" + " " + peso)
            alert("La distancia al sol es de 5.913.520.000 km. Anteriormente considerado un planeta");
            break;
    }
    peso = parseInt(prompt("Ingresa tu peso"))
    planeta = prompt("Ingresa el nombre del planeta con mayuscula")
}