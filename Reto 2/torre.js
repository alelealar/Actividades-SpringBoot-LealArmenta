
function createPowerTower(altura, energia){
    //incilizo la funcion donde se van a ir concatenando las filas de guiones y asteriscos
    torre = ""

    //hago un for para que se vayan anidando las filas
    for (i = 0; i < altura; i++) {
        /**
         GUIONES

         los guiones de cada fila por cada lado se van restando 1 a 1
            - Empezamos con (altura - 1) porque en el primer nivel el carácter central ocupa 1 lugar.
            - Restamos la fila actual (i) para reducir un guion por lado en cada nivel y mantener el triángulo centrado.  

        
        ENERGIA
        
        energia siendo el caracter que se ira agregando

        cada caracter por cada fila se va agregando al centro, para que quede centrado y quede como una torre, deben
        de ser numeros impares y estar en medio de los guiones, para eso multiplicamos la i * 2 + 1 para la generacion de numeros
        impares desde 0
         */
        torre += `${"_".repeat(altura- 1 - i)}${energia.repeat((2*i)+ 1)}${"_".repeat(altura- 1 - i)}\n`; 
        
        /*
        Hice un for porque senti que hacerlo solo con dos lineas estaba muy facil, y pues mejor lo hice "complicado"
        para prácticar

        como mencione arriba, la primera fila, para la cantidad de guiones de cada lado es altura - 1, por lo que lo agregue aqui
        ya que solo es un caracter.

        agregue solamente el asterisco así simple

        al final investigue si se podian poner condiciones en este tipo de cadenas de texto, asi que agregue una
        para que se agregue la n si es la ultima vuelta que va a dar. En este caso como nomas eran 2 lineas
        de esta, pues el for quedo maximo de 2.

        Ahora que lo pienso, esta mejor un for porque si de repente me dicen que quieren mas lineas, pues nomas cambio
        la condicion de en medio del for.
        */
        if(i == altura-1){
            for (let index = 0; index < 2; index++) {
                torre +=`${"_".repeat(altura-1)}#${"_".repeat(altura-1)}${index === 0 ? "\n": ""}`      
            } 
        }
    } 

    return torre;
}   


const tower = createPowerTower(6, "♡");
console.log(tower)