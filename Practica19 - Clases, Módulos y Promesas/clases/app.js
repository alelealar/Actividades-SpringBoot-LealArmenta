import * as obj from "./Saludo.mjs"

console.log(obj.saludar("Alejandra"));
console.log("Este es el valor de PI: ",obj.PI);
console.log(obj.config.url_API);

import Estudiante from "./Estudiante.js";

let estudiante = new Estudiante();
estudiante.nombre = "Alejandra";
estudiante.carrera = "ISW";

console.log(estudiante.saludar());
console.log(estudiante.estudiar());
console.log(estudiante.verPromedio());

let persona = new Persona("Alejandra", 20);

console.log(persona.saludar());