let numeros = [1, 2, 3, 4, 5];

let dobles = numeros.map(num => `<p>Numeros: ${num}</p>`);
console.log(numeros)
console.log(dobles)

const html = dobles.join("");
console.log(html);

const edad = 18;

function puerta(edad = 0){
    if(edad >= 18 && edad <= 45){
        console.log("Puedes pasar")
        return;
    }
    if (edad >= 18 && edad > 45){
        console.log("Vayase a dormir señor")
        return;
    }

    console.log("No Puedes pasar")
}

const dia = 3;

switch(dia){
    case 1:
        console.log("Lunes")
        break;
    case 2:
        console.log("Martes")
        break;
    default: 
        console.log("Es otro dia")
}


const alumno = {
    nombre: "Alejandra",
    edad: 20,
    hobbies: ["Videojuegos", "Musica", "bailar"],
    direccion: {
        calle: "La de mi casa",
        numero: 703,
        lat: "",
        long: ""
    },
    saludar: function(){
        return `H○la soy ${this.nombre} y tengo ${edad} años`
    }
}

console.log(alumno.saludar())

console.log(alumno)
alumno.edad = 21;
console.log(alumno)

//for in - recorre las llaves de un objeto 
//recorre los atributos de un objeto
for(const llave in alumno){
    console.log(`${llave} = ${alumno[llave]}`)
}

//for of -- Rwcoeew los valores de un arreglo o algo iterable
for(const hobbie of alumno.hobbies){
    console.log(hobbie)
}

for(let i = 0; i < alumno.hobbies.length; i++){

}