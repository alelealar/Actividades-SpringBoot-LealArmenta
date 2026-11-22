function organizeShoes(shoes) {
    /*
    creo el arreglo donde agregare las tallas de pares 
    */
    let encontrados = [];

    /*
    Listas para separar los zapatos de la derecha y de la izquierda
    */
    let lefts = [];
    let rights = [];

    //Pasamos por cada zapato enocntrado
    for (const bota of shoes) {

        //aqui para agregar las izquierdad
        if (bota.type == "I"){
            lefts.push(bota.size);
        //aqui para agregar las derechas
        /* 
        Use else if y no solo else POOOR si a alguien se le ocurre meter otra letra que no sean
        I o R y asi no se agregue
        */
        } else if (bota.type == "R"){
            rights.push(bota.size);
        }                                         
    }
    /*
    Acomodamos de mayor a menor ambas listas

    Queria usar sort solo pero a lo que entendi no funciona bien para comodar numeros ya que
    compara el primer numero de el entero. Por ejemplo, si tengo 100 y 42 y los quiero acomodar
    de menor a mayor, me tomara que 100 es menor ya que 1 del 100 es menor que el 42
    */
    lefts.sort((a, b) => a - b);
    rights.sort((a, b) => a - b);   

    /*
    Usamos un for con los zapatos izquierdos. Se puede hacer con los zapatos derechos
    tambien.
    */
    for (const talla of lefts) {
        //Se busca la talla dentro de la lista de los derechos
        //si el for es de los derechos, aqui buscarias en los izquierdos
        let encontrado = rights.indexOf(talla);
        
        /*
        Si el la talla del zapato se encontro, agregamos la talla a la lista de encontrados
        -1 es porque si el indexOf no encuentra la coincidencia, regresa -1.
        */
        if(encontrado !== -1){
            encontrados.push(talla);
        /*
        Borramos el valor de los derechos para que, no se vuelva a evaluar el zapato que ya
        encontro su par. Por ejemplo, si en la izquierda hay dos 38 y en la derecha un 38, pues 
        quitamos el unico 38 que hay de la derecha y así ya se compara bien.
        */
        rights.splice(encontrado, 1);
        }  
    }

    return encontrados;
}


//PRUEBAS

const shoes = [
{ type: 'I', size: 38 },
{ type: 'R', size: 38 },
{ type: 'R', size: 42 },
{ type: 'I', size: 41 },
{ type: 'I', size: 42 }
]
console.log(organizeShoes(shoes));
// [38, 42]

const shoes2 = [
  { type: 'I', size: 38 },
  { type: 'R', size: 38 },
  { type: 'I', size: 38 },
  { type: 'I', size: 38 },
  { type: 'R', size: 38 }
]

console.log(organizeShoes(shoes2));
// [38, 38]

const shoes3 = [
  { type: 'I', size: 38 },
  { type: 'R', size: 36 },
  { type: 'R', size: 42 },
  { type: 'I', size: 41 },
  { type: 'I', size: 43 }
]

console.log(organizeShoes(shoes3));
// []


