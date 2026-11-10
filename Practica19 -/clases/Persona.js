export default class Persona {
    constructor(nombre = "", edad = 0){
        this.nombre = nombre;
        this.edad = edad
        this.id = this.#generarId(); 
    }

    #generarId(){ //funcion privada
        return Math.floor(Math.random() * 1000);
    }
}