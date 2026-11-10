import Persona from "./Persona";

export default class Estudiante extends Persona {
    constructor(){
        super();
        this.carrera = "";
    }

    estudiar() {
        return `${this.nombre} esta estudiando ${this.carrera}`
    }

    #calcularPromedio(){
        return 99;
    }

    verPromedio(){
        return `Promedio: ${this.#calcularPromedio}`
    }
}
