function prepareSongs(listaNumeros){
    /*
    Decidi ordenar la lista primero porque la eliminacion
    seria mas sencilla asi debido a que no existe un metodo de listas
    que elimine elemento duplicados
    */
    let listaOrdenada = listaNumeros.sort();

    /*
    Consideramos si no hay existencia de canciones primero para que no logre 
    llegar a la eliminación
    */
    if(listaOrdenada.length == 0){
        console.log("No hay canciones por repoducir");
        return;
    }

    /*
    Use un for para recorrer los elementos de la lista
    */
    for (let i = 0; i < listaOrdenada.length; i++){
        /*
        comparamos si el elemento de la posicion actual es igual que el elemento
        de la posicion siguiente
        */
        if(listaOrdenada.at(i) == listaOrdenada.at(i+1)){
            /*
            si son iguales, usamos el metodo splice para eliminarlo, dandole el indice y el numero
            de elementos a eliminar
            */ 
            listaOrdenada.splice(i+1, 1);
            /*
            Reducimos el conteo de i para que vuelva al primero numero que se estaba comparando
            
            Si no hacemos esto, se termina saltando numeros.

            Me paso con la prueba [6, 5, 5, 5, 5] que al final quedaba [5, 5, 6] porque se adelantaba de mas, y 
            fue por esto que agregue esta "operación"
            */
            i--;
        }
    }

    //devolvemos la lista nueva
    return listaOrdenada;
}


//PRUEBAS
console.log("\nPrueba 1")
const songs1 = [3, 1, 2, 3, 4, 2, 5]
const playlist1 = prepareSongs(songs1)
console.log(playlist1) // [1, 2, 3, 4, 5]

console.log("\nPrueba 2")
const songs2 = [6, 5, 5, 5, 5]
const playlist2 = prepareSongs(songs2)
console.log(playlist2) // [5, 6]

console.log("\nPrueba 3")
const songs3 = []
const playlist3 = prepareSongs(songs3)
console.log(playlist3) // []
// Nadie anotó nada, la lista queda vacía